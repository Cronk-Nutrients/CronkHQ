'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp, StockCount } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/formatting';
import { CreateStockCountModal } from '@/components/modals';

type StatusFilter = StockCount['status'] | '';
type TypeFilter = StockCount['type'] | '';

// Status configuration
const statusConfig: Record<StockCount['status'], { color: string; icon: string; label: string }> = {
  draft: { color: 'slate', icon: 'fa-file', label: 'Draft' },
  in_progress: { color: 'blue', icon: 'fa-spinner', label: 'In Progress' },
  completed: { color: 'emerald', icon: 'fa-check-circle', label: 'Completed' },
  cancelled: { color: 'red', icon: 'fa-times-circle', label: 'Cancelled' },
};

// Type labels
const typeConfig: Record<StockCount['type'], { label: string; color: string }> = {
  full: { label: 'Full Count', color: 'purple' },
  cycle: { label: 'Cycle Count', color: 'blue' },
  spot: { label: 'Spot Check', color: 'amber' },
};

function StockCountsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { state, dispatch } = useApp();
  const { success, warning } = useToast();

  // Modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(
    (searchParams.get('status') as StatusFilter) || ''
  );
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter counts
  const filteredCounts = useMemo(() => {
    return state.stockCounts.filter(count => {
      const matchesSearch =
        count.countNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        count.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        count.locationName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = !statusFilter || count.status === statusFilter;
      const matchesType = !typeFilter || count.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [state.stockCounts, searchQuery, statusFilter, typeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredCounts.length / itemsPerPage);
  const paginatedCounts = filteredCounts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate stats
  const stats = useMemo(() => {
    const today = new Date();
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const activeCounts = state.stockCounts.filter(c => c.status === 'in_progress').length;
    const completedThisMonth = state.stockCounts.filter(
      c => c.status === 'completed' && c.completedAt && new Date(c.completedAt) >= thisMonth
    ).length;

    // Count items with discrepancies from all counts
    const discrepancyItems = state.stockCounts
      .filter(c => c.status === 'in_progress' || c.status === 'completed')
      .reduce((sum, c) => sum + c.summary.discrepancyItems, 0);

    // Total variance value
    const totalVariance = state.stockCounts
      .filter(c => c.status === 'completed')
      .reduce((sum, c) => sum + c.summary.totalVariance, 0);

    return { activeCounts, completedThisMonth, discrepancyItems, totalVariance };
  }, [state.stockCounts]);

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Get status badge
  const getStatusBadge = (status: StockCount['status']) => {
    const config = statusConfig[status];
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 bg-${config.color}-500/10 text-${config.color}-400 text-xs font-medium rounded-full border border-${config.color}-500/20`}>
        <i className={`fas ${config.icon} ${status === 'in_progress' ? 'fa-spin' : ''} text-[10px]`}></i>
        {config.label}
      </span>
    );
  };

  // Get type badge
  const getTypeBadge = (type: StockCount['type']) => {
    const config = typeConfig[type];
    return (
      <span className={`inline-flex items-center px-2 py-0.5 bg-${config.color}-500/10 text-${config.color}-400 text-xs font-medium rounded border border-${config.color}-500/20`}>
        {config.label}
      </span>
    );
  };

  // Handle delete
  const handleDelete = (count: StockCount, e: React.MouseEvent) => {
    e.stopPropagation();
    if (count.status === 'in_progress') {
      warning('Cannot delete an active count. Cancel it first.');
      return;
    }
    dispatch({ type: 'DELETE_STOCK_COUNT', payload: count.id });
    success(`Stock count ${count.countNumber} deleted`);
  };

  // Handle stat click
  const handleStatClick = (status: StatusFilter) => {
    setStatusFilter(prev => prev === status ? '' : status);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/inventory"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <i className="fas fa-arrow-left"></i>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Stock Counts</h1>
            <p className="text-sm text-slate-400">Physical inventory verification</p>
          </div>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center gap-2"
        >
          <i className="fas fa-plus text-sm"></i>
          New Count
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        {/* Active Counts */}
        <div
          className={`bg-slate-800/50 backdrop-blur border rounded-xl p-4 cursor-pointer hover:bg-blue-500/10 transition-colors ${
            statusFilter === 'in_progress' ? 'border-blue-500/50 bg-blue-500/10 ring-2 ring-blue-500/30' : 'border-blue-500/30'
          }`}
          onClick={() => handleStatClick('in_progress')}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <i className="fas fa-clipboard-list text-blue-400"></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">{stats.activeCounts}</div>
              <div className="text-xs text-slate-400">Active Counts</div>
            </div>
          </div>
        </div>

        {/* Completed This Month */}
        <div
          className={`bg-slate-800/50 backdrop-blur border rounded-xl p-4 cursor-pointer hover:bg-emerald-500/10 transition-colors ${
            statusFilter === 'completed' ? 'border-emerald-500/50 bg-emerald-500/10 ring-2 ring-emerald-500/30' : 'border-emerald-500/30'
          }`}
          onClick={() => handleStatClick('completed')}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <i className="fas fa-check-circle text-emerald-400"></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">{stats.completedThisMonth}</div>
              <div className="text-xs text-slate-400">Completed This Month</div>
            </div>
          </div>
        </div>

        {/* Items with Discrepancy */}
        <div className="bg-slate-800/50 backdrop-blur border border-amber-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <i className="fas fa-exclamation-triangle text-amber-400"></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">{stats.discrepancyItems}</div>
              <div className="text-xs text-slate-400">Items with Discrepancy</div>
            </div>
          </div>
        </div>

        {/* Total Variance Value */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stats.totalVariance >= 0 ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
              <i className={`fas fa-dollar-sign ${stats.totalVariance >= 0 ? 'text-emerald-400' : 'text-red-400'}`}></i>
            </div>
            <div>
              <div className={`text-2xl font-bold ${stats.totalVariance >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {formatCurrency(Math.abs(stats.totalVariance))}
              </div>
              <div className="text-xs text-slate-400">Total Variance Value</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></i>
          <input
            type="text"
            placeholder="Search counts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value as StatusFilter); setCurrentPage(1); }}
          className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
        >
          <option value="">All Statuses</option>
          <option value="draft">Draft</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        {/* Type Filter */}
        <select
          value={typeFilter}
          onChange={(e) => { setTypeFilter(e.target.value as TypeFilter); setCurrentPage(1); }}
          className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
        >
          <option value="">All Types</option>
          <option value="full">Full Count</option>
          <option value="cycle">Cycle Count</option>
          <option value="spot">Spot Check</option>
        </select>

        {/* Clear Filters */}
        {(searchQuery || statusFilter || typeFilter) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('');
              setTypeFilter('');
              setCurrentPage(1);
            }}
            className="px-3 py-2.5 text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-2"
          >
            <i className="fas fa-times text-sm"></i>
            Clear
          </button>
        )}
      </div>

      {/* Counts Table */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Count #</th>
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Name</th>
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Type</th>
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Location</th>
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Progress</th>
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Started</th>
              <th className="text-right p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCounts.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-slate-500">
                  <i className="fas fa-clipboard-check text-4xl mb-4 text-slate-600"></i>
                  <p>No stock counts found</p>
                  {(searchQuery || statusFilter || typeFilter) && (
                    <p className="text-sm mt-2">Try adjusting your filters</p>
                  )}
                </td>
              </tr>
            ) : (
              paginatedCounts.map((count) => {
                const progress = count.summary.totalItems > 0
                  ? (count.summary.countedItems / count.summary.totalItems) * 100
                  : 0;

                return (
                  <tr
                    key={count.id}
                    className="border-b border-slate-700/30 hover:bg-slate-700/30 cursor-pointer transition-colors"
                    onClick={() => router.push(`/inventory/counts/${count.id}`)}
                  >
                    <td className="p-4">
                      <div className="font-medium text-white">{count.countNumber}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-slate-200">{count.name}</div>
                      {count.assignedTo && (
                        <div className="text-xs text-slate-500">Assigned to: {count.assignedTo}</div>
                      )}
                    </td>
                    <td className="p-4">{getTypeBadge(count.type)}</td>
                    <td className="p-4 text-slate-300">{count.locationName}</td>
                    <td className="p-4">
                      <div className="w-32">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-400">{count.summary.countedItems}/{count.summary.totalItems}</span>
                          <span className="text-slate-500">{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div
                            className={`rounded-full h-2 transition-all ${count.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-500'}`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{getStatusBadge(count.status)}</td>
                    <td className="p-4 text-slate-300">
                      {count.startedAt ? formatDate(count.startedAt) : '-'}
                    </td>
                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        {count.status === 'draft' && (
                          <button
                            onClick={() => router.push(`/inventory/counts/${count.id}`)}
                            className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                            title="Start Count"
                          >
                            <i className="fas fa-play"></i>
                          </button>
                        )}
                        {count.status === 'in_progress' && (
                          <button
                            onClick={() => router.push(`/inventory/counts/${count.id}`)}
                            className="p-2 text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition-colors"
                            title="Continue Count"
                          >
                            <i className="fas fa-arrow-right"></i>
                          </button>
                        )}
                        {count.status !== 'in_progress' && (
                          <button
                            onClick={(e) => handleDelete(count, e)}
                            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        )}
                        <button
                          onClick={() => router.push(`/inventory/counts/${count.id}`)}
                          className="p-2 text-slate-400 hover:bg-slate-600/50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <i className="fas fa-chevron-right"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-slate-700/50">
            <div className="text-sm text-slate-400">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredCounts.length)} of {filteredCounts.length} counts
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-slate-300 transition-colors"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      currentPage === pageNum
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-300'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-slate-300 transition-colors"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create Stock Count Modal */}
      <CreateStockCountModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}

export default function StockCountsPage() {
  return (
    <Suspense fallback={
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-slate-800/50 rounded w-48"></div>
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-800/50 rounded-xl"></div>
          ))}
        </div>
        <div className="h-96 bg-slate-800/50 rounded-xl"></div>
      </div>
    }>
      <StockCountsPageContent />
    </Suspense>
  );
}
