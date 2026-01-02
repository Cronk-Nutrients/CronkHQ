'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import {
  collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc,
  serverTimestamp, writeBatch
} from 'firebase/firestore'
import { useOrganization } from '@/context/OrganizationContext'
import { useToast } from '@/components/ui/Toast'
import { Button } from '@/components/ui/Button'
import { LocationExtended, LocationType } from '@/types'
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

export default function LocationsPage() {
  const { organization } = useOrganization()
  const { success, error } = useToast()

  const [locations, setLocations] = useState<LocationExtended[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<LocationType | 'all'>('all')
  const [showModal, setShowModal] = useState(false)
  const [editingLocation, setEditingLocation] = useState<LocationExtended | null>(null)

  // Load locations
  useEffect(() => {
    if (!organization?.id) return

    const locationsRef = collection(db, 'organizations', organization.id, 'locations')
    const q = query(locationsRef, orderBy('name'))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const locs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as LocationExtended[]
      setLocations(locs)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [organization?.id])

  // Filtered locations
  const filteredLocations = locations.filter(loc => {
    const matchesSearch = !search ||
      loc.name.toLowerCase().includes(search.toLowerCase()) ||
      loc.code.toLowerCase().includes(search.toLowerCase())
    const matchesType = typeFilter === 'all' || loc.type === typeFilter
    return matchesSearch && matchesType
  })

  // Stats
  const stats = {
    total: locations.length,
    active: locations.filter(l => l.isActive).length,
    totalUnits: locations.reduce((sum, l) => sum + (l.totalUnits || 0), 0),
    fbaCount: locations.filter(l => l.type === 'fba').length,
  }

  // Set default location
  const handleSetDefault = async (location: LocationExtended) => {
    if (!organization?.id) return

    try {
      const batch = writeBatch(db)

      // Remove default from all locations
      locations.forEach(loc => {
        if (loc.isDefault) {
          batch.update(doc(db, 'organizations', organization.id, 'locations', loc.id), {
            isDefault: false,
            updatedAt: serverTimestamp()
          })
        }
      })

      // Set new default
      batch.update(doc(db, 'organizations', organization.id, 'locations', location.id), {
        isDefault: true,
        updatedAt: serverTimestamp()
      })

      await batch.commit()
      success(`${location.name} is now the default location`)
    } catch (err) {
      console.error('Error setting default:', err)
      error('Failed to set default location')
    }
  }

  // Toggle active status
  const handleToggleActive = async (location: LocationExtended) => {
    if (!organization?.id) return

    try {
      await updateDoc(doc(db, 'organizations', organization.id, 'locations', location.id), {
        isActive: !location.isActive,
        updatedAt: serverTimestamp()
      })
      success(location.isActive ? 'Location deactivated' : 'Location activated')
    } catch (err) {
      console.error('Error toggling active:', err)
      error('Failed to update location')
    }
  }

  // Delete location
  const handleDelete = async (location: LocationExtended) => {
    if (!organization?.id) return

    if (location.totalUnits > 0) {
      error(`Cannot delete location with ${location.totalUnits} units. Transfer inventory first.`)
      return
    }

    if (location.isDefault) {
      error('Cannot delete the default location. Set another location as default first.')
      return
    }

    if (!confirm(`Delete "${location.name}"? This action cannot be undone.`)) return

    try {
      await deleteDoc(doc(db, 'organizations', organization.id, 'locations', location.id))
      success('Location deleted')
    } catch (err) {
      console.error('Error deleting location:', err)
      error('Failed to delete location')
    }
  }

  // Edit location
  const handleEdit = (location: LocationExtended) => {
    setEditingLocation(location)
    setShowModal(true)
  }

  // Add location
  const handleAdd = () => {
    setEditingLocation(null)
    setShowModal(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Locations</h1>
          <p className="text-slate-400 mt-1">Manage your warehouses and storage locations</p>
        </div>
        <Button onClick={handleAdd}>
          <i className="fas fa-plus mr-2"></i>
          Add Location
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-warehouse text-blue-400"></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <div className="text-sm text-slate-400">Total Locations</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-check-circle text-emerald-400"></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.active}</div>
              <div className="text-sm text-slate-400">Active</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-cubes text-purple-400"></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.totalUnits.toLocaleString()}</div>
              <div className="text-sm text-slate-400">Total Units</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <i className="fab fa-amazon text-orange-400"></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.fbaCount}</div>
              <div className="text-sm text-slate-400">FBA Locations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="text"
                placeholder="Search locations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as LocationType | 'all')}
            className="bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Types</option>
            {Object.entries(LOCATION_TYPE_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Locations Grid */}
      {filteredLocations.length === 0 ? (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-12 text-center">
          <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-warehouse text-2xl text-slate-500"></i>
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            {locations.length === 0 ? 'No locations yet' : 'No matching locations'}
          </h3>
          <p className="text-slate-400 mb-6">
            {locations.length === 0
              ? 'Add your first warehouse or storage location'
              : 'Try adjusting your search or filters'
            }
          </p>
          {locations.length === 0 && (
            <Button variant="secondary" onClick={handleAdd}>
              <i className="fas fa-plus mr-2"></i>
              Add Your First Location
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredLocations.map(location => {
            const typeConfig = LOCATION_TYPE_CONFIG[location.type]
            return (
              <div
                key={location.id}
                className={`bg-slate-800/50 border rounded-xl overflow-hidden transition-all hover:border-slate-600 ${
                  location.isDefault ? 'border-emerald-500/50' : 'border-slate-700'
                } ${!location.isActive ? 'opacity-60' : ''}`}
              >
                {/* Card Header */}
                <div className="p-4 border-b border-slate-700/50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${typeConfig.color}`}>
                        <i className={`${location.type === 'fba' ? 'fab' : 'fas'} ${typeConfig.icon}`}></i>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/locations/${location.id}`}
                            className="text-white font-semibold hover:text-emerald-400 transition-colors"
                          >
                            {location.name}
                          </Link>
                          {location.isDefault && (
                            <span className="px-2 py-0.5 text-xs bg-emerald-500/20 text-emerald-400 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-slate-400">{location.code}</div>
                      </div>
                    </div>
                    <div className="relative group">
                      <button className="p-2 text-slate-400 hover:text-white transition-colors">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                      <div className="absolute right-0 top-full mt-1 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                        <Link
                          href={`/locations/${location.id}`}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50"
                        >
                          <i className="fas fa-eye w-4"></i>
                          View Details
                        </Link>
                        <button
                          onClick={() => handleEdit(location)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50"
                        >
                          <i className="fas fa-pencil w-4"></i>
                          Edit
                        </button>
                        {!location.isDefault && (
                          <button
                            onClick={() => handleSetDefault(location)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50"
                          >
                            <i className="fas fa-star w-4"></i>
                            Set as Default
                          </button>
                        )}
                        <button
                          onClick={() => handleToggleActive(location)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50"
                        >
                          <i className={`fas ${location.isActive ? 'fa-ban' : 'fa-check'} w-4`}></i>
                          {location.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleDelete(location)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-slate-700/50"
                        >
                          <i className="fas fa-trash w-4"></i>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3">
                  {/* Type Badge */}
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${typeConfig.color}`}>
                      {typeConfig.label}
                    </span>
                    {!location.isActive && (
                      <span className="px-2 py-1 text-xs bg-slate-600/50 text-slate-400 rounded-full">
                        Inactive
                      </span>
                    )}
                    {location.trackSublocations && (
                      <span className="px-2 py-1 text-xs bg-slate-600/50 text-slate-400 rounded-full">
                        <i className="fas fa-th-large mr-1"></i>
                        Sublocations
                      </span>
                    )}
                  </div>

                  {/* Address */}
                  {location.address && (
                    <div className="text-sm text-slate-400">
                      <i className="fas fa-map-marker-alt mr-2 text-slate-500"></i>
                      {[location.address.city, location.address.state, location.address.country]
                        .filter(Boolean)
                        .join(', ')}
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center gap-4 pt-2">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-white">{location.totalProducts || 0}</div>
                      <div className="text-xs text-slate-500">Products</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-white">{(location.totalUnits || 0).toLocaleString()}</div>
                      <div className="text-xs text-slate-500">Units</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <AddLocationModal
          location={editingLocation}
          onClose={() => {
            setShowModal(false)
            setEditingLocation(null)
          }}
          onSave={() => {
            setShowModal(false)
            setEditingLocation(null)
          }}
        />
      )}
    </div>
  )
}
