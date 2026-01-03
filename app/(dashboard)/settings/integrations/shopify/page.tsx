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

interface SyncSettings {
  importProducts: boolean
  importOrders: boolean
  importCustomers: boolean
  syncMode: 'read_only' | 'read_write'
  orderDateRange: 'all' | '30_days' | '90_days' | '6_months' | '1_year' | 'custom'
  customStartDate: string
  customEndDate: string
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

  // Webhook state
  const [webhooks, setWebhooks] = useState<any[]>([])
  const [webhooksLoading, setWebhooksLoading] = useState(false)
  const [registeringWebhooks, setRegisteringWebhooks] = useState(false)
  const [unregisteringWebhooks, setUnregisteringWebhooks] = useState(false)

  // Sync settings
  const [syncSettings, setSyncSettings] = useState<SyncSettings>({
    importProducts: true,
    importOrders: true,
    importCustomers: true,
    syncMode: 'read_write',
    orderDateRange: 'all',
    customStartDate: '',
    customEndDate: '',
  })

  // Background sync status
  const [customerSyncStatus, setCustomerSyncStatus] = useState<{
    status: 'idle' | 'running' | 'complete' | 'error'
    progress: { current: number; total: number; status: string } | null
    error: string | null
  }>({ status: 'idle', progress: null, error: null })

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

  // Poll for customer sync status
  useEffect(() => {
    if (!organization?.id || !connection.isConnected) return

    // Check initial status
    async function checkStatus() {
      try {
        const response = await fetch(`/api/shopify/sync-customers?organizationId=${organization?.id}`)
        const data = await response.json()
        if (data.success) {
          setCustomerSyncStatus({
            status: data.status || 'idle',
            progress: data.progress,
            error: data.error,
          })
        }
      } catch (err) {
        console.error('Error checking sync status:', err)
      }
    }

    checkStatus()

    // Poll while running
    let interval: NodeJS.Timeout | null = null
    if (customerSyncStatus.status === 'running') {
      interval = setInterval(checkStatus, 2000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [organization?.id, connection.isConnected, customerSyncStatus.status])

  // Load webhooks when connection is established
  useEffect(() => {
    async function loadWebhooks() {
      if (!organization?.id || !connection.isConnected) return

      setWebhooksLoading(true)
      try {
        const response = await fetch(`/api/shopify/webhooks/register?organizationId=${organization.id}`)
        const data = await response.json()
        if (data.success) {
          setWebhooks(data.webhooks || [])
        }
      } catch (err) {
        console.error('Error loading webhooks:', err)
      } finally {
        setWebhooksLoading(false)
      }
    }

    loadWebhooks()
  }, [organization?.id, connection.isConnected])

  // Register all webhooks
  const handleRegisterWebhooks = async () => {
    if (!organization?.id) return

    setRegisteringWebhooks(true)
    try {
      const response = await fetch('/api/shopify/webhooks/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ organizationId: organization.id }),
      })

      const data = await response.json()
      if (data.success) {
        success(data.message)
        // Reload webhooks
        const refreshResponse = await fetch(`/api/shopify/webhooks/register?organizationId=${organization.id}`)
        const refreshData = await refreshResponse.json()
        if (refreshData.success) {
          setWebhooks(refreshData.webhooks || [])
        }
      } else {
        showError(data.error || 'Failed to register webhooks')
      }
    } catch (err: any) {
      showError(err.message || 'Failed to register webhooks')
    } finally {
      setRegisteringWebhooks(false)
    }
  }

  // Unregister all webhooks
  const handleUnregisterWebhooks = async () => {
    if (!organization?.id) return
    if (!confirm('Unregister all webhooks? You will stop receiving real-time updates from Shopify.')) return

    setUnregisteringWebhooks(true)
    try {
      const response = await fetch('/api/shopify/webhooks/unregister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ organizationId: organization.id, unregisterAll: true }),
      })

      const data = await response.json()
      if (data.success) {
        success(data.message)
        setWebhooks([])
      } else {
        showError(data.error || 'Failed to unregister webhooks')
      }
    } catch (err: any) {
      showError(err.message || 'Failed to unregister webhooks')
    } finally {
      setUnregisteringWebhooks(false)
    }
  }

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

  // Calculate date range for order filtering
  const getDateRange = (): { startDate: string | null; endDate: string | null } => {
    const now = new Date()
    let startDate: Date | null = null
    const endDate: Date | null = now

    switch (syncSettings.orderDateRange) {
      case '30_days':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      case '90_days':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
        break
      case '6_months':
        startDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000)
        break
      case '1_year':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
        break
      case 'custom':
        return {
          startDate: syncSettings.customStartDate || null,
          endDate: syncSettings.customEndDate || null,
        }
      default:
        return { startDate: null, endDate: null }
    }

    return {
      startDate: startDate?.toISOString().split('T')[0] || null,
      endDate: endDate?.toISOString().split('T')[0] || null,
    }
  }

  // Main sync function
  const handleSync = async () => {
    if (!organization?.id || !connection.isConnected) return
    if (!syncSettings.importProducts && !syncSettings.importOrders && !syncSettings.importCustomers) return

    setSyncing(true)
    let productsAdded = 0
    let productsUpdated = 0
    let ordersAdded = 0
    let ordersUpdated = 0
    let customersAdded = 0
    let customersUpdated = 0

    try {
      // Save sync settings to organization
      await setDoc(doc(db, 'organizations', organization.id), {
        shopify: {
          syncMode: syncSettings.syncMode,
          syncSettings: {
            importProducts: syncSettings.importProducts,
            importOrders: syncSettings.importOrders,
            importCustomers: syncSettings.importCustomers,
            orderDateRange: syncSettings.orderDateRange,
          },
        },
      }, { merge: true })

      // Get or create Shopify sales channel
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
          stats: { totalOrders: 0, pendingOrders: 0, totalRevenue: 0 },
          createdAt: serverTimestamp(),
        })
        channelId = newChannel.id
      } else {
        channelId = channelSnapshot.docs[0].id
        channelName = channelSnapshot.docs[0].data().name || 'Shopify'
      }

      // Import Products with costs
      if (syncSettings.importProducts) {
        setSyncProgress({ current: 0, total: 0, status: 'Fetching products from Shopify...' })

        let allProducts: any[] = []
        let pageInfo: string | null = null
        let pageCount = 0

        do {
          pageCount++
          setSyncProgress(prev => ({ ...prev, status: `Fetching products page ${pageCount}...` }))

          const response: Response = await fetch('/api/shopify/fetch-products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              storeName: connection.storeName,
              accessToken: connection.accessToken,
              limit: 250,
              pageInfo,
            }),
          })

          const data = await response.json()
          if (!data.success) throw new Error(data.error || 'Failed to fetch products')

          allProducts = [...allProducts, ...(data.products || [])]
          pageInfo = data.hasNextPage ? data.nextPageInfo : null
        } while (pageInfo)

        // Collect all inventory item IDs to fetch costs
        const inventoryItemIds: string[] = []
        for (const product of allProducts) {
          for (const variant of product.variants || []) {
            if (variant.inventory_item_id) {
              inventoryItemIds.push(variant.inventory_item_id.toString())
            }
          }
        }

        // Fetch inventory item costs in batches
        setSyncProgress(prev => ({ ...prev, status: 'Fetching product costs...' }))
        const inventoryCosts = new Map<string, number>()

        for (let i = 0; i < inventoryItemIds.length; i += 100) {
          const batch = inventoryItemIds.slice(i, i + 100)
          const idsParam = batch.join(',')

          try {
            const costResponse = await fetch(`https://${connection.storeName}.myshopify.com/admin/api/2024-10/inventory_items.json?ids=${idsParam}`, {
              headers: {
                'X-Shopify-Access-Token': connection.accessToken,
                'Content-Type': 'application/json',
              },
            })

            if (costResponse.ok) {
              const costData = await costResponse.json()
              for (const item of costData.inventory_items || []) {
                if (item.cost !== null && item.cost !== undefined) {
                  inventoryCosts.set(item.id.toString(), parseFloat(item.cost))
                }
              }
            }
          } catch (err) {
            console.error('Error fetching inventory costs:', err)
          }
        }

        if (allProducts.length > 0) {
          setSyncProgress({ current: 0, total: allProducts.length, status: 'Processing products...' })

          const productsRef = collection(db, 'organizations', organization.id, 'products')
          const existingSnapshot = await getDocs(productsRef)
          const existingByShopifyId = new Map<string, string>()
          existingSnapshot.docs.forEach(d => {
            const data = d.data()
            if (data.shopifyProductId) existingByShopifyId.set(data.shopifyProductId, d.id)
          })

          for (let i = 0; i < allProducts.length; i++) {
            const product = allProducts[i]
            setSyncProgress({ current: i + 1, total: allProducts.length, status: `Processing ${product.title}...` })

            const productData = mapShopifyProductWithCosts(product, channelId, inventoryCosts)
            const existingId = existingByShopifyId.get(product.id.toString())

            if (existingId) {
              await setDoc(doc(productsRef, existingId), { ...productData, updatedAt: serverTimestamp() }, { merge: true })
              productsUpdated++
            } else {
              await addDoc(productsRef, { ...productData, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
              productsAdded++
            }
          }
        }
      }

      // Import Orders
      if (syncSettings.importOrders) {
        setSyncProgress({ current: 0, total: 0, status: 'Fetching orders from Shopify...' })

        const dateRange = getDateRange()
        let allOrders: any[] = []
        let pageInfo: string | null = null
        let pageCount = 0

        do {
          pageCount++
          setSyncProgress(prev => ({ ...prev, status: `Fetching orders page ${pageCount}...` }))

          const response: Response = await fetch('/api/shopify/fetch-orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              storeName: connection.storeName,
              accessToken: connection.accessToken,
              status: 'any',
              limit: 250,
              pageInfo,
              createdAtMin: dateRange.startDate,
              createdAtMax: dateRange.endDate,
            }),
          })

          const data = await response.json()
          if (!data.success) throw new Error(data.error || 'Failed to fetch orders')

          allOrders = [...allOrders, ...(data.orders || [])]
          pageInfo = data.hasNextPage ? data.nextPageInfo : null
        } while (pageInfo)

        // Filter orders by date if needed (backup client-side filter)
        if (dateRange.startDate || dateRange.endDate) {
          allOrders = allOrders.filter(order => {
            const orderDate = new Date(order.created_at)
            if (dateRange.startDate && orderDate < new Date(dateRange.startDate)) return false
            if (dateRange.endDate && orderDate > new Date(dateRange.endDate + 'T23:59:59')) return false
            return true
          })
        }

        if (allOrders.length > 0) {
          setSyncProgress({ current: 0, total: allOrders.length, status: 'Processing orders...' })

          const ordersRef = collection(db, 'organizations', organization.id, 'orders')
          const existingSnapshot = await getDocs(ordersRef)
          const existingByShopifyId = new Map<string, string>()
          existingSnapshot.docs.forEach(d => {
            const data = d.data()
            if (data.shopifyId) existingByShopifyId.set(data.shopifyId, d.id)
          })

          const productsRef = collection(db, 'organizations', organization.id, 'products')
          const productsSnapshot = await getDocs(productsRef)
          const productsBySku = new Map<string, string>()
          productsSnapshot.docs.forEach(docSnap => {
            const data = docSnap.data()
            if (data.sku) productsBySku.set(data.sku.toLowerCase(), docSnap.id)
          })

          for (let i = 0; i < allOrders.length; i++) {
            const shopifyOrder = allOrders[i]
            const shopifyId = shopifyOrder.id.toString()

            setSyncProgress({ current: i + 1, total: allOrders.length, status: `Processing order ${shopifyOrder.name}...` })

            const orderData = mapShopifyOrder(shopifyOrder, productsBySku, channelId, channelName)
            const existingDocId = existingByShopifyId.get(shopifyId)

            if (existingDocId) {
              await setDoc(doc(ordersRef, existingDocId), { ...orderData, updatedAt: serverTimestamp() }, { merge: true })
              ordersUpdated++
            } else {
              await addDoc(ordersRef, { ...orderData, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
              ordersAdded++
            }
          }
        }
      }

      // Import Customers (runs in background)
      if (syncSettings.importCustomers) {
        setSyncProgress({ current: 0, total: 0, status: 'Starting customer sync (runs in background)...' })

        // Start background sync
        setCustomerSyncStatus({ status: 'running', progress: { current: 0, total: 0, status: 'Starting...' }, error: null })

        // Fire off the background sync - don't await it
        fetch('/api/shopify/sync-customers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ organizationId: organization.id }),
        }).then(async (response) => {
          const data = await response.json()
          if (data.success) {
            customersAdded = data.customersAdded || 0
            customersUpdated = data.customersUpdated || 0
            setCustomerSyncStatus({ status: 'complete', progress: null, error: null })
            success(`Customer sync complete: ${customersAdded} added, ${customersUpdated} updated`)
          } else {
            setCustomerSyncStatus({ status: 'error', progress: null, error: data.error })
          }
        }).catch((err) => {
          setCustomerSyncStatus({ status: 'error', progress: null, error: err.message })
        })

        // Don't wait for customers - mark as started
        setSyncProgress({ current: 0, total: 0, status: 'Customer sync started in background...' })
      }

      // Update sync status
      await setDoc(doc(db, 'organizations', organization.id), {
        shopify: {
          lastSync: serverTimestamp(),
          syncStatus: 'success',
          lastError: null,
          lastSyncStats: {
            productsAdded,
            productsUpdated,
            ordersAdded,
            ordersUpdated,
            customersAdded,
            customersUpdated,
          },
        },
      }, { merge: true })

      setConnection(prev => ({ ...prev, lastSync: new Date(), syncStatus: 'success', lastError: null }))

      const messages: string[] = []
      if (syncSettings.importProducts) messages.push(`${productsAdded + productsUpdated} products (${productsAdded} new, ${productsUpdated} updated)`)
      if (syncSettings.importOrders) messages.push(`${ordersAdded + ordersUpdated} orders (${ordersAdded} new, ${ordersUpdated} updated)`)
      if (syncSettings.importCustomers) messages.push(`${customersAdded + customersUpdated} customers (${customersAdded} new, ${customersUpdated} updated)`)
      success(`Synced: ${messages.join(', ')}`)
    } catch (err: any) {
      console.error('Sync error:', err)

      await setDoc(doc(db, 'organizations', organization.id), {
        shopify: { syncStatus: 'error', lastError: err.message },
      }, { merge: true })

      setConnection(prev => ({ ...prev, syncStatus: 'error', lastError: err.message }))
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
          <h2 className="text-lg font-semibold text-white mb-4">
            <i className="fas fa-sync text-slate-400 mr-2"></i>
            Import Settings
          </h2>

          {/* What to Import */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-3">
              What to Import
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={syncSettings.importProducts}
                  onChange={(e) => setSyncSettings(prev => ({ ...prev, importProducts: e.target.checked }))}
                  className="w-5 h-5 rounded border-slate-600 bg-slate-900 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-800"
                />
                <span className="text-white">
                  <i className="fas fa-box mr-2 text-blue-400"></i>
                  Products
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={syncSettings.importOrders}
                  onChange={(e) => setSyncSettings(prev => ({ ...prev, importOrders: e.target.checked }))}
                  className="w-5 h-5 rounded border-slate-600 bg-slate-900 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-800"
                />
                <span className="text-white">
                  <i className="fas fa-shopping-cart mr-2 text-purple-400"></i>
                  Orders
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={syncSettings.importCustomers}
                  onChange={(e) => setSyncSettings(prev => ({ ...prev, importCustomers: e.target.checked }))}
                  className="w-5 h-5 rounded border-slate-600 bg-slate-900 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-800"
                />
                <span className="text-white">
                  <i className="fas fa-users mr-2 text-amber-400"></i>
                  Customers
                </span>
              </label>
            </div>
          </div>

          {/* Order Date Range */}
          {syncSettings.importOrders && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Order Date Range
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {[
                  { value: 'all', label: 'All Orders' },
                  { value: '30_days', label: 'Last 30 Days' },
                  { value: '90_days', label: 'Last 90 Days' },
                  { value: '6_months', label: 'Last 6 Months' },
                  { value: '1_year', label: 'Last Year' },
                  { value: 'custom', label: 'Custom Range' },
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSyncSettings(prev => ({ ...prev, orderDateRange: option.value as SyncSettings['orderDateRange'] }))}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      syncSettings.orderDateRange === option.value
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {/* Custom Date Range */}
              {syncSettings.orderDateRange === 'custom' && (
                <div className="flex gap-4 mt-3">
                  <div className="flex-1">
                    <label className="block text-xs text-slate-400 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={syncSettings.customStartDate}
                      onChange={(e) => setSyncSettings(prev => ({ ...prev, customStartDate: e.target.value }))}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-slate-400 mb-1">End Date</label>
                    <input
                      type="date"
                      value={syncSettings.customEndDate}
                      onChange={(e) => setSyncSettings(prev => ({ ...prev, customEndDate: e.target.value }))}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sync Mode */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Sync Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setSyncSettings(prev => ({ ...prev, syncMode: 'read_only' }))}
                className={`p-4 rounded-lg border text-left transition-colors ${
                  syncSettings.syncMode === 'read_only'
                    ? 'bg-emerald-600/10 border-emerald-500 text-white'
                    : 'bg-slate-900 border-slate-600 text-slate-300 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center gap-2 font-medium">
                  <i className={`fas fa-eye ${syncSettings.syncMode === 'read_only' ? 'text-emerald-400' : 'text-slate-400'}`}></i>
                  Read Only
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Import data from Shopify. No changes will be pushed back to Shopify.
                </p>
              </button>
              <button
                onClick={() => setSyncSettings(prev => ({ ...prev, syncMode: 'read_write' }))}
                className={`p-4 rounded-lg border text-left transition-colors ${
                  syncSettings.syncMode === 'read_write'
                    ? 'bg-emerald-600/10 border-emerald-500 text-white'
                    : 'bg-slate-900 border-slate-600 text-slate-300 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center gap-2 font-medium">
                  <i className={`fas fa-exchange-alt ${syncSettings.syncMode === 'read_write' ? 'text-emerald-400' : 'text-slate-400'}`}></i>
                  Read & Write
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Two-way sync. Inventory and fulfillment updates will be pushed to Shopify.
                </p>
              </button>
            </div>
          </div>

          {/* Sync Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleSync}
              disabled={syncing || (!syncSettings.importProducts && !syncSettings.importOrders && !syncSettings.importCustomers)}
              className="px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
            >
              {syncing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Syncing...
                </>
              ) : (
                <>
                  <i className="fas fa-download"></i>
                  Start Import
                </>
              )}
            </button>

            {!syncSettings.importProducts && !syncSettings.importOrders && !syncSettings.importCustomers && (
              <span className="text-sm text-amber-400">
                <i className="fas fa-info-circle mr-1"></i>
                Select at least one item to import
              </span>
            )}

            {connection.syncStatus === 'error' && connection.lastError && (
              <div className="text-sm text-red-400">
                <i className="fas fa-exclamation-triangle mr-1"></i>
                {connection.lastError}
              </div>
            )}
          </div>

          {/* Progress Bar */}
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

          {/* Background Customer Sync Status */}
          {customerSyncStatus.status !== 'idle' && (
            <div className={`mt-4 p-4 rounded-lg border ${
              customerSyncStatus.status === 'running'
                ? 'bg-blue-500/10 border-blue-500/30'
                : customerSyncStatus.status === 'complete'
                  ? 'bg-emerald-500/10 border-emerald-500/30'
                  : 'bg-red-500/10 border-red-500/30'
            }`}>
              <div className="flex items-center gap-3">
                {customerSyncStatus.status === 'running' && (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-400 border-t-transparent"></div>
                    <div>
                      <div className="text-blue-400 font-medium">Customer Sync Running</div>
                      <div className="text-sm text-slate-400">
                        {customerSyncStatus.progress?.status || 'Processing...'}
                        {customerSyncStatus.progress?.total ? ` (${customerSyncStatus.progress.current}/${customerSyncStatus.progress.total})` : ''}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        You can leave this page - sync will continue in the background
                      </div>
                    </div>
                  </>
                )}
                {customerSyncStatus.status === 'complete' && (
                  <>
                    <i className="fas fa-check-circle text-emerald-400 text-xl"></i>
                    <div>
                      <div className="text-emerald-400 font-medium">Customer Sync Complete</div>
                      <div className="text-sm text-slate-400">
                        All customers have been imported successfully
                      </div>
                    </div>
                    <button
                      onClick={() => setCustomerSyncStatus({ status: 'idle', progress: null, error: null })}
                      className="ml-auto text-slate-500 hover:text-slate-300"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </>
                )}
                {customerSyncStatus.status === 'error' && (
                  <>
                    <i className="fas fa-exclamation-circle text-red-400 text-xl"></i>
                    <div>
                      <div className="text-red-400 font-medium">Customer Sync Failed</div>
                      <div className="text-sm text-slate-400">
                        {customerSyncStatus.error || 'An error occurred during sync'}
                      </div>
                    </div>
                    <button
                      onClick={() => setCustomerSyncStatus({ status: 'idle', progress: null, error: null })}
                      className="ml-auto text-slate-500 hover:text-slate-300"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </>
                )}
              </div>
              {customerSyncStatus.status === 'running' && customerSyncStatus.progress?.total && customerSyncStatus.progress.total > 0 && (
                <div className="mt-3">
                  <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${(customerSyncStatus.progress.current / customerSyncStatus.progress.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Webhook Settings Section */}
      {connection.isConnected && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-2">
            <i className="fas fa-satellite-dish text-slate-400 mr-2"></i>
            Real-Time Webhooks
          </h2>
          <p className="text-sm text-slate-400 mb-4">
            Enable webhooks to automatically receive updates when orders, products, or inventory change in Shopify.
          </p>

          {/* Webhook Status */}
          <div className="mb-4 p-4 bg-slate-900/50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-300">Webhook Status</span>
                {webhooksLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-400 border-t-transparent"></div>
                ) : webhooks.length > 0 ? (
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                    {webhooks.length} Active
                  </span>
                ) : (
                  <span className="px-2 py-0.5 bg-slate-500/20 text-slate-400 text-xs rounded-full">
                    Not Configured
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {webhooks.length === 0 ? (
                  <button
                    onClick={handleRegisterWebhooks}
                    disabled={registeringWebhooks}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm rounded-lg flex items-center gap-2 transition-colors"
                  >
                    {registeringWebhooks ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent"></div>
                        Enabling...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-plug"></i>
                        Enable Webhooks
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleUnregisterWebhooks}
                    disabled={unregisteringWebhooks}
                    className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 text-sm rounded-lg flex items-center gap-2 transition-colors"
                  >
                    {unregisteringWebhooks ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-2 border-red-400 border-t-transparent"></div>
                        Disabling...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-unlink"></i>
                        Disable All
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Webhook List */}
            {webhooks.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Active Webhooks</div>
                <div className="grid grid-cols-2 gap-2">
                  {webhooks.map((webhook: any) => (
                    <div
                      key={webhook.id}
                      className="flex items-center gap-2 px-3 py-2 bg-slate-800 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      <span className="text-sm text-slate-300 truncate">{webhook.topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {webhooks.length === 0 && !webhooksLoading && (
              <div className="text-center py-4 text-slate-500">
                <i className="fas fa-satellite-dish text-2xl mb-2 opacity-50"></i>
                <p className="text-sm">No webhooks configured. Enable webhooks to receive real-time updates.</p>
              </div>
            )}
          </div>

          {/* Webhook Types Info */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-slate-900/30 rounded-lg">
              <div className="flex items-center gap-2 text-blue-400 mb-1">
                <i className="fas fa-shopping-cart"></i>
                <span className="font-medium">Order Webhooks</span>
              </div>
              <p className="text-slate-500 text-xs">New orders, updates, fulfillments, cancellations</p>
            </div>
            <div className="p-3 bg-slate-900/30 rounded-lg">
              <div className="flex items-center gap-2 text-purple-400 mb-1">
                <i className="fas fa-box"></i>
                <span className="font-medium">Product Webhooks</span>
              </div>
              <p className="text-slate-500 text-xs">Product creates, updates, deletions</p>
            </div>
            <div className="p-3 bg-slate-900/30 rounded-lg">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <i className="fas fa-warehouse"></i>
                <span className="font-medium">Inventory Webhooks</span>
              </div>
              <p className="text-slate-500 text-xs">Stock level changes across locations</p>
            </div>
            <div className="p-3 bg-slate-900/30 rounded-lg">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <i className="fas fa-truck"></i>
                <span className="font-medium">Fulfillment Webhooks</span>
              </div>
              <p className="text-slate-500 text-xs">Shipment tracking and delivery updates</p>
            </div>
            <div className="p-3 bg-slate-900/30 rounded-lg">
              <div className="flex items-center gap-2 text-pink-400 mb-1">
                <i className="fas fa-users"></i>
                <span className="font-medium">Customer Webhooks</span>
              </div>
              <p className="text-slate-500 text-xs">Customer creates, updates, deletions</p>
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
            <div className="text-emerald-400"><i className="fas fa-check mr-1"></i>write_customers</div>
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

// Helper function to map Shopify product with costs from inventory items
function mapShopifyProductWithCosts(shopifyProduct: any, channelId: string, inventoryCosts: Map<string, number>) {
  const hasVariants = shopifyProduct.variants.length > 1 ||
    (shopifyProduct.variants[0]?.title !== 'Default Title')

  // Build a map of variant image IDs to image URLs
  const imageById = new Map<string, string>()
  ;(shopifyProduct.images || []).forEach((img: any) => {
    if (img.variant_ids) {
      img.variant_ids.forEach((vId: number) => {
        imageById.set(vId.toString(), img.src)
      })
    }
  })

  // Map variants with costs from inventory items
  const variants = (shopifyProduct.variants || []).map((v: any, index: number) => {
    const inventoryItemId = v.inventory_item_id?.toString()
    const cost = inventoryCosts.get(inventoryItemId) || 0

    return {
      id: v.id.toString(),
      shopifyVariantId: v.id.toString(),
      title: v.title || 'Default Title',
      position: v.position || index + 1,
      sku: v.sku || '',
      barcode: v.barcode || null,
      price: parseFloat(v.price) || 0,
      compareAtPrice: v.compare_at_price ? parseFloat(v.compare_at_price) : null,
      cost: cost,
      weight: v.weight || 0,
      weightUnit: v.weight_unit || 'lb',
      grams: v.grams || 0,
      inventoryQuantity: v.inventory_quantity || 0,
      inventoryItemId: inventoryItemId,
      inventoryPolicy: v.inventory_policy || 'deny',
      fulfillmentService: v.fulfillment_service || 'manual',
      requiresShipping: v.requires_shipping !== false,
      taxable: v.taxable !== false,
      option1: v.option1 || null,
      option2: v.option2 || null,
      option3: v.option3 || null,
      imageUrl: imageById.get(v.id.toString()) || shopifyProduct.images?.[0]?.src || null,
    }
  })

  // For single variant products, use variant SKU as parent SKU
  const defaultVariant = variants[0]
  const parentSku = hasVariants ? '' : (defaultVariant?.sku || '')
  const parentBarcode = hasVariants ? '' : (defaultVariant?.barcode || '')

  // Get price and cost ranges
  const prices = variants.map((v: any) => v.price).filter((p: number) => p > 0)
  const costs = variants.map((v: any) => v.cost).filter((c: number) => c > 0)
  const lowestPrice = prices.length > 0 ? Math.min(...prices) : 0
  const highestPrice = prices.length > 0 ? Math.max(...prices) : 0
  const avgCost = costs.length > 0 ? costs.reduce((a: number, b: number) => a + b, 0) / costs.length : 0

  // Map images
  const images = (shopifyProduct.images || []).map((img: any) => ({
    shopifyImageId: img.id.toString(),
    src: img.src,
    alt: img.alt || null,
    position: img.position,
  }))

  // Parse product tags
  const productTags = shopifyProduct.tags
    ? shopifyProduct.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
    : []

  return {
    shopifyProductId: shopifyProduct.id.toString(),
    shopifyId: shopifyProduct.id.toString(),
    shopifyHandle: shopifyProduct.handle,

    name: shopifyProduct.title,
    description: shopifyProduct.body_html?.replace(/<[^>]*>/g, '') || '',
    vendor: shopifyProduct.vendor || '',
    productType: shopifyProduct.product_type || '',
    category: shopifyProduct.product_type || 'Uncategorized',

    sku: parentSku,
    barcode: parentBarcode,

    // Pricing with costs
    price: hasVariants ? lowestPrice : (defaultVariant?.price || 0),
    retailPrice: hasVariants ? lowestPrice : (defaultVariant?.price || 0),
    cost: hasVariants ? avgCost : (defaultVariant?.cost || 0),
    compareAtPrice: defaultVariant?.compareAtPrice || null,
    priceRange: hasVariants ? { min: lowestPrice, max: highestPrice } : null,

    weight: defaultVariant?.weight || 0,
    weightUnit: defaultVariant?.weightUnit || 'lb',

    status: shopifyProduct.status || 'active',
    isActive: shopifyProduct.status === 'active',
    isArchived: shopifyProduct.status === 'archived',
    isDraft: shopifyProduct.status === 'draft',

    tags: productTags,
    productTags: productTags,

    // Variant info
    hasVariants,
    variantCount: variants.length,
    variants,
    options: shopifyProduct.options || [],
    totalInventory: variants.reduce((sum: number, v: any) => sum + (v.inventoryQuantity || 0), 0),
    totalStock: variants.reduce((sum: number, v: any) => sum + (v.inventoryQuantity || 0), 0),

    images,
    mainImage: images[0]?.src || null,
    imageUrl: images[0]?.src || null,
    thumbnail: shopifyProduct.image?.src || images[0]?.src || null,

    inventoryQuantity: variants.reduce((sum: number, v: any) => sum + (v.inventoryQuantity || 0), 0),
    inventoryTracking: variants[0]?.inventory_management === 'shopify',

    channelId,
    channelCode: 'shopify',
    source: 'shopify',

    shopifyCreatedAt: new Date(shopifyProduct.created_at),
    shopifyUpdatedAt: new Date(shopifyProduct.updated_at),
    shopifyPublishedAt: shopifyProduct.published_at ? new Date(shopifyProduct.published_at) : null,
  }
}

// Helper function to map Shopify product to our format (legacy - no costs)
function mapShopifyProduct(shopifyProduct: any, channelId: string) {
  const mainVariant = shopifyProduct.variants?.[0] || {}

  // Build a map of variant image IDs to image URLs
  const imageById = new Map<string, string>()
  ;(shopifyProduct.images || []).forEach((img: any) => {
    if (img.variant_ids) {
      img.variant_ids.forEach((vId: number) => {
        imageById.set(vId.toString(), img.src)
      })
    }
  })

  // Map variants with full details
  const variants = (shopifyProduct.variants || []).map((v: any, index: number) => ({
    id: v.id.toString(),
    shopifyVariantId: v.id.toString(),
    title: v.title || 'Default Title',
    position: v.position || index + 1,
    sku: v.sku || '',
    barcode: v.barcode || null,
    price: parseFloat(v.price) || 0,
    compareAtPrice: v.compare_at_price ? parseFloat(v.compare_at_price) : null,
    weight: v.weight || 0,
    weightUnit: v.weight_unit || 'lb',
    grams: v.grams || 0,
    inventoryQuantity: v.inventory_quantity || 0,
    inventoryItemId: v.inventory_item_id?.toString() || null,
    inventoryPolicy: v.inventory_policy || 'deny', // deny or continue
    fulfillmentService: v.fulfillment_service || 'manual',
    requiresShipping: v.requires_shipping !== false,
    taxable: v.taxable !== false,
    option1: v.option1 || null,
    option2: v.option2 || null,
    option3: v.option3 || null,
    imageUrl: imageById.get(v.id.toString()) || shopifyProduct.images?.[0]?.src || null,
  }))

  // Map images
  const images = (shopifyProduct.images || []).map((img: any) => ({
    shopifyImageId: img.id.toString(),
    src: img.src,
    alt: img.alt || null,
    position: img.position,
  }))

  // Parse product tags
  const productTags = shopifyProduct.tags
    ? shopifyProduct.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
    : []

  return {
    shopifyProductId: shopifyProduct.id.toString(),
    shopifyHandle: shopifyProduct.handle,

    name: shopifyProduct.title,
    description: shopifyProduct.body_html || '',
    vendor: shopifyProduct.vendor || '',
    productType: shopifyProduct.product_type || '',

    sku: mainVariant.sku || '',
    barcode: mainVariant.barcode || null,
    price: parseFloat(mainVariant.price) || 0,
    compareAtPrice: mainVariant.compare_at_price ? parseFloat(mainVariant.compare_at_price) : null,
    cost: 0, // Shopify doesn't expose cost in Products API

    weight: mainVariant.weight || 0,
    weightUnit: mainVariant.weight_unit || 'lb',

    // Dimensions - need to be fetched from Inventory Items API separately
    // Shopify stores these on the inventory_item, not the variant
    dimensions: {
      length: null,
      width: null,
      height: null,
      unit: 'in',
    },

    // HS Code and Country of Origin - also from Inventory Items API
    hsCode: null, // harmonized_system_code from inventory_item
    countryOfOrigin: null, // country_code_of_origin from inventory_item

    // Product status: active, archived, draft
    status: shopifyProduct.status || 'active',
    isActive: shopifyProduct.status === 'active',
    isArchived: shopifyProduct.status === 'archived',
    isDraft: shopifyProduct.status === 'draft',

    // Category from product type
    category: shopifyProduct.product_type || 'Uncategorized',

    // Product tags
    tags: productTags,
    productTags: productTags,

    variants,
    hasVariants: variants.length > 1,
    options: shopifyProduct.options || [],
    totalInventory: variants.reduce((sum: number, v: any) => sum + (v.inventoryQuantity || 0), 0),

    images,
    mainImage: images[0]?.src || null,
    imageUrl: images[0]?.src || null,

    inventoryQuantity: variants.reduce((sum: number, v: any) => sum + (v.inventoryQuantity || 0), 0),
    inventoryTracking: mainVariant.inventory_management === 'shopify',

    channelId,
    channelCode: 'shopify',

    shopifyCreatedAt: new Date(shopifyProduct.created_at),
    shopifyUpdatedAt: new Date(shopifyProduct.updated_at),
    shopifyPublishedAt: shopifyProduct.published_at ? new Date(shopifyProduct.published_at) : null,

    source: {
      platform: 'shopify',
      externalId: shopifyProduct.id.toString(),
      importedAt: new Date(),
    },
  }
}

// Helper function to map Shopify customer to our format
function mapShopifyCustomer(shopifyCustomer: any) {
  const shopifyId = shopifyCustomer.id.toString()
  const defaultAddress = shopifyCustomer.default_address || shopifyCustomer.addresses?.[0] || {}

  // Calculate metrics from Shopify customer data
  const totalOrders = shopifyCustomer.orders_count || 0
  const lifetimeValue = parseFloat(shopifyCustomer.total_spent) || 0
  const avgOrderValue = totalOrders > 0 ? lifetimeValue / totalOrders : 0

  // VIP calculation based on lifetime value thresholds
  const vipThresholds = { bronze: 500, silver: 1000, gold: 2500, platinum: 5000 }
  let vipTier: string | null = null
  if (lifetimeValue >= vipThresholds.platinum) vipTier = 'platinum'
  else if (lifetimeValue >= vipThresholds.gold) vipTier = 'gold'
  else if (lifetimeValue >= vipThresholds.silver) vipTier = 'silver'
  else if (lifetimeValue >= vipThresholds.bronze) vipTier = 'bronze'

  const isVip = lifetimeValue >= vipThresholds.bronze || totalOrders >= 5

  // Map all addresses
  const addresses = (shopifyCustomer.addresses || []).map((addr: any) => ({
    id: addr.id?.toString() || '',
    firstName: addr.first_name || '',
    lastName: addr.last_name || '',
    company: addr.company || null,
    address1: addr.address1 || '',
    address2: addr.address2 || null,
    city: addr.city || '',
    province: addr.province || '',
    provinceCode: addr.province_code || '',
    country: addr.country || '',
    countryCode: addr.country_code || '',
    zip: addr.zip || '',
    phone: addr.phone || null,
    isDefault: addr.default === true,
  }))

  return {
    // Shopify identifiers
    shopifyCustomerId: shopifyId,

    // Basic info
    email: shopifyCustomer.email || null,
    phone: shopifyCustomer.phone || null,
    firstName: shopifyCustomer.first_name || '',
    lastName: shopifyCustomer.last_name || '',
    fullName: `${shopifyCustomer.first_name || ''} ${shopifyCustomer.last_name || ''}`.trim() || 'Unknown',

    // Default address
    defaultAddress: defaultAddress ? {
      firstName: defaultAddress.first_name || '',
      lastName: defaultAddress.last_name || '',
      company: defaultAddress.company || null,
      address1: defaultAddress.address1 || '',
      address2: defaultAddress.address2 || null,
      city: defaultAddress.city || '',
      province: defaultAddress.province || '',
      provinceCode: defaultAddress.province_code || '',
      country: defaultAddress.country || '',
      countryCode: defaultAddress.country_code || '',
      zip: defaultAddress.zip || '',
      phone: defaultAddress.phone || null,
    } : null,

    // All addresses
    addresses,

    // Metrics
    metrics: {
      totalOrders,
      lifetimeValue,
      avgOrderValue,
      lastOrderDate: null, // Will be updated when orders are synced
    },

    // VIP status
    isVip,
    vipTier,

    // Marketing
    emailConsent: shopifyCustomer.email_marketing_consent?.state === 'subscribed' ||
                  shopifyCustomer.accepts_marketing === true,
    smsConsent: shopifyCustomer.sms_marketing_consent?.state === 'subscribed' ||
                shopifyCustomer.accepts_marketing_sms === true,

    // Tags - include Shopify tags plus automatic order-based tags
    tags: (() => {
      const shopifyTags = shopifyCustomer.tags
        ? shopifyCustomer.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
        : []

      // Add automatic tags based on order count
      const autoTags: string[] = []
      if (totalOrders > 1) {
        autoTags.push('Existing Customer')
      } else if (totalOrders === 1) {
        autoTags.push('New Customer')
      } else {
        autoTags.push('Potential Customer')
      }

      // Combine and deduplicate tags
      return [...new Set([...shopifyTags, ...autoTags])]
    })(),

    // Notes
    note: shopifyCustomer.note || null,

    // State
    state: shopifyCustomer.state || 'enabled',
    isVerified: shopifyCustomer.verified_email === true,

    // Tax exemptions
    taxExempt: shopifyCustomer.tax_exempt === true,
    taxExemptions: shopifyCustomer.tax_exemptions || [],

    // Currency
    currency: shopifyCustomer.currency || 'USD',

    // Sources - track where this customer came from
    sources: ['shopify'],

    // Shopify timestamps
    shopifyCreatedAt: shopifyCustomer.created_at ? new Date(shopifyCustomer.created_at) : null,
    shopifyUpdatedAt: shopifyCustomer.updated_at ? new Date(shopifyCustomer.updated_at) : null,

    // Source metadata
    source: {
      platform: 'shopify',
      externalId: shopifyId,
      importedAt: new Date(),
    },
  }
}
