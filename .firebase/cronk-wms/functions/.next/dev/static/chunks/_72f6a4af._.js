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
"[project]/app/(dashboard)/reports/shipping/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ShippingReportsPage
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/formatters.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const shippingMetrics = {
    totalShipments: 1245,
    onTimeDelivery: 96.2,
    avgDeliveryDays: 3.4,
    totalShippingCost: 8960.00,
    totalShippingRevenue: 12450.00,
    shippingProfit: 3490.00,
    avgCostPerShipment: 7.20
};
const carrierPerformance = [
    {
        carrier: 'USPS',
        shipments: 680,
        onTime: 97.2,
        avgDays: 3.2,
        cost: 4080.00,
        revenue: 5440.00,
        profit: 1360.00
    },
    {
        carrier: 'UPS',
        shipments: 320,
        onTime: 98.1,
        avgDays: 2.8,
        cost: 2880.00,
        revenue: 4160.00,
        profit: 1280.00
    },
    {
        carrier: 'FedEx',
        shipments: 180,
        onTime: 95.6,
        avgDays: 2.5,
        cost: 1620.00,
        revenue: 2340.00,
        profit: 720.00
    },
    {
        carrier: 'DHL',
        shipments: 65,
        onTime: 92.3,
        avgDays: 4.2,
        cost: 380.00,
        revenue: 510.00,
        profit: 130.00
    }
];
const serviceBreakdown = [
    {
        service: 'Ground',
        shipments: 780,
        avgDays: 4.5,
        cost: 3900.00,
        percentage: 62.7
    },
    {
        service: 'Priority',
        shipments: 320,
        avgDays: 2.5,
        cost: 2880.00,
        percentage: 25.7
    },
    {
        service: 'Express',
        shipments: 105,
        avgDays: 1.2,
        cost: 1680.00,
        percentage: 8.4
    },
    {
        service: 'Overnight',
        shipments: 40,
        avgDays: 1.0,
        cost: 500.00,
        percentage: 3.2
    }
];
const deliveryTimes = [
    {
        range: '1 day',
        count: 85,
        percentage: 6.8
    },
    {
        range: '2 days',
        count: 245,
        percentage: 19.7
    },
    {
        range: '3 days',
        count: 520,
        percentage: 41.8
    },
    {
        range: '4 days',
        count: 280,
        percentage: 22.5
    },
    {
        range: '5+ days',
        count: 115,
        percentage: 9.2
    }
];
const recentIssues = [
    {
        tracking: '1Z999AA10123456784',
        carrier: 'UPS',
        issue: 'Delivery Exception',
        status: 'Investigating',
        date: '2024-12-28'
    },
    {
        tracking: '9400111899223100000000',
        carrier: 'USPS',
        issue: 'Address Not Found',
        status: 'Customer Contacted',
        date: '2024-12-27'
    },
    {
        tracking: '784644954892',
        carrier: 'FedEx',
        issue: 'Package Damaged',
        status: 'Claim Filed',
        date: '2024-12-27'
    }
];
const tabs = [
    {
        id: 'overview',
        label: 'Overview',
        icon: 'fa-chart-pie'
    },
    {
        id: 'carrier',
        label: 'By Carrier',
        icon: 'fa-building'
    },
    {
        id: 'service',
        label: 'By Service',
        icon: 'fa-layer-group'
    },
    {
        id: 'delivery',
        label: 'Delivery Times',
        icon: 'fa-clock'
    },
    {
        id: 'issues',
        label: 'Issues',
        icon: 'fa-exclamation-triangle'
    }
];
function ShippingReportsPage() {
    _s();
    const [dateRange, setDateRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('30d');
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('overview');
    const handleExport = (format)=>{
        alert(`Exporting Shipping Report as ${format.toUpperCase()}`);
    };
    const getCarrierColor = (carrier)=>{
        switch(carrier){
            case 'USPS':
                return 'bg-blue-500/20 text-blue-400';
            case 'UPS':
                return 'bg-amber-500/20 text-amber-400';
            case 'FedEx':
                return 'bg-purple-500/20 text-purple-400';
            default:
                return 'bg-red-500/20 text-red-400';
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ReportPageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ReportPageHeader$3e$__["ReportPageHeader"], {
                title: "Shipping Reports",
                description: "Fulfillment metrics, carrier performance, and costs",
                icon: "fa-truck-fast",
                iconColor: "purple",
                breadcrumbs: [
                    {
                        label: 'Reports',
                        href: '/reports'
                    },
                    {
                        label: 'Shipping Reports'
                    }
                ],
                actions: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DateRangePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DateRangePicker$3e$__["DateRangePicker"], {
                            value: dateRange,
                            onChange: setDateRange
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                            lineNumber: 94,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ExportActions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExportActions$3e$__["ExportActions"], {
                            onExport: handleExport
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                            lineNumber: 95,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ReportTabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ReportTabs$3e$__["ReportTabs"], {
                tabs: tabs,
                activeTab: activeTab,
                onTabChange: (id)=>setActiveTab(id),
                accentColor: "purple"
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            activeTab === 'overview' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MetricCardGrid"], {
                        columns: 4,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MetricCard$3e$__["MetricCard"], {
                                label: "Total Shipments",
                                value: shippingMetrics.totalShipments.toLocaleString(),
                                trend: {
                                    value: 8.3,
                                    direction: 'up'
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                lineNumber: 110,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MetricCard$3e$__["MetricCard"], {
                                label: "On-Time Delivery",
                                value: `${shippingMetrics.onTimeDelivery}%`,
                                subtext: "Target: 95%",
                                variant: "success"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                lineNumber: 111,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MetricCard$3e$__["MetricCard"], {
                                label: "Avg Delivery Time",
                                value: `${shippingMetrics.avgDeliveryDays} days`,
                                subtext: "Door to door"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                lineNumber: 112,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MetricCard$3e$__["MetricCard"], {
                                label: "Shipping Profit",
                                value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(shippingMetrics.shippingProfit),
                                subtext: `${(shippingMetrics.shippingProfit / shippingMetrics.totalShippingRevenue * 100).toFixed(1)}% margin`,
                                variant: "info"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                lineNumber: 113,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                        lineNumber: 109,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MetricCardGrid"], {
                        columns: 3,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MetricCard$3e$__["MetricCard"], {
                                label: "Shipping Revenue",
                                value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(shippingMetrics.totalShippingRevenue)
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                lineNumber: 122,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MetricCard$3e$__["MetricCard"], {
                                label: "Shipping Cost",
                                value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(shippingMetrics.totalShippingCost),
                                variant: "error"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                lineNumber: 123,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MetricCard$3e$__["MetricCard"], {
                                label: "Avg Cost/Shipment",
                                value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(shippingMetrics.avgCostPerShipment)
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                lineNumber: 124,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                        lineNumber: 121,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                lineNumber: 108,
                columnNumber: 9
            }, this),
            activeTab === 'carrier' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MetricCardGrid"], {
                        columns: 4,
                        children: carrierPerformance.map((carrier)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `w-10 h-10 rounded-lg flex items-center justify-center ${getCarrierColor(carrier.carrier)}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "fas fa-truck"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                                    lineNumber: 136,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                                lineNumber: 135,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-white font-medium",
                                                children: carrier.carrier
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                                lineNumber: 138,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                        lineNumber: 134,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-slate-400",
                                                        children: "Shipments"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                                        lineNumber: 142,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white",
                                                        children: carrier.shipments
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                                        lineNumber: 143,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                                lineNumber: 141,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-slate-400",
                                                        children: "On-Time"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                                        lineNumber: 146,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: carrier.onTime >= 96 ? 'text-emerald-400' : 'text-amber-400',
                                                        children: [
                                                            carrier.onTime,
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                                        lineNumber: 147,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                                lineNumber: 145,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-slate-400",
                                                        children: "Avg Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                                        lineNumber: 150,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white",
                                                        children: carrier.avgDays
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                                        lineNumber: 151,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                                lineNumber: 149,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-slate-400",
                                                        children: "Profit"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                                        lineNumber: 154,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-emerald-400",
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(carrier.profit)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                                        lineNumber: 155,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                                lineNumber: 153,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                        lineNumber: 140,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, carrier.carrier, true, {
                                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                lineNumber: 133,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                        lineNumber: 131,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DataTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DataTable$3e$__["DataTable"], {
                        columns: [
                            {
                                key: 'carrier',
                                header: 'Carrier',
                                render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white font-medium",
                                        children: v
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                        lineNumber: 164,
                                        columnNumber: 67
                                    }, void 0)
                            },
                            {
                                key: 'shipments',
                                header: 'Shipments',
                                align: 'right',
                                render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white",
                                        children: v
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                        lineNumber: 165,
                                        columnNumber: 87
                                    }, void 0)
                            },
                            {
                                key: 'onTime',
                                header: 'On-Time %',
                                align: 'right',
                                render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DataTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                        status: `${v}%`,
                                        variant: v >= 96 ? 'success' : 'warning'
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                        lineNumber: 170,
                                        columnNumber: 32
                                    }, void 0)
                            },
                            {
                                key: 'avgDays',
                                header: 'Avg Days',
                                align: 'right',
                                render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-300",
                                        children: [
                                            v,
                                            " days"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                        lineNumber: 172,
                                        columnNumber: 84
                                    }, void 0)
                            },
                            {
                                key: 'cost',
                                header: 'Cost',
                                align: 'right',
                                render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-300",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(v)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                        lineNumber: 173,
                                        columnNumber: 77
                                    }, void 0)
                            },
                            {
                                key: 'revenue',
                                header: 'Revenue',
                                align: 'right',
                                render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(v)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                        lineNumber: 174,
                                        columnNumber: 83
                                    }, void 0)
                            },
                            {
                                key: 'profit',
                                header: 'Profit',
                                align: 'right',
                                render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-emerald-400",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(v)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                        lineNumber: 175,
                                        columnNumber: 81
                                    }, void 0)
                            }
                        ],
                        data: carrierPerformance,
                        getRowKey: (row)=>row.carrier
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                        lineNumber: 162,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                lineNumber: 130,
                columnNumber: 9
            }, this),
            activeTab === 'service' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DataTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DataTable$3e$__["DataTable"], {
                title: "Service Level Breakdown",
                columns: [
                    {
                        key: 'service',
                        header: 'Service Level',
                        render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white font-medium",
                                children: v
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                lineNumber: 187,
                                columnNumber: 71
                            }, void 0)
                    },
                    {
                        key: 'shipments',
                        header: 'Shipments',
                        align: 'right',
                        render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white",
                                children: v
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                lineNumber: 188,
                                columnNumber: 85
                            }, void 0)
                    },
                    {
                        key: 'avgDays',
                        header: 'Avg Delivery',
                        align: 'right',
                        render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-300",
                                children: [
                                    v,
                                    " days"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                lineNumber: 189,
                                columnNumber: 86
                            }, void 0)
                    },
                    {
                        key: 'cost',
                        header: 'Total Cost',
                        align: 'right',
                        render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(v)
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                lineNumber: 190,
                                columnNumber: 81
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
                                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                lineNumber: 191,
                                columnNumber: 87
                            }, void 0)
                    },
                    {
                        key: 'distribution',
                        header: 'Distribution',
                        render: (_, row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full bg-slate-700 rounded-full h-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-2 rounded-full bg-purple-500",
                                    style: {
                                        width: `${row.percentage}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                    lineNumber: 197,
                                    columnNumber: 19
                                }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                lineNumber: 196,
                                columnNumber: 17
                            }, void 0)
                    }
                ],
                data: serviceBreakdown,
                getRowKey: (row)=>row.service
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                lineNumber: 184,
                columnNumber: 9
            }, this),
            activeTab === 'delivery' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DataTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DataTable$3e$__["DataTable"], {
                title: "Delivery Time Distribution",
                columns: [
                    {
                        key: 'range',
                        header: 'Delivery Time',
                        render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white font-medium",
                                children: v
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                lineNumber: 211,
                                columnNumber: 69
                            }, void 0)
                    },
                    {
                        key: 'count',
                        header: 'Shipments',
                        align: 'right',
                        render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white",
                                children: v
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                lineNumber: 212,
                                columnNumber: 81
                            }, void 0)
                    },
                    {
                        key: 'percentage',
                        header: 'Percentage',
                        align: 'right',
                        render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-300",
                                children: [
                                    v,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                lineNumber: 213,
                                columnNumber: 87
                            }, void 0)
                    },
                    {
                        key: 'distribution',
                        header: 'Distribution',
                        render: (_, row)=>{
                            const r = row;
                            const color = r.range === '1 day' ? 'bg-emerald-500' : r.range === '2 days' ? 'bg-blue-500' : r.range === '3 days' ? 'bg-purple-500' : r.range === '4 days' ? 'bg-amber-500' : 'bg-red-500';
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full bg-slate-700 rounded-full h-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `h-3 rounded-full ${color}`,
                                    style: {
                                        width: `${r.percentage}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                    lineNumber: 225,
                                    columnNumber: 21
                                }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                lineNumber: 224,
                                columnNumber: 19
                            }, void 0);
                        }
                    }
                ],
                data: deliveryTimes,
                getRowKey: (row)=>row.range
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                lineNumber: 208,
                columnNumber: 9
            }, this),
            activeTab === 'issues' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MetricCardGrid"], {
                        columns: 3,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MetricCard$3e$__["MetricCard"], {
                                label: "Active Issues",
                                value: 3,
                                variant: "error"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                lineNumber: 239,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MetricCard$3e$__["MetricCard"], {
                                label: "In Progress",
                                value: 2,
                                variant: "warning"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                lineNumber: 240,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MetricCard$3e$__["MetricCard"], {
                                label: "Resolved This Month",
                                value: 18,
                                variant: "success"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                lineNumber: 241,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                        lineNumber: 238,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DataTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DataTable$3e$__["DataTable"], {
                        title: "Recent Issues",
                        columns: [
                            {
                                key: 'tracking',
                                header: 'Tracking',
                                render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white font-mono text-sm",
                                        children: v
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                        lineNumber: 247,
                                        columnNumber: 69
                                    }, void 0)
                            },
                            {
                                key: 'carrier',
                                header: 'Carrier',
                                render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-300",
                                        children: v
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                        lineNumber: 248,
                                        columnNumber: 67
                                    }, void 0)
                            },
                            {
                                key: 'issue',
                                header: 'Issue',
                                render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white",
                                        children: v
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                        lineNumber: 249,
                                        columnNumber: 63
                                    }, void 0)
                            },
                            {
                                key: 'status',
                                header: 'Status',
                                render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DataTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                        status: v,
                                        variant: "warning"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                        lineNumber: 250,
                                        columnNumber: 65
                                    }, void 0)
                            },
                            {
                                key: 'date',
                                header: 'Date',
                                render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-400",
                                        children: v
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                                        lineNumber: 251,
                                        columnNumber: 61
                                    }, void 0)
                            }
                        ],
                        data: recentIssues,
                        getRowKey: (_, i)=>`issue-${i}`
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                        lineNumber: 244,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
                lineNumber: 237,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(dashboard)/reports/shipping/page.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, this);
}
_s(ShippingReportsPage, "gjM+BBINDKWN9RfeqwpreWLHd7A=");
_c = ShippingReportsPage;
var _c;
__turbopack_context__.k.register(_c, "ShippingReportsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_72f6a4af._.js.map