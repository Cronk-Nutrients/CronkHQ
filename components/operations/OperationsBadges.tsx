'use client';

import { Check, Loader2, ArrowUp, Flame } from 'lucide-react';
import { PurchaseOrder, WorkOrder } from '@/context/AppContext';

// PO Status Badge
interface POStatusBadgeProps {
  status: PurchaseOrder['status'];
}

export function POStatusBadge({ status }: POStatusBadgeProps) {
  const configs: Record<PurchaseOrder['status'], { bg: string; text: string; label: string }> = {
    draft: { bg: 'bg-slate-500/10', text: 'text-slate-400', label: 'Draft' },
    sent: { bg: 'bg-amber-500/10', text: 'text-amber-400', label: 'Pending' },
    partial: { bg: 'bg-blue-500/10', text: 'text-blue-400', label: 'Partial' },
    received: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', label: 'Received' },
    cancelled: { bg: 'bg-red-500/10', text: 'text-red-400', label: 'Cancelled' },
  };

  const config = configs[status] || configs.draft;

  return (
    <span className={`px-2 py-1 ${config.bg} ${config.text} text-xs rounded-full`}>
      {config.label}
    </span>
  );
}

// WO Status Badge
interface WOStatusBadgeProps {
  status: WorkOrder['status'];
}

export function WOStatusBadge({ status }: WOStatusBadgeProps) {
  switch (status) {
    case 'pending':
      return (
        <span className="px-2 py-1 bg-slate-500/10 text-slate-400 text-xs rounded-full">
          Pending
        </span>
      );
    case 'in_progress':
      return (
        <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full flex items-center gap-1">
          <Loader2 className="w-3 h-3 animate-spin" />
          In Progress
        </span>
      );
    case 'completed':
      return (
        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full flex items-center gap-1">
          <Check className="w-3 h-3" />
          Completed
        </span>
      );
    case 'cancelled':
      return (
        <span className="px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded-full">
          Cancelled
        </span>
      );
    default:
      return (
        <span className="px-2 py-1 bg-slate-500/10 text-slate-400 text-xs rounded-full">
          {status}
        </span>
      );
  }
}

// Priority Badge
interface PriorityBadgeProps {
  priority: 'normal' | 'high' | 'urgent';
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  if (priority === 'normal') return null;

  const styles = {
    high: 'text-amber-400',
    urgent: 'text-red-400',
  };

  const icons = {
    high: ArrowUp,
    urgent: Flame,
  };

  const Icon = icons[priority];

  return (
    <span className={`flex items-center gap-1 text-xs ${styles[priority]}`}>
      <Icon className="w-3 h-3" />
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
}
