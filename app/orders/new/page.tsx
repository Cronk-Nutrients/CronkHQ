'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Customer {
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

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  wholesalePrice: number;
  cost: number;
  weight: number; // in oz
  inStock: number;
}

interface OrderItem {
  productId: string;
  quantity: number;
  customPrice: number | null; // null means use default price
}

// Mock customers
const mockCustomers: Customer[] = [
  { id: 'cust-1', name: 'Sarah Johnson', email: 'sarah@email.com', phone: '713-555-0123', address: '123 Main Street', city: 'Houston', state: 'TX', zip: '77001', country: 'US', type: 'retail' },
  { id: 'cust-2', name: 'Michael Chen', email: 'mchen@gmail.com', phone: '512-555-0456', address: '456 Oak Avenue', city: 'Austin', state: 'TX', zip: '78701', country: 'US', type: 'retail' },
  { id: 'cust-3', name: 'Wholesale Gardens Inc', email: 'orders@wholesalegardens.com', phone: '713-555-0789', address: '1000 Industrial Blvd', city: 'Houston', state: 'TX', zip: '77002', country: 'US', type: 'wholesale' },
  { id: 'cust-4', name: 'Green Thumb Supplies', email: 'purchasing@greenthumb.com', phone: '214-555-0321', address: '500 Commerce St', city: 'Dallas', state: 'TX', zip: '75201', country: 'US', type: 'wholesale' },
  { id: 'cust-5', name: 'Emily Rodriguez', email: 'emily.r@outlook.com', phone: '469-555-0654', address: '789 Pine Road', city: 'Plano', state: 'TX', zip: '75024', country: 'US', type: 'retail' },
];

// Mock products
const mockProducts: Product[] = [
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
const shippingOptions = [
  { id: 'free', name: 'Free Shipping', price: 0, minWeight: 0, maxWeight: 9999, description: 'Standard ground (5-7 days)' },
  { id: 'standard', name: 'Standard Shipping', price: 5.99, minWeight: 0, maxWeight: 80, description: 'USPS Priority (3-5 days)' },
  { id: 'express', name: 'Express Shipping', price: 12.99, minWeight: 0, maxWeight: 160, description: 'UPS 2-Day' },
  { id: 'overnight', name: 'Overnight Shipping', price: 24.99, minWeight: 0, maxWeight: 160, description: 'UPS Next Day Air' },
  { id: 'freight', name: 'Freight / LTL', price: 0, minWeight: 160, maxWeight: 9999, description: 'For large wholesale orders' },
  { id: 'pickup', name: 'Local Pickup', price: 0, minWeight: 0, maxWeight: 9999, description: 'Pick up at warehouse' },
  { id: 'custom', name: 'Custom Amount', price: 0, minWeight: 0, maxWeight: 9999, description: 'Enter custom shipping cost' },
];

export default function NewOrderPage() {
  const router = useRouter();

  // Customer state
  const [customerMode, setCustomerMode] = useState<'select' | 'new'>('select');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    type: 'retail' as 'retail' | 'wholesale',
  });

  // Order items state
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [productSearch, setProductSearch] = useState('');
  const [showProductDropdown, setShowProductDropdown] = useState(false);

  // Pricing state
  const [discountType, setDiscountType] = useState<'percent' | 'fixed'>('percent');
  const [discountValue, setDiscountValue] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [customShippingCost, setCustomShippingCost] = useState(0);
  const [taxRate, setTaxRate] = useState(0); // 0% for wholesale, can set for retail

  // Notes
  const [orderNotes, setOrderNotes] = useState('');

  // Get selected customer
  const selectedCustomer = mockCustomers.find(c => c.id === selectedCustomerId);
  const isWholesale = customerMode === 'select'
    ? selectedCustomer?.type === 'wholesale'
    : newCustomer.type === 'wholesale';

  // Filter customers by search
  const filteredCustomers = mockCustomers.filter(c =>
    c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(customerSearch.toLowerCase())
  );

  // Filter products by search
  const filteredProducts = mockProducts.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.sku.toLowerCase().includes(productSearch.toLowerCase())
  );

  // Get price for a product based on customer type
  const getProductPrice = (product: Product) => {
    return isWholesale ? product.wholesalePrice : product.price;
  };

  // Add product to order
  const addProduct = (productId: string) => {
    const existing = orderItems.find(item => item.productId === productId);
    if (existing) {
      setOrderItems(orderItems.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setOrderItems([...orderItems, { productId, quantity: 1, customPrice: null }]);
    }
    setProductSearch('');
    setShowProductDropdown(false);
  };

  // Remove product from order
  const removeProduct = (productId: string) => {
    setOrderItems(orderItems.filter(item => item.productId !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setOrderItems(orderItems.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    ));
  };

  // Update item custom price
  const updateCustomPrice = (productId: string, price: number | null) => {
    setOrderItems(orderItems.map(item =>
      item.productId === productId ? { ...item, customPrice: price } : item
    ));
  };

  // Calculate totals
  const calculations = useMemo(() => {
    let subtotal = 0;
    let totalCost = 0;
    let totalWeight = 0;
    let itemCount = 0;

    orderItems.forEach(item => {
      const product = mockProducts.find(p => p.id === item.productId);
      if (product) {
        const price = item.customPrice ?? getProductPrice(product);
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
  }, [orderItems, discountType, discountValue, selectedShipping, customShippingCost, taxRate, isWholesale]);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create the order via API
    alert('Order created! (Demo only - no actual order created)');
    router.push('/orders');
  };

  // Check if form is valid
  const isFormValid = () => {
    if (customerMode === 'select' && !selectedCustomerId) return false;
    if (customerMode === 'new' && (!newCustomer.name || !newCustomer.address || !newCustomer.city || !newCustomer.state || !newCustomer.zip)) return false;
    if (orderItems.length === 0) return false;
    return true;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <i className="fas fa-arrow-left text-slate-400"></i>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Create Manual Order</h1>
            <p className="text-sm text-slate-400">Create a new order for a customer</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${isWholesale ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
            {isWholesale ? 'Wholesale Pricing' : 'Retail Pricing'}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Customer Section */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700/50 flex items-center justify-between">
              <h2 className="font-semibold text-white flex items-center gap-2">
                <i className="fas fa-user text-slate-400"></i>
                Customer
              </h2>
              <div className="flex items-center bg-slate-800/50 border border-slate-700 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setCustomerMode('select')}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${customerMode === 'select' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'}`}
                >
                  Select Existing
                </button>
                <button
                  type="button"
                  onClick={() => setCustomerMode('new')}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${customerMode === 'new' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'}`}
                >
                  New Customer
                </button>
              </div>
            </div>

            <div className="p-5">
              {customerMode === 'select' ? (
                <div className="space-y-4">
                  {/* Customer Search */}
                  <div className="relative">
                    <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    <input
                      type="text"
                      placeholder="Search customers by name or email..."
                      value={customerSearch}
                      onChange={(e) => setCustomerSearch(e.target.value)}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>

                  {/* Customer List */}
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {filteredCustomers.map((customer) => (
                      <div
                        key={customer.id}
                        onClick={() => setSelectedCustomerId(customer.id)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedCustomerId === customer.id ? 'bg-emerald-500/20 border border-emerald-500/30' : 'bg-slate-800/50 border border-slate-700 hover:border-slate-600'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-white">{customer.name}</div>
                            <div className="text-sm text-slate-400">{customer.email}</div>
                            <div className="text-xs text-slate-500">{customer.city}, {customer.state} {customer.zip}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 text-xs rounded-full ${customer.type === 'wholesale' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                              {customer.type === 'wholesale' ? 'Wholesale' : 'Retail'}
                            </span>
                            {selectedCustomerId === customer.id && (
                              <i className="fas fa-check text-emerald-400"></i>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Selected Customer Details */}
                  {selectedCustomer && (
                    <div className="mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                      <div className="text-sm text-slate-400 mb-2">Shipping Address</div>
                      <div className="text-white">
                        {selectedCustomer.name}<br />
                        {selectedCustomer.address}<br />
                        {selectedCustomer.city}, {selectedCustomer.state} {selectedCustomer.zip}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Customer Type */}
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="customerType"
                        checked={newCustomer.type === 'retail'}
                        onChange={() => setNewCustomer({ ...newCustomer, type: 'retail' })}
                        className="text-emerald-500"
                      />
                      <span className="text-slate-300">Retail Customer</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="customerType"
                        checked={newCustomer.type === 'wholesale'}
                        onChange={() => setNewCustomer({ ...newCustomer, type: 'wholesale' })}
                        className="text-emerald-500"
                      />
                      <span className="text-slate-300">Wholesale Customer</span>
                    </label>
                  </div>

                  {/* Customer Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Customer Name *</label>
                      <input
                        type="text"
                        value={newCustomer.name}
                        onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                        placeholder="John Doe or Company Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Email</label>
                      <input
                        type="email"
                        value={newCustomer.email}
                        onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm text-slate-400 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={newCustomer.phone}
                        onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="pt-4 border-t border-slate-700/50">
                    <div className="text-sm font-medium text-white mb-3">Shipping Address</div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Street Address *</label>
                        <input
                          type="text"
                          value={newCustomer.address}
                          onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                          placeholder="123 Main Street"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm text-slate-400 mb-2">City *</label>
                          <input
                            type="text"
                            value={newCustomer.city}
                            onChange={(e) => setNewCustomer({ ...newCustomer, city: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                            placeholder="Houston"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-2">State *</label>
                          <input
                            type="text"
                            value={newCustomer.state}
                            onChange={(e) => setNewCustomer({ ...newCustomer, state: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                            placeholder="TX"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-2">ZIP Code *</label>
                          <input
                            type="text"
                            value={newCustomer.zip}
                            onChange={(e) => setNewCustomer({ ...newCustomer, zip: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                            placeholder="77001"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Items Section */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700/50">
              <h2 className="font-semibold text-white flex items-center gap-2">
                <i className="fas fa-box text-slate-400"></i>
                Order Items
              </h2>
            </div>

            <div className="p-5 space-y-4">
              {/* Product Search */}
              <div className="relative">
                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input
                  type="text"
                  placeholder="Search products by name or SKU..."
                  value={productSearch}
                  onChange={(e) => {
                    setProductSearch(e.target.value);
                    setShowProductDropdown(true);
                  }}
                  onFocus={() => setShowProductDropdown(true)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50"
                />

                {/* Product Dropdown */}
                {showProductDropdown && productSearch && (
                  <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl max-h-64 overflow-y-auto">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => addProduct(product.id)}
                        className="px-4 py-3 hover:bg-slate-700/50 cursor-pointer border-b border-slate-700/50 last:border-0"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-white">{product.name}</div>
                            <div className="text-xs text-slate-400">SKU: {product.sku}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-medium">{formatCurrency(getProductPrice(product))}</div>
                            <div className={`text-xs ${product.inStock > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                              {product.inStock > 0 ? `${product.inStock} in stock` : 'Out of stock'}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {filteredProducts.length === 0 && (
                      <div className="px-4 py-3 text-slate-400 text-center">No products found</div>
                    )}
                  </div>
                )}
              </div>

              {/* Order Items List */}
              {orderItems.length > 0 ? (
                <div className="space-y-3">
                  {orderItems.map((item) => {
                    const product = mockProducts.find(p => p.id === item.productId);
                    if (!product) return null;
                    const defaultPrice = getProductPrice(product);
                    const effectivePrice = item.customPrice ?? defaultPrice;
                    const isCustomPriced = item.customPrice !== null;

                    return (
                      <div key={item.productId} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <i className="fas fa-flask text-emerald-400"></i>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="font-medium text-white">{product.name}</div>
                                <div className="text-xs text-slate-400">SKU: {product.sku} • {product.weight} oz</div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeProduct(item.productId)}
                                className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            </div>

                            <div className="mt-3 flex items-center gap-4">
                              {/* Quantity */}
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-400">Qty:</span>
                                <div className="flex items-center">
                                  <button
                                    type="button"
                                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                    className="w-8 h-8 bg-slate-800 border border-slate-700 rounded-l-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                                  >
                                    -
                                  </button>
                                  <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                                    className="w-16 h-8 bg-slate-800 border-y border-slate-700 text-white text-center focus:outline-none"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                    className="w-8 h-8 bg-slate-800 border border-slate-700 rounded-r-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>

                              {/* Unit Price */}
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-400">Price:</span>
                                <div className="relative">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                  <input
                                    type="number"
                                    step="0.01"
                                    value={effectivePrice}
                                    onChange={(e) => {
                                      const newPrice = parseFloat(e.target.value);
                                      updateCustomPrice(item.productId, isNaN(newPrice) ? null : newPrice);
                                    }}
                                    className={`w-24 h-8 bg-slate-800 border rounded-lg pl-7 pr-2 text-white text-right focus:outline-none ${isCustomPriced ? 'border-amber-500/50' : 'border-slate-700'}`}
                                  />
                                </div>
                                {isCustomPriced && (
                                  <button
                                    type="button"
                                    onClick={() => updateCustomPrice(item.productId, null)}
                                    className="text-xs text-amber-400 hover:text-amber-300"
                                    title="Reset to default price"
                                  >
                                    <i className="fas fa-undo"></i>
                                  </button>
                                )}
                              </div>

                              {/* Line Total */}
                              <div className="ml-auto text-right">
                                <div className="text-white font-medium">{formatCurrency(effectivePrice * item.quantity)}</div>
                                {isCustomPriced && (
                                  <div className="text-xs text-amber-400">Custom price</div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <i className="fas fa-box-open text-4xl text-slate-600 mb-3"></i>
                  <p className="text-slate-400">No items added yet</p>
                  <p className="text-sm text-slate-500">Search for products above to add them to the order</p>
                </div>
              )}
            </div>
          </div>

          {/* Discount & Shipping Section */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700/50">
              <h2 className="font-semibold text-white flex items-center gap-2">
                <i className="fas fa-tags text-slate-400"></i>
                Discount & Shipping
              </h2>
            </div>

            <div className="p-5 space-y-6">
              {/* Discount */}
              <div>
                <div className="text-sm font-medium text-white mb-3">Discount</div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-slate-800/50 border border-slate-700 rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => setDiscountType('percent')}
                      className={`px-3 py-1.5 rounded-md text-sm transition-colors ${discountType === 'percent' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'}`}
                    >
                      Percent %
                    </button>
                    <button
                      type="button"
                      onClick={() => setDiscountType('fixed')}
                      className={`px-3 py-1.5 rounded-md text-sm transition-colors ${discountType === 'fixed' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'}`}
                    >
                      Fixed $
                    </button>
                  </div>
                  <div className="relative flex-1 max-w-[200px]">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      {discountType === 'percent' ? '%' : '$'}
                    </span>
                    <input
                      type="number"
                      min="0"
                      step={discountType === 'percent' ? '1' : '0.01'}
                      value={discountValue}
                      onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                  {discountValue > 0 && (
                    <div className="text-emerald-400">
                      -{formatCurrency(calculations.discount)}
                    </div>
                  )}
                </div>
              </div>

              {/* Shipping */}
              <div>
                <div className="text-sm font-medium text-white mb-3">
                  Shipping
                  <span className="text-slate-400 font-normal ml-2">
                    (Total weight: {(calculations.totalWeight / 16).toFixed(1)} lbs)
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {shippingOptions.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => setSelectedShipping(option.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedShipping === option.id ? 'bg-emerald-500/20 border border-emerald-500/30' : 'bg-slate-800/50 border border-slate-700 hover:border-slate-600'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">{option.name}</div>
                          <div className="text-xs text-slate-400">{option.description}</div>
                        </div>
                        <div className="text-white font-medium">
                          {option.id === 'custom' ? 'Custom' : option.price === 0 ? 'Free' : formatCurrency(option.price)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedShipping === 'custom' && (
                  <div className="mt-3">
                    <label className="block text-sm text-slate-400 mb-2">Custom Shipping Cost</label>
                    <div className="relative max-w-[200px]">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={customShippingCost}
                        onChange={(e) => setCustomShippingCost(parseFloat(e.target.value) || 0)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Tax */}
              <div>
                <div className="text-sm font-medium text-white mb-3">Tax Rate</div>
                <div className="flex items-center gap-4">
                  <div className="relative max-w-[150px]">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={taxRate}
                      onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                  </div>
                  <span className="text-sm text-slate-400">(0% for tax-exempt wholesale)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Notes */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
            <h2 className="font-semibold text-white mb-3 flex items-center gap-2">
              <i className="fas fa-sticky-note text-slate-400"></i>
              Order Notes
            </h2>
            <textarea
              rows={3}
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 resize-none"
              placeholder="Add any internal notes about this order..."
            ></textarea>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden sticky top-6">
            <div className="px-5 py-4 border-b border-slate-700/50">
              <h2 className="font-semibold text-white">Order Summary</h2>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Items ({calculations.itemCount})</span>
                <span className="text-white">{formatCurrency(calculations.subtotal)}</span>
              </div>
              {calculations.discount > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Discount</span>
                  <span className="text-emerald-400">-{formatCurrency(calculations.discount)}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Shipping</span>
                <span className="text-white">
                  {calculations.shipping === 0 ? 'Free' : formatCurrency(calculations.shipping)}
                </span>
              </div>
              {calculations.tax > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Tax ({taxRate}%)</span>
                  <span className="text-white">{formatCurrency(calculations.tax)}</span>
                </div>
              )}
              <div className="border-t border-slate-700/50 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Total</span>
                  <span className="text-2xl font-bold text-white">{formatCurrency(calculations.total)}</span>
                </div>
              </div>

              {/* Profitability */}
              <div className="border-t border-slate-700/50 pt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Cost of Goods</span>
                  <span className="text-slate-300">{formatCurrency(calculations.totalCost)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Estimated Profit</span>
                  <span className="text-emerald-400 font-medium">{formatCurrency(calculations.profit)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Margin</span>
                  <span className={`font-medium ${calculations.margin >= 50 ? 'text-emerald-400' : calculations.margin >= 30 ? 'text-amber-400' : 'text-red-400'}`}>
                    {calculations.margin.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={!isFormValid()}
              className="w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg transition-colors font-medium disabled:cursor-not-allowed"
            >
              <i className="fas fa-check mr-2"></i>
              Create Order
            </button>
            <button
              type="button"
              className="w-full px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors"
            >
              <i className="fas fa-save mr-2"></i>
              Save as Draft
            </button>
            <Link
              href="/orders"
              className="w-full px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors text-center block"
            >
              Cancel
            </Link>
          </div>

          {/* Help */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <i className="fas fa-info-circle text-blue-400 mt-0.5"></i>
              <div className="text-sm">
                <div className="text-blue-400 font-medium mb-1">Pricing Info</div>
                <p className="text-slate-400">
                  {isWholesale
                    ? 'Wholesale pricing is automatically applied. You can still customize individual item prices.'
                    : 'Retail pricing is applied. Select a wholesale customer for discounted rates.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
