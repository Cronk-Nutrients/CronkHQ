// Types for order form
export interface OrderCustomer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  type: 'retail' | 'wholesale';
}

export interface OrderProduct {
  id: string;
  name: string;
  sku: string;
  price: number;
  wholesalePrice: number;
  cost: number;
  weight: number; // in oz
  inStock: number;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  customPrice: number | null; // null means use default price
}

export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  minWeight: number;
  maxWeight: number;
  description: string;
}

// Mock customers
export const mockCustomers: OrderCustomer[] = [
  { id: 'cust-1', name: 'Sarah Johnson', email: 'sarah@email.com', phone: '713-555-0123', address: '123 Main Street', city: 'Houston', state: 'TX', zip: '77001', country: 'US', type: 'retail' },
  { id: 'cust-2', name: 'Michael Chen', email: 'mchen@gmail.com', phone: '512-555-0456', address: '456 Oak Avenue', city: 'Austin', state: 'TX', zip: '78701', country: 'US', type: 'retail' },
  { id: 'cust-3', name: 'Wholesale Gardens Inc', email: 'orders@wholesalegardens.com', phone: '713-555-0789', address: '1000 Industrial Blvd', city: 'Houston', state: 'TX', zip: '77002', country: 'US', type: 'wholesale' },
  { id: 'cust-4', name: 'Green Thumb Supplies', email: 'purchasing@greenthumb.com', phone: '214-555-0321', address: '500 Commerce St', city: 'Dallas', state: 'TX', zip: '75201', country: 'US', type: 'wholesale' },
  { id: 'cust-5', name: 'Emily Rodriguez', email: 'emily.r@outlook.com', phone: '469-555-0654', address: '789 Pine Road', city: 'Plano', state: 'TX', zip: '75024', country: 'US', type: 'retail' },
];

// Mock products
export const mockProducts: OrderProduct[] = [
  { id: 'prod-1', name: '1L Micro Classic', sku: 'CLM1L', price: 24.99, wholesalePrice: 14.99, cost: 6.56, weight: 44.8, inStock: 124 },
  { id: 'prod-2', name: '1L Bloom Classic', sku: 'CLB1L', price: 24.99, wholesalePrice: 14.99, cost: 6.78, weight: 46.4, inStock: 342 },
  { id: 'prod-3', name: '1L Grow Classic', sku: 'CLG1L', price: 24.99, wholesalePrice: 14.99, cost: 6.34, weight: 44.8, inStock: 18 },
  { id: 'prod-4', name: '500ml CalMag Plus', sku: 'CALMAG500', price: 18.99, wholesalePrice: 11.99, cost: 4.23, weight: 22.4, inStock: 156 },
  { id: 'prod-5', name: 'pH Down 1L', sku: 'PHD1L', price: 14.99, wholesalePrice: 8.99, cost: 3.45, weight: 38.4, inStock: 0 },
  { id: 'prod-6', name: 'pH Up 1L', sku: 'PHU1L', price: 14.99, wholesalePrice: 8.99, cost: 3.55, weight: 38.4, inStock: 67 },
  { id: 'prod-7', name: 'Root Booster 500ml', sku: 'RB500', price: 21.99, wholesalePrice: 13.99, cost: 5.12, weight: 20.8, inStock: 89 },
  { id: 'prod-8', name: 'Starter Bundle Classic', sku: 'SBTCLASSIC', price: 64.99, wholesalePrice: 44.99, cost: 18.90, weight: 136, inStock: 45 },
];

// Shipping options
export const shippingOptions: ShippingOption[] = [
  { id: 'free', name: 'Free Shipping', price: 0, minWeight: 0, maxWeight: 9999, description: 'Standard ground (5-7 days)' },
  { id: 'standard', name: 'Standard Shipping', price: 5.99, minWeight: 0, maxWeight: 80, description: 'USPS Priority (3-5 days)' },
  { id: 'express', name: 'Express Shipping', price: 12.99, minWeight: 0, maxWeight: 160, description: 'UPS 2-Day' },
  { id: 'overnight', name: 'Overnight Shipping', price: 24.99, minWeight: 0, maxWeight: 160, description: 'UPS Next Day Air' },
  { id: 'freight', name: 'Freight / LTL', price: 0, minWeight: 160, maxWeight: 9999, description: 'For large wholesale orders' },
  { id: 'pickup', name: 'Local Pickup', price: 0, minWeight: 0, maxWeight: 9999, description: 'Pick up at warehouse' },
  { id: 'custom', name: 'Custom Amount', price: 0, minWeight: 0, maxWeight: 9999, description: 'Enter custom shipping cost' },
];

// Helper to get product price based on customer type
export function getProductPrice(product: OrderProduct, isWholesale: boolean): number {
  return isWholesale ? product.wholesalePrice : product.price;
}

// Calculate order totals
export interface OrderCalculations {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  totalCost: number;
  profit: number;
  margin: number;
  totalWeight: number;
  itemCount: number;
}

export function calculateOrderTotals(
  orderItems: OrderItem[],
  isWholesale: boolean,
  discountType: 'percent' | 'fixed',
  discountValue: number,
  selectedShipping: string,
  customShippingCost: number,
  taxRate: number
): OrderCalculations {
  let subtotal = 0;
  let totalCost = 0;
  let totalWeight = 0;
  let itemCount = 0;

  orderItems.forEach(item => {
    const product = mockProducts.find(p => p.id === item.productId);
    if (product) {
      const price = item.customPrice ?? getProductPrice(product, isWholesale);
      subtotal += price * item.quantity;
      totalCost += product.cost * item.quantity;
      totalWeight += product.weight * item.quantity;
      itemCount += item.quantity;
    }
  });

  // Calculate discount
  let discount = 0;
  if (discountType === 'percent') {
    discount = subtotal * (discountValue / 100);
  } else {
    discount = discountValue;
  }

  // Get shipping cost
  let shipping = 0;
  if (selectedShipping === 'custom') {
    shipping = customShippingCost;
  } else {
    const shippingOption = shippingOptions.find(s => s.id === selectedShipping);
    shipping = shippingOption?.price || 0;
  }

  // Calculate tax
  const taxableAmount = subtotal - discount;
  const tax = taxableAmount * (taxRate / 100);

  // Calculate total
  const total = subtotal - discount + shipping + tax;

  // Calculate profit
  const profit = total - totalCost - shipping;
  const margin = total > 0 ? (profit / total) * 100 : 0;

  return {
    subtotal,
    discount,
    shipping,
    tax,
    total,
    totalCost,
    profit,
    margin,
    totalWeight,
    itemCount,
  };
}
