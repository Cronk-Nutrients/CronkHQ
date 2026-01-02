import { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon = 'fas fa-inbox',
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`py-12 text-center ${className}`}>
      <i className={`${icon} text-4xl text-slate-600 mb-4`}></i>
      <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-slate-400 mb-4">{description}</p>
      )}
      {action}
    </div>
  );
}

export default EmptyState;
