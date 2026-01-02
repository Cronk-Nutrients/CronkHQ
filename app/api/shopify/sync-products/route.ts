import { NextRequest, NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase-admin'

export async function POST(request: NextRequest) {
  try {
    const { organizationId } = await request.json()

    if (!organizationId) {
      return NextResponse.json({ success: false, error: 'Missing organization ID' }, { status: 400 })
    }

    let adminDb
    try {
      adminDb = getAdminDb()
    } catch (adminError: any) {
      console.error('Firebase Admin init error:', adminError)
      return NextResponse.json({
        success: false,
        error: 'Server configuration error. Please contact support.'
      }, { status: 500 })
    }

    // Get Shopify credentials from organization
    const orgDoc = await adminDb.collection('organizations').doc(organizationId).get()
    if (!orgDoc.exists) {
      return NextResponse.json({ success: false, error: 'Organization not found' }, { status: 404 })
    }

    const orgData = orgDoc.data()
    const shopify = orgData?.shopify

    if (!shopify?.isConnected || !shopify?.accessToken) {
      return NextResponse.json({ success: false, error: 'Shopify not connected' }, { status: 400 })
    }

    // Fetch products from Shopify
    const shopifyUrl = `https://${shopify.storeName}.myshopify.com/admin/api/2024-01/products.json?limit=250`

    const response = await fetch(shopifyUrl, {
      headers: {
        'X-Shopify-Access-Token': shopify.accessToken,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Shopify fetch products error:', errorText)
      return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 400 })
    }

    const data = await response.json()
    const shopifyProducts = data.products || []

    // Get existing products by SKU
    const productsRef = adminDb.collection('organizations').doc(organizationId).collection('products')
    const existingSnapshot = await productsRef.get()
    const existingBySku = new Map<string, string>()
    existingSnapshot.docs.forEach((docSnap) => {
      const docData = docSnap.data()
      if (docData.sku) {
        existingBySku.set(docData.sku.toLowerCase(), docSnap.id)
      }
    })

    let imported = 0
    let updated = 0
    let skipped = 0

    // Process each Shopify product
    for (const shopifyProduct of shopifyProducts) {
      for (const variant of shopifyProduct.variants || []) {
        const sku = variant.sku?.trim()
        if (!sku) {
          skipped++
          continue
        }

        const existingId = existingBySku.get(sku.toLowerCase())

        if (existingId) {
          // Update existing product with Shopify link
          await productsRef.doc(existingId).update({
            shopifyId: shopifyProduct.id.toString(),
            shopifyVariantId: variant.id.toString(),
            shopifyHandle: shopifyProduct.handle,
            shopifyInventoryItemId: variant.inventory_item_id?.toString() || null,
            updatedAt: new Date(),
          })
          updated++
        } else {
          // Create new product from Shopify
          const productData = {
            name:
              variant.title !== 'Default Title'
                ? `${shopifyProduct.title} - ${variant.title}`
                : shopifyProduct.title,
            sku,
            category: shopifyProduct.product_type || 'Uncategorized',
            description: shopifyProduct.body_html?.replace(/<[^>]*>/g, '') || '',
            barcode: variant.barcode || null,
            status: shopifyProduct.status === 'active' ? 'active' : 'inactive',

            // Pricing
            cost: parseFloat(variant.cost) || 0,
            retailPrice: parseFloat(variant.price) || 0,
            compareAtPrice: variant.compare_at_price ? parseFloat(variant.compare_at_price) : null,

            // Physical
            weight: parseFloat(variant.weight) || 0,
            weightUnit: variant.weight_unit || 'lb',

            // Shopify references
            shopifyId: shopifyProduct.id.toString(),
            shopifyVariantId: variant.id.toString(),
            shopifyHandle: shopifyProduct.handle,
            shopifyInventoryItemId: variant.inventory_item_id?.toString() || null,

            // Images
            images: [],
            thumbnail: shopifyProduct.image?.src || null,

            // Defaults
            customPrices: {},
            totalStock: 0,
            availableStock: 0,
            reservedStock: 0,
            lowStockThreshold: 10,

            createdAt: new Date(),
            updatedAt: new Date(),
            source: 'shopify',
          }

          // Create a safe document ID from SKU
          const docId = sku.replace(/[\/\\#\[\].]/g, '_')
          await productsRef.doc(docId).set(productData)
          imported++
        }
      }
    }

    // Update last sync time
    await adminDb.collection('organizations').doc(organizationId).update({
      'shopify.lastSyncProducts': new Date(),
    })

    return NextResponse.json({
      success: true,
      imported,
      updated,
      skipped,
      total: shopifyProducts.length,
    })
  } catch (error) {
    console.error('Sync products error:', error)
    return NextResponse.json({ success: false, error: 'Sync failed' }, { status: 500 })
  }
}
