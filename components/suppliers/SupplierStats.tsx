'use client';

import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/Card';

// Stat Card component
interface SupplierStatCardProps {
  icon: LucideIcon;
  iconColor: 'blue' | 'emerald' | 'purple' | 'amber';
  value: string | number;
  label: string;
}

export function SupplierStatCard({ icon: Icon, iconColor, value, label }: SupplierStatCardProps) {
  const colorClasses: Record<string, { bg: string; text: string }> = {
    blue: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
    emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400' },
    purple: { bg: 'bg-purple-500/20', text: 'text-purple-400' },
    amber: { bg: 'bg-amber-500/20', text: 'text-amber-400' },
  };

  const colors = colorClasses[iconColor];
  const valueColor = iconColor === 'emerald' ? 'text-emerald-400' : 'text-white';

  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${colors.text}`} />
        </div>
        <div>
          <div className={`text-2xl font-semibold ${valueColor}`}>{value}</div>
          <div className="text-sm text-slate-400">{label}</div>
        </div>
      </div>
    </Card>
  );
}

// Stats Grid wrapper
interface SupplierStatsGridProps {
  children: ReactNode;
}

export function SupplierStatsGrid({ children }: SupplierStatsGridProps) {
  return <div className="grid grid-cols-4 gap-4">{children}</div>;
}
