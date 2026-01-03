'use client'

import { useState, useEffect, useCallback } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useOrganization } from '@/context/OrganizationContext'
import { useToast } from '@/components/ui/Toast'
import { Button } from '@/components/ui/Button'
import { BoxSizeSettings, Product } from '@/types'
import { syncBoxSizesToSettings, checkLowStockAlerts } from '@/lib/syncBoxSizes'
import Link from 'next/link'

export default function BoxSizesSettingsPage() {
  const { organization } = useOrganization()
  const { success, error } = useToast()

  const [boxSizes, setBoxSizes] = useState<BoxSizeSettings[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [lowStockItems, setLowStockItems] = useState<Array<{
    productId: string
    sku: string
    name: string
    currentStock: number
    reorderPoint: number
    reorderQuantity: number
  }>>([])

  // Load box sizes with real-time updates
  useEffect(() => {
    if (!organization?.id) return

    const boxSizesRef = collection(db, 'organizations', organization.id, 'boxSizes')
    const unsubscribe = onSnapshot(
      boxSizesRef,
      (snapshot) => {
        const boxes = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as BoxSizeSettings[]

        // Sort by name
        boxes.sort((a, b) => a.name.localeCompare(b.name))
        setBoxSizes(boxes)
        setLoading(false)
      },
      (err) => {
        console.error('Error loading box sizes:', err)
        error('Failed to load box sizes')
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [organization?.id, error])

  // Check for low stock alerts
  useEffect(() => {
    if (!organization?.id) return

    const loadAlerts = async () => {
      try {
        const { lowStockItems: items } = await checkLowStockAlerts(organization.id)
        // Filter to only show boxes
        const boxAlerts = items.filter(item =>
          boxSizes.some(box => box.productId === item.productId)
        )
        setLowStockItems(boxAlerts)
      } catch (err) {
        console.error('Error checking low stock:', err)
      }
    }

    if (boxSizes.length > 0) {
      loadAlerts()
    }
  }, [organization?.id, boxSizes])

  // Sync boxes from products
  const handleSync = async () => {
    if (!organization?.id) return

    setSyncing(true)
    try {
      const result = await syncBoxSizesToSettings(organization.id)

      if (result.errors.length > 0) {
        error(`Sync completed with errors: ${result.errors.join(', ')}`)
      } else {
        success(`Synced ${result.synced} box(es), removed ${result.removed}`)
      }
    } catch (err) {
      console.error('Sync error:', err)
      error('Failed to sync box sizes')
    } finally {
      setSyncing(false)
    }
  }

  // Calculate volume
  const calculateVolume = (dims: { length: number; width: number; height: number }) => {
    return dims.length * dims.width * dims.height
  }

  // Format dimensions
  const formatDimensions = (dims: { length: number; width: number; height: number; unit: string }) => {
    return `${dims.length} x ${dims.width} x ${dims.height} ${dims.unit}`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/settings" className="hover:text-white transition-colors">
          Settings
        </Link>
        <i className="fas fa-chevron-right text-xs"></i>
        <span className="text-white">Box Sizes</span>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Box Sizes</h1>
          <p className="text-slate-400">
            Boxes are auto-populated from products marked as Shipping Supply &rarr; Box
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/products">
            <Button variant="secondary">
              <i className="fas fa-box mr-2"></i>
              Manage Box Products
            </Button>
          </Link>
          <Button onClick={handleSync} disabled={syncing}>
            {syncing ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Syncing...
              </>
            ) : (
              <>
                <i className="fas fa-sync mr-2"></i>
                Sync from Products
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <i className="fas fa-exclamation-triangle text-amber-400"></i>
            </div>
            <div className="flex-1">
              <h3 className="text-amber-400 font-semibold mb-1">Low Stock Alert</h3>
              <p className="text-sm text-amber-300/80 mb-3">
                The following boxes are at or below their reorder point:
              </p>
              <div className="space-y-2">
                {lowStockItems.map(item => (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between bg-amber-500/10 rounded-lg px-3 py-2"
                  >
                    <div>
                      <span className="text-white font-medium">{item.name}</span>
                      <span className="text-amber-400 text-sm ml-2">({item.sku})</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-red-400 font-medium">{item.currentStock}</span>
                      <span className="text-slate-400"> / {item.reorderPoint} min</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Card */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <i className="fas fa-info-circle text-blue-400"></i>
          </div>
          <div>
            <h3 className="text-blue-400 font-semibold mb-1">How it works</h3>
            <ul className="text-sm text-blue-300/80 space-y-1">
              <li><i className="fas fa-check text-blue-400 mr-2"></i>Create a product with type &quot;Shipping Supply&quot; and subtype &quot;Box&quot;</li>
              <li><i className="fas fa-check text-blue-400 mr-2"></i>Add inner and outer dimensions for the box</li>
              <li><i className="fas fa-check text-blue-400 mr-2"></i>The box will automatically appear here for use in fulfillment</li>
              <li><i className="fas fa-check text-blue-400 mr-2"></i>When you ship an order, the box inventory is automatically deducted</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Box Sizes Grid */}
      {boxSizes.length === 0 ? (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-12 text-center">
          <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-box-open text-2xl text-slate-500"></i>
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No boxes configured yet</h3>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            Create products with type &quot;Shipping Supply&quot; &rarr; &quot;Box&quot; to add boxes for fulfillment.
          </p>
          <Link href="/products">
            <Button>
              <i className="fas fa-plus mr-2"></i>
              Add Box Product
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {boxSizes.map(box => (
            <div
              key={box.id}
              className={`bg-slate-800/50 border rounded-xl p-5 transition-all ${
                box.isActive
                  ? 'border-slate-700 hover:border-emerald-500/50'
                  : 'border-slate-700/50 opacity-60'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    box.isActive ? 'bg-emerald-500/20' : 'bg-slate-700/50'
                  }`}>
                    <i className={`fas fa-box text-xl ${
                      box.isActive ? 'text-emerald-400' : 'text-slate-500'
                    }`}></i>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{box.name}</h3>
                    <p className="text-sm text-slate-400">{box.sku}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  box.isActive
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-slate-700 text-slate-400'
                }`}>
                  {box.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* Dimensions */}
              <div className="space-y-3 mb-4">
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Inner (Usable)</div>
                  <div className="text-white font-mono">
                    {formatDimensions(box.innerDimensions)}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {calculateVolume(box.innerDimensions).toLocaleString()} cu in
                  </div>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Outer (Shipping)</div>
                  <div className="text-white font-mono">
                    {formatDimensions(box.outerDimensions)}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-900/50 rounded-lg p-2">
                  <div className="text-xs text-slate-500">Max Weight</div>
                  <div className="text-white font-semibold">
                    {box.maxWeight} {box.maxWeightUnit}
                  </div>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-2">
                  <div className="text-xs text-slate-500">Stock</div>
                  <div className={`font-semibold ${
                    box.currentStock <= 5 ? 'text-red-400' :
                    box.currentStock <= 20 ? 'text-amber-400' :
                    'text-emerald-400'
                  }`}>
                    {box.currentStock}
                  </div>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-2">
                  <div className="text-xs text-slate-500">Cost</div>
                  <div className="text-white font-semibold">
                    ${box.cost.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Edit Link */}
              <Link
                href={`/products?search=${encodeURIComponent(box.sku)}`}
                className="mt-4 block text-center text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <i className="fas fa-pencil mr-1"></i>
                Edit in Products
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
