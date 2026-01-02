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
];

//# sourceMappingURL=lib_193b583e._.js.map