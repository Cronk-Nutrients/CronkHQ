'use client';

import { useState, useMemo, Suspense, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useApp, Order } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { ActiveFilters } from '@/components/ui/FilterBadge';
import { CreateOrderModal } from '@/components/modals/CreateOrderModal';
import { CreatePickBatchModal } from '@/components/modals/CreatePickBatchModal';
import { formatCurrency } from '@/lib/formatting';
import { OrderStatusBadge, ChannelBadge, MarginBadge } from '@/components/orders/OrderBadges';
import { OrderStatCard, OrderStatsGrid, filterByDate, DateFilter, orderStatusOptions, channelOptions, dateFilterOptions } from '@/components/orders/OrderStats';
import { Pagination } from '@/components/inventory/InventoryTable';

type StatusFilter = Order['status'] | '';
type ChannelFilter = Order['channel'] | '';

function OrdersPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { state, dispatch } = useApp();
  const { success } = useToast();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isPickBatchModalOpen, setIsPickBatchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('');
  const [channelFilter, setChannelFilter] = useState<ChannelFilter>('');
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [urlInitialized, setUrlInitialized] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [isSyncing, setIsSyncing] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'total_high' | 'total_low'>('newest');
  const itemsPerPage = 10;

  // Initialize filters from URL
  useEffect(() => {
    if (!urlInitialized) {
      const status = searchParams.get('status') as StatusFilter;
      const channelParam = searchParams.get('channel');
      const search = searchParams.get('search');
      if (status) setStatusFilter(status);
      if (channelParam) setChannelFilter(channelParam === 'amazon' ? 'amazon_fba' : channelParam as ChannelFilter);
      if (search) setSearchQuery(search);
      setUrlInitialized(true);
    }
  }, [searchParams, urlInitialized]);

  const updateUrlParams = useCallback((newFilters: { status?: string; channel?: string; search?: string }) => {
    const params = new URLSearchParams();
    const status = newFilters.status ?? statusFilter;
    const channel = newFilters.channel ?? channelFilter;
    const search = newFilters.search ?? searchQuery;
    if (status) params.set('status', status);
    if (channel) params.set('channel', channel);
    if (search) params.set('search', search);
    router.replace(params.toString() ? `/orders?${params.toString()}` : '/orders', { scroll: false });
  }, [router, statusFilter, channelFilter, searchQuery]);

  const activeFiltersList = useMemo(() => {
    const filters: Array<{ key: string; label: string; value: string }> = [];
    if (statusFilter) {
      const opt = orderStatusOptions.find(o => o.value === statusFilter);
      filters.push({ key: 'status', label: 'Status', value: opt?.label || statusFilter });
    }
    if (channelFilter) {
      const opt = channelOptions.find(o => o.value === channelFilter);
      filters.push({ key: 'channel', label: 'Channel', value: opt?.label || channelFilter });
    }
    if (searchQuery) filters.push({ key: 'search', label: 'Search', value: searchQuery });
    if (dateFilter !== 'all') {
      const opt = dateFilterOptions.find(o => o.value === dateFilter);
      filters.push({ key: 'date', label: 'Date', value: opt?.label || dateFilter });
    }
    return filters;
  }, [statusFilter, channelFilter, searchQuery, dateFilter]);

  const handleRemoveFilter = (key: string) => {
    if (key === 'status') { setStatusFilter(''); updateUrlParams({ status: '' }); }
    else if (key === 'channel') { setChannelFilter(''); updateUrlParams({ channel: '' }); }
    else if (key === 'search') { setSearchQuery(''); updateUrlParams({ search: '' }); }
    else if (key === 'date') setDateFilter('all');
  };

  const handleClearAllFilters = () => {
    setStatusFilter(''); setChannelFilter(''); setSearchQuery(''); setDateFilter('all');
    router.replace('/orders', { scroll: false });
  };

  const filteredOrders = useMemo(() => {
    const filtered = state.orders.filter(order => {
      const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = !statusFilter || order.status === statusFilter;
      const matchesChannel = !channelFilter || order.channel === channelFilter;
      const matchesDate = filterByDate(order.createdAt, dateFilter);
      return matchesSearch && matchesStatus && matchesChannel && matchesDate;
    });

    // Apply sorting
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'total_high':
          return b.total - a.total;
        case 'total_low':
          return a.total - b.total;
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  }, [state.orders, searchQuery, statusFilter, channelFilter, dateFilter, sortBy]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const stats = useMemo(() => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const todaysOrders = state.orders.filter(o => new Date(o.createdAt) >= today);
    return {
      toPick: state.orders.filter(o => o.status === 'to_pick').length,
      toPack: state.orders.filter(o => o.status === 'to_pack').length,
      ready: state.orders.filter(o => o.status === 'ready').length,
      shippedToday: todaysOrders.filter(o => o.status === 'shipped').length,
      todayRevenue: todaysOrders.reduce((sum, o) => sum + o.total, 0),
      todayProfit: todaysOrders.reduce((sum, o) => sum + o.profit, 0),
    };
  }, [state.orders]);

  const formatDate = (date: Date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const formatTime = (date: Date) => new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const handleStatClick = (status: StatusFilter) => {
    const newStatus = statusFilter === status ? '' : status;
    setStatusFilter(newStatus); setCurrentPage(1);
    if (urlInitialized) updateUrlParams({ status: newStatus });
  };

  const handleCheckbox = (orderId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelected = new Set(selectedOrders);
    newSelected.has(orderId) ? newSelected.delete(orderId) : newSelected.add(orderId);
    setSelectedOrders(newSelected);
  };

  const handleSelectAll = () => {
    setSelectedOrders(selectedOrders.size === paginatedOrders.length ? new Set() : new Set(paginatedOrders.map(o => o.id)));
  };

  const handleSyncOrders = async () => {
    setIsSyncing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSyncing(false);
    success('Orders synced successfully!');
  };

  const handleExport = (orderIds?: string[]) => {
    const ordersToExport = orderIds ? state.orders.filter(o => orderIds.includes(o.id)) : filteredOrders;
    const headers = ['Order #', 'Date', 'Customer', 'Email', 'Channel', 'Items', 'Total', 'COGS', 'Profit', 'Status'];
    const rows = ordersToExport.map(o => [
      o.orderNumber, formatDate(o.createdAt), o.customer.name, o.customer.email, o.channel,
      o.items.reduce((sum, i) => sum + i.quantity, 0), o.total.toFixed(2), o.cogs.toFixed(2), o.profit.toFixed(2), o.status
    ]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url;
    a.download = `orders-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click(); URL.revokeObjectURL(url);
    success(`Exported ${ordersToExport.length} orders`);
  };

  const handleBulkAction = (action: string) => {
    if (selectedOrders.size === 0) return;
    if (action === 'mark_picked') {
      selectedOrders.forEach(id => dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { orderId: id, status: 'to_pack' } }));
      success(`${selectedOrders.size} orders marked as picked`);
      setSelectedOrders(new Set());
    } else if (action === 'create_pick_batch') {
      setIsPickBatchModalOpen(true);
    } else if (action === 'export') {
      handleExport(Array.from(selectedOrders));
      setSelectedOrders(new Set());
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Orders</h1>
          <p className="text-sm text-slate-400">Manage and fulfill customer orders</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => handleExport()} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors flex items-center gap-2">
            <i className="fas fa-download text-sm"></i>Export
          </button>
          <button onClick={handleSyncOrders} disabled={isSyncing} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50">
            <i className={`fas ${isSyncing ? 'fa-spinner fa-spin' : 'fa-sync-alt'} text-sm`}></i>
            {isSyncing ? 'Syncing...' : 'Sync Orders'}
          </button>
          <button onClick={() => setIsCreateModalOpen(true)} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center gap-2">
            <i className="fas fa-plus text-sm"></i>Manual Order
          </button>
        </div>
      </div>

      {/* Stats */}
      <OrderStatsGrid columns={6}>
        <OrderStatCard icon="fa-hand-pointer" iconColor="amber" value={stats.toPick} label="To Pick" onClick={() => handleStatClick('to_pick')} isActive={statusFilter === 'to_pick'} />
        <OrderStatCard icon="fa-box" iconColor="purple" value={stats.toPack} label="To Pack" onClick={() => handleStatClick('to_pack')} isActive={statusFilter === 'to_pack'} />
        <OrderStatCard icon="fa-tag" iconColor="cyan" value={stats.ready} label="Ready to Ship" onClick={() => handleStatClick('ready')} isActive={statusFilter === 'ready'} />
        <OrderStatCard icon="fa-truck" iconColor="emerald" value={stats.shippedToday} label="Shipped Today" onClick={() => handleStatClick('shipped')} isActive={statusFilter === 'shipped'} />
        <OrderStatCard icon="fa-dollar-sign" iconColor="slate" value={stats.todayRevenue} format="currency" label="Today's Revenue" />
        <OrderStatCard icon="fa-chart-line" iconColor="emerald" value={stats.todayProfit} format="currency" label="Today's Profit" />
      </OrderStatsGrid>

      {activeFiltersList.length > 0 && (
        <ActiveFilters filters={activeFiltersList} onRemove={handleRemoveFilter} onClearAll={handleClearAllFilters} />
      )}

      {/* Filters */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input type="text" placeholder="Search by order #, customer name, email..." value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50" />
          </div>
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value as StatusFilter); setCurrentPage(1); }}
            className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-emerald-500/50">
            {orderStatusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
          <select value={channelFilter} onChange={(e) => { setChannelFilter(e.target.value as ChannelFilter); setCurrentPage(1); }}
            className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-emerald-500/50">
            {channelOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
          <select value={dateFilter} onChange={(e) => { setDateFilter(e.target.value as DateFilter); setCurrentPage(1); }}
            className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-emerald-500/50">
            {dateFilterOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
          <select value={sortBy} onChange={(e) => { setSortBy(e.target.value as typeof sortBy); setCurrentPage(1); }}
            className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-emerald-500/50">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="total_high">Highest Total</option>
            <option value="total_low">Lowest Total</option>
          </select>
          {selectedOrders.size > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">{selectedOrders.size} selected</span>
              <select onChange={(e) => { if (e.target.value) { handleBulkAction(e.target.value); e.target.value = ''; } }}
                className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-emerald-500/50">
                <option value="">Bulk Actions</option>
                <option value="create_pick_batch">Create Pick Batch</option>
                <option value="mark_picked">Mark as Picked</option>
                <option value="export">Export Selected</option>
              </select>
              <button onClick={() => setIsPickBatchModalOpen(true)} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center gap-2">
                <i className="fas fa-clipboard-list text-sm"></i>Create Batch
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-slate-700/50">
              <tr className="text-left text-xs text-slate-400 uppercase tracking-wider">
                <th className="px-4 py-3 font-medium">
                  <input type="checkbox" checked={selectedOrders.size === paginatedOrders.length && paginatedOrders.length > 0}
                    onChange={handleSelectAll} className="rounded bg-slate-700 border-slate-600" />
                </th>
                <th className="px-4 py-3 font-medium">Order</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Channel</th>
                <th className="px-4 py-3 font-medium">Items</th>
                <th className="px-4 py-3 font-medium text-right">Total</th>
                <th className="px-4 py-3 font-medium text-right">Profit</th>
                <th className="px-4 py-3 font-medium text-center">Margin</th>
                <th className="px-4 py-3 font-medium text-center">Status</th>
                <th className="px-4 py-3 font-medium">Tracking</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {paginatedOrders.map((order) => (
                <tr key={order.id} className={`transition-colors cursor-pointer hover:bg-slate-800/30 ${selectedOrders.has(order.id) ? 'bg-emerald-500/5' : ''}`}
                  onClick={() => router.push(`/orders/${order.id}`)}>
                  <td className="px-4 py-4" onClick={(e) => handleCheckbox(order.id, e)}>
                    <input type="checkbox" checked={selectedOrders.has(order.id)} onChange={() => {}} className="rounded bg-slate-700 border-slate-600" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-mono text-sm font-medium text-white">{order.orderNumber}</div>
                    {order.notes && <div className="text-xs text-amber-400 truncate max-w-[150px]" title={order.notes}><i className="fas fa-sticky-note mr-1"></i>{order.notes}</div>}
                    {order.tags && order.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {order.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="px-1.5 py-0.5 bg-slate-700 text-slate-300 text-[10px] rounded">{tag}</span>
                        ))}
                        {order.tags.length > 2 && <span className="text-[10px] text-slate-500">+{order.tags.length - 2}</span>}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-white">{formatDate(order.createdAt)}</div>
                    <div className="text-xs text-slate-500">{formatTime(order.createdAt)}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-white">{order.customer.name}</div>
                    <div className="text-xs text-slate-400">{order.customer.email}</div>
                    <div className="text-xs text-slate-500">{order.customer.address.city}, {order.customer.address.state}</div>
                  </td>
                  <td className="px-4 py-4"><ChannelBadge channel={order.channel} /></td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-white">{order.items.reduce((sum, item) => sum + item.quantity, 0)} items</div>
                    <div className="text-xs text-slate-500">{order.items.length} SKUs</div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="text-sm font-medium text-white">{formatCurrency(order.total)}</div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className={`text-sm font-medium ${order.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{formatCurrency(order.profit)}</div>
                  </td>
                  <td className="px-4 py-4 text-center"><MarginBadge margin={order.margin} /></td>
                  <td className="px-4 py-4 text-center"><OrderStatusBadge status={order.status} /></td>
                  <td className="px-4 py-4">
                    {order.trackingNumber ? (
                      <div>
                        <div className="text-xs text-emerald-400">{order.carrier || 'Shipped'}</div>
                        <div className="font-mono text-xs text-slate-300 truncate max-w-[120px]" title={order.trackingNumber}>{order.trackingNumber}</div>
                      </div>
                    ) : order.status === 'shipped' || order.status === 'delivered' ? (
                      <span className="text-xs text-slate-500">No tracking</span>
                    ) : (
                      <span className="text-xs text-slate-600">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="py-12 text-center">
            <i className="fas fa-inbox text-4xl text-slate-600 mb-4"></i>
            <p className="text-sm text-slate-400">No orders found</p>
            {searchQuery && <button onClick={() => setSearchQuery('')} className="mt-2 text-emerald-400 hover:text-emerald-300 text-sm">Clear search</button>}
          </div>
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filteredOrders.length}
          itemsPerPage={itemsPerPage} itemLabel="orders" onPageChange={setCurrentPage} />
      </div>

      <CreateOrderModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <CreatePickBatchModal isOpen={isPickBatchModalOpen} onClose={() => { setIsPickBatchModalOpen(false); setSelectedOrders(new Set()); }} selectedOrderIds={Array.from(selectedOrders)} />
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<div className="p-6 text-slate-400">Loading orders...</div>}>
      <OrdersPageContent />
    </Suspense>
  );
}
