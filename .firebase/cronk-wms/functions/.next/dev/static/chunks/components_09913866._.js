(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ui/Modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Modal",
    ()=>Modal,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
};
function Modal({ open, onClose, title, subtitle, children, footer, size = 'md', className = '' }) {
    _s();
    // Handle escape key
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Modal.useEffect": ()=>{
            const handleEscape = {
                "Modal.useEffect.handleEscape": (e)=>{
                    if (e.key === 'Escape' && open) {
                        onClose();
                    }
                }
            }["Modal.useEffect.handleEscape"];
            document.addEventListener('keydown', handleEscape);
            return ({
                "Modal.useEffect": ()=>document.removeEventListener('keydown', handleEscape)
            })["Modal.useEffect"];
        }
    }["Modal.useEffect"], [
        open,
        onClose
    ]);
    // Prevent body scroll when open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Modal.useEffect": ()=>{
            if (open) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            return ({
                "Modal.useEffect": ()=>{
                    document.body.style.overflow = '';
                }
            })["Modal.useEffect"];
        }
    }["Modal.useEffect"], [
        open
    ]);
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/70 backdrop-blur-sm",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/components/ui/Modal.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `relative bg-slate-900 border border-slate-700 rounded-2xl w-full ${sizeClasses[size]} m-4 shadow-2xl ${className}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-6 py-4 border-b border-slate-700 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-bold text-white",
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/Modal.tsx",
                                        lineNumber: 71,
                                        columnNumber: 13
                                    }, this),
                                    subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-400 mt-0.5",
                                        children: subtitle
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/Modal.tsx",
                                        lineNumber: 73,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ui/Modal.tsx",
                                lineNumber: 70,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: "fas fa-times"
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/Modal.tsx",
                                    lineNumber: 80,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/ui/Modal.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/Modal.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 max-h-[calc(100vh-16rem)] overflow-y-auto",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/components/ui/Modal.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this),
                    footer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-6 py-4 border-t border-slate-700 flex items-center justify-end gap-3",
                        children: footer
                    }, void 0, false, {
                        fileName: "[project]/components/ui/Modal.tsx",
                        lineNumber: 91,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/Modal.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/Modal.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_s(Modal, "3ubReDTFssvu4DHeldAg55cW/CI=");
_c = Modal;
const __TURBOPACK__default__export__ = Modal;
var _c;
__turbopack_context__.k.register(_c, "Modal");
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
"[project]/components/ui/Toggle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toggle",
    ()=>Toggle,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
;
const Toggle = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ checked, onChange, disabled = false, size = 'md', label, description }, ref)=>{
    const sizes = {
        sm: {
            track: 'w-9 h-5',
            thumb: 'w-4 h-4',
            translate: 'translate-x-4'
        },
        md: {
            track: 'w-11 h-6',
            thumb: 'w-5 h-5',
            translate: 'translate-x-5'
        }
    };
    const sizeStyles = sizes[size];
    const handleClick = ()=>{
        if (!disabled) {
            onChange(!checked);
        }
    };
    const handleKeyDown = (e)=>{
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };
    const toggle = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        ref: ref,
        type: "button",
        role: "switch",
        "aria-checked": checked,
        disabled: disabled,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        className: `
          relative inline-flex flex-shrink-0 cursor-pointer rounded-full
          transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2
          focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900
          ${sizeStyles.track}
          ${checked ? 'bg-emerald-500' : 'bg-slate-600'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            "aria-hidden": "true",
            className: `
            pointer-events-none inline-block rounded-full bg-white shadow-lg
            ring-0 transition duration-200 ease-in-out
            ${sizeStyles.thumb}
            ${checked ? sizeStyles.translate : 'translate-x-0.5'}
            ${size === 'md' ? 'mt-0.5' : 'mt-0.5'}
          `
        }, void 0, false, {
            fileName: "[project]/components/ui/Toggle.tsx",
            lineNumber: 62,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/ui/Toggle.tsx",
        lineNumber: 45,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
    if (label || description) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start justify-between gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1",
                    children: [
                        label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `text-white ${size === 'sm' ? 'text-sm' : 'text-base'}`,
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/components/ui/Toggle.tsx",
                            lineNumber: 80,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)),
                        description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm text-slate-400 mt-0.5",
                            children: description
                        }, void 0, false, {
                            fileName: "[project]/components/ui/Toggle.tsx",
                            lineNumber: 85,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/Toggle.tsx",
                    lineNumber: 78,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                toggle
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/Toggle.tsx",
            lineNumber: 77,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    }
    return toggle;
});
_c1 = Toggle;
Toggle.displayName = 'Toggle';
const __TURBOPACK__default__export__ = Toggle;
var _c, _c1;
__turbopack_context__.k.register(_c, "Toggle$forwardRef");
__turbopack_context__.k.register(_c1, "Toggle");
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
"[project]/components/returns/ReturnsConfig.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Returns configuration constants
__turbopack_context__.s([
    "conditionLabels",
    ()=>conditionLabels,
    "formatReturnDate",
    ()=>formatReturnDate,
    "formatReturnDateTime",
    ()=>formatReturnDateTime,
    "returnReasonLabels",
    ()=>returnReasonLabels,
    "returnStatusConfig",
    ()=>returnStatusConfig,
    "returnStatusFlow",
    ()=>returnStatusFlow
]);
const returnStatusConfig = {
    requested: {
        color: 'amber',
        icon: 'fa-clock',
        label: 'Requested'
    },
    approved: {
        color: 'blue',
        icon: 'fa-check',
        label: 'Approved'
    },
    in_transit: {
        color: 'purple',
        icon: 'fa-truck',
        label: 'In Transit'
    },
    received: {
        color: 'cyan',
        icon: 'fa-box',
        label: 'Received'
    },
    inspected: {
        color: 'indigo',
        icon: 'fa-search',
        label: 'Inspected'
    },
    refunded: {
        color: 'emerald',
        icon: 'fa-check-circle',
        label: 'Refunded'
    },
    rejected: {
        color: 'red',
        icon: 'fa-times-circle',
        label: 'Rejected'
    }
};
const returnStatusFlow = [
    'requested',
    'approved',
    'in_transit',
    'received',
    'inspected',
    'refunded'
];
const returnReasonLabels = {
    damaged_in_transit: 'Damaged in Transit',
    defective: 'Defective Product',
    wrong_item_sent: 'Wrong Item Sent',
    not_as_described: 'Not as Described',
    changed_mind: 'Changed Mind',
    ordered_wrong: 'Ordered Wrong',
    arrived_late: 'Arrived Late',
    better_price_found: 'Better Price Found',
    other: 'Other'
};
const conditionLabels = {
    new_sealed: {
        label: 'New (Sealed)',
        color: 'emerald'
    },
    new_opened: {
        label: 'New (Opened)',
        color: 'green'
    },
    like_new: {
        label: 'Like New',
        color: 'cyan'
    },
    good: {
        label: 'Good',
        color: 'blue'
    },
    damaged: {
        label: 'Damaged',
        color: 'amber'
    },
    unsellable: {
        label: 'Unsellable',
        color: 'red'
    }
};
function formatReturnDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}
function formatReturnDateTime(date) {
    return new Date(date).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/returns/ReturnsBadges.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConditionBadge",
    ()=>ConditionBadge,
    "ReturnChannelBadge",
    ()=>ReturnChannelBadge,
    "ReturnStatusBadge",
    ()=>ReturnStatusBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$returns$2f$ReturnsConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/returns/ReturnsConfig.ts [app-client] (ecmascript)");
'use client';
;
;
function ReturnStatusBadge({ status, size = 'sm' }) {
    const config = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$returns$2f$ReturnsConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["returnStatusConfig"][status];
    const sizeClasses = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm';
    const iconSize = size === 'sm' ? 'text-[10px]' : '';
    const colorClasses = {
        amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        red: 'bg-red-500/10 text-red-400 border-red-500/20'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex items-center gap-1 ${sizeClasses} ${colorClasses[config.color]} font-medium rounded-full border`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                className: `fas ${config.icon} ${iconSize}`
            }, void 0, false, {
                fileName: "[project]/components/returns/ReturnsBadges.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            config.label
        ]
    }, void 0, true, {
        fileName: "[project]/components/returns/ReturnsBadges.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_c = ReturnStatusBadge;
function ReturnChannelBadge({ channel }) {
    switch(channel){
        case 'shopify':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full border border-green-500/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: "fab fa-shopify"
                    }, void 0, false, {
                        fileName: "[project]/components/returns/ReturnsBadges.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this),
                    "Shopify"
                ]
            }, void 0, true, {
                fileName: "[project]/components/returns/ReturnsBadges.tsx",
                lineNumber: 46,
                columnNumber: 9
            }, this);
        case 'amazon_fbm':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-500/10 text-orange-400 text-xs font-medium rounded-full border border-orange-500/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: "fab fa-amazon"
                    }, void 0, false, {
                        fileName: "[project]/components/returns/ReturnsBadges.tsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, this),
                    "FBM"
                ]
            }, void 0, true, {
                fileName: "[project]/components/returns/ReturnsBadges.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, this);
        case 'amazon_fba':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-500/10 text-orange-400 text-xs font-medium rounded-full border border-orange-500/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: "fab fa-amazon"
                    }, void 0, false, {
                        fileName: "[project]/components/returns/ReturnsBadges.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this),
                    "FBA"
                ]
            }, void 0, true, {
                fileName: "[project]/components/returns/ReturnsBadges.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, this);
        case 'manual':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-500/10 text-slate-400 text-xs font-medium rounded-full border border-slate-500/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: "fas fa-user"
                    }, void 0, false, {
                        fileName: "[project]/components/returns/ReturnsBadges.tsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, this),
                    "Manual"
                ]
            }, void 0, true, {
                fileName: "[project]/components/returns/ReturnsBadges.tsx",
                lineNumber: 67,
                columnNumber: 9
            }, this);
    }
}
_c1 = ReturnChannelBadge;
function ConditionBadge({ condition }) {
    const config = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$returns$2f$ReturnsConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["conditionLabels"][condition];
    const colorClasses = {
        emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        green: 'bg-green-500/10 text-green-400 border-green-500/20',
        cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        red: 'bg-red-500/10 text-red-400 border-red-500/20'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${colorClasses[config.color]}`,
        children: config.label
    }, void 0, false, {
        fileName: "[project]/components/returns/ReturnsBadges.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, this);
}
_c2 = ConditionBadge;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ReturnStatusBadge");
__turbopack_context__.k.register(_c1, "ReturnChannelBadge");
__turbopack_context__.k.register(_c2, "ConditionBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/returns/ReturnsStats.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnStatCard",
    ()=>ReturnStatCard,
    "ReturnsStatsGrid",
    ()=>ReturnsStatsGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
// Color configuration for stat cards
const colorClasses = {
    amber: {
        border: 'border-amber-500/30',
        bg: 'bg-amber-500/10',
        ring: 'ring-amber-500/30',
        icon: 'bg-amber-500/20',
        text: 'text-amber-400',
        hover: 'hover:bg-amber-500/10'
    },
    purple: {
        border: 'border-purple-500/30',
        bg: 'bg-purple-500/10',
        ring: 'ring-purple-500/30',
        icon: 'bg-purple-500/20',
        text: 'text-purple-400',
        hover: 'hover:bg-purple-500/10'
    },
    cyan: {
        border: 'border-cyan-500/30',
        bg: 'bg-cyan-500/10',
        ring: 'ring-cyan-500/30',
        icon: 'bg-cyan-500/20',
        text: 'text-cyan-400',
        hover: 'hover:bg-cyan-500/10'
    },
    indigo: {
        border: 'border-indigo-500/30',
        bg: 'bg-indigo-500/10',
        ring: 'ring-indigo-500/30',
        icon: 'bg-indigo-500/20',
        text: 'text-indigo-400',
        hover: 'hover:bg-indigo-500/10'
    },
    emerald: {
        border: 'border-emerald-500/30',
        bg: 'bg-emerald-500/10',
        ring: 'ring-emerald-500/30',
        icon: 'bg-emerald-500/20',
        text: 'text-emerald-400',
        hover: 'hover:bg-emerald-500/10'
    },
    blue: {
        border: 'border-blue-500/30',
        bg: 'bg-blue-500/10',
        ring: 'ring-blue-500/30',
        icon: 'bg-blue-500/20',
        text: 'text-blue-400',
        hover: 'hover:bg-blue-500/10'
    }
};
function ReturnStatCard({ icon, color, value, label, onClick, isActive = false }) {
    const colors = colorClasses[color];
    const isClickable = !!onClick;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `bg-slate-800/50 backdrop-blur border rounded-xl p-4 transition-colors ${isClickable ? `cursor-pointer ${colors.hover}` : ''} ${isActive ? `${colors.border.replace('/30', '/50')} ${colors.bg} ring-2 ${colors.ring}` : colors.border}`,
        onClick: onClick,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `w-10 h-10 rounded-lg ${colors.icon} flex items-center justify-center`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: `fas ${icon} ${colors.text}`
                    }, void 0, false, {
                        fileName: "[project]/components/returns/ReturnsStats.tsx",
                        lineNumber: 91,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/returns/ReturnsStats.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `text-2xl font-bold ${colors.text}`,
                            children: value
                        }, void 0, false, {
                            fileName: "[project]/components/returns/ReturnsStats.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-slate-400",
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/components/returns/ReturnsStats.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/returns/ReturnsStats.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/returns/ReturnsStats.tsx",
            lineNumber: 89,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/returns/ReturnsStats.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
_c = ReturnStatCard;
function ReturnsStatsGrid({ children, columns = 5 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `grid grid-cols-${columns} gap-4`,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/returns/ReturnsStats.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
_c1 = ReturnsStatsGrid;
var _c, _c1;
__turbopack_context__.k.register(_c, "ReturnStatCard");
__turbopack_context__.k.register(_c1, "ReturnsStatsGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/returns/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// Returns-specific components
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$returns$2f$ReturnsConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/returns/ReturnsConfig.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$returns$2f$ReturnsBadges$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/returns/ReturnsBadges.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$returns$2f$ReturnsStats$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/returns/ReturnsStats.tsx [app-client] (ecmascript)");
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_09913866._.js.map