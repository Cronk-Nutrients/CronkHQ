'use client';

import { useState } from 'react';
import Link from 'next/link';

const marketingMetrics = {
  totalAdSpend: 9950.00,
  totalRevenue: 47590.00,
  blendedROAS: 4.78,
  newCustomers: 342,
  cac: 29.09,
  ltv: 185.00,
  ltvCacRatio: 6.36,
  conversionRate: 3.2,
};

const channelPerformance = [
  { channel: 'Google Ads', spend: 2500.00, revenue: 12500.00, roas: 5.00, conversions: 125, cpa: 20.00, impressions: 450000, clicks: 8500 },
  { channel: 'Meta Ads', spend: 3800.00, revenue: 19200.00, roas: 5.05, conversions: 192, cpa: 19.79, impressions: 650000, clicks: 12000 },
  { channel: 'Amazon Ads', spend: 2800.00, revenue: 14500.00, roas: 5.18, conversions: 145, cpa: 19.31, impressions: 380000, clicks: 9500 },
  { channel: 'TikTok Ads', spend: 1350.00, revenue: 5690.00, roas: 4.21, conversions: 51, cpa: 26.47, impressions: 890000, clicks: 15000 },
  { channel: 'Email', spend: 500.00, revenue: 8900.00, roas: 17.80, conversions: 89, cpa: 5.62, impressions: 125000, clicks: 4500 },
];

const campaignBreakdown = [
  { name: 'Prospecting - Broad', platform: 'Meta', spend: 1500.00, revenue: 7200.00, roas: 4.80, status: 'active' },
  { name: 'Retargeting - Website', platform: 'Meta', spend: 800.00, revenue: 5600.00, roas: 7.00, status: 'active' },
  { name: 'SP - CalMag Plus', platform: 'Amazon', spend: 850.00, revenue: 5200.00, roas: 6.12, status: 'active' },
  { name: 'Brand Search', platform: 'Google', spend: 420.00, revenue: 3800.00, roas: 9.05, status: 'active' },
  { name: 'Product Showcase', platform: 'TikTok', spend: 520.00, revenue: 2400.00, roas: 4.62, status: 'active' },
  { name: 'Welcome Series', platform: 'Email', spend: 50.00, revenue: 1200.00, roas: 24.00, status: 'active' },
];

const attributionData = {
  firstTouch: [
    { channel: 'Paid Search', percentage: 32 },
    { channel: 'Paid Social', percentage: 28 },
    { channel: 'Organic Search', percentage: 18 },
    { channel: 'Direct', percentage: 12 },
    { channel: 'Email', percentage: 10 },
  ],
  lastTouch: [
    { channel: 'Paid Search', percentage: 28 },
    { channel: 'Paid Social', percentage: 24 },
    { channel: 'Direct', percentage: 22 },
    { channel: 'Email', percentage: 16 },
    { channel: 'Organic Search', percentage: 10 },
  ],
};

export default function MarketingReportsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [activeTab, setActiveTab] = useState<'overview' | 'channels' | 'campaigns' | 'attribution' | 'cohort'>('overview');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const handleExport = (format: 'csv' | 'xlsx' | 'pdf') => {
    alert(`Exporting Marketing Report as ${format.toUpperCase()}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
          <Link href="/reports" className="hover:text-white">Reports</Link>
          <i className="fas fa-chevron-right text-xs"></i>
          <span className="text-white">Marketing Reports</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center">
              <i className="fas fa-bullhorn text-pink-400 text-xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Marketing Reports</h1>
              <p className="text-slate-400">Ad performance, ROAS, attribution, and campaigns</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="ytd">Year to Date</option>
            </select>
            <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-lg p-1">
              <button onClick={() => handleExport('csv')} className="px-3 py-1.5 hover:bg-slate-700 text-slate-300 rounded text-sm">CSV</button>
              <button onClick={() => handleExport('xlsx')} className="px-3 py-1.5 hover:bg-slate-700 text-slate-300 rounded text-sm">Excel</button>
              <button onClick={() => handleExport('pdf')} className="px-3 py-1.5 hover:bg-slate-700 text-slate-300 rounded text-sm">PDF</button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-700 pb-4">
        {[
          { id: 'overview', label: 'Overview', icon: 'fa-chart-pie' },
          { id: 'channels', label: 'By Channel', icon: 'fa-layer-group' },
          { id: 'campaigns', label: 'Campaigns', icon: 'fa-bullseye' },
          { id: 'attribution', label: 'Attribution', icon: 'fa-code-branch' },
          { id: 'cohort', label: 'Cohort', icon: 'fa-users' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
              activeTab === tab.id
                ? 'bg-pink-500/20 text-pink-400 border border-pink-500/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <i className={`fas ${tab.icon}`}></i>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="text-sm text-slate-400 mb-1">Total Ad Spend</div>
              <div className="text-2xl font-bold text-white">{formatCurrency(marketingMetrics.totalAdSpend)}</div>
              <div className="text-xs text-slate-400 mt-1">Across all channels</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="text-sm text-slate-400 mb-1">Ad Revenue</div>
              <div className="text-2xl font-bold text-emerald-400">{formatCurrency(marketingMetrics.totalRevenue)}</div>
              <div className="text-xs text-slate-400 mt-1">Attributed sales</div>
            </div>
            <div className="bg-pink-500/10 backdrop-blur border border-pink-500/30 rounded-xl p-5">
              <div className="text-sm text-slate-400 mb-1">Blended ROAS</div>
              <div className="text-2xl font-bold text-pink-400">{marketingMetrics.blendedROAS.toFixed(2)}x</div>
              <div className="text-xs text-slate-400 mt-1">Return on ad spend</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="text-sm text-slate-400 mb-1">New Customers</div>
              <div className="text-2xl font-bold text-white">{marketingMetrics.newCustomers}</div>
              <div className="text-xs text-slate-400 mt-1">This period</div>
            </div>
          </div>

          {/* Customer Metrics */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
              <div className="text-sm text-slate-400 mb-1">CAC</div>
              <div className="text-xl font-bold text-white">{formatCurrency(marketingMetrics.cac)}</div>
              <div className="text-xs text-slate-400">Cost per acquisition</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
              <div className="text-sm text-slate-400 mb-1">LTV</div>
              <div className="text-xl font-bold text-white">{formatCurrency(marketingMetrics.ltv)}</div>
              <div className="text-xs text-slate-400">Lifetime value</div>
            </div>
            <div className="bg-emerald-500/10 backdrop-blur border border-emerald-500/30 rounded-xl p-4">
              <div className="text-sm text-slate-400 mb-1">LTV:CAC Ratio</div>
              <div className="text-xl font-bold text-emerald-400">{marketingMetrics.ltvCacRatio.toFixed(2)}x</div>
              <div className="text-xs text-slate-400">Target: 3x+</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
              <div className="text-sm text-slate-400 mb-1">Conversion Rate</div>
              <div className="text-xl font-bold text-white">{marketingMetrics.conversionRate}%</div>
              <div className="text-xs text-slate-400">Click to purchase</div>
            </div>
          </div>

          {/* Channel Summary */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
            <h3 className="text-white font-semibold mb-4">Channel Performance Summary</h3>
            <div className="grid grid-cols-5 gap-4">
              {channelPerformance.map(channel => (
                <div key={channel.channel} className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                    channel.channel === 'Google Ads' ? 'bg-blue-500/20 text-blue-400' :
                    channel.channel === 'Meta Ads' ? 'bg-indigo-500/20 text-indigo-400' :
                    channel.channel === 'Amazon Ads' ? 'bg-orange-500/20 text-orange-400' :
                    channel.channel === 'TikTok Ads' ? 'bg-pink-500/20 text-pink-400' :
                    'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    <i className={`${
                      channel.channel === 'Google Ads' ? 'fab fa-google' :
                      channel.channel === 'Meta Ads' ? 'fab fa-meta' :
                      channel.channel === 'Amazon Ads' ? 'fab fa-amazon' :
                      channel.channel === 'TikTok Ads' ? 'fab fa-tiktok' :
                      'fas fa-envelope'
                    }`}></i>
                  </div>
                  <div className="text-xs text-slate-400">{channel.channel}</div>
                  <div className="text-lg font-bold text-white">{channel.roas.toFixed(2)}x</div>
                  <div className="text-xs text-slate-500">ROAS</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Channels Tab */}
      {activeTab === 'channels' && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 text-left">
                <th className="p-4 text-slate-400 font-medium">Channel</th>
                <th className="p-4 text-slate-400 font-medium text-right">Spend</th>
                <th className="p-4 text-slate-400 font-medium text-right">Revenue</th>
                <th className="p-4 text-slate-400 font-medium text-right">ROAS</th>
                <th className="p-4 text-slate-400 font-medium text-right">Conversions</th>
                <th className="p-4 text-slate-400 font-medium text-right">CPA</th>
                <th className="p-4 text-slate-400 font-medium text-right">Impressions</th>
                <th className="p-4 text-slate-400 font-medium text-right">Clicks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {channelPerformance.map(channel => (
                <tr key={channel.channel} className="hover:bg-slate-800/30">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        channel.channel === 'Google Ads' ? 'bg-blue-500/20 text-blue-400' :
                        channel.channel === 'Meta Ads' ? 'bg-indigo-500/20 text-indigo-400' :
                        channel.channel === 'Amazon Ads' ? 'bg-orange-500/20 text-orange-400' :
                        channel.channel === 'TikTok Ads' ? 'bg-pink-500/20 text-pink-400' :
                        'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        <i className={`text-sm ${
                          channel.channel === 'Google Ads' ? 'fab fa-google' :
                          channel.channel === 'Meta Ads' ? 'fab fa-meta' :
                          channel.channel === 'Amazon Ads' ? 'fab fa-amazon' :
                          channel.channel === 'TikTok Ads' ? 'fab fa-tiktok' :
                          'fas fa-envelope'
                        }`}></i>
                      </div>
                      <span className="text-white font-medium">{channel.channel}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right text-white">{formatCurrency(channel.spend)}</td>
                  <td className="p-4 text-right text-emerald-400">{formatCurrency(channel.revenue)}</td>
                  <td className="p-4 text-right">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      channel.roas >= 5 ? 'bg-emerald-500/20 text-emerald-400' :
                      channel.roas >= 3 ? 'bg-amber-500/20 text-amber-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {channel.roas.toFixed(2)}x
                    </span>
                  </td>
                  <td className="p-4 text-right text-white">{channel.conversions}</td>
                  <td className="p-4 text-right text-slate-300">{formatCurrency(channel.cpa)}</td>
                  <td className="p-4 text-right text-slate-300">{channel.impressions.toLocaleString()}</td>
                  <td className="p-4 text-right text-slate-300">{channel.clicks.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t border-slate-700 bg-slate-800/50">
              <tr>
                <td className="p-4 text-white font-semibold">Total</td>
                <td className="p-4 text-right text-white font-semibold">{formatCurrency(channelPerformance.reduce((sum, c) => sum + c.spend, 0))}</td>
                <td className="p-4 text-right text-emerald-400 font-semibold">{formatCurrency(channelPerformance.reduce((sum, c) => sum + c.revenue, 0))}</td>
                <td className="p-4 text-right text-white font-semibold">{marketingMetrics.blendedROAS.toFixed(2)}x</td>
                <td className="p-4 text-right text-white font-semibold">{channelPerformance.reduce((sum, c) => sum + c.conversions, 0)}</td>
                <td className="p-4"></td>
                <td className="p-4 text-right text-slate-300">{channelPerformance.reduce((sum, c) => sum + c.impressions, 0).toLocaleString()}</td>
                <td className="p-4 text-right text-slate-300">{channelPerformance.reduce((sum, c) => sum + c.clicks, 0).toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h3 className="text-white font-semibold">Top Campaigns</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 text-left">
                <th className="p-4 text-slate-400 font-medium">Campaign</th>
                <th className="p-4 text-slate-400 font-medium">Platform</th>
                <th className="p-4 text-slate-400 font-medium text-right">Spend</th>
                <th className="p-4 text-slate-400 font-medium text-right">Revenue</th>
                <th className="p-4 text-slate-400 font-medium text-right">ROAS</th>
                <th className="p-4 text-slate-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {campaignBreakdown.map(campaign => (
                <tr key={campaign.name} className="hover:bg-slate-800/30">
                  <td className="p-4 text-white font-medium">{campaign.name}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      campaign.platform === 'Meta' ? 'bg-indigo-500/20 text-indigo-400' :
                      campaign.platform === 'Google' ? 'bg-blue-500/20 text-blue-400' :
                      campaign.platform === 'Amazon' ? 'bg-orange-500/20 text-orange-400' :
                      campaign.platform === 'TikTok' ? 'bg-pink-500/20 text-pink-400' :
                      'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {campaign.platform}
                    </span>
                  </td>
                  <td className="p-4 text-right text-white">{formatCurrency(campaign.spend)}</td>
                  <td className="p-4 text-right text-emerald-400">{formatCurrency(campaign.revenue)}</td>
                  <td className="p-4 text-right">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      campaign.roas >= 5 ? 'bg-emerald-500/20 text-emerald-400' :
                      campaign.roas >= 3 ? 'bg-amber-500/20 text-amber-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {campaign.roas.toFixed(2)}x
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="flex items-center gap-1.5 text-emerald-400 text-sm">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Attribution Tab */}
      {activeTab === 'attribution' && (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
            <h3 className="text-white font-semibold mb-4">First Touch Attribution</h3>
            <div className="space-y-4">
              {attributionData.firstTouch.map(item => (
                <div key={item.channel}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-400">{item.channel}</span>
                    <span className="text-white">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-pink-500"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
            <h3 className="text-white font-semibold mb-4">Last Touch Attribution</h3>
            <div className="space-y-4">
              {attributionData.lastTouch.map(item => (
                <div key={item.channel}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-400">{item.channel}</span>
                    <span className="text-white">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-indigo-500"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cohort Tab */}
      {activeTab === 'cohort' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
            <h3 className="text-white font-semibold mb-4">Customer Cohort Analysis</h3>
            <div className="h-64 flex items-center justify-center border border-slate-700 border-dashed rounded-lg">
              <div className="text-center text-slate-400">
                <i className="fas fa-table text-3xl mb-2"></i>
                <p className="text-sm">Cohort retention heatmap visualization</p>
                <p className="text-xs text-slate-500 mt-1">Shows customer retention over time by acquisition month</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
