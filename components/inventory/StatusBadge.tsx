'use client';

import { ReactNode } from 'react';

// Generic status badge configuration
export interface StatusConfig {
  color: string;
  icon: string;
  label: string;
}

interface StatusBadgeProps {
  status: string;
  config: Record<string, StatusConfig>;
  animated?: boolean;
}

export function StatusBadge({ status, config, animated = false }: StatusBadgeProps) {
  const cfg = config[status];
  if (!cfg) return null;

  const colorClasses: Record<string, string> = {
    slate: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full border ${colorClasses[cfg.color] || colorClasses.slate}`}>
      <i className={`fas ${cfg.icon} ${animated ? 'fa-spin' : ''} text-[10px]`}></i>
      {cfg.label}
    </span>
  );
}

// Common status configurations
export const stockCountStatusConfig: Record<string, StatusConfig> = {
  draft: { color: 'slate', icon: 'fa-file', label: 'Draft' },
  in_progress: { color: 'blue', icon: 'fa-spinner', label: 'In Progress' },
  completed: { color: 'emerald', icon: 'fa-check-circle', label: 'Completed' },
  cancelled: { color: 'red', icon: 'fa-times-circle', label: 'Cancelled' },
};

export const transferStatusConfig: Record<string, StatusConfig> = {
  draft: { color: 'slate', icon: 'fa-edit', label: 'Draft' },
  pending: { color: 'amber', icon: 'fa-clock', label: 'Pending' },
  in_transit: { color: 'blue', icon: 'fa-truck', label: 'In Transit' },
  received: { color: 'emerald', icon: 'fa-check', label: 'Received' },
  cancelled: { color: 'red', icon: 'fa-times', label: 'Cancelled' },
};

export const countTypeConfig: Record<string, { label: string; color: string }> = {
  full: { label: 'Full Count', color: 'purple' },
  cycle: { label: 'Cycle Count', color: 'blue' },
  spot: { label: 'Spot Check', color: 'amber' },
};

export function TypeBadge({ type, config }: { type: string; config: Record<string, { label: string; color: string }> }) {
  const cfg = config[type];
  if (!cfg) return null;

  const colorClasses: Record<string, string> = {
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded border ${colorClasses[cfg.color] || ''}`}>
      {cfg.label}
    </span>
  );
}

// Stock status component
interface StockStatusProps {
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  compact?: boolean;
}

export function StockStatus({ status, compact = false }: StockStatusProps) {
  const configs = {
    in_stock: { text: 'In Stock', color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: '✓' },
    low_stock: { text: 'Low Stock', color: 'text-amber-400', bg: 'bg-amber-500/10', icon: '↓' },
    out_of_stock: { text: 'Out of Stock', color: 'text-red-400', bg: 'bg-red-500/10', icon: '✗' },
  };

  const cfg = configs[status];

  if (compact) {
    return <span className={`text-xs ${cfg.color}`}>{cfg.icon} {cfg.text}</span>;
  }

  return (
    <span className={`text-xs px-2 py-1 rounded ${cfg.bg} ${cfg.color}`}>
      {cfg.text}
    </span>
  );
}

// Category badge/icon
export interface CategoryStyle {
  gradient: string;
  border: string;
  text: string;
  icon: string;
  label: string;
}

export const categoryStyles: Record<string, CategoryStyle> = {
  nutrients: {
    gradient: 'from-emerald-500/20 to-emerald-600/20',
    border: 'border-emerald-500/20',
    text: 'text-emerald-400',
    icon: 'fa-flask',
    label: 'Nutrients',
  },
  supplements: {
    gradient: 'from-purple-500/20 to-purple-600/20',
    border: 'border-purple-500/20',
    text: 'text-purple-400',
    icon: 'fa-seedling',
    label: 'Supplements',
  },
  ph_adjusters: {
    gradient: 'from-blue-500/20 to-blue-600/20',
    border: 'border-blue-500/20',
    text: 'text-blue-400',
    icon: 'fa-vial',
    label: 'pH Adjusters',
  },
  bundles: {
    gradient: 'from-amber-500/20 to-amber-600/20',
    border: 'border-amber-500/20',
    text: 'text-amber-400',
    icon: 'fa-boxes-stacked',
    label: 'Bundles',
  },
};

export function getCategoryStyle(category: string): CategoryStyle {
  return categoryStyles[category] || categoryStyles.nutrients;
}

export function CategoryIcon({ category, size = 'md' }: { category: string; size?: 'sm' | 'md' | 'lg' }) {
  const style = getCategoryStyle(category);
  const sizes = {
    sm: { container: 'w-8 h-8', icon: 'text-sm' },
    md: { container: 'w-12 h-12', icon: '' },
    lg: { container: 'w-16 h-16', icon: 'text-2xl' },
  };

  return (
    <div className={`${sizes[size].container} bg-gradient-to-br ${style.gradient} rounded-lg flex items-center justify-center border ${style.border}`}>
      <i className={`fas ${style.icon} ${style.text} ${sizes[size].icon}`}></i>
    </div>
  );
}
