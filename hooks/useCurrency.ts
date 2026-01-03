'use client'

import { useState, useEffect, useCallback } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useOrganization } from '@/context/OrganizationContext'

interface ExchangeRate {
  rate: number
  lastUpdated: Date
  source: 'api' | 'manual'
}

interface CurrencyData {
  baseCurrency: string
  exchangeRates: Record<string, ExchangeRate>
  lastFetchedAt: Date | null
}

export function useCurrency() {
  const { organization } = useOrganization()
  const [currencyData, setCurrencyData] = useState<CurrencyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  // Load currency data with real-time updates
  useEffect(() => {
    if (!organization?.id) return

    const orgRef = doc(db, 'organizations', organization.id)
    const unsubscribe = onSnapshot(orgRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data()
        setCurrencyData({
          baseCurrency: data.currency?.baseCurrency || 'USD',
          exchangeRates: data.currency?.exchangeRates || {},
          lastFetchedAt: data.currency?.lastFetchedAt?.toDate() || null,
        })
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [organization?.id])

  // Check if refresh is needed on mount
  useEffect(() => {
    if (!organization?.id || loading) return

    const checkAndRefresh = async () => {
      const lastFetched = currencyData?.lastFetchedAt
      const needsRefresh = !lastFetched ||
        (Date.now() - lastFetched.getTime()) > 24 * 60 * 60 * 1000

      if (needsRefresh) {
        await refreshRates()
      }
    }

    checkAndRefresh()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organization?.id, loading])

  // Refresh rates from API
  const refreshRates = useCallback(async () => {
    if (!organization?.id || refreshing) return

    setRefreshing(true)
    try {
      const response = await fetch('/api/currency/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId: organization.id,
          baseCurrency: currencyData?.baseCurrency || 'USD',
        }),
      })

      const data = await response.json()
      if (!data.success) {
        console.error('Failed to refresh currency rates:', data.error)
      }
    } catch (error) {
      console.error('Currency refresh error:', error)
    } finally {
      setRefreshing(false)
    }
  }, [organization?.id, currencyData?.baseCurrency, refreshing])

  // Convert amount between currencies
  const convert = useCallback((
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): number => {
    if (fromCurrency === toCurrency) return amount
    if (!currencyData?.exchangeRates) return amount

    const key = `${fromCurrency}_${toCurrency}`
    const rate = currencyData.exchangeRates[key]?.rate

    if (!rate) {
      console.warn(`No exchange rate found for ${key}`)
      return amount
    }

    return amount * rate
  }, [currencyData?.exchangeRates])

  // Get rate between two currencies
  const getRate = useCallback((
    fromCurrency: string,
    toCurrency: string
  ): number | null => {
    if (fromCurrency === toCurrency) return 1
    if (!currencyData?.exchangeRates) return null

    const key = `${fromCurrency}_${toCurrency}`
    return currencyData.exchangeRates[key]?.rate || null
  }, [currencyData?.exchangeRates])

  // Format currency
  const formatCurrency = useCallback((
    amount: number,
    currency: string = 'USD'
  ): string => {
    const symbols: Record<string, string> = {
      USD: '$',
      CAD: 'C$',
      EUR: '€',
      GBP: '£',
      MXN: 'MX$',
      AUD: 'A$',
    }
    const symbol = symbols[currency] || '$'
    return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }, [])

  return {
    loading,
    refreshing,
    baseCurrency: currencyData?.baseCurrency || 'USD',
    exchangeRates: currencyData?.exchangeRates || {},
    lastFetchedAt: currencyData?.lastFetchedAt,
    refreshRates,
    convert,
    getRate,
    formatCurrency,
  }
}
