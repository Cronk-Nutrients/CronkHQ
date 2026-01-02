'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import {
  User,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

// Demo account credentials
const DEMO_EMAIL = 'demo@cronknutrients.com'
const DEMO_PASSWORD = 'demo1234'

export interface UserProfile {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  role: 'admin' | 'warehouse' | 'viewer'
  company?: string
  organizationId?: string // Organization this user belongs to
  organizations?: string[] // All organizations user is a member of
  createdAt?: Date
  lastLoginAt?: Date
  isDemo?: boolean
}

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  error: string | null
  isDemo: boolean
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>
  logout: () => Promise<void>
  register: (email: string, password: string, displayName: string) => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>
  clearError: () => void
  /** For demo mode: switch between different roles to test permissions */
  setDemoRole: (role: 'admin' | 'warehouse' | 'viewer') => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo user profile (mock)
const DEMO_USER_PROFILE: UserProfile = {
  uid: 'demo-user-id',
  email: DEMO_EMAIL,
  displayName: 'Demo User',
  photoURL: null,
  role: 'admin',
  company: 'Cronk Nutrients (Demo)',
  organizationId: 'demo-org-id',
  organizations: ['demo-org-id'],
  isDemo: true,
}

// Create a mock User object for demo mode
const createDemoUser = (): User => ({
  uid: 'demo-user-id',
  email: DEMO_EMAIL,
  emailVerified: true,
  displayName: 'Demo User',
  photoURL: null,
  isAnonymous: false,
  metadata: {} as User['metadata'],
  providerData: [],
  refreshToken: '',
  tenantId: null,
  phoneNumber: null,
  providerId: 'demo',
  delete: async () => {},
  getIdToken: async () => 'demo-token',
  getIdTokenResult: async () => ({} as any),
  reload: async () => {},
  toJSON: () => ({}),
}) as User

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDemo, setIsDemo] = useState(false)

  // Check for persisted demo session on mount
  useEffect(() => {
    const demoSession = typeof window !== 'undefined' ? localStorage.getItem('demo_session') : null
    if (demoSession === 'true') {
      setUser(createDemoUser())
      setUserProfile(DEMO_USER_PROFILE)
      setIsDemo(true)
      setLoading(false)
    }
  }, [])

  // Fetch user profile from Firestore
  const fetchUserProfile = async (uid: string): Promise<UserProfile | null> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))
      if (userDoc.exists()) {
        return userDoc.data() as UserProfile
      }
      return null
    } catch (err) {
      console.error('Error fetching user profile:', err)
      return null
    }
  }

  // Create or update user profile in Firestore
  const createOrUpdateUserProfile = async (user: User, additionalData?: Partial<UserProfile>) => {
    const userRef = doc(db, 'users', user.uid)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      // Create new user profile
      const newProfile: UserProfile = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || additionalData?.displayName || null,
        photoURL: user.photoURL,
        role: 'admin', // Default role - first user is admin
        createdAt: new Date(),
        lastLoginAt: new Date(),
        ...additionalData,
      }
      await setDoc(userRef, {
        ...newProfile,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      })
      return newProfile
    } else {
      // Update last login
      await setDoc(userRef, { lastLoginAt: serverTimestamp() }, { merge: true })
      return userDoc.data() as UserProfile
    }
  }

  // Listen for auth state changes (only for non-demo users)
  useEffect(() => {
    // Skip Firebase listener if in demo mode
    if (isDemo) return

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // Don't override demo session
      const demoSession = typeof window !== 'undefined' ? localStorage.getItem('demo_session') : null
      if (demoSession === 'true') return

      setUser(firebaseUser)

      if (firebaseUser) {
        const profile = await fetchUserProfile(firebaseUser.uid)
        if (profile) {
          setUserProfile(profile)
        } else {
          // Create profile if doesn't exist
          const newProfile = await createOrUpdateUserProfile(firebaseUser)
          setUserProfile(newProfile)
        }
      } else {
        setUserProfile(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [isDemo])

  // Login
  const login = async (email: string, password: string, rememberMe: boolean = true) => {
    try {
      setError(null)
      setLoading(true)

      // Check for demo login
      if (email.toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
        // Demo mode - no Firebase auth needed
        setUser(createDemoUser())
        setUserProfile(DEMO_USER_PROFILE)
        setIsDemo(true)
        if (typeof window !== 'undefined') {
          localStorage.setItem('demo_session', 'true')
        }
        setLoading(false)
        return
      }

      // Regular Firebase login
      const result = await signInWithEmailAndPassword(auth, email, password)

      // Update last login in Firestore
      await createOrUpdateUserProfile(result.user)
      setIsDemo(false)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('demo_session')
      }

    } catch (err: unknown) {
      const errorMessage = getAuthErrorMessage((err as { code?: string }).code || '')
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Logout
  const logout = async () => {
    try {
      setError(null)

      // Clear demo session if active
      if (isDemo) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('demo_session')
        }
        setUser(null)
        setUserProfile(null)
        setIsDemo(false)
        return
      }

      // Regular Firebase logout
      await signOut(auth)
      setUser(null)
      setUserProfile(null)
    } catch (err) {
      setError('Failed to log out. Please try again.')
      throw err
    }
  }

  // Register new user
  const register = async (email: string, password: string, displayName: string) => {
    try {
      setError(null)
      setLoading(true)

      const result = await createUserWithEmailAndPassword(auth, email, password)

      // Update display name
      await updateProfile(result.user, { displayName })

      // Create user profile in Firestore
      await createOrUpdateUserProfile(result.user, { displayName })

    } catch (err: unknown) {
      const errorMessage = getAuthErrorMessage((err as { code?: string }).code || '')
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      setError(null)
      await sendPasswordResetEmail(auth, email)
    } catch (err: unknown) {
      const errorMessage = getAuthErrorMessage((err as { code?: string }).code || '')
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  // Update user profile
  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in')

    // Demo users can't update profile in Firestore
    if (isDemo) {
      setUserProfile(prev => prev ? { ...prev, ...data } : null)
      return
    }

    try {
      setError(null)
      const userRef = doc(db, 'users', user.uid)
      await setDoc(userRef, data, { merge: true })

      // Update local state
      setUserProfile(prev => prev ? { ...prev, ...data } : null)

      // Update Firebase Auth profile if name changed
      if (data.displayName) {
        await updateProfile(user, { displayName: data.displayName })
      }
    } catch (err) {
      setError('Failed to update profile')
      throw err
    }
  }

  // Clear error
  const clearError = () => setError(null)

  // Set demo role (for testing permissions)
  const setDemoRole = (role: 'admin' | 'warehouse' | 'viewer') => {
    if (isDemo && userProfile) {
      setUserProfile({ ...userProfile, role })
    }
  }

  const value = {
    user,
    userProfile,
    loading,
    error,
    isDemo,
    login,
    logout,
    register,
    resetPassword,
    updateUserProfile,
    clearError,
    setDemoRole,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Helper to get user-friendly error messages
function getAuthErrorMessage(code: string): string {
  switch (code) {
    case 'auth/user-not-found':
      return 'No account found with this email address.'
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.'
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.'
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.'
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.'
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.'
    case 'auth/invalid-credential':
      return 'Invalid email or password.'
    default:
      return 'An error occurred. Please try again.'
  }
}
