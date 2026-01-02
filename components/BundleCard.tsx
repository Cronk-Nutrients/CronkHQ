'use client';

import { useMemo } from 'react';
import { useApp, Bundle } from '@/context/AppContext';
import { formatCurrency, formatNumber } from '@/lib/formatting';

interface BundleCardProps {
  bundle: Bundle;
  onClick: () => void;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

export function BundleCard({ bundle, onClick, onEdit, onDelete }: BundleCardProps) {
  const { state } = useApp();

  // Get total stock for a product
  const getProductStock = (productId: string) => {
    return state.inventory
      .filter(i => i.productId === productId)
      .reduce((sum, i) => sum + i.quantity, 0);
  };

  // Calculate bundle metrics
  const bundleMetrics = useMemo(() => {
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

  // Get status
  const getStatus = () => {
    if (bundleMetrics.availableQty === 0) {
      return { text: 'Out of Stock', color: 'red' };
    } else if (bundleMetrics.availableQty <= 10) {
      return { text: 'Limited', color: 'amber' };
    }
    return { text: 'In Stock', color: 'emerald' };
  };

  const status = getStatus();

  // Get bundle type badge
  const getBundleTypeBadge = () => {
    switch (bundle.type) {
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

  return (
    <div
      onClick={onClick}
      className={`bg-slate-800/50 backdrop-blur border rounded-xl overflow-hidden cursor-pointer transition-all hover:border-slate-600 group ${
        status.color === 'emerald' ? 'border-emerald-500/30' :
        status.color === 'amber' ? 'border-amber-500/30' : 'border-red-500/30'
      } ${status.color === 'red' ? 'opacity-80' : ''}`}
    >
      {/* Header */}
      <div className={`px-5 py-4 border-b border-slate-700/50 ${
        status.color === 'emerald' ? 'bg-emerald-500/5' :
        status.color === 'amber' ? 'bg-amber-500/5' : 'bg-red-500/5'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <i className="fas fa-layer-group text-amber-400 text-xl"></i>
            </div>
            <div>
              <h3 className="font-bold text-white">{bundle.name}</h3>
              <div className="text-xs text-slate-400">SKU: {bundle.sku}</div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            {getBundleTypeBadge()}
            <span className={`px-2 py-1 text-xs rounded-full ${
              status.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' :
              status.color === 'amber' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
            }`}>
              {status.text}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        {/* Components Summary */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">
            <i className="fas fa-cubes mr-2"></i>
            {bundle.components.length} component{bundle.components.length !== 1 ? 's' : ''}
          </span>
          <span className={`font-medium ${
            bundleMetrics.availableQty > 10 ? 'text-emerald-400' :
            bundleMetrics.availableQty > 0 ? 'text-amber-400' : 'text-red-400'
          }`}>
            Can build: {formatNumber(bundleMetrics.availableQty)}
          </span>
        </div>

        {/* Component Preview */}
        <div className="space-y-1">
          {bundle.components.slice(0, 2).map((comp, idx) => {
            const stock = getProductStock(comp.productId);
            const hasStock = stock >= comp.quantity;
            return (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${hasStock ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
                  <span className="text-slate-300 truncate">{comp.productName}</span>
                </div>
                <span className="text-slate-400 flex-shrink-0 ml-2">x{comp.quantity}</span>
              </div>
            );
          })}
          {bundle.components.length > 2 && (
            <div className="text-xs text-slate-500">+{bundle.components.length - 2} more</div>
          )}
        </div>

        {/* Pricing & Margin */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
          <div>
            <div className="text-xs text-slate-400">Price</div>
            <div className="text-lg font-bold text-white">{formatCurrency(bundle.prices.msrp)}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400">Margin</div>
            <div className={`text-lg font-bold ${
              bundleMetrics.margin >= 50 ? 'text-emerald-400' :
              bundleMetrics.margin >= 30 ? 'text-amber-400' : 'text-red-400'
            }`}>
              {bundleMetrics.margin.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors"
          >
            <i className="fas fa-edit mr-1"></i>
            Edit
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-2 bg-slate-700 hover:bg-red-500/20 text-slate-300 hover:text-red-400 rounded-lg text-sm transition-colors"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BundleCard;
