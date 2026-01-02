'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  iconPosition?: 'left' | 'right';
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
}

interface ButtonAsButton extends ButtonBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  href?: never;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  onClick?: never;
  type?: never;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-emerald-600 hover:bg-emerald-500 text-white border-transparent',
  secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700',
  ghost: 'bg-transparent hover:bg-slate-800 text-slate-400 hover:text-white border-transparent',
  danger: 'bg-red-600 hover:bg-red-500 text-white border-transparent',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  children,
  className = '',
  disabled,
  href,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <i className={icon}></i>}
      {children}
      {icon && iconPosition === 'right' && <i className={icon}></i>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} {...props}>
      {content}
    </button>
  );
}

export default Button;
