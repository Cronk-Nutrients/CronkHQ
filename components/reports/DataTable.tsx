'use client';

import { ReactNode } from 'react';

interface Column<T> {
  key: string;
  header: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: T, index: number) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  title?: string;
  subtitle?: string;
  headerActions?: ReactNode;
  footer?: ReactNode;
  emptyMessage?: string;
  emptyIcon?: string;
  maxHeight?: string;
  onRowClick?: (row: T, index: number) => void;
  getRowKey?: (row: T, index: number) => string;
}

export default function DataTable<T extends object>({
  columns,
  data,
  title,
  subtitle,
  headerActions,
  footer,
  emptyMessage = 'No data available',
  emptyIcon = 'fa-inbox',
  maxHeight,
  onRowClick,
  getRowKey,
}: DataTableProps<T>) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
      {(title || headerActions) && (
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <div>
            {title && <h3 className="text-white font-semibold">{title}</h3>}
            {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
          </div>
          {headerActions}
        </div>
      )}

      <div className={maxHeight ? `max-h-[${maxHeight}] overflow-y-auto` : ''}>
        <table className="w-full">
          <thead className={maxHeight ? 'sticky top-0 bg-slate-800/90 backdrop-blur' : ''}>
            <tr className="border-b border-slate-700 text-left">
              {columns.map(col => (
                <th
                  key={col.key}
                  className={`p-4 text-slate-400 font-medium ${alignClasses[col.align || 'left']} ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={getRowKey ? getRowKey(row, rowIndex) : rowIndex}
                  className={`hover:bg-slate-800/30 ${onRowClick ? 'cursor-pointer' : ''}`}
                  onClick={() => onRowClick?.(row, rowIndex)}
                >
                  {columns.map(col => (
                    <td
                      key={col.key}
                      className={`p-4 ${alignClasses[col.align || 'left']} ${col.className || ''}`}
                    >
                      {col.render
                        ? col.render((row as Record<string, unknown>)[col.key], row, rowIndex)
                        : ((row as Record<string, unknown>)[col.key] as ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="p-8 text-center text-slate-400">
                  <i className={`fas ${emptyIcon} text-3xl mb-2 opacity-50`}></i>
                  <p>{emptyMessage}</p>
                </td>
              </tr>
            )}
          </tbody>
          {footer && (
            <tfoot className="border-t border-slate-700 bg-slate-800/50">
              {footer}
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}

// Status badge component for table cells
interface StatusBadgeProps {
  status: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  showDot?: boolean;
  pulse?: boolean;
}

export function StatusBadge({
  status,
  variant = 'neutral',
  showDot = false,
  pulse = false,
}: StatusBadgeProps) {
  const variantClasses: Record<string, string> = {
    success: 'bg-emerald-500/20 text-emerald-400',
    warning: 'bg-amber-500/20 text-amber-400',
    error: 'bg-red-500/20 text-red-400',
    info: 'bg-blue-500/20 text-blue-400',
    neutral: 'bg-slate-500/20 text-slate-400',
  };

  const dotColors: Record<string, string> = {
    success: 'bg-emerald-400',
    warning: 'bg-amber-400',
    error: 'bg-red-400',
    info: 'bg-blue-400',
    neutral: 'bg-slate-400',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${variantClasses[variant]}`}>
      {showDot && (
        <div className={`w-2 h-2 rounded-full ${dotColors[variant]} ${pulse ? 'animate-pulse' : ''}`}></div>
      )}
      {status}
    </span>
  );
}

// Margin badge for displaying profit margins
interface MarginBadgeProps {
  margin: number;
  thresholds?: { high: number; medium: number };
}

export function MarginBadge({
  margin,
  thresholds = { high: 40, medium: 25 }
}: MarginBadgeProps) {
  const variant = margin >= thresholds.high ? 'success' : margin >= thresholds.medium ? 'warning' : 'error';
  return <StatusBadge status={`${margin.toFixed(1)}%`} variant={variant} />;
}
