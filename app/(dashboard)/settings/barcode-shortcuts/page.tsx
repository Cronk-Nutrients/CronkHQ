'use client'

import { useState, useRef } from 'react'
import Barcode from 'react-barcode'
import { BARCODE_ACTIONS, ACTION_CATEGORIES, BarcodeActionCode } from '@/lib/barcode-actions'
import { Button } from '@/components/ui/Button'

export default function BarcodeShortcutsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(Object.keys(ACTION_CATEGORIES))
  const [barcodeSize, setBarcodeSize] = useState<'small' | 'medium' | 'large'>('medium')
  const printRef = useRef<HTMLDivElement>(null)

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const selectAllCategories = () => {
    setSelectedCategories(Object.keys(ACTION_CATEGORIES))
  }

  const clearAllCategories = () => {
    setSelectedCategories([])
  }

  const handlePrint = () => {
    window.print()
  }

  const filteredActions = Object.entries(BARCODE_ACTIONS).filter(
    ([_, action]) => selectedCategories.includes(action.category)
  )

  const sizeConfig = {
    small: { width: 1, height: 30, fontSize: 8, columns: 'grid-cols-4 print:grid-cols-4' },
    medium: { width: 1.5, height: 40, fontSize: 10, columns: 'grid-cols-3 print:grid-cols-3' },
    large: { width: 2, height: 50, fontSize: 12, columns: 'grid-cols-2 print:grid-cols-2' },
  }

  const currentSize = sizeConfig[barcodeSize]

  return (
    <div className="p-6">
      {/* Header - hidden on print */}
      <div className="flex items-center justify-between mb-6 print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-white">Barcode Shortcuts</h1>
          <p className="text-slate-400 mt-1">
            Print these barcodes for quick actions during pick & pack workflows
          </p>
        </div>
        <Button onClick={handlePrint}>
          <i className="fas fa-print mr-2"></i>
          Print Sheet
        </Button>
      </div>

      {/* Instructions - hidden on print */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6 print:hidden">
        <div className="flex items-start gap-3">
          <i className="fas fa-info-circle text-blue-400 mt-0.5"></i>
          <div className="text-sm">
            <p className="text-blue-300 font-medium mb-2">How to use barcode shortcuts</p>
            <ol className="text-slate-400 space-y-1 list-decimal list-inside">
              <li>Select the categories you need below</li>
              <li>Print this page and cut out the barcodes</li>
              <li>Tape them near your packing station</li>
              <li>Scan any barcode to trigger that action instantly</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Controls - hidden on print */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 mb-6 print:hidden">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex-1">
            <label className="text-sm text-slate-400 mb-2 block">Categories</label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(ACTION_CATEGORIES).map(([key, { label, color }]) => (
                <button
                  key={key}
                  onClick={() => toggleCategory(key)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategories.includes(key)
                      ? `bg-${color}-500/20 text-${color}-400 border border-${color}-500/50`
                      : 'bg-slate-700 text-slate-400 border border-slate-600 hover:border-slate-500'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-700">
          <div className="flex gap-2">
            <button
              onClick={selectAllCategories}
              className="text-sm text-emerald-400 hover:text-emerald-300"
            >
              Select All
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={clearAllCategories}
              className="text-sm text-slate-400 hover:text-white"
            >
              Clear All
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Size:</span>
            {(['small', 'medium', 'large'] as const).map((size) => (
              <button
                key={size}
                onClick={() => setBarcodeSize(size)}
                className={`px-3 py-1 rounded text-sm capitalize ${
                  barcodeSize === size
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected count */}
      <div className="text-sm text-slate-400 mb-4 print:hidden">
        {filteredActions.length} barcodes selected
      </div>

      {/* Print Title - only visible on print */}
      <div className="hidden print:block text-center mb-4">
        <h1 className="text-xl font-bold text-black">WMS Barcode Shortcuts</h1>
        <p className="text-sm text-gray-600">Scan to trigger actions</p>
      </div>

      {/* Printable Barcode Grid */}
      <div
        ref={printRef}
        className={`grid gap-4 print:gap-2 ${currentSize.columns}`}
      >
        {filteredActions.map(([code, action]) => (
          <div
            key={code}
            className="bg-white rounded-lg p-4 text-center border border-slate-200 print:border print:border-gray-300 print:p-3"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <i className={`fas ${action.icon} text-gray-700 print:text-black`}></i>
              <span className="font-semibold text-gray-900 print:text-black text-sm">
                {action.label}
              </span>
            </div>
            <div className="flex justify-center barcode-container">
              <Barcode
                value={code}
                width={currentSize.width}
                height={currentSize.height}
                fontSize={currentSize.fontSize}
                margin={5}
                displayValue={false}
                background="#ffffff"
                lineColor="#000000"
              />
            </div>
            <div className="text-xs text-gray-500 mt-1 print:hidden">
              {action.description}
            </div>
          </div>
        ))}
      </div>

      {filteredActions.length === 0 && (
        <div className="text-center py-12 print:hidden">
          <i className="fas fa-barcode text-4xl text-slate-600 mb-3"></i>
          <p className="text-slate-400">Select categories above to see barcodes</p>
        </div>
      )}

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 0.5in;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
        }
      `}</style>
    </div>
  )
}
