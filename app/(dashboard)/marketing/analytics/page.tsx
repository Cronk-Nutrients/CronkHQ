'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useOrganization } from '@/context/OrganizationContext';

interface GoogleAnalyticsConnection {
  isConnected: boolean;
  propertyId: string | null;
  propertyName: string | null;
  measurementId: string | null;
  connectedAt: Date | null;
  email: string | null;
}

interface AnalyticsData {
  activeUsers: number;
  sessions: number;
  pageViews: number;
  avgSessionDuration: number;
  bounceRate: number;
  newUsers: number;
  totalUsers: number;
  engagedSessions: number;
}

interface RealtimeData {
  activeUsers: number;
  pageViews: number;
  eventCount: number;
  screenPageViews: number;
}

type DateRangeType = 'today' | 'realtime' | '7' | '30' | '90' | 'custom';

export default function AnalyticsPage() {
  const { organization } = useOrganization();
  const [connection, setConnection] = useState<GoogleAnalyticsConnection | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [realtimeData, setRealtimeData] = useState<RealtimeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRangeType>('30');
  const [customStartDate, setCustomStartDate] = useState<string>('');
  const [customEndDate, setCustomEndDate] = useState<string>('');
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  useEffect(() => {
    async function loadConnection() {
      if (!organization?.id) {
        setLoading(false);
        return;
      }

      try {
        const orgDoc = await getDoc(doc(db, 'organizations', organization.id));
        if (orgDoc.exists()) {
          const data = orgDoc.data();
          if (data.googleAnalytics) {
            setConnection({
              isConnected: data.googleAnalytics.isConnected || false,
              propertyId: data.googleAnalytics.propertyId || null,
              propertyName: data.googleAnalytics.propertyName || null,
              measurementId: data.googleAnalytics.measurementId || null,
              connectedAt: data.googleAnalytics.connectedAt?.toDate() || null,
              email: data.googleAnalytics.email || null,
            });
          }
        }
      } catch (err) {
        console.error('Error loading Google Analytics connection:', err);
      } finally {
        setLoading(false);
      }
    }

    loadConnection();
  }, [organization?.id]);

  // Fetch analytics data when connected
  const fetchAnalyticsData = useCallback(async () => {
    if (!organization?.id || !connection?.isConnected) return;

    // Don't fetch regular data for realtime view
    if (dateRange === 'realtime') return;

    setDataLoading(true);
    setDataError(null);

    try {
      const body: any = {
        organizationId: organization.id,
      };

      if (dateRange === 'custom' && customStartDate && customEndDate) {
        body.startDate = customStartDate;
        body.endDate = customEndDate;
      } else if (dateRange === 'today') {
        body.dateRange = '0'; // Today only
      } else {
        body.dateRange = dateRange;
      }

      const response = await fetch('/api/google/analytics/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (result.success) {
        setAnalyticsData(result.data);
      } else {
        setDataError(result.error || 'Failed to load analytics data');
      }
    } catch (err: any) {
      setDataError(err.message || 'Failed to fetch analytics data');
    } finally {
      setDataLoading(false);
    }
  }, [organization?.id, connection?.isConnected, dateRange, customStartDate, customEndDate]);

  // Fetch realtime data
  const fetchRealtimeData = useCallback(async () => {
    if (!organization?.id || !connection?.isConnected || dateRange !== 'realtime') return;

    try {
      const response = await fetch('/api/google/analytics/realtime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId: organization.id,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setRealtimeData(result.data);
      }
    } catch (err) {
      console.error('Realtime fetch error:', err);
    }
  }, [organization?.id, connection?.isConnected, dateRange]);

  useEffect(() => {
    fetchAnalyticsData();
  }, [fetchAnalyticsData]);

  // Auto-refresh realtime data every 30 seconds
  useEffect(() => {
    if (dateRange === 'realtime') {
      fetchRealtimeData();
      const interval = setInterval(fetchRealtimeData, 30000);
      return () => clearInterval(interval);
    }
  }, [dateRange, fetchRealtimeData]);

  const handleDateRangeChange = (value: DateRangeType) => {
    if (value === 'custom') {
      setShowCustomPicker(true);
    } else {
      setShowCustomPicker(false);
      setDateRange(value);
    }
  };

  const applyCustomRange = () => {
    if (customStartDate && customEndDate) {
      setDateRange('custom');
      setShowCustomPicker(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // Not connected - show connect prompt
  if (!connection?.isConnected) {
    return (
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <Link href="/marketing" className="hover:text-white">Marketing</Link>
            <i className="fas fa-chevron-right text-xs"></i>
            <span className="text-white">Analytics</span>
          </div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <i className="fas fa-chart-line text-orange-400"></i>
            Google Analytics
          </h1>
          <p className="text-slate-400">Track website traffic and user behavior</p>
        </div>

        {/* Connect Prompt */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-12 text-center">
          <div className="w-20 h-20 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-chart-line text-orange-400 text-3xl"></i>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Connect Google Analytics</h2>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            Connect your Google Analytics 4 property to see website traffic, user behavior, and conversion data here.
          </p>
          <Link
            href="/settings/integrations/google-analytics"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-400 transition-colors"
          >
            <i className="fab fa-google"></i>
            Connect Google Analytics
          </Link>
        </div>

        {/* What you'll see */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">What you'll see once connected</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fas fa-users text-blue-400"></i>
              </div>
              <div>
                <div className="text-white font-medium">User Metrics</div>
                <div className="text-sm text-slate-400">Active users, sessions, page views</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fas fa-bullseye text-emerald-400"></i>
              </div>
              <div>
                <div className="text-white font-medium">Engagement</div>
                <div className="text-sm text-slate-400">Session duration, bounce rate</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fas fa-route text-purple-400"></i>
              </div>
              <div>
                <div className="text-white font-medium">Traffic Sources</div>
                <div className="text-sm text-slate-400">Where your visitors come from</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Connected - show analytics data
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
          <Link href="/marketing" className="hover:text-white">Marketing</Link>
          <i className="fas fa-chevron-right text-xs"></i>
          <span className="text-white">Analytics</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
              <i className="fas fa-chart-line text-orange-400 text-xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Google Analytics</h1>
              <p className="text-sm text-slate-400">{connection.propertyName || 'GA4 Property'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Date Range Selector */}
            <div className="relative">
              <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-lg p-1">
                <button
                  onClick={() => handleDateRangeChange('realtime')}
                  className={`px-3 py-1.5 rounded text-sm transition-colors ${
                    dateRange === 'realtime'
                      ? 'bg-emerald-500 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <i className="fas fa-circle text-xs mr-1.5 animate-pulse"></i>
                  Live
                </button>
                <button
                  onClick={() => handleDateRangeChange('today')}
                  className={`px-3 py-1.5 rounded text-sm transition-colors ${
                    dateRange === 'today'
                      ? 'bg-emerald-500 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => handleDateRangeChange('7')}
                  className={`px-3 py-1.5 rounded text-sm transition-colors ${
                    dateRange === '7'
                      ? 'bg-emerald-500 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  7D
                </button>
                <button
                  onClick={() => handleDateRangeChange('30')}
                  className={`px-3 py-1.5 rounded text-sm transition-colors ${
                    dateRange === '30'
                      ? 'bg-emerald-500 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  30D
                </button>
                <button
                  onClick={() => handleDateRangeChange('90')}
                  className={`px-3 py-1.5 rounded text-sm transition-colors ${
                    dateRange === '90'
                      ? 'bg-emerald-500 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  90D
                </button>
                <button
                  onClick={() => handleDateRangeChange('custom')}
                  className={`px-3 py-1.5 rounded text-sm transition-colors ${
                    dateRange === 'custom'
                      ? 'bg-emerald-500 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <i className="fas fa-calendar mr-1.5"></i>
                  Custom
                </button>
              </div>

              {/* Custom Date Picker Dropdown */}
              {showCustomPicker && (
                <div className="absolute top-full right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-xl z-50 min-w-[300px]">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-slate-400 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1">End Date</label>
                      <input
                        type="date"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={applyCustomRange}
                        disabled={!customStartDate || !customEndDate}
                        className="flex-1 px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Apply
                      </button>
                      <button
                        onClick={() => setShowCustomPicker(false)}
                        className="px-3 py-2 text-slate-400 hover:text-white text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Show selected custom range */}
            {dateRange === 'custom' && customStartDate && customEndDate && (
              <span className="text-sm text-slate-400">
                {new Date(customStartDate).toLocaleDateString()} - {new Date(customEndDate).toLocaleDateString()}
              </span>
            )}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-lg">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-400 text-sm">Connected</span>
            </div>
            <button
              onClick={() => window.open('https://analytics.google.com', '_blank')}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm flex items-center gap-2"
            >
              <i className="fas fa-external-link-alt"></i>
              Open Analytics
            </button>
            <Link
              href="/settings/integrations/google-analytics"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-sm"
            >
              Settings
            </Link>
          </div>
        </div>
      </div>

      {/* Connected Account Info */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
        <div className="grid grid-cols-4 gap-6 text-sm">
          <div>
            <div className="text-slate-400">Property</div>
            <div className="text-white font-medium">{connection.propertyName}</div>
          </div>
          <div>
            <div className="text-slate-400">Property ID</div>
            <div className="text-white font-mono">{connection.propertyId}</div>
          </div>
          <div>
            <div className="text-slate-400">Measurement ID</div>
            <div className="text-orange-400 font-mono">{connection.measurementId || 'N/A'}</div>
          </div>
          <div>
            <div className="text-slate-400">Connected Account</div>
            <div className="text-white">{connection.email}</div>
          </div>
        </div>
      </div>

      {/* Data Error */}
      {dataError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <i className="fas fa-exclamation-circle text-red-400"></i>
            <div>
              <span className="text-white font-medium">Error loading data:</span>
              <span className="text-slate-400 ml-2">{dataError}</span>
            </div>
            <button
              onClick={() => setDateRange(dateRange)}
              className="ml-auto px-3 py-1 bg-red-500/20 text-red-400 rounded text-sm hover:bg-red-500/30"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {dataLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          <span className="ml-3 text-slate-400">Loading analytics data...</span>
        </div>
      )}

      {/* Realtime View */}
      {dateRange === 'realtime' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              <h3 className="text-lg font-semibold text-white">Live Activity</h3>
              <span className="text-sm text-slate-400">Updates every 30 seconds</span>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-800/50 rounded-xl p-6 text-center">
                <div className="text-6xl font-bold text-emerald-400 mb-2">
                  {realtimeData?.activeUsers ?? '-'}
                </div>
                <div className="text-slate-400">Active Users Right Now</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">
                    {realtimeData?.screenPageViews ?? '-'}
                  </div>
                  <div className="text-sm text-slate-400">Page Views (30 min)</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">
                    {realtimeData?.eventCount ?? '-'}
                  </div>
                  <div className="text-sm text-slate-400">Events (30 min)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
            <div className="text-center text-slate-400">
              <i className="fas fa-info-circle mr-2"></i>
              Realtime data shows users currently active on your site.
              Switch to a date range to see historical metrics.
            </div>
          </div>

          {/* GA vs Shopify Note */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <i className="fas fa-lightbulb text-amber-400 mt-0.5"></i>
              <div>
                <div className="text-amber-400 font-medium text-sm mb-1">Why does GA show different numbers than Shopify?</div>
                <div className="text-slate-400 text-sm">
                  Google Analytics counts "active users" within a <span className="text-white">30-minute window</span>,
                  while Shopify's Live View uses a <span className="text-white">5-minute window</span>.
                  This means GA will typically show more visitors at any given time.
                  Both numbers are accurate—they just use different time windows.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Primary Metrics */}
      {dateRange !== 'realtime' && analyticsData && !dataLoading && (
        <>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Active Users</span>
                <i className="fas fa-users text-blue-400"></i>
              </div>
              <div className="text-3xl font-bold text-white">{formatNumber(analyticsData.activeUsers)}</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Sessions</span>
                <i className="fas fa-chart-bar text-emerald-400"></i>
              </div>
              <div className="text-3xl font-bold text-white">{formatNumber(analyticsData.sessions)}</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Page Views</span>
                <i className="fas fa-eye text-purple-400"></i>
              </div>
              <div className="text-3xl font-bold text-white">{formatNumber(analyticsData.pageViews)}</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Avg. Session Duration</span>
                <i className="fas fa-clock text-amber-400"></i>
              </div>
              <div className="text-3xl font-bold text-white">{formatDuration(analyticsData.avgSessionDuration)}</div>
            </div>
          </div>

          {/* Secondary Metrics */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-4">
              <div className="text-sm text-slate-500 mb-1">Bounce Rate</div>
              <div className="text-xl font-semibold text-white">{analyticsData.bounceRate.toFixed(1)}%</div>
            </div>
            <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-4">
              <div className="text-sm text-slate-500 mb-1">New Users</div>
              <div className="text-xl font-semibold text-white">{formatNumber(analyticsData.newUsers)}</div>
            </div>
            <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-4">
              <div className="text-sm text-slate-500 mb-1">Total Users</div>
              <div className="text-xl font-semibold text-white">{formatNumber(analyticsData.totalUsers)}</div>
            </div>
            <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-4">
              <div className="text-sm text-slate-500 mb-1">Engaged Sessions</div>
              <div className="text-xl font-semibold text-white">{formatNumber(analyticsData.engagedSessions)}</div>
            </div>
          </div>

          {/* Engagement Rate */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Engagement Overview</h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-slate-400 mb-2">Engagement Rate</div>
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold text-emerald-400">
                    {analyticsData.sessions > 0
                      ? ((analyticsData.engagedSessions / analyticsData.sessions) * 100).toFixed(1)
                      : 0}%
                  </div>
                  <div className="flex-1 bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full"
                      style={{
                        width: `${analyticsData.sessions > 0
                          ? (analyticsData.engagedSessions / analyticsData.sessions) * 100
                          : 0}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-2">New vs Returning</div>
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold text-blue-400">
                    {analyticsData.totalUsers > 0
                      ? ((analyticsData.newUsers / analyticsData.totalUsers) * 100).toFixed(0)
                      : 0}% new
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-2">Pages per Session</div>
                <div className="text-2xl font-bold text-purple-400">
                  {analyticsData.sessions > 0
                    ? (analyticsData.pageViews / analyticsData.sessions).toFixed(1)
                    : 0}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* No data yet */}
      {dateRange !== 'realtime' && !analyticsData && !dataLoading && !dataError && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-12 text-center">
          <div className="w-16 h-16 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-chart-line text-orange-400 text-2xl"></i>
          </div>
          <div className="text-white font-medium">Loading analytics data...</div>
          <div className="text-sm text-slate-500 mt-1">This may take a moment</div>
        </div>
      )}

      {/* What's being tracked */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Events Being Tracked</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { icon: 'fa-eye', label: 'Page Views', desc: 'All pages across your application' },
            { icon: 'fa-shopping-cart', label: 'Order Synced', desc: 'When orders are imported from Shopify' },
            { icon: 'fa-box', label: 'Product Imported', desc: 'When products are added' },
            { icon: 'fa-barcode', label: 'Barcode Scanned', desc: 'Scanner usage tracking' },
            { icon: 'fa-truck', label: 'Order Shipped', desc: 'When orders are fulfilled' },
            { icon: 'fa-check-circle', label: 'Order Picked', desc: 'When orders are picked' },
          ].map((event) => (
            <div key={event.label} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
              <div className="w-8 h-8 bg-orange-500/20 rounded flex items-center justify-center">
                <i className={`fas ${event.icon} text-orange-400 text-sm`}></i>
              </div>
              <div>
                <div className="text-white text-sm font-medium">{event.label}</div>
                <div className="text-xs text-slate-500">{event.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
