'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: ('admin' | 'warehouse' | 'viewer')[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, userProfile, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Not logged in - redirect to login
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
      } else if (allowedRoles && userProfile && !allowedRoles.includes(userProfile.role)) {
        // Logged in but doesn't have required role
        router.push('/unauthorized')
      }
    }
  }, [user, userProfile, loading, router, pathname, allowedRoles])

  // Show loading state
  if (loading) {
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

  return <>{children}</>
}
