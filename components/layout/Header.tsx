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
  X,
} from 'lucide-react';
import { useDateRange, DateRangePreset } from '@/context/DateRangeContext';
import { useAuth } from '@/context/AuthContext';
import ScannerStatus from '@/components/ScannerStatus';
import { useNotifications } from '@/hooks/useNotifications';

interface DateRangeOption {
  value: DateRangePreset;
  label: string;
  divider?: boolean;
}

const dateRangeOptions: DateRangeOption[] = [
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'wtd', label: 'Week to Date' },
  { value: 'mtd', label: 'Month to Date' },
  { value: 'ytd', label: 'Year to Date' },
  { value: 'last7', label: 'Last 7 Days', divider: true },
  { value: 'last30', label: 'Last 30 Days' },
  { value: 'last90', label: 'Last 90 Days' },
  { value: 'custom', label: 'Custom Range', divider: true },
];

// Demo-only mock notifications
const demoNotifications = [
  {
    id: '1',
    type: 'warning',
    title: 'Low Stock Alert',
    message: 'Big Bud 1L is below reorder point (12 units)',
    time: '5 min ago',
    read: false,
  },
  {
    id: '2',
    type: 'order_created',
    title: 'New Order',
    message: 'Order #10492 received from Shopify',
    time: '12 min ago',
    read: false,
  },
  {
    id: '3',
    type: 'order_fulfilled',
    title: 'Shipment Delivered',
    message: 'Order #10485 delivered to customer',
    time: '1 hour ago',
    read: true,
  },
];

// Format relative time
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

export default function Header() {
  const { dateRange, preset, setPreset, setCustomRange } = useDateRange();
  const { isDemo } = useAuth();
  const { notifications: firestoreNotifications, unreadCount, markAsRead, markAllAsRead } = useNotifications({ limit: 10 });
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState('2 min ago');

  // Use real notifications or demo notifications
  const notifications = isDemo
    ? demoNotifications
    : firestoreNotifications.map(n => ({
        id: n.id,
        type: n.type,
        title: n.title,
        message: n.message,
        time: formatRelativeTime(n.createdAt),
        read: n.read,
      }));

  const notificationCount = isDemo ? demoNotifications.length : unreadCount;

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSync('Just now');
    }, 2000);
  };

  const handlePresetSelect = (value: DateRangePreset) => {
    if (value === 'custom') {
      // Open custom picker modal
      const today = new Date();
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(today.getDate() - 30);

      setCustomStartDate(thirtyDaysAgo.toISOString().split('T')[0]);
      setCustomEndDate(today.toISOString().split('T')[0]);
      setShowCustomPicker(true);
      setShowDateDropdown(false);
    } else {
      setPreset(value);
      setShowDateDropdown(false);
    }
  };

  const handleCustomRangeApply = () => {
    if (customStartDate && customEndDate) {
      const start = new Date(customStartDate);
      const end = new Date(customEndDate);

      if (start <= end) {
        setCustomRange(start, end);
        setShowCustomPicker(false);
      }
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
      case 'low_stock':
        return <AlertTriangle className="h-4 w-4 text-amber-400" />;
      case 'order_created':
      case 'order':
        return <ShoppingCart className="h-4 w-4 text-blue-400" />;
      case 'order_fulfilled':
      case 'order_cancelled':
      case 'success':
        return <Check className="h-4 w-4 text-emerald-400" />;
      case 'product_created':
      case 'product_deleted':
        return <Package className="h-4 w-4 text-purple-400" />;
      case 'refund_created':
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      default:
        return <Package className="h-4 w-4 text-slate-400" />;
    }
  };

  // Format date range for display
  const getDisplayLabel = () => {
    if (preset === 'custom') {
      return dateRange.label;
    }
    return dateRangeOptions.find((o) => o.value === preset)?.label || 'Select Range';
  };

  return (
    <>
      <header className="fixed top-0 left-64 right-0 z-30 h-16 bg-slate-900/80 backdrop-blur border-b border-slate-700/50">
        <div className="flex h-full items-center justify-between px-6">
          {/* Left side - Page context area (can be used by pages) */}
          <div className="flex items-center gap-4">
            {/* This space can be used for breadcrumbs or page-specific actions */}
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-4">
            {/* Scanner Status */}
            <ScannerStatus compact showLastScan={false} />

            {/* Date Range Picker */}
            <div className="relative">
              <button
                onClick={() => setShowDateDropdown(!showDateDropdown)}
                className="flex items-center gap-2 rounded-lg bg-slate-800/50 px-4 py-2 text-sm font-medium text-white border border-slate-700/50 hover:bg-slate-700/50 transition-colors"
              >
                <Calendar className="h-4 w-4 text-slate-400" />
                <span>{getDisplayLabel()}</span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>

              {showDateDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowDateDropdown(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 z-20 w-48 rounded-xl bg-slate-800 border border-slate-700/50 shadow-xl overflow-hidden">
                    {dateRangeOptions.map((option, index) => (
                      <div key={option.value}>
                        {option.divider && index > 0 && (
                          <div className="border-t border-slate-700/50 my-1" />
                        )}
                        <button
                          onClick={() => handlePresetSelect(option.value)}
                          className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                            preset === option.value
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'text-slate-300 hover:bg-slate-700/50'
                          }`}
                        >
                          {option.label}
                        </button>
                      </div>
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
                {notificationCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
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
                      {notifications.length === 0 ? (
                        <div className="px-4 py-8 text-center text-slate-400">
                          <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No notifications</p>
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            onClick={() => !isDemo && markAsRead(notification.id)}
                            className={`flex gap-3 px-4 py-3 hover:bg-slate-700/30 transition-colors border-b border-slate-700/30 last:border-0 cursor-pointer ${
                              !isDemo && notification.read ? 'opacity-60' : ''
                            }`}
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
                            {!isDemo && !notification.read && (
                              <div className="flex items-center">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                    <div className="border-t border-slate-700/50 px-4 py-2 flex gap-2">
                      <button
                        onClick={() => markAllAsRead()}
                        className="flex-1 text-center text-sm text-slate-400 hover:text-slate-300 transition-colors"
                      >
                        Mark all read
                      </button>
                      <button className="flex-1 text-center text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
                        View all
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Custom Date Range Modal */}
      {showCustomPicker && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowCustomPicker(false)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <h3 className="text-lg font-semibold text-white">Custom Date Range</h3>
              <button
                onClick={() => setShowCustomPicker(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  max={customEndDate || undefined}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  min={customStartDate || undefined}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {customStartDate && customEndDate && (
                <p className="text-sm text-slate-400">
                  Selected: {new Date(customStartDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - {new Date(customEndDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 p-4 border-t border-slate-700">
              <button
                onClick={() => setShowCustomPicker(false)}
                className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCustomRangeApply}
                disabled={!customStartDate || !customEndDate}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium rounded-lg transition-colors"
              >
                Apply Range
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
