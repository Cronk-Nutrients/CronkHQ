'use client'

import { useEffect, useState, useCallback } from 'react'
import { X, ShoppingCart, ExternalLink, Volume2, VolumeX } from 'lucide-react'
import { useNewOrderNotifications } from '@/hooks/useNotifications'
import Link from 'next/link'

interface OrderNotificationProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

// Play notification sound
function playNotificationSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContextClass) return

    const audioContext = new AudioContextClass()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    // Pleasant two-tone notification sound
    oscillator.type = 'sine'
    oscillator.frequency.value = 880 // A5
    gainNode.gain.value = 0.15

    oscillator.start()

    setTimeout(() => {
      oscillator.frequency.value = 1100 // C#6
    }, 150)

    setTimeout(() => {
      oscillator.frequency.value = 1320 // E6
    }, 300)

    setTimeout(() => {
      oscillator.stop()
    }, 450)
  } catch (e) {
    console.error('Failed to play notification sound:', e)
  }
}

export default function OrderNotification({ position = 'top-right' }: OrderNotificationProps) {
  const { newOrder, dismiss } = useNewOrderNotifications()
  const [isVisible, setIsVisible] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Load sound preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('orderNotificationSound')
    if (saved !== null) {
      setSoundEnabled(saved === 'true')
    }
  }, [])

  // Save sound preference
  const toggleSound = useCallback(() => {
    const newValue = !soundEnabled
    setSoundEnabled(newValue)
    localStorage.setItem('orderNotificationSound', String(newValue))
  }, [soundEnabled])

  // Show notification when new order arrives
  useEffect(() => {
    if (newOrder) {
      setIsVisible(true)
      if (soundEnabled) {
        playNotificationSound()
      }
    } else {
      setIsVisible(false)
    }
  }, [newOrder, soundEnabled])

  // Handle dismiss
  const handleDismiss = useCallback(() => {
    setIsVisible(false)
    setTimeout(dismiss, 300) // Wait for animation
  }, [dismiss])

  if (!newOrder) return null

  const positionClasses = {
    'top-right': 'top-20 right-6',
    'top-left': 'top-20 left-6',
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
  }

  const formatAmount = (amount: string | undefined, currency: string | undefined) => {
    if (!amount) return ''
    const numAmount = parseFloat(amount)
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
    }).format(numAmount)
  }

  return (
    <div
      className={`fixed z-50 ${positionClasses[position]} transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-xl shadow-2xl overflow-hidden min-w-[320px] max-w-[400px]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-black/10">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-lg">
              <ShoppingCart className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-white">{newOrder.title}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={toggleSound}
              className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
              title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-white/80" />
              ) : (
                <VolumeX className="w-4 h-4 text-white/80" />
              )}
            </button>
            <button
              onClick={handleDismiss}
              className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4 text-white/80" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-3">
          <p className="text-white/90 text-sm mb-2">{newOrder.message}</p>

          {newOrder.amount && (
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Order Total</span>
              <span className="text-white font-bold text-lg">
                {formatAmount(newOrder.amount, newOrder.currency)}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex border-t border-white/20">
          <button
            onClick={handleDismiss}
            className="flex-1 px-4 py-2.5 text-white/80 hover:bg-white/10 transition-colors text-sm font-medium"
          >
            Dismiss
          </button>
          {newOrder.orderId && (
            <Link
              href={`/fulfillment?orderId=${newOrder.orderId}`}
              onClick={handleDismiss}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/20 transition-colors text-white text-sm font-medium border-l border-white/20"
            >
              View Order
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* Animated ring effect */}
      {isVisible && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 rounded-xl bg-emerald-500 animate-ping opacity-20" />
        </div>
      )}
    </div>
  )
}

// Compact notification badge for header
export function OrderNotificationBadge() {
  const { newOrder } = useNewOrderNotifications()

  if (!newOrder) return null

  return (
    <div className="absolute -top-1 -right-1 flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
    </div>
  )
}
