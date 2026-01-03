'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface UseBarcodeSccannerOptions {
  onScan: (barcode: string) => void
  onError?: (error: string) => void
  minLength?: number        // Minimum barcode length (default: 4)
  maxDelay?: number         // Max ms between keystrokes to count as scan (default: 50)
  enabled?: boolean         // Enable/disable scanner (default: true)
  preventDefault?: boolean  // Prevent default on scan (default: true)
}

interface ScannerState {
  isScanning: boolean
  lastScan: string | null
  lastScanTime: Date | null
}

export function useBarcodeScanner({
  onScan,
  onError,
  minLength = 4,
  maxDelay = 50,
  enabled = true,
  preventDefault = true,
}: UseBarcodeSccannerOptions) {
  const [state, setState] = useState<ScannerState>({
    isScanning: false,
    lastScan: null,
    lastScanTime: null,
  })

  const bufferRef = useRef<string>('')
  const lastKeyTimeRef = useRef<number>(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const resetBuffer = useCallback(() => {
    bufferRef.current = ''
    setState(prev => ({ ...prev, isScanning: false }))
  }, [])

  const processBarcode = useCallback((barcode: string) => {
    const trimmedBarcode = barcode.trim()

    if (trimmedBarcode.length < minLength) {
      onError?.(`Barcode too short: ${trimmedBarcode}`)
      return
    }

    // Validate barcode (alphanumeric, hyphens, underscores, dots, colons for ACTION: prefix)
    if (!/^[a-zA-Z0-9\-_.:]+$/.test(trimmedBarcode)) {
      onError?.(`Invalid barcode format: ${trimmedBarcode}`)
      return
    }

    setState({
      isScanning: false,
      lastScan: trimmedBarcode,
      lastScanTime: new Date(),
    })

    onScan(trimmedBarcode)
  }, [minLength, onScan, onError])

  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't capture if user is typing in an input field (unless it's our barcode input)
      const target = event.target as HTMLElement
      const isInputField = target.tagName === 'INPUT' ||
                          target.tagName === 'TEXTAREA' ||
                          target.isContentEditable
      const isBarcodeInput = target.getAttribute('data-barcode-input') === 'true'

      // If in a regular input field (not barcode input), only capture fast typing
      if (isInputField && !isBarcodeInput) {
        return
      }

      const currentTime = Date.now()
      const timeDiff = currentTime - lastKeyTimeRef.current
      lastKeyTimeRef.current = currentTime

      // Clear any pending timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // If Enter is pressed, process the buffer
      if (event.key === 'Enter') {
        if (bufferRef.current.length >= minLength) {
          if (preventDefault) {
            event.preventDefault()
          }
          processBarcode(bufferRef.current)
        }
        resetBuffer()
        return
      }

      // Ignore non-printable keys
      if (event.key.length !== 1) return

      // If typing is too slow, it's manual typing - reset buffer
      if (timeDiff > maxDelay && bufferRef.current.length > 0) {
        resetBuffer()
      }

      // Add character to buffer
      bufferRef.current += event.key

      if (bufferRef.current.length === 1) {
        setState(prev => ({ ...prev, isScanning: true }))
      }

      // Set timeout to reset buffer if no more input
      timeoutRef.current = setTimeout(() => {
        resetBuffer()
      }, maxDelay * 3)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [enabled, minLength, maxDelay, preventDefault, processBarcode, resetBuffer])

  return {
    ...state,
    resetBuffer,
  }
}
