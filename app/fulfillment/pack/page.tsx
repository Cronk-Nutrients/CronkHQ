'use client';

import { useState, useEffect, useRef, useMemo, Suspense, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useApp, Order, ShippingBox, Shipment } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { formatNumber, formatCurrency } from '@/lib/formatting';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ActiveFilters } from '@/components/ui/FilterBadge';
import { ChannelBadge } from '@/components/fulfillment';
import { StatusFilterTabs } from '@/components/fulfillment';
import {
  ScanLine,
  Package,
  Box,
  Truck,
  Check,
  X,
  Search,
  Printer,
  Tag,
  Scale,
  Ruler,
  Camera,
  Sparkles,
  MapPin,
  AlertCircle,
} from 'lucide-react';

// Carrier configurations
const CARRIERS = [
  { id: 'usps', name: 'USPS', services: ['Priority Mail', 'First Class', 'Priority Express', 'Ground Advantage'] },
  { id: 'ups', name: 'UPS', services: ['Ground', '2-Day Air', 'Next Day Air', '3-Day Select'] },
  { id: 'fedex', name: 'FedEx', services: ['Ground', 'Express Saver', '2Day', 'Overnight', 'Home Delivery'] },
];

const generateTrackingNumber = (carrier: string) => {
  const prefix = carrier === 'usps' ? '9400' : carrier === 'ups' ? '1Z' : '7489';
  return prefix + Math.random().toString().slice(2, 14);
};

const estimateShippingCost = (carrier: string, service: string) => {
  const baseCosts: Record<string, number> = {
    'Priority Mail': 8.95, 'First Class': 4.50, 'Priority Express': 26.95, 'Ground Advantage': 5.45,
    'Ground': 9.25, '2-Day Air': 18.75, 'Next Day Air': 45.00, '3-Day Select': 14.50,
    'Express Saver': 15.95, '2Day': 22.50, 'Overnight': 55.00, 'Home Delivery': 10.50,
  };
  return baseCosts[service] || 10.00;
};

function PackPageLoading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-64 bg-slate-700/50 rounded animate-pulse" />
      <div className="h-32 bg-slate-800/50 rounded-xl animate-pulse" />
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 h-96 bg-slate-800/50 rounded-xl animate-pulse" />
        <div className="h-96 bg-slate-800/50 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}

export default function PackPage() {
  return (
    <Suspense fallback={<PackPageLoading />}>
      <PackPageContent />
    </Suspense>
  );
}

const statusFilterOptions = [
  { value: 'all', label: 'All' },
  { value: 'to_pack', label: 'To Pack' },
  { value: 'packing', label: 'Packing' },
];

function PackPageContent() {
  const { state, dispatch } = useApp();
  const { success, error, warning, info } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [scanInput, setScanInput] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedBox, setSelectedBox] = useState<ShippingBox | null>(null);
  const [carrier, setCarrier] = useState('');
  const [service, setService] = useState('');
  const [verifiedItems, setVerifiedItems] = useState<Record<string, number>>({});
  const [statusFilter, setStatusFilter] = useState<'all' | 'to_pack' | 'packing'>('all');
  const [urlInitialized, setUrlInitialized] = useState(false);
  const scanInputRef = useRef<HTMLInputElement>(null);

  // Get packable orders with optional filter
  const packableOrders = useMemo(() => {
    const orders = state.orders.filter(o => o.status === 'to_pack' || o.status === 'packing');
    if (statusFilter === 'all') return orders;
    return orders.filter(o => o.status === statusFilter);
  }, [state.orders, statusFilter]);

  // Initialize from URL params
  useEffect(() => {
    if (!urlInitialized) {
      const orderParam = searchParams.get('order');
      const statusParam = searchParams.get('status');

      if (statusParam === 'to_pack' || statusParam === 'packing') {
        setStatusFilter(statusParam);
      }

      if (orderParam) {
        const order = state.orders.find(o => o.orderNumber === orderParam || o.id === orderParam);
        if (order && (order.status === 'to_pack' || order.status === 'packing')) {
          handleSelectOrder(order);
        }
      }

      setUrlInitialized(true);
    }
  }, [searchParams, urlInitialized, state.orders]);

  // Update URL when filter changes
  const updateUrlParams = useCallback((newStatus: string) => {
    const params = new URLSearchParams();
    if (newStatus !== 'all') params.set('status', newStatus);
    const url = params.toString() ? `/fulfillment/pack?${params.toString()}` : '/fulfillment/pack';
    router.replace(url, { scroll: false });
  }, [router]);

  // Get active filters for display
  const activeFilters = useMemo(() => {
    const filters: { key: string; label: string; value: string }[] = [];
    if (statusFilter !== 'all') {
      filters.push({ key: 'status', label: 'Status', value: statusFilter === 'to_pack' ? 'To Pack' : 'Packing' });
    }
    return filters;
  }, [statusFilter]);

  const handleRemoveFilter = (key: string) => {
    if (key === 'status') {
      setStatusFilter('all');
      updateUrlParams('all');
    }
  };

  const handleClearAllFilters = () => {
    setStatusFilter('all');
    router.replace('/fulfillment/pack', { scroll: false });
  };

  // Calculate order volume and weight
  const calculateOrderVolume = (order: Order | null) => {
    if (!order) return 0;
    return order.items.reduce((sum, item) => {
      const product = state.products.find(p => p.id === item.productId);
      if (product?.dimensions) {
        const volume = product.dimensions.length * product.dimensions.width * product.dimensions.height;
        return sum + (volume * item.quantity);
      }
      return sum + (50 * item.quantity);
    }, 0);
  };

  const calculateOrderWeight = (order: Order | null) => {
    if (!order) return 0;
    return order.items.reduce((sum, item) => {
      const product = state.products.find(p => p.id === item.productId);
      return sum + ((product?.weight.value || 1) * item.quantity * 16);
    }, 0);
  };

  // Smart box suggestion
  const suggestedBox = useMemo(() => {
    if (!selectedOrder || !state.settings.smartBoxEnabled) return null;

    const orderVolume = calculateOrderVolume(selectedOrder);
    const orderWeight = calculateOrderWeight(selectedOrder);
    const bufferMultiplier = 1.1;

    return state.boxes
      .filter(box => box.smartBoxEligible)
      .filter(box => {
        const boxVolume = box.innerLength * box.innerWidth * box.innerHeight;
        return boxVolume >= orderVolume * bufferMultiplier && box.maxWeight >= orderWeight;
      })
      .sort((a, b) => {
        const volA = a.innerLength * a.innerWidth * a.innerHeight;
        const volB = b.innerLength * b.innerWidth * b.innerHeight;
        return volA - volB;
      })[0] || null;
  }, [selectedOrder, state.boxes, state.settings.smartBoxEnabled, state.products]);

  // Count bottles for gripper stickers
  const bottleCount = useMemo(() => {
    if (!selectedOrder) return 0;
    return selectedOrder.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [selectedOrder]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[a-zA-Z0-9]$/.test(e.key) && !e.ctrlKey && !e.metaKey) {
        const activeElement = document.activeElement;
        if (activeElement?.tagName !== 'INPUT' && activeElement?.tagName !== 'TEXTAREA' && activeElement?.tagName !== 'SELECT') {
          scanInputRef.current?.focus();
        }
      }

      if (e.key === 'Escape') {
        handleClearSelection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle scan/search
  const handleScan = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && scanInput.trim()) {
      const searchTerm = scanInput.toLowerCase().trim();

      // Check if it's an SKU for verification
      if (selectedOrder) {
        const item = selectedOrder.items.find(i => i.sku.toLowerCase() === searchTerm);
        if (item) {
          handleVerifyScan(item.sku);
          setScanInput('');
          return;
        }
      }

      // Find order
      const order = state.orders.find(o =>
        o.orderNumber.toLowerCase() === searchTerm ||
        o.id === searchTerm ||
        o.orderNumber.toLowerCase().includes(searchTerm)
      );

      if (order) {
        if (order.status !== 'to_pack' && order.status !== 'packing') {
          warning(`Order ${order.orderNumber} is not ready for packing (status: ${order.status})`);
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
    setVerifiedItems({});

    if (suggestedBox) {
      setSelectedBox(suggestedBox);
    }

    if (order.status === 'to_pack') {
      dispatch({
        type: 'UPDATE_ORDER_STATUS',
        payload: { orderId: order.id, status: 'packing' },
      });
    }
  };

  // Handle verify scan
  const handleVerifyScan = (sku: string) => {
    const item = selectedOrder?.items.find(i => i.sku === sku);
    if (!item) {
      error(`Item ${sku} not in this order!`);
      return;
    }

    const currentVerified = verifiedItems[sku] || 0;
    if (currentVerified >= item.quantity) {
      warning(`Already verified all ${item.quantity} of ${sku}`);
      return;
    }

    setVerifiedItems(prev => ({ ...prev, [sku]: (prev[sku] || 0) + 1 }));
    success(`Verified ${sku} (${currentVerified + 1}/${item.quantity})`);
  };

  // Clear selection
  const handleClearSelection = () => {
    if (selectedOrder && selectedOrder.status === 'packing') {
      dispatch({
        type: 'UPDATE_ORDER_STATUS',
        payload: { orderId: selectedOrder.id, status: 'to_pack' },
      });
    }

    setSelectedOrder(null);
    setSelectedBox(null);
    setCarrier('');
    setService('');
    setVerifiedItems({});
  };

  // Get product by SKU
  const getProductIdBySku = (sku: string) => {
    const product = state.products.find(p => p.sku === sku);
    return product?.id || '';
  };

  // Handle print label & ship
  const handlePrintAndShip = () => {
    if (!selectedOrder) return;

    if (!selectedBox) {
      error('Please select a box');
      return;
    }
    if (!carrier || !service) {
      error('Please select carrier and service');
      return;
    }

    const trackingNumber = generateTrackingNumber(carrier);
    const shippingCost = estimateShippingCost(carrier, service);

    const shipment: Shipment = {
      id: crypto.randomUUID(),
      orderId: selectedOrder.id,
      orderNumber: selectedOrder.orderNumber,
      carrier: carrier as Shipment['carrier'],
      service,
      trackingNumber,
      customerPaid: selectedOrder.shipping,
      actualCost: shippingCost,
      profit: selectedOrder.shipping - shippingCost,
      weight: calculateOrderWeight(selectedOrder),
      status: 'in_transit',
      customerName: selectedOrder.customer.name,
      customerCity: selectedOrder.customer.address.city,
      customerState: selectedOrder.customer.address.state,
      shippedAt: new Date(),
    };

    dispatch({ type: 'ADD_SHIPMENT', payload: shipment });

    const updatedOrder: Order = {
      ...selectedOrder,
      status: 'shipped',
      trackingNumber,
      carrier,
      service,
      shippedAt: new Date(),
      updatedAt: new Date(),
    };

    dispatch({ type: 'UPDATE_ORDER', payload: updatedOrder });

    // Deduct gripper stickers if enabled
    if (state.settings.gripperStickerEnabled && state.settings.gripperStickerSku) {
      const gripperProductId = getProductIdBySku(state.settings.gripperStickerSku);
      if (gripperProductId) {
        const defaultLoc = state.locations.find(l => l.isDefault);
        const locationId = defaultLoc?.id || state.locations[0]?.id || 'loc-1';

        dispatch({
          type: 'ADJUST_STOCK',
          payload: { productId: gripperProductId, locationId, adjustment: -bottleCount },
        });
      }
    }

    success(`Order ${selectedOrder.orderNumber} shipped! Tracking: ${trackingNumber}`);
    handleClearSelection();
  };

  const orderVolume = calculateOrderVolume(selectedOrder);
  const orderWeight = calculateOrderWeight(selectedOrder);

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Fulfillment', href: '/fulfillment' }, { label: 'Pack Station' }]} />

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Pack Station</h1>
          <p className="text-slate-400">{packableOrders.length} orders ready to pack</p>
        </div>
        <StatusFilterTabs
          options={statusFilterOptions}
          value={statusFilter}
          onChange={(v) => {
            setStatusFilter(v as 'all' | 'to_pack' | 'packing');
            updateUrlParams(v);
          }}
          accentColor="purple"
        />
      </div>

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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
              <ScanLine className="h-6 w-6 text-purple-400" />
            </div>
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                ref={scanInputRef}
                type="text"
                value={scanInput}
                onChange={e => setScanInput(e.target.value)}
                onKeyDown={handleScan}
                placeholder={selectedOrder ? "Scan SKU to verify item..." : "Scan order barcode or enter order number..."}
                className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                autoFocus
              />
            </div>
            <Button onClick={() => scanInput.trim() && handleScan({ key: 'Enter' } as React.KeyboardEvent)}>
              {selectedOrder ? 'Verify' : 'Load Order'}
            </Button>
          </div>
        </div>
      </Card>

      {selectedOrder ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info */}
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-white">Order #{selectedOrder.orderNumber}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-slate-400">{selectedOrder.customer.name}</span>
                      <ChannelBadge channel={selectedOrder.channel} />
                    </div>
                  </div>
                  <button
                    onClick={handleClearSelection}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Order Items */}
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => {
                    const verified = verifiedItems[item.sku] || 0;
                    const isVerified = verified >= item.quantity;

                    return (
                      <div
                        key={index}
                        className={`flex items-center justify-between rounded-lg p-3 ${
                          isVerified
                            ? 'bg-emerald-500/10 border border-emerald-500/30'
                            : 'bg-slate-700/30 border border-slate-600/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                            isVerified ? 'bg-emerald-500/20' : 'bg-slate-700/50'
                          }`}>
                            {isVerified ? (
                              <Check className="h-5 w-5 text-emerald-400" />
                            ) : (
                              <Package className="h-5 w-5 text-slate-400" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{item.productName}</p>
                            <p className="text-xs text-slate-400">SKU: {item.sku}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-white">{verified} / {item.quantity}</p>
                          <p className="text-xs text-slate-400">verified</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Gripper Stickers Info */}
                {state.settings.gripperStickerEnabled && (
                  <div className="mt-4 rounded-lg bg-amber-500/10 border border-amber-500/30 p-3">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-amber-400" />
                      <span className="text-sm text-amber-300">
                        {bottleCount} gripper sticker{bottleCount !== 1 ? 's' : ''} will be auto-deducted
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Shipping Address */}
            <Card>
              <div className="p-6">
                <h3 className="text-md font-semibold text-white mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  Ship To
                </h3>
                <div className="text-sm text-slate-300">
                  <p className="font-medium">{selectedOrder.customer.name}</p>
                  <p>{selectedOrder.customer.address.street}</p>
                  <p>
                    {selectedOrder.customer.address.city}, {selectedOrder.customer.address.state} {selectedOrder.customer.address.zip}
                  </p>
                  <p>{selectedOrder.customer.address.country}</p>
                </div>
              </div>
            </Card>

            {/* Photo Capture Placeholder */}
            <Card>
              <div className="p-6">
                <h3 className="text-md font-semibold text-white mb-4 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-slate-400" />
                  Pack Photo
                </h3>
                <button
                  onClick={() => info('Photo capture coming in a future update')}
                  className="w-full p-8 border-2 border-dashed border-slate-600 rounded-lg text-slate-400 hover:border-slate-500 hover:text-slate-300 transition-colors"
                >
                  <Camera className="w-8 h-8 mx-auto mb-2" />
                  <div>Capture Photo</div>
                  <div className="text-xs mt-1">Coming in a future update</div>
                </button>
              </div>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Box Selection */}
            <Card>
              <div className="p-6">
                <h3 className="text-md font-semibold text-white mb-4 flex items-center gap-2">
                  <Box className="w-4 h-4 text-slate-400" />
                  Select Box
                </h3>

                {/* Order Volume Info */}
                <div className="mb-4 rounded-lg bg-slate-700/30 p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Ruler className="w-3 h-3" />
                      Volume:
                    </span>
                    <span className="text-white">{formatNumber(orderVolume)} cu in</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Scale className="w-3 h-3" />
                      Weight:
                    </span>
                    <span className="text-white">{(orderWeight / 16).toFixed(1)} lbs</span>
                  </div>
                  {suggestedBox && (
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-600/30">
                      <Sparkles className="h-4 w-4 text-emerald-400" />
                      <span className="text-xs text-emerald-400">Suggested: {suggestedBox.name}</span>
                    </div>
                  )}
                </div>

                {state.boxes.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-sm text-slate-400">No boxes configured</p>
                    <p className="text-xs text-slate-500 mt-1">Add boxes in Settings</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {state.boxes.map(box => {
                      const boxVolume = box.innerLength * box.innerWidth * box.innerHeight;
                      const fitsVolume = boxVolume >= orderVolume * 1.1;
                      const fitsWeight = box.maxWeight >= orderWeight;
                      const fits = fitsVolume && fitsWeight;
                      const isSuggested = box.id === suggestedBox?.id;

                      return (
                        <button
                          key={box.id}
                          onClick={() => fits && setSelectedBox(box)}
                          disabled={!fits}
                          className={`w-full flex items-center justify-between rounded-lg p-3 text-left transition-colors ${
                            selectedBox?.id === box.id
                              ? 'bg-emerald-500/20 border border-emerald-500/50'
                              : fits
                                ? 'bg-slate-700/30 border border-slate-600/30 hover:bg-slate-700/50'
                                : 'bg-slate-700/20 border border-slate-700/30 opacity-50 cursor-not-allowed'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-white">{box.name}</p>
                              {isSuggested && (
                                <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-xs text-emerald-400">Best Fit</span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400">
                              {box.innerLength}" x {box.innerWidth}" x {box.innerHeight}"
                            </p>
                          </div>
                          <div className="text-right">
                            {box.cost && <p className="text-sm text-slate-300">{formatCurrency(box.cost)}</p>}
                            {!fits && <p className="text-xs text-red-400">{!fitsVolume ? 'Too small' : 'Too heavy'}</p>}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </Card>

            {/* Carrier & Service Selection */}
            <Card>
              <div className="p-6">
                <h3 className="text-md font-semibold text-white mb-4 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-slate-400" />
                  Shipping
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Carrier</label>
                    <select
                      value={carrier}
                      onChange={e => { setCarrier(e.target.value); setService(''); }}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                    >
                      <option value="">Select carrier...</option>
                      {CARRIERS.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Service</label>
                    <select
                      value={service}
                      onChange={e => setService(e.target.value)}
                      disabled={!carrier}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50 disabled:opacity-50"
                    >
                      <option value="">Select service...</option>
                      {CARRIERS.find(c => c.id === carrier)?.services.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {carrier && service && (
                    <div className="rounded-lg bg-slate-700/30 p-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Estimated Cost:</span>
                        <span className="text-white font-medium">{formatCurrency(estimateShippingCost(carrier, service))}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span className="text-slate-400">Customer Paid:</span>
                        <span className="text-white">{formatCurrency(selectedOrder.shipping)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1 pt-1 border-t border-slate-600/30">
                        <span className="text-slate-400">Profit:</span>
                        <span className={`font-medium ${
                          selectedOrder.shipping - estimateShippingCost(carrier, service) >= 0 ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {formatCurrency(selectedOrder.shipping - estimateShippingCost(carrier, service))}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                variant="secondary"
                onClick={() => info('Print preview coming soon')}
                disabled={!selectedBox || !carrier || !service}
                className="w-full"
              >
                <Printer className="w-4 h-4" />
                Print Label
              </Button>
              <Button
                onClick={handlePrintAndShip}
                disabled={!selectedBox || !carrier || !service}
                className="w-full"
              >
                <Truck className="w-4 h-4" />
                Print & Ship
              </Button>
            </div>

            {/* Validation Warning */}
            {(!selectedBox || !carrier || !service) && (
              <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-400 mt-0.5" />
                  <div className="text-xs text-amber-300">
                    {!selectedBox && <p>Please select a box</p>}
                    {!carrier && <p>Please select a carrier</p>}
                    {carrier && !service && <p>Please select a service</p>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Card>
          <div className="p-12 text-center">
            <Package className="mx-auto h-16 w-16 text-slate-600" />
            <h3 className="mt-4 text-lg font-medium text-white">No Order Selected</h3>
            <p className="mt-2 text-sm text-slate-400">
              Scan an order barcode or select an order to begin packing
            </p>

            {packableOrders.length > 0 && (
              <div className="mt-6">
                <p className="text-sm text-slate-400 mb-3">Orders ready to pack:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {packableOrders.slice(0, 8).map(order => (
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
  );
}
