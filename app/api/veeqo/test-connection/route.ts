import { NextRequest, NextResponse } from 'next/server'

const VEEQO_API_URL = 'https://api.veeqo.com'

export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json()

    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'Missing API key',
      })
    }

    console.log('Testing Veeqo connection...')

    // Test with warehouses endpoint (most reliable way to verify API key)
    const warehousesResponse = await fetch(`${VEEQO_API_URL}/warehouses`, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
        'Accept': 'application/json',
      },
    })

    console.log('Veeqo warehouses response status:', warehousesResponse.status)

    if (!warehousesResponse.ok) {
      const status = warehousesResponse.status
      let errorMessage = 'Failed to connect to Veeqo'

      try {
        const responseText = await warehousesResponse.text()
        console.log('Veeqo API error response:', responseText)
      } catch (e) {
        console.log('Could not read error response')
      }

      if (status === 401) {
        errorMessage = 'Invalid API key. Please check your API key and try again.'
      } else if (status === 403) {
        errorMessage = 'API access forbidden. Make sure API access is enabled for your Veeqo account.'
      } else if (status === 404) {
        errorMessage = 'API endpoint not found. Please contact support.'
      } else if (status === 429) {
        errorMessage = 'Rate limit exceeded. Please wait a moment and try again.'
      } else if (status >= 500) {
        errorMessage = 'Veeqo server error. Please try again later.'
      }

      return NextResponse.json({
        success: false,
        error: errorMessage,
      })
    }

    // Parse warehouses to verify connection works
    const warehouses = await warehousesResponse.json()
    const warehouseCount = Array.isArray(warehouses) ? warehouses.length : 0
    console.log('Veeqo warehouses count:', warehouseCount)

    // Try to get company info (optional - may not be available on all accounts)
    let companyName = 'Veeqo Account'
    let companyId = ''
    let companyEmail = ''
    let companyPhone = ''

    try {
      const companyResponse = await fetch(`${VEEQO_API_URL}/current_company`, {
        headers: {
          'x-api-key': apiKey,
          'Accept': 'application/json',
        },
      })

      if (companyResponse.ok) {
        const companyData = await companyResponse.json()
        const company = companyData.company || companyData
        companyName = company.name || company.company_name || 'Veeqo Account'
        companyId = (company.id || company.company_id || '').toString()
        companyEmail = company.email || company.owner_email || ''
        companyPhone = company.phone || company.telephone || ''
        console.log('Company info retrieved:', companyName)
      } else {
        console.log('Could not fetch company info, but connection is valid')
      }
    } catch (err) {
      console.log('Company endpoint not available, using defaults')
    }

    // Get store/channel count
    let storeCount = 0
    try {
      const storesResponse = await fetch(`${VEEQO_API_URL}/channels`, {
        headers: {
          'x-api-key': apiKey,
          'Accept': 'application/json',
        },
      })
      if (storesResponse.ok) {
        const stores = await storesResponse.json()
        storeCount = Array.isArray(stores) ? stores.length : 0
        console.log('Veeqo channels count:', storeCount)
      }
    } catch (err) {
      console.error('Error fetching channels:', err)
    }

    return NextResponse.json({
      success: true,
      company: {
        id: companyId,
        name: companyName,
        email: companyEmail,
        phone: companyPhone,
        warehouses: warehouseCount,
        stores: storeCount,
      },
    })
  } catch (error: any) {
    console.error('Veeqo test error:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Network error. Please check your internet connection.',
    })
  }
}
