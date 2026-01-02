'use client';

import { useState, useRef, useEffect } from 'react';

export type ExportFormat = 'csv' | 'xlsx' | 'pdf' | 'json';

interface ExportOption {
  format: ExportFormat;
  label: string;
  icon: string;
  description?: string;
}

interface ExportButtonProps {
  onExport: (format: ExportFormat) => void | Promise<void>;
  formats?: ExportFormat[];
  disabled?: boolean;
  loading?: boolean;
  variant?: 'default' | 'compact' | 'icon-only';
  label?: string;
  className?: string;
}

const formatOptions: Record<ExportFormat, ExportOption> = {
  csv: {
    format: 'csv',
    label: 'CSV',
    icon: 'fa-file-csv',
    description: 'Comma-separated values',
  },
  xlsx: {
    format: 'xlsx',
    label: 'Excel',
    icon: 'fa-file-excel',
    description: 'Microsoft Excel format',
  },
  pdf: {
    format: 'pdf',
    label: 'PDF',
    icon: 'fa-file-pdf',
    description: 'Portable Document Format',
  },
  json: {
    format: 'json',
    label: 'JSON',
    icon: 'fa-file-code',
    description: 'JavaScript Object Notation',
  },
};

const formatColors: Record<ExportFormat, string> = {
  csv: 'text-blue-400',
  xlsx: 'text-green-400',
  pdf: 'text-red-400',
  json: 'text-amber-400',
};

export default function ExportButton({
  onExport,
  formats = ['csv', 'xlsx', 'pdf'],
  disabled = false,
  loading = false,
  variant = 'default',
  label = 'Export',
  className = '',
}: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [exportingFormat, setExportingFormat] = useState<ExportFormat | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExport = async (format: ExportFormat) => {
    setExportingFormat(format);
    try {
      await onExport(format);
    } finally {
      setExportingFormat(null);
      setIsOpen(false);
    }
  };

  // Single format - render as simple button
  if (formats.length === 1) {
    const format = formats[0];
    const option = formatOptions[format];
    return (
      <button
        onClick={() => handleExport(format)}
        disabled={disabled || loading || exportingFormat !== null}
        className={`flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {exportingFormat === format ? (
          <i className="fas fa-spinner fa-spin"></i>
        ) : (
          <i className={`fas ${option.icon} ${formatColors[format]}`}></i>
        )}
        {variant !== 'icon-only' && <span>{option.label}</span>}
      </button>
    );
  }

  // Multiple formats - render as dropdown
  if (variant === 'compact') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-lg p-1">
          {formats.map(format => {
            const option = formatOptions[format];
            return (
              <button
                key={format}
                onClick={() => handleExport(format)}
                disabled={disabled || loading || exportingFormat !== null}
                className={`px-3 py-1.5 hover:bg-slate-700 text-slate-300 hover:text-white rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                title={option.description}
              >
                {exportingFormat === format ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  option.label
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled || loading}
        className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <i className="fas fa-spinner fa-spin"></i>
        ) : (
          <i className="fas fa-download"></i>
        )}
        {variant !== 'icon-only' && (
          <>
            <span>{label}</span>
            <i className={`fas fa-chevron-down text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="p-2 border-b border-slate-700">
            <div className="text-xs text-slate-400 uppercase tracking-wider">Export Format</div>
          </div>
          <div className="p-1">
            {formats.map(format => {
              const option = formatOptions[format];
              return (
                <button
                  key={format}
                  onClick={() => handleExport(format)}
                  disabled={exportingFormat !== null}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50"
                >
                  <i className={`fas ${option.icon} ${formatColors[format]} w-4`}></i>
                  <div className="text-left flex-1">
                    <div className="text-white text-sm">{option.label}</div>
                    {option.description && (
                      <div className="text-xs text-slate-400">{option.description}</div>
                    )}
                  </div>
                  {exportingFormat === format && (
                    <i className="fas fa-spinner fa-spin text-slate-400"></i>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// Utility function to export data as CSV
export function exportToCSV(data: Record<string, unknown>[], filename: string) {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => {
        const value = row[header];
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, `${filename}.csv`);
}

// Utility function to export data as JSON
export function exportToJSON(data: unknown, filename: string) {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  downloadBlob(blob, `${filename}.json`);
}

// Helper to trigger download
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
