// Carrier configurations for fulfillment
export interface Carrier {
  id: string;
  name: string;
  services: string[];
}

export const CARRIERS: Carrier[] = [
  { id: 'usps', name: 'USPS', services: ['Priority Mail', 'First Class', 'Priority Express', 'Ground Advantage'] },
  { id: 'ups', name: 'UPS', services: ['Ground', '2-Day Air', 'Next Day Air', '3-Day Select'] },
  { id: 'fedex', name: 'FedEx', services: ['Ground', 'Express Saver', '2Day', 'Overnight', 'Home Delivery'] },
];

// Generate tracking number based on carrier
export function generateTrackingNumber(carrier: string): string {
  const prefix = carrier === 'usps' ? '9400' : carrier === 'ups' ? '1Z' : '7489';
  return prefix + Math.random().toString().slice(2, 14);
}

// Estimate shipping cost based on carrier and service
export function estimateShippingCost(carrier: string, service: string): number {
  const baseCosts: Record<string, number> = {
    'Priority Mail': 8.95,
    'First Class': 4.50,
    'Priority Express': 26.95,
    'Ground Advantage': 5.45,
    'Ground': 9.25,
    '2-Day Air': 18.75,
    'Next Day Air': 45.00,
    '3-Day Select': 14.50,
    'Express Saver': 15.95,
    '2Day': 22.50,
    'Overnight': 55.00,
    'Home Delivery': 10.50,
  };
  return baseCosts[service] || 10.00;
}

// Get carrier by ID
export function getCarrierById(carrierId: string): Carrier | undefined {
  return CARRIERS.find(c => c.id === carrierId);
}

// Get services for a carrier
export function getCarrierServices(carrierId: string): string[] {
  return getCarrierById(carrierId)?.services || [];
}
