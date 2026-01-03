'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { EditOrderModal, CreateReturnModal } from '@/components/modals';
import { useToast } from '@/components/ui/Toast';
import { formatCurrency, formatCurrencyPrecise } from '@/lib/formatting';
import { OrderStatusBadge, ChannelBadge, orderStatusConfig } from '@/components/orders/OrderBadges';
import { OrderShippingSection } from '@/components/OrderShippingSection';

// Helper to generate tracking URLs based on carrier
const getTrackingUrl = (carrier: string, trackingNumber: string): string => {
  const c = carrier.toLowerCase();
  if (c.includes('usps')) {
    return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`;
  } else if (c.includes('ups')) {
    return `https://www.ups.com/track?tracknum=${trackingNumber}`;
  } else if (c.includes('fedex')) {
    return `https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`;
  } else if (c.includes('dhl')) {
    return `https://www.dhl.com/en/express/tracking.html?AWB=${trackingNumber}`;
  } else if (c.includes('amazon') || c.includes('amzl')) {
    return `https://track.amazon.com/tracking/${trackingNumber}`;
  }
  return `https://www.google.com/search?q=${trackingNumber}+tracking`;
};

// Packing supplies cost data (these would come from settings in a real app)
interface PackingSupplyCost {
  gripperSticker: number;
  boxes: Record<string, { name: string; cost: number; dimensions: string }>;
}

const PACKING_COSTS: PackingSupplyCost = {
  gripperSticker: 0.05, // $0.05 per gripper sticker
  boxes: {
    'small': { name: 'Small Box', cost: 0.75, dimensions: '8 x 6 x 4' },
    'medium': { name: 'Medium Box', cost: 1.25, dimensions: '12 x 6 x 8' },
    'large': { name: 'Large Box', cost: 1.75, dimensions: '14 x 10 x 10' },
    'xl': { name: 'XL Box', cost: 2.50, dimensions: '18 x 14 x 12' },
  }
};

// Helper to determine recommended box based on item count
const getRecommendedBox = (totalUnits: number): { key: string; box: { name: string; cost: number; dimensions: string } } => {
  if (totalUnits <= 2) return { key: 'small', box: PACKING_COSTS.boxes.small };
  if (totalUnits <= 4) return { key: 'medium', box: PACKING_COSTS.boxes.medium };
  if (totalUnits <= 8) return { key: 'large', box: PACKING_COSTS.boxes.large };
  return { key: 'xl', box: PACKING_COSTS.boxes.xl };
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { state, dispatch } = useApp();
  const { success } = useToast();
  const orderId = params.id as string;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [isEditingPackingSupplies, setIsEditingPackingSupplies] = useState(false);
  const [customPackingSupplies, setCustomPackingSupplies] = useState<{
    gripperStickers: number;
    boxSize: string;
  } | null>(null);

  const order = state.orders.find(o => o.id === orderId);

  // Show loading state while data is being fetched
  if (state.isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-700 rounded-lg animate-pulse"></div>
          <div className="space-y-2">
            <div className="w-48 h-6 bg-slate-700 rounded animate-pulse"></div>
            <div className="w-32 h-4 bg-slate-700 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl h-64 animate-pulse"></div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl h-48 animate-pulse"></div>
          </div>
          <div className="space-y-6">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl h-48 animate-pulse"></div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl h-32 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <i className="fas fa-arrow-left text-slate-400"></i>
          </button>
          <h1 className="text-2xl font-bold text-white">Order Not Found</h1>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-8 text-center">
          <i className="fas fa-box-open text-4xl text-slate-600 mb-4"></i>
          <p className="text-slate-400">The order you're looking for doesn't exist.</p>
          <p className="text-slate-500 text-sm mt-2">Order ID: {orderId}</p>
          <p className="text-slate-500 text-sm mt-1">Available orders: {state.orders.length}</p>
          <Link href="/orders" className="mt-4 inline-block px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg">
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  // Find related shipment
  const shipment = state.shipments.find(s => s.orderNumber === order.orderNumber);

  // Find current picking batch
  const currentBatch = order.pickingBatchId
    ? state.pickingBatches.find(b => b.id === order.pickingBatchId)
    : null;

  // Calculate total items
  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

  // Handle batch assignment
  const handleAssignBatch = (batchId: string | null) => {
    dispatch({
      type: 'ASSIGN_ORDER_TO_BATCH',
      payload: { orderId: order.id, batchId }
    });
    if (batchId) {
      const batch = state.pickingBatches.find(b => b.id === batchId);
      success(`Order assigned to batch ${batch?.batchNumber}`);
    } else {
      success('Order removed from batch');
    }
  };

  // Create new batch with this order
  const handleCreateBatch = () => {
    const batchNum = state.pickingBatches.length + 1;
    const newBatch = {
      id: `batch-${Date.now()}`,
      batchNumber: `PB-${String(batchNum).padStart(3, '0')}`,
      status: 'open' as const,
      orderIds: [order.id],
      createdAt: new Date(),
    };
    dispatch({ type: 'ADD_PICKING_BATCH', payload: newBatch });
    dispatch({ type: 'ASSIGN_ORDER_TO_BATCH', payload: { orderId: order.id, batchId: newBatch.id } });
    success(`Created new batch ${newBatch.batchNumber} with this order`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <i className="fas fa-arrow-left text-slate-400"></i>
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white">Order #{order.orderNumber}</h1>
              <OrderStatusBadge status={order.status} />
            </div>
            <p className="text-sm text-slate-400">
              {new Date(order.createdAt).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            {/* Tracking Info - Prominent when shipped */}
            {(order.status === 'shipped' || order.status === 'delivered') && shipment && (
              <div className="mt-2 flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                  <i className="fas fa-truck text-purple-400 text-sm"></i>
                  <span className="text-purple-300 font-medium">{shipment.carrier.toUpperCase()}</span>
                  {shipment.service && <span className="text-purple-400/70 text-sm">• {shipment.service}</span>}
                </div>
                {shipment.trackingNumber && (
                  <a
                    href={getTrackingUrl(shipment.carrier, shipment.trackingNumber)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/20 transition-colors"
                  >
                    <i className="fas fa-location-arrow text-emerald-400 text-sm"></i>
                    <span className="text-emerald-300 font-mono text-sm">{shipment.trackingNumber}</span>
                    <i className="fas fa-external-link-alt text-emerald-400 text-xs"></i>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors flex items-center gap-2">
            <i className="fas fa-print text-sm"></i>
            Print
          </button>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors flex items-center gap-2"
          >
            <i className="fas fa-edit text-sm"></i>
            Edit Order
          </button>
          {order.status === 'to_pick' && (
            <Link
              href="/fulfillment/pick"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <i className="fas fa-hand text-sm"></i>
              Pick Order
            </Link>
          )}
          {order.status === 'to_pack' && (
            <Link
              href="/fulfillment/pack"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <i className="fas fa-box text-sm"></i>
              Pack Order
            </Link>
          )}
          {(order.status === 'shipped' || order.status === 'delivered') && (
            <button
              onClick={() => setIsReturnModalOpen(true)}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <i className="fas fa-undo-alt text-sm"></i>
              Create Return
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700/50">
              <h2 className="font-semibold text-white">Order Items</h2>
              <p className="text-xs text-slate-400">{order.items.length} line items • {totalItems} total units</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/50">
                  <tr className="text-left text-xs text-slate-400 uppercase tracking-wider">
                    <th className="px-5 py-3 font-medium">Product</th>
                    <th className="px-5 py-3 font-medium text-center">Qty</th>
                    <th className="px-5 py-3 font-medium text-right">Price</th>
                    <th className="px-5 py-3 font-medium text-right">Cost</th>
                    <th className="px-5 py-3 font-medium text-right">Total</th>
                    <th className="px-5 py-3 font-medium text-right">Profit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {order.items.map((item, idx) => {
                    const lineTotal = item.price * item.quantity;
                    const lineCost = item.cost * item.quantity;
                    const lineProfit = lineTotal - lineCost;
                    return (
                      <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                              <i className="fas fa-flask text-emerald-400"></i>
                            </div>
                            <div>
                              <div className="font-medium text-white">{item.productName}</div>
                              <div className="text-xs text-slate-400">SKU: {item.sku}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-center text-white">{item.quantity}</td>
                        <td className="px-5 py-4 text-right text-white">{formatCurrencyPrecise(item.price)}</td>
                        <td className="px-5 py-4 text-right text-slate-400">{formatCurrencyPrecise(item.cost)}</td>
                        <td className="px-5 py-4 text-right text-white font-medium">{formatCurrencyPrecise(lineTotal)}</td>
                        <td className="px-5 py-4 text-right text-emerald-400 font-medium">{formatCurrencyPrecise(lineProfit)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Shipment Info - Legacy display (when shipment exists in old format) */}
          {shipment && !order.shipment && (
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-700/50">
                <h2 className="font-semibold text-white">Shipment</h2>
              </div>
              <div className="p-5">
                <div className="p-4 bg-slate-900/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-white">Tracking Information</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      shipment.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-400' :
                      shipment.status === 'in_transit' ? 'bg-blue-500/10 text-blue-400' :
                      'bg-slate-500/10 text-slate-400'
                    }`}>
                      {shipment.status === 'delivered' ? 'Delivered' :
                       shipment.status === 'in_transit' ? 'In Transit' :
                       shipment.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Carrier</div>
                      <div className="text-white font-medium">{shipment.carrier.toUpperCase()} {shipment.service}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Tracking Number</div>
                      <a
                        href="#"
                        className="text-purple-400 hover:text-purple-300 font-mono text-sm"
                      >
                        {shipment.trackingNumber}
                        <i className="fas fa-external-link-alt ml-2 text-xs"></i>
                      </a>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Shipped At</div>
                      <div className="text-white">{new Date(shipment.shippedAt).toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Weight</div>
                      <div className="text-white">{shipment.weight} lbs</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-700/50 grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Customer Paid</div>
                      <div className="text-white font-medium">{formatCurrencyPrecise(shipment.customerPaid)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Actual Cost</div>
                      <div className="text-white font-medium">{formatCurrencyPrecise(shipment.actualCost)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Shipping Profit</div>
                      <div className={`font-medium ${shipment.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {formatCurrencyPrecise(shipment.profit)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Shipping Section - Always visible, handles both shipping and shipped states */}
          <OrderShippingSection
            order={{
              id: order.id,
              orderNumber: order.orderNumber,
              veeqoAllocationId: order.veeqoAllocationId,
              lineItems: order.items,
              shippingAddress: order.customer?.address ? {
                name: order.customer.name,
                address1: order.customer.address.street,
                city: order.customer.address.city,
                state: order.customer.address.state,
                zip: order.customer.address.zip,
                country: order.customer.address.country,
                phone: order.customer.phone,
              } : null,
              customer: order.customer,
              fulfillmentStatus: order.status === 'shipped' || order.status === 'delivered' ? 'fulfilled' : order.status,
              status: order.status,
              shipment: order.shipment,
              packages: order.packages,
              // Shipping amount customer paid
              shipping: order.shipping,
              shippingTotal: order.shipping,
              // Customer's selected shipping method from Shopify
              customerShippingMethod: order.service || (order as any).shippingMethod || (order as any).requestedShippingService,
            }}
            onUpdate={(updatedOrder) => {
              // Update order in state if needed
              if (updatedOrder.shipment) {
                dispatch({
                  type: 'UPDATE_ORDER',
                  payload: {
                    ...order,
                    status: 'shipped',
                    shipment: updatedOrder.shipment,
                    packages: updatedOrder.packages,
                    updatedAt: new Date(),
                  }
                });
              }
            }}
          />

          {/* Order Timeline */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700/50">
              <h2 className="font-semibold text-white">Timeline</h2>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-check text-emerald-400 text-sm"></i>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Order Created</div>
                    <div className="text-xs text-slate-400">
                      {new Date(order.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
                {(order.status !== 'to_pick' && order.status !== 'cancelled') && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-hand text-amber-400 text-sm"></i>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Items Picked</div>
                      <div className="text-xs text-slate-400">Order moved to packing</div>
                    </div>
                  </div>
                )}
                {(order.status === 'ready' || order.status === 'shipped' || order.status === 'delivered') && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-box text-blue-400 text-sm"></i>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Packed & Labeled</div>
                      <div className="text-xs text-slate-400">Ready for carrier pickup</div>
                    </div>
                  </div>
                )}
                {(order.status === 'shipped' || order.status === 'delivered') && shipment && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-truck text-purple-400 text-sm"></i>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Shipped</div>
                      <div className="text-xs text-slate-400">
                        {new Date(shipment.shippedAt).toLocaleString()} via {shipment.carrier.toUpperCase()}
                      </div>
                    </div>
                  </div>
                )}
                {order.status === 'delivered' && shipment?.deliveredAt && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-check-double text-emerald-400 text-sm"></i>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Delivered</div>
                      <div className="text-xs text-slate-400">
                        {new Date(shipment.deliveredAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700/50">
              <h2 className="font-semibold text-white">Order Summary</h2>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Channel</span>
                <ChannelBadge channel={order.channel} />
              </div>
              {order.veeqoId && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Veeqo ID</span>
                  <span className="text-white font-mono text-sm">{order.veeqoId}</span>
                </div>
              )}
              <div className="border-t border-slate-700/50 pt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-white">{formatCurrencyPrecise(order.subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Shipping Paid</span>
                  <span className="text-white">{formatCurrencyPrecise(order.shipping)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Tax</span>
                  <span className="text-white">{formatCurrencyPrecise(order.tax)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Discount</span>
                    <span className="text-red-400">-{formatCurrencyPrecise(order.discount)}</span>
                  </div>
                )}
                {/* Discount Codes */}
                {(order as any).discountCodes && (order as any).discountCodes.length > 0 && (
                  <div className="pt-2">
                    <span className="text-xs text-slate-500">Codes used:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {(order as any).discountCodes.map((dc: { code: string; amount: number; type: string }, idx: number) => (
                        <span key={idx} className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                          {dc.code} ({dc.type === 'percentage' ? `${dc.amount}%` : formatCurrencyPrecise(dc.amount)})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-700/50">
                  <span className="text-white font-medium">Order Total</span>
                  <span className="text-white font-bold text-lg">{formatCurrencyPrecise(order.total)}</span>
                </div>
              </div>
              <div className="border-t border-slate-700/50 pt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">COGS (Product Cost)</span>
                  <span className="text-slate-300">{formatCurrencyPrecise(order.cogs)}</span>
                </div>
                {shipment && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Shipping Cost</span>
                    <span className="text-slate-300">{formatCurrencyPrecise(shipment.actualCost)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-700/50">
                  <span className="text-slate-400">Product Profit</span>
                  <span className="text-emerald-400 font-bold">{formatCurrencyPrecise(order.profit)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Margin</span>
                  <span className="text-emerald-400">{((order.profit / order.subtotal) * 100).toFixed(1)}%</span>
                </div>
                {shipment && (
                  <>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Shipping Profit</span>
                      <span className={`font-medium ${shipment.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {formatCurrencyPrecise(shipment.profit)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-700/50">
                      <span className="text-white font-medium">Total Profit</span>
                      <span className={`font-bold ${(order.profit + shipment.profit) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {formatCurrencyPrecise(order.profit + shipment.profit)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Net Margin</span>
                      <span className={`font-medium ${(order.profit + shipment.profit) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {(((order.profit + shipment.profit) / order.total) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Packing Supplies Cost */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700/50 flex items-center justify-between">
              <h2 className="font-semibold text-white">Packing Supplies</h2>
              <button
                onClick={() => {
                  if (isEditingPackingSupplies) {
                    setIsEditingPackingSupplies(false);
                  } else {
                    // Initialize with current values
                    const recommended = getRecommendedBox(totalItems);
                    setCustomPackingSupplies({
                      gripperStickers: customPackingSupplies?.gripperStickers ?? totalItems,
                      boxSize: customPackingSupplies?.boxSize ?? recommended.key,
                    });
                    setIsEditingPackingSupplies(true);
                  }
                }}
                className="text-xs text-slate-400 hover:text-emerald-400"
              >
                {isEditingPackingSupplies ? 'Cancel' : 'Edit'}
              </button>
            </div>
            <div className="p-5 space-y-4">
              {isEditingPackingSupplies && customPackingSupplies ? (
                <>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Gripper Stickers</label>
                    <input
                      type="number"
                      min="0"
                      value={customPackingSupplies.gripperStickers}
                      onChange={(e) => setCustomPackingSupplies({
                        ...customPackingSupplies,
                        gripperStickers: parseInt(e.target.value) || 0
                      })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Box Size</label>
                    <select
                      value={customPackingSupplies.boxSize}
                      onChange={(e) => setCustomPackingSupplies({
                        ...customPackingSupplies,
                        boxSize: e.target.value
                      })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
                    >
                      {Object.entries(PACKING_COSTS.boxes).map(([key, box]) => (
                        <option key={key} value={key}>
                          {box.name} ({box.dimensions}) - {formatCurrencyPrecise(box.cost)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => {
                      setIsEditingPackingSupplies(false);
                      success('Packing supplies updated');
                    }}
                    className="w-full px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm transition-colors"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  {(() => {
                    const gripperCount = customPackingSupplies?.gripperStickers ?? totalItems;
                    const boxKey = customPackingSupplies?.boxSize ?? getRecommendedBox(totalItems).key;
                    const box = PACKING_COSTS.boxes[boxKey];
                    const gripperCost = gripperCount * PACKING_COSTS.gripperSticker;
                    const totalPackingCost = gripperCost + box.cost;

                    return (
                      <>
                        <div className="p-3 bg-slate-900/50 rounded-lg space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <i className="fas fa-circle text-xs text-amber-400"></i>
                              <span className="text-slate-300">Gripper Stickers</span>
                            </div>
                            <div className="text-right">
                              <span className="text-white font-medium">{gripperCount}</span>
                              <span className="text-slate-500 text-xs ml-2">@ {formatCurrencyPrecise(PACKING_COSTS.gripperSticker)}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <i className="fas fa-box text-xs text-blue-400"></i>
                              <span className="text-slate-300">{box.name}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-white font-medium">{box.dimensions}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Stickers Cost</span>
                            <span className="text-slate-300">{formatCurrencyPrecise(gripperCost)}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Box Cost</span>
                            <span className="text-slate-300">{formatCurrencyPrecise(box.cost)}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-700/50">
                            <span className="text-white font-medium">Total Supplies</span>
                            <span className="text-amber-400 font-bold">{formatCurrencyPrecise(totalPackingCost)}</span>
                          </div>
                        </div>

                        {/* Net Margin with Packing Supplies */}
                        {shipment && (
                          <div className="mt-4 pt-4 border-t border-slate-700/50">
                            <div className="text-xs text-slate-400 mb-2">Net Margin (incl. packing)</div>
                            {(() => {
                              const netProfit = order.profit + shipment.profit - totalPackingCost;
                              const netMargin = (netProfit / order.total) * 100;
                              return (
                                <div className="flex items-center justify-between">
                                  <span className={`text-lg font-bold ${netProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {formatCurrencyPrecise(netProfit)}
                                  </span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    netMargin >= 30 ? 'bg-emerald-500/20 text-emerald-400' :
                                    netMargin >= 15 ? 'bg-amber-500/20 text-amber-400' :
                                    'bg-red-500/20 text-red-400'
                                  }`}>
                                    {netMargin.toFixed(1)}%
                                  </span>
                                </div>
                              );
                            })()}
                          </div>
                        )}
                      </>
                    );
                  })()}
                </>
              )}
            </div>
          </div>

          {/* Picking Batch */}
          {(order.status === 'to_pick' || order.status === 'picking') && (
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-700/50">
                <h2 className="font-semibold text-white">Picking Batch</h2>
              </div>
              <div className="p-5 space-y-3">
                {currentBatch ? (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">{currentBatch.batchNumber}</div>
                        <div className="text-xs text-slate-400">
                          {currentBatch.orderIds.length} orders • {currentBatch.status}
                        </div>
                      </div>
                      <button
                        onClick={() => handleAssignBatch(null)}
                        className="text-xs text-slate-400 hover:text-red-400"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-slate-400">Not assigned to a batch</div>
                )}

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Assign to Batch</label>
                  <select
                    value={order.pickingBatchId || ''}
                    onChange={(e) => handleAssignBatch(e.target.value || null)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
                  >
                    <option value="">Select batch...</option>
                    {state.pickingBatches
                      .filter(b => b.status !== 'completed')
                      .map(batch => (
                        <option key={batch.id} value={batch.id}>
                          {batch.batchNumber} ({batch.orderIds.length} orders)
                        </option>
                      ))}
                  </select>
                </div>

                <button
                  onClick={handleCreateBatch}
                  className="w-full px-3 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <i className="fas fa-plus text-xs"></i>
                  Create New Batch
                </button>
              </div>
            </div>
          )}

          {/* Order Notes & Tags */}
          {((order as any).note || ((order as any).tags && (order as any).tags.length > 0)) && (
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-700/50">
                <h2 className="font-semibold text-white">Notes & Tags</h2>
              </div>
              <div className="p-5 space-y-4">
                {(order as any).note && (
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Order Note</div>
                    <div className="text-sm text-white bg-slate-700/50 p-3 rounded-lg whitespace-pre-wrap">
                      {(order as any).note}
                    </div>
                  </div>
                )}
                {(order as any).tags && (order as any).tags.length > 0 && (
                  <div>
                    <div className="text-xs text-slate-400 mb-2">Tags</div>
                    <div className="flex flex-wrap gap-2">
                      {(order as any).tags.map((tag: string, idx: number) => (
                        <span key={idx} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Customer Info */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700/50">
              <h2 className="font-semibold text-white">Customer</h2>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <div className="text-white font-medium">{order.customer.name}</div>
                {order.customer.email && (
                  <div className="text-sm text-slate-400">{order.customer.email}</div>
                )}
                {order.customer.phone && (
                  <div className="text-sm text-slate-400">{order.customer.phone}</div>
                )}
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700/50">
              <h2 className="font-semibold text-white">Shipping Address</h2>
            </div>
            <div className="p-5">
              <div className="text-sm text-slate-300">
                <p>{order.customer.address.street}</p>
                <p>{order.customer.address.city}, {order.customer.address.state} {order.customer.address.zip}</p>
                <p>{order.customer.address.country}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700/50">
              <h2 className="font-semibold text-white">Quick Actions</h2>
            </div>
            <div className="p-4 space-y-2">
              <button className="w-full px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors flex items-center gap-2 text-sm">
                <i className="fas fa-copy w-4"></i>
                Duplicate Order
              </button>
              <button className="w-full px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors flex items-center gap-2 text-sm">
                <i className="fas fa-file-invoice w-4"></i>
                Generate Invoice
              </button>
              {order.status !== 'cancelled' && order.status !== 'shipped' && order.status !== 'delivered' && (
                <button className="w-full px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors flex items-center gap-2 text-sm">
                  <i className="fas fa-times w-4"></i>
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Order Modal */}
      <EditOrderModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        order={order}
      />

      {/* Create Return Modal */}
      <CreateReturnModal
        isOpen={isReturnModalOpen}
        onClose={() => setIsReturnModalOpen(false)}
        preselectedOrder={order}
      />
    </div>
  );
}
