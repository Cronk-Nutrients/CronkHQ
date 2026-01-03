import { NextRequest, NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase-admin'

// Free API: Exchange Rate API (https://exchangerate-api.com)
const EXCHANGE_API_URL = 'https://api.exchangerate-api.com/v4/latest'

export async function POST(request: NextRequest) {
  try {
    const { organizationId, baseCurrency = 'USD' } = await request.json()

    if (!organizationId) {
      return NextResponse.json({ success: false, error: 'Missing organization ID' }, { status: 400 })
    }

    // Fetch latest rates from API
    const response = await fetch(`${EXCHANGE_API_URL}/${baseCurrency}`)

    if (!response.ok) {
      return NextResponse.json({ success: false, error: 'Failed to fetch rates' }, { status: 400 })
    }

    const data = await response.json()
    const rates = data.rates

    // Build exchange rate pairs we care about
    const targetCurrencies = ['USD', 'CAD', 'EUR', 'GBP', 'MXN', 'AUD']
    const exchangeRates: Record<string, { rate: number; lastUpdated: Date; source: string }> = {}

    for (const target of targetCurrencies) {
      if (target === baseCurrency) continue

      // Forward rate (e.g., USD to CAD)
      const forwardKey = `${baseCurrency}_${target}`
      exchangeRates[forwardKey] = {
        rate: rates[target] || 1,
        lastUpdated: new Date(),
        source: 'api',
      }

      // Reverse rate (e.g., CAD to USD)
      const reverseKey = `${target}_${baseCurrency}`
      exchangeRates[reverseKey] = {
        rate: rates[target] ? 1 / rates[target] : 1,
        lastUpdated: new Date(),
        source: 'api',
      }
    }

    // Also add cross rates between non-base currencies
    for (const from of targetCurrencies) {
      for (const to of targetCurrencies) {
        if (from === to) continue
        const key = `${from}_${to}`
        if (!exchangeRates[key] && rates[from] && rates[to]) {
          exchangeRates[key] = {
            rate: rates[to] / rates[from],
            lastUpdated: new Date(),
            source: 'api',
          }
        }
      }
    }

    // Update organization document
    const adminDb = getAdminDb()
    const orgRef = adminDb.collection('organizations').doc(organizationId)
    await orgRef.update({
      'currency.exchangeRates': exchangeRates,
      'currency.lastFetchedAt': new Date(),
      'currency.baseCurrency': baseCurrency,
    })

    return NextResponse.json({
      success: true,
      rates: exchangeRates,
      fetchedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Currency refresh error:', error)
    return NextResponse.json({ success: false, error: 'Refresh failed' }, { status: 500 })
  }
}

// GET endpoint to check if refresh is needed
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const organizationId = searchParams.get('organizationId')

    if (!organizationId) {
      return NextResponse.json({ success: false, error: 'Missing organization ID' }, { status: 400 })
    }

    const adminDb = getAdminDb()
    const orgDoc = await adminDb.collection('organizations').doc(organizationId).get()
    if (!orgDoc.exists) {
      return NextResponse.json({ success: false, error: 'Organization not found' }, { status: 404 })
    }

    const orgData = orgDoc.data()
    const currency = orgData?.currency || {}
    const lastFetched = currency.lastFetchedAt?.toDate() || null

    // Check if refresh is needed (older than 24 hours)
    const needsRefresh = !lastFetched ||
      (Date.now() - lastFetched.getTime()) > 24 * 60 * 60 * 1000

    return NextResponse.json({
      success: true,
      needsRefresh,
      lastFetchedAt: lastFetched?.toISOString() || null,
      rates: currency.exchangeRates || {},
      baseCurrency: currency.baseCurrency || 'USD',
    })
  } catch (error) {
    console.error('Currency check error:', error)
    return NextResponse.json({ success: false, error: 'Check failed' }, { status: 500 })
  }
}
