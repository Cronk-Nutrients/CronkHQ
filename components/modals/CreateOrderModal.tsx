'use client';

import { useState, useEffect, useMemo } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useApp, Order, OrderItem } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { formatCurrency, formatNumber } from '@/lib/formatting';

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface OrderItemDraft {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  price: number;
  cost: number;
}

const COUNTRIES = [
  'USA',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Japan',
];

export function CreateOrderModal({ isOpen, onClose }: CreateOrderModalProps) {
  const { state, dispatch } = useApp();
  const { success, error, warning } = useToast();

  // Customer info
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // Address
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [addressState, setAddressState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('USA');

  // Order items
  const [items, setItems] = useState<OrderItemDraft[]>([]);

  // Totals
  const [shipping, setShipping] = useState('0');
  const [tax, setTax] = useState('0');
  const [discount, setDiscount] = useState('0');

  // Notes
  const [notes, setNotes] = useState('');

  // Product search
  const [productSearch, setProductSearch] = useState('');
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [itemQty, setItemQty] = useState('1');

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');
      setStreet('');
      setCity('');
      setAddressState('');
      setZip('');
      setCountry('USA');
      setItems([]);
      setShipping('0');
      setTax('0');
      setDiscount('0');
      setNotes('');
      setProductSearch('');
      setItemQty('1');
    }
  }, [isOpen]);

  // Get total stock for a product
  const getProductStock = (productId: string) => {
    return state.inventory
      .filter(i => i.productId === productId)
      .reduce((sum, i) => sum + i.quantity, 0);
  };

  // Filter products for search
  const filteredProducts = useMemo(() => {
    if (!productSearch.trim()) return [];
    const search = productSearch.toLowerCase();
    return state.products
      .filter(p =>
        (p.name.toLowerCase().includes(search) || p.sku.toLowerCase().includes(search)) &&
        !items.some(i => i.productId === p.id)
      )
      .slice(0, 8);
  }, [productSearch, state.products, items]);

  // Calculate totals
  const orderTotals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const cogs = items.reduce((sum, item) => sum + item.cost * item.quantity, 0);
    const shippingVal = parseFloat(shipping) || 0;
    const taxVal = parseFloat(tax) || 0;
    const discountVal = parseFloat(discount) || 0;
    const total = subtotal + shippingVal + taxVal - discountVal;
    const profit = total - cogs - shippingVal;
    const margin = total > 0 ? (profit / total) * 100 : 0;

    return { subtotal, cogs, total, profit, margin };
  }, [items, shipping, tax, discount]);

  // Add item to order
  const addItem = (productId: string) => {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const qty = parseInt(itemQty) || 1;
    setItems(prev => [
      ...prev,
      {
        productId: product.id,
        productName: product.name,
        sku: product.sku,
        quantity: qty,
        price: product.prices.msrp,
        cost: product.cost.rolling,
      }
    ]);
    setProductSearch('');
    setItemQty('1');
    setShowProductDropdown(false);
  };

  // Remove item
  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(i => i.productId !== productId));
  };

  // Update item quantity
  const updateItemQty = (productId: string, qty: number) => {
    if (qty < 1) return;
    setItems(prev => prev.map(i =>
      i.productId === productId ? { ...i, quantity: qty } : i
    ));
  };

  // Update item price
  const updateItemPrice = (productId: string, price: number) => {
    if (price < 0) return;
    setItems(prev => prev.map(i =>
      i.productId === productId ? { ...i, price } : i
    ));
  };

  // Generate order number
  const generateOrderNumber = () => {
    const manualOrders = state.orders.filter(o => o.channel === 'manual').length;
    return `MAN-${(manualOrders + 1).toString().padStart(4, '0')}`;
  };

  // Validate email
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Validation
  const isValid = useMemo(() => {
    if (!customerName.trim()) return false;
    if (!customerEmail.trim() || !isValidEmail(customerEmail)) return false;
    if (!street.trim()) return false;
    if (!city.trim()) return false;
    if (!addressState.trim()) return false;
    if (!zip.trim()) return false;
    if (!country) return false;
    if (items.length === 0) return false;
    return true;
  }, [customerName, customerEmail, street, city, addressState, zip, country, items]);

  // Submit handler
  const handleSubmit = () => {
    if (!isValid) return;

    setIsSubmitting(true);

    try {
      const orderNumber = generateOrderNumber();
      const shippingVal = parseFloat(shipping) || 0;
      const taxVal = parseFloat(tax) || 0;
      const discountVal = parseFloat(discount) || 0;

      const newOrder: Order = {
        id: crypto.randomUUID(),
        orderNumber,
        channel: 'manual',
        status: 'to_pick',
        customer: {
          name: customerName.trim(),
          email: customerEmail.trim(),
          phone: customerPhone.trim() || undefined,
          address: {
            street: street.trim(),
            city: city.trim(),
            state: addressState.trim(),
            zip: zip.trim(),
            country,
          },
        },
        items: items.map(item => ({
          productId: item.productId,
          productName: item.productName,
          sku: item.sku,
          quantity: item.quantity,
          price: item.price,
          cost: item.cost,
          picked: false,
        })),
        subtotal: orderTotals.subtotal,
        shipping: shippingVal,
        tax: taxVal,
        discount: discountVal,
        total: orderTotals.total,
        cogs: orderTotals.cogs,
        profit: orderTotals.profit,
        margin: orderTotals.margin,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      dispatch({ type: 'ADD_ORDER', payload: newOrder });
      success(`Order ${orderNumber} created successfully`);
      onClose();
    } catch (err) {
      error('Failed to create order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Create Manual Order"
      subtitle="Add a new order manually"
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || !isValid}>
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Creating...
              </>
            ) : (
              <>
                <i className="fas fa-plus mr-2"></i>
                Create Order
              </>
            )}
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Customer Information */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Customer Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Name *</label>
              <input
                type="text"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Email *</label>
              <input
                type="email"
                value={customerEmail}
                onChange={e => setCustomerEmail(e.target.value)}
                placeholder="john@example.com"
                className={`w-full bg-slate-800 border rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none ${
                  customerEmail && !isValidEmail(customerEmail)
                    ? 'border-red-500/50'
                    : 'border-slate-700 focus:border-emerald-500/50'
                }`}
              />
              {customerEmail && !isValidEmail(customerEmail) && (
                <p className="text-xs text-red-400 mt-1">Invalid email format</p>
              )}
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-slate-400 mb-1.5">Phone (Optional)</label>
              <input
                type="tel"
                value={customerPhone}
                onChange={e => setCustomerPhone(e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Shipping Address</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm text-slate-400 mb-1.5">Street Address *</label>
              <input
                type="text"
                value={street}
                onChange={e => setStreet(e.target.value)}
                placeholder="123 Main Street"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">City *</label>
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="New York"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">State *</label>
              <input
                type="text"
                value={addressState}
                onChange={e => setAddressState(e.target.value)}
                placeholder="NY"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">ZIP Code *</label>
              <input
                type="text"
                value={zip}
                onChange={e => setZip(e.target.value)}
                placeholder="10001"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Country *</label>
              <select
                value={country}
                onChange={e => setCountry(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
              >
                {COUNTRIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Order Items *</h3>

          {/* Add Item */}
          <div className="flex gap-2 mb-4">
            <div className="flex-1 relative">
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="text"
                value={productSearch}
                onChange={e => {
                  setProductSearch(e.target.value);
                  setShowProductDropdown(true);
                }}
                onFocus={() => setShowProductDropdown(true)}
                placeholder="Search products..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />

              {/* Dropdown */}
              {showProductDropdown && filteredProducts.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-lg max-h-48 overflow-auto">
                  {filteredProducts.map(product => {
                    const stock = getProductStock(product.id);
                    return (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => addItem(product.id)}
                        className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-slate-700/50 text-left"
                      >
                        <div>
                          <div className="text-sm text-white">{product.name}</div>
                          <div className="text-xs text-slate-400">
                            {product.sku} - {formatCurrency(product.prices.msrp)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm ${stock > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {formatNumber(stock)} in stock
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <input
              type="number"
              min="1"
              value={itemQty}
              onChange={e => setItemQty(e.target.value)}
              className="w-20 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-center focus:outline-none focus:border-emerald-500/50"
              placeholder="Qty"
            />
          </div>

          {/* Items List */}
          {items.length > 0 ? (
            <div className="space-y-2 mb-4">
              {items.map(item => {
                const stock = getProductStock(item.productId);
                const hasInsufficientStock = stock < item.quantity;

                return (
                  <div
                    key={item.productId}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      hasInsufficientStock
                        ? 'bg-red-500/10 border-red-500/30'
                        : 'bg-slate-800/50 border-slate-700/50'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white truncate">{item.productName}</div>
                      <div className="text-xs text-slate-400">
                        {item.sku} - {formatNumber(stock)} available
                        {hasInsufficientStock && (
                          <span className="text-red-400 ml-2">
                            <i className="fas fa-exclamation-triangle mr-1"></i>
                            Low stock
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={e => updateItemQty(item.productId, parseInt(e.target.value) || 1)}
                        className="w-16 bg-slate-700 border border-slate-600 rounded-lg px-2 py-1.5 text-white text-center text-sm"
                      />
                      <span className="text-slate-400">x</span>
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={item.price}
                          onChange={e => updateItemPrice(item.productId, parseFloat(e.target.value) || 0)}
                          className="w-24 bg-slate-700 border border-slate-600 rounded-lg pl-6 pr-2 py-1.5 text-white text-sm"
                        />
                      </div>
                      <span className="text-white font-medium w-20 text-right">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="p-2 text-slate-500 hover:text-red-400"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-6 border-2 border-dashed border-slate-700 rounded-lg text-center text-slate-400 mb-4">
              <i className="fas fa-shopping-cart text-2xl mb-2"></i>
              <p>No items added yet</p>
              <p className="text-xs text-slate-500">Search for products above to add them</p>
            </div>
          )}
        </div>

        {/* Order Totals */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Order Totals</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Shipping</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={shipping}
                  onChange={e => setShipping(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Tax</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={tax}
                  onChange={e => setTax(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Discount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={discount}
                  onChange={e => setDiscount(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                />
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Subtotal</span>
                <span className="text-white">{formatCurrency(orderTotals.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Shipping</span>
                <span className="text-white">{formatCurrency(parseFloat(shipping) || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tax</span>
                <span className="text-white">{formatCurrency(parseFloat(tax) || 0)}</span>
              </div>
              {parseFloat(discount) > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Discount</span>
                  <span className="text-emerald-400">-{formatCurrency(parseFloat(discount))}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-slate-700">
                <span className="font-medium text-white">Total</span>
                <span className="font-bold text-white text-lg">{formatCurrency(orderTotals.total)}</span>
              </div>
            </div>

            {/* Profit Preview */}
            {items.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-xs text-slate-400">COGS</div>
                  <div className="text-sm text-white">{formatCurrency(orderTotals.cogs)}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Profit</div>
                  <div className={`text-sm ${orderTotals.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {formatCurrency(orderTotals.profit)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Margin</div>
                  <div className={`text-sm ${orderTotals.margin >= 30 ? 'text-emerald-400' : orderTotals.margin >= 15 ? 'text-amber-400' : 'text-red-400'}`}>
                    {orderTotals.margin.toFixed(1)}%
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Internal Notes (Optional)</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={2}
            placeholder="Any special instructions or notes..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 resize-none"
          />
        </div>
      </div>
    </Modal>
  );
}

export default CreateOrderModal;
