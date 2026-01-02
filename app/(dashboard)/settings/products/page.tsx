'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { useOrganization } from '@/context/OrganizationContext'
import { useToast } from '@/components/ui/Toast'
import { Button } from '@/components/ui/Button'
import { CustomPriceField, CustomPriceCurrency } from '@/types'
import Link from 'next/link'

const CURRENCIES: { code: CustomPriceCurrency; name: string; symbol: string }[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'MX$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
]

export default function ProductSettingsPage() {
  const { organization } = useOrganization()
  const { success, error } = useToast()

  const [customPriceFields, setCustomPriceFields] = useState<CustomPriceField[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [editingField, setEditingField] = useState<CustomPriceField | null>(null)
  const [fieldName, setFieldName] = useState('')
  const [fieldCurrency, setFieldCurrency] = useState<CustomPriceCurrency>('USD')

  // Load custom price fields
  useEffect(() => {
    if (!organization?.id) return

    const loadFields = async () => {
      try {
        const orgRef = doc(db, 'organizations', organization.id)
        const orgDoc = await getDoc(orgRef)
        if (orgDoc.exists()) {
          const data = orgDoc.data()
          setCustomPriceFields(data.customPriceFields || [])
        }
      } catch (err) {
        console.error('Error loading custom price fields:', err)
        error('Failed to load settings')
      } finally {
        setLoading(false)
      }
    }

    loadFields()
  }, [organization?.id, error])

  // Generate key from name
  const generateKey = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '_')
      .substring(0, 30)
  }

  // Open add modal
  const handleAdd = () => {
    setEditingField(null)
    setFieldName('')
    setFieldCurrency('USD')
    setShowModal(true)
  }

  // Open edit modal
  const handleEdit = (field: CustomPriceField) => {
    setEditingField(field)
    setFieldName(field.name)
    setFieldCurrency(field.currency)
    setShowModal(true)
  }

  // Save field
  const handleSave = async () => {
    if (!organization?.id || !fieldName.trim()) return

    setSaving(true)
    try {
      const orgRef = doc(db, 'organizations', organization.id)

      if (editingField) {
        // Update existing field
        const updatedFields = customPriceFields.map(f =>
          f.id === editingField.id
            ? { ...f, name: fieldName, currency: fieldCurrency }
            : f
        )
        await updateDoc(orgRef, { customPriceFields: updatedFields })
        setCustomPriceFields(updatedFields)
        success('Price field updated')
      } else {
        // Add new field
        const newKey = generateKey(fieldName)

        // Check for duplicate key
        if (customPriceFields.some(f => f.key === newKey)) {
          error('A field with this name already exists')
          setSaving(false)
          return
        }

        const newField: CustomPriceField = {
          id: `cpf_${Date.now()}`,
          name: fieldName,
          key: newKey,
          currency: fieldCurrency,
          isActive: true,
          createdAt: new Date().toISOString(),
        }

        await updateDoc(orgRef, {
          customPriceFields: arrayUnion(newField)
        })
        setCustomPriceFields([...customPriceFields, newField])
        success('Price field added')
      }

      setShowModal(false)
    } catch (err) {
      console.error('Error saving field:', err)
      error('Failed to save field')
    } finally {
      setSaving(false)
    }
  }

  // Delete field
  const handleDelete = async (field: CustomPriceField) => {
    if (!organization?.id) return
    if (!confirm(`Delete "${field.name}"? This won't remove values from existing products.`)) return

    try {
      const orgRef = doc(db, 'organizations', organization.id)
      const updatedFields = customPriceFields.filter(f => f.id !== field.id)
      await updateDoc(orgRef, { customPriceFields: updatedFields })
      setCustomPriceFields(updatedFields)
      success('Price field deleted')
    } catch (err) {
      console.error('Error deleting field:', err)
      error('Failed to delete field')
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
    <div className="max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/settings" className="hover:text-white transition-colors">
          Settings
        </Link>
        <i className="fas fa-chevron-right text-xs"></i>
        <span className="text-white">Products</span>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Product Settings</h1>
        <p className="text-slate-400">Configure product fields and pricing options</p>
      </div>

      {/* Custom Pricing Fields Section */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-white">Custom Pricing Fields</h2>
            <p className="text-sm text-slate-400 mt-1">
              Define custom price fields like Amazon, Wholesale, MAP, etc.
            </p>
          </div>
          <Button onClick={handleAdd}>
            <i className="fas fa-plus mr-2"></i>
            Add Field
          </Button>
        </div>

        {customPriceFields.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-tags text-2xl text-slate-500"></i>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No custom price fields defined yet</h3>
            <p className="text-slate-400 mb-6 max-w-sm mx-auto">
              Create custom price fields to track pricing across different sales channels and markets.
            </p>
            <Button variant="secondary" onClick={handleAdd}>
              <i className="fas fa-plus mr-2"></i>
              Add Your First Field
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {customPriceFields.map(field => {
              const currency = CURRENCIES.find(c => c.code === field.currency)
              return (
                <div
                  key={field.id}
                  className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-700 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-400 font-semibold">{currency?.symbol || '$'}</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">{field.name}</div>
                      <div className="text-sm text-slate-500">
                        Key: <span className="font-mono">{field.key}</span>
                        <span className="mx-2">|</span>
                        {field.currency}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(field)}
                      className="p-2 text-slate-400 hover:text-white transition-colors"
                      title="Edit field"
                    >
                      <i className="fas fa-pencil"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(field)}
                      className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                      title="Delete field"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h3 className="text-lg font-semibold text-white">
                {editingField ? 'Edit Price Field' : 'Add Price Field'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Field Name *</label>
                <input
                  type="text"
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                  placeholder="e.g., Amazon, Wholesale, MAP Price"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Currency *</label>
                <select
                  value={fieldCurrency}
                  onChange={(e) => setFieldCurrency(e.target.value as CustomPriceCurrency)}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  {CURRENCIES.map(c => (
                    <option key={c.code} value={c.code}>
                      {c.code} - {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {fieldName && !editingField && (
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Key (auto-generated)</label>
                  <div className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 font-mono text-slate-400">
                    {generateKey(fieldName)}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-slate-700">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving || !fieldName.trim()}>
                {saving ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check mr-2"></i>
                    {editingField ? 'Update Field' : 'Add Field'}
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
