'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

// Dashboard stat card
interface DashboardStatCardProps {
  icon: LucideIcon;
  iconColor?: string;
  label: string;
  value: string | number;
  subLabel?: string;
  variant?: 'default' | 'highlight' | 'warning';
  href?: string;
}

export function DashboardStatCard({
  icon: Icon,
  iconColor = 'text-slate-400',
  label,
  value,
  subLabel,
  variant = 'default',
  href,
}: DashboardStatCardProps) {
  const variantClasses = {
    default: 'bg-slate-800/50 border-slate-700/50',
    highlight: 'bg-gradient-to-br from-emerald-500/20 to-green-600/20 border-emerald-500/30',
    warning: 'bg-amber-500/10 border-amber-500/30',
  };

  const valueClasses = {
    default: 'text-white',
    highlight: 'text-emerald-400',
    warning: 'text-amber-400',
  };

  const content = (
    <>
      <div className={`flex items-center gap-2 ${variant === 'highlight' ? 'text-emerald-300' : 'text-slate-400'} text-sm mb-2`}>
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
      <div className={`text-3xl font-bold ${valueClasses[variant]}`}>{value}</div>
      {subLabel && (
        <div className={`text-sm mt-1 ${variant === 'highlight' ? 'text-slate-300' : 'text-slate-400'}`}>
          {subLabel}
        </div>
      )}
    </>
  );

  const baseClass = `rounded-xl backdrop-blur border p-5 ${variantClasses[variant]}`;

  if (href) {
    return (
      <Link href={href} className={`${baseClass} hover:bg-slate-700/50 transition-colors`}>
        {content}
      </Link>
    );
  }

  return <div className={baseClass}>{content}</div>;
}

// Dashboard stats grid
interface DashboardStatsGridProps {
  children: ReactNode;
  columns?: 3 | 4 | 5;
}

export function DashboardStatsGrid({ children, columns = 4 }: DashboardStatsGridProps) {
  const colClass = {
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
  }[columns];

  return <div className={`grid ${colClass} gap-4`}>{children}</div>;
}

// Fulfillment pipeline item
interface FulfillmentPipelineItemProps {
  href: string;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  borderColor: string;
  hoverBgColor: string;
  title: string;
  subtitle: string;
  count: number;
}

export function FulfillmentPipelineItem({
  href,
  icon: Icon,
  iconColor,
  bgColor,
  borderColor,
  hoverBgColor,
  title,
  subtitle,
  count,
}: FulfillmentPipelineItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between p-3 ${bgColor} border ${borderColor} rounded-lg ${hoverBgColor} transition-colors group`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg ${bgColor.replace('/10', '/20')} flex items-center justify-center group-hover:${bgColor.replace('/10', '/30')} transition-colors`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div className="text-left">
          <div className={`font-medium text-white group-hover:${iconColor} transition-colors`}>{title}</div>
          <div className="text-xs text-slate-400">{subtitle}</div>
        </div>
      </div>
      <div className={`text-2xl font-bold ${iconColor}`}>{count}</div>
    </Link>
  );
}

// Quick action card
interface QuickActionCardProps {
  href: string;
  icon: LucideIcon;
  iconColor: string;
  hoverBorderColor: string;
  label: string;
}

export function QuickActionCard({
  href,
  icon: Icon,
  iconColor,
  hoverBorderColor,
  label,
}: QuickActionCardProps) {
  const bgColor = iconColor.replace('text-', 'bg-').replace('-400', '-500/20');
  const hoverBgColor = iconColor.replace('text-', 'group-hover:bg-').replace('-400', '-500/30');

  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-2 p-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 ${hoverBorderColor} rounded-xl transition-all group`}
    >
      <div className={`w-10 h-10 rounded-lg ${bgColor} ${hoverBgColor} flex items-center justify-center transition-colors`}>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <span className="text-sm text-slate-300 group-hover:text-white">{label}</span>
    </Link>
  );
}

// Dashboard section wrapper
interface DashboardSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  headerRight?: ReactNode;
  badge?: { count: number; color: string };
}

export function DashboardSection({
  title,
  subtitle,
  children,
  headerRight,
  badge,
}: DashboardSectionProps) {
  return (
    <div className="rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-700/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-white">{title}</h2>
          {badge && badge.count > 0 && (
            <span className={`px-2 py-0.5 ${badge.color} text-xs rounded-full`}>
              {badge.count}
            </span>
          )}
        </div>
        {subtitle && !headerRight && <p className="text-xs text-slate-400">{subtitle}</p>}
        {headerRight}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

// Channel performance card
interface ChannelCardProps {
  href: string;
  icon: string;
  iconBgColor: string;
  iconTextColor: string;
  name: string;
  orders: number;
  revenue: number;
  profit: number;
  percentage: number;
  progressColor: string;
  formatCurrency: (val: number) => string;
}

export function ChannelCard({
  href,
  icon,
  iconBgColor,
  iconTextColor,
  name,
  orders,
  revenue,
  profit,
  percentage,
  progressColor,
  formatCurrency,
}: ChannelCardProps) {
  return (
    <Link href={href} className="block p-4 bg-slate-900/50 rounded-lg hover:bg-slate-800/70 transition-colors group">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg ${iconBgColor} flex items-center justify-center`}>
            <i className={`${icon} ${iconTextColor}`}></i>
          </div>
          <span className={`font-medium text-white group-hover:${iconTextColor} transition-colors`}>{name}</span>
        </div>
        <span className="text-xs text-slate-400">{percentage}%</span>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <div className="text-lg font-bold text-white">{orders}</div>
          <div className="text-xs text-slate-500">Orders</div>
        </div>
        <div>
          <div className="text-lg font-bold text-white">{formatCurrency(revenue)}</div>
          <div className="text-xs text-slate-500">Revenue</div>
        </div>
        <div>
          <div className="text-lg font-bold text-emerald-400">{formatCurrency(profit)}</div>
          <div className="text-xs text-slate-500">Profit</div>
        </div>
      </div>
      <div className="mt-3 h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <div className={`h-full ${progressColor} rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    </Link>
  );
}
