'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { collection, doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { useOrganization } from '@/context/OrganizationContext'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/components/ui/Toast'
import { Button } from '@/components/ui/Button'
import { LocationExtended, LocationType } from '@/types'

interface AddLocationModalProps {
  location?: LocationExtended | null
  onClose: () => void
  onSave: () => void
}

const LOCATION_TYPES: { value: LocationType; label: string; icon: string; description: string }[] = [
  { value: 'warehouse', label: 'Warehouse', icon: 'fa-warehouse', description: 'Main storage facility' },
  { value: 'fba', label: 'Amazon FBA', icon: 'fa-amazon', description: 'Amazon fulfillment center' },
  { value: 'retail', label: 'Retail Store', icon: 'fa-store', description: 'Physical retail location' },
  { value: '3pl', label: '3PL Provider', icon: 'fa-truck-loading', description: 'Third-party logistics' },
  { value: 'dropship', label: 'Dropship', icon: 'fa-shipping-fast', description: 'Supplier ships direct' },
  { value: 'other', label: 'Other', icon: 'fa-box', description: 'Custom location type' },
]

export default function AddLocationModal({ location, onClose, onSave }: AddLocationModalProps) {
  const { organization } = useOrganization()
  const { user } = useAuth()
  const { success, error } = useToast()

  const isEditing = !!location

  // Form state
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [type, setType] = useState<LocationType>('warehouse')
  const [isDefault, setIsDefault] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const [trackSublocations, setTrackSublocations] = useState(false)
  const [notes, setNotes] = useState('')

  // Address
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('USA')

  // Contact
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')

  // FBA specific
  const [marketplaceId, setMarketplaceId] = useState('')
  const [fulfillmentCenterId, setFulfillmentCenterId] = useState('')

  const [saving, setSaving] = useState(false)

  // Initialize form when editing
  useEffect(() => {
    if (location) {
      setName(location.name)
      setCode(location.code)
      setType(location.type)
      setIsDefault(location.isDefault)
      setIsActive(location.isActive)
      setTrackSublocations(location.trackSublocations || false)
      setNotes(location.notes || '')

      if (location.address) {
        setStreet(location.address.street1 || '')
        setCity(location.address.city || '')
        setState(location.address.state || '')
        setPostalCode(location.address.postalCode || '')
        setCountry(location.address.country || 'USA')
      }

      if (location.contact) {
        setContactName(location.contact.name || '')
        setContactEmail(location.contact.email || '')
        setContactPhone(location.contact.phone || '')
      }

      if (location.fbaDetails) {
        setMarketplaceId(location.fbaDetails.marketplaceId || '')
        setFulfillmentCenterId(location.fbaDetails.fulfillmentCenterId || '')
      }
    }
  }, [location])

  // Generate code from name
  const generateCode = (n: string): string => {
    return n
      .toUpperCase()
      .replace(/[^A-Z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 10)
  }

  // Auto-generate code when name changes
  useEffect(() => {
    if (!isEditing && name && !code) {
      setCode(generateCode(name))
    }
  }, [name, isEditing, code])

  const handleSave = async () => {
    if (!organization?.id || !user?.uid || !name.trim() || !code.trim()) return

    setSaving(true)
    try {
      const locationsRef = collection(db, 'organizations', organization.id, 'locations')

      const hasAddress = street || city || state || postalCode
      const hasContact = contactName || contactEmail || contactPhone

      const locationData = {
        name: name.trim(),
        code: code.trim().toUpperCase(),
        type,
        isDefault,
        isActive,
        trackSublocations,
        notes: notes.trim() || null,
        address: hasAddress ? {
          street1: street.trim() || '',
          city: city.trim() || '',
          state: state.trim() || '',
          postalCode: postalCode.trim() || '',
          country: country.trim() || 'USA',
        } : null,
        contact: hasContact ? {
          name: contactName.trim() || null,
          email: contactEmail.trim() || null,
          phone: contactPhone.trim() || null,
        } : null,
        fbaDetails: type === 'fba' && (marketplaceId || fulfillmentCenterId) ? {
          marketplaceId: marketplaceId.trim() || null,
          fulfillmentCenterId: fulfillmentCenterId.trim() || null,
        } : null,
        updatedAt: serverTimestamp(),
      }

      if (isEditing && location) {
        await updateDoc(doc(locationsRef, location.id), locationData)
        success('Location updated')
      } else {
        const newRef = doc(locationsRef)
        await setDoc(newRef, {
          ...locationData,
          totalProducts: 0,
          totalUnits: 0,
          createdAt: serverTimestamp(),
          createdBy: user.uid,
        })
        success('Location created')
      }

      onSave()
    } catch (err) {
      console.error('Error saving location:', err)
      error('Failed to save location')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h3 className="text-lg font-semibold text-white">
              {isEditing ? 'Edit Location' : 'Add Location'}
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              {isEditing ? `Editing ${location?.name}` : 'Create a new warehouse or storage location'}
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Location Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Main Warehouse"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Location Code *</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g., WH-MAIN"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 uppercase"
              />
            </div>
          </div>

          {/* Location Type */}
          <div>
            <label className="block text-sm text-slate-400 mb-3">Location Type *</label>
            <div className="grid grid-cols-3 gap-3">
              {LOCATION_TYPES.map(locType => {
                const isSelected = type === locType.value

                return (
                  <button
                    key={locType.value}
                    type="button"
                    onClick={() => setType(locType.value)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <i className={`${locType.value === 'fba' ? 'fab' : 'fas'} ${locType.icon} text-xl`}></i>
                    <span className="text-sm font-medium">{locType.label}</span>
                    <span className="text-xs text-slate-500 text-center">{locType.description}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* FBA Specific Fields */}
          {type === 'fba' && (
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 space-y-4">
              <div className="flex items-center gap-2 text-orange-400 mb-2">
                <i className="fab fa-amazon"></i>
                <span className="text-sm font-medium">FBA Settings</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Marketplace ID</label>
                  <input
                    type="text"
                    value={marketplaceId}
                    onChange={(e) => setMarketplaceId(e.target.value)}
                    placeholder="e.g., ATVPDKIKX0DER"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Fulfillment Center ID</label>
                  <input
                    type="text"
                    value={fulfillmentCenterId}
                    onChange={(e) => setFulfillmentCenterId(e.target.value)}
                    placeholder="e.g., PHX3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Address */}
          <div>
            <label className="block text-sm text-slate-400 mb-3">Address</label>
            <div className="space-y-3">
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Street Address"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="State/Province"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Postal Code"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm text-slate-400 mb-3">Contact Information</label>
            <div className="grid grid-cols-3 gap-3">
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Contact Name"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="Phone"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 bg-slate-800/50 border border-slate-700 rounded-lg cursor-pointer hover:bg-slate-800">
              <input
                type="checkbox"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="w-4 h-4 rounded border-slate-600 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900"
              />
              <div>
                <div className="text-white text-sm font-medium">Default Location</div>
                <div className="text-xs text-slate-500">New inventory will be added here by default</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-slate-800/50 border border-slate-700 rounded-lg cursor-pointer hover:bg-slate-800">
              <input
                type="checkbox"
                checked={trackSublocations}
                onChange={(e) => setTrackSublocations(e.target.checked)}
                className="w-4 h-4 rounded border-slate-600 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900"
              />
              <div>
                <div className="text-white text-sm font-medium">Track Sublocations</div>
                <div className="text-xs text-slate-500">Enable bins, aisles, shelves, and zones</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-slate-800/50 border border-slate-700 rounded-lg cursor-pointer hover:bg-slate-800">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 rounded border-slate-600 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900"
              />
              <div>
                <div className="text-white text-sm font-medium">Active</div>
                <div className="text-xs text-slate-500">Location is available for receiving and transfers</div>
              </div>
            </label>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm text-slate-400 mb-2">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes about this location..."
              rows={3}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-slate-700">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving || !name.trim() || !code.trim()}>
            {saving ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Saving...
              </>
            ) : (
              <>
                <i className="fas fa-check mr-2"></i>
                {isEditing ? 'Update Location' : 'Create Location'}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
