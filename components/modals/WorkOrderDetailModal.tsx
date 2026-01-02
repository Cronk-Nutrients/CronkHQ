'use client';

import { useMemo } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useApp, WorkOrder } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import { formatNumber, formatDate, formatDateTime } from '@/lib/formatting';
import {
  Package,
  Play,
  Check,
  X,
  AlertTriangle,
  Clock,
  Calendar,
  FileText,
  ArrowUp,
  Flame,
} from 'lucide-react';

interface WorkOrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  workOrder: WorkOrder | null;
  onEdit?: (wo: WorkOrder) => void;
}

export function WorkOrderDetailModal({ isOpen, onClose, workOrder, onEdit }: WorkOrderDetailModalProps) {
  const { state, dispatch } = useApp();
  const { success, error, warning } = useToast();
  const confirm = useConfirm();

  // Get product stock
  const getProductStock = (productId: string) => {
    return state.inventory
      .filter(i => i.productId === productId)
      .reduce((sum, i) => sum + i.quantity, 0);
  };

  // Check stock availability for starting
  const stockCheck = useMemo(() => {
    if (!workOrder) return { canStart: true, shortComponents: [] };

    const shortComponents = workOrder.components.filter(c => {
      const available = getProductStock(c.productId);
      return available < c.quantityRequired;
    });

    return {
      canStart: shortComponents.length === 0,
      shortComponents,
    };
  }, [workOrder, state.inventory]);

  // Get status badge
  const getStatusBadge = (status: WorkOrder['status']) => {
    const styles = {
      pending: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
      in_progress: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
    };

    const labels = {
      pending: 'Pending',
      in_progress: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled',
    };

    return (
      <span className={`px-3 py-1 text-sm rounded-full border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
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
      <span className={`flex items-center gap-1 ${styles[priority]}`}>
        <Icon className="w-4 h-4" />
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  // Handle start production
  const handleStartProduction = async () => {
    if (!workOrder) return;

    if (!stockCheck.canStart) {
      error('Insufficient stock to start production');
      return;
    }

    const confirmed = await confirm({
      title: 'Start Production',
      message: `Start production on ${workOrder.woNumber}? This will deduct components from inventory.`,
      confirmText: 'Start Production',
    });

    if (confirmed) {
      // Deduct components from inventory
      workOrder.components.forEach(c => {
        // Find the default location
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
        ...workOrder,
        status: 'in_progress',
        startedAt: new Date(),
        components: workOrder.components.map(c => ({
          ...c,
          quantityUsed: c.quantityRequired,
        })),
      };

      dispatch({ type: 'UPDATE_WORK_ORDER', payload: updatedWO });
      success(`Started production on ${workOrder.woNumber}`);
      onClose();
    }
  };

  // Handle complete
  const handleComplete = async () => {
    if (!workOrder) return;

    const confirmed = await confirm({
      title: 'Complete Work Order',
      message: `Complete ${workOrder.woNumber}? This will add ${workOrder.quantityToProduce} ${workOrder.outputProductName} to inventory.`,
      confirmText: 'Complete',
    });

    if (confirmed) {
      // Add finished goods to inventory
      const defaultLoc = state.locations.find(l => l.isDefault);
      const locationId = defaultLoc?.id || state.locations[0]?.id || 'loc-1';

      dispatch({
        type: 'ADJUST_STOCK',
        payload: {
          productId: workOrder.outputProductId,
          locationId,
          adjustment: workOrder.quantityToProduce,
        }
      });

      // Update work order
      const updatedWO: WorkOrder = {
        ...workOrder,
        status: 'completed',
        quantityProduced: workOrder.quantityToProduce,
        completedAt: new Date(),
      };

      dispatch({ type: 'UPDATE_WORK_ORDER', payload: updatedWO });
      success(`${workOrder.woNumber} completed! ${formatNumber(workOrder.quantityToProduce)} ${workOrder.outputProductName} added to inventory`);
      onClose();
    }
  };

  // Handle cancel
  const handleCancel = async () => {
    if (!workOrder) return;

    const message = workOrder.status === 'in_progress'
      ? `Cancel ${workOrder.woNumber}? Components have already been deducted and will NOT be returned.`
      : `Cancel ${workOrder.woNumber}?`;

    const confirmed = await confirm({
      title: 'Cancel Work Order',
      message,
      confirmText: 'Cancel Work Order',
      destructive: true,
    });

    if (confirmed) {
      const updatedWO: WorkOrder = {
        ...workOrder,
        status: 'cancelled',
      };

      dispatch({ type: 'UPDATE_WORK_ORDER', payload: updatedWO });
      success(`${workOrder.woNumber} cancelled`);
      onClose();
    }
  };

  if (!workOrder) return null;

  // Calculate progress
  const progress = workOrder.status === 'completed' ? 100 :
    workOrder.status === 'in_progress' ? 50 : 0;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={workOrder.woNumber}
      subtitle={workOrder.outputProductName}
      size="lg"
      footer={
        <>
          {/* Actions based on status */}
          {workOrder.status === 'pending' && (
            <>
              <Button variant="secondary" onClick={() => onEdit?.(workOrder)}>
                Edit
              </Button>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleStartProduction} disabled={!stockCheck.canStart}>
                <Play className="w-4 h-4" />
                Start Production
              </Button>
            </>
          )}
          {workOrder.status === 'in_progress' && (
            <>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleComplete}>
                <Check className="w-4 h-4" />
                Complete
              </Button>
            </>
          )}
          {(workOrder.status === 'completed' || workOrder.status === 'cancelled') && (
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          )}
        </>
      }
    >
      <div className="space-y-6">
        {/* Status & Priority */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getStatusBadge(workOrder.status)}
            {getPriorityBadge(workOrder.priority)}
          </div>
        </div>

        {/* Progress (for in_progress) */}
        {workOrder.status === 'in_progress' && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Production Progress</span>
              <span className="text-sm text-white">{progress}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-blue-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Stock Check Warning (for pending) */}
        {workOrder.status === 'pending' && !stockCheck.canStart && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-amber-400">Insufficient Stock</div>
              <div className="text-sm text-slate-300 mt-1">
                Cannot start production. The following components are short:
              </div>
              <ul className="mt-2 space-y-1">
                {stockCheck.shortComponents.map(c => (
                  <li key={c.productId} className="text-sm text-slate-400">
                    {c.productName}: need {formatNumber(c.quantityRequired)}, have {formatNumber(getProductStock(c.productId))}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Output Product */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-white mb-3">Output</h3>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <Package className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <div className="text-lg font-medium text-white">{workOrder.outputProductName}</div>
              <div className="text-sm text-slate-400">
                {workOrder.status === 'completed' ? (
                  <span className="text-emerald-400">
                    {formatNumber(workOrder.quantityProduced)} / {formatNumber(workOrder.quantityToProduce)} produced
                  </span>
                ) : (
                  <span>{formatNumber(workOrder.quantityToProduce)} to produce</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Components */}
        {workOrder.components.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-white mb-3">Components</h3>
            <div className="border border-slate-700 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-800/50">
                  <tr className="text-xs text-slate-400 uppercase tracking-wider">
                    <th className="px-4 py-3 text-left">Component</th>
                    <th className="px-4 py-3 text-center">Required</th>
                    <th className="px-4 py-3 text-center">Used</th>
                    <th className="px-4 py-3 text-center">Available</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {workOrder.components.map(comp => {
                    const available = getProductStock(comp.productId);
                    const isShort = available < comp.quantityRequired && workOrder.status === 'pending';

                    return (
                      <tr key={comp.productId} className={isShort ? 'bg-amber-500/5' : ''}>
                        <td className="px-4 py-3 text-sm text-white">{comp.productName}</td>
                        <td className="px-4 py-3 text-sm text-white text-center">
                          {formatNumber(comp.quantityRequired)}
                        </td>
                        <td className="px-4 py-3 text-sm text-center">
                          {workOrder.status === 'pending' ? (
                            <span className="text-slate-400">-</span>
                          ) : (
                            <span className="text-emerald-400">{formatNumber(comp.quantityUsed)}</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-center">
                          <span className={isShort ? 'text-amber-400' : 'text-slate-400'}>
                            {formatNumber(available)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Details */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-white mb-3">Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400">Due Date:</span>
              <span className="text-white">
                {workOrder.dueDate ? formatDate(workOrder.dueDate) : 'Not set'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400">Created:</span>
              <span className="text-white">{formatDate(workOrder.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {workOrder.notes && (
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-white mb-2">Notes</h3>
            <p className="text-sm text-slate-300">{workOrder.notes}</p>
          </div>
        )}

        {/* Timeline */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-white mb-3">Timeline</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <div className="text-sm">
                <span className="text-white">Created</span>
                <span className="text-slate-400 ml-2">{formatDateTime(workOrder.createdAt)}</span>
              </div>
            </div>
            {workOrder.startedAt && (
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="text-sm">
                  <span className="text-white">Production Started</span>
                  <span className="text-slate-400 ml-2">{formatDateTime(workOrder.startedAt)}</span>
                </div>
              </div>
            )}
            {workOrder.completedAt && (
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <div className="text-sm">
                  <span className="text-white">Completed</span>
                  <span className="text-slate-400 ml-2">{formatDateTime(workOrder.completedAt)}</span>
                </div>
              </div>
            )}
            {workOrder.status === 'cancelled' && (
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="text-sm">
                  <span className="text-white">Cancelled</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default WorkOrderDetailModal;
