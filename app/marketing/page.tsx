'use client';

import { useState } from 'react';
import Link from 'next/link';

// Demo data - will be replaced with real API data
const marketingMetrics = {
  totalSpend: 12450.00,
  totalRevenue: 67890.00,
  roas: 5.45,
  cac: 18.50,
  ltv: 145.00,
  ltvCacRatio: 7.84,
  orders: 673,
  newCustomers: 245,
  returningCustomers: 428,
  conversionRate: 3.2,
  cpm: 12.50,
  cpc: 0.85,
  ctr: 1.47,
};

const channelBreakdown = [
  {
    id: 'google',
    name: 'Google Ads',
    icon: 'fa-google',
    iconType: 'fab',
    color: '#4285f4',
    spend: 4500.00,
    revenue: 28500.00,
    roas: 6.33,
    orders: 285,
    cac: 15.79,
    clicks: 5200,
    impressions: 125000,
    ctr: 4.16,
    status: 'connected'
  },
  {
    id: 'meta',
    name: 'Meta Ads',
    icon: 'fa-meta',
    iconType: 'fab',
    color: '#0081fb',
    spend: 3800.00,
    revenue: 19200.00,
    roas: 5.05,
    orders: 192,
    cac: 19.79,
    clicks: 4100,
    impressions: 98000,
    ctr: 4.18,
    status: 'connected'
  },
  {
    id: 'amazon',
    name: 'Amazon Ads',
    icon: 'fa-amazon',
    iconType: 'fab',
    color: '#ff9900',
    spend: 2800.00,
    revenue: 14500.00,
    roas: 5.18,
    orders: 145,
    cac: 19.31,
    clicks: 3200,
    impressions: 85000,
    ctr: 3.76,
    status: 'connected'
  },
  {
    id: 'tiktok',
    name: 'TikTok Ads',
    icon: 'fa-tiktok',
    iconType: 'fab',
    color: '#000000',
    spend: 1350.00,
    revenue: 5690.00,
    roas: 4.21,
    orders: 51,
    cac: 26.47,
    clicks: 2800,
    impressions: 156000,
    ctr: 1.79,
    status: 'connected'
  },
];

const emailMetrics = {
  platform: 'Klaviyo',
  subscribers: 12450,
  openRate: 42.5,
  clickRate: 3.8,
  revenue: 8900.00,
  campaigns: 12,
  flows: 8,
  status: 'connected'
};

const dateRanges = [
  { id: 'today', label: 'Today' },
  { id: '7d', label: 'Last 7 Days' },
  { id: '30d', label: 'Last 30 Days' },
  { id: '90d', label: 'Last 90 Days' },
  { id: 'mtd', label: 'Month to Date' },
  { id: 'ytd', label: 'Year to Date' },
  { id: 'custom', label: 'Custom Range' },
];

export default function MarketingDashboardPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [compareEnabled, setCompareEnabled] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const getChannelLink = (id: string) => {
    switch (id) {
      case 'google': return '/marketing/google-ads';
      case 'meta': return '/marketing/meta-ads';
      case 'amazon': return '/marketing/amazon-ads';
      case 'tiktok': return '/marketing/tiktok-ads';
      default: return '/marketing';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Marketing Dashboard</h1>
          <p className="text-slate-400">Track ad performance, ROAS, CAC, and customer lifetime value</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Date Range Selector */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
          >
            {dateRanges.map(range => (
              <option key={range.id} value={range.id}>{range.label}</option>
            ))}
          </select>

          {/* Compare Toggle */}
          <button
            onClick={() => setCompareEnabled(!compareEnabled)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              compareEnabled
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
            }`}
          >
            <i className="fas fa-code-compare mr-2"></i>
            Compare
          </button>

          {/* Export */}
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-sm transition-colors">
            <i className="fas fa-download mr-2"></i>
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-6 gap-4">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <i className="fas fa-dollar-sign text-emerald-400"></i>
            <span className="text-xs text-slate-400 uppercase tracking-wider">Total Spend</span>
          </div>
          <div className="text-2xl font-bold text-white">{formatCurrency(marketingMetrics.totalSpend)}</div>
          <div className="text-xs text-emerald-400 mt-1">
            <i className="fas fa-arrow-up mr-1"></i>12.5% vs last period
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <i className="fas fa-chart-line text-blue-400"></i>
            <span className="text-xs text-slate-400 uppercase tracking-wider">Revenue</span>
          </div>
          <div className="text-2xl font-bold text-white">{formatCurrency(marketingMetrics.totalRevenue)}</div>
          <div className="text-xs text-emerald-400 mt-1">
            <i className="fas fa-arrow-up mr-1"></i>18.3% vs last period
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-emerald-500/30 rounded-xl p-4 bg-emerald-500/5">
          <div className="flex items-center gap-2 mb-2">
            <i className="fas fa-bullseye text-emerald-400"></i>
            <span className="text-xs text-slate-400 uppercase tracking-wider">ROAS</span>
          </div>
          <div className="text-2xl font-bold text-emerald-400">{marketingMetrics.roas.toFixed(2)}x</div>
          <div className="text-xs text-emerald-400 mt-1">
            <i className="fas fa-arrow-up mr-1"></i>0.3x vs last period
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <i className="fas fa-user-plus text-purple-400"></i>
            <span className="text-xs text-slate-400 uppercase tracking-wider">CAC</span>
          </div>
          <div className="text-2xl font-bold text-white">{formatCurrency(marketingMetrics.cac)}</div>
          <div className="text-xs text-emerald-400 mt-1">
            <i className="fas fa-arrow-down mr-1"></i>$2.30 vs last period
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <i className="fas fa-heart text-pink-400"></i>
            <span className="text-xs text-slate-400 uppercase tracking-wider">LTV</span>
          </div>
          <div className="text-2xl font-bold text-white">{formatCurrency(marketingMetrics.ltv)}</div>
          <div className="text-xs text-emerald-400 mt-1">
            <i className="fas fa-arrow-up mr-1"></i>$12 vs last period
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-amber-500/30 rounded-xl p-4 bg-amber-500/5">
          <div className="flex items-center gap-2 mb-2">
            <i className="fas fa-scale-balanced text-amber-400"></i>
            <span className="text-xs text-slate-400 uppercase tracking-wider">LTV:CAC</span>
          </div>
          <div className="text-2xl font-bold text-amber-400">{marketingMetrics.ltvCacRatio.toFixed(1)}:1</div>
          <div className="text-xs text-slate-400 mt-1">
            Target: 3:1+
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Orders from Ads</div>
          <div className="text-xl font-bold text-white">{marketingMetrics.orders.toLocaleString()}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">New Customers</div>
          <div className="text-xl font-bold text-white">{marketingMetrics.newCustomers.toLocaleString()}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Conversion Rate</div>
          <div className="text-xl font-bold text-white">{formatPercent(marketingMetrics.conversionRate)}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Avg. CPC</div>
          <div className="text-xl font-bold text-white">{formatCurrency(marketingMetrics.cpc)}</div>
        </div>
      </div>

      {/* Channel Breakdown */}
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
              <th className="p-4 text-slate-400 font-medium text-right">CAC</th>
              <th className="p-4 text-slate-400 font-medium text-right">CTR</th>
              <th className="p-4 text-slate-400 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {channelBreakdown.map(channel => (
              <tr key={channel.id} className="hover:bg-slate-800/30">
                <td className="p-4">
                  <Link
                    href={getChannelLink(channel.id)}
                    className="flex items-center gap-3 hover:text-emerald-400 transition-colors"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: channel.color }}
                    >
                      <i className={`${channel.iconType} ${channel.icon} text-white`}></i>
                    </div>
                    <div>
                      <div className="font-medium text-white">{channel.name}</div>
                      <div className="text-xs text-slate-400">
                        {channel.impressions.toLocaleString()} impressions
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="p-4 text-right text-white">{formatCurrency(channel.spend)}</td>
                <td className="p-4 text-right text-emerald-400 font-medium">{formatCurrency(channel.revenue)}</td>
                <td className="p-4 text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    channel.roas >= 5 ? 'bg-emerald-500/20 text-emerald-400' :
                    channel.roas >= 3 ? 'bg-amber-500/20 text-amber-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {channel.roas.toFixed(2)}x
                  </span>
                </td>
                <td className="p-4 text-right text-white">{channel.orders}</td>
                <td className="p-4 text-right text-white">{formatCurrency(channel.cac)}</td>
                <td className="p-4 text-right text-slate-300">{formatPercent(channel.ctr)}</td>
                <td className="p-4 text-right">
                  <Link
                    href={getChannelLink(channel.id)}
                    className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm rounded-lg transition-colors"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-slate-800/50 border-t border-slate-700">
              <td className="p-4 font-medium text-white">Total</td>
              <td className="p-4 text-right font-medium text-white">
                {formatCurrency(channelBreakdown.reduce((sum, c) => sum + c.spend, 0))}
              </td>
              <td className="p-4 text-right font-medium text-emerald-400">
                {formatCurrency(channelBreakdown.reduce((sum, c) => sum + c.revenue, 0))}
              </td>
              <td className="p-4 text-right font-medium text-emerald-400">
                {(channelBreakdown.reduce((sum, c) => sum + c.revenue, 0) / channelBreakdown.reduce((sum, c) => sum + c.spend, 0)).toFixed(2)}x
              </td>
              <td className="p-4 text-right font-medium text-white">
                {channelBreakdown.reduce((sum, c) => sum + c.orders, 0)}
              </td>
              <td className="p-4 text-right text-slate-400">—</td>
              <td className="p-4 text-right text-slate-400">—</td>
              <td className="p-4"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Two Column: Email Marketing & Quick Insights */}
      <div className="grid grid-cols-2 gap-6">
        {/* Email Marketing */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Email Marketing</h2>
              <p className="text-sm text-slate-400">Powered by {emailMetrics.platform}</p>
            </div>
            <Link
              href="/marketing/email"
              className="text-emerald-400 hover:text-emerald-300 text-sm"
            >
              View Details →
            </Link>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-sm text-slate-400">Subscribers</div>
                <div className="text-xl font-bold text-white">{emailMetrics.subscribers.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-slate-400">Open Rate</div>
                <div className="text-xl font-bold text-emerald-400">{emailMetrics.openRate}%</div>
              </div>
              <div>
                <div className="text-sm text-slate-400">Click Rate</div>
                <div className="text-xl font-bold text-white">{emailMetrics.clickRate}%</div>
              </div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Email Revenue</span>
                <span className="text-xl font-bold text-emerald-400">{formatCurrency(emailMetrics.revenue)}</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {emailMetrics.campaigns} campaigns • {emailMetrics.flows} automated flows
              </div>
            </div>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-lg font-semibold text-white">Quick Insights</h2>
            <p className="text-sm text-slate-400">AI-powered recommendations</p>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-start gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <i className="fas fa-lightbulb text-emerald-400 mt-0.5"></i>
              <div>
                <div className="text-sm text-white">Google Ads performing best</div>
                <div className="text-xs text-slate-400">ROAS of 6.33x is 16% above average. Consider increasing budget.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <i className="fas fa-exclamation-triangle text-amber-400 mt-0.5"></i>
              <div>
                <div className="text-sm text-white">TikTok CAC is high</div>
                <div className="text-xs text-slate-400">CAC of $26.47 is 43% above target. Review audience targeting.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <i className="fas fa-chart-line text-blue-400 mt-0.5"></i>
              <div>
                <div className="text-sm text-white">LTV:CAC ratio is healthy</div>
                <div className="text-xs text-slate-400">7.84:1 ratio indicates strong unit economics. Room for growth.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Connect More Platforms */}
      <div className="p-4 border-2 border-dashed border-slate-700 rounded-xl text-center">
        <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-3">
          <i className="fas fa-plus text-slate-400 text-xl"></i>
        </div>
        <h4 className="font-medium text-white mb-1">Connect More Platforms</h4>
        <p className="text-sm text-slate-400 mb-3">Add more ad platforms and email tools to get a complete picture</p>
        <Link
          href="/settings?tab=integrations"
          className="inline-block px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm rounded-lg transition-colors"
        >
          Manage Integrations
        </Link>
      </div>
    </div>
  );
}
