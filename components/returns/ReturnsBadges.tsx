'use client';

import { Return, ItemCondition } from '@/context/AppContext';
import { returnStatusConfig, conditionLabels } from './ReturnsConfig';

// Return Status Badge
interface ReturnStatusBadgeProps {
  status: Return['status'];
  size?: 'sm' | 'md';
}

export function ReturnStatusBadge({ status, size = 'sm' }: ReturnStatusBadgeProps) {
  const config = returnStatusConfig[status];
  const sizeClasses = size === 'sm'
    ? 'px-2.5 py-1 text-xs'
    : 'px-3 py-1.5 text-sm';
  const iconSize = size === 'sm' ? 'text-[10px]' : '';

  const colorClasses: Record<string, string> = {
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <span className={`inline-flex items-center gap-1 ${sizeClasses} ${colorClasses[config.color]} font-medium rounded-full border`}>
      <i className={`fas ${config.icon} ${iconSize}`}></i>
      {config.label}
    </span>
  );
}

// Return Channel Badge
interface ReturnChannelBadgeProps {
  channel: Return['channel'];
}

export function ReturnChannelBadge({ channel }: ReturnChannelBadgeProps) {
  switch (channel) {
    case 'shopify':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full border border-green-500/20">
          <i className="fab fa-shopify"></i>
          Shopify
        </span>
      );
    case 'amazon_fbm':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-500/10 text-orange-400 text-xs font-medium rounded-full border border-orange-500/20">
          <i className="fab fa-amazon"></i>
          FBM
        </span>
      );
    case 'amazon_fba':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-500/10 text-orange-400 text-xs font-medium rounded-full border border-orange-500/20">
          <i className="fab fa-amazon"></i>
          FBA
        </span>
      );
    case 'manual':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-500/10 text-slate-400 text-xs font-medium rounded-full border border-slate-500/20">
          <i className="fas fa-user"></i>
          Manual
        </span>
      );
  }
}

// Item Condition Badge
interface ConditionBadgeProps {
  condition: ItemCondition;
}

export function ConditionBadge({ condition }: ConditionBadgeProps) {
  const config = conditionLabels[condition];

  const colorClasses: Record<string, string> = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${colorClasses[config.color]}`}>
      {config.label}
    </span>
  );
}
