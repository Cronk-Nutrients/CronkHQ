'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { MoreVertical } from 'lucide-react';

interface ActionItem {
  label: string;
  icon?: string;
  onClick: () => void;
  variant?: 'default' | 'danger';
  disabled?: boolean;
}

interface ActionMenuProps {
  actions: ActionItem[];
  trigger?: ReactNode;
  align?: 'left' | 'right';
}

export function ActionMenu({ actions, trigger, align = 'right' }: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
      >
        {trigger || <MoreVertical className="w-4 h-4 text-slate-400" />}
      </button>

      {isOpen && (
        <div
          className={`absolute top-full mt-1 ${
            align === 'right' ? 'right-0' : 'left-0'
          } bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-1 min-w-[160px] z-50`}
        >
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick();
                setIsOpen(false);
              }}
              disabled={action.disabled}
              className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                action.variant === 'danger'
                  ? 'text-red-400 hover:bg-red-500/10'
                  : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              {action.icon && <i className={`${action.icon} w-4`}></i>}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Primary action button with consistent styling
interface PrimaryButtonProps {
  label: string;
  icon?: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

const variantStyles = {
  primary: 'bg-emerald-600 hover:bg-emerald-700 text-white',
  secondary: 'bg-slate-700 hover:bg-slate-600 text-white',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
};

export function PrimaryButton({
  label,
  icon,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled,
  className = '',
}: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center gap-2 rounded-lg font-medium transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {icon && <i className={icon}></i>}
      {label}
    </button>
  );
}

// Icon button for common actions
interface IconButtonProps {
  icon: string;
  onClick: () => void;
  title?: string;
  variant?: 'default' | 'danger';
  size?: 'sm' | 'md';
  disabled?: boolean;
}

export function IconButton({
  icon,
  onClick,
  title,
  variant = 'default',
  size = 'md',
  disabled,
}: IconButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      title={title}
      disabled={disabled}
      className={`
        rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed
        ${size === 'sm' ? 'p-1.5' : 'p-2'}
        ${variant === 'danger' ? 'hover:bg-red-500/20 text-red-400' : 'hover:bg-slate-700 text-slate-400 hover:text-white'}
      `}
    >
      <i className={`${icon} ${size === 'sm' ? 'text-sm' : ''}`}></i>
    </button>
  );
}
