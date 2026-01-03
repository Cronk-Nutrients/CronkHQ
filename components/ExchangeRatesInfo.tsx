'use client'

import { useState, useEffect } from 'react'
import { getExchangeRates, SUPPORTED_CURRENCIES, getExchangeRate } from '@/lib/exchange-rates'

interface ExchangeRatesInfoProps {
  baseCurrency: string
  showCurrencies?: string[]
  compact?: boolean
}

export function ExchangeRatesInfo({
  baseCurrency,
  showCurrencies = ['CAD', 'EUR', 'GBP'],
  compact = false,
}: ExchangeRatesInfoProps) {
  const [rates, setRates] = useState<Record<string, number>>({})
  const [lastUpdated, setLastUpdated] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRates() {
      try {
        const data = await getExchangeRates()
        setRates(data.rates)
        setLastUpdated(data.date)
      } catch (err) {
        console.error('Failed to fetch rates:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRates()
  }, [])

  if (loading) {
    return (
      <div className="text-xs text-slate-500 flex items-center gap-2">
        <div className="animate-spin rounded-full h-3 w-3 border border-slate-500 border-t-transparent"></div>
        Loading rates...
      </div>
    )
  }

  const calculateRate = (targetCurrency: string): number => {
    if (baseCurrency === 'USD') {
      return rates[targetCurrency] || 1
    }
    if (targetCurrency === 'USD') {
      return 1 / (rates[baseCurrency] || 1)
    }
    return (rates[targetCurrency] || 1) / (rates[baseCurrency] || 1)
  }

  if (compact) {
    return (
      <div className="text-xs text-slate-500 flex items-center gap-2 flex-wrap">
        <i className="fas fa-exchange-alt"></i>
        {showCurrencies.filter(c => c !== baseCurrency).map((curr, i) => (
          <span key={curr}>
            {i > 0 && '•'}
            1 {baseCurrency} = {calculateRate(curr).toFixed(2)} {curr}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3">
      <div className="flex items-center gap-2 mb-2">
        <i className="fas fa-exchange-alt text-slate-400"></i>
        <span className="text-xs font-medium text-slate-300">Exchange Rates</span>
        <span className="text-xs text-slate-500">(as of {lastUpdated})</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {showCurrencies.filter(c => c !== baseCurrency).map(curr => {
          const rate = calculateRate(curr)
          const currInfo = SUPPORTED_CURRENCIES.find(c => c.code === curr)
          return (
            <div key={curr} className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">1 {baseCurrency}</span>
              <span className="text-slate-500">=</span>
              <span className="text-white font-medium">{rate.toFixed(4)}</span>
              <span className="text-slate-400">{curr}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Currency badge for showing account currency
export function CurrencyBadge({
  currency,
  size = 'sm',
}: {
  currency: string
  size?: 'xs' | 'sm' | 'md'
}) {
  const currInfo = SUPPORTED_CURRENCIES.find(c => c.code === currency)

  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-[10px]',
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1 text-sm',
  }

  return (
    <span className={`inline-flex items-center gap-1 ${sizeClasses[size]} bg-slate-700/50 text-slate-300 rounded-md font-medium`}>
      <span>{currInfo?.symbol || '$'}</span>
      <span>{currency}</span>
    </span>
  )
}

// Currency selector component
export function CurrencySelector({
  value,
  onChange,
  label,
  description,
  disabled = false,
}: {
  value: string
  onChange: (currency: string) => void
  label?: string
  description?: string
  disabled?: boolean
}) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-slate-300 mb-2">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {SUPPORTED_CURRENCIES.map(curr => (
          <option key={curr.code} value={curr.code}>
            {curr.code} - {curr.name} ({curr.symbol})
          </option>
        ))}
      </select>
      {description && (
        <p className="text-xs text-slate-500 mt-1">{description}</p>
      )}
    </div>
  )
}

// Conversion display with both values
export function CurrencyConversionDisplay({
  originalAmount,
  originalCurrency,
  targetCurrency,
  showRate = false,
}: {
  originalAmount: number
  originalCurrency: string
  targetCurrency: string
  showRate?: boolean
}) {
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null)
  const [rate, setRate] = useState<number | null>(null)
  const [loading, setLoading] = useState(originalCurrency !== targetCurrency)

  useEffect(() => {
    async function convert() {
      if (originalCurrency === targetCurrency) {
        setConvertedAmount(originalAmount)
        setRate(1)
        setLoading(false)
        return
      }

      try {
        const exchangeRate = await getExchangeRate(originalCurrency, targetCurrency)
        setRate(exchangeRate)
        setConvertedAmount(originalAmount * exchangeRate)
      } catch (err) {
        setConvertedAmount(originalAmount)
        setRate(1)
      } finally {
        setLoading(false)
      }
    }

    convert()
  }, [originalAmount, originalCurrency, targetCurrency])

  if (loading) {
    return <div className="h-4 w-20 bg-slate-700 rounded animate-pulse inline-block"></div>
  }

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount)
  }

  if (originalCurrency === targetCurrency) {
    return <span>{formatAmount(originalAmount, originalCurrency)}</span>
  }

  return (
    <span className="inline-flex items-center gap-2">
      <span className="font-medium">{formatAmount(convertedAmount || 0, targetCurrency)}</span>
      <span className="text-slate-500 text-sm">
        ({formatAmount(originalAmount, originalCurrency)})
      </span>
      {showRate && rate && (
        <span className="text-xs text-slate-600">
          @ {rate.toFixed(4)}
        </span>
      )}
    </span>
  )
}
