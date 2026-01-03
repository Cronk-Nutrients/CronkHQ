import { NextRequest, NextResponse } from 'next/server'
import { initializeApp, getApps, applicationDefault } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

// Initialize Firebase Admin inline to avoid import issues
function getDb() {
  if (getApps().length === 0) {
    try {
      initializeApp({
        credential: applicationDefault(),
      })
    } catch {
      // Fallback for environments where ADC isn't available
      initializeApp()
    }
  }
  return getFirestore()
}

export async function POST(request: NextRequest) {
  try {
    let body
    try {
      body = await request.json()
    } catch (parseError: any) {
      return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 })
    }

    const { organizationId } = body

    if (!organizationId) {
      return NextResponse.json({ success: false, error: 'Missing organization ID' }, { status: 400 })
    }

    let adminDb
    try {
      adminDb = getDb()
    } catch (adminError: any) {
      console.error('Firebase Admin init error:', adminError)
      return NextResponse.json({
        success: false,
        error: `Server configuration error: ${adminError.message || 'Unknown error'}`
      }, { status: 500 })
    }

    // Get Shopify credentials from organization
    const orgDoc = await adminDb.collection('organizations').doc(organizationId).get()
    if (!orgDoc.exists) {
      return NextResponse.json({ success: false, error: 'Organization not found' }, { status: 404 })
    }

    const orgData = orgDoc.data()
    const shopify = orgData?.shopify

    if (!shopify?.isConnected || !shopify?.accessToken) {
      return NextResponse.json({ success: false, error: 'Shopify not connected' }, { status: 400 })
    }

    const baseUrl = `https://${shopify.storeName}.myshopify.com/admin/api/2024-10`

    // Fetch products from Shopify
    const shopifyUrl = `${baseUrl}/products.json?limit=250`

    const response = await fetch(shopifyUrl, {
      headers: {
        'X-Shopify-Access-Token': shopify.accessToken,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Shopify fetch products error:', errorText)
      return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 400 })
    }

    const data = await response.json()
    const shopifyProducts = data.products || []

    // Collect all inventory item IDs to fetch costs
    const inventoryItemIds: string[] = []
    for (const product of shopifyProducts) {
      for (const variant of product.variants || []) {
        if (variant.inventory_item_id) {
          inventoryItemIds.push(variant.inventory_item_id.toString())
        }
      }
    }

    // Fetch inventory item data in batches (max 100 per request)
    // This includes: cost, HS code, country of origin, requires_shipping
    interface InventoryItemData {
      cost: number
      harmonizedSystemCode: string | null
      countryCodeOfOrigin: string | null
      requiresShipping: boolean
    }
    const inventoryItemsData = new Map<string, InventoryItemData>()
    console.log(`Fetching data for ${inventoryItemIds.length} inventory items...`)

    for (let i = 0; i < inventoryItemIds.length; i += 100) {
      const batch = inventoryItemIds.slice(i, i + 100)
      const idsParam = batch.join(',')

      try {
        const inventoryUrl = `${baseUrl}/inventory_items.json?ids=${idsParam}`
        console.log(`Fetching batch ${i / 100 + 1}: ${inventoryUrl}`)

        const inventoryResponse = await fetch(inventoryUrl, {
          headers: {
            'X-Shopify-Access-Token': shopify.accessToken,
            'Content-Type': 'application/json',
          },
        })

        if (inventoryResponse.ok) {
          const inventoryData = await inventoryResponse.json()
          console.log(`Got ${inventoryData.inventory_items?.length || 0} inventory items`)

          for (const item of inventoryData.inventory_items || []) {
            // Cost can be a string or number, and might be null
            const cost = item.cost !== null && item.cost !== undefined ? parseFloat(item.cost) : 0

            inventoryItemsData.set(item.id.toString(), {
              cost,
              harmonizedSystemCode: item.harmonized_system_code || null,
              countryCodeOfOrigin: item.country_code_of_origin || null,
              requiresShipping: item.requires_shipping !== false, // Default true if not set
            })

            if (cost > 0) {
              console.log(`  Item ${item.id}: cost = ${cost}, HS = ${item.harmonized_system_code || 'N/A'}`)
            }
          }
        } else {
          const errorText = await inventoryResponse.text()
          console.error(`Failed to fetch inventory items (${inventoryResponse.status}):`, errorText)
        }
      } catch (err) {
        console.error('Error fetching inventory items:', err)
      }
    }

    console.log(`Loaded data for ${inventoryItemsData.size} inventory items`)

    // Get existing products by Shopify ID
    const productsRef = adminDb.collection('organizations').doc(organizationId).collection('products')
    const existingSnapshot = await productsRef.get()
    const existingByShopifyId = new Map<string, { id: string; data: any }>()
    existingSnapshot.docs.forEach((docSnap) => {
      const docData = docSnap.data()
      if (docData.shopifyId) {
        existingByShopifyId.set(docData.shopifyId, { id: docSnap.id, data: docData })
      }
    })

    // Get or create categories
    const categoriesRef = adminDb.collection('organizations').doc(organizationId).collection('categories')
    const categoriesSnapshot = await categoriesRef.get()
    const existingCategories = new Map<string, string>()
    categoriesSnapshot.docs.forEach((docSnap) => {
      const catData = docSnap.data()
      existingCategories.set(catData.name?.toLowerCase() || '', docSnap.id)
    })

    let imported = 0
    let updated = 0
    let skipped = 0

    // Process each Shopify product as a parent with variants
    for (const shopifyProduct of shopifyProducts) {
      const shopifyId = shopifyProduct.id.toString()
      const hasVariants = shopifyProduct.variants.length > 1 ||
        (shopifyProduct.variants[0]?.title !== 'Default Title')

      // Get or create category
      const categoryName = shopifyProduct.product_type || 'Uncategorized'
      let categoryId = existingCategories.get(categoryName.toLowerCase())

      if (!categoryId && categoryName) {
        // Create new category
        const newCatRef = categoriesRef.doc()
        await newCatRef.set({
          name: categoryName,
          slug: categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
          description: '',
          sortOrder: existingCategories.size,
          productCount: 0,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        categoryId = newCatRef.id
        existingCategories.set(categoryName.toLowerCase(), categoryId)
      }

      // Build variants array with data from inventory items
      const variants = shopifyProduct.variants.map((variant: any) => {
        const inventoryItemId = variant.inventory_item_id?.toString()
        const inventoryData = inventoryItemsData.get(inventoryItemId)

        return {
          id: variant.id.toString(),
          title: variant.title,
          sku: variant.sku || '',
          barcode: variant.barcode || null,
          price: parseFloat(variant.price) || 0,
          compareAtPrice: variant.compare_at_price ? parseFloat(variant.compare_at_price) : null,
          cost: inventoryData?.cost || 0,
          weight: parseFloat(variant.weight) || 0,
          weightUnit: variant.weight_unit || 'lb',
          inventoryItemId: inventoryItemId,
          option1: variant.option1 || null,
          option2: variant.option2 || null,
          option3: variant.option3 || null,
          inventoryQuantity: variant.inventory_quantity || 0,
          position: variant.position || 1,
          // Additional Shopify fields
          taxable: variant.taxable !== false, // Default true if not set
          fulfillmentService: variant.fulfillment_service || 'manual',
          requiresShipping: inventoryData?.requiresShipping !== false,
          // Customs fields from inventory item
          harmonizedSystemCode: inventoryData?.harmonizedSystemCode || null,
          countryCodeOfOrigin: inventoryData?.countryCodeOfOrigin || null,
          // Grams for easy calculation
          grams: variant.grams || 0,
        }
      })

      // For single variant products, use variant SKU as parent SKU
      // For multi-variant products, parent SKU is empty (or can be set manually for Amazon)
      const defaultVariant = variants[0]
      const parentSku = hasVariants ? '' : (defaultVariant?.sku || '')
      const parentBarcode = hasVariants ? '' : (defaultVariant?.barcode || '')

      // Get lowest and highest prices for display
      const prices = variants.map((v: any) => v.price).filter((p: number) => p > 0)
      const costs = variants.map((v: any) => v.cost).filter((c: number) => c > 0)
      const lowestPrice = prices.length > 0 ? Math.min(...prices) : 0
      const highestPrice = prices.length > 0 ? Math.max(...prices) : 0
      const avgCost = costs.length > 0 ? costs.reduce((a: number, b: number) => a + b, 0) / costs.length : 0

      const productData = {
        name: shopifyProduct.title,
        sku: parentSku,
        barcode: parentBarcode,
        category: categoryName,
        categoryId: categoryId || null,
        description: shopifyProduct.body_html?.replace(/<[^>]*>/g, '') || '',
        descriptionHtml: shopifyProduct.body_html || '', // Preserve HTML version
        status: shopifyProduct.status === 'active' ? 'active' :
                shopifyProduct.status === 'draft' ? 'draft' : 'archived',
        productType: shopifyProduct.product_type || '',
        vendor: shopifyProduct.vendor || '',
        tags: shopifyProduct.tags ? shopifyProduct.tags.split(',').map((t: string) => t.trim()) : [],

        // Variant info
        hasVariants,
        variantCount: variants.length,
        variants,
        options: shopifyProduct.options?.map((opt: any) => ({
          name: opt.name,
          values: opt.values,
          position: opt.position,
        })) || [],

        // Pricing (for products without variants, or price range for variant products)
        cost: hasVariants ? avgCost : (defaultVariant?.cost || 0),
        retailPrice: hasVariants ? lowestPrice : (defaultVariant?.price || 0),
        priceRange: hasVariants ? { min: lowestPrice, max: highestPrice } : null,
        compareAtPrice: defaultVariant?.compareAtPrice || null,

        // Physical attributes (from first variant for display)
        weight: defaultVariant?.weight || 0,
        weightUnit: defaultVariant?.weightUnit || 'lb',
        grams: defaultVariant?.grams || 0,

        // Customs & Shipping (from first variant's inventory item)
        hsCode: defaultVariant?.harmonizedSystemCode || null,
        countryOfOrigin: defaultVariant?.countryCodeOfOrigin || null,
        requiresShipping: defaultVariant?.requiresShipping !== false,
        taxable: defaultVariant?.taxable !== false,
        fulfillmentService: defaultVariant?.fulfillmentService || 'manual',

        // SEO fields (use title/description as defaults)
        seoTitle: shopifyProduct.title || '',
        seoDescription: shopifyProduct.body_html?.replace(/<[^>]*>/g, '').substring(0, 160) || '',

        // Shopify references
        shopifyId,
        shopifyHandle: shopifyProduct.handle,
        shopifyProductId: shopifyProduct.id.toString(),
        shopifyAdminUrl: `https://${shopify.storeName}.myshopify.com/admin/products/${shopifyProduct.id}`,
        shopifyStorefrontUrl: `https://${shopify.storeName}.myshopify.com/products/${shopifyProduct.handle}`,

        // Images
        images: shopifyProduct.images?.map((img: any) => ({
          id: img.id.toString(),
          src: img.src,
          alt: img.alt || '',
          position: img.position,
          width: img.width || null,
          height: img.height || null,
        })) || [],
        thumbnail: shopifyProduct.image?.src || shopifyProduct.images?.[0]?.src || null,

        // Timestamps from Shopify
        shopifyCreatedAt: shopifyProduct.created_at || null,
        shopifyUpdatedAt: shopifyProduct.updated_at || null,
        shopifyPublishedAt: shopifyProduct.published_at || null,

        // Defaults for WMS
        customPrices: {},
        totalStock: variants.reduce((sum: number, v: any) => sum + (v.inventoryQuantity || 0), 0),
        availableStock: 0,
        reservedStock: 0,
        lowStockThreshold: 10,

        updatedAt: new Date(),
        source: 'shopify',
      }

      const existing = existingByShopifyId.get(shopifyId)

      if (existing) {
        // Update existing product
        await productsRef.doc(existing.id).update(productData)
        updated++
      } else {
        // Create new product
        const docId = shopifyId // Use Shopify ID as document ID for easy lookups
        await productsRef.doc(docId).set({
          ...productData,
          createdAt: new Date(),
        })
        imported++
      }
    }

    // Update last sync time
    await adminDb.collection('organizations').doc(organizationId).update({
      'shopify.lastSyncProducts': new Date(),
    })

    return NextResponse.json({
      success: true,
      imported,
      updated,
      skipped,
      total: shopifyProducts.length,
      message: `Synced ${imported + updated} products (${imported} new, ${updated} updated)`,
    })
  } catch (error: any) {
    console.error('Sync products error:', error)
    return NextResponse.json({
      success: false,
      error: error?.message || 'Sync failed',
      stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    }, { status: 500 })
  }
}
