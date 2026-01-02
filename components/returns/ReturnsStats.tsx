'use client';

import { ReactNode } from 'react';

// Color configuration for stat cards
const colorClasses: Record<string, { border: string; bg: string; ring: string; icon: string; text: string; hover: string }> = {
  amber: {
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    ring: 'ring-amber-500/30',
    icon: 'bg-amber-500/20',
    text: 'text-amber-400',
    hover: 'hover:bg-amber-500/10',
  },
  purple: {
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/10',
    ring: 'ring-purple-500/30',
    icon: 'bg-purple-500/20',
    text: 'text-purple-400',
    hover: 'hover:bg-purple-500/10',
  },
  cyan: {
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/10',
    ring: 'ring-cyan-500/30',
    icon: 'bg-cyan-500/20',
    text: 'text-cyan-400',
    hover: 'hover:bg-cyan-500/10',
  },
  indigo: {
    border: 'border-indigo-500/30',
    bg: 'bg-indigo-500/10',
    ring: 'ring-indigo-500/30',
    icon: 'bg-indigo-500/20',
    text: 'text-indigo-400',
    hover: 'hover:bg-indigo-500/10',
  },
  emerald: {
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    ring: 'ring-emerald-500/30',
    icon: 'bg-emerald-500/20',
    text: 'text-emerald-400',
    hover: 'hover:bg-emerald-500/10',
  },
  blue: {
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/10',
    ring: 'ring-blue-500/30',
    icon: 'bg-blue-500/20',
    text: 'text-blue-400',
    hover: 'hover:bg-blue-500/10',
  },
};

// Stat Card component
interface ReturnStatCardProps {
  icon: string;
  color: 'amber' | 'purple' | 'cyan' | 'indigo' | 'emerald' | 'blue';
  value: string | number;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

export function ReturnStatCard({
  icon,
  color,
  value,
  label,
  onClick,
  isActive = false,
}: ReturnStatCardProps) {
  const colors = colorClasses[color];
  const isClickable = !!onClick;

  return (
    <div
      className={`bg-slate-800/50 backdrop-blur border rounded-xl p-4 transition-colors ${
        isClickable ? `cursor-pointer ${colors.hover}` : ''
      } ${
        isActive
          ? `${colors.border.replace('/30', '/50')} ${colors.bg} ring-2 ${colors.ring}`
          : colors.border
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg ${colors.icon} flex items-center justify-center`}>
          <i className={`fas ${icon} ${colors.text}`}></i>
        </div>
        <div>
          <div className={`text-2xl font-bold ${colors.text}`}>{value}</div>
          <div className="text-xs text-slate-400">{label}</div>
        </div>
      </div>
    </div>
  );
}

// Stats Grid wrapper
interface ReturnsStatsGridProps {
  children: ReactNode;
  columns?: 4 | 5;
}

export function ReturnsStatsGrid({ children, columns = 5 }: ReturnsStatsGridProps) {
  return (
    <div className={`grid grid-cols-${columns} gap-4`}>
      {children}
    </div>
  );
}
