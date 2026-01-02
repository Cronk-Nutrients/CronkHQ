'use client';

import { useState, useMemo } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useApp, Supplier, ProductSupplier } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/formatting';
import { Search, Package, Check, Star } from 'lucide-react';

interface AssignProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplier: Supplier;
}

interface ProductDetail {
  supplierSku: string;
  unitCost: number;
  isPrimary: boolean;
}

export function AssignProductsModal({ isOpen, onClose, supplier }: AssignProductsModalProps) {
  const { state, dispatch } = useApp();
  const { success } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [productDetails, setProductDetails] = useState<Record<string, ProductDetail>>({});

  // Get already assigned products
  const assignedProductIds = useMemo(() => {
    return new Set(
      state.productSuppliers
        .filter(ps => ps.supplierId === supplier.id)
        .map(ps => ps.productId)
    );
  }, [state.productSuppliers, supplier.id]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return state.products.filter(product => {
      // Exclude already assigned products
      if (assignedProductIds.has(product.id)) return false;

      // Search filter
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.sku.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [state.products, searchTerm, assignedProductIds]);

  // Toggle product selection
  const toggleProduct = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
      const newDetails = { ...productDetails };
      delete newDetails[productId];
      setProductDetails(newDetails);
    } else {
      newSelected.add(productId);
      const product = state.products.find(p => p.id === productId);
      setProductDetails(prev => ({
        ...prev,
        [productId]: {
          supplierSku: '',
          unitCost: product?.cost.rolling || 0,
          isPrimary: !product?.primarySupplierId,
        }
      }));
    }
    setSelectedProducts(newSelected);
  };

  // Update product detail
  const updateProductDetail = (productId: string, field: keyof ProductDetail, value: string | number | boolean) => {
    setProductDetails(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      }
    }));
  };

  // Handle save
  const handleSave = () => {
    selectedProducts.forEach(productId => {
      const details = productDetails[productId];
      const product = state.products.find(p => p.id === productId);

      const productSupplier: ProductSupplier = {
        productId,
        supplierId: supplier.id,
        supplierSku: details.supplierSku || undefined,
        unitCost: details.unitCost,
        currency: supplier.currency,
        isPrimary: details.isPrimary,
      };

      dispatch({ type: 'ADD_PRODUCT_SUPPLIER', payload: productSupplier });

      // Update product's primarySupplierId if this is primary
      if (details.isPrimary && product) {
        dispatch({
          type: 'UPDATE_PRODUCT',
          payload: { ...product, primarySupplierId: supplier.id, updatedAt: new Date() }
        });
      }
    });

    success(`${selectedProducts.size} product(s) assigned to ${supplier.name}`);
    setSelectedProducts(new Set());
    setProductDetails({});
    setSearchTerm('');
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Assign Products"
      subtitle={`Add products to ${supplier.name}`}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={selectedProducts.size === 0}>
            Assign {selectedProducts.size} Product{selectedProducts.size !== 1 ? 's' : ''}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products by name or SKU..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        {/* Products List */}
        <div className="max-h-96 overflow-y-auto space-y-2">
          {filteredProducts.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <Package className="w-8 h-8 mx-auto mb-2" />
              <p>No products found</p>
            </div>
          ) : (
            filteredProducts.map(product => {
              const isSelected = selectedProducts.has(product.id);
              const details = productDetails[product.id];

              return (
                <div
                  key={product.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50'
                  }`}
                  onClick={() => toggleProduct(product.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                        isSelected
                          ? 'bg-emerald-500 border-emerald-500'
                          : 'border-slate-600'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div>
                        <div className="text-white font-medium">{product.name}</div>
                        <div className="text-sm text-slate-400 font-mono">{product.sku}</div>
                      </div>
                    </div>
                    {product.primarySupplierId && (
                      <span className="text-xs text-slate-500">Has primary supplier</span>
                    )}
                  </div>

                  {/* Expanded details when selected */}
                  {isSelected && details && (
                    <div
                      className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-slate-700/50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Supplier SKU</label>
                        <input
                          type="text"
                          value={details.supplierSku}
                          onChange={(e) => updateProductDetail(product.id, 'supplierSku', e.target.value)}
                          placeholder="Optional"
                          className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1.5 text-sm text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Unit Cost ({supplier.currency})</label>
                        <input
                          type="number"
                          value={details.unitCost}
                          onChange={(e) => updateProductDetail(product.id, 'unitCost', parseFloat(e.target.value) || 0)}
                          step="0.01"
                          min="0"
                          className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1.5 text-sm text-white"
                        />
                      </div>
                      <div className="flex items-end pb-1">
                        <label className="flex items-center gap-2 text-xs cursor-pointer">
                          <input
                            type="checkbox"
                            checked={details.isPrimary}
                            onChange={(e) => updateProductDetail(product.id, 'isPrimary', e.target.checked)}
                            className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-emerald-500"
                          />
                          <span className="text-slate-300 flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-400" />
                            Primary Supplier
                          </span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Selected count */}
        {selectedProducts.size > 0 && (
          <div className="text-sm text-slate-400 text-center">
            {selectedProducts.size} product{selectedProducts.size !== 1 ? 's' : ''} selected
          </div>
        )}
      </div>
    </Modal>
  );
}

export default AssignProductsModal;
