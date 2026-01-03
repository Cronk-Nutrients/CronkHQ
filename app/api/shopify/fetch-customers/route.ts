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
    let customersUrl: string

    if (pageInfo) {
      // Use page_info for pagination (cursor-based)
      customersUrl = `https://${cleanStoreName}.myshopify.com/admin/api/${SHOPIFY_API_VERSION}/customers.json?page_info=${pageInfo}&limit=${limit}`
    } else {
      customersUrl = `https://${cleanStoreName}.myshopify.com/admin/api/${SHOPIFY_API_VERSION}/customers.json?limit=${limit}`
    }

    console.log('Fetching customers from:', customersUrl)

    const response = await fetch(customersUrl, {
      method: 'GET',
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Customers API error:', response.status, errorText)

      let errorMessage = 'Failed to fetch customers'
      if (response.status === 401) {
        errorMessage = 'Invalid or expired access token'
      } else if (response.status === 403) {
        errorMessage = 'Access denied. Make sure the app has read_customers permission.'
      }

      return NextResponse.json({
        success: false,
        error: errorMessage,
        status: response.status,
      })
    }

    const data = await response.json()
    const customers = data.customers || []

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
      customers,
      count: customers.length,
      hasNextPage,
      nextPageInfo,
    })
  } catch (error: any) {
    console.error('Fetch customers error:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Network error',
    })
  }
}
