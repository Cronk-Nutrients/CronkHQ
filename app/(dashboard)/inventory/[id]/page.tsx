'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp, Product, ProductSupplier } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import { AddProductModal } from '@/components/modals/AddProductModal';
import { AdjustStockModal } from '@/components/modals/AdjustStockModal';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { getCategoryStyle, CategoryIcon } from '@/components/inventory';

type TabType = 'overview' | 'suppliers' | 'bundles';

export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const { state, dispatch } = useApp();
  const { success } = useToast();
  const confirm = useConfirm();

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [editingSupplierRelation, setEditingSupplierRelation] = useState<ProductSupplier | null>(null);

  // Find the product
  const product = state.products.find(p => p.id === productId);

  // Get stock by location
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

  const totalStock = stockByLocation.reduce((sum, loc) => sum + loc.quantity, 0);
  const isLowStock = product ? totalStock <= product.reorderPoint : false;
  const isOutOfStock = totalStock === 0;

  // Get suppliers for this product
  const productSuppliers = useMemo(() => {
    if (!product) return [];
    return state.productSuppliers
      .filter(ps => ps.productId === product.id)
      .map(ps => {
        const supplier = state.suppliers.find(s => s.id === ps.supplierId);
        return { ...ps, supplier };
      })
      .sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0));
  }, [product, state.productSuppliers, state.suppliers]);

  // Get bundles that contain this product
  const productBundles = useMemo(() => {
    if (!product) return [];
    return state.bundles.filter(bundle =>
      bundle.components.some(c => c.productId === product.id)
    ).map(bundle => {
      const component = bundle.components.find(c => c.productId === product.id);
      return {
        ...bundle,
        quantityInBundle: component?.quantity || 0,
      };
    });
  }, [product, state.bundles]);

  // Calculate margin
  const calculateMargin = (price: number, cost: number) => {
    if (price === 0) return 0;
    return ((price - cost) / price) * 100;
  };

  // Calculate markup
  const calculateMarkup = (price: number, cost: number) => {
    if (cost === 0) return 0;
    return ((price - cost) / cost) * 100;
  };

  // Handle delete product
  const handleDeleteProduct = async () => {
    if (!product) return;

    const confirmed = await confirm({
      title: 'Delete Product',
      message: `Are you sure you want to delete "${product.name}"? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      destructive: true,
    });

    if (confirmed) {
      dispatch({ type: 'DELETE_PRODUCT', payload: product.id });
      success(`Product "${product.name}" deleted successfully`);
      router.push('/inventory');
    }
  };

  // Handle set primary supplier
  const handleSetPrimary = (ps: ProductSupplier) => {
    if (!product) return;

    // Update the product supplier to be primary
    dispatch({
      type: 'UPDATE_PRODUCT_SUPPLIER',
      payload: { ...ps, isPrimary: true }
    });

    // Set other suppliers for this product to non-primary
    state.productSuppliers
      .filter(p => p.productId === product.id && p.supplierId !== ps.supplierId)
      .forEach(p => {
        dispatch({
          type: 'UPDATE_PRODUCT_SUPPLIER',
          payload: { ...p, isPrimary: false }
        });
      });

    // Update product's primarySupplierId
    dispatch({
      type: 'UPDATE_PRODUCT',
      payload: { ...product, primarySupplierId: ps.supplierId, updatedAt: new Date() }
    });

    const supplierName = state.suppliers.find(s => s.id === ps.supplierId)?.name || 'Supplier';
    success(`${supplierName} set as primary supplier`);
  };

  // Handle remove supplier relationship
  const handleRemoveSupplier = async (ps: ProductSupplier) => {
    if (!product) return;

    const supplierName = state.suppliers.find(s => s.id === ps.supplierId)?.name || 'this supplier';

    const confirmed = await confirm({
      title: 'Remove Supplier',
      message: `Remove ${supplierName} from this product?`,
      confirmText: 'Remove',
    });

    if (confirmed) {
      dispatch({
        type: 'REMOVE_PRODUCT_SUPPLIER',
        payload: { productId: ps.productId, supplierId: ps.supplierId }
      });

      // If this was the primary supplier, clear primarySupplierId
      if (product.primarySupplierId === ps.supplierId) {
        dispatch({
          type: 'UPDATE_PRODUCT',
          payload: { ...product, primarySupplierId: undefined, updatedAt: new Date() }
        });
      }

      success(`${supplierName} removed from product`);
    }
  };

  // If product not found
  if (!product) {
    return (
      <div className="p-6 text-center">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-12">
          <i className="fas fa-box-open text-4xl text-slate-600 mb-4"></i>
          <h2 className="text-xl font-semibold text-white mb-2">Product Not Found</h2>
          <p className="text-slate-400 mb-4">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/inventory')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
          >
            Back to Inventory
          </button>
        </div>
      </div>
    );
  }

  // Pricing data for table
  const pricingData = [
    {
      channel: 'MSRP',
      price: product.prices.msrp,
      cogs: product.cost.rolling,
      profit: product.prices.msrp - product.cost.rolling,
      margin: calculateMargin(product.prices.msrp, product.cost.rolling),
      markup: calculateMarkup(product.prices.msrp, product.cost.rolling)
    },
    {
      channel: 'Shopify',
      icon: 'fab fa-shopify',
      iconColor: 'green',
      price: product.prices.shopify,
      cogs: product.cost.rolling,
      profit: product.prices.shopify - product.cost.rolling,
      margin: calculateMargin(product.prices.shopify, product.cost.rolling),
      markup: calculateMarkup(product.prices.shopify, product.cost.rolling)
    },
    {
      channel: 'Amazon',
      icon: 'fab fa-amazon',
      iconColor: 'orange',
      price: product.prices.amazon,
      cogs: product.cost.rolling,
      profit: product.prices.amazon - product.cost.rolling,
      margin: calculateMargin(product.prices.amazon, product.cost.rolling),
      markup: calculateMarkup(product.prices.amazon, product.cost.rolling)
    },
    {
      channel: 'Wholesale',
      icon: 'fas fa-store',
      iconColor: 'blue',
      price: product.prices.wholesale,
      cogs: product.cost.rolling,
      profit: product.prices.wholesale - product.cost.rolling,
      margin: calculateMargin(product.prices.wholesale, product.cost.rolling),
      markup: calculateMarkup(product.prices.wholesale, product.cost.rolling)
    },
  ];

  const categoryStyle = getCategoryStyle(product.category);

  // Find related variants - products with similar base name (e.g., "Micro 5-0-1" variants: 500mL, 1L, 1Gal)
  const variants = useMemo(() => {
    // Get base product name without size (e.g., "Micro 5-0-1" from "500mL Micro 5-0-1")
    const baseName = product.name.replace(/^\d+(\.\d+)?\s*(mL|L|ml|l|Gal|gal|oz|OZ)\s+/i, '').trim();

    return state.products.filter(p => {
      if (p.id === product.id) return false; // Exclude self
      const pBaseName = p.name.replace(/^\d+(\.\d+)?\s*(mL|L|ml|l|Gal|gal|oz|OZ)\s+/i, '').trim();
      return pBaseName === baseName;
    }).map(p => {
      // Extract size from name
      const sizeMatch = p.name.match(/^(\d+(\.\d+)?\s*(mL|L|ml|l|Gal|gal|oz|OZ))/i);
      const size = sizeMatch ? sizeMatch[1] : '';
      const stock = state.inventory
        .filter(i => i.productId === p.id)
        .reduce((sum, i) => sum + i.quantity, 0);
      return { ...p, size, stock };
    });
  }, [product, state.products, state.inventory]);

  // Average margin
  const avgMargin = (
    calculateMargin(product.prices.msrp, product.cost.rolling) +
    calculateMargin(product.prices.shopify, product.cost.rolling) +
    calculateMargin(product.prices.amazon, product.cost.rolling) +
    calculateMargin(product.prices.wholesale, product.cost.rolling)
  ) / 4;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/inventory')}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <div className="flex items-center gap-4">
            <CategoryIcon category={product.category} size="lg" />
            <div>
              <h1 className="text-2xl font-bold text-white">{product.name}</h1>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-slate-400">SKU: <span className="text-white font-mono">{product.sku}</span></span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">Category: <span className="text-white capitalize">{product.category.replace('_', ' ')}</span></span>
                <span className="text-slate-600">•</span>
                {isOutOfStock ? (
                  <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">Out of Stock</span>
                ) : isLowStock ? (
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded-full">Low Stock</span>
                ) : (
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">In Stock</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDeleteProduct}
            className="px-4 py-2 bg-slate-800 hover:bg-red-500/20 border border-slate-700 hover:border-red-500/50 text-slate-300 hover:text-red-400 rounded-lg transition-colors flex items-center gap-2"
          >
            <i className="fas fa-trash text-sm"></i>
            Delete
          </button>
          <button
            onClick={() => setIsAdjustModalOpen(true)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors flex items-center gap-2"
          >
            <i className="fas fa-boxes-stacked text-sm"></i>
            Adjust Stock
          </button>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <i className="fas fa-edit text-sm"></i>
            Edit Product
          </button>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-5 gap-4">
        <div className={`bg-slate-800/50 backdrop-blur border rounded-xl p-4 ${isLowStock ? 'border-amber-500/30' : 'border-slate-700/50'}`}>
          <div className="text-sm text-slate-400 mb-1">Total Stock</div>
          <div className={`text-3xl font-bold ${isOutOfStock ? 'text-red-400' : isLowStock ? 'text-amber-400' : 'text-white'}`}>
            {formatNumber(totalStock)}
          </div>
          {isLowStock && !isOutOfStock && (
            <div className="text-xs text-amber-400 mt-1">Below reorder point ({product.reorderPoint})</div>
          )}
          {isOutOfStock && (
            <div className="text-xs text-red-400 mt-1">No stock available</div>
          )}
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Rolling Cost</div>
          <div className="text-3xl font-bold text-white">{formatCurrency(product.cost.rolling)}</div>
          <div className="text-xs text-slate-400 mt-1">Fixed: {formatCurrency(product.cost.fixed)}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">MSRP</div>
          <div className="text-3xl font-bold text-white">{formatCurrency(product.prices.msrp)}</div>
          <div className="text-xs text-emerald-400 mt-1">{calculateMargin(product.prices.msrp, product.cost.rolling).toFixed(1)}% margin</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Inventory Value</div>
          <div className="text-3xl font-bold text-white">{formatCurrency(totalStock * product.prices.msrp)}</div>
          <div className="text-xs text-slate-400 mt-1">At MSRP</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-emerald-500/30 rounded-xl p-4" style={{ boxShadow: '0 0 20px rgba(52, 211, 153, 0.15)' }}>
          <div className="text-sm text-slate-400 mb-1">Avg Margin</div>
          <div className="text-3xl font-bold text-emerald-400">{avgMargin.toFixed(1)}%</div>
          <div className="text-xs text-slate-400 mt-1">Across all channels</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-700/50">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
            activeTab === 'overview'
              ? 'text-white'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          <i className="fas fa-chart-line mr-2"></i>
          Overview
          {activeTab === 'overview' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('suppliers')}
          className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
            activeTab === 'suppliers'
              ? 'text-white'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          <i className="fas fa-truck-loading mr-2"></i>
          Suppliers
          {productSuppliers.length > 0 && (
            <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
              activeTab === 'suppliers'
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-slate-700 text-slate-400'
            }`}>
              {productSuppliers.length}
            </span>
          )}
          {activeTab === 'suppliers' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('bundles')}
          className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
            activeTab === 'bundles'
              ? 'text-white'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          <i className="fas fa-boxes-stacked mr-2"></i>
          Bundles
          {productBundles.length > 0 && (
            <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
              activeTab === 'bundles'
                ? 'bg-amber-500/20 text-amber-400'
                : 'bg-slate-700 text-slate-400'
            }`}>
              {productBundles.length}
            </span>
          )}
          {activeTab === 'bundles' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
          )}
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="col-span-2 space-y-6">

          {/* Pricing & Margins */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700/50 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-white">Pricing & Margins by Channel</h2>
                <p className="text-xs text-slate-400">Sale prices and profit margins across all channels</p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="text-sm text-emerald-400 hover:text-emerald-300"
              >
                <i className="fas fa-edit mr-1"></i>Edit Pricing
              </button>
            </div>
            <div className="p-5">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-slate-400 uppercase">
                    <th className="pb-3 font-medium">Channel</th>
                    <th className="pb-3 font-medium text-right">Price</th>
                    <th className="pb-3 font-medium text-right">COGS</th>
                    <th className="pb-3 font-medium text-right">Gross Profit</th>
                    <th className="pb-3 font-medium text-right">Margin</th>
                    <th className="pb-3 font-medium text-right">Markup</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {pricingData.map((row, index) => (
                    <tr key={index} className="border-t border-slate-700/50">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          {row.icon && <i className={`${row.icon} text-${row.iconColor}-400`}></i>}
                          <span className={row.icon ? 'text-white' : 'text-slate-400'}>{row.channel}</span>
                        </div>
                      </td>
                      <td className="py-3 text-right font-medium text-white">{formatCurrency(row.price)}</td>
                      <td className="py-3 text-right text-slate-400">{formatCurrency(row.cogs)}</td>
                      <td className="py-3 text-right text-emerald-400">{formatCurrency(row.profit)}</td>
                      <td className="py-3 text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          row.margin >= 60 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          {row.margin.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-3 text-right text-slate-400">{row.markup.toFixed(0)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SKU Mapping */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700/50 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-white">SKU Mapping</h2>
                <p className="text-xs text-slate-400">How this product is identified across systems</p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="text-sm text-emerald-400 hover:text-emerald-300"
              >
                <i className="fas fa-edit mr-1"></i>Edit Mapping
              </button>
            </div>
            <div className="p-5 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-slate-500/20 flex items-center justify-center">
                  <i className="fas fa-home text-slate-400"></i>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-slate-400">Internal SKU</div>
                  <div className="font-mono text-white text-sm">{product.sku}</div>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(product.sku);
                    success('SKU copied to clipboard');
                  }}
                  className="text-slate-500 hover:text-white"
                >
                  <i className="fas fa-copy"></i>
                </button>
              </div>

              {product.skus?.shopify && (
                <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <i className="fab fa-shopify text-green-400"></i>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-slate-400">Shopify SKU</div>
                    <div className="font-mono text-white text-sm">{product.skus.shopify}</div>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(product.skus?.shopify || '');
                      success('SKU copied to clipboard');
                    }}
                    className="text-slate-500 hover:text-white"
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                </div>
              )}

              {product.skus?.amazon && (
                <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <i className="fab fa-amazon text-orange-400"></i>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-slate-400">Amazon SKU</div>
                    <div className="font-mono text-white text-sm">{product.skus.amazon}</div>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(product.skus?.amazon || '');
                      success('SKU copied to clipboard');
                    }}
                    className="text-slate-500 hover:text-white"
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                </div>
              )}

              {product.barcode && (
                <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-slate-500/20 flex items-center justify-center">
                    <i className="fas fa-barcode text-slate-400"></i>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-slate-400">UPC Barcode</div>
                    <div className="font-mono text-white text-sm">{product.barcode}</div>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(product.barcode || '');
                      success('Barcode copied to clipboard');
                    }}
                    className="text-slate-500 hover:text-white"
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">

          {/* Stock by Location */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700/50 flex items-center justify-between">
              <h2 className="font-semibold text-white">Stock by Location</h2>
              <button
                onClick={() => setIsAdjustModalOpen(true)}
                className="text-sm text-emerald-400 hover:text-emerald-300"
              >
                <i className="fas fa-edit mr-1"></i>Adjust
              </button>
            </div>
            <div className="p-5 space-y-3">
              {stockByLocation.map((loc) => (
                <div key={loc.locationId} className="flex items-center justify-between p-3 bg-slate-700/30 border border-slate-600/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-600/50 flex items-center justify-center">
                      <i className="fas fa-warehouse text-slate-400"></i>
                    </div>
                    <div>
                      <div className="font-medium text-white">{loc.locationName}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-bold ${loc.quantity > 0 ? 'text-white' : 'text-slate-500'}`}>
                      {formatNumber(loc.quantity)}
                    </div>
                    <div className="text-xs text-slate-400">units</div>
                  </div>
                </div>
              ))}
              <div className="border-t border-slate-700 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total Available</span>
                  <span className={`text-2xl font-bold ${isOutOfStock ? 'text-red-400' : isLowStock ? 'text-amber-400' : 'text-white'}`}>
                    {formatNumber(totalStock)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-slate-400">Reorder Point</span>
                  <span className="text-white">{formatNumber(product.reorderPoint)} units</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700/50 flex items-center justify-between">
              <h2 className="font-semibold text-white">Product Details</h2>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="text-sm text-emerald-400 hover:text-emerald-300"
              >
                <i className="fas fa-edit mr-1"></i>Edit
              </button>
            </div>
            <div className="p-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Weight</span>
                <span className="text-white">{product.weight.value} {product.weight.unit}</span>
              </div>
              {product.dimensions && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Dimensions</span>
                  <span className="text-white">
                    {product.dimensions.length}" × {product.dimensions.width}" × {product.dimensions.height}"
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-400">Category</span>
                <span className="text-white capitalize">{product.category.replace('_', ' ')}</span>
              </div>
              {product.description && (
                <div className="pt-2 border-t border-slate-700">
                  <span className="text-slate-400 block mb-1">Description</span>
                  <p className="text-white text-sm">{product.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Case Pack / Purchasing Info */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700/50 flex items-center justify-between">
              <h2 className="font-semibold text-white">Purchasing Info</h2>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="text-sm text-emerald-400 hover:text-emerald-300"
              >
                <i className="fas fa-edit mr-1"></i>Edit
              </button>
            </div>
            <div className="p-5 space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Case Pack Qty</span>
                <span className="text-white font-medium">
                  {product.casePackQty || 12} units/case
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Cases Needed</span>
                <span className="text-white">
                  {Math.ceil((product.reorderPoint - totalStock) / (product.casePackQty || 12))} cases to reorder point
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Supplier</span>
                <span className="text-white">{product.supplier || 'Not set'}</span>
              </div>
              <div className="pt-3 border-t border-slate-700">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Cost per unit</span>
                  <span className="text-white">{formatCurrency(product.cost.rolling)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
                  <span>Cost per case</span>
                  <span className="text-white">{formatCurrency(product.cost.rolling * (product.casePackQty || 12))}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Variants */}
          {variants.length > 0 && (
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-700/50">
                <h2 className="font-semibold text-white">Related Variants</h2>
                <p className="text-xs text-slate-400">{variants.length + 1} sizes available</p>
              </div>
              <div className="p-4 space-y-2">
                {/* Current product */}
                <div className="flex items-center justify-between p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <i className="fas fa-check text-emerald-400 text-sm"></i>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        {product.name.match(/^(\d+(\.\d+)?\s*(mL|L|ml|l|Gal|gal|oz|OZ))/i)?.[1] || 'Current'}
                      </div>
                      <div className="text-xs text-slate-400">{product.sku}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">{totalStock} units</div>
                    <div className="text-xs text-slate-400">viewing</div>
                  </div>
                </div>

                {/* Other variants */}
                {variants.map(v => (
                  <div
                    key={v.id}
                    onClick={() => router.push(`/inventory/${v.id}`)}
                    className="flex items-center justify-between p-3 bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/50 rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-600/50 flex items-center justify-center">
                        <i className="fas fa-flask text-slate-400 text-sm"></i>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{v.size || v.name}</div>
                        <div className="text-xs text-slate-400">{v.sku}</div>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <div>
                        <div className={`text-sm font-medium ${v.stock > 0 ? 'text-white' : 'text-red-400'}`}>{v.stock} units</div>
                        <div className="text-xs text-slate-400">{formatCurrency(v.prices.msrp)}</div>
                      </div>
                      <i className="fas fa-chevron-right text-slate-500 text-xs"></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
            <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => setIsAdjustModalOpen(true)}
                className="w-full px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-sm flex items-center gap-2 transition-colors"
              >
                <i className="fas fa-plus-minus w-5 text-center"></i>
                Adjust Stock
              </button>
              <button className="w-full px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-sm flex items-center gap-2 transition-colors">
                <i className="fas fa-file-invoice w-5 text-center"></i>
                Create Purchase Order
              </button>
              <button className="w-full px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-sm flex items-center gap-2 transition-colors">
                <i className="fab fa-amazon w-5 text-center text-orange-400"></i>
                Add to FBA Shipment
              </button>
              <button className="w-full px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-sm flex items-center gap-2 transition-colors">
                <i className="fas fa-exchange-alt w-5 text-center"></i>
                Transfer Stock
              </button>
              <button className="w-full px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-sm flex items-center gap-2 transition-colors">
                <i className="fas fa-print w-5 text-center"></i>
                Print Labels
              </button>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Suppliers Tab */}
      {activeTab === 'suppliers' && (
        <div className="space-y-6">
          {/* Suppliers Table */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700/50 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-white">Product Suppliers</h2>
                <p className="text-xs text-slate-400">Vendors who supply this product</p>
              </div>
            </div>

            {productSuppliers.length === 0 ? (
              <div className="p-12 text-center">
                <i className="fas fa-truck-loading text-4xl text-slate-600 mb-4"></i>
                <h3 className="text-lg font-medium text-white mb-2">No Suppliers Assigned</h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto mb-4">
                  This product doesn&apos;t have any suppliers assigned yet. Add suppliers from the Suppliers page.
                </p>
                <Link
                  href="/inventory/suppliers"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
                >
                  <i className="fas fa-plus"></i>
                  Go to Suppliers
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-800/50">
                    <tr className="text-xs text-slate-400 uppercase tracking-wider">
                      <th className="px-4 py-3 text-left">Supplier</th>
                      <th className="px-4 py-3 text-left">Supplier SKU</th>
                      <th className="px-4 py-3 text-right">Unit Cost</th>
                      <th className="px-4 py-3 text-center">Currency</th>
                      <th className="px-4 py-3 text-center">Lead Time</th>
                      <th className="px-4 py-3 text-center">Status</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {productSuppliers.map(ps => (
                      <tr key={ps.supplierId} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-4 py-3">
                          <Link
                            href={`/suppliers/${ps.supplierId}`}
                            className="flex items-center gap-3 hover:text-emerald-400"
                          >
                            <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
                              <i className="fas fa-building text-slate-400"></i>
                            </div>
                            <div>
                              <div className="font-medium text-white">{ps.supplier?.name || 'Unknown'}</div>
                              <div className="text-xs text-slate-400 font-mono">{ps.supplier?.code || '-'}</div>
                            </div>
                          </Link>
                        </td>
                        <td className="px-4 py-3">
                          {ps.supplierSku ? (
                            <span className="font-mono text-white">{ps.supplierSku}</span>
                          ) : (
                            <span className="text-slate-500">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="font-medium text-white">{formatCurrency(ps.unitCost)}</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="px-2 py-1 bg-slate-700 text-white text-xs rounded font-mono">
                            {ps.currency}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {ps.leadTimeDays || ps.supplier?.leadTimeDays ? (
                            <span className="text-white">{ps.leadTimeDays || ps.supplier?.leadTimeDays} days</span>
                          ) : (
                            <span className="text-slate-500">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {ps.isPrimary ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-amber-500/20 text-amber-400">
                              <i className="fas fa-star"></i>
                              Primary
                            </span>
                          ) : (
                            <span className="text-slate-500 text-xs">Secondary</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            {!ps.isPrimary && (
                              <button
                                onClick={() => handleSetPrimary(ps)}
                                className="px-2 py-1 text-xs text-amber-400 hover:bg-amber-500/10 rounded transition-colors"
                                title="Set as Primary"
                              >
                                <i className="fas fa-star"></i>
                              </button>
                            )}
                            <button
                              onClick={() => handleRemoveSupplier(ps)}
                              className="px-2 py-1 text-xs text-red-400 hover:bg-red-500/10 rounded transition-colors"
                              title="Remove"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Primary Supplier Info */}
          {product.primarySupplierId && (
            <div className="bg-slate-800/50 backdrop-blur border border-amber-500/30 rounded-xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <i className="fas fa-star text-amber-400 text-lg"></i>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-slate-400">Primary Supplier</div>
                  <div className="text-lg font-medium text-white">
                    {state.suppliers.find(s => s.id === product.primarySupplierId)?.name || 'Unknown'}
                  </div>
                </div>
                <Link
                  href={`/suppliers/${product.primarySupplierId}`}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm"
                >
                  View Supplier
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bundles Tab */}
      {activeTab === 'bundles' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700/50 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-white">Product Bundles</h2>
                <p className="text-xs text-slate-400">Bundles that include this product</p>
              </div>
              <Link
                href="/inventory/bundles"
                className="text-sm text-emerald-400 hover:text-emerald-300"
              >
                <i className="fas fa-external-link-alt mr-1"></i>
                View All Bundles
              </Link>
            </div>

            {productBundles.length === 0 ? (
              <div className="p-12 text-center">
                <i className="fas fa-boxes-stacked text-4xl text-slate-600 mb-4"></i>
                <h3 className="text-lg font-medium text-white mb-2">Not Used in Any Bundles</h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto mb-4">
                  This product isn&apos;t part of any bundles yet. Create a bundle to sell multiple products together at a discounted price.
                </p>
                <Link
                  href="/inventory/bundles"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-colors"
                >
                  <i className="fas fa-plus"></i>
                  Create Bundle with this SKU
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-700/50">
                {productBundles.map(bundle => (
                  <div key={bundle.id} className="p-4 hover:bg-slate-800/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          bundle.type === 'virtual'
                            ? 'bg-blue-500/20'
                            : bundle.type === 'fba_kit'
                            ? 'bg-orange-500/20'
                            : 'bg-emerald-500/20'
                        }`}>
                          {bundle.type === 'virtual' ? (
                            <i className="fas fa-cloud text-blue-400"></i>
                          ) : bundle.type === 'fba_kit' ? (
                            <i className="fab fa-amazon text-orange-400"></i>
                          ) : (
                            <i className="fas fa-box text-emerald-400"></i>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-white">{bundle.name}</div>
                          <div className="text-sm text-slate-400">
                            <span className="font-mono">{bundle.sku}</span>
                            <span className="mx-2">•</span>
                            <span className="capitalize">{bundle.type?.replace('_', ' ') || 'Virtual'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-sm text-slate-400">Qty in Bundle</div>
                          <div className="text-lg font-bold text-white">{bundle.quantityInBundle}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-slate-400">Bundle Price</div>
                          <div className="text-lg font-bold text-emerald-400">{formatCurrency(bundle.prices.shopify)}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-slate-400">Components</div>
                          <div className="text-lg font-bold text-white">{bundle.components.length}</div>
                        </div>
                        <Link
                          href="/inventory/bundles"
                          className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm"
                        >
                          <i className="fas fa-eye mr-1"></i>
                          View
                        </Link>
                      </div>
                    </div>

                    {/* Other components in this bundle */}
                    <div className="mt-3 pt-3 border-t border-slate-700/50">
                      <div className="text-xs text-slate-400 mb-2">Other components in this bundle:</div>
                      <div className="flex flex-wrap gap-2">
                        {bundle.components
                          .filter(c => c.productId !== product.id)
                          .map(c => (
                            <span key={c.productId} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded">
                              {c.quantity}x {c.productName}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bundle Stats */}
          {productBundles.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
                <div className="text-sm text-slate-400 mb-1">Used In</div>
                <div className="text-2xl font-bold text-white">{productBundles.length}</div>
                <div className="text-xs text-slate-400">bundle{productBundles.length !== 1 ? 's' : ''}</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
                <div className="text-sm text-slate-400 mb-1">Total Qty Bundled</div>
                <div className="text-2xl font-bold text-white">
                  {productBundles.reduce((sum, b) => sum + b.quantityInBundle, 0)}
                </div>
                <div className="text-xs text-slate-400">units across all bundles</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
                <div className="text-sm text-slate-400 mb-1">Avg Bundle Price</div>
                <div className="text-2xl font-bold text-emerald-400">
                  {formatCurrency(productBundles.reduce((sum, b) => sum + b.prices.shopify, 0) / productBundles.length)}
                </div>
                <div className="text-xs text-slate-400">Shopify price</div>
              </div>
            </div>
          )}

          {/* Create New Bundle CTA */}
          {productBundles.length > 0 && (
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <i className="fas fa-plus text-amber-400"></i>
                  </div>
                  <div>
                    <div className="font-medium text-white">Create Another Bundle</div>
                    <div className="text-sm text-slate-400">Add this product to a new bundle</div>
                  </div>
                </div>
                <Link
                  href="/inventory/bundles"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-colors"
                >
                  <i className="fas fa-plus mr-2"></i>
                  Create Bundle
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <AddProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        editProduct={product}
      />

      <AdjustStockModal
        isOpen={isAdjustModalOpen}
        onClose={() => setIsAdjustModalOpen(false)}
        product={product}
      />
    </div>
  );
}
