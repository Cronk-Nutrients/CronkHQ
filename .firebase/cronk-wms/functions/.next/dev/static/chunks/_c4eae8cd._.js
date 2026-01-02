(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/marketing/AdPlatformHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdPlatformHeader",
    ()=>AdPlatformHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
'use client';
;
;
function AdPlatformHeader({ platformName, platformIcon, platformColor, accountName, accountId, lastSync, dateRange, onDateRangeChange, onSync, externalLinkLabel, onExternalLink }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 text-sm text-slate-400 mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/marketing",
                        className: "hover:text-white",
                        children: "Marketing"
                    }, void 0, false, {
                        fileName: "[project]/components/marketing/AdPlatformHeader.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: "fas fa-chevron-right text-xs"
                    }, void 0, false, {
                        fileName: "[project]/components/marketing/AdPlatformHeader.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-white",
                        children: platformName
                    }, void 0, false, {
                        fileName: "[project]/components/marketing/AdPlatformHeader.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/marketing/AdPlatformHeader.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-12 h-12 rounded-xl flex items-center justify-center",
                                style: {
                                    backgroundColor: platformColor
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: `${platformIcon} text-white text-2xl`
                                }, void 0, false, {
                                    fileName: "[project]/components/marketing/AdPlatformHeader.tsx",
                                    lineNumber: 42,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/marketing/AdPlatformHeader.tsx",
                                lineNumber: 41,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-2xl font-bold text-white",
                                        children: platformName
                                    }, void 0, false, {
                                        fileName: "[project]/components/marketing/AdPlatformHeader.tsx",
                                        lineNumber: 45,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-400",
                                        children: [
                                            accountName,
                                            " • ",
                                            accountId
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/marketing/AdPlatformHeader.tsx",
                                        lineNumber: 46,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/marketing/AdPlatformHeader.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/marketing/AdPlatformHeader.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/components/marketing/AdPlatformHeader.tsx",
                                        lineNumber: 51,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-emerald-400 text-sm",
                                        children: "Connected"
                                    }, void 0, false, {
                                        fileName: "[project]/components/marketing/AdPlatformHeader.tsx",
                                        lineNumber: 52,
                                        columnNumber: 13
                                    }, this),
                                    lastSync && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-500 text-xs",
                                        children: [
                                            "• Synced ",
                                            lastSync
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/marketing/AdPlatformHeader.tsx",
                                        lineNumber: 53,
                                        columnNumber: 26
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/marketing/AdPlatformHeader.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: dateRange,
                                onChange: (e)=>onDateRangeChange(e.target.value),
                                className: "bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "7d",
                                        children: "Last 7 Days"
                                    }, void 0, false, {
                                        fileName: "[project]/components/marketing/AdPlatformHeader.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "30d",
                                        children: "Last 30 Days"
                                    }, void 0, false, {
                                        fileName: "[project]/components/marketing/AdPlatformHeader.tsx",
                                        lineNumber: 61,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "90d",
                                        children: "Last 90 Days"
                                    }, void 0, false, {
                                        fileName: "[project]/components/marketing/AdPlatformHeader.tsx",
                                        lineNumber: 62,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/marketing/AdPlatformHeader.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this),
                            onSync && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onSync,
                                className: "px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-sync-alt mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/components/marketing/AdPlatformHeader.tsx",
                                        lineNumber: 66,
                                        columnNumber: 15
                                    }, this),
                                    "Sync Now"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/marketing/AdPlatformHeader.tsx",
                                lineNumber: 65,
                                columnNumber: 13
                            }, this),
                            externalLinkLabel && onExternalLink && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onExternalLink,
                                className: "px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-external-link-alt mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/components/marketing/AdPlatformHeader.tsx",
                                        lineNumber: 72,
                                        columnNumber: 15
                                    }, this),
                                    externalLinkLabel
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/marketing/AdPlatformHeader.tsx",
                                lineNumber: 71,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/marketing/AdPlatformHeader.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/marketing/AdPlatformHeader.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/marketing/AdPlatformHeader.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c = AdPlatformHeader;
var _c;
__turbopack_context__.k.register(_c, "AdPlatformHeader");
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
"[project]/components/marketing/MetricsGrid.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MetricsGrid",
    ()=>MetricsGrid,
    "SecondaryMetricsGrid",
    ()=>SecondaryMetricsGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/formatting.ts [app-client] (ecmascript)");
'use client';
;
;
const colsMap = {
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6'
};
function MetricsGrid({ metrics, columns = 5 }) {
    const formatValue = (value, format)=>{
        switch(format){
            case 'currency':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(value);
            case 'percent':
                return `${value.toFixed(2)}%`;
            case 'multiplier':
                return `${value.toFixed(2)}x`;
            case 'thousands':
                return `${(value / 1000).toFixed(1)}K`;
            case 'number':
            default:
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(value);
        }
    };
    const getHighlightClasses = (highlight, color)=>{
        if (!highlight) return 'border-slate-700/50';
        const colorMap = {
            emerald: 'border-emerald-500/30 bg-emerald-500/5',
            amber: 'border-amber-500/30 bg-amber-500/5',
            blue: 'border-blue-500/30 bg-blue-500/5'
        };
        return colorMap[color || 'emerald'] || colorMap.emerald;
    };
    const getValueColor = (highlight, color)=>{
        if (!highlight) return 'text-white';
        const colorMap = {
            emerald: 'text-emerald-400',
            amber: 'text-amber-400',
            blue: 'text-blue-400'
        };
        return colorMap[color || 'emerald'] || colorMap.emerald;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `grid ${colsMap[columns]} gap-4`,
        children: metrics.map((metric, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `bg-slate-800/50 backdrop-blur border rounded-xl p-4 ${getHighlightClasses(metric.highlight, metric.highlightColor)}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm text-slate-400 mb-1",
                        children: metric.label
                    }, void 0, false, {
                        fileName: "[project]/components/marketing/MetricsGrid.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `text-2xl font-bold ${getValueColor(metric.highlight, metric.highlightColor)}`,
                        children: formatValue(metric.value, metric.format)
                    }, void 0, false, {
                        fileName: "[project]/components/marketing/MetricsGrid.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this),
                    metric.trend && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-emerald-400 mt-1",
                        children: metric.trend
                    }, void 0, false, {
                        fileName: "[project]/components/marketing/MetricsGrid.tsx",
                        lineNumber: 68,
                        columnNumber: 28
                    }, this)
                ]
            }, index, true, {
                fileName: "[project]/components/marketing/MetricsGrid.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/marketing/MetricsGrid.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c = MetricsGrid;
function SecondaryMetricsGrid({ metrics, columns = 4 }) {
    const formatValue = (value, format)=>{
        switch(format){
            case 'currency':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(value);
            case 'percent':
                return `${value.toFixed(2)}%`;
            case 'number':
            default:
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(value);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `grid ${colsMap[columns]} gap-4`,
        children: metrics.map((metric, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm text-slate-400 mb-1",
                        children: metric.label
                    }, void 0, false, {
                        fileName: "[project]/components/marketing/MetricsGrid.tsx",
                        lineNumber: 90,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-lg font-bold text-white",
                        children: formatValue(metric.value, metric.format)
                    }, void 0, false, {
                        fileName: "[project]/components/marketing/MetricsGrid.tsx",
                        lineNumber: 91,
                        columnNumber: 11
                    }, this)
                ]
            }, index, true, {
                fileName: "[project]/components/marketing/MetricsGrid.tsx",
                lineNumber: 89,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/marketing/MetricsGrid.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
_c1 = SecondaryMetricsGrid;
var _c, _c1;
__turbopack_context__.k.register(_c, "MetricsGrid");
__turbopack_context__.k.register(_c1, "SecondaryMetricsGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/marketing/CampaignTable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AcosBadge",
    ()=>AcosBadge,
    "CampaignNameCell",
    ()=>CampaignNameCell,
    "CampaignTable",
    ()=>CampaignTable,
    "CurrencyCell",
    ()=>CurrencyCell,
    "NumberCell",
    ()=>NumberCell,
    "RoasBadge",
    ()=>RoasBadge,
    "StatusDot",
    ()=>StatusDot,
    "TypeBadge",
    ()=>TypeBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/formatting.ts [app-client] (ecmascript)");
'use client';
;
;
function CampaignTable({ title, subtitle, columns, data, getRowKey, headerAction }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-b border-slate-700 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold text-white",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/marketing/CampaignTable.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this),
                            subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-400",
                                children: subtitle
                            }, void 0, false, {
                                fileName: "[project]/components/marketing/CampaignTable.tsx",
                                lineNumber: 35,
                                columnNumber: 24
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/marketing/CampaignTable.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    headerAction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: headerAction.onClick,
                        className: "px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: `${headerAction.icon} mr-2`
                            }, void 0, false, {
                                fileName: "[project]/components/marketing/CampaignTable.tsx",
                                lineNumber: 39,
                                columnNumber: 13
                            }, this),
                            headerAction.label
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/marketing/CampaignTable.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/marketing/CampaignTable.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "border-b border-slate-700 text-left",
                            children: columns.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: `p-4 text-slate-400 font-medium ${col.align === 'right' ? 'text-right' : ''}`,
                                    children: col.header
                                }, col.key, false, {
                                    fileName: "[project]/components/marketing/CampaignTable.tsx",
                                    lineNumber: 48,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/marketing/CampaignTable.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/marketing/CampaignTable.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        className: "divide-y divide-slate-700/50",
                        children: data.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "hover:bg-slate-800/30",
                                children: columns.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: `p-4 ${col.align === 'right' ? 'text-right' : ''}`,
                                        children: col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')
                                    }, col.key, false, {
                                        fileName: "[project]/components/marketing/CampaignTable.tsx",
                                        lineNumber: 58,
                                        columnNumber: 17
                                    }, this))
                            }, getRowKey(row), false, {
                                fileName: "[project]/components/marketing/CampaignTable.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/marketing/CampaignTable.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/marketing/CampaignTable.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/marketing/CampaignTable.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_c = CampaignTable;
function StatusDot({ active }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-2 h-2 rounded-full ${active ? 'bg-emerald-400' : 'bg-slate-500'}`
    }, void 0, false, {
        fileName: "[project]/components/marketing/CampaignTable.tsx",
        lineNumber: 74,
        columnNumber: 10
    }, this);
}
_c1 = StatusDot;
function CampaignNameCell({ name, active = true }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusDot, {
                active: active
            }, void 0, false, {
                fileName: "[project]/components/marketing/CampaignTable.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-white",
                children: name
            }, void 0, false, {
                fileName: "[project]/components/marketing/CampaignTable.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/marketing/CampaignTable.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
_c2 = CampaignNameCell;
function TypeBadge({ type, variant = 'default' }) {
    const variantClasses = {
        default: 'bg-slate-700 text-slate-300',
        blue: 'bg-blue-500/20 text-blue-400',
        purple: 'bg-purple-500/20 text-purple-400',
        orange: 'bg-orange-500/20 text-orange-400'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `px-2 py-1 text-xs rounded ${variantClasses[variant]}`,
        children: type
    }, void 0, false, {
        fileName: "[project]/components/marketing/CampaignTable.tsx",
        lineNumber: 95,
        columnNumber: 10
    }, this);
}
_c3 = TypeBadge;
function RoasBadge({ roas, thresholds = {
    high: 5,
    medium: 3
} }) {
    const variant = roas >= thresholds.high ? 'bg-emerald-500/20 text-emerald-400' : roas >= thresholds.medium ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `px-2 py-1 rounded-full text-xs font-medium ${variant}`,
        children: [
            roas.toFixed(2),
            "x"
        ]
    }, void 0, true, {
        fileName: "[project]/components/marketing/CampaignTable.tsx",
        lineNumber: 101,
        columnNumber: 10
    }, this);
}
_c4 = RoasBadge;
function AcosBadge({ acos }) {
    const variant = acos <= 18 ? 'bg-emerald-500/20 text-emerald-400' : acos <= 25 ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `px-2 py-1 rounded-full text-xs font-medium ${variant}`,
        children: [
            acos.toFixed(2),
            "%"
        ]
    }, void 0, true, {
        fileName: "[project]/components/marketing/CampaignTable.tsx",
        lineNumber: 107,
        columnNumber: 10
    }, this);
}
_c5 = AcosBadge;
function CurrencyCell({ value, variant = 'default' }) {
    const colorClass = variant === 'success' ? 'text-emerald-400' : 'text-white';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: colorClass,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(value)
    }, void 0, false, {
        fileName: "[project]/components/marketing/CampaignTable.tsx",
        lineNumber: 113,
        columnNumber: 10
    }, this);
}
_c6 = CurrencyCell;
function NumberCell({ value, variant = 'default' }) {
    const colorClass = variant === 'muted' ? 'text-slate-300' : 'text-white';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: colorClass,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(value)
    }, void 0, false, {
        fileName: "[project]/components/marketing/CampaignTable.tsx",
        lineNumber: 119,
        columnNumber: 10
    }, this);
}
_c7 = NumberCell;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "CampaignTable");
__turbopack_context__.k.register(_c1, "StatusDot");
__turbopack_context__.k.register(_c2, "CampaignNameCell");
__turbopack_context__.k.register(_c3, "TypeBadge");
__turbopack_context__.k.register(_c4, "RoasBadge");
__turbopack_context__.k.register(_c5, "AcosBadge");
__turbopack_context__.k.register(_c6, "CurrencyCell");
__turbopack_context__.k.register(_c7, "NumberCell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/marketing/InsightCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BreakdownCard",
    ()=>BreakdownCard,
    "InsightCard",
    ()=>InsightCard,
    "TipBox",
    ()=>TipBox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/formatting.ts [app-client] (ecmascript)");
'use client';
;
;
function InsightCard({ title, subtitle, items }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-b border-slate-700",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-semibold text-white",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/marketing/InsightCard.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-slate-400",
                        children: subtitle
                    }, void 0, false, {
                        fileName: "[project]/components/marketing/InsightCard.tsx",
                        lineNumber: 23,
                        columnNumber: 22
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/marketing/InsightCard.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "divide-y divide-slate-700/50",
                children: items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 flex items-center justify-between hover:bg-slate-800/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-white",
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/marketing/InsightCard.tsx",
                                        lineNumber: 29,
                                        columnNumber: 15
                                    }, this),
                                    item.sublabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-slate-400",
                                        children: item.sublabel
                                    }, void 0, false, {
                                        fileName: "[project]/components/marketing/InsightCard.tsx",
                                        lineNumber: 30,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/marketing/InsightCard.tsx",
                                lineNumber: 28,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-emerald-400 font-medium",
                                children: item.valueFormat === 'currency' && typeof item.value === 'number' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(item.value) : item.value
                            }, void 0, false, {
                                fileName: "[project]/components/marketing/InsightCard.tsx",
                                lineNumber: 32,
                                columnNumber: 13
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/components/marketing/InsightCard.tsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/marketing/InsightCard.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/marketing/InsightCard.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c = InsightCard;
function BreakdownCard({ title, subtitle, items }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-b border-slate-700",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-semibold text-white",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/marketing/InsightCard.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-slate-400",
                        children: subtitle
                    }, void 0, false, {
                        fileName: "[project]/components/marketing/InsightCard.tsx",
                        lineNumber: 63,
                        columnNumber: 22
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/marketing/InsightCard.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 space-y-4",
                children: items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between text-sm mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-400",
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/marketing/InsightCard.tsx",
                                        lineNumber: 69,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: item.color.replace('bg-', 'text-').replace('-500', '-400'),
                                        children: item.value
                                    }, void 0, false, {
                                        fileName: "[project]/components/marketing/InsightCard.tsx",
                                        lineNumber: 70,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/marketing/InsightCard.tsx",
                                lineNumber: 68,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-2 bg-slate-700 rounded-full overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `h-full ${item.color} rounded-full`,
                                    style: {
                                        width: `${item.percentage}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/marketing/InsightCard.tsx",
                                    lineNumber: 73,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/marketing/InsightCard.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/components/marketing/InsightCard.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/marketing/InsightCard.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/marketing/InsightCard.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_c1 = BreakdownCard;
function TipBox({ title, content, icon = 'fas fa-lightbulb', variant = 'emerald' }) {
    const variantClasses = {
        emerald: {
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/20',
            icon: 'text-emerald-400'
        },
        amber: {
            bg: 'bg-amber-500/10',
            border: 'border-amber-500/20',
            icon: 'text-amber-400'
        },
        cyan: {
            bg: 'bg-cyan-500/10',
            border: 'border-cyan-500/20',
            icon: 'text-cyan-400'
        },
        blue: {
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
            icon: 'text-blue-400'
        }
    };
    const classes = variantClasses[variant];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `p-4 ${classes.bg} border ${classes.border} rounded-xl`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                    className: `${icon} ${classes.icon} mt-0.5`
                }, void 0, false, {
                    fileName: "[project]/components/marketing/InsightCard.tsx",
                    lineNumber: 102,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm font-medium text-white",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/components/marketing/InsightCard.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-slate-400 mt-1",
                            children: content
                        }, void 0, false, {
                            fileName: "[project]/components/marketing/InsightCard.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/marketing/InsightCard.tsx",
                    lineNumber: 103,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/marketing/InsightCard.tsx",
            lineNumber: 101,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/marketing/InsightCard.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
_c2 = TipBox;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "InsightCard");
__turbopack_context__.k.register(_c1, "BreakdownCard");
__turbopack_context__.k.register(_c2, "TipBox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/marketing/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// Marketing section shared components
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$marketing$2f$AdPlatformHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/marketing/AdPlatformHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$marketing$2f$MetricsGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/marketing/MetricsGrid.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$marketing$2f$CampaignTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/marketing/CampaignTable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$marketing$2f$InsightCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/marketing/InsightCard.tsx [app-client] (ecmascript)");
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/marketing/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Marketing section mock data
// Dashboard overview
__turbopack_context__.s([
    "amazonAdsAccount",
    ()=>amazonAdsAccount,
    "amazonAdsCampaigns",
    ()=>amazonAdsCampaigns,
    "amazonAdsMetrics",
    ()=>amazonAdsMetrics,
    "amazonTopProducts",
    ()=>amazonTopProducts,
    "amazonTopSearchTerms",
    ()=>amazonTopSearchTerms,
    "channelBreakdown",
    ()=>channelBreakdown,
    "dateRangeOptions",
    ()=>dateRangeOptions,
    "emailAccount",
    ()=>emailAccount,
    "emailAutomatedFlows",
    ()=>emailAutomatedFlows,
    "emailListHealth",
    ()=>emailListHealth,
    "emailMetrics",
    ()=>emailMetrics,
    "emailMetricsSummary",
    ()=>emailMetricsSummary,
    "emailRecentCampaigns",
    ()=>emailRecentCampaigns,
    "getAcosBadgeVariant",
    ()=>getAcosBadgeVariant,
    "getChannelLink",
    ()=>getChannelLink,
    "getRoasBadgeVariant",
    ()=>getRoasBadgeVariant,
    "googleAdsAccount",
    ()=>googleAdsAccount,
    "googleAdsCampaigns",
    ()=>googleAdsCampaigns,
    "googleAdsMetrics",
    ()=>googleAdsMetrics,
    "googleTopKeywords",
    ()=>googleTopKeywords,
    "googleTopProducts",
    ()=>googleTopProducts,
    "marketingMetrics",
    ()=>marketingMetrics,
    "metaAdsAccount",
    ()=>metaAdsAccount,
    "metaAdsCampaigns",
    ()=>metaAdsCampaigns,
    "metaAdsMetrics",
    ()=>metaAdsMetrics,
    "metaTopAudiences",
    ()=>metaTopAudiences,
    "metaTopCreatives",
    ()=>metaTopCreatives,
    "tiktokAdsAccount",
    ()=>tiktokAdsAccount,
    "tiktokAdsCampaigns",
    ()=>tiktokAdsCampaigns,
    "tiktokAdsMetrics",
    ()=>tiktokAdsMetrics,
    "tiktokAudienceBreakdown",
    ()=>tiktokAudienceBreakdown,
    "tiktokTopCreatives",
    ()=>tiktokTopCreatives
]);
const marketingMetrics = {
    totalSpend: 12450.00,
    totalRevenue: 67890.00,
    roas: 5.45,
    cac: 18.50,
    ltv: 145.00,
    ltvCacRatio: 7.84,
    orders: 673,
    newCustomers: 245,
    returningCustomers: 428,
    conversionRate: 3.2,
    cpm: 12.50,
    cpc: 0.85,
    ctr: 1.47
};
const channelBreakdown = [
    {
        id: 'google',
        name: 'Google Ads',
        icon: 'fa-google',
        iconType: 'fab',
        color: '#4285f4',
        spend: 4500.00,
        revenue: 28500.00,
        roas: 6.33,
        orders: 285,
        cac: 15.79,
        clicks: 5200,
        impressions: 125000,
        ctr: 4.16,
        status: 'connected'
    },
    {
        id: 'meta',
        name: 'Meta Ads',
        icon: 'fa-meta',
        iconType: 'fab',
        color: '#0081fb',
        spend: 3800.00,
        revenue: 19200.00,
        roas: 5.05,
        orders: 192,
        cac: 19.79,
        clicks: 4100,
        impressions: 98000,
        ctr: 4.18,
        status: 'connected'
    },
    {
        id: 'amazon',
        name: 'Amazon Ads',
        icon: 'fa-amazon',
        iconType: 'fab',
        color: '#ff9900',
        spend: 2800.00,
        revenue: 14500.00,
        roas: 5.18,
        orders: 145,
        cac: 19.31,
        clicks: 3200,
        impressions: 85000,
        ctr: 3.76,
        status: 'connected'
    },
    {
        id: 'tiktok',
        name: 'TikTok Ads',
        icon: 'fa-tiktok',
        iconType: 'fab',
        color: '#000000',
        spend: 1350.00,
        revenue: 5690.00,
        roas: 4.21,
        orders: 51,
        cac: 26.47,
        clicks: 2800,
        impressions: 156000,
        ctr: 1.79,
        status: 'connected'
    }
];
const emailMetricsSummary = {
    platform: 'Klaviyo',
    subscribers: 12450,
    openRate: 42.5,
    clickRate: 3.8,
    revenue: 8900.00,
    campaigns: 12,
    flows: 8,
    status: 'connected'
};
const googleAdsAccount = {
    accountName: 'Cronk Nutrients',
    accountId: '123-456-7890',
    status: 'connected',
    lastSync: '5 min ago'
};
const googleAdsMetrics = {
    spend: 4500.00,
    revenue: 28500.00,
    roas: 6.33,
    orders: 285,
    clicks: 5200,
    impressions: 125000,
    ctr: 4.16,
    cpc: 0.87,
    conversions: 285,
    conversionRate: 5.48
};
const googleAdsCampaigns = [
    {
        id: '1',
        name: 'Brand - Exact Match',
        status: 'active',
        type: 'Search',
        spend: 1200.00,
        revenue: 9500.00,
        roas: 7.92,
        clicks: 1800,
        impressions: 25000,
        ctr: 7.2,
        conversions: 95
    },
    {
        id: '2',
        name: 'Non-Brand - Plant Nutrients',
        status: 'active',
        type: 'Search',
        spend: 1800.00,
        revenue: 10200.00,
        roas: 5.67,
        clicks: 2100,
        impressions: 45000,
        ctr: 4.67,
        conversions: 102
    },
    {
        id: '3',
        name: 'Shopping - All Products',
        status: 'active',
        type: 'Shopping',
        spend: 900.00,
        revenue: 5800.00,
        roas: 6.44,
        clicks: 850,
        impressions: 35000,
        ctr: 2.43,
        conversions: 58
    },
    {
        id: '4',
        name: 'Performance Max',
        status: 'active',
        type: 'PMax',
        spend: 600.00,
        revenue: 3000.00,
        roas: 5.00,
        clicks: 450,
        impressions: 20000,
        ctr: 2.25,
        conversions: 30
    }
];
const googleTopKeywords = [
    {
        keyword: 'cronk nutrients',
        revenue: 4200,
        roas: 12.5
    },
    {
        keyword: 'plant nutrients',
        revenue: 2800,
        roas: 4.2
    },
    {
        keyword: 'hydroponic fertilizer',
        revenue: 1900,
        roas: 5.8
    },
    {
        keyword: 'grow nutrients',
        revenue: 1400,
        roas: 3.9
    },
    {
        keyword: 'cal mag supplement',
        revenue: 1100,
        roas: 4.5
    }
];
const googleTopProducts = [
    {
        product: 'CalMag Plus 1L',
        revenue: 2100,
        conversions: 42
    },
    {
        product: 'Bloom Booster 500ml',
        revenue: 1800,
        conversions: 36
    },
    {
        product: 'Grow Formula 1L',
        revenue: 1500,
        conversions: 30
    },
    {
        product: 'Root Enhancer 250ml',
        revenue: 900,
        conversions: 22
    },
    {
        product: 'Micro Nutrients 500ml',
        revenue: 750,
        conversions: 15
    }
];
const metaAdsAccount = {
    accountName: 'Cronk Nutrients',
    accountId: 'act_123456789',
    status: 'connected',
    lastSync: '3 min ago'
};
const metaAdsMetrics = {
    spend: 3800.00,
    revenue: 19200.00,
    roas: 5.05,
    orders: 192,
    clicks: 4100,
    impressions: 98000,
    ctr: 4.18,
    cpc: 0.93,
    reach: 67000,
    frequency: 1.46
};
const metaAdsCampaigns = [
    {
        id: '1',
        name: 'Prospecting - Broad',
        status: 'active',
        objective: 'Conversions',
        spend: 1500.00,
        revenue: 7200.00,
        roas: 4.80,
        purchases: 72,
        reach: 35000
    },
    {
        id: '2',
        name: 'Retargeting - Website Visitors',
        status: 'active',
        objective: 'Conversions',
        spend: 800.00,
        revenue: 5600.00,
        roas: 7.00,
        purchases: 56,
        reach: 8000
    },
    {
        id: '3',
        name: 'Lookalike - Purchasers',
        status: 'active',
        objective: 'Conversions',
        spend: 1000.00,
        revenue: 4200.00,
        roas: 4.20,
        purchases: 42,
        reach: 18000
    },
    {
        id: '4',
        name: 'DPA - Catalog Sales',
        status: 'active',
        objective: 'Catalog Sales',
        spend: 500.00,
        revenue: 2200.00,
        roas: 4.40,
        purchases: 22,
        reach: 6000
    }
];
const metaTopAudiences = [
    {
        audience: 'Lookalike 1% - Purchasers',
        purchases: 42,
        roas: 5.2
    },
    {
        audience: 'Interest - Gardening',
        purchases: 35,
        roas: 4.1
    },
    {
        audience: 'Website Visitors 30d',
        purchases: 28,
        roas: 7.8
    },
    {
        audience: 'Engaged Shoppers',
        purchases: 22,
        roas: 3.9
    },
    {
        audience: 'Cart Abandoners',
        purchases: 18,
        roas: 8.2
    }
];
const metaTopCreatives = [
    {
        creative: 'Video - Product Demo',
        purchases: 48,
        ctr: 2.8
    },
    {
        creative: 'Carousel - Best Sellers',
        purchases: 36,
        ctr: 2.1
    },
    {
        creative: 'Image - Lifestyle Shot',
        purchases: 29,
        ctr: 1.9
    },
    {
        creative: 'DPA - Retargeting',
        purchases: 22,
        ctr: 3.2
    },
    {
        creative: 'UGC - Customer Review',
        purchases: 18,
        ctr: 2.4
    }
];
const amazonAdsAccount = {
    accountName: 'Cronk Nutrients',
    sellerId: 'A1B2C3D4E5F6G7',
    status: 'connected',
    lastSync: '8 min ago'
};
const amazonAdsMetrics = {
    spend: 2800.00,
    revenue: 14500.00,
    roas: 5.18,
    acos: 19.31,
    tacos: 8.2,
    orders: 145,
    clicks: 3200,
    impressions: 85000,
    ctr: 3.76,
    cpc: 0.88
};
const amazonAdsCampaigns = [
    {
        id: '1',
        name: 'SP - CalMag Plus - Exact',
        status: 'active',
        type: 'Sponsored Products',
        spend: 850.00,
        revenue: 5200.00,
        acos: 16.35,
        orders: 52,
        impressions: 22000
    },
    {
        id: '2',
        name: 'SP - Auto Campaign',
        status: 'active',
        type: 'Sponsored Products',
        spend: 720.00,
        revenue: 3800.00,
        acos: 18.95,
        orders: 38,
        impressions: 28000
    },
    {
        id: '3',
        name: 'SB - Brand Defense',
        status: 'active',
        type: 'Sponsored Brands',
        spend: 580.00,
        revenue: 3100.00,
        acos: 18.71,
        orders: 31,
        impressions: 18000
    },
    {
        id: '4',
        name: 'SD - Product Targeting',
        status: 'active',
        type: 'Sponsored Display',
        spend: 650.00,
        revenue: 2400.00,
        acos: 27.08,
        orders: 24,
        impressions: 17000
    }
];
const amazonTopSearchTerms = [
    {
        term: 'cal mag for plants',
        revenue: 2100,
        acos: 14.2
    },
    {
        term: 'hydroponic nutrients',
        revenue: 1800,
        acos: 18.5
    },
    {
        term: 'plant food indoor',
        revenue: 1200,
        acos: 16.8
    },
    {
        term: 'grow fertilizer',
        revenue: 950,
        acos: 21.2
    },
    {
        term: 'bloom booster',
        revenue: 820,
        acos: 15.4
    }
];
const amazonTopProducts = [
    {
        product: 'CalMag Plus 1L',
        revenue: 5200,
        orders: 52
    },
    {
        product: 'Bloom Booster 500ml',
        revenue: 3800,
        orders: 38
    },
    {
        product: 'Grow Formula 1L',
        revenue: 2400,
        orders: 24
    },
    {
        product: 'Micro Nutrients 500ml',
        revenue: 1900,
        orders: 19
    },
    {
        product: 'Root Enhancer 250ml',
        revenue: 1200,
        orders: 12
    }
];
const tiktokAdsAccount = {
    accountName: 'Cronk Nutrients',
    advertiserId: '7123456789012345678',
    status: 'connected',
    lastSync: '12 min ago'
};
const tiktokAdsMetrics = {
    spend: 1350.00,
    revenue: 5690.00,
    roas: 4.21,
    orders: 51,
    clicks: 2800,
    impressions: 156000,
    ctr: 1.79,
    cpc: 0.48,
    videoViews: 89000,
    engagementRate: 5.2
};
const tiktokAdsCampaigns = [
    {
        id: '1',
        name: 'Product Showcase - CalMag',
        status: 'active',
        objective: 'Conversions',
        spend: 520.00,
        revenue: 2400.00,
        roas: 4.62,
        conversions: 24,
        videoViews: 35000
    },
    {
        id: '2',
        name: 'UGC - Customer Reviews',
        status: 'active',
        objective: 'Conversions',
        spend: 380.00,
        revenue: 1800.00,
        roas: 4.74,
        conversions: 18,
        videoViews: 28000
    },
    {
        id: '3',
        name: 'Before/After Results',
        status: 'active',
        objective: 'Conversions',
        spend: 280.00,
        revenue: 990.00,
        roas: 3.54,
        conversions: 6,
        videoViews: 16000
    },
    {
        id: '4',
        name: 'Spark Ads - Influencer',
        status: 'active',
        objective: 'Traffic',
        spend: 170.00,
        revenue: 500.00,
        roas: 2.94,
        conversions: 3,
        videoViews: 10000
    }
];
const tiktokTopCreatives = [
    {
        creative: 'Product Demo - 15s',
        views: 35000,
        cvr: 0.68
    },
    {
        creative: 'UGC Review - Plant Growth',
        views: 28000,
        cvr: 0.64
    },
    {
        creative: 'Before/After Comparison',
        views: 16000,
        cvr: 0.38
    },
    {
        creative: 'Influencer Unboxing',
        views: 10000,
        cvr: 0.30
    }
];
const tiktokAudienceBreakdown = [
    {
        label: 'Age 18-24',
        percentage: 32,
        color: 'bg-pink-500'
    },
    {
        label: 'Age 25-34',
        percentage: 45,
        color: 'bg-cyan-500'
    },
    {
        label: 'Age 35-44',
        percentage: 18,
        color: 'bg-purple-500'
    },
    {
        label: 'Age 45+',
        percentage: 5,
        color: 'bg-amber-500'
    }
];
const emailAccount = {
    platform: 'Klaviyo'
};
const emailMetrics = {
    subscribers: 12450,
    listGrowth: 245,
    openRate: 42.5,
    clickRate: 3.8,
    unsubscribeRate: 0.2,
    revenue: 8900.00,
    revenuePerRecipient: 0.72
};
const emailRecentCampaigns = [
    {
        id: '1',
        name: 'Holiday Sale Announcement',
        sentDate: '2024-12-20',
        recipients: 12100,
        openRate: 48.2,
        clickRate: 5.2,
        revenue: 3200.00,
        status: 'sent'
    },
    {
        id: '2',
        name: 'New Product Launch',
        sentDate: '2024-12-15',
        recipients: 11800,
        openRate: 44.5,
        clickRate: 4.8,
        revenue: 2800.00,
        status: 'sent'
    },
    {
        id: '3',
        name: 'Weekly Newsletter',
        sentDate: '2024-12-18',
        recipients: 12000,
        openRate: 38.2,
        clickRate: 2.9,
        revenue: 1450.00,
        status: 'sent'
    },
    {
        id: '4',
        name: 'Flash Sale - 24hr Only',
        sentDate: '2024-12-10',
        recipients: 11500,
        openRate: 52.1,
        clickRate: 6.8,
        revenue: 4200.00,
        status: 'sent'
    }
];
const emailAutomatedFlows = [
    {
        name: 'Welcome Series',
        active: true,
        revenue: 1200.00,
        sent: 890,
        openRate: 65.2
    },
    {
        name: 'Abandoned Cart',
        active: true,
        revenue: 2100.00,
        sent: 1245,
        openRate: 48.5
    },
    {
        name: 'Post-Purchase',
        active: true,
        revenue: 650.00,
        sent: 567,
        openRate: 52.8
    },
    {
        name: 'Win-Back',
        active: true,
        revenue: 420.00,
        sent: 234,
        openRate: 28.4
    },
    {
        name: 'Browse Abandonment',
        active: false,
        revenue: 0,
        sent: 0,
        openRate: 0
    },
    {
        name: 'VIP Rewards',
        active: true,
        revenue: 380.00,
        sent: 156,
        openRate: 58.2
    }
];
const emailListHealth = [
    {
        segment: 'Highly Engaged',
        count: 4980,
        percentage: 40,
        color: 'bg-emerald-500'
    },
    {
        segment: 'Engaged',
        count: 3735,
        percentage: 30,
        color: 'bg-blue-500'
    },
    {
        segment: 'Semi-Engaged',
        count: 2490,
        percentage: 20,
        color: 'bg-amber-500'
    },
    {
        segment: 'At Risk',
        count: 1245,
        percentage: 10,
        color: 'bg-red-500'
    }
];
const dateRangeOptions = [
    {
        id: 'today',
        label: 'Today'
    },
    {
        id: '7d',
        label: 'Last 7 Days'
    },
    {
        id: '30d',
        label: 'Last 30 Days'
    },
    {
        id: '90d',
        label: 'Last 90 Days'
    },
    {
        id: 'mtd',
        label: 'Month to Date'
    },
    {
        id: 'ytd',
        label: 'Year to Date'
    },
    {
        id: 'custom',
        label: 'Custom Range'
    }
];
const getChannelLink = (id)=>{
    const links = {
        google: '/marketing/google-ads',
        meta: '/marketing/meta-ads',
        amazon: '/marketing/amazon-ads',
        tiktok: '/marketing/tiktok-ads'
    };
    return links[id] || '/marketing';
};
const getRoasBadgeVariant = (roas, threshold = {
    high: 5,
    medium: 3
})=>roas >= threshold.high ? 'success' : roas >= threshold.medium ? 'warning' : 'error';
const getAcosBadgeVariant = (acos)=>acos <= 18 ? 'success' : acos <= 25 ? 'warning' : 'error';
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/marketing/tiktok-ads/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TikTokAdsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$marketing$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/marketing/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$marketing$2f$AdPlatformHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/marketing/AdPlatformHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$marketing$2f$MetricsGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/marketing/MetricsGrid.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$marketing$2f$CampaignTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/marketing/CampaignTable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$marketing$2f$InsightCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/marketing/InsightCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$marketing$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/marketing/index.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function TikTokAdsPage() {
    _s();
    const [dateRange, setDateRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('30d');
    const primaryMetrics = [
        {
            label: 'Spend',
            value: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$marketing$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tiktokAdsMetrics"].spend,
            format: 'currency'
        },
        {
            label: 'Revenue',
            value: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$marketing$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tiktokAdsMetrics"].revenue,
            format: 'currency',
            highlight: true,
            highlightColor: 'emerald'
        },
        {
            label: 'ROAS',
            value: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$marketing$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tiktokAdsMetrics"].roas,
            format: 'multiplier',
            highlight: true,
            highlightColor: 'amber'
        },
        {
            label: 'Conversions',
            value: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$marketing$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tiktokAdsMetrics"].orders,
            format: 'number'
        },
        {
            label: 'Video Views',
            value: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$marketing$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tiktokAdsMetrics"].videoViews,
            format: 'thousands'
        }
    ];
    const secondaryMetrics = [
        {
            label: 'Clicks',
            value: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$marketing$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tiktokAdsMetrics"].clicks,
            format: 'number'
        },
        {
            label: 'Impressions',
            value: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$marketing$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tiktokAdsMetrics"].impressions,
            format: 'number'
        },
        {
            label: 'CTR',
            value: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$marketing$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tiktokAdsMetrics"].ctr,
            format: 'percent'
        },
        {
            label: 'Engagement Rate',
            value: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$marketing$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tiktokAdsMetrics"].engagementRate,
            format: 'percent'
        }
    ];
    const campaignColumns = [
        {
            key: 'name',
            header: 'Campaign',
            render: (v, row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$marketing$2f$CampaignTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CampaignNameCell"], {
                    name: row.name,
                    active: row.status === 'active'
                }, void 0, false, {
                    fileName: "[project]/app/marketing/tiktok-ads/page.tsx",
                    lineNumber: 26,
                    columnNumber: 99
                }, this)
        },
        {
            key: 'objective',
            header: 'Objective',
            render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$marketing$2f$CampaignTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TypeBadge"], {
                    type: v
                }, void 0, false, {
                    fileName: "[project]/app/marketing/tiktok-ads/page.tsx",
                    lineNumber: 27,
                    columnNumber: 70
                }, this)
        },
        {
            key: 'spend',
            header: 'Spend',
            align: 'right',
            render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$marketing$2f$CampaignTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CurrencyCell"], {
                    value: v
                }, void 0, false, {
                    fileName: "[project]/app/marketing/tiktok-ads/page.tsx",
                    lineNumber: 28,
                    columnNumber: 87
                }, this)
        },
        {
            key: 'revenue',
            header: 'Revenue',
            align: 'right',
            render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$marketing$2f$CampaignTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CurrencyCell"], {
                    value: v,
                    variant: "success"
                }, void 0, false, {
                    fileName: "[project]/app/marketing/tiktok-ads/page.tsx",
                    lineNumber: 29,
                    columnNumber: 91
                }, this)
        },
        {
            key: 'roas',
            header: 'ROAS',
            align: 'right',
            render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$marketing$2f$CampaignTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoasBadge"], {
                    roas: v,
                    thresholds: {
                        high: 4,
                        medium: 3
                    }
                }, void 0, false, {
                    fileName: "[project]/app/marketing/tiktok-ads/page.tsx",
                    lineNumber: 30,
                    columnNumber: 85
                }, this)
        },
        {
            key: 'conversions',
            header: 'Conversions',
            align: 'right',
            render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$marketing$2f$CampaignTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberCell"], {
                    value: v
                }, void 0, false, {
                    fileName: "[project]/app/marketing/tiktok-ads/page.tsx",
                    lineNumber: 31,
                    columnNumber: 99
                }, this)
        },
        {
            key: 'videoViews',
            header: 'Video Views',
            align: 'right',
            render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-slate-300",
                    children: [
                        (v / 1000).toFixed(1),
                        "K"
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/marketing/tiktok-ads/page.tsx",
                    lineNumber: 32,
                    columnNumber: 98
                }, this)
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$marketing$2f$AdPlatformHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdPlatformHeader"], {
                platformName: "TikTok Ads",
                platformIcon: "fab fa-tiktok",
                platformColor: "#000000",
                accountName: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$marketing$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tiktokAdsAccount"].accountName,
                accountId: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$marketing$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tiktokAdsAccount"].advertiserId,
                lastSync: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$marketing$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tiktokAdsAccount"].lastSync,
                dateRange: dateRange,
                onDateRangeChange: setDateRange,
                onSync: ()=>{},
                externalLinkLabel: "Open in TikTok Ads",
                onExternalLink: ()=>window.open('https://ads.tiktok.com', '_blank')
            }, void 0, false, {
                fileName: "[project]/app/marketing/tiktok-ads/page.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$marketing$2f$MetricsGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MetricsGrid"], {
                metrics: primaryMetrics,
                columns: 5
            }, void 0, false, {
                fileName: "[project]/app/marketing/tiktok-ads/page.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$marketing$2f$MetricsGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SecondaryMetricsGrid"], {
                metrics: secondaryMetrics,
                columns: 4
            }, void 0, false, {
                fileName: "[project]/app/marketing/tiktok-ads/page.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$marketing$2f$CampaignTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CampaignTable"], {
                title: "Campaigns",
                subtitle: `${__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$marketing$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tiktokAdsCampaigns"].length} active campaigns`,
                columns: campaignColumns,
                data: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$marketing$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tiktokAdsCampaigns"],
                getRowKey: (row)=>row.id,
                headerAction: {
                    label: 'Open in TikTok Ads',
                    icon: 'fas fa-external-link-alt',
                    onClick: ()=>{}
                }
            }, void 0, false, {
                fileName: "[project]/app/marketing/tiktok-ads/page.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$marketing$2f$InsightCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InsightCard"], {
                        title: "Top Creatives",
                        subtitle: "By conversion rate",
                        items: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$marketing$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tiktokTopCreatives"].map((c)=>({
                                label: c.creative,
                                sublabel: `${(c.views / 1000).toFixed(1)}K views`,
                                value: `${c.cvr}% CVR`
                            }))
                    }, void 0, false, {
                        fileName: "[project]/app/marketing/tiktok-ads/page.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$marketing$2f$InsightCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BreakdownCard"], {
                        title: "Audience Insights",
                        subtitle: "Demographics breakdown",
                        items: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$marketing$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tiktokAudienceBreakdown"].map((a)=>({
                                label: a.label,
                                value: `${a.percentage}%`,
                                percentage: a.percentage,
                                color: a.color
                            }))
                    }, void 0, false, {
                        fileName: "[project]/app/marketing/tiktok-ads/page.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/marketing/tiktok-ads/page.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$marketing$2f$InsightCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TipBox"], {
                title: "TikTok Creative Best Practices",
                content: "Use vertical video (9:16), hook viewers in the first 3 seconds, leverage trending sounds, and feature authentic UGC content. TikTok rewards native-feeling content over polished ads.",
                icon: "fab fa-tiktok",
                variant: "cyan"
            }, void 0, false, {
                fileName: "[project]/app/marketing/tiktok-ads/page.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/marketing/tiktok-ads/page.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_s(TikTokAdsPage, "8fVU4LTHPTHN+S0UvtpTbFuA7eg=");
_c = TikTokAdsPage;
var _c;
__turbopack_context__.k.register(_c, "TikTokAdsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_c4eae8cd._.js.map