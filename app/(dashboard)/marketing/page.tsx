'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useOrganization } from '@/context/OrganizationContext';
import { formatCurrency } from '@/lib/formatting';

interface IntegrationStatus {
  googleAds: boolean;
  googleAnalytics: boolean;
  klaviyo: boolean;
  meta: boolean;
  tiktok: boolean;
}

interface ChannelData {
  id: string;
  name: string;
  icon: string;
  iconType: string;
  color: string;
  isConnected: boolean;
  settingsLink: string;
}

export default function MarketingDashboardPage() {
  const { organization } = useOrganization();
  const [integrations, setIntegrations] = useState<IntegrationStatus>({
    googleAds: false,
    googleAnalytics: false,
    klaviyo: false,
    meta: false,
    tiktok: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadIntegrations() {
      if (!organization?.id) {
        setLoading(false);
        return;
      }

      try {
        const orgDoc = await getDoc(doc(db, 'organizations', organization.id));
        if (orgDoc.exists()) {
          const data = orgDoc.data();
          setIntegrations({
            googleAds: data.googleAds?.isConnected || false,
            googleAnalytics: data.googleAnalytics?.isConnected || false,
            klaviyo: data.klaviyo?.isConnected || false,
            meta: data.meta?.isConnected || false,
            tiktok: data.tiktok?.isConnected || false,
          });
        }
      } catch (err) {
        console.error('Error loading integrations:', err);
      } finally {
        setLoading(false);
      }
    }

    loadIntegrations();
  }, [organization?.id]);

  const channels: ChannelData[] = [
    {
      id: 'google',
      name: 'Google Ads',
      icon: 'fa-google',
      iconType: 'fab',
      color: '#4285f4',
      isConnected: integrations.googleAds,
      settingsLink: '/settings/integrations/google-ads',
    },
    {
      id: 'meta',
      name: 'Meta Ads',
      icon: 'fa-facebook',
      iconType: 'fab',
      color: '#1877f2',
      isConnected: integrations.meta,
      settingsLink: '/settings/integrations/meta',
    },
    {
      id: 'tiktok',
      name: 'TikTok Ads',
      icon: 'fa-tiktok',
      iconType: 'fab',
      color: '#000000',
      isConnected: integrations.tiktok,
      settingsLink: '/settings/integrations/tiktok',
    },
  ];

  const hasAnyIntegration = integrations.googleAds || integrations.meta || integrations.tiktok || integrations.klaviyo;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // No integrations connected - show onboarding
  if (!hasAnyIntegration) {
    return (
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">Marketing Dashboard</h1>
          <p className="text-slate-400">Track ad performance, ROAS, CAC, and customer lifetime value</p>
        </div>

        {/* Welcome/Onboarding Card */}
        <div className="bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 rounded-xl p-8 text-center">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-chart-pie text-emerald-400 text-3xl"></i>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Connect Your Marketing Channels</h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            Connect your advertising and marketing platforms to see unified performance data,
            track ROAS, CAC, and LTV all in one place.
          </p>
        </div>

        {/* Available Integrations */}
        <div className="grid md:grid-cols-3 gap-4">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${channel.color}20` }}
                >
                  <i className={`${channel.iconType} ${channel.icon} text-xl`} style={{ color: channel.color }}></i>
                </div>
                <div>
                  <div className="text-white font-medium">{channel.name}</div>
                  <div className="text-sm text-slate-400">Not connected</div>
                </div>
              </div>
              <Link
                href={channel.settingsLink}
                className="block w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-center rounded-lg text-sm transition-colors"
              >
                Connect
              </Link>
            </div>
          ))}
        </div>

        {/* Email Marketing */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <i className="fas fa-envelope text-purple-400 text-xl"></i>
              </div>
              <div>
                <div className="text-white font-medium">Email & SMS Marketing</div>
                <div className="text-sm text-slate-400">
                  {integrations.klaviyo ? 'Klaviyo connected' : 'Connect Klaviyo for email/SMS tracking'}
                </div>
              </div>
            </div>
            <Link
              href="/settings/integrations/klaviyo"
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm"
            >
              {integrations.klaviyo ? 'Settings' : 'Connect'}
            </Link>
          </div>
        </div>

        {/* What you'll see */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">What you'll see once connected</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fas fa-dollar-sign text-emerald-400"></i>
              </div>
              <div>
                <div className="text-white font-medium">ROAS</div>
                <div className="text-sm text-slate-400">Return on ad spend across all channels</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fas fa-user-plus text-blue-400"></i>
              </div>
              <div>
                <div className="text-white font-medium">CAC</div>
                <div className="text-sm text-slate-400">Customer acquisition cost by channel</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fas fa-heart text-amber-400"></i>
              </div>
              <div>
                <div className="text-white font-medium">LTV</div>
                <div className="text-sm text-slate-400">Customer lifetime value tracking</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fas fa-chart-line text-purple-400"></i>
              </div>
              <div>
                <div className="text-white font-medium">Trends</div>
                <div className="text-sm text-slate-400">Performance trends over time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Has some integrations - show dashboard with connected channels
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Marketing Dashboard</h1>
          <p className="text-slate-400">Track ad performance, ROAS, CAC, and customer lifetime value</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/settings?tab=integrations"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-sm transition-colors"
          >
            <i className="fas fa-plug mr-2"></i>
            Manage Integrations
          </Link>
        </div>
      </div>

      {/* Summary Metrics - Placeholder until real data */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <i className="fas fa-info-circle text-amber-400"></i>
          <div>
            <span className="text-white font-medium">Data coming soon.</span>
            <span className="text-slate-400 ml-2">
              Real-time metrics will appear here once your connected platforms sync data.
            </span>
          </div>
        </div>
      </div>

      {/* Placeholder Metrics */}
      <div className="grid grid-cols-6 gap-4">
        {['Total Spend', 'Revenue', 'ROAS', 'CAC', 'LTV', 'LTV:CAC'].map((metric) => (
          <div key={metric} className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
            <div className="text-sm text-slate-400 mb-1">{metric}</div>
            <div className="text-2xl font-bold text-slate-600">—</div>
          </div>
        ))}
      </div>

      {/* Channel Performance Table */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">Channel Performance</h2>
          <p className="text-sm text-slate-400">Breakdown by advertising platform</p>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700 text-left">
              <th className="p-4 text-slate-400 font-medium">Channel</th>
              <th className="p-4 text-slate-400 font-medium text-right">Spend</th>
              <th className="p-4 text-slate-400 font-medium text-right">Revenue</th>
              <th className="p-4 text-slate-400 font-medium text-right">ROAS</th>
              <th className="p-4 text-slate-400 font-medium text-right">Orders</th>
              <th className="p-4 text-slate-400 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {channels.map((channel) => (
              <tr key={channel.id} className="hover:bg-slate-800/30">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${channel.color}20` }}
                    >
                      <i className={`${channel.iconType} ${channel.icon} text-white`} style={{ color: channel.color }}></i>
                    </div>
                    <div>
                      <div className="font-medium text-white">{channel.name}</div>
                      <div className="text-xs text-slate-400">
                        {channel.isConnected ? 'Connected' : 'Not connected'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-right text-slate-500">—</td>
                <td className="p-4 text-right text-slate-500">—</td>
                <td className="p-4 text-right text-slate-500">—</td>
                <td className="p-4 text-right text-slate-500">—</td>
                <td className="p-4 text-right">
                  {channel.isConnected ? (
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs">
                      Connected
                    </span>
                  ) : (
                    <Link
                      href={channel.settingsLink}
                      className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded text-xs"
                    >
                      Connect
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Two Column: Email Marketing & Connect More */}
      <div className="grid grid-cols-2 gap-6">
        {/* Email Marketing */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Email Marketing</h2>
              <p className="text-sm text-slate-400">
                {integrations.klaviyo ? 'Powered by Klaviyo' : 'Connect Klaviyo'}
              </p>
            </div>
            <Link href="/settings/integrations/klaviyo" className="text-emerald-400 hover:text-emerald-300 text-sm">
              {integrations.klaviyo ? 'View Details →' : 'Connect →'}
            </Link>
          </div>
          <div className="p-4">
            {integrations.klaviyo ? (
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-slate-400">Subscribers</div>
                  <div className="text-xl font-bold text-slate-500">—</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Open Rate</div>
                  <div className="text-xl font-bold text-slate-500">—</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Click Rate</div>
                  <div className="text-xl font-bold text-slate-500">—</div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-envelope text-purple-400"></i>
                </div>
                <p className="text-slate-400 text-sm">Connect Klaviyo to see email metrics</p>
              </div>
            )}
          </div>
        </div>

        {/* Connect More Platforms */}
        <div className="p-6 border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-3">
            <i className="fas fa-plus text-slate-400 text-xl"></i>
          </div>
          <h4 className="font-medium text-white mb-1">Connect More Platforms</h4>
          <p className="text-sm text-slate-400 mb-3">Add more ad platforms for a complete picture</p>
          <Link
            href="/settings?tab=integrations"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm rounded-lg transition-colors"
          >
            Manage Integrations
          </Link>
        </div>
      </div>
    </div>
  );
}
