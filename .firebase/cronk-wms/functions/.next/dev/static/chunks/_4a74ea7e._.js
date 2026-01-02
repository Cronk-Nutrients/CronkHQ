(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/context/AppContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProvider",
    ()=>AppProvider,
    "conditionFields",
    ()=>conditionFields,
    "useApp",
    ()=>useApp,
    "useInventory",
    ()=>useInventory,
    "useLocationStock",
    ()=>useLocationStock,
    "useLocations",
    ()=>useLocations,
    "useOrders",
    ()=>useOrders,
    "useProductStock",
    ()=>useProductStock,
    "useProducts",
    ()=>useProducts,
    "useSettings",
    ()=>useSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature();
'use client';
;
const conditionFields = {
    order: [
        {
            value: 'channel',
            label: 'Sales Channel'
        },
        {
            value: 'total',
            label: 'Order Total'
        },
        {
            value: 'item_count',
            label: 'Item Count'
        },
        {
            value: 'shipping_country',
            label: 'Ship To Country'
        },
        {
            value: 'shipping_state',
            label: 'Ship To State'
        },
        {
            value: 'customer_email',
            label: 'Customer Email'
        },
        {
            value: 'contains_sku',
            label: 'Contains SKU'
        },
        {
            value: 'weight',
            label: 'Total Weight'
        },
        {
            value: 'is_prime',
            label: 'Is Amazon Prime'
        },
        {
            value: 'requires_signature',
            label: 'Requires Signature'
        }
    ],
    inventory: [
        {
            value: 'sku',
            label: 'Product SKU'
        },
        {
            value: 'category',
            label: 'Category'
        },
        {
            value: 'quantity',
            label: 'Quantity'
        },
        {
            value: 'location',
            label: 'Location'
        },
        {
            value: 'cost',
            label: 'Product Cost'
        }
    ]
};
// Reducer
function appReducer(state, action) {
    switch(action.type){
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload
            };
        case 'SET_INITIALIZED':
            return {
                ...state,
                isInitialized: action.payload
            };
        // Products
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload
            };
        case 'ADD_PRODUCT':
            return {
                ...state,
                products: [
                    ...state.products,
                    action.payload
                ]
            };
        case 'UPDATE_PRODUCT':
            return {
                ...state,
                products: state.products.map((p)=>p.id === action.payload.id ? action.payload : p)
            };
        case 'DELETE_PRODUCT':
            return {
                ...state,
                products: state.products.filter((p)=>p.id !== action.payload)
            };
        // Inventory
        case 'SET_INVENTORY':
            return {
                ...state,
                inventory: action.payload
            };
        case 'UPDATE_INVENTORY':
            return {
                ...state,
                inventory: state.inventory.map((inv)=>inv.productId === action.payload.productId && inv.locationId === action.payload.locationId ? action.payload : inv)
            };
        case 'ADJUST_STOCK':
            return {
                ...state,
                inventory: state.inventory.map((inv)=>inv.productId === action.payload.productId && inv.locationId === action.payload.locationId ? {
                        ...inv,
                        quantity: inv.quantity + action.payload.adjustment,
                        updatedAt: new Date()
                    } : inv)
            };
        // Locations
        case 'SET_LOCATIONS':
            return {
                ...state,
                locations: action.payload
            };
        case 'ADD_LOCATION':
            return {
                ...state,
                locations: [
                    ...state.locations,
                    action.payload
                ]
            };
        case 'UPDATE_LOCATION':
            return {
                ...state,
                locations: state.locations.map((l)=>l.id === action.payload.id ? action.payload : l)
            };
        case 'DELETE_LOCATION':
            return {
                ...state,
                locations: state.locations.filter((l)=>l.id !== action.payload)
            };
        // Orders
        case 'SET_ORDERS':
            return {
                ...state,
                orders: action.payload
            };
        case 'ADD_ORDER':
            return {
                ...state,
                orders: [
                    ...state.orders,
                    action.payload
                ]
            };
        case 'UPDATE_ORDER':
            return {
                ...state,
                orders: state.orders.map((o)=>o.id === action.payload.id ? action.payload : o)
            };
        case 'UPDATE_ORDER_STATUS':
            return {
                ...state,
                orders: state.orders.map((o)=>o.id === action.payload.orderId ? {
                        ...o,
                        status: action.payload.status,
                        updatedAt: new Date()
                    } : o)
            };
        case 'DELETE_ORDER':
            return {
                ...state,
                orders: state.orders.filter((o)=>o.id !== action.payload)
            };
        // Purchase Orders
        case 'SET_PURCHASE_ORDERS':
            return {
                ...state,
                purchaseOrders: action.payload
            };
        case 'ADD_PURCHASE_ORDER':
            return {
                ...state,
                purchaseOrders: [
                    ...state.purchaseOrders,
                    action.payload
                ]
            };
        case 'UPDATE_PURCHASE_ORDER':
            return {
                ...state,
                purchaseOrders: state.purchaseOrders.map((po)=>po.id === action.payload.id ? action.payload : po)
            };
        case 'DELETE_PURCHASE_ORDER':
            return {
                ...state,
                purchaseOrders: state.purchaseOrders.filter((po)=>po.id !== action.payload)
            };
        // Work Orders
        case 'SET_WORK_ORDERS':
            return {
                ...state,
                workOrders: action.payload
            };
        case 'ADD_WORK_ORDER':
            return {
                ...state,
                workOrders: [
                    ...state.workOrders,
                    action.payload
                ]
            };
        case 'UPDATE_WORK_ORDER':
            return {
                ...state,
                workOrders: state.workOrders.map((wo)=>wo.id === action.payload.id ? action.payload : wo)
            };
        case 'DELETE_WORK_ORDER':
            return {
                ...state,
                workOrders: state.workOrders.filter((wo)=>wo.id !== action.payload)
            };
        // Bundles
        case 'SET_BUNDLES':
            return {
                ...state,
                bundles: action.payload
            };
        case 'ADD_BUNDLE':
            return {
                ...state,
                bundles: [
                    ...state.bundles,
                    action.payload
                ]
            };
        case 'UPDATE_BUNDLE':
            return {
                ...state,
                bundles: state.bundles.map((b)=>b.id === action.payload.id ? action.payload : b)
            };
        case 'DELETE_BUNDLE':
            return {
                ...state,
                bundles: state.bundles.filter((b)=>b.id !== action.payload)
            };
        // Shipments
        case 'SET_SHIPMENTS':
            return {
                ...state,
                shipments: action.payload
            };
        case 'ADD_SHIPMENT':
            return {
                ...state,
                shipments: [
                    ...state.shipments,
                    action.payload
                ]
            };
        case 'UPDATE_SHIPMENT':
            return {
                ...state,
                shipments: state.shipments.map((s)=>s.id === action.payload.id ? action.payload : s)
            };
        // Boxes
        case 'SET_BOXES':
            return {
                ...state,
                boxes: action.payload
            };
        case 'ADD_BOX':
            return {
                ...state,
                boxes: [
                    ...state.boxes,
                    action.payload
                ]
            };
        case 'UPDATE_BOX':
            return {
                ...state,
                boxes: state.boxes.map((b)=>b.id === action.payload.id ? action.payload : b)
            };
        case 'DELETE_BOX':
            return {
                ...state,
                boxes: state.boxes.filter((b)=>b.id !== action.payload)
            };
        // Suppliers
        case 'SET_SUPPLIERS':
            return {
                ...state,
                suppliers: action.payload
            };
        case 'ADD_SUPPLIER':
            return {
                ...state,
                suppliers: [
                    ...state.suppliers,
                    action.payload
                ]
            };
        case 'UPDATE_SUPPLIER':
            return {
                ...state,
                suppliers: state.suppliers.map((s)=>s.id === action.payload.id ? action.payload : s)
            };
        case 'DELETE_SUPPLIER':
            return {
                ...state,
                suppliers: state.suppliers.filter((s)=>s.id !== action.payload),
                productSuppliers: state.productSuppliers.filter((ps)=>ps.supplierId !== action.payload)
            };
        case 'SET_PRODUCT_SUPPLIERS':
            return {
                ...state,
                productSuppliers: action.payload
            };
        case 'ADD_PRODUCT_SUPPLIER':
            return {
                ...state,
                productSuppliers: [
                    ...state.productSuppliers,
                    action.payload
                ]
            };
        case 'UPDATE_PRODUCT_SUPPLIER':
            return {
                ...state,
                productSuppliers: state.productSuppliers.map((ps)=>ps.productId === action.payload.productId && ps.supplierId === action.payload.supplierId ? action.payload : ps)
            };
        case 'REMOVE_PRODUCT_SUPPLIER':
            return {
                ...state,
                productSuppliers: state.productSuppliers.filter((ps)=>!(ps.productId === action.payload.productId && ps.supplierId === action.payload.supplierId))
            };
        // Settings
        case 'UPDATE_SETTINGS':
            return {
                ...state,
                settings: {
                    ...state.settings,
                    ...action.payload
                }
            };
        // Picking Batches
        case 'SET_PICKING_BATCHES':
            return {
                ...state,
                pickingBatches: action.payload
            };
        case 'ADD_PICKING_BATCH':
            return {
                ...state,
                pickingBatches: [
                    ...state.pickingBatches,
                    action.payload
                ]
            };
        case 'UPDATE_PICKING_BATCH':
            return {
                ...state,
                pickingBatches: state.pickingBatches.map((b)=>b.id === action.payload.id ? action.payload : b)
            };
        case 'DELETE_PICKING_BATCH':
            return {
                ...state,
                pickingBatches: state.pickingBatches.filter((b)=>b.id !== action.payload),
                // Also remove batch assignment from orders
                orders: state.orders.map((o)=>o.pickingBatchId === action.payload ? {
                        ...o,
                        pickingBatchId: undefined
                    } : o)
            };
        case 'ASSIGN_ORDER_TO_BATCH':
            {
                const { orderId, batchId } = action.payload;
                // Update the order's pickingBatchId
                const updatedOrders = state.orders.map((o)=>o.id === orderId ? {
                        ...o,
                        pickingBatchId: batchId || undefined
                    } : o);
                // Update the batch's orderIds
                let updatedBatches = state.pickingBatches;
                if (batchId) {
                    updatedBatches = state.pickingBatches.map((b)=>{
                        if (b.id === batchId && !b.orderIds.includes(orderId)) {
                            return {
                                ...b,
                                orderIds: [
                                    ...b.orderIds,
                                    orderId
                                ]
                            };
                        }
                        // Remove from other batches
                        if (b.id !== batchId && b.orderIds.includes(orderId)) {
                            return {
                                ...b,
                                orderIds: b.orderIds.filter((id)=>id !== orderId)
                            };
                        }
                        return b;
                    });
                } else {
                    // Remove from all batches
                    updatedBatches = state.pickingBatches.map((b)=>({
                            ...b,
                            orderIds: b.orderIds.filter((id)=>id !== orderId)
                        }));
                }
                return {
                    ...state,
                    orders: updatedOrders,
                    pickingBatches: updatedBatches
                };
            }
        // Returns
        case 'SET_RETURNS':
            return {
                ...state,
                returns: action.payload
            };
        case 'ADD_RETURN':
            return {
                ...state,
                returns: [
                    ...state.returns,
                    action.payload
                ]
            };
        case 'UPDATE_RETURN':
            return {
                ...state,
                returns: state.returns.map((r)=>r.id === action.payload.id ? action.payload : r)
            };
        // Stock Counts
        case 'SET_STOCK_COUNTS':
            return {
                ...state,
                stockCounts: action.payload
            };
        case 'ADD_STOCK_COUNT':
            return {
                ...state,
                stockCounts: [
                    ...state.stockCounts,
                    action.payload
                ]
            };
        case 'UPDATE_STOCK_COUNT':
            return {
                ...state,
                stockCounts: state.stockCounts.map((sc)=>sc.id === action.payload.id ? action.payload : sc)
            };
        case 'DELETE_STOCK_COUNT':
            return {
                ...state,
                stockCounts: state.stockCounts.filter((sc)=>sc.id !== action.payload)
            };
        // Transfers
        case 'SET_TRANSFERS':
            return {
                ...state,
                transfers: action.payload
            };
        case 'ADD_TRANSFER':
            return {
                ...state,
                transfers: [
                    ...state.transfers,
                    action.payload
                ]
            };
        case 'UPDATE_TRANSFER':
            return {
                ...state,
                transfers: state.transfers.map((t)=>t.id === action.payload.id ? action.payload : t)
            };
        // Automation Rules
        case 'SET_AUTOMATION_RULES':
            return {
                ...state,
                automationRules: action.payload
            };
        case 'ADD_AUTOMATION_RULE':
            return {
                ...state,
                automationRules: [
                    ...state.automationRules,
                    action.payload
                ]
            };
        case 'UPDATE_AUTOMATION_RULE':
            return {
                ...state,
                automationRules: state.automationRules.map((r)=>r.id === action.payload.id ? action.payload : r)
            };
        case 'DELETE_AUTOMATION_RULE':
            return {
                ...state,
                automationRules: state.automationRules.filter((r)=>r.id !== action.payload)
            };
        case 'TOGGLE_RULE':
            return {
                ...state,
                automationRules: state.automationRules.map((r)=>r.id === action.payload ? {
                        ...r,
                        enabled: !r.enabled,
                        updatedAt: new Date()
                    } : r)
            };
        // Serial Numbers
        case 'SET_SERIAL_NUMBERS':
            return {
                ...state,
                serialNumbers: action.payload
            };
        case 'ADD_SERIAL_NUMBERS':
            return {
                ...state,
                serialNumbers: [
                    ...state.serialNumbers,
                    ...action.payload
                ]
            };
        case 'UPDATE_SERIAL_NUMBER':
            return {
                ...state,
                serialNumbers: state.serialNumbers.map((sn)=>sn.id === action.payload.id ? action.payload : sn)
            };
        case 'RESERVE_SERIALS':
            return {
                ...state,
                serialNumbers: state.serialNumbers.map((sn)=>action.payload.serials.includes(sn.serial) ? {
                        ...sn,
                        status: 'reserved',
                        salesOrderId: action.payload.orderId
                    } : sn)
            };
        case 'SELL_SERIALS':
            return {
                ...state,
                serialNumbers: state.serialNumbers.map((sn)=>action.payload.serials.includes(sn.serial) ? {
                        ...sn,
                        status: 'sold',
                        salesOrderId: action.payload.orderId,
                        soldAt: new Date()
                    } : sn)
            };
        case 'RETURN_SERIAL':
            return {
                ...state,
                serialNumbers: state.serialNumbers.map((sn)=>sn.serial === action.payload.serial ? {
                        ...sn,
                        status: action.payload.condition,
                        salesOrderId: undefined,
                        soldAt: undefined
                    } : sn)
            };
        case 'ADD_SERIAL_MOVEMENT':
            return {
                ...state,
                serialMovements: [
                    ...state.serialMovements,
                    action.payload
                ]
            };
        // Lots
        case 'SET_LOTS':
            return {
                ...state,
                lots: action.payload
            };
        case 'ADD_LOT':
            return {
                ...state,
                lots: [
                    ...state.lots,
                    action.payload
                ]
            };
        case 'ADD_LOTS':
            return {
                ...state,
                lots: [
                    ...state.lots,
                    ...action.payload
                ]
            };
        case 'UPDATE_LOT':
            return {
                ...state,
                lots: state.lots.map((lot)=>lot.id === action.payload.id ? action.payload : lot)
            };
        case 'PICK_FROM_LOT':
            return {
                ...state,
                lots: state.lots.map((lot)=>lot.id === action.payload.lotId ? {
                        ...lot,
                        quantity: lot.quantity - action.payload.quantity,
                        reservedQty: Math.max(0, lot.reservedQty - action.payload.quantity)
                    } : lot)
            };
        case 'RESERVE_LOT_QTY':
            return {
                ...state,
                lots: state.lots.map((lot)=>lot.id === action.payload.lotId ? {
                        ...lot,
                        reservedQty: lot.reservedQty + action.payload.quantity
                    } : lot)
            };
        case 'RELEASE_LOT_QTY':
            return {
                ...state,
                lots: state.lots.map((lot)=>lot.id === action.payload.lotId ? {
                        ...lot,
                        reservedQty: Math.max(0, lot.reservedQty - action.payload.quantity)
                    } : lot)
            };
        case 'RECALL_LOT':
            return {
                ...state,
                lots: state.lots.map((lot)=>lot.id === action.payload.lotId ? {
                        ...lot,
                        status: 'recalled',
                        notes: action.payload.notes
                    } : lot)
            };
        case 'QUARANTINE_LOT':
            return {
                ...state,
                lots: state.lots.map((lot)=>lot.id === action.payload.lotId ? {
                        ...lot,
                        status: 'quarantine',
                        notes: action.payload.notes
                    } : lot)
            };
        case 'ADD_LOT_MOVEMENT':
            return {
                ...state,
                lotMovements: [
                    ...state.lotMovements,
                    action.payload
                ]
            };
        // Picking Totes
        case 'SET_PICKING_TOTES':
            return {
                ...state,
                pickingTotes: action.payload
            };
        case 'ADD_PICKING_TOTE':
            return {
                ...state,
                pickingTotes: [
                    ...state.pickingTotes,
                    action.payload
                ]
            };
        case 'UPDATE_PICKING_TOTE':
            return {
                ...state,
                pickingTotes: state.pickingTotes.map((t)=>t.id === action.payload.id ? action.payload : t)
            };
        case 'DELETE_PICKING_TOTE':
            return {
                ...state,
                pickingTotes: state.pickingTotes.filter((t)=>t.id !== action.payload)
            };
        // Fulfillment Rules
        case 'SET_FULFILLMENT_RULES':
            return {
                ...state,
                fulfillmentRules: action.payload
            };
        case 'ADD_FULFILLMENT_RULE':
            return {
                ...state,
                fulfillmentRules: [
                    ...state.fulfillmentRules,
                    action.payload
                ]
            };
        case 'UPDATE_FULFILLMENT_RULE':
            return {
                ...state,
                fulfillmentRules: state.fulfillmentRules.map((r)=>r.id === action.payload.id ? action.payload : r)
            };
        case 'DELETE_FULFILLMENT_RULE':
            return {
                ...state,
                fulfillmentRules: state.fulfillmentRules.filter((r)=>r.id !== action.payload)
            };
        default:
            return state;
    }
}
// Initial State
const initialState = {
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
        autoReallocateIncomplete: true
    },
    isLoading: true,
    isInitialized: false
};
// Context
const AppContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AppProvider({ children }) {
    _s();
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducer"])(appReducer, initialState);
    // Initialize with mock data on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppProvider.useEffect": ()=>{
            const initializeData = {
                "AppProvider.useEffect.initializeData": async ()=>{
                    try {
                        // Import mock data dynamically to avoid circular dependencies
                        const { products, locations, inventory, orders, purchaseOrders, workOrders, bundles, shippingBoxes } = await __turbopack_context__.A("[project]/data/mockData.ts [app-client] (ecmascript, async loader)");
                        // Transform existing mock data to match new interfaces
                        const transformedLocations = locations.map({
                            "AppProvider.useEffect.initializeData.transformedLocations": (loc)=>({
                                    id: loc.id,
                                    name: loc.name,
                                    type: loc.type,
                                    address: undefined,
                                    isDefault: loc.id === 'loc-1'
                                })
                        }["AppProvider.useEffect.initializeData.transformedLocations"]);
                        const transformedProducts = products.map({
                            "AppProvider.useEffect.initializeData.transformedProducts": (p)=>({
                                    id: p.id,
                                    name: p.name,
                                    sku: p.sku,
                                    barcode: p.barcode,
                                    category: p.category,
                                    description: undefined,
                                    cost: {
                                        rolling: p.costs.base,
                                        fixed: p.costs.base
                                    },
                                    prices: {
                                        msrp: p.prices.msrp,
                                        shopify: p.prices.shopify,
                                        amazon: p.prices.amazon,
                                        wholesale: p.prices.wholesale
                                    },
                                    weight: {
                                        value: p.weight || 0,
                                        unit: 'lbs'
                                    },
                                    dimensions: p.dimensions || {
                                        length: 0,
                                        width: 0,
                                        height: 0
                                    },
                                    reorderPoint: p.reorderPoint,
                                    supplier: p.defaultVendor,
                                    skus: {
                                        shopify: `SHOP-${p.sku}`,
                                        amazon: `AMZ-${p.sku}`
                                    },
                                    createdAt: new Date(p.createdAt),
                                    updatedAt: new Date(p.updatedAt)
                                })
                        }["AppProvider.useEffect.initializeData.transformedProducts"]);
                        const transformedInventory = inventory.map({
                            "AppProvider.useEffect.initializeData.transformedInventory": (inv)=>({
                                    productId: inv.productId,
                                    locationId: inv.locationId,
                                    quantity: inv.quantity,
                                    binLocation: inv.binLocation,
                                    updatedAt: new Date()
                                })
                        }["AppProvider.useEffect.initializeData.transformedInventory"]);
                        // Map mockData status to AppContext status
                        const mapOrderStatus = {
                            "AppProvider.useEffect.initializeData.mapOrderStatus": (status)=>{
                                const statusMap = {
                                    'ready_to_ship': 'ready',
                                    'in_progress': 'picking'
                                };
                                return statusMap[status] || status;
                            }
                        }["AppProvider.useEffect.initializeData.mapOrderStatus"];
                        const transformedOrders = orders.map({
                            "AppProvider.useEffect.initializeData.transformedOrders": (o)=>({
                                    id: o.id,
                                    orderNumber: o.orderNumber,
                                    veeqoId: o.externalId,
                                    channel: o.channel,
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
                                            country: o.shippingAddress.country
                                        }
                                    },
                                    items: o.items.map({
                                        "AppProvider.useEffect.initializeData.transformedOrders": (item)=>({
                                                productId: item.productId || item.bundleId || '',
                                                productName: item.name,
                                                sku: item.sku,
                                                quantity: item.quantity,
                                                price: item.price,
                                                cost: item.cost,
                                                picked: false
                                            })
                                    }["AppProvider.useEffect.initializeData.transformedOrders"]),
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
                                    updatedAt: new Date(o.updatedAt)
                                })
                        }["AppProvider.useEffect.initializeData.transformedOrders"]);
                        const transformedPOs = purchaseOrders.map({
                            "AppProvider.useEffect.initializeData.transformedPOs": (po)=>({
                                    id: po.id,
                                    poNumber: po.poNumber,
                                    supplier: po.supplier.name,
                                    status: po.status,
                                    currency: po.currency,
                                    expectedDate: po.expectedDate ? new Date(po.expectedDate) : undefined,
                                    items: po.items.map({
                                        "AppProvider.useEffect.initializeData.transformedPOs": (item)=>({
                                                productId: item.productId,
                                                productName: item.product?.name || '',
                                                sku: item.product?.sku || '',
                                                quantity: item.quantity,
                                                receivedQty: item.quantityReceived,
                                                unitCost: item.unitCost
                                            })
                                    }["AppProvider.useEffect.initializeData.transformedPOs"]),
                                    subtotal: po.subtotal,
                                    shipping: 0,
                                    total: po.subtotalUSD,
                                    notes: po.notes,
                                    createdAt: new Date(po.createdAt),
                                    updatedAt: new Date(po.createdAt)
                                })
                        }["AppProvider.useEffect.initializeData.transformedPOs"]);
                        const transformedWOs = workOrders.map({
                            "AppProvider.useEffect.initializeData.transformedWOs": (wo)=>({
                                    id: wo.id,
                                    woNumber: wo.woNumber,
                                    status: wo.status,
                                    outputProductId: wo.outputProductId,
                                    outputProductName: wo.outputProduct?.name || '',
                                    quantityToProduce: wo.outputQuantity,
                                    quantityProduced: wo.status === 'completed' ? wo.outputQuantity : 0,
                                    priority: 'normal',
                                    components: wo.inputs.map({
                                        "AppProvider.useEffect.initializeData.transformedWOs": (input)=>({
                                                productId: input.productId,
                                                productName: input.product?.name || '',
                                                quantityRequired: input.quantityRequired,
                                                quantityUsed: input.quantityUsed
                                            })
                                    }["AppProvider.useEffect.initializeData.transformedWOs"]),
                                    notes: wo.notes,
                                    createdAt: new Date(wo.createdAt),
                                    completedAt: wo.completedAt ? new Date(wo.completedAt) : undefined
                                })
                        }["AppProvider.useEffect.initializeData.transformedWOs"]);
                        const transformedBundles = bundles.map({
                            "AppProvider.useEffect.initializeData.transformedBundles": (b)=>({
                                    id: b.id,
                                    name: b.name,
                                    sku: b.sku,
                                    type: 'virtual',
                                    description: b.description,
                                    prices: {
                                        msrp: b.prices.msrp,
                                        shopify: b.prices.shopify,
                                        amazon: b.prices.amazon,
                                        wholesale: b.prices.wholesale || b.prices.msrp * 0.6
                                    },
                                    compareAtPrices: b.compareAtPrices || {
                                        msrp: b.prices.msrp * 1.2,
                                        shopify: (b.prices.shopify || b.prices.msrp) * 1.2,
                                        amazon: (b.prices.amazon || b.prices.msrp) * 1.2
                                    },
                                    components: (b.components || []).map({
                                        "AppProvider.useEffect.initializeData.transformedBundles": (c)=>({
                                                productId: c.productId,
                                                productName: c.product?.name || '',
                                                quantity: c.quantity
                                            })
                                    }["AppProvider.useEffect.initializeData.transformedBundles"]),
                                    createdAt: new Date(),
                                    updatedAt: new Date()
                                })
                        }["AppProvider.useEffect.initializeData.transformedBundles"]);
                        const transformedBoxes = shippingBoxes.map({
                            "AppProvider.useEffect.initializeData.transformedBoxes": (box)=>({
                                    id: box.id,
                                    name: box.name,
                                    sku: box.sku,
                                    innerLength: box.dimensions.length,
                                    innerWidth: box.dimensions.width,
                                    innerHeight: box.dimensions.height,
                                    maxWeight: box.maxWeight,
                                    cost: box.cost,
                                    smartBoxEligible: box.isSmartBoxEligible
                                })
                        }["AppProvider.useEffect.initializeData.transformedBoxes"]);
                        // Create mock shipments from shipped orders
                        const mockShipments = transformedOrders.filter({
                            "AppProvider.useEffect.initializeData.mockShipments": (o)=>o.status === 'shipped' || o.status === 'delivered'
                        }["AppProvider.useEffect.initializeData.mockShipments"]).map({
                            "AppProvider.useEffect.initializeData.mockShipments": (o)=>({
                                    id: `ship-${o.id}`,
                                    orderId: o.id,
                                    orderNumber: o.orderNumber,
                                    carrier: o.carrier || 'usps',
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
                                    deliveredAt: o.status === 'delivered' ? new Date() : undefined
                                })
                        }["AppProvider.useEffect.initializeData.mockShipments"]);
                        // Create mock picking batches
                        const mockPickingBatches = [
                            {
                                id: 'batch-1',
                                batchNumber: 'PB-001',
                                status: 'open',
                                orderIds: [],
                                createdAt: new Date()
                            },
                            {
                                id: 'batch-2',
                                batchNumber: 'PB-002',
                                status: 'in_progress',
                                orderIds: [],
                                assignedTo: 'John',
                                createdAt: new Date(Date.now() - 86400000)
                            }
                        ];
                        // Create mock returns
                        const mockReturns = [
                            {
                                id: 'return-1',
                                returnNumber: 'RET-0001',
                                orderId: 'order-5',
                                orderNumber: 'SH-4518',
                                channel: 'shopify',
                                status: 'requested',
                                customer: {
                                    name: 'James Wilson',
                                    email: 'jwilson@email.com'
                                },
                                items: [
                                    {
                                        productId: 'prod-mic-1l',
                                        productName: '1L Micro 5-0-1',
                                        sku: 'CNMIC1L',
                                        quantity: 1,
                                        quantityReceived: 0,
                                        reason: 'damaged_in_transit',
                                        refundAmount: 12.99
                                    }
                                ],
                                returnShipping: {},
                                refund: {
                                    subtotal: 12.99,
                                    shipping: 0,
                                    restockingFee: 0,
                                    total: 12.99
                                },
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
                                customer: {
                                    name: 'Lisa Chen',
                                    email: 'lchen@email.com'
                                },
                                items: [
                                    {
                                        productId: 'prod-bb-500',
                                        productName: '500mL Bud Booster 0-1-3',
                                        sku: 'CNBB500ML',
                                        quantity: 2,
                                        quantityReceived: 0,
                                        reason: 'changed_mind',
                                        refundAmount: 45.76
                                    }
                                ],
                                returnShipping: {
                                    trackingNumber: 'RET123456789',
                                    carrier: 'usps'
                                },
                                refund: {
                                    subtotal: 45.76,
                                    shipping: 0,
                                    restockingFee: 4.58,
                                    total: 41.18
                                },
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
                                customer: {
                                    name: 'Tom Brady',
                                    email: 'tbrady@email.com'
                                },
                                items: [
                                    {
                                        productId: 'prod-gro-1l',
                                        productName: '1L Grow 2-1-6',
                                        sku: 'CNGRO1L',
                                        quantity: 1,
                                        quantityReceived: 1,
                                        reason: 'defective',
                                        refundAmount: 12.99
                                    }
                                ],
                                returnShipping: {
                                    trackingNumber: 'RET987654321',
                                    carrier: 'ups'
                                },
                                refund: {
                                    subtotal: 12.99,
                                    shipping: 6.99,
                                    restockingFee: 0,
                                    total: 19.98
                                },
                                createdAt: new Date(Date.now() - 259200000),
                                updatedAt: new Date()
                            }
                        ];
                        // Create mock stock counts
                        const mockStockCounts = [
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
                        const mockTransfers = [
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
                        const mockAutomationRules = [
                            {
                                id: 'rule-1',
                                name: 'Tag Amazon Prime orders',
                                description: 'Automatically add PRIME tag to Amazon Prime orders for priority handling',
                                enabled: true,
                                trigger: {
                                    type: 'order_created'
                                },
                                conditions: [
                                    {
                                        id: 'cond-1',
                                        field: 'channel',
                                        operator: 'equals',
                                        value: 'amazon_fbm'
                                    }
                                ],
                                actions: [
                                    {
                                        id: 'act-1',
                                        type: 'set_order_tag',
                                        config: {
                                            tag: 'PRIME'
                                        }
                                    },
                                    {
                                        id: 'act-2',
                                        type: 'set_priority',
                                        config: {
                                            priority: 'high'
                                        }
                                    }
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
                                trigger: {
                                    type: 'order_created'
                                },
                                conditions: [
                                    {
                                        id: 'cond-2',
                                        field: 'total',
                                        operator: 'less_than',
                                        value: 50
                                    }
                                ],
                                actions: [
                                    {
                                        id: 'act-3',
                                        type: 'assign_carrier',
                                        config: {
                                            carrier: 'usps'
                                        }
                                    },
                                    {
                                        id: 'act-4',
                                        type: 'assign_service',
                                        config: {
                                            service: 'first_class'
                                        }
                                    }
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
                                trigger: {
                                    type: 'low_stock',
                                    threshold: 50
                                },
                                conditions: [],
                                actions: [
                                    {
                                        id: 'act-5',
                                        type: 'send_notification',
                                        config: {
                                            message: 'Stock is running low!'
                                        }
                                    },
                                    {
                                        id: 'act-6',
                                        type: 'create_po_draft',
                                        config: {
                                            quantity: 100
                                        }
                                    }
                                ],
                                priority: 3,
                                createdAt: new Date(Date.now() - 172800000),
                                updatedAt: new Date(Date.now() - 172800000)
                            }
                        ];
                        // Create mock lots
                        const mockLots = [
                            {
                                id: 'lot-1',
                                lotNumber: 'LOT-20241215-001',
                                productId: 'prod-mic-500',
                                productName: '500mL Micro 5-0-1',
                                sku: 'CNMIC500ML',
                                quantity: 100,
                                reservedQty: 5,
                                expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                                manufacturedDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
                                receivedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                                status: 'active',
                                locationId: 'loc-warehouse',
                                locationName: 'Texas Warehouse',
                                supplierLotNumber: 'HG-2024-1234'
                            },
                            {
                                id: 'lot-2',
                                lotNumber: 'LOT-20241201-001',
                                productId: 'prod-mic-500',
                                productName: '500mL Micro 5-0-1',
                                sku: 'CNMIC500ML',
                                quantity: 50,
                                reservedQty: 0,
                                expirationDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
                                manufacturedDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
                                receivedDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
                                status: 'active',
                                locationId: 'loc-warehouse',
                                locationName: 'Texas Warehouse',
                                supplierLotNumber: 'HG-2024-1198'
                            },
                            {
                                id: 'lot-3',
                                lotNumber: 'LOT-20241220-001',
                                productId: 'prod-gro-1l',
                                productName: '1L Grow 2-1-6',
                                sku: 'CNGRO1L',
                                quantity: 75,
                                reservedQty: 10,
                                expirationDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
                                manufacturedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                                receivedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
                                status: 'active',
                                locationId: 'loc-warehouse',
                                locationName: 'Texas Warehouse'
                            },
                            {
                                id: 'lot-4',
                                lotNumber: 'LOT-20241101-001',
                                productId: 'prod-bb-500',
                                productName: '500mL Bud Booster 0-1-3',
                                sku: 'CNBB500ML',
                                quantity: 25,
                                reservedQty: 0,
                                expirationDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                                manufacturedDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
                                receivedDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
                                status: 'expired',
                                locationId: 'loc-warehouse',
                                locationName: 'Texas Warehouse',
                                notes: 'Expired - pending disposal'
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
                                notes: 'Quality check pending - suspected contamination'
                            }
                        ];
                        dispatch({
                            type: 'SET_LOCATIONS',
                            payload: transformedLocations
                        });
                        dispatch({
                            type: 'SET_PRODUCTS',
                            payload: transformedProducts
                        });
                        dispatch({
                            type: 'SET_INVENTORY',
                            payload: transformedInventory
                        });
                        dispatch({
                            type: 'SET_ORDERS',
                            payload: transformedOrders
                        });
                        dispatch({
                            type: 'SET_PURCHASE_ORDERS',
                            payload: transformedPOs
                        });
                        dispatch({
                            type: 'SET_WORK_ORDERS',
                            payload: transformedWOs
                        });
                        dispatch({
                            type: 'SET_BUNDLES',
                            payload: transformedBundles
                        });
                        dispatch({
                            type: 'SET_BOXES',
                            payload: transformedBoxes
                        });
                        dispatch({
                            type: 'SET_SHIPMENTS',
                            payload: mockShipments
                        });
                        dispatch({
                            type: 'SET_PICKING_BATCHES',
                            payload: mockPickingBatches
                        });
                        dispatch({
                            type: 'SET_RETURNS',
                            payload: mockReturns
                        });
                        dispatch({
                            type: 'SET_STOCK_COUNTS',
                            payload: mockStockCounts
                        });
                        dispatch({
                            type: 'SET_TRANSFERS',
                            payload: mockTransfers
                        });
                        dispatch({
                            type: 'SET_AUTOMATION_RULES',
                            payload: mockAutomationRules
                        });
                        dispatch({
                            type: 'SET_LOTS',
                            payload: mockLots
                        });
                        // Create mock suppliers
                        const mockSuppliers = [
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
                                    country: 'US'
                                },
                                currency: 'USD',
                                paymentTerms: 'Net 30',
                                leadTimeDays: 14,
                                minimumOrderValue: 500,
                                notes: 'Primary nutrient supplier',
                                isActive: true,
                                createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
                                updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
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
                                updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
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
                                updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                            }
                        ];
                        // Create mock product-supplier relationships
                        const mockProductSuppliers = [
                            {
                                productId: 'prod-mic-500',
                                supplierId: 'sup-hgc',
                                supplierSku: 'HGC-MIC-500',
                                unitCost: 3.50,
                                currency: 'USD',
                                minimumOrderQty: 100,
                                leadTimeDays: 14,
                                isPrimary: true,
                                lastOrderedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                            },
                            {
                                productId: 'prod-mic-1l',
                                supplierId: 'sup-hgc',
                                supplierSku: 'HGC-MIC-1L',
                                unitCost: 5.75,
                                currency: 'USD',
                                minimumOrderQty: 50,
                                leadTimeDays: 14,
                                isPrimary: true
                            },
                            {
                                productId: 'prod-gro-1l',
                                supplierId: 'sup-hgc',
                                supplierSku: 'HGC-GRO-1L',
                                unitCost: 5.50,
                                currency: 'USD',
                                minimumOrderQty: 50,
                                isPrimary: true
                            },
                            {
                                productId: 'prod-bb-500',
                                supplierId: 'sup-hgc',
                                supplierSku: 'HGC-BB-500',
                                unitCost: 4.25,
                                currency: 'USD',
                                minimumOrderQty: 100,
                                isPrimary: true
                            }
                        ];
                        dispatch({
                            type: 'SET_SUPPLIERS',
                            payload: mockSuppliers
                        });
                        dispatch({
                            type: 'SET_PRODUCT_SUPPLIERS',
                            payload: mockProductSuppliers
                        });
                        dispatch({
                            type: 'SET_LOADING',
                            payload: false
                        });
                        dispatch({
                            type: 'SET_INITIALIZED',
                            payload: true
                        });
                    } catch (error) {
                        console.error('Failed to initialize app data:', error);
                        dispatch({
                            type: 'SET_LOADING',
                            payload: false
                        });
                    }
                }
            }["AppProvider.useEffect.initializeData"];
            initializeData();
        }
    }["AppProvider.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AppContext.Provider, {
        value: {
            state,
            dispatch
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/context/AppContext.tsx",
        lineNumber: 1959,
        columnNumber: 5
    }, this);
}
_s(AppProvider, "bgCdjuTOmPdSBRwTap80EFd9Y3U=");
_c = AppProvider;
function useApp() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
_s1(useApp, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
function useProducts() {
    _s2();
    const { state } = useApp();
    return state.products;
}
_s2(useProducts, "4T9imRGE2C10qdYg9OIaug00+PA=", false, function() {
    return [
        useApp
    ];
});
function useOrders() {
    _s3();
    const { state } = useApp();
    return state.orders;
}
_s3(useOrders, "4T9imRGE2C10qdYg9OIaug00+PA=", false, function() {
    return [
        useApp
    ];
});
function useInventory() {
    _s4();
    const { state } = useApp();
    return state.inventory;
}
_s4(useInventory, "4T9imRGE2C10qdYg9OIaug00+PA=", false, function() {
    return [
        useApp
    ];
});
function useLocations() {
    _s5();
    const { state } = useApp();
    return state.locations;
}
_s5(useLocations, "4T9imRGE2C10qdYg9OIaug00+PA=", false, function() {
    return [
        useApp
    ];
});
function useSettings() {
    _s6();
    const { state } = useApp();
    return state.settings;
}
_s6(useSettings, "4T9imRGE2C10qdYg9OIaug00+PA=", false, function() {
    return [
        useApp
    ];
});
function useProductStock(productId) {
    _s7();
    const { state } = useApp();
    return state.inventory.filter((inv)=>inv.productId === productId).reduce((total, inv)=>total + inv.quantity, 0);
}
_s7(useProductStock, "4T9imRGE2C10qdYg9OIaug00+PA=", false, function() {
    return [
        useApp
    ];
});
function useLocationStock(productId, locationId) {
    _s8();
    const { state } = useApp();
    const inv = state.inventory.find((i)=>i.productId === productId && i.locationId === locationId);
    return inv?.quantity || 0;
}
_s8(useLocationStock, "4T9imRGE2C10qdYg9OIaug00+PA=", false, function() {
    return [
        useApp
    ];
});
var _c;
__turbopack_context__.k.register(_c, "AppProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/layout/Sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AppContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function Sidebar() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const { state } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const [expandedMenus, setExpandedMenus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Calculate badges from state
    const toPickCount = state.orders.filter((o)=>o.status === 'to_pick' || o.status === 'picking').length;
    const toPackCount = state.orders.filter((o)=>o.status === 'to_pack' || o.status === 'packing').length;
    const pendingOrdersCount = state.orders.filter((o)=>![
            'shipped',
            'delivered',
            'cancelled',
            'draft'
        ].includes(o.status)).length;
    const draftOrdersCount = state.orders.filter((o)=>o.status === 'draft').length;
    const pendingReturnsCount = state.returns?.filter((r)=>![
            'refunded',
            'rejected'
        ].includes(r.status)).length || 0;
    const pendingTransfersCount = state.transfers?.filter((t)=>t.status === 'in_transit').length || 0;
    const pendingPOsCount = state.purchaseOrders?.filter((po)=>![
            'received',
            'cancelled'
        ].includes(po.status)).length || 0;
    const pendingWOsCount = state.workOrders?.filter((wo)=>![
            'completed',
            'cancelled'
        ].includes(wo.status)).length || 0;
    // Navigation structure
    const navItems = [
        {
            href: '/',
            icon: 'fa-chart-line',
            label: 'Dashboard'
        },
        {
            id: 'inventory',
            icon: 'fa-boxes-stacked',
            label: 'Inventory',
            children: [
                {
                    href: '/inventory',
                    icon: 'fa-box',
                    label: 'Products'
                },
                {
                    href: '/inventory/counts',
                    icon: 'fa-clipboard-check',
                    label: 'Stock Counts'
                },
                {
                    href: '/inventory/transfers',
                    icon: 'fa-exchange-alt',
                    label: 'Transfers',
                    badge: pendingTransfersCount
                },
                {
                    href: '/inventory/suppliers',
                    icon: 'fa-truck-loading',
                    label: 'Suppliers'
                },
                {
                    href: '/inventory/bundles',
                    icon: 'fa-layer-group',
                    label: 'Bundles & Kits'
                }
            ]
        },
        {
            id: 'orders',
            icon: 'fa-shopping-cart',
            label: 'Orders',
            badge: pendingOrdersCount,
            children: [
                {
                    href: '/orders',
                    icon: 'fa-list',
                    label: 'All Orders',
                    badge: pendingOrdersCount
                },
                {
                    href: '/orders/drafts',
                    icon: 'fa-file-alt',
                    label: 'Draft Orders',
                    badge: draftOrdersCount
                },
                {
                    href: '/orders/returns',
                    icon: 'fa-undo',
                    label: 'Returns',
                    badge: pendingReturnsCount
                }
            ]
        },
        {
            id: 'fulfillment',
            icon: 'fa-shipping-fast',
            label: 'Fulfillment',
            badge: toPickCount + toPackCount,
            children: [
                {
                    href: '/fulfillment',
                    icon: 'fa-clipboard-list',
                    label: 'Overview'
                },
                {
                    href: '/fulfillment/pick',
                    icon: 'fa-hand-pointer',
                    label: 'Pick Station',
                    badge: toPickCount
                },
                {
                    href: '/fulfillment/pack',
                    icon: 'fa-box-open',
                    label: 'Pack Station',
                    badge: toPackCount
                },
                {
                    href: '/fulfillment/fba',
                    icon: 'fa-amazon',
                    label: 'FBA Prep',
                    isBrand: true
                },
                {
                    href: '/fulfillment/shipping',
                    icon: 'fa-truck',
                    label: 'Shipping'
                }
            ]
        },
        {
            id: 'operations',
            icon: 'fa-cogs',
            label: 'Operations',
            badge: pendingPOsCount + pendingWOsCount,
            children: [
                {
                    href: '/operations/purchase-orders',
                    icon: 'fa-file-invoice',
                    label: 'Purchase Orders',
                    badge: pendingPOsCount
                },
                {
                    href: '/operations/work-orders',
                    icon: 'fa-industry',
                    label: 'Work Orders',
                    badge: pendingWOsCount
                }
            ]
        },
        {
            id: 'marketing',
            icon: 'fa-bullhorn',
            label: 'Marketing',
            children: [
                {
                    href: '/marketing',
                    icon: 'fa-chart-line',
                    label: 'Dashboard'
                },
                {
                    href: '/marketing/google-ads',
                    icon: 'fa-google',
                    label: 'Google Ads',
                    isBrand: true
                },
                {
                    href: '/marketing/meta-ads',
                    icon: 'fa-meta',
                    label: 'Meta Ads',
                    isBrand: true
                },
                {
                    href: '/marketing/amazon-ads',
                    icon: 'fa-amazon',
                    label: 'Amazon Ads',
                    isBrand: true
                },
                {
                    href: '/marketing/tiktok-ads',
                    icon: 'fa-tiktok',
                    label: 'TikTok Ads',
                    isBrand: true
                },
                {
                    href: '/marketing/email',
                    icon: 'fa-envelope',
                    label: 'Email Marketing'
                }
            ]
        }
    ];
    const bottomNavItems = [
        {
            id: 'reports',
            icon: 'fa-chart-pie',
            label: 'Reports',
            children: [
                {
                    href: '/reports',
                    icon: 'fa-chart-line',
                    label: 'Overview'
                },
                {
                    href: '/reports/sales',
                    icon: 'fa-dollar-sign',
                    label: 'Sales'
                },
                {
                    href: '/reports/inventory',
                    icon: 'fa-boxes-stacked',
                    label: 'Inventory'
                },
                {
                    href: '/reports/shipping',
                    icon: 'fa-truck-fast',
                    label: 'Shipping'
                },
                {
                    href: '/reports/returns',
                    icon: 'fa-rotate-left',
                    label: 'Returns'
                },
                {
                    href: '/reports/marketing',
                    icon: 'fa-bullhorn',
                    label: 'Marketing'
                },
                {
                    href: '/reports/financial',
                    icon: 'fa-file-invoice-dollar',
                    label: 'Financial'
                },
                {
                    href: '/reports/custom',
                    icon: 'fa-wand-magic-sparkles',
                    label: 'Custom Builder'
                },
                {
                    href: '/reports/scheduled',
                    icon: 'fa-clock',
                    label: 'Scheduled'
                }
            ]
        },
        {
            href: '/settings',
            icon: 'fa-cog',
            label: 'Settings'
        }
    ];
    // Auto-expand menu based on current route
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Sidebar.useEffect": ()=>{
            [
                ...navItems,
                ...bottomNavItems
            ].forEach({
                "Sidebar.useEffect": (item)=>{
                    if (item.children && item.id) {
                        const isActive = item.children.some({
                            "Sidebar.useEffect.isActive": (child)=>child.href === pathname || pathname.startsWith(child.href + '/')
                        }["Sidebar.useEffect.isActive"]);
                        if (isActive && !expandedMenus.includes(item.id)) {
                            setExpandedMenus({
                                "Sidebar.useEffect": (prev)=>[
                                        ...prev,
                                        item.id
                                    ]
                            }["Sidebar.useEffect"]);
                        }
                    }
                }
            }["Sidebar.useEffect"]);
        }
    }["Sidebar.useEffect"], [
        pathname
    ]);
    const toggleMenu = (menuId)=>{
        setExpandedMenus((prev)=>prev.includes(menuId) ? prev.filter((id)=>id !== menuId) : [
                ...prev,
                menuId
            ]);
    };
    const isActiveRoute = (href)=>{
        if (href === '/') return pathname === '/';
        return pathname === href || pathname.startsWith(href + '/');
    };
    const isParentActive = (item)=>{
        if (!item.children) return false;
        return item.children.some((child)=>child.href && isActiveRoute(child.href));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "fixed left-0 top-0 z-40 h-screen w-64 bg-slate-900/80 border-r border-slate-700/50 flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-5 border-b border-slate-700/50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-leaf text-white text-lg"
                            }, void 0, false, {
                                fileName: "[project]/components/layout/Sidebar.tsx",
                                lineNumber: 159,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/layout/Sidebar.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "font-bold text-white text-lg",
                                    children: "Cronk WMS"
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/Sidebar.tsx",
                                    lineNumber: 162,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-slate-400",
                                    children: "Inventory Management"
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/Sidebar.tsx",
                                    lineNumber: 163,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/layout/Sidebar.tsx",
                            lineNumber: 161,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/layout/Sidebar.tsx",
                    lineNumber: 157,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/layout/Sidebar.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "flex-1 p-4 space-y-1 overflow-y-auto",
                children: [
                    navItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: item.children ? // Expandable menu
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>toggleMenu(item.id),
                                        className: `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isParentActive(item) ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: `fas ${item.icon} w-5`
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/Sidebar.tsx",
                                                lineNumber: 183,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium",
                                                children: item.label
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/Sidebar.tsx",
                                                lineNumber: 184,
                                                columnNumber: 19
                                            }, this),
                                            (item.badge ?? 0) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-auto mr-2 bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded-full",
                                                children: item.badge
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/Sidebar.tsx",
                                                lineNumber: 186,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: `fas fa-chevron-${expandedMenus.includes(item.id) ? 'down' : 'right'} text-xs text-slate-500 ${(item.badge ?? 0) > 0 ? '' : 'ml-auto'}`
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/Sidebar.tsx",
                                                lineNumber: 190,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/layout/Sidebar.tsx",
                                        lineNumber: 175,
                                        columnNumber: 17
                                    }, this),
                                    expandedMenus.includes(item.id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ml-4 mt-1 space-y-1 border-l border-slate-700/50 pl-3",
                                        children: item.children.map((child)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: child.href,
                                                className: `flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm ${isActiveRoute(child.href) ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: `${child.isBrand ? 'fab' : 'fas'} ${child.icon} w-4 text-xs`
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/layout/Sidebar.tsx",
                                                        lineNumber: 206,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: child.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/layout/Sidebar.tsx",
                                                        lineNumber: 207,
                                                        columnNumber: 25
                                                    }, this),
                                                    (child.badge ?? 0) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `ml-auto text-xs px-2 py-0.5 rounded-full ${child.label.includes('Pick') ? 'bg-amber-500/20 text-amber-400' : child.label.includes('Pack') ? 'bg-blue-500/20 text-blue-400' : child.label.includes('Return') ? 'bg-purple-500/20 text-purple-400' : child.label.includes('Draft') ? 'bg-slate-500/20 text-slate-400' : 'bg-slate-500/20 text-slate-400'}`,
                                                        children: child.badge
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/layout/Sidebar.tsx",
                                                        lineNumber: 209,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, child.href, true, {
                                                fileName: "[project]/components/layout/Sidebar.tsx",
                                                lineNumber: 197,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/Sidebar.tsx",
                                        lineNumber: 195,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true) : // Single menu item
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                className: `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActiveRoute(item.href) ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: `fas ${item.icon} w-5`
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/Sidebar.tsx",
                                        lineNumber: 234,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium",
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/Sidebar.tsx",
                                        lineNumber: 235,
                                        columnNumber: 17
                                    }, this),
                                    (item.badge ?? 0) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-auto bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded-full",
                                        children: item.badge
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/Sidebar.tsx",
                                        lineNumber: 237,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/layout/Sidebar.tsx",
                                lineNumber: 226,
                                columnNumber: 15
                            }, this)
                        }, item.id || item.href, false, {
                            fileName: "[project]/components/layout/Sidebar.tsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "my-4 border-t border-slate-700/50"
                    }, void 0, false, {
                        fileName: "[project]/components/layout/Sidebar.tsx",
                        lineNumber: 247,
                        columnNumber: 9
                    }, this),
                    bottomNavItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: item.children ? // Expandable menu
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>toggleMenu(item.id),
                                        className: `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isParentActive(item) ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: `fas ${item.icon} w-5`
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/Sidebar.tsx",
                                                lineNumber: 263,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium",
                                                children: item.label
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/Sidebar.tsx",
                                                lineNumber: 264,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: `fas fa-chevron-${expandedMenus.includes(item.id) ? 'down' : 'right'} text-xs text-slate-500 ml-auto`
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/Sidebar.tsx",
                                                lineNumber: 265,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/layout/Sidebar.tsx",
                                        lineNumber: 255,
                                        columnNumber: 17
                                    }, this),
                                    expandedMenus.includes(item.id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ml-4 mt-1 space-y-1 border-l border-slate-700/50 pl-3",
                                        children: item.children.map((child)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: child.href,
                                                className: `flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm ${isActiveRoute(child.href) ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: `${child.isBrand ? 'fab' : 'fas'} ${child.icon} w-4 text-xs`
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/layout/Sidebar.tsx",
                                                        lineNumber: 281,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: child.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/layout/Sidebar.tsx",
                                                        lineNumber: 282,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, child.href, true, {
                                                fileName: "[project]/components/layout/Sidebar.tsx",
                                                lineNumber: 272,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/Sidebar.tsx",
                                        lineNumber: 270,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true) : // Single menu item
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                className: `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActiveRoute(item.href) ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: `fas ${item.icon} w-5`
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/Sidebar.tsx",
                                        lineNumber: 298,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/Sidebar.tsx",
                                        lineNumber: 299,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/layout/Sidebar.tsx",
                                lineNumber: 290,
                                columnNumber: 15
                            }, this)
                        }, item.id || item.href, false, {
                            fileName: "[project]/components/layout/Sidebar.tsx",
                            lineNumber: 251,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/layout/Sidebar.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-t border-slate-700/50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-9 h-9 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white font-medium text-sm",
                                children: "JC"
                            }, void 0, false, {
                                fileName: "[project]/components/layout/Sidebar.tsx",
                                lineNumber: 310,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/layout/Sidebar.tsx",
                            lineNumber: 309,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm font-medium text-white truncate",
                                    children: "John Cronk"
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/Sidebar.tsx",
                                    lineNumber: 313,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-slate-400 truncate",
                                    children: "Admin"
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/Sidebar.tsx",
                                    lineNumber: 314,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/layout/Sidebar.tsx",
                            lineNumber: 312,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-sign-out-alt"
                            }, void 0, false, {
                                fileName: "[project]/components/layout/Sidebar.tsx",
                                lineNumber: 317,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/layout/Sidebar.tsx",
                            lineNumber: 316,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/layout/Sidebar.tsx",
                    lineNumber: 308,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/layout/Sidebar.tsx",
                lineNumber: 307,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/layout/Sidebar.tsx",
        lineNumber: 154,
        columnNumber: 5
    }, this);
}
_s(Sidebar, "tP9iRXAZJjz7KXKVbzgTqWkiv9I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"]
    ];
});
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/layout/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const dateRangeOptions = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'wtd',
        label: 'Week to Date'
    },
    {
        value: 'mtd',
        label: 'Month to Date'
    },
    {
        value: 'ytd',
        label: 'Year to Date'
    },
    {
        value: 'custom',
        label: 'Custom Range'
    }
];
const mockNotifications = [
    {
        id: 1,
        type: 'warning',
        title: 'Low Stock Alert',
        message: 'Big Bud 1L is below reorder point (12 units)',
        time: '5 min ago'
    },
    {
        id: 2,
        type: 'order',
        title: 'New Order',
        message: 'Order #10492 received from Shopify',
        time: '12 min ago'
    },
    {
        id: 3,
        type: 'success',
        title: 'Shipment Delivered',
        message: 'Order #10485 delivered to customer',
        time: '1 hour ago'
    }
];
function Header() {
    _s();
    const [dateRange, setDateRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('mtd');
    const [showDateDropdown, setShowDateDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showNotifications, setShowNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSyncing, setIsSyncing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lastSync, setLastSync] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('2 min ago');
    const handleSync = ()=>{
        setIsSyncing(true);
        setTimeout(()=>{
            setIsSyncing(false);
            setLastSync('Just now');
        }, 2000);
    };
    const getNotificationIcon = (type)=>{
        switch(type){
            case 'warning':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                    className: "h-4 w-4 text-amber-400"
                }, void 0, false, {
                    fileName: "[project]/components/layout/Header.tsx",
                    lineNumber: 72,
                    columnNumber: 16
                }, this);
            case 'order':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                    className: "h-4 w-4 text-blue-400"
                }, void 0, false, {
                    fileName: "[project]/components/layout/Header.tsx",
                    lineNumber: 74,
                    columnNumber: 16
                }, this);
            case 'success':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                    className: "h-4 w-4 text-emerald-400"
                }, void 0, false, {
                    fileName: "[project]/components/layout/Header.tsx",
                    lineNumber: 76,
                    columnNumber: 16
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                    className: "h-4 w-4 text-slate-400"
                }, void 0, false, {
                    fileName: "[project]/components/layout/Header.tsx",
                    lineNumber: 78,
                    columnNumber: 16
                }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "fixed top-0 left-64 right-0 z-30 h-16 bg-slate-900/80 backdrop-blur border-b border-slate-700/50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full items-center justify-between px-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-4"
                }, void 0, false, {
                    fileName: "[project]/components/layout/Header.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowDateDropdown(!showDateDropdown),
                                    className: "flex items-center gap-2 rounded-lg bg-slate-800/50 px-4 py-2 text-sm font-medium text-white border border-slate-700/50 hover:bg-slate-700/50 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                            className: "h-4 w-4 text-slate-400"
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/Header.tsx",
                                            lineNumber: 98,
                                            columnNumber: 15
                                        }, this),
                                        dateRangeOptions.find((o)=>o.value === dateRange)?.label,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                            className: "h-4 w-4 text-slate-400"
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/Header.tsx",
                                            lineNumber: 100,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/layout/Header.tsx",
                                    lineNumber: 94,
                                    columnNumber: 13
                                }, this),
                                showDateDropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "fixed inset-0 z-10",
                                            onClick: ()=>setShowDateDropdown(false)
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/Header.tsx",
                                            lineNumber: 105,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute right-0 top-full mt-2 z-20 w-48 rounded-xl bg-slate-800 border border-slate-700/50 shadow-xl overflow-hidden",
                                            children: dateRangeOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setDateRange(option.value);
                                                        setShowDateDropdown(false);
                                                    },
                                                    className: `w-full px-4 py-2.5 text-left text-sm transition-colors ${dateRange === option.value ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300 hover:bg-slate-700/50'}`,
                                                    children: option.label
                                                }, option.value, false, {
                                                    fileName: "[project]/components/layout/Header.tsx",
                                                    lineNumber: 111,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/Header.tsx",
                                            lineNumber: 109,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/layout/Header.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSync,
                            disabled: isSyncing,
                            className: "flex items-center gap-2 rounded-lg bg-slate-800/50 px-4 py-2 text-sm font-medium border border-slate-700/50 hover:bg-slate-700/50 transition-colors disabled:opacity-50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                    className: `h-4 w-4 text-emerald-400 ${isSyncing ? 'animate-spin' : ''}`
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/Header.tsx",
                                    lineNumber: 137,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-slate-300",
                                    children: isSyncing ? 'Syncing...' : `Synced ${lastSync}`
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/Header.tsx",
                                    lineNumber: 140,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/layout/Header.tsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowNotifications(!showNotifications),
                                    className: "relative flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                            className: "h-5 w-5 text-slate-400"
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/Header.tsx",
                                            lineNumber: 151,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white",
                                            children: mockNotifications.length
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/Header.tsx",
                                            lineNumber: 152,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/layout/Header.tsx",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, this),
                                showNotifications && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "fixed inset-0 z-10",
                                            onClick: ()=>setShowNotifications(false)
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/Header.tsx",
                                            lineNumber: 159,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute right-0 top-full mt-2 z-20 w-80 rounded-xl bg-slate-800 border border-slate-700/50 shadow-xl overflow-hidden",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "border-b border-slate-700/50 px-4 py-3",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-sm font-semibold text-white",
                                                        children: "Notifications"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/layout/Header.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/layout/Header.tsx",
                                                    lineNumber: 164,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "max-h-80 overflow-y-auto",
                                                    children: mockNotifications.map((notification)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex gap-3 px-4 py-3 hover:bg-slate-700/30 transition-colors border-b border-slate-700/30 last:border-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700/50",
                                                                    children: getNotificationIcon(notification.type)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/layout/Header.tsx",
                                                                    lineNumber: 175,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex-1 min-w-0",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm font-medium text-white",
                                                                            children: notification.title
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/layout/Header.tsx",
                                                                            lineNumber: 179,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs text-slate-400 truncate",
                                                                            children: notification.message
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/layout/Header.tsx",
                                                                            lineNumber: 182,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs text-slate-500 mt-1",
                                                                            children: notification.time
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/layout/Header.tsx",
                                                                            lineNumber: 185,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/layout/Header.tsx",
                                                                    lineNumber: 178,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, notification.id, true, {
                                                            fileName: "[project]/components/layout/Header.tsx",
                                                            lineNumber: 171,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/layout/Header.tsx",
                                                    lineNumber: 169,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "border-t border-slate-700/50 px-4 py-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "w-full text-center text-sm text-emerald-400 hover:text-emerald-300 transition-colors",
                                                        children: "View all notifications"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/layout/Header.tsx",
                                                        lineNumber: 193,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/layout/Header.tsx",
                                                    lineNumber: 192,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/layout/Header.tsx",
                                            lineNumber: 163,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/layout/Header.tsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/layout/Header.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/layout/Header.tsx",
            lineNumber: 84,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/layout/Header.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
_s(Header, "CrXOSVzLnEpkPUN0edeW+XnP6DQ=");
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/Toast.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastProvider",
    ()=>ToastProvider,
    "default",
    ()=>__TURBOPACK__default__export__,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const ToastContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ToastProvider({ children }) {
    _s();
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const addToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[addToast]": (type, message, duration = 4000)=>{
            const id = Math.random().toString(36).substring(7);
            setToasts({
                "ToastProvider.useCallback[addToast]": (prev)=>[
                        ...prev,
                        {
                            id,
                            type,
                            message,
                            duration
                        }
                    ]
            }["ToastProvider.useCallback[addToast]"]);
            if (duration > 0) {
                setTimeout({
                    "ToastProvider.useCallback[addToast]": ()=>{
                        setToasts({
                            "ToastProvider.useCallback[addToast]": (prev)=>prev.filter({
                                    "ToastProvider.useCallback[addToast]": (t)=>t.id !== id
                                }["ToastProvider.useCallback[addToast]"])
                        }["ToastProvider.useCallback[addToast]"]);
                    }
                }["ToastProvider.useCallback[addToast]"], duration);
            }
        }
    }["ToastProvider.useCallback[addToast]"], []);
    const removeToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[removeToast]": (id)=>{
            setToasts({
                "ToastProvider.useCallback[removeToast]": (prev)=>prev.filter({
                        "ToastProvider.useCallback[removeToast]": (t)=>t.id !== id
                    }["ToastProvider.useCallback[removeToast]"])
            }["ToastProvider.useCallback[removeToast]"]);
        }
    }["ToastProvider.useCallback[removeToast]"], []);
    // Convenience methods
    const success = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[success]": (message, duration)=>{
            addToast('success', message, duration);
        }
    }["ToastProvider.useCallback[success]"], [
        addToast
    ]);
    const error = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[error]": (message, duration)=>{
            addToast('error', message, duration);
        }
    }["ToastProvider.useCallback[error]"], [
        addToast
    ]);
    const info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[info]": (message, duration)=>{
            addToast('info', message, duration);
        }
    }["ToastProvider.useCallback[info]"], [
        addToast
    ]);
    const warning = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[warning]": (message, duration)=>{
            addToast('warning', message, duration);
        }
    }["ToastProvider.useCallback[warning]"], [
        addToast
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastContext.Provider, {
        value: {
            toasts,
            addToast,
            removeToast,
            success,
            error,
            info,
            warning
        },
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastContainer, {
                toasts: toasts,
                removeToast: removeToast
            }, void 0, false, {
                fileName: "[project]/components/ui/Toast.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/Toast.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_s(ToastProvider, "jhmkWyQRWoyoi5R9Y5vkHwtg7ZQ=");
_c = ToastProvider;
function useToast() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
}
_s1(useToast, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
// Toast icons mapping
const toastIcons = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    info: 'fa-info-circle',
    warning: 'fa-exclamation-triangle'
};
// Toast colors mapping
const toastColors = {
    success: {
        bg: 'bg-emerald-500/20',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400'
    },
    error: {
        bg: 'bg-red-500/20',
        border: 'border-red-500/30',
        text: 'text-red-400'
    },
    info: {
        bg: 'bg-blue-500/20',
        border: 'border-blue-500/30',
        text: 'text-blue-400'
    },
    warning: {
        bg: 'bg-amber-500/20',
        border: 'border-amber-500/30',
        text: 'text-amber-400'
    }
};
// Toast Container Component
function ToastContainer({ toasts, removeToast }) {
    if (toasts.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-4 right-4 z-50 space-y-2 max-w-md",
        children: toasts.map((toast)=>{
            const colors = toastColors[toast.type];
            const icon = toastIcons[toast.type];
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `
              flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border backdrop-blur-sm
              animate-in slide-in-from-right-full duration-300
              ${colors.bg} ${colors.border} ${colors.text}
            `,
                role: "alert",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: `fas ${icon} flex-shrink-0`
                    }, void 0, false, {
                        fileName: "[project]/components/ui/Toast.tsx",
                        lineNumber: 135,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm flex-1",
                        children: toast.message
                    }, void 0, false, {
                        fileName: "[project]/components/ui/Toast.tsx",
                        lineNumber: 136,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>removeToast(toast.id),
                        className: "ml-2 text-slate-400 hover:text-white transition-colors flex-shrink-0",
                        "aria-label": "Dismiss",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: "fas fa-times text-xs"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/Toast.tsx",
                            lineNumber: 142,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ui/Toast.tsx",
                        lineNumber: 137,
                        columnNumber: 13
                    }, this)
                ]
            }, toast.id, true, {
                fileName: "[project]/components/ui/Toast.tsx",
                lineNumber: 126,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/components/ui/Toast.tsx",
        lineNumber: 120,
        columnNumber: 5
    }, this);
}
_c1 = ToastContainer;
const __TURBOPACK__default__export__ = ToastProvider;
var _c, _c1;
__turbopack_context__.k.register(_c, "ToastProvider");
__turbopack_context__.k.register(_c1, "ToastContainer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/ConfirmDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConfirmProvider",
    ()=>ConfirmProvider,
    "default",
    ()=>__TURBOPACK__default__export__,
    "useConfirm",
    ()=>useConfirm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const ConfirmContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ConfirmProvider({ children }) {
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [options, setOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [resolvePromise, setResolvePromise] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const confirm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ConfirmProvider.useCallback[confirm]": (opts)=>{
            setOptions(opts);
            setIsOpen(true);
            return new Promise({
                "ConfirmProvider.useCallback[confirm]": (resolve)=>{
                    setResolvePromise({
                        "ConfirmProvider.useCallback[confirm]": ()=>resolve
                    }["ConfirmProvider.useCallback[confirm]"]);
                }
            }["ConfirmProvider.useCallback[confirm]"]);
        }
    }["ConfirmProvider.useCallback[confirm]"], []);
    const handleConfirm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ConfirmProvider.useCallback[handleConfirm]": ()=>{
            resolvePromise?.(true);
            setIsOpen(false);
            setOptions(null);
        }
    }["ConfirmProvider.useCallback[handleConfirm]"], [
        resolvePromise
    ]);
    const handleCancel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ConfirmProvider.useCallback[handleCancel]": ()=>{
            resolvePromise?.(false);
            setIsOpen(false);
            setOptions(null);
        }
    }["ConfirmProvider.useCallback[handleCancel]"], [
        resolvePromise
    ]);
    // Handle escape key
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConfirmProvider.useEffect": ()=>{
            const handleEscape = {
                "ConfirmProvider.useEffect.handleEscape": (e)=>{
                    if (e.key === 'Escape' && isOpen) {
                        handleCancel();
                    }
                }
            }["ConfirmProvider.useEffect.handleEscape"];
            document.addEventListener('keydown', handleEscape);
            return ({
                "ConfirmProvider.useEffect": ()=>document.removeEventListener('keydown', handleEscape)
            })["ConfirmProvider.useEffect"];
        }
    }["ConfirmProvider.useEffect"], [
        isOpen,
        handleCancel
    ]);
    // Prevent body scroll when dialog is open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConfirmProvider.useEffect": ()=>{
            if (isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            return ({
                "ConfirmProvider.useEffect": ()=>{
                    document.body.style.overflow = '';
                }
            })["ConfirmProvider.useEffect"];
        }
    }["ConfirmProvider.useEffect"], [
        isOpen
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ConfirmContext.Provider, {
        value: {
            confirm
        },
        children: [
            children,
            isOpen && options && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4",
                onClick: handleCancel,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        options.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `w-12 h-12 rounded-full flex items-center justify-center mb-4 ${options.destructive ? 'bg-red-500/20' : 'bg-blue-500/20'}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: `fas ${options.icon} text-xl ${options.destructive ? 'text-red-400' : 'text-blue-400'}`
                            }, void 0, false, {
                                fileName: "[project]/components/ui/ConfirmDialog.tsx",
                                lineNumber: 85,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ui/ConfirmDialog.tsx",
                            lineNumber: 82,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold text-white mb-2",
                            children: options.title
                        }, void 0, false, {
                            fileName: "[project]/components/ui/ConfirmDialog.tsx",
                            lineNumber: 92,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-400 mb-6",
                            children: options.message
                        }, void 0, false, {
                            fileName: "[project]/components/ui/ConfirmDialog.tsx",
                            lineNumber: 95,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 justify-end",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleCancel,
                                    className: "px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors",
                                    children: options.cancelText || 'Cancel'
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/ConfirmDialog.tsx",
                                    lineNumber: 99,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleConfirm,
                                    className: `px-4 py-2 rounded-lg transition-colors font-medium ${options.destructive ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}`,
                                    children: options.confirmText || 'Confirm'
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/ConfirmDialog.tsx",
                                    lineNumber: 105,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ui/ConfirmDialog.tsx",
                            lineNumber: 98,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/ConfirmDialog.tsx",
                    lineNumber: 76,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/ConfirmDialog.tsx",
                lineNumber: 72,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/ConfirmDialog.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
_s(ConfirmProvider, "nVrbvn3DuI3XG5L+ZLOobDtxwyM=");
_c = ConfirmProvider;
function useConfirm() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ConfirmContext);
    if (!context) {
        throw new Error('useConfirm must be used within ConfirmProvider');
    }
    return context.confirm;
}
_s1(useConfirm, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
const __TURBOPACK__default__export__ = ConfirmProvider;
var _c;
__turbopack_context__.k.register(_c, "ConfirmProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AppContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Toast.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/ConfirmDialog.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfirmProvider"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/components/Providers.tsx",
                lineNumber: 16,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/Providers.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Providers.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = Providers;
const __TURBOPACK__default__export__ = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_4a74ea7e._.js.map