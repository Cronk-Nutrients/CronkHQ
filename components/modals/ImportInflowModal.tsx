'use client';

import { useState, useCallback, useRef } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useLocations, useSuppliers, useProducts, useInventory } from '@/hooks/useFirestore';
import { Product, Supplier, InventoryItem } from '@/types';
import { useToast } from '@/components/ui/Toast';

interface ImportInflowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ParsedRow {
  [key: string]: string;
}

// inFlow column name mappings to our fields
const INFLOW_MAPPINGS: Record<string, string> = {
  // Product fields
  'name': 'name',
  'item name': 'name',
  'product name': 'name',
  'barcode': 'barcode',
  'upc': 'barcode',
  'sku': 'sku',
  'item #': 'sku',
  'item number': 'sku',
  'category': 'category',
  'type': 'category',
  'description': 'description',

  // Pricing
  'sale price': 'salePrice',
  'selling price': 'salePrice',
  'price': 'salePrice',
  'purchase cost': 'cost',
  'cost': 'cost',
  'unit cost': 'cost',
  'cogs': 'cost',

  // Inventory
  'quantity on hand': 'quantity',
  'qty on hand': 'quantity',
  'quantity': 'quantity',
  'qty': 'quantity',
  'stock': 'quantity',
  'available': 'quantity',
  'location': 'location',
  'warehouse': 'location',
  'bin': 'binLocation',
  'bin location': 'binLocation',
  'reorder point': 'reorderPoint',
  'reorder level': 'reorderPoint',
  'minimum stock': 'reorderPoint',

  // Supplier/Vendor
  'vendor': 'vendor',
  'vendor name': 'vendor',
  'supplier': 'vendor',
  'supplier name': 'vendor',
  'default vendor': 'vendor',
  'vendor sku': 'vendorSku',
  'supplier sku': 'vendorSku',
  'vendor part #': 'vendorSku',
  'manufacturer': 'manufacturer',
  'manufacturer sku': 'manufacturerSku',

  // Other
  'weight': 'weight',
  'weight (lbs)': 'weight',
  'weight (oz)': 'weight',
  'item weight': 'weight',
  'notes': 'notes',
};

interface ParsedProduct {
  name: string;
  sku: string;
  barcode?: string;
  category?: string;
  description?: string;
  salePrice?: number;
  cost?: number;
  quantity?: number;
  location?: string;
  binLocation?: string;
  reorderPoint?: number;
  vendor?: string;
  vendorSku?: string;
  weight?: number;
  notes?: string;
}

export function ImportInflowModal({ isOpen, onClose }: ImportInflowModalProps) {
  const { locations } = useLocations();
  const { suppliers: existingSuppliers, service: supplierService, isDemo } = useSuppliers();
  const { products: existingProducts, service: productService } = useProducts();
  const { service: inventoryService } = useInventory();
  const { success, error, warning } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<'upload' | 'preview' | 'importing'>('upload');
  const [fileName, setFileName] = useState('');
  const [parsedProducts, setParsedProducts] = useState<ParsedProduct[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string>('');
  const [createInventoryRecords, setCreateInventoryRecords] = useState(true);
  const [createVendors, setCreateVendors] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [importProgress, setImportProgress] = useState(0);

  // Set default location when locations load
  const defaultLocation = locations.find(l => l.type === 'warehouse') || locations[0];
  if (!selectedLocationId && defaultLocation) {
    setSelectedLocationId(defaultLocation.id);
  }

  const resetState = () => {
    setStep('upload');
    setFileName('');
    setParsedProducts([]);
    const defaultLoc = locations.find(l => l.type === 'warehouse') || locations[0];
    setSelectedLocationId(defaultLoc?.id || '');
    setCreateInventoryRecords(true);
    setCreateVendors(true);
    setImportProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const parseCSV = (text: string): ParsedRow[] => {
    const lines = text.split(/\r?\n/).filter(line => line.trim());
    if (lines.length === 0) return [];

    // Parse headers
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, '').toLowerCase());

    // Parse data rows
    const data: ParsedRow[] = [];
    for (let i = 1; i < lines.length; i++) {
      // Handle quoted fields with commas inside
      const row: string[] = [];
      let current = '';
      let inQuotes = false;

      for (const char of lines[i]) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          row.push(current.trim().replace(/^"|"$/g, ''));
          current = '';
        } else {
          current += char;
        }
      }
      row.push(current.trim().replace(/^"|"$/g, ''));

      const rowObj: ParsedRow = {};
      headers.forEach((header, index) => {
        rowObj[header] = row[index] || '';
      });
      data.push(rowObj);
    }

    return data;
  };

  const mapInflowRow = (row: ParsedRow): ParsedProduct | null => {
    // Find values using inFlow mappings
    const getValue = (field: string): string => {
      for (const [inflowCol, mappedField] of Object.entries(INFLOW_MAPPINGS)) {
        if (mappedField === field && row[inflowCol]) {
          return row[inflowCol];
        }
      }
      return '';
    };

    const name = getValue('name');
    let sku = getValue('sku');

    // If no SKU, generate one from name or barcode
    if (!sku && name) {
      const barcode = getValue('barcode');
      sku = barcode || name.substring(0, 20).replace(/\s+/g, '-').toUpperCase();
    }

    if (!name) return null;

    return {
      name,
      sku,
      barcode: getValue('barcode') || undefined,
      category: getValue('category') || 'supply',
      description: getValue('description') || undefined,
      salePrice: parseFloat(getValue('salePrice')) || undefined,
      cost: parseFloat(getValue('cost')) || undefined,
      quantity: parseInt(getValue('quantity')) || 0,
      location: getValue('location') || undefined,
      binLocation: getValue('binLocation') || undefined,
      reorderPoint: parseInt(getValue('reorderPoint')) || undefined,
      vendor: getValue('vendor') || undefined,
      vendorSku: getValue('vendorSku') || undefined,
      weight: parseFloat(getValue('weight')) || undefined,
      notes: getValue('notes') || undefined,
    };
  };

  const handleFileSelect = (file: File) => {
    if (!file.name.endsWith('.csv')) {
      error('Please select a CSV file');
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const rows = parseCSV(text);

      if (rows.length === 0) {
        error('Could not parse CSV file or file is empty');
        return;
      }

      // Map inFlow format to our product format
      const products = rows
        .map(row => mapInflowRow(row))
        .filter((p): p is ParsedProduct => p !== null);

      if (products.length === 0) {
        error('No valid products found. Make sure your CSV has Name and SKU columns.');
        return;
      }

      setParsedProducts(products);
      setStep('preview');
    };
    reader.readAsText(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleImport = async () => {
    if (!productService) return;

    if (isDemo) {
      error('Import is not available in demo mode');
      return;
    }

    setStep('importing');
    setImportProgress(0);

    try {
      const existingSkus = new Set(existingProducts.map(p => p.sku.toLowerCase()));
      const supplierMap = new Map(existingSuppliers.map(s => [s.name.toLowerCase(), s]));
      const newVendorIds = new Map<string, string>();

      let imported = 0;
      let skipped = 0;
      let inventoryCreated = 0;
      let vendorsCreated = 0;

      // Prepare batch data
      const productsToCreate: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>[] = [];
      const suppliersToCreate: Omit<Supplier, 'id'>[] = [];
      const productInventoryMap: { productIndex: number; quantity: number; binLocation?: string }[] = [];

      const totalProducts = parsedProducts.length;

      for (let i = 0; i < parsedProducts.length; i++) {
        const product = parsedProducts[i];
        setImportProgress(Math.round(((i + 1) / totalProducts) * 50)); // First half for processing

        // Skip if SKU already exists
        if (existingSkus.has(product.sku.toLowerCase())) {
          skipped++;
          continue;
        }

        // Map category to valid type
        const categoryRaw = (product.category || 'supply').toLowerCase();
        let category: 'nutrient' | 'supply' | 'packaging' | 'label' = 'supply';
        if (categoryRaw.includes('nutrient') || categoryRaw.includes('supplement')) {
          category = 'nutrient';
        } else if (categoryRaw.includes('packaging') || categoryRaw.includes('box') || categoryRaw.includes('bottle')) {
          category = 'packaging';
        } else if (categoryRaw.includes('label')) {
          category = 'label';
        }

        const msrp = product.salePrice || 0;

        const newProduct: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
          name: product.name,
          sku: product.sku.toUpperCase(),
          barcode: product.barcode,
          category,
          weight: product.weight,
          prices: {
            msrp,
            shopify: msrp,
            amazon: msrp,
            wholesale: msrp * 0.6,
            distributor: msrp * 0.45,
          },
          costs: {
            base: product.cost || 0,
            amazonPrep: 0,
            shopify: 0,
          },
          reorderPoint: product.reorderPoint || 50,
          isActive: true,
        };

        productsToCreate.push(newProduct);
        existingSkus.add(product.sku.toLowerCase());
        imported++;

        // Track inventory record
        if (createInventoryRecords && selectedLocationId && product.quantity !== undefined) {
          productInventoryMap.push({
            productIndex: productsToCreate.length - 1,
            quantity: product.quantity,
            binLocation: product.binLocation,
          });
          inventoryCreated++;
        }

        // Handle vendor/supplier
        if (createVendors && product.vendor && supplierService) {
          const existingVendor = supplierMap.get(product.vendor.toLowerCase());

          if (!existingVendor && !newVendorIds.has(product.vendor.toLowerCase())) {
            suppliersToCreate.push({
              name: product.vendor,
              currency: 'USD',
            });
            newVendorIds.set(product.vendor.toLowerCase(), `pending-${suppliersToCreate.length - 1}`);
            vendorsCreated++;
          }
        }
      }

      setImportProgress(60);

      // Batch create suppliers first
      if (suppliersToCreate.length > 0 && supplierService) {
        await supplierService.batchCreate(suppliersToCreate);
      }

      setImportProgress(70);

      // Batch create products
      const productIds = await productService.batchCreate(productsToCreate);

      setImportProgress(85);

      // Create inventory records with actual product IDs
      if (productInventoryMap.length > 0 && inventoryService) {
        const inventoryToCreate: Omit<InventoryItem, 'id'>[] = [];
        for (const item of productInventoryMap) {
          const productId = productIds[item.productIndex];
          inventoryToCreate.push({
            productId,
            locationId: selectedLocationId,
            quantity: item.quantity,
            binLocation: item.binLocation || '',
          });
        }
        await inventoryService.batchCreate(inventoryToCreate);
      }

      setImportProgress(100);

      // Build success message
      const messages: string[] = [];
      if (imported > 0) messages.push(`${imported} products`);
      if (inventoryCreated > 0) messages.push(`${inventoryCreated} inventory records`);
      if (vendorsCreated > 0) messages.push(`${vendorsCreated} new vendors`);

      if (messages.length > 0) {
        success(`Successfully imported ${messages.join(', ')}`);
      }
      if (skipped > 0) {
        warning(`Skipped ${skipped} products (duplicate SKUs)`);
      }

      resetState();
      onClose();
    } catch (err) {
      console.error('Import error:', err);
      error('Failed to import products');
      setStep('preview');
    }
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const renderUploadStep = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <i className="fas fa-exchange-alt text-blue-400 text-xl"></i>
          </div>
          <div>
            <h3 className="text-white font-semibold">inFlow Import Tool</h3>
            <p className="text-sm text-slate-400">
              Directly import product data exported from inFlow Inventory
            </p>
          </div>
        </div>
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-slate-700 hover:border-slate-600'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileInputChange}
          className="hidden"
        />
        <i className="fas fa-file-csv text-4xl text-slate-500 mb-4"></i>
        <p className="text-white font-medium mb-1">
          Drop your inFlow CSV export here
        </p>
        <p className="text-sm text-slate-400">
          or click to browse
        </p>
      </div>

      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-white mb-2">How to Export from inFlow</h4>
        <ol className="text-sm text-slate-400 space-y-1 list-decimal list-inside">
          <li>In inFlow, go to <span className="text-slate-300">Main Menu → Products</span></li>
          <li>Click <span className="text-slate-300">Export</span> button</li>
          <li>Choose <span className="text-slate-300">CSV format</span></li>
          <li>Include: Name, Barcode, Category, Price, Cost, Quantity, Vendor</li>
        </ol>
      </div>

      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-white mb-2">Supported inFlow Columns</h4>
        <div className="flex flex-wrap gap-1.5">
          {['Name', 'Barcode', 'Category', 'Sale Price', 'Purchase Cost', 'Quantity on Hand', 'Location', 'Vendor', 'Vendor SKU', 'Reorder Point'].map(col => (
            <span key={col} className="px-2 py-0.5 bg-slate-700 text-slate-300 text-xs rounded">
              {col}
            </span>
          ))}
        </div>
      </div>

      {isDemo && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
          <div className="flex items-center gap-2 text-amber-400 text-sm">
            <i className="fas fa-info-circle"></i>
            <span>Import is disabled in demo mode. Sign in to import products.</span>
          </div>
        </div>
      )}
    </div>
  );

  const renderPreviewStep = () => {
    const existingSkus = new Set(existingProducts.map(p => p.sku.toLowerCase()));
    const duplicates = parsedProducts.filter(p => existingSkus.has(p.sku.toLowerCase()));
    const newProducts = parsedProducts.filter(p => !existingSkus.has(p.sku.toLowerCase()));
    const withInventory = parsedProducts.filter(p => p.quantity && p.quantity > 0);
    const withVendors = parsedProducts.filter(p => p.vendor);

    return (
      <div className="space-y-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-emerald-400">{newProducts.length}</div>
            <div className="text-xs text-slate-400">New Products</div>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-amber-400">{duplicates.length}</div>
            <div className="text-xs text-slate-400">Duplicates</div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-400">{withInventory.length}</div>
            <div className="text-xs text-slate-400">With Stock</div>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-purple-400">{withVendors.length}</div>
            <div className="text-xs text-slate-400">With Vendors</div>
          </div>
        </div>

        {/* Preview Table */}
        <div className="border border-slate-700 rounded-lg overflow-hidden">
          <div className="max-h-48 overflow-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-800 sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left text-slate-400 font-medium">SKU</th>
                  <th className="px-3 py-2 text-left text-slate-400 font-medium">Name</th>
                  <th className="px-3 py-2 text-right text-slate-400 font-medium">Qty</th>
                  <th className="px-3 py-2 text-right text-slate-400 font-medium">Cost</th>
                  <th className="px-3 py-2 text-left text-slate-400 font-medium">Vendor</th>
                  <th className="px-3 py-2 text-center text-slate-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {parsedProducts.slice(0, 50).map((product, index) => {
                  const isDuplicate = existingSkus.has(product.sku.toLowerCase());
                  return (
                    <tr key={index} className={`${isDuplicate ? 'bg-amber-500/5' : 'bg-slate-800/30'}`}>
                      <td className="px-3 py-2 text-white font-mono text-xs">{product.sku}</td>
                      <td className="px-3 py-2 text-white truncate max-w-[200px]">{product.name}</td>
                      <td className="px-3 py-2 text-right text-slate-300">{product.quantity || '-'}</td>
                      <td className="px-3 py-2 text-right text-slate-300">
                        {product.cost ? `$${product.cost.toFixed(2)}` : '-'}
                      </td>
                      <td className="px-3 py-2 text-slate-300 truncate max-w-[120px]">
                        {product.vendor || '-'}
                      </td>
                      <td className="px-3 py-2 text-center">
                        {isDuplicate ? (
                          <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded">
                            Skip
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded">
                            Import
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {parsedProducts.length > 50 && (
            <div className="px-3 py-2 bg-slate-800/50 text-center text-sm text-slate-400">
              ... and {parsedProducts.length - 50} more products
            </div>
          )}
        </div>

        {/* Import Options */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4">
          <h5 className="text-sm font-medium text-white mb-3">Import Settings</h5>

          <div className="space-y-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Import Inventory To</label>
              <select
                value={selectedLocationId}
                onChange={e => setSelectedLocationId(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
              >
                <option value="">-- Don't import inventory --</option>
                {locations.map(loc => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} ({loc.type})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={createInventoryRecords}
                  onChange={e => setCreateInventoryRecords(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-emerald-500"
                />
                <span className="text-sm text-slate-300">Create inventory records</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={createVendors}
                  onChange={e => setCreateVendors(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-emerald-500"
                />
                <span className="text-sm text-slate-300">Auto-create vendors</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderImportingStep = () => (
    <div className="py-8 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
        <i className="fas fa-spinner fa-spin text-emerald-400 text-2xl"></i>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">Importing Products...</h3>
      <p className="text-slate-400 mb-4">Please wait while we import your data</p>
      <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-300"
          style={{ width: `${importProgress}%` }}
        />
      </div>
      <p className="text-sm text-slate-500 mt-2">{importProgress}% complete</p>
    </div>
  );

  const newProductCount = parsedProducts.filter(
    p => !existingProducts.some(ep => ep.sku.toLowerCase() === p.sku.toLowerCase())
  ).length;

  return (
    <Modal
      open={isOpen}
      onClose={step === 'importing' ? () => {} : handleClose}
      title="Import from inFlow"
      subtitle="Import products, inventory, and vendors from inFlow Inventory"
      size="lg"
      footer={
        step === 'preview' ? (
          <>
            <Button variant="secondary" onClick={() => setStep('upload')}>
              <i className="fas fa-arrow-left mr-2"></i>
              Back
            </Button>
            <Button onClick={handleImport} disabled={isDemo || newProductCount === 0}>
              <i className="fas fa-file-import mr-2"></i>
              Import {newProductCount} Products
            </Button>
          </>
        ) : step === 'upload' ? (
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        ) : undefined
      }
    >
      {step === 'upload' && renderUploadStep()}
      {step === 'preview' && renderPreviewStep()}
      {step === 'importing' && renderImportingStep()}
    </Modal>
  );
}

export default ImportInflowModal;
