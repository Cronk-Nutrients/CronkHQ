'use client';

import { useState, useEffect, useMemo } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Toggle } from '@/components/ui/Toggle';
import { useApp, ShippingBox } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { formatNumber, formatCurrency } from '@/lib/formatting';
import { Box, Ruler, Scale, Zap } from 'lucide-react';

interface BoxModalProps {
  isOpen: boolean;
  onClose: () => void;
  editBox?: ShippingBox | null;
}

export function BoxModal({ isOpen, onClose, editBox }: BoxModalProps) {
  const { dispatch } = useApp();
  const { success, error } = useToast();

  // Form state
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [innerLength, setInnerLength] = useState('');
  const [innerWidth, setInnerWidth] = useState('');
  const [innerHeight, setInnerHeight] = useState('');
  const [maxWeight, setMaxWeight] = useState('');
  const [cost, setCost] = useState('');
  const [smartBoxEligible, setSmartBoxEligible] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!editBox;

  // Calculate volume
  const volume = useMemo(() => {
    const l = parseFloat(innerLength) || 0;
    const w = parseFloat(innerWidth) || 0;
    const h = parseFloat(innerHeight) || 0;
    return l * w * h;
  }, [innerLength, innerWidth, innerHeight]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      if (editBox) {
        setName(editBox.name);
        setSku(editBox.sku || '');
        setInnerLength(editBox.innerLength.toString());
        setInnerWidth(editBox.innerWidth.toString());
        setInnerHeight(editBox.innerHeight.toString());
        setMaxWeight(editBox.maxWeight.toString());
        setCost(editBox.cost?.toString() || '');
        setSmartBoxEligible(editBox.smartBoxEligible);
      } else {
        setName('');
        setSku('');
        setInnerLength('');
        setInnerWidth('');
        setInnerHeight('');
        setMaxWeight('');
        setCost('');
        setSmartBoxEligible(true);
      }
    }
  }, [isOpen, editBox]);

  // Validation
  const isValid = useMemo(() => {
    if (!name.trim()) return false;
    if (!innerLength || parseFloat(innerLength) <= 0) return false;
    if (!innerWidth || parseFloat(innerWidth) <= 0) return false;
    if (!innerHeight || parseFloat(innerHeight) <= 0) return false;
    if (!maxWeight || parseFloat(maxWeight) <= 0) return false;
    return true;
  }, [name, innerLength, innerWidth, innerHeight, maxWeight]);

  // Handle save
  const handleSave = () => {
    if (!isValid) return;

    setIsSubmitting(true);

    try {
      const boxData: ShippingBox = {
        id: editBox?.id || crypto.randomUUID(),
        name: name.trim(),
        sku: sku.trim() || undefined,
        innerLength: parseFloat(innerLength),
        innerWidth: parseFloat(innerWidth),
        innerHeight: parseFloat(innerHeight),
        maxWeight: parseFloat(maxWeight),
        cost: cost ? parseFloat(cost) : undefined,
        smartBoxEligible,
      };

      if (isEditing) {
        dispatch({ type: 'UPDATE_BOX', payload: boxData });
        success(`Box "${name}" updated`);
      } else {
        dispatch({ type: 'ADD_BOX', payload: boxData });
        success(`Box "${name}" added`);
      }

      onClose();
    } catch (err) {
      error('Failed to save box');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Shipping Box' : 'Add Shipping Box'}
      subtitle={isEditing ? `Editing ${editBox?.name}` : 'Define a new box size for fulfillment'}
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSubmitting || !isValid}>
            {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Box'}
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Box Name & SKU */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Box Name *</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g., Small Flat, Large Cube"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">SKU (Optional)</label>
            <input
              type="text"
              value={sku}
              onChange={e => setSku(e.target.value)}
              placeholder="e.g., BOX-SM-01"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 font-mono"
            />
          </div>
        </div>

        {/* Inner Dimensions */}
        <div>
          <label className="block text-sm text-slate-400 mb-3">
            <span className="flex items-center gap-2">
              <Ruler className="w-4 h-4" />
              Inner Dimensions (inches) *
            </span>
          </label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Length</label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={innerLength}
                onChange={e => setInnerLength(e.target.value)}
                placeholder="0"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Width</label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={innerWidth}
                onChange={e => setInnerWidth(e.target.value)}
                placeholder="0"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Height</label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={innerHeight}
                onChange={e => setInnerHeight(e.target.value)}
                placeholder="0"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
          </div>
          {volume > 0 && (
            <div className="mt-2 text-sm text-slate-400">
              Volume: <span className="text-white">{formatNumber(volume)} cubic inches</span>
            </div>
          )}
        </div>

        {/* Max Weight */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">
              <span className="flex items-center gap-2">
                <Scale className="w-4 h-4" />
                Max Weight (oz) *
              </span>
            </label>
            <input
              type="number"
              step="1"
              min="0"
              value={maxWeight}
              onChange={e => setMaxWeight(e.target.value)}
              placeholder="0"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
            {maxWeight && parseFloat(maxWeight) > 0 && (
              <div className="mt-1 text-xs text-slate-500">
                {formatNumber(parseFloat(maxWeight) / 16)} lbs
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Cost per Box (Optional)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={cost}
                onChange={e => setCost(e.target.value)}
                placeholder="0.00"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
          </div>
        </div>

        {/* Smart Box Toggle */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
          <Toggle
            checked={smartBoxEligible}
            onChange={setSmartBoxEligible}
            label="Smart Box Eligible"
            description="Include this box in automatic box size selection based on item dimensions"
          />
        </div>

        {/* Preview */}
        {isValid && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <Box className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <div className="text-white font-medium">{name || 'New Box'}</div>
                <div className="text-sm text-slate-400">
                  {innerLength}" x {innerWidth}" x {innerHeight}" ({formatNumber(volume)} cu in) | Max {formatNumber(parseFloat(maxWeight) || 0)} oz
                  {cost && ` | ${formatCurrency(parseFloat(cost))}`}
                </div>
              </div>
              {smartBoxEligible && (
                <div className="ml-auto flex items-center gap-1 text-xs text-emerald-400">
                  <Zap className="w-3 h-3" />
                  Smart
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default BoxModal;
