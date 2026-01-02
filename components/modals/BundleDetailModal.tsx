'use client';

import { useMemo } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useApp, Bundle } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import { formatCurrency, formatNumber } from '@/lib/formatting';

interface BundleDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  bundle: Bundle | null;
  onEdit: () => void;
}

export function BundleDetailModal({ isOpen, onClose, bundle, onEdit }: BundleDetailModalProps) {
  const { state, dispatch } = useApp();
  const { success } = useToast();
  const confirm = useConfirm();

  // Get total stock for a product
  const getProductStock = (productId: string) => {
    return state.inventory
      .filter(i => i.productId === productId)
      .reduce((sum, i) => sum + i.quantity, 0);
  };

  // Calculate bundle metrics
  const bundleMetrics = useMemo(() => {
    if (!bundle) return { cost: 0, margin: 0, availableQty: 0, limitingComponent: '' };

    const cost = bundle.components.reduce((sum, c) => {
      const product = state.products.find(p => p.id === c.productId);
      return sum + (product?.cost.rolling || 0) * c.quantity;
    }, 0);

    const margin = bundle.prices.msrp > 0 ? ((bundle.prices.msrp - cost) / bundle.prices.msrp) * 100 : 0;

    // Available quantity = MIN of (component stock / qty needed)
    const availableQty = bundle.components.length > 0
      ? Math.min(
          ...bundle.components.map(c => {
            const stock = getProductStock(c.productId);
            return Math.floor(stock / c.quantity);
          })
        )
      : 0;

    // Find limiting component
    let limitingComponent = '';
    if (bundle.components.length > 0) {
      let minAvailable = Infinity;
      bundle.components.forEach(c => {
        const stock = getProductStock(c.productId);
        const canBuild = Math.floor(stock / c.quantity);
        if (canBuild < minAvailable) {
          minAvailable = canBuild;
          limitingComponent = c.productName;
        }
      });
    }

    return { cost, margin, availableQty, limitingComponent };
  }, [bundle, state.products, state.inventory]);

  // Get bundle type badge
  const getBundleTypeBadge = (type: Bundle['type']) => {
    switch (type) {
      case 'virtual':
        return (
          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/20">
            <i className="fas fa-cloud mr-1"></i>Virtual
          </span>
        );
      case 'physical':
        return (
          <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full border border-emerald-500/20">
            <i className="fas fa-box mr-1"></i>Physical
          </span>
        );
      case 'fba_kit':
        return (
          <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full border border-orange-500/20">
            <i className="fab fa-amazon mr-1"></i>FBA Kit
          </span>
        );
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!bundle) return;

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
      onClose();
    }
  };

  if (!bundle) return null;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={bundle.name}
      subtitle={`SKU: ${bundle.sku}`}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={handleDelete}>
            <i className="fas fa-trash mr-2"></i>
            Delete
          </Button>
          <Button onClick={onEdit}>
            <i className="fas fa-edit mr-2"></i>
            Edit Bundle
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Header Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getBundleTypeBadge(bundle.type)}
            <span className={`px-2 py-1 text-xs rounded-full ${
              bundleMetrics.availableQty > 10
                ? 'bg-emerald-500/10 text-emerald-400'
                : bundleMetrics.availableQty > 0
                ? 'bg-amber-500/10 text-amber-400'
                : 'bg-red-500/10 text-red-400'
            }`}>
              {bundleMetrics.availableQty > 10 ? 'In Stock' : bundleMetrics.availableQty > 0 ? 'Limited' : 'Out of Stock'}
            </span>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400">Can Build</div>
            <div className={`text-2xl font-bold ${
              bundleMetrics.availableQty > 10 ? 'text-emerald-400' : bundleMetrics.availableQty > 0 ? 'text-amber-400' : 'text-red-400'
            }`}>
              {formatNumber(bundleMetrics.availableQty)}
            </div>
          </div>
        </div>

        {/* Description */}
        {bundle.description && (
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
            <p className="text-slate-300 text-sm">{bundle.description}</p>
          </div>
        )}

        {/* Pricing */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Pricing</h3>
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-1">MSRP</div>
              <div className="text-lg font-bold text-white">{formatCurrency(bundle.prices.msrp)}</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-1">Shopify</div>
              <div className="text-lg font-bold text-white">{formatCurrency(bundle.prices.shopify)}</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-1">Amazon</div>
              <div className="text-lg font-bold text-white">{formatCurrency(bundle.prices.amazon)}</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-1">Wholesale</div>
              <div className="text-lg font-bold text-white">{formatCurrency(bundle.prices.wholesale)}</div>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Cost & Margin</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 text-center">
              <div className="text-xs text-slate-400 mb-1">Component Cost</div>
              <div className="text-xl font-bold text-white">{formatCurrency(bundleMetrics.cost)}</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 text-center">
              <div className="text-xs text-slate-400 mb-1">Profit per Bundle</div>
              <div className="text-xl font-bold text-emerald-400">{formatCurrency(bundle.prices.msrp - bundleMetrics.cost)}</div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 text-center">
              <div className="text-xs text-slate-400 mb-1">Margin</div>
              <div className="text-xl font-bold text-emerald-400">{bundleMetrics.margin.toFixed(1)}%</div>
            </div>
          </div>
        </div>

        {/* Components */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Components ({bundle.components.length})</h3>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr className="text-left text-xs text-slate-400 uppercase">
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium text-center">Qty per Bundle</th>
                  <th className="px-4 py-3 font-medium text-right">Available Stock</th>
                  <th className="px-4 py-3 font-medium text-right">Unit Cost</th>
                  <th className="px-4 py-3 font-medium text-right">Line Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {bundle.components.map(comp => {
                  const product = state.products.find(p => p.id === comp.productId);
                  const stock = getProductStock(comp.productId);
                  const unitCost = product?.cost.rolling || 0;
                  const lineTotal = unitCost * comp.quantity;
                  const hasInsufficientStock = stock < comp.quantity;

                  return (
                    <tr key={comp.productId} className="hover:bg-slate-700/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${hasInsufficientStock ? 'bg-red-400' : 'bg-emerald-400'}`}></div>
                          <div>
                            <div className="text-sm text-white">{comp.productName}</div>
                            <div className="text-xs text-slate-400">{product?.sku || 'Unknown SKU'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-white">
                        x {comp.quantity}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={hasInsufficientStock ? 'text-red-400' : 'text-slate-300'}>
                          {formatNumber(stock)}
                          {hasInsufficientStock && (
                            <i className="fas fa-exclamation-triangle ml-1 text-xs"></i>
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-slate-400">
                        {formatCurrency(unitCost)}
                      </td>
                      <td className="px-4 py-3 text-right text-white">
                        {formatCurrency(lineTotal)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-slate-800/30 border-t border-slate-700">
                <tr>
                  <td colSpan={4} className="px-4 py-3 text-right text-sm font-medium text-slate-400">
                    Total Component Cost:
                  </td>
                  <td className="px-4 py-3 text-right text-lg font-bold text-white">
                    {formatCurrency(bundleMetrics.cost)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Limiting Component Warning */}
          {bundleMetrics.availableQty < 10 && bundleMetrics.limitingComponent && (
            <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <div className="flex items-center gap-2 text-amber-400 text-sm">
                <i className="fas fa-exclamation-triangle"></i>
                <span>Limiting component: <strong>{bundleMetrics.limitingComponent}</strong></span>
              </div>
            </div>
          )}
        </div>

        {/* Assembly Instructions */}
        {bundle.type !== 'virtual' && bundle.assemblyInstructions && (
          <div>
            <h3 className="text-sm font-medium text-white mb-3">Assembly Instructions</h3>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
              <p className="text-slate-300 text-sm whitespace-pre-wrap">{bundle.assemblyInstructions}</p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default BundleDetailModal;
