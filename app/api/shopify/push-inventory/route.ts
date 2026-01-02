import { NextRequest, NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase-admin'

export async function POST(request: NextRequest) {
  try {
    const { organizationId, productId, quantity } = await request.json()

    if (!organizationId || !productId) {
      return NextResponse.json({ success: false, error: 'Missing parameters' }, { status: 400 })
    }

    const adminDb = getAdminDb()

    // Get Shopify credentials
    const orgDoc = await adminDb.collection('organizations').doc(organizationId).get()
    if (!orgDoc.exists) {
      return NextResponse.json({ success: false, error: 'Organization not found' }, { status: 404 })
    }

    const orgData = orgDoc.data()
    const shopify = orgData?.shopify

    if (!shopify?.isConnected || !shopify?.accessToken) {
      return NextResponse.json({ success: false, error: 'Shopify not connected' }, { status: 400 })
    }

    // Check if inventory write is enabled
    const syncSettings = shopify.syncSettings || {}
    if (syncSettings.inventorySyncMode === 'read') {
      return NextResponse.json(
        { success: false, error: 'Inventory write not enabled' },
        { status: 400 }
      )
    }

    // Get the product to find Shopify inventory item ID
    const productDoc = await adminDb
      .collection('organizations')
      .doc(organizationId)
      .collection('products')
      .doc(productId)
      .get()

    if (!productDoc.exists) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 })
    }

    const product = productDoc.data()

    if (!product?.shopifyVariantId) {
      return NextResponse.json(
        { success: false, error: 'Product not linked to Shopify' },
        { status: 400 }
      )
    }

    // Get inventory item ID - use cached value if available, otherwise fetch
    let inventoryItemId = product.shopifyInventoryItemId

    if (!inventoryItemId) {
      // Fetch the inventory item ID from the variant
      const variantUrl = `https://${shopify.storeName}.myshopify.com/admin/api/2024-01/variants/${product.shopifyVariantId}.json`
      const variantResponse = await fetch(variantUrl, {
        headers: {
          'X-Shopify-Access-Token': shopify.accessToken,
        },
      })

      if (!variantResponse.ok) {
        return NextResponse.json({ success: false, error: 'Failed to get variant' }, { status: 400 })
      }

      const variantData = await variantResponse.json()
      inventoryItemId = variantData.variant?.inventory_item_id?.toString()

      if (!inventoryItemId) {
        return NextResponse.json(
          { success: false, error: 'No inventory item found' },
          { status: 400 }
        )
      }

      // Cache the inventory item ID on the product
      await productDoc.ref.update({
        shopifyInventoryItemId: inventoryItemId,
      })
    }

    // Get Shopify locations
    const locationsUrl = `https://${shopify.storeName}.myshopify.com/admin/api/2024-01/locations.json`
    const locationsResponse = await fetch(locationsUrl, {
      headers: {
        'X-Shopify-Access-Token': shopify.accessToken,
      },
    })

    if (!locationsResponse.ok) {
      return NextResponse.json({ success: false, error: 'Failed to get locations' }, { status: 400 })
    }

    const locationsData = await locationsResponse.json()
    const shopifyLocationId = locationsData.locations?.[0]?.id // Use first location

    if (!shopifyLocationId) {
      return NextResponse.json(
        { success: false, error: 'No Shopify location found' },
        { status: 400 }
      )
    }

    // Determine the quantity to set
    const newQuantity = quantity ?? product.availableStock ?? 0

    // Set inventory level
    const inventoryUrl = `https://${shopify.storeName}.myshopify.com/admin/api/2024-01/inventory_levels/set.json`
    const inventoryResponse = await fetch(inventoryUrl, {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': shopify.accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location_id: shopifyLocationId,
        inventory_item_id: parseInt(inventoryItemId),
        available: newQuantity,
      }),
    })

    if (!inventoryResponse.ok) {
      const errorText = await inventoryResponse.text()
      console.error('Shopify inventory error:', errorText)
      return NextResponse.json(
        { success: false, error: 'Failed to update inventory' },
        { status: 400 }
      )
    }

    // Update sync timestamp
    await productDoc.ref.update({
      lastInventorySync: new Date(),
    })

    return NextResponse.json({
      success: true,
      message: 'Inventory updated in Shopify',
      quantity: newQuantity,
    })
  } catch (error) {
    console.error('Push inventory error:', error)
    return NextResponse.json({ success: false, error: 'Push failed' }, { status: 500 })
  }
}
