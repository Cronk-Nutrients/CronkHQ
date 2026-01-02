'use client'

import { useAuth } from '@/context/AuthContext'
import {
  Permission,
  UserRole,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  getRoleDisplayName,
  getRoleDescription,
  getRoleBadgeColor,
  getRoleIcon,
} from '@/lib/permissions'

export function usePermissions() {
  const { userProfile } = useAuth()
  const role: UserRole = (userProfile?.role as UserRole) || 'viewer'

  return {
    // Current role
    role,
    roleName: getRoleDisplayName(role),
    roleDescription: getRoleDescription(role),
    roleBadgeColor: getRoleBadgeColor(role),
    roleIcon: getRoleIcon(role),

    // Check single permission
    can: (permission: Permission) => hasPermission(role, permission),

    // Check any of multiple permissions
    canAny: (permissions: Permission[]) => hasAnyPermission(role, permissions),

    // Check all permissions
    canAll: (permissions: Permission[]) => hasAllPermissions(role, permissions),

    // Quick role checks
    isAdmin: role === 'admin',
    isWarehouse: role === 'warehouse',
    isViewer: role === 'viewer',

    // Common permission groups
    canViewCosts: hasPermission(role, 'inventory.view_costs'),
    canViewFinancials: hasPermission(role, 'reports.view_financial'),
    canViewRevenue: hasPermission(role, 'dashboard.view_revenue'),
    canViewMarketing: hasPermission(role, 'dashboard.view_marketing'),
    canManageUsers: hasPermission(role, 'users.create'),
    canEditSettings: hasPermission(role, 'settings.company'),
    canCreateOrders: hasPermission(role, 'orders.create'),
    canEditProducts: hasPermission(role, 'products.edit'),
    canProcessFulfillment: hasPermission(role, 'fulfillment.pick'),
    canAdjustStock: hasPermission(role, 'inventory.adjust_stock'),
  }
}

// Export type for use in components
export type UsePermissionsReturn = ReturnType<typeof usePermissions>
