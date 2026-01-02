'use client'

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react'
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from './AuthContext'
import {
  Organization,
  OrganizationMember,
  OrganizationInvite,
  MemberRole,
  PlanType,
  PLAN_LIMITS,
  DEFAULT_ORG_SETTINGS,
  generateSlug,
  generateInviteToken,
  hasPermission,
  RolePermissions,
  ROLE_PERMISSIONS,
} from '@/types/organization'

// Demo organization data
const DEMO_ORGANIZATION: Organization = {
  id: 'demo-org-id',
  name: 'Cronk Nutrients (Demo)',
  slug: 'cronk-demo',
  plan: 'enterprise',
  planLimits: PLAN_LIMITS.enterprise,
  settings: {
    ...DEFAULT_ORG_SETTINGS,
    timezone: 'America/Chicago',
    currency: 'USD',
  },
  createdAt: new Date(),
  updatedAt: new Date(),
  ownerId: 'demo-user-id',
}

const DEMO_MEMBER: OrganizationMember = {
  id: 'demo-member-id',
  organizationId: 'demo-org-id',
  userId: 'demo-user-id',
  email: 'demo@cronknutrients.com',
  displayName: 'Demo User',
  role: 'owner',
  joinedAt: new Date(),
}

interface OrganizationContextType {
  // State
  organization: Organization | null
  membership: OrganizationMember | null
  members: OrganizationMember[]
  invites: OrganizationInvite[]
  loading: boolean
  error: string | null

  // Computed
  isOwner: boolean
  isAdmin: boolean
  permissions: RolePermissions | null
  hasOrganization: boolean
  needsSetup: boolean

  // Organization management
  createOrganization: (name: string, plan?: PlanType) => Promise<Organization>
  updateOrganization: (data: Partial<Organization>) => Promise<void>
  switchOrganization: (orgId: string) => Promise<void>

  // Member management
  inviteMember: (email: string, role: MemberRole) => Promise<OrganizationInvite>
  updateMemberRole: (memberId: string, role: MemberRole) => Promise<void>
  removeMember: (memberId: string) => Promise<void>
  revokeInvite: (inviteId: string) => Promise<void>

  // Invite handling
  checkPendingInvites: (email: string) => Promise<OrganizationInvite[]>
  acceptInvite: (inviteId: string) => Promise<void>
  declineInvite: (inviteId: string) => Promise<void>

  // Utilities
  clearError: () => void
  refreshOrganization: () => Promise<void>
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined)

export function OrganizationProvider({ children }: { children: ReactNode }) {
  const { user, userProfile, isDemo, loading: authLoading } = useAuth()

  const [organization, setOrganization] = useState<Organization | null>(null)
  const [membership, setMembership] = useState<OrganizationMember | null>(null)
  const [members, setMembers] = useState<OrganizationMember[]>([])
  const [invites, setInvites] = useState<OrganizationInvite[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Computed values
  const isOwner = membership?.role === 'owner'
  const isAdmin = membership?.role === 'admin' || membership?.role === 'owner'
  const permissions = membership ? ROLE_PERMISSIONS[membership.role] : null
  const hasOrganization = !!organization
  const needsSetup = !authLoading && !isDemo && !!user && !organization && !loading

  // Clear error
  const clearError = useCallback(() => setError(null), [])

  // Fetch organization data
  const fetchOrganization = useCallback(async (orgId: string) => {
    try {
      const orgDoc = await getDoc(doc(db, 'organizations', orgId))
      if (orgDoc.exists()) {
        const data = orgDoc.data()
        return {
          ...data,
          id: orgDoc.id,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Organization
      }
      return null
    } catch (err) {
      console.error('Error fetching organization:', err)
      return null
    }
  }, [])

  // Fetch user's membership
  const fetchMembership = useCallback(async (userId: string) => {
    try {
      const membershipsQuery = query(
        collection(db, 'organization_members'),
        where('userId', '==', userId)
      )
      const snapshot = await getDocs(membershipsQuery)

      if (!snapshot.empty) {
        const doc = snapshot.docs[0]
        const data = doc.data()
        return {
          ...data,
          id: doc.id,
          joinedAt: data.joinedAt?.toDate() || new Date(),
          lastActiveAt: data.lastActiveAt?.toDate(),
        } as OrganizationMember
      }
      return null
    } catch (err) {
      console.error('Error fetching membership:', err)
      return null
    }
  }, [])

  // Fetch all members of an organization
  const fetchMembers = useCallback(async (orgId: string) => {
    try {
      const membersQuery = query(
        collection(db, 'organization_members'),
        where('organizationId', '==', orgId)
      )
      const snapshot = await getDocs(membersQuery)

      return snapshot.docs.map(doc => {
        const data = doc.data()
        return {
          ...data,
          id: doc.id,
          joinedAt: data.joinedAt?.toDate() || new Date(),
          lastActiveAt: data.lastActiveAt?.toDate(),
        } as OrganizationMember
      })
    } catch (err) {
      console.error('Error fetching members:', err)
      return []
    }
  }, [])

  // Fetch pending invites for an organization
  const fetchInvites = useCallback(async (orgId: string) => {
    try {
      const invitesQuery = query(
        collection(db, 'organization_invites'),
        where('organizationId', '==', orgId),
        where('status', '==', 'pending')
      )
      const snapshot = await getDocs(invitesQuery)

      return snapshot.docs.map(doc => {
        const data = doc.data()
        return {
          ...data,
          id: doc.id,
          createdAt: data.createdAt?.toDate() || new Date(),
          expiresAt: data.expiresAt?.toDate() || new Date(),
          acceptedAt: data.acceptedAt?.toDate(),
        } as OrganizationInvite
      })
    } catch (err) {
      console.error('Error fetching invites:', err)
      return []
    }
  }, [])

  // Initialize organization data
  useEffect(() => {
    if (authLoading) return

    // Handle demo mode
    if (isDemo) {
      setOrganization(DEMO_ORGANIZATION)
      setMembership(DEMO_MEMBER)
      setMembers([DEMO_MEMBER])
      setInvites([])
      setLoading(false)
      return
    }

    // No user, clear state
    if (!user) {
      setOrganization(null)
      setMembership(null)
      setMembers([])
      setInvites([])
      setLoading(false)
      return
    }

    // Fetch user's organization
    const initOrganization = async () => {
      setLoading(true)
      try {
        // First, find user's membership
        const userMembership = await fetchMembership(user.uid)

        if (userMembership) {
          setMembership(userMembership)

          // Fetch the organization
          const org = await fetchOrganization(userMembership.organizationId)
          if (org) {
            setOrganization(org)

            // Fetch all members if user has permission
            if (hasPermission(userMembership.role, 'canManageMembers')) {
              const orgMembers = await fetchMembers(userMembership.organizationId)
              setMembers(orgMembers)

              const orgInvites = await fetchInvites(userMembership.organizationId)
              setInvites(orgInvites)
            } else {
              setMembers([userMembership])
              setInvites([])
            }
          }
        } else {
          // No membership found - user needs to create or join an org
          setOrganization(null)
          setMembership(null)
          setMembers([])
          setInvites([])
        }
      } catch (err) {
        console.error('Error initializing organization:', err)
        setError('Failed to load organization data')
      } finally {
        setLoading(false)
      }
    }

    initOrganization()
  }, [user, isDemo, authLoading, fetchMembership, fetchOrganization, fetchMembers, fetchInvites])

  // Create a new organization
  const createOrganization = useCallback(async (name: string, plan: PlanType = 'free'): Promise<Organization> => {
    if (!user) throw new Error('Must be logged in to create an organization')
    if (isDemo) throw new Error('Cannot create organization in demo mode')

    try {
      setError(null)

      // Generate unique slug
      let slug = generateSlug(name)
      let slugExists = true
      let attempts = 0

      while (slugExists && attempts < 10) {
        const slugQuery = query(
          collection(db, 'organizations'),
          where('slug', '==', slug)
        )
        const slugSnapshot = await getDocs(slugQuery)
        slugExists = !slugSnapshot.empty

        if (slugExists) {
          slug = `${generateSlug(name)}-${Math.random().toString(36).substring(2, 6)}`
          attempts++
        }
      }

      // Create organization
      const orgData = {
        name,
        slug,
        plan,
        planLimits: PLAN_LIMITS[plan],
        settings: DEFAULT_ORG_SETTINGS,
        ownerId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }

      const orgRef = await addDoc(collection(db, 'organizations'), orgData)

      // Create owner membership
      const displayName = userProfile?.displayName || user.displayName || null
      const memberData = {
        organizationId: orgRef.id,
        userId: user.uid,
        email: user.email || '',
        ...(displayName && { displayName }),
        role: 'owner' as MemberRole,
        joinedAt: serverTimestamp(),
      }

      await addDoc(collection(db, 'organization_members'), memberData)

      // Update user document with organizationId
      await setDoc(doc(db, 'users', user.uid), {
        organizationId: orgRef.id,
      }, { merge: true })

      const newOrg: Organization = {
        ...orgData,
        id: orgRef.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const newMember: OrganizationMember = {
        ...memberData,
        id: 'temp-id',
        displayName: displayName || '',
        joinedAt: new Date(),
      }

      setOrganization(newOrg)
      setMembership(newMember)
      setMembers([newMember])

      return newOrg
    } catch (err) {
      console.error('Error creating organization:', err)
      setError('Failed to create organization')
      throw err
    }
  }, [user, userProfile, isDemo])

  // Update organization
  const updateOrganization = useCallback(async (data: Partial<Organization>) => {
    if (!organization || !membership) throw new Error('No organization')
    if (!hasPermission(membership.role, 'canManageOrganization')) {
      throw new Error('Insufficient permissions')
    }
    if (isDemo) throw new Error('Cannot update organization in demo mode')

    try {
      setError(null)

      await updateDoc(doc(db, 'organizations', organization.id), {
        ...data,
        updatedAt: serverTimestamp(),
      })

      setOrganization(prev => prev ? { ...prev, ...data, updatedAt: new Date() } : null)
    } catch (err) {
      console.error('Error updating organization:', err)
      setError('Failed to update organization')
      throw err
    }
  }, [organization, membership, isDemo])

  // Switch organization (for users with multiple orgs)
  const switchOrganization = useCallback(async (orgId: string) => {
    if (!user) throw new Error('Must be logged in')
    if (isDemo) throw new Error('Cannot switch organization in demo mode')

    try {
      setLoading(true)
      setError(null)

      // Verify user is a member of this org
      const memberQuery = query(
        collection(db, 'organization_members'),
        where('organizationId', '==', orgId),
        where('userId', '==', user.uid)
      )
      const memberSnapshot = await getDocs(memberQuery)

      if (memberSnapshot.empty) {
        throw new Error('You are not a member of this organization')
      }

      // Fetch the new organization
      const org = await fetchOrganization(orgId)
      if (!org) throw new Error('Organization not found')

      const memberDoc = memberSnapshot.docs[0]
      const memberData = memberDoc.data()
      const newMembership: OrganizationMember = {
        ...memberData,
        id: memberDoc.id,
        joinedAt: memberData.joinedAt?.toDate() || new Date(),
      } as OrganizationMember

      // Update user's current organization
      await setDoc(doc(db, 'users', user.uid), {
        organizationId: orgId,
      }, { merge: true })

      setOrganization(org)
      setMembership(newMembership)

      // Fetch members if permitted
      if (hasPermission(newMembership.role, 'canManageMembers')) {
        const orgMembers = await fetchMembers(orgId)
        setMembers(orgMembers)

        const orgInvites = await fetchInvites(orgId)
        setInvites(orgInvites)
      } else {
        setMembers([newMembership])
        setInvites([])
      }
    } catch (err) {
      console.error('Error switching organization:', err)
      setError('Failed to switch organization')
      throw err
    } finally {
      setLoading(false)
    }
  }, [user, isDemo, fetchOrganization, fetchMembers, fetchInvites])

  // Invite a member
  const inviteMember = useCallback(async (email: string, role: MemberRole): Promise<OrganizationInvite> => {
    if (!organization || !membership || !user) throw new Error('No organization')
    if (!hasPermission(membership.role, 'canManageMembers')) {
      throw new Error('Insufficient permissions')
    }
    if (isDemo) throw new Error('Cannot invite members in demo mode')

    try {
      setError(null)

      // Check if user is already a member
      const existingMemberQuery = query(
        collection(db, 'organization_members'),
        where('organizationId', '==', organization.id),
        where('email', '==', email.toLowerCase())
      )
      const existingMember = await getDocs(existingMemberQuery)
      if (!existingMember.empty) {
        throw new Error('User is already a member')
      }

      // Check for existing pending invite
      const existingInviteQuery = query(
        collection(db, 'organization_invites'),
        where('organizationId', '==', organization.id),
        where('email', '==', email.toLowerCase()),
        where('status', '==', 'pending')
      )
      const existingInvite = await getDocs(existingInviteQuery)
      if (!existingInvite.empty) {
        throw new Error('An invitation is already pending for this email')
      }

      // Create invite
      const invitedByName = userProfile?.displayName || user.displayName || null
      const inviteData = {
        organizationId: organization.id,
        email: email.toLowerCase(),
        role,
        invitedBy: user.uid,
        ...(invitedByName && { invitedByName }),
        organizationName: organization.name,
        status: 'pending' as const,
        token: generateInviteToken(),
        createdAt: serverTimestamp(),
        expiresAt: Timestamp.fromDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)), // 7 days
      }

      const inviteRef = await addDoc(collection(db, 'organization_invites'), inviteData)

      const newInvite: OrganizationInvite = {
        ...inviteData,
        id: inviteRef.id,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      }

      setInvites(prev => [...prev, newInvite])

      return newInvite
    } catch (err) {
      console.error('Error inviting member:', err)
      setError(err instanceof Error ? err.message : 'Failed to send invitation')
      throw err
    }
  }, [organization, membership, user, userProfile, isDemo])

  // Update member role
  const updateMemberRole = useCallback(async (memberId: string, role: MemberRole) => {
    if (!organization || !membership) throw new Error('No organization')
    if (!hasPermission(membership.role, 'canManageMembers')) {
      throw new Error('Insufficient permissions')
    }
    if (isDemo) throw new Error('Cannot update members in demo mode')

    try {
      setError(null)

      await updateDoc(doc(db, 'organization_members', memberId), { role })

      setMembers(prev =>
        prev.map(m => m.id === memberId ? { ...m, role } : m)
      )
    } catch (err) {
      console.error('Error updating member role:', err)
      setError('Failed to update member role')
      throw err
    }
  }, [organization, membership, isDemo])

  // Remove member
  const removeMember = useCallback(async (memberId: string) => {
    if (!organization || !membership) throw new Error('No organization')
    if (!hasPermission(membership.role, 'canManageMembers')) {
      throw new Error('Insufficient permissions')
    }
    if (isDemo) throw new Error('Cannot remove members in demo mode')

    try {
      setError(null)

      // Get the member being removed
      const memberToRemove = members.find(m => m.id === memberId)
      if (memberToRemove?.role === 'owner') {
        throw new Error('Cannot remove the organization owner')
      }

      await deleteDoc(doc(db, 'organization_members', memberId))

      setMembers(prev => prev.filter(m => m.id !== memberId))
    } catch (err) {
      console.error('Error removing member:', err)
      setError(err instanceof Error ? err.message : 'Failed to remove member')
      throw err
    }
  }, [organization, membership, members, isDemo])

  // Revoke invite
  const revokeInvite = useCallback(async (inviteId: string) => {
    if (!organization || !membership) throw new Error('No organization')
    if (!hasPermission(membership.role, 'canManageMembers')) {
      throw new Error('Insufficient permissions')
    }
    if (isDemo) throw new Error('Cannot revoke invites in demo mode')

    try {
      setError(null)

      await updateDoc(doc(db, 'organization_invites', inviteId), {
        status: 'revoked',
      })

      setInvites(prev => prev.filter(i => i.id !== inviteId))
    } catch (err) {
      console.error('Error revoking invite:', err)
      setError('Failed to revoke invitation')
      throw err
    }
  }, [organization, membership, isDemo])

  // Check for pending invites for an email
  const checkPendingInvites = useCallback(async (email: string): Promise<OrganizationInvite[]> => {
    try {
      const invitesQuery = query(
        collection(db, 'organization_invites'),
        where('email', '==', email.toLowerCase()),
        where('status', '==', 'pending')
      )
      const snapshot = await getDocs(invitesQuery)

      return snapshot.docs.map(doc => {
        const data = doc.data()
        return {
          ...data,
          id: doc.id,
          createdAt: data.createdAt?.toDate() || new Date(),
          expiresAt: data.expiresAt?.toDate() || new Date(),
        } as OrganizationInvite
      }).filter(invite => invite.expiresAt > new Date())
    } catch (err) {
      console.error('Error checking invites:', err)
      return []
    }
  }, [])

  // Accept invite
  const acceptInvite = useCallback(async (inviteId: string) => {
    if (!user) throw new Error('Must be logged in')
    if (isDemo) throw new Error('Cannot accept invites in demo mode')

    try {
      setLoading(true)
      setError(null)

      // Get the invite
      const inviteDoc = await getDoc(doc(db, 'organization_invites', inviteId))
      if (!inviteDoc.exists()) throw new Error('Invite not found')

      const invite = inviteDoc.data()
      if (invite.status !== 'pending') throw new Error('Invite is no longer valid')
      if (invite.email !== user.email?.toLowerCase()) throw new Error('This invite is for a different email')
      if (invite.expiresAt.toDate() < new Date()) throw new Error('Invite has expired')

      // Create membership
      const displayName = userProfile?.displayName || user.displayName || null
      const memberData = {
        organizationId: invite.organizationId,
        userId: user.uid,
        email: user.email,
        ...(displayName && { displayName }),
        role: invite.role,
        invitedBy: invite.invitedBy,
        joinedAt: serverTimestamp(),
      }

      await addDoc(collection(db, 'organization_members'), memberData)

      // Update invite status
      await updateDoc(doc(db, 'organization_invites', inviteId), {
        status: 'accepted',
        acceptedAt: serverTimestamp(),
      })

      // Update user's organization
      await setDoc(doc(db, 'users', user.uid), {
        organizationId: invite.organizationId,
      }, { merge: true })

      // Fetch the organization
      const org = await fetchOrganization(invite.organizationId)
      if (org) {
        setOrganization(org)
        setMembership({
          ...memberData,
          id: 'new-member',
          displayName: displayName || '',
          joinedAt: new Date(),
        } as OrganizationMember)
      }
    } catch (err) {
      console.error('Error accepting invite:', err)
      setError(err instanceof Error ? err.message : 'Failed to accept invitation')
      throw err
    } finally {
      setLoading(false)
    }
  }, [user, userProfile, isDemo, fetchOrganization])

  // Decline invite
  const declineInvite = useCallback(async (inviteId: string) => {
    if (isDemo) throw new Error('Cannot decline invites in demo mode')

    try {
      setError(null)

      await updateDoc(doc(db, 'organization_invites', inviteId), {
        status: 'revoked',
      })
    } catch (err) {
      console.error('Error declining invite:', err)
      setError('Failed to decline invitation')
      throw err
    }
  }, [isDemo])

  // Refresh organization data
  const refreshOrganization = useCallback(async () => {
    if (!organization || isDemo) return

    try {
      setLoading(true)
      const org = await fetchOrganization(organization.id)
      if (org) setOrganization(org)

      if (membership && hasPermission(membership.role, 'canManageMembers')) {
        const orgMembers = await fetchMembers(organization.id)
        setMembers(orgMembers)

        const orgInvites = await fetchInvites(organization.id)
        setInvites(orgInvites)
      }
    } catch (err) {
      console.error('Error refreshing organization:', err)
    } finally {
      setLoading(false)
    }
  }, [organization, membership, isDemo, fetchOrganization, fetchMembers, fetchInvites])

  const value: OrganizationContextType = {
    // State
    organization,
    membership,
    members,
    invites,
    loading,
    error,

    // Computed
    isOwner,
    isAdmin,
    permissions,
    hasOrganization,
    needsSetup,

    // Organization management
    createOrganization,
    updateOrganization,
    switchOrganization,

    // Member management
    inviteMember,
    updateMemberRole,
    removeMember,
    revokeInvite,

    // Invite handling
    checkPendingInvites,
    acceptInvite,
    declineInvite,

    // Utilities
    clearError,
    refreshOrganization,
  }

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  )
}

// Hook to use organization context
export function useOrganization() {
  const context = useContext(OrganizationContext)
  if (context === undefined) {
    throw new Error('useOrganization must be used within an OrganizationProvider')
  }
  return context
}
