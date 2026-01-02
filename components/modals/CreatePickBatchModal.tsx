'use client';

import { useState, useMemo } from 'react';
import { useApp, Order, PickingBatch, PickingTote } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/formatting';
import {
  X,
  Package,
  ClipboardList,
  Users,
  AlertCircle,
  CheckCircle,
  Box,
} from 'lucide-react';

interface CreatePickBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOrderIds: string[];
}

export function CreatePickBatchModal({
  isOpen,
  onClose,
  selectedOrderIds,
}: CreatePickBatchModalProps) {
  const { state, dispatch } = useApp();
  const { success, error, warning } = useToast();

  const [batchName, setBatchName] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [selectedTotes, setSelectedTotes] = useState<string[]>([]);

  // Get selected orders
  const selectedOrders = useMemo(() => {
    return state.orders.filter(o => selectedOrderIds.includes(o.id));
  }, [state.orders, selectedOrderIds]);

  // Calculate totals
  const totals = useMemo(() => {
    const totalItems = selectedOrders.reduce(
      (sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0),
      0
    );
    const totalValue = selectedOrders.reduce((sum, o) => sum + o.total, 0);
    const uniqueSkus = new Set(
      selectedOrders.flatMap(o => o.items.map(i => i.sku))
    ).size;

    return { totalItems, totalValue, uniqueSkus };
  }, [selectedOrders]);

  // Check batch limits
  const batchLimits = useMemo(() => {
    const { maxOrdersPerBatch, maxItemsPerBatch, pickingMode } = state.settings;
    const ordersOk = selectedOrders.length <= maxOrdersPerBatch;
    const itemsOk = totals.totalItems <= maxItemsPerBatch;
    const totesNeeded = pickingMode === 'multi_tote' ? selectedOrders.length : 1;
    const totesAvailable = state.pickingTotes.filter(t => t.isActive).length;
    const totesOk = totesAvailable >= totesNeeded;

    return {
      ordersOk,
      itemsOk,
      totesOk,
      maxOrders: maxOrdersPerBatch,
      maxItems: maxItemsPerBatch,
      totesNeeded,
      totesAvailable,
    };
  }, [selectedOrders.length, totals.totalItems, state.settings, state.pickingTotes]);

  // Check for orders not ready to pick
  const ordersNotReady = selectedOrders.filter(
    o => o.status !== 'to_pick' && o.status !== 'draft'
  );

  // Available totes
  const availableTotes = state.pickingTotes.filter(t => t.isActive);

  // Generate batch number
  const generateBatchNumber = () => {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const existingToday = state.pickingBatches.filter(
      b => b.batchNumber.startsWith(`PB-${dateStr}`)
    ).length;
    return `PB-${dateStr}-${String(existingToday + 1).padStart(3, '0')}`;
  };

  // Handle create batch
  const handleCreate = () => {
    if (selectedOrders.length === 0) {
      error('No orders selected');
      return;
    }

    // Filter out orders that aren't ready
    const validOrders = selectedOrders.filter(
      o => o.status === 'to_pick' || o.status === 'draft'
    );

    if (validOrders.length === 0) {
      error('No orders are ready for picking');
      return;
    }

    // Check totes for multi-tote mode
    if (state.settings.pickingMode === 'multi_tote') {
      if (selectedTotes.length < validOrders.length) {
        error(`Need ${validOrders.length} totes but only ${selectedTotes.length} selected`);
        return;
      }
    }

    // Create the batch
    const newBatch: PickingBatch = {
      id: crypto.randomUUID(),
      batchNumber: generateBatchNumber(),
      status: 'open',
      orderIds: validOrders.map(o => o.id),
      assignedTo: assignedTo || undefined,
      createdAt: new Date(),
    };

    dispatch({ type: 'ADD_PICKING_BATCH', payload: newBatch });

    // Update orders to 'picking' status
    validOrders.forEach(order => {
      dispatch({
        type: 'UPDATE_ORDER_STATUS',
        payload: { orderId: order.id, status: 'picking' },
      });
    });

    success(`Pick batch ${newBatch.batchNumber} created with ${validOrders.length} orders`);

    if (ordersNotReady.length > 0) {
      warning(`${ordersNotReady.length} orders were skipped (not ready for picking)`);
    }

    // Reset and close
    setBatchName('');
    setAssignedTo('');
    setSelectedTotes([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Create Pick Batch</h2>
              <p className="text-sm text-slate-400">
                {selectedOrders.length} orders selected
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <div className="text-2xl font-bold text-white">{selectedOrders.length}</div>
              <div className="text-xs text-slate-400">Orders</div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <div className="text-2xl font-bold text-white">{totals.totalItems}</div>
              <div className="text-xs text-slate-400">Total Items</div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <div className="text-2xl font-bold text-white">{totals.uniqueSkus}</div>
              <div className="text-xs text-slate-400">Unique SKUs</div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <div className="text-2xl font-bold text-emerald-400">
                {formatCurrency(totals.totalValue)}
              </div>
              <div className="text-xs text-slate-400">Total Value</div>
            </div>
          </div>

          {/* Validation Messages */}
          {ordersNotReady.length > 0 && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-400">
                    {ordersNotReady.length} orders not ready for picking
                  </p>
                  <p className="text-xs text-amber-300 mt-1">
                    Orders must be in &quot;To Pick&quot; status. These will be skipped.
                  </p>
                </div>
              </div>
            </div>
          )}

          {!batchLimits.ordersOk && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-400">
                    Exceeds maximum orders per batch ({batchLimits.maxOrders})
                  </p>
                  <p className="text-xs text-red-300 mt-1">
                    Consider splitting into multiple batches.
                  </p>
                </div>
              </div>
            </div>
          )}

          {!batchLimits.itemsOk && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-400">
                    Exceeds maximum items per batch ({batchLimits.maxItems})
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Picking Mode Info */}
          <div className="p-4 bg-slate-800/50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-5 h-5 text-blue-400" />
              <span className="font-medium text-white">
                {state.settings.pickingMode === 'multi_tote' ? 'Multi-Tote Mode' : 'Single-Tote Mode'}
              </span>
            </div>
            <p className="text-sm text-slate-400">
              {state.settings.pickingMode === 'multi_tote'
                ? `Each order gets its own tote. You need ${batchLimits.totesNeeded} totes for this batch.`
                : 'All items collected in one tote. Requires sorting after picking.'}
            </p>
            {state.settings.pickingMode === 'multi_tote' && (
              <div className="mt-2 flex items-center gap-2">
                <Box className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-400">
                  {batchLimits.totesAvailable} totes available
                </span>
                {batchLimits.totesOk ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                ) : (
                  <span className="text-xs text-red-400">
                    (need {batchLimits.totesNeeded - batchLimits.totesAvailable} more)
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Assign To */}
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">
              Assign to (optional)
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
              >
                <option value="">Unassigned</option>
                <option value="John">John</option>
                <option value="Jane">Jane</option>
                <option value="Mike">Mike</option>
              </select>
            </div>
          </div>

          {/* Order Preview */}
          <div>
            <h3 className="text-sm font-medium text-white mb-3">Orders in Batch</h3>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {selectedOrders.map((order) => {
                const isReady = order.status === 'to_pick' || order.status === 'draft';
                return (
                  <div
                    key={order.id}
                    className={`p-3 rounded-lg flex items-center justify-between ${
                      isReady ? 'bg-slate-800/50' : 'bg-red-500/10 border border-red-500/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-white">
                        #{order.orderNumber}
                      </span>
                      <span className="text-sm text-slate-400">
                        {order.customer.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-slate-400">
                        {order.items.reduce((s, i) => s + i.quantity, 0)} items
                      </span>
                      {!isReady && (
                        <span className="text-xs text-red-400">
                          Status: {order.status}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-700 flex items-center justify-between">
          <p className="text-sm text-slate-400">
            Batch will be created with{' '}
            <span className="text-white font-medium">
              {selectedOrders.length - ordersNotReady.length}
            </span>{' '}
            orders
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={selectedOrders.length - ordersNotReady.length === 0}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <ClipboardList className="w-4 h-4" />
              Create Batch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
