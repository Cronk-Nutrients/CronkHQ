import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function POST(request: NextRequest) {
  try {
    const { organizationId, dateRange = '30', startDate: customStart, endDate: customEnd } = await request.json()

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

    // Try to use access token, refresh if needed
    let token = accessToken

    // Calculate date range
    let startDate: Date
    let endDate: Date

    if (customStart && customEnd) {
      // Custom date range
      startDate = new Date(customStart)
      endDate = new Date(customEnd)
    } else if (dateRange === '0') {
      // Today only
      startDate = new Date()
      endDate = new Date()
    } else {
      // Standard date range (7, 30, 90 days)
      endDate = new Date()
      startDate = new Date()
      startDate.setDate(startDate.getDate() - parseInt(dateRange))
    }

    const formatDate = (date: Date) => date.toISOString().split('T')[0]

    // Fetch data from GA4 Data API
    const response = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateRanges: [
            {
              startDate: formatDate(startDate),
              endDate: formatDate(endDate),
            },
          ],
          metrics: [
            { name: 'activeUsers' },
            { name: 'sessions' },
            { name: 'screenPageViews' },
            { name: 'averageSessionDuration' },
            { name: 'bounceRate' },
            { name: 'newUsers' },
            { name: 'totalUsers' },
            { name: 'engagedSessions' },
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
            `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${refreshData.access_token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                dateRanges: [
                  {
                    startDate: formatDate(startDate),
                    endDate: formatDate(endDate),
                  },
                ],
                metrics: [
                  { name: 'activeUsers' },
                  { name: 'sessions' },
                  { name: 'screenPageViews' },
                  { name: 'averageSessionDuration' },
                  { name: 'bounceRate' },
                  { name: 'newUsers' },
                  { name: 'totalUsers' },
                  { name: 'engagedSessions' },
                ],
              }),
            }
          )

          const retryData = await retryResponse.json()

          if (retryData.error) {
            return NextResponse.json({
              success: false,
              error: retryData.error.message || 'Failed to fetch analytics data',
            })
          }

          return parseAndReturnData(retryData)
        }
      }

      return NextResponse.json({
        success: false,
        error: data.error.message || 'Failed to fetch analytics data',
      })
    }

    return parseAndReturnData(data)
  } catch (error: any) {
    console.error('GA Data API error:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch analytics data',
    })
  }
}

function parseAndReturnData(data: any) {
  // Parse the response
  const row = data.rows?.[0]
  const metrics = row?.metricValues || []

  const result = {
    success: true,
    data: {
      activeUsers: parseInt(metrics[0]?.value || '0'),
      sessions: parseInt(metrics[1]?.value || '0'),
      pageViews: parseInt(metrics[2]?.value || '0'),
      avgSessionDuration: parseFloat(metrics[3]?.value || '0'),
      bounceRate: parseFloat(metrics[4]?.value || '0') * 100,
      newUsers: parseInt(metrics[5]?.value || '0'),
      totalUsers: parseInt(metrics[6]?.value || '0'),
      engagedSessions: parseInt(metrics[7]?.value || '0'),
    },
  }

  return NextResponse.json(result)
}
