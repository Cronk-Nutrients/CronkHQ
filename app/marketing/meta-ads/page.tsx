'use client';

import { useState } from 'react';
import Link from 'next/link';

// Demo data
const accountInfo = {
  accountName: 'Cronk Nutrients',
  accountId: 'act_123456789',
  status: 'connected',
  lastSync: '3 min ago'
};

const overviewMetrics = {
  spend: 3800.00,
  revenue: 19200.00,
  roas: 5.05,
  orders: 192,
  clicks: 4100,
  impressions: 98000,
  ctr: 4.18,
  cpc: 0.93,
  reach: 67000,
  frequency: 1.46,
};

const campaigns = [
  {
    id: '1',
    name: 'Prospecting - Broad',
    status: 'active',
    objective: 'Conversions',
    spend: 1500.00,
    revenue: 7200.00,
    roas: 4.80,
    purchases: 72,
    reach: 35000,
  },
  {
    id: '2',
    name: 'Retargeting - Website Visitors',
    status: 'active',
    objective: 'Conversions',
    spend: 800.00,
    revenue: 5600.00,
    roas: 7.00,
    purchases: 56,
    reach: 8000,
  },
  {
    id: '3',
    name: 'Lookalike - Purchasers',
    status: 'active',
    objective: 'Conversions',
    spend: 1000.00,
    revenue: 4200.00,
    roas: 4.20,
    purchases: 42,
    reach: 18000,
  },
  {
    id: '4',
    name: 'DPA - Catalog Sales',
    status: 'active',
    objective: 'Catalog Sales',
    spend: 500.00,
    revenue: 2200.00,
    roas: 4.40,
    purchases: 22,
    reach: 6000,
  },
];

export default function MetaAdsPage() {
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
          <span className="text-white">Meta Ads</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0081fb] rounded-xl flex items-center justify-center">
              <i className="fab fa-meta text-white text-2xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Meta Ads</h1>
              <p className="text-sm text-slate-400">{accountInfo.accountName} • {accountInfo.accountId}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-lg">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-400 text-sm">Connected</span>
              <span className="text-slate-500 text-xs">• Synced {accountInfo.lastSync}</span>
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
              <i className="fas fa-sync-alt mr-2"></i>
              Sync Now
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Spend</div>
          <div className="text-2xl font-bold text-white">{formatCurrency(overviewMetrics.spend)}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Revenue</div>
          <div className="text-2xl font-bold text-emerald-400">{formatCurrency(overviewMetrics.revenue)}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-emerald-500/30 rounded-xl p-4 bg-emerald-500/5">
          <div className="text-sm text-slate-400 mb-1">ROAS</div>
          <div className="text-2xl font-bold text-emerald-400">{overviewMetrics.roas.toFixed(2)}x</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Purchases</div>
          <div className="text-2xl font-bold text-white">{overviewMetrics.orders}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Reach</div>
          <div className="text-2xl font-bold text-white">{(overviewMetrics.reach / 1000).toFixed(1)}K</div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Clicks</div>
          <div className="text-lg font-bold text-white">{overviewMetrics.clicks.toLocaleString()}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Impressions</div>
          <div className="text-lg font-bold text-white">{overviewMetrics.impressions.toLocaleString()}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">CTR</div>
          <div className="text-lg font-bold text-white">{overviewMetrics.ctr.toFixed(2)}%</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Frequency</div>
          <div className="text-lg font-bold text-white">{overviewMetrics.frequency.toFixed(2)}</div>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Campaigns</h2>
            <p className="text-sm text-slate-400">{campaigns.length} active campaigns</p>
          </div>
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-sm">
            <i className="fas fa-external-link-alt mr-2"></i>
            Open in Ads Manager
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700 text-left">
              <th className="p-4 text-slate-400 font-medium">Campaign</th>
              <th className="p-4 text-slate-400 font-medium">Objective</th>
              <th className="p-4 text-slate-400 font-medium text-right">Spend</th>
              <th className="p-4 text-slate-400 font-medium text-right">Revenue</th>
              <th className="p-4 text-slate-400 font-medium text-right">ROAS</th>
              <th className="p-4 text-slate-400 font-medium text-right">Purchases</th>
              <th className="p-4 text-slate-400 font-medium text-right">Reach</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {campaigns.map(campaign => (
              <tr key={campaign.id} className="hover:bg-slate-800/30">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${campaign.status === 'active' ? 'bg-emerald-400' : 'bg-slate-500'}`}></div>
                    <span className="text-white">{campaign.name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded">
                    {campaign.objective}
                  </span>
                </td>
                <td className="p-4 text-right text-white">{formatCurrency(campaign.spend)}</td>
                <td className="p-4 text-right text-emerald-400">{formatCurrency(campaign.revenue)}</td>
                <td className="p-4 text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    campaign.roas >= 5 ? 'bg-emerald-500/20 text-emerald-400' :
                    campaign.roas >= 3 ? 'bg-amber-500/20 text-amber-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {campaign.roas.toFixed(2)}x
                  </span>
                </td>
                <td className="p-4 text-right text-white">{campaign.purchases}</td>
                <td className="p-4 text-right text-slate-300">{(campaign.reach / 1000).toFixed(1)}K</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Audience Insights */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-lg font-semibold text-white">Top Audiences</h2>
            <p className="text-sm text-slate-400">By purchase conversion</p>
          </div>
          <div className="divide-y divide-slate-700/50">
            {[
              { audience: 'Lookalike 1% - Purchasers', purchases: 42, roas: 5.2 },
              { audience: 'Interest - Gardening', purchases: 35, roas: 4.1 },
              { audience: 'Website Visitors 30d', purchases: 28, roas: 7.8 },
              { audience: 'Engaged Shoppers', purchases: 22, roas: 3.9 },
              { audience: 'Cart Abandoners', purchases: 18, roas: 8.2 },
            ].map((item, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-800/30">
                <div>
                  <div className="text-white">{item.audience}</div>
                  <div className="text-xs text-slate-400">ROAS: {item.roas}x</div>
                </div>
                <div className="text-emerald-400 font-medium">{item.purchases} purchases</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-lg font-semibold text-white">Top Creatives</h2>
            <p className="text-sm text-slate-400">By performance</p>
          </div>
          <div className="divide-y divide-slate-700/50">
            {[
              { creative: 'Video - Product Demo', purchases: 48, ctr: 2.8 },
              { creative: 'Carousel - Best Sellers', purchases: 36, ctr: 2.1 },
              { creative: 'Image - Lifestyle Shot', purchases: 29, ctr: 1.9 },
              { creative: 'DPA - Retargeting', purchases: 22, ctr: 3.2 },
              { creative: 'UGC - Customer Review', purchases: 18, ctr: 2.4 },
            ].map((item, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-800/30">
                <div>
                  <div className="text-white">{item.creative}</div>
                  <div className="text-xs text-slate-400">CTR: {item.ctr}%</div>
                </div>
                <div className="text-emerald-400 font-medium">{item.purchases} purchases</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
