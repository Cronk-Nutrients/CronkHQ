'use client';

import { useState } from 'react';
import Link from 'next/link';

// Demo data
const accountInfo = {
  accountName: 'Cronk Nutrients',
  advertiserId: '7123456789012345678',
  status: 'connected',
  lastSync: '12 min ago'
};

const overviewMetrics = {
  spend: 1350.00,
  revenue: 5690.00,
  roas: 4.21,
  orders: 51,
  clicks: 2800,
  impressions: 156000,
  ctr: 1.79,
  cpc: 0.48,
  videoViews: 89000,
  engagementRate: 5.2,
};

const campaigns = [
  {
    id: '1',
    name: 'Product Showcase - CalMag',
    status: 'active',
    objective: 'Conversions',
    spend: 520.00,
    revenue: 2400.00,
    roas: 4.62,
    conversions: 24,
    videoViews: 35000,
  },
  {
    id: '2',
    name: 'UGC - Customer Reviews',
    status: 'active',
    objective: 'Conversions',
    spend: 380.00,
    revenue: 1800.00,
    roas: 4.74,
    conversions: 18,
    videoViews: 28000,
  },
  {
    id: '3',
    name: 'Before/After Results',
    status: 'active',
    objective: 'Conversions',
    spend: 280.00,
    revenue: 990.00,
    roas: 3.54,
    conversions: 6,
    videoViews: 16000,
  },
  {
    id: '4',
    name: 'Spark Ads - Influencer',
    status: 'active',
    objective: 'Traffic',
    spend: 170.00,
    revenue: 500.00,
    roas: 2.94,
    conversions: 3,
    videoViews: 10000,
  },
];

export default function TikTokAdsPage() {
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
          <span className="text-white">TikTok Ads</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center border border-slate-700">
              <i className="fab fa-tiktok text-white text-2xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">TikTok Ads</h1>
              <p className="text-sm text-slate-400">{accountInfo.accountName} • {accountInfo.advertiserId}</p>
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
        <div className="bg-slate-800/50 backdrop-blur border border-amber-500/30 rounded-xl p-4 bg-amber-500/5">
          <div className="text-sm text-slate-400 mb-1">ROAS</div>
          <div className="text-2xl font-bold text-amber-400">{overviewMetrics.roas.toFixed(2)}x</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Conversions</div>
          <div className="text-2xl font-bold text-white">{overviewMetrics.orders}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Video Views</div>
          <div className="text-2xl font-bold text-white">{(overviewMetrics.videoViews / 1000).toFixed(1)}K</div>
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
          <div className="text-sm text-slate-400 mb-1">Engagement Rate</div>
          <div className="text-lg font-bold text-white">{overviewMetrics.engagementRate.toFixed(1)}%</div>
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
            Open in TikTok Ads
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
              <th className="p-4 text-slate-400 font-medium text-right">Conversions</th>
              <th className="p-4 text-slate-400 font-medium text-right">Video Views</th>
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
                    campaign.roas >= 4 ? 'bg-emerald-500/20 text-emerald-400' :
                    campaign.roas >= 3 ? 'bg-amber-500/20 text-amber-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {campaign.roas.toFixed(2)}x
                  </span>
                </td>
                <td className="p-4 text-right text-white">{campaign.conversions}</td>
                <td className="p-4 text-right text-slate-300">{(campaign.videoViews / 1000).toFixed(1)}K</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Creative Performance */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-lg font-semibold text-white">Top Creatives</h2>
            <p className="text-sm text-slate-400">By conversion rate</p>
          </div>
          <div className="divide-y divide-slate-700/50">
            {[
              { creative: 'Product Demo - 15s', views: 35000, cvr: 0.68 },
              { creative: 'UGC Review - Plant Growth', views: 28000, cvr: 0.64 },
              { creative: 'Before/After Comparison', views: 16000, cvr: 0.38 },
              { creative: 'Influencer Unboxing', views: 10000, cvr: 0.30 },
            ].map((item, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-800/30">
                <div>
                  <div className="text-white">{item.creative}</div>
                  <div className="text-xs text-slate-400">{(item.views / 1000).toFixed(1)}K views</div>
                </div>
                <div className="text-emerald-400 font-medium">{item.cvr}% CVR</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-lg font-semibold text-white">Audience Insights</h2>
            <p className="text-sm text-slate-400">Demographics breakdown</p>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-400">Age 18-24</span>
                <span className="text-white">32%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-pink-500 rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-400">Age 25-34</span>
                <span className="text-white">45%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-400">Age 35-44</span>
                <span className="text-white">18%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '18%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-400">Age 45+</span>
                <span className="text-white">5%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TikTok Tips */}
      <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
        <div className="flex items-start gap-3">
          <i className="fab fa-tiktok text-cyan-400 mt-0.5"></i>
          <div>
            <div className="text-sm font-medium text-white">TikTok Creative Best Practices</div>
            <div className="text-xs text-slate-400 mt-1">
              Use vertical video (9:16), hook viewers in the first 3 seconds, leverage trending sounds, and feature authentic UGC content. TikTok rewards native-feeling content over polished ads.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
