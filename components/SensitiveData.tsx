'use client'

import { ReactNode } from 'react'
import { usePermissions } from '@/hooks/usePermissions'
import { Permission } from '@/lib/permissions'

interface SensitiveDataProps {
  children: ReactNode
  /** Specific permission to check */
  permission?: Permission
  /** Type of sensitive data (determines which permission to check) */
  type?: 'cost' | 'revenue' | 'profit' | 'financial' | 'margin'
  /** Placeholder to show when data is hidden */
  placeholder?: string
  /** Additional CSS classes for the placeholder */
  placeholderClassName?: string
}

/**
 * Component that hides sensitive financial data from users without permission
 *
 * Usage:
 * ```tsx
 * <SensitiveData type="cost">${product.cost}</SensitiveData>
 * <SensitiveData type="profit">{formatCurrency(order.profit)}</SensitiveData>
 * ```
 */
export function SensitiveData({
  children,
  permission,
  type = 'cost',
  placeholder = '•••••',
  placeholderClassName = '',
}: SensitiveDataProps) {
  const { can, canViewCosts, canViewFinancials, canViewRevenue } = usePermissions()

  // Determine if user can see this data
  let canView = false

  if (permission) {
    canView = can(permission)
  } else {
    switch (type) {
      case 'cost':
        canView = canViewCosts
        break
      case 'revenue':
        canView = canViewRevenue
        break
      case 'profit':
      case 'margin':
      case 'financial':
        canView = canViewFinancials
        break
      default:
        canView = canViewCosts
    }
  }

  if (canView) {
    return <>{children}</>
  }

  return (
    <span
      className={`text-slate-500 select-none ${placeholderClassName}`}
      title="You don't have permission to view this"
    >
      {placeholder}
    </span>
  )
}

// Convenience components for common use cases

/**
 * Hides cost data from non-admin users
 */
export function Cost({ children, placeholder }: { children: ReactNode; placeholder?: string }) {
  return (
    <SensitiveData type="cost" placeholder={placeholder}>
      {children}
    </SensitiveData>
  )
}

/**
 * Hides revenue data from non-admin users
 */
export function Revenue({ children, placeholder }: { children: ReactNode; placeholder?: string }) {
  return (
    <SensitiveData type="revenue" placeholder={placeholder}>
      {children}
    </SensitiveData>
  )
}

/**
 * Hides profit data from non-admin users
 */
export function Profit({ children, placeholder }: { children: ReactNode; placeholder?: string }) {
  return (
    <SensitiveData type="profit" placeholder={placeholder}>
      {children}
    </SensitiveData>
  )
}

/**
 * Hides margin percentage data from non-admin users
 */
export function Margin({ children, placeholder }: { children: ReactNode; placeholder?: string }) {
  return (
    <SensitiveData type="margin" placeholder={placeholder}>
      {children}
    </SensitiveData>
  )
}

/**
 * Hook to get a masked value based on permission
 */
export function useSensitiveValue<T>(
  value: T,
  type: 'cost' | 'revenue' | 'profit' | 'financial' | 'margin' = 'cost',
  placeholder: T | string = '•••••'
): T | string {
  const { canViewCosts, canViewFinancials, canViewRevenue } = usePermissions()

  let canView = false

  switch (type) {
    case 'cost':
      canView = canViewCosts
      break
    case 'revenue':
      canView = canViewRevenue
      break
    case 'profit':
    case 'margin':
    case 'financial':
      canView = canViewFinancials
      break
    default:
      canView = canViewCosts
  }

  return canView ? value : placeholder
}

/**
 * Format currency with permission check
 * Returns placeholder if user doesn't have permission
 */
export function useSensitiveCurrency(
  value: number,
  type: 'cost' | 'revenue' | 'profit' | 'financial' | 'margin' = 'cost',
  placeholder = '•••••'
): string {
  const { canViewCosts, canViewFinancials, canViewRevenue } = usePermissions()

  let canView = false

  switch (type) {
    case 'cost':
      canView = canViewCosts
      break
    case 'revenue':
      canView = canViewRevenue
      break
    case 'profit':
    case 'margin':
    case 'financial':
      canView = canViewFinancials
      break
    default:
      canView = canViewCosts
  }

  if (!canView) return placeholder

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}
