'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { useAuth } from '@/context/AuthContext'
import { useOrganization } from '@/context/OrganizationContext'
import { useToast } from '@/components/ui/Toast'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { ShopifySyncSettings, ShopifyConnection } from '@/types'

const DEFAULT_SYNC_SETTINGS: ShopifySyncSettings = {
  productSyncMode: 'read',
  autoSyncProducts: false,
  pushProductChanges: false,
  orderSyncMode: 'read',
  autoSyncOrders: true,
  inventorySyncMode: 'read',
  pushInventoryLevels: false,
  syncIntervalMinutes: 15,
}

type OrderImportMode = 'unfulfilled' | 'all' | 'date_range'
type OrderStatus = 'any' | 'open' | 'closed' | 'cancelled'

export default function ShopifySettingsPage() {
  const { user } = useAuth()
  const { organization } = useOrganization()
  const { success, error } = useToast()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState(false)
  const [syncing, setSyncing] = useState<'products' | 'orders' | null>(null)

  // Order import modal state
  const [showOrderImportModal, setShowOrderImportModal] = useState(false)
  const [orderImportMode, setOrderImportMode] = useState<OrderImportMode>('unfulfilled')
  const [orderImportStatus, setOrderImportStatus] = useState<OrderStatus>('any')
  const [orderStartDate, setOrderStartDate] = useState('')
  const [orderEndDate, setOrderEndDate] = useState('')
  const [importProgress, setImportProgress] = useState<{ imported: number; updated: number; total: number } | null>(null)

  const [connection, setConnection] = useState<ShopifyConnection | null>(null)

  // Form state
  const [storeName, setStoreName] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [showToken, setShowToken] = useState(false)
  const [syncSettings, setSyncSettings] = useState<ShopifySyncSettings>(DEFAULT_SYNC_SETTINGS)
  const [activeTab, setActiveTab] = useState<'connection' | 'sync' | 'logs'>('connection')

  // Load existing connection
  useEffect(() => {
    if (!organization?.id) return

    const loadConnection = async () => {
      try {
        const orgRef = doc(db, 'organizations', organization.id)
        const orgDoc = await getDoc(orgRef)
        if (orgDoc.exists() && orgDoc.data().shopify) {
          const shopify = orgDoc.data().shopify as ShopifyConnection
          setConnection(shopify)
          setStoreName(shopify.storeName || '')
          setAccessToken(shopify.accessToken || '')
          setSyncSettings(shopify.syncSettings || DEFAULT_SYNC_SETTINGS)
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
      error('Please enter store name and access token')
      return
    }

    setTesting(true)
    try {
      const response = await fetch('/api/shopify/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId: organization?.id,
          storeName: storeName.replace('.myshopify.com', ''),
          accessToken,
        }),
      })

      const data = await response.json()

      if (data.success) {
        success(`Connected! Store: ${data.shopName}`)
      } else {
        error(data.error || 'Connection failed')
      }
    } catch (err) {
      console.error('Test connection error:', err)
      error('Failed to test connection')
    } finally {
      setTesting(false)
    }
  }

  // Save connection
  const handleSaveConnection = async () => {
    if (!organization?.id || !user) return
    if (!storeName || !accessToken) {
      error('Please enter store name and access token')
      return
    }

    setSaving(true)
    try {
      const cleanStoreName = storeName.replace('.myshopify.com', '').toLowerCase()

      const orgRef = doc(db, 'organizations', organization.id)
      await updateDoc(orgRef, {
        shopify: {
          isConnected: true,
          storeName: cleanStoreName,
          storeUrl: `${cleanStoreName}.myshopify.com`,
          accessToken,
          lastSyncProducts: null,
          lastSyncOrders: null,
          syncSettings,
          connectedAt: serverTimestamp(),
          connectedBy: user.uid,
        },
      })

      setConnection({
        isConnected: true,
        storeName: cleanStoreName,
        storeUrl: `${cleanStoreName}.myshopify.com`,
        accessToken,
        lastSyncProducts: null,
        lastSyncOrders: null,
        syncSettings,
        connectedAt: new Date(),
        connectedBy: user.uid,
      })

      success('Shopify connected successfully!')
    } catch (err) {
      console.error('Save connection error:', err)
      error('Failed to save connection')
    } finally {
      setSaving(false)
    }
  }

  // Save sync settings
  const handleSaveSyncSettings = async () => {
    if (!organization?.id || !connection) return

    setSaving(true)
    try {
      const orgRef = doc(db, 'organizations', organization.id)
      await updateDoc(orgRef, {
        'shopify.syncSettings': syncSettings,
      })
      success('Sync settings saved')
    } catch (err) {
      console.error('Save settings error:', err)
      error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  // Disconnect
  const handleDisconnect = async () => {
    if (!organization?.id) return
    if (!confirm('Disconnect Shopify? This will stop syncing orders and products.')) return

    try {
      const orgRef = doc(db, 'organizations', organization.id)
      await updateDoc(orgRef, {
        shopify: null,
      })

      setConnection(null)
      setStoreName('')
      setAccessToken('')
      setSyncSettings(DEFAULT_SYNC_SETTINGS)
      success('Shopify disconnected')
    } catch (err) {
      console.error('Disconnect error:', err)
      error('Failed to disconnect')
    }
  }

  // Sync products
  const handleSyncProducts = async () => {
    if (!organization?.id) return

    setSyncing('products')
    try {
      const response = await fetch('/api/shopify/sync-products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ organizationId: organization.id }),
      })

      const data = await response.json()

      if (data.success) {
        success(`Synced ${data.imported} new, ${data.updated} updated products from Shopify`)
        // Refresh connection to get updated lastSyncProducts
        const orgRef = doc(db, 'organizations', organization.id)
        const orgDoc = await getDoc(orgRef)
        if (orgDoc.exists() && orgDoc.data().shopify) {
          setConnection(orgDoc.data().shopify as ShopifyConnection)
        }
      } else {
        error(data.error || 'Sync failed')
      }
    } catch (err) {
      console.error('Sync products error:', err)
      error('Failed to sync products')
    } finally {
      setSyncing(null)
    }
  }

  // Open order import modal
  const openOrderImportModal = () => {
    setOrderImportMode('unfulfilled')
    setOrderImportStatus('any')
    setOrderStartDate('')
    setOrderEndDate('')
    setImportProgress(null)
    setShowOrderImportModal(true)
  }

  // Sync orders with options
  const handleSyncOrders = async () => {
    if (!organization?.id) return

    setSyncing('orders')
    setImportProgress(null)
    try {
      const requestBody: any = {
        organizationId: organization.id,
        importMode: orderImportMode,
        includeStatus: orderImportStatus,
      }

      if (orderImportMode === 'date_range') {
        if (orderStartDate) requestBody.startDate = orderStartDate
        if (orderEndDate) requestBody.endDate = orderEndDate
      }

      const response = await fetch('/api/shopify/sync-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const data = await response.json()

      if (data.success) {
        setImportProgress({
          imported: data.imported,
          updated: data.updated,
          total: data.total
        })
        success(`Imported ${data.imported} new orders, updated ${data.updated} existing (${data.total} total from Shopify)`)
        // Refresh connection to get updated lastSyncOrders
        const orgRef = doc(db, 'organizations', organization.id)
        const orgDoc = await getDoc(orgRef)
        if (orgDoc.exists() && orgDoc.data().shopify) {
          setConnection(orgDoc.data().shopify as ShopifyConnection)
        }
      } else {
        error(data.error || 'Sync failed')
      }
    } catch (err) {
      console.error('Sync orders error:', err)
      error('Failed to sync orders')
    } finally {
      setSyncing(null)
    }
  }

  // Quick sync unfulfilled orders (from connection tab)
  const handleQuickSyncOrders = async () => {
    if (!organization?.id) return

    setSyncing('orders')
    try {
      const response = await fetch('/api/shopify/sync-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId: organization.id,
          importMode: 'unfulfilled'
        }),
      })

      const data = await response.json()

      if (data.success) {
        success(`Synced ${data.imported} new unfulfilled orders from Shopify`)
        const orgRef = doc(db, 'organizations', organization.id)
        const orgDoc = await getDoc(orgRef)
        if (orgDoc.exists() && orgDoc.data().shopify) {
          setConnection(orgDoc.data().shopify as ShopifyConnection)
        }
      } else {
        error(data.error || 'Sync failed')
      }
    } catch (err) {
      console.error('Sync orders error:', err)
      error('Failed to sync orders')
    } finally {
      setSyncing(null)
    }
  }

  const formatLastSync = (date: Date | null | undefined) => {
    if (!date) return 'Never synced'
    const d = date instanceof Date ? date : new Date(date as any)
    return `Last: ${d.toLocaleString()}`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/settings" className="hover:text-white transition-colors">
          Settings
        </Link>
        <i className="fas fa-chevron-right text-xs"></i>
        <span className="text-white">Shopify Integration</span>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-[#96bf48]/20 rounded-xl flex items-center justify-center">
            <i className="fab fa-shopify text-[#96bf48] text-2xl"></i>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Shopify Integration</h1>
            <p className="text-slate-400">Connect your Shopify store to sync products and orders</p>
          </div>
        </div>
      </div>

      {/* Connection Status Banner */}
      {connection?.isConnected && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <i className="fas fa-check text-emerald-400"></i>
              </div>
              <div>
                <span className="text-white font-medium">Connected to </span>
                <span className="text-emerald-400">{connection.storeUrl}</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleDisconnect}>
              <i className="fas fa-unlink mr-2"></i>
              Disconnect
            </Button>
          </div>
        </div>
      )}

      {/* Tabs */}
      {connection?.isConnected && (
        <div className="border-b border-slate-700 mb-6">
          <div className="flex gap-6">
            {[
              { key: 'connection', label: 'Connection', icon: 'fa-plug' },
              { key: 'sync', label: 'Sync Settings', icon: 'fa-sliders-h' },
              { key: 'logs', label: 'Activity', icon: 'fa-history' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <i className={`fas ${tab.icon}`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Connection Tab / Not Connected State */}
      {(!connection?.isConnected || activeTab === 'connection') && (
        <>
          {!connection?.isConnected && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
              <h3 className="text-white font-semibold mb-4">Connect Your Store</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Store Name *</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={storeName}
                      onChange={(e) =>
                        setStoreName(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))
                      }
                      placeholder="your-store-name"
                      className="flex-1 bg-slate-800 border border-slate-600 rounded-l-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                    />
                    <span className="bg-slate-900 border border-l-0 border-slate-600 rounded-r-lg px-4 py-3 text-slate-400">
                      .myshopify.com
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Admin API Access Token *
                  </label>
                  <div className="relative">
                    <input
                      type={showToken ? 'text' : 'password'}
                      value={accessToken}
                      onChange={(e) => setAccessToken(e.target.value)}
                      placeholder="shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-emerald-500 pr-12"
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

                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    onClick={handleTestConnection}
                    disabled={testing || !storeName || !accessToken}
                  >
                    {testing ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Testing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-plug mr-2"></i>
                        Test Connection
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleSaveConnection}
                    disabled={saving || !storeName || !accessToken}
                  >
                    {saving ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Connecting...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-link mr-2"></i>
                        Connect Store
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Sync Actions */}
          {connection?.isConnected && activeTab === 'connection' && (
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Sync Products */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-box text-blue-400"></i>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Products</h3>
                    <p className="text-sm text-slate-400">
                      {formatLastSync(connection.lastSyncProducts as Date | null)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${
                      syncSettings.productSyncMode === 'read'
                        ? 'bg-blue-500/20 text-blue-400'
                        : syncSettings.productSyncMode === 'write'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-emerald-500/20 text-emerald-400'
                    }`}
                  >
                    {syncSettings.productSyncMode === 'read'
                      ? 'Read Only'
                      : syncSettings.productSyncMode === 'write'
                      ? 'Write Only'
                      : 'Bidirectional'}
                  </span>
                </div>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={handleSyncProducts}
                  disabled={syncing === 'products'}
                >
                  {syncing === 'products' ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Syncing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sync mr-2"></i>
                      Sync Products Now
                    </>
                  )}
                </Button>
              </div>

              {/* Sync Orders */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-shopping-cart text-emerald-400"></i>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Orders</h3>
                    <p className="text-sm text-slate-400">
                      {formatLastSync(connection.lastSyncOrders as Date | null)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded text-xs bg-blue-500/20 text-blue-400">
                    Read Only
                  </span>
                </div>
                <div className="space-y-2">
                  <Button className="w-full" onClick={handleQuickSyncOrders} disabled={syncing === 'orders'}>
                    {syncing === 'orders' ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Syncing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-sync mr-2"></i>
                        Sync Unfulfilled Orders
                      </>
                    )}
                  </Button>
                  <Button variant="secondary" className="w-full" onClick={openOrderImportModal} disabled={syncing === 'orders'}>
                    <i className="fas fa-file-import mr-2"></i>
                    Import Historical Orders
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Sync Settings Tab */}
      {connection?.isConnected && activeTab === 'sync' && (
        <div className="space-y-6">
          {/* Product Sync Settings */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <i className="fas fa-box text-blue-400"></i>
              Product Sync Settings
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Sync Mode</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'read', label: 'Read Only', desc: 'Import from Shopify only', icon: 'fa-download' },
                    { value: 'write', label: 'Write Only', desc: 'Push to Shopify only', icon: 'fa-upload' },
                    { value: 'bidirectional', label: 'Bidirectional', desc: 'Sync both ways', icon: 'fa-sync' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() =>
                        setSyncSettings((s) => ({
                          ...s,
                          productSyncMode: option.value as ShopifySyncSettings['productSyncMode'],
                        }))
                      }
                      className={`p-4 rounded-lg border text-left transition-all ${
                        syncSettings.productSyncMode === option.value
                          ? 'border-emerald-500 bg-emerald-500/10'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <i className={`fas ${option.icon} text-xl mb-2 ${
                        syncSettings.productSyncMode === option.value ? 'text-emerald-400' : 'text-slate-400'
                      }`}></i>
                      <div className="text-white font-medium">{option.label}</div>
                      <div className="text-xs text-slate-400">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {(syncSettings.productSyncMode === 'write' ||
                syncSettings.productSyncMode === 'bidirectional') && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <i className="fas fa-exclamation-triangle text-amber-400 mt-0.5"></i>
                    <div className="text-sm">
                      <p className="text-amber-300 font-medium">Write Mode Enabled</p>
                      <p className="text-slate-400 mt-1">
                        Changes made in Cronk WMS will update your Shopify store. Make sure your API
                        token has <code className="text-amber-400">write_products</code> permission.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                <div>
                  <div className="text-white font-medium">Push Product Changes</div>
                  <div className="text-sm text-slate-400">
                    When you edit title, description, or price in WMS, push to Shopify
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={syncSettings.pushProductChanges}
                    onChange={(e) =>
                      setSyncSettings((s) => ({ ...s, pushProductChanges: e.target.checked }))
                    }
                    disabled={syncSettings.productSyncMode === 'read'}
                    className="sr-only peer"
                  />
                  <div
                    className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                      syncSettings.productSyncMode === 'read'
                        ? 'bg-slate-700 opacity-50'
                        : 'bg-slate-700 peer-checked:bg-emerald-500'
                    }`}
                  ></div>
                </label>
              </div>
            </div>
          </div>

          {/* Inventory Sync Settings */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <i className="fas fa-warehouse text-emerald-400"></i>
              Inventory Sync Settings
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Sync Mode</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'read', label: 'Read Only', desc: 'Import levels from Shopify', icon: 'fa-download' },
                    { value: 'write', label: 'Write Only', desc: 'Push levels to Shopify', icon: 'fa-upload' },
                    { value: 'bidirectional', label: 'Bidirectional', desc: 'Sync both ways', icon: 'fa-sync' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() =>
                        setSyncSettings((s) => ({
                          ...s,
                          inventorySyncMode: option.value as ShopifySyncSettings['inventorySyncMode'],
                        }))
                      }
                      className={`p-4 rounded-lg border text-left transition-all ${
                        syncSettings.inventorySyncMode === option.value
                          ? 'border-emerald-500 bg-emerald-500/10'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <i className={`fas ${option.icon} text-xl mb-2 ${
                        syncSettings.inventorySyncMode === option.value ? 'text-emerald-400' : 'text-slate-400'
                      }`}></i>
                      <div className="text-white font-medium">{option.label}</div>
                      <div className="text-xs text-slate-400">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                <div>
                  <div className="text-white font-medium">Push Inventory Levels</div>
                  <div className="text-sm text-slate-400">
                    Keep Shopify inventory in sync with WMS stock levels
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={syncSettings.pushInventoryLevels}
                    onChange={(e) =>
                      setSyncSettings((s) => ({ ...s, pushInventoryLevels: e.target.checked }))
                    }
                    disabled={syncSettings.inventorySyncMode === 'read'}
                    className="sr-only peer"
                  />
                  <div
                    className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                      syncSettings.inventorySyncMode === 'read'
                        ? 'bg-slate-700 opacity-50'
                        : 'bg-slate-700 peer-checked:bg-emerald-500'
                    }`}
                  ></div>
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSaveSyncSettings} disabled={saving}>
              {saving ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Saving...
                </>
              ) : (
                <>
                  <i className="fas fa-save mr-2"></i>
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Activity Tab */}
      {connection?.isConnected && activeTab === 'logs' && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="text-center py-8">
            <i className="fas fa-history text-4xl text-slate-600 mb-4"></i>
            <p className="text-slate-400">Sync activity logs coming soon</p>
          </div>
        </div>
      )}

      {/* Setup Instructions */}
      {!connection?.isConnected && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Setup Instructions</h3>
          <ol className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold">
                1
              </span>
              <span className="text-slate-300">
                Go to your Shopify Admin - Settings - Apps and sales channels
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold">
                2
              </span>
              <span className="text-slate-300">Click &quot;Develop apps&quot; - &quot;Create an app&quot;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold">
                3
              </span>
              <div className="text-slate-300">
                <span>Name it &quot;Cronk WMS&quot; and configure Admin API scopes:</span>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <code className="text-emerald-400 bg-slate-900 px-2 py-1 rounded text-xs">
                    read_products
                  </code>
                  <code className="text-emerald-400 bg-slate-900 px-2 py-1 rounded text-xs">
                    write_products
                  </code>
                  <code className="text-emerald-400 bg-slate-900 px-2 py-1 rounded text-xs">
                    read_orders
                  </code>
                  <code className="text-emerald-400 bg-slate-900 px-2 py-1 rounded text-xs">
                    read_inventory
                  </code>
                  <code className="text-emerald-400 bg-slate-900 px-2 py-1 rounded text-xs">
                    write_inventory
                  </code>
                  <code className="text-emerald-400 bg-slate-900 px-2 py-1 rounded text-xs">
                    read_locations
                  </code>
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold">
                4
              </span>
              <span className="text-slate-300">Install the app and copy the Admin API access token</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold">
                5
              </span>
              <span className="text-slate-300">
                Paste the token above and click &quot;Connect Store&quot;
              </span>
            </li>
          </ol>
        </div>
      )}

      {/* Order Import Modal */}
      {showOrderImportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-xl font-bold text-white">Import Orders from Shopify</h2>
              <button
                onClick={() => setShowOrderImportModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Import Mode Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  What orders do you want to import?
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'unfulfilled', label: 'Unfulfilled Orders Only', desc: 'Orders that need to be fulfilled', icon: 'fa-clock' },
                    { value: 'all', label: 'All Historical Orders', desc: 'Import your entire order history', icon: 'fa-history' },
                    { value: 'date_range', label: 'Date Range', desc: 'Select a specific time period', icon: 'fa-calendar-alt' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setOrderImportMode(option.value as OrderImportMode)}
                      className={`w-full p-4 rounded-lg border text-left transition-all flex items-center gap-4 ${
                        orderImportMode === option.value
                          ? 'border-emerald-500 bg-emerald-500/10'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        orderImportMode === option.value ? 'bg-emerald-500/20' : 'bg-slate-700'
                      }`}>
                        <i className={`fas ${option.icon} ${
                          orderImportMode === option.value ? 'text-emerald-400' : 'text-slate-400'
                        }`}></i>
                      </div>
                      <div>
                        <div className="text-white font-medium">{option.label}</div>
                        <div className="text-sm text-slate-400">{option.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Range Inputs */}
              {orderImportMode === 'date_range' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={orderStartDate}
                      onChange={(e) => setOrderStartDate(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">End Date</label>
                    <input
                      type="date"
                      value={orderEndDate}
                      onChange={(e) => setOrderEndDate(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              )}

              {/* Order Status Filter */}
              {(orderImportMode === 'all' || orderImportMode === 'date_range') && (
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Order Status Filter</label>
                  <select
                    value={orderImportStatus}
                    onChange={(e) => setOrderImportStatus(e.target.value as OrderStatus)}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="any">All Statuses</option>
                    <option value="open">Open Orders</option>
                    <option value="closed">Closed/Completed Orders</option>
                    <option value="cancelled">Cancelled Orders</option>
                  </select>
                </div>
              )}

              {/* Warning for all orders */}
              {orderImportMode === 'all' && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <i className="fas fa-exclamation-triangle text-amber-400 mt-0.5"></i>
                    <div className="text-sm">
                      <p className="text-amber-300 font-medium">Large Import Warning</p>
                      <p className="text-slate-400 mt-1">
                        Importing all historical orders may take several minutes depending on your order volume.
                        The import will run in the background.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Import Progress */}
              {importProgress && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-emerald-400"></i>
                    <div>
                      <p className="text-emerald-300 font-medium">Import Complete!</p>
                      <p className="text-sm text-slate-400">
                        {importProgress.imported} new orders imported, {importProgress.updated} updated
                        ({importProgress.total} total from Shopify)
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-slate-700">
              <Button variant="secondary" onClick={() => setShowOrderImportModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSyncOrders} disabled={syncing === 'orders'}>
                {syncing === 'orders' ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Importing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-file-import mr-2"></i>
                    Start Import
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
