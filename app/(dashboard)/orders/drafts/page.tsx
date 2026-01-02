'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp, Order } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import { Breadcrumb } from '@/components/Breadcrumb';
import { formatCurrency, formatDate } from '@/lib/formatting';
import {
  FileText,
  Plus,
  Search,
  Edit,
  Trash2,
  Send,
  MoreHorizontal,
  ShoppingCart,
  User,
  Calendar,
} from 'lucide-react';

export default function DraftOrdersPage() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const { success, error } = useToast();
  const confirm = useConfirm();

  const [searchQuery, setSearchQuery] = useState('');
  const [showActionsFor, setShowActionsFor] = useState<string | null>(null);

  // Get draft orders
  const draftOrders = useMemo(() => {
    return state.orders
      .filter(o => o.status === 'draft')
      .filter(o => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
          o.orderNumber.toLowerCase().includes(query) ||
          o.customer.name.toLowerCase().includes(query) ||
          o.customer.email.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [state.orders, searchQuery]);

  // Stats
  const stats = useMemo(() => {
    const drafts = state.orders.filter(o => o.status === 'draft');
    const totalValue = drafts.reduce((sum, o) => sum + o.total, 0);
    const totalItems = drafts.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0);

    return {
      count: drafts.length,
      totalValue,
      totalItems,
    };
  }, [state.orders]);

  // Handle convert to order
  const handleConvertToOrder = async (order: Order) => {
    const confirmed = await confirm({
      title: 'Convert to Order',
      message: `Convert draft "${order.orderNumber}" to a live order? This will move it to the fulfillment queue.`,
      confirmText: 'Convert',
    });

    if (confirmed) {
      dispatch({
        type: 'UPDATE_ORDER_STATUS',
        payload: { orderId: order.id, status: 'to_pick' }
      });
      success(`Draft converted to order ${order.orderNumber}`);
    }
    setShowActionsFor(null);
  };

  // Handle delete draft
  const handleDelete = async (order: Order) => {
    const confirmed = await confirm({
      title: 'Delete Draft',
      message: `Are you sure you want to delete draft "${order.orderNumber}"? This cannot be undone.`,
      confirmText: 'Delete',
      destructive: true,
    });

    if (confirmed) {
      dispatch({ type: 'DELETE_ORDER', payload: order.id });
      success(`Draft ${order.orderNumber} deleted`);
    }
    setShowActionsFor(null);
  };

  // Get channel badge
  const getChannelBadge = (channel: Order['channel']) => {
    const configs: Record<string, { bg: string; text: string; label: string }> = {
      shopify: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Shopify' },
      amazon_fbm: { bg: 'bg-orange-500/20', text: 'text-orange-400', label: 'Amazon FBM' },
      amazon_fba: { bg: 'bg-orange-500/20', text: 'text-orange-400', label: 'Amazon FBA' },
      manual: { bg: 'bg-slate-500/20', text: 'text-slate-400', label: 'Manual' },
      wholesale: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Wholesale' },
    };
    const config = configs[channel] || configs.manual;
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'Orders', href: '/orders' },
        { label: 'Draft Orders' }
      ]} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-slate-400" />
            Draft Orders
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Orders waiting to be finalized and sent to fulfillment
          </p>
        </div>
        <Link href="/orders/new">
          <Button>
            <Plus className="w-4 h-4" />
            Create Order
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-500/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-white">{stats.count}</div>
              <div className="text-sm text-slate-400">Draft Orders</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-emerald-400">{formatCurrency(stats.totalValue)}</div>
              <div className="text-sm text-slate-400">Total Value</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-white">{stats.totalItems}</div>
              <div className="text-sm text-slate-400">Total Items</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search drafts by order number or customer..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>
      </Card>

      {/* Drafts Table */}
      <Card className="overflow-hidden">
        {draftOrders.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              {stats.count === 0 ? 'No Draft Orders' : 'No Matching Drafts'}
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mb-4">
              {stats.count === 0
                ? 'Create a new order and save it as a draft to see it here.'
                : 'Try adjusting your search query.'}
            </p>
            {stats.count === 0 && (
              <Link href="/orders/new">
                <Button>
                  <Plus className="w-4 h-4" />
                  Create Order
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr className="text-xs text-slate-400 uppercase tracking-wider">
                  <th className="px-4 py-3 text-left">Order</th>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-center">Channel</th>
                  <th className="px-4 py-3 text-center">Items</th>
                  <th className="px-4 py-3 text-right">Total</th>
                  <th className="px-4 py-3 text-left">Created</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {draftOrders.map(order => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-800/30 transition-colors cursor-pointer"
                    onClick={() => router.push(`/orders/${order.id}`)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-slate-400" />
                        </div>
                        <div>
                          <div className="font-medium text-white">{order.orderNumber}</div>
                          <div className="text-xs text-slate-500">Draft</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-500" />
                        <div>
                          <div className="text-sm text-white">{order.customer.name}</div>
                          <div className="text-xs text-slate-500">{order.customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {getChannelBadge(order.channel)}
                    </td>
                    <td className="px-4 py-3 text-center text-slate-300">
                      {order.items.reduce((sum, i) => sum + i.quantity, 0)} items
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-medium text-white">{formatCurrency(order.total)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-slate-400">
                        <Calendar className="w-3 h-3" />
                        <span className="text-sm">{formatDate(order.createdAt)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2 relative">
                        <button
                          onClick={() => setShowActionsFor(showActionsFor === order.id ? null : order.id)}
                          className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>

                        {showActionsFor === order.id && (
                          <div className="absolute right-0 top-full mt-1 w-44 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-10">
                            <div className="py-1">
                              <button
                                onClick={() => handleConvertToOrder(order)}
                                className="w-full px-4 py-2 text-left text-sm text-emerald-400 hover:bg-slate-700/50 flex items-center gap-2"
                              >
                                <Send className="w-4 h-4" />
                                Convert to Order
                              </button>
                              <Link
                                href={`/orders/${order.id}`}
                                className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700/50 flex items-center gap-2"
                              >
                                <Edit className="w-4 h-4" />
                                Edit Draft
                              </Link>
                              <button
                                onClick={() => handleDelete(order)}
                                className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-slate-700/50 flex items-center gap-2"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete Draft
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Click away to close actions */}
      {showActionsFor && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowActionsFor(null)}
        />
      )}
    </div>
  );
}
