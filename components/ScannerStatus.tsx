'use client'

import { useScanner } from '@/context/ScannerContext'

interface ScannerStatusProps {
  showLastScan?: boolean
  compact?: boolean
  className?: string
}

export default function ScannerStatus({
  showLastScan = true,
  compact = false,
  className = '',
}: ScannerStatusProps) {
  const { isEnabled, setEnabled, isScanning, lastScan, scanMode } = useScanner()

  if (compact) {
    return (
      <button
        onClick={() => setEnabled(!isEnabled)}
        className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs transition-colors ${
          isEnabled
            ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
            : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
        } ${className}`}
        title={isEnabled ? 'Scanner enabled - click to disable' : 'Scanner disabled - click to enable'}
      >
        <i className={`fas fa-barcode ${isScanning ? 'animate-pulse' : ''}`}></i>
        {isScanning && <span className="hidden sm:inline">Scanning</span>}
      </button>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={() => setEnabled(!isEnabled)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
          isEnabled
            ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
            : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
        }`}
      >
        <i className={`fas fa-barcode ${isScanning ? 'animate-pulse' : ''}`}></i>
        <span>{isEnabled ? 'Scanner On' : 'Scanner Off'}</span>
      </button>

      {showLastScan && lastScan && (
        <div className={`text-xs px-2 py-1 rounded ${
          lastScan.type === 'product' ? 'text-emerald-400 bg-emerald-500/10' :
          lastScan.type === 'action' ? 'text-blue-400 bg-blue-500/10' :
          'text-red-400 bg-red-500/10'
        }`}>
          {lastScan.type === 'action'
            ? lastScan.data?.label
            : `Last: ${lastScan.barcode}`
          }
        </div>
      )}
    </div>
  )
}

// Minimal inline indicator for headers
export function ScannerIndicator() {
  const { isEnabled, isScanning } = useScanner()

  if (!isEnabled) return null

  return (
    <div
      className={`w-2 h-2 rounded-full ${
        isScanning
          ? 'bg-emerald-400 animate-pulse'
          : 'bg-emerald-500/50'
      }`}
      title="Barcode scanner active"
    />
  )
}
