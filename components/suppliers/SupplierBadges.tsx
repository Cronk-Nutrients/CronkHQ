'use client';

import { CheckCircle, XCircle } from 'lucide-react';

// Supplier Active/Inactive Status Badge
interface SupplierStatusBadgeProps {
  isActive: boolean;
}

export function SupplierStatusBadge({ isActive }: SupplierStatusBadgeProps) {
  if (isActive) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-emerald-500/20 text-emerald-400">
        <CheckCircle className="w-3 h-3" />
        Active
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-slate-500/20 text-slate-400">
      <XCircle className="w-3 h-3" />
      Inactive
    </span>
  );
}

// Currency Badge
interface CurrencyBadgeProps {
  currency: string;
}

export function CurrencyBadge({ currency }: CurrencyBadgeProps) {
  return (
    <span className="px-2 py-1 bg-slate-700 text-white text-xs rounded font-mono">
      {currency}
    </span>
  );
}

// Supplier Code Badge
interface SupplierCodeBadgeProps {
  code: string;
}

export function SupplierCodeBadge({ code }: SupplierCodeBadgeProps) {
  return (
    <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded font-mono">
      {code}
    </span>
  );
}
