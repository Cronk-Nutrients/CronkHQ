(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/formatting.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Shared formatting utilities
 */ __turbopack_context__.s([
    "formatCurrency",
    ()=>formatCurrency,
    "formatCurrencyPrecise",
    ()=>formatCurrencyPrecise,
    "formatDate",
    ()=>formatDate,
    "formatDateTime",
    ()=>formatDateTime,
    "formatNumber",
    ()=>formatNumber,
    "formatPercent",
    ()=>formatPercent,
    "formatRelativeTime",
    ()=>formatRelativeTime,
    "formatWeight",
    ()=>formatWeight
]);
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}
function formatCurrencyPrecise(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}
function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
}
function formatPercent(num, showSign = true) {
    if (showSign) {
        return `${num >= 0 ? '+' : ''}${num.toFixed(1)}%`;
    }
    return `${num.toFixed(1)}%`;
}
function formatWeight(oz) {
    if (oz >= 16) {
        return `${(oz / 16).toFixed(1)} lbs`;
    }
    return `${oz.toFixed(1)} oz`;
}
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}
function formatDateTime(date) {
    return new Date(date).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
}
function formatRelativeTime(date) {
    const now = new Date();
    const then = new Date(date);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(date);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/mockData.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bundles",
    ()=>bundles,
    "calculateGripperStickers",
    ()=>calculateGripperStickers,
    "calculateMargin",
    ()=>calculateMargin,
    "calculateOrderVolume",
    ()=>calculateOrderVolume,
    "calculateOrderWeight",
    ()=>calculateOrderWeight,
    "channelPerformance",
    ()=>channelPerformance,
    "checkLabelAvailability",
    ()=>checkLabelAvailability,
    "customers",
    ()=>customers,
    "dashboardStats",
    ()=>dashboardStats,
    "fbaShipments",
    ()=>fbaShipments,
    "fulfillmentPipeline",
    ()=>fulfillmentPipeline,
    "fulfillmentRules",
    ()=>fulfillmentRules,
    "getBoxById",
    ()=>getBoxById,
    "getBundleAvailability",
    ()=>getBundleAvailability,
    "getInventoryForLocation",
    ()=>getInventoryForLocation,
    "getInventoryForProduct",
    ()=>getInventoryForProduct,
    "getLinkedLabel",
    ()=>getLinkedLabel,
    "getLocationById",
    ()=>getLocationById,
    "getLowStockItems",
    ()=>getLowStockItems,
    "getProductById",
    ()=>getProductById,
    "getProductBySku",
    ()=>getProductBySku,
    "getRecentOrders",
    ()=>getRecentOrders,
    "getTotalQuantity",
    ()=>getTotalQuantity,
    "inventory",
    ()=>inventory,
    "inventoryValuation",
    ()=>inventoryValuation,
    "locations",
    ()=>locations,
    "orders",
    ()=>orders,
    "pickBatches",
    ()=>pickBatches,
    "products",
    ()=>products,
    "purchaseOrders",
    ()=>purchaseOrders,
    "shippingBoxes",
    ()=>shippingBoxes,
    "suggestBox",
    ()=>suggestBox,
    "suppliers",
    ()=>suppliers,
    "workOrders",
    ()=>workOrders
]);
// Re-export formatting utilities from lib for backwards compatibility
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/formatting.ts [app-client] (ecmascript)");
const locations = [
    {
        id: 'loc-1',
        name: 'Cronk Warehouse',
        type: 'warehouse',
        isActive: true
    },
    {
        id: 'loc-2',
        name: 'Amazon USA',
        type: 'fba',
        isActive: true
    },
    {
        id: 'loc-3',
        name: 'Amazon Canada',
        type: 'fba',
        isActive: true
    }
];
const suppliers = [
    {
        id: 'sup-1',
        name: 'HIGROCORP INC.',
        contactName: 'Manufacturing Team',
        email: 'orders@higrocorp.com',
        phone: '+1 604-555-0123',
        currency: 'CAD'
    },
    {
        id: 'sup-2',
        name: 'ULINE',
        contactName: 'Customer Service',
        email: 'orders@uline.com',
        phone: '+1 800-295-5510',
        currency: 'USD'
    }
];
const customers = [
    {
        id: 'cust-1',
        name: 'Sarah Johnson',
        email: 'sarah@email.com',
        phone: '713-555-0123',
        address: '123 Main Street',
        city: 'Houston',
        state: 'TX',
        zip: '77001',
        country: 'US',
        type: 'retail',
        totalOrders: 5,
        totalSpent: 289.50
    },
    {
        id: 'cust-2',
        name: 'Michael Chen',
        email: 'mchen@gmail.com',
        phone: '512-555-0456',
        address: '456 Oak Avenue',
        city: 'Austin',
        state: 'TX',
        zip: '78701',
        country: 'US',
        type: 'retail',
        totalOrders: 3,
        totalSpent: 145.75
    },
    {
        id: 'cust-3',
        name: 'Wholesale Gardens Inc',
        email: 'orders@wholesalegardens.com',
        phone: '713-555-0789',
        address: '1000 Industrial Blvd',
        city: 'Houston',
        state: 'TX',
        zip: '77002',
        country: 'US',
        type: 'wholesale',
        totalOrders: 24,
        totalSpent: 15420.00
    },
    {
        id: 'cust-4',
        name: 'Green Thumb Supplies',
        email: 'purchasing@greenthumb.com',
        phone: '214-555-0321',
        address: '500 Commerce St',
        city: 'Dallas',
        state: 'TX',
        zip: '75201',
        country: 'US',
        type: 'wholesale',
        totalOrders: 18,
        totalSpent: 12350.00
    },
    {
        id: 'cust-5',
        name: 'Emily Rodriguez',
        email: 'emily.r@outlook.com',
        phone: '469-555-0654',
        address: '789 Pine Road',
        city: 'Plano',
        state: 'TX',
        zip: '75024',
        country: 'US',
        type: 'retail',
        totalOrders: 2,
        totalSpent: 89.99
    },
    {
        id: 'cust-6',
        name: 'Urban Growers Co-op',
        email: 'orders@urbangrowers.org',
        phone: '512-555-0987',
        address: '250 Garden Way',
        city: 'Austin',
        state: 'TX',
        zip: '78702',
        country: 'US',
        type: 'wholesale',
        totalOrders: 12,
        totalSpent: 8750.00
    },
    {
        id: 'cust-7',
        name: 'James Wilson',
        email: 'jwilson@gmail.com',
        phone: '832-555-0147',
        address: '321 Elm Street',
        city: 'Sugar Land',
        state: 'TX',
        zip: '77478',
        country: 'US',
        type: 'retail',
        totalOrders: 8,
        totalSpent: 425.80
    },
    {
        id: 'cust-8',
        name: 'Hydro Haven LLC',
        email: 'orders@hydrohaven.com',
        phone: '281-555-0258',
        address: '750 Commerce Center',
        city: 'Katy',
        state: 'TX',
        zip: '77494',
        country: 'US',
        type: 'wholesale',
        totalOrders: 15,
        totalSpent: 9875.00
    }
];
const shippingBoxes = [
    {
        id: 'box-1',
        sku: 'S-4881',
        name: '4 x 4 x 6" Corrugated Box',
        dimensions: {
            length: 4,
            width: 4,
            height: 6
        },
        volume: 96,
        maxWeight: 32,
        cost: 0.38,
        isSmartBoxEligible: true,
        isActive: true
    },
    {
        id: 'box-2',
        sku: 'S-16727',
        name: '5 x 5 x 8" Corrugated Box',
        dimensions: {
            length: 5,
            width: 5,
            height: 8
        },
        volume: 200,
        maxWeight: 50,
        cost: 0.52,
        isSmartBoxEligible: true,
        isActive: true
    },
    {
        id: 'box-3',
        sku: 'S-4710',
        name: '12 x 6 x 8" Corrugated Box',
        dimensions: {
            length: 12,
            width: 6,
            height: 8
        },
        volume: 576,
        maxWeight: 120,
        cost: 0.89,
        isSmartBoxEligible: true,
        isActive: true
    },
    {
        id: 'box-4',
        sku: 'S-18343',
        name: '12 x 12 x 8" Lightweight Box',
        dimensions: {
            length: 12,
            width: 12,
            height: 8
        },
        volume: 1152,
        maxWeight: 200,
        cost: 1.15,
        isSmartBoxEligible: true,
        isActive: true
    },
    {
        id: 'box-5',
        sku: 'S-4884',
        name: '12 x 9 x 12" Corrugated Box',
        dimensions: {
            length: 12,
            width: 9,
            height: 12
        },
        volume: 1296,
        maxWeight: 250,
        cost: 1.45,
        isSmartBoxEligible: true,
        isActive: true
    }
];
const products = [
    // ===== CLASSIC LINE - 500mL =====
    {
        id: 'prod-mic-500',
        sku: 'CNMIC500ML',
        name: '500mL Micro 5-0-1',
        barcode: '628678692275',
        category: 'nutrient',
        size: '500mL',
        weight: 20,
        dimensions: {
            length: 4.13,
            width: 1.98,
            height: 5.90
        },
        volume: 48,
        prices: {
            msrp: 8.99,
            shopify: 8.99,
            amazon: 12.88,
            wholesale: 6.00,
            distributor: 5.00
        },
        costs: {
            base: 2.65,
            amazonPrep: 3.15,
            shopify: 2.85,
            labelCost: 0.12
        },
        reorderPoint: 100,
        casePackQty: 12,
        isActive: true,
        linkedLabels: {
            '500mL': 'label-mic-500',
            '1L': 'label-mic-1l',
            '4L': 'label-mic-4l'
        },
        defaultVendor: 'HIGROCORP INC.',
        createdAt: '2024-01-15',
        updatedAt: '2024-12-30'
    },
    {
        id: 'prod-gro-500',
        sku: 'CNGRO500ML',
        name: '500mL Grow 2-1-6',
        barcode: '628678692237',
        category: 'nutrient',
        size: '500mL',
        weight: 20,
        dimensions: {
            length: 4.13,
            width: 1.98,
            height: 5.90
        },
        volume: 48,
        prices: {
            msrp: 8.99,
            shopify: 8.99,
            amazon: 12.88,
            wholesale: 6.00,
            distributor: 5.00
        },
        costs: {
            base: 2.65,
            amazonPrep: 3.15,
            shopify: 2.85,
            labelCost: 0.12
        },
        reorderPoint: 100,
        casePackQty: 12,
        isActive: true,
        linkedLabels: {
            '500mL': 'label-gro-500',
            '1L': 'label-gro-1l',
            '4L': 'label-gro-4l'
        },
        defaultVendor: 'HIGROCORP INC.',
        createdAt: '2024-01-15',
        updatedAt: '2024-12-30'
    },
    {
        id: 'prod-blm-500',
        sku: 'CNBLM500ML',
        name: '500mL Bloom 0-5-3',
        barcode: '628678692312',
        category: 'nutrient',
        size: '500mL',
        weight: 20,
        dimensions: {
            length: 4.13,
            width: 1.98,
            height: 5.90
        },
        volume: 48,
        prices: {
            msrp: 8.99,
            shopify: 8.99,
            amazon: 12.88,
            wholesale: 6.00,
            distributor: 5.00
        },
        costs: {
            base: 2.65,
            amazonPrep: 3.15,
            shopify: 2.85,
            labelCost: 0.12
        },
        reorderPoint: 100,
        casePackQty: 12,
        isActive: true,
        linkedLabels: {
            '500mL': 'label-blm-500',
            '1L': 'label-blm-1l',
            '4L': 'label-blm-4l'
        },
        defaultVendor: 'HIGROCORP INC.',
        createdAt: '2024-01-15',
        updatedAt: '2024-12-30'
    },
    // ===== CLASSIC LINE - 1L =====
    {
        id: 'prod-mic-1l',
        sku: 'CNMIC1L',
        name: '1L Micro 5-0-1',
        barcode: '628678692282',
        category: 'nutrient',
        size: '1L',
        weight: 40,
        dimensions: {
            length: 5.25,
            width: 2.35,
            height: 7.42
        },
        volume: 92,
        prices: {
            msrp: 12.99,
            shopify: 12.99,
            amazon: 14.88,
            wholesale: 9.00,
            distributor: 7.50
        },
        costs: {
            base: 3.83,
            amazonPrep: 4.33,
            shopify: 4.03,
            labelCost: 0.15
        },
        reorderPoint: 100,
        casePackQty: 12,
        isActive: true,
        linkedLabels: {
            '500mL': 'label-mic-500',
            '1L': 'label-mic-1l',
            '4L': 'label-mic-4l'
        },
        defaultVendor: 'HIGROCORP INC.',
        createdAt: '2024-01-15',
        updatedAt: '2024-12-30'
    },
    {
        id: 'prod-gro-1l',
        sku: 'CNGRO1L',
        name: '1L Grow 2-1-6',
        barcode: '628678692244',
        category: 'nutrient',
        size: '1L',
        weight: 40,
        dimensions: {
            length: 5.25,
            width: 2.35,
            height: 7.42
        },
        volume: 92,
        prices: {
            msrp: 12.99,
            shopify: 12.99,
            amazon: 14.88,
            wholesale: 9.00,
            distributor: 7.50
        },
        costs: {
            base: 3.83,
            amazonPrep: 4.33,
            shopify: 4.03,
            labelCost: 0.15
        },
        reorderPoint: 100,
        casePackQty: 12,
        isActive: true,
        linkedLabels: {
            '500mL': 'label-gro-500',
            '1L': 'label-gro-1l',
            '4L': 'label-gro-4l'
        },
        defaultVendor: 'HIGROCORP INC.',
        createdAt: '2024-01-15',
        updatedAt: '2024-12-30'
    },
    {
        id: 'prod-blm-1l',
        sku: 'CNBLM1L',
        name: '1L Bloom 0-5-3',
        barcode: '628678692329',
        category: 'nutrient',
        size: '1L',
        weight: 40,
        dimensions: {
            length: 5.25,
            width: 2.35,
            height: 7.42
        },
        volume: 92,
        prices: {
            msrp: 12.99,
            shopify: 12.99,
            amazon: 14.88,
            wholesale: 9.00,
            distributor: 7.50
        },
        costs: {
            base: 3.83,
            amazonPrep: 4.33,
            shopify: 4.03,
            labelCost: 0.15
        },
        reorderPoint: 100,
        casePackQty: 12,
        isActive: true,
        linkedLabels: {
            '500mL': 'label-blm-500',
            '1L': 'label-blm-1l',
            '4L': 'label-blm-4l'
        },
        defaultVendor: 'HIGROCORP INC.',
        createdAt: '2024-01-15',
        updatedAt: '2024-12-30'
    },
    // ===== CLASSIC LINE - 4L =====
    {
        id: 'prod-mic-4l',
        sku: 'CNMIC4L',
        name: '4L Micro 5-0-1',
        barcode: '628678692299',
        category: 'nutrient',
        size: '4L',
        weight: 145,
        dimensions: {
            length: 7.08,
            width: 4.17,
            height: 11.90
        },
        volume: 351,
        prices: {
            msrp: 39.99,
            shopify: 39.99,
            amazon: 38.88,
            wholesale: 28.00,
            distributor: 24.00
        },
        costs: {
            base: 10.50,
            amazonPrep: 11.50,
            shopify: 11.00,
            labelCost: 0.25
        },
        reorderPoint: 50,
        casePackQty: 4,
        isActive: true,
        linkedLabels: {
            '500mL': 'label-mic-500',
            '1L': 'label-mic-1l',
            '4L': 'label-mic-4l'
        },
        defaultVendor: 'HIGROCORP INC.',
        createdAt: '2024-01-15',
        updatedAt: '2024-12-30'
    },
    {
        id: 'prod-gro-4l',
        sku: 'CNGRO4L',
        name: '4L Grow 2-1-6',
        barcode: '628678692350',
        category: 'nutrient',
        size: '4L',
        weight: 145,
        dimensions: {
            length: 7.08,
            width: 4.17,
            height: 11.90
        },
        volume: 351,
        prices: {
            msrp: 39.99,
            shopify: 39.99,
            amazon: 38.88,
            wholesale: 28.00,
            distributor: 24.00
        },
        costs: {
            base: 10.50,
            amazonPrep: 11.50,
            shopify: 11.00,
            labelCost: 0.25
        },
        reorderPoint: 50,
        casePackQty: 4,
        isActive: true,
        linkedLabels: {
            '500mL': 'label-gro-500',
            '1L': 'label-gro-1l',
            '4L': 'label-gro-4l'
        },
        defaultVendor: 'HIGROCORP INC.',
        createdAt: '2024-01-15',
        updatedAt: '2024-12-30'
    },
    {
        id: 'prod-blm-4l',
        sku: 'CNBLM4L',
        name: '4L Bloom 0-5-3',
        barcode: '628678692367',
        category: 'nutrient',
        size: '4L',
        weight: 145,
        dimensions: {
            length: 7.08,
            width: 4.17,
            height: 11.90
        },
        volume: 351,
        prices: {
            msrp: 39.99,
            shopify: 39.99,
            amazon: 38.88,
            wholesale: 28.00,
            distributor: 24.00
        },
        costs: {
            base: 10.50,
            amazonPrep: 11.50,
            shopify: 11.00,
            labelCost: 0.25
        },
        reorderPoint: 50,
        casePackQty: 4,
        isActive: true,
        linkedLabels: {
            '500mL': 'label-blm-500',
            '1L': 'label-blm-1l',
            '4L': 'label-blm-4l'
        },
        defaultVendor: 'HIGROCORP INC.',
        createdAt: '2024-01-15',
        updatedAt: '2024-12-30'
    },
    // ===== ADDITIVES =====
    {
        id: 'prod-cm-500',
        sku: 'CNCM500ML',
        name: '500mL CalMag 2-0-0',
        barcode: '628678692398',
        category: 'nutrient',
        size: '500mL',
        weight: 20,
        dimensions: {
            length: 4.13,
            width: 1.98,
            height: 5.90
        },
        volume: 48,
        prices: {
            msrp: 10.99,
            shopify: 10.99,
            amazon: 14.88,
            wholesale: 7.50,
            distributor: 6.00
        },
        costs: {
            base: 2.79,
            amazonPrep: 3.29,
            shopify: 2.99,
            labelCost: 0.12
        },
        reorderPoint: 100,
        casePackQty: 12,
        isActive: true,
        defaultVendor: 'HIGROCORP INC.',
        createdAt: '2024-01-15',
        updatedAt: '2024-12-30'
    },
    {
        id: 'prod-cm-1l',
        sku: 'CNCM1L',
        name: '1L CalMag 2-0-0',
        barcode: '628678692404',
        category: 'nutrient',
        size: '1L',
        weight: 40,
        dimensions: {
            length: 5.25,
            width: 2.35,
            height: 7.42
        },
        volume: 92,
        prices: {
            msrp: 16.99,
            shopify: 16.99,
            amazon: 19.88,
            wholesale: 12.00,
            distributor: 10.00
        },
        costs: {
            base: 4.15,
            amazonPrep: 4.65,
            shopify: 4.35,
            labelCost: 0.15
        },
        reorderPoint: 100,
        casePackQty: 12,
        isActive: true,
        defaultVendor: 'HIGROCORP INC.',
        createdAt: '2024-01-15',
        updatedAt: '2024-12-30'
    },
    {
        id: 'prod-bb-500',
        sku: 'CNBB500ML',
        name: '500mL Bud Booster 0-1-3',
        barcode: '628678692435',
        category: 'nutrient',
        size: '500mL',
        weight: 20,
        dimensions: {
            length: 4.13,
            width: 1.98,
            height: 5.90
        },
        volume: 48,
        prices: {
            msrp: 18.99,
            shopify: 18.99,
            amazon: 22.88,
            wholesale: 13.00,
            distributor: 11.00
        },
        costs: {
            base: 4.41,
            amazonPrep: 4.91,
            shopify: 4.61,
            labelCost: 0.12
        },
        reorderPoint: 75,
        casePackQty: 12,
        isActive: true,
        defaultVendor: 'HIGROCORP INC.',
        createdAt: '2024-01-15',
        updatedAt: '2024-12-30'
    },
    {
        id: 'prod-bb-1l',
        sku: 'CNBB1L',
        name: '1L Bud Booster 0-1-3',
        barcode: '628678692442',
        category: 'nutrient',
        size: '1L',
        weight: 40,
        dimensions: {
            length: 5.25,
            width: 2.35,
            height: 7.42
        },
        volume: 92,
        prices: {
            msrp: 29.99,
            shopify: 29.99,
            amazon: 34.88,
            wholesale: 21.00,
            distributor: 18.00
        },
        costs: {
            base: 7.35,
            amazonPrep: 7.85,
            shopify: 7.55,
            labelCost: 0.15
        },
        reorderPoint: 75,
        casePackQty: 12,
        isActive: true,
        defaultVendor: 'HIGROCORP INC.',
        createdAt: '2024-01-15',
        updatedAt: '2024-12-30'
    },
    {
        id: 'prod-mj-500',
        sku: 'CNMJ500ML',
        name: '500mL Monkey Juice',
        barcode: '628678692473',
        category: 'nutrient',
        size: '500mL',
        weight: 20,
        dimensions: {
            length: 4.13,
            width: 1.98,
            height: 5.90
        },
        volume: 48,
        prices: {
            msrp: 24.99,
            shopify: 24.99,
            amazon: 28.88,
            wholesale: 17.00,
            distributor: 14.50
        },
        costs: {
            base: 6.16,
            amazonPrep: 6.66,
            shopify: 6.36,
            labelCost: 0.12
        },
        reorderPoint: 50,
        casePackQty: 12,
        isActive: true,
        defaultVendor: 'HIGROCORP INC.',
        createdAt: '2024-01-15',
        updatedAt: '2024-12-30'
    },
    {
        id: 'prod-mj-1l',
        sku: 'CNMJ1L',
        name: '1L Monkey Juice',
        barcode: '628678692480',
        category: 'nutrient',
        size: '1L',
        weight: 40,
        dimensions: {
            length: 5.25,
            width: 2.35,
            height: 7.42
        },
        volume: 92,
        prices: {
            msrp: 39.99,
            shopify: 39.99,
            amazon: 44.88,
            wholesale: 28.00,
            distributor: 24.00
        },
        costs: {
            base: 10.25,
            amazonPrep: 10.75,
            shopify: 10.45,
            labelCost: 0.15
        },
        reorderPoint: 50,
        casePackQty: 12,
        isActive: true,
        defaultVendor: 'HIGROCORP INC.',
        createdAt: '2024-01-15',
        updatedAt: '2024-12-30'
    },
    {
        id: 'prod-ara-500',
        sku: 'CNARA500ML',
        name: '500mL Armadillo Armour',
        barcode: '628678692718',
        category: 'nutrient',
        size: '500mL',
        weight: 20,
        dimensions: {
            length: 4.13,
            width: 1.98,
            height: 5.90
        },
        volume: 48,
        prices: {
            msrp: 37.99,
            shopify: 37.99,
            amazon: 42.88,
            wholesale: 26.00,
            distributor: 22.00
        },
        costs: {
            base: 9.61,
            amazonPrep: 10.11,
            shopify: 9.81,
            labelCost: 0.12
        },
        reorderPoint: 30,
        casePackQty: 12,
        isActive: true,
        defaultVendor: 'HIGROCORP INC.',
        createdAt: '2024-01-15',
        updatedAt: '2024-12-30'
    },
    {
        id: 'prod-ara-1l',
        sku: 'CNARA1L',
        name: '1L Armadillo Armour',
        barcode: '628678692725',
        category: 'nutrient',
        size: '1L',
        weight: 40,
        dimensions: {
            length: 5.25,
            width: 2.35,
            height: 7.42
        },
        volume: 92,
        prices: {
            msrp: 59.99,
            shopify: 59.99,
            amazon: 64.88,
            wholesale: 42.00,
            distributor: 36.00
        },
        costs: {
            base: 16.02,
            amazonPrep: 16.52,
            shopify: 16.22,
            labelCost: 0.15
        },
        reorderPoint: 30,
        casePackQty: 12,
        isActive: true,
        defaultVendor: 'HIGROCORP INC.',
        createdAt: '2024-01-15',
        updatedAt: '2024-12-30'
    },
    {
        id: 'prod-sb-500',
        sku: 'CNSB500ML',
        name: '500mL Sticky Bandit',
        barcode: '628678692527',
        category: 'nutrient',
        size: '500mL',
        weight: 20,
        dimensions: {
            length: 4.13,
            width: 1.98,
            height: 5.90
        },
        volume: 48,
        prices: {
            msrp: 16.99,
            shopify: 16.99,
            amazon: 20.88,
            wholesale: 12.00,
            distributor: 10.00
        },
        costs: {
            base: 4.51,
            amazonPrep: 5.01,
            shopify: 4.71,
            labelCost: 0.12
        },
        reorderPoint: 50,
        casePackQty: 12,
        isActive: true,
        defaultVendor: 'HIGROCORP INC.',
        createdAt: '2024-01-15',
        updatedAt: '2024-12-30'
    },
    // ===== AUTOFLOWER LINE =====
    {
        id: 'prod-bon-500',
        sku: 'CNBON500ML',
        name: '500mL Bonnie Vegetation',
        barcode: '628678692558',
        category: 'nutrient',
        size: '500mL',
        weight: 20,
        dimensions: {
            length: 4.13,
            width: 1.98,
            height: 5.90
        },
        volume: 48,
        prices: {
            msrp: 14.99,
            shopify: 14.99,
            amazon: 18.88,
            wholesale: 10.00,
            distributor: 8.50
        },
        costs: {
            base: 3.85,
            amazonPrep: 4.35,
            shopify: 4.05,
            labelCost: 0.12
        },
        reorderPoint: 50,
        casePackQty: 12,
        isActive: true,
        defaultVendor: 'HIGROCORP INC.',
        createdAt: '2024-01-15',
        updatedAt: '2024-12-30'
    },
    {
        id: 'prod-cyd-500',
        sku: 'CNCYD500ML',
        name: '500mL Clyde Bloom',
        barcode: '628678692596',
        category: 'nutrient',
        size: '500mL',
        weight: 20,
        dimensions: {
            length: 4.13,
            width: 1.98,
            height: 5.90
        },
        volume: 48,
        prices: {
            msrp: 14.99,
            shopify: 14.99,
            amazon: 18.88,
            wholesale: 10.00,
            distributor: 8.50
        },
        costs: {
            base: 3.85,
            amazonPrep: 4.35,
            shopify: 4.05,
            labelCost: 0.12
        },
        reorderPoint: 50,
        casePackQty: 12,
        isActive: true,
        defaultVendor: 'HIGROCORP INC.',
        createdAt: '2024-01-15',
        updatedAt: '2024-12-30'
    },
    // ===== SHIPPING SUPPLIES =====
    {
        id: 'prod-gripper',
        sku: 'LAB010R',
        name: '1 1/4" x 6" Gripper Label',
        category: 'supply',
        dimensions: {
            length: 6,
            width: 1.25,
            height: 0.1
        },
        volume: 1,
        prices: {
            msrp: 0,
            shopify: 0,
            amazon: 0,
            wholesale: 0,
            distributor: 0
        },
        costs: {
            base: 0.085,
            amazonPrep: 0.085,
            shopify: 0.085
        },
        reorderPoint: 500,
        isActive: true,
        createdAt: '2024-03-01',
        updatedAt: '2024-12-30'
    },
    {
        id: 'prod-tape',
        sku: 'S-2350',
        name: 'Kraft Tape 3" x 375\'',
        category: 'supply',
        prices: {
            msrp: 0,
            shopify: 0,
            amazon: 0,
            wholesale: 0,
            distributor: 0
        },
        costs: {
            base: 8.95,
            amazonPrep: 8.95,
            shopify: 8.95
        },
        reorderPoint: 20,
        isActive: true,
        createdAt: '2024-03-01',
        updatedAt: '2024-12-30'
    },
    // ===== LABELS =====
    {
        id: 'label-mic-500',
        sku: 'LABEL-500ML-MICRO',
        name: 'Micro 500mL Label',
        category: 'label',
        labelSize: '500mL',
        labelForProduct: 'prod-mic-500',
        prices: {
            msrp: 0,
            shopify: 0,
            amazon: 0,
            wholesale: 0,
            distributor: 0
        },
        costs: {
            base: 0.12,
            amazonPrep: 0.12,
            shopify: 0.12
        },
        reorderPoint: 500,
        isActive: true,
        createdAt: '2024-03-01',
        updatedAt: '2024-12-30'
    },
    {
        id: 'label-mic-1l',
        sku: 'LABEL-1L-MICRO',
        name: 'Micro 1L Label',
        category: 'label',
        labelSize: '1L',
        labelForProduct: 'prod-mic-1l',
        prices: {
            msrp: 0,
            shopify: 0,
            amazon: 0,
            wholesale: 0,
            distributor: 0
        },
        costs: {
            base: 0.15,
            amazonPrep: 0.15,
            shopify: 0.15
        },
        reorderPoint: 500,
        isActive: true,
        createdAt: '2024-03-01',
        updatedAt: '2024-12-30'
    },
    {
        id: 'label-mic-4l',
        sku: 'LABEL-4L-MICRO',
        name: 'Micro 4L Label',
        category: 'label',
        labelSize: '4L',
        labelForProduct: 'prod-mic-4l',
        prices: {
            msrp: 0,
            shopify: 0,
            amazon: 0,
            wholesale: 0,
            distributor: 0
        },
        costs: {
            base: 0.25,
            amazonPrep: 0.25,
            shopify: 0.25
        },
        reorderPoint: 200,
        isActive: true,
        createdAt: '2024-03-01',
        updatedAt: '2024-12-30'
    },
    {
        id: 'label-gro-500',
        sku: 'LABEL-500ML-GROW',
        name: 'Grow 500mL Label',
        category: 'label',
        labelSize: '500mL',
        labelForProduct: 'prod-gro-500',
        prices: {
            msrp: 0,
            shopify: 0,
            amazon: 0,
            wholesale: 0,
            distributor: 0
        },
        costs: {
            base: 0.12,
            amazonPrep: 0.12,
            shopify: 0.12
        },
        reorderPoint: 500,
        isActive: true,
        createdAt: '2024-03-01',
        updatedAt: '2024-12-30'
    },
    {
        id: 'label-gro-1l',
        sku: 'LABEL-1L-GROW',
        name: 'Grow 1L Label',
        category: 'label',
        labelSize: '1L',
        labelForProduct: 'prod-gro-1l',
        prices: {
            msrp: 0,
            shopify: 0,
            amazon: 0,
            wholesale: 0,
            distributor: 0
        },
        costs: {
            base: 0.15,
            amazonPrep: 0.15,
            shopify: 0.15
        },
        reorderPoint: 500,
        isActive: true,
        createdAt: '2024-03-01',
        updatedAt: '2024-12-30'
    },
    {
        id: 'label-gro-4l',
        sku: 'LABEL-4L-GROW',
        name: 'Grow 4L Label',
        category: 'label',
        labelSize: '4L',
        labelForProduct: 'prod-gro-4l',
        prices: {
            msrp: 0,
            shopify: 0,
            amazon: 0,
            wholesale: 0,
            distributor: 0
        },
        costs: {
            base: 0.25,
            amazonPrep: 0.25,
            shopify: 0.25
        },
        reorderPoint: 200,
        isActive: true,
        createdAt: '2024-03-01',
        updatedAt: '2024-12-30'
    },
    {
        id: 'label-blm-500',
        sku: 'LABEL-500ML-BLOOM',
        name: 'Bloom 500mL Label',
        category: 'label',
        labelSize: '500mL',
        labelForProduct: 'prod-blm-500',
        prices: {
            msrp: 0,
            shopify: 0,
            amazon: 0,
            wholesale: 0,
            distributor: 0
        },
        costs: {
            base: 0.12,
            amazonPrep: 0.12,
            shopify: 0.12
        },
        reorderPoint: 500,
        isActive: true,
        createdAt: '2024-03-01',
        updatedAt: '2024-12-30'
    },
    {
        id: 'label-blm-1l',
        sku: 'LABEL-1L-BLOOM',
        name: 'Bloom 1L Label',
        category: 'label',
        labelSize: '1L',
        labelForProduct: 'prod-blm-1l',
        prices: {
            msrp: 0,
            shopify: 0,
            amazon: 0,
            wholesale: 0,
            distributor: 0
        },
        costs: {
            base: 0.15,
            amazonPrep: 0.15,
            shopify: 0.15
        },
        reorderPoint: 500,
        isActive: true,
        createdAt: '2024-03-01',
        updatedAt: '2024-12-30'
    },
    {
        id: 'label-blm-4l',
        sku: 'LABEL-4L-BLOOM',
        name: 'Bloom 4L Label',
        category: 'label',
        labelSize: '4L',
        labelForProduct: 'prod-blm-4l',
        prices: {
            msrp: 0,
            shopify: 0,
            amazon: 0,
            wholesale: 0,
            distributor: 0
        },
        costs: {
            base: 0.25,
            amazonPrep: 0.25,
            shopify: 0.25
        },
        reorderPoint: 200,
        isActive: true,
        createdAt: '2024-03-01',
        updatedAt: '2024-12-30'
    }
];
const inventory = [
    // Cronk Warehouse - Classic Line 500mL
    {
        id: 'inv-mic-500-cw',
        productId: 'prod-mic-500',
        locationId: 'loc-1',
        quantity: 234,
        binLocation: 'A1-01'
    },
    {
        id: 'inv-gro-500-cw',
        productId: 'prod-gro-500',
        locationId: 'loc-1',
        quantity: 256,
        binLocation: 'A1-02'
    },
    {
        id: 'inv-blm-500-cw',
        productId: 'prod-blm-500',
        locationId: 'loc-1',
        quantity: 198,
        binLocation: 'A1-03'
    },
    // Cronk Warehouse - Classic Line 1L
    {
        id: 'inv-mic-1l-cw',
        productId: 'prod-mic-1l',
        locationId: 'loc-1',
        quantity: 643,
        binLocation: 'A2-01'
    },
    {
        id: 'inv-gro-1l-cw',
        productId: 'prod-gro-1l',
        locationId: 'loc-1',
        quantity: 672,
        binLocation: 'A2-02'
    },
    {
        id: 'inv-blm-1l-cw',
        productId: 'prod-blm-1l',
        locationId: 'loc-1',
        quantity: 593,
        binLocation: 'A2-03'
    },
    // Cronk Warehouse - Classic Line 4L
    {
        id: 'inv-mic-4l-cw',
        productId: 'prod-mic-4l',
        locationId: 'loc-1',
        quantity: 89,
        binLocation: 'A3-01'
    },
    {
        id: 'inv-gro-4l-cw',
        productId: 'prod-gro-4l',
        locationId: 'loc-1',
        quantity: 76,
        binLocation: 'A3-02'
    },
    {
        id: 'inv-blm-4l-cw',
        productId: 'prod-blm-4l',
        locationId: 'loc-1',
        quantity: 82,
        binLocation: 'A3-03'
    },
    // Cronk Warehouse - Additives
    {
        id: 'inv-cm-500-cw',
        productId: 'prod-cm-500',
        locationId: 'loc-1',
        quantity: 312,
        binLocation: 'B1-01'
    },
    {
        id: 'inv-cm-1l-cw',
        productId: 'prod-cm-1l',
        locationId: 'loc-1',
        quantity: 939,
        binLocation: 'B1-02'
    },
    {
        id: 'inv-bb-500-cw',
        productId: 'prod-bb-500',
        locationId: 'loc-1',
        quantity: 145,
        binLocation: 'B2-01'
    },
    {
        id: 'inv-bb-1l-cw',
        productId: 'prod-bb-1l',
        locationId: 'loc-1',
        quantity: 893,
        binLocation: 'B2-02'
    },
    {
        id: 'inv-mj-500-cw',
        productId: 'prod-mj-500',
        locationId: 'loc-1',
        quantity: 178,
        binLocation: 'B3-01'
    },
    {
        id: 'inv-mj-1l-cw',
        productId: 'prod-mj-1l',
        locationId: 'loc-1',
        quantity: 688,
        binLocation: 'B3-02'
    },
    {
        id: 'inv-ara-500-cw',
        productId: 'prod-ara-500',
        locationId: 'loc-1',
        quantity: 67,
        binLocation: 'B4-01'
    },
    {
        id: 'inv-ara-1l-cw',
        productId: 'prod-ara-1l',
        locationId: 'loc-1',
        quantity: 45,
        binLocation: 'B4-02'
    },
    {
        id: 'inv-sb-500-cw',
        productId: 'prod-sb-500',
        locationId: 'loc-1',
        quantity: 234,
        binLocation: 'B5-01'
    },
    // Cronk Warehouse - Autoflower
    {
        id: 'inv-bon-500-cw',
        productId: 'prod-bon-500',
        locationId: 'loc-1',
        quantity: 156,
        binLocation: 'C1-01'
    },
    {
        id: 'inv-cyd-500-cw',
        productId: 'prod-cyd-500',
        locationId: 'loc-1',
        quantity: 143,
        binLocation: 'C1-02'
    },
    // Cronk Warehouse - Shipping Supplies
    {
        id: 'inv-gripper-cw',
        productId: 'prod-gripper',
        locationId: 'loc-1',
        quantity: 6179,
        binLocation: 'D1-01'
    },
    {
        id: 'inv-tape-cw',
        productId: 'prod-tape',
        locationId: 'loc-1',
        quantity: 45,
        binLocation: 'D1-02'
    },
    // Cronk Warehouse - Boxes
    {
        id: 'inv-box-1-cw',
        productId: 'box-1',
        locationId: 'loc-1',
        quantity: 120,
        binLocation: 'E1-01'
    },
    {
        id: 'inv-box-2-cw',
        productId: 'box-2',
        locationId: 'loc-1',
        quantity: 85,
        binLocation: 'E1-02'
    },
    {
        id: 'inv-box-3-cw',
        productId: 'box-3',
        locationId: 'loc-1',
        quantity: 90,
        binLocation: 'E1-03'
    },
    {
        id: 'inv-box-4-cw',
        productId: 'box-4',
        locationId: 'loc-1',
        quantity: 157,
        binLocation: 'E2-01'
    },
    {
        id: 'inv-box-5-cw',
        productId: 'box-5',
        locationId: 'loc-1',
        quantity: 236,
        binLocation: 'E2-02'
    },
    // Cronk Warehouse - Labels
    {
        id: 'inv-lbl-mic-1l-cw',
        productId: 'label-mic-1l',
        locationId: 'loc-1',
        quantity: 461,
        binLocation: 'F1-01',
        sublocation: 'Higrocorp'
    },
    {
        id: 'inv-lbl-gro-1l-cw',
        productId: 'label-gro-1l',
        locationId: 'loc-1',
        quantity: 461,
        binLocation: 'F1-02',
        sublocation: 'Higrocorp'
    },
    {
        id: 'inv-lbl-blm-1l-cw',
        productId: 'label-blm-1l',
        locationId: 'loc-1',
        quantity: 523,
        binLocation: 'F1-03',
        sublocation: 'Higrocorp'
    },
    // Amazon USA
    {
        id: 'inv-mic-1l-usa',
        productId: 'prod-mic-1l',
        locationId: 'loc-2',
        quantity: 156,
        binLocation: 'FBA'
    },
    {
        id: 'inv-gro-1l-usa',
        productId: 'prod-gro-1l',
        locationId: 'loc-2',
        quantity: 178,
        binLocation: 'FBA'
    },
    {
        id: 'inv-blm-1l-usa',
        productId: 'prod-blm-1l',
        locationId: 'loc-2',
        quantity: 145,
        binLocation: 'FBA'
    },
    {
        id: 'inv-cm-1l-usa',
        productId: 'prod-cm-1l',
        locationId: 'loc-2',
        quantity: 89,
        binLocation: 'FBA'
    },
    {
        id: 'inv-bb-1l-usa',
        productId: 'prod-bb-1l',
        locationId: 'loc-2',
        quantity: 67,
        binLocation: 'FBA'
    },
    {
        id: 'inv-mj-1l-usa',
        productId: 'prod-mj-1l',
        locationId: 'loc-2',
        quantity: 45,
        binLocation: 'FBA'
    },
    {
        id: 'inv-ara-1l-usa',
        productId: 'prod-ara-1l',
        locationId: 'loc-2',
        quantity: 8,
        binLocation: 'FBA'
    },
    // Amazon Canada
    {
        id: 'inv-mic-1l-ca',
        productId: 'prod-mic-1l',
        locationId: 'loc-3',
        quantity: 34,
        binLocation: 'FBA-CA'
    },
    {
        id: 'inv-gro-1l-ca',
        productId: 'prod-gro-1l',
        locationId: 'loc-3',
        quantity: 28,
        binLocation: 'FBA-CA'
    },
    {
        id: 'inv-blm-1l-ca',
        productId: 'prod-blm-1l',
        locationId: 'loc-3',
        quantity: 31,
        binLocation: 'FBA-CA'
    }
];
const bundles = [
    {
        id: 'bundle-1',
        sku: 'CNKIT-STARTER',
        name: 'Starter Kit',
        type: 'virtual',
        description: '3-Part Starter Kit with Micro, Grow, and Bloom 1L',
        components: [
            {
                productId: 'prod-mic-1l',
                productName: '1L Micro 5-0-1',
                quantity: 1
            },
            {
                productId: 'prod-gro-1l',
                productName: '1L Grow 2-1-6',
                quantity: 1
            },
            {
                productId: 'prod-blm-1l',
                productName: '1L Bloom 0-5-4',
                quantity: 1
            }
        ],
        prices: {
            msrp: 34.99,
            shopify: 32.99,
            amazon: 39.99,
            wholesale: 24.00,
            distributor: 20.00
        },
        compareAtPrices: {
            msrp: 41.97,
            shopify: 41.97,
            amazon: 44.97
        },
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
    },
    {
        id: 'bundle-2',
        sku: 'CNKIT-PRO',
        name: 'Pro Bundle',
        type: 'virtual',
        description: 'Professional Kit with 3-Part + CalMag + Bud Booster',
        components: [
            {
                productId: 'prod-mic-1l',
                productName: '1L Micro 5-0-1',
                quantity: 1
            },
            {
                productId: 'prod-gro-1l',
                productName: '1L Grow 2-1-6',
                quantity: 1
            },
            {
                productId: 'prod-blm-1l',
                productName: '1L Bloom 0-5-4',
                quantity: 1
            },
            {
                productId: 'prod-cm-1l',
                productName: '1L CalMag 2-0-0',
                quantity: 1
            },
            {
                productId: 'prod-bb-1l',
                productName: '1L Bud Booster 0-1-3',
                quantity: 1
            }
        ],
        prices: {
            msrp: 79.99,
            shopify: 74.99,
            amazon: 84.99,
            wholesale: 56.00,
            distributor: 48.00
        },
        compareAtPrices: {
            msrp: 97.95,
            shopify: 97.95,
            amazon: 104.95
        },
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
    },
    {
        id: 'bundle-3',
        sku: 'CNKIT-COMPLETE',
        name: 'Complete System',
        type: 'virtual',
        description: 'Full nutrient line including all additives',
        components: [
            {
                productId: 'prod-mic-1l',
                productName: '1L Micro 5-0-1',
                quantity: 1
            },
            {
                productId: 'prod-gro-1l',
                productName: '1L Grow 2-1-6',
                quantity: 1
            },
            {
                productId: 'prod-blm-1l',
                productName: '1L Bloom 0-5-4',
                quantity: 1
            },
            {
                productId: 'prod-cm-1l',
                productName: '1L CalMag 2-0-0',
                quantity: 1
            },
            {
                productId: 'prod-bb-1l',
                productName: '1L Bud Booster 0-1-3',
                quantity: 1
            },
            {
                productId: 'prod-mj-1l',
                productName: '1L Monster Juice',
                quantity: 1
            }
        ],
        prices: {
            msrp: 119.99,
            shopify: 109.99,
            amazon: 124.99,
            wholesale: 84.00,
            distributor: 72.00
        },
        compareAtPrices: {
            msrp: 143.94,
            shopify: 143.94,
            amazon: 149.94
        },
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
    }
];
function calculateGripperStickers(items) {
    return items.reduce((sum, item)=>sum + item.quantity, 0); // 1 sticker per bottle
}
function calculateOrderVolume(items) {
    return items.reduce((sum, item)=>{
        if (!item.productId) return sum;
        const product = getProductById(item.productId);
        if (!product?.volume) return sum;
        return sum + product.volume * item.quantity;
    }, 0);
}
function calculateOrderWeight(items) {
    return items.reduce((sum, item)=>{
        if (!item.productId) return sum;
        const product = getProductById(item.productId);
        if (!product?.weight) return sum;
        return sum + product.weight * item.quantity;
    }, 0);
}
function suggestBox(totalVolume, totalWeight, buffer = 1.2) {
    const eligibleBoxes = shippingBoxes.filter((box)=>box.isSmartBoxEligible && box.isActive).sort((a, b)=>a.volume - b.volume);
    const volumeNeeded = totalVolume * buffer; // Add buffer
    for (const box of eligibleBoxes){
        if (box.volume >= volumeNeeded && box.maxWeight >= totalWeight) {
            return box;
        }
    }
    return null; // No box fits
}
// Helper function to get dates relative to today (preserves local timezone)
function getRelativeDate(daysAgo, hoursAgo = 0) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    // Set to a specific hour to ensure consistent behavior across timezones
    // Use noon (12:00) minus hoursAgo to keep orders within the day
    const hour = Math.max(8, Math.min(20, 12 - hoursAgo));
    date.setHours(hour, 0, 0, 0);
    // Return ISO string - the Date comparison in DateRangeContext will handle this correctly
    // because both the order date and the range dates are created in local time context
    return date.toISOString();
}
// Order templates for generating dynamic orders
const orderTemplates = [
    // TODAY - 3 orders (active orders)
    {
        id: 'order-1',
        orderNumber: 'SH-4521',
        externalId: 'SHP-5892341',
        channel: 'shopify',
        status: 'to_pick',
        customer: {
            name: 'Sarah Johnson',
            email: 'sarah.j@email.com',
            phone: '+1 555-0123'
        },
        items: [
            {
                id: 'oi-1',
                productId: 'prod-mic-1l',
                sku: 'CNMIC1L',
                name: '1L Micro 5-0-1',
                quantity: 1,
                price: 12.99,
                cost: 4.03
            },
            {
                id: 'oi-2',
                productId: 'prod-gro-1l',
                sku: 'CNGRO1L',
                name: '1L Grow 2-1-6',
                quantity: 1,
                price: 12.99,
                cost: 4.03
            },
            {
                id: 'oi-3',
                productId: 'prod-blm-1l',
                sku: 'CNBLM1L',
                name: '1L Bloom 0-5-3',
                quantity: 1,
                price: 12.99,
                cost: 4.03
            }
        ],
        subtotal: 38.97,
        shipping: 8.99,
        tax: 3.22,
        total: 51.18,
        cogs: 12.09,
        profit: 26.88,
        marginPercent: 52.5,
        shippingAddress: {
            line1: '123 Main St',
            city: 'Houston',
            state: 'TX',
            postalCode: '77001',
            country: 'US'
        },
        shipments: [],
        totalVolume: 276,
        totalWeight: 120,
        gripperStickersNeeded: 3,
        suggestedBoxId: 'box-3',
        daysAgo: 0,
        hoursAgo: 2
    },
    {
        id: 'order-2',
        orderNumber: 'AZ-8834',
        externalId: 'AMZ-114-2938475',
        channel: 'amazon_fbm',
        status: 'to_pick',
        customer: {
            name: 'Mike Chen',
            email: 'mchen@email.com'
        },
        items: [
            {
                id: 'oi-4',
                productId: 'prod-bb-500',
                sku: 'CNBB500ML',
                name: '500mL Bud Booster 0-1-3',
                quantity: 1,
                price: 22.88,
                cost: 4.91
            }
        ],
        subtotal: 22.88,
        shipping: 0,
        tax: 1.89,
        total: 24.77,
        cogs: 4.91,
        profit: 17.97,
        marginPercent: 72.5,
        shippingAddress: {
            line1: '456 Oak Ave',
            city: 'Los Angeles',
            state: 'CA',
            postalCode: '90001',
            country: 'US'
        },
        shipments: [],
        totalVolume: 48,
        totalWeight: 20,
        gripperStickersNeeded: 1,
        suggestedBoxId: 'box-1',
        daysAgo: 0,
        hoursAgo: 4
    },
    {
        id: 'order-3',
        orderNumber: 'SH-4520',
        externalId: 'SHP-5892340',
        channel: 'shopify',
        status: 'to_pack',
        customer: {
            name: 'Emily Rodriguez',
            email: 'emily.r@email.com'
        },
        items: [
            {
                id: 'oi-5',
                bundleId: 'bundle-2',
                sku: 'CNKIT-PRO',
                name: 'Pro Bundle',
                quantity: 1,
                price: 74.99,
                cost: 23.96
            }
        ],
        subtotal: 74.99,
        shipping: 12.99,
        tax: 6.19,
        total: 94.17,
        cogs: 23.96,
        profit: 57.22,
        marginPercent: 60.8,
        shippingAddress: {
            line1: '789 Pine Rd',
            city: 'Miami',
            state: 'FL',
            postalCode: '33101',
            country: 'US'
        },
        shipments: [],
        totalVolume: 460,
        totalWeight: 200,
        gripperStickersNeeded: 5,
        suggestedBoxId: 'box-4',
        daysAgo: 0,
        hoursAgo: 6
    },
    // YESTERDAY - 4 orders (shipped/completed)
    {
        id: 'order-4',
        orderNumber: 'SH-4519',
        externalId: 'SHP-5892339',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'David Park',
            email: 'dpark@email.com'
        },
        items: [
            {
                id: 'oi-6',
                productId: 'prod-mic-500',
                sku: 'CNMIC500ML',
                name: '500mL Micro 5-0-1',
                quantity: 1,
                price: 8.99,
                cost: 2.85
            },
            {
                id: 'oi-7',
                productId: 'prod-gro-500',
                sku: 'CNGRO500ML',
                name: '500mL Grow 2-1-6',
                quantity: 1,
                price: 8.99,
                cost: 2.85
            }
        ],
        subtotal: 17.98,
        shipping: 6.99,
        tax: 1.48,
        total: 26.45,
        cogs: 5.70,
        profit: 13.76,
        marginPercent: 52.0,
        shippingAddress: {
            line1: '321 Elm St',
            city: 'Seattle',
            state: 'WA',
            postalCode: '98101',
            country: 'US'
        },
        shipments: [
            {
                id: 'ship-1',
                orderId: 'order-4',
                shipmentNumber: 1,
                boxId: 'box-2',
                items: [
                    {
                        orderItemId: 'oi-6',
                        productId: 'prod-mic-500',
                        quantity: 1
                    },
                    {
                        orderItemId: 'oi-7',
                        productId: 'prod-gro-500',
                        quantity: 1
                    }
                ],
                status: 'shipped',
                trackingNumber: '1Z999AA10123456780',
                carrier: 'UPS',
                gripperStickersUsed: 2
            }
        ],
        totalVolume: 96,
        totalWeight: 40,
        gripperStickersNeeded: 2,
        suggestedBoxId: 'box-2',
        daysAgo: 1,
        hoursAgo: 3
    },
    {
        id: 'order-5',
        orderNumber: 'AZ-8833',
        externalId: 'AMZ-114-2938472',
        channel: 'amazon_fba',
        status: 'shipped',
        customer: {
            name: 'Lisa Thompson',
            email: 'lthompson@email.com'
        },
        items: [
            {
                id: 'oi-8',
                productId: 'prod-cm-1l',
                sku: 'CNCM1L',
                name: '1L CalMag 2-0-0',
                quantity: 2,
                price: 19.88,
                cost: 4.65
            },
            {
                id: 'oi-9',
                productId: 'prod-bb-1l',
                sku: 'CNBB1L',
                name: '1L Bud Booster 0-1-3',
                quantity: 2,
                price: 34.88,
                cost: 7.85
            }
        ],
        subtotal: 109.52,
        shipping: 0,
        tax: 9.04,
        total: 118.56,
        cogs: 25.00,
        profit: 84.52,
        marginPercent: 71.3,
        shippingAddress: {
            line1: '555 Maple Dr',
            city: 'Denver',
            state: 'CO',
            postalCode: '80201',
            country: 'US'
        },
        shipments: [
            {
                id: 'ship-2',
                orderId: 'order-5',
                shipmentNumber: 1,
                boxId: 'box-3',
                items: [
                    {
                        orderItemId: 'oi-8',
                        productId: 'prod-cm-1l',
                        quantity: 2
                    },
                    {
                        orderItemId: 'oi-9',
                        productId: 'prod-bb-1l',
                        quantity: 2
                    }
                ],
                trackingNumber: '1Z999AA10123456784',
                carrier: 'UPS',
                status: 'shipped',
                gripperStickersUsed: 4
            }
        ],
        totalVolume: 368,
        totalWeight: 160,
        gripperStickersNeeded: 4,
        daysAgo: 1,
        hoursAgo: 8
    },
    {
        id: 'order-6',
        orderNumber: 'SH-4518',
        externalId: 'SHP-5892338',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'Jennifer Adams',
            email: 'jadams@email.com'
        },
        items: [
            {
                id: 'oi-10',
                productId: 'prod-mj-1l',
                sku: 'CNMJ1L',
                name: '1L Monkey Juice',
                quantity: 2,
                price: 39.99,
                cost: 10.45
            }
        ],
        subtotal: 79.98,
        shipping: 9.99,
        tax: 6.60,
        total: 96.57,
        cogs: 20.90,
        profit: 59.08,
        marginPercent: 61.2,
        shippingAddress: {
            line1: '789 Oak Blvd',
            city: 'Chicago',
            state: 'IL',
            postalCode: '60601',
            country: 'US'
        },
        shipments: [],
        totalVolume: 184,
        totalWeight: 80,
        gripperStickersNeeded: 2,
        daysAgo: 1,
        hoursAgo: 12
    },
    {
        id: 'order-7',
        orderNumber: 'AZ-8832',
        externalId: 'AMZ-114-2938471',
        channel: 'amazon_fbm',
        status: 'shipped',
        customer: {
            name: 'Robert Kim',
            email: 'rkim@email.com'
        },
        items: [
            {
                id: 'oi-11',
                productId: 'prod-ara-500',
                sku: 'CNARA500ML',
                name: '500mL Armadillo Armour',
                quantity: 1,
                price: 42.88,
                cost: 10.11
            }
        ],
        subtotal: 42.88,
        shipping: 0,
        tax: 3.54,
        total: 46.42,
        cogs: 10.11,
        profit: 32.77,
        marginPercent: 70.6,
        shippingAddress: {
            line1: '456 Pine Ave',
            city: 'Phoenix',
            state: 'AZ',
            postalCode: '85001',
            country: 'US'
        },
        shipments: [],
        totalVolume: 48,
        totalWeight: 20,
        gripperStickersNeeded: 1,
        daysAgo: 1,
        hoursAgo: 16
    },
    // THIS WEEK (2-5 days ago) - 5 orders
    {
        id: 'order-8',
        orderNumber: 'SH-4517',
        externalId: 'SHP-5892337',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'Amanda White',
            email: 'awhite@email.com'
        },
        items: [
            {
                id: 'oi-12',
                productId: 'prod-mic-4l',
                sku: 'CNMIC4L',
                name: '4L Micro 5-0-1',
                quantity: 1,
                price: 39.99,
                cost: 11.00
            },
            {
                id: 'oi-13',
                productId: 'prod-gro-4l',
                sku: 'CNGRO4L',
                name: '4L Grow 2-1-6',
                quantity: 1,
                price: 39.99,
                cost: 11.00
            }
        ],
        subtotal: 79.98,
        shipping: 14.99,
        tax: 6.60,
        total: 101.57,
        cogs: 22.00,
        profit: 57.98,
        marginPercent: 57.1,
        shippingAddress: {
            line1: '123 Cedar Ln',
            city: 'Portland',
            state: 'OR',
            postalCode: '97201',
            country: 'US'
        },
        shipments: [],
        totalVolume: 702,
        totalWeight: 290,
        gripperStickersNeeded: 2,
        daysAgo: 2,
        hoursAgo: 5
    },
    {
        id: 'order-9',
        orderNumber: 'AZ-8831',
        externalId: 'AMZ-114-2938470',
        channel: 'amazon_fba',
        status: 'shipped',
        customer: {
            name: 'Chris Martinez',
            email: 'cmartinez@email.com'
        },
        items: [
            {
                id: 'oi-14',
                bundleId: 'bundle-1',
                sku: 'CNKIT-STARTER',
                name: 'Starter Kit',
                quantity: 2,
                price: 32.99,
                cost: 12.09
            }
        ],
        subtotal: 65.98,
        shipping: 0,
        tax: 5.44,
        total: 71.42,
        cogs: 24.18,
        profit: 41.80,
        marginPercent: 58.5,
        shippingAddress: {
            line1: '789 Birch St',
            city: 'Austin',
            state: 'TX',
            postalCode: '78701',
            country: 'US'
        },
        shipments: [],
        totalVolume: 552,
        totalWeight: 240,
        gripperStickersNeeded: 6,
        daysAgo: 3,
        hoursAgo: 2
    },
    {
        id: 'order-10',
        orderNumber: 'SH-4516',
        externalId: 'SHP-5892336',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'Nicole Brown',
            email: 'nbrown@email.com'
        },
        items: [
            {
                id: 'oi-15',
                productId: 'prod-sb-500',
                sku: 'CNSB500ML',
                name: '500mL Sticky Bandit',
                quantity: 3,
                price: 16.99,
                cost: 4.71
            }
        ],
        subtotal: 50.97,
        shipping: 8.99,
        tax: 4.21,
        total: 64.17,
        cogs: 14.13,
        profit: 36.84,
        marginPercent: 57.4,
        shippingAddress: {
            line1: '321 Maple Dr',
            city: 'San Diego',
            state: 'CA',
            postalCode: '92101',
            country: 'US'
        },
        shipments: [],
        totalVolume: 144,
        totalWeight: 60,
        gripperStickersNeeded: 3,
        daysAgo: 3,
        hoursAgo: 10
    },
    {
        id: 'order-11',
        orderNumber: 'SH-4515',
        externalId: 'SHP-5892335',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'Tyler Green',
            email: 'tgreen@email.com'
        },
        items: [
            {
                id: 'oi-16',
                productId: 'prod-bon-500',
                sku: 'CNBON500ML',
                name: '500mL Bonnie Vegetation',
                quantity: 2,
                price: 14.99,
                cost: 4.05
            },
            {
                id: 'oi-17',
                productId: 'prod-cyd-500',
                sku: 'CNCYD500ML',
                name: '500mL Clyde Bloom',
                quantity: 2,
                price: 14.99,
                cost: 4.05
            }
        ],
        subtotal: 59.96,
        shipping: 7.99,
        tax: 4.95,
        total: 72.90,
        cogs: 16.20,
        profit: 43.76,
        marginPercent: 60.0,
        shippingAddress: {
            line1: '555 Willow Way',
            city: 'Nashville',
            state: 'TN',
            postalCode: '37201',
            country: 'US'
        },
        shipments: [],
        totalVolume: 192,
        totalWeight: 80,
        gripperStickersNeeded: 4,
        daysAgo: 4,
        hoursAgo: 7
    },
    {
        id: 'order-12',
        orderNumber: 'AZ-8830',
        externalId: 'AMZ-114-2938469',
        channel: 'amazon_fbm',
        status: 'shipped',
        customer: {
            name: 'Rachel Lee',
            email: 'rlee@email.com'
        },
        items: [
            {
                id: 'oi-18',
                productId: 'prod-cm-500',
                sku: 'CNCM500ML',
                name: '500mL CalMag 2-0-0',
                quantity: 2,
                price: 14.88,
                cost: 3.29
            }
        ],
        subtotal: 29.76,
        shipping: 0,
        tax: 2.46,
        total: 32.22,
        cogs: 6.58,
        profit: 23.18,
        marginPercent: 71.9,
        shippingAddress: {
            line1: '888 River Rd',
            city: 'Philadelphia',
            state: 'PA',
            postalCode: '19101',
            country: 'US'
        },
        shipments: [],
        totalVolume: 96,
        totalWeight: 40,
        gripperStickersNeeded: 2,
        daysAgo: 5,
        hoursAgo: 3
    },
    // LAST WEEK (6-12 days ago) - 6 orders
    {
        id: 'order-13',
        orderNumber: 'SH-4514',
        externalId: 'SHP-5892334',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'Brandon Hall',
            email: 'bhall@email.com'
        },
        items: [
            {
                id: 'oi-19',
                bundleId: 'bundle-3',
                sku: 'CNKIT-COMPLETE',
                name: 'Complete System',
                quantity: 1,
                price: 109.99,
                cost: 35.55
            }
        ],
        subtotal: 109.99,
        shipping: 15.99,
        tax: 9.08,
        total: 135.06,
        cogs: 35.55,
        profit: 74.44,
        marginPercent: 55.1,
        shippingAddress: {
            line1: '222 Summit Ave',
            city: 'Minneapolis',
            state: 'MN',
            postalCode: '55401',
            country: 'US'
        },
        shipments: [],
        totalVolume: 552,
        totalWeight: 240,
        gripperStickersNeeded: 6,
        daysAgo: 7,
        hoursAgo: 4
    },
    {
        id: 'order-14',
        orderNumber: 'AZ-8829',
        externalId: 'AMZ-114-2938468',
        channel: 'amazon_fba',
        status: 'shipped',
        customer: {
            name: 'Samantha Clark',
            email: 'sclark@email.com'
        },
        items: [
            {
                id: 'oi-20',
                productId: 'prod-mic-1l',
                sku: 'CNMIC1L',
                name: '1L Micro 5-0-1',
                quantity: 3,
                price: 14.88,
                cost: 4.33
            }
        ],
        subtotal: 44.64,
        shipping: 0,
        tax: 3.68,
        total: 48.32,
        cogs: 12.99,
        profit: 31.65,
        marginPercent: 65.5,
        shippingAddress: {
            line1: '777 Lake Shore Dr',
            city: 'Cleveland',
            state: 'OH',
            postalCode: '44101',
            country: 'US'
        },
        shipments: [],
        totalVolume: 276,
        totalWeight: 120,
        gripperStickersNeeded: 3,
        daysAgo: 8,
        hoursAgo: 6
    },
    {
        id: 'order-15',
        orderNumber: 'SH-4513',
        externalId: 'SHP-5892333',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'Kevin Wright',
            email: 'kwright@email.com'
        },
        items: [
            {
                id: 'oi-21',
                productId: 'prod-blm-4l',
                sku: 'CNBLM4L',
                name: '4L Bloom 0-5-3',
                quantity: 2,
                price: 39.99,
                cost: 11.00
            }
        ],
        subtotal: 79.98,
        shipping: 16.99,
        tax: 6.60,
        total: 103.57,
        cogs: 22.00,
        profit: 57.98,
        marginPercent: 56.0,
        shippingAddress: {
            line1: '333 Harbor View',
            city: 'San Francisco',
            state: 'CA',
            postalCode: '94102',
            country: 'US'
        },
        shipments: [],
        totalVolume: 702,
        totalWeight: 290,
        gripperStickersNeeded: 2,
        daysAgo: 9,
        hoursAgo: 2
    },
    {
        id: 'order-16',
        orderNumber: 'SH-4512',
        externalId: 'SHP-5892332',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'Jessica Moore',
            email: 'jmoore@email.com'
        },
        items: [
            {
                id: 'oi-22',
                productId: 'prod-ara-1l',
                sku: 'CNARA1L',
                name: '1L Armadillo Armour',
                quantity: 1,
                price: 59.99,
                cost: 16.22
            }
        ],
        subtotal: 59.99,
        shipping: 9.99,
        tax: 4.95,
        total: 74.93,
        cogs: 16.22,
        profit: 43.77,
        marginPercent: 58.4,
        shippingAddress: {
            line1: '444 Mountain View',
            city: 'Salt Lake City',
            state: 'UT',
            postalCode: '84101',
            country: 'US'
        },
        shipments: [],
        totalVolume: 92,
        totalWeight: 40,
        gripperStickersNeeded: 1,
        daysAgo: 10,
        hoursAgo: 8
    },
    {
        id: 'order-17',
        orderNumber: 'AZ-8828',
        externalId: 'AMZ-114-2938467',
        channel: 'amazon_fbm',
        status: 'shipped',
        customer: {
            name: 'Daniel Taylor',
            email: 'dtaylor@email.com'
        },
        items: [
            {
                id: 'oi-23',
                productId: 'prod-gro-1l',
                sku: 'CNGRO1L',
                name: '1L Grow 2-1-6',
                quantity: 4,
                price: 14.88,
                cost: 4.33
            }
        ],
        subtotal: 59.52,
        shipping: 0,
        tax: 4.91,
        total: 64.43,
        cogs: 17.32,
        profit: 42.20,
        marginPercent: 65.5,
        shippingAddress: {
            line1: '555 Beach Blvd',
            city: 'Miami Beach',
            state: 'FL',
            postalCode: '33139',
            country: 'US'
        },
        shipments: [],
        totalVolume: 368,
        totalWeight: 160,
        gripperStickersNeeded: 4,
        daysAgo: 11,
        hoursAgo: 5
    },
    {
        id: 'order-18',
        orderNumber: 'SH-4511',
        externalId: 'SHP-5892331',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'Lauren Davis',
            email: 'ldavis@email.com'
        },
        items: [
            {
                id: 'oi-24',
                bundleId: 'bundle-2',
                sku: 'CNKIT-PRO',
                name: 'Pro Bundle',
                quantity: 2,
                price: 74.99,
                cost: 23.96
            }
        ],
        subtotal: 149.98,
        shipping: 18.99,
        tax: 12.37,
        total: 181.34,
        cogs: 47.92,
        profit: 102.06,
        marginPercent: 56.3,
        shippingAddress: {
            line1: '666 Valley Dr',
            city: 'Las Vegas',
            state: 'NV',
            postalCode: '89101',
            country: 'US'
        },
        shipments: [],
        totalVolume: 920,
        totalWeight: 400,
        gripperStickersNeeded: 10,
        daysAgo: 12,
        hoursAgo: 3
    },
    // THIS MONTH (13-28 days ago) - 8 orders
    {
        id: 'order-19',
        orderNumber: 'SH-4510',
        externalId: 'SHP-5892330',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'Matthew Wilson',
            email: 'mwilson@email.com'
        },
        items: [
            {
                id: 'oi-25',
                productId: 'prod-mic-500',
                sku: 'CNMIC500ML',
                name: '500mL Micro 5-0-1',
                quantity: 6,
                price: 8.99,
                cost: 2.85
            }
        ],
        subtotal: 53.94,
        shipping: 9.99,
        tax: 4.45,
        total: 68.38,
        cogs: 17.10,
        profit: 36.84,
        marginPercent: 53.9,
        shippingAddress: {
            line1: '777 Hill St',
            city: 'Atlanta',
            state: 'GA',
            postalCode: '30301',
            country: 'US'
        },
        shipments: [],
        totalVolume: 288,
        totalWeight: 120,
        gripperStickersNeeded: 6,
        daysAgo: 15,
        hoursAgo: 4
    },
    {
        id: 'order-20',
        orderNumber: 'AZ-8827',
        externalId: 'AMZ-114-2938466',
        channel: 'amazon_fba',
        status: 'shipped',
        customer: {
            name: 'Ashley Miller',
            email: 'amiller@email.com'
        },
        items: [
            {
                id: 'oi-26',
                productId: 'prod-bb-1l',
                sku: 'CNBB1L',
                name: '1L Bud Booster 0-1-3',
                quantity: 3,
                price: 34.88,
                cost: 7.85
            }
        ],
        subtotal: 104.64,
        shipping: 0,
        tax: 8.63,
        total: 113.27,
        cogs: 23.55,
        profit: 81.09,
        marginPercent: 71.6,
        shippingAddress: {
            line1: '888 Park Ave',
            city: 'New York',
            state: 'NY',
            postalCode: '10001',
            country: 'US'
        },
        shipments: [],
        totalVolume: 276,
        totalWeight: 120,
        gripperStickersNeeded: 3,
        daysAgo: 17,
        hoursAgo: 7
    },
    {
        id: 'order-21',
        orderNumber: 'SH-4509',
        externalId: 'SHP-5892329',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'Andrew Thompson',
            email: 'athompson@email.com'
        },
        items: [
            {
                id: 'oi-27',
                productId: 'prod-mj-500',
                sku: 'CNMJ500ML',
                name: '500mL Monkey Juice',
                quantity: 4,
                price: 24.99,
                cost: 6.36
            }
        ],
        subtotal: 99.96,
        shipping: 11.99,
        tax: 8.25,
        total: 120.20,
        cogs: 25.44,
        profit: 74.52,
        marginPercent: 62.0,
        shippingAddress: {
            line1: '999 Main St',
            city: 'Boston',
            state: 'MA',
            postalCode: '02101',
            country: 'US'
        },
        shipments: [],
        totalVolume: 192,
        totalWeight: 80,
        gripperStickersNeeded: 4,
        daysAgo: 19,
        hoursAgo: 2
    },
    {
        id: 'order-22',
        orderNumber: 'SH-4508',
        externalId: 'SHP-5892328',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'Megan Anderson',
            email: 'manderson@email.com'
        },
        items: [
            {
                id: 'oi-28',
                bundleId: 'bundle-1',
                sku: 'CNKIT-STARTER',
                name: 'Starter Kit',
                quantity: 3,
                price: 32.99,
                cost: 12.09
            }
        ],
        subtotal: 98.97,
        shipping: 14.99,
        tax: 8.17,
        total: 122.13,
        cogs: 36.27,
        profit: 62.70,
        marginPercent: 51.3,
        shippingAddress: {
            line1: '111 College Ave',
            city: 'Pittsburgh',
            state: 'PA',
            postalCode: '15213',
            country: 'US'
        },
        shipments: [],
        totalVolume: 828,
        totalWeight: 360,
        gripperStickersNeeded: 9,
        daysAgo: 21,
        hoursAgo: 6
    },
    {
        id: 'order-23',
        orderNumber: 'AZ-8826',
        externalId: 'AMZ-114-2938465',
        channel: 'amazon_fbm',
        status: 'shipped',
        customer: {
            name: 'Ryan Johnson',
            email: 'rjohnson@email.com'
        },
        items: [
            {
                id: 'oi-29',
                productId: 'prod-cm-1l',
                sku: 'CNCM1L',
                name: '1L CalMag 2-0-0',
                quantity: 5,
                price: 19.88,
                cost: 4.65
            }
        ],
        subtotal: 99.40,
        shipping: 0,
        tax: 8.20,
        total: 107.60,
        cogs: 23.25,
        profit: 76.15,
        marginPercent: 70.8,
        shippingAddress: {
            line1: '222 University Blvd',
            city: 'Ann Arbor',
            state: 'MI',
            postalCode: '48104',
            country: 'US'
        },
        shipments: [],
        totalVolume: 460,
        totalWeight: 200,
        gripperStickersNeeded: 5,
        daysAgo: 23,
        hoursAgo: 4
    },
    {
        id: 'order-24',
        orderNumber: 'SH-4507',
        externalId: 'SHP-5892327',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'Stephanie Lee',
            email: 'slee@email.com'
        },
        items: [
            {
                id: 'oi-30',
                productId: 'prod-gro-500',
                sku: 'CNGRO500ML',
                name: '500mL Grow 2-1-6',
                quantity: 8,
                price: 8.99,
                cost: 2.85
            }
        ],
        subtotal: 71.92,
        shipping: 10.99,
        tax: 5.94,
        total: 88.85,
        cogs: 22.80,
        profit: 49.12,
        marginPercent: 55.3,
        shippingAddress: {
            line1: '333 Oak Park',
            city: 'Detroit',
            state: 'MI',
            postalCode: '48201',
            country: 'US'
        },
        shipments: [],
        totalVolume: 384,
        totalWeight: 160,
        gripperStickersNeeded: 8,
        daysAgo: 25,
        hoursAgo: 8
    },
    {
        id: 'order-25',
        orderNumber: 'AZ-8825',
        externalId: 'AMZ-114-2938464',
        channel: 'amazon_fba',
        status: 'shipped',
        customer: {
            name: 'Jason Brown',
            email: 'jbrown@email.com'
        },
        items: [
            {
                id: 'oi-31',
                productId: 'prod-blm-1l',
                sku: 'CNBLM1L',
                name: '1L Bloom 0-5-3',
                quantity: 6,
                price: 14.88,
                cost: 4.33
            }
        ],
        subtotal: 89.28,
        shipping: 0,
        tax: 7.37,
        total: 96.65,
        cogs: 25.98,
        profit: 63.30,
        marginPercent: 65.5,
        shippingAddress: {
            line1: '444 Sunset Blvd',
            city: 'Los Angeles',
            state: 'CA',
            postalCode: '90028',
            country: 'US'
        },
        shipments: [],
        totalVolume: 552,
        totalWeight: 240,
        gripperStickersNeeded: 6,
        daysAgo: 27,
        hoursAgo: 3
    },
    {
        id: 'order-26',
        orderNumber: 'SH-4506',
        externalId: 'SHP-5892326',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'Christina Garcia',
            email: 'cgarcia@email.com'
        },
        items: [
            {
                id: 'oi-32',
                bundleId: 'bundle-3',
                sku: 'CNKIT-COMPLETE',
                name: 'Complete System',
                quantity: 2,
                price: 109.99,
                cost: 35.55
            }
        ],
        subtotal: 219.98,
        shipping: 22.99,
        tax: 18.15,
        total: 261.12,
        cogs: 71.10,
        profit: 148.88,
        marginPercent: 57.0,
        shippingAddress: {
            line1: '555 Spring St',
            city: 'Dallas',
            state: 'TX',
            postalCode: '75201',
            country: 'US'
        },
        shipments: [],
        totalVolume: 1104,
        totalWeight: 480,
        gripperStickersNeeded: 12,
        daysAgo: 28,
        hoursAgo: 5
    },
    // LAST MONTH (30-60 days ago) - 10 orders
    {
        id: 'order-27',
        orderNumber: 'SH-4505',
        externalId: 'SHP-5892325',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'Patrick Murphy',
            email: 'pmurphy@email.com'
        },
        items: [
            {
                id: 'oi-33',
                productId: 'prod-mic-4l',
                sku: 'CNMIC4L',
                name: '4L Micro 5-0-1',
                quantity: 3,
                price: 39.99,
                cost: 11.00
            }
        ],
        subtotal: 119.97,
        shipping: 19.99,
        tax: 9.90,
        total: 149.86,
        cogs: 33.00,
        profit: 86.97,
        marginPercent: 58.0,
        shippingAddress: {
            line1: '666 Market St',
            city: 'San Jose',
            state: 'CA',
            postalCode: '95110',
            country: 'US'
        },
        shipments: [],
        totalVolume: 1053,
        totalWeight: 435,
        gripperStickersNeeded: 3,
        daysAgo: 32,
        hoursAgo: 4
    },
    {
        id: 'order-28',
        orderNumber: 'AZ-8824',
        externalId: 'AMZ-114-2938463',
        channel: 'amazon_fba',
        status: 'shipped',
        customer: {
            name: 'Michelle Roberts',
            email: 'mroberts@email.com'
        },
        items: [
            {
                id: 'oi-34',
                productId: 'prod-sb-500',
                sku: 'CNSB500ML',
                name: '500mL Sticky Bandit',
                quantity: 5,
                price: 20.88,
                cost: 5.01
            }
        ],
        subtotal: 104.40,
        shipping: 0,
        tax: 8.61,
        total: 113.01,
        cogs: 25.05,
        profit: 79.35,
        marginPercent: 70.2,
        shippingAddress: {
            line1: '777 Tech Blvd',
            city: 'Seattle',
            state: 'WA',
            postalCode: '98109',
            country: 'US'
        },
        shipments: [],
        totalVolume: 240,
        totalWeight: 100,
        gripperStickersNeeded: 5,
        daysAgo: 35,
        hoursAgo: 7
    },
    {
        id: 'order-29',
        orderNumber: 'SH-4504',
        externalId: 'SHP-5892324',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'Eric Young',
            email: 'eyoung@email.com'
        },
        items: [
            {
                id: 'oi-35',
                productId: 'prod-bon-500',
                sku: 'CNBON500ML',
                name: '500mL Bonnie Vegetation',
                quantity: 6,
                price: 14.99,
                cost: 4.05
            }
        ],
        subtotal: 89.94,
        shipping: 11.99,
        tax: 7.42,
        total: 109.35,
        cogs: 24.30,
        profit: 65.64,
        marginPercent: 60.0,
        shippingAddress: {
            line1: '888 Commerce Dr',
            city: 'Charlotte',
            state: 'NC',
            postalCode: '28201',
            country: 'US'
        },
        shipments: [],
        totalVolume: 288,
        totalWeight: 120,
        gripperStickersNeeded: 6,
        daysAgo: 38,
        hoursAgo: 2
    },
    {
        id: 'order-30',
        orderNumber: 'SH-4503',
        externalId: 'SHP-5892323',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'Kimberly Scott',
            email: 'kscott@email.com'
        },
        items: [
            {
                id: 'oi-36',
                bundleId: 'bundle-2',
                sku: 'CNKIT-PRO',
                name: 'Pro Bundle',
                quantity: 1,
                price: 74.99,
                cost: 23.96
            },
            {
                id: 'oi-37',
                productId: 'prod-mj-500',
                sku: 'CNMJ500ML',
                name: '500mL Monkey Juice',
                quantity: 2,
                price: 24.99,
                cost: 6.36
            }
        ],
        subtotal: 124.97,
        shipping: 14.99,
        tax: 10.31,
        total: 150.27,
        cogs: 36.68,
        profit: 88.29,
        marginPercent: 58.8,
        shippingAddress: {
            line1: '999 Industrial Way',
            city: 'Columbus',
            state: 'OH',
            postalCode: '43215',
            country: 'US'
        },
        shipments: [],
        totalVolume: 556,
        totalWeight: 240,
        gripperStickersNeeded: 7,
        daysAgo: 42,
        hoursAgo: 6
    },
    {
        id: 'order-31',
        orderNumber: 'AZ-8823',
        externalId: 'AMZ-114-2938462',
        channel: 'amazon_fbm',
        status: 'shipped',
        customer: {
            name: 'Brian Harris',
            email: 'bharris@email.com'
        },
        items: [
            {
                id: 'oi-38',
                productId: 'prod-cyd-500',
                sku: 'CNCYD500ML',
                name: '500mL Clyde Bloom',
                quantity: 4,
                price: 18.88,
                cost: 4.35
            }
        ],
        subtotal: 75.52,
        shipping: 0,
        tax: 6.23,
        total: 81.75,
        cogs: 17.40,
        profit: 58.12,
        marginPercent: 71.1,
        shippingAddress: {
            line1: '111 Innovation Pkwy',
            city: 'Raleigh',
            state: 'NC',
            postalCode: '27601',
            country: 'US'
        },
        shipments: [],
        totalVolume: 192,
        totalWeight: 80,
        gripperStickersNeeded: 4,
        daysAgo: 45,
        hoursAgo: 4
    },
    {
        id: 'order-32',
        orderNumber: 'SH-4502',
        externalId: 'SHP-5892322',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'Amy King',
            email: 'aking@email.com'
        },
        items: [
            {
                id: 'oi-39',
                productId: 'prod-gro-4l',
                sku: 'CNGRO4L',
                name: '4L Grow 2-1-6',
                quantity: 2,
                price: 39.99,
                cost: 11.00
            },
            {
                id: 'oi-40',
                productId: 'prod-blm-4l',
                sku: 'CNBLM4L',
                name: '4L Bloom 0-5-3',
                quantity: 2,
                price: 39.99,
                cost: 11.00
            }
        ],
        subtotal: 159.96,
        shipping: 24.99,
        tax: 13.20,
        total: 198.15,
        cogs: 44.00,
        profit: 115.96,
        marginPercent: 58.5,
        shippingAddress: {
            line1: '222 Gateway Blvd',
            city: 'Tampa',
            state: 'FL',
            postalCode: '33601',
            country: 'US'
        },
        shipments: [],
        totalVolume: 1404,
        totalWeight: 580,
        gripperStickersNeeded: 4,
        daysAgo: 48,
        hoursAgo: 8
    },
    {
        id: 'order-33',
        orderNumber: 'AZ-8822',
        externalId: 'AMZ-114-2938461',
        channel: 'amazon_fba',
        status: 'shipped',
        customer: {
            name: 'Steven Wright',
            email: 'swright@email.com'
        },
        items: [
            {
                id: 'oi-41',
                productId: 'prod-ara-500',
                sku: 'CNARA500ML',
                name: '500mL Armadillo Armour',
                quantity: 2,
                price: 42.88,
                cost: 10.11
            }
        ],
        subtotal: 85.76,
        shipping: 0,
        tax: 7.08,
        total: 92.84,
        cogs: 20.22,
        profit: 65.54,
        marginPercent: 70.6,
        shippingAddress: {
            line1: '333 Venture Dr',
            city: 'San Antonio',
            state: 'TX',
            postalCode: '78201',
            country: 'US'
        },
        shipments: [],
        totalVolume: 96,
        totalWeight: 40,
        gripperStickersNeeded: 2,
        daysAgo: 52,
        hoursAgo: 3
    },
    {
        id: 'order-34',
        orderNumber: 'SH-4501',
        externalId: 'SHP-5892321',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'Rebecca Nelson',
            email: 'rnelson@email.com'
        },
        items: [
            {
                id: 'oi-42',
                bundleId: 'bundle-1',
                sku: 'CNKIT-STARTER',
                name: 'Starter Kit',
                quantity: 4,
                price: 32.99,
                cost: 12.09
            }
        ],
        subtotal: 131.96,
        shipping: 16.99,
        tax: 10.89,
        total: 159.84,
        cogs: 48.36,
        profit: 83.60,
        marginPercent: 52.3,
        shippingAddress: {
            line1: '444 Enterprise Way',
            city: 'Indianapolis',
            state: 'IN',
            postalCode: '46201',
            country: 'US'
        },
        shipments: [],
        totalVolume: 1104,
        totalWeight: 480,
        gripperStickersNeeded: 12,
        daysAgo: 55,
        hoursAgo: 5
    },
    {
        id: 'order-35',
        orderNumber: 'SH-4500',
        externalId: 'SHP-5892320',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'Mark Phillips',
            email: 'mphillips@email.com'
        },
        items: [
            {
                id: 'oi-43',
                productId: 'prod-cm-500',
                sku: 'CNCM500ML',
                name: '500mL CalMag 2-0-0',
                quantity: 10,
                price: 10.99,
                cost: 2.99
            }
        ],
        subtotal: 109.90,
        shipping: 12.99,
        tax: 9.07,
        total: 131.96,
        cogs: 29.90,
        profit: 79.99,
        marginPercent: 60.6,
        shippingAddress: {
            line1: '555 Business Park',
            city: 'Kansas City',
            state: 'MO',
            postalCode: '64101',
            country: 'US'
        },
        shipments: [],
        totalVolume: 480,
        totalWeight: 200,
        gripperStickersNeeded: 10,
        daysAgo: 58,
        hoursAgo: 2
    },
    {
        id: 'order-36',
        orderNumber: 'AZ-8821',
        externalId: 'AMZ-114-2938460',
        channel: 'amazon_fbm',
        status: 'shipped',
        customer: {
            name: 'Laura Campbell',
            email: 'lcampbell@email.com'
        },
        items: [
            {
                id: 'oi-44',
                productId: 'prod-bb-500',
                sku: 'CNBB500ML',
                name: '500mL Bud Booster 0-1-3',
                quantity: 3,
                price: 22.88,
                cost: 4.91
            }
        ],
        subtotal: 68.64,
        shipping: 0,
        tax: 5.66,
        total: 74.30,
        cogs: 14.73,
        profit: 53.91,
        marginPercent: 72.6,
        shippingAddress: {
            line1: '666 Trade Center',
            city: 'Baltimore',
            state: 'MD',
            postalCode: '21201',
            country: 'US'
        },
        shipments: [],
        totalVolume: 144,
        totalWeight: 60,
        gripperStickersNeeded: 3,
        daysAgo: 60,
        hoursAgo: 7
    },
    // LAST 90 DAYS / LAST QUARTER (61-90 days ago) - 8 orders
    {
        id: 'order-37',
        orderNumber: 'SH-4499',
        externalId: 'SHP-5892319',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'Thomas Evans',
            email: 'tevans@email.com'
        },
        items: [
            {
                id: 'oi-45',
                bundleId: 'bundle-3',
                sku: 'CNKIT-COMPLETE',
                name: 'Complete System',
                quantity: 1,
                price: 109.99,
                cost: 35.55
            }
        ],
        subtotal: 109.99,
        shipping: 15.99,
        tax: 9.08,
        total: 135.06,
        cogs: 35.55,
        profit: 74.44,
        marginPercent: 55.1,
        shippingAddress: {
            line1: '777 Corporate Blvd',
            city: 'Oklahoma City',
            state: 'OK',
            postalCode: '73101',
            country: 'US'
        },
        shipments: [],
        totalVolume: 552,
        totalWeight: 240,
        gripperStickersNeeded: 6,
        daysAgo: 65,
        hoursAgo: 4
    },
    {
        id: 'order-38',
        orderNumber: 'AZ-8820',
        externalId: 'AMZ-114-2938459',
        channel: 'amazon_fba',
        status: 'shipped',
        customer: {
            name: 'Danielle Turner',
            email: 'dturner@email.com'
        },
        items: [
            {
                id: 'oi-46',
                productId: 'prod-mic-1l',
                sku: 'CNMIC1L',
                name: '1L Micro 5-0-1',
                quantity: 5,
                price: 14.88,
                cost: 4.33
            }
        ],
        subtotal: 74.40,
        shipping: 0,
        tax: 6.14,
        total: 80.54,
        cogs: 21.65,
        profit: 52.75,
        marginPercent: 65.5,
        shippingAddress: {
            line1: '888 Innovation Way',
            city: 'Omaha',
            state: 'NE',
            postalCode: '68101',
            country: 'US'
        },
        shipments: [],
        totalVolume: 460,
        totalWeight: 200,
        gripperStickersNeeded: 5,
        daysAgo: 70,
        hoursAgo: 6
    },
    {
        id: 'order-39',
        orderNumber: 'SH-4498',
        externalId: 'SHP-5892318',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'William Baker',
            email: 'wbaker@email.com'
        },
        items: [
            {
                id: 'oi-47',
                productId: 'prod-mj-1l',
                sku: 'CNMJ1L',
                name: '1L Monkey Juice',
                quantity: 3,
                price: 39.99,
                cost: 10.45
            }
        ],
        subtotal: 119.97,
        shipping: 13.99,
        tax: 9.90,
        total: 143.86,
        cogs: 31.35,
        profit: 88.62,
        marginPercent: 61.6,
        shippingAddress: {
            line1: '999 Tech Park',
            city: 'Louisville',
            state: 'KY',
            postalCode: '40201',
            country: 'US'
        },
        shipments: [],
        totalVolume: 276,
        totalWeight: 120,
        gripperStickersNeeded: 3,
        daysAgo: 75,
        hoursAgo: 3
    },
    {
        id: 'order-40',
        orderNumber: 'SH-4497',
        externalId: 'SHP-5892317',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'Heather Gray',
            email: 'hgray@email.com'
        },
        items: [
            {
                id: 'oi-48',
                productId: 'prod-ara-1l',
                sku: 'CNARA1L',
                name: '1L Armadillo Armour',
                quantity: 2,
                price: 59.99,
                cost: 16.22
            }
        ],
        subtotal: 119.98,
        shipping: 12.99,
        tax: 9.90,
        total: 142.87,
        cogs: 32.44,
        profit: 87.54,
        marginPercent: 61.3,
        shippingAddress: {
            line1: '111 Progress Way',
            city: 'Milwaukee',
            state: 'WI',
            postalCode: '53201',
            country: 'US'
        },
        shipments: [],
        totalVolume: 184,
        totalWeight: 80,
        gripperStickersNeeded: 2,
        daysAgo: 78,
        hoursAgo: 8
    },
    {
        id: 'order-41',
        orderNumber: 'AZ-8819',
        externalId: 'AMZ-114-2938458',
        channel: 'amazon_fbm',
        status: 'shipped',
        customer: {
            name: 'Jeffrey Collins',
            email: 'jcollins@email.com'
        },
        items: [
            {
                id: 'oi-49',
                productId: 'prod-gro-1l',
                sku: 'CNGRO1L',
                name: '1L Grow 2-1-6',
                quantity: 6,
                price: 14.88,
                cost: 4.33
            }
        ],
        subtotal: 89.28,
        shipping: 0,
        tax: 7.37,
        total: 96.65,
        cogs: 25.98,
        profit: 63.30,
        marginPercent: 65.5,
        shippingAddress: {
            line1: '222 Distribution Dr',
            city: 'Memphis',
            state: 'TN',
            postalCode: '38101',
            country: 'US'
        },
        shipments: [],
        totalVolume: 552,
        totalWeight: 240,
        gripperStickersNeeded: 6,
        daysAgo: 82,
        hoursAgo: 2
    },
    {
        id: 'order-42',
        orderNumber: 'SH-4496',
        externalId: 'SHP-5892316',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'Sharon Martinez',
            email: 'smartinez@email.com'
        },
        items: [
            {
                id: 'oi-50',
                bundleId: 'bundle-2',
                sku: 'CNKIT-PRO',
                name: 'Pro Bundle',
                quantity: 2,
                price: 74.99,
                cost: 23.96
            }
        ],
        subtotal: 149.98,
        shipping: 18.99,
        tax: 12.37,
        total: 181.34,
        cogs: 47.92,
        profit: 102.06,
        marginPercent: 56.3,
        shippingAddress: {
            line1: '333 Logistics Pkwy',
            city: 'Jacksonville',
            state: 'FL',
            postalCode: '32099',
            country: 'US'
        },
        shipments: [],
        totalVolume: 920,
        totalWeight: 400,
        gripperStickersNeeded: 10,
        daysAgo: 85,
        hoursAgo: 5
    },
    {
        id: 'order-43',
        orderNumber: 'AZ-8818',
        externalId: 'AMZ-114-2938457',
        channel: 'amazon_fba',
        status: 'shipped',
        customer: {
            name: 'Charles Robinson',
            email: 'crobinson@email.com'
        },
        items: [
            {
                id: 'oi-51',
                productId: 'prod-blm-500',
                sku: 'CNBLM500ML',
                name: '500mL Bloom 0-5-3',
                quantity: 8,
                price: 12.88,
                cost: 3.15
            }
        ],
        subtotal: 103.04,
        shipping: 0,
        tax: 8.50,
        total: 111.54,
        cogs: 25.20,
        profit: 77.84,
        marginPercent: 69.8,
        shippingAddress: {
            line1: '444 Fulfillment Ave',
            city: 'Hartford',
            state: 'CT',
            postalCode: '06101',
            country: 'US'
        },
        shipments: [],
        totalVolume: 384,
        totalWeight: 160,
        gripperStickersNeeded: 8,
        daysAgo: 88,
        hoursAgo: 4
    },
    {
        id: 'order-44',
        orderNumber: 'SH-4495',
        externalId: 'SHP-5892315',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'Angela White',
            email: 'awhite2@email.com'
        },
        items: [
            {
                id: 'oi-52',
                productId: 'prod-cm-1l',
                sku: 'CNCM1L',
                name: '1L CalMag 2-0-0',
                quantity: 4,
                price: 16.99,
                cost: 4.35
            }
        ],
        subtotal: 67.96,
        shipping: 9.99,
        tax: 5.61,
        total: 83.56,
        cogs: 17.40,
        profit: 50.56,
        marginPercent: 60.5,
        shippingAddress: {
            line1: '555 Warehouse Rd',
            city: 'Providence',
            state: 'RI',
            postalCode: '02901',
            country: 'US'
        },
        shipments: [],
        totalVolume: 368,
        totalWeight: 160,
        gripperStickersNeeded: 4,
        daysAgo: 90,
        hoursAgo: 7
    },
    // YEAR TO DATE (91-180 days ago) - 10 more orders to show YTD difference
    {
        id: 'order-45',
        orderNumber: 'SH-4494',
        externalId: 'SHP-5892314',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'Paul Edwards',
            email: 'pedwards@email.com'
        },
        items: [
            {
                id: 'oi-53',
                bundleId: 'bundle-1',
                sku: 'CNKIT-STARTER',
                name: 'Starter Kit',
                quantity: 5,
                price: 32.99,
                cost: 12.09
            }
        ],
        subtotal: 164.95,
        shipping: 19.99,
        tax: 13.61,
        total: 198.55,
        cogs: 60.45,
        profit: 104.50,
        marginPercent: 52.6,
        shippingAddress: {
            line1: '666 Supply Chain Blvd',
            city: 'Richmond',
            state: 'VA',
            postalCode: '23219',
            country: 'US'
        },
        shipments: [],
        totalVolume: 1380,
        totalWeight: 600,
        gripperStickersNeeded: 15,
        daysAgo: 100,
        hoursAgo: 3
    },
    {
        id: 'order-46',
        orderNumber: 'AZ-8817',
        externalId: 'AMZ-114-2938456',
        channel: 'amazon_fba',
        status: 'shipped',
        customer: {
            name: 'Michelle Torres',
            email: 'mtorres@email.com'
        },
        items: [
            {
                id: 'oi-54',
                productId: 'prod-mic-4l',
                sku: 'CNMIC4L',
                name: '4L Micro 5-0-1',
                quantity: 2,
                price: 38.88,
                cost: 11.50
            }
        ],
        subtotal: 77.76,
        shipping: 0,
        tax: 6.42,
        total: 84.18,
        cogs: 23.00,
        profit: 54.76,
        marginPercent: 65.1,
        shippingAddress: {
            line1: '777 Distribution Center',
            city: 'Norfolk',
            state: 'VA',
            postalCode: '23501',
            country: 'US'
        },
        shipments: [],
        totalVolume: 702,
        totalWeight: 290,
        gripperStickersNeeded: 2,
        daysAgo: 115,
        hoursAgo: 6
    },
    {
        id: 'order-47',
        orderNumber: 'SH-4493',
        externalId: 'SHP-5892313',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'Gary Lewis',
            email: 'glewis@email.com'
        },
        items: [
            {
                id: 'oi-55',
                productId: 'prod-sb-500',
                sku: 'CNSB500ML',
                name: '500mL Sticky Bandit',
                quantity: 7,
                price: 16.99,
                cost: 4.71
            }
        ],
        subtotal: 118.93,
        shipping: 12.99,
        tax: 9.81,
        total: 141.73,
        cogs: 32.97,
        profit: 85.96,
        marginPercent: 60.7,
        shippingAddress: {
            line1: '888 Commerce Way',
            city: 'Buffalo',
            state: 'NY',
            postalCode: '14201',
            country: 'US'
        },
        shipments: [],
        totalVolume: 336,
        totalWeight: 140,
        gripperStickersNeeded: 7,
        daysAgo: 130,
        hoursAgo: 2
    },
    {
        id: 'order-48',
        orderNumber: 'SH-4492',
        externalId: 'SHP-5892312',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'Sandra Hill',
            email: 'shill@email.com'
        },
        items: [
            {
                id: 'oi-56',
                bundleId: 'bundle-3',
                sku: 'CNKIT-COMPLETE',
                name: 'Complete System',
                quantity: 2,
                price: 109.99,
                cost: 35.55
            }
        ],
        subtotal: 219.98,
        shipping: 22.99,
        tax: 18.15,
        total: 261.12,
        cogs: 71.10,
        profit: 148.88,
        marginPercent: 57.0,
        shippingAddress: {
            line1: '999 E-Commerce Pkwy',
            city: 'Rochester',
            state: 'NY',
            postalCode: '14601',
            country: 'US'
        },
        shipments: [],
        totalVolume: 1104,
        totalWeight: 480,
        gripperStickersNeeded: 12,
        daysAgo: 145,
        hoursAgo: 8
    },
    {
        id: 'order-49',
        orderNumber: 'AZ-8816',
        externalId: 'AMZ-114-2938455',
        channel: 'amazon_fbm',
        status: 'shipped',
        customer: {
            name: 'Keith Walker',
            email: 'kwalker@email.com'
        },
        items: [
            {
                id: 'oi-57',
                productId: 'prod-bon-500',
                sku: 'CNBON500ML',
                name: '500mL Bonnie Vegetation',
                quantity: 8,
                price: 18.88,
                cost: 4.35
            }
        ],
        subtotal: 151.04,
        shipping: 0,
        tax: 12.46,
        total: 163.50,
        cogs: 34.80,
        profit: 116.24,
        marginPercent: 71.1,
        shippingAddress: {
            line1: '111 Retail Row',
            city: 'Syracuse',
            state: 'NY',
            postalCode: '13201',
            country: 'US'
        },
        shipments: [],
        totalVolume: 384,
        totalWeight: 160,
        gripperStickersNeeded: 8,
        daysAgo: 160,
        hoursAgo: 4
    },
    {
        id: 'order-50',
        orderNumber: 'SH-4491',
        externalId: 'SHP-5892311',
        channel: 'shopify',
        status: 'shipped',
        customer: {
            name: 'Dorothy Hall',
            email: 'dhall@email.com'
        },
        items: [
            {
                id: 'oi-58',
                productId: 'prod-cyd-500',
                sku: 'CNCYD500ML',
                name: '500mL Clyde Bloom',
                quantity: 6,
                price: 14.99,
                cost: 4.05
            }
        ],
        subtotal: 89.94,
        shipping: 10.99,
        tax: 7.42,
        total: 108.35,
        cogs: 24.30,
        profit: 65.64,
        marginPercent: 60.6,
        shippingAddress: {
            line1: '222 Market Square',
            city: 'Albany',
            state: 'NY',
            postalCode: '12201',
            country: 'US'
        },
        shipments: [],
        totalVolume: 288,
        totalWeight: 120,
        gripperStickersNeeded: 6,
        daysAgo: 175,
        hoursAgo: 5
    }
];
// Generate orders with dynamic dates
function generateOrders() {
    return orderTemplates.map((template)=>{
        const { daysAgo, hoursAgo, ...orderData } = template;
        const createdAt = getRelativeDate(daysAgo, hoursAgo);
        const updatedAt = getRelativeDate(daysAgo, Math.max(0, hoursAgo - 2));
        // Update shipment dates if present
        const shipments = orderData.shipments?.map((s)=>({
                ...s,
                shippedAt: s.status === 'shipped' ? getRelativeDate(daysAgo, hoursAgo - 4) : undefined
            })) || [];
        return {
            ...orderData,
            shipments,
            createdAt,
            updatedAt
        };
    });
}
const orders = generateOrders();
const pickBatches = [
    {
        id: 'batch-1',
        name: 'Morning Wave #1',
        status: 'in_progress',
        orders: [
            {
                orderId: 'order-1',
                status: 'picking',
                toteBarcode: 'TOTE-001'
            },
            {
                orderId: 'order-2',
                status: 'pending'
            }
        ],
        assignedTo: 'John',
        createdAt: '2024-12-30T08:30:00Z'
    },
    {
        id: 'batch-2',
        name: 'Morning Wave #2',
        status: 'queued',
        orders: [
            {
                orderId: 'order-3',
                status: 'pending'
            }
        ],
        createdAt: '2024-12-30T08:35:00Z'
    }
];
const purchaseOrders = [
    {
        id: 'po-1',
        poNumber: 'PO-2024-089',
        supplier: suppliers[0],
        status: 'sent',
        currency: 'CAD',
        exchangeRate: 0.74,
        items: [
            {
                id: 'poli-1',
                productId: 'prod-mic-1l',
                quantity: 500,
                quantityReceived: 0,
                unitCost: 5.18,
                totalCost: 2590.00,
                linkedLabelId: 'label-mic-1l',
                linkedLabelSku: 'LABEL-1L-MICRO',
                labelQuantityNeeded: 500
            },
            {
                id: 'poli-2',
                productId: 'prod-bb-1l',
                quantity: 200,
                quantityReceived: 0,
                unitCost: 9.93,
                totalCost: 1986.00
            }
        ],
        labelDeductions: [
            {
                labelProductId: 'label-mic-1l',
                labelSku: 'LABEL-1L-MICRO',
                quantityDeducted: 461,
                forProductId: 'prod-mic-1l',
                forProductSku: 'CNMIC1L'
            }
        ],
        labelDeductionWarnings: [
            'Warning: Only 461 of 500 Micro 1L Labels available. 39 labels short.'
        ],
        subtotal: 4576.00,
        subtotalUSD: 3386.24,
        notes: 'Rush order - replenishment needed',
        createdAt: '2024-12-28T10:00:00Z',
        expectedDate: '2025-01-05'
    },
    {
        id: 'po-2',
        poNumber: 'PO-2024-088',
        supplier: suppliers[0],
        status: 'partially_received',
        currency: 'CAD',
        exchangeRate: 0.74,
        items: [
            {
                id: 'poli-3',
                productId: 'prod-gro-1l',
                quantity: 250,
                quantityReceived: 250,
                unitCost: 5.18,
                totalCost: 1295.00
            },
            {
                id: 'poli-4',
                productId: 'prod-blm-1l',
                quantity: 250,
                quantityReceived: 100,
                unitCost: 5.18,
                totalCost: 1295.00
            }
        ],
        subtotal: 2590.00,
        subtotalUSD: 1916.60,
        createdAt: '2024-12-20T14:00:00Z',
        expectedDate: '2024-12-30',
        receivedAt: '2024-12-28T09:00:00Z'
    }
];
const workOrders = [
    {
        id: 'wo-1',
        woNumber: 'WO-2024-089',
        outputProductId: 'prod-mic-1l',
        outputQuantity: 500,
        status: 'in_progress',
        inputs: [
            {
                productId: 'label-mic-1l',
                quantityRequired: 500,
                quantityUsed: 325
            }
        ],
        laborHours: 4.5,
        notes: 'Labeling batch for FBA prep',
        createdAt: '2024-12-30T07:00:00Z'
    },
    {
        id: 'wo-2',
        woNumber: 'WO-2024-090',
        outputProductId: 'prod-bb-1l',
        outputQuantity: 200,
        status: 'pending',
        inputs: [
            {
                productId: 'label-bb-1l',
                quantityRequired: 200,
                quantityUsed: 0
            }
        ],
        laborHours: 0,
        notes: 'Pending labels arrival',
        createdAt: '2024-12-30T08:00:00Z'
    },
    {
        id: 'wo-3',
        woNumber: 'WO-2024-088',
        outputProductId: 'prod-gro-500',
        outputQuantity: 300,
        status: 'completed',
        inputs: [
            {
                productId: 'label-gro-500',
                quantityRequired: 300,
                quantityUsed: 300
            }
        ],
        laborHours: 3.0,
        createdAt: '2024-12-29T09:00:00Z',
        completedAt: '2024-12-29T14:00:00Z'
    }
];
const fbaShipments = [
    {
        id: 'fba-1',
        shipmentId: 'FBA16XXXX001',
        status: 'prepping',
        items: [
            {
                productId: 'prod-mic-1l',
                quantity: 144,
                casePackQty: 12,
                casesNeeded: 12,
                prepTasks: [
                    {
                        type: 'gripper_sticker',
                        completed: true
                    },
                    {
                        type: 'fnsku_label',
                        completed: false
                    }
                ]
            }
        ],
        destinationFc: 'FTW1',
        createdAt: '2024-12-29T10:00:00Z'
    }
];
const fulfillmentRules = [
    {
        id: 'rule-1',
        name: 'Gripper Sticker Auto-Add',
        type: 'gripper_sticker',
        isActive: true,
        config: {
            stickersPerBottle: 1
        }
    },
    {
        id: 'rule-2',
        name: 'Smart Box Selection',
        type: 'box_selection',
        isActive: true,
        config: {
            volumeBuffer: 1.2,
            preferSmartBox: true
        }
    },
    {
        id: 'rule-3',
        name: 'Label Auto-Deduction on PO',
        type: 'label_deduction',
        isActive: true,
        config: {
            deductOnPOCreate: true
        }
    }
];
const dashboardStats = {
    revenue: 2847.52,
    revenueChange: 12.3,
    grossProfit: 1708.53,
    grossProfitChange: 8.5,
    cogs: 1138.99,
    cogsChange: 5.2,
    ordersCount: 23,
    ordersChange: 15.7,
    unitsShipped: 67,
    aov: 123.80,
    aovChange: 3.2
};
const channelPerformance = [
    {
        channel: 'shopify',
        revenue: 1923,
        orders: 15,
        units: 42,
        aov: 128.20,
        margin: 60.0,
        profit: 1154
    },
    {
        channel: 'amazon_fba',
        revenue: 624,
        orders: 5,
        units: 16,
        aov: 124.80,
        margin: 60.0,
        profit: 374
    },
    {
        channel: 'amazon_fbm',
        revenue: 300,
        orders: 3,
        units: 9,
        aov: 100.00,
        margin: 60.0,
        profit: 180
    }
];
const fulfillmentPipeline = {
    toPick: 8,
    toPack: 3,
    readyToShip: 5,
    shipped: 47,
    delivered: 0
};
const inventoryValuation = [
    {
        locationId: 'loc-1',
        locationName: 'Cronk Warehouse',
        totalCostValue: 19632,
        totalMsrpValue: 47820,
        unrealizedProfit: 28188,
        skuCount: 24,
        unitCount: 2341,
        margin: 58.9
    },
    {
        locationId: 'loc-2',
        locationName: 'Amazon USA',
        totalCostValue: 7582,
        totalMsrpValue: 18240,
        unrealizedProfit: 10658,
        skuCount: 7,
        unitCount: 892,
        margin: 58.4
    },
    {
        locationId: 'loc-3',
        locationName: 'Amazon Canada',
        totalCostValue: 1341,
        totalMsrpValue: 3180,
        unrealizedProfit: 1839,
        skuCount: 3,
        unitCount: 156,
        margin: 57.8
    }
];
function getProductById(id) {
    return products.find((p)=>p.id === id);
}
function getProductBySku(sku) {
    return products.find((p)=>p.sku === sku);
}
function getLocationById(id) {
    return locations.find((l)=>l.id === id);
}
function getBoxById(id) {
    return shippingBoxes.find((b)=>b.id === id);
}
function getInventoryForProduct(productId) {
    return inventory.filter((i)=>i.productId === productId);
}
function getInventoryForLocation(locationId) {
    return inventory.filter((i)=>i.locationId === locationId);
}
function getTotalQuantity(productId) {
    return inventory.filter((i)=>i.productId === productId).reduce((sum, i)=>sum + i.quantity, 0);
}
function getBundleAvailability(bundle) {
    let minAvailable = Infinity;
    let limitingItem = '';
    if (!bundle.components) return {
        available: 0,
        limitingItem: ''
    };
    for (const component of bundle.components){
        const totalQty = getTotalQuantity(component.productId);
        const available = Math.floor(totalQty / component.quantity);
        if (available < minAvailable) {
            minAvailable = available;
            const product = getProductById(component.productId);
            limitingItem = product?.name || component.productId;
        }
    }
    return {
        available: minAvailable === Infinity ? 0 : minAvailable,
        limitingItem
    };
}
function calculateMargin(price, cost) {
    if (price === 0) return 0;
    return (price - cost) / price * 100;
}
;
function getLinkedLabel(product) {
    if (!product.linkedLabels || !product.size) return undefined;
    const labelId = product.linkedLabels[product.size];
    if (!labelId) return undefined;
    return getProductById(labelId);
}
function checkLabelAvailability(productId, quantity) {
    const product = getProductById(productId);
    if (!product) return {
        available: 0,
        shortage: quantity
    };
    const label = getLinkedLabel(product);
    if (!label) return {
        available: quantity,
        shortage: 0
    }; // No label linked
    const labelQty = getTotalQuantity(label.id);
    const shortage = Math.max(0, quantity - labelQty);
    return {
        available: Math.min(labelQty, quantity),
        shortage
    };
}
function getLowStockItems() {
    const lowStock = [];
    for (const product of products){
        if (!product.isActive || !product.reorderPoint) continue;
        const totalQty = getTotalQuantity(product.id);
        if (totalQty < product.reorderPoint) {
            lowStock.push({
                product,
                currentQty: totalQty,
                reorderPoint: product.reorderPoint
            });
        }
    }
    return lowStock.sort((a, b)=>a.currentQty / a.reorderPoint - b.currentQty / b.reorderPoint);
}
function getRecentOrders(limit = 5) {
    return [
        ...orders
    ].sort((a, b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, limit);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/fulfillment/FulfillmentBadges.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AmazonDestinationBadge",
    ()=>AmazonDestinationBadge,
    "CarrierBadge",
    ()=>CarrierBadge,
    "ChannelBadge",
    ()=>ChannelBadge,
    "FBAStatusBadge",
    ()=>FBAStatusBadge,
    "MarginBadge",
    ()=>MarginBadge,
    "PackStatusBadge",
    ()=>PackStatusBadge,
    "PickStatusBadge",
    ()=>PickStatusBadge,
    "QueueStatusBadge",
    ()=>QueueStatusBadge,
    "ShippingStatusBadge",
    ()=>ShippingStatusBadge,
    "carrierConfig",
    ()=>carrierConfig,
    "channelConfig",
    ()=>channelConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
const channelConfig = {
    shopify: {
        bg: 'bg-green-500/20',
        text: 'text-green-400',
        label: 'Shopify'
    },
    amazon_fbm: {
        bg: 'bg-orange-500/20',
        text: 'text-orange-400',
        label: 'Amazon FBM'
    },
    amazon_fba: {
        bg: 'bg-amber-500/20',
        text: 'text-amber-400',
        label: 'Amazon FBA'
    },
    manual: {
        bg: 'bg-slate-500/20',
        text: 'text-slate-400',
        label: 'Manual'
    }
};
function ChannelBadge({ channel }) {
    const config = channelConfig[channel] || channelConfig.manual;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `px-2 py-0.5 rounded text-xs ${config.bg} ${config.text}`,
        children: config.label
    }, void 0, false, {
        fileName: "[project]/components/fulfillment/FulfillmentBadges.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c = ChannelBadge;
const pickStatusConfig = {
    to_pick: {
        bg: 'bg-amber-500/20',
        text: 'text-amber-400',
        label: 'To Pick'
    },
    picking: {
        bg: 'bg-blue-500/20',
        text: 'text-blue-400',
        label: 'Picking'
    }
};
function PickStatusBadge({ status }) {
    const config = pickStatusConfig[status];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `px-2 py-0.5 text-xs rounded-full ${config.bg} ${config.text}`,
        children: config.label
    }, void 0, false, {
        fileName: "[project]/components/fulfillment/FulfillmentBadges.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_c1 = PickStatusBadge;
const packStatusConfig = {
    to_pack: {
        bg: 'bg-purple-500/20',
        text: 'text-purple-400',
        label: 'To Pack'
    },
    packing: {
        bg: 'bg-cyan-500/20',
        text: 'text-cyan-400',
        label: 'Packing'
    },
    ready: {
        bg: 'bg-emerald-500/20',
        text: 'text-emerald-400',
        label: 'Ready'
    }
};
function PackStatusBadge({ status }) {
    const config = packStatusConfig[status];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `px-2 py-0.5 text-xs rounded-full ${config.bg} ${config.text}`,
        children: config.label
    }, void 0, false, {
        fileName: "[project]/components/fulfillment/FulfillmentBadges.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
_c2 = PackStatusBadge;
const carrierConfig = {
    usps: {
        badge: 'USPS',
        color: 'bg-blue-600',
        textColor: 'bg-blue-500/20 text-blue-400'
    },
    ups: {
        badge: 'UPS',
        color: 'bg-amber-700',
        textColor: 'bg-amber-500/20 text-amber-400'
    },
    fedex: {
        badge: 'FDX',
        color: 'bg-purple-600',
        textColor: 'bg-purple-500/20 text-purple-400'
    },
    dhl: {
        badge: 'DHL',
        color: 'bg-orange-500',
        textColor: 'bg-orange-500/20 text-orange-400'
    }
};
function CarrierBadge({ carrier, variant = 'text' }) {
    const config = carrierConfig[carrier] || {
        badge: carrier.toUpperCase(),
        color: 'bg-slate-600',
        textColor: 'bg-slate-500/20 text-slate-400'
    };
    if (variant === 'icon') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-8 h-8 ${config.color} rounded-lg flex items-center justify-center`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-white font-bold text-xs",
                children: config.badge
            }, void 0, false, {
                fileName: "[project]/components/fulfillment/FulfillmentBadges.tsx",
                lineNumber: 92,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/fulfillment/FulfillmentBadges.tsx",
            lineNumber: 91,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `px-2 py-1 ${config.textColor} rounded text-xs font-medium`,
        children: carrier.toUpperCase()
    }, void 0, false, {
        fileName: "[project]/components/fulfillment/FulfillmentBadges.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
_c3 = CarrierBadge;
function ShippingStatusBadge({ status }) {
    switch(status){
        case 'in_transit':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/15 text-blue-400 text-xs font-medium rounded-full border border-blue-500/30",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"
                    }, void 0, false, {
                        fileName: "[project]/components/fulfillment/FulfillmentBadges.tsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, this),
                    "In Transit"
                ]
            }, void 0, true, {
                fileName: "[project]/components/fulfillment/FulfillmentBadges.tsx",
                lineNumber: 115,
                columnNumber: 9
            }, this);
        case 'delivered':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/15 text-emerald-400 text-xs font-medium rounded-full border border-emerald-500/30",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: "fas fa-check text-[10px]"
                    }, void 0, false, {
                        fileName: "[project]/components/fulfillment/FulfillmentBadges.tsx",
                        lineNumber: 123,
                        columnNumber: 11
                    }, this),
                    "Delivered"
                ]
            }, void 0, true, {
                fileName: "[project]/components/fulfillment/FulfillmentBadges.tsx",
                lineNumber: 122,
                columnNumber: 9
            }, this);
        case 'exception':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/15 text-amber-400 text-xs font-medium rounded-full border border-amber-500/30",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: "fas fa-exclamation-triangle text-[10px]"
                    }, void 0, false, {
                        fileName: "[project]/components/fulfillment/FulfillmentBadges.tsx",
                        lineNumber: 130,
                        columnNumber: 11
                    }, this),
                    "Exception"
                ]
            }, void 0, true, {
                fileName: "[project]/components/fulfillment/FulfillmentBadges.tsx",
                lineNumber: 129,
                columnNumber: 9
            }, this);
        case 'label_created':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-500/15 text-slate-400 text-xs font-medium rounded-full border border-slate-500/30",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: "fas fa-tag text-[10px]"
                    }, void 0, false, {
                        fileName: "[project]/components/fulfillment/FulfillmentBadges.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this),
                    "Label Created"
                ]
            }, void 0, true, {
                fileName: "[project]/components/fulfillment/FulfillmentBadges.tsx",
                lineNumber: 136,
                columnNumber: 9
            }, this);
        default:
            return null;
    }
}
_c4 = ShippingStatusBadge;
function MarginBadge({ margin }) {
    const colorClass = margin >= 40 ? 'bg-emerald-500/20 text-emerald-400' : margin >= 25 ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `px-2 py-1 ${colorClass} rounded-full text-xs font-medium`,
        children: [
            margin.toFixed(1),
            "%"
        ]
    }, void 0, true, {
        fileName: "[project]/components/fulfillment/FulfillmentBadges.tsx",
        lineNumber: 159,
        columnNumber: 5
    }, this);
}
_c5 = MarginBadge;
function QueueStatusBadge({ status }) {
    if (status === 'to_pick') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PickStatusBadge, {
            status: "to_pick"
        }, void 0, false, {
            fileName: "[project]/components/fulfillment/FulfillmentBadges.tsx",
            lineNumber: 172,
            columnNumber: 12
        }, this);
    }
    if (status === 'picking') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PickStatusBadge, {
            status: "picking"
        }, void 0, false, {
            fileName: "[project]/components/fulfillment/FulfillmentBadges.tsx",
            lineNumber: 175,
            columnNumber: 12
        }, this);
    }
    if (status === 'to_pack') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PackStatusBadge, {
            status: "to_pack"
        }, void 0, false, {
            fileName: "[project]/components/fulfillment/FulfillmentBadges.tsx",
            lineNumber: 178,
            columnNumber: 12
        }, this);
    }
    if (status === 'packing') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PackStatusBadge, {
            status: "packing"
        }, void 0, false, {
            fileName: "[project]/components/fulfillment/FulfillmentBadges.tsx",
            lineNumber: 181,
            columnNumber: 12
        }, this);
    }
    if (status === 'ready') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PackStatusBadge, {
            status: "ready"
        }, void 0, false, {
            fileName: "[project]/components/fulfillment/FulfillmentBadges.tsx",
            lineNumber: 184,
            columnNumber: 12
        }, this);
    }
    return null;
}
_c6 = QueueStatusBadge;
const fbaStatusConfig = {
    prep: {
        bg: 'bg-amber-500/15',
        text: 'text-amber-400',
        border: 'border-amber-500/30',
        label: 'Prepping'
    },
    ready: {
        bg: 'bg-blue-500/15',
        text: 'text-blue-400',
        border: 'border-blue-500/30',
        label: 'Ready to Ship'
    },
    shipped: {
        bg: 'bg-emerald-500/15',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        label: 'Shipped'
    }
};
function FBAStatusBadge({ status }) {
    const config = fbaStatusConfig[status];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex items-center gap-1.5 px-2.5 py-1 ${config.bg} ${config.text} text-xs font-medium rounded-full border ${config.border}`,
        children: [
            status === 'prep' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                className: "fas fa-cog animate-spin text-[10px]"
            }, void 0, false, {
                fileName: "[project]/components/fulfillment/FulfillmentBadges.tsx",
                lineNumber: 206,
                columnNumber: 29
            }, this),
            status === 'ready' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                className: "fas fa-check text-[10px]"
            }, void 0, false, {
                fileName: "[project]/components/fulfillment/FulfillmentBadges.tsx",
                lineNumber: 207,
                columnNumber: 30
            }, this),
            status === 'shipped' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                className: "fas fa-truck text-[10px]"
            }, void 0, false, {
                fileName: "[project]/components/fulfillment/FulfillmentBadges.tsx",
                lineNumber: 208,
                columnNumber: 32
            }, this),
            config.label
        ]
    }, void 0, true, {
        fileName: "[project]/components/fulfillment/FulfillmentBadges.tsx",
        lineNumber: 205,
        columnNumber: 5
    }, this);
}
_c7 = FBAStatusBadge;
function AmazonDestinationBadge({ destination, code }) {
    const isUSA = destination === 'amazon_usa';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex items-center gap-1.5 px-2 py-1 ${isUSA ? 'bg-orange-500/20 text-orange-400' : 'bg-red-500/20 text-red-400'} text-xs font-medium rounded`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                className: "fab fa-amazon"
            }, void 0, false, {
                fileName: "[project]/components/fulfillment/FulfillmentBadges.tsx",
                lineNumber: 224,
                columnNumber: 7
            }, this),
            isUSA ? 'USA' : 'CA',
            code && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-mono ml-1",
                children: code
            }, void 0, false, {
                fileName: "[project]/components/fulfillment/FulfillmentBadges.tsx",
                lineNumber: 226,
                columnNumber: 16
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/fulfillment/FulfillmentBadges.tsx",
        lineNumber: 223,
        columnNumber: 5
    }, this);
}
_c8 = AmazonDestinationBadge;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "ChannelBadge");
__turbopack_context__.k.register(_c1, "PickStatusBadge");
__turbopack_context__.k.register(_c2, "PackStatusBadge");
__turbopack_context__.k.register(_c3, "CarrierBadge");
__turbopack_context__.k.register(_c4, "ShippingStatusBadge");
__turbopack_context__.k.register(_c5, "MarginBadge");
__turbopack_context__.k.register(_c6, "QueueStatusBadge");
__turbopack_context__.k.register(_c7, "FBAStatusBadge");
__turbopack_context__.k.register(_c8, "AmazonDestinationBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dashboard/DashboardStats.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChannelCard",
    ()=>ChannelCard,
    "DashboardSection",
    ()=>DashboardSection,
    "DashboardStatCard",
    ()=>DashboardStatCard,
    "DashboardStatsGrid",
    ()=>DashboardStatsGrid,
    "FulfillmentPipelineItem",
    ()=>FulfillmentPipelineItem,
    "QuickActionCard",
    ()=>QuickActionCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
'use client';
;
;
function DashboardStatCard({ icon: Icon, iconColor = 'text-slate-400', label, value, subLabel, variant = 'default', href }) {
    const variantClasses = {
        default: 'bg-slate-800/50 border-slate-700/50',
        highlight: 'bg-gradient-to-br from-emerald-500/20 to-green-600/20 border-emerald-500/30',
        warning: 'bg-amber-500/10 border-amber-500/30'
    };
    const valueClasses = {
        default: 'text-white',
        highlight: 'text-emerald-400',
        warning: 'text-amber-400'
    };
    const content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex items-center gap-2 ${variant === 'highlight' ? 'text-emerald-300' : 'text-slate-400'} text-sm mb-2`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/DashboardStats.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/DashboardStats.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/DashboardStats.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `text-3xl font-bold ${valueClasses[variant]}`,
                children: value
            }, void 0, false, {
                fileName: "[project]/components/dashboard/DashboardStats.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            subLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `text-sm mt-1 ${variant === 'highlight' ? 'text-slate-300' : 'text-slate-400'}`,
                children: subLabel
            }, void 0, false, {
                fileName: "[project]/components/dashboard/DashboardStats.tsx",
                lineNumber: 47,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
    const baseClass = `rounded-xl backdrop-blur border p-5 ${variantClasses[variant]}`;
    if (href) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: href,
            className: `${baseClass} hover:bg-slate-700/50 transition-colors`,
            children: content
        }, void 0, false, {
            fileName: "[project]/components/dashboard/DashboardStats.tsx",
            lineNumber: 58,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: baseClass,
        children: content
    }, void 0, false, {
        fileName: "[project]/components/dashboard/DashboardStats.tsx",
        lineNumber: 64,
        columnNumber: 10
    }, this);
}
_c = DashboardStatCard;
function DashboardStatsGrid({ children, columns = 4 }) {
    const colClass = {
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5'
    }[columns];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `grid ${colClass} gap-4`,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/dashboard/DashboardStats.tsx",
        lineNumber: 80,
        columnNumber: 10
    }, this);
}
_c1 = DashboardStatsGrid;
function FulfillmentPipelineItem({ href, icon: Icon, iconColor, bgColor, borderColor, hoverBgColor, title, subtitle, count }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        className: `flex items-center justify-between p-3 ${bgColor} border ${borderColor} rounded-lg ${hoverBgColor} transition-colors group`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `w-10 h-10 rounded-lg ${bgColor.replace('/10', '/20')} flex items-center justify-center group-hover:${bgColor.replace('/10', '/30')} transition-colors`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            className: `h-5 w-5 ${iconColor}`
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/DashboardStats.tsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/DashboardStats.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `font-medium text-white group-hover:${iconColor} transition-colors`,
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/DashboardStats.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-slate-400",
                                children: subtitle
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/DashboardStats.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/DashboardStats.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/DashboardStats.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `text-2xl font-bold ${iconColor}`,
                children: count
            }, void 0, false, {
                fileName: "[project]/components/dashboard/DashboardStats.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/DashboardStats.tsx",
        lineNumber: 108,
        columnNumber: 5
    }, this);
}
_c2 = FulfillmentPipelineItem;
function QuickActionCard({ href, icon: Icon, iconColor, hoverBorderColor, label }) {
    const bgColor = iconColor.replace('text-', 'bg-').replace('-400', '-500/20');
    const hoverBgColor = iconColor.replace('text-', 'group-hover:bg-').replace('-400', '-500/30');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        className: `flex flex-col items-center gap-2 p-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 ${hoverBorderColor} rounded-xl transition-all group`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `w-10 h-10 rounded-lg ${bgColor} ${hoverBgColor} flex items-center justify-center transition-colors`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    className: `h-5 w-5 ${iconColor}`
                }, void 0, false, {
                    fileName: "[project]/components/dashboard/DashboardStats.tsx",
                    lineNumber: 151,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dashboard/DashboardStats.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm text-slate-300 group-hover:text-white",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/dashboard/DashboardStats.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/DashboardStats.tsx",
        lineNumber: 146,
        columnNumber: 5
    }, this);
}
_c3 = QuickActionCard;
function DashboardSection({ title, subtitle, children, headerRight, badge }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-5 py-4 border-b border-slate-700/50 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-semibold text-white",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/DashboardStats.tsx",
                                lineNumber: 178,
                                columnNumber: 11
                            }, this),
                            badge && badge.count > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `px-2 py-0.5 ${badge.color} text-xs rounded-full`,
                                children: badge.count
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/DashboardStats.tsx",
                                lineNumber: 180,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/DashboardStats.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this),
                    subtitle && !headerRight && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-slate-400",
                        children: subtitle
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/DashboardStats.tsx",
                        lineNumber: 185,
                        columnNumber: 38
                    }, this),
                    headerRight
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/DashboardStats.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-5",
                children: children
            }, void 0, false, {
                fileName: "[project]/components/dashboard/DashboardStats.tsx",
                lineNumber: 188,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/DashboardStats.tsx",
        lineNumber: 175,
        columnNumber: 5
    }, this);
}
_c4 = DashboardSection;
function ChannelCard({ href, icon, iconBgColor, iconTextColor, name, orders, revenue, profit, percentage, progressColor, formatCurrency }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        className: "block p-4 bg-slate-900/50 rounded-lg hover:bg-slate-800/70 transition-colors group",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `w-8 h-8 rounded-lg ${iconBgColor} flex items-center justify-center`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: `${icon} ${iconTextColor}`
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/DashboardStats.tsx",
                                    lineNumber: 226,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/DashboardStats.tsx",
                                lineNumber: 225,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `font-medium text-white group-hover:${iconTextColor} transition-colors`,
                                children: name
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/DashboardStats.tsx",
                                lineNumber: 228,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/DashboardStats.tsx",
                        lineNumber: 224,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-slate-400",
                        children: [
                            percentage,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/DashboardStats.tsx",
                        lineNumber: 230,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/DashboardStats.tsx",
                lineNumber: 223,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-3 gap-3 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-lg font-bold text-white",
                                children: orders
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/DashboardStats.tsx",
                                lineNumber: 234,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-slate-500",
                                children: "Orders"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/DashboardStats.tsx",
                                lineNumber: 235,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/DashboardStats.tsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-lg font-bold text-white",
                                children: formatCurrency(revenue)
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/DashboardStats.tsx",
                                lineNumber: 238,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-slate-500",
                                children: "Revenue"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/DashboardStats.tsx",
                                lineNumber: 239,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/DashboardStats.tsx",
                        lineNumber: 237,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-lg font-bold text-emerald-400",
                                children: formatCurrency(profit)
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/DashboardStats.tsx",
                                lineNumber: 242,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-slate-500",
                                children: "Profit"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/DashboardStats.tsx",
                                lineNumber: 243,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/DashboardStats.tsx",
                        lineNumber: 241,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/DashboardStats.tsx",
                lineNumber: 232,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 h-1.5 bg-slate-700 rounded-full overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `h-full ${progressColor} rounded-full`,
                    style: {
                        width: `${percentage}%`
                    }
                }, void 0, false, {
                    fileName: "[project]/components/dashboard/DashboardStats.tsx",
                    lineNumber: 247,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dashboard/DashboardStats.tsx",
                lineNumber: 246,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/DashboardStats.tsx",
        lineNumber: 222,
        columnNumber: 5
    }, this);
}
_c5 = ChannelCard;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "DashboardStatCard");
__turbopack_context__.k.register(_c1, "DashboardStatsGrid");
__turbopack_context__.k.register(_c2, "FulfillmentPipelineItem");
__turbopack_context__.k.register(_c3, "QuickActionCard");
__turbopack_context__.k.register(_c4, "DashboardSection");
__turbopack_context__.k.register(_c5, "ChannelCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dashboard/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// Dashboard shared components
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$DashboardStats$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/DashboardStats.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(dashboard)/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-client] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$warehouse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Warehouse$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/warehouse.js [app-client] (ecmascript) <export default as Warehouse>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/truck.js [app-client] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hand$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hand$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hand.js [app-client] (ecmascript) <export default as Hand>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tag.js [app-client] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-client] (ecmascript) <export default as ArrowUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-down.js [app-client] (ecmascript) <export default as ArrowDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$factory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Factory$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/factory.js [app-client] (ecmascript) <export default as Factory>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AppContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$DateRangeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/DateRangeContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/data/mockData.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/formatting.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$fulfillment$2f$FulfillmentBadges$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/fulfillment/FulfillmentBadges.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/dashboard/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$DashboardStats$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/DashboardStats.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
function Dashboard() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { state } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const { dateRange, isInRange, getComparisonRange } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$DateRangeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDateRange"])();
    // Helper to get total stock for a product
    const getTotalStock = (productId)=>{
        return state.inventory.filter((inv)=>inv.productId === productId).reduce((sum, inv)=>sum + inv.quantity, 0);
    };
    // Calculate live dashboard stats from AppContext
    const dashboardStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Dashboard.useMemo[dashboardStats]": ()=>{
            // Filter orders by selected date range
            const periodOrders = state.orders.filter({
                "Dashboard.useMemo[dashboardStats].periodOrders": (o)=>isInRange(o.createdAt)
            }["Dashboard.useMemo[dashboardStats].periodOrders"]);
            // Get comparison period for change calculation
            const compRange = getComparisonRange();
            const compOrders = compRange ? state.orders.filter({
                "Dashboard.useMemo[dashboardStats]": (o)=>{
                    const orderDate = new Date(o.createdAt);
                    return orderDate >= compRange.startDate && orderDate <= compRange.endDate;
                }
            }["Dashboard.useMemo[dashboardStats]"]) : [];
            // Calculate period metrics
            const periodRevenue = periodOrders.reduce({
                "Dashboard.useMemo[dashboardStats].periodRevenue": (sum, o)=>sum + o.total
            }["Dashboard.useMemo[dashboardStats].periodRevenue"], 0);
            const periodProfit = periodOrders.reduce({
                "Dashboard.useMemo[dashboardStats].periodProfit": (sum, o)=>sum + o.profit
            }["Dashboard.useMemo[dashboardStats].periodProfit"], 0);
            const compRevenue = compOrders.reduce({
                "Dashboard.useMemo[dashboardStats].compRevenue": (sum, o)=>sum + o.total
            }["Dashboard.useMemo[dashboardStats].compRevenue"], 0);
            const compProfit = compOrders.reduce({
                "Dashboard.useMemo[dashboardStats].compProfit": (sum, o)=>sum + o.profit
            }["Dashboard.useMemo[dashboardStats].compProfit"], 0);
            // Calculate change percentages
            const revenueChange = compRevenue > 0 ? (periodRevenue - compRevenue) / compRevenue * 100 : 0;
            const profitChange = compProfit > 0 ? (periodProfit - compProfit) / compProfit * 100 : 0;
            const ordersChange = compOrders.length > 0 ? (periodOrders.length - compOrders.length) / compOrders.length * 100 : 0;
            // Filter shipments by date range
            const periodShipments = state.shipments.filter({
                "Dashboard.useMemo[dashboardStats].periodShipments": (s)=>s.shippedAt && isInRange(s.shippedAt)
            }["Dashboard.useMemo[dashboardStats].periodShipments"]);
            return {
                toPick: state.orders.filter({
                    "Dashboard.useMemo[dashboardStats]": (o)=>o.status === 'to_pick'
                }["Dashboard.useMemo[dashboardStats]"]).length,
                picking: state.orders.filter({
                    "Dashboard.useMemo[dashboardStats]": (o)=>o.status === 'picking'
                }["Dashboard.useMemo[dashboardStats]"]).length,
                toPack: state.orders.filter({
                    "Dashboard.useMemo[dashboardStats]": (o)=>o.status === 'to_pack'
                }["Dashboard.useMemo[dashboardStats]"]).length,
                packing: state.orders.filter({
                    "Dashboard.useMemo[dashboardStats]": (o)=>o.status === 'packing'
                }["Dashboard.useMemo[dashboardStats]"]).length,
                readyToShip: state.orders.filter({
                    "Dashboard.useMemo[dashboardStats]": (o)=>o.status === 'ready'
                }["Dashboard.useMemo[dashboardStats]"]).length,
                shippedInPeriod: periodShipments.length,
                periodRevenue,
                periodProfit,
                periodOrders: periodOrders.length,
                revenueChange,
                profitChange,
                ordersChange,
                lowStockCount: state.products.filter({
                    "Dashboard.useMemo[dashboardStats]": (p)=>{
                        const stock = getTotalStock(p.id);
                        return stock <= p.reorderPoint;
                    }
                }["Dashboard.useMemo[dashboardStats]"]).length,
                outOfStockCount: state.products.filter({
                    "Dashboard.useMemo[dashboardStats]": (p)=>getTotalStock(p.id) === 0
                }["Dashboard.useMemo[dashboardStats]"]).length,
                totalProducts: state.products.length,
                totalInventoryValue: state.products.reduce({
                    "Dashboard.useMemo[dashboardStats]": (sum, p)=>{
                        return sum + p.prices.msrp * getTotalStock(p.id);
                    }
                }["Dashboard.useMemo[dashboardStats]"], 0),
                totalCostValue: state.products.reduce({
                    "Dashboard.useMemo[dashboardStats]": (sum, p)=>{
                        return sum + p.cost.rolling * getTotalStock(p.id);
                    }
                }["Dashboard.useMemo[dashboardStats]"], 0)
            };
        }
    }["Dashboard.useMemo[dashboardStats]"], [
        state.orders,
        state.products,
        state.inventory,
        state.shipments,
        isInRange,
        getComparisonRange
    ]);
    // Calculate inventory valuation by location
    const inventoryValuation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Dashboard.useMemo[inventoryValuation]": ()=>{
            return state.locations.map({
                "Dashboard.useMemo[inventoryValuation]": (loc)=>{
                    const locInventory = state.inventory.filter({
                        "Dashboard.useMemo[inventoryValuation].locInventory": (inv)=>inv.locationId === loc.id
                    }["Dashboard.useMemo[inventoryValuation].locInventory"]);
                    let unitCount = 0;
                    let totalMsrpValue = 0;
                    let totalCostValue = 0;
                    locInventory.forEach({
                        "Dashboard.useMemo[inventoryValuation]": (inv)=>{
                            const product = state.products.find({
                                "Dashboard.useMemo[inventoryValuation].product": (p)=>p.id === inv.productId
                            }["Dashboard.useMemo[inventoryValuation].product"]);
                            if (product) {
                                unitCount += inv.quantity;
                                totalMsrpValue += product.prices.msrp * inv.quantity;
                                totalCostValue += product.cost.rolling * inv.quantity;
                            }
                        }
                    }["Dashboard.useMemo[inventoryValuation]"]);
                    const unrealizedProfit = totalMsrpValue - totalCostValue;
                    const margin = totalMsrpValue > 0 ? unrealizedProfit / totalMsrpValue * 100 : 0;
                    return {
                        locationId: loc.id,
                        locationName: loc.name,
                        type: loc.type,
                        unitCount,
                        totalMsrpValue,
                        totalCostValue,
                        unrealizedProfit,
                        margin
                    };
                }
            }["Dashboard.useMemo[inventoryValuation]"]);
        }
    }["Dashboard.useMemo[inventoryValuation]"], [
        state.locations,
        state.inventory,
        state.products
    ]);
    // Recent orders from AppContext
    const recentOrders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Dashboard.useMemo[recentOrders]": ()=>{
            return [
                ...state.orders
            ].sort({
                "Dashboard.useMemo[recentOrders]": (a, b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            }["Dashboard.useMemo[recentOrders]"]).slice(0, 5);
        }
    }["Dashboard.useMemo[recentOrders]"], [
        state.orders
    ]);
    // Low stock products
    const lowStockProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Dashboard.useMemo[lowStockProducts]": ()=>{
            return state.products.map({
                "Dashboard.useMemo[lowStockProducts]": (p)=>({
                        product: p,
                        currentQty: getTotalStock(p.id),
                        reorderPoint: p.reorderPoint
                    })
            }["Dashboard.useMemo[lowStockProducts]"]).filter({
                "Dashboard.useMemo[lowStockProducts]": (item)=>item.currentQty <= item.reorderPoint
            }["Dashboard.useMemo[lowStockProducts]"]).sort({
                "Dashboard.useMemo[lowStockProducts]": (a, b)=>a.currentQty - b.currentQty
            }["Dashboard.useMemo[lowStockProducts]"]).slice(0, 4);
        }
    }["Dashboard.useMemo[lowStockProducts]"], [
        state.products,
        state.inventory
    ]);
    // Bundle availability
    const bundleAvailability = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Dashboard.useMemo[bundleAvailability]": ()=>{
            return state.bundles.map({
                "Dashboard.useMemo[bundleAvailability]": (bundle)=>{
                    let minAvailable = Infinity;
                    let limitingItem = '';
                    (bundle.components || []).forEach({
                        "Dashboard.useMemo[bundleAvailability]": (comp)=>{
                            const stock = getTotalStock(comp.productId);
                            const canMake = Math.floor(stock / comp.quantity);
                            if (canMake < minAvailable) {
                                minAvailable = canMake;
                                limitingItem = comp.productName;
                            }
                        }
                    }["Dashboard.useMemo[bundleAvailability]"]);
                    return {
                        bundle,
                        available: minAvailable === Infinity ? 0 : minAvailable,
                        limitingItem
                    };
                }
            }["Dashboard.useMemo[bundleAvailability]"]);
        }
    }["Dashboard.useMemo[bundleAvailability]"], [
        state.bundles,
        state.inventory
    ]);
    // Active work orders
    const activeWorkOrders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Dashboard.useMemo[activeWorkOrders]": ()=>{
            return state.workOrders.filter({
                "Dashboard.useMemo[activeWorkOrders]": (wo)=>wo.status !== 'completed' && wo.status !== 'cancelled'
            }["Dashboard.useMemo[activeWorkOrders]"]).slice(0, 3);
        }
    }["Dashboard.useMemo[activeWorkOrders]"], [
        state.workOrders
    ]);
    // Expiring soon lots (within 30 days)
    const expiringSoonLots = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Dashboard.useMemo[expiringSoonLots]": ()=>{
            const now = new Date();
            const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
            return state.lots.filter({
                "Dashboard.useMemo[expiringSoonLots]": (lot)=>{
                    if (lot.status !== 'active' || !lot.expirationDate) return false;
                    const expDate = new Date(lot.expirationDate);
                    return expDate > now && expDate <= thirtyDaysFromNow;
                }
            }["Dashboard.useMemo[expiringSoonLots]"]).sort({
                "Dashboard.useMemo[expiringSoonLots]": (a, b)=>new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime()
            }["Dashboard.useMemo[expiringSoonLots]"]).slice(0, 4);
        }
    }["Dashboard.useMemo[expiringSoonLots]"], [
        state.lots
    ]);
    // Days until expiration helper
    const getDaysUntilExpiry = (date)=>{
        return Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    };
    // Calculate totals
    const totalInventoryValue = inventoryValuation.reduce((sum, loc)=>sum + loc.totalMsrpValue, 0);
    const totalUnits = inventoryValuation.reduce((sum, loc)=>sum + loc.unitCount, 0);
    const totalCostValue = inventoryValuation.reduce((sum, loc)=>sum + loc.totalCostValue, 0);
    const totalUnrealizedProfit = inventoryValuation.reduce((sum, loc)=>sum + loc.unrealizedProfit, 0);
    const avgMargin = totalInventoryValue > 0 ? totalUnrealizedProfit / totalInventoryValue * 100 : 0;
    // Channel performance from orders
    const channelPerformance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Dashboard.useMemo[channelPerformance]": ()=>{
            // Filter orders by selected date range
            const periodOrders = state.orders.filter({
                "Dashboard.useMemo[channelPerformance].periodOrders": (o)=>isInRange(o.createdAt)
            }["Dashboard.useMemo[channelPerformance].periodOrders"]);
            const shopifyOrders = periodOrders.filter({
                "Dashboard.useMemo[channelPerformance].shopifyOrders": (o)=>o.channel === 'shopify'
            }["Dashboard.useMemo[channelPerformance].shopifyOrders"]);
            const amazonOrders = periodOrders.filter({
                "Dashboard.useMemo[channelPerformance].amazonOrders": (o)=>o.channel === 'amazon_fba' || o.channel === 'amazon_fbm'
            }["Dashboard.useMemo[channelPerformance].amazonOrders"]);
            const shopifyRevenue = shopifyOrders.reduce({
                "Dashboard.useMemo[channelPerformance].shopifyRevenue": (sum, o)=>sum + o.total
            }["Dashboard.useMemo[channelPerformance].shopifyRevenue"], 0);
            const amazonRevenue = amazonOrders.reduce({
                "Dashboard.useMemo[channelPerformance].amazonRevenue": (sum, o)=>sum + o.total
            }["Dashboard.useMemo[channelPerformance].amazonRevenue"], 0);
            const totalRevenue = shopifyRevenue + amazonRevenue;
            return {
                shopify: {
                    orders: shopifyOrders.length,
                    revenue: shopifyRevenue,
                    profit: shopifyOrders.reduce({
                        "Dashboard.useMemo[channelPerformance]": (sum, o)=>sum + o.profit
                    }["Dashboard.useMemo[channelPerformance]"], 0),
                    pct: totalRevenue > 0 ? Math.round(shopifyRevenue / totalRevenue * 100) : 0
                },
                amazon: {
                    orders: amazonOrders.length,
                    revenue: amazonRevenue,
                    profit: amazonOrders.reduce({
                        "Dashboard.useMemo[channelPerformance]": (sum, o)=>sum + o.profit
                    }["Dashboard.useMemo[channelPerformance]"], 0),
                    pct: totalRevenue > 0 ? Math.round(amazonRevenue / totalRevenue * 100) : 0
                }
            };
        }
    }["Dashboard.useMemo[channelPerformance]"], [
        state.orders,
        isInRange
    ]);
    const formatCurrencyPrecise = (value)=>{
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };
    const formatNumber = (value)=>{
        return new Intl.NumberFormat('en-US').format(value);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-4 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-slate-400 text-sm mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 263,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            dateRange.label,
                                            " Revenue"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 264,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 262,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-3xl font-bold text-white",
                                children: formatCurrencyPrecise(dashboardStats.periodRevenue)
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 266,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-sm mt-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-400",
                                        children: [
                                            dashboardStats.periodOrders,
                                            " orders"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 268,
                                        columnNumber: 13
                                    }, this),
                                    dashboardStats.revenueChange !== 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `flex items-center gap-0.5 ${dashboardStats.revenueChange > 0 ? 'text-emerald-400' : 'text-red-400'}`,
                                        children: [
                                            dashboardStats.revenueChange > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__["ArrowUp"], {
                                                className: "h-3 w-3"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 271,
                                                columnNumber: 53
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__["ArrowDown"], {
                                                className: "h-3 w-3"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 271,
                                                columnNumber: 87
                                            }, this),
                                            Math.abs(dashboardStats.revenueChange).toFixed(1),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 270,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 267,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/page.tsx",
                        lineNumber: 261,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-600/20 border border-emerald-500/30 p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-emerald-300 text-sm mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 281,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            dateRange.label,
                                            " Profit"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 282,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 280,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-3xl font-bold text-emerald-400",
                                children: formatCurrencyPrecise(dashboardStats.periodProfit)
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 284,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-sm mt-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-300",
                                        children: [
                                            dashboardStats.periodRevenue > 0 ? (dashboardStats.periodProfit / dashboardStats.periodRevenue * 100).toFixed(1) : 0,
                                            "% margin"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 286,
                                        columnNumber: 13
                                    }, this),
                                    dashboardStats.profitChange !== 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `flex items-center gap-0.5 ${dashboardStats.profitChange > 0 ? 'text-emerald-400' : 'text-red-400'}`,
                                        children: [
                                            dashboardStats.profitChange > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__["ArrowUp"], {
                                                className: "h-3 w-3"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 293,
                                                columnNumber: 52
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__["ArrowDown"], {
                                                className: "h-3 w-3"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 293,
                                                columnNumber: 86
                                            }, this),
                                            Math.abs(dashboardStats.profitChange).toFixed(1),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 292,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 285,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/page.tsx",
                        lineNumber: 279,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-slate-400 text-sm mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 303,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Inventory Value"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 304,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 302,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-3xl font-bold text-white",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(totalInventoryValue)
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 306,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-slate-400 mt-1",
                                children: [
                                    formatNumber(totalUnits),
                                    " units on hand"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 307,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/page.tsx",
                        lineNumber: 301,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `rounded-xl backdrop-blur border p-5 ${dashboardStats.lowStockCount > 0 ? 'bg-amber-500/10 border-amber-500/30' : 'bg-slate-800/50 border-slate-700/50'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-slate-400 text-sm mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                        className: `h-4 w-4 ${dashboardStats.lowStockCount > 0 ? 'text-amber-400' : ''}`
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 317,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Low Stock Items"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 318,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 316,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `text-3xl font-bold ${dashboardStats.lowStockCount > 0 ? 'text-amber-400' : 'text-white'}`,
                                children: dashboardStats.lowStockCount
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 320,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-slate-400 mt-1",
                                children: [
                                    dashboardStats.outOfStockCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-red-400",
                                        children: [
                                            dashboardStats.outOfStockCount,
                                            " out of stock"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 325,
                                        columnNumber: 15
                                    }, this),
                                    dashboardStats.outOfStockCount === 0 && 'Below reorder point'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 323,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/page.tsx",
                        lineNumber: 311,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/page.tsx",
                lineNumber: 259,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-3 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-2 rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-5 py-4 border-b border-slate-700/50 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "font-semibold text-white",
                                                children: "Inventory Valuation"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 338,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-400",
                                                children: "Total value across all locations"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 339,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 337,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl font-bold text-white",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(totalInventoryValue)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 342,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-slate-400",
                                                children: [
                                                    formatNumber(totalUnits),
                                                    " units on hand"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 343,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 341,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 336,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-3 gap-4",
                                        children: inventoryValuation.map((loc, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: `/inventory?location=${loc.locationId}`,
                                                className: "bg-slate-900/50 rounded-lg p-4 hover:bg-slate-800/70 transition-colors group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 mb-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `w-8 h-8 rounded-lg flex items-center justify-center ${loc.type === 'warehouse' ? 'bg-blue-500/20' : loc.type === 'fba' ? 'bg-orange-500/20' : 'bg-amber-500/20'}`,
                                                                children: loc.type === 'warehouse' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$warehouse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Warehouse$3e$__["Warehouse"], {
                                                                    className: "h-4 w-4 text-blue-400"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                                                    lineNumber: 360,
                                                                    columnNumber: 25
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                                                    className: `h-4 w-4 ${loc.type === 'fba' ? 'text-orange-400' : 'text-amber-400'}`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                                                    lineNumber: 362,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                                lineNumber: 355,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm font-medium text-white group-hover:text-emerald-400 transition-colors",
                                                                        children: loc.locationName.includes('Cronk') ? 'Cronk WH' : loc.locationName.includes('USA') ? 'Amazon FBA' : loc.locationName.includes('Canada') ? 'Amazon CA' : loc.locationName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                                                        lineNumber: 366,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-xs text-slate-400",
                                                                        children: loc.type === 'warehouse' ? 'Primary' : loc.type === 'fba' ? 'Fulfilled by Amazon' : 'FBA Canada'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                                                        lineNumber: 371,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                                lineNumber: 365,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                                        lineNumber: 354,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between text-sm",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-slate-400",
                                                                        children: "Units"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                                                        lineNumber: 379,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-white font-medium",
                                                                        children: formatNumber(loc.unitCount)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                                                        lineNumber: 380,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                                lineNumber: 378,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between text-sm",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-slate-400",
                                                                        children: "MSRP Value"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                                                        lineNumber: 383,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-white font-medium",
                                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(loc.totalMsrpValue)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                                                        lineNumber: 384,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                                lineNumber: 382,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between text-sm",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-slate-400",
                                                                        children: "Cost Value"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                                                        lineNumber: 387,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-emerald-400 font-medium",
                                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(loc.totalCostValue)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                                                        lineNumber: 388,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                                lineNumber: 386,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                                        lineNumber: 377,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-3 pt-3 border-t border-slate-700/50",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between text-sm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-slate-400",
                                                                    children: "Potential Margin"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                                                    lineNumber: 393,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-emerald-400 font-bold",
                                                                    children: [
                                                                        loc.margin.toFixed(1),
                                                                        "%"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                                                    lineNumber: 394,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                                            lineNumber: 392,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                                        lineNumber: 391,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, loc.locationId, true, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 349,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 347,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 p-4 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-lg border border-emerald-500/20",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-400 text-sm",
                                                            children: "Unrealized Profit Potential"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                                            lineNumber: 405,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-2xl font-bold text-emerald-400",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(totalUnrealizedProfit)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                                            lineNumber: 406,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                                    lineNumber: 404,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-right",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-400 text-sm",
                                                            children: "Total Cost on Hand"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                                            lineNumber: 409,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xl font-bold text-white",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(totalCostValue)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                                            lineNumber: 410,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                                    lineNumber: 408,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-right",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-400 text-sm",
                                                            children: "Avg Margin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                                            lineNumber: 413,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xl font-bold text-emerald-400",
                                                            children: [
                                                                avgMargin.toFixed(1),
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                                            lineNumber: 414,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                                    lineNumber: 412,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                            lineNumber: 403,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 402,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 346,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/page.tsx",
                        lineNumber: 335,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-5 py-4 border-b border-slate-700/50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "font-semibold text-white",
                                        children: "Fulfillment Status"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 424,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-slate-400",
                                        children: "Current order pipeline"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 425,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 423,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-5 space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/fulfillment/pick?status=to_pick",
                                        className: "flex items-center justify-between p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg hover:bg-amber-500/20 transition-colors group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/30 transition-colors",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hand$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hand$3e$__["Hand"], {
                                                            className: "h-5 w-5 text-amber-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                                            lineNumber: 435,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                                        lineNumber: 434,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-left",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-medium text-white group-hover:text-amber-400 transition-colors",
                                                                children: "To Pick"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                                lineNumber: 438,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-slate-400",
                                                                children: "Awaiting picker"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                                lineNumber: 439,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                                        lineNumber: 437,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 433,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl font-bold text-amber-400",
                                                children: dashboardStats.toPick + dashboardStats.picking
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 442,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 429,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/fulfillment/pack?status=to_pack",
                                        className: "flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-colors group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                            className: "h-5 w-5 text-blue-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                                            lineNumber: 452,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                                        lineNumber: 451,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-left",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-medium text-white group-hover:text-blue-400 transition-colors",
                                                                children: "To Pack"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                                lineNumber: 455,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-slate-400",
                                                                children: "Picked, ready to pack"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                                lineNumber: 456,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                                        lineNumber: 454,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 450,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl font-bold text-blue-400",
                                                children: dashboardStats.toPack + dashboardStats.packing
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 459,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 446,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/fulfillment/shipping?status=ready",
                                        className: "flex items-center justify-between p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg hover:bg-purple-500/20 transition-colors group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                            className: "h-5 w-5 text-purple-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                                            lineNumber: 469,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                                        lineNumber: 468,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-medium text-white group-hover:text-purple-400 transition-colors",
                                                                children: "Ready to Ship"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                                lineNumber: 472,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-slate-400",
                                                                children: "Label printed"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                                lineNumber: 473,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 467,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl font-bold text-purple-400",
                                                children: dashboardStats.readyToShip
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 476,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 463,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/fulfillment/shipping?date=today",
                                        className: "flex items-center justify-between p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-colors group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                            className: "h-5 w-5 text-emerald-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                                            lineNumber: 486,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                                        lineNumber: 485,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-left",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-medium text-white group-hover:text-emerald-400 transition-colors",
                                                                children: "Shipped"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                                lineNumber: 489,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-slate-400",
                                                                children: dateRange.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                                lineNumber: 490,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                                        lineNumber: 488,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 484,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl font-bold text-emerald-400",
                                                children: dashboardStats.shippedInPeriod
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 493,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 480,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 pt-4 border-t border-slate-700/50",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-slate-400",
                                                    children: "Total Open Orders"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                                    lineNumber: 499,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-lg font-bold text-white",
                                                    children: dashboardStats.toPick + dashboardStats.picking + dashboardStats.toPack + dashboardStats.packing + dashboardStats.readyToShip
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                                    lineNumber: 500,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                            lineNumber: 498,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 497,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 427,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/page.tsx",
                        lineNumber: 422,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/page.tsx",
                lineNumber: 333,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-3 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-5 py-4 border-b border-slate-700/50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "font-semibold text-white",
                                        children: "Channel Performance"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 514,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-slate-400",
                                        children: dateRange.label
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 515,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 513,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-5 space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$DashboardStats$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChannelCard"], {
                                        href: "/orders?channel=shopify",
                                        icon: "fab fa-shopify",
                                        iconBgColor: "bg-green-600/20",
                                        iconTextColor: "text-green-400",
                                        name: "Shopify",
                                        orders: channelPerformance.shopify.orders,
                                        revenue: channelPerformance.shopify.revenue,
                                        profit: channelPerformance.shopify.profit,
                                        percentage: channelPerformance.shopify.pct,
                                        progressColor: "bg-green-500",
                                        formatCurrency: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"]
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 518,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$DashboardStats$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChannelCard"], {
                                        href: "/orders?channel=amazon",
                                        icon: "fab fa-amazon",
                                        iconBgColor: "bg-orange-500/20",
                                        iconTextColor: "text-orange-400",
                                        name: "Amazon",
                                        orders: channelPerformance.amazon.orders,
                                        revenue: channelPerformance.amazon.revenue,
                                        profit: channelPerformance.amazon.profit,
                                        percentage: channelPerformance.amazon.pct,
                                        progressColor: "bg-orange-500",
                                        formatCurrency: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"]
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 531,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 517,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/page.tsx",
                        lineNumber: 512,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-2 rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-5 py-4 border-b border-slate-700/50 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "font-semibold text-white",
                                                children: "Recent Orders"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 551,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-400",
                                                children: "Latest incoming orders"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 552,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 550,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/orders",
                                        className: "text-sm text-emerald-400 hover:text-emerald-300",
                                        children: "View All"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 554,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 549,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-x-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "w-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            className: "bg-slate-800/50",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "text-left text-xs text-slate-400 uppercase tracking-wider",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-5 py-3 font-medium",
                                                        children: "Order"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                                        lineNumber: 560,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-5 py-3 font-medium",
                                                        children: "Customer"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                                        lineNumber: 561,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-5 py-3 font-medium",
                                                        children: "Channel"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                                        lineNumber: 562,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-5 py-3 font-medium",
                                                        children: "Items"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                                        lineNumber: 563,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-5 py-3 font-medium",
                                                        children: "Total"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                                        lineNumber: 564,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-5 py-3 font-medium",
                                                        children: "Profit"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                                        lineNumber: 565,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-5 py-3 font-medium",
                                                        children: "Status"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                                        lineNumber: 566,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 559,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                            lineNumber: 558,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            className: "divide-y divide-slate-700/50",
                                            children: recentOrders.map((order)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "hover:bg-slate-800/30 transition-colors cursor-pointer",
                                                    onClick: ()=>router.push(`/orders/${order.id}`),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-5 py-3",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono text-sm text-white",
                                                                children: [
                                                                    "#",
                                                                    order.orderNumber
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                                lineNumber: 577,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                                            lineNumber: 576,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-5 py-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm text-white",
                                                                    children: order.customer.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                                                    lineNumber: 580,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs text-slate-400",
                                                                    children: [
                                                                        order.customer.address.city,
                                                                        ", ",
                                                                        order.customer.address.state
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                                                    lineNumber: 581,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                                            lineNumber: 579,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-5 py-3",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$fulfillment$2f$FulfillmentBadges$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChannelBadge"], {
                                                                channel: order.channel
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                                lineNumber: 584,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                                            lineNumber: 583,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-5 py-3 text-sm text-slate-300",
                                                            children: [
                                                                order.items.reduce((sum, item)=>sum + item.quantity, 0),
                                                                " items"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                                            lineNumber: 586,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-5 py-3 text-sm text-white font-medium",
                                                            children: formatCurrencyPrecise(order.total)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                                            lineNumber: 589,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-5 py-3 text-sm text-emerald-400 font-medium",
                                                            children: formatCurrencyPrecise(order.profit)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                                            lineNumber: 592,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-5 py-3",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$fulfillment$2f$FulfillmentBadges$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueueStatusBadge"], {
                                                                status: order.status
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                                lineNumber: 596,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                                            lineNumber: 595,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, order.id, true, {
                                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                                    lineNumber: 571,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                            lineNumber: 569,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                    lineNumber: 557,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 556,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/page.tsx",
                        lineNumber: 548,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/page.tsx",
                lineNumber: 510,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-3 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-5 py-4 border-b border-slate-700/50 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "font-semibold text-white",
                                                children: "Bundle Availability"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 612,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-400",
                                                children: "Virtual kit stock"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 613,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 611,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/inventory/bundles",
                                        className: "text-sm text-emerald-400 hover:text-emerald-300",
                                        children: "Manage"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 615,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 610,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-5 space-y-3",
                                children: [
                                    bundleAvailability.map(({ bundle, available, limitingItem })=>{
                                        const isOutOfStock = available === 0;
                                        const isLow = available > 0 && available < 50;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/inventory/bundles",
                                            className: "block p-3 bg-slate-900/50 rounded-lg hover:bg-slate-800/70 transition-colors group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-medium text-white group-hover:text-emerald-400 transition-colors",
                                                            children: bundle.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                                            lineNumber: 625,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `text-lg font-bold ${isOutOfStock ? 'text-red-400' : isLow ? 'text-amber-400' : 'text-emerald-400'}`,
                                                            children: available
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                                            lineNumber: 626,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                                    lineNumber: 624,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-slate-400 mb-2",
                                                    children: isOutOfStock ? 'Out of stock' : 'Available to sell'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                                    lineNumber: 630,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1 text-xs",
                                                    children: isOutOfStock ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                                className: "h-3 w-3 text-red-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                                lineNumber: 636,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-400",
                                                                children: "Missing:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                                lineNumber: 637,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-red-400",
                                                                children: limitingItem
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                                lineNumber: 638,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true) : isLow ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                                className: "h-3 w-3 text-amber-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                                lineNumber: 642,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-400",
                                                                children: "Limited by:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                                lineNumber: 643,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-amber-400",
                                                                children: limitingItem
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                                lineNumber: 644,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                                className: "h-3 w-3 text-emerald-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                                lineNumber: 648,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-400",
                                                                children: "All components in stock"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                                lineNumber: 649,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                                    lineNumber: 633,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, bundle.id, true, {
                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                            lineNumber: 623,
                                            columnNumber: 17
                                        }, this);
                                    }),
                                    bundleAvailability.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center py-6 text-slate-400",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                                                className: "h-8 w-8 mx-auto mb-2 opacity-50"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 658,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm",
                                                children: "No bundles configured"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 659,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 657,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 617,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/page.tsx",
                        lineNumber: 609,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-5 py-4 border-b border-slate-700/50 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "font-semibold text-white",
                                                children: "Active Work Orders"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 669,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-400",
                                                children: "Manufacturing in progress"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 670,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 668,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/operations/work-orders",
                                        className: "text-sm text-emerald-400 hover:text-emerald-300",
                                        children: "View All"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 672,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 667,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-5 space-y-3",
                                children: [
                                    activeWorkOrders.map((wo)=>{
                                        const totalRequired = wo.components.reduce((sum, c)=>sum + c.quantityRequired, 0);
                                        const totalUsed = wo.components.reduce((sum, c)=>sum + c.quantityUsed, 0);
                                        const progress = totalRequired > 0 ? Math.round(totalUsed / totalRequired * 100) : 0;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/operations/work-orders",
                                            className: "block p-3 bg-slate-900/50 rounded-lg hover:bg-slate-800/70 transition-colors group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-medium text-white group-hover:text-emerald-400 transition-colors",
                                                            children: wo.woNumber
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                                            lineNumber: 683,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `px-2 py-0.5 text-xs rounded-full ${wo.status === 'in_progress' ? 'bg-blue-500/10 text-blue-400' : wo.status === 'pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'}`,
                                                            children: wo.status === 'in_progress' ? 'In Progress' : wo.status === 'pending' ? 'Pending' : 'Complete'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                                            lineNumber: 684,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                                    lineNumber: 682,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-slate-400 mb-2",
                                                    children: [
                                                        wo.outputProductName,
                                                        " x ",
                                                        wo.quantityToProduce
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                                    lineNumber: 693,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1 h-2 bg-slate-700 rounded-full overflow-hidden",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `h-full rounded-full ${wo.status === 'completed' ? 'bg-emerald-500' : wo.status === 'in_progress' ? 'bg-blue-500' : 'bg-amber-500'}`,
                                                                style: {
                                                                    width: `${wo.status === 'completed' ? 100 : progress}%`
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                                lineNumber: 698,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                                            lineNumber: 697,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-slate-400",
                                                            children: [
                                                                wo.status === 'completed' ? 100 : progress,
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                                            lineNumber: 706,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                                    lineNumber: 696,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, wo.id, true, {
                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                            lineNumber: 681,
                                            columnNumber: 17
                                        }, this);
                                    }),
                                    activeWorkOrders.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center py-6 text-slate-400",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$factory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Factory$3e$__["Factory"], {
                                                className: "h-8 w-8 mx-auto mb-2 opacity-50"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 715,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm",
                                                children: "No active work orders"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 716,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 714,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 674,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/page.tsx",
                        lineNumber: 666,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-5 py-4 border-b border-slate-700/50 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "font-semibold text-white",
                                                children: "Low Stock Alerts"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 726,
                                                columnNumber: 15
                                            }, this),
                                            lowStockProducts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full",
                                                children: lowStockProducts.length
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 728,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 725,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/inventory",
                                        className: "text-sm text-emerald-400 hover:text-emerald-300",
                                        children: "View All"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 733,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 724,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-5 space-y-3",
                                children: [
                                    lowStockProducts.map((item)=>{
                                        const isCritical = item.currentQty === 0;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/inventory/${item.product.id}`,
                                            className: `block p-3 rounded-lg border transition-colors group ${isCritical ? 'bg-red-500/10 border-red-500/20 hover:bg-red-500/20' : 'bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between mb-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-medium text-white group-hover:text-emerald-400 transition-colors",
                                                            children: item.product.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                                            lineNumber: 750,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `font-bold ${isCritical ? 'text-red-400' : 'text-amber-400'}`,
                                                            children: item.currentQty
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                                            lineNumber: 751,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                                    lineNumber: 749,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-slate-400",
                                                    children: [
                                                        "Reorder point: ",
                                                        item.reorderPoint
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                                    lineNumber: 755,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `text-xs mt-1 ${isCritical ? 'text-red-400' : 'text-amber-400'}`,
                                                    children: isCritical ? 'Out of stock!' : 'Below reorder point'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                                    lineNumber: 756,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, item.product.id, true, {
                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                            lineNumber: 740,
                                            columnNumber: 17
                                        }, this);
                                    }),
                                    lowStockProducts.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center py-8 text-slate-400",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                className: "h-8 w-8 mx-auto mb-2 text-emerald-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 764,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm",
                                                children: "All items above reorder point"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/page.tsx",
                                                lineNumber: 765,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 763,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 735,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/page.tsx",
                        lineNumber: 723,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/page.tsx",
                lineNumber: 607,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-5 py-4 border-b border-slate-700/50 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "font-semibold text-white",
                                        children: "Expiring Soon"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 776,
                                        columnNumber: 13
                                    }, this),
                                    expiringSoonLots.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded-full",
                                        children: expiringSoonLots.length
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 778,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 775,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/inventory/lots?status=expiring_soon",
                                className: "text-sm text-emerald-400 hover:text-emerald-300",
                                children: "View All"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 783,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/page.tsx",
                        lineNumber: 774,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-5 space-y-3",
                        children: [
                            expiringSoonLots.map((lot)=>{
                                const daysUntil = getDaysUntilExpiry(lot.expirationDate);
                                const isUrgent = daysUntil <= 7;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `p-3 rounded-lg border ${isUrgent ? 'bg-red-500/10 border-red-500/20' : 'bg-amber-500/10 border-amber-500/20'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-medium text-white",
                                                    children: lot.productName
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                                    lineNumber: 800,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `font-bold text-sm ${isUrgent ? 'text-red-400' : 'text-amber-400'}`,
                                                    children: [
                                                        daysUntil,
                                                        "d"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                                    lineNumber: 801,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                            lineNumber: 799,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-slate-400 font-mono",
                                                    children: lot.lotNumber
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                                    lineNumber: 806,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-slate-400",
                                                    children: [
                                                        lot.quantity,
                                                        " units"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                                    lineNumber: 807,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                            lineNumber: 805,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1 mt-1 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                    className: "h-3 w-3 text-slate-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                                    lineNumber: 810,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: isUrgent ? 'text-red-400' : 'text-amber-400',
                                                    children: [
                                                        "Expires ",
                                                        new Date(lot.expirationDate).toLocaleDateString()
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                                    lineNumber: 811,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/page.tsx",
                                            lineNumber: 809,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, lot.id, true, {
                                    fileName: "[project]/app/(dashboard)/page.tsx",
                                    lineNumber: 791,
                                    columnNumber: 15
                                }, this);
                            }),
                            expiringSoonLots.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-8 text-slate-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                        className: "h-8 w-8 mx-auto mb-2 text-emerald-400"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 820,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm",
                                        children: "No lots expiring soon"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/page.tsx",
                                        lineNumber: 821,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 819,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/page.tsx",
                        lineNumber: 785,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/page.tsx",
                lineNumber: 773,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-semibold text-white mb-4",
                        children: "Quick Actions"
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/page.tsx",
                        lineNumber: 829,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-6 gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$DashboardStats$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuickActionCard"], {
                                href: "/orders/new",
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"],
                                iconColor: "text-emerald-400",
                                hoverBorderColor: "hover:border-emerald-500/30",
                                label: "New Order"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 831,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$DashboardStats$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuickActionCard"], {
                                href: "/operations/work-orders",
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$factory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Factory$3e$__["Factory"],
                                iconColor: "text-blue-400",
                                hoverBorderColor: "hover:border-blue-500/30",
                                label: "Work Order"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 832,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$DashboardStats$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuickActionCard"], {
                                href: "/inventory",
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"],
                                iconColor: "text-purple-400",
                                hoverBorderColor: "hover:border-purple-500/30",
                                label: "Adjust Stock"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 833,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$DashboardStats$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuickActionCard"], {
                                href: "/operations/purchase-orders",
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
                                iconColor: "text-amber-400",
                                hoverBorderColor: "hover:border-amber-500/30",
                                label: "Create PO"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 834,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$DashboardStats$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuickActionCard"], {
                                href: "/fulfillment/pick",
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hand$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hand$3e$__["Hand"],
                                iconColor: "text-cyan-400",
                                hoverBorderColor: "hover:border-cyan-500/30",
                                label: "Pick Orders"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 835,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$DashboardStats$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuickActionCard"], {
                                href: "/fulfillment/pack",
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"],
                                iconColor: "text-pink-400",
                                hoverBorderColor: "hover:border-pink-500/30",
                                label: "Pack Orders"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/page.tsx",
                                lineNumber: 836,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/page.tsx",
                        lineNumber: 830,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/page.tsx",
                lineNumber: 828,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(dashboard)/page.tsx",
        lineNumber: 257,
        columnNumber: 5
    }, this);
}
_s(Dashboard, "0fPZiXrKNkad6/M0ImUyyyHx8EQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"],
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$DateRangeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDateRange"]
    ];
});
_c = Dashboard;
var _c;
__turbopack_context__.k.register(_c, "Dashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_c6ff42e7._.js.map