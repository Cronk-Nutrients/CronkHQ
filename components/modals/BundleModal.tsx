'use client';

import { useState, useEffect, useMemo } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useApp, Bundle, BundleComponent } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { formatCurrency, formatNumber } from '@/lib/formatting';

interface BundleModalProps {
  isOpen: boolean;
  onClose: () => void;
  editBundle?: Bundle | null;
}

type BundleType = 'virtual' | 'physical' | 'fba_kit';

export function BundleModal({ isOpen, onClose, editBundle }: BundleModalProps) {
  const { state, dispatch } = useApp();
  const { success, error, warning } = useToast();

  // Form state
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [bundleType, setBundleType] = useState<BundleType>('virtual');
  const [description, setDescription] = useState('');
  const [priceMSRP, setPriceMSRP] = useState('');
  const [priceShopify, setPriceShopify] = useState('');
  const [priceAmazon, setPriceAmazon] = useState('');
  const [assemblyInstructions, setAssemblyInstructions] = useState('');
  const [components, setComponents] = useState<BundleComponent[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pricing mode: 'manual' or 'discount'
  const [pricingMode, setPricingMode] = useState<'manual' | 'discount'>('discount');
  const [discountPercent, setDiscountPercent] = useState('10');

  // Compare At Prices (calculated from component prices - what it would cost to buy separately)
  const [compareAtShopify, setCompareAtShopify] = useState('');
  const [compareAtAmazon, setCompareAtAmazon] = useState('');

  // Amazon markup percentage (increases Amazon prices by this %)
  const [amazonMarkupPercent, setAmazonMarkupPercent] = useState('15');

  // Product search state
  const [productSearch, setProductSearch] = useState('');
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [componentQty, setComponentQty] = useState('1');

  const isEditing = !!editBundle;

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      if (editBundle) {
        setName(editBundle.name);
        setSku(editBundle.sku);
        setBundleType(editBundle.type);
        setDescription(editBundle.description || '');
        setPriceMSRP(editBundle.prices.msrp.toString());
        setPriceShopify(editBundle.prices.shopify.toString());
        setPriceAmazon(editBundle.prices.amazon.toString());
        setAssemblyInstructions(editBundle.assemblyInstructions || '');
        setComponents([...editBundle.components]);
        // Set compare at prices if available
        setCompareAtShopify(editBundle.compareAtPrices?.shopify?.toString() || '');
        setCompareAtAmazon(editBundle.compareAtPrices?.amazon?.toString() || '');
        // Set pricing mode to manual when editing (since we have specific prices)
        setPricingMode('manual');
        setDiscountPercent('10');
        setAmazonMarkupPercent('15');
      } else {
        setName('');
        setSku('');
        setBundleType('virtual');
        setDescription('');
        setPriceMSRP('');
        setPriceShopify('');
        setPriceAmazon('');
        setCompareAtShopify('');
        setCompareAtAmazon('');
        setAmazonMarkupPercent('15');
        setAssemblyInstructions('');
        setComponents([]);
        setPricingMode('discount');
        setDiscountPercent('10');
      }
      setProductSearch('');
      setComponentQty('1');
    }
  }, [isOpen, editBundle]);

  // Get total stock for a product
  const getProductStock = (productId: string) => {
    return state.inventory
      .filter(i => i.productId === productId)
      .reduce((sum, i) => sum + i.quantity, 0);
  };

  // Helper to round to 2 decimal places (avoids floating point issues like 8.99 * 3 = 26.970000000002)
  const roundPrice = (num: number) => Math.round(num * 100) / 100;

  // Calculate bundle metrics
  const bundleMetrics = useMemo(() => {
    const cost = roundPrice(components.reduce((sum, c) => {
      const product = state.products.find(p => p.id === c.productId);
      return sum + (product?.cost.rolling || 0) * c.quantity;
    }, 0));

    // Calculate Compare At Price (MSRP) - sum of component MSRPs
    const compareAtMSRP = roundPrice(components.reduce((sum, c) => {
      const product = state.products.find(p => p.id === c.productId);
      return sum + (product?.prices.msrp || 0) * c.quantity;
    }, 0));

    // Calculate Compare At Price (Shopify) - sum of component Shopify prices
    const calcCompareAtShopify = roundPrice(components.reduce((sum, c) => {
      const product = state.products.find(p => p.id === c.productId);
      return sum + (product?.prices.shopify || product?.prices.msrp || 0) * c.quantity;
    }, 0));

    // Calculate Compare At Price (Amazon) - sum of component Amazon prices
    const calcCompareAtAmazon = roundPrice(components.reduce((sum, c) => {
      const product = state.products.find(p => p.id === c.productId);
      return sum + (product?.prices.amazon || product?.prices.msrp || 0) * c.quantity;
    }, 0));

    const msrp = parseFloat(priceMSRP) || 0;
    const margin = msrp > 0 ? roundPrice(((msrp - cost) / msrp) * 100) : 0;

    // Calculate savings from separate purchase (based on Shopify prices since that's the primary channel)
    const savings = roundPrice(calcCompareAtShopify - msrp);
    const savingsPercent = calcCompareAtShopify > 0 ? roundPrice((savings / calcCompareAtShopify) * 100) : 0;

    // Available quantity = MIN of (component stock / qty needed)
    const availableQty = components.length > 0
      ? Math.min(
          ...components.map(c => {
            const stock = getProductStock(c.productId);
            return Math.floor(stock / c.quantity);
          })
        )
      : 0;

    // Find limiting component
    let limitingComponent = '';
    if (components.length > 0) {
      let minAvailable = Infinity;
      components.forEach(c => {
        const stock = getProductStock(c.productId);
        const canBuild = Math.floor(stock / c.quantity);
        if (canBuild < minAvailable) {
          minAvailable = canBuild;
          limitingComponent = c.productName;
        }
      });
    }

    return {
      cost,
      margin,
      availableQty,
      limitingComponent,
      compareAtMSRP,
      calcCompareAtShopify,
      calcCompareAtAmazon,
      savings,
      savingsPercent
    };
  }, [components, priceMSRP, state.products, state.inventory]);

  // Auto-calculate bundle price (MSRP) when in discount mode - based on Shopify prices
  useEffect(() => {
    if (pricingMode === 'discount' && bundleMetrics.calcCompareAtShopify > 0) {
      const discount = parseFloat(discountPercent) || 0;
      const bundlePrice = roundPrice(bundleMetrics.calcCompareAtShopify * (1 - discount / 100));
      setPriceMSRP(bundlePrice.toFixed(2));
    }
  }, [pricingMode, discountPercent, bundleMetrics.calcCompareAtShopify]);

  // Auto-set Shopify prices using Shopify component prices
  useEffect(() => {
    // Shopify Compare At Price = sum of component Shopify prices (e.g., 3 × $8.99 = $26.97)
    if (bundleMetrics.calcCompareAtShopify > 0) {
      setCompareAtShopify(bundleMetrics.calcCompareAtShopify.toFixed(2));
    }
    // Shopify Current Price = discounted bundle price based on Shopify compare at
    if (pricingMode === 'discount' && bundleMetrics.calcCompareAtShopify > 0) {
      const discount = parseFloat(discountPercent) || 0;
      const shopifyCurrentPrice = roundPrice(bundleMetrics.calcCompareAtShopify * (1 - discount / 100));
      setPriceShopify(shopifyCurrentPrice.toFixed(2));
    }
  }, [bundleMetrics.calcCompareAtShopify, pricingMode, discountPercent]);

  // Auto-set Amazon prices using Amazon component prices + markup
  useEffect(() => {
    const markup = parseFloat(amazonMarkupPercent) || 0;

    // Amazon Compare At Price = sum of component Amazon prices + markup
    if (bundleMetrics.calcCompareAtAmazon > 0) {
      const amazonCompareAt = roundPrice(bundleMetrics.calcCompareAtAmazon * (1 + markup / 100));
      setCompareAtAmazon(amazonCompareAt.toFixed(2));
    }

    // Amazon Current Price = discounted Amazon price + markup
    if (pricingMode === 'discount' && bundleMetrics.calcCompareAtAmazon > 0) {
      const discount = parseFloat(discountPercent) || 0;
      const amazonBasePrice = bundleMetrics.calcCompareAtAmazon * (1 - discount / 100);
      const amazonPrice = roundPrice(amazonBasePrice * (1 + markup / 100));
      setPriceAmazon(amazonPrice.toFixed(2));
    }
  }, [bundleMetrics.calcCompareAtAmazon, pricingMode, discountPercent, amazonMarkupPercent]);

  // Filter products for search
  const filteredProducts = useMemo(() => {
    if (!productSearch.trim()) return [];
    const search = productSearch.toLowerCase();
    return state.products
      .filter(p =>
        (p.name.toLowerCase().includes(search) || p.sku.toLowerCase().includes(search)) &&
        !components.some(c => c.productId === p.id)
      )
      .slice(0, 8);
  }, [productSearch, state.products, components]);

  // Generate SKU
  const generateSku = () => {
    const typePrefix = bundleType === 'virtual' ? 'VIR' : bundleType === 'physical' ? 'PHY' : 'FBA';
    const randomNum = Math.floor(Math.random() * 900) + 100;
    setSku(`BND-${typePrefix}-${randomNum}`);
  };

  // Add component
  const addComponent = (productId: string) => {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const qty = parseInt(componentQty) || 1;
    setComponents(prev => [
      ...prev,
      {
        productId: product.id,
        productName: product.name,
        quantity: qty,
      }
    ]);
    setProductSearch('');
    setComponentQty('1');
    setShowProductDropdown(false);
  };

  // Remove component
  const removeComponent = (productId: string) => {
    setComponents(prev => prev.filter(c => c.productId !== productId));
  };

  // Update component quantity
  const updateComponentQty = (productId: string, qty: number) => {
    if (qty < 1) return;
    setComponents(prev => prev.map(c =>
      c.productId === productId ? { ...c, quantity: qty } : c
    ));
  };

  // Validation
  const isValid = useMemo(() => {
    if (!name.trim()) return false;
    if (!sku.trim()) return false;
    if (!bundleType) return false;
    if (!priceMSRP || parseFloat(priceMSRP) <= 0) return false;
    if (components.length === 0) return false;

    // Check for duplicate SKU
    const existingSku = state.bundles.find(b =>
      b.sku.toLowerCase() === sku.toLowerCase() && b.id !== editBundle?.id
    );
    if (existingSku) return false;

    return true;
  }, [name, sku, bundleType, priceMSRP, components, state.bundles, editBundle]);

  // Submit handler
  const handleSubmit = () => {
    if (!isValid) return;

    setIsSubmitting(true);

    try {
      const msrp = parseFloat(priceMSRP) || 0;
      const bundleData: Bundle = {
        id: editBundle?.id || crypto.randomUUID(),
        name: name.trim(),
        sku: sku.trim().toUpperCase(),
        type: bundleType,
        description: description.trim() || undefined,
        prices: {
          msrp,
          shopify: parseFloat(priceShopify) || msrp,
          amazon: parseFloat(priceAmazon) || msrp,
          wholesale: msrp * 0.6,
        },
        compareAtPrices: {
          msrp: bundleMetrics.compareAtMSRP,
          shopify: parseFloat(compareAtShopify) || bundleMetrics.calcCompareAtShopify,
          amazon: parseFloat(compareAtAmazon) || bundleMetrics.calcCompareAtAmazon,
        },
        components,
        assemblyInstructions: bundleType !== 'virtual' ? assemblyInstructions.trim() || undefined : undefined,
        createdAt: editBundle?.createdAt || new Date(),
        updatedAt: new Date(),
      };

      if (isEditing) {
        dispatch({ type: 'UPDATE_BUNDLE', payload: bundleData });
        success(`Bundle "${name}" updated successfully!`);
      } else {
        dispatch({ type: 'ADD_BUNDLE', payload: bundleData });
        success(`Bundle "${name}" created successfully!`);
      }

      onClose();
    } catch (err) {
      error('Failed to save bundle. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Bundle' : 'Create Bundle'}
      subtitle={isEditing ? `Editing ${editBundle?.name}` : 'Define a new product bundle'}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || !isValid}>
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Saving...
              </>
            ) : isEditing ? (
              'Save Changes'
            ) : (
              <>
                <i className="fas fa-plus mr-2"></i>
                Create Bundle
              </>
            )}
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Basic Info Section */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Basic Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Bundle Name *</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g., Starter Kit"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Bundle SKU *</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={sku}
                  onChange={e => setSku(e.target.value)}
                  placeholder="e.g., BND-VIR-001"
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                />
                <button
                  type="button"
                  onClick={generateSku}
                  className="px-3 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm whitespace-nowrap"
                >
                  <i className="fas fa-magic mr-1"></i>
                  Generate
                </button>
              </div>
            </div>
          </div>

          {/* Bundle Type */}
          <div className="mt-4">
            <label className="block text-sm text-slate-400 mb-1.5">Bundle Type *</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setBundleType('virtual')}
                className={`p-3 rounded-lg border transition-colors text-left ${
                  bundleType === 'virtual'
                    ? 'bg-blue-500/20 border-blue-500/30 text-blue-400'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <i className="fas fa-cloud"></i>
                  <span className="font-medium">Virtual</span>
                </div>
                <div className="text-xs opacity-70">Components deducted on sale</div>
              </button>
              <button
                type="button"
                onClick={() => setBundleType('physical')}
                className={`p-3 rounded-lg border transition-colors text-left ${
                  bundleType === 'physical'
                    ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <i className="fas fa-box"></i>
                  <span className="font-medium">Physical</span>
                </div>
                <div className="text-xs opacity-70">Pre-assembled, tracked as unit</div>
              </button>
              <button
                type="button"
                onClick={() => setBundleType('fba_kit')}
                className={`p-3 rounded-lg border transition-colors text-left ${
                  bundleType === 'fba_kit'
                    ? 'bg-orange-500/20 border-orange-500/30 text-orange-400'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <i className="fab fa-amazon"></i>
                  <span className="font-medium">FBA Kit</span>
                </div>
                <div className="text-xs opacity-70">Pre-assembled for Amazon FBA</div>
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mt-4">
            <label className="block text-sm text-slate-400 mb-1.5">Description (Optional)</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={2}
              placeholder="Brief description of the bundle..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 resize-none"
            />
          </div>
        </div>

        {/* Pricing Section */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Pricing</h3>

          {/* Compare At Price Banner */}
          {components.length > 0 && bundleMetrics.calcCompareAtShopify > 0 && (
            <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <i className="fas fa-tags text-blue-400"></i>
                  <span className="text-sm text-slate-300">Compare At Price:</span>
                </div>
                <span className="text-lg font-bold text-blue-400">{formatCurrency(bundleMetrics.calcCompareAtShopify)}</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Total if items purchased separately. Updates Shopify&apos;s compare_at_price field.
              </div>
              {parseFloat(priceMSRP) > 0 && bundleMetrics.savings > 0 && (
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-slate-400">Customer saves:</span>
                  <span className="text-emerald-400 font-medium">
                    {formatCurrency(bundleMetrics.savings)} ({bundleMetrics.savingsPercent.toFixed(0)}% off)
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Pricing Mode Toggle */}
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setPricingMode('discount')}
              className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pricingMode === 'discount'
                  ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400'
                  : 'bg-slate-800 border border-slate-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              <i className="fas fa-percent mr-2"></i>
              Set by Discount %
            </button>
            <button
              type="button"
              onClick={() => setPricingMode('manual')}
              className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pricingMode === 'manual'
                  ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400'
                  : 'bg-slate-800 border border-slate-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              <i className="fas fa-pen mr-2"></i>
              Set Manually
            </button>
          </div>

          {/* Discount Mode */}
          {pricingMode === 'discount' && (
            <div className="mb-4">
              <label className="block text-sm text-slate-400 mb-1.5">Bundle Discount</label>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="5"
                    value={discountPercent}
                    onChange={e => setDiscountPercent(e.target.value)}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>0%</span>
                    <span>10%</span>
                    <span>20%</span>
                    <span>30%</span>
                    <span>40%</span>
                    <span>50%</span>
                  </div>
                </div>
                <div className="relative w-24">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={discountPercent}
                    onChange={e => setDiscountPercent(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-3 pr-8 py-2 text-white text-center focus:outline-none focus:border-emerald-500/50"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                </div>
              </div>
              {components.length > 0 && bundleMetrics.calcCompareAtShopify > 0 && (
                <div className="mt-2 text-sm text-slate-400">
                  Current Price: <span className="text-white font-medium">{formatCurrency(parseFloat(priceMSRP) || 0)}</span>
                </div>
              )}
            </div>
          )}

          {/* Current Price (MSRP) */}
          <div className="mb-4">
            <label className="block text-sm text-slate-400 mb-1.5">
              Current Price (MSRP) *
              {pricingMode === 'discount' && <span className="text-xs text-emerald-400 ml-1">(auto-calculated)</span>}
            </label>
            <div className="relative max-w-xs">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={priceMSRP}
                onChange={e => {
                  setPriceMSRP(e.target.value);
                  if (pricingMode === 'discount') {
                    setPricingMode('manual');
                  }
                }}
                placeholder="0.00"
                className={`w-full bg-slate-800 border rounded-lg pl-8 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 ${
                  pricingMode === 'discount' ? 'border-emerald-500/30' : 'border-slate-700'
                }`}
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">The actual selling price. Updates Shopify&apos;s price field.</p>
          </div>

          {/* Channel-Specific Pricing */}
          <div className="grid grid-cols-2 gap-4">
            {/* Shopify Pricing */}
            <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <i className="fab fa-shopify text-green-400"></i>
                <span className="text-sm font-medium text-white">Shopify</span>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Compare At Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={compareAtShopify}
                      onChange={e => setCompareAtShopify(e.target.value)}
                      placeholder={bundleMetrics.calcCompareAtShopify.toFixed(2)}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-7 pr-3 py-2 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-green-500/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Current Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={priceShopify}
                      onChange={e => setPriceShopify(e.target.value)}
                      placeholder="Same as MSRP"
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-7 pr-3 py-2 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-green-500/50"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Amazon Pricing */}
            <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <i className="fab fa-amazon text-orange-400"></i>
                  <span className="text-sm font-medium text-white">Amazon</span>
                </div>
                {/* Markup Percentage */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Markup:</span>
                  <div className="relative w-20">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={amazonMarkupPercent}
                      onChange={e => setAmazonMarkupPercent(e.target.value)}
                      className="w-full bg-slate-700 border border-orange-500/30 rounded pl-2 pr-6 py-1 text-white text-sm text-center focus:outline-none focus:border-orange-500/50"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-400 text-xs">%</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Compare At Price
                    <span className="text-orange-400 ml-1">(+{amazonMarkupPercent}%)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={compareAtAmazon}
                      onChange={e => setCompareAtAmazon(e.target.value)}
                      placeholder={bundleMetrics.calcCompareAtAmazon.toFixed(2)}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-7 pr-3 py-2 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Current Price
                    <span className="text-orange-400 ml-1">(+{amazonMarkupPercent}%)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={priceAmazon}
                      onChange={e => setPriceAmazon(e.target.value)}
                      placeholder="Same as MSRP"
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-7 pr-3 py-2 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500/50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Components Section */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Components *</h3>

          {/* Add Component */}
          <div className="flex gap-2 mb-4">
            <div className="flex-1 relative">
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
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

              {/* Dropdown */}
              {showProductDropdown && filteredProducts.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-lg max-h-48 overflow-auto">
                  {filteredProducts.map(product => {
                    const stock = getProductStock(product.id);
                    return (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => addComponent(product.id)}
                        className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-slate-700/50 text-left"
                      >
                        <div>
                          <div className="text-sm text-white">{product.name}</div>
                          <div className="text-xs text-slate-400">SKU: {product.sku}</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm ${stock > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {formatNumber(stock)} available
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <input
              type="number"
              min="1"
              value={componentQty}
              onChange={e => setComponentQty(e.target.value)}
              className="w-20 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-center focus:outline-none focus:border-emerald-500/50"
              placeholder="Qty"
            />
          </div>

          {/* Components List */}
          {components.length > 0 ? (
            <div className="space-y-2 mb-4">
              {components.map(comp => {
                const product = state.products.find(p => p.id === comp.productId);
                const stock = getProductStock(comp.productId);
                const hasInsufficientStock = stock < comp.quantity;
                const componentMSRP = (product?.prices.msrp || 0) * comp.quantity;

                return (
                  <div
                    key={comp.productId}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      hasInsufficientStock
                        ? 'bg-red-500/10 border-red-500/30'
                        : 'bg-slate-800/50 border-slate-700/50'
                    }`}
                  >
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <i className="fas fa-flask text-emerald-400"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white truncate">{comp.productName}</div>
                      <div className="text-xs text-slate-400">
                        {formatNumber(stock)} available • MSRP: {formatCurrency(product?.prices.msrp || 0)} each
                        {hasInsufficientStock && (
                          <span className="text-red-400 ml-2">
                            <i className="fas fa-exclamation-triangle mr-1"></i>
                            Insufficient stock
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right mr-2">
                      <div className="text-sm font-medium text-blue-400">{formatCurrency(componentMSRP)}</div>
                      <div className="text-xs text-slate-500">subtotal</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateComponentQty(comp.productId, comp.quantity - 1)}
                        className="w-8 h-8 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={comp.quantity}
                        onChange={e => updateComponentQty(comp.productId, parseInt(e.target.value) || 1)}
                        className="w-16 bg-slate-700 border border-slate-600 rounded-lg px-2 py-1.5 text-white text-center text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => updateComponentQty(comp.productId, comp.quantity + 1)}
                        className="w-8 h-8 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeComponent(comp.productId)}
                      className="p-2 text-slate-500 hover:text-red-400"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-6 border-2 border-dashed border-slate-700 rounded-lg text-center text-slate-400 mb-4">
              <i className="fas fa-cubes text-2xl mb-2"></i>
              <p>No components added yet</p>
              <p className="text-xs text-slate-500">Search for products above to add them</p>
            </div>
          )}

          {/* Bundle Metrics */}
          {components.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 text-center">
                <div className="text-xs text-slate-400 mb-1">Bundle Cost</div>
                <div className="text-lg font-bold text-white">{formatCurrency(bundleMetrics.cost)}</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 text-center">
                <div className="text-xs text-slate-400 mb-1">Margin</div>
                <div className={`text-lg font-bold ${bundleMetrics.margin >= 50 ? 'text-emerald-400' : bundleMetrics.margin >= 30 ? 'text-amber-400' : 'text-red-400'}`}>
                  {bundleMetrics.margin.toFixed(1)}%
                </div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 text-center">
                <div className="text-xs text-slate-400 mb-1">Can Build</div>
                <div className={`text-lg font-bold ${bundleMetrics.availableQty > 10 ? 'text-emerald-400' : bundleMetrics.availableQty > 0 ? 'text-amber-400' : 'text-red-400'}`}>
                  {formatNumber(bundleMetrics.availableQty)}
                </div>
                {bundleMetrics.limitingComponent && bundleMetrics.availableQty < 10 && (
                  <div className="text-xs text-slate-500 truncate">
                    Limited by: {bundleMetrics.limitingComponent}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Assembly Instructions (for physical/fba_kit only) */}
        {bundleType !== 'virtual' && (
          <div>
            <h3 className="text-sm font-medium text-white mb-3">Assembly Instructions</h3>
            <textarea
              value={assemblyInstructions}
              onChange={e => setAssemblyInstructions(e.target.value)}
              rows={3}
              placeholder="Instructions for assembling this bundle..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 resize-none"
            />
          </div>
        )}
      </div>
    </Modal>
  );
}

export default BundleModal;
