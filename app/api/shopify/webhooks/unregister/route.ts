import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { SHOPIFY_WEBHOOK_TOPICS } from '@/lib/shopify-webhooks'

// Unregister webhooks for a Shopify store
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { organizationId, topics, unregisterAll } = body

    if (!organizationId) {
      return NextResponse.json(
        { error: 'Organization ID is required' },
        { status: 400 }
      )
    }

    // Get organization's Shopify credentials
    const orgDoc = await adminDb().collection('organizations').doc(organizationId).get()
    if (!orgDoc.exists) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      )
    }

    const orgData = orgDoc.data()
    const shopifyStore = orgData?.integrations?.shopify?.storeName
    const shopifyToken = orgData?.integrations?.shopify?.accessToken

    if (!shopifyStore || !shopifyToken) {
      return NextResponse.json(
        { error: 'Shopify integration not configured' },
        { status: 400 }
      )
    }

    // Fetch all webhooks from Shopify
    const response = await fetch(
      `https://${shopifyStore}.myshopify.com/admin/api/2024-01/webhooks.json`,
      {
        headers: {
          'X-Shopify-Access-Token': shopifyToken,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch webhooks: ${response.statusText}`)
    }

    const data = await response.json()
    const allWebhooks = data.webhooks || []

    // Determine which webhooks to delete
    let webhooksToDelete: any[]
    if (unregisterAll) {
      // Delete all our app's webhooks
      const ourTopics = Object.keys(SHOPIFY_WEBHOOK_TOPICS)
      webhooksToDelete = allWebhooks.filter((w: any) => ourTopics.includes(w.topic))
    } else if (topics && topics.length > 0) {
      // Delete specific topics
      webhooksToDelete = allWebhooks.filter((w: any) => topics.includes(w.topic))
    } else {
      return NextResponse.json(
        { error: 'Either topics array or unregisterAll must be provided' },
        { status: 400 }
      )
    }

    const results: { topic: string; success: boolean; error?: string }[] = []

    // Delete each webhook
    for (const webhook of webhooksToDelete) {
      try {
        const deleteResponse = await fetch(
          `https://${shopifyStore}.myshopify.com/admin/api/2024-01/webhooks/${webhook.id}.json`,
          {
            method: 'DELETE',
            headers: {
              'X-Shopify-Access-Token': shopifyToken,
            },
          }
        )

        if (!deleteResponse.ok && deleteResponse.status !== 404) {
          throw new Error(`Failed to delete webhook: ${deleteResponse.statusText}`)
        }

        results.push({
          topic: webhook.topic,
          success: true,
        })
      } catch (error) {
        results.push({
          topic: webhook.topic,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    // Update Firestore to remove webhook records
    const successfulDeletions = results.filter(r => r.success)
    if (successfulDeletions.length > 0) {
      const currentWebhooks = orgData?.integrations?.shopify?.webhooks || {}
      const updatedWebhooks: Record<string, any> = {}

      for (const [key, value] of Object.entries(currentWebhooks)) {
        const topicKey = key.replace('_', '/')
        if (!successfulDeletions.some(d => d.topic === topicKey)) {
          updatedWebhooks[key] = value
        }
      }

      await adminDb().collection('organizations').doc(organizationId).update({
        'integrations.shopify.webhooks': updatedWebhooks,
        'integrations.shopify.webhooksUpdatedAt': new Date().toISOString(),
      })
    }

    const successCount = results.filter(r => r.success).length
    const failCount = results.filter(r => !r.success).length

    return NextResponse.json({
      success: true,
      message: `Unregistered ${successCount} webhooks${failCount > 0 ? `, ${failCount} failed` : ''}`,
      results,
    })
  } catch (error) {
    console.error('Error unregistering webhooks:', error)
    return NextResponse.json(
      {
        error: 'Failed to unregister webhooks',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
