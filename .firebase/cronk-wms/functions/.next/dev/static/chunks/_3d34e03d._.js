(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/reports/ReportPageHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ReportPageHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
'use client';
;
;
function ReportPageHeader({ title, description, icon, iconColor = 'emerald', breadcrumbs, actions }) {
    const iconColorClasses = {
        emerald: 'bg-emerald-500/20 text-emerald-400',
        blue: 'bg-blue-500/20 text-blue-400',
        purple: 'bg-purple-500/20 text-purple-400',
        amber: 'bg-amber-500/20 text-amber-400',
        red: 'bg-red-500/20 text-red-400',
        pink: 'bg-pink-500/20 text-pink-400',
        cyan: 'bg-cyan-500/20 text-cyan-400'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 text-sm text-slate-400 mb-2",
                children: breadcrumbs.map((crumb, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-2",
                        children: [
                            index > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-chevron-right text-xs"
                            }, void 0, false, {
                                fileName: "[project]/components/reports/ReportPageHeader.tsx",
                                lineNumber: 42,
                                columnNumber: 27
                            }, this),
                            crumb.href ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: crumb.href,
                                className: "hover:text-white",
                                children: crumb.label
                            }, void 0, false, {
                                fileName: "[project]/components/reports/ReportPageHeader.tsx",
                                lineNumber: 44,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white",
                                children: crumb.label
                            }, void 0, false, {
                                fileName: "[project]/components/reports/ReportPageHeader.tsx",
                                lineNumber: 48,
                                columnNumber: 15
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/components/reports/ReportPageHeader.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/reports/ReportPageHeader.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `w-12 h-12 rounded-xl flex items-center justify-center ${iconColorClasses[iconColor] || iconColorClasses.emerald}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: `fas ${icon} text-xl`
                                }, void 0, false, {
                                    fileName: "[project]/components/reports/ReportPageHeader.tsx",
                                    lineNumber: 56,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/reports/ReportPageHeader.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-2xl font-bold text-white",
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/components/reports/ReportPageHeader.tsx",
                                        lineNumber: 59,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-400",
                                        children: description
                                    }, void 0, false, {
                                        fileName: "[project]/components/reports/ReportPageHeader.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/reports/ReportPageHeader.tsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/reports/ReportPageHeader.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    actions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: actions
                    }, void 0, false, {
                        fileName: "[project]/components/reports/ReportPageHeader.tsx",
                        lineNumber: 63,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/reports/ReportPageHeader.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/reports/ReportPageHeader.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c = ReportPageHeader;
var _c;
__turbopack_context__.k.register(_c, "ReportPageHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/reports/MetricCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MetricCardGrid",
    ()=>MetricCardGrid,
    "default",
    ()=>MetricCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function MetricCard({ label, value, subtext, icon, trend, variant = 'default', className = '' }) {
    const variantClasses = {
        default: 'bg-slate-800/50 border-slate-700/50',
        success: 'bg-emerald-500/10 border-emerald-500/30',
        warning: 'bg-amber-500/10 border-amber-500/30',
        error: 'bg-red-500/10 border-red-500/30',
        info: 'bg-blue-500/10 border-blue-500/30'
    };
    const valueColorClasses = {
        default: 'text-white',
        success: 'text-emerald-400',
        warning: 'text-amber-400',
        error: 'text-red-400',
        info: 'text-blue-400'
    };
    const trendColors = {
        up: 'text-emerald-400',
        down: 'text-red-400',
        neutral: 'text-slate-400'
    };
    const trendIcons = {
        up: 'fa-arrow-up',
        down: 'fa-arrow-down',
        neutral: 'fa-minus'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `backdrop-blur border rounded-xl p-5 ${variantClasses[variant]} ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 text-sm text-slate-400 mb-1",
                children: [
                    icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: `fas ${icon}`
                    }, void 0, false, {
                        fileName: "[project]/components/reports/MetricCard.tsx",
                        lineNumber: 56,
                        columnNumber: 18
                    }, this),
                    label
                ]
            }, void 0, true, {
                fileName: "[project]/components/reports/MetricCard.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `text-2xl font-bold ${valueColorClasses[variant]}`,
                children: value
            }, void 0, false, {
                fileName: "[project]/components/reports/MetricCard.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            (subtext || trend) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs mt-1 flex items-center gap-2",
                children: [
                    trend && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: trendColors[trend.direction],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: `fas ${trendIcons[trend.direction]} mr-1`
                            }, void 0, false, {
                                fileName: "[project]/components/reports/MetricCard.tsx",
                                lineNumber: 64,
                                columnNumber: 15
                            }, this),
                            trend.value,
                            "% vs last period"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/reports/MetricCard.tsx",
                        lineNumber: 63,
                        columnNumber: 13
                    }, this),
                    subtext && !trend && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-slate-400",
                        children: subtext
                    }, void 0, false, {
                        fileName: "[project]/components/reports/MetricCard.tsx",
                        lineNumber: 68,
                        columnNumber: 33
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/reports/MetricCard.tsx",
                lineNumber: 61,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/reports/MetricCard.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_c = MetricCard;
function MetricCardGrid({ children, columns = 4 }) {
    const colClasses = {
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `grid ${colClasses[columns]} gap-4`,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/reports/MetricCard.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
_c1 = MetricCardGrid;
var _c, _c1;
__turbopack_context__.k.register(_c, "MetricCard");
__turbopack_context__.k.register(_c1, "MetricCardGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/reports/ReportTabs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ReportTabs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function ReportTabs({ tabs, activeTab, onTabChange, accentColor = 'emerald' }) {
    const activeClasses = {
        emerald: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50',
        blue: 'bg-blue-500/20 text-blue-400 border border-blue-500/50',
        purple: 'bg-purple-500/20 text-purple-400 border border-purple-500/50',
        amber: 'bg-amber-500/20 text-amber-400 border border-amber-500/50',
        pink: 'bg-pink-500/20 text-pink-400 border border-pink-500/50',
        cyan: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2 border-b border-slate-700 pb-4",
        children: tabs.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onTabChange(tab.id),
                className: `flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === tab.id ? activeClasses[accentColor] : 'text-slate-400 hover:text-white hover:bg-slate-800'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: `fas ${tab.icon}`
                    }, void 0, false, {
                        fileName: "[project]/components/reports/ReportTabs.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this),
                    tab.label
                ]
            }, tab.id, true, {
                fileName: "[project]/components/reports/ReportTabs.tsx",
                lineNumber: 34,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/reports/ReportTabs.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_c = ReportTabs;
var _c;
__turbopack_context__.k.register(_c, "ReportTabs");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/reports/DataTable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MarginBadge",
    ()=>MarginBadge,
    "StatusBadge",
    ()=>StatusBadge,
    "default",
    ()=>DataTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function DataTable({ columns, data, title, subtitle, headerActions, footer, emptyMessage = 'No data available', emptyIcon = 'fa-inbox', maxHeight, onRowClick, getRowKey }) {
    const alignClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden",
        children: [
            (title || headerActions) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-b border-slate-700 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-white font-semibold",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/reports/DataTable.tsx",
                                lineNumber: 51,
                                columnNumber: 23
                            }, this),
                            subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-400",
                                children: subtitle
                            }, void 0, false, {
                                fileName: "[project]/components/reports/DataTable.tsx",
                                lineNumber: 52,
                                columnNumber: 26
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/reports/DataTable.tsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, this),
                    headerActions
                ]
            }, void 0, true, {
                fileName: "[project]/components/reports/DataTable.tsx",
                lineNumber: 49,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: maxHeight ? `max-h-[${maxHeight}] overflow-y-auto` : '',
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: maxHeight ? 'sticky top-0 bg-slate-800/90 backdrop-blur' : '',
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "border-b border-slate-700 text-left",
                                children: columns.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: `p-4 text-slate-400 font-medium ${alignClasses[col.align || 'left']} ${col.className || ''}`,
                                        children: col.header
                                    }, col.key, false, {
                                        fileName: "[project]/components/reports/DataTable.tsx",
                                        lineNumber: 63,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/reports/DataTable.tsx",
                                lineNumber: 61,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/reports/DataTable.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            className: "divide-y divide-slate-700/50",
                            children: data.length > 0 ? data.map((row, rowIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: `hover:bg-slate-800/30 ${onRowClick ? 'cursor-pointer' : ''}`,
                                    onClick: ()=>onRowClick?.(row, rowIndex),
                                    children: columns.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: `p-4 ${alignClasses[col.align || 'left']} ${col.className || ''}`,
                                            children: col.render ? col.render(row[col.key], row, rowIndex) : row[col.key]
                                        }, col.key, false, {
                                            fileName: "[project]/components/reports/DataTable.tsx",
                                            lineNumber: 81,
                                            columnNumber: 21
                                        }, this))
                                }, getRowKey ? getRowKey(row, rowIndex) : rowIndex, false, {
                                    fileName: "[project]/components/reports/DataTable.tsx",
                                    lineNumber: 75,
                                    columnNumber: 17
                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    colSpan: columns.length,
                                    className: "p-8 text-center text-slate-400",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: `fas ${emptyIcon} text-3xl mb-2 opacity-50`
                                        }, void 0, false, {
                                            fileName: "[project]/components/reports/DataTable.tsx",
                                            lineNumber: 95,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: emptyMessage
                                        }, void 0, false, {
                                            fileName: "[project]/components/reports/DataTable.tsx",
                                            lineNumber: 96,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/reports/DataTable.tsx",
                                    lineNumber: 94,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/reports/DataTable.tsx",
                                lineNumber: 93,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/reports/DataTable.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this),
                        footer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tfoot", {
                            className: "border-t border-slate-700 bg-slate-800/50",
                            children: footer
                        }, void 0, false, {
                            fileName: "[project]/components/reports/DataTable.tsx",
                            lineNumber: 102,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/reports/DataTable.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/reports/DataTable.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/reports/DataTable.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_c = DataTable;
function StatusBadge({ status, variant = 'neutral', showDot = false, pulse = false }) {
    const variantClasses = {
        success: 'bg-emerald-500/20 text-emerald-400',
        warning: 'bg-amber-500/20 text-amber-400',
        error: 'bg-red-500/20 text-red-400',
        info: 'bg-blue-500/20 text-blue-400',
        neutral: 'bg-slate-500/20 text-slate-400'
    };
    const dotColors = {
        success: 'bg-emerald-400',
        warning: 'bg-amber-400',
        error: 'bg-red-400',
        info: 'bg-blue-400',
        neutral: 'bg-slate-400'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${variantClasses[variant]}`,
        children: [
            showDot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `w-2 h-2 rounded-full ${dotColors[variant]} ${pulse ? 'animate-pulse' : ''}`
            }, void 0, false, {
                fileName: "[project]/components/reports/DataTable.tsx",
                lineNumber: 145,
                columnNumber: 9
            }, this),
            status
        ]
    }, void 0, true, {
        fileName: "[project]/components/reports/DataTable.tsx",
        lineNumber: 143,
        columnNumber: 5
    }, this);
}
_c1 = StatusBadge;
function MarginBadge({ margin, thresholds = {
    high: 40,
    medium: 25
} }) {
    const variant = margin >= thresholds.high ? 'success' : margin >= thresholds.medium ? 'warning' : 'error';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusBadge, {
        status: `${margin.toFixed(1)}%`,
        variant: variant
    }, void 0, false, {
        fileName: "[project]/components/reports/DataTable.tsx",
        lineNumber: 163,
        columnNumber: 10
    }, this);
}
_c2 = MarginBadge;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "DataTable");
__turbopack_context__.k.register(_c1, "StatusBadge");
__turbopack_context__.k.register(_c2, "MarginBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/reports/DateRangePicker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CustomDateRange",
    ()=>CustomDateRange,
    "DateRangeButtons",
    ()=>DateRangeButtons,
    "default",
    ()=>DateRangePicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
const defaultOptions = [
    {
        value: '7d',
        label: 'Last 7 Days'
    },
    {
        value: '30d',
        label: 'Last 30 Days'
    },
    {
        value: '90d',
        label: 'Last 90 Days'
    },
    {
        value: 'ytd',
        label: 'Year to Date'
    }
];
function DateRangePicker({ value, onChange, options = defaultOptions, showCustom = false, className = '' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
        value: value,
        onChange: (e)=>onChange(e.target.value),
        className: `bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-emerald-500 ${className}`,
        children: [
            options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                    value: opt.value,
                    children: opt.label
                }, opt.value, false, {
                    fileName: "[project]/components/reports/DateRangePicker.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this)),
            showCustom && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: "custom",
                children: "Custom Range"
            }, void 0, false, {
                fileName: "[project]/components/reports/DateRangePicker.tsx",
                lineNumber: 38,
                columnNumber: 22
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/reports/DateRangePicker.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_c = DateRangePicker;
function DateRangeButtons({ value, onChange, options = [
    {
        value: 'today',
        label: 'Today'
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
    }
], accentColor = 'emerald' }) {
    const activeClasses = {
        emerald: 'bg-emerald-500/20 text-emerald-300',
        purple: 'bg-purple-500/20 text-purple-300',
        blue: 'bg-blue-500/20 text-blue-300'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-1",
        children: options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onChange(opt.value),
                className: `px-4 py-2 text-sm rounded-lg transition-all ${value === opt.value ? activeClasses[accentColor] : 'text-slate-400 hover:text-white'}`,
                children: opt.label
            }, opt.value, false, {
                fileName: "[project]/components/reports/DateRangePicker.tsx",
                lineNumber: 71,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/reports/DateRangePicker.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
_c1 = DateRangeButtons;
function CustomDateRange({ startDate, endDate, onStartChange, onEndChange }) {
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
                        fileName: "[project]/components/reports/DateRangePicker.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "date",
                        value: startDate,
                        onChange: (e)=>onStartChange(e.target.value),
                        className: "bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                    }, void 0, false, {
                        fileName: "[project]/components/reports/DateRangePicker.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/reports/DateRangePicker.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm text-slate-400",
                        children: "To:"
                    }, void 0, false, {
                        fileName: "[project]/components/reports/DateRangePicker.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "date",
                        value: endDate,
                        onChange: (e)=>onEndChange(e.target.value),
                        className: "bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                    }, void 0, false, {
                        fileName: "[project]/components/reports/DateRangePicker.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/reports/DateRangePicker.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/reports/DateRangePicker.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
_c2 = CustomDateRange;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "DateRangePicker");
__turbopack_context__.k.register(_c1, "DateRangeButtons");
__turbopack_context__.k.register(_c2, "CustomDateRange");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/reports/ChartPlaceholder.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SummaryCard",
    ()=>SummaryCard,
    "default",
    ()=>ChartPlaceholder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function ChartPlaceholder({ title, type = 'line', height = 'h-48', className = '' }) {
    const icons = {
        line: 'fa-chart-line',
        bar: 'fa-chart-bar',
        pie: 'fa-chart-pie',
        area: 'fa-chart-area',
        donut: 'fa-chart-pie'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5 ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-white font-semibold mb-4",
                children: title
            }, void 0, false, {
                fileName: "[project]/components/reports/ChartPlaceholder.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${height} flex items-center justify-center border border-slate-700 border-dashed rounded-lg`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center text-slate-400",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: `fas ${icons[type]} text-3xl mb-2`
                        }, void 0, false, {
                            fileName: "[project]/components/reports/ChartPlaceholder.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm",
                            children: [
                                title,
                                " visualization"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/reports/ChartPlaceholder.tsx",
                            lineNumber: 30,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/reports/ChartPlaceholder.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/reports/ChartPlaceholder.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/reports/ChartPlaceholder.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_c = ChartPlaceholder;
function SummaryCard({ title, children, className = '' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5 ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-white font-semibold mb-4",
                children: title
            }, void 0, false, {
                fileName: "[project]/components/reports/ChartPlaceholder.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/components/reports/ChartPlaceholder.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_c1 = SummaryCard;
var _c, _c1;
__turbopack_context__.k.register(_c, "ChartPlaceholder");
__turbopack_context__.k.register(_c1, "SummaryCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/reports/ExportActions.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ExportActions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function ExportActions({ onExport, formats = [
    'csv',
    'xlsx',
    'pdf'
], loading = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-lg p-1",
        children: formats.map((format)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onExport(format),
                disabled: loading,
                className: "px-3 py-1.5 hover:bg-slate-700 text-slate-300 hover:text-white rounded text-sm transition-colors disabled:opacity-50",
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                    className: "fas fa-spinner fa-spin"
                }, void 0, false, {
                    fileName: "[project]/components/reports/ExportActions.tsx",
                    lineNumber: 26,
                    columnNumber: 13
                }, this) : format.toUpperCase()
            }, format, false, {
                fileName: "[project]/components/reports/ExportActions.tsx",
                lineNumber: 19,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/reports/ExportActions.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_c = ExportActions;
var _c;
__turbopack_context__.k.register(_c, "ExportActions");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/reports/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// Re-export all report components
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ReportPageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/ReportPageHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/MetricCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ReportTabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/ReportTabs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DataTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/DataTable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DateRangePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/DateRangePicker.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ChartPlaceholder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/ChartPlaceholder.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ExportActions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/ExportActions.tsx [app-client] (ecmascript)");
;
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/reports/ReportPageHeader.tsx [app-client] (ecmascript) <export default as ReportPageHeader>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReportPageHeader",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ReportPageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ReportPageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/ReportPageHeader.tsx [app-client] (ecmascript)");
}),
"[project]/components/reports/MetricCard.tsx [app-client] (ecmascript) <export default as MetricCard>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MetricCard",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/MetricCard.tsx [app-client] (ecmascript)");
}),
"[project]/components/reports/ReportTabs.tsx [app-client] (ecmascript) <export default as ReportTabs>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReportTabs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ReportTabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ReportTabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/ReportTabs.tsx [app-client] (ecmascript)");
}),
"[project]/components/reports/DataTable.tsx [app-client] (ecmascript) <export default as DataTable>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DataTable",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DataTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DataTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/DataTable.tsx [app-client] (ecmascript)");
}),
"[project]/components/reports/DateRangePicker.tsx [app-client] (ecmascript) <export default as DateRangePicker>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DateRangePicker",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DateRangePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DateRangePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/DateRangePicker.tsx [app-client] (ecmascript)");
}),
"[project]/components/reports/ExportActions.tsx [app-client] (ecmascript) <export default as ExportActions>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExportActions",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ExportActions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ExportActions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/ExportActions.tsx [app-client] (ecmascript)");
}),
"[project]/components/reports/ChartPlaceholder.tsx [app-client] (ecmascript) <export default as ChartPlaceholder>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChartPlaceholder",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ChartPlaceholder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ChartPlaceholder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/ChartPlaceholder.tsx [app-client] (ecmascript)");
}),
"[project]/lib/formatters.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Shared formatting utilities
__turbopack_context__.s([
    "formatCurrency",
    ()=>formatCurrency,
    "formatDate",
    ()=>formatDate,
    "formatNumber",
    ()=>formatNumber,
    "formatPercent",
    ()=>formatPercent,
    "formatWeight",
    ()=>formatWeight,
    "getFormatIcon",
    ()=>getFormatIcon,
    "getFrequencyColor",
    ()=>getFrequencyColor,
    "getMarginStatus",
    ()=>getMarginStatus,
    "getStatusColor",
    ()=>getStatusColor,
    "getStockStatus",
    ()=>getStockStatus
]);
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(value);
}
function formatNumber(value) {
    return new Intl.NumberFormat('en-US').format(value);
}
function formatPercent(value, decimals = 1) {
    return `${value.toFixed(decimals)}%`;
}
function formatDate(date, options) {
    const defaultOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    return new Date(date).toLocaleDateString('en-US', options || defaultOptions);
}
function formatWeight(lbs, decimals = 1) {
    return `${lbs.toFixed(decimals)} lbs`;
}
function getStatusColor(status) {
    switch(status){
        case 'success':
            return 'bg-emerald-500/20 text-emerald-400';
        case 'warning':
            return 'bg-amber-500/20 text-amber-400';
        case 'error':
            return 'bg-red-500/20 text-red-400';
        case 'info':
            return 'bg-blue-500/20 text-blue-400';
        case 'neutral':
        default:
            return 'bg-slate-500/20 text-slate-400';
    }
}
function getMarginStatus(margin) {
    if (margin >= 40) return 'success';
    if (margin >= 25) return 'warning';
    return 'error';
}
function getStockStatus(status) {
    switch(status){
        case 'healthy':
            return 'success';
        case 'low':
            return 'warning';
        case 'out':
            return 'error';
        case 'overstock':
            return 'info';
        default:
            return 'neutral';
    }
}
function getFrequencyColor(frequency) {
    switch(frequency){
        case 'daily':
            return 'bg-emerald-500/20 text-emerald-400';
        case 'weekly':
            return 'bg-blue-500/20 text-blue-400';
        case 'monthly':
            return 'bg-purple-500/20 text-purple-400';
        default:
            return 'bg-slate-500/20 text-slate-400';
    }
}
function getFormatIcon(format) {
    switch(format){
        case 'pdf':
            return 'fa-file-pdf text-red-400';
        case 'xlsx':
            return 'fa-file-excel text-green-400';
        case 'csv':
            return 'fa-file-csv text-blue-400';
        case 'json':
            return 'fa-file-code text-amber-400';
        default:
            return 'fa-file text-slate-400';
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/reports/salesData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Sales report mock data
__turbopack_context__.s([
    "channelBreakdown",
    ()=>channelBreakdown,
    "dailySales",
    ()=>dailySales,
    "salesMetrics",
    ()=>salesMetrics,
    "salesTabs",
    ()=>salesTabs,
    "topCustomers",
    ()=>topCustomers,
    "topProducts",
    ()=>topProducts
]);
const salesMetrics = {
    totalRevenue: 156780.00,
    totalOrders: 1245,
    avgOrderValue: 125.93,
    grossProfit: 62712.00,
    grossMargin: 40.0,
    refunds: 3420.00,
    netRevenue: 153360.00
};
const dailySales = [
    {
        date: '2024-12-28',
        orders: 52,
        revenue: 6240.00,
        profit: 2496.00
    },
    {
        date: '2024-12-27',
        orders: 48,
        revenue: 5760.00,
        profit: 2304.00
    },
    {
        date: '2024-12-26',
        orders: 45,
        revenue: 5400.00,
        profit: 2160.00
    },
    {
        date: '2024-12-25',
        orders: 28,
        revenue: 3360.00,
        profit: 1344.00
    },
    {
        date: '2024-12-24',
        orders: 62,
        revenue: 7440.00,
        profit: 2976.00
    },
    {
        date: '2024-12-23',
        orders: 55,
        revenue: 6600.00,
        profit: 2640.00
    },
    {
        date: '2024-12-22',
        orders: 50,
        revenue: 6000.00,
        profit: 2400.00
    }
];
const channelBreakdown = [
    {
        channel: 'Shopify',
        orders: 520,
        revenue: 62400.00,
        profit: 24960.00,
        share: 39.8
    },
    {
        channel: 'Amazon FBA',
        orders: 380,
        revenue: 45600.00,
        profit: 13680.00,
        share: 29.1
    },
    {
        channel: 'Amazon FBM',
        orders: 180,
        revenue: 21600.00,
        profit: 7560.00,
        share: 13.8
    },
    {
        channel: 'Direct',
        orders: 165,
        revenue: 27180.00,
        profit: 16512.00,
        share: 17.3
    }
];
const topProducts = [
    {
        name: 'CalMag Plus 1L',
        sku: 'CM-1000',
        unitsSold: 245,
        revenue: 12250.00,
        profit: 4900.00
    },
    {
        name: 'Bloom Booster 500ml',
        sku: 'BB-500',
        unitsSold: 198,
        revenue: 9900.00,
        profit: 3960.00
    },
    {
        name: 'Grow Formula 1L',
        sku: 'GF-1000',
        unitsSold: 156,
        revenue: 7800.00,
        profit: 3120.00
    },
    {
        name: 'Root Enhancer 250ml',
        sku: 'RE-250',
        unitsSold: 142,
        revenue: 5680.00,
        profit: 2272.00
    },
    {
        name: 'Micro Nutrients 500ml',
        sku: 'MN-500',
        unitsSold: 128,
        revenue: 6400.00,
        profit: 2560.00
    }
];
const topCustomers = [
    {
        name: 'Green Thumb Gardens',
        orders: 24,
        revenue: 4800.00,
        avgOrder: 200.00
    },
    {
        name: 'Hydro Supply Co',
        orders: 18,
        revenue: 3600.00,
        avgOrder: 200.00
    },
    {
        name: 'Urban Farmers LLC',
        orders: 15,
        revenue: 2850.00,
        avgOrder: 190.00
    },
    {
        name: 'Grow Tech Inc',
        orders: 12,
        revenue: 2400.00,
        avgOrder: 200.00
    },
    {
        name: 'Plant Paradise',
        orders: 10,
        revenue: 1800.00,
        avgOrder: 180.00
    }
];
const salesTabs = [
    {
        id: 'overview',
        label: 'Overview',
        icon: 'fa-chart-pie'
    },
    {
        id: 'daily',
        label: 'Daily Sales',
        icon: 'fa-calendar-day'
    },
    {
        id: 'channel',
        label: 'By Channel',
        icon: 'fa-store'
    },
    {
        id: 'product',
        label: 'By Product',
        icon: 'fa-box'
    },
    {
        id: 'customer',
        label: 'By Customer',
        icon: 'fa-users'
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/reports/inventoryData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Inventory report mock data
__turbopack_context__.s([
    "agingReport",
    ()=>agingReport,
    "inventoryMetrics",
    ()=>inventoryMetrics,
    "inventoryTabs",
    ()=>inventoryTabs,
    "locationSummary",
    ()=>locationSummary,
    "stockLevels",
    ()=>stockLevels
]);
const inventoryMetrics = {
    totalSKUs: 156,
    totalUnits: 24580,
    totalValue: 245800.00,
    lowStock: 12,
    outOfStock: 3,
    overstock: 8,
    turnoverRate: 4.2,
    avgDaysOnHand: 87
};
const stockLevels = [
    {
        sku: 'CM-1000',
        name: 'CalMag Plus 1L',
        location: 'A1-01',
        quantity: 450,
        reserved: 25,
        reorderPoint: 100,
        status: 'healthy'
    },
    {
        sku: 'BB-500',
        name: 'Bloom Booster 500ml',
        location: 'A1-02',
        quantity: 380,
        reserved: 15,
        reorderPoint: 80,
        status: 'healthy'
    },
    {
        sku: 'GF-1000',
        name: 'Grow Formula 1L',
        location: 'A2-01',
        quantity: 85,
        reserved: 10,
        reorderPoint: 100,
        status: 'low'
    },
    {
        sku: 'RE-250',
        name: 'Root Enhancer 250ml',
        location: 'A2-02',
        quantity: 0,
        reserved: 0,
        reorderPoint: 50,
        status: 'out'
    },
    {
        sku: 'MN-500',
        name: 'Micro Nutrients 500ml',
        location: 'B1-01',
        quantity: 520,
        reserved: 8,
        reorderPoint: 60,
        status: 'overstock'
    },
    {
        sku: 'PK-1000',
        name: 'PK Booster 1L',
        location: 'B1-02',
        quantity: 42,
        reserved: 5,
        reorderPoint: 50,
        status: 'low'
    },
    {
        sku: 'FS-500',
        name: 'Fish Emulsion 500ml',
        location: 'B2-01',
        quantity: 180,
        reserved: 12,
        reorderPoint: 40,
        status: 'healthy'
    }
];
const agingReport = [
    {
        range: '0-30 days',
        units: 8500,
        value: 85000.00,
        percentage: 34.6
    },
    {
        range: '31-60 days',
        units: 6200,
        value: 62000.00,
        percentage: 25.2
    },
    {
        range: '61-90 days',
        units: 4800,
        value: 48000.00,
        percentage: 19.5
    },
    {
        range: '91-180 days',
        units: 3500,
        value: 35000.00,
        percentage: 14.2
    },
    {
        range: '180+ days',
        units: 1580,
        value: 15800.00,
        percentage: 6.5
    }
];
const locationSummary = [
    {
        location: 'Warehouse A',
        skus: 85,
        units: 12500,
        value: 125000.00
    },
    {
        location: 'Warehouse B',
        skus: 45,
        units: 8200,
        value: 82000.00
    },
    {
        location: 'FBA Inventory',
        skus: 26,
        units: 3880,
        value: 38800.00
    }
];
const inventoryTabs = [
    {
        id: 'overview',
        label: 'Overview',
        icon: 'fa-chart-pie'
    },
    {
        id: 'levels',
        label: 'Stock Levels',
        icon: 'fa-boxes'
    },
    {
        id: 'aging',
        label: 'Aging Report',
        icon: 'fa-clock'
    },
    {
        id: 'location',
        label: 'By Location',
        icon: 'fa-warehouse'
    },
    {
        id: 'movement',
        label: 'Movement',
        icon: 'fa-arrow-right-arrow-left'
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/reports/scheduledData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Scheduled reports mock data
__turbopack_context__.s([
    "recentDeliveries",
    ()=>recentDeliveries,
    "scheduledReports",
    ()=>scheduledReports
]);
const scheduledReports = [
    {
        id: '1',
        name: 'Daily Sales Summary',
        reportType: 'Sales',
        frequency: 'daily',
        nextRun: '2024-12-29 06:00 AM',
        lastRun: '2024-12-28 06:00 AM',
        recipients: [
            'team@company.com',
            'manager@company.com'
        ],
        format: 'pdf',
        status: 'active'
    },
    {
        id: '2',
        name: 'Weekly Inventory Status',
        reportType: 'Inventory',
        frequency: 'weekly',
        nextRun: '2025-01-01 08:00 AM',
        lastRun: '2024-12-25 08:00 AM',
        recipients: [
            'warehouse@company.com'
        ],
        format: 'xlsx',
        status: 'active'
    },
    {
        id: '3',
        name: 'Monthly P&L Statement',
        reportType: 'Financial',
        frequency: 'monthly',
        nextRun: '2025-01-01 09:00 AM',
        lastRun: '2024-12-01 09:00 AM',
        recipients: [
            'accounting@company.com',
            'cfo@company.com'
        ],
        format: 'pdf',
        status: 'active'
    },
    {
        id: '4',
        name: 'Weekly Shipping Analysis',
        reportType: 'Shipping',
        frequency: 'weekly',
        nextRun: '2025-01-01 07:00 AM',
        lastRun: '2024-12-25 07:00 AM',
        recipients: [
            'logistics@company.com'
        ],
        format: 'csv',
        status: 'active'
    },
    {
        id: '5',
        name: 'Daily Low Stock Alert',
        reportType: 'Inventory',
        frequency: 'daily',
        nextRun: '2024-12-29 07:00 AM',
        lastRun: '2024-12-28 07:00 AM',
        recipients: [
            'purchasing@company.com'
        ],
        format: 'xlsx',
        status: 'active'
    },
    {
        id: '6',
        name: 'Monthly Marketing Performance',
        reportType: 'Marketing',
        frequency: 'monthly',
        nextRun: '2025-01-01 10:00 AM',
        lastRun: '2024-12-01 10:00 AM',
        recipients: [
            'marketing@company.com'
        ],
        format: 'pdf',
        status: 'paused'
    }
];
const recentDeliveries = [
    {
        report: 'Daily Sales Summary',
        date: '2024-12-28 06:00 AM',
        recipients: 2,
        status: 'delivered'
    },
    {
        report: 'Daily Low Stock Alert',
        date: '2024-12-28 07:00 AM',
        recipients: 1,
        status: 'delivered'
    },
    {
        report: 'Weekly Inventory Status',
        date: '2024-12-25 08:00 AM',
        recipients: 1,
        status: 'delivered'
    },
    {
        report: 'Weekly Shipping Analysis',
        date: '2024-12-25 07:00 AM',
        recipients: 1,
        status: 'failed'
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/reports/customBuilderData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Custom report builder configuration data
__turbopack_context__.s([
    "columnsBySource",
    ()=>columnsBySource,
    "dataSources",
    ()=>dataSources,
    "groupByOptions",
    ()=>groupByOptions,
    "savedTemplates",
    ()=>savedTemplates
]);
const dataSources = [
    {
        id: 'orders',
        name: 'Orders',
        description: 'Sales orders and transactions',
        icon: 'fa-shopping-cart'
    },
    {
        id: 'products',
        name: 'Products',
        description: 'Product catalog and details',
        icon: 'fa-box'
    },
    {
        id: 'shipments',
        name: 'Shipments',
        description: 'Shipping and delivery data',
        icon: 'fa-truck'
    },
    {
        id: 'inventory',
        name: 'Inventory',
        description: 'Stock levels and movements',
        icon: 'fa-warehouse'
    },
    {
        id: 'returns',
        name: 'Returns',
        description: 'Return requests and refunds',
        icon: 'fa-rotate-left'
    },
    {
        id: 'customers',
        name: 'Customers',
        description: 'Customer information',
        icon: 'fa-users'
    }
];
const columnsBySource = {
    orders: [
        {
            id: 'orderNumber',
            name: 'Order Number',
            type: 'string'
        },
        {
            id: 'customerName',
            name: 'Customer Name',
            type: 'string'
        },
        {
            id: 'channel',
            name: 'Sales Channel',
            type: 'string'
        },
        {
            id: 'status',
            name: 'Status',
            type: 'string'
        },
        {
            id: 'total',
            name: 'Order Total',
            type: 'currency'
        },
        {
            id: 'cogs',
            name: 'COGS',
            type: 'currency'
        },
        {
            id: 'profit',
            name: 'Profit',
            type: 'currency'
        },
        {
            id: 'margin',
            name: 'Margin',
            type: 'percent'
        },
        {
            id: 'shipping',
            name: 'Shipping Charged',
            type: 'currency'
        },
        {
            id: 'items',
            name: 'Item Count',
            type: 'number'
        },
        {
            id: 'createdAt',
            name: 'Order Date',
            type: 'date'
        }
    ],
    products: [
        {
            id: 'sku',
            name: 'SKU',
            type: 'string'
        },
        {
            id: 'name',
            name: 'Product Name',
            type: 'string'
        },
        {
            id: 'brand',
            name: 'Brand',
            type: 'string'
        },
        {
            id: 'category',
            name: 'Category',
            type: 'string'
        },
        {
            id: 'price',
            name: 'Price',
            type: 'currency'
        },
        {
            id: 'cost',
            name: 'Cost',
            type: 'currency'
        },
        {
            id: 'margin',
            name: 'Margin',
            type: 'percent'
        },
        {
            id: 'weight',
            name: 'Weight',
            type: 'number'
        },
        {
            id: 'status',
            name: 'Status',
            type: 'string'
        }
    ],
    shipments: [
        {
            id: 'trackingNumber',
            name: 'Tracking Number',
            type: 'string'
        },
        {
            id: 'carrier',
            name: 'Carrier',
            type: 'string'
        },
        {
            id: 'service',
            name: 'Service',
            type: 'string'
        },
        {
            id: 'status',
            name: 'Status',
            type: 'string'
        },
        {
            id: 'customerPaid',
            name: 'Customer Paid',
            type: 'currency'
        },
        {
            id: 'actualCost',
            name: 'Actual Cost',
            type: 'currency'
        },
        {
            id: 'profit',
            name: 'Shipping Profit',
            type: 'currency'
        },
        {
            id: 'weight',
            name: 'Weight',
            type: 'number'
        },
        {
            id: 'shippedAt',
            name: 'Ship Date',
            type: 'date'
        }
    ],
    inventory: [
        {
            id: 'sku',
            name: 'SKU',
            type: 'string'
        },
        {
            id: 'productName',
            name: 'Product Name',
            type: 'string'
        },
        {
            id: 'location',
            name: 'Location',
            type: 'string'
        },
        {
            id: 'quantity',
            name: 'Quantity',
            type: 'number'
        },
        {
            id: 'reserved',
            name: 'Reserved',
            type: 'number'
        },
        {
            id: 'available',
            name: 'Available',
            type: 'number'
        },
        {
            id: 'reorderPoint',
            name: 'Reorder Point',
            type: 'number'
        },
        {
            id: 'unitCost',
            name: 'Unit Cost',
            type: 'currency'
        },
        {
            id: 'totalValue',
            name: 'Total Value',
            type: 'currency'
        }
    ],
    returns: [
        {
            id: 'returnId',
            name: 'Return ID',
            type: 'string'
        },
        {
            id: 'orderNumber',
            name: 'Order Number',
            type: 'string'
        },
        {
            id: 'customerName',
            name: 'Customer Name',
            type: 'string'
        },
        {
            id: 'reason',
            name: 'Return Reason',
            type: 'string'
        },
        {
            id: 'status',
            name: 'Status',
            type: 'string'
        },
        {
            id: 'refundAmount',
            name: 'Refund Amount',
            type: 'currency'
        },
        {
            id: 'restockFee',
            name: 'Restock Fee',
            type: 'currency'
        },
        {
            id: 'createdAt',
            name: 'Return Date',
            type: 'date'
        }
    ],
    customers: [
        {
            id: 'name',
            name: 'Customer Name',
            type: 'string'
        },
        {
            id: 'email',
            name: 'Email',
            type: 'string'
        },
        {
            id: 'phone',
            name: 'Phone',
            type: 'string'
        },
        {
            id: 'totalOrders',
            name: 'Total Orders',
            type: 'number'
        },
        {
            id: 'totalSpent',
            name: 'Total Spent',
            type: 'currency'
        },
        {
            id: 'avgOrderValue',
            name: 'Avg Order Value',
            type: 'currency'
        },
        {
            id: 'firstOrderDate',
            name: 'First Order',
            type: 'date'
        },
        {
            id: 'lastOrderDate',
            name: 'Last Order',
            type: 'date'
        }
    ]
};
const groupByOptions = {
    orders: [
        'channel',
        'status',
        'createdAt'
    ],
    products: [
        'brand',
        'category',
        'status'
    ],
    shipments: [
        'carrier',
        'service',
        'status'
    ],
    inventory: [
        'location'
    ],
    returns: [
        'reason',
        'status'
    ],
    customers: []
};
const savedTemplates = [
    {
        name: 'Weekly Sales Summary',
        source: 'orders',
        columns: 5
    },
    {
        name: 'Low Stock Alert',
        source: 'inventory',
        columns: 6
    },
    {
        name: 'Shipping Cost Analysis',
        source: 'shipments',
        columns: 7
    },
    {
        name: 'Customer Lifetime Value',
        source: 'customers',
        columns: 4
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/reports/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// Re-export all report data
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$salesData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/reports/salesData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$inventoryData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/reports/inventoryData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$scheduledData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/reports/scheduledData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$customBuilderData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/reports/customBuilderData.ts [app-client] (ecmascript)");
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/reports/inventory/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InventoryReportsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/reports/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ReportPageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ReportPageHeader$3e$__ = __turbopack_context__.i("[project]/components/reports/ReportPageHeader.tsx [app-client] (ecmascript) <export default as ReportPageHeader>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MetricCard$3e$__ = __turbopack_context__.i("[project]/components/reports/MetricCard.tsx [app-client] (ecmascript) <export default as MetricCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/MetricCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ReportTabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ReportTabs$3e$__ = __turbopack_context__.i("[project]/components/reports/ReportTabs.tsx [app-client] (ecmascript) <export default as ReportTabs>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DataTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DataTable$3e$__ = __turbopack_context__.i("[project]/components/reports/DataTable.tsx [app-client] (ecmascript) <export default as DataTable>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DataTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/DataTable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DateRangePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DateRangePicker$3e$__ = __turbopack_context__.i("[project]/components/reports/DateRangePicker.tsx [app-client] (ecmascript) <export default as DateRangePicker>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ExportActions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExportActions$3e$__ = __turbopack_context__.i("[project]/components/reports/ExportActions.tsx [app-client] (ecmascript) <export default as ExportActions>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ChartPlaceholder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartPlaceholder$3e$__ = __turbopack_context__.i("[project]/components/reports/ChartPlaceholder.tsx [app-client] (ecmascript) <export default as ChartPlaceholder>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/formatters.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/data/reports/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$inventoryData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/reports/inventoryData.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function InventoryReportsPage() {
    _s();
    const [dateRange, setDateRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('current');
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('overview');
    const handleExport = (format)=>{
        alert(`Exporting Inventory Report as ${format.toUpperCase()}`);
    };
    const healthyCount = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$inventoryData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inventoryMetrics"].totalSKUs - __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$inventoryData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inventoryMetrics"].lowStock - __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$inventoryData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inventoryMetrics"].outOfStock - __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$inventoryData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inventoryMetrics"].overstock;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ReportPageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ReportPageHeader$3e$__["ReportPageHeader"], {
                title: "Inventory Reports",
                description: "Stock levels, movement, valuation, and forecasting",
                icon: "fa-boxes-stacked",
                iconColor: "blue",
                breadcrumbs: [
                    {
                        label: 'Reports',
                        href: '/reports'
                    },
                    {
                        label: 'Inventory Reports'
                    }
                ],
                actions: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DateRangePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DateRangePicker$3e$__["DateRangePicker"], {
                            value: dateRange,
                            onChange: setDateRange,
                            options: [
                                {
                                    value: 'current',
                                    label: 'Current Snapshot'
                                },
                                {
                                    value: '7d',
                                    label: 'Last 7 Days'
                                },
                                {
                                    value: '30d',
                                    label: 'Last 30 Days'
                                },
                                {
                                    value: '90d',
                                    label: 'Last 90 Days'
                                }
                            ]
                        }, void 0, false, {
                            fileName: "[project]/app/reports/inventory/page.tsx",
                            lineNumber: 49,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ExportActions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExportActions$3e$__["ExportActions"], {
                            onExport: handleExport
                        }, void 0, false, {
                            fileName: "[project]/app/reports/inventory/page.tsx",
                            lineNumber: 59,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/app/reports/inventory/page.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ReportTabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ReportTabs$3e$__["ReportTabs"], {
                tabs: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$inventoryData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inventoryTabs"],
                activeTab: activeTab,
                onTabChange: (id)=>setActiveTab(id),
                accentColor: "blue"
            }, void 0, false, {
                fileName: "[project]/app/reports/inventory/page.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            activeTab === 'overview' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MetricCardGrid"], {
                        columns: 4,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MetricCard$3e$__["MetricCard"], {
                                label: "Total SKUs",
                                value: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$inventoryData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inventoryMetrics"].totalSKUs,
                                subtext: "Active products"
                            }, void 0, false, {
                                fileName: "[project]/app/reports/inventory/page.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MetricCard$3e$__["MetricCard"], {
                                label: "Total Units",
                                value: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$inventoryData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inventoryMetrics"].totalUnits.toLocaleString(),
                                subtext: "In stock"
                            }, void 0, false, {
                                fileName: "[project]/app/reports/inventory/page.tsx",
                                lineNumber: 76,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MetricCard$3e$__["MetricCard"], {
                                label: "Inventory Value",
                                value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$inventoryData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inventoryMetrics"].totalValue),
                                subtext: "At cost",
                                variant: "info"
                            }, void 0, false, {
                                fileName: "[project]/app/reports/inventory/page.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MetricCard$3e$__["MetricCard"], {
                                label: "Turnover Rate",
                                value: `${__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$inventoryData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inventoryMetrics"].turnoverRate}x`,
                                subtext: "Annual average"
                            }, void 0, false, {
                                fileName: "[project]/app/reports/inventory/page.tsx",
                                lineNumber: 78,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/reports/inventory/page.tsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MetricCardGrid"], {
                        columns: 4,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-emerald-500/10 backdrop-blur border border-emerald-500/30 rounded-xl p-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "fas fa-check text-emerald-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/reports/inventory/page.tsx",
                                                lineNumber: 85,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/reports/inventory/page.tsx",
                                            lineNumber: 84,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-2xl font-bold text-white",
                                                    children: healthyCount
                                                }, void 0, false, {
                                                    fileName: "[project]/app/reports/inventory/page.tsx",
                                                    lineNumber: 88,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-slate-400",
                                                    children: "Healthy Stock"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/reports/inventory/page.tsx",
                                                    lineNumber: 89,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/reports/inventory/page.tsx",
                                            lineNumber: 87,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/reports/inventory/page.tsx",
                                    lineNumber: 83,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/reports/inventory/page.tsx",
                                lineNumber: 82,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-amber-500/10 backdrop-blur border border-amber-500/30 rounded-xl p-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "fas fa-exclamation-triangle text-amber-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/reports/inventory/page.tsx",
                                                lineNumber: 96,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/reports/inventory/page.tsx",
                                            lineNumber: 95,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-2xl font-bold text-white",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$inventoryData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inventoryMetrics"].lowStock
                                                }, void 0, false, {
                                                    fileName: "[project]/app/reports/inventory/page.tsx",
                                                    lineNumber: 99,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-slate-400",
                                                    children: "Low Stock"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/reports/inventory/page.tsx",
                                                    lineNumber: 100,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/reports/inventory/page.tsx",
                                            lineNumber: 98,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/reports/inventory/page.tsx",
                                    lineNumber: 94,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/reports/inventory/page.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-red-500/10 backdrop-blur border border-red-500/30 rounded-xl p-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "fas fa-times text-red-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/reports/inventory/page.tsx",
                                                lineNumber: 107,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/reports/inventory/page.tsx",
                                            lineNumber: 106,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-2xl font-bold text-white",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$inventoryData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inventoryMetrics"].outOfStock
                                                }, void 0, false, {
                                                    fileName: "[project]/app/reports/inventory/page.tsx",
                                                    lineNumber: 110,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-slate-400",
                                                    children: "Out of Stock"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/reports/inventory/page.tsx",
                                                    lineNumber: 111,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/reports/inventory/page.tsx",
                                            lineNumber: 109,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/reports/inventory/page.tsx",
                                    lineNumber: 105,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/reports/inventory/page.tsx",
                                lineNumber: 104,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-blue-500/10 backdrop-blur border border-blue-500/30 rounded-xl p-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "fas fa-boxes-packing text-blue-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/reports/inventory/page.tsx",
                                                lineNumber: 118,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/reports/inventory/page.tsx",
                                            lineNumber: 117,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-2xl font-bold text-white",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$inventoryData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inventoryMetrics"].overstock
                                                }, void 0, false, {
                                                    fileName: "[project]/app/reports/inventory/page.tsx",
                                                    lineNumber: 121,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-slate-400",
                                                    children: "Overstock"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/reports/inventory/page.tsx",
                                                    lineNumber: 122,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/reports/inventory/page.tsx",
                                            lineNumber: 120,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/reports/inventory/page.tsx",
                                    lineNumber: 116,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/reports/inventory/page.tsx",
                                lineNumber: 115,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/reports/inventory/page.tsx",
                        lineNumber: 81,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ChartPlaceholder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartPlaceholder$3e$__["ChartPlaceholder"], {
                                title: "Inventory Value Trend",
                                type: "line"
                            }, void 0, false, {
                                fileName: "[project]/app/reports/inventory/page.tsx",
                                lineNumber: 129,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ChartPlaceholder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartPlaceholder$3e$__["ChartPlaceholder"], {
                                title: "Stock Status Distribution",
                                type: "pie"
                            }, void 0, false, {
                                fileName: "[project]/app/reports/inventory/page.tsx",
                                lineNumber: 130,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/reports/inventory/page.tsx",
                        lineNumber: 128,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/reports/inventory/page.tsx",
                lineNumber: 73,
                columnNumber: 9
            }, this),
            activeTab === 'levels' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DataTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DataTable$3e$__["DataTable"], {
                title: "Stock Levels by SKU",
                headerActions: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded",
                            children: "Healthy"
                        }, void 0, false, {
                            fileName: "[project]/app/reports/inventory/page.tsx",
                            lineNumber: 141,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs px-2 py-1 bg-amber-500/20 text-amber-400 rounded",
                            children: "Low"
                        }, void 0, false, {
                            fileName: "[project]/app/reports/inventory/page.tsx",
                            lineNumber: 142,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded",
                            children: "Out"
                        }, void 0, false, {
                            fileName: "[project]/app/reports/inventory/page.tsx",
                            lineNumber: 143,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded",
                            children: "Overstock"
                        }, void 0, false, {
                            fileName: "[project]/app/reports/inventory/page.tsx",
                            lineNumber: 144,
                            columnNumber: 15
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/reports/inventory/page.tsx",
                    lineNumber: 140,
                    columnNumber: 13
                }, void 0),
                columns: [
                    {
                        key: 'name',
                        header: 'Product',
                        render: (v, row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-white font-medium",
                                        children: v
                                    }, void 0, false, {
                                        fileName: "[project]/app/reports/inventory/page.tsx",
                                        lineNumber: 153,
                                        columnNumber: 19
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-slate-400",
                                        children: row.sku
                                    }, void 0, false, {
                                        fileName: "[project]/app/reports/inventory/page.tsx",
                                        lineNumber: 154,
                                        columnNumber: 19
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/reports/inventory/page.tsx",
                                lineNumber: 152,
                                columnNumber: 17
                            }, void 0)
                    },
                    {
                        key: 'location',
                        header: 'Location',
                        render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-300",
                                children: v
                            }, void 0, false, {
                                fileName: "[project]/app/reports/inventory/page.tsx",
                                lineNumber: 158,
                                columnNumber: 67
                            }, void 0)
                    },
                    {
                        key: 'quantity',
                        header: 'Quantity',
                        align: 'right',
                        render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white",
                                children: v
                            }, void 0, false, {
                                fileName: "[project]/app/reports/inventory/page.tsx",
                                lineNumber: 159,
                                columnNumber: 83
                            }, void 0)
                    },
                    {
                        key: 'reserved',
                        header: 'Reserved',
                        align: 'right',
                        render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-400",
                                children: v
                            }, void 0, false, {
                                fileName: "[project]/app/reports/inventory/page.tsx",
                                lineNumber: 160,
                                columnNumber: 83
                            }, void 0)
                    },
                    {
                        key: 'available',
                        header: 'Available',
                        align: 'right',
                        render: (_, row)=>{
                            const r = row;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white font-medium",
                                children: r.quantity - r.reserved
                            }, void 0, false, {
                                fileName: "[project]/app/reports/inventory/page.tsx",
                                lineNumber: 167,
                                columnNumber: 24
                            }, void 0);
                        }
                    },
                    {
                        key: 'reorderPoint',
                        header: 'Reorder Point',
                        align: 'right',
                        render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-400",
                                children: v
                            }, void 0, false, {
                                fileName: "[project]/app/reports/inventory/page.tsx",
                                lineNumber: 170,
                                columnNumber: 92
                            }, void 0)
                    },
                    {
                        key: 'status',
                        header: 'Status',
                        render: (v)=>{
                            const status = v;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DataTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                status: status === 'out' ? 'Out of Stock' : status,
                                variant: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStockStatus"])(status)
                            }, void 0, false, {
                                fileName: "[project]/app/reports/inventory/page.tsx",
                                lineNumber: 177,
                                columnNumber: 19
                            }, void 0);
                        }
                    }
                ],
                data: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$inventoryData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stockLevels"],
                getRowKey: (row)=>row.sku
            }, void 0, false, {
                fileName: "[project]/app/reports/inventory/page.tsx",
                lineNumber: 137,
                columnNumber: 9
            }, this),
            activeTab === 'aging' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DataTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DataTable$3e$__["DataTable"], {
                        title: "Inventory Aging Report",
                        subtitle: "Distribution of inventory by age",
                        columns: [
                            {
                                key: 'range',
                                header: 'Age Range',
                                render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white font-medium",
                                        children: v
                                    }, void 0, false, {
                                        fileName: "[project]/app/reports/inventory/page.tsx",
                                        lineNumber: 197,
                                        columnNumber: 67
                                    }, void 0)
                            },
                            {
                                key: 'units',
                                header: 'Units',
                                align: 'right',
                                render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white",
                                        children: v.toLocaleString()
                                    }, void 0, false, {
                                        fileName: "[project]/app/reports/inventory/page.tsx",
                                        lineNumber: 198,
                                        columnNumber: 79
                                    }, void 0)
                            },
                            {
                                key: 'value',
                                header: 'Value',
                                align: 'right',
                                render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(v)
                                    }, void 0, false, {
                                        fileName: "[project]/app/reports/inventory/page.tsx",
                                        lineNumber: 199,
                                        columnNumber: 79
                                    }, void 0)
                            },
                            {
                                key: 'percentage',
                                header: '% of Total',
                                align: 'right',
                                render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-300",
                                        children: [
                                            v,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/reports/inventory/page.tsx",
                                        lineNumber: 200,
                                        columnNumber: 89
                                    }, void 0)
                            },
                            {
                                key: 'distribution',
                                header: 'Distribution',
                                render: (_, row)=>{
                                    const r = row;
                                    const color = r.range === '0-30 days' ? 'bg-emerald-500' : r.range === '31-60 days' ? 'bg-blue-500' : r.range === '61-90 days' ? 'bg-amber-500' : 'bg-red-500';
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full bg-slate-700 rounded-full h-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `h-2 rounded-full ${color}`,
                                            style: {
                                                width: `${r.percentage}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/reports/inventory/page.tsx",
                                            lineNumber: 211,
                                            columnNumber: 23
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/app/reports/inventory/page.tsx",
                                        lineNumber: 210,
                                        columnNumber: 21
                                    }, void 0);
                                }
                            }
                        ],
                        data: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$inventoryData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["agingReport"],
                        getRowKey: (row)=>row.range
                    }, void 0, false, {
                        fileName: "[project]/app/reports/inventory/page.tsx",
                        lineNumber: 193,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: "fas fa-exclamation-triangle text-amber-400 mt-0.5"
                                }, void 0, false, {
                                    fileName: "[project]/app/reports/inventory/page.tsx",
                                    lineNumber: 223,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm font-medium text-white",
                                            children: "Aging Inventory Alert"
                                        }, void 0, false, {
                                            fileName: "[project]/app/reports/inventory/page.tsx",
                                            lineNumber: 225,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-slate-400 mt-1",
                                            children: [
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(15800),
                                                " worth of inventory (",
                                                __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$inventoryData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["agingReport"][4].units.toLocaleString(),
                                                " units) is over 180 days old. Consider running promotions or liquidation to reduce carrying costs."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/reports/inventory/page.tsx",
                                            lineNumber: 226,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/reports/inventory/page.tsx",
                                    lineNumber: 224,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/reports/inventory/page.tsx",
                            lineNumber: 222,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/reports/inventory/page.tsx",
                        lineNumber: 221,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/reports/inventory/page.tsx",
                lineNumber: 192,
                columnNumber: 9
            }, this),
            activeTab === 'location' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MetricCardGrid"], {
                        columns: 3,
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$inventoryData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["locationSummary"].map((loc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "fas fa-warehouse text-purple-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/reports/inventory/page.tsx",
                                                    lineNumber: 243,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/reports/inventory/page.tsx",
                                                lineNumber: 242,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-white font-medium",
                                                children: loc.location
                                            }, void 0, false, {
                                                fileName: "[project]/app/reports/inventory/page.tsx",
                                                lineNumber: 245,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/reports/inventory/page.tsx",
                                        lineNumber: 241,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-3 gap-3 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-lg font-bold text-white",
                                                        children: loc.skus
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/reports/inventory/page.tsx",
                                                        lineNumber: 249,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-slate-400",
                                                        children: "SKUs"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/reports/inventory/page.tsx",
                                                        lineNumber: 250,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/reports/inventory/page.tsx",
                                                lineNumber: 248,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-lg font-bold text-white",
                                                        children: loc.units.toLocaleString()
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/reports/inventory/page.tsx",
                                                        lineNumber: 253,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-slate-400",
                                                        children: "Units"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/reports/inventory/page.tsx",
                                                        lineNumber: 254,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/reports/inventory/page.tsx",
                                                lineNumber: 252,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-lg font-bold text-blue-400",
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(loc.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/reports/inventory/page.tsx",
                                                        lineNumber: 257,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-slate-400",
                                                        children: "Value"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/reports/inventory/page.tsx",
                                                        lineNumber: 258,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/reports/inventory/page.tsx",
                                                lineNumber: 256,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/reports/inventory/page.tsx",
                                        lineNumber: 247,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, loc.location, true, {
                                fileName: "[project]/app/reports/inventory/page.tsx",
                                lineNumber: 240,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/reports/inventory/page.tsx",
                        lineNumber: 238,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DataTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DataTable$3e$__["DataTable"], {
                        title: "Location Summary",
                        columns: [
                            {
                                key: 'location',
                                header: 'Location',
                                render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white font-medium",
                                        children: v
                                    }, void 0, false, {
                                        fileName: "[project]/app/reports/inventory/page.tsx",
                                        lineNumber: 268,
                                        columnNumber: 69
                                    }, void 0)
                            },
                            {
                                key: 'skus',
                                header: 'SKUs',
                                align: 'right',
                                render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white",
                                        children: v
                                    }, void 0, false, {
                                        fileName: "[project]/app/reports/inventory/page.tsx",
                                        lineNumber: 269,
                                        columnNumber: 77
                                    }, void 0)
                            },
                            {
                                key: 'units',
                                header: 'Units',
                                align: 'right',
                                render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white",
                                        children: v.toLocaleString()
                                    }, void 0, false, {
                                        fileName: "[project]/app/reports/inventory/page.tsx",
                                        lineNumber: 270,
                                        columnNumber: 79
                                    }, void 0)
                            },
                            {
                                key: 'value',
                                header: 'Value',
                                align: 'right',
                                render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-blue-400",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(v)
                                    }, void 0, false, {
                                        fileName: "[project]/app/reports/inventory/page.tsx",
                                        lineNumber: 271,
                                        columnNumber: 79
                                    }, void 0)
                            },
                            {
                                key: 'percentage',
                                header: '% of Total',
                                align: 'right',
                                render: (_, row)=>{
                                    const r = row;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-300",
                                        children: [
                                            (r.value / __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$inventoryData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inventoryMetrics"].totalValue * 100).toFixed(1),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/reports/inventory/page.tsx",
                                        lineNumber: 278,
                                        columnNumber: 26
                                    }, void 0);
                                }
                            }
                        ],
                        data: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$inventoryData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["locationSummary"],
                        getRowKey: (row)=>row.location,
                        footer: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "p-4 text-white font-semibold",
                                    children: "Total"
                                }, void 0, false, {
                                    fileName: "[project]/app/reports/inventory/page.tsx",
                                    lineNumber: 286,
                                    columnNumber: 17
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "p-4 text-right text-white font-semibold",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$inventoryData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inventoryMetrics"].totalSKUs
                                }, void 0, false, {
                                    fileName: "[project]/app/reports/inventory/page.tsx",
                                    lineNumber: 287,
                                    columnNumber: 17
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "p-4 text-right text-white font-semibold",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$inventoryData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inventoryMetrics"].totalUnits.toLocaleString()
                                }, void 0, false, {
                                    fileName: "[project]/app/reports/inventory/page.tsx",
                                    lineNumber: 288,
                                    columnNumber: 17
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "p-4 text-right text-blue-400 font-semibold",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$inventoryData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inventoryMetrics"].totalValue)
                                }, void 0, false, {
                                    fileName: "[project]/app/reports/inventory/page.tsx",
                                    lineNumber: 289,
                                    columnNumber: 17
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "p-4 text-right text-slate-300",
                                    children: "100%"
                                }, void 0, false, {
                                    fileName: "[project]/app/reports/inventory/page.tsx",
                                    lineNumber: 290,
                                    columnNumber: 17
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/reports/inventory/page.tsx",
                            lineNumber: 285,
                            columnNumber: 15
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/app/reports/inventory/page.tsx",
                        lineNumber: 265,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/reports/inventory/page.tsx",
                lineNumber: 237,
                columnNumber: 9
            }, this),
            activeTab === 'movement' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MetricCardGrid"], {
                        columns: 4,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MetricCard$3e$__["MetricCard"], {
                                label: "Received",
                                value: "+2,450 units",
                                subtext: "This period",
                                variant: "success"
                            }, void 0, false, {
                                fileName: "[project]/app/reports/inventory/page.tsx",
                                lineNumber: 301,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MetricCard$3e$__["MetricCard"], {
                                label: "Shipped",
                                value: "-1,890 units",
                                subtext: "This period",
                                variant: "error"
                            }, void 0, false, {
                                fileName: "[project]/app/reports/inventory/page.tsx",
                                lineNumber: 302,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MetricCard$3e$__["MetricCard"], {
                                label: "Adjustments",
                                value: "-45 units",
                                subtext: "This period",
                                variant: "warning"
                            }, void 0, false, {
                                fileName: "[project]/app/reports/inventory/page.tsx",
                                lineNumber: 303,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MetricCard$3e$__["MetricCard"], {
                                label: "Net Change",
                                value: "+515 units",
                                subtext: "This period",
                                variant: "info"
                            }, void 0, false, {
                                fileName: "[project]/app/reports/inventory/page.tsx",
                                lineNumber: 304,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/reports/inventory/page.tsx",
                        lineNumber: 300,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ChartPlaceholder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartPlaceholder$3e$__["ChartPlaceholder"], {
                        title: "Movement History",
                        type: "bar",
                        height: "h-48"
                    }, void 0, false, {
                        fileName: "[project]/app/reports/inventory/page.tsx",
                        lineNumber: 307,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/reports/inventory/page.tsx",
                lineNumber: 299,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/reports/inventory/page.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_s(InventoryReportsPage, "2+cY9m/pbG3oXcZyQQT/7ygISxA=");
_c = InventoryReportsPage;
var _c;
__turbopack_context__.k.register(_c, "InventoryReportsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_3d34e03d._.js.map