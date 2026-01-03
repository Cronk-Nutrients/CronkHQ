import { NextRequest, NextResponse } from 'next/server'

const SHOPIFY_API_VERSION = '2024-07'

export async function POST(request: NextRequest) {
  try {
    const { storeName, accessToken, limit = 250, pageInfo } = await request.json()

    if (!storeName || !accessToken) {
      return NextResponse.json({
        success: false,
        error: 'Missing store name or access token',
      })
    }

    const cleanStoreName = storeName.replace('.myshopify.com', '').trim()

    // Build URL with parameters
    let productsUrl: string

    if (pageInfo) {
      // Use page_info for pagination (cursor-based)
      productsUrl = `https://${cleanStoreName}.myshopify.com/admin/api/${SHOPIFY_API_VERSION}/products.json?page_info=${pageInfo}&limit=${limit}`
    } else {
      productsUrl = `https://${cleanStoreName}.myshopify.com/admin/api/${SHOPIFY_API_VERSION}/products.json?limit=${limit}`
    }

    console.log('Fetching products from:', productsUrl)

    const response = await fetch(productsUrl, {
      method: 'GET',
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Products API error:', response.status, errorText)

      let errorMessage = 'Failed to fetch products'
      if (response.status === 401) {
        errorMessage = 'Invalid or expired access token'
      } else if (response.status === 403) {
        errorMessage = 'Access denied. Make sure the app has read_products permission.'
      }

      return NextResponse.json({
        success: false,
        error: errorMessage,
        status: response.status,
      })
    }

    const data = await response.json()
    const products = data.products || []

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
      products,
      count: products.length,
      hasNextPage,
      nextPageInfo,
    })
  } catch (error: any) {
    console.error('Fetch products error:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Network error',
    })
  }
}
