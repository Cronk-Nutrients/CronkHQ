'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { LucideIcon } from 'lucide-react';

// Fulfillment stat card with Lucide icon support
interface FulfillmentStatCardProps {
  icon: LucideIcon;
  iconColor: string;
  value: number | string;
  label: string;
  subLabel?: string;
  format?: 'number' | 'currency' | 'raw';
  href?: string;
  highlight?: boolean;
  animateIcon?: boolean;
}

export function FulfillmentStatCard({
  icon: Icon,
  iconColor,
  value,
  label,
  subLabel,
  format = 'number',
  href,
  highlight = false,
  animateIcon = false,
}: FulfillmentStatCardProps) {
  const colorMap: Record<string, { border: string; bg: string; hover: string; iconBg: string }> = {
    amber: { border: 'border-amber-500/30', bg: 'bg-amber-500/20', hover: 'hover:border-amber-500/50', iconBg: 'bg-amber-500/20' },
    blue: { border: 'border-blue-500/30', bg: 'bg-blue-500/20', hover: 'hover:border-blue-500/50', iconBg: 'bg-blue-500/20' },
    purple: { border: 'border-purple-500/30', bg: 'bg-purple-500/20', hover: 'hover:border-purple-500/50', iconBg: 'bg-purple-500/20' },
    cyan: { border: 'border-cyan-500/30', bg: 'bg-cyan-500/20', hover: 'hover:border-cyan-500/50', iconBg: 'bg-cyan-500/20' },
    emerald: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/20', hover: 'hover:border-emerald-500/50', iconBg: 'bg-emerald-500/20' },
    slate: { border: 'border-slate-700/50', bg: 'bg-slate-700/30', hover: 'hover:border-slate-600', iconBg: 'bg-slate-700/50' },
    red: { border: 'border-red-500/30', bg: 'bg-red-500/20', hover: 'hover:border-red-500/50', iconBg: 'bg-red-500/20' },
    orange: { border: 'border-orange-500/30', bg: 'bg-orange-500/20', hover: 'hover:border-orange-500/50', iconBg: 'bg-orange-500/20' },
  };

  const textColorMap: Record<string, string> = {
    amber: 'text-amber-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    cyan: 'text-cyan-400',
    emerald: 'text-emerald-400',
    slate: 'text-slate-400',
    red: 'text-red-400',
    orange: 'text-orange-400',
  };

  const colors = colorMap[iconColor] || colorMap.slate;
  const textColor = textColorMap[iconColor] || 'text-white';

  const formattedValue = format === 'currency'
    ? formatCurrency(typeof value === 'number' ? value : 0)
    : format === 'number'
    ? formatNumber(typeof value === 'number' ? value : 0)
    : value;

  const content = (
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg ${colors.iconBg} flex items-center justify-center`}>
        <Icon className={`w-5 h-5 ${textColor} ${animateIcon ? 'animate-spin' : ''}`} />
      </div>
      <div>
        <div className="text-2xl font-bold text-white">{formattedValue}</div>
        <div className="text-xs text-slate-400">{label}</div>
        {subLabel && <div className={`text-xs ${textColor} mt-0.5`}>{subLabel}</div>}
      </div>
    </div>
  );

  const baseClass = `bg-slate-800/50 backdrop-blur border ${colors.border} rounded-xl p-4 transition-colors`;

  if (href) {
    return (
      <Link href={href} className={`${baseClass} ${colors.hover} cursor-pointer`}>
        {content}
      </Link>
    );
  }

  return (
    <div className={`${baseClass} ${highlight ? `${colors.bg}` : ''}`} style={highlight ? { boxShadow: '0 0 20px rgba(168, 85, 247, 0.15)' } : undefined}>
      {content}
    </div>
  );
}

// Font Awesome icon stat card (for shipping page)
interface FAStatCardProps {
  icon: string;
  iconColor: string;
  value: number | string;
  label: string;
  subLabel?: string;
  format?: 'number' | 'currency' | 'raw';
  highlight?: boolean;
  valueColor?: string;
}

export function FAStatCard({
  icon,
  iconColor,
  value,
  label,
  subLabel,
  format = 'number',
  highlight = false,
  valueColor,
}: FAStatCardProps) {
  const colorMap: Record<string, { iconBg: string; textColor: string }> = {
    purple: { iconBg: 'bg-purple-500/20', textColor: 'text-purple-400' },
    emerald: { iconBg: 'bg-emerald-500/20', textColor: 'text-emerald-400' },
    red: { iconBg: 'bg-red-500/20', textColor: 'text-red-400' },
    blue: { iconBg: 'bg-blue-500/20', textColor: 'text-blue-400' },
    amber: { iconBg: 'bg-amber-500/20', textColor: 'text-amber-400' },
  };

  const colors = colorMap[iconColor] || colorMap.purple;

  const formattedValue = format === 'currency'
    ? `$${(typeof value === 'number' ? value : 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
    : format === 'number'
    ? (typeof value === 'number' ? value : 0).toLocaleString()
    : value;

  return (
    <div
      className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5"
      style={highlight ? { boxShadow: '0 0 20px rgba(168, 85, 247, 0.15)' } : undefined}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-slate-400 text-sm">{label}</span>
        <div className={`w-10 h-10 ${colors.iconBg} rounded-lg flex items-center justify-center`}>
          <i className={`fas ${icon} ${colors.textColor}`}></i>
        </div>
      </div>
      <p className={`text-3xl font-bold ${valueColor || 'text-white'}`}>{formattedValue}</p>
      {subLabel && <p className={`text-xs ${valueColor ? valueColor : 'text-slate-400'} mt-1`}>{subLabel}</p>}
    </div>
  );
}

// Stats grid wrapper
interface FulfillmentStatsGridProps {
  children: ReactNode;
  columns?: 3 | 4 | 5 | 6;
}

export function FulfillmentStatsGrid({ children, columns = 6 }: FulfillmentStatsGridProps) {
  const colClass = {
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  }[columns];

  return <div className={`grid ${colClass} gap-4`}>{children}</div>;
}

// Quick action card for overview page
interface QuickActionCardProps {
  href: string;
  icon: LucideIcon | string;
  iconColor: string;
  title: string;
  description: string;
  isFontAwesome?: boolean;
}

export function QuickActionCard({
  href,
  icon,
  iconColor,
  title,
  description,
  isFontAwesome = false,
}: QuickActionCardProps) {
  const colorMap: Record<string, { iconBg: string; hoverBorder: string; hoverIconBg: string; textColor: string }> = {
    emerald: { iconBg: 'bg-emerald-500/20', hoverBorder: 'hover:border-emerald-500/50', hoverIconBg: 'group-hover:bg-emerald-500/30', textColor: 'text-emerald-400' },
    blue: { iconBg: 'bg-blue-500/20', hoverBorder: 'hover:border-blue-500/50', hoverIconBg: 'group-hover:bg-blue-500/30', textColor: 'text-blue-400' },
    orange: { iconBg: 'bg-orange-500/20', hoverBorder: 'hover:border-orange-500/50', hoverIconBg: 'group-hover:bg-orange-500/30', textColor: 'text-orange-400' },
    purple: { iconBg: 'bg-purple-500/20', hoverBorder: 'hover:border-purple-500/50', hoverIconBg: 'group-hover:bg-purple-500/30', textColor: 'text-purple-400' },
  };

  const colors = colorMap[iconColor] || colorMap.emerald;
  const Icon = !isFontAwesome ? icon as LucideIcon : null;

  return (
    <Link
      href={href}
      className={`bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 ${colors.hoverBorder} transition-all group`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 ${colors.iconBg} rounded-xl flex items-center justify-center ${colors.hoverIconBg} transition-colors`}>
          {isFontAwesome ? (
            <i className={`${icon} ${colors.textColor} text-2xl`}></i>
          ) : Icon ? (
            <Icon className={`w-7 h-7 ${colors.textColor}`} />
          ) : null}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-slate-400">{description}</p>
        </div>
        <svg className={`w-5 h-5 text-slate-500 ${colors.textColor.replace('text-', 'group-hover:text-')} transition-colors`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

// Progress bar component
interface ProgressBarProps {
  current: number;
  total: number;
  colorClass?: string;
}

export function ProgressBar({ current, total, colorClass = 'bg-blue-500' }: ProgressBarProps) {
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full bg-slate-700 rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all ${colorClass}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
