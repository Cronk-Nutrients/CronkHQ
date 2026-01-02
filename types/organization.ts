// Organization Types for Multi-Tenant Architecture

export type PlanType = 'free' | 'starter' | 'professional' | 'enterprise';
export type MemberRole = 'owner' | 'admin' | 'manager' | 'staff' | 'viewer';
export type InviteStatus = 'pending' | 'accepted' | 'expired' | 'revoked';

export interface PlanLimits {
  users: number;
  products: number;
  ordersPerMonth: number;
  locations: number;
}

export interface OrganizationSettings {
  timezone: string;
  currency: string;
  dateFormat: string;
  autoJoinDomain?: boolean; // Allow users with matching domain to auto-join
  requireApproval?: boolean; // Require admin approval for new members
  defaultMemberRole: MemberRole;
}

export interface Organization {
  id: string;
  name: string;
  slug: string; // URL-friendly identifier (unique)
  domain?: string; // Company email domain for auto-join
  logo?: string;
  plan: PlanType;
  planLimits: PlanLimits;
  settings: OrganizationSettings;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string; // User ID of the organization owner
}

export interface OrganizationMember {
  id: string;
  organizationId: string;
  userId: string;
  email: string;
  displayName?: string;
  role: MemberRole;
  invitedBy?: string; // User ID who invited this member
  joinedAt: Date;
  lastActiveAt?: Date;
}

export interface OrganizationInvite {
  id: string;
  organizationId: string;
  email: string;
  role: MemberRole;
  invitedBy: string; // User ID
  invitedByName?: string;
  organizationName?: string;
  status: InviteStatus;
  expiresAt: Date;
  createdAt: Date;
  acceptedAt?: Date;
  token: string; // Unique token for accepting invite
}

// Extended user profile with organization info
export interface UserWithOrg {
  id: string;
  email: string;
  displayName?: string;
  organizationId?: string; // Current/primary organization
  organizations?: string[]; // All organizations user belongs to
  currentOrgRole?: MemberRole;
}

// Default plan limits by plan type
export const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
  free: {
    users: 1,
    products: 50,
    ordersPerMonth: 100,
    locations: 1,
  },
  starter: {
    users: 3,
    products: 500,
    ordersPerMonth: 1000,
    locations: 2,
  },
  professional: {
    users: 10,
    products: 5000,
    ordersPerMonth: 10000,
    locations: 5,
  },
  enterprise: {
    users: -1, // Unlimited
    products: -1,
    ordersPerMonth: -1,
    locations: -1,
  },
};

// Default organization settings
export const DEFAULT_ORG_SETTINGS: OrganizationSettings = {
  timezone: 'America/Chicago',
  currency: 'USD',
  dateFormat: 'MM/DD/YYYY',
  autoJoinDomain: false,
  requireApproval: false,
  defaultMemberRole: 'staff',
};

// Role permissions
export interface RolePermissions {
  canManageOrganization: boolean;
  canManageMembers: boolean;
  canManageIntegrations: boolean;
  canManageProducts: boolean;
  canManageOrders: boolean;
  canManageInventory: boolean;
  canViewReports: boolean;
  canExportData: boolean;
}

export const ROLE_PERMISSIONS: Record<MemberRole, RolePermissions> = {
  owner: {
    canManageOrganization: true,
    canManageMembers: true,
    canManageIntegrations: true,
    canManageProducts: true,
    canManageOrders: true,
    canManageInventory: true,
    canViewReports: true,
    canExportData: true,
  },
  admin: {
    canManageOrganization: true,
    canManageMembers: true,
    canManageIntegrations: true,
    canManageProducts: true,
    canManageOrders: true,
    canManageInventory: true,
    canViewReports: true,
    canExportData: true,
  },
  manager: {
    canManageOrganization: false,
    canManageMembers: false,
    canManageIntegrations: false,
    canManageProducts: true,
    canManageOrders: true,
    canManageInventory: true,
    canViewReports: true,
    canExportData: true,
  },
  staff: {
    canManageOrganization: false,
    canManageMembers: false,
    canManageIntegrations: false,
    canManageProducts: false,
    canManageOrders: true,
    canManageInventory: true,
    canViewReports: false,
    canExportData: false,
  },
  viewer: {
    canManageOrganization: false,
    canManageMembers: false,
    canManageIntegrations: false,
    canManageProducts: false,
    canManageOrders: false,
    canManageInventory: false,
    canViewReports: true,
    canExportData: false,
  },
};

// Helper to check if a role has a specific permission
export function hasPermission(role: MemberRole, permission: keyof RolePermissions): boolean {
  return ROLE_PERMISSIONS[role]?.[permission] ?? false;
}

// Helper to check if user can perform role assignment
export function canAssignRole(assignerRole: MemberRole, targetRole: MemberRole): boolean {
  const roleHierarchy: MemberRole[] = ['owner', 'admin', 'manager', 'staff', 'viewer'];
  const assignerIndex = roleHierarchy.indexOf(assignerRole);
  const targetIndex = roleHierarchy.indexOf(targetRole);

  // Can only assign roles lower than your own (higher index)
  // Owner can assign any role, admin can assign manager and below, etc.
  if (assignerRole === 'owner') return true;
  if (assignerRole === 'admin') return targetIndex > 0; // Can't assign owner
  return false; // Only owner and admin can assign roles
}

// Generate a URL-friendly slug from organization name
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50);
}

// Generate a unique invite token
export function generateInviteToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}
