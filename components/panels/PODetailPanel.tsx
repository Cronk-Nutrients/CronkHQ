'use client';

import { useMemo } from 'react';
import { SlideOver } from '@/components/ui/SlideOver';
import { Button } from '@/components/ui/Button';
import { useApp, PurchaseOrder } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import { formatCurrency, formatCurrencyPrecise, formatNumber, formatDate, formatDateTime } from '@/lib/formatting';
import {
  Package,
  Send,
  Check,
  X,
  Edit,
  Printer,
  Clock,
  Truck,
  DollarSign,
  FileText,
  AlertTriangle,
} from 'lucide-react';

interface PODetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  po: PurchaseOrder | null;
  onEdit?: (po: PurchaseOrder) => void;
  onReceive?: (po: PurchaseOrder) => void;
}

export function PODetailPanel({ isOpen, onClose, po, onEdit, onReceive }: PODetailPanelProps) {
  const { dispatch } = useApp();
  const { success, error } = useToast();
  const confirm = useConfirm();

  // Calculate receiving progress
  const progress = useMemo(() => {
    if (!po) return { totalOrdered: 0, totalReceived: 0, percent: 0 };

    const totalOrdered = po.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalReceived = po.items.reduce((sum, item) => sum + item.receivedQty, 0);
    const percent = totalOrdered > 0 ? (totalReceived / totalOrdered) * 100 : 0;

    return { totalOrdered, totalReceived, percent };
  }, [po]);

  // Get status badge
  const getStatusBadge = (status: PurchaseOrder['status']) => {
    switch (status) {
      case 'draft':
        return (
          <span className="px-3 py-1 bg-slate-500/20 text-slate-300 text-sm rounded-full">
            Draft
          </span>
        );
      case 'sent':
        return (
          <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-sm rounded-full">
            Sent / Pending
          </span>
        );
      case 'partial':
        return (
          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full">
            Partially Received
          </span>
        );
      case 'received':
        return (
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm rounded-full">
            Received
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-full">
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  // Handle send PO
  const handleSendPO = async () => {
    if (!po) return;

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

  // Handle cancel PO
  const handleCancelPO = async () => {
    if (!po) return;

    if (po.status === 'received') {
      error('Cannot cancel a received PO');
      return;
    }

    const confirmed = await confirm({
      title: 'Cancel Purchase Order',
      message: `Cancel PO ${po.poNumber}? This cannot be undone.`,
      confirmText: 'Cancel PO',
      destructive: true,
    });

    if (confirmed) {
      const updatedPO: PurchaseOrder = {
        ...po,
        status: 'cancelled',
        updatedAt: new Date(),
      };
      dispatch({ type: 'UPDATE_PURCHASE_ORDER', payload: updatedPO });
      success(`PO ${po.poNumber} cancelled`);
      onClose();
    }
  };

  // Handle delete PO
  const handleDeletePO = async () => {
    if (!po) return;

    if (po.status !== 'draft') {
      error('Only draft POs can be deleted');
      return;
    }

    const confirmed = await confirm({
      title: 'Delete Purchase Order',
      message: `Delete PO ${po.poNumber}? This cannot be undone.`,
      confirmText: 'Delete',
      destructive: true,
    });

    if (confirmed) {
      dispatch({ type: 'DELETE_PURCHASE_ORDER', payload: po.id });
      success(`PO ${po.poNumber} deleted`);
      onClose();
    }
  };

  // Handle print
  const handlePrint = () => {
    if (!po) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>PO ${po.poNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
          h1 { margin-bottom: 5px; }
          .subtitle { color: #666; margin-bottom: 20px; }
          .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
          .info { margin-bottom: 20px; }
          .info-row { display: flex; margin-bottom: 5px; }
          .info-label { width: 120px; color: #666; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background: #f5f5f5; font-weight: 600; }
          .text-right { text-align: right; }
          .totals { margin-top: 20px; text-align: right; }
          .total-row { display: flex; justify-content: flex-end; gap: 40px; margin-bottom: 5px; }
          .total-final { font-weight: bold; font-size: 18px; border-top: 2px solid #333; padding-top: 10px; }
          .notes { margin-top: 30px; padding: 15px; background: #f9f9f9; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1>Purchase Order</h1>
            <div class="subtitle">${po.poNumber}</div>
          </div>
          <div class="text-right">
            <div><strong>Cronk Nutrients</strong></div>
            <div>Date: ${formatDate(po.createdAt)}</div>
          </div>
        </div>

        <div class="info">
          <div class="info-row"><span class="info-label">Supplier:</span> ${po.supplier}</div>
          <div class="info-row"><span class="info-label">Currency:</span> ${po.currency}</div>
          <div class="info-row"><span class="info-label">Expected Date:</span> ${po.expectedDate ? formatDate(po.expectedDate) : 'Not specified'}</div>
          <div class="info-row"><span class="info-label">Status:</span> ${po.status.charAt(0).toUpperCase() + po.status.slice(1)}</div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th class="text-right">Qty</th>
              <th class="text-right">Unit Cost</th>
              <th class="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            ${po.items.map(item => `
              <tr>
                <td>${item.productName}</td>
                <td>${item.sku}</td>
                <td class="text-right">${item.quantity}</td>
                <td class="text-right">$${item.unitCost.toFixed(2)}</td>
                <td class="text-right">$${(item.quantity * item.unitCost).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="totals">
          <div class="total-row">
            <span>Subtotal:</span>
            <span>$${po.subtotal.toFixed(2)}</span>
          </div>
          <div class="total-row">
            <span>Shipping:</span>
            <span>$${po.shipping.toFixed(2)}</span>
          </div>
          <div class="total-row total-final">
            <span>Total:</span>
            <span>$${po.total.toFixed(2)}</span>
          </div>
        </div>

        ${po.notes ? `<div class="notes"><strong>Notes:</strong><br/>${po.notes}</div>` : ''}
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (!po) return null;

  return (
    <SlideOver
      open={isOpen}
      onClose={onClose}
      title={po.poNumber}
      subtitle={po.supplier}
      width="lg"
      footer={
        <>
          {/* Actions based on status */}
          {po.status === 'draft' && (
            <>
              <Button variant="danger" onClick={handleDeletePO}>
                <X className="w-4 h-4" />
                Delete
              </Button>
              <Button variant="secondary" onClick={() => onEdit?.(po)}>
                <Edit className="w-4 h-4" />
                Edit
              </Button>
              <Button onClick={handleSendPO}>
                <Send className="w-4 h-4" />
                Send PO
              </Button>
            </>
          )}
          {po.status === 'sent' && (
            <>
              <Button variant="secondary" onClick={handleCancelPO}>
                Cancel PO
              </Button>
              <Button onClick={() => onReceive?.(po)}>
                <Package className="w-4 h-4" />
                Receive Items
              </Button>
            </>
          )}
          {po.status === 'partial' && (
            <>
              <Button variant="secondary" onClick={handleCancelPO}>
                Cancel PO
              </Button>
              <Button onClick={() => onReceive?.(po)}>
                <Package className="w-4 h-4" />
                Receive More
              </Button>
            </>
          )}
          {po.status === 'received' && (
            <Button variant="secondary" onClick={handlePrint}>
              <Printer className="w-4 h-4" />
              Print PO
            </Button>
          )}
          {po.status === 'cancelled' && (
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          )}
        </>
      }
    >
      <div className="space-y-6">
        {/* Status & Actions Header */}
        <div className="flex items-center justify-between">
          {getStatusBadge(po.status)}
          <button
            onClick={handlePrint}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
            title="Print PO"
          >
            <Printer className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (for sent/partial) */}
        {(po.status === 'sent' || po.status === 'partial' || po.status === 'received') && (
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Receiving Progress</span>
              <span className="text-sm text-white">
                {formatNumber(progress.totalReceived)} / {formatNumber(progress.totalOrdered)} received
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  progress.percent >= 100 ? 'bg-emerald-500' : 'bg-blue-500'
                }`}
                style={{ width: `${Math.min(progress.percent, 100)}%` }}
              />
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {progress.percent.toFixed(0)}% complete
            </div>
          </div>
        )}

        {/* PO Details */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-white mb-3">PO Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400">PO Number:</span>
              <span className="text-white font-mono">{po.poNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400">Supplier:</span>
              <span className="text-white">{po.supplier}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400">Currency:</span>
              <span className="text-white">{po.currency}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400">Expected:</span>
              <span className="text-white">
                {po.expectedDate ? formatDate(po.expectedDate) : 'Not set'}
              </span>
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Line Items</h3>
          <div className="border border-slate-700 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr className="text-xs text-slate-400 uppercase tracking-wider">
                  <th className="px-4 py-3 text-left">Product</th>
                  <th className="px-4 py-3 text-center">Ordered</th>
                  <th className="px-4 py-3 text-center">Received</th>
                  <th className="px-4 py-3 text-right">Unit Cost</th>
                  <th className="px-4 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {po.items.map(item => {
                  const isComplete = item.receivedQty >= item.quantity;
                  const isPartial = item.receivedQty > 0 && item.receivedQty < item.quantity;

                  return (
                    <tr
                      key={item.productId}
                      className={isComplete ? 'bg-emerald-500/5' : ''}
                    >
                      <td className="px-4 py-3">
                        <div className="text-sm text-white">{item.productName}</div>
                        <div className="text-xs text-slate-400 font-mono">{item.sku}</div>
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-white">
                        {formatNumber(item.quantity)}
                      </td>
                      <td className="px-4 py-3 text-center text-sm">
                        <span className={
                          isComplete ? 'text-emerald-400' :
                          isPartial ? 'text-blue-400' :
                          'text-slate-400'
                        }>
                          {formatNumber(item.receivedQty)}
                          {isComplete && <Check className="w-3 h-3 inline ml-1" />}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-slate-300">
                        {formatCurrencyPrecise(item.unitCost)}
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-white font-medium">
                        {formatCurrencyPrecise(item.quantity * item.unitCost)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-64 bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Subtotal:</span>
              <span className="text-white">{formatCurrencyPrecise(po.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Shipping:</span>
              <span className="text-white">{formatCurrencyPrecise(po.shipping)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-700">
              <span className="text-white font-medium">Total:</span>
              <span className="text-white font-bold">{formatCurrencyPrecise(po.total)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {po.notes && (
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-white mb-2">Notes</h3>
            <p className="text-sm text-slate-300">{po.notes}</p>
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
                <span className="text-slate-400 ml-2">{formatDateTime(po.createdAt)}</span>
              </div>
            </div>
            {po.status !== 'draft' && (
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="text-sm">
                  <span className="text-white">Sent to Supplier</span>
                  <span className="text-slate-400 ml-2">{formatDateTime(po.updatedAt)}</span>
                </div>
              </div>
            )}
            {(po.status === 'partial' || po.status === 'received') && progress.totalReceived > 0 && (
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${po.status === 'received' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                <div className="text-sm">
                  <span className="text-white">
                    {po.status === 'received' ? 'Fully Received' : 'Partially Received'}
                  </span>
                  <span className="text-slate-400 ml-2">{formatDateTime(po.updatedAt)}</span>
                </div>
              </div>
            )}
            {po.status === 'cancelled' && (
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="text-sm">
                  <span className="text-white">Cancelled</span>
                  <span className="text-slate-400 ml-2">{formatDateTime(po.updatedAt)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SlideOver>
  );
}

export default PODetailPanel;
