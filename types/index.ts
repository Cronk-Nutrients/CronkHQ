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
