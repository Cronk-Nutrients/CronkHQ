'use client';

import { useState } from 'react';
import {
  ReportPageHeader,
  MetricCard,
  MetricCardGrid,
  ReportTabs,
  DataTable,
  MarginBadge,
  DateRangePicker,
  ExportActions,
  ChartPlaceholder,
  SummaryCard,
} from '@/components/reports';
import { formatCurrency } from '@/lib/formatters';
import {
  salesMetrics,
  dailySales,
  channelBreakdown,
  topProducts,
  topCustomers,
  salesTabs,
} from '@/data/reports';

type SalesTab = 'overview' | 'daily' | 'channel' | 'product' | 'customer';

export default function SalesReportsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [activeTab, setActiveTab] = useState<SalesTab>('overview');

  const handleExport = (format: 'csv' | 'xlsx' | 'pdf') => {
    alert(`Exporting Sales Report as ${format.toUpperCase()}`);
  };

  return (
    <div className="space-y-6">
      <ReportPageHeader
        title="Sales Reports"
        description="Revenue, orders, products, and customer analytics"
        icon="fa-chart-line"
        iconColor="emerald"
        breadcrumbs={[
          { label: 'Reports', href: '/reports' },
          { label: 'Sales Reports' },
        ]}
        actions={
          <>
            <DateRangePicker value={dateRange} onChange={setDateRange} />
            <ExportActions onExport={handleExport} />
          </>
        }
      />

      <ReportTabs
        tabs={salesTabs}
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id as SalesTab)}
        accentColor="emerald"
      />

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <MetricCardGrid columns={4}>
            <MetricCard
              label="Total Revenue"
              value={formatCurrency(salesMetrics.totalRevenue)}
              trend={{ value: 12.5, direction: 'up' }}
            />
            <MetricCard
              label="Total Orders"
              value={salesMetrics.totalOrders.toLocaleString()}
              trend={{ value: 8.2, direction: 'up' }}
            />
            <MetricCard
              label="Avg Order Value"
              value={formatCurrency(salesMetrics.avgOrderValue)}
              trend={{ value: 3.8, direction: 'up' }}
            />
            <MetricCard
              label="Gross Profit"
              value={formatCurrency(salesMetrics.grossProfit)}
              subtext={`${salesMetrics.grossMargin}% margin`}
              variant="success"
            />
          </MetricCardGrid>

          <div className="grid grid-cols-2 gap-6">
            <ChartPlaceholder title="Revenue Trend" type="area" />
            <ChartPlaceholder title="Channel Distribution" type="pie" />
          </div>

          <SummaryCard title="Revenue Breakdown">
            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 bg-slate-800 rounded-lg">
                <div className="text-sm text-slate-400">Gross Revenue</div>
                <div className="text-xl font-bold text-white">{formatCurrency(salesMetrics.totalRevenue)}</div>
              </div>
              <div className="p-4 bg-slate-800 rounded-lg">
                <div className="text-sm text-slate-400">Refunds</div>
                <div className="text-xl font-bold text-red-400">-{formatCurrency(salesMetrics.refunds)}</div>
              </div>
              <div className="p-4 bg-slate-800 rounded-lg">
                <div className="text-sm text-slate-400">Net Revenue</div>
                <div className="text-xl font-bold text-white">{formatCurrency(salesMetrics.netRevenue)}</div>
              </div>
              <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                <div className="text-sm text-slate-400">Gross Profit</div>
                <div className="text-xl font-bold text-emerald-400">{formatCurrency(salesMetrics.grossProfit)}</div>
              </div>
            </div>
          </SummaryCard>
        </div>
      )}

      {/* Daily Sales Tab */}
      {activeTab === 'daily' && (
        <DataTable
          title="Daily Sales Breakdown"
          columns={[
            { key: 'date', header: 'Date', render: (v) => <span className="text-white">{v as string}</span> },
            { key: 'orders', header: 'Orders', align: 'right', render: (v) => <span className="text-white">{v as number}</span> },
            { key: 'revenue', header: 'Revenue', align: 'right', render: (v) => <span className="text-white">{formatCurrency(v as number)}</span> },
            { key: 'profit', header: 'Profit', align: 'right', render: (v) => <span className="text-emerald-400">{formatCurrency(v as number)}</span> },
            {
              key: 'avgOrder',
              header: 'Avg Order',
              align: 'right',
              render: (_, row) => <span className="text-slate-300">{formatCurrency((row as typeof dailySales[0]).revenue / (row as typeof dailySales[0]).orders)}</span>
            },
          ]}
          data={dailySales}
          getRowKey={(row) => (row as typeof dailySales[0]).date}
          footer={
            <tr>
              <td className="p-4 text-white font-semibold">Total</td>
              <td className="p-4 text-right text-white font-semibold">{dailySales.reduce((sum, d) => sum + d.orders, 0)}</td>
              <td className="p-4 text-right text-white font-semibold">{formatCurrency(dailySales.reduce((sum, d) => sum + d.revenue, 0))}</td>
              <td className="p-4 text-right text-emerald-400 font-semibold">{formatCurrency(dailySales.reduce((sum, d) => sum + d.profit, 0))}</td>
              <td className="p-4"></td>
            </tr>
          }
        />
      )}

      {/* Channel Tab */}
      {activeTab === 'channel' && (
        <div className="space-y-6">
          <MetricCardGrid columns={4}>
            {channelBreakdown.map(channel => (
              <div key={channel.channel} className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                    <i className={`${
                      channel.channel === 'Shopify' ? 'fab fa-shopify text-green-400' :
                      channel.channel.includes('Amazon') ? 'fab fa-amazon text-orange-400' :
                      'fas fa-store text-blue-400'
                    }`}></i>
                  </div>
                  <div className="text-white font-medium">{channel.channel}</div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{formatCurrency(channel.revenue)}</div>
                <div className="text-sm text-slate-400">{channel.orders} orders &bull; {channel.share}% of total</div>
                <div className="mt-3 pt-3 border-t border-slate-700">
                  <div className="text-sm text-emerald-400">Profit: {formatCurrency(channel.profit)}</div>
                </div>
              </div>
            ))}
          </MetricCardGrid>

          <DataTable
            columns={[
              { key: 'channel', header: 'Channel', render: (v) => <span className="text-white font-medium">{v as string}</span> },
              { key: 'orders', header: 'Orders', align: 'right', render: (v) => <span className="text-white">{v as number}</span> },
              { key: 'revenue', header: 'Revenue', align: 'right', render: (v) => <span className="text-white">{formatCurrency(v as number)}</span> },
              { key: 'profit', header: 'Profit', align: 'right', render: (v) => <span className="text-emerald-400">{formatCurrency(v as number)}</span> },
              { key: 'share', header: 'Share', align: 'right', render: (v) => <span className="text-slate-300">{v as number}%</span> },
              {
                key: 'margin',
                header: 'Margin',
                align: 'right',
                render: (_, row) => {
                  const r = row as typeof channelBreakdown[0];
                  return <MarginBadge margin={(r.profit / r.revenue) * 100} />;
                }
              },
            ]}
            data={channelBreakdown}
            getRowKey={(row) => (row as typeof channelBreakdown[0]).channel}
          />
        </div>
      )}

      {/* Product Tab */}
      {activeTab === 'product' && (
        <DataTable
          title="Top Selling Products"
          columns={[
            {
              key: 'name',
              header: 'Product',
              render: (v, row, i) => (
                <div className="flex items-center gap-3">
                  {i === 0 && <span className="text-amber-400 text-xs font-medium">TOP</span>}
                  <div>
                    <div className="text-white font-medium">{v as string}</div>
                    <div className="text-xs text-slate-400">{(row as typeof topProducts[0]).sku}</div>
                  </div>
                </div>
              )
            },
            { key: 'unitsSold', header: 'Units Sold', align: 'right', render: (v) => <span className="text-white">{v as number}</span> },
            { key: 'revenue', header: 'Revenue', align: 'right', render: (v) => <span className="text-white">{formatCurrency(v as number)}</span> },
            { key: 'profit', header: 'Profit', align: 'right', render: (v) => <span className="text-emerald-400">{formatCurrency(v as number)}</span> },
            {
              key: 'margin',
              header: 'Margin',
              align: 'right',
              render: (_, row) => {
                const r = row as typeof topProducts[0];
                return <MarginBadge margin={(r.profit / r.revenue) * 100} />;
              }
            },
          ]}
          data={topProducts}
          getRowKey={(row) => (row as typeof topProducts[0]).sku}
        />
      )}

      {/* Customer Tab */}
      {activeTab === 'customer' && (
        <DataTable
          title="Top Customers"
          columns={[
            {
              key: 'name',
              header: 'Customer',
              render: (v, _, i) => (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-slate-400">
                    {i + 1}
                  </div>
                  <div className="text-white font-medium">{v as string}</div>
                </div>
              )
            },
            { key: 'orders', header: 'Orders', align: 'right', render: (v) => <span className="text-white">{v as number}</span> },
            { key: 'revenue', header: 'Total Revenue', align: 'right', render: (v) => <span className="text-emerald-400 font-medium">{formatCurrency(v as number)}</span> },
            { key: 'avgOrder', header: 'Avg Order Value', align: 'right', render: (v) => <span className="text-slate-300">{formatCurrency(v as number)}</span> },
          ]}
          data={topCustomers}
          getRowKey={(row) => (row as typeof topCustomers[0]).name}
        />
      )}
    </div>
  );
}
