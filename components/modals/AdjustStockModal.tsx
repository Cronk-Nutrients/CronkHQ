'use client';

import { useState, useEffect, useMemo } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useApp, Product } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { formatNumber } from '@/lib/formatting';

interface AdjustStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

type AdjustmentType = 'add' | 'remove' | 'set';

const ADJUSTMENT_REASONS = [
  { value: 'received', label: 'Received (PO)' },
  { value: 'sold', label: 'Sold' },
  { value: 'damaged', label: 'Damaged' },
  { value: 'count_adjustment', label: 'Count Adjustment' },
  { value: 'transfer_in', label: 'Transfer In' },
  { value: 'transfer_out', label: 'Transfer Out' },
  { value: 'returned', label: 'Customer Return' },
  { value: 'other', label: 'Other' },
];

export function AdjustStockModal({ isOpen, onClose, product }: AdjustStockModalProps) {
  const { state, dispatch } = useApp();
  const { success, warning } = useToast();

  const [selectedLocation, setSelectedLocation] = useState('');
  const [adjustmentType, setAdjustmentType] = useState<AdjustmentType>('add');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('count_adjustment');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen && product) {
      setSelectedLocation(state.locations[0]?.id || '');
      setAdjustmentType('add');
      setQuantity('');
      setReason('count_adjustment');
      setNotes('');
    }
  }, [isOpen, product, state.locations]);

  // Get current stock for selected location
  const currentStock = useMemo(() => {
    if (!product || !selectedLocation) return 0;
    const inv = state.inventory.find(
      i => i.productId === product.id && i.locationId === selectedLocation
    );
    return inv?.quantity || 0;
  }, [product, selectedLocation, state.inventory]);

  // Get stock by location for display
  const stockByLocation = useMemo(() => {
    if (!product) return [];
    return state.locations.map(loc => {
      const inv = state.inventory.find(
        i => i.productId === product.id && i.locationId === loc.id
      );
      return {
        locationId: loc.id,
        locationName: loc.name,
        quantity: inv?.quantity || 0,
      };
    });
  }, [product, state.locations, state.inventory]);

  // Calculate new stock
  const newStock = useMemo(() => {
    const qty = parseInt(quantity) || 0;
    if (adjustmentType === 'add') return currentStock + qty;
    if (adjustmentType === 'remove') return currentStock - qty;
    if (adjustmentType === 'set') return qty;
    return currentStock;
  }, [currentStock, adjustmentType, quantity]);

  // Check if removal would go negative
  const wouldGoNegative = adjustmentType === 'remove' && newStock < 0;

  const handleSubmit = () => {
    if (!product || !selectedLocation) return;

    const qty = parseInt(quantity) || 0;
    if (qty === 0) return;

    setIsSubmitting(true);

    try {
      let adjustment = 0;
      if (adjustmentType === 'add') adjustment = qty;
      if (adjustmentType === 'remove') adjustment = -qty;
      if (adjustmentType === 'set') adjustment = qty - currentStock;

      dispatch({
        type: 'ADJUST_STOCK',
        payload: {
          productId: product.id,
          locationId: selectedLocation,
          adjustment,
        },
      });

      const locationName = state.locations.find(l => l.id === selectedLocation)?.name || 'Unknown';

      if (wouldGoNegative) {
        warning(`Stock adjusted: ${product.name} now has ${newStock} units at ${locationName} (negative stock)`);
      } else {
        success(`Stock adjusted: ${product.name} now has ${formatNumber(newStock)} units at ${locationName}`);
      }

      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!product) return null;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Adjust Stock"
      subtitle={product.name}
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !quantity || parseInt(quantity) === 0}
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Saving...
              </>
            ) : (
              'Apply Adjustment'
            )}
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Product Info */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-flask text-emerald-400"></i>
            </div>
            <div>
              <div className="font-medium text-white">{product.name}</div>
              <div className="text-sm text-slate-400">SKU: {product.sku}</div>
            </div>
          </div>
        </div>

        {/* Current Stock by Location */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Current Stock by Location</h3>
          <div className="grid grid-cols-1 gap-2">
            {stockByLocation.map(loc => (
              <div
                key={loc.locationId}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  selectedLocation === loc.locationId
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-slate-800/50 border-slate-700/50'
                }`}
              >
                <span className="text-slate-300">{loc.locationName}</span>
                <span className={`font-medium ${loc.quantity > 0 ? 'text-white' : 'text-slate-500'}`}>
                  {formatNumber(loc.quantity)} units
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Adjustment Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Location</label>
            <select
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
            >
              {state.locations.map(loc => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Adjustment Type</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'add', label: 'Add', icon: 'fa-plus' },
                { value: 'remove', label: 'Remove', icon: 'fa-minus' },
                { value: 'set', label: 'Set To', icon: 'fa-equals' },
              ].map(type => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setAdjustmentType(type.value as AdjustmentType)}
                  className={`p-3 rounded-lg border transition-colors ${
                    adjustmentType === type.value
                      ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <i className={`fas ${type.icon} mr-2`}></i>
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Quantity</label>
            <input
              type="number"
              min="0"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              placeholder="Enter quantity"
            />
          </div>

          {/* Preview */}
          {quantity && parseInt(quantity) > 0 && (
            <div className={`p-4 rounded-lg border ${
              wouldGoNegative
                ? 'bg-red-500/10 border-red-500/30'
                : 'bg-blue-500/10 border-blue-500/30'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Stock Change Preview</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">{formatNumber(currentStock)}</span>
                  <i className="fas fa-arrow-right text-slate-500"></i>
                  <span className={`font-medium ${wouldGoNegative ? 'text-red-400' : 'text-emerald-400'}`}>
                    {formatNumber(newStock)}
                  </span>
                </div>
              </div>
              {wouldGoNegative && (
                <p className="text-red-400 text-sm mt-2">
                  <i className="fas fa-exclamation-triangle mr-1"></i>
                  This will result in negative stock. Proceed with caution.
                </p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Reason</label>
            <select
              value={reason}
              onChange={e => setReason(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
            >
              {ADJUSTMENT_REASONS.map(r => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={2}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 resize-none"
              placeholder="Additional notes about this adjustment..."
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AdjustStockModal;
