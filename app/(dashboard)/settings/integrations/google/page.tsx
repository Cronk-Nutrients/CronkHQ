'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function GoogleIntegrationsPage() {
  const router = useRouter()

  // This page now redirects to the separate integration pages
  // Keeping it for backwards compatibility

  return (
    <div className="p-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/settings" className="hover:text-white transition-colors">
          Settings
        </Link>
        <i className="fas fa-chevron-right text-xs"></i>
        <span className="text-white">Google Integrations</span>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <i className="fab fa-google text-[#4285f4]"></i>
          Google Integrations
        </h1>
        <p className="text-slate-400 mt-1">Connect Google Analytics and Google Ads</p>
      </div>

      <div className="grid gap-4">
        {/* Google Analytics */}
        <Link
          href="/settings/integrations/google-analytics"
          className="block p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-orange-500/50 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <i className="fas fa-chart-line text-orange-400 text-2xl"></i>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
                  Google Analytics 4
                </h2>
                <p className="text-sm text-slate-400">Track user behavior and events</p>
              </div>
            </div>
            <i className="fas fa-chevron-right text-slate-500 group-hover:text-orange-400 transition-colors"></i>
          </div>
        </Link>

        {/* Google Ads */}
        <Link
          href="/settings/integrations/google-ads"
          className="block p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-blue-500/50 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <i className="fab fa-google text-blue-400 text-2xl"></i>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                  Google Ads
                </h2>
                <p className="text-sm text-slate-400">Track ad spend and conversions</p>
              </div>
            </div>
            <i className="fas fa-chevron-right text-slate-500 group-hover:text-blue-400 transition-colors"></i>
          </div>
        </Link>
      </div>
    </div>
  )
}
