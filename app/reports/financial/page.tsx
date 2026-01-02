'use client';

import { useState } from 'react';
import Link from 'next/link';

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

const monthlyPnL = [
  { month: 'Jan', revenue: 45000, cogs: 18000, profit: 12000 },
  { month: 'Feb', revenue: 48000, cogs: 19200, profit: 13500 },
  { month: 'Mar', revenue: 52000, cogs: 20800, profit: 15200 },
  { month: 'Apr', revenue: 49000, cogs: 19600, profit: 14000 },
  { month: 'May', revenue: 55000, cogs: 22000, profit: 16500 },
  { month: 'Jun', revenue: 58000, cogs: 23200, profit: 17800 },
];

export default function FinancialReportsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [activeTab, setActiveTab] = useState<'overview' | 'pnl' | 'fees' | 'margins' | 'cashflow'>('overview');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const handleExport = (format: 'csv' | 'xlsx' | 'pdf') => {
    alert(`Exporting Financial Report as ${format.toUpperCase()}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
          <Link href="/reports" className="hover:text-white">Reports</Link>
          <i className="fas fa-chevron-right text-xs"></i>
          <span className="text-white">Financial Reports</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
              <i className="fas fa-dollar-sign text-cyan-400 text-xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Financial Reports</h1>
              <p className="text-slate-400">P&L, margins, fees, and profitability analysis</p>
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
          { id: 'pnl', label: 'P&L Statement', icon: 'fa-file-invoice-dollar' },
          { id: 'fees', label: 'Platform Fees', icon: 'fa-percentage' },
          { id: 'margins', label: 'Margin Analysis', icon: 'fa-chart-line' },
          { id: 'cashflow', label: 'Cash Flow', icon: 'fa-money-bill-wave' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
              activeTab === tab.id
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
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
              <div className="text-sm text-slate-400 mb-1">Net Revenue</div>
              <div className="text-2xl font-bold text-white">{formatCurrency(financialMetrics.netRevenue)}</div>
              <div className="text-xs text-emerald-400 mt-1">
                <i className="fas fa-arrow-up mr-1"></i>12.5% vs last period
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="text-sm text-slate-400 mb-1">Gross Profit</div>
              <div className="text-2xl font-bold text-emerald-400">{formatCurrency(financialMetrics.grossProfit)}</div>
              <div className="text-xs text-slate-400 mt-1">{financialMetrics.grossMargin}% margin</div>
            </div>
            <div className="bg-cyan-500/10 backdrop-blur border border-cyan-500/30 rounded-xl p-5">
              <div className="text-sm text-slate-400 mb-1">Net Profit</div>
              <div className="text-2xl font-bold text-cyan-400">{formatCurrency(financialMetrics.netProfit)}</div>
              <div className="text-xs text-slate-400 mt-1">{financialMetrics.netMargin}% margin</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="text-sm text-slate-400 mb-1">Operating Expenses</div>
              <div className="text-2xl font-bold text-white">{formatCurrency(financialMetrics.operatingExpenses)}</div>
              <div className="text-xs text-slate-400 mt-1">Overhead costs</div>
            </div>
          </div>

          {/* Revenue & Cost Breakdown */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-4">Revenue Breakdown</h3>
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
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-4">Cost Breakdown</h3>
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
            </div>
          </div>
        </div>
      )}

      {/* P&L Statement Tab */}
      {activeTab === 'pnl' && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h3 className="text-white font-semibold">Profit & Loss Statement</h3>
            <p className="text-sm text-slate-400">Period: Last 30 Days</p>
          </div>
          <div className="divide-y divide-slate-700/50">
            {/* Revenue Section */}
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

            {/* COGS Section */}
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

            {/* Operating Expenses */}
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

            {/* Net Profit */}
            <div className="p-4 flex items-center justify-between bg-cyan-500/10">
              <span className="text-cyan-400 font-bold text-lg">Net Profit</span>
              <span className="text-cyan-400 font-bold text-lg">{formatCurrency(financialMetrics.netProfit)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Platform Fees Tab */}
      {activeTab === 'fees' && (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            {platformFees.map(platform => (
              <div key={platform.platform} className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    platform.platform === 'Shopify' ? 'bg-green-500/20 text-green-400' :
                    platform.platform.includes('Amazon') ? 'bg-orange-500/20 text-orange-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    <i className={`${
                      platform.platform === 'Shopify' ? 'fab fa-shopify' :
                      platform.platform.includes('Amazon') ? 'fab fa-amazon' :
                      'fas fa-store'
                    }`}></i>
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
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-700">
              <h3 className="text-white font-semibold">Platform Fee Comparison</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 text-left">
                  <th className="p-4 text-slate-400 font-medium">Platform</th>
                  <th className="p-4 text-slate-400 font-medium text-right">Revenue</th>
                  <th className="p-4 text-slate-400 font-medium text-right">Fees</th>
                  <th className="p-4 text-slate-400 font-medium text-right">Fee Rate</th>
                  <th className="p-4 text-slate-400 font-medium text-right">Net After Fees</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {platformFees.map(platform => (
                  <tr key={platform.platform} className="hover:bg-slate-800/30">
                    <td className="p-4 text-white font-medium">{platform.platform}</td>
                    <td className="p-4 text-right text-white">{formatCurrency(platform.revenue)}</td>
                    <td className="p-4 text-right text-red-400">{formatCurrency(platform.fees)}</td>
                    <td className="p-4 text-right">
                      <span className={`px-2 py-1 rounded text-xs ${
                        platform.feeRate < 5 ? 'bg-emerald-500/20 text-emerald-400' :
                        platform.feeRate < 10 ? 'bg-amber-500/20 text-amber-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {platform.feeRate}%
                      </span>
                    </td>
                    <td className="p-4 text-right text-emerald-400">{formatCurrency(platform.revenue - platform.fees)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t border-slate-700 bg-slate-800/50">
                <tr>
                  <td className="p-4 text-white font-semibold">Total</td>
                  <td className="p-4 text-right text-white font-semibold">{formatCurrency(platformFees.reduce((sum, p) => sum + p.revenue, 0))}</td>
                  <td className="p-4 text-right text-red-400 font-semibold">{formatCurrency(platformFees.reduce((sum, p) => sum + p.fees, 0))}</td>
                  <td className="p-4"></td>
                  <td className="p-4 text-right text-emerald-400 font-semibold">
                    {formatCurrency(platformFees.reduce((sum, p) => sum + p.revenue - p.fees, 0))}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* Margins Tab */}
      {activeTab === 'margins' && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
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
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
            <h3 className="text-white font-semibold mb-4">Margin Trend</h3>
            <div className="h-48 flex items-center justify-center border border-slate-700 border-dashed rounded-lg">
              <div className="text-center text-slate-400">
                <i className="fas fa-chart-line text-3xl mb-2"></i>
                <p className="text-sm">Margin trend chart visualization</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cash Flow Tab */}
      {activeTab === 'cashflow' && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-emerald-500/10 backdrop-blur border border-emerald-500/30 rounded-xl p-5">
              <div className="text-sm text-slate-400 mb-1">Cash In</div>
              <div className="text-2xl font-bold text-emerald-400">{formatCurrency(153360)}</div>
              <div className="text-xs text-slate-400 mt-1">Revenue collected</div>
            </div>
            <div className="bg-red-500/10 backdrop-blur border border-red-500/30 rounded-xl p-5">
              <div className="text-sm text-slate-400 mb-1">Cash Out</div>
              <div className="text-2xl font-bold text-red-400">{formatCurrency(91212)}</div>
              <div className="text-xs text-slate-400 mt-1">Expenses paid</div>
            </div>
            <div className="bg-cyan-500/10 backdrop-blur border border-cyan-500/30 rounded-xl p-5">
              <div className="text-sm text-slate-400 mb-1">Net Cash Flow</div>
              <div className="text-2xl font-bold text-cyan-400">{formatCurrency(62148)}</div>
              <div className="text-xs text-slate-400 mt-1">This period</div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
            <h3 className="text-white font-semibold mb-4">Cash Flow Trend</h3>
            <div className="h-48 flex items-center justify-center border border-slate-700 border-dashed rounded-lg">
              <div className="text-center text-slate-400">
                <i className="fas fa-chart-bar text-3xl mb-2"></i>
                <p className="text-sm">Cash flow chart visualization</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
