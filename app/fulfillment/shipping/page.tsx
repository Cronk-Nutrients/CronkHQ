'use client';

import { useState, useMemo, Suspense, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ActiveFilters } from '@/components/ui/FilterBadge';
import {
  FAStatCard,
  FulfillmentStatsGrid,
} from '@/components/fulfillment';
import {
  DateRangeTabs,
  CustomDateRange,
  DateRangeType,
} from '@/components/fulfillment';
import {
  CarrierBadge,
  ShippingStatusBadge,
  MarginBadge,
} from '@/components/fulfillment';

function ShippingPageLoading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-64 bg-slate-700/50 rounded animate-pulse" />
      <div className="grid grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-32 bg-slate-800/50 rounded-xl animate-pulse" />
        ))}
      </div>
      <div className="h-96 bg-slate-800/50 rounded-xl animate-pulse" />
    </div>
  );
}

export default function ShippingPage() {
  return (
    <Suspense fallback={<ShippingPageLoading />}>
      <ShippingPageContent />
    </Suspense>
  );
}

const SERVICE_COLORS = [
  'from-blue-500 to-blue-400',
  'from-amber-600 to-amber-500',
  'from-purple-500 to-purple-400',
  'from-emerald-500 to-emerald-400',
  'from-cyan-500 to-cyan-400',
  'from-slate-500 to-slate-400',
];

function ShippingPageContent() {
  const { state } = useApp();
  const { addToast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [dateRange, setDateRange] = useState<DateRangeType>('wtd');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [carrierFilter, setCarrierFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [urlInitialized, setUrlInitialized] = useState(false);

  // Initialize from URL params
  useEffect(() => {
    if (!urlInitialized) {
      const carrier = searchParams.get('carrier');
      const status = searchParams.get('status');
      const search = searchParams.get('search');

      if (carrier) setCarrierFilter(carrier);
      if (status) setStatusFilter(status);
      if (search) setSearchQuery(search);

      setUrlInitialized(true);
    }
  }, [searchParams, urlInitialized]);

  // Update URL when filters change
  const updateUrlParams = useCallback((newCarrier: string, newStatus: string) => {
    const params = new URLSearchParams();
    if (newCarrier !== 'all') params.set('carrier', newCarrier);
    if (newStatus !== 'all') params.set('status', newStatus);
    const url = params.toString() ? `/fulfillment/shipping?${params.toString()}` : '/fulfillment/shipping';
    router.replace(url, { scroll: false });
  }, [router]);

  // Get active filters for display
  const activeFilters = useMemo(() => {
    const filters: { key: string; label: string; value: string }[] = [];
    if (carrierFilter !== 'all') {
      filters.push({ key: 'carrier', label: 'Carrier', value: carrierFilter.toUpperCase() });
    }
    if (statusFilter !== 'all') {
      const statusLabels: Record<string, string> = {
        label_created: 'Label Created',
        in_transit: 'In Transit',
        delivered: 'Delivered',
        exception: 'Exception',
      };
      filters.push({ key: 'status', label: 'Status', value: statusLabels[statusFilter] || statusFilter });
    }
    return filters;
  }, [carrierFilter, statusFilter]);

  const handleRemoveFilter = (key: string) => {
    if (key === 'carrier') {
      setCarrierFilter('all');
      updateUrlParams('all', statusFilter);
    } else if (key === 'status') {
      setStatusFilter('all');
      updateUrlParams(carrierFilter, 'all');
    }
  };

  const handleClearAllFilters = () => {
    setCarrierFilter('all');
    setStatusFilter('all');
    setSearchQuery('');
    router.replace('/fulfillment/shipping', { scroll: false });
  };

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

  // Filter shipments
  const filteredShipments = useMemo(() => {
    const { start, end } = getDateRange();

    return state.shipments.filter(s => {
      const shipDate = new Date(s.shippedAt);
      const inDateRange = shipDate >= start && shipDate <= end;
      const matchesCarrier = carrierFilter === 'all' || s.carrier === carrierFilter;
      const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
      const matchesSearch = !searchQuery ||
        s.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.customerName.toLowerCase().includes(searchQuery.toLowerCase());

      return inDateRange && matchesCarrier && matchesStatus && matchesSearch;
    });
  }, [state.shipments, dateRange, carrierFilter, statusFilter, searchQuery, customStart, customEnd]);

  // Calculate stats
  const stats = useMemo(() => {
    const shipments = filteredShipments;
    const totalShipments = shipments.length;
    const shippingRevenue = shipments.reduce((sum, s) => sum + s.customerPaid, 0);
    const shippingCost = shipments.reduce((sum, s) => sum + s.actualCost, 0);
    const shippingProfit = shipments.reduce((sum, s) => sum + s.profit, 0);
    const totalWeight = shipments.reduce((sum, s) => sum + s.weight, 0);
    const profitMargin = shippingRevenue > 0 ? (shippingProfit / shippingRevenue) * 100 : 0;
    const avgCostPerShipment = totalShipments > 0 ? shippingCost / totalShipments : 0;
    const avgRevenuePerShipment = totalShipments > 0 ? shippingRevenue / totalShipments : 0;
    const avgWeightPerShipment = totalShipments > 0 ? totalWeight / totalShipments : 0;

    return {
      totalShipments, shippingRevenue, shippingCost, shippingProfit,
      profitMargin, totalWeight, avgCostPerShipment, avgRevenuePerShipment, avgWeightPerShipment,
    };
  }, [filteredShipments]);

  // Carrier performance stats
  const carrierStats = useMemo(() => {
    const byCarrier: Record<string, { shipments: number; revenue: number; cost: number; profit: number; totalTime: number; deliveredCount: number }> = {};

    filteredShipments.forEach(s => {
      if (!byCarrier[s.carrier]) {
        byCarrier[s.carrier] = { shipments: 0, revenue: 0, cost: 0, profit: 0, totalTime: 0, deliveredCount: 0 };
      }
      byCarrier[s.carrier].shipments++;
      byCarrier[s.carrier].revenue += s.customerPaid;
      byCarrier[s.carrier].cost += s.actualCost;
      byCarrier[s.carrier].profit += s.profit;

      if (s.status === 'delivered' && s.deliveredAt) {
        const days = Math.ceil((new Date(s.deliveredAt).getTime() - new Date(s.shippedAt).getTime()) / (1000 * 60 * 60 * 24));
        byCarrier[s.carrier].totalTime += days;
        byCarrier[s.carrier].deliveredCount++;
      }
    });

    return Object.entries(byCarrier).map(([carrier, data]) => ({
      carrier,
      ...data,
      margin: data.revenue > 0 ? (data.profit / data.revenue) * 100 : 0,
      avgTime: data.deliveredCount > 0 ? (data.totalTime / data.deliveredCount).toFixed(1) : 'N/A',
    })).sort((a, b) => b.shipments - a.shipments);
  }, [filteredShipments]);

  // Service type breakdown
  const serviceStats = useMemo(() => {
    const byService: Record<string, number> = {};
    filteredShipments.forEach(s => {
      const key = `${s.carrier.toUpperCase()} ${s.service}`;
      byService[key] = (byService[key] || 0) + 1;
    });

    const total = filteredShipments.length || 1;
    return Object.entries(byService)
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [filteredShipments]);

  // Export to CSV
  const handleExport = () => {
    if (filteredShipments.length === 0) {
      addToast('warning', 'No shipments to export');
      return;
    }

    const headers = ['Date', 'Order #', 'Customer', 'City', 'State', 'Carrier', 'Service', 'Tracking', 'Customer Paid', 'Actual Cost', 'Profit', 'Weight', 'Status'];
    const rows = filteredShipments.map(s => [
      new Date(s.shippedAt).toLocaleDateString(),
      s.orderNumber, s.customerName, s.customerCity, s.customerState,
      s.carrier.toUpperCase(), s.service, s.trackingNumber,
      s.customerPaid.toFixed(2), s.actualCost.toFixed(2), s.profit.toFixed(2),
      s.weight.toFixed(2), s.status,
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shipments-${dateRange}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    addToast('success', `Exported ${filteredShipments.length} shipments`);
  };

  // Get tracking URL
  const getTrackingUrl = (carrier: string, trackingNumber: string) => {
    const urls: Record<string, string> = {
      usps: `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`,
      ups: `https://www.ups.com/track?tracknum=${trackingNumber}`,
      fedex: `https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`,
      dhl: `https://www.dhl.com/en/express/tracking.html?AWB=${trackingNumber}`,
    };
    return urls[carrier] || '#';
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Fulfillment', href: '/fulfillment' }, { label: 'Shipping' }]} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Shipping</h1>
          <p className="text-slate-400 text-sm">Track shipments, costs, and carrier performance</p>
        </div>
        <div className="flex items-center gap-4">
          <DateRangeTabs value={dateRange} onChange={setDateRange} />
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all"
          >
            <i className="fas fa-download"></i>
            Export
          </button>
        </div>
      </div>

      {dateRange === 'custom' && (
        <CustomDateRange
          startDate={customStart}
          endDate={customEnd}
          onStartDateChange={setCustomStart}
          onEndDateChange={setCustomEnd}
        />
      )}

      {activeFilters.length > 0 && (
        <ActiveFilters
          filters={activeFilters}
          onRemove={handleRemoveFilter}
          onClearAll={handleClearAllFilters}
        />
      )}

      {/* Stats Row */}
      <FulfillmentStatsGrid columns={6}>
        <FAStatCard
          icon="fa-truck"
          iconColor="purple"
          value={stats.totalShipments}
          label="Total Shipments"
          subLabel="In selected period"
          highlight
        />
        <FAStatCard
          icon="fa-dollar-sign"
          iconColor="emerald"
          value={stats.shippingRevenue}
          label="Shipping Revenue"
          subLabel="What customers paid"
          format="currency"
        />
        <FAStatCard
          icon="fa-receipt"
          iconColor="red"
          value={stats.shippingCost}
          label="Shipping Cost"
          subLabel="Paid to carriers"
          format="currency"
        />
        <FAStatCard
          icon="fa-chart-line"
          iconColor="emerald"
          value={stats.shippingProfit}
          label="Shipping Profit"
          subLabel={`${stats.profitMargin.toFixed(1)}% margin`}
          format="currency"
          valueColor="text-emerald-400"
        />
        <FAStatCard
          icon="fa-calculator"
          iconColor="blue"
          value={`$${stats.avgCostPerShipment.toFixed(2)}`}
          label="Avg Cost/Shipment"
          subLabel={`Avg revenue: $${stats.avgRevenuePerShipment.toFixed(2)}`}
          format="raw"
        />
        <FAStatCard
          icon="fa-weight-hanging"
          iconColor="amber"
          value={`${stats.avgWeightPerShipment.toFixed(2)}`}
          label="Avg Weight/Shipment"
          subLabel={`Total: ${stats.totalWeight.toLocaleString()} lbs`}
          format="raw"
        />
      </FulfillmentStatsGrid>

      {/* Carrier Performance & Service Type Row */}
      <div className="grid grid-cols-3 gap-6">
        {/* Carrier Performance Table */}
        <div className="col-span-2 bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Carrier Performance</h2>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>Profitable
              <span className="w-2 h-2 bg-amber-400 rounded-full ml-2"></span>Break-even
              <span className="w-2 h-2 bg-red-400 rounded-full ml-2"></span>Loss
            </div>
          </div>
          {carrierStats.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="text-left text-slate-400 text-sm border-b border-slate-700/50">
                  <th className="pb-4 font-medium">Carrier</th>
                  <th className="pb-4 font-medium text-right">Shipments</th>
                  <th className="pb-4 font-medium text-right">Revenue</th>
                  <th className="pb-4 font-medium text-right">Cost</th>
                  <th className="pb-4 font-medium text-right">Profit</th>
                  <th className="pb-4 font-medium text-right">Margin</th>
                  <th className="pb-4 font-medium text-right">Avg Time</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {carrierStats.map((carrier, index) => (
                  <tr key={carrier.carrier} className={`${index < carrierStats.length - 1 ? 'border-b border-slate-700/30' : ''} hover:bg-slate-700/30 transition-colors`}>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <CarrierBadge carrier={carrier.carrier} variant="icon" />
                        <p className="font-medium text-white">{carrier.carrier.toUpperCase()}</p>
                      </div>
                    </td>
                    <td className="py-4 text-right text-white">{carrier.shipments}</td>
                    <td className="py-4 text-right text-white">${carrier.revenue.toFixed(2)}</td>
                    <td className="py-4 text-right text-slate-300">${carrier.cost.toFixed(2)}</td>
                    <td className="py-4 text-right text-emerald-400 font-medium">${carrier.profit.toFixed(2)}</td>
                    <td className="py-4 text-right"><MarginBadge margin={carrier.margin} /></td>
                    <td className="py-4 text-right text-slate-300">{carrier.avgTime} days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8 text-slate-400">
              <i className="fas fa-truck text-4xl mb-3 opacity-50"></i>
              <p>No shipments in selected period</p>
            </div>
          )}
        </div>

        {/* By Service Type */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">By Service Type</h2>
          {serviceStats.length > 0 ? (
            <div className="space-y-4">
              {serviceStats.map((service, index) => (
                <div key={service.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300">{service.name}</span>
                    <span className="text-sm text-white font-medium">{service.count}</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${SERVICE_COLORS[index % SERVICE_COLORS.length]} rounded-full`}
                      style={{ width: `${service.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              <p>No data available</p>
            </div>
          )}

          {carrierStats.length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Most Used</span>
                <span className="text-sm text-emerald-400 font-medium">
                  {carrierStats[0]?.carrier.toUpperCase() || 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Best Margin</span>
                <span className="text-sm text-blue-400 font-medium">
                  {[...carrierStats].sort((a, b) => b.margin - a.margin)[0]?.carrier.toUpperCase() || 'N/A'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Shipments Table */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Shipments</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tracking, order #..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-800/50 border border-slate-600/50 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50 w-64"
              />
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            </div>
            <select
              value={carrierFilter}
              onChange={(e) => { setCarrierFilter(e.target.value); updateUrlParams(e.target.value, statusFilter); }}
              className="bg-slate-800/50 border border-slate-600/50 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50"
            >
              <option value="all">All Carriers</option>
              <option value="usps">USPS</option>
              <option value="ups">UPS</option>
              <option value="fedex">FedEx</option>
              <option value="dhl">DHL</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); updateUrlParams(carrierFilter, e.target.value); }}
              className="bg-slate-800/50 border border-slate-600/50 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50"
            >
              <option value="all">All Statuses</option>
              <option value="label_created">Label Created</option>
              <option value="in_transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="exception">Exception</option>
            </select>
          </div>
        </div>

        {filteredShipments.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="text-left text-slate-400 text-sm border-b border-slate-700/50">
                <th className="pb-4 font-medium">Date/Time</th>
                <th className="pb-4 font-medium">Order #</th>
                <th className="pb-4 font-medium">Customer</th>
                <th className="pb-4 font-medium">Carrier</th>
                <th className="pb-4 font-medium">Service</th>
                <th className="pb-4 font-medium text-right">Weight</th>
                <th className="pb-4 font-medium text-right">Customer Paid</th>
                <th className="pb-4 font-medium text-right">Actual Cost</th>
                <th className="pb-4 font-medium text-right pr-10">Profit</th>
                <th className="pb-4 font-medium pl-6">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredShipments.slice(0, 10).map((shipment, index) => (
                <tr key={shipment.id} className={`${index < Math.min(filteredShipments.length, 10) - 1 ? 'border-b border-slate-700/30' : ''} hover:bg-slate-700/30 transition-colors`}>
                  <td className="py-4">
                    <p className="text-white">{new Date(shipment.shippedAt).toLocaleDateString()}</p>
                    <p className="text-xs text-slate-400">{new Date(shipment.shippedAt).toLocaleTimeString()}</p>
                  </td>
                  <td className="py-4">
                    <Link href={`/orders?search=${shipment.orderNumber}`} className="text-purple-400 hover:text-purple-300 transition-colors">
                      {shipment.orderNumber}
                    </Link>
                  </td>
                  <td className="py-4">
                    <p className="text-white">{shipment.customerName}</p>
                    <p className="text-xs text-slate-400">{shipment.customerCity}, {shipment.customerState}</p>
                    <a
                      href={getTrackingUrl(shipment.carrier, shipment.trackingNumber)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-purple-400 hover:text-purple-300 font-mono mt-1 inline-flex items-center gap-1"
                    >
                      <i className="fas fa-external-link-alt text-[8px]"></i>
                      {shipment.trackingNumber.slice(0, 16)}...
                    </a>
                  </td>
                  <td className="py-4"><CarrierBadge carrier={shipment.carrier} /></td>
                  <td className="py-4 text-slate-300">{shipment.service}</td>
                  <td className="py-4 text-right text-slate-300">{shipment.weight.toFixed(1)} lbs</td>
                  <td className="py-4 text-right text-white">${shipment.customerPaid.toFixed(2)}</td>
                  <td className="py-4 text-right text-slate-300">${shipment.actualCost.toFixed(2)}</td>
                  <td className="py-4 text-right text-emerald-400 font-medium pr-10">${shipment.profit.toFixed(2)}</td>
                  <td className="py-4 pl-6">
                    <ShippingStatusBadge status={shipment.status as 'label_created' | 'in_transit' | 'delivered' | 'exception'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-12 text-slate-400">
            <i className="fas fa-shipping-fast text-4xl mb-3 opacity-50"></i>
            <p>No shipments found</p>
            <p className="text-sm mt-1">Ship orders from the Pack station to see them here</p>
          </div>
        )}

        {filteredShipments.length > 0 && (
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-700/50">
            <p className="text-sm text-slate-400">Showing 1-{Math.min(10, filteredShipments.length)} of {filteredShipments.length} shipments</p>
          </div>
        )}
      </div>
    </div>
  );
}
