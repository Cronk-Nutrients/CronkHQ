import { NextRequest, NextResponse } from 'next/server'

const SHOPIFY_API_VERSION = '2024-07'

export async function POST(request: NextRequest) {
  try {
    const { storeName, accessToken } = await request.json()

    if (!storeName || !accessToken) {
      return NextResponse.json({
        success: false,
        error: 'Missing store name or access token',
      })
    }

    const cleanStoreName = storeName.replace('.myshopify.com', '').trim()

    // Test by fetching shop info
    const shopUrl = `https://${cleanStoreName}.myshopify.com/admin/api/${SHOPIFY_API_VERSION}/shop.json`

    console.log('Testing connection to:', shopUrl)

    const shopResponse = await fetch(shopUrl, {
      method: 'GET',
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json',
      },
    })

    if (!shopResponse.ok) {
      const errorText = await shopResponse.text()
      console.error('Shop API error:', shopResponse.status, errorText)

      let errorMessage = 'Failed to connect to Shopify'
      if (shopResponse.status === 401) {
        errorMessage = 'Invalid access token. Make sure you copied the full token starting with shpat_'
      } else if (shopResponse.status === 404) {
        errorMessage = `Store "${cleanStoreName}" not found. Check the store name.`
      } else if (shopResponse.status === 403) {
        errorMessage = 'Access denied. Make sure the app is installed and has the required permissions.'
      }

      return NextResponse.json({
        success: false,
        error: errorMessage,
        rawResponse: { status: shopResponse.status, body: errorText },
      })
    }

    const shopData = await shopResponse.json()
    const shop = shopData.shop

    // Get counts
    const [ordersCount, productsCount] = await Promise.all([
      getCount(`https://${cleanStoreName}.myshopify.com/admin/api/${SHOPIFY_API_VERSION}/orders/count.json`, accessToken),
      getCount(`https://${cleanStoreName}.myshopify.com/admin/api/${SHOPIFY_API_VERSION}/products/count.json`, accessToken),
    ])

    return NextResponse.json({
      success: true,
      shopName: shop.name,
      email: shop.email,
      plan: shop.plan_display_name || shop.plan_name,
      domain: shop.domain,
      ordersCount,
      productsCount,
    })
  } catch (error: any) {
    console.error('Test connection error:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Network error - check your internet connection',
    })
  }
}

async function getCount(url: string, accessToken: string): Promise<number> {
  try {
    const response = await fetch(url, {
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data.count || 0
    }
    return 0
  } catch {
    return 0
  }
}
