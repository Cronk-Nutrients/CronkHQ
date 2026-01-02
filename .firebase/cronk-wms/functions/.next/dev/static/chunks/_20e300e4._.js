(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ui/Card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-5'
};
function Card({ children, className = '', padding = 'md', header, headerAction, headerClassName = '' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden ${className}`,
        children: [
            (header || headerAction) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `px-5 py-4 border-b border-slate-700/50 flex items-center justify-between ${headerClassName}`,
                children: [
                    typeof header === 'string' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-semibold text-white",
                        children: header
                    }, void 0, false, {
                        fileName: "[project]/components/ui/Card.tsx",
                        lineNumber: 32,
                        columnNumber: 13
                    }, this) : header,
                    headerAction
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/Card.tsx",
                lineNumber: 30,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: paddingClasses[padding],
                children: children
            }, void 0, false, {
                fileName: "[project]/components/ui/Card.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/Card.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c = Card;
const __TURBOPACK__default__export__ = Card;
var _c;
__turbopack_context__.k.register(_c, "Card");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/Button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
'use client';
;
;
const variantClasses = {
    primary: 'bg-emerald-600 hover:bg-emerald-500 text-white border-transparent',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700',
    ghost: 'bg-transparent hover:bg-slate-800 text-slate-400 hover:text-white border-transparent',
    danger: 'bg-red-600 hover:bg-red-500 text-white border-transparent'
};
const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base'
};
function Button({ variant = 'primary', size = 'md', icon, iconPosition = 'left', children, className = '', disabled, href, ...props }) {
    const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
    const content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            icon && iconPosition === 'left' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                className: icon
            }, void 0, false, {
                fileName: "[project]/components/ui/Button.tsx",
                lineNumber: 60,
                columnNumber: 43
            }, this),
            children,
            icon && iconPosition === 'right' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                className: icon
            }, void 0, false, {
                fileName: "[project]/components/ui/Button.tsx",
                lineNumber: 62,
                columnNumber: 44
            }, this)
        ]
    }, void 0, true);
    if (href) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: href,
            className: classes,
            children: content
        }, void 0, false, {
            fileName: "[project]/components/ui/Button.tsx",
            lineNumber: 68,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: classes,
        disabled: disabled,
        ...props,
        children: content
    }, void 0, false, {
        fileName: "[project]/components/ui/Button.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
_c = Button;
const __TURBOPACK__default__export__ = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
"[project]/components/Breadcrumb.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Breadcrumb",
    ()=>Breadcrumb
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
'use client';
;
;
function Breadcrumb({ items }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "flex items-center gap-2 text-sm text-slate-400 mb-4",
        children: items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex items-center gap-2",
                children: [
                    index > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: "fas fa-chevron-right text-xs text-slate-600"
                    }, void 0, false, {
                        fileName: "[project]/components/Breadcrumb.tsx",
                        lineNumber: 20,
                        columnNumber: 13
                    }, this),
                    item.href ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: item.href,
                        className: "hover:text-white transition-colors",
                        children: item.label
                    }, void 0, false, {
                        fileName: "[project]/components/Breadcrumb.tsx",
                        lineNumber: 23,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-white",
                        children: item.label
                    }, void 0, false, {
                        fileName: "[project]/components/Breadcrumb.tsx",
                        lineNumber: 30,
                        columnNumber: 13
                    }, this)
                ]
            }, index, true, {
                fileName: "[project]/components/Breadcrumb.tsx",
                lineNumber: 18,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/Breadcrumb.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = Breadcrumb;
var _c;
__turbopack_context__.k.register(_c, "Breadcrumb");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/FilterBadge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActiveFilters",
    ()=>ActiveFilters,
    "FilterBadge",
    ()=>FilterBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
'use client';
;
;
function FilterBadge({ label, value, onRemove }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-emerald-400/70",
                children: [
                    label,
                    ":"
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/FilterBadge.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-medium",
                children: value
            }, void 0, false, {
                fileName: "[project]/components/ui/FilterBadge.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onRemove,
                className: "ml-0.5 p-0.5 hover:bg-emerald-500/30 rounded transition-colors",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                    className: "w-3 h-3"
                }, void 0, false, {
                    fileName: "[project]/components/ui/FilterBadge.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/FilterBadge.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/FilterBadge.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = FilterBadge;
function ActiveFilters({ filters, onRemove, onClearAll }) {
    if (filters.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm text-emerald-400 flex-shrink-0",
                children: "Filtered by:"
            }, void 0, false, {
                fileName: "[project]/components/ui/FilterBadge.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 flex-wrap flex-1",
                children: filters.map((filter)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterBadge, {
                        label: filter.label,
                        value: filter.value,
                        onRemove: ()=>onRemove(filter.key)
                    }, filter.key, false, {
                        fileName: "[project]/components/ui/FilterBadge.tsx",
                        lineNumber: 44,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/ui/FilterBadge.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onClearAll,
                className: "text-sm text-slate-400 hover:text-white transition-colors flex-shrink-0",
                children: "Clear All"
            }, void 0, false, {
                fileName: "[project]/components/ui/FilterBadge.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/FilterBadge.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_c1 = ActiveFilters;
var _c, _c1;
__turbopack_context__.k.register(_c, "FilterBadge");
__turbopack_context__.k.register(_c1, "ActiveFilters");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/fulfillment/FulfillmentBadges.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CarrierBadge",
    ()=>CarrierBadge,
    "ChannelBadge",
    ()=>ChannelBadge,
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
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "ChannelBadge");
__turbopack_context__.k.register(_c1, "PickStatusBadge");
__turbopack_context__.k.register(_c2, "PackStatusBadge");
__turbopack_context__.k.register(_c3, "CarrierBadge");
__turbopack_context__.k.register(_c4, "ShippingStatusBadge");
__turbopack_context__.k.register(_c5, "MarginBadge");
__turbopack_context__.k.register(_c6, "QueueStatusBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/fulfillment/FulfillmentStats.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FAStatCard",
    ()=>FAStatCard,
    "FulfillmentStatCard",
    ()=>FulfillmentStatCard,
    "FulfillmentStatsGrid",
    ()=>FulfillmentStatsGrid,
    "ProgressBar",
    ()=>ProgressBar,
    "QuickActionCard",
    ()=>QuickActionCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/formatting.ts [app-client] (ecmascript)");
'use client';
;
;
;
function FulfillmentStatCard({ icon: Icon, iconColor, value, label, subLabel, format = 'number', href, highlight = false, animateIcon = false }) {
    const colorMap = {
        amber: {
            border: 'border-amber-500/30',
            bg: 'bg-amber-500/20',
            hover: 'hover:border-amber-500/50',
            iconBg: 'bg-amber-500/20'
        },
        blue: {
            border: 'border-blue-500/30',
            bg: 'bg-blue-500/20',
            hover: 'hover:border-blue-500/50',
            iconBg: 'bg-blue-500/20'
        },
        purple: {
            border: 'border-purple-500/30',
            bg: 'bg-purple-500/20',
            hover: 'hover:border-purple-500/50',
            iconBg: 'bg-purple-500/20'
        },
        cyan: {
            border: 'border-cyan-500/30',
            bg: 'bg-cyan-500/20',
            hover: 'hover:border-cyan-500/50',
            iconBg: 'bg-cyan-500/20'
        },
        emerald: {
            border: 'border-emerald-500/30',
            bg: 'bg-emerald-500/20',
            hover: 'hover:border-emerald-500/50',
            iconBg: 'bg-emerald-500/20'
        },
        slate: {
            border: 'border-slate-700/50',
            bg: 'bg-slate-700/30',
            hover: 'hover:border-slate-600',
            iconBg: 'bg-slate-700/50'
        },
        red: {
            border: 'border-red-500/30',
            bg: 'bg-red-500/20',
            hover: 'hover:border-red-500/50',
            iconBg: 'bg-red-500/20'
        }
    };
    const textColorMap = {
        amber: 'text-amber-400',
        blue: 'text-blue-400',
        purple: 'text-purple-400',
        cyan: 'text-cyan-400',
        emerald: 'text-emerald-400',
        slate: 'text-slate-400',
        red: 'text-red-400'
    };
    const colors = colorMap[iconColor] || colorMap.slate;
    const textColor = textColorMap[iconColor] || 'text-white';
    const formattedValue = format === 'currency' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(typeof value === 'number' ? value : 0) : format === 'number' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(typeof value === 'number' ? value : 0) : value;
    const content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `w-10 h-10 rounded-lg ${colors.iconBg} flex items-center justify-center`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    className: `w-5 h-5 ${textColor} ${animateIcon ? 'animate-spin' : ''}`
                }, void 0, false, {
                    fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-2xl font-bold text-white",
                        children: formattedValue
                    }, void 0, false, {
                        fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-slate-400",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    subLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `text-xs ${textColor} mt-0.5`,
                        children: subLabel
                    }, void 0, false, {
                        fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
                        lineNumber: 69,
                        columnNumber: 22
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
    const baseClass = `bg-slate-800/50 backdrop-blur border ${colors.border} rounded-xl p-4 transition-colors`;
    if (href) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: href,
            className: `${baseClass} ${colors.hover} cursor-pointer`,
            children: content
        }, void 0, false, {
            fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
            lineNumber: 78,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${baseClass} ${highlight ? `${colors.bg}` : ''}`,
        style: highlight ? {
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.15)'
        } : undefined,
        children: content
    }, void 0, false, {
        fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_c = FulfillmentStatCard;
function FAStatCard({ icon, iconColor, value, label, subLabel, format = 'number', highlight = false, valueColor }) {
    const colorMap = {
        purple: {
            iconBg: 'bg-purple-500/20',
            textColor: 'text-purple-400'
        },
        emerald: {
            iconBg: 'bg-emerald-500/20',
            textColor: 'text-emerald-400'
        },
        red: {
            iconBg: 'bg-red-500/20',
            textColor: 'text-red-400'
        },
        blue: {
            iconBg: 'bg-blue-500/20',
            textColor: 'text-blue-400'
        },
        amber: {
            iconBg: 'bg-amber-500/20',
            textColor: 'text-amber-400'
        }
    };
    const colors = colorMap[iconColor] || colorMap.purple;
    const formattedValue = format === 'currency' ? `$${(typeof value === 'number' ? value : 0).toLocaleString('en-US', {
        minimumFractionDigits: 2
    })}` : format === 'number' ? (typeof value === 'number' ? value : 0).toLocaleString() : value;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5",
        style: highlight ? {
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.15)'
        } : undefined,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-slate-400 text-sm",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `w-10 h-10 ${colors.iconBg} rounded-lg flex items-center justify-center`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: `fas ${icon} ${colors.textColor}`
                        }, void 0, false, {
                            fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
                            lineNumber: 137,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: `text-3xl font-bold ${valueColor || 'text-white'}`,
                children: formattedValue
            }, void 0, false, {
                fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            subLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: `text-xs ${valueColor ? valueColor : 'text-slate-400'} mt-1`,
                children: subLabel
            }, void 0, false, {
                fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
                lineNumber: 141,
                columnNumber: 20
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
}
_c1 = FAStatCard;
function FulfillmentStatsGrid({ children, columns = 6 }) {
    const colClass = {
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6'
    }[columns];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `grid ${colClass} gap-4`,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
        lineNumber: 160,
        columnNumber: 10
    }, this);
}
_c2 = FulfillmentStatsGrid;
function QuickActionCard({ href, icon, iconColor, title, description, isFontAwesome = false }) {
    const colorMap = {
        emerald: {
            iconBg: 'bg-emerald-500/20',
            hoverBorder: 'hover:border-emerald-500/50',
            hoverIconBg: 'group-hover:bg-emerald-500/30',
            textColor: 'text-emerald-400'
        },
        blue: {
            iconBg: 'bg-blue-500/20',
            hoverBorder: 'hover:border-blue-500/50',
            hoverIconBg: 'group-hover:bg-blue-500/30',
            textColor: 'text-blue-400'
        },
        orange: {
            iconBg: 'bg-orange-500/20',
            hoverBorder: 'hover:border-orange-500/50',
            hoverIconBg: 'group-hover:bg-orange-500/30',
            textColor: 'text-orange-400'
        },
        purple: {
            iconBg: 'bg-purple-500/20',
            hoverBorder: 'hover:border-purple-500/50',
            hoverIconBg: 'group-hover:bg-purple-500/30',
            textColor: 'text-purple-400'
        }
    };
    const colors = colorMap[iconColor] || colorMap.emerald;
    const Icon = !isFontAwesome ? icon : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        className: `bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 ${colors.hoverBorder} transition-all group`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `w-14 h-14 ${colors.iconBg} rounded-xl flex items-center justify-center ${colors.hoverIconBg} transition-colors`,
                    children: isFontAwesome ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: `${icon} ${colors.textColor} text-2xl`
                    }, void 0, false, {
                        fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
                        lineNumber: 199,
                        columnNumber: 13
                    }, this) : Icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                        className: `w-7 h-7 ${colors.textColor}`
                    }, void 0, false, {
                        fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
                        lineNumber: 201,
                        columnNumber: 13
                    }, this) : null
                }, void 0, false, {
                    fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
                    lineNumber: 197,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold text-white",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
                            lineNumber: 205,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-slate-400",
                            children: description
                        }, void 0, false, {
                            fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
                            lineNumber: 206,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
                    lineNumber: 204,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: `w-5 h-5 text-slate-500 ${colors.textColor.replace('text-', 'group-hover:text-')} transition-colors`,
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M9 5l7 7-7 7"
                    }, void 0, false, {
                        fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
                        lineNumber: 209,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
                    lineNumber: 208,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
            lineNumber: 196,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
        lineNumber: 192,
        columnNumber: 5
    }, this);
}
_c3 = QuickActionCard;
function ProgressBar({ current, total, colorClass = 'bg-blue-500' }) {
    const progress = total > 0 ? current / total * 100 : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full bg-slate-700 rounded-full h-2",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `h-2 rounded-full transition-all ${colorClass}`,
            style: {
                width: `${progress}%`
            }
        }, void 0, false, {
            fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
            lineNumber: 228,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/fulfillment/FulfillmentStats.tsx",
        lineNumber: 227,
        columnNumber: 5
    }, this);
}
_c4 = ProgressBar;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "FulfillmentStatCard");
__turbopack_context__.k.register(_c1, "FAStatCard");
__turbopack_context__.k.register(_c2, "FulfillmentStatsGrid");
__turbopack_context__.k.register(_c3, "QuickActionCard");
__turbopack_context__.k.register(_c4, "ProgressBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/fulfillment/StatusFilterTabs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CustomDateRange",
    ()=>CustomDateRange,
    "DateRangeTabs",
    ()=>DateRangeTabs,
    "StatusFilterTabs",
    ()=>StatusFilterTabs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function StatusFilterTabs({ options, value, onChange, accentColor = 'blue' }) {
    const accentClasses = {
        blue: 'bg-blue-500/20 text-blue-300',
        purple: 'bg-purple-500/20 text-purple-300',
        emerald: 'bg-emerald-500/20 text-emerald-300'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-1",
        children: options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onChange(option.value),
                className: `px-4 py-2 text-sm rounded-lg transition-all ${value === option.value ? accentClasses[accentColor] : 'text-slate-400 hover:text-white'}`,
                children: option.label
            }, option.value, false, {
                fileName: "[project]/components/fulfillment/StatusFilterTabs.tsx",
                lineNumber: 30,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/fulfillment/StatusFilterTabs.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c = StatusFilterTabs;
function DateRangeTabs({ value, onChange }) {
    const options = [
        {
            value: 'today',
            label: 'TODAY'
        },
        {
            value: 'wtd',
            label: 'WTD'
        },
        {
            value: 'mtd',
            label: 'MTD'
        },
        {
            value: 'ytd',
            label: 'YTD'
        },
        {
            value: 'custom',
            label: 'Custom',
            icon: 'fa-calendar'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-1",
        children: options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onChange(option.value),
                className: `px-4 py-2 text-sm rounded-lg transition-all ${value === option.value ? 'bg-purple-500/20 text-purple-300' : 'text-slate-400 hover:text-white'}`,
                children: option.icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: `fas ${option.icon}`
                        }, void 0, false, {
                            fileName: "[project]/components/fulfillment/StatusFilterTabs.tsx",
                            lineNumber: 77,
                            columnNumber: 15
                        }, this),
                        option.label
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/fulfillment/StatusFilterTabs.tsx",
                    lineNumber: 76,
                    columnNumber: 13
                }, this) : option.label
            }, option.value, false, {
                fileName: "[project]/components/fulfillment/StatusFilterTabs.tsx",
                lineNumber: 66,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/fulfillment/StatusFilterTabs.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
_c1 = DateRangeTabs;
function CustomDateRange({ startDate, endDate, onStartDateChange, onEndDateChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-4 p-4 bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm text-slate-400",
                        children: "From:"
                    }, void 0, false, {
                        fileName: "[project]/components/fulfillment/StatusFilterTabs.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "date",
                        value: startDate,
                        onChange: (e)=>onStartDateChange(e.target.value),
                        className: "bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50"
                    }, void 0, false, {
                        fileName: "[project]/components/fulfillment/StatusFilterTabs.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/fulfillment/StatusFilterTabs.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm text-slate-400",
                        children: "To:"
                    }, void 0, false, {
                        fileName: "[project]/components/fulfillment/StatusFilterTabs.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "date",
                        value: endDate,
                        onChange: (e)=>onEndDateChange(e.target.value),
                        className: "bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50"
                    }, void 0, false, {
                        fileName: "[project]/components/fulfillment/StatusFilterTabs.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/fulfillment/StatusFilterTabs.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/fulfillment/StatusFilterTabs.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
_c2 = CustomDateRange;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "StatusFilterTabs");
__turbopack_context__.k.register(_c1, "DateRangeTabs");
__turbopack_context__.k.register(_c2, "CustomDateRange");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/fulfillment/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// Fulfillment-specific components
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$fulfillment$2f$FulfillmentBadges$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/fulfillment/FulfillmentBadges.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$fulfillment$2f$FulfillmentStats$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/fulfillment/FulfillmentStats.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$fulfillment$2f$StatusFilterTabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/fulfillment/StatusFilterTabs.tsx [app-client] (ecmascript)");
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/fulfillment/pack/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PackPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AppContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Toast.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/formatting.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Breadcrumb$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Breadcrumb.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$FilterBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/FilterBadge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$fulfillment$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/fulfillment/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$fulfillment$2f$FulfillmentBadges$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/fulfillment/FulfillmentBadges.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$fulfillment$2f$StatusFilterTabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/fulfillment/StatusFilterTabs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanLine$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scan-line.js [app-client] (ecmascript) <export default as ScanLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/truck.js [app-client] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/printer.js [app-client] (ecmascript) <export default as Printer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tag.js [app-client] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scale.js [app-client] (ecmascript) <export default as Scale>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ruler.js [app-client] (ecmascript) <export default as Ruler>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/camera.js [app-client] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
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
;
;
// Carrier configurations
const CARRIERS = [
    {
        id: 'usps',
        name: 'USPS',
        services: [
            'Priority Mail',
            'First Class',
            'Priority Express',
            'Ground Advantage'
        ]
    },
    {
        id: 'ups',
        name: 'UPS',
        services: [
            'Ground',
            '2-Day Air',
            'Next Day Air',
            '3-Day Select'
        ]
    },
    {
        id: 'fedex',
        name: 'FedEx',
        services: [
            'Ground',
            'Express Saver',
            '2Day',
            'Overnight',
            'Home Delivery'
        ]
    }
];
const generateTrackingNumber = (carrier)=>{
    const prefix = carrier === 'usps' ? '9400' : carrier === 'ups' ? '1Z' : '7489';
    return prefix + Math.random().toString().slice(2, 14);
};
const estimateShippingCost = (carrier, service)=>{
    const baseCosts = {
        'Priority Mail': 8.95,
        'First Class': 4.50,
        'Priority Express': 26.95,
        'Ground Advantage': 5.45,
        'Ground': 9.25,
        '2-Day Air': 18.75,
        'Next Day Air': 45.00,
        '3-Day Select': 14.50,
        'Express Saver': 15.95,
        '2Day': 22.50,
        'Overnight': 55.00,
        'Home Delivery': 10.50
    };
    return baseCosts[service] || 10.00;
};
function PackPageLoading() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-8 w-64 bg-slate-700/50 rounded animate-pulse"
            }, void 0, false, {
                fileName: "[project]/app/fulfillment/pack/page.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-32 bg-slate-800/50 rounded-xl animate-pulse"
            }, void 0, false, {
                fileName: "[project]/app/fulfillment/pack/page.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-3 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-2 h-96 bg-slate-800/50 rounded-xl animate-pulse"
                    }, void 0, false, {
                        fileName: "[project]/app/fulfillment/pack/page.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-96 bg-slate-800/50 rounded-xl animate-pulse"
                    }, void 0, false, {
                        fileName: "[project]/app/fulfillment/pack/page.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/fulfillment/pack/page.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/fulfillment/pack/page.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_c = PackPageLoading;
function PackPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PackPageLoading, {}, void 0, false, {
            fileName: "[project]/app/fulfillment/pack/page.tsx",
            lineNumber: 68,
            columnNumber: 25
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PackPageContent, {}, void 0, false, {
            fileName: "[project]/app/fulfillment/pack/page.tsx",
            lineNumber: 69,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/fulfillment/pack/page.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
_c1 = PackPage;
const statusFilterOptions = [
    {
        value: 'all',
        label: 'All'
    },
    {
        value: 'to_pack',
        label: 'To Pack'
    },
    {
        value: 'packing',
        label: 'Packing'
    }
];
function PackPageContent() {
    _s();
    const { state, dispatch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const { success, error, warning, info } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [scanInput, setScanInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedOrder, setSelectedOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedBox, setSelectedBox] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [carrier, setCarrier] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [service, setService] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [verifiedItems, setVerifiedItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [urlInitialized, setUrlInitialized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const scanInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Get packable orders with optional filter
    const packableOrders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PackPageContent.useMemo[packableOrders]": ()=>{
            const orders = state.orders.filter({
                "PackPageContent.useMemo[packableOrders].orders": (o)=>o.status === 'to_pack' || o.status === 'packing'
            }["PackPageContent.useMemo[packableOrders].orders"]);
            if (statusFilter === 'all') return orders;
            return orders.filter({
                "PackPageContent.useMemo[packableOrders]": (o)=>o.status === statusFilter
            }["PackPageContent.useMemo[packableOrders]"]);
        }
    }["PackPageContent.useMemo[packableOrders]"], [
        state.orders,
        statusFilter
    ]);
    // Initialize from URL params
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PackPageContent.useEffect": ()=>{
            if (!urlInitialized) {
                const orderParam = searchParams.get('order');
                const statusParam = searchParams.get('status');
                if (statusParam === 'to_pack' || statusParam === 'packing') {
                    setStatusFilter(statusParam);
                }
                if (orderParam) {
                    const order = state.orders.find({
                        "PackPageContent.useEffect.order": (o)=>o.orderNumber === orderParam || o.id === orderParam
                    }["PackPageContent.useEffect.order"]);
                    if (order && (order.status === 'to_pack' || order.status === 'packing')) {
                        handleSelectOrder(order);
                    }
                }
                setUrlInitialized(true);
            }
        }
    }["PackPageContent.useEffect"], [
        searchParams,
        urlInitialized,
        state.orders
    ]);
    // Update URL when filter changes
    const updateUrlParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PackPageContent.useCallback[updateUrlParams]": (newStatus)=>{
            const params = new URLSearchParams();
            if (newStatus !== 'all') params.set('status', newStatus);
            const url = params.toString() ? `/fulfillment/pack?${params.toString()}` : '/fulfillment/pack';
            router.replace(url, {
                scroll: false
            });
        }
    }["PackPageContent.useCallback[updateUrlParams]"], [
        router
    ]);
    // Get active filters for display
    const activeFilters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PackPageContent.useMemo[activeFilters]": ()=>{
            const filters = [];
            if (statusFilter !== 'all') {
                filters.push({
                    key: 'status',
                    label: 'Status',
                    value: statusFilter === 'to_pack' ? 'To Pack' : 'Packing'
                });
            }
            return filters;
        }
    }["PackPageContent.useMemo[activeFilters]"], [
        statusFilter
    ]);
    const handleRemoveFilter = (key)=>{
        if (key === 'status') {
            setStatusFilter('all');
            updateUrlParams('all');
        }
    };
    const handleClearAllFilters = ()=>{
        setStatusFilter('all');
        router.replace('/fulfillment/pack', {
            scroll: false
        });
    };
    // Calculate order volume and weight
    const calculateOrderVolume = (order)=>{
        if (!order) return 0;
        return order.items.reduce((sum, item)=>{
            const product = state.products.find((p)=>p.id === item.productId);
            if (product?.dimensions) {
                const volume = product.dimensions.length * product.dimensions.width * product.dimensions.height;
                return sum + volume * item.quantity;
            }
            return sum + 50 * item.quantity;
        }, 0);
    };
    const calculateOrderWeight = (order)=>{
        if (!order) return 0;
        return order.items.reduce((sum, item)=>{
            const product = state.products.find((p)=>p.id === item.productId);
            return sum + (product?.weight.value || 1) * item.quantity * 16;
        }, 0);
    };
    // Smart box suggestion
    const suggestedBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PackPageContent.useMemo[suggestedBox]": ()=>{
            if (!selectedOrder || !state.settings.smartBoxEnabled) return null;
            const orderVolume = calculateOrderVolume(selectedOrder);
            const orderWeight = calculateOrderWeight(selectedOrder);
            const bufferMultiplier = 1.1;
            return state.boxes.filter({
                "PackPageContent.useMemo[suggestedBox]": (box)=>box.smartBoxEligible
            }["PackPageContent.useMemo[suggestedBox]"]).filter({
                "PackPageContent.useMemo[suggestedBox]": (box)=>{
                    const boxVolume = box.innerLength * box.innerWidth * box.innerHeight;
                    return boxVolume >= orderVolume * bufferMultiplier && box.maxWeight >= orderWeight;
                }
            }["PackPageContent.useMemo[suggestedBox]"]).sort({
                "PackPageContent.useMemo[suggestedBox]": (a, b)=>{
                    const volA = a.innerLength * a.innerWidth * a.innerHeight;
                    const volB = b.innerLength * b.innerWidth * b.innerHeight;
                    return volA - volB;
                }
            }["PackPageContent.useMemo[suggestedBox]"])[0] || null;
        }
    }["PackPageContent.useMemo[suggestedBox]"], [
        selectedOrder,
        state.boxes,
        state.settings.smartBoxEnabled,
        state.products
    ]);
    // Count bottles for gripper stickers
    const bottleCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PackPageContent.useMemo[bottleCount]": ()=>{
            if (!selectedOrder) return 0;
            return selectedOrder.items.reduce({
                "PackPageContent.useMemo[bottleCount]": (sum, item)=>sum + item.quantity
            }["PackPageContent.useMemo[bottleCount]"], 0);
        }
    }["PackPageContent.useMemo[bottleCount]"], [
        selectedOrder
    ]);
    // Keyboard shortcuts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PackPageContent.useEffect": ()=>{
            const handleKeyDown = {
                "PackPageContent.useEffect.handleKeyDown": (e)=>{
                    if (/^[a-zA-Z0-9]$/.test(e.key) && !e.ctrlKey && !e.metaKey) {
                        const activeElement = document.activeElement;
                        if (activeElement?.tagName !== 'INPUT' && activeElement?.tagName !== 'TEXTAREA' && activeElement?.tagName !== 'SELECT') {
                            scanInputRef.current?.focus();
                        }
                    }
                    if (e.key === 'Escape') {
                        handleClearSelection();
                    }
                }
            }["PackPageContent.useEffect.handleKeyDown"];
            window.addEventListener('keydown', handleKeyDown);
            return ({
                "PackPageContent.useEffect": ()=>window.removeEventListener('keydown', handleKeyDown)
            })["PackPageContent.useEffect"];
        }
    }["PackPageContent.useEffect"], []);
    // Handle scan/search
    const handleScan = (e)=>{
        if (e.key === 'Enter' && scanInput.trim()) {
            const searchTerm = scanInput.toLowerCase().trim();
            // Check if it's an SKU for verification
            if (selectedOrder) {
                const item = selectedOrder.items.find((i)=>i.sku.toLowerCase() === searchTerm);
                if (item) {
                    handleVerifyScan(item.sku);
                    setScanInput('');
                    return;
                }
            }
            // Find order
            const order = state.orders.find((o)=>o.orderNumber.toLowerCase() === searchTerm || o.id === searchTerm || o.orderNumber.toLowerCase().includes(searchTerm));
            if (order) {
                if (order.status !== 'to_pack' && order.status !== 'packing') {
                    warning(`Order ${order.orderNumber} is not ready for packing (status: ${order.status})`);
                    setScanInput('');
                    return;
                }
                handleSelectOrder(order);
                setScanInput('');
            } else {
                error('Order not found');
            }
        }
    };
    // Handle order selection
    const handleSelectOrder = (order)=>{
        setSelectedOrder(order);
        setVerifiedItems({});
        if (suggestedBox) {
            setSelectedBox(suggestedBox);
        }
        if (order.status === 'to_pack') {
            dispatch({
                type: 'UPDATE_ORDER_STATUS',
                payload: {
                    orderId: order.id,
                    status: 'packing'
                }
            });
        }
    };
    // Handle verify scan
    const handleVerifyScan = (sku)=>{
        const item = selectedOrder?.items.find((i)=>i.sku === sku);
        if (!item) {
            error(`Item ${sku} not in this order!`);
            return;
        }
        const currentVerified = verifiedItems[sku] || 0;
        if (currentVerified >= item.quantity) {
            warning(`Already verified all ${item.quantity} of ${sku}`);
            return;
        }
        setVerifiedItems((prev)=>({
                ...prev,
                [sku]: (prev[sku] || 0) + 1
            }));
        success(`Verified ${sku} (${currentVerified + 1}/${item.quantity})`);
    };
    // Clear selection
    const handleClearSelection = ()=>{
        if (selectedOrder && selectedOrder.status === 'packing') {
            dispatch({
                type: 'UPDATE_ORDER_STATUS',
                payload: {
                    orderId: selectedOrder.id,
                    status: 'to_pack'
                }
            });
        }
        setSelectedOrder(null);
        setSelectedBox(null);
        setCarrier('');
        setService('');
        setVerifiedItems({});
    };
    // Get product by SKU
    const getProductIdBySku = (sku)=>{
        const product = state.products.find((p)=>p.sku === sku);
        return product?.id || '';
    };
    // Handle print label & ship
    const handlePrintAndShip = ()=>{
        if (!selectedOrder) return;
        if (!selectedBox) {
            error('Please select a box');
            return;
        }
        if (!carrier || !service) {
            error('Please select carrier and service');
            return;
        }
        const trackingNumber = generateTrackingNumber(carrier);
        const shippingCost = estimateShippingCost(carrier, service);
        const shipment = {
            id: crypto.randomUUID(),
            orderId: selectedOrder.id,
            orderNumber: selectedOrder.orderNumber,
            carrier: carrier,
            service,
            trackingNumber,
            customerPaid: selectedOrder.shipping,
            actualCost: shippingCost,
            profit: selectedOrder.shipping - shippingCost,
            weight: calculateOrderWeight(selectedOrder),
            status: 'in_transit',
            customerName: selectedOrder.customer.name,
            customerCity: selectedOrder.customer.address.city,
            customerState: selectedOrder.customer.address.state,
            shippedAt: new Date()
        };
        dispatch({
            type: 'ADD_SHIPMENT',
            payload: shipment
        });
        const updatedOrder = {
            ...selectedOrder,
            status: 'shipped',
            trackingNumber,
            carrier,
            service,
            shippedAt: new Date(),
            updatedAt: new Date()
        };
        dispatch({
            type: 'UPDATE_ORDER',
            payload: updatedOrder
        });
        // Deduct gripper stickers if enabled
        if (state.settings.gripperStickerEnabled && state.settings.gripperStickerSku) {
            const gripperProductId = getProductIdBySku(state.settings.gripperStickerSku);
            if (gripperProductId) {
                const defaultLoc = state.locations.find((l)=>l.isDefault);
                const locationId = defaultLoc?.id || state.locations[0]?.id || 'loc-1';
                dispatch({
                    type: 'ADJUST_STOCK',
                    payload: {
                        productId: gripperProductId,
                        locationId,
                        adjustment: -bottleCount
                    }
                });
            }
        }
        success(`Order ${selectedOrder.orderNumber} shipped! Tracking: ${trackingNumber}`);
        handleClearSelection();
    };
    const orderVolume = calculateOrderVolume(selectedOrder);
    const orderWeight = calculateOrderWeight(selectedOrder);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Breadcrumb$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Breadcrumb"], {
                items: [
                    {
                        label: 'Fulfillment',
                        href: '/fulfillment'
                    },
                    {
                        label: 'Pack Station'
                    }
                ]
            }, void 0, false, {
                fileName: "[project]/app/fulfillment/pack/page.tsx",
                lineNumber: 385,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold text-white",
                                children: "Pack Station"
                            }, void 0, false, {
                                fileName: "[project]/app/fulfillment/pack/page.tsx",
                                lineNumber: 390,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-slate-400",
                                children: [
                                    packableOrders.length,
                                    " orders ready to pack"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/fulfillment/pack/page.tsx",
                                lineNumber: 391,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/fulfillment/pack/page.tsx",
                        lineNumber: 389,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$fulfillment$2f$StatusFilterTabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusFilterTabs"], {
                        options: statusFilterOptions,
                        value: statusFilter,
                        onChange: (v)=>{
                            setStatusFilter(v);
                            updateUrlParams(v);
                        },
                        accentColor: "purple"
                    }, void 0, false, {
                        fileName: "[project]/app/fulfillment/pack/page.tsx",
                        lineNumber: 393,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/fulfillment/pack/page.tsx",
                lineNumber: 388,
                columnNumber: 7
            }, this),
            activeFilters.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$FilterBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActiveFilters"], {
                filters: activeFilters,
                onRemove: handleRemoveFilter,
                onClearAll: handleClearAllFilters
            }, void 0, false, {
                fileName: "[project]/app/fulfillment/pack/page.tsx",
                lineNumber: 405,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanLine$3e$__["ScanLine"], {
                                    className: "h-6 w-6 text-purple-400"
                                }, void 0, false, {
                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                    lineNumber: 417,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/fulfillment/pack/page.tsx",
                                lineNumber: 416,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                                    }, void 0, false, {
                                        fileName: "[project]/app/fulfillment/pack/page.tsx",
                                        lineNumber: 420,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        ref: scanInputRef,
                                        type: "text",
                                        value: scanInput,
                                        onChange: (e)=>setScanInput(e.target.value),
                                        onKeyDown: handleScan,
                                        placeholder: selectedOrder ? "Scan SKU to verify item..." : "Scan order barcode or enter order number...",
                                        className: "w-full bg-slate-700/50 border border-slate-600/50 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50",
                                        autoFocus: true
                                    }, void 0, false, {
                                        fileName: "[project]/app/fulfillment/pack/page.tsx",
                                        lineNumber: 421,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/fulfillment/pack/page.tsx",
                                lineNumber: 419,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: ()=>scanInput.trim() && handleScan({
                                        key: 'Enter'
                                    }),
                                children: selectedOrder ? 'Verify' : 'Load Order'
                            }, void 0, false, {
                                fileName: "[project]/app/fulfillment/pack/page.tsx",
                                lineNumber: 432,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/fulfillment/pack/page.tsx",
                        lineNumber: 415,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                    lineNumber: 414,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/fulfillment/pack/page.tsx",
                lineNumber: 413,
                columnNumber: 7
            }, this),
            selectedOrder ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 gap-6 lg:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2 space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-lg font-semibold text-white",
                                                            children: [
                                                                "Order #",
                                                                selectedOrder.orderNumber
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                            lineNumber: 448,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 mt-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm text-slate-400",
                                                                    children: selectedOrder.customer.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                                    lineNumber: 450,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$fulfillment$2f$FulfillmentBadges$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChannelBadge"], {
                                                                    channel: selectedOrder.channel
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                                    lineNumber: 451,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                            lineNumber: 449,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                    lineNumber: 447,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleClearSelection,
                                                    className: "p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                        className: "w-5 h-5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                        lineNumber: 458,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                    lineNumber: 454,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                            lineNumber: 446,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: selectedOrder.items.map((item, index)=>{
                                                const verified = verifiedItems[item.sku] || 0;
                                                const isVerified = verified >= item.quantity;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `flex items-center justify-between rounded-lg p-3 ${isVerified ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-slate-700/30 border border-slate-600/30'}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `flex h-10 w-10 items-center justify-center rounded-lg ${isVerified ? 'bg-emerald-500/20' : 'bg-slate-700/50'}`,
                                                                    children: isVerified ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                        className: "h-5 w-5 text-emerald-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                                        lineNumber: 482,
                                                                        columnNumber: 31
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                                        className: "h-5 w-5 text-slate-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                                        lineNumber: 484,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                                    lineNumber: 478,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm font-medium text-white",
                                                                            children: item.productName
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                                            lineNumber: 488,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs text-slate-400",
                                                                            children: [
                                                                                "SKU: ",
                                                                                item.sku
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                                            lineNumber: 489,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                                    lineNumber: 487,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                            lineNumber: 477,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-right",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-medium text-white",
                                                                    children: [
                                                                        verified,
                                                                        " / ",
                                                                        item.quantity
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                                    lineNumber: 493,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-slate-400",
                                                                    children: "verified"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                                    lineNumber: 494,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                            lineNumber: 492,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, index, true, {
                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                    lineNumber: 469,
                                                    columnNumber: 23
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                            lineNumber: 463,
                                            columnNumber: 17
                                        }, this),
                                        state.settings.gripperStickerEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 rounded-lg bg-amber-500/10 border border-amber-500/30 p-3",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                        className: "h-4 w-4 text-amber-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                        lineNumber: 505,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm text-amber-300",
                                                        children: [
                                                            bottleCount,
                                                            " gripper sticker",
                                                            bottleCount !== 1 ? 's' : '',
                                                            " will be auto-deducted"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                        lineNumber: 506,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                lineNumber: 504,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                            lineNumber: 503,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                    lineNumber: 445,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/fulfillment/pack/page.tsx",
                                lineNumber: 444,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-md font-semibold text-white mb-3 flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                    className: "w-4 h-4 text-slate-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                    lineNumber: 519,
                                                    columnNumber: 19
                                                }, this),
                                                "Ship To"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                            lineNumber: 518,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-slate-300",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-medium",
                                                    children: selectedOrder.customer.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                    lineNumber: 523,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: selectedOrder.customer.address.street
                                                }, void 0, false, {
                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                    lineNumber: 524,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: [
                                                        selectedOrder.customer.address.city,
                                                        ", ",
                                                        selectedOrder.customer.address.state,
                                                        " ",
                                                        selectedOrder.customer.address.zip
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                    lineNumber: 525,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: selectedOrder.customer.address.country
                                                }, void 0, false, {
                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                    lineNumber: 528,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                            lineNumber: 522,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                    lineNumber: 517,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/fulfillment/pack/page.tsx",
                                lineNumber: 516,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-md font-semibold text-white mb-4 flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                                    className: "w-4 h-4 text-slate-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                    lineNumber: 537,
                                                    columnNumber: 19
                                                }, this),
                                                "Pack Photo"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                            lineNumber: 536,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>info('Photo capture coming in a future update'),
                                            className: "w-full p-8 border-2 border-dashed border-slate-600 rounded-lg text-slate-400 hover:border-slate-500 hover:text-slate-300 transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                                    className: "w-8 h-8 mx-auto mb-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                    lineNumber: 544,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: "Capture Photo"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                    lineNumber: 545,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs mt-1",
                                                    children: "Coming in a future update"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                    lineNumber: 546,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                            lineNumber: 540,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                    lineNumber: 535,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/fulfillment/pack/page.tsx",
                                lineNumber: 534,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/fulfillment/pack/page.tsx",
                        lineNumber: 442,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-md font-semibold text-white mb-4 flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                    className: "w-4 h-4 text-slate-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                    lineNumber: 558,
                                                    columnNumber: 19
                                                }, this),
                                                "Select Box"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                            lineNumber: 557,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-4 rounded-lg bg-slate-700/30 p-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-400 flex items-center gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__["Ruler"], {
                                                                    className: "w-3 h-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                                    lineNumber: 566,
                                                                    columnNumber: 23
                                                                }, this),
                                                                "Volume:"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                            lineNumber: 565,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white",
                                                            children: [
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(orderVolume),
                                                                " cu in"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                            lineNumber: 569,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                    lineNumber: 564,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between text-sm mt-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-400 flex items-center gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"], {
                                                                    className: "w-3 h-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                                    lineNumber: 573,
                                                                    columnNumber: 23
                                                                }, this),
                                                                "Weight:"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                            lineNumber: 572,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white",
                                                            children: [
                                                                (orderWeight / 16).toFixed(1),
                                                                " lbs"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                            lineNumber: 576,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                    lineNumber: 571,
                                                    columnNumber: 19
                                                }, this),
                                                suggestedBox && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 mt-2 pt-2 border-t border-slate-600/30",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                            className: "h-4 w-4 text-emerald-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                            lineNumber: 580,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-emerald-400",
                                                            children: [
                                                                "Suggested: ",
                                                                suggestedBox.name
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                            lineNumber: 581,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                    lineNumber: 579,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                            lineNumber: 563,
                                            columnNumber: 17
                                        }, this),
                                        state.boxes.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center py-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-slate-400",
                                                    children: "No boxes configured"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                    lineNumber: 588,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-slate-500 mt-1",
                                                    children: "Add boxes in Settings"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                    lineNumber: 589,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                            lineNumber: 587,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2 max-h-64 overflow-y-auto",
                                            children: state.boxes.map((box)=>{
                                                const boxVolume = box.innerLength * box.innerWidth * box.innerHeight;
                                                const fitsVolume = boxVolume >= orderVolume * 1.1;
                                                const fitsWeight = box.maxWeight >= orderWeight;
                                                const fits = fitsVolume && fitsWeight;
                                                const isSuggested = box.id === suggestedBox?.id;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>fits && setSelectedBox(box),
                                                    disabled: !fits,
                                                    className: `w-full flex items-center justify-between rounded-lg p-3 text-left transition-colors ${selectedBox?.id === box.id ? 'bg-emerald-500/20 border border-emerald-500/50' : fits ? 'bg-slate-700/30 border border-slate-600/30 hover:bg-slate-700/50' : 'bg-slate-700/20 border border-slate-700/30 opacity-50 cursor-not-allowed'}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm font-medium text-white",
                                                                            children: box.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                                            lineNumber: 615,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        isSuggested && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "rounded bg-emerald-500/20 px-1.5 py-0.5 text-xs text-emerald-400",
                                                                            children: "Best Fit"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                                            lineNumber: 617,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                                    lineNumber: 614,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-slate-400",
                                                                    children: [
                                                                        box.innerLength,
                                                                        '" x ',
                                                                        box.innerWidth,
                                                                        '" x ',
                                                                        box.innerHeight,
                                                                        '"'
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                                    lineNumber: 620,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                            lineNumber: 613,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-right",
                                                            children: [
                                                                box.cost && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-slate-300",
                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(box.cost)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                                    lineNumber: 625,
                                                                    columnNumber: 42
                                                                }, this),
                                                                !fits && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-red-400",
                                                                    children: !fitsVolume ? 'Too small' : 'Too heavy'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                                    lineNumber: 626,
                                                                    columnNumber: 39
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                            lineNumber: 624,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, box.id, true, {
                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                    lineNumber: 601,
                                                    columnNumber: 25
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                            lineNumber: 592,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                    lineNumber: 556,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/fulfillment/pack/page.tsx",
                                lineNumber: 555,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-md font-semibold text-white mb-4 flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                                    className: "w-4 h-4 text-slate-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                    lineNumber: 640,
                                                    columnNumber: 19
                                                }, this),
                                                "Shipping"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                            lineNumber: 639,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm text-slate-400 mb-1.5",
                                                            children: "Carrier"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                            lineNumber: 646,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: carrier,
                                                            onChange: (e)=>{
                                                                setCarrier(e.target.value);
                                                                setService('');
                                                            },
                                                            className: "w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    children: "Select carrier..."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                                    lineNumber: 652,
                                                                    columnNumber: 23
                                                                }, this),
                                                                CARRIERS.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: c.id,
                                                                        children: c.name
                                                                    }, c.id, false, {
                                                                        fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                                        lineNumber: 654,
                                                                        columnNumber: 25
                                                                    }, this))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                            lineNumber: 647,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                    lineNumber: 645,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm text-slate-400 mb-1.5",
                                                            children: "Service"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                            lineNumber: 660,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: service,
                                                            onChange: (e)=>setService(e.target.value),
                                                            disabled: !carrier,
                                                            className: "w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50 disabled:opacity-50",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    children: "Select service..."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                                    lineNumber: 667,
                                                                    columnNumber: 23
                                                                }, this),
                                                                CARRIERS.find((c)=>c.id === carrier)?.services.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: s,
                                                                        children: s
                                                                    }, s, false, {
                                                                        fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                                        lineNumber: 669,
                                                                        columnNumber: 25
                                                                    }, this))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                            lineNumber: 661,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                    lineNumber: 659,
                                                    columnNumber: 19
                                                }, this),
                                                carrier && service && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-lg bg-slate-700/30 p-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between text-sm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-slate-400",
                                                                    children: "Estimated Cost:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                                    lineNumber: 677,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-white font-medium",
                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(estimateShippingCost(carrier, service))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                                    lineNumber: 678,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                            lineNumber: 676,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between text-sm mt-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-slate-400",
                                                                    children: "Customer Paid:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                                    lineNumber: 681,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-white",
                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(selectedOrder.shipping)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                                    lineNumber: 682,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                            lineNumber: 680,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between text-sm mt-1 pt-1 border-t border-slate-600/30",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-slate-400",
                                                                    children: "Profit:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                                    lineNumber: 685,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `font-medium ${selectedOrder.shipping - estimateShippingCost(carrier, service) >= 0 ? 'text-emerald-400' : 'text-red-400'}`,
                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(selectedOrder.shipping - estimateShippingCost(carrier, service))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                                    lineNumber: 686,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                            lineNumber: 684,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                    lineNumber: 675,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                            lineNumber: 644,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                    lineNumber: 638,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/fulfillment/pack/page.tsx",
                                lineNumber: 637,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "secondary",
                                        onClick: ()=>info('Print preview coming soon'),
                                        disabled: !selectedBox || !carrier || !service,
                                        className: "w-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                lineNumber: 706,
                                                columnNumber: 17
                                            }, this),
                                            "Print Label"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/fulfillment/pack/page.tsx",
                                        lineNumber: 700,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: handlePrintAndShip,
                                        disabled: !selectedBox || !carrier || !service,
                                        className: "w-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                lineNumber: 714,
                                                columnNumber: 17
                                            }, this),
                                            "Print & Ship"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/fulfillment/pack/page.tsx",
                                        lineNumber: 709,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/fulfillment/pack/page.tsx",
                                lineNumber: 699,
                                columnNumber: 13
                            }, this),
                            (!selectedBox || !carrier || !service) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-lg bg-amber-500/10 border border-amber-500/30 p-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                            className: "h-4 w-4 text-amber-400 mt-0.5"
                                        }, void 0, false, {
                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                            lineNumber: 723,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-amber-300",
                                            children: [
                                                !selectedBox && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: "Please select a box"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                    lineNumber: 725,
                                                    columnNumber: 38
                                                }, this),
                                                !carrier && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: "Please select a carrier"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                    lineNumber: 726,
                                                    columnNumber: 34
                                                }, this),
                                                carrier && !service && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: "Please select a service"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                                    lineNumber: 727,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                            lineNumber: 724,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                    lineNumber: 722,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/fulfillment/pack/page.tsx",
                                lineNumber: 721,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/fulfillment/pack/page.tsx",
                        lineNumber: 553,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/fulfillment/pack/page.tsx",
                lineNumber: 440,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-12 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                            className: "mx-auto h-16 w-16 text-slate-600"
                        }, void 0, false, {
                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                            lineNumber: 737,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "mt-4 text-lg font-medium text-white",
                            children: "No Order Selected"
                        }, void 0, false, {
                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                            lineNumber: 738,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-sm text-slate-400",
                            children: "Scan an order barcode or select an order to begin packing"
                        }, void 0, false, {
                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                            lineNumber: 739,
                            columnNumber: 13
                        }, this),
                        packableOrders.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-slate-400 mb-3",
                                    children: "Orders ready to pack:"
                                }, void 0, false, {
                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                    lineNumber: 745,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap justify-center gap-2",
                                    children: packableOrders.slice(0, 8).map((order)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleSelectOrder(order),
                                            className: "rounded-lg bg-slate-700/50 px-4 py-2 text-sm text-white hover:bg-slate-700 transition-colors",
                                            children: [
                                                "#",
                                                order.orderNumber
                                            ]
                                        }, order.id, true, {
                                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                                            lineNumber: 748,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                                    lineNumber: 746,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/fulfillment/pack/page.tsx",
                            lineNumber: 744,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/fulfillment/pack/page.tsx",
                    lineNumber: 736,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/fulfillment/pack/page.tsx",
                lineNumber: 735,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/fulfillment/pack/page.tsx",
        lineNumber: 384,
        columnNumber: 5
    }, this);
}
_s(PackPageContent, "NlNHUCUlpX6x4x8YwakX6CT6Qgc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c2 = PackPageContent;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "PackPageLoading");
__turbopack_context__.k.register(_c1, "PackPage");
__turbopack_context__.k.register(_c2, "PackPageContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_20e300e4._.js.map