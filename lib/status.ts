/**
 * Unified status badge utilities
 */

export type StatusColor = 'slate' | 'emerald' | 'amber' | 'blue' | 'purple' | 'red' | 'green' | 'orange';

export interface StatusConfig {
  label: string;
  color: StatusColor;
  icon?: string;
  animate?: boolean;
}

// Color mappings for consistent styling
export const statusColors: Record<StatusColor, { bg: string; text: string; border: string }> = {
  slate: { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/20' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  red: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
  green: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
};

// Order status configurations
export const orderStatusConfig: Record<string, StatusConfig> = {
  to_pick: { label: 'To Pick', color: 'amber', icon: 'fas fa-hand-pointer' },
  to_pack: { label: 'To Pack', color: 'blue', icon: 'fas fa-box' },
  ready_to_ship: { label: 'Ready', color: 'purple', icon: 'fas fa-tag' },
  shipped: { label: 'Shipped', color: 'emerald', icon: 'fas fa-truck' },
  delivered: { label: 'Delivered', color: 'emerald', icon: 'fas fa-check-circle' },
  cancelled: { label: 'Cancelled', color: 'red', icon: 'fas fa-times' },
  refunded: { label: 'Refunded', color: 'slate', icon: 'fas fa-undo' },
  on_hold: { label: 'On Hold', color: 'amber', icon: 'fas fa-pause' },
};

// Channel configurations
export const channelConfig: Record<string, StatusConfig> = {
  shopify: { label: 'Shopify', color: 'green', icon: 'fab fa-shopify' },
  amazon_fbm: { label: 'Amazon FBM', color: 'orange', icon: 'fab fa-amazon' },
  amazon_fba: { label: 'Amazon FBA', color: 'orange', icon: 'fab fa-amazon' },
  manual: { label: 'Manual', color: 'slate', icon: 'fas fa-user' },
  wholesale: { label: 'Wholesale', color: 'purple', icon: 'fas fa-building' },
  ebay: { label: 'eBay', color: 'blue', icon: 'fab fa-ebay' },
  walmart: { label: 'Walmart', color: 'blue', icon: 'fas fa-store' },
};

// Purchase order status configurations
export const poStatusConfig: Record<string, StatusConfig> = {
  draft: { label: 'Draft', color: 'slate', icon: 'fas fa-file' },
  sent: { label: 'Pending', color: 'amber', icon: 'fas fa-paper-plane' },
  partially_received: { label: 'Partial', color: 'blue', icon: 'fas fa-truck-loading' },
  received: { label: 'Received', color: 'emerald', icon: 'fas fa-check' },
  cancelled: { label: 'Cancelled', color: 'red', icon: 'fas fa-times' },
};

// Work order status configurations
export const workOrderStatusConfig: Record<string, StatusConfig> = {
  pending: { label: 'Draft', color: 'slate', icon: 'fas fa-file' },
  scheduled: { label: 'Scheduled', color: 'blue', icon: 'fas fa-calendar' },
  in_progress: { label: 'In Progress', color: 'amber', icon: 'fas fa-spinner', animate: true },
  completed: { label: 'Completed', color: 'emerald', icon: 'fas fa-check' },
};

// Shipment status configurations
export const shipmentStatusConfig: Record<string, StatusConfig> = {
  pending: { label: 'Pending', color: 'slate', icon: 'fas fa-clock' },
  label_created: { label: 'Label Created', color: 'blue', icon: 'fas fa-tag' },
  in_transit: { label: 'In Transit', color: 'amber', icon: 'fas fa-truck', animate: true },
  out_for_delivery: { label: 'Out for Delivery', color: 'purple', icon: 'fas fa-truck' },
  delivered: { label: 'Delivered', color: 'emerald', icon: 'fas fa-check-circle' },
  exception: { label: 'Exception', color: 'red', icon: 'fas fa-exclamation-triangle' },
  returned: { label: 'Returned', color: 'amber', icon: 'fas fa-undo' },
};

// Inventory status configurations
export const inventoryStatusConfig: Record<string, StatusConfig> = {
  in_stock: { label: 'In Stock', color: 'emerald', icon: 'fas fa-check' },
  low_stock: { label: 'Low Stock', color: 'amber', icon: 'fas fa-exclamation' },
  out_of_stock: { label: 'Out of Stock', color: 'red', icon: 'fas fa-times' },
  discontinued: { label: 'Discontinued', color: 'slate', icon: 'fas fa-ban' },
};

// Pick batch status configurations
export const batchStatusConfig: Record<string, StatusConfig> = {
  pending: { label: 'Pending', color: 'slate', icon: 'fas fa-clock' },
  in_progress: { label: 'Picking', color: 'amber', icon: 'fas fa-hand-pointer', animate: true },
  picked: { label: 'Picked', color: 'blue', icon: 'fas fa-check' },
  completed: { label: 'Completed', color: 'emerald', icon: 'fas fa-check-circle' },
};

// Helper to get status config by type
export type StatusType = 'order' | 'channel' | 'po' | 'workorder' | 'shipment' | 'inventory' | 'batch';

export function getStatusConfig(status: string, type: StatusType): StatusConfig {
  const configs: Record<StatusType, Record<string, StatusConfig>> = {
    order: orderStatusConfig,
    channel: channelConfig,
    po: poStatusConfig,
    workorder: workOrderStatusConfig,
    shipment: shipmentStatusConfig,
    inventory: inventoryStatusConfig,
    batch: batchStatusConfig,
  };

  return configs[type]?.[status] || { label: status, color: 'slate' };
}

// Get margin color based on percentage
export function getMarginColor(margin: number): StatusColor {
  if (margin >= 50) return 'emerald';
  if (margin >= 30) return 'amber';
  return 'red';
}

// Get stock status from quantity and reorder point
export function getStockStatus(quantity: number, reorderPoint: number = 10): 'in_stock' | 'low_stock' | 'out_of_stock' {
  if (quantity <= 0) return 'out_of_stock';
  if (quantity <= reorderPoint) return 'low_stock';
  return 'in_stock';
}
