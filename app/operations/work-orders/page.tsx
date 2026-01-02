'use client';

import { useState, useMemo } from 'react';
import {
  FileText,
  Loader2,
  Check,
  Package,
  Settings,
  Plus,
  Play,
  Eye,
  Download,
  Edit,
} from 'lucide-react';
import { useApp, WorkOrder } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import { CreateWorkOrderModal, WorkOrderDetailModal } from '@/components/modals';
import { formatNumber, formatDate } from '@/lib/formatting';
import { Breadcrumb } from '@/components/Breadcrumb';
import {
  WOStatusBadge,
  PriorityBadge,
  OperationsStatCard,
  OperationsStatsGrid,
  SearchInput,
  FilterSelect,
  FilterBar,
  PaginationFooter,
} from '@/components/operations';

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
        .filter(wo => wo.status === 'completed' && wo.completedAt && new Date(wo.completedAt) >= weekAgo)
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

  // Handlers
  const handleViewWO = (wo: WorkOrder) => {
    setSelectedWO(wo);
    setShowDetailModal(true);
  };

  const handleEditWO = (wo: WorkOrder) => {
    if (wo.status !== 'pending') {
      error('Only pending work orders can be edited');
      return;
    }
    setEditWO(wo);
    setShowDetailModal(false);
    setShowCreateModal(true);
  };

  const handleStartProduction = async (wo: WorkOrder) => {
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
      wo.components.forEach(c => {
        const defaultLoc = state.locations.find(l => l.isDefault);
        const locationId = defaultLoc?.id || state.locations[0]?.id || 'loc-1';

        dispatch({
          type: 'ADJUST_STOCK',
          payload: { productId: c.productId, locationId, adjustment: -c.quantityRequired },
        });
      });

      dispatch({
        type: 'UPDATE_WORK_ORDER',
        payload: {
          ...wo,
          status: 'in_progress',
          startedAt: new Date(),
          components: wo.components.map(c => ({ ...c, quantityUsed: c.quantityRequired })),
        },
      });
      success(`Started production on ${wo.woNumber}`);
    }
  };

  const handleComplete = async (wo: WorkOrder) => {
    const confirmed = await confirm({
      title: 'Complete Work Order',
      message: `Complete ${wo.woNumber}? This will add ${wo.quantityToProduce} ${wo.outputProductName} to inventory.`,
      confirmText: 'Complete',
    });

    if (confirmed) {
      const defaultLoc = state.locations.find(l => l.isDefault);
      const locationId = defaultLoc?.id || state.locations[0]?.id || 'loc-1';

      dispatch({
        type: 'ADJUST_STOCK',
        payload: { productId: wo.outputProductId, locationId, adjustment: wo.quantityToProduce },
      });

      dispatch({
        type: 'UPDATE_WORK_ORDER',
        payload: { ...wo, status: 'completed', quantityProduced: wo.quantityToProduce, completedAt: new Date() },
      });
      success(`${wo.woNumber} completed! ${formatNumber(wo.quantityToProduce)} ${wo.outputProductName} added to inventory`);
    }
  };

  const handleExport = () => {
    const headers = ['WO Number', 'Output Product', 'Quantity', 'Status', 'Priority', 'Due Date', 'Created'];
    const rows = filteredWorkOrders.map(wo => [
      wo.woNumber, wo.outputProductName, wo.quantityToProduce.toString(),
      wo.status, wo.priority, wo.dueDate ? formatDate(wo.dueDate) : '', formatDate(wo.createdAt),
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

  const clearFilters = () => {
    setStatusFilter('');
    setPriorityFilter('');
    setSearchQuery('');
  };

  const hasFilters = !!(statusFilter || priorityFilter || searchQuery);

  return (
    <div className="space-y-6">
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
            onClick={() => { setEditWO(null); setShowCreateModal(true); }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Work Order
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <OperationsStatsGrid>
        <OperationsStatCard icon={FileText} iconColor="slate" value={stats.pending} label="Pending" onClick={() => setStatusFilter('pending')} isActive={statusFilter === 'pending'} />
        <OperationsStatCard icon={Loader2} iconColor="blue" value={stats.inProgress} label="In Progress" onClick={() => setStatusFilter('in_progress')} isActive={statusFilter === 'in_progress'} accentBorder />
        <OperationsStatCard icon={Check} iconColor="emerald" value={stats.completedThisWeek} label="Completed (7d)" onClick={() => setStatusFilter('completed')} isActive={statusFilter === 'completed'} accentBorder />
        <OperationsStatCard icon={Package} iconColor="slate" value={formatNumber(stats.unitsInProduction)} label="Units in Production" />
        <OperationsStatCard icon={Package} iconColor="amber" value={formatNumber(stats.unitsProducedThisWeek)} label="Produced (7d)" accentBorder />
        <OperationsStatCard icon={Settings} iconColor="purple" value={stats.bomCount} label="Active BOMs" accentBorder />
      </OperationsStatsGrid>

      {/* Active Work Orders */}
      {activeWorkOrders.length > 0 && (
        <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-700/50">
            <h2 className="font-semibold text-white">Active Work Orders</h2>
            <p className="text-xs text-slate-400">Work orders currently in progress</p>
          </div>
          <div className="p-5 grid grid-cols-2 gap-4">
            {activeWorkOrders.map(wo => (
              <div
                key={wo.id}
                className="bg-slate-800/50 border border-blue-500/30 rounded-xl p-4 cursor-pointer hover:border-blue-500/50 transition-colors"
                onClick={() => handleViewWO(wo)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-medium text-white">{wo.woNumber}</span>
                    <WOStatusBadge status={wo.status} />
                  </div>
                  <PriorityBadge priority={wo.priority} />
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
                    <span className="text-blue-400">50%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '50%' }} />
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
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <FilterBar onClear={clearFilters} showClear={hasFilters}>
        <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search by WO number or product..." />
        <FilterSelect
          value={statusFilter}
          onChange={setStatusFilter}
          placeholder="All Statuses"
          options={[
            { value: 'pending', label: 'Pending' },
            { value: 'in_progress', label: 'In Progress' },
            { value: 'completed', label: 'Completed' },
            { value: 'cancelled', label: 'Cancelled' },
          ]}
        />
        <FilterSelect
          value={priorityFilter}
          onChange={setPriorityFilter}
          placeholder="All Priorities"
          options={[
            { value: 'normal', label: 'Normal' },
            { value: 'high', label: 'High' },
            { value: 'urgent', label: 'Urgent' },
          ]}
        />
      </FilterBar>

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
                      : 'No work orders match your filters.'}
                  </td>
                </tr>
              ) : (
                filteredWorkOrders.map(wo => (
                  <tr key={wo.id} className="hover:bg-slate-700/30 transition-colors cursor-pointer" onClick={() => handleViewWO(wo)}>
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
                          : formatNumber(wo.quantityToProduce)} units
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <PriorityBadge priority={wo.priority} />
                      {wo.priority === 'normal' && <span className="text-sm text-slate-400">Normal</span>}
                    </td>
                    <td className="px-4 py-4 text-sm text-white">
                      {wo.dueDate ? formatDate(wo.dueDate) : '-'}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <WOStatusBadge status={wo.status} />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-1" onClick={e => e.stopPropagation()}>
                        <button onClick={() => handleViewWO(wo)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        {wo.status === 'pending' && (
                          <>
                            <button onClick={() => handleEditWO(wo)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors" title="Edit">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleStartProduction(wo)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded-lg flex items-center gap-1"
                            >
                              <Play className="w-3 h-3" />Start
                            </button>
                          </>
                        )}
                        {wo.status === 'in_progress' && (
                          <button
                            onClick={() => handleComplete(wo)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded-lg flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" />Complete
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
        <PaginationFooter showing={filteredWorkOrders.length} total={state.workOrders.length} label="work orders" />
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
            let canBuild = Infinity;
            bundle.components.forEach(c => {
              const stock = getProductStock(c.productId);
              canBuild = Math.min(canBuild, Math.floor(stock / c.quantity));
            });
            if (canBuild === Infinity) canBuild = 0;

            return (
              <div
                key={bundle.id}
                className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 hover:border-emerald-500/30 transition-colors cursor-pointer"
                onClick={() => { setEditWO(null); setShowCreateModal(true); }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-purple-500/20 rounded flex items-center justify-center">
                    <Package className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="font-medium text-white truncate">{bundle.name}</span>
                </div>
                <div className="text-xs text-slate-400 mb-2">{bundle.components.length} components</div>
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

      {/* Modals */}
      <CreateWorkOrderModal isOpen={showCreateModal} onClose={() => { setShowCreateModal(false); setEditWO(null); }} editWO={editWO} />
      <WorkOrderDetailModal isOpen={showDetailModal} onClose={() => { setShowDetailModal(false); setSelectedWO(null); }} workOrder={selectedWO} onEdit={handleEditWO} />
    </div>
  );
}
