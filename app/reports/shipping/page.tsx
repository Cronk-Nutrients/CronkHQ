'use client';

import { useState } from 'react';
import Link from 'next/link';

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

export default function ShippingReportsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [activeTab, setActiveTab] = useState<'overview' | 'carrier' | 'service' | 'delivery' | 'issues'>('overview');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const handleExport = (format: 'csv' | 'xlsx' | 'pdf') => {
    alert(`Exporting Shipping Report as ${format.toUpperCase()}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
          <Link href="/reports" className="hover:text-white">Reports</Link>
          <i className="fas fa-chevron-right text-xs"></i>
          <span className="text-white">Shipping Reports</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <i className="fas fa-truck-fast text-purple-400 text-xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Shipping Reports</h1>
              <p className="text-slate-400">Fulfillment metrics, carrier performance, and costs</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="ytd">Year to Date</option>
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
          { id: 'carrier', label: 'By Carrier', icon: 'fa-building' },
          { id: 'service', label: 'By Service', icon: 'fa-layer-group' },
          { id: 'delivery', label: 'Delivery Times', icon: 'fa-clock' },
          { id: 'issues', label: 'Issues', icon: 'fa-exclamation-triangle' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
              activeTab === tab.id
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
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
              <div className="text-sm text-slate-400 mb-1">Total Shipments</div>
              <div className="text-2xl font-bold text-white">{shippingMetrics.totalShipments.toLocaleString()}</div>
              <div className="text-xs text-emerald-400 mt-1">
                <i className="fas fa-arrow-up mr-1"></i>8.3% vs last period
              </div>
            </div>
            <div className="bg-emerald-500/10 backdrop-blur border border-emerald-500/30 rounded-xl p-5">
              <div className="text-sm text-slate-400 mb-1">On-Time Delivery</div>
              <div className="text-2xl font-bold text-emerald-400">{shippingMetrics.onTimeDelivery}%</div>
              <div className="text-xs text-slate-400 mt-1">Target: 95%</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="text-sm text-slate-400 mb-1">Avg Delivery Time</div>
              <div className="text-2xl font-bold text-white">{shippingMetrics.avgDeliveryDays} days</div>
              <div className="text-xs text-slate-400 mt-1">Door to door</div>
            </div>
            <div className="bg-purple-500/10 backdrop-blur border border-purple-500/30 rounded-xl p-5">
              <div className="text-sm text-slate-400 mb-1">Shipping Profit</div>
              <div className="text-2xl font-bold text-purple-400">{formatCurrency(shippingMetrics.shippingProfit)}</div>
              <div className="text-xs text-slate-400 mt-1">
                {((shippingMetrics.shippingProfit / shippingMetrics.totalShippingRevenue) * 100).toFixed(1)}% margin
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
              <div className="text-sm text-slate-400 mb-1">Shipping Revenue</div>
              <div className="text-xl font-bold text-white">{formatCurrency(shippingMetrics.totalShippingRevenue)}</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
              <div className="text-sm text-slate-400 mb-1">Shipping Cost</div>
              <div className="text-xl font-bold text-red-400">{formatCurrency(shippingMetrics.totalShippingCost)}</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
              <div className="text-sm text-slate-400 mb-1">Avg Cost/Shipment</div>
              <div className="text-xl font-bold text-white">{formatCurrency(shippingMetrics.avgCostPerShipment)}</div>
            </div>
          </div>
        </div>
      )}

      {/* Carrier Tab */}
      {activeTab === 'carrier' && (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            {carrierPerformance.map(carrier => (
              <div key={carrier.carrier} className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    carrier.carrier === 'USPS' ? 'bg-blue-500/20 text-blue-400' :
                    carrier.carrier === 'UPS' ? 'bg-amber-500/20 text-amber-400' :
                    carrier.carrier === 'FedEx' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
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
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 text-left">
                  <th className="p-4 text-slate-400 font-medium">Carrier</th>
                  <th className="p-4 text-slate-400 font-medium text-right">Shipments</th>
                  <th className="p-4 text-slate-400 font-medium text-right">On-Time %</th>
                  <th className="p-4 text-slate-400 font-medium text-right">Avg Days</th>
                  <th className="p-4 text-slate-400 font-medium text-right">Cost</th>
                  <th className="p-4 text-slate-400 font-medium text-right">Revenue</th>
                  <th className="p-4 text-slate-400 font-medium text-right">Profit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {carrierPerformance.map(carrier => (
                  <tr key={carrier.carrier} className="hover:bg-slate-800/30">
                    <td className="p-4 text-white font-medium">{carrier.carrier}</td>
                    <td className="p-4 text-right text-white">{carrier.shipments}</td>
                    <td className="p-4 text-right">
                      <span className={`px-2 py-1 rounded text-xs ${
                        carrier.onTime >= 96 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {carrier.onTime}%
                      </span>
                    </td>
                    <td className="p-4 text-right text-slate-300">{carrier.avgDays} days</td>
                    <td className="p-4 text-right text-slate-300">{formatCurrency(carrier.cost)}</td>
                    <td className="p-4 text-right text-white">{formatCurrency(carrier.revenue)}</td>
                    <td className="p-4 text-right text-emerald-400">{formatCurrency(carrier.profit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Service Tab */}
      {activeTab === 'service' && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h3 className="text-white font-semibold">Service Level Breakdown</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 text-left">
                <th className="p-4 text-slate-400 font-medium">Service Level</th>
                <th className="p-4 text-slate-400 font-medium text-right">Shipments</th>
                <th className="p-4 text-slate-400 font-medium text-right">Avg Delivery</th>
                <th className="p-4 text-slate-400 font-medium text-right">Total Cost</th>
                <th className="p-4 text-slate-400 font-medium text-right">% of Total</th>
                <th className="p-4 text-slate-400 font-medium">Distribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {serviceBreakdown.map(service => (
                <tr key={service.service} className="hover:bg-slate-800/30">
                  <td className="p-4 text-white font-medium">{service.service}</td>
                  <td className="p-4 text-right text-white">{service.shipments}</td>
                  <td className="p-4 text-right text-slate-300">{service.avgDays} days</td>
                  <td className="p-4 text-right text-white">{formatCurrency(service.cost)}</td>
                  <td className="p-4 text-right text-slate-300">{service.percentage}%</td>
                  <td className="p-4 w-48">
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-purple-500"
                        style={{ width: `${service.percentage}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delivery Tab */}
      {activeTab === 'delivery' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-700">
              <h3 className="text-white font-semibold">Delivery Time Distribution</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 text-left">
                  <th className="p-4 text-slate-400 font-medium">Delivery Time</th>
                  <th className="p-4 text-slate-400 font-medium text-right">Shipments</th>
                  <th className="p-4 text-slate-400 font-medium text-right">Percentage</th>
                  <th className="p-4 text-slate-400 font-medium">Distribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {deliveryTimes.map(time => (
                  <tr key={time.range} className="hover:bg-slate-800/30">
                    <td className="p-4 text-white font-medium">{time.range}</td>
                    <td className="p-4 text-right text-white">{time.count}</td>
                    <td className="p-4 text-right text-slate-300">{time.percentage}%</td>
                    <td className="p-4 w-64">
                      <div className="w-full bg-slate-700 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${
                            time.range === '1 day' ? 'bg-emerald-500' :
                            time.range === '2 days' ? 'bg-blue-500' :
                            time.range === '3 days' ? 'bg-purple-500' :
                            time.range === '4 days' ? 'bg-amber-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${time.percentage}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Issues Tab */}
      {activeTab === 'issues' && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-red-500/10 backdrop-blur border border-red-500/30 rounded-xl p-4">
              <div className="text-sm text-slate-400 mb-1">Active Issues</div>
              <div className="text-2xl font-bold text-red-400">3</div>
            </div>
            <div className="bg-amber-500/10 backdrop-blur border border-amber-500/30 rounded-xl p-4">
              <div className="text-sm text-slate-400 mb-1">In Progress</div>
              <div className="text-2xl font-bold text-amber-400">2</div>
            </div>
            <div className="bg-emerald-500/10 backdrop-blur border border-emerald-500/30 rounded-xl p-4">
              <div className="text-sm text-slate-400 mb-1">Resolved This Month</div>
              <div className="text-2xl font-bold text-emerald-400">18</div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-700">
              <h3 className="text-white font-semibold">Recent Issues</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 text-left">
                  <th className="p-4 text-slate-400 font-medium">Tracking</th>
                  <th className="p-4 text-slate-400 font-medium">Carrier</th>
                  <th className="p-4 text-slate-400 font-medium">Issue</th>
                  <th className="p-4 text-slate-400 font-medium">Status</th>
                  <th className="p-4 text-slate-400 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {recentIssues.map((issue, i) => (
                  <tr key={i} className="hover:bg-slate-800/30">
                    <td className="p-4 text-white font-mono text-sm">{issue.tracking}</td>
                    <td className="p-4 text-slate-300">{issue.carrier}</td>
                    <td className="p-4 text-white">{issue.issue}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded text-xs bg-amber-500/20 text-amber-400">
                        {issue.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400">{issue.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
