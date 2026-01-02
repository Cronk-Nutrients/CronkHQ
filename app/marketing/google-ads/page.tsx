'use client';

import { useState } from 'react';
import Link from 'next/link';

// Demo data
const accountInfo = {
  accountName: 'Cronk Nutrients',
  accountId: '123-456-7890',
  status: 'connected',
  lastSync: '5 min ago'
};

const overviewMetrics = {
  spend: 4500.00,
  revenue: 28500.00,
  roas: 6.33,
  orders: 285,
  clicks: 5200,
  impressions: 125000,
  ctr: 4.16,
  cpc: 0.87,
  conversions: 285,
  conversionRate: 5.48,
};

const campaigns = [
  {
    id: '1',
    name: 'Brand - Exact Match',
    status: 'active',
    type: 'Search',
    spend: 1200.00,
    revenue: 9500.00,
    roas: 7.92,
    clicks: 1800,
    impressions: 25000,
    ctr: 7.2,
    conversions: 95
  },
  {
    id: '2',
    name: 'Non-Brand - Plant Nutrients',
    status: 'active',
    type: 'Search',
    spend: 1800.00,
    revenue: 10200.00,
    roas: 5.67,
    clicks: 2100,
    impressions: 45000,
    ctr: 4.67,
    conversions: 102
  },
  {
    id: '3',
    name: 'Shopping - All Products',
    status: 'active',
    type: 'Shopping',
    spend: 900.00,
    revenue: 5800.00,
    roas: 6.44,
    clicks: 850,
    impressions: 35000,
    ctr: 2.43,
    conversions: 58
  },
  {
    id: '4',
    name: 'Performance Max',
    status: 'active',
    type: 'PMax',
    spend: 600.00,
    revenue: 3000.00,
    roas: 5.00,
    clicks: 450,
    impressions: 20000,
    ctr: 2.25,
    conversions: 30
  },
];

export default function GoogleAdsPage() {
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
          <span className="text-white">Google Ads</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#4285f4] rounded-xl flex items-center justify-center">
              <i className="fab fa-google text-white text-2xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Google Ads</h1>
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
          <div className="text-sm text-slate-400 mb-1">Orders</div>
          <div className="text-2xl font-bold text-white">{overviewMetrics.orders}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Conv. Rate</div>
          <div className="text-2xl font-bold text-white">{overviewMetrics.conversionRate.toFixed(2)}%</div>
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
          <div className="text-sm text-slate-400 mb-1">Avg. CPC</div>
          <div className="text-lg font-bold text-white">{formatCurrency(overviewMetrics.cpc)}</div>
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
            Open in Google Ads
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700 text-left">
              <th className="p-4 text-slate-400 font-medium">Campaign</th>
              <th className="p-4 text-slate-400 font-medium">Type</th>
              <th className="p-4 text-slate-400 font-medium text-right">Spend</th>
              <th className="p-4 text-slate-400 font-medium text-right">Revenue</th>
              <th className="p-4 text-slate-400 font-medium text-right">ROAS</th>
              <th className="p-4 text-slate-400 font-medium text-right">Conversions</th>
              <th className="p-4 text-slate-400 font-medium text-right">CTR</th>
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
                    {campaign.type}
                  </span>
                </td>
                <td className="p-4 text-right text-white">{formatCurrency(campaign.spend)}</td>
                <td className="p-4 text-right text-emerald-400">{formatCurrency(campaign.revenue)}</td>
                <td className="p-4 text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    campaign.roas >= 6 ? 'bg-emerald-500/20 text-emerald-400' :
                    campaign.roas >= 4 ? 'bg-amber-500/20 text-amber-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {campaign.roas.toFixed(2)}x
                  </span>
                </td>
                <td className="p-4 text-right text-white">{campaign.conversions}</td>
                <td className="p-4 text-right text-slate-300">{campaign.ctr.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top Keywords */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-lg font-semibold text-white">Top Keywords</h2>
            <p className="text-sm text-slate-400">By conversion value</p>
          </div>
          <div className="divide-y divide-slate-700/50">
            {[
              { keyword: 'cronk nutrients', revenue: 4200, roas: 12.5 },
              { keyword: 'plant nutrients', revenue: 2800, roas: 4.2 },
              { keyword: 'hydroponic fertilizer', revenue: 1900, roas: 5.8 },
              { keyword: 'grow nutrients', revenue: 1400, roas: 3.9 },
              { keyword: 'cal mag supplement', revenue: 1100, roas: 4.5 },
            ].map((item, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-800/30">
                <div>
                  <div className="text-white">{item.keyword}</div>
                  <div className="text-xs text-slate-400">ROAS: {item.roas}x</div>
                </div>
                <div className="text-emerald-400 font-medium">{formatCurrency(item.revenue)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-lg font-semibold text-white">Top Products</h2>
            <p className="text-sm text-slate-400">Shopping campaign performance</p>
          </div>
          <div className="divide-y divide-slate-700/50">
            {[
              { product: 'CalMag Plus 1L', revenue: 2100, conversions: 42 },
              { product: 'Bloom Booster 500ml', revenue: 1800, conversions: 36 },
              { product: 'Grow Formula 1L', revenue: 1500, conversions: 30 },
              { product: 'Root Enhancer 250ml', revenue: 900, conversions: 22 },
              { product: 'Micro Nutrients 500ml', revenue: 750, conversions: 15 },
            ].map((item, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-800/30">
                <div>
                  <div className="text-white">{item.product}</div>
                  <div className="text-xs text-slate-400">{item.conversions} conversions</div>
                </div>
                <div className="text-emerald-400 font-medium">{formatCurrency(item.revenue)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
