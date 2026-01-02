import { ReactNode } from 'react';

type BadgeVariant = 'emerald' | 'blue' | 'amber' | 'purple' | 'red' | 'slate' | 'green' | 'orange';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  children: ReactNode;
  icon?: string;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  red: 'bg-red-500/10 text-red-400 border-red-500/20',
  slate: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  green: 'bg-green-500/10 text-green-400 border-green-500/20',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

export function Badge({
  variant = 'slate',
  size = 'sm',
  children,
  icon,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {icon && <i className={`${icon} text-[10px]`}></i>}
      {children}
    </span>
  );
}

export default Badge;
