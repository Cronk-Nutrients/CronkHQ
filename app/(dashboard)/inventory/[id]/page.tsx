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
import { VariantBundleModal } from '@/components/modals/VariantBundleModal'
import { formatCurrency, formatNumber } from '@/lib/formatting'
import { getCategoryStyle, CategoryIcon } from '@/components/inventory'
import { CustomPriceField, CustomPriceValue, CustomPriceCurrency, ProductImage } from '@/types'
import ProductImageUpload from '@/components/ProductImageUpload'
import { getCountryDisplay, getCountryFlag } from '@/lib/countries'

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  CAD: 'C$',
  EUR: '€',
  GBP: '£',
  MXN: 'MX$',
  AUD: 'A$',
}


type TabType = 'overview' | 'variants' | 'images' | 'pricing' | 'supplier' | 'inventory' | 'history'

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
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [editingVariant, setEditingVariant] = useState<any>(null)
  const [variantEditData, setVariantEditData] = useState<{
    cost: string;
    price: string;
    compareAtPrice: string;
    sku: string;
    barcode: string;
    weight: string;
  } | null>(null)
  const [bundleVariant, setBundleVariant] = useState<any>(null)

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
              {(product as any).hasVariants && (
                <span className="px-2 py-0.5 rounded-full text-xs bg-purple-500/20 text-purple-400">
                  {product.variants?.length || 0} variants
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm">
              {/* For products with variants from Shopify, don't show parent SKU/UPC since each variant has its own */}
              {(product as any).hasVariants ? (
                <>
                  <span className="text-slate-400">
                    <i className="fab fa-shopify text-green-400 mr-1"></i>
                    Synced from Shopify
                  </span>
                  <span className="text-slate-400">Category: <span className="text-white capitalize">{product.category?.replace('_', ' ')}</span></span>
                </>
              ) : (
                <>
                  {product.sku && (
                    <span className="text-slate-400">SKU: <span className="text-white font-mono">{product.sku}</span></span>
                  )}
                  {product.barcode && (
                    <span className="text-slate-400">UPC: <span className="text-white font-mono">{product.barcode}</span></span>
                  )}
                  <span className="text-slate-400">Category: <span className="text-white capitalize">{product.category?.replace('_', ' ')}</span></span>
                </>
              )}
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
            ...(product.variants && product.variants.length > 1
              ? [{ key: 'variants', label: `Variants (${product.variants.length})`, icon: 'fa-layer-group' }]
              : []),
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
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold">Description</h3>
                {product.description && product.description.length > 200 && (
                  <button
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="text-sm text-emerald-400 hover:text-emerald-300"
                  >
                    {isDescriptionExpanded ? 'Show less' : 'Show more'}
                  </button>
                )}
              </div>
              {product.description ? (
                <div className="relative">
                  <div
                    className={`text-slate-300 ${!isDescriptionExpanded && product.description.length > 200 ? 'line-clamp-3' : ''}`}
                    dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, '<br/>') }}
                  />
                  {!isDescriptionExpanded && product.description.length > 200 && (
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-800/50 to-transparent pointer-events-none" />
                  )}
                </div>
              ) : (
                <p className="text-slate-500 italic">No description provided.</p>
              )}
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

            {/* Tags */}
            {((product as any).productTags?.length > 0 || (product as any).tags?.length > 0) && (
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                <h3 className="text-white font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {((product as any).productTags || (product as any).tags || []).map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

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
                    {getCountryDisplay((product as any).countryOfOrigin)}
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping & Fulfillment */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-4">Shipping & Fulfillment</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-400 mb-1">Requires Shipping</div>
                  <div className="flex items-center gap-2">
                    {(product as any).requiresShipping !== false ? (
                      <>
                        <i className="fas fa-check-circle text-emerald-400"></i>
                        <span className="text-white">Yes</span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-times-circle text-slate-500"></i>
                        <span className="text-slate-400">No (Digital/Service)</span>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Taxable</div>
                  <div className="flex items-center gap-2">
                    {(product as any).taxable !== false ? (
                      <>
                        <i className="fas fa-check-circle text-emerald-400"></i>
                        <span className="text-white">Yes</span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-times-circle text-slate-500"></i>
                        <span className="text-slate-400">No</span>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Fulfillment Service</div>
                  <div className="text-white capitalize">
                    {(product as any).fulfillmentService || 'Manual'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Product Source</div>
                  <div className="flex items-center gap-2">
                    {(product as any).source === 'shopify' ? (
                      <>
                        <i className="fab fa-shopify text-green-400"></i>
                        <span className="text-white">Shopify</span>
                      </>
                    ) : (product as any).source === 'amazon' ? (
                      <>
                        <i className="fab fa-amazon text-orange-400"></i>
                        <span className="text-white">Amazon</span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-keyboard text-slate-400"></i>
                        <span className="text-white">Manual Entry</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Shopify Links */}
              {(product as any).source === 'shopify' && (product as any).shopifyAdminUrl && (
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <div className="flex gap-3">
                    <a
                      href={(product as any).shopifyAdminUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-sm text-slate-300 hover:text-white transition-colors"
                    >
                      <i className="fab fa-shopify text-green-400"></i>
                      View in Shopify Admin
                      <i className="fas fa-external-link-alt text-xs text-slate-500"></i>
                    </a>
                    {(product as any).shopifyStorefrontUrl && (
                      <a
                        href={(product as any).shopifyStorefrontUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-sm text-slate-300 hover:text-white transition-colors"
                      >
                        <i className="fas fa-store text-slate-400"></i>
                        View Storefront
                        <i className="fas fa-external-link-alt text-xs text-slate-500"></i>
                      </a>
                    )}
                  </div>
                </div>
              )}
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
            {/* Stock Summary - Only show for non-variant products */}
            {!(product as any).hasVariants && (
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
            )}

            {/* Quick Pricing */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-4">Pricing</h3>
              {(product as any).hasVariants && product.variants && product.variants.length > 1 ? (
                /* Variant pricing summary */
                <div className="space-y-3">
                  <div className="text-sm text-slate-400 mb-2">
                    Pricing varies by variant
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Price Range</span>
                    <span className="text-white font-semibold">
                      {(() => {
                        const prices = product.variants.map(v => v.price || 0).filter(p => p > 0);
                        if (prices.length === 0) return '-';
                        const min = Math.min(...prices);
                        const max = Math.max(...prices);
                        return min === max ? formatCurrency(min) : `${formatCurrency(min)} - ${formatCurrency(max)}`;
                      })()}
                    </span>
                  </div>
                  {canViewCosts && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Cost Range</span>
                      <Cost>
                        <span className="text-slate-300">
                          {(() => {
                            const costs = product.variants.map(v => (v as any).cost || 0).filter(c => c > 0);
                            if (costs.length === 0) return '-';
                            const min = Math.min(...costs);
                            const max = Math.max(...costs);
                            return min === max ? formatCurrency(min) : `${formatCurrency(min)} - ${formatCurrency(max)}`;
                          })()}
                        </span>
                      </Cost>
                    </div>
                  )}
                  {canViewCosts && (
                    <div className="flex justify-between pt-2 border-t border-slate-700">
                      <span className="text-slate-400">Avg Margin</span>
                      <Margin>
                        <span className="text-emerald-400 font-semibold">
                          {(() => {
                            const margins = product.variants.map(v => {
                              const cost = (v as any).cost || 0;
                              const price = v.price || 0;
                              return price > 0 ? ((price - cost) / price) * 100 : 0;
                            }).filter(m => m > 0);
                            if (margins.length === 0) return '0.0';
                            return (margins.reduce((a, b) => a + b, 0) / margins.length).toFixed(1);
                          })()}%
                        </span>
                      </Margin>
                    </div>
                  )}
                  <button
                    onClick={() => setActiveTab('variants')}
                    className="w-full mt-2 px-3 py-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-lg text-sm hover:bg-purple-500/20 transition-colors"
                  >
                    <i className="fas fa-layer-group mr-2"></i>
                    View {product.variants.length} variants
                  </button>
                </div>
              ) : (
                /* Single product pricing */
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
              )}
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
              {product.variants && product.variants.length > 1 ? (
                <div className="space-y-3">
                  <div className="text-sm text-slate-400 mb-2">
                    This product has {product.variants.length} variants with individual SKUs
                  </div>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {product.variants.map((variant, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-slate-900/50 px-3 py-2 rounded-lg">
                        <div>
                          <div className="text-xs text-slate-400">{variant.title || variant.option1 || `Variant ${idx + 1}`}</div>
                          <div className="text-white font-mono text-sm">{variant.sku || 'No SKU'}</div>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(variant.sku || '')
                            success('SKU copied')
                          }}
                          className="p-1.5 text-slate-400 hover:text-white"
                        >
                          <i className="fas fa-copy text-xs"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveTab('variants')}
                    className="w-full text-sm text-emerald-400 hover:text-emerald-300 pt-2"
                  >
                    View all variants →
                  </button>
                </div>
              ) : (
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
              )}
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

      {/* Variants Tab */}
      {activeTab === 'variants' && product.variants && product.variants.length > 1 && (
        <div className="space-y-6">
          {/* Profit Margin Calculator */}
          <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <i className="fas fa-calculator text-emerald-400"></i>
              </div>
              <div>
                <h3 className="text-white font-semibold">Profit Margin Calculator</h3>
                <p className="text-xs text-slate-400">Enter cost and target margin to calculate suggested price</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Cost</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg pl-7 pr-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    id="calc-cost"
                    step="0.01"
                    onChange={(e) => {
                      const cost = parseFloat(e.target.value) || 0;
                      const marginInput = document.getElementById('calc-margin') as HTMLInputElement;
                      const priceOutput = document.getElementById('calc-price') as HTMLInputElement;
                      const margin = parseFloat(marginInput?.value) || 0;
                      if (cost > 0 && margin > 0 && margin < 100) {
                        const price = cost / (1 - margin / 100);
                        if (priceOutput) priceOutput.value = price.toFixed(2);
                      }
                    }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Target Margin %</label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="50"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    id="calc-margin"
                    step="1"
                    onChange={(e) => {
                      const margin = parseFloat(e.target.value) || 0;
                      const costInput = document.getElementById('calc-cost') as HTMLInputElement;
                      const priceOutput = document.getElementById('calc-price') as HTMLInputElement;
                      const cost = parseFloat(costInput?.value) || 0;
                      if (cost > 0 && margin > 0 && margin < 100) {
                        const price = cost / (1 - margin / 100);
                        if (priceOutput) priceOutput.value = price.toFixed(2);
                      }
                    }}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Suggested MSRP</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400">$</span>
                  <input
                    type="text"
                    id="calc-price"
                    readOnly
                    className="w-full bg-emerald-500/10 border border-emerald-500/30 rounded-lg pl-7 pr-3 py-2 text-emerald-400 font-bold"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Profit per Unit</label>
                <div className="text-lg font-bold text-emerald-400 py-2">
                  ${(() => {
                    const costInput = document.getElementById('calc-cost') as HTMLInputElement;
                    const priceOutput = document.getElementById('calc-price') as HTMLInputElement;
                    const cost = parseFloat(costInput?.value) || 0;
                    const price = parseFloat(priceOutput?.value) || 0;
                    return (price - cost).toFixed(2);
                  })()}
                </div>
              </div>
            </div>
          </div>

          {/* Variants Table */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold">Product Variants</h3>
                <p className="text-xs text-slate-400 mt-1">
                  {product.variants.length} variants • {product.options?.map(o => o.name).join(', ') || 'Size'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-slate-400">Total Inventory</div>
                  <div className="text-xl font-bold text-white">{product.totalInventory || 0} units</div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr className="text-left text-xs text-slate-400 uppercase tracking-wider">
                    <th className="px-4 py-3 font-medium">Variant</th>
                    <th className="px-4 py-3 font-medium">SKU</th>
                    <th className="px-4 py-3 font-medium text-center">Stock</th>
                    <th className="px-4 py-3 font-medium text-right">Cost</th>
                    <th className="px-4 py-3 font-medium text-right">Price</th>
                    <th className="px-4 py-3 font-medium text-right">Compare At</th>
                    <th className="px-4 py-3 font-medium text-center">Margin</th>
                    <th className="px-4 py-3 font-medium text-right">Profit</th>
                    <th className="px-4 py-3 font-medium text-center">Weight</th>
                    <th className="px-4 py-3 font-medium text-center">Bundle</th>
                    <th className="px-4 py-3 font-medium text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {product.variants.map((variant, index) => {
                    const variantCost = (variant as any).cost || baseCost || 0;
                    const variantPrice = variant.price || 0;
                    const variantMargin = variantPrice > 0 ? ((variantPrice - variantCost) / variantPrice) * 100 : 0;
                    const variantProfit = variantPrice - variantCost;

                    return (
                      <tr key={variant.id || index} className="hover:bg-slate-800/30 group">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            {variant.imageUrl ? (
                              <img src={variant.imageUrl} alt={variant.title} className="w-10 h-10 rounded-lg object-cover" />
                            ) : (
                              <div className="w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center">
                                <i className="fas fa-box text-slate-500"></i>
                              </div>
                            )}
                            <div>
                              <div className="font-medium text-white">{variant.title}</div>
                              {variant.option1 && (
                                <div className="text-xs text-slate-400">
                                  {[variant.option1, variant.option2, variant.option3].filter(Boolean).join(' / ')}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <code className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300 font-mono">
                            {variant.sku || 'N/A'}
                          </code>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className={`text-lg font-bold ${
                            (variant.inventoryQuantity || 0) > 10 ? 'text-emerald-400' :
                            (variant.inventoryQuantity || 0) > 0 ? 'text-amber-400' : 'text-red-400'
                          }`}>
                            {variant.inventoryQuantity || 0}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <span className="text-slate-300">
                            ${variantCost.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <span className="text-white font-medium">
                            ${variantPrice.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          {variant.compareAtPrice ? (
                            <span className="text-slate-400 line-through">
                              ${variant.compareAtPrice.toFixed(2)}
                            </span>
                          ) : (
                            <span className="text-slate-500">-</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            variantMargin >= 50 ? 'bg-emerald-500/20 text-emerald-400' :
                            variantMargin >= 30 ? 'bg-amber-500/20 text-amber-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {variantMargin.toFixed(1)}%
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <span className={`font-medium ${variantProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            ${variantProfit.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center text-slate-300 text-sm">
                          {variant.weight ? `${variant.weight} ${variant.weightUnit || 'g'}` : '-'}
                        </td>
                        <td className="px-4 py-4 text-center">
                          {(variant as any).bundleConfig?.isBundle ? (
                            <button
                              onClick={() => setBundleVariant(variant)}
                              className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-xs font-medium hover:bg-purple-500/30 transition-colors flex items-center gap-1 mx-auto"
                            >
                              <i className="fas fa-boxes-packing"></i>
                              {(variant as any).bundleConfig.components?.length || 0} items
                            </button>
                          ) : (
                            <button
                              onClick={() => setBundleVariant(variant)}
                              className="p-2 text-slate-500 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-colors"
                              title="Configure as Bundle"
                            >
                              <i className="fas fa-boxes-packing text-sm"></i>
                            </button>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <button
                            onClick={() => {
                              setEditingVariant(variant);
                              setVariantEditData({
                                cost: (variant as any).cost?.toString() || '0',
                                price: (variant.price || 0).toString(),
                                compareAtPrice: (variant.compareAtPrice || '').toString(),
                                sku: variant.sku || '',
                                barcode: (variant as any).barcode || '',
                                weight: (variant.weight || '').toString(),
                              });
                            }}
                            className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-700 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <i className="fas fa-edit text-sm"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Option Values Summary */}
          {product.options && product.options.length > 0 && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-4">Option Values</h3>
              <div className="grid grid-cols-3 gap-4">
                {product.options.map((option, index) => (
                  <div key={index}>
                    <div className="text-sm text-slate-400 mb-2">{option.name}</div>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value, vIndex) => (
                        <span
                          key={vIndex}
                          className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-white"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
        <div className="space-y-6">
          {/* Variant Pricing (for products with variants) */}
          {product.variants && product.variants.length > 1 ? (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-700">
                <h3 className="text-white font-semibold">Pricing by Variant</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Each variant has its own pricing. Click on the Variants tab to edit individual prices.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-900/50">
                    <tr className="text-left text-xs text-slate-400 uppercase tracking-wider">
                      <th className="px-4 py-3 font-medium">Variant</th>
                      <th className="px-4 py-3 font-medium">SKU</th>
                      {canViewCosts && <th className="px-4 py-3 font-medium text-right">Cost</th>}
                      <th className="px-4 py-3 font-medium text-right">Price</th>
                      <th className="px-4 py-3 font-medium text-right">Compare At</th>
                      {canViewCosts && <th className="px-4 py-3 font-medium text-center">Margin</th>}
                      {canViewCosts && <th className="px-4 py-3 font-medium text-right">Profit</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {product.variants.map((variant, index) => {
                      const variantCost = (variant as any).cost || baseCost || 0;
                      const variantPrice = variant.price || 0;
                      const variantMargin = variantPrice > 0 ? ((variantPrice - variantCost) / variantPrice) * 100 : 0;
                      const variantProfit = variantPrice - variantCost;

                      return (
                        <tr key={variant.id || index} className="hover:bg-slate-800/30">
                          <td className="px-4 py-3">
                            <div className="font-medium text-white">{variant.title}</div>
                            {variant.option1 && (
                              <div className="text-xs text-slate-400">
                                {[variant.option1, variant.option2, variant.option3].filter(Boolean).join(' / ')}
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <code className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300 font-mono">
                              {variant.sku || 'N/A'}
                            </code>
                          </td>
                          {canViewCosts && (
                            <td className="px-4 py-3 text-right">
                              <Cost>
                                <span className="text-slate-300">${variantCost.toFixed(2)}</span>
                              </Cost>
                            </td>
                          )}
                          <td className="px-4 py-3 text-right">
                            <span className="text-white font-medium">${variantPrice.toFixed(2)}</span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            {variant.compareAtPrice ? (
                              <span className="text-slate-400 line-through">${variant.compareAtPrice.toFixed(2)}</span>
                            ) : (
                              <span className="text-slate-500">-</span>
                            )}
                          </td>
                          {canViewCosts && (
                            <td className="px-4 py-3 text-center">
                              <Margin>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  variantMargin >= 50 ? 'bg-emerald-500/20 text-emerald-400' :
                                  variantMargin >= 30 ? 'bg-amber-500/20 text-amber-400' :
                                  'bg-red-500/20 text-red-400'
                                }`}>
                                  {variantMargin.toFixed(1)}%
                                </span>
                              </Margin>
                            </td>
                          )}
                          {canViewCosts && (
                            <td className="px-4 py-3 text-right">
                              <Cost>
                                <span className={`font-medium ${variantProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                  ${variantProfit.toFixed(2)}
                                </span>
                              </Cost>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* Pricing Summary */}
              <div className="px-5 py-4 bg-slate-900/30 border-t border-slate-700">
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Price Range</span>
                    <div className="text-white font-medium mt-1">
                      ${Math.min(...product.variants.map(v => v.price || 0)).toFixed(2)} - ${Math.max(...product.variants.map(v => v.price || 0)).toFixed(2)}
                    </div>
                  </div>
                  {canViewCosts && (
                    <>
                      <div>
                        <span className="text-slate-400">Cost Range</span>
                        <Cost>
                          <div className="text-white font-medium mt-1">
                            ${Math.min(...product.variants.map(v => (v as any).cost || baseCost || 0)).toFixed(2)} - ${Math.max(...product.variants.map(v => (v as any).cost || baseCost || 0)).toFixed(2)}
                          </div>
                        </Cost>
                      </div>
                      <div>
                        <span className="text-slate-400">Avg Margin</span>
                        <Margin>
                          <div className="text-emerald-400 font-medium mt-1">
                            {(() => {
                              const margins = product.variants.map(v => {
                                const cost = (v as any).cost || baseCost || 0;
                                const price = v.price || 0;
                                return price > 0 ? ((price - cost) / price) * 100 : 0;
                              });
                              return (margins.reduce((a, b) => a + b, 0) / margins.length).toFixed(1);
                            })()}%
                          </div>
                        </Margin>
                      </div>
                      <div>
                        <span className="text-slate-400">Total Variants</span>
                        <div className="text-white font-medium mt-1">{product.variants.length} variants</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Standard Pricing (for single products) */
            <div className="grid grid-cols-2 gap-6">
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

          {/* Channel Pricing for products with variants */}
          {product.variants && product.variants.length > 1 && (
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                <h3 className="text-white font-semibold mb-4">Sales Channels</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Channel-specific pricing varies by variant. The prices shown below are from the parent product level.
                </p>
                <div className="space-y-3">
                  {pricingData.filter(p => p.icon).map((row, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
                      <div className="flex items-center gap-2">
                        <i className={`${row.icon} ${row.iconColor}`}></i>
                        <span className="text-white">{row.channel}</span>
                      </div>
                      <span className="text-slate-400">{row.price > 0 ? formatCurrency(row.price) : 'Not set'}</span>
                    </div>
                  ))}
                </div>
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

      {/* Variant Bundle Modal */}
      {bundleVariant && product && (
        <VariantBundleModal
          isOpen={!!bundleVariant}
          onClose={() => setBundleVariant(null)}
          variant={bundleVariant}
          product={product}
          onSave={(bundleConfig) => {
            // Update the variant's bundle config in the product
            const updatedVariants = product.variants?.map(v => {
              if (v.id === bundleVariant.id) {
                return {
                  ...v,
                  bundleConfig: bundleConfig,
                };
              }
              return v;
            }) || [];

            // Dispatch update
            dispatch({
              type: 'UPDATE_PRODUCT',
              payload: {
                ...product,
                variants: updatedVariants,
              }
            });

            if (bundleConfig) {
              success(`Bundle configured for "${bundleVariant.title}" with ${bundleConfig.components.length} components`);
            } else {
              success(`Bundle configuration removed from "${bundleVariant.title}"`);
            }
            setBundleVariant(null);
          }}
        />
      )}

      {/* Variant Edit Modal */}
      {editingVariant && variantEditData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-lg">
            <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Edit Variant</h3>
                <p className="text-sm text-slate-400">{editingVariant.title}</p>
              </div>
              <button
                onClick={() => {
                  setEditingVariant(null);
                  setVariantEditData(null);
                }}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">SKU</label>
                  <input
                    type="text"
                    value={variantEditData.sku}
                    onChange={(e) => setVariantEditData({ ...variantEditData, sku: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Barcode</label>
                  <input
                    type="text"
                    value={variantEditData.barcode}
                    onChange={(e) => setVariantEditData({ ...variantEditData, barcode: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Cost</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={variantEditData.cost}
                      onChange={(e) => setVariantEditData({ ...variantEditData, cost: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg pl-7 pr-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={variantEditData.price}
                      onChange={(e) => setVariantEditData({ ...variantEditData, price: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg pl-7 pr-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Compare At</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={variantEditData.compareAtPrice}
                      onChange={(e) => setVariantEditData({ ...variantEditData, compareAtPrice: e.target.value })}
                      placeholder="Optional"
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg pl-7 pr-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Weight</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="0.01"
                      value={variantEditData.weight}
                      onChange={(e) => setVariantEditData({ ...variantEditData, weight: e.target.value })}
                      className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                    />
                    <span className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-400">
                      {editingVariant.weightUnit || 'g'}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Calculated Margin</label>
                  <div className="px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg">
                    {(() => {
                      const cost = parseFloat(variantEditData.cost) || 0;
                      const price = parseFloat(variantEditData.price) || 0;
                      const margin = price > 0 ? ((price - cost) / price) * 100 : 0;
                      return (
                        <span className={`font-bold ${margin >= 50 ? 'text-emerald-400' : margin >= 30 ? 'text-amber-400' : 'text-red-400'}`}>
                          {margin.toFixed(1)}%
                        </span>
                      );
                    })()}
                    <span className="text-slate-500 ml-2">
                      (${((parseFloat(variantEditData.price) || 0) - (parseFloat(variantEditData.cost) || 0)).toFixed(2)} profit)
                    </span>
                  </div>
                </div>
              </div>

              {/* Variant ID info */}
              <div className="p-3 bg-slate-900/50 rounded-lg text-xs text-slate-500">
                <div>Variant ID: {editingVariant.id}</div>
                {editingVariant.inventoryItemId && (
                  <div>Inventory Item: {editingVariant.inventoryItemId}</div>
                )}
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-700 flex justify-end gap-3">
              <button
                onClick={() => {
                  setEditingVariant(null);
                  setVariantEditData(null);
                }}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!product || !editingVariant) return;

                  // Update the variant in the product's variants array
                  const updatedVariants = product.variants?.map(v => {
                    if (v.id === editingVariant.id) {
                      return {
                        ...v,
                        sku: variantEditData.sku,
                        barcode: variantEditData.barcode,
                        cost: parseFloat(variantEditData.cost) || 0,
                        price: parseFloat(variantEditData.price) || 0,
                        compareAtPrice: variantEditData.compareAtPrice ? parseFloat(variantEditData.compareAtPrice) : undefined,
                        weight: parseFloat(variantEditData.weight) || 0,
                      };
                    }
                    return v;
                  }) || [];

                  // Dispatch update
                  dispatch({
                    type: 'UPDATE_PRODUCT',
                    payload: {
                      ...product,
                      variants: updatedVariants,
                    }
                  });

                  success(`Variant "${editingVariant.title}" updated`);
                  setEditingVariant(null);
                  setVariantEditData(null);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
