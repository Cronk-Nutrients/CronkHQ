'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp, Return, ReturnReason, ItemCondition } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/formatting';
import { Breadcrumb } from '@/components/Breadcrumb';

// Status configuration
const statusConfig: Record<Return['status'], { color: string; icon: string; label: string }> = {
  requested: { color: 'amber', icon: 'fa-clock', label: 'Requested' },
  approved: { color: 'blue', icon: 'fa-check', label: 'Approved' },
  in_transit: { color: 'purple', icon: 'fa-truck', label: 'In Transit' },
  received: { color: 'cyan', icon: 'fa-box', label: 'Received' },
  inspected: { color: 'indigo', icon: 'fa-search', label: 'Inspected' },
  refunded: { color: 'emerald', icon: 'fa-check-circle', label: 'Refunded' },
  rejected: { color: 'red', icon: 'fa-times-circle', label: 'Rejected' },
};

// Status flow for timeline
const statusFlow: Return['status'][] = ['requested', 'approved', 'in_transit', 'received', 'inspected', 'refunded'];

// Reason labels
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

// Condition labels
const conditionLabels: Record<ItemCondition, { label: string; color: string }> = {
  new_sealed: { label: 'New (Sealed)', color: 'emerald' },
  new_opened: { label: 'New (Opened)', color: 'green' },
  like_new: { label: 'Like New', color: 'cyan' },
  good: { label: 'Good', color: 'blue' },
  damaged: { label: 'Damaged', color: 'amber' },
  unsellable: { label: 'Unsellable', color: 'red' },
};

export default function ReturnDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { state, dispatch } = useApp();
  const { success, warning, error } = useToast();

  const [isInspecting, setIsInspecting] = useState(false);
  const [inspectionData, setInspectionData] = useState<Record<string, { received: number; condition: ItemCondition }>>({});

  // Find the return
  const returnItem = useMemo(() => {
    return state.returns.find(r => r.id === params.id);
  }, [state.returns, params.id]);

  // Loading state
  if (state.isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-slate-800/50 rounded w-48"></div>
        <div className="h-64 bg-slate-800/50 rounded-xl"></div>
      </div>
    );
  }

  // Not found
  if (!returnItem) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <i className="fas fa-undo-alt text-6xl text-slate-600 mb-4"></i>
        <h2 className="text-xl font-bold text-white mb-2">Return Not Found</h2>
        <p className="text-slate-400 mb-6">The return you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Link href="/orders/returns" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors">
          Back to Returns
        </Link>
      </div>
    );
  }

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get channel badge
  const getChannelBadge = (channel: Return['channel']) => {
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
  const getStatusBadge = (status: Return['status']) => {
    const config = statusConfig[status];
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1.5 bg-${config.color}-500/10 text-${config.color}-400 text-sm font-medium rounded-full border border-${config.color}-500/20`}>
        <i className={`fas ${config.icon}`}></i>
        {config.label}
      </span>
    );
  };

  // Get current status index for timeline
  const getCurrentStatusIndex = () => {
    if (returnItem.status === 'rejected') return -1;
    return statusFlow.indexOf(returnItem.status);
  };

  // Handle actions
  const handleApprove = () => {
    dispatch({
      type: 'UPDATE_RETURN',
      payload: { ...returnItem, status: 'approved', updatedAt: new Date() }
    });
    success(`Return ${returnItem.returnNumber} approved`);
  };

  const handleReject = () => {
    dispatch({
      type: 'UPDATE_RETURN',
      payload: { ...returnItem, status: 'rejected', updatedAt: new Date() }
    });
    warning(`Return ${returnItem.returnNumber} rejected`);
  };

  const handleMarkInTransit = () => {
    dispatch({
      type: 'UPDATE_RETURN',
      payload: { ...returnItem, status: 'in_transit', updatedAt: new Date() }
    });
    success(`Return ${returnItem.returnNumber} marked as in transit`);
  };

  const handleMarkReceived = () => {
    dispatch({
      type: 'UPDATE_RETURN',
      payload: { ...returnItem, status: 'received', updatedAt: new Date() }
    });
    success(`Return ${returnItem.returnNumber} marked as received`);
  };

  const handleStartInspection = () => {
    // Initialize inspection data
    const initial: Record<string, { received: number; condition: ItemCondition }> = {};
    returnItem.items.forEach(item => {
      initial[item.productId] = {
        received: item.quantity,
        condition: 'like_new'
      };
    });
    setInspectionData(initial);
    setIsInspecting(true);
  };

  const handleCompleteInspection = () => {
    const updatedItems = returnItem.items.map(item => ({
      ...item,
      quantityReceived: inspectionData[item.productId]?.received || item.quantityReceived,
      condition: inspectionData[item.productId]?.condition || item.condition
    }));

    dispatch({
      type: 'UPDATE_RETURN',
      payload: { ...returnItem, items: updatedItems, status: 'inspected', updatedAt: new Date() }
    });

    // Update inventory based on condition
    updatedItems.forEach(item => {
      const condition = item.condition;
      if (condition && ['new_sealed', 'new_opened', 'like_new', 'good'].includes(condition)) {
        // Add back to inventory
        dispatch({
          type: 'ADJUST_STOCK',
          payload: {
            productId: item.productId,
            locationId: 'loc-warehouse',
            adjustment: item.quantityReceived
          }
        });
      }
    });

    setIsInspecting(false);
    success(`Inspection completed for ${returnItem.returnNumber}`);
  };

  const handleProcessRefund = () => {
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

  const currentStatusIndex = getCurrentStatusIndex();

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'Orders', href: '/orders' },
        { label: 'Returns', href: '/orders/returns' },
        { label: returnItem.returnNumber }
      ]} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/orders/returns')}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white">{returnItem.returnNumber}</h1>
              {getStatusBadge(returnItem.status)}
              {getChannelBadge(returnItem.channel)}
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Original Order: <Link href={`/orders/${returnItem.orderId}`} className="text-emerald-400 hover:underline">{returnItem.orderNumber}</Link>
              {' '}&bull; Created {formatDateTime(returnItem.createdAt)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {returnItem.status === 'requested' && (
            <>
              <button
                onClick={handleApprove}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <i className="fas fa-check"></i>
                Approve Return
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <i className="fas fa-times"></i>
                Reject
              </button>
            </>
          )}
          {returnItem.status === 'approved' && (
            <button
              onClick={handleMarkInTransit}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <i className="fas fa-truck"></i>
              Mark In Transit
            </button>
          )}
          {returnItem.status === 'in_transit' && (
            <button
              onClick={handleMarkReceived}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <i className="fas fa-box"></i>
              Mark Received
            </button>
          )}
          {returnItem.status === 'received' && !isInspecting && (
            <button
              onClick={handleStartInspection}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <i className="fas fa-search"></i>
              Start Inspection
            </button>
          )}
          {returnItem.status === 'inspected' && (
            <button
              onClick={handleProcessRefund}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <i className="fas fa-dollar-sign"></i>
              Process Refund
            </button>
          )}
        </div>
      </div>

      {/* Status Timeline */}
      {returnItem.status !== 'rejected' && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Return Progress</h3>
          <div className="flex items-center justify-between">
            {statusFlow.map((status, index) => {
              const config = statusConfig[status];
              const isComplete = index <= currentStatusIndex;
              const isCurrent = index === currentStatusIndex;
              return (
                <div key={status} className="flex flex-col items-center flex-1">
                  <div className="flex items-center w-full">
                    {index > 0 && (
                      <div className={`h-1 flex-1 ${isComplete ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                    )}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isComplete
                        ? isCurrent
                          ? `bg-${config.color}-500 text-white`
                          : 'bg-emerald-500 text-white'
                        : 'bg-slate-700 text-slate-500'
                    }`}>
                      <i className={`fas ${isComplete && !isCurrent ? 'fa-check' : config.icon}`}></i>
                    </div>
                    {index < statusFlow.length - 1 && (
                      <div className={`h-1 flex-1 ${index < currentStatusIndex ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                    )}
                  </div>
                  <span className={`text-xs mt-2 ${isComplete ? 'text-white' : 'text-slate-500'}`}>
                    {config.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Rejected Banner */}
      {returnItem.status === 'rejected' && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 text-red-400">
            <i className="fas fa-times-circle text-2xl"></i>
            <div>
              <h3 className="font-semibold">Return Rejected</h3>
              <p className="text-sm text-red-400/80">This return request has been rejected.</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Customer & Items */}
        <div className="col-span-2 space-y-6">
          {/* Customer Info */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Customer Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-400">Name</p>
                <p className="text-white">{returnItem.customer.name}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Email</p>
                <p className="text-white">{returnItem.customer.email}</p>
              </div>
            </div>
          </div>

          {/* Return Items */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Return Items</h3>

            {/* Inspection Mode */}
            {isInspecting && (
              <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 text-indigo-400 mb-2">
                  <i className="fas fa-search"></i>
                  <span className="font-medium">Inspection Mode</span>
                </div>
                <p className="text-sm text-slate-400">Verify quantities received and item conditions below, then click Complete Inspection.</p>
              </div>
            )}

            <div className="space-y-4">
              {returnItem.items.map((item, index) => (
                <div key={index} className="border border-slate-700/50 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-slate-700/50 rounded-lg flex items-center justify-center">
                        <i className="fas fa-box text-slate-500 text-2xl"></i>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{item.productName}</h4>
                        <p className="text-sm text-slate-400">SKU: {item.sku}</p>
                        <p className="text-sm text-slate-400">Qty: {item.quantity}</p>
                        <p className="text-sm text-amber-400 mt-1">
                          <i className="fas fa-exclamation-triangle mr-1"></i>
                          {reasonLabels[item.reason]}
                        </p>
                        {item.condition && !isInspecting && (
                          <p className="text-sm mt-1">
                            <span className={`text-${conditionLabels[item.condition].color}-400`}>
                              Condition: {conditionLabels[item.condition].label}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{formatCurrency(item.refundAmount)}</p>
                      {item.quantityReceived > 0 && !isInspecting && (
                        <p className="text-sm text-slate-400">
                          {item.quantityReceived} of {item.quantity} received
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Inspection Controls */}
                  {isInspecting && (
                    <div className="mt-4 pt-4 border-t border-slate-700/50 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-slate-400 mb-1">Qty Received</label>
                        <input
                          type="number"
                          min="0"
                          max={item.quantity}
                          value={inspectionData[item.productId]?.received || 0}
                          onChange={(e) => setInspectionData({
                            ...inspectionData,
                            [item.productId]: {
                              ...inspectionData[item.productId],
                              received: parseInt(e.target.value) || 0
                            }
                          })}
                          className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-1">Condition</label>
                        <select
                          value={inspectionData[item.productId]?.condition || 'like_new'}
                          onChange={(e) => setInspectionData({
                            ...inspectionData,
                            [item.productId]: {
                              ...inspectionData[item.productId],
                              condition: e.target.value as ItemCondition
                            }
                          })}
                          className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
                        >
                          {Object.entries(conditionLabels).map(([key, { label }]) => (
                            <option key={key} value={key}>{label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Inspection Complete Button */}
            {isInspecting && (
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => setIsInspecting(false)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCompleteInspection}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-check"></i>
                  Complete Inspection
                </button>
              </div>
            )}
          </div>

          {/* Notes */}
          {returnItem.notes && (
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Notes</h3>
              <p className="text-slate-300">{returnItem.notes}</p>
            </div>
          )}
        </div>

        {/* Right Column - Refund & Tracking */}
        <div className="space-y-6">
          {/* Refund Summary */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Refund Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Items Subtotal</span>
                <span className="text-white">{formatCurrency(returnItem.refund.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Shipping Refund</span>
                <span className="text-white">{formatCurrency(returnItem.refund.shipping)}</span>
              </div>
              {returnItem.refund.restockingFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Restocking Fee</span>
                  <span className="text-red-400">-{formatCurrency(returnItem.refund.restockingFee)}</span>
                </div>
              )}
              <div className="pt-3 border-t border-slate-700">
                <div className="flex justify-between">
                  <span className="text-white font-semibold">Total Refund</span>
                  <span className="text-emerald-400 font-bold text-lg">{formatCurrency(returnItem.refund.total)}</span>
                </div>
              </div>
              {returnItem.refund.refundedAt && (
                <div className="pt-3 border-t border-slate-700">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <i className="fas fa-check-circle"></i>
                    <span className="text-sm">Refunded on {formatDate(returnItem.refund.refundedAt)}</span>
                  </div>
                  {returnItem.refund.refundMethod && (
                    <p className="text-sm text-slate-400 mt-1">
                      Method: {returnItem.refund.refundMethod === 'original_payment' ? 'Original Payment' :
                               returnItem.refund.refundMethod === 'store_credit' ? 'Store Credit' : 'Manual'}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Return Shipping */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Return Shipping</h3>
            {returnItem.returnShipping.trackingNumber ? (
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-400">Carrier</p>
                  <p className="text-white capitalize">{returnItem.returnShipping.carrier || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Tracking Number</p>
                  <p className="text-emerald-400 font-mono">{returnItem.returnShipping.trackingNumber}</p>
                </div>
                {returnItem.returnShipping.labelUrl && (
                  <button className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
                    <i className="fas fa-download"></i>
                    Download Label
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center py-4 text-slate-500">
                <i className="fas fa-shipping-fast text-2xl mb-2"></i>
                <p className="text-sm">No shipping info yet</p>
              </div>
            )}
          </div>

          {/* Activity Log */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Activity</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                  <i className="fas fa-clock text-slate-400 text-sm"></i>
                </div>
                <div>
                  <p className="text-sm text-white">Return created</p>
                  <p className="text-xs text-slate-500">{formatDateTime(returnItem.createdAt)}</p>
                </div>
              </div>
              {returnItem.updatedAt !== returnItem.createdAt && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                    <i className="fas fa-edit text-slate-400 text-sm"></i>
                  </div>
                  <div>
                    <p className="text-sm text-white">Return updated</p>
                    <p className="text-xs text-slate-500">{formatDateTime(returnItem.updatedAt)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
