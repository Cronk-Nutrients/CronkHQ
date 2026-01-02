'use client'

import { useSalesChannels } from '@/hooks/useSalesChannels'

interface ChannelAnalyticsProps {
  maxChannels?: number
  showRevenue?: boolean
  showOrders?: boolean
  compact?: boolean
}

export default function ChannelAnalytics({
  maxChannels = 4,
  showRevenue = true,
  showOrders = true,
  compact = false
}: ChannelAnalyticsProps) {
  const { channels, loading } = useSalesChannels()

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(maxChannels)].map((_, i) => (
          <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 animate-pulse">
            <div className="h-8 bg-slate-700 rounded mb-3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-700 rounded w-3/4"></div>
              <div className="h-4 bg-slate-700 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const totalRevenue = channels.reduce((sum, c) => sum + (c.stats?.totalRevenue || 0), 0)
  const totalOrders = channels.reduce((sum, c) => sum + (c.stats?.totalOrders || 0), 0)

  // Sort channels by revenue and take top N
  const topChannels = [...channels]
    .sort((a, b) => (b.stats?.totalRevenue || 0) - (a.stats?.totalRevenue || 0))
    .slice(0, maxChannels)

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}k`
    }
    return `$${amount.toFixed(0)}`
  }

  if (compact) {
    return (
      <div className="flex items-center gap-4 flex-wrap">
        {topChannels.map(channel => {
          const revenuePercent = totalRevenue > 0
            ? ((channel.stats?.totalRevenue || 0) / totalRevenue * 100).toFixed(0)
            : 0

          return (
            <div key={channel.id} className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${channel.color}20` }}
              >
                <i className={`${channel.icon} text-xs`} style={{ color: channel.color }}></i>
              </div>
              <span className="text-sm text-slate-300">{channel.name}</span>
              <span className="text-sm text-emerald-400 font-medium">
                {formatCurrency(channel.stats?.totalRevenue || 0)}
              </span>
              <span className="text-xs text-slate-500">({revenuePercent}%)</span>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {topChannels.map(channel => {
        const revenuePercent = totalRevenue > 0
          ? ((channel.stats?.totalRevenue || 0) / totalRevenue * 100).toFixed(1)
          : 0

        const orderPercent = totalOrders > 0
          ? ((channel.stats?.totalOrders || 0) / totalOrders * 100).toFixed(1)
          : 0

        return (
          <div
            key={channel.id}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${channel.color}20` }}
              >
                <i className={`${channel.icon} text-sm`} style={{ color: channel.color }}></i>
              </div>
              <span className="text-white font-medium text-sm truncate">{channel.name}</span>
            </div>

            <div className="space-y-2">
              {showOrders && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Orders</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white">{channel.stats?.totalOrders || 0}</span>
                    <span className="text-xs text-slate-500">({orderPercent}%)</span>
                  </div>
                </div>
              )}
              {showRevenue && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Revenue</span>
                  <span className="text-emerald-400 font-medium">
                    {formatCurrency(channel.stats?.totalRevenue || 0)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Share</span>
                <span className="text-slate-300">{revenuePercent}%</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-3 h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${revenuePercent}%`,
                  backgroundColor: channel.color
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Summary stats component
export function ChannelSummary() {
  const { channels, loading } = useSalesChannels()

  if (loading) return null

  const totalRevenue = channels.reduce((sum, c) => sum + (c.stats?.totalRevenue || 0), 0)
  const totalOrders = channels.reduce((sum, c) => sum + (c.stats?.totalOrders || 0), 0)
  const pendingOrders = channels.reduce((sum, c) => sum + (c.stats?.pendingOrders || 0), 0)
  const activeChannels = channels.filter(c => c.stats?.totalOrders > 0).length

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-white">{activeChannels}</div>
        <div className="text-sm text-slate-400">Active Channels</div>
      </div>
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-white">{totalOrders}</div>
        <div className="text-sm text-slate-400">Total Orders</div>
      </div>
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-amber-400">{pendingOrders}</div>
        <div className="text-sm text-slate-400">Pending</div>
      </div>
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-emerald-400">
          ${(totalRevenue / 1000).toFixed(1)}k
        </div>
        <div className="text-sm text-slate-400">Total Revenue</div>
      </div>
    </div>
  )
}
