'use client';

import { useState, useCallback, useRef } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useLocations, useSuppliers, useProducts, useInventory } from '@/hooks/useFirestore';
import { Product, Supplier, InventoryItem } from '@/types';
import { useToast } from '@/components/ui/Toast';

interface ImportCSVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ParsedRow {
  [key: string]: string;
}

interface ColumnMapping {
  name: string;
  sku: string;
  category: string;
  cost: string;
  priceMSRP: string;
  priceShopify?: string;
  priceAmazon?: string;
  priceWholesale?: string;
  weight?: string;
  barcode?: string;
  quantity?: string;
  binLocation?: string;
  reorderPoint?: string;
  supplierSku?: string;
  supplierName?: string;
  leadTime?: string;
  minOrderQty?: string;
}

const REQUIRED_FIELDS = ['name', 'sku'];
const FIELD_LABELS: Record<string, string> = {
  name: 'Product Name',
  sku: 'SKU',
  category: 'Category',
  cost: 'Cost',
  priceMSRP: 'MSRP',
  priceShopify: 'Shopify Price',
  priceAmazon: 'Amazon Price',
  priceWholesale: 'Wholesale Price',
  weight: 'Weight (oz)',
  barcode: 'Barcode/UPC',
  quantity: 'Quantity on Hand',
  binLocation: 'Bin Location',
  reorderPoint: 'Reorder Point',
  supplierSku: 'Supplier SKU',
  supplierName: 'Supplier Name',
  leadTime: 'Lead Time (days)',
  minOrderQty: 'Min Order Qty',
};

const FIELD_GROUPS = {
  basic: ['name', 'sku', 'category', 'barcode'],
  pricing: ['cost', 'priceMSRP', 'priceShopify', 'priceAmazon', 'priceWholesale'],
  inventory: ['quantity', 'binLocation', 'reorderPoint', 'weight'],
  supplier: ['supplierName', 'supplierSku', 'leadTime', 'minOrderQty'],
};

export function ImportCSVModal({ isOpen, onClose }: ImportCSVModalProps) {
  const { locations } = useLocations();
  const { suppliers: existingSuppliers, service: supplierService, isDemo } = useSuppliers();
  const { products: existingProducts, service: productService } = useProducts();
  const { service: inventoryService } = useInventory();
  const { success, error, warning } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<'upload' | 'mapping' | 'preview'>('upload');
  const [fileName, setFileName] = useState('');
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [csvData, setCsvData] = useState<ParsedRow[]>([]);
  const [columnMapping, setColumnMapping] = useState<Partial<ColumnMapping>>({});
  const [isImporting, setIsImporting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<string>('');
  const [createInventoryRecords, setCreateInventoryRecords] = useState(true);
  const [createSuppliers, setCreateSuppliers] = useState(true);

  // Set default location when locations load
  const defaultLocation = locations.find(l => l.type === 'warehouse') || locations[0];
  if (!selectedLocationId && defaultLocation) {
    setSelectedLocationId(defaultLocation.id);
  }

  const downloadTemplate = (type: 'basic' | 'full' | 'inflow') => {
    let headers: string[] = [];
    let sampleData: string[][] = [];

    if (type === 'basic') {
      headers = ['Product Name', 'SKU', 'Category', 'Cost', 'MSRP', 'Quantity'];
      sampleData = [
        ['Example Product 1', 'SKU-001', 'nutrient', '10.00', '24.99', '100'],
        ['Example Product 2', 'SKU-002', 'supply', '15.00', '34.99', '50'],
      ];
    } else if (type === 'full') {
      headers = [
        'Product Name', 'SKU', 'Category', 'Barcode',
        'Cost', 'MSRP', 'Shopify Price', 'Amazon Price', 'Wholesale Price',
        'Quantity', 'Bin Location', 'Reorder Point', 'Weight (oz)',
        'Supplier Name', 'Supplier SKU', 'Lead Time (days)', 'Min Order Qty'
      ];
      sampleData = [
        ['Example Product 1', 'SKU-001', 'nutrient', '123456789012',
         '10.00', '24.99', '22.99', '24.99', '14.99',
         '100', 'A1-01', '25', '32',
         'Supplier Inc', 'SUP-001', '14', '50'],
        ['Example Product 2', 'SKU-002', 'supply', '234567890123',
         '15.00', '34.99', '32.99', '34.99', '20.99',
         '50', 'B2-03', '20', '16',
         'Vendor Co', 'VND-002', '7', '25'],
      ];
    } else if (type === 'inflow') {
      headers = [
        'Name', 'Barcode', 'Category', 'Description',
        'Sale Price', 'Purchase Cost', 'Quantity on Hand',
        'Location', 'Reorder Point', 'Vendor', 'Vendor SKU'
      ];
      sampleData = [
        ['Product Name Here', '123456789012', 'nutrient', 'Description text',
         '24.99', '10.00', '100',
         'Main Warehouse', '25', 'Supplier Name', 'VENDOR-SKU-001'],
      ];
    }

    const csvContent = [
      headers.join(','),
      ...sampleData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `cronk-wms-import-template-${type}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetState = () => {
    setStep('upload');
    setFileName('');
    setCsvHeaders([]);
    setCsvData([]);
    setColumnMapping({});
    setIsImporting(false);
    const defaultLoc = locations.find(l => l.type === 'warehouse') || locations[0];
    setSelectedLocationId(defaultLoc?.id || '');
    setCreateInventoryRecords(true);
    setCreateSuppliers(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const parseCSV = (text: string): { headers: string[]; data: ParsedRow[] } => {
    const lines = text.split(/\r?\n/).filter(line => line.trim());
    if (lines.length === 0) return { headers: [], data: [] };

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));

    const data: ParsedRow[] = [];
    for (let i = 1; i < lines.length; i++) {
      const values: string[] = [];
      let current = '';
      let inQuotes = false;

      for (const char of lines[i]) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim().replace(/^"|"$/g, ''));
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim().replace(/^"|"$/g, ''));

      const row: ParsedRow = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      data.push(row);
    }

    return { headers, data };
  };

  const autoMapColumns = (headers: string[]) => {
    const mapping: Partial<ColumnMapping> = {};
    const lowerHeaders = headers.map(h => h.toLowerCase());

    const mappings: Record<keyof ColumnMapping, string[]> = {
      name: ['name', 'product name', 'product', 'title', 'item name', 'description'],
      sku: ['sku', 'product sku', 'item number', 'item #', 'item code', 'product code'],
      category: ['category', 'type', 'product type', 'group', 'product category'],
      cost: ['cost', 'cogs', 'unit cost', 'price cost', 'purchase price', 'buy price', 'purchase cost'],
      priceMSRP: ['msrp', 'price', 'retail price', 'price msrp', 'sell price', 'sale price'],
      priceShopify: ['shopify price', 'shopify', 'web price', 'online price'],
      priceAmazon: ['amazon price', 'amazon', 'marketplace price'],
      priceWholesale: ['wholesale', 'wholesale price', 'dealer price', 'trade price'],
      weight: ['weight', 'weight (oz)', 'oz', 'weight oz', 'item weight', 'weight (lbs)', 'lbs'],
      barcode: ['barcode', 'upc', 'ean', 'gtin', 'isbn'],
      quantity: ['quantity', 'qty', 'stock', 'on hand', 'quantity on hand', 'stock qty', 'available', 'inventory'],
      binLocation: ['bin', 'bin location', 'location', 'shelf', 'rack', 'position', 'warehouse location'],
      reorderPoint: ['reorder point', 'reorder', 'min qty', 'minimum', 'low stock', 'reorder level'],
      supplierName: ['supplier', 'vendor', 'supplier name', 'vendor name', 'manufacturer'],
      supplierSku: ['supplier sku', 'vendor sku', 'manufacturer sku', 'vendor code', 'supplier code', 'mfg part #'],
      leadTime: ['lead time', 'leadtime', 'lead time days', 'delivery time'],
      minOrderQty: ['min order', 'moq', 'minimum order', 'min order qty'],
    };

    Object.entries(mappings).forEach(([field, possibleNames]) => {
      const matchIndex = lowerHeaders.findIndex(h =>
        possibleNames.some(name => h.includes(name))
      );
      if (matchIndex !== -1) {
        mapping[field as keyof ColumnMapping] = headers[matchIndex];
      }
    });

    return mapping;
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
      const { headers, data } = parseCSV(text);

      if (headers.length === 0) {
        error('Could not parse CSV file');
        return;
      }

      setCsvHeaders(headers);
      setCsvData(data);
      setColumnMapping(autoMapColumns(headers));
      setStep('mapping');
    };
    reader.readAsText(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
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
    if (file) {
      handleFileSelect(file);
    }
  };

  const isValidMapping = () => {
    return REQUIRED_FIELDS.every(field => columnMapping[field as keyof ColumnMapping]);
  };

  const getPreviewData = () => {
    return csvData.slice(0, 5).map(row => {
      const mapped: Record<string, string> = {};
      Object.entries(columnMapping).forEach(([field, column]) => {
        if (column) {
          mapped[field] = row[column] || '';
        }
      });
      return mapped;
    });
  };

  const getValidationIssues = () => {
    const issues: string[] = [];
    const existingSkus = new Set(existingProducts.map(p => p.sku.toLowerCase()));
    const newSkus = new Set<string>();

    csvData.forEach((row, index) => {
      const sku = columnMapping.sku ? row[columnMapping.sku] : '';
      const name = columnMapping.name ? row[columnMapping.name] : '';

      if (!sku) {
        issues.push(`Row ${index + 2}: Missing SKU`);
      } else if (existingSkus.has(sku.toLowerCase())) {
        issues.push(`Row ${index + 2}: SKU "${sku}" already exists`);
      } else if (newSkus.has(sku.toLowerCase())) {
        issues.push(`Row ${index + 2}: Duplicate SKU "${sku}" in file`);
      } else {
        newSkus.add(sku.toLowerCase());
      }

      if (!name) {
        issues.push(`Row ${index + 2}: Missing product name`);
      }
    });

    return issues.slice(0, 10);
  };

  const handleImport = async () => {
    if (!isValidMapping() || !productService) return;

    if (isDemo) {
      error('Import is not available in demo mode');
      return;
    }

    setIsImporting(true);

    try {
      const existingSkus = new Set(existingProducts.map(p => p.sku.toLowerCase()));
      const supplierMap = new Map(existingSuppliers.map(s => [s.name.toLowerCase(), s]));

      let imported = 0;
      let skipped = 0;
      let inventoryCreated = 0;
      let suppliersCreated = 0;
      const newSupplierIds = new Map<string, string>();

      // Prepare batch data
      const productsToCreate: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>[] = [];
      const inventoryToCreate: Omit<InventoryItem, 'id'>[] = [];
      const suppliersToCreate: Omit<Supplier, 'id'>[] = [];
      const productInventoryMap: { productIndex: number; quantity: number; binLocation?: string }[] = [];

      for (const row of csvData) {
        const sku = columnMapping.sku ? row[columnMapping.sku] : '';
        const name = columnMapping.name ? row[columnMapping.name] : '';

        if (!sku || !name || existingSkus.has(sku.toLowerCase())) {
          skipped++;
          continue;
        }

        const msrp = parseFloat(columnMapping.priceMSRP ? row[columnMapping.priceMSRP] : '0') || 0;
        const shopifyPrice = parseFloat(columnMapping.priceShopify ? row[columnMapping.priceShopify] : '0') || msrp;
        const amazonPrice = parseFloat(columnMapping.priceAmazon ? row[columnMapping.priceAmazon] : '0') || msrp;
        const wholesalePrice = parseFloat(columnMapping.priceWholesale ? row[columnMapping.priceWholesale] : '0') || msrp * 0.6;
        const distributorPrice = wholesalePrice * 0.75;
        const costValue = parseFloat(columnMapping.cost ? row[columnMapping.cost] : '0') || 0;
        const weightValue = parseFloat(columnMapping.weight ? row[columnMapping.weight] : '0') || 0;
        const reorderPoint = parseInt(columnMapping.reorderPoint ? row[columnMapping.reorderPoint] : '50') || 50;
        const quantity = parseInt(columnMapping.quantity ? row[columnMapping.quantity] : '0') || 0;
        const binLocation = columnMapping.binLocation ? row[columnMapping.binLocation]?.trim() : undefined;
        const supplierName = columnMapping.supplierName ? row[columnMapping.supplierName]?.trim() : '';
        const categoryRaw = columnMapping.category ? row[columnMapping.category]?.trim().toLowerCase() : 'supply';

        // Map category to valid type
        let category: 'nutrient' | 'supply' | 'packaging' | 'label' = 'supply';
        if (categoryRaw.includes('nutrient') || categoryRaw.includes('supplement')) {
          category = 'nutrient';
        } else if (categoryRaw.includes('packaging') || categoryRaw.includes('box') || categoryRaw.includes('bottle')) {
          category = 'packaging';
        } else if (categoryRaw.includes('label')) {
          category = 'label';
        }

        const newProduct: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
          name: name.trim(),
          sku: sku.trim().toUpperCase(),
          barcode: columnMapping.barcode ? row[columnMapping.barcode]?.trim() : undefined,
          category,
          weight: weightValue,
          prices: {
            msrp,
            shopify: shopifyPrice,
            amazon: amazonPrice,
            wholesale: wholesalePrice,
            distributor: distributorPrice,
          },
          costs: {
            base: costValue,
            amazonPrep: 0,
            shopify: 0,
          },
          reorderPoint,
          isActive: true,
        };

        productsToCreate.push(newProduct);
        existingSkus.add(sku.toLowerCase());
        imported++;

        // Track inventory for this product
        if (createInventoryRecords && selectedLocationId && (quantity > 0 || binLocation)) {
          productInventoryMap.push({
            productIndex: productsToCreate.length - 1,
            quantity,
            binLocation,
          });
          inventoryCreated++;
        }

        // Handle supplier
        if (createSuppliers && supplierName && supplierService) {
          const existingSupplier = supplierMap.get(supplierName.toLowerCase());

          if (!existingSupplier && !newSupplierIds.has(supplierName.toLowerCase())) {
            suppliersToCreate.push({
              name: supplierName,
              currency: 'USD',
            });
            newSupplierIds.set(supplierName.toLowerCase(), `pending-${suppliersToCreate.length - 1}`);
            suppliersCreated++;
          }
        }
      }

      // Batch create suppliers first
      if (suppliersToCreate.length > 0 && supplierService) {
        await supplierService.batchCreate(suppliersToCreate);
      }

      // Batch create products
      const productIds = await productService.batchCreate(productsToCreate);

      // Create inventory records with actual product IDs
      if (productInventoryMap.length > 0 && inventoryService) {
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

      // Build success message
      const messages: string[] = [];
      if (imported > 0) messages.push(`${imported} products`);
      if (inventoryCreated > 0) messages.push(`${inventoryCreated} inventory records`);
      if (suppliersCreated > 0) messages.push(`${suppliersCreated} new suppliers`);

      if (messages.length > 0) {
        success(`Successfully imported ${messages.join(', ')}`);
      }
      if (skipped > 0) {
        warning(`Skipped ${skipped} rows (missing data or duplicate SKUs)`);
      }

      resetState();
      onClose();
    } catch (err) {
      console.error('Import error:', err);
      error('Failed to import products');
    } finally {
      setIsImporting(false);
    }
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const renderUploadStep = () => (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-emerald-500 bg-emerald-500/10'
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
        <i className="fas fa-cloud-upload-alt text-4xl text-slate-500 mb-4"></i>
        <p className="text-white font-medium mb-1">
          Drag & drop CSV file here
        </p>
        <p className="text-sm text-slate-400">
          or click to browse
        </p>
      </div>

      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-white mb-2">CSV Format Requirements</h4>
        <ul className="text-sm text-slate-400 space-y-1">
          <li><i className="fas fa-check text-emerald-400 mr-2"></i>First row must contain column headers</li>
          <li><i className="fas fa-check text-emerald-400 mr-2"></i>Required columns: <span className="text-white">Name, SKU</span></li>
          <li><i className="fas fa-check text-emerald-400 mr-2"></i>Pricing: Cost, MSRP, Shopify Price, Amazon Price, Wholesale</li>
          <li><i className="fas fa-check text-emerald-400 mr-2"></i>Inventory: Quantity, Bin Location, Reorder Point, Weight</li>
          <li><i className="fas fa-check text-emerald-400 mr-2"></i>Supplier: Supplier Name, Supplier SKU, Lead Time, Min Order Qty</li>
        </ul>
      </div>

      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-white mb-2">Download Templates</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => downloadTemplate('basic')}
            className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded-lg transition-colors"
          >
            <i className="fas fa-download mr-1.5"></i>
            Basic Template
          </button>
          <button
            onClick={() => downloadTemplate('full')}
            className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded-lg transition-colors"
          >
            <i className="fas fa-download mr-1.5"></i>
            Full Template
          </button>
          <button
            onClick={() => downloadTemplate('inflow')}
            className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded-lg transition-colors"
          >
            <i className="fas fa-download mr-1.5"></i>
            inFlow Format
          </button>
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

  const renderFieldGroup = (groupName: string, fields: string[], icon: string, color: string) => (
    <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4">
      <h5 className={`text-sm font-medium ${color} mb-3 flex items-center gap-2`}>
        <i className={`fas ${icon}`}></i>
        {groupName}
      </h5>
      <div className="grid grid-cols-2 gap-3">
        {fields.map(field => (
          <div key={field}>
            <label className="block text-xs text-slate-400 mb-1">
              {FIELD_LABELS[field]}
              {REQUIRED_FIELDS.includes(field) && (
                <span className="text-red-400 ml-1">*</span>
              )}
            </label>
            <select
              value={columnMapping[field as keyof ColumnMapping] || ''}
              onChange={e =>
                setColumnMapping(prev => ({ ...prev, [field]: e.target.value }))
              }
              className={`w-full bg-slate-800 border ${
                REQUIRED_FIELDS.includes(field) && !columnMapping[field as keyof ColumnMapping]
                  ? 'border-amber-500/50'
                  : 'border-slate-700'
              } rounded-lg px-2 py-1.5 text-white text-sm focus:outline-none focus:border-emerald-500/50`}
            >
              <option value="">-- Select --</option>
              {csvHeaders.map(header => (
                <option key={header} value={header}>
                  {header}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMappingStep = () => (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="fas fa-file-csv text-emerald-400"></i>
            <span className="text-white font-medium">{fileName}</span>
            <span className="text-slate-400 text-sm">({csvData.length} rows)</span>
          </div>
          <button
            onClick={resetState}
            className="text-sm text-slate-400 hover:text-white"
          >
            <i className="fas fa-times mr-1"></i>
            Change file
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {renderFieldGroup('Basic Info', FIELD_GROUPS.basic, 'fa-box', 'text-blue-400')}
        {renderFieldGroup('Pricing', FIELD_GROUPS.pricing, 'fa-dollar-sign', 'text-emerald-400')}
        {renderFieldGroup('Inventory', FIELD_GROUPS.inventory, 'fa-warehouse', 'text-amber-400')}
        {renderFieldGroup('Supplier', FIELD_GROUPS.supplier, 'fa-truck-loading', 'text-purple-400')}
      </div>

      <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4">
        <h5 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
          <i className="fas fa-cog"></i>
          Import Options
        </h5>

        <div className="space-y-3">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Import Inventory To Location</label>
            <select
              value={selectedLocationId}
              onChange={e => setSelectedLocationId(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50"
            >
              <option value="">-- No inventory records --</option>
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
                className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-emerald-500 focus:ring-emerald-500"
              />
              <span className="text-sm text-slate-300">Create inventory records</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={createSuppliers}
                onChange={e => setCreateSuppliers(e.target.checked)}
                className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-emerald-500 focus:ring-emerald-500"
              />
              <span className="text-sm text-slate-300">Auto-create suppliers</span>
            </label>
          </div>
        </div>
      </div>

      {isValidMapping() && (
        <Button onClick={() => setStep('preview')} className="w-full">
          Preview Import
          <i className="fas fa-arrow-right ml-2"></i>
        </Button>
      )}
    </div>
  );

  const renderPreviewStep = () => {
    const previewData = getPreviewData();
    const issues = getValidationIssues();

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setStep('mapping')}
            className="text-sm text-slate-400 hover:text-white"
          >
            <i className="fas fa-arrow-left mr-1"></i>
            Back to mapping
          </button>
          <span className="text-sm text-slate-400">
            Ready to import <span className="text-white font-medium">{csvData.length}</span> products
          </span>
        </div>

        <div className="border border-slate-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-800">
                <tr>
                  {Object.entries(columnMapping)
                    .filter(([, col]) => col)
                    .map(([field]) => (
                      <th key={field} className="px-3 py-2 text-left text-slate-400 font-medium">
                        {FIELD_LABELS[field] || field}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {previewData.map((row, index) => (
                  <tr key={index} className="bg-slate-800/30">
                    {Object.entries(columnMapping)
                      .filter(([, col]) => col)
                      .map(([field]) => (
                        <td key={field} className="px-3 py-2 text-white">
                          {row[field] || '-'}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {csvData.length > 5 && (
            <div className="px-3 py-2 bg-slate-800/50 text-center text-sm text-slate-400">
              ... and {csvData.length - 5} more rows
            </div>
          )}
        </div>

        {issues.length > 0 && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <h4 className="text-amber-400 font-medium mb-2 flex items-center gap-2">
              <i className="fas fa-exclamation-triangle"></i>
              Validation Warnings
            </h4>
            <ul className="text-sm text-amber-300/80 space-y-1">
              {issues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
              {issues.length === 10 && (
                <li className="text-slate-400">... and more</li>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      title="Import Products from CSV"
      subtitle={
        step === 'upload' ? 'Upload a CSV file to import products' :
        step === 'mapping' ? 'Map CSV columns to product fields' :
        'Review and confirm import'
      }
      size="lg"
      footer={
        step === 'preview' ? (
          <>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleImport} disabled={isImporting || isDemo}>
              {isImporting ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Importing...
                </>
              ) : (
                <>
                  <i className="fas fa-file-import mr-2"></i>
                  Import {csvData.length} Products
                </>
              )}
            </Button>
          </>
        ) : undefined
      }
    >
      {step === 'upload' && renderUploadStep()}
      {step === 'mapping' && renderMappingStep()}
      {step === 'preview' && renderPreviewStep()}
    </Modal>
  );
}

export default ImportCSVModal;
