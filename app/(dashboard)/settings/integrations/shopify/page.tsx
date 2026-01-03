'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc, collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore'
import { useOrganization } from '@/context/OrganizationContext'
import { useToast } from '@/components/ui/Toast'
import Link from 'next/link'

interface ShopifyConnection {
  isConnected: boolean
  storeName: string
  storeUrl: string
  accessToken: string
  shopName: string | null
  connectedAt: Date | null
  lastSync: Date | null
  syncStatus: 'idle' | 'syncing' | 'success' | 'error'
  lastError: string | null
}

interface TestResult {
  success: boolean
  shopName?: string
  email?: string
  plan?: string
  ordersCount?: number
  productsCount?: number
  error?: string
  rawResponse?: any
}

export default function ShopifySettingsPage() {
  const { organization } = useOrganization()
  const { success, error: showError } = useToast()

  // Connection state
  const [connection, setConnection] = useState<ShopifyConnection>({
    isConnected: false,
    storeName: '',
    storeUrl: '',
    accessToken: '',
    shopName: null,
    connectedAt: null,
    lastSync: null,
    syncStatus: 'idle',
    lastError: null,
  })

  // Form state
  const [storeName, setStoreName] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [showToken, setShowToken] = useState(false)

  // UI state
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [testResult, setTestResult] = useState<TestResult | null>(null)
  const [syncProgress, setSyncProgress] = useState({ current: 0, total: 0, status: '' })

  // Load existing connection
  useEffect(() => {
    async function loadConnection() {
      if (!organization?.id) return

      try {
        const orgDoc = await getDoc(doc(db, 'organizations', organization.id))
        if (orgDoc.exists()) {
          const data = orgDoc.data()
          if (data.shopify) {
            setConnection({
              isConnected: data.shopify.isConnected || false,
              storeName: data.shopify.storeName || '',
              storeUrl: data.shopify.storeUrl || '',
              accessToken: data.shopify.accessToken || '',
              shopName: data.shopify.shopName || null,
              connectedAt: data.shopify.connectedAt?.toDate() || null,
              lastSync: data.shopify.lastSync?.toDate() || null,
              syncStatus: data.shopify.syncStatus || 'idle',
              lastError: data.shopify.lastError || null,
            })
            setStoreName(data.shopify.storeName || '')
            setAccessToken(data.shopify.accessToken || '')
          }
        }
      } catch (err) {
        console.error('Error loading Shopify connection:', err)
      } finally {
        setLoading(false)
      }
    }

    loadConnection()
  }, [organization?.id])

  // Test connection
  const handleTestConnection = async () => {
    if (!storeName || !accessToken) {
      showError('Please enter store name and access token')
      return
    }

    setTesting(true)
    setTestResult(null)

    try {
      const response = await fetch('/api/shopify/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeName: storeName.replace('.myshopify.com', '').trim(),
          accessToken: accessToken.trim(),
        }),
      })

      const data = await response.json()
      setTestResult(data)

      if (data.success) {
        success(`Connected to ${data.shopName}!`)
      } else {
        showError(data.error || 'Connection failed')
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        error: err.message || 'Network error',
      })
      showError('Failed to test connection')
    } finally {
      setTesting(false)
    }
  }

  // Save connection
  const handleSaveConnection = async () => {
    if (!organization?.id) return
    if (!testResult?.success) {
      showError('Please test the connection first')
      return
    }

    setSaving(true)

    try {
      const cleanStoreName = storeName.replace('.myshopify.com', '').trim()

      await setDoc(doc(db, 'organizations', organization.id), {
        shopify: {
          isConnected: true,
          storeName: cleanStoreName,
          storeUrl: `https://${cleanStoreName}.myshopify.com`,
          accessToken: accessToken.trim(),
          shopName: testResult.shopName,
          email: testResult.email,
          plan: testResult.plan,
          connectedAt: serverTimestamp(),
          lastSync: null,
          syncStatus: 'idle',
          lastError: null,
        },
      }, { merge: true })

      setConnection(prev => ({
        ...prev,
        isConnected: true,
        storeName: cleanStoreName,
        storeUrl: `https://${cleanStoreName}.myshopify.com`,
        accessToken: accessToken.trim(),
        shopName: testResult.shopName || null,
        connectedAt: new Date(),
      }))

      success('Shopify connection saved!')
    } catch (err: any) {
      showError(err.message || 'Failed to save connection')
    } finally {
      setSaving(false)
    }
  }

  // Disconnect
  const handleDisconnect = async () => {
    if (!organization?.id) return
    if (!confirm('Disconnect from Shopify? This will not delete any synced data.')) return

    try {
      await setDoc(doc(db, 'organizations', organization.id), {
        shopify: {
          isConnected: false,
          accessToken: '',
          lastSync: connection.lastSync,
          disconnectedAt: serverTimestamp(),
        },
      }, { merge: true })

      setConnection({
        isConnected: false,
        storeName: '',
        storeUrl: '',
        accessToken: '',
        shopName: null,
        connectedAt: null,
        lastSync: connection.lastSync,
        syncStatus: 'idle',
        lastError: null,
      })
      setStoreName('')
      setAccessToken('')
      setTestResult(null)

      success('Disconnected from Shopify')
    } catch (err: any) {
      showError(err.message || 'Failed to disconnect')
    }
  }

  // Sync orders
  const handleSyncOrders = async () => {
    if (!organization?.id || !connection.isConnected) return

    setSyncing(true)
    setSyncProgress({ current: 0, total: 0, status: 'Fetching orders from Shopify...' })

    try {
      // Step 1: Fetch all orders from Shopify (with pagination)
      let allOrders: any[] = []
      let pageInfo: string | null = null
      let pageCount = 0

      do {
        pageCount++
        setSyncProgress(prev => ({ ...prev, status: `Fetching page ${pageCount}...` }))

        const response: Response = await fetch('/api/shopify/fetch-orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            storeName: connection.storeName,
            accessToken: connection.accessToken,
            status: 'any',
            limit: 250,
            pageInfo,
          }),
        })

        const data = await response.json()

        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch orders')
        }

        allOrders = [...allOrders, ...(data.orders || [])]
        pageInfo = data.hasNextPage ? data.nextPageInfo : null

      } while (pageInfo)

      setSyncProgress({ current: 0, total: allOrders.length, status: 'Processing orders...' })

      if (allOrders.length === 0) {
        success('No orders to sync')
        setSyncing(false)
        return
      }

      // Step 2: Get existing orders to avoid duplicates
      const ordersRef = collection(db, 'organizations', organization.id, 'orders')
      const existingSnapshot = await getDocs(ordersRef)
      const existingByShopifyId = new Map<string, string>()
      existingSnapshot.docs.forEach(d => {
        const data = d.data()
        if (data.shopifyId) {
          existingByShopifyId.set(data.shopifyId, d.id)
        }
      })

      // Step 3: Get products for SKU matching
      const productsRef = collection(db, 'organizations', organization.id, 'products')
      const productsSnapshot = await getDocs(productsRef)
      const productsBySku = new Map<string, string>()
      productsSnapshot.docs.forEach(docSnap => {
        const data = docSnap.data()
        if (data.sku) productsBySku.set(data.sku.toLowerCase(), docSnap.id)
      })

      // Step 4: Get or create Shopify sales channel
      const channelsRef = collection(db, 'organizations', organization.id, 'salesChannels')
      const channelQuery = query(channelsRef, where('code', '==', 'shopify'))
      const channelSnapshot = await getDocs(channelQuery)

      let channelId: string
      let channelName = 'Shopify'

      if (channelSnapshot.empty) {
        const newChannel = await addDoc(channelsRef, {
          name: 'Shopify',
          code: 'shopify',
          type: 'ecommerce',
          color: '#96bf48',
          icon: 'fab fa-shopify',
          isActive: true,
          sortOrder: 1,
          stats: {
            totalOrders: 0,
            pendingOrders: 0,
            totalRevenue: 0,
          },
          createdAt: serverTimestamp(),
        })
        channelId = newChannel.id
      } else {
        channelId = channelSnapshot.docs[0].id
        channelName = channelSnapshot.docs[0].data().name || 'Shopify'
      }

      // Step 5: Process and save orders
      let added = 0
      let updated = 0

      for (let i = 0; i < allOrders.length; i++) {
        const shopifyOrder = allOrders[i]
        const shopifyId = shopifyOrder.id.toString()

        setSyncProgress({
          current: i + 1,
          total: allOrders.length,
          status: `Processing order ${shopifyOrder.name}...`
        })

        // Map order data
        const orderData = mapShopifyOrder(shopifyOrder, productsBySku, channelId, channelName)

        // Check if exists
        const existingDocId = existingByShopifyId.get(shopifyId)
        if (existingDocId) {
          // Update existing
          await setDoc(doc(ordersRef, existingDocId), {
            ...orderData,
            updatedAt: serverTimestamp(),
          }, { merge: true })
          updated++
        } else {
          // Add new
          await addDoc(ordersRef, {
            ...orderData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          })
          added++
        }
      }

      // Step 6: Update sync status
      await setDoc(doc(db, 'organizations', organization.id), {
        shopify: {
          lastSync: serverTimestamp(),
          syncStatus: 'success',
          lastError: null,
          lastSyncStats: { added, updated, total: allOrders.length },
        },
      }, { merge: true })

      setConnection(prev => ({
        ...prev,
        lastSync: new Date(),
        syncStatus: 'success',
        lastError: null,
      }))

      success(`Synced ${allOrders.length} orders (${added} new, ${updated} updated)`)
    } catch (err: any) {
      console.error('Sync error:', err)

      await setDoc(doc(db, 'organizations', organization.id), {
        shopify: {
          syncStatus: 'error',
          lastError: err.message,
        },
      }, { merge: true })

      setConnection(prev => ({
        ...prev,
        syncStatus: 'error',
        lastError: err.message,
      }))

      showError(err.message || 'Sync failed')
    } finally {
      setSyncing(false)
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
        <span className="text-white">Shopify Integration</span>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <i className="fab fa-shopify text-[#96bf48]"></i>
          Shopify Integration
        </h1>
        <p className="text-slate-400 mt-1">Connect your Shopify store to sync orders and products</p>
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
                <div className="text-white font-medium">
                  Connected to {connection.shopName || connection.storeName}.myshopify.com
                </div>
                <div className="text-sm text-slate-400">
                  {connection.lastSync
                    ? `Last synced: ${connection.lastSync.toLocaleString()}`
                    : 'Never synced'}
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
          <h2 className="text-lg font-semibold text-white mb-4">Connect Your Store</h2>

          <div className="space-y-4">
            {/* Store Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Store Name
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  placeholder="your-store-name"
                  className="flex-1 bg-slate-900 border border-slate-600 rounded-l-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <span className="bg-slate-700 border border-l-0 border-slate-600 rounded-r-lg px-4 py-2.5 text-slate-400">
                  .myshopify.com
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Enter just the store name, not the full URL
              </p>
            </div>

            {/* Access Token */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Admin API Access Token
              </label>
              <div className="relative">
                <input
                  type={showToken ? 'text' : 'password'}
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  placeholder="shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 pr-10 text-white font-mono placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <i className={`fas ${showToken ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Get this from Shopify Admin - Settings - Apps - Develop apps
              </p>
            </div>

            {/* Test & Save Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleTestConnection}
                disabled={testing || !storeName || !accessToken}
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
                    <div className="text-slate-400">Shop Name:</div>
                    <div className="text-white">{testResult.shopName}</div>
                    <div className="text-slate-400">Email:</div>
                    <div className="text-white">{testResult.email}</div>
                    <div className="text-slate-400">Plan:</div>
                    <div className="text-white">{testResult.plan}</div>
                    <div className="text-slate-400">Products:</div>
                    <div className="text-white">{testResult.productsCount?.toLocaleString()}</div>
                    <div className="text-slate-400">Orders:</div>
                    <div className="text-white">{testResult.ordersCount?.toLocaleString()}</div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 text-red-400 font-medium mb-2">
                    <i className="fas fa-times-circle"></i>
                    Connection Failed
                  </div>
                  <div className="text-sm text-red-300">{testResult.error}</div>
                  {testResult.rawResponse && (
                    <details className="mt-2">
                      <summary className="text-xs text-slate-500 cursor-pointer hover:text-slate-400">
                        Show raw response
                      </summary>
                      <pre className="mt-2 text-xs bg-slate-900 p-2 rounded overflow-auto max-h-40 text-slate-400">
                        {JSON.stringify(testResult.rawResponse, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Sync Section */}
      {connection.isConnected && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Sync Orders</h2>

          <div className="flex items-center gap-4">
            <button
              onClick={handleSyncOrders}
              disabled={syncing}
              className="px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 disabled:opacity-50 flex items-center gap-2 transition-colors"
            >
              {syncing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Syncing...
                </>
              ) : (
                <>
                  <i className="fas fa-sync"></i>
                  Sync Orders Now
                </>
              )}
            </button>

            {connection.syncStatus === 'error' && connection.lastError && (
              <div className="text-sm text-red-400">
                <i className="fas fa-exclamation-triangle mr-1"></i>
                {connection.lastError}
              </div>
            )}
          </div>

          {syncing && (
            <div className="mt-4">
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: syncProgress.total > 0 ? `${(syncProgress.current / syncProgress.total) * 100}%` : '0%' }}
                ></div>
              </div>
              <div className="text-sm text-slate-400 mt-2">
                {syncProgress.status}
                {syncProgress.total > 0 && ` (${syncProgress.current}/${syncProgress.total})`}
              </div>
            </div>
          )}
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
            <span className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <span>Go to your Shopify Admin - Settings - Apps and sales channels</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <span>Click "Develop apps" then "Create an app"</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <span>Name your app (e.g., "Cronk WMS Integration")</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <span>Click "Configure Admin API scopes" and enable these permissions:</span>
          </li>
        </ol>

        <div className="mt-3 ml-9 p-3 bg-slate-900 rounded-lg">
          <div className="text-xs text-slate-400 mb-2">Required API Scopes:</div>
          <div className="grid grid-cols-2 gap-1 text-xs">
            <div className="text-emerald-400"><i className="fas fa-check mr-1"></i>read_orders</div>
            <div className="text-emerald-400"><i className="fas fa-check mr-1"></i>write_orders</div>
            <div className="text-emerald-400"><i className="fas fa-check mr-1"></i>read_products</div>
            <div className="text-emerald-400"><i className="fas fa-check mr-1"></i>write_products</div>
            <div className="text-emerald-400"><i className="fas fa-check mr-1"></i>read_inventory</div>
            <div className="text-emerald-400"><i className="fas fa-check mr-1"></i>write_inventory</div>
            <div className="text-emerald-400"><i className="fas fa-check mr-1"></i>read_fulfillments</div>
            <div className="text-emerald-400"><i className="fas fa-check mr-1"></i>write_fulfillments</div>
            <div className="text-emerald-400"><i className="fas fa-check mr-1"></i>read_customers</div>
            <div className="text-slate-500"><i className="far fa-circle mr-1"></i>read_locations (optional)</div>
          </div>
        </div>

        <ol className="space-y-3 text-sm text-slate-300 mt-4" start={5}>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold">5</span>
            <span>Click "Install app" to generate your access token</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold">6</span>
            <span>Copy the "Admin API access token" (starts with shpat_)</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold">7</span>
            <span>Paste it above and test the connection</span>
          </li>
        </ol>
      </div>
    </div>
  )
}

// Helper function to map Shopify order to our format
function mapShopifyOrder(
  shopifyOrder: any,
  productsBySku: Map<string, string>,
  channelId: string,
  channelName: string
) {
  const shopifyId = shopifyOrder.id.toString()
  const shippingAddress = shopifyOrder.shipping_address || {}
  const billingAddress = shopifyOrder.billing_address || null
  const customer = shopifyOrder.customer || {}

  // Map line items
  const lineItems = (shopifyOrder.line_items || []).map((item: any) => {
    const sku = item.sku?.toLowerCase()
    return {
      id: `li_${item.id}`,
      shopifyLineItemId: item.id.toString(),
      productId: sku ? productsBySku.get(sku) || null : null,
      shopifyProductId: item.product_id?.toString() || null,
      shopifyVariantId: item.variant_id?.toString() || null,
      sku: item.sku || '',
      name: item.name,
      variantTitle: item.variant_title || null,
      quantity: item.quantity,
      price: parseFloat(item.price) || 0,
      totalDiscount: parseFloat(item.total_discount) || 0,
      fulfillableQuantity: item.fulfillable_quantity,
      fulfillmentStatus: item.fulfillment_status || 'unfulfilled',
    }
  })

  // Map fulfillments
  const fulfillments = (shopifyOrder.fulfillments || []).map((f: any) => ({
    id: `ful_${f.id}`,
    shopifyFulfillmentId: f.id.toString(),
    status: f.status,
    trackingCompany: f.tracking_company || null,
    trackingNumber: f.tracking_number || null,
    trackingNumbers: f.tracking_numbers || [],
    trackingUrl: f.tracking_url || null,
    trackingUrls: f.tracking_urls || [],
    shipmentStatus: f.shipment_status || null,
    createdAt: new Date(f.created_at),
    updatedAt: new Date(f.updated_at),
  }))

  // Map discount codes
  const discountCodes = (shopifyOrder.discount_codes || []).map((dc: any) => ({
    code: dc.code,
    amount: parseFloat(dc.amount) || 0,
    type: dc.type,
  }))

  // Map refunds
  const refunds = (shopifyOrder.refunds || []).map((r: any) => ({
    id: `ref_${r.id}`,
    shopifyRefundId: r.id.toString(),
    totalRefunded: (r.transactions || []).reduce((sum: number, t: any) => sum + parseFloat(t.amount || 0), 0),
    note: r.note || null,
    createdAt: new Date(r.created_at),
  }))

  // Determine status
  let status = 'pending'
  if (shopifyOrder.cancelled_at) {
    status = 'cancelled'
  } else if (shopifyOrder.fulfillment_status === 'fulfilled') {
    status = 'shipped'
  } else if (shopifyOrder.fulfillment_status === 'partial') {
    status = 'partially_shipped'
  } else if (shopifyOrder.financial_status === 'paid') {
    status = 'processing'
  }

  return {
    shopifyId,
    shopifyOrderNumber: `#${shopifyOrder.order_number}`,
    shopifyOrderName: shopifyOrder.name,

    status,
    fulfillmentStatus: shopifyOrder.fulfillment_status || 'unfulfilled',
    paymentStatus: shopifyOrder.financial_status === 'paid' ? 'paid' :
                   shopifyOrder.financial_status === 'refunded' ? 'refunded' :
                   shopifyOrder.financial_status === 'partially_refunded' ? 'partially_refunded' : 'pending',

    customer: {
      id: customer.id?.toString() || '',
      email: shopifyOrder.email || '',
      firstName: customer.first_name || shippingAddress.first_name || '',
      lastName: customer.last_name || shippingAddress.last_name || '',
      phone: customer.phone || shopifyOrder.phone || null,
      ordersCount: customer.orders_count || 0,
      totalSpent: parseFloat(customer.total_spent) || 0,
    },

    shippingAddress: {
      firstName: shippingAddress.first_name || '',
      lastName: shippingAddress.last_name || '',
      company: shippingAddress.company || null,
      address1: shippingAddress.address1 || '',
      address2: shippingAddress.address2 || null,
      city: shippingAddress.city || '',
      province: shippingAddress.province || '',
      provinceCode: shippingAddress.province_code || '',
      country: shippingAddress.country || '',
      countryCode: shippingAddress.country_code || '',
      zip: shippingAddress.zip || '',
      phone: shippingAddress.phone || null,
    },

    billingAddress: billingAddress ? {
      firstName: billingAddress.first_name || '',
      lastName: billingAddress.last_name || '',
      company: billingAddress.company || null,
      address1: billingAddress.address1 || '',
      address2: billingAddress.address2 || null,
      city: billingAddress.city || '',
      province: billingAddress.province || '',
      provinceCode: billingAddress.province_code || '',
      country: billingAddress.country || '',
      countryCode: billingAddress.country_code || '',
      zip: billingAddress.zip || '',
      phone: billingAddress.phone || null,
    } : null,

    lineItems,
    fulfillments,
    discountCodes,
    refunds,

    subtotal: parseFloat(shopifyOrder.subtotal_price) || 0,
    shippingTotal: parseFloat(shopifyOrder.total_shipping_price_set?.shop_money?.amount) || 0,
    taxTotal: parseFloat(shopifyOrder.total_tax) || 0,
    discountTotal: parseFloat(shopifyOrder.total_discounts) || 0,
    total: parseFloat(shopifyOrder.total_price) || 0,
    currency: shopifyOrder.currency || 'USD',

    shippingMethod: shopifyOrder.shipping_lines?.[0]?.title || null,

    note: shopifyOrder.note || null,
    tags: shopifyOrder.tags ? shopifyOrder.tags.split(',').map((t: string) => t.trim()) : [],

    shopifyCreatedAt: new Date(shopifyOrder.created_at),
    shopifyUpdatedAt: new Date(shopifyOrder.updated_at),
    cancelledAt: shopifyOrder.cancelled_at ? new Date(shopifyOrder.cancelled_at) : null,
    cancelReason: shopifyOrder.cancel_reason || null,

    channelId,
    channelCode: 'shopify',
    channelName,

    source: {
      platform: 'shopify',
      externalId: shopifyId,
      externalOrderNumber: shopifyOrder.name,
      importedAt: new Date(),
    },
  }
}
