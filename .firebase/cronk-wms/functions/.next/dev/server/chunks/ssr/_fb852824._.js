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
"[project]/app/(dashboard)/operations/work-orders/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WorkOrdersPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-ssr] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-ssr] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-ssr] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-ssr] (ecmascript) <export default as Edit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AppContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Toast.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$ConfirmDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/ConfirmDialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modals$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/modals/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modals$2f$CreateWorkOrderModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modals/CreateWorkOrderModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modals$2f$WorkOrderDetailModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modals/WorkOrderDetailModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/formatting.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Breadcrumb$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Breadcrumb.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/operations/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsBadges$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/operations/OperationsBadges.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsStats$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/operations/OperationsStats.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsFilters$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/operations/OperationsFilters.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/operations/OperationsTable.tsx [app-ssr] (ecmascript)");
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
function WorkOrdersPage() {
    const { state, dispatch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApp"])();
    const { success, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const confirm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$ConfirmDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConfirm"])();
    // UI State
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [priorityFilter, setPriorityFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    // Modal State
    const [showCreateModal, setShowCreateModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showDetailModal, setShowDetailModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedWO, setSelectedWO] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editWO, setEditWO] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Get product stock
    const getProductStock = (productId)=>{
        return state.inventory.filter((i)=>i.productId === productId).reduce((sum, i)=>sum + i.quantity, 0);
    };
    // Filter work orders
    const filteredWorkOrders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return state.workOrders.filter((wo)=>{
            if (statusFilter && wo.status !== statusFilter) return false;
            if (priorityFilter && wo.priority !== priorityFilter) return false;
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                return wo.woNumber.toLowerCase().includes(query) || wo.outputProductName.toLowerCase().includes(query);
            }
            return true;
        });
    }, [
        state.workOrders,
        statusFilter,
        priorityFilter,
        searchQuery
    ]);
    // Stats
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return {
            pending: state.workOrders.filter((wo)=>wo.status === 'pending').length,
            inProgress: state.workOrders.filter((wo)=>wo.status === 'in_progress').length,
            completedThisWeek: state.workOrders.filter((wo)=>{
                if (wo.status !== 'completed' || !wo.completedAt) return false;
                return new Date(wo.completedAt) >= weekAgo;
            }).length,
            unitsProducedThisWeek: state.workOrders.filter((wo)=>wo.status === 'completed' && wo.completedAt && new Date(wo.completedAt) >= weekAgo).reduce((sum, wo)=>sum + wo.quantityProduced, 0),
            unitsInProduction: state.workOrders.filter((wo)=>wo.status === 'in_progress').reduce((sum, wo)=>sum + wo.quantityToProduce, 0),
            bomCount: state.bundles.length
        };
    }, [
        state.workOrders,
        state.bundles
    ]);
    // Active work orders
    const activeWorkOrders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return state.workOrders.filter((wo)=>wo.status === 'in_progress');
    }, [
        state.workOrders
    ]);
    // Handlers
    const handleViewWO = (wo)=>{
        setSelectedWO(wo);
        setShowDetailModal(true);
    };
    const handleEditWO = (wo)=>{
        if (wo.status !== 'pending') {
            error('Only pending work orders can be edited');
            return;
        }
        setEditWO(wo);
        setShowDetailModal(false);
        setShowCreateModal(true);
    };
    const handleStartProduction = async (wo)=>{
        const canStart = wo.components.every((c)=>{
            const available = getProductStock(c.productId);
            return available >= c.quantityRequired;
        });
        if (!canStart) {
            error('Insufficient stock to start production');
            return;
        }
        const confirmed = await confirm({
            title: 'Start Production',
            message: `Start production on ${wo.woNumber}? This will deduct components from inventory.`,
            confirmText: 'Start Production'
        });
        if (confirmed) {
            wo.components.forEach((c)=>{
                const defaultLoc = state.locations.find((l)=>l.isDefault);
                const locationId = defaultLoc?.id || state.locations[0]?.id || 'loc-1';
                dispatch({
                    type: 'ADJUST_STOCK',
                    payload: {
                        productId: c.productId,
                        locationId,
                        adjustment: -c.quantityRequired
                    }
                });
            });
            dispatch({
                type: 'UPDATE_WORK_ORDER',
                payload: {
                    ...wo,
                    status: 'in_progress',
                    startedAt: new Date(),
                    components: wo.components.map((c)=>({
                            ...c,
                            quantityUsed: c.quantityRequired
                        }))
                }
            });
            success(`Started production on ${wo.woNumber}`);
        }
    };
    const handleComplete = async (wo)=>{
        const confirmed = await confirm({
            title: 'Complete Work Order',
            message: `Complete ${wo.woNumber}? This will add ${wo.quantityToProduce} ${wo.outputProductName} to inventory.`,
            confirmText: 'Complete'
        });
        if (confirmed) {
            const defaultLoc = state.locations.find((l)=>l.isDefault);
            const locationId = defaultLoc?.id || state.locations[0]?.id || 'loc-1';
            dispatch({
                type: 'ADJUST_STOCK',
                payload: {
                    productId: wo.outputProductId,
                    locationId,
                    adjustment: wo.quantityToProduce
                }
            });
            dispatch({
                type: 'UPDATE_WORK_ORDER',
                payload: {
                    ...wo,
                    status: 'completed',
                    quantityProduced: wo.quantityToProduce,
                    completedAt: new Date()
                }
            });
            success(`${wo.woNumber} completed! ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatNumber"])(wo.quantityToProduce)} ${wo.outputProductName} added to inventory`);
        }
    };
    const handleExport = ()=>{
        const headers = [
            'WO Number',
            'Output Product',
            'Quantity',
            'Status',
            'Priority',
            'Due Date',
            'Created'
        ];
        const rows = filteredWorkOrders.map((wo)=>[
                wo.woNumber,
                wo.outputProductName,
                wo.quantityToProduce.toString(),
                wo.status,
                wo.priority,
                wo.dueDate ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDate"])(wo.dueDate) : '',
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDate"])(wo.createdAt)
            ]);
        const csv = [
            headers.join(','),
            ...rows.map((r)=>r.join(','))
        ].join('\n');
        const blob = new Blob([
            csv
        ], {
            type: 'text/csv'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `work-orders-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        success('Exported work orders to CSV');
    };
    const clearFilters = ()=>{
        setStatusFilter('');
        setPriorityFilter('');
        setSearchQuery('');
    };
    const hasFilters = !!(statusFilter || priorityFilter || searchQuery);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Breadcrumb$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Breadcrumb"], {
                items: [
                    {
                        label: 'Operations'
                    },
                    {
                        label: 'Work Orders'
                    }
                ]
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold text-white",
                                children: "Work Orders"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                lineNumber: 214,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-400",
                                children: "Manage production, labeling, and assembly tasks"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                        lineNumber: 213,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleExport,
                                className: "px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                        lineNumber: 222,
                                        columnNumber: 13
                                    }, this),
                                    "Export"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                lineNumber: 218,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setEditWO(null);
                                    setShowCreateModal(true);
                                },
                                className: "px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                        lineNumber: 229,
                                        columnNumber: 13
                                    }, this),
                                    "New Work Order"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                lineNumber: 225,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                        lineNumber: 217,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                lineNumber: 212,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsStats$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OperationsStatsGrid"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsStats$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OperationsStatCard"], {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
                        iconColor: "slate",
                        value: stats.pending,
                        label: "Pending",
                        onClick: ()=>setStatusFilter('pending'),
                        isActive: statusFilter === 'pending'
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                        lineNumber: 237,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsStats$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OperationsStatCard"], {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"],
                        iconColor: "blue",
                        value: stats.inProgress,
                        label: "In Progress",
                        onClick: ()=>setStatusFilter('in_progress'),
                        isActive: statusFilter === 'in_progress',
                        accentBorder: true
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                        lineNumber: 238,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsStats$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OperationsStatCard"], {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"],
                        iconColor: "emerald",
                        value: stats.completedThisWeek,
                        label: "Completed (7d)",
                        onClick: ()=>setStatusFilter('completed'),
                        isActive: statusFilter === 'completed',
                        accentBorder: true
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                        lineNumber: 239,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsStats$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OperationsStatCard"], {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"],
                        iconColor: "slate",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatNumber"])(stats.unitsInProduction),
                        label: "Units in Production"
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                        lineNumber: 240,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsStats$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OperationsStatCard"], {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"],
                        iconColor: "amber",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatNumber"])(stats.unitsProducedThisWeek),
                        label: "Produced (7d)",
                        accentBorder: true
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                        lineNumber: 241,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsStats$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OperationsStatCard"], {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"],
                        iconColor: "purple",
                        value: stats.bomCount,
                        label: "Active BOMs",
                        accentBorder: true
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                        lineNumber: 242,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                lineNumber: 236,
                columnNumber: 7
            }, this),
            activeWorkOrders.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-xl overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-5 py-4 border-b border-slate-700/50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-semibold text-white",
                                children: "Active Work Orders"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                lineNumber: 249,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-slate-400",
                                children: "Work orders currently in progress"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                lineNumber: 250,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                        lineNumber: 248,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-5 grid grid-cols-2 gap-4",
                        children: activeWorkOrders.map((wo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-800/50 border border-blue-500/30 rounded-xl p-4 cursor-pointer hover:border-blue-500/50 transition-colors",
                                onClick: ()=>handleViewWO(wo),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-sm font-medium text-white",
                                                        children: wo.woNumber
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                        lineNumber: 261,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsBadges$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WOStatusBadge"], {
                                                        status: wo.status
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                        lineNumber: 262,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                lineNumber: 260,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsBadges$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PriorityBadge"], {
                                                priority: wo.priority
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                lineNumber: 264,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                        lineNumber: 259,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                    className: "w-6 h-6 text-emerald-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                    lineNumber: 269,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                lineNumber: 268,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-white font-medium",
                                                        children: wo.outputProductName
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                        lineNumber: 272,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-slate-400",
                                                        children: [
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatNumber"])(wo.quantityToProduce),
                                                            " units"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                        lineNumber: 273,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                lineNumber: 271,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                        lineNumber: 267,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between text-sm mb-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-slate-400",
                                                        children: "Progress"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                        lineNumber: 279,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-blue-400",
                                                        children: "50%"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                        lineNumber: 280,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                lineNumber: 278,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-2 bg-slate-700 rounded-full overflow-hidden",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-full bg-blue-500 rounded-full",
                                                    style: {
                                                        width: '50%'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                    lineNumber: 283,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                lineNumber: 282,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                        lineNumber: 277,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        onClick: (e)=>e.stopPropagation(),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleComplete(wo),
                                                className: "flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm flex items-center justify-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                        lineNumber: 292,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Complete"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                lineNumber: 288,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleViewWO(wo),
                                                className: "px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                    lineNumber: 299,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                lineNumber: 295,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                        lineNumber: 287,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, wo.id, true, {
                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                lineNumber: 254,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                        lineNumber: 252,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                lineNumber: 247,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsFilters$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FilterBar"], {
                onClear: clearFilters,
                showClear: hasFilters,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsFilters$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SearchInput"], {
                        value: searchQuery,
                        onChange: setSearchQuery,
                        placeholder: "Search by WO number or product..."
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                        lineNumber: 310,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsFilters$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FilterSelect"], {
                        value: statusFilter,
                        onChange: setStatusFilter,
                        placeholder: "All Statuses",
                        options: [
                            {
                                value: 'pending',
                                label: 'Pending'
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
                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                        lineNumber: 311,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsFilters$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FilterSelect"], {
                        value: priorityFilter,
                        onChange: setPriorityFilter,
                        placeholder: "All Priorities",
                        options: [
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
                        ]
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                        lineNumber: 322,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                lineNumber: 309,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-slate-800/50 border-b border-slate-700/50",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "text-left text-xs text-slate-400 uppercase tracking-wider",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 font-medium",
                                                children: "WO Number"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                lineNumber: 340,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 font-medium",
                                                children: "Output Product"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                lineNumber: 341,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 font-medium",
                                                children: "Quantity"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                lineNumber: 342,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 font-medium",
                                                children: "Priority"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                lineNumber: 343,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 font-medium",
                                                children: "Due Date"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                lineNumber: 344,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 font-medium text-center",
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                lineNumber: 345,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 font-medium text-center",
                                                children: "Actions"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                lineNumber: 346,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                        lineNumber: 339,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                    lineNumber: 338,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "divide-y divide-slate-700/50",
                                    children: filteredWorkOrders.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: 7,
                                            className: "px-4 py-12 text-center text-slate-400",
                                            children: state.workOrders.length === 0 ? 'No work orders yet. Create your first work order!' : 'No work orders match your filters.'
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                            lineNumber: 352,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                        lineNumber: 351,
                                        columnNumber: 17
                                    }, this) : filteredWorkOrders.map((wo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "hover:bg-slate-700/30 transition-colors cursor-pointer",
                                            onClick: ()=>handleViewWO(wo),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-mono text-sm font-medium text-white",
                                                            children: wo.woNumber
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                            lineNumber: 362,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-slate-500",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDate"])(wo.createdAt)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                            lineNumber: 363,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                    lineNumber: 361,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-white",
                                                        children: wo.outputProductName
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                        lineNumber: 366,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                    lineNumber: 365,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-white",
                                                        children: [
                                                            wo.status === 'completed' ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatNumber"])(wo.quantityProduced)} / ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatNumber"])(wo.quantityToProduce)}` : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatNumber"])(wo.quantityToProduce),
                                                            " units"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                        lineNumber: 369,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                    lineNumber: 368,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsBadges$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PriorityBadge"], {
                                                            priority: wo.priority
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                            lineNumber: 376,
                                                            columnNumber: 23
                                                        }, this),
                                                        wo.priority === 'normal' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm text-slate-400",
                                                            children: "Normal"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                            lineNumber: 377,
                                                            columnNumber: 52
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                    lineNumber: 375,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-4 text-sm text-white",
                                                    children: wo.dueDate ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDate"])(wo.dueDate) : '-'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                    lineNumber: 379,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-4 text-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsBadges$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WOStatusBadge"], {
                                                        status: wo.status
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                        lineNumber: 383,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                    lineNumber: 382,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-center gap-1",
                                                        onClick: (e)=>e.stopPropagation(),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleViewWO(wo),
                                                                className: "p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors",
                                                                title: "View",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                                    className: "w-4 h-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                                    lineNumber: 388,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                                lineNumber: 387,
                                                                columnNumber: 25
                                                            }, this),
                                                            wo.status === 'pending' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>handleEditWO(wo),
                                                                        className: "p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors",
                                                                        title: "Edit",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                                                            className: "w-4 h-4"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                                            lineNumber: 393,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                                        lineNumber: 392,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>handleStartProduction(wo),
                                                                        className: "px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded-lg flex items-center gap-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                                                className: "w-3 h-3"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                                                lineNumber: 399,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            "Start"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                                        lineNumber: 395,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true),
                                                            wo.status === 'in_progress' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleComplete(wo),
                                                                className: "px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded-lg flex items-center gap-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                        className: "w-3 h-3"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                                        lineNumber: 408,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    "Complete"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                                lineNumber: 404,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                        lineNumber: 386,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                    lineNumber: 385,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, wo.id, true, {
                                            fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                            lineNumber: 360,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                    lineNumber: 349,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                            lineNumber: 337,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                        lineNumber: 336,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationFooter"], {
                        showing: filteredWorkOrders.length,
                        total: state.workOrders.length,
                        label: "work orders"
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                        lineNumber: 419,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                lineNumber: 335,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-5 py-4 border-b border-slate-700/50 flex items-center justify-between",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "font-semibold text-white",
                                    children: "Available BOMs (Bundles)"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                    lineNumber: 426,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-slate-400",
                                    children: "Bundles can be used as Bill of Materials for work orders"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                    lineNumber: 427,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                            lineNumber: 425,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                        lineNumber: 424,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 grid grid-cols-4 gap-4",
                        children: state.bundles.slice(0, 8).map((bundle)=>{
                            let canBuild = Infinity;
                            bundle.components.forEach((c)=>{
                                const stock = getProductStock(c.productId);
                                canBuild = Math.min(canBuild, Math.floor(stock / c.quantity));
                            });
                            if (canBuild === Infinity) canBuild = 0;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 hover:border-emerald-500/30 transition-colors cursor-pointer",
                                onClick: ()=>{
                                    setEditWO(null);
                                    setShowCreateModal(true);
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-8 h-8 bg-purple-500/20 rounded flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                    className: "w-4 h-4 text-purple-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                    lineNumber: 447,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                lineNumber: 446,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium text-white truncate",
                                                children: bundle.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                lineNumber: 449,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                        lineNumber: 445,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-slate-400 mb-2",
                                        children: [
                                            bundle.components.length,
                                            " components"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                        lineNumber: 451,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between text-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-500",
                                                children: "Can build:"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                lineNumber: 453,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: canBuild > 0 ? 'text-emerald-400' : 'text-red-400',
                                                children: [
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatNumber"])(canBuild),
                                                    " units"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                                lineNumber: 454,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                        lineNumber: 452,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, bundle.id, true, {
                                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                                lineNumber: 440,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                        lineNumber: 430,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                lineNumber: 423,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modals$2f$CreateWorkOrderModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CreateWorkOrderModal"], {
                isOpen: showCreateModal,
                onClose: ()=>{
                    setShowCreateModal(false);
                    setEditWO(null);
                },
                editWO: editWO
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                lineNumber: 465,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modals$2f$WorkOrderDetailModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WorkOrderDetailModal"], {
                isOpen: showDetailModal,
                onClose: ()=>{
                    setShowDetailModal(false);
                    setSelectedWO(null);
                },
                workOrder: selectedWO,
                onEdit: handleEditWO
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
                lineNumber: 466,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(dashboard)/operations/work-orders/page.tsx",
        lineNumber: 208,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_fb852824._.js.map