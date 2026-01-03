// Exchange rate service with caching

interface ExchangeRates {
  base: string
  date: string
  rates: Record<string, number>
  fetchedAt: number
}

let cachedRates: ExchangeRates | null = null
const CACHE_DURATION = 1000 * 60 * 60 * 4 // 4 hours

// Free API: exchangerate-api.com
const EXCHANGE_API_URL = 'https://api.exchangerate-api.com/v4/latest/USD'

export async function getExchangeRates(): Promise<ExchangeRates> {
  // Return cached if fresh
  if (cachedRates && Date.now() - cachedRates.fetchedAt < CACHE_DURATION) {
    return cachedRates
  }

  try {
    const response = await fetch(EXCHANGE_API_URL)
    const data = await response.json()

    cachedRates = {
      base: data.base,
      date: data.date,
      rates: data.rates,
      fetchedAt: Date.now(),
    }

    return cachedRates
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error)

    // Return fallback rates if API fails
    return {
      base: 'USD',
      date: new Date().toISOString().split('T')[0],
      rates: {
        USD: 1,
        CAD: 1.36,
        EUR: 0.92,
        GBP: 0.79,
        AUD: 1.53,
        MXN: 17.15,
        JPY: 149.50,
        CNY: 7.24,
        INR: 83.12,
        BRL: 4.97,
        CHF: 0.88,
        NZD: 1.64,
        SEK: 10.42,
        NOK: 10.68,
        DKK: 6.87,
        SGD: 1.34,
        HKD: 7.82,
        KRW: 1320.50,
      },
      fetchedAt: Date.now(),
    }
  }
}

export async function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<number> {
  if (fromCurrency === toCurrency) return amount

  const rates = await getExchangeRates()

  // Convert to USD first (base), then to target
  const fromRate = fromCurrency === 'USD' ? 1 : rates.rates[fromCurrency]
  const toRate = toCurrency === 'USD' ? 1 : rates.rates[toCurrency]

  if (!fromRate || !toRate) {
    console.error(`Missing rate for ${fromCurrency} or ${toCurrency}`)
    return amount
  }

  const inUSD = amount / fromRate
  const inTarget = inUSD * toRate

  return Math.round(inTarget * 100) / 100
}

export async function getExchangeRate(
  fromCurrency: string,
  toCurrency: string
): Promise<number> {
  if (fromCurrency === toCurrency) return 1

  const rates = await getExchangeRates()

  const fromRate = fromCurrency === 'USD' ? 1 : rates.rates[fromCurrency]
  const toRate = toCurrency === 'USD' ? 1 : rates.rates[toCurrency]

  if (!fromRate || !toRate) {
    console.error(`Missing rate for ${fromCurrency} or ${toCurrency}`)
    return 1
  }

  return toRate / fromRate
}

// Supported currencies for marketing integrations
export const SUPPORTED_CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'MX$' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
]

export function getCurrencySymbol(code: string): string {
  return SUPPORTED_CURRENCIES.find(c => c.code === code)?.symbol || '$'
}

export function getCurrencyName(code: string): string {
  return SUPPORTED_CURRENCIES.find(c => c.code === code)?.name || code
}

export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatCurrencyCompact(amount: number, currency: string): string {
  if (amount >= 1000000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(amount)
  }
  if (amount >= 1000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(amount)
  }
  return formatCurrency(amount, currency)
}
