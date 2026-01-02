'use client'

import { useSalesChannels } from '@/hooks/useSalesChannels'

interface ChannelSelectorProps {
  value: string
  onChange: (channelId: string, channelCode: string, channelName: string) => void
  className?: string
  placeholder?: string
  showIcon?: boolean
}

export default function ChannelSelector({
  value,
  onChange,
  className = '',
  placeholder = 'Select Channel',
  showIcon = true
}: ChannelSelectorProps) {
  const { channels, loading } = useSalesChannels()

  if (loading) {
    return (
      <div className={`bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-slate-400 ${className}`}>
        Loading channels...
      </div>
    )
  }

  const selectedChannel = channels.find(c => c.id === value)

  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => {
          const channel = channels.find(c => c.id === e.target.value)
          if (channel) {
            onChange(channel.id, channel.code, channel.name)
          } else {
            onChange('', '', '')
          }
        }}
        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer"
        style={{
          paddingLeft: showIcon && selectedChannel ? '2.75rem' : '1rem'
        }}
      >
        <option value="">{placeholder}</option>
        {channels.map(channel => (
          <option key={channel.id} value={channel.id}>
            {channel.name}
          </option>
        ))}
      </select>

      {/* Selected channel icon */}
      {showIcon && selectedChannel && (
        <div
          className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded flex items-center justify-center"
          style={{ backgroundColor: `${selectedChannel.color}20` }}
        >
          <i className={`${selectedChannel.icon} text-xs`} style={{ color: selectedChannel.color }}></i>
        </div>
      )}

      {/* Dropdown arrow */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <i className="fas fa-chevron-down text-slate-400 text-sm"></i>
      </div>
    </div>
  )
}

// Inline channel selector with visual buttons
interface ChannelButtonSelectorProps {
  value: string
  onChange: (channelId: string, channelCode: string, channelName: string) => void
  showAll?: boolean
  className?: string
}

export function ChannelButtonSelector({
  value,
  onChange,
  showAll = true,
  className = ''
}: ChannelButtonSelectorProps) {
  const { channels, loading } = useSalesChannels()

  if (loading) return null

  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      {showAll && (
        <button
          onClick={() => onChange('', 'all', 'All Channels')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            value === '' || value === 'all'
              ? 'bg-emerald-500 text-white'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          All Channels
        </button>
      )}
      {channels.map(channel => (
        <button
          key={channel.id}
          onClick={() => onChange(channel.id, channel.code, channel.name)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
            value === channel.id
              ? 'text-white'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
          style={{
            backgroundColor: value === channel.id ? channel.color : undefined,
          }}
        >
          <i className={channel.icon}></i>
          {channel.name}
        </button>
      ))}
    </div>
  )
}
