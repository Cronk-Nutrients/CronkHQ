'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import {
  collection, query, orderBy, onSnapshot, doc, setDoc, updateDoc, deleteDoc,
  serverTimestamp
} from 'firebase/firestore'
import { useOrganization } from '@/context/OrganizationContext'
import { useToast } from '@/components/ui/Toast'
import { Button } from '@/components/ui/Button'
import { Category } from '@/types'
import Link from 'next/link'

const CATEGORY_COLORS = [
  { name: 'Gray', value: '#64748b' },
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
]

export default function CategoriesPage() {
  const { organization } = useOrganization()
  const { success, error } = useToast()

  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [categoryName, setCategoryName] = useState('')
  const [categoryDescription, setCategoryDescription] = useState('')
  const [categoryColor, setCategoryColor] = useState('#10b981')
  const [saving, setSaving] = useState(false)

  // Load categories
  useEffect(() => {
    if (!organization?.id) return

    const categoriesRef = collection(db, 'organizations', organization.id, 'categories')
    const q = query(categoriesRef, orderBy('sortOrder'), orderBy('name'))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const cats = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Category[]
      setCategories(cats)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [organization?.id])

  // Generate slug from name
  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50)
  }

  // Open add modal
  const handleAdd = () => {
    setEditingCategory(null)
    setCategoryName('')
    setCategoryDescription('')
    setCategoryColor('#10b981')
    setShowModal(true)
  }

  // Open edit modal
  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setCategoryName(category.name)
    setCategoryDescription(category.description || '')
    setCategoryColor(category.color)
    setShowModal(true)
  }

  // Save category
  const handleSave = async () => {
    if (!organization?.id || !categoryName.trim()) return

    setSaving(true)
    try {
      const categoriesRef = collection(db, 'organizations', organization.id, 'categories')

      if (editingCategory) {
        // Update existing
        await updateDoc(doc(categoriesRef, editingCategory.id), {
          name: categoryName.trim(),
          description: categoryDescription.trim() || null,
          color: categoryColor,
          updatedAt: serverTimestamp(),
        })
        success('Category updated')
      } else {
        // Create new
        const newRef = doc(categoriesRef)
        await setDoc(newRef, {
          name: categoryName.trim(),
          slug: generateSlug(categoryName),
          description: categoryDescription.trim() || null,
          parentId: null,
          color: categoryColor,
          productCount: 0,
          isActive: true,
          sortOrder: categories.length,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
        success('Category created')
      }

      setShowModal(false)
    } catch (err) {
      console.error('Error saving category:', err)
      error('Failed to save category')
    } finally {
      setSaving(false)
    }
  }

  // Delete category
  const handleDelete = async (category: Category) => {
    if (!organization?.id) return

    // Check if category has products
    if (category.productCount > 0) {
      error(`Cannot delete category with ${category.productCount} products. Reassign products first.`)
      return
    }

    if (!confirm(`Delete "${category.name}"?`)) return

    try {
      await deleteDoc(doc(db, 'organizations', organization.id, 'categories', category.id))
      success('Category deleted')
    } catch (err) {
      console.error('Error deleting category:', err)
      error('Failed to delete category')
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
        <span className="text-white">Categories</span>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Categories</h1>
        <p className="text-slate-400">Organize your products into categories</p>
      </div>

      {/* Categories List */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl">
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <span className="text-slate-400">{categories.length} categories</span>
          <Button onClick={handleAdd}>
            <i className="fas fa-plus mr-2"></i>
            Add Category
          </Button>
        </div>

        {categories.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-folder-open text-2xl text-slate-500"></i>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No categories yet</h3>
            <p className="text-slate-400 mb-6">Create categories to organize your products</p>
            <Button variant="secondary" onClick={handleAdd}>
              <i className="fas fa-plus mr-2"></i>
              Create Your First Category
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-slate-700">
            {categories.map(category => (
              <div
                key={category.id}
                className="flex items-center justify-between p-4 hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <div>
                    <div className="text-white font-medium">{category.name}</div>
                    {category.description && (
                      <div className="text-sm text-slate-500">{category.description}</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-500">
                    {category.productCount} products
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(category)}
                      className="p-2 text-slate-400 hover:text-white transition-colors"
                    >
                      <i className="fas fa-pencil"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(category)}
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

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h3 className="text-lg font-semibold text-white">
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Category Name *</label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="e.g., Liquid Nutrients, Labels, Accessories"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Description</label>
                <textarea
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  placeholder="Optional description..."
                  rows={2}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Color</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORY_COLORS.map(color => (
                    <button
                      key={color.value}
                      onClick={() => setCategoryColor(color.value)}
                      className={`w-8 h-8 rounded-full transition-all ${
                        categoryColor === color.value
                          ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900'
                          : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-slate-700">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving || !categoryName.trim()}>
                {saving ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check mr-2"></i>
                    {editingCategory ? 'Update' : 'Create'}
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
