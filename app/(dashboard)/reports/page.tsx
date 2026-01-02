'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Package,
  ShoppingCart,
  Download,
  FileText,
  Calendar,
  Store,
  Percent,
  Truck,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';

type DateRangeType = 'today' | 'wtd' | 'mtd' | 'ytd' | 'custom';
type ReportType = 'profitability' | 'channel' | 'product' | 'shipping';

export default function ReportsPage() {
  const { state } = useApp();
  const { addToast } = useToast();
  const [dateRange, setDateRange] = useState<DateRangeType>('mtd');
  const [customStart, setCustomStart] = useState<string>('');
  const [customEnd, setCustomEnd] = useState<string>('');
  const [currentReport, setCurrentReport] = useState<ReportType>('profitability');

  // Get date range bounds
  const getDateRange = () => {
    const now = new Date();
    let start: Date;
    let end: Date = new Date(now);
    end.setHours(23, 59, 59, 999);

    switch (dateRange) {
      case 'today':
        start = new Date(now);
        start.setHours(0, 0, 0, 0);
        break;
      case 'wtd':
        start = new Date(now);
        start.setDate(now.getDate() - now.getDay());
        start.setHours(0, 0, 0, 0);
        break;
      case 'mtd':
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'ytd':
        start = new Date(now.getFullYear(), 0, 1);
        break;
      case 'custom':
        start = customStart ? new Date(customStart) : new Date(now);
        end = customEnd ? new Date(customEnd) : new Date(now);
        end.setHours(23, 59, 59, 999);
        break;
      default:
        start = new Date(now);
    }

    return { start, end };
  };

  // Get orders in date range
  const ordersInRange = useMemo(() => {
    const { start, end } = getDateRange();
    return state.orders.filter(o => {
      const date = new Date(o.createdAt);
      return date >= start && date <= end && o.status !== 'cancelled';
    });
  }, [state.orders, dateRange, customStart, customEnd]);

  // Get shipments in date range
  const shipmentsInRange = useMemo(() => {
    const { start, end } = getDateRange();
    return state.shipments.filter(s => {
      const date = new Date(s.shippedAt);
      return date >= start && date <= end;
    });
  }, [state.shipments, dateRange, customStart, customEnd]);

  // Profitability stats
  const profitabilityStats = useMemo(() => {
    const totalRevenue = ordersInRange.reduce((sum, o) => sum + o.total, 0);
    const totalCOGS = ordersInRange.reduce((sum, o) => sum + o.cogs, 0);
    const grossProfit = ordersInRange.reduce((sum, o) => sum + o.profit, 0);
    const orderCount = ordersInRange.length;
    const avgOrderValue = orderCount > 0 ? totalRevenue / orderCount : 0;
    const avgMargin = orderCount > 0 ? ordersInRange.reduce((sum, o) => sum + o.margin, 0) / orderCount : 0;
    const shippingRevenue = ordersInRange.reduce((sum, o) => sum + (o.shipping || 0), 0);
    const shippingCost = shipmentsInRange.reduce((sum, s) => sum + s.actualCost, 0);
    const shippingProfit = shippingRevenue - shippingCost;
    const totalUnits = ordersInRange.reduce((sum, o) => sum + o.items.reduce((itemSum, i) => itemSum + i.quantity, 0), 0);

    return {
      totalRevenue,
      totalCOGS,
      grossProfit,
      orderCount,
      avgOrderValue,
      avgMargin,
      shippingRevenue,
      shippingCost,
      shippingProfit,
      totalUnits,
    };
  }, [ordersInRange, shipmentsInRange]);

  // Channel performance
  const channelStats = useMemo(() => {
    const byChannel: Record<string, { orders: number; revenue: number; cogs: number; profit: number; units: number }> = {};

    ordersInRange.forEach(o => {
      const channel = o.channel || 'direct';
      if (!byChannel[channel]) {
        byChannel[channel] = { orders: 0, revenue: 0, cogs: 0, profit: 0, units: 0 };
      }
      byChannel[channel].orders++;
      byChannel[channel].revenue += o.total;
      byChannel[channel].cogs += o.cogs;
      byChannel[channel].profit += o.profit;
      byChannel[channel].units += o.items.reduce((sum, i) => sum + i.quantity, 0);
    });

    return Object.entries(byChannel).map(([channel, data]) => ({
      channel,
      ...data,
      avgOrderValue: data.orders > 0 ? data.revenue / data.orders : 0,
      margin: data.revenue > 0 ? (data.profit / data.revenue) * 100 : 0,
    })).sort((a, b) => b.revenue - a.revenue);
  }, [ordersInRange]);

  // Product performance
  const productStats = useMemo(() => {
    const byProduct: Record<string, { productName: string; sku: string; unitsSold: number; revenue: number }> = {};

    ordersInRange.forEach(o => {
      o.items.forEach(item => {
        if (!byProduct[item.productId]) {
          byProduct[item.productId] = {
            productName: item.productName,
            sku: item.sku || '',
            unitsSold: 0,
            revenue: 0,
          };
        }
        byProduct[item.productId].unitsSold += item.quantity;
        byProduct[item.productId].revenue += item.price * item.quantity;
      });
    });

    return Object.entries(byProduct)
      .map(([productId, data]) => {
        const product = state.products.find(p => p.id === productId);
        const cost = (product?.cost.rolling || 0) * data.unitsSold;
        return {
          productId,
          ...data,
          cost,
          profit: data.revenue - cost,
          margin: data.revenue > 0 ? ((data.revenue - cost) / data.revenue) * 100 : 0,
        };
      })
      .sort((a, b) => b.revenue - a.revenue);
  }, [ordersInRange, state.products]);

  // Shipping stats
  const shippingStats = useMemo(() => {
    const byCarrier: Record<string, { shipments: number; revenue: number; cost: number; profit: number; weight: number }> = {};

    shipmentsInRange.forEach(s => {
      if (!byCarrier[s.carrier]) {
        byCarrier[s.carrier] = { shipments: 0, revenue: 0, cost: 0, profit: 0, weight: 0 };
      }
      byCarrier[s.carrier].shipments++;
      byCarrier[s.carrier].revenue += s.customerPaid;
      byCarrier[s.carrier].cost += s.actualCost;
      byCarrier[s.carrier].profit += s.profit;
      byCarrier[s.carrier].weight += s.weight;
    });

    return Object.entries(byCarrier).map(([carrier, data]) => ({
      carrier,
      ...data,
      margin: data.revenue > 0 ? (data.profit / data.revenue) * 100 : 0,
      avgWeight: data.shipments > 0 ? data.weight / data.shipments : 0,
      avgCost: data.shipments > 0 ? data.cost / data.shipments : 0,
    })).sort((a, b) => b.shipments - a.shipments);
  }, [shipmentsInRange]);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  // Format number
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  // Export CSV
  const handleExportCSV = () => {
    let data: string[][] = [];
    let filename = '';

    if (currentReport === 'profitability') {
      data = [
        ['Metric', 'Value'],
        ['Total Revenue', profitabilityStats.totalRevenue.toFixed(2)],
        ['COGS', profitabilityStats.totalCOGS.toFixed(2)],
        ['Gross Profit', profitabilityStats.grossProfit.toFixed(2)],
        ['Order Count', profitabilityStats.orderCount.toString()],
        ['Avg Order Value', profitabilityStats.avgOrderValue.toFixed(2)],
        ['Avg Margin', profitabilityStats.avgMargin.toFixed(1) + '%'],
        ['Shipping Revenue', profitabilityStats.shippingRevenue.toFixed(2)],
        ['Shipping Cost', profitabilityStats.shippingCost.toFixed(2)],
        ['Shipping Profit', profitabilityStats.shippingProfit.toFixed(2)],
      ];
      filename = 'profitability-report';
    } else if (currentReport === 'channel') {
      data = [
        ['Channel', 'Orders', 'Revenue', 'COGS', 'Profit', 'Margin'],
        ...channelStats.map(c => [
          c.channel,
          c.orders.toString(),
          c.revenue.toFixed(2),
          c.cogs.toFixed(2),
          c.profit.toFixed(2),
          c.margin.toFixed(1) + '%',
        ]),
      ];
      filename = 'channel-report';
    } else if (currentReport === 'product') {
      data = [
        ['Product', 'SKU', 'Units Sold', 'Revenue', 'Cost', 'Profit', 'Margin'],
        ...productStats.map(p => [
          p.productName,
          p.sku,
          p.unitsSold.toString(),
          p.revenue.toFixed(2),
          p.cost.toFixed(2),
          p.profit.toFixed(2),
          p.margin.toFixed(1) + '%',
        ]),
      ];
      filename = 'product-report';
    } else {
      data = [
        ['Carrier', 'Shipments', 'Revenue', 'Cost', 'Profit', 'Margin', 'Avg Weight'],
        ...shippingStats.map(s => [
          s.carrier.toUpperCase(),
          s.shipments.toString(),
          s.revenue.toFixed(2),
          s.cost.toFixed(2),
          s.profit.toFixed(2),
          s.margin.toFixed(1) + '%',
          s.avgWeight.toFixed(1) + ' lbs',
        ]),
      ];
      filename = 'shipping-report';
    }

    const csv = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${dateRange}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    addToast('success', 'Report exported successfully');
  };

  // Export PDF placeholder
  const handleExportPDF = () => {
    addToast('info', 'PDF export coming soon!');
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'shopify':
        return <i className="fab fa-shopify text-green-400"></i>;
      case 'amazon_fba':
      case 'amazon_fbm':
        return <i className="fab fa-amazon text-orange-400"></i>;
      default:
        return <Store className="w-4 h-4 text-slate-400" />;
    }
  };

  const getChannelName = (channel: string) => {
    switch (channel) {
      case 'shopify':
        return 'Shopify';
      case 'amazon_fba':
        return 'Amazon FBA';
      case 'amazon_fbm':
        return 'Amazon FBM';
      default:
        return channel.charAt(0).toUpperCase() + channel.slice(1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <BarChart3 className="w-7 h-7 text-purple-400" />
            Reports
          </h1>
          <p className="text-sm text-slate-400">Analyze business performance and profitability</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Date Range Picker */}
          <div className="flex items-center bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-1">
            {(['today', 'wtd', 'mtd', 'ytd', 'custom'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                  dateRange === range
                    ? 'bg-purple-500/20 text-purple-300'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {range === 'custom' ? (
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Custom
                  </span>
                ) : (
                  range.toUpperCase()
                )}
              </button>
            ))}
          </div>
          {/* Export Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all"
            >
              <Download className="w-4 h-4" />
              CSV
            </button>
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all"
            >
              <FileText className="w-4 h-4" />
              PDF
            </button>
          </div>
        </div>
      </div>

      {/* Custom Date Range Inputs */}
      {dateRange === 'custom' && (
        <div className="flex items-center gap-4 p-4 bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg">
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-400">From:</label>
            <input
              type="date"
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
              className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-400">To:</label>
            <input
              type="date"
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
              className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50"
            />
          </div>
        </div>
      )}

      {/* Report Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-700/50 pb-4">
        {[
          { id: 'profitability', label: 'Profitability', icon: TrendingUp },
          { id: 'channel', label: 'Channel', icon: Store },
          { id: 'product', label: 'Product', icon: Package },
          { id: 'shipping', label: 'Shipping', icon: Truck },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentReport(tab.id as ReportType)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              currentReport === tab.id
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profitability Report */}
      {currentReport === 'profitability' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                <DollarSign className="w-4 h-4" />
                Total Revenue
              </div>
              <div className="text-3xl font-bold text-white">{formatCurrency(profitabilityStats.totalRevenue)}</div>
              <div className="text-sm text-slate-400 mt-1">{profitabilityStats.orderCount} orders</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                <Package className="w-4 h-4" />
                COGS
              </div>
              <div className="text-3xl font-bold text-white">{formatCurrency(profitabilityStats.totalCOGS)}</div>
              <div className="text-sm text-slate-400 mt-1">{formatNumber(profitabilityStats.totalUnits)} units sold</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/20 to-green-600/20 border border-emerald-500/30 rounded-xl p-5">
              <div className="flex items-center gap-2 text-emerald-400 text-sm mb-2">
                <TrendingUp className="w-4 h-4" />
                Gross Profit
              </div>
              <div className="text-3xl font-bold text-emerald-400">{formatCurrency(profitabilityStats.grossProfit)}</div>
              <div className="text-sm text-emerald-300 mt-1">{profitabilityStats.avgMargin.toFixed(1)}% margin</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                <ShoppingCart className="w-4 h-4" />
                Avg Order Value
              </div>
              <div className="text-3xl font-bold text-white">{formatCurrency(profitabilityStats.avgOrderValue)}</div>
              <div className="text-sm text-slate-400 mt-1">Per order average</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                <Truck className="w-4 h-4" />
                Shipping Profit
              </div>
              <div className={`text-3xl font-bold ${profitabilityStats.shippingProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {formatCurrency(profitabilityStats.shippingProfit)}
              </div>
              <div className="text-sm text-slate-400 mt-1">
                {formatCurrency(profitabilityStats.shippingRevenue)} revenue
              </div>
            </div>
          </div>

          {/* Profit Breakdown */}
          <div className="grid grid-cols-2 gap-6">
            {/* Revenue Breakdown */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Revenue Breakdown</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Product Revenue</span>
                  <span className="text-white font-medium">{formatCurrency(profitabilityStats.totalRevenue - profitabilityStats.shippingRevenue)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Shipping Revenue</span>
                  <span className="text-white font-medium">{formatCurrency(profitabilityStats.shippingRevenue)}</span>
                </div>
                <div className="border-t border-slate-700 pt-4 flex items-center justify-between">
                  <span className="text-white font-medium">Total Revenue</span>
                  <span className="text-white font-bold text-lg">{formatCurrency(profitabilityStats.totalRevenue)}</span>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Cost Breakdown</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Cost of Goods Sold</span>
                  <span className="text-white font-medium">{formatCurrency(profitabilityStats.totalCOGS)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Shipping Cost</span>
                  <span className="text-white font-medium">{formatCurrency(profitabilityStats.shippingCost)}</span>
                </div>
                <div className="border-t border-slate-700 pt-4 flex items-center justify-between">
                  <span className="text-white font-medium">Total Costs</span>
                  <span className="text-white font-bold text-lg">{formatCurrency(profitabilityStats.totalCOGS + profitabilityStats.shippingCost)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profit Summary */}
          <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-slate-400 text-sm mb-1">Net Profit (Products + Shipping)</div>
                <div className="text-4xl font-bold text-emerald-400">
                  {formatCurrency(profitabilityStats.grossProfit + profitabilityStats.shippingProfit)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-slate-400 text-sm mb-1">Overall Margin</div>
                <div className="text-3xl font-bold text-white">
                  {profitabilityStats.totalRevenue > 0
                    ? (((profitabilityStats.grossProfit + profitabilityStats.shippingProfit) / profitabilityStats.totalRevenue) * 100).toFixed(1)
                    : 0}%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Channel Report */}
      {currentReport === 'channel' && (
        <div className="space-y-6">
          {/* Channel Cards */}
          <div className="grid grid-cols-3 gap-4">
            {channelStats.slice(0, 3).map((channel) => (
              <Link
                key={channel.channel}
                href={`/orders?channel=${channel.channel}`}
                className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5 hover:bg-slate-700/50 hover:border-slate-600 transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center group-hover:bg-slate-600/50 transition-colors">
                    {getChannelIcon(channel.channel)}
                  </div>
                  <div>
                    <div className="text-white font-medium group-hover:text-emerald-300 transition-colors">{getChannelName(channel.channel)}</div>
                    <div className="text-xs text-slate-400">{channel.orders} orders</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-white">{formatCurrency(channel.revenue)}</div>
                    <div className="text-xs text-slate-400">Revenue</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-400">{formatCurrency(channel.profit)}</div>
                    <div className="text-xs text-slate-400">Profit</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center justify-between">
                  <div className="text-sm text-slate-400">Avg Order</div>
                  <div className="text-white font-medium">{formatCurrency(channel.avgOrderValue)}</div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-sm text-slate-400">Margin</div>
                  <div className={`font-medium ${channel.margin >= 30 ? 'text-emerald-400' : channel.margin >= 15 ? 'text-amber-400' : 'text-red-400'}`}>
                    {channel.margin.toFixed(1)}%
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Channel Table */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700/50">
              <h3 className="font-semibold text-white">Channel Performance Comparison</h3>
            </div>
            <table className="w-full">
              <thead className="bg-slate-800/50 border-b border-slate-700/50">
                <tr className="text-left text-xs text-slate-400 uppercase tracking-wider">
                  <th className="px-5 py-3 font-medium">Channel</th>
                  <th className="px-5 py-3 font-medium text-right">Orders</th>
                  <th className="px-5 py-3 font-medium text-right">Units</th>
                  <th className="px-5 py-3 font-medium text-right">Revenue</th>
                  <th className="px-5 py-3 font-medium text-right">COGS</th>
                  <th className="px-5 py-3 font-medium text-right">Profit</th>
                  <th className="px-5 py-3 font-medium text-right">Margin</th>
                  <th className="px-5 py-3 font-medium text-right">AOV</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {channelStats.map((channel) => (
                  <tr key={channel.channel} className="hover:bg-slate-700/30 transition-colors group">
                    <td className="px-5 py-4">
                      <Link href={`/orders?channel=${channel.channel}`} className="flex items-center gap-3 hover:text-emerald-300 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center group-hover:bg-slate-600/50 transition-colors">
                          {getChannelIcon(channel.channel)}
                        </div>
                        <span className="text-white font-medium group-hover:text-emerald-300 transition-colors">{getChannelName(channel.channel)}</span>
                      </Link>
                    </td>
                    <td className="px-5 py-4 text-right text-white">{channel.orders}</td>
                    <td className="px-5 py-4 text-right text-slate-300">{channel.units}</td>
                    <td className="px-5 py-4 text-right text-white font-medium">{formatCurrency(channel.revenue)}</td>
                    <td className="px-5 py-4 text-right text-slate-300">{formatCurrency(channel.cogs)}</td>
                    <td className="px-5 py-4 text-right text-emerald-400 font-medium">{formatCurrency(channel.profit)}</td>
                    <td className="px-5 py-4 text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        channel.margin >= 30 ? 'bg-emerald-500/20 text-emerald-400' :
                        channel.margin >= 15 ? 'bg-amber-500/20 text-amber-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {channel.margin.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right text-white">{formatCurrency(channel.avgOrderValue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Report */}
      {currentReport === 'product' && (
        <div className="space-y-6">
          {/* Top Products */}
          <div className="grid grid-cols-4 gap-4">
            {productStats.slice(0, 4).map((product, idx) => (
              <Link
                key={product.productId}
                href={`/inventory?search=${encodeURIComponent(product.sku)}`}
                className={`bg-slate-800/50 backdrop-blur border rounded-xl p-5 hover:bg-slate-700/50 transition-all group ${
                  idx === 0 ? 'border-amber-500/30 hover:border-amber-500/50' : 'border-slate-700/50 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  {idx === 0 && <span className="text-amber-400 text-xs">TOP SELLER</span>}
                  {idx > 0 && <span className="text-slate-500 text-xs">#{idx + 1}</span>}
                </div>
                <div className="text-white font-medium mb-1 truncate group-hover:text-emerald-300 transition-colors">{product.productName}</div>
                <div className="text-xs text-slate-400 mb-3">{product.sku}</div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xl font-bold text-white">{product.unitsSold}</div>
                    <div className="text-xs text-slate-500">Units</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-emerald-400">{formatCurrency(product.profit)}</div>
                    <div className="text-xs text-slate-500">Profit</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Product Table */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700/50 flex items-center justify-between">
              <h3 className="font-semibold text-white">Product Performance</h3>
              <span className="text-sm text-slate-400">{productStats.length} products sold</span>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              <table className="w-full">
                <thead className="bg-slate-800/50 border-b border-slate-700/50 sticky top-0">
                  <tr className="text-left text-xs text-slate-400 uppercase tracking-wider">
                    <th className="px-5 py-3 font-medium">Product</th>
                    <th className="px-5 py-3 font-medium text-right">Units Sold</th>
                    <th className="px-5 py-3 font-medium text-right">Revenue</th>
                    <th className="px-5 py-3 font-medium text-right">Cost</th>
                    <th className="px-5 py-3 font-medium text-right">Profit</th>
                    <th className="px-5 py-3 font-medium text-right">Margin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {productStats.map((product) => (
                    <tr key={product.productId} className="hover:bg-slate-700/30 transition-colors group">
                      <td className="px-5 py-4">
                        <Link href={`/inventory?search=${encodeURIComponent(product.sku)}`} className="block hover:text-emerald-300 transition-colors">
                          <div className="text-white font-medium group-hover:text-emerald-300 transition-colors">{product.productName}</div>
                          <div className="text-xs text-slate-400">{product.sku}</div>
                        </Link>
                      </td>
                      <td className="px-5 py-4 text-right text-white">{product.unitsSold}</td>
                      <td className="px-5 py-4 text-right text-white font-medium">{formatCurrency(product.revenue)}</td>
                      <td className="px-5 py-4 text-right text-slate-300">{formatCurrency(product.cost)}</td>
                      <td className="px-5 py-4 text-right text-emerald-400 font-medium">{formatCurrency(product.profit)}</td>
                      <td className="px-5 py-4 text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.margin >= 40 ? 'bg-emerald-500/20 text-emerald-400' :
                          product.margin >= 25 ? 'bg-amber-500/20 text-amber-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {product.margin.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Shipping Report */}
      {currentReport === 'shipping' && (
        <div className="space-y-6">
          {/* Shipping Summary */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                <Truck className="w-4 h-4" />
                Total Shipments
              </div>
              <div className="text-3xl font-bold text-white">{shipmentsInRange.length}</div>
              <div className="text-sm text-slate-400 mt-1">In period</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                <DollarSign className="w-4 h-4" />
                Shipping Revenue
              </div>
              <div className="text-3xl font-bold text-white">{formatCurrency(profitabilityStats.shippingRevenue)}</div>
              <div className="text-sm text-slate-400 mt-1">Customer paid</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                <Package className="w-4 h-4" />
                Shipping Cost
              </div>
              <div className="text-3xl font-bold text-white">{formatCurrency(profitabilityStats.shippingCost)}</div>
              <div className="text-sm text-slate-400 mt-1">Paid to carriers</div>
            </div>
            <div className={`rounded-xl p-5 ${profitabilityStats.shippingProfit >= 0 ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                <Percent className="w-4 h-4" />
                Shipping Profit
              </div>
              <div className={`text-3xl font-bold ${profitabilityStats.shippingProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {formatCurrency(profitabilityStats.shippingProfit)}
              </div>
              <div className="text-sm text-slate-400 mt-1">
                {profitabilityStats.shippingRevenue > 0
                  ? ((profitabilityStats.shippingProfit / profitabilityStats.shippingRevenue) * 100).toFixed(1)
                  : 0}% margin
              </div>
            </div>
          </div>

          {/* Carrier Performance Table */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700/50">
              <h3 className="font-semibold text-white">Carrier Performance</h3>
            </div>
            <table className="w-full">
              <thead className="bg-slate-800/50 border-b border-slate-700/50">
                <tr className="text-left text-xs text-slate-400 uppercase tracking-wider">
                  <th className="px-5 py-3 font-medium">Carrier</th>
                  <th className="px-5 py-3 font-medium text-right">Shipments</th>
                  <th className="px-5 py-3 font-medium text-right">Revenue</th>
                  <th className="px-5 py-3 font-medium text-right">Cost</th>
                  <th className="px-5 py-3 font-medium text-right">Profit</th>
                  <th className="px-5 py-3 font-medium text-right">Margin</th>
                  <th className="px-5 py-3 font-medium text-right">Avg Weight</th>
                  <th className="px-5 py-3 font-medium text-right">Avg Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {shippingStats.map((carrier) => (
                  <tr key={carrier.carrier} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-5 py-4">
                      <span className={`px-3 py-1 rounded text-sm font-medium ${
                        carrier.carrier === 'usps' ? 'bg-blue-500/20 text-blue-400' :
                        carrier.carrier === 'ups' ? 'bg-amber-500/20 text-amber-400' :
                        carrier.carrier === 'fedex' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-slate-500/20 text-slate-400'
                      }`}>
                        {carrier.carrier.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right text-white">{carrier.shipments}</td>
                    <td className="px-5 py-4 text-right text-white font-medium">{formatCurrency(carrier.revenue)}</td>
                    <td className="px-5 py-4 text-right text-slate-300">{formatCurrency(carrier.cost)}</td>
                    <td className="px-5 py-4 text-right text-emerald-400 font-medium">{formatCurrency(carrier.profit)}</td>
                    <td className="px-5 py-4 text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        carrier.margin >= 40 ? 'bg-emerald-500/20 text-emerald-400' :
                        carrier.margin >= 20 ? 'bg-amber-500/20 text-amber-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {carrier.margin.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right text-slate-300">{carrier.avgWeight.toFixed(1)} lbs</td>
                    <td className="px-5 py-4 text-right text-slate-300">{formatCurrency(carrier.avgCost)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {shippingStats.length === 0 && (
              <div className="p-8 text-center text-slate-400">
                <Truck className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No shipments in selected period</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {ordersInRange.length === 0 && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-12 text-center">
          <BarChart3 className="w-16 h-16 mx-auto mb-4 text-purple-400/30" />
          <h3 className="text-xl font-semibold text-white mb-2">No Data Available</h3>
          <p className="text-slate-400">No orders found for the selected date range. Try adjusting your date filters.</p>
        </div>
      )}
    </div>
  );
}
