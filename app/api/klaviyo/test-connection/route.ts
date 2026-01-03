import { NextRequest, NextResponse } from 'next/server'

const KLAVIYO_API_VERSION = '2024-02-15'

export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json()

    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'Missing API key',
      })
    }

    // Validate API key format
    if (!apiKey.startsWith('pk_')) {
      return NextResponse.json({
        success: false,
        error: 'Invalid API key format. Private API keys should start with pk_',
      })
    }

    // Test by fetching account info
    const accountResponse = await fetch('https://a.klaviyo.com/api/accounts/', {
      method: 'GET',
      headers: {
        'Authorization': `Klaviyo-API-Key ${apiKey}`,
        'revision': KLAVIYO_API_VERSION,
        'Accept': 'application/json',
      },
    })

    if (!accountResponse.ok) {
      const errorData = await accountResponse.json().catch(() => ({}))
      console.error('Klaviyo API error:', accountResponse.status, errorData)

      let errorMessage = 'Failed to connect to Klaviyo'
      if (accountResponse.status === 401 || accountResponse.status === 403) {
        errorMessage = 'Invalid API key. Make sure you copied the full Private API Key starting with pk_'
      } else if (accountResponse.status === 429) {
        errorMessage = 'Rate limited. Please try again in a moment.'
      }

      return NextResponse.json({
        success: false,
        error: errorMessage,
      })
    }

    const accountData = await accountResponse.json()
    const account = accountData.data?.[0]?.attributes || {}

    // Get lists count
    const listsResponse = await fetch('https://a.klaviyo.com/api/lists/', {
      headers: {
        'Authorization': `Klaviyo-API-Key ${apiKey}`,
        'revision': KLAVIYO_API_VERSION,
        'Accept': 'application/json',
      },
    })
    const listsData = await listsResponse.json()
    const listsCount = listsData.data?.length || 0

    // Get segments count
    const segmentsResponse = await fetch('https://a.klaviyo.com/api/segments/', {
      headers: {
        'Authorization': `Klaviyo-API-Key ${apiKey}`,
        'revision': KLAVIYO_API_VERSION,
        'Accept': 'application/json',
      },
    })
    const segmentsData = await segmentsResponse.json()
    const segmentsCount = segmentsData.data?.length || 0

    return NextResponse.json({
      success: true,
      accountId: accountData.data?.[0]?.id,
      accountName: account.contact_information?.organization_name || 'Klaviyo Account',
      email: account.contact_information?.default_sender_email,
      timezone: account.timezone,
      listsCount,
      segmentsCount,
    })
  } catch (error: any) {
    console.error('Klaviyo test error:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Network error',
    })
  }
}
