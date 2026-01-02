// Custom report builder configuration data

import type { DataSource, ColumnConfig } from '@/types/reports';

export const dataSources: { id: DataSource; name: string; description: string; icon: string }[] = [
  { id: 'orders', name: 'Orders', description: 'Sales orders and transactions', icon: 'fa-shopping-cart' },
  { id: 'products', name: 'Products', description: 'Product catalog and details', icon: 'fa-box' },
  { id: 'shipments', name: 'Shipments', description: 'Shipping and delivery data', icon: 'fa-truck' },
  { id: 'inventory', name: 'Inventory', description: 'Stock levels and movements', icon: 'fa-warehouse' },
  { id: 'returns', name: 'Returns', description: 'Return requests and refunds', icon: 'fa-rotate-left' },
  { id: 'customers', name: 'Customers', description: 'Customer information', icon: 'fa-users' },
];

export const columnsBySource: Record<DataSource, ColumnConfig[]> = {
  orders: [
    { id: 'orderNumber', name: 'Order Number', type: 'string' },
    { id: 'customerName', name: 'Customer Name', type: 'string' },
    { id: 'channel', name: 'Sales Channel', type: 'string' },
    { id: 'status', name: 'Status', type: 'string' },
    { id: 'total', name: 'Order Total', type: 'currency' },
    { id: 'cogs', name: 'COGS', type: 'currency' },
    { id: 'profit', name: 'Profit', type: 'currency' },
    { id: 'margin', name: 'Margin', type: 'percent' },
    { id: 'shipping', name: 'Shipping Charged', type: 'currency' },
    { id: 'items', name: 'Item Count', type: 'number' },
    { id: 'createdAt', name: 'Order Date', type: 'date' },
  ],
  products: [
    { id: 'sku', name: 'SKU', type: 'string' },
    { id: 'name', name: 'Product Name', type: 'string' },
    { id: 'brand', name: 'Brand', type: 'string' },
    { id: 'category', name: 'Category', type: 'string' },
    { id: 'price', name: 'Price', type: 'currency' },
    { id: 'cost', name: 'Cost', type: 'currency' },
    { id: 'margin', name: 'Margin', type: 'percent' },
    { id: 'weight', name: 'Weight', type: 'number' },
    { id: 'status', name: 'Status', type: 'string' },
  ],
  shipments: [
    { id: 'trackingNumber', name: 'Tracking Number', type: 'string' },
    { id: 'carrier', name: 'Carrier', type: 'string' },
    { id: 'service', name: 'Service', type: 'string' },
    { id: 'status', name: 'Status', type: 'string' },
    { id: 'customerPaid', name: 'Customer Paid', type: 'currency' },
    { id: 'actualCost', name: 'Actual Cost', type: 'currency' },
    { id: 'profit', name: 'Shipping Profit', type: 'currency' },
    { id: 'weight', name: 'Weight', type: 'number' },
    { id: 'shippedAt', name: 'Ship Date', type: 'date' },
  ],
  inventory: [
    { id: 'sku', name: 'SKU', type: 'string' },
    { id: 'productName', name: 'Product Name', type: 'string' },
    { id: 'location', name: 'Location', type: 'string' },
    { id: 'quantity', name: 'Quantity', type: 'number' },
    { id: 'reserved', name: 'Reserved', type: 'number' },
    { id: 'available', name: 'Available', type: 'number' },
    { id: 'reorderPoint', name: 'Reorder Point', type: 'number' },
    { id: 'unitCost', name: 'Unit Cost', type: 'currency' },
    { id: 'totalValue', name: 'Total Value', type: 'currency' },
  ],
  returns: [
    { id: 'returnId', name: 'Return ID', type: 'string' },
    { id: 'orderNumber', name: 'Order Number', type: 'string' },
    { id: 'customerName', name: 'Customer Name', type: 'string' },
    { id: 'reason', name: 'Return Reason', type: 'string' },
    { id: 'status', name: 'Status', type: 'string' },
    { id: 'refundAmount', name: 'Refund Amount', type: 'currency' },
    { id: 'restockFee', name: 'Restock Fee', type: 'currency' },
    { id: 'createdAt', name: 'Return Date', type: 'date' },
  ],
  customers: [
    { id: 'name', name: 'Customer Name', type: 'string' },
    { id: 'email', name: 'Email', type: 'string' },
    { id: 'phone', name: 'Phone', type: 'string' },
    { id: 'totalOrders', name: 'Total Orders', type: 'number' },
    { id: 'totalSpent', name: 'Total Spent', type: 'currency' },
    { id: 'avgOrderValue', name: 'Avg Order Value', type: 'currency' },
    { id: 'firstOrderDate', name: 'First Order', type: 'date' },
    { id: 'lastOrderDate', name: 'Last Order', type: 'date' },
  ],
};

export const groupByOptions: Record<DataSource, string[]> = {
  orders: ['channel', 'status', 'createdAt'],
  products: ['brand', 'category', 'status'],
  shipments: ['carrier', 'service', 'status'],
  inventory: ['location'],
  returns: ['reason', 'status'],
  customers: [],
};

export const savedTemplates = [
  { name: 'Weekly Sales Summary', source: 'orders', columns: 5 },
  { name: 'Low Stock Alert', source: 'inventory', columns: 6 },
  { name: 'Shipping Cost Analysis', source: 'shipments', columns: 7 },
  { name: 'Customer Lifetime Value', source: 'customers', columns: 4 },
];
