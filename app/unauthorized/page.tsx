'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

export default function UnauthorizedPage() {
  const { userProfile, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fas fa-ban text-red-400 text-3xl"></i>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
        <p className="text-slate-400 mb-6">
          You don&apos;t have permission to access this page.
          {userProfile && (
            <span className="block mt-2 text-sm">
              Your role: <span className="text-white capitalize">{userProfile.role}</span>
            </span>
          )}
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
          >
            Go to Dashboard
          </Link>
          <button
            onClick={() => logout()}
            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
