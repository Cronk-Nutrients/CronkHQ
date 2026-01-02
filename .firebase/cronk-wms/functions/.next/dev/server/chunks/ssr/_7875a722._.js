module.exports = [
"[project]/data/mockData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/app/settings/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SettingsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tag.js [app-ssr] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-ssr] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-ssr] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/link-2.js [app-ssr] (ecmascript) <export default as Link2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-ssr] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$toggle$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ToggleLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/toggle-left.js [app-ssr] (ecmascript) <export default as ToggleLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$toggle$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ToggleRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/toggle-right.js [app-ssr] (ecmascript) <export default as ToggleRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ruler.js [app-ssr] (ecmascript) <export default as Ruler>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scale.js [app-ssr] (ecmascript) <export default as Scale>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-ssr] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/mockData.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function SettingsPage() {
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('fulfillment');
    const [rules, setRules] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fulfillmentRules"]);
    const [boxes, setBoxes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shippingBoxes"]);
    const [warehouseLocations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locations"]);
    const [saveStatus, setSaveStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('idle');
    const toggleRule = (ruleId)=>{
        setRules((prev)=>prev.map((rule)=>rule.id === ruleId ? {
                    ...rule,
                    isActive: !rule.isActive
                } : rule));
    };
    const toggleBoxSmartEligible = (boxId)=>{
        setBoxes((prev)=>prev.map((box)=>box.id === boxId ? {
                    ...box,
                    isSmartBoxEligible: !box.isSmartBoxEligible
                } : box));
    };
    const handleSave = ()=>{
        setSaveStatus('saving');
        setTimeout(()=>{
            setSaveStatus('saved');
            setTimeout(()=>setSaveStatus('idle'), 2000);
        }, 1000);
    };
    const tabs = [
        {
            id: 'fulfillment',
            label: 'Fulfillment Rules',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"]
        },
        {
            id: 'boxes',
            label: 'Shipping Boxes',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"]
        },
        {
            id: 'locations',
            label: 'Locations',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"]
        },
        {
            id: 'integrations',
            label: 'Integrations',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__["Link2"]
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold text-white",
                                children: "Settings"
                            }, void 0, false, {
                                fileName: "[project]/app/settings/page.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-slate-400",
                                children: "Configure your warehouse management system"
                            }, void 0, false, {
                                fileName: "[project]/app/settings/page.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/settings/page.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSave,
                        disabled: saveStatus === 'saving',
                        className: "flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-600 transition-colors disabled:opacity-50",
                        children: saveStatus === 'saving' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/page.tsx",
                                    lineNumber: 87,
                                    columnNumber: 15
                                }, this),
                                "Saving..."
                            ]
                        }, void 0, true) : saveStatus === 'saved' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/page.tsx",
                                    lineNumber: 92,
                                    columnNumber: 15
                                }, this),
                                "Saved!"
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/page.tsx",
                                    lineNumber: 97,
                                    columnNumber: 15
                                }, this),
                                "Save Changes"
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/app/settings/page.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/settings/page.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 border-b border-slate-700/50 pb-4",
                children: tabs.map((tab)=>{
                    const Icon = tab.icon;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab(tab.id),
                        className: `flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/app/settings/page.tsx",
                                lineNumber: 118,
                                columnNumber: 15
                            }, this),
                            tab.label
                        ]
                    }, tab.id, true, {
                        fileName: "[project]/app/settings/page.tsx",
                        lineNumber: 109,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/app/settings/page.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            activeTab === 'fulfillment' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold text-white mb-4",
                                children: "Fulfillment Rules Engine"
                            }, void 0, false, {
                                fileName: "[project]/app/settings/page.tsx",
                                lineNumber: 129,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-400 mb-6",
                                children: "Configure automatic rules for order fulfillment. These rules are applied during packing and shipping."
                            }, void 0, false, {
                                fileName: "[project]/app/settings/page.tsx",
                                lineNumber: 132,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: rules.map((rule)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between rounded-lg bg-slate-700/30 p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `flex h-10 w-10 items-center justify-center rounded-lg ${rule.isActive ? 'bg-emerald-500/20' : 'bg-slate-700/50'}`,
                                                        children: [
                                                            rule.type === 'gripper_sticker' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                                className: `h-5 w-5 ${rule.isActive ? 'text-emerald-400' : 'text-slate-400'}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 150,
                                                                columnNumber: 25
                                                            }, this),
                                                            rule.type === 'box_selection' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                className: `h-5 w-5 ${rule.isActive ? 'text-emerald-400' : 'text-slate-400'}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 157,
                                                                columnNumber: 25
                                                            }, this),
                                                            rule.type === 'label_deduction' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                                className: `h-5 w-5 ${rule.isActive ? 'text-emerald-400' : 'text-slate-400'}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 164,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 144,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-medium text-white",
                                                                children: rule.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 172,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-slate-400",
                                                                children: [
                                                                    rule.type === 'gripper_sticker' && `Add ${rule.config.stickersPerBottle} sticker(s) per bottle`,
                                                                    rule.type === 'box_selection' && `Smart box selection with ${((rule.config.volumeBuffer || 1) - 1) * 100}% volume buffer`,
                                                                    rule.type === 'label_deduction' && `Deduct labels ${rule.config.deductOnPOCreate ? 'when PO is created' : 'when PO is received'}`
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 173,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 171,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 143,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>toggleRule(rule.id),
                                                className: "text-slate-400 hover:text-white transition-colors",
                                                children: rule.isActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$toggle$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ToggleRight$3e$__["ToggleRight"], {
                                                    className: "h-8 w-8 text-emerald-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/page.tsx",
                                                    lineNumber: 194,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$toggle$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ToggleLeft$3e$__["ToggleLeft"], {
                                                    className: "h-8 w-8"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/page.tsx",
                                                    lineNumber: 196,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 189,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, rule.id, true, {
                                        fileName: "[project]/app/settings/page.tsx",
                                        lineNumber: 139,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/settings/page.tsx",
                                lineNumber: 137,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/settings/page.tsx",
                        lineNumber: 128,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-md font-semibold text-white mb-4",
                                children: "Gripper Sticker Configuration"
                            }, void 0, false, {
                                fileName: "[project]/app/settings/page.tsx",
                                lineNumber: 206,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 gap-4 md:grid-cols-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm text-slate-400 mb-2",
                                                children: "Stickers per bottle"
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 211,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                defaultValue: 1,
                                                min: 0,
                                                max: 5,
                                                className: "w-full rounded-lg bg-slate-700/50 border border-slate-600/50 py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 214,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/settings/page.tsx",
                                        lineNumber: 210,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm text-slate-400 mb-2",
                                                children: "Gripper SKU to deduct"
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 223,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                className: "w-full rounded-lg bg-slate-700/50 border border-slate-600/50 py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "prod-9",
                                                    children: "GRIP-100 - Gripper Stickers (100pk)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/page.tsx",
                                                    lineNumber: 227,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 226,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/settings/page.tsx",
                                        lineNumber: 222,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/settings/page.tsx",
                                lineNumber: 209,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 rounded-lg bg-blue-500/10 border border-blue-500/30 p-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                            className: "h-4 w-4 text-blue-400 mt-0.5"
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/page.tsx",
                                            lineNumber: 233,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-blue-300",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-medium",
                                                    children: "How it works:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/page.tsx",
                                                    lineNumber: 235,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1",
                                                    children: "When an order ships, the system automatically deducts 1 gripper sticker per bottle from inventory. For bundles, it counts the individual bottles within."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/page.tsx",
                                                    lineNumber: 236,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/settings/page.tsx",
                                            lineNumber: 234,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/settings/page.tsx",
                                    lineNumber: 232,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/settings/page.tsx",
                                lineNumber: 231,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/settings/page.tsx",
                        lineNumber: 205,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-md font-semibold text-white mb-4",
                                children: "PO Label Auto-Deduction"
                            }, void 0, false, {
                                fileName: "[project]/app/settings/page.tsx",
                                lineNumber: 248,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-white",
                                                        children: "Deduct labels on PO creation"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 254,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-slate-400",
                                                        children: "Labels are reserved immediately when a Purchase Order is created"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 253,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$toggle$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ToggleRight$3e$__["ToggleRight"], {
                                                className: "h-8 w-8 text-emerald-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 259,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/settings/page.tsx",
                                        lineNumber: 252,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-white",
                                                        children: "Show warning for low label stock"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 263,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-slate-400",
                                                        children: "Alert when label inventory is insufficient for PO quantity"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 264,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 262,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$toggle$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ToggleRight$3e$__["ToggleRight"], {
                                                className: "h-8 w-8 text-emerald-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 268,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/settings/page.tsx",
                                        lineNumber: 261,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-white",
                                                        children: "Auto-add label cost to COGS"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 272,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-slate-400",
                                                        children: "Automatically include label cost in product COGS calculation"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 273,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 271,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$toggle$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ToggleRight$3e$__["ToggleRight"], {
                                                className: "h-8 w-8 text-emerald-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 277,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/settings/page.tsx",
                                        lineNumber: 270,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/settings/page.tsx",
                                lineNumber: 251,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/settings/page.tsx",
                        lineNumber: 247,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/settings/page.tsx",
                lineNumber: 127,
                columnNumber: 9
            }, this),
            activeTab === 'boxes' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-semibold text-white",
                                                children: "Shipping Boxes"
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 290,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-slate-400",
                                                children: "Configure box dimensions for smart box selection"
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 291,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/settings/page.tsx",
                                        lineNumber: 289,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "flex items-center gap-2 rounded-lg bg-slate-700 px-3 py-2 text-sm font-medium text-white hover:bg-slate-600 transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 296,
                                                columnNumber: 17
                                            }, this),
                                            "Add Box"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/settings/page.tsx",
                                        lineNumber: 295,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/settings/page.tsx",
                                lineNumber: 288,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-x-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "w-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "border-b border-slate-700/50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "pb-3 text-left text-xs font-medium text-slate-400 uppercase",
                                                        children: "Box"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 305,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "pb-3 text-left text-xs font-medium text-slate-400 uppercase",
                                                        children: "Dimensions (L×W×H)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 308,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "pb-3 text-right text-xs font-medium text-slate-400 uppercase",
                                                        children: "Volume"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 311,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "pb-3 text-right text-xs font-medium text-slate-400 uppercase",
                                                        children: "Max Weight"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 314,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "pb-3 text-right text-xs font-medium text-slate-400 uppercase",
                                                        children: "Cost"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 317,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "pb-3 text-center text-xs font-medium text-slate-400 uppercase",
                                                        children: "Smart Eligible"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 320,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 304,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/page.tsx",
                                            lineNumber: 303,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            className: "divide-y divide-slate-700/30",
                                            children: boxes.map((box)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "hover:bg-slate-700/20",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-4",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm font-medium text-white",
                                                                        children: box.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/settings/page.tsx",
                                                                        lineNumber: 330,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-slate-400",
                                                                        children: box.sku
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/settings/page.tsx",
                                                                        lineNumber: 331,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 329,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/page.tsx",
                                                            lineNumber: 328,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-4",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1 text-sm text-slate-300",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__["Ruler"], {
                                                                        className: "h-4 w-4 text-slate-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/settings/page.tsx",
                                                                        lineNumber: 336,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    box.dimensions.length,
                                                                    '" × ',
                                                                    box.dimensions.width,
                                                                    '" ×',
                                                                    ' ',
                                                                    box.dimensions.height,
                                                                    '"'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 335,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/page.tsx",
                                                            lineNumber: 334,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-4 text-right",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm text-slate-300",
                                                                children: [
                                                                    box.volume.toLocaleString(),
                                                                    " cu in"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 342,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/page.tsx",
                                                            lineNumber: 341,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-4 text-right",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-end gap-1 text-sm text-slate-300",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"], {
                                                                        className: "h-4 w-4 text-slate-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/settings/page.tsx",
                                                                        lineNumber: 348,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    (box.maxWeight / 16).toFixed(1),
                                                                    " lbs"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 347,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/page.tsx",
                                                            lineNumber: 346,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-4 text-right",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-end gap-1 text-sm text-slate-300",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
                                                                        className: "h-4 w-4 text-slate-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/settings/page.tsx",
                                                                        lineNumber: 354,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    box.cost.toFixed(2)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 353,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/page.tsx",
                                                            lineNumber: 352,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-4 text-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>toggleBoxSmartEligible(box.id),
                                                                className: "inline-flex items-center justify-center",
                                                                children: box.isSmartBoxEligible ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-medium text-emerald-400",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                            className: "h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/settings/page.tsx",
                                                                            lineNumber: 365,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        "Yes"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/settings/page.tsx",
                                                                    lineNumber: 364,
                                                                    columnNumber: 29
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "inline-flex items-center rounded-full bg-slate-700/50 px-2.5 py-1 text-xs font-medium text-slate-400",
                                                                    children: "No"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/settings/page.tsx",
                                                                    lineNumber: 369,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 359,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/page.tsx",
                                                            lineNumber: 358,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, box.id, true, {
                                                    fileName: "[project]/app/settings/page.tsx",
                                                    lineNumber: 327,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/page.tsx",
                                            lineNumber: 325,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/settings/page.tsx",
                                    lineNumber: 302,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/settings/page.tsx",
                                lineNumber: 301,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/settings/page.tsx",
                        lineNumber: 287,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl bg-blue-500/10 border border-blue-500/30 p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                    className: "h-5 w-5 text-blue-400 mt-0.5"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/page.tsx",
                                    lineNumber: 384,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-blue-300",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-medium",
                                            children: "Smart Box Selection"
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/page.tsx",
                                            lineNumber: 386,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1",
                                            children: 'When "Smart Eligible" is enabled, the system will automatically suggest this box size when packing orders. Boxes are selected based on the smallest eligible box that fits the order volume (with a 10% buffer) and weight requirements.'
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/page.tsx",
                                            lineNumber: 387,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/settings/page.tsx",
                                    lineNumber: 385,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/settings/page.tsx",
                            lineNumber: 383,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/settings/page.tsx",
                        lineNumber: 382,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/settings/page.tsx",
                lineNumber: 286,
                columnNumber: 9
            }, this),
            activeTab === 'locations' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg font-semibold text-white",
                                            children: "Warehouse Locations"
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/page.tsx",
                                            lineNumber: 405,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-slate-400",
                                            children: "Manage your inventory locations"
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/page.tsx",
                                            lineNumber: 406,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/settings/page.tsx",
                                    lineNumber: 404,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "flex items-center gap-2 rounded-lg bg-slate-700 px-3 py-2 text-sm font-medium text-white hover:bg-slate-600 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/page.tsx",
                                            lineNumber: 411,
                                            columnNumber: 17
                                        }, this),
                                        "Add Location"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/settings/page.tsx",
                                    lineNumber: 410,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/settings/page.tsx",
                            lineNumber: 403,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 gap-4 md:grid-cols-2",
                            children: warehouseLocations.map((location)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg bg-slate-700/30 p-4 border border-slate-600/30",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `flex h-10 w-10 items-center justify-center rounded-lg ${location.type === 'warehouse' ? 'bg-emerald-500/20' : location.type === 'fba' ? 'bg-amber-500/20' : location.type === 'fbm' ? 'bg-blue-500/20' : 'bg-purple-500/20'}`,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                            className: `h-5 w-5 ${location.type === 'warehouse' ? 'text-emerald-400' : location.type === 'fba' ? 'text-amber-400' : location.type === 'fbm' ? 'text-blue-400' : 'text-purple-400'}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/page.tsx",
                                                            lineNumber: 435,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 424,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-medium text-white",
                                                                children: location.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 448,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-slate-400 capitalize",
                                                                children: location.type.replace('_', ' ')
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 451,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 447,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 423,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `rounded-full px-2.5 py-1 text-xs font-medium ${location.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700/50 text-slate-400'}`,
                                                children: location.isActive ? 'Active' : 'Inactive'
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 456,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/settings/page.tsx",
                                        lineNumber: 422,
                                        columnNumber: 19
                                    }, this)
                                }, location.id, false, {
                                    fileName: "[project]/app/settings/page.tsx",
                                    lineNumber: 418,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/settings/page.tsx",
                            lineNumber: 416,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/settings/page.tsx",
                    lineNumber: 402,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/settings/page.tsx",
                lineNumber: 401,
                columnNumber: 9
            }, this),
            activeTab === 'integrations' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold text-white mb-4",
                                children: "Connected"
                            }, void 0, false, {
                                fileName: "[project]/app/settings/page.tsx",
                                lineNumber: 478,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg bg-slate-700/30 p-4 border border-emerald-500/30",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "fab fa-shopify text-xl text-green-400"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/settings/page.tsx",
                                                                    lineNumber: 485,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 484,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm font-medium text-white",
                                                                        children: "Shopify"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/settings/page.tsx",
                                                                        lineNumber: 488,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-slate-400",
                                                                        children: "Orders & Inventory"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/settings/page.tsx",
                                                                        lineNumber: 489,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 487,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 483,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 493,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-emerald-400",
                                                                children: "Live"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 494,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 492,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 482,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 pt-3 border-t border-slate-600/50 flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-slate-400",
                                                        children: "cronknutrients.myshopify.com"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 498,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "text-xs text-slate-400 hover:text-white",
                                                        children: "Configure"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 499,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 497,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/settings/page.tsx",
                                        lineNumber: 481,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg bg-slate-700/30 p-4 border border-emerald-500/30",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "fab fa-amazon text-xl text-orange-400"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/settings/page.tsx",
                                                                    lineNumber: 508,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 507,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm font-medium text-white",
                                                                        children: "Amazon SP-API"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/settings/page.tsx",
                                                                        lineNumber: 511,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-slate-400",
                                                                        children: "FBA & FBM"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/settings/page.tsx",
                                                                        lineNumber: 512,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 510,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 506,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 516,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-emerald-400",
                                                                children: "Live"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 517,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 515,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 505,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 pt-3 border-t border-slate-600/50 flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-slate-400",
                                                        children: "Seller: Cronk Nutrients LLC"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 521,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "text-xs text-slate-400 hover:text-white",
                                                        children: "Configure"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 522,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 520,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/settings/page.tsx",
                                        lineNumber: 504,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg bg-slate-700/30 p-4 border border-emerald-500/30",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                                    className: "h-5 w-5 text-emerald-400"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/settings/page.tsx",
                                                                    lineNumber: 531,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 530,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm font-medium text-white",
                                                                        children: "Veeqo"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/settings/page.tsx",
                                                                        lineNumber: 534,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-slate-400",
                                                                        children: "Shipping & Labels"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/settings/page.tsx",
                                                                        lineNumber: 535,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 533,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 529,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 539,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-emerald-400",
                                                                children: "Live"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 540,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 538,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 528,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 pt-3 border-t border-slate-600/50 flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-slate-400",
                                                        children: "Last sync: 2 min ago"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 544,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "text-xs text-slate-400 hover:text-white",
                                                        children: "Configure"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 545,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 543,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/settings/page.tsx",
                                        lineNumber: 527,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg bg-slate-700/30 p-4 border border-emerald-500/30",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex h-10 w-10 items-center justify-center rounded-lg bg-green-600/20",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
                                                                    className: "h-5 w-5 text-green-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/settings/page.tsx",
                                                                    lineNumber: 554,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 553,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm font-medium text-white",
                                                                        children: "QuickBooks Online"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/settings/page.tsx",
                                                                        lineNumber: 557,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-slate-400",
                                                                        children: "Accounting"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/settings/page.tsx",
                                                                        lineNumber: 558,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 556,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 552,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 562,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-emerald-400",
                                                                children: "Live"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 563,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 561,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 551,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 pt-3 border-t border-slate-600/50 flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-slate-400",
                                                        children: "Cronk Nutrients LLC"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 567,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "text-xs text-slate-400 hover:text-white",
                                                        children: "Configure"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 568,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 566,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/settings/page.tsx",
                                        lineNumber: 550,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/settings/page.tsx",
                                lineNumber: 479,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/settings/page.tsx",
                        lineNumber: 477,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold text-white mb-4",
                                children: "Available Integrations"
                            }, void 0, false, {
                                fileName: "[project]/app/settings/page.tsx",
                                lineNumber: 576,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg bg-slate-700/30 p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 mb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "fas fa-store text-blue-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/page.tsx",
                                                            lineNumber: 582,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 581,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-medium text-white",
                                                                children: "Walmart"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 585,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-slate-400",
                                                                children: "Marketplace"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 586,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 584,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 580,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-400 mb-3",
                                                children: "Sync orders and inventory with Walmart Marketplace"
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 589,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "w-full flex items-center justify-center gap-2 rounded-lg bg-blue-500/20 px-3 py-2 text-sm font-medium text-blue-400 hover:bg-blue-500/30 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__["Link2"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 591,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Connect"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 590,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/settings/page.tsx",
                                        lineNumber: 579,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg bg-slate-700/30 p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 mb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/20",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "fas fa-ship text-cyan-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/page.tsx",
                                                            lineNumber: 600,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 599,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-medium text-white",
                                                                children: "ShipStation"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 603,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-slate-400",
                                                                children: "Shipping"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 604,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 602,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 598,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-400 mb-3",
                                                children: "Alternative shipping & label printing integration"
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 607,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "w-full flex items-center justify-center gap-2 rounded-lg bg-cyan-500/20 px-3 py-2 text-sm font-medium text-cyan-400 hover:bg-cyan-500/30 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__["Link2"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 609,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Connect"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 608,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/settings/page.tsx",
                                        lineNumber: 597,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg bg-slate-700/30 p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 mb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                            className: "h-5 w-5 text-orange-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/page.tsx",
                                                            lineNumber: 618,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 617,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-medium text-white",
                                                                children: "Zapier"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 621,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-slate-400",
                                                                children: "Automation"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 622,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 620,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 616,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-400 mb-3",
                                                children: "Connect with 5,000+ apps via automated workflows"
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 625,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "w-full flex items-center justify-center gap-2 rounded-lg bg-orange-500/20 px-3 py-2 text-sm font-medium text-orange-400 hover:bg-orange-500/30 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__["Link2"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 627,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Connect"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 626,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/settings/page.tsx",
                                        lineNumber: 615,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg bg-slate-700/30 p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 mb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "fab fa-wordpress text-purple-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/page.tsx",
                                                            lineNumber: 636,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 635,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-medium text-white",
                                                                children: "WooCommerce"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 639,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-slate-400",
                                                                children: "E-commerce"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 640,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 638,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 634,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-400 mb-3",
                                                children: "Sync with WordPress WooCommerce stores"
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 643,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "w-full flex items-center justify-center gap-2 rounded-lg bg-purple-500/20 px-3 py-2 text-sm font-medium text-purple-400 hover:bg-purple-500/30 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__["Link2"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 645,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Connect"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 644,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/settings/page.tsx",
                                        lineNumber: 633,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg bg-slate-700/30 p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 mb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600/20",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "fab fa-etsy text-orange-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/page.tsx",
                                                            lineNumber: 654,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 653,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-medium text-white",
                                                                children: "Etsy"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 657,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-slate-400",
                                                                children: "Marketplace"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 658,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 656,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 652,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-400 mb-3",
                                                children: "Manage Etsy orders and inventory"
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 661,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "w-full flex items-center justify-center gap-2 rounded-lg bg-orange-600/20 px-3 py-2 text-sm font-medium text-orange-500 hover:bg-orange-600/30 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__["Link2"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 663,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Connect"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 662,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/settings/page.tsx",
                                        lineNumber: 651,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg bg-slate-700/30 p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 mb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "fab fa-ebay text-blue-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/page.tsx",
                                                            lineNumber: 672,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 671,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-medium text-white",
                                                                children: "eBay"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 675,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-slate-400",
                                                                children: "Marketplace"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/page.tsx",
                                                                lineNumber: 676,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 674,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 670,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-400 mb-3",
                                                children: "Connect your eBay seller account"
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 679,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600/20 px-3 py-2 text-sm font-medium text-blue-500 hover:bg-blue-600/30 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__["Link2"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/page.tsx",
                                                        lineNumber: 681,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Connect"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 680,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/settings/page.tsx",
                                        lineNumber: 669,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/settings/page.tsx",
                                lineNumber: 577,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/settings/page.tsx",
                        lineNumber: 575,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-semibold text-white",
                                                children: "API Access"
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 692,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-slate-400",
                                                children: "Manage API keys for custom integrations"
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 693,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/settings/page.tsx",
                                        lineNumber: 691,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "flex items-center gap-2 rounded-lg bg-slate-700 px-3 py-2 text-sm font-medium text-white hover:bg-slate-600 transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "fas fa-key"
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/page.tsx",
                                                lineNumber: 696,
                                                columnNumber: 17
                                            }, this),
                                            "Generate Key"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/settings/page.tsx",
                                        lineNumber: 695,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/settings/page.tsx",
                                lineNumber: 690,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-lg bg-slate-700/30 p-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium text-white font-mono",
                                                    children: "ck_••••••••••••••••"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/page.tsx",
                                                    lineNumber: 703,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-slate-400",
                                                    children: "Created Dec 1, 2024 • Read/Write"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/page.tsx",
                                                    lineNumber: 704,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/settings/page.tsx",
                                            lineNumber: 702,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "text-xs text-slate-400 hover:text-white px-2 py-1",
                                                    children: "Copy"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/page.tsx",
                                                    lineNumber: 707,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "text-xs text-red-400 hover:text-red-300 px-2 py-1",
                                                    children: "Revoke"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/page.tsx",
                                                    lineNumber: 708,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/settings/page.tsx",
                                            lineNumber: 706,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/settings/page.tsx",
                                    lineNumber: 701,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/settings/page.tsx",
                                lineNumber: 700,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/settings/page.tsx",
                        lineNumber: 689,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/settings/page.tsx",
                lineNumber: 475,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/settings/page.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_7875a722._.js.map