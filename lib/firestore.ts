import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  writeBatch,
  increment,
  serverTimestamp,
  Timestamp,
  QueryConstraint,
  DocumentSnapshot,
  Unsubscribe,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

// Helper to convert Firestore timestamps to Dates
export function convertTimestamps<T>(data: any): T {
  if (!data) return data

  const converted = { ...data }

  for (const key in converted) {
    if (converted[key] instanceof Timestamp) {
      converted[key] = converted[key].toDate()
    } else if (converted[key] && typeof converted[key] === 'object' && !Array.isArray(converted[key])) {
      converted[key] = convertTimestamps(converted[key])
    }
  }

  return converted as T
}

// Generic Firestore service for organization-scoped data
export class FirestoreService<T extends { id: string }> {
  private orgId: string
  private collectionName: string

  constructor(organizationId: string, collectionName: string) {
    this.orgId = organizationId
    this.collectionName = collectionName
  }

  // Get collection reference
  private getCollectionRef() {
    return collection(db, 'organizations', this.orgId, this.collectionName)
  }

  // Get document reference
  private getDocRef(id: string) {
    return doc(db, 'organizations', this.orgId, this.collectionName, id)
  }

  // Get all documents
  async getAll(...queryConstraints: QueryConstraint[]): Promise<T[]> {
    const ref = this.getCollectionRef()
    const q = queryConstraints.length > 0 ? query(ref, ...queryConstraints) : query(ref)
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => convertTimestamps<T>({ id: doc.id, ...doc.data() }))
  }

  // Get single document
  async get(id: string): Promise<T | null> {
    const docRef = this.getDocRef(id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return convertTimestamps<T>({ id: docSnap.id, ...docSnap.data() })
    }
    return null
  }

  // Create document
  async create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>, customId?: string): Promise<string> {
    const colRef = this.getCollectionRef()
    const docRef = customId ? doc(colRef, customId) : doc(colRef)

    await setDoc(docRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    return docRef.id
  }

  // Update document
  async update(id: string, data: Partial<T>): Promise<void> {
    const docRef = this.getDocRef(id)
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    })
  }

  // Delete document
  async delete(id: string): Promise<void> {
    const docRef = this.getDocRef(id)
    await deleteDoc(docRef)
  }

  // Subscribe to real-time updates (all documents)
  subscribe(
    callback: (data: T[]) => void,
    errorCallback?: (error: Error) => void,
    ...queryConstraints: QueryConstraint[]
  ): Unsubscribe {
    const ref = this.getCollectionRef()
    const q = queryConstraints.length > 0 ? query(ref, ...queryConstraints) : query(ref)

    return onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map(doc => convertTimestamps<T>({ id: doc.id, ...doc.data() }))
        callback(data)
      },
      errorCallback
    )
  }

  // Subscribe to single document
  subscribeToDoc(
    id: string,
    callback: (data: T | null) => void,
    errorCallback?: (error: Error) => void
  ): Unsubscribe {
    const docRef = this.getDocRef(id)

    return onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          callback(convertTimestamps<T>({ id: docSnap.id, ...docSnap.data() }))
        } else {
          callback(null)
        }
      },
      errorCallback
    )
  }

  // Batch operations
  async batchCreate(items: Omit<T, 'id' | 'createdAt' | 'updatedAt'>[]): Promise<string[]> {
    const batch = writeBatch(db)
    const ids: string[] = []

    for (const item of items) {
      const docRef = doc(this.getCollectionRef())
      ids.push(docRef.id)
      batch.set(docRef, {
        ...item,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    }

    await batch.commit()
    return ids
  }

  async batchUpdate(updates: { id: string; data: Partial<T> }[]): Promise<void> {
    const batch = writeBatch(db)

    for (const { id, data } of updates) {
      const docRef = this.getDocRef(id)
      batch.update(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      })
    }

    await batch.commit()
  }

  async batchDelete(ids: string[]): Promise<void> {
    const batch = writeBatch(db)

    for (const id of ids) {
      batch.delete(this.getDocRef(id))
    }

    await batch.commit()
  }

  // Pagination helper
  async getPaginated(
    pageSize: number,
    lastDoc?: DocumentSnapshot,
    ...queryConstraints: QueryConstraint[]
  ): Promise<{ data: T[]; lastDoc: DocumentSnapshot | null; hasMore: boolean }> {
    const ref = this.getCollectionRef()

    let q = query(ref, ...queryConstraints, limit(pageSize + 1))

    if (lastDoc) {
      q = query(ref, ...queryConstraints, startAfter(lastDoc), limit(pageSize + 1))
    }

    const snapshot = await getDocs(q)
    const hasMore = snapshot.docs.length > pageSize
    const docs = hasMore ? snapshot.docs.slice(0, -1) : snapshot.docs

    return {
      data: docs.map(doc => convertTimestamps<T>({ id: doc.id, ...doc.data() })),
      lastDoc: docs.length > 0 ? docs[docs.length - 1] : null,
      hasMore,
    }
  }
}

// Increment/decrement helper for inventory
export async function adjustInventory(
  organizationId: string,
  productId: string,
  locationId: string,
  adjustment: number,
  reason?: string
) {
  const inventoryRef = doc(
    db,
    'organizations',
    organizationId,
    'inventory',
    `${productId}_${locationId}`
  )

  await updateDoc(inventoryRef, {
    quantity: increment(adjustment),
    availableQuantity: increment(adjustment),
    updatedAt: serverTimestamp(),
  })

  // Log the adjustment
  const logRef = collection(db, 'organizations', organizationId, 'inventoryLogs')
  await setDoc(doc(logRef), {
    productId,
    locationId,
    adjustment,
    reason: reason || 'manual_adjustment',
    createdAt: serverTimestamp(),
  })
}

// Generate next number (for order numbers, PO numbers, etc.)
export async function getNextNumber(
  organizationId: string,
  type: 'order' | 'po' | 'wo' | 'transfer' | 'return'
): Promise<string> {
  const counterRef = doc(db, 'organizations', organizationId, 'counters', type)
  const counterSnap = await getDoc(counterRef)

  let nextNumber = 1

  if (counterSnap.exists()) {
    nextNumber = (counterSnap.data().current || 0) + 1
  }

  await setDoc(counterRef, { current: nextNumber }, { merge: true })

  const prefixes: Record<string, string> = {
    order: 'ORD',
    po: 'PO',
    wo: 'WO',
    transfer: 'TRF',
    return: 'RET',
  }

  return `${prefixes[type]}-${String(nextNumber).padStart(5, '0')}`
}

// Helper to check if using demo mode (no Firestore operations)
export function isDemoOrganization(orgId: string): boolean {
  return orgId === 'demo-org-id'
}
