'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MetricsGrid, CampaignTable, CurrencyCell, InsightCard, BreakdownCard, TipBox } from '@/components/marketing';
import { emailAccount, emailMetrics, emailRecentCampaigns, emailAutomatedFlows, emailListHealth } from '@/data/marketing';
import { formatCurrency } from '@/lib/formatting';

export default function EmailMarketingPage() {
  const [dateRange, setDateRange] = useState('30d');

  const primaryMetrics = [
    { label: 'Subscribers', value: emailMetrics.subscribers, format: 'number' as const, trend: `+${emailMetrics.listGrowth} this month` },
    { label: 'Email Revenue', value: emailMetrics.revenue, format: 'currency' as const, highlight: true, highlightColor: 'emerald' as const },
    { label: 'Open Rate', value: emailMetrics.openRate, format: 'percent' as const },
    { label: 'Click Rate', value: emailMetrics.clickRate, format: 'percent' as const },
    { label: 'Rev/Recipient', value: emailMetrics.revenuePerRecipient, format: 'currency' as const },
    { label: 'Unsubscribe', value: emailMetrics.unsubscribeRate, format: 'percent' as const },
  ];

  const campaignColumns = [
    { key: 'name', header: 'Campaign', render: (v: unknown) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
          <i className="fas fa-envelope text-emerald-400 text-sm"></i>
        </div>
        <span className="text-white">{v as string}</span>
      </div>
    )},
    { key: 'sentDate', header: 'Sent', render: (v: unknown) => <span className="text-slate-400">{v as string}</span> },
    { key: 'recipients', header: 'Recipients', align: 'right' as const, render: (v: unknown) => <span className="text-white">{(v as number).toLocaleString()}</span> },
    { key: 'openRate', header: 'Open Rate', align: 'right' as const, render: (v: unknown) => <span className={(v as number) >= 40 ? 'text-emerald-400' : 'text-white'}>{v as number}%</span> },
    { key: 'clickRate', header: 'Click Rate', align: 'right' as const, render: (v: unknown) => <span className={(v as number) >= 4 ? 'text-emerald-400' : 'text-white'}>{v as number}%</span> },
    { key: 'revenue', header: 'Revenue', align: 'right' as const, render: (v: unknown) => <CurrencyCell value={v as number} variant="success" /> },
  ];

  const flowItems = emailAutomatedFlows.map(flow => ({
    label: flow.name,
    sublabel: flow.active ? `${flow.sent} sent • ${flow.openRate}% open rate` : 'Inactive',
    value: flow.revenue,
    valueFormat: 'currency' as const,
  }));

  const listHealthItems = emailListHealth.map(segment => ({
    label: segment.segment,
    value: `${segment.count.toLocaleString()} (${segment.percentage}%)`,
    percentage: segment.percentage,
    color: segment.color,
  }));

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
              <p className="text-sm text-slate-400">Powered by {emailAccount.platform}</p>
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

      <MetricsGrid metrics={primaryMetrics} columns={6} />

      <CampaignTable
        title="Recent Campaigns"
        subtitle={`${emailRecentCampaigns.length} campaigns this month`}
        columns={campaignColumns}
        data={emailRecentCampaigns}
        getRowKey={(row) => row.id}
        headerAction={{ label: 'Create Campaign', icon: 'fas fa-plus', onClick: () => {} }}
      />

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-lg font-semibold text-white">Automated Flows</h2>
            <p className="text-sm text-slate-400">Always-on email sequences</p>
          </div>
          <div className="divide-y divide-slate-700/50">
            {emailAutomatedFlows.map(flow => (
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
                {formatCurrency(emailAutomatedFlows.reduce((sum, f) => sum + f.revenue, 0))}
              </span>
            </div>
          </div>
        </div>

        <BreakdownCard
          title="List Health"
          subtitle="Subscriber engagement breakdown"
          items={listHealthItems}
        />
      </div>

      <TipBox
        title="Email Marketing Best Practices"
        content={`Industry benchmark open rates are 15-25%. Your ${emailMetrics.openRate}% open rate is excellent! Continue segmenting your list and personalizing content to maintain high engagement.`}
        icon="fas fa-lightbulb"
        variant="emerald"
      />
    </div>
  );
}
