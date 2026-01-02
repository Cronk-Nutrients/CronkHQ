'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { SlideOver } from '@/components/ui/SlideOver';
import { Button } from '@/components/ui/Button';
import { useApp, Order } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import { formatCurrency, formatNumber } from '@/lib/formatting';

interface OrderDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export function OrderDetailPanel({ isOpen, onClose, order }: OrderDetailPanelProps) {
  const router = useRouter();
  const { dispatch } = useApp();
  const { success, warning } = useToast();
  const confirm = useConfirm();

  if (!order) return null;

  // Get status badge
  const getStatusBadge = (status: Order['status']) => {
    const styles: Record<Order['status'], { bg: string; text: string; label: string }> = {
      draft: { bg: 'bg-slate-500/20', text: 'text-slate-400', label: 'Draft' },
      to_pick: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'To Pick' },
      picking: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Picking' },
      to_pack: { bg: 'bg-purple-500/20', text: 'text-purple-400', label: 'To Pack' },
      packing: { bg: 'bg-indigo-500/20', text: 'text-indigo-400', label: 'Packing' },
      ready: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', label: 'Ready to Ship' },
      shipped: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Shipped' },
      delivered: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Delivered' },
      cancelled: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Cancelled' },
    };
    const style = styles[status];
    return (
      <span className={`px-2 py-1 ${style.bg} ${style.text} text-xs rounded-full`}>
        {style.label}
      </span>
    );
  };

  // Get channel icon
  const getChannelIcon = (channel: Order['channel']) => {
    switch (channel) {
      case 'shopify':
        return <i className="fab fa-shopify text-green-400"></i>;
      case 'amazon_fbm':
      case 'amazon_fba':
        return <i className="fab fa-amazon text-orange-400"></i>;
      case 'manual':
        return <i className="fas fa-user text-slate-400"></i>;
    }
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Action handlers
  const handleStartPicking = () => {
    dispatch({
      type: 'UPDATE_ORDER_STATUS',
      payload: { orderId: order.id, status: 'picking' },
    });
    success(`Started picking order ${order.orderNumber}`);
    router.push(`/pick?order=${order.id}`);
    onClose();
  };

  const handleCompletePick = () => {
    dispatch({
      type: 'UPDATE_ORDER_STATUS',
      payload: { orderId: order.id, status: 'to_pack' },
    });
    success(`Order ${order.orderNumber} ready for packing`);
  };

  const handleStartPacking = () => {
    dispatch({
      type: 'UPDATE_ORDER_STATUS',
      payload: { orderId: order.id, status: 'packing' },
    });
    success(`Started packing order ${order.orderNumber}`);
    router.push(`/pack?order=${order.id}`);
    onClose();
  };

  const handleMarkReady = () => {
    dispatch({
      type: 'UPDATE_ORDER_STATUS',
      payload: { orderId: order.id, status: 'ready' },
    });
    success(`Order ${order.orderNumber} ready to ship`);
  };

  const handleMarkShipped = () => {
    dispatch({
      type: 'UPDATE_ORDER_STATUS',
      payload: { orderId: order.id, status: 'shipped' },
    });
    success(`Order ${order.orderNumber} marked as shipped`);
  };

  const handlePrintLabel = () => {
    // Placeholder for printing shipping label
    success('Opening print dialog...');
    handlePrintPackingSlip();
  };

  const handlePrintPackingSlip = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      warning('Please allow popups to print');
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Packing Slip - ${order.orderNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
            .header { border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
            .header h1 { margin: 0 0 5px 0; }
            .customer { margin-bottom: 20px; }
            .items { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .items th, .items td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            .items th { background: #f5f5f5; }
            .totals { float: right; width: 250px; }
            .totals table { width: 100%; }
            .totals td { padding: 4px 0; }
            .totals .total { font-weight: bold; font-size: 1.2em; border-top: 2px solid #000; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Packing Slip</h1>
            <p><strong>Order:</strong> ${order.orderNumber}</p>
            <p><strong>Date:</strong> ${formatDate(order.createdAt)}</p>
            <p><strong>Channel:</strong> ${order.channel.replace('_', ' ').toUpperCase()}</p>
          </div>
          <div class="customer">
            <h3>Ship To:</h3>
            <p>
              ${order.customer.name}<br>
              ${order.customer.address.street}<br>
              ${order.customer.address.city}, ${order.customer.address.state} ${order.customer.address.zip}<br>
              ${order.customer.address.country}
            </p>
            ${order.customer.phone ? `<p>Phone: ${order.customer.phone}</p>` : ''}
          </div>
          <table class="items">
            <thead>
              <tr>
                <th>Item</th>
                <th>SKU</th>
                <th style="text-align: center;">Qty</th>
                <th style="text-align: right;">Price</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>${item.productName}</td>
                  <td>${item.sku}</td>
                  <td style="text-align: center;">${item.quantity}</td>
                  <td style="text-align: right;">$${item.price.toFixed(2)}</td>
                  <td style="text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="totals">
            <table>
              <tr><td>Subtotal:</td><td style="text-align: right;">$${order.subtotal.toFixed(2)}</td></tr>
              <tr><td>Shipping:</td><td style="text-align: right;">$${order.shipping.toFixed(2)}</td></tr>
              <tr><td>Tax:</td><td style="text-align: right;">$${order.tax.toFixed(2)}</td></tr>
              ${order.discount > 0 ? `<tr><td>Discount:</td><td style="text-align: right;">-$${order.discount.toFixed(2)}</td></tr>` : ''}
              <tr class="total"><td>Total:</td><td style="text-align: right;">$${order.total.toFixed(2)}</td></tr>
            </table>
          </div>
          <div style="clear: both; margin-top: 40px; text-align: center; color: #666;">
            <p>Thank you for your order!</p>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  const handleCancel = async () => {
    const confirmed = await confirm({
      title: 'Cancel Order',
      message: `Are you sure you want to cancel order ${order.orderNumber}? This will notify the customer.`,
      confirmText: 'Cancel Order',
      cancelText: 'Keep Order',
      destructive: true,
    });

    if (confirmed) {
      dispatch({
        type: 'UPDATE_ORDER_STATUS',
        payload: { orderId: order.id, status: 'cancelled' },
      });
      success(`Order ${order.orderNumber} cancelled`);
    }
  };

  // Get available actions based on status
  const getActionButtons = () => {
    switch (order.status) {
      case 'to_pick':
        return (
          <>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel Order
            </Button>
            <Button onClick={handleStartPicking}>
              <i className="fas fa-clipboard-list mr-2"></i>
              Start Picking
            </Button>
          </>
        );
      case 'picking':
        return (
          <>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel Order
            </Button>
            <Button onClick={handleCompletePick}>
              <i className="fas fa-check mr-2"></i>
              Complete Pick
            </Button>
          </>
        );
      case 'to_pack':
        return (
          <>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel Order
            </Button>
            <Button onClick={handleStartPacking}>
              <i className="fas fa-box mr-2"></i>
              Start Packing
            </Button>
          </>
        );
      case 'packing':
        return (
          <>
            <Button variant="secondary" onClick={handlePrintPackingSlip}>
              <i className="fas fa-print mr-2"></i>
              Print Slip
            </Button>
            <Button onClick={handleMarkReady}>
              <i className="fas fa-check mr-2"></i>
              Mark Ready
            </Button>
          </>
        );
      case 'ready':
        return (
          <>
            <Button variant="secondary" onClick={handlePrintLabel}>
              <i className="fas fa-tag mr-2"></i>
              Print Label
            </Button>
            <Button onClick={handleMarkShipped}>
              <i className="fas fa-truck mr-2"></i>
              Mark Shipped
            </Button>
          </>
        );
      case 'shipped':
        return (
          <>
            {order.trackingNumber && (
              <Button
                variant="secondary"
                onClick={() => window.open(`https://www.google.com/search?q=${order.trackingNumber}`, '_blank')}
              >
                <i className="fas fa-external-link-alt mr-2"></i>
                Track Package
              </Button>
            )}
            <Button variant="secondary" onClick={handlePrintPackingSlip}>
              <i className="fas fa-print mr-2"></i>
              Print Slip
            </Button>
          </>
        );
      case 'delivered':
      case 'cancelled':
        return (
          <Button variant="secondary" onClick={handlePrintPackingSlip}>
            <i className="fas fa-print mr-2"></i>
            Print Slip
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <SlideOver
      open={isOpen}
      onClose={onClose}
      title={order.orderNumber}
      subtitle={`${order.channel.replace('_', ' ').toUpperCase()} Order`}
      width="lg"
      footer={getActionButtons()}
    >
      <div className="space-y-6">
        {/* Status & Channel */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getChannelIcon(order.channel)}
            <span className="text-slate-300 capitalize">{order.channel.replace('_', ' ')}</span>
          </div>
          {getStatusBadge(order.status)}
        </div>

        {/* Customer Info */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-white mb-3">Customer Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Name</span>
              <span className="text-white">{order.customer.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Email</span>
              <span className="text-white">{order.customer.email}</span>
            </div>
            {order.customer.phone && (
              <div className="flex justify-between">
                <span className="text-slate-400">Phone</span>
                <span className="text-white">{order.customer.phone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-white mb-3">Shipping Address</h3>
          <div className="text-sm text-slate-300">
            <p>{order.customer.address.street}</p>
            <p>
              {order.customer.address.city}, {order.customer.address.state} {order.customer.address.zip}
            </p>
            <p>{order.customer.address.country}</p>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-700/50">
            <h3 className="text-sm font-medium text-white">
              Order Items ({order.items.reduce((sum, i) => sum + i.quantity, 0)} items)
            </h3>
          </div>
          <div className="divide-y divide-slate-700/50">
            {order.items.map((item, idx) => (
              <div key={idx} className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-flask text-emerald-400"></i>
                  </div>
                  <div>
                    <div className="text-sm text-white">{item.productName}</div>
                    <div className="text-xs text-slate-400">{item.sku}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white">
                    {item.quantity} x {formatCurrency(item.price)}
                  </div>
                  <div className="text-xs text-slate-400">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Totals */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-white mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Subtotal</span>
              <span className="text-white">{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Shipping</span>
              <span className="text-white">{formatCurrency(order.shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Tax</span>
              <span className="text-white">{formatCurrency(order.tax)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-400">Discount</span>
                <span className="text-emerald-400">-{formatCurrency(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-slate-700">
              <span className="font-medium text-white">Total</span>
              <span className="font-bold text-white">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Profit Analysis */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-white mb-3">Profit Analysis</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-xs text-slate-400 mb-1">COGS</div>
              <div className="text-lg font-bold text-white">{formatCurrency(order.cogs)}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-slate-400 mb-1">Profit</div>
              <div className={`text-lg font-bold ${order.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {formatCurrency(order.profit)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-slate-400 mb-1">Margin</div>
              <div className={`text-lg font-bold ${order.margin >= 30 ? 'text-emerald-400' : order.margin >= 15 ? 'text-amber-400' : 'text-red-400'}`}>
                {order.margin.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Info (if shipped) */}
        {order.trackingNumber && (
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-white mb-3">Shipping Information</h3>
            <div className="space-y-2 text-sm">
              {order.carrier && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Carrier</span>
                  <span className="text-white uppercase">{order.carrier}</span>
                </div>
              )}
              {order.service && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Service</span>
                  <span className="text-white">{order.service}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-400">Tracking</span>
                <span className="text-blue-400 font-mono">{order.trackingNumber}</span>
              </div>
              {order.shippedAt && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Shipped</span>
                  <span className="text-white">{formatDate(order.shippedAt)}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Timestamps */}
        <div className="text-xs text-slate-500 space-y-1">
          <div>Created: {formatDate(order.createdAt)}</div>
          <div>Updated: {formatDate(order.updatedAt)}</div>
          {order.veeqoId && <div>Veeqo ID: {order.veeqoId}</div>}
        </div>
      </div>
    </SlideOver>
  );
}

export default OrderDetailPanel;
