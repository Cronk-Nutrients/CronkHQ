import { Timestamp } from 'firebase/firestore'

// Base type for Firestore documents
export interface BaseDocument {
  id: string
  createdAt: Date | Timestamp | string
  updatedAt: Date | Timestamp | string
  createdBy?: string
}

// Dimensions type used across products and boxes
export interface Dimensions {
  length: number; // inches
  width: number;  // inches
  height: number; // inches
}

// Calculate volume from dimensions
export function calculateVolume(dims: Dimensions): number {
  return dims.length * dims.width * dims.height;
}

// Product & Inventory Types
export interface Product {
  id: string;
  sku: string;
  name: string;
  barcode?: string;
  category: 'nutrient' | 'supply' | 'packaging' | 'label';
  size?: '500mL' | '1L' | '4L';
  weight?: number; // in oz
  dimensions?: Dimensions;
  volume?: number; // cubic inches (calculated from dimensions)
  prices: ProductPrices;
  costs: ProductCosts;
  reorderPoint: number;
  casePackQty?: number; // Units per case (12 for 500mL/1L, 4 for 4L)
  isActive: boolean;
  // Linked label SKUs for nutrients (one for each size)
  linkedLabels?: {
    '500mL'?: string; // product ID of the 500mL label
    '1L'?: string;    // product ID of the 1L label
    '4L'?: string;    // product ID of the 4L label
  };
  // For labels: which product line this label belongs to
  labelForProduct?: string; // product ID this label is for
  labelSize?: '500mL' | '1L' | '4L';
  defaultVendor?: string; // Default supplier name
  createdAt: string;
  updatedAt: string;
}

export interface ProductPrices {
  msrp: number;
  shopify: number;
  amazon: number;
  wholesale: number;
  distributor: number;
}

export interface ProductCosts {
  base: number; // Base COGS
  amazonPrep: number; // Extra cost for Amazon prep
  shopify: number; // Cost for Shopify fulfillment
  labelCost?: number; // Auto-calculated from linked label
}

// Shipping Box type
export interface ShippingBox {
  id: string;
  sku: string;
  name: string;
  dimensions: Dimensions;
  volume: number; // cubic inches
  maxWeight: number; // oz
  cost: number;
  isSmartBoxEligible: boolean; // Can be auto-selected by smart box algorithm
  isActive: boolean;
}

export interface InventoryItem {
  id: string;
  productId: string;
  product?: Product;
  locationId: string;
  location?: Location;
  quantity: number;
  binLocation: string; // e.g., "A1-01", "B2-03"
  sublocation?: string; // e.g., "Higrocorp" for labels stored at vendor
  lotNumber?: string;
  expirationDate?: string;
}

export interface Location {
  id: string;
  name: string;
  type: 'warehouse' | 'fba' | 'fbm' | 'prep';
  address?: string;
  isActive: boolean;
}

// Bundle Types
export type BundleType = 'virtual' | 'physical' | 'fba_kit';

export interface BundleCompareAtPrices {
  msrp: number;
  shopify: number;
  amazon: number;
}

export interface Bundle {
  id: string;
  sku: string;
  name: string;
  type?: BundleType;
  description?: string;
  components: BundleComponent[];
  prices: ProductPrices;
  compareAtPrices?: BundleCompareAtPrices;
  isActive?: boolean;
  assemblyInstructions?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BundleComponent {
  productId: string;
  productName?: string;
  product?: Product;
  quantity: number;
}

// Order Types
export type OrderStatus = 'draft' | 'pending' | 'to_pick' | 'to_pack' | 'ready_to_ship' | 'shipped' | 'delivered' | 'cancelled';
export type OrderChannel = 'shopify' | 'amazon_fba' | 'amazon_fbm' | 'wholesale';

export interface Order {
  id: string;
  orderNumber: string;
  externalId?: string; // Shopify or Amazon order ID
  channel: OrderChannel;
  status: OrderStatus;
  customer: Customer;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  cogs: number;
  profit: number;
  marginPercent: number;
  shippingAddress: Address;
  // Shipment tracking - orders can have multiple shipments (split shipments)
  shipments: Shipment[];
  // Calculated fields for packing
  totalVolume?: number; // Sum of all item volumes
  totalWeight?: number; // Sum of all item weights
  suggestedBoxId?: string; // Smart box suggestion
  gripperStickersNeeded?: number; // 1 per bottle
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

// Shipment for split shipment support
export interface Shipment {
  id: string;
  orderId: string;
  shipmentNumber: number; // 1, 2, 3... for split shipments
  boxId?: string; // Which box was used
  box?: ShippingBox;
  items: ShipmentItem[]; // Which items are in this shipment
  trackingNumber?: string;
  carrier?: string;
  labelUrl?: string;
  status: 'packing' | 'ready_to_ship' | 'shipped' | 'delivered';
  shippedAt?: string;
  deliveredAt?: string;
  weight?: number; // Actual weight
  gripperStickersUsed?: number;
}

export interface ShipmentItem {
  orderItemId: string;
  productId?: string;
  bundleId?: string;
  quantity: number; // How many of this item in this shipment
}

export interface OrderItem {
  id: string;
  productId?: string;
  bundleId?: string;
  product?: Product;
  bundle?: Bundle;
  sku: string;
  name: string;
  quantity: number;
  price: number;
  cost: number;
  // For split shipments - track how many shipped
  quantityShipped?: number;
}

export interface Customer {
  name: string;
  email: string;
  phone?: string;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Pick & Pack Types
export type PickBatchStatus = 'queued' | 'in_progress' | 'completed';

export interface PickBatch {
  id: string;
  name: string;
  status: PickBatchStatus;
  orders: PickBatchOrder[];
  assignedTo?: string;
  createdAt: string;
  completedAt?: string;
}

export interface PickBatchOrder {
  orderId: string;
  order?: Order;
  toteBarcode?: string;
  status: 'pending' | 'picking' | 'picked';
}

export interface PickItem {
  productId: string;
  product?: Product;
  sku: string;
  name: string;
  quantity: number;
  binLocation: string;
  picked: number;
}

// Purchase Order Types
export type POStatus = 'draft' | 'sent' | 'partially_received' | 'received' | 'cancelled';
export type Currency = 'USD' | 'CAD';

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplier: Supplier;
  status: POStatus;
  currency: Currency;
  exchangeRate: number; // CAD to USD
  items: POLineItem[];
  subtotal: number;
  subtotalUSD: number;
  // Label auto-deduction tracking
  labelDeductions?: LabelDeduction[];
  labelDeductionWarnings?: string[];
  notes?: string;
  createdAt: string;
  expectedDate?: string;
  receivedAt?: string;
}

// Track label deductions when creating a PO
export interface LabelDeduction {
  labelProductId: string;
  labelSku: string;
  quantityDeducted: number;
  forProductId: string;
  forProductSku: string;
}

export interface POLineItem {
  id: string;
  productId: string;
  product?: Product;
  quantity: number;
  quantityReceived: number;
  unitCost: number;
  totalCost: number;
  // Linked label info
  linkedLabelId?: string;
  linkedLabelSku?: string;
  labelQuantityNeeded?: number;
}

export interface Supplier {
  id: string;
  name: string;
  contactName?: string;
  email?: string;
  phone?: string;
  address?: Address;
  currency: Currency;
}

// Work Order Types
export type WorkOrderStatus = 'draft' | 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface WorkOrder {
  id: string;
  woNumber: string;
  outputProductId: string;
  outputProduct?: Product;
  outputQuantity: number;
  status: WorkOrderStatus;
  inputs: WorkOrderInput[];
  laborHours?: number;
  notes?: string;
  createdAt: string;
  completedAt?: string;
}

export interface WorkOrderInput {
  productId: string;
  product?: Product;
  quantityRequired: number;
  quantityUsed: number;
}

// FBA Prep Types
export type FBAPrepStatus = 'pending' | 'prepping' | 'ready' | 'shipped';

export interface FBAShipment {
  id: string;
  shipmentId: string; // Amazon shipment ID
  status: FBAPrepStatus;
  items: FBAShipmentItem[];
  destinationFc: string; // Amazon fulfillment center
  createdAt: string;
  shippedAt?: string;
  trackingNumbers?: string[];
}

export interface FBAShipmentItem {
  productId: string;
  product?: Product;
  quantity: number;
  casePackQty: number; // 12 for 500mL/1L, 4 for 4L
  casesNeeded: number;
  prepTasks: PrepTask[];
}

export interface PrepTask {
  type: 'gripper_sticker' | 'fnsku_label' | 'poly_bag' | 'bubble_wrap';
  completed: boolean;
}

// SKU Mapping Types
export interface SKUMapping {
  id: string;
  productId: string;
  channel: 'shopify' | 'amazon';
  externalSku: string;
  externalId?: string; // Shopify variant ID or Amazon ASIN
}

// Fulfillment Rules
export interface FulfillmentRule {
  id: string;
  name: string;
  type: 'gripper_sticker' | 'box_selection' | 'label_deduction';
  isActive: boolean;
  config: FulfillmentRuleConfig;
}

export interface FulfillmentRuleConfig {
  // Gripper sticker rules
  stickersPerBottle?: number; // Default: 1

  // Box selection rules
  volumeBuffer?: number; // % buffer when calculating box size (e.g., 1.1 = 10% buffer)
  preferSmartBox?: boolean;

  // Label deduction rules
  deductOnPOCreate?: boolean; // Deduct labels when PO is created vs received
}

// Dashboard & Reports Types
export interface DashboardStats {
  revenue: number;
  revenueChange: number;
  grossProfit: number;
  grossProfitChange: number;
  cogs: number;
  cogsChange: number;
  ordersCount: number;
  ordersChange: number;
  unitsShipped: number;
  aov: number;
  aovChange: number;
}

export interface ChannelPerformance {
  channel: OrderChannel;
  revenue: number;
  orders: number;
  units: number;
  aov: number;
  margin: number;
  profit: number;
}

export interface FulfillmentPipeline {
  toPick: number;
  toPack: number;
  readyToShip: number;
  shipped: number;
  delivered: number;
}

export interface InventoryValuation {
  locationId: string;
  locationName: string;
  location?: Location;
  totalCostValue: number;
  totalMsrpValue: number;
  unrealizedProfit: number;
  skuCount: number;
  unitCount: number;
  margin?: number;
}

// Date Range Types
export type DateRangePreset = 'today' | 'wtd' | 'mtd' | 'ytd' | 'custom';

export interface DateRange {
  preset: DateRangePreset;
  startDate: string;
  endDate: string;
}

// Settings Types
export interface IntegrationSettings {
  shopify: {
    connected: boolean;
    storeUrl?: string;
    lastSync?: string;
  };
  amazon: {
    connected: boolean;
    sellerId?: string;
    lastSync?: string;
  };
  veeqo: {
    connected: boolean;
    lastSync?: string;
  };
}

// Utility types for smart box selection
export interface BoxSuggestion {
  box: ShippingBox;
  fits: boolean;
  volumeUtilization: number; // percentage of box used
  weightOk: boolean;
}

// Inventory transaction for tracking gripper sticker deductions, etc.
export interface InventoryTransaction {
  id: string;
  productId: string;
  locationId: string;
  type: 'adjustment' | 'shipment' | 'receive' | 'transfer' | 'auto_deduction';
  quantity: number; // positive for additions, negative for deductions
  reason: string;
  referenceType?: 'order' | 'po' | 'work_order' | 'fba_shipment';
  referenceId?: string;
  createdAt: string;
  createdBy?: string;
}

// Extended Customer with full details
export interface CustomerFull {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  type: 'retail' | 'wholesale';
  createdAt?: string;
  totalOrders?: number;
  totalSpent?: number;
}

// Shipping Option
export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  description: string;
  carrier?: string;
  estimatedDays?: string;
}

// Unit Types
export type WeightUnit = 'oz' | 'lbs' | 'g' | 'kg';
export type DimensionUnit = 'in' | 'cm';
export type CurrencyCode = 'USD' | 'CAD' | 'MXN';

// Filter Types
export type CategoryFilter = 'all' | 'nutrients' | 'supplements' | 'ph_adjusters' | 'bundles' | 'supplies' | 'labels';
export type StockStatusFilter = 'all' | 'in_stock' | 'low_stock' | 'out_of_stock';
export type LocationFilter = 'all' | 'texas_wh' | 'amazon_fba_usa' | 'amazon_fba_ca';

// UI Tab Types
export type SettingsTab = 'fulfillment' | 'boxes' | 'locations' | 'integrations';
export type PickPackTab = 'pick' | 'pack';
export type ReportsTab = 'overview' | 'products' | 'channels' | 'shipping';

// Table Column Definition
export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
  render?: (item: T) => React.ReactNode;
}

// Pagination
export interface PaginationState {
  page: number;
  perPage: number;
  total: number;
}

// Sort State
export interface SortState {
  key: string;
  direction: 'asc' | 'desc';
}

// Filter State
export interface FilterState {
  search: string;
  status: string;
  category?: string;
  location?: string;
  dateRange?: string;
  channel?: string;
}

// Return Types
export type ReturnStatus = 'pending' | 'received' | 'inspected' | 'processed' | 'completed' | 'rejected';
export type ReturnItemCondition = 'new' | 'like_new' | 'damaged' | 'defective';
export type ReturnItemAction = 'restock' | 'dispose' | 'return_to_supplier';

export interface Return extends BaseDocument {
  returnNumber: string;
  orderId: string;
  orderNumber: string;
  status: ReturnStatus;
  customer: {
    name: string;
    email?: string;
  };
  items: ReturnItem[];
  reason: string;
  customerNotes?: string;
  internalNotes?: string;
  refundAmount: number;
  refundStatus: 'pending' | 'processed' | 'declined';
  receivedAt?: Date | Timestamp | string;
  processedAt?: Date | Timestamp | string;
}

export interface ReturnItem {
  productId: string;
  sku: string;
  name: string;
  quantity: number;
  condition: ReturnItemCondition;
  action: ReturnItemAction;
}

// Stock Transfer Types
export type TransferStatus = 'draft' | 'in_transit' | 'received' | 'cancelled';

export interface StockTransfer extends BaseDocument {
  transferNumber: string;
  fromLocationId: string;
  fromLocationName: string;
  toLocationId: string;
  toLocationName: string;
  status: TransferStatus;
  items: StockTransferItem[];
  notes?: string;
  shippedAt?: Date | Timestamp | string;
  receivedAt?: Date | Timestamp | string;
}

export interface StockTransferItem {
  productId: string;
  sku: string;
  name: string;
  quantitySent: number;
  quantityReceived: number;
}

// Inventory Level (per location)
export interface InventoryLevel extends BaseDocument {
  productId: string;
  locationId: string;
  quantity: number;
  availableQuantity: number;
  reservedQuantity: number;
  binLocation?: string;
  lotNumber?: string;
  expirationDate?: Date | Timestamp | string;
  lastCountedAt?: Date | Timestamp | string;
}

// Custom Pricing Types
export type CustomPriceCurrency = 'USD' | 'CAD' | 'EUR' | 'GBP' | 'MXN' | 'AUD';

export interface CustomPriceField {
  id: string;
  name: string;
  key: string;
  currency: CustomPriceCurrency;
  isActive: boolean;
  createdAt: Date | Timestamp | string;
}

export interface CustomPriceValue {
  value: number;
  currency: CustomPriceCurrency;
}

// Product Image
export interface ProductImage {
  id: string;
  url: string;
  thumbnailUrl: string;
  filename: string;
  size: number;
  isPrimary: boolean;
  uploadedAt: Date | Timestamp | string;
  uploadedBy: string;
}

// Category
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parentId: string | null;
  color: string;
  productCount: number;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date | Timestamp | string;
  updatedAt: Date | Timestamp | string;
}

// Extended Product interface with custom pricing support
export interface ProductExtended {
  id: string;

  // Basic Info
  name: string;
  sku: string;
  category: string;
  itemType?: string;
  description?: string;
  barcode?: string | null;
  notes?: string | null;
  status: 'active' | 'inactive' | 'draft';

  // Images
  images?: string[];
  thumbnail?: string | null;

  // Standard Pricing
  cost: number;
  retailPrice: number;

  // Custom Pricing (dynamic)
  customPrices?: Record<string, CustomPriceValue>;

  // Dimensions
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: 'in' | 'cm';
  };
  weight?: number;
  weightUnit?: 'lb' | 'kg' | 'oz' | 'g';

  // Units of Measure
  uom?: string | null;
  salesUom?: string | null;
  purchasingUom?: string | null;
  casePackQty?: number | null;

  // Supplier
  supplierName?: string | null;
  supplierSku?: string | null;
  supplierPrice?: number | null;

  // Customs & Compliance
  hsCode?: string | null;
  countryOfOrigin?: string | null;

  // Inventory
  totalStock?: number;
  availableStock?: number;
  reservedStock?: number;
  lowStockThreshold?: number;

  // Integrations
  shopifyId?: string | null;
  amazonAsin?: string | null;

  // Timestamps
  createdAt: Date | Timestamp | string;
  updatedAt: Date | Timestamp | string;
  createdBy?: string | null;
}

// Location Types
export type LocationType = 'warehouse' | 'fba' | 'retail' | '3pl' | 'dropship' | 'other';

export interface LocationAddress {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface LocationContact {
  name: string;
  email: string;
  phone: string;
}

export interface LocationExtended {
  id: string;
  name: string;
  code: string;
  type: LocationType;

  address: LocationAddress | null;
  contact: LocationContact | null;

  isDefault: boolean;
  isActive: boolean;
  trackSublocations: boolean;

  fbaDetails?: {
    marketplaceId: string;
    fulfillmentCenterId: string;
  };

  notes: string | null;

  totalProducts: number;
  totalUnits: number;

  createdAt: Date | Timestamp | string;
  updatedAt: Date | Timestamp | string;
  createdBy: string;
}

export interface Sublocation {
  id: string;
  name: string;
  code: string;
  zone?: string;
  aisle?: string;
  rack?: string;
  shelf?: string;
  bin?: string;
  isActive: boolean;
  totalProducts: number;
  totalUnits: number;
  createdAt: Date | Timestamp | string;
  updatedAt: Date | Timestamp | string;
}

// Shopify Integration Types
export interface ShopifySyncSettings {
  productSyncMode: 'read' | 'write' | 'bidirectional';
  autoSyncProducts: boolean;
  pushProductChanges: boolean;
  orderSyncMode: 'read';
  autoSyncOrders: boolean;
  inventorySyncMode: 'read' | 'write' | 'bidirectional';
  pushInventoryLevels: boolean;
  syncIntervalMinutes: number;
}

export interface ShopifyConnection {
  isConnected: boolean;
  storeName: string;
  storeUrl: string;
  accessToken: string;
  lastSyncProducts: Date | Timestamp | null;
  lastSyncOrders: Date | Timestamp | null;
  syncSettings: ShopifySyncSettings;
  connectedAt: Date | Timestamp | null;
  connectedBy: string | null;
}

export interface ShopifyCustomer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
}

export interface ShopifyShippingAddress {
  firstName: string;
  lastName: string;
  company: string | null;
  address1: string;
  address2: string | null;
  city: string;
  province: string;
  provinceCode: string;
  country: string;
  countryCode: string;
  zip: string;
  phone: string | null;
}

export interface ShopifyOrderLineItem {
  id: string;
  shopifyLineItemId: string;
  productId: string | null;
  shopifyProductId: string | null;
  shopifyVariantId: string | null;
  sku: string;
  name: string;
  variantTitle: string | null;
  quantity: number;
  price: number;
  totalDiscount: number;
  requiresShipping: boolean;
  fulfillableQuantity: number;
  fulfillmentStatus: 'unfulfilled' | 'fulfilled';
}

export interface ShopifyOrder {
  id: string;
  shopifyId: string;
  shopifyOrderNumber: string;
  shopifyOrderName: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  fulfillmentStatus: 'unfulfilled' | 'partial' | 'fulfilled';
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'partially_refunded';
  customer: ShopifyCustomer;
  shippingAddress: ShopifyShippingAddress;
  lineItems: ShopifyOrderLineItem[];
  subtotal: number;
  shippingTotal: number;
  taxTotal: number;
  discountTotal: number;
  total: number;
  currency: string;
  shippingMethod: string | null;
  requestedShippingService: string | null;
  note: string | null;
  tags: string[];
  shopifyCreatedAt: Date | Timestamp;
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
  source: 'shopify' | 'manual';
}
