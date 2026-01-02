'use client';

type ExportFormat = 'csv' | 'xlsx' | 'pdf';

interface ExportActionsProps {
  onExport: (format: ExportFormat) => void;
  formats?: ExportFormat[];
  loading?: boolean;
}

export default function ExportActions({
  onExport,
  formats = ['csv', 'xlsx', 'pdf'],
  loading = false,
}: ExportActionsProps) {
  return (
    <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-lg p-1">
      {formats.map(format => (
        <button
          key={format}
          onClick={() => onExport(format)}
          disabled={loading}
          className="px-3 py-1.5 hover:bg-slate-700 text-slate-300 hover:text-white rounded text-sm transition-colors disabled:opacity-50"
        >
          {loading ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            format.toUpperCase()
          )}
        </button>
      ))}
    </div>
  );
}
