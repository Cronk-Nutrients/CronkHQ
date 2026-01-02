'use client';

import { useState } from 'react';
import Link from 'next/link';

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

export default function ReturnsReportsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [activeTab, setActiveTab] = useState<'overview' | 'reasons' | 'products' | 'channels' | 'recent'>('overview');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const handleExport = (format: 'csv' | 'xlsx' | 'pdf') => {
    alert(`Exporting Returns Report as ${format.toUpperCase()}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-500/20 text-emerald-400';
      case 'Approved': return 'bg-blue-500/20 text-blue-400';
      case 'Processing': return 'bg-amber-500/20 text-amber-400';
      case 'Pending': return 'bg-slate-500/20 text-slate-400';
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
          <span className="text-white">Returns Reports</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <i className="fas fa-rotate-left text-amber-400 text-xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Returns Reports</h1>
              <p className="text-slate-400">Return rates, reasons, and processing analytics</p>
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
          { id: 'reasons', label: 'By Reason', icon: 'fa-question-circle' },
          { id: 'products', label: 'By Product', icon: 'fa-box' },
          { id: 'channels', label: 'By Channel', icon: 'fa-store' },
          { id: 'recent', label: 'Recent Returns', icon: 'fa-list' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
              activeTab === tab.id
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
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
              <div className="text-sm text-slate-400 mb-1">Total Returns</div>
              <div className="text-2xl font-bold text-white">{returnMetrics.totalReturns}</div>
              <div className="text-xs text-slate-400 mt-1">This period</div>
            </div>
            <div className="bg-amber-500/10 backdrop-blur border border-amber-500/30 rounded-xl p-5">
              <div className="text-sm text-slate-400 mb-1">Return Rate</div>
              <div className="text-2xl font-bold text-amber-400">{returnMetrics.returnRate}%</div>
              <div className="text-xs text-slate-400 mt-1">Of total orders</div>
            </div>
            <div className="bg-red-500/10 backdrop-blur border border-red-500/30 rounded-xl p-5">
              <div className="text-sm text-slate-400 mb-1">Total Refunds</div>
              <div className="text-2xl font-bold text-red-400">{formatCurrency(returnMetrics.totalRefunds)}</div>
              <div className="text-xs text-slate-400 mt-1">Refunded amount</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="text-sm text-slate-400 mb-1">Avg Processing</div>
              <div className="text-2xl font-bold text-white">{returnMetrics.avgProcessingDays} days</div>
              <div className="text-xs text-slate-400 mt-1">Receipt to refund</div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
              <div className="text-sm text-slate-400 mb-1">Pending Returns</div>
              <div className="text-lg font-bold text-white">{returnMetrics.pendingReturns}</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
              <div className="text-sm text-slate-400 mb-1">Processed This Month</div>
              <div className="text-lg font-bold text-white">{returnMetrics.processedThisMonth}</div>
            </div>
            <div className="bg-emerald-500/10 backdrop-blur border border-emerald-500/30 rounded-xl p-4">
              <div className="text-sm text-slate-400 mb-1">Restock Rate</div>
              <div className="text-lg font-bold text-emerald-400">{returnMetrics.restockRate}%</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
              <div className="text-sm text-slate-400 mb-1">Restock Fees</div>
              <div className="text-lg font-bold text-emerald-400">{formatCurrency(returnMetrics.restockFees)}</div>
            </div>
          </div>

          {/* Quick Stats Visualization */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-4">Returns Trend</h3>
              <div className="h-48 flex items-center justify-center border border-slate-700 border-dashed rounded-lg">
                <div className="text-center text-slate-400">
                  <i className="fas fa-chart-line text-3xl mb-2"></i>
                  <p className="text-sm">Returns trend chart visualization</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-4">Reason Distribution</h3>
              <div className="h-48 flex items-center justify-center border border-slate-700 border-dashed rounded-lg">
                <div className="text-center text-slate-400">
                  <i className="fas fa-chart-pie text-3xl mb-2"></i>
                  <p className="text-sm">Reason pie chart visualization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reasons Tab */}
      {activeTab === 'reasons' && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h3 className="text-white font-semibold">Returns by Reason</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 text-left">
                <th className="p-4 text-slate-400 font-medium">Reason</th>
                <th className="p-4 text-slate-400 font-medium text-right">Count</th>
                <th className="p-4 text-slate-400 font-medium text-right">Percentage</th>
                <th className="p-4 text-slate-400 font-medium text-right">Refund Amount</th>
                <th className="p-4 text-slate-400 font-medium">Distribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {returnReasons.map(reason => (
                <tr key={reason.reason} className="hover:bg-slate-800/30">
                  <td className="p-4 text-white font-medium">{reason.reason}</td>
                  <td className="p-4 text-right text-white">{reason.count}</td>
                  <td className="p-4 text-right text-slate-300">{reason.percentage}%</td>
                  <td className="p-4 text-right text-red-400">{formatCurrency(reason.refundAmount)}</td>
                  <td className="p-4 w-48">
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-amber-500"
                        style={{ width: `${reason.percentage}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h3 className="text-white font-semibold">Returns by Product</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 text-left">
                <th className="p-4 text-slate-400 font-medium">Product</th>
                <th className="p-4 text-slate-400 font-medium text-right">Returns</th>
                <th className="p-4 text-slate-400 font-medium text-right">Sold Units</th>
                <th className="p-4 text-slate-400 font-medium text-right">Return Rate</th>
                <th className="p-4 text-slate-400 font-medium text-right">Refunds</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {returnsByProduct.map(product => (
                <tr key={product.sku} className="hover:bg-slate-800/30">
                  <td className="p-4">
                    <div className="text-white font-medium">{product.product}</div>
                    <div className="text-xs text-slate-400">{product.sku}</div>
                  </td>
                  <td className="p-4 text-right text-white">{product.returns}</td>
                  <td className="p-4 text-right text-slate-300">{product.soldUnits}</td>
                  <td className="p-4 text-right">
                    <span className={`px-2 py-1 rounded text-xs ${
                      product.returnRate < 5 ? 'bg-emerald-500/20 text-emerald-400' :
                      product.returnRate < 8 ? 'bg-amber-500/20 text-amber-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {product.returnRate}%
                    </span>
                  </td>
                  <td className="p-4 text-right text-red-400">{formatCurrency(product.refunds)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Channels Tab */}
      {activeTab === 'channels' && (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
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
          </div>
        </div>
      )}

      {/* Recent Returns Tab */}
      {activeTab === 'recent' && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h3 className="text-white font-semibold">Recent Returns</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 text-left">
                <th className="p-4 text-slate-400 font-medium">Return ID</th>
                <th className="p-4 text-slate-400 font-medium">Order</th>
                <th className="p-4 text-slate-400 font-medium">Product</th>
                <th className="p-4 text-slate-400 font-medium">Reason</th>
                <th className="p-4 text-slate-400 font-medium">Status</th>
                <th className="p-4 text-slate-400 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {recentReturns.map(ret => (
                <tr key={ret.id} className="hover:bg-slate-800/30">
                  <td className="p-4 text-white font-medium">{ret.id}</td>
                  <td className="p-4 text-blue-400">{ret.order}</td>
                  <td className="p-4 text-slate-300">{ret.product}</td>
                  <td className="p-4 text-slate-300">{ret.reason}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(ret.status)}`}>
                      {ret.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">{ret.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
