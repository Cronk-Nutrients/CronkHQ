'use client';

import { ReactNode } from 'react';

type ColorVariant = 'emerald' | 'blue' | 'amber' | 'purple' | 'red' | 'slate';

interface StatCardProps {
  icon: string;
  iconColor?: ColorVariant;
  value: string | number;
  label: string;
  trend?: {
    value: number;
    label?: string;
  };
  onClick?: () => void;
  clickable?: boolean;
  active?: boolean;
  className?: string;
  children?: ReactNode;
}

const iconBgColors: Record<ColorVariant, string> = {
  emerald: 'bg-emerald-500/20',
  blue: 'bg-blue-500/20',
  amber: 'bg-amber-500/20',
  purple: 'bg-purple-500/20',
  red: 'bg-red-500/20',
  slate: 'bg-slate-500/20',
};

const iconTextColors: Record<ColorVariant, string> = {
  emerald: 'text-emerald-400',
  blue: 'text-blue-400',
  amber: 'text-amber-400',
  purple: 'text-purple-400',
  red: 'text-red-400',
  slate: 'text-slate-400',
};

export function StatCard({
  icon,
  iconColor = 'emerald',
  value,
  label,
  trend,
  onClick,
  clickable = false,
  active = false,
  className = '',
  children,
}: StatCardProps) {
  const isClickable = clickable || !!onClick;

  const baseClasses = 'bg-slate-800/50 backdrop-blur border rounded-xl p-4 relative';
  const interactiveClasses = isClickable
    ? 'cursor-pointer hover:bg-slate-700/50 transition-colors'
    : '';
  const activeClasses = active
    ? 'border-emerald-500/50 ring-1 ring-emerald-500/20'
    : 'border-slate-700/50';

  const Component = isClickable ? 'button' : 'div';

  return (
    <Component
      onClick={onClick}
      className={`${baseClasses} ${interactiveClasses} ${activeClasses} ${className} text-left w-full`}
    >
      <div className={`absolute top-4 right-4 w-10 h-10 ${iconBgColors[iconColor]} rounded-lg flex items-center justify-center`}>
        <i className={`${icon} ${iconTextColors[iconColor]}`}></i>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-xs text-slate-400">{label}</div>
      {trend && (
        <div className={`text-xs mt-2 ${trend.value >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          {trend.value >= 0 ? '+' : ''}{trend.value.toFixed(1)}%
          {trend.label && <span className="text-slate-500 ml-1">{trend.label}</span>}
        </div>
      )}
      {children}
    </Component>
  );
}

export default StatCard;
