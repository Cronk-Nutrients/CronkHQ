'use client';

import { useState, useEffect, useRef, useMemo, Suspense, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useApp, Order } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { formatNumber, formatDate } from '@/lib/formatting';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ActiveFilters } from '@/components/ui/FilterBadge';
import {
  ScanLine,
  Package,
  Check,
  Clock,
  MapPin,
  ChevronRight,
  X,
  Search,
  ShoppingBag,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

interface PickItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  picked: boolean;
  binLocation?: string;
}

// Loading fallback
function PickPageLoading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-64 bg-slate-700/50 rounded animate-pulse" />
      <div className="h-32 bg-slate-800/50 rounded-xl animate-pulse" />
      <div className="grid grid-cols-3 gap-6">
        <div className="h-96 bg-slate-800/50 rounded-xl animate-pulse" />
        <div className="col-span-2 h-96 bg-slate-800/50 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}

export default function PickPage() {
  return (
    <Suspense fallback={<PickPageLoading />}>
      <PickPageContent />
    </Suspense>
  );
}

function PickPageContent() {
  const { state, dispatch } = useApp();
  const { success, error, warning } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [scanInput, setScanInput] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [pickItems, setPickItems] = useState<PickItem[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'to_pick' | 'picking'>('all');
  const [urlInitialized, setUrlInitialized] = useState(false);
  const scanInputRef = useRef<HTMLInputElement>(null);

  // Get pickable orders (to_pick or picking) with optional filter
  const pickableOrders = useMemo(() => {
    const orders = state.orders.filter(o => o.status === 'to_pick' || o.status === 'picking');
    if (statusFilter === 'all') return orders;
    return orders.filter(o => o.status === statusFilter);
  }, [state.orders, statusFilter]);

  // Initialize from URL params
  useEffect(() => {
    if (!urlInitialized) {
      const orderParam = searchParams.get('order');
      const statusParam = searchParams.get('status');

      if (statusParam === 'to_pick' || statusParam === 'picking') {
        setStatusFilter(statusParam);
      }

      // Auto-select order if specified in URL
      if (orderParam) {
        const order = state.orders.find(o =>
          o.orderNumber === orderParam || o.id === orderParam
        );
        if (order && (order.status === 'to_pick' || order.status === 'picking')) {
          handleSelectOrder(order);
        }
      }

      setUrlInitialized(true);
    }
  }, [searchParams, urlInitialized, state.orders]);

  // Update URL when filter changes
  const updateUrlParams = useCallback((newStatus: 'all' | 'to_pick' | 'picking') => {
    const params = new URLSearchParams();
    if (newStatus !== 'all') params.set('status', newStatus);
    const url = params.toString() ? `/fulfillment/pick?${params.toString()}` : '/fulfillment/pick';
    router.replace(url, { scroll: false });
  }, [router]);

  // Get active filters for display
  const activeFilters = useMemo(() => {
    const filters: { key: string; label: string; value: string }[] = [];
    if (statusFilter !== 'all') {
      filters.push({ key: 'status', label: 'Status', value: statusFilter === 'to_pick' ? 'To Pick' : 'Picking' });
    }
    return filters;
  }, [statusFilter]);

  // Handle filter removal
  const handleRemoveFilter = (key: string) => {
    if (key === 'status') {
      setStatusFilter('all');
      updateUrlParams('all');
    }
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    setStatusFilter('all');
    router.replace('/fulfillment/pick', { scroll: false });
  };

  // Get bin location for a product
  const getProductBinLocation = (productId: string) => {
    const inventory = state.inventory.find(i => i.productId === productId);
    return inventory?.binLocation || 'Unknown';
  };

  // Get total stock for a product
  const getProductStock = (productId: string) => {
    return state.inventory
      .filter(i => i.productId === productId)
      .reduce((sum, i) => sum + i.quantity, 0);
  };

  // Initialize pick items when order is selected
  useEffect(() => {
    if (selectedOrder) {
      setPickItems(selectedOrder.items.map(item => ({
        productId: item.productId,
        productName: item.productName,
        sku: item.sku,
        quantity: item.quantity,
        picked: item.picked || false,
        binLocation: getProductBinLocation(item.productId),
      })));
    } else {
      setPickItems([]);
    }
  }, [selectedOrder]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus scan input on any letter/number key (if not already focused on input)
      if (/^[a-zA-Z0-9]$/.test(e.key) && !e.ctrlKey && !e.metaKey) {
        const activeElement = document.activeElement;
        if (activeElement?.tagName !== 'INPUT' && activeElement?.tagName !== 'TEXTAREA') {
          scanInputRef.current?.focus();
        }
      }

      // Escape to clear selection
      if (e.key === 'Escape') {
        setSelectedOrder(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle scan/search
  const handleScan = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && scanInput.trim()) {
      const searchTerm = scanInput.toLowerCase().trim();

      // Find order by order number or ID
      const order = state.orders.find(o =>
        o.orderNumber.toLowerCase() === searchTerm ||
        o.id === searchTerm ||
        o.orderNumber.toLowerCase().includes(searchTerm)
      );

      if (order) {
        if (order.status !== 'to_pick' && order.status !== 'picking') {
          warning(`Order ${order.orderNumber} is not ready for picking (status: ${order.status})`);
          setScanInput('');
          return;
        }

        handleSelectOrder(order);
        setScanInput('');
      } else {
        error('Order not found');
      }
    }
  };

  // Handle order selection
  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);

    // If not already picking, update status
    if (order.status === 'to_pick') {
      dispatch({
        type: 'UPDATE_ORDER_STATUS',
        payload: { orderId: order.id, status: 'picking' },
      });
    }
  };

  // Toggle picked status for an item
  const handleTogglePicked = (index: number) => {
    setPickItems(prev => prev.map((item, i) =>
      i === index ? { ...item, picked: !item.picked } : item
    ));
  };

  // Pick all items
  const handlePickAll = () => {
    setPickItems(prev => prev.map(item => ({ ...item, picked: true })));
  };

  // Complete pick
  const handleCompletePick = () => {
    if (!selectedOrder) return;

    const allPicked = pickItems.every(item => item.picked);
    if (!allPicked) {
      error('Please pick all items before completing');
      return;
    }

    // Update order with picked items and status
    const updatedOrder: Order = {
      ...selectedOrder,
      status: 'to_pack',
      items: selectedOrder.items.map(item => ({
        ...item,
        picked: true,
      })),
      updatedAt: new Date(),
    };

    dispatch({ type: 'UPDATE_ORDER', payload: updatedOrder });
    success(`Order ${selectedOrder.orderNumber} ready for packing`);

    setSelectedOrder(null);
    setPickItems([]);
  };

  // Cancel pick (return to queue)
  const handleCancelPick = () => {
    if (!selectedOrder) return;

    if (selectedOrder.status === 'picking') {
      dispatch({
        type: 'UPDATE_ORDER_STATUS',
        payload: { orderId: selectedOrder.id, status: 'to_pick' },
      });
    }

    setSelectedOrder(null);
    setPickItems([]);
  };

  // Calculate progress
  const pickedCount = pickItems.filter(i => i.picked).length;
  const totalCount = pickItems.length;
  const progress = totalCount > 0 ? (pickedCount / totalCount) * 100 : 0;
  const allPicked = pickItems.every(item => item.picked);

  // Get channel badge
  const getChannelBadge = (channel: Order['channel']) => {
    const styles = {
      shopify: 'bg-green-500/20 text-green-400',
      amazon_fbm: 'bg-orange-500/20 text-orange-400',
      amazon_fba: 'bg-amber-500/20 text-amber-400',
      manual: 'bg-slate-500/20 text-slate-400',
    };

    const labels = {
      shopify: 'Shopify',
      amazon_fbm: 'Amazon FBM',
      amazon_fba: 'Amazon FBA',
      manual: 'Manual',
    };

    return (
      <span className={`px-2 py-0.5 rounded text-xs ${styles[channel]}`}>
        {labels[channel]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Fulfillment', href: '/fulfillment' }, { label: 'Pick Station' }]} />

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Pick Station</h1>
          <p className="text-slate-400">
            {pickableOrders.length} orders ready to pick
          </p>
        </div>
        {/* Status Filter Tabs */}
        <div className="flex items-center bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-1">
          {[
            { value: 'all', label: 'All' },
            { value: 'to_pick', label: 'To Pick' },
            { value: 'picking', label: 'Picking' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setStatusFilter(option.value as 'all' | 'to_pick' | 'picking');
                updateUrlParams(option.value as 'all' | 'to_pick' | 'picking');
              }}
              className={`px-4 py-2 text-sm rounded-lg transition-all ${
                statusFilter === option.value
                  ? 'bg-blue-500/20 text-blue-300'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <ActiveFilters
          filters={activeFilters}
          onRemove={handleRemoveFilter}
          onClearAll={handleClearAllFilters}
        />
      )}

      {/* Scan Input */}
      <Card>
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
              <ScanLine className="h-6 w-6 text-blue-400" />
            </div>
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                ref={scanInputRef}
                type="text"
                value={scanInput}
                onChange={e => setScanInput(e.target.value)}
                onKeyDown={handleScan}
                placeholder="Scan order barcode or enter order number..."
                className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                autoFocus
              />
            </div>
            <Button
              onClick={() => {
                if (scanInput.trim()) {
                  handleScan({ key: 'Enter' } as React.KeyboardEvent);
                }
              }}
            >
              Load Order
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Order Queue */}
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider">
            Orders to Pick ({pickableOrders.length})
          </h2>

          {pickableOrders.length === 0 ? (
            <Card>
              <div className="p-6 text-center">
                <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">No orders waiting to pick</p>
              </div>
            </Card>
          ) : (
            <div className="space-y-2">
              {pickableOrders.map(order => (
                <button
                  key={order.id}
                  onClick={() => handleSelectOrder(order)}
                  className={`w-full rounded-xl p-4 text-left transition-colors ${
                    selectedOrder?.id === order.id
                      ? 'bg-blue-500/20 border border-blue-500/50'
                      : 'bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">
                      #{order.orderNumber}
                    </span>
                    {order.status === 'picking' ? (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-blue-500/20 text-blue-400">
                        Picking
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-slate-700/50 text-slate-400">
                        Queued
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{order.items.length} items</span>
                    {getChannelBadge(order.channel)}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {order.customer.name}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Pick Interface */}
        <div className="lg:col-span-2 space-y-6">
          {selectedOrder ? (
            <>
              {/* Order Header */}
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        Order #{selectedOrder.orderNumber}
                      </h2>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-slate-400">
                          {selectedOrder.customer.name}
                        </span>
                        {getChannelBadge(selectedOrder.channel)}
                      </div>
                    </div>
                    <button
                      onClick={handleCancelPick}
                      className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                      title="Cancel and return to queue"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-white">{pickedCount} / {totalCount}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          allPicked ? 'bg-emerald-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Ship To */}
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                      <div className="text-sm">
                        <div className="text-white">{selectedOrder.customer.name}</div>
                        <div className="text-slate-400">
                          {selectedOrder.customer.address.city}, {selectedOrder.customer.address.state}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Pick List */}
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-md font-semibold text-white">Pick List</h3>
                    <Button variant="secondary" size="sm" onClick={handlePickAll}>
                      <Check className="w-4 h-4" />
                      Pick All
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {pickItems.map((item, index) => {
                      const stock = getProductStock(item.productId);
                      const hasStock = stock >= item.quantity;

                      return (
                        <div
                          key={index}
                          className={`
                            flex items-center gap-4 p-4 rounded-lg border transition-all cursor-pointer
                            ${item.picked
                              ? 'bg-emerald-500/10 border-emerald-500/30'
                              : hasStock
                                ? 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                                : 'bg-red-500/10 border-red-500/30'
                            }
                          `}
                          onClick={() => handleTogglePicked(index)}
                        >
                          {/* Checkbox */}
                          <button
                            className={`
                              w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors
                              ${item.picked
                                ? 'bg-emerald-500 border-emerald-500 text-white'
                                : 'border-slate-600 hover:border-slate-500'
                              }
                            `}
                          >
                            {item.picked && <Check className="w-4 h-4" />}
                          </button>

                          {/* Item Details */}
                          <div className="flex-1 min-w-0">
                            <div className={`font-medium ${item.picked ? 'text-emerald-400 line-through' : 'text-white'}`}>
                              {item.productName}
                            </div>
                            <div className="text-sm text-slate-400">SKU: {item.sku}</div>
                            {item.binLocation && (
                              <div className="flex items-center gap-1 mt-1">
                                <MapPin className="w-3 h-3 text-blue-400" />
                                <span className="text-sm text-blue-400 font-mono">
                                  Bin: {item.binLocation}
                                </span>
                              </div>
                            )}
                            {!hasStock && !item.picked && (
                              <div className="flex items-center gap-1 mt-1 text-red-400">
                                <AlertCircle className="w-3 h-3" />
                                <span className="text-xs">
                                  Only {formatNumber(stock)} in stock
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Quantity */}
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${item.picked ? 'text-emerald-400' : 'text-white'}`}>
                              x {item.quantity}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Complete Button */}
                  <div className="mt-6">
                    <Button
                      onClick={handleCompletePick}
                      disabled={!allPicked}
                      className="w-full"
                    >
                      <Check className="w-4 h-4" />
                      {allPicked ? 'Complete Pick' : `Pick remaining ${totalCount - pickedCount} items`}
                      <ArrowRight className="w-4 h-4 ml-auto" />
                    </Button>
                    {allPicked && (
                      <p className="text-center text-xs text-emerald-400 mt-2">
                        All items picked - Ready to send to pack station
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            </>
          ) : (
            <Card>
              <div className="p-12 text-center">
                <Package className="mx-auto h-16 w-16 text-slate-600" />
                <h3 className="mt-4 text-lg font-medium text-white">
                  Select an Order
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  Scan an order barcode or select from the queue to start picking
                </p>

                {pickableOrders.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm text-slate-400 mb-3">Quick select:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {pickableOrders.slice(0, 5).map(order => (
                        <button
                          key={order.id}
                          onClick={() => handleSelectOrder(order)}
                          className="rounded-lg bg-slate-700/50 px-4 py-2 text-sm text-white hover:bg-slate-700 transition-colors"
                        >
                          #{order.orderNumber}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
