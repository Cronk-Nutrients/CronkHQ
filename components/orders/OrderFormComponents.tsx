'use client';

import { ReactNode } from 'react';

// Form section wrapper
interface FormSectionProps {
  title: string;
  icon: string;
  children: ReactNode;
  headerRight?: ReactNode;
}

export function FormSection({ title, icon, children, headerRight }: FormSectionProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-700/50 flex items-center justify-between">
        <h2 className="font-semibold text-white flex items-center gap-2">
          <i className={`fas ${icon} text-slate-400`}></i>
          {title}
        </h2>
        {headerRight}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

// Toggle button group
interface ToggleOption {
  value: string;
  label: string;
}

interface ToggleGroupProps {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
}

export function ToggleGroup({ options, value, onChange }: ToggleGroupProps) {
  return (
    <div className="flex items-center bg-slate-800/50 border border-slate-700 rounded-lg p-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
            value === option.value
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

// Pricing type badge
interface PricingBadgeProps {
  isWholesale: boolean;
}

export function PricingBadge({ isWholesale }: PricingBadgeProps) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        isWholesale
          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
      }`}
    >
      {isWholesale ? 'Wholesale Pricing' : 'Retail Pricing'}
    </span>
  );
}

// Customer type badge
interface CustomerTypeBadgeProps {
  type: 'retail' | 'wholesale';
}

export function CustomerTypeBadge({ type }: CustomerTypeBadgeProps) {
  return (
    <span
      className={`px-2 py-0.5 text-xs rounded-full ${
        type === 'wholesale'
          ? 'bg-purple-500/20 text-purple-400'
          : 'bg-blue-500/20 text-blue-400'
      }`}
    >
      {type === 'wholesale' ? 'Wholesale' : 'Retail'}
    </span>
  );
}

// Selectable card
interface SelectableCardProps {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}

export function SelectableCard({ selected, onClick, children }: SelectableCardProps) {
  return (
    <div
      onClick={onClick}
      className={`p-3 rounded-lg cursor-pointer transition-colors ${
        selected
          ? 'bg-emerald-500/20 border border-emerald-500/30'
          : 'bg-slate-800/50 border border-slate-700 hover:border-slate-600'
      }`}
    >
      {children}
    </div>
  );
}

// Order summary row
interface SummaryRowProps {
  label: string;
  value: string;
  valueColor?: string;
  isDiscount?: boolean;
}

export function SummaryRow({ label, value, valueColor = 'text-white', isDiscount = false }: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-400">{label}</span>
      <span className={valueColor}>
        {isDiscount ? '-' : ''}{value}
      </span>
    </div>
  );
}

// Quantity stepper
interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
}

export function QuantityStepper({ value, onChange, min = 1 }: QuantityStepperProps) {
  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-8 h-8 bg-slate-800 border border-slate-700 rounded-l-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
      >
        -
      </button>
      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) => onChange(Math.max(min, parseInt(e.target.value) || min))}
        className="w-16 h-8 bg-slate-800 border-y border-slate-700 text-white text-center focus:outline-none"
      />
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="w-8 h-8 bg-slate-800 border border-slate-700 rounded-r-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
      >
        +
      </button>
    </div>
  );
}

// Search input
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  placeholder: string;
}

export function SearchInput({ value, onChange, onFocus, placeholder }: SearchInputProps) {
  return (
    <div className="relative">
      <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50"
      />
    </div>
  );
}

// Info box
interface InfoBoxProps {
  title: string;
  children: ReactNode;
}

export function InfoBox({ title, children }: InfoBoxProps) {
  return (
    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <i className="fas fa-info-circle text-blue-400 mt-0.5"></i>
        <div className="text-sm">
          <div className="text-blue-400 font-medium mb-1">{title}</div>
          <p className="text-slate-400">{children}</p>
        </div>
      </div>
    </div>
  );
}
