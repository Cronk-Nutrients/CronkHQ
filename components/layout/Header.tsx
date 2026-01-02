'use client';

import { useState } from 'react';
import {
  Bell,
  RefreshCw,
  Calendar,
  ChevronDown,
  Check,
  AlertTriangle,
  Package,
  ShoppingCart,
} from 'lucide-react';

type DateRange = 'today' | 'wtd' | 'mtd' | 'ytd' | 'custom';

interface DateRangeOption {
  value: DateRange;
  label: string;
}

const dateRangeOptions: DateRangeOption[] = [
  { value: 'today', label: 'Today' },
  { value: 'wtd', label: 'Week to Date' },
  { value: 'mtd', label: 'Month to Date' },
  { value: 'ytd', label: 'Year to Date' },
  { value: 'custom', label: 'Custom Range' },
];

const mockNotifications = [
  {
    id: 1,
    type: 'warning',
    title: 'Low Stock Alert',
    message: 'Big Bud 1L is below reorder point (12 units)',
    time: '5 min ago',
  },
  {
    id: 2,
    type: 'order',
    title: 'New Order',
    message: 'Order #10492 received from Shopify',
    time: '12 min ago',
  },
  {
    id: 3,
    type: 'success',
    title: 'Shipment Delivered',
    message: 'Order #10485 delivered to customer',
    time: '1 hour ago',
  },
];

export default function Header() {
  const [dateRange, setDateRange] = useState<DateRange>('mtd');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState('2 min ago');

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSync('Just now');
    }, 2000);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-400" />;
      case 'order':
        return <ShoppingCart className="h-4 w-4 text-blue-400" />;
      case 'success':
        return <Check className="h-4 w-4 text-emerald-400" />;
      default:
        return <Package className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <header className="fixed top-0 left-64 right-0 z-30 h-16 bg-slate-900/80 backdrop-blur border-b border-slate-700/50">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left side - Page context area (can be used by pages) */}
        <div className="flex items-center gap-4">
          {/* This space can be used for breadcrumbs or page-specific actions */}
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-4">
          {/* Date Range Picker */}
          <div className="relative">
            <button
              onClick={() => setShowDateDropdown(!showDateDropdown)}
              className="flex items-center gap-2 rounded-lg bg-slate-800/50 px-4 py-2 text-sm font-medium text-white border border-slate-700/50 hover:bg-slate-700/50 transition-colors"
            >
              <Calendar className="h-4 w-4 text-slate-400" />
              {dateRangeOptions.find((o) => o.value === dateRange)?.label}
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>

            {showDateDropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowDateDropdown(false)}
                />
                <div className="absolute right-0 top-full mt-2 z-20 w-48 rounded-xl bg-slate-800 border border-slate-700/50 shadow-xl overflow-hidden">
                  {dateRangeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setDateRange(option.value);
                        setShowDateDropdown(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                        dateRange === option.value
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'text-slate-300 hover:bg-slate-700/50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sync Status */}
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="flex items-center gap-2 rounded-lg bg-slate-800/50 px-4 py-2 text-sm font-medium border border-slate-700/50 hover:bg-slate-700/50 transition-colors disabled:opacity-50"
          >
            <RefreshCw
              className={`h-4 w-4 text-emerald-400 ${isSyncing ? 'animate-spin' : ''}`}
            />
            <span className="text-slate-300">
              {isSyncing ? 'Syncing...' : `Synced ${lastSync}`}
            </span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 transition-colors"
            >
              <Bell className="h-5 w-5 text-slate-400" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                {mockNotifications.length}
              </span>
            </button>

            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 top-full mt-2 z-20 w-80 rounded-xl bg-slate-800 border border-slate-700/50 shadow-xl overflow-hidden">
                  <div className="border-b border-slate-700/50 px-4 py-3">
                    <h3 className="text-sm font-semibold text-white">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {mockNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex gap-3 px-4 py-3 hover:bg-slate-700/30 transition-colors border-b border-slate-700/30 last:border-0"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700/50">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white">
                            {notification.title}
                          </p>
                          <p className="text-xs text-slate-400 truncate">
                            {notification.message}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-slate-700/50 px-4 py-2">
                    <button className="w-full text-center text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
                      View all notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
