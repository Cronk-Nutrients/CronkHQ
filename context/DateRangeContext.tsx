'use client'

import { createContext, useContext, useState, useMemo, ReactNode, useCallback } from 'react'

export type DateRangePreset = 'today' | 'yesterday' | 'wtd' | 'mtd' | 'qtd' | 'ytd' | 'last7' | 'last30' | 'last90' | 'custom'

export interface DateRangeValue {
  startDate: Date
  endDate: Date
  preset: DateRangePreset
  label: string
}

interface DateRangeContextType {
  // Current date range
  dateRange: DateRangeValue
  preset: DateRangePreset

  // Setters
  setPreset: (preset: DateRangePreset) => void
  setCustomRange: (startDate: Date, endDate: Date) => void

  // Helpers
  isInRange: (date: Date | string) => boolean
  getComparisonRange: () => { startDate: Date; endDate: Date } | null

  // Preset labels for UI
  presetLabels: Record<DateRangePreset, string>
}

const DateRangeContext = createContext<DateRangeContextType | undefined>(undefined)

// Get date range from preset
function getDateRangeFromPreset(preset: DateRangePreset, customStart?: Date, customEnd?: Date): DateRangeValue {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const endOfToday = new Date(today)
  endOfToday.setHours(23, 59, 59, 999)

  const labels: Record<DateRangePreset, string> = {
    today: 'Today',
    yesterday: 'Yesterday',
    wtd: 'Week to Date',
    mtd: 'Month to Date',
    qtd: 'Quarter to Date',
    ytd: 'Year to Date',
    last7: 'Last 7 Days',
    last30: 'Last 30 Days',
    last90: 'Last 90 Days',
    custom: 'Custom Range',
  }

  switch (preset) {
    case 'today':
      return {
        startDate: today,
        endDate: endOfToday,
        preset,
        label: labels.today,
      }

    case 'yesterday': {
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      const endOfYesterday = new Date(yesterday)
      endOfYesterday.setHours(23, 59, 59, 999)
      return {
        startDate: yesterday,
        endDate: endOfYesterday,
        preset,
        label: labels.yesterday,
      }
    }

    case 'wtd': {
      // Week starts on Sunday (adjust if needed)
      const dayOfWeek = today.getDay()
      const startOfWeek = new Date(today)
      startOfWeek.setDate(today.getDate() - dayOfWeek)
      return {
        startDate: startOfWeek,
        endDate: endOfToday,
        preset,
        label: labels.wtd,
      }
    }

    case 'mtd': {
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
      return {
        startDate: startOfMonth,
        endDate: endOfToday,
        preset,
        label: labels.mtd,
      }
    }

    case 'qtd': {
      const quarter = Math.floor(today.getMonth() / 3)
      const startOfQuarter = new Date(today.getFullYear(), quarter * 3, 1)
      return {
        startDate: startOfQuarter,
        endDate: endOfToday,
        preset,
        label: labels.qtd,
      }
    }

    case 'ytd': {
      const startOfYear = new Date(today.getFullYear(), 0, 1)
      return {
        startDate: startOfYear,
        endDate: endOfToday,
        preset,
        label: labels.ytd,
      }
    }

    case 'last7': {
      const start = new Date(today)
      start.setDate(today.getDate() - 6) // Include today = 7 days
      return {
        startDate: start,
        endDate: endOfToday,
        preset,
        label: labels.last7,
      }
    }

    case 'last30': {
      const start = new Date(today)
      start.setDate(today.getDate() - 29) // Include today = 30 days
      return {
        startDate: start,
        endDate: endOfToday,
        preset,
        label: labels.last30,
      }
    }

    case 'last90': {
      const start = new Date(today)
      start.setDate(today.getDate() - 89) // Include today = 90 days
      return {
        startDate: start,
        endDate: endOfToday,
        preset,
        label: labels.last90,
      }
    }

    case 'custom': {
      if (customStart && customEnd) {
        const formattedStart = customStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        const formattedEnd = customEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        return {
          startDate: customStart,
          endDate: customEnd,
          preset,
          label: `${formattedStart} - ${formattedEnd}`,
        }
      }
      // Default custom to last 30 days if no dates provided
      const start = new Date(today)
      start.setDate(today.getDate() - 29)
      return {
        startDate: start,
        endDate: endOfToday,
        preset,
        label: labels.custom,
      }
    }

    default:
      return {
        startDate: today,
        endDate: endOfToday,
        preset: 'today',
        label: labels.today,
      }
  }
}

export function DateRangeProvider({ children }: { children: ReactNode }) {
  const [preset, setPresetState] = useState<DateRangePreset>('mtd')
  const [customStart, setCustomStart] = useState<Date | undefined>()
  const [customEnd, setCustomEnd] = useState<Date | undefined>()

  // Calculate current date range
  const dateRange = useMemo(() => {
    return getDateRangeFromPreset(preset, customStart, customEnd)
  }, [preset, customStart, customEnd])

  // Set preset
  const setPreset = useCallback((newPreset: DateRangePreset) => {
    setPresetState(newPreset)
    if (newPreset !== 'custom') {
      setCustomStart(undefined)
      setCustomEnd(undefined)
    }
  }, [])

  // Set custom range
  const setCustomRange = useCallback((startDate: Date, endDate: Date) => {
    // Normalize dates to start/end of day
    const start = new Date(startDate)
    start.setHours(0, 0, 0, 0)

    const end = new Date(endDate)
    end.setHours(23, 59, 59, 999)

    setCustomStart(start)
    setCustomEnd(end)
    setPresetState('custom')
  }, [])

  // Check if a date is in the current range
  const isInRange = useCallback((date: Date | string): boolean => {
    const checkDate = typeof date === 'string' ? new Date(date) : date
    // Compare timestamps to avoid any date object comparison issues
    const checkTime = checkDate.getTime()
    const startTime = dateRange.startDate.getTime()
    const endTime = dateRange.endDate.getTime()
    return checkTime >= startTime && checkTime <= endTime
  }, [dateRange])

  // Get comparison period (same length, previous period)
  const getComparisonRange = useCallback(() => {
    const { startDate, endDate } = dateRange
    const duration = endDate.getTime() - startDate.getTime()

    const compEnd = new Date(startDate.getTime() - 1) // Day before start
    compEnd.setHours(23, 59, 59, 999)

    const compStart = new Date(compEnd.getTime() - duration)
    compStart.setHours(0, 0, 0, 0)

    return { startDate: compStart, endDate: compEnd }
  }, [dateRange])

  // Preset labels
  const presetLabels: Record<DateRangePreset, string> = {
    today: 'Today',
    yesterday: 'Yesterday',
    wtd: 'Week to Date',
    mtd: 'Month to Date',
    qtd: 'Quarter to Date',
    ytd: 'Year to Date',
    last7: 'Last 7 Days',
    last30: 'Last 30 Days',
    last90: 'Last 90 Days',
    custom: 'Custom Range',
  }

  const value: DateRangeContextType = {
    dateRange,
    preset,
    setPreset,
    setCustomRange,
    isInRange,
    getComparisonRange,
    presetLabels,
  }

  return (
    <DateRangeContext.Provider value={value}>
      {children}
    </DateRangeContext.Provider>
  )
}

export function useDateRange() {
  const context = useContext(DateRangeContext)
  if (context === undefined) {
    throw new Error('useDateRange must be used within a DateRangeProvider')
  }
  return context
}
