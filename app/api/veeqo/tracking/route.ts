import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

const VEEQO_API_URL = 'https://api.veeqo.com'

export async function POST(request: NextRequest) {
  try {
    const { organizationId, shipmentId } = await request.json()

    if (!organizationId || !shipmentId) {
      return NextResponse.json({
        success: false,
        error: 'Missing required parameters',
      })
    }

    // Get API key
    const orgDoc = await adminDb().collection('organizations').doc(organizationId).get()
    if (!orgDoc.exists) {
      return NextResponse.json({ success: false, error: 'Organization not found' })
    }

    const orgData = orgDoc.data()
    const apiKey = orgData?.veeqo?.apiKey
    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'Veeqo not connected' })
    }

    // Get tracking events
    const response = await fetch(
      `${VEEQO_API_URL}/shipments/${shipmentId}/tracking_events`,
      {
        headers: {
          'x-api-key': apiKey,
          'Accept': 'application/json',
        },
      }
    )

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: `Failed to fetch tracking: ${response.status}`,
      })
    }

    const trackingData = await response.json()

    return NextResponse.json({
      success: true,
      events: trackingData.events || [],
      currentStatus: trackingData.status,
      estimatedDelivery: trackingData.estimated_delivery,
    })
  } catch (error: any) {
    console.error('Tracking error:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch tracking',
    })
  }
}
