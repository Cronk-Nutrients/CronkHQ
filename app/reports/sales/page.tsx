'use client';

import { useState } from 'react';
import Link from 'next/link';

const salesMetrics = {
  totalRevenue: 156780.00,
  totalOrders: 1245,
  avgOrderValue: 125.93,
  grossProfit: 62712.00,
  grossMargin: 40.0,
  refunds: 3420.00,
  netRevenue: 153360.00,
};

const dailySales = [
  { date: '2024-12-28', orders: 52, revenue: 6240.00, profit: 2496.00 },
  { date: '2024-12-27', orders: 48, revenue: 5760.00, profit: 2304.00 },
  { date: '2024-12-26', orders: 45, revenue: 5400.00, profit: 2160.00 },
  { date: '2024-12-25', orders: 28, revenue: 3360.00, profit: 1344.00 },
  { date: '2024-12-24', orders: 62, revenue: 7440.00, profit: 2976.00 },
  { date: '2024-12-23', orders: 55, revenue: 6600.00, profit: 2640.00 },
  { date: '2024-12-22', orders: 50, revenue: 6000.00, profit: 2400.00 },
];

const channelBreakdown = [
  { channel: 'Shopify', orders: 520, revenue: 62400.00, profit: 24960.00, share: 39.8 },
  { channel: 'Amazon FBA', orders: 380, revenue: 45600.00, profit: 13680.00, share: 29.1 },
  { channel: 'Amazon FBM', orders: 180, revenue: 21600.00, profit: 7560.00, share: 13.8 },
  { channel: 'Direct', orders: 165, revenue: 27180.00, profit: 16512.00, share: 17.3 },
];

const topProducts = [
  { name: 'CalMag Plus 1L', sku: 'CM-1000', unitsSold: 245, revenue: 12250.00, profit: 4900.00 },
  { name: 'Bloom Booster 500ml', sku: 'BB-500', unitsSold: 198, revenue: 9900.00, profit: 3960.00 },
  { name: 'Grow Formula 1L', sku: 'GF-1000', unitsSold: 156, revenue: 7800.00, profit: 3120.00 },
  { name: 'Root Enhancer 250ml', sku: 'RE-250', unitsSold: 142, revenue: 5680.00, profit: 2272.00 },
  { name: 'Micro Nutrients 500ml', sku: 'MN-500', unitsSold: 128, revenue: 6400.00, profit: 2560.00 },
];

const topCustomers = [
  { name: 'Green Thumb Gardens', orders: 24, revenue: 4800.00, avgOrder: 200.00 },
  { name: 'Hydro Supply Co', orders: 18, revenue: 3600.00, avgOrder: 200.00 },
  { name: 'Urban Farmers LLC', orders: 15, revenue: 2850.00, avgOrder: 190.00 },
  { name: 'Grow Tech Inc', orders: 12, revenue: 2400.00, avgOrder: 200.00 },
  { name: 'Plant Paradise', orders: 10, revenue: 1800.00, avgOrder: 180.00 },
];

export default function SalesReportsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [activeTab, setActiveTab] = useState<'overview' | 'daily' | 'channel' | 'product' | 'customer'>('overview');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const handleExport = (format: 'csv' | 'xlsx' | 'pdf') => {
    alert(`Exporting Sales Report as ${format.toUpperCase()}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
          <Link href="/reports" className="hover:text-white">Reports</Link>
          <i className="fas fa-chevron-right text-xs"></i>
          <span className="text-white">Sales Reports</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <i className="fas fa-chart-line text-emerald-400 text-xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Sales Reports</h1>
              <p className="text-slate-400">Revenue, orders, products, and customer analytics</p>
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
          { id: 'daily', label: 'Daily Sales', icon: 'fa-calendar-day' },
          { id: 'channel', label: 'By Channel', icon: 'fa-store' },
          { id: 'product', label: 'By Product', icon: 'fa-box' },
          { id: 'customer', label: 'By Customer', icon: 'fa-users' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
              activeTab === tab.id
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
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
              <div className="text-sm text-slate-400 mb-1">Total Revenue</div>
              <div className="text-2xl font-bold text-white">{formatCurrency(salesMetrics.totalRevenue)}</div>
              <div className="text-xs text-emerald-400 mt-1">
                <i className="fas fa-arrow-up mr-1"></i>12.5% vs last period
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="text-sm text-slate-400 mb-1">Total Orders</div>
              <div className="text-2xl font-bold text-white">{salesMetrics.totalOrders.toLocaleString()}</div>
              <div className="text-xs text-emerald-400 mt-1">
                <i className="fas fa-arrow-up mr-1"></i>8.2% vs last period
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="text-sm text-slate-400 mb-1">Avg Order Value</div>
              <div className="text-2xl font-bold text-white">{formatCurrency(salesMetrics.avgOrderValue)}</div>
              <div className="text-xs text-emerald-400 mt-1">
                <i className="fas fa-arrow-up mr-1"></i>3.8% vs last period
              </div>
            </div>
            <div className="bg-emerald-500/10 backdrop-blur border border-emerald-500/30 rounded-xl p-5">
              <div className="text-sm text-slate-400 mb-1">Gross Profit</div>
              <div className="text-2xl font-bold text-emerald-400">{formatCurrency(salesMetrics.grossProfit)}</div>
              <div className="text-xs text-slate-400 mt-1">
                {salesMetrics.grossMargin}% margin
              </div>
            </div>
          </div>

          {/* Charts Placeholder */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-4">Revenue Trend</h3>
              <div className="h-48 flex items-center justify-center border border-slate-700 border-dashed rounded-lg">
                <div className="text-center text-slate-400">
                  <i className="fas fa-chart-area text-3xl mb-2"></i>
                  <p className="text-sm">Revenue chart visualization</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-4">Channel Distribution</h3>
              <div className="h-48 flex items-center justify-center border border-slate-700 border-dashed rounded-lg">
                <div className="text-center text-slate-400">
                  <i className="fas fa-chart-pie text-3xl mb-2"></i>
                  <p className="text-sm">Channel pie chart visualization</p>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
            <h3 className="text-white font-semibold mb-4">Revenue Breakdown</h3>
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
          </div>
        </div>
      )}

      {/* Daily Sales Tab */}
      {activeTab === 'daily' && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h3 className="text-white font-semibold">Daily Sales Breakdown</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 text-left">
                <th className="p-4 text-slate-400 font-medium">Date</th>
                <th className="p-4 text-slate-400 font-medium text-right">Orders</th>
                <th className="p-4 text-slate-400 font-medium text-right">Revenue</th>
                <th className="p-4 text-slate-400 font-medium text-right">Profit</th>
                <th className="p-4 text-slate-400 font-medium text-right">Avg Order</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {dailySales.map(day => (
                <tr key={day.date} className="hover:bg-slate-800/30">
                  <td className="p-4 text-white">{day.date}</td>
                  <td className="p-4 text-right text-white">{day.orders}</td>
                  <td className="p-4 text-right text-white">{formatCurrency(day.revenue)}</td>
                  <td className="p-4 text-right text-emerald-400">{formatCurrency(day.profit)}</td>
                  <td className="p-4 text-right text-slate-300">{formatCurrency(day.revenue / day.orders)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t border-slate-700 bg-slate-800/50">
              <tr>
                <td className="p-4 text-white font-semibold">Total</td>
                <td className="p-4 text-right text-white font-semibold">{dailySales.reduce((sum, d) => sum + d.orders, 0)}</td>
                <td className="p-4 text-right text-white font-semibold">{formatCurrency(dailySales.reduce((sum, d) => sum + d.revenue, 0))}</td>
                <td className="p-4 text-right text-emerald-400 font-semibold">{formatCurrency(dailySales.reduce((sum, d) => sum + d.profit, 0))}</td>
                <td className="p-4"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/* Channel Tab */}
      {activeTab === 'channel' && (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
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
                <div className="text-sm text-slate-400">{channel.orders} orders • {channel.share}% of total</div>
                <div className="mt-3 pt-3 border-t border-slate-700">
                  <div className="text-sm text-emerald-400">Profit: {formatCurrency(channel.profit)}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 text-left">
                  <th className="p-4 text-slate-400 font-medium">Channel</th>
                  <th className="p-4 text-slate-400 font-medium text-right">Orders</th>
                  <th className="p-4 text-slate-400 font-medium text-right">Revenue</th>
                  <th className="p-4 text-slate-400 font-medium text-right">Profit</th>
                  <th className="p-4 text-slate-400 font-medium text-right">Share</th>
                  <th className="p-4 text-slate-400 font-medium text-right">Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {channelBreakdown.map(channel => (
                  <tr key={channel.channel} className="hover:bg-slate-800/30">
                    <td className="p-4 text-white font-medium">{channel.channel}</td>
                    <td className="p-4 text-right text-white">{channel.orders}</td>
                    <td className="p-4 text-right text-white">{formatCurrency(channel.revenue)}</td>
                    <td className="p-4 text-right text-emerald-400">{formatCurrency(channel.profit)}</td>
                    <td className="p-4 text-right text-slate-300">{channel.share}%</td>
                    <td className="p-4 text-right">
                      <span className={`px-2 py-1 rounded text-xs ${
                        (channel.profit / channel.revenue * 100) >= 40 ? 'bg-emerald-500/20 text-emerald-400' :
                        (channel.profit / channel.revenue * 100) >= 30 ? 'bg-amber-500/20 text-amber-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {(channel.profit / channel.revenue * 100).toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Tab */}
      {activeTab === 'product' && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h3 className="text-white font-semibold">Top Selling Products</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 text-left">
                <th className="p-4 text-slate-400 font-medium">Product</th>
                <th className="p-4 text-slate-400 font-medium text-right">Units Sold</th>
                <th className="p-4 text-slate-400 font-medium text-right">Revenue</th>
                <th className="p-4 text-slate-400 font-medium text-right">Profit</th>
                <th className="p-4 text-slate-400 font-medium text-right">Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {topProducts.map((product, i) => (
                <tr key={product.sku} className="hover:bg-slate-800/30">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {i === 0 && <span className="text-amber-400 text-xs font-medium">TOP</span>}
                      <div>
                        <div className="text-white font-medium">{product.name}</div>
                        <div className="text-xs text-slate-400">{product.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right text-white">{product.unitsSold}</td>
                  <td className="p-4 text-right text-white">{formatCurrency(product.revenue)}</td>
                  <td className="p-4 text-right text-emerald-400">{formatCurrency(product.profit)}</td>
                  <td className="p-4 text-right">
                    <span className="px-2 py-1 rounded text-xs bg-emerald-500/20 text-emerald-400">
                      {(product.profit / product.revenue * 100).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Customer Tab */}
      {activeTab === 'customer' && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h3 className="text-white font-semibold">Top Customers</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 text-left">
                <th className="p-4 text-slate-400 font-medium">Customer</th>
                <th className="p-4 text-slate-400 font-medium text-right">Orders</th>
                <th className="p-4 text-slate-400 font-medium text-right">Total Revenue</th>
                <th className="p-4 text-slate-400 font-medium text-right">Avg Order Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {topCustomers.map((customer, i) => (
                <tr key={customer.name} className="hover:bg-slate-800/30">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-slate-400">
                        {i + 1}
                      </div>
                      <div className="text-white font-medium">{customer.name}</div>
                    </div>
                  </td>
                  <td className="p-4 text-right text-white">{customer.orders}</td>
                  <td className="p-4 text-right text-emerald-400 font-medium">{formatCurrency(customer.revenue)}</td>
                  <td className="p-4 text-right text-slate-300">{formatCurrency(customer.avgOrder)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
