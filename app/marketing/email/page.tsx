'use client';

import { useState } from 'react';
import Link from 'next/link';

const emailMetrics = {
  platform: 'Klaviyo',
  subscribers: 12450,
  listGrowth: 245,
  openRate: 42.5,
  clickRate: 3.8,
  unsubscribeRate: 0.2,
  revenue: 8900.00,
  revenuePerRecipient: 0.72,
};

const recentCampaigns = [
  {
    id: '1',
    name: 'Holiday Sale Announcement',
    sentDate: '2024-12-20',
    recipients: 12100,
    openRate: 48.2,
    clickRate: 5.2,
    revenue: 3200.00,
    status: 'sent'
  },
  {
    id: '2',
    name: 'New Product Launch',
    sentDate: '2024-12-15',
    recipients: 11800,
    openRate: 44.5,
    clickRate: 4.8,
    revenue: 2800.00,
    status: 'sent'
  },
  {
    id: '3',
    name: 'Weekly Newsletter',
    sentDate: '2024-12-18',
    recipients: 12000,
    openRate: 38.2,
    clickRate: 2.9,
    revenue: 1450.00,
    status: 'sent'
  },
  {
    id: '4',
    name: 'Flash Sale - 24hr Only',
    sentDate: '2024-12-10',
    recipients: 11500,
    openRate: 52.1,
    clickRate: 6.8,
    revenue: 4200.00,
    status: 'sent'
  },
];

const automatedFlows = [
  { name: 'Welcome Series', active: true, revenue: 1200.00, sent: 890, openRate: 65.2 },
  { name: 'Abandoned Cart', active: true, revenue: 2100.00, sent: 1245, openRate: 48.5 },
  { name: 'Post-Purchase', active: true, revenue: 650.00, sent: 567, openRate: 52.8 },
  { name: 'Win-Back', active: true, revenue: 420.00, sent: 234, openRate: 28.4 },
  { name: 'Browse Abandonment', active: false, revenue: 0, sent: 0, openRate: 0 },
  { name: 'VIP Rewards', active: true, revenue: 380.00, sent: 156, openRate: 58.2 },
];

export default function EmailMarketingPage() {
  const [dateRange, setDateRange] = useState('30d');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

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
              <p className="text-sm text-slate-400">Powered by {emailMetrics.platform}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-lg">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-400 text-sm">Connected</span>
            </div>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-sm">
              <i className="fas fa-external-link-alt mr-2"></i>
              Open Klaviyo
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-6 gap-4">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Subscribers</div>
          <div className="text-2xl font-bold text-white">{emailMetrics.subscribers.toLocaleString()}</div>
          <div className="text-xs text-emerald-400">+{emailMetrics.listGrowth} this month</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-emerald-500/30 rounded-xl p-4 bg-emerald-500/5">
          <div className="text-sm text-slate-400 mb-1">Email Revenue</div>
          <div className="text-2xl font-bold text-emerald-400">{formatCurrency(emailMetrics.revenue)}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Open Rate</div>
          <div className="text-2xl font-bold text-white">{emailMetrics.openRate}%</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Click Rate</div>
          <div className="text-2xl font-bold text-white">{emailMetrics.clickRate}%</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Rev/Recipient</div>
          <div className="text-2xl font-bold text-white">{formatCurrency(emailMetrics.revenuePerRecipient)}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Unsubscribe</div>
          <div className="text-2xl font-bold text-white">{emailMetrics.unsubscribeRate}%</div>
        </div>
      </div>

      {/* Recent Campaigns */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Recent Campaigns</h2>
            <p className="text-sm text-slate-400">{recentCampaigns.length} campaigns this month</p>
          </div>
          <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm transition-colors">
            <i className="fas fa-plus mr-2"></i>
            Create Campaign
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700 text-left">
              <th className="p-4 text-slate-400 font-medium">Campaign</th>
              <th className="p-4 text-slate-400 font-medium">Sent</th>
              <th className="p-4 text-slate-400 font-medium text-right">Recipients</th>
              <th className="p-4 text-slate-400 font-medium text-right">Open Rate</th>
              <th className="p-4 text-slate-400 font-medium text-right">Click Rate</th>
              <th className="p-4 text-slate-400 font-medium text-right">Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {recentCampaigns.map(campaign => (
              <tr key={campaign.id} className="hover:bg-slate-800/30">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <i className="fas fa-envelope text-emerald-400 text-sm"></i>
                    </div>
                    <span className="text-white">{campaign.name}</span>
                  </div>
                </td>
                <td className="p-4 text-slate-400">{campaign.sentDate}</td>
                <td className="p-4 text-right text-white">{campaign.recipients.toLocaleString()}</td>
                <td className="p-4 text-right">
                  <span className={`${campaign.openRate >= 40 ? 'text-emerald-400' : 'text-white'}`}>
                    {campaign.openRate}%
                  </span>
                </td>
                <td className="p-4 text-right">
                  <span className={`${campaign.clickRate >= 4 ? 'text-emerald-400' : 'text-white'}`}>
                    {campaign.clickRate}%
                  </span>
                </td>
                <td className="p-4 text-right text-emerald-400 font-medium">{formatCurrency(campaign.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Two Column: Flows & List Health */}
      <div className="grid grid-cols-2 gap-6">
        {/* Automated Flows */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-lg font-semibold text-white">Automated Flows</h2>
            <p className="text-sm text-slate-400">Always-on email sequences</p>
          </div>
          <div className="divide-y divide-slate-700/50">
            {automatedFlows.map(flow => (
              <div key={flow.name} className="p-4 hover:bg-slate-800/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${flow.active ? 'bg-emerald-400' : 'bg-slate-500'}`}></div>
                  <div>
                    <div className="text-white">{flow.name}</div>
                    <div className="text-xs text-slate-400">
                      {flow.active ? `${flow.sent} sent • ${flow.openRate}% open rate` : 'Inactive'}
                    </div>
                  </div>
                </div>
                <div className="text-emerald-400 font-medium">{formatCurrency(flow.revenue)}</div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-slate-700 bg-slate-800/30">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Total Flow Revenue</span>
              <span className="text-lg font-bold text-emerald-400">
                {formatCurrency(automatedFlows.reduce((sum, f) => sum + f.revenue, 0))}
              </span>
            </div>
          </div>
        </div>

        {/* List Health & Segments */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-lg font-semibold text-white">List Health</h2>
            <p className="text-sm text-slate-400">Subscriber engagement breakdown</p>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-400">Highly Engaged</span>
                <span className="text-emerald-400">4,980 (40%)</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-400">Engaged</span>
                <span className="text-blue-400">3,735 (30%)</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-400">Semi-Engaged</span>
                <span className="text-amber-400">2,490 (20%)</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-400">At Risk</span>
                <span className="text-red-400">1,245 (10%)</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-700">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <div className="text-xs text-slate-400">30-Day Growth</div>
                <div className="text-lg font-bold text-emerald-400">+245</div>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <div className="text-xs text-slate-400">Bounce Rate</div>
                <div className="text-lg font-bold text-white">0.8%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Tips */}
      <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
        <div className="flex items-start gap-3">
          <i className="fas fa-lightbulb text-emerald-400 mt-0.5"></i>
          <div>
            <div className="text-sm font-medium text-white">Email Marketing Best Practices</div>
            <div className="text-xs text-slate-400 mt-1">
              Industry benchmark open rates are 15-25%. Your {emailMetrics.openRate}% open rate is excellent! Continue segmenting your list and personalizing content to maintain high engagement.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
