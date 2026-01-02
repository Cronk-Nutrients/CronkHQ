'use client';

import { formatCurrency, formatNumber } from '@/lib/formatting';

interface MetricConfig {
  label: string;
  value: number;
  format?: 'currency' | 'number' | 'percent' | 'multiplier' | 'thousands';
  highlight?: boolean;
  highlightColor?: 'emerald' | 'amber' | 'blue';
  trend?: string;
}

interface MetricsGridProps {
  metrics: MetricConfig[];
  columns?: 4 | 5 | 6;
}

const colsMap: Record<number, string> = {
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
};

export function MetricsGrid({ metrics, columns = 5 }: MetricsGridProps) {
  const formatValue = (value: number, format?: string) => {
    switch (format) {
      case 'currency': return formatCurrency(value);
      case 'percent': return `${value.toFixed(2)}%`;
      case 'multiplier': return `${value.toFixed(2)}x`;
      case 'thousands': return `${(value / 1000).toFixed(1)}K`;
      case 'number':
      default: return formatNumber(value);
    }
  };

  const getHighlightClasses = (highlight?: boolean, color?: string) => {
    if (!highlight) return 'border-slate-700/50';
    const colorMap: Record<string, string> = {
      emerald: 'border-emerald-500/30 bg-emerald-500/5',
      amber: 'border-amber-500/30 bg-amber-500/5',
      blue: 'border-blue-500/30 bg-blue-500/5',
    };
    return colorMap[color || 'emerald'] || colorMap.emerald;
  };

  const getValueColor = (highlight?: boolean, color?: string) => {
    if (!highlight) return 'text-white';
    const colorMap: Record<string, string> = {
      emerald: 'text-emerald-400',
      amber: 'text-amber-400',
      blue: 'text-blue-400',
    };
    return colorMap[color || 'emerald'] || colorMap.emerald;
  };

  return (
    <div className={`grid ${colsMap[columns]} gap-4`}>
      {metrics.map((metric, index) => (
        <div
          key={index}
          className={`bg-slate-800/50 backdrop-blur border rounded-xl p-4 ${getHighlightClasses(metric.highlight, metric.highlightColor)}`}
        >
          <div className="text-sm text-slate-400 mb-1">{metric.label}</div>
          <div className={`text-2xl font-bold ${getValueColor(metric.highlight, metric.highlightColor)}`}>
            {formatValue(metric.value, metric.format)}
          </div>
          {metric.trend && <div className="text-xs text-emerald-400 mt-1">{metric.trend}</div>}
        </div>
      ))}
    </div>
  );
}

// Secondary metrics grid with smaller values
export function SecondaryMetricsGrid({ metrics, columns = 4 }: MetricsGridProps) {
  const formatValue = (value: number, format?: string) => {
    switch (format) {
      case 'currency': return formatCurrency(value);
      case 'percent': return `${value.toFixed(2)}%`;
      case 'number':
      default: return formatNumber(value);
    }
  };

  return (
    <div className={`grid ${colsMap[columns]} gap-4`}>
      {metrics.map((metric, index) => (
        <div key={index} className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">{metric.label}</div>
          <div className="text-lg font-bold text-white">{formatValue(metric.value, metric.format)}</div>
        </div>
      ))}
    </div>
  );
}
