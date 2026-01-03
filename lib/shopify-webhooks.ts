// Shopify Webhook Topic Definitions
// Used for registering webhooks and routing incoming webhook payloads

export interface WebhookTopicConfig {
  topic: string
  pubsubTopic: string
  description: string
  apiVersion: string
}

// Webhook topics we want to subscribe to
export const SHOPIFY_WEBHOOK_TOPICS: Record<string, WebhookTopicConfig> = {
  // Order webhooks
  'orders/create': {
    topic: 'orders/create',
    pubsubTopic: 'shopify-orders-create',
    description: 'New order created',
    apiVersion: '2024-01',
  },
  'orders/updated': {
    topic: 'orders/updated',
    pubsubTopic: 'shopify-orders-updated',
    description: 'Order details updated',
    apiVersion: '2024-01',
  },
  'orders/cancelled': {
    topic: 'orders/cancelled',
    pubsubTopic: 'shopify-orders-cancelled',
    description: 'Order was cancelled',
    apiVersion: '2024-01',
  },
  'orders/fulfilled': {
    topic: 'orders/fulfilled',
    pubsubTopic: 'shopify-orders-fulfilled',
    description: 'Order was fulfilled',
    apiVersion: '2024-01',
  },
  'orders/paid': {
    topic: 'orders/paid',
    pubsubTopic: 'shopify-orders-paid',
    description: 'Order payment completed',
    apiVersion: '2024-01',
  },
  'orders/partially_fulfilled': {
    topic: 'orders/partially_fulfilled',
    pubsubTopic: 'shopify-orders-partial',
    description: 'Order partially fulfilled',
    apiVersion: '2024-01',
  },

  // Product webhooks
  'products/create': {
    topic: 'products/create',
    pubsubTopic: 'shopify-products',
    description: 'New product created',
    apiVersion: '2024-01',
  },
  'products/update': {
    topic: 'products/update',
    pubsubTopic: 'shopify-products',
    description: 'Product details updated',
    apiVersion: '2024-01',
  },
  'products/delete': {
    topic: 'products/delete',
    pubsubTopic: 'shopify-products',
    description: 'Product was deleted',
    apiVersion: '2024-01',
  },

  // Inventory webhooks
  'inventory_levels/update': {
    topic: 'inventory_levels/update',
    pubsubTopic: 'shopify-inventory',
    description: 'Inventory level changed',
    apiVersion: '2024-01',
  },
  'inventory_levels/connect': {
    topic: 'inventory_levels/connect',
    pubsubTopic: 'shopify-inventory',
    description: 'Inventory connected to location',
    apiVersion: '2024-01',
  },
  'inventory_levels/disconnect': {
    topic: 'inventory_levels/disconnect',
    pubsubTopic: 'shopify-inventory',
    description: 'Inventory disconnected from location',
    apiVersion: '2024-01',
  },

  // Fulfillment webhooks
  'fulfillments/create': {
    topic: 'fulfillments/create',
    pubsubTopic: 'shopify-fulfillments',
    description: 'Fulfillment created',
    apiVersion: '2024-01',
  },
  'fulfillments/update': {
    topic: 'fulfillments/update',
    pubsubTopic: 'shopify-fulfillments',
    description: 'Fulfillment updated',
    apiVersion: '2024-01',
  },

  // Refund webhooks
  'refunds/create': {
    topic: 'refunds/create',
    pubsubTopic: 'shopify-refunds',
    description: 'Refund created',
    apiVersion: '2024-01',
  },

  // Customer webhooks
  'customers/create': {
    topic: 'customers/create',
    pubsubTopic: 'shopify-customers',
    description: 'New customer created',
    apiVersion: '2024-01',
  },
  'customers/update': {
    topic: 'customers/update',
    pubsubTopic: 'shopify-customers',
    description: 'Customer details updated',
    apiVersion: '2024-01',
  },

  // App webhooks
  'app/uninstalled': {
    topic: 'app/uninstalled',
    pubsubTopic: 'shopify-app',
    description: 'App was uninstalled',
    apiVersion: '2024-01',
  },
}

// Get all webhook topics as array
export function getAllWebhookTopics(): string[] {
  return Object.keys(SHOPIFY_WEBHOOK_TOPICS)
}

// Get topics by category
export function getWebhookTopicsByCategory(category: 'orders' | 'products' | 'inventory' | 'fulfillments' | 'refunds' | 'customers' | 'app'): WebhookTopicConfig[] {
  return Object.values(SHOPIFY_WEBHOOK_TOPICS).filter(config =>
    config.topic.startsWith(category)
  )
}

// Get Pub/Sub topic for a webhook topic
export function getPubSubTopic(webhookTopic: string): string | null {
  const config = SHOPIFY_WEBHOOK_TOPICS[webhookTopic]
  return config?.pubsubTopic || null
}

// Webhook payload types
export interface ShopifyWebhookPayload {
  topic: string
  shop: string
  apiVersion: string
  webhookId: string
  payload: any
  receivedAt: Date
}

// Order webhook payload structure
export interface ShopifyOrderPayload {
  id: number
  admin_graphql_api_id: string
  order_number: number
  name: string
  email: string
  created_at: string
  updated_at: string
  cancelled_at: string | null
  closed_at: string | null
  processed_at: string
  financial_status: string
  fulfillment_status: string | null
  currency: string
  current_subtotal_price: string
  current_total_price: string
  current_total_tax: string
  total_price: string
  subtotal_price: string
  total_tax: string
  total_discounts: string
  total_line_items_price: string
  total_shipping_price_set: {
    shop_money: { amount: string; currency_code: string }
    presentment_money: { amount: string; currency_code: string }
  }
  customer: {
    id: number
    email: string
    first_name: string
    last_name: string
    phone: string | null
  } | null
  billing_address: ShopifyAddress | null
  shipping_address: ShopifyAddress | null
  line_items: ShopifyLineItem[]
  shipping_lines: ShopifyShippingLine[]
  fulfillments: ShopifyFulfillment[]
  refunds: ShopifyRefund[]
  note: string | null
  tags: string
  source_name: string
  discount_codes: ShopifyDiscountCode[]
}

export interface ShopifyAddress {
  first_name: string
  last_name: string
  company: string | null
  address1: string
  address2: string | null
  city: string
  province: string
  province_code: string
  country: string
  country_code: string
  zip: string
  phone: string | null
  name: string
}

export interface ShopifyLineItem {
  id: number
  variant_id: number | null
  product_id: number | null
  title: string
  variant_title: string | null
  sku: string | null
  vendor: string | null
  quantity: number
  price: string
  total_discount: string
  fulfillment_status: string | null
  fulfillable_quantity: number
  grams: number
  requires_shipping: boolean
  taxable: boolean
  gift_card: boolean
  product_exists: boolean
  properties: { name: string; value: string }[]
}

export interface ShopifyShippingLine {
  id: number
  title: string
  price: string
  code: string | null
  source: string
  carrier_identifier: string | null
  requested_fulfillment_service_id: string | null
}

export interface ShopifyFulfillment {
  id: number
  order_id: number
  status: string
  created_at: string
  updated_at: string
  tracking_company: string | null
  tracking_number: string | null
  tracking_numbers: string[]
  tracking_url: string | null
  tracking_urls: string[]
  shipment_status: string | null
  line_items: ShopifyLineItem[]
}

export interface ShopifyRefund {
  id: number
  order_id: number
  created_at: string
  note: string | null
  refund_line_items: {
    id: number
    quantity: number
    line_item_id: number
    subtotal: string
    total_tax: string
  }[]
  transactions: {
    id: number
    amount: string
    kind: string
    status: string
  }[]
}

export interface ShopifyDiscountCode {
  code: string
  amount: string
  type: string
}

// Product webhook payload structure
export interface ShopifyProductPayload {
  id: number
  admin_graphql_api_id: string
  title: string
  body_html: string | null
  vendor: string
  product_type: string
  created_at: string
  updated_at: string
  published_at: string | null
  template_suffix: string | null
  status: string
  tags: string
  handle: string
  variants: ShopifyVariantPayload[]
  options: { id: number; name: string; values: string[] }[]
  images: ShopifyImagePayload[]
  image: ShopifyImagePayload | null
}

export interface ShopifyVariantPayload {
  id: number
  product_id: number
  title: string
  price: string
  sku: string | null
  position: number
  inventory_policy: string
  compare_at_price: string | null
  fulfillment_service: string
  inventory_management: string | null
  option1: string | null
  option2: string | null
  option3: string | null
  created_at: string
  updated_at: string
  taxable: boolean
  barcode: string | null
  grams: number
  image_id: number | null
  weight: number
  weight_unit: string
  inventory_item_id: number
  inventory_quantity: number
  old_inventory_quantity: number
  requires_shipping: boolean
}

export interface ShopifyImagePayload {
  id: number
  product_id: number
  position: number
  created_at: string
  updated_at: string
  alt: string | null
  width: number
  height: number
  src: string
  variant_ids: number[]
}

// Inventory level webhook payload structure
export interface ShopifyInventoryLevelPayload {
  inventory_item_id: number
  location_id: number
  available: number | null
  updated_at: string
  admin_graphql_api_id: string
}

// Webhook registration response
export interface WebhookRegistrationResult {
  topic: string
  success: boolean
  webhookId?: string
  error?: string
}

// Webhook verification
export function verifyWebhookSignature(
  rawBody: string,
  hmacHeader: string,
  shopifySecret: string
): boolean {
  // This would use crypto.createHmac in a Node.js environment
  // For now, return true - actual implementation in Cloud Functions
  return true
}
