import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'

const VEEQO_API_URL = 'https://api.veeqo.com'

export async function POST(request: NextRequest) {
  try {
    const {
      organizationId,
      orderId,
      allocationId,
      carrierId,
      subCarrierId,
      remoteShipmentId,
      serviceCarrier,
      serviceName,
      totalNetCharge,
      baseRate,
      valueAddedServices,
      packages, // Array of packages with boxProductId for inventory deduction
      // Shipping cost tracking
      shipDate,
      customerPaidShipping,
      actualShippingCost,
      shippingProfit,
      transitDays,
      estimatedDelivery,
    } = await request.json()

    console.log('Purchase label request:', { organizationId, orderId, allocationId, carrierId, serviceName })

    if (!organizationId || !allocationId) {
      return NextResponse.json({
        success: false,
        error: 'Missing required parameters (organizationId or allocationId)',
      })
    }

    // Get API key
    const orgDoc = await adminDb().collection('organizations').doc(organizationId).get()
    if (!orgDoc.exists) {
      return NextResponse.json({ success: false, error: 'Organization not found' })
    }

    const orgData = orgDoc.data()
    const apiKey = orgData?.veeqo?.apiKey
    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'Veeqo not connected' })
    }

    // Build the shipment request payload
    const shipmentPayload: any = {
      allocation_id: allocationId,
      service_carrier: serviceCarrier,
      total_net_charge: totalNetCharge,
      base_rate: baseRate,
    }

    // Add optional fields if provided
    if (carrierId) shipmentPayload.carrier_id = carrierId
    if (subCarrierId) shipmentPayload.sub_carrier_id = subCarrierId
    if (remoteShipmentId) shipmentPayload.remote_shipment_id = remoteShipmentId
    if (valueAddedServices?.length > 0) shipmentPayload.value_added_services = valueAddedServices

    console.log('Veeqo shipment payload:', shipmentPayload)

    // Purchase the label
    const response = await fetch(`${VEEQO_API_URL}/shipping/shipments`, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(shipmentPayload),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Label purchase error:', response.status, errorData)

      return NextResponse.json({
        success: false,
        error: errorData.message || `Failed to purchase label: ${response.status}`,
      })
    }

    const shipmentData = await response.json()

    // Save shipment info to the order in Firestore
    if (orderId) {
      await adminDb()
        .collection('organizations')
        .doc(organizationId)
        .collection('orders')
        .doc(orderId)
        .update({
          shipment: {
            veeqoShipmentId: shipmentData.id,
            carrier: serviceCarrier,
            service: serviceName,
            trackingNumber: shipmentData.tracking_number,
            trackingUrl: shipmentData.tracking_url,
            labelUrl: shipmentData.label_url,
            shippingCost: parseFloat(totalNetCharge),
            currency: shipmentData.currency || 'USD',
            purchasedAt: FieldValue.serverTimestamp(),
            // Shipping cost tracking
            shipDate: shipDate || null,
            customerPaidShipping: customerPaidShipping || 0,
            actualShippingCost: actualShippingCost || parseFloat(totalNetCharge),
            shippingProfit: shippingProfit || 0,
            transitDays: transitDays || null,
            estimatedDelivery: estimatedDelivery || null,
          },
          status: 'shipped',
          shippedAt: FieldValue.serverTimestamp(),
        })
    }

    // Deduct box inventory for each package with a boxProductId
    const boxDeductions: Array<{ boxProductId: string; success: boolean; error?: string }> = []

    if (packages && Array.isArray(packages)) {
      for (const pkg of packages) {
        if (pkg.boxProductId) {
          try {
            // Find inventory record for this box product
            const inventoryRef = adminDb()
              .collection('organizations')
              .doc(organizationId)
              .collection('inventory')

            const inventorySnapshot = await inventoryRef
              .where('productId', '==', pkg.boxProductId)
              .limit(10)
              .get()

            if (!inventorySnapshot.empty) {
              // Find a location with stock
              let deducted = false
              for (const invDoc of inventorySnapshot.docs) {
                const invData = invDoc.data()
                if (invData.quantity >= 1) {
                  // Deduct 1 box from this inventory record
                  await invDoc.ref.update({
                    quantity: FieldValue.increment(-1),
                    availableQuantity: FieldValue.increment(-1),
                    updatedAt: FieldValue.serverTimestamp(),
                  })

                  // Log the transaction
                  await adminDb()
                    .collection('organizations')
                    .doc(organizationId)
                    .collection('inventoryTransactions')
                    .add({
                      productId: pkg.boxProductId,
                      locationId: invData.locationId,
                      type: 'auto_deduction',
                      quantity: -1,
                      reason: 'Box used for shipping',
                      referenceType: 'order',
                      referenceId: orderId,
                      createdAt: FieldValue.serverTimestamp(),
                    })

                  // Update box settings stock count
                  const boxSettingsRef = adminDb()
                    .collection('organizations')
                    .doc(organizationId)
                    .collection('boxSizes')
                    .doc(pkg.boxProductId)

                  const boxSettingsDoc = await boxSettingsRef.get()
                  if (boxSettingsDoc.exists) {
                    const currentStock = boxSettingsDoc.data()?.currentStock || 0
                    const newStock = Math.max(0, currentStock - 1)
                    await boxSettingsRef.update({
                      currentStock: newStock,
                      isActive: newStock > 0,
                      updatedAt: FieldValue.serverTimestamp(),
                    })
                  }

                  deducted = true
                  boxDeductions.push({ boxProductId: pkg.boxProductId, success: true })
                  break
                }
              }

              if (!deducted) {
                boxDeductions.push({
                  boxProductId: pkg.boxProductId,
                  success: false,
                  error: 'No stock available',
                })
              }
            } else {
              boxDeductions.push({
                boxProductId: pkg.boxProductId,
                success: false,
                error: 'Box not found in inventory',
              })
            }
          } catch (err: any) {
            console.error('Box deduction error:', err)
            boxDeductions.push({
              boxProductId: pkg.boxProductId,
              success: false,
              error: err.message,
            })
          }
        }
      }
    }

    console.log('Box deductions:', boxDeductions)

    return NextResponse.json({
      success: true,
      shipment: {
        id: shipmentData.id,
        trackingNumber: shipmentData.tracking_number,
        trackingUrl: shipmentData.tracking_url,
        labelUrl: shipmentData.label_url,
        totalCharge: shipmentData.total_charge,
        currency: shipmentData.currency,
      },
      boxDeductions,
    })
  } catch (error: any) {
    console.error('Purchase label error:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to purchase label',
    })
  }
}
