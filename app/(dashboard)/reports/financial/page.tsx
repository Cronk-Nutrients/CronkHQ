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

const financialMetrics = {
  grossRevenue: 156780.00,
  refunds: 3420.00,
  netRevenue: 153360.00,
  cogs: 62712.00,
  grossProfit: 90648.00,
  grossMargin: 59.1,
  operatingExpenses: 28500.00,
  netProfit: 62148.00,
  netMargin: 40.5,
};

const revenueBreakdown = [
  { category: 'Product Sales', amount: 142330.00, percentage: 90.8 },
  { category: 'Shipping Revenue', amount: 12450.00, percentage: 7.9 },
  { category: 'Handling Fees', amount: 2000.00, percentage: 1.3 },
];

const costBreakdown = [
  { category: 'Cost of Goods Sold', amount: 62712.00, percentage: 68.9 },
  { category: 'Shipping Costs', amount: 8960.00, percentage: 9.8 },
  { category: 'Platform Fees', amount: 12542.00, percentage: 13.8 },
  { category: 'Payment Processing', amount: 4700.00, percentage: 5.2 },
  { category: 'Packaging', amount: 2086.00, percentage: 2.3 },
];

const platformFees = [
  { platform: 'Shopify', revenue: 62400.00, fees: 3744.00, feeRate: 6.0 },
  { platform: 'Amazon FBA', revenue: 45600.00, fees: 6840.00, feeRate: 15.0 },
  { platform: 'Amazon FBM', revenue: 21600.00, fees: 1512.00, feeRate: 7.0 },
  { platform: 'Direct', revenue: 27180.00, fees: 446.00, feeRate: 1.6 },
];

const tabs = [
  { id: 'overview', label: 'Overview', icon: 'fa-chart-pie' },
  { id: 'pnl', label: 'P&L Statement', icon: 'fa-file-invoice-dollar' },
  { id: 'fees', label: 'Platform Fees', icon: 'fa-percentage' },
  { id: 'margins', label: 'Margin Analysis', icon: 'fa-chart-line' },
  { id: 'cashflow', label: 'Cash Flow', icon: 'fa-money-bill-wave' },
];

type FinancialTab = 'overview' | 'pnl' | 'fees' | 'margins' | 'cashflow';

export default function FinancialReportsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [activeTab, setActiveTab] = useState<FinancialTab>('overview');

  const handleExport = (format: 'csv' | 'xlsx' | 'pdf') => {
    alert(`Exporting Financial Report as ${format.toUpperCase()}`);
  };

  const getPlatformIcon = (platform: string) => {
    if (platform === 'Shopify') return 'fab fa-shopify';
    if (platform.includes('Amazon')) return 'fab fa-amazon';
    return 'fas fa-store';
  };

  const getPlatformColor = (platform: string) => {
    if (platform === 'Shopify') return 'bg-green-500/20 text-green-400';
    if (platform.includes('Amazon')) return 'bg-orange-500/20 text-orange-400';
    return 'bg-blue-500/20 text-blue-400';
  };

  return (
    <div className="space-y-6">
      <ReportPageHeader
        title="Financial Reports"
        description="P&L, margins, fees, and profitability analysis"
        icon="fa-dollar-sign"
        iconColor="cyan"
        breadcrumbs={[
          { label: 'Reports', href: '/reports' },
          { label: 'Financial Reports' },
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
        onTabChange={(id) => setActiveTab(id as FinancialTab)}
        accentColor="cyan"
      />

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <MetricCardGrid columns={4}>
            <MetricCard label="Net Revenue" value={formatCurrency(financialMetrics.netRevenue)} trend={{ value: 12.5, direction: 'up' }} />
            <MetricCard label="Gross Profit" value={formatCurrency(financialMetrics.grossProfit)} subtext={`${financialMetrics.grossMargin}% margin`} variant="success" />
            <MetricCard label="Net Profit" value={formatCurrency(financialMetrics.netProfit)} subtext={`${financialMetrics.netMargin}% margin`} variant="info" />
            <MetricCard label="Operating Expenses" value={formatCurrency(financialMetrics.operatingExpenses)} subtext="Overhead costs" />
          </MetricCardGrid>

          <div className="grid grid-cols-2 gap-6">
            <SummaryCard title="Revenue Breakdown">
              <div className="space-y-3">
                {revenueBreakdown.map(item => (
                  <div key={item.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <span className="text-slate-300">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">{formatCurrency(item.amount)}</div>
                      <div className="text-xs text-slate-400">{item.percentage}%</div>
                    </div>
                  </div>
                ))}
                <div className="border-t border-slate-700 pt-3 flex items-center justify-between">
                  <span className="text-white font-medium">Total Revenue</span>
                  <span className="text-white font-bold">{formatCurrency(financialMetrics.grossRevenue)}</span>
                </div>
              </div>
            </SummaryCard>

            <SummaryCard title="Cost Breakdown">
              <div className="space-y-3">
                {costBreakdown.map(item => (
                  <div key={item.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-slate-300">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">{formatCurrency(item.amount)}</div>
                      <div className="text-xs text-slate-400">{item.percentage}%</div>
                    </div>
                  </div>
                ))}
                <div className="border-t border-slate-700 pt-3 flex items-center justify-between">
                  <span className="text-white font-medium">Total Costs</span>
                  <span className="text-white font-bold">{formatCurrency(costBreakdown.reduce((sum, c) => sum + c.amount, 0))}</span>
                </div>
              </div>
            </SummaryCard>
          </div>
        </div>
      )}

      {activeTab === 'pnl' && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h3 className="text-white font-semibold">Profit & Loss Statement</h3>
            <p className="text-sm text-slate-400">Period: Last 30 Days</p>
          </div>
          <div className="divide-y divide-slate-700/50">
            <div className="p-4 bg-slate-800/30">
              <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Revenue</div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-slate-300 pl-4">Gross Revenue</span>
              <span className="text-white">{formatCurrency(financialMetrics.grossRevenue)}</span>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-slate-300 pl-4">Less: Refunds</span>
              <span className="text-red-400">({formatCurrency(financialMetrics.refunds)})</span>
            </div>
            <div className="p-4 flex items-center justify-between bg-slate-800/50">
              <span className="text-white font-medium">Net Revenue</span>
              <span className="text-white font-bold">{formatCurrency(financialMetrics.netRevenue)}</span>
            </div>

            <div className="p-4 bg-slate-800/30">
              <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Cost of Goods Sold</div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-slate-300 pl-4">Product Costs</span>
              <span className="text-white">{formatCurrency(financialMetrics.cogs)}</span>
            </div>
            <div className="p-4 flex items-center justify-between bg-emerald-500/10">
              <span className="text-emerald-400 font-medium">Gross Profit</span>
              <span className="text-emerald-400 font-bold">{formatCurrency(financialMetrics.grossProfit)}</span>
            </div>

            <div className="p-4 bg-slate-800/30">
              <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Operating Expenses</div>
            </div>
            {costBreakdown.slice(1).map(cost => (
              <div key={cost.category} className="p-4 flex items-center justify-between">
                <span className="text-slate-300 pl-4">{cost.category}</span>
                <span className="text-white">{formatCurrency(cost.amount)}</span>
              </div>
            ))}
            <div className="p-4 flex items-center justify-between bg-slate-800/50">
              <span className="text-white font-medium">Total Operating Expenses</span>
              <span className="text-white font-bold">{formatCurrency(financialMetrics.operatingExpenses)}</span>
            </div>

            <div className="p-4 flex items-center justify-between bg-cyan-500/10">
              <span className="text-cyan-400 font-bold text-lg">Net Profit</span>
              <span className="text-cyan-400 font-bold text-lg">{formatCurrency(financialMetrics.netProfit)}</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'fees' && (
        <div className="space-y-6">
          <MetricCardGrid columns={4}>
            {platformFees.map(platform => (
              <div key={platform.platform} className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getPlatformColor(platform.platform)}`}>
                    <i className={getPlatformIcon(platform.platform)}></i>
                  </div>
                  <div className="text-white font-medium">{platform.platform}</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Revenue</span>
                    <span className="text-white">{formatCurrency(platform.revenue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fees</span>
                    <span className="text-red-400">{formatCurrency(platform.fees)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fee Rate</span>
                    <span className="text-amber-400">{platform.feeRate}%</span>
                  </div>
                </div>
              </div>
            ))}
          </MetricCardGrid>

          <DataTable
            title="Platform Fee Comparison"
            columns={[
              { key: 'platform', header: 'Platform', render: (v) => <span className="text-white font-medium">{v as string}</span> },
              { key: 'revenue', header: 'Revenue', align: 'right', render: (v) => <span className="text-white">{formatCurrency(v as number)}</span> },
              { key: 'fees', header: 'Fees', align: 'right', render: (v) => <span className="text-red-400">{formatCurrency(v as number)}</span> },
              {
                key: 'feeRate',
                header: 'Fee Rate',
                align: 'right',
                render: (v) => {
                  const rate = v as number;
                  const variant = rate < 5 ? 'success' : rate < 10 ? 'warning' : 'error';
                  return <StatusBadge status={`${rate}%`} variant={variant} />;
                }
              },
              {
                key: 'netAfterFees',
                header: 'Net After Fees',
                align: 'right',
                render: (_, row) => {
                  const r = row as typeof platformFees[0];
                  return <span className="text-emerald-400">{formatCurrency(r.revenue - r.fees)}</span>;
                }
              },
            ]}
            data={platformFees}
            getRowKey={(row) => (row as typeof platformFees[0]).platform}
            footer={
              <tr>
                <td className="p-4 text-white font-semibold">Total</td>
                <td className="p-4 text-right text-white font-semibold">{formatCurrency(platformFees.reduce((sum, p) => sum + p.revenue, 0))}</td>
                <td className="p-4 text-right text-red-400 font-semibold">{formatCurrency(platformFees.reduce((sum, p) => sum + p.fees, 0))}</td>
                <td className="p-4"></td>
                <td className="p-4 text-right text-emerald-400 font-semibold">{formatCurrency(platformFees.reduce((sum, p) => sum + p.revenue - p.fees, 0))}</td>
              </tr>
            }
          />
        </div>
      )}

      {activeTab === 'margins' && (
        <div className="space-y-6">
          <MetricCardGrid columns={3}>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="text-sm text-slate-400 mb-1">Gross Margin</div>
              <div className="text-3xl font-bold text-emerald-400">{financialMetrics.grossMargin}%</div>
              <div className="mt-3 h-2 bg-slate-700 rounded-full">
                <div className="h-2 bg-emerald-500 rounded-full" style={{ width: `${financialMetrics.grossMargin}%` }}></div>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="text-sm text-slate-400 mb-1">Operating Margin</div>
              <div className="text-3xl font-bold text-blue-400">52.8%</div>
              <div className="mt-3 h-2 bg-slate-700 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '52.8%' }}></div>
              </div>
            </div>
            <div className="bg-cyan-500/10 backdrop-blur border border-cyan-500/30 rounded-xl p-5">
              <div className="text-sm text-slate-400 mb-1">Net Margin</div>
              <div className="text-3xl font-bold text-cyan-400">{financialMetrics.netMargin}%</div>
              <div className="mt-3 h-2 bg-slate-700 rounded-full">
                <div className="h-2 bg-cyan-500 rounded-full" style={{ width: `${financialMetrics.netMargin}%` }}></div>
              </div>
            </div>
          </MetricCardGrid>

          <ChartPlaceholder title="Margin Trend" type="line" />
        </div>
      )}

      {activeTab === 'cashflow' && (
        <div className="space-y-6">
          <MetricCardGrid columns={3}>
            <MetricCard label="Cash In" value={formatCurrency(153360)} subtext="Revenue collected" variant="success" />
            <MetricCard label="Cash Out" value={formatCurrency(91212)} subtext="Expenses paid" variant="error" />
            <MetricCard label="Net Cash Flow" value={formatCurrency(62148)} subtext="This period" variant="info" />
          </MetricCardGrid>

          <ChartPlaceholder title="Cash Flow Trend" type="bar" />
        </div>
      )}
    </div>
  );
}
