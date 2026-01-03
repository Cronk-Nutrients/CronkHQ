'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useOrganization } from '@/context/OrganizationContext';

interface GoogleAdsSheetsConnection {
  sheetId: string;
  sheetUrl: string;
  currency: string;
  lastSync: Date | null;
  campaignCount: number;
  summary: {
    totalSpend: number;
    totalImpressions: number;
    totalClicks: number;
    totalConversions: number;
    totalConversionValue: number;
    ctr: number;
    avgCpc: number;
    roas: number;
  } | null;
}

interface Campaign {
  id: string;
  name: string;
  cost: number;
  impressions: number;
  clicks: number;
  conversions: number;
  conversionValue: number;
  ctr: number;
  avgCpc: number;
  syncedAt: Date;
}

export default function GoogleAdsPage() {
  const { organization } = useOrganization();
  const [connection, setConnection] = useState<GoogleAdsSheetsConnection | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    if (!organization?.id) {
      setLoading(false);
      return;
    }

    try {
      // Load organization data for connection info
      const orgDoc = await getDoc(doc(db, 'organizations', organization.id));
      if (orgDoc.exists()) {
        const data = orgDoc.data();
        if (data.googleAdsSheets?.sheetId) {
          setConnection({
            sheetId: data.googleAdsSheets.sheetId,
            sheetUrl: data.googleAdsSheets.sheetUrl || '',
            currency: data.googleAdsSheets.currency || 'USD',
            lastSync: data.googleAdsSheets.lastSync?.toDate() || null,
            campaignCount: data.googleAdsSheets.campaignCount || 0,
            summary: data.googleAdsSheets.summary || null,
          });

          // Load campaigns from subcollection
          const campaignsRef = collection(db, 'organizations', organization.id, 'googleAdsCampaigns');
          const campaignsSnap = await getDocs(query(campaignsRef));
          const campaignsData: Campaign[] = [];
          campaignsSnap.forEach((doc) => {
            const d = doc.data();
            campaignsData.push({
              id: doc.id,
              name: d.name,
              cost: d.cost || 0,
              impressions: d.impressions || 0,
              clicks: d.clicks || 0,
              conversions: d.conversions || 0,
              conversionValue: d.conversionValue || 0,
              ctr: d.ctr || 0,
              avgCpc: d.avgCpc || 0,
              syncedAt: d.syncedAt?.toDate() || new Date(),
            });
          });
          // Sort by cost descending
          campaignsData.sort((a, b) => b.cost - a.cost);
          setCampaigns(campaignsData);
        }
      }
    } catch (err) {
      console.error('Error loading Google Ads data:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [organization?.id]);

  const handleSync = async () => {
    if (!organization?.id || !connection?.sheetId) return;

    setSyncing(true);
    setError(null);

    try {
      const response = await fetch('/api/google-ads/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId: organization.id,
          sheetId: connection.sheetId,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.error || 'Sync failed');
      } else {
        // Reload data
        await loadData();
      }
    } catch (err: any) {
      setError(err.message || 'Sync failed');
    } finally {
      setSyncing(false);
    }
  };

  const formatCurrency = (value: number) => {
    const currencySymbol = connection?.currency === 'AUD' ? 'A$' : '$';
    return `${currencySymbol}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString();
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // Not connected - show connect prompt
  if (!connection?.sheetId) {
    return (
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <i className="fab fa-google text-[#4285f4]"></i>
              Google Ads
            </h1>
            <p className="text-slate-400">Track ad spend, conversions, and ROAS</p>
          </div>
        </div>

        {/* Connect Prompt */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-12 text-center">
          <div className="w-20 h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <i className="fab fa-google text-blue-400 text-3xl"></i>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Connect Google Ads</h2>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            Connect your Google Ads data via Google Sheets to see your campaign performance, ad spend, conversions, and ROAS data here.
          </p>
          <Link
            href="/settings/integrations/google-ads"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#4285f4] text-white rounded-lg hover:bg-[#3367d6] transition-colors"
          >
            <i className="fab fa-google"></i>
            Connect Google Ads
          </Link>
          <p className="text-xs text-slate-500 mt-4">
            Uses Google Sheets with the Google Ads add-on - no API developer token required
          </p>
        </div>

        {/* What you'll see */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">What you'll see once connected</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fas fa-chart-line text-emerald-400"></i>
              </div>
              <div>
                <div className="text-white font-medium">Campaign Performance</div>
                <div className="text-sm text-slate-400">Track spend, conversions, and ROAS for each campaign</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fas fa-mouse-pointer text-blue-400"></i>
              </div>
              <div>
                <div className="text-white font-medium">Click & Conversion Data</div>
                <div className="text-sm text-slate-400">See CTR, CPC, and conversion rates</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fas fa-sync text-amber-400"></i>
              </div>
              <div>
                <div className="text-white font-medium">Easy Sync</div>
                <div className="text-sm text-slate-400">Sync data anytime from your Google Sheet</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const summary = connection.summary;

  // Connected - show data
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <i className="fab fa-google text-[#4285f4]"></i>
            Google Ads
          </h1>
          <p className="text-slate-400">Track ad spend, conversions, and ROAS</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSync}
            disabled={syncing}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-sm flex items-center gap-2"
          >
            <i className={`fas fa-sync ${syncing ? 'animate-spin' : ''}`}></i>
            {syncing ? 'Syncing...' : 'Sync Now'}
          </button>
          <button
            onClick={() => window.open(connection.sheetUrl || `https://docs.google.com/spreadsheets/d/${connection.sheetId}`, '_blank')}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm flex items-center gap-2"
          >
            <i className="fas fa-external-link-alt"></i>
            Open Sheet
          </button>
          <Link
            href="/settings/integrations/google-ads"
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm flex items-center gap-2"
          >
            <i className="fas fa-cog"></i>
            Settings
          </Link>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <i className="fas fa-exclamation-circle text-red-400"></i>
            <span className="text-red-400">{error}</span>
          </div>
        </div>
      )}

      {/* Last Sync Info */}
      <div className="flex items-center justify-between text-sm">
        <div className="text-slate-400">
          {connection.lastSync ? (
            <>
              <i className="fas fa-clock mr-2"></i>
              Last synced: {connection.lastSync.toLocaleString()}
            </>
          ) : (
            <>
              <i className="fas fa-info-circle mr-2"></i>
              No data synced yet - click "Sync Now" to import data
            </>
          )}
        </div>
        <div className="text-slate-500">
          {connection.campaignCount} campaigns
        </div>
      </div>

      {/* Summary Cards */}
      {summary ? (
        <>
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
              <div className="text-sm text-slate-400 mb-1">Total Spend</div>
              <div className="text-2xl font-bold text-white">{formatCurrency(summary.totalSpend)}</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
              <div className="text-sm text-slate-400 mb-1">Impressions</div>
              <div className="text-2xl font-bold text-white">{formatNumber(summary.totalImpressions)}</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
              <div className="text-sm text-slate-400 mb-1">Clicks</div>
              <div className="text-2xl font-bold text-white">{formatNumber(summary.totalClicks)}</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
              <div className="text-sm text-slate-400 mb-1">Conversions</div>
              <div className="text-2xl font-bold text-white">{formatNumber(summary.totalConversions)}</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
              <div className="text-sm text-slate-400 mb-1">ROAS</div>
              <div className="text-2xl font-bold text-emerald-400">{summary.roas.toFixed(2)}x</div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-3">
              <div className="text-xs text-slate-500">Conv. Value</div>
              <div className="text-lg font-semibold text-white">{formatCurrency(summary.totalConversionValue)}</div>
            </div>
            <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-3">
              <div className="text-xs text-slate-500">CTR</div>
              <div className="text-lg font-semibold text-white">{formatPercent(summary.ctr)}</div>
            </div>
            <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-3">
              <div className="text-xs text-slate-500">Avg. CPC</div>
              <div className="text-lg font-semibold text-white">{formatCurrency(summary.avgCpc)}</div>
            </div>
            <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-3">
              <div className="text-xs text-slate-500">Cost / Conv.</div>
              <div className="text-lg font-semibold text-white">
                {summary.totalConversions > 0
                  ? formatCurrency(summary.totalSpend / summary.totalConversions)
                  : '—'}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <i className="fas fa-sync text-amber-400 text-xl"></i>
            </div>
            <div>
              <h3 className="text-white font-medium mb-1">Sync Required</h3>
              <p className="text-slate-400 text-sm">
                Click "Sync Now" to import your Google Ads data from the connected Google Sheet.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Campaigns Table */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Campaigns</h2>
            <p className="text-sm text-slate-400">Sorted by spend (highest first)</p>
          </div>
        </div>

        {campaigns.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900/50">
                <tr className="text-left text-xs text-slate-400 uppercase tracking-wider">
                  <th className="px-4 py-3">Campaign</th>
                  <th className="px-4 py-3 text-right">Cost</th>
                  <th className="px-4 py-3 text-right">Impressions</th>
                  <th className="px-4 py-3 text-right">Clicks</th>
                  <th className="px-4 py-3 text-right">CTR</th>
                  <th className="px-4 py-3 text-right">CPC</th>
                  <th className="px-4 py-3 text-right">Conversions</th>
                  <th className="px-4 py-3 text-right">Conv. Value</th>
                  <th className="px-4 py-3 text-right">ROAS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {campaigns.map((campaign) => {
                  const campaignRoas = campaign.cost > 0 ? campaign.conversionValue / campaign.cost : 0;
                  return (
                    <tr key={campaign.id} className="hover:bg-slate-700/30">
                      <td className="px-4 py-3">
                        <div className="font-medium text-white">{campaign.name}</div>
                      </td>
                      <td className="px-4 py-3 text-right text-white">
                        {formatCurrency(campaign.cost)}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-300">
                        {formatNumber(campaign.impressions)}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-300">
                        {formatNumber(campaign.clicks)}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-300">
                        {formatPercent(campaign.ctr)}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-300">
                        {formatCurrency(campaign.avgCpc)}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-300">
                        {campaign.conversions.toFixed(1)}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-300">
                        {formatCurrency(campaign.conversionValue)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={campaignRoas >= 1 ? 'text-emerald-400' : 'text-red-400'}>
                          {campaignRoas.toFixed(2)}x
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-700/50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-bullhorn text-slate-500 text-2xl"></i>
            </div>
            <div className="text-slate-400">No campaign data available</div>
            <div className="text-sm text-slate-500 mt-1">Sync your Google Sheet to see campaigns</div>
          </div>
        )}
      </div>
    </div>
  );
}
