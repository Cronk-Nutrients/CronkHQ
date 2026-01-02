'use client';

import { useState } from 'react';
import Link from 'next/link';

const inventoryMetrics = {
  totalSKUs: 156,
  totalUnits: 24580,
  totalValue: 245800.00,
  lowStock: 12,
  outOfStock: 3,
  overstock: 8,
  turnoverRate: 4.2,
  avgDaysOnHand: 87,
};

const stockLevels = [
  { sku: 'CM-1000', name: 'CalMag Plus 1L', location: 'A1-01', quantity: 450, reserved: 25, reorderPoint: 100, status: 'healthy' },
  { sku: 'BB-500', name: 'Bloom Booster 500ml', location: 'A1-02', quantity: 380, reserved: 15, reorderPoint: 80, status: 'healthy' },
  { sku: 'GF-1000', name: 'Grow Formula 1L', location: 'A2-01', quantity: 85, reserved: 10, reorderPoint: 100, status: 'low' },
  { sku: 'RE-250', name: 'Root Enhancer 250ml', location: 'A2-02', quantity: 0, reserved: 0, reorderPoint: 50, status: 'out' },
  { sku: 'MN-500', name: 'Micro Nutrients 500ml', location: 'B1-01', quantity: 520, reserved: 8, reorderPoint: 60, status: 'overstock' },
  { sku: 'PK-1000', name: 'PK Booster 1L', location: 'B1-02', quantity: 42, reserved: 5, reorderPoint: 50, status: 'low' },
  { sku: 'FS-500', name: 'Fish Emulsion 500ml', location: 'B2-01', quantity: 180, reserved: 12, reorderPoint: 40, status: 'healthy' },
];

const agingReport = [
  { range: '0-30 days', units: 8500, value: 85000.00, percentage: 34.6 },
  { range: '31-60 days', units: 6200, value: 62000.00, percentage: 25.2 },
  { range: '61-90 days', units: 4800, value: 48000.00, percentage: 19.5 },
  { range: '91-180 days', units: 3500, value: 35000.00, percentage: 14.2 },
  { range: '180+ days', units: 1580, value: 15800.00, percentage: 6.5 },
];

const locationSummary = [
  { location: 'Warehouse A', skus: 85, units: 12500, value: 125000.00 },
  { location: 'Warehouse B', skus: 45, units: 8200, value: 82000.00 },
  { location: 'FBA Inventory', skus: 26, units: 3880, value: 38800.00 },
];

export default function InventoryReportsPage() {
  const [dateRange, setDateRange] = useState('current');
  const [activeTab, setActiveTab] = useState<'overview' | 'levels' | 'aging' | 'location' | 'movement'>('overview');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const handleExport = (format: 'csv' | 'xlsx' | 'pdf') => {
    alert(`Exporting Inventory Report as ${format.toUpperCase()}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-emerald-500/20 text-emerald-400';
      case 'low': return 'bg-amber-500/20 text-amber-400';
      case 'out': return 'bg-red-500/20 text-red-400';
      case 'overstock': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
          <Link href="/reports" className="hover:text-white">Reports</Link>
          <i className="fas fa-chevron-right text-xs"></i>
          <span className="text-white">Inventory Reports</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <i className="fas fa-boxes-stacked text-blue-400 text-xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Inventory Reports</h1>
              <p className="text-slate-400">Stock levels, movement, valuation, and forecasting</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm"
            >
              <option value="current">Current Snapshot</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-lg p-1">
              <button onClick={() => handleExport('csv')} className="px-3 py-1.5 hover:bg-slate-700 text-slate-300 rounded text-sm">CSV</button>
              <button onClick={() => handleExport('xlsx')} className="px-3 py-1.5 hover:bg-slate-700 text-slate-300 rounded text-sm">Excel</button>
              <button onClick={() => handleExport('pdf')} className="px-3 py-1.5 hover:bg-slate-700 text-slate-300 rounded text-sm">PDF</button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-700 pb-4">
        {[
          { id: 'overview', label: 'Overview', icon: 'fa-chart-pie' },
          { id: 'levels', label: 'Stock Levels', icon: 'fa-boxes' },
          { id: 'aging', label: 'Aging Report', icon: 'fa-clock' },
          { id: 'location', label: 'By Location', icon: 'fa-warehouse' },
          { id: 'movement', label: 'Movement', icon: 'fa-arrow-right-arrow-left' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <i className={`fas ${tab.icon}`}></i>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="text-sm text-slate-400 mb-1">Total SKUs</div>
              <div className="text-2xl font-bold text-white">{inventoryMetrics.totalSKUs}</div>
              <div className="text-xs text-slate-400 mt-1">Active products</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="text-sm text-slate-400 mb-1">Total Units</div>
              <div className="text-2xl font-bold text-white">{inventoryMetrics.totalUnits.toLocaleString()}</div>
              <div className="text-xs text-slate-400 mt-1">In stock</div>
            </div>
            <div className="bg-blue-500/10 backdrop-blur border border-blue-500/30 rounded-xl p-5">
              <div className="text-sm text-slate-400 mb-1">Inventory Value</div>
              <div className="text-2xl font-bold text-blue-400">{formatCurrency(inventoryMetrics.totalValue)}</div>
              <div className="text-xs text-slate-400 mt-1">At cost</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="text-sm text-slate-400 mb-1">Turnover Rate</div>
              <div className="text-2xl font-bold text-white">{inventoryMetrics.turnoverRate}x</div>
              <div className="text-xs text-slate-400 mt-1">Annual average</div>
            </div>
          </div>

          {/* Stock Status */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-emerald-500/10 backdrop-blur border border-emerald-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <i className="fas fa-check text-emerald-400"></i>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{inventoryMetrics.totalSKUs - inventoryMetrics.lowStock - inventoryMetrics.outOfStock - inventoryMetrics.overstock}</div>
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
          </div>

          {/* Charts Placeholder */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-4">Inventory Value Trend</h3>
              <div className="h-48 flex items-center justify-center border border-slate-700 border-dashed rounded-lg">
                <div className="text-center text-slate-400">
                  <i className="fas fa-chart-line text-3xl mb-2"></i>
                  <p className="text-sm">Value trend chart visualization</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-4">Stock Status Distribution</h3>
              <div className="h-48 flex items-center justify-center border border-slate-700 border-dashed rounded-lg">
                <div className="text-center text-slate-400">
                  <i className="fas fa-chart-pie text-3xl mb-2"></i>
                  <p className="text-sm">Status distribution chart</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stock Levels Tab */}
      {activeTab === 'levels' && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700 flex items-center justify-between">
            <h3 className="text-white font-semibold">Stock Levels by SKU</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded">Healthy</span>
              <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-400 rounded">Low</span>
              <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded">Out</span>
              <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">Overstock</span>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 text-left">
                <th className="p-4 text-slate-400 font-medium">Product</th>
                <th className="p-4 text-slate-400 font-medium">Location</th>
                <th className="p-4 text-slate-400 font-medium text-right">Quantity</th>
                <th className="p-4 text-slate-400 font-medium text-right">Reserved</th>
                <th className="p-4 text-slate-400 font-medium text-right">Available</th>
                <th className="p-4 text-slate-400 font-medium text-right">Reorder Point</th>
                <th className="p-4 text-slate-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {stockLevels.map(item => (
                <tr key={item.sku} className="hover:bg-slate-800/30">
                  <td className="p-4">
                    <div className="text-white font-medium">{item.name}</div>
                    <div className="text-xs text-slate-400">{item.sku}</div>
                  </td>
                  <td className="p-4 text-slate-300">{item.location}</td>
                  <td className="p-4 text-right text-white">{item.quantity}</td>
                  <td className="p-4 text-right text-slate-400">{item.reserved}</td>
                  <td className="p-4 text-right text-white font-medium">{item.quantity - item.reserved}</td>
                  <td className="p-4 text-right text-slate-400">{item.reorderPoint}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getStatusBadge(item.status)}`}>
                      {item.status === 'out' ? 'Out of Stock' : item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Aging Tab */}
      {activeTab === 'aging' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-700">
              <h3 className="text-white font-semibold">Inventory Aging Report</h3>
              <p className="text-sm text-slate-400">Distribution of inventory by age</p>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 text-left">
                  <th className="p-4 text-slate-400 font-medium">Age Range</th>
                  <th className="p-4 text-slate-400 font-medium text-right">Units</th>
                  <th className="p-4 text-slate-400 font-medium text-right">Value</th>
                  <th className="p-4 text-slate-400 font-medium text-right">% of Total</th>
                  <th className="p-4 text-slate-400 font-medium">Distribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {agingReport.map(range => (
                  <tr key={range.range} className="hover:bg-slate-800/30">
                    <td className="p-4 text-white font-medium">{range.range}</td>
                    <td className="p-4 text-right text-white">{range.units.toLocaleString()}</td>
                    <td className="p-4 text-right text-white">{formatCurrency(range.value)}</td>
                    <td className="p-4 text-right text-slate-300">{range.percentage}%</td>
                    <td className="p-4">
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            range.range === '0-30 days' ? 'bg-emerald-500' :
                            range.range === '31-60 days' ? 'bg-blue-500' :
                            range.range === '61-90 days' ? 'bg-amber-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${range.percentage}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
          <div className="grid grid-cols-3 gap-4">
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
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-700">
              <h3 className="text-white font-semibold">Location Summary</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 text-left">
                  <th className="p-4 text-slate-400 font-medium">Location</th>
                  <th className="p-4 text-slate-400 font-medium text-right">SKUs</th>
                  <th className="p-4 text-slate-400 font-medium text-right">Units</th>
                  <th className="p-4 text-slate-400 font-medium text-right">Value</th>
                  <th className="p-4 text-slate-400 font-medium text-right">% of Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {locationSummary.map(loc => (
                  <tr key={loc.location} className="hover:bg-slate-800/30">
                    <td className="p-4 text-white font-medium">{loc.location}</td>
                    <td className="p-4 text-right text-white">{loc.skus}</td>
                    <td className="p-4 text-right text-white">{loc.units.toLocaleString()}</td>
                    <td className="p-4 text-right text-blue-400">{formatCurrency(loc.value)}</td>
                    <td className="p-4 text-right text-slate-300">
                      {(loc.value / inventoryMetrics.totalValue * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t border-slate-700 bg-slate-800/50">
                <tr>
                  <td className="p-4 text-white font-semibold">Total</td>
                  <td className="p-4 text-right text-white font-semibold">{inventoryMetrics.totalSKUs}</td>
                  <td className="p-4 text-right text-white font-semibold">{inventoryMetrics.totalUnits.toLocaleString()}</td>
                  <td className="p-4 text-right text-blue-400 font-semibold">{formatCurrency(inventoryMetrics.totalValue)}</td>
                  <td className="p-4 text-right text-slate-300">100%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* Movement Tab */}
      {activeTab === 'movement' && (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-emerald-500/10 backdrop-blur border border-emerald-500/30 rounded-xl p-4">
              <div className="text-sm text-slate-400 mb-1">Received</div>
              <div className="text-xl font-bold text-emerald-400">+2,450 units</div>
              <div className="text-xs text-slate-400">This period</div>
            </div>
            <div className="bg-red-500/10 backdrop-blur border border-red-500/30 rounded-xl p-4">
              <div className="text-sm text-slate-400 mb-1">Shipped</div>
              <div className="text-xl font-bold text-red-400">-1,890 units</div>
              <div className="text-xs text-slate-400">This period</div>
            </div>
            <div className="bg-amber-500/10 backdrop-blur border border-amber-500/30 rounded-xl p-4">
              <div className="text-sm text-slate-400 mb-1">Adjustments</div>
              <div className="text-xl font-bold text-amber-400">-45 units</div>
              <div className="text-xs text-slate-400">This period</div>
            </div>
            <div className="bg-blue-500/10 backdrop-blur border border-blue-500/30 rounded-xl p-4">
              <div className="text-sm text-slate-400 mb-1">Net Change</div>
              <div className="text-xl font-bold text-blue-400">+515 units</div>
              <div className="text-xs text-slate-400">This period</div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
            <h3 className="text-white font-semibold mb-4">Movement History</h3>
            <div className="h-48 flex items-center justify-center border border-slate-700 border-dashed rounded-lg">
              <div className="text-center text-slate-400">
                <i className="fas fa-chart-bar text-3xl mb-2"></i>
                <p className="text-sm">Movement history chart visualization</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
