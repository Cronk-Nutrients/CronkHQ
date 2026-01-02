'use client'

interface ChannelBadgeProps {
  channelName: string
  channelCode?: string
  color?: string
  icon?: string
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
}

// Default colors/icons for known channels
const CHANNEL_DEFAULTS: Record<string, { color: string; icon: string }> = {
  shopify: { color: '#96bf48', icon: 'fab fa-shopify' },
  amazon_fba: { color: '#ff9900', icon: 'fab fa-amazon' },
  amazon_fbm: { color: '#ff9900', icon: 'fab fa-amazon' },
  amazon: { color: '#ff9900', icon: 'fab fa-amazon' },
  wholesale: { color: '#6366f1', icon: 'fas fa-building' },
  phone: { color: '#8b5cf6', icon: 'fas fa-phone' },
  manual: { color: '#64748b', icon: 'fas fa-edit' },
  retail: { color: '#14b8a6', icon: 'fas fa-cash-register' },
  ebay: { color: '#e53238', icon: 'fab fa-ebay' },
  etsy: { color: '#f56400', icon: 'fab fa-etsy' },
}

export default function ChannelBadge({
  channelName,
  channelCode,
  color,
  icon,
  size = 'md',
  showIcon = true
}: ChannelBadgeProps) {
  const defaults = channelCode ? CHANNEL_DEFAULTS[channelCode] : null
  const finalColor = color || defaults?.color || '#64748b'
  const finalIcon = icon || defaults?.icon || 'fas fa-shopping-cart'

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-2.5 py-1 gap-1.5',
    lg: 'text-base px-3 py-1.5 gap-2',
  }

  const iconSizes = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${sizeClasses[size]}`}
      style={{
        backgroundColor: `${finalColor}20`,
        color: finalColor,
      }}
    >
      {showIcon && <i className={`${finalIcon} ${iconSizes[size]}`}></i>}
      {channelName}
    </span>
  )
}

// Compact channel indicator (just icon)
interface ChannelIndicatorProps {
  channelCode?: string
  color?: string
  icon?: string
  size?: 'sm' | 'md' | 'lg'
  tooltip?: string
}

export function ChannelIndicator({
  channelCode,
  color,
  icon,
  size = 'md',
  tooltip
}: ChannelIndicatorProps) {
  const defaults = channelCode ? CHANNEL_DEFAULTS[channelCode] : null
  const finalColor = color || defaults?.color || '#64748b'
  const finalIcon = icon || defaults?.icon || 'fas fa-shopping-cart'

  const sizeClasses = {
    sm: 'w-5 h-5 text-xs',
    md: 'w-6 h-6 text-sm',
    lg: 'w-8 h-8 text-base',
  }

  return (
    <div
      className={`rounded-lg flex items-center justify-center ${sizeClasses[size]}`}
      style={{ backgroundColor: `${finalColor}20` }}
      title={tooltip}
    >
      <i className={finalIcon} style={{ color: finalColor }}></i>
    </div>
  )
}
