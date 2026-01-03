module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/firebase-admin.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "adminDb",
    ()=>getAdminDb,
    "getAdminDb",
    ()=>getAdminDb
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__ = __turbopack_context__.i("[externals]/firebase-admin/app [external] (firebase-admin/app, esm_import, [project]/node_modules/firebase-admin)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__ = __turbopack_context__.i("[externals]/firebase-admin/firestore [external] (firebase-admin/firestore, esm_import, [project]/node_modules/firebase-admin)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
let adminApp;
let adminDb;
function getAdminApp() {
    if (adminApp) {
        return adminApp;
    }
    const apps = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["getApps"])();
    if (apps.length > 0) {
        adminApp = apps[0];
        return adminApp;
    }
    // Initialize Firebase Admin
    // For production, use environment variables
    // For local development, you can use a service account JSON file
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    if (!projectId || !clientEmail || !privateKey) {
        throw new Error('Firebase Admin SDK credentials not found. Please set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY environment variables.');
    }
    adminApp = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["initializeApp"])({
        credential: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["cert"])({
            projectId,
            clientEmail,
            privateKey
        })
    });
    return adminApp;
}
function getAdminDb() {
    if (adminDb) {
        return adminDb;
    }
    getAdminApp();
    adminDb = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["getFirestore"])();
    return adminDb;
}
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/app/api/shopify/sync-orders/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase-admin.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__ = __turbopack_context__.i("[externals]/firebase-admin/firestore [external] (firebase-admin/firestore, esm_import, [project]/node_modules/firebase-admin)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
async function POST(request) {
    try {
        const body = await request.json();
        const { organizationId, importMode = 'unfulfilled', startDate, endDate, includeStatus = 'any' // 'any' | 'open' | 'closed' | 'cancelled'
         } = body;
        if (!organizationId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Missing organization ID'
            }, {
                status: 400
            });
        }
        let adminDb;
        try {
            adminDb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAdminDb"])();
        } catch (adminError) {
            console.error('Firebase Admin init error:', adminError);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Server configuration error. Please contact support.'
            }, {
                status: 500
            });
        }
        // Get Shopify credentials
        const orgDoc = await adminDb.collection('organizations').doc(organizationId).get();
        if (!orgDoc.exists) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Organization not found'
            }, {
                status: 404
            });
        }
        const orgData = orgDoc.data();
        const shopify = orgData?.shopify;
        if (!shopify?.isConnected || !shopify?.accessToken) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Shopify not connected'
            }, {
                status: 400
            });
        }
        // Build query parameters based on import mode
        const queryParams = new URLSearchParams();
        queryParams.set('limit', '250');
        if (importMode === 'unfulfilled') {
            queryParams.set('status', 'open');
            queryParams.set('fulfillment_status', 'unfulfilled');
        } else if (importMode === 'date_range') {
            if (startDate) {
                queryParams.set('created_at_min', new Date(startDate).toISOString());
            }
            if (endDate) {
                queryParams.set('created_at_max', new Date(endDate).toISOString());
            }
            if (includeStatus !== 'any') {
                queryParams.set('status', includeStatus);
            }
        } else {
            // Import all - no filters except status if specified
            if (includeStatus !== 'any') {
                queryParams.set('status', includeStatus);
            }
        }
        // Get existing orders by Shopify ID
        const ordersRef = adminDb.collection('organizations').doc(organizationId).collection('orders');
        const existingSnapshot = await ordersRef.where('shopifyId', '!=', null).get();
        const existingByShopifyId = new Map();
        existingSnapshot.docs.forEach((docSnap)=>{
            const docData = docSnap.data();
            if (docData.shopifyId) {
                existingByShopifyId.set(docData.shopifyId, docSnap.id);
            }
        });
        // Get products for SKU matching
        const productsRef = adminDb.collection('organizations').doc(organizationId).collection('products');
        const productsSnapshot = await productsRef.get();
        const productsBySku = new Map();
        productsSnapshot.docs.forEach((docSnap)=>{
            const docData = docSnap.data();
            if (docData.sku) {
                productsBySku.set(docData.sku.toLowerCase(), docSnap.id);
            }
        });
        // Get or create Shopify sales channel
        const channelsRef = adminDb.collection('organizations').doc(organizationId).collection('salesChannels');
        const shopifyChannelSnap = await channelsRef.where('code', '==', 'shopify').limit(1).get();
        let shopifyChannelId = '';
        let shopifyChannelName = 'Shopify';
        let shopifyChannelCode = 'shopify';
        if (!shopifyChannelSnap.empty) {
            const channelDoc = shopifyChannelSnap.docs[0];
            shopifyChannelId = channelDoc.id;
            const channelData = channelDoc.data();
            shopifyChannelName = channelData.name || 'Shopify';
            shopifyChannelCode = channelData.code || 'shopify';
        }
        let imported = 0;
        let totalImportedRevenue = 0;
        let updated = 0;
        let skipped = 0;
        let totalFetched = 0;
        let pageInfo = null;
        // Paginate through all orders
        do {
            let shopifyUrl = `https://${shopify.storeName}.myshopify.com/admin/api/2024-01/orders.json?${queryParams.toString()}`;
            if (pageInfo) {
                shopifyUrl = `https://${shopify.storeName}.myshopify.com/admin/api/2024-01/orders.json?page_info=${pageInfo}&limit=250`;
            }
            const response = await fetch(shopifyUrl, {
                headers: {
                    'X-Shopify-Access-Token': shopify.accessToken,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Shopify fetch orders error:', errorText);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: `Failed to fetch orders: ${response.status}`,
                    imported,
                    updated,
                    skipped
                }, {
                    status: 400
                });
            }
            // Check for pagination link header
            const linkHeader = response.headers.get('link');
            pageInfo = null;
            if (linkHeader) {
                const nextMatch = linkHeader.match(/<[^>]*page_info=([^>&]+)[^>]*>;\s*rel="next"/);
                if (nextMatch) {
                    pageInfo = nextMatch[1];
                }
            }
            const data = await response.json();
            const shopifyOrders = data.orders || [];
            totalFetched += shopifyOrders.length;
            for (const shopifyOrder of shopifyOrders){
                const shopifyId = shopifyOrder.id.toString();
                const existingDocId = existingByShopifyId.get(shopifyId);
                // Map line items with full details
                const lineItems = (shopifyOrder.line_items || []).map((item)=>{
                    const sku = item.sku?.toLowerCase();
                    return {
                        id: `li_${item.id}`,
                        shopifyLineItemId: item.id.toString(),
                        productId: sku ? productsBySku.get(sku) || null : null,
                        shopifyProductId: item.product_id?.toString() || null,
                        shopifyVariantId: item.variant_id?.toString() || null,
                        sku: item.sku || '',
                        name: item.name,
                        title: item.title,
                        variantTitle: item.variant_title || null,
                        quantity: item.quantity,
                        price: parseFloat(item.price) || 0,
                        totalDiscount: parseFloat(item.total_discount) || 0,
                        requiresShipping: item.requires_shipping,
                        fulfillableQuantity: item.fulfillable_quantity,
                        fulfillmentStatus: item.fulfillment_status || 'unfulfilled',
                        grams: item.grams,
                        vendor: item.vendor,
                        properties: item.properties || [],
                        giftCard: item.gift_card,
                        taxable: item.taxable,
                        taxLines: (item.tax_lines || []).map((t)=>({
                                title: t.title,
                                price: parseFloat(t.price) || 0,
                                rate: t.rate
                            }))
                    };
                });
                // Map shipping address
                const shippingAddress = shopifyOrder.shipping_address ? {
                    firstName: shopifyOrder.shipping_address.first_name || '',
                    lastName: shopifyOrder.shipping_address.last_name || '',
                    name: shopifyOrder.shipping_address.name || '',
                    company: shopifyOrder.shipping_address.company || null,
                    address1: shopifyOrder.shipping_address.address1 || '',
                    address2: shopifyOrder.shipping_address.address2 || null,
                    city: shopifyOrder.shipping_address.city || '',
                    province: shopifyOrder.shipping_address.province || '',
                    provinceCode: shopifyOrder.shipping_address.province_code || '',
                    country: shopifyOrder.shipping_address.country || '',
                    countryCode: shopifyOrder.shipping_address.country_code || '',
                    zip: shopifyOrder.shipping_address.zip || '',
                    phone: shopifyOrder.shipping_address.phone || null,
                    latitude: shopifyOrder.shipping_address.latitude,
                    longitude: shopifyOrder.shipping_address.longitude
                } : null;
                // Map billing address
                const billingAddress = shopifyOrder.billing_address ? {
                    firstName: shopifyOrder.billing_address.first_name || '',
                    lastName: shopifyOrder.billing_address.last_name || '',
                    name: shopifyOrder.billing_address.name || '',
                    company: shopifyOrder.billing_address.company || null,
                    address1: shopifyOrder.billing_address.address1 || '',
                    address2: shopifyOrder.billing_address.address2 || null,
                    city: shopifyOrder.billing_address.city || '',
                    province: shopifyOrder.billing_address.province || '',
                    provinceCode: shopifyOrder.billing_address.province_code || '',
                    country: shopifyOrder.billing_address.country || '',
                    countryCode: shopifyOrder.billing_address.country_code || '',
                    zip: shopifyOrder.billing_address.zip || '',
                    phone: shopifyOrder.billing_address.phone || null,
                    latitude: shopifyOrder.billing_address.latitude,
                    longitude: shopifyOrder.billing_address.longitude
                } : null;
                // Map customer
                const customer = shopifyOrder.customer ? {
                    id: shopifyOrder.customer.id?.toString() || '',
                    email: shopifyOrder.email || shopifyOrder.customer.email || '',
                    firstName: shopifyOrder.customer.first_name || '',
                    lastName: shopifyOrder.customer.last_name || '',
                    phone: shopifyOrder.customer.phone || shopifyOrder.phone || null,
                    ordersCount: shopifyOrder.customer.orders_count || 0,
                    totalSpent: parseFloat(shopifyOrder.customer.total_spent) || 0,
                    tags: shopifyOrder.customer.tags || ''
                } : {
                    id: '',
                    email: shopifyOrder.email || '',
                    firstName: '',
                    lastName: '',
                    phone: shopifyOrder.phone || null,
                    ordersCount: 0,
                    totalSpent: 0,
                    tags: ''
                };
                // Map fulfillments
                const fulfillments = (shopifyOrder.fulfillments || []).map((f)=>({
                        id: f.id.toString(),
                        status: f.status,
                        createdAt: new Date(f.created_at),
                        updatedAt: new Date(f.updated_at),
                        trackingCompany: f.tracking_company,
                        trackingNumber: f.tracking_number,
                        trackingNumbers: f.tracking_numbers || [],
                        trackingUrl: f.tracking_url,
                        trackingUrls: f.tracking_urls || [],
                        shipmentStatus: f.shipment_status,
                        lineItemIds: (f.line_items || []).map((li)=>li.id.toString())
                    }));
                // Map refunds
                const refunds = (shopifyOrder.refunds || []).map((r)=>({
                        id: r.id.toString(),
                        createdAt: new Date(r.created_at),
                        processedAt: new Date(r.processed_at),
                        note: r.note,
                        lineItems: (r.refund_line_items || []).map((rli)=>({
                                id: rli.id.toString(),
                                lineItemId: rli.line_item_id.toString(),
                                quantity: rli.quantity,
                                restockType: rli.restock_type,
                                subtotal: parseFloat(rli.subtotal) || 0,
                                totalTax: parseFloat(rli.total_tax) || 0
                            })),
                        transactions: (r.transactions || []).map((t)=>({
                                id: t.id.toString(),
                                amount: parseFloat(t.amount) || 0,
                                kind: t.kind,
                                gateway: t.gateway,
                                status: t.status
                            }))
                    }));
                // Map discount codes
                const discountCodes = (shopifyOrder.discount_codes || []).map((d)=>({
                        code: d.code,
                        amount: parseFloat(d.amount) || 0,
                        type: d.type
                    }));
                // Map discount applications
                const discountApplications = (shopifyOrder.discount_applications || []).map((d)=>({
                        type: d.type,
                        title: d.title,
                        description: d.description,
                        value: parseFloat(d.value) || 0,
                        valueType: d.value_type,
                        allocationMethod: d.allocation_method,
                        targetSelection: d.target_selection,
                        targetType: d.target_type
                    }));
                // Map shipping lines
                const shippingLines = (shopifyOrder.shipping_lines || []).map((s)=>({
                        id: s.id.toString(),
                        title: s.title,
                        price: parseFloat(s.price) || 0,
                        code: s.code,
                        source: s.source,
                        carrierIdentifier: s.carrier_identifier,
                        requestedFulfillmentServiceId: s.requested_fulfillment_service_id
                    }));
                // Map tax lines
                const taxLines = (shopifyOrder.tax_lines || []).map((t)=>({
                        title: t.title,
                        price: parseFloat(t.price) || 0,
                        rate: t.rate
                    }));
                // Determine internal status based on Shopify statuses
                let internalStatus = 'pending';
                if (shopifyOrder.cancelled_at) {
                    internalStatus = 'cancelled';
                } else if (shopifyOrder.closed_at) {
                    internalStatus = 'completed';
                } else if (shopifyOrder.fulfillment_status === 'fulfilled') {
                    internalStatus = 'shipped';
                } else if (shopifyOrder.fulfillment_status === 'partial') {
                    internalStatus = 'partially_shipped';
                } else if (shopifyOrder.financial_status === 'paid') {
                    internalStatus = 'processing';
                }
                const orderData = {
                    shopifyId,
                    shopifyOrderNumber: `#${shopifyOrder.order_number}`,
                    shopifyOrderName: shopifyOrder.name,
                    status: internalStatus,
                    fulfillmentStatus: shopifyOrder.fulfillment_status || 'unfulfilled',
                    paymentStatus: shopifyOrder.financial_status || 'pending',
                    customer,
                    shippingAddress,
                    billingAddress,
                    lineItems,
                    shippingLines,
                    subtotal: parseFloat(shopifyOrder.subtotal_price) || 0,
                    shippingTotal: parseFloat(shopifyOrder.total_shipping_price_set?.shop_money?.amount) || 0,
                    taxTotal: parseFloat(shopifyOrder.total_tax) || 0,
                    discountTotal: parseFloat(shopifyOrder.total_discounts) || 0,
                    total: parseFloat(shopifyOrder.total_price) || 0,
                    currency: shopifyOrder.currency || 'USD',
                    totalWeight: shopifyOrder.total_weight || 0,
                    taxLines,
                    discountCodes,
                    discountApplications,
                    fulfillments,
                    refunds,
                    shippingMethod: shippingLines[0]?.title || null,
                    paymentGateway: shopifyOrder.gateway || null,
                    paymentGatewayNames: shopifyOrder.payment_gateway_names || [],
                    processingMethod: shopifyOrder.processing_method || null,
                    note: shopifyOrder.note || null,
                    noteAttributes: shopifyOrder.note_attributes || [],
                    tags: shopifyOrder.tags ? shopifyOrder.tags.split(',').map((t)=>t.trim()) : [],
                    browserIp: shopifyOrder.browser_ip,
                    landingSite: shopifyOrder.landing_site,
                    referringSite: shopifyOrder.referring_site,
                    sourceName: shopifyOrder.source_name,
                    shopifyLocationId: shopifyOrder.location_id?.toString() || null,
                    isTestOrder: shopifyOrder.test || false,
                    confirmed: shopifyOrder.confirmed || false,
                    shopifyCreatedAt: new Date(shopifyOrder.created_at),
                    shopifyUpdatedAt: new Date(shopifyOrder.updated_at),
                    shopifyProcessedAt: shopifyOrder.processed_at ? new Date(shopifyOrder.processed_at) : null,
                    shopifyClosedAt: shopifyOrder.closed_at ? new Date(shopifyOrder.closed_at) : null,
                    shopifyCancelledAt: shopifyOrder.cancelled_at ? new Date(shopifyOrder.cancelled_at) : null,
                    cancelReason: shopifyOrder.cancel_reason || null,
                    updatedAt: new Date(),
                    source: 'shopify',
                    // Sales channel info
                    channelId: shopifyChannelId,
                    channelCode: shopifyChannelCode,
                    channelName: shopifyChannelName,
                    // Source details
                    sourceDetails: {
                        platform: 'shopify',
                        externalId: shopifyId,
                        externalOrderNumber: shopifyOrder.name,
                        importedAt: new Date()
                    }
                };
                const orderTotal = parseFloat(shopifyOrder.total_price) || 0;
                if (existingDocId) {
                    // Update existing order
                    await ordersRef.doc(existingDocId).update(orderData);
                    updated++;
                } else {
                    // Create new order
                    await ordersRef.add({
                        ...orderData,
                        createdAt: new Date()
                    });
                    imported++;
                    totalImportedRevenue += orderTotal;
                }
            }
        // Continue pagination if there are more orders
        }while (pageInfo)
        // Update last sync time
        await adminDb.collection('organizations').doc(organizationId).update({
            'shopify.lastSyncOrders': new Date()
        });
        // Update Shopify channel stats
        if (shopifyChannelId && imported > 0) {
            try {
                await channelsRef.doc(shopifyChannelId).update({
                    'stats.totalOrders': __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["FieldValue"].increment(imported),
                    'stats.pendingOrders': __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["FieldValue"].increment(imported),
                    'stats.totalRevenue': __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["FieldValue"].increment(totalImportedRevenue),
                    'stats.lastOrderAt': new Date(),
                    'integration.lastSyncAt': new Date()
                });
            } catch (channelUpdateError) {
                console.error('Error updating channel stats:', channelUpdateError);
            // Don't fail the sync for this
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            imported,
            updated,
            skipped,
            total: totalFetched
        });
    } catch (error) {
        console.error('Sync orders error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error.message || 'Sync failed'
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__196e0408._.js.map