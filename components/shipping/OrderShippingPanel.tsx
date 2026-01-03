'use client'

import { useState } from 'react'
import { ShippingRateSelector } from './ShippingRateSelector'

interface OrderShippingPanelProps {
  order: {
    id: string
    orderNumber: string
    veeqoAllocationId?: string
    shippingAddress?: {
      firstName: string
      lastName: string
      company?: string
      address1: string
      address2?: string
      city: string
      province: string
      zip: string
      countryCode: string
      phone?: string
    }
    shipment?: {
      carrier: string
      service: string
      trackingNumber: string
      trackingUrl: string
      labelUrl: string
      shippingCost: number
      purchasedAt: Date
    }
  }
  defaultWeight?: number
  onShipped?: () => void
}

export function OrderShippingPanel({ order, defaultWeight = 1, onShipped }: OrderShippingPanelProps) {
  const [showRates, setShowRates] = useState(false)
  const [packages, setPackages] = useState([
    { weight: defaultWeight, weightUnit: 'lb' }
  ])

  // Already shipped
  if (order.shipment) {
    return (
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-medium">
            <i className="fas fa-truck text-emerald-400 mr-2"></i>
            Shipment
          </h3>
          <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
            Shipped
          </span>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Carrier</span>
            <span className="text-white">{order.shipment.carrier}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Service</span>
            <span className="text-white">{order.shipment.service}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Tracking #</span>
            <a
              href={order.shipment.trackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              {order.shipment.trackingNumber}
            </a>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Shipping Cost</span>
            <span className="text-white font-medium text-lg">
              ${order.shipment.shippingCost.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <a
            href={order.shipment.labelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-3 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 text-center text-sm transition-colors"
          >
            <i className="fas fa-print mr-1"></i>
            Reprint Label
          </a>
          <a
            href={order.shipment.trackingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-3 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 text-center text-sm transition-colors"
          >
            <i className="fas fa-route mr-1"></i>
            Track
          </a>
        </div>
      </div>
    )
  }

  // No shipping address
  if (!order.shippingAddress) {
    return (
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
        <div className="text-center py-4">
          <i className="fas fa-map-marker-alt text-3xl text-slate-600 mb-2"></i>
          <p className="text-slate-400 text-sm">No shipping address available</p>
        </div>
      </div>
    )
  }

  // Prepare ship-to address for rate fetching
  const shipToAddress = {
    name: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`.trim(),
    company: order.shippingAddress.company,
    address1: order.shippingAddress.address1,
    address2: order.shippingAddress.address2,
    city: order.shippingAddress.city,
    state: order.shippingAddress.province,
    zip: order.shippingAddress.zip,
    country: order.shippingAddress.countryCode || 'US',
    phone: order.shippingAddress.phone,
  }

  // Ready to ship
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-medium">
          <i className="fas fa-shipping-fast text-orange-400 mr-2"></i>
          Ship Order
        </h3>
      </div>

      {!showRates ? (
        <div className="space-y-4">
          {/* Package Weight Input */}
          <div>
            <label className="block text-sm text-slate-400 mb-1">Package Weight</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={packages[0].weight}
                onChange={(e) => setPackages([{ ...packages[0], weight: parseFloat(e.target.value) || 0 }])}
                className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                min="0.1"
                step="0.1"
              />
              <select
                value={packages[0].weightUnit}
                onChange={(e) => setPackages([{ ...packages[0], weightUnit: e.target.value }])}
                className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="lb">lb</option>
                <option value="oz">oz</option>
                <option value="kg">kg</option>
              </select>
            </div>
          </div>

          {/* Ship To Preview */}
          <div className="p-3 bg-slate-900/50 rounded-lg">
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

          <button
            onClick={() => setShowRates(true)}
            className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 flex items-center justify-center gap-2 transition-colors"
          >
            <i className="fas fa-search-dollar"></i>
            Get Shipping Rates
          </button>
        </div>
      ) : (
        <ShippingRateSelector
          orderId={order.id}
          allocationId={order.veeqoAllocationId}
          shipToAddress={shipToAddress}
          packages={packages}
          onLabelPurchased={() => {
            setShowRates(false)
            onShipped?.()
          }}
          onClose={() => setShowRates(false)}
        />
      )}
    </div>
  )
}
