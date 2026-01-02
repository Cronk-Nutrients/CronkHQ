module.exports = [
"[project]/components/reports/ReportPageHeader.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ReportPageHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 text-sm text-slate-400 mb-2",
                children: breadcrumbs.map((crumb, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-2",
                        children: [
                            index > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-chevron-right text-xs"
                            }, void 0, false, {
                                fileName: "[project]/components/reports/ReportPageHeader.tsx",
                                lineNumber: 42,
                                columnNumber: 27
                            }, this),
                            crumb.href ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: crumb.href,
                                className: "hover:text-white",
                                children: crumb.label
                            }, void 0, false, {
                                fileName: "[project]/components/reports/ReportPageHeader.tsx",
                                lineNumber: 44,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `w-12 h-12 rounded-xl flex items-center justify-center ${iconColorClasses[iconColor] || iconColorClasses.emerald}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-2xl font-bold text-white",
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/components/reports/ReportPageHeader.tsx",
                                        lineNumber: 59,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                    actions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
}),
"[project]/components/reports/MetricCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MetricCardGrid",
    ()=>MetricCardGrid,
    "default",
    ()=>MetricCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `backdrop-blur border rounded-xl p-5 ${variantClasses[variant]} ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 text-sm text-slate-400 mb-1",
                children: [
                    icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `text-2xl font-bold ${valueColorClasses[variant]}`,
                children: value
            }, void 0, false, {
                fileName: "[project]/components/reports/MetricCard.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            (subtext || trend) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs mt-1 flex items-center gap-2",
                children: [
                    trend && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: trendColors[trend.direction],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
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
                    subtext && !trend && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
function MetricCardGrid({ children, columns = 4 }) {
    const colClasses = {
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `grid ${colClasses[columns]} gap-4`,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/reports/MetricCard.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/reports/ReportTabs.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ReportTabs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2 border-b border-slate-700 pb-4",
        children: tabs.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onTabChange(tab.id),
                className: `flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === tab.id ? activeClasses[accentColor] : 'text-slate-400 hover:text-white hover:bg-slate-800'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
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
}),
"[project]/components/reports/DataTable.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MarginBadge",
    ()=>MarginBadge,
    "StatusBadge",
    ()=>StatusBadge,
    "default",
    ()=>DataTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
function DataTable({ columns, data, title, subtitle, headerActions, footer, emptyMessage = 'No data available', emptyIcon = 'fa-inbox', maxHeight, onRowClick, getRowKey }) {
    const alignClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden",
        children: [
            (title || headerActions) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-b border-slate-700 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-white font-semibold",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/reports/DataTable.tsx",
                                lineNumber: 51,
                                columnNumber: 23
                            }, this),
                            subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: maxHeight ? `max-h-[${maxHeight}] overflow-y-auto` : '',
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: maxHeight ? 'sticky top-0 bg-slate-800/90 backdrop-blur' : '',
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "border-b border-slate-700 text-left",
                                children: columns.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            className: "divide-y divide-slate-700/50",
                            children: data.length > 0 ? data.map((row, rowIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: `hover:bg-slate-800/30 ${onRowClick ? 'cursor-pointer' : ''}`,
                                    onClick: ()=>onRowClick?.(row, rowIndex),
                                    children: columns.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
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
                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    colSpan: columns.length,
                                    className: "p-8 text-center text-slate-400",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: `fas ${emptyIcon} text-3xl mb-2 opacity-50`
                                        }, void 0, false, {
                                            fileName: "[project]/components/reports/DataTable.tsx",
                                            lineNumber: 95,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                        footer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tfoot", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${variantClasses[variant]}`,
        children: [
            showDot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
function MarginBadge({ margin, thresholds = {
    high: 40,
    medium: 25
} }) {
    const variant = margin >= thresholds.high ? 'success' : margin >= thresholds.medium ? 'warning' : 'error';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusBadge, {
        status: `${margin.toFixed(1)}%`,
        variant: variant
    }, void 0, false, {
        fileName: "[project]/components/reports/DataTable.tsx",
        lineNumber: 163,
        columnNumber: 10
    }, this);
}
}),
"[project]/components/reports/DateRangePicker.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CustomDateRange",
    ()=>CustomDateRange,
    "DateRangeButtons",
    ()=>DateRangeButtons,
    "default",
    ()=>DateRangePicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
        value: value,
        onChange: (e)=>onChange(e.target.value),
        className: `bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-emerald-500 ${className}`,
        children: [
            options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                    value: opt.value,
                    children: opt.label
                }, opt.value, false, {
                    fileName: "[project]/components/reports/DateRangePicker.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this)),
            showCustom && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-1",
        children: options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
function CustomDateRange({ startDate, endDate, onStartChange, onEndChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-4 p-4 bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm text-slate-400",
                        children: "From:"
                    }, void 0, false, {
                        fileName: "[project]/components/reports/DateRangePicker.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm text-slate-400",
                        children: "To:"
                    }, void 0, false, {
                        fileName: "[project]/components/reports/DateRangePicker.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
}),
"[project]/components/reports/ChartPlaceholder.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SummaryCard",
    ()=>SummaryCard,
    "default",
    ()=>ChartPlaceholder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5 ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-white font-semibold mb-4",
                children: title
            }, void 0, false, {
                fileName: "[project]/components/reports/ChartPlaceholder.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${height} flex items-center justify-center border border-slate-700 border-dashed rounded-lg`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center text-slate-400",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: `fas ${icons[type]} text-3xl mb-2`
                        }, void 0, false, {
                            fileName: "[project]/components/reports/ChartPlaceholder.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
function SummaryCard({ title, children, className = '' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5 ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
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
}),
"[project]/components/reports/ExportActions.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ExportActions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
function ExportActions({ onExport, formats = [
    'csv',
    'xlsx',
    'pdf'
], loading = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-lg p-1",
        children: formats.map((format)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onExport(format),
                disabled: loading,
                className: "px-3 py-1.5 hover:bg-slate-700 text-slate-300 hover:text-white rounded text-sm transition-colors disabled:opacity-50",
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
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
}),
"[project]/components/reports/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// Re-export all report components
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ReportPageHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/ReportPageHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/MetricCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ReportTabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/ReportTabs.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DataTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/DataTable.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DateRangePicker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/DateRangePicker.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ChartPlaceholder$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/ChartPlaceholder.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ExportActions$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/ExportActions.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
}),
"[project]/components/reports/ReportPageHeader.tsx [app-ssr] (ecmascript) <export default as ReportPageHeader>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReportPageHeader",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ReportPageHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ReportPageHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/ReportPageHeader.tsx [app-ssr] (ecmascript)");
}),
"[project]/components/reports/MetricCard.tsx [app-ssr] (ecmascript) <export default as MetricCard>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MetricCard",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/MetricCard.tsx [app-ssr] (ecmascript)");
}),
"[project]/components/reports/DataTable.tsx [app-ssr] (ecmascript) <export default as DataTable>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DataTable",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DataTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DataTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/DataTable.tsx [app-ssr] (ecmascript)");
}),
"[project]/lib/formatters.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/data/reports/salesData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/data/reports/inventoryData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/data/reports/scheduledData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/data/reports/customBuilderData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/data/reports/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// Re-export all report data
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$salesData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/reports/salesData.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$inventoryData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/reports/inventoryData.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$scheduledData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/reports/scheduledData.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$customBuilderData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/reports/customBuilderData.ts [app-ssr] (ecmascript)");
;
;
;
;
}),
"[project]/app/reports/scheduled/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ScheduledReportsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/reports/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ReportPageHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ReportPageHeader$3e$__ = __turbopack_context__.i("[project]/components/reports/ReportPageHeader.tsx [app-ssr] (ecmascript) <export default as ReportPageHeader>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MetricCard$3e$__ = __turbopack_context__.i("[project]/components/reports/MetricCard.tsx [app-ssr] (ecmascript) <export default as MetricCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/MetricCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DataTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DataTable$3e$__ = __turbopack_context__.i("[project]/components/reports/DataTable.tsx [app-ssr] (ecmascript) <export default as DataTable>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DataTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/DataTable.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/formatters.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/data/reports/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$scheduledData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/reports/scheduledData.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function ScheduledReportsPage() {
    const [showCreateModal, setShowCreateModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [filterStatus, setFilterStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('all');
    const filteredReports = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$scheduledData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scheduledReports"].filter((report)=>filterStatus === 'all' || report.status === filterStatus);
    const activeCount = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$scheduledData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scheduledReports"].filter((r)=>r.status === 'active').length;
    const pausedCount = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$scheduledData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scheduledReports"].filter((r)=>r.status === 'paused').length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$ReportPageHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ReportPageHeader$3e$__["ReportPageHeader"], {
                title: "Scheduled Reports",
                description: "Automate report generation and delivery",
                icon: "fa-clock",
                iconColor: "purple",
                breadcrumbs: [
                    {
                        label: 'Reports',
                        href: '/reports'
                    },
                    {
                        label: 'Scheduled Reports'
                    }
                ],
                actions: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setShowCreateModal(true),
                    className: "px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm transition-colors",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: "fas fa-plus mr-2"
                        }, void 0, false, {
                            fileName: "[project]/app/reports/scheduled/page.tsx",
                            lineNumber: 43,
                            columnNumber: 13
                        }, void 0),
                        "New Schedule"
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/reports/scheduled/page.tsx",
                    lineNumber: 39,
                    columnNumber: 11
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/app/reports/scheduled/page.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MetricCardGrid"], {
                columns: 4,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MetricCard$3e$__["MetricCard"], {
                        label: "Total Schedules",
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$scheduledData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scheduledReports"].length,
                        icon: "fa-clock"
                    }, void 0, false, {
                        fileName: "[project]/app/reports/scheduled/page.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MetricCard$3e$__["MetricCard"], {
                        label: "Active",
                        value: activeCount,
                        icon: "fa-play",
                        variant: "success"
                    }, void 0, false, {
                        fileName: "[project]/app/reports/scheduled/page.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MetricCard$3e$__["MetricCard"], {
                        label: "Paused",
                        value: pausedCount,
                        icon: "fa-pause",
                        variant: "warning"
                    }, void 0, false, {
                        fileName: "[project]/app/reports/scheduled/page.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$MetricCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MetricCard$3e$__["MetricCard"], {
                        label: "Delivered This Month",
                        value: 142,
                        icon: "fa-paper-plane",
                        variant: "info"
                    }, void 0, false, {
                        fileName: "[project]/app/reports/scheduled/page.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/reports/scheduled/page.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    'all',
                    'active',
                    'paused'
                ].map((status)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFilterStatus(status),
                        className: `px-4 py-2 rounded-lg text-sm transition-colors ${filterStatus === status ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:text-white'}`,
                        children: [
                            status.charAt(0).toUpperCase() + status.slice(1),
                            status === 'all' && ` (${__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$scheduledData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scheduledReports"].length})`,
                            status === 'active' && ` (${activeCount})`,
                            status === 'paused' && ` (${pausedCount})`
                        ]
                    }, status, true, {
                        fileName: "[project]/app/reports/scheduled/page.tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/reports/scheduled/page.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DataTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DataTable$3e$__["DataTable"], {
                columns: [
                    {
                        key: 'name',
                        header: 'Report',
                        render: (v, row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-white font-medium",
                                        children: v
                                    }, void 0, false, {
                                        fileName: "[project]/app/reports/scheduled/page.tsx",
                                        lineNumber: 83,
                                        columnNumber: 17
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-slate-400",
                                        children: row.reportType
                                    }, void 0, false, {
                                        fileName: "[project]/app/reports/scheduled/page.tsx",
                                        lineNumber: 84,
                                        columnNumber: 17
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/reports/scheduled/page.tsx",
                                lineNumber: 82,
                                columnNumber: 15
                            }, void 0)
                    },
                    {
                        key: 'frequency',
                        header: 'Frequency',
                        render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `px-2 py-1 rounded-full text-xs font-medium ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFrequencyColor"])(v)}`,
                                children: v
                            }, void 0, false, {
                                fileName: "[project]/app/reports/scheduled/page.tsx",
                                lineNumber: 92,
                                columnNumber: 15
                            }, void 0)
                    },
                    {
                        key: 'nextRun',
                        header: 'Next Run',
                        render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-300 text-sm",
                                children: v
                            }, void 0, false, {
                                fileName: "[project]/app/reports/scheduled/page.tsx",
                                lineNumber: 97,
                                columnNumber: 64
                            }, void 0)
                    },
                    {
                        key: 'lastRun',
                        header: 'Last Run',
                        render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-400 text-sm",
                                children: v
                            }, void 0, false, {
                                fileName: "[project]/app/reports/scheduled/page.tsx",
                                lineNumber: 98,
                                columnNumber: 64
                            }, void 0)
                    },
                    {
                        key: 'recipients',
                        header: 'Recipients',
                        render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-users text-slate-500 text-xs"
                                    }, void 0, false, {
                                        fileName: "[project]/app/reports/scheduled/page.tsx",
                                        lineNumber: 104,
                                        columnNumber: 17
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-300 text-sm",
                                        children: v.length
                                    }, void 0, false, {
                                        fileName: "[project]/app/reports/scheduled/page.tsx",
                                        lineNumber: 105,
                                        columnNumber: 17
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/reports/scheduled/page.tsx",
                                lineNumber: 103,
                                columnNumber: 15
                            }, void 0)
                    },
                    {
                        key: 'format',
                        header: 'Format',
                        render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: `fas ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$formatters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFormatIcon"])(v)}`
                            }, void 0, false, {
                                fileName: "[project]/app/reports/scheduled/page.tsx",
                                lineNumber: 112,
                                columnNumber: 28
                            }, void 0)
                    },
                    {
                        key: 'status',
                        header: 'Status',
                        render: (v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DataTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                status: v === 'active' ? 'Active' : 'Paused',
                                variant: v === 'active' ? 'success' : 'warning',
                                showDot: true,
                                pulse: v === 'active'
                            }, void 0, false, {
                                fileName: "[project]/app/reports/scheduled/page.tsx",
                                lineNumber: 118,
                                columnNumber: 15
                            }, void 0)
                    },
                    {
                        key: 'actions',
                        header: 'Actions',
                        align: 'right',
                        render: (_, row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-end gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors",
                                        title: "Run Now",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: "fas fa-play"
                                        }, void 0, false, {
                                            fileName: "[project]/app/reports/scheduled/page.tsx",
                                            lineNumber: 133,
                                            columnNumber: 19
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/app/reports/scheduled/page.tsx",
                                        lineNumber: 132,
                                        columnNumber: 17
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors",
                                        title: "Edit",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: "fas fa-edit"
                                        }, void 0, false, {
                                            fileName: "[project]/app/reports/scheduled/page.tsx",
                                            lineNumber: 136,
                                            columnNumber: 19
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/app/reports/scheduled/page.tsx",
                                        lineNumber: 135,
                                        columnNumber: 17
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors",
                                        title: "Pause/Resume",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: `fas ${row.status === 'active' ? 'fa-pause' : 'fa-play'}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/reports/scheduled/page.tsx",
                                            lineNumber: 139,
                                            columnNumber: 19
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/app/reports/scheduled/page.tsx",
                                        lineNumber: 138,
                                        columnNumber: 17
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-red-400 transition-colors",
                                        title: "Delete",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: "fas fa-trash"
                                        }, void 0, false, {
                                            fileName: "[project]/app/reports/scheduled/page.tsx",
                                            lineNumber: 142,
                                            columnNumber: 19
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/app/reports/scheduled/page.tsx",
                                        lineNumber: 141,
                                        columnNumber: 17
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/reports/scheduled/page.tsx",
                                lineNumber: 131,
                                columnNumber: 15
                            }, void 0)
                    }
                ],
                data: filteredReports,
                getRowKey: (row)=>row.id
            }, void 0, false, {
                fileName: "[project]/app/reports/scheduled/page.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 border-b border-slate-700",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold text-white",
                                children: "Recent Deliveries"
                            }, void 0, false, {
                                fileName: "[project]/app/reports/scheduled/page.tsx",
                                lineNumber: 155,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-400",
                                children: "Last 7 days"
                            }, void 0, false, {
                                fileName: "[project]/app/reports/scheduled/page.tsx",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/reports/scheduled/page.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "divide-y divide-slate-700/50",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$reports$2f$scheduledData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["recentDeliveries"].map((delivery, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 flex items-center justify-between hover:bg-slate-800/30",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `w-10 h-10 rounded-lg flex items-center justify-center ${delivery.status === 'delivered' ? 'bg-emerald-500/20' : 'bg-red-500/20'}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: `fas ${delivery.status === 'delivered' ? 'fa-check text-emerald-400' : 'fa-times text-red-400'}`
                                                }, void 0, false, {
                                                    fileName: "[project]/app/reports/scheduled/page.tsx",
                                                    lineNumber: 165,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/reports/scheduled/page.tsx",
                                                lineNumber: 162,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-white",
                                                        children: delivery.report
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/reports/scheduled/page.tsx",
                                                        lineNumber: 168,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-slate-400",
                                                        children: delivery.date
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/reports/scheduled/page.tsx",
                                                        lineNumber: 169,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/reports/scheduled/page.tsx",
                                                lineNumber: 167,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/reports/scheduled/page.tsx",
                                        lineNumber: 161,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-slate-400",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "fas fa-envelope mr-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/reports/scheduled/page.tsx",
                                                        lineNumber: 174,
                                                        columnNumber: 19
                                                    }, this),
                                                    delivery.recipients,
                                                    " recipient",
                                                    delivery.recipients > 1 ? 's' : ''
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/reports/scheduled/page.tsx",
                                                lineNumber: 173,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$DataTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                                status: delivery.status === 'delivered' ? 'Delivered' : 'Failed',
                                                variant: delivery.status === 'delivered' ? 'success' : 'error'
                                            }, void 0, false, {
                                                fileName: "[project]/app/reports/scheduled/page.tsx",
                                                lineNumber: 177,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/reports/scheduled/page.tsx",
                                        lineNumber: 172,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/app/reports/scheduled/page.tsx",
                                lineNumber: 160,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/reports/scheduled/page.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/reports/scheduled/page.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: "fas fa-lightbulb text-blue-400 mt-0.5"
                        }, void 0, false, {
                            fileName: "[project]/app/reports/scheduled/page.tsx",
                            lineNumber: 190,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm font-medium text-white",
                                    children: "Scheduling Tips"
                                }, void 0, false, {
                                    fileName: "[project]/app/reports/scheduled/page.tsx",
                                    lineNumber: 192,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-slate-400 mt-1",
                                    children: "Schedule reports during off-peak hours (early morning) for faster generation. Weekly reports are best scheduled for Monday mornings to capture the full week's data."
                                }, void 0, false, {
                                    fileName: "[project]/app/reports/scheduled/page.tsx",
                                    lineNumber: 193,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/reports/scheduled/page.tsx",
                            lineNumber: 191,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/reports/scheduled/page.tsx",
                    lineNumber: 189,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/reports/scheduled/page.tsx",
                lineNumber: 188,
                columnNumber: 7
            }, this),
            showCreateModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-bold text-white",
                                    children: "Create Schedule"
                                }, void 0, false, {
                                    fileName: "[project]/app/reports/scheduled/page.tsx",
                                    lineNumber: 205,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowCreateModal(false),
                                    className: "text-slate-400 hover:text-white",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-times"
                                    }, void 0, false, {
                                        fileName: "[project]/app/reports/scheduled/page.tsx",
                                        lineNumber: 207,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/reports/scheduled/page.tsx",
                                    lineNumber: 206,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/reports/scheduled/page.tsx",
                            lineNumber: 204,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm text-slate-400 mb-1",
                                            children: "Report Name"
                                        }, void 0, false, {
                                            fileName: "[project]/app/reports/scheduled/page.tsx",
                                            lineNumber: 212,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "e.g., Weekly Sales Report",
                                            className: "w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                                        }, void 0, false, {
                                            fileName: "[project]/app/reports/scheduled/page.tsx",
                                            lineNumber: 213,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/reports/scheduled/page.tsx",
                                    lineNumber: 211,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm text-slate-400 mb-1",
                                            children: "Report Type"
                                        }, void 0, false, {
                                            fileName: "[project]/app/reports/scheduled/page.tsx",
                                            lineNumber: 220,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: "w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    children: "Sales Report"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/reports/scheduled/page.tsx",
                                                    lineNumber: 222,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    children: "Inventory Report"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/reports/scheduled/page.tsx",
                                                    lineNumber: 223,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    children: "Shipping Report"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/reports/scheduled/page.tsx",
                                                    lineNumber: 224,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    children: "Financial Report"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/reports/scheduled/page.tsx",
                                                    lineNumber: 225,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    children: "Marketing Report"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/reports/scheduled/page.tsx",
                                                    lineNumber: 226,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/reports/scheduled/page.tsx",
                                            lineNumber: 221,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/reports/scheduled/page.tsx",
                                    lineNumber: 219,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm text-slate-400 mb-1",
                                            children: "Frequency"
                                        }, void 0, false, {
                                            fileName: "[project]/app/reports/scheduled/page.tsx",
                                            lineNumber: 230,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2",
                                            children: [
                                                'Daily',
                                                'Weekly',
                                                'Monthly'
                                            ].map((freq)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors",
                                                    children: freq
                                                }, freq, false, {
                                                    fileName: "[project]/app/reports/scheduled/page.tsx",
                                                    lineNumber: 233,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/reports/scheduled/page.tsx",
                                            lineNumber: 231,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/reports/scheduled/page.tsx",
                                    lineNumber: 229,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm text-slate-400 mb-1",
                                            children: "Recipients"
                                        }, void 0, false, {
                                            fileName: "[project]/app/reports/scheduled/page.tsx",
                                            lineNumber: 243,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "email@company.com",
                                            className: "w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                                        }, void 0, false, {
                                            fileName: "[project]/app/reports/scheduled/page.tsx",
                                            lineNumber: 244,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/reports/scheduled/page.tsx",
                                    lineNumber: 242,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm text-slate-400 mb-1",
                                            children: "Export Format"
                                        }, void 0, false, {
                                            fileName: "[project]/app/reports/scheduled/page.tsx",
                                            lineNumber: 251,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2",
                                            children: [
                                                'PDF',
                                                'XLSX',
                                                'CSV'
                                            ].map((format)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors",
                                                    children: format
                                                }, format, false, {
                                                    fileName: "[project]/app/reports/scheduled/page.tsx",
                                                    lineNumber: 254,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/reports/scheduled/page.tsx",
                                            lineNumber: 252,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/reports/scheduled/page.tsx",
                                    lineNumber: 250,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/reports/scheduled/page.tsx",
                            lineNumber: 210,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-end gap-3 mt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowCreateModal(false),
                                    className: "px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/reports/scheduled/page.tsx",
                                    lineNumber: 265,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm transition-colors",
                                    children: "Create Schedule"
                                }, void 0, false, {
                                    fileName: "[project]/app/reports/scheduled/page.tsx",
                                    lineNumber: 271,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/reports/scheduled/page.tsx",
                            lineNumber: 264,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/reports/scheduled/page.tsx",
                    lineNumber: 203,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/reports/scheduled/page.tsx",
                lineNumber: 202,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/reports/scheduled/page.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_87c73cf7._.js.map