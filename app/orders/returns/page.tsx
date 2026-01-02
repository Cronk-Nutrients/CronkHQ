'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useApp, Return, ReturnReason } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/formatting';
import { CreateReturnModal } from '@/components/modals';
import { Breadcrumb } from '@/components/Breadcrumb';
import {
  ReturnStatusBadge,
  ReturnChannelBadge,
  ReturnStatCard,
  ReturnsStatsGrid,
  returnReasonLabels,
  formatReturnDate,
} from '@/components/returns';

type StatusFilter = Return['status'] | '';
type ReasonFilter = ReturnReason | '';
type ChannelFilter = Return['channel'] | '';
type DateFilter = 'all' | 'today' | 'yesterday' | 'last7' | 'last30' | 'thisMonth';

function ReturnsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { state, dispatch } = useApp();
  const { success, warning } = useToast();

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(
    (searchParams.get('status') as StatusFilter) || ''
  );
  const [reasonFilter, setReasonFilter] = useState<ReasonFilter>('');
  const [channelFilter, setChannelFilter] = useState<ChannelFilter>('');
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Date filtering helper
  const filterByDate = (date: Date, filter: DateFilter) => {
    const returnDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (filter) {
      case 'today':
        return returnDate >= today;
      case 'yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        return returnDate >= yesterday && returnDate < today;
      case 'last7':
        const last7 = new Date(today);
        last7.setDate(last7.getDate() - 7);
        return returnDate >= last7;
      case 'last30':
        const last30 = new Date(today);
        last30.setDate(last30.getDate() - 30);
        return returnDate >= last30;
      case 'thisMonth':
        return returnDate.getMonth() === today.getMonth() &&
               returnDate.getFullYear() === today.getFullYear();
      default:
        return true;
    }
  };

  // Filter returns
  const filteredReturns = useMemo(() => {
    return state.returns.filter(ret => {
      const matchesSearch =
        ret.returnNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ret.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ret.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ret.customer.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = !statusFilter || ret.status === statusFilter;
      const matchesReason = !reasonFilter || ret.items.some(item => item.reason === reasonFilter);
      const matchesChannel = !channelFilter || ret.channel === channelFilter;
      const matchesDate = filterByDate(ret.createdAt, dateFilter);

      return matchesSearch && matchesStatus && matchesReason && matchesChannel && matchesDate;
    });
  }, [state.returns, searchQuery, statusFilter, reasonFilter, channelFilter, dateFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredReturns.length / itemsPerPage);
  const paginatedReturns = filteredReturns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate stats
  const stats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthsReturns = state.returns.filter(r => new Date(r.createdAt) >= thisMonth);

    return {
      pendingApproval: state.returns.filter(r => r.status === 'requested').length,
      inTransit: state.returns.filter(r => r.status === 'in_transit').length,
      awaitingInspection: state.returns.filter(r => r.status === 'received').length,
      readyToRefund: state.returns.filter(r => r.status === 'inspected').length,
      monthlyRefunds: monthsReturns
        .filter(r => r.status === 'refunded')
        .reduce((sum, r) => sum + r.refund.total, 0),
    };
  }, [state.returns]);

  // Handle stat click
  const handleStatClick = (status: StatusFilter) => {
    setStatusFilter(prev => prev === status ? '' : status);
    setCurrentPage(1);
  };

  // Handle return actions
  const handleApprove = (returnItem: Return, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: 'UPDATE_RETURN',
      payload: { ...returnItem, status: 'approved', updatedAt: new Date() }
    });
    success(`Return ${returnItem.returnNumber} approved`);
  };

  const handleReject = (returnItem: Return, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: 'UPDATE_RETURN',
      payload: { ...returnItem, status: 'rejected', updatedAt: new Date() }
    });
    warning(`Return ${returnItem.returnNumber} rejected`);
  };

  const handleMarkReceived = (returnItem: Return, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: 'UPDATE_RETURN',
      payload: { ...returnItem, status: 'received', updatedAt: new Date() }
    });
    success(`Return ${returnItem.returnNumber} marked as received`);
  };

  const handleProcessRefund = (returnItem: Return, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: 'UPDATE_RETURN',
      payload: {
        ...returnItem,
        status: 'refunded',
        refund: { ...returnItem.refund, refundedAt: new Date(), refundMethod: 'original_payment' },
        updatedAt: new Date()
      }
    });
    success(`Refund of ${formatCurrency(returnItem.refund.total)} processed for ${returnItem.returnNumber}`);
  };

  // Export returns
  const handleExport = () => {
    const headers = ['Return #', 'Order #', 'Date', 'Customer', 'Channel', 'Items', 'Reason', 'Refund Amount', 'Status'];
    const rows = filteredReturns.map(r => [
      r.returnNumber,
      r.orderNumber,
      formatReturnDate(r.createdAt),
      r.customer.name,
      r.channel,
      r.items.reduce((sum, i) => sum + i.quantity, 0),
      r.items[0]?.reason ? returnReasonLabels[r.items[0].reason] : '',
      r.refund.total.toFixed(2),
      r.status
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `returns-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    success(`Exported ${filteredReturns.length} returns`);
  };

  const hasFilters = !!(searchQuery || statusFilter || reasonFilter || channelFilter || dateFilter !== 'all');

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Orders', href: '/orders' }, { label: 'Returns' }]} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Returns</h1>
          <p className="text-sm text-slate-400">Process and track customer returns</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors flex items-center gap-2"
          >
            <i className="fas fa-download text-sm"></i>
            Export
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <i className="fas fa-plus text-sm"></i>
            Create Return
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <ReturnsStatsGrid columns={5}>
        <ReturnStatCard
          icon="fa-clock"
          color="amber"
          value={stats.pendingApproval}
          label="Pending Approval"
          onClick={() => handleStatClick('requested')}
          isActive={statusFilter === 'requested'}
        />
        <ReturnStatCard
          icon="fa-truck"
          color="purple"
          value={stats.inTransit}
          label="In Transit"
          onClick={() => handleStatClick('in_transit')}
          isActive={statusFilter === 'in_transit'}
        />
        <ReturnStatCard
          icon="fa-box"
          color="cyan"
          value={stats.awaitingInspection}
          label="Awaiting Inspection"
          onClick={() => handleStatClick('received')}
          isActive={statusFilter === 'received'}
        />
        <ReturnStatCard
          icon="fa-search"
          color="indigo"
          value={stats.readyToRefund}
          label="Ready to Refund"
          onClick={() => handleStatClick('inspected')}
          isActive={statusFilter === 'inspected'}
        />
        <ReturnStatCard
          icon="fa-dollar-sign"
          color="emerald"
          value={formatCurrency(stats.monthlyRefunds)}
          label="This Month's Refunds"
        />
      </ReturnsStatsGrid>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></i>
          <input
            type="text"
            placeholder="Search returns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value as StatusFilter); setCurrentPage(1); }}
          className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
        >
          <option value="">All Statuses</option>
          <option value="requested">Requested</option>
          <option value="approved">Approved</option>
          <option value="in_transit">In Transit</option>
          <option value="received">Received</option>
          <option value="inspected">Inspected</option>
          <option value="refunded">Refunded</option>
          <option value="rejected">Rejected</option>
        </select>

        <select
          value={reasonFilter}
          onChange={(e) => { setReasonFilter(e.target.value as ReasonFilter); setCurrentPage(1); }}
          className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
        >
          <option value="">All Reasons</option>
          {Object.entries(returnReasonLabels).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>

        <select
          value={channelFilter}
          onChange={(e) => { setChannelFilter(e.target.value as ChannelFilter); setCurrentPage(1); }}
          className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
        >
          <option value="">All Channels</option>
          <option value="shopify">Shopify</option>
          <option value="amazon_fbm">Amazon FBM</option>
          <option value="amazon_fba">Amazon FBA</option>
          <option value="manual">Manual</option>
        </select>

        <select
          value={dateFilter}
          onChange={(e) => { setDateFilter(e.target.value as DateFilter); setCurrentPage(1); }}
          className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="last7">Last 7 Days</option>
          <option value="last30">Last 30 Days</option>
          <option value="thisMonth">This Month</option>
        </select>

        {hasFilters && (
          <button
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('');
              setReasonFilter('');
              setChannelFilter('');
              setDateFilter('all');
              setCurrentPage(1);
            }}
            className="px-3 py-2.5 text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-2"
          >
            <i className="fas fa-times text-sm"></i>
            Clear
          </button>
        )}
      </div>

      {/* Returns Table */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Return #</th>
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Date</th>
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Customer</th>
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Channel</th>
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Items</th>
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Reason</th>
              <th className="text-right p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Refund</th>
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
              <th className="text-right p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedReturns.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-8 text-center text-slate-500">
                  <i className="fas fa-undo-alt text-4xl mb-4 text-slate-600"></i>
                  <p>No returns found</p>
                  {hasFilters && <p className="text-sm mt-2">Try adjusting your filters</p>}
                </td>
              </tr>
            ) : (
              paginatedReturns.map((returnItem) => (
                <tr
                  key={returnItem.id}
                  className="border-b border-slate-700/30 hover:bg-slate-700/30 cursor-pointer transition-colors"
                  onClick={() => router.push(`/orders/returns/${returnItem.id}`)}
                >
                  <td className="p-4">
                    <div className="font-medium text-white">{returnItem.returnNumber}</div>
                    <div className="text-xs text-slate-500">Order: {returnItem.orderNumber}</div>
                  </td>
                  <td className="p-4 text-slate-300">{formatReturnDate(returnItem.createdAt)}</td>
                  <td className="p-4">
                    <div className="text-slate-200">{returnItem.customer.name}</div>
                    <div className="text-xs text-slate-500">{returnItem.customer.email}</div>
                  </td>
                  <td className="p-4"><ReturnChannelBadge channel={returnItem.channel} /></td>
                  <td className="p-4">
                    <div className="text-slate-200">
                      {returnItem.items.reduce((sum, i) => sum + i.quantity, 0)} item(s)
                    </div>
                    <div className="text-xs text-slate-500">
                      {returnItem.items.length > 1
                        ? `${returnItem.items[0].productName} +${returnItem.items.length - 1} more`
                        : returnItem.items[0]?.productName}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-slate-300">
                      {returnItem.items[0]?.reason ? returnReasonLabels[returnItem.items[0].reason] : '-'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="font-medium text-white">{formatCurrency(returnItem.refund.total)}</div>
                    {returnItem.refund.restockingFee > 0 && (
                      <div className="text-xs text-amber-400">
                        -{formatCurrency(returnItem.refund.restockingFee)} fee
                      </div>
                    )}
                  </td>
                  <td className="p-4"><ReturnStatusBadge status={returnItem.status} /></td>
                  <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      {returnItem.status === 'requested' && (
                        <>
                          <button
                            onClick={(e) => handleApprove(returnItem, e)}
                            className="p-2 text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition-colors"
                            title="Approve Return"
                          >
                            <i className="fas fa-check"></i>
                          </button>
                          <button
                            onClick={(e) => handleReject(returnItem, e)}
                            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                            title="Reject Return"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </>
                      )}
                      {returnItem.status === 'in_transit' && (
                        <button
                          onClick={(e) => handleMarkReceived(returnItem, e)}
                          className="p-2 text-cyan-400 hover:bg-cyan-500/20 rounded-lg transition-colors"
                          title="Mark Received"
                        >
                          <i className="fas fa-box"></i>
                        </button>
                      )}
                      {returnItem.status === 'inspected' && (
                        <button
                          onClick={(e) => handleProcessRefund(returnItem, e)}
                          className="p-2 text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition-colors"
                          title="Process Refund"
                        >
                          <i className="fas fa-dollar-sign"></i>
                        </button>
                      )}
                      <button
                        onClick={() => router.push(`/orders/returns/${returnItem.id}`)}
                        className="p-2 text-slate-400 hover:bg-slate-600/50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-slate-700/50">
            <div className="text-sm text-slate-400">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredReturns.length)} of {filteredReturns.length} returns
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

      <CreateReturnModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}

export default function ReturnsPage() {
  return (
    <Suspense fallback={
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-slate-800/50 rounded w-48"></div>
        <div className="grid grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-800/50 rounded-xl"></div>
          ))}
        </div>
        <div className="h-96 bg-slate-800/50 rounded-xl"></div>
      </div>
    }>
      <ReturnsPageContent />
    </Suspense>
  );
}
