'use client'

import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useOrganization } from '@/context/OrganizationContext'

export interface SalesChannel {
  id: string
  name: string
  code: string
  type: 'ecommerce' | 'marketplace' | 'wholesale' | 'retail' | 'manual'
  color: string
  icon: string
  integration: {
    platform: string | null
    isConnected: boolean
    lastSyncAt: Date | null
  }
  fulfillment: {
    defaultLocation: string | null
    priority: number
    autoProcess: boolean
  }
  stats: {
    totalOrders: number
    pendingOrders: number
    totalRevenue: number
    averageOrderValue: number
    lastOrderAt: Date | null
  }
  isActive: boolean
  isDefault: boolean
  sortOrder: number
}

export function useSalesChannels(activeOnly: boolean = true) {
  const { organization } = useOrganization()
  const [channels, setChannels] = useState<SalesChannel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!organization?.id) {
      setChannels([])
      setLoading(false)
      return
    }

    const channelsRef = collection(db, 'organizations', organization.id, 'salesChannels')

    let q
    if (activeOnly) {
      q = query(channelsRef, where('isActive', '==', true), orderBy('sortOrder', 'asc'))
    } else {
      q = query(channelsRef, orderBy('sortOrder', 'asc'))
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const channelData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as SalesChannel[]

      setChannels(channelData)
      setLoading(false)
    }, (error) => {
      console.error('Error loading sales channels:', error)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [organization?.id, activeOnly])

  const getChannel = (channelId: string) => channels.find(c => c.id === channelId)

  const getChannelByCode = (code: string) => channels.find(c => c.code === code)

  const getDefaultChannel = () => channels.find(c => c.isDefault) || channels[0]

  const getChannelColor = (channelId?: string, channelCode?: string) => {
    if (channelId) {
      const channel = getChannel(channelId)
      if (channel) return channel.color
    }
    if (channelCode) {
      const channel = getChannelByCode(channelCode)
      if (channel) return channel.color
    }
    return '#64748b' // default slate
  }

  const getChannelIcon = (channelId?: string, channelCode?: string) => {
    if (channelId) {
      const channel = getChannel(channelId)
      if (channel) return channel.icon
    }
    if (channelCode) {
      const channel = getChannelByCode(channelCode)
      if (channel) return channel.icon
    }
    return 'fas fa-shopping-cart' // default icon
  }

  return {
    channels,
    loading,
    getChannel,
    getChannelByCode,
    getDefaultChannel,
    getChannelColor,
    getChannelIcon,
  }
}
