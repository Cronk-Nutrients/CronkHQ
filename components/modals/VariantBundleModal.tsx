'use client';

import { useState, useEffect, useMemo } from 'react';
import { useApp, Product } from '@/context/AppContext';
import { formatCurrency } from '@/lib/formatting';

interface BundleComponent {
  productId: string;
  variantId?: string;
  productName: string;
  variantTitle?: string;
  sku: string;
  quantity: number;
  cost: number;
}

interface VariantBundleConfig {
  isBundle: boolean;
  bundleType: 'virtual' | 'physical' | 'kit';
  components: BundleComponent[];
  totalComponentCost: number;
  assemblyInstructions?: string;
}

interface VariantBundleModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: any;
  product: Product;
  onSave: (bundleConfig: VariantBundleConfig | null) => void;
}

export function VariantBundleModal({
  isOpen,
  onClose,
  variant,
  product,
  onSave,
}: VariantBundleModalProps) {
  const { state } = useApp();

  // Get existing bundle config from variant
  const existingConfig = (variant as any).bundleConfig as VariantBundleConfig | undefined;

  const [isBundle, setIsBundle] = useState(existingConfig?.isBundle || false);
  const [bundleType, setBundleType] = useState<'virtual' | 'physical' | 'kit'>(
    existingConfig?.bundleType || 'virtual'
  );
  const [components, setComponents] = useState<BundleComponent[]>(
    existingConfig?.components || []
  );
  const [assemblyInstructions, setAssemblyInstructions] = useState(
    existingConfig?.assemblyInstructions || ''
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [showProductSelector, setShowProductSelector] = useState(false);

  // Reset state when variant changes
  useEffect(() => {
    const config = (variant as any).bundleConfig as VariantBundleConfig | undefined;
    setIsBundle(config?.isBundle || false);
    setBundleType(config?.bundleType || 'virtual');
    setComponents(config?.components || []);
    setAssemblyInstructions(config?.assemblyInstructions || '');
  }, [variant]);

  // Filter products for component selection (exclude current product)
  const availableProducts = useMemo(() => {
    return state.products.filter(p => {
      // Exclude current product
      if (p.id === product.id) return false;

      // Search filter
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(search);
        const matchesSku = p.sku?.toLowerCase().includes(search);
        const matchesVariant = p.variants?.some(v =>
          v.sku?.toLowerCase().includes(search) ||
          v.title?.toLowerCase().includes(search)
        );
        return matchesName || matchesSku || matchesVariant;
      }

      return true;
    });
  }, [state.products, product.id, searchTerm]);

  // Calculate total component cost
  const totalComponentCost = useMemo(() => {
    return components.reduce((sum, comp) => sum + (comp.cost * comp.quantity), 0);
  }, [components]);

  // Add component
  const addComponent = (selectedProduct: Product, selectedVariant?: any) => {
    const variantCost = selectedVariant?.cost || (selectedProduct as any).cost || 0;
    const variantSku = selectedVariant?.sku || selectedProduct.sku || '';

    const newComponent: BundleComponent = {
      productId: selectedProduct.id,
      variantId: selectedVariant?.id,
      productName: selectedProduct.name,
      variantTitle: selectedVariant?.title !== 'Default Title' ? selectedVariant?.title : undefined,
      sku: variantSku,
      quantity: 1,
      cost: variantCost,
    };

    // Check if already added
    const existingIndex = components.findIndex(c =>
      c.productId === newComponent.productId &&
      c.variantId === newComponent.variantId
    );

    if (existingIndex >= 0) {
      // Increment quantity
      const updated = [...components];
      updated[existingIndex].quantity += 1;
      setComponents(updated);
    } else {
      setComponents([...components, newComponent]);
    }

    setShowProductSelector(false);
    setSearchTerm('');
  };

  // Update component quantity
  const updateComponentQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeComponent(index);
      return;
    }
    const updated = [...components];
    updated[index].quantity = quantity;
    setComponents(updated);
  };

  // Remove component
  const removeComponent = (index: number) => {
    setComponents(components.filter((_, i) => i !== index));
  };

  // Handle save
  const handleSave = () => {
    if (!isBundle) {
      onSave(null);
    } else {
      onSave({
        isBundle: true,
        bundleType,
        components,
        totalComponentCost,
        assemblyInstructions: assemblyInstructions || undefined,
      });
    }
    onClose();
  };

  // Handle remove bundle config
  const handleRemoveBundle = () => {
    setIsBundle(false);
    setComponents([]);
    onSave(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <i className="fas fa-boxes-packing text-purple-400"></i>
              Configure Bundle
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              {product.name} - {variant.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Enable Bundle Toggle */}
          <div className="bg-slate-900/50 rounded-xl p-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="text-white font-medium">Configure as Bundle</div>
                <div className="text-sm text-slate-400">
                  This variant will be fulfilled using component products
                </div>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isBundle}
                  onChange={(e) => setIsBundle(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-14 h-8 rounded-full transition-colors ${
                  isBundle ? 'bg-purple-500' : 'bg-slate-600'
                }`}>
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                    isBundle ? 'translate-x-7' : 'translate-x-1'
                  }`}></div>
                </div>
              </div>
            </label>
          </div>

          {isBundle && (
            <>
              {/* Bundle Type */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Bundle Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'virtual', label: 'Virtual', icon: 'fa-layer-group', desc: 'Components shipped separately' },
                    { value: 'physical', label: 'Physical', icon: 'fa-box', desc: 'Pre-assembled kit' },
                    { value: 'kit', label: 'FBA Kit', icon: 'fa-boxes-stacked', desc: 'Pre-packed for FBA' },
                  ].map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setBundleType(type.value as any)}
                      className={`p-4 rounded-xl border text-left transition-colors ${
                        bundleType === type.value
                          ? 'bg-purple-500/20 border-purple-500 text-white'
                          : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <i className={`fas ${type.icon} text-lg mb-2 ${
                        bundleType === type.value ? 'text-purple-400' : 'text-slate-500'
                      }`}></i>
                      <div className="font-medium">{type.label}</div>
                      <div className="text-xs text-slate-400 mt-1">{type.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Components */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-slate-300">
                    Bundle Components
                  </label>
                  <button
                    onClick={() => setShowProductSelector(true)}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-sm rounded-lg transition-colors flex items-center gap-2"
                  >
                    <i className="fas fa-plus"></i>
                    Add Component
                  </button>
                </div>

                {components.length === 0 ? (
                  <div className="bg-slate-900/50 border border-dashed border-slate-600 rounded-xl p-8 text-center">
                    <i className="fas fa-box-open text-4xl text-slate-600 mb-3"></i>
                    <p className="text-slate-400">No components added yet</p>
                    <p className="text-sm text-slate-500 mt-1">
                      Add products that make up this bundle
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {components.map((comp, index) => (
                      <div
                        key={`${comp.productId}-${comp.variantId || 'default'}-${index}`}
                        className="bg-slate-900/50 border border-slate-700 rounded-lg p-3 flex items-center gap-4"
                      >
                        <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                          <i className="fas fa-box text-slate-400"></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-white truncate">
                            {comp.productName}
                            {comp.variantTitle && (
                              <span className="text-slate-400 font-normal"> - {comp.variantTitle}</span>
                            )}
                          </div>
                          <div className="text-xs text-slate-400">
                            SKU: {comp.sku || 'N/A'} | Cost: {formatCurrency(comp.cost)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateComponentQuantity(index, comp.quantity - 1)}
                            className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
                          >
                            <i className="fas fa-minus text-xs"></i>
                          </button>
                          <input
                            type="number"
                            value={comp.quantity}
                            onChange={(e) => updateComponentQuantity(index, parseInt(e.target.value) || 0)}
                            className="w-16 bg-slate-800 border border-slate-600 rounded-lg px-2 py-1 text-center text-white"
                            min="1"
                          />
                          <button
                            onClick={() => updateComponentQuantity(index, comp.quantity + 1)}
                            className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
                          >
                            <i className="fas fa-plus text-xs"></i>
                          </button>
                        </div>
                        <div className="text-right w-24">
                          <div className="text-white font-medium">
                            {formatCurrency(comp.cost * comp.quantity)}
                          </div>
                        </div>
                        <button
                          onClick={() => removeComponent(index)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    ))}

                    {/* Total */}
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <div className="text-purple-300 font-medium">Total Component Cost</div>
                        <div className="text-xs text-slate-400">
                          {components.length} component{components.length !== 1 ? 's' : ''} |
                          {components.reduce((sum, c) => sum + c.quantity, 0)} total items
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-purple-400">
                        {formatCurrency(totalComponentCost)}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Assembly Instructions */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Assembly Instructions (Optional)
                </label>
                <textarea
                  value={assemblyInstructions}
                  onChange={(e) => setAssemblyInstructions(e.target.value)}
                  placeholder="Special packing instructions for this bundle..."
                  rows={3}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-700 flex items-center justify-between bg-slate-800/50">
          <div>
            {existingConfig?.isBundle && (
              <button
                onClick={handleRemoveBundle}
                className="px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <i className="fas fa-unlink mr-2"></i>
                Remove Bundle Config
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isBundle && components.length === 0}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isBundle ? 'Save Bundle Config' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Product Selector Modal */}
        {showProductSelector && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-8">
            <div className="bg-slate-800 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col border border-slate-700">
              <div className="px-5 py-4 border-b border-slate-700 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Select Component Product</h3>
                <button
                  onClick={() => {
                    setShowProductSelector(false);
                    setSearchTerm('');
                  }}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="p-4 border-b border-slate-700">
                <div className="relative">
                  <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products by name or SKU..."
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    autoFocus
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                  {availableProducts.slice(0, 50).map((p) => {
                    const hasVariants = p.variants && p.variants.length > 1;

                    return (
                      <div key={p.id} className="bg-slate-900/50 border border-slate-700 rounded-lg overflow-hidden">
                        {!hasVariants ? (
                          // Single product - click to add
                          <button
                            onClick={() => addComponent(p)}
                            className="w-full p-3 flex items-center gap-3 hover:bg-slate-700/50 transition-colors text-left"
                          >
                            <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                              {(p as any).thumbnail || (p as any).imageUrl ? (
                                <img
                                  src={(p as any).thumbnail || (p as any).imageUrl}
                                  alt={p.name}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              ) : (
                                <i className="fas fa-box text-slate-400"></i>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-white truncate">{p.name}</div>
                              <div className="text-xs text-slate-400">
                                SKU: {p.sku || 'N/A'} | Cost: {formatCurrency((p as any).cost || 0)}
                              </div>
                            </div>
                            <i className="fas fa-plus text-purple-400"></i>
                          </button>
                        ) : (
                          // Product with variants - expand to select variant
                          <div>
                            <div className="p-3 flex items-center gap-3 border-b border-slate-700/50">
                              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                                <i className="fas fa-box text-slate-400"></i>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-white truncate">{p.name}</div>
                                <div className="text-xs text-slate-400">
                                  {p.variants?.length} variants
                                </div>
                              </div>
                            </div>
                            <div className="pl-12 pr-3 py-2 space-y-1 bg-slate-800/50">
                              {p.variants?.map((v, vIndex) => (
                                <button
                                  key={v.id || vIndex}
                                  onClick={() => addComponent(p, v)}
                                  className="w-full p-2 flex items-center gap-3 hover:bg-slate-700/50 rounded-lg transition-colors text-left"
                                >
                                  <div className="flex-1 min-w-0">
                                    <div className="text-sm text-white">{v.title}</div>
                                    <div className="text-xs text-slate-400">
                                      SKU: {v.sku || 'N/A'} | Cost: {formatCurrency((v as any).cost || 0)}
                                    </div>
                                  </div>
                                  <i className="fas fa-plus text-purple-400 text-sm"></i>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {availableProducts.length === 0 && (
                    <div className="text-center py-8 text-slate-400">
                      <i className="fas fa-search text-3xl mb-3 opacity-50"></i>
                      <p>No products found</p>
                    </div>
                  )}

                  {availableProducts.length > 50 && (
                    <div className="text-center py-4 text-sm text-slate-400">
                      Showing first 50 results. Use search to find more.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VariantBundleModal;
