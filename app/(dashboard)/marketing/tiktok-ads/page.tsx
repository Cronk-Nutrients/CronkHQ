'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useOrganization } from '@/context/OrganizationContext';

interface TikTokConnection {
  isConnected: boolean;
  advertiserId: string | null;
  accountName: string | null;
  connectedAt: Date | null;
  email: string | null;
}

export default function TikTokAdsPage() {
  const { organization } = useOrganization();
  const [connection, setConnection] = useState<TikTokConnection | null>(null);
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
          if (data.tiktok) {
            setConnection({
              isConnected: data.tiktok.isConnected || false,
              advertiserId: data.tiktok.advertiserId || null,
              accountName: data.tiktok.accountName || null,
              connectedAt: data.tiktok.connectedAt?.toDate() || null,
              email: data.tiktok.email || null,
            });
          }
        }
      } catch (err) {
        console.error('Error loading TikTok connection:', err);
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
            <span className="text-white">TikTok Ads</span>
          </div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <i className="fab fa-tiktok"></i>
            TikTok Ads
          </h1>
          <p className="text-slate-400">Video advertising on TikTok</p>
        </div>

        {/* Connect Prompt */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-12 text-center">
          <div className="w-20 h-20 bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <i className="fab fa-tiktok text-white text-3xl"></i>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Connect TikTok Ads</h2>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            Connect your TikTok Ads account to see video ad performance, conversions, and audience insights.
          </p>
          <Link
            href="/settings/integrations/tiktok"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
          >
            <i className="fab fa-tiktok"></i>
            Connect TikTok Ads
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
                <i className="fas fa-video text-emerald-400"></i>
              </div>
              <div>
                <div className="text-white font-medium">Video Performance</div>
                <div className="text-sm text-slate-400">Views, engagement, completion rates</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fas fa-bullseye text-blue-400"></i>
              </div>
              <div>
                <div className="text-white font-medium">Conversions</div>
                <div className="text-sm text-slate-400">Purchase and conversion tracking</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fas fa-users text-purple-400"></i>
              </div>
              <div>
                <div className="text-white font-medium">Audience Insights</div>
                <div className="text-sm text-slate-400">Demographics and interests</div>
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
          <span className="text-white">TikTok Ads</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center">
              <i className="fab fa-tiktok text-white text-xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">TikTok Ads</h1>
              <p className="text-sm text-slate-400">{connection.accountName || 'Connected'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">
              <i className="fas fa-check-circle mr-1"></i>
              Connected
            </span>
            <button
              onClick={() => window.open('https://ads.tiktok.com', '_blank')}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm"
            >
              <i className="fas fa-external-link-alt mr-2"></i>
              Open TikTok Ads
            </button>
          </div>
        </div>
      </div>

      {/* Placeholder metrics */}
      <div className="grid grid-cols-5 gap-4">
        {['Spend', 'Revenue', 'ROAS', 'Conversions', 'Video Views'].map((metric) => (
          <div key={metric} className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
            <div className="text-sm text-slate-400 mb-1">{metric}</div>
            <div className="text-xl font-bold text-slate-600">—</div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-12 text-center">
        <div className="w-16 h-16 bg-slate-700/50 rounded-xl flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-video text-slate-500 text-2xl"></i>
        </div>
        <div className="text-slate-400">Campaign data will appear here</div>
        <div className="text-sm text-slate-500 mt-1">Full TikTok Ads integration coming soon</div>
      </div>
    </div>
  );
}
