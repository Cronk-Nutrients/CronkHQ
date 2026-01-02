import { NextRequest, NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase-admin'

export async function POST(request: NextRequest) {
  try {
    const { organizationId, productId } = await request.json()

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

    // Check if write mode is enabled
    const syncSettings = shopify.syncSettings || {}
    if (syncSettings.productSyncMode === 'read') {
      return NextResponse.json({ success: false, error: 'Write mode not enabled' }, { status: 400 })
    }

    // Get the product
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

    if (!product?.shopifyId) {
      return NextResponse.json(
        { success: false, error: 'Product not linked to Shopify' },
        { status: 400 }
      )
    }

    // Prepare Shopify update payload
    const updatePayload: any = {
      product: {
        id: parseInt(product.shopifyId),
        title: product.name,
        body_html: product.description || '',
      },
    }

    // If we have variant info, update variant too
    if (product.shopifyVariantId) {
      updatePayload.product.variants = [
        {
          id: parseInt(product.shopifyVariantId),
          price: product.retailPrice?.toString() || '0',
          compare_at_price: product.compareAtPrice?.toString() || null,
          barcode: product.barcode || null,
          weight: product.weight || 0,
          weight_unit: product.weightUnit || 'lb',
        },
      ]
    }

    // Push to Shopify
    const shopifyUrl = `https://${shopify.storeName}.myshopify.com/admin/api/2024-01/products/${product.shopifyId}.json`

    const response = await fetch(shopifyUrl, {
      method: 'PUT',
      headers: {
        'X-Shopify-Access-Token': shopify.accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatePayload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Shopify update error:', errorText)
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to update Shopify product',
        },
        { status: 400 }
      )
    }

    // Update sync timestamp on product
    await productDoc.ref.update({
      lastShopifySync: new Date(),
    })

    return NextResponse.json({
      success: true,
      message: 'Product updated in Shopify',
    })
  } catch (error) {
    console.error('Push product error:', error)
    return NextResponse.json({ success: false, error: 'Push failed' }, { status: 500 })
  }
}
