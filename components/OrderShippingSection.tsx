'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc, updateDoc, serverTimestamp, collection, query, where, onSnapshot } from 'firebase/firestore'
import { useOrganization } from '@/context/OrganizationContext'
import { useToast } from '@/components/ui/Toast'
import type { BoxSizeSettings } from '@/types'

interface Package {
  id: string
  items: Array<{
    lineItemId: string
    name: string
    sku: string
    quantity: number
  }>
  weight: number
  weightUnit: 'lb' | 'oz' | 'kg'
  dimensions: {
    length: number
    width: number
    height: number
    unit: 'in' | 'cm'
  }
  presetName?: string
  boxProductId?: string // Links to the box product for inventory deduction
  trackingNumber?: string
  labelUrl?: string
}

interface ShippingRate {
  id: string
  carrier: string
  name: string
  title: string
  short_title: string
  total_net_charge: string
  base_rate: string
  currency: string
  cutoff?: string
  carrier_id?: number
  sub_carrier_id?: number
  remote_shipment_id?: string
  service_carrier?: string
  estimated_delivery_date?: string
  delivery_days?: number
  veeqo_credits?: number
  charges?: Array<{
    price: string
    charge_id: string
    charge_title: string
    charge_type: 'MANDATORY' | 'OPTIONAL'
  }>
}

// Fallback box presets (used when no box products are configured)
const FALLBACK_BOX_PRESETS = [
  { name: 'Small Box', length: 8, width: 6, height: 4, productId: undefined },
  { name: 'Medium Box', length: 12, width: 10, height: 8, productId: undefined },
  { name: 'Large Box', length: 18, width: 14, height: 10, productId: undefined },
  { name: 'Custom', length: 0, width: 0, height: 0, productId: undefined },
]

interface OrderShippingSectionProps {
  order: any
  onUpdate?: (order: any) => void
}

// Calculate total weight from order items
function calculateOrderWeight(items: any[]): number {
  if (!items || items.length === 0) return 1

  let totalWeight = 0
  items.forEach(item => {
    // Check various weight field names
    const itemWeight = item.weight?.value || item.weight || item.productWeight || 0
    const quantity = item.quantity || 1
    totalWeight += itemWeight * quantity
  })

  // Return at least 1 lb if no weights found
  return totalWeight > 0 ? totalWeight : 1
}

// Suggest a box size based on total weight
function suggestBoxSize(totalWeight: number): { name: string; length: number; width: number; height: number } {
  if (totalWeight <= 1) {
    return { name: 'Small Box', length: 8, width: 6, height: 4 }
  } else if (totalWeight <= 5) {
    return { name: 'Medium Box', length: 12, width: 10, height: 8 }
  } else {
    return { name: 'Large Box', length: 18, width: 14, height: 10 }
  }
}

// Find matching preset for given dimensions
function findMatchingPreset(
  dims: { length: number; width: number; height: number },
  presets: Array<{ name: string; length: number; width: number; height: number }>
): string {
  const match = presets.find(p =>
    p.length === dims.length && p.width === dims.width && p.height === dims.height
  )
  return match?.name || 'Custom'
}

export function OrderShippingSection({ order, onUpdate }: OrderShippingSectionProps) {
  const { organization } = useOrganization()
  const { success, error: showError } = useToast()

  // Load box sizes from inventory (shipping supply products)
  const [inventoryBoxes, setInventoryBoxes] = useState<BoxSizeSettings[]>([])
  const [loadingBoxes, setLoadingBoxes] = useState(true)

  useEffect(() => {
    if (!organization?.id) {
      setLoadingBoxes(false)
      return
    }

    // Subscribe to box sizes from settings
    const boxSizesRef = collection(db, 'organizations', organization.id, 'boxSizes')
    const activeBoxQuery = query(boxSizesRef, where('isActive', '==', true))

    const unsubscribe = onSnapshot(
      activeBoxQuery,
      (snapshot) => {
        const boxes = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as BoxSizeSettings[]

        // Sort by volume (smallest first)
        boxes.sort((a, b) => {
          const volA = a.outerDimensions.length * a.outerDimensions.width * a.outerDimensions.height
          const volB = b.outerDimensions.length * b.outerDimensions.width * b.outerDimensions.height
          return volA - volB
        })

        setInventoryBoxes(boxes)
        setLoadingBoxes(false)
      },
      (err) => {
        console.error('Error loading box sizes:', err)
        setLoadingBoxes(false)
      }
    )

    return () => unsubscribe()
  }, [organization?.id])

  // Create dynamic box presets from inventory or fallback
  const boxPresets = inventoryBoxes.length > 0
    ? [
        ...inventoryBoxes.map(box => ({
          name: box.name,
          length: box.outerDimensions.length,
          width: box.outerDimensions.width,
          height: box.outerDimensions.height,
          productId: box.productId,
          stock: box.currentStock,
          sku: box.sku,
        })),
        { name: 'Custom', length: 0, width: 0, height: 0, productId: undefined, stock: undefined, sku: undefined },
      ]
    : FALLBACK_BOX_PRESETS.map(p => ({ ...p, stock: undefined, sku: undefined }))

  // Calculate weight from order items
  const orderItems = order.lineItems || order.items || []
  const calculatedWeight = calculateOrderWeight(orderItems)
  const suggestedBox = suggestBoxSize(calculatedWeight)

  // Packages/boxes state
  const [packages, setPackages] = useState<Package[]>(() => {
    // Initialize with saved packages or create default with calculated values
    if (order.packages?.length) {
      // Add presetName to existing packages if missing
      return order.packages.map((pkg: Package) => ({
        ...pkg,
        presetName: pkg.presetName || findMatchingPreset(pkg.dimensions, FALLBACK_BOX_PRESETS)
      }))
    }
    // Default: all items in one box with calculated weight
    return [{
      id: 'pkg_1',
      items: orderItems.map((item: any) => ({
        lineItemId: item.id || item.sku,
        name: item.name || item.productName,
        sku: item.sku,
        quantity: item.quantity,
      })),
      weight: calculatedWeight,
      weightUnit: 'lb' as const,
      dimensions: {
        length: suggestedBox.length,
        width: suggestedBox.width,
        height: suggestedBox.height,
        unit: 'in' as const
      },
      presetName: suggestedBox.name,
      boxProductId: undefined, // Will be set when selecting from inventory boxes
    }]
  })

  // Shipping rates
  const [rates, setRates] = useState<ShippingRate[]>([])
  const [selectedRate, setSelectedRate] = useState<ShippingRate | null>(null)
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [loadingRates, setLoadingRates] = useState(false)
  const [purchasing, setPurchasing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Ship date (today or future)
  const [shipDate, setShipDate] = useState<string>(() => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  })

  // Clear rates when ship date changes (transit days need to be recalculated)
  useEffect(() => {
    if (rates.length > 0) {
      setRates([])
      setSelectedRate(null)
    }
  }, [shipDate]) // eslint-disable-line react-hooks/exhaustive-deps

  // Get customer paid shipping amount from order (handle both number and string values)
  const customerPaidShipping = parseFloat(
    order.shippingTotal || order.shipping || order.shippingPrice || '0'
  ) || 0

  // Calculate estimated delivery date based on ship date and transit days
  const calculateEstimatedDelivery = (transitDays: number | undefined): string | null => {
    if (!transitDays) return null
    const ship = new Date(shipDate)
    ship.setDate(ship.getDate() + transitDays)
    return ship.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }

  // Calculate shipping profit/loss
  const calculateShippingProfit = (shippingCost: number): { amount: number; isProfit: boolean } => {
    const profit = customerPaidShipping - shippingCost
    return { amount: Math.abs(profit), isProfit: profit >= 0 }
  }

  // Check if already shipped
  const isShipped = order.fulfillmentStatus === 'fulfilled' ||
                    order.status === 'shipped' ||
                    order.status === 'delivered' ||
                    order.shipment?.trackingNumber

  // Check if Veeqo is connected (with Firestore fallback)
  const [veeqoConnected, setVeeqoConnected] = useState(false)
  const [checkingVeeqo, setCheckingVeeqo] = useState(true)

  useEffect(() => {
    async function checkVeeqoConnection() {
      // First check from context
      if (organization?.veeqo?.isConnected) {
        setVeeqoConnected(true)
        setCheckingVeeqo(false)
        return
      }

      // If not in context, check Firestore directly
      if (organization?.id) {
        try {
          const orgDoc = await getDoc(doc(db, 'organizations', organization.id))
          if (orgDoc.exists()) {
            const data = orgDoc.data()
            if (data.veeqo?.isConnected) {
              setVeeqoConnected(true)
            }
          }
        } catch (err) {
          console.error('Error checking Veeqo connection:', err)
        }
      }
      setCheckingVeeqo(false)
    }

    checkVeeqoConnection()
  }, [organization?.id, organization?.veeqo?.isConnected])

  // Get shipping address from order
  const shippingAddress = order.shippingAddress || order.customer?.address || null
  const shipToAddress = shippingAddress ? {
    name: shippingAddress.name || `${shippingAddress.firstName || ''} ${shippingAddress.lastName || ''}`.trim() || order.customer?.name,
    company: shippingAddress.company,
    address1: shippingAddress.address1 || shippingAddress.street,
    address2: shippingAddress.address2,
    city: shippingAddress.city,
    state: shippingAddress.state || shippingAddress.province || shippingAddress.provinceCode,
    zip: shippingAddress.zip || shippingAddress.postalCode,
    country: shippingAddress.country || shippingAddress.countryCode || 'US',
    phone: shippingAddress.phone || order.customer?.phone,
  } : null

  // Add a new package
  const addPackage = () => {
    // Use first inventory box if available, otherwise fallback
    const defaultBox = boxPresets.find(b => b.name !== 'Custom') || FALLBACK_BOX_PRESETS[1]
    setPackages(prev => [
      ...prev,
      {
        id: `pkg_${Date.now()}`,
        items: [],
        weight: 1,
        weightUnit: 'lb' as const,
        dimensions: {
          length: defaultBox.length,
          width: defaultBox.width,
          height: defaultBox.height,
          unit: 'in' as const
        },
        presetName: defaultBox.name,
        boxProductId: defaultBox.productId,
      }
    ])
    setRates([]) // Clear rates when packages change
  }

  // Remove a package
  const removePackage = (packageId: string) => {
    if (packages.length <= 1) return

    const pkgToRemove = packages.find(p => p.id === packageId)

    setPackages(prev => {
      const remaining = prev.filter(p => p.id !== packageId)
      // Move items from removed package to first package
      if (pkgToRemove?.items.length && remaining.length > 0) {
        remaining[0] = {
          ...remaining[0],
          items: [...remaining[0].items, ...pkgToRemove.items]
        }
      }
      return remaining
    })
    setRates([]) // Clear rates when packages change
  }

  // Update package details
  const updatePackage = (packageId: string, updates: Partial<Package>) => {
    setPackages(prev => prev.map(pkg =>
      pkg.id === packageId ? { ...pkg, ...updates } : pkg
    ))
    // Don't clear rates - they'll be auto-refreshed by the useEffect
    // The loading state will show when refresh happens
  }

  // Move item to different package
  const moveItem = (itemId: string, fromPkgId: string, toPkgId: string, quantity: number = 1) => {
    setPackages(prev => {
      const fromPkg = prev.find(p => p.id === fromPkgId)
      const item = fromPkg?.items.find(i => i.lineItemId === itemId)
      if (!item) return prev

      return prev.map(pkg => {
        if (pkg.id === fromPkgId) {
          const updatedItems = pkg.items.map(i =>
            i.lineItemId === itemId
              ? { ...i, quantity: i.quantity - quantity }
              : i
          ).filter(i => i.quantity > 0)
          return { ...pkg, items: updatedItems }
        }
        if (pkg.id === toPkgId) {
          const existing = pkg.items.find(i => i.lineItemId === itemId)
          if (existing) {
            return {
              ...pkg,
              items: pkg.items.map(i =>
                i.lineItemId === itemId
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              )
            }
          } else {
            return {
              ...pkg,
              items: [...pkg.items, { ...item, quantity }]
            }
          }
        }
        return pkg
      })
    })
  }

  // Extract actual carrier from rate title (e.g., "USPS Ground Advantage" -> "USPS")
  const extractCarrierFromTitle = (title: string): string => {
    const upperTitle = title.toUpperCase()
    if (upperTitle.includes('USPS')) return 'USPS'
    if (upperTitle.includes('UPS')) return 'UPS'
    if (upperTitle.includes('FEDEX') || upperTitle.includes('FED EX')) return 'FedEx'
    if (upperTitle.includes('DHL')) return 'DHL'
    if (upperTitle.includes('AMAZON')) return 'Amazon'
    return 'Carrier'
  }

  // Get carrier icon based on actual carrier name
  const getCarrierIcon = (carrierName: string) => {
    const icons: Record<string, string> = {
      usps: 'fa-envelope',
      ups: 'fa-box',
      fedex: 'fa-truck-fast',
      dhl: 'fa-plane',
      amazon: 'fa-box',
    }
    return icons[carrierName.toLowerCase()] || 'fa-box'
  }

  // Get carrier color based on actual carrier name
  const getCarrierColor = (carrierName: string) => {
    const colors: Record<string, string> = {
      usps: 'text-blue-500',
      ups: 'text-amber-500',
      fedex: 'text-purple-500',
      dhl: 'text-yellow-500',
      amazon: 'text-orange-500',
    }
    return colors[carrierName.toLowerCase()] || 'text-slate-400'
  }

  // Get carrier logo/badge background
  const getCarrierBg = (carrierName: string) => {
    const bgs: Record<string, string> = {
      usps: 'bg-blue-500/20',
      ups: 'bg-amber-500/20',
      fedex: 'bg-purple-500/20',
      dhl: 'bg-yellow-500/20',
      amazon: 'bg-orange-500/20',
    }
    return bgs[carrierName.toLowerCase()] || 'bg-slate-500/20'
  }

  // State for allocation ID (can be populated from API response)
  const [allocationId, setAllocationId] = useState<number | null>(order.veeqoAllocationId || null)

  // Get shipping rates
  const getShippingRates = async () => {
    if (!organization?.id || !veeqoConnected) return

    setLoadingRates(true)
    setError(null)
    setRates([])
    setSelectedRate(null)

    try {
      // Get order number - check various possible field names
      const orderNumber = order.orderNumber || order.number || order.name || order.shopifyOrderNumber || order.id

      const response = await fetch('/api/veeqo/shipping-rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId: organization.id,
          orderNumber: orderNumber,
          allocationId: allocationId || order.veeqoAllocationId,
          shipDate: shipDate, // Pass ship date to calculate correct transit days
          packages: packages.map(pkg => ({
            weight: pkg.weight,
            weightUnit: pkg.weightUnit,
            dimensions: pkg.dimensions,
          })),
        }),
      })

      const data = await response.json()

      if (data.success) {
        setRates(data.rates || [])
        // Save allocation ID for future use
        if (data.allocationId) {
          setAllocationId(data.allocationId)
        }
        // Auto-select cheapest
        if (data.cheapest) {
          setSelectedRate(data.cheapest)
        }
      } else {
        // Show more helpful error with hint if available
        const errorMsg = data.hint
          ? `${data.error}\n\n${data.hint}`
          : data.error || 'Failed to get shipping rates'
        setError(errorMsg)
      }
    } catch (err: any) {
      setError(err.message || 'Failed to get shipping rates')
    } finally {
      setLoadingRates(false)
    }
  }

  // Track if we've fetched rates at least once (to enable auto-refresh)
  const hasFetchedRates = useRef(false)
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-refresh rates when packages change (debounced)
  useEffect(() => {
    // Only auto-refresh if we've already fetched rates once and have an allocation ID
    if (!hasFetchedRates.current || !allocationId || !veeqoConnected) return

    // Clear any existing timer
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current)
    }

    // Set a new timer to refresh rates after 800ms of no changes
    refreshTimerRef.current = setTimeout(() => {
      getShippingRates()
    }, 800)

    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current)
      }
    }
  }, [packages, allocationId, veeqoConnected])

  // Mark that we've fetched rates when rates are loaded
  useEffect(() => {
    if (rates.length > 0) {
      hasFetchedRates.current = true
    }
  }, [rates])

  // Calculate total with add-ons
  const calculateTotal = () => {
    if (!selectedRate) return 0
    let total = parseFloat(selectedRate.total_net_charge) * packages.length

    const addOnServices = selectedRate.charges
      ?.filter(c => c.charge_type === 'OPTIONAL' && selectedAddOns.includes(c.charge_id)) || []

    addOnServices.forEach(addon => {
      total += parseFloat(addon.price.replace('$', '')) * packages.length
    })

    return total
  }

  // Purchase shipping labels
  const purchaseLabels = async () => {
    if (!organization?.id || !selectedRate || !allocationId) {
      setError('Missing allocation ID. Please try getting rates again.')
      return
    }

    setPurchasing(true)
    setError(null)

    try {
      // Calculate total with add-ons
      const totalShippingCost = calculateTotal()
      const totalCharge = totalShippingCost / packages.length // Per package price
      const addOnServices = selectedRate.charges
        ?.filter(c => c.charge_type === 'OPTIONAL' && selectedAddOns.includes(c.charge_id))
        .map(c => ({ id: c.charge_id, price: c.price })) || []

      // Calculate shipping profit
      const shippingProfit = customerPaidShipping - totalShippingCost

      const response = await fetch('/api/veeqo/purchase-label', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId: organization.id,
          orderId: order.id,
          allocationId: allocationId,
          carrierId: selectedRate.carrier_id,
          subCarrierId: selectedRate.sub_carrier_id,
          remoteShipmentId: selectedRate.remote_shipment_id,
          serviceCarrier: selectedRate.service_carrier || selectedRate.carrier,
          serviceName: selectedRate.title || selectedRate.name,
          totalNetCharge: totalCharge.toFixed(2),
          baseRate: selectedRate.base_rate,
          valueAddedServices: addOnServices,
          packages: packages,
          // Shipping cost tracking
          shipDate: shipDate,
          customerPaidShipping: customerPaidShipping,
          actualShippingCost: totalShippingCost,
          shippingProfit: shippingProfit,
          transitDays: selectedRate.delivery_days,
          estimatedDelivery: calculateEstimatedDelivery(selectedRate.delivery_days),
        }),
      })

      const data = await response.json()

      if (data.success) {
        success('Shipping label purchased successfully!')

        // Update local order state with shipping cost tracking
        if (onUpdate) {
          onUpdate({
            ...order,
            packages: data.packages || packages,
            shipment: {
              ...data.shipment,
              customerPaidShipping,
              actualShippingCost: totalShippingCost,
              shippingProfit,
              transitDays: selectedRate.delivery_days,
              estimatedDelivery: calculateEstimatedDelivery(selectedRate.delivery_days),
              shipDate,
            },
            fulfillmentStatus: 'fulfilled',
            status: 'shipped',
          })
        }
      } else {
        setError(data.error || 'Failed to purchase labels')
        showError(data.error || 'Failed to purchase labels')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to purchase labels')
      showError(err.message || 'Failed to purchase labels')
    } finally {
      setPurchasing(false)
    }
  }

  // Already shipped - show shipment info
  if (isShipped && order.shipment) {
    const shipProfit = order.shipment.shippingProfit ?? (
      (order.shipment.customerPaidShipping || 0) - (order.shipment.actualShippingCost || order.shipment.shippingCost || 0)
    )
    const isProfitable = shipProfit >= 0

    return (
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
              <i className="fas fa-check text-emerald-400"></i>
            </div>
            <h2 className="font-semibold text-white">Shipped</h2>
          </div>
        </div>
        <div className="p-5">
          {/* Shipping Cost Summary */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-slate-900/50 rounded-lg mb-4">
            <div className="text-center">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Customer Paid</div>
              <div className="text-white font-semibold">
                ${(parseFloat(order.shipment.customerPaidShipping || order.shippingTotal || order.shipping || '0') || 0).toFixed(2)}
              </div>
            </div>
            <div className="text-center border-x border-slate-700">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Actual Cost</div>
              <div className="text-white font-semibold">
                ${(order.shipment.actualShippingCost || order.shipment.shippingCost || 0).toFixed(2)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Ship Profit</div>
              <div className={`font-bold ${isProfitable ? 'text-emerald-400' : 'text-red-400'}`}>
                {isProfitable ? '+' : '-'}${Math.abs(shipProfit).toFixed(2)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <div className="text-slate-400 text-xs mb-1">Carrier</div>
              <div className="text-white font-medium">{order.shipment.carrier}</div>
            </div>
            <div>
              <div className="text-slate-400 text-xs mb-1">Service</div>
              <div className="text-white">{order.shipment.service}</div>
            </div>
            <div>
              <div className="text-slate-400 text-xs mb-1">Packages</div>
              <div className="text-white">{order.packages?.length || 1} box(es)</div>
            </div>
            {order.shipment.estimatedDelivery && (
              <div>
                <div className="text-slate-400 text-xs mb-1">Est. Delivery</div>
                <div className="text-blue-400">{order.shipment.estimatedDelivery}</div>
              </div>
            )}
          </div>

          {/* Tracking Numbers */}
          <div className="border-t border-slate-700/50 pt-4">
            <div className="text-slate-400 text-xs mb-2">Tracking</div>
            <div className="space-y-2">
              {(order.shipment.trackingNumbers || [order.shipment.trackingNumber]).filter(Boolean).map((tracking: string, i: number) => (
                <div key={i} className="flex items-center justify-between p-2 bg-slate-900/50 rounded-lg">
                  <span className="text-slate-300 text-sm">
                    {(order.packages?.length || 1) > 1 ? `Box ${i + 1}: ` : ''}
                    <span className="text-white font-mono">{tracking}</span>
                  </span>
                  <a
                    href={order.shipment.trackingUrls?.[i] || order.shipment.trackingUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1"
                  >
                    Track <i className="fas fa-external-link-alt text-xs"></i>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Print Labels */}
          <div className="mt-4 flex flex-wrap gap-2">
            {(order.shipment.labelUrls || [order.shipment.labelUrl]).filter(Boolean).map((url: string, i: number) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[120px] py-2 px-4 bg-slate-700 text-white rounded-lg hover:bg-slate-600 text-sm text-center transition-colors"
              >
                <i className="fas fa-print mr-2"></i>
                {(order.packages?.length || 1) > 1 ? `Label ${i + 1}` : 'Print Label'}
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Not shipped yet - show shipping options
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-700/50">
        <h2 className="font-semibold text-white">
          <i className="fas fa-shipping-fast text-orange-400 mr-2"></i>
          Shipping
        </h2>
      </div>
      <div className="p-5">
        {checkingVeeqo ? (
          <div className="flex items-center justify-center py-6">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-500"></div>
            <span className="ml-2 text-slate-400">Checking shipping options...</span>
          </div>
        ) : !veeqoConnected ? (
          <div className="text-center py-6">
            <i className="fas fa-truck text-4xl text-slate-600 mb-3"></i>
            <p className="text-slate-400 mb-4">Connect Veeqo to get discounted shipping rates</p>
            <a
              href="/settings/integrations/veeqo"
              className="text-emerald-400 hover:text-emerald-300 text-sm"
            >
              Set up Veeqo Integration →
            </a>
          </div>
        ) : !shipToAddress ? (
          <div className="text-center py-6">
            <i className="fas fa-map-marker-alt text-4xl text-slate-600 mb-3"></i>
            <p className="text-slate-400">No shipping address available</p>
          </div>
        ) : (
          <>
            {/* Ship-To Preview */}
            <div className="p-3 bg-slate-900/50 rounded-lg mb-4">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Ship To</div>
              <div className="text-sm text-white">
                {shipToAddress.name}
                {shipToAddress.company && <span className="text-slate-400 ml-1">({shipToAddress.company})</span>}
              </div>
              <div className="text-sm text-slate-400">
                {shipToAddress.address1}
                {shipToAddress.address2 && `, ${shipToAddress.address2}`}
              </div>
              <div className="text-sm text-slate-400">
                {shipToAddress.city}, {shipToAddress.state} {shipToAddress.zip}
              </div>
            </div>

            {/* Customer Selected Shipping Method */}
            {order.customerShippingMethod && (
              <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg mb-4">
                <div className="flex items-center gap-2">
                  <i className="fas fa-info-circle text-blue-400"></i>
                  <div>
                    <span className="text-xs text-blue-400 uppercase tracking-wider">Customer Selected:</span>
                    <span className="text-white font-medium ml-2">{order.customerShippingMethod}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Customer Shipping Payment & Ship Date */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* Customer Paid */}
              <div className="p-3 bg-slate-900/50 rounded-lg">
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Customer Paid</div>
                <div className="text-lg font-bold text-white">
                  ${customerPaidShipping.toFixed(2)}
                </div>
                <div className="text-xs text-slate-500">for shipping</div>
              </div>

              {/* Ship Date Selector */}
              <div className="p-3 bg-slate-900/50 rounded-lg">
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Ship Date</div>
                <input
                  type="date"
                  value={shipDate}
                  onChange={(e) => setShipDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
                <div className="text-xs text-slate-500 mt-1">
                  {shipDate === new Date().toISOString().split('T')[0] ? 'Shipping today' : 'Future ship date'}
                </div>
              </div>
            </div>

            {/* Packages/Boxes */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-medium text-sm">
                  Packages ({packages.length} {packages.length === 1 ? 'box' : 'boxes'})
                </h3>
                <button
                  onClick={addPackage}
                  className="text-sm text-emerald-400 hover:text-emerald-300"
                >
                  <i className="fas fa-plus mr-1"></i>
                  Add Box
                </button>
              </div>

              <div className="space-y-4">
                {packages.map((pkg, index) => (
                  <div key={pkg.id} className="p-4 bg-slate-900/50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white font-medium text-sm">Box {index + 1}</span>
                      {packages.length > 1 && (
                        <button
                          onClick={() => removePackage(pkg.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      )}
                    </div>

                    {/* Items in this box */}
                    <div className="mb-3">
                      <div className="text-slate-400 text-xs mb-2">Items in this box:</div>
                      {pkg.items.length === 0 ? (
                        <p className="text-slate-500 text-sm italic">No items assigned</p>
                      ) : (
                        <div className="space-y-1">
                          {pkg.items.map(item => (
                            <div key={item.lineItemId} className="flex items-center justify-between text-sm">
                              <span className="text-slate-300 truncate flex-1">
                                {item.name} <span className="text-slate-500">× {item.quantity}</span>
                              </span>
                              {packages.length > 1 && item.quantity > 0 && (
                                <select
                                  onChange={(e) => {
                                    if (e.target.value) {
                                      moveItem(item.lineItemId, pkg.id, e.target.value, 1)
                                      e.target.value = ''
                                    }
                                  }}
                                  className="ml-2 bg-slate-800 border border-slate-600 rounded px-2 py-0.5 text-xs text-slate-300"
                                  defaultValue=""
                                >
                                  <option value="" disabled>Move 1 to...</option>
                                  {packages.filter(p => p.id !== pkg.id).map((p, i) => (
                                    <option key={p.id} value={p.id}>
                                      Box {packages.findIndex(pp => pp.id === p.id) + 1}
                                    </option>
                                  ))}
                                </select>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Box Preset Selector */}
                    <div className="mb-3">
                      <label className="block text-xs text-slate-500 mb-1">
                        Box Size
                        {inventoryBoxes.length > 0 && (
                          <span className="text-emerald-400 ml-1">(from inventory)</span>
                        )}
                      </label>
                      <select
                        value={pkg.presetName || 'Custom'}
                        onChange={(e) => {
                          const preset = boxPresets.find(b => b.name === e.target.value)
                          if (preset && preset.name !== 'Custom') {
                            updatePackage(pkg.id, {
                              dimensions: {
                                length: preset.length,
                                width: preset.width,
                                height: preset.height,
                                unit: 'in' as const
                              },
                              presetName: preset.name,
                              boxProductId: preset.productId,
                            })
                          } else {
                            updatePackage(pkg.id, {
                              presetName: 'Custom',
                              boxProductId: undefined,
                            })
                          }
                        }}
                        className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-emerald-500"
                      >
                        {boxPresets.map(preset => (
                          <option
                            key={preset.name}
                            value={preset.name}
                            disabled={preset.stock !== undefined && preset.stock <= 0}
                          >
                            {preset.name}
                            {preset.length > 0 ? ` (${preset.length}" × ${preset.width}" × ${preset.height}")` : ''}
                            {preset.stock !== undefined && ` - ${preset.stock} in stock`}
                            {preset.stock !== undefined && preset.stock <= 0 && ' (OUT OF STOCK)'}
                          </option>
                        ))}
                      </select>
                      {pkg.boxProductId && inventoryBoxes.length > 0 && (
                        <div className="text-xs text-emerald-400 mt-1">
                          <i className="fas fa-check-circle mr-1"></i>
                          Box will be deducted from inventory when label is purchased
                        </div>
                      )}
                    </div>

                    {/* Weight Input */}
                    <div className="mb-3">
                      <label className="block text-xs text-slate-500 mb-1">
                        Package Weight
                        {calculatedWeight > 0 && (
                          <span className="text-slate-600 ml-1">(calculated: {calculatedWeight.toFixed(1)} lb)</span>
                        )}
                      </label>
                      <div className="flex">
                        <input
                          type="number"
                          value={pkg.weight}
                          onChange={(e) => updatePackage(pkg.id, { weight: parseFloat(e.target.value) || 0 })}
                          className="flex-1 bg-slate-800 border border-slate-600 rounded-l px-3 py-1.5 text-white text-sm focus:outline-none focus:border-emerald-500"
                          min="0.1"
                          step="0.1"
                        />
                        <select
                          value={pkg.weightUnit}
                          onChange={(e) => updatePackage(pkg.id, { weightUnit: e.target.value as any })}
                          className="bg-slate-800 border border-slate-600 border-l-0 rounded-r px-2 py-1.5 text-white text-sm focus:outline-none"
                        >
                          <option value="lb">lb</option>
                          <option value="oz">oz</option>
                        </select>
                      </div>
                    </div>

                    {/* Dimensions */}
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Dimensions (inches)</label>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <input
                            type="number"
                            value={pkg.dimensions.length}
                            onChange={(e) => {
                              updatePackage(pkg.id, {
                                dimensions: { ...pkg.dimensions, length: parseFloat(e.target.value) || 0 },
                                presetName: 'Custom'
                              })
                            }}
                            className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-emerald-500"
                            placeholder="L"
                          />
                          <div className="text-xs text-slate-600 text-center mt-0.5">Length</div>
                        </div>
                        <div>
                          <input
                            type="number"
                            value={pkg.dimensions.width}
                            onChange={(e) => {
                              updatePackage(pkg.id, {
                                dimensions: { ...pkg.dimensions, width: parseFloat(e.target.value) || 0 },
                                presetName: 'Custom'
                              })
                            }}
                            className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-emerald-500"
                            placeholder="W"
                          />
                          <div className="text-xs text-slate-600 text-center mt-0.5">Width</div>
                        </div>
                        <div>
                          <input
                            type="number"
                            value={pkg.dimensions.height}
                            onChange={(e) => {
                              updatePackage(pkg.id, {
                                dimensions: { ...pkg.dimensions, height: parseFloat(e.target.value) || 0 },
                                presetName: 'Custom'
                              })
                            }}
                            className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-emerald-500"
                            placeholder="H"
                          />
                          <div className="text-xs text-slate-600 text-center mt-0.5">Height</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Get Rates Button */}
            {rates.length === 0 && (
              <button
                onClick={getShippingRates}
                disabled={loadingRates}
                className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
              >
                {loadingRates ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Getting Rates...
                  </>
                ) : (
                  <>
                    <i className="fas fa-search-dollar"></i>
                    Get Shipping Rates
                  </>
                )}
              </button>
            )}

            {/* Error */}
            {error && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                <i className="fas fa-exclamation-circle mr-2"></i>
                <span className="whitespace-pre-line">{error}</span>
              </div>
            )}

            {/* Shipping Rates */}
            {rates.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-medium text-sm">Select Shipping Rate</h3>
                  <button
                    onClick={getShippingRates}
                    disabled={loadingRates}
                    className="text-sm text-slate-400 hover:text-white"
                  >
                    <i className="fas fa-sync-alt mr-1"></i>
                    Refresh
                  </button>
                </div>

                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {rates.map((rate, index) => {
                    // Extract actual carrier from the service title
                    const actualCarrier = extractCarrierFromTitle(rate.title || rate.short_title || '')
                    const totalCost = parseFloat(rate.total_net_charge) * packages.length
                    const profit = calculateShippingProfit(totalCost)
                    // Use pre-calculated estimated delivery from API, or calculate if not available
                    const estDelivery = rate.estimated_delivery_date || calculateEstimatedDelivery(rate.delivery_days)

                    // Check if this rate matches customer's selection
                    const customerMethod = order.customerShippingMethod?.toLowerCase() || ''
                    const rateTitle = (rate.title || rate.short_title || '').toLowerCase()
                    const matchesCustomerSelection = customerMethod && (
                      rateTitle.includes(customerMethod) ||
                      customerMethod.includes(rateTitle.split(' ')[0]) ||
                      (customerMethod.includes('ground') && rateTitle.includes('ground')) ||
                      (customerMethod.includes('express') && rateTitle.includes('express')) ||
                      (customerMethod.includes('priority') && rateTitle.includes('priority')) ||
                      (customerMethod.includes('overnight') && rateTitle.includes('overnight'))
                    )

                    return (
                      <label
                        key={`${rate.carrier}-${rate.name}-${index}`}
                        className={`block p-3 rounded-lg cursor-pointer transition-all ${
                          selectedRate?.name === rate.name && selectedRate?.carrier === rate.carrier
                            ? 'bg-emerald-500/20 border border-emerald-500/50'
                            : matchesCustomerSelection
                            ? 'bg-blue-500/10 border border-blue-500/30 hover:border-blue-500/50'
                            : 'bg-slate-900/50 border border-transparent hover:border-slate-600'
                        }`}
                      >
                        <input
                          type="radio"
                          name="shippingRate"
                          checked={selectedRate?.name === rate.name && selectedRate?.carrier === rate.carrier}
                          onChange={() => {
                            setSelectedRate(rate)
                            setSelectedAddOns([])
                          }}
                          className="text-emerald-500 sr-only"
                        />
                        <div className="flex items-start gap-3">
                          {/* Carrier Logo/Badge */}
                          <div className={`w-10 h-10 rounded-lg ${getCarrierBg(actualCarrier)} flex items-center justify-center flex-shrink-0`}>
                            <i className={`fas ${getCarrierIcon(actualCarrier)} ${getCarrierColor(actualCarrier)} text-lg`}></i>
                          </div>
                          <div className="flex-1 min-w-0">
                            {/* Service Name & Price */}
                            <div className="flex items-center justify-between">
                              <span className="text-white font-medium text-sm truncate">
                                {rate.title || rate.short_title}
                              </span>
                              <span className="text-emerald-400 font-bold ml-2 whitespace-nowrap">
                                ${totalCost.toFixed(2)}
                              </span>
                            </div>

                            {/* Transit Time & Estimated Delivery */}
                            <div className="flex items-center gap-2 text-xs mt-1">
                              {rate.delivery_days ? (
                                <>
                                  <span className="text-blue-400 font-medium">
                                    <i className="fas fa-clock mr-1"></i>
                                    {rate.delivery_days === 1 ? '1 business day' : `${rate.delivery_days} business days`}
                                  </span>
                                  {estDelivery && (
                                    <>
                                      <span className="text-slate-600">→</span>
                                      <span className="text-slate-300">{estDelivery}</span>
                                    </>
                                  )}
                                </>
                              ) : estDelivery ? (
                                <span className="text-blue-400 font-medium">
                                  <i className="fas fa-calendar mr-1"></i>
                                  Arrives {estDelivery}
                                </span>
                              ) : (
                                <span className="text-slate-500 italic">Transit time varies</span>
                              )}
                            </div>

                            {/* Shipping Profit/Loss */}
                            <div className="flex items-center gap-2 text-xs mt-1">
                              <span className="text-slate-500">Veeqo Rates</span>
                              {packages.length > 1 && (
                                <span className="text-slate-600">
                                  (${rate.total_net_charge} × {packages.length})
                                </span>
                              )}
                              <span className="text-slate-600">•</span>
                              <span className={profit.isProfit ? 'text-emerald-400' : 'text-red-400'}>
                                {profit.isProfit ? (
                                  <><i className="fas fa-arrow-up mr-1"></i>+${profit.amount.toFixed(2)} profit</>
                                ) : (
                                  <><i className="fas fa-arrow-down mr-1"></i>-${profit.amount.toFixed(2)} loss</>
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1 flex-shrink-0">
                            {matchesCustomerSelection && (
                              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full whitespace-nowrap">
                                <i className="fas fa-user-check mr-1"></i>Match
                              </span>
                            )}
                            {index === 0 && (
                              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full whitespace-nowrap">
                                Cheapest
                              </span>
                            )}
                          </div>
                        </div>
                      </label>
                    )
                  })}
                </div>

                {/* Optional Add-ons */}
                {selectedRate?.charges?.some(c => c.charge_type === 'OPTIONAL') && (
                  <div className="mt-4 p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                    <div className="text-sm font-medium text-slate-300 mb-2">Optional Services</div>
                    <div className="space-y-2">
                      {selectedRate.charges
                        .filter(c => c.charge_type === 'OPTIONAL')
                        .map(charge => (
                          <label key={charge.charge_id} className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedAddOns.includes(charge.charge_id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedAddOns([...selectedAddOns, charge.charge_id])
                                } else {
                                  setSelectedAddOns(selectedAddOns.filter(id => id !== charge.charge_id))
                                }
                              }}
                              className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-emerald-500"
                            />
                            <span className="text-slate-300">{charge.charge_title}</span>
                            <span className="text-slate-500">+{charge.price}</span>
                          </label>
                        ))}
                    </div>
                  </div>
                )}

                {/* Purchase Summary */}
                {selectedRate && (
                  <div className="mt-4 p-4 bg-slate-900/70 rounded-lg border border-slate-700">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Customer Paid</div>
                        <div className="text-white font-semibold">${customerPaidShipping.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Shipping Cost</div>
                        <div className="text-white font-semibold">${calculateTotal().toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Ship Profit</div>
                        {(() => {
                          const profit = calculateShippingProfit(calculateTotal())
                          return (
                            <div className={`font-bold ${profit.isProfit ? 'text-emerald-400' : 'text-red-400'}`}>
                              {profit.isProfit ? '+' : '-'}${profit.amount.toFixed(2)}
                            </div>
                          )
                        })()}
                      </div>
                    </div>

                    {/* Estimated Delivery */}
                    {selectedRate.delivery_days && (
                      <div className="flex items-center gap-2 text-sm text-slate-300 mb-4 pb-4 border-b border-slate-700">
                        <i className="fas fa-truck text-blue-400"></i>
                        <span>
                          Est. delivery: <strong>{calculateEstimatedDelivery(selectedRate.delivery_days)}</strong>
                          <span className="text-slate-500 ml-2">({selectedRate.delivery_days} business days)</span>
                        </span>
                      </div>
                    )}

                    <button
                      onClick={purchaseLabels}
                      disabled={!selectedRate || purchasing}
                      className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors font-medium"
                    >
                      {purchasing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          Purchasing Label...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-tag"></i>
                          Buy {packages.length} Label{packages.length > 1 ? 's' : ''} - ${calculateTotal().toFixed(2)}
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
