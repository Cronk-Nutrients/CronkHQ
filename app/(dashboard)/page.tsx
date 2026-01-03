'use client';

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  DollarSign,
  TrendingUp,
  Package,
  Target,
  Warehouse,
  Truck,
  Hand,
  Box,
  Tag,
  Check,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Factory,
  Layers,
  FileText,
  RefreshCw,
  Download,
  Calendar,
  Clock,
  Eye,
  Activity,
  MousePointer,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useDateRange } from '@/context/DateRangeContext';
import { useOrganization } from '@/context/OrganizationContext';
import { formatCurrency } from '@/data/mockData';
import { ChannelBadge, QueueStatusBadge } from '@/components/fulfillment/FulfillmentBadges';
import { ChannelCard, QuickActionCard } from '@/components/dashboard';

export default function Dashboard() {
  const router = useRouter();
  const { state } = useApp();
  const { dateRange, isInRange, getComparisonRange, preset } = useDateRange();
  const { organization } = useOrganization();

  // Google Analytics live data state
  const [liveAnalytics, setLiveAnalytics] = useState<{
    activeUsers: number;
    pageViews: number;
    events: number;
    isConnected: boolean;
    loading: boolean;
  }>({
    activeUsers: 0,
    pageViews: 0,
    events: 0,
    isConnected: false,
    loading: true,
  });

  // Fetch Google Analytics realtime data
  useEffect(() => {
    async function fetchLiveAnalytics() {
      if (!organization?.id) return;

      try {
        const response = await fetch('/api/google/analytics/realtime', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ organizationId: organization.id }),
        });

        const result = await response.json();

        if (result.success) {
          setLiveAnalytics({
            activeUsers: result.data.activeUsers,
            pageViews: result.data.screenPageViews,
            events: result.data.eventCount,
            isConnected: true,
            loading: false,
          });
        } else {
          setLiveAnalytics(prev => ({ ...prev, isConnected: false, loading: false }));
        }
      } catch (err) {
        setLiveAnalytics(prev => ({ ...prev, isConnected: false, loading: false }));
      }
    }

    fetchLiveAnalytics();
    // Refresh every 30 seconds
    const interval = setInterval(fetchLiveAnalytics, 30000);
    return () => clearInterval(interval);
  }, [organization?.id]);

  // Get the label for the previous comparison period
  const getPreviousPeriodLabel = () => {
    switch (preset) {
      case 'today':
        return 'Yesterday';
      case 'yesterday':
        return '2 Days Ago';
      case 'wtd':
        return 'Last Week';
      case 'mtd':
        return 'Last Month (same days)';
      case 'qtd':
        return 'Last Quarter (same days)';
      case 'ytd':
        return 'Last Year (same days)';
      case 'last7':
        return 'Previous 7 Days';
      case 'last30':
        return 'Previous 30 Days';
      case 'last90':
        return 'Previous 90 Days';
      case 'custom':
        return 'Previous Period';
      default:
        return 'Previous Period';
    }
  };

  // Helper to get total stock for a product
  const getTotalStock = (productId: string) => {
    return state.inventory
      .filter(inv => inv.productId === productId)
      .reduce((sum, inv) => sum + inv.quantity, 0);
  };

  // Calculate live dashboard stats from AppContext
  const dashboardStats = useMemo(() => {
    // Filter orders by selected date range
    const allPeriodOrders = state.orders.filter(o => isInRange(o.createdAt));
    // Exclude cancelled orders from revenue/profit calculations
    const periodOrders = allPeriodOrders.filter(o => o.status !== 'cancelled');
    // Count cancelled orders separately
    const cancelledOrders = allPeriodOrders.filter(o => o.status === 'cancelled');

    // Get comparison period for change calculation
    const compRange = getComparisonRange();
    const allCompOrders = compRange
      ? state.orders.filter(o => {
          const orderDate = new Date(o.createdAt);
          return orderDate >= compRange.startDate && orderDate <= compRange.endDate;
        })
      : [];
    // Exclude cancelled orders from comparison calculations
    const compOrders = allCompOrders.filter(o => o.status !== 'cancelled');
    const compCancelledOrders = allCompOrders.filter(o => o.status === 'cancelled');

    // Calculate period metrics (excluding cancelled)
    const periodRevenue = periodOrders.reduce((sum, o) => sum + o.total, 0);
    const periodProfit = periodOrders.reduce((sum, o) => sum + o.profit, 0);
    const compRevenue = compOrders.reduce((sum, o) => sum + o.total, 0);
    const compProfit = compOrders.reduce((sum, o) => sum + o.profit, 0);

    // Calculate cancelled order value (to show what was lost)
    const cancelledRevenue = cancelledOrders.reduce((sum, o) => sum + o.total, 0);
    const compCancelledRevenue = compCancelledOrders.reduce((sum, o) => sum + o.total, 0);

    // Calculate change percentages
    const revenueChange = compRevenue > 0 ? ((periodRevenue - compRevenue) / compRevenue) * 100 : 0;
    const profitChange = compProfit > 0 ? ((periodProfit - compProfit) / compProfit) * 100 : 0;
    const ordersChange = compOrders.length > 0 ? ((periodOrders.length - compOrders.length) / compOrders.length) * 100 : 0;
    const cancelledChange = compCancelledOrders.length > 0 ? ((cancelledOrders.length - compCancelledOrders.length) / compCancelledOrders.length) * 100 : 0;

    // Filter shipments by date range
    const periodShipments = state.shipments.filter(s => s.shippedAt && isInRange(s.shippedAt));

    return {
      toPick: state.orders.filter(o => o.status === 'to_pick').length,
      picking: state.orders.filter(o => o.status === 'picking').length,
      toPack: state.orders.filter(o => o.status === 'to_pack').length,
      packing: state.orders.filter(o => o.status === 'packing').length,
      readyToShip: state.orders.filter(o => o.status === 'ready').length,
      shippedInPeriod: periodShipments.length,
      periodRevenue,
      periodProfit,
      periodOrders: periodOrders.length,
      // Cancelled orders
      cancelledOrders: cancelledOrders.length,
      cancelledRevenue,
      compCancelledOrders: compCancelledOrders.length,
      compCancelledRevenue,
      cancelledChange,
      // Comparison period values
      compRevenue,
      compProfit,
      compOrders: compOrders.length,
      // Change percentages
      revenueChange,
      profitChange,
      ordersChange,
      lowStockCount: state.products.filter(p => {
        const stock = getTotalStock(p.id);
        return stock <= p.reorderPoint;
      }).length,
      outOfStockCount: state.products.filter(p => getTotalStock(p.id) === 0).length,
      totalProducts: state.products.length,
      totalInventoryValue: state.products.reduce((sum, p) => {
        return sum + (p.prices.msrp * getTotalStock(p.id));
      }, 0),
      totalCostValue: state.products.reduce((sum, p) => {
        return sum + (p.cost.rolling * getTotalStock(p.id));
      }, 0),
    };
  }, [state.orders, state.products, state.inventory, state.shipments, isInRange, getComparisonRange]);

  // Calculate inventory valuation by location
  const inventoryValuation = useMemo(() => {
    return state.locations.map(loc => {
      const locInventory = state.inventory.filter(inv => inv.locationId === loc.id);
      let unitCount = 0;
      let totalMsrpValue = 0;
      let totalCostValue = 0;

      locInventory.forEach(inv => {
        const product = state.products.find(p => p.id === inv.productId);
        if (product) {
          unitCount += inv.quantity;
          totalMsrpValue += product.prices.msrp * inv.quantity;
          totalCostValue += product.cost.rolling * inv.quantity;
        }
      });

      const unrealizedProfit = totalMsrpValue - totalCostValue;
      const margin = totalMsrpValue > 0 ? (unrealizedProfit / totalMsrpValue) * 100 : 0;

      return {
        locationId: loc.id,
        locationName: loc.name,
        type: loc.type,
        unitCount,
        totalMsrpValue,
        totalCostValue,
        unrealizedProfit,
        margin,
      };
    });
  }, [state.locations, state.inventory, state.products]);

  // Recent orders from AppContext
  const recentOrders = useMemo(() => {
    return [...state.orders]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }, [state.orders]);

  // Low stock products
  const lowStockProducts = useMemo(() => {
    return state.products
      .map(p => ({
        product: p,
        currentQty: getTotalStock(p.id),
        reorderPoint: p.reorderPoint,
      }))
      .filter(item => item.currentQty <= item.reorderPoint)
      .sort((a, b) => a.currentQty - b.currentQty)
      .slice(0, 4);
  }, [state.products, state.inventory]);

  // Bundle availability
  const bundleAvailability = useMemo(() => {
    return state.bundles.map(bundle => {
      let minAvailable = Infinity;
      let limitingItem = '';

      (bundle.components || []).forEach(comp => {
        const stock = getTotalStock(comp.productId);
        const canMake = Math.floor(stock / comp.quantity);
        if (canMake < minAvailable) {
          minAvailable = canMake;
          limitingItem = comp.productName;
        }
      });

      return {
        bundle,
        available: minAvailable === Infinity ? 0 : minAvailable,
        limitingItem,
      };
    });
  }, [state.bundles, state.inventory]);

  // Active work orders
  const activeWorkOrders = useMemo(() => {
    return state.workOrders
      .filter(wo => wo.status !== 'completed' && wo.status !== 'cancelled')
      .slice(0, 3);
  }, [state.workOrders]);

  // Expiring soon lots (within 30 days)
  const expiringSoonLots = useMemo(() => {
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    return state.lots
      .filter(lot => {
        if (lot.status !== 'active' || !lot.expirationDate) return false;
        const expDate = new Date(lot.expirationDate);
        return expDate > now && expDate <= thirtyDaysFromNow;
      })
      .sort((a, b) => new Date(a.expirationDate!).getTime() - new Date(b.expirationDate!).getTime())
      .slice(0, 4);
  }, [state.lots]);

  // Days until expiration helper
  const getDaysUntilExpiry = (date: Date) => {
    return Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  };

  // Calculate totals
  const totalInventoryValue = inventoryValuation.reduce((sum, loc) => sum + loc.totalMsrpValue, 0);
  const totalUnits = inventoryValuation.reduce((sum, loc) => sum + loc.unitCount, 0);
  const totalCostValue = inventoryValuation.reduce((sum, loc) => sum + loc.totalCostValue, 0);
  const totalUnrealizedProfit = inventoryValuation.reduce((sum, loc) => sum + loc.unrealizedProfit, 0);
  const avgMargin = totalInventoryValue > 0 ? ((totalUnrealizedProfit / totalInventoryValue) * 100) : 0;

  // Channel performance from orders
  const channelPerformance = useMemo(() => {
    // Filter orders by selected date range
    const periodOrders = state.orders.filter(o => isInRange(o.createdAt));

    const shopifyOrders = periodOrders.filter(o => o.channel === 'shopify');
    const amazonOrders = periodOrders.filter(o => o.channel === 'amazon_fba' || o.channel === 'amazon_fbm');

    const shopifyRevenue = shopifyOrders.reduce((sum, o) => sum + o.total, 0);
    const amazonRevenue = amazonOrders.reduce((sum, o) => sum + o.total, 0);
    const totalRevenue = shopifyRevenue + amazonRevenue;

    return {
      shopify: {
        orders: shopifyOrders.length,
        revenue: shopifyRevenue,
        profit: shopifyOrders.reduce((sum, o) => sum + o.profit, 0),
        pct: totalRevenue > 0 ? Math.round((shopifyRevenue / totalRevenue) * 100) : 0,
      },
      amazon: {
        orders: amazonOrders.length,
        revenue: amazonRevenue,
        profit: amazonOrders.reduce((sum, o) => sum + o.profit, 0),
        pct: totalRevenue > 0 ? Math.round((amazonRevenue / totalRevenue) * 100) : 0,
      },
    };
  }, [state.orders, isInRange]);

  const formatCurrencyPrecise = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="space-y-6">
      {/* Google Analytics Live Widget - Top of Page */}
      {liveAnalytics.isConnected && (
        <div className="rounded-xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <i className="fas fa-chart-simple text-orange-400"></i>
              </div>
              <div>
                <h3 className="font-semibold text-white">Google Analytics</h3>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-emerald-400">Live</span>
                </div>
              </div>
            </div>
            <Link
              href="/marketing/analytics"
              className="text-sm text-orange-400 hover:text-orange-300"
            >
              View Full Analytics
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-2">
                <Eye className="h-4 w-4" />
                <span>Active Users</span>
              </div>
              <div className="text-4xl font-bold text-orange-400">{liveAnalytics.activeUsers}</div>
              <div className="text-xs text-slate-500 mt-1">Right now</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-2">
                <Activity className="h-4 w-4" />
                <span>Page Views</span>
              </div>
              <div className="text-4xl font-bold text-white">{formatNumber(liveAnalytics.pageViews)}</div>
              <div className="text-xs text-slate-500 mt-1">Last 30 min</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-2">
                <MousePointer className="h-4 w-4" />
                <span>Events</span>
              </div>
              <div className="text-4xl font-bold text-white">{formatNumber(liveAnalytics.events)}</div>
              <div className="text-xs text-slate-500 mt-1">Last 30 min</div>
            </div>
          </div>
        </div>
      )}

      {/* Google Analytics Connect Prompt */}
      {!liveAnalytics.loading && !liveAnalytics.isConnected && (
        <Link
          href="/settings/integrations/google-analytics"
          className="block rounded-xl bg-slate-800/50 border border-slate-700/50 border-dashed p-5 hover:border-orange-500/30 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <i className="fas fa-chart-simple text-orange-400"></i>
              </div>
              <div>
                <h3 className="font-semibold text-white group-hover:text-orange-400 transition-colors">Connect Google Analytics</h3>
                <p className="text-sm text-slate-400">See live visitors, page views, and events</p>
              </div>
            </div>
            <i className="fas fa-arrow-right text-slate-500 group-hover:text-orange-400 transition-colors"></i>
          </div>
        </Link>
      )}

      {/* Key Financial Metrics - Row 1 */}
      <div className="grid grid-cols-4 gap-4">
        {/* Revenue */}
        <div className="rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 p-5">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
            <DollarSign className="h-4 w-4" />
            <span>{dateRange.label} Revenue</span>
          </div>
          <div className="text-3xl font-bold text-white">{formatCurrencyPrecise(dashboardStats.periodRevenue)}</div>
          <div className="flex items-center gap-2 text-sm mt-1">
            <span className="text-slate-400">{dashboardStats.periodOrders} orders</span>
            {dashboardStats.revenueChange !== 0 && (
              <span className={`flex items-center gap-0.5 ${dashboardStats.revenueChange > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {dashboardStats.revenueChange > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                {Math.abs(dashboardStats.revenueChange).toFixed(1)}%
              </span>
            )}
          </div>
          {/* Previous Period Comparison */}
          <div className="mt-3 pt-3 border-t border-slate-700/50">
            <div className="text-xs text-slate-500 mb-1">{getPreviousPeriodLabel()}</div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">{formatCurrencyPrecise(dashboardStats.compRevenue)}</span>
              <span className="text-xs text-slate-500">{dashboardStats.compOrders} orders</span>
            </div>
          </div>
        </div>

        {/* Gross Profit */}
        <div className="rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-600/20 border border-emerald-500/30 p-5">
          <div className="flex items-center gap-2 text-emerald-300 text-sm mb-2">
            <TrendingUp className="h-4 w-4" />
            <span>{dateRange.label} Profit</span>
          </div>
          <div className="text-3xl font-bold text-emerald-400">{formatCurrencyPrecise(dashboardStats.periodProfit)}</div>
          <div className="flex items-center gap-2 text-sm mt-1">
            <span className="text-slate-300">
              {dashboardStats.periodRevenue > 0
                ? ((dashboardStats.periodProfit / dashboardStats.periodRevenue) * 100).toFixed(1)
                : 0}% margin
            </span>
            {dashboardStats.profitChange !== 0 && (
              <span className={`flex items-center gap-0.5 ${dashboardStats.profitChange > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {dashboardStats.profitChange > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                {Math.abs(dashboardStats.profitChange).toFixed(1)}%
              </span>
            )}
          </div>
          {/* Previous Period Comparison */}
          <div className="mt-3 pt-3 border-t border-emerald-500/20">
            <div className="text-xs text-emerald-400/50 mb-1">{getPreviousPeriodLabel()}</div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-emerald-400/70">{formatCurrencyPrecise(dashboardStats.compProfit)}</span>
              <span className="text-xs text-emerald-400/50">
                {dashboardStats.compRevenue > 0
                  ? ((dashboardStats.compProfit / dashboardStats.compRevenue) * 100).toFixed(1)
                  : 0}% margin
              </span>
            </div>
          </div>
        </div>

        {/* Cancelled Orders */}
        <div className={`rounded-xl backdrop-blur border p-5 ${
          dashboardStats.cancelledOrders > 0
            ? 'bg-red-500/10 border-red-500/30'
            : 'bg-slate-800/50 border-slate-700/50'
        }`}>
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
            <XCircle className={`h-4 w-4 ${dashboardStats.cancelledOrders > 0 ? 'text-red-400' : ''}`} />
            <span>{dateRange.label} Cancelled</span>
          </div>
          <div className={`text-3xl font-bold ${dashboardStats.cancelledOrders > 0 ? 'text-red-400' : 'text-white'}`}>
            {dashboardStats.cancelledOrders}
          </div>
          <div className="flex items-center gap-2 text-sm mt-1">
            <span className={dashboardStats.cancelledRevenue > 0 ? 'text-red-400' : 'text-slate-400'}>
              {formatCurrencyPrecise(dashboardStats.cancelledRevenue)} lost
            </span>
            {dashboardStats.cancelledChange !== 0 && (
              <span className={`flex items-center gap-0.5 ${dashboardStats.cancelledChange < 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {dashboardStats.cancelledChange > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                {Math.abs(dashboardStats.cancelledChange).toFixed(1)}%
              </span>
            )}
          </div>
          {/* Previous Period */}
          {dashboardStats.compCancelledOrders > 0 && (
            <div className="mt-3 pt-3 border-t border-red-500/20">
              <div className="text-xs text-red-400/50 mb-1">{getPreviousPeriodLabel()}</div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-red-400/70">{dashboardStats.compCancelledOrders} cancelled</span>
                <span className="text-xs text-red-400/50">{formatCurrencyPrecise(dashboardStats.compCancelledRevenue)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Low Stock Alert */}
        <div className={`rounded-xl backdrop-blur border p-5 ${
          dashboardStats.lowStockCount > 0
            ? 'bg-amber-500/10 border-amber-500/30'
            : 'bg-slate-800/50 border-slate-700/50'
        }`}>
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
            <AlertTriangle className={`h-4 w-4 ${dashboardStats.lowStockCount > 0 ? 'text-amber-400' : ''}`} />
            <span>Low Stock Items</span>
          </div>
          <div className={`text-3xl font-bold ${dashboardStats.lowStockCount > 0 ? 'text-amber-400' : 'text-white'}`}>
            {dashboardStats.lowStockCount}
          </div>
          <div className="text-sm text-slate-400 mt-1">
            {dashboardStats.outOfStockCount > 0 && (
              <span className="text-red-400">{dashboardStats.outOfStockCount} out of stock</span>
            )}
            {dashboardStats.outOfStockCount === 0 && 'Below reorder point'}
          </div>
        </div>
      </div>

      {/* Shipping & Inventory Row */}
      <div className="grid grid-cols-4 gap-4">
        {/* Shipping Revenue */}
        <div className="rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 p-5">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
            <Truck className="h-4 w-4" />
            <span>{dateRange.label} Shipping Revenue</span>
          </div>
          <div className="text-3xl font-bold text-white">$0.00</div>
          <div className="text-sm text-slate-400 mt-1">Collected from orders</div>
        </div>

        {/* Shipping Cost */}
        <div className="rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 p-5">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
            <Truck className="h-4 w-4" />
            <span>{dateRange.label} Shipping Cost</span>
          </div>
          <div className="text-3xl font-bold text-white">$0.00</div>
          <div className="text-sm text-slate-500 mt-1">Connect shipping to track</div>
        </div>

        {/* Shipping Profit */}
        <div className="rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 p-5">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
            <TrendingUp className="h-4 w-4" />
            <span>Shipping Profit</span>
          </div>
          <div className="text-3xl font-bold text-emerald-400">$0.00</div>
          <div className="text-sm text-slate-400 mt-1">Revenue - Cost</div>
        </div>

        {/* Inventory Value */}
        <div className="rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 p-5">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
            <Package className="h-4 w-4" />
            <span>Inventory Value</span>
          </div>
          <div className="text-3xl font-bold text-white">{formatCurrency(totalInventoryValue)}</div>
          <div className="text-sm text-slate-400 mt-1">{formatNumber(totalUnits)} units on hand</div>
        </div>
      </div>

      {/* Inventory Value & Fulfillment Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Inventory Valuation */}
        <div className="col-span-2 rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-700/50 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white">Inventory Valuation</h2>
              <p className="text-xs text-slate-400">Total value across all locations</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{formatCurrency(totalInventoryValue)}</div>
              <div className="text-xs text-slate-400">{formatNumber(totalUnits)} units on hand</div>
            </div>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-3 gap-4">
              {inventoryValuation.map((loc, i) => (
                <Link
                  key={loc.locationId}
                  href={`/inventory?location=${loc.locationId}`}
                  className="bg-slate-900/50 rounded-lg p-4 hover:bg-slate-800/70 transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      loc.type === 'warehouse' ? 'bg-blue-500/20' :
                      loc.type === 'fba' ? 'bg-orange-500/20' : 'bg-amber-500/20'
                    }`}>
                      {loc.type === 'warehouse' ? (
                        <Warehouse className="h-4 w-4 text-blue-400" />
                      ) : (
                        <Truck className={`h-4 w-4 ${loc.type === 'fba' ? 'text-orange-400' : 'text-amber-400'}`} />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">
                        {loc.locationName.includes('Cronk') ? 'Cronk WH' :
                         loc.locationName.includes('USA') ? 'Amazon FBA' :
                         loc.locationName.includes('Canada') ? 'Amazon CA' : loc.locationName}
                      </div>
                      <div className="text-xs text-slate-400">
                        {loc.type === 'warehouse' ? 'Primary' :
                         loc.type === 'fba' ? 'Fulfilled by Amazon' : 'FBA Canada'}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Units</span>
                      <span className="text-white font-medium">{formatNumber(loc.unitCount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">MSRP Value</span>
                      <span className="text-white font-medium">{formatCurrency(loc.totalMsrpValue)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Cost Value</span>
                      <span className="text-emerald-400 font-medium">{formatCurrency(loc.totalCostValue)}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-700/50">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Potential Margin</span>
                      <span className="text-emerald-400 font-bold">{loc.margin.toFixed(1)}%</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Summary Bar */}
            <div className="mt-4 p-4 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-lg border border-emerald-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-sm">Unrealized Profit Potential</span>
                  <div className="text-2xl font-bold text-emerald-400">{formatCurrency(totalUnrealizedProfit)}</div>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 text-sm">Total Cost on Hand</span>
                  <div className="text-xl font-bold text-white">{formatCurrency(totalCostValue)}</div>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 text-sm">Avg Margin</span>
                  <div className="text-xl font-bold text-emerald-400">{avgMargin.toFixed(1)}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fulfillment Status */}
        <div className="rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-700/50">
            <h2 className="font-semibold text-white">Fulfillment Status</h2>
            <p className="text-xs text-slate-400">Current order pipeline</p>
          </div>
          <div className="p-5 space-y-4">
            {/* To Pick */}
            <Link
              href="/fulfillment/pick?status=to_pick"
              className="flex items-center justify-between p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg hover:bg-amber-500/20 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                  <Hand className="h-5 w-5 text-amber-400" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-white group-hover:text-amber-400 transition-colors">To Pick</div>
                  <div className="text-xs text-slate-400">Awaiting picker</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-amber-400">{dashboardStats.toPick + dashboardStats.picking}</div>
            </Link>

            {/* To Pack */}
            <Link
              href="/fulfillment/pack?status=to_pack"
              className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                  <Box className="h-5 w-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-white group-hover:text-blue-400 transition-colors">To Pack</div>
                  <div className="text-xs text-slate-400">Picked, ready to pack</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-400">{dashboardStats.toPack + dashboardStats.packing}</div>
            </Link>

            {/* Ready to Ship */}
            <Link
              href="/fulfillment/shipping?status=ready"
              className="flex items-center justify-between p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg hover:bg-purple-500/20 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                  <Tag className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <div className="font-medium text-white group-hover:text-purple-400 transition-colors">Ready to Ship</div>
                  <div className="text-xs text-slate-400">Label printed</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-purple-400">{dashboardStats.readyToShip}</div>
            </Link>

            {/* Shipped in Period */}
            <Link
              href="/fulfillment/shipping?date=today"
              className="flex items-center justify-between p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                  <Check className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-white group-hover:text-emerald-400 transition-colors">Shipped</div>
                  <div className="text-xs text-slate-400">{dateRange.label}</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-emerald-400">{dashboardStats.shippedInPeriod}</div>
            </Link>

            {/* Total Orders */}
            <div className="mt-4 pt-4 border-t border-slate-700/50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Total Open Orders</span>
                <span className="text-lg font-bold text-white">
                  {dashboardStats.toPick + dashboardStats.picking + dashboardStats.toPack + dashboardStats.packing + dashboardStats.readyToShip}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Channel Performance & Orders Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Channel Performance */}
        <div className="rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-700/50">
            <h2 className="font-semibold text-white">Channel Performance</h2>
            <p className="text-xs text-slate-400">{dateRange.label}</p>
          </div>
          <div className="p-5 space-y-4">
            <ChannelCard
              href="/orders?channel=shopify"
              icon="fab fa-shopify"
              iconBgColor="bg-green-600/20"
              iconTextColor="text-green-400"
              name="Shopify"
              orders={channelPerformance.shopify.orders}
              revenue={channelPerformance.shopify.revenue}
              profit={channelPerformance.shopify.profit}
              percentage={channelPerformance.shopify.pct}
              progressColor="bg-green-500"
              formatCurrency={formatCurrency}
            />
            <ChannelCard
              href="/orders?channel=amazon"
              icon="fab fa-amazon"
              iconBgColor="bg-orange-500/20"
              iconTextColor="text-orange-400"
              name="Amazon"
              orders={channelPerformance.amazon.orders}
              revenue={channelPerformance.amazon.revenue}
              profit={channelPerformance.amazon.profit}
              percentage={channelPerformance.amazon.pct}
              progressColor="bg-orange-500"
              formatCurrency={formatCurrency}
            />
          </div>
        </div>

        {/* Recent Orders */}
        <div className="col-span-2 rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-700/50 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white">Recent Orders</h2>
              <p className="text-xs text-slate-400">Latest incoming orders</p>
            </div>
            <Link href="/orders" className="text-sm text-emerald-400 hover:text-emerald-300">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr className="text-left text-xs text-slate-400 uppercase tracking-wider">
                  <th className="px-5 py-3 font-medium">Order</th>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Channel</th>
                  <th className="px-5 py-3 font-medium">Items</th>
                  <th className="px-5 py-3 font-medium">Total</th>
                  <th className="px-5 py-3 font-medium">Profit</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-800/30 transition-colors cursor-pointer"
                    onClick={() => router.push(`/orders/${order.id}`)}
                  >
                    <td className="px-5 py-3">
                      <span className="font-mono text-sm text-white">#{order.orderNumber}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="text-sm text-white">{order.customer.name}</div>
                      <div className="text-xs text-slate-400">{order.customer.address.city}, {order.customer.address.state}</div>
                    </td>
                    <td className="px-5 py-3">
                      <ChannelBadge channel={order.channel} />
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-300">
                      {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                    </td>
                    <td className="px-5 py-3 text-sm text-white font-medium">
                      {formatCurrencyPrecise(order.total)}
                    </td>
                    <td className="px-5 py-3 text-sm text-emerald-400 font-medium">
                      {formatCurrencyPrecise(order.profit)}
                    </td>
                    <td className="px-5 py-3">
                      <QueueStatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bundles, Work Orders, Low Stock Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Bundle Availability */}
        <div className="rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-700/50 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white">Bundle Availability</h2>
              <p className="text-xs text-slate-400">Virtual kit stock</p>
            </div>
            <Link href="/inventory/bundles" className="text-sm text-emerald-400 hover:text-emerald-300">Manage</Link>
          </div>
          <div className="p-5 space-y-3">
            {bundleAvailability.map(({ bundle, available, limitingItem }) => {
              const isOutOfStock = available === 0;
              const isLow = available > 0 && available < 50;

              return (
                <Link key={bundle.id} href="/inventory/bundles" className="block p-3 bg-slate-900/50 rounded-lg hover:bg-slate-800/70 transition-colors group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">{bundle.name}</span>
                    <span className={`text-lg font-bold ${
                      isOutOfStock ? 'text-red-400' : isLow ? 'text-amber-400' : 'text-emerald-400'
                    }`}>{available}</span>
                  </div>
                  <div className="text-xs text-slate-400 mb-2">
                    {isOutOfStock ? 'Out of stock' : 'Available to sell'}
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    {isOutOfStock ? (
                      <>
                        <XCircle className="h-3 w-3 text-red-400" />
                        <span className="text-slate-400">Missing:</span>
                        <span className="text-red-400">{limitingItem}</span>
                      </>
                    ) : isLow ? (
                      <>
                        <AlertTriangle className="h-3 w-3 text-amber-400" />
                        <span className="text-slate-400">Limited by:</span>
                        <span className="text-amber-400">{limitingItem}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-3 w-3 text-emerald-400" />
                        <span className="text-slate-400">All components in stock</span>
                      </>
                    )}
                  </div>
                </Link>
              );
            })}
            {bundleAvailability.length === 0 && (
              <div className="text-center py-6 text-slate-400">
                <Layers className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No bundles configured</p>
              </div>
            )}
          </div>
        </div>

        {/* Active Work Orders */}
        <div className="rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-700/50 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white">Active Work Orders</h2>
              <p className="text-xs text-slate-400">Manufacturing in progress</p>
            </div>
            <Link href="/operations/work-orders" className="text-sm text-emerald-400 hover:text-emerald-300">View All</Link>
          </div>
          <div className="p-5 space-y-3">
            {activeWorkOrders.map((wo) => {
              const totalRequired = wo.components.reduce((sum, c) => sum + c.quantityRequired, 0);
              const totalUsed = wo.components.reduce((sum, c) => sum + c.quantityUsed, 0);
              const progress = totalRequired > 0 ? Math.round((totalUsed / totalRequired) * 100) : 0;

              return (
                <Link key={wo.id} href="/operations/work-orders" className="block p-3 bg-slate-900/50 rounded-lg hover:bg-slate-800/70 transition-colors group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">{wo.woNumber}</span>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      wo.status === 'in_progress' ? 'bg-blue-500/10 text-blue-400' :
                      wo.status === 'pending' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {wo.status === 'in_progress' ? 'In Progress' :
                       wo.status === 'pending' ? 'Pending' : 'Complete'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mb-2">
                    {wo.outputProductName} x {wo.quantityToProduce}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          wo.status === 'completed' ? 'bg-emerald-500' :
                          wo.status === 'in_progress' ? 'bg-blue-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${wo.status === 'completed' ? 100 : progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-slate-400">
                      {wo.status === 'completed' ? 100 : progress}%
                    </span>
                  </div>
                </Link>
              );
            })}
            {activeWorkOrders.length === 0 && (
              <div className="text-center py-6 text-slate-400">
                <Factory className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No active work orders</p>
              </div>
            )}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-white">Low Stock Alerts</h2>
              {lowStockProducts.length > 0 && (
                <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">
                  {lowStockProducts.length}
                </span>
              )}
            </div>
            <Link href="/inventory" className="text-sm text-emerald-400 hover:text-emerald-300">View All</Link>
          </div>
          <div className="p-5 space-y-3">
            {lowStockProducts.map((item) => {
              const isCritical = item.currentQty === 0;

              return (
                <Link
                  key={item.product.id}
                  href={`/inventory/${item.product.id}`}
                  className={`block p-3 rounded-lg border transition-colors group ${
                    isCritical
                      ? 'bg-red-500/10 border-red-500/20 hover:bg-red-500/20'
                      : 'bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">{item.product.name}</span>
                    <span className={`font-bold ${isCritical ? 'text-red-400' : 'text-amber-400'}`}>
                      {item.currentQty}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">Reorder point: {item.reorderPoint}</div>
                  <div className={`text-xs mt-1 ${isCritical ? 'text-red-400' : 'text-amber-400'}`}>
                    {isCritical ? 'Out of stock!' : 'Below reorder point'}
                  </div>
                </Link>
              );
            })}
            {lowStockProducts.length === 0 && (
              <div className="text-center py-8 text-slate-400">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-emerald-400" />
                <p className="text-sm">All items above reorder point</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expiring Soon Widget */}
      <div className="rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-white">Expiring Soon</h2>
            {expiringSoonLots.length > 0 && (
              <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded-full">
                {expiringSoonLots.length}
              </span>
            )}
          </div>
          <Link href="/inventory/lots?status=expiring_soon" className="text-sm text-emerald-400 hover:text-emerald-300">View All</Link>
        </div>
        <div className="p-5 space-y-3">
          {expiringSoonLots.map((lot) => {
            const daysUntil = getDaysUntilExpiry(lot.expirationDate!);
            const isUrgent = daysUntil <= 7;

            return (
              <div
                key={lot.id}
                className={`p-3 rounded-lg border ${
                  isUrgent
                    ? 'bg-red-500/10 border-red-500/20'
                    : 'bg-amber-500/10 border-amber-500/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-white">{lot.productName}</span>
                  <span className={`font-bold text-sm ${isUrgent ? 'text-red-400' : 'text-amber-400'}`}>
                    {daysUntil}d
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">{lot.lotNumber}</span>
                  <span className="text-slate-400">{lot.quantity} units</span>
                </div>
                <div className="flex items-center gap-1 mt-1 text-xs">
                  <Calendar className="h-3 w-3 text-slate-500" />
                  <span className={isUrgent ? 'text-red-400' : 'text-amber-400'}>
                    Expires {new Date(lot.expirationDate!).toLocaleDateString()}
                  </span>
                </div>
              </div>
            );
          })}
          {expiringSoonLots.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-emerald-400" />
              <p className="text-sm">No lots expiring soon</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 p-5">
        <h2 className="font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-6 gap-3">
          <QuickActionCard href="/orders/new" icon={Plus} iconColor="text-emerald-400" hoverBorderColor="hover:border-emerald-500/30" label="New Order" />
          <QuickActionCard href="/operations/work-orders" icon={Factory} iconColor="text-blue-400" hoverBorderColor="hover:border-blue-500/30" label="Work Order" />
          <QuickActionCard href="/inventory" icon={Layers} iconColor="text-purple-400" hoverBorderColor="hover:border-purple-500/30" label="Adjust Stock" />
          <QuickActionCard href="/operations/purchase-orders" icon={FileText} iconColor="text-amber-400" hoverBorderColor="hover:border-amber-500/30" label="Create PO" />
          <QuickActionCard href="/fulfillment/pick" icon={Hand} iconColor="text-cyan-400" hoverBorderColor="hover:border-cyan-500/30" label="Pick Orders" />
          <QuickActionCard href="/fulfillment/pack" icon={Box} iconColor="text-pink-400" hoverBorderColor="hover:border-pink-500/30" label="Pack Orders" />
        </div>
      </div>
    </div>
  );
}
