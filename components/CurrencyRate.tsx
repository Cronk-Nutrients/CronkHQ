'use client'

import { useCurrency } from '@/hooks/useCurrency'

interface CurrencyRateProps {
  from?: string
  to?: string
  showRefresh?: boolean
  className?: string
}

export default function CurrencyRate({
  from = 'USD',
  to = 'CAD',
  showRefresh = false,
  className = ''
}: CurrencyRateProps) {
  const { getRate, refreshRates, refreshing, lastFetchedAt } = useCurrency()

  const rate = getRate(from, to)
  const lastUpdated = lastFetchedAt
    ? new Date(lastFetchedAt).toLocaleString()
    : 'Never'

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="text-sm">
        <span className="text-slate-400">1 {from} = </span>
        <span className="text-white font-medium">
          {rate ? rate.toFixed(4) : '---'} {to}
        </span>
      </div>

      {showRefresh && (
        <button
          onClick={() => refreshRates()}
          disabled={refreshing}
          className="p-1 text-slate-400 hover:text-emerald-400 transition-colors"
          title={`Last updated: ${lastUpdated}`}
        >
          <i className={`fas fa-sync-alt text-xs ${refreshing ? 'fa-spin' : ''}`}></i>
        </button>
      )}
    </div>
  )
}
