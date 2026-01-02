/**
 * Shared constants and configuration values
 */

// Shipping options for orders
export const shippingOptions = [
  { id: 'free', name: 'Free Shipping', price: 0, description: 'Standard ground (5-7 days)' },
  { id: 'standard', name: 'Standard Shipping', price: 5.99, description: 'USPS Priority (3-5 days)' },
  { id: 'express', name: 'Express Shipping', price: 12.99, description: 'UPS 2-Day' },
  { id: 'overnight', name: 'Overnight Shipping', price: 24.99, description: 'UPS Next Day Air' },
  { id: 'freight', name: 'Freight / LTL', price: 0, description: 'For large wholesale orders' },
  { id: 'pickup', name: 'Local Pickup', price: 0, description: 'Pick up at warehouse' },
  { id: 'custom', name: 'Custom Amount', price: 0, description: 'Enter custom shipping cost' },
] as const;

// Filter options for inventory
export const categoryFilters = [
  { value: 'all', label: 'All Categories' },
  { value: 'nutrients', label: 'Nutrients' },
  { value: 'supplements', label: 'Supplements' },
  { value: 'ph_adjusters', label: 'pH Adjusters' },
  { value: 'bundles', label: 'Bundles' },
  { value: 'supplies', label: 'Supplies' },
  { value: 'labels', label: 'Labels' },
] as const;

export const stockStatusFilters = [
  { value: 'all', label: 'All Stock Status' },
  { value: 'in_stock', label: 'In Stock' },
  { value: 'low_stock', label: 'Low Stock' },
  { value: 'out_of_stock', label: 'Out of Stock' },
] as const;

export const locationFilters = [
  { value: 'all', label: 'All Locations' },
  { value: 'texas_wh', label: 'Texas Warehouse' },
  { value: 'amazon_fba_usa', label: 'Amazon FBA USA' },
  { value: 'amazon_fba_ca', label: 'Amazon FBA Canada' },
] as const;

// Filter options for orders
export const orderStatusFilters = [
  { value: 'all', label: 'All Status' },
  { value: 'to_pick', label: 'To Pick' },
  { value: 'to_pack', label: 'To Pack' },
  { value: 'ready_to_ship', label: 'Ready to Ship' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
] as const;

export const channelFilters = [
  { value: 'all', label: 'All Channels' },
  { value: 'shopify', label: 'Shopify' },
  { value: 'amazon_fbm', label: 'Amazon FBM' },
  { value: 'amazon_fba', label: 'Amazon FBA' },
  { value: 'manual', label: 'Manual' },
  { value: 'wholesale', label: 'Wholesale' },
] as const;

export const dateRangeFilters = [
  { value: 'all', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'last_7_days', label: 'Last 7 Days' },
  { value: 'last_30_days', label: 'Last 30 Days' },
  { value: 'this_month', label: 'This Month' },
  { value: 'last_month', label: 'Last Month' },
] as const;

// Filter options for purchase orders
export const poStatusFilters = [
  { value: 'all', label: 'All Status' },
  { value: 'draft', label: 'Draft' },
  { value: 'sent', label: 'Pending' },
  { value: 'partially_received', label: 'Partial' },
  { value: 'received', label: 'Received' },
] as const;

// Filter options for work orders
export const workOrderStatusFilters = [
  { value: 'all', label: 'All Status' },
  { value: 'pending', label: 'Draft' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
] as const;

// Units
export const weightUnits = ['oz', 'lbs', 'g', 'kg'] as const;
export const dimensionUnits = ['in', 'cm'] as const;
export const currencyUnits = ['USD', 'CAD', 'MXN'] as const;

// Dashboard periods
export const dashboardPeriods = [
  { value: 'today', label: 'Today' },
  { value: 'wtd', label: 'Week to Date' },
  { value: 'mtd', label: 'Month to Date' },
  { value: 'ytd', label: 'Year to Date' },
] as const;

// Carriers
export const carriers = [
  { id: 'usps', name: 'USPS', icon: 'fas fa-truck' },
  { id: 'ups', name: 'UPS', icon: 'fas fa-truck' },
  { id: 'fedex', name: 'FedEx', icon: 'fas fa-truck' },
  { id: 'dhl', name: 'DHL', icon: 'fas fa-truck' },
] as const;

// Pagination defaults
export const ITEMS_PER_PAGE = 20;
export const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100] as const;
