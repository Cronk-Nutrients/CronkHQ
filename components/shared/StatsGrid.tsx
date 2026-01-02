'use client';

import { ReactNode } from 'react';

type ColorVariant = 'emerald' | 'blue' | 'amber' | 'purple' | 'red' | 'cyan' | 'pink' | 'orange' | 'slate';

interface StatItem {
  label: string;
  value: string | number;
  icon?: string;
  iconColor?: ColorVariant;
  trend?: { value: number; label?: string };
  subtext?: string;
  onClick?: () => void;
  active?: boolean;
}

interface StatsGridProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4 | 5 | 6;
  className?: string;
}

const iconBgColors: Record<ColorVariant, string> = {
  emerald: 'bg-emerald-500/20',
  blue: 'bg-blue-500/20',
  amber: 'bg-amber-500/20',
  purple: 'bg-purple-500/20',
  red: 'bg-red-500/20',
  cyan: 'bg-cyan-500/20',
  pink: 'bg-pink-500/20',
  orange: 'bg-orange-500/20',
  slate: 'bg-slate-500/20',
};

const iconTextColors: Record<ColorVariant, string> = {
  emerald: 'text-emerald-400',
  blue: 'text-blue-400',
  amber: 'text-amber-400',
  purple: 'text-purple-400',
  red: 'text-red-400',
  cyan: 'text-cyan-400',
  pink: 'text-pink-400',
  orange: 'text-orange-400',
  slate: 'text-slate-400',
};

const colsMap: Record<number, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
};

export function StatsGrid({ stats, columns = 4, className = '' }: StatsGridProps) {
  return (
    <div className={`grid ${colsMap[columns]} gap-4 ${className}`}>
      {stats.map((stat, index) => {
        const isClickable = !!stat.onClick;
        const Component = isClickable ? 'button' : 'div';

        return (
          <Component
            key={index}
            onClick={stat.onClick}
            className={`
              bg-slate-800/50 backdrop-blur border rounded-xl p-4 relative text-left w-full
              ${stat.active ? 'border-emerald-500/50 ring-1 ring-emerald-500/20' : 'border-slate-700/50'}
              ${isClickable ? 'cursor-pointer hover:bg-slate-700/50 transition-colors' : ''}
            `}
          >
            {stat.icon && (
              <div
                className={`absolute top-4 right-4 w-10 h-10 rounded-lg flex items-center justify-center ${
                  iconBgColors[stat.iconColor || 'emerald']
                }`}
              >
                <i className={`${stat.icon} ${iconTextColors[stat.iconColor || 'emerald']}`}></i>
              </div>
            )}
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-xs text-slate-400">{stat.label}</div>
            {stat.subtext && <div className="text-xs text-slate-500 mt-1">{stat.subtext}</div>}
            {stat.trend && (
              <div className={`text-xs mt-2 ${stat.trend.value >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {stat.trend.value >= 0 ? '+' : ''}
                {stat.trend.value.toFixed(1)}%
                {stat.trend.label && <span className="text-slate-500 ml-1">{stat.trend.label}</span>}
              </div>
            )}
          </Component>
        );
      })}
    </div>
  );
}

// Single stat card component for more flexibility
interface StatCardProps {
  label: string;
  value: string | number;
  icon?: string;
  iconColor?: ColorVariant;
  trend?: { value: number; label?: string };
  subtext?: string;
  onClick?: () => void;
  active?: boolean;
  children?: ReactNode;
  className?: string;
}

export function StatCard({
  label,
  value,
  icon,
  iconColor = 'emerald',
  trend,
  subtext,
  onClick,
  active,
  children,
  className = '',
}: StatCardProps) {
  const isClickable = !!onClick;
  const Component = isClickable ? 'button' : 'div';

  return (
    <Component
      onClick={onClick}
      className={`
        bg-slate-800/50 backdrop-blur border rounded-xl p-4 relative text-left w-full
        ${active ? 'border-emerald-500/50 ring-1 ring-emerald-500/20' : 'border-slate-700/50'}
        ${isClickable ? 'cursor-pointer hover:bg-slate-700/50 transition-colors' : ''}
        ${className}
      `}
    >
      {icon && (
        <div className={`absolute top-4 right-4 w-10 h-10 rounded-lg flex items-center justify-center ${iconBgColors[iconColor]}`}>
          <i className={`${icon} ${iconTextColors[iconColor]}`}></i>
        </div>
      )}
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-xs text-slate-400">{label}</div>
      {subtext && <div className="text-xs text-slate-500 mt-1">{subtext}</div>}
      {trend && (
        <div className={`text-xs mt-2 ${trend.value >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          {trend.value >= 0 ? '+' : ''}
          {trend.value.toFixed(1)}%
          {trend.label && <span className="text-slate-500 ml-1">{trend.label}</span>}
        </div>
      )}
      {children}
    </Component>
  );
}
