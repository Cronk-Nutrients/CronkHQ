'use client';

import { ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Table wrapper
interface OperationsTableProps {
  children: ReactNode;
}

export function OperationsTable({ children }: OperationsTableProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          {children}
        </table>
      </div>
    </div>
  );
}

// Table header
interface TableHeaderProps {
  children: ReactNode;
}

export function TableHeader({ children }: TableHeaderProps) {
  return (
    <thead className="bg-slate-800/50 border-b border-slate-700/50">
      <tr className="text-left text-xs text-slate-400 uppercase tracking-wider">
        {children}
      </tr>
    </thead>
  );
}

// Table header cell
interface TableHeaderCellProps {
  children: ReactNode;
  align?: 'left' | 'center' | 'right';
}

export function TableHeaderCell({ children, align = 'left' }: TableHeaderCellProps) {
  const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : '';
  return (
    <th className={`px-4 py-3 font-medium ${alignClass}`}>{children}</th>
  );
}

// Table body
interface TableBodyProps {
  children: ReactNode;
}

export function TableBody({ children }: TableBodyProps) {
  return (
    <tbody className="divide-y divide-slate-700/50">
      {children}
    </tbody>
  );
}

// Empty state row
interface EmptyStateRowProps {
  colSpan: number;
  message: string;
  fallbackMessage?: string;
  isEmpty: boolean;
}

export function EmptyStateRow({ colSpan, message, fallbackMessage, isEmpty }: EmptyStateRowProps) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-12 text-center text-slate-400">
        {isEmpty ? message : fallbackMessage || 'No items match your filters.'}
      </td>
    </tr>
  );
}

// Pagination footer
interface PaginationFooterProps {
  showing: number;
  total: number;
  currentPage?: number;
  label?: string;
}

export function PaginationFooter({ showing, total, currentPage = 1, label = 'items' }: PaginationFooterProps) {
  return (
    <div className="px-5 py-4 border-t border-slate-700/50 flex items-center justify-between">
      <div className="text-sm text-slate-400">
        Showing <span className="text-white">{showing}</span> of{' '}
        <span className="text-white">{total}</span> {label}
      </div>
      <div className="flex items-center gap-2">
        <button
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 rounded-lg transition-colors disabled:opacity-50"
          disabled
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg">
          {currentPage}
        </button>
        <button
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 rounded-lg transition-colors disabled:opacity-50"
          disabled
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
