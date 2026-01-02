'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useApp, Bundle } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import { BundleModal, BundleDetailModal } from '@/components/modals';
import { BundleCard } from '@/components/BundleCard';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { Breadcrumb } from '@/components/Breadcrumb';

type TypeFilter = '' | 'virtual' | 'physical' | 'fba_kit';

export default function BundlesPage() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const { success } = useToast();
  const confirm = useConfirm();

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editBundle, setEditBundle] = useState<Bundle | null>(null);
  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('');

  // Get total stock for a product
  const getProductStock = (productId: string) => {
    return state.inventory
      .filter(i => i.productId === productId)
      .reduce((sum, i) => sum + i.quantity, 0);
  };

  // Calculate bundle availability
  const getBundleAvailability = (bundle: Bundle) => {
    if (!bundle.components || bundle.components.length === 0) return { available: 0, limitingItem: '' };

    let minAvailable = Infinity;
    let limitingItem = '';

    bundle.components.forEach(comp => {
      const stock = getProductStock(comp.productId);
      const canBuild = Math.floor(stock / comp.quantity);
      if (canBuild < minAvailable) {
        minAvailable = canBuild;
        limitingItem = comp.productName;
      }
    });

    return {
      available: minAvailable === Infinity ? 0 : minAvailable,
      limitingItem,
    };
  };

  // Filter bundles
  const filteredBundles = useMemo(() => {
    return state.bundles.filter(bundle => {
      const matchesSearch =
        bundle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bundle.sku.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = !typeFilter || bundle.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [state.bundles, searchTerm, typeFilter]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalBundles = state.bundles.length;

    const fullyAvailable = state.bundles.filter(b => {
      const avail = getBundleAvailability(b);
      return avail.available > 10;
    }).length;

    const limitedStock = state.bundles.filter(b => {
      const avail = getBundleAvailability(b);
      return avail.available > 0 && avail.available <= 10;
    }).length;

    const outOfStock = state.bundles.filter(b => {
      const avail = getBundleAvailability(b);
      return avail.available === 0;
    }).length;

    // Calculate total potential value
    const potentialValue = state.bundles.reduce((sum, b) => {
      const avail = getBundleAvailability(b);
      return sum + avail.available * b.prices.msrp;
    }, 0);

    return {
      totalBundles,
      fullyAvailable,
      limitedStock,
      outOfStock,
      potentialValue,
    };
  }, [state.bundles, state.inventory]);

  // Component usage across bundles
  const componentUsage = useMemo(() => {
    const usage: Record<string, {
      productId: string;
      productName: string;
      sku: string;
      bundles: { name: string; qty: number }[];
      totalQty: number;
      availableStock: number;
    }> = {};

    state.bundles.forEach(bundle => {
      (bundle.components || []).forEach(comp => {
        if (!usage[comp.productId]) {
          const product = state.products.find(p => p.id === comp.productId);
          usage[comp.productId] = {
            productId: comp.productId,
            productName: comp.productName,
            sku: product?.sku || 'Unknown',
            bundles: [],
            totalQty: 0,
            availableStock: getProductStock(comp.productId),
          };
        }
        usage[comp.productId].bundles.push({
          name: bundle.name,
          qty: comp.quantity,
        });
        usage[comp.productId].totalQty += comp.quantity;
      });
    });

    return Object.values(usage);
  }, [state.bundles, state.products, state.inventory]);

  // Handle delete bundle
  const handleDeleteBundle = async (bundle: Bundle, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const confirmed = await confirm({
      title: 'Delete Bundle',
      message: `Are you sure you want to delete "${bundle.name}"? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      destructive: true,
    });

    if (confirmed) {
      dispatch({ type: 'DELETE_BUNDLE', payload: bundle.id });
      success(`Bundle "${bundle.name}" deleted`);
    }
  };

  // Handle edit bundle
  const handleEditBundle = (bundle: Bundle, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditBundle(bundle);
    setIsCreateModalOpen(true);
    setIsDetailModalOpen(false);
  };

  // Handle view details
  const handleViewDetails = (bundle: Bundle) => {
    setSelectedBundle(bundle);
    setIsDetailModalOpen(true);
  };

  // Close modals
  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    setEditBundle(null);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedBundle(null);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Inventory', href: '/inventory' }, { label: 'Bundles' }]} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Bundles</h1>
          <p className="text-sm text-slate-400">Product bundles and kits with component tracking</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <i className="fas fa-plus text-sm"></i>
            Create Bundle
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-slate-800/50 backdrop-blur border border-amber-500/30 rounded-xl p-4" style={{ boxShadow: '0 0 20px rgba(251, 191, 36, 0.15)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <i className="fas fa-layer-group text-amber-400"></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">{stats.totalBundles}</div>
              <div className="text-xs text-slate-400">Total Bundles</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-emerald-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <i className="fas fa-check-circle text-emerald-400"></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">{stats.fullyAvailable}</div>
              <div className="text-xs text-slate-400">Fully Available</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-amber-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <i className="fas fa-exclamation-triangle text-amber-400"></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">{stats.limitedStock}</div>
              <div className="text-xs text-slate-400">Limited Stock</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-red-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
              <i className="fas fa-times-circle text-red-400"></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-400">{stats.outOfStock}</div>
              <div className="text-xs text-slate-400">Out of Stock</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
              <i className="fas fa-dollar-sign text-slate-400"></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{formatCurrency(stats.potentialValue)}</div>
              <div className="text-xs text-slate-400">Potential Value</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bundle Type Explanation */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <i className="fas fa-cloud text-blue-400 text-sm"></i>
            </div>
            <div>
              <div className="text-sm font-medium text-white">Virtual Bundle</div>
              <div className="text-xs text-slate-400">Pick components separately, assemble at pack</div>
            </div>
          </div>
          <div className="h-8 w-px bg-slate-700"></div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <i className="fas fa-box text-emerald-400 text-sm"></i>
            </div>
            <div>
              <div className="text-sm font-medium text-white">Physical Bundle</div>
              <div className="text-xs text-slate-400">Pre-assembled, has own SKU and inventory</div>
            </div>
          </div>
          <div className="h-8 w-px bg-slate-700"></div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <i className="fab fa-amazon text-orange-400 text-sm"></i>
            </div>
            <div>
              <div className="text-sm font-medium text-white">FBA Kit</div>
              <div className="text-xs text-slate-400">Pre-kitted and shipped to Amazon FBA</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input
              type="text"
              placeholder="Search bundles by name or SKU..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50"
            />
          </div>
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value as TypeFilter)}
            className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-emerald-500/50"
          >
            <option value="">All Types</option>
            <option value="virtual">Virtual</option>
            <option value="physical">Physical</option>
            <option value="fba_kit">FBA Kit</option>
          </select>
        </div>
      </div>

      {/* Bundle Cards Grid */}
      {filteredBundles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBundles.map(bundle => (
            <BundleCard
              key={bundle.id}
              bundle={bundle}
              onClick={() => handleViewDetails(bundle)}
              onEdit={(e) => handleEditBundle(bundle, e)}
              onDelete={(e) => handleDeleteBundle(bundle, e)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-12 text-center">
          <i className="fas fa-layer-group text-4xl text-slate-600 mb-4"></i>
          <h3 className="text-lg font-medium text-white mb-2">No bundles found</h3>
          <p className="text-slate-400 mb-4">
            {searchTerm || typeFilter
              ? 'Try adjusting your search or filters'
              : 'Create your first bundle to get started'}
          </p>
          {!searchTerm && !typeFilter && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-colors"
            >
              <i className="fas fa-plus mr-2"></i>
              Create Bundle
            </button>
          )}
        </div>
      )}

      {/* Component Usage Table */}
      {componentUsage.length > 0 && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-700/50 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white">Component Usage Across Bundles</h2>
              <p className="text-xs text-slate-400">Which products are used in which bundles</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50 border-b border-slate-700/50">
                <tr className="text-left text-xs text-slate-400 uppercase tracking-wider">
                  <th className="px-4 py-3 font-medium">Component</th>
                  <th className="px-4 py-3 font-medium">Used In</th>
                  <th className="px-4 py-3 font-medium text-center">Total Needed</th>
                  <th className="px-4 py-3 font-medium text-right">Available Stock</th>
                  <th className="px-4 py-3 font-medium text-right">Can Build</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {componentUsage.slice(0, 10).map(comp => {
                  const minBundles = Math.min(
                    ...comp.bundles.map(b => {
                      return Math.floor(comp.availableStock / b.qty);
                    })
                  );

                  return (
                    <tr
                      key={comp.productId}
                      className="hover:bg-slate-700/30 transition-colors cursor-pointer"
                      onClick={() => router.push(`/inventory/${comp.productId}`)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-emerald-500/20 rounded flex items-center justify-center">
                            <i className="fas fa-flask text-emerald-400 text-xs"></i>
                          </div>
                          <div>
                            <div className="text-sm text-white">{comp.productName}</div>
                            <div className="text-xs text-slate-400">{comp.sku}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {comp.bundles.slice(0, 3).map((bundle, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-xs rounded"
                            >
                              {bundle.name} (x{bundle.qty})
                            </span>
                          ))}
                          {comp.bundles.length > 3 && (
                            <span className="px-2 py-0.5 text-slate-500 text-xs">
                              +{comp.bundles.length - 3} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-slate-400">
                        {comp.totalQty} per set
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={`text-sm ${comp.availableStock > 0 ? 'text-white' : 'text-red-400'}`}>
                          {formatNumber(comp.availableStock)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={`text-sm font-medium ${
                          minBundles > 10 ? 'text-emerald-400' :
                          minBundles > 0 ? 'text-amber-400' : 'text-red-400'
                        }`}>
                          {formatNumber(minBundles)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {componentUsage.length > 10 && (
            <div className="px-4 py-3 border-t border-slate-700/50 text-center">
              <span className="text-sm text-slate-400">
                Showing 10 of {componentUsage.length} components
              </span>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <BundleModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        editBundle={editBundle}
      />

      <BundleDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        bundle={selectedBundle}
        onEdit={() => {
          if (selectedBundle) {
            handleEditBundle(selectedBundle);
          }
        }}
      />
    </div>
  );
}
