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
import { formatCurrency, getStockStatus } from '@/lib/formatters';
import {
  inventoryMetrics,
  stockLevels,
  agingReport,
  locationSummary,
  inventoryTabs,
} from '@/data/reports';

type InventoryTab = 'overview' | 'levels' | 'aging' | 'location' | 'movement';

export default function InventoryReportsPage() {
  const [dateRange, setDateRange] = useState('current');
  const [activeTab, setActiveTab] = useState<InventoryTab>('overview');

  const handleExport = (format: 'csv' | 'xlsx' | 'pdf') => {
    alert(`Exporting Inventory Report as ${format.toUpperCase()}`);
  };

  const healthyCount = inventoryMetrics.totalSKUs - inventoryMetrics.lowStock - inventoryMetrics.outOfStock - inventoryMetrics.overstock;

  return (
    <div className="space-y-6">
      <ReportPageHeader
        title="Inventory Reports"
        description="Stock levels, movement, valuation, and forecasting"
        icon="fa-boxes-stacked"
        iconColor="blue"
        breadcrumbs={[
          { label: 'Reports', href: '/reports' },
          { label: 'Inventory Reports' },
        ]}
        actions={
          <>
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
              options={[
                { value: 'current', label: 'Current Snapshot' },
                { value: '7d', label: 'Last 7 Days' },
                { value: '30d', label: 'Last 30 Days' },
                { value: '90d', label: 'Last 90 Days' },
              ]}
            />
            <ExportActions onExport={handleExport} />
          </>
        }
      />

      <ReportTabs
        tabs={inventoryTabs}
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id as InventoryTab)}
        accentColor="blue"
      />

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <MetricCardGrid columns={4}>
            <MetricCard label="Total SKUs" value={inventoryMetrics.totalSKUs} subtext="Active products" />
            <MetricCard label="Total Units" value={inventoryMetrics.totalUnits.toLocaleString()} subtext="In stock" />
            <MetricCard label="Inventory Value" value={formatCurrency(inventoryMetrics.totalValue)} subtext="At cost" variant="info" />
            <MetricCard label="Turnover Rate" value={`${inventoryMetrics.turnoverRate}x`} subtext="Annual average" />
          </MetricCardGrid>

          <MetricCardGrid columns={4}>
            <div className="bg-emerald-500/10 backdrop-blur border border-emerald-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <i className="fas fa-check text-emerald-400"></i>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{healthyCount}</div>
                  <div className="text-xs text-slate-400">Healthy Stock</div>
                </div>
              </div>
            </div>
            <div className="bg-amber-500/10 backdrop-blur border border-amber-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                  <i className="fas fa-exclamation-triangle text-amber-400"></i>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{inventoryMetrics.lowStock}</div>
                  <div className="text-xs text-slate-400">Low Stock</div>
                </div>
              </div>
            </div>
            <div className="bg-red-500/10 backdrop-blur border border-red-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <i className="fas fa-times text-red-400"></i>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{inventoryMetrics.outOfStock}</div>
                  <div className="text-xs text-slate-400">Out of Stock</div>
                </div>
              </div>
            </div>
            <div className="bg-blue-500/10 backdrop-blur border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <i className="fas fa-boxes-packing text-blue-400"></i>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{inventoryMetrics.overstock}</div>
                  <div className="text-xs text-slate-400">Overstock</div>
                </div>
              </div>
            </div>
          </MetricCardGrid>

          <div className="grid grid-cols-2 gap-6">
            <ChartPlaceholder title="Inventory Value Trend" type="line" />
            <ChartPlaceholder title="Stock Status Distribution" type="pie" />
          </div>
        </div>
      )}

      {/* Stock Levels Tab */}
      {activeTab === 'levels' && (
        <DataTable
          title="Stock Levels by SKU"
          headerActions={
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded">Healthy</span>
              <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-400 rounded">Low</span>
              <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded">Out</span>
              <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">Overstock</span>
            </div>
          }
          columns={[
            {
              key: 'name',
              header: 'Product',
              render: (v, row) => (
                <div>
                  <div className="text-white font-medium">{v as string}</div>
                  <div className="text-xs text-slate-400">{(row as typeof stockLevels[0]).sku}</div>
                </div>
              )
            },
            { key: 'location', header: 'Location', render: (v) => <span className="text-slate-300">{v as string}</span> },
            { key: 'quantity', header: 'Quantity', align: 'right', render: (v) => <span className="text-white">{v as number}</span> },
            { key: 'reserved', header: 'Reserved', align: 'right', render: (v) => <span className="text-slate-400">{v as number}</span> },
            {
              key: 'available',
              header: 'Available',
              align: 'right',
              render: (_, row) => {
                const r = row as typeof stockLevels[0];
                return <span className="text-white font-medium">{r.quantity - r.reserved}</span>;
              }
            },
            { key: 'reorderPoint', header: 'Reorder Point', align: 'right', render: (v) => <span className="text-slate-400">{v as number}</span> },
            {
              key: 'status',
              header: 'Status',
              render: (v) => {
                const status = v as string;
                return (
                  <StatusBadge
                    status={status === 'out' ? 'Out of Stock' : status}
                    variant={getStockStatus(status)}
                  />
                );
              }
            },
          ]}
          data={stockLevels}
          getRowKey={(row) => (row as typeof stockLevels[0]).sku}
        />
      )}

      {/* Aging Tab */}
      {activeTab === 'aging' && (
        <div className="space-y-6">
          <DataTable
            title="Inventory Aging Report"
            subtitle="Distribution of inventory by age"
            columns={[
              { key: 'range', header: 'Age Range', render: (v) => <span className="text-white font-medium">{v as string}</span> },
              { key: 'units', header: 'Units', align: 'right', render: (v) => <span className="text-white">{(v as number).toLocaleString()}</span> },
              { key: 'value', header: 'Value', align: 'right', render: (v) => <span className="text-white">{formatCurrency(v as number)}</span> },
              { key: 'percentage', header: '% of Total', align: 'right', render: (v) => <span className="text-slate-300">{v as number}%</span> },
              {
                key: 'distribution',
                header: 'Distribution',
                render: (_, row) => {
                  const r = row as typeof agingReport[0];
                  const color = r.range === '0-30 days' ? 'bg-emerald-500' :
                    r.range === '31-60 days' ? 'bg-blue-500' :
                    r.range === '61-90 days' ? 'bg-amber-500' : 'bg-red-500';
                  return (
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className={`h-2 rounded-full ${color}`} style={{ width: `${r.percentage}%` }}></div>
                    </div>
                  );
                }
              },
            ]}
            data={agingReport}
            getRowKey={(row) => (row as typeof agingReport[0]).range}
          />

          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <i className="fas fa-exclamation-triangle text-amber-400 mt-0.5"></i>
              <div>
                <div className="text-sm font-medium text-white">Aging Inventory Alert</div>
                <div className="text-xs text-slate-400 mt-1">
                  {formatCurrency(15800)} worth of inventory ({agingReport[4].units.toLocaleString()} units) is over 180 days old. Consider running promotions or liquidation to reduce carrying costs.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Location Tab */}
      {activeTab === 'location' && (
        <div className="space-y-6">
          <MetricCardGrid columns={3}>
            {locationSummary.map(loc => (
              <div key={loc.location} className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-warehouse text-purple-400"></i>
                  </div>
                  <div className="text-white font-medium">{loc.location}</div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-lg font-bold text-white">{loc.skus}</div>
                    <div className="text-xs text-slate-400">SKUs</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{loc.units.toLocaleString()}</div>
                    <div className="text-xs text-slate-400">Units</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-400">{formatCurrency(loc.value)}</div>
                    <div className="text-xs text-slate-400">Value</div>
                  </div>
                </div>
              </div>
            ))}
          </MetricCardGrid>

          <DataTable
            title="Location Summary"
            columns={[
              { key: 'location', header: 'Location', render: (v) => <span className="text-white font-medium">{v as string}</span> },
              { key: 'skus', header: 'SKUs', align: 'right', render: (v) => <span className="text-white">{v as number}</span> },
              { key: 'units', header: 'Units', align: 'right', render: (v) => <span className="text-white">{(v as number).toLocaleString()}</span> },
              { key: 'value', header: 'Value', align: 'right', render: (v) => <span className="text-blue-400">{formatCurrency(v as number)}</span> },
              {
                key: 'percentage',
                header: '% of Total',
                align: 'right',
                render: (_, row) => {
                  const r = row as typeof locationSummary[0];
                  return <span className="text-slate-300">{(r.value / inventoryMetrics.totalValue * 100).toFixed(1)}%</span>;
                }
              },
            ]}
            data={locationSummary}
            getRowKey={(row) => (row as typeof locationSummary[0]).location}
            footer={
              <tr>
                <td className="p-4 text-white font-semibold">Total</td>
                <td className="p-4 text-right text-white font-semibold">{inventoryMetrics.totalSKUs}</td>
                <td className="p-4 text-right text-white font-semibold">{inventoryMetrics.totalUnits.toLocaleString()}</td>
                <td className="p-4 text-right text-blue-400 font-semibold">{formatCurrency(inventoryMetrics.totalValue)}</td>
                <td className="p-4 text-right text-slate-300">100%</td>
              </tr>
            }
          />
        </div>
      )}

      {/* Movement Tab */}
      {activeTab === 'movement' && (
        <div className="space-y-6">
          <MetricCardGrid columns={4}>
            <MetricCard label="Received" value="+2,450 units" subtext="This period" variant="success" />
            <MetricCard label="Shipped" value="-1,890 units" subtext="This period" variant="error" />
            <MetricCard label="Adjustments" value="-45 units" subtext="This period" variant="warning" />
            <MetricCard label="Net Change" value="+515 units" subtext="This period" variant="info" />
          </MetricCardGrid>

          <ChartPlaceholder title="Movement History" type="bar" height="h-48" />
        </div>
      )}
    </div>
  );
}
