import { NextRequest, NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase-admin'

interface ShopifyLineItem {
  id: number
  product_id: number | null
  variant_id: number | null
  sku: string | null
  name: string
  title: string
  variant_title: string | null
  quantity: number
  price: string
  total_discount: string
  requires_shipping: boolean
  fulfillable_quantity: number
  fulfillment_status: string | null
  grams: number
  vendor: string | null
  properties: { name: string; value: string }[]
  gift_card: boolean
  taxable: boolean
  tax_lines: { title: string; price: string; rate: number }[]
}

interface ShopifyAddress {
  first_name: string
  last_name: string
  company: string | null
  address1: string
  address2: string | null
  city: string
  province: string
  province_code: string
  country: string
  country_code: string
  zip: string
  phone: string | null
  name: string
  latitude: number | null
  longitude: number | null
}

interface ShopifyFulfillment {
  id: number
  order_id: number
  status: string
  created_at: string
  updated_at: string
  tracking_company: string | null
  tracking_number: string | null
  tracking_numbers: string[]
  tracking_url: string | null
  tracking_urls: string[]
  shipment_status: string | null
  line_items: ShopifyLineItem[]
}

interface ShopifyRefundLineItem {
  id: number
  quantity: number
  line_item_id: number
  restock_type: string
  subtotal: string
  total_tax: string
}

interface ShopifyRefund {
  id: number
  order_id: number
  created_at: string
  note: string | null
  user_id: number | null
  processed_at: string
  refund_line_items: ShopifyRefundLineItem[]
  transactions: {
    id: number
    amount: string
    kind: string
    gateway: string
    status: string
  }[]
}

interface ShopifyOrder {
  id: number
  order_number: number
  name: string
  email: string
  phone: string | null
  created_at: string
  updated_at: string
  processed_at: string
  closed_at: string | null
  cancelled_at: string | null
  cancel_reason: string | null

  financial_status: string
  fulfillment_status: string | null

  currency: string
  subtotal_price: string
  total_price: string
  total_tax: string
  total_discounts: string
  total_shipping_price_set: { shop_money: { amount: string } }
  total_weight: number

  note: string | null
  note_attributes: { name: string; value: string }[]
  tags: string

  customer: {
    id: number
    email: string
    first_name: string
    last_name: string
    phone: string | null
    orders_count: number
    total_spent: string
    tags: string
  } | null

  billing_address: ShopifyAddress | null
  shipping_address: ShopifyAddress | null

  line_items: ShopifyLineItem[]
  shipping_lines: {
    id: number
    title: string
    price: string
    code: string | null
    source: string
    carrier_identifier: string | null
    requested_fulfillment_service_id: string | null
  }[]

  discount_codes: {
    code: string
    amount: string
    type: string
  }[]
  discount_applications: {
    type: string
    title: string | null
    description: string | null
    value: string
    value_type: string
    allocation_method: string
    target_selection: string
    target_type: string
  }[]

  fulfillments: ShopifyFulfillment[]
  refunds: ShopifyRefund[]

  payment_gateway_names: string[]
  processing_method: string
  source_name: string

  tax_lines: { title: string; price: string; rate: number }[]

  browser_ip: string | null
  landing_site: string | null
  referring_site: string | null

  location_id: number | null

  gateway: string
  test: boolean
  confirmed: boolean
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      organizationId,
      importMode = 'unfulfilled',  // 'unfulfilled' | 'all' | 'date_range'
      startDate,                   // ISO date string for date_range mode
      endDate,                     // ISO date string for date_range mode
      includeStatus = 'any'        // 'any' | 'open' | 'closed' | 'cancelled'
    } = body

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

    // Build query parameters based on import mode
    const queryParams = new URLSearchParams()
    queryParams.set('limit', '250')

    if (importMode === 'unfulfilled') {
      queryParams.set('status', 'open')
      queryParams.set('fulfillment_status', 'unfulfilled')
    } else if (importMode === 'date_range') {
      if (startDate) {
        queryParams.set('created_at_min', new Date(startDate).toISOString())
      }
      if (endDate) {
        queryParams.set('created_at_max', new Date(endDate).toISOString())
      }
      if (includeStatus !== 'any') {
        queryParams.set('status', includeStatus)
      }
    } else {
      // Import all - no filters except status if specified
      if (includeStatus !== 'any') {
        queryParams.set('status', includeStatus)
      }
    }

    // Get existing orders by Shopify ID
    const ordersRef = adminDb.collection('organizations').doc(organizationId).collection('orders')
    const existingSnapshot = await ordersRef.where('shopifyId', '!=', null).get()
    const existingByShopifyId = new Map<string, string>()
    existingSnapshot.docs.forEach((docSnap) => {
      const docData = docSnap.data()
      if (docData.shopifyId) {
        existingByShopifyId.set(docData.shopifyId, docSnap.id)
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
    let updated = 0
    let skipped = 0
    let totalFetched = 0
    let pageInfo: string | null = null

    // Paginate through all orders
    do {
      let shopifyUrl = `https://${shopify.storeName}.myshopify.com/admin/api/2024-01/orders.json?${queryParams.toString()}`

      if (pageInfo) {
        shopifyUrl = `https://${shopify.storeName}.myshopify.com/admin/api/2024-01/orders.json?page_info=${pageInfo}&limit=250`
      }

      const response = await fetch(shopifyUrl, {
        headers: {
          'X-Shopify-Access-Token': shopify.accessToken,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Shopify fetch orders error:', errorText)
        return NextResponse.json({
          success: false,
          error: `Failed to fetch orders: ${response.status}`,
          imported,
          updated,
          skipped
        }, { status: 400 })
      }

      // Check for pagination link header
      const linkHeader = response.headers.get('link')
      pageInfo = null
      if (linkHeader) {
        const nextMatch = linkHeader.match(/<[^>]*page_info=([^>&]+)[^>]*>;\s*rel="next"/)
        if (nextMatch) {
          pageInfo = nextMatch[1]
        }
      }

      const data = await response.json()
      const shopifyOrders: ShopifyOrder[] = data.orders || []
      totalFetched += shopifyOrders.length

      for (const shopifyOrder of shopifyOrders) {
        const shopifyId = shopifyOrder.id.toString()
        const existingDocId = existingByShopifyId.get(shopifyId)

        // Map line items with full details
        const lineItems = (shopifyOrder.line_items || []).map((item) => {
          const sku = item.sku?.toLowerCase()
          return {
            id: `li_${item.id}`,
            shopifyLineItemId: item.id.toString(),
            productId: sku ? productsBySku.get(sku) || null : null,
            shopifyProductId: item.product_id?.toString() || null,
            shopifyVariantId: item.variant_id?.toString() || null,
            sku: item.sku || '',
            name: item.name,
            title: item.title,
            variantTitle: item.variant_title || null,
            quantity: item.quantity,
            price: parseFloat(item.price) || 0,
            totalDiscount: parseFloat(item.total_discount) || 0,
            requiresShipping: item.requires_shipping,
            fulfillableQuantity: item.fulfillable_quantity,
            fulfillmentStatus: item.fulfillment_status || 'unfulfilled',
            grams: item.grams,
            vendor: item.vendor,
            properties: item.properties || [],
            giftCard: item.gift_card,
            taxable: item.taxable,
            taxLines: (item.tax_lines || []).map(t => ({
              title: t.title,
              price: parseFloat(t.price) || 0,
              rate: t.rate
            }))
          }
        })

        // Map shipping address
        const shippingAddress = shopifyOrder.shipping_address ? {
          firstName: shopifyOrder.shipping_address.first_name || '',
          lastName: shopifyOrder.shipping_address.last_name || '',
          name: shopifyOrder.shipping_address.name || '',
          company: shopifyOrder.shipping_address.company || null,
          address1: shopifyOrder.shipping_address.address1 || '',
          address2: shopifyOrder.shipping_address.address2 || null,
          city: shopifyOrder.shipping_address.city || '',
          province: shopifyOrder.shipping_address.province || '',
          provinceCode: shopifyOrder.shipping_address.province_code || '',
          country: shopifyOrder.shipping_address.country || '',
          countryCode: shopifyOrder.shipping_address.country_code || '',
          zip: shopifyOrder.shipping_address.zip || '',
          phone: shopifyOrder.shipping_address.phone || null,
          latitude: shopifyOrder.shipping_address.latitude,
          longitude: shopifyOrder.shipping_address.longitude
        } : null

        // Map billing address
        const billingAddress = shopifyOrder.billing_address ? {
          firstName: shopifyOrder.billing_address.first_name || '',
          lastName: shopifyOrder.billing_address.last_name || '',
          name: shopifyOrder.billing_address.name || '',
          company: shopifyOrder.billing_address.company || null,
          address1: shopifyOrder.billing_address.address1 || '',
          address2: shopifyOrder.billing_address.address2 || null,
          city: shopifyOrder.billing_address.city || '',
          province: shopifyOrder.billing_address.province || '',
          provinceCode: shopifyOrder.billing_address.province_code || '',
          country: shopifyOrder.billing_address.country || '',
          countryCode: shopifyOrder.billing_address.country_code || '',
          zip: shopifyOrder.billing_address.zip || '',
          phone: shopifyOrder.billing_address.phone || null,
          latitude: shopifyOrder.billing_address.latitude,
          longitude: shopifyOrder.billing_address.longitude
        } : null

        // Map customer
        const customer = shopifyOrder.customer ? {
          id: shopifyOrder.customer.id?.toString() || '',
          email: shopifyOrder.email || shopifyOrder.customer.email || '',
          firstName: shopifyOrder.customer.first_name || '',
          lastName: shopifyOrder.customer.last_name || '',
          phone: shopifyOrder.customer.phone || shopifyOrder.phone || null,
          ordersCount: shopifyOrder.customer.orders_count || 0,
          totalSpent: parseFloat(shopifyOrder.customer.total_spent) || 0,
          tags: shopifyOrder.customer.tags || ''
        } : {
          id: '',
          email: shopifyOrder.email || '',
          firstName: '',
          lastName: '',
          phone: shopifyOrder.phone || null,
          ordersCount: 0,
          totalSpent: 0,
          tags: ''
        }

        // Map fulfillments
        const fulfillments = (shopifyOrder.fulfillments || []).map((f) => ({
          id: f.id.toString(),
          status: f.status,
          createdAt: new Date(f.created_at),
          updatedAt: new Date(f.updated_at),
          trackingCompany: f.tracking_company,
          trackingNumber: f.tracking_number,
          trackingNumbers: f.tracking_numbers || [],
          trackingUrl: f.tracking_url,
          trackingUrls: f.tracking_urls || [],
          shipmentStatus: f.shipment_status,
          lineItemIds: (f.line_items || []).map(li => li.id.toString())
        }))

        // Map refunds
        const refunds = (shopifyOrder.refunds || []).map((r) => ({
          id: r.id.toString(),
          createdAt: new Date(r.created_at),
          processedAt: new Date(r.processed_at),
          note: r.note,
          lineItems: (r.refund_line_items || []).map(rli => ({
            id: rli.id.toString(),
            lineItemId: rli.line_item_id.toString(),
            quantity: rli.quantity,
            restockType: rli.restock_type,
            subtotal: parseFloat(rli.subtotal) || 0,
            totalTax: parseFloat(rli.total_tax) || 0
          })),
          transactions: (r.transactions || []).map(t => ({
            id: t.id.toString(),
            amount: parseFloat(t.amount) || 0,
            kind: t.kind,
            gateway: t.gateway,
            status: t.status
          }))
        }))

        // Map discount codes
        const discountCodes = (shopifyOrder.discount_codes || []).map(d => ({
          code: d.code,
          amount: parseFloat(d.amount) || 0,
          type: d.type
        }))

        // Map discount applications
        const discountApplications = (shopifyOrder.discount_applications || []).map(d => ({
          type: d.type,
          title: d.title,
          description: d.description,
          value: parseFloat(d.value) || 0,
          valueType: d.value_type,
          allocationMethod: d.allocation_method,
          targetSelection: d.target_selection,
          targetType: d.target_type
        }))

        // Map shipping lines
        const shippingLines = (shopifyOrder.shipping_lines || []).map(s => ({
          id: s.id.toString(),
          title: s.title,
          price: parseFloat(s.price) || 0,
          code: s.code,
          source: s.source,
          carrierIdentifier: s.carrier_identifier,
          requestedFulfillmentServiceId: s.requested_fulfillment_service_id
        }))

        // Map tax lines
        const taxLines = (shopifyOrder.tax_lines || []).map(t => ({
          title: t.title,
          price: parseFloat(t.price) || 0,
          rate: t.rate
        }))

        // Determine internal status based on Shopify statuses
        let internalStatus = 'pending'
        if (shopifyOrder.cancelled_at) {
          internalStatus = 'cancelled'
        } else if (shopifyOrder.closed_at) {
          internalStatus = 'completed'
        } else if (shopifyOrder.fulfillment_status === 'fulfilled') {
          internalStatus = 'shipped'
        } else if (shopifyOrder.fulfillment_status === 'partial') {
          internalStatus = 'partially_shipped'
        } else if (shopifyOrder.financial_status === 'paid') {
          internalStatus = 'processing'
        }

        const orderData = {
          shopifyId,
          shopifyOrderNumber: `#${shopifyOrder.order_number}`,
          shopifyOrderName: shopifyOrder.name,

          status: internalStatus,
          fulfillmentStatus: shopifyOrder.fulfillment_status || 'unfulfilled',
          paymentStatus: shopifyOrder.financial_status || 'pending',

          customer,
          shippingAddress,
          billingAddress,

          lineItems,
          shippingLines,

          subtotal: parseFloat(shopifyOrder.subtotal_price) || 0,
          shippingTotal: parseFloat(shopifyOrder.total_shipping_price_set?.shop_money?.amount) || 0,
          taxTotal: parseFloat(shopifyOrder.total_tax) || 0,
          discountTotal: parseFloat(shopifyOrder.total_discounts) || 0,
          total: parseFloat(shopifyOrder.total_price) || 0,
          currency: shopifyOrder.currency || 'USD',
          totalWeight: shopifyOrder.total_weight || 0,

          taxLines,
          discountCodes,
          discountApplications,

          fulfillments,
          refunds,

          shippingMethod: shippingLines[0]?.title || null,
          paymentGateway: shopifyOrder.gateway || null,
          paymentGatewayNames: shopifyOrder.payment_gateway_names || [],
          processingMethod: shopifyOrder.processing_method || null,

          note: shopifyOrder.note || null,
          noteAttributes: shopifyOrder.note_attributes || [],
          tags: shopifyOrder.tags ? shopifyOrder.tags.split(',').map((t: string) => t.trim()) : [],

          browserIp: shopifyOrder.browser_ip,
          landingSite: shopifyOrder.landing_site,
          referringSite: shopifyOrder.referring_site,
          sourceName: shopifyOrder.source_name,

          shopifyLocationId: shopifyOrder.location_id?.toString() || null,
          isTestOrder: shopifyOrder.test || false,
          confirmed: shopifyOrder.confirmed || false,

          shopifyCreatedAt: new Date(shopifyOrder.created_at),
          shopifyUpdatedAt: new Date(shopifyOrder.updated_at),
          shopifyProcessedAt: shopifyOrder.processed_at ? new Date(shopifyOrder.processed_at) : null,
          shopifyClosedAt: shopifyOrder.closed_at ? new Date(shopifyOrder.closed_at) : null,
          shopifyCancelledAt: shopifyOrder.cancelled_at ? new Date(shopifyOrder.cancelled_at) : null,
          cancelReason: shopifyOrder.cancel_reason || null,

          updatedAt: new Date(),
          source: 'shopify',
        }

        if (existingDocId) {
          // Update existing order
          await ordersRef.doc(existingDocId).update(orderData)
          updated++
        } else {
          // Create new order
          await ordersRef.add({
            ...orderData,
            createdAt: new Date(),
          })
          imported++
        }
      }

      // Continue pagination if there are more orders
    } while (pageInfo)

    // Update last sync time
    await adminDb.collection('organizations').doc(organizationId).update({
      'shopify.lastSyncOrders': new Date(),
    })

    return NextResponse.json({
      success: true,
      imported,
      updated,
      skipped,
      total: totalFetched,
    })
  } catch (error: any) {
    console.error('Sync orders error:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Sync failed'
    }, { status: 500 })
  }
}
