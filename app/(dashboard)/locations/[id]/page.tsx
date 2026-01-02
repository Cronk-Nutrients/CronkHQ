'use client'

import { useState, useEffect, use } from 'react'
import { db } from '@/lib/firebase'
import {
  doc, onSnapshot, collection, query, where, orderBy, limit,
  updateDoc, serverTimestamp, addDoc, deleteDoc, getDocs
} from 'firebase/firestore'
import { useOrganization } from '@/context/OrganizationContext'
import { useToast } from '@/components/ui/Toast'
import { Button } from '@/components/ui/Button'
import { LocationExtended, LocationType, Sublocation } from '@/types'
import Link from 'next/link'
import AddLocationModal from '@/components/modals/AddLocationModal'

const LOCATION_TYPE_CONFIG: Record<LocationType, { label: string; icon: string; color: string }> = {
  warehouse: { label: 'Warehouse', icon: 'fa-warehouse', color: 'bg-blue-500/20 text-blue-400' },
  fba: { label: 'Amazon FBA', icon: 'fa-amazon', color: 'bg-orange-500/20 text-orange-400' },
  retail: { label: 'Retail Store', icon: 'fa-store', color: 'bg-purple-500/20 text-purple-400' },
  '3pl': { label: '3PL', icon: 'fa-truck-loading', color: 'bg-cyan-500/20 text-cyan-400' },
  dropship: { label: 'Dropship', icon: 'fa-shipping-fast', color: 'bg-pink-500/20 text-pink-400' },
  other: { label: 'Other', icon: 'fa-box', color: 'bg-slate-500/20 text-slate-400' },
}

type TabType = 'overview' | 'inventory' | 'sublocations' | 'activity'

interface InventoryAtLocation {
  productId: string
  productName: string
  sku: string
  quantity: number
  sublocationId?: string
  sublocationName?: string
}

interface LocationActivity {
  id: string
  type: 'receive' | 'transfer_in' | 'transfer_out' | 'adjustment' | 'pick'
  description: string
  quantity: number
  productName?: string
  timestamp: Date
  userId: string
  userName?: string
}

export default function LocationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const { organization } = useOrganization()
  const { success, error } = useToast()

  const [location, setLocation] = useState<LocationExtended | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [showEditModal, setShowEditModal] = useState(false)

  // Sublocations state
  const [sublocations, setSublocations] = useState<Sublocation[]>([])
  const [showSublocationModal, setShowSublocationModal] = useState(false)
  const [editingSublocation, setEditingSublocation] = useState<Sublocation | null>(null)
  const [sublocationName, setSublocationName] = useState('')
  const [sublocationCode, setSublocationCode] = useState('')
  const [sublocationZone, setSublocationZone] = useState('')
  const [sublocationAisle, setSublocationAisle] = useState('')
  const [sublocationRack, setSublocationRack] = useState('')
  const [sublocationShelf, setSublocationShelf] = useState('')
  const [sublocationBin, setSublocationBin] = useState('')
  const [savingSublocation, setSavingSublocation] = useState(false)

  // Inventory state (placeholder for now)
  const [inventory, setInventory] = useState<InventoryAtLocation[]>([])
  const [activity, setActivity] = useState<LocationActivity[]>([])

  // Load location
  useEffect(() => {
    if (!organization?.id || !resolvedParams.id) return

    const locationRef = doc(db, 'organizations', organization.id, 'locations', resolvedParams.id)

    const unsubscribe = onSnapshot(locationRef, (snapshot) => {
      if (snapshot.exists()) {
        setLocation({
          id: snapshot.id,
          ...snapshot.data()
        } as LocationExtended)
      } else {
        setLocation(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [organization?.id, resolvedParams.id])

  // Load sublocations
  useEffect(() => {
    if (!organization?.id || !resolvedParams.id) return

    const sublocationsRef = collection(
      db, 'organizations', organization.id, 'locations', resolvedParams.id, 'sublocations'
    )
    const q = query(sublocationsRef, orderBy('code'))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const subs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Sublocation[]
      setSublocations(subs)
    })

    return () => unsubscribe()
  }, [organization?.id, resolvedParams.id])

  // Generate sublocation code
  const generateSublocationCode = (): string => {
    const parts = []
    if (sublocationZone) parts.push(sublocationZone.toUpperCase())
    if (sublocationAisle) parts.push(sublocationAisle.toUpperCase())
    if (sublocationRack) parts.push(sublocationRack.toUpperCase())
    if (sublocationShelf) parts.push(sublocationShelf.toUpperCase())
    if (sublocationBin) parts.push(sublocationBin.toUpperCase())
    return parts.join('-') || sublocationName.toUpperCase().replace(/\s+/g, '-').substring(0, 20)
  }

  // Update code when parts change
  useEffect(() => {
    if (!editingSublocation) {
      const newCode = generateSublocationCode()
      if (newCode) setSublocationCode(newCode)
    }
  }, [sublocationZone, sublocationAisle, sublocationRack, sublocationShelf, sublocationBin, editingSublocation])

  // Open sublocation modal
  const handleAddSublocation = () => {
    setEditingSublocation(null)
    setSublocationName('')
    setSublocationCode('')
    setSublocationZone('')
    setSublocationAisle('')
    setSublocationRack('')
    setSublocationShelf('')
    setSublocationBin('')
    setShowSublocationModal(true)
  }

  // Edit sublocation
  const handleEditSublocation = (sub: Sublocation) => {
    setEditingSublocation(sub)
    setSublocationName(sub.name)
    setSublocationCode(sub.code)
    setSublocationZone(sub.zone || '')
    setSublocationAisle(sub.aisle || '')
    setSublocationRack(sub.rack || '')
    setSublocationShelf(sub.shelf || '')
    setSublocationBin(sub.bin || '')
    setShowSublocationModal(true)
  }

  // Save sublocation
  const handleSaveSublocation = async () => {
    if (!organization?.id || !resolvedParams.id || !sublocationName.trim() || !sublocationCode.trim()) return

    setSavingSublocation(true)
    try {
      const sublocationsRef = collection(
        db, 'organizations', organization.id, 'locations', resolvedParams.id, 'sublocations'
      )

      const data = {
        name: sublocationName.trim(),
        code: sublocationCode.trim().toUpperCase(),
        zone: sublocationZone.trim() || null,
        aisle: sublocationAisle.trim() || null,
        rack: sublocationRack.trim() || null,
        shelf: sublocationShelf.trim() || null,
        bin: sublocationBin.trim() || null,
        isActive: true,
        updatedAt: serverTimestamp(),
      }

      if (editingSublocation) {
        await updateDoc(doc(sublocationsRef, editingSublocation.id), data)
        success('Sublocation updated')
      } else {
        await addDoc(sublocationsRef, {
          ...data,
          locationId: resolvedParams.id,
          productCount: 0,
          totalUnits: 0,
          createdAt: serverTimestamp(),
        })
        success('Sublocation created')
      }

      setShowSublocationModal(false)
    } catch (err) {
      console.error('Error saving sublocation:', err)
      error('Failed to save sublocation')
    } finally {
      setSavingSublocation(false)
    }
  }

  // Delete sublocation
  const handleDeleteSublocation = async (sub: Sublocation) => {
    if (!organization?.id || !resolvedParams.id) return

    if (sub.totalUnits > 0) {
      error(`Cannot delete sublocation with ${sub.totalUnits} units. Move inventory first.`)
      return
    }

    if (!confirm(`Delete "${sub.name}"?`)) return

    try {
      await deleteDoc(doc(
        db, 'organizations', organization.id, 'locations', resolvedParams.id, 'sublocations', sub.id
      ))
      success('Sublocation deleted')
    } catch (err) {
      console.error('Error deleting sublocation:', err)
      error('Failed to delete sublocation')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!location) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-warehouse text-2xl text-slate-500"></i>
        </div>
        <h3 className="text-lg font-medium text-white mb-2">Location not found</h3>
        <p className="text-slate-400 mb-6">This location may have been deleted</p>
        <Link href="/locations">
          <Button variant="secondary">
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Locations
          </Button>
        </Link>
      </div>
    )
  }

  const typeConfig = LOCATION_TYPE_CONFIG[location.type]

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: 'fa-info-circle' },
    { id: 'inventory', label: 'Inventory', icon: 'fa-boxes' },
    ...(location.trackSublocations ? [{ id: 'sublocations' as TabType, label: 'Sublocations', icon: 'fa-th-large' }] : []),
    { id: 'activity', label: 'Activity', icon: 'fa-history' },
  ]

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/locations" className="hover:text-white transition-colors">
          Locations
        </Link>
        <i className="fas fa-chevron-right text-xs"></i>
        <span className="text-white">{location.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${typeConfig.color}`}>
            <i className={`${location.type === 'fba' ? 'fab' : 'fas'} ${typeConfig.icon} text-2xl`}></i>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white">{location.name}</h1>
              {location.isDefault && (
                <span className="px-2 py-1 text-xs bg-emerald-500/20 text-emerald-400 rounded-full">
                  Default
                </span>
              )}
              {!location.isActive && (
                <span className="px-2 py-1 text-xs bg-slate-600/50 text-slate-400 rounded-full">
                  Inactive
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-slate-400">{location.code}</span>
              <span className={`px-2 py-0.5 text-xs rounded-full ${typeConfig.color}`}>
                {typeConfig.label}
              </span>
            </div>
          </div>
        </div>
        <Button variant="secondary" onClick={() => setShowEditModal(true)}>
          <i className="fas fa-pencil mr-2"></i>
          Edit
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Products</div>
          <div className="text-2xl font-bold text-white">{location.totalProducts || 0}</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Total Units</div>
          <div className="text-2xl font-bold text-white">{(location.totalUnits || 0).toLocaleString()}</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Sublocations</div>
          <div className="text-2xl font-bold text-white">
            {location.trackSublocations ? sublocations.length : 'N/A'}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-700 mb-6">
        <nav className="flex gap-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'text-emerald-400 border-emerald-400'
                  : 'text-slate-400 border-transparent hover:text-white'
              }`}
            >
              <i className={`fas ${tab.icon}`}></i>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Address */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <i className="fas fa-map-marker-alt text-slate-400"></i>
              Address
            </h3>
            {location.address ? (
              <div className="text-slate-300 space-y-1">
                {location.address.street1 && <div>{location.address.street1}</div>}
                {location.address.street2 && <div>{location.address.street2}</div>}
                <div>
                  {[location.address.city, location.address.state, location.address.postalCode]
                    .filter(Boolean)
                    .join(', ')}
                </div>
                {location.address.country && <div>{location.address.country}</div>}
              </div>
            ) : (
              <p className="text-slate-500">No address set</p>
            )}
          </div>

          {/* Contact */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <i className="fas fa-user text-slate-400"></i>
              Contact
            </h3>
            {location.contact ? (
              <div className="space-y-2">
                {location.contact.name && (
                  <div className="text-slate-300">{location.contact.name}</div>
                )}
                {location.contact.email && (
                  <div className="flex items-center gap-2 text-slate-400">
                    <i className="fas fa-envelope text-xs"></i>
                    <a href={`mailto:${location.contact.email}`} className="hover:text-emerald-400">
                      {location.contact.email}
                    </a>
                  </div>
                )}
                {location.contact.phone && (
                  <div className="flex items-center gap-2 text-slate-400">
                    <i className="fas fa-phone text-xs"></i>
                    <a href={`tel:${location.contact.phone}`} className="hover:text-emerald-400">
                      {location.contact.phone}
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-slate-500">No contact set</p>
            )}
          </div>

          {/* FBA Details */}
          {location.type === 'fba' && location.fbaDetails && (
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <i className="fab fa-amazon text-orange-400"></i>
                FBA Details
              </h3>
              <div className="space-y-2">
                {location.fbaDetails.marketplaceId && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Marketplace ID</span>
                    <span className="text-white font-mono">{location.fbaDetails.marketplaceId}</span>
                  </div>
                )}
                {location.fbaDetails.fulfillmentCenterId && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Fulfillment Center</span>
                    <span className="text-white font-mono">{location.fbaDetails.fulfillmentCenterId}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          {location.notes && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <i className="fas fa-sticky-note text-slate-400"></i>
                Notes
              </h3>
              <p className="text-slate-300 whitespace-pre-wrap">{location.notes}</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'inventory' && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl">
          <div className="p-6 border-b border-slate-700">
            <h3 className="text-lg font-semibold text-white">Inventory at this Location</h3>
            <p className="text-sm text-slate-400 mt-1">Products and quantities stored here</p>
          </div>
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-boxes text-2xl text-slate-500"></i>
            </div>
            <h4 className="text-lg font-medium text-white mb-2">
              {location.totalUnits > 0 ? 'Inventory tracking coming soon' : 'No inventory'}
            </h4>
            <p className="text-slate-400">
              {location.totalUnits > 0
                ? `${location.totalUnits.toLocaleString()} units across ${location.totalProducts} products`
                : 'Add inventory via transfers or receiving'
              }
            </p>
          </div>
        </div>
      )}

      {activeTab === 'sublocations' && location.trackSublocations && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl">
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <div>
              <span className="text-slate-400">{sublocations.length} sublocations</span>
            </div>
            <Button size="sm" onClick={handleAddSublocation}>
              <i className="fas fa-plus mr-2"></i>
              Add Sublocation
            </Button>
          </div>

          {sublocations.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-th-large text-2xl text-slate-500"></i>
              </div>
              <h4 className="text-lg font-medium text-white mb-2">No sublocations yet</h4>
              <p className="text-slate-400 mb-6">Create bins, aisles, racks, and shelves to organize inventory</p>
              <Button variant="secondary" onClick={handleAddSublocation}>
                <i className="fas fa-plus mr-2"></i>
                Create First Sublocation
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-slate-700">
              {sublocations.map(sub => (
                <div
                  key={sub.id}
                  className="flex items-center justify-between p-4 hover:bg-slate-800/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center">
                      <i className="fas fa-th-large text-slate-400"></i>
                    </div>
                    <div>
                      <div className="text-white font-medium">{sub.name}</div>
                      <div className="text-sm text-slate-400 font-mono">{sub.code}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-slate-300">{sub.totalUnits || 0} units</div>
                      <div className="text-xs text-slate-500">{sub.totalProducts || 0} products</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEditSublocation(sub)}
                        className="p-2 text-slate-400 hover:text-white transition-colors"
                      >
                        <i className="fas fa-pencil"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteSublocation(sub)}
                        className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl">
          <div className="p-6 border-b border-slate-700">
            <h3 className="text-lg font-semibold text-white">Activity Log</h3>
            <p className="text-sm text-slate-400 mt-1">Recent inventory movements and changes</p>
          </div>
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-history text-2xl text-slate-500"></i>
            </div>
            <h4 className="text-lg font-medium text-white mb-2">No activity yet</h4>
            <p className="text-slate-400">Activity will appear here as inventory moves in and out</p>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <AddLocationModal
          location={location}
          onClose={() => setShowEditModal(false)}
          onSave={() => setShowEditModal(false)}
        />
      )}

      {/* Sublocation Modal */}
      {showSublocationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h3 className="text-lg font-semibold text-white">
                {editingSublocation ? 'Edit Sublocation' : 'Add Sublocation'}
              </h3>
              <button onClick={() => setShowSublocationModal(false)} className="text-slate-400 hover:text-white">
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Name *</label>
                <input
                  type="text"
                  value={sublocationName}
                  onChange={(e) => setSublocationName(e.target.value)}
                  placeholder="e.g., Aisle A - Shelf 1"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Code *</label>
                <input
                  type="text"
                  value={sublocationCode}
                  onChange={(e) => setSublocationCode(e.target.value.toUpperCase())}
                  placeholder="e.g., A-1-01"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Zone</label>
                  <input
                    type="text"
                    value={sublocationZone}
                    onChange={(e) => setSublocationZone(e.target.value)}
                    placeholder="A"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Aisle</label>
                  <input
                    type="text"
                    value={sublocationAisle}
                    onChange={(e) => setSublocationAisle(e.target.value)}
                    placeholder="01"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Rack</label>
                  <input
                    type="text"
                    value={sublocationRack}
                    onChange={(e) => setSublocationRack(e.target.value)}
                    placeholder="R1"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Shelf</label>
                  <input
                    type="text"
                    value={sublocationShelf}
                    onChange={(e) => setSublocationShelf(e.target.value)}
                    placeholder="S1"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Bin</label>
                <input
                  type="text"
                  value={sublocationBin}
                  onChange={(e) => setSublocationBin(e.target.value)}
                  placeholder="B01"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-slate-700">
              <Button variant="secondary" onClick={() => setShowSublocationModal(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSaveSublocation}
                disabled={savingSublocation || !sublocationName.trim() || !sublocationCode.trim()}
              >
                {savingSublocation ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check mr-2"></i>
                    {editingSublocation ? 'Update' : 'Create'}
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
