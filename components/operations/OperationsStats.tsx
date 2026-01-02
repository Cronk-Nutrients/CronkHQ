'use client';

import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

// Clickable stat card for filtering
interface OperationsStatCardProps {
  icon: LucideIcon;
  iconColor: string;
  value: number | string;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
  accentBorder?: boolean;
}

export function OperationsStatCard({
  icon: Icon,
  iconColor,
  value,
  label,
  onClick,
  isActive = false,
  accentBorder = false,
}: OperationsStatCardProps) {
  const colorMap: Record<string, { iconBg: string; textColor: string; activeBorder: string; activeBg: string; hoverBorder: string }> = {
    slate: { iconBg: 'bg-slate-700/50', textColor: 'text-slate-400', activeBorder: 'border-slate-400/50', activeBg: 'bg-slate-500/10', hoverBorder: 'hover:border-slate-600' },
    amber: { iconBg: 'bg-amber-500/20', textColor: 'text-amber-400', activeBorder: 'border-amber-500/50', activeBg: 'bg-amber-500/10', hoverBorder: 'hover:border-amber-500/50' },
    blue: { iconBg: 'bg-blue-500/20', textColor: 'text-blue-400', activeBorder: 'border-blue-500/50', activeBg: 'bg-blue-500/10', hoverBorder: 'hover:border-blue-500/50' },
    emerald: { iconBg: 'bg-emerald-500/20', textColor: 'text-emerald-400', activeBorder: 'border-emerald-500/50', activeBg: 'bg-emerald-500/10', hoverBorder: 'hover:border-emerald-500/50' },
    purple: { iconBg: 'bg-purple-500/20', textColor: 'text-purple-400', activeBorder: 'border-purple-500/50', activeBg: 'bg-purple-500/10', hoverBorder: 'hover:border-purple-500/50' },
  };

  const colors = colorMap[iconColor] || colorMap.slate;
  const formattedValue = typeof value === 'number' ? value.toLocaleString() : value;

  const baseClass = 'bg-slate-800/50 backdrop-blur border rounded-xl p-4 text-left transition-colors';
  const borderClass = accentBorder
    ? `border-${iconColor}-500/30 ${colors.hoverBorder}`
    : 'border-slate-700/50';
  const activeClass = isActive ? `${colors.activeBorder} ${colors.activeBg}` : borderClass;

  const content = (
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg ${colors.iconBg} flex items-center justify-center`}>
        <Icon className={`w-5 h-5 ${colors.textColor}`} />
      </div>
      <div>
        <div className={`text-2xl font-bold ${isActive || iconColor !== 'slate' ? colors.textColor : 'text-white'}`}>
          {formattedValue}
        </div>
        <div className="text-xs text-slate-400">{label}</div>
      </div>
    </div>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={`${baseClass} ${activeClass} ${!isActive ? colors.hoverBorder : ''}`}>
        {content}
      </button>
    );
  }

  return (
    <div className={`${baseClass} ${borderClass}`}>
      {content}
    </div>
  );
}

// Stats grid wrapper
interface OperationsStatsGridProps {
  children: ReactNode;
  columns?: 5 | 6;
}

export function OperationsStatsGrid({ children, columns = 6 }: OperationsStatsGridProps) {
  const colClass = columns === 5 ? 'grid-cols-5' : 'grid-cols-6';
  return <div className={`grid ${colClass} gap-4`}>{children}</div>;
}
