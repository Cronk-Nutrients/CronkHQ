import { NextRequest, NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase-admin'

export async function POST(request: NextRequest) {
  try {
    const { organizationId } = await request.json()

    if (!organizationId) {
      return NextResponse.json({ success: false, error: 'Missing organization ID' }, { status: 400 })
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

    // Fetch unfulfilled orders from Shopify
    const shopifyUrl = `https://${shopify.storeName}.myshopify.com/admin/api/2024-01/orders.json?status=open&fulfillment_status=unfulfilled&limit=250`

    const response = await fetch(shopifyUrl, {
      headers: {
        'X-Shopify-Access-Token': shopify.accessToken,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Shopify fetch orders error:', errorText)
      return NextResponse.json({ success: false, error: 'Failed to fetch orders' }, { status: 400 })
    }

    const data = await response.json()
    const shopifyOrders = data.orders || []

    // Get existing orders by Shopify ID
    const ordersRef = adminDb.collection('organizations').doc(organizationId).collection('orders')
    const existingSnapshot = await ordersRef.where('shopifyId', '!=', null).get()
    const existingByShopifyId = new Set<string>()
    existingSnapshot.docs.forEach((docSnap) => {
      const docData = docSnap.data()
      if (docData.shopifyId) {
        existingByShopifyId.add(docData.shopifyId)
      }
    })

    // Get products for SKU matching
    const productsRef = adminDb.collection('organizations').doc(organizationId).collection('products')
    const productsSnapshot = await productsRef.get()
    const productsBySku = new Map<string, string>()
    productsSnapshot.docs.forEach((docSnap) => {
      const docData = docSnap.data()
      if (docData.sku) {
        productsBySku.set(docData.sku.toLowerCase(), docSnap.id)
      }
    })

    let imported = 0
    let skipped = 0

    for (const shopifyOrder of shopifyOrders) {
      const shopifyId = shopifyOrder.id.toString()

      // Skip if already imported
      if (existingByShopifyId.has(shopifyId)) {
        skipped++
        continue
      }

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
          requiresShipping: item.requires_shipping,
          fulfillableQuantity: item.fulfillable_quantity,
          fulfillmentStatus: 'unfulfilled',
        }
      })

      const shippingAddress = shopifyOrder.shipping_address || {}
      const customer = shopifyOrder.customer || {}

      const orderData = {
        shopifyId,
        shopifyOrderNumber: `#${shopifyOrder.order_number}`,
        shopifyOrderName: shopifyOrder.name,

        status: 'pending',
        fulfillmentStatus: shopifyOrder.fulfillment_status || 'unfulfilled',
        paymentStatus: shopifyOrder.financial_status === 'paid' ? 'paid' : 'pending',

        customer: {
          id: customer.id?.toString() || '',
          email: shopifyOrder.email || '',
          firstName: customer.first_name || '',
          lastName: customer.last_name || '',
          phone: customer.phone || null,
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

        lineItems,

        subtotal: parseFloat(shopifyOrder.subtotal_price) || 0,
        shippingTotal:
          parseFloat(shopifyOrder.total_shipping_price_set?.shop_money?.amount) || 0,
        taxTotal: parseFloat(shopifyOrder.total_tax) || 0,
        discountTotal: parseFloat(shopifyOrder.total_discounts) || 0,
        total: parseFloat(shopifyOrder.total_price) || 0,
        currency: shopifyOrder.currency || 'USD',

        shippingMethod: shopifyOrder.shipping_lines?.[0]?.title || null,

        note: shopifyOrder.note || null,
        tags: shopifyOrder.tags ? shopifyOrder.tags.split(',').map((t: string) => t.trim()) : [],

        shopifyCreatedAt: new Date(shopifyOrder.created_at),
        createdAt: new Date(),
        updatedAt: new Date(),
        source: 'shopify',
      }

      await ordersRef.add(orderData)
      imported++
    }

    // Update last sync time
    await adminDb.collection('organizations').doc(organizationId).update({
      'shopify.lastSyncOrders': new Date(),
    })

    return NextResponse.json({
      success: true,
      imported,
      skipped,
      total: shopifyOrders.length,
    })
  } catch (error) {
    console.error('Sync orders error:', error)
    return NextResponse.json({ success: false, error: 'Sync failed' }, { status: 500 })
  }
}
