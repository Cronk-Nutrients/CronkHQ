'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { useOrganization } from '@/context/OrganizationContext'
import { useToast } from '@/components/ui/Toast'
import Link from 'next/link'
import { CurrencySelector, ExchangeRatesInfo } from '@/components/ExchangeRatesInfo'

interface GoogleAnalyticsConnection {
  isConnected: boolean
  propertyId: string | null
  propertyName: string | null
  measurementId: string | null
  currency: string
  connectedAt: Date | null
  email: string | null
}

interface GAProperty {
  propertyId: string
  displayName: string
  measurementId?: string
}

export default function GoogleAnalyticsSettingsPage() {
  const { organization } = useOrganization()
  const { addToast } = useToast()

  const [connection, setConnection] = useState<GoogleAnalyticsConnection>({
    isConnected: false,
    propertyId: null,
    propertyName: null,
    measurementId: null,
    currency: 'USD',
    connectedAt: null,
    email: null,
  })

  const [properties, setProperties] = useState<GAProperty[]>([])
  const [selectedProperty, setSelectedProperty] = useState<string>('')
  const [tokens, setTokens] = useState<any>(null)
  const [userEmail, setUserEmail] = useState<string>('')
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD')

  const [loading, setLoading] = useState(true)
  const [connecting, setConnecting] = useState(false)
  const [saving, setSaving] = useState(false)
  const [orgCurrency, setOrgCurrency] = useState('USD')

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
          setOrgCurrency(data.settings?.currency || 'USD')

          if (data.googleAnalytics) {
            setConnection({
              isConnected: data.googleAnalytics.isConnected || false,
              propertyId: data.googleAnalytics.propertyId || null,
              propertyName: data.googleAnalytics.propertyName || null,
              measurementId: data.googleAnalytics.measurementId || null,
              currency: data.googleAnalytics.currency || 'USD',
              connectedAt: data.googleAnalytics.connectedAt?.toDate() || null,
              email: data.googleAnalytics.email || null,
            })
          }
        }
      } catch (err) {
        console.error('Error loading Google Analytics connection:', err)
      } finally {
        setLoading(false)
      }
    }

    loadConnection()
  }, [organization?.id])

  // Handle OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    const error = urlParams.get('error')

    if (error) {
      addToast('error', `Google sign-in failed: ${error}`)
      window.history.replaceState({}, '', window.location.pathname)
      return
    }

    if (code) {
      window.history.replaceState({}, '', window.location.pathname)
      handleCallback(code)
    }
  }, [])

  const handleCallback = async (code: string) => {
    setConnecting(true)

    try {
      const response = await fetch('/api/google/analytics/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })

      const data = await response.json()

      if (data.success) {
        setProperties(data.properties || [])
        setTokens(data.tokens)
        setUserEmail(data.email)

        if (data.properties?.length === 1) {
          setSelectedProperty(data.properties[0].propertyId)
        }

        if (data.properties?.length === 0) {
          addToast('error', 'No GA4 properties found. Create one in Google Analytics first.')
        }
      } else {
        addToast('error', data.error || 'Failed to connect')
      }
    } catch (err: any) {
      addToast('error', err.message || 'Connection failed')
    } finally {
      setConnecting(false)
    }
  }

  const handleConnect = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    const redirectUri = `${window.location.origin}/settings/integrations/google-analytics`
    const scope = encodeURIComponent(
      'https://www.googleapis.com/auth/analytics.readonly ' +
      'https://www.googleapis.com/auth/analytics.edit ' +
      'openid email profile'
    )

    const authUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=code` +
      `&scope=${scope}` +
      `&access_type=offline` +
      `&prompt=consent`

    window.location.href = authUrl
  }

  const handleSave = async () => {
    if (!organization?.id || !selectedProperty || !tokens) return

    setSaving(true)
    try {
      const property = properties.find(p => p.propertyId === selectedProperty)

      // Get measurement ID for the property
      const response = await fetch('/api/google/analytics/get-measurement-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: selectedProperty,
          accessToken: tokens.access_token,
        }),
      })

      const data = await response.json()
      const measurementId = data.measurementId

      // Save to Firestore
      await setDoc(doc(db, 'organizations', organization.id), {
        googleAnalytics: {
          isConnected: true,
          propertyId: selectedProperty,
          propertyName: property?.displayName || null,
          measurementId,
          email: userEmail,
          currency: selectedCurrency,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          connectedAt: serverTimestamp(),
        },
      }, { merge: true })

      setConnection({
        isConnected: true,
        propertyId: selectedProperty,
        propertyName: property?.displayName || null,
        measurementId,
        currency: selectedCurrency,
        connectedAt: new Date(),
        email: userEmail,
      })

      setProperties([])
      setTokens(null)
      setSelectedProperty('')

      addToast('success', 'Google Analytics connected!')
    } catch (err: any) {
      addToast('error', err.message || 'Failed to save connection')
    } finally {
      setSaving(false)
    }
  }

  const handleDisconnect = async () => {
    if (!organization?.id) return
    if (!confirm('Disconnect Google Analytics? Tracking will stop.')) return

    try {
      await setDoc(doc(db, 'organizations', organization.id), {
        googleAnalytics: {
          isConnected: false,
          accessToken: null,
          refreshToken: null,
          disconnectedAt: serverTimestamp(),
        },
      }, { merge: true })

      setConnection({
        isConnected: false,
        propertyId: null,
        propertyName: null,
        measurementId: null,
        currency: 'USD',
        connectedAt: null,
        email: null,
      })

      addToast('success', 'Google Analytics disconnected')
    } catch (err: any) {
      addToast('error', err.message || 'Failed to disconnect')
    }
  }

  const handleUpdateCurrency = async (currency: string) => {
    if (!organization?.id) return

    try {
      await setDoc(doc(db, 'organizations', organization.id), {
        googleAnalytics: { currency },
      }, { merge: true })

      setConnection(prev => ({ ...prev, currency }))
      addToast('success', 'Currency updated')
    } catch (err: any) {
      addToast('error', 'Failed to update currency')
    }
  }

  const handleCancel = () => {
    setProperties([])
    setTokens(null)
    setSelectedProperty('')
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
        <span className="text-white">Google Analytics</span>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
            <i className="fas fa-chart-line text-orange-400"></i>
          </div>
          Google Analytics 4
        </h1>
        <p className="text-slate-400 mt-1">Track user behavior and events with GA4</p>
      </div>

      {/* Currency Conversion Info */}
      {connection.isConnected && connection.currency !== orgCurrency && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="fas fa-exchange-alt text-blue-400"></i>
            </div>
            <div>
              <div className="text-white font-medium">Automatic Currency Conversion</div>
              <p className="text-sm text-slate-400 mt-1">
                Data will be converted from <span className="text-white font-medium">{connection.currency}</span> to your
                organization currency <span className="text-white font-medium">{orgCurrency}</span>.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        {connection.isConnected ? (
          /* Connected State */
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">
                <i className="fas fa-check-circle mr-2"></i>
                Connected
              </span>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-slate-400">Property</div>
                  <div className="text-white font-medium">{connection.propertyName || connection.propertyId}</div>
                </div>
                <div>
                  <div className="text-slate-400">Measurement ID</div>
                  <div className="text-white font-mono text-emerald-400">{connection.measurementId || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-slate-400">Connected Account</div>
                  <div className="text-white">{connection.email || 'Unknown'}</div>
                </div>
                <div>
                  <div className="text-slate-400">Connected On</div>
                  <div className="text-white">{connection.connectedAt?.toLocaleDateString()}</div>
                </div>
              </div>
            </div>

            {/* Currency Selection */}
            <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
              <CurrencySelector
                value={connection.currency}
                onChange={handleUpdateCurrency}
                label="Account Currency"
                description={
                  connection.currency !== orgCurrency
                    ? `Data will auto-convert from ${connection.currency} to ${orgCurrency}`
                    : 'Same as organization default'
                }
              />

              {connection.currency !== orgCurrency && (
                <div className="mt-3">
                  <ExchangeRatesInfo
                    baseCurrency={connection.currency}
                    showCurrencies={[orgCurrency]}
                    compact
                  />
                </div>
              )}
            </div>

            <button
              onClick={handleDisconnect}
              className="px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg text-sm"
            >
              <i className="fas fa-unlink mr-2"></i>
              Disconnect
            </button>
          </div>
        ) : properties.length > 0 ? (
          /* Property Selection State */
          <div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 text-emerald-400 text-sm">
                <i className="fas fa-check-circle"></i>
                Signed in as {userEmail}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Select a GA4 Property
                </label>
                <select
                  value={selectedProperty}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="">Choose property...</option>
                  {properties.map(prop => (
                    <option key={prop.propertyId} value={prop.propertyId}>
                      {prop.displayName} (ID: {prop.propertyId})
                    </option>
                  ))}
                </select>
              </div>

              <CurrencySelector
                value={selectedCurrency}
                onChange={setSelectedCurrency}
                label="Account Currency"
                description="Select the currency configured in your GA4 property"
              />
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSave}
                disabled={!selectedProperty || saving}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Connecting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check"></i>
                    Connect Property
                  </>
                )}
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* Not Connected State */
          <div>
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-chart-line text-orange-400 text-2xl"></i>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Connect Google Analytics</h3>
              <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
                Track user behavior, page views, and events. Connect your GA4 property to see analytics data in your marketing dashboard.
              </p>
              <button
                onClick={handleConnect}
                disabled={connecting}
                className="px-6 py-3 bg-[#4285f4] text-white rounded-lg hover:bg-[#3367d6] flex items-center gap-2 mx-auto"
              >
                {connecting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Connecting...
                  </>
                ) : (
                  <>
                    <i className="fab fa-google"></i>
                    Sign in with Google
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* What's Tracked Section */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mt-6">
        <h3 className="text-white font-semibold mb-4">
          <i className="fas fa-info-circle text-slate-400 mr-2"></i>
          What Gets Tracked
        </h3>

        <ul className="grid md:grid-cols-2 gap-2 text-sm text-slate-300">
          <li className="flex items-center gap-2">
            <i className="fas fa-check text-emerald-400 text-xs"></i>
            Page views across all sections
          </li>
          <li className="flex items-center gap-2">
            <i className="fas fa-check text-emerald-400 text-xs"></i>
            Orders synced from Shopify
          </li>
          <li className="flex items-center gap-2">
            <i className="fas fa-check text-emerald-400 text-xs"></i>
            Products imported
          </li>
          <li className="flex items-center gap-2">
            <i className="fas fa-check text-emerald-400 text-xs"></i>
            Barcode scans
          </li>
          <li className="flex items-center gap-2">
            <i className="fas fa-check text-emerald-400 text-xs"></i>
            Orders picked & shipped
          </li>
          <li className="flex items-center gap-2">
            <i className="fas fa-check text-emerald-400 text-xs"></i>
            User sessions & engagement
          </li>
        </ul>
      </div>
    </div>
  )
}
