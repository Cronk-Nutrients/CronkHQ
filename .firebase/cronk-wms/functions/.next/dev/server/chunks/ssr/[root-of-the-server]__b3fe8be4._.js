module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/components/layout/Sidebar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
'use client';
;
;
;
;
;
// Navigation structure with grouped sections
const navigationGroups = [
    {
        items: [
            {
                name: 'Dashboard',
                href: '/',
                icon: 'fa-chart-line'
            },
            {
                name: 'Inventory',
                href: '/inventory',
                icon: 'fa-boxes-stacked'
            },
            {
                name: 'Orders',
                href: '/orders',
                icon: 'fa-shopping-cart'
            },
            {
                name: 'Returns',
                href: '/returns',
                icon: 'fa-undo-alt'
            }
        ]
    },
    {
        label: 'Fulfillment',
        items: [
            {
                name: 'Pick & Pack',
                id: 'pick-pack',
                icon: 'fa-dolly',
                children: [
                    {
                        name: 'Overview',
                        href: '/pick-pack',
                        icon: 'fa-clipboard-list'
                    },
                    {
                        name: 'Pick Station',
                        href: '/pick-pack/pick',
                        icon: 'fa-hand-pointer'
                    },
                    {
                        name: 'Pack Station',
                        href: '/pick-pack/pack',
                        icon: 'fa-box'
                    },
                    {
                        name: 'FBA Prep',
                        href: '/pick-pack/fba',
                        icon: 'fa-amazon',
                        isBrand: true
                    }
                ]
            },
            {
                name: 'Shipping',
                href: '/shipping',
                icon: 'fa-truck-fast'
            }
        ]
    },
    {
        label: 'Operations',
        items: [
            {
                name: 'Purchase Orders',
                href: '/purchase-orders',
                icon: 'fa-file-invoice'
            },
            {
                name: 'Suppliers',
                href: '/suppliers',
                icon: 'fa-truck-loading'
            },
            {
                name: 'Work Orders',
                href: '/work-orders',
                icon: 'fa-industry'
            },
            {
                name: 'Bundles',
                href: '/bundles',
                icon: 'fa-layer-group'
            },
            {
                name: 'Cycle Counts',
                href: '/inventory/counts',
                icon: 'fa-clipboard-check'
            },
            {
                name: 'Transfers',
                href: '/inventory/transfers',
                icon: 'fa-exchange-alt'
            },
            {
                name: 'Reports',
                href: '/reports',
                icon: 'fa-chart-pie'
            },
            {
                name: 'Settings',
                href: '/settings',
                icon: 'fa-cog'
            }
        ]
    }
];
// Sync status data
const syncStatus = [
    {
        name: 'Veeqo',
        status: 'Synced'
    },
    {
        name: 'Shopify',
        status: 'Synced'
    }
];
function Sidebar() {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const [expandedMenus, setExpandedMenus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // Auto-expand menu based on current route
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (pathname.startsWith('/pick-pack')) {
            setExpandedMenus((prev)=>prev.includes('pick-pack') ? prev : [
                    ...prev,
                    'pick-pack'
                ]);
        }
    }, [
        pathname
    ]);
    const toggleMenu = (menuId)=>{
        setExpandedMenus((prev)=>prev.includes(menuId) ? prev.filter((m)=>m !== menuId) : [
                ...prev,
                menuId
            ]);
    };
    const isActive = (href)=>{
        if (href === '/') {
            return pathname === '/';
        }
        return pathname === href || pathname.startsWith(href + '/');
    };
    const isMenuActive = (item)=>{
        if (item.children) {
            return item.children.some((child)=>isActive(child.href));
        }
        return item.href ? isActive(item.href) : false;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "fixed left-0 top-0 z-40 h-screen w-64 bg-slate-900/80 border-r border-slate-700/50 flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-5 border-b border-slate-700/50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-leaf text-white text-lg"
                            }, void 0, false, {
                                fileName: "[project]/components/layout/Sidebar.tsx",
                                lineNumber: 118,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/layout/Sidebar.tsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "font-bold text-white text-lg",
                                    children: "Cronk WMS"
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/Sidebar.tsx",
                                    lineNumber: 121,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-slate-400",
                                    children: "Inventory Management"
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/Sidebar.tsx",
                                    lineNumber: 122,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/layout/Sidebar.tsx",
                            lineNumber: 120,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/layout/Sidebar.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/layout/Sidebar.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "flex-1 p-4 space-y-1 overflow-y-auto",
                children: navigationGroups.map((group, groupIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            group.label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pt-4 pb-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider",
                                    children: group.label
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/Sidebar.tsx",
                                    lineNumber: 134,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/layout/Sidebar.tsx",
                                lineNumber: 133,
                                columnNumber: 15
                            }, this),
                            group.items.map((item)=>{
                                // Expandable menu with children
                                if (item.children && item.id) {
                                    const isExpanded = expandedMenus.includes(item.id);
                                    const menuIsActive = isMenuActive(item);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>toggleMenu(item.id),
                                                className: `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${menuIsActive ? 'bg-gradient-to-r from-emerald-500/20 to-transparent border-l-2 border-emerald-400 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: `fas ${item.icon} w-5 ${menuIsActive ? 'text-emerald-400' : ''}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/layout/Sidebar.tsx",
                                                        lineNumber: 158,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: menuIsActive ? 'font-medium' : '',
                                                        children: item.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/layout/Sidebar.tsx",
                                                        lineNumber: 159,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-auto",
                                                        children: isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                            className: "w-4 h-4 text-slate-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/layout/Sidebar.tsx",
                                                            lineNumber: 162,
                                                            columnNumber: 27
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                            className: "w-4 h-4 text-slate-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/layout/Sidebar.tsx",
                                                            lineNumber: 164,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/layout/Sidebar.tsx",
                                                        lineNumber: 160,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/layout/Sidebar.tsx",
                                                lineNumber: 150,
                                                columnNumber: 21
                                            }, this),
                                            isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ml-4 mt-1 space-y-1 border-l border-slate-700/50 pl-3",
                                                children: item.children.map((child)=>{
                                                    const childActive = isActive(child.href);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        href: child.href,
                                                        className: `flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm ${childActive ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                className: `${child.isBrand ? 'fab' : 'fas'} ${child.icon} w-4 text-xs ${childActive ? 'text-emerald-400' : ''}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/layout/Sidebar.tsx",
                                                                lineNumber: 184,
                                                                columnNumber: 31
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: child.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/layout/Sidebar.tsx",
                                                                lineNumber: 185,
                                                                columnNumber: 31
                                                            }, this)
                                                        ]
                                                    }, child.href, true, {
                                                        fileName: "[project]/components/layout/Sidebar.tsx",
                                                        lineNumber: 175,
                                                        columnNumber: 29
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/Sidebar.tsx",
                                                lineNumber: 171,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/components/layout/Sidebar.tsx",
                                        lineNumber: 148,
                                        columnNumber: 19
                                    }, this);
                                }
                                // Regular menu item
                                const active = item.href ? isActive(item.href) : false;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href || '#',
                                    className: `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${active ? 'text-white bg-gradient-to-r from-emerald-500/20 to-transparent border-l-2 border-emerald-400' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: `${item.isBrand ? 'fab' : 'fas'} ${item.icon} w-5 ${active ? 'text-emerald-400' : ''}`
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/Sidebar.tsx",
                                            lineNumber: 207,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: active ? 'font-medium' : '',
                                            children: item.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/Sidebar.tsx",
                                            lineNumber: 208,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, item.name, true, {
                                    fileName: "[project]/components/layout/Sidebar.tsx",
                                    lineNumber: 198,
                                    columnNumber: 17
                                }, this);
                            })
                        ]
                    }, groupIndex, true, {
                        fileName: "[project]/components/layout/Sidebar.tsx",
                        lineNumber: 130,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/layout/Sidebar.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-t border-slate-700/50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-3 space-y-2",
                    children: syncStatus.map((sync)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-slate-400",
                                    children: sync.name
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/Sidebar.tsx",
                                    lineNumber: 221,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex items-center gap-1 text-emerald-400",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/Sidebar.tsx",
                                            lineNumber: 223,
                                            columnNumber: 17
                                        }, this),
                                        sync.status
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/layout/Sidebar.tsx",
                                    lineNumber: 222,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, sync.name, true, {
                            fileName: "[project]/components/layout/Sidebar.tsx",
                            lineNumber: 220,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/layout/Sidebar.tsx",
                    lineNumber: 218,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/layout/Sidebar.tsx",
                lineNumber: 217,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/layout/Sidebar.tsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/layout/Header.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-ssr] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-ssr] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-ssr] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-ssr] (ecmascript) <export default as ShoppingCart>");
'use client';
;
;
;
const dateRangeOptions = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'wtd',
        label: 'Week to Date'
    },
    {
        value: 'mtd',
        label: 'Month to Date'
    },
    {
        value: 'ytd',
        label: 'Year to Date'
    },
    {
        value: 'custom',
        label: 'Custom Range'
    }
];
const mockNotifications = [
    {
        id: 1,
        type: 'warning',
        title: 'Low Stock Alert',
        message: 'Big Bud 1L is below reorder point (12 units)',
        time: '5 min ago'
    },
    {
        id: 2,
        type: 'order',
        title: 'New Order',
        message: 'Order #10492 received from Shopify',
        time: '12 min ago'
    },
    {
        id: 3,
        type: 'success',
        title: 'Shipment Delivered',
        message: 'Order #10485 delivered to customer',
        time: '1 hour ago'
    }
];
function Header() {
    const [dateRange, setDateRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('mtd');
    const [showDateDropdown, setShowDateDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showNotifications, setShowNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSyncing, setIsSyncing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lastSync, setLastSync] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('2 min ago');
    const handleSync = ()=>{
        setIsSyncing(true);
        setTimeout(()=>{
            setIsSyncing(false);
            setLastSync('Just now');
        }, 2000);
    };
    const getNotificationIcon = (type)=>{
        switch(type){
            case 'warning':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                    className: "h-4 w-4 text-amber-400"
                }, void 0, false, {
                    fileName: "[project]/components/layout/Header.tsx",
                    lineNumber: 72,
                    columnNumber: 16
                }, this);
            case 'order':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                    className: "h-4 w-4 text-blue-400"
                }, void 0, false, {
                    fileName: "[project]/components/layout/Header.tsx",
                    lineNumber: 74,
                    columnNumber: 16
                }, this);
            case 'success':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                    className: "h-4 w-4 text-emerald-400"
                }, void 0, false, {
                    fileName: "[project]/components/layout/Header.tsx",
                    lineNumber: 76,
                    columnNumber: 16
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                    className: "h-4 w-4 text-slate-400"
                }, void 0, false, {
                    fileName: "[project]/components/layout/Header.tsx",
                    lineNumber: 78,
                    columnNumber: 16
                }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "fixed top-0 left-64 right-0 z-30 h-16 bg-slate-900/80 backdrop-blur border-b border-slate-700/50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full items-center justify-between px-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-4"
                }, void 0, false, {
                    fileName: "[project]/components/layout/Header.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowDateDropdown(!showDateDropdown),
                                    className: "flex items-center gap-2 rounded-lg bg-slate-800/50 px-4 py-2 text-sm font-medium text-white border border-slate-700/50 hover:bg-slate-700/50 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                            className: "h-4 w-4 text-slate-400"
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/Header.tsx",
                                            lineNumber: 98,
                                            columnNumber: 15
                                        }, this),
                                        dateRangeOptions.find((o)=>o.value === dateRange)?.label,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                            className: "h-4 w-4 text-slate-400"
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/Header.tsx",
                                            lineNumber: 100,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/layout/Header.tsx",
                                    lineNumber: 94,
                                    columnNumber: 13
                                }, this),
                                showDateDropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "fixed inset-0 z-10",
                                            onClick: ()=>setShowDateDropdown(false)
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/Header.tsx",
                                            lineNumber: 105,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute right-0 top-full mt-2 z-20 w-48 rounded-xl bg-slate-800 border border-slate-700/50 shadow-xl overflow-hidden",
                                            children: dateRangeOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setDateRange(option.value);
                                                        setShowDateDropdown(false);
                                                    },
                                                    className: `w-full px-4 py-2.5 text-left text-sm transition-colors ${dateRange === option.value ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300 hover:bg-slate-700/50'}`,
                                                    children: option.label
                                                }, option.value, false, {
                                                    fileName: "[project]/components/layout/Header.tsx",
                                                    lineNumber: 111,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/Header.tsx",
                                            lineNumber: 109,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/layout/Header.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSync,
                            disabled: isSyncing,
                            className: "flex items-center gap-2 rounded-lg bg-slate-800/50 px-4 py-2 text-sm font-medium border border-slate-700/50 hover:bg-slate-700/50 transition-colors disabled:opacity-50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                    className: `h-4 w-4 text-emerald-400 ${isSyncing ? 'animate-spin' : ''}`
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/Header.tsx",
                                    lineNumber: 137,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-slate-300",
                                    children: isSyncing ? 'Syncing...' : `Synced ${lastSync}`
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/Header.tsx",
                                    lineNumber: 140,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/layout/Header.tsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowNotifications(!showNotifications),
                                    className: "relative flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                            className: "h-5 w-5 text-slate-400"
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/Header.tsx",
                                            lineNumber: 151,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white",
                                            children: mockNotifications.length
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/Header.tsx",
                                            lineNumber: 152,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/layout/Header.tsx",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, this),
                                showNotifications && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "fixed inset-0 z-10",
                                            onClick: ()=>setShowNotifications(false)
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/Header.tsx",
                                            lineNumber: 159,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute right-0 top-full mt-2 z-20 w-80 rounded-xl bg-slate-800 border border-slate-700/50 shadow-xl overflow-hidden",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "border-b border-slate-700/50 px-4 py-3",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-sm font-semibold text-white",
                                                        children: "Notifications"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/layout/Header.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/layout/Header.tsx",
                                                    lineNumber: 164,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "max-h-80 overflow-y-auto",
                                                    children: mockNotifications.map((notification)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex gap-3 px-4 py-3 hover:bg-slate-700/30 transition-colors border-b border-slate-700/30 last:border-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700/50",
                                                                    children: getNotificationIcon(notification.type)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/layout/Header.tsx",
                                                                    lineNumber: 175,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex-1 min-w-0",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm font-medium text-white",
                                                                            children: notification.title
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/layout/Header.tsx",
                                                                            lineNumber: 179,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs text-slate-400 truncate",
                                                                            children: notification.message
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/layout/Header.tsx",
                                                                            lineNumber: 182,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs text-slate-500 mt-1",
                                                                            children: notification.time
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/layout/Header.tsx",
                                                                            lineNumber: 185,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/layout/Header.tsx",
                                                                    lineNumber: 178,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, notification.id, true, {
                                                            fileName: "[project]/components/layout/Header.tsx",
                                                            lineNumber: 171,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/layout/Header.tsx",
                                                    lineNumber: 169,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "border-t border-slate-700/50 px-4 py-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "w-full text-center text-sm text-emerald-400 hover:text-emerald-300 transition-colors",
                                                        children: "View all notifications"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/layout/Header.tsx",
                                                        lineNumber: 193,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/layout/Header.tsx",
                                                    lineNumber: 192,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/layout/Header.tsx",
                                            lineNumber: 163,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/layout/Header.tsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/layout/Header.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/layout/Header.tsx",
            lineNumber: 84,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/layout/Header.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
}),
"[project]/context/AppContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProvider",
    ()=>AppProvider,
    "conditionFields",
    ()=>conditionFields,
    "useApp",
    ()=>useApp,
    "useInventory",
    ()=>useInventory,
    "useLocationStock",
    ()=>useLocationStock,
    "useLocations",
    ()=>useLocations,
    "useOrders",
    ()=>useOrders,
    "useProductStock",
    ()=>useProductStock,
    "useProducts",
    ()=>useProducts,
    "useSettings",
    ()=>useSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const conditionFields = {
    order: [
        {
            value: 'channel',
            label: 'Sales Channel'
        },
        {
            value: 'total',
            label: 'Order Total'
        },
        {
            value: 'item_count',
            label: 'Item Count'
        },
        {
            value: 'shipping_country',
            label: 'Ship To Country'
        },
        {
            value: 'shipping_state',
            label: 'Ship To State'
        },
        {
            value: 'customer_email',
            label: 'Customer Email'
        },
        {
            value: 'contains_sku',
            label: 'Contains SKU'
        },
        {
            value: 'weight',
            label: 'Total Weight'
        },
        {
            value: 'is_prime',
            label: 'Is Amazon Prime'
        },
        {
            value: 'requires_signature',
            label: 'Requires Signature'
        }
    ],
    inventory: [
        {
            value: 'sku',
            label: 'Product SKU'
        },
        {
            value: 'category',
            label: 'Category'
        },
        {
            value: 'quantity',
            label: 'Quantity'
        },
        {
            value: 'location',
            label: 'Location'
        },
        {
            value: 'cost',
            label: 'Product Cost'
        }
    ]
};
// Reducer
function appReducer(state, action) {
    switch(action.type){
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload
            };
        case 'SET_INITIALIZED':
            return {
                ...state,
                isInitialized: action.payload
            };
        // Products
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload
            };
        case 'ADD_PRODUCT':
            return {
                ...state,
                products: [
                    ...state.products,
                    action.payload
                ]
            };
        case 'UPDATE_PRODUCT':
            return {
                ...state,
                products: state.products.map((p)=>p.id === action.payload.id ? action.payload : p)
            };
        case 'DELETE_PRODUCT':
            return {
                ...state,
                products: state.products.filter((p)=>p.id !== action.payload)
            };
        // Inventory
        case 'SET_INVENTORY':
            return {
                ...state,
                inventory: action.payload
            };
        case 'UPDATE_INVENTORY':
            return {
                ...state,
                inventory: state.inventory.map((inv)=>inv.productId === action.payload.productId && inv.locationId === action.payload.locationId ? action.payload : inv)
            };
        case 'ADJUST_STOCK':
            return {
                ...state,
                inventory: state.inventory.map((inv)=>inv.productId === action.payload.productId && inv.locationId === action.payload.locationId ? {
                        ...inv,
                        quantity: inv.quantity + action.payload.adjustment,
                        updatedAt: new Date()
                    } : inv)
            };
        // Locations
        case 'SET_LOCATIONS':
            return {
                ...state,
                locations: action.payload
            };
        case 'ADD_LOCATION':
            return {
                ...state,
                locations: [
                    ...state.locations,
                    action.payload
                ]
            };
        case 'UPDATE_LOCATION':
            return {
                ...state,
                locations: state.locations.map((l)=>l.id === action.payload.id ? action.payload : l)
            };
        case 'DELETE_LOCATION':
            return {
                ...state,
                locations: state.locations.filter((l)=>l.id !== action.payload)
            };
        // Orders
        case 'SET_ORDERS':
            return {
                ...state,
                orders: action.payload
            };
        case 'ADD_ORDER':
            return {
                ...state,
                orders: [
                    ...state.orders,
                    action.payload
                ]
            };
        case 'UPDATE_ORDER':
            return {
                ...state,
                orders: state.orders.map((o)=>o.id === action.payload.id ? action.payload : o)
            };
        case 'UPDATE_ORDER_STATUS':
            return {
                ...state,
                orders: state.orders.map((o)=>o.id === action.payload.orderId ? {
                        ...o,
                        status: action.payload.status,
                        updatedAt: new Date()
                    } : o)
            };
        case 'DELETE_ORDER':
            return {
                ...state,
                orders: state.orders.filter((o)=>o.id !== action.payload)
            };
        // Purchase Orders
        case 'SET_PURCHASE_ORDERS':
            return {
                ...state,
                purchaseOrders: action.payload
            };
        case 'ADD_PURCHASE_ORDER':
            return {
                ...state,
                purchaseOrders: [
                    ...state.purchaseOrders,
                    action.payload
                ]
            };
        case 'UPDATE_PURCHASE_ORDER':
            return {
                ...state,
                purchaseOrders: state.purchaseOrders.map((po)=>po.id === action.payload.id ? action.payload : po)
            };
        case 'DELETE_PURCHASE_ORDER':
            return {
                ...state,
                purchaseOrders: state.purchaseOrders.filter((po)=>po.id !== action.payload)
            };
        // Work Orders
        case 'SET_WORK_ORDERS':
            return {
                ...state,
                workOrders: action.payload
            };
        case 'ADD_WORK_ORDER':
            return {
                ...state,
                workOrders: [
                    ...state.workOrders,
                    action.payload
                ]
            };
        case 'UPDATE_WORK_ORDER':
            return {
                ...state,
                workOrders: state.workOrders.map((wo)=>wo.id === action.payload.id ? action.payload : wo)
            };
        case 'DELETE_WORK_ORDER':
            return {
                ...state,
                workOrders: state.workOrders.filter((wo)=>wo.id !== action.payload)
            };
        // Bundles
        case 'SET_BUNDLES':
            return {
                ...state,
                bundles: action.payload
            };
        case 'ADD_BUNDLE':
            return {
                ...state,
                bundles: [
                    ...state.bundles,
                    action.payload
                ]
            };
        case 'UPDATE_BUNDLE':
            return {
                ...state,
                bundles: state.bundles.map((b)=>b.id === action.payload.id ? action.payload : b)
            };
        case 'DELETE_BUNDLE':
            return {
                ...state,
                bundles: state.bundles.filter((b)=>b.id !== action.payload)
            };
        // Shipments
        case 'SET_SHIPMENTS':
            return {
                ...state,
                shipments: action.payload
            };
        case 'ADD_SHIPMENT':
            return {
                ...state,
                shipments: [
                    ...state.shipments,
                    action.payload
                ]
            };
        case 'UPDATE_SHIPMENT':
            return {
                ...state,
                shipments: state.shipments.map((s)=>s.id === action.payload.id ? action.payload : s)
            };
        // Boxes
        case 'SET_BOXES':
            return {
                ...state,
                boxes: action.payload
            };
        case 'ADD_BOX':
            return {
                ...state,
                boxes: [
                    ...state.boxes,
                    action.payload
                ]
            };
        case 'UPDATE_BOX':
            return {
                ...state,
                boxes: state.boxes.map((b)=>b.id === action.payload.id ? action.payload : b)
            };
        case 'DELETE_BOX':
            return {
                ...state,
                boxes: state.boxes.filter((b)=>b.id !== action.payload)
            };
        // Suppliers
        case 'SET_SUPPLIERS':
            return {
                ...state,
                suppliers: action.payload
            };
        case 'ADD_SUPPLIER':
            return {
                ...state,
                suppliers: [
                    ...state.suppliers,
                    action.payload
                ]
            };
        case 'UPDATE_SUPPLIER':
            return {
                ...state,
                suppliers: state.suppliers.map((s)=>s.id === action.payload.id ? action.payload : s)
            };
        case 'DELETE_SUPPLIER':
            return {
                ...state,
                suppliers: state.suppliers.filter((s)=>s.id !== action.payload),
                productSuppliers: state.productSuppliers.filter((ps)=>ps.supplierId !== action.payload)
            };
        case 'SET_PRODUCT_SUPPLIERS':
            return {
                ...state,
                productSuppliers: action.payload
            };
        case 'ADD_PRODUCT_SUPPLIER':
            return {
                ...state,
                productSuppliers: [
                    ...state.productSuppliers,
                    action.payload
                ]
            };
        case 'UPDATE_PRODUCT_SUPPLIER':
            return {
                ...state,
                productSuppliers: state.productSuppliers.map((ps)=>ps.productId === action.payload.productId && ps.supplierId === action.payload.supplierId ? action.payload : ps)
            };
        case 'REMOVE_PRODUCT_SUPPLIER':
            return {
                ...state,
                productSuppliers: state.productSuppliers.filter((ps)=>!(ps.productId === action.payload.productId && ps.supplierId === action.payload.supplierId))
            };
        // Settings
        case 'UPDATE_SETTINGS':
            return {
                ...state,
                settings: {
                    ...state.settings,
                    ...action.payload
                }
            };
        // Picking Batches
        case 'SET_PICKING_BATCHES':
            return {
                ...state,
                pickingBatches: action.payload
            };
        case 'ADD_PICKING_BATCH':
            return {
                ...state,
                pickingBatches: [
                    ...state.pickingBatches,
                    action.payload
                ]
            };
        case 'UPDATE_PICKING_BATCH':
            return {
                ...state,
                pickingBatches: state.pickingBatches.map((b)=>b.id === action.payload.id ? action.payload : b)
            };
        case 'DELETE_PICKING_BATCH':
            return {
                ...state,
                pickingBatches: state.pickingBatches.filter((b)=>b.id !== action.payload),
                // Also remove batch assignment from orders
                orders: state.orders.map((o)=>o.pickingBatchId === action.payload ? {
                        ...o,
                        pickingBatchId: undefined
                    } : o)
            };
        case 'ASSIGN_ORDER_TO_BATCH':
            {
                const { orderId, batchId } = action.payload;
                // Update the order's pickingBatchId
                const updatedOrders = state.orders.map((o)=>o.id === orderId ? {
                        ...o,
                        pickingBatchId: batchId || undefined
                    } : o);
                // Update the batch's orderIds
                let updatedBatches = state.pickingBatches;
                if (batchId) {
                    updatedBatches = state.pickingBatches.map((b)=>{
                        if (b.id === batchId && !b.orderIds.includes(orderId)) {
                            return {
                                ...b,
                                orderIds: [
                                    ...b.orderIds,
                                    orderId
                                ]
                            };
                        }
                        // Remove from other batches
                        if (b.id !== batchId && b.orderIds.includes(orderId)) {
                            return {
                                ...b,
                                orderIds: b.orderIds.filter((id)=>id !== orderId)
                            };
                        }
                        return b;
                    });
                } else {
                    // Remove from all batches
                    updatedBatches = state.pickingBatches.map((b)=>({
                            ...b,
                            orderIds: b.orderIds.filter((id)=>id !== orderId)
                        }));
                }
                return {
                    ...state,
                    orders: updatedOrders,
                    pickingBatches: updatedBatches
                };
            }
        // Returns
        case 'SET_RETURNS':
            return {
                ...state,
                returns: action.payload
            };
        case 'ADD_RETURN':
            return {
                ...state,
                returns: [
                    ...state.returns,
                    action.payload
                ]
            };
        case 'UPDATE_RETURN':
            return {
                ...state,
                returns: state.returns.map((r)=>r.id === action.payload.id ? action.payload : r)
            };
        // Stock Counts
        case 'SET_STOCK_COUNTS':
            return {
                ...state,
                stockCounts: action.payload
            };
        case 'ADD_STOCK_COUNT':
            return {
                ...state,
                stockCounts: [
                    ...state.stockCounts,
                    action.payload
                ]
            };
        case 'UPDATE_STOCK_COUNT':
            return {
                ...state,
                stockCounts: state.stockCounts.map((sc)=>sc.id === action.payload.id ? action.payload : sc)
            };
        case 'DELETE_STOCK_COUNT':
            return {
                ...state,
                stockCounts: state.stockCounts.filter((sc)=>sc.id !== action.payload)
            };
        // Transfers
        case 'SET_TRANSFERS':
            return {
                ...state,
                transfers: action.payload
            };
        case 'ADD_TRANSFER':
            return {
                ...state,
                transfers: [
                    ...state.transfers,
                    action.payload
                ]
            };
        case 'UPDATE_TRANSFER':
            return {
                ...state,
                transfers: state.transfers.map((t)=>t.id === action.payload.id ? action.payload : t)
            };
        // Automation Rules
        case 'SET_AUTOMATION_RULES':
            return {
                ...state,
                automationRules: action.payload
            };
        case 'ADD_AUTOMATION_RULE':
            return {
                ...state,
                automationRules: [
                    ...state.automationRules,
                    action.payload
                ]
            };
        case 'UPDATE_AUTOMATION_RULE':
            return {
                ...state,
                automationRules: state.automationRules.map((r)=>r.id === action.payload.id ? action.payload : r)
            };
        case 'DELETE_AUTOMATION_RULE':
            return {
                ...state,
                automationRules: state.automationRules.filter((r)=>r.id !== action.payload)
            };
        case 'TOGGLE_RULE':
            return {
                ...state,
                automationRules: state.automationRules.map((r)=>r.id === action.payload ? {
                        ...r,
                        enabled: !r.enabled,
                        updatedAt: new Date()
                    } : r)
            };
        // Serial Numbers
        case 'SET_SERIAL_NUMBERS':
            return {
                ...state,
                serialNumbers: action.payload
            };
        case 'ADD_SERIAL_NUMBERS':
            return {
                ...state,
                serialNumbers: [
                    ...state.serialNumbers,
                    ...action.payload
                ]
            };
        case 'UPDATE_SERIAL_NUMBER':
            return {
                ...state,
                serialNumbers: state.serialNumbers.map((sn)=>sn.id === action.payload.id ? action.payload : sn)
            };
        case 'RESERVE_SERIALS':
            return {
                ...state,
                serialNumbers: state.serialNumbers.map((sn)=>action.payload.serials.includes(sn.serial) ? {
                        ...sn,
                        status: 'reserved',
                        salesOrderId: action.payload.orderId
                    } : sn)
            };
        case 'SELL_SERIALS':
            return {
                ...state,
                serialNumbers: state.serialNumbers.map((sn)=>action.payload.serials.includes(sn.serial) ? {
                        ...sn,
                        status: 'sold',
                        salesOrderId: action.payload.orderId,
                        soldAt: new Date()
                    } : sn)
            };
        case 'RETURN_SERIAL':
            return {
                ...state,
                serialNumbers: state.serialNumbers.map((sn)=>sn.serial === action.payload.serial ? {
                        ...sn,
                        status: action.payload.condition,
                        salesOrderId: undefined,
                        soldAt: undefined
                    } : sn)
            };
        case 'ADD_SERIAL_MOVEMENT':
            return {
                ...state,
                serialMovements: [
                    ...state.serialMovements,
                    action.payload
                ]
            };
        // Lots
        case 'SET_LOTS':
            return {
                ...state,
                lots: action.payload
            };
        case 'ADD_LOT':
            return {
                ...state,
                lots: [
                    ...state.lots,
                    action.payload
                ]
            };
        case 'ADD_LOTS':
            return {
                ...state,
                lots: [
                    ...state.lots,
                    ...action.payload
                ]
            };
        case 'UPDATE_LOT':
            return {
                ...state,
                lots: state.lots.map((lot)=>lot.id === action.payload.id ? action.payload : lot)
            };
        case 'PICK_FROM_LOT':
            return {
                ...state,
                lots: state.lots.map((lot)=>lot.id === action.payload.lotId ? {
                        ...lot,
                        quantity: lot.quantity - action.payload.quantity,
                        reservedQty: Math.max(0, lot.reservedQty - action.payload.quantity)
                    } : lot)
            };
        case 'RESERVE_LOT_QTY':
            return {
                ...state,
                lots: state.lots.map((lot)=>lot.id === action.payload.lotId ? {
                        ...lot,
                        reservedQty: lot.reservedQty + action.payload.quantity
                    } : lot)
            };
        case 'RELEASE_LOT_QTY':
            return {
                ...state,
                lots: state.lots.map((lot)=>lot.id === action.payload.lotId ? {
                        ...lot,
                        reservedQty: Math.max(0, lot.reservedQty - action.payload.quantity)
                    } : lot)
            };
        case 'RECALL_LOT':
            return {
                ...state,
                lots: state.lots.map((lot)=>lot.id === action.payload.lotId ? {
                        ...lot,
                        status: 'recalled',
                        notes: action.payload.notes
                    } : lot)
            };
        case 'QUARANTINE_LOT':
            return {
                ...state,
                lots: state.lots.map((lot)=>lot.id === action.payload.lotId ? {
                        ...lot,
                        status: 'quarantine',
                        notes: action.payload.notes
                    } : lot)
            };
        case 'ADD_LOT_MOVEMENT':
            return {
                ...state,
                lotMovements: [
                    ...state.lotMovements,
                    action.payload
                ]
            };
        default:
            return state;
    }
}
// Initial State
const initialState = {
    products: [],
    inventory: [],
    locations: [],
    orders: [],
    purchaseOrders: [],
    workOrders: [],
    bundles: [],
    shipments: [],
    boxes: [],
    pickingBatches: [],
    returns: [],
    stockCounts: [],
    transfers: [],
    automationRules: [],
    serialNumbers: [],
    serialMovements: [],
    lots: [],
    lotMovements: [],
    suppliers: [],
    productSuppliers: [],
    settings: {
        companyName: 'Cronk Nutrients',
        defaultLocation: 'loc-1',
        gripperStickerEnabled: true,
        gripperStickerSku: 'LAB010R',
        smartBoxEnabled: true,
        lowStockThreshold: 50
    },
    isLoading: true,
    isInitialized: false
};
// Context
const AppContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AppProvider({ children }) {
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducer"])(appReducer, initialState);
    // Initialize with mock data on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const initializeData = async ()=>{
            try {
                // Import mock data dynamically to avoid circular dependencies
                const { products, locations, inventory, orders, purchaseOrders, workOrders, bundles, shippingBoxes } = await __turbopack_context__.A("[project]/data/mockData.ts [app-ssr] (ecmascript, async loader)");
                // Transform existing mock data to match new interfaces
                const transformedLocations = locations.map((loc)=>({
                        id: loc.id,
                        name: loc.name,
                        type: loc.type,
                        address: undefined,
                        isDefault: loc.id === 'loc-1'
                    }));
                const transformedProducts = products.map((p)=>({
                        id: p.id,
                        name: p.name,
                        sku: p.sku,
                        barcode: p.barcode,
                        category: p.category,
                        description: undefined,
                        cost: {
                            rolling: p.costs.base,
                            fixed: p.costs.base
                        },
                        prices: {
                            msrp: p.prices.msrp,
                            shopify: p.prices.shopify,
                            amazon: p.prices.amazon,
                            wholesale: p.prices.wholesale
                        },
                        weight: {
                            value: p.weight || 0,
                            unit: 'lbs'
                        },
                        dimensions: p.dimensions || {
                            length: 0,
                            width: 0,
                            height: 0
                        },
                        reorderPoint: p.reorderPoint,
                        supplier: p.defaultVendor,
                        skus: {
                            shopify: `SHOP-${p.sku}`,
                            amazon: `AMZ-${p.sku}`
                        },
                        createdAt: new Date(p.createdAt),
                        updatedAt: new Date(p.updatedAt)
                    }));
                const transformedInventory = inventory.map((inv)=>({
                        productId: inv.productId,
                        locationId: inv.locationId,
                        quantity: inv.quantity,
                        binLocation: inv.binLocation,
                        updatedAt: new Date()
                    }));
                // Map mockData status to AppContext status
                const mapOrderStatus = (status)=>{
                    const statusMap = {
                        'ready_to_ship': 'ready',
                        'in_progress': 'picking'
                    };
                    return statusMap[status] || status;
                };
                const transformedOrders = orders.map((o)=>({
                        id: o.id,
                        orderNumber: o.orderNumber,
                        veeqoId: o.externalId,
                        channel: o.channel,
                        status: mapOrderStatus(o.status),
                        customer: {
                            name: o.customer.name,
                            email: o.customer.email,
                            phone: o.customer.phone,
                            address: {
                                street: o.shippingAddress.line1,
                                city: o.shippingAddress.city,
                                state: o.shippingAddress.state,
                                zip: o.shippingAddress.postalCode,
                                country: o.shippingAddress.country
                            }
                        },
                        items: o.items.map((item)=>({
                                productId: item.productId || item.bundleId || '',
                                productName: item.name,
                                sku: item.sku,
                                quantity: item.quantity,
                                price: item.price,
                                cost: item.cost,
                                picked: false
                            })),
                        subtotal: o.subtotal,
                        shipping: o.shipping,
                        tax: o.tax,
                        discount: 0,
                        total: o.total,
                        cogs: o.cogs,
                        profit: o.profit,
                        margin: o.marginPercent,
                        trackingNumber: o.shipments?.[0]?.trackingNumber,
                        carrier: o.shipments?.[0]?.carrier,
                        createdAt: new Date(o.createdAt),
                        updatedAt: new Date(o.updatedAt)
                    }));
                const transformedPOs = purchaseOrders.map((po)=>({
                        id: po.id,
                        poNumber: po.poNumber,
                        supplier: po.supplier.name,
                        status: po.status,
                        currency: po.currency,
                        expectedDate: po.expectedDate ? new Date(po.expectedDate) : undefined,
                        items: po.items.map((item)=>({
                                productId: item.productId,
                                productName: item.product?.name || '',
                                sku: item.product?.sku || '',
                                quantity: item.quantity,
                                receivedQty: item.quantityReceived,
                                unitCost: item.unitCost
                            })),
                        subtotal: po.subtotal,
                        shipping: 0,
                        total: po.subtotalUSD,
                        notes: po.notes,
                        createdAt: new Date(po.createdAt),
                        updatedAt: new Date(po.createdAt)
                    }));
                const transformedWOs = workOrders.map((wo)=>({
                        id: wo.id,
                        woNumber: wo.woNumber,
                        status: wo.status,
                        outputProductId: wo.outputProductId,
                        outputProductName: wo.outputProduct?.name || '',
                        quantityToProduce: wo.outputQuantity,
                        quantityProduced: wo.status === 'completed' ? wo.outputQuantity : 0,
                        priority: 'normal',
                        components: wo.inputs.map((input)=>({
                                productId: input.productId,
                                productName: input.product?.name || '',
                                quantityRequired: input.quantityRequired,
                                quantityUsed: input.quantityUsed
                            })),
                        notes: wo.notes,
                        createdAt: new Date(wo.createdAt),
                        completedAt: wo.completedAt ? new Date(wo.completedAt) : undefined
                    }));
                const transformedBundles = bundles.map((b)=>({
                        id: b.id,
                        name: b.name,
                        sku: b.sku,
                        type: 'virtual',
                        description: b.description,
                        prices: {
                            msrp: b.prices.msrp,
                            shopify: b.prices.shopify,
                            amazon: b.prices.amazon,
                            wholesale: b.prices.wholesale || b.prices.msrp * 0.6
                        },
                        compareAtPrices: b.compareAtPrices || {
                            msrp: b.prices.msrp * 1.2,
                            shopify: (b.prices.shopify || b.prices.msrp) * 1.2,
                            amazon: (b.prices.amazon || b.prices.msrp) * 1.2
                        },
                        components: (b.components || []).map((c)=>({
                                productId: c.productId,
                                productName: c.product?.name || '',
                                quantity: c.quantity
                            })),
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }));
                const transformedBoxes = shippingBoxes.map((box)=>({
                        id: box.id,
                        name: box.name,
                        sku: box.sku,
                        innerLength: box.dimensions.length,
                        innerWidth: box.dimensions.width,
                        innerHeight: box.dimensions.height,
                        maxWeight: box.maxWeight,
                        cost: box.cost,
                        smartBoxEligible: box.isSmartBoxEligible
                    }));
                // Create mock shipments from shipped orders
                const mockShipments = transformedOrders.filter((o)=>o.status === 'shipped' || o.status === 'delivered').map((o)=>({
                        id: `ship-${o.id}`,
                        orderId: o.id,
                        orderNumber: o.orderNumber,
                        carrier: o.carrier || 'usps',
                        service: o.service || 'Priority Mail',
                        trackingNumber: o.trackingNumber || `TRK${Math.random().toString(36).substr(2, 12).toUpperCase()}`,
                        customerPaid: o.shipping,
                        actualCost: o.shipping * 0.7,
                        profit: o.shipping * 0.3,
                        weight: 2.5,
                        status: o.status === 'delivered' ? 'delivered' : 'in_transit',
                        customerName: o.customer.name,
                        customerCity: o.customer.address.city,
                        customerState: o.customer.address.state,
                        shippedAt: new Date(o.updatedAt),
                        deliveredAt: o.status === 'delivered' ? new Date() : undefined
                    }));
                // Create mock picking batches
                const mockPickingBatches = [
                    {
                        id: 'batch-1',
                        batchNumber: 'PB-001',
                        status: 'open',
                        orderIds: [],
                        createdAt: new Date()
                    },
                    {
                        id: 'batch-2',
                        batchNumber: 'PB-002',
                        status: 'in_progress',
                        orderIds: [],
                        assignedTo: 'John',
                        createdAt: new Date(Date.now() - 86400000)
                    }
                ];
                // Create mock returns
                const mockReturns = [
                    {
                        id: 'return-1',
                        returnNumber: 'RET-0001',
                        orderId: 'order-5',
                        orderNumber: 'SH-4518',
                        channel: 'shopify',
                        status: 'requested',
                        customer: {
                            name: 'James Wilson',
                            email: 'jwilson@email.com'
                        },
                        items: [
                            {
                                productId: 'prod-mic-1l',
                                productName: '1L Micro 5-0-1',
                                sku: 'CNMIC1L',
                                quantity: 1,
                                quantityReceived: 0,
                                reason: 'damaged_in_transit',
                                refundAmount: 12.99
                            }
                        ],
                        returnShipping: {},
                        refund: {
                            subtotal: 12.99,
                            shipping: 0,
                            restockingFee: 0,
                            total: 12.99
                        },
                        createdAt: new Date(Date.now() - 86400000),
                        updatedAt: new Date(Date.now() - 86400000)
                    },
                    {
                        id: 'return-2',
                        returnNumber: 'RET-0002',
                        orderId: 'order-6',
                        orderNumber: 'AZ-8833',
                        channel: 'amazon_fbm',
                        status: 'in_transit',
                        customer: {
                            name: 'Lisa Chen',
                            email: 'lchen@email.com'
                        },
                        items: [
                            {
                                productId: 'prod-bb-500',
                                productName: '500mL Bud Booster 0-1-3',
                                sku: 'CNBB500ML',
                                quantity: 2,
                                quantityReceived: 0,
                                reason: 'changed_mind',
                                refundAmount: 45.76
                            }
                        ],
                        returnShipping: {
                            trackingNumber: 'RET123456789',
                            carrier: 'usps'
                        },
                        refund: {
                            subtotal: 45.76,
                            shipping: 0,
                            restockingFee: 4.58,
                            total: 41.18
                        },
                        createdAt: new Date(Date.now() - 172800000),
                        updatedAt: new Date(Date.now() - 86400000)
                    },
                    {
                        id: 'return-3',
                        returnNumber: 'RET-0003',
                        orderId: 'order-7',
                        orderNumber: 'SH-4517',
                        channel: 'shopify',
                        status: 'received',
                        customer: {
                            name: 'Tom Brady',
                            email: 'tbrady@email.com'
                        },
                        items: [
                            {
                                productId: 'prod-gro-1l',
                                productName: '1L Grow 2-1-6',
                                sku: 'CNGRO1L',
                                quantity: 1,
                                quantityReceived: 1,
                                reason: 'defective',
                                refundAmount: 12.99
                            }
                        ],
                        returnShipping: {
                            trackingNumber: 'RET987654321',
                            carrier: 'ups'
                        },
                        refund: {
                            subtotal: 12.99,
                            shipping: 6.99,
                            restockingFee: 0,
                            total: 19.98
                        },
                        createdAt: new Date(Date.now() - 259200000),
                        updatedAt: new Date()
                    }
                ];
                // Create mock stock counts
                const mockStockCounts = [
                    {
                        id: 'sc-1',
                        countNumber: 'SC-0001',
                        name: 'Weekly Cycle Count - Zone A',
                        type: 'cycle',
                        status: 'in_progress',
                        location: 'loc-warehouse',
                        locationName: 'Texas Warehouse',
                        assignedTo: 'John',
                        items: [
                            {
                                productId: 'prod-mic-500',
                                productName: '500mL Micro 5-0-1',
                                sku: 'CNMIC500ML',
                                binLocation: 'A1-01',
                                systemQty: 150,
                                countedQty: 148,
                                variance: -2,
                                varianceValue: -10.50,
                                status: 'counted',
                                countedAt: new Date(Date.now() - 3600000)
                            },
                            {
                                productId: 'prod-mic-1l',
                                productName: '1L Micro 5-0-1',
                                sku: 'CNMIC1L',
                                binLocation: 'A1-02',
                                systemQty: 75,
                                countedQty: null,
                                variance: 0,
                                varianceValue: 0,
                                status: 'pending'
                            }
                        ],
                        summary: {
                            totalItems: 15,
                            countedItems: 8,
                            matchedItems: 6,
                            discrepancyItems: 2,
                            totalVariance: -24.50
                        },
                        startedAt: new Date(Date.now() - 86400000),
                        createdAt: new Date(Date.now() - 86400000),
                        updatedAt: new Date()
                    },
                    {
                        id: 'sc-2',
                        countNumber: 'SC-0002',
                        name: 'Monthly Full Count - December',
                        type: 'full',
                        status: 'completed',
                        location: 'loc-warehouse',
                        locationName: 'Texas Warehouse',
                        items: [],
                        summary: {
                            totalItems: 45,
                            countedItems: 45,
                            matchedItems: 42,
                            discrepancyItems: 3,
                            totalVariance: -156.75
                        },
                        startedAt: new Date(Date.now() - 604800000),
                        completedAt: new Date(Date.now() - 518400000),
                        createdAt: new Date(Date.now() - 604800000),
                        updatedAt: new Date(Date.now() - 518400000)
                    }
                ];
                // Create mock transfers
                const mockTransfers = [
                    {
                        id: 'trf-1',
                        transferNumber: 'TRF-0001',
                        status: 'in_transit',
                        fromLocation: 'loc-warehouse',
                        fromLocationName: 'Texas Warehouse',
                        toLocation: 'loc-fba',
                        toLocationName: 'FBA Inbound',
                        items: [
                            {
                                productId: 'prod-mic-500',
                                productName: '500mL Micro 5-0-1',
                                sku: 'CNMIC500ML',
                                requestedQty: 50,
                                shippedQty: 50,
                                receivedQty: 0,
                                status: 'shipped'
                            },
                            {
                                productId: 'prod-bb-500',
                                productName: '500mL Bud Booster 0-1-3',
                                sku: 'CNBB500ML',
                                requestedQty: 30,
                                shippedQty: 30,
                                receivedQty: 0,
                                status: 'shipped'
                            }
                        ],
                        notes: 'FBA replenishment shipment',
                        shippedAt: new Date(Date.now() - 172800000),
                        createdAt: new Date(Date.now() - 259200000),
                        updatedAt: new Date(Date.now() - 172800000)
                    },
                    {
                        id: 'trf-2',
                        transferNumber: 'TRF-0002',
                        status: 'received',
                        fromLocation: 'loc-warehouse',
                        fromLocationName: 'Texas Warehouse',
                        toLocation: 'loc-fba',
                        toLocationName: 'FBA Inbound',
                        items: [
                            {
                                productId: 'prod-gro-1l',
                                productName: '1L Grow 2-1-6',
                                sku: 'CNGRO1L',
                                requestedQty: 100,
                                shippedQty: 100,
                                receivedQty: 98,
                                status: 'short'
                            }
                        ],
                        notes: 'Weekly FBA restock',
                        shippedAt: new Date(Date.now() - 604800000),
                        receivedAt: new Date(Date.now() - 518400000),
                        createdAt: new Date(Date.now() - 691200000),
                        updatedAt: new Date(Date.now() - 518400000)
                    }
                ];
                // Create mock automation rules
                const mockAutomationRules = [
                    {
                        id: 'rule-1',
                        name: 'Tag Amazon Prime orders',
                        description: 'Automatically add PRIME tag to Amazon Prime orders for priority handling',
                        enabled: true,
                        trigger: {
                            type: 'order_created'
                        },
                        conditions: [
                            {
                                id: 'cond-1',
                                field: 'channel',
                                operator: 'equals',
                                value: 'amazon_fbm'
                            }
                        ],
                        actions: [
                            {
                                id: 'act-1',
                                type: 'set_order_tag',
                                config: {
                                    tag: 'PRIME'
                                }
                            },
                            {
                                id: 'act-2',
                                type: 'set_priority',
                                config: {
                                    priority: 'high'
                                }
                            }
                        ],
                        priority: 1,
                        createdAt: new Date(Date.now() - 604800000),
                        updatedAt: new Date(Date.now() - 604800000)
                    },
                    {
                        id: 'rule-2',
                        name: 'Auto-assign USPS for small orders',
                        description: 'Orders under $50 and less than 1lb ship USPS First Class',
                        enabled: true,
                        trigger: {
                            type: 'order_created'
                        },
                        conditions: [
                            {
                                id: 'cond-2',
                                field: 'total',
                                operator: 'less_than',
                                value: 50
                            }
                        ],
                        actions: [
                            {
                                id: 'act-3',
                                type: 'assign_carrier',
                                config: {
                                    carrier: 'usps'
                                }
                            },
                            {
                                id: 'act-4',
                                type: 'assign_service',
                                config: {
                                    service: 'first_class'
                                }
                            }
                        ],
                        priority: 2,
                        createdAt: new Date(Date.now() - 259200000),
                        updatedAt: new Date(Date.now() - 259200000)
                    },
                    {
                        id: 'rule-3',
                        name: 'Low stock notification',
                        description: 'Send email when stock falls below 50 units',
                        enabled: false,
                        trigger: {
                            type: 'low_stock',
                            threshold: 50
                        },
                        conditions: [],
                        actions: [
                            {
                                id: 'act-5',
                                type: 'send_notification',
                                config: {
                                    message: 'Stock is running low!'
                                }
                            },
                            {
                                id: 'act-6',
                                type: 'create_po_draft',
                                config: {
                                    quantity: 100
                                }
                            }
                        ],
                        priority: 3,
                        createdAt: new Date(Date.now() - 172800000),
                        updatedAt: new Date(Date.now() - 172800000)
                    }
                ];
                // Create mock lots
                const mockLots = [
                    {
                        id: 'lot-1',
                        lotNumber: 'LOT-20241215-001',
                        productId: 'prod-mic-500',
                        productName: '500mL Micro 5-0-1',
                        sku: 'CNMIC500ML',
                        quantity: 100,
                        reservedQty: 5,
                        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                        manufacturedDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
                        receivedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                        status: 'active',
                        locationId: 'loc-warehouse',
                        locationName: 'Texas Warehouse',
                        supplierLotNumber: 'HG-2024-1234'
                    },
                    {
                        id: 'lot-2',
                        lotNumber: 'LOT-20241201-001',
                        productId: 'prod-mic-500',
                        productName: '500mL Micro 5-0-1',
                        sku: 'CNMIC500ML',
                        quantity: 50,
                        reservedQty: 0,
                        expirationDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
                        manufacturedDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
                        receivedDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
                        status: 'active',
                        locationId: 'loc-warehouse',
                        locationName: 'Texas Warehouse',
                        supplierLotNumber: 'HG-2024-1198'
                    },
                    {
                        id: 'lot-3',
                        lotNumber: 'LOT-20241220-001',
                        productId: 'prod-gro-1l',
                        productName: '1L Grow 2-1-6',
                        sku: 'CNGRO1L',
                        quantity: 75,
                        reservedQty: 10,
                        expirationDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
                        manufacturedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                        receivedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
                        status: 'active',
                        locationId: 'loc-warehouse',
                        locationName: 'Texas Warehouse'
                    },
                    {
                        id: 'lot-4',
                        lotNumber: 'LOT-20241101-001',
                        productId: 'prod-bb-500',
                        productName: '500mL Bud Booster 0-1-3',
                        sku: 'CNBB500ML',
                        quantity: 25,
                        reservedQty: 0,
                        expirationDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                        manufacturedDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
                        receivedDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
                        status: 'expired',
                        locationId: 'loc-warehouse',
                        locationName: 'Texas Warehouse',
                        notes: 'Expired - pending disposal'
                    },
                    {
                        id: 'lot-5',
                        lotNumber: 'LOT-20241210-001',
                        productId: 'prod-mic-1l',
                        productName: '1L Micro 5-0-1',
                        sku: 'CNMIC1L',
                        quantity: 40,
                        reservedQty: 0,
                        receivedDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
                        status: 'quarantine',
                        locationId: 'loc-warehouse',
                        locationName: 'Texas Warehouse',
                        notes: 'Quality check pending - suspected contamination'
                    }
                ];
                dispatch({
                    type: 'SET_LOCATIONS',
                    payload: transformedLocations
                });
                dispatch({
                    type: 'SET_PRODUCTS',
                    payload: transformedProducts
                });
                dispatch({
                    type: 'SET_INVENTORY',
                    payload: transformedInventory
                });
                dispatch({
                    type: 'SET_ORDERS',
                    payload: transformedOrders
                });
                dispatch({
                    type: 'SET_PURCHASE_ORDERS',
                    payload: transformedPOs
                });
                dispatch({
                    type: 'SET_WORK_ORDERS',
                    payload: transformedWOs
                });
                dispatch({
                    type: 'SET_BUNDLES',
                    payload: transformedBundles
                });
                dispatch({
                    type: 'SET_BOXES',
                    payload: transformedBoxes
                });
                dispatch({
                    type: 'SET_SHIPMENTS',
                    payload: mockShipments
                });
                dispatch({
                    type: 'SET_PICKING_BATCHES',
                    payload: mockPickingBatches
                });
                dispatch({
                    type: 'SET_RETURNS',
                    payload: mockReturns
                });
                dispatch({
                    type: 'SET_STOCK_COUNTS',
                    payload: mockStockCounts
                });
                dispatch({
                    type: 'SET_TRANSFERS',
                    payload: mockTransfers
                });
                dispatch({
                    type: 'SET_AUTOMATION_RULES',
                    payload: mockAutomationRules
                });
                dispatch({
                    type: 'SET_LOTS',
                    payload: mockLots
                });
                // Create mock suppliers
                const mockSuppliers = [
                    {
                        id: 'sup-hgc',
                        name: 'HIGROCORP INC.',
                        code: 'HGC',
                        contactName: 'John Martinez',
                        email: 'john@higrocorp.com',
                        phone: '(555) 123-4567',
                        website: 'https://higrocorp.com',
                        address: {
                            street: '123 Industrial Blvd',
                            city: 'Houston',
                            state: 'TX',
                            zip: '77001',
                            country: 'US'
                        },
                        currency: 'USD',
                        paymentTerms: 'Net 30',
                        leadTimeDays: 14,
                        minimumOrderValue: 500,
                        notes: 'Primary nutrient supplier',
                        isActive: true,
                        createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
                        updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                    },
                    {
                        id: 'sup-btl',
                        name: 'Bottle Supply Co',
                        code: 'BTL',
                        contactName: 'Sarah Chen',
                        email: 'sarah@bottlesupply.com',
                        phone: '(555) 987-6543',
                        currency: 'USD',
                        paymentTerms: 'Net 15',
                        leadTimeDays: 7,
                        minimumOrderValue: 250,
                        isActive: true,
                        createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
                        updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
                    },
                    {
                        id: 'sup-lbl',
                        name: 'Label Pros International',
                        code: 'LBL',
                        contactName: 'Mike Wilson',
                        email: 'mike@labelpros.com',
                        phone: '(555) 456-7890',
                        currency: 'USD',
                        paymentTerms: 'COD',
                        leadTimeDays: 10,
                        isActive: true,
                        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
                        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                    }
                ];
                // Create mock product-supplier relationships
                const mockProductSuppliers = [
                    {
                        productId: 'prod-mic-500',
                        supplierId: 'sup-hgc',
                        supplierSku: 'HGC-MIC-500',
                        unitCost: 3.50,
                        currency: 'USD',
                        minimumOrderQty: 100,
                        leadTimeDays: 14,
                        isPrimary: true,
                        lastOrderedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                    },
                    {
                        productId: 'prod-mic-1l',
                        supplierId: 'sup-hgc',
                        supplierSku: 'HGC-MIC-1L',
                        unitCost: 5.75,
                        currency: 'USD',
                        minimumOrderQty: 50,
                        leadTimeDays: 14,
                        isPrimary: true
                    },
                    {
                        productId: 'prod-gro-1l',
                        supplierId: 'sup-hgc',
                        supplierSku: 'HGC-GRO-1L',
                        unitCost: 5.50,
                        currency: 'USD',
                        minimumOrderQty: 50,
                        isPrimary: true
                    },
                    {
                        productId: 'prod-bb-500',
                        supplierId: 'sup-hgc',
                        supplierSku: 'HGC-BB-500',
                        unitCost: 4.25,
                        currency: 'USD',
                        minimumOrderQty: 100,
                        isPrimary: true
                    }
                ];
                dispatch({
                    type: 'SET_SUPPLIERS',
                    payload: mockSuppliers
                });
                dispatch({
                    type: 'SET_PRODUCT_SUPPLIERS',
                    payload: mockProductSuppliers
                });
                dispatch({
                    type: 'SET_LOADING',
                    payload: false
                });
                dispatch({
                    type: 'SET_INITIALIZED',
                    payload: true
                });
            } catch (error) {
                console.error('Failed to initialize app data:', error);
                dispatch({
                    type: 'SET_LOADING',
                    payload: false
                });
            }
        };
        initializeData();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AppContext.Provider, {
        value: {
            state,
            dispatch
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/context/AppContext.tsx",
        lineNumber: 1858,
        columnNumber: 5
    }, this);
}
function useApp() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
function useProducts() {
    const { state } = useApp();
    return state.products;
}
function useOrders() {
    const { state } = useApp();
    return state.orders;
}
function useInventory() {
    const { state } = useApp();
    return state.inventory;
}
function useLocations() {
    const { state } = useApp();
    return state.locations;
}
function useSettings() {
    const { state } = useApp();
    return state.settings;
}
function useProductStock(productId) {
    const { state } = useApp();
    return state.inventory.filter((inv)=>inv.productId === productId).reduce((total, inv)=>total + inv.quantity, 0);
}
function useLocationStock(productId, locationId) {
    const { state } = useApp();
    const inv = state.inventory.find((i)=>i.productId === productId && i.locationId === locationId);
    return inv?.quantity || 0;
}
}),
"[project]/components/ui/Toast.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastProvider",
    ()=>ToastProvider,
    "default",
    ()=>__TURBOPACK__default__export__,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const ToastContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ToastProvider({ children }) {
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const addToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((type, message, duration = 4000)=>{
        const id = Math.random().toString(36).substring(7);
        setToasts((prev)=>[
                ...prev,
                {
                    id,
                    type,
                    message,
                    duration
                }
            ]);
        if (duration > 0) {
            setTimeout(()=>{
                setToasts((prev)=>prev.filter((t)=>t.id !== id));
            }, duration);
        }
    }, []);
    const removeToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setToasts((prev)=>prev.filter((t)=>t.id !== id));
    }, []);
    // Convenience methods
    const success = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((message, duration)=>{
        addToast('success', message, duration);
    }, [
        addToast
    ]);
    const error = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((message, duration)=>{
        addToast('error', message, duration);
    }, [
        addToast
    ]);
    const info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((message, duration)=>{
        addToast('info', message, duration);
    }, [
        addToast
    ]);
    const warning = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((message, duration)=>{
        addToast('warning', message, duration);
    }, [
        addToast
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastContext.Provider, {
        value: {
            toasts,
            addToast,
            removeToast,
            success,
            error,
            info,
            warning
        },
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastContainer, {
                toasts: toasts,
                removeToast: removeToast
            }, void 0, false, {
                fileName: "[project]/components/ui/Toast.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/Toast.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
function useToast() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
}
// Toast icons mapping
const toastIcons = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    info: 'fa-info-circle',
    warning: 'fa-exclamation-triangle'
};
// Toast colors mapping
const toastColors = {
    success: {
        bg: 'bg-emerald-500/20',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400'
    },
    error: {
        bg: 'bg-red-500/20',
        border: 'border-red-500/30',
        text: 'text-red-400'
    },
    info: {
        bg: 'bg-blue-500/20',
        border: 'border-blue-500/30',
        text: 'text-blue-400'
    },
    warning: {
        bg: 'bg-amber-500/20',
        border: 'border-amber-500/30',
        text: 'text-amber-400'
    }
};
// Toast Container Component
function ToastContainer({ toasts, removeToast }) {
    if (toasts.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-4 right-4 z-50 space-y-2 max-w-md",
        children: toasts.map((toast)=>{
            const colors = toastColors[toast.type];
            const icon = toastIcons[toast.type];
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `
              flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border backdrop-blur-sm
              animate-in slide-in-from-right-full duration-300
              ${colors.bg} ${colors.border} ${colors.text}
            `,
                role: "alert",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: `fas ${icon} flex-shrink-0`
                    }, void 0, false, {
                        fileName: "[project]/components/ui/Toast.tsx",
                        lineNumber: 135,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm flex-1",
                        children: toast.message
                    }, void 0, false, {
                        fileName: "[project]/components/ui/Toast.tsx",
                        lineNumber: 136,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>removeToast(toast.id),
                        className: "ml-2 text-slate-400 hover:text-white transition-colors flex-shrink-0",
                        "aria-label": "Dismiss",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: "fas fa-times text-xs"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/Toast.tsx",
                            lineNumber: 142,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ui/Toast.tsx",
                        lineNumber: 137,
                        columnNumber: 13
                    }, this)
                ]
            }, toast.id, true, {
                fileName: "[project]/components/ui/Toast.tsx",
                lineNumber: 126,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/components/ui/Toast.tsx",
        lineNumber: 120,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = ToastProvider;
}),
"[project]/components/ui/ConfirmDialog.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConfirmProvider",
    ()=>ConfirmProvider,
    "default",
    ()=>__TURBOPACK__default__export__,
    "useConfirm",
    ()=>useConfirm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const ConfirmContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ConfirmProvider({ children }) {
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [options, setOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [resolvePromise, setResolvePromise] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const confirm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((opts)=>{
        setOptions(opts);
        setIsOpen(true);
        return new Promise((resolve)=>{
            setResolvePromise(()=>resolve);
        });
    }, []);
    const handleConfirm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        resolvePromise?.(true);
        setIsOpen(false);
        setOptions(null);
    }, [
        resolvePromise
    ]);
    const handleCancel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        resolvePromise?.(false);
        setIsOpen(false);
        setOptions(null);
    }, [
        resolvePromise
    ]);
    // Handle escape key
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleEscape = (e)=>{
            if (e.key === 'Escape' && isOpen) {
                handleCancel();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return ()=>document.removeEventListener('keydown', handleEscape);
    }, [
        isOpen,
        handleCancel
    ]);
    // Prevent body scroll when dialog is open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return ()=>{
            document.body.style.overflow = '';
        };
    }, [
        isOpen
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ConfirmContext.Provider, {
        value: {
            confirm
        },
        children: [
            children,
            isOpen && options && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4",
                onClick: handleCancel,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        options.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `w-12 h-12 rounded-full flex items-center justify-center mb-4 ${options.destructive ? 'bg-red-500/20' : 'bg-blue-500/20'}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: `fas ${options.icon} text-xl ${options.destructive ? 'text-red-400' : 'text-blue-400'}`
                            }, void 0, false, {
                                fileName: "[project]/components/ui/ConfirmDialog.tsx",
                                lineNumber: 85,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ui/ConfirmDialog.tsx",
                            lineNumber: 82,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold text-white mb-2",
                            children: options.title
                        }, void 0, false, {
                            fileName: "[project]/components/ui/ConfirmDialog.tsx",
                            lineNumber: 92,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-400 mb-6",
                            children: options.message
                        }, void 0, false, {
                            fileName: "[project]/components/ui/ConfirmDialog.tsx",
                            lineNumber: 95,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 justify-end",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleCancel,
                                    className: "px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors",
                                    children: options.cancelText || 'Cancel'
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/ConfirmDialog.tsx",
                                    lineNumber: 99,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleConfirm,
                                    className: `px-4 py-2 rounded-lg transition-colors font-medium ${options.destructive ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}`,
                                    children: options.confirmText || 'Confirm'
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/ConfirmDialog.tsx",
                                    lineNumber: 105,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ui/ConfirmDialog.tsx",
                            lineNumber: 98,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/ConfirmDialog.tsx",
                    lineNumber: 76,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/ConfirmDialog.tsx",
                lineNumber: 72,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/ConfirmDialog.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
function useConfirm() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ConfirmContext);
    if (!context) {
        throw new Error('useConfirm must be used within ConfirmProvider');
    }
    return context.confirm;
}
const __TURBOPACK__default__export__ = ConfirmProvider;
}),
"[project]/components/Providers.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AppContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Toast.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$ConfirmDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/ConfirmDialog.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AppProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$ConfirmDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConfirmProvider"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/components/Providers.tsx",
                lineNumber: 16,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/Providers.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Providers.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = Providers;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b3fe8be4._.js.map