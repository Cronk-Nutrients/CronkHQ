'use client';

import { useState, useEffect, useMemo } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useApp, PurchaseOrder, PurchaseOrderItem, SerialNumber, InventoryLot } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { formatCurrency, formatCurrencyPrecise, formatNumber, formatDate } from '@/lib/formatting';
import { Package, Check, AlertTriangle, Hash, Wand2, X, Layers, Calendar } from 'lucide-react';

interface ReceivePOModalProps {
  isOpen: boolean;
  onClose: () => void;
  po: PurchaseOrder | null;
}

type ItemCondition = 'good' | 'damaged' | 'wrong_item' | 'short';

interface LotEntry {
  lotNumber: string;
  quantity: number;
  expirationDate?: string;
  manufacturedDate?: string;
  supplierLotNumber?: string;
  notes?: string;
}

interface ReceivingItem {
  productId: string;
  productName: string;
  sku: string;
  ordered: number;
  previouslyReceived: number;
  receivingNow: number;
  condition: ItemCondition;
}

export function ReceivePOModal({ isOpen, onClose, po }: ReceivePOModalProps) {
  const { state, dispatch } = useApp();
  const { success, error, warning } = useToast();

  // Form state
  const [receivingItems, setReceivingItems] = useState<ReceivingItem[]>([]);
  const [receivingNotes, setReceivingNotes] = useState('');
  const [receiveLocation, setReceiveLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Serial number state for serialized products
  const [serialsByProduct, setSerialsByProduct] = useState<Record<string, string[]>>({});
  const [serialInputs, setSerialInputs] = useState<Record<string, string>>({});

  // Lot state for lot-tracked products
  const [lotsByProduct, setLotsByProduct] = useState<Record<string, LotEntry[]>>({});
  const [showLotForm, setShowLotForm] = useState<Record<string, boolean>>({});
  const [newLot, setNewLot] = useState<LotEntry>({ lotNumber: '', quantity: 0 });

  // Initialize receiving items when modal opens
  useEffect(() => {
    if (isOpen && po) {
      setReceivingItems(po.items.map(item => ({
        productId: item.productId,
        productName: item.productName,
        sku: item.sku,
        ordered: item.quantity,
        previouslyReceived: item.receivedQty,
        receivingNow: item.quantity - item.receivedQty, // Default to remaining
        condition: 'good' as ItemCondition,
      })));
      setReceivingNotes('');
      setSerialsByProduct({});
      setSerialInputs({});
      setLotsByProduct({});
      setShowLotForm({});
      setNewLot({ lotNumber: '', quantity: 0 });
      // Set default location
      const defaultLoc = state.locations.find(l => l.isDefault);
      setReceiveLocation(defaultLoc?.id || state.locations[0]?.id || '');
    }
  }, [isOpen, po, state.locations]);

  // Update receiving quantity
  const updateReceivingQty = (productId: string, qty: number) => {
    setReceivingItems(prev => prev.map(item => {
      if (item.productId === productId) {
        const maxReceivable = item.ordered - item.previouslyReceived;
        const clampedQty = Math.max(0, Math.min(qty, maxReceivable));
        return { ...item, receivingNow: clampedQty };
      }
      return item;
    }));
  };

  // Update condition
  const updateCondition = (productId: string, condition: ItemCondition) => {
    setReceivingItems(prev => prev.map(item =>
      item.productId === productId ? { ...item, condition } : item
    ));
  };

  // Receive all remaining
  const receiveAllRemaining = () => {
    setReceivingItems(prev => prev.map(item => ({
      ...item,
      receivingNow: item.ordered - item.previouslyReceived,
      condition: 'good',
    })));
  };

  // Get product info for serial tracking
  const getProduct = (productId: string) => state.products.find(p => p.id === productId);

  // Check if product tracks serials
  const isSerialTracked = (productId: string) => {
    const product = getProduct(productId);
    return product?.trackSerials === true;
  };

  // Add serial number for a product
  const addSerial = (productId: string, serial: string) => {
    if (!serial.trim()) return;

    const currentSerials = serialsByProduct[productId] || [];
    // Check for duplicates
    if (currentSerials.includes(serial.trim())) {
      warning('Serial number already entered');
      return;
    }

    setSerialsByProduct(prev => ({
      ...prev,
      [productId]: [...(prev[productId] || []), serial.trim()]
    }));
    setSerialInputs(prev => ({ ...prev, [productId]: '' }));
  };

  // Remove serial number
  const removeSerial = (productId: string, index: number) => {
    setSerialsByProduct(prev => ({
      ...prev,
      [productId]: (prev[productId] || []).filter((_, i) => i !== index)
    }));
  };

  // Auto-generate serials for a product
  const autoGenerateSerials = (productId: string, quantity: number) => {
    const product = getProduct(productId);
    if (!product) return;

    const generated: string[] = [];
    let nextNum = product.serialNextNumber || 1;

    for (let i = 0; i < quantity; i++) {
      const serial = `${product.serialPrefix || ''}${String(nextNum).padStart(4, '0')}${product.serialSuffix || ''}`;
      generated.push(serial);
      nextNum++;
    }

    setSerialsByProduct(prev => ({
      ...prev,
      [productId]: generated
    }));

    // Update product's next serial number
    dispatch({
      type: 'UPDATE_PRODUCT',
      payload: { ...product, serialNextNumber: nextNum, updatedAt: new Date() }
    });
  };

  // Check if product tracks lots
  const isLotTracked = (productId: string) => {
    const product = getProduct(productId);
    return product?.trackLots === true;
  };

  // Check if product tracks expiration
  const tracksExpiration = (productId: string) => {
    const product = getProduct(productId);
    return product?.expirationTracking === true;
  };

  // Generate lot number for a product
  const generateLotNumber = (productId: string) => {
    const product = getProduct(productId);
    if (!product) return '';

    const prefix = product.lotPrefix || 'LOT-';
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const nextNum = product.lotNextNumber || 1;

    return `${prefix}${dateStr}-${String(nextNum).padStart(3, '0')}`;
  };

  // Add lot for a product
  const addLot = (productId: string, lot: LotEntry) => {
    if (!lot.lotNumber.trim() || lot.quantity <= 0) return;

    const existingLots = lotsByProduct[productId] || [];
    // Check for duplicate lot numbers
    if (existingLots.some(l => l.lotNumber === lot.lotNumber)) {
      warning('Lot number already exists');
      return;
    }

    setLotsByProduct(prev => ({
      ...prev,
      [productId]: [...(prev[productId] || []), { ...lot }]
    }));

    // Update product's next lot number
    const product = getProduct(productId);
    if (product) {
      dispatch({
        type: 'UPDATE_PRODUCT',
        payload: { ...product, lotNextNumber: (product.lotNextNumber || 1) + 1, updatedAt: new Date() }
      });
    }

    // Reset form
    setNewLot({ lotNumber: '', quantity: 0 });
    setShowLotForm(prev => ({ ...prev, [productId]: false }));
  };

  // Remove lot
  const removeLot = (productId: string, index: number) => {
    setLotsByProduct(prev => ({
      ...prev,
      [productId]: (prev[productId] || []).filter((_, i) => i !== index)
    }));
  };

  // Get total qty in lots for a product
  const getLotTotalQty = (productId: string) => {
    const lots = lotsByProduct[productId] || [];
    return lots.reduce((sum, l) => sum + l.quantity, 0);
  };

  // Calculate totals
  const totals = useMemo(() => {
    const totalOrdered = receivingItems.reduce((sum, i) => sum + i.ordered, 0);
    const totalPreviouslyReceived = receivingItems.reduce((sum, i) => sum + i.previouslyReceived, 0);
    const totalReceivingNow = receivingItems.reduce((sum, i) => sum + i.receivingNow, 0);
    const totalAfter = totalPreviouslyReceived + totalReceivingNow;

    return {
      totalOrdered,
      totalPreviouslyReceived,
      totalReceivingNow,
      totalAfter,
      percentComplete: totalOrdered > 0 ? (totalAfter / totalOrdered) * 100 : 0,
      willBeFullyReceived: totalAfter >= totalOrdered,
    };
  }, [receivingItems]);

  // Check if any items have issues
  const hasIssues = useMemo(() => {
    return receivingItems.some(item => item.condition !== 'good' && item.receivingNow > 0);
  }, [receivingItems]);

  // Submit receive
  const handleReceive = () => {
    if (!po || totals.totalReceivingNow <= 0) return;

    setIsSubmitting(true);

    try {
      // Update PO items with new received quantities
      const updatedItems: PurchaseOrderItem[] = po.items.map(item => {
        const receiving = receivingItems.find(r => r.productId === item.productId);
        return {
          ...item,
          receivedQty: item.receivedQty + (receiving?.receivingNow || 0),
        };
      });

      // Check if fully received
      const fullyReceived = updatedItems.every(item => item.receivedQty >= item.quantity);

      // Determine new status
      let newStatus: PurchaseOrder['status'] = po.status;
      if (fullyReceived) {
        newStatus = 'received';
      } else if (updatedItems.some(item => item.receivedQty > 0)) {
        newStatus = 'partial';
      }

      // Update PO
      const updatedPO: PurchaseOrder = {
        ...po,
        items: updatedItems,
        status: newStatus,
        updatedAt: new Date(),
      };

      dispatch({ type: 'UPDATE_PURCHASE_ORDER', payload: updatedPO });

      // Update inventory for each received item
      const locationName = state.locations.find(l => l.id === receiveLocation)?.name || '';

      receivingItems.forEach(item => {
        if (item.receivingNow > 0 && item.condition === 'good') {
          dispatch({
            type: 'ADJUST_STOCK',
            payload: {
              productId: item.productId,
              locationId: receiveLocation,
              adjustment: item.receivingNow,
            }
          });

          // Create serial number records for serialized products
          if (isSerialTracked(item.productId)) {
            const productSerials = serialsByProduct[item.productId] || [];
            const serialRecords: SerialNumber[] = productSerials.map(serial => ({
              id: crypto.randomUUID(),
              serial,
              productId: item.productId,
              productName: item.productName,
              sku: item.sku,
              status: 'in_stock' as const,
              locationId: receiveLocation,
              locationName,
              purchaseOrderId: po.id,
              receivedAt: new Date()
            }));

            if (serialRecords.length > 0) {
              dispatch({ type: 'ADD_SERIAL_NUMBERS', payload: serialRecords });
            }
          }

          // Create lot records for lot-tracked products
          if (isLotTracked(item.productId)) {
            const productLots = lotsByProduct[item.productId] || [];
            const lotRecords: InventoryLot[] = productLots.map(lot => ({
              id: crypto.randomUUID(),
              lotNumber: lot.lotNumber,
              productId: item.productId,
              productName: item.productName,
              sku: item.sku,
              quantity: lot.quantity,
              reservedQty: 0,
              expirationDate: lot.expirationDate ? new Date(lot.expirationDate) : undefined,
              manufacturedDate: lot.manufacturedDate ? new Date(lot.manufacturedDate) : undefined,
              receivedDate: new Date(),
              status: 'active' as const,
              locationId: receiveLocation,
              locationName,
              purchaseOrderId: po.id,
              supplierLotNumber: lot.supplierLotNumber,
              notes: lot.notes
            }));

            if (lotRecords.length > 0) {
              dispatch({ type: 'ADD_LOTS', payload: lotRecords });
            }
          }
        }
      });

      // Show appropriate message
      if (hasIssues) {
        warning(`Received ${formatNumber(totals.totalReceivingNow)} units with some issues noted`);
      } else if (fullyReceived) {
        success(`PO ${po.poNumber} fully received! ${formatNumber(totals.totalReceivingNow)} units added to inventory`);
      } else {
        success(`Received ${formatNumber(totals.totalReceivingNow)} units on PO ${po.poNumber}`);
      }

      onClose();
    } catch (err) {
      error('Failed to receive items');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!po) return null;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Receive Items"
      subtitle={`${po.poNumber} from ${po.supplier}`}
      size="xl"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleReceive}
            disabled={isSubmitting || totals.totalReceivingNow <= 0}
          >
            {isSubmitting ? (
              'Processing...'
            ) : (
              <>
                <Check className="w-4 h-4" />
                Receive {formatNumber(totals.totalReceivingNow)} Units
              </>
            )}
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* PO Summary */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-slate-400">PO Number:</span>
              <span className="ml-2 text-white font-mono">{po.poNumber}</span>
            </div>
            <div>
              <span className="text-slate-400">Supplier:</span>
              <span className="ml-2 text-white">{po.supplier}</span>
            </div>
            <div>
              <span className="text-slate-400">Expected:</span>
              <span className="ml-2 text-white">
                {po.expectedDate ? formatDate(po.expectedDate) : 'Not set'}
              </span>
            </div>
            <div>
              <span className="text-slate-400">Total Value:</span>
              <span className="ml-2 text-white font-medium">{formatCurrencyPrecise(po.total)}</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Receiving Progress</span>
            <span className="text-sm text-white">
              {formatNumber(totals.totalAfter)} / {formatNumber(totals.totalOrdered)} units
              ({totals.percentComplete.toFixed(0)}%)
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                totals.willBeFullyReceived ? 'bg-emerald-500' : 'bg-blue-500'
              }`}
              style={{ width: `${Math.min(totals.percentComplete, 100)}%` }}
            />
          </div>
          {totals.willBeFullyReceived && (
            <p className="text-xs text-emerald-400 mt-2">
              <Check className="w-3 h-3 inline mr-1" />
              This will complete the PO
            </p>
          )}
        </div>

        {/* Receive Location */}
        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Receive to Location</label>
          <select
            value={receiveLocation}
            onChange={e => setReceiveLocation(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
          >
            {state.locations.map(loc => (
              <option key={loc.id} value={loc.id}>{loc.name}</option>
            ))}
          </select>
        </div>

        {/* Line Items */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-white">Items to Receive</h3>
            <button
              onClick={receiveAllRemaining}
              className="text-sm text-emerald-400 hover:text-emerald-300"
            >
              Receive All Remaining
            </button>
          </div>

          <div className="border border-slate-700 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr className="text-xs text-slate-400 uppercase tracking-wider">
                  <th className="px-4 py-3 text-left">Product</th>
                  <th className="px-4 py-3 text-center">Ordered</th>
                  <th className="px-4 py-3 text-center">Previously Received</th>
                  <th className="px-4 py-3 text-center">Receiving Now</th>
                  <th className="px-4 py-3 text-center">Condition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {receivingItems.map(item => {
                  const remaining = item.ordered - item.previouslyReceived;
                  const isComplete = remaining <= 0;
                  const isSerial = isSerialTracked(item.productId);
                  const isLot = isLotTracked(item.productId);
                  const productSerials = serialsByProduct[item.productId] || [];
                  const serialInput = serialInputs[item.productId] || '';

                  return (
                    <tr
                      key={item.productId}
                      className={`${isComplete ? 'bg-emerald-500/5' : 'hover:bg-slate-800/30'}`}
                    >
                      <td className="px-4 py-3" colSpan={isSerial && !isComplete && item.receivingNow > 0 ? 1 : undefined}>
                        <div className="text-sm text-white">{item.productName}</div>
                        <div className="text-xs text-slate-400 font-mono">
                          {item.sku}
                          {isSerial && (
                            <span className="ml-2 text-purple-400">
                              <Hash className="w-3 h-3 inline" /> Serial Tracked
                            </span>
                          )}
                          {isLot && (
                            <span className="ml-2 text-purple-400">
                              <Layers className="w-3 h-3 inline" /> Lot Tracked
                            </span>
                          )}
                        </div>

                        {/* Serial Entry Section */}
                        {isSerial && !isComplete && item.receivingNow > 0 && (
                          <div className="mt-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-slate-400">
                                Serial Numbers ({productSerials.length} / {item.receivingNow})
                              </span>
                              <button
                                type="button"
                                onClick={() => autoGenerateSerials(item.productId, item.receivingNow)}
                                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                              >
                                <Wand2 className="w-3 h-3" />
                                Auto-Generate
                              </button>
                            </div>

                            {/* Serial Input */}
                            <div className="flex gap-2 mb-2">
                              <input
                                type="text"
                                value={serialInput}
                                onChange={(e) => setSerialInputs(prev => ({ ...prev, [item.productId]: e.target.value }))}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addSerial(item.productId, serialInput);
                                  }
                                }}
                                placeholder="Enter or scan serial..."
                                className="flex-1 bg-slate-700 border border-slate-600 rounded px-3 py-1.5 text-sm text-white placeholder-slate-500 font-mono"
                              />
                              <button
                                type="button"
                                onClick={() => addSerial(item.productId, serialInput)}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded transition-colors"
                              >
                                Add
                              </button>
                            </div>

                            {/* Serial List */}
                            {productSerials.length > 0 && (
                              <div className="max-h-24 overflow-y-auto space-y-1">
                                {productSerials.map((serial, idx) => (
                                  <div key={idx} className="flex items-center justify-between px-2 py-1 bg-slate-700/50 rounded text-xs">
                                    <span className="font-mono text-white">{serial}</span>
                                    <button
                                      type="button"
                                      onClick={() => removeSerial(item.productId, idx)}
                                      className="text-red-400 hover:text-red-300"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Warning if count mismatch */}
                            {productSerials.length !== item.receivingNow && (
                              <div className="mt-2 text-xs text-amber-400 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                {productSerials.length < item.receivingNow
                                  ? `Need ${item.receivingNow - productSerials.length} more serial(s)`
                                  : `${productSerials.length - item.receivingNow} extra serial(s)`}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Lot Entry Section */}
                        {isLot && !isComplete && item.receivingNow > 0 && (
                          <div className="mt-3 p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-slate-400 flex items-center gap-1">
                                <Layers className="w-3 h-3 text-purple-400" />
                                Lot Numbers ({getLotTotalQty(item.productId)} / {item.receivingNow} units)
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  setNewLot({
                                    lotNumber: generateLotNumber(item.productId),
                                    quantity: item.receivingNow - getLotTotalQty(item.productId)
                                  });
                                  setShowLotForm(prev => ({ ...prev, [item.productId]: true }));
                                }}
                                className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                              >
                                <Wand2 className="w-3 h-3" />
                                Add Lot
                              </button>
                            </div>

                            {/* Lot List */}
                            {(lotsByProduct[item.productId] || []).map((lot, idx) => (
                              <div key={idx} className="flex items-center justify-between px-3 py-2 bg-slate-700/50 rounded mb-1 text-xs">
                                <div>
                                  <span className="font-mono text-white">{lot.lotNumber}</span>
                                  <span className="text-slate-400 ml-2">x{lot.quantity}</span>
                                  {lot.expirationDate && (
                                    <span className="text-amber-400 ml-2 flex items-center gap-1 inline-flex">
                                      <Calendar className="w-3 h-3" />
                                      Exp: {lot.expirationDate}
                                    </span>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeLot(item.productId, idx)}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}

                            {/* Add Lot Form */}
                            {showLotForm[item.productId] && (
                              <div className="mt-2 p-3 bg-slate-800/50 rounded-lg space-y-2">
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <label className="text-xs text-slate-400 block mb-1">Lot Number</label>
                                    <input
                                      type="text"
                                      value={newLot.lotNumber}
                                      onChange={(e) => setNewLot(prev => ({ ...prev, lotNumber: e.target.value }))}
                                      className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1.5 text-sm text-white font-mono"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs text-slate-400 block mb-1">Quantity</label>
                                    <input
                                      type="number"
                                      min="1"
                                      value={newLot.quantity}
                                      onChange={(e) => setNewLot(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
                                      className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1.5 text-sm text-white"
                                    />
                                  </div>
                                </div>

                                {tracksExpiration(item.productId) && (
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <label className="text-xs text-slate-400 block mb-1">Expiration Date</label>
                                      <input
                                        type="date"
                                        value={newLot.expirationDate || ''}
                                        onChange={(e) => setNewLot(prev => ({ ...prev, expirationDate: e.target.value }))}
                                        className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1.5 text-sm text-white"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-xs text-slate-400 block mb-1">Manufactured Date</label>
                                      <input
                                        type="date"
                                        value={newLot.manufacturedDate || ''}
                                        onChange={(e) => setNewLot(prev => ({ ...prev, manufacturedDate: e.target.value }))}
                                        className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1.5 text-sm text-white"
                                      />
                                    </div>
                                  </div>
                                )}

                                <div>
                                  <label className="text-xs text-slate-400 block mb-1">Supplier Lot # (Optional)</label>
                                  <input
                                    type="text"
                                    value={newLot.supplierLotNumber || ''}
                                    onChange={(e) => setNewLot(prev => ({ ...prev, supplierLotNumber: e.target.value }))}
                                    placeholder="Manufacturer's lot number"
                                    className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1.5 text-sm text-white placeholder-slate-500"
                                  />
                                </div>

                                <div className="flex justify-end gap-2 mt-2">
                                  <button
                                    type="button"
                                    onClick={() => setShowLotForm(prev => ({ ...prev, [item.productId]: false }))}
                                    className="px-3 py-1.5 text-sm text-slate-400 hover:text-white"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => addLot(item.productId, newLot)}
                                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded transition-colors"
                                  >
                                    Add Lot
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* Warning if qty mismatch */}
                            {getLotTotalQty(item.productId) !== item.receivingNow && !showLotForm[item.productId] && (
                              <div className="mt-2 text-xs text-amber-400 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                {getLotTotalQty(item.productId) < item.receivingNow
                                  ? `Need ${item.receivingNow - getLotTotalQty(item.productId)} more units assigned to lots`
                                  : `${getLotTotalQty(item.productId) - item.receivingNow} extra units assigned`}
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-white align-top">
                        {formatNumber(item.ordered)}
                      </td>
                      <td className="px-4 py-3 text-center text-sm align-top">
                        <span className={item.previouslyReceived > 0 ? 'text-emerald-400' : 'text-slate-400'}>
                          {formatNumber(item.previouslyReceived)}
                        </span>
                      </td>
                      <td className="px-4 py-3 align-top">
                        {isComplete ? (
                          <div className="text-center text-sm text-emerald-400">
                            <Check className="w-4 h-4 inline mr-1" />
                            Complete
                          </div>
                        ) : (
                          <input
                            type="number"
                            min="0"
                            max={remaining}
                            value={item.receivingNow}
                            onChange={e => updateReceivingQty(item.productId, parseInt(e.target.value) || 0)}
                            className="w-20 mx-auto block bg-slate-700 border border-slate-600 rounded px-2 py-1.5 text-white text-center text-sm"
                          />
                        )}
                      </td>
                      <td className="px-4 py-3 align-top">
                        {!isComplete && item.receivingNow > 0 && (
                          <select
                            value={item.condition}
                            onChange={e => updateCondition(item.productId, e.target.value as ItemCondition)}
                            className={`w-full bg-slate-700 border rounded px-2 py-1.5 text-sm ${
                              item.condition === 'good'
                                ? 'border-slate-600 text-white'
                                : 'border-amber-500/50 text-amber-400'
                            }`}
                          >
                            <option value="good">Good</option>
                            <option value="damaged">Damaged</option>
                            <option value="wrong_item">Wrong Item</option>
                            <option value="short">Short</option>
                          </select>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Issues Warning */}
        {hasIssues && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-amber-400">Issues Noted</div>
              <div className="text-sm text-slate-300 mt-1">
                Some items are marked with condition issues. Items marked as damaged, wrong item, or short
                will still be received but the issues will be logged.
              </div>
            </div>
          </div>
        )}

        {/* Receiving Notes */}
        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Receiving Notes (Optional)</label>
          <textarea
            value={receivingNotes}
            onChange={e => setReceivingNotes(e.target.value)}
            rows={2}
            placeholder="Note any issues, discrepancies, or special handling..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 resize-none"
          />
        </div>
      </div>
    </Modal>
  );
}

export default ReceivePOModal;
