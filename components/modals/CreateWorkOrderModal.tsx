'use client';

import { useState, useEffect, useMemo } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useApp, WorkOrder, WorkOrderComponent, Product, Bundle } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { Package, AlertTriangle, Check, ChevronDown } from 'lucide-react';

interface CreateWorkOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  editWO?: WorkOrder | null;
}

export function CreateWorkOrderModal({ isOpen, onClose, editWO }: CreateWorkOrderModalProps) {
  const { state, dispatch } = useApp();
  const { success, error } = useToast();

  // Form state
  const [woNumber, setWoNumber] = useState('');
  const [outputProductId, setOutputProductId] = useState('');
  const [outputType, setOutputType] = useState<'product' | 'bundle'>('bundle');
  const [quantityToProduce, setQuantityToProduce] = useState('1');
  const [priority, setPriority] = useState<'normal' | 'high' | 'urgent'>('normal');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!editWO;

  // Generate WO number
  const generateWONumber = () => {
    const count = state.workOrders.length + 1;
    return `WO-${count.toString().padStart(4, '0')}`;
  };

  // Get product stock
  const getProductStock = (productId: string) => {
    return state.inventory
      .filter(i => i.productId === productId)
      .reduce((sum, i) => sum + i.quantity, 0);
  };

  // Get output product/bundle details
  const outputItem = useMemo(() => {
    if (outputType === 'bundle') {
      return state.bundles.find(b => b.id === outputProductId);
    }
    return state.products.find(p => p.id === outputProductId);
  }, [outputProductId, outputType, state.bundles, state.products]);

  // Calculate components needed based on output selection
  const components = useMemo(() => {
    const qty = parseInt(quantityToProduce) || 0;
    if (!outputProductId || qty <= 0) return [];

    if (outputType === 'bundle') {
      const bundle = state.bundles.find(b => b.id === outputProductId);
      if (!bundle) return [];

      return bundle.components.map(c => {
        const product = state.products.find(p => p.id === c.productId);
        const available = getProductStock(c.productId);
        const required = c.quantity * qty;

        return {
          productId: c.productId,
          productName: c.productName || product?.name || 'Unknown',
          sku: product?.sku || '',
          quantityRequired: required,
          quantityAvailable: available,
          isShort: available < required,
          shortBy: Math.max(0, required - available),
        };
      });
    }

    // For regular products, check if they have components (BOM)
    const product = state.products.find(p => p.id === outputProductId);
    if (!product?.components || product.components.length === 0) {
      return [];
    }

    // Use product's manufacturing components
    return product.components.map(c => {
      const componentProduct = state.products.find(p => p.id === c.productId);
      const available = getProductStock(c.productId);
      const required = c.quantity * qty;

      return {
        productId: c.productId,
        productName: c.productName || componentProduct?.name || 'Unknown',
        sku: componentProduct?.sku || '',
        quantityRequired: required,
        quantityAvailable: available,
        isShort: available < required,
        shortBy: Math.max(0, required - available),
      };
    });
  }, [outputProductId, outputType, quantityToProduce, state.bundles, state.products, state.inventory]);

  // Check if we can produce
  const productionStatus = useMemo(() => {
    if (components.length === 0) {
      return { canProduce: true, maxProducible: parseInt(quantityToProduce) || 0, shortComponents: [] };
    }

    const shortComponents = components.filter(c => c.isShort);
    const canProduce = shortComponents.length === 0;

    // Calculate max producible
    let maxProducible = Infinity;
    components.forEach(c => {
      const perUnit = c.quantityRequired / (parseInt(quantityToProduce) || 1);
      const possible = Math.floor(c.quantityAvailable / perUnit);
      maxProducible = Math.min(maxProducible, possible);
    });

    if (maxProducible === Infinity) maxProducible = parseInt(quantityToProduce) || 0;

    return { canProduce, maxProducible, shortComponents };
  }, [components, quantityToProduce]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      if (editWO) {
        setWoNumber(editWO.woNumber);
        setOutputProductId(editWO.outputProductId);
        setQuantityToProduce(editWO.quantityToProduce.toString());
        setPriority(editWO.priority);
        setDueDate(editWO.dueDate ? new Date(editWO.dueDate).toISOString().split('T')[0] : '');
        setNotes(editWO.notes || '');
        // Determine if it's a bundle or product
        const isBundle = state.bundles.some(b => b.id === editWO.outputProductId);
        setOutputType(isBundle ? 'bundle' : 'product');
      } else {
        setWoNumber(generateWONumber());
        setOutputProductId('');
        setOutputType('bundle');
        setQuantityToProduce('1');
        setPriority('normal');
        setDueDate('');
        setNotes('');
      }
    }
  }, [isOpen, editWO, state.bundles]);

  // Validation
  const isValid = useMemo(() => {
    if (!woNumber.trim()) return false;
    if (!outputProductId) return false;
    if (!quantityToProduce || parseInt(quantityToProduce) <= 0) return false;
    return true;
  }, [woNumber, outputProductId, quantityToProduce]);

  // Handle create
  const handleCreate = () => {
    if (!isValid) return;

    setIsSubmitting(true);

    try {
      const qty = parseInt(quantityToProduce) || 0;
      const outputName = outputType === 'bundle'
        ? state.bundles.find(b => b.id === outputProductId)?.name
        : state.products.find(p => p.id === outputProductId)?.name;

      const woComponents: WorkOrderComponent[] = components.map(c => ({
        productId: c.productId,
        productName: c.productName,
        quantityRequired: c.quantityRequired,
        quantityUsed: 0,
      }));

      const newWO: WorkOrder = {
        id: editWO?.id || crypto.randomUUID(),
        woNumber: woNumber.trim(),
        status: editWO?.status || 'pending',
        outputProductId,
        outputProductName: outputName || '',
        quantityToProduce: qty,
        quantityProduced: editWO?.quantityProduced || 0,
        priority,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        components: woComponents,
        notes: notes.trim() || undefined,
        startedAt: editWO?.startedAt,
        completedAt: editWO?.completedAt,
        createdAt: editWO?.createdAt || new Date(),
      };

      if (isEditing) {
        dispatch({ type: 'UPDATE_WORK_ORDER', payload: newWO });
        success(`Work Order ${woNumber} updated`);
      } else {
        dispatch({ type: 'ADD_WORK_ORDER', payload: newWO });
        success(`Work Order ${woNumber} created`);
      }

      onClose();
    } catch (err) {
      error('Failed to save work order');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Work Order' : 'Create Work Order'}
      subtitle={isEditing ? `Editing ${editWO?.woNumber}` : 'Schedule a production or assembly task'}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={isSubmitting || !isValid}>
            {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Work Order'}
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* WO Header */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Work Order Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">WO Number</label>
              <input
                type="text"
                value={woNumber}
                onChange={e => setWoNumber(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white font-mono focus:outline-none focus:border-emerald-500/50"
                readOnly={isEditing}
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Priority</label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as 'normal' | 'high' | 'urgent')}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
              >
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Output Selection */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Output Product</h3>

          {/* Type Selector */}
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => {
                setOutputType('bundle');
                setOutputProductId('');
              }}
              className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                outputType === 'bundle'
                  ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              Bundle Assembly
            </button>
            <button
              type="button"
              onClick={() => {
                setOutputType('product');
                setOutputProductId('');
              }}
              className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                outputType === 'product'
                  ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              Product Manufacturing
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">
                {outputType === 'bundle' ? 'Select Bundle' : 'Select Product'} *
              </label>
              <select
                value={outputProductId}
                onChange={e => setOutputProductId(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
              >
                <option value="">Select {outputType}...</option>
                {outputType === 'bundle' ? (
                  state.bundles.map(bundle => (
                    <option key={bundle.id} value={bundle.id}>
                      {bundle.name} ({bundle.sku})
                    </option>
                  ))
                ) : (
                  state.products.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name} ({product.sku})
                    </option>
                  ))
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Quantity to Produce *</label>
              <input
                type="number"
                min="1"
                value={quantityToProduce}
                onChange={e => setQuantityToProduce(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
              />
            </div>
          </div>
        </div>

        {/* Bill of Materials */}
        {outputProductId && outputType === 'bundle' && components.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-white mb-3">Bill of Materials</h3>

            {/* Stock Check Status */}
            <div className={`mb-4 p-3 rounded-lg border ${
              productionStatus.canProduce
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-amber-500/10 border-amber-500/30'
            }`}>
              {productionStatus.canProduce ? (
                <div className="flex items-center gap-2 text-emerald-400">
                  <Check className="w-5 h-5" />
                  <span className="text-sm">
                    Sufficient stock for {formatNumber(parseInt(quantityToProduce) || 0)} units
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-amber-400">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="text-sm">
                    Can only produce {formatNumber(productionStatus.maxProducible)} units with current stock
                  </span>
                </div>
              )}
            </div>

            {/* Components Table */}
            <div className="border border-slate-700 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-800/50">
                  <tr className="text-xs text-slate-400 uppercase tracking-wider">
                    <th className="px-4 py-3 text-left">Component</th>
                    <th className="px-4 py-3 text-left">SKU</th>
                    <th className="px-4 py-3 text-center">Needed</th>
                    <th className="px-4 py-3 text-center">Available</th>
                    <th className="px-4 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {components.map(comp => (
                    <tr
                      key={comp.productId}
                      className={comp.isShort ? 'bg-amber-500/5' : ''}
                    >
                      <td className="px-4 py-3 text-sm text-white">{comp.productName}</td>
                      <td className="px-4 py-3 text-sm text-slate-400 font-mono">{comp.sku}</td>
                      <td className="px-4 py-3 text-sm text-white text-center">
                        {formatNumber(comp.quantityRequired)}
                      </td>
                      <td className="px-4 py-3 text-sm text-center">
                        <span className={comp.isShort ? 'text-amber-400' : 'text-emerald-400'}>
                          {formatNumber(comp.quantityAvailable)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {comp.isShort ? (
                          <span className="text-xs text-amber-400">
                            Short {formatNumber(comp.shortBy)}
                          </span>
                        ) : (
                          <span className="text-xs text-emerald-400">
                            <Check className="w-4 h-4 inline" /> OK
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Product manufacturing note - only show if product has no components */}
        {outputProductId && outputType === 'product' && components.length === 0 && (
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
            <p className="text-sm text-slate-400">
              This product does not have predefined components (BOM).
              To add components, edit the product and add manufacturing components.
            </p>
          </div>
        )}

        {/* Show BOM for products with components */}
        {outputProductId && outputType === 'product' && components.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-white mb-3">Bill of Materials</h3>

            {/* Stock Check Status */}
            <div className={`mb-4 p-3 rounded-lg border ${
              productionStatus.canProduce
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-amber-500/10 border-amber-500/30'
            }`}>
              {productionStatus.canProduce ? (
                <div className="flex items-center gap-2 text-emerald-400">
                  <Check className="w-5 h-5" />
                  <span className="text-sm">
                    Sufficient stock for {formatNumber(parseInt(quantityToProduce) || 0)} units
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-amber-400">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="text-sm">
                    Can only produce {formatNumber(productionStatus.maxProducible)} units with current stock
                  </span>
                </div>
              )}
            </div>

            {/* Components Table */}
            <div className="border border-slate-700 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-800/50">
                  <tr className="text-xs text-slate-400 uppercase tracking-wider">
                    <th className="px-4 py-3 text-left">Component</th>
                    <th className="px-4 py-3 text-left">SKU</th>
                    <th className="px-4 py-3 text-center">Needed</th>
                    <th className="px-4 py-3 text-center">Available</th>
                    <th className="px-4 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {components.map(comp => (
                    <tr
                      key={comp.productId}
                      className={comp.isShort ? 'bg-amber-500/5' : ''}
                    >
                      <td className="px-4 py-3 text-sm text-white">{comp.productName}</td>
                      <td className="px-4 py-3 text-sm text-slate-400 font-mono">{comp.sku}</td>
                      <td className="px-4 py-3 text-sm text-white text-center">
                        {formatNumber(comp.quantityRequired)}
                      </td>
                      <td className="px-4 py-3 text-sm text-center">
                        <span className={comp.isShort ? 'text-amber-400' : 'text-emerald-400'}>
                          {formatNumber(comp.quantityAvailable)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {comp.isShort ? (
                          <span className="text-xs text-amber-400">
                            Short {formatNumber(comp.shortBy)}
                          </span>
                        ) : (
                          <span className="text-xs text-emerald-400">
                            <Check className="w-4 h-4 inline" /> OK
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Schedule */}
        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Due Date (Optional)</label>
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Notes (Optional)</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={2}
            placeholder="Optional notes for this work order..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 resize-none"
          />
        </div>
      </div>
    </Modal>
  );
}

export default CreateWorkOrderModal;
