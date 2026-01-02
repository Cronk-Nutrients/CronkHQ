'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { onSnapshot, query, QueryConstraint } from 'firebase/firestore'
import { useOrganization } from '@/context/OrganizationContext'
import { OrgDB, OrgCollection, createOrgDB } from '@/lib/orgDb'

interface UseOrgDataOptions {
  realtime?: boolean // Enable real-time updates via onSnapshot
  enabled?: boolean // Conditionally enable/disable the hook
}

interface UseOrgDataResult<T> {
  data: T[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  add: (item: Omit<T, 'id'>) => Promise<string>
  update: (id: string, data: Partial<T>) => Promise<void>
  remove: (id: string) => Promise<void>
}

/**
 * Hook for accessing organization-scoped collection data
 *
 * @example
 * ```tsx
 * function ProductList() {
 *   const { data: products, loading, error, add, update, remove } = useOrgData<Product>('products')
 *
 *   if (loading) return <Spinner />
 *   if (error) return <Error message={error} />
 *
 *   return (
 *     <ul>
 *       {products.map(p => <li key={p.id}>{p.name}</li>)}
 *     </ul>
 *   )
 * }
 * ```
 */
export function useOrgData<T extends { id?: string }>(
  collectionName: OrgCollection,
  queryConstraints?: QueryConstraint[],
  options: UseOrgDataOptions = {}
): UseOrgDataResult<T & { id: string }> {
  const { organization, loading: orgLoading } = useOrganization()
  const { realtime = false, enabled = true } = options

  const [data, setData] = useState<(T & { id: string })[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Memoize OrgDB instance
  const orgDb = useMemo(() => {
    return organization ? new OrgDB(organization.id) : null
  }, [organization?.id])

  // Fetch data
  const fetchData = useCallback(async () => {
    if (!orgDb || !enabled) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const items = await orgDb.getAll<T>(collectionName)
      setData(items as (T & { id: string })[])
    } catch (err) {
      console.error(`Error fetching ${collectionName}:`, err)
      setError(`Failed to load ${collectionName}`)
    } finally {
      setLoading(false)
    }
  }, [orgDb, collectionName, enabled])

  // Set up real-time listener or fetch data
  useEffect(() => {
    if (orgLoading || !enabled) return
    if (!orgDb) {
      setLoading(false)
      return
    }

    if (realtime) {
      // Real-time updates
      const collectionRef = orgDb.collection(collectionName)
      const q = queryConstraints
        ? query(collectionRef, ...queryConstraints)
        : collectionRef

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const items = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as (T & { id: string })[]
          setData(items)
          setLoading(false)
        },
        (err) => {
          console.error(`Error in ${collectionName} snapshot:`, err)
          setError(`Failed to sync ${collectionName}`)
          setLoading(false)
        }
      )

      return () => unsubscribe()
    } else {
      // One-time fetch
      fetchData()
    }
  }, [orgDb, orgLoading, collectionName, realtime, enabled, fetchData, queryConstraints])

  // Add a new document
  const add = useCallback(
    async (item: Omit<T, 'id'>): Promise<string> => {
      if (!orgDb) throw new Error('No organization')
      const id = await orgDb.add(collectionName, item as any)

      // Optimistic update for non-realtime mode
      if (!realtime) {
        setData(prev => [...prev, { ...item, id } as T & { id: string }])
      }

      return id
    },
    [orgDb, collectionName, realtime]
  )

  // Update a document
  const update = useCallback(
    async (id: string, updateData: Partial<T>): Promise<void> => {
      if (!orgDb) throw new Error('No organization')
      await orgDb.update(collectionName, id, updateData as any)

      // Optimistic update for non-realtime mode
      if (!realtime) {
        setData(prev =>
          prev.map(item => (item.id === id ? { ...item, ...updateData } : item))
        )
      }
    },
    [orgDb, collectionName, realtime]
  )

  // Remove a document
  const remove = useCallback(
    async (id: string): Promise<void> => {
      if (!orgDb) throw new Error('No organization')
      await orgDb.delete(collectionName, id)

      // Optimistic update for non-realtime mode
      if (!realtime) {
        setData(prev => prev.filter(item => item.id !== id))
      }
    },
    [orgDb, collectionName, realtime]
  )

  return {
    data,
    loading: loading || orgLoading,
    error,
    refresh: fetchData,
    add,
    update,
    remove,
  }
}

/**
 * Hook for accessing a single organization-scoped document
 */
export function useOrgDocument<T>(
  collectionName: OrgCollection,
  docId: string | null | undefined,
  options: { realtime?: boolean } = {}
): {
  data: (T & { id: string }) | null
  loading: boolean
  error: string | null
  update: (data: Partial<T>) => Promise<void>
  refresh: () => Promise<void>
} {
  const { organization, loading: orgLoading } = useOrganization()
  const { realtime = false } = options

  const [data, setData] = useState<(T & { id: string }) | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const orgDb = useMemo(() => {
    return organization ? new OrgDB(organization.id) : null
  }, [organization?.id])

  // Fetch document
  const fetchDocument = useCallback(async () => {
    if (!orgDb || !docId) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const doc = await orgDb.getById<T>(collectionName, docId)
      setData(doc)
    } catch (err) {
      console.error(`Error fetching ${collectionName}/${docId}:`, err)
      setError('Failed to load document')
    } finally {
      setLoading(false)
    }
  }, [orgDb, collectionName, docId])

  // Set up real-time listener or fetch
  useEffect(() => {
    if (orgLoading) return
    if (!orgDb || !docId) {
      setLoading(false)
      return
    }

    if (realtime) {
      const docRef = orgDb.doc(collectionName, docId)
      const unsubscribe = onSnapshot(
        docRef,
        (snapshot) => {
          if (snapshot.exists()) {
            setData({
              id: snapshot.id,
              ...snapshot.data(),
            } as T & { id: string })
          } else {
            setData(null)
          }
          setLoading(false)
        },
        (err) => {
          console.error(`Error in ${collectionName}/${docId} snapshot:`, err)
          setError('Failed to sync document')
          setLoading(false)
        }
      )

      return () => unsubscribe()
    } else {
      fetchDocument()
    }
  }, [orgDb, orgLoading, collectionName, docId, realtime, fetchDocument])

  // Update document
  const update = useCallback(
    async (updateData: Partial<T>): Promise<void> => {
      if (!orgDb || !docId) throw new Error('No organization or document ID')
      await orgDb.update(collectionName, docId, updateData as any)

      if (!realtime) {
        setData(prev => (prev ? { ...prev, ...updateData } : null))
      }
    },
    [orgDb, collectionName, docId, realtime]
  )

  return {
    data,
    loading: loading || orgLoading,
    error,
    update,
    refresh: fetchDocument,
  }
}

/**
 * Hook that provides access to the OrgDB instance
 */
export function useOrgDb(): OrgDB | null {
  const { organization } = useOrganization()
  return useMemo(() => createOrgDB(organization?.id), [organization?.id])
}
