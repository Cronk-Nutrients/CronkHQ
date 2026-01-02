'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp, StockTransfer } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { CreateTransferModal } from '@/components/modals';

type StatusFilter = StockTransfer['status'] | '';

// Status configuration
const statusConfig: Record<StockTransfer['status'], { color: string; icon: string; label: string }> = {
  draft: { color: 'slate', icon: 'fa-edit', label: 'Draft' },
  pending: { color: 'amber', icon: 'fa-clock', label: 'Pending' },
  in_transit: { color: 'blue', icon: 'fa-truck', label: 'In Transit' },
  received: { color: 'emerald', icon: 'fa-check', label: 'Received' },
  cancelled: { color: 'red', icon: 'fa-times', label: 'Cancelled' },
};

function TransfersPageContent() {
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
  const [fromLocationFilter, setFromLocationFilter] = useState('');
  const [toLocationFilter, setToLocationFilter] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter transfers
  const filteredTransfers = useMemo(() => {
    return state.transfers.filter(transfer => {
      const matchesSearch =
        transfer.transferNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transfer.items.some(item =>
          item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.sku.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesStatus = !statusFilter || transfer.status === statusFilter;
      const matchesFrom = !fromLocationFilter || transfer.fromLocation === fromLocationFilter;
      const matchesTo = !toLocationFilter || transfer.toLocation === toLocationFilter;

      return matchesSearch && matchesStatus && matchesFrom && matchesTo;
    });
  }, [state.transfers, searchQuery, statusFilter, fromLocationFilter, toLocationFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredTransfers.length / itemsPerPage);
  const paginatedTransfers = filteredTransfers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate stats
  const stats = useMemo(() => {
    const today = new Date();
    const thisWeek = new Date(today);
    thisWeek.setDate(thisWeek.getDate() - 7);

    return {
      pending: state.transfers.filter(t => t.status === 'pending').length,
      inTransit: state.transfers.filter(t => t.status === 'in_transit').length,
      receivedThisWeek: state.transfers.filter(
        t => t.status === 'received' && t.receivedAt && new Date(t.receivedAt) >= thisWeek
      ).length,
      total: state.transfers.length,
    };
  }, [state.transfers]);

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Get status badge
  const getStatusBadge = (status: StockTransfer['status']) => {
    const config = statusConfig[status];
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 bg-${config.color}-500/10 text-${config.color}-400 text-xs font-medium rounded-full border border-${config.color}-500/20`}>
        <i className={`fas ${config.icon} text-[10px]`}></i>
        {config.label}
      </span>
    );
  };

  // Handle stat click
  const handleStatClick = (status: StatusFilter) => {
    setStatusFilter(prev => prev === status ? '' : status);
    setCurrentPage(1);
  };

  // Handle cancel transfer
  const handleCancel = (transfer: StockTransfer, e: React.MouseEvent) => {
    e.stopPropagation();
    if (transfer.status === 'in_transit') {
      warning('Cannot cancel a transfer that is already in transit');
      return;
    }
    dispatch({
      type: 'UPDATE_TRANSFER',
      payload: { ...transfer, status: 'cancelled', updatedAt: new Date() }
    });
    success(`Transfer ${transfer.transferNumber} cancelled`);
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
            <h1 className="text-2xl font-bold text-white">Stock Transfers</h1>
            <p className="text-sm text-slate-400">Move inventory between locations</p>
          </div>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center gap-2"
        >
          <i className="fas fa-plus text-sm"></i>
          New Transfer
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        {/* Pending */}
        <div
          className={`bg-slate-800/50 backdrop-blur border rounded-xl p-4 cursor-pointer hover:bg-amber-500/10 transition-colors ${
            statusFilter === 'pending' ? 'border-amber-500/50 bg-amber-500/10 ring-2 ring-amber-500/30' : 'border-amber-500/30'
          }`}
          onClick={() => handleStatClick('pending')}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <i className="fas fa-clock text-amber-400"></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">{stats.pending}</div>
              <div className="text-xs text-slate-400">Pending Approval</div>
            </div>
          </div>
        </div>

        {/* In Transit */}
        <div
          className={`bg-slate-800/50 backdrop-blur border rounded-xl p-4 cursor-pointer hover:bg-blue-500/10 transition-colors ${
            statusFilter === 'in_transit' ? 'border-blue-500/50 bg-blue-500/10 ring-2 ring-blue-500/30' : 'border-blue-500/30'
          }`}
          onClick={() => handleStatClick('in_transit')}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <i className="fas fa-truck text-blue-400"></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">{stats.inTransit}</div>
              <div className="text-xs text-slate-400">In Transit</div>
            </div>
          </div>
        </div>

        {/* Received This Week */}
        <div
          className={`bg-slate-800/50 backdrop-blur border rounded-xl p-4 cursor-pointer hover:bg-emerald-500/10 transition-colors ${
            statusFilter === 'received' ? 'border-emerald-500/50 bg-emerald-500/10 ring-2 ring-emerald-500/30' : 'border-emerald-500/30'
          }`}
          onClick={() => handleStatClick('received')}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <i className="fas fa-check text-emerald-400"></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">{stats.receivedThisWeek}</div>
              <div className="text-xs text-slate-400">Received This Week</div>
            </div>
          </div>
        </div>

        {/* Total Transfers */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
              <i className="fas fa-exchange-alt text-slate-400"></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <div className="text-xs text-slate-400">Total Transfers</div>
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
            placeholder="Search transfers..."
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
          <option value="pending">Pending</option>
          <option value="in_transit">In Transit</option>
          <option value="received">Received</option>
          <option value="cancelled">Cancelled</option>
        </select>

        {/* From Location Filter */}
        <select
          value={fromLocationFilter}
          onChange={(e) => { setFromLocationFilter(e.target.value); setCurrentPage(1); }}
          className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
        >
          <option value="">All Sources</option>
          {state.locations.map(loc => (
            <option key={loc.id} value={loc.id}>{loc.name}</option>
          ))}
        </select>

        {/* To Location Filter */}
        <select
          value={toLocationFilter}
          onChange={(e) => { setToLocationFilter(e.target.value); setCurrentPage(1); }}
          className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
        >
          <option value="">All Destinations</option>
          {state.locations.map(loc => (
            <option key={loc.id} value={loc.id}>{loc.name}</option>
          ))}
        </select>

        {/* Clear Filters */}
        {(searchQuery || statusFilter || fromLocationFilter || toLocationFilter) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('');
              setFromLocationFilter('');
              setToLocationFilter('');
              setCurrentPage(1);
            }}
            className="px-3 py-2.5 text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-2"
          >
            <i className="fas fa-times text-sm"></i>
            Clear
          </button>
        )}
      </div>

      {/* Transfers Table */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Transfer #</th>
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Date</th>
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">From</th>
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">To</th>
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Items</th>
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
              <th className="text-right p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransfers.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500">
                  <i className="fas fa-exchange-alt text-4xl mb-4 text-slate-600"></i>
                  <p>No transfers found</p>
                  {(searchQuery || statusFilter || fromLocationFilter || toLocationFilter) && (
                    <p className="text-sm mt-2">Try adjusting your filters</p>
                  )}
                </td>
              </tr>
            ) : (
              paginatedTransfers.map((transfer) => {
                const totalUnits = transfer.items.reduce((sum, i) => sum + i.requestedQty, 0);
                return (
                  <tr
                    key={transfer.id}
                    className="border-b border-slate-700/30 hover:bg-slate-700/30 cursor-pointer transition-colors"
                    onClick={() => router.push(`/inventory/transfers/${transfer.id}`)}
                  >
                    <td className="p-4">
                      <div className="font-medium text-white">{transfer.transferNumber}</div>
                    </td>
                    <td className="p-4 text-slate-300">{formatDate(transfer.createdAt)}</td>
                    <td className="p-4 text-slate-300">{transfer.fromLocationName}</td>
                    <td className="p-4 text-slate-300">{transfer.toLocationName}</td>
                    <td className="p-4">
                      <div className="text-slate-200">
                        {transfer.items.length} item{transfer.items.length !== 1 ? 's' : ''}
                      </div>
                      <div className="text-xs text-slate-500">{totalUnits} units</div>
                    </td>
                    <td className="p-4">{getStatusBadge(transfer.status)}</td>
                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        {(transfer.status === 'draft' || transfer.status === 'pending') && (
                          <button
                            onClick={(e) => handleCancel(transfer, e)}
                            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                            title="Cancel Transfer"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        )}
                        <button
                          onClick={() => router.push(`/inventory/transfers/${transfer.id}`)}
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
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredTransfers.length)} of {filteredTransfers.length} transfers
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

      {/* Create Transfer Modal */}
      <CreateTransferModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}

export default function TransfersPage() {
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
      <TransfersPageContent />
    </Suspense>
  );
}
