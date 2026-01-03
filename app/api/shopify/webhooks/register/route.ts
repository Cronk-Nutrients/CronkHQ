import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { SHOPIFY_WEBHOOK_TOPICS, WebhookRegistrationResult } from '@/lib/shopify-webhooks'

// Webhook callback URL - this should point to your Cloud Function
const getWebhookCallbackUrl = (projectId: string) => {
  return `https://us-central1-${projectId}.cloudfunctions.net/shopifyWebhookHandler`
}

// Register webhooks for a Shopify store
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { organizationId, topics } = body

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

    // Get Firebase project ID for callback URL
    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    if (!projectId) {
      return NextResponse.json(
        { error: 'Firebase project ID not configured' },
        { status: 500 }
      )
    }

    const callbackUrl = getWebhookCallbackUrl(projectId)

    // Determine which topics to register
    const topicsToRegister = topics && topics.length > 0
      ? topics.filter((t: string) => SHOPIFY_WEBHOOK_TOPICS[t])
      : Object.keys(SHOPIFY_WEBHOOK_TOPICS)

    const results: WebhookRegistrationResult[] = []

    // Register each webhook
    for (const topic of topicsToRegister) {
      const config = SHOPIFY_WEBHOOK_TOPICS[topic]

      try {
        // First check if webhook already exists
        const existingResponse = await fetch(
          `https://${shopifyStore}.myshopify.com/admin/api/${config.apiVersion}/webhooks.json?topic=${topic}`,
          {
            headers: {
              'X-Shopify-Access-Token': shopifyToken,
              'Content-Type': 'application/json',
            },
          }
        )

        if (!existingResponse.ok) {
          throw new Error(`Failed to check existing webhooks: ${existingResponse.statusText}`)
        }

        const existingData = await existingResponse.json()

        // If webhook exists with same callback URL, skip
        const existingWebhook = existingData.webhooks?.find(
          (w: any) => w.topic === topic && w.address === callbackUrl
        )

        if (existingWebhook) {
          results.push({
            topic,
            success: true,
            webhookId: String(existingWebhook.id),
          })
          continue
        }

        // Delete any existing webhooks for this topic (to avoid duplicates)
        for (const webhook of existingData.webhooks || []) {
          if (webhook.topic === topic) {
            await fetch(
              `https://${shopifyStore}.myshopify.com/admin/api/${config.apiVersion}/webhooks/${webhook.id}.json`,
              {
                method: 'DELETE',
                headers: {
                  'X-Shopify-Access-Token': shopifyToken,
                },
              }
            )
          }
        }

        // Create new webhook
        const createResponse = await fetch(
          `https://${shopifyStore}.myshopify.com/admin/api/${config.apiVersion}/webhooks.json`,
          {
            method: 'POST',
            headers: {
              'X-Shopify-Access-Token': shopifyToken,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              webhook: {
                topic: topic,
                address: callbackUrl,
                format: 'json',
              },
            }),
          }
        )

        if (!createResponse.ok) {
          const errorText = await createResponse.text()
          throw new Error(`Failed to create webhook: ${errorText}`)
        }

        const createData = await createResponse.json()

        results.push({
          topic,
          success: true,
          webhookId: String(createData.webhook.id),
        })
      } catch (error) {
        results.push({
          topic,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    // Store registered webhooks in Firestore
    const successfulWebhooks = results.filter(r => r.success)
    if (successfulWebhooks.length > 0) {
      const webhooksData: Record<string, any> = {}
      for (const result of successfulWebhooks) {
        webhooksData[result.topic.replace('/', '_')] = {
          webhookId: result.webhookId,
          topic: result.topic,
          registeredAt: new Date().toISOString(),
          callbackUrl,
        }
      }

      await adminDb().collection('organizations').doc(organizationId).update({
        'integrations.shopify.webhooks': webhooksData,
        'integrations.shopify.webhooksUpdatedAt': new Date().toISOString(),
      })
    }

    const successCount = results.filter(r => r.success).length
    const failCount = results.filter(r => !r.success).length

    return NextResponse.json({
      success: true,
      message: `Registered ${successCount} webhooks${failCount > 0 ? `, ${failCount} failed` : ''}`,
      results,
      callbackUrl,
    })
  } catch (error) {
    console.error('Error registering webhooks:', error)
    return NextResponse.json(
      {
        error: 'Failed to register webhooks',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// Get registered webhooks
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const organizationId = searchParams.get('organizationId')

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

    // Fetch webhooks from Shopify
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

    // Filter to only our registered topics
    const ourTopics = Object.keys(SHOPIFY_WEBHOOK_TOPICS)
    const registeredWebhooks = data.webhooks?.filter(
      (w: any) => ourTopics.includes(w.topic)
    ) || []

    return NextResponse.json({
      success: true,
      webhooks: registeredWebhooks,
      availableTopics: ourTopics,
      storedWebhooks: orgData?.integrations?.shopify?.webhooks || {},
    })
  } catch (error) {
    console.error('Error fetching webhooks:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch webhooks',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
