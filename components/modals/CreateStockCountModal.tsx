'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useApp, StockCount, StockCountItem } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';

interface CreateStockCountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateStockCountModal({ isOpen, onClose }: CreateStockCountModalProps) {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const { success, error } = useToast();

  // Form state
  const [countName, setCountName] = useState('');
  const [countType, setCountType] = useState<StockCount['type']>('cycle');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [includeFilter, setIncludeFilter] = useState<'all' | 'low_stock' | 'high_value'>('all');

  // Spot check state
  const [productSearch, setProductSearch] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(state.products.map(p => p.category));
    return Array.from(cats).sort();
  }, [state.products]);

  // Filter products for spot check
  const filteredProducts = useMemo(() => {
    let products = state.products;

    if (selectedLocation) {
      products = products.filter(p =>
        state.inventory.some(inv => inv.productId === p.id && inv.locationId === selectedLocation)
      );
    }

    if (productSearch) {
      const search = productSearch.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(search) ||
        p.sku.toLowerCase().includes(search)
      );
    }

    return products;
  }, [state.products, state.inventory, selectedLocation, productSearch]);

  // Toggle product selection
  const toggleProduct = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Generate count number
  const generateCountNumber = () => {
    const num = state.stockCounts.length + 1;
    return `SC-${String(num).padStart(4, '0')}`;
  };

  // Handle create
  const handleCreate = () => {
    if (!countName.trim()) {
      error('Please enter a count name');
      return;
    }

    if (!selectedLocation) {
      error('Please select a location');
      return;
    }

    if (countType === 'spot' && selectedProducts.length === 0) {
      error('Please select at least one product for spot check');
      return;
    }

    // Get products to count based on filters
    let productsToCount = state.products.filter(p =>
      state.inventory.some(inv => inv.productId === p.id && inv.locationId === selectedLocation)
    );

    if (selectedCategory && countType === 'cycle') {
      productsToCount = productsToCount.filter(p => p.category === selectedCategory);
    }

    if (countType === 'spot') {
      productsToCount = productsToCount.filter(p => selectedProducts.includes(p.id));
    }

    // Apply include filters
    if (includeFilter === 'low_stock') {
      productsToCount = productsToCount.filter(p => {
        const inv = state.inventory.find(i => i.productId === p.id && i.locationId === selectedLocation);
        return inv && inv.quantity <= p.reorderPoint;
      });
    } else if (includeFilter === 'high_value') {
      productsToCount = productsToCount.filter(p => p.cost.rolling >= 10);
    }

    if (productsToCount.length === 0) {
      error('No products match the selected criteria');
      return;
    }

    // Create count items
    const items: StockCountItem[] = productsToCount.map(product => {
      const inventoryLevel = state.inventory.find(
        inv => inv.productId === product.id && inv.locationId === selectedLocation
      );

      return {
        productId: product.id,
        productName: product.name,
        sku: product.sku,
        binLocation: inventoryLevel?.binLocation,
        systemQty: inventoryLevel?.quantity || 0,
        countedQty: null,
        variance: 0,
        varianceValue: 0,
        status: 'pending' as const,
      };
    });

    const location = state.locations.find(l => l.id === selectedLocation);
    const countNumber = generateCountNumber();

    const newCount: StockCount = {
      id: `sc-${Date.now()}`,
      countNumber,
      name: countName,
      type: countType,
      status: 'draft',
      location: selectedLocation,
      locationName: location?.name || '',
      category: selectedCategory || undefined,
      items,
      summary: {
        totalItems: items.length,
        countedItems: 0,
        matchedItems: 0,
        discrepancyItems: 0,
        totalVariance: 0,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    dispatch({ type: 'ADD_STOCK_COUNT', payload: newCount });
    success(`Stock count ${countNumber} created with ${items.length} items`);
    onClose();
    router.push(`/inventory/counts/${newCount.id}`);
  };

  // Reset form
  const handleClose = () => {
    setCountName('');
    setCountType('cycle');
    setSelectedLocation('');
    setSelectedCategory('');
    setIncludeFilter('all');
    setProductSearch('');
    setSelectedProducts([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose}></div>

        {/* Modal */}
        <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl w-full max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
            <div>
              <h2 className="text-xl font-bold text-white">Create Stock Count</h2>
              <p className="text-sm text-slate-400">Set up a new inventory count</p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Count Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Count Name
              </label>
              <input
                type="text"
                value={countName}
                onChange={(e) => setCountName(e.target.value)}
                placeholder="e.g., Monthly Full Count - December"
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Count Type */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Count Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setCountType('full')}
                  className={`p-4 rounded-lg border text-left transition-colors ${
                    countType === 'full'
                      ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                      : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <i className="fas fa-boxes mb-2"></i>
                  <div className="font-medium">Full Count</div>
                  <div className="text-xs text-slate-500">Count all items at location</div>
                </button>
                <button
                  onClick={() => setCountType('cycle')}
                  className={`p-4 rounded-lg border text-left transition-colors ${
                    countType === 'cycle'
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <i className="fas fa-sync-alt mb-2"></i>
                  <div className="font-medium">Cycle Count</div>
                  <div className="text-xs text-slate-500">Count specific category or zone</div>
                </button>
                <button
                  onClick={() => setCountType('spot')}
                  className={`p-4 rounded-lg border text-left transition-colors ${
                    countType === 'spot'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                      : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <i className="fas fa-search mb-2"></i>
                  <div className="font-medium">Spot Check</div>
                  <div className="text-xs text-slate-500">Count specific items only</div>
                </button>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="">Select a location...</option>
                {state.locations.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>

            {/* Category Filter (for Cycle Count) */}
            {countType === 'cycle' && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Category (Optional)
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Include Filter (for Full/Cycle) */}
            {countType !== 'spot' && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Include Items
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIncludeFilter('all')}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      includeFilter === 'all'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400'
                    }`}
                  >
                    All Items
                  </button>
                  <button
                    onClick={() => setIncludeFilter('low_stock')}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      includeFilter === 'low_stock'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400'
                    }`}
                  >
                    Low Stock Only
                  </button>
                  <button
                    onClick={() => setIncludeFilter('high_value')}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      includeFilter === 'high_value'
                        ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400'
                    }`}
                  >
                    High Value Only
                  </button>
                </div>
              </div>
            )}

            {/* Product Selector (for Spot Check) */}
            {countType === 'spot' && selectedLocation && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Select Items to Count ({selectedProducts.length} selected)
                </label>
                <div className="relative mb-3">
                  <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></i>
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="max-h-60 overflow-y-auto space-y-2 border border-slate-700 rounded-lg p-2">
                  {filteredProducts.length === 0 ? (
                    <p className="text-center py-4 text-slate-500">No products found at this location</p>
                  ) : (
                    filteredProducts.map(product => (
                      <label
                        key={product.id}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedProducts.includes(product.id)
                            ? 'bg-emerald-500/20 border border-emerald-500/30'
                            : 'hover:bg-slate-800/50 border border-transparent'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => toggleProduct(product.id)}
                          className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-emerald-500 focus:ring-emerald-500"
                        />
                        <div className="flex-1">
                          <div className="text-white">{product.name}</div>
                          <div className="text-xs text-slate-400">{product.sku}</div>
                        </div>
                        <div className="text-sm text-slate-400">
                          {state.inventory.find(i => i.productId === product.id && i.locationId === selectedLocation)?.quantity || 0} in stock
                        </div>
                      </label>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-700/50">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={!countName.trim() || !selectedLocation || (countType === 'spot' && selectedProducts.length === 0)}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <i className="fas fa-plus"></i>
              Create Count
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
