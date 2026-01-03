'use client'

import { useState, useRef, useEffect } from 'react'
import { useScanner } from '@/context/ScannerContext'

interface BarcodeInputProps {
  onScan?: (barcode: string) => void
  placeholder?: string
  autoFocus?: boolean
  className?: string
  showHistory?: boolean
  showToggle?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function BarcodeInput({
  onScan,
  placeholder = 'Scan barcode or type SKU...',
  autoFocus = false,
  className = '',
  showHistory = false,
  showToggle = true,
  size = 'md',
}: BarcodeInputProps) {
  const { processManualScan, isScanning, lastScan, scanHistory, isEnabled, setEnabled } = useScanner()
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-focus on mount if requested
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      if (onScan) {
        onScan(inputValue.trim())
      } else {
        await processManualScan(inputValue.trim())
      }
      setInputValue('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Allow Tab to move focus
    if (e.key === 'Tab') return

    // Enter submits the form
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const sizeClasses = {
    sm: 'pl-8 pr-16 py-2 text-sm',
    md: 'pl-10 pr-20 py-3',
    lg: 'pl-12 pr-24 py-4 text-lg',
  }

  const iconSizeClasses = {
    sm: 'pl-2.5',
    md: 'pl-3',
    lg: 'pl-4',
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <div className={`absolute inset-y-0 left-0 flex items-center ${iconSizeClasses[size]} pointer-events-none`}>
            <i className={`fas fa-barcode ${isScanning ? 'text-emerald-400 animate-pulse' : 'text-slate-400'}`}></i>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            data-barcode-input="true"
            className={`w-full bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 ${sizeClasses[size]}`}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-2">
            {isScanning && (
              <span className="text-xs text-emerald-400 animate-pulse">Scanning...</span>
            )}
            {showToggle && (
              <button
                type="button"
                onClick={() => setEnabled(!isEnabled)}
                className={`p-1 rounded transition-colors ${isEnabled ? 'text-emerald-400 hover:text-emerald-300' : 'text-slate-500 hover:text-slate-400'}`}
                title={isEnabled ? 'Scanner enabled' : 'Scanner disabled'}
              >
                <i className={`fas ${isEnabled ? 'fa-toggle-on' : 'fa-toggle-off'}`}></i>
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Last Scan Result */}
      {lastScan && (
        <div className={`mt-2 p-2 rounded-lg text-sm ${
          lastScan.type === 'product'
            ? 'bg-emerald-500/10 border border-emerald-500/30'
            : lastScan.type === 'action'
            ? 'bg-blue-500/10 border border-blue-500/30'
            : 'bg-red-500/10 border border-red-500/30'
        }`}>
          {lastScan.type === 'product' ? (
            <div className="flex items-center gap-2">
              <i className="fas fa-check text-emerald-400"></i>
              <span className="text-white">{lastScan.data.name}</span>
              <span className="text-slate-400">({lastScan.barcode})</span>
            </div>
          ) : lastScan.type === 'action' ? (
            <div className="flex items-center gap-2">
              <i className={`fas ${lastScan.data.icon} text-blue-400`}></i>
              <span className="text-blue-400">{lastScan.data.label}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <i className="fas fa-times text-red-400"></i>
              <span className="text-red-400">Not found: {lastScan.barcode}</span>
            </div>
          )}
        </div>
      )}

      {/* Scan History */}
      {showHistory && scanHistory.length > 0 && (
        <div className="mt-3">
          <div className="text-xs text-slate-500 mb-1">Recent Scans</div>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {scanHistory.slice(0, 5).map((scan, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-slate-400"
              >
                <i className={`fas ${
                  scan.type === 'product' ? 'fa-check text-emerald-400' :
                  scan.type === 'action' ? `${scan.data?.icon || 'fa-bolt'} text-blue-400` :
                  'fa-times text-red-400'
                }`}></i>
                <span className="truncate flex-1">
                  {scan.type === 'product' ? scan.data?.name || scan.barcode :
                   scan.type === 'action' ? scan.data?.label :
                   scan.barcode}
                </span>
                <span className="text-slate-600 text-xs">
                  {scan.timestamp.toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
