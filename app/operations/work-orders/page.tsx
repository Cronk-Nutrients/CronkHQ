'use client';

import { useState, useMemo } from 'react';
import {
  FileText,
  Calendar,
  Loader2,
  Check,
  Package,
  Settings,
  Plus,
  Search,
  Play,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  ArrowUp,
  Flame,
  Edit,
} from 'lucide-react';
import { useApp, WorkOrder } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import { CreateWorkOrderModal, WorkOrderDetailModal } from '@/components/modals';
import { formatNumber, formatDate } from '@/lib/formatting';
import { Breadcrumb } from '@/components/Breadcrumb';

export default function WorkOrdersPage() {
  const { state, dispatch } = useApp();
  const { success, error } = useToast();
  const confirm = useConfirm();

  // UI State
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedWO, setSelectedWO] = useState<WorkOrder | null>(null);
  const [editWO, setEditWO] = useState<WorkOrder | null>(null);

  // Get product stock
  const getProductStock = (productId: string) => {
    return state.inventory
      .filter(i => i.productId === productId)
      .reduce((sum, i) => sum + i.quantity, 0);
  };

  // Filter work orders
  const filteredWorkOrders = useMemo(() => {
    return state.workOrders.filter(wo => {
      if (statusFilter && wo.status !== statusFilter) return false;
      if (priorityFilter && wo.priority !== priorityFilter) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          wo.woNumber.toLowerCase().includes(query) ||
          wo.outputProductName.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [state.workOrders, statusFilter, priorityFilter, searchQuery]);

  // Stats
  const stats = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    return {
      pending: state.workOrders.filter(wo => wo.status === 'pending').length,
      inProgress: state.workOrders.filter(wo => wo.status === 'in_progress').length,
      completedThisWeek: state.workOrders.filter(wo => {
        if (wo.status !== 'completed' || !wo.completedAt) return false;
        return new Date(wo.completedAt) >= weekAgo;
      }).length,
      unitsProducedThisWeek: state.workOrders
        .filter(wo => {
          if (wo.status !== 'completed' || !wo.completedAt) return false;
          return new Date(wo.completedAt) >= weekAgo;
        })
        .reduce((sum, wo) => sum + wo.quantityProduced, 0),
      unitsInProduction: state.workOrders
        .filter(wo => wo.status === 'in_progress')
        .reduce((sum, wo) => sum + wo.quantityToProduce, 0),
      bomCount: state.bundles.length,
    };
  }, [state.workOrders, state.bundles]);

  // Active work orders
  const activeWorkOrders = useMemo(() => {
    return state.workOrders.filter(wo => wo.status === 'in_progress');
  }, [state.workOrders]);

  // Get status badge
  const getStatusBadge = (status: WorkOrder['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-2 py-1 bg-slate-500/10 text-slate-400 text-xs rounded-full">
            Pending
          </span>
        );
      case 'in_progress':
        return (
          <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full flex items-center gap-1">
            <Loader2 className="w-3 h-3 animate-spin" />
            In Progress
          </span>
        );
      case 'completed':
        return (
          <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full flex items-center gap-1">
            <Check className="w-3 h-3" />
            Completed
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

  // Get priority badge
  const getPriorityBadge = (priority: WorkOrder['priority']) => {
    if (priority === 'normal') return null;

    const styles = {
      high: 'text-amber-400',
      urgent: 'text-red-400',
    };

    const icons = {
      high: ArrowUp,
      urgent: Flame,
    };

    const Icon = icons[priority];

    return (
      <span className={`flex items-center gap-1 text-xs ${styles[priority]}`}>
        <Icon className="w-3 h-3" />
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  // Handle view WO
  const handleViewWO = (wo: WorkOrder) => {
    setSelectedWO(wo);
    setShowDetailModal(true);
  };

  // Handle edit WO
  const handleEditWO = (wo: WorkOrder) => {
    if (wo.status !== 'pending') {
      error('Only pending work orders can be edited');
      return;
    }
    setEditWO(wo);
    setShowDetailModal(false);
    setShowCreateModal(true);
  };

  // Handle start production
  const handleStartProduction = async (wo: WorkOrder) => {
    // Check stock availability
    const canStart = wo.components.every(c => {
      const available = getProductStock(c.productId);
      return available >= c.quantityRequired;
    });

    if (!canStart) {
      error('Insufficient stock to start production');
      return;
    }

    const confirmed = await confirm({
      title: 'Start Production',
      message: `Start production on ${wo.woNumber}? This will deduct components from inventory.`,
      confirmText: 'Start Production',
    });

    if (confirmed) {
      // Deduct components from inventory
      wo.components.forEach(c => {
        const defaultLoc = state.locations.find(l => l.isDefault);
        const locationId = defaultLoc?.id || state.locations[0]?.id || 'loc-1';

        dispatch({
          type: 'ADJUST_STOCK',
          payload: {
            productId: c.productId,
            locationId,
            adjustment: -c.quantityRequired,
          }
        });
      });

      // Update work order status
      const updatedWO: WorkOrder = {
        ...wo,
        status: 'in_progress',
        startedAt: new Date(),
        components: wo.components.map(c => ({
          ...c,
          quantityUsed: c.quantityRequired,
        })),
      };

      dispatch({ type: 'UPDATE_WORK_ORDER', payload: updatedWO });
      success(`Started production on ${wo.woNumber}`);
    }
  };

  // Handle complete
  const handleComplete = async (wo: WorkOrder) => {
    const confirmed = await confirm({
      title: 'Complete Work Order',
      message: `Complete ${wo.woNumber}? This will add ${wo.quantityToProduce} ${wo.outputProductName} to inventory.`,
      confirmText: 'Complete',
    });

    if (confirmed) {
      // Add finished goods to inventory
      const defaultLoc = state.locations.find(l => l.isDefault);
      const locationId = defaultLoc?.id || state.locations[0]?.id || 'loc-1';

      dispatch({
        type: 'ADJUST_STOCK',
        payload: {
          productId: wo.outputProductId,
          locationId,
          adjustment: wo.quantityToProduce,
        }
      });

      // Update work order
      const updatedWO: WorkOrder = {
        ...wo,
        status: 'completed',
        quantityProduced: wo.quantityToProduce,
        completedAt: new Date(),
      };

      dispatch({ type: 'UPDATE_WORK_ORDER', payload: updatedWO });
      success(`${wo.woNumber} completed! ${formatNumber(wo.quantityToProduce)} ${wo.outputProductName} added to inventory`);
    }
  };

  // Handle export
  const handleExport = () => {
    const headers = ['WO Number', 'Output Product', 'Quantity', 'Status', 'Priority', 'Due Date', 'Created'];
    const rows = filteredWorkOrders.map(wo => [
      wo.woNumber,
      wo.outputProductName,
      wo.quantityToProduce.toString(),
      wo.status,
      wo.priority,
      wo.dueDate ? formatDate(wo.dueDate) : '',
      formatDate(wo.createdAt),
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `work-orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    success('Exported work orders to CSV');
  };

  // Close modals
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setEditWO(null);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Operations' }, { label: 'Work Orders' }]} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Work Orders</h1>
          <p className="text-sm text-slate-400">Manage production, labeling, and assembly tasks</p>
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
              setEditWO(null);
              setShowCreateModal(true);
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Work Order
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-6 gap-4">
        <button
          onClick={() => setStatusFilter('pending')}
          className={`bg-slate-800/50 backdrop-blur border rounded-xl p-4 text-left transition-colors ${
            statusFilter === 'pending' ? 'border-slate-400/50 bg-slate-500/10' : 'border-slate-700/50 hover:border-slate-600'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.pending}</div>
              <div className="text-xs text-slate-400">Pending</div>
            </div>
          </div>
        </button>

        <button
          onClick={() => setStatusFilter('in_progress')}
          className={`bg-slate-800/50 backdrop-blur border rounded-xl p-4 text-left transition-colors ${
            statusFilter === 'in_progress' ? 'border-blue-500/50 bg-blue-500/10' : 'border-blue-500/30 hover:border-blue-500/50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">{stats.inProgress}</div>
              <div className="text-xs text-slate-400">In Progress</div>
            </div>
          </div>
        </button>

        <button
          onClick={() => setStatusFilter('completed')}
          className={`bg-slate-800/50 backdrop-blur border rounded-xl p-4 text-left transition-colors ${
            statusFilter === 'completed' ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-emerald-500/30 hover:border-emerald-500/50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Check className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">{stats.completedThisWeek}</div>
              <div className="text-xs text-slate-400">Completed (7d)</div>
            </div>
          </div>
        </button>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
              <Package className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{formatNumber(stats.unitsInProduction)}</div>
              <div className="text-xs text-slate-400">Units in Production</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Package className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">{formatNumber(stats.unitsProducedThisWeek)}</div>
              <div className="text-xs text-slate-400">Produced (7d)</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-purple-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Settings className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">{stats.bomCount}</div>
              <div className="text-xs text-slate-400">Active BOMs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Work Orders */}
      {activeWorkOrders.length > 0 && (
        <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-700/50">
            <h2 className="font-semibold text-white">Active Work Orders</h2>
            <p className="text-xs text-slate-400">Work orders currently in progress</p>
          </div>
          <div className="p-5 grid grid-cols-2 gap-4">
            {activeWorkOrders.map(wo => {
              const progress = 50; // Could be more granular with steps

              return (
                <div
                  key={wo.id}
                  className="bg-slate-800/50 border border-blue-500/30 rounded-xl p-4 cursor-pointer hover:border-blue-500/50 transition-colors"
                  onClick={() => handleViewWO(wo)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-medium text-white">{wo.woNumber}</span>
                      {getStatusBadge(wo.status)}
                    </div>
                    {getPriorityBadge(wo.priority)}
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{wo.outputProductName}</div>
                      <div className="text-xs text-slate-400">{formatNumber(wo.quantityToProduce)} units</div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-blue-400">{progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => handleComplete(wo)}
                      className="flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Complete
                    </button>
                    <button
                      onClick={() => handleViewWO(wo)}
                      className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by WO number or product..."
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
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value)}
            className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-emerald-500/50"
          >
            <option value="">All Priorities</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
          {(statusFilter || priorityFilter || searchQuery) && (
            <button
              onClick={() => {
                setStatusFilter('');
                setPriorityFilter('');
                setSearchQuery('');
              }}
              className="px-3 py-2.5 text-slate-400 hover:text-white transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Work Orders Table */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-slate-700/50">
              <tr className="text-left text-xs text-slate-400 uppercase tracking-wider">
                <th className="px-4 py-3 font-medium">WO Number</th>
                <th className="px-4 py-3 font-medium">Output Product</th>
                <th className="px-4 py-3 font-medium">Quantity</th>
                <th className="px-4 py-3 font-medium">Priority</th>
                <th className="px-4 py-3 font-medium">Due Date</th>
                <th className="px-4 py-3 font-medium text-center">Status</th>
                <th className="px-4 py-3 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredWorkOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-400">
                    {state.workOrders.length === 0
                      ? 'No work orders yet. Create your first work order!'
                      : 'No work orders match your filters.'
                    }
                  </td>
                </tr>
              ) : (
                filteredWorkOrders.map(wo => (
                  <tr
                    key={wo.id}
                    className="hover:bg-slate-700/30 transition-colors cursor-pointer"
                    onClick={() => handleViewWO(wo)}
                  >
                    <td className="px-4 py-4">
                      <div className="font-mono text-sm font-medium text-white">{wo.woNumber}</div>
                      <div className="text-xs text-slate-500">{formatDate(wo.createdAt)}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-white">{wo.outputProductName}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-white">
                        {wo.status === 'completed'
                          ? `${formatNumber(wo.quantityProduced)} / ${formatNumber(wo.quantityToProduce)}`
                          : formatNumber(wo.quantityToProduce)
                        } units
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {getPriorityBadge(wo.priority) || (
                        <span className="text-sm text-slate-400">Normal</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-sm text-white">
                      {wo.dueDate ? formatDate(wo.dueDate) : '-'}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {getStatusBadge(wo.status)}
                    </td>
                    <td className="px-4 py-4">
                      <div
                        className="flex items-center justify-center gap-1"
                        onClick={e => e.stopPropagation()}
                      >
                        <button
                          onClick={() => handleViewWO(wo)}
                          className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {wo.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleEditWO(wo)}
                              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleStartProduction(wo)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded-lg flex items-center gap-1"
                            >
                              <Play className="w-3 h-3" />
                              Start
                            </button>
                          </>
                        )}
                        {wo.status === 'in_progress' && (
                          <button
                            onClick={() => handleComplete(wo)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded-lg flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" />
                            Complete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-4 border-t border-slate-700/50 flex items-center justify-between">
          <div className="text-sm text-slate-400">
            Showing <span className="text-white">{filteredWorkOrders.length}</span> of{' '}
            <span className="text-white">{state.workOrders.length}</span> work orders
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

      {/* BOM Templates */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-700/50 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-white">Available BOMs (Bundles)</h2>
            <p className="text-xs text-slate-400">Bundles can be used as Bill of Materials for work orders</p>
          </div>
        </div>
        <div className="p-4 grid grid-cols-4 gap-4">
          {state.bundles.slice(0, 8).map(bundle => {
            // Calculate can build
            let canBuild = Infinity;
            bundle.components.forEach(c => {
              const stock = getProductStock(c.productId);
              const possible = Math.floor(stock / c.quantity);
              canBuild = Math.min(canBuild, possible);
            });
            if (canBuild === Infinity) canBuild = 0;

            return (
              <div
                key={bundle.id}
                className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 hover:border-emerald-500/30 transition-colors cursor-pointer"
                onClick={() => {
                  setEditWO(null);
                  setShowCreateModal(true);
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-purple-500/20 rounded flex items-center justify-center">
                    <Package className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="font-medium text-white truncate">{bundle.name}</span>
                </div>
                <div className="text-xs text-slate-400 mb-2">
                  {bundle.components.length} components
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Can build:</span>
                  <span className={canBuild > 0 ? 'text-emerald-400' : 'text-red-400'}>
                    {formatNumber(canBuild)} units
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Work Order Modal */}
      <CreateWorkOrderModal
        isOpen={showCreateModal}
        onClose={handleCloseCreateModal}
        editWO={editWO}
      />

      {/* Work Order Detail Modal */}
      <WorkOrderDetailModal
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedWO(null);
        }}
        workOrder={selectedWO}
        onEdit={handleEditWO}
      />
    </div>
  );
}
