declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

// Check if gtag is available
function isGtagAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function'
}

// Track page views
export function trackPageView(url: string) {
  if (isGtagAvailable()) {
    window.gtag('event', 'page_view', {
      page_path: url,
    })
  }
}

// Track custom events
export function trackEvent(
  eventName: string,
  params?: Record<string, any>
) {
  if (isGtagAvailable()) {
    window.gtag('event', eventName, params)
  }
}

// Track conversions (Google Ads)
export function trackConversion(
  conversionLabel: string,
  value?: number,
  currency?: string
) {
  if (isGtagAvailable()) {
    window.gtag('event', 'conversion', {
      send_to: conversionLabel,
      value: value,
      currency: currency || 'USD',
    })
  }
}

// Pre-defined analytics events for the application
export const analytics = {
  // Order events
  orderSynced: (orderNumber: string, total: number, currency = 'USD') => {
    trackEvent('order_synced', {
      order_number: orderNumber,
      value: total,
      currency
    })
  },

  orderPicked: (orderNumber: string) => {
    trackEvent('order_picked', { order_number: orderNumber })
  },

  orderShipped: (orderNumber: string, carrier?: string) => {
    trackEvent('order_shipped', {
      order_number: orderNumber,
      carrier: carrier || 'unknown'
    })
  },

  orderCompleted: (orderNumber: string, value: number, currency = 'USD') => {
    trackEvent('purchase', {
      transaction_id: orderNumber,
      value,
      currency,
    })
  },

  // Product events
  productsImported: (count: number) => {
    trackEvent('products_imported', { count })
  },

  productViewed: (productId: string, productName: string) => {
    trackEvent('view_item', {
      items: [{
        item_id: productId,
        item_name: productName,
      }]
    })
  },

  // Inventory events
  barcodeScan: (barcode: string, found: boolean) => {
    trackEvent('barcode_scan', { barcode, found })
  },

  inventoryAdjusted: (productId: string, adjustment: number) => {
    trackEvent('inventory_adjusted', {
      product_id: productId,
      adjustment
    })
  },

  // Integration events
  shopifyConnected: () => {
    trackEvent('integration_connected', { integration: 'shopify' })
  },

  shopifyDisconnected: () => {
    trackEvent('integration_disconnected', { integration: 'shopify' })
  },

  // User events
  userSignedUp: () => {
    trackEvent('sign_up', { method: 'email' })
  },

  userLoggedIn: () => {
    trackEvent('login', { method: 'email' })
  },

  // Feature usage
  featureUsed: (featureName: string, details?: Record<string, any>) => {
    trackEvent('feature_used', {
      feature_name: featureName,
      ...details,
    })
  },

  // Search events
  searchPerformed: (searchTerm: string, resultsCount: number) => {
    trackEvent('search', {
      search_term: searchTerm,
      results_count: resultsCount,
    })
  },

  // Error tracking
  errorOccurred: (errorType: string, errorMessage: string) => {
    trackEvent('error', {
      error_type: errorType,
      error_message: errorMessage,
    })
  },
}

export default analytics
