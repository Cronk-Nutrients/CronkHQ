import { initializeApp, getApps, cert, applicationDefault, App } from 'firebase-admin/app'
import { getFirestore, Firestore, FieldValue } from 'firebase-admin/firestore'

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

  // Check for explicit credentials first (for local development)
  const projectId = process.env.ADMIN_PROJECT_ID || process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.ADMIN_CLIENT_EMAIL || process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = (process.env.ADMIN_PRIVATE_KEY || process.env.FIREBASE_PRIVATE_KEY)?.replace(/\\n/g, '\n')

  if (projectId && clientEmail && privateKey) {
    // Use explicit credentials
    adminApp = initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    })
  } else {
    // Use Application Default Credentials (works in Firebase Cloud Functions)
    try {
      adminApp = initializeApp({
        credential: applicationDefault(),
        projectId: process.env.GCLOUD_PROJECT || process.env.FIREBASE_PROJECT_ID || 'cronk-wms',
      })
    } catch (e) {
      // Fallback: initialize without explicit credentials (Firebase will use ADC automatically)
      adminApp = initializeApp()
    }
  }

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

export { getAdminDb as adminDb, FieldValue }
