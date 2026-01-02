'use client';

import { useState } from 'react';
import Link from 'next/link';

// Demo data
const accountInfo = {
  accountName: 'Cronk Nutrients',
  sellerId: 'A1B2C3D4E5F6G7',
  status: 'connected',
  lastSync: '8 min ago'
};

const overviewMetrics = {
  spend: 2800.00,
  revenue: 14500.00,
  roas: 5.18,
  acos: 19.31,
  tacos: 8.2,
  orders: 145,
  clicks: 3200,
  impressions: 85000,
  ctr: 3.76,
  cpc: 0.88,
};

const campaigns = [
  {
    id: '1',
    name: 'SP - CalMag Plus - Exact',
    status: 'active',
    type: 'Sponsored Products',
    spend: 850.00,
    revenue: 5200.00,
    acos: 16.35,
    orders: 52,
    impressions: 22000,
  },
  {
    id: '2',
    name: 'SP - Auto Campaign',
    status: 'active',
    type: 'Sponsored Products',
    spend: 720.00,
    revenue: 3800.00,
    acos: 18.95,
    orders: 38,
    impressions: 28000,
  },
  {
    id: '3',
    name: 'SB - Brand Defense',
    status: 'active',
    type: 'Sponsored Brands',
    spend: 580.00,
    revenue: 3100.00,
    acos: 18.71,
    orders: 31,
    impressions: 18000,
  },
  {
    id: '4',
    name: 'SD - Product Targeting',
    status: 'active',
    type: 'Sponsored Display',
    spend: 650.00,
    revenue: 2400.00,
    acos: 27.08,
    orders: 24,
    impressions: 17000,
  },
];

export default function AmazonAdsPage() {
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
          <span className="text-white">Amazon Ads</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#ff9900] rounded-xl flex items-center justify-center">
              <i className="fab fa-amazon text-white text-2xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Amazon Ads</h1>
              <p className="text-sm text-slate-400">{accountInfo.accountName} • {accountInfo.sellerId}</p>
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
          <div className="text-sm text-slate-400 mb-1">Ad Spend</div>
          <div className="text-2xl font-bold text-white">{formatCurrency(overviewMetrics.spend)}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Ad Revenue</div>
          <div className="text-2xl font-bold text-emerald-400">{formatCurrency(overviewMetrics.revenue)}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-emerald-500/30 rounded-xl p-4 bg-emerald-500/5">
          <div className="text-sm text-slate-400 mb-1">ROAS</div>
          <div className="text-2xl font-bold text-emerald-400">{overviewMetrics.roas.toFixed(2)}x</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-amber-500/30 rounded-xl p-4 bg-amber-500/5">
          <div className="text-sm text-slate-400 mb-1">ACoS</div>
          <div className="text-2xl font-bold text-amber-400">{overviewMetrics.acos.toFixed(2)}%</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">TACoS</div>
          <div className="text-2xl font-bold text-white">{overviewMetrics.tacos.toFixed(2)}%</div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Orders</div>
          <div className="text-lg font-bold text-white">{overviewMetrics.orders}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Clicks</div>
          <div className="text-lg font-bold text-white">{overviewMetrics.clicks.toLocaleString()}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Impressions</div>
          <div className="text-lg font-bold text-white">{overviewMetrics.impressions.toLocaleString()}</div>
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
            Open in Amazon Ads
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700 text-left">
              <th className="p-4 text-slate-400 font-medium">Campaign</th>
              <th className="p-4 text-slate-400 font-medium">Type</th>
              <th className="p-4 text-slate-400 font-medium text-right">Spend</th>
              <th className="p-4 text-slate-400 font-medium text-right">Revenue</th>
              <th className="p-4 text-slate-400 font-medium text-right">ACoS</th>
              <th className="p-4 text-slate-400 font-medium text-right">Orders</th>
              <th className="p-4 text-slate-400 font-medium text-right">Impressions</th>
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
                  <span className={`px-2 py-1 text-xs rounded ${
                    campaign.type === 'Sponsored Products' ? 'bg-blue-500/20 text-blue-400' :
                    campaign.type === 'Sponsored Brands' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-orange-500/20 text-orange-400'
                  }`}>
                    {campaign.type}
                  </span>
                </td>
                <td className="p-4 text-right text-white">{formatCurrency(campaign.spend)}</td>
                <td className="p-4 text-right text-emerald-400">{formatCurrency(campaign.revenue)}</td>
                <td className="p-4 text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    campaign.acos <= 18 ? 'bg-emerald-500/20 text-emerald-400' :
                    campaign.acos <= 25 ? 'bg-amber-500/20 text-amber-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {campaign.acos.toFixed(2)}%
                  </span>
                </td>
                <td className="p-4 text-right text-white">{campaign.orders}</td>
                <td className="p-4 text-right text-slate-300">{campaign.impressions.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top Keywords & Products */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-lg font-semibold text-white">Top Search Terms</h2>
            <p className="text-sm text-slate-400">By revenue</p>
          </div>
          <div className="divide-y divide-slate-700/50">
            {[
              { term: 'cal mag for plants', revenue: 2100, acos: 14.2 },
              { term: 'hydroponic nutrients', revenue: 1800, acos: 18.5 },
              { term: 'plant food indoor', revenue: 1200, acos: 16.8 },
              { term: 'grow fertilizer', revenue: 950, acos: 21.2 },
              { term: 'bloom booster', revenue: 820, acos: 15.4 },
            ].map((item, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-800/30">
                <div>
                  <div className="text-white">{item.term}</div>
                  <div className="text-xs text-slate-400">ACoS: {item.acos}%</div>
                </div>
                <div className="text-emerald-400 font-medium">{formatCurrency(item.revenue)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-lg font-semibold text-white">Top Products</h2>
            <p className="text-sm text-slate-400">By ad-attributed sales</p>
          </div>
          <div className="divide-y divide-slate-700/50">
            {[
              { product: 'CalMag Plus 1L', revenue: 5200, orders: 52 },
              { product: 'Bloom Booster 500ml', revenue: 3800, orders: 38 },
              { product: 'Grow Formula 1L', revenue: 2400, orders: 24 },
              { product: 'Micro Nutrients 500ml', revenue: 1900, orders: 19 },
              { product: 'Root Enhancer 250ml', revenue: 1200, orders: 12 },
            ].map((item, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-800/30">
                <div>
                  <div className="text-white">{item.product}</div>
                  <div className="text-xs text-slate-400">{item.orders} orders</div>
                </div>
                <div className="text-emerald-400 font-medium">{formatCurrency(item.revenue)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ACoS Info */}
      <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
        <div className="flex items-start gap-3">
          <i className="fas fa-info-circle text-amber-400 mt-0.5"></i>
          <div>
            <div className="text-sm font-medium text-white">Understanding Amazon Metrics</div>
            <div className="text-xs text-slate-400 mt-1">
              <strong>ACoS</strong> (Advertising Cost of Sales) = Ad Spend / Ad Revenue. Lower is better. Target &lt;20% for most products.<br/>
              <strong>TACoS</strong> (Total ACoS) = Ad Spend / Total Revenue. Shows advertising efficiency across all sales.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
