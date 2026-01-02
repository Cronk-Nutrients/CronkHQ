'use client';

import { ReactNode } from 'react';
import { Search, X } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownConfig {
  key: string;
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}

interface FilterBarProps {
  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  filters?: FilterDropdownConfig[];
  activeFilters?: Array<{ key: string; label: string; value: string }>;
  onRemoveFilter?: (key: string) => void;
  onClearAllFilters?: () => void;
  actions?: ReactNode;
  className?: string;
}

export function FilterBar({
  searchValue = '',
  searchPlaceholder = 'Search...',
  onSearchChange,
  filters = [],
  activeFilters = [],
  onRemoveFilter,
  onClearAllFilters,
  actions,
  className = '',
}: FilterBarProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center gap-3 flex-wrap">
        {/* Search Input */}
        {onSearchChange && (
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
            {searchValue && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Filter Dropdowns */}
        {filters.map((filter) => (
          <select
            key={filter.key}
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            className="px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="">{filter.label}</option>
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ))}

        {/* Actions */}
        {actions && <div className="flex items-center gap-2 ml-auto">{actions}</div>}
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-slate-400">Filters:</span>
          {activeFilters.map((filter) => (
            <span
              key={filter.key}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-sm rounded-full"
            >
              <span className="text-slate-400 text-xs">{filter.label}:</span>
              {filter.value}
              {onRemoveFilter && (
                <button
                  onClick={() => onRemoveFilter(filter.key)}
                  className="hover:text-white ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </span>
          ))}
          {onClearAllFilters && activeFilters.length > 1 && (
            <button
              onClick={onClearAllFilters}
              className="text-sm text-slate-400 hover:text-white"
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
}
