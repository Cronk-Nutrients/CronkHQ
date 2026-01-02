'use client';

import { formatCurrency } from '@/lib/formatting';

interface InsightItem {
  label: string;
  sublabel?: string;
  value: string | number;
  valueFormat?: 'currency' | 'text';
}

interface InsightCardProps {
  title: string;
  subtitle?: string;
  items: InsightItem[];
}

export function InsightCard({ title, subtitle, items }: InsightCardProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
      </div>
      <div className="divide-y divide-slate-700/50">
        {items.map((item, index) => (
          <div key={index} className="p-4 flex items-center justify-between hover:bg-slate-800/30">
            <div>
              <div className="text-white">{item.label}</div>
              {item.sublabel && <div className="text-xs text-slate-400">{item.sublabel}</div>}
            </div>
            <div className="text-emerald-400 font-medium">
              {item.valueFormat === 'currency' && typeof item.value === 'number'
                ? formatCurrency(item.value)
                : item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Progress bar breakdown card
interface BreakdownItem {
  label: string;
  value: string;
  percentage: number;
  color: string;
}

interface BreakdownCardProps {
  title: string;
  subtitle?: string;
  items: BreakdownItem[];
}

export function BreakdownCard({ title, subtitle, items }: BreakdownCardProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
      </div>
      <div className="p-4 space-y-4">
        {items.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-400">{item.label}</span>
              <span className={item.color.replace('bg-', 'text-').replace('-500', '-400')}>{item.value}</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Tip/info box
interface TipBoxProps {
  title: string;
  content: string;
  icon?: string;
  variant?: 'emerald' | 'amber' | 'cyan' | 'blue';
}

export function TipBox({ title, content, icon = 'fas fa-lightbulb', variant = 'emerald' }: TipBoxProps) {
  const variantClasses: Record<string, { bg: string; border: string; icon: string }> = {
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: 'text-emerald-400' },
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: 'text-amber-400' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', icon: 'text-cyan-400' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: 'text-blue-400' },
  };
  const classes = variantClasses[variant];

  return (
    <div className={`p-4 ${classes.bg} border ${classes.border} rounded-xl`}>
      <div className="flex items-start gap-3">
        <i className={`${icon} ${classes.icon} mt-0.5`}></i>
        <div>
          <div className="text-sm font-medium text-white">{title}</div>
          <div className="text-xs text-slate-400 mt-1">{content}</div>
        </div>
      </div>
    </div>
  );
}
