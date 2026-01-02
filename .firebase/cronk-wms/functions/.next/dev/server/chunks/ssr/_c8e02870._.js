module.exports = [
"[project]/lib/formatting.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/lib/firestore.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FirestoreService",
    ()=>FirestoreService,
    "adjustInventory",
    ()=>adjustInventory,
    "convertTimestamps",
    ()=>convertTimestamps,
    "getNextNumber",
    ()=>getNextNumber,
    "isDemoOrganization",
    ()=>isDemoOrganization
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase.ts [app-ssr] (ecmascript)");
;
;
function convertTimestamps(data) {
    if (!data) return data;
    const converted = {
        ...data
    };
    for(const key in converted){
        if (converted[key] instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"]) {
            converted[key] = converted[key].toDate();
        } else if (converted[key] && typeof converted[key] === 'object' && !Array.isArray(converted[key])) {
            converted[key] = convertTimestamps(converted[key]);
        }
    }
    return converted;
}
class FirestoreService {
    orgId;
    collectionName;
    constructor(organizationId, collectionName){
        this.orgId = organizationId;
        this.collectionName = collectionName;
    }
    // Get collection reference
    getCollectionRef() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'organizations', this.orgId, this.collectionName);
    }
    // Get document reference
    getDocRef(id) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'organizations', this.orgId, this.collectionName, id);
    }
    // Get all documents
    async getAll(...queryConstraints) {
        const ref = this.getCollectionRef();
        const q = queryConstraints.length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])(ref, ...queryConstraints) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])(ref);
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocs"])(q);
        return snapshot.docs.map((doc)=>convertTimestamps({
                id: doc.id,
                ...doc.data()
            }));
    }
    // Get single document
    async get(id) {
        const docRef = this.getDocRef(id);
        const docSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDoc"])(docRef);
        if (docSnap.exists()) {
            return convertTimestamps({
                id: docSnap.id,
                ...docSnap.data()
            });
        }
        return null;
    }
    // Create document
    async create(data, customId) {
        const colRef = this.getCollectionRef();
        const docRef = customId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(colRef, customId) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(colRef);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])(docRef, {
            ...data,
            createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
            updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
        return docRef.id;
    }
    // Update document
    async update(id, data) {
        const docRef = this.getDocRef(id);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDoc"])(docRef, {
            ...data,
            updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
    }
    // Delete document
    async delete(id) {
        const docRef = this.getDocRef(id);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteDoc"])(docRef);
    }
    // Subscribe to real-time updates (all documents)
    subscribe(callback, errorCallback, ...queryConstraints) {
        const ref = this.getCollectionRef();
        const q = queryConstraints.length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])(ref, ...queryConstraints) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])(ref);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onSnapshot"])(q, (snapshot)=>{
            const data = snapshot.docs.map((doc)=>convertTimestamps({
                    id: doc.id,
                    ...doc.data()
                }));
            callback(data);
        }, errorCallback);
    }
    // Subscribe to single document
    subscribeToDoc(id, callback, errorCallback) {
        const docRef = this.getDocRef(id);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onSnapshot"])(docRef, (docSnap)=>{
            if (docSnap.exists()) {
                callback(convertTimestamps({
                    id: docSnap.id,
                    ...docSnap.data()
                }));
            } else {
                callback(null);
            }
        }, errorCallback);
    }
    // Batch operations
    async batchCreate(items) {
        const batch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeBatch"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"]);
        const ids = [];
        for (const item of items){
            const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(this.getCollectionRef());
            ids.push(docRef.id);
            batch.set(docRef, {
                ...item,
                createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])()
            });
        }
        await batch.commit();
        return ids;
    }
    async batchUpdate(updates) {
        const batch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeBatch"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"]);
        for (const { id, data } of updates){
            const docRef = this.getDocRef(id);
            batch.update(docRef, {
                ...data,
                updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])()
            });
        }
        await batch.commit();
    }
    async batchDelete(ids) {
        const batch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeBatch"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"]);
        for (const id of ids){
            batch.delete(this.getDocRef(id));
        }
        await batch.commit();
    }
    // Pagination helper
    async getPaginated(pageSize, lastDoc, ...queryConstraints) {
        const ref = this.getCollectionRef();
        let q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])(ref, ...queryConstraints, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["limit"])(pageSize + 1));
        if (lastDoc) {
            q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])(ref, ...queryConstraints, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["startAfter"])(lastDoc), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["limit"])(pageSize + 1));
        }
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocs"])(q);
        const hasMore = snapshot.docs.length > pageSize;
        const docs = hasMore ? snapshot.docs.slice(0, -1) : snapshot.docs;
        return {
            data: docs.map((doc)=>convertTimestamps({
                    id: doc.id,
                    ...doc.data()
                })),
            lastDoc: docs.length > 0 ? docs[docs.length - 1] : null,
            hasMore
        };
    }
}
async function adjustInventory(organizationId, productId, locationId, adjustment, reason) {
    const inventoryRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'organizations', organizationId, 'inventory', `${productId}_${locationId}`);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDoc"])(inventoryRef, {
        quantity: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["increment"])(adjustment),
        availableQuantity: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["increment"])(adjustment),
        updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])()
    });
    // Log the adjustment
    const logRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'organizations', organizationId, 'inventoryLogs');
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(logRef), {
        productId,
        locationId,
        adjustment,
        reason: reason || 'manual_adjustment',
        createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])()
    });
}
async function getNextNumber(organizationId, type) {
    const counterRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'organizations', organizationId, 'counters', type);
    const counterSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDoc"])(counterRef);
    let nextNumber = 1;
    if (counterSnap.exists()) {
        nextNumber = (counterSnap.data().current || 0) + 1;
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])(counterRef, {
        current: nextNumber
    }, {
        merge: true
    });
    const prefixes = {
        order: 'ORD',
        po: 'PO',
        wo: 'WO',
        transfer: 'TRF',
        return: 'RET'
    };
    return `${prefixes[type]}-${String(nextNumber).padStart(5, '0')}`;
}
function isDemoOrganization(orgId) {
    return orgId === 'demo-org-id';
}
}),
"[project]/lib/ruleTemplates.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "actionOptions",
    ()=>actionOptions,
    "carrierOptions",
    ()=>carrierOptions,
    "getCategoryIcon",
    ()=>getCategoryIcon,
    "getCategoryLabel",
    ()=>getCategoryLabel,
    "getTemplateCategories",
    ()=>getTemplateCategories,
    "getTemplatesByCategory",
    ()=>getTemplatesByCategory,
    "operatorOptions",
    ()=>operatorOptions,
    "priorityOptions",
    ()=>priorityOptions,
    "ruleTemplates",
    ()=>ruleTemplates,
    "serviceOptions",
    ()=>serviceOptions,
    "triggerOptions",
    ()=>triggerOptions
]);
const ruleTemplates = [
    // Shipping Templates
    {
        id: 'tpl-usps-small',
        name: 'Auto-assign USPS for small orders',
        description: 'Orders under $50 with weight less than 1lb ship USPS First Class',
        category: 'shipping',
        trigger: {
            type: 'order_created'
        },
        conditions: [
            {
                field: 'total',
                operator: 'less_than',
                value: 50
            }
        ],
        actions: [
            {
                type: 'assign_carrier',
                config: {
                    carrier: 'usps'
                }
            },
            {
                type: 'assign_service',
                config: {
                    service: 'first_class'
                }
            }
        ]
    },
    {
        id: 'tpl-ups-heavy',
        name: 'Use UPS for heavy orders',
        description: 'Orders over 5lbs ship via UPS Ground',
        category: 'shipping',
        trigger: {
            type: 'order_created'
        },
        conditions: [
            {
                field: 'weight',
                operator: 'greater_than',
                value: 80
            } // 80oz = 5lbs
        ],
        actions: [
            {
                type: 'assign_carrier',
                config: {
                    carrier: 'ups'
                }
            },
            {
                type: 'assign_service',
                config: {
                    service: 'ground'
                }
            }
        ]
    },
    {
        id: 'tpl-fedex-express',
        name: 'FedEx for high-value orders',
        description: 'Orders over $200 ship FedEx with signature required',
        category: 'shipping',
        trigger: {
            type: 'order_created'
        },
        conditions: [
            {
                field: 'total',
                operator: 'greater_than',
                value: 200
            }
        ],
        actions: [
            {
                type: 'assign_carrier',
                config: {
                    carrier: 'fedex'
                }
            },
            {
                type: 'assign_service',
                config: {
                    service: 'express_saver'
                }
            }
        ]
    },
    // Tagging Templates
    {
        id: 'tpl-prime-tag',
        name: 'Tag Amazon Prime orders as urgent',
        description: 'Add PRIME tag and set high priority for Amazon Prime orders',
        category: 'tagging',
        trigger: {
            type: 'order_created'
        },
        conditions: [
            {
                field: 'is_prime',
                operator: 'equals',
                value: true
            }
        ],
        actions: [
            {
                type: 'set_order_tag',
                config: {
                    tag: 'PRIME'
                }
            },
            {
                type: 'set_priority',
                config: {
                    priority: 'high'
                }
            }
        ]
    },
    {
        id: 'tpl-wholesale-tag',
        name: 'Tag wholesale orders',
        description: 'Add WHOLESALE tag and notify team for bulk orders',
        category: 'tagging',
        trigger: {
            type: 'order_created'
        },
        conditions: [
            {
                field: 'item_count',
                operator: 'greater_than',
                value: 10
            }
        ],
        actions: [
            {
                type: 'set_order_tag',
                config: {
                    tag: 'WHOLESALE'
                }
            },
            {
                type: 'send_notification',
                config: {
                    message: 'New wholesale order received'
                }
            }
        ]
    },
    {
        id: 'tpl-international-tag',
        name: 'Tag international orders',
        description: 'Flag orders shipping outside the US',
        category: 'tagging',
        trigger: {
            type: 'order_created'
        },
        conditions: [
            {
                field: 'shipping_country',
                operator: 'not_equals',
                value: 'US'
            }
        ],
        actions: [
            {
                type: 'set_order_tag',
                config: {
                    tag: 'INTERNATIONAL'
                }
            },
            {
                type: 'set_priority',
                config: {
                    priority: 'low'
                }
            }
        ]
    },
    {
        id: 'tpl-fragile-tag',
        name: 'Tag fragile product orders',
        description: 'Add FRAGILE tag when order contains specific SKUs',
        category: 'tagging',
        trigger: {
            type: 'order_created'
        },
        conditions: [
            {
                field: 'contains_sku',
                operator: 'contains',
                value: '4L'
            }
        ],
        actions: [
            {
                type: 'set_order_tag',
                config: {
                    tag: 'FRAGILE'
                }
            }
        ]
    },
    // Inventory Templates
    {
        id: 'tpl-low-stock-alert',
        name: 'Create PO when stock is low',
        description: 'Automatically create a PO draft and notify when stock drops below threshold',
        category: 'inventory',
        trigger: {
            type: 'low_stock',
            threshold: 50
        },
        conditions: [],
        actions: [
            {
                type: 'create_po_draft',
                config: {
                    quantity: 100
                }
            },
            {
                type: 'send_notification',
                config: {
                    message: 'Low stock alert! PO draft created.'
                }
            }
        ]
    },
    {
        id: 'tpl-critical-stock',
        name: 'Critical stock email alert',
        description: 'Send urgent email when stock is critically low',
        category: 'inventory',
        trigger: {
            type: 'low_stock',
            threshold: 10
        },
        conditions: [],
        actions: [
            {
                type: 'send_email',
                config: {
                    recipient: 'admin@company.com',
                    subject: 'URGENT: Critical stock level'
                }
            },
            {
                type: 'send_notification',
                config: {
                    message: 'CRITICAL: Stock nearly depleted!'
                }
            }
        ]
    },
    // Notification Templates
    {
        id: 'tpl-new-order-notify',
        name: 'Notify on new Shopify orders',
        description: 'Send notification when a new Shopify order is received',
        category: 'notification',
        trigger: {
            type: 'order_created'
        },
        conditions: [
            {
                field: 'channel',
                operator: 'equals',
                value: 'shopify'
            }
        ],
        actions: [
            {
                type: 'send_notification',
                config: {
                    message: 'New Shopify order received!'
                }
            }
        ]
    },
    {
        id: 'tpl-vip-customer',
        name: 'VIP customer alert',
        description: 'Notify when orders come from VIP email domains',
        category: 'notification',
        trigger: {
            type: 'order_created'
        },
        conditions: [
            {
                field: 'total',
                operator: 'greater_than',
                value: 500
            }
        ],
        actions: [
            {
                type: 'set_order_tag',
                config: {
                    tag: 'VIP'
                }
            },
            {
                type: 'set_priority',
                config: {
                    priority: 'urgent'
                }
            },
            {
                type: 'send_notification',
                config: {
                    message: 'VIP order received - prioritize!'
                }
            }
        ]
    },
    {
        id: 'tpl-gripper-sticker',
        name: 'Add gripper sticker to every bottle',
        description: 'Automatically add gripper stickers to orders containing bottles',
        category: 'shipping',
        trigger: {
            type: 'order_created'
        },
        conditions: [
            {
                field: 'contains_sku',
                operator: 'contains',
                value: 'CN'
            }
        ],
        actions: [
            {
                type: 'add_fulfillment_item',
                config: {
                    productId: 'gripper-sku',
                    quantity: 1
                }
            }
        ]
    }
];
function getTemplatesByCategory(category) {
    return ruleTemplates.filter((t)=>t.category === category);
}
function getTemplateCategories() {
    return [
        ...new Set(ruleTemplates.map((t)=>t.category))
    ];
}
function getCategoryLabel(category) {
    const labels = {
        shipping: 'Shipping & Carriers',
        tagging: 'Order Tagging',
        inventory: 'Inventory Management',
        notification: 'Notifications'
    };
    return labels[category];
}
function getCategoryIcon(category) {
    const icons = {
        shipping: 'fa-truck',
        tagging: 'fa-tags',
        inventory: 'fa-boxes',
        notification: 'fa-bell'
    };
    return icons[category];
}
const triggerOptions = [
    {
        type: 'order_created',
        icon: 'ShoppingCart',
        label: 'New Order',
        description: 'When an order is created'
    },
    {
        type: 'order_status_changed',
        icon: 'ArrowLeftRight',
        label: 'Status Change',
        description: 'When order status changes'
    },
    {
        type: 'low_stock',
        icon: 'AlertTriangle',
        label: 'Low Stock',
        description: 'When stock falls below threshold'
    },
    {
        type: 'item_received',
        icon: 'PackageCheck',
        label: 'Item Received',
        description: 'When inventory is received'
    },
    {
        type: 'daily',
        icon: 'Clock',
        label: 'Scheduled',
        description: 'Run at a specific time daily'
    },
    {
        type: 'manual',
        icon: 'Hand',
        label: 'Manual',
        description: 'Run manually when triggered'
    }
];
const actionOptions = [
    {
        type: 'set_order_tag',
        label: 'Add Order Tag',
        icon: 'Tag'
    },
    {
        type: 'set_priority',
        label: 'Set Priority',
        icon: 'Flag'
    },
    {
        type: 'assign_carrier',
        label: 'Assign Carrier',
        icon: 'Truck'
    },
    {
        type: 'assign_service',
        label: 'Assign Shipping Service',
        icon: 'Package'
    },
    {
        type: 'select_box',
        label: 'Select Box',
        icon: 'Box'
    },
    {
        type: 'add_fulfillment_item',
        label: 'Add Fulfillment Item',
        icon: 'Plus'
    },
    {
        type: 'send_notification',
        label: 'Send Notification',
        icon: 'Bell'
    },
    {
        type: 'create_po_draft',
        label: 'Create PO Draft',
        icon: 'FileText'
    },
    {
        type: 'send_email',
        label: 'Send Email',
        icon: 'Mail'
    },
    {
        type: 'set_location',
        label: 'Set Location',
        icon: 'MapPin'
    }
];
const operatorOptions = [
    {
        value: 'equals',
        label: 'equals'
    },
    {
        value: 'not_equals',
        label: 'does not equal'
    },
    {
        value: 'contains',
        label: 'contains'
    },
    {
        value: 'greater_than',
        label: 'is greater than'
    },
    {
        value: 'less_than',
        label: 'is less than'
    },
    {
        value: 'in_list',
        label: 'is one of'
    }
];
const priorityOptions = [
    {
        value: 'low',
        label: 'Low'
    },
    {
        value: 'normal',
        label: 'Normal'
    },
    {
        value: 'high',
        label: 'High'
    },
    {
        value: 'urgent',
        label: 'Urgent'
    }
];
const carrierOptions = [
    {
        value: 'usps',
        label: 'USPS'
    },
    {
        value: 'ups',
        label: 'UPS'
    },
    {
        value: 'fedex',
        label: 'FedEx'
    },
    {
        value: 'dhl',
        label: 'DHL'
    }
];
const serviceOptions = {
    usps: [
        {
            value: 'first_class',
            label: 'First Class'
        },
        {
            value: 'priority',
            label: 'Priority Mail'
        },
        {
            value: 'priority_express',
            label: 'Priority Express'
        },
        {
            value: 'ground_advantage',
            label: 'Ground Advantage'
        }
    ],
    ups: [
        {
            value: 'ground',
            label: 'UPS Ground'
        },
        {
            value: 'three_day_select',
            label: '3 Day Select'
        },
        {
            value: 'second_day_air',
            label: '2nd Day Air'
        },
        {
            value: 'next_day_air',
            label: 'Next Day Air'
        }
    ],
    fedex: [
        {
            value: 'ground',
            label: 'FedEx Ground'
        },
        {
            value: 'home_delivery',
            label: 'Home Delivery'
        },
        {
            value: 'express_saver',
            label: 'Express Saver'
        },
        {
            value: 'standard_overnight',
            label: 'Standard Overnight'
        }
    ],
    dhl: [
        {
            value: 'express',
            label: 'DHL Express'
        },
        {
            value: 'express_worldwide',
            label: 'Express Worldwide'
        }
    ]
};
}),
"[project]/lib/automationEngine.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildOrderContext",
    ()=>buildOrderContext,
    "evaluateCondition",
    ()=>evaluateCondition,
    "evaluateConditions",
    ()=>evaluateConditions,
    "executeAction",
    ()=>executeAction,
    "executeActions",
    ()=>executeActions,
    "getActionLabel",
    ()=>getActionLabel,
    "getOperatorLabel",
    ()=>getOperatorLabel,
    "getTriggerLabel",
    ()=>getTriggerLabel,
    "runLowStockRules",
    ()=>runLowStockRules,
    "runOrderCreatedRules",
    ()=>runOrderCreatedRules,
    "runOrderStatusChangedRules",
    ()=>runOrderStatusChangedRules,
    "runRulesForTrigger",
    ()=>runRulesForTrigger
]);
function evaluateCondition(condition, context) {
    const fieldValue = context[condition.field];
    // Handle special case for contains_sku which is a function
    if (condition.field === 'contains_sku' && typeof context.contains_sku === 'function') {
        return context.contains_sku(condition.value);
    }
    switch(condition.operator){
        case 'equals':
            return fieldValue === condition.value;
        case 'not_equals':
            return fieldValue !== condition.value;
        case 'contains':
            return String(fieldValue).toLowerCase().includes(String(condition.value).toLowerCase());
        case 'greater_than':
            return Number(fieldValue) > Number(condition.value);
        case 'less_than':
            return Number(fieldValue) < Number(condition.value);
        case 'in_list':
            if (Array.isArray(condition.value)) {
                return condition.value.includes(fieldValue);
            }
            return false;
        default:
            return false;
    }
}
function evaluateConditions(conditions, context) {
    if (conditions.length === 0) return true;
    return conditions.every((condition)=>evaluateCondition(condition, context));
}
function executeAction(action, context, dispatch) {
    const order = context.order;
    switch(action.type){
        case 'set_order_tag':
            if (order) {
                dispatch({
                    type: 'UPDATE_ORDER',
                    payload: {
                        ...order,
                        tags: [
                            ...order.tags || [],
                            action.config.tag
                        ],
                        updatedAt: new Date()
                    }
                });
            }
            break;
        case 'set_priority':
            if (order) {
                dispatch({
                    type: 'UPDATE_ORDER',
                    payload: {
                        ...order,
                        priority: action.config.priority,
                        updatedAt: new Date()
                    }
                });
            }
            break;
        case 'assign_carrier':
            if (order) {
                dispatch({
                    type: 'UPDATE_ORDER',
                    payload: {
                        ...order,
                        suggestedCarrier: action.config.carrier,
                        carrier: action.config.carrier,
                        updatedAt: new Date()
                    }
                });
            }
            break;
        case 'assign_service':
            if (order) {
                dispatch({
                    type: 'UPDATE_ORDER',
                    payload: {
                        ...order,
                        suggestedService: action.config.service,
                        service: action.config.service,
                        updatedAt: new Date()
                    }
                });
            }
            break;
        case 'select_box':
            if (order) {
                dispatch({
                    type: 'UPDATE_ORDER',
                    payload: {
                        ...order,
                        suggestedBoxId: action.config.boxId,
                        updatedAt: new Date()
                    }
                });
            }
            break;
        case 'add_fulfillment_item':
            if (order) {
                dispatch({
                    type: 'UPDATE_ORDER',
                    payload: {
                        ...order,
                        fulfillmentItems: [
                            ...order.fulfillmentItems || [],
                            {
                                productId: action.config.productId,
                                quantity: action.config.quantity || 1,
                                reason: 'automation_rule'
                            }
                        ],
                        updatedAt: new Date()
                    }
                });
            }
            break;
        case 'send_notification':
            // In a real app, this would trigger a notification system
            console.log(`[Automation] Notification: ${action.config.message}`);
            break;
        case 'create_po_draft':
            // In a real app, this would create a PO draft
            console.log(`[Automation] Create PO draft with quantity: ${action.config.quantity}`);
            break;
        case 'send_email':
            // In a real app, this would send an email
            console.log(`[Automation] Send email to: ${action.config.recipient}`);
            break;
        case 'set_location':
            // Set preferred fulfillment location
            console.log(`[Automation] Set location: ${action.config.locationId}`);
            break;
        default:
            console.warn(`[Automation] Unknown action type: ${action.type}`);
    }
}
function executeActions(actions, context, dispatch) {
    actions.forEach((action)=>{
        executeAction(action, context, dispatch);
    });
}
function buildOrderContext(order) {
    const itemCount = order.items.reduce((sum, item)=>sum + item.quantity, 0);
    return {
        order,
        channel: order.channel,
        total: order.total,
        subtotal: order.subtotal,
        item_count: itemCount,
        shipping_country: order.customer?.address?.country || '',
        shipping_state: order.customer?.address?.state || '',
        shipping_city: order.customer?.address?.city || '',
        customer_email: order.customer?.email || '',
        customer_name: order.customer?.name || '',
        contains_sku: (sku)=>order.items.some((item)=>item.sku?.toLowerCase().includes(sku.toLowerCase())),
        weight: order.totalWeight || 0,
        is_prime: order.isPrime || false,
        requires_signature: order.requiresSignature || false,
        order_number: order.orderNumber,
        status: order.status
    };
}
function runRulesForTrigger(triggerType, context, rules, dispatch) {
    let rulesRun = 0;
    let actionsExecuted = 0;
    // Filter enabled rules with matching trigger, sorted by priority
    const matchingRules = rules.filter((rule)=>rule.enabled && rule.trigger.type === triggerType).sort((a, b)=>a.priority - b.priority);
    matchingRules.forEach((rule)=>{
        if (evaluateConditions(rule.conditions, context)) {
            executeActions(rule.actions, context, dispatch);
            rulesRun++;
            actionsExecuted += rule.actions.length;
        }
    });
    return {
        rulesRun,
        actionsExecuted
    };
}
function runOrderCreatedRules(order, rules, dispatch) {
    const context = buildOrderContext(order);
    return runRulesForTrigger('order_created', context, rules, dispatch);
}
function runOrderStatusChangedRules(order, fromStatus, toStatus, rules, dispatch) {
    const context = {
        ...buildOrderContext(order),
        from_status: fromStatus,
        to_status: toStatus
    };
    // Filter rules that match the status change
    const statusRules = rules.filter((rule)=>{
        if (rule.trigger.type !== 'order_status_changed') return false;
        const trigger = rule.trigger;
        // Check if fromStatus matches (if specified)
        if (trigger.fromStatus && trigger.fromStatus !== fromStatus) return false;
        // Check if toStatus matches (if specified)
        if (trigger.toStatus && trigger.toStatus !== toStatus) return false;
        return true;
    });
    let rulesRun = 0;
    let actionsExecuted = 0;
    statusRules.filter((rule)=>rule.enabled).sort((a, b)=>a.priority - b.priority).forEach((rule)=>{
        if (evaluateConditions(rule.conditions, context)) {
            executeActions(rule.actions, context, dispatch);
            rulesRun++;
            actionsExecuted += rule.actions.length;
        }
    });
    return {
        rulesRun,
        actionsExecuted
    };
}
function runLowStockRules(productId, productSku, currentQuantity, rules, dispatch) {
    let rulesRun = 0;
    let actionsExecuted = 0;
    const lowStockRules = rules.filter((rule)=>{
        if (rule.trigger.type !== 'low_stock') return false;
        const trigger = rule.trigger;
        const threshold = trigger.threshold || 50;
        return currentQuantity <= threshold;
    });
    const context = {
        product_id: productId,
        sku: productSku,
        quantity: currentQuantity
    };
    lowStockRules.filter((rule)=>rule.enabled).sort((a, b)=>a.priority - b.priority).forEach((rule)=>{
        if (evaluateConditions(rule.conditions, context)) {
            executeActions(rule.actions, context, dispatch);
            rulesRun++;
            actionsExecuted += rule.actions.length;
        }
    });
    return {
        rulesRun,
        actionsExecuted
    };
}
function getTriggerLabel(trigger) {
    switch(trigger.type){
        case 'order_created':
            return 'New Order';
        case 'order_status_changed':
            const statusTrigger = trigger;
            if (statusTrigger.toStatus) {
                return `Status → ${statusTrigger.toStatus}`;
            }
            return 'Status Change';
        case 'low_stock':
            const lowStockTrigger = trigger;
            return `Low Stock (≤${lowStockTrigger.threshold || 50})`;
        case 'item_received':
            return 'Item Received';
        case 'daily':
            const dailyTrigger = trigger;
            return `Daily at ${dailyTrigger.time}`;
        case 'manual':
            return 'Manual';
        default:
            return 'Unknown';
    }
}
function getActionLabel(action) {
    switch(action.type){
        case 'set_order_tag':
            return `Add tag "${action.config.tag}"`;
        case 'set_priority':
            return `Set priority to ${action.config.priority}`;
        case 'assign_carrier':
            return `Assign ${action.config.carrier?.toUpperCase()}`;
        case 'assign_service':
            return `Use ${action.config.service}`;
        case 'select_box':
            return `Select box ${action.config.boxId}`;
        case 'send_notification':
            return 'Send notification';
        case 'add_fulfillment_item':
            return `Add item (qty: ${action.config.quantity || 1})`;
        case 'set_location':
            return `Set location`;
        case 'create_po_draft':
            return `Create PO draft`;
        case 'send_email':
            return `Send email`;
        default:
            return 'Unknown action';
    }
}
function getOperatorLabel(operator) {
    const labels = {
        equals: 'equals',
        not_equals: 'does not equal',
        contains: 'contains',
        greater_than: 'is greater than',
        less_than: 'is less than',
        in_list: 'is one of'
    };
    return labels[operator] || operator;
}
}),
"[project]/hooks/useFirestore.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBundles",
    ()=>useBundles,
    "useDashboardStats",
    ()=>useDashboardStats,
    "useInventory",
    ()=>useInventory,
    "useLocations",
    ()=>useLocations,
    "useLowStockProducts",
    ()=>useLowStockProducts,
    "useOrders",
    ()=>useOrders,
    "useProduct",
    ()=>useProduct,
    "useProducts",
    ()=>useProducts,
    "useProductsWithInventory",
    ()=>useProductsWithInventory,
    "usePurchaseOrders",
    ()=>usePurchaseOrders,
    "useRecentOrders",
    ()=>useRecentOrders,
    "useReturns",
    ()=>useReturns,
    "useStockTransfers",
    ()=>useStockTransfers,
    "useSuppliers",
    ()=>useSuppliers,
    "useWorkOrders",
    ()=>useWorkOrders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$OrganizationContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/OrganizationContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firestore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firestore.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
// Generic hook for Firestore collections
function useFirestoreCollection(collectionName, queryConstraints = [], enabled = true) {
    const { organization } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$OrganizationContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOrganization"])();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const orgId = organization?.id;
    const service = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!orgId) return null;
        // Skip Firestore for demo org
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firestore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isDemoOrganization"])(orgId)) return null;
        return new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firestore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FirestoreService"](orgId, collectionName);
    }, [
        orgId,
        collectionName
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // For demo mode, don't fetch from Firestore
        if (!orgId || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firestore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isDemoOrganization"])(orgId)) {
            setLoading(false);
            return;
        }
        if (!service || !enabled) {
            setLoading(false);
            return;
        }
        setLoading(true);
        const unsubscribe = service.subscribe((newData)=>{
            setData(newData);
            setLoading(false);
            setError(null);
        }, (err)=>{
            console.error(`Error fetching ${collectionName}:`, err);
            setError(err);
            setLoading(false);
        }, ...queryConstraints);
        return ()=>unsubscribe();
    }, [
        service,
        enabled,
        orgId,
        collectionName,
        JSON.stringify(queryConstraints)
    ]);
    const create = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (item)=>{
        if (!service) throw new Error('No organization or in demo mode');
        return service.create(item);
    }, [
        service
    ]);
    const update = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id, updates)=>{
        if (!service) throw new Error('No organization or in demo mode');
        return service.update(id, updates);
    }, [
        service
    ]);
    const remove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id)=>{
        if (!service) throw new Error('No organization or in demo mode');
        return service.delete(id);
    }, [
        service
    ]);
    const getById = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id)=>{
        if (!service) throw new Error('No organization or in demo mode');
        return service.get(id);
    }, [
        service
    ]);
    return {
        data,
        loading,
        error,
        create,
        update,
        remove,
        getById,
        service,
        isDemo: orgId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firestore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isDemoOrganization"])(orgId) : false
    };
}
function useProducts() {
    const result = useFirestoreCollection('products', [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderBy"])('name')
    ]);
    return {
        products: result.data,
        ...result
    };
}
function useProduct(productId) {
    const { organization } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$OrganizationContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOrganization"])();
    const [product, setProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const orgId = organization?.id;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!orgId || !productId || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firestore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isDemoOrganization"])(orgId)) {
            setLoading(false);
            return;
        }
        const service = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firestore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FirestoreService"](orgId, 'products');
        const unsubscribe = service.subscribeToDoc(productId, (data)=>{
            setProduct(data);
            setLoading(false);
        }, (err)=>{
            setError(err);
            setLoading(false);
        });
        return ()=>unsubscribe();
    }, [
        orgId,
        productId
    ]);
    return {
        product,
        loading,
        error
    };
}
function useOrders(status) {
    const constraints = [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc')
    ];
    if (status && status !== 'all') {
        constraints.unshift((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["where"])('status', '==', status));
    }
    const result = useFirestoreCollection('orders', constraints);
    return {
        orders: result.data,
        ...result
    };
}
function useRecentOrders(count = 10) {
    const result = useFirestoreCollection('orders', [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc'),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["limit"])(count)
    ]);
    return {
        orders: result.data,
        ...result
    };
}
function usePurchaseOrders(status) {
    const constraints = [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc')
    ];
    if (status && status !== 'all') {
        constraints.unshift((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["where"])('status', '==', status));
    }
    const result = useFirestoreCollection('purchaseOrders', constraints);
    return {
        purchaseOrders: result.data,
        ...result
    };
}
function useWorkOrders(status) {
    const constraints = [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc')
    ];
    if (status && status !== 'all') {
        constraints.unshift((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["where"])('status', '==', status));
    }
    const result = useFirestoreCollection('workOrders', constraints);
    return {
        workOrders: result.data,
        ...result
    };
}
function useSuppliers() {
    const result = useFirestoreCollection('suppliers', [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderBy"])('name')
    ]);
    return {
        suppliers: result.data,
        ...result
    };
}
function useLocations() {
    const result = useFirestoreCollection('locations', [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderBy"])('name')
    ]);
    return {
        locations: result.data,
        ...result
    };
}
function useReturns(status) {
    const constraints = [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc')
    ];
    if (status && status !== 'all') {
        constraints.unshift((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["where"])('status', '==', status));
    }
    const result = useFirestoreCollection('returns', constraints);
    return {
        returns: result.data,
        ...result
    };
}
function useStockTransfers(status) {
    const constraints = [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc')
    ];
    if (status && status !== 'all') {
        constraints.unshift((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["where"])('status', '==', status));
    }
    const result = useFirestoreCollection('transfers', constraints);
    return {
        transfers: result.data,
        ...result
    };
}
function useBundles() {
    const result = useFirestoreCollection('bundles', [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderBy"])('name')
    ]);
    return {
        bundles: result.data,
        ...result
    };
}
function useInventory(locationId) {
    const constraints = [];
    if (locationId) {
        constraints.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["where"])('locationId', '==', locationId));
    }
    const result = useFirestoreCollection('inventory', constraints);
    return {
        inventory: result.data,
        ...result
    };
}
function useLowStockProducts() {
    const { products } = useProducts();
    const lowStock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return products.filter((p)=>{
            // Check using reorderPoint as threshold
            const threshold = p.reorderPoint || 10;
            // We need inventory data to check actual stock levels
            // For now, just return empty as we need to join with inventory
            return false;
        });
    }, [
        products
    ]);
    const outOfStock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        // Need inventory data to determine out of stock
        return [];
    }, [
        products
    ]);
    return {
        lowStock,
        outOfStock
    };
}
function useDashboardStats() {
    const { orders, loading: ordersLoading, isDemo } = useOrders();
    const { products, loading: productsLoading } = useProducts();
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayOrders = orders.filter((o)=>{
            const createdAt = o.createdAt;
            const orderDate = typeof createdAt === 'string' ? new Date(createdAt) : createdAt instanceof Date ? createdAt : new Date();
            return orderDate >= today;
        });
        const pendingOrders = orders.filter((o)=>[
                'pending',
                'to_pick',
                'to_pack'
            ].includes(o.status));
        const shippedToday = orders.filter((o)=>{
            if (o.status !== 'shipped' && o.status !== 'delivered') return false;
            // Check shipments for shipped date
            const shippedDate = o.shipments?.[0]?.shippedAt;
            if (!shippedDate) return false;
            const shipped = typeof shippedDate === 'string' ? new Date(shippedDate) : new Date();
            return shipped >= today;
        });
        return {
            todayOrders: todayOrders.length,
            todayRevenue: todayOrders.reduce((sum, o)=>sum + (o.total || 0), 0),
            pendingOrders: pendingOrders.length,
            shippedToday: shippedToday.length,
            totalProducts: products.length,
            lowStockCount: 0,
            outOfStockCount: 0
        };
    }, [
        orders,
        products
    ]);
    return {
        ...stats,
        loading: ordersLoading || productsLoading,
        isDemo
    };
}
function useProductsWithInventory() {
    const { products, loading: productsLoading, ...productMethods } = useProducts();
    const { inventory, loading: inventoryLoading } = useInventory();
    const productsWithStock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return products.map((product)=>{
            const stockItems = inventory.filter((i)=>i.productId === product.id);
            const totalStock = stockItems.reduce((sum, i)=>sum + i.quantity, 0);
            return {
                ...product,
                totalStock,
                stockByLocation: stockItems
            };
        });
    }, [
        products,
        inventory
    ]);
    return {
        products: productsWithStock,
        loading: productsLoading || inventoryLoading,
        ...productMethods
    };
}
}),
"[project]/app/(dashboard)/inventory/counts/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StockCountsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AppContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Toast.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modals$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/modals/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modals$2f$CreateStockCountModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modals/CreateStockCountModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$inventory$2f$StatusBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/inventory/StatusBadge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$inventory$2f$InventoryStats$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/inventory/InventoryStats.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$inventory$2f$InventoryFilters$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/inventory/InventoryFilters.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$inventory$2f$InventoryTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/inventory/InventoryTable.tsx [app-ssr] (ecmascript)");
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
;
function StockCountsPageContent() {
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { state, dispatch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApp"])();
    const { success, warning } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const [isCreateModalOpen, setIsCreateModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(searchParams.get('status') || '');
    const [typeFilter, setTypeFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const itemsPerPage = 10;
    const filteredCounts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return state.stockCounts.filter((count)=>{
            const matchesSearch = count.countNumber.toLowerCase().includes(searchQuery.toLowerCase()) || count.name.toLowerCase().includes(searchQuery.toLowerCase()) || count.locationName.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = !statusFilter || count.status === statusFilter;
            const matchesType = !typeFilter || count.type === typeFilter;
            return matchesSearch && matchesStatus && matchesType;
        });
    }, [
        state.stockCounts,
        searchQuery,
        statusFilter,
        typeFilter
    ]);
    const totalPages = Math.ceil(filteredCounts.length / itemsPerPage);
    const paginatedCounts = filteredCounts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const today = new Date();
        const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        return {
            activeCounts: state.stockCounts.filter((c)=>c.status === 'in_progress').length,
            completedThisMonth: state.stockCounts.filter((c)=>c.status === 'completed' && c.completedAt && new Date(c.completedAt) >= thisMonth).length,
            discrepancyItems: state.stockCounts.filter((c)=>c.status === 'in_progress' || c.status === 'completed').reduce((sum, c)=>sum + c.summary.discrepancyItems, 0),
            totalVariance: state.stockCounts.filter((c)=>c.status === 'completed').reduce((sum, c)=>sum + c.summary.totalVariance, 0)
        };
    }, [
        state.stockCounts
    ]);
    const formatDate = (date)=>new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    const handleDelete = (count, e)=>{
        e.stopPropagation();
        if (count.status === 'in_progress') {
            warning('Cannot delete an active count. Cancel it first.');
            return;
        }
        dispatch({
            type: 'DELETE_STOCK_COUNT',
            payload: count.id
        });
        success(`Stock count ${count.countNumber} deleted`);
    };
    const handleStatClick = (status)=>{
        setStatusFilter((prev)=>prev === status ? '' : status);
        setCurrentPage(1);
    };
    const hasFilters = !!(searchQuery || statusFilter || typeFilter);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$inventory$2f$InventoryFilters$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PageHeader"], {
                title: "Stock Counts",
                subtitle: "Physical inventory verification",
                backHref: "/inventory",
                actions: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$inventory$2f$InventoryTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PrimaryActionButton"], {
                    icon: "fa-plus",
                    label: "New Count",
                    onClick: ()=>setIsCreateModalOpen(true)
                }, void 0, false, {
                    fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                    lineNumber: 100,
                    columnNumber: 18
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$inventory$2f$InventoryStats$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InventoryStatsGrid"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$inventory$2f$InventoryStats$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClickableStatCard"], {
                        icon: "fa-clipboard-list",
                        iconColor: "blue",
                        value: stats.activeCounts,
                        label: "Active Counts",
                        onClick: ()=>handleStatClick('in_progress'),
                        isActive: statusFilter === 'in_progress'
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$inventory$2f$InventoryStats$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClickableStatCard"], {
                        icon: "fa-check-circle",
                        iconColor: "emerald",
                        value: stats.completedThisMonth,
                        label: "Completed This Month",
                        onClick: ()=>handleStatClick('completed'),
                        isActive: statusFilter === 'completed'
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$inventory$2f$InventoryStats$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClickableStatCard"], {
                        icon: "fa-exclamation-triangle",
                        iconColor: "amber",
                        value: stats.discrepancyItems,
                        label: "Items with Discrepancy"
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$inventory$2f$InventoryStats$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClickableStatCard"], {
                        icon: "fa-dollar-sign",
                        iconColor: stats.totalVariance >= 0 ? 'emerald' : 'red',
                        value: Math.abs(stats.totalVariance),
                        format: "currency",
                        label: "Total Variance Value"
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$inventory$2f$InventoryFilters$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FilterBar"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$inventory$2f$InventoryFilters$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SearchInput"], {
                        value: searchQuery,
                        onChange: setSearchQuery,
                        placeholder: "Search counts..."
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$inventory$2f$InventoryFilters$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FilterSelect"], {
                        value: statusFilter,
                        onChange: (v)=>{
                            setStatusFilter(v);
                            setCurrentPage(1);
                        },
                        placeholder: "All Statuses",
                        options: [
                            {
                                value: 'draft',
                                label: 'Draft'
                            },
                            {
                                value: 'in_progress',
                                label: 'In Progress'
                            },
                            {
                                value: 'completed',
                                label: 'Completed'
                            },
                            {
                                value: 'cancelled',
                                label: 'Cancelled'
                            }
                        ]
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$inventory$2f$InventoryFilters$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FilterSelect"], {
                        value: typeFilter,
                        onChange: (v)=>{
                            setTypeFilter(v);
                            setCurrentPage(1);
                        },
                        placeholder: "All Types",
                        options: [
                            {
                                value: 'full',
                                label: 'Full Count'
                            },
                            {
                                value: 'cycle',
                                label: 'Cycle Count'
                            },
                            {
                                value: 'spot',
                                label: 'Spot Check'
                            }
                        ]
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this),
                    hasFilters && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$inventory$2f$InventoryFilters$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClearFiltersButton"], {
                        onClick: ()=>{
                            setSearchQuery('');
                            setStatusFilter('');
                            setTypeFilter('');
                            setCurrentPage(1);
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                        lineNumber: 163,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$inventory$2f$InventoryTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableWrapper"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "border-b border-slate-700/50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider",
                                            children: "Count #"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                            lineNumber: 176,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider",
                                            children: "Name"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                            lineNumber: 177,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider",
                                            children: "Type"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                            lineNumber: 178,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider",
                                            children: "Location"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                            lineNumber: 179,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider",
                                            children: "Progress"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                            lineNumber: 180,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider",
                                            children: "Status"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                            lineNumber: 181,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider",
                                            children: "Started"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                            lineNumber: 182,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "text-right p-4 text-xs font-medium text-slate-400 uppercase tracking-wider",
                                            children: "Actions"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                            lineNumber: 183,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                    lineNumber: 175,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                lineNumber: 174,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: paginatedCounts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        colSpan: 8,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$inventory$2f$InventoryTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmptyState"], {
                                            icon: "fa-clipboard-check",
                                            title: "No stock counts found",
                                            description: hasFilters ? 'Try adjusting your filters' : 'Create your first stock count to verify inventory',
                                            showFilterHint: hasFilters
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                            lineNumber: 190,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                        lineNumber: 189,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                    lineNumber: 188,
                                    columnNumber: 15
                                }, this) : paginatedCounts.map((count)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-b border-slate-700/30 hover:bg-slate-700/30 cursor-pointer transition-colors",
                                        onClick: ()=>router.push(`/inventory/counts/${count.id}`),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-medium text-white",
                                                    children: count.countNumber
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                                    lineNumber: 206,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                                lineNumber: 205,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-slate-200",
                                                        children: count.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                                        lineNumber: 209,
                                                        columnNumber: 21
                                                    }, this),
                                                    count.assignedTo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-slate-500",
                                                        children: [
                                                            "Assigned to: ",
                                                            count.assignedTo
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                                        lineNumber: 211,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                                lineNumber: 208,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$inventory$2f$StatusBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TypeBadge"], {
                                                    type: count.type,
                                                    config: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$inventory$2f$StatusBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["countTypeConfig"]
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                                    lineNumber: 215,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                                lineNumber: 214,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-4 text-slate-300",
                                                children: count.locationName
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                                lineNumber: 217,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$inventory$2f$InventoryStats$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProgressBar"], {
                                                    current: count.summary.countedItems,
                                                    total: count.summary.totalItems,
                                                    completed: count.status === 'completed'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                                    lineNumber: 219,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                                lineNumber: 218,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$inventory$2f$StatusBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                                    status: count.status,
                                                    config: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$inventory$2f$StatusBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stockCountStatusConfig"],
                                                    animated: count.status === 'in_progress'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                                    lineNumber: 226,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                                lineNumber: 225,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-4 text-slate-300",
                                                children: count.startedAt ? formatDate(count.startedAt) : '-'
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                                lineNumber: 232,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-4 text-right",
                                                onClick: (e)=>e.stopPropagation(),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-end gap-2",
                                                    children: [
                                                        count.status === 'draft' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$inventory$2f$InventoryTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionButton"], {
                                                            icon: "fa-play",
                                                            color: "blue",
                                                            title: "Start Count",
                                                            onClick: ()=>router.push(`/inventory/counts/${count.id}`)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                                            lineNumber: 238,
                                                            columnNumber: 25
                                                        }, this),
                                                        count.status === 'in_progress' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$inventory$2f$InventoryTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionButton"], {
                                                            icon: "fa-arrow-right",
                                                            color: "emerald",
                                                            title: "Continue Count",
                                                            onClick: ()=>router.push(`/inventory/counts/${count.id}`)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                                            lineNumber: 246,
                                                            columnNumber: 25
                                                        }, this),
                                                        count.status !== 'in_progress' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$inventory$2f$InventoryTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionButton"], {
                                                            icon: "fa-trash",
                                                            color: "red",
                                                            title: "Delete",
                                                            onClick: (e)=>handleDelete(count, e)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$inventory$2f$InventoryTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionButton"], {
                                                            icon: "fa-chevron-right",
                                                            title: "View Details",
                                                            onClick: ()=>router.push(`/inventory/counts/${count.id}`)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                                            lineNumber: 261,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                                    lineNumber: 236,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                                lineNumber: 235,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, count.id, true, {
                                        fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                        lineNumber: 200,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                                lineNumber: 186,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$inventory$2f$InventoryTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Pagination"], {
                        currentPage: currentPage,
                        totalPages: totalPages,
                        totalItems: filteredCounts.length,
                        itemsPerPage: itemsPerPage,
                        itemLabel: "counts",
                        onPageChange: setCurrentPage
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                        lineNumber: 274,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                lineNumber: 172,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modals$2f$CreateStockCountModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CreateStockCountModal"], {
                isOpen: isCreateModalOpen,
                onClose: ()=>setIsCreateModalOpen(false)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                lineNumber: 284,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
function StockCountsPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "animate-pulse space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-8 bg-slate-800/50 rounded w-48"
                }, void 0, false, {
                    fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                    lineNumber: 296,
                    columnNumber: 9
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-4 gap-4",
                    children: [
                        ...Array(4)
                    ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-24 bg-slate-800/50 rounded-xl"
                        }, i, false, {
                            fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                            lineNumber: 299,
                            columnNumber: 13
                        }, void 0))
                }, void 0, false, {
                    fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                    lineNumber: 297,
                    columnNumber: 9
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-96 bg-slate-800/50 rounded-xl"
                }, void 0, false, {
                    fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
                    lineNumber: 302,
                    columnNumber: 9
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
            lineNumber: 295,
            columnNumber: 7
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StockCountsPageContent, {}, void 0, false, {
            fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
            lineNumber: 305,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(dashboard)/inventory/counts/page.tsx",
        lineNumber: 294,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_c8e02870._.js.map