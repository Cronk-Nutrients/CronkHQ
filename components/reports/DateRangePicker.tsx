'use client';

import { useState } from 'react';

type DateRangeType = 'today' | '7d' | '30d' | '90d' | 'ytd' | 'custom' | 'current';

interface DateRangePickerProps {
  value: string;
  onChange: (value: string) => void;
  options?: { value: string; label: string }[];
  showCustom?: boolean;
  className?: string;
}

const defaultOptions = [
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
  { value: 'ytd', label: 'Year to Date' },
];

export default function DateRangePicker({
  value,
  onChange,
  options = defaultOptions,
  showCustom = false,
  className = '',
}: DateRangePickerProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-emerald-500 ${className}`}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
      {showCustom && <option value="custom">Custom Range</option>}
    </select>
  );
}

// Compact button-style date range picker
interface DateRangeButtonsProps {
  value: string;
  onChange: (value: string) => void;
  options?: { value: string; label: string }[];
  accentColor?: 'emerald' | 'purple' | 'blue';
}

export function DateRangeButtons({
  value,
  onChange,
  options = [
    { value: 'today', label: 'Today' },
    { value: 'wtd', label: 'WTD' },
    { value: 'mtd', label: 'MTD' },
    { value: 'ytd', label: 'YTD' },
  ],
  accentColor = 'emerald',
}: DateRangeButtonsProps) {
  const activeClasses: Record<string, string> = {
    emerald: 'bg-emerald-500/20 text-emerald-300',
    purple: 'bg-purple-500/20 text-purple-300',
    blue: 'bg-blue-500/20 text-blue-300',
  };

  return (
    <div className="flex items-center bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-1">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-4 py-2 text-sm rounded-lg transition-all ${
            value === opt.value
              ? activeClasses[accentColor]
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// Custom date range inputs
interface CustomDateRangeProps {
  startDate: string;
  endDate: string;
  onStartChange: (date: string) => void;
  onEndChange: (date: string) => void;
}

export function CustomDateRange({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
}: CustomDateRangeProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg">
      <div className="flex items-center gap-2">
        <label className="text-sm text-slate-400">From:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartChange(e.target.value)}
          className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm text-slate-400">To:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndChange(e.target.value)}
          className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
        />
      </div>
    </div>
  );
}
