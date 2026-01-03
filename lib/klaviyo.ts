const KLAVIYO_API_VERSION = '2024-02-15'

interface KlaviyoOrderItem {
  productId: string
  sku: string
  name: string
  quantity: number
  price: number
}

interface KlaviyoOrder {
  orderId: string
  email: string
  total: number
  currency: string
  items: KlaviyoOrderItem[]
  customerName?: string
}

interface KlaviyoFulfillment {
  orderId: string
  email: string
  trackingNumber?: string
  carrier?: string
}

export async function pushOrderToKlaviyo(
  apiKey: string,
  order: KlaviyoOrder
): Promise<boolean> {
  const event = {
    data: {
      type: 'event',
      attributes: {
        profile: {
          data: {
            type: 'profile',
            attributes: {
              email: order.email,
              first_name: order.customerName?.split(' ')[0],
              last_name: order.customerName?.split(' ').slice(1).join(' '),
            },
          },
        },
        metric: {
          data: {
            type: 'metric',
            attributes: {
              name: 'Placed Order',
            },
          },
        },
        properties: {
          OrderId: order.orderId,
          Value: order.total,
          Currency: order.currency,
          ItemCount: order.items.length,
          Items: order.items.map(item => ({
            ProductID: item.productId,
            SKU: item.sku,
            ProductName: item.name,
            Quantity: item.quantity,
            ItemPrice: item.price,
          })),
        },
        value: order.total,
        unique_id: order.orderId,
      },
    },
  }

  const response = await fetch('https://a.klaviyo.com/api/events/', {
    method: 'POST',
    headers: {
      'Authorization': `Klaviyo-API-Key ${apiKey}`,
      'revision': KLAVIYO_API_VERSION,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(event),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.errors?.[0]?.detail || 'Failed to push order to Klaviyo')
  }

  return true
}

export async function pushFulfillmentToKlaviyo(
  apiKey: string,
  fulfillment: KlaviyoFulfillment
): Promise<boolean> {
  const event = {
    data: {
      type: 'event',
      attributes: {
        profile: {
          data: {
            type: 'profile',
            attributes: {
              email: fulfillment.email,
            },
          },
        },
        metric: {
          data: {
            type: 'metric',
            attributes: {
              name: 'Fulfilled Order',
            },
          },
        },
        properties: {
          OrderId: fulfillment.orderId,
          TrackingNumber: fulfillment.trackingNumber,
          Carrier: fulfillment.carrier,
        },
        unique_id: `${fulfillment.orderId}-fulfilled`,
      },
    },
  }

  const response = await fetch('https://a.klaviyo.com/api/events/', {
    method: 'POST',
    headers: {
      'Authorization': `Klaviyo-API-Key ${apiKey}`,
      'revision': KLAVIYO_API_VERSION,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(event),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.errors?.[0]?.detail || 'Failed to push fulfillment to Klaviyo')
  }

  return true
}

export async function pushCustomEventToKlaviyo(
  apiKey: string,
  eventName: string,
  email: string,
  properties: Record<string, any> = {},
  uniqueId?: string
): Promise<boolean> {
  const event = {
    data: {
      type: 'event',
      attributes: {
        profile: {
          data: {
            type: 'profile',
            attributes: {
              email,
            },
          },
        },
        metric: {
          data: {
            type: 'metric',
            attributes: {
              name: eventName,
            },
          },
        },
        properties,
        ...(uniqueId && { unique_id: uniqueId }),
      },
    },
  }

  const response = await fetch('https://a.klaviyo.com/api/events/', {
    method: 'POST',
    headers: {
      'Authorization': `Klaviyo-API-Key ${apiKey}`,
      'revision': KLAVIYO_API_VERSION,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(event),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.errors?.[0]?.detail || `Failed to push ${eventName} event to Klaviyo`)
  }

  return true
}

export async function getKlaviyoProfile(
  apiKey: string,
  email: string
): Promise<any | null> {
  const response = await fetch(
    `https://a.klaviyo.com/api/profiles/?filter=equals(email,"${encodeURIComponent(email)}")`,
    {
      headers: {
        'Authorization': `Klaviyo-API-Key ${apiKey}`,
        'revision': KLAVIYO_API_VERSION,
        'Accept': 'application/json',
      },
    }
  )

  if (!response.ok) {
    return null
  }

  const data = await response.json()
  return data.data?.[0] || null
}

export async function getKlaviyoLists(apiKey: string): Promise<any[]> {
  const response = await fetch('https://a.klaviyo.com/api/lists/', {
    headers: {
      'Authorization': `Klaviyo-API-Key ${apiKey}`,
      'revision': KLAVIYO_API_VERSION,
      'Accept': 'application/json',
    },
  })

  if (!response.ok) {
    return []
  }

  const data = await response.json()
  return data.data || []
}

export async function getKlaviyoSegments(apiKey: string): Promise<any[]> {
  const response = await fetch('https://a.klaviyo.com/api/segments/', {
    headers: {
      'Authorization': `Klaviyo-API-Key ${apiKey}`,
      'revision': KLAVIYO_API_VERSION,
      'Accept': 'application/json',
    },
  })

  if (!response.ok) {
    return []
  }

  const data = await response.json()
  return data.data || []
}
