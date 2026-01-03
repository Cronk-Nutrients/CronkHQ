import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { storeName, accessToken } = await request.json()

    if (!storeName || !accessToken) {
      return NextResponse.json({ success: false, error: 'Missing credentials' }, { status: 400 })
    }

    // Clean the store name
    const cleanStoreName = storeName.replace('.myshopify.com', '').toLowerCase()

    // Test the connection by fetching shop info
    const shopifyUrl = `https://${cleanStoreName}.myshopify.com/admin/api/2024-01/shop.json`

    const response = await fetch(shopifyUrl, {
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Shopify API error:', response.status, errorText)

      let errorMessage = 'Connection failed'
      if (response.status === 401) {
        errorMessage = 'Invalid access token - check your API credentials'
      } else if (response.status === 403) {
        errorMessage = 'Access denied - check API permissions'
      } else if (response.status === 404) {
        errorMessage = 'Store not found - check store name'
      }

      return NextResponse.json({ success: false, error: errorMessage }, { status: 400 })
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      shopName: data.shop.name,
      shopDomain: data.shop.domain,
    })
  } catch (error: any) {
    console.error('Test connection error:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Connection failed - network error'
    }, { status: 500 })
  }
}
