// Parse CSV text into array of objects
export function parseCSV(text: string): { data: Record<string, string>[]; headers: string[] } {
  const lines = text.split(/\r?\n/).filter(line => line.trim())
  if (lines.length === 0) return { data: [], headers: [] }

  // Parse headers - handle quoted values
  const headers = parseCSVLine(lines[0]).map(h =>
    h.trim().replace(/^["']|["']$/g, '') // Remove surrounding quotes
  )

  // Parse data rows
  const data: Record<string, string>[] = []
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    if (values.length === 0 || values.every(v => !v.trim())) continue

    const row: Record<string, string> = {}
    headers.forEach((header, index) => {
      row[header] = (values[index] || '').trim().replace(/^["']|["']$/g, '')
    })
    data.push(row)
  }

  return { data, headers }
}

// Parse a single CSV line, handling quoted values
function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const nextChar = line[i + 1]

    if (char === '"' && !inQuotes) {
      inQuotes = true
    } else if (char === '"' && inQuotes) {
      if (nextChar === '"') {
        current += '"'
        i++ // Skip next quote
      } else {
        inQuotes = false
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }
  result.push(current)

  return result
}

// Field mapping definitions - maps our field names to common CSV column header variations
export const FIELD_MAPPINGS: Record<string, string[]> = {
  // Basic Info
  name: ['name', 'product name', 'product_name', 'title', 'item name', 'item_name', 'product title'],
  sku: ['sku', 'item sku', 'product sku', 'stock keeping unit', 'item code', 'product code', 'code', 'item #'],
  barcode: ['barcode', 'upc', 'ean', 'gtin', 'upc code', 'barcode number', 'scan code'],
  description: ['description', 'product description', 'long description', 'details', 'notes', 'body'],

  // Categorization
  category: ['category', 'product category', 'type', 'product type', 'group'],
  subcategory: ['subcategory', 'sub category', 'sub-category', 'secondary category'],
  brand: ['brand', 'manufacturer', 'make'],
  vendor: ['vendor', 'supplier', 'vendor name', 'supplier name'],
  tags: ['tags', 'labels', 'keywords'],

  // Pricing
  cost: ['cost', 'unit cost', 'cost price', 'purchase price', 'buy price', 'cogs', 'cost per item'],
  retailPrice: ['price', 'retail price', 'retail', 'sell price', 'selling price', 'msrp', 'rrp', 'sales price'],
  wholesalePrice: ['wholesale price', 'wholesale', 'b2b price', 'trade price', 'distributor price'],
  amazonPrice: ['amazon price', 'amazon', 'fba price'],
  compareAtPrice: ['compare at price', 'compare price', 'was price', 'original price'],

  // Inventory
  totalStock: ['quantity', 'stock', 'qty', 'inventory', 'on hand', 'quantity on hand', 'stock level', 'total stock', 'available', 'qty on hand'],
  lowStockThreshold: ['low stock', 'low stock threshold', 'reorder level', 'min stock', 'minimum stock'],
  reorderPoint: ['reorder point', 'reorder at'],
  reorderQuantity: ['reorder quantity', 'reorder qty', 'order quantity'],

  // Location
  binLocation: ['bin', 'bin location', 'bin #', 'bin number', 'shelf', 'location', 'warehouse location', 'rack', 'slot'],
  subLocation: ['sub location', 'sublocation', 'sub-location', 'area', 'section'],
  zone: ['zone', 'warehouse zone'],
  locationName: ['location name', 'warehouse', 'warehouse name', 'store'],

  // Physical
  weight: ['weight', 'item weight', 'product weight', 'weight (oz)', 'weight (g)', 'weight (lb)'],
  weightUnit: ['weight unit', 'weight_unit'],
  length: ['length', 'item length', 'product length'],
  width: ['width', 'item width', 'product width'],
  height: ['height', 'item height', 'depth'],
  dimensionUnit: ['dimension unit', 'size unit'],

  // Shipping & Customs
  hsCode: ['hs code', 'hscode', 'hs_code', 'harmonized code', 'tariff code', 'customs code', 'hs tariff', 'harmonized system code'],
  countryOfOrigin: ['country of origin', 'origin', 'made in', 'country', 'coo'],
  shippingClass: ['shipping class', 'ship class', 'shipping category'],

  // Status
  status: ['status', 'product status', 'active', 'enabled'],

  // External IDs
  shopifyProductId: ['shopify id', 'shopify product id', 'shopify_id'],
  amazonASIN: ['asin', 'amazon asin', 'amazon_asin'],
  amazonFNSKU: ['fnsku', 'amazon fnsku', 'fba sku'],
  upc: ['upc', 'upc code', 'upc-a'],
  ean: ['ean', 'ean code', 'ean-13'],
}

// Auto-detect field mappings from headers
export function detectFieldMappings(headers: string[]): {
  mappings: Record<string, string>
  unmapped: string[]
} {
  const mappings: Record<string, string> = {}
  const unmapped: string[] = []
  const usedFields = new Set<string>()

  headers.forEach(header => {
    const normalizedHeader = header.toLowerCase().trim()
    let found = false

    for (const [field, aliases] of Object.entries(FIELD_MAPPINGS)) {
      // Skip if this field is already mapped
      if (usedFields.has(field)) continue

      // Check for exact match first
      if (aliases.includes(normalizedHeader)) {
        mappings[header] = field
        usedFields.add(field)
        found = true
        break
      }

      // Check for partial match
      if (aliases.some(alias => normalizedHeader.includes(alias) || alias.includes(normalizedHeader))) {
        mappings[header] = field
        usedFields.add(field)
        found = true
        break
      }
    }

    if (!found) {
      unmapped.push(header)
    }
  })

  return { mappings, unmapped }
}

// Get all available fields for dropdown
export function getAvailableFields(): { value: string; label: string; group: string }[] {
  return [
    // Basic Info
    { value: 'name', label: 'Product Name', group: 'Basic Info' },
    { value: 'sku', label: 'SKU', group: 'Basic Info' },
    { value: 'barcode', label: 'Barcode / UPC', group: 'Basic Info' },
    { value: 'description', label: 'Description', group: 'Basic Info' },

    // Categorization
    { value: 'category', label: 'Category', group: 'Categorization' },
    { value: 'subcategory', label: 'Subcategory', group: 'Categorization' },
    { value: 'brand', label: 'Brand', group: 'Categorization' },
    { value: 'vendor', label: 'Vendor', group: 'Categorization' },
    { value: 'tags', label: 'Tags', group: 'Categorization' },

    // Pricing
    { value: 'cost', label: 'Cost', group: 'Pricing' },
    { value: 'retailPrice', label: 'Retail Price', group: 'Pricing' },
    { value: 'wholesalePrice', label: 'Wholesale Price', group: 'Pricing' },
    { value: 'amazonPrice', label: 'Amazon Price', group: 'Pricing' },
    { value: 'compareAtPrice', label: 'Compare At Price', group: 'Pricing' },

    // Inventory
    { value: 'totalStock', label: 'Stock Quantity', group: 'Inventory' },
    { value: 'lowStockThreshold', label: 'Low Stock Threshold', group: 'Inventory' },
    { value: 'reorderPoint', label: 'Reorder Point', group: 'Inventory' },
    { value: 'reorderQuantity', label: 'Reorder Quantity', group: 'Inventory' },

    // Location
    { value: 'binLocation', label: 'Bin Location', group: 'Location' },
    { value: 'subLocation', label: 'Sub Location', group: 'Location' },
    { value: 'zone', label: 'Zone', group: 'Location' },
    { value: 'locationName', label: 'Warehouse Name', group: 'Location' },

    // Physical
    { value: 'weight', label: 'Weight', group: 'Physical' },
    { value: 'length', label: 'Length', group: 'Physical' },
    { value: 'width', label: 'Width', group: 'Physical' },
    { value: 'height', label: 'Height', group: 'Physical' },

    // Shipping & Customs
    { value: 'hsCode', label: 'HS Code', group: 'Shipping & Customs' },
    { value: 'countryOfOrigin', label: 'Country of Origin', group: 'Shipping & Customs' },
    { value: 'shippingClass', label: 'Shipping Class', group: 'Shipping & Customs' },

    // External IDs
    { value: 'shopifyProductId', label: 'Shopify ID', group: 'External IDs' },
    { value: 'amazonASIN', label: 'Amazon ASIN', group: 'External IDs' },
    { value: 'amazonFNSKU', label: 'Amazon FNSKU', group: 'External IDs' },
    { value: 'upc', label: 'UPC', group: 'External IDs' },
    { value: 'ean', label: 'EAN', group: 'External IDs' },
  ]
}
