'use client';

import { useState, useMemo, Suspense, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useApp, Order } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { ActiveFilters } from '@/components/ui/FilterBadge';
import { CreateOrderModal } from '@/components/modals/CreateOrderModal';
import { CreatePickBatchModal } from '@/components/modals/CreatePickBatchModal';
import { formatCurrency, formatNumber } from '@/lib/formatting';

type StatusFilter = Order['status'] | '';
type ChannelFilter = Order['channel'] | '';
type DateFilter = 'all' | 'today' | 'yesterday' | 'last7' | 'last30' | 'thisMonth';

function OrdersPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { state, dispatch } = useApp();
  const { success, warning } = useToast();

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isPickBatchModalOpen, setIsPickBatchModalOpen] = useState(false);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('');
  const [channelFilter, setChannelFilter] = useState<ChannelFilter>('');
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [urlInitialized, setUrlInitialized] = useState(false);

  // Initialize filters from URL
  useEffect(() => {
    if (!urlInitialized) {
      const status = searchParams.get('status') as StatusFilter;
      const channelParam = searchParams.get('channel');
      const search = searchParams.get('search');

      if (status) setStatusFilter(status);
      if (channelParam) {
        // Handle "amazon" as a special case to match both FBA and FBM
        if (channelParam === 'amazon') {
          setChannelFilter('amazon_fba'); // Default to FBA
        } else {
          setChannelFilter(channelParam as ChannelFilter);
        }
      }
      if (search) setSearchQuery(search);

      setUrlInitialized(true);
    }
  }, [searchParams, urlInitialized]);

  // Update URL when filters change
  const updateUrlParams = useCallback((newFilters: {
    status?: string;
    channel?: string;
    search?: string;
  }) => {
    const params = new URLSearchParams();
    const status = newFilters.status ?? statusFilter;
    const channel = newFilters.channel ?? channelFilter;
    const search = newFilters.search ?? searchQuery;

    if (status) params.set('status', status);
    if (channel) params.set('channel', channel);
    if (search) params.set('search', search);

    const url = params.toString() ? `/orders?${params.toString()}` : '/orders';
    router.replace(url, { scroll: false });
  }, [router, statusFilter, channelFilter, searchQuery]);

  // Build active filters for display
  const activeFiltersList = useMemo(() => {
    const filters: Array<{ key: string; label: string; value: string }> = [];

    if (statusFilter) {
      const statusLabels: Record<string, string> = {
        draft: 'Draft', to_pick: 'To Pick', picking: 'Picking',
        to_pack: 'To Pack', packing: 'Packing', ready: 'Ready',
        shipped: 'Shipped', delivered: 'Delivered', cancelled: 'Cancelled',
      };
      filters.push({ key: 'status', label: 'Status', value: statusLabels[statusFilter] || statusFilter });
    }

    if (channelFilter) {
      const channelLabels: Record<string, string> = {
        shopify: 'Shopify', amazon_fba: 'Amazon FBA', amazon_fbm: 'Amazon FBM', manual: 'Manual',
      };
      filters.push({ key: 'channel', label: 'Channel', value: channelLabels[channelFilter] || channelFilter });
    }

    if (searchQuery) {
      filters.push({ key: 'search', label: 'Search', value: searchQuery });
    }

    if (dateFilter !== 'all') {
      const dateLabels: Record<string, string> = {
        today: 'Today', yesterday: 'Yesterday', last7: 'Last 7 Days', last30: 'Last 30 Days', thisMonth: 'This Month',
      };
      filters.push({ key: 'date', label: 'Date', value: dateLabels[dateFilter] });
    }

    return filters;
  }, [statusFilter, channelFilter, searchQuery, dateFilter]);

  // Handle filter removal
  const handleRemoveFilter = (key: string) => {
    if (key === 'status') {
      setStatusFilter('');
      updateUrlParams({ status: '' });
    } else if (key === 'channel') {
      setChannelFilter('');
      updateUrlParams({ channel: '' });
    } else if (key === 'search') {
      setSearchQuery('');
      updateUrlParams({ search: '' });
    } else if (key === 'date') {
      setDateFilter('all');
    }
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    setStatusFilter('');
    setChannelFilter('');
    setSearchQuery('');
    setDateFilter('all');
    router.replace('/orders', { scroll: false });
  };

  // Selection states
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sync state
  const [isSyncing, setIsSyncing] = useState(false);

  // Date filtering helper
  const filterByDate = (date: Date, filter: DateFilter) => {
    const orderDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (filter) {
      case 'today':
        return orderDate >= today;
      case 'yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        return orderDate >= yesterday && orderDate < today;
      case 'last7':
        const last7 = new Date(today);
        last7.setDate(last7.getDate() - 7);
        return orderDate >= last7;
      case 'last30':
        const last30 = new Date(today);
        last30.setDate(last30.getDate() - 30);
        return orderDate >= last30;
      case 'thisMonth':
        return orderDate.getMonth() === today.getMonth() &&
               orderDate.getFullYear() === today.getFullYear();
      default:
        return true;
    }
  };

  // Filter orders
  const filteredOrders = useMemo(() => {
    return state.orders.filter(order => {
      // Search
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());

      // Status
      const matchesStatus = !statusFilter || order.status === statusFilter;

      // Channel
      const matchesChannel = !channelFilter || order.channel === channelFilter;

      // Date
      const matchesDate = filterByDate(order.createdAt, dateFilter);

      return matchesSearch && matchesStatus && matchesChannel && matchesDate;
    });
  }, [state.orders, searchQuery, statusFilter, channelFilter, dateFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate stats from real data
  const stats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

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

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get channel badge
  const getChannelBadge = (channel: Order['channel']) => {
    switch (channel) {
      case 'shopify':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full border border-green-500/20">
            <i className="fab fa-shopify"></i>
            Shopify
          </span>
        );
      case 'amazon_fbm':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-500/10 text-orange-400 text-xs font-medium rounded-full border border-orange-500/20">
            <i className="fab fa-amazon"></i>
            FBM
          </span>
        );
      case 'amazon_fba':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-500/10 text-orange-400 text-xs font-medium rounded-full border border-orange-500/20">
            <i className="fab fa-amazon"></i>
            FBA
          </span>
        );
      case 'manual':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-500/10 text-slate-400 text-xs font-medium rounded-full border border-slate-500/20">
            <i className="fas fa-user"></i>
            Manual
          </span>
        );
    }
  };

  // Get status badge
  const getStatusBadge = (status: Order['status']) => {
    const styles: Record<Order['status'], { bg: string; text: string; icon: string; label: string }> = {
      draft: { bg: 'bg-slate-500/10', text: 'text-slate-400', icon: 'fa-file-alt', label: 'Draft' },
      to_pick: { bg: 'bg-amber-500/10', text: 'text-amber-400', icon: 'fa-hand-pointer', label: 'To Pick' },
      picking: { bg: 'bg-blue-500/10', text: 'text-blue-400', icon: 'fa-clipboard-list', label: 'Picking' },
      to_pack: { bg: 'bg-purple-500/10', text: 'text-purple-400', icon: 'fa-box', label: 'To Pack' },
      packing: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', icon: 'fa-box-open', label: 'Packing' },
      ready: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', icon: 'fa-tag', label: 'Ready' },
      shipped: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', icon: 'fa-truck', label: 'Shipped' },
      delivered: { bg: 'bg-green-500/20', text: 'text-green-400', icon: 'fa-check', label: 'Delivered' },
      cancelled: { bg: 'bg-red-500/10', text: 'text-red-400', icon: 'fa-times', label: 'Cancelled' },
    };
    const style = styles[status];
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 ${style.bg} ${style.text} text-xs font-medium rounded-full border border-current/20`}>
        <i className={`fas ${style.icon} text-[10px]`}></i>
        {style.label}
      </span>
    );
  };

  // Handle stat click
  const handleStatClick = (status: StatusFilter) => {
    const newStatus = statusFilter === status ? '' : status;
    setStatusFilter(newStatus);
    setCurrentPage(1);
    if (urlInitialized) updateUrlParams({ status: newStatus });
  };

  // Handle checkbox
  const handleCheckbox = (orderId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelected = new Set(selectedOrders);
    if (newSelected.has(orderId)) {
      newSelected.delete(orderId);
    } else {
      newSelected.add(orderId);
    }
    setSelectedOrders(newSelected);
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedOrders.size === paginatedOrders.length) {
      setSelectedOrders(new Set());
    } else {
      setSelectedOrders(new Set(paginatedOrders.map(o => o.id)));
    }
  };

  // Sync orders (placeholder)
  const handleSyncOrders = async () => {
    setIsSyncing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSyncing(false);
    success('Orders synced successfully!');
  };

  // Export orders
  const handleExport = (orderIds?: string[]) => {
    const ordersToExport = orderIds
      ? state.orders.filter(o => orderIds.includes(o.id))
      : filteredOrders;

    const headers = ['Order #', 'Date', 'Customer', 'Email', 'Channel', 'Items', 'Total', 'COGS', 'Profit', 'Status'];

    const rows = ordersToExport.map(o => [
      o.orderNumber,
      formatDate(o.createdAt),
      o.customer.name,
      o.customer.email,
      o.channel,
      o.items.reduce((sum, i) => sum + i.quantity, 0),
      o.total.toFixed(2),
      o.cogs.toFixed(2),
      o.profit.toFixed(2),
      o.status
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    success(`Exported ${ordersToExport.length} orders`);
  };

  // Bulk actions
  const handleBulkAction = (action: string) => {
    if (selectedOrders.size === 0) return;

    switch (action) {
      case 'mark_picked':
        selectedOrders.forEach(id => {
          dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { orderId: id, status: 'to_pack' } });
        });
        success(`${selectedOrders.size} orders marked as picked`);
        setSelectedOrders(new Set());
        break;
      case 'create_pick_batch':
        setIsPickBatchModalOpen(true);
        // Don't clear selection - the modal needs it
        return;
      case 'export':
        handleExport(Array.from(selectedOrders));
        setSelectedOrders(new Set());
        break;
      default:
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
          <button
            onClick={() => handleExport()}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors flex items-center gap-2"
          >
            <i className="fas fa-download text-sm"></i>
            Export
          </button>
          <button
            onClick={handleSyncOrders}
            disabled={isSyncing}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isSyncing ? (
              <>
                <i className="fas fa-spinner fa-spin text-sm"></i>
                Syncing...
              </>
            ) : (
              <>
                <i className="fas fa-sync-alt text-sm"></i>
                Sync Orders
              </>
            )}
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <i className="fas fa-plus text-sm"></i>
            Manual Order
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-6 gap-4">
        {/* To Pick */}
        <div
          className={`bg-slate-800/50 backdrop-blur border rounded-xl p-4 cursor-pointer hover:bg-amber-500/10 transition-colors ${
            statusFilter === 'to_pick' ? 'border-amber-500/50 bg-amber-500/10 ring-2 ring-amber-500/30' : 'border-amber-500/30'
          }`}
          onClick={() => handleStatClick('to_pick')}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <i className="fas fa-hand-pointer text-amber-400"></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">{stats.toPick}</div>
              <div className="text-xs text-slate-400">To Pick</div>
            </div>
          </div>
        </div>

        {/* To Pack */}
        <div
          className={`bg-slate-800/50 backdrop-blur border rounded-xl p-4 cursor-pointer hover:bg-purple-500/10 transition-colors ${
            statusFilter === 'to_pack' ? 'border-purple-500/50 bg-purple-500/10 ring-2 ring-purple-500/30' : 'border-purple-500/30'
          }`}
          onClick={() => handleStatClick('to_pack')}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <i className="fas fa-box text-purple-400"></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">{stats.toPack}</div>
              <div className="text-xs text-slate-400">To Pack</div>
            </div>
          </div>
        </div>

        {/* Ready to Ship */}
        <div
          className={`bg-slate-800/50 backdrop-blur border rounded-xl p-4 cursor-pointer hover:bg-cyan-500/10 transition-colors ${
            statusFilter === 'ready' ? 'border-cyan-500/50 bg-cyan-500/10 ring-2 ring-cyan-500/30' : 'border-cyan-500/30'
          }`}
          onClick={() => handleStatClick('ready')}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <i className="fas fa-tag text-cyan-400"></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-cyan-400">{stats.ready}</div>
              <div className="text-xs text-slate-400">Ready to Ship</div>
            </div>
          </div>
        </div>

        {/* Shipped Today */}
        <div
          className={`bg-slate-800/50 backdrop-blur border rounded-xl p-4 cursor-pointer hover:bg-emerald-500/10 transition-colors ${
            statusFilter === 'shipped' ? 'border-emerald-500/50 bg-emerald-500/10 ring-2 ring-emerald-500/30' : 'border-emerald-500/30'
          }`}
          onClick={() => handleStatClick('shipped')}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <i className="fas fa-truck text-emerald-400"></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">{stats.shippedToday}</div>
              <div className="text-xs text-slate-400">Shipped Today</div>
            </div>
          </div>
        </div>

        {/* Today's Revenue */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
              <i className="fas fa-dollar-sign text-slate-400"></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{formatCurrency(stats.todayRevenue)}</div>
              <div className="text-xs text-slate-400">Today&apos;s Revenue</div>
            </div>
          </div>
        </div>

        {/* Today's Profit */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <i className="fas fa-chart-line text-emerald-400"></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">{formatCurrency(stats.todayProfit)}</div>
              <div className="text-xs text-slate-400">Today&apos;s Profit</div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Banner */}
      {activeFiltersList.length > 0 && (
        <ActiveFilters
          filters={activeFiltersList}
          onRemove={handleRemoveFilter}
          onClearAll={handleClearAllFilters}
        />
      )}

      {/* Filters Row */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input
              type="text"
              placeholder="Search by order #, customer name, email..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as StatusFilter);
              setCurrentPage(1);
            }}
            className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-emerald-500/50"
          >
            <option value="">All Statuses</option>
            <option value="to_pick">To Pick</option>
            <option value="picking">Picking</option>
            <option value="to_pack">To Pack</option>
            <option value="packing">Packing</option>
            <option value="ready">Ready</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Channel Filter */}
          <select
            value={channelFilter}
            onChange={(e) => {
              setChannelFilter(e.target.value as ChannelFilter);
              setCurrentPage(1);
            }}
            className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-emerald-500/50"
          >
            <option value="">All Channels</option>
            <option value="shopify">Shopify</option>
            <option value="amazon_fbm">Amazon FBM</option>
            <option value="amazon_fba">Amazon FBA</option>
            <option value="manual">Manual</option>
          </select>

          {/* Date Filter */}
          <select
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value as DateFilter);
              setCurrentPage(1);
            }}
            className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-emerald-500/50"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last7">Last 7 days</option>
            <option value="last30">Last 30 days</option>
            <option value="thisMonth">This month</option>
          </select>

          {/* Bulk Actions */}
          {selectedOrders.size > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">{selectedOrders.size} selected</span>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    handleBulkAction(e.target.value);
                    e.target.value = '';
                  }
                }}
                className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-emerald-500/50"
              >
                <option value="">Bulk Actions</option>
                <option value="create_pick_batch">Create Pick Batch</option>
                <option value="mark_picked">Mark as Picked</option>
                <option value="export">Export Selected</option>
              </select>
              <button
                onClick={() => setIsPickBatchModalOpen(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <i className="fas fa-clipboard-list text-sm"></i>
                Create Batch
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
                  <input
                    type="checkbox"
                    checked={selectedOrders.size === paginatedOrders.length && paginatedOrders.length > 0}
                    onChange={handleSelectAll}
                    className="rounded bg-slate-700 border-slate-600"
                  />
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
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {paginatedOrders.map((order) => {
                const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
                const skuCount = order.items.length;

                return (
                  <tr
                    key={order.id}
                    className={`transition-colors cursor-pointer hover:bg-slate-800/30 ${
                      selectedOrders.has(order.id) ? 'bg-emerald-500/5' : ''
                    }`}
                    onClick={() => router.push(`/orders/${order.id}`)}
                  >
                    {/* Checkbox */}
                    <td className="px-4 py-4" onClick={(e) => handleCheckbox(order.id, e)}>
                      <input
                        type="checkbox"
                        checked={selectedOrders.has(order.id)}
                        onChange={() => {}}
                        className="rounded bg-slate-700 border-slate-600"
                      />
                    </td>

                    {/* Order # */}
                    <td className="px-4 py-4">
                      <div className="font-mono text-sm font-medium text-white">#{order.orderNumber}</div>
                      {order.veeqoId && (
                        <div className="text-xs text-slate-500">Veeqo: {order.veeqoId}</div>
                      )}
                    </td>

                    {/* Date */}
                    <td className="px-4 py-4">
                      <div className="text-sm text-white">{formatDate(order.createdAt)}</div>
                      <div className="text-xs text-slate-500">{formatTime(order.createdAt)}</div>
                    </td>

                    {/* Customer */}
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-white">{order.customer.name}</div>
                      <div className="text-xs text-slate-400">{order.customer.email}</div>
                      <div className="text-xs text-slate-500">
                        {order.customer.address.city}, {order.customer.address.state}
                      </div>
                    </td>

                    {/* Channel */}
                    <td className="px-4 py-4">{getChannelBadge(order.channel)}</td>

                    {/* Items */}
                    <td className="px-4 py-4">
                      <div className="text-sm text-white">{totalItems} items</div>
                      <div className="text-xs text-slate-500">{skuCount} SKUs</div>
                    </td>

                    {/* Total */}
                    <td className="px-4 py-4 text-right">
                      <div className="text-sm font-medium text-white">{formatCurrency(order.total)}</div>
                    </td>

                    {/* Profit */}
                    <td className="px-4 py-4 text-right">
                      <div className={`text-sm font-medium ${order.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {formatCurrency(order.profit)}
                      </div>
                    </td>

                    {/* Margin */}
                    <td className="px-4 py-4 text-center">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                        order.margin >= 50 ? 'bg-emerald-500/10 text-emerald-400' :
                        order.margin >= 30 ? 'bg-amber-500/10 text-amber-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {order.margin.toFixed(1)}%
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 text-center">
                      {getStatusBadge(order.status)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="py-12 text-center">
            <i className="fas fa-inbox text-4xl text-slate-600 mb-4"></i>
            <p className="text-sm text-slate-400">No orders found</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-emerald-400 hover:text-emerald-300 text-sm"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="px-5 py-4 border-t border-slate-700/50 flex items-center justify-between">
            <div className="text-sm text-slate-400">
              Showing <span className="text-white">{((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredOrders.length)}</span> of <span className="text-white">{filteredOrders.length}</span> orders
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 rounded-lg transition-colors disabled:opacity-50"
              >
                <i className="fas fa-chevron-left text-sm"></i>
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      currentPage === pageNum
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 rounded-lg transition-colors disabled:opacity-50"
              >
                <i className="fas fa-chevron-right text-sm"></i>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create Order Modal */}
      <CreateOrderModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* Create Pick Batch Modal */}
      <CreatePickBatchModal
        isOpen={isPickBatchModalOpen}
        onClose={() => {
          setIsPickBatchModalOpen(false);
          setSelectedOrders(new Set());
        }}
        selectedOrderIds={Array.from(selectedOrders)}
      />
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
