'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp, StockTransfer, TransferItem } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';

type TransferStatus = StockTransfer['status'];

export default function TransferDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { state, dispatch } = useApp();
  const { success, error } = useToast();

  const transferId = params.id as string;
  const transfer = state.transfers.find(t => t.id === transferId);

  // Ship modal state
  const [showShipModal, setShowShipModal] = useState(false);
  const [shipQuantities, setShipQuantities] = useState<Record<string, number>>({});

  // Receive modal state
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [receiveQuantities, setReceiveQuantities] = useState<Record<string, number>>({});

  // Cancel confirmation
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // Initialize ship quantities when opening modal
  const openShipModal = () => {
    if (!transfer) return;
    const quantities: Record<string, number> = {};
    transfer.items.forEach(item => {
      quantities[item.productId] = item.requestedQty;
    });
    setShipQuantities(quantities);
    setShowShipModal(true);
  };

  // Initialize receive quantities when opening modal
  const openReceiveModal = () => {
    if (!transfer) return;
    const quantities: Record<string, number> = {};
    transfer.items.forEach(item => {
      quantities[item.productId] = item.shippedQty;
    });
    setReceiveQuantities(quantities);
    setShowReceiveModal(true);
  };

  // Handle ship transfer
  const handleShipTransfer = () => {
    if (!transfer) return;

    const updatedItems: TransferItem[] = transfer.items.map(item => ({
      ...item,
      shippedQty: shipQuantities[item.productId] || 0,
      status: 'shipped' as const,
    }));

    const updatedTransfer: StockTransfer = {
      ...transfer,
      status: 'in_transit',
      items: updatedItems,
      shippedAt: new Date(),
      updatedAt: new Date(),
    };

    // Deduct stock from source location
    transfer.items.forEach(item => {
      const shippedQty = shipQuantities[item.productId] || 0;
      if (shippedQty > 0) {
        dispatch({
          type: 'ADJUST_STOCK',
          payload: {
            productId: item.productId,
            locationId: transfer.fromLocation,
            adjustment: -shippedQty,
          },
        });
      }
    });

    dispatch({ type: 'UPDATE_TRANSFER', payload: updatedTransfer });
    success('Transfer shipped successfully');
    setShowShipModal(false);
  };

  // Handle receive transfer
  const handleReceiveTransfer = () => {
    if (!transfer) return;

    const updatedItems: TransferItem[] = transfer.items.map(item => {
      const receivedQty = receiveQuantities[item.productId] || 0;
      const isShort = receivedQty < item.shippedQty;
      return {
        ...item,
        receivedQty,
        status: isShort ? 'short' as const : 'received' as const,
      };
    });

    const updatedTransfer: StockTransfer = {
      ...transfer,
      status: 'received',
      items: updatedItems,
      receivedAt: new Date(),
      updatedAt: new Date(),
    };

    // Add stock to destination location
    transfer.items.forEach(item => {
      const receivedQty = receiveQuantities[item.productId] || 0;
      if (receivedQty > 0) {
        dispatch({
          type: 'ADJUST_STOCK',
          payload: {
            productId: item.productId,
            locationId: transfer.toLocation,
            adjustment: receivedQty,
          },
        });
      }
    });

    dispatch({ type: 'UPDATE_TRANSFER', payload: updatedTransfer });

    // Check for short items
    const shortItems = updatedItems.filter(item => item.status === 'short');
    if (shortItems.length > 0) {
      success(`Transfer received with ${shortItems.length} short item(s)`);
    } else {
      success('Transfer received successfully');
    }
    setShowReceiveModal(false);
  };

  // Handle cancel transfer
  const handleCancelTransfer = () => {
    if (!transfer) return;

    // If in transit, restore stock to source location
    if (transfer.status === 'in_transit') {
      transfer.items.forEach(item => {
        if (item.shippedQty > 0) {
          dispatch({
            type: 'ADJUST_STOCK',
            payload: {
              productId: item.productId,
              locationId: transfer.fromLocation,
              adjustment: item.shippedQty,
            },
          });
        }
      });
    }

    const updatedTransfer: StockTransfer = {
      ...transfer,
      status: 'cancelled',
      updatedAt: new Date(),
    };

    dispatch({ type: 'UPDATE_TRANSFER', payload: updatedTransfer });
    success('Transfer cancelled');
    setShowCancelConfirm(false);
  };

  // Status timeline steps
  const statusSteps: { key: TransferStatus; label: string; icon: string }[] = [
    { key: 'pending', label: 'Pending', icon: 'fa-clock' },
    { key: 'in_transit', label: 'In Transit', icon: 'fa-truck' },
    { key: 'received', label: 'Received', icon: 'fa-check-circle' },
  ];

  const getStatusIndex = (status: TransferStatus) => {
    if (status === 'cancelled') return -1;
    if (status === 'draft') return -1;
    return statusSteps.findIndex(s => s.key === status);
  };

  const getStatusBadge = (status: TransferStatus) => {
    const badges: Record<TransferStatus, { bg: string; text: string; label: string }> = {
      draft: { bg: 'bg-slate-500/20', text: 'text-slate-400', label: 'Draft' },
      pending: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'Pending' },
      in_transit: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'In Transit' },
      received: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Received' },
      cancelled: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Cancelled' },
    };
    const badge = badges[status];
    return (
      <span className={`px-3 py-1 ${badge.bg} ${badge.text} rounded-full text-sm font-medium`}>
        {badge.label}
      </span>
    );
  };

  const getItemStatusBadge = (status: TransferItem['status']) => {
    const badges: Record<TransferItem['status'], { bg: string; text: string; label: string }> = {
      pending: { bg: 'bg-slate-500/20', text: 'text-slate-400', label: 'Pending' },
      shipped: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Shipped' },
      received: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Received' },
      short: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'Short' },
    };
    const badge = badges[status];
    return (
      <span className={`px-2 py-0.5 ${badge.bg} ${badge.text} rounded text-xs font-medium`}>
        {badge.label}
      </span>
    );
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Calculate totals
  const totals = useMemo(() => {
    if (!transfer) return { requested: 0, shipped: 0, received: 0 };
    return {
      requested: transfer.items.reduce((sum, item) => sum + item.requestedQty, 0),
      shipped: transfer.items.reduce((sum, item) => sum + item.shippedQty, 0),
      received: transfer.items.reduce((sum, item) => sum + item.receivedQty, 0),
    };
  }, [transfer]);

  if (!transfer) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-amber-400 text-4xl mb-4"></i>
          <h2 className="text-xl font-bold text-white mb-2">Transfer Not Found</h2>
          <p className="text-slate-400 mb-4">The transfer you're looking for doesn't exist.</p>
          <Link
            href="/inventory/transfers"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
          >
            Back to Transfers
          </Link>
        </div>
      </div>
    );
  }

  const currentStatusIndex = getStatusIndex(transfer.status);
  const canShip = transfer.status === 'pending';
  const canReceive = transfer.status === 'in_transit';
  const canCancel = transfer.status !== 'received' && transfer.status !== 'cancelled';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/inventory/transfers"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <i className="fas fa-arrow-left"></i>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white">{transfer.transferNumber}</h1>
              {getStatusBadge(transfer.status)}
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Created {formatDate(transfer.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {canCancel && (
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors"
            >
              Cancel Transfer
            </button>
          )}
          {canShip && (
            <button
              onClick={openShipModal}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <i className="fas fa-truck"></i>
              Ship Transfer
            </button>
          )}
          {canReceive && (
            <button
              onClick={openReceiveModal}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <i className="fas fa-check"></i>
              Receive Transfer
            </button>
          )}
        </div>
      </div>

      {/* Status Timeline */}
      {transfer.status !== 'cancelled' && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Transfer Progress</h2>
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-0 right-0 top-5 h-1 bg-slate-700 rounded">
              <div
                className="h-full bg-emerald-500 rounded transition-all duration-500"
                style={{
                  width: `${((currentStatusIndex + 1) / statusSteps.length) * 100}%`,
                }}
              ></div>
            </div>

            {/* Steps */}
            <div className="relative flex justify-between">
              {statusSteps.map((step, index) => {
                const isComplete = index <= currentStatusIndex;
                const isCurrent = index === currentStatusIndex;
                return (
                  <div key={step.key} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${
                        isComplete
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-700 text-slate-400'
                      } ${isCurrent ? 'ring-4 ring-emerald-500/30' : ''}`}
                    >
                      <i className={`fas ${step.icon}`}></i>
                    </div>
                    <span
                      className={`mt-2 text-sm font-medium ${
                        isComplete ? 'text-white' : 'text-slate-500'
                      }`}
                    >
                      {step.label}
                    </span>
                    {step.key === 'pending' && transfer.createdAt && (
                      <span className="text-xs text-slate-500 mt-1">
                        {formatDate(transfer.createdAt)}
                      </span>
                    )}
                    {step.key === 'in_transit' && transfer.shippedAt && (
                      <span className="text-xs text-slate-500 mt-1">
                        {formatDate(transfer.shippedAt)}
                      </span>
                    )}
                    {step.key === 'received' && transfer.receivedAt && (
                      <span className="text-xs text-slate-500 mt-1">
                        {formatDate(transfer.receivedAt)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Location Info */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-arrow-up text-red-400"></i>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-400">From Location</h3>
              <p className="text-lg font-semibold text-white">{transfer.fromLocationName}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-arrow-down text-emerald-400"></i>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-400">To Location</h3>
              <p className="text-lg font-semibold text-white">{transfer.toLocationName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Transfer Items</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Product</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">SKU</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-400">Requested</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-400">Shipped</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-400">Received</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {transfer.items.map((item) => (
                <tr key={item.productId} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                  <td className="py-3 px-4 text-white">{item.productName}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono text-sm">{item.sku}</td>
                  <td className="py-3 px-4 text-center text-white">{item.requestedQty}</td>
                  <td className="py-3 px-4 text-center text-white">{item.shippedQty || '-'}</td>
                  <td className="py-3 px-4 text-center">
                    {item.receivedQty > 0 ? (
                      <span className={item.receivedQty < item.shippedQty ? 'text-amber-400' : 'text-white'}>
                        {item.receivedQty}
                        {item.receivedQty < item.shippedQty && (
                          <span className="text-red-400 ml-1">
                            ({item.receivedQty - item.shippedQty})
                          </span>
                        )}
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">{getItemStatusBadge(item.status)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-slate-700">
                <td colSpan={2} className="py-3 px-4 text-sm font-medium text-slate-400">
                  Total ({transfer.items.length} item{transfer.items.length !== 1 ? 's' : ''})
                </td>
                <td className="py-3 px-4 text-center font-semibold text-white">{totals.requested}</td>
                <td className="py-3 px-4 text-center font-semibold text-white">{totals.shipped || '-'}</td>
                <td className="py-3 px-4 text-center font-semibold text-white">{totals.received || '-'}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Notes */}
      {transfer.notes && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-3">Notes</h2>
          <p className="text-slate-300">{transfer.notes}</p>
        </div>
      )}

      {/* Ship Modal */}
      {showShipModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowShipModal(false)}></div>
            <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl w-full max-w-2xl">
              <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
                <div>
                  <h2 className="text-xl font-bold text-white">Ship Transfer</h2>
                  <p className="text-sm text-slate-400">Confirm quantities being shipped</p>
                </div>
                <button
                  onClick={() => setShowShipModal(false)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-start gap-3">
                  <i className="fas fa-info-circle text-blue-400 mt-0.5"></i>
                  <div className="text-sm text-blue-300">
                    <p className="font-medium">Shipping will deduct inventory</p>
                    <p className="text-blue-400">Stock will be removed from <span className="font-medium">{transfer.fromLocationName}</span></p>
                  </div>
                </div>

                {transfer.items.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg">
                    <div>
                      <div className="text-white font-medium">{item.productName}</div>
                      <div className="text-sm text-slate-400">{item.sku}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-slate-400">Requested: {item.requestedQty}</span>
                      <input
                        type="number"
                        min={0}
                        max={item.requestedQty}
                        value={shipQuantities[item.productId] || 0}
                        onChange={(e) => setShipQuantities({
                          ...shipQuantities,
                          [item.productId]: Math.min(parseInt(e.target.value) || 0, item.requestedQty),
                        })}
                        className="w-20 bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white text-center focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-700/50">
                <button
                  onClick={() => setShowShipModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleShipTransfer}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-truck"></i>
                  Confirm Ship
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Receive Modal */}
      {showReceiveModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowReceiveModal(false)}></div>
            <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl w-full max-w-2xl">
              <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
                <div>
                  <h2 className="text-xl font-bold text-white">Receive Transfer</h2>
                  <p className="text-sm text-slate-400">Enter quantities received at destination</p>
                </div>
                <button
                  onClick={() => setShowReceiveModal(false)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 flex items-start gap-3">
                  <i className="fas fa-info-circle text-emerald-400 mt-0.5"></i>
                  <div className="text-sm text-emerald-300">
                    <p className="font-medium">Receiving will add inventory</p>
                    <p className="text-emerald-400">Stock will be added to <span className="font-medium">{transfer.toLocationName}</span></p>
                  </div>
                </div>

                {transfer.items.map((item) => {
                  const receivedQty = receiveQuantities[item.productId] || 0;
                  const isShort = receivedQty < item.shippedQty;
                  return (
                    <div key={item.productId} className={`flex items-center justify-between p-4 bg-slate-800/50 border rounded-lg ${isShort ? 'border-amber-500/50' : 'border-slate-700/50'}`}>
                      <div>
                        <div className="text-white font-medium">{item.productName}</div>
                        <div className="text-sm text-slate-400">{item.sku}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-400">Shipped: {item.shippedQty}</span>
                        <input
                          type="number"
                          min={0}
                          max={item.shippedQty}
                          value={receivedQty}
                          onChange={(e) => setReceiveQuantities({
                            ...receiveQuantities,
                            [item.productId]: Math.min(parseInt(e.target.value) || 0, item.shippedQty),
                          })}
                          className={`w-20 bg-slate-700/50 border rounded px-3 py-2 text-white text-center focus:outline-none ${
                            isShort ? 'border-amber-500' : 'border-slate-600 focus:border-emerald-500'
                          }`}
                        />
                        {isShort && (
                          <span className="text-amber-400 text-sm">
                            <i className="fas fa-exclamation-triangle mr-1"></i>
                            Short
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Summary of short items */}
                {Object.keys(receiveQuantities).some(productId => {
                  const item = transfer.items.find(i => i.productId === productId);
                  return item && (receiveQuantities[productId] || 0) < item.shippedQty;
                }) && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex items-start gap-3">
                    <i className="fas fa-exclamation-triangle text-amber-400 mt-0.5"></i>
                    <div className="text-sm text-amber-300">
                      <p className="font-medium">Some items are short</p>
                      <p className="text-amber-400">The quantities will be recorded but may require investigation.</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-700/50">
                <button
                  onClick={() => setShowReceiveModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReceiveTransfer}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-check"></i>
                  Confirm Receive
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCancelConfirm(false)}></div>
            <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl w-full max-w-md">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-exclamation-triangle text-red-400 text-2xl"></i>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Cancel Transfer?</h2>
                <p className="text-slate-400 mb-6">
                  {transfer.status === 'in_transit'
                    ? 'This transfer is in transit. Cancelling will restore the shipped quantities to the source location.'
                    : 'Are you sure you want to cancel this transfer?'}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setShowCancelConfirm(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors"
                  >
                    Keep Transfer
                  </button>
                  <button
                    onClick={handleCancelTransfer}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
                  >
                    Cancel Transfer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
