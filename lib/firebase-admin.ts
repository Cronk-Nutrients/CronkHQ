import { initializeApp, getApps, cert, App } from 'firebase-admin/app'
import { getFirestore, Firestore } from 'firebase-admin/firestore'

let adminApp: App | undefined
let adminDb: Firestore | undefined

function getAdminApp(): App {
  if (adminApp) {
    return adminApp
  }

  const apps = getApps()
  if (apps.length > 0) {
    adminApp = apps[0]
    return adminApp
  }

  // Initialize Firebase Admin
  // For production, use environment variables
  // For local development, you can use a service account JSON file

  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Firebase Admin SDK credentials not found. Please set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY environment variables.'
    )
  }

  adminApp = initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  })

  return adminApp
}

export function getAdminDb(): Firestore {
  if (adminDb) {
    return adminDb
  }

  getAdminApp()
  adminDb = getFirestore()
  return adminDb
}

// Export a lazy-initialized adminDb for convenience
export { getAdminDb as adminDb }
