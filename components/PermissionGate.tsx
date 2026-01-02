'use client'

import { ReactNode } from 'react'
import { Lock } from 'lucide-react'
import { usePermissions } from '@/hooks/usePermissions'
import { Permission } from '@/lib/permissions'

interface PermissionGateProps {
  children: ReactNode
  /** Single permission to check */
  permission?: Permission
  /** Multiple permissions to check */
  permissions?: Permission[]
  /** If true, require ALL permissions. If false (default), require ANY permission */
  requireAll?: boolean
  /** Content to show if permission is denied */
  fallback?: ReactNode
  /** Show a lock icon/message when access is denied */
  showLock?: boolean
  /** Custom message to show when locked */
  lockMessage?: string
}

/**
 * Gate component that conditionally renders children based on user permissions
 *
 * Usage:
 * ```tsx
 * <PermissionGate permission="products.edit">
 *   <EditButton />
 * </PermissionGate>
 *
 * <PermissionGate permissions={['orders.edit', 'orders.delete']} requireAll>
 *   <OrderActions />
 * </PermissionGate>
 * ```
 */
export function PermissionGate({
  children,
  permission,
  permissions,
  requireAll = false,
  fallback = null,
  showLock = false,
  lockMessage = "You don't have permission to view this",
}: PermissionGateProps) {
  const { can, canAny, canAll } = usePermissions()

  let hasAccess = false

  if (permission) {
    hasAccess = can(permission)
  } else if (permissions) {
    hasAccess = requireAll ? canAll(permissions) : canAny(permissions)
  } else {
    // No permission specified, allow access
    hasAccess = true
  }

  if (hasAccess) {
    return <>{children}</>
  }

  if (showLock) {
    return (
      <div className="flex items-center justify-center p-8 bg-slate-800/30 rounded-xl border border-slate-700/50">
        <div className="text-center">
          <div className="w-12 h-12 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-3">
            <Lock className="h-5 w-5 text-slate-500" />
          </div>
          <p className="text-slate-400 text-sm">{lockMessage}</p>
        </div>
      </div>
    )
  }

  return <>{fallback}</>
}

/**
 * Higher-order component version of PermissionGate
 */
export function withPermission<P extends object>(
  Component: React.ComponentType<P>,
  permission: Permission,
  fallback?: ReactNode
) {
  return function PermissionWrappedComponent(props: P) {
    return (
      <PermissionGate permission={permission} fallback={fallback}>
        <Component {...props} />
      </PermissionGate>
    )
  }
}

/**
 * Hook to check if current user can access a route/feature
 * Returns true if access is allowed
 */
export function useCanAccess(permission: Permission): boolean {
  const { can } = usePermissions()
  return can(permission)
}

/**
 * Component that only renders for admin users
 */
export function AdminOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  const { isAdmin } = usePermissions()
  return isAdmin ? <>{children}</> : <>{fallback}</>
}

/**
 * Component that hides content from viewer role
 */
export function HideFromViewer({ children }: { children: ReactNode }) {
  const { isViewer } = usePermissions()
  return isViewer ? null : <>{children}</>
}
