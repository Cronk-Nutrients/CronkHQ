'use client';

import { useState, useEffect, useMemo } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useApp, Order, OrderItem } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/formatting';

interface EditOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}

interface OrderItemDraft {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  price: number;
  cost: number;
}

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

const COUNTRIES = ['US', 'CA', 'MX', 'UK', 'AU'];

export function EditOrderModal({ isOpen, onClose, order }: EditOrderModalProps) {
  const { state, dispatch } = useApp();
  const { success, error } = useToast();

  // Tab state
  const [activeTab, setActiveTab] = useState<'customer' | 'shipping' | 'billing' | 'items' | 'notes'>('customer');

  // Customer info
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // Shipping Address
  const [shippingStreet, setShippingStreet] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingState, setShippingState] = useState('');
  const [shippingZip, setShippingZip] = useState('');
  const [shippingCountry, setShippingCountry] = useState('US');

  // Billing Address
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [billingStreet, setBillingStreet] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingState, setBillingState] = useState('');
  const [billingZip, setBillingZip] = useState('');
  const [billingCountry, setBillingCountry] = useState('US');

  // Order items
  const [items, setItems] = useState<OrderItemDraft[]>([]);

  // Totals
  const [shipping, setShipping] = useState('0');
  const [tax, setTax] = useState('0');
  const [discount, setDiscount] = useState('0');

  // Notes
  const [notes, setNotes] = useState('');

  // Initialize form with order data
  useEffect(() => {
    if (isOpen && order) {
      setCustomerName(order.customer.name);
      setCustomerEmail(order.customer.email);
      setCustomerPhone(order.customer.phone || '');

      setShippingStreet(order.customer.address.street);
      setShippingCity(order.customer.address.city);
      setShippingState(order.customer.address.state);
      setShippingZip(order.customer.address.zip);
      setShippingCountry(order.customer.address.country);

      if (order.billingAddress) {
        setSameAsShipping(false);
        setBillingStreet(order.billingAddress.street);
        setBillingCity(order.billingAddress.city);
        setBillingState(order.billingAddress.state);
        setBillingZip(order.billingAddress.zip);
        setBillingCountry(order.billingAddress.country);
      } else {
        setSameAsShipping(true);
      }

      setItems(order.items.map(item => ({
        productId: item.productId,
        productName: item.productName,
        sku: item.sku,
        quantity: item.quantity,
        price: item.price,
        cost: item.cost,
      })));

      setShipping(order.shipping.toString());
      setTax(order.tax.toString());
      setDiscount(order.discount.toString());
      setNotes(order.notes || '');
    }
  }, [isOpen, order]);

  // Calculate totals
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const cogs = useMemo(() => {
    return items.reduce((sum, item) => sum + item.cost * item.quantity, 0);
  }, [items]);

  const total = useMemo(() => {
    return subtotal + parseFloat(shipping || '0') + parseFloat(tax || '0') - parseFloat(discount || '0');
  }, [subtotal, shipping, tax, discount]);

  const profit = total - cogs;
  const margin = total > 0 ? (profit / total) * 100 : 0;

  // Update item quantity
  const updateItemQuantity = (index: number, quantity: number) => {
    setItems(prev => prev.map((item, i) =>
      i === index ? { ...item, quantity: Math.max(1, quantity) } : item
    ));
  };

  // Update item price
  const updateItemPrice = (index: number, price: number) => {
    setItems(prev => prev.map((item, i) =>
      i === index ? { ...item, price: Math.max(0, price) } : item
    ));
  };

  // Remove item
  const removeItem = (index: number) => {
    if (items.length <= 1) {
      error('Order must have at least one item');
      return;
    }
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  // Add product to order
  const addProduct = (productId: string) => {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    // Check if already in order
    const existingIndex = items.findIndex(i => i.productId === productId);
    if (existingIndex >= 0) {
      updateItemQuantity(existingIndex, items[existingIndex].quantity + 1);
      return;
    }

    setItems(prev => [...prev, {
      productId: product.id,
      productName: product.name,
      sku: product.sku,
      quantity: 1,
      price: product.prices.shopify,
      cost: product.cost.rolling,
    }]);
  };

  // Handle save
  const handleSave = () => {
    if (!customerName.trim()) {
      error('Customer name is required');
      return;
    }
    if (!customerEmail.trim()) {
      error('Customer email is required');
      return;
    }
    if (items.length === 0) {
      error('Order must have at least one item');
      return;
    }

    const updatedOrder: Order = {
      ...order,
      customer: {
        name: customerName,
        email: customerEmail,
        phone: customerPhone || undefined,
        address: {
          street: shippingStreet,
          city: shippingCity,
          state: shippingState,
          zip: shippingZip,
          country: shippingCountry,
        },
      },
      billingAddress: sameAsShipping ? undefined : {
        street: billingStreet,
        city: billingCity,
        state: billingState,
        zip: billingZip,
        country: billingCountry,
      },
      items: items.map(item => ({
        ...item,
        picked: order.items.find(i => i.productId === item.productId)?.picked || false,
      })),
      subtotal,
      shipping: parseFloat(shipping || '0'),
      tax: parseFloat(tax || '0'),
      discount: parseFloat(discount || '0'),
      total,
      cogs,
      profit,
      margin,
      notes: notes || undefined,
      updatedAt: new Date(),
    };

    dispatch({ type: 'UPDATE_ORDER', payload: updatedOrder });
    success('Order updated successfully');
    onClose();
  };

  const tabs = [
    { id: 'customer', label: 'Customer', icon: 'fa-user' },
    { id: 'shipping', label: 'Shipping', icon: 'fa-truck' },
    { id: 'billing', label: 'Billing', icon: 'fa-credit-card' },
    { id: 'items', label: 'Items', icon: 'fa-box' },
    { id: 'notes', label: 'Notes', icon: 'fa-sticky-note' },
  ] as const;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={`Edit Order #${order.orderNumber}`}
      size="xl"
    >
      <div className="flex flex-col h-[600px]">
        {/* Tabs */}
        <div className="flex border-b border-slate-700 mb-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'text-emerald-400 border-b-2 border-emerald-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <i className={`fas ${tab.icon}`}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Customer Tab */}
          {activeTab === 'customer' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Customer Name *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="John Doe"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Email *</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    placeholder="+1 555-0123"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Shipping Tab */}
          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Street Address *</label>
                <input
                  type="text"
                  value={shippingStreet}
                  onChange={(e) => setShippingStreet(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="123 Main St"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">City *</label>
                  <input
                    type="text"
                    value={shippingCity}
                    onChange={(e) => setShippingCity(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    placeholder="Houston"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">State *</label>
                  <select
                    value={shippingState}
                    onChange={(e) => setShippingState(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="">Select state</option>
                    {US_STATES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">ZIP Code *</label>
                  <input
                    type="text"
                    value={shippingZip}
                    onChange={(e) => setShippingZip(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    placeholder="77001"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Country</label>
                  <select
                    value={shippingCountry}
                    onChange={(e) => setShippingCountry(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  >
                    {COUNTRIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Shipping Cost</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-slate-400">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={shipping}
                      onChange={(e) => setShipping(e.target.value)}
                      className="w-full pl-7 pr-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sameAsShipping}
                  onChange={(e) => setSameAsShipping(e.target.checked)}
                  className="rounded bg-slate-700 border-slate-600 text-emerald-500 focus:ring-emerald-500"
                />
                <span className="text-slate-300">Same as shipping address</span>
              </label>

              {!sameAsShipping && (
                <>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Street Address</label>
                    <input
                      type="text"
                      value={billingStreet}
                      onChange={(e) => setBillingStreet(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-1">City</label>
                      <input
                        type="text"
                        value={billingCity}
                        onChange={(e) => setBillingCity(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1">State</label>
                      <select
                        value={billingState}
                        onChange={(e) => setBillingState(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="">Select state</option>
                        {US_STATES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-1">ZIP Code</label>
                      <input
                        type="text"
                        value={billingZip}
                        onChange={(e) => setBillingZip(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1">Country</label>
                      <select
                        value={billingCountry}
                        onChange={(e) => setBillingCountry(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                      >
                        {COUNTRIES.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Items Tab */}
          {activeTab === 'items' && (
            <div className="space-y-4">
              {/* Add Product */}
              <div>
                <label className="block text-sm text-slate-400 mb-1">Add Product</label>
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      addProduct(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="">Select product to add...</option>
                  {state.products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
                  ))}
                </select>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">{item.productName}</div>
                      <div className="text-xs text-slate-400">{item.sku}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-slate-400">Qty:</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItemQuantity(index, parseInt(e.target.value) || 1)}
                        className="w-16 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm text-center"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-slate-400">Price:</label>
                      <div className="relative">
                        <span className="absolute left-2 top-1 text-slate-400 text-sm">$</span>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={item.price}
                          onChange={(e) => updateItemPrice(index, parseFloat(e.target.value) || 0)}
                          className="w-20 pl-5 pr-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm text-right"
                        />
                      </div>
                    </div>
                    <div className="text-sm font-medium text-white w-20 text-right">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                    <button
                      onClick={() => removeItem(index)}
                      className="p-1 text-slate-400 hover:text-red-400"
                    >
                      <i className="fas fa-trash text-sm"></i>
                    </button>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="pt-4 border-t border-slate-700 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-white">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm items-center">
                  <span className="text-slate-400">Tax</span>
                  <div className="relative w-24">
                    <span className="absolute left-2 top-1 text-slate-400 text-sm">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={tax}
                      onChange={(e) => setTax(e.target.value)}
                      className="w-full pl-5 pr-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm text-right"
                    />
                  </div>
                </div>
                <div className="flex justify-between text-sm items-center">
                  <span className="text-slate-400">Discount</span>
                  <div className="relative w-24">
                    <span className="absolute left-2 top-1 text-slate-400 text-sm">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      className="w-full pl-5 pr-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm text-right"
                    />
                  </div>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-slate-600">
                  <span className="text-white">Total</span>
                  <span className="text-white">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Notes Tab */}
          {activeTab === 'notes' && (
            <div>
              <label className="block text-sm text-slate-400 mb-1">Order Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500 resize-none"
                placeholder="Internal notes about this order..."
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-700 mt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <i className="fas fa-save mr-2"></i>
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default EditOrderModal;
