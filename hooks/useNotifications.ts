'use client'

import { useState, useEffect, useCallback } from 'react'
import { db } from '@/lib/firebase'
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  doc,
  updateDoc,
  writeBatch,
  Timestamp,
} from 'firebase/firestore'
import { useOrganization } from '@/context/OrganizationContext'

export interface Notification {
  id: string
  type: string
  title: string
  message: string
  read: boolean
  createdAt: Date
  // Order-specific fields
  orderId?: string
  orderNumber?: string
  amount?: string
  currency?: string
  // Product-specific fields
  productId?: string
  productName?: string
  // Refund-specific fields
  refundId?: string
  // Generic metadata
  metadata?: Record<string, any>
}

interface UseNotificationsOptions {
  limit?: number
  unreadOnly?: boolean
}

export function useNotifications(options: UseNotificationsOptions = {}) {
  const { organization } = useOrganization()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const notificationLimit = options.limit || 50

  useEffect(() => {
    if (!organization?.id) {
      setNotifications([])
      setUnreadCount(0)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    const notificationsRef = collection(db, 'organizations', organization.id, 'notifications')

    // Build query
    let q = query(
      notificationsRef,
      orderBy('createdAt', 'desc'),
      limit(notificationLimit)
    )

    if (options.unreadOnly) {
      q = query(
        notificationsRef,
        where('read', '==', false),
        orderBy('createdAt', 'desc'),
        limit(notificationLimit)
      )
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const notificationsList: Notification[] = []
        let unread = 0

        snapshot.forEach((doc) => {
          const data = doc.data()
          const notification: Notification = {
            id: doc.id,
            type: data.type || 'info',
            title: data.title || 'Notification',
            message: data.message || '',
            read: data.read || false,
            createdAt: data.createdAt instanceof Timestamp
              ? data.createdAt.toDate()
              : new Date(data.createdAt),
            orderId: data.orderId,
            orderNumber: data.orderNumber,
            amount: data.amount,
            currency: data.currency,
            productId: data.productId,
            productName: data.productName,
            refundId: data.refundId,
            metadata: data.metadata,
          }

          notificationsList.push(notification)
          if (!notification.read) {
            unread++
          }
        })

        setNotifications(notificationsList)
        setUnreadCount(unread)
        setLoading(false)
      },
      (err) => {
        console.error('Error listening to notifications:', err)
        setError('Failed to load notifications')
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [organization?.id, notificationLimit, options.unreadOnly])

  const markAsRead = useCallback(async (notificationId: string) => {
    if (!organization?.id) return

    try {
      const notificationRef = doc(
        db,
        'organizations',
        organization.id,
        'notifications',
        notificationId
      )
      await updateDoc(notificationRef, { read: true })
    } catch (err) {
      console.error('Error marking notification as read:', err)
    }
  }, [organization?.id])

  const markAllAsRead = useCallback(async () => {
    if (!organization?.id || notifications.length === 0) return

    try {
      const batch = writeBatch(db)
      const unreadNotifications = notifications.filter(n => !n.read)

      for (const notification of unreadNotifications) {
        const notificationRef = doc(
          db,
          'organizations',
          organization.id,
          'notifications',
          notification.id
        )
        batch.update(notificationRef, { read: true })
      }

      await batch.commit()
    } catch (err) {
      console.error('Error marking all notifications as read:', err)
    }
  }, [organization?.id, notifications])

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
  }
}

// Hook for listening to new orders specifically
export function useNewOrderNotifications() {
  const { organization } = useOrganization()
  const [newOrder, setNewOrder] = useState<Notification | null>(null)

  useEffect(() => {
    if (!organization?.id) return

    const notificationsRef = collection(db, 'organizations', organization.id, 'notifications')
    const q = query(
      notificationsRef,
      where('type', '==', 'order_created'),
      where('read', '==', false),
      orderBy('createdAt', 'desc'),
      limit(1)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const doc = snapshot.docs[0]
        const data = doc.data()

        // Only trigger for notifications created in the last 30 seconds
        const createdAt = data.createdAt instanceof Timestamp
          ? data.createdAt.toDate()
          : new Date(data.createdAt)

        const thirtySecondsAgo = new Date(Date.now() - 30000)

        if (createdAt > thirtySecondsAgo) {
          setNewOrder({
            id: doc.id,
            type: data.type,
            title: data.title,
            message: data.message,
            read: data.read,
            createdAt,
            orderId: data.orderId,
            orderNumber: data.orderNumber,
            amount: data.amount,
            currency: data.currency,
          })

          // Clear after 5 seconds
          setTimeout(() => setNewOrder(null), 5000)
        }
      }
    })

    return () => unsubscribe()
  }, [organization?.id])

  const dismiss = useCallback(() => {
    setNewOrder(null)
  }, [])

  return { newOrder, dismiss }
}
