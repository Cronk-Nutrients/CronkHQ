'use client'

import { useState, useEffect } from 'react'
import { useOrganization } from '@/context/OrganizationContext'
import { useToast } from '@/components/ui/Toast'

interface ShippingRate {
  carrier: string
  name: string
  title: string
  short_title: string
  total_net_charge: string
  base_rate: string
  currency: string
  cutoff?: string
  carrier_id?: number
  service_carrier?: string
  estimated_delivery_date?: string
  delivery_days?: number
  charges?: Array<{
    price: string
    charge_id: string
    charge_title: string
    charge_type: 'MANDATORY' | 'OPTIONAL'
  }>
}

interface ShippingRateSelectorProps {
  orderId: string
  allocationId?: string
  shipToAddress?: {
    name: string
    company?: string
    address1: string
    address2?: string
    city: string
    state: string
    zip: string
    country?: string
    phone?: string
  }
  packages?: Array<{
    weight: number
    weightUnit?: string
    dimensions?: {
      length: number
      width: number
      height: number
      unit?: string
    }
  }>
  onLabelPurchased?: (shipment: any) => void
  onClose?: () => void
}

export function ShippingRateSelector({
  orderId,
  allocationId,
  shipToAddress,
  packages,
  onLabelPurchased,
  onClose,
}: ShippingRateSelectorProps) {
  const { organization } = useOrganization()
  const { success, error: showError } = useToast()

  const [rates, setRates] = useState<ShippingRate[]>([])
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState(false)
  const [selectedRate, setSelectedRate] = useState<ShippingRate | null>(null)
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])

  // Fetch rates on mount
  useEffect(() => {
    async function fetchRates() {
      if (!organization?.id) return

      try {
        const response = await fetch('/api/veeqo/shipping-rates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            organizationId: organization.id,
            allocationId,
            shipToAddress,
            packages,
          }),
        })

        const data = await response.json()

        if (data.success) {
          setRates(data.rates)
          // Auto-select cheapest
          if (data.cheapest) {
            setSelectedRate(data.cheapest)
          }
        } else {
          showError(data.error || 'Failed to fetch rates')
        }
      } catch (err: any) {
        showError(err.message || 'Network error')
      } finally {
        setLoading(false)
      }
    }

    fetchRates()
  }, [organization?.id, allocationId, shipToAddress, packages])

  // Purchase label
  const handlePurchase = async () => {
    if (!selectedRate || !organization?.id) return

    setPurchasing(true)

    try {
      // Calculate total with add-ons
      let totalCharge = parseFloat(selectedRate.total_net_charge)
      const addOnServices = selectedRate.charges
        ?.filter(c => c.charge_type === 'OPTIONAL' && selectedAddOns.includes(c.charge_id))
        .map(c => ({
          id: c.charge_id,
          price: c.price,
        })) || []

      addOnServices.forEach(addon => {
        totalCharge += parseFloat(addon.price.replace('$', ''))
      })

      const response = await fetch('/api/veeqo/purchase-label', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId: organization.id,
          orderId,
          allocationId,
          carrierId: selectedRate.carrier_id,
          serviceCarrier: selectedRate.service_carrier || selectedRate.carrier,
          serviceName: selectedRate.title,
          totalNetCharge: totalCharge.toFixed(2),
          baseRate: selectedRate.base_rate,
          valueAddedServices: addOnServices,
        }),
      })

      const data = await response.json()

      if (data.success) {
        success('Shipping label purchased!')
        onLabelPurchased?.(data.shipment)
      } else {
        showError(data.error || 'Failed to purchase label')
      }
    } catch (err: any) {
      showError(err.message || 'Purchase failed')
    } finally {
      setPurchasing(false)
    }
  }

  // Get carrier logo/icon
  const getCarrierIcon = (carrier: string) => {
    const icons: Record<string, string> = {
      usps: '📮',
      ups: '📦',
      fedex: '🚚',
      dhl: '✈️',
      amazon_shipping_v2: '📦',
    }
    return icons[carrier.toLowerCase()] || '📦'
  }

  // Get carrier color
  const getCarrierColor = (carrier: string) => {
    const colors: Record<string, string> = {
      usps: 'bg-blue-500/20 border-blue-500/30',
      ups: 'bg-amber-500/20 border-amber-500/30',
      fedex: 'bg-purple-500/20 border-purple-500/30',
      dhl: 'bg-yellow-500/20 border-yellow-500/30',
      amazon_shipping_v2: 'bg-orange-500/20 border-orange-500/30',
    }
    return colors[carrier.toLowerCase()] || 'bg-slate-500/20 border-slate-500/30'
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-500"></div>
        <span className="ml-2 text-slate-400">Fetching rates from carriers...</span>
      </div>
    )
  }

  if (rates.length === 0) {
    return (
      <div className="p-6 text-center text-slate-400">
        <i className="fas fa-exclamation-circle text-3xl mb-3 text-slate-500"></i>
        <p className="font-medium text-white mb-1">No shipping rates available</p>
        <p className="text-sm">Check package dimensions and weight, or verify shipping address.</p>
        {onClose && (
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
          >
            Close
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Rate Options */}
      <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
        {rates.map((rate, index) => (
          <label
            key={`${rate.carrier}-${rate.name}-${index}`}
            className={`block p-3 rounded-lg border cursor-pointer transition-all ${
              selectedRate?.name === rate.name && selectedRate?.carrier === rate.carrier
                ? 'bg-emerald-500/20 border-emerald-500'
                : `${getCarrierColor(rate.carrier)} hover:border-slate-500`
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="shippingRate"
                checked={selectedRate?.name === rate.name && selectedRate?.carrier === rate.carrier}
                onChange={() => {
                  setSelectedRate(rate)
                  setSelectedAddOns([])
                }}
                className="w-4 h-4 text-emerald-500"
              />

              <span className="text-xl">{getCarrierIcon(rate.carrier)}</span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium truncate">
                    {rate.short_title || rate.title}
                  </span>
                  <span className="text-emerald-400 font-bold ml-2">
                    ${rate.total_net_charge}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="uppercase">{rate.carrier.replace('_', ' ')}</span>
                  {rate.delivery_days && (
                    <>
                      <span>•</span>
                      <span className="text-blue-400">
                        {rate.delivery_days === 1 ? '1 day' : `${rate.delivery_days} days`}
                      </span>
                    </>
                  )}
                  {rate.estimated_delivery_date && (
                    <>
                      <span>•</span>
                      <span>Est. {new Date(rate.estimated_delivery_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                    </>
                  )}
                  {rate.cutoff && (
                    <>
                      <span>•</span>
                      <span className="text-amber-400">Ship by {new Date(rate.cutoff).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
                    </>
                  )}
                </div>
              </div>

              {index === 0 && (
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full whitespace-nowrap">
                  Cheapest
                </span>
              )}
            </div>
          </label>
        ))}
      </div>

      {/* Optional Add-ons */}
      {selectedRate?.charges?.some(c => c.charge_type === 'OPTIONAL') && (
        <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700">
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

      {/* Purchase Button */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-700">
        <div>
          {selectedRate && (
            <div className="text-sm text-slate-400">
              Total: <span className="text-white font-bold text-lg">
                ${(
                  parseFloat(selectedRate.total_net_charge) +
                  (selectedRate.charges || [])
                    .filter(c => c.charge_type === 'OPTIONAL' && selectedAddOns.includes(c.charge_id))
                    .reduce((sum, c) => sum + parseFloat(c.price.replace('$', '')), 0)
                ).toFixed(2)}
              </span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handlePurchase}
            disabled={!selectedRate || purchasing}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            {purchasing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Purchasing...
              </>
            ) : (
              <>
                <i className="fas fa-tag"></i>
                Buy Label
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
