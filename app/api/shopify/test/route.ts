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
      console.error('Shopify API error:', errorText)
      return NextResponse.json(
        {
          success: false,
          error: response.status === 401 ? 'Invalid access token' : 'Connection failed',
        },
        { status: 400 }
      )
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      shopName: data.shop.name,
      shopDomain: data.shop.domain,
    })
  } catch (error) {
    console.error('Test connection error:', error)
    return NextResponse.json({ success: false, error: 'Connection failed' }, { status: 500 })
  }
}
