'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import {
  collection, query, orderBy, onSnapshot, doc,
  addDoc, updateDoc, deleteDoc, serverTimestamp, writeBatch
} from 'firebase/firestore'
import { useOrganization } from '@/context/OrganizationContext'
import { useToast } from '@/components/ui/Toast'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface SalesChannel {
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
  }
  isActive: boolean
  isDefault: boolean
  sortOrder: number
}

const CHANNEL_TYPES = [
  { value: 'ecommerce', label: 'E-Commerce', icon: 'fa-shopping-cart' },
  { value: 'marketplace', label: 'Marketplace', icon: 'fa-store' },
  { value: 'wholesale', label: 'Wholesale', icon: 'fa-building' },
  { value: 'retail', label: 'Retail', icon: 'fa-cash-register' },
  { value: 'manual', label: 'Manual', icon: 'fa-edit' },
]

const CHANNEL_COLORS = [
  { name: 'Slate', value: '#64748b' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Lime', value: '#84cc16' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Violet', value: '#8b5cf6' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Shopify', value: '#96bf48' },
  { name: 'Amazon', value: '#ff9900' },
]

const CHANNEL_ICONS = [
  'fab fa-shopify',
  'fab fa-amazon',
  'fab fa-ebay',
  'fab fa-etsy',
  'fas fa-store',
  'fas fa-building',
  'fas fa-shopping-cart',
  'fas fa-cash-register',
  'fas fa-phone',
  'fas fa-envelope',
  'fas fa-globe',
  'fas fa-truck',
  'fas fa-edit',
  'fas fa-warehouse',
]

const DEFAULT_CHANNELS = [
  {
    name: 'Shopify',
    code: 'shopify',
    type: 'ecommerce' as const,
    color: '#96bf48',
    icon: 'fab fa-shopify',
    integration: { platform: 'shopify', isConnected: false, lastSyncAt: null, settings: {} },
    fulfillment: { defaultLocation: null, priority: 1, autoProcess: true, packingSlipTemplate: null, requiresApproval: false },
    stats: { totalOrders: 0, pendingOrders: 0, totalRevenue: 0, averageOrderValue: 0, lastOrderAt: null },
    isActive: true,
    isDefault: false,
    sortOrder: 1,
  },
  {
    name: 'Amazon FBA',
    code: 'amazon_fba',
    type: 'marketplace' as const,
    color: '#ff9900',
    icon: 'fab fa-amazon',
    integration: { platform: 'amazon', isConnected: false, lastSyncAt: null, settings: {} },
    fulfillment: { defaultLocation: null, priority: 2, autoProcess: false, packingSlipTemplate: null, requiresApproval: false },
    stats: { totalOrders: 0, pendingOrders: 0, totalRevenue: 0, averageOrderValue: 0, lastOrderAt: null },
    isActive: true,
    isDefault: false,
    sortOrder: 2,
  },
  {
    name: 'Amazon FBM',
    code: 'amazon_fbm',
    type: 'marketplace' as const,
    color: '#ff9900',
    icon: 'fab fa-amazon',
    integration: { platform: 'amazon', isConnected: false, lastSyncAt: null, settings: {} },
    fulfillment: { defaultLocation: null, priority: 3, autoProcess: false, packingSlipTemplate: null, requiresApproval: false },
    stats: { totalOrders: 0, pendingOrders: 0, totalRevenue: 0, averageOrderValue: 0, lastOrderAt: null },
    isActive: true,
    isDefault: false,
    sortOrder: 3,
  },
  {
    name: 'Wholesale',
    code: 'wholesale',
    type: 'wholesale' as const,
    color: '#6366f1',
    icon: 'fas fa-building',
    integration: { platform: 'manual', isConnected: true, lastSyncAt: null, settings: {} },
    fulfillment: { defaultLocation: null, priority: 4, autoProcess: false, packingSlipTemplate: null, requiresApproval: true },
    stats: { totalOrders: 0, pendingOrders: 0, totalRevenue: 0, averageOrderValue: 0, lastOrderAt: null },
    isActive: true,
    isDefault: false,
    sortOrder: 4,
  },
  {
    name: 'Phone Order',
    code: 'phone',
    type: 'manual' as const,
    color: '#8b5cf6',
    icon: 'fas fa-phone',
    integration: { platform: 'manual', isConnected: true, lastSyncAt: null, settings: {} },
    fulfillment: { defaultLocation: null, priority: 5, autoProcess: false, packingSlipTemplate: null, requiresApproval: false },
    stats: { totalOrders: 0, pendingOrders: 0, totalRevenue: 0, averageOrderValue: 0, lastOrderAt: null },
    isActive: true,
    isDefault: false,
    sortOrder: 5,
  },
  {
    name: 'Manual',
    code: 'manual',
    type: 'manual' as const,
    color: '#64748b',
    icon: 'fas fa-edit',
    integration: { platform: 'manual', isConnected: true, lastSyncAt: null, settings: {} },
    fulfillment: { defaultLocation: null, priority: 10, autoProcess: false, packingSlipTemplate: null, requiresApproval: false },
    stats: { totalOrders: 0, pendingOrders: 0, totalRevenue: 0, averageOrderValue: 0, lastOrderAt: null },
    isActive: true,
    isDefault: true,
    sortOrder: 99,
  },
]

export default function SalesChannelsPage() {
  const { organization } = useOrganization()
  const { success, error } = useToast()

  const [channels, setChannels] = useState<SalesChannel[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingChannel, setEditingChannel] = useState<SalesChannel | null>(null)
  const [saving, setSaving] = useState(false)

  // Form state
  const [formData, setFormData] = useState<{
    name: string
    code: string
    type: 'ecommerce' | 'marketplace' | 'wholesale' | 'retail' | 'manual'
    color: string
    icon: string
    isActive: boolean
    priority: number
    autoProcess: boolean
  }>({
    name: '',
    code: '',
    type: 'ecommerce',
    color: '#64748b',
    icon: 'fas fa-shopping-cart',
    isActive: true,
    priority: 5,
    autoProcess: false,
  })

  // Load channels
  useEffect(() => {
    if (!organization?.id) return

    const channelsRef = collection(db, 'organizations', organization.id, 'salesChannels')
    const q = query(channelsRef, orderBy('sortOrder', 'asc'))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const channelData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as SalesChannel[]

      setChannels(channelData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [organization?.id])

  // Seed default channels if none exist
  useEffect(() => {
    if (!organization?.id || loading || channels.length > 0) return

    const seedDefaultChannels = async () => {
      const batch = writeBatch(db)
      const channelsRef = collection(db, 'organizations', organization.id, 'salesChannels')

      DEFAULT_CHANNELS.forEach(channel => {
        const docRef = doc(channelsRef)
        batch.set(docRef, {
          ...channel,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
      })

      await batch.commit()
    }

    seedDefaultChannels()
  }, [organization?.id, loading, channels.length])

  // Auto-generate code from name
  const generateCode = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')
  }

  // Open add modal
  const handleAdd = () => {
    setEditingChannel(null)
    setFormData({
      name: '',
      code: '',
      type: 'ecommerce',
      color: '#64748b',
      icon: 'fas fa-shopping-cart',
      isActive: true,
      priority: 5,
      autoProcess: false,
    })
    setShowModal(true)
  }

  // Open edit modal
  const handleEdit = (channel: SalesChannel) => {
    setEditingChannel(channel)
    setFormData({
      name: channel.name,
      code: channel.code,
      type: channel.type,
      color: channel.color,
      icon: channel.icon,
      isActive: channel.isActive,
      priority: channel.fulfillment?.priority || 5,
      autoProcess: channel.fulfillment?.autoProcess || false,
    })
    setShowModal(true)
  }

  // Save channel
  const handleSave = async () => {
    if (!organization?.id) return
    if (!formData.name.trim()) {
      error('Please enter a channel name')
      return
    }

    setSaving(true)
    try {
      const channelsRef = collection(db, 'organizations', organization.id, 'salesChannels')
      const code = formData.code || generateCode(formData.name)

      const channelData = {
        name: formData.name.trim(),
        code,
        type: formData.type,
        color: formData.color,
        icon: formData.icon,
        integration: {
          platform: formData.type === 'manual' ? 'manual' : null,
          isConnected: formData.type === 'manual',
          lastSyncAt: null,
          settings: {},
        },
        fulfillment: {
          defaultLocation: null,
          priority: formData.priority,
          autoProcess: formData.autoProcess,
          packingSlipTemplate: null,
          requiresApproval: formData.type === 'wholesale',
        },
        isActive: formData.isActive,
        updatedAt: serverTimestamp(),
      }

      if (editingChannel) {
        // Update existing
        await updateDoc(doc(channelsRef, editingChannel.id), channelData)
        success('Channel updated')
      } else {
        // Create new
        await addDoc(channelsRef, {
          ...channelData,
          stats: { totalOrders: 0, pendingOrders: 0, totalRevenue: 0, averageOrderValue: 0, lastOrderAt: null },
          isDefault: false,
          sortOrder: channels.length + 1,
          createdAt: serverTimestamp(),
        })
        success('Channel created')
      }

      setShowModal(false)
    } catch (err) {
      console.error('Error saving channel:', err)
      error('Failed to save channel')
    } finally {
      setSaving(false)
    }
  }

  // Delete channel
  const handleDelete = async (channel: SalesChannel) => {
    if (!organization?.id) return
    if (channel.isDefault) {
      error('Cannot delete the default channel')
      return
    }
    if (channel.stats?.totalOrders > 0) {
      error('Cannot delete channel with existing orders')
      return
    }
    if (!confirm(`Delete "${channel.name}" channel?`)) return

    try {
      await deleteDoc(doc(db, 'organizations', organization.id, 'salesChannels', channel.id))
      success('Channel deleted')
    } catch (err) {
      console.error('Error deleting channel:', err)
      error('Failed to delete channel')
    }
  }

  // Set as default
  const handleSetDefault = async (channel: SalesChannel) => {
    if (!organization?.id || channel.isDefault) return

    try {
      const batch = writeBatch(db)
      const channelsRef = collection(db, 'organizations', organization.id, 'salesChannels')

      // Remove default from current default
      const currentDefault = channels.find(c => c.isDefault)
      if (currentDefault) {
        batch.update(doc(channelsRef, currentDefault.id), { isDefault: false })
      }

      // Set new default
      batch.update(doc(channelsRef, channel.id), { isDefault: true })

      await batch.commit()
      success(`${channel.name} is now the default channel`)
    } catch (err) {
      console.error('Error setting default:', err)
      error('Failed to set default channel')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-5xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/settings" className="hover:text-white transition-colors">
          Settings
        </Link>
        <i className="fas fa-chevron-right text-xs"></i>
        <span className="text-white">Sales Channels</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Sales Channels</h1>
          <p className="text-slate-400 mt-1">Manage where your orders come from</p>
        </div>
        <Button onClick={handleAdd}>
          <i className="fas fa-plus mr-2"></i>
          Add Channel
        </Button>
      </div>

      {/* Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {channels.map(channel => (
          <div
            key={channel.id}
            className={`bg-slate-800/50 border rounded-xl p-5 transition-all ${
              channel.isActive ? 'border-slate-700' : 'border-slate-800 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${channel.color}20` }}
                >
                  <i className={`${channel.icon} text-xl`} style={{ color: channel.color }}></i>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-semibold">{channel.name}</h3>
                    {channel.isDefault && (
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500 font-mono">{channel.code}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-400 capitalize">{channel.type}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleEdit(channel)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/50"
                >
                  <i className="fas fa-pencil"></i>
                </button>
                <button
                  onClick={() => handleDelete(channel)}
                  className={`p-2 rounded-lg hover:bg-slate-700/50 ${
                    channel.isDefault || channel.stats?.totalOrders > 0
                      ? 'text-slate-600 cursor-not-allowed'
                      : 'text-slate-400 hover:text-red-400'
                  }`}
                  disabled={channel.isDefault || channel.stats?.totalOrders > 0}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-white">{channel.stats?.totalOrders || 0}</div>
                <div className="text-xs text-slate-500">Total Orders</div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-amber-400">{channel.stats?.pendingOrders || 0}</div>
                <div className="text-xs text-slate-500">Pending</div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-emerald-400">
                  ${((channel.stats?.totalRevenue || 0) / 1000).toFixed(1)}k
                </div>
                <div className="text-xs text-slate-500">Revenue</div>
              </div>
            </div>

            {/* Connection Status & Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-700">
              <div className="flex items-center gap-2">
                {channel.integration?.isConnected ? (
                  <span className="flex items-center gap-1.5 text-sm text-emerald-400">
                    <i className="fas fa-check-circle"></i>
                    Connected
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-sm text-slate-500">
                    <i className="fas fa-unlink"></i>
                    Not Connected
                  </span>
                )}
              </div>

              {!channel.isDefault && (
                <button
                  onClick={() => handleSetDefault(channel)}
                  className="text-sm text-slate-400 hover:text-emerald-400"
                >
                  Set as Default
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {channels.length === 0 && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-12 text-center">
          <i className="fas fa-store text-4xl text-slate-600 mb-4"></i>
          <h3 className="text-lg font-semibold text-white mb-2">No Sales Channels</h3>
          <p className="text-slate-400 mb-4">Add channels to organize your orders by source</p>
          <Button onClick={handleAdd}>
            <i className="fas fa-plus mr-2"></i>
            Add First Channel
          </Button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-700 sticky top-0 bg-slate-900">
              <h3 className="text-lg font-semibold text-white">
                {editingChannel ? 'Edit Channel' : 'Add Sales Channel'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">Channel Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      name: e.target.value,
                      code: editingChannel ? formData.code : generateCode(e.target.value)
                    })
                  }}
                  placeholder="e.g., Amazon FBA, Wholesale"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Code */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">Channel Code</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: generateCode(e.target.value) })}
                  placeholder="auto-generated"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">Channel Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {CHANNEL_TYPES.map(type => (
                    <button
                      key={type.value}
                      onClick={() => setFormData({ ...formData, type: type.value as any })}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        formData.type === type.value
                          ? 'border-emerald-500 bg-emerald-500/10'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <i className={`fas ${type.icon} text-lg mb-1 ${
                        formData.type === type.value ? 'text-emerald-400' : 'text-slate-400'
                      }`}></i>
                      <div className="text-xs text-slate-300">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">Color</label>
                <div className="flex flex-wrap gap-2">
                  {CHANNEL_COLORS.map(color => (
                    <button
                      key={color.value}
                      onClick={() => setFormData({ ...formData, color: color.value })}
                      className={`w-8 h-8 rounded-lg transition-all ${
                        formData.color === color.value ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : ''
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Icon */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">Icon</label>
                <div className="flex flex-wrap gap-2">
                  {CHANNEL_ICONS.map(icon => (
                    <button
                      key={icon}
                      onClick={() => setFormData({ ...formData, icon })}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                        formData.icon === icon
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <i className={icon}></i>
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Fulfillment Priority (1 = highest)
                </label>
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 5 })}
                  className="w-24 bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Auto Process */}
              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div>
                  <div className="text-white font-medium">Auto-Process Orders</div>
                  <div className="text-sm text-slate-400">Automatically start fulfillment</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.autoProcess}
                    onChange={(e) => setFormData({ ...formData, autoProcess: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-checked:bg-emerald-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-slate-700 sticky bottom-0 bg-slate-900">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save mr-2"></i>
                    {editingChannel ? 'Update' : 'Create'} Channel
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
