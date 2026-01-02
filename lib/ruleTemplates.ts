import type { RuleTrigger, RuleCondition, RuleAction } from '@/context/AppContext';

export interface RuleTemplate {
  id: string;
  name: string;
  description: string;
  category: 'shipping' | 'tagging' | 'inventory' | 'notification';
  trigger: RuleTrigger;
  conditions: Omit<RuleCondition, 'id'>[];
  actions: Omit<RuleAction, 'id'>[];
}

export const ruleTemplates: RuleTemplate[] = [
  // Shipping Templates
  {
    id: 'tpl-usps-small',
    name: 'Auto-assign USPS for small orders',
    description: 'Orders under $50 with weight less than 1lb ship USPS First Class',
    category: 'shipping',
    trigger: { type: 'order_created' },
    conditions: [
      { field: 'total', operator: 'less_than', value: 50 }
    ],
    actions: [
      { type: 'assign_carrier', config: { carrier: 'usps' } },
      { type: 'assign_service', config: { service: 'first_class' } }
    ]
  },
  {
    id: 'tpl-ups-heavy',
    name: 'Use UPS for heavy orders',
    description: 'Orders over 5lbs ship via UPS Ground',
    category: 'shipping',
    trigger: { type: 'order_created' },
    conditions: [
      { field: 'weight', operator: 'greater_than', value: 80 } // 80oz = 5lbs
    ],
    actions: [
      { type: 'assign_carrier', config: { carrier: 'ups' } },
      { type: 'assign_service', config: { service: 'ground' } }
    ]
  },
  {
    id: 'tpl-fedex-express',
    name: 'FedEx for high-value orders',
    description: 'Orders over $200 ship FedEx with signature required',
    category: 'shipping',
    trigger: { type: 'order_created' },
    conditions: [
      { field: 'total', operator: 'greater_than', value: 200 }
    ],
    actions: [
      { type: 'assign_carrier', config: { carrier: 'fedex' } },
      { type: 'assign_service', config: { service: 'express_saver' } }
    ]
  },

  // Tagging Templates
  {
    id: 'tpl-prime-tag',
    name: 'Tag Amazon Prime orders as urgent',
    description: 'Add PRIME tag and set high priority for Amazon Prime orders',
    category: 'tagging',
    trigger: { type: 'order_created' },
    conditions: [
      { field: 'is_prime', operator: 'equals', value: true }
    ],
    actions: [
      { type: 'set_order_tag', config: { tag: 'PRIME' } },
      { type: 'set_priority', config: { priority: 'high' } }
    ]
  },
  {
    id: 'tpl-wholesale-tag',
    name: 'Tag wholesale orders',
    description: 'Add WHOLESALE tag and notify team for bulk orders',
    category: 'tagging',
    trigger: { type: 'order_created' },
    conditions: [
      { field: 'item_count', operator: 'greater_than', value: 10 }
    ],
    actions: [
      { type: 'set_order_tag', config: { tag: 'WHOLESALE' } },
      { type: 'send_notification', config: { message: 'New wholesale order received' } }
    ]
  },
  {
    id: 'tpl-international-tag',
    name: 'Tag international orders',
    description: 'Flag orders shipping outside the US',
    category: 'tagging',
    trigger: { type: 'order_created' },
    conditions: [
      { field: 'shipping_country', operator: 'not_equals', value: 'US' }
    ],
    actions: [
      { type: 'set_order_tag', config: { tag: 'INTERNATIONAL' } },
      { type: 'set_priority', config: { priority: 'low' } }
    ]
  },
  {
    id: 'tpl-fragile-tag',
    name: 'Tag fragile product orders',
    description: 'Add FRAGILE tag when order contains specific SKUs',
    category: 'tagging',
    trigger: { type: 'order_created' },
    conditions: [
      { field: 'contains_sku', operator: 'contains', value: '4L' }
    ],
    actions: [
      { type: 'set_order_tag', config: { tag: 'FRAGILE' } }
    ]
  },

  // Inventory Templates
  {
    id: 'tpl-low-stock-alert',
    name: 'Create PO when stock is low',
    description: 'Automatically create a PO draft and notify when stock drops below threshold',
    category: 'inventory',
    trigger: { type: 'low_stock', threshold: 50 },
    conditions: [],
    actions: [
      { type: 'create_po_draft', config: { quantity: 100 } },
      { type: 'send_notification', config: { message: 'Low stock alert! PO draft created.' } }
    ]
  },
  {
    id: 'tpl-critical-stock',
    name: 'Critical stock email alert',
    description: 'Send urgent email when stock is critically low',
    category: 'inventory',
    trigger: { type: 'low_stock', threshold: 10 },
    conditions: [],
    actions: [
      { type: 'send_email', config: { recipient: 'admin@company.com', subject: 'URGENT: Critical stock level' } },
      { type: 'send_notification', config: { message: 'CRITICAL: Stock nearly depleted!' } }
    ]
  },

  // Notification Templates
  {
    id: 'tpl-new-order-notify',
    name: 'Notify on new Shopify orders',
    description: 'Send notification when a new Shopify order is received',
    category: 'notification',
    trigger: { type: 'order_created' },
    conditions: [
      { field: 'channel', operator: 'equals', value: 'shopify' }
    ],
    actions: [
      { type: 'send_notification', config: { message: 'New Shopify order received!' } }
    ]
  },
  {
    id: 'tpl-vip-customer',
    name: 'VIP customer alert',
    description: 'Notify when orders come from VIP email domains',
    category: 'notification',
    trigger: { type: 'order_created' },
    conditions: [
      { field: 'total', operator: 'greater_than', value: 500 }
    ],
    actions: [
      { type: 'set_order_tag', config: { tag: 'VIP' } },
      { type: 'set_priority', config: { priority: 'urgent' } },
      { type: 'send_notification', config: { message: 'VIP order received - prioritize!' } }
    ]
  },
  {
    id: 'tpl-gripper-sticker',
    name: 'Add gripper sticker to every bottle',
    description: 'Automatically add gripper stickers to orders containing bottles',
    category: 'shipping',
    trigger: { type: 'order_created' },
    conditions: [
      { field: 'contains_sku', operator: 'contains', value: 'CN' }
    ],
    actions: [
      { type: 'add_fulfillment_item', config: { productId: 'gripper-sku', quantity: 1 } }
    ]
  }
];

// Get templates by category
export function getTemplatesByCategory(category: RuleTemplate['category']): RuleTemplate[] {
  return ruleTemplates.filter(t => t.category === category);
}

// Get all unique categories
export function getTemplateCategories(): RuleTemplate['category'][] {
  return [...new Set(ruleTemplates.map(t => t.category))];
}

// Get category label
export function getCategoryLabel(category: RuleTemplate['category']): string {
  const labels: Record<RuleTemplate['category'], string> = {
    shipping: 'Shipping & Carriers',
    tagging: 'Order Tagging',
    inventory: 'Inventory Management',
    notification: 'Notifications'
  };
  return labels[category];
}

// Get category icon (Font Awesome class)
export function getCategoryIcon(category: RuleTemplate['category']): string {
  const icons: Record<RuleTemplate['category'], string> = {
    shipping: 'fa-truck',
    tagging: 'fa-tags',
    inventory: 'fa-boxes',
    notification: 'fa-bell'
  };
  return icons[category];
}

// Trigger options for the UI
export const triggerOptions = [
  {
    type: 'order_created' as const,
    icon: 'ShoppingCart',
    label: 'New Order',
    description: 'When an order is created'
  },
  {
    type: 'order_status_changed' as const,
    icon: 'ArrowLeftRight',
    label: 'Status Change',
    description: 'When order status changes'
  },
  {
    type: 'low_stock' as const,
    icon: 'AlertTriangle',
    label: 'Low Stock',
    description: 'When stock falls below threshold'
  },
  {
    type: 'item_received' as const,
    icon: 'PackageCheck',
    label: 'Item Received',
    description: 'When inventory is received'
  },
  {
    type: 'daily' as const,
    icon: 'Clock',
    label: 'Scheduled',
    description: 'Run at a specific time daily'
  },
  {
    type: 'manual' as const,
    icon: 'Hand',
    label: 'Manual',
    description: 'Run manually when triggered'
  }
];

// Action options for the UI
export const actionOptions = [
  { type: 'set_order_tag', label: 'Add Order Tag', icon: 'Tag' },
  { type: 'set_priority', label: 'Set Priority', icon: 'Flag' },
  { type: 'assign_carrier', label: 'Assign Carrier', icon: 'Truck' },
  { type: 'assign_service', label: 'Assign Shipping Service', icon: 'Package' },
  { type: 'select_box', label: 'Select Box', icon: 'Box' },
  { type: 'add_fulfillment_item', label: 'Add Fulfillment Item', icon: 'Plus' },
  { type: 'send_notification', label: 'Send Notification', icon: 'Bell' },
  { type: 'create_po_draft', label: 'Create PO Draft', icon: 'FileText' },
  { type: 'send_email', label: 'Send Email', icon: 'Mail' },
  { type: 'set_location', label: 'Set Location', icon: 'MapPin' }
];

// Operator options
export const operatorOptions = [
  { value: 'equals', label: 'equals' },
  { value: 'not_equals', label: 'does not equal' },
  { value: 'contains', label: 'contains' },
  { value: 'greater_than', label: 'is greater than' },
  { value: 'less_than', label: 'is less than' },
  { value: 'in_list', label: 'is one of' }
];

// Priority options
export const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' }
];

// Carrier options
export const carrierOptions = [
  { value: 'usps', label: 'USPS' },
  { value: 'ups', label: 'UPS' },
  { value: 'fedex', label: 'FedEx' },
  { value: 'dhl', label: 'DHL' }
];

// Service options per carrier
export const serviceOptions: Record<string, { value: string; label: string }[]> = {
  usps: [
    { value: 'first_class', label: 'First Class' },
    { value: 'priority', label: 'Priority Mail' },
    { value: 'priority_express', label: 'Priority Express' },
    { value: 'ground_advantage', label: 'Ground Advantage' }
  ],
  ups: [
    { value: 'ground', label: 'UPS Ground' },
    { value: 'three_day_select', label: '3 Day Select' },
    { value: 'second_day_air', label: '2nd Day Air' },
    { value: 'next_day_air', label: 'Next Day Air' }
  ],
  fedex: [
    { value: 'ground', label: 'FedEx Ground' },
    { value: 'home_delivery', label: 'Home Delivery' },
    { value: 'express_saver', label: 'Express Saver' },
    { value: 'standard_overnight', label: 'Standard Overnight' }
  ],
  dhl: [
    { value: 'express', label: 'DHL Express' },
    { value: 'express_worldwide', label: 'Express Worldwide' }
  ]
};
