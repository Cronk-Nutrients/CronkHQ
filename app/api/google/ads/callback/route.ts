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
    const redirectUri = `${origin}/settings/integrations/google-ads`

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

    // Fetch Google Ads accessible accounts using the Google Ads API
    // Using the REST API to list accessible customers
    const customersResponse = await fetch(
      'https://googleads.googleapis.com/v17/customers:listAccessibleCustomers',
      {
        headers: {
          'Authorization': `Bearer ${tokens.access_token}`,
          'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '',
        },
      }
    )

    const customersData = await customersResponse.json()

    if (customersData.error) {
      console.error('Google Ads API error:', customersData.error)

      // If we don't have a developer token or API access, still return success
      // with tokens so the user can save their connection manually
      return NextResponse.json({
        success: true,
        accounts: [],
        tokens: {
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
        },
        email: userInfo.email,
        apiError: customersData.error.message || 'Could not fetch accounts automatically. Please enter your Customer ID manually.',
      })
    }

    // Get account details for each accessible customer
    const accounts: Array<{ customerId: string; descriptiveName: string; currencyCode: string }> = []

    for (const resourceName of customersData.resourceNames || []) {
      // Extract customer ID from resource name (format: customers/1234567890)
      const customerId = resourceName.replace('customers/', '')

      try {
        // Get customer details
        const customerResponse = await fetch(
          `https://googleads.googleapis.com/v17/customers/${customerId}`,
          {
            headers: {
              'Authorization': `Bearer ${tokens.access_token}`,
              'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '',
              'login-customer-id': customerId,
            },
          }
        )

        const customerData = await customerResponse.json()

        if (!customerData.error) {
          accounts.push({
            customerId,
            descriptiveName: customerData.descriptiveName || `Account ${customerId}`,
            currencyCode: customerData.currencyCode || 'USD',
          })
        }
      } catch (err) {
        // If we can't get details, still add with basic info
        accounts.push({
          customerId,
          descriptiveName: `Account ${customerId}`,
          currencyCode: 'USD',
        })
      }
    }

    return NextResponse.json({
      success: true,
      accounts,
      tokens: {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      },
      email: userInfo.email,
    })
  } catch (error: any) {
    console.error('Google Ads callback error:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to process callback',
    })
  }
}
