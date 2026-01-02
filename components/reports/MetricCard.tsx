'use client';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

export default function MetricCard({
  label,
  value,
  subtext,
  icon,
  trend,
  variant = 'default',
  className = '',
}: MetricCardProps) {
  const variantClasses: Record<string, string> = {
    default: 'bg-slate-800/50 border-slate-700/50',
    success: 'bg-emerald-500/10 border-emerald-500/30',
    warning: 'bg-amber-500/10 border-amber-500/30',
    error: 'bg-red-500/10 border-red-500/30',
    info: 'bg-blue-500/10 border-blue-500/30',
  };

  const valueColorClasses: Record<string, string> = {
    default: 'text-white',
    success: 'text-emerald-400',
    warning: 'text-amber-400',
    error: 'text-red-400',
    info: 'text-blue-400',
  };

  const trendColors = {
    up: 'text-emerald-400',
    down: 'text-red-400',
    neutral: 'text-slate-400',
  };

  const trendIcons = {
    up: 'fa-arrow-up',
    down: 'fa-arrow-down',
    neutral: 'fa-minus',
  };

  return (
    <div className={`backdrop-blur border rounded-xl p-5 ${variantClasses[variant]} ${className}`}>
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
        {icon && <i className={`fas ${icon}`}></i>}
        {label}
      </div>
      <div className={`text-2xl font-bold ${valueColorClasses[variant]}`}>{value}</div>
      {(subtext || trend) && (
        <div className="text-xs mt-1 flex items-center gap-2">
          {trend && (
            <span className={trendColors[trend.direction]}>
              <i className={`fas ${trendIcons[trend.direction]} mr-1`}></i>
              {trend.value}% vs last period
            </span>
          )}
          {subtext && !trend && <span className="text-slate-400">{subtext}</span>}
        </div>
      )}
    </div>
  );
}

// Grid wrapper for consistent metric card layouts
export function MetricCardGrid({
  children,
  columns = 4
}: {
  children: React.ReactNode;
  columns?: 2 | 3 | 4 | 5;
}) {
  const colClasses: Record<number, string> = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
  };

  return (
    <div className={`grid ${colClasses[columns]} gap-4`}>
      {children}
    </div>
  );
}
