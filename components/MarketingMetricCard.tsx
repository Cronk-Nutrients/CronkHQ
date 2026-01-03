'use client'

import { useState, useEffect } from 'react'
import { convertCurrency, formatCurrency } from '@/lib/exchange-rates'

interface MarketingMetricCardProps {
  label: string
  value: number
  originalCurrency: string
  targetCurrency: string
  showOriginal?: boolean
  prefix?: string
  suffix?: string
  trend?: number
  trendLabel?: string
  icon?: string
  color?: 'emerald' | 'blue' | 'purple' | 'orange' | 'red' | 'amber' | 'cyan' | 'pink'
  size?: 'sm' | 'md' | 'lg'
  isCurrency?: boolean
}

const colorClasses = {
  emerald: {
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  blue: {
    text: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  purple: {
    text: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
  orange: {
    text: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
  },
  red: {
    text: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
  },
  amber: {
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
  cyan: {
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
  pink: {
    text: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
  },
}

export function MarketingMetricCard({
  label,
  value,
  originalCurrency,
  targetCurrency,
  showOriginal = true,
  prefix = '',
  suffix = '',
  trend,
  trendLabel = 'vs last period',
  icon,
  color = 'emerald',
  size = 'md',
  isCurrency = true,
}: MarketingMetricCardProps) {
  const [convertedValue, setConvertedValue] = useState<number | null>(null)
  const [loading, setLoading] = useState(originalCurrency !== targetCurrency && isCurrency)

  useEffect(() => {
    async function convert() {
      if (!isCurrency || originalCurrency === targetCurrency) {
        setConvertedValue(value)
        setLoading(false)
        return
      }

      try {
        const converted = await convertCurrency(value, originalCurrency, targetCurrency)
        setConvertedValue(converted)
      } catch (err) {
        console.error('Conversion failed:', err)
        setConvertedValue(value)
      } finally {
        setLoading(false)
      }
    }

    convert()
  }, [value, originalCurrency, targetCurrency, isCurrency])

  const colors = colorClasses[color]
  const sizeClasses = {
    sm: { value: 'text-xl', label: 'text-xs' },
    md: { value: 'text-2xl', label: 'text-sm' },
    lg: { value: 'text-3xl', label: 'text-base' },
  }

  const formatValue = (val: number) => {
    if (isCurrency) {
      return formatCurrency(val, targetCurrency)
    }
    return val.toLocaleString()
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className={`${sizeClasses[size].label} text-slate-400`}>{label}</span>
        {icon && (
          <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center`}>
            <i className={`fas fa-${icon} ${colors.text} text-sm`}></i>
          </div>
        )}
      </div>

      {loading ? (
        <div className="h-8 bg-slate-700 rounded animate-pulse"></div>
      ) : (
        <>
          {/* Converted value (primary) */}
          <div className={`${sizeClasses[size].value} font-bold ${colors.text}`}>
            {prefix}
            {isCurrency ? formatValue(convertedValue || 0) : (convertedValue || 0).toLocaleString()}
            {suffix}
          </div>

          {/* Original value (secondary) */}
          {showOriginal && originalCurrency !== targetCurrency && isCurrency && (
            <div className="text-xs text-slate-500 mt-1">
              Originally: {formatCurrency(value, originalCurrency)}
            </div>
          )}

          {/* Trend indicator */}
          {trend !== undefined && (
            <div className={`text-xs mt-2 flex items-center gap-1 ${trend >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              <i className={`fas fa-arrow-${trend >= 0 ? 'up' : 'down'} text-[10px]`}></i>
              <span>{Math.abs(trend).toFixed(1)}% {trendLabel}</span>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// Compact version for inline use
export function MarketingMetricInline({
  label,
  value,
  originalCurrency,
  targetCurrency,
  color = 'emerald',
  isCurrency = true,
}: Omit<MarketingMetricCardProps, 'icon' | 'trend' | 'size' | 'showOriginal' | 'prefix' | 'suffix' | 'trendLabel'>) {
  const [convertedValue, setConvertedValue] = useState<number | null>(null)
  const [loading, setLoading] = useState(originalCurrency !== targetCurrency && isCurrency)

  useEffect(() => {
    async function convert() {
      if (!isCurrency || originalCurrency === targetCurrency) {
        setConvertedValue(value)
        setLoading(false)
        return
      }

      try {
        const converted = await convertCurrency(value, originalCurrency, targetCurrency)
        setConvertedValue(converted)
      } catch (err) {
        setConvertedValue(value)
      } finally {
        setLoading(false)
      }
    }

    convert()
  }, [value, originalCurrency, targetCurrency, isCurrency])

  const colors = colorClasses[color]

  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-slate-400">{label}</span>
      {loading ? (
        <div className="h-5 w-16 bg-slate-700 rounded animate-pulse"></div>
      ) : (
        <span className={`text-sm font-medium ${colors.text}`}>
          {isCurrency ? formatCurrency(convertedValue || 0, targetCurrency) : (convertedValue || 0).toLocaleString()}
        </span>
      )}
    </div>
  )
}
