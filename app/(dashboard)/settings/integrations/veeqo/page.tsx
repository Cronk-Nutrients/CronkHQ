'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { useOrganization } from '@/context/OrganizationContext'
import { useToast } from '@/components/ui/Toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface VeeqoConnection {
  isConnected: boolean
  companyName: string | null
  companyId: string | null
  connectedAt: Date | null
  lastSync: Date | null
  warehouseCount: number
  storeCount: number
}

interface TestResult {
  success: boolean
  company?: {
    id: number
    name: string
    email: string
    phone: string
    warehouses: number
    stores: number
  }
  error?: string
}

interface ShippingSettings {
  autoSelectCheapest: boolean
  showDeliveryTimes: boolean
  defaultPackageWeight: number
  defaultPackageUnit: string
}

export default function VeeqoSettingsPage() {
  const { organization, refreshOrganization } = useOrganization()
  const { success, error: showError } = useToast()
  const router = useRouter()

  const [connection, setConnection] = useState<VeeqoConnection>({
    isConnected: false,
    companyName: null,
    companyId: null,
    connectedAt: null,
    lastSync: null,
    warehouseCount: 0,
    storeCount: 0,
  })

  const [apiKey, setApiKey] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [loading, setLoading] = useState(true)
  const [testing, setTesting] = useState(false)
  const [saving, setSaving] = useState(false)
  const [savingSettings, setSavingSettings] = useState(false)
  const [testResult, setTestResult] = useState<TestResult | null>(null)

  // Shipping settings
  const [shippingSettings, setShippingSettings] = useState<ShippingSettings>({
    autoSelectCheapest: true,
    showDeliveryTimes: true,
    defaultPackageWeight: 1,
    defaultPackageUnit: 'lb',
  })

  // Load existing connection
  useEffect(() => {
    async function loadConnection() {
      if (!organization?.id) return

      try {
        const orgDoc = await getDoc(doc(db, 'organizations', organization.id))
        if (orgDoc.exists()) {
          const data = orgDoc.data()
          if (data.veeqo) {
            setConnection({
              isConnected: data.veeqo.isConnected || false,
              companyName: data.veeqo.companyName || null,
              companyId: data.veeqo.companyId || null,
              connectedAt: data.veeqo.connectedAt?.toDate() || null,
              lastSync: data.veeqo.lastSync?.toDate() || null,
              warehouseCount: data.veeqo.warehouseCount || 0,
              storeCount: data.veeqo.storeCount || 0,
            })
            setApiKey(data.veeqo.apiKey || '')
            if (data.veeqo.shippingSettings) {
              setShippingSettings(data.veeqo.shippingSettings)
            }
          }
        }
      } catch (err) {
        console.error('Error loading Veeqo connection:', err)
      } finally {
        setLoading(false)
      }
    }

    loadConnection()
  }, [organization?.id])

  // Test connection
  const handleTestConnection = async () => {
    if (!apiKey.trim()) {
      showError('Please enter your Veeqo API key')
      return
    }

    setTesting(true)
    setTestResult(null)

    try {
      const response = await fetch('/api/veeqo/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: apiKey.trim() }),
      })

      const data = await response.json()
      setTestResult(data)

      if (data.success) {
        success(`Connected to ${data.company.name}!`)
      } else {
        showError(data.error || 'Connection failed')
      }
    } catch (err: any) {
      setTestResult({ success: false, error: err.message })
      showError('Failed to test connection')
    } finally {
      setTesting(false)
    }
  }

  // Save connection
  const handleSaveConnection = async () => {
    if (!organization?.id || !testResult?.success) return

    setSaving(true)

    try {
      await setDoc(doc(db, 'organizations', organization.id), {
        veeqo: {
          isConnected: true,
          apiKey: apiKey.trim(),
          companyId: testResult.company?.id?.toString(),
          companyName: testResult.company?.name,
          warehouseCount: testResult.company?.warehouses || 0,
          storeCount: testResult.company?.stores || 0,
          shippingSettings,
          connectedAt: serverTimestamp(),
          lastSync: null,
        },
      }, { merge: true })

      setConnection({
        isConnected: true,
        companyId: testResult.company?.id?.toString() || null,
        companyName: testResult.company?.name || null,
        connectedAt: new Date(),
        lastSync: null,
        warehouseCount: testResult.company?.warehouses || 0,
        storeCount: testResult.company?.stores || 0,
      })

      // Refresh organization context so other pages see the connection
      if (refreshOrganization) {
        await refreshOrganization()
      }

      success('Veeqo connection saved!')
    } catch (err: any) {
      showError(err.message || 'Failed to save connection')
    } finally {
      setSaving(false)
    }
  }

  // Save shipping settings
  const handleSaveSettings = async () => {
    if (!organization?.id) return

    setSavingSettings(true)

    try {
      await setDoc(doc(db, 'organizations', organization.id), {
        veeqo: {
          shippingSettings,
        },
      }, { merge: true })

      success('Shipping settings saved!')
    } catch (err: any) {
      showError(err.message || 'Failed to save settings')
    } finally {
      setSavingSettings(false)
    }
  }

  // Disconnect
  const handleDisconnect = async () => {
    if (!organization?.id) return
    if (!confirm('Disconnect from Veeqo? You will lose access to discounted shipping rates.')) return

    try {
      await setDoc(doc(db, 'organizations', organization.id), {
        veeqo: {
          isConnected: false,
          apiKey: '',
          disconnectedAt: serverTimestamp(),
        },
      }, { merge: true })

      setConnection({
        isConnected: false,
        companyName: null,
        companyId: null,
        connectedAt: null,
        lastSync: null,
        warehouseCount: 0,
        storeCount: 0,
      })
      setApiKey('')
      setTestResult(null)

      success('Disconnected from Veeqo')
    } catch (err: any) {
      showError(err.message || 'Failed to disconnect')
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
        <span className="text-white">Veeqo Integration</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-[#ff6b00] rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Veeqo Integration</h1>
            <p className="text-slate-400">Discounted shipping rates from USPS, UPS, FedEx & DHL</p>
          </div>
        </div>
      </div>

      {/* Benefits Banner */}
      {!connection.isConnected && (
        <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-xl p-4 mb-6">
          <h3 className="text-white font-medium mb-2">Why Connect Veeqo?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="flex items-center gap-2 text-slate-300">
              <i className="fas fa-check text-emerald-400"></i>
              <span>Free to use</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <i className="fas fa-check text-emerald-400"></i>
              <span>Up to 90% off USPS</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <i className="fas fa-check text-emerald-400"></i>
              <span>5% back in credits</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <i className="fas fa-check text-emerald-400"></i>
              <span>Amazon protection</span>
            </div>
          </div>
        </div>
      )}

      {/* Connection Status */}
      {connection.isConnected && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <i className="fas fa-check text-emerald-400"></i>
              </div>
              <div>
                <div className="text-white font-medium">Connected to {connection.companyName}</div>
                <div className="text-sm text-slate-400">
                  {connection.warehouseCount} warehouse(s) • {connection.storeCount} store(s)
                  {connection.connectedAt && ` • Connected: ${connection.connectedAt.toLocaleDateString()}`}
                </div>
              </div>
            </div>
            <button
              onClick={handleDisconnect}
              className="px-3 py-1.5 text-red-400 hover:bg-red-500/10 rounded-lg text-sm transition-colors"
            >
              <i className="fas fa-unlink mr-1"></i>
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
            {/* API Key Input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Veeqo API Key
              </label>
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your Veeqo API key"
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 pr-10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <i className={`fas ${showKey ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleTestConnection}
                disabled={testing || !apiKey.trim()}
                className="px-4 py-2.5 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
              >
                {testing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
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
                  className="px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 disabled:opacity-50 flex items-center gap-2 transition-colors"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
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
                    <div className="text-slate-400">Company:</div>
                    <div className="text-white">{testResult.company?.name}</div>
                    <div className="text-slate-400">Email:</div>
                    <div className="text-white">{testResult.company?.email}</div>
                    <div className="text-slate-400">Warehouses:</div>
                    <div className="text-white">{testResult.company?.warehouses}</div>
                    <div className="text-slate-400">Stores:</div>
                    <div className="text-white">{testResult.company?.stores}</div>
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

      {/* Shipping Settings */}
      {connection.isConnected && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            <i className="fas fa-cog text-slate-400 mr-2"></i>
            Shipping Settings
          </h2>

          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg cursor-pointer hover:bg-slate-900 transition-colors">
              <input
                type="checkbox"
                checked={shippingSettings.autoSelectCheapest}
                onChange={(e) => setShippingSettings(prev => ({
                  ...prev,
                  autoSelectCheapest: e.target.checked,
                }))}
                className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-emerald-500 focus:ring-emerald-500"
              />
              <div>
                <div className="text-white font-medium">Auto-select cheapest rate</div>
                <div className="text-sm text-slate-400">Automatically pre-select the lowest shipping rate for each order</div>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg cursor-pointer hover:bg-slate-900 transition-colors">
              <input
                type="checkbox"
                checked={shippingSettings.showDeliveryTimes}
                onChange={(e) => setShippingSettings(prev => ({
                  ...prev,
                  showDeliveryTimes: e.target.checked,
                }))}
                className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-emerald-500 focus:ring-emerald-500"
              />
              <div>
                <div className="text-white font-medium">Show estimated delivery times</div>
                <div className="text-sm text-slate-400">Display estimated delivery date for each shipping option</div>
              </div>
            </label>
          </div>

          {/* Default Package Settings */}
          <div className="mt-4 pt-4 border-t border-slate-700">
            <h3 className="text-white font-medium mb-3">Default Package Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Default Weight</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={shippingSettings.defaultPackageWeight}
                    onChange={(e) => setShippingSettings(prev => ({
                      ...prev,
                      defaultPackageWeight: parseFloat(e.target.value) || 1,
                    }))}
                    className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                    min="0.1"
                    step="0.1"
                  />
                  <select
                    value={shippingSettings.defaultPackageUnit}
                    onChange={(e) => setShippingSettings(prev => ({
                      ...prev,
                      defaultPackageUnit: e.target.value,
                    }))}
                    className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="lb">lb</option>
                    <option value="oz">oz</option>
                    <option value="kg">kg</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSaveSettings}
              disabled={savingSettings}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 disabled:opacity-50 flex items-center gap-2 transition-colors"
            >
              {savingSettings ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Saving...
                </>
              ) : (
                <>
                  <i className="fas fa-save"></i>
                  Save Settings
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      {connection.isConnected && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            <i className="fas fa-bolt text-amber-400 mr-2"></i>
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link
              href="/fulfillment/shipping"
              className="p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 text-center transition-colors"
            >
              <i className="fas fa-shipping-fast text-2xl text-orange-400 mb-2"></i>
              <div className="text-white text-sm">Ship Orders</div>
              <div className="text-xs text-slate-500">Get rates & buy labels</div>
            </Link>
            <Link
              href="/orders?status=ready"
              className="p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 text-center transition-colors"
            >
              <i className="fas fa-boxes text-2xl text-blue-400 mb-2"></i>
              <div className="text-white text-sm">Ready to Ship</div>
              <div className="text-xs text-slate-500">View pending shipments</div>
            </Link>
            <Link
              href="/reports"
              className="p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 text-center transition-colors"
            >
              <i className="fas fa-chart-bar text-2xl text-purple-400 mb-2"></i>
              <div className="text-white text-sm">Shipping Costs</div>
              <div className="text-xs text-slate-500">View spend by carrier</div>
            </Link>
          </div>
        </div>
      )}

      {/* Carrier Info */}
      {connection.isConnected && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            <i className="fas fa-truck text-slate-400 mr-2"></i>
            Available Carriers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-center">
              <div className="text-3xl mb-2">📮</div>
              <div className="text-white font-medium">USPS</div>
              <div className="text-xs text-blue-400">Up to 90% off</div>
            </div>
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg text-center">
              <div className="text-3xl mb-2">📦</div>
              <div className="text-white font-medium">UPS</div>
              <div className="text-xs text-amber-400">Discounted rates</div>
            </div>
            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg text-center">
              <div className="text-3xl mb-2">🚚</div>
              <div className="text-white font-medium">FedEx</div>
              <div className="text-xs text-purple-400">Express & Ground</div>
            </div>
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-center">
              <div className="text-3xl mb-2">✈️</div>
              <div className="text-white font-medium">DHL</div>
              <div className="text-xs text-yellow-400">International</div>
            </div>
          </div>
        </div>
      )}

      {/* Setup Instructions */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          <i className="fas fa-question-circle text-slate-400 mr-2"></i>
          How to Get Your API Key
        </h2>

        <ol className="space-y-3 text-sm text-slate-300">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <span>Log into your <a href="https://app.veeqo.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">Veeqo account</a></span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <span>Go to <strong className="text-white">Settings</strong> → <strong className="text-white">Users</strong></span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <span>Click on your user (or create a dedicated "API" user)</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <span>Scroll down to <strong className="text-white">API Key</strong> section</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold">5</span>
            <span>Click <strong className="text-white">Generate API Key</strong></span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold">6</span>
            <span>Copy the key (it's only shown once!) and paste it above</span>
          </li>
        </ol>

        <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <div className="flex items-start gap-2 text-amber-300 text-sm">
            <i className="fas fa-exclamation-triangle mt-0.5"></i>
            <span>
              <strong>Don't see the API Key option?</strong> Contact Veeqo support to enable API access for your account.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
