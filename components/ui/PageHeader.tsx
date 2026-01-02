import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  backButton?: {
    onClick: () => void;
  };
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  actions,
  backButton,
  className = '',
}: PageHeaderProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-4">
        {backButton && (
          <button
            onClick={backButton.onClick}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <i className="fas fa-arrow-left text-slate-400"></i>
          </button>
        )}
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {subtitle && (
            <p className="text-sm text-slate-400">{subtitle}</p>
          )}
        </div>
      </div>
      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}

export default PageHeader;
