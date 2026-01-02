'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp, StockCount, StockCountItem } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/formatting';

// Status configuration
const statusConfig: Record<StockCount['status'], { color: string; icon: string; label: string }> = {
  draft: { color: 'slate', icon: 'fa-file', label: 'Draft' },
  in_progress: { color: 'blue', icon: 'fa-spinner', label: 'In Progress' },
  completed: { color: 'emerald', icon: 'fa-check-circle', label: 'Completed' },
  cancelled: { color: 'red', icon: 'fa-times-circle', label: 'Cancelled' },
};

// Type labels
const typeConfig: Record<StockCount['type'], { label: string; color: string }> = {
  full: { label: 'Full Count', color: 'purple' },
  cycle: { label: 'Cycle Count', color: 'blue' },
  spot: { label: 'Spot Check', color: 'amber' },
};

export default function StockCountDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { state, dispatch } = useApp();
  const { success, warning, error } = useToast();

  // View mode
  const [viewMode, setViewMode] = useState<'list' | 'scan'>('list');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [countInput, setCountInput] = useState('');

  // Completion modal
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [applyAdjustments, setApplyAdjustments] = useState(true);

  // Find the stock count
  const stockCount = useMemo(() => {
    return state.stockCounts.find(sc => sc.id === params.id);
  }, [state.stockCounts, params.id]);

  // Loading state
  if (state.isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-slate-800/50 rounded w-48"></div>
        <div className="h-64 bg-slate-800/50 rounded-xl"></div>
      </div>
    );
  }

  // Not found
  if (!stockCount) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <i className="fas fa-clipboard-check text-6xl text-slate-600 mb-4"></i>
        <h2 className="text-xl font-bold text-white mb-2">Stock Count Not Found</h2>
        <p className="text-slate-400 mb-6">The stock count you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/inventory/counts" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors">
          Back to Stock Counts
        </Link>
      </div>
    );
  }

  const { summary, items } = stockCount;
  const progress = summary.totalItems > 0 ? (summary.countedItems / summary.totalItems) * 100 : 0;
  const pendingItems = items.filter(i => i.status === 'pending');
  const currentItem = pendingItems[currentIndex] || items[currentIndex];

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get status badge
  const getStatusBadge = (status: StockCount['status']) => {
    const config = statusConfig[status];
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1.5 bg-${config.color}-500/10 text-${config.color}-400 text-sm font-medium rounded-full border border-${config.color}-500/20`}>
        <i className={`fas ${config.icon}`}></i>
        {config.label}
      </span>
    );
  };

  // Calculate summary
  const calculateSummary = (updatedItems: StockCountItem[]) => {
    const countedItems = updatedItems.filter(i => i.status === 'counted').length;
    const matchedItems = updatedItems.filter(i => i.status === 'counted' && i.variance === 0).length;
    const discrepancyItems = updatedItems.filter(i => i.status === 'counted' && i.variance !== 0).length;
    const totalVariance = updatedItems
      .filter(i => i.status === 'counted')
      .reduce((sum, i) => sum + i.varianceValue, 0);

    return { totalItems: updatedItems.length, countedItems, matchedItems, discrepancyItems, totalVariance };
  };

  // Start count
  const handleStartCount = () => {
    dispatch({
      type: 'UPDATE_STOCK_COUNT',
      payload: {
        ...stockCount,
        status: 'in_progress',
        startedAt: new Date(),
        updatedAt: new Date(),
      },
    });
    success('Stock count started');
  };

  // Submit count for an item
  const submitCount = (qty: number, itemToCount?: StockCountItem) => {
    const item = itemToCount || currentItem;
    if (!item) return;

    const variance = qty - item.systemQty;
    const product = state.products.find(p => p.id === item.productId);
    const varianceValue = variance * (product?.cost.rolling || 0);

    const updatedItem: StockCountItem = {
      ...item,
      countedQty: qty,
      variance,
      varianceValue,
      status: 'counted',
      countedAt: new Date(),
    };

    const updatedItems = stockCount.items.map(i =>
      i.productId === item.productId ? updatedItem : i
    );

    const updatedSummary = calculateSummary(updatedItems);

    dispatch({
      type: 'UPDATE_STOCK_COUNT',
      payload: {
        ...stockCount,
        items: updatedItems,
        summary: updatedSummary,
        updatedAt: new Date(),
      },
    });

    // Show variance feedback
    if (variance !== 0) {
      warning(`Variance: ${variance > 0 ? '+' : ''}${variance} (${formatCurrency(varianceValue)})`);
    } else {
      success('Item counted - matches system qty');
    }

    // Move to next pending item in scan mode
    if (viewMode === 'scan') {
      setCountInput('');
      const nextPending = updatedItems.findIndex(i => i.status === 'pending');
      if (nextPending >= 0) {
        setCurrentIndex(nextPending);
      } else if (updatedSummary.countedItems === updatedSummary.totalItems) {
        setShowCompletionModal(true);
      }
    }
  };

  // Skip item
  const skipItem = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCountInput('');
    }
  };

  // Navigate items
  const prevItem = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCountInput('');
    }
  };

  const nextItem = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCountInput('');
    }
  };

  // Complete count
  const handleComplete = () => {
    if (applyAdjustments) {
      const discrepancyItems = items.filter(i => i.status === 'counted' && i.variance !== 0);
      discrepancyItems.forEach(item => {
        dispatch({
          type: 'ADJUST_STOCK',
          payload: {
            productId: item.productId,
            locationId: stockCount.location,
            adjustment: item.variance,
          },
        });
      });
      success(`Applied ${discrepancyItems.length} inventory adjustments`);
    }

    dispatch({
      type: 'UPDATE_STOCK_COUNT',
      payload: {
        ...stockCount,
        status: 'completed',
        completedAt: new Date(),
        updatedAt: new Date(),
      },
    });

    success(`Stock count ${stockCount.countNumber} completed`);
    router.push('/inventory/counts');
  };

  // Cancel count
  const handleCancel = () => {
    dispatch({
      type: 'UPDATE_STOCK_COUNT',
      payload: {
        ...stockCount,
        status: 'cancelled',
        updatedAt: new Date(),
      },
    });
    warning(`Stock count ${stockCount.countNumber} cancelled`);
    router.push('/inventory/counts');
  };

  // Export count
  const handleExport = () => {
    const headers = ['Bin', 'Product', 'SKU', 'System Qty', 'Counted Qty', 'Variance', 'Variance $', 'Status'];
    const rows = items.map(item => [
      item.binLocation || '-',
      item.productName,
      item.sku,
      item.systemQty,
      item.countedQty ?? '-',
      item.countedQty !== null ? item.variance : '-',
      item.countedQty !== null ? item.varianceValue.toFixed(2) : '-',
      item.status,
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${stockCount.countNumber}-export.csv`;
    a.click();
    URL.revokeObjectURL(url);
    success('Count exported');
  };

  const discrepancyItems = items.filter(i => i.status === 'counted' && i.variance !== 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/inventory/counts"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <i className="fas fa-arrow-left"></i>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white">{stockCount.countNumber}</h1>
              {getStatusBadge(stockCount.status)}
              <span className={`inline-flex items-center px-2 py-0.5 bg-${typeConfig[stockCount.type].color}-500/10 text-${typeConfig[stockCount.type].color}-400 text-xs font-medium rounded border border-${typeConfig[stockCount.type].color}-500/20`}>
                {typeConfig[stockCount.type].label}
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              {stockCount.name} &bull; {stockCount.locationName}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {stockCount.status === 'draft' && (
            <button
              onClick={handleStartCount}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <i className="fas fa-play"></i>
              Start Count
            </button>
          )}
          {stockCount.status === 'in_progress' && (
            <>
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors flex items-center gap-2"
              >
                <i className="fas fa-download"></i>
                Export
              </button>
              <button
                onClick={() => setShowCompletionModal(true)}
                disabled={summary.countedItems === 0}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <i className="fas fa-check"></i>
                Complete Count
              </button>
            </>
          )}
          {stockCount.status === 'completed' && (
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors flex items-center gap-2"
            >
              <i className="fas fa-download"></i>
              Export
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Progress</h3>
          <span className="text-slate-400">{summary.countedItems} of {summary.totalItems} items counted</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
          <div
            className={`rounded-full h-3 transition-all ${stockCount.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-500'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">{Math.round(progress)}% complete</span>
          <span className={summary.discrepancyItems > 0 ? 'text-amber-400' : 'text-emerald-400'}>
            {summary.discrepancyItems} discrepancies
          </span>
        </div>
      </div>

      {/* View Mode Toggle */}
      {stockCount.status === 'in_progress' && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              viewMode === 'list'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <i className="fas fa-list"></i>
            List View
          </button>
          <button
            onClick={() => setViewMode('scan')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              viewMode === 'scan'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <i className="fas fa-barcode"></i>
            Scan Mode
          </button>
        </div>
      )}

      {/* List View */}
      {(viewMode === 'list' || stockCount.status !== 'in_progress') && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Bin</th>
                <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Product</th>
                <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">SKU</th>
                <th className="text-center p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">System Qty</th>
                <th className="text-center p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Count</th>
                <th className="text-center p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Variance</th>
                <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={item.productId} className="border-b border-slate-700/30 hover:bg-slate-700/30 transition-colors">
                  <td className="p-4 text-slate-300 font-mono">{item.binLocation || '-'}</td>
                  <td className="p-4 text-white">{item.productName}</td>
                  <td className="p-4 text-slate-400 font-mono">{item.sku}</td>
                  <td className="p-4 text-center text-slate-300">{item.systemQty}</td>
                  <td className="p-4 text-center">
                    {stockCount.status === 'in_progress' && item.status === 'pending' ? (
                      <input
                        type="number"
                        min="0"
                        placeholder="--"
                        className="w-20 bg-slate-700/50 border border-slate-600 rounded px-2 py-1 text-center text-white focus:outline-none focus:border-emerald-500"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const value = parseInt((e.target as HTMLInputElement).value);
                            if (!isNaN(value)) {
                              submitCount(value, item);
                              (e.target as HTMLInputElement).value = '';
                            }
                          }
                        }}
                      />
                    ) : (
                      <span className="text-white">{item.countedQty ?? '--'}</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {item.status === 'counted' ? (
                      <span className={item.variance === 0 ? 'text-emerald-400' : item.variance > 0 ? 'text-emerald-400' : 'text-red-400'}>
                        {item.variance === 0 ? '0' : (item.variance > 0 ? '+' : '') + item.variance}
                      </span>
                    ) : (
                      <span className="text-slate-500">--</span>
                    )}
                  </td>
                  <td className="p-4">
                    {item.status === 'pending' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-500/20 text-slate-400 text-xs rounded-full">
                        <i className="fas fa-clock text-[10px]"></i>
                        Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                        <i className="fas fa-check text-[10px]"></i>
                        Counted
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Scan Mode */}
      {viewMode === 'scan' && stockCount.status === 'in_progress' && currentItem && (
        <div className="max-w-md mx-auto">
          {/* Current Item Card */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-emerald-400 mb-2">
              {currentItem.binLocation || 'N/A'}
            </div>
            <div className="text-xl text-white">{currentItem.productName}</div>
            <div className="text-slate-400 font-mono">{currentItem.sku}</div>
            <div className="text-sm text-slate-500 mt-2">
              System Qty: <span className="text-white font-medium">{currentItem.systemQty}</span>
            </div>
            {currentItem.status === 'counted' && (
              <div className="mt-2 text-emerald-400">
                <i className="fas fa-check-circle mr-1"></i>
                Counted: {currentItem.countedQty}
              </div>
            )}
          </div>

          {/* Count Input */}
          {currentItem.status === 'pending' && (
            <>
              <div className="mt-6">
                <input
                  type="number"
                  min="0"
                  value={countInput}
                  onChange={(e) => setCountInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && countInput !== '') {
                      submitCount(parseInt(countInput));
                    }
                  }}
                  placeholder="Enter count..."
                  className="w-full text-center text-3xl py-4 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  autoFocus
                />
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <button
                  onClick={() => submitCount(0)}
                  className="p-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors font-medium"
                >
                  Zero
                </button>
                <button
                  onClick={() => submitCount(currentItem.systemQty)}
                  className="p-3 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-colors font-medium"
                >
                  Match
                </button>
                <button
                  onClick={skipItem}
                  className="p-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors font-medium"
                >
                  Skip
                </button>
              </div>
            </>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6 text-slate-400">
            <button
              onClick={prevItem}
              disabled={currentIndex === 0}
              className="px-4 py-2 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Previous
            </button>
            <span>{currentIndex + 1} / {items.length}</span>
            <button
              onClick={nextItem}
              disabled={currentIndex === items.length - 1}
              className="px-4 py-2 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>
      )}

      {/* Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCompletionModal(false)}></div>
            <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl w-full max-w-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Complete Stock Count</h3>

              {/* Summary */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-slate-800 rounded-lg">
                  <div className="text-2xl font-bold text-white">{summary.matchedItems}</div>
                  <div className="text-sm text-slate-400">Items Matched</div>
                </div>
                <div className="p-4 bg-amber-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-amber-400">{summary.discrepancyItems}</div>
                  <div className="text-sm text-slate-400">Discrepancies</div>
                </div>
              </div>

              {/* Discrepancy Items */}
              {discrepancyItems.length > 0 && (
                <>
                  <h4 className="text-sm font-medium text-slate-300 mb-2">Discrepancy Items</h4>
                  <div className="max-h-60 overflow-y-auto space-y-2 mb-4">
                    {discrepancyItems.map(item => (
                      <div key={item.productId} className="flex justify-between p-3 bg-slate-800 rounded-lg">
                        <div>
                          <div className="text-white">{item.productName}</div>
                          <div className="text-sm text-slate-400">
                            System: {item.systemQty} &rarr; Counted: {item.countedQty}
                          </div>
                        </div>
                        <div className={`text-right ${item.variance > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          <div>{item.variance > 0 ? '+' : ''}{item.variance}</div>
                          <div className="text-sm">{formatCurrency(item.varianceValue)}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border border-slate-700 rounded-lg mb-4">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Total Variance Value:</span>
                      <span className={summary.totalVariance >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                        {formatCurrency(summary.totalVariance)}
                      </span>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 mb-6 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={applyAdjustments}
                      onChange={(e) => setApplyAdjustments(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span className="text-slate-300">Apply inventory adjustments for discrepancies</span>
                  </label>
                </>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCompletionModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors"
                >
                  Review More
                </button>
                <button
                  onClick={handleComplete}
                  className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
                >
                  Complete Count
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
