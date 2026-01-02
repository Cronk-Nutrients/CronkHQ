'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface ClickableTableCellProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function ClickableTableCell({ href, children, className = '' }: ClickableTableCellProps) {
  return (
    <td className={`p-4 ${className}`}>
      <Link
        href={href}
        className="text-inherit hover:text-emerald-400 transition-colors"
      >
        {children}
      </Link>
    </td>
  );
}

interface ClickableBadgeProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function ClickableBadge({ href, children, className = '' }: ClickableBadgeProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs hover:opacity-80 transition-opacity ${className}`}
    >
      {children}
    </Link>
  );
}
