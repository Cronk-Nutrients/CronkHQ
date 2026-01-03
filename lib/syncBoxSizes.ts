import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Product, BoxSizeSettings, InventoryLevel } from '@/types'

/**
 * Syncs box products (shipping supplies of type 'box') to the BoxSizeSettings collection.
 * This allows boxes tracked as inventory to be used in fulfillment workflows.
 */
export async function syncBoxSizesToSettings(organizationId: string): Promise<{
  synced: number
  removed: number
  errors: string[]
}> {
  const errors: string[] = []
  let synced = 0
  let removed = 0

  try {
    // Get all products that are shipping supplies and boxes
    const productsRef = collection(db, 'organizations', organizationId, 'products')
    const boxQuery = query(
      productsRef,
      where('productType', '==', 'shipping_supply'),
      where('supplyType', '==', 'box')
    )
    const boxProductsSnapshot = await getDocs(boxQuery)

    // Get current box settings
    const boxSettingsRef = collection(db, 'organizations', organizationId, 'boxSizes')
    const currentBoxSettingsSnapshot = await getDocs(boxSettingsRef)
    const currentBoxSettings = new Map<string, BoxSizeSettings>()
    currentBoxSettingsSnapshot.forEach(doc => {
      currentBoxSettings.set(doc.id, { id: doc.id, ...doc.data() } as BoxSizeSettings)
    })

    // Get inventory levels for stock counts
    const inventoryRef = collection(db, 'organizations', organizationId, 'inventory')
    const inventorySnapshot = await getDocs(inventoryRef)
    const inventoryByProduct = new Map<string, number>()
    inventorySnapshot.forEach(doc => {
      const data = doc.data() as InventoryLevel
      const currentQty = inventoryByProduct.get(data.productId) || 0
      inventoryByProduct.set(data.productId, currentQty + (data.quantity || 0))
    })

    // Track which product IDs we've synced
    const syncedProductIds = new Set<string>()

    // Use batch for efficiency
    const batch = writeBatch(db)

    // Sync each box product to box settings
    boxProductsSnapshot.forEach(productDoc => {
      const product = { id: productDoc.id, ...productDoc.data() } as Product
      syncedProductIds.add(product.id)

      // Get current stock from inventory
      const currentStock = inventoryByProduct.get(product.id) || 0

      // Build box settings from product
      const boxSettings: Omit<BoxSizeSettings, 'id'> = {
        productId: product.id,
        sku: product.sku,
        name: product.name,
        innerDimensions: {
          length: product.boxDimensions?.innerLength || product.dimensions?.length || 0,
          width: product.boxDimensions?.innerWidth || product.dimensions?.width || 0,
          height: product.boxDimensions?.innerHeight || product.dimensions?.height || 0,
          unit: product.boxDimensions?.unit || 'in',
        },
        outerDimensions: {
          length: product.boxDimensions?.outerLength || product.dimensions?.length || 0,
          width: product.boxDimensions?.outerWidth || product.dimensions?.width || 0,
          height: product.boxDimensions?.outerHeight || product.dimensions?.height || 0,
          unit: product.boxDimensions?.unit || 'in',
        },
        maxWeight: product.maxWeight || 50,
        maxWeightUnit: product.maxWeightUnit || 'lb',
        currentStock,
        isActive: product.isActive !== false && currentStock > 0, // Auto-disable if out of stock
        cost: product.costs?.base || 0,
      }

      // Use product ID as the box settings ID for easy linking
      const boxSettingsDocRef = doc(boxSettingsRef, product.id)
      batch.set(boxSettingsDocRef, {
        ...boxSettings,
        updatedAt: serverTimestamp(),
      }, { merge: true })

      synced++
    })

    // Remove box settings for products that are no longer boxes
    for (const [boxSettingsId, boxSetting] of currentBoxSettings) {
      if (boxSetting.productId && !syncedProductIds.has(boxSetting.productId)) {
        const boxDocRef = doc(boxSettingsRef, boxSettingsId)
        batch.delete(boxDocRef)
        removed++
      }
    }

    await batch.commit()

    return { synced, removed, errors }
  } catch (error: any) {
    errors.push(error.message || 'Unknown error syncing box sizes')
    return { synced, removed, errors }
  }
}

/**
 * Get all available box sizes for an organization (for use in fulfillment)
 */
export async function getAvailableBoxSizes(organizationId: string): Promise<BoxSizeSettings[]> {
  const boxSettingsRef = collection(db, 'organizations', organizationId, 'boxSizes')
  const activeBoxQuery = query(boxSettingsRef, where('isActive', '==', true))
  const snapshot = await getDocs(activeBoxQuery)

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as BoxSizeSettings[]
}

/**
 * Get box size by product ID
 */
export async function getBoxSizeByProductId(
  organizationId: string,
  productId: string
): Promise<BoxSizeSettings | null> {
  const boxSettingsRef = collection(db, 'organizations', organizationId, 'boxSizes')
  const boxQuery = query(boxSettingsRef, where('productId', '==', productId))
  const snapshot = await getDocs(boxQuery)

  if (snapshot.empty) return null

  const doc = snapshot.docs[0]
  return { id: doc.id, ...doc.data() } as BoxSizeSettings
}

/**
 * Check low stock for shipping supplies and return alerts
 */
export async function checkLowStockAlerts(organizationId: string): Promise<{
  lowStockItems: Array<{
    productId: string
    sku: string
    name: string
    currentStock: number
    reorderPoint: number
    reorderQuantity: number
  }>
}> {
  const productsRef = collection(db, 'organizations', organizationId, 'products')
  const supplyQuery = query(
    productsRef,
    where('productType', 'in', ['packing_supply', 'shipping_supply'])
  )
  const supplySnapshot = await getDocs(supplyQuery)

  // Get inventory levels
  const inventoryRef = collection(db, 'organizations', organizationId, 'inventory')
  const inventorySnapshot = await getDocs(inventoryRef)
  const inventoryByProduct = new Map<string, number>()
  inventorySnapshot.forEach(doc => {
    const data = doc.data() as InventoryLevel
    const currentQty = inventoryByProduct.get(data.productId) || 0
    inventoryByProduct.set(data.productId, currentQty + (data.quantity || 0))
  })

  const lowStockItems: Array<{
    productId: string
    sku: string
    name: string
    currentStock: number
    reorderPoint: number
    reorderQuantity: number
  }> = []

  supplySnapshot.forEach(doc => {
    const product = { id: doc.id, ...doc.data() } as Product
    const currentStock = inventoryByProduct.get(product.id) || 0
    const reorderPoint = product.reorderPoint || 0

    if (currentStock <= reorderPoint && product.isActive !== false) {
      lowStockItems.push({
        productId: product.id,
        sku: product.sku,
        name: product.name,
        currentStock,
        reorderPoint,
        reorderQuantity: product.reorderQuantity || 0,
      })
    }
  })

  // Sort by urgency (most below reorder point first)
  lowStockItems.sort((a, b) => {
    const aUrgency = a.reorderPoint - a.currentStock
    const bUrgency = b.reorderPoint - b.currentStock
    return bUrgency - aUrgency
  })

  return { lowStockItems }
}

/**
 * Deduct box from inventory when shipping label is purchased
 */
export async function deductBoxFromInventory(
  organizationId: string,
  boxProductId: string,
  quantity: number = 1,
  orderId?: string,
  locationId?: string
): Promise<{ success: boolean; error?: string; newStock?: number }> {
  try {
    // Get the inventory record(s) for this box product
    const inventoryRef = collection(db, 'organizations', organizationId, 'inventory')

    let inventoryQuery
    if (locationId) {
      // Deduct from specific location
      inventoryQuery = query(
        inventoryRef,
        where('productId', '==', boxProductId),
        where('locationId', '==', locationId)
      )
    } else {
      // Deduct from any location with stock (prefer default warehouse)
      inventoryQuery = query(inventoryRef, where('productId', '==', boxProductId))
    }

    const inventorySnapshot = await getDocs(inventoryQuery)

    if (inventorySnapshot.empty) {
      return { success: false, error: 'Box not found in inventory' }
    }

    // Find an inventory record with enough stock
    let targetDoc = null
    let targetData: InventoryLevel | null = null

    for (const doc of inventorySnapshot.docs) {
      const data = doc.data() as InventoryLevel
      if (data.quantity >= quantity) {
        targetDoc = doc
        targetData = data
        break
      }
    }

    if (!targetDoc || !targetData) {
      // Not enough stock in any single location
      const totalStock = inventorySnapshot.docs.reduce(
        (sum, doc) => sum + (doc.data().quantity || 0),
        0
      )
      return {
        success: false,
        error: `Insufficient stock. Need ${quantity}, have ${totalStock} total.`,
      }
    }

    // Deduct from inventory
    const newQuantity = targetData.quantity - quantity
    const newAvailable = (targetData.availableQuantity || targetData.quantity) - quantity

    await setDoc(
      doc(inventoryRef, targetDoc.id),
      {
        quantity: newQuantity,
        availableQuantity: newAvailable,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )

    // Log the transaction
    const transactionsRef = collection(db, 'organizations', organizationId, 'inventoryTransactions')
    await setDoc(doc(transactionsRef), {
      productId: boxProductId,
      locationId: targetData.locationId,
      type: 'auto_deduction',
      quantity: -quantity,
      reason: 'Box used for shipping',
      referenceType: orderId ? 'order' : undefined,
      referenceId: orderId,
      createdAt: serverTimestamp(),
    })

    // Update box settings stock count
    const boxSettingsRef = doc(db, 'organizations', organizationId, 'boxSizes', boxProductId)
    const totalStock = inventorySnapshot.docs.reduce((sum, docSnap) => {
      if (docSnap.id === targetDoc.id) {
        return sum + newQuantity
      }
      return sum + (docSnap.data().quantity || 0)
    }, 0)

    await setDoc(
      boxSettingsRef,
      {
        currentStock: totalStock,
        isActive: totalStock > 0,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )

    return { success: true, newStock: totalStock }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to deduct box from inventory' }
  }
}

/**
 * Smart box suggestion based on order items
 */
export function suggestBoxForOrder(
  items: Array<{ volume: number; weight: number }>,
  availableBoxes: BoxSizeSettings[]
): BoxSizeSettings | null {
  if (items.length === 0 || availableBoxes.length === 0) return null

  // Calculate total volume and weight
  const totalVolume = items.reduce((sum, item) => sum + item.volume, 0)
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0)

  // Add 10% buffer for packing
  const requiredVolume = totalVolume * 1.1

  // Filter boxes that can fit the items
  const suitableBoxes = availableBoxes
    .filter(box => {
      const boxVolume =
        box.innerDimensions.length * box.innerDimensions.width * box.innerDimensions.height
      const maxWeight = box.maxWeightUnit === 'kg' ? box.maxWeight * 2.205 : box.maxWeight
      return boxVolume >= requiredVolume && maxWeight >= totalWeight && box.currentStock > 0
    })
    .sort((a, b) => {
      // Sort by volume (smallest suitable first)
      const volumeA = a.innerDimensions.length * a.innerDimensions.width * a.innerDimensions.height
      const volumeB = b.innerDimensions.length * b.innerDimensions.width * b.innerDimensions.height
      return volumeA - volumeB
    })

  return suitableBoxes[0] || null
}
