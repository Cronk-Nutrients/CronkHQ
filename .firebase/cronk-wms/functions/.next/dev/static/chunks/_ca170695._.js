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
"[project]/components/reports/DateRangePicker.tsx [app-client] (ecmascript) <export default as DateRangePicker>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DateRangePicker",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DateRangePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DateRangePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/DateRangePicker.tsx [app-client] (ecmascript)");
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
"[project]/app/(dashboard)/reports/custom/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CustomReportBuilderPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/reports/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ReportPageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ReportPageHeader$3e$__ = __turbopack_context__.i("[project]/components/reports/ReportPageHeader.tsx [app-client] (ecmascript) <export default as ReportPageHeader>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DateRangePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DateRangePicker$3e$__ = __turbopack_context__.i("[project]/components/reports/DateRangePicker.tsx [app-client] (ecmascript) <export default as DateRangePicker>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ChartPlaceholder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/ChartPlaceholder.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/data/reports/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$customBuilderData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/reports/customBuilderData.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function CustomReportBuilderPage() {
    _s();
    const [reportName, setReportName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedSource, setSelectedSource] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedColumns, setSelectedColumns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [groupBy, setGroupBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [dateRange, setDateRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('30d');
    const [exportFormat, setExportFormat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('csv');
    const availableColumns = selectedSource ? __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$customBuilderData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["columnsBySource"][selectedSource] : [];
    const toggleColumn = (columnId)=>{
        setSelectedColumns((prev)=>prev.includes(columnId) ? prev.filter((id)=>id !== columnId) : [
                ...prev,
                columnId
            ]);
    };
    const addFilter = ()=>{
        if (!selectedSource || availableColumns.length === 0) return;
        setFilters([
            ...filters,
            {
                id: Date.now().toString(),
                column: availableColumns[0].id,
                operator: 'equals',
                value: ''
            }
        ]);
    };
    const updateFilter = (id, field, value)=>{
        setFilters(filters.map((f)=>f.id === id ? {
                ...f,
                [field]: value
            } : f));
    };
    const removeFilter = (id)=>{
        setFilters(filters.filter((f)=>f.id !== id));
    };
    const handleGenerateReport = ()=>{
        alert(`Generating ${reportName || 'Custom Report'} with ${selectedColumns.length} columns from ${selectedSource}`);
    };
    const handleSaveTemplate = ()=>{
        alert('Report template saved!');
    };
    const getColumnTypeColor = (type)=>{
        switch(type){
            case 'currency':
                return 'bg-emerald-500/20 text-emerald-400';
            case 'number':
                return 'bg-blue-500/20 text-blue-400';
            case 'date':
                return 'bg-purple-500/20 text-purple-400';
            case 'percent':
                return 'bg-amber-500/20 text-amber-400';
            default:
                return 'bg-slate-700 text-slate-400';
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ReportPageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ReportPageHeader$3e$__["ReportPageHeader"], {
                title: "Custom Report Builder",
                description: "Build custom reports with your own columns, filters, and groupings",
                icon: "fa-wand-magic-sparkles",
                iconColor: "purple",
                breadcrumbs: [
                    {
                        label: 'Reports',
                        href: '/reports'
                    },
                    {
                        label: 'Custom Report Builder'
                    }
                ],
                actions: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSaveTemplate,
                            className: "px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-sm transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: "fas fa-save mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                    lineNumber: 89,
                                    columnNumber: 15
                                }, void 0),
                                "Save Template"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                            lineNumber: 85,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleGenerateReport,
                            disabled: !selectedSource || selectedColumns.length === 0,
                            className: "px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg text-sm transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: "fas fa-play mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                    lineNumber: 97,
                                    columnNumber: 15
                                }, void 0),
                                "Generate Report"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                            lineNumber: 92,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-sm text-slate-400 mb-2",
                        children: "Report Name"
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: reportName,
                        onChange: (e)=>setReportName(e.target.value),
                        placeholder: "Enter report name...",
                        className: "w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-3 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-1 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ChartPlaceholder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SummaryCard"], {
                                title: "",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-white font-semibold mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "fas fa-database mr-2 text-emerald-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                lineNumber: 121,
                                                columnNumber: 15
                                            }, this),
                                            "Data Source"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                        lineNumber: 120,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$customBuilderData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataSources"].map((source)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setSelectedSource(source.id);
                                                    setSelectedColumns([]);
                                                    setFilters([]);
                                                    setGroupBy('');
                                                },
                                                className: `w-full text-left p-3 rounded-lg transition-all ${selectedSource === source.id ? 'bg-emerald-500/20 border border-emerald-500/50' : 'bg-slate-800/50 border border-slate-700 hover:border-slate-600'}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `w-8 h-8 rounded-lg flex items-center justify-center ${selectedSource === source.id ? 'bg-emerald-500/30 text-emerald-400' : 'bg-slate-700 text-slate-400'}`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                className: `fas ${source.icon}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                                lineNumber: 144,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                            lineNumber: 141,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: selectedSource === source.id ? 'text-emerald-400 font-medium' : 'text-white',
                                                                    children: source.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                                    lineNumber: 147,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs text-slate-400",
                                                                    children: source.description
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                                    lineNumber: 150,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                            lineNumber: 146,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                    lineNumber: 140,
                                                    columnNumber: 19
                                                }, this)
                                            }, source.id, false, {
                                                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                lineNumber: 126,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                        lineNumber: 124,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ChartPlaceholder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SummaryCard"], {
                                title: "",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-white font-semibold mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "fas fa-calendar mr-2 text-blue-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                lineNumber: 161,
                                                columnNumber: 15
                                            }, this),
                                            "Date Range"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                        lineNumber: 160,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DateRangePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DateRangePicker$3e$__["DateRangePicker"], {
                                        value: dateRange,
                                        onChange: setDateRange,
                                        options: [
                                            {
                                                value: 'today',
                                                label: 'Today'
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
                                            },
                                            {
                                                value: 'ytd',
                                                label: 'Year to Date'
                                            },
                                            {
                                                value: 'all',
                                                label: 'All Time'
                                            }
                                        ],
                                        className: "w-full"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                        lineNumber: 164,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ChartPlaceholder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SummaryCard"], {
                                title: "",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-white font-semibold mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "fas fa-download mr-2 text-purple-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                lineNumber: 182,
                                                columnNumber: 15
                                            }, this),
                                            "Export Format"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                        lineNumber: 181,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            'csv',
                                            'xlsx',
                                            'pdf'
                                        ].map((format)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setExportFormat(format),
                                                className: `flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${exportFormat === format ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'}`,
                                                children: format.toUpperCase()
                                            }, format, false, {
                                                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                lineNumber: 187,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                        lineNumber: 185,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ChartPlaceholder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SummaryCard"], {
                            title: "",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-white font-semibold mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: "fas fa-columns mr-2 text-amber-400"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                            lineNumber: 207,
                                            columnNumber: 15
                                        }, this),
                                        "Columns",
                                        selectedColumns.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-2 px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded-full",
                                            children: [
                                                selectedColumns.length,
                                                " selected"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                            lineNumber: 210,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                    lineNumber: 206,
                                    columnNumber: 13
                                }, this),
                                selectedSource ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2 max-h-[400px] overflow-y-auto",
                                    children: availableColumns.map((column)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: `flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${selectedColumns.includes(column.id) ? 'bg-amber-500/10' : 'hover:bg-slate-800'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: selectedColumns.includes(column.id),
                                                    onChange: ()=>toggleColumn(column.id),
                                                    className: "w-4 h-4 rounded bg-slate-700 border-slate-600 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                    lineNumber: 224,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-white text-sm",
                                                        children: column.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                        lineNumber: 231,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                    lineNumber: 230,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `text-xs px-2 py-0.5 rounded ${getColumnTypeColor(column.type)}`,
                                                    children: column.type
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                    lineNumber: 233,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, column.id, true, {
                                            fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                            lineNumber: 218,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                    lineNumber: 216,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center py-8 text-slate-400",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: "fas fa-hand-pointer text-2xl mb-2"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                            lineNumber: 241,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm",
                                            children: "Select a data source first"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                            lineNumber: 242,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                    lineNumber: 240,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                            lineNumber: 205,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-1 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ChartPlaceholder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SummaryCard"], {
                                title: "",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-white font-semibold",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "fas fa-filter mr-2 text-cyan-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                        lineNumber: 254,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Filters"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                lineNumber: 253,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: addFilter,
                                                disabled: !selectedSource,
                                                className: "px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg text-sm disabled:opacity-50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "fas fa-plus mr-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                        lineNumber: 262,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Add"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                lineNumber: 257,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                        lineNumber: 252,
                                        columnNumber: 13
                                    }, this),
                                    filters.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: filters.map((filter)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-slate-800 rounded-lg p-3 space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                value: filter.column,
                                                                onChange: (e)=>updateFilter(filter.id, 'column', e.target.value),
                                                                className: "flex-1 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white text-sm focus:outline-none",
                                                                children: availableColumns.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: col.id,
                                                                        children: col.name
                                                                    }, col.id, false, {
                                                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                                        lineNumber: 277,
                                                                        columnNumber: 27
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                                lineNumber: 271,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>removeFilter(filter.id),
                                                                className: "p-1 text-slate-400 hover:text-red-400",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "fas fa-times"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                                    lineNumber: 284,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                                lineNumber: 280,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                        lineNumber: 270,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                value: filter.operator,
                                                                onChange: (e)=>updateFilter(filter.id, 'operator', e.target.value),
                                                                className: "bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white text-sm focus:outline-none",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "equals",
                                                                        children: "equals"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                                        lineNumber: 293,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "contains",
                                                                        children: "contains"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                                        lineNumber: 294,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "greater_than",
                                                                        children: "greater than"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                                        lineNumber: 295,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "less_than",
                                                                        children: "less than"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                                        lineNumber: 296,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                                lineNumber: 288,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                value: filter.value,
                                                                onChange: (e)=>updateFilter(filter.id, 'value', e.target.value),
                                                                placeholder: "Value...",
                                                                className: "flex-1 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white text-sm placeholder-slate-500 focus:outline-none"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                                lineNumber: 298,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                        lineNumber: 287,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, filter.id, true, {
                                                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                lineNumber: 269,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                        lineNumber: 267,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center py-4 text-slate-400 text-sm",
                                        children: "No filters applied"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                        lineNumber: 310,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                lineNumber: 251,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ChartPlaceholder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SummaryCard"], {
                                title: "",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-white font-semibold mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "fas fa-layer-group mr-2 text-pink-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                lineNumber: 319,
                                                columnNumber: 15
                                            }, this),
                                            "Group By"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                        lineNumber: 318,
                                        columnNumber: 13
                                    }, this),
                                    selectedSource && __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$customBuilderData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupByOptions"][selectedSource].length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: groupBy,
                                        onChange: (e)=>setGroupBy(e.target.value),
                                        className: "w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "No grouping"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                lineNumber: 328,
                                                columnNumber: 17
                                            }, this),
                                            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$customBuilderData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupByOptions"][selectedSource].map((option)=>{
                                                const column = availableColumns.find((c)=>c.id === option);
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: option,
                                                    children: column?.name || option
                                                }, option, false, {
                                                    fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                    lineNumber: 332,
                                                    columnNumber: 21
                                                }, this);
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                        lineNumber: 323,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center py-4 text-slate-400 text-sm",
                                        children: selectedSource ? 'No grouping options available' : 'Select a data source first'
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                        lineNumber: 339,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                lineNumber: 317,
                                columnNumber: 11
                            }, this),
                            groupBy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ChartPlaceholder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SummaryCard"], {
                                title: "",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-white font-semibold mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "fas fa-calculator mr-2 text-orange-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                lineNumber: 349,
                                                columnNumber: 17
                                            }, this),
                                            "Aggregations"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                        lineNumber: 348,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            'Sum',
                                            'Average',
                                            'Count',
                                            'Min',
                                            'Max'
                                        ].map((agg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "flex items-center gap-2 text-sm text-slate-300 cursor-pointer",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        className: "w-4 h-4 rounded bg-slate-700 border-slate-600 text-emerald-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                        lineNumber: 355,
                                                        columnNumber: 21
                                                    }, this),
                                                    agg
                                                ]
                                            }, agg, true, {
                                                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                lineNumber: 354,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                        lineNumber: 352,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                lineNumber: 347,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                        lineNumber: 249,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            selectedSource && selectedColumns.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 border-b border-slate-700 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-white font-semibold",
                                        children: "Preview"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                        lineNumber: 373,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-400",
                                        children: "Sample data based on your selections"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                        lineNumber: 374,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                lineNumber: 372,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-slate-500",
                                children: "Showing sample rows"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                lineNumber: 376,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                        lineNumber: 371,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-b border-slate-700 text-left",
                                        children: selectedColumns.map((colId)=>{
                                            const column = availableColumns.find((c)=>c.id === colId);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-3 text-slate-400 font-medium text-sm",
                                                children: column?.name
                                            }, colId, false, {
                                                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                lineNumber: 385,
                                                columnNumber: 23
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                        lineNumber: 381,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                    lineNumber: 380,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "divide-y divide-slate-700/50",
                                    children: [
                                        1,
                                        2,
                                        3
                                    ].map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "hover:bg-slate-800/30",
                                            children: selectedColumns.map((colId)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-3 text-slate-300 text-sm",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-4 bg-slate-700/50 rounded w-20 animate-pulse"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                        lineNumber: 397,
                                                        columnNumber: 25
                                                    }, this)
                                                }, colId, false, {
                                                    fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                                    lineNumber: 396,
                                                    columnNumber: 23
                                                }, this))
                                        }, row, false, {
                                            fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                            lineNumber: 394,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                    lineNumber: 392,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                            lineNumber: 379,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                        lineNumber: 378,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                lineNumber: 370,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ChartPlaceholder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SummaryCard"], {
                title: "",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-white font-semibold mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-bookmark mr-2 text-emerald-400"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                lineNumber: 411,
                                columnNumber: 11
                            }, this),
                            "Saved Templates"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                        lineNumber: 410,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-4 gap-3",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$customBuilderData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["savedTemplates"].map((template, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-left transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-white text-sm font-medium mb-1",
                                        children: template.name
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                        lineNumber: 420,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-slate-400",
                                        children: [
                                            template.source,
                                            " • ",
                                            template.columns,
                                            " columns"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                        lineNumber: 421,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                                lineNumber: 416,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                        lineNumber: 414,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
                lineNumber: 409,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(dashboard)/reports/custom/page.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
_s(CustomReportBuilderPage, "0oGsKPvDfnX1oOl8WHAIO5duSNk=");
_c = CustomReportBuilderPage;
var _c;
__turbopack_context__.k.register(_c, "CustomReportBuilderPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_ca170695._.js.map