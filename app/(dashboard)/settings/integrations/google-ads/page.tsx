'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { useOrganization } from '@/context/OrganizationContext'
import { useToast } from '@/components/ui/Toast'
import Link from 'next/link'

interface GoogleAdsConnection {
  isConnected: boolean
  sheetUrl: string | null
  sheetId: string | null
  lastSync: Date | null
  campaignCount: number
  currency: string
}

export default function GoogleAdsSetupPage() {
  const { organization } = useOrganization()
  const { addToast } = useToast()

  const [connection, setConnection] = useState<GoogleAdsConnection>({
    isConnected: false,
    sheetUrl: null,
    sheetId: null,
    lastSync: null,
    campaignCount: 0,
    currency: 'USD',
  })

  const [sheetUrl, setSheetUrl] = useState('')
  const [currency, setCurrency] = useState('CAD')
  const [loading, setLoading] = useState(true)
  const [testing, setTesting] = useState(false)
  const [saving, setSaving] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [testResult, setTestResult] = useState<any>(null)
  const [showInstructions, setShowInstructions] = useState(true)

  // Load existing connection
  useEffect(() => {
    async function loadConnection() {
      if (!organization?.id) {
        setLoading(false)
        return
      }

      try {
        const orgDoc = await getDoc(doc(db, 'organizations', organization.id))
        if (orgDoc.exists()) {
          const data = orgDoc.data()
          if (data.googleAdsSheets) {
            setConnection({
              isConnected: data.googleAdsSheets.isConnected || false,
              sheetUrl: data.googleAdsSheets.sheetUrl || null,
              sheetId: data.googleAdsSheets.sheetId || null,
              lastSync: data.googleAdsSheets.lastSync?.toDate() || null,
              campaignCount: data.googleAdsSheets.campaignCount || 0,
              currency: data.googleAdsSheets.currency || 'USD',
            })
            setSheetUrl(data.googleAdsSheets.sheetUrl || '')
            setCurrency(data.googleAdsSheets.currency || 'CAD')
            if (data.googleAdsSheets.isConnected) {
              setShowInstructions(false)
            }
          }
        }
      } catch (err) {
        console.error('Error loading connection:', err)
      } finally {
        setLoading(false)
      }
    }

    loadConnection()
  }, [organization?.id])

  // Extract sheet ID from URL
  const extractSheetId = (url: string): string | null => {
    const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)
    return match ? match[1] : null
  }

  // Test connection
  const handleTestConnection = async () => {
    const sheetId = extractSheetId(sheetUrl)
    if (!sheetId) {
      addToast('error', 'Invalid Google Sheets URL. Please paste the full URL.')
      return
    }

    setTesting(true)
    setTestResult(null)

    try {
      const response = await fetch('/api/google-ads/test-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sheetId,
          organizationId: organization?.id,
        }),
      })

      const data = await response.json()
      setTestResult(data)

      if (data.success) {
        addToast('success', `Found ${data.campaignCount} campaigns!`)
      } else {
        addToast('error', data.error || 'Failed to read sheet')
      }
    } catch (err: any) {
      setTestResult({ success: false, error: err.message })
      addToast('error', 'Failed to test connection')
    } finally {
      setTesting(false)
    }
  }

  // Save connection
  const handleSaveConnection = async () => {
    if (!organization?.id || !testResult?.success) return

    const sheetId = extractSheetId(sheetUrl)
    if (!sheetId) return

    setSaving(true)

    try {
      await setDoc(doc(db, 'organizations', organization.id), {
        googleAdsSheets: {
          isConnected: true,
          sheetUrl: sheetUrl,
          sheetId: sheetId,
          currency: currency,
          campaignCount: testResult.campaignCount,
          connectedAt: serverTimestamp(),
          lastSync: serverTimestamp(),
        },
      }, { merge: true })

      setConnection({
        isConnected: true,
        sheetUrl: sheetUrl,
        sheetId: sheetId,
        lastSync: new Date(),
        campaignCount: testResult.campaignCount,
        currency: currency,
      })

      setShowInstructions(false)
      addToast('success', 'Google Ads connection saved!')

      // Trigger initial sync
      handleSync()
    } catch (err: any) {
      addToast('error', err.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  // Manual sync
  const handleSync = async () => {
    if (!organization?.id || !connection.sheetId) return

    setSyncing(true)

    try {
      const response = await fetch('/api/google-ads/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId: organization.id,
          sheetId: connection.sheetId,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setConnection(prev => ({
          ...prev,
          lastSync: new Date(),
          campaignCount: data.campaignCount,
        }))
        addToast('success', `Synced ${data.campaignCount} campaigns`)
      } else {
        throw new Error(data.error)
      }
    } catch (err: any) {
      addToast('error', err.message || 'Sync failed')
    } finally {
      setSyncing(false)
    }
  }

  // Disconnect
  const handleDisconnect = async () => {
    if (!organization?.id) return
    if (!confirm('Disconnect Google Ads? You will need to reconfigure the sheet connection.')) return

    try {
      await setDoc(doc(db, 'organizations', organization.id), {
        googleAdsSheets: {
          isConnected: false,
          disconnectedAt: serverTimestamp(),
        },
      }, { merge: true })

      setConnection({
        isConnected: false,
        sheetUrl: null,
        sheetId: null,
        lastSync: null,
        campaignCount: 0,
        currency: 'USD',
      })
      setSheetUrl('')
      setTestResult(null)
      setShowInstructions(true)

      addToast('success', 'Disconnected from Google Ads')
    } catch (err: any) {
      addToast('error', err.message || 'Failed to disconnect')
    }
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/settings" className="hover:text-white transition-colors">
          Settings
        </Link>
        <i className="fas fa-chevron-right text-xs"></i>
        <span className="text-white">Google Ads</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#4285F4] rounded-xl flex items-center justify-center">
            <i className="fab fa-google text-white text-xl"></i>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Google Ads</h1>
            <p className="text-slate-400">View ad spend, clicks, conversions & ROAS</p>
          </div>
        </div>
      </div>

      {/* Connection Status */}
      {connection.isConnected && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <i className="fas fa-check text-emerald-400"></i>
              </div>
              <div>
                <div className="text-white font-medium">Connected via Google Sheets</div>
                <div className="text-sm text-slate-400">
                  {connection.campaignCount} campaigns
                  {connection.lastSync && ` • Last synced: ${connection.lastSync.toLocaleString()}`}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSync}
                disabled={syncing}
                className="px-3 py-1.5 bg-slate-700 text-white rounded-lg hover:bg-slate-600 text-sm disabled:opacity-50 flex items-center gap-2"
              >
                {syncing ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                    Syncing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sync text-xs"></i>
                    Sync Now
                  </>
                )}
              </button>
              <button
                onClick={handleDisconnect}
                className="px-3 py-1.5 text-red-400 hover:bg-red-500/10 rounded-lg text-sm"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}

      {/* How It Works */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
        <h3 className="text-white font-medium mb-2">
          <i className="fas fa-info-circle text-blue-400 mr-2"></i>
          How This Works
        </h3>
        <p className="text-sm text-slate-300 mb-2">
          We use Google Sheets as a bridge to pull your Google Ads data. You'll set up a Google Ads report
          in Google Sheets that auto-refreshes hourly, then share the sheet URL with us.
        </p>
        <p className="text-sm text-slate-400">
          This approach works immediately - no API approvals needed!
        </p>
      </div>

      {/* Setup Instructions */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="w-full flex items-center justify-between text-left"
        >
          <h2 className="text-lg font-semibold text-white">
            <i className="fas fa-list-ol text-slate-400 mr-2"></i>
            Setup Instructions
          </h2>
          <i className={`fas fa-chevron-${showInstructions ? 'up' : 'down'} text-slate-400`}></i>
        </button>

        {showInstructions && (
          <div className="mt-4 space-y-6">
            {/* Step 1 */}
            <div>
              <h3 className="text-white font-medium mb-2">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full text-sm mr-2">1</span>
                Create Google Ads Report in Sheets
              </h3>
              <ol className="ml-8 space-y-1 text-sm text-slate-300 list-decimal list-inside">
                <li>Open <a href="https://sheets.google.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">Google Sheets</a> and create a new spreadsheet</li>
                <li>Go to <strong>Extensions</strong> &rarr; <strong>Add-ons</strong> &rarr; <strong>Get add-ons</strong></li>
                <li>Search for <strong>"Google Ads"</strong> and install the official add-on</li>
                <li>Click <strong>Extensions</strong> &rarr; <strong>Google Ads</strong> &rarr; <strong>Create new report</strong></li>
                <li>Select your Google Ads account</li>
                <li>Choose <strong>"Campaign"</strong> report type</li>
                <li>Select columns: Campaign, Cost, Impressions, Clicks, Conversions, CTR, Avg. CPC</li>
                <li>Set date range to <strong>"Last 30 days"</strong></li>
                <li>Click <strong>Create report</strong></li>
              </ol>
            </div>

            {/* Step 2 */}
            <div>
              <h3 className="text-white font-medium mb-2">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full text-sm mr-2">2</span>
                Set Up Hourly Auto-Refresh
              </h3>
              <ol className="ml-8 space-y-1 text-sm text-slate-300 list-decimal list-inside">
                <li>Click <strong>Extensions</strong> &rarr; <strong>Google Ads</strong> &rarr; <strong>Schedule reports</strong></li>
                <li>Enable <strong>"Schedule refresh"</strong></li>
                <li>Set frequency to <strong>"Hourly"</strong></li>
                <li>Save the schedule</li>
              </ol>
            </div>

            {/* Step 3 */}
            <div>
              <h3 className="text-white font-medium mb-2">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full text-sm mr-2">3</span>
                Share the Sheet
              </h3>
              <ol className="ml-8 space-y-1 text-sm text-slate-300 list-decimal list-inside">
                <li>Click <strong>Share</strong> button (top right)</li>
                <li>Under "General access", change to <strong>"Anyone with the link"</strong> &rarr; <strong>Viewer</strong></li>
                <li>Copy the spreadsheet URL</li>
                <li>Paste it below!</li>
              </ol>
            </div>
          </div>
        )}
      </div>

      {/* Connection Form */}
      {!connection.isConnected && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Connect Your Sheet</h2>

          <div className="space-y-4">
            {/* Sheet URL */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Google Sheets URL
              </label>
              <input
                type="url"
                value={sheetUrl}
                onChange={(e) => setSheetUrl(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/d/..."
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Currency */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Google Ads Account Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="CAD">CAD - Canadian Dollar</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="AUD">AUD - Australian Dollar</option>
              </select>
              <p className="text-xs text-slate-500 mt-1">
                Select the currency your Google Ads account uses
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleTestConnection}
                disabled={testing || !sheetUrl.trim()}
                className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {testing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Testing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-plug"></i>
                    Test Connection
                  </>
                )}
              </button>

              {testResult?.success && (
                <button
                  onClick={handleSaveConnection}
                  disabled={saving}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 disabled:opacity-50 flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save"></i>
                      Save Connection
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Test Result */}
          {testResult && (
            <div className={`mt-4 p-4 rounded-lg ${
              testResult.success
                ? 'bg-emerald-500/10 border border-emerald-500/30'
                : 'bg-red-500/10 border border-red-500/30'
            }`}>
              {testResult.success ? (
                <div>
                  <div className="flex items-center gap-2 text-emerald-400 font-medium mb-2">
                    <i className="fas fa-check-circle"></i>
                    Sheet Connected Successfully!
                  </div>
                  <div className="text-sm text-slate-300">
                    Found <strong>{testResult.campaignCount}</strong> campaigns with data.
                  </div>
                  {testResult.sampleCampaigns && testResult.sampleCampaigns.length > 0 && (
                    <div className="mt-2 text-sm text-slate-400">
                      Sample: {testResult.sampleCampaigns.slice(0, 3).join(', ')}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 text-red-400 font-medium mb-2">
                    <i className="fas fa-times-circle"></i>
                    Connection Failed
                  </div>
                  <div className="text-sm text-red-300">{testResult.error}</div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Expected Sheet Format */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          <i className="fas fa-table text-slate-400 mr-2"></i>
          Expected Sheet Format
        </h2>
        <p className="text-sm text-slate-400 mb-3">
          Your Google Ads report should have columns like this (the add-on creates this automatically):
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 border-b border-slate-700">
                <th className="text-left py-2 px-3">Campaign</th>
                <th className="text-right py-2 px-3">Cost</th>
                <th className="text-right py-2 px-3">Impressions</th>
                <th className="text-right py-2 px-3">Clicks</th>
                <th className="text-right py-2 px-3">Conversions</th>
                <th className="text-right py-2 px-3">CTR</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-800">
                <td className="py-2 px-3">Brand Campaign</td>
                <td className="text-right py-2 px-3">$1,234.56</td>
                <td className="text-right py-2 px-3">45,678</td>
                <td className="text-right py-2 px-3">1,234</td>
                <td className="text-right py-2 px-3">89</td>
                <td className="text-right py-2 px-3">2.70%</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Shopping Campaign</td>
                <td className="text-right py-2 px-3">$567.89</td>
                <td className="text-right py-2 px-3">23,456</td>
                <td className="text-right py-2 px-3">567</td>
                <td className="text-right py-2 px-3">34</td>
                <td className="text-right py-2 px-3">2.42%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
