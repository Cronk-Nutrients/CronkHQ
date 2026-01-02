// Inventory report mock data

export const inventoryMetrics = {
  totalSKUs: 156,
  totalUnits: 24580,
  totalValue: 245800.00,
  lowStock: 12,
  outOfStock: 3,
  overstock: 8,
  turnoverRate: 4.2,
  avgDaysOnHand: 87,
};

export const stockLevels = [
  { sku: 'CM-1000', name: 'CalMag Plus 1L', location: 'A1-01', quantity: 450, reserved: 25, reorderPoint: 100, status: 'healthy' },
  { sku: 'BB-500', name: 'Bloom Booster 500ml', location: 'A1-02', quantity: 380, reserved: 15, reorderPoint: 80, status: 'healthy' },
  { sku: 'GF-1000', name: 'Grow Formula 1L', location: 'A2-01', quantity: 85, reserved: 10, reorderPoint: 100, status: 'low' },
  { sku: 'RE-250', name: 'Root Enhancer 250ml', location: 'A2-02', quantity: 0, reserved: 0, reorderPoint: 50, status: 'out' },
  { sku: 'MN-500', name: 'Micro Nutrients 500ml', location: 'B1-01', quantity: 520, reserved: 8, reorderPoint: 60, status: 'overstock' },
  { sku: 'PK-1000', name: 'PK Booster 1L', location: 'B1-02', quantity: 42, reserved: 5, reorderPoint: 50, status: 'low' },
  { sku: 'FS-500', name: 'Fish Emulsion 500ml', location: 'B2-01', quantity: 180, reserved: 12, reorderPoint: 40, status: 'healthy' },
];

export const agingReport = [
  { range: '0-30 days', units: 8500, value: 85000.00, percentage: 34.6 },
  { range: '31-60 days', units: 6200, value: 62000.00, percentage: 25.2 },
  { range: '61-90 days', units: 4800, value: 48000.00, percentage: 19.5 },
  { range: '91-180 days', units: 3500, value: 35000.00, percentage: 14.2 },
  { range: '180+ days', units: 1580, value: 15800.00, percentage: 6.5 },
];

export const locationSummary = [
  { location: 'Warehouse A', skus: 85, units: 12500, value: 125000.00 },
  { location: 'Warehouse B', skus: 45, units: 8200, value: 82000.00 },
  { location: 'FBA Inventory', skus: 26, units: 3880, value: 38800.00 },
];

// Tab configuration
export const inventoryTabs = [
  { id: 'overview', label: 'Overview', icon: 'fa-chart-pie' },
  { id: 'levels', label: 'Stock Levels', icon: 'fa-boxes' },
  { id: 'aging', label: 'Aging Report', icon: 'fa-clock' },
  { id: 'location', label: 'By Location', icon: 'fa-warehouse' },
  { id: 'movement', label: 'Movement', icon: 'fa-arrow-right-arrow-left' },
];
