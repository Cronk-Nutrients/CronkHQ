// Sales report mock data

export const salesMetrics = {
  totalRevenue: 156780.00,
  totalOrders: 1245,
  avgOrderValue: 125.93,
  grossProfit: 62712.00,
  grossMargin: 40.0,
  refunds: 3420.00,
  netRevenue: 153360.00,
};

export const dailySales = [
  { date: '2024-12-28', orders: 52, revenue: 6240.00, profit: 2496.00 },
  { date: '2024-12-27', orders: 48, revenue: 5760.00, profit: 2304.00 },
  { date: '2024-12-26', orders: 45, revenue: 5400.00, profit: 2160.00 },
  { date: '2024-12-25', orders: 28, revenue: 3360.00, profit: 1344.00 },
  { date: '2024-12-24', orders: 62, revenue: 7440.00, profit: 2976.00 },
  { date: '2024-12-23', orders: 55, revenue: 6600.00, profit: 2640.00 },
  { date: '2024-12-22', orders: 50, revenue: 6000.00, profit: 2400.00 },
];

export const channelBreakdown = [
  { channel: 'Shopify', orders: 520, revenue: 62400.00, profit: 24960.00, share: 39.8 },
  { channel: 'Amazon FBA', orders: 380, revenue: 45600.00, profit: 13680.00, share: 29.1 },
  { channel: 'Amazon FBM', orders: 180, revenue: 21600.00, profit: 7560.00, share: 13.8 },
  { channel: 'Direct', orders: 165, revenue: 27180.00, profit: 16512.00, share: 17.3 },
];

export const topProducts = [
  { name: 'CalMag Plus 1L', sku: 'CM-1000', unitsSold: 245, revenue: 12250.00, profit: 4900.00 },
  { name: 'Bloom Booster 500ml', sku: 'BB-500', unitsSold: 198, revenue: 9900.00, profit: 3960.00 },
  { name: 'Grow Formula 1L', sku: 'GF-1000', unitsSold: 156, revenue: 7800.00, profit: 3120.00 },
  { name: 'Root Enhancer 250ml', sku: 'RE-250', unitsSold: 142, revenue: 5680.00, profit: 2272.00 },
  { name: 'Micro Nutrients 500ml', sku: 'MN-500', unitsSold: 128, revenue: 6400.00, profit: 2560.00 },
];

export const topCustomers = [
  { name: 'Green Thumb Gardens', orders: 24, revenue: 4800.00, avgOrder: 200.00 },
  { name: 'Hydro Supply Co', orders: 18, revenue: 3600.00, avgOrder: 200.00 },
  { name: 'Urban Farmers LLC', orders: 15, revenue: 2850.00, avgOrder: 190.00 },
  { name: 'Grow Tech Inc', orders: 12, revenue: 2400.00, avgOrder: 200.00 },
  { name: 'Plant Paradise', orders: 10, revenue: 1800.00, avgOrder: 180.00 },
];

// Tab configuration
export const salesTabs = [
  { id: 'overview', label: 'Overview', icon: 'fa-chart-pie' },
  { id: 'daily', label: 'Daily Sales', icon: 'fa-calendar-day' },
  { id: 'channel', label: 'By Channel', icon: 'fa-store' },
  { id: 'product', label: 'By Product', icon: 'fa-box' },
  { id: 'customer', label: 'By Customer', icon: 'fa-users' },
];
