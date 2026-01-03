'use client'

import { useState, useRef, useEffect } from 'react'
import { db } from '@/lib/firebase'
import {
  collection, doc, writeBatch, getDoc, getDocs, serverTimestamp
} from 'firebase/firestore'
import { useAuth } from '@/context/AuthContext'
import { useOrganization } from '@/context/OrganizationContext'
import { useToast } from '@/components/ui/Toast'
import { Button } from '@/components/ui/Button'

type ImportType = 'products' | 'inventory'
type ImportMode = 'add' | 'update' | 'both'
type Step = 'type' | 'upload' | 'mapping' | 'preview' | 'importing'

interface ParsedRow {
  [key: string]: string
}

interface CustomPriceField {
  id: string
  name: string
  key: string
  currency: 'USD' | 'CAD' | 'EUR' | 'GBP' | 'MXN'
  isActive: boolean
}

interface FieldOption {
  value: string
  label: string
  section: string
  required?: boolean
  isCustomPrice?: boolean
}

// Standard app fields for products
const STANDARD_PRODUCT_FIELDS: FieldOption[] = [
  // Basic Info
  { value: 'name', label: 'Product Name', section: 'Basic Info', required: true },
  { value: 'sku', label: 'SKU', section: 'Basic Info', required: true },
  { value: 'category', label: 'Category', section: 'Basic Info' },
  { value: 'itemType', label: 'Item Type', section: 'Basic Info' },
  { value: 'description', label: 'Description', section: 'Basic Info' },
  { value: 'barcode', label: 'Barcode / UPC', section: 'Basic Info' },
  { value: 'notes', label: 'Notes / Remarks', section: 'Basic Info' },
  { value: 'isActive', label: 'Is Active', section: 'Basic Info' },

  // Standard Pricing
  { value: 'cost', label: 'Cost', section: 'Standard Pricing' },
  { value: 'retailPrice', label: 'Retail Price (MSRP)', section: 'Standard Pricing' },

  // Physical Attributes
  { value: 'weight', label: 'Weight (lbs)', section: 'Physical' },
  { value: 'length', label: 'Length (in)', section: 'Physical' },
  { value: 'width', label: 'Width (in)', section: 'Physical' },
  { value: 'height', label: 'Height (in)', section: 'Physical' },

  // Units of Measure
  { value: 'uom', label: 'Base Unit (UOM)', section: 'Units' },
  { value: 'salesUom', label: 'Sales Unit', section: 'Units' },
  { value: 'purchasingUom', label: 'Purchasing Unit', section: 'Units' },
  { value: 'casePackQty', label: 'Units per Case', section: 'Units' },

  // Supplier
  { value: 'supplierName', label: 'Supplier Name', section: 'Supplier' },
  { value: 'supplierSku', label: 'Supplier SKU / Vendor Code', section: 'Supplier' },
  { value: 'supplierPrice', label: 'Supplier Price', section: 'Supplier' },

  // Customs & Compliance
  { value: 'hsCode', label: 'HS Code', section: 'Customs' },
  { value: 'countryOfOrigin', label: 'Country of Origin', section: 'Customs' },
]

// Standard app fields for inventory
const STANDARD_INVENTORY_FIELDS: FieldOption[] = [
  { value: 'sku', label: 'SKU', section: 'Required', required: true },
  { value: 'productName', label: 'Product Name', section: 'Info' },
  { value: 'locationName', label: 'Location', section: 'Required', required: true },
  { value: 'sublocation', label: 'Sublocation / Bin', section: 'Info' },
  { value: 'quantity', label: 'Quantity', section: 'Required', required: true },
]

// Known column mappings for auto-detection (inFlow format)
const KNOWN_MAPPINGS: Record<string, string> = {
  'productname': 'name',
  'product name': 'name',
  'product title': 'name',
  'title': 'name',
  'name': 'name',
  'sku': 'sku',
  'item sku': 'sku',
  'category': 'category',
  'itemtype': 'itemType',
  'item type': 'itemType',
  'description': 'description',
  'barcode': 'barcode',
  'upc': 'barcode',
  'upc code': 'barcode',
  'cost': 'cost',
  'unit cost': 'cost',
  'purchase cost': 'cost',
  'msrp': 'retailPrice',
  'msrp usd': 'retailPrice',
  'retail price': 'retailPrice',
  'price': 'retailPrice',
  'sale price': 'retailPrice',
  'productweight': 'weight',
  'product weight': 'weight',
  'weight': 'weight',
  'weight lbs': 'weight',
  'productlength': 'length',
  'product length': 'length',
  'length': 'length',
  'productwidth': 'width',
  'product width': 'width',
  'width': 'width',
  'productheight': 'height',
  'product height': 'height',
  'height': 'height',
  'lastvendor': 'supplierName',
  'vendor': 'supplierName',
  'supplier': 'supplierName',
  'supplier name': 'supplierName',
  'vendorproductcode': 'supplierSku',
  'vendor sku': 'supplierSku',
  'supplier sku': 'supplierSku',
  'vendorprice': 'supplierPrice',
  'supplier price': 'supplierPrice',
  'hscode': 'hsCode',
  'hs code': 'hsCode',
  'countryoforigin': 'countryOfOrigin',
  'country of origin': 'countryOfOrigin',
  'country': 'countryOfOrigin',
  'origin': 'countryOfOrigin',
  'uom': 'uom',
  'unit': 'uom',
  'purchasinguomratio2': 'casePackQty',
  'case pack': 'casePackQty',
  'pack qty': 'casePackQty',
  'remarks': 'notes',
  'notes': 'notes',
  'isactive': 'isActive',
  'active': 'isActive',
  'status': 'isActive',
  // Inventory fields
  'location': 'locationName',
  'warehouse': 'locationName',
  'sublocation': 'sublocation',
  'bin': 'sublocation',
  'quantity': 'quantity',
  'qty': 'quantity',
  'stock': 'quantity',
  'on hand': 'quantity',
  'quantity on hand': 'quantity',
}

interface ImportCSVModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ImportCSVModal({ isOpen, onClose }: ImportCSVModalProps) {
  const { user } = useAuth()
  const { organization } = useOrganization()
  const { success, error } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // State
  const [step, setStep] = useState<Step>('type')
  const [importType, setImportType] = useState<ImportType>('products')
  const [importMode, setImportMode] = useState<ImportMode>('both')
  const [fileName, setFileName] = useState('')
  const [csvHeaders, setCsvHeaders] = useState<string[]>([])
  const [csvData, setCsvData] = useState<ParsedRow[]>([])
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({})
  const [parsedData, setParsedData] = useState<any[]>([])
  const [customPriceFields, setCustomPriceFields] = useState<CustomPriceField[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [importProgress, setImportProgress] = useState({ current: 0, total: 0 })
  const [existingProducts, setExistingProducts] = useState<Set<string>>(new Set())

  // Load custom price fields from organization settings
  useEffect(() => {
    if (!organization?.id) return

    const loadCustomPriceFields = async () => {
      try {
        const orgDoc = await getDoc(doc(db, 'organizations', organization.id))
        if (orgDoc.exists()) {
          const data = orgDoc.data()
          setCustomPriceFields(data.customPriceFields || [])
        }
      } catch (err) {
        console.error('Error loading custom price fields:', err)
      }
    }

    loadCustomPriceFields()
  }, [organization?.id])

  // Load existing products for duplicate detection
  useEffect(() => {
    if (!organization?.id || step !== 'mapping') return

    const loadExistingProducts = async () => {
      const productsRef = collection(db, 'organizations', organization.id, 'products')
      const snapshot = await getDocs(productsRef)
      const skus = new Set<string>()
      snapshot.docs.forEach(doc => {
        const data = doc.data()
        if (data.sku) skus.add(data.sku.toLowerCase())
      })
      setExistingProducts(skus)
    }

    if (importType === 'products') {
      loadExistingProducts()
    }
  }, [organization?.id, step, importType])

  // Build field options including custom price fields
  const getFieldOptions = (): FieldOption[] => {
    const baseFields = importType === 'products'
      ? [...STANDARD_PRODUCT_FIELDS]
      : [...STANDARD_INVENTORY_FIELDS]

    // Add custom price fields for products
    if (importType === 'products' && customPriceFields.length > 0) {
      const customFields = customPriceFields
        .filter(f => f.isActive)
        .map(f => ({
          value: `customPrice_${f.key}`,
          label: `${f.name} (${f.currency})`,
          section: 'Custom Pricing',
          isCustomPrice: true,
        }))

      // Insert custom pricing after standard pricing
      const pricingIndex = baseFields.findIndex(f => f.section === 'Physical')
      if (pricingIndex > -1) {
        baseFields.splice(pricingIndex, 0, ...customFields)
      } else {
        baseFields.push(...customFields)
      }
    }

    return baseFields
  }

  // Group fields by section for dropdown
  const getGroupedFields = (): Record<string, FieldOption[]> => {
    const fields = getFieldOptions()
    const grouped: Record<string, FieldOption[]> = {}

    fields.forEach(field => {
      if (!grouped[field.section]) {
        grouped[field.section] = []
      }
      grouped[field.section].push(field)
    })

    return grouped
  }

  // Parse a single CSV line handling quotes
  const parseCSVLine = (line: string): string[] => {
    const values: string[] = []
    let current = ''
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      const nextChar = line[i + 1]

      if (char === '"' && inQuotes && nextChar === '"') {
        current += '"'
        i++
      } else if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    values.push(current.trim())

    return values
  }

  // Parse CSV text
  const parseCSV = (text: string): ParsedRow[] => {
    // Remove BOM if present (handles UTF-8 BOM from Excel/inFlow)
    const cleanText = text.replace(/^\uFEFF/, '').replace(/^\xEF\xBB\xBF/, '')

    const lines = cleanText.split(/\r?\n/).filter(line => line.trim())
    if (lines.length < 2) return []

    // Parse header row and strip quotes from header names
    const rawHeaders = parseCSVLine(lines[0])
    const headers = rawHeaders.map(h => h.replace(/^["']|["']$/g, '').trim())

    // Parse data rows
    const rows: ParsedRow[] = []
    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i])
      if (values.length === 0) continue

      const row: ParsedRow = {}
      headers.forEach((header, index) => {
        // Strip quotes from values too
        const value = (values[index] || '').replace(/^["']|["']$/g, '').trim()
        row[header] = value
      })
      rows.push(row)
    }

    return rows
  }

  // Auto-map columns based on known mappings
  const autoMapColumns = (headers: string[], data: ParsedRow[]): Record<string, string> => {
    const mapping: Record<string, string> = {}
    const usedFields = new Set<string>()
    const fields = getFieldOptions()
    const validFieldKeys = new Set(fields.map(f => f.value))

    headers.forEach(header => {
      const lowerHeader = header.toLowerCase().trim()

      // Check known mappings first
      if (KNOWN_MAPPINGS[lowerHeader] && validFieldKeys.has(KNOWN_MAPPINGS[lowerHeader])) {
        const fieldKey = KNOWN_MAPPINGS[lowerHeader]
        if (!usedFields.has(fieldKey)) {
          mapping[header] = fieldKey
          usedFields.add(fieldKey)
          return
        }
      }

      // Check for custom price field matches
      customPriceFields.forEach(cpf => {
        const customKey = `customPrice_${cpf.key}`
        if (!usedFields.has(customKey)) {
          const cpfLower = cpf.name.toLowerCase()
          if (lowerHeader === cpfLower ||
              lowerHeader.includes(cpfLower) ||
              cpfLower.includes(lowerHeader)) {
            mapping[header] = customKey
            usedFields.add(customKey)
          }
        }
      })
    })

    return mapping
  }

  // Handle file selection
  const handleFileSelect = (file: File) => {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      error('Please select a CSV file')
      return
    }

    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const rows = parseCSV(text)

      if (rows.length === 0) {
        error('Could not parse CSV file or file is empty')
        return
      }

      const headers = Object.keys(rows[0])
      setCsvHeaders(headers)
      setCsvData(rows)

      // Auto-detect import type
      const lowerHeaders = headers.map(h => h.toLowerCase())
      const hasLocation = lowerHeaders.some(h => h.includes('location'))
      const hasCost = lowerHeaders.some(h => h.includes('cost') || h.includes('price'))
      const hasQuantity = lowerHeaders.some(h => h.includes('quantity') || h.includes('qty') || h.includes('stock'))

      // If has location + quantity but no cost, likely inventory
      if (hasLocation && hasQuantity && !hasCost) {
        setImportType('inventory')
      }

      // Auto-map columns
      const autoMapping = autoMapColumns(headers, rows)
      setColumnMapping(autoMapping)

      setStep('mapping')
    }
    reader.readAsText(file)
  }

  // Handle mapping change
  const handleMappingChange = (csvColumn: string, appField: string) => {
    setColumnMapping(prev => {
      const newMapping = { ...prev }

      if (appField === '') {
        // "Don't Import" selected - remove mapping
        delete newMapping[csvColumn]
      } else {
        // Remove any existing mapping to this app field
        Object.keys(newMapping).forEach(key => {
          if (newMapping[key] === appField && key !== csvColumn) {
            delete newMapping[key]
          }
        })
        newMapping[csvColumn] = appField
      }

      return newMapping
    })
  }

  // Validate mapping before proceeding
  const validateMapping = (): boolean => {
    const fields = getFieldOptions()
    const requiredFields = fields.filter(f => f.required).map(f => f.value)
    const mappedFields = Object.values(columnMapping)

    const missingRequired = requiredFields.filter(f => !mappedFields.includes(f))

    if (missingRequired.length > 0) {
      const fieldLabels = missingRequired.map(f => {
        const field = fields.find(af => af.value === f)
        return field?.label || f
      })
      error(`Please map required fields: ${fieldLabels.join(', ')}`)
      return false
    }

    return true
  }

  // Apply mapping and generate parsed data
  const applyMappingAndParse = () => {
    const mapped = csvData.map(row => {
      const result: any = {}

      // Apply column mapping
      Object.entries(columnMapping).forEach(([csvCol, appField]) => {
        if (appField && row[csvCol] !== undefined && row[csvCol] !== '') {
          result[appField] = row[csvCol]
        }
      })

      // Skip if no SKU
      if (!result.sku || result.sku.trim() === '') return null

      // Parse number fields
      const numberFields = [
        'cost', 'retailPrice', 'weight', 'length', 'width', 'height',
        'casePackQty', 'supplierPrice', 'quantity'
      ]
      // Add custom price fields
      customPriceFields.forEach(cpf => {
        numberFields.push(`customPrice_${cpf.key}`)
      })

      numberFields.forEach(field => {
        if (result[field]) {
          const parsed = parseFloat(result[field])
          result[field] = isNaN(parsed) ? 0 : parsed
        }
      })

      // Parse boolean fields
      const booleanFields = ['isActive']
      booleanFields.forEach(field => {
        if (result[field] !== undefined) {
          const val = result[field].toString().toLowerCase()
          result[field] = val === 'true' || val === 'yes' || val === '1'
        }
      })

      // Check if exists
      if (importType === 'products') {
        result._exists = existingProducts.has(result.sku.toLowerCase())
      }

      return result
    }).filter(Boolean)

    setParsedData(mapped)
  }

  // Handle proceed to preview
  const handleProceedToPreview = () => {
    if (!validateMapping()) return
    applyMappingAndParse()
    setStep('preview')
  }

  // Import products to Firestore
  const importProducts = async () => {
    if (!organization?.id || !user) return

    setIsImporting(true)
    setImportProgress({ current: 0, total: parsedData.length })

    let imported = 0
    let updated = 0
    let skipped = 0

    const BATCH_SIZE = 400
    const productsRef = collection(db, 'organizations', organization.id, 'products')

    try {
      for (let i = 0; i < parsedData.length; i += BATCH_SIZE) {
        const batch = writeBatch(db)
        const chunk = parsedData.slice(i, i + BATCH_SIZE)

        for (const product of chunk) {
          const exists = product._exists

          // Check import mode
          if (importMode === 'add' && exists) {
            skipped++
            continue
          }
          if (importMode === 'update' && !exists) {
            skipped++
            continue
          }

          // Create safe document ID from SKU
          const docId = product.sku.replace(/[\/\\#\[\].]/g, '_')
          const productRef = doc(productsRef, docId)

          // Build document data
          const docData: Record<string, any> = {
            name: product.name || product.sku,
            sku: product.sku,
            category: product.category || 'Uncategorized',
            itemType: product.itemType || 'Stocked product',
            description: product.description || '',
            barcode: product.barcode || null,
            notes: product.notes || null,
            status: product.isActive !== false ? 'active' : 'inactive',

            // Pricing
            cost: { rolling: product.cost || 0 },
            prices: {
              msrp: product.retailPrice || 0,
            },

            // Custom pricing fields
            customPrices: {},

            // Dimensions
            dimensions: {
              length: product.length || 0,
              width: product.width || 0,
              height: product.height || 0,
              unit: 'in',
            },
            weight: { value: product.weight || 0, unit: 'lb' },

            // Units
            uom: product.uom || 'Each',
            salesUom: product.salesUom || product.uom || 'Each',
            purchasingUom: product.purchasingUom || 'Case',
            casePackQty: product.casePackQty || null,

            // Supplier
            supplier: product.supplierName || null,
            supplierSku: product.supplierSku || null,
            supplierPrice: product.supplierPrice || null,

            // Customs
            hsCode: product.hsCode || null,
            countryOfOrigin: product.countryOfOrigin || null,

            // Inventory defaults
            totalStock: 0,
            availableStock: 0,
            reservedStock: 0,
            reorderPoint: 10,

            updatedAt: serverTimestamp(),
            source: 'csv_import',
          }

          // Add custom price values
          customPriceFields.forEach(cpf => {
            const key = `customPrice_${cpf.key}`
            if (product[key] !== undefined) {
              docData.customPrices[cpf.key] = {
                value: product[key],
                currency: cpf.currency,
              }
            }
          })

          if (!exists) {
            docData.createdAt = serverTimestamp()
            docData.createdBy = user.uid
            imported++
          } else {
            updated++
          }

          batch.set(productRef, docData, { merge: true })
        }

        await batch.commit()
        setImportProgress({ current: Math.min(i + BATCH_SIZE, parsedData.length), total: parsedData.length })
      }

      success(`Import complete! ${imported} added, ${updated} updated, ${skipped} skipped`)
      setTimeout(() => {
        handleClose()
      }, 1500)

    } catch (err) {
      console.error('Import error:', err)
      error('Failed to import products')
    } finally {
      setIsImporting(false)
    }
  }

  // Import inventory to Firestore
  const importInventory = async () => {
    if (!organization?.id || !user) return

    setIsImporting(true)
    setImportProgress({ current: 0, total: parsedData.length })

    try {
      const locationsRef = collection(db, 'organizations', organization.id, 'locations')
      const inventoryRef = collection(db, 'organizations', organization.id, 'inventory')
      const productsRef = collection(db, 'organizations', organization.id, 'products')

      // Get or create locations
      const locationMap = new Map<string, string>()
      const locSnapshot = await getDocs(locationsRef)
      locSnapshot.docs.forEach(doc => {
        locationMap.set(doc.data().name.toLowerCase(), doc.id)
      })

      // Group by SKU to aggregate totals
      const skuTotals = new Map<string, number>()

      const BATCH_SIZE = 400
      let processed = 0

      for (let i = 0; i < parsedData.length; i += BATCH_SIZE) {
        const batch = writeBatch(db)
        const chunk = parsedData.slice(i, i + BATCH_SIZE)

        for (const record of chunk) {
          const locationName = record.locationName?.trim()
          if (!locationName) continue

          // Get or create location
          let locationId = locationMap.get(locationName.toLowerCase())
          if (!locationId) {
            const newLocRef = doc(locationsRef)
            locationId = newLocRef.id
            batch.set(newLocRef, {
              name: locationName,
              type: locationName.toLowerCase().includes('amazon') ? 'fba' : 'warehouse',
              isActive: true,
              createdAt: serverTimestamp(),
            })
            locationMap.set(locationName.toLowerCase(), locationId)
          }

          // Create inventory record
          const qty = Math.max(0, record.quantity || 0)
          const invDocId = `${record.sku.replace(/[\/\\#\[\].]/g, '_')}_${locationId}`
          const invRef = doc(inventoryRef, invDocId)

          batch.set(invRef, {
            sku: record.sku,
            productId: record.sku.replace(/[\/\\#\[\].]/g, '_'),
            productName: record.productName || record.sku,
            locationId,
            locationName,
            binLocation: record.sublocation || null,
            quantity: qty,
            updatedAt: serverTimestamp(),
          }, { merge: true })

          // Track totals
          const currentTotal = skuTotals.get(record.sku) || 0
          skuTotals.set(record.sku, currentTotal + qty)
        }

        await batch.commit()
        processed += chunk.length
        setImportProgress({ current: processed, total: parsedData.length })
      }

      // Update product totalStock values
      const stockBatch = writeBatch(db)
      let stockUpdates = 0
      for (const [sku, total] of skuTotals) {
        const docId = sku.replace(/[\/\\#\[\].]/g, '_')
        const productRef = doc(productsRef, docId)
        stockBatch.update(productRef, {
          totalStock: total,
          availableStock: total,
          updatedAt: serverTimestamp(),
        })
        stockUpdates++

        if (stockUpdates >= 400) {
          await stockBatch.commit()
          stockUpdates = 0
        }
      }
      if (stockUpdates > 0) {
        await stockBatch.commit()
      }

      success(`Import complete! ${parsedData.length} inventory records imported`)
      setTimeout(() => {
        handleClose()
      }, 1500)

    } catch (err) {
      console.error('Import error:', err)
      error('Failed to import inventory')
    } finally {
      setIsImporting(false)
    }
  }

  // Handle close
  const handleClose = () => {
    setStep('type')
    setFileName('')
    setCsvHeaders([])
    setCsvData([])
    setColumnMapping({})
    setParsedData([])
    setImportProgress({ current: 0, total: 0 })
    onClose()
  }

  // Drag and drop handlers
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  // Get sample data for a column (first non-empty value)
  const getSampleData = (columnName: string): string => {
    for (const row of csvData.slice(0, 10)) { // Check first 10 rows
      const value = row[columnName]
      if (value && value.trim()) {
        // Truncate long values
        return value.length > 30 ? value.substring(0, 30) + '...' : value
      }
    }
    return '(empty)'
  }

  if (!isOpen) return null

  // Render type selection step
  const renderTypeStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">What would you like to import?</h3>
        <p className="text-slate-400 text-sm">Choose the type of data you're importing</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => { setImportType('products'); setStep('upload') }}
          className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-emerald-500/50 hover:bg-slate-800 transition-all text-left group"
        >
          <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-500/30 transition-colors">
            <i className="fas fa-boxes text-emerald-400 text-xl"></i>
          </div>
          <h4 className="text-white font-medium mb-1">Product Details</h4>
          <p className="text-slate-400 text-sm">Names, SKUs, prices, costs, dimensions, suppliers</p>
        </button>

        <button
          onClick={() => { setImportType('inventory'); setStep('upload') }}
          className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-blue-500/50 hover:bg-slate-800 transition-all text-left group"
        >
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
            <i className="fas fa-warehouse text-blue-400 text-xl"></i>
          </div>
          <h4 className="text-white font-medium mb-1">Stock Levels</h4>
          <p className="text-slate-400 text-sm">Quantities by location and sublocation</p>
        </button>
      </div>

      <div className="bg-slate-800/30 rounded-lg p-4 text-sm">
        <div className="flex items-start gap-3">
          <i className="fas fa-lightbulb text-amber-400 mt-0.5"></i>
          <div>
            <p className="text-slate-300 font-medium">Tip: Import products first, then stock levels</p>
            <p className="text-slate-400 mt-1">This ensures products exist before linking inventory records.</p>
          </div>
        </div>
      </div>
    </div>
  )

  // Render upload step
  const renderUploadStep = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            importType === 'products' ? 'bg-emerald-500/20' : 'bg-blue-500/20'
          }`}>
            <i className={`fas ${importType === 'products' ? 'fa-boxes text-emerald-400' : 'fa-warehouse text-blue-400'}`}></i>
          </div>
          <div>
            <h3 className="text-white font-medium">
              {importType === 'products' ? 'Import Product Details' : 'Import Stock Levels'}
            </h3>
            <p className="text-sm text-slate-400">Upload your CSV file</p>
          </div>
        </div>
        <Button variant="ghost" onClick={() => setStep('type')}>
          <i className="fas fa-arrow-left mr-2"></i>
          Back
        </Button>
      </div>

      {/* Import Mode (Products only) */}
      {importType === 'products' && (
        <div className="bg-slate-800/50 rounded-lg p-4">
          <label className="block text-sm text-slate-400 mb-3">Import Mode</label>
          <div className="flex gap-4">
            {[
              { value: 'both', label: 'Add & Update' },
              { value: 'add', label: 'Add New Only' },
              { value: 'update', label: 'Update Existing Only' },
            ].map(option => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="importMode"
                  value={option.value}
                  checked={importMode === option.value}
                  onChange={() => setImportMode(option.value as ImportMode)}
                  className="text-emerald-500 focus:ring-emerald-500"
                />
                <span className="text-white">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${
          isDragging
            ? 'border-emerald-500 bg-emerald-500/10'
            : 'border-slate-600 hover:border-slate-500'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <i className="fas fa-file-csv text-4xl text-slate-500 mb-4"></i>
        <p className="text-white mb-2">Drag and drop your CSV file here</p>
        <p className="text-slate-400 text-sm mb-4">or click to browse</p>
        <Button
          variant="secondary"
          onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click() }}
        >
          <i className="fas fa-folder-open mr-2"></i>
          Browse Files
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
          className="hidden"
        />
      </div>

      {/* Supported Formats */}
      <div className="bg-slate-800/30 rounded-lg p-4 text-sm">
        <div className="flex items-start gap-3">
          <i className="fas fa-info-circle text-blue-400 mt-0.5"></i>
          <div>
            <p className="text-slate-300 font-medium">Supported formats</p>
            <p className="text-slate-400 mt-1">inFlow, Shopify, or any CSV with headers. We'll auto-detect common column names and you can map the rest manually.</p>
          </div>
        </div>
      </div>
    </div>
  )

  // Render mapping step
  const renderMappingStep = () => {
    const groupedFields = getGroupedFields()
    const mappedFields = new Set(Object.values(columnMapping))
    const fields = getFieldOptions()
    const requiredFields = fields.filter(f => f.required)
    const mappedCount = Object.keys(columnMapping).length
    const ignoredCount = csvHeaders.length - mappedCount

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">Map Columns</h3>
            <p className="text-sm text-slate-400">
              {fileName} • {csvData.length} rows • {csvHeaders.length} columns
            </p>
          </div>
          <Button variant="ghost" onClick={() => { setStep('upload'); setCsvHeaders([]); setCsvData([]) }}>
            <i className="fas fa-arrow-left mr-2"></i>
            Back
          </Button>
        </div>

        {/* Instructions */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <i className="fas fa-info-circle text-blue-400 mt-0.5"></i>
            <div className="text-sm">
              <p className="text-blue-300 font-medium">Map your CSV columns to Cronk WMS fields</p>
              <p className="text-slate-400 mt-1">
                Review the sample data to see what's in each column, then choose where to map it.
                Select "Don't Import" to skip columns you don't need.
                Required fields are marked with <span className="text-red-400">*</span>
              </p>
            </div>
          </div>
        </div>

        {/* Mapping Table with Sample Data */}
        <div className="bg-slate-800/30 border border-slate-700 rounded-xl overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-slate-800/50 border-b border-slate-700">
            <div className="col-span-3 text-sm font-medium text-slate-400">CSV Column</div>
            <div className="col-span-4 text-sm font-medium text-slate-400">Sample Data (from your file)</div>
            <div className="col-span-5 text-sm font-medium text-slate-400">Map To (Cronk WMS)</div>
          </div>

          <div className="max-h-96 overflow-y-auto divide-y divide-slate-700/50">
            {csvHeaders.map((header, index) => {
              const currentMapping = columnMapping[header] || ''
              const isIgnored = !currentMapping
              const sampleValue = getSampleData(header)

              return (
                <div
                  key={index}
                  className={`grid grid-cols-12 gap-4 p-4 items-center transition-colors ${
                    isIgnored ? 'bg-slate-900/30 opacity-60' : 'hover:bg-slate-800/30'
                  }`}
                >
                  {/* CSV Column Name */}
                  <div className="col-span-3 flex items-center gap-2">
                    <i className={`fas fa-file-csv ${isIgnored ? 'text-slate-600' : 'text-slate-500'}`}></i>
                    <span className={`font-mono text-sm ${isIgnored ? 'text-slate-500 line-through' : 'text-white'}`}>
                      {header}
                    </span>
                  </div>

                  {/* Sample Data */}
                  <div className="col-span-4">
                    <span
                      className={`text-sm font-mono px-2 py-1 rounded ${
                        sampleValue === '(empty)'
                          ? 'text-slate-600 italic'
                          : isIgnored
                            ? 'text-slate-500 bg-slate-900/50'
                            : 'text-emerald-400 bg-emerald-500/10'
                      }`}
                      title={csvData[0]?.[header] || ''}
                    >
                      {sampleValue === '(empty)' ? sampleValue : `"${sampleValue}"`}
                    </span>
                  </div>

                  {/* App Field Dropdown */}
                  <div className="col-span-5">
                    <select
                      value={currentMapping}
                      onChange={(e) => handleMappingChange(header, e.target.value)}
                      className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 ${
                        isIgnored
                          ? 'bg-slate-900 border-slate-700 text-slate-500'
                          : 'bg-slate-800 border-slate-600 text-white'
                      }`}
                    >
                      <option value="">── Don't Import ──</option>
                      {Object.entries(groupedFields).map(([section, sectionFields]) => (
                        <optgroup key={section} label={section}>
                          {sectionFields.map(field => {
                            const isUsed = mappedFields.has(field.value) && currentMapping !== field.value
                            return (
                              <option
                                key={field.value}
                                value={field.value}
                                disabled={isUsed}
                              >
                                {field.label}{field.required ? ' *' : ''}
                                {isUsed ? ' (mapped)' : ''}
                              </option>
                            )
                          })}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mapping Summary */}
        <div className="flex items-center justify-between text-sm">
          <div className="text-slate-400">
            <span className="text-emerald-400 font-medium">{mappedCount}</span> mapped •
            <span className="text-slate-500 ml-1">{ignoredCount}</span> will be ignored
          </div>
          <div className="flex gap-4">
            {requiredFields.map(field => {
              const isMapped = mappedFields.has(field.value)
              return (
                <span key={field.value} className={`flex items-center gap-1 ${isMapped ? 'text-emerald-400' : 'text-red-400'}`}>
                  <i className={`fas ${isMapped ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                  {field.label}
                </span>
              )
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleProceedToPreview}>
            Continue to Preview
            <i className="fas fa-arrow-right ml-2"></i>
          </Button>
        </div>
      </div>
    )
  }

  // Render preview step
  const renderPreviewStep = () => {
    const newCount = parsedData.filter(p => !p._exists).length
    const updateCount = parsedData.filter(p => p._exists).length

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">Preview Import</h3>
            <p className="text-sm text-slate-400">{parsedData.length} records ready to import</p>
          </div>
          <Button variant="ghost" onClick={() => setStep('mapping')}>
            <i className="fas fa-arrow-left mr-2"></i>
            Back
          </Button>
        </div>

        {/* Stats */}
        {importType === 'products' && (
          <div className="flex gap-4">
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-3">
              <div className="text-emerald-400 text-2xl font-bold">{newCount}</div>
              <div className="text-slate-400 text-sm">New Products</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg px-4 py-3">
              <div className="text-blue-400 text-2xl font-bold">{updateCount}</div>
              <div className="text-slate-400 text-sm">Updates</div>
            </div>
          </div>
        )}

        {/* Preview Table */}
        <div className="bg-slate-800/30 border border-slate-700 rounded-xl overflow-hidden">
          <div className="max-h-64 overflow-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-800/50 sticky top-0">
                <tr>
                  <th className="text-left p-3 text-slate-400 font-medium">SKU</th>
                  <th className="text-left p-3 text-slate-400 font-medium">Name</th>
                  {importType === 'products' && (
                    <th className="text-left p-3 text-slate-400 font-medium">Status</th>
                  )}
                  {importType === 'inventory' && (
                    <>
                      <th className="text-left p-3 text-slate-400 font-medium">Location</th>
                      <th className="text-right p-3 text-slate-400 font-medium">Qty</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {parsedData.slice(0, 10).map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/30">
                    <td className="p-3 font-mono text-white">{row.sku}</td>
                    <td className="p-3 text-slate-300">{row.name || row.productName || '-'}</td>
                    {importType === 'products' && (
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          row._exists
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {row._exists ? 'Update' : 'New'}
                        </span>
                      </td>
                    )}
                    {importType === 'inventory' && (
                      <>
                        <td className="p-3 text-slate-300">{row.locationName}</td>
                        <td className="p-3 text-right text-white">{row.quantity}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {parsedData.length > 10 && (
            <div className="p-3 bg-slate-800/30 border-t border-slate-700 text-center text-slate-400 text-sm">
              ...and {parsedData.length - 10} more
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={importType === 'products' ? importProducts : importInventory}
            disabled={isImporting}
          >
            {isImporting ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Importing...
              </>
            ) : (
              <>
                <i className="fas fa-upload mr-2"></i>
                Import {parsedData.length} Records
              </>
            )}
          </Button>
        </div>

        {/* Progress */}
        {isImporting && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Importing...</span>
              <span className="text-white">{importProgress.current} / {importProgress.total}</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${(importProgress.current / importProgress.total) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-file-import text-emerald-400"></i>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Import Data</h2>
              <p className="text-sm text-slate-400">
                {step === 'type' && 'Choose what to import'}
                {step === 'upload' && 'Upload your CSV file'}
                {step === 'mapping' && 'Map columns to fields'}
                {step === 'preview' && 'Review before importing'}
                {step === 'importing' && 'Importing...'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 'type' && renderTypeStep()}
          {step === 'upload' && renderUploadStep()}
          {step === 'mapping' && renderMappingStep()}
          {step === 'preview' && renderPreviewStep()}
        </div>
      </div>
    </div>
  )
}

export default ImportCSVModal
