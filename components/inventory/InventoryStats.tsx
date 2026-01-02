'use client';

import { ReactNode } from 'react';
import { formatCurrency, formatNumber } from '@/lib/formatting';

export interface StatCardProps {
  icon: string;
  iconColor: string;
  value: number | string;
  label: string;
  format?: 'number' | 'currency' | 'raw';
  onClick?: () => void;
  isActive?: boolean;
  borderColor?: string;
}

export function ClickableStatCard({
  icon,
  iconColor,
  value,
  label,
  format = 'number',
  onClick,
  isActive = false,
  borderColor,
}: StatCardProps) {
  const colorClasses: Record<string, { border: string; bg: string; hover: string; iconBg: string; ring: string }> = {
    blue: { border: 'border-blue-500/30', bg: 'bg-blue-500/10', hover: 'hover:bg-blue-500/10', iconBg: 'bg-blue-500/20', ring: 'ring-blue-500/30' },
    emerald: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', hover: 'hover:bg-emerald-500/10', iconBg: 'bg-emerald-500/20', ring: 'ring-emerald-500/30' },
    amber: { border: 'border-amber-500/30', bg: 'bg-amber-500/10', hover: 'hover:bg-amber-500/10', iconBg: 'bg-amber-500/20', ring: 'ring-amber-500/30' },
    red: { border: 'border-red-500/30', bg: 'bg-red-500/10', hover: 'hover:bg-red-500/10', iconBg: 'bg-red-500/20', ring: 'ring-red-500/30' },
    purple: { border: 'border-purple-500/30', bg: 'bg-purple-500/10', hover: 'hover:bg-purple-500/10', iconBg: 'bg-purple-500/20', ring: 'ring-purple-500/30' },
    slate: { border: 'border-slate-700/50', bg: 'bg-slate-700/30', hover: 'hover:bg-slate-700/30', iconBg: 'bg-slate-700/50', ring: 'ring-slate-500/30' },
  };

  const colors = colorClasses[iconColor] || colorClasses.slate;

  const formattedValue = format === 'currency'
    ? formatCurrency(typeof value === 'number' ? value : 0)
    : format === 'number'
    ? formatNumber(typeof value === 'number' ? value : 0)
    : value;

  const textColor = iconColor === 'slate' || iconColor === 'white' ? 'text-white' : `text-${iconColor}-400`;

  return (
    <div
      onClick={onClick}
      className={`bg-slate-800/50 backdrop-blur border rounded-xl p-4 transition-colors ${
        onClick ? 'cursor-pointer' : ''
      } ${colors.hover} ${
        isActive
          ? `${colors.border.replace('/30', '/50')} ${colors.bg} ring-2 ${colors.ring}`
          : borderColor || colors.border
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg ${colors.iconBg} flex items-center justify-center`}>
          <i className={`fas ${icon} text-${iconColor}-400`}></i>
        </div>
        <div>
          <div className={`text-2xl font-bold ${textColor}`}>{formattedValue}</div>
          <div className="text-xs text-slate-400">{label}</div>
        </div>
      </div>
    </div>
  );
}

interface InventoryStatsGridProps {
  children: ReactNode;
  columns?: 4 | 5 | 6 | 7;
}

export function InventoryStatsGrid({ children, columns = 4 }: InventoryStatsGridProps) {
  const colClass = {
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    7: 'grid-cols-7',
  }[columns];

  return <div className={`grid ${colClass} gap-4`}>{children}</div>;
}

// Progress bar component used in stock counts and transfers
interface ProgressBarProps {
  current: number;
  total: number;
  completed?: boolean;
}

export function ProgressBar({ current, total, completed = false }: ProgressBarProps) {
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-32">
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-slate-400">{current}/{total}</span>
        <span className="text-slate-500">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div
          className={`rounded-full h-2 transition-all ${completed ? 'bg-emerald-500' : 'bg-blue-500'}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
