'use client'

import { createContext, useContext, useState, useCallback, ReactNode, useRef } from 'react'
import { useBarcodeScanner } from '@/hooks/useBarcodeScanner'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useOrganization } from '@/context/OrganizationContext'
import { useToast } from '@/components/ui/Toast'
import { BARCODE_ACTIONS, isActionBarcode, BarcodeActionCode } from '@/lib/barcode-actions'

interface ScannedProduct {
  id: string
  name: string
  sku: string
  barcode: string | null
  thumbnail: string | null
  totalStock: number
  variants?: any[]
}

interface ScanResult {
  type: 'product' | 'action' | 'order' | 'location' | 'unknown'
  data: any
  barcode: string
  timestamp: Date
}

type ScanMode = 'search' | 'pick' | 'pack' | 'receive' | 'inventory'

interface ScannerContextType {
  isEnabled: boolean
  setEnabled: (enabled: boolean) => void
  isScanning: boolean
  lastScan: ScanResult | null
  scanHistory: ScanResult[]
  clearHistory: () => void
  // Manual scan input
  processManualScan: (barcode: string) => Promise<void>
  // Current mode affects how scans are processed
  scanMode: ScanMode
  setScanMode: (mode: ScanMode) => void
  // Callbacks for different pages to register
  onProductScanned: ((product: ScannedProduct) => void) | null
  setOnProductScanned: (callback: ((product: ScannedProduct) => void) | null) => void
  // Action handlers
  onActionScanned: ((action: BarcodeActionCode) => void) | null
  setOnActionScanned: (callback: ((action: BarcodeActionCode) => void) | null) => void
}

const ScannerContext = createContext<ScannerContextType | null>(null)

// Simple beep sounds using Web Audio API
function playBeep(type: 'success' | 'error' | 'action') {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContextClass) return

    const audioContext = new AudioContextClass()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    if (type === 'success') {
      oscillator.frequency.value = 1200
      oscillator.type = 'sine'
      gainNode.gain.value = 0.1
      oscillator.start()
      setTimeout(() => {
        oscillator.frequency.value = 1600
      }, 100)
      setTimeout(() => oscillator.stop(), 200)
    } else if (type === 'action') {
      oscillator.frequency.value = 800
      oscillator.type = 'sine'
      gainNode.gain.value = 0.1
      oscillator.start()
      setTimeout(() => {
        oscillator.frequency.value = 1000
      }, 80)
      setTimeout(() => {
        oscillator.frequency.value = 1200
      }, 160)
      setTimeout(() => oscillator.stop(), 240)
    } else {
      oscillator.frequency.value = 400
      oscillator.type = 'square'
      gainNode.gain.value = 0.1
      oscillator.start()
      setTimeout(() => oscillator.stop(), 300)
    }
  } catch (e) {
    // Audio not supported, silently fail
  }
}

export function ScannerProvider({ children }: { children: ReactNode }) {
  const { organization } = useOrganization()
  const { success, error: showError } = useToast()

  const [isEnabled, setEnabled] = useState(true)
  const [lastScan, setLastScan] = useState<ScanResult | null>(null)
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([])
  const [scanMode, setScanMode] = useState<ScanMode>('search')

  // Use refs for callbacks to avoid re-triggering effects
  const onProductScannedRef = useRef<((product: ScannedProduct) => void) | null>(null)
  const onActionScannedRef = useRef<((action: BarcodeActionCode) => void) | null>(null)

  const setOnProductScanned = useCallback((callback: ((product: ScannedProduct) => void) | null) => {
    onProductScannedRef.current = callback
  }, [])

  const setOnActionScanned = useCallback((callback: ((action: BarcodeActionCode) => void) | null) => {
    onActionScannedRef.current = callback
  }, [])

  // Lookup product by barcode or SKU
  const lookupProduct = useCallback(async (barcode: string): Promise<ScannedProduct | null> => {
    if (!organization?.id) return null

    const productsRef = collection(db, 'organizations', organization.id, 'products')

    // First try barcode field
    let q = query(productsRef, where('barcode', '==', barcode))
    let snapshot = await getDocs(q)

    if (snapshot.empty) {
      // Try SKU field
      q = query(productsRef, where('sku', '==', barcode))
      snapshot = await getDocs(q)
    }

    if (snapshot.empty) {
      // Try variant SKUs
      const allSnapshot = await getDocs(productsRef)
      for (const docSnap of allSnapshot.docs) {
        const data = docSnap.data()

        // Check main product
        if (data.sku?.toLowerCase() === barcode.toLowerCase() ||
            data.barcode?.toLowerCase() === barcode.toLowerCase()) {
          return {
            id: docSnap.id,
            name: data.name || '',
            sku: data.sku || '',
            barcode: data.barcode || null,
            thumbnail: data.thumbnail || null,
            totalStock: data.totalStock || 0,
            variants: data.variants,
          } as ScannedProduct
        }

        // Check variants
        if (data.variants && Array.isArray(data.variants)) {
          const matchingVariant = data.variants.find((v: any) =>
            v.sku?.toLowerCase() === barcode.toLowerCase() ||
            v.barcode?.toLowerCase() === barcode.toLowerCase()
          )
          if (matchingVariant) {
            return {
              id: docSnap.id,
              name: data.name || '',
              sku: matchingVariant.sku || data.sku || '',
              barcode: matchingVariant.barcode || data.barcode || null,
              thumbnail: data.thumbnail || null,
              totalStock: data.totalStock || 0,
              variants: data.variants,
              matchedVariant: matchingVariant,
            } as ScannedProduct & { matchedVariant: any }
          }
        }
      }
      return null
    }

    const doc = snapshot.docs[0]
    const docData = doc.data()
    return {
      id: doc.id,
      name: docData.name || '',
      sku: docData.sku || '',
      barcode: docData.barcode || null,
      thumbnail: docData.thumbnail || null,
      totalStock: docData.totalStock || 0,
      variants: docData.variants,
    } as ScannedProduct
  }, [organization?.id])

  // Process a scanned barcode
  const processScan = useCallback(async (barcode: string) => {
    console.log('Barcode scanned:', barcode)

    // Check if it's an action barcode
    if (isActionBarcode(barcode)) {
      const actionCode = barcode as BarcodeActionCode
      const action = BARCODE_ACTIONS[actionCode]

      if (action) {
        const result: ScanResult = {
          type: 'action',
          data: action,
          barcode,
          timestamp: new Date(),
        }

        setLastScan(result)
        setScanHistory(prev => [result, ...prev].slice(0, 50))
        playBeep('action')

        // Call registered action handler
        if (onActionScannedRef.current) {
          onActionScannedRef.current(actionCode)
        }

        success(`Action: ${action.label}`)
        return
      }
    }

    // Try to find product
    const product = await lookupProduct(barcode)

    if (product) {
      const result: ScanResult = {
        type: 'product',
        data: product,
        barcode,
        timestamp: new Date(),
      }

      setLastScan(result)
      setScanHistory(prev => [result, ...prev].slice(0, 50))
      playBeep('success')

      // Call registered callback
      if (onProductScannedRef.current) {
        onProductScannedRef.current(product)
      } else {
        // Default behavior - show toast
        success(`Found: ${product.name}`)
      }
    } else {
      const result: ScanResult = {
        type: 'unknown',
        data: null,
        barcode,
        timestamp: new Date(),
      }

      setLastScan(result)
      setScanHistory(prev => [result, ...prev].slice(0, 50))
      playBeep('error')
      showError(`Product not found: ${barcode}`)
    }
  }, [lookupProduct, success, showError])

  // Hook into global scanner
  const { isScanning } = useBarcodeScanner({
    onScan: processScan,
    onError: (err) => showError(err),
    enabled: isEnabled,
    minLength: 3,
  })

  // Manual scan input
  const processManualScan = useCallback(async (barcode: string) => {
    if (barcode.trim()) {
      await processScan(barcode.trim())
    }
  }, [processScan])

  const clearHistory = useCallback(() => {
    setScanHistory([])
    setLastScan(null)
  }, [])

  return (
    <ScannerContext.Provider
      value={{
        isEnabled,
        setEnabled,
        isScanning,
        lastScan,
        scanHistory,
        clearHistory,
        processManualScan,
        scanMode,
        setScanMode,
        onProductScanned: onProductScannedRef.current,
        setOnProductScanned,
        onActionScanned: onActionScannedRef.current,
        setOnActionScanned,
      }}
    >
      {children}
    </ScannerContext.Provider>
  )
}

export function useScanner() {
  const context = useContext(ScannerContext)
  if (!context) {
    throw new Error('useScanner must be used within a ScannerProvider')
  }
  return context
}
