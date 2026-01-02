'use client';

import { ReactNode } from 'react';

// Empty state component
interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  showFilterHint?: boolean;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, showFilterHint, action }: EmptyStateProps) {
  return (
    <div className="p-8 text-center text-slate-500">
      <i className={`fas ${icon} text-4xl mb-4 text-slate-600`}></i>
      <p className="font-medium text-white mb-2">{title}</p>
      <p className="text-sm text-slate-400">{description}</p>
      {showFilterHint && (
        <p className="text-sm mt-2">Try adjusting your filters</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

// Pagination component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  itemLabel?: string;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  itemLabel = 'items',
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = ((currentPage - 1) * itemsPerPage) + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between p-4 border-t border-slate-700/50">
      <div className="text-sm text-slate-400">
        Showing {startItem} to {endItem} of {totalItems} {itemLabel}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-slate-300 transition-colors"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum: number;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                currentPage === pageNum
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-300'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-slate-300 transition-colors"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}

// Table wrapper with header
interface TableWrapperProps {
  children: ReactNode;
}

export function TableWrapper({ children }: TableWrapperProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
      {children}
    </div>
  );
}

// Table header cell
interface TableHeaderProps {
  columns: Array<{
    key: string;
    header: string;
    align?: 'left' | 'center' | 'right';
    className?: string;
  }>;
}

export function TableHeader({ columns }: TableHeaderProps) {
  return (
    <thead>
      <tr className="border-b border-slate-700/50">
        {columns.map(col => (
          <th
            key={col.key}
            className={`p-4 text-xs font-medium text-slate-400 uppercase tracking-wider ${
              col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
            } ${col.className || ''}`}
          >
            {col.header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

// Action button styles
interface ActionButtonProps {
  icon: string;
  onClick: (e: React.MouseEvent) => void;
  color?: 'slate' | 'blue' | 'emerald' | 'amber' | 'red';
  title?: string;
  disabled?: boolean;
}

export function ActionButton({ icon, onClick, color = 'slate', title, disabled }: ActionButtonProps) {
  const colorClasses: Record<string, string> = {
    slate: 'text-slate-400 hover:bg-slate-600/50',
    blue: 'text-blue-400 hover:bg-blue-500/20',
    emerald: 'text-emerald-400 hover:bg-emerald-500/20',
    amber: 'text-amber-400 hover:bg-amber-500/20',
    red: 'text-red-400 hover:bg-red-500/20',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-lg transition-colors ${colorClasses[color]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <i className={`fas ${icon}`}></i>
    </button>
  );
}

// Primary action button
interface PrimaryActionButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function PrimaryActionButton({ icon, label, onClick, variant = 'primary' }: PrimaryActionButtonProps) {
  const variantClasses = {
    primary: 'bg-emerald-600 hover:bg-emerald-500 text-white',
    secondary: 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300',
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${variantClasses[variant]}`}
    >
      <i className={`fas ${icon} text-sm`}></i>
      {label}
    </button>
  );
}
