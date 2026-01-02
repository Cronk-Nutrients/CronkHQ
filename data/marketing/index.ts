// Marketing section mock data

// Dashboard overview
export const marketingMetrics = {
  totalSpend: 12450.00,
  totalRevenue: 67890.00,
  roas: 5.45,
  cac: 18.50,
  ltv: 145.00,
  ltvCacRatio: 7.84,
  orders: 673,
  newCustomers: 245,
  returningCustomers: 428,
  conversionRate: 3.2,
  cpm: 12.50,
  cpc: 0.85,
  ctr: 1.47,
};

export const channelBreakdown = [
  { id: 'google', name: 'Google Ads', icon: 'fa-google', iconType: 'fab', color: '#4285f4', spend: 4500.00, revenue: 28500.00, roas: 6.33, orders: 285, cac: 15.79, clicks: 5200, impressions: 125000, ctr: 4.16, status: 'connected' },
  { id: 'meta', name: 'Meta Ads', icon: 'fa-meta', iconType: 'fab', color: '#0081fb', spend: 3800.00, revenue: 19200.00, roas: 5.05, orders: 192, cac: 19.79, clicks: 4100, impressions: 98000, ctr: 4.18, status: 'connected' },
  { id: 'amazon', name: 'Amazon Ads', icon: 'fa-amazon', iconType: 'fab', color: '#ff9900', spend: 2800.00, revenue: 14500.00, roas: 5.18, orders: 145, cac: 19.31, clicks: 3200, impressions: 85000, ctr: 3.76, status: 'connected' },
  { id: 'tiktok', name: 'TikTok Ads', icon: 'fa-tiktok', iconType: 'fab', color: '#000000', spend: 1350.00, revenue: 5690.00, roas: 4.21, orders: 51, cac: 26.47, clicks: 2800, impressions: 156000, ctr: 1.79, status: 'connected' },
];

export const emailMetricsSummary = {
  platform: 'Klaviyo',
  subscribers: 12450,
  openRate: 42.5,
  clickRate: 3.8,
  revenue: 8900.00,
  campaigns: 12,
  flows: 8,
  status: 'connected',
};

// Google Ads
export const googleAdsAccount = { accountName: 'Cronk Nutrients', accountId: '123-456-7890', status: 'connected', lastSync: '5 min ago' };
export const googleAdsMetrics = { spend: 4500.00, revenue: 28500.00, roas: 6.33, orders: 285, clicks: 5200, impressions: 125000, ctr: 4.16, cpc: 0.87, conversions: 285, conversionRate: 5.48 };
export const googleAdsCampaigns = [
  { id: '1', name: 'Brand - Exact Match', status: 'active', type: 'Search', spend: 1200.00, revenue: 9500.00, roas: 7.92, clicks: 1800, impressions: 25000, ctr: 7.2, conversions: 95 },
  { id: '2', name: 'Non-Brand - Plant Nutrients', status: 'active', type: 'Search', spend: 1800.00, revenue: 10200.00, roas: 5.67, clicks: 2100, impressions: 45000, ctr: 4.67, conversions: 102 },
  { id: '3', name: 'Shopping - All Products', status: 'active', type: 'Shopping', spend: 900.00, revenue: 5800.00, roas: 6.44, clicks: 850, impressions: 35000, ctr: 2.43, conversions: 58 },
  { id: '4', name: 'Performance Max', status: 'active', type: 'PMax', spend: 600.00, revenue: 3000.00, roas: 5.00, clicks: 450, impressions: 20000, ctr: 2.25, conversions: 30 },
];
export const googleTopKeywords = [
  { keyword: 'cronk nutrients', revenue: 4200, roas: 12.5 },
  { keyword: 'plant nutrients', revenue: 2800, roas: 4.2 },
  { keyword: 'hydroponic fertilizer', revenue: 1900, roas: 5.8 },
  { keyword: 'grow nutrients', revenue: 1400, roas: 3.9 },
  { keyword: 'cal mag supplement', revenue: 1100, roas: 4.5 },
];
export const googleTopProducts = [
  { product: 'CalMag Plus 1L', revenue: 2100, conversions: 42 },
  { product: 'Bloom Booster 500ml', revenue: 1800, conversions: 36 },
  { product: 'Grow Formula 1L', revenue: 1500, conversions: 30 },
  { product: 'Root Enhancer 250ml', revenue: 900, conversions: 22 },
  { product: 'Micro Nutrients 500ml', revenue: 750, conversions: 15 },
];

// Meta Ads
export const metaAdsAccount = { accountName: 'Cronk Nutrients', accountId: 'act_123456789', status: 'connected', lastSync: '3 min ago' };
export const metaAdsMetrics = { spend: 3800.00, revenue: 19200.00, roas: 5.05, orders: 192, clicks: 4100, impressions: 98000, ctr: 4.18, cpc: 0.93, reach: 67000, frequency: 1.46 };
export const metaAdsCampaigns = [
  { id: '1', name: 'Prospecting - Broad', status: 'active', objective: 'Conversions', spend: 1500.00, revenue: 7200.00, roas: 4.80, purchases: 72, reach: 35000 },
  { id: '2', name: 'Retargeting - Website Visitors', status: 'active', objective: 'Conversions', spend: 800.00, revenue: 5600.00, roas: 7.00, purchases: 56, reach: 8000 },
  { id: '3', name: 'Lookalike - Purchasers', status: 'active', objective: 'Conversions', spend: 1000.00, revenue: 4200.00, roas: 4.20, purchases: 42, reach: 18000 },
  { id: '4', name: 'DPA - Catalog Sales', status: 'active', objective: 'Catalog Sales', spend: 500.00, revenue: 2200.00, roas: 4.40, purchases: 22, reach: 6000 },
];
export const metaTopAudiences = [
  { audience: 'Lookalike 1% - Purchasers', purchases: 42, roas: 5.2 },
  { audience: 'Interest - Gardening', purchases: 35, roas: 4.1 },
  { audience: 'Website Visitors 30d', purchases: 28, roas: 7.8 },
  { audience: 'Engaged Shoppers', purchases: 22, roas: 3.9 },
  { audience: 'Cart Abandoners', purchases: 18, roas: 8.2 },
];
export const metaTopCreatives = [
  { creative: 'Video - Product Demo', purchases: 48, ctr: 2.8 },
  { creative: 'Carousel - Best Sellers', purchases: 36, ctr: 2.1 },
  { creative: 'Image - Lifestyle Shot', purchases: 29, ctr: 1.9 },
  { creative: 'DPA - Retargeting', purchases: 22, ctr: 3.2 },
  { creative: 'UGC - Customer Review', purchases: 18, ctr: 2.4 },
];

// Amazon Ads
export const amazonAdsAccount = { accountName: 'Cronk Nutrients', sellerId: 'A1B2C3D4E5F6G7', status: 'connected', lastSync: '8 min ago' };
export const amazonAdsMetrics = { spend: 2800.00, revenue: 14500.00, roas: 5.18, acos: 19.31, tacos: 8.2, orders: 145, clicks: 3200, impressions: 85000, ctr: 3.76, cpc: 0.88 };
export const amazonAdsCampaigns = [
  { id: '1', name: 'SP - CalMag Plus - Exact', status: 'active', type: 'Sponsored Products', spend: 850.00, revenue: 5200.00, acos: 16.35, orders: 52, impressions: 22000 },
  { id: '2', name: 'SP - Auto Campaign', status: 'active', type: 'Sponsored Products', spend: 720.00, revenue: 3800.00, acos: 18.95, orders: 38, impressions: 28000 },
  { id: '3', name: 'SB - Brand Defense', status: 'active', type: 'Sponsored Brands', spend: 580.00, revenue: 3100.00, acos: 18.71, orders: 31, impressions: 18000 },
  { id: '4', name: 'SD - Product Targeting', status: 'active', type: 'Sponsored Display', spend: 650.00, revenue: 2400.00, acos: 27.08, orders: 24, impressions: 17000 },
];
export const amazonTopSearchTerms = [
  { term: 'cal mag for plants', revenue: 2100, acos: 14.2 },
  { term: 'hydroponic nutrients', revenue: 1800, acos: 18.5 },
  { term: 'plant food indoor', revenue: 1200, acos: 16.8 },
  { term: 'grow fertilizer', revenue: 950, acos: 21.2 },
  { term: 'bloom booster', revenue: 820, acos: 15.4 },
];
export const amazonTopProducts = [
  { product: 'CalMag Plus 1L', revenue: 5200, orders: 52 },
  { product: 'Bloom Booster 500ml', revenue: 3800, orders: 38 },
  { product: 'Grow Formula 1L', revenue: 2400, orders: 24 },
  { product: 'Micro Nutrients 500ml', revenue: 1900, orders: 19 },
  { product: 'Root Enhancer 250ml', revenue: 1200, orders: 12 },
];

// TikTok Ads
export const tiktokAdsAccount = { accountName: 'Cronk Nutrients', advertiserId: '7123456789012345678', status: 'connected', lastSync: '12 min ago' };
export const tiktokAdsMetrics = { spend: 1350.00, revenue: 5690.00, roas: 4.21, orders: 51, clicks: 2800, impressions: 156000, ctr: 1.79, cpc: 0.48, videoViews: 89000, engagementRate: 5.2 };
export const tiktokAdsCampaigns = [
  { id: '1', name: 'Product Showcase - CalMag', status: 'active', objective: 'Conversions', spend: 520.00, revenue: 2400.00, roas: 4.62, conversions: 24, videoViews: 35000 },
  { id: '2', name: 'UGC - Customer Reviews', status: 'active', objective: 'Conversions', spend: 380.00, revenue: 1800.00, roas: 4.74, conversions: 18, videoViews: 28000 },
  { id: '3', name: 'Before/After Results', status: 'active', objective: 'Conversions', spend: 280.00, revenue: 990.00, roas: 3.54, conversions: 6, videoViews: 16000 },
  { id: '4', name: 'Spark Ads - Influencer', status: 'active', objective: 'Traffic', spend: 170.00, revenue: 500.00, roas: 2.94, conversions: 3, videoViews: 10000 },
];
export const tiktokTopCreatives = [
  { creative: 'Product Demo - 15s', views: 35000, cvr: 0.68 },
  { creative: 'UGC Review - Plant Growth', views: 28000, cvr: 0.64 },
  { creative: 'Before/After Comparison', views: 16000, cvr: 0.38 },
  { creative: 'Influencer Unboxing', views: 10000, cvr: 0.30 },
];
export const tiktokAudienceBreakdown = [
  { label: 'Age 18-24', percentage: 32, color: 'bg-pink-500' },
  { label: 'Age 25-34', percentage: 45, color: 'bg-cyan-500' },
  { label: 'Age 35-44', percentage: 18, color: 'bg-purple-500' },
  { label: 'Age 45+', percentage: 5, color: 'bg-amber-500' },
];

// Email Marketing
export const emailAccount = { platform: 'Klaviyo' };
export const emailMetrics = {
  subscribers: 12450,
  listGrowth: 245,
  openRate: 42.5,
  clickRate: 3.8,
  unsubscribeRate: 0.2,
  revenue: 8900.00,
  revenuePerRecipient: 0.72,
};
export const emailRecentCampaigns = [
  { id: '1', name: 'Holiday Sale Announcement', sentDate: '2024-12-20', recipients: 12100, openRate: 48.2, clickRate: 5.2, revenue: 3200.00, status: 'sent' },
  { id: '2', name: 'New Product Launch', sentDate: '2024-12-15', recipients: 11800, openRate: 44.5, clickRate: 4.8, revenue: 2800.00, status: 'sent' },
  { id: '3', name: 'Weekly Newsletter', sentDate: '2024-12-18', recipients: 12000, openRate: 38.2, clickRate: 2.9, revenue: 1450.00, status: 'sent' },
  { id: '4', name: 'Flash Sale - 24hr Only', sentDate: '2024-12-10', recipients: 11500, openRate: 52.1, clickRate: 6.8, revenue: 4200.00, status: 'sent' },
];
export const emailAutomatedFlows = [
  { name: 'Welcome Series', active: true, revenue: 1200.00, sent: 890, openRate: 65.2 },
  { name: 'Abandoned Cart', active: true, revenue: 2100.00, sent: 1245, openRate: 48.5 },
  { name: 'Post-Purchase', active: true, revenue: 650.00, sent: 567, openRate: 52.8 },
  { name: 'Win-Back', active: true, revenue: 420.00, sent: 234, openRate: 28.4 },
  { name: 'Browse Abandonment', active: false, revenue: 0, sent: 0, openRate: 0 },
  { name: 'VIP Rewards', active: true, revenue: 380.00, sent: 156, openRate: 58.2 },
];
export const emailListHealth = [
  { segment: 'Highly Engaged', count: 4980, percentage: 40, color: 'bg-emerald-500' },
  { segment: 'Engaged', count: 3735, percentage: 30, color: 'bg-blue-500' },
  { segment: 'Semi-Engaged', count: 2490, percentage: 20, color: 'bg-amber-500' },
  { segment: 'At Risk', count: 1245, percentage: 10, color: 'bg-red-500' },
];

// Shared helpers
export const dateRangeOptions = [
  { id: 'today', label: 'Today' },
  { id: '7d', label: 'Last 7 Days' },
  { id: '30d', label: 'Last 30 Days' },
  { id: '90d', label: 'Last 90 Days' },
  { id: 'mtd', label: 'Month to Date' },
  { id: 'ytd', label: 'Year to Date' },
  { id: 'custom', label: 'Custom Range' },
];

export const getChannelLink = (id: string) => {
  const links: Record<string, string> = {
    google: '/marketing/google-ads',
    meta: '/marketing/meta-ads',
    amazon: '/marketing/amazon-ads',
    tiktok: '/marketing/tiktok-ads',
  };
  return links[id] || '/marketing';
};

export const getRoasBadgeVariant = (roas: number, threshold = { high: 5, medium: 3 }) =>
  roas >= threshold.high ? 'success' : roas >= threshold.medium ? 'warning' : 'error';

export const getAcosBadgeVariant = (acos: number) =>
  acos <= 18 ? 'success' : acos <= 25 ? 'warning' : 'error';
