'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useOrganization } from '@/context/OrganizationContext';

interface MetaConnection {
  isConnected: boolean;
  accountId: string | null;
  accountName: string | null;
  connectedAt: Date | null;
  email: string | null;
}

export default function MetaAdsPage() {
  const { organization } = useOrganization();
  const [connection, setConnection] = useState<MetaConnection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadConnection() {
      if (!organization?.id) {
        setLoading(false);
        return;
      }

      try {
        const orgDoc = await getDoc(doc(db, 'organizations', organization.id));
        if (orgDoc.exists()) {
          const data = orgDoc.data();
          if (data.meta) {
            setConnection({
              isConnected: data.meta.isConnected || false,
              accountId: data.meta.accountId || null,
              accountName: data.meta.accountName || null,
              connectedAt: data.meta.connectedAt?.toDate() || null,
              email: data.meta.email || null,
            });
          }
        }
      } catch (err) {
        console.error('Error loading Meta connection:', err);
      } finally {
        setLoading(false);
      }
    }

    loadConnection();
  }, [organization?.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // Not connected - show connect prompt
  if (!connection?.isConnected) {
    return (
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <Link href="/marketing" className="hover:text-white">Marketing</Link>
            <i className="fas fa-chevron-right text-xs"></i>
            <span className="text-white">Meta Ads</span>
          </div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <i className="fab fa-meta text-[#0081fb]"></i>
            Meta Ads
          </h1>
          <p className="text-slate-400">Facebook & Instagram advertising</p>
        </div>

        {/* Connect Prompt */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-12 text-center">
          <div className="w-20 h-20 bg-[#0081fb]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <i className="fab fa-meta text-[#0081fb] text-3xl"></i>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Connect Meta Ads</h2>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            Connect your Meta Business account to see Facebook and Instagram ad performance, ROAS, and campaign data.
          </p>
          <Link
            href="/settings/integrations/meta"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0081fb] text-white rounded-lg hover:bg-[#0070e0] transition-colors"
          >
            <i className="fab fa-facebook"></i>
            Connect Meta Ads
          </Link>
          <p className="text-xs text-slate-500 mt-4">
            Integration coming soon
          </p>
        </div>

        {/* What you'll see */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">What you'll see once connected</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fas fa-chart-line text-emerald-400"></i>
              </div>
              <div>
                <div className="text-white font-medium">Campaign Performance</div>
                <div className="text-sm text-slate-400">Spend, revenue, ROAS by campaign</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fas fa-users text-blue-400"></i>
              </div>
              <div>
                <div className="text-white font-medium">Audience Insights</div>
                <div className="text-sm text-slate-400">Top performing audiences</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fas fa-image text-purple-400"></i>
              </div>
              <div>
                <div className="text-white font-medium">Creative Performance</div>
                <div className="text-sm text-slate-400">Best performing ad creatives</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Connected state (placeholder for when integration is built)
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
          <Link href="/marketing" className="hover:text-white">Marketing</Link>
          <i className="fas fa-chevron-right text-xs"></i>
          <span className="text-white">Meta Ads</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0081fb]/20 rounded-xl flex items-center justify-center">
              <i className="fab fa-meta text-[#0081fb] text-xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Meta Ads</h1>
              <p className="text-sm text-slate-400">{connection.accountName || 'Connected'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">
              <i className="fas fa-check-circle mr-1"></i>
              Connected
            </span>
            <button
              onClick={() => window.open('https://business.facebook.com', '_blank')}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm"
            >
              <i className="fas fa-external-link-alt mr-2"></i>
              Open Ads Manager
            </button>
          </div>
        </div>
      </div>

      {/* Placeholder metrics */}
      <div className="grid grid-cols-5 gap-4">
        {['Spend', 'Revenue', 'ROAS', 'Purchases', 'Reach'].map((metric) => (
          <div key={metric} className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
            <div className="text-sm text-slate-400 mb-1">{metric}</div>
            <div className="text-xl font-bold text-slate-600">—</div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-12 text-center">
        <div className="w-16 h-16 bg-slate-700/50 rounded-xl flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-bullhorn text-slate-500 text-2xl"></i>
        </div>
        <div className="text-slate-400">Campaign data will appear here</div>
        <div className="text-sm text-slate-500 mt-1">Full Meta Ads integration coming soon</div>
      </div>
    </div>
  );
}
