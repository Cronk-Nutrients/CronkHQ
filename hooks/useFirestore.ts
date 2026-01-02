'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { QueryConstraint, orderBy, where, limit } from 'firebase/firestore'
import { useAuth } from '@/context/AuthContext'
import { useOrganization } from '@/context/OrganizationContext'
import { FirestoreService, isDemoOrganization } from '@/lib/firestore'
import {
  Product,
  Order,
  PurchaseOrder,
  WorkOrder,
  Supplier,
  Location,
  Return,
  StockTransfer,
  Bundle,
  InventoryLevel,
  InventoryItem,
} from '@/types'

// Generic hook for Firestore collections
function useFirestoreCollection<T extends { id: string }>(
  collectionName: string,
  queryConstraints: QueryConstraint[] = [],
  enabled: boolean = true
) {
  const { organization } = useOrganization()
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const orgId = organization?.id

  const service = useMemo(() => {
    if (!orgId) return null
    // Skip Firestore for demo org
    if (isDemoOrganization(orgId)) return null
    return new FirestoreService<T>(orgId, collectionName)
  }, [orgId, collectionName])

  useEffect(() => {
    // For demo mode, don't fetch from Firestore
    if (!orgId || isDemoOrganization(orgId)) {
      setLoading(false)
      return
    }

    if (!service || !enabled) {
      setLoading(false)
      return
    }

    setLoading(true)

    const unsubscribe = service.subscribe(
      (newData) => {
        setData(newData)
        setLoading(false)
        setError(null)
      },
      (err) => {
        console.error(`Error fetching ${collectionName}:`, err)
        setError(err)
        setLoading(false)
      },
      ...queryConstraints
    )

    return () => unsubscribe()
  }, [service, enabled, orgId, collectionName, JSON.stringify(queryConstraints)])

  const create = useCallback(
    async (item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => {
      if (!service) throw new Error('No organization or in demo mode')
      return service.create(item)
    },
    [service]
  )

  const update = useCallback(
    async (id: string, updates: Partial<T>) => {
      if (!service) throw new Error('No organization or in demo mode')
      return service.update(id, updates)
    },
    [service]
  )

  const remove = useCallback(
    async (id: string) => {
      if (!service) throw new Error('No organization or in demo mode')
      return service.delete(id)
    },
    [service]
  )

  const getById = useCallback(
    async (id: string) => {
      if (!service) throw new Error('No organization or in demo mode')
      return service.get(id)
    },
    [service]
  )

  return {
    data,
    loading,
    error,
    create,
    update,
    remove,
    getById,
    service,
    isDemo: orgId ? isDemoOrganization(orgId) : false,
  }
}

// Products hook
export function useProducts() {
  const result = useFirestoreCollection<Product>('products', [orderBy('name')])

  return {
    products: result.data,
    ...result,
  }
}

// Single product hook
export function useProduct(productId: string | null) {
  const { organization } = useOrganization()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const orgId = organization?.id

  useEffect(() => {
    if (!orgId || !productId || isDemoOrganization(orgId)) {
      setLoading(false)
      return
    }

    const service = new FirestoreService<Product>(orgId, 'products')

    const unsubscribe = service.subscribeToDoc(
      productId,
      (data) => {
        setProduct(data)
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [orgId, productId])

  return { product, loading, error }
}

// Orders hook
export function useOrders(status?: string) {
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')]

  if (status && status !== 'all') {
    constraints.unshift(where('status', '==', status))
  }

  const result = useFirestoreCollection<Order>('orders', constraints)

  return {
    orders: result.data,
    ...result,
  }
}

// Recent orders hook (for dashboard)
export function useRecentOrders(count: number = 10) {
  const result = useFirestoreCollection<Order>('orders', [
    orderBy('createdAt', 'desc'),
    limit(count),
  ])

  return {
    orders: result.data,
    ...result,
  }
}

// Purchase Orders hook
export function usePurchaseOrders(status?: string) {
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')]

  if (status && status !== 'all') {
    constraints.unshift(where('status', '==', status))
  }

  const result = useFirestoreCollection<PurchaseOrder>('purchaseOrders', constraints)

  return {
    purchaseOrders: result.data,
    ...result,
  }
}

// Work Orders hook
export function useWorkOrders(status?: string) {
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')]

  if (status && status !== 'all') {
    constraints.unshift(where('status', '==', status))
  }

  const result = useFirestoreCollection<WorkOrder>('workOrders', constraints)

  return {
    workOrders: result.data,
    ...result,
  }
}

// Suppliers hook
export function useSuppliers() {
  const result = useFirestoreCollection<Supplier>('suppliers', [orderBy('name')])

  return {
    suppliers: result.data,
    ...result,
  }
}

// Locations hook
export function useLocations() {
  const result = useFirestoreCollection<Location>('locations', [orderBy('name')])

  return {
    locations: result.data,
    ...result,
  }
}

// Returns hook
export function useReturns(status?: string) {
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')]

  if (status && status !== 'all') {
    constraints.unshift(where('status', '==', status))
  }

  const result = useFirestoreCollection<Return>('returns', constraints)

  return {
    returns: result.data,
    ...result,
  }
}

// Stock Transfers hook
export function useStockTransfers(status?: string) {
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')]

  if (status && status !== 'all') {
    constraints.unshift(where('status', '==', status))
  }

  const result = useFirestoreCollection<StockTransfer>('transfers', constraints)

  return {
    transfers: result.data,
    ...result,
  }
}

// Bundles hook
export function useBundles() {
  const result = useFirestoreCollection<Bundle>('bundles', [orderBy('name')])

  return {
    bundles: result.data,
    ...result,
  }
}

// Inventory levels hook
export function useInventory(locationId?: string) {
  const constraints: QueryConstraint[] = []

  if (locationId) {
    constraints.push(where('locationId', '==', locationId))
  }

  const result = useFirestoreCollection<InventoryItem>('inventory', constraints)

  return {
    inventory: result.data,
    ...result,
  }
}

// Low stock products hook
export function useLowStockProducts() {
  const { products } = useProducts()

  const lowStock = useMemo(() => {
    return products.filter(p => {
      // Check using reorderPoint as threshold
      const threshold = p.reorderPoint || 10
      // We need inventory data to check actual stock levels
      // For now, just return empty as we need to join with inventory
      return false
    })
  }, [products])

  const outOfStock = useMemo(() => {
    // Need inventory data to determine out of stock
    return []
  }, [products])

  return { lowStock, outOfStock }
}

// Dashboard stats hook - combines real Firestore data with demo fallback
export function useDashboardStats() {
  const { orders, loading: ordersLoading, isDemo } = useOrders()
  const { products, loading: productsLoading } = useProducts()

  const stats = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todayOrders = orders.filter(o => {
      const createdAt = o.createdAt as string | Date
      const orderDate = typeof createdAt === 'string'
        ? new Date(createdAt)
        : createdAt instanceof Date
          ? createdAt
          : new Date()
      return orderDate >= today
    })

    const pendingOrders = orders.filter(o =>
      ['pending', 'to_pick', 'to_pack'].includes(o.status)
    )

    const shippedToday = orders.filter(o => {
      if (o.status !== 'shipped' && o.status !== 'delivered') return false
      // Check shipments for shipped date
      const shippedDate = o.shipments?.[0]?.shippedAt
      if (!shippedDate) return false
      const shipped = typeof shippedDate === 'string' ? new Date(shippedDate) : new Date()
      return shipped >= today
    })

    return {
      todayOrders: todayOrders.length,
      todayRevenue: todayOrders.reduce((sum, o) => sum + (o.total || 0), 0),
      pendingOrders: pendingOrders.length,
      shippedToday: shippedToday.length,
      totalProducts: products.length,
      lowStockCount: 0, // Would need inventory join
      outOfStockCount: 0, // Would need inventory join
    }
  }, [orders, products])

  return {
    ...stats,
    loading: ordersLoading || productsLoading,
    isDemo,
  }
}

// Hook for combined product + inventory data
export function useProductsWithInventory() {
  const { products, loading: productsLoading, ...productMethods } = useProducts()
  const { inventory, loading: inventoryLoading } = useInventory()

  const productsWithStock = useMemo(() => {
    return products.map(product => {
      const stockItems = inventory.filter(i => i.productId === product.id)
      const totalStock = stockItems.reduce((sum, i) => sum + i.quantity, 0)

      return {
        ...product,
        totalStock,
        stockByLocation: stockItems,
      }
    })
  }, [products, inventory])

  return {
    products: productsWithStock,
    loading: productsLoading || inventoryLoading,
    ...productMethods,
  }
}
