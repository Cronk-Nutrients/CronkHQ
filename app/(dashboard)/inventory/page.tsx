'use client';

import { useState, useMemo, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useApp, Product } from '@/context/AppContext';
import { useOrganization } from '@/context/OrganizationContext';
import { useToast } from '@/components/ui/Toast';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import { Modal } from '@/components/ui/Modal';
import { ActiveFilters } from '@/components/ui/FilterBadge';
import { AddProductModal } from '@/components/modals/AddProductModal';
import { AdjustStockModal } from '@/components/modals/AdjustStockModal';
import { ImportCSVModal } from '@/components/modals/ImportCSVModal';
import { ImportInflowModal } from '@/components/modals/ImportInflowModal';
import { SerialLookup } from '@/components/SerialLookup';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { Hash, Layers, Loader2 } from 'lucide-react';
import {
  getCategoryStyle,
  categoryStyles,
  CategoryIcon,
  StockStatus,
} from '@/components/inventory';
import { Pagination, EmptyState } from '@/components/inventory/InventoryTable';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Category } from '@/types';

type StatusFilter = 'all' | 'in_stock' | 'low_stock' | 'out_of_stock';
type LocationFilter = 'all' | string;
type ProductStatusFilter = 'all' | 'active' | 'archived' | 'draft';
type SortOption = 'stock_high' | 'stock_low' | 'name_asc' | 'name_desc' | 'price_high' | 'price_low' | 'recent';

interface SavedView {
  id: string;
  name: string;
  filters: {
    category?: string;
    status?: string;
    location?: string;
    productStatus?: string;
    sortBy?: string;
    search?: string;
  };
}

function InventoryPageLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
    </div>
  );
}

export default function InventoryPage() {
  return (
    <Suspense fallback={<InventoryPageLoading />}>
      <InventoryPageContent />
    </Suspense>
  );
}

function InventoryPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, dispatch } = useApp();
  const { organization } = useOrganization();
  const { success, error: showError, warning } = useToast();
  const confirm = useConfirm();

  // Dynamic categories from Firestore
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // Load categories from Firestore
  useEffect(() => {
    if (!organization?.id) {
      setCategoriesLoading(false);
      return;
    }

    const categoriesRef = collection(db, 'organizations', organization.id, 'categories');
    const q = query(categoriesRef, orderBy('sortOrder'), orderBy('name'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const cats = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Category[];
      setCategories(cats);
      setCategoriesLoading(false);
    }, (err) => {
      console.error('Error loading categories:', err);
      setCategoriesLoading(false);
    });

    return () => unsubscribe();
  }, [organization?.id]);

  // Read initial filter values from URL
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [locationFilter, setLocationFilter] = useState<LocationFilter>('all');
  const [productStatusFilter, setProductStatusFilter] = useState<ProductStatusFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('stock_high');
  const [urlInitialized, setUrlInitialized] = useState(false);

  // Saved views
  const [savedViews, setSavedViews] = useState<SavedView[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('inventory_saved_views');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [showSaveViewModal, setShowSaveViewModal] = useState(false);
  const [newViewName, setNewViewName] = useState('');

  // Initialize filters from URL params
  useEffect(() => {
    if (!urlInitialized) {
      const location = searchParams.get('location');
      const status = searchParams.get('status');
      const category = searchParams.get('category');
      const search = searchParams.get('search');
      const pStatus = searchParams.get('productStatus');
      const sort = searchParams.get('sort');

      if (location) setLocationFilter(location);
      if (status && ['in_stock', 'low_stock', 'out_of_stock'].includes(status)) {
        setStatusFilter(status as StatusFilter);
      }
      // Accept any category from URL - will be validated against loaded categories
      if (category) setCategoryFilter(category);
      if (pStatus && ['active', 'archived', 'draft'].includes(pStatus)) {
        setProductStatusFilter(pStatus as ProductStatusFilter);
      }
      if (sort && ['stock_high', 'stock_low', 'name_asc', 'name_desc', 'price_high', 'price_low', 'recent'].includes(sort)) {
        setSortBy(sort as SortOption);
      }
      if (search) setSearchQuery(search);

      setUrlInitialized(true);
    }
  }, [searchParams, urlInitialized]);

  // Update URL when filters change
  const updateUrlParams = useCallback((newFilters: {
    location?: string;
    status?: string;
    category?: string;
    search?: string;
    productStatus?: string;
    sort?: string;
  }) => {
    const params = new URLSearchParams();
    const location = newFilters.location ?? locationFilter;
    const status = newFilters.status ?? statusFilter;
    const category = newFilters.category ?? categoryFilter;
    const search = newFilters.search ?? searchQuery;
    const pStatus = newFilters.productStatus ?? productStatusFilter;
    const sort = newFilters.sort ?? sortBy;

    if (location !== 'all') params.set('location', location);
    if (status !== 'all') params.set('status', status);
    if (category !== 'all') params.set('category', category);
    if (pStatus !== 'all') params.set('productStatus', pStatus);
    if (sort !== 'stock_high') params.set('sort', sort);
    if (search) params.set('search', search);

    const url = params.toString() ? `/inventory?${params.toString()}` : '/inventory';
    router.replace(url, { scroll: false });
  }, [router, locationFilter, statusFilter, categoryFilter, searchQuery, productStatusFilter, sortBy]);

  // Save current view
  const handleSaveView = () => {
    if (!newViewName.trim()) return;

    const newView: SavedView = {
      id: `view_${Date.now()}`,
      name: newViewName.trim(),
      filters: {
        category: categoryFilter !== 'all' ? categoryFilter : undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        location: locationFilter !== 'all' ? locationFilter : undefined,
        productStatus: productStatusFilter !== 'all' ? productStatusFilter : undefined,
        sortBy: sortBy !== 'stock_high' ? sortBy : undefined,
        search: searchQuery || undefined,
      },
    };

    const updatedViews = [...savedViews, newView];
    setSavedViews(updatedViews);
    localStorage.setItem('inventory_saved_views', JSON.stringify(updatedViews));
    setShowSaveViewModal(false);
    setNewViewName('');
    success(`View "${newView.name}" saved`);
  };

  // Load saved view
  const handleLoadView = (view: SavedView) => {
    setCategoryFilter(view.filters.category || 'all');
    setStatusFilter((view.filters.status as StatusFilter) || 'all');
    setLocationFilter(view.filters.location || 'all');
    setProductStatusFilter((view.filters.productStatus as ProductStatusFilter) || 'all');
    setSortBy((view.filters.sortBy as SortOption) || 'stock_high');
    setSearchQuery(view.filters.search || '');
    setCurrentPage(1);
    success(`Loaded view "${view.name}"`);
  };

  // Delete saved view
  const handleDeleteView = async (viewId: string) => {
    const view = savedViews.find(v => v.id === viewId);
    const confirmed = await confirm({
      title: 'Delete View',
      message: `Delete saved view "${view?.name}"?`,
      confirmText: 'Delete',
      destructive: true,
    });

    if (confirmed) {
      const updatedViews = savedViews.filter(v => v.id !== viewId);
      setSavedViews(updatedViews);
      localStorage.setItem('inventory_saved_views', JSON.stringify(updatedViews));
      success('View deleted');
    }
  };

  // Helper to get location name
  const getLocationName = (locationId: string) => {
    const loc = state.locations.find(l => l.id === locationId);
    return loc?.name || locationId;
  };

  // Build active filters array for display
  const activeFiltersList = useMemo(() => {
    const filters: Array<{ key: string; label: string; value: string }> = [];
    if (locationFilter !== 'all') {
      filters.push({ key: 'location', label: 'Location', value: getLocationName(locationFilter) });
    }
    if (statusFilter !== 'all') {
      const statusLabels: Record<string, string> = {
        in_stock: 'In Stock',
        low_stock: 'Low Stock',
        out_of_stock: 'Out of Stock',
      };
      filters.push({ key: 'status', label: 'Stock', value: statusLabels[statusFilter] });
    }
    if (productStatusFilter !== 'all') {
      const pStatusLabels: Record<string, string> = {
        active: 'Active',
        archived: 'Archived',
        draft: 'Draft',
      };
      filters.push({ key: 'productStatus', label: 'Status', value: pStatusLabels[productStatusFilter] });
    }
    if (categoryFilter !== 'all') {
      // Use dynamic categories from Firestore
      const category = categories.find(c => c.id === categoryFilter || c.slug === categoryFilter);
      filters.push({ key: 'category', label: 'Category', value: category?.name || categoryFilter });
    }
    if (searchQuery) {
      filters.push({ key: 'search', label: 'Search', value: searchQuery });
    }
    return filters;
  }, [locationFilter, statusFilter, productStatusFilter, categoryFilter, searchQuery, state.locations, categories]);

  // Handle removing a filter
  const handleRemoveFilter = (key: string) => {
    if (key === 'location') {
      setLocationFilter('all');
      updateUrlParams({ location: 'all' });
    } else if (key === 'status') {
      setStatusFilter('all');
      updateUrlParams({ status: 'all' });
    } else if (key === 'productStatus') {
      setProductStatusFilter('all');
      updateUrlParams({ productStatus: 'all' });
    } else if (key === 'category') {
      setCategoryFilter('all');
      updateUrlParams({ category: 'all' });
    } else if (key === 'search') {
      setSearchQuery('');
      updateUrlParams({ search: '' });
    }
  };

  // Handle clearing all filters
  const handleClearAllFilters = () => {
    setLocationFilter('all');
    setStatusFilter('all');
    setProductStatusFilter('all');
    setCategoryFilter('all');
    setSortBy('stock_high');
    setSearchQuery('');
    router.replace('/inventory', { scroll: false });
  };
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const itemsPerPage = 10;

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isInflowModalOpen, setIsInflowModalOpen] = useState(false);
  const [isSerialLookupOpen, setIsSerialLookupOpen] = useState(false);
  const [showImportDropdown, setShowImportDropdown] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [adjustingProduct, setAdjustingProduct] = useState<Product | null>(null);

  // Get stock for a product
  const getProductStock = (productId: string, product?: Product) => {
    // If product has totalInventory from Shopify variants, use that
    if (product?.totalInventory !== undefined && product.totalInventory > 0) {
      return {
        total: product.totalInventory,
        byLocation: { 'shopify': product.totalInventory },
        fromShopify: true,
      };
    }

    // Fall back to inventory levels table
    const inventoryLevels = state.inventory.filter(i => i.productId === productId);
    const total = inventoryLevels.reduce((sum, i) => sum + i.quantity, 0);
    const byLocation: Record<string, number> = {};
    inventoryLevels.forEach(i => {
      byLocation[i.locationId] = i.quantity;
    });
    return { total, byLocation, fromShopify: false };
  };

  // Get stock status
  const getStockStatus = (product: Product) => {
    const stock = getProductStock(product.id, product);
    if (stock.total === 0) return 'out_of_stock';
    if (stock.total <= product.reorderPoint) return 'low_stock';
    return 'in_stock';
  };

  // Calculate margin
  const calculateMargin = (price: number, cost: number) => {
    if (price === 0) return 0;
    return ((price - cost) / price) * 100;
  };

  // Calculate average margin across all price points
  const getAvgMargin = (product: Product) => {
    const margins = [
      calculateMargin(product.prices.msrp, product.cost.rolling),
      calculateMargin(product.prices.shopify, product.cost.rolling),
      calculateMargin(product.prices.amazon, product.cost.rolling),
      calculateMargin(product.prices.wholesale, product.cost.rolling),
    ];
    return margins.reduce((a, b) => a + b, 0) / margins.length;
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    // First filter
    const filtered = state.products.filter((product) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !product.name.toLowerCase().includes(query) &&
          !product.sku.toLowerCase().includes(query) &&
          !(product.skus?.shopify?.toLowerCase().includes(query)) &&
          !(product.skus?.amazon?.toLowerCase().includes(query))
        ) {
          return false;
        }
      }

      // Category filter - match by category id, slug, or name
      if (categoryFilter !== 'all') {
        const productCategory = (product as any).categoryId || (product as any).category;
        const matchesCategory = productCategory === categoryFilter ||
          (product as any).categorySlug === categoryFilter ||
          product.category === categoryFilter;
        if (!matchesCategory) {
          return false;
        }
      }

      // Stock status filter
      const status = getStockStatus(product);
      if (statusFilter !== 'all' && status !== statusFilter) {
        return false;
      }

      // Product status filter (active/archived/draft)
      if (productStatusFilter !== 'all') {
        const pStatus = (product as any).status || 'active';
        if (pStatus !== productStatusFilter) {
          return false;
        }
      }

      // Location filter
      if (locationFilter !== 'all') {
        const stock = getProductStock(product.id);
        if (!stock.byLocation[locationFilter] || stock.byLocation[locationFilter] === 0) {
          return false;
        }
      }

      return true;
    });

    // Then sort
    return filtered.sort((a, b) => {
      const stockA = getProductStock(a.id, a).total;
      const stockB = getProductStock(b.id, b).total;

      switch (sortBy) {
        case 'stock_high':
          return stockB - stockA;
        case 'stock_low':
          return stockA - stockB;
        case 'name_asc':
          return a.name.localeCompare(b.name);
        case 'name_desc':
          return b.name.localeCompare(a.name);
        case 'price_high':
          return (b.prices?.msrp || 0) - (a.prices?.msrp || 0);
        case 'price_low':
          return (a.prices?.msrp || 0) - (b.prices?.msrp || 0);
        case 'recent':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        default:
          return stockB - stockA;
      }
    });
  }, [state.products, state.inventory, searchQuery, categoryFilter, statusFilter, productStatusFilter, locationFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate stats from real data
  const stats = useMemo(() => {
    const totalProducts = state.products.length;
    const totalUnits = state.inventory.reduce((sum, i) => sum + i.quantity, 0);

    let inventoryValue = 0;
    let costOnHand = 0;

    state.products.forEach(product => {
      const stock = getProductStock(product.id);
      inventoryValue += stock.total * product.prices.msrp;
      costOnHand += stock.total * product.cost.rolling;
    });

    const overallMargin = inventoryValue > 0 ? ((inventoryValue - costOnHand) / inventoryValue) * 100 : 0;
    const lowStockCount = state.products.filter(p => getStockStatus(p) === 'low_stock').length;
    const outOfStockCount = state.products.filter(p => getStockStatus(p) === 'out_of_stock').length;

    return {
      totalProducts,
      totalUnits,
      inventoryValue,
      costOnHand,
      overallMargin,
      lowStockCount,
      outOfStockCount,
    };
  }, [state.products, state.inventory]);

  // Get category label from dynamic categories or shared styles fallback
  const getCategoryLabel = (categoryId: string) => {
    // Try to find in dynamic categories first
    const cat = categories.find(c => c.id === categoryId || c.slug === categoryId);
    if (cat) return cat.name;
    // Fallback to shared styles
    return categoryStyles[categoryId as Product['category']]?.label || categoryId;
  };

  // Handle row click
  const handleRowClick = (productId: string) => {
    router.push(`/inventory/${productId}`);
  };

  // Handle checkbox
  const handleCheckbox = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedProducts.size === paginatedProducts.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(paginatedProducts.map(p => p.id)));
    }
  };

  // Handle edit product
  const handleEditProduct = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingProduct(product);
    setIsAddModalOpen(true);
  };

  // Handle adjust stock
  const handleAdjustStock = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setAdjustingProduct(product);
    setIsAdjustModalOpen(true);
  };

  // Handle delete product
  const handleDeleteProduct = async (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
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
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedProducts.size === 0) return;

    const confirmed = await confirm({
      title: 'Delete Products',
      message: `Are you sure you want to delete ${selectedProducts.size} product(s)? This action cannot be undone.`,
      confirmText: 'Delete All',
      cancelText: 'Cancel',
      destructive: true,
    });

    if (confirmed) {
      selectedProducts.forEach(id => {
        dispatch({ type: 'DELETE_PRODUCT', payload: id });
      });
      success(`${selectedProducts.size} product(s) deleted successfully`);
      setSelectedProducts(new Set());
    }
  };

  // Handle export
  const handleExport = () => {
    const dataToExport = selectedProducts.size > 0
      ? state.products.filter(p => selectedProducts.has(p.id))
      : filteredProducts;

    const csv = [
      ['SKU', 'Name', 'Category', 'Weight', 'Total Stock', 'Variants', 'MSRP', 'Shopify Price', 'Amazon Price', 'Wholesale Price', 'Rolling Cost', 'Fixed Cost'].join(','),
      ...dataToExport.map(p => {
        const stock = getProductStock(p.id, p);
        return [
          p.sku,
          `"${p.name}"`,
          p.category,
          p.weight.value + ' ' + p.weight.unit,
          stock.total,
          p.variants?.length || 1,
          p.prices.msrp,
          p.prices.shopify,
          p.prices.amazon,
          p.prices.wholesale,
          p.cost.rolling,
          p.cost.fixed,
        ].join(',');
      }),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    success(`Exported ${dataToExport.length} product(s) to CSV`);
  };

  // Close modals
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setEditingProduct(null);
  };

  const handleCloseAdjustModal = () => {
    setIsAdjustModalOpen(false);
    setAdjustingProduct(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Inventory</h1>
          <p className="text-sm text-slate-400">Manage products, pricing, and stock levels</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSerialLookupOpen(true)}
            className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-400 rounded-lg transition-colors flex items-center gap-2"
          >
            <Hash className="w-4 h-4" />
            Serial Lookup
          </button>
          <Link
            href="/inventory/lots"
            className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-400 rounded-lg transition-colors flex items-center gap-2"
          >
            <Layers className="w-4 h-4" />
            Lot Inventory
          </Link>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors flex items-center gap-2"
          >
            <i className="fas fa-download text-sm"></i>
            Export
          </button>
          <Link
            href="/inventory/counts"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors flex items-center gap-2"
          >
            <i className="fas fa-clipboard-check text-sm"></i>
            Count Stock
          </Link>
          <Link
            href="/inventory/transfers"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors flex items-center gap-2"
          >
            <i className="fas fa-exchange-alt text-sm"></i>
            Transfers
          </Link>
          <div className="relative">
            <button
              onClick={() => setShowImportDropdown(!showImportDropdown)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors flex items-center gap-2"
            >
              <i className="fas fa-upload text-sm"></i>
              Import
              <i className="fas fa-chevron-down text-xs"></i>
            </button>
            {showImportDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowImportDropdown(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden">
                  <button
                    onClick={() => {
                      setIsImportModalOpen(true);
                      setShowImportDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left text-slate-300 hover:bg-slate-700 transition-colors flex items-center gap-3"
                  >
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <i className="fas fa-file-csv text-emerald-400"></i>
                    </div>
                    <div>
                      <div className="font-medium text-white">Import CSV</div>
                      <div className="text-xs text-slate-400">Generic CSV format</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setIsInflowModalOpen(true);
                      setShowImportDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left text-slate-300 hover:bg-slate-700 transition-colors flex items-center gap-3 border-t border-slate-700"
                  >
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <i className="fas fa-exchange-alt text-blue-400"></i>
                    </div>
                    <div>
                      <div className="font-medium text-white">Import from inFlow</div>
                      <div className="text-xs text-slate-400">inFlow Inventory export</div>
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <i className="fas fa-plus text-sm"></i>
            Add Product
          </button>
        </div>
      </div>

      {/* Active Filters Banner */}
      {activeFiltersList.length > 0 && (
        <ActiveFilters
          filters={activeFiltersList}
          onRemove={handleRemoveFilter}
          onClearAll={handleClearAllFilters}
        />
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Total Products</div>
          <div className="text-2xl font-bold text-white">{stats.totalProducts}</div>
          <div className="text-xs text-slate-500 mt-1">Active SKUs</div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Total Units</div>
          <div className="text-2xl font-bold text-white">{formatNumber(stats.totalUnits)}</div>
          <div className="text-xs text-slate-500 mt-1">Across all locations</div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Inventory Value</div>
          <div className="text-2xl font-bold text-white">{formatCurrency(stats.inventoryValue)}</div>
          <div className="text-xs text-slate-500 mt-1">At MSRP</div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Cost on Hand</div>
          <div className="text-2xl font-bold text-emerald-400">{formatCurrency(stats.costOnHand)}</div>
          <div className="text-xs text-slate-500 mt-1">{stats.overallMargin.toFixed(1)}% margin</div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Low Stock Items</div>
          <div className="text-2xl font-bold text-amber-400">{stats.lowStockCount}</div>
          <div className="text-xs text-red-400 mt-1">{stats.outOfStockCount} out of stock</div>
        </div>
      </div>

      {/* Saved Views Row */}
      {savedViews.length > 0 && (
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm text-slate-400">Saved Views:</span>
          {savedViews.map(view => (
            <div key={view.id} className="flex items-center gap-1 bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
              <button
                onClick={() => handleLoadView(view)}
                className="px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700 transition-colors"
              >
                {view.name}
              </button>
              <button
                onClick={() => handleDeleteView(view.id)}
                className="px-2 py-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-700 transition-colors"
              >
                <i className="fas fa-times text-xs"></i>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Filters Row */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Search */}
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input
              type="text"
              placeholder="Search by SKU, name, or barcode..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              onBlur={() => {
                if (urlInitialized) updateUrlParams({ search: searchQuery });
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && urlInitialized) {
                  updateUrlParams({ search: searchQuery });
                }
              }}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => {
              const val = e.target.value;
              setCategoryFilter(val);
              setCurrentPage(1);
              if (urlInitialized) updateUrlParams({ category: val });
            }}
            className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-emerald-500/50"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
            {/* Fallback options if no categories loaded yet */}
            {categories.length === 0 && !categoriesLoading && (
              <>
                <option value="nutrients">Nutrients</option>
                <option value="supplements">Supplements</option>
                <option value="ph_adjusters">pH Adjusters</option>
                <option value="bundles">Bundles</option>
              </>
            )}
          </select>

          {/* Location Filter */}
          <select
            value={locationFilter}
            onChange={(e) => {
              const val = e.target.value;
              setLocationFilter(val);
              setCurrentPage(1);
              if (urlInitialized) updateUrlParams({ location: val });
            }}
            className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-emerald-500/50"
          >
            <option value="all">All Locations</option>
            {state.locations.map(loc => (
              <option key={loc.id} value={loc.id}>{loc.name}</option>
            ))}
          </select>

          {/* Stock Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              const val = e.target.value as StatusFilter;
              setStatusFilter(val);
              setCurrentPage(1);
              if (urlInitialized) updateUrlParams({ status: val });
            }}
            className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-emerald-500/50"
          >
            <option value="all">All Stock Levels</option>
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>

          {/* Product Status Filter */}
          <select
            value={productStatusFilter}
            onChange={(e) => {
              const val = e.target.value as ProductStatusFilter;
              setProductStatusFilter(val);
              setCurrentPage(1);
              if (urlInitialized) updateUrlParams({ productStatus: val });
            }}
            className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-emerald-500/50"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
            <option value="draft">Draft</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => {
              const val = e.target.value as SortOption;
              setSortBy(val);
              setCurrentPage(1);
              if (urlInitialized) updateUrlParams({ sort: val });
            }}
            className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-emerald-500/50"
          >
            <option value="stock_high">Stock: High to Low</option>
            <option value="stock_low">Stock: Low to High</option>
            <option value="name_asc">Name: A to Z</option>
            <option value="name_desc">Name: Z to A</option>
            <option value="price_high">Price: High to Low</option>
            <option value="price_low">Price: Low to High</option>
            <option value="recent">Recently Updated</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center bg-slate-800/50 border border-slate-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-md text-sm ${
                viewMode === 'list'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <i className="fas fa-list"></i>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-md text-sm ${
                viewMode === 'grid'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <i className="fas fa-grip"></i>
            </button>
          </div>

          {/* Save View Button */}
          <button
            onClick={() => setShowSaveViewModal(true)}
            className="px-3 py-2.5 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 text-slate-300 rounded-lg text-sm transition-colors flex items-center gap-2"
          >
            <i className="fas fa-bookmark text-xs"></i>
            Save View
          </button>
        </div>

        {/* Bulk Actions */}
        {selectedProducts.size > 0 && (
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-700/50">
            <span className="text-sm text-slate-400">
              {selectedProducts.size} selected
            </span>
            <button
              onClick={handleExport}
              className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors"
            >
              <i className="fas fa-download mr-2"></i>
              Export Selected
            </button>
            <button
              onClick={handleBulkDelete}
              className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm transition-colors"
            >
              <i className="fas fa-trash mr-2"></i>
              Delete Selected
            </button>
            <button
              onClick={() => setSelectedProducts(new Set())}
              className="px-3 py-1.5 text-slate-400 hover:text-white text-sm transition-colors"
            >
              Clear Selection
            </button>
          </div>
        )}
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedProducts.map((product) => {
            const stock = getProductStock(product.id, product);
            const status = getStockStatus(product);
            const avgMargin = getAvgMargin(product);
            const variantCount = product.variants?.length || 0;

            return (
              <div
                key={product.id}
                onClick={() => handleRowClick(product.id)}
                className={`bg-slate-800/50 backdrop-blur border rounded-xl p-4 cursor-pointer transition-all hover:border-slate-600 ${
                  selectedProducts.has(product.id) ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-slate-700/50'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                  ) : (
                    <CategoryIcon category={product.category} />
                  )}
                  <input
                    type="checkbox"
                    checked={selectedProducts.has(product.id)}
                    onChange={() => {}}
                    onClick={(e) => handleCheckbox(product.id, e)}
                    className="rounded bg-slate-700 border-slate-600"
                  />
                </div>

                <h3 className="font-medium text-white mb-1 line-clamp-1">{product.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-slate-400">{product.sku}</span>
                  {variantCount > 1 && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded text-[10px]">
                      {variantCount} sizes
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className={`text-lg font-bold ${
                    status === 'in_stock' ? 'text-emerald-400' :
                    status === 'low_stock' ? 'text-amber-400' : 'text-red-400'
                  }`}>
                    {formatNumber(stock.total)} units
                  </div>
                  <StockStatus status={status} />
                </div>

                <div className="flex items-center justify-between text-sm">
                  {variantCount > 1 ? (
                    <>
                      <span className="text-slate-500 italic text-xs">Varies by variant</span>
                      <span className="text-slate-500 italic text-xs">See details</span>
                    </>
                  ) : (
                    <>
                      <span className="text-slate-400">{formatCurrency(product.prices.msrp)}</span>
                      <span className="text-emerald-400">{avgMargin.toFixed(1)}% margin</span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-700/50">
                  <button
                    onClick={(e) => handleEditProduct(product, e)}
                    className="flex-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors"
                  >
                    <i className="fas fa-edit mr-1"></i>
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleAdjustStock(product, e)}
                    className="flex-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors"
                  >
                    <i className="fas fa-boxes-stacked mr-1"></i>
                    Stock
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List View / Table */}
      {viewMode === 'list' && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-800/50 border-b border-slate-700/50">
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedProducts.size === paginatedProducts.length && paginatedProducts.length > 0}
                      onChange={handleSelectAll}
                      className="rounded bg-slate-700 border-slate-600"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Product</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">SKUs</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-slate-400">Stock</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-slate-400">Cost</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-slate-400">MSRP</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-slate-400">Shopify</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-slate-400">Amazon</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-slate-400">Wholesale</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-slate-400">Avg Margin</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((product) => {
                  const stock = getProductStock(product.id, product);
                  const status = getStockStatus(product);
                  const avgMargin = getAvgMargin(product);
                  const variantCount = product.variants?.length || 0;

                  return (
                    <tr
                      key={product.id}
                      onClick={() => handleRowClick(product.id)}
                      className={`transition-colors cursor-pointer border-b border-slate-700/30 hover:bg-slate-800/30 ${
                        selectedProducts.has(product.id) ? 'bg-emerald-500/5' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="px-4 py-4" onClick={(e) => handleCheckbox(product.id, e)}>
                        <input
                          type="checkbox"
                          checked={selectedProducts.has(product.id)}
                          onChange={() => {}}
                          className="rounded bg-slate-700 border-slate-600"
                        />
                      </td>

                      {/* Product */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                          ) : (
                            <CategoryIcon category={product.category} />
                          )}
                          <div>
                            <div className="font-medium text-white">{product.name}</div>
                            <div className="text-xs text-slate-400 flex items-center gap-2 flex-wrap">
                              <span>{getCategoryLabel(product.category)}</span>
                              {variantCount > 1 && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded text-[10px]">
                                  <i className="fas fa-layer-group"></i>
                                  {variantCount} variants
                                </span>
                              )}
                              {product.isArchived && (
                                <span className="inline-flex items-center px-1.5 py-0.5 bg-amber-500/20 text-amber-400 rounded text-[10px]">
                                  <i className="fas fa-archive mr-1"></i>Archived
                                </span>
                              )}
                              {product.isDraft && (
                                <span className="inline-flex items-center px-1.5 py-0.5 bg-slate-500/20 text-slate-400 rounded text-[10px]">
                                  <i className="fas fa-file-alt mr-1"></i>Draft
                                </span>
                              )}
                              {product.shopifyProductId && (
                                <span className="text-green-400">
                                  <i className="fab fa-shopify"></i>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* SKUs */}
                      <td className="px-4 py-4">
                        <div className="space-y-1">
                          {/* Only show parent SKU if product has no variants */}
                          {(!product.variants || product.variants.length <= 1) && (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-500 w-16">Internal:</span>
                              <code className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-300">{product.sku}</code>
                            </div>
                          )}
                          {/* For products with variants, show variant count */}
                          {product.variants && product.variants.length > 1 && (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-blue-400">
                                <i className="fas fa-layer-group mr-1"></i>
                                {product.variants.length} variant SKUs
                              </span>
                            </div>
                          )}
                          {product.skus?.shopify && !product.hasVariants && (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-green-400 w-16"><i className="fab fa-shopify"></i></span>
                              <code className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-300">{product.skus.shopify}</code>
                            </div>
                          )}
                          {product.skus?.amazon && (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-orange-400 w-16"><i className="fab fa-amazon"></i></span>
                              <code className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-300">{product.skus.amazon}</code>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Stock */}
                      <td className="px-4 py-4">
                        <div className="text-center">
                          <div className={`text-lg font-bold ${
                            status === 'in_stock' ? 'text-emerald-400' :
                            status === 'low_stock' ? 'text-amber-400' : 'text-red-400'
                          }`}>
                            {formatNumber(stock.total)}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            {state.locations.slice(0, 2).map((loc, i) => (
                              <span key={loc.id}>
                                {i > 0 && ' • '}
                                <span className={i === 0 ? 'text-blue-400' : 'text-orange-400'}>
                                  {stock.byLocation[loc.id] || 0}
                                </span> {loc.name.split(' ')[0]}
                              </span>
                            ))}
                          </div>
                          <StockStatus status={status} compact />
                        </div>
                      </td>

                      {/* Cost */}
                      <td className="px-4 py-4 text-right">
                        {variantCount > 1 ? (
                          <div className="text-xs text-slate-500 italic">Varies by variant</div>
                        ) : (
                          <>
                            <div className="text-sm text-white">{formatCurrency(product.cost.rolling)}</div>
                            <div className="text-xs text-slate-500">Rolling Avg</div>
                            <div className="text-xs text-slate-400">Fixed: {formatCurrency(product.cost.fixed)}</div>
                          </>
                        )}
                      </td>

                      {/* MSRP */}
                      <td className="px-4 py-4 text-right">
                        {variantCount > 1 ? (
                          <div className="text-xs text-slate-500 italic">Varies</div>
                        ) : (
                          <>
                            <div className="text-sm font-medium text-white">{formatCurrency(product.prices.msrp)}</div>
                            <div className="text-xs text-emerald-400">{calculateMargin(product.prices.msrp, product.cost.rolling).toFixed(1)}%</div>
                          </>
                        )}
                      </td>

                      {/* Shopify */}
                      <td className="px-4 py-4 text-right">
                        {variantCount > 1 ? (
                          <div className="text-xs text-slate-500 italic">Varies</div>
                        ) : (
                          <>
                            <div className="text-sm text-white">{formatCurrency(product.prices.shopify)}</div>
                            <div className="text-xs text-emerald-400">{calculateMargin(product.prices.shopify, product.cost.rolling).toFixed(1)}%</div>
                          </>
                        )}
                      </td>

                      {/* Amazon */}
                      <td className="px-4 py-4 text-right">
                        {variantCount > 1 ? (
                          <div className="text-xs text-slate-500 italic">Varies</div>
                        ) : (
                          <>
                            <div className="text-sm text-white">{formatCurrency(product.prices.amazon)}</div>
                            <div className="text-xs text-emerald-400">{calculateMargin(product.prices.amazon, product.cost.rolling).toFixed(1)}%</div>
                          </>
                        )}
                      </td>

                      {/* Wholesale */}
                      <td className="px-4 py-4 text-right">
                        {variantCount > 1 ? (
                          <div className="text-xs text-slate-500 italic">Varies</div>
                        ) : (
                          <>
                            <div className="text-sm text-white">{formatCurrency(product.prices.wholesale)}</div>
                            <div className="text-xs text-emerald-400">{calculateMargin(product.prices.wholesale, product.cost.rolling).toFixed(1)}%</div>
                          </>
                        )}
                      </td>

                      {/* Avg Margin */}
                      <td className="px-4 py-4 text-center">
                        {variantCount > 1 ? (
                          <div className="text-xs text-slate-500 italic">See variants</div>
                        ) : (
                          <div className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-medium">
                            {avgMargin.toFixed(1)}%
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={(e) => handleEditProduct(product, e)}
                            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <i className="fas fa-edit text-sm"></i>
                          </button>
                          <button
                            onClick={(e) => handleAdjustStock(product, e)}
                            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                            title="Adjust Stock"
                          >
                            <i className="fas fa-boxes-stacked text-sm"></i>
                          </button>
                          <button
                            onClick={(e) => handleDeleteProduct(product, e)}
                            className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <i className="fas fa-trash text-sm"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="py-12 text-center">
              <i className="fas fa-box-open text-4xl text-slate-600 mb-4"></i>
              <p className="text-sm text-slate-400">No products found</p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-emerald-400 hover:text-emerald-300 text-sm"
                >
                  Clear search
                </button>
              )}
            </div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredProducts.length}
            itemsPerPage={itemsPerPage}
            itemLabel="products"
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Legend */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Stock Locations:</span>
              {state.locations.slice(0, 3).map((loc, i) => (
                <span key={loc.id}>
                  {i > 0 && <span className="text-slate-500 mx-1">•</span>}
                  <span className={i === 0 ? 'text-blue-400' : i === 1 ? 'text-orange-400' : 'text-purple-400'}>
                    {loc.name}
                  </span>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Margin = Profit Margin (not markup)</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/30"></span>
              <span className="text-slate-400">In Stock</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-amber-500/20 border border-amber-500/30"></span>
              <span className="text-slate-400">Low Stock</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-red-500/20 border border-red-500/30"></span>
              <span className="text-slate-400">Out of Stock</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        editProduct={editingProduct}
      />

      <AdjustStockModal
        isOpen={isAdjustModalOpen}
        onClose={handleCloseAdjustModal}
        product={adjustingProduct}
      />

      <ImportCSVModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />

      <ImportInflowModal
        isOpen={isInflowModalOpen}
        onClose={() => setIsInflowModalOpen(false)}
      />

      {/* Serial Lookup Modal */}
      <Modal
        open={isSerialLookupOpen}
        onClose={() => setIsSerialLookupOpen(false)}
        title="Serial Number Lookup"
        subtitle="Look up serial number status and history"
        size="lg"
      >
        <SerialLookup embedded onClose={() => setIsSerialLookupOpen(false)} />
      </Modal>

      {/* Save View Modal */}
      <Modal
        open={showSaveViewModal}
        onClose={() => {
          setShowSaveViewModal(false);
          setNewViewName('');
        }}
        title="Save Current View"
        subtitle="Save the current filters and sorting as a named view"
        size="sm"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">View Name</label>
            <input
              type="text"
              value={newViewName}
              onChange={(e) => setNewViewName(e.target.value)}
              placeholder="e.g., Low Stock Items, Active Products..."
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              autoFocus
            />
          </div>
          <div className="text-sm text-slate-400">
            <div className="font-medium mb-2">Current filters:</div>
            <ul className="list-disc list-inside space-y-1 text-xs">
              {categoryFilter !== 'all' && <li>Category: {getCategoryLabel(categoryFilter)}</li>}
              {statusFilter !== 'all' && <li>Stock: {statusFilter.replace('_', ' ')}</li>}
              {productStatusFilter !== 'all' && <li>Status: {productStatusFilter}</li>}
              {locationFilter !== 'all' && <li>Location: {getLocationName(locationFilter)}</li>}
              {sortBy !== 'stock_high' && <li>Sort: {sortBy.replace(/_/g, ' ')}</li>}
              {searchQuery && <li>Search: "{searchQuery}"</li>}
              {categoryFilter === 'all' && statusFilter === 'all' && productStatusFilter === 'all' && locationFilter === 'all' && sortBy === 'stock_high' && !searchQuery && (
                <li className="text-slate-500">No filters applied (default view)</li>
              )}
            </ul>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => {
                setShowSaveViewModal(false);
                setNewViewName('');
              }}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveView}
              disabled={!newViewName.trim()}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              Save View
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
