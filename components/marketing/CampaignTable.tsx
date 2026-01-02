'use client';

import { ReactNode } from 'react';
import { formatCurrency, formatNumber } from '@/lib/formatting';

interface Column<T> {
  key: string;
  header: string;
  align?: 'left' | 'right';
  render?: (value: unknown, row: T) => ReactNode;
}

interface CampaignTableProps<T> {
  title: string;
  subtitle?: string;
  columns: Column<T>[];
  data: T[];
  getRowKey: (row: T) => string;
  headerAction?: { label: string; icon: string; onClick: () => void };
}

export function CampaignTable<T extends object>({
  title,
  subtitle,
  columns,
  data,
  getRowKey,
  headerAction,
}: CampaignTableProps<T>) {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
        </div>
        {headerAction && (
          <button onClick={headerAction.onClick} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-sm">
            <i className={`${headerAction.icon} mr-2`}></i>
            {headerAction.label}
          </button>
        )}
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700 text-left">
            {columns.map((col) => (
              <th key={col.key} className={`p-4 text-slate-400 font-medium ${col.align === 'right' ? 'text-right' : ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/50">
          {data.map((row) => (
            <tr key={getRowKey(row)} className="hover:bg-slate-800/30">
              {columns.map((col) => (
                <td key={col.key} className={`p-4 ${col.align === 'right' ? 'text-right' : ''}`}>
                  {col.render
                    ? col.render((row as Record<string, unknown>)[col.key], row)
                    : String((row as Record<string, unknown>)[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Status dot component
export function StatusDot({ active }: { active: boolean }) {
  return <div className={`w-2 h-2 rounded-full ${active ? 'bg-emerald-400' : 'bg-slate-500'}`}></div>;
}

// Campaign name cell
export function CampaignNameCell({ name, active = true }: { name: string; active?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <StatusDot active={active} />
      <span className="text-white">{name}</span>
    </div>
  );
}

// Badge cell
export function TypeBadge({ type, variant = 'default' }: { type: string; variant?: 'default' | 'blue' | 'purple' | 'orange' }) {
  const variantClasses: Record<string, string> = {
    default: 'bg-slate-700 text-slate-300',
    blue: 'bg-blue-500/20 text-blue-400',
    purple: 'bg-purple-500/20 text-purple-400',
    orange: 'bg-orange-500/20 text-orange-400',
  };
  return <span className={`px-2 py-1 text-xs rounded ${variantClasses[variant]}`}>{type}</span>;
}

// ROAS badge
export function RoasBadge({ roas, thresholds = { high: 5, medium: 3 } }: { roas: number; thresholds?: { high: number; medium: number } }) {
  const variant = roas >= thresholds.high ? 'bg-emerald-500/20 text-emerald-400' : roas >= thresholds.medium ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400';
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${variant}`}>{roas.toFixed(2)}x</span>;
}

// ACoS badge
export function AcosBadge({ acos }: { acos: number }) {
  const variant = acos <= 18 ? 'bg-emerald-500/20 text-emerald-400' : acos <= 25 ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400';
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${variant}`}>{acos.toFixed(2)}%</span>;
}

// Currency cell
export function CurrencyCell({ value, variant = 'default' }: { value: number; variant?: 'default' | 'success' }) {
  const colorClass = variant === 'success' ? 'text-emerald-400' : 'text-white';
  return <span className={colorClass}>{formatCurrency(value)}</span>;
}

// Number cell
export function NumberCell({ value, variant = 'default' }: { value: number; variant?: 'default' | 'muted' }) {
  const colorClass = variant === 'muted' ? 'text-slate-300' : 'text-white';
  return <span className={colorClass}>{formatNumber(value)}</span>;
}
