'use client';

import { ReactNode } from 'react';
import { formatCurrency, formatNumber } from '@/lib/formatting';

interface OrderStatCardProps {
  icon: string;
  iconColor: string;
  value: number | string;
  label: string;
  format?: 'number' | 'currency' | 'raw';
  onClick?: () => void;
  isActive?: boolean;
}

export function OrderStatCard({
  icon,
  iconColor,
  value,
  label,
  format = 'number',
  onClick,
  isActive = false,
}: OrderStatCardProps) {
  const colorMap: Record<string, { border: string; bg: string; hover: string; iconBg: string; ring: string; text: string }> = {
    amber: { border: 'border-amber-500/30', bg: 'bg-amber-500/10', hover: 'hover:bg-amber-500/10', iconBg: 'bg-amber-500/20', ring: 'ring-amber-500/30', text: 'text-amber-400' },
    purple: { border: 'border-purple-500/30', bg: 'bg-purple-500/10', hover: 'hover:bg-purple-500/10', iconBg: 'bg-purple-500/20', ring: 'ring-purple-500/30', text: 'text-purple-400' },
    cyan: { border: 'border-cyan-500/30', bg: 'bg-cyan-500/10', hover: 'hover:bg-cyan-500/10', iconBg: 'bg-cyan-500/20', ring: 'ring-cyan-500/30', text: 'text-cyan-400' },
    emerald: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', hover: 'hover:bg-emerald-500/10', iconBg: 'bg-emerald-500/20', ring: 'ring-emerald-500/30', text: 'text-emerald-400' },
    blue: { border: 'border-blue-500/30', bg: 'bg-blue-500/10', hover: 'hover:bg-blue-500/10', iconBg: 'bg-blue-500/20', ring: 'ring-blue-500/30', text: 'text-blue-400' },
    slate: { border: 'border-slate-700/50', bg: 'bg-slate-700/30', hover: 'hover:bg-slate-700/30', iconBg: 'bg-slate-700/50', ring: 'ring-slate-500/30', text: 'text-white' },
  };

  const colors = colorMap[iconColor] || colorMap.slate;

  const formattedValue = format === 'currency'
    ? formatCurrency(typeof value === 'number' ? value : 0)
    : format === 'number'
    ? formatNumber(typeof value === 'number' ? value : 0)
    : value;

  return (
    <div
      onClick={onClick}
      className={`bg-slate-800/50 backdrop-blur border rounded-xl p-4 transition-colors ${
        onClick ? 'cursor-pointer' : ''
      } ${colors.hover} ${
        isActive
          ? `${colors.border.replace('/30', '/50')} ${colors.bg} ring-2 ${colors.ring}`
          : colors.border
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg ${colors.iconBg} flex items-center justify-center`}>
          <i className={`fas ${icon} ${colors.text}`}></i>
        </div>
        <div>
          <div className={`text-2xl font-bold ${colors.text}`}>{formattedValue}</div>
          <div className="text-xs text-slate-400">{label}</div>
        </div>
      </div>
    </div>
  );
}

interface OrderStatsGridProps {
  children: ReactNode;
  columns?: 4 | 5 | 6;
}

export function OrderStatsGrid({ children, columns = 6 }: OrderStatsGridProps) {
  const colClass = {
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  }[columns];

  return <div className={`grid ${colClass} gap-4`}>{children}</div>;
}

// Date filtering helper
export type DateFilter = 'all' | 'today' | 'yesterday' | 'last7' | 'last30' | 'thisMonth';

export const dateFilterOptions = [
  { value: 'all', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'last7', label: 'Last 7 days' },
  { value: 'last30', label: 'Last 30 days' },
  { value: 'thisMonth', label: 'This month' },
];

export function filterByDate(date: Date, filter: DateFilter): boolean {
  const orderDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  switch (filter) {
    case 'today':
      return orderDate >= today;
    case 'yesterday':
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return orderDate >= yesterday && orderDate < today;
    case 'last7':
      const last7 = new Date(today);
      last7.setDate(last7.getDate() - 7);
      return orderDate >= last7;
    case 'last30':
      const last30 = new Date(today);
      last30.setDate(last30.getDate() - 30);
      return orderDate >= last30;
    case 'thisMonth':
      return orderDate.getMonth() === today.getMonth() &&
             orderDate.getFullYear() === today.getFullYear();
    default:
      return true;
  }
}

// Status filter options for orders
export const orderStatusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'to_pick', label: 'To Pick' },
  { value: 'picking', label: 'Picking' },
  { value: 'to_pack', label: 'To Pack' },
  { value: 'packing', label: 'Packing' },
  { value: 'ready', label: 'Ready' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];

// Channel filter options
export const channelOptions = [
  { value: '', label: 'All Channels' },
  { value: 'shopify', label: 'Shopify' },
  { value: 'amazon_fbm', label: 'Amazon FBM' },
  { value: 'amazon_fba', label: 'Amazon FBA' },
  { value: 'manual', label: 'Manual' },
];
