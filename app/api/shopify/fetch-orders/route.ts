import { NextRequest, NextResponse } from 'next/server'

const SHOPIFY_API_VERSION = '2024-07'

export async function POST(request: NextRequest) {
  try {
    const { storeName, accessToken, status = 'any', limit = 250, sinceId, pageInfo } = await request.json()

    if (!storeName || !accessToken) {
      return NextResponse.json({
        success: false,
        error: 'Missing store name or access token',
      })
    }

    const cleanStoreName = storeName.replace('.myshopify.com', '').trim()

    // Build URL with parameters
    let ordersUrl: string

    if (pageInfo) {
      // Use page_info for pagination (cursor-based)
      ordersUrl = `https://${cleanStoreName}.myshopify.com/admin/api/${SHOPIFY_API_VERSION}/orders.json?page_info=${pageInfo}&limit=${limit}`
    } else {
      const params = new URLSearchParams({
        status,
        limit: limit.toString(),
      })

      if (sinceId) {
        params.append('since_id', sinceId)
      }

      ordersUrl = `https://${cleanStoreName}.myshopify.com/admin/api/${SHOPIFY_API_VERSION}/orders.json?${params}`
    }

    console.log('Fetching orders from:', ordersUrl)

    const response = await fetch(ordersUrl, {
      method: 'GET',
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Orders API error:', response.status, errorText)

      let errorMessage = 'Failed to fetch orders'
      if (response.status === 401) {
        errorMessage = 'Invalid or expired access token'
      } else if (response.status === 403) {
        errorMessage = 'Access denied. Make sure the app has read_orders permission.'
      }

      return NextResponse.json({
        success: false,
        error: errorMessage,
        status: response.status,
      })
    }

    const data = await response.json()
    const orders = data.orders || []

    // Check for pagination (Link header)
    const linkHeader = response.headers.get('Link')
    let hasNextPage = false
    let nextPageInfo = null

    if (linkHeader && linkHeader.includes('rel="next"')) {
      hasNextPage = true
      const match = linkHeader.match(/page_info=([^>&]+).*rel="next"/)
      if (match) {
        nextPageInfo = match[1]
      }
    }

    return NextResponse.json({
      success: true,
      orders,
      count: orders.length,
      hasNextPage,
      nextPageInfo,
    })
  } catch (error: any) {
    console.error('Fetch orders error:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Network error',
    })
  }
}
