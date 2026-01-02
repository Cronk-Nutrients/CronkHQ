'use client';

import { useState, useEffect } from 'react';
import { useApp, Order, ReturnReason, Return, ReturnItem } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/formatting';

interface CreateReturnModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedOrder?: Order | null;
}

const reasonLabels: Record<ReturnReason, string> = {
  damaged_in_transit: 'Damaged in Transit',
  defective: 'Defective Product',
  wrong_item_sent: 'Wrong Item Sent',
  not_as_described: 'Not as Described',
  changed_mind: 'Changed Mind',
  ordered_wrong: 'Ordered Wrong',
  arrived_late: 'Arrived Late',
  better_price_found: 'Better Price Found',
  other: 'Other',
};

interface ReturnItemData {
  productId: string;
  productName: string;
  sku: string;
  price: number;
  maxQuantity: number;
  quantity: number;
  reason: ReturnReason;
  selected: boolean;
}

export function CreateReturnModal({ isOpen, onClose, preselectedOrder }: CreateReturnModalProps) {
  const { state, dispatch } = useApp();
  const { success, error } = useToast();

  // State
  const [step, setStep] = useState<'order' | 'items' | 'details'>('order');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderSearch, setOrderSearch] = useState('');
  const [returnItems, setReturnItems] = useState<ReturnItemData[]>([]);
  const [refundShipping, setRefundShipping] = useState(false);
  const [restockingFeePercent, setRestockingFeePercent] = useState(0);
  const [notes, setNotes] = useState('');

  // Initialize with preselected order
  useEffect(() => {
    if (preselectedOrder) {
      setSelectedOrder(preselectedOrder);
      setStep('items');
      initializeItems(preselectedOrder);
    }
  }, [preselectedOrder]);

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep('order');
      setSelectedOrder(null);
      setOrderSearch('');
      setReturnItems([]);
      setRefundShipping(false);
      setRestockingFeePercent(0);
      setNotes('');
    }
  }, [isOpen]);

  const initializeItems = (order: Order) => {
    setReturnItems(
      order.items.map(item => ({
        productId: item.productId,
        productName: item.productName,
        sku: item.sku,
        price: item.price,
        maxQuantity: item.quantity,
        quantity: item.quantity,
        reason: 'damaged_in_transit',
        selected: false,
      }))
    );
  };

  // Filter eligible orders (shipped or delivered)
  const eligibleOrders = state.orders.filter(
    o => (o.status === 'shipped' || o.status === 'delivered') &&
    (orderSearch === '' ||
      o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(orderSearch.toLowerCase()))
  );

  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
    initializeItems(order);
    setStep('items');
  };

  const toggleItem = (productId: string) => {
    setReturnItems(prev =>
      prev.map(item =>
        item.productId === productId
          ? { ...item, selected: !item.selected }
          : item
      )
    );
  };

  const updateItemQuantity = (productId: string, quantity: number) => {
    setReturnItems(prev =>
      prev.map(item =>
        item.productId === productId
          ? { ...item, quantity: Math.min(Math.max(1, quantity), item.maxQuantity) }
          : item
      )
    );
  };

  const updateItemReason = (productId: string, reason: ReturnReason) => {
    setReturnItems(prev =>
      prev.map(item =>
        item.productId === productId
          ? { ...item, reason }
          : item
      )
    );
  };

  const selectedItems = returnItems.filter(item => item.selected);

  const calculateRefund = () => {
    const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = refundShipping && selectedOrder ? selectedOrder.shipping : 0;
    const restockingFee = subtotal * (restockingFeePercent / 100);
    return {
      subtotal,
      shipping,
      restockingFee,
      total: subtotal + shipping - restockingFee,
    };
  };

  const handleSubmit = () => {
    if (!selectedOrder || selectedItems.length === 0) {
      error('Please select at least one item to return');
      return;
    }

    const refund = calculateRefund();
    const returnNumber = `RET-${String(state.returns.length + 1).padStart(4, '0')}`;

    const newReturn: Return = {
      id: `return-${Date.now()}`,
      returnNumber,
      orderId: selectedOrder.id,
      orderNumber: selectedOrder.orderNumber,
      channel: selectedOrder.channel,
      status: 'requested',
      customer: {
        name: selectedOrder.customer.name,
        email: selectedOrder.customer.email,
      },
      items: selectedItems.map(item => ({
        productId: item.productId,
        productName: item.productName,
        sku: item.sku,
        quantity: item.quantity,
        quantityReceived: 0,
        reason: item.reason,
        refundAmount: item.price * item.quantity,
      })),
      returnShipping: {},
      refund: {
        subtotal: refund.subtotal,
        shipping: refund.shipping,
        restockingFee: refund.restockingFee,
        total: refund.total,
      },
      notes: notes || undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    dispatch({ type: 'ADD_RETURN', payload: newReturn });
    success(`Return ${returnNumber} created successfully`);
    onClose();
  };

  if (!isOpen) return null;

  const refund = calculateRefund();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

        {/* Modal */}
        <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl w-full max-w-3xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
            <div>
              <h2 className="text-xl font-bold text-white">Create Return</h2>
              <p className="text-sm text-slate-400">
                {step === 'order' && 'Select an order to create a return for'}
                {step === 'items' && 'Select items to return'}
                {step === 'details' && 'Review and confirm return details'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {/* Step 1: Select Order */}
            {step === 'order' && (
              <div className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></i>
                  <input
                    type="text"
                    placeholder="Search orders by number or customer..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Orders List */}
                <div className="space-y-2">
                  {eligibleOrders.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      <i className="fas fa-box-open text-4xl mb-3"></i>
                      <p>No eligible orders found</p>
                      <p className="text-sm">Only shipped or delivered orders can be returned</p>
                    </div>
                  ) : (
                    eligibleOrders.map(order => (
                      <button
                        key={order.id}
                        onClick={() => handleSelectOrder(order)}
                        className="w-full p-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-lg text-left transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-white">{order.orderNumber}</div>
                            <div className="text-sm text-slate-400">{order.customer.name}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-white">{formatCurrency(order.total)}</div>
                            <div className="text-sm text-slate-400">
                              {order.items.reduce((sum, i) => sum + i.quantity, 0)} items
                            </div>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Select Items */}
            {step === 'items' && selectedOrder && (
              <div className="space-y-4">
                <div className="bg-slate-800/30 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">{selectedOrder.orderNumber}</div>
                      <div className="text-sm text-slate-400">{selectedOrder.customer.name}</div>
                    </div>
                    <button
                      onClick={() => { setStep('order'); setSelectedOrder(null); }}
                      className="text-sm text-emerald-400 hover:underline"
                    >
                      Change Order
                    </button>
                  </div>
                </div>

                <p className="text-sm text-slate-400">Select the items to return:</p>

                <div className="space-y-3">
                  {returnItems.map(item => (
                    <div
                      key={item.productId}
                      className={`p-4 border rounded-lg transition-colors ${
                        item.selected
                          ? 'border-emerald-500/50 bg-emerald-500/10'
                          : 'border-slate-700/50 bg-slate-800/30'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <button
                          onClick={() => toggleItem(item.productId)}
                          className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${
                            item.selected
                              ? 'bg-emerald-500 border-emerald-500 text-white'
                              : 'border-slate-600 text-transparent'
                          }`}
                        >
                          <i className="fas fa-check text-xs"></i>
                        </button>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-white font-medium">{item.productName}</div>
                              <div className="text-sm text-slate-400">SKU: {item.sku}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-white">{formatCurrency(item.price)}</div>
                              <div className="text-sm text-slate-400">Max qty: {item.maxQuantity}</div>
                            </div>
                          </div>

                          {item.selected && (
                            <div className="mt-4 grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm text-slate-400 mb-1">Quantity</label>
                                <input
                                  type="number"
                                  min="1"
                                  max={item.maxQuantity}
                                  value={item.quantity}
                                  onChange={(e) => updateItemQuantity(item.productId, parseInt(e.target.value) || 1)}
                                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-sm text-slate-400 mb-1">Reason</label>
                                <select
                                  value={item.reason}
                                  onChange={(e) => updateItemReason(item.productId, e.target.value as ReturnReason)}
                                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
                                >
                                  {Object.entries(reasonLabels).map(([key, label]) => (
                                    <option key={key} value={key}>{label}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Details */}
            {step === 'details' && selectedOrder && (
              <div className="space-y-6">
                {/* Selected Items Summary */}
                <div>
                  <h3 className="text-white font-medium mb-3">Return Items</h3>
                  <div className="bg-slate-800/30 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-slate-800/50">
                        <tr className="text-left text-xs text-slate-400 uppercase">
                          <th className="px-4 py-2">Product</th>
                          <th className="px-4 py-2 text-center">Qty</th>
                          <th className="px-4 py-2">Reason</th>
                          <th className="px-4 py-2 text-right">Refund</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700/50">
                        {selectedItems.map(item => (
                          <tr key={item.productId}>
                            <td className="px-4 py-3">
                              <div className="text-white">{item.productName}</div>
                              <div className="text-xs text-slate-400">{item.sku}</div>
                            </td>
                            <td className="px-4 py-3 text-center text-white">{item.quantity}</td>
                            <td className="px-4 py-3 text-slate-300 text-sm">{reasonLabels[item.reason]}</td>
                            <td className="px-4 py-3 text-right text-white">{formatCurrency(item.price * item.quantity)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Refund Options */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={refundShipping}
                        onChange={(e) => setRefundShipping(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-emerald-500 focus:ring-emerald-500"
                      />
                      <span className="text-slate-300">Refund shipping ({formatCurrency(selectedOrder.shipping)})</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Restocking Fee %</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={restockingFeePercent}
                      onChange={(e) => setRestockingFeePercent(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                </div>

                {/* Refund Summary */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-3">Refund Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-slate-300">
                      <span>Items Subtotal</span>
                      <span>{formatCurrency(refund.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Shipping Refund</span>
                      <span>{formatCurrency(refund.shipping)}</span>
                    </div>
                    {refund.restockingFee > 0 && (
                      <div className="flex justify-between text-red-400">
                        <span>Restocking Fee</span>
                        <span>-{formatCurrency(refund.restockingFee)}</span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-slate-700 flex justify-between text-lg">
                      <span className="text-white font-semibold">Total Refund</span>
                      <span className="text-emerald-400 font-bold">{formatCurrency(refund.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Notes (optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Add any notes about this return..."
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-slate-700/50">
            <div>
              {step !== 'order' && (
                <button
                  onClick={() => setStep(step === 'details' ? 'items' : 'order')}
                  className="px-4 py-2 text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-arrow-left"></i>
                  Back
                </button>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors"
              >
                Cancel
              </button>
              {step === 'items' && (
                <button
                  onClick={() => setStep('details')}
                  disabled={selectedItems.length === 0}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  Continue
                  <i className="fas fa-arrow-right"></i>
                </button>
              )}
              {step === 'details' && (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-check"></i>
                  Create Return
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
