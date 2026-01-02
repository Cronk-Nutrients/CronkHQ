'use client';

import { Order } from '@/context/AppContext';

// Order status configuration
export const orderStatusConfig: Record<Order['status'], { bg: string; text: string; icon: string; label: string }> = {
  draft: { bg: 'bg-slate-500/10', text: 'text-slate-400', icon: 'fa-file-alt', label: 'Draft' },
  to_pick: { bg: 'bg-amber-500/10', text: 'text-amber-400', icon: 'fa-hand-pointer', label: 'To Pick' },
  picking: { bg: 'bg-blue-500/10', text: 'text-blue-400', icon: 'fa-clipboard-list', label: 'Picking' },
  to_pack: { bg: 'bg-purple-500/10', text: 'text-purple-400', icon: 'fa-box', label: 'To Pack' },
  packing: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', icon: 'fa-box-open', label: 'Packing' },
  ready: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', icon: 'fa-tag', label: 'Ready' },
  shipped: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', icon: 'fa-truck', label: 'Shipped' },
  delivered: { bg: 'bg-green-500/20', text: 'text-green-400', icon: 'fa-check', label: 'Delivered' },
  cancelled: { bg: 'bg-red-500/10', text: 'text-red-400', icon: 'fa-times', label: 'Cancelled' },
};

// Channel configuration
export const channelConfig: Record<string, { bg: string; text: string; border: string; icon: string; iconType: string; label: string }> = {
  shopify: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20', icon: 'fa-shopify', iconType: 'fab', label: 'Shopify' },
  amazon_fbm: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20', icon: 'fa-amazon', iconType: 'fab', label: 'FBM' },
  amazon_fba: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20', icon: 'fa-amazon', iconType: 'fab', label: 'FBA' },
  manual: { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/20', icon: 'fa-user', iconType: 'fas', label: 'Manual' },
  wholesale: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', icon: 'fa-warehouse', iconType: 'fas', label: 'Wholesale' },
};

interface OrderStatusBadgeProps {
  status: Order['status'];
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const style = orderStatusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 ${style.bg} ${style.text} text-xs font-medium rounded-full border border-current/20`}>
      <i className={`fas ${style.icon} text-[10px]`}></i>
      {style.label}
    </span>
  );
}

interface ChannelBadgeProps {
  channel: Order['channel'];
}

export function ChannelBadge({ channel }: ChannelBadgeProps) {
  const config = channelConfig[channel] || channelConfig.manual;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${config.bg} ${config.text} text-xs font-medium rounded-full border ${config.border}`}>
      <i className={`${config.iconType} ${config.icon}`}></i>
      {config.label}
    </span>
  );
}

// Margin badge with color coding
interface MarginBadgeProps {
  margin: number;
}

export function MarginBadge({ margin }: MarginBadgeProps) {
  const colorClass = margin >= 50
    ? 'bg-emerald-500/10 text-emerald-400'
    : margin >= 30
    ? 'bg-amber-500/10 text-amber-400'
    : 'bg-red-500/10 text-red-400';

  return (
    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${colorClass}`}>
      {margin.toFixed(1)}%
    </span>
  );
}

// Priority badge for orders
interface PriorityBadgeProps {
  priority: 'normal' | 'high' | 'urgent';
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const configs = {
    normal: { bg: 'bg-slate-500/10', text: 'text-slate-400', label: 'Normal' },
    high: { bg: 'bg-amber-500/10', text: 'text-amber-400', label: 'High' },
    urgent: { bg: 'bg-red-500/10', text: 'text-red-400', label: 'Urgent' },
  };

  const config = configs[priority];
  return (
    <span className={`px-2 py-1 text-xs rounded-full ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}
