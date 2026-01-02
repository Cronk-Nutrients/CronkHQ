'use client'

import { useState, useEffect, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { doc, onSnapshot, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useOrganization } from '@/context/OrganizationContext'
import { useApp, Product } from '@/context/AppContext'
import { usePermissions } from '@/hooks/usePermissions'
import { PermissionGate } from '@/components/PermissionGate'
import { Cost, Margin } from '@/components/SensitiveData'
import { useToast } from '@/components/ui/Toast'
import { useConfirm } from '@/components/ui/ConfirmDialog'
import { Button } from '@/components/ui/Button'
import { AddProductModal } from '@/components/modals/AddProductModal'
import { AdjustStockModal } from '@/components/modals/AdjustStockModal'
import { formatCurrency, formatNumber } from '@/lib/formatting'
import { getCategoryStyle, CategoryIcon } from '@/components/inventory'
import { CustomPriceField, CustomPriceValue, CustomPriceCurrency, ProductImage } from '@/types'
import ProductImageUpload from '@/components/ProductImageUpload'

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  CAD: 'C$',
  EUR: '€',
  GBP: '£',
  MXN: 'MX$',
  AUD: 'A$',
}

const COUNTRY_FLAGS: Record<string, string> = {
  CA: '🇨🇦',
  US: '🇺🇸',
  CN: '🇨🇳',
  MX: '🇲🇽',
  DE: '🇩🇪',
  GB: '🇬🇧',
}

type TabType = 'overview' | 'images' | 'pricing' | 'supplier' | 'inventory' | 'history'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string
  const { organization } = useOrganization()
  const { state, dispatch } = useApp()
  const { canViewCosts, canEditProducts } = usePermissions()
  const { success, error } = useToast()
  const confirm = useConfirm()

  const [customPriceFields, setCustomPriceFields] = useState<CustomPriceField[]>([])
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false)

  // Find the product from AppContext
  const product = state.products.find(p => p.id === productId)

  // Load custom price field definitions
  useEffect(() => {
    if (!organization?.id) return

    const loadFields = async () => {
      try {
        const orgRef = doc(db, 'organizations', organization.id)
        const orgDoc = await getDoc(orgRef)
        if (orgDoc.exists()) {
          setCustomPriceFields(orgDoc.data().customPriceFields || [])
        }
      } catch (err) {
        console.error('Error loading custom price fields:', err)
      }
    }

    loadFields()
  }, [organization?.id])

  // Get stock by location
  const stockByLocation = useMemo(() => {
    if (!product) return []
    return state.locations.map(loc => {
      const inv = state.inventory.find(
        i => i.productId === product.id && i.locationId === loc.id
      )
      return {
        locationId: loc.id,
        locationName: loc.name,
        locationType: loc.type,
        quantity: inv?.quantity || 0,
      }
    })
  }, [product, state.locations, state.inventory])

  const totalStock = stockByLocation.reduce((sum, loc) => sum + loc.quantity, 0)
  const isLowStock = product ? totalStock <= product.reorderPoint : false
  const isOutOfStock = totalStock === 0

  // Handle delete product
  const handleDeleteProduct = async () => {
    if (!product) return

    const confirmed = await confirm({
      title: 'Delete Product',
      message: `Are you sure you want to delete "${product.name}"? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      destructive: true,
    })

    if (confirmed) {
      dispatch({ type: 'DELETE_PRODUCT', payload: product.id })
      success(`Product "${product.name}" deleted successfully`)
      router.push('/inventory')
    }
  }

  // Calculate margin
  const calculateMargin = (price: number, cost: number) => {
    if (price === 0) return 0
    return ((price - cost) / price) * 100
  }

  // If product not found
  if (!product) {
    return (
      <main className="flex-1 overflow-auto flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-box-open text-2xl text-slate-500"></i>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Product Not Found</h2>
          <p className="text-slate-400 mb-4">This product doesn&apos;t exist or was deleted.</p>
          <Link href="/inventory">
            <Button variant="secondary">
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Inventory
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  const getStockStatus = () => {
    if (isOutOfStock) return { label: 'Out of Stock', color: 'red' }
    if (isLowStock) return { label: 'Low Stock', color: 'amber' }
    return { label: 'In Stock', color: 'emerald' }
  }

  const stockStatus = getStockStatus()
  const categoryStyle = getCategoryStyle(product.category)
  const baseCost = product.cost?.rolling || 0
  const msrpPrice = product.prices?.msrp || 0

  // Get custom prices from product (if available)
  const productCustomPrices = (product as any).customPrices as Record<string, CustomPriceValue> | undefined

  // Group custom prices by currency
  const groupedPrices = useMemo(() => {
    if (!productCustomPrices) return {}

    return customPriceFields.reduce((acc, field) => {
      const currency = field.currency
      if (!acc[currency]) acc[currency] = []
      const priceValue = productCustomPrices[field.key]
      if (priceValue) {
        acc[currency].push({ field, value: priceValue.value })
      }
      return acc
    }, {} as Record<string, { field: CustomPriceField; value: number }[]>)
  }, [customPriceFields, productCustomPrices])

  // Pricing data for standard channels
  const pricingData = [
    {
      channel: 'MSRP',
      price: product.prices?.msrp || 0,
      cogs: baseCost,
      margin: calculateMargin(product.prices?.msrp || 0, baseCost),
    },
    {
      channel: 'Shopify',
      icon: 'fab fa-shopify',
      iconColor: 'text-green-400',
      price: product.prices?.shopify || 0,
      cogs: baseCost,
      margin: calculateMargin(product.prices?.shopify || 0, baseCost),
    },
    {
      channel: 'Amazon',
      icon: 'fab fa-amazon',
      iconColor: 'text-orange-400',
      price: product.prices?.amazon || 0,
      cogs: baseCost,
      margin: calculateMargin(product.prices?.amazon || 0, baseCost),
    },
    {
      channel: 'Wholesale',
      icon: 'fas fa-store',
      iconColor: 'text-blue-400',
      price: product.prices?.wholesale || 0,
      cogs: baseCost,
      margin: calculateMargin(product.prices?.wholesale || 0, baseCost),
    },
    {
      channel: 'Distributor',
      icon: 'fas fa-truck',
      iconColor: 'text-purple-400',
      price: (product.prices as any)?.distributor || 0,
      cogs: baseCost,
      margin: calculateMargin((product.prices as any)?.distributor || 0, baseCost),
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <button
            onClick={() => router.push('/inventory')}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors mt-1"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <div className="w-20 h-20 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
            <CategoryIcon category={product.category} size="lg" />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-white">{product.name}</h1>
              <span className={`px-2 py-0.5 rounded-full text-xs bg-${stockStatus.color}-500/20 text-${stockStatus.color}-400`}>
                {stockStatus.label}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-slate-400">SKU: <span className="text-white font-mono">{product.sku}</span></span>
              {product.barcode && (
                <span className="text-slate-400">UPC: <span className="text-white font-mono">{product.barcode}</span></span>
              )}
              <span className="text-slate-400">Category: <span className="text-white capitalize">{product.category?.replace('_', ' ')}</span></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <PermissionGate permission="products.edit">
            <Button variant="secondary" onClick={() => setIsEditModalOpen(true)}>
              <i className="fas fa-pencil mr-2"></i>
              Edit
            </Button>
          </PermissionGate>
          <PermissionGate permission="products.delete">
            <Button variant="ghost" onClick={handleDeleteProduct}>
              <i className="fas fa-trash mr-2 text-red-400"></i>
              Delete
            </Button>
          </PermissionGate>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-700">
        <div className="flex gap-6">
          {[
            { key: 'overview', label: 'Overview', icon: 'fa-chart-line' },
            { key: 'images', label: 'Images', icon: 'fa-images' },
            { key: 'pricing', label: 'Pricing', icon: 'fa-tags' },
            { key: 'supplier', label: 'Supplier', icon: 'fa-truck-loading' },
            { key: 'inventory', label: 'Inventory', icon: 'fa-warehouse' },
            { key: 'history', label: 'History', icon: 'fa-clock-rotate-left' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as TabType)}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === tab.key
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <i className={`fas ${tab.icon}`}></i>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-3">Description</h3>
              <p className="text-slate-300">{product.description || 'No description provided.'}</p>
            </div>

            {/* Physical Attributes */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-4">Physical Attributes</h3>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-slate-400 mb-1">Weight</div>
                  <div className="text-white font-medium">
                    {product.weight ? `${product.weight.value} ${product.weight.unit || 'oz'}` : '-'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Length</div>
                  <div className="text-white font-medium">
                    {product.dimensions?.length ? `${product.dimensions.length}"` : '-'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Width</div>
                  <div className="text-white font-medium">
                    {product.dimensions?.width ? `${product.dimensions.width}"` : '-'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Height</div>
                  <div className="text-white font-medium">
                    {product.dimensions?.height ? `${product.dimensions.height}"` : '-'}
                  </div>
                </div>
              </div>
            </div>

            {/* Customs & Compliance */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-4">Customs & Compliance</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-400 mb-1">HS Code</div>
                  <div className="text-white font-mono">{(product as any).hsCode || '-'}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Country of Origin</div>
                  <div className="text-white">
                    {(product as any).countryOfOrigin ? (
                      <span className="flex items-center gap-2">
                        {COUNTRY_FLAGS[(product as any).countryOfOrigin] || ''} {(product as any).countryOfOrigin}
                      </span>
                    ) : '-'}
                  </div>
                </div>
              </div>
            </div>

            {/* Units of Measure */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-4">Units of Measure</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-slate-400 mb-1">Base Unit</div>
                  <div className="text-white">{(product as any).uom || 'Each'}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Purchase Unit</div>
                  <div className="text-white">{(product as any).purchasingUom || 'Case'}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Units per Case</div>
                  <div className="text-white">{product.casePackQty || '-'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Stock Summary */}
            <div className={`bg-slate-800/50 border rounded-xl p-5 ${isLowStock ? 'border-amber-500/30' : 'border-slate-700'}`}>
              <h3 className="text-white font-semibold mb-4">Stock Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Stock</span>
                  <span className={`font-semibold ${isOutOfStock ? 'text-red-400' : isLowStock ? 'text-amber-400' : 'text-white'}`}>
                    {formatNumber(totalStock)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Reorder Point</span>
                  <span className="text-white">{formatNumber(product.reorderPoint)}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('inventory')}
                className="w-full mt-4 text-sm text-emerald-400 hover:text-emerald-300"
              >
                View inventory details →
              </button>
            </div>

            {/* Quick Pricing */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-4">Pricing</h3>
              <div className="space-y-3">
                {canViewCosts && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cost</span>
                    <Cost>
                      <span className="text-white font-semibold">{formatCurrency(baseCost)}</span>
                    </Cost>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">Retail (MSRP)</span>
                  <span className="text-white font-semibold">{formatCurrency(msrpPrice)}</span>
                </div>
                {canViewCosts && baseCost > 0 && msrpPrice > 0 && (
                  <div className="flex justify-between pt-2 border-t border-slate-700">
                    <span className="text-slate-400">Margin</span>
                    <Margin>
                      <span className="text-emerald-400 font-semibold">
                        {calculateMargin(msrpPrice, baseCost).toFixed(1)}%
                      </span>
                    </Margin>
                  </div>
                )}
              </div>
              <button
                onClick={() => setActiveTab('pricing')}
                className="w-full mt-4 text-sm text-emerald-400 hover:text-emerald-300"
              >
                View all prices →
              </button>
            </div>

            {/* Identifiers */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-4">Identifiers</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-slate-400 mb-1">SKU</div>
                  <div className="flex items-center gap-2">
                    <div className="text-white font-mono bg-slate-900/50 px-3 py-2 rounded-lg flex-1">{product.sku}</div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(product.sku)
                        success('SKU copied to clipboard')
                      }}
                      className="p-2 text-slate-400 hover:text-white"
                    >
                      <i className="fas fa-copy"></i>
                    </button>
                  </div>
                </div>
                {product.barcode && (
                  <div>
                    <div className="text-sm text-slate-400 mb-1">Barcode / UPC</div>
                    <div className="flex items-center gap-2">
                      <div className="text-white font-mono bg-slate-900/50 px-3 py-2 rounded-lg flex-1">{product.barcode}</div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(product.barcode || '')
                          success('Barcode copied to clipboard')
                        }}
                        className="p-2 text-slate-400 hover:text-white"
                      >
                        <i className="fas fa-copy"></i>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <PermissionGate permission="inventory.adjust_stock">
                  <button
                    onClick={() => setIsAdjustModalOpen(true)}
                    className="w-full px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-sm flex items-center gap-2 transition-colors"
                  >
                    <i className="fas fa-plus-minus w-5 text-center"></i>
                    Adjust Stock
                  </button>
                </PermissionGate>
                <button className="w-full px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-sm flex items-center gap-2 transition-colors">
                  <i className="fas fa-file-invoice w-5 text-center"></i>
                  Create Purchase Order
                </button>
                <button className="w-full px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-sm flex items-center gap-2 transition-colors">
                  <i className="fas fa-exchange-alt w-5 text-center"></i>
                  Transfer Stock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Images Tab */}
      {activeTab === 'images' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-white font-semibold">Product Images</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Upload images for pick lists, packing slips, and product identification
                </p>
              </div>
              <span className="text-sm text-slate-500">
                {((product as any).images as ProductImage[])?.length || 0} / 10 images
              </span>
            </div>

            <ProductImageUpload
              productId={product.id}
              images={((product as any).images as ProductImage[]) || []}
              onImagesChange={() => {
                // Images update via Firestore listener automatically
              }}
            />
          </div>

          {/* Usage Info */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <i className="fas fa-info-circle text-blue-400 mt-0.5"></i>
              <div className="text-sm">
                <p className="text-blue-300 font-medium">Where images are used</p>
                <ul className="text-slate-400 mt-2 space-y-1">
                  <li>- <strong className="text-slate-300">Pick Lists</strong> - Help warehouse staff identify products</li>
                  <li>- <strong className="text-slate-300">Packing Slips</strong> - Show customers what&apos;s in their order</li>
                  <li>- <strong className="text-slate-300">Product Catalog</strong> - Display in inventory listings</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Tab */}
      {activeTab === 'pricing' && (
        <div className="grid grid-cols-2 gap-6">
          {/* Standard Pricing */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
            <h3 className="text-white font-semibold mb-4">Standard Channel Pricing</h3>
            <div className="space-y-3">
              {pricingData.map((row, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
                  <div className="flex items-center gap-2">
                    {row.icon && <i className={`${row.icon} ${row.iconColor}`}></i>}
                    <span className={row.icon ? 'text-white' : 'text-slate-400'}>{row.channel}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-white font-medium">{formatCurrency(row.price)}</span>
                    {canViewCosts && row.price > 0 && (
                      <Margin>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          row.margin >= 50 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {row.margin.toFixed(1)}%
                        </span>
                      </Margin>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {canViewCosts && (
              <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Cost (COGS)</span>
                  <Cost>
                    <span className="text-white font-semibold">{formatCurrency(baseCost)}</span>
                  </Cost>
                </div>
              </div>
            )}
          </div>

          {/* Custom Pricing by Currency */}
          {Object.entries(groupedPrices).length > 0 ? (
            Object.entries(groupedPrices).map(([currency, prices]) => (
              <div key={currency} className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <span className="text-lg text-emerald-400">{CURRENCY_SYMBOLS[currency] || '$'}</span>
                  {currency} Custom Pricing
                </h3>
                <div className="space-y-3">
                  {prices.map(({ field, value }) => (
                    <div key={field.key} className="flex justify-between py-2 border-b border-slate-700/50 last:border-0">
                      <span className="text-slate-400">{field.name}</span>
                      <span className="text-white font-medium">
                        {CURRENCY_SYMBOLS[currency]}{value.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-4">Custom Pricing</h3>
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-tags text-slate-500"></i>
                </div>
                <p className="text-slate-400 text-sm mb-3">No custom prices set for this product.</p>
                <Link href="/settings/products" className="text-emerald-400 text-sm hover:text-emerald-300">
                  Configure price fields →
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Supplier Tab */}
      {activeTab === 'supplier' && (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
            <h3 className="text-white font-semibold mb-4">Supplier Information</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-slate-400 mb-1">Supplier / Vendor</div>
                <div className="text-white font-medium text-lg">{product.supplier || 'No supplier assigned'}</div>
              </div>
              {(product as any).supplierSku && (
                <div>
                  <div className="text-sm text-slate-400 mb-1">Vendor Product Code</div>
                  <div className="text-white font-mono">{(product as any).supplierSku}</div>
                </div>
              )}
              {canViewCosts && (product as any).supplierPrice && (
                <div>
                  <div className="text-sm text-slate-400 mb-1">Vendor Price</div>
                  <Cost>
                    <div className="text-white font-medium">{formatCurrency((product as any).supplierPrice)}</div>
                  </Cost>
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
            <h3 className="text-white font-semibold mb-4">Purchasing Details</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-slate-400 mb-1">Purchase Unit</div>
                <div className="text-white">{(product as any).purchasingUom || 'Case'}</div>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-1">Units per Case</div>
                <div className="text-white font-medium">{product.casePackQty || '-'}</div>
              </div>
              {canViewCosts && product.casePackQty && baseCost > 0 && (
                <div>
                  <div className="text-sm text-slate-400 mb-1">Cost per Case</div>
                  <Cost>
                    <div className="text-white font-medium">{formatCurrency(baseCost * product.casePackQty)}</div>
                  </Cost>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Inventory Tab */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700 flex items-center justify-between">
              <h3 className="text-white font-semibold">Stock by Location</h3>
              <PermissionGate permission="inventory.adjust_stock">
                <Button variant="secondary" size="sm" onClick={() => setIsAdjustModalOpen(true)}>
                  <i className="fas fa-plus-minus mr-2"></i>
                  Adjust Stock
                </Button>
              </PermissionGate>
            </div>
            <div className="p-5 space-y-3">
              {stockByLocation.map((loc) => (
                <div key={loc.locationId} className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
                      <i className={`fas ${loc.locationType === 'fba' ? 'fa-amazon' : 'fa-warehouse'} text-slate-400`}></i>
                    </div>
                    <div>
                      <div className="font-medium text-white">{loc.locationName}</div>
                      <div className="text-xs text-slate-500 capitalize">{loc.locationType}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-bold ${loc.quantity > 0 ? 'text-white' : 'text-slate-500'}`}>
                      {formatNumber(loc.quantity)}
                    </div>
                    <div className="text-xs text-slate-400">units</div>
                  </div>
                </div>
              ))}

              {/* Summary */}
              <div className="pt-4 mt-4 border-t border-slate-700">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total Available</span>
                  <span className={`text-2xl font-bold ${isOutOfStock ? 'text-red-400' : isLowStock ? 'text-amber-400' : 'text-white'}`}>
                    {formatNumber(totalStock)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-slate-400">Reorder Point</span>
                  <span className="text-white">{formatNumber(product.reorderPoint)} units</span>
                </div>
                {isLowStock && !isOutOfStock && (
                  <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                    <div className="flex items-center gap-2 text-amber-400 text-sm">
                      <i className="fas fa-exclamation-triangle"></i>
                      <span>Stock is below reorder point</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Inventory Value */}
          {canViewCosts && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-4">Inventory Value</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-slate-400 mb-1">At Cost</div>
                  <Cost>
                    <div className="text-xl font-bold text-white">{formatCurrency(totalStock * baseCost)}</div>
                  </Cost>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">At Retail (MSRP)</div>
                  <div className="text-xl font-bold text-white">{formatCurrency(totalStock * msrpPrice)}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Potential Profit</div>
                  <Cost>
                    <div className="text-xl font-bold text-emerald-400">{formatCurrency(totalStock * (msrpPrice - baseCost))}</div>
                  </Cost>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
          <h3 className="text-white font-semibold mb-4">Activity History</h3>
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="fas fa-clock-rotate-left text-slate-500"></i>
            </div>
            <p className="text-slate-400 mb-2">Stock movements and changes will be shown here.</p>
            <p className="text-slate-500 text-sm">Coming soon</p>
          </div>
        </div>
      )}

      {/* Modals */}
      <AddProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        editProduct={product}
      />

      <AdjustStockModal
        isOpen={isAdjustModalOpen}
        onClose={() => setIsAdjustModalOpen(false)}
        product={product}
      />
    </div>
  )
}
