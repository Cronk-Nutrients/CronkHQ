'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useOrganization } from '@/context/OrganizationContext';

interface KlaviyoData {
  account: {
    id: string;
    name: string;
    email: string;
    timezone: string;
    publicApiKey: string;
  };
  metrics: {
    totalSubscribers: number;
    totalProfiles: number;
    totalLists: number;
    totalCampaigns: number;
    sentCampaigns: number;
    draftCampaigns: number;
    scheduledCampaigns: number;
    totalFlows: number;
    activeFlows: number;
    draftFlows: number;
    totalSegments: number;
    // Aggregate email stats
    totalSent: number;
    totalDelivered: number;
    totalOpened: number;
    totalClicked: number;
    totalBounced: number;
    totalUnsubscribed: number;
    avgOpenRate: number;
    avgClickRate: number;
    avgBounceRate: number;
  };
  campaigns: Array<{
    id: string;
    name: string;
    status: string;
    channel: string;
    createdAt: string;
    updatedAt: string;
    sentAt: string;
    subject: string;
    recipients: number;
    delivered: number;
    opens: number;
    uniqueOpens: number;
    clicks: number;
    uniqueClicks: number;
    bounced: number;
    unsubscribes: number;
    spamComplaints: number;
    openRate: number;
    clickRate: number;
    bounceRate: number;
    unsubscribeRate: number;
  }>;
  flows: Array<{
    id: string;
    name: string;
    status: string;
    archived: boolean;
    triggerType: string;
    createdAt: string;
    updatedAt: string;
    actionCount: number;
    messageCount: number;
  }>;
  lists: Array<{
    id: string;
    name: string;
    profileCount: number;
    createdAt: string;
    updatedAt: string;
    optInProcess: string;
  }>;
  segments: Array<{
    id: string;
    name: string;
    profileCount: number;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isStarred: boolean;
  }>;
  tags: Array<{
    id: string;
    name: string;
  }>;
}

export default function EmailMarketingPage() {
  const { organization } = useOrganization();
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [data, setData] = useState<KlaviyoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'flows' | 'lists' | 'segments'>('overview');

  useEffect(() => {
    async function loadData() {
      if (!organization?.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/klaviyo/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ organizationId: organization.id }),
        });

        const result = await response.json();

        if (result.success) {
          setIsConnected(true);
          setData(result.data);
        } else if (result.error === 'Klaviyo not connected') {
          setIsConnected(false);
        } else {
          setError(result.error);
          setIsConnected(false);
        }
      } catch (err: any) {
        console.error('Error loading Klaviyo data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [organization?.id]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const formatPercent = (num: number) => {
    return `${(num * 100).toFixed(1)}%`;
  };

  const getStatusColor = (status: string) => {
    const s = status?.toLowerCase();
    if (s === 'sent' || s === 'live' || s === 'manual') return 'bg-emerald-500/20 text-emerald-400';
    if (s === 'draft') return 'bg-slate-500/20 text-slate-400';
    if (s === 'scheduled') return 'bg-blue-500/20 text-blue-400';
    if (s === 'cancelled' || s === 'archived') return 'bg-red-500/20 text-red-400';
    return 'bg-slate-500/20 text-slate-400';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // Not connected - show connect prompt
  if (!isConnected) {
    return (
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <Link href="/marketing" className="hover:text-white">Marketing</Link>
            <i className="fas fa-chevron-right text-xs"></i>
            <span className="text-white">Email Marketing</span>
          </div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <i className="fas fa-envelope text-purple-400"></i>
            Email Marketing
          </h1>
          <p className="text-slate-400">Email & SMS campaigns and automation</p>
        </div>

        {/* Connect Prompt */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-12 text-center">
          <div className="w-20 h-20 bg-[#12b789]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-[#12b789] text-4xl font-bold">K</span>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Connect Klaviyo</h2>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            Connect your Klaviyo account to see email campaigns, flows, subscriber metrics, and revenue attribution.
          </p>
          <Link
            href="/settings/integrations/klaviyo"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#12b789] text-white rounded-lg hover:bg-[#0fa678] transition-colors"
          >
            <i className="fas fa-plug"></i>
            Connect Klaviyo
          </Link>
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
                <div className="text-sm text-slate-400">Open rates, click rates, revenue</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fas fa-robot text-blue-400"></i>
              </div>
              <div>
                <div className="text-white font-medium">Automated Flows</div>
                <div className="text-sm text-slate-400">Welcome series, abandoned cart, etc.</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fas fa-users text-purple-400"></i>
              </div>
              <div>
                <div className="text-white font-medium">Subscriber Metrics</div>
                <div className="text-sm text-slate-400">List growth, segments, engagement</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Connected state with real data
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
          <Link href="/marketing" className="hover:text-white">Marketing</Link>
          <i className="fas fa-chevron-right text-xs"></i>
          <span className="text-white">Email Marketing</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#12b789] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Email Marketing</h1>
              <p className="text-sm text-slate-400">Powered by Klaviyo - {data?.account?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-lg">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-400 text-sm">Connected</span>
            </div>
            <button
              onClick={() => window.open('https://www.klaviyo.com/dashboard', '_blank')}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm"
            >
              <i className="fas fa-external-link-alt mr-2"></i>
              Open Klaviyo
            </button>
            <Link
              href="/settings/integrations/klaviyo"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-sm"
            >
              Settings
            </Link>
          </div>
        </div>
      </div>

      {/* Error message if any */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 text-red-400">
            <i className="fas fa-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Key Metrics Row 1 - Subscribers & Lists */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-emerald-500/20 to-green-600/20 border border-emerald-500/30 rounded-xl p-4">
          <div className="text-sm text-emerald-300 mb-1">Total Subscribers</div>
          <div className="text-3xl font-bold text-emerald-400">{formatNumber(data?.metrics?.totalSubscribers || 0)}</div>
          <div className="text-xs text-slate-400 mt-1">Across all lists</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Lists</div>
          <div className="text-2xl font-bold text-white">{data?.metrics?.totalLists || 0}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Segments</div>
          <div className="text-2xl font-bold text-white">{data?.metrics?.totalSegments || 0}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Total Campaigns</div>
          <div className="text-2xl font-bold text-white">{data?.metrics?.totalCampaigns || 0}</div>
          <div className="text-xs text-slate-500 mt-1">{data?.metrics?.sentCampaigns || 0} sent</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Active Flows</div>
          <div className="text-2xl font-bold text-emerald-400">{data?.metrics?.activeFlows || 0}</div>
          <div className="text-xs text-slate-500 mt-1">{data?.metrics?.totalFlows || 0} total</div>
        </div>
      </div>

      {/* Key Metrics Row 2 - Email Performance */}
      <div className="grid grid-cols-6 gap-4">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Emails Sent</div>
          <div className="text-xl font-bold text-white">{formatNumber(data?.metrics?.totalSent || 0)}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Delivered</div>
          <div className="text-xl font-bold text-white">{formatNumber(data?.metrics?.totalDelivered || 0)}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Opened</div>
          <div className="text-xl font-bold text-white">{formatNumber(data?.metrics?.totalOpened || 0)}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Clicked</div>
          <div className="text-xl font-bold text-white">{formatNumber(data?.metrics?.totalClicked || 0)}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Bounced</div>
          <div className="text-xl font-bold text-red-400">{formatNumber(data?.metrics?.totalBounced || 0)}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Unsubscribed</div>
          <div className="text-xl font-bold text-amber-400">{formatNumber(data?.metrics?.totalUnsubscribed || 0)}</div>
        </div>
      </div>

      {/* Performance Rates */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-blue-300">Avg. Open Rate</div>
            <i className="fas fa-envelope-open text-blue-400"></i>
          </div>
          <div className="text-3xl font-bold text-blue-400">{formatPercent(data?.metrics?.avgOpenRate || 0)}</div>
          <div className="text-xs text-slate-500 mt-1">Industry avg: ~20%</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-purple-300">Avg. Click Rate</div>
            <i className="fas fa-mouse-pointer text-purple-400"></i>
          </div>
          <div className="text-3xl font-bold text-purple-400">{formatPercent(data?.metrics?.avgClickRate || 0)}</div>
          <div className="text-xs text-slate-500 mt-1">Industry avg: ~2.5%</div>
        </div>
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-red-300">Avg. Bounce Rate</div>
            <i className="fas fa-exclamation-triangle text-red-400"></i>
          </div>
          <div className="text-3xl font-bold text-red-400">{formatPercent(data?.metrics?.avgBounceRate || 0)}</div>
          <div className="text-xs text-slate-500 mt-1">Target: &lt;2%</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-700">
        {(['overview', 'campaigns', 'flows', 'lists', 'segments'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-2 gap-6">
          {/* Recent Campaigns */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-700 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Recent Campaigns</h2>
                <p className="text-sm text-slate-400">{data?.campaigns?.length || 0} campaigns</p>
              </div>
              <button
                onClick={() => setActiveTab('campaigns')}
                className="text-emerald-400 hover:text-emerald-300 text-sm"
              >
                View All
              </button>
            </div>
            <div className="divide-y divide-slate-700/50 max-h-80 overflow-y-auto">
              {data?.campaigns?.slice(0, 5).map((campaign) => (
                <div key={campaign.id} className="p-4 hover:bg-slate-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-white font-medium truncate max-w-[70%]">{campaign.name}</div>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </div>
                  {campaign.status?.toLowerCase() === 'sent' && campaign.recipients > 0 && (
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span>{formatNumber(campaign.recipients)} sent</span>
                      <span>{formatPercent(campaign.openRate)} opened</span>
                      <span>{formatPercent(campaign.clickRate)} clicked</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Active Flows */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-700 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Automated Flows</h2>
                <p className="text-sm text-slate-400">{data?.metrics?.activeFlows || 0} active</p>
              </div>
              <button
                onClick={() => setActiveTab('flows')}
                className="text-emerald-400 hover:text-emerald-300 text-sm"
              >
                View All
              </button>
            </div>
            <div className="divide-y divide-slate-700/50 max-h-80 overflow-y-auto">
              {data?.flows?.filter(f => f.status === 'live' || f.status === 'manual').slice(0, 8).map((flow) => (
                <div key={flow.id} className="p-4 hover:bg-slate-800/50 flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">{flow.name}</div>
                    <div className="text-xs text-slate-500">{flow.triggerType} - {flow.messageCount} messages</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(flow.status)}`}>
                    {flow.status}
                  </span>
                </div>
              ))}
              {(!data?.flows || data.flows.filter(f => f.status === 'live' || f.status === 'manual').length === 0) && (
                <div className="p-8 text-center text-slate-500">No active flows</div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'campaigns' && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">All Campaigns</h2>
              <p className="text-sm text-slate-400">Email campaign performance</p>
            </div>
            <button
              onClick={() => window.open('https://www.klaviyo.com/campaigns', '_blank')}
              className="text-emerald-400 hover:text-emerald-300 text-sm"
            >
              Manage in Klaviyo
            </button>
          </div>

          {data?.campaigns && data.campaigns.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Campaign</th>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Status</th>
                    <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Sent</th>
                    <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Delivered</th>
                    <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Opens</th>
                    <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Open Rate</th>
                    <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Clicks</th>
                    <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Click Rate</th>
                    <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Bounced</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {data.campaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-slate-800/50">
                      <td className="px-4 py-3">
                        <div className="text-white font-medium">{campaign.name}</div>
                        <div className="text-xs text-slate-500 truncate max-w-xs">{campaign.subject || '-'}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(campaign.status)}`}>
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-slate-300">
                        {campaign.recipients > 0 ? formatNumber(campaign.recipients) : '-'}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-300">
                        {campaign.delivered > 0 ? formatNumber(campaign.delivered) : '-'}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-300">
                        {campaign.uniqueOpens > 0 ? formatNumber(campaign.uniqueOpens) : '-'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {campaign.openRate > 0 ? (
                          <span className={campaign.openRate > 0.2 ? 'text-emerald-400' : 'text-slate-300'}>
                            {formatPercent(campaign.openRate)}
                          </span>
                        ) : '-'}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-300">
                        {campaign.uniqueClicks > 0 ? formatNumber(campaign.uniqueClicks) : '-'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {campaign.clickRate > 0 ? (
                          <span className={campaign.clickRate > 0.025 ? 'text-emerald-400' : 'text-slate-300'}>
                            {formatPercent(campaign.clickRate)}
                          </span>
                        ) : '-'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {campaign.bounced > 0 ? (
                          <span className="text-red-400">{formatNumber(campaign.bounced)}</span>
                        ) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-slate-700/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-envelope text-slate-500 text-2xl"></i>
              </div>
              <div className="text-slate-400">No campaigns found</div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'flows' && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Automated Flows</h2>
              <p className="text-sm text-slate-400">{data?.metrics?.activeFlows || 0} active, {data?.metrics?.draftFlows || 0} draft</p>
            </div>
            <button
              onClick={() => window.open('https://www.klaviyo.com/flows', '_blank')}
              className="text-emerald-400 hover:text-emerald-300 text-sm"
            >
              Manage in Klaviyo
            </button>
          </div>

          {data?.flows && data.flows.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Flow Name</th>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Status</th>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Trigger</th>
                    <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Actions</th>
                    <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Messages</th>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {data.flows.map((flow) => (
                    <tr key={flow.id} className="hover:bg-slate-800/50">
                      <td className="px-4 py-3">
                        <div className="text-white font-medium">{flow.name}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(flow.status)}`}>
                          {flow.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-sm">
                        {flow.triggerType || '-'}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-300">
                        {flow.actionCount}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-300">
                        {flow.messageCount}
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-sm">
                        {flow.updatedAt ? new Date(flow.updatedAt).toLocaleDateString() : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-slate-700/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-robot text-slate-500 text-2xl"></i>
              </div>
              <div className="text-slate-400">No flows found</div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'lists' && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Email Lists</h2>
              <p className="text-sm text-slate-400">{data?.lists?.length || 0} lists</p>
            </div>
            <button
              onClick={() => window.open('https://www.klaviyo.com/lists', '_blank')}
              className="text-emerald-400 hover:text-emerald-300 text-sm"
            >
              Manage in Klaviyo
            </button>
          </div>

          {data?.lists && data.lists.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">List Name</th>
                    <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Profiles</th>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Opt-in Process</th>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {data.lists.map((list) => (
                    <tr key={list.id} className="hover:bg-slate-800/50">
                      <td className="px-4 py-3">
                        <div className="text-white font-medium">{list.name}</div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-emerald-400 font-medium">{formatNumber(list.profileCount)}</span>
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-sm">
                        {list.optInProcess || 'Single opt-in'}
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-sm">
                        {list.createdAt ? new Date(list.createdAt).toLocaleDateString() : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-slate-700/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-list text-slate-500 text-2xl"></i>
              </div>
              <div className="text-slate-400">No lists found</div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'segments' && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Segments</h2>
              <p className="text-sm text-slate-400">{data?.segments?.length || 0} segments</p>
            </div>
            <button
              onClick={() => window.open('https://www.klaviyo.com/segments', '_blank')}
              className="text-emerald-400 hover:text-emerald-300 text-sm"
            >
              Manage in Klaviyo
            </button>
          </div>

          {data?.segments && data.segments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Segment Name</th>
                    <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Profiles</th>
                    <th className="text-center text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Starred</th>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {data.segments.map((segment) => (
                    <tr key={segment.id} className="hover:bg-slate-800/50">
                      <td className="px-4 py-3">
                        <div className="text-white font-medium">{segment.name}</div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-emerald-400 font-medium">{formatNumber(segment.profileCount)}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {segment.isStarred ? (
                          <i className="fas fa-star text-amber-400"></i>
                        ) : (
                          <i className="far fa-star text-slate-600"></i>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-sm">
                        {segment.updatedAt ? new Date(segment.updatedAt).toLocaleDateString() : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-slate-700/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-filter text-slate-500 text-2xl"></i>
              </div>
              <div className="text-slate-400">No segments found</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
