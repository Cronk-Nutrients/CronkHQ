'use client'

import { ProtectedRoute } from '@/components/ProtectedRoute'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <Sidebar />
      <Header />
      <main className="ml-64 pt-16 min-h-screen bg-slate-900">
        <div className="p-6">
          {children}
        </div>
      </main>
    </ProtectedRoute>
  )
}
