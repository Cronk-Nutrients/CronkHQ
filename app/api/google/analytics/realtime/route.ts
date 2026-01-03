import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function POST(request: NextRequest) {
  try {
    const { organizationId } = await request.json()

    if (!organizationId) {
      return NextResponse.json({ success: false, error: 'Missing organization ID' })
    }

    // Get stored tokens from Firestore
    const orgDoc = await adminDb().collection('organizations').doc(organizationId).get()
    if (!orgDoc.exists) {
      return NextResponse.json({ success: false, error: 'Organization not found' })
    }

    const orgData = orgDoc.data()
    const gaData = orgData?.googleAnalytics

    if (!gaData?.isConnected || !gaData?.accessToken) {
      return NextResponse.json({ success: false, error: 'Google Analytics not connected' })
    }

    const { accessToken, refreshToken, propertyId } = gaData
    let token = accessToken

    // Fetch realtime data from GA4 Realtime API
    const response = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runRealtimeReport`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metrics: [
            { name: 'activeUsers' },
            { name: 'screenPageViews' },
            { name: 'eventCount' },
          ],
        }),
      }
    )

    const data = await response.json()

    if (data.error) {
      // Token might be expired, try to refresh
      if (data.error.code === 401 && refreshToken) {
        const refreshResponse = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            client_id: process.env.GOOGLE_CLIENT_ID || '',
            client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
          }),
        })

        const refreshData = await refreshResponse.json()

        if (refreshData.access_token) {
          // Update token in Firestore
          await adminDb().collection('organizations').doc(organizationId).update({
            'googleAnalytics.accessToken': refreshData.access_token,
          })

          // Retry the request with new token
          const retryResponse = await fetch(
            `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runRealtimeReport`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${refreshData.access_token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                metrics: [
                  { name: 'activeUsers' },
                  { name: 'screenPageViews' },
                  { name: 'eventCount' },
                ],
              }),
            }
          )

          const retryData = await retryResponse.json()

          if (retryData.error) {
            return NextResponse.json({
              success: false,
              error: retryData.error.message || 'Failed to fetch realtime data',
            })
          }

          return parseAndReturnData(retryData)
        }
      }

      return NextResponse.json({
        success: false,
        error: data.error.message || 'Failed to fetch realtime data',
      })
    }

    return parseAndReturnData(data)
  } catch (error: any) {
    console.error('GA Realtime API error:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch realtime data',
    })
  }
}

function parseAndReturnData(data: any) {
  // Parse the response - realtime reports may have no rows if no active users
  const row = data.rows?.[0]
  const metrics = row?.metricValues || []

  const result = {
    success: true,
    data: {
      activeUsers: parseInt(metrics[0]?.value || '0'),
      screenPageViews: parseInt(metrics[1]?.value || '0'),
      eventCount: parseInt(metrics[2]?.value || '0'),
    },
  }

  return NextResponse.json(result)
}
