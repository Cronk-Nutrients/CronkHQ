'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { EditOrderModal, CreateReturnModal } from '@/components/modals';
import { useToast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/formatting';
import { OrderStatusBadge, ChannelBadge, orderStatusConfig } from '@/components/orders/OrderBadges';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { state, dispatch } = useApp();
  const { success } = useToast();
  const orderId = params.id as string;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);

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
              href="/pick"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <i className="fas fa-hand text-sm"></i>
              Pick Order
            </Link>
          )}
          {order.status === 'to_pack' && (
            <Link
              href="/pack"
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
                        <td className="px-5 py-4 text-right text-white">{formatCurrency(item.price)}</td>
                        <td className="px-5 py-4 text-right text-slate-400">{formatCurrency(item.cost)}</td>
                        <td className="px-5 py-4 text-right text-white font-medium">{formatCurrency(lineTotal)}</td>
                        <td className="px-5 py-4 text-right text-emerald-400 font-medium">{formatCurrency(lineProfit)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Shipment Info */}
          {shipment && (
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
                      <div className="text-white font-medium">{formatCurrency(shipment.customerPaid)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Actual Cost</div>
                      <div className="text-white font-medium">{formatCurrency(shipment.actualCost)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Shipping Profit</div>
                      <div className={`font-medium ${shipment.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {formatCurrency(shipment.profit)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

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
                  <span className="text-white">{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Shipping</span>
                  <span className="text-white">{formatCurrency(order.shipping)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Tax</span>
                  <span className="text-white">{formatCurrency(order.tax)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Discount</span>
                    <span className="text-red-400">-{formatCurrency(order.discount)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-700/50">
                  <span className="text-white font-medium">Total</span>
                  <span className="text-white font-bold text-lg">{formatCurrency(order.total)}</span>
                </div>
              </div>
              <div className="border-t border-slate-700/50 pt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">COGS</span>
                  <span className="text-slate-300">{formatCurrency(order.cogs)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Profit</span>
                  <span className="text-emerald-400 font-bold">{formatCurrency(order.profit)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Margin</span>
                  <span className="text-emerald-400">{order.margin.toFixed(1)}%</span>
                </div>
              </div>
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
