'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';

// Types
// Component for product manufacturing BOM
export interface ProductComponent {
  productId: string;
  productName: string;
  quantity: number;
}

export interface ProductVariant {
  id: string;
  sku: string;
  name: string;
  size?: string;
  productId: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  barcode?: string;
  category: string;
  description?: string;
  cost: {
    rolling: number;
    fixed: number;
  };
  prices: {
    msrp: number;
    shopify: number;
    amazon: number;
    wholesale: number;
  };
  weight: {
    value: number;
    unit: 'lbs' | 'oz' | 'kg' | 'g';
  };
  dimensions?: { length: number; width: number; height: number };
  reorderPoint: number;
  supplier?: string;
  skus?: {
    shopify?: string;
    amazon?: string;
  };
  imageUrl?: string;
  // Manufacturing components (BOM) - e.g., front label, back label
  components?: ProductComponent[];
  // Case pack quantity for PO ordering
  casePackQty?: number;
  // Parent product ID if this is a variant
  parentProductId?: string;
  // Variant info (e.g., size)
  variantInfo?: {
    size?: string;
    type?: string;
  };
  // Serial number tracking
  trackSerials?: boolean;
  serialPrefix?: string;
  serialNextNumber?: number;
  serialSuffix?: string;
  // Lot/batch tracking
  trackLots?: boolean;
  expirationTracking?: boolean;
  expirationWarningDays?: number;
  lotPrefix?: string;
  lotNextNumber?: number;
  // Supplier
  primarySupplierId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Serial Number Tracking Types
export interface SerialNumber {
  id: string;
  serial: string;
  productId: string;
  productName: string;
  sku: string;
  status: 'in_stock' | 'reserved' | 'sold' | 'returned' | 'damaged';
  locationId: string;
  locationName: string;
  purchaseOrderId?: string;
  salesOrderId?: string;
  receivedAt: Date;
  soldAt?: Date;
  notes?: string;
}

export interface SerialMovement {
  id: string;
  serialId: string;
  serialNumber: string;
  type: 'received' | 'transferred' | 'sold' | 'returned' | 'adjusted';
  fromLocationId?: string;
  fromLocationName?: string;
  toLocationId?: string;
  toLocationName?: string;
  orderId?: string;
  poId?: string;
  notes?: string;
  createdAt: Date;
  createdBy?: string;
}

// Lot/Batch Tracking Types
export interface InventoryLot {
  id: string;
  lotNumber: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  reservedQty: number;
  expirationDate?: Date;
  manufacturedDate?: Date;
  receivedDate: Date;
  status: 'active' | 'quarantine' | 'expired' | 'recalled';
  locationId: string;
  locationName: string;
  purchaseOrderId?: string;
  supplierLotNumber?: string;
  notes?: string;
  cost?: number;
}

export interface LotMovement {
  id: string;
  lotId: string;
  lotNumber: string;
  productId: string;
  type: 'received' | 'picked' | 'transferred' | 'adjusted' | 'expired' | 'recalled';
  quantity: number;
  fromLocationId?: string;
  fromLocationName?: string;
  toLocationId?: string;
  toLocationName?: string;
  orderId?: string;
  orderNumber?: string;
  notes?: string;
  createdAt: Date;
  createdBy?: string;
}

// Supplier Management Types
export interface Supplier {
  id: string;
  name: string;
  code: string; // Short code like "HGC" for HIGROCORP
  contactName?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  currency: 'USD' | 'CAD' | 'EUR' | 'GBP';
  paymentTerms?: string; // "Net 30", "COD", etc.
  leadTimeDays?: number;
  minimumOrderValue?: number;
  notes?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductSupplier {
  productId: string;
  supplierId: string;
  supplierSku?: string; // Supplier's SKU for this product
  unitCost: number;
  currency: 'USD' | 'CAD' | 'EUR' | 'GBP';
  minimumOrderQty?: number;
  leadTimeDays?: number;
  isPrimary: boolean;
  lastOrderedAt?: Date;
  notes?: string;
}

export interface InventoryLevel {
  productId: string;
  locationId: string;
  quantity: number;
  binLocation?: string;
  updatedAt: Date;
}

export interface Location {
  id: string;
  name: string;
  type: 'warehouse' | 'fba' | 'fbm';
  address?: string;
  isDefault: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  price: number;
  cost: number;
  picked?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  veeqoId?: string;
  channel: 'shopify' | 'amazon_fbm' | 'amazon_fba' | 'manual';
  status: 'draft' | 'to_pick' | 'picking' | 'to_pack' | 'packing' | 'ready' | 'shipped' | 'delivered' | 'cancelled';
  customer: {
    name: string;
    email: string;
    phone?: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  cogs: number;
  profit: number;
  margin: number;
  trackingNumber?: string;
  carrier?: string;
  service?: string;
  shippedAt?: Date;
  // Picking batch assignment
  pickingBatchId?: string;
  // Billing address (can be different from shipping)
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  // Order notes
  notes?: string;
  // Automation rule related fields
  tags?: string[];
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  suggestedCarrier?: string;
  suggestedService?: string;
  suggestedBoxId?: string;
  fulfillmentItems?: {
    productId: string;
    quantity: number;
    reason: string;
  }[];
  isPrime?: boolean;
  requiresSignature?: boolean;
  totalWeight?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PickingBatch {
  id: string;
  batchNumber: string;
  status: 'open' | 'in_progress' | 'completed';
  orderIds: string[];
  assignedTo?: string;
  createdAt: Date;
  completedAt?: Date;
}

// Return types
export type ReturnReason =
  | 'damaged_in_transit'
  | 'defective'
  | 'wrong_item_sent'
  | 'not_as_described'
  | 'changed_mind'
  | 'ordered_wrong'
  | 'arrived_late'
  | 'better_price_found'
  | 'other';

export type ItemCondition =
  | 'new_sealed'
  | 'new_opened'
  | 'like_new'
  | 'good'
  | 'damaged'
  | 'unsellable';

export interface ReturnItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  quantityReceived: number;
  reason: ReturnReason;
  condition?: ItemCondition;
  refundAmount: number;
}

export interface Return {
  id: string;
  returnNumber: string;
  orderId: string;
  orderNumber: string;
  channel: 'shopify' | 'amazon_fbm' | 'amazon_fba' | 'manual';
  status: 'requested' | 'approved' | 'in_transit' | 'received' | 'inspected' | 'refunded' | 'rejected';
  customer: {
    name: string;
    email: string;
  };
  items: ReturnItem[];
  returnShipping: {
    trackingNumber?: string;
    carrier?: string;
    labelUrl?: string;
  };
  refund: {
    subtotal: number;
    shipping: number;
    restockingFee: number;
    total: number;
    refundedAt?: Date;
    refundMethod?: 'original_payment' | 'store_credit' | 'manual';
  };
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Stock Count types
export interface StockCountItem {
  productId: string;
  productName: string;
  sku: string;
  binLocation?: string;
  systemQty: number;
  countedQty: number | null;
  variance: number;
  varianceValue: number;
  status: 'pending' | 'counted' | 'verified';
  countedBy?: string;
  countedAt?: Date;
  notes?: string;
}

export interface StockCount {
  id: string;
  countNumber: string;
  name: string;
  type: 'full' | 'cycle' | 'spot';
  status: 'draft' | 'in_progress' | 'completed' | 'cancelled';
  location: string;
  locationName: string;
  category?: string;
  assignedTo?: string;
  items: StockCountItem[];
  summary: {
    totalItems: number;
    countedItems: number;
    matchedItems: number;
    discrepancyItems: number;
    totalVariance: number;
  };
  startedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Stock Transfer types
export interface TransferItem {
  productId: string;
  productName: string;
  sku: string;
  requestedQty: number;
  shippedQty: number;
  receivedQty: number;
  status: 'pending' | 'shipped' | 'received' | 'short';
}

export interface StockTransfer {
  id: string;
  transferNumber: string;
  status: 'draft' | 'pending' | 'in_transit' | 'received' | 'cancelled';
  fromLocation: string;
  fromLocationName: string;
  toLocation: string;
  toLocationName: string;
  items: TransferItem[];
  notes?: string;
  requestedBy?: string;
  shippedAt?: Date;
  receivedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PurchaseOrderItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  receivedQty: number;
  unitCost: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplier: string;
  status: 'draft' | 'sent' | 'partial' | 'received' | 'cancelled';
  currency: 'USD' | 'CAD';
  expectedDate?: Date;
  items: PurchaseOrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkOrderComponent {
  productId: string;
  productName: string;
  quantityRequired: number;
  quantityUsed: number;
}

export interface WorkOrder {
  id: string;
  woNumber: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  outputProductId: string;
  outputProductName: string;
  quantityToProduce: number;
  quantityProduced: number;
  priority: 'normal' | 'high' | 'urgent';
  dueDate?: Date;
  components: WorkOrderComponent[];
  notes?: string;
  startedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
}

export interface BundleComponent {
  productId: string;
  productName: string;
  quantity: number;
}

export interface Bundle {
  id: string;
  name: string;
  sku: string;
  type: 'virtual' | 'physical' | 'fba_kit';
  description?: string;
  prices: {
    msrp: number;
    shopify: number;
    amazon: number;
    wholesale: number;
  };
  compareAtPrices: {
    msrp: number;
    shopify: number;
    amazon: number;
  };
  components: BundleComponent[];
  assemblyInstructions?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Shipment {
  id: string;
  orderId: string;
  orderNumber: string;
  carrier: 'usps' | 'ups' | 'fedex' | 'dhl';
  service: string;
  trackingNumber: string;
  customerPaid: number;
  actualCost: number;
  profit: number;
  weight: number;
  status: 'label_created' | 'in_transit' | 'delivered' | 'exception';
  customerName: string;
  customerCity: string;
  customerState: string;
  shippedAt: Date;
  deliveredAt?: Date;
}

export interface ShippingBox {
  id: string;
  name: string;
  sku?: string;
  innerLength: number;
  innerWidth: number;
  innerHeight: number;
  maxWeight: number;
  cost?: number;
  smartBoxEligible: boolean;
}

export interface AppSettings {
  companyName: string;
  companyAddress?: string;
  logoUrl?: string;
  defaultLocation: string;
  gripperStickerEnabled: boolean;
  gripperStickerSku: string;
  smartBoxEnabled: boolean;
  lowStockThreshold: number;
  // Picking Settings
  pickingMode: 'multi_tote' | 'single_tote';
  maxOrdersPerBatch: number;
  maxItemsPerBatch: number;
  autoReallocateIncomplete: boolean;
}

// Picking Tote
export interface PickingTote {
  id: string;
  barcode: string;
  name: string;
  locationId: string;
  isActive: boolean;
}

// Fulfillment Rule (user-configurable)
export type FulfillmentRuleType =
  | 'gripper_sticker'
  | 'box_selection'
  | 'label_deduction'
  | 'auto_allocate'
  | 'weight_threshold'
  | 'custom';

export interface FulfillmentRule {
  id: string;
  name: string;
  description?: string;
  type: FulfillmentRuleType;
  enabled: boolean;
  priority: number;
  conditions: FulfillmentRuleCondition[];
  actions: FulfillmentRuleAction[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FulfillmentRuleCondition {
  id: string;
  field: 'channel' | 'sku' | 'category' | 'weight' | 'quantity' | 'total_value' | 'destination_state' | 'destination_country';
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'in_list';
  value: string | number | string[];
}

export interface FulfillmentRuleAction {
  id: string;
  type: 'add_item' | 'deduct_inventory' | 'set_box' | 'add_note' | 'set_carrier' | 'apply_discount';
  config: {
    productId?: string;
    quantity?: number;
    boxId?: string;
    note?: string;
    carrier?: string;
    discountPercent?: number;
  };
}

// Automation Rule Types
export interface AutomationRule {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
  trigger: RuleTrigger;
  conditions: RuleCondition[];
  actions: RuleAction[];
  priority: number; // Lower = runs first
  createdAt: Date;
  updatedAt: Date;
}

export type RuleTrigger =
  | { type: 'order_created' }
  | { type: 'order_status_changed'; fromStatus?: string; toStatus?: string }
  | { type: 'low_stock'; threshold?: number }
  | { type: 'item_received' }
  | { type: 'daily'; time: string } // "09:00"
  | { type: 'manual' };

export interface RuleCondition {
  id: string;
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'in_list';
  value: string | number | boolean | string[];
}

export interface RuleAction {
  id: string;
  type: RuleActionType;
  config: Record<string, any>;
}

export type RuleActionType =
  | 'set_order_tag'
  | 'set_priority'
  | 'assign_carrier'
  | 'assign_service'
  | 'select_box'
  | 'send_notification'
  | 'add_fulfillment_item'
  | 'set_location'
  | 'create_po_draft'
  | 'send_email';

// Condition field options by trigger type
export const conditionFields = {
  order: [
    { value: 'channel', label: 'Sales Channel' },
    { value: 'total', label: 'Order Total' },
    { value: 'item_count', label: 'Item Count' },
    { value: 'shipping_country', label: 'Ship To Country' },
    { value: 'shipping_state', label: 'Ship To State' },
    { value: 'customer_email', label: 'Customer Email' },
    { value: 'contains_sku', label: 'Contains SKU' },
    { value: 'weight', label: 'Total Weight' },
    { value: 'is_prime', label: 'Is Amazon Prime' },
    { value: 'requires_signature', label: 'Requires Signature' }
  ],
  inventory: [
    { value: 'sku', label: 'Product SKU' },
    { value: 'category', label: 'Category' },
    { value: 'quantity', label: 'Quantity' },
    { value: 'location', label: 'Location' },
    { value: 'cost', label: 'Product Cost' }
  ]
};

export interface AppState {
  products: Product[];
  inventory: InventoryLevel[];
  locations: Location[];
  orders: Order[];
  purchaseOrders: PurchaseOrder[];
  workOrders: WorkOrder[];
  bundles: Bundle[];
  shipments: Shipment[];
  boxes: ShippingBox[];
  pickingBatches: PickingBatch[];
  pickingTotes: PickingTote[];
  fulfillmentRules: FulfillmentRule[];
  returns: Return[];
  stockCounts: StockCount[];
  transfers: StockTransfer[];
  automationRules: AutomationRule[];
  serialNumbers: SerialNumber[];
  serialMovements: SerialMovement[];
  lots: InventoryLot[];
  lotMovements: LotMovement[];
  suppliers: Supplier[];
  productSuppliers: ProductSupplier[];
  settings: AppSettings;
  isLoading: boolean;
  isInitialized: boolean;
}

// Action Types
type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_INITIALIZED'; payload: boolean }
  | { type: 'RESET_STATE' }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'SET_INVENTORY'; payload: InventoryLevel[] }
  | { type: 'UPDATE_INVENTORY'; payload: InventoryLevel }
  | { type: 'ADJUST_STOCK'; payload: { productId: string; locationId: string; adjustment: number } }
  | { type: 'SET_LOCATIONS'; payload: Location[] }
  | { type: 'ADD_LOCATION'; payload: Location }
  | { type: 'UPDATE_LOCATION'; payload: Location }
  | { type: 'DELETE_LOCATION'; payload: string }
  | { type: 'SET_ORDERS'; payload: Order[] }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { orderId: string; status: Order['status'] } }
  | { type: 'DELETE_ORDER'; payload: string }
  | { type: 'SET_PURCHASE_ORDERS'; payload: PurchaseOrder[] }
  | { type: 'ADD_PURCHASE_ORDER'; payload: PurchaseOrder }
  | { type: 'UPDATE_PURCHASE_ORDER'; payload: PurchaseOrder }
  | { type: 'DELETE_PURCHASE_ORDER'; payload: string }
  | { type: 'SET_WORK_ORDERS'; payload: WorkOrder[] }
  | { type: 'ADD_WORK_ORDER'; payload: WorkOrder }
  | { type: 'UPDATE_WORK_ORDER'; payload: WorkOrder }
  | { type: 'DELETE_WORK_ORDER'; payload: string }
  | { type: 'SET_BUNDLES'; payload: Bundle[] }
  | { type: 'ADD_BUNDLE'; payload: Bundle }
  | { type: 'UPDATE_BUNDLE'; payload: Bundle }
  | { type: 'DELETE_BUNDLE'; payload: string }
  | { type: 'SET_SHIPMENTS'; payload: Shipment[] }
  | { type: 'ADD_SHIPMENT'; payload: Shipment }
  | { type: 'UPDATE_SHIPMENT'; payload: Shipment }
  | { type: 'SET_BOXES'; payload: ShippingBox[] }
  | { type: 'ADD_BOX'; payload: ShippingBox }
  | { type: 'UPDATE_BOX'; payload: ShippingBox }
  | { type: 'DELETE_BOX'; payload: string }
  | { type: 'SET_PICKING_BATCHES'; payload: PickingBatch[] }
  | { type: 'ADD_PICKING_BATCH'; payload: PickingBatch }
  | { type: 'UPDATE_PICKING_BATCH'; payload: PickingBatch }
  | { type: 'DELETE_PICKING_BATCH'; payload: string }
  | { type: 'ASSIGN_ORDER_TO_BATCH'; payload: { orderId: string; batchId: string | null } }
  | { type: 'SET_RETURNS'; payload: Return[] }
  | { type: 'ADD_RETURN'; payload: Return }
  | { type: 'UPDATE_RETURN'; payload: Return }
  | { type: 'SET_STOCK_COUNTS'; payload: StockCount[] }
  | { type: 'ADD_STOCK_COUNT'; payload: StockCount }
  | { type: 'UPDATE_STOCK_COUNT'; payload: StockCount }
  | { type: 'DELETE_STOCK_COUNT'; payload: string }
  | { type: 'SET_TRANSFERS'; payload: StockTransfer[] }
  | { type: 'ADD_TRANSFER'; payload: StockTransfer }
  | { type: 'UPDATE_TRANSFER'; payload: StockTransfer }
  | { type: 'SET_AUTOMATION_RULES'; payload: AutomationRule[] }
  | { type: 'ADD_AUTOMATION_RULE'; payload: AutomationRule }
  | { type: 'UPDATE_AUTOMATION_RULE'; payload: AutomationRule }
  | { type: 'DELETE_AUTOMATION_RULE'; payload: string }
  | { type: 'TOGGLE_RULE'; payload: string }
  | { type: 'SET_SERIAL_NUMBERS'; payload: SerialNumber[] }
  | { type: 'ADD_SERIAL_NUMBERS'; payload: SerialNumber[] }
  | { type: 'UPDATE_SERIAL_NUMBER'; payload: SerialNumber }
  | { type: 'RESERVE_SERIALS'; payload: { serials: string[]; orderId: string } }
  | { type: 'SELL_SERIALS'; payload: { serials: string[]; orderId: string } }
  | { type: 'RETURN_SERIAL'; payload: { serial: string; condition: 'in_stock' | 'damaged' } }
  | { type: 'ADD_SERIAL_MOVEMENT'; payload: SerialMovement }
  | { type: 'SET_LOTS'; payload: InventoryLot[] }
  | { type: 'ADD_LOT'; payload: InventoryLot }
  | { type: 'ADD_LOTS'; payload: InventoryLot[] }
  | { type: 'UPDATE_LOT'; payload: InventoryLot }
  | { type: 'PICK_FROM_LOT'; payload: { lotId: string; quantity: number; orderId: string; orderNumber: string } }
  | { type: 'RESERVE_LOT_QTY'; payload: { lotId: string; quantity: number } }
  | { type: 'RELEASE_LOT_QTY'; payload: { lotId: string; quantity: number } }
  | { type: 'RECALL_LOT'; payload: { lotId: string; notes: string } }
  | { type: 'QUARANTINE_LOT'; payload: { lotId: string; notes: string } }
  | { type: 'ADD_LOT_MOVEMENT'; payload: LotMovement }
  | { type: 'SET_SUPPLIERS'; payload: Supplier[] }
  | { type: 'ADD_SUPPLIER'; payload: Supplier }
  | { type: 'UPDATE_SUPPLIER'; payload: Supplier }
  | { type: 'DELETE_SUPPLIER'; payload: string }
  | { type: 'SET_PRODUCT_SUPPLIERS'; payload: ProductSupplier[] }
  | { type: 'ADD_PRODUCT_SUPPLIER'; payload: ProductSupplier }
  | { type: 'UPDATE_PRODUCT_SUPPLIER'; payload: ProductSupplier }
  | { type: 'REMOVE_PRODUCT_SUPPLIER'; payload: { productId: string; supplierId: string } }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<AppSettings> }
  // Picking Totes
  | { type: 'SET_PICKING_TOTES'; payload: PickingTote[] }
  | { type: 'ADD_PICKING_TOTE'; payload: PickingTote }
  | { type: 'UPDATE_PICKING_TOTE'; payload: PickingTote }
  | { type: 'DELETE_PICKING_TOTE'; payload: string }
  // Fulfillment Rules
  | { type: 'SET_FULFILLMENT_RULES'; payload: FulfillmentRule[] }
  | { type: 'ADD_FULFILLMENT_RULE'; payload: FulfillmentRule }
  | { type: 'UPDATE_FULFILLMENT_RULE'; payload: FulfillmentRule }
  | { type: 'DELETE_FULFILLMENT_RULE'; payload: string };

// Reducer
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_INITIALIZED':
      return { ...state, isInitialized: action.payload };
    case 'RESET_STATE':
      return { ...initialState, isLoading: false, isInitialized: true };

    // Products
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(p => p.id === action.payload.id ? action.payload : p),
      };
    case 'DELETE_PRODUCT':
      return { ...state, products: state.products.filter(p => p.id !== action.payload) };

    // Inventory
    case 'SET_INVENTORY':
      return { ...state, inventory: action.payload };
    case 'UPDATE_INVENTORY':
      return {
        ...state,
        inventory: state.inventory.map(inv =>
          inv.productId === action.payload.productId && inv.locationId === action.payload.locationId
            ? action.payload
            : inv
        ),
      };
    case 'ADJUST_STOCK':
      return {
        ...state,
        inventory: state.inventory.map(inv =>
          inv.productId === action.payload.productId && inv.locationId === action.payload.locationId
            ? { ...inv, quantity: inv.quantity + action.payload.adjustment, updatedAt: new Date() }
            : inv
        ),
      };

    // Locations
    case 'SET_LOCATIONS':
      return { ...state, locations: action.payload };
    case 'ADD_LOCATION':
      return { ...state, locations: [...state.locations, action.payload] };
    case 'UPDATE_LOCATION':
      return {
        ...state,
        locations: state.locations.map(l => l.id === action.payload.id ? action.payload : l),
      };
    case 'DELETE_LOCATION':
      return { ...state, locations: state.locations.filter(l => l.id !== action.payload) };

    // Orders
    case 'SET_ORDERS':
      return { ...state, orders: action.payload };
    case 'ADD_ORDER':
      return { ...state, orders: [...state.orders, action.payload] };
    case 'UPDATE_ORDER':
      return {
        ...state,
        orders: state.orders.map(o => o.id === action.payload.id ? action.payload : o),
      };
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(o =>
          o.id === action.payload.orderId
            ? { ...o, status: action.payload.status, updatedAt: new Date() }
            : o
        ),
      };
    case 'DELETE_ORDER':
      return { ...state, orders: state.orders.filter(o => o.id !== action.payload) };

    // Purchase Orders
    case 'SET_PURCHASE_ORDERS':
      return { ...state, purchaseOrders: action.payload };
    case 'ADD_PURCHASE_ORDER':
      return { ...state, purchaseOrders: [...state.purchaseOrders, action.payload] };
    case 'UPDATE_PURCHASE_ORDER':
      return {
        ...state,
        purchaseOrders: state.purchaseOrders.map(po =>
          po.id === action.payload.id ? action.payload : po
        ),
      };
    case 'DELETE_PURCHASE_ORDER':
      return { ...state, purchaseOrders: state.purchaseOrders.filter(po => po.id !== action.payload) };

    // Work Orders
    case 'SET_WORK_ORDERS':
      return { ...state, workOrders: action.payload };
    case 'ADD_WORK_ORDER':
      return { ...state, workOrders: [...state.workOrders, action.payload] };
    case 'UPDATE_WORK_ORDER':
      return {
        ...state,
        workOrders: state.workOrders.map(wo =>
          wo.id === action.payload.id ? action.payload : wo
        ),
      };
    case 'DELETE_WORK_ORDER':
      return { ...state, workOrders: state.workOrders.filter(wo => wo.id !== action.payload) };

    // Bundles
    case 'SET_BUNDLES':
      return { ...state, bundles: action.payload };
    case 'ADD_BUNDLE':
      return { ...state, bundles: [...state.bundles, action.payload] };
    case 'UPDATE_BUNDLE':
      return {
        ...state,
        bundles: state.bundles.map(b => b.id === action.payload.id ? action.payload : b),
      };
    case 'DELETE_BUNDLE':
      return { ...state, bundles: state.bundles.filter(b => b.id !== action.payload) };

    // Shipments
    case 'SET_SHIPMENTS':
      return { ...state, shipments: action.payload };
    case 'ADD_SHIPMENT':
      return { ...state, shipments: [...state.shipments, action.payload] };
    case 'UPDATE_SHIPMENT':
      return {
        ...state,
        shipments: state.shipments.map(s => s.id === action.payload.id ? action.payload : s),
      };

    // Boxes
    case 'SET_BOXES':
      return { ...state, boxes: action.payload };
    case 'ADD_BOX':
      return { ...state, boxes: [...state.boxes, action.payload] };
    case 'UPDATE_BOX':
      return {
        ...state,
        boxes: state.boxes.map(b => b.id === action.payload.id ? action.payload : b),
      };
    case 'DELETE_BOX':
      return { ...state, boxes: state.boxes.filter(b => b.id !== action.payload) };

    // Suppliers
    case 'SET_SUPPLIERS':
      return { ...state, suppliers: action.payload };
    case 'ADD_SUPPLIER':
      return { ...state, suppliers: [...state.suppliers, action.payload] };
    case 'UPDATE_SUPPLIER':
      return {
        ...state,
        suppliers: state.suppliers.map(s => s.id === action.payload.id ? action.payload : s),
      };
    case 'DELETE_SUPPLIER':
      return {
        ...state,
        suppliers: state.suppliers.filter(s => s.id !== action.payload),
        productSuppliers: state.productSuppliers.filter(ps => ps.supplierId !== action.payload),
      };
    case 'SET_PRODUCT_SUPPLIERS':
      return { ...state, productSuppliers: action.payload };
    case 'ADD_PRODUCT_SUPPLIER':
      return { ...state, productSuppliers: [...state.productSuppliers, action.payload] };
    case 'UPDATE_PRODUCT_SUPPLIER':
      return {
        ...state,
        productSuppliers: state.productSuppliers.map(ps =>
          ps.productId === action.payload.productId && ps.supplierId === action.payload.supplierId
            ? action.payload
            : ps
        ),
      };
    case 'REMOVE_PRODUCT_SUPPLIER':
      return {
        ...state,
        productSuppliers: state.productSuppliers.filter(
          ps => !(ps.productId === action.payload.productId && ps.supplierId === action.payload.supplierId)
        ),
      };

    // Settings
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };

    // Picking Batches
    case 'SET_PICKING_BATCHES':
      return { ...state, pickingBatches: action.payload };
    case 'ADD_PICKING_BATCH':
      return { ...state, pickingBatches: [...state.pickingBatches, action.payload] };
    case 'UPDATE_PICKING_BATCH':
      return {
        ...state,
        pickingBatches: state.pickingBatches.map(b => b.id === action.payload.id ? action.payload : b),
      };
    case 'DELETE_PICKING_BATCH':
      return {
        ...state,
        pickingBatches: state.pickingBatches.filter(b => b.id !== action.payload),
        // Also remove batch assignment from orders
        orders: state.orders.map(o => o.pickingBatchId === action.payload ? { ...o, pickingBatchId: undefined } : o),
      };
    case 'ASSIGN_ORDER_TO_BATCH': {
      const { orderId, batchId } = action.payload;
      // Update the order's pickingBatchId
      const updatedOrders = state.orders.map(o =>
        o.id === orderId ? { ...o, pickingBatchId: batchId || undefined } : o
      );
      // Update the batch's orderIds
      let updatedBatches = state.pickingBatches;
      if (batchId) {
        updatedBatches = state.pickingBatches.map(b => {
          if (b.id === batchId && !b.orderIds.includes(orderId)) {
            return { ...b, orderIds: [...b.orderIds, orderId] };
          }
          // Remove from other batches
          if (b.id !== batchId && b.orderIds.includes(orderId)) {
            return { ...b, orderIds: b.orderIds.filter(id => id !== orderId) };
          }
          return b;
        });
      } else {
        // Remove from all batches
        updatedBatches = state.pickingBatches.map(b => ({
          ...b,
          orderIds: b.orderIds.filter(id => id !== orderId),
        }));
      }
      return { ...state, orders: updatedOrders, pickingBatches: updatedBatches };
    }

    // Returns
    case 'SET_RETURNS':
      return { ...state, returns: action.payload };
    case 'ADD_RETURN':
      return { ...state, returns: [...state.returns, action.payload] };
    case 'UPDATE_RETURN':
      return {
        ...state,
        returns: state.returns.map(r => r.id === action.payload.id ? action.payload : r),
      };

    // Stock Counts
    case 'SET_STOCK_COUNTS':
      return { ...state, stockCounts: action.payload };
    case 'ADD_STOCK_COUNT':
      return { ...state, stockCounts: [...state.stockCounts, action.payload] };
    case 'UPDATE_STOCK_COUNT':
      return {
        ...state,
        stockCounts: state.stockCounts.map(sc => sc.id === action.payload.id ? action.payload : sc),
      };
    case 'DELETE_STOCK_COUNT':
      return { ...state, stockCounts: state.stockCounts.filter(sc => sc.id !== action.payload) };

    // Transfers
    case 'SET_TRANSFERS':
      return { ...state, transfers: action.payload };
    case 'ADD_TRANSFER':
      return { ...state, transfers: [...state.transfers, action.payload] };
    case 'UPDATE_TRANSFER':
      return {
        ...state,
        transfers: state.transfers.map(t => t.id === action.payload.id ? action.payload : t),
      };

    // Automation Rules
    case 'SET_AUTOMATION_RULES':
      return { ...state, automationRules: action.payload };
    case 'ADD_AUTOMATION_RULE':
      return { ...state, automationRules: [...state.automationRules, action.payload] };
    case 'UPDATE_AUTOMATION_RULE':
      return {
        ...state,
        automationRules: state.automationRules.map(r => r.id === action.payload.id ? action.payload : r),
      };
    case 'DELETE_AUTOMATION_RULE':
      return { ...state, automationRules: state.automationRules.filter(r => r.id !== action.payload) };
    case 'TOGGLE_RULE':
      return {
        ...state,
        automationRules: state.automationRules.map(r =>
          r.id === action.payload ? { ...r, enabled: !r.enabled, updatedAt: new Date() } : r
        ),
      };

    // Serial Numbers
    case 'SET_SERIAL_NUMBERS':
      return { ...state, serialNumbers: action.payload };
    case 'ADD_SERIAL_NUMBERS':
      return { ...state, serialNumbers: [...state.serialNumbers, ...action.payload] };
    case 'UPDATE_SERIAL_NUMBER':
      return {
        ...state,
        serialNumbers: state.serialNumbers.map(sn =>
          sn.id === action.payload.id ? action.payload : sn
        ),
      };
    case 'RESERVE_SERIALS':
      return {
        ...state,
        serialNumbers: state.serialNumbers.map(sn =>
          action.payload.serials.includes(sn.serial)
            ? { ...sn, status: 'reserved' as const, salesOrderId: action.payload.orderId }
            : sn
        ),
      };
    case 'SELL_SERIALS':
      return {
        ...state,
        serialNumbers: state.serialNumbers.map(sn =>
          action.payload.serials.includes(sn.serial)
            ? { ...sn, status: 'sold' as const, salesOrderId: action.payload.orderId, soldAt: new Date() }
            : sn
        ),
      };
    case 'RETURN_SERIAL':
      return {
        ...state,
        serialNumbers: state.serialNumbers.map(sn =>
          sn.serial === action.payload.serial
            ? { ...sn, status: action.payload.condition, salesOrderId: undefined, soldAt: undefined }
            : sn
        ),
      };
    case 'ADD_SERIAL_MOVEMENT':
      return { ...state, serialMovements: [...state.serialMovements, action.payload] };

    // Lots
    case 'SET_LOTS':
      return { ...state, lots: action.payload };
    case 'ADD_LOT':
      return { ...state, lots: [...state.lots, action.payload] };
    case 'ADD_LOTS':
      return { ...state, lots: [...state.lots, ...action.payload] };
    case 'UPDATE_LOT':
      return {
        ...state,
        lots: state.lots.map(lot => lot.id === action.payload.id ? action.payload : lot),
      };
    case 'PICK_FROM_LOT':
      return {
        ...state,
        lots: state.lots.map(lot =>
          lot.id === action.payload.lotId
            ? { ...lot, quantity: lot.quantity - action.payload.quantity, reservedQty: Math.max(0, lot.reservedQty - action.payload.quantity) }
            : lot
        ),
      };
    case 'RESERVE_LOT_QTY':
      return {
        ...state,
        lots: state.lots.map(lot =>
          lot.id === action.payload.lotId
            ? { ...lot, reservedQty: lot.reservedQty + action.payload.quantity }
            : lot
        ),
      };
    case 'RELEASE_LOT_QTY':
      return {
        ...state,
        lots: state.lots.map(lot =>
          lot.id === action.payload.lotId
            ? { ...lot, reservedQty: Math.max(0, lot.reservedQty - action.payload.quantity) }
            : lot
        ),
      };
    case 'RECALL_LOT':
      return {
        ...state,
        lots: state.lots.map(lot =>
          lot.id === action.payload.lotId
            ? { ...lot, status: 'recalled' as const, notes: action.payload.notes }
            : lot
        ),
      };
    case 'QUARANTINE_LOT':
      return {
        ...state,
        lots: state.lots.map(lot =>
          lot.id === action.payload.lotId
            ? { ...lot, status: 'quarantine' as const, notes: action.payload.notes }
            : lot
        ),
      };
    case 'ADD_LOT_MOVEMENT':
      return { ...state, lotMovements: [...state.lotMovements, action.payload] };

    // Picking Totes
    case 'SET_PICKING_TOTES':
      return { ...state, pickingTotes: action.payload };
    case 'ADD_PICKING_TOTE':
      return { ...state, pickingTotes: [...state.pickingTotes, action.payload] };
    case 'UPDATE_PICKING_TOTE':
      return {
        ...state,
        pickingTotes: state.pickingTotes.map(t => t.id === action.payload.id ? action.payload : t),
      };
    case 'DELETE_PICKING_TOTE':
      return { ...state, pickingTotes: state.pickingTotes.filter(t => t.id !== action.payload) };

    // Fulfillment Rules
    case 'SET_FULFILLMENT_RULES':
      return { ...state, fulfillmentRules: action.payload };
    case 'ADD_FULFILLMENT_RULE':
      return { ...state, fulfillmentRules: [...state.fulfillmentRules, action.payload] };
    case 'UPDATE_FULFILLMENT_RULE':
      return {
        ...state,
        fulfillmentRules: state.fulfillmentRules.map(r => r.id === action.payload.id ? action.payload : r),
      };
    case 'DELETE_FULFILLMENT_RULE':
      return { ...state, fulfillmentRules: state.fulfillmentRules.filter(r => r.id !== action.payload) };

    default:
      return state;
  }
}

// Initial State
const initialState: AppState = {
  products: [],
  inventory: [],
  locations: [],
  orders: [],
  purchaseOrders: [],
  workOrders: [],
  bundles: [],
  shipments: [],
  boxes: [],
  pickingBatches: [],
  pickingTotes: [],
  fulfillmentRules: [],
  returns: [],
  stockCounts: [],
  transfers: [],
  automationRules: [],
  serialNumbers: [],
  serialMovements: [],
  lots: [],
  lotMovements: [],
  suppliers: [],
  productSuppliers: [],
  settings: {
    companyName: 'Cronk Nutrients',
    defaultLocation: 'loc-1',
    gripperStickerEnabled: true,
    gripperStickerSku: 'LAB010R',
    smartBoxEnabled: true,
    lowStockThreshold: 50,
    // Picking Settings
    pickingMode: 'multi_tote',
    maxOrdersPerBatch: 20,
    maxItemsPerBatch: 100,
    autoReallocateIncomplete: true,
  },
  isLoading: true,
  isInitialized: false,
};

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { isDemo, loading: authLoading, user } = useAuth();

  // Initialize data - mock data for demo, empty for real users
  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) return;

    const initializeData = async () => {
      try {
        // If not demo mode, reset to empty state for real users
        if (!isDemo) {
          // For real users: empty state, they import their own data
          // This also clears any demo data if switching from demo to real user
          // In the future, this would load from Firestore per user
          dispatch({ type: 'RESET_STATE' });
          return;
        }

        // Demo mode: Import mock data dynamically to avoid circular dependencies
        const {
          products,
          locations,
          inventory,
          orders,
          purchaseOrders,
          workOrders,
          bundles,
          shippingBoxes
        } = await import('@/data/mockData');

        // Transform existing mock data to match new interfaces
        const transformedLocations: Location[] = locations.map(loc => ({
          id: loc.id,
          name: loc.name,
          type: loc.type as 'warehouse' | 'fba' | 'fbm',
          address: undefined,
          isDefault: loc.id === 'loc-1',
        }));

        const transformedProducts: Product[] = products.map(p => ({
          id: p.id,
          name: p.name,
          sku: p.sku,
          barcode: p.barcode,
          category: p.category,
          description: undefined,
          cost: {
            rolling: p.costs.base,
            fixed: p.costs.base,
          },
          prices: {
            msrp: p.prices.msrp,
            shopify: p.prices.shopify,
            amazon: p.prices.amazon,
            wholesale: p.prices.wholesale,
          },
          weight: {
            value: p.weight || 0,
            unit: 'lbs' as const,
          },
          dimensions: p.dimensions || { length: 0, width: 0, height: 0 },
          reorderPoint: p.reorderPoint,
          supplier: p.defaultVendor,
          skus: {
            shopify: `SHOP-${p.sku}`,
            amazon: `AMZ-${p.sku}`,
          },
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt),
        }));

        const transformedInventory: InventoryLevel[] = inventory.map(inv => ({
          productId: inv.productId,
          locationId: inv.locationId,
          quantity: inv.quantity,
          binLocation: inv.binLocation,
          updatedAt: new Date(),
        }));

        // Map mockData status to AppContext status
        const mapOrderStatus = (status: string): Order['status'] => {
          const statusMap: Record<string, Order['status']> = {
            'ready_to_ship': 'ready',
            'in_progress': 'picking',
          };
          return statusMap[status] || status as Order['status'];
        };

        const transformedOrders: Order[] = orders.map(o => ({
          id: o.id,
          orderNumber: o.orderNumber,
          veeqoId: o.externalId,
          channel: o.channel as Order['channel'],
          status: mapOrderStatus(o.status),
          customer: {
            name: o.customer.name,
            email: o.customer.email,
            phone: o.customer.phone,
            address: {
              street: o.shippingAddress.line1,
              city: o.shippingAddress.city,
              state: o.shippingAddress.state,
              zip: o.shippingAddress.postalCode,
              country: o.shippingAddress.country,
            },
          },
          items: o.items.map(item => ({
            productId: item.productId || item.bundleId || '',
            productName: item.name,
            sku: item.sku,
            quantity: item.quantity,
            price: item.price,
            cost: item.cost,
            picked: false,
          })),
          subtotal: o.subtotal,
          shipping: o.shipping,
          tax: o.tax,
          discount: 0,
          total: o.total,
          cogs: o.cogs,
          profit: o.profit,
          margin: o.marginPercent,
          trackingNumber: o.shipments?.[0]?.trackingNumber,
          carrier: o.shipments?.[0]?.carrier,
          createdAt: new Date(o.createdAt),
          updatedAt: new Date(o.updatedAt),
        }));

        const transformedPOs: PurchaseOrder[] = purchaseOrders.map(po => ({
          id: po.id,
          poNumber: po.poNumber,
          supplier: po.supplier.name,
          status: po.status as PurchaseOrder['status'],
          currency: po.currency,
          expectedDate: po.expectedDate ? new Date(po.expectedDate) : undefined,
          items: po.items.map(item => ({
            productId: item.productId,
            productName: item.product?.name || '',
            sku: item.product?.sku || '',
            quantity: item.quantity,
            receivedQty: item.quantityReceived,
            unitCost: item.unitCost,
          })),
          subtotal: po.subtotal,
          shipping: 0,
          total: po.subtotalUSD,
          notes: po.notes,
          createdAt: new Date(po.createdAt),
          updatedAt: new Date(po.createdAt),
        }));

        const transformedWOs: WorkOrder[] = workOrders.map(wo => ({
          id: wo.id,
          woNumber: wo.woNumber,
          status: wo.status as WorkOrder['status'],
          outputProductId: wo.outputProductId,
          outputProductName: wo.outputProduct?.name || '',
          quantityToProduce: wo.outputQuantity,
          quantityProduced: wo.status === 'completed' ? wo.outputQuantity : 0,
          priority: 'normal',
          components: wo.inputs.map(input => ({
            productId: input.productId,
            productName: input.product?.name || '',
            quantityRequired: input.quantityRequired,
            quantityUsed: input.quantityUsed,
          })),
          notes: wo.notes,
          createdAt: new Date(wo.createdAt),
          completedAt: wo.completedAt ? new Date(wo.completedAt) : undefined,
        }));

        const transformedBundles: Bundle[] = bundles.map(b => ({
          id: b.id,
          name: b.name,
          sku: b.sku,
          type: 'virtual' as const,
          description: b.description,
          prices: {
            msrp: b.prices.msrp,
            shopify: b.prices.shopify,
            amazon: b.prices.amazon,
            wholesale: b.prices.wholesale || b.prices.msrp * 0.6,
          },
          compareAtPrices: b.compareAtPrices || {
            msrp: b.prices.msrp * 1.2,
            shopify: (b.prices.shopify || b.prices.msrp) * 1.2,
            amazon: (b.prices.amazon || b.prices.msrp) * 1.2,
          },
          components: (b.components || []).map(c => ({
            productId: c.productId,
            productName: c.product?.name || '',
            quantity: c.quantity,
          })),
          createdAt: new Date(),
          updatedAt: new Date(),
        }));

        const transformedBoxes: ShippingBox[] = shippingBoxes.map(box => ({
          id: box.id,
          name: box.name,
          sku: box.sku,
          innerLength: box.dimensions.length,
          innerWidth: box.dimensions.width,
          innerHeight: box.dimensions.height,
          maxWeight: box.maxWeight,
          cost: box.cost,
          smartBoxEligible: box.isSmartBoxEligible,
        }));

        // Create mock shipments from shipped orders
        const mockShipments: Shipment[] = transformedOrders
          .filter(o => o.status === 'shipped' || o.status === 'delivered')
          .map(o => ({
            id: `ship-${o.id}`,
            orderId: o.id,
            orderNumber: o.orderNumber,
            carrier: (o.carrier || 'usps') as Shipment['carrier'],
            service: o.service || 'Priority Mail',
            trackingNumber: o.trackingNumber || `TRK${Math.random().toString(36).substr(2, 12).toUpperCase()}`,
            customerPaid: o.shipping,
            actualCost: o.shipping * 0.7,
            profit: o.shipping * 0.3,
            weight: 2.5,
            status: o.status === 'delivered' ? 'delivered' : 'in_transit',
            customerName: o.customer.name,
            customerCity: o.customer.address.city,
            customerState: o.customer.address.state,
            shippedAt: new Date(o.updatedAt),
            deliveredAt: o.status === 'delivered' ? new Date() : undefined,
          }));

        // Create mock picking batches
        const mockPickingBatches: PickingBatch[] = [
          {
            id: 'batch-1',
            batchNumber: 'PB-001',
            status: 'open',
            orderIds: [],
            createdAt: new Date(),
          },
          {
            id: 'batch-2',
            batchNumber: 'PB-002',
            status: 'in_progress',
            orderIds: [],
            assignedTo: 'John',
            createdAt: new Date(Date.now() - 86400000), // Yesterday
          },
        ];

        // Create mock returns
        const mockReturns: Return[] = [
          {
            id: 'return-1',
            returnNumber: 'RET-0001',
            orderId: 'order-5',
            orderNumber: 'SH-4518',
            channel: 'shopify',
            status: 'requested',
            customer: { name: 'James Wilson', email: 'jwilson@email.com' },
            items: [{
              productId: 'prod-mic-1l',
              productName: '1L Micro 5-0-1',
              sku: 'CNMIC1L',
              quantity: 1,
              quantityReceived: 0,
              reason: 'damaged_in_transit',
              refundAmount: 12.99
            }],
            returnShipping: {},
            refund: { subtotal: 12.99, shipping: 0, restockingFee: 0, total: 12.99 },
            createdAt: new Date(Date.now() - 86400000),
            updatedAt: new Date(Date.now() - 86400000)
          },
          {
            id: 'return-2',
            returnNumber: 'RET-0002',
            orderId: 'order-6',
            orderNumber: 'AZ-8833',
            channel: 'amazon_fbm',
            status: 'in_transit',
            customer: { name: 'Lisa Chen', email: 'lchen@email.com' },
            items: [{
              productId: 'prod-bb-500',
              productName: '500mL Bud Booster 0-1-3',
              sku: 'CNBB500ML',
              quantity: 2,
              quantityReceived: 0,
              reason: 'changed_mind',
              refundAmount: 45.76
            }],
            returnShipping: { trackingNumber: 'RET123456789', carrier: 'usps' },
            refund: { subtotal: 45.76, shipping: 0, restockingFee: 4.58, total: 41.18 },
            createdAt: new Date(Date.now() - 172800000),
            updatedAt: new Date(Date.now() - 86400000)
          },
          {
            id: 'return-3',
            returnNumber: 'RET-0003',
            orderId: 'order-7',
            orderNumber: 'SH-4517',
            channel: 'shopify',
            status: 'received',
            customer: { name: 'Tom Brady', email: 'tbrady@email.com' },
            items: [{
              productId: 'prod-gro-1l',
              productName: '1L Grow 2-1-6',
              sku: 'CNGRO1L',
              quantity: 1,
              quantityReceived: 1,
              reason: 'defective',
              refundAmount: 12.99
            }],
            returnShipping: { trackingNumber: 'RET987654321', carrier: 'ups' },
            refund: { subtotal: 12.99, shipping: 6.99, restockingFee: 0, total: 19.98 },
            createdAt: new Date(Date.now() - 259200000),
            updatedAt: new Date()
          }
        ];

        // Create mock stock counts
        const mockStockCounts: StockCount[] = [
          {
            id: 'sc-1',
            countNumber: 'SC-0001',
            name: 'Weekly Cycle Count - Zone A',
            type: 'cycle',
            status: 'in_progress',
            location: 'loc-warehouse',
            locationName: 'Texas Warehouse',
            assignedTo: 'John',
            items: [
              {
                productId: 'prod-mic-500',
                productName: '500mL Micro 5-0-1',
                sku: 'CNMIC500ML',
                binLocation: 'A1-01',
                systemQty: 150,
                countedQty: 148,
                variance: -2,
                varianceValue: -10.50,
                status: 'counted',
                countedAt: new Date(Date.now() - 3600000)
              },
              {
                productId: 'prod-mic-1l',
                productName: '1L Micro 5-0-1',
                sku: 'CNMIC1L',
                binLocation: 'A1-02',
                systemQty: 75,
                countedQty: null,
                variance: 0,
                varianceValue: 0,
                status: 'pending'
              }
            ],
            summary: {
              totalItems: 15,
              countedItems: 8,
              matchedItems: 6,
              discrepancyItems: 2,
              totalVariance: -24.50
            },
            startedAt: new Date(Date.now() - 86400000),
            createdAt: new Date(Date.now() - 86400000),
            updatedAt: new Date()
          },
          {
            id: 'sc-2',
            countNumber: 'SC-0002',
            name: 'Monthly Full Count - December',
            type: 'full',
            status: 'completed',
            location: 'loc-warehouse',
            locationName: 'Texas Warehouse',
            items: [],
            summary: {
              totalItems: 45,
              countedItems: 45,
              matchedItems: 42,
              discrepancyItems: 3,
              totalVariance: -156.75
            },
            startedAt: new Date(Date.now() - 604800000),
            completedAt: new Date(Date.now() - 518400000),
            createdAt: new Date(Date.now() - 604800000),
            updatedAt: new Date(Date.now() - 518400000)
          }
        ];

        // Create mock transfers
        const mockTransfers: StockTransfer[] = [
          {
            id: 'trf-1',
            transferNumber: 'TRF-0001',
            status: 'in_transit',
            fromLocation: 'loc-warehouse',
            fromLocationName: 'Texas Warehouse',
            toLocation: 'loc-fba',
            toLocationName: 'FBA Inbound',
            items: [
              {
                productId: 'prod-mic-500',
                productName: '500mL Micro 5-0-1',
                sku: 'CNMIC500ML',
                requestedQty: 50,
                shippedQty: 50,
                receivedQty: 0,
                status: 'shipped'
              },
              {
                productId: 'prod-bb-500',
                productName: '500mL Bud Booster 0-1-3',
                sku: 'CNBB500ML',
                requestedQty: 30,
                shippedQty: 30,
                receivedQty: 0,
                status: 'shipped'
              }
            ],
            notes: 'FBA replenishment shipment',
            shippedAt: new Date(Date.now() - 172800000),
            createdAt: new Date(Date.now() - 259200000),
            updatedAt: new Date(Date.now() - 172800000)
          },
          {
            id: 'trf-2',
            transferNumber: 'TRF-0002',
            status: 'received',
            fromLocation: 'loc-warehouse',
            fromLocationName: 'Texas Warehouse',
            toLocation: 'loc-fba',
            toLocationName: 'FBA Inbound',
            items: [
              {
                productId: 'prod-gro-1l',
                productName: '1L Grow 2-1-6',
                sku: 'CNGRO1L',
                requestedQty: 100,
                shippedQty: 100,
                receivedQty: 98,
                status: 'short'
              }
            ],
            notes: 'Weekly FBA restock',
            shippedAt: new Date(Date.now() - 604800000),
            receivedAt: new Date(Date.now() - 518400000),
            createdAt: new Date(Date.now() - 691200000),
            updatedAt: new Date(Date.now() - 518400000)
          }
        ];

        // Create mock automation rules
        const mockAutomationRules: AutomationRule[] = [
          {
            id: 'rule-1',
            name: 'Tag Amazon Prime orders',
            description: 'Automatically add PRIME tag to Amazon Prime orders for priority handling',
            enabled: true,
            trigger: { type: 'order_created' },
            conditions: [
              { id: 'cond-1', field: 'channel', operator: 'equals', value: 'amazon_fbm' }
            ],
            actions: [
              { id: 'act-1', type: 'set_order_tag', config: { tag: 'PRIME' } },
              { id: 'act-2', type: 'set_priority', config: { priority: 'high' } }
            ],
            priority: 1,
            createdAt: new Date(Date.now() - 604800000),
            updatedAt: new Date(Date.now() - 604800000)
          },
          {
            id: 'rule-2',
            name: 'Auto-assign USPS for small orders',
            description: 'Orders under $50 and less than 1lb ship USPS First Class',
            enabled: true,
            trigger: { type: 'order_created' },
            conditions: [
              { id: 'cond-2', field: 'total', operator: 'less_than', value: 50 }
            ],
            actions: [
              { id: 'act-3', type: 'assign_carrier', config: { carrier: 'usps' } },
              { id: 'act-4', type: 'assign_service', config: { service: 'first_class' } }
            ],
            priority: 2,
            createdAt: new Date(Date.now() - 259200000),
            updatedAt: new Date(Date.now() - 259200000)
          },
          {
            id: 'rule-3',
            name: 'Low stock notification',
            description: 'Send email when stock falls below 50 units',
            enabled: false,
            trigger: { type: 'low_stock', threshold: 50 },
            conditions: [],
            actions: [
              { id: 'act-5', type: 'send_notification', config: { message: 'Stock is running low!' } },
              { id: 'act-6', type: 'create_po_draft', config: { quantity: 100 } }
            ],
            priority: 3,
            createdAt: new Date(Date.now() - 172800000),
            updatedAt: new Date(Date.now() - 172800000)
          }
        ];

        // Create mock lots
        const mockLots: InventoryLot[] = [
          {
            id: 'lot-1',
            lotNumber: 'LOT-20241215-001',
            productId: 'prod-mic-500',
            productName: '500mL Micro 5-0-1',
            sku: 'CNMIC500ML',
            quantity: 100,
            reservedQty: 5,
            expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
            manufacturedDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
            receivedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
            status: 'active',
            locationId: 'loc-warehouse',
            locationName: 'Texas Warehouse',
            supplierLotNumber: 'HG-2024-1234',
          },
          {
            id: 'lot-2',
            lotNumber: 'LOT-20241201-001',
            productId: 'prod-mic-500',
            productName: '500mL Micro 5-0-1',
            sku: 'CNMIC500ML',
            quantity: 50,
            reservedQty: 0,
            expirationDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now (expiring soon)
            manufacturedDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
            receivedDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
            status: 'active',
            locationId: 'loc-warehouse',
            locationName: 'Texas Warehouse',
            supplierLotNumber: 'HG-2024-1198',
          },
          {
            id: 'lot-3',
            lotNumber: 'LOT-20241220-001',
            productId: 'prod-gro-1l',
            productName: '1L Grow 2-1-6',
            sku: 'CNGRO1L',
            quantity: 75,
            reservedQty: 10,
            expirationDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
            manufacturedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            receivedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
            status: 'active',
            locationId: 'loc-warehouse',
            locationName: 'Texas Warehouse',
          },
          {
            id: 'lot-4',
            lotNumber: 'LOT-20241101-001',
            productId: 'prod-bb-500',
            productName: '500mL Bud Booster 0-1-3',
            sku: 'CNBB500ML',
            quantity: 25,
            reservedQty: 0,
            expirationDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago (expired)
            manufacturedDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
            receivedDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
            status: 'expired',
            locationId: 'loc-warehouse',
            locationName: 'Texas Warehouse',
            notes: 'Expired - pending disposal',
          },
          {
            id: 'lot-5',
            lotNumber: 'LOT-20241210-001',
            productId: 'prod-mic-1l',
            productName: '1L Micro 5-0-1',
            sku: 'CNMIC1L',
            quantity: 40,
            reservedQty: 0,
            receivedDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
            status: 'quarantine',
            locationId: 'loc-warehouse',
            locationName: 'Texas Warehouse',
            notes: 'Quality check pending - suspected contamination',
          },
        ];

        dispatch({ type: 'SET_LOCATIONS', payload: transformedLocations });
        dispatch({ type: 'SET_PRODUCTS', payload: transformedProducts });
        dispatch({ type: 'SET_INVENTORY', payload: transformedInventory });
        dispatch({ type: 'SET_ORDERS', payload: transformedOrders });
        dispatch({ type: 'SET_PURCHASE_ORDERS', payload: transformedPOs });
        dispatch({ type: 'SET_WORK_ORDERS', payload: transformedWOs });
        dispatch({ type: 'SET_BUNDLES', payload: transformedBundles });
        dispatch({ type: 'SET_BOXES', payload: transformedBoxes });
        dispatch({ type: 'SET_SHIPMENTS', payload: mockShipments });
        dispatch({ type: 'SET_PICKING_BATCHES', payload: mockPickingBatches });
        dispatch({ type: 'SET_RETURNS', payload: mockReturns });
        dispatch({ type: 'SET_STOCK_COUNTS', payload: mockStockCounts });
        dispatch({ type: 'SET_TRANSFERS', payload: mockTransfers });
        dispatch({ type: 'SET_AUTOMATION_RULES', payload: mockAutomationRules });
        dispatch({ type: 'SET_LOTS', payload: mockLots });

        // Create mock suppliers
        const mockSuppliers: Supplier[] = [
          {
            id: 'sup-hgc',
            name: 'HIGROCORP INC.',
            code: 'HGC',
            contactName: 'John Martinez',
            email: 'john@higrocorp.com',
            phone: '(555) 123-4567',
            website: 'https://higrocorp.com',
            address: {
              street: '123 Industrial Blvd',
              city: 'Houston',
              state: 'TX',
              zip: '77001',
              country: 'US',
            },
            currency: 'USD',
            paymentTerms: 'Net 30',
            leadTimeDays: 14,
            minimumOrderValue: 500,
            notes: 'Primary nutrient supplier',
            isActive: true,
            createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
          {
            id: 'sup-btl',
            name: 'Bottle Supply Co',
            code: 'BTL',
            contactName: 'Sarah Chen',
            email: 'sarah@bottlesupply.com',
            phone: '(555) 987-6543',
            currency: 'USD',
            paymentTerms: 'Net 15',
            leadTimeDays: 7,
            minimumOrderValue: 250,
            isActive: true,
            createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
          },
          {
            id: 'sup-lbl',
            name: 'Label Pros International',
            code: 'LBL',
            contactName: 'Mike Wilson',
            email: 'mike@labelpros.com',
            phone: '(555) 456-7890',
            currency: 'USD',
            paymentTerms: 'COD',
            leadTimeDays: 10,
            isActive: true,
            createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        ];

        // Create mock product-supplier relationships
        const mockProductSuppliers: ProductSupplier[] = [
          {
            productId: 'prod-mic-500',
            supplierId: 'sup-hgc',
            supplierSku: 'HGC-MIC-500',
            unitCost: 3.50,
            currency: 'USD',
            minimumOrderQty: 100,
            leadTimeDays: 14,
            isPrimary: true,
            lastOrderedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
          {
            productId: 'prod-mic-1l',
            supplierId: 'sup-hgc',
            supplierSku: 'HGC-MIC-1L',
            unitCost: 5.75,
            currency: 'USD',
            minimumOrderQty: 50,
            leadTimeDays: 14,
            isPrimary: true,
          },
          {
            productId: 'prod-gro-1l',
            supplierId: 'sup-hgc',
            supplierSku: 'HGC-GRO-1L',
            unitCost: 5.50,
            currency: 'USD',
            minimumOrderQty: 50,
            isPrimary: true,
          },
          {
            productId: 'prod-bb-500',
            supplierId: 'sup-hgc',
            supplierSku: 'HGC-BB-500',
            unitCost: 4.25,
            currency: 'USD',
            minimumOrderQty: 100,
            isPrimary: true,
          },
        ];

        dispatch({ type: 'SET_SUPPLIERS', payload: mockSuppliers });
        dispatch({ type: 'SET_PRODUCT_SUPPLIERS', payload: mockProductSuppliers });
        dispatch({ type: 'SET_LOADING', payload: false });
        dispatch({ type: 'SET_INITIALIZED', payload: true });
      } catch (error) {
        console.error('Failed to initialize app data:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initializeData();
  }, [isDemo, authLoading]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Selector hooks for common data access patterns
export function useProducts() {
  const { state } = useApp();
  return state.products;
}

export function useOrders() {
  const { state } = useApp();
  return state.orders;
}

export function useInventory() {
  const { state } = useApp();
  return state.inventory;
}

export function useLocations() {
  const { state } = useApp();
  return state.locations;
}

export function useSettings() {
  const { state } = useApp();
  return state.settings;
}

// Helper to get product stock across all locations
export function useProductStock(productId: string) {
  const { state } = useApp();
  return state.inventory
    .filter(inv => inv.productId === productId)
    .reduce((total, inv) => total + inv.quantity, 0);
}

// Helper to get stock at a specific location
export function useLocationStock(productId: string, locationId: string) {
  const { state } = useApp();
  const inv = state.inventory.find(
    i => i.productId === productId && i.locationId === locationId
  );
  return inv?.quantity || 0;
}
