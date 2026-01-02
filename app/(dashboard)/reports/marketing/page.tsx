'use client';

import { useState } from 'react';
import {
  ReportPageHeader,
  MetricCard,
  MetricCardGrid,
  ReportTabs,
  DataTable,
  StatusBadge,
  DateRangePicker,
  ExportActions,
  ChartPlaceholder,
  SummaryCard,
} from '@/components/reports';
import { formatCurrency } from '@/lib/formatters';

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

const tabs = [
  { id: 'overview', label: 'Overview', icon: 'fa-chart-pie' },
  { id: 'channels', label: 'By Channel', icon: 'fa-layer-group' },
  { id: 'campaigns', label: 'Campaigns', icon: 'fa-bullseye' },
  { id: 'attribution', label: 'Attribution', icon: 'fa-code-branch' },
  { id: 'cohort', label: 'Cohort', icon: 'fa-users' },
];

type MarketingTab = 'overview' | 'channels' | 'campaigns' | 'attribution' | 'cohort';

export default function MarketingReportsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [activeTab, setActiveTab] = useState<MarketingTab>('overview');

  const handleExport = (format: 'csv' | 'xlsx' | 'pdf') => {
    alert(`Exporting Marketing Report as ${format.toUpperCase()}`);
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'Google Ads': return 'fab fa-google';
      case 'Meta Ads': return 'fab fa-meta';
      case 'Amazon Ads': return 'fab fa-amazon';
      case 'TikTok Ads': return 'fab fa-tiktok';
      default: return 'fas fa-envelope';
    }
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'Google Ads': return 'bg-blue-500/20 text-blue-400';
      case 'Meta Ads': return 'bg-indigo-500/20 text-indigo-400';
      case 'Amazon Ads': return 'bg-orange-500/20 text-orange-400';
      case 'TikTok Ads': return 'bg-pink-500/20 text-pink-400';
      default: return 'bg-emerald-500/20 text-emerald-400';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Google': return 'bg-blue-500/20 text-blue-400';
      case 'Meta': return 'bg-indigo-500/20 text-indigo-400';
      case 'Amazon': return 'bg-orange-500/20 text-orange-400';
      case 'TikTok': return 'bg-pink-500/20 text-pink-400';
      default: return 'bg-emerald-500/20 text-emerald-400';
    }
  };

  return (
    <div className="space-y-6">
      <ReportPageHeader
        title="Marketing Reports"
        description="Ad performance, ROAS, attribution, and campaigns"
        icon="fa-bullhorn"
        iconColor="pink"
        breadcrumbs={[
          { label: 'Reports', href: '/reports' },
          { label: 'Marketing Reports' },
        ]}
        actions={
          <>
            <DateRangePicker value={dateRange} onChange={setDateRange} />
            <ExportActions onExport={handleExport} />
          </>
        }
      />

      <ReportTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id as MarketingTab)}
        accentColor="pink"
      />

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <MetricCardGrid columns={4}>
            <MetricCard label="Total Ad Spend" value={formatCurrency(marketingMetrics.totalAdSpend)} subtext="Across all channels" />
            <MetricCard label="Ad Revenue" value={formatCurrency(marketingMetrics.totalRevenue)} subtext="Attributed sales" variant="success" />
            <MetricCard label="Blended ROAS" value={`${marketingMetrics.blendedROAS.toFixed(2)}x`} subtext="Return on ad spend" variant="info" />
            <MetricCard label="New Customers" value={marketingMetrics.newCustomers} subtext="This period" />
          </MetricCardGrid>

          <MetricCardGrid columns={4}>
            <MetricCard label="CAC" value={formatCurrency(marketingMetrics.cac)} subtext="Cost per acquisition" />
            <MetricCard label="LTV" value={formatCurrency(marketingMetrics.ltv)} subtext="Lifetime value" />
            <MetricCard label="LTV:CAC Ratio" value={`${marketingMetrics.ltvCacRatio.toFixed(2)}x`} subtext="Target: 3x+" variant="success" />
            <MetricCard label="Conversion Rate" value={`${marketingMetrics.conversionRate}%`} subtext="Click to purchase" />
          </MetricCardGrid>

          <SummaryCard title="Channel Performance Summary">
            <div className="grid grid-cols-5 gap-4">
              {channelPerformance.map(channel => (
                <div key={channel.channel} className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center ${getChannelColor(channel.channel)}`}>
                    <i className={getChannelIcon(channel.channel)}></i>
                  </div>
                  <div className="text-xs text-slate-400">{channel.channel}</div>
                  <div className="text-lg font-bold text-white">{channel.roas.toFixed(2)}x</div>
                  <div className="text-xs text-slate-500">ROAS</div>
                </div>
              ))}
            </div>
          </SummaryCard>
        </div>
      )}

      {activeTab === 'channels' && (
        <DataTable
          columns={[
            {
              key: 'channel',
              header: 'Channel',
              render: (v) => (
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getChannelColor(v as string)}`}>
                    <i className={`text-sm ${getChannelIcon(v as string)}`}></i>
                  </div>
                  <span className="text-white font-medium">{v as string}</span>
                </div>
              )
            },
            { key: 'spend', header: 'Spend', align: 'right', render: (v) => <span className="text-white">{formatCurrency(v as number)}</span> },
            { key: 'revenue', header: 'Revenue', align: 'right', render: (v) => <span className="text-emerald-400">{formatCurrency(v as number)}</span> },
            {
              key: 'roas',
              header: 'ROAS',
              align: 'right',
              render: (v) => {
                const roas = v as number;
                const variant = roas >= 5 ? 'success' : roas >= 3 ? 'warning' : 'error';
                return <StatusBadge status={`${roas.toFixed(2)}x`} variant={variant} />;
              }
            },
            { key: 'conversions', header: 'Conversions', align: 'right', render: (v) => <span className="text-white">{v as number}</span> },
            { key: 'cpa', header: 'CPA', align: 'right', render: (v) => <span className="text-slate-300">{formatCurrency(v as number)}</span> },
            { key: 'impressions', header: 'Impressions', align: 'right', render: (v) => <span className="text-slate-300">{(v as number).toLocaleString()}</span> },
            { key: 'clicks', header: 'Clicks', align: 'right', render: (v) => <span className="text-slate-300">{(v as number).toLocaleString()}</span> },
          ]}
          data={channelPerformance}
          getRowKey={(row) => (row as typeof channelPerformance[0]).channel}
          footer={
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
          }
        />
      )}

      {activeTab === 'campaigns' && (
        <DataTable
          title="Top Campaigns"
          columns={[
            { key: 'name', header: 'Campaign', render: (v) => <span className="text-white font-medium">{v as string}</span> },
            {
              key: 'platform',
              header: 'Platform',
              render: (v) => <span className={`px-2 py-1 rounded text-xs ${getPlatformColor(v as string)}`}>{v as string}</span>
            },
            { key: 'spend', header: 'Spend', align: 'right', render: (v) => <span className="text-white">{formatCurrency(v as number)}</span> },
            { key: 'revenue', header: 'Revenue', align: 'right', render: (v) => <span className="text-emerald-400">{formatCurrency(v as number)}</span> },
            {
              key: 'roas',
              header: 'ROAS',
              align: 'right',
              render: (v) => {
                const roas = v as number;
                const variant = roas >= 5 ? 'success' : roas >= 3 ? 'warning' : 'error';
                return <StatusBadge status={`${roas.toFixed(2)}x`} variant={variant} />;
              }
            },
            {
              key: 'status',
              header: 'Status',
              render: () => <StatusBadge status="Active" variant="success" showDot pulse />
            },
          ]}
          data={campaignBreakdown}
          getRowKey={(row) => (row as typeof campaignBreakdown[0]).name}
        />
      )}

      {activeTab === 'attribution' && (
        <div className="grid grid-cols-2 gap-6">
          <SummaryCard title="First Touch Attribution">
            <div className="space-y-4">
              {attributionData.firstTouch.map(item => (
                <div key={item.channel}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-400">{item.channel}</span>
                    <span className="text-white">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="h-2 rounded-full bg-pink-500" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </SummaryCard>
          <SummaryCard title="Last Touch Attribution">
            <div className="space-y-4">
              {attributionData.lastTouch.map(item => (
                <div key={item.channel}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-400">{item.channel}</span>
                    <span className="text-white">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="h-2 rounded-full bg-indigo-500" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </SummaryCard>
        </div>
      )}

      {activeTab === 'cohort' && (
        <ChartPlaceholder
          title="Customer Cohort Analysis"
          type="bar"
          height="h-64"
        />
      )}
    </div>
  );
}
