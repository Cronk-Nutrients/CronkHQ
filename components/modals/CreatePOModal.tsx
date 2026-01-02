'use client';

import { useState, useEffect, useMemo } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useApp, PurchaseOrder, PurchaseOrderItem } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { formatCurrency, formatCurrencyPrecise, formatNumber } from '@/lib/formatting';
import { Search, Plus, Trash2, Package } from 'lucide-react';

interface CreatePOModalProps {
  isOpen: boolean;
  onClose: () => void;
  editPO?: PurchaseOrder | null;
  initialItems?: PurchaseOrderItem[];
}

export function CreatePOModal({ isOpen, onClose, editPO, initialItems }: CreatePOModalProps) {
  const { state, dispatch } = useApp();
  const { success, error } = useToast();

  // Form state
  const [poNumber, setPoNumber] = useState('');
  const [supplier, setSupplier] = useState('');
  const [currency, setCurrency] = useState<'USD' | 'CAD'>('USD');
  const [expectedDate, setExpectedDate] = useState('');
  const [notes, setNotes] = useState('');
  const [shippingCost, setShippingCost] = useState('0');
  const [lineItems, setLineItems] = useState<PurchaseOrderItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Product search state
  const [productSearch, setProductSearch] = useState('');
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [supplierSearch, setSupplierSearch] = useState('');
  const [showSupplierDropdown, setShowSupplierDropdown] = useState(false);

  const isEditing = !!editPO;

  // Generate PO number
  const generatePONumber = () => {
    const count = state.purchaseOrders.length + 1;
    return `PO-${new Date().getFullYear()}-${count.toString().padStart(4, '0')}`;
  };

  // Get unique suppliers from existing POs
  const existingSuppliers = useMemo(() => {
    const suppliers = new Set<string>();
    state.purchaseOrders.forEach(po => {
      if (po.supplier) suppliers.add(po.supplier);
    });
    // Add from products default vendors
    state.products.forEach(p => {
      if (p.supplier) suppliers.add(p.supplier);
    });
    return Array.from(suppliers).sort();
  }, [state.purchaseOrders, state.products]);

  // Filter suppliers for autocomplete
  const filteredSuppliers = useMemo(() => {
    if (!supplierSearch.trim()) return existingSuppliers.slice(0, 5);
    const search = supplierSearch.toLowerCase();
    return existingSuppliers.filter(s => s.toLowerCase().includes(search)).slice(0, 5);
  }, [supplierSearch, existingSuppliers]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      if (editPO) {
        setPoNumber(editPO.poNumber);
        setSupplier(editPO.supplier);
        setCurrency(editPO.currency);
        setExpectedDate(editPO.expectedDate ? new Date(editPO.expectedDate).toISOString().split('T')[0] : '');
        setNotes(editPO.notes || '');
        setShippingCost(editPO.shipping.toString());
        setLineItems([...editPO.items]);
      } else {
        setPoNumber(generatePONumber());
        setSupplier('');
        setCurrency('USD');
        setExpectedDate('');
        setNotes('');
        setShippingCost('0');
        setLineItems(initialItems || []);
      }
      setProductSearch('');
      setSupplierSearch('');
    }
  }, [isOpen, editPO, initialItems]);

  // Get product stock
  const getProductStock = (productId: string) => {
    return state.inventory
      .filter(i => i.productId === productId)
      .reduce((sum, i) => sum + i.quantity, 0);
  };

  // Filter products for search
  const filteredProducts = useMemo(() => {
    if (!productSearch.trim()) return [];
    const search = productSearch.toLowerCase();
    return state.products
      .filter(p =>
        (p.name.toLowerCase().includes(search) || p.sku.toLowerCase().includes(search)) &&
        !lineItems.some(item => item.productId === p.id)
      )
      .slice(0, 8);
  }, [productSearch, state.products, lineItems]);

  // Calculate totals
  const totals = useMemo(() => {
    const subtotal = lineItems.reduce((sum, item) => sum + (item.quantity * item.unitCost), 0);
    const shipping = parseFloat(shippingCost) || 0;
    return {
      subtotal,
      shipping,
      total: subtotal + shipping,
      itemCount: lineItems.length,
      unitCount: lineItems.reduce((sum, item) => sum + item.quantity, 0),
    };
  }, [lineItems, shippingCost]);

  // Add line item
  const addLineItem = (productId: string) => {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    setLineItems(prev => [
      ...prev,
      {
        productId: product.id,
        productName: product.name,
        sku: product.sku,
        quantity: 1,
        receivedQty: 0,
        unitCost: product.cost.rolling,
      }
    ]);
    setProductSearch('');
    setShowProductDropdown(false);
  };

  // Remove line item
  const removeLineItem = (productId: string) => {
    setLineItems(prev => prev.filter(item => item.productId !== productId));
  };

  // Update line item
  const updateLineItem = (productId: string, field: 'quantity' | 'unitCost', value: number) => {
    if (value < 0) return;
    setLineItems(prev => prev.map(item =>
      item.productId === productId ? { ...item, [field]: value } : item
    ));
  };

  // Validation
  const isValid = useMemo(() => {
    if (!poNumber.trim()) return false;
    if (!supplier.trim()) return false;
    if (lineItems.length === 0) return false;
    if (lineItems.some(item => item.quantity <= 0 || item.unitCost < 0)) return false;
    return true;
  }, [poNumber, supplier, lineItems]);

  // Save as draft
  const handleSaveDraft = () => {
    if (!isValid) return;

    setIsSubmitting(true);

    try {
      const poData: PurchaseOrder = {
        id: editPO?.id || crypto.randomUUID(),
        poNumber: poNumber.trim(),
        supplier: supplier.trim(),
        status: 'draft',
        currency,
        expectedDate: expectedDate ? new Date(expectedDate) : undefined,
        items: lineItems,
        subtotal: totals.subtotal,
        shipping: totals.shipping,
        total: totals.total,
        notes: notes.trim() || undefined,
        createdAt: editPO?.createdAt || new Date(),
        updatedAt: new Date(),
      };

      if (isEditing) {
        dispatch({ type: 'UPDATE_PURCHASE_ORDER', payload: poData });
        success(`PO ${poNumber} updated successfully`);
      } else {
        dispatch({ type: 'ADD_PURCHASE_ORDER', payload: poData });
        success(`PO ${poNumber} saved as draft`);
      }

      onClose();
    } catch (err) {
      error('Failed to save purchase order');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Save and send
  const handleSaveAndSend = () => {
    if (!isValid) return;

    setIsSubmitting(true);

    try {
      const poData: PurchaseOrder = {
        id: editPO?.id || crypto.randomUUID(),
        poNumber: poNumber.trim(),
        supplier: supplier.trim(),
        status: 'sent',
        currency,
        expectedDate: expectedDate ? new Date(expectedDate) : undefined,
        items: lineItems,
        subtotal: totals.subtotal,
        shipping: totals.shipping,
        total: totals.total,
        notes: notes.trim() || undefined,
        createdAt: editPO?.createdAt || new Date(),
        updatedAt: new Date(),
      };

      if (isEditing) {
        dispatch({ type: 'UPDATE_PURCHASE_ORDER', payload: poData });
      } else {
        dispatch({ type: 'ADD_PURCHASE_ORDER', payload: poData });
      }
      success(`PO ${poNumber} created and marked as sent`);

      onClose();
    } catch (err) {
      error('Failed to create purchase order');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Purchase Order' : 'Create Purchase Order'}
      subtitle={isEditing ? `Editing ${editPO?.poNumber}` : 'Order inventory from suppliers'}
      size="xl"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={handleSaveDraft} disabled={isSubmitting || !isValid}>
            Save as Draft
          </Button>
          <Button onClick={handleSaveAndSend} disabled={isSubmitting || !isValid}>
            {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Create & Send'}
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* PO Header */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">PO Details</h3>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">PO Number *</label>
              <input
                type="text"
                value={poNumber}
                onChange={e => setPoNumber(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white font-mono focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div className="relative">
              <label className="block text-sm text-slate-400 mb-1.5">Supplier *</label>
              <input
                type="text"
                value={supplier}
                onChange={e => {
                  setSupplier(e.target.value);
                  setSupplierSearch(e.target.value);
                  setShowSupplierDropdown(true);
                }}
                onFocus={() => setShowSupplierDropdown(true)}
                onBlur={() => setTimeout(() => setShowSupplierDropdown(false), 200)}
                placeholder="Enter supplier name"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
              {showSupplierDropdown && filteredSuppliers.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-lg max-h-40 overflow-auto">
                  {filteredSuppliers.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setSupplier(s);
                        setShowSupplierDropdown(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-white hover:bg-slate-700/50"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Currency</label>
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value as 'USD' | 'CAD')}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
              >
                <option value="USD">USD ($)</option>
                <option value="CAD">CAD (C$)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Expected Date</label>
              <input
                type="date"
                value={expectedDate}
                onChange={e => setExpectedDate(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
              />
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Line Items *</h3>

          {/* Add Product */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={productSearch}
              onChange={e => {
                setProductSearch(e.target.value);
                setShowProductDropdown(true);
              }}
              onFocus={() => setShowProductDropdown(true)}
              placeholder="Search products by name or SKU..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
            />

            {showProductDropdown && filteredProducts.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-lg max-h-48 overflow-auto">
                {filteredProducts.map(product => {
                  const stock = getProductStock(product.id);
                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => addLineItem(product.id)}
                      className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-slate-700/50 text-left"
                    >
                      <div>
                        <div className="text-sm text-white">{product.name}</div>
                        <div className="text-xs text-slate-400">SKU: {product.sku}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-300">{formatCurrencyPrecise(product.cost.rolling)}</div>
                        <div className={`text-xs ${stock <= product.reorderPoint ? 'text-amber-400' : 'text-slate-400'}`}>
                          {formatNumber(stock)} in stock
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Line Items Table */}
          {lineItems.length > 0 ? (
            <div className="border border-slate-700 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-800/50">
                  <tr className="text-xs text-slate-400 uppercase tracking-wider">
                    <th className="px-4 py-3 text-left">Product</th>
                    <th className="px-4 py-3 text-left">SKU</th>
                    <th className="px-4 py-3 text-center">Qty</th>
                    <th className="px-4 py-3 text-right">Unit Cost</th>
                    <th className="px-4 py-3 text-right">Line Total</th>
                    <th className="px-4 py-3 text-center w-12"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {lineItems.map(item => (
                    <tr key={item.productId} className="hover:bg-slate-800/30">
                      <td className="px-4 py-3 text-sm text-white">{item.productName}</td>
                      <td className="px-4 py-3 text-sm text-slate-400 font-mono">{item.sku}</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={e => updateLineItem(item.productId, 'quantity', parseInt(e.target.value) || 0)}
                          className="w-20 mx-auto block bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white text-center text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <span className="text-slate-400 text-sm">$</span>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={item.unitCost}
                            onChange={e => updateLineItem(item.productId, 'unitCost', parseFloat(e.target.value) || 0)}
                            className="w-24 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white text-right text-sm"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-white text-right font-medium">
                        {formatCurrencyPrecise(item.quantity * item.unitCost)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => removeLineItem(item.productId)}
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 border-2 border-dashed border-slate-700 rounded-lg text-center text-slate-400">
              <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No items added yet</p>
              <p className="text-xs text-slate-500">Search for products above to add them</p>
            </div>
          )}
        </div>

        {/* Totals */}
        {lineItems.length > 0 && (
          <div className="flex justify-end">
            <div className="w-72 space-y-2 bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Items:</span>
                <span className="text-white">{totals.itemCount} ({formatNumber(totals.unitCount)} units)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Subtotal:</span>
                <span className="text-white">{formatCurrencyPrecise(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Shipping:</span>
                <div className="flex items-center gap-1">
                  <span className="text-slate-400">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={shippingCost}
                    onChange={e => setShippingCost(e.target.value)}
                    className="w-24 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white text-right text-sm"
                  />
                </div>
              </div>
              <div className="pt-2 border-t border-slate-700 flex justify-between">
                <span className="text-white font-medium">Total:</span>
                <span className="text-white font-bold text-lg">{formatCurrencyPrecise(totals.total)}</span>
              </div>
              {currency === 'CAD' && (
                <div className="text-xs text-slate-500 text-right">
                  CAD values will be converted at current exchange rate
                </div>
              )}
            </div>
          </div>
        )}

        {/* Notes */}
        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Notes (Optional)</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={2}
            placeholder="Optional notes for this PO..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 resize-none"
          />
        </div>
      </div>
    </Modal>
  );
}

export default CreatePOModal;
