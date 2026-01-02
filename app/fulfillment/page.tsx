'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Breadcrumb } from '@/components/Breadcrumb';
import {
  Hand,
  Package,
  Box,
  Truck,
  CheckCircle,
  Clock,
  ArrowRight,
  Printer,
  Plus,
  Loader2,
} from 'lucide-react';

export default function FulfillmentOverviewPage() {
  const { state } = useApp();

  // Calculate stats
  const stats = useMemo(() => {
    const toPick = state.orders.filter(o => o.status === 'to_pick').length;
    const picking = state.orders.filter(o => o.status === 'picking').length;
    const toPack = state.orders.filter(o => o.status === 'to_pack').length;
    const packing = state.orders.filter(o => o.status === 'packing').length;
    const readyToShip = state.orders.filter(o => o.status === 'ready').length;

    // Shipped today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const shippedToday = state.orders.filter(o => {
      if (o.status !== 'shipped' || !o.shippedAt) return false;
      const shippedDate = new Date(o.shippedAt);
      shippedDate.setHours(0, 0, 0, 0);
      return shippedDate.getTime() === today.getTime();
    }).length;

    return { toPick, picking, toPack, packing, readyToShip, shippedToday };
  }, [state.orders]);

  // Pick queue orders
  const pickQueue = useMemo(() => {
    return state.orders
      .filter(o => o.status === 'to_pick' || o.status === 'picking')
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .slice(0, 5);
  }, [state.orders]);

  // Pack queue orders
  const packQueue = useMemo(() => {
    return state.orders
      .filter(o => o.status === 'to_pack' || o.status === 'packing' || o.status === 'ready')
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .slice(0, 5);
  }, [state.orders]);

  // Recent activity (mock for now)
  const recentActivity = [
    { type: 'shipped', message: 'Order #1085 shipped via USPS Priority', time: '5 min ago' },
    { type: 'packed', message: 'Order #1084 packed and ready to ship', time: '12 min ago' },
    { type: 'picked', message: 'Order #1083 picking completed', time: '18 min ago' },
    { type: 'picked', message: 'Order #1082 picking completed', time: '25 min ago' },
    { type: 'shipped', message: 'Order #1081 shipped via UPS Ground', time: '32 min ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Fulfillment' }]} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Fulfillment</h1>
          <p className="text-slate-400">Fulfillment overview and batch management</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary">
            <Printer className="w-4 h-4" />
            Print Pick Lists
          </Button>
          <Button>
            <Plus className="w-4 h-4" />
            Create Batch
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-6 gap-4">
        <Link
          href="/fulfillment/pick"
          className="bg-slate-800/50 backdrop-blur border border-amber-500/30 rounded-xl p-4 hover:border-amber-500/50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Hand className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.toPick}</div>
              <div className="text-xs text-slate-400">To Pick</div>
            </div>
          </div>
        </Link>

        <Link
          href="/fulfillment/pick?status=picking"
          className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-xl p-4 hover:border-blue-500/50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.picking}</div>
              <div className="text-xs text-slate-400">Picking</div>
            </div>
          </div>
        </Link>

        <Link
          href="/fulfillment/pack"
          className="bg-slate-800/50 backdrop-blur border border-purple-500/30 rounded-xl p-4 hover:border-purple-500/50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Box className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.toPack}</div>
              <div className="text-xs text-slate-400">To Pack</div>
            </div>
          </div>
        </Link>

        <Link
          href="/fulfillment/pack?status=packing"
          className="bg-slate-800/50 backdrop-blur border border-cyan-500/30 rounded-xl p-4 hover:border-cyan-500/50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <Package className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.packing}</div>
              <div className="text-xs text-slate-400">Packing</div>
            </div>
          </div>
        </Link>

        <Link
          href="/fulfillment/pack?status=ready"
          className="bg-slate-800/50 backdrop-blur border border-emerald-500/30 rounded-xl p-4 hover:border-emerald-500/50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Truck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.readyToShip}</div>
              <div className="text-xs text-slate-400">Ready to Ship</div>
            </div>
          </div>
        </Link>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.shippedToday}</div>
              <div className="text-xs text-slate-400">Shipped Today</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4">
        <Link
          href="/fulfillment/pick"
          className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-emerald-500/50 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
              <Hand className="w-7 h-7 text-emerald-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">Start Picking</h3>
              <p className="text-sm text-slate-400">{stats.toPick + stats.picking} orders ready to pick</p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
          </div>
        </Link>

        <Link
          href="/fulfillment/pack"
          className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
              <Box className="w-7 h-7 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">Start Packing</h3>
              <p className="text-sm text-slate-400">{stats.toPack + stats.packing} orders ready to pack</p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors" />
          </div>
        </Link>

        <Link
          href="/fulfillment/fba"
          className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-orange-500/50 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
              <i className="fab fa-amazon text-orange-400 text-2xl"></i>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">FBA Prep</h3>
              <p className="text-sm text-slate-400">Prepare shipments for Amazon</p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-orange-400 transition-colors" />
          </div>
        </Link>
      </div>

      {/* Two Column Layout - Queues */}
      <div className="grid grid-cols-2 gap-6">
        {/* Pick Queue */}
        <Card className="overflow-hidden">
          <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Hand className="w-4 h-4 text-emerald-400" />
              Pick Queue
            </h3>
            <Link href="/fulfillment/pick" className="text-sm text-emerald-400 hover:text-emerald-300">
              View All <ArrowRight className="w-3 h-3 inline" />
            </Link>
          </div>

          <div className="divide-y divide-slate-700/50">
            {pickQueue.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                <Hand className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No orders to pick</p>
              </div>
            ) : (
              pickQueue.map(order => (
                <div key={order.id} className="p-4 hover:bg-slate-800/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">#{order.orderNumber}</div>
                      <div className="text-sm text-slate-400">
                        {order.items.length} items &bull; {order.customer.name}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        order.status === 'to_pick'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {order.status === 'to_pick' ? 'To Pick' : 'Picking'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Pack Queue */}
        <Card className="overflow-hidden">
          <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Box className="w-4 h-4 text-blue-400" />
              Pack Queue
            </h3>
            <Link href="/fulfillment/pack" className="text-sm text-blue-400 hover:text-blue-300">
              View All <ArrowRight className="w-3 h-3 inline" />
            </Link>
          </div>

          <div className="divide-y divide-slate-700/50">
            {packQueue.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                <Box className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No orders to pack</p>
              </div>
            ) : (
              packQueue.map(order => (
                <div key={order.id} className="p-4 hover:bg-slate-800/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">#{order.orderNumber}</div>
                      <div className="text-sm text-slate-400">
                        {order.items.length} items &bull; {order.carrier || 'No carrier'} {order.service || ''}
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      order.status === 'to_pack'
                        ? 'bg-purple-500/20 text-purple-400'
                        : order.status === 'packing'
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {order.status === 'to_pack' ? 'To Pack' : order.status === 'packing' ? 'Packing' : 'Ready'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-5">
        <h3 className="font-semibold text-white mb-4">Today&apos;s Activity</h3>

        <div className="space-y-4">
          {recentActivity.map((activity, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                activity.type === 'picked' ? 'bg-emerald-500/20 text-emerald-400' :
                activity.type === 'packed' ? 'bg-blue-500/20 text-blue-400' :
                activity.type === 'shipped' ? 'bg-purple-500/20 text-purple-400' :
                'bg-slate-700 text-slate-400'
              }`}>
                {activity.type === 'picked' && <CheckCircle className="w-4 h-4" />}
                {activity.type === 'packed' && <Box className="w-4 h-4" />}
                {activity.type === 'shipped' && <Truck className="w-4 h-4" />}
              </div>
              <div className="flex-1">
                <div className="text-sm text-white">{activity.message}</div>
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activity.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
