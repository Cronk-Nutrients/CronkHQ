/**
 * Organization-scoped database utilities for Firestore.
 *
 * This module provides helper functions for accessing data within an organization's
 * namespace. All data is stored under /organizations/{orgId}/... to ensure proper
 * multi-tenant isolation.
 *
 * Usage:
 * ```
 * import { OrgDB } from '@/lib/orgDb'
 *
 * // In a component with useOrganization hook:
 * const { organization } = useOrganization()
 * const orgDb = new OrgDB(organization.id)
 *
 * // Get products collection reference
 * const productsRef = orgDb.collection('products')
 *
 * // Query products
 * const products = await getDocs(orgDb.collection('products'))
 *
 * // Get a specific document
 * const productDoc = await getDoc(orgDb.doc('products', productId))
 * ```
 */

import {
  collection,
  doc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
  serverTimestamp,
  DocumentReference,
  CollectionReference,
  Query,
  QueryConstraint,
  DocumentData,
  WithFieldValue,
  UpdateData,
  WhereFilterOp,
  OrderByDirection,
} from 'firebase/firestore'
import { db } from './firebase'

// Collections that exist within an organization
export type OrgCollection =
  | 'products'
  | 'inventory'
  | 'orders'
  | 'customers'
  | 'purchaseOrders'
  | 'workOrders'
  | 'bundles'
  | 'suppliers'
  | 'locations'
  | 'returns'
  | 'transfers'
  | 'fbaShipments'
  | 'shipments'
  | 'pickBatches'
  | 'settings'
  | 'integrations'
  | 'activityLog'

// Firestore path pattern: /organizations/{orgId}/{collection}

export class OrgDB {
  private orgId: string

  constructor(organizationId: string) {
    if (!organizationId) {
      throw new Error('Organization ID is required')
    }
    this.orgId = organizationId
  }

  /**
   * Get a reference to an organization-scoped collection
   */
  collection(collectionName: OrgCollection): CollectionReference {
    return collection(db, 'organizations', this.orgId, collectionName)
  }

  /**
   * Get a reference to a specific document within an organization-scoped collection
   */
  doc(collectionName: OrgCollection, docId: string): DocumentReference {
    return doc(db, 'organizations', this.orgId, collectionName, docId)
  }

  /**
   * Create a query on an organization-scoped collection
   */
  query(collectionName: OrgCollection, ...queryConstraints: QueryConstraint[]): Query {
    return query(this.collection(collectionName), ...queryConstraints)
  }

  /**
   * Get all documents from a collection
   */
  async getAll<T = DocumentData>(collectionName: OrgCollection): Promise<(T & { id: string })[]> {
    const snapshot = await getDocs(this.collection(collectionName))
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as (T & { id: string })[]
  }

  /**
   * Get a single document by ID
   */
  async getById<T = DocumentData>(
    collectionName: OrgCollection,
    docId: string
  ): Promise<(T & { id: string }) | null> {
    const docSnap = await getDoc(this.doc(collectionName, docId))
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as T & { id: string }
    }
    return null
  }

  /**
   * Query documents with filters
   */
  async queryDocs<T = DocumentData>(
    collectionName: OrgCollection,
    filters: { field: string; op: WhereFilterOp; value: unknown }[],
    orderByField?: string,
    orderDirection?: OrderByDirection,
    limitCount?: number
  ): Promise<(T & { id: string })[]> {
    const constraints: QueryConstraint[] = filters.map(f => where(f.field, f.op, f.value))

    if (orderByField) {
      constraints.push(orderBy(orderByField, orderDirection || 'asc'))
    }

    if (limitCount) {
      constraints.push(limit(limitCount))
    }

    const q = query(this.collection(collectionName), ...constraints)
    const snapshot = await getDocs(q)

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as (T & { id: string })[]
  }

  /**
   * Add a new document to a collection
   */
  async add<T extends DocumentData>(
    collectionName: OrgCollection,
    data: WithFieldValue<T>
  ): Promise<string> {
    const docRef = await addDoc(this.collection(collectionName), {
      ...data,
      organizationId: this.orgId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    return docRef.id
  }

  /**
   * Set (create or overwrite) a document with a specific ID
   */
  async set<T extends DocumentData>(
    collectionName: OrgCollection,
    docId: string,
    data: WithFieldValue<T>,
    merge: boolean = false
  ): Promise<void> {
    await setDoc(
      this.doc(collectionName, docId),
      {
        ...data,
        organizationId: this.orgId,
        updatedAt: serverTimestamp(),
        ...(merge ? {} : { createdAt: serverTimestamp() }),
      },
      { merge }
    )
  }

  /**
   * Update fields in an existing document
   */
  async update<T extends DocumentData>(
    collectionName: OrgCollection,
    docId: string,
    data: UpdateData<T>
  ): Promise<void> {
    await updateDoc(this.doc(collectionName, docId), {
      ...data,
      updatedAt: serverTimestamp(),
    })
  }

  /**
   * Delete a document
   */
  async delete(collectionName: OrgCollection, docId: string): Promise<void> {
    await deleteDoc(this.doc(collectionName, docId))
  }

  /**
   * Batch write multiple operations
   */
  async batchWrite(
    operations: Array<{
      type: 'set' | 'update' | 'delete'
      collection: OrgCollection
      docId: string
      data?: DocumentData
    }>
  ): Promise<void> {
    const batch = writeBatch(db)

    operations.forEach(op => {
      const docRef = this.doc(op.collection, op.docId)
      switch (op.type) {
        case 'set':
          batch.set(docRef, {
            ...op.data,
            organizationId: this.orgId,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          })
          break
        case 'update':
          batch.update(docRef, {
            ...op.data,
            updatedAt: serverTimestamp(),
          })
          break
        case 'delete':
          batch.delete(docRef)
          break
      }
    })

    await batch.commit()
  }

  /**
   * Get the organization ID
   */
  getOrgId(): string {
    return this.orgId
  }
}

/**
 * Create an OrgDB instance from organization context
 * This is a convenience function for use in components
 */
export function createOrgDB(organizationId: string | undefined): OrgDB | null {
  if (!organizationId) return null
  return new OrgDB(organizationId)
}

/**
 * Generate activity log entry
 */
export async function logActivity(
  orgDb: OrgDB,
  action: string,
  entityType: string,
  entityId: string,
  userId: string,
  details?: Record<string, unknown>
): Promise<void> {
  await orgDb.add('activityLog', {
    action,
    entityType,
    entityId,
    userId,
    details: details || {},
    timestamp: serverTimestamp(),
  })
}
