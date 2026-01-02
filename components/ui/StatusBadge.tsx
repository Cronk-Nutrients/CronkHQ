'use client';

import { getStatusConfig, statusColors, StatusType } from '@/lib/status';

interface StatusBadgeProps {
  status: string;
  type: StatusType;
  size?: 'sm' | 'md';
  showIcon?: boolean;
  className?: string;
}

export function StatusBadge({
  status,
  type,
  size = 'sm',
  showIcon = true,
  className = '',
}: StatusBadgeProps) {
  const config = getStatusConfig(status, type);
  const colors = statusColors[config.color];

  const sizeClasses = size === 'sm'
    ? 'px-2.5 py-1 text-xs'
    : 'px-3 py-1.5 text-sm';

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${sizeClasses} ${colors.bg} ${colors.text} font-medium rounded-full border ${colors.border} ${className}`}
    >
      {showIcon && config.icon && (
        <i className={`${config.icon} text-[10px] ${config.animate ? 'animate-spin' : ''}`}></i>
      )}
      {config.label}
    </span>
  );
}

export default StatusBadge;
