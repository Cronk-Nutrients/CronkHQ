import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

const VEEQO_API_URL = 'https://api.veeqo.com'

// Calculate business days between two dates (excludes weekends)
function calculateBusinessDays(startDate: Date, endDate: Date): number {
  let count = 0
  const current = new Date(startDate)
  current.setHours(0, 0, 0, 0)
  const end = new Date(endDate)
  end.setHours(0, 0, 0, 0)

  while (current <= end) {
    const dayOfWeek = current.getDay()
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday (0) or Saturday (6)
      count++
    }
    current.setDate(current.getDate() + 1)
  }

  return count > 0 ? count : 1
}

// Parse a date string (handles various formats like "Thu, Jan 8" or ISO dates)
function parseDeliveryDate(dateStr: string): Date | null {
  if (!dateStr) return null

  try {
    // Try ISO format first
    let date = new Date(dateStr)
    if (!isNaN(date.getTime())) return date

    // Try parsing formatted date like "Thu, Jan 8" or "Jan 8"
    const currentYear = new Date().getFullYear()
    const withYear = dateStr.includes(String(currentYear)) ? dateStr : `${dateStr}, ${currentYear}`
    date = new Date(withYear)
    if (!isNaN(date.getTime())) return date

    return null
  } catch {
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const { organizationId, orderNumber, allocationId: providedAllocationId, packages, shipDate } = await request.json()

    // Use provided ship date or default to today
    const shipFromDate = shipDate ? new Date(shipDate) : new Date()
    shipFromDate.setHours(0, 0, 0, 0)

    console.log('Shipping rates request:', { organizationId, orderNumber, providedAllocationId, packages })

    if (!organizationId) {
      return NextResponse.json({
        success: false,
        error: 'Missing organization ID',
      })
    }

    // Get API key from Firestore
    const orgDoc = await adminDb().collection('organizations').doc(organizationId).get()
    if (!orgDoc.exists) {
      return NextResponse.json({ success: false, error: 'Organization not found' })
    }

    const orgData = orgDoc.data()
    const apiKey = orgData?.veeqo?.apiKey
    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'Veeqo not connected' })
    }

    // If we have an allocation ID, use it directly
    let allocationId = providedAllocationId

    // If no allocation ID, search for the order in Veeqo
    if (!allocationId && orderNumber) {
      console.log('Searching for order in Veeqo:', orderNumber)

      // Search for order by number
      const searchResponse = await fetch(
        `${VEEQO_API_URL}/orders?query=${encodeURIComponent(orderNumber)}&page_size=10`,
        {
          headers: {
            'x-api-key': apiKey,
            'Accept': 'application/json',
          },
        }
      )

      if (searchResponse.ok) {
        const orders = await searchResponse.json()
        console.log('Veeqo order search results:', orders?.length || 0)

        if (Array.isArray(orders) && orders.length > 0) {
          // Find matching order
          const matchingOrder = orders.find((o: any) =>
            o.number === orderNumber ||
            o.channel_order_number === orderNumber ||
            o.id?.toString() === orderNumber
          )

          if (matchingOrder) {
            console.log('Found order in Veeqo:', matchingOrder.id, matchingOrder.number)

            // Get allocation ID from the order
            if (matchingOrder.allocations && matchingOrder.allocations.length > 0) {
              allocationId = matchingOrder.allocations[0].id
              console.log('Found allocation ID:', allocationId)
            } else {
              // Fetch full order details to get allocations
              const orderDetailResponse = await fetch(
                `${VEEQO_API_URL}/orders/${matchingOrder.id}`,
                {
                  headers: {
                    'x-api-key': apiKey,
                    'Accept': 'application/json',
                  },
                }
              )

              if (orderDetailResponse.ok) {
                const orderDetail = await orderDetailResponse.json()
                if (orderDetail.allocations && orderDetail.allocations.length > 0) {
                  allocationId = orderDetail.allocations[0].id
                  console.log('Found allocation ID from order detail:', allocationId)
                }
              }
            }
          }
        }
      } else {
        console.error('Order search failed:', searchResponse.status)
      }
    }

    // If still no allocation ID, the order doesn't exist in Veeqo
    if (!allocationId) {
      return NextResponse.json({
        success: false,
        error: 'Order not found in Veeqo. Please ensure your Shopify store is connected to Veeqo and orders are syncing.',
        hint: 'Go to Veeqo → Settings → Sales Channels to connect your Shopify store.',
      })
    }

    // Update package dimensions in allocation if provided
    if (packages && packages.length > 0) {
      const pkg = packages[0]
      try {
        // Convert weight to oz if in lb (Veeqo only accepts g or oz)
        let weightInOz = pkg.weight || 1
        if (pkg.weightUnit === 'lb') {
          weightInOz = weightInOz * 16 // Convert lb to oz
        }

        const packagePayload = {
          allocation_package: {
            weight: weightInOz,
            weight_unit: 'oz',
            width: pkg.dimensions?.width || 8,
            height: pkg.dimensions?.height || 6,
            depth: pkg.dimensions?.length || 10, // Veeqo uses 'depth' instead of 'length'
            dimensions_unit: 'inches',
            package_provider: 'CUSTOM',
            package_selection_source: 'ONE_OFF',
            save_for_similar_shipments: false,
          }
        }

        console.log('Updating allocation package:', JSON.stringify(packagePayload))

        const updateResponse = await fetch(`${VEEQO_API_URL}/allocations/${allocationId}/allocation_package`, {
          method: 'PUT',
          headers: {
            'x-api-key': apiKey,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(packagePayload),
        })

        if (updateResponse.ok) {
          console.log('Successfully updated allocation package dimensions')
        } else {
          const errorText = await updateResponse.text()
          console.log('Failed to update allocation package:', updateResponse.status, errorText)
        }
      } catch (err) {
        console.log('Could not update allocation dimensions:', err)
      }
    }

    // Get shipping rates using the allocation ID
    console.log('Fetching rates for allocation:', allocationId)

    const ratesResponse = await fetch(
      `${VEEQO_API_URL}/shipping/rates/${allocationId}?from_allocation_package=true&format_with_unavailable_quotes=false`,
      {
        headers: {
          'x-api-key': apiKey,
          'Accept': 'application/json',
        },
      }
    )

    console.log('Rates response status:', ratesResponse.status)

    if (!ratesResponse.ok) {
      const errorText = await ratesResponse.text()
      console.error('Rates error:', errorText)

      return NextResponse.json({
        success: false,
        error: 'Failed to get shipping rates from Veeqo. Please check your carrier accounts are set up.',
        details: errorText,
      })
    }

    const ratesData = await ratesResponse.json()
    console.log('Rates data:', JSON.stringify(ratesData).substring(0, 1000))

    // Log the first rate in detail to see all available fields
    if (ratesData.available?.[0]) {
      console.log('Sample rate full data:', JSON.stringify(ratesData.available[0], null, 2))
    }

    // Parse available rates
    let allRates: any[] = []

    if (ratesData.available && Array.isArray(ratesData.available)) {
      allRates = ratesData.available
    } else if (ratesData.rates && Array.isArray(ratesData.rates)) {
      allRates = ratesData.rates
    } else if (Array.isArray(ratesData)) {
      allRates = ratesData
    }

    // Normalize rate format
    // IMPORTANT: rate.title and rate.short_title contain the human-readable service name (e.g., "USPS Ground Advantage")
    // rate.name contains a UUID identifier (e.g., "amazon_shipping_v2-xxxx") - do NOT use for display
    allRates = allRates.map((rate: any) => {
      // Try multiple field names for estimated delivery date
      // Veeqo may return a formatted string like "Thu, Jan 8" or an ISO date
      const estimatedDeliveryRaw = rate.estimated_delivery_date
        || rate.delivery_date
        || rate.estimated_arrival_date
        || rate.arrival_date
        || rate.expected_delivery_date
        || rate.deliver_by
        || rate.delivery_by
        || rate.commit_date
        || rate.guaranteed_delivery_date
        || rate.delivery_days_text
        || rate.deliveryDays
        || rate.delivery_estimate

      // Parse the delivery date
      const deliveryDate = parseDeliveryDate(estimatedDeliveryRaw)

      // Calculate business days from ship date to delivery date
      let transitDays: number | null = null
      if (deliveryDate) {
        transitDays = calculateBusinessDays(shipFromDate, deliveryDate)
      } else {
        // Fall back to Veeqo's provided transit days if no delivery date
        transitDays = rate.expected_delivery_days
          || rate.delivery_days
          || rate.transit_days
          || rate.transit_time
          || rate.estimated_transit_days
          || rate.business_days
          || rate.days_to_deliver
          || null
      }

      // Format the estimated delivery date for display
      const estimatedDelivery = deliveryDate
        ? deliveryDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
        : estimatedDeliveryRaw // Keep original if we couldn't parse

      // Log if we found delivery info
      if (!transitDays && !estimatedDelivery) {
        console.log(`Rate "${rate.title || rate.name}" has no delivery info. Keys:`, Object.keys(rate).join(', '))
      }

      return {
        id: rate.remote_shipment_id || rate.id || rate.name,
        carrier: rate.service_carrier || rate.carrier || 'Unknown',
        name: rate.name, // Keep the internal identifier for API calls
        title: rate.title || rate.short_title || rate.service_type || 'Shipping Service',
        short_title: rate.short_title || rate.title || 'Shipping',
        total_net_charge: rate.total_net_charge?.toString() || rate.price?.toString() || '0.00',
        base_rate: rate.base_rate?.toString() || rate.total_net_charge?.toString() || '0.00',
        currency: rate.currency || 'USD',
        delivery_days: transitDays,
        estimated_delivery_date: estimatedDelivery,
        carrier_id: rate.carrier_id,
        service_carrier: rate.service_carrier || rate.carrier,
        sub_carrier_id: rate.sub_carrier_id,
        remote_shipment_id: rate.remote_shipment_id,
        charges: rate.charges || [],
        veeqo_credits: rate.veeqo_credits,
        // Include raw rate data for debugging (can check in network tab)
        _debug: {
          keys: Object.keys(rate),
          rawDeliveryFields: {
            expected_delivery_days: rate.expected_delivery_days,
            delivery_days: rate.delivery_days,
            transit_days: rate.transit_days,
            estimated_delivery_date: rate.estimated_delivery_date,
            delivery_date: rate.delivery_date,
            cutoff: rate.cutoff,
          }
        },
      }
    })

    // Sort by price
    allRates.sort((a, b) => {
      const priceA = parseFloat(a.total_net_charge) || 999
      const priceB = parseFloat(b.total_net_charge) || 999
      return priceA - priceB
    })

    return NextResponse.json({
      success: true,
      rates: allRates,
      cheapest: allRates[0] || null,
      count: allRates.length,
      allocationId,
      unavailable: ratesData.unavailable || [],
    })
  } catch (error: any) {
    console.error('Shipping rates error:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch rates',
    })
  }
}
