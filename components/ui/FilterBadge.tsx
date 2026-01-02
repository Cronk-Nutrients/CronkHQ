'use client';

import { X } from 'lucide-react';

interface FilterBadgeProps {
  label: string;
  value: string;
  onRemove: () => void;
}

export function FilterBadge({ label, value, onRemove }: FilterBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs">
      <span className="text-emerald-400/70">{label}:</span>
      <span className="font-medium">{value}</span>
      <button
        onClick={onRemove}
        className="ml-0.5 p-0.5 hover:bg-emerald-500/30 rounded transition-colors"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}

interface ActiveFiltersProps {
  filters: Array<{
    key: string;
    label: string;
    value: string;
  }>;
  onRemove: (key: string) => void;
  onClearAll: () => void;
}

export function ActiveFilters({ filters, onRemove, onClearAll }: ActiveFiltersProps) {
  if (filters.length === 0) return null;

  return (
    <div className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
      <span className="text-sm text-emerald-400 flex-shrink-0">Filtered by:</span>
      <div className="flex items-center gap-2 flex-wrap flex-1">
        {filters.map((filter) => (
          <FilterBadge
            key={filter.key}
            label={filter.label}
            value={filter.value}
            onRemove={() => onRemove(filter.key)}
          />
        ))}
      </div>
      <button
        onClick={onClearAll}
        className="text-sm text-slate-400 hover:text-white transition-colors flex-shrink-0"
      >
        Clear All
      </button>
    </div>
  );
}
