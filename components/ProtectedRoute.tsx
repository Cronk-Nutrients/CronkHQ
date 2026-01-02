'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useOrganization } from '@/context/OrganizationContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: ('admin' | 'warehouse' | 'viewer')[]
  requireOrganization?: boolean // Default: true - redirect to setup if no org
}

export function ProtectedRoute({
  children,
  allowedRoles,
  requireOrganization = true,
}: ProtectedRouteProps) {
  const { user, userProfile, loading: authLoading, isDemo } = useAuth()
  const { organization, loading: orgLoading, needsSetup } = useOrganization()
  const router = useRouter()
  const pathname = usePathname()

  const isLoading = authLoading || orgLoading

  useEffect(() => {
    if (isLoading) return

    if (!user) {
      // Not logged in - redirect to login
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
      return
    }

    // Check role-based access
    if (allowedRoles && userProfile && !allowedRoles.includes(userProfile.role)) {
      router.push('/unauthorized')
      return
    }

    // Check organization requirement (skip for demo mode)
    if (requireOrganization && !isDemo && needsSetup) {
      router.push('/setup')
      return
    }
  }, [user, userProfile, isLoading, router, pathname, allowedRoles, organization, isDemo, needsSetup, requireOrganization])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  // Not authenticated
  if (!user) {
    return null
  }

  // Not authorized
  if (allowedRoles && userProfile && !allowedRoles.includes(userProfile.role)) {
    return null
  }

  // Needs organization setup (non-demo users)
  if (requireOrganization && !isDemo && needsSetup) {
    return null
  }

  return <>{children}</>
}
