'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';

interface NavItem {
  href?: string;
  icon: string;
  label: string;
  badge?: number;
  children?: NavItem[];
  id?: string;
  isBrand?: boolean;
}

export default function Sidebar() {
  const pathname = usePathname();
  const { state } = useApp();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  // Calculate badges from state
  const toPickCount = state.orders.filter(o => o.status === 'to_pick' || o.status === 'picking').length;
  const toPackCount = state.orders.filter(o => o.status === 'to_pack' || o.status === 'packing').length;
  const pendingOrdersCount = state.orders.filter(o => !['shipped', 'delivered', 'cancelled', 'draft'].includes(o.status)).length;
  const draftOrdersCount = state.orders.filter(o => o.status === 'draft').length;
  const pendingReturnsCount = state.returns?.filter(r => !['refunded', 'rejected'].includes(r.status)).length || 0;
  const pendingTransfersCount = state.transfers?.filter(t => t.status === 'in_transit').length || 0;
  const pendingPOsCount = state.purchaseOrders?.filter(po => !['received', 'cancelled'].includes(po.status)).length || 0;
  const pendingWOsCount = state.workOrders?.filter(wo => !['completed', 'cancelled'].includes(wo.status)).length || 0;

  // Navigation structure
  const navItems: NavItem[] = [
    {
      href: '/',
      icon: 'fa-chart-line',
      label: 'Dashboard'
    },
    {
      id: 'inventory',
      icon: 'fa-boxes-stacked',
      label: 'Inventory',
      children: [
        { href: '/inventory', icon: 'fa-box', label: 'Products' },
        { href: '/inventory/counts', icon: 'fa-clipboard-check', label: 'Stock Counts' },
        { href: '/inventory/transfers', icon: 'fa-exchange-alt', label: 'Transfers', badge: pendingTransfersCount },
        { href: '/inventory/suppliers', icon: 'fa-truck-loading', label: 'Suppliers' },
        { href: '/inventory/bundles', icon: 'fa-layer-group', label: 'Bundles & Kits' },
      ]
    },
    {
      id: 'orders',
      icon: 'fa-shopping-cart',
      label: 'Orders',
      badge: pendingOrdersCount,
      children: [
        { href: '/orders', icon: 'fa-list', label: 'All Orders', badge: pendingOrdersCount },
        { href: '/orders/drafts', icon: 'fa-file-alt', label: 'Draft Orders', badge: draftOrdersCount },
        { href: '/orders/returns', icon: 'fa-undo', label: 'Returns', badge: pendingReturnsCount },
      ]
    },
    {
      id: 'fulfillment',
      icon: 'fa-shipping-fast',
      label: 'Fulfillment',
      badge: toPickCount + toPackCount,
      children: [
        { href: '/fulfillment', icon: 'fa-clipboard-list', label: 'Overview' },
        { href: '/fulfillment/pick', icon: 'fa-hand-pointer', label: 'Pick Station', badge: toPickCount },
        { href: '/fulfillment/pack', icon: 'fa-box-open', label: 'Pack Station', badge: toPackCount },
        { href: '/fulfillment/fba', icon: 'fa-amazon', label: 'FBA Prep', isBrand: true },
        { href: '/fulfillment/shipping', icon: 'fa-truck', label: 'Shipping' },
      ]
    },
    {
      id: 'operations',
      icon: 'fa-cogs',
      label: 'Operations',
      badge: pendingPOsCount + pendingWOsCount,
      children: [
        { href: '/operations/purchase-orders', icon: 'fa-file-invoice', label: 'Purchase Orders', badge: pendingPOsCount },
        { href: '/operations/work-orders', icon: 'fa-industry', label: 'Work Orders', badge: pendingWOsCount },
      ]
    },
    {
      id: 'marketing',
      icon: 'fa-bullhorn',
      label: 'Marketing',
      children: [
        { href: '/marketing', icon: 'fa-chart-line', label: 'Dashboard' },
        { href: '/marketing/google-ads', icon: 'fa-google', label: 'Google Ads', isBrand: true },
        { href: '/marketing/meta-ads', icon: 'fa-meta', label: 'Meta Ads', isBrand: true },
        { href: '/marketing/amazon-ads', icon: 'fa-amazon', label: 'Amazon Ads', isBrand: true },
        { href: '/marketing/tiktok-ads', icon: 'fa-tiktok', label: 'TikTok Ads', isBrand: true },
        { href: '/marketing/email', icon: 'fa-envelope', label: 'Email Marketing' },
      ]
    },
  ];

  const bottomNavItems: NavItem[] = [
    {
      id: 'reports',
      icon: 'fa-chart-pie',
      label: 'Reports',
      children: [
        { href: '/reports', icon: 'fa-chart-line', label: 'Overview' },
        { href: '/reports/sales', icon: 'fa-dollar-sign', label: 'Sales' },
        { href: '/reports/inventory', icon: 'fa-boxes-stacked', label: 'Inventory' },
        { href: '/reports/shipping', icon: 'fa-truck-fast', label: 'Shipping' },
        { href: '/reports/returns', icon: 'fa-rotate-left', label: 'Returns' },
        { href: '/reports/marketing', icon: 'fa-bullhorn', label: 'Marketing' },
        { href: '/reports/financial', icon: 'fa-file-invoice-dollar', label: 'Financial' },
        { href: '/reports/custom', icon: 'fa-wand-magic-sparkles', label: 'Custom Builder' },
        { href: '/reports/scheduled', icon: 'fa-clock', label: 'Scheduled' },
      ]
    },
    { href: '/settings', icon: 'fa-cog', label: 'Settings' },
  ];

  // Auto-expand menu based on current route
  useEffect(() => {
    [...navItems, ...bottomNavItems].forEach(item => {
      if (item.children && item.id) {
        const isActive = item.children.some(child =>
          child.href === pathname || pathname.startsWith(child.href + '/')
        );
        if (isActive && !expandedMenus.includes(item.id)) {
          setExpandedMenus(prev => [...prev, item.id!]);
        }
      }
    });
  }, [pathname]);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const isActiveRoute = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  const isParentActive = (item: NavItem) => {
    if (!item.children) return false;
    return item.children.some(child => child.href && isActiveRoute(child.href));
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-slate-900/80 border-r border-slate-700/50 flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
            <i className="fas fa-leaf text-white text-lg"></i>
          </div>
          <div>
            <h1 className="font-bold text-white text-lg">Cronk WMS</h1>
            <p className="text-xs text-slate-400">Inventory Management</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <div key={item.id || item.href}>
            {item.children ? (
              // Expandable menu
              <>
                <button
                  onClick={() => toggleMenu(item.id!)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isParentActive(item)
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <i className={`fas ${item.icon} w-5`}></i>
                  <span className="font-medium">{item.label}</span>
                  {(item.badge ?? 0) > 0 && (
                    <span className="ml-auto mr-2 bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  <i className={`fas fa-chevron-${expandedMenus.includes(item.id!) ? 'down' : 'right'} text-xs text-slate-500 ${(item.badge ?? 0) > 0 ? '' : 'ml-auto'}`}></i>
                </button>

                {/* Sub-menu */}
                {expandedMenus.includes(item.id!) && (
                  <div className="ml-4 mt-1 space-y-1 border-l border-slate-700/50 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href!}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm ${
                          isActiveRoute(child.href!)
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                        }`}
                      >
                        <i className={`${child.isBrand ? 'fab' : 'fas'} ${child.icon} w-4 text-xs`}></i>
                        <span>{child.label}</span>
                        {(child.badge ?? 0) > 0 && (
                          <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                            child.label.includes('Pick') ? 'bg-amber-500/20 text-amber-400' :
                            child.label.includes('Pack') ? 'bg-blue-500/20 text-blue-400' :
                            child.label.includes('Return') ? 'bg-purple-500/20 text-purple-400' :
                            child.label.includes('Draft') ? 'bg-slate-500/20 text-slate-400' :
                            'bg-slate-500/20 text-slate-400'
                          }`}>
                            {child.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              // Single menu item
              <Link
                href={item.href!}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActiveRoute(item.href!)
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <i className={`fas ${item.icon} w-5`}></i>
                <span className="font-medium">{item.label}</span>
                {(item.badge ?? 0) > 0 && (
                  <span className="ml-auto bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            )}
          </div>
        ))}

        {/* Divider */}
        <div className="my-4 border-t border-slate-700/50"></div>

        {/* Bottom Nav Items */}
        {bottomNavItems.map((item) => (
          <div key={item.id || item.href}>
            {item.children ? (
              // Expandable menu
              <>
                <button
                  onClick={() => toggleMenu(item.id!)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isParentActive(item)
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <i className={`fas ${item.icon} w-5`}></i>
                  <span className="font-medium">{item.label}</span>
                  <i className={`fas fa-chevron-${expandedMenus.includes(item.id!) ? 'down' : 'right'} text-xs text-slate-500 ml-auto`}></i>
                </button>

                {/* Sub-menu */}
                {expandedMenus.includes(item.id!) && (
                  <div className="ml-4 mt-1 space-y-1 border-l border-slate-700/50 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href!}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm ${
                          isActiveRoute(child.href!)
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                        }`}
                      >
                        <i className={`${child.isBrand ? 'fab' : 'fas'} ${child.icon} w-4 text-xs`}></i>
                        <span>{child.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              // Single menu item
              <Link
                href={item.href!}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActiveRoute(item.href!)
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <i className={`fas ${item.icon} w-5`}></i>
                <span>{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">JC</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">John Cronk</div>
            <div className="text-xs text-slate-400 truncate">Admin</div>
          </div>
          <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg">
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </aside>
  );
}
