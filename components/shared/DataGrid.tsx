'use client';

import { ReactNode, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface Column<T> {
  key: string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (value: unknown, row: T, index: number) => ReactNode;
}

interface DataGridProps<T> {
  columns: Column<T>[];
  data: T[];
  getRowKey: (row: T, index: number) => string;
  title?: string;
  subtitle?: string;
  headerActions?: ReactNode;
  emptyMessage?: string;
  emptyIcon?: string;
  onRowClick?: (row: T) => void;
  selectable?: boolean;
  selectedKeys?: Set<string>;
  onSelectionChange?: (keys: Set<string>) => void;
  pagination?: {
    pageSize: number;
    currentPage: number;
    onPageChange: (page: number) => void;
  };
  footer?: ReactNode;
  stickyHeader?: boolean;
  maxHeight?: string;
  className?: string;
}

export function DataGrid<T extends object>({
  columns,
  data,
  getRowKey,
  title,
  subtitle,
  headerActions,
  emptyMessage = 'No data available',
  emptyIcon = 'fas fa-inbox',
  onRowClick,
  selectable,
  selectedKeys = new Set(),
  onSelectionChange,
  pagination,
  footer,
  stickyHeader,
  maxHeight,
  className = '',
}: DataGridProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  // Handle sorting
  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  // Sort data if needed
  const sortedData = sortKey
    ? [...data].sort((a, b) => {
        const aVal = (a as Record<string, unknown>)[sortKey] as string | number;
        const bVal = (b as Record<string, unknown>)[sortKey] as string | number;
        if (aVal === bVal) return 0;
        const cmp = aVal < bVal ? -1 : 1;
        return sortDir === 'asc' ? cmp : -cmp;
      })
    : data;

  // Paginate data if needed
  const paginatedData = pagination
    ? sortedData.slice(
        (pagination.currentPage - 1) * pagination.pageSize,
        pagination.currentPage * pagination.pageSize
      )
    : sortedData;

  const totalPages = pagination
    ? Math.ceil(sortedData.length / pagination.pageSize)
    : 1;

  // Selection handlers
  const handleSelectAll = () => {
    if (!onSelectionChange) return;
    const allKeys = new Set(paginatedData.map((row, i) => getRowKey(row, i)));
    const allSelected = [...allKeys].every((key) => selectedKeys.has(key));
    if (allSelected) {
      const newKeys = new Set(selectedKeys);
      allKeys.forEach((key) => newKeys.delete(key));
      onSelectionChange(newKeys);
    } else {
      onSelectionChange(new Set([...selectedKeys, ...allKeys]));
    }
  };

  const handleSelectRow = (key: string) => {
    if (!onSelectionChange) return;
    const newKeys = new Set(selectedKeys);
    if (newKeys.has(key)) {
      newKeys.delete(key);
    } else {
      newKeys.add(key);
    }
    onSelectionChange(newKeys);
  };

  return (
    <div className={`bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden ${className}`}>
      {(title || headerActions) && (
        <div className="px-4 py-3 border-b border-slate-700/50 flex items-center justify-between">
          <div>
            {title && <h3 className="text-white font-semibold">{title}</h3>}
            {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
          </div>
          {headerActions && <div className="flex items-center gap-2">{headerActions}</div>}
        </div>
      )}

      <div className={maxHeight ? `overflow-auto ${maxHeight}` : ''}>
        <table className="w-full">
          <thead className={`${stickyHeader ? 'sticky top-0 z-10' : ''} bg-slate-800/80`}>
            <tr>
              {selectable && (
                <th className="w-12 px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={paginatedData.length > 0 && paginatedData.every((row, i) => selectedKeys.has(getRowKey(row, i)))}
                    onChange={handleSelectAll}
                    className="rounded border-slate-600 bg-slate-700 text-emerald-500 focus:ring-emerald-500"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider ${
                    col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                  } ${col.sortable ? 'cursor-pointer hover:text-slate-300' : ''}`}
                  style={{ width: col.width }}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="flex items-center gap-2">
                    {col.header}
                    {col.sortable && sortKey === col.key && (
                      <i className={`fas fa-sort-${sortDir === 'asc' ? 'up' : 'down'} text-emerald-400`}></i>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-12 text-center">
                  <i className={`${emptyIcon} text-4xl text-slate-600 mb-3`}></i>
                  <p className="text-slate-400">{emptyMessage}</p>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => {
                const rowKey = getRowKey(row, index);
                return (
                  <tr
                    key={rowKey}
                    onClick={() => onRowClick?.(row)}
                    className={`${onRowClick ? 'cursor-pointer hover:bg-slate-700/30' : ''} ${
                      selectedKeys.has(rowKey) ? 'bg-emerald-500/10' : ''
                    }`}
                  >
                    {selectable && (
                      <td className="w-12 px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedKeys.has(rowKey)}
                          onChange={() => handleSelectRow(rowKey)}
                          onClick={(e) => e.stopPropagation()}
                          className="rounded border-slate-600 bg-slate-700 text-emerald-500 focus:ring-emerald-500"
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`px-4 py-3 ${
                          col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                        }`}
                      >
                        {col.render
                          ? col.render((row as Record<string, unknown>)[col.key], row, index)
                          : String((row as Record<string, unknown>)[col.key] ?? '')}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
          {footer && <tfoot className="border-t border-slate-700">{footer}</tfoot>}
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="px-4 py-3 border-t border-slate-700/50 flex items-center justify-between">
          <span className="text-sm text-slate-400">
            Showing {(pagination.currentPage - 1) * pagination.pageSize + 1} to{' '}
            {Math.min(pagination.currentPage * pagination.pageSize, sortedData.length)} of {sortedData.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="p-2 rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 text-slate-400" />
            </button>
            <span className="text-sm text-slate-300">
              {pagination.currentPage} / {totalPages}
            </span>
            <button
              onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
