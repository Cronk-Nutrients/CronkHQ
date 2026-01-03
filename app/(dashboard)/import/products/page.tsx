'use client'

import { useState, useCallback, useRef } from 'react'
import { db } from '@/lib/firebase'
import {
  collection, doc, getDocs, serverTimestamp, writeBatch
} from 'firebase/firestore'
import { useOrganization } from '@/context/OrganizationContext'
import { useToast } from '@/components/ui/Toast'
import { Button } from '@/components/ui/Button'
import { parseCSV, detectFieldMappings, getAvailableFields } from '@/lib/csv-parser'
import Link from 'next/link'

type ImportMode = 'add' | 'update' | 'upsert'
type MatchField = 'sku' | 'barcode' | 'name'
type ImportStep = 'upload' | 'configure' | 'mapping' | 'preview' | 'importing' | 'complete'

interface ImportStats {
  total: number
  added: number
  updated: number
  skipped: number
  errors: string[]
}

export default function ImportProductsPage() {
  const { organization } = useOrganization()
  const { success, error } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Step tracking
  const [step, setStep] = useState<ImportStep>('upload')

  // File data
  const [file, setFile] = useState<File | null>(null)
  const [rawData, setRawData] = useState<Record<string, string>[]>([])
  const [headers, setHeaders] = useState<string[]>([])

  // Configuration
  const [importMode, setImportMode] = useState<ImportMode>('add')
  const [matchField, setMatchField] = useState<MatchField>('sku')
  const [skipDuplicates, setSkipDuplicates] = useState(true)
  const [updateOnlyProvided, setUpdateOnlyProvided] = useState(true)

  // Field mappings
  const [fieldMappings, setFieldMappings] = useState<Record<string, string>>({})
  const [unmappedHeaders, setUnmappedHeaders] = useState<string[]>([])

  // Import state
  const [importing, setImporting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [stats, setStats] = useState<ImportStats | null>(null)

  // Available fields for mapping dropdown
  const availableFields = getAvailableFields()
  const fieldGroups = [...new Set(availableFields.map(f => f.group))]

  // Handle file selection
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)

    try {
      const text = await selectedFile.text()
      const { data, headers: csvHeaders } = parseCSV(text)

      if (data.length === 0) {
        error('CSV file is empty')
        return
      }

      setHeaders(csvHeaders)
      setRawData(data)

      // Auto-detect field mappings
      const { mappings, unmapped } = detectFieldMappings(csvHeaders)
      setFieldMappings(mappings)
      setUnmappedHeaders(unmapped)

      setStep('configure')
    } catch (err) {
      console.error('Error parsing CSV:', err)
      error('Failed to parse CSV file')
    }
  }

  // Handle drag and drop
  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && (droppedFile.name.endsWith('.csv') || droppedFile.name.endsWith('.txt'))) {
      // Create a synthetic event to reuse handleFileSelect logic
      const input = fileInputRef.current
      if (input) {
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(droppedFile)
        input.files = dataTransfer.files
        handleFileSelect({ target: input } as React.ChangeEvent<HTMLInputElement>)
      }
    }
  }, [])

  // Update field mapping
  const updateMapping = (header: string, field: string) => {
    if (field) {
      setFieldMappings(prev => ({
        ...prev,
        [header]: field,
      }))
      setUnmappedHeaders(prev => prev.filter(h => h !== header))
    } else {
      clearMapping(header)
    }
  }

  // Clear mapping
  const clearMapping = (header: string) => {
    setFieldMappings(prev => {
      const newMappings = { ...prev }
      delete newMappings[header]
      return newMappings
    })
    if (!unmappedHeaders.includes(header)) {
      setUnmappedHeaders(prev => [...prev, header])
    }
  }

  // Map CSV row to product object
  const mapRowToProduct = (row: Record<string, string>, mappings: Record<string, string>) => {
    const product: Record<string, any> = {
      // Defaults
      status: 'active',
      totalStock: 0,
      reservedStock: 0,
      availableStock: 0,
      lowStockThreshold: 10,
      reorderPoint: 10,
      requiresShipping: true,
      hasVariants: false,
      isBundle: false,
      isFBA: false,
      tags: [],
      images: [],
      locations: {},
    }

    // Apply mappings
    Object.entries(mappings).forEach(([header, field]) => {
      const value = row[header]?.trim()
      if (!value) return

      switch (field) {
        // Numbers (prices, weights, dimensions)
        case 'cost':
        case 'retailPrice':
        case 'wholesalePrice':
        case 'amazonPrice':
        case 'compareAtPrice':
        case 'weight':
        case 'length':
        case 'width':
        case 'height':
          const num = parseFloat(value.replace(/[$,]/g, ''))
          if (!isNaN(num)) product[field] = num
          break

        // Integers (quantities)
        case 'totalStock':
        case 'lowStockThreshold':
        case 'reorderPoint':
        case 'reorderQuantity':
          const int = parseInt(value.replace(/,/g, ''))
          if (!isNaN(int)) {
            product[field] = int
            if (field === 'totalStock') {
              product.availableStock = int - (product.reservedStock || 0)
            }
          }
          break

        // Arrays (comma-separated)
        case 'tags':
          product.tags = value.split(',').map(t => t.trim()).filter(Boolean)
          break

        // Status mapping
        case 'status':
          const statusLower = value.toLowerCase()
          if (['active', 'inactive', 'discontinued', 'draft'].includes(statusLower)) {
            product.status = statusLower
          } else if (['yes', 'true', '1', 'enabled'].includes(statusLower)) {
            product.status = 'active'
          } else if (['no', 'false', '0', 'disabled'].includes(statusLower)) {
            product.status = 'inactive'
          }
          break

        // Boolean fields
        case 'requiresShipping':
        case 'hasVariants':
        case 'isBundle':
        case 'isFBA':
          product[field] = ['yes', 'true', '1'].includes(value.toLowerCase())
          break

        // Location/bin handling - store for later processing
        case 'binLocation':
        case 'subLocation':
        case 'zone':
          if (!product._locationData) {
            product._locationData = {}
          }
          product._locationData[field] = value
          break

        // All other strings
        default:
          product[field] = value
      }
    })

    // Generate name if missing
    if (!product.name) {
      product.name = product.sku || product.barcode || `Imported Product ${Date.now()}`
    }

    return product
  }

  // Get only non-empty fields for partial updates
  const getProvidedFields = (data: Record<string, any>) => {
    const provided: Record<string, any> = {}
    Object.entries(data).forEach(([key, value]) => {
      // Skip internal fields
      if (key.startsWith('_')) return
      // Skip null/undefined/empty
      if (value !== null && value !== undefined && value !== '') {
        provided[key] = value
      }
    })
    return provided
  }

  // Process import
  const processImport = async () => {
    if (!organization?.id) {
      error('No organization selected')
      return
    }

    setImporting(true)
    setStep('importing')
    setProgress(0)

    const importStats: ImportStats = {
      total: rawData.length,
      added: 0,
      updated: 0,
      skipped: 0,
      errors: [],
    }

    try {
      const productsRef = collection(db, 'organizations', organization.id, 'products')

      // Get existing products for matching
      const existingProducts: Map<string, { id: string; data: any }> = new Map()

      if (importMode === 'update' || importMode === 'upsert' || (importMode === 'add' && skipDuplicates)) {
        const existingSnapshot = await getDocs(productsRef)
        existingSnapshot.forEach(docSnap => {
          const data = docSnap.data()

          // For update/upsert, index by match field
          if (importMode === 'update' || importMode === 'upsert') {
            const matchValue = data[matchField]?.toString().toLowerCase()
            if (matchValue) {
              existingProducts.set(matchValue, { id: docSnap.id, data })
            }
          }

          // For add mode with skip duplicates, index by both SKU and barcode
          if (importMode === 'add' && skipDuplicates) {
            if (data.sku) {
              existingProducts.set(`sku:${data.sku.toLowerCase()}`, { id: docSnap.id, data })
            }
            if (data.barcode) {
              existingProducts.set(`barcode:${data.barcode.toLowerCase()}`, { id: docSnap.id, data })
            }
          }
        })
      }

      // Process in batches of 500 (Firestore limit)
      const BATCH_SIZE = 500
      let batch = writeBatch(db)
      let batchCount = 0

      for (let i = 0; i < rawData.length; i++) {
        const row = rawData[i]

        try {
          // Map CSV row to product fields
          const productData = mapRowToProduct(row, fieldMappings)

          // Remove internal fields before saving
          delete productData._locationData

          // Check for match based on mode
          let existingProduct: { id: string; data: any } | undefined = undefined

          if (importMode === 'update' || importMode === 'upsert') {
            const matchValue = productData[matchField]?.toString().toLowerCase()
            if (matchValue) {
              existingProduct = existingProducts.get(matchValue)
            }
          }

          // Handle based on mode
          if (importMode === 'add') {
            // Check for duplicates
            if (skipDuplicates) {
              const skuKey = productData.sku ? `sku:${productData.sku.toLowerCase()}` : null
              const barcodeKey = productData.barcode ? `barcode:${productData.barcode.toLowerCase()}` : null

              if ((skuKey && existingProducts.has(skuKey)) || (barcodeKey && existingProducts.has(barcodeKey))) {
                importStats.skipped++
                setProgress(Math.round(((i + 1) / rawData.length) * 100))
                continue
              }
            }

            // Add new product
            const docRef = doc(productsRef)
            batch.set(docRef, {
              ...productData,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            })
            importStats.added++

            // Track newly added products to prevent duplicates within same import
            if (skipDuplicates) {
              if (productData.sku) {
                existingProducts.set(`sku:${productData.sku.toLowerCase()}`, { id: docRef.id, data: productData })
              }
              if (productData.barcode) {
                existingProducts.set(`barcode:${productData.barcode.toLowerCase()}`, { id: docRef.id, data: productData })
              }
            }
          }
          else if (importMode === 'update') {
            if (existingProduct) {
              // Update existing
              const updateData = updateOnlyProvided
                ? getProvidedFields(productData)
                : productData

              batch.update(doc(productsRef, existingProduct.id), {
                ...updateData,
                updatedAt: serverTimestamp(),
              })
              importStats.updated++
            } else {
              importStats.skipped++
            }
          }
          else if (importMode === 'upsert') {
            if (existingProduct) {
              // Update existing
              const updateData = updateOnlyProvided
                ? getProvidedFields(productData)
                : productData

              batch.update(doc(productsRef, existingProduct.id), {
                ...updateData,
                updatedAt: serverTimestamp(),
              })
              importStats.updated++
            } else {
              // Add new
              const docRef = doc(productsRef)
              batch.set(docRef, {
                ...productData,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
              })
              importStats.added++
            }
          }

          batchCount++

          // Commit batch when full
          if (batchCount >= BATCH_SIZE) {
            await batch.commit()
            batch = writeBatch(db)
            batchCount = 0
          }

        } catch (rowError: any) {
          importStats.errors.push(`Row ${i + 2}: ${rowError.message}`)
        }

        // Update progress
        setProgress(Math.round(((i + 1) / rawData.length) * 100))
      }

      // Commit remaining
      if (batchCount > 0) {
        await batch.commit()
      }

      setStats(importStats)
      setStep('complete')
      success(`Import complete: ${importStats.added} added, ${importStats.updated} updated`)

    } catch (err: any) {
      console.error('Import error:', err)
      error(`Import failed: ${err.message}`)
      importStats.errors.push(`Fatal error: ${err.message}`)
      setStats(importStats)
      setStep('complete')
    } finally {
      setImporting(false)
    }
  }

  // Reset import
  const resetImport = () => {
    setFile(null)
    setRawData([])
    setHeaders([])
    setFieldMappings({})
    setUnmappedHeaders([])
    setStats(null)
    setProgress(0)
    setStep('upload')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Step indicator
  const steps: { key: ImportStep; label: string }[] = [
    { key: 'upload', label: 'Upload' },
    { key: 'configure', label: 'Configure' },
    { key: 'mapping', label: 'Map Fields' },
    { key: 'preview', label: 'Preview' },
    { key: 'importing', label: 'Import' },
    { key: 'complete', label: 'Complete' },
  ]

  const currentStepIndex = steps.findIndex(s => s.key === step)

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/inventory"
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <i className="fas fa-arrow-left"></i>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Import Products</h1>
          <p className="text-slate-400 mt-1">Upload a CSV file to add or update products</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                step === s.key
                  ? 'bg-emerald-500 text-white'
                  : currentStepIndex > i
                    ? 'bg-emerald-500/30 text-emerald-400'
                    : 'bg-slate-700 text-slate-400'
              }`}>
                {currentStepIndex > i ? (
                  <i className="fas fa-check text-xs"></i>
                ) : (
                  i + 1
                )}
              </div>
              <span className="text-xs text-slate-500 mt-1 hidden sm:block">{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-8 sm:w-12 h-0.5 mx-1 ${currentStepIndex > i ? 'bg-emerald-500/50' : 'bg-slate-700'}`}></div>
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Upload */}
      {step === 'upload' && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
          <div
            className="border-2 border-dashed border-slate-600 rounded-xl p-12 text-center hover:border-emerald-500/50 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <i className="fas fa-cloud-upload-alt text-4xl text-slate-500 mb-4"></i>
            <h3 className="text-lg font-semibold text-white mb-2">Upload CSV File</h3>
            <p className="text-slate-400 mb-4">Drag and drop or click to browse</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.txt"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button>
              <i className="fas fa-file-csv mr-2"></i>
              Select File
            </Button>
          </div>

          <div className="mt-6 p-4 bg-slate-900/50 rounded-lg">
            <h4 className="text-white font-medium mb-2">Supported Formats</h4>
            <ul className="text-sm text-slate-400 space-y-1">
              <li><i className="fas fa-check text-emerald-400 mr-2"></i>CSV files exported from inFlow, Shopify, Excel, etc.</li>
              <li><i className="fas fa-check text-emerald-400 mr-2"></i>First row must be column headers</li>
              <li><i className="fas fa-check text-emerald-400 mr-2"></i>Products without SKU or Barcode are supported</li>
              <li><i className="fas fa-check text-emerald-400 mr-2"></i>HS Codes, bin locations, and dimensions supported</li>
            </ul>
          </div>
        </div>
      )}

      {/* Step 2: Configure */}
      {step === 'configure' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <i className="fas fa-file-csv text-emerald-400"></i>
              </div>
              <div>
                <div className="text-white font-medium">{file?.name}</div>
                <div className="text-sm text-slate-400">{rawData.length} products found</div>
              </div>
              <button
                onClick={resetImport}
                className="ml-auto text-slate-400 hover:text-red-400 transition-colors"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>

          {/* Import Mode */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Import Mode</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setImportMode('add')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  importMode === 'add'
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-slate-600 hover:border-slate-500'
                }`}
              >
                <i className={`fas fa-plus-circle text-2xl mb-2 ${importMode === 'add' ? 'text-emerald-400' : 'text-slate-400'}`}></i>
                <div className="text-white font-medium">Add Products</div>
                <div className="text-sm text-slate-400">Create new products only</div>
              </button>

              <button
                onClick={() => setImportMode('update')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  importMode === 'update'
                    ? 'border-amber-500 bg-amber-500/10'
                    : 'border-slate-600 hover:border-slate-500'
                }`}
              >
                <i className={`fas fa-sync-alt text-2xl mb-2 ${importMode === 'update' ? 'text-amber-400' : 'text-slate-400'}`}></i>
                <div className="text-white font-medium">Update Products</div>
                <div className="text-sm text-slate-400">Update existing products only</div>
              </button>

              <button
                onClick={() => setImportMode('upsert')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  importMode === 'upsert'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-600 hover:border-slate-500'
                }`}
              >
                <i className={`fas fa-exchange-alt text-2xl mb-2 ${importMode === 'upsert' ? 'text-blue-400' : 'text-slate-400'}`}></i>
                <div className="text-white font-medium">Add & Update</div>
                <div className="text-sm text-slate-400">Create new, update existing</div>
              </button>
            </div>
          </div>

          {/* Match Field (for update modes) */}
          {(importMode === 'update' || importMode === 'upsert') && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Match Products By</h3>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setMatchField('sku')}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    matchField === 'sku'
                      ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                      : 'border-slate-600 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <i className="fas fa-hashtag mr-2"></i>
                  SKU
                </button>
                <button
                  onClick={() => setMatchField('barcode')}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    matchField === 'barcode'
                      ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                      : 'border-slate-600 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <i className="fas fa-barcode mr-2"></i>
                  Barcode
                </button>
                <button
                  onClick={() => setMatchField('name')}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    matchField === 'name'
                      ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                      : 'border-slate-600 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <i className="fas fa-tag mr-2"></i>
                  Product Name
                </button>
              </div>
              <p className="text-sm text-slate-400 mt-3">
                Products in your CSV will be matched to existing products using this field.
              </p>
            </div>
          )}

          {/* Options */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Options</h3>
            <div className="space-y-3">
              {importMode === 'add' && (
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={skipDuplicates}
                    onChange={(e) => setSkipDuplicates(e.target.checked)}
                    className="w-5 h-5 mt-0.5 rounded border-slate-600 bg-slate-800 text-emerald-500 focus:ring-emerald-500"
                  />
                  <div>
                    <div className="text-white">Skip duplicates</div>
                    <div className="text-sm text-slate-400">Skip rows if SKU or barcode already exists in your inventory</div>
                  </div>
                </label>
              )}

              {(importMode === 'update' || importMode === 'upsert') && (
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={updateOnlyProvided}
                    onChange={(e) => setUpdateOnlyProvided(e.target.checked)}
                    className="w-5 h-5 mt-0.5 rounded border-slate-600 bg-slate-800 text-emerald-500 focus:ring-emerald-500"
                  />
                  <div>
                    <div className="text-white">Only update provided fields</div>
                    <div className="text-sm text-slate-400">Empty cells in CSV won't clear existing product values</div>
                  </div>
                </label>
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="secondary" onClick={resetImport}>
              <i className="fas fa-arrow-left mr-2"></i>
              Back
            </Button>
            <Button onClick={() => setStep('mapping')}>
              Continue to Field Mapping
              <i className="fas fa-arrow-right ml-2"></i>
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Field Mapping */}
      {step === 'mapping' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-2">Field Mapping</h3>
            <p className="text-slate-400 mb-6">
              We've automatically detected some field mappings. Review and adjust as needed.
            </p>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {headers.map(header => {
                const mappedField = fieldMappings[header]
                return (
                  <div key={header} className="flex items-center gap-4 p-3 bg-slate-900/50 rounded-lg">
                    <div className="w-1/3 min-w-0">
                      <div className="text-white font-medium truncate" title={header}>{header}</div>
                      <div className="text-xs text-slate-500 truncate" title={rawData[0]?.[header] || '(empty)'}>
                        Sample: {rawData[0]?.[header] || '(empty)'}
                      </div>
                    </div>
                    <i className="fas fa-arrow-right text-slate-500 flex-shrink-0"></i>
                    <div className="flex-1 min-w-0">
                      <select
                        value={mappedField || ''}
                        onChange={(e) => updateMapping(header, e.target.value)}
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="">-- Skip this column --</option>
                        {fieldGroups.map(group => (
                          <optgroup key={group} label={group}>
                            {availableFields
                              .filter(f => f.group === group)
                              .map(f => (
                                <option key={f.value} value={f.value}>{f.label}</option>
                              ))
                            }
                          </optgroup>
                        ))}
                      </select>
                    </div>
                    {mappedField && (
                      <span className="text-emerald-400 flex-shrink-0">
                        <i className="fas fa-check-circle"></i>
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-2">Mapping Summary</h3>
            <div className="flex gap-6 text-sm">
              <div>
                <span className="text-emerald-400 font-bold">{Object.keys(fieldMappings).length}</span>
                <span className="text-slate-400 ml-1">fields mapped</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold">{headers.length - Object.keys(fieldMappings).length}</span>
                <span className="text-slate-400 ml-1">fields skipped</span>
              </div>
            </div>

            {/* Check if essential fields are mapped */}
            {!fieldMappings[headers.find(h => fieldMappings[h] === 'name') || ''] && (
              <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <div className="flex items-center gap-2 text-amber-400 text-sm">
                  <i className="fas fa-exclamation-triangle"></i>
                  <span>No "Product Name" column mapped. Products will be named using SKU or barcode.</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <Button variant="secondary" onClick={() => setStep('configure')}>
              <i className="fas fa-arrow-left mr-2"></i>
              Back
            </Button>
            <Button onClick={() => setStep('preview')}>
              Preview Import
              <i className="fas fa-arrow-right ml-2"></i>
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Preview */}
      {step === 'preview' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Preview (First 5 Products)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-2 px-3 text-slate-400 font-medium">Name</th>
                    <th className="text-left py-2 px-3 text-slate-400 font-medium">SKU</th>
                    <th className="text-left py-2 px-3 text-slate-400 font-medium">Barcode</th>
                    <th className="text-right py-2 px-3 text-slate-400 font-medium">Price</th>
                    <th className="text-right py-2 px-3 text-slate-400 font-medium">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {rawData.slice(0, 5).map((row, i) => {
                    const product = mapRowToProduct(row, fieldMappings)
                    return (
                      <tr key={i} className="border-b border-slate-700/50">
                        <td className="py-2 px-3 text-white truncate max-w-[200px]" title={product.name}>
                          {product.name || '(no name)'}
                        </td>
                        <td className="py-2 px-3 text-slate-300 font-mono text-xs">{product.sku || '-'}</td>
                        <td className="py-2 px-3 text-slate-300 font-mono text-xs">{product.barcode || '-'}</td>
                        <td className="py-2 px-3 text-emerald-400 text-right">
                          {product.retailPrice ? `$${product.retailPrice.toFixed(2)}` : '-'}
                        </td>
                        <td className="py-2 px-3 text-slate-300 text-right">{product.totalStock || 0}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            {rawData.length > 5 && (
              <div className="text-center mt-4 text-sm text-slate-400">
                ...and {rawData.length - 5} more products
              </div>
            )}
          </div>

          {/* Import Summary */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Import Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-slate-400">Total Products</div>
                <div className="text-2xl font-bold text-white">{rawData.length}</div>
              </div>
              <div>
                <div className="text-sm text-slate-400">Import Mode</div>
                <div className="text-lg font-medium text-white capitalize">{importMode === 'upsert' ? 'Add & Update' : importMode}</div>
              </div>
              {(importMode === 'update' || importMode === 'upsert') && (
                <div>
                  <div className="text-sm text-slate-400">Match By</div>
                  <div className="text-lg font-medium text-white capitalize">{matchField}</div>
                </div>
              )}
              <div>
                <div className="text-sm text-slate-400">Fields Mapped</div>
                <div className="text-lg font-medium text-white">{Object.keys(fieldMappings).length}</div>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="secondary" onClick={() => setStep('mapping')}>
              <i className="fas fa-arrow-left mr-2"></i>
              Back
            </Button>
            <Button onClick={processImport}>
              <i className="fas fa-upload mr-2"></i>
              Start Import
            </Button>
          </div>
        </div>
      )}

      {/* Step 5: Importing */}
      {step === 'importing' && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-white mb-2">Importing Products...</h3>
          <p className="text-slate-400 mb-6">Please don't close this page</p>

          <div className="max-w-md mx-auto">
            <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
              <div
                className="bg-emerald-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-sm text-slate-400">{progress}% complete</div>
          </div>
        </div>
      )}

      {/* Step 6: Complete */}
      {step === 'complete' && stats && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-check text-3xl text-emerald-400"></i>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Import Complete!</h3>

            <div className="flex justify-center gap-8 mt-6">
              <div>
                <div className="text-3xl font-bold text-emerald-400">{stats.added}</div>
                <div className="text-sm text-slate-400">Added</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-400">{stats.updated}</div>
                <div className="text-sm text-slate-400">Updated</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-400">{stats.skipped}</div>
                <div className="text-sm text-slate-400">Skipped</div>
              </div>
            </div>
          </div>

          {/* Errors */}
          {stats.errors.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
              <h3 className="text-red-400 font-semibold mb-2">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                {stats.errors.length} {stats.errors.length === 1 ? 'Error' : 'Errors'}
              </h3>
              <div className="max-h-40 overflow-y-auto text-sm text-red-300 space-y-1">
                {stats.errors.map((err, i) => (
                  <div key={i}>{err}</div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center gap-4">
            <Button variant="secondary" onClick={resetImport}>
              <i className="fas fa-upload mr-2"></i>
              Import More
            </Button>
            <Link href="/inventory">
              <Button>
                <i className="fas fa-boxes mr-2"></i>
                View Inventory
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
