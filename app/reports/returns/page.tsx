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
} from '@/components/reports';
import { formatCurrency } from '@/lib/formatters';

const returnMetrics = {
  totalReturns: 156,
  returnRate: 4.2,
  totalRefunds: 15680.00,
  avgProcessingDays: 3.2,
  restockRate: 72.4,
  restockFees: 1250.00,
  pendingReturns: 12,
  processedThisMonth: 48,
};

const returnReasons = [
  { reason: 'Defective/Damaged', count: 42, percentage: 26.9, refundAmount: 4200.00 },
  { reason: 'Wrong Item Received', count: 28, percentage: 17.9, refundAmount: 2800.00 },
  { reason: 'Not As Described', count: 35, percentage: 22.4, refundAmount: 3500.00 },
  { reason: 'Changed Mind', count: 32, percentage: 20.5, refundAmount: 3200.00 },
  { reason: 'Size/Fit Issue', count: 12, percentage: 7.7, refundAmount: 1200.00 },
  { reason: 'Other', count: 7, percentage: 4.6, refundAmount: 780.00 },
];

const returnsByProduct = [
  { product: 'CalMag Plus 1L', sku: 'CM-1000', returns: 18, soldUnits: 245, returnRate: 7.3, refunds: 900.00 },
  { product: 'Bloom Booster 500ml', sku: 'BB-500', returns: 12, soldUnits: 198, returnRate: 6.1, refunds: 600.00 },
  { product: 'Grow Formula 1L', sku: 'GF-1000', returns: 15, soldUnits: 156, returnRate: 9.6, refunds: 750.00 },
  { product: 'Root Enhancer 250ml', sku: 'RE-250', returns: 8, soldUnits: 142, returnRate: 5.6, refunds: 320.00 },
  { product: 'Micro Nutrients 500ml', sku: 'MN-500', returns: 5, soldUnits: 128, returnRate: 3.9, refunds: 250.00 },
];

const returnsByChannel = [
  { channel: 'Amazon FBA', returns: 68, returnRate: 5.8, refunds: 6800.00 },
  { channel: 'Amazon FBM', returns: 32, returnRate: 4.2, refunds: 3200.00 },
  { channel: 'Shopify', returns: 42, returnRate: 3.1, refunds: 4200.00 },
  { channel: 'Direct', returns: 14, returnRate: 2.8, refunds: 1480.00 },
];

const recentReturns = [
  { id: 'RET-001', order: 'ORD-1234', product: 'CalMag Plus 1L', reason: 'Defective', status: 'Approved', date: '2024-12-28' },
  { id: 'RET-002', order: 'ORD-1198', product: 'Bloom Booster 500ml', reason: 'Wrong Item', status: 'Processing', date: '2024-12-27' },
  { id: 'RET-003', order: 'ORD-1156', product: 'Grow Formula 1L', reason: 'Changed Mind', status: 'Pending', date: '2024-12-27' },
  { id: 'RET-004', order: 'ORD-1142', product: 'Root Enhancer 250ml', reason: 'Not As Described', status: 'Completed', date: '2024-12-26' },
];

const tabs = [
  { id: 'overview', label: 'Overview', icon: 'fa-chart-pie' },
  { id: 'reasons', label: 'By Reason', icon: 'fa-question-circle' },
  { id: 'products', label: 'By Product', icon: 'fa-box' },
  { id: 'channels', label: 'By Channel', icon: 'fa-store' },
  { id: 'recent', label: 'Recent Returns', icon: 'fa-list' },
];

type ReturnsTab = 'overview' | 'reasons' | 'products' | 'channels' | 'recent';

export default function ReturnsReportsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [activeTab, setActiveTab] = useState<ReturnsTab>('overview');

  const handleExport = (format: 'csv' | 'xlsx' | 'pdf') => {
    alert(`Exporting Returns Report as ${format.toUpperCase()}`);
  };

  const getStatusVariant = (status: string): 'success' | 'warning' | 'info' | 'neutral' => {
    switch (status) {
      case 'Completed': return 'success';
      case 'Approved': return 'info';
      case 'Processing': return 'warning';
      default: return 'neutral';
    }
  };

  return (
    <div className="space-y-6">
      <ReportPageHeader
        title="Returns Reports"
        description="Return rates, reasons, and processing analytics"
        icon="fa-rotate-left"
        iconColor="amber"
        breadcrumbs={[
          { label: 'Reports', href: '/reports' },
          { label: 'Returns Reports' },
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
        onTabChange={(id) => setActiveTab(id as ReturnsTab)}
        accentColor="amber"
      />

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <MetricCardGrid columns={4}>
            <MetricCard label="Total Returns" value={returnMetrics.totalReturns} subtext="This period" />
            <MetricCard label="Return Rate" value={`${returnMetrics.returnRate}%`} subtext="Of total orders" variant="warning" />
            <MetricCard label="Total Refunds" value={formatCurrency(returnMetrics.totalRefunds)} subtext="Refunded amount" variant="error" />
            <MetricCard label="Avg Processing" value={`${returnMetrics.avgProcessingDays} days`} subtext="Receipt to refund" />
          </MetricCardGrid>

          <MetricCardGrid columns={4}>
            <MetricCard label="Pending Returns" value={returnMetrics.pendingReturns} />
            <MetricCard label="Processed This Month" value={returnMetrics.processedThisMonth} />
            <MetricCard label="Restock Rate" value={`${returnMetrics.restockRate}%`} variant="success" />
            <MetricCard label="Restock Fees" value={formatCurrency(returnMetrics.restockFees)} variant="success" />
          </MetricCardGrid>

          <div className="grid grid-cols-2 gap-6">
            <ChartPlaceholder title="Returns Trend" type="line" />
            <ChartPlaceholder title="Reason Distribution" type="pie" />
          </div>
        </div>
      )}

      {activeTab === 'reasons' && (
        <DataTable
          title="Returns by Reason"
          columns={[
            { key: 'reason', header: 'Reason', render: (v) => <span className="text-white font-medium">{v as string}</span> },
            { key: 'count', header: 'Count', align: 'right', render: (v) => <span className="text-white">{v as number}</span> },
            { key: 'percentage', header: 'Percentage', align: 'right', render: (v) => <span className="text-slate-300">{v as number}%</span> },
            { key: 'refundAmount', header: 'Refund Amount', align: 'right', render: (v) => <span className="text-red-400">{formatCurrency(v as number)}</span> },
            {
              key: 'distribution',
              header: 'Distribution',
              render: (_, row) => (
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="h-2 rounded-full bg-amber-500" style={{ width: `${(row as typeof returnReasons[0]).percentage}%` }}></div>
                </div>
              )
            },
          ]}
          data={returnReasons}
          getRowKey={(row) => (row as typeof returnReasons[0]).reason}
        />
      )}

      {activeTab === 'products' && (
        <DataTable
          title="Returns by Product"
          columns={[
            {
              key: 'product',
              header: 'Product',
              render: (v, row) => (
                <div>
                  <div className="text-white font-medium">{v as string}</div>
                  <div className="text-xs text-slate-400">{(row as typeof returnsByProduct[0]).sku}</div>
                </div>
              )
            },
            { key: 'returns', header: 'Returns', align: 'right', render: (v) => <span className="text-white">{v as number}</span> },
            { key: 'soldUnits', header: 'Sold Units', align: 'right', render: (v) => <span className="text-slate-300">{v as number}</span> },
            {
              key: 'returnRate',
              header: 'Return Rate',
              align: 'right',
              render: (v) => {
                const rate = v as number;
                const variant = rate < 5 ? 'success' : rate < 8 ? 'warning' : 'error';
                return <StatusBadge status={`${rate}%`} variant={variant} />;
              }
            },
            { key: 'refunds', header: 'Refunds', align: 'right', render: (v) => <span className="text-red-400">{formatCurrency(v as number)}</span> },
          ]}
          data={returnsByProduct}
          getRowKey={(row) => (row as typeof returnsByProduct[0]).sku}
        />
      )}

      {activeTab === 'channels' && (
        <MetricCardGrid columns={4}>
          {returnsByChannel.map(channel => (
            <div key={channel.channel} className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  channel.channel.includes('Amazon') ? 'bg-orange-500/20 text-orange-400' :
                  channel.channel === 'Shopify' ? 'bg-green-500/20 text-green-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  <i className={`${
                    channel.channel.includes('Amazon') ? 'fab fa-amazon' :
                    channel.channel === 'Shopify' ? 'fab fa-shopify' :
                    'fas fa-store'
                  }`}></i>
                </div>
                <div className="text-white font-medium">{channel.channel}</div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Returns</span>
                  <span className="text-white">{channel.returns}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Return Rate</span>
                  <span className={channel.returnRate < 4 ? 'text-emerald-400' : 'text-amber-400'}>{channel.returnRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Refunds</span>
                  <span className="text-red-400">{formatCurrency(channel.refunds)}</span>
                </div>
              </div>
            </div>
          ))}
        </MetricCardGrid>
      )}

      {activeTab === 'recent' && (
        <DataTable
          title="Recent Returns"
          columns={[
            { key: 'id', header: 'Return ID', render: (v) => <span className="text-white font-medium">{v as string}</span> },
            { key: 'order', header: 'Order', render: (v) => <span className="text-blue-400">{v as string}</span> },
            { key: 'product', header: 'Product', render: (v) => <span className="text-slate-300">{v as string}</span> },
            { key: 'reason', header: 'Reason', render: (v) => <span className="text-slate-300">{v as string}</span> },
            {
              key: 'status',
              header: 'Status',
              render: (v) => <StatusBadge status={v as string} variant={getStatusVariant(v as string)} />
            },
            { key: 'date', header: 'Date', render: (v) => <span className="text-slate-400">{v as string}</span> },
          ]}
          data={recentReturns}
          getRowKey={(row) => (row as typeof recentReturns[0]).id}
        />
      )}
    </div>
  );
}
