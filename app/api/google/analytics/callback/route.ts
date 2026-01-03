import { NextRequest, NextResponse } from 'next/server'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json({ success: false, error: 'Missing authorization code' })
    }

    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
      return NextResponse.json({
        success: false,
        error: 'Google OAuth not configured. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to environment variables.'
      })
    }

    // Get the redirect URI from the request origin
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL
    const redirectUri = `${origin}/settings/integrations/google-analytics`

    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    })

    const tokens = await tokenResponse.json()

    if (tokens.error) {
      console.error('Token error:', tokens)
      return NextResponse.json({
        success: false,
        error: tokens.error_description || 'Failed to get access token',
      })
    }

    // Get user info
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    })
    const userInfo = await userResponse.json()

    // Fetch GA4 properties using Admin API
    const propertiesResponse = await fetch(
      'https://analyticsadmin.googleapis.com/v1beta/accountSummaries',
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    )

    const propertiesData = await propertiesResponse.json()

    if (propertiesData.error) {
      console.error('Properties error:', propertiesData)
      return NextResponse.json({
        success: false,
        error: propertiesData.error.message || 'Failed to fetch properties. Make sure you have GA4 properties and the Analytics Admin API is enabled.',
      })
    }

    // Extract properties from account summaries
    const properties: Array<{ propertyId: string; displayName: string }> = []

    for (const account of propertiesData.accountSummaries || []) {
      for (const property of account.propertySummaries || []) {
        properties.push({
          propertyId: property.property.replace('properties/', ''),
          displayName: property.displayName,
        })
      }
    }

    return NextResponse.json({
      success: true,
      properties,
      tokens: {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      },
      email: userInfo.email,
    })
  } catch (error: any) {
    console.error('GA callback error:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to process callback',
    })
  }
}
