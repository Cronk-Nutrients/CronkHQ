'use client';

import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ReportPageHeaderProps {
  title: string;
  description: string;
  icon: string;
  iconColor?: string;
  breadcrumbs: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export default function ReportPageHeader({
  title,
  description,
  icon,
  iconColor = 'emerald',
  breadcrumbs,
  actions,
}: ReportPageHeaderProps) {
  const iconColorClasses: Record<string, string> = {
    emerald: 'bg-emerald-500/20 text-emerald-400',
    blue: 'bg-blue-500/20 text-blue-400',
    purple: 'bg-purple-500/20 text-purple-400',
    amber: 'bg-amber-500/20 text-amber-400',
    red: 'bg-red-500/20 text-red-400',
    pink: 'bg-pink-500/20 text-pink-400',
    cyan: 'bg-cyan-500/20 text-cyan-400',
  };

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
        {breadcrumbs.map((crumb, index) => (
          <span key={index} className="flex items-center gap-2">
            {index > 0 && <i className="fas fa-chevron-right text-xs"></i>}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-white">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-white">{crumb.label}</span>
            )}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconColorClasses[iconColor] || iconColorClasses.emerald}`}>
            <i className={`fas ${icon} text-xl`}></i>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            <p className="text-slate-400">{description}</p>
          </div>
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}
