import { NextRequest, NextResponse } from 'next/server'
import { adminDb, FieldValue } from '@/lib/firebase-admin'

const SHOPIFY_API_VERSION = '2024-01'
const KLAVIYO_API_VERSION = '2024-02-15'

interface ShopifyCustomer {
  id: number
  email: string
  phone: string
  first_name: string
  last_name: string
  orders_count: number
  total_spent: string
  created_at: string
  updated_at: string
  tags: string
  note: string
  accepts_marketing: boolean
  tax_exempt: boolean
  verified_email: boolean
  state: string
  default_address?: {
    address1: string
    address2: string
    city: string
    province: string
    province_code: string
    country: string
    country_code: string
    zip: string
    company: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const { organizationId } = await request.json()

    if (!organizationId) {
      return NextResponse.json({ success: false, error: 'Missing organization ID' })
    }

    const db = adminDb()

    // Get org settings
    const orgDoc = await db.collection('organizations').doc(organizationId).get()
    if (!orgDoc.exists) {
      return NextResponse.json({ success: false, error: 'Organization not found' })
    }

    const orgData = orgDoc.data()!
    const shopifyConfig = orgData.shopify
    const klaviyoConfig = orgData.klaviyo

    // Maps to merge customers by email/phone
    const customerMap = new Map<string, any>()

    let shopifyCount = 0
    let klaviyoCount = 0

    // --- SYNC FROM SHOPIFY ---
    if (shopifyConfig?.isConnected && shopifyConfig?.shopDomain && shopifyConfig?.accessToken) {
      let hasMore = true
      let pageInfo: string | null = null

      while (hasMore) {
        const url = new URL(
          `https://${shopifyConfig.shopDomain}/admin/api/${SHOPIFY_API_VERSION}/customers.json`
        )
        url.searchParams.set('limit', '250')
        if (pageInfo) {
          url.searchParams.set('page_info', pageInfo)
        }

        const response = await fetch(url.toString(), {
          headers: {
            'X-Shopify-Access-Token': shopifyConfig.accessToken,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          console.error('Shopify customers error:', response.status)
          break
        }

        const data = await response.json()
        const customers: ShopifyCustomer[] = data.customers || []

        for (const customer of customers) {
          const key = customer.email?.toLowerCase() || customer.phone || `shopify-${customer.id}`

          const existing = customerMap.get(key) || {
            sources: [],
            tags: [],
          }

          const shopifyTags = customer.tags ? customer.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : []

          customerMap.set(key, {
            ...existing,
            email: customer.email?.toLowerCase() || existing.email,
            phone: customer.phone || existing.phone,
            firstName: customer.first_name || existing.firstName,
            lastName: customer.last_name || existing.lastName,
            fullName: `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || existing.fullName || 'Unknown',
            defaultAddress: customer.default_address ? {
              address1: customer.default_address.address1 || '',
              address2: customer.default_address.address2 || null,
              city: customer.default_address.city || '',
              province: customer.default_address.province || '',
              provinceCode: customer.default_address.province_code || '',
              country: customer.default_address.country || '',
              countryCode: customer.default_address.country_code || '',
              zip: customer.default_address.zip || '',
              company: customer.default_address.company || null,
            } : existing.defaultAddress,
            shopify: {
              customerId: customer.id.toString(),
              createdAt: new Date(customer.created_at),
              updatedAt: new Date(customer.updated_at),
              ordersCount: customer.orders_count || 0,
              totalSpent: parseFloat(customer.total_spent) || 0,
              currency: orgData.currency || 'USD',
              tags: shopifyTags,
              note: customer.note || null,
              taxExempt: customer.tax_exempt || false,
              acceptsMarketing: customer.accepts_marketing || false,
              verifiedEmail: customer.verified_email || false,
              state: customer.state || 'enabled',
            },
            sources: [...new Set([...existing.sources, 'shopify'])],
            tags: [...new Set([...existing.tags, ...shopifyTags])],
          })

          shopifyCount++
        }

        // Check for next page
        const linkHeader = response.headers.get('Link')
        if (linkHeader && linkHeader.includes('rel="next"')) {
          const match = linkHeader.match(/<[^>]*page_info=([^&>]+)[^>]*>; rel="next"/)
          pageInfo = match ? match[1] : null
          hasMore = !!pageInfo
        } else {
          hasMore = false
        }

        // Rate limiting - Shopify allows 2 requests per second
        await new Promise(resolve => setTimeout(resolve, 500))
      }

      console.log(`Synced ${shopifyCount} customers from Shopify`)
    }

    // --- SYNC FROM KLAVIYO ---
    if (klaviyoConfig?.isConnected && klaviyoConfig?.apiKey) {
      let nextCursor: string | null = null

      do {
        const url = new URL('https://a.klaviyo.com/api/profiles/')
        url.searchParams.set('page[size]', '100')
        if (nextCursor) {
          url.searchParams.set('page[cursor]', nextCursor)
        }

        const response = await fetch(url.toString(), {
          headers: {
            'Authorization': `Klaviyo-API-Key ${klaviyoConfig.apiKey}`,
            'revision': KLAVIYO_API_VERSION,
            'Accept': 'application/json',
          },
        })

        if (!response.ok) {
          console.error('Klaviyo profiles error:', response.status)
          break
        }

        const data = await response.json()
        const profiles = data.data || []

        for (const profile of profiles) {
          const attrs = profile.attributes || {}
          const email = attrs.email?.toLowerCase()
          const phone = attrs.phone_number
          const key = email || phone || `klaviyo-${profile.id}`

          const existing = customerMap.get(key) || {
            sources: [],
            tags: [],
          }

          // Check subscription status
          const emailConsent = attrs.subscriptions?.email?.marketing?.consent === 'SUBSCRIBED'
          const smsConsent = attrs.subscriptions?.sms?.marketing?.consent === 'SUBSCRIBED'

          customerMap.set(key, {
            ...existing,
            email: email || existing.email,
            phone: phone || existing.phone,
            firstName: attrs.first_name || existing.firstName,
            lastName: attrs.last_name || existing.lastName,
            fullName: `${attrs.first_name || ''} ${attrs.last_name || ''}`.trim() || existing.fullName || 'Unknown',
            klaviyo: {
              profileId: profile.id,
              createdAt: attrs.created ? new Date(attrs.created) : new Date(),
              updatedAt: attrs.updated ? new Date(attrs.updated) : new Date(),
              emailConsent,
              smsConsent,
              // These would need separate API calls to get full metrics
              emailsReceived: 0,
              emailsOpened: 0,
              emailsClicked: 0,
              openRate: 0,
              clickRate: 0,
              lists: [],
              segments: [],
              predictedLtv: attrs.predictive_analytics?.lifetime_value || null,
              churnRisk: attrs.predictive_analytics?.churn_probability !== undefined
                ? (attrs.predictive_analytics.churn_probability > 0.7 ? 'high' :
                   attrs.predictive_analytics.churn_probability > 0.3 ? 'medium' : 'low')
                : null,
              predictedNextOrder: attrs.predictive_analytics?.expected_date_of_next_order
                ? new Date(attrs.predictive_analytics.expected_date_of_next_order)
                : null,
              lastEmailOpen: null,
              lastEmailClick: null,
              lastSmsClick: null,
            },
            sources: [...new Set([...existing.sources, 'klaviyo'])],
          })

          klaviyoCount++
        }

        // Get next page cursor
        if (data.links?.next) {
          try {
            const nextUrl = new URL(data.links.next)
            nextCursor = nextUrl.searchParams.get('page[cursor]')
          } catch {
            nextCursor = null
          }
        } else {
          nextCursor = null
        }

        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 200))
      } while (nextCursor)

      console.log(`Synced ${klaviyoCount} profiles from Klaviyo`)
    }

    // --- SAVE TO FIRESTORE ---
    const customersRef = db.collection('organizations').doc(organizationId).collection('customers')
    let savedCount = 0
    let batch = db.batch()
    let batchCount = 0

    for (const [key, customer] of customerMap) {
      // Generate stable ID from email or phone
      const customerId = (customer.email || customer.phone || key)
        .toLowerCase()
        .replace(/[^a-z0-9@.-]/g, '-')
        .replace(/-+/g, '-')
        .substring(0, 100)

      // Calculate metrics
      const totalSpent = customer.shopify?.totalSpent || 0
      const ordersCount = customer.shopify?.ordersCount || 0

      const metrics = {
        lifetimeValue: totalSpent,
        totalOrders: ordersCount,
        averageOrderValue: ordersCount > 0 ? totalSpent / ordersCount : 0,
        firstOrderDate: null, // Would need order data
        lastOrderDate: null,  // Would need order data
        daysSinceLastOrder: null,
        purchaseFrequency: 0,
      }

      // Determine VIP status based on configurable thresholds
      const vipThresholds = orgData.customerSettings?.vipThresholds || {
        bronze: 200,
        silver: 500,
        gold: 1000,
        platinum: 2000,
      }
      const vipOrdersThreshold = orgData.customerSettings?.vipOrdersThreshold || 5

      const isVip = metrics.lifetimeValue >= vipThresholds.bronze || metrics.totalOrders >= vipOrdersThreshold
      const vipTier = metrics.lifetimeValue >= vipThresholds.platinum ? 'platinum' :
                      metrics.lifetimeValue >= vipThresholds.gold ? 'gold' :
                      metrics.lifetimeValue >= vipThresholds.silver ? 'silver' :
                      metrics.lifetimeValue >= vipThresholds.bronze ? 'bronze' : null

      const customerDoc = customersRef.doc(customerId)
      batch.set(customerDoc, {
        ...customer,
        metrics,
        status: {
          isVip,
          vipTier,
          riskLevel: customer.klaviyo?.churnRisk || null,
          isSubscriber: customer.klaviyo?.emailConsent || customer.shopify?.acceptsMarketing || false,
        },
        updatedAt: FieldValue.serverTimestamp(),
        lastSyncedAt: FieldValue.serverTimestamp(),
      }, { merge: true })

      batchCount++
      savedCount++

      // Commit in batches of 500
      if (batchCount >= 500) {
        await batch.commit()
        batch = db.batch()
        batchCount = 0
      }
    }

    // Final commit
    if (batchCount > 0) {
      await batch.commit()
    }

    // Update org with sync timestamp
    await db.collection('organizations').doc(organizationId).set({
      customersLastSync: FieldValue.serverTimestamp(),
      customerCount: savedCount,
    }, { merge: true })

    return NextResponse.json({
      success: true,
      count: savedCount,
      sources: {
        shopify: shopifyCount,
        klaviyo: klaviyoCount,
        merged: customerMap.size,
      },
    })
  } catch (error: any) {
    console.error('Customer sync error:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Sync failed',
    })
  }
}
