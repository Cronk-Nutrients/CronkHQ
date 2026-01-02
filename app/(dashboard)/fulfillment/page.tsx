'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Breadcrumb } from '@/components/Breadcrumb';
import {
  FulfillmentStatCard,
  FulfillmentStatsGrid,
  QuickActionCard,
} from '@/components/fulfillment';
import { QueueStatusBadge } from '@/components/fulfillment';
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
  const { isDemo } = useAuth();

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

  // Recent activity - only show mock data in demo mode
  const recentActivity = isDemo ? [
    { type: 'shipped', message: 'Order #1085 shipped via USPS Priority', time: '5 min ago' },
    { type: 'packed', message: 'Order #1084 packed and ready to ship', time: '12 min ago' },
    { type: 'picked', message: 'Order #1083 picking completed', time: '18 min ago' },
    { type: 'picked', message: 'Order #1082 picking completed', time: '25 min ago' },
    { type: 'shipped', message: 'Order #1081 shipped via UPS Ground', time: '32 min ago' },
  ] : [];

  const activityIcons = {
    picked: { icon: CheckCircle, bg: 'bg-emerald-500/20', text: 'text-emerald-400' },
    packed: { icon: Box, bg: 'bg-blue-500/20', text: 'text-blue-400' },
    shipped: { icon: Truck, bg: 'bg-purple-500/20', text: 'text-purple-400' },
  };

  return (
    <div className="space-y-6">
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
      <FulfillmentStatsGrid columns={6}>
        <FulfillmentStatCard
          icon={Hand}
          iconColor="amber"
          value={stats.toPick}
          label="To Pick"
          href="/fulfillment/pick"
        />
        <FulfillmentStatCard
          icon={Loader2}
          iconColor="blue"
          value={stats.picking}
          label="Picking"
          href="/fulfillment/pick?status=picking"
          animateIcon
        />
        <FulfillmentStatCard
          icon={Box}
          iconColor="purple"
          value={stats.toPack}
          label="To Pack"
          href="/fulfillment/pack"
        />
        <FulfillmentStatCard
          icon={Package}
          iconColor="cyan"
          value={stats.packing}
          label="Packing"
          href="/fulfillment/pack?status=packing"
        />
        <FulfillmentStatCard
          icon={Truck}
          iconColor="emerald"
          value={stats.readyToShip}
          label="Ready to Ship"
          href="/fulfillment/pack?status=ready"
        />
        <FulfillmentStatCard
          icon={CheckCircle}
          iconColor="slate"
          value={stats.shippedToday}
          label="Shipped Today"
        />
      </FulfillmentStatsGrid>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4">
        <QuickActionCard
          href="/fulfillment/pick"
          icon={Hand}
          iconColor="emerald"
          title="Start Picking"
          description={`${stats.toPick + stats.picking} orders ready to pick`}
        />
        <QuickActionCard
          href="/fulfillment/pack"
          icon={Box}
          iconColor="blue"
          title="Start Packing"
          description={`${stats.toPack + stats.packing} orders ready to pack`}
        />
        <QuickActionCard
          href="/fulfillment/fba"
          icon="fab fa-amazon"
          iconColor="orange"
          title="FBA Prep"
          description="Prepare shipments for Amazon"
          isFontAwesome
        />
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
                    <QueueStatusBadge status={order.status} />
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
                    <QueueStatusBadge status={order.status} />
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
          {recentActivity.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No activity yet today</p>
            </div>
          ) : (
            recentActivity.map((activity, idx) => {
              const iconConfig = activityIcons[activity.type as keyof typeof activityIcons] || activityIcons.picked;
              const IconComponent = iconConfig.icon;

              return (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${iconConfig.bg} ${iconConfig.text}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-white">{activity.message}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Card>
    </div>
  );
}
