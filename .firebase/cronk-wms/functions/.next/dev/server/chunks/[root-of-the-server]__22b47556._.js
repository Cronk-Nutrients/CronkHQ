module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

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
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
async function POST(request) {
    try {
        const { organizationId } = await request.json();
        if (!organizationId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Missing organization ID'
            }, {
                status: 400
            });
        }
        const adminDb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAdminDb"])();
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
        // Fetch unfulfilled orders from Shopify
        const shopifyUrl = `https://${shopify.storeName}.myshopify.com/admin/api/2024-01/orders.json?status=open&fulfillment_status=unfulfilled&limit=250`;
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
                error: 'Failed to fetch orders'
            }, {
                status: 400
            });
        }
        const data = await response.json();
        const shopifyOrders = data.orders || [];
        // Get existing orders by Shopify ID
        const ordersRef = adminDb.collection('organizations').doc(organizationId).collection('orders');
        const existingSnapshot = await ordersRef.where('shopifyId', '!=', null).get();
        const existingByShopifyId = new Set();
        existingSnapshot.docs.forEach((docSnap)=>{
            const docData = docSnap.data();
            if (docData.shopifyId) {
                existingByShopifyId.add(docData.shopifyId);
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
        let imported = 0;
        let skipped = 0;
        for (const shopifyOrder of shopifyOrders){
            const shopifyId = shopifyOrder.id.toString();
            // Skip if already imported
            if (existingByShopifyId.has(shopifyId)) {
                skipped++;
                continue;
            }
            // Map line items
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
                    variantTitle: item.variant_title || null,
                    quantity: item.quantity,
                    price: parseFloat(item.price) || 0,
                    totalDiscount: parseFloat(item.total_discount) || 0,
                    requiresShipping: item.requires_shipping,
                    fulfillableQuantity: item.fulfillable_quantity,
                    fulfillmentStatus: 'unfulfilled'
                };
            });
            const shippingAddress = shopifyOrder.shipping_address || {};
            const customer = shopifyOrder.customer || {};
            const orderData = {
                shopifyId,
                shopifyOrderNumber: `#${shopifyOrder.order_number}`,
                shopifyOrderName: shopifyOrder.name,
                status: 'pending',
                fulfillmentStatus: shopifyOrder.fulfillment_status || 'unfulfilled',
                paymentStatus: shopifyOrder.financial_status === 'paid' ? 'paid' : 'pending',
                customer: {
                    id: customer.id?.toString() || '',
                    email: shopifyOrder.email || '',
                    firstName: customer.first_name || '',
                    lastName: customer.last_name || '',
                    phone: customer.phone || null
                },
                shippingAddress: {
                    firstName: shippingAddress.first_name || '',
                    lastName: shippingAddress.last_name || '',
                    company: shippingAddress.company || null,
                    address1: shippingAddress.address1 || '',
                    address2: shippingAddress.address2 || null,
                    city: shippingAddress.city || '',
                    province: shippingAddress.province || '',
                    provinceCode: shippingAddress.province_code || '',
                    country: shippingAddress.country || '',
                    countryCode: shippingAddress.country_code || '',
                    zip: shippingAddress.zip || '',
                    phone: shippingAddress.phone || null
                },
                lineItems,
                subtotal: parseFloat(shopifyOrder.subtotal_price) || 0,
                shippingTotal: parseFloat(shopifyOrder.total_shipping_price_set?.shop_money?.amount) || 0,
                taxTotal: parseFloat(shopifyOrder.total_tax) || 0,
                discountTotal: parseFloat(shopifyOrder.total_discounts) || 0,
                total: parseFloat(shopifyOrder.total_price) || 0,
                currency: shopifyOrder.currency || 'USD',
                shippingMethod: shopifyOrder.shipping_lines?.[0]?.title || null,
                note: shopifyOrder.note || null,
                tags: shopifyOrder.tags ? shopifyOrder.tags.split(',').map((t)=>t.trim()) : [],
                shopifyCreatedAt: new Date(shopifyOrder.created_at),
                createdAt: new Date(),
                updatedAt: new Date(),
                source: 'shopify'
            };
            await ordersRef.add(orderData);
            imported++;
        }
        // Update last sync time
        await adminDb.collection('organizations').doc(organizationId).update({
            'shopify.lastSyncOrders': new Date()
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            imported,
            skipped,
            total: shopifyOrders.length
        });
    } catch (error) {
        console.error('Sync orders error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Sync failed'
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__22b47556._.js.map