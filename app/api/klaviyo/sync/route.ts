import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

const KLAVIYO_API_VERSION = '2024-02-15'

export async function POST(request: NextRequest) {
  try {
    const { organizationId, syncSettings } = await request.json()

    if (!organizationId) {
      return NextResponse.json({ success: false, error: 'Missing organization ID' })
    }

    // Get API key from Firestore
    const orgDoc = await adminDb().collection('organizations').doc(organizationId).get()
    if (!orgDoc.exists) {
      return NextResponse.json({ success: false, error: 'Organization not found' })
    }

    const orgData = orgDoc.data()
    const apiKey = orgData?.klaviyo?.apiKey
    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'Klaviyo not connected' })
    }

    const headers = {
      'Authorization': `Klaviyo-API-Key ${apiKey}`,
      'revision': KLAVIYO_API_VERSION,
      'Accept': 'application/json',
    }

    let campaignsCount = 0
    let flowsCount = 0
    let segmentsCount = 0

    const batch = adminDb().batch()

    // Sync Campaigns
    if (syncSettings?.syncCampaigns) {
      try {
        const campaignsResponse = await fetch('https://a.klaviyo.com/api/campaigns/', {
          headers,
        })

        if (campaignsResponse.ok) {
          const campaignsData = await campaignsResponse.json()

          for (const campaign of campaignsData.data || []) {
            const campaignRef = adminDb()
              .collection('organizations')
              .doc(organizationId)
              .collection('klaviyoCampaigns')
              .doc(campaign.id)

            batch.set(campaignRef, {
              klaviyoId: campaign.id,
              name: campaign.attributes?.name || 'Untitled Campaign',
              status: campaign.attributes?.status,
              channel: campaign.attributes?.channel || 'email',
              createdAt: campaign.attributes?.created_at,
              updatedAt: campaign.attributes?.updated_at,
              sendTime: campaign.attributes?.send_time,
              syncedAt: new Date(),
            })
            campaignsCount++
          }
        }
      } catch (err) {
        console.error('Error syncing campaigns:', err)
      }
    }

    // Sync Flows
    if (syncSettings?.syncFlows) {
      try {
        const flowsResponse = await fetch('https://a.klaviyo.com/api/flows/', {
          headers,
        })

        if (flowsResponse.ok) {
          const flowsData = await flowsResponse.json()

          for (const flow of flowsData.data || []) {
            const flowRef = adminDb()
              .collection('organizations')
              .doc(organizationId)
              .collection('klaviyoFlows')
              .doc(flow.id)

            batch.set(flowRef, {
              klaviyoId: flow.id,
              name: flow.attributes?.name || 'Untitled Flow',
              status: flow.attributes?.status,
              archived: flow.attributes?.archived || false,
              triggerType: flow.attributes?.trigger_type,
              createdAt: flow.attributes?.created,
              updatedAt: flow.attributes?.updated,
              syncedAt: new Date(),
            })
            flowsCount++
          }
        }
      } catch (err) {
        console.error('Error syncing flows:', err)
      }
    }

    // Sync Segments
    if (syncSettings?.syncSegments) {
      try {
        const segmentsResponse = await fetch('https://a.klaviyo.com/api/segments/', {
          headers,
        })

        if (segmentsResponse.ok) {
          const segmentsData = await segmentsResponse.json()

          for (const segment of segmentsData.data || []) {
            const segmentRef = adminDb()
              .collection('organizations')
              .doc(organizationId)
              .collection('klaviyoSegments')
              .doc(segment.id)

            batch.set(segmentRef, {
              klaviyoId: segment.id,
              name: segment.attributes?.name || 'Untitled Segment',
              createdAt: segment.attributes?.created,
              updatedAt: segment.attributes?.updated,
              syncedAt: new Date(),
            })
            segmentsCount++
          }
        }
      } catch (err) {
        console.error('Error syncing segments:', err)
      }
    }

    // Commit all changes
    await batch.commit()

    // Update last sync time
    await adminDb().collection('organizations').doc(organizationId).update({
      'klaviyo.lastSync': new Date(),
      'klaviyo.syncStatus': 'success',
      'klaviyo.lastError': null,
    })

    return NextResponse.json({
      success: true,
      campaigns: campaignsCount,
      flows: flowsCount,
      segments: segmentsCount,
    })
  } catch (error: any) {
    console.error('Klaviyo sync error:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Sync failed',
    })
  }
}
