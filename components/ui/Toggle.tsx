'use client';

import { forwardRef } from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  label?: string;
  description?: string;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ checked, onChange, disabled = false, size = 'md', label, description }, ref) => {
    const sizes = {
      sm: {
        track: 'w-9 h-5',
        thumb: 'w-4 h-4',
        translate: 'translate-x-4',
      },
      md: {
        track: 'w-11 h-6',
        thumb: 'w-5 h-5',
        translate: 'translate-x-5',
      },
    };

    const sizeStyles = sizes[size];

    const handleClick = () => {
      if (!disabled) {
        onChange(!checked);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    };

    const toggle = (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`
          relative inline-flex flex-shrink-0 cursor-pointer rounded-full
          transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2
          focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900
          ${sizeStyles.track}
          ${checked ? 'bg-emerald-500' : 'bg-slate-600'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <span
          aria-hidden="true"
          className={`
            pointer-events-none inline-block rounded-full bg-white shadow-lg
            ring-0 transition duration-200 ease-in-out
            ${sizeStyles.thumb}
            ${checked ? sizeStyles.translate : 'translate-x-0.5'}
            ${size === 'md' ? 'mt-0.5' : 'mt-0.5'}
          `}
        />
      </button>
    );

    if (label || description) {
      return (
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            {label && (
              <div className={`text-white ${size === 'sm' ? 'text-sm' : 'text-base'}`}>
                {label}
              </div>
            )}
            {description && (
              <div className="text-sm text-slate-400 mt-0.5">{description}</div>
            )}
          </div>
          {toggle}
        </div>
      );
    }

    return toggle;
  }
);

Toggle.displayName = 'Toggle';

export default Toggle;
