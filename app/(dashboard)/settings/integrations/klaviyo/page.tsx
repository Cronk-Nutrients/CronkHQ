'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore'
import { useOrganization } from '@/context/OrganizationContext'
import { useToast } from '@/components/ui/Toast'
import Link from 'next/link'

interface KlaviyoConnection {
  isConnected: boolean
  accountId: string | null
  accountName: string | null
  email: string | null
  connectedAt: Date | null
  lastSync: Date | null
  syncStatus: 'idle' | 'syncing' | 'success' | 'error'
  lastError: string | null
}

interface TestResult {
  success: boolean
  accountId?: string
  accountName?: string
  email?: string
  timezone?: string
  listsCount?: number
  segmentsCount?: number
  error?: string
}

interface SyncSettings {
  syncCampaigns: boolean
  syncFlows: boolean
  syncSegments: boolean
  syncProfiles: boolean
  pushOrders: boolean
}

export default function KlaviyoSettingsPage() {
  const { organization } = useOrganization()
  const { addToast } = useToast()

  // Connection state
  const [connection, setConnection] = useState<KlaviyoConnection>({
    isConnected: false,
    accountId: null,
    accountName: null,
    email: null,
    connectedAt: null,
    lastSync: null,
    syncStatus: 'idle',
    lastError: null,
  })

  // Form state
  const [apiKey, setApiKey] = useState('')
  const [showKey, setShowKey] = useState(false)

  // Sync settings
  const [syncSettings, setSyncSettings] = useState<SyncSettings>({
    syncCampaigns: true,
    syncFlows: true,
    syncSegments: true,
    syncProfiles: false, // Off by default - can be a lot of data
    pushOrders: true,
  })

  // UI state
  const [loading, setLoading] = useState(true)
  const [testing, setTesting] = useState(false)
  const [saving, setSaving] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [testResult, setTestResult] = useState<TestResult | null>(null)

  // Stats
  const [stats, setStats] = useState({
    campaigns: 0,
    flows: 0,
    segments: 0,
    profiles: 0,
  })

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
          if (data.klaviyo) {
            setConnection({
              isConnected: data.klaviyo.isConnected || false,
              accountId: data.klaviyo.accountId || null,
              accountName: data.klaviyo.accountName || null,
              email: data.klaviyo.email || null,
              connectedAt: data.klaviyo.connectedAt?.toDate() || null,
              lastSync: data.klaviyo.lastSync?.toDate() || null,
              syncStatus: data.klaviyo.syncStatus || 'idle',
              lastError: data.klaviyo.lastError || null,
            })
            setApiKey(data.klaviyo.apiKey || '')
            if (data.klaviyo.syncSettings) {
              setSyncSettings(data.klaviyo.syncSettings)
            }
          }
        }

        // Load stats
        await loadStats()
      } catch (err) {
        console.error('Error loading Klaviyo connection:', err)
      } finally {
        setLoading(false)
      }
    }

    loadConnection()
  }, [organization?.id])

  const loadStats = async () => {
    if (!organization?.id) return

    try {
      const [campaignsSnap, flowsSnap, segmentsSnap] = await Promise.all([
        getDocs(collection(db, 'organizations', organization.id, 'klaviyoCampaigns')),
        getDocs(collection(db, 'organizations', organization.id, 'klaviyoFlows')),
        getDocs(collection(db, 'organizations', organization.id, 'klaviyoSegments')),
      ])

      setStats({
        campaigns: campaignsSnap.size,
        flows: flowsSnap.size,
        segments: segmentsSnap.size,
        profiles: 0, // Would need separate count
      })
    } catch (err) {
      console.error('Error loading stats:', err)
    }
  }

  // Test connection
  const handleTestConnection = async () => {
    if (!apiKey) {
      addToast('error', 'Please enter your Klaviyo API key')
      return
    }

    setTesting(true)
    setTestResult(null)

    try {
      const response = await fetch('/api/klaviyo/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: apiKey.trim() }),
      })

      const data = await response.json()
      setTestResult(data)

      if (data.success) {
        addToast('success', `Connected to ${data.accountName}!`)
      } else {
        addToast('error', data.error || 'Connection failed')
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        error: err.message || 'Network error',
      })
      addToast('error', 'Failed to test connection')
    } finally {
      setTesting(false)
    }
  }

  // Save connection
  const handleSaveConnection = async () => {
    if (!organization?.id) return
    if (!testResult?.success) {
      addToast('error', 'Please test the connection first')
      return
    }

    setSaving(true)

    try {
      await setDoc(doc(db, 'organizations', organization.id), {
        klaviyo: {
          isConnected: true,
          apiKey: apiKey.trim(),
          accountId: testResult.accountId,
          accountName: testResult.accountName,
          email: testResult.email,
          timezone: testResult.timezone,
          syncSettings,
          connectedAt: serverTimestamp(),
          lastSync: null,
          syncStatus: 'idle',
          lastError: null,
        },
      }, { merge: true })

      setConnection(prev => ({
        ...prev,
        isConnected: true,
        accountId: testResult.accountId || null,
        accountName: testResult.accountName || null,
        email: testResult.email || null,
        connectedAt: new Date(),
      }))

      addToast('success', 'Klaviyo connection saved!')
    } catch (err: any) {
      addToast('error', err.message || 'Failed to save connection')
    } finally {
      setSaving(false)
    }
  }

  // Disconnect
  const handleDisconnect = async () => {
    if (!organization?.id) return
    if (!confirm('Disconnect from Klaviyo? This will stop syncing marketing data.')) return

    try {
      await setDoc(doc(db, 'organizations', organization.id), {
        klaviyo: {
          isConnected: false,
          apiKey: '',
          disconnectedAt: serverTimestamp(),
        },
      }, { merge: true })

      setConnection({
        isConnected: false,
        accountId: null,
        accountName: null,
        email: null,
        connectedAt: null,
        lastSync: null,
        syncStatus: 'idle',
        lastError: null,
      })
      setApiKey('')
      setTestResult(null)

      addToast('success', 'Disconnected from Klaviyo')
    } catch (err: any) {
      addToast('error', err.message || 'Failed to disconnect')
    }
  }

  // Sync data
  const handleSync = async () => {
    if (!organization?.id || !connection.isConnected) return

    setSyncing(true)

    try {
      const response = await fetch('/api/klaviyo/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId: organization.id,
          syncSettings,
        }),
      })

      const data = await response.json()

      if (data.success) {
        await setDoc(doc(db, 'organizations', organization.id), {
          klaviyo: {
            lastSync: serverTimestamp(),
            syncStatus: 'success',
            lastError: null,
          },
        }, { merge: true })

        setConnection(prev => ({
          ...prev,
          lastSync: new Date(),
          syncStatus: 'success',
          lastError: null,
        }))

        await loadStats()
        addToast('success', `Synced: ${data.campaigns} campaigns, ${data.flows} flows, ${data.segments} segments`)
      } else {
        throw new Error(data.error)
      }
    } catch (err: any) {
      await setDoc(doc(db, 'organizations', organization.id), {
        klaviyo: {
          syncStatus: 'error',
          lastError: err.message,
        },
      }, { merge: true })

      setConnection(prev => ({
        ...prev,
        syncStatus: 'error',
        lastError: err.message,
      }))

      addToast('error', err.message || 'Sync failed')
    } finally {
      setSyncing(false)
    }
  }

  // Update sync settings
  const handleUpdateSyncSettings = async () => {
    if (!organization?.id) return

    try {
      await setDoc(doc(db, 'organizations', organization.id), {
        klaviyo: { syncSettings },
      }, { merge: true })

      addToast('success', 'Sync settings updated')
    } catch (err: any) {
      addToast('error', err.message || 'Failed to update settings')
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
        <span className="text-white">Klaviyo</span>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <div className="w-10 h-10 bg-[#12372A] rounded-lg flex items-center justify-center">
            <span className="text-[#3DDB84] font-bold text-lg">K</span>
          </div>
          Klaviyo Integration
        </h1>
        <p className="text-slate-400 mt-1">Connect your Klaviyo account to sync email/SMS marketing data</p>
      </div>

      {/* Connection Status Banner */}
      {connection.isConnected && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <i className="fas fa-check text-emerald-400"></i>
              </div>
              <div>
                <div className="text-white font-medium">Connected to {connection.accountName}</div>
                <div className="text-sm text-slate-400">
                  {connection.lastSync
                    ? `Last synced: ${connection.lastSync.toLocaleString()}`
                    : 'Never synced'}
                </div>
              </div>
            </div>
            <button
              onClick={handleDisconnect}
              className="px-3 py-1.5 text-red-400 hover:bg-red-500/10 rounded-lg text-sm"
            >
              Disconnect
            </button>
          </div>
        </div>
      )}

      {/* Connection Form */}
      {!connection.isConnected && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Connect Your Account</h2>

          <div className="space-y-4">
            {/* API Key */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Private API Key
              </label>
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="pk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 pr-10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <i className={`fas ${showKey ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Get this from Klaviyo &rarr; Settings &rarr; API Keys &rarr; Create Private API Key
              </p>
            </div>

            {/* Test Button */}
            <div className="flex gap-3">
              <button
                onClick={handleTestConnection}
                disabled={testing || !apiKey}
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
                    Connection Successful!
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-slate-400">Account:</div>
                    <div className="text-white">{testResult.accountName}</div>
                    <div className="text-slate-400">Email:</div>
                    <div className="text-white">{testResult.email}</div>
                    <div className="text-slate-400">Lists:</div>
                    <div className="text-white">{testResult.listsCount}</div>
                    <div className="text-slate-400">Segments:</div>
                    <div className="text-white">{testResult.segmentsCount}</div>
                  </div>
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

      {/* Sync Settings */}
      {connection.isConnected && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Sync Settings</h2>
            <button
              onClick={handleSync}
              disabled={syncing}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 disabled:opacity-50 flex items-center gap-2"
            >
              {syncing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Syncing...
                </>
              ) : (
                <>
                  <i className="fas fa-sync"></i>
                  Sync Now
                </>
              )}
            </button>
          </div>

          <div className="space-y-3">
            {[
              { key: 'syncCampaigns', label: 'Campaigns', desc: 'Email campaigns and performance metrics' },
              { key: 'syncFlows', label: 'Flows', desc: 'Automated email/SMS flows (welcome, abandoned cart, etc.)' },
              { key: 'syncSegments', label: 'Segments', desc: 'Customer segments for targeted fulfillment' },
              { key: 'syncProfiles', label: 'Profiles', desc: 'Customer profiles (warning: can be large)' },
              { key: 'pushOrders', label: 'Push Orders', desc: 'Send order data to Klaviyo for segmentation' },
            ].map(item => (
              <label key={item.key} className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg cursor-pointer hover:bg-slate-900">
                <input
                  type="checkbox"
                  checked={syncSettings[item.key as keyof SyncSettings]}
                  onChange={(e) => setSyncSettings(prev => ({
                    ...prev,
                    [item.key]: e.target.checked,
                  }))}
                  className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-emerald-500 focus:ring-emerald-500"
                />
                <div>
                  <div className="text-white font-medium">{item.label}</div>
                  <div className="text-sm text-slate-400">{item.desc}</div>
                </div>
              </label>
            ))}
          </div>

          <button
            onClick={handleUpdateSyncSettings}
            className="mt-4 px-4 py-2 text-sm text-slate-400 hover:text-white"
          >
            Save Settings
          </button>
        </div>
      )}

      {/* Synced Data Stats */}
      {connection.isConnected && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Synced Data</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-white">{stats.campaigns}</div>
              <div className="text-sm text-slate-400">Campaigns</div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-white">{stats.flows}</div>
              <div className="text-sm text-slate-400">Flows</div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-white">{stats.segments}</div>
              <div className="text-sm text-slate-400">Segments</div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-white">{stats.profiles}</div>
              <div className="text-sm text-slate-400">Profiles</div>
            </div>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          <i className="fas fa-question-circle text-slate-400 mr-2"></i>
          Setup Instructions
        </h2>

        <ol className="space-y-3 text-sm text-slate-300">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-xs">1</span>
            <span>Log into your <a href="https://www.klaviyo.com/login" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">Klaviyo account</a></span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-xs">2</span>
            <span>Go to Settings (gear icon) &rarr; API Keys</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-xs">3</span>
            <span>Click "Create Private API Key"</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-xs">4</span>
            <span>Name it "Cronk WMS Integration"</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-xs">5</span>
            <span>Enable these scopes:</span>
          </li>
        </ol>

        <div className="mt-3 ml-9 p-3 bg-slate-900 rounded-lg">
          <div className="text-xs text-slate-400 mb-2">Required API Scopes:</div>
          <div className="grid grid-cols-2 gap-1 text-xs">
            <div className="text-emerald-400 flex items-center gap-1">
              <i className="fas fa-check text-[10px]"></i> campaigns:read
            </div>
            <div className="text-emerald-400 flex items-center gap-1">
              <i className="fas fa-check text-[10px]"></i> flows:read
            </div>
            <div className="text-emerald-400 flex items-center gap-1">
              <i className="fas fa-check text-[10px]"></i> metrics:read
            </div>
            <div className="text-emerald-400 flex items-center gap-1">
              <i className="fas fa-check text-[10px]"></i> profiles:read
            </div>
            <div className="text-emerald-400 flex items-center gap-1">
              <i className="fas fa-check text-[10px]"></i> segments:read
            </div>
            <div className="text-emerald-400 flex items-center gap-1">
              <i className="fas fa-check text-[10px]"></i> lists:read
            </div>
            <div className="text-emerald-400 flex items-center gap-1">
              <i className="fas fa-check text-[10px]"></i> events:write
            </div>
          </div>
        </div>

        <ol className="space-y-3 text-sm text-slate-300 mt-3" start={6}>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-xs">6</span>
            <span>Click "Create" and copy the Private API Key (starts with pk_)</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-xs">7</span>
            <span>Paste it above and test the connection</span>
          </li>
        </ol>
      </div>
    </div>
  )
}
