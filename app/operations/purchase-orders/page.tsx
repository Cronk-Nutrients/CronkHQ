'use client';

import { useState, useMemo } from 'react';
import {
  Clock,
  Truck,
  Package,
  DollarSign,
  Plus,
  Search,
  FileText,
  Check,
  Eye,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Send,
  Edit,
  RefreshCw,
  Download,
} from 'lucide-react';
import { useApp, PurchaseOrder, PurchaseOrderItem } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import { CreatePOModal, ReceivePOModal } from '@/components/modals';
import { PODetailPanel } from '@/components/panels';
import { formatCurrencyPrecise, formatNumber, formatDate } from '@/lib/formatting';
import { Breadcrumb } from '@/components/Breadcrumb';

export default function PurchaseOrdersPage() {
  const { state, dispatch } = useApp();
  const { success, error } = useToast();
  const confirm = useConfirm();

  // UI State
  const [statusFilter, setStatusFilter] = useState('');
  const [supplierFilter, setSupplierFilter] = useState('');
  const [currencyFilter, setCurrencyFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal/Panel State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [editPO, setEditPO] = useState<PurchaseOrder | null>(null);
  const [initialItems, setInitialItems] = useState<PurchaseOrderItem[]>([]);

  // Get unique suppliers
  const suppliers = useMemo(() => {
    const supplierSet = new Set<string>();
    state.purchaseOrders.forEach(po => {
      if (po.supplier) supplierSet.add(po.supplier);
    });
    return Array.from(supplierSet).sort();
  }, [state.purchaseOrders]);

  // Filter POs
  const filteredPOs = useMemo(() => {
    return state.purchaseOrders.filter(po => {
      if (statusFilter && po.status !== statusFilter) return false;
      if (supplierFilter && po.supplier !== supplierFilter) return false;
      if (currencyFilter && po.currency !== currencyFilter) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          po.poNumber.toLowerCase().includes(query) ||
          po.supplier.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [state.purchaseOrders, statusFilter, supplierFilter, currencyFilter, searchQuery]);

  // Stats
  const stats = useMemo(() => {
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return {
      totalPOs: state.purchaseOrders.length,
      openPOs: state.purchaseOrders.filter(po =>
        ['draft', 'sent', 'partial'].includes(po.status)
      ).length,
      pendingValue: state.purchaseOrders
        .filter(po => ['sent', 'partial'].includes(po.status))
        .reduce((sum, po) => sum + po.total, 0),
      receivedThisMonth: state.purchaseOrders.filter(po => {
        if (po.status !== 'received') return false;
        return new Date(po.updatedAt) >= thisMonth;
      }).length,
      draftCount: state.purchaseOrders.filter(po => po.status === 'draft').length,
      sentCount: state.purchaseOrders.filter(po => po.status === 'sent').length,
      partialCount: state.purchaseOrders.filter(po => po.status === 'partial').length,
    };
  }, [state.purchaseOrders]);

  // Get product stock
  const getProductStock = (productId: string) => {
    return state.inventory
      .filter(i => i.productId === productId)
      .reduce((sum, i) => sum + i.quantity, 0);
  };

  // Low stock suggestions
  const lowStockItems = useMemo(() => {
    return state.products
      .filter(product => {
        const totalStock = getProductStock(product.id);
        return totalStock <= product.reorderPoint;
      })
      .map(product => {
        const currentStock = getProductStock(product.id);
        const suggestedQty = Math.max(product.reorderPoint * 2 - currentStock, 1);
        return {
          ...product,
          currentStock,
          suggestedQty,
        };
      })
      .slice(0, 8);
  }, [state.products, state.inventory]);

  // Add low stock item to PO
  const addToPO = (product: typeof lowStockItems[0]) => {
    const newItem: PurchaseOrderItem = {
      productId: product.id,
      productName: product.name,
      sku: product.sku,
      quantity: product.suggestedQty,
      receivedQty: 0,
      unitCost: product.cost.rolling,
    };

    setInitialItems(prev => {
      // Check if already in items
      if (prev.some(i => i.productId === product.id)) {
        return prev;
      }
      return [...prev, newItem];
    });

    if (!showCreateModal) {
      setEditPO(null);
      setShowCreateModal(true);
    }

    success(`Added ${product.name} to PO`);
  };

  // Get status badge
  const getStatusBadge = (status: PurchaseOrder['status']) => {
    switch (status) {
      case 'draft':
        return (
          <span className="px-2 py-1 bg-slate-500/10 text-slate-400 text-xs rounded-full">
            Draft
          </span>
        );
      case 'sent':
        return (
          <span className="px-2 py-1 bg-amber-500/10 text-amber-400 text-xs rounded-full">
            Pending
          </span>
        );
      case 'partial':
        return (
          <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full">
            Partial
          </span>
        );
      case 'received':
        return (
          <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full">
            Received
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded-full">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-slate-500/10 text-slate-400 text-xs rounded-full">
            {status}
          </span>
        );
    }
  };

  // Handle view PO
  const handleViewPO = (po: PurchaseOrder) => {
    setSelectedPO(po);
    setShowDetailPanel(true);
  };

  // Handle edit PO
  const handleEditPO = (po: PurchaseOrder) => {
    if (po.status !== 'draft') {
      error('Only draft POs can be edited');
      return;
    }
    setEditPO(po);
    setInitialItems([]);
    setShowDetailPanel(false);
    setShowCreateModal(true);
  };

  // Handle receive PO
  const handleReceivePO = (po: PurchaseOrder) => {
    setSelectedPO(po);
    setShowDetailPanel(false);
    setShowReceiveModal(true);
  };

  // Handle send PO
  const handleSendPO = async (po: PurchaseOrder) => {
    const confirmed = await confirm({
      title: 'Send Purchase Order',
      message: `Send PO ${po.poNumber} to ${po.supplier}? This will mark it as sent.`,
      confirmText: 'Send PO',
    });

    if (confirmed) {
      const updatedPO: PurchaseOrder = {
        ...po,
        status: 'sent',
        updatedAt: new Date(),
      };
      dispatch({ type: 'UPDATE_PURCHASE_ORDER', payload: updatedPO });
      success(`PO ${po.poNumber} marked as sent`);
    }
  };

  // Handle export
  const handleExport = () => {
    const headers = ['PO Number', 'Supplier', 'Status', 'Currency', 'Items', 'Subtotal', 'Shipping', 'Total', 'Expected Date', 'Created'];
    const rows = filteredPOs.map(po => [
      po.poNumber,
      po.supplier,
      po.status,
      po.currency,
      po.items.length.toString(),
      po.subtotal.toFixed(2),
      po.shipping.toFixed(2),
      po.total.toFixed(2),
      po.expectedDate ? formatDate(po.expectedDate) : '',
      formatDate(po.createdAt),
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `purchase-orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    success('Exported purchase orders to CSV');
  };

  // Close modals and reset state
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setEditPO(null);
    setInitialItems([]);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Operations' }, { label: 'Purchase Orders' }]} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Purchase Orders</h1>
          <p className="text-sm text-slate-400">Manage supplier orders and inventory replenishment</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={() => {
              setEditPO(null);
              setInitialItems([]);
              setShowCreateModal(true);
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New PO
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-6 gap-4">
        <button
          onClick={() => setStatusFilter('')}
          className={`bg-slate-800/50 backdrop-blur border rounded-xl p-4 text-left transition-colors ${
            !statusFilter ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-slate-700/50 hover:border-slate-600'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.totalPOs}</div>
              <div className="text-xs text-slate-400">Total POs</div>
            </div>
          </div>
        </button>

        <button
          onClick={() => setStatusFilter('draft')}
          className={`bg-slate-800/50 backdrop-blur border rounded-xl p-4 text-left transition-colors ${
            statusFilter === 'draft' ? 'border-slate-400/50 bg-slate-500/10' : 'border-slate-700/50 hover:border-slate-600'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-500/20 flex items-center justify-center">
              <Edit className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-300">{stats.draftCount}</div>
              <div className="text-xs text-slate-400">Drafts</div>
            </div>
          </div>
        </button>

        <button
          onClick={() => setStatusFilter('sent')}
          className={`bg-slate-800/50 backdrop-blur border rounded-xl p-4 text-left transition-colors ${
            statusFilter === 'sent' ? 'border-amber-500/50 bg-amber-500/10' : 'border-amber-500/30 hover:border-amber-500/50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">{stats.sentCount}</div>
              <div className="text-xs text-slate-400">Pending</div>
            </div>
          </div>
        </button>

        <button
          onClick={() => setStatusFilter('partial')}
          className={`bg-slate-800/50 backdrop-blur border rounded-xl p-4 text-left transition-colors ${
            statusFilter === 'partial' ? 'border-blue-500/50 bg-blue-500/10' : 'border-blue-500/30 hover:border-blue-500/50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Truck className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">{stats.partialCount}</div>
              <div className="text-xs text-slate-400">Partial</div>
            </div>
          </div>
        </button>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{formatCurrencyPrecise(stats.pendingValue)}</div>
              <div className="text-xs text-slate-400">Pending Value</div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setStatusFilter('received')}
          className={`bg-slate-800/50 backdrop-blur border rounded-xl p-4 text-left transition-colors ${
            statusFilter === 'received' ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-emerald-500/30 hover:border-emerald-500/50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Check className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">{stats.receivedThisMonth}</div>
              <div className="text-xs text-slate-400">Received MTD</div>
            </div>
          </div>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search POs by number or supplier..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50"
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-emerald-500/50"
          >
            <option value="">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="sent">Pending</option>
            <option value="partial">Partial</option>
            <option value="received">Received</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={supplierFilter}
            onChange={e => setSupplierFilter(e.target.value)}
            className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-emerald-500/50"
          >
            <option value="">All Suppliers</option>
            {suppliers.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            value={currencyFilter}
            onChange={e => setCurrencyFilter(e.target.value)}
            className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-emerald-500/50"
          >
            <option value="">All Currencies</option>
            <option value="USD">USD</option>
            <option value="CAD">CAD</option>
          </select>
          {(statusFilter || supplierFilter || currencyFilter || searchQuery) && (
            <button
              onClick={() => {
                setStatusFilter('');
                setSupplierFilter('');
                setCurrencyFilter('');
                setSearchQuery('');
              }}
              className="px-3 py-2.5 text-slate-400 hover:text-white transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* PO Table */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-slate-700/50">
              <tr className="text-left text-xs text-slate-400 uppercase tracking-wider">
                <th className="px-4 py-3 font-medium">PO Number</th>
                <th className="px-4 py-3 font-medium">Supplier</th>
                <th className="px-4 py-3 font-medium">Items</th>
                <th className="px-4 py-3 font-medium text-right">Total</th>
                <th className="px-4 py-3 font-medium">Expected</th>
                <th className="px-4 py-3 font-medium text-center">Status</th>
                <th className="px-4 py-3 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredPOs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-400">
                    {state.purchaseOrders.length === 0
                      ? 'No purchase orders yet. Create your first PO!'
                      : 'No purchase orders match your filters.'
                    }
                  </td>
                </tr>
              ) : (
                filteredPOs.map(po => {
                  const itemCount = po.items.length;
                  const totalUnits = po.items.reduce((sum, item) => sum + item.quantity, 0);
                  const receivedUnits = po.items.reduce((sum, item) => sum + item.receivedQty, 0);

                  return (
                    <tr
                      key={po.id}
                      className="hover:bg-slate-700/30 transition-colors cursor-pointer"
                      onClick={() => handleViewPO(po)}
                    >
                      <td className="px-4 py-4">
                        <div className="font-mono text-sm font-medium text-white">{po.poNumber}</div>
                        <div className="text-xs text-slate-500">{formatDate(po.createdAt)}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-white">{po.supplier}</div>
                        <div className="text-xs text-slate-500">{po.currency}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-white">{itemCount} items</div>
                        <div className="text-xs text-slate-500">
                          {receivedUnits > 0
                            ? `${formatNumber(receivedUnits)}/${formatNumber(totalUnits)} received`
                            : `${formatNumber(totalUnits)} units`
                          }
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="text-sm font-medium text-white">
                          {formatCurrencyPrecise(po.total)}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-white">
                          {po.expectedDate ? formatDate(po.expectedDate) : '-'}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        {getStatusBadge(po.status)}
                      </td>
                      <td className="px-4 py-4">
                        <div
                          className="flex items-center justify-center gap-1"
                          onClick={e => e.stopPropagation()}
                        >
                          <button
                            onClick={() => handleViewPO(po)}
                            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {po.status === 'draft' && (
                            <>
                              <button
                                onClick={() => handleEditPO(po)}
                                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleSendPO(po)}
                                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs rounded-lg"
                              >
                                <Send className="w-3 h-3 inline mr-1" />
                                Send
                              </button>
                            </>
                          )}
                          {(po.status === 'sent' || po.status === 'partial') && (
                            <button
                              onClick={() => handleReceivePO(po)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded-lg"
                            >
                              Receive
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-4 border-t border-slate-700/50 flex items-center justify-between">
          <div className="text-sm text-slate-400">
            Showing <span className="text-white">{filteredPOs.length}</span> of{' '}
            <span className="text-white">{state.purchaseOrders.length}</span> purchase orders
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 rounded-lg transition-colors disabled:opacity-50"
              disabled
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg">
              1
            </button>
            <button
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 rounded-lg transition-colors disabled:opacity-50"
              disabled
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Low Stock Suggestions */}
      {lowStockItems.length > 0 && (
        <div className="bg-slate-800/50 backdrop-blur border border-amber-500/30 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-700/50 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="font-semibold text-white">Low Stock Suggestions</h2>
              <p className="text-xs text-slate-400">Products below reorder point - consider adding to next PO</p>
            </div>
          </div>
          <div className="p-4 grid grid-cols-4 gap-3">
            {lowStockItems.map(item => (
              <div
                key={item.id}
                className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-white truncate">{item.name}</span>
                </div>
                <div className="text-xs text-slate-400 mb-1">SKU: {item.sku}</div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Stock:</span>
                  <span className="text-amber-400 font-medium">
                    {formatNumber(item.currentStock)} / {formatNumber(item.reorderPoint)}
                  </span>
                </div>
                <button
                  onClick={() => addToPO(item)}
                  className="mt-2 w-full px-2 py-1.5 bg-amber-500/20 text-amber-400 text-xs rounded hover:bg-amber-500/30 transition-colors"
                >
                  + Add to PO ({formatNumber(item.suggestedQty)} units)
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create/Edit PO Modal */}
      <CreatePOModal
        isOpen={showCreateModal}
        onClose={handleCloseCreateModal}
        editPO={editPO}
        initialItems={initialItems}
      />

      {/* Receive PO Modal */}
      <ReceivePOModal
        isOpen={showReceiveModal}
        onClose={() => {
          setShowReceiveModal(false);
          setSelectedPO(null);
        }}
        po={selectedPO}
      />

      {/* PO Detail Panel */}
      <PODetailPanel
        isOpen={showDetailPanel}
        onClose={() => {
          setShowDetailPanel(false);
          setSelectedPO(null);
        }}
        po={selectedPO}
        onEdit={handleEditPO}
        onReceive={handleReceivePO}
      />
    </div>
  );
}
