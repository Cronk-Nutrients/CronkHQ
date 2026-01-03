import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'

const SHOPIFY_API_VERSION = '2024-10'

interface ShopifyCustomer {
  id: number
  email: string | null
  phone: string | null
  first_name: string | null
  last_name: string | null
  orders_count: number
  total_spent: string
  tags: string
  note: string | null
  state: string
  verified_email: boolean
  tax_exempt: boolean
  tax_exemptions: string[]
  currency: string
  accepts_marketing: boolean
  email_marketing_consent?: { state: string }
  sms_marketing_consent?: { state: string }
  accepts_marketing_sms?: boolean
  default_address?: any
  addresses?: any[]
  created_at: string
  updated_at: string
}

// Map Shopify customer to our format
function mapShopifyCustomer(shopifyCustomer: ShopifyCustomer) {
  const shopifyId = shopifyCustomer.id.toString()
  const defaultAddress = shopifyCustomer.default_address || shopifyCustomer.addresses?.[0] || {}

  const totalOrders = shopifyCustomer.orders_count || 0
  const lifetimeValue = parseFloat(shopifyCustomer.total_spent) || 0
  const avgOrderValue = totalOrders > 0 ? lifetimeValue / totalOrders : 0

  // VIP calculation
  const vipThresholds = { bronze: 500, silver: 1000, gold: 2500, platinum: 5000 }
  let vipTier: string | null = null
  if (lifetimeValue >= vipThresholds.platinum) vipTier = 'platinum'
  else if (lifetimeValue >= vipThresholds.gold) vipTier = 'gold'
  else if (lifetimeValue >= vipThresholds.silver) vipTier = 'silver'
  else if (lifetimeValue >= vipThresholds.bronze) vipTier = 'bronze'

  const isVip = lifetimeValue >= vipThresholds.bronze || totalOrders >= 5

  // Map addresses
  const addresses = (shopifyCustomer.addresses || []).map((addr: any) => ({
    id: addr.id?.toString() || '',
    firstName: addr.first_name || '',
    lastName: addr.last_name || '',
    company: addr.company || null,
    address1: addr.address1 || '',
    address2: addr.address2 || null,
    city: addr.city || '',
    province: addr.province || '',
    provinceCode: addr.province_code || '',
    country: addr.country || '',
    countryCode: addr.country_code || '',
    zip: addr.zip || '',
    phone: addr.phone || null,
    isDefault: addr.default === true,
  }))

  // Tags with automatic order-based tags
  const shopifyTags = shopifyCustomer.tags
    ? shopifyCustomer.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
    : []

  const autoTags: string[] = []
  if (totalOrders > 1) {
    autoTags.push('Existing Customer')
  } else if (totalOrders === 1) {
    autoTags.push('New Customer')
  } else {
    autoTags.push('Potential Customer')
  }

  return {
    shopifyCustomerId: shopifyId,
    email: shopifyCustomer.email || null,
    phone: shopifyCustomer.phone || null,
    firstName: shopifyCustomer.first_name || '',
    lastName: shopifyCustomer.last_name || '',
    fullName: `${shopifyCustomer.first_name || ''} ${shopifyCustomer.last_name || ''}`.trim() || 'Unknown',

    defaultAddress: defaultAddress ? {
      firstName: defaultAddress.first_name || '',
      lastName: defaultAddress.last_name || '',
      company: defaultAddress.company || null,
      address1: defaultAddress.address1 || '',
      address2: defaultAddress.address2 || null,
      city: defaultAddress.city || '',
      province: defaultAddress.province || '',
      provinceCode: defaultAddress.province_code || '',
      country: defaultAddress.country || '',
      countryCode: defaultAddress.country_code || '',
      zip: defaultAddress.zip || '',
      phone: defaultAddress.phone || null,
    } : null,

    addresses,

    metrics: {
      totalOrders,
      lifetimeValue,
      avgOrderValue,
      lastOrderDate: null,
    },

    isVip,
    vipTier,

    emailConsent: shopifyCustomer.email_marketing_consent?.state === 'subscribed' ||
                  shopifyCustomer.accepts_marketing === true,
    smsConsent: shopifyCustomer.sms_marketing_consent?.state === 'subscribed' ||
                shopifyCustomer.accepts_marketing_sms === true,

    tags: [...new Set([...shopifyTags, ...autoTags])],

    note: shopifyCustomer.note || null,
    state: shopifyCustomer.state || 'enabled',
    isVerified: shopifyCustomer.verified_email === true,
    taxExempt: shopifyCustomer.tax_exempt === true,
    taxExemptions: shopifyCustomer.tax_exemptions || [],
    currency: shopifyCustomer.currency || 'USD',
    sources: ['shopify'],

    shopifyCreatedAt: shopifyCustomer.created_at ? new Date(shopifyCustomer.created_at) : null,
    shopifyUpdatedAt: shopifyCustomer.updated_at ? new Date(shopifyCustomer.updated_at) : null,

    source: {
      platform: 'shopify',
      externalId: shopifyId,
      importedAt: new Date(),
    },
  }
}

export async function POST(request: NextRequest) {
  try {
    const { organizationId } = await request.json()

    if (!organizationId) {
      return NextResponse.json({ success: false, error: 'Missing organization ID' })
    }

    const db = adminDb()

    // Get organization with Shopify credentials
    const orgDoc = await db.collection('organizations').doc(organizationId).get()
    if (!orgDoc.exists) {
      return NextResponse.json({ success: false, error: 'Organization not found' })
    }

    const orgData = orgDoc.data()
    const shopify = orgData?.shopify
    if (!shopify?.isConnected || !shopify?.accessToken) {
      return NextResponse.json({ success: false, error: 'Shopify not connected' })
    }

    const { storeName, accessToken } = shopify

    // Update sync status to running
    await db.collection('organizations').doc(organizationId).update({
      'shopify.customerSyncStatus': 'running',
      'shopify.customerSyncStartedAt': FieldValue.serverTimestamp(),
      'shopify.customerSyncProgress': { current: 0, total: 0, status: 'Starting...' },
    })

    // Fetch all customers from Shopify with pagination
    let allCustomers: ShopifyCustomer[] = []
    let pageInfo: string | null = null
    let pageCount = 0

    do {
      pageCount++

      // Update progress
      await db.collection('organizations').doc(organizationId).update({
        'shopify.customerSyncProgress': {
          current: allCustomers.length,
          total: 0,
          status: `Fetching page ${pageCount}...`
        },
      })

      let url = `https://${storeName}.myshopify.com/admin/api/${SHOPIFY_API_VERSION}/customers.json?limit=250`
      if (pageInfo) {
        url = `https://${storeName}.myshopify.com/admin/api/${SHOPIFY_API_VERSION}/customers.json?limit=250&page_info=${pageInfo}`
      }

      const response = await fetch(url, {
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Shopify API error: ${response.status}`)
      }

      const data = await response.json()
      allCustomers = [...allCustomers, ...(data.customers || [])]

      // Get pagination info from Link header
      const linkHeader = response.headers.get('Link')
      pageInfo = null
      if (linkHeader) {
        const nextMatch = linkHeader.match(/<[^>]*page_info=([^>&]*)[^>]*>;\s*rel="next"/)
        if (nextMatch) {
          pageInfo = nextMatch[1]
        }
      }
    } while (pageInfo)

    // Process customers
    const customersRef = db.collection('organizations').doc(organizationId).collection('customers')

    // Get existing customers for deduplication
    const existingSnapshot = await customersRef.get()
    const existingByShopifyId = new Map<string, string>()
    const existingByEmail = new Map<string, string>()

    existingSnapshot.docs.forEach(d => {
      const data = d.data()
      if (data.shopifyCustomerId) existingByShopifyId.set(data.shopifyCustomerId, d.id)
      if (data.email) existingByEmail.set(data.email.toLowerCase(), d.id)
    })

    let customersAdded = 0
    let customersUpdated = 0

    // Process in batches
    const batchSize = 500
    let batch = db.batch()
    let batchCount = 0

    for (let i = 0; i < allCustomers.length; i++) {
      const shopifyCustomer = allCustomers[i]

      // Update progress every 50 customers
      if (i % 50 === 0) {
        await db.collection('organizations').doc(organizationId).update({
          'shopify.customerSyncProgress': {
            current: i,
            total: allCustomers.length,
            status: `Processing ${i + 1} of ${allCustomers.length}...`
          },
        })
      }

      const customerData = mapShopifyCustomer(shopifyCustomer)
      const shopifyId = shopifyCustomer.id.toString()
      const email = shopifyCustomer.email?.toLowerCase()

      // Check for existing customer
      let existingId = existingByShopifyId.get(shopifyId)
      if (!existingId && email) {
        existingId = existingByEmail.get(email)
      }

      if (existingId) {
        batch.set(
          customersRef.doc(existingId),
          { ...customerData, updatedAt: FieldValue.serverTimestamp() },
          { merge: true }
        )
        customersUpdated++
      } else {
        const newDoc = customersRef.doc()
        batch.set(newDoc, {
          ...customerData,
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp()
        })
        customersAdded++
        // Track for deduplication within same batch
        existingByShopifyId.set(shopifyId, newDoc.id)
        if (email) existingByEmail.set(email, newDoc.id)
      }

      batchCount++

      // Commit batch when it reaches limit
      if (batchCount >= batchSize) {
        await batch.commit()
        batch = db.batch()
        batchCount = 0
      }
    }

    // Commit remaining
    if (batchCount > 0) {
      await batch.commit()
    }

    // Update sync status to complete
    await db.collection('organizations').doc(organizationId).update({
      'shopify.customerSyncStatus': 'complete',
      'shopify.customerSyncCompletedAt': FieldValue.serverTimestamp(),
      'shopify.customerSyncProgress': {
        current: allCustomers.length,
        total: allCustomers.length,
        status: 'Complete'
      },
      'shopify.lastCustomerSyncStats': {
        customersAdded,
        customersUpdated,
        totalProcessed: allCustomers.length,
      },
    })

    return NextResponse.json({
      success: true,
      customersAdded,
      customersUpdated,
      totalProcessed: allCustomers.length,
    })
  } catch (error: any) {
    console.error('Customer sync error:', error)

    // Try to update error status
    try {
      const { organizationId } = await request.clone().json()
      if (organizationId) {
        const db = adminDb()
        await db.collection('organizations').doc(organizationId).update({
          'shopify.customerSyncStatus': 'error',
          'shopify.customerSyncError': error.message,
        })
      }
    } catch (e) {
      // Ignore secondary error
    }

    return NextResponse.json({
      success: false,
      error: error.message || 'Sync failed',
    })
  }
}

// GET endpoint to check sync status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const organizationId = searchParams.get('organizationId')

    if (!organizationId) {
      return NextResponse.json({ success: false, error: 'Missing organization ID' })
    }

    const db = adminDb()
    const orgDoc = await db.collection('organizations').doc(organizationId).get()

    if (!orgDoc.exists) {
      return NextResponse.json({ success: false, error: 'Organization not found' })
    }

    const orgData = orgDoc.data()
    const shopify = orgData?.shopify || {}

    return NextResponse.json({
      success: true,
      status: shopify.customerSyncStatus || 'idle',
      progress: shopify.customerSyncProgress || null,
      error: shopify.customerSyncError || null,
      lastStats: shopify.lastCustomerSyncStats || null,
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to get status',
    })
  }
}
