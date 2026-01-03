'use client';

import { useState, useEffect, useMemo } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useApp, Product, ProductComponent } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { formatNumber } from '@/lib/formatting';
import { Plus, X, Package, Search, Hash, Calendar, Layers, ShoppingCart, BoxIcon, Truck } from 'lucide-react';
import { Toggle } from '@/components/ui/Toggle';
import { ProductType, SupplyType, BoxDimensions } from '@/types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  editProduct?: Product | null;
}

const CATEGORIES = [
  { value: 'classic_line', label: 'Classic Line' },
  { value: 'additives', label: 'Additives' },
  { value: 'autoflower_line', label: 'Autoflower Line' },
  { value: 'puur_organics', label: 'PuurOrganics' },
  { value: 'shipping_supplies', label: 'Shipping Supplies' },
  { value: 'merch', label: 'Merch' },
  { value: 'labels', label: 'Labels' },
];

interface FormData {
  name: string;
  sku: string;
  barcode: string;
  category: string;
  description: string;
  cost: string;
  priceMSRP: string;
  priceShopify: string;
  priceAmazon: string;
  priceWholesale: string;
  weight: string;
  length: string;
  width: string;
  height: string;
  reorderPoint: string;
  supplier: string;
}

const initialFormData: FormData = {
  name: '',
  sku: '',
  barcode: '',
  category: 'classic_line',
  description: '',
  cost: '',
  priceMSRP: '',
  priceShopify: '',
  priceAmazon: '',
  priceWholesale: '',
  weight: '',
  length: '',
  width: '',
  height: '',
  reorderPoint: '50',
  supplier: '',
};

export function AddProductModal({ isOpen, onClose, editProduct }: AddProductModalProps) {
  const { state, dispatch } = useApp();
  const { success, error } = useToast();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Components state for BOM
  const [components, setComponents] = useState<ProductComponent[]>([]);
  const [componentSearch, setComponentSearch] = useState('');
  const [showComponentDropdown, setShowComponentDropdown] = useState(false);

  // Serial number tracking state
  const [trackSerials, setTrackSerials] = useState(false);
  const [serialPrefix, setSerialPrefix] = useState('');
  const [serialNextNumber, setSerialNextNumber] = useState(1001);
  const [serialSuffix, setSerialSuffix] = useState('');

  // Lot/batch tracking state
  const [trackLots, setTrackLots] = useState(false);
  const [expirationTracking, setExpirationTracking] = useState(false);
  const [expirationWarningDays, setExpirationWarningDays] = useState(30);
  const [lotPrefix, setLotPrefix] = useState('');
  const [lotNextNumber, setLotNextNumber] = useState(1);

  // Product type state
  const [productType, setProductType] = useState<ProductType>('sellable');
  const [supplyType, setSupplyType] = useState<SupplyType>('box');
  const [boxDimensions, setBoxDimensions] = useState<Partial<BoxDimensions>>({});
  const [maxWeight, setMaxWeight] = useState<number>(50);
  const [reorderQuantity, setReorderQuantity] = useState<number>(0);

  const isEditing = !!editProduct;

  // Filter products for component search (exclude current product and already added)
  const filteredComponentProducts = useMemo(() => {
    if (!componentSearch.trim()) return [];
    const search = componentSearch.toLowerCase();
    return state.products
      .filter(p =>
        (p.name.toLowerCase().includes(search) || p.sku.toLowerCase().includes(search)) &&
        p.id !== editProduct?.id &&
        !components.some(c => c.productId === p.id)
      )
      .slice(0, 6);
  }, [componentSearch, state.products, components, editProduct?.id]);

  // Get total stock for a product
  const getProductStock = (productId: string) => {
    return state.inventory
      .filter(i => i.productId === productId)
      .reduce((sum, i) => sum + i.quantity, 0);
  };

  // Add component to list
  const addComponent = (productId: string) => {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    setComponents(prev => [
      ...prev,
      {
        productId: product.id,
        productName: product.name,
        quantity: 1,
      }
    ]);
    setComponentSearch('');
    setShowComponentDropdown(false);
  };

  // Remove component from list
  const removeComponent = (productId: string) => {
    setComponents(prev => prev.filter(c => c.productId !== productId));
  };

  // Update component quantity
  const updateComponentQty = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setComponents(prev => prev.map(c =>
      c.productId === productId ? { ...c, quantity } : c
    ));
  };

  // Reset form when modal opens/closes or editProduct changes
  useEffect(() => {
    if (isOpen) {
      if (editProduct) {
        setFormData({
          name: editProduct.name,
          sku: editProduct.sku,
          barcode: editProduct.barcode || '',
          category: editProduct.category,
          description: editProduct.description || '',
          cost: editProduct.cost.rolling.toString(),
          priceMSRP: editProduct.prices.msrp.toString(),
          priceShopify: editProduct.prices.shopify?.toString() || '',
          priceAmazon: editProduct.prices.amazon?.toString() || '',
          priceWholesale: editProduct.prices.wholesale?.toString() || '',
          weight: editProduct.weight.value.toString(),
          length: editProduct.dimensions?.length?.toString() || '',
          width: editProduct.dimensions?.width?.toString() || '',
          height: editProduct.dimensions?.height?.toString() || '',
          reorderPoint: editProduct.reorderPoint.toString(),
          supplier: editProduct.supplier || '',
        });
        // Load existing components
        setComponents(editProduct.components || []);
        // Load serial tracking settings
        setTrackSerials(editProduct.trackSerials || false);
        setSerialPrefix(editProduct.serialPrefix || '');
        setSerialNextNumber(editProduct.serialNextNumber || 1001);
        setSerialSuffix(editProduct.serialSuffix || '');
        // Load lot tracking settings
        setTrackLots(editProduct.trackLots || false);
        setExpirationTracking(editProduct.expirationTracking || false);
        setExpirationWarningDays(editProduct.expirationWarningDays || 30);
        setLotPrefix(editProduct.lotPrefix || '');
        setLotNextNumber(editProduct.lotNextNumber || 1);
        // Load product type settings
        setProductType((editProduct as any).productType || 'sellable');
        setSupplyType((editProduct as any).supplyType || 'box');
        setBoxDimensions((editProduct as any).boxDimensions || {});
        setMaxWeight((editProduct as any).maxWeight || 50);
        setReorderQuantity((editProduct as any).reorderQuantity || 0);
      } else {
        setFormData(initialFormData);
        setComponents([]);
        setTrackSerials(false);
        setSerialPrefix('');
        setSerialNextNumber(1001);
        setSerialSuffix('');
        setTrackLots(false);
        setExpirationTracking(false);
        setExpirationWarningDays(30);
        setLotPrefix('');
        setLotNextNumber(1);
        // Reset product type state
        setProductType('sellable');
        setSupplyType('box');
        setBoxDimensions({});
        setMaxWeight(50);
        setReorderQuantity(0);
      }
      setErrors({});
      setComponentSearch('');
      setShowComponentDropdown(false);
    }
  }, [isOpen, editProduct]);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const generateSku = () => {
    const categoryPrefix = formData.category.substring(0, 3).toUpperCase();
    const randomNum = Math.floor(Math.random() * 900) + 100;
    const newSku = `CN${categoryPrefix}${randomNum}`;
    handleChange('sku', newSku);
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.sku.trim()) {
      newErrors.sku = 'SKU is required';
    } else if (!isEditing || formData.sku !== editProduct?.sku) {
      // Check for duplicate SKU
      const existingSku = state.products.find(
        p => p.sku.toLowerCase() === formData.sku.toLowerCase() && p.id !== editProduct?.id
      );
      if (existingSku) {
        newErrors.sku = 'SKU already exists';
      }
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    const cost = parseFloat(formData.cost);
    if (isNaN(cost) || cost < 0) {
      newErrors.cost = 'Valid cost is required';
    }

    const msrp = parseFloat(formData.priceMSRP);
    if (isNaN(msrp) || msrp < 0) {
      newErrors.priceMSRP = 'Valid MSRP is required';
    }

    const weight = parseFloat(formData.weight);
    if (isNaN(weight) || weight < 0) {
      newErrors.weight = 'Valid weight is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const productData: Product = {
        id: editProduct?.id || crypto.randomUUID(),
        name: formData.name.trim(),
        sku: formData.sku.trim(),
        barcode: formData.barcode.trim() || undefined,
        category: formData.category,
        description: formData.description.trim() || undefined,
        cost: {
          rolling: parseFloat(formData.cost),
          fixed: parseFloat(formData.cost),
        },
        prices: {
          msrp: parseFloat(formData.priceMSRP),
          shopify: formData.priceShopify ? parseFloat(formData.priceShopify) : parseFloat(formData.priceMSRP),
          amazon: formData.priceAmazon ? parseFloat(formData.priceAmazon) : parseFloat(formData.priceMSRP),
          wholesale: formData.priceWholesale ? parseFloat(formData.priceWholesale) : parseFloat(formData.priceMSRP) * 0.6,
        },
        weight: {
          value: parseFloat(formData.weight),
          unit: 'lbs',
        },
        dimensions: {
          length: parseFloat(formData.length) || 0,
          width: parseFloat(formData.width) || 0,
          height: parseFloat(formData.height) || 0,
        },
        reorderPoint: parseInt(formData.reorderPoint) || 50,
        supplier: formData.supplier.trim() || undefined,
        skus: editProduct?.skus,
        // Include manufacturing components (BOM)
        components: components.length > 0 ? components : undefined,
        // Serial number tracking
        trackSerials,
        serialPrefix: trackSerials ? serialPrefix : undefined,
        serialNextNumber: trackSerials ? serialNextNumber : undefined,
        serialSuffix: trackSerials ? serialSuffix : undefined,
        // Lot/batch tracking
        trackLots,
        expirationTracking: trackLots ? expirationTracking : undefined,
        expirationWarningDays: trackLots && expirationTracking ? expirationWarningDays : undefined,
        lotPrefix: trackLots ? lotPrefix : undefined,
        lotNextNumber: trackLots ? lotNextNumber : undefined,
        // Product type classification
        productType,
        supplyType: productType === 'shipping_supply' ? supplyType : undefined,
        boxDimensions: productType === 'shipping_supply' && supplyType === 'box' ? boxDimensions as any : undefined,
        maxWeight: productType === 'shipping_supply' && supplyType === 'box' ? maxWeight : undefined,
        maxWeightUnit: productType === 'shipping_supply' && supplyType === 'box' ? 'lb' : undefined,
        reorderQuantity: productType !== 'sellable' ? reorderQuantity : undefined,
        createdAt: editProduct?.createdAt || new Date(),
        updatedAt: new Date(),
      };

      if (isEditing) {
        dispatch({ type: 'UPDATE_PRODUCT', payload: productData });
        success('Product updated successfully!');
      } else {
        dispatch({ type: 'ADD_PRODUCT', payload: productData });

        // Create initial inventory levels (0) for all locations
        state.locations.forEach(location => {
          const existingInventory = state.inventory.find(
            inv => inv.productId === productData.id && inv.locationId === location.id
          );
          if (!existingInventory) {
            dispatch({
              type: 'UPDATE_INVENTORY',
              payload: {
                productId: productData.id,
                locationId: location.id,
                quantity: 0,
                updatedAt: new Date(),
              },
            });
          }
        });

        success('Product created successfully!');
      }

      onClose();
    } catch (err) {
      error('Failed to save product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Product' : 'Add Product'}
      subtitle={isEditing ? `Editing ${editProduct?.name}` : 'Create a new product in your inventory'}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Saving...
              </>
            ) : isEditing ? (
              'Save Changes'
            ) : (
              'Create Product'
            )}
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Basic Info */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Basic Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm text-slate-400 mb-1.5">
                Product Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => handleChange('name', e.target.value)}
                className={`w-full bg-slate-800 border ${errors.name ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50`}
                placeholder="e.g., 1L Micro Classic"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">
                SKU <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.sku}
                  onChange={e => handleChange('sku', e.target.value.toUpperCase())}
                  className={`flex-1 bg-slate-800 border ${errors.sku ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50`}
                  placeholder="e.g., CLM1L"
                />
                <button
                  type="button"
                  onClick={generateSku}
                  className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors text-sm"
                  title="Auto-generate SKU"
                >
                  <i className="fas fa-magic"></i>
                </button>
              </div>
              {errors.sku && <p className="text-red-400 text-xs mt-1">{errors.sku}</p>}
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Barcode</label>
              <input
                type="text"
                value={formData.barcode}
                onChange={e => handleChange('barcode', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                placeholder="UPC or EAN"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.category}
                onChange={e => handleChange('category', e.target.value)}
                className={`w-full bg-slate-800 border ${errors.category ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50`}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Supplier</label>
              <input
                type="text"
                value={formData.supplier}
                onChange={e => handleChange('supplier', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                placeholder="e.g., HIGROCORP"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm text-slate-400 mb-1.5">Description</label>
              <textarea
                value={formData.description}
                onChange={e => handleChange('description', e.target.value)}
                rows={2}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 resize-none"
                placeholder="Product description..."
              />
            </div>
          </div>
        </div>

        {/* Product Type */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Product Type</h3>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {/* Sellable Product */}
            <label
              className={`flex flex-col p-4 rounded-lg cursor-pointer border-2 transition-colors ${
                productType === 'sellable'
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : 'border-slate-700 hover:border-slate-600 bg-slate-900/50'
              }`}
            >
              <input
                type="radio"
                name="productType"
                value="sellable"
                checked={productType === 'sellable'}
                onChange={(e) => setProductType(e.target.value as ProductType)}
                className="sr-only"
              />
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  productType === 'sellable' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <span className="text-white font-medium">Sellable</span>
              </div>
              <p className="text-slate-400 text-sm">Products you sell to customers</p>
            </label>

            {/* Packing Supply */}
            <label
              className={`flex flex-col p-4 rounded-lg cursor-pointer border-2 transition-colors ${
                productType === 'packing_supply'
                  ? 'border-amber-500 bg-amber-500/10'
                  : 'border-slate-700 hover:border-slate-600 bg-slate-900/50'
              }`}
            >
              <input
                type="radio"
                name="productType"
                value="packing_supply"
                checked={productType === 'packing_supply'}
                onChange={(e) => setProductType(e.target.value as ProductType)}
                className="sr-only"
              />
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  productType === 'packing_supply' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  <Package className="w-5 h-5" />
                </div>
                <span className="text-white font-medium">Packing Supply</span>
              </div>
              <p className="text-slate-400 text-sm">Stickers, thank you cards, tissue paper</p>
            </label>

            {/* Shipping Supply */}
            <label
              className={`flex flex-col p-4 rounded-lg cursor-pointer border-2 transition-colors ${
                productType === 'shipping_supply'
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-slate-700 hover:border-slate-600 bg-slate-900/50'
              }`}
            >
              <input
                type="radio"
                name="productType"
                value="shipping_supply"
                checked={productType === 'shipping_supply'}
                onChange={(e) => setProductType(e.target.value as ProductType)}
                className="sr-only"
              />
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  productType === 'shipping_supply' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  <Truck className="w-5 h-5" />
                </div>
                <span className="text-white font-medium">Shipping Supply</span>
              </div>
              <p className="text-slate-400 text-sm">Boxes, mailers, poly bags, tape</p>
            </label>
          </div>

          {/* Supply Type Selection (for shipping supplies) */}
          {productType === 'shipping_supply' && (
            <div className="space-y-4 pt-4 border-t border-slate-700">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Supply Type</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'box', label: 'Box', icon: 'fa-box' },
                    { value: 'mailer', label: 'Mailer/Envelope', icon: 'fa-envelope' },
                    { value: 'poly_bag', label: 'Poly Bag', icon: 'fa-shopping-bag' },
                    { value: 'tape', label: 'Tape', icon: 'fa-tape' },
                    { value: 'label', label: 'Labels', icon: 'fa-tag' },
                    { value: 'other', label: 'Other', icon: 'fa-ellipsis-h' },
                  ].map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setSupplyType(type.value as SupplyType)}
                      className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                        supplyType === type.value
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                          : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <i className={`fas ${type.icon}`}></i>
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Box-specific fields */}
              {supplyType === 'box' && (
                <div className="p-4 bg-slate-900/50 rounded-lg space-y-4">
                  <h4 className="text-white font-medium flex items-center gap-2">
                    <i className="fas fa-ruler-combined text-blue-400"></i>
                    Box Dimensions
                  </h4>
                  <p className="text-slate-400 text-sm">
                    This box will automatically appear in your shipping options.
                  </p>

                  {/* Inner Dimensions */}
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Inner Dimensions (usable space)</label>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Length</label>
                        <div className="flex">
                          <input
                            type="number"
                            value={boxDimensions.innerLength || ''}
                            onChange={(e) => setBoxDimensions({ ...boxDimensions, innerLength: parseFloat(e.target.value) || 0 })}
                            className="w-full bg-slate-800 border border-slate-600 rounded-l-lg px-3 py-2 text-white"
                            placeholder="0"
                            step="0.25"
                          />
                          <span className="bg-slate-700 border border-slate-600 border-l-0 rounded-r-lg px-2 py-2 text-slate-400 text-sm">in</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Width</label>
                        <div className="flex">
                          <input
                            type="number"
                            value={boxDimensions.innerWidth || ''}
                            onChange={(e) => setBoxDimensions({ ...boxDimensions, innerWidth: parseFloat(e.target.value) || 0 })}
                            className="w-full bg-slate-800 border border-slate-600 rounded-l-lg px-3 py-2 text-white"
                            placeholder="0"
                            step="0.25"
                          />
                          <span className="bg-slate-700 border border-slate-600 border-l-0 rounded-r-lg px-2 py-2 text-slate-400 text-sm">in</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Height</label>
                        <div className="flex">
                          <input
                            type="number"
                            value={boxDimensions.innerHeight || ''}
                            onChange={(e) => setBoxDimensions({ ...boxDimensions, innerHeight: parseFloat(e.target.value) || 0 })}
                            className="w-full bg-slate-800 border border-slate-600 rounded-l-lg px-3 py-2 text-white"
                            placeholder="0"
                            step="0.25"
                          />
                          <span className="bg-slate-700 border border-slate-600 border-l-0 rounded-r-lg px-2 py-2 text-slate-400 text-sm">in</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Outer Dimensions */}
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Outer Dimensions (for shipping rates)</label>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Length</label>
                        <div className="flex">
                          <input
                            type="number"
                            value={boxDimensions.outerLength || ''}
                            onChange={(e) => setBoxDimensions({ ...boxDimensions, outerLength: parseFloat(e.target.value) || 0 })}
                            className="w-full bg-slate-800 border border-slate-600 rounded-l-lg px-3 py-2 text-white"
                            placeholder="0"
                            step="0.25"
                          />
                          <span className="bg-slate-700 border border-slate-600 border-l-0 rounded-r-lg px-2 py-2 text-slate-400 text-sm">in</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Width</label>
                        <div className="flex">
                          <input
                            type="number"
                            value={boxDimensions.outerWidth || ''}
                            onChange={(e) => setBoxDimensions({ ...boxDimensions, outerWidth: parseFloat(e.target.value) || 0 })}
                            className="w-full bg-slate-800 border border-slate-600 rounded-l-lg px-3 py-2 text-white"
                            placeholder="0"
                            step="0.25"
                          />
                          <span className="bg-slate-700 border border-slate-600 border-l-0 rounded-r-lg px-2 py-2 text-slate-400 text-sm">in</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Height</label>
                        <div className="flex">
                          <input
                            type="number"
                            value={boxDimensions.outerHeight || ''}
                            onChange={(e) => setBoxDimensions({ ...boxDimensions, outerHeight: parseFloat(e.target.value) || 0 })}
                            className="w-full bg-slate-800 border border-slate-600 rounded-l-lg px-3 py-2 text-white"
                            placeholder="0"
                            step="0.25"
                          />
                          <span className="bg-slate-700 border border-slate-600 border-l-0 rounded-r-lg px-2 py-2 text-slate-400 text-sm">in</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Max Weight */}
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Maximum Weight Capacity</label>
                    <div className="flex max-w-xs">
                      <input
                        type="number"
                        value={maxWeight || ''}
                        onChange={(e) => setMaxWeight(parseFloat(e.target.value) || 0)}
                        className="w-full bg-slate-800 border border-slate-600 rounded-l-lg px-3 py-2 text-white"
                        placeholder="50"
                        step="1"
                      />
                      <span className="bg-slate-700 border border-slate-600 border-l-0 rounded-r-lg px-3 py-2 text-slate-400 text-sm">lbs</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Packing Supply Info */}
          {productType === 'packing_supply' && (
            <div className="pt-4 border-t border-slate-700">
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <i className="fas fa-info-circle text-amber-400 mt-0.5"></i>
                  <div className="text-sm">
                    <p className="text-amber-400 font-medium">Packing Supply</p>
                    <p className="text-slate-300 mt-1">
                      This item will be tracked as inventory and can be configured for automatic
                      deduction in fulfillment rules.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reorder Settings (for both supply types) */}
          {(productType === 'packing_supply' || productType === 'shipping_supply') && (
            <div className="mt-4 pt-4 border-t border-slate-700">
              <h4 className="text-white font-medium mb-3">Reorder Settings</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Reorder Point</label>
                  <input
                    type="number"
                    value={formData.reorderPoint}
                    onChange={e => handleChange('reorderPoint', e.target.value)}
                    placeholder="Alert when stock falls below..."
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white"
                  />
                  <p className="text-xs text-slate-500 mt-1">Get alerted when stock is low</p>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Reorder Quantity</label>
                  <input
                    type="number"
                    value={reorderQuantity || ''}
                    onChange={(e) => setReorderQuantity(parseInt(e.target.value) || 0)}
                    placeholder="Suggested quantity to reorder"
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white"
                  />
                  <p className="text-xs text-slate-500 mt-1">Suggested amount for PO</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pricing */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Pricing</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">
                Cost (COGS) <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.cost}
                  onChange={e => handleChange('cost', e.target.value)}
                  className={`w-full bg-slate-800 border ${errors.cost ? 'border-red-500' : 'border-slate-700'} rounded-lg pl-7 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50`}
                  placeholder="0.00"
                />
              </div>
              {errors.cost && <p className="text-red-400 text-xs mt-1">{errors.cost}</p>}
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">
                MSRP <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.priceMSRP}
                  onChange={e => handleChange('priceMSRP', e.target.value)}
                  className={`w-full bg-slate-800 border ${errors.priceMSRP ? 'border-red-500' : 'border-slate-700'} rounded-lg pl-7 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50`}
                  placeholder="0.00"
                />
              </div>
              {errors.priceMSRP && <p className="text-red-400 text-xs mt-1">{errors.priceMSRP}</p>}
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Shopify Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.priceShopify}
                  onChange={e => handleChange('priceShopify', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-7 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                  placeholder="Same as MSRP"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Amazon Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.priceAmazon}
                  onChange={e => handleChange('priceAmazon', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-7 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                  placeholder="Same as MSRP"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Wholesale Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.priceWholesale}
                  onChange={e => handleChange('priceWholesale', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-7 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                  placeholder="60% of MSRP"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Reorder Point</label>
              <input
                type="number"
                min="0"
                value={formData.reorderPoint}
                onChange={e => handleChange('reorderPoint', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                placeholder="50"
              />
            </div>
          </div>
        </div>

        {/* Physical Attributes */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Physical Attributes</h3>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">
                Weight (lbs) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.weight}
                onChange={e => handleChange('weight', e.target.value)}
                className={`w-full bg-slate-800 border ${errors.weight ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50`}
                placeholder="0.00"
              />
              {errors.weight && <p className="text-red-400 text-xs mt-1">{errors.weight}</p>}
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Length (in)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.length}
                onChange={e => handleChange('length', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Width (in)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.width}
                onChange={e => handleChange('width', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Height (in)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.height}
                onChange={e => handleChange('height', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Manufacturing Components (BOM) */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">
            Manufacturing Components (Bill of Materials)
          </h3>
          <p className="text-xs text-slate-400 mb-3">
            Add components required to manufacture this product (e.g., front label, back label, bottle)
          </p>

          {/* Search for components */}
          <div className="relative mb-3">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={componentSearch}
                  onChange={e => {
                    setComponentSearch(e.target.value);
                    setShowComponentDropdown(true);
                  }}
                  onFocus={() => setShowComponentDropdown(true)}
                  placeholder="Search products to add as components..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                />

                {/* Dropdown */}
                {showComponentDropdown && filteredComponentProducts.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-lg max-h-48 overflow-auto">
                    {filteredComponentProducts.map(product => {
                      const stock = getProductStock(product.id);
                      return (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => addComponent(product.id)}
                          className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-slate-700/50 text-left"
                        >
                          <div>
                            <div className="text-sm text-white">{product.name}</div>
                            <div className="text-xs text-slate-400">{product.sku}</div>
                          </div>
                          <div className="text-right">
                            <div className={`text-xs ${stock > 0 ? 'text-emerald-400' : 'text-slate-500'}`}>
                              {formatNumber(stock)} in stock
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Component List */}
          {components.length > 0 ? (
            <div className="space-y-2">
              {components.map(comp => {
                const product = state.products.find(p => p.id === comp.productId);
                const stock = getProductStock(comp.productId);

                return (
                  <div
                    key={comp.productId}
                    className="flex items-center gap-3 p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white truncate">{comp.productName}</div>
                      <div className="text-xs text-slate-400">
                        {product?.sku} - {formatNumber(stock)} available
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Qty:</span>
                      <input
                        type="number"
                        min="1"
                        value={comp.quantity}
                        onChange={e => updateComponentQty(comp.productId, parseInt(e.target.value) || 1)}
                        className="w-16 bg-slate-700 border border-slate-600 rounded-lg px-2 py-1.5 text-white text-center text-sm focus:outline-none focus:border-emerald-500/50"
                      />
                      <button
                        type="button"
                        onClick={() => removeComponent(comp.productId)}
                        className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-4 border-2 border-dashed border-slate-700 rounded-lg text-center">
              <Package className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-500">No components added</p>
              <p className="text-xs text-slate-600 mt-1">
                Search and add components to track BOM for manufacturing
              </p>
            </div>
          )}
        </div>

        {/* Serial Number Tracking */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Serial Number Tracking</h3>

          <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-white">Enable Serial Number Tracking</div>
                <div className="text-sm text-slate-400 mt-0.5">
                  Track individual units with unique serial numbers
                </div>
              </div>
              <Toggle
                checked={trackSerials}
                onChange={setTrackSerials}
              />
            </div>

            {trackSerials && (
              <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-4">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Hash className="w-4 h-4 text-emerald-400" />
                  Auto-Generate Serial Format
                </h4>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Prefix</label>
                    <input
                      type="text"
                      value={serialPrefix}
                      onChange={(e) => setSerialPrefix(e.target.value)}
                      placeholder="e.g., SN-"
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Next Number</label>
                    <input
                      type="number"
                      value={serialNextNumber}
                      onChange={(e) => setSerialNextNumber(parseInt(e.target.value) || 1)}
                      placeholder="1001"
                      min={1}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Suffix</label>
                    <input
                      type="text"
                      value={serialSuffix}
                      onChange={(e) => setSerialSuffix(e.target.value)}
                      placeholder="e.g., -2024"
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 font-mono"
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-sm text-slate-400">Preview: </span>
                  <span className="font-mono text-emerald-400">
                    {serialPrefix}{String(serialNextNumber).padStart(4, '0')}{serialSuffix}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lot/Batch Tracking */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Lot/Batch Tracking</h3>

          <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-white">Enable Lot/Batch Tracking</div>
                <div className="text-sm text-slate-400 mt-0.5">
                  Track inventory by lot numbers for FIFO/FEFO picking
                </div>
              </div>
              <Toggle
                checked={trackLots}
                onChange={setTrackLots}
              />
            </div>

            {trackLots && (
              <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-4">
                {/* Expiration Tracking Toggle */}
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-amber-400" />
                    <div>
                      <div className="font-medium text-white">Track Expiration Dates</div>
                      <div className="text-sm text-slate-400">Enable FEFO (First Expired, First Out) picking</div>
                    </div>
                  </div>
                  <Toggle
                    checked={expirationTracking}
                    onChange={setExpirationTracking}
                  />
                </div>

                {expirationTracking && (
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">
                      Warning Days Before Expiration
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={expirationWarningDays}
                        onChange={(e) => setExpirationWarningDays(parseInt(e.target.value) || 30)}
                        min={1}
                        className="w-24 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                      />
                      <span className="text-slate-400">days</span>
                    </div>
                  </div>
                )}

                <h4 className="font-medium text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-400" />
                  Auto-Generate Lot Number Format
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Lot Prefix</label>
                    <input
                      type="text"
                      value={lotPrefix}
                      onChange={(e) => setLotPrefix(e.target.value)}
                      placeholder="e.g., LOT-"
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Next Lot Number</label>
                    <input
                      type="number"
                      value={lotNextNumber}
                      onChange={(e) => setLotNextNumber(parseInt(e.target.value) || 1)}
                      placeholder="1"
                      min={1}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-sm text-slate-400">Preview: </span>
                  <span className="font-mono text-purple-400">
                    {lotPrefix || 'LOT-'}{new Date().toISOString().slice(0, 10).replace(/-/g, '')}-{String(lotNextNumber).padStart(3, '0')}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AddProductModal;
