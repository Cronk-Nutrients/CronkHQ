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
"[project]/lib/ruleTemplates.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/automationEngine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/operations/purchase-orders/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PurchaseOrdersPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/truck.js [app-client] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-client] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-client] (ecmascript) <export default as Edit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AppContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Toast.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/ConfirmDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modals$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/modals/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modals$2f$CreatePOModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modals/CreatePOModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modals$2f$ReceivePOModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modals/ReceivePOModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$panels$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/panels/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$panels$2f$PODetailPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/panels/PODetailPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/formatting.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Breadcrumb$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Breadcrumb.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/operations/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsBadges$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/operations/OperationsBadges.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsStats$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/operations/OperationsStats.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsFilters$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/operations/OperationsFilters.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/operations/OperationsTable.tsx [app-client] (ecmascript)");
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
;
function PurchaseOrdersPage() {
    _s();
    const { state, dispatch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const { success, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const confirm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfirm"])();
    // UI State
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [supplierFilter, setSupplierFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [currencyFilter, setCurrencyFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Modal/Panel State
    const [showCreateModal, setShowCreateModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showReceiveModal, setShowReceiveModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showDetailPanel, setShowDetailPanel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedPO, setSelectedPO] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editPO, setEditPO] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [initialItems, setInitialItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Get unique suppliers
    const suppliers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PurchaseOrdersPage.useMemo[suppliers]": ()=>{
            const supplierSet = new Set();
            state.purchaseOrders.forEach({
                "PurchaseOrdersPage.useMemo[suppliers]": (po)=>{
                    if (po.supplier) supplierSet.add(po.supplier);
                }
            }["PurchaseOrdersPage.useMemo[suppliers]"]);
            return Array.from(supplierSet).sort();
        }
    }["PurchaseOrdersPage.useMemo[suppliers]"], [
        state.purchaseOrders
    ]);
    // Filter POs
    const filteredPOs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PurchaseOrdersPage.useMemo[filteredPOs]": ()=>{
            return state.purchaseOrders.filter({
                "PurchaseOrdersPage.useMemo[filteredPOs]": (po)=>{
                    if (statusFilter && po.status !== statusFilter) return false;
                    if (supplierFilter && po.supplier !== supplierFilter) return false;
                    if (currencyFilter && po.currency !== currencyFilter) return false;
                    if (searchQuery) {
                        const query = searchQuery.toLowerCase();
                        return po.poNumber.toLowerCase().includes(query) || po.supplier.toLowerCase().includes(query);
                    }
                    return true;
                }
            }["PurchaseOrdersPage.useMemo[filteredPOs]"]);
        }
    }["PurchaseOrdersPage.useMemo[filteredPOs]"], [
        state.purchaseOrders,
        statusFilter,
        supplierFilter,
        currencyFilter,
        searchQuery
    ]);
    // Stats
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PurchaseOrdersPage.useMemo[stats]": ()=>{
            const now = new Date();
            const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            return {
                totalPOs: state.purchaseOrders.length,
                draftCount: state.purchaseOrders.filter({
                    "PurchaseOrdersPage.useMemo[stats]": (po)=>po.status === 'draft'
                }["PurchaseOrdersPage.useMemo[stats]"]).length,
                sentCount: state.purchaseOrders.filter({
                    "PurchaseOrdersPage.useMemo[stats]": (po)=>po.status === 'sent'
                }["PurchaseOrdersPage.useMemo[stats]"]).length,
                partialCount: state.purchaseOrders.filter({
                    "PurchaseOrdersPage.useMemo[stats]": (po)=>po.status === 'partial'
                }["PurchaseOrdersPage.useMemo[stats]"]).length,
                pendingValue: state.purchaseOrders.filter({
                    "PurchaseOrdersPage.useMemo[stats]": (po)=>[
                            'sent',
                            'partial'
                        ].includes(po.status)
                }["PurchaseOrdersPage.useMemo[stats]"]).reduce({
                    "PurchaseOrdersPage.useMemo[stats]": (sum, po)=>sum + po.total
                }["PurchaseOrdersPage.useMemo[stats]"], 0),
                receivedThisMonth: state.purchaseOrders.filter({
                    "PurchaseOrdersPage.useMemo[stats]": (po)=>{
                        if (po.status !== 'received') return false;
                        return new Date(po.updatedAt) >= thisMonth;
                    }
                }["PurchaseOrdersPage.useMemo[stats]"]).length
            };
        }
    }["PurchaseOrdersPage.useMemo[stats]"], [
        state.purchaseOrders
    ]);
    // Get product stock
    const getProductStock = (productId)=>{
        return state.inventory.filter((i)=>i.productId === productId).reduce((sum, i)=>sum + i.quantity, 0);
    };
    // Low stock suggestions
    const lowStockItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PurchaseOrdersPage.useMemo[lowStockItems]": ()=>{
            return state.products.filter({
                "PurchaseOrdersPage.useMemo[lowStockItems]": (product)=>{
                    const totalStock = getProductStock(product.id);
                    return totalStock <= product.reorderPoint;
                }
            }["PurchaseOrdersPage.useMemo[lowStockItems]"]).map({
                "PurchaseOrdersPage.useMemo[lowStockItems]": (product)=>{
                    const currentStock = getProductStock(product.id);
                    const suggestedQty = Math.max(product.reorderPoint * 2 - currentStock, 1);
                    return {
                        ...product,
                        currentStock,
                        suggestedQty
                    };
                }
            }["PurchaseOrdersPage.useMemo[lowStockItems]"]).slice(0, 8);
        }
    }["PurchaseOrdersPage.useMemo[lowStockItems]"], [
        state.products,
        state.inventory
    ]);
    // Add low stock item to PO
    const addToPO = (product)=>{
        const newItem = {
            productId: product.id,
            productName: product.name,
            sku: product.sku,
            quantity: product.suggestedQty,
            receivedQty: 0,
            unitCost: product.cost.rolling
        };
        setInitialItems((prev)=>{
            if (prev.some((i)=>i.productId === product.id)) return prev;
            return [
                ...prev,
                newItem
            ];
        });
        if (!showCreateModal) {
            setEditPO(null);
            setShowCreateModal(true);
        }
        success(`Added ${product.name} to PO`);
    };
    // Handlers
    const handleViewPO = (po)=>{
        setSelectedPO(po);
        setShowDetailPanel(true);
    };
    const handleEditPO = (po)=>{
        if (po.status !== 'draft') {
            error('Only draft POs can be edited');
            return;
        }
        setEditPO(po);
        setInitialItems([]);
        setShowDetailPanel(false);
        setShowCreateModal(true);
    };
    const handleReceivePO = (po)=>{
        setSelectedPO(po);
        setShowDetailPanel(false);
        setShowReceiveModal(true);
    };
    const handleSendPO = async (po)=>{
        const confirmed = await confirm({
            title: 'Send Purchase Order',
            message: `Send PO ${po.poNumber} to ${po.supplier}? This will mark it as sent.`,
            confirmText: 'Send PO'
        });
        if (confirmed) {
            dispatch({
                type: 'UPDATE_PURCHASE_ORDER',
                payload: {
                    ...po,
                    status: 'sent',
                    updatedAt: new Date()
                }
            });
            success(`PO ${po.poNumber} marked as sent`);
        }
    };
    const handleExport = ()=>{
        const headers = [
            'PO Number',
            'Supplier',
            'Status',
            'Currency',
            'Items',
            'Subtotal',
            'Shipping',
            'Total',
            'Expected Date',
            'Created'
        ];
        const rows = filteredPOs.map((po)=>[
                po.poNumber,
                po.supplier,
                po.status,
                po.currency,
                po.items.length.toString(),
                po.subtotal.toFixed(2),
                po.shipping.toFixed(2),
                po.total.toFixed(2),
                po.expectedDate ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(po.expectedDate) : '',
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(po.createdAt)
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
        a.download = `purchase-orders-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        success('Exported purchase orders to CSV');
    };
    const handleCloseCreateModal = ()=>{
        setShowCreateModal(false);
        setEditPO(null);
        setInitialItems([]);
    };
    const clearFilters = ()=>{
        setStatusFilter('');
        setSupplierFilter('');
        setCurrencyFilter('');
        setSearchQuery('');
    };
    const hasFilters = statusFilter || supplierFilter || currencyFilter || searchQuery;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Breadcrumb$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Breadcrumb"], {
                items: [
                    {
                        label: 'Operations'
                    },
                    {
                        label: 'Purchase Orders'
                    }
                ]
            }, void 0, false, {
                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                lineNumber: 222,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold text-white",
                                children: "Purchase Orders"
                            }, void 0, false, {
                                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                lineNumber: 227,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-400",
                                children: "Manage supplier orders and inventory replenishment"
                            }, void 0, false, {
                                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                lineNumber: 228,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                        lineNumber: 226,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleExport,
                                className: "px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                        lineNumber: 235,
                                        columnNumber: 13
                                    }, this),
                                    "Export"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                lineNumber: 231,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setEditPO(null);
                                    setInitialItems([]);
                                    setShowCreateModal(true);
                                },
                                className: "px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                        lineNumber: 242,
                                        columnNumber: 13
                                    }, this),
                                    "New PO"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                lineNumber: 238,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                        lineNumber: 230,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                lineNumber: 225,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsStats$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OperationsStatsGrid"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsStats$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OperationsStatCard"], {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
                        iconColor: "slate",
                        value: stats.totalPOs,
                        label: "Total POs",
                        onClick: ()=>setStatusFilter(''),
                        isActive: !statusFilter
                    }, void 0, false, {
                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                        lineNumber: 250,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsStats$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OperationsStatCard"], {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"],
                        iconColor: "slate",
                        value: stats.draftCount,
                        label: "Drafts",
                        onClick: ()=>setStatusFilter('draft'),
                        isActive: statusFilter === 'draft'
                    }, void 0, false, {
                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                        lineNumber: 251,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsStats$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OperationsStatCard"], {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"],
                        iconColor: "amber",
                        value: stats.sentCount,
                        label: "Pending",
                        onClick: ()=>setStatusFilter('sent'),
                        isActive: statusFilter === 'sent',
                        accentBorder: true
                    }, void 0, false, {
                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                        lineNumber: 252,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsStats$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OperationsStatCard"], {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"],
                        iconColor: "blue",
                        value: stats.partialCount,
                        label: "Partial",
                        onClick: ()=>setStatusFilter('partial'),
                        isActive: statusFilter === 'partial',
                        accentBorder: true
                    }, void 0, false, {
                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                        lineNumber: 253,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsStats$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OperationsStatCard"], {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"],
                        iconColor: "slate",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrencyPrecise"])(stats.pendingValue),
                        label: "Pending Value"
                    }, void 0, false, {
                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                        lineNumber: 254,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsStats$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OperationsStatCard"], {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"],
                        iconColor: "emerald",
                        value: stats.receivedThisMonth,
                        label: "Received MTD",
                        onClick: ()=>setStatusFilter('received'),
                        isActive: statusFilter === 'received',
                        accentBorder: true
                    }, void 0, false, {
                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                        lineNumber: 255,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                lineNumber: 249,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsFilters$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FilterBar"], {
                onClear: clearFilters,
                showClear: hasFilters,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsFilters$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchInput"], {
                        value: searchQuery,
                        onChange: setSearchQuery,
                        placeholder: "Search POs by number or supplier..."
                    }, void 0, false, {
                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                        lineNumber: 260,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsFilters$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FilterSelect"], {
                        value: statusFilter,
                        onChange: setStatusFilter,
                        placeholder: "All Statuses",
                        options: [
                            {
                                value: 'draft',
                                label: 'Draft'
                            },
                            {
                                value: 'sent',
                                label: 'Pending'
                            },
                            {
                                value: 'partial',
                                label: 'Partial'
                            },
                            {
                                value: 'received',
                                label: 'Received'
                            },
                            {
                                value: 'cancelled',
                                label: 'Cancelled'
                            }
                        ]
                    }, void 0, false, {
                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                        lineNumber: 261,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsFilters$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FilterSelect"], {
                        value: supplierFilter,
                        onChange: setSupplierFilter,
                        placeholder: "All Suppliers",
                        options: suppliers.map((s)=>({
                                value: s,
                                label: s
                            }))
                    }, void 0, false, {
                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                        lineNumber: 273,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsFilters$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FilterSelect"], {
                        value: currencyFilter,
                        onChange: setCurrencyFilter,
                        placeholder: "All Currencies",
                        options: [
                            {
                                value: 'USD',
                                label: 'USD'
                            },
                            {
                                value: 'CAD',
                                label: 'CAD'
                            }
                        ]
                    }, void 0, false, {
                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                        lineNumber: 279,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                lineNumber: 259,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden",
                children: [
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
                                                children: "PO Number"
                                            }, void 0, false, {
                                                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                lineNumber: 293,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 font-medium",
                                                children: "Supplier"
                                            }, void 0, false, {
                                                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                lineNumber: 294,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 font-medium",
                                                children: "Items"
                                            }, void 0, false, {
                                                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                lineNumber: 295,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 font-medium text-right",
                                                children: "Total"
                                            }, void 0, false, {
                                                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                lineNumber: 296,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 font-medium",
                                                children: "Expected"
                                            }, void 0, false, {
                                                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                lineNumber: 297,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 font-medium text-center",
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                lineNumber: 298,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 font-medium text-center",
                                                children: "Actions"
                                            }, void 0, false, {
                                                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                lineNumber: 299,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                        lineNumber: 292,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                    lineNumber: 291,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "divide-y divide-slate-700/50",
                                    children: filteredPOs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: 7,
                                            className: "px-4 py-12 text-center text-slate-400",
                                            children: state.purchaseOrders.length === 0 ? 'No purchase orders yet. Create your first PO!' : 'No purchase orders match your filters.'
                                        }, void 0, false, {
                                            fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                            lineNumber: 305,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                        lineNumber: 304,
                                        columnNumber: 17
                                    }, this) : filteredPOs.map((po)=>{
                                        const totalUnits = po.items.reduce((sum, item)=>sum + item.quantity, 0);
                                        const receivedUnits = po.items.reduce((sum, item)=>sum + item.receivedQty, 0);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "hover:bg-slate-700/30 transition-colors cursor-pointer",
                                            onClick: ()=>handleViewPO(po),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-mono text-sm font-medium text-white",
                                                            children: po.poNumber
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                            lineNumber: 319,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-slate-500",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(po.createdAt)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                            lineNumber: 320,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                    lineNumber: 318,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm text-white",
                                                            children: po.supplier
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                            lineNumber: 323,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-slate-500",
                                                            children: po.currency
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                            lineNumber: 324,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                    lineNumber: 322,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm text-white",
                                                            children: [
                                                                po.items.length,
                                                                " items"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                            lineNumber: 327,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-slate-500",
                                                            children: receivedUnits > 0 ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(receivedUnits)}/${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(totalUnits)} received` : `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(totalUnits)} units`
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                            lineNumber: 328,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                    lineNumber: 326,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-4 text-right",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm font-medium text-white",
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrencyPrecise"])(po.total)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                        lineNumber: 335,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                    lineNumber: 334,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-white",
                                                        children: po.expectedDate ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(po.expectedDate) : '-'
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                        lineNumber: 338,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                    lineNumber: 337,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-4 text-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsBadges$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["POStatusBadge"], {
                                                        status: po.status
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                        lineNumber: 341,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                    lineNumber: 340,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-center gap-1",
                                                        onClick: (e)=>e.stopPropagation(),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleViewPO(po),
                                                                className: "p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors",
                                                                title: "View",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                                    className: "w-4 h-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                                    lineNumber: 346,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                                lineNumber: 345,
                                                                columnNumber: 27
                                                            }, this),
                                                            po.status === 'draft' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>handleEditPO(po),
                                                                        className: "p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors",
                                                                        title: "Edit",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                                                            className: "w-4 h-4"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                                            lineNumber: 351,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                                        lineNumber: 350,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>handleSendPO(po),
                                                                        className: "px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs rounded-lg",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                                                className: "w-3 h-3 inline mr-1"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                                                lineNumber: 354,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            "Send"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                                        lineNumber: 353,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true),
                                                            (po.status === 'sent' || po.status === 'partial') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleReceivePO(po),
                                                                className: "px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded-lg",
                                                                children: "Receive"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                                lineNumber: 359,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                        lineNumber: 344,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                    lineNumber: 343,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, po.id, true, {
                                            fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                            lineNumber: 317,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                    lineNumber: 302,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/operations/purchase-orders/page.tsx",
                            lineNumber: 290,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                        lineNumber: 289,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$operations$2f$OperationsTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PaginationFooter"], {
                        showing: filteredPOs.length,
                        total: state.purchaseOrders.length,
                        label: "purchase orders"
                    }, void 0, false, {
                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                        lineNumber: 372,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                lineNumber: 288,
                columnNumber: 7
            }, this),
            lowStockItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-slate-800/50 backdrop-blur border border-amber-500/30 rounded-xl overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-5 py-4 border-b border-slate-700/50 flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                className: "w-5 h-5 text-amber-400"
                            }, void 0, false, {
                                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                lineNumber: 379,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "font-semibold text-white",
                                        children: "Low Stock Suggestions"
                                    }, void 0, false, {
                                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                        lineNumber: 381,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-slate-400",
                                        children: "Products below reorder point - consider adding to next PO"
                                    }, void 0, false, {
                                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                        lineNumber: 382,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                lineNumber: 380,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                        lineNumber: 378,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 grid grid-cols-4 gap-3",
                        children: lowStockItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-800/50 border border-slate-700/50 rounded-lg p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                className: "w-4 h-4 text-amber-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                lineNumber: 389,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-medium text-white truncate",
                                                children: item.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                lineNumber: 390,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                        lineNumber: 388,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-slate-400 mb-1",
                                        children: [
                                            "SKU: ",
                                            item.sku
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                        lineNumber: 392,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-400",
                                                children: "Stock:"
                                            }, void 0, false, {
                                                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                lineNumber: 394,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-amber-400 font-medium",
                                                children: [
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(item.currentStock),
                                                    " / ",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(item.reorderPoint)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                                lineNumber: 395,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                        lineNumber: 393,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>addToPO(item),
                                        className: "mt-2 w-full px-2 py-1.5 bg-amber-500/20 text-amber-400 text-xs rounded hover:bg-amber-500/30 transition-colors",
                                        children: [
                                            "+ Add to PO (",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(item.suggestedQty),
                                            " units)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                        lineNumber: 399,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, item.id, true, {
                                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                                lineNumber: 387,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/operations/purchase-orders/page.tsx",
                        lineNumber: 385,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                lineNumber: 377,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modals$2f$CreatePOModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CreatePOModal"], {
                isOpen: showCreateModal,
                onClose: handleCloseCreateModal,
                editPO: editPO,
                initialItems: initialItems
            }, void 0, false, {
                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                lineNumber: 412,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modals$2f$ReceivePOModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReceivePOModal"], {
                isOpen: showReceiveModal,
                onClose: ()=>{
                    setShowReceiveModal(false);
                    setSelectedPO(null);
                },
                po: selectedPO
            }, void 0, false, {
                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                lineNumber: 413,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$panels$2f$PODetailPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PODetailPanel"], {
                isOpen: showDetailPanel,
                onClose: ()=>{
                    setShowDetailPanel(false);
                    setSelectedPO(null);
                },
                po: selectedPO,
                onEdit: handleEditPO,
                onReceive: handleReceivePO
            }, void 0, false, {
                fileName: "[project]/app/operations/purchase-orders/page.tsx",
                lineNumber: 414,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/operations/purchase-orders/page.tsx",
        lineNumber: 221,
        columnNumber: 5
    }, this);
}
_s(PurchaseOrdersPage, "Xqj10fLG/lk1F7EFKCnDegN4Fy0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfirm"]
    ];
});
_c = PurchaseOrdersPage;
var _c;
__turbopack_context__.k.register(_c, "PurchaseOrdersPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_18f92e91._.js.map