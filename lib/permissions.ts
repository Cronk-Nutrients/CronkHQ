// User roles
export type UserRole = 'admin' | 'warehouse' | 'viewer'

// Permission types
export type Permission =
  // Dashboard
  | 'dashboard.view'
  | 'dashboard.view_revenue'
  | 'dashboard.view_costs'
  | 'dashboard.view_marketing'

  // Inventory
  | 'inventory.view'
  | 'inventory.create'
  | 'inventory.edit'
  | 'inventory.delete'
  | 'inventory.view_costs'
  | 'inventory.adjust_stock'

  // Products
  | 'products.view'
  | 'products.create'
  | 'products.edit'
  | 'products.delete'
  | 'products.view_costs'

  // Orders
  | 'orders.view'
  | 'orders.create'
  | 'orders.edit'
  | 'orders.delete'
  | 'orders.view_costs'

  // Fulfillment
  | 'fulfillment.view'
  | 'fulfillment.pick'
  | 'fulfillment.pack'
  | 'fulfillment.ship'

  // FBA Prep
  | 'fba.view'
  | 'fba.process'

  // Purchase Orders
  | 'purchase_orders.view'
  | 'purchase_orders.create'
  | 'purchase_orders.edit'
  | 'purchase_orders.delete'
  | 'purchase_orders.receive'
  | 'purchase_orders.view_costs'

  // Work Orders
  | 'work_orders.view'
  | 'work_orders.create'
  | 'work_orders.edit'
  | 'work_orders.delete'
  | 'work_orders.process'

  // Returns
  | 'returns.view'
  | 'returns.process'
  | 'returns.create'

  // Stock Operations
  | 'stock.transfer'
  | 'stock.cycle_count'
  | 'stock.adjust'

  // Suppliers
  | 'suppliers.view'
  | 'suppliers.create'
  | 'suppliers.edit'
  | 'suppliers.delete'
  | 'suppliers.view_costs'

  // Reports
  | 'reports.view'
  | 'reports.view_financial'
  | 'reports.view_costs'
  | 'reports.export'

  // Marketing
  | 'marketing.view'
  | 'marketing.view_spend'
  | 'marketing.view_roas'

  // Settings
  | 'settings.view'
  | 'settings.company'
  | 'settings.locations'
  | 'settings.users'
  | 'settings.integrations'
  | 'settings.billing'

  // Users
  | 'users.view'
  | 'users.create'
  | 'users.edit'
  | 'users.delete'
  | 'users.change_roles'

// Role permissions mapping
export const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    // Admin has ALL permissions
    'dashboard.view', 'dashboard.view_revenue', 'dashboard.view_costs', 'dashboard.view_marketing',
    'inventory.view', 'inventory.create', 'inventory.edit', 'inventory.delete', 'inventory.view_costs', 'inventory.adjust_stock',
    'products.view', 'products.create', 'products.edit', 'products.delete', 'products.view_costs',
    'orders.view', 'orders.create', 'orders.edit', 'orders.delete', 'orders.view_costs',
    'fulfillment.view', 'fulfillment.pick', 'fulfillment.pack', 'fulfillment.ship',
    'fba.view', 'fba.process',
    'purchase_orders.view', 'purchase_orders.create', 'purchase_orders.edit', 'purchase_orders.delete', 'purchase_orders.receive', 'purchase_orders.view_costs',
    'work_orders.view', 'work_orders.create', 'work_orders.edit', 'work_orders.delete', 'work_orders.process',
    'returns.view', 'returns.process', 'returns.create',
    'stock.transfer', 'stock.cycle_count', 'stock.adjust',
    'suppliers.view', 'suppliers.create', 'suppliers.edit', 'suppliers.delete', 'suppliers.view_costs',
    'reports.view', 'reports.view_financial', 'reports.view_costs', 'reports.export',
    'marketing.view', 'marketing.view_spend', 'marketing.view_roas',
    'settings.view', 'settings.company', 'settings.locations', 'settings.users', 'settings.integrations', 'settings.billing',
    'users.view', 'users.create', 'users.edit', 'users.delete', 'users.change_roles',
  ],

  warehouse: [
    // Warehouse can do operations but NOT see financials
    'dashboard.view',
    'inventory.view', 'inventory.adjust_stock',
    'products.view',
    'orders.view',
    'fulfillment.view', 'fulfillment.pick', 'fulfillment.pack', 'fulfillment.ship',
    'fba.view', 'fba.process',
    'purchase_orders.view', 'purchase_orders.receive',
    'work_orders.view', 'work_orders.process',
    'returns.view', 'returns.process',
    'stock.transfer', 'stock.cycle_count', 'stock.adjust',
    'suppliers.view',
    'settings.view', 'settings.locations',
  ],

  viewer: [
    // Viewer can only view, no actions
    'dashboard.view',
    'inventory.view',
    'products.view',
    'orders.view',
    'fulfillment.view',
    'fba.view',
    'purchase_orders.view',
    'work_orders.view',
    'returns.view',
    'suppliers.view',
    'reports.view',
    'settings.view',
  ],
}

// Check if role has permission
export function hasPermission(role: UserRole, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false
}

// Check if role has any of the permissions
export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
  return permissions.some(p => hasPermission(role, p))
}

// Check if role has all permissions
export function hasAllPermissions(role: UserRole, permissions: Permission[]): boolean {
  return permissions.every(p => hasPermission(role, p))
}

// Get display name for role
export function getRoleDisplayName(role: UserRole): string {
  const names: Record<UserRole, string> = {
    admin: 'Administrator',
    warehouse: 'Warehouse Staff',
    viewer: 'Viewer',
  }
  return names[role] || role
}

// Get role description
export function getRoleDescription(role: UserRole): string {
  const descriptions: Record<UserRole, string> = {
    admin: 'Full access to all features including financials, settings, and user management',
    warehouse: 'Operational access for pick, pack, ship, and inventory management. No access to costs or financials.',
    viewer: 'Read-only access to view data. Cannot make any changes.',
  }
  return descriptions[role] || ''
}

// Get role badge color
export function getRoleBadgeColor(role: UserRole): string {
  const colors: Record<UserRole, string> = {
    admin: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    warehouse: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    viewer: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  }
  return colors[role] || 'bg-slate-500/20 text-slate-400'
}

// Get role icon
export function getRoleIcon(role: UserRole): string {
  const icons: Record<UserRole, string> = {
    admin: 'fa-crown',
    warehouse: 'fa-warehouse',
    viewer: 'fa-eye',
  }
  return icons[role] || 'fa-user'
}
