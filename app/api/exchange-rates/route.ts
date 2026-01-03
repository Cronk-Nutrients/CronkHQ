import { NextRequest, NextResponse } from 'next/server'
import { getExchangeRates, convertCurrency, getExchangeRate } from '@/lib/exchange-rates'

export async function GET() {
  try {
    const rates = await getExchangeRates()
    return NextResponse.json({
      success: true,
      base: rates.base,
      date: rates.date,
      rates: rates.rates,
      cachedAt: new Date(rates.fetchedAt).toISOString(),
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, from, to } = body

    if (amount === undefined || !from || !to) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: amount, from, to' },
        { status: 400 }
      )
    }

    const converted = await convertCurrency(amount, from, to)
    const rate = await getExchangeRate(from, to)
    const ratesData = await getExchangeRates()

    return NextResponse.json({
      success: true,
      original: { amount, currency: from },
      converted: { amount: converted, currency: to },
      rate,
      date: ratesData.date,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
