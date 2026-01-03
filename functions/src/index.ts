import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as crypto from 'crypto'

// Initialize Firebase Admin
admin.initializeApp()
const db = admin.firestore()

// Webhook topic to handler mapping
const WEBHOOK_HANDLERS: Record<string, (payload: any, organizationId: string) => Promise<void>> = {
  'orders/create': handleOrderCreate,
  'orders/updated': handleOrderUpdate,
  'orders/cancelled': handleOrderCancelled,
  'orders/fulfilled': handleOrderFulfilled,
  'orders/paid': handleOrderPaid,
  'orders/partially_fulfilled': handleOrderPartiallyFulfilled,
  'products/create': handleProductCreate,
  'products/update': handleProductUpdate,
  'products/delete': handleProductDelete,
  'inventory_levels/update': handleInventoryUpdate,
  'inventory_levels/connect': handleInventoryConnect,
  'inventory_levels/disconnect': handleInventoryDisconnect,
  'fulfillments/create': handleFulfillmentCreate,
  'fulfillments/update': handleFulfillmentUpdate,
  'refunds/create': handleRefundCreate,
  'customers/create': handleCustomerCreate,
  'customers/update': handleCustomerUpdate,
  'app/uninstalled': handleAppUninstalled,
}

// Verify Shopify webhook signature
function verifyWebhookSignature(rawBody: string, hmac: string, secret: string): boolean {
  const hash = crypto.createHmac('sha256', secret).update(rawBody, 'utf8').digest('base64')
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(hmac))
}

// Find organization by Shopify store domain
async function findOrganizationByStore(shopDomain: string): Promise<string | null> {
  // Remove .myshopify.com suffix if present
  const storeName = shopDomain.replace('.myshopify.com', '')

  const snapshot = await db.collection('organizations')
    .where('integrations.shopify.storeName', '==', storeName)
    .limit(1)
    .get()

  if (snapshot.empty) {
    // Try with full domain
    const fullDomainSnapshot = await db.collection('organizations')
      .where('integrations.shopify.storeName', '==', shopDomain)
      .limit(1)
      .get()

    if (fullDomainSnapshot.empty) {
      return null
    }
    return fullDomainSnapshot.docs[0].id
  }

  return snapshot.docs[0].id
}

// Main webhook handler HTTP function
export const shopifyWebhookHandler = functions.https.onRequest(async (req, res) => {
  // Only accept POST requests
  if (req.method !== 'POST') {
    res.status(405).send('Method not allowed')
    return
  }

  try {
    const topic = req.headers['x-shopify-topic'] as string
    const shopDomain = req.headers['x-shopify-shop-domain'] as string
    const hmac = req.headers['x-shopify-hmac-sha256'] as string
    const webhookId = req.headers['x-shopify-webhook-id'] as string

    if (!topic || !shopDomain) {
      res.status(400).send('Missing required headers')
      return
    }

    // Find organization
    const organizationId = await findOrganizationByStore(shopDomain)
    if (!organizationId) {
      console.error(`Organization not found for store: ${shopDomain}`)
      res.status(404).send('Organization not found')
      return
    }

    // Get Shopify secret for verification
    const orgDoc = await db.collection('organizations').doc(organizationId).get()
    const orgData = orgDoc.data()
    const shopifySecret = orgData?.integrations?.shopify?.webhookSecret

    // Verify signature if secret is configured
    if (shopifySecret && hmac) {
      const rawBody = JSON.stringify(req.body)
      if (!verifyWebhookSignature(rawBody, hmac, shopifySecret)) {
        console.error('Webhook signature verification failed')
        res.status(401).send('Invalid signature')
        return
      }
    }

    // Log webhook receipt
    await db.collection('organizations').doc(organizationId)
      .collection('webhookLogs')
      .add({
        topic,
        shopDomain,
        webhookId,
        payload: req.body,
        receivedAt: admin.firestore.FieldValue.serverTimestamp(),
        processed: false,
      })

    // Find and execute handler
    const handler = WEBHOOK_HANDLERS[topic]
    if (handler) {
      await handler(req.body, organizationId)
      console.log(`Webhook ${topic} processed successfully for ${organizationId}`)
    } else {
      console.warn(`No handler found for webhook topic: ${topic}`)
    }

    // Update webhook log as processed
    const logQuery = await db.collection('organizations').doc(organizationId)
      .collection('webhookLogs')
      .where('webhookId', '==', webhookId)
      .limit(1)
      .get()

    if (!logQuery.empty) {
      await logQuery.docs[0].ref.update({
        processed: true,
        processedAt: admin.firestore.FieldValue.serverTimestamp(),
      })
    }

    res.status(200).send('OK')
  } catch (error) {
    console.error('Webhook processing error:', error)
    res.status(500).send('Internal server error')
  }
})

// ============================================
// ORDER HANDLERS
// ============================================

async function handleOrderCreate(payload: any, organizationId: string): Promise<void> {
  const order = mapShopifyOrder(payload)

  // Save order to Firestore
  await db.collection('organizations').doc(organizationId)
    .collection('orders')
    .doc(String(payload.id))
    .set({
      ...order,
      source: 'shopify',
      shopifyOrderId: payload.id,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })

  // Create notification
  await createNotification(organizationId, {
    type: 'order_created',
    title: 'New Order',
    message: `Order ${payload.name} received from Shopify`,
    orderId: String(payload.id),
    orderNumber: payload.name,
    amount: payload.total_price,
    currency: payload.currency,
  })

  // Optionally reserve inventory for line items
  for (const lineItem of payload.line_items || []) {
    if (lineItem.sku) {
      await updateProductInventoryReservation(organizationId, lineItem.sku, lineItem.quantity)
    }
  }
}

async function handleOrderUpdate(payload: any, organizationId: string): Promise<void> {
  const order = mapShopifyOrder(payload)

  await db.collection('organizations').doc(organizationId)
    .collection('orders')
    .doc(String(payload.id))
    .update({
      ...order,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
}

async function handleOrderCancelled(payload: any, organizationId: string): Promise<void> {
  await db.collection('organizations').doc(organizationId)
    .collection('orders')
    .doc(String(payload.id))
    .update({
      status: 'cancelled',
      cancelledAt: payload.cancelled_at,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })

  // Release reserved inventory
  for (const lineItem of payload.line_items || []) {
    if (lineItem.sku) {
      await updateProductInventoryReservation(organizationId, lineItem.sku, -lineItem.quantity)
    }
  }

  await createNotification(organizationId, {
    type: 'order_cancelled',
    title: 'Order Cancelled',
    message: `Order ${payload.name} was cancelled`,
    orderId: String(payload.id),
    orderNumber: payload.name,
  })
}

async function handleOrderFulfilled(payload: any, organizationId: string): Promise<void> {
  await db.collection('organizations').doc(organizationId)
    .collection('orders')
    .doc(String(payload.id))
    .update({
      fulfillmentStatus: 'fulfilled',
      fulfilledAt: new Date().toISOString(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })

  await createNotification(organizationId, {
    type: 'order_fulfilled',
    title: 'Order Fulfilled',
    message: `Order ${payload.name} has been fully fulfilled`,
    orderId: String(payload.id),
    orderNumber: payload.name,
  })
}

async function handleOrderPaid(payload: any, organizationId: string): Promise<void> {
  await db.collection('organizations').doc(organizationId)
    .collection('orders')
    .doc(String(payload.id))
    .update({
      financialStatus: 'paid',
      paidAt: new Date().toISOString(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
}

async function handleOrderPartiallyFulfilled(payload: any, organizationId: string): Promise<void> {
  await db.collection('organizations').doc(organizationId)
    .collection('orders')
    .doc(String(payload.id))
    .update({
      fulfillmentStatus: 'partial',
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
}

// ============================================
// PRODUCT HANDLERS
// ============================================

async function handleProductCreate(payload: any, organizationId: string): Promise<void> {
  const product = mapShopifyProduct(payload)

  await db.collection('organizations').doc(organizationId)
    .collection('products')
    .doc(String(payload.id))
    .set({
      ...product,
      source: 'shopify',
      shopifyProductId: String(payload.id),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })

  await createNotification(organizationId, {
    type: 'product_created',
    title: 'New Product',
    message: `Product "${payload.title}" synced from Shopify`,
    productId: String(payload.id),
    productName: payload.title,
  })
}

async function handleProductUpdate(payload: any, organizationId: string): Promise<void> {
  const productRef = db.collection('organizations').doc(organizationId)
    .collection('products')
    .doc(String(payload.id))

  const productDoc = await productRef.get()

  if (productDoc.exists) {
    const product = mapShopifyProduct(payload)
    await productRef.update({
      ...product,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
  } else {
    // Product doesn't exist, create it
    await handleProductCreate(payload, organizationId)
  }
}

async function handleProductDelete(payload: any, organizationId: string): Promise<void> {
  // Mark as deleted but don't remove (soft delete)
  await db.collection('organizations').doc(organizationId)
    .collection('products')
    .doc(String(payload.id))
    .update({
      status: 'archived',
      deletedFromShopify: true,
      deletedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })

  await createNotification(organizationId, {
    type: 'product_deleted',
    title: 'Product Deleted',
    message: `Product ID ${payload.id} was deleted from Shopify`,
    productId: String(payload.id),
  })
}

// ============================================
// INVENTORY HANDLERS
// ============================================

async function handleInventoryUpdate(payload: any, organizationId: string): Promise<void> {
  const { inventory_item_id, location_id, available } = payload

  // Find product with this inventory_item_id
  const productsSnapshot = await db.collection('organizations').doc(organizationId)
    .collection('products')
    .where('shopifyInventoryItemId', '==', String(inventory_item_id))
    .limit(1)
    .get()

  if (!productsSnapshot.empty) {
    const productDoc = productsSnapshot.docs[0]

    // Update inventory for this location
    await productDoc.ref.update({
      [`inventory.shopify_${location_id}`]: available,
      totalStock: available, // Simplified - you may want to aggregate across locations
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
  } else {
    // Check variants
    const allProductsSnapshot = await db.collection('organizations').doc(organizationId)
      .collection('products')
      .get()

    for (const productDoc of allProductsSnapshot.docs) {
      const productData = productDoc.data()
      const variants = productData.variants || []

      let variantUpdated = false
      const updatedVariants = variants.map((variant: any) => {
        if (variant.inventoryItemId === String(inventory_item_id)) {
          variantUpdated = true
          return {
            ...variant,
            stock: available,
          }
        }
        return variant
      })

      if (variantUpdated) {
        const totalStock = updatedVariants.reduce((sum: number, v: any) => sum + (v.stock || 0), 0)
        await productDoc.ref.update({
          variants: updatedVariants,
          totalStock,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        })
        break
      }
    }
  }
}

async function handleInventoryConnect(payload: any, organizationId: string): Promise<void> {
  // Log inventory connection
  console.log(`Inventory item ${payload.inventory_item_id} connected to location ${payload.location_id}`)
}

async function handleInventoryDisconnect(payload: any, organizationId: string): Promise<void> {
  // Log inventory disconnection
  console.log(`Inventory item ${payload.inventory_item_id} disconnected from location ${payload.location_id}`)
}

// ============================================
// FULFILLMENT HANDLERS
// ============================================

async function handleFulfillmentCreate(payload: any, organizationId: string): Promise<void> {
  const orderId = String(payload.order_id)

  // Update order with fulfillment info
  await db.collection('organizations').doc(organizationId)
    .collection('orders')
    .doc(orderId)
    .update({
      [`fulfillments.${payload.id}`]: {
        id: payload.id,
        status: payload.status,
        trackingCompany: payload.tracking_company,
        trackingNumber: payload.tracking_number,
        trackingUrl: payload.tracking_url,
        createdAt: payload.created_at,
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })

  // Decrement actual inventory for fulfilled items
  for (const lineItem of payload.line_items || []) {
    if (lineItem.sku) {
      await decrementProductInventory(organizationId, lineItem.sku, lineItem.quantity)
    }
  }
}

async function handleFulfillmentUpdate(payload: any, organizationId: string): Promise<void> {
  const orderId = String(payload.order_id)

  await db.collection('organizations').doc(organizationId)
    .collection('orders')
    .doc(orderId)
    .update({
      [`fulfillments.${payload.id}`]: {
        id: payload.id,
        status: payload.status,
        trackingCompany: payload.tracking_company,
        trackingNumber: payload.tracking_number,
        trackingUrl: payload.tracking_url,
        updatedAt: payload.updated_at,
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
}

// ============================================
// REFUND HANDLERS
// ============================================

async function handleRefundCreate(payload: any, organizationId: string): Promise<void> {
  const orderId = String(payload.order_id)

  await db.collection('organizations').doc(organizationId)
    .collection('orders')
    .doc(orderId)
    .update({
      [`refunds.${payload.id}`]: {
        id: payload.id,
        note: payload.note,
        createdAt: payload.created_at,
        lineItems: payload.refund_line_items,
        transactions: payload.transactions,
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })

  await createNotification(organizationId, {
    type: 'refund_created',
    title: 'Refund Processed',
    message: `Refund created for order ID ${orderId}`,
    orderId,
    refundId: String(payload.id),
  })

  // Restore inventory for refunded items
  for (const refundLineItem of payload.refund_line_items || []) {
    // You'd need to look up the SKU from the original line item
    // This is simplified
  }
}

// ============================================
// CUSTOMER HANDLERS
// ============================================

async function handleCustomerCreate(payload: any, organizationId: string): Promise<void> {
  await db.collection('organizations').doc(organizationId)
    .collection('customers')
    .doc(String(payload.id))
    .set({
      shopifyCustomerId: String(payload.id),
      email: payload.email,
      firstName: payload.first_name,
      lastName: payload.last_name,
      phone: payload.phone,
      totalSpent: payload.total_spent,
      ordersCount: payload.orders_count,
      tags: payload.tags,
      source: 'shopify',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
}

async function handleCustomerUpdate(payload: any, organizationId: string): Promise<void> {
  await db.collection('organizations').doc(organizationId)
    .collection('customers')
    .doc(String(payload.id))
    .update({
      email: payload.email,
      firstName: payload.first_name,
      lastName: payload.last_name,
      phone: payload.phone,
      totalSpent: payload.total_spent,
      ordersCount: payload.orders_count,
      tags: payload.tags,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
}

// ============================================
// APP HANDLERS
// ============================================

async function handleAppUninstalled(payload: any, organizationId: string): Promise<void> {
  // Clear Shopify integration data
  await db.collection('organizations').doc(organizationId).update({
    'integrations.shopify.accessToken': admin.firestore.FieldValue.delete(),
    'integrations.shopify.webhooks': admin.firestore.FieldValue.delete(),
    'integrations.shopify.uninstalledAt': admin.firestore.FieldValue.serverTimestamp(),
    'integrations.shopify.isConnected': false,
  })

  await createNotification(organizationId, {
    type: 'app_uninstalled',
    title: 'Shopify Disconnected',
    message: 'Your Shopify store has been disconnected',
  })
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function mapShopifyOrder(payload: any): Record<string, any> {
  return {
    orderNumber: payload.name,
    email: payload.email,
    phone: payload.phone,
    financialStatus: payload.financial_status,
    fulfillmentStatus: payload.fulfillment_status,
    currency: payload.currency,
    subtotal: parseFloat(payload.subtotal_price || '0'),
    totalTax: parseFloat(payload.total_tax || '0'),
    totalShipping: parseFloat(payload.total_shipping_price_set?.shop_money?.amount || '0'),
    totalDiscount: parseFloat(payload.total_discounts || '0'),
    totalPrice: parseFloat(payload.total_price || '0'),
    customer: payload.customer ? {
      id: payload.customer.id,
      email: payload.customer.email,
      firstName: payload.customer.first_name,
      lastName: payload.customer.last_name,
      phone: payload.customer.phone,
    } : null,
    shippingAddress: payload.shipping_address ? {
      firstName: payload.shipping_address.first_name,
      lastName: payload.shipping_address.last_name,
      company: payload.shipping_address.company,
      address1: payload.shipping_address.address1,
      address2: payload.shipping_address.address2,
      city: payload.shipping_address.city,
      province: payload.shipping_address.province,
      provinceCode: payload.shipping_address.province_code,
      country: payload.shipping_address.country,
      countryCode: payload.shipping_address.country_code,
      zip: payload.shipping_address.zip,
      phone: payload.shipping_address.phone,
    } : null,
    billingAddress: payload.billing_address ? {
      firstName: payload.billing_address.first_name,
      lastName: payload.billing_address.last_name,
      company: payload.billing_address.company,
      address1: payload.billing_address.address1,
      address2: payload.billing_address.address2,
      city: payload.billing_address.city,
      province: payload.billing_address.province,
      provinceCode: payload.billing_address.province_code,
      country: payload.billing_address.country,
      countryCode: payload.billing_address.country_code,
      zip: payload.billing_address.zip,
      phone: payload.billing_address.phone,
    } : null,
    lineItems: (payload.line_items || []).map((item: any) => ({
      id: item.id,
      productId: item.product_id,
      variantId: item.variant_id,
      title: item.title,
      variantTitle: item.variant_title,
      sku: item.sku,
      quantity: item.quantity,
      price: parseFloat(item.price || '0'),
      totalDiscount: parseFloat(item.total_discount || '0'),
      fulfillmentStatus: item.fulfillment_status,
      fulfillableQuantity: item.fulfillable_quantity,
      requiresShipping: item.requires_shipping,
      grams: item.grams,
    })),
    shippingLines: (payload.shipping_lines || []).map((line: any) => ({
      id: line.id,
      title: line.title,
      price: parseFloat(line.price || '0'),
      code: line.code,
      carrier: line.carrier_identifier,
    })),
    discountCodes: payload.discount_codes || [],
    note: payload.note,
    tags: payload.tags,
    sourceApp: payload.source_name,
    shopifyCreatedAt: payload.created_at,
    shopifyUpdatedAt: payload.updated_at,
  }
}

function mapShopifyProduct(payload: any): Record<string, any> {
  return {
    name: payload.title,
    description: payload.body_html,
    vendor: payload.vendor,
    productType: payload.product_type,
    status: payload.status,
    tags: payload.tags ? payload.tags.split(',').map((t: string) => t.trim()) : [],
    handle: payload.handle,
    shopifyHandle: payload.handle,
    variants: (payload.variants || []).map((variant: any) => ({
      id: String(variant.id),
      title: variant.title,
      sku: variant.sku,
      barcode: variant.barcode,
      price: parseFloat(variant.price || '0'),
      compareAtPrice: variant.compare_at_price ? parseFloat(variant.compare_at_price) : null,
      inventoryItemId: String(variant.inventory_item_id),
      stock: variant.inventory_quantity,
      weight: variant.weight,
      weightUnit: variant.weight_unit,
      grams: variant.grams,
      requiresShipping: variant.requires_shipping,
      taxable: variant.taxable,
      option1: variant.option1,
      option2: variant.option2,
      option3: variant.option3,
    })),
    options: payload.options || [],
    images: (payload.images || []).map((img: any) => ({
      id: img.id,
      src: img.src,
      alt: img.alt,
      width: img.width,
      height: img.height,
      position: img.position,
    })),
    thumbnail: payload.image?.src || payload.images?.[0]?.src || null,
    sku: payload.variants?.[0]?.sku || null,
    barcode: payload.variants?.[0]?.barcode || null,
    retailPrice: payload.variants?.[0]?.price ? parseFloat(payload.variants[0].price) : null,
    totalStock: (payload.variants || []).reduce((sum: number, v: any) => sum + (v.inventory_quantity || 0), 0),
    shopifyCreatedAt: payload.created_at,
    shopifyUpdatedAt: payload.updated_at,
  }
}

async function createNotification(
  organizationId: string,
  notification: {
    type: string
    title: string
    message: string
    [key: string]: any
  }
): Promise<void> {
  await db.collection('organizations').doc(organizationId)
    .collection('notifications')
    .add({
      ...notification,
      read: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    })
}

async function updateProductInventoryReservation(
  organizationId: string,
  sku: string,
  quantity: number
): Promise<void> {
  const productsSnapshot = await db.collection('organizations').doc(organizationId)
    .collection('products')
    .where('sku', '==', sku)
    .limit(1)
    .get()

  if (!productsSnapshot.empty) {
    const productDoc = productsSnapshot.docs[0]
    const currentReserved = productDoc.data().reservedStock || 0

    await productDoc.ref.update({
      reservedStock: Math.max(0, currentReserved + quantity),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
  }
}

async function decrementProductInventory(
  organizationId: string,
  sku: string,
  quantity: number
): Promise<void> {
  const productsSnapshot = await db.collection('organizations').doc(organizationId)
    .collection('products')
    .where('sku', '==', sku)
    .limit(1)
    .get()

  if (!productsSnapshot.empty) {
    const productDoc = productsSnapshot.docs[0]
    const currentStock = productDoc.data().totalStock || 0
    const currentReserved = productDoc.data().reservedStock || 0

    await productDoc.ref.update({
      totalStock: Math.max(0, currentStock - quantity),
      reservedStock: Math.max(0, currentReserved - quantity),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
  }
}
