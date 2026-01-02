(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/data/mockData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    "formatCurrency",
    ()=>formatCurrency,
    "formatCurrencyPrecise",
    ()=>formatCurrencyPrecise,
    "formatNumber",
    ()=>formatNumber,
    "formatPercent",
    ()=>formatPercent,
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
        description: '3-Part Starter Kit with Micro, Grow, and Bloom 1L',
        components: [
            {
                productId: 'prod-mic-1l',
                quantity: 1
            },
            {
                productId: 'prod-gro-1l',
                quantity: 1
            },
            {
                productId: 'prod-blm-1l',
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
        isActive: true
    },
    {
        id: 'bundle-2',
        sku: 'CNKIT-PRO',
        name: 'Pro Bundle',
        description: 'Professional Kit with 3-Part + CalMag + Bud Booster',
        components: [
            {
                productId: 'prod-mic-1l',
                quantity: 1
            },
            {
                productId: 'prod-gro-1l',
                quantity: 1
            },
            {
                productId: 'prod-blm-1l',
                quantity: 1
            },
            {
                productId: 'prod-cm-1l',
                quantity: 1
            },
            {
                productId: 'prod-bb-1l',
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
        isActive: true
    },
    {
        id: 'bundle-3',
        sku: 'CNKIT-COMPLETE',
        name: 'Complete System',
        description: 'Full nutrient line including all additives',
        components: [
            {
                productId: 'prod-mic-1l',
                quantity: 1
            },
            {
                productId: 'prod-gro-1l',
                quantity: 1
            },
            {
                productId: 'prod-blm-1l',
                quantity: 1
            },
            {
                productId: 'prod-cm-1l',
                quantity: 1
            },
            {
                productId: 'prod-bb-1l',
                quantity: 1
            },
            {
                productId: 'prod-mj-1l',
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
        isActive: true
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
const orders = [
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
        createdAt: '2024-12-30T08:15:00Z',
        updatedAt: '2024-12-30T08:15:00Z'
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
        createdAt: '2024-12-30T07:45:00Z',
        updatedAt: '2024-12-30T07:45:00Z'
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
        createdAt: '2024-12-30T06:30:00Z',
        updatedAt: '2024-12-30T09:00:00Z'
    },
    {
        id: 'order-4',
        orderNumber: 'SH-4519',
        externalId: 'SHP-5892339',
        channel: 'shopify',
        status: 'ready_to_ship',
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
                status: 'ready_to_ship',
                gripperStickersUsed: 2
            }
        ],
        totalVolume: 96,
        totalWeight: 40,
        gripperStickersNeeded: 2,
        suggestedBoxId: 'box-2',
        createdAt: '2024-12-30T05:20:00Z',
        updatedAt: '2024-12-30T10:15:00Z'
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
                shippedAt: '2024-12-30T14:30:00Z',
                gripperStickersUsed: 4
            }
        ],
        totalVolume: 368,
        totalWeight: 160,
        gripperStickersNeeded: 4,
        createdAt: '2024-12-30T04:00:00Z',
        updatedAt: '2024-12-30T14:30:00Z'
    }
];
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
function formatPercent(num) {
    return `${num >= 0 ? '+' : ''}${num.toFixed(1)}%`;
}
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
"[project]/app/bundles/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BundlesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/mockData.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function BundlesPage() {
    _s();
    const [showCreateModal, setShowCreateModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedBundle, setSelectedBundle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Calculate availability for a bundle
    const getAvailability = (bundle)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBundleAvailability"])(bundle);
    };
    // Calculate stats
    const activeBundles = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bundles"].filter((b)=>b.isActive).length;
    const fullyAvailable = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bundles"].filter((b)=>{
        const avail = getAvailability(b);
        return avail.available > 10;
    }).length;
    const limitedStock = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bundles"].filter((b)=>{
        const avail = getAvailability(b);
        return avail.available > 0 && avail.available <= 10;
    }).length;
    const outOfStock = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bundles"].filter((b)=>{
        const avail = getAvailability(b);
        return avail.available === 0;
    }).length;
    const bundleSalesMTD = 4280;
    const getStatusBadge = (bundle)=>{
        const avail = getAvailability(bundle);
        if (avail.available === 0) {
            return {
                text: 'Out of Stock',
                color: 'red'
            };
        } else if (avail.available <= 10) {
            return {
                text: 'Limited',
                color: 'amber'
            };
        }
        return {
            text: 'In Stock',
            color: 'emerald'
        };
    };
    const getProductName = (productId)=>{
        const product = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["products"].find((p)=>p.id === productId);
        return product?.name || productId;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold text-white",
                                children: "Bundles"
                            }, void 0, false, {
                                fileName: "[project]/app/bundles/page.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-400",
                                children: "Product bundles and kits with component tracking"
                            }, void 0, false, {
                                fileName: "[project]/app/bundles/page.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/bundles/page.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-sync-alt text-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/app/bundles/page.tsx",
                                        lineNumber: 57,
                                        columnNumber: 13
                                    }, this),
                                    "Sync Availability"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/bundles/page.tsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowCreateModal(true),
                                className: "px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-colors flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-plus text-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/app/bundles/page.tsx",
                                        lineNumber: 64,
                                        columnNumber: 13
                                    }, this),
                                    "New Bundle"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/bundles/page.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/bundles/page.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/bundles/page.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-5 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-slate-800/50 backdrop-blur border border-amber-500/30 rounded-xl p-4",
                        style: {
                            boxShadow: '0 0 20px rgba(251, 191, 36, 0.15)'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-layer-group text-amber-400"
                                    }, void 0, false, {
                                        fileName: "[project]/app/bundles/page.tsx",
                                        lineNumber: 75,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/bundles/page.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold text-amber-400",
                                            children: activeBundles
                                        }, void 0, false, {
                                            fileName: "[project]/app/bundles/page.tsx",
                                            lineNumber: 78,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-slate-400",
                                            children: "Active Bundles"
                                        }, void 0, false, {
                                            fileName: "[project]/app/bundles/page.tsx",
                                            lineNumber: 79,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/bundles/page.tsx",
                                    lineNumber: 77,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/bundles/page.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/bundles/page.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-slate-800/50 backdrop-blur border border-emerald-500/30 rounded-xl p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-check-circle text-emerald-400"
                                    }, void 0, false, {
                                        fileName: "[project]/app/bundles/page.tsx",
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/bundles/page.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold text-emerald-400",
                                            children: fullyAvailable
                                        }, void 0, false, {
                                            fileName: "[project]/app/bundles/page.tsx",
                                            lineNumber: 89,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-slate-400",
                                            children: "Fully Available"
                                        }, void 0, false, {
                                            fileName: "[project]/app/bundles/page.tsx",
                                            lineNumber: 90,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/bundles/page.tsx",
                                    lineNumber: 88,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/bundles/page.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/bundles/page.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-slate-800/50 backdrop-blur border border-amber-500/30 rounded-xl p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-exclamation-triangle text-amber-400"
                                    }, void 0, false, {
                                        fileName: "[project]/app/bundles/page.tsx",
                                        lineNumber: 97,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/bundles/page.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold text-amber-400",
                                            children: limitedStock
                                        }, void 0, false, {
                                            fileName: "[project]/app/bundles/page.tsx",
                                            lineNumber: 100,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-slate-400",
                                            children: "Limited Stock"
                                        }, void 0, false, {
                                            fileName: "[project]/app/bundles/page.tsx",
                                            lineNumber: 101,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/bundles/page.tsx",
                                    lineNumber: 99,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/bundles/page.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/bundles/page.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-slate-800/50 backdrop-blur border border-red-500/30 rounded-xl p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-times-circle text-red-400"
                                    }, void 0, false, {
                                        fileName: "[project]/app/bundles/page.tsx",
                                        lineNumber: 108,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/bundles/page.tsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold text-red-400",
                                            children: outOfStock
                                        }, void 0, false, {
                                            fileName: "[project]/app/bundles/page.tsx",
                                            lineNumber: 111,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-slate-400",
                                            children: "Out of Stock"
                                        }, void 0, false, {
                                            fileName: "[project]/app/bundles/page.tsx",
                                            lineNumber: 112,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/bundles/page.tsx",
                                    lineNumber: 110,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/bundles/page.tsx",
                            lineNumber: 106,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/bundles/page.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-dollar-sign text-slate-400"
                                    }, void 0, false, {
                                        fileName: "[project]/app/bundles/page.tsx",
                                        lineNumber: 119,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/bundles/page.tsx",
                                    lineNumber: 118,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold text-white",
                                            children: [
                                                "$",
                                                bundleSalesMTD.toLocaleString()
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/bundles/page.tsx",
                                            lineNumber: 122,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-slate-400",
                                            children: "Bundle Sales (MTD)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/bundles/page.tsx",
                                            lineNumber: 123,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/bundles/page.tsx",
                                    lineNumber: 121,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/bundles/page.tsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/bundles/page.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/bundles/page.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-ghost text-blue-400 text-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/app/bundles/page.tsx",
                                        lineNumber: 134,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/bundles/page.tsx",
                                    lineNumber: 133,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm font-medium text-white",
                                            children: "Virtual Bundle"
                                        }, void 0, false, {
                                            fileName: "[project]/app/bundles/page.tsx",
                                            lineNumber: 137,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-slate-400",
                                            children: "Pick components separately, assemble at pack"
                                        }, void 0, false, {
                                            fileName: "[project]/app/bundles/page.tsx",
                                            lineNumber: 138,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/bundles/page.tsx",
                                    lineNumber: 136,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/bundles/page.tsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-8 w-px bg-slate-700"
                        }, void 0, false, {
                            fileName: "[project]/app/bundles/page.tsx",
                            lineNumber: 141,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-box text-purple-400 text-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/app/bundles/page.tsx",
                                        lineNumber: 144,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/bundles/page.tsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm font-medium text-white",
                                            children: "Physical Bundle"
                                        }, void 0, false, {
                                            fileName: "[project]/app/bundles/page.tsx",
                                            lineNumber: 147,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-slate-400",
                                            children: "Pre-assembled, has own SKU and inventory"
                                        }, void 0, false, {
                                            fileName: "[project]/app/bundles/page.tsx",
                                            lineNumber: 148,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/bundles/page.tsx",
                                    lineNumber: 146,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/bundles/page.tsx",
                            lineNumber: 142,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-8 w-px bg-slate-700"
                        }, void 0, false, {
                            fileName: "[project]/app/bundles/page.tsx",
                            lineNumber: 151,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fab fa-amazon text-orange-400 text-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/app/bundles/page.tsx",
                                        lineNumber: 154,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/bundles/page.tsx",
                                    lineNumber: 153,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm font-medium text-white",
                                            children: "FBA Bundle"
                                        }, void 0, false, {
                                            fileName: "[project]/app/bundles/page.tsx",
                                            lineNumber: 157,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-slate-400",
                                            children: "Pre-kitted and shipped to Amazon FBA"
                                        }, void 0, false, {
                                            fileName: "[project]/app/bundles/page.tsx",
                                            lineNumber: 158,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/bundles/page.tsx",
                                    lineNumber: 156,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/bundles/page.tsx",
                            lineNumber: 152,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/bundles/page.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/bundles/page.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-3 gap-6",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bundles"].map((bundle)=>{
                    const status = getStatusBadge(bundle);
                    const avail = getAvailability(bundle);
                    const componentTotal = bundle.components.reduce((sum, c)=>{
                        const product = (0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductById"])(c.productId);
                        return sum + (product?.costs?.base || 0) * c.quantity;
                    }, 0);
                    const bundlePrice = bundle.prices.shopify;
                    const componentMsrpTotal = bundle.components.reduce((sum, c)=>{
                        const product = (0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductById"])(c.productId);
                        return sum + (product?.prices?.msrp || 0) * c.quantity;
                    }, 0);
                    const savings = componentMsrpTotal - bundlePrice;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `bg-slate-800/50 backdrop-blur border rounded-xl overflow-hidden ${status.color === 'emerald' ? 'border-emerald-500/30' : status.color === 'amber' ? 'border-amber-500/30' : 'border-red-500/30'} ${status.color === 'red' ? 'opacity-80' : ''}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `px-5 py-4 border-b border-slate-700/50 ${status.color === 'emerald' ? 'bg-emerald-500/5' : status.color === 'amber' ? 'bg-amber-500/5' : 'bg-red-500/5'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "fas fa-layer-group text-amber-400 text-xl"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/bundles/page.tsx",
                                                        lineNumber: 195,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/bundles/page.tsx",
                                                    lineNumber: 194,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-bold text-white",
                                                            children: bundle.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/bundles/page.tsx",
                                                            lineNumber: 198,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-slate-400",
                                                            children: [
                                                                "SKU: ",
                                                                bundle.sku
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/bundles/page.tsx",
                                                            lineNumber: 199,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/bundles/page.tsx",
                                                    lineNumber: 197,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/bundles/page.tsx",
                                            lineNumber: 193,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `px-2 py-1 text-xs rounded-full ${status.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' : status.color === 'amber' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'}`,
                                            children: status.text
                                        }, void 0, false, {
                                            fileName: "[project]/app/bundles/page.tsx",
                                            lineNumber: 202,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/bundles/page.tsx",
                                    lineNumber: 192,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/bundles/page.tsx",
                                lineNumber: 188,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-5 space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 flex-wrap",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "fas fa-ghost text-[10px]"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/bundles/page.tsx",
                                                    lineNumber: 214,
                                                    columnNumber: 21
                                                }, this),
                                                " Virtual"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/bundles/page.tsx",
                                            lineNumber: 213,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/bundles/page.tsx",
                                        lineNumber: 212,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-slate-400 mb-2",
                                                children: [
                                                    "COMPONENTS (",
                                                    bundle.components.length,
                                                    " SKUs)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/bundles/page.tsx",
                                                lineNumber: 220,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: [
                                                    bundle.components.slice(0, 3).map((component, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between text-sm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: `w-2 h-2 rounded-full ${avail.available > 0 ? 'bg-emerald-400' : 'bg-red-400'}`
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/bundles/page.tsx",
                                                                            lineNumber: 225,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-slate-300",
                                                                            children: getProductName(component.productId)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/bundles/page.tsx",
                                                                            lineNumber: 228,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/bundles/page.tsx",
                                                                    lineNumber: 224,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-slate-400",
                                                                    children: [
                                                                        "× ",
                                                                        component.quantity
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/bundles/page.tsx",
                                                                    lineNumber: 230,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, idx, true, {
                                                            fileName: "[project]/app/bundles/page.tsx",
                                                            lineNumber: 223,
                                                            columnNumber: 23
                                                        }, this)),
                                                    bundle.components.length > 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-slate-500",
                                                        children: [
                                                            "+",
                                                            bundle.components.length - 3,
                                                            " more components"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/bundles/page.tsx",
                                                        lineNumber: 234,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/bundles/page.tsx",
                                                lineNumber: 221,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/bundles/page.tsx",
                                        lineNumber: 219,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `rounded-lg p-3 ${status.color === 'red' ? 'bg-red-500/10 border border-red-500/20' : 'bg-slate-800/50'}`,
                                        children: status.color === 'red' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-red-400 font-medium",
                                                    children: "Cannot Fulfill"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/bundles/page.tsx",
                                                    lineNumber: 245,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-slate-400 mt-1",
                                                    children: [
                                                        "Limiting: ",
                                                        avail.limitingItem
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/bundles/page.tsx",
                                                    lineNumber: 246,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/bundles/page.tsx",
                                            lineNumber: 244,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 gap-3 text-center text-sm",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-lg font-bold text-blue-400",
                                                        children: avail.available
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/bundles/page.tsx",
                                                        lineNumber: 251,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-slate-500",
                                                        children: "Available to Fulfill"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/bundles/page.tsx",
                                                        lineNumber: 252,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/bundles/page.tsx",
                                                lineNumber: 250,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/bundles/page.tsx",
                                            lineNumber: 249,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/bundles/page.tsx",
                                        lineNumber: 240,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between pt-2 border-t border-slate-700",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-slate-400",
                                                        children: "Bundle Price"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/bundles/page.tsx",
                                                        lineNumber: 261,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-lg font-bold text-white",
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrencyPrecise"])(bundlePrice)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/bundles/page.tsx",
                                                        lineNumber: 262,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/bundles/page.tsx",
                                                lineNumber: 260,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-right",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-slate-400",
                                                        children: "vs Separate"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/bundles/page.tsx",
                                                        lineNumber: 265,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-emerald-400",
                                                        children: [
                                                            "Save ",
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrencyPrecise"])(savings > 0 ? savings : 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/bundles/page.tsx",
                                                        lineNumber: 266,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/bundles/page.tsx",
                                                lineNumber: 264,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/bundles/page.tsx",
                                        lineNumber: 259,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setSelectedBundle(bundle.id),
                                        className: "w-full px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-sm",
                                        children: "View Details"
                                    }, void 0, false, {
                                        fileName: "[project]/app/bundles/page.tsx",
                                        lineNumber: 270,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/bundles/page.tsx",
                                lineNumber: 210,
                                columnNumber: 15
                            }, this)
                        ]
                    }, bundle.id, true, {
                        fileName: "[project]/app/bundles/page.tsx",
                        lineNumber: 181,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/app/bundles/page.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-5 py-4 border-b border-slate-700/50 flex items-center justify-between",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "font-semibold text-white",
                                    children: "Component Usage Across Bundles"
                                }, void 0, false, {
                                    fileName: "[project]/app/bundles/page.tsx",
                                    lineNumber: 286,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-slate-400",
                                    children: "Which products are used in which bundles"
                                }, void 0, false, {
                                    fileName: "[project]/app/bundles/page.tsx",
                                    lineNumber: 287,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/bundles/page.tsx",
                            lineNumber: 285,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/bundles/page.tsx",
                        lineNumber: 284,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-slate-800/50 border-b border-slate-700/50",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "text-left text-xs text-slate-400 uppercase tracking-wider",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 font-medium",
                                                children: "Component"
                                            }, void 0, false, {
                                                fileName: "[project]/app/bundles/page.tsx",
                                                lineNumber: 294,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 font-medium text-right",
                                                children: "Available"
                                            }, void 0, false, {
                                                fileName: "[project]/app/bundles/page.tsx",
                                                lineNumber: 295,
                                                columnNumber: 17
                                            }, this),
                                            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bundles"].slice(0, 3).map((bundle)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-3 font-medium text-center",
                                                    children: bundle.name
                                                }, bundle.id, false, {
                                                    fileName: "[project]/app/bundles/page.tsx",
                                                    lineNumber: 297,
                                                    columnNumber: 19
                                                }, this)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 font-medium text-right",
                                                children: "Total Reserved"
                                            }, void 0, false, {
                                                fileName: "[project]/app/bundles/page.tsx",
                                                lineNumber: 299,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/bundles/page.tsx",
                                        lineNumber: 293,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/bundles/page.tsx",
                                    lineNumber: 292,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "divide-y divide-slate-700/50",
                                    children: Array.from(new Set(__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bundles"].flatMap((b)=>b.components.map((c)=>c.productId)))).slice(0, 6).map((productId)=>{
                                        const product = (0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductById"])(productId);
                                        if (!product) return null;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "hover:bg-slate-700/30 transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-3",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-6 h-6 bg-emerald-500/20 rounded flex items-center justify-center",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "fas fa-flask text-emerald-400 text-xs"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/bundles/page.tsx",
                                                                    lineNumber: 313,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/bundles/page.tsx",
                                                                lineNumber: 312,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm text-white",
                                                                children: product.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/bundles/page.tsx",
                                                                lineNumber: 315,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/bundles/page.tsx",
                                                        lineNumber: 311,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/bundles/page.tsx",
                                                    lineNumber: 310,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-3 text-right text-sm text-white",
                                                    children: "--"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/bundles/page.tsx",
                                                    lineNumber: 318,
                                                    columnNumber: 21
                                                }, this),
                                                __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bundles"].slice(0, 3).map((bundle)=>{
                                                    const component = bundle.components.find((c)=>c.productId === productId);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-3 text-center text-sm",
                                                        children: component ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-400",
                                                            children: [
                                                                "× ",
                                                                component.quantity
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/bundles/page.tsx",
                                                            lineNumber: 327,
                                                            columnNumber: 29
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-500",
                                                            children: "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/bundles/page.tsx",
                                                            lineNumber: 329,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, bundle.id, false, {
                                                        fileName: "[project]/app/bundles/page.tsx",
                                                        lineNumber: 325,
                                                        columnNumber: 25
                                                    }, this);
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-3 text-right text-sm text-amber-400",
                                                    children: "0"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/bundles/page.tsx",
                                                    lineNumber: 334,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, productId, true, {
                                            fileName: "[project]/app/bundles/page.tsx",
                                            lineNumber: 309,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/app/bundles/page.tsx",
                                    lineNumber: 302,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/bundles/page.tsx",
                            lineNumber: 291,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/bundles/page.tsx",
                        lineNumber: 290,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/bundles/page.tsx",
                lineNumber: 283,
                columnNumber: 7
            }, this),
            showCreateModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/70 backdrop-blur-sm",
                        onClick: ()=>setShowCreateModal(false)
                    }, void 0, false, {
                        fileName: "[project]/app/bundles/page.tsx",
                        lineNumber: 346,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto m-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 border-b border-slate-700 flex items-center justify-between sticky top-0 bg-slate-900 z-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-xl font-bold text-white",
                                                children: "Create Bundle"
                                            }, void 0, false, {
                                                fileName: "[project]/app/bundles/page.tsx",
                                                lineNumber: 350,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-slate-400",
                                                children: "Define a new product bundle"
                                            }, void 0, false, {
                                                fileName: "[project]/app/bundles/page.tsx",
                                                lineNumber: 351,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/bundles/page.tsx",
                                        lineNumber: 349,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowCreateModal(false),
                                        className: "p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: "fas fa-times"
                                        }, void 0, false, {
                                            fileName: "[project]/app/bundles/page.tsx",
                                            lineNumber: 354,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/bundles/page.tsx",
                                        lineNumber: 353,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/bundles/page.tsx",
                                lineNumber: 348,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm text-slate-400 mb-2",
                                                        children: "Bundle Name"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/bundles/page.tsx",
                                                        lineNumber: 361,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        placeholder: "e.g., Starter Kit",
                                                        className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/bundles/page.tsx",
                                                        lineNumber: 362,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/bundles/page.tsx",
                                                lineNumber: 360,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm text-slate-400 mb-2",
                                                        children: "SKU"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/bundles/page.tsx",
                                                        lineNumber: 365,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        placeholder: "e.g., STRKIT-01",
                                                        className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/bundles/page.tsx",
                                                        lineNumber: 366,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/bundles/page.tsx",
                                                lineNumber: 364,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/bundles/page.tsx",
                                        lineNumber: 359,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm text-slate-400 mb-2",
                                                children: "Bundle Type"
                                            }, void 0, false, {
                                                fileName: "[project]/app/bundles/page.tsx",
                                                lineNumber: 372,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-3 gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "flex items-center gap-3 p-3 bg-slate-800/50 border border-slate-700 rounded-xl cursor-pointer hover:border-blue-500/50 transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                defaultChecked: true,
                                                                className: "rounded bg-slate-700 border-slate-600 text-blue-500"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/bundles/page.tsx",
                                                                lineNumber: 375,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-white flex items-center gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                                className: "fas fa-ghost text-blue-400"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/bundles/page.tsx",
                                                                                lineNumber: 378,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            "Virtual"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/bundles/page.tsx",
                                                                        lineNumber: 377,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-xs text-slate-500",
                                                                        children: "Pick separately"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/bundles/page.tsx",
                                                                        lineNumber: 381,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/bundles/page.tsx",
                                                                lineNumber: 376,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/bundles/page.tsx",
                                                        lineNumber: 374,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "flex items-center gap-3 p-3 bg-slate-800/50 border border-slate-700 rounded-xl cursor-pointer hover:border-purple-500/50 transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                className: "rounded bg-slate-700 border-slate-600 text-purple-500"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/bundles/page.tsx",
                                                                lineNumber: 385,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-white flex items-center gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                                className: "fas fa-box text-purple-400"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/bundles/page.tsx",
                                                                                lineNumber: 388,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            "Physical"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/bundles/page.tsx",
                                                                        lineNumber: 387,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-xs text-slate-500",
                                                                        children: "Pre-assembled"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/bundles/page.tsx",
                                                                        lineNumber: 391,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/bundles/page.tsx",
                                                                lineNumber: 386,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/bundles/page.tsx",
                                                        lineNumber: 384,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "flex items-center gap-3 p-3 bg-slate-800/50 border border-slate-700 rounded-xl cursor-pointer hover:border-orange-500/50 transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                className: "rounded bg-slate-700 border-slate-600 text-orange-500"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/bundles/page.tsx",
                                                                lineNumber: 395,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-white flex items-center gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                                className: "fab fa-amazon text-orange-400"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/bundles/page.tsx",
                                                                                lineNumber: 398,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            "FBA"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/bundles/page.tsx",
                                                                        lineNumber: 397,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-xs text-slate-500",
                                                                        children: "Ship to Amazon"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/bundles/page.tsx",
                                                                        lineNumber: 401,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/bundles/page.tsx",
                                                                lineNumber: 396,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/bundles/page.tsx",
                                                        lineNumber: 394,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/bundles/page.tsx",
                                                lineNumber: 373,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/bundles/page.tsx",
                                        lineNumber: 371,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm text-slate-400 mb-2",
                                                children: "Components"
                                            }, void 0, false, {
                                                fileName: "[project]/app/bundles/page.tsx",
                                                lineNumber: 409,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3 p-3 bg-slate-800/50 border border-slate-700 rounded-xl",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "fas fa-flask text-emerald-400"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/bundles/page.tsx",
                                                                    lineNumber: 413,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/bundles/page.tsx",
                                                                lineNumber: 412,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-white",
                                                                        children: "1L Micro Classic"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/bundles/page.tsx",
                                                                        lineNumber: 416,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-xs text-slate-400",
                                                                        children: "124 available"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/bundles/page.tsx",
                                                                        lineNumber: 417,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/bundles/page.tsx",
                                                                lineNumber: 415,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                defaultValue: "1",
                                                                className: "w-16 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-center text-sm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/bundles/page.tsx",
                                                                lineNumber: 419,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "p-2 text-slate-500 hover:text-red-400",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "fas fa-trash"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/bundles/page.tsx",
                                                                    lineNumber: 421,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/bundles/page.tsx",
                                                                lineNumber: 420,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/bundles/page.tsx",
                                                        lineNumber: 411,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "w-full p-3 border-2 border-dashed border-slate-700 rounded-xl text-slate-400 hover:text-white hover:border-slate-600 transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                className: "fas fa-plus mr-2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/bundles/page.tsx",
                                                                lineNumber: 425,
                                                                columnNumber: 21
                                                            }, this),
                                                            "Add Component"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/bundles/page.tsx",
                                                        lineNumber: 424,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/bundles/page.tsx",
                                                lineNumber: 410,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/bundles/page.tsx",
                                        lineNumber: 408,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm text-slate-400 mb-2",
                                                        children: "Bundle Price"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/bundles/page.tsx",
                                                        lineNumber: 434,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400",
                                                                children: "$"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/bundles/page.tsx",
                                                                lineNumber: 436,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                defaultValue: "59.99",
                                                                step: "0.01",
                                                                className: "w-full bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:border-amber-500"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/bundles/page.tsx",
                                                                lineNumber: 437,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/bundles/page.tsx",
                                                        lineNumber: 435,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/bundles/page.tsx",
                                                lineNumber: 433,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm text-slate-400 mb-2",
                                                        children: "Component Total"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/bundles/page.tsx",
                                                        lineNumber: 441,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-400",
                                                                children: "$45.98"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/bundles/page.tsx",
                                                                lineNumber: 443,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-emerald-400 ml-2",
                                                                children: "Save $14.01"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/bundles/page.tsx",
                                                                lineNumber: 444,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/bundles/page.tsx",
                                                        lineNumber: 442,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/bundles/page.tsx",
                                                lineNumber: 440,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/bundles/page.tsx",
                                        lineNumber: 432,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3 pt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setShowCreateModal(false),
                                                className: "flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl",
                                                children: "Cancel"
                                            }, void 0, false, {
                                                fileName: "[project]/app/bundles/page.tsx",
                                                lineNumber: 450,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setShowCreateModal(false),
                                                className: "flex-1 px-4 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-medium",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "fas fa-plus mr-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/bundles/page.tsx",
                                                        lineNumber: 452,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Create Bundle"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/bundles/page.tsx",
                                                lineNumber: 451,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/bundles/page.tsx",
                                        lineNumber: 449,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/bundles/page.tsx",
                                lineNumber: 357,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/bundles/page.tsx",
                        lineNumber: 347,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/bundles/page.tsx",
                lineNumber: 345,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/bundles/page.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_s(BundlesPage, "VLBnnsRdVfgIyIRNlhJ+7rXmT7g=");
_c = BundlesPage;
var _c;
__turbopack_context__.k.register(_c, "BundlesPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_4c7f2448._.js.map