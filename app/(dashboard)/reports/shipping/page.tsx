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
} from '@/components/reports';
import { formatCurrency } from '@/lib/formatters';

const shippingMetrics = {
  totalShipments: 1245,
  onTimeDelivery: 96.2,
  avgDeliveryDays: 3.4,
  totalShippingCost: 8960.00,
  totalShippingRevenue: 12450.00,
  shippingProfit: 3490.00,
  avgCostPerShipment: 7.20,
};

const carrierPerformance = [
  { carrier: 'USPS', shipments: 680, onTime: 97.2, avgDays: 3.2, cost: 4080.00, revenue: 5440.00, profit: 1360.00 },
  { carrier: 'UPS', shipments: 320, onTime: 98.1, avgDays: 2.8, cost: 2880.00, revenue: 4160.00, profit: 1280.00 },
  { carrier: 'FedEx', shipments: 180, onTime: 95.6, avgDays: 2.5, cost: 1620.00, revenue: 2340.00, profit: 720.00 },
  { carrier: 'DHL', shipments: 65, onTime: 92.3, avgDays: 4.2, cost: 380.00, revenue: 510.00, profit: 130.00 },
];

const serviceBreakdown = [
  { service: 'Ground', shipments: 780, avgDays: 4.5, cost: 3900.00, percentage: 62.7 },
  { service: 'Priority', shipments: 320, avgDays: 2.5, cost: 2880.00, percentage: 25.7 },
  { service: 'Express', shipments: 105, avgDays: 1.2, cost: 1680.00, percentage: 8.4 },
  { service: 'Overnight', shipments: 40, avgDays: 1.0, cost: 500.00, percentage: 3.2 },
];

const deliveryTimes = [
  { range: '1 day', count: 85, percentage: 6.8 },
  { range: '2 days', count: 245, percentage: 19.7 },
  { range: '3 days', count: 520, percentage: 41.8 },
  { range: '4 days', count: 280, percentage: 22.5 },
  { range: '5+ days', count: 115, percentage: 9.2 },
];

const recentIssues = [
  { tracking: '1Z999AA10123456784', carrier: 'UPS', issue: 'Delivery Exception', status: 'Investigating', date: '2024-12-28' },
  { tracking: '9400111899223100000000', carrier: 'USPS', issue: 'Address Not Found', status: 'Customer Contacted', date: '2024-12-27' },
  { tracking: '784644954892', carrier: 'FedEx', issue: 'Package Damaged', status: 'Claim Filed', date: '2024-12-27' },
];

const tabs = [
  { id: 'overview', label: 'Overview', icon: 'fa-chart-pie' },
  { id: 'carrier', label: 'By Carrier', icon: 'fa-building' },
  { id: 'service', label: 'By Service', icon: 'fa-layer-group' },
  { id: 'delivery', label: 'Delivery Times', icon: 'fa-clock' },
  { id: 'issues', label: 'Issues', icon: 'fa-exclamation-triangle' },
];

type ShippingTab = 'overview' | 'carrier' | 'service' | 'delivery' | 'issues';

export default function ShippingReportsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [activeTab, setActiveTab] = useState<ShippingTab>('overview');

  const handleExport = (format: 'csv' | 'xlsx' | 'pdf') => {
    alert(`Exporting Shipping Report as ${format.toUpperCase()}`);
  };

  const getCarrierColor = (carrier: string) => {
    switch (carrier) {
      case 'USPS': return 'bg-blue-500/20 text-blue-400';
      case 'UPS': return 'bg-amber-500/20 text-amber-400';
      case 'FedEx': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-red-500/20 text-red-400';
    }
  };

  return (
    <div className="space-y-6">
      <ReportPageHeader
        title="Shipping Reports"
        description="Fulfillment metrics, carrier performance, and costs"
        icon="fa-truck-fast"
        iconColor="purple"
        breadcrumbs={[
          { label: 'Reports', href: '/reports' },
          { label: 'Shipping Reports' },
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
        onTabChange={(id) => setActiveTab(id as ShippingTab)}
        accentColor="purple"
      />

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <MetricCardGrid columns={4}>
            <MetricCard label="Total Shipments" value={shippingMetrics.totalShipments.toLocaleString()} trend={{ value: 8.3, direction: 'up' }} />
            <MetricCard label="On-Time Delivery" value={`${shippingMetrics.onTimeDelivery}%`} subtext="Target: 95%" variant="success" />
            <MetricCard label="Avg Delivery Time" value={`${shippingMetrics.avgDeliveryDays} days`} subtext="Door to door" />
            <MetricCard
              label="Shipping Profit"
              value={formatCurrency(shippingMetrics.shippingProfit)}
              subtext={`${((shippingMetrics.shippingProfit / shippingMetrics.totalShippingRevenue) * 100).toFixed(1)}% margin`}
              variant="info"
            />
          </MetricCardGrid>

          <MetricCardGrid columns={3}>
            <MetricCard label="Shipping Revenue" value={formatCurrency(shippingMetrics.totalShippingRevenue)} />
            <MetricCard label="Shipping Cost" value={formatCurrency(shippingMetrics.totalShippingCost)} variant="error" />
            <MetricCard label="Avg Cost/Shipment" value={formatCurrency(shippingMetrics.avgCostPerShipment)} />
          </MetricCardGrid>
        </div>
      )}

      {activeTab === 'carrier' && (
        <div className="space-y-6">
          <MetricCardGrid columns={4}>
            {carrierPerformance.map(carrier => (
              <div key={carrier.carrier} className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCarrierColor(carrier.carrier)}`}>
                    <i className="fas fa-truck"></i>
                  </div>
                  <div className="text-white font-medium">{carrier.carrier}</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Shipments</span>
                    <span className="text-white">{carrier.shipments}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">On-Time</span>
                    <span className={carrier.onTime >= 96 ? 'text-emerald-400' : 'text-amber-400'}>{carrier.onTime}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Avg Days</span>
                    <span className="text-white">{carrier.avgDays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Profit</span>
                    <span className="text-emerald-400">{formatCurrency(carrier.profit)}</span>
                  </div>
                </div>
              </div>
            ))}
          </MetricCardGrid>

          <DataTable
            columns={[
              { key: 'carrier', header: 'Carrier', render: (v) => <span className="text-white font-medium">{v as string}</span> },
              { key: 'shipments', header: 'Shipments', align: 'right', render: (v) => <span className="text-white">{v as number}</span> },
              {
                key: 'onTime',
                header: 'On-Time %',
                align: 'right',
                render: (v) => <StatusBadge status={`${v}%`} variant={(v as number) >= 96 ? 'success' : 'warning'} />
              },
              { key: 'avgDays', header: 'Avg Days', align: 'right', render: (v) => <span className="text-slate-300">{v as number} days</span> },
              { key: 'cost', header: 'Cost', align: 'right', render: (v) => <span className="text-slate-300">{formatCurrency(v as number)}</span> },
              { key: 'revenue', header: 'Revenue', align: 'right', render: (v) => <span className="text-white">{formatCurrency(v as number)}</span> },
              { key: 'profit', header: 'Profit', align: 'right', render: (v) => <span className="text-emerald-400">{formatCurrency(v as number)}</span> },
            ]}
            data={carrierPerformance}
            getRowKey={(row) => (row as typeof carrierPerformance[0]).carrier}
          />
        </div>
      )}

      {activeTab === 'service' && (
        <DataTable
          title="Service Level Breakdown"
          columns={[
            { key: 'service', header: 'Service Level', render: (v) => <span className="text-white font-medium">{v as string}</span> },
            { key: 'shipments', header: 'Shipments', align: 'right', render: (v) => <span className="text-white">{v as number}</span> },
            { key: 'avgDays', header: 'Avg Delivery', align: 'right', render: (v) => <span className="text-slate-300">{v as number} days</span> },
            { key: 'cost', header: 'Total Cost', align: 'right', render: (v) => <span className="text-white">{formatCurrency(v as number)}</span> },
            { key: 'percentage', header: '% of Total', align: 'right', render: (v) => <span className="text-slate-300">{v as number}%</span> },
            {
              key: 'distribution',
              header: 'Distribution',
              render: (_, row) => (
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="h-2 rounded-full bg-purple-500" style={{ width: `${(row as typeof serviceBreakdown[0]).percentage}%` }}></div>
                </div>
              )
            },
          ]}
          data={serviceBreakdown}
          getRowKey={(row) => (row as typeof serviceBreakdown[0]).service}
        />
      )}

      {activeTab === 'delivery' && (
        <DataTable
          title="Delivery Time Distribution"
          columns={[
            { key: 'range', header: 'Delivery Time', render: (v) => <span className="text-white font-medium">{v as string}</span> },
            { key: 'count', header: 'Shipments', align: 'right', render: (v) => <span className="text-white">{v as number}</span> },
            { key: 'percentage', header: 'Percentage', align: 'right', render: (v) => <span className="text-slate-300">{v as number}%</span> },
            {
              key: 'distribution',
              header: 'Distribution',
              render: (_, row) => {
                const r = row as typeof deliveryTimes[0];
                const color = r.range === '1 day' ? 'bg-emerald-500' :
                  r.range === '2 days' ? 'bg-blue-500' :
                  r.range === '3 days' ? 'bg-purple-500' :
                  r.range === '4 days' ? 'bg-amber-500' : 'bg-red-500';
                return (
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div className={`h-3 rounded-full ${color}`} style={{ width: `${r.percentage}%` }}></div>
                  </div>
                );
              }
            },
          ]}
          data={deliveryTimes}
          getRowKey={(row) => (row as typeof deliveryTimes[0]).range}
        />
      )}

      {activeTab === 'issues' && (
        <div className="space-y-6">
          <MetricCardGrid columns={3}>
            <MetricCard label="Active Issues" value={3} variant="error" />
            <MetricCard label="In Progress" value={2} variant="warning" />
            <MetricCard label="Resolved This Month" value={18} variant="success" />
          </MetricCardGrid>

          <DataTable
            title="Recent Issues"
            columns={[
              { key: 'tracking', header: 'Tracking', render: (v) => <span className="text-white font-mono text-sm">{v as string}</span> },
              { key: 'carrier', header: 'Carrier', render: (v) => <span className="text-slate-300">{v as string}</span> },
              { key: 'issue', header: 'Issue', render: (v) => <span className="text-white">{v as string}</span> },
              { key: 'status', header: 'Status', render: (v) => <StatusBadge status={v as string} variant="warning" /> },
              { key: 'date', header: 'Date', render: (v) => <span className="text-slate-400">{v as string}</span> },
            ]}
            data={recentIssues}
            getRowKey={(_, i) => `issue-${i}`}
          />
        </div>
      )}
    </div>
  );
}
