// Shared formatting utilities

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatPercent(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-US', options || defaultOptions);
}

export function formatWeight(lbs: number, decimals: number = 1): string {
  return `${lbs.toFixed(decimals)} lbs`;
}

// Status badge color utilities
export type StatusType = 'success' | 'warning' | 'error' | 'info' | 'neutral';

export function getStatusColor(status: StatusType): string {
  switch (status) {
    case 'success':
      return 'bg-emerald-500/20 text-emerald-400';
    case 'warning':
      return 'bg-amber-500/20 text-amber-400';
    case 'error':
      return 'bg-red-500/20 text-red-400';
    case 'info':
      return 'bg-blue-500/20 text-blue-400';
    case 'neutral':
    default:
      return 'bg-slate-500/20 text-slate-400';
  }
}

export function getMarginStatus(margin: number): StatusType {
  if (margin >= 40) return 'success';
  if (margin >= 25) return 'warning';
  return 'error';
}

export function getStockStatus(status: string): StatusType {
  switch (status) {
    case 'healthy':
      return 'success';
    case 'low':
      return 'warning';
    case 'out':
      return 'error';
    case 'overstock':
      return 'info';
    default:
      return 'neutral';
  }
}

export function getFrequencyColor(frequency: string): string {
  switch (frequency) {
    case 'daily':
      return 'bg-emerald-500/20 text-emerald-400';
    case 'weekly':
      return 'bg-blue-500/20 text-blue-400';
    case 'monthly':
      return 'bg-purple-500/20 text-purple-400';
    default:
      return 'bg-slate-500/20 text-slate-400';
  }
}

export function getFormatIcon(format: string): string {
  switch (format) {
    case 'pdf':
      return 'fa-file-pdf text-red-400';
    case 'xlsx':
      return 'fa-file-excel text-green-400';
    case 'csv':
      return 'fa-file-csv text-blue-400';
    case 'json':
      return 'fa-file-code text-amber-400';
    default:
      return 'fa-file text-slate-400';
  }
}
