'use client';

import Link from 'next/link';
import { ChevronRight, LucideIcon } from 'lucide-react';

interface ClickableStatProps {
  label: string;
  value: string | number;
  href: string;
  icon?: LucideIcon;
  color?: 'emerald' | 'amber' | 'red' | 'blue' | 'purple' | 'slate' | 'cyan' | 'orange';
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const colorClasses = {
  emerald: {
    border: 'border-emerald-500/30 hover:border-emerald-500/60',
    bg: 'hover:bg-emerald-500/5',
    iconBg: 'bg-emerald-500/20 group-hover:bg-emerald-500/30',
    iconText: 'text-emerald-400',
  },
  amber: {
    border: 'border-amber-500/30 hover:border-amber-500/60',
    bg: 'hover:bg-amber-500/5',
    iconBg: 'bg-amber-500/20 group-hover:bg-amber-500/30',
    iconText: 'text-amber-400',
  },
  red: {
    border: 'border-red-500/30 hover:border-red-500/60',
    bg: 'hover:bg-red-500/5',
    iconBg: 'bg-red-500/20 group-hover:bg-red-500/30',
    iconText: 'text-red-400',
  },
  blue: {
    border: 'border-blue-500/30 hover:border-blue-500/60',
    bg: 'hover:bg-blue-500/5',
    iconBg: 'bg-blue-500/20 group-hover:bg-blue-500/30',
    iconText: 'text-blue-400',
  },
  purple: {
    border: 'border-purple-500/30 hover:border-purple-500/60',
    bg: 'hover:bg-purple-500/5',
    iconBg: 'bg-purple-500/20 group-hover:bg-purple-500/30',
    iconText: 'text-purple-400',
  },
  slate: {
    border: 'border-slate-500/30 hover:border-slate-500/60',
    bg: 'hover:bg-slate-500/5',
    iconBg: 'bg-slate-500/20 group-hover:bg-slate-500/30',
    iconText: 'text-slate-400',
  },
  cyan: {
    border: 'border-cyan-500/30 hover:border-cyan-500/60',
    bg: 'hover:bg-cyan-500/5',
    iconBg: 'bg-cyan-500/20 group-hover:bg-cyan-500/30',
    iconText: 'text-cyan-400',
  },
  orange: {
    border: 'border-orange-500/30 hover:border-orange-500/60',
    bg: 'hover:bg-orange-500/5',
    iconBg: 'bg-orange-500/20 group-hover:bg-orange-500/30',
    iconText: 'text-orange-400',
  },
};

export function ClickableStat({
  label,
  value,
  href,
  icon: Icon,
  color = 'slate',
  subtitle,
  trend,
}: ClickableStatProps) {
  const colors = colorClasses[color];

  return (
    <Link
      href={href}
      className={`block bg-slate-800/50 backdrop-blur border ${colors.border} ${colors.bg} rounded-xl p-4 transition-all cursor-pointer group`}
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <div
            className={`w-10 h-10 ${colors.iconBg} rounded-lg flex items-center justify-center transition-colors`}
          >
            <Icon className={`w-5 h-5 ${colors.iconText}`} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <div className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </div>
            {trend && (
              <span
                className={`text-xs ${trend.isPositive ? 'text-emerald-400' : 'text-red-400'}`}
              >
                {trend.isPositive ? '+' : ''}
                {trend.value}%
              </span>
            )}
          </div>
          <div className="text-xs text-slate-400">{label}</div>
          {subtitle && <div className="text-xs text-slate-500">{subtitle}</div>}
        </div>
        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors opacity-0 group-hover:opacity-100" />
      </div>
    </Link>
  );
}
