'use client';

import { ReactNode } from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageLayoutProps {
  title: string;
  description?: string;
  icon?: string;
  iconColor?: 'emerald' | 'blue' | 'amber' | 'purple' | 'red' | 'cyan' | 'pink' | 'orange' | 'slate';
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

const iconColorMap: Record<string, string> = {
  emerald: 'bg-emerald-500/20 text-emerald-400',
  blue: 'bg-blue-500/20 text-blue-400',
  amber: 'bg-amber-500/20 text-amber-400',
  purple: 'bg-purple-500/20 text-purple-400',
  red: 'bg-red-500/20 text-red-400',
  cyan: 'bg-cyan-500/20 text-cyan-400',
  pink: 'bg-pink-500/20 text-pink-400',
  orange: 'bg-orange-500/20 text-orange-400',
  slate: 'bg-slate-500/20 text-slate-400',
};

export function PageLayout({
  title,
  description,
  icon,
  iconColor = 'emerald',
  breadcrumbs,
  actions,
  children,
  className = '',
}: PageLayoutProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb items={breadcrumbs} />
      )}

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {icon && (
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconColorMap[iconColor]}`}>
              <i className={`${icon} text-xl`}></i>
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            {description && <p className="text-sm text-slate-400">{description}</p>}
          </div>
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>

      {/* Page Content */}
      {children}
    </div>
  );
}
