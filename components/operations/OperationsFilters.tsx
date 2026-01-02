'use client';

import { ReactNode } from 'react';
import { Search } from 'lucide-react';

// Search input
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = 'Search...' }: SearchInputProps) {
  return (
    <div className="flex-1 relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50"
      />
    </div>
  );
}

// Filter select
interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function FilterSelect({ value, onChange, options, placeholder }: FilterSelectProps) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-emerald-500/50"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}

// Filter bar container
interface FilterBarProps {
  children: ReactNode;
  onClear?: () => void;
  showClear?: boolean;
}

export function FilterBar({ children, onClear, showClear }: FilterBarProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
      <div className="flex items-center gap-4">
        {children}
        {showClear && onClear && (
          <button
            onClick={onClear}
            className="px-3 py-2.5 text-slate-400 hover:text-white transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
