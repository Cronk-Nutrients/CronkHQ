'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { useOrganization } from '@/context/OrganizationContext'
import { Category } from '@/types'

interface CategorySelectorProps {
  value: string | null
  onChange: (categoryId: string | null, categoryName: string) => void
  placeholder?: string
  className?: string
}

export default function CategorySelector({
  value,
  onChange,
  placeholder = 'Select category',
  className = ''
}: CategorySelectorProps) {
  const { organization } = useOrganization()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!organization?.id) return

    const categoriesRef = collection(db, 'organizations', organization.id, 'categories')
    const q = query(categoriesRef, orderBy('name'))

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

  return (
    <select
      value={value || ''}
      onChange={(e) => {
        const cat = categories.find(c => c.id === e.target.value)
        onChange(e.target.value || null, cat?.name || 'Uncategorized')
      }}
      className={`w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 ${className}`}
      disabled={loading}
    >
      <option value="">{loading ? 'Loading...' : placeholder}</option>
      {categories.map(category => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  )
}
