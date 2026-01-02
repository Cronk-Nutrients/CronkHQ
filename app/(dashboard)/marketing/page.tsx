'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MetricsGrid, SecondaryMetricsGrid, CampaignTable, RoasBadge, CurrencyCell, TipBox } from '@/components/marketing';
import { marketingMetrics, channelBreakdown, emailMetricsSummary, dateRangeOptions, getChannelLink } from '@/data/marketing';
import { formatCurrency } from '@/lib/formatting';

export default function MarketingDashboardPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [compareEnabled, setCompareEnabled] = useState(false);

  const primaryMetrics = [
    { label: 'Total Spend', value: marketingMetrics.totalSpend, format: 'currency' as const, trend: '+12.5% vs last period' },
    { label: 'Revenue', value: marketingMetrics.totalRevenue, format: 'currency' as const, trend: '+18.3% vs last period' },
    { label: 'ROAS', value: marketingMetrics.roas, format: 'multiplier' as const, highlight: true, highlightColor: 'emerald' as const, trend: '+0.3x vs last period' },
    { label: 'CAC', value: marketingMetrics.cac, format: 'currency' as const, trend: '-$2.30 vs last period' },
    { label: 'LTV', value: marketingMetrics.ltv, format: 'currency' as const, trend: '+$12 vs last period' },
    { label: 'LTV:CAC', value: marketingMetrics.ltvCacRatio, format: 'multiplier' as const, highlight: true, highlightColor: 'amber' as const },
  ];

  const secondaryMetrics = [
    { label: 'Orders from Ads', value: marketingMetrics.orders, format: 'number' as const },
    { label: 'New Customers', value: marketingMetrics.newCustomers, format: 'number' as const },
    { label: 'Conversion Rate', value: marketingMetrics.conversionRate, format: 'percent' as const },
    { label: 'Avg. CPC', value: marketingMetrics.cpc, format: 'currency' as const },
  ];

  const channelColumns = [
    {
      key: 'channel',
      header: 'Channel',
      render: (_: unknown, row: typeof channelBreakdown[0]) => (
        <Link href={getChannelLink(row.id)} className="flex items-center gap-3 hover:text-emerald-400 transition-colors">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: row.color }}>
            <i className={`${row.iconType} ${row.icon} text-white`}></i>
          </div>
          <div>
            <div className="font-medium text-white">{row.name}</div>
            <div className="text-xs text-slate-400">{row.impressions.toLocaleString()} impressions</div>
          </div>
        </Link>
      ),
    },
    { key: 'spend', header: 'Spend', align: 'right' as const, render: (v: unknown) => <CurrencyCell value={v as number} /> },
    { key: 'revenue', header: 'Revenue', align: 'right' as const, render: (v: unknown) => <CurrencyCell value={v as number} variant="success" /> },
    { key: 'roas', header: 'ROAS', align: 'right' as const, render: (v: unknown) => <RoasBadge roas={v as number} /> },
    { key: 'orders', header: 'Orders', align: 'right' as const, render: (v: unknown) => <span className="text-white">{v as number}</span> },
    { key: 'cac', header: 'CAC', align: 'right' as const, render: (v: unknown) => <CurrencyCell value={v as number} /> },
    { key: 'ctr', header: 'CTR', align: 'right' as const, render: (v: unknown) => <span className="text-slate-300">{(v as number).toFixed(2)}%</span> },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right' as const,
      render: (_: unknown, row: typeof channelBreakdown[0]) => (
        <Link href={getChannelLink(row.id)} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm rounded-lg transition-colors">
          View Details
        </Link>
      ),
    },
  ];

  const totalSpend = channelBreakdown.reduce((sum, c) => sum + c.spend, 0);
  const totalRevenue = channelBreakdown.reduce((sum, c) => sum + c.revenue, 0);
  const totalOrders = channelBreakdown.reduce((sum, c) => sum + c.orders, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Marketing Dashboard</h1>
          <p className="text-slate-400">Track ad performance, ROAS, CAC, and customer lifetime value</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
          >
            {dateRangeOptions.map(range => (
              <option key={range.id} value={range.id}>{range.label}</option>
            ))}
          </select>
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
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-sm transition-colors">
            <i className="fas fa-download mr-2"></i>
            Export
          </button>
        </div>
      </div>

      <MetricsGrid metrics={primaryMetrics} columns={6} />
      <SecondaryMetricsGrid metrics={secondaryMetrics} columns={4} />

      {/* Channel Performance Table */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">Channel Performance</h2>
          <p className="text-sm text-slate-400">Breakdown by advertising platform</p>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700 text-left">
              {channelColumns.map(col => (
                <th key={col.key} className={`p-4 text-slate-400 font-medium ${col.align === 'right' ? 'text-right' : ''}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {channelBreakdown.map(channel => (
              <tr key={channel.id} className="hover:bg-slate-800/30">
                {channelColumns.map(col => (
                  <td key={col.key} className={`p-4 ${col.align === 'right' ? 'text-right' : ''}`}>
                    {col.render
                      ? col.render((channel as Record<string, unknown>)[col.key], channel)
                      : String((channel as Record<string, unknown>)[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-slate-800/50 border-t border-slate-700">
              <td className="p-4 font-medium text-white">Total</td>
              <td className="p-4 text-right font-medium text-white">{formatCurrency(totalSpend)}</td>
              <td className="p-4 text-right font-medium text-emerald-400">{formatCurrency(totalRevenue)}</td>
              <td className="p-4 text-right font-medium text-emerald-400">{(totalRevenue / totalSpend).toFixed(2)}x</td>
              <td className="p-4 text-right font-medium text-white">{totalOrders}</td>
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
              <p className="text-sm text-slate-400">Powered by {emailMetricsSummary.platform}</p>
            </div>
            <Link href="/marketing/email" className="text-emerald-400 hover:text-emerald-300 text-sm">
              View Details →
            </Link>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-sm text-slate-400">Subscribers</div>
                <div className="text-xl font-bold text-white">{emailMetricsSummary.subscribers.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-slate-400">Open Rate</div>
                <div className="text-xl font-bold text-emerald-400">{emailMetricsSummary.openRate}%</div>
              </div>
              <div>
                <div className="text-sm text-slate-400">Click Rate</div>
                <div className="text-xl font-bold text-white">{emailMetricsSummary.clickRate}%</div>
              </div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Email Revenue</span>
                <span className="text-xl font-bold text-emerald-400">{formatCurrency(emailMetricsSummary.revenue)}</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {emailMetricsSummary.campaigns} campaigns • {emailMetricsSummary.flows} automated flows
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
