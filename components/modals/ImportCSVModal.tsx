'use client';

import { useState, useCallback, useRef } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useApp, Product } from '@/context/AppContext';
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
  weight?: string;
  barcode?: string;
}

const REQUIRED_FIELDS = ['name', 'sku', 'category', 'cost', 'priceMSRP'];
const FIELD_LABELS: Record<string, string> = {
  name: 'Product Name',
  sku: 'SKU',
  category: 'Category',
  cost: 'Cost',
  priceMSRP: 'MSRP',
  priceShopify: 'Shopify Price',
  priceAmazon: 'Amazon Price',
  weight: 'Weight',
  barcode: 'Barcode',
};

export function ImportCSVModal({ isOpen, onClose }: ImportCSVModalProps) {
  const { state, dispatch } = useApp();
  const { success, error, warning } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<'upload' | 'mapping' | 'preview'>('upload');
  const [fileName, setFileName] = useState('');
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [csvData, setCsvData] = useState<ParsedRow[]>([]);
  const [columnMapping, setColumnMapping] = useState<Partial<ColumnMapping>>({});
  const [isImporting, setIsImporting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const resetState = () => {
    setStep('upload');
    setFileName('');
    setCsvHeaders([]);
    setCsvData([]);
    setColumnMapping({});
    setIsImporting(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const parseCSV = (text: string): { headers: string[]; data: ParsedRow[] } => {
    const lines = text.split(/\r?\n/).filter(line => line.trim());
    if (lines.length === 0) return { headers: [], data: [] };

    // Parse headers
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));

    // Parse data rows
    const data: ParsedRow[] = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
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

    // Try to auto-map common column names
    const mappings: Record<keyof ColumnMapping, string[]> = {
      name: ['name', 'product name', 'product', 'title'],
      sku: ['sku', 'product sku', 'item number', 'item #'],
      category: ['category', 'type', 'product type'],
      cost: ['cost', 'cogs', 'unit cost', 'price cost'],
      priceMSRP: ['msrp', 'price', 'retail price', 'price msrp'],
      priceShopify: ['shopify price', 'shopify', 'web price'],
      priceAmazon: ['amazon price', 'amazon', 'marketplace price'],
      weight: ['weight', 'weight (lbs)', 'lbs'],
      barcode: ['barcode', 'upc', 'ean', 'gtin'],
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
    const existingSkus = new Set(state.products.map(p => p.sku.toLowerCase()));
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

    return issues.slice(0, 10); // Show first 10 issues
  };

  const handleImport = async () => {
    if (!isValidMapping()) return;

    setIsImporting(true);

    try {
      const existingSkus = new Set(state.products.map(p => p.sku.toLowerCase()));
      let imported = 0;
      let skipped = 0;

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
        const costValue = parseFloat(columnMapping.cost ? row[columnMapping.cost] : '0') || 0;
        const weightValue = parseFloat(columnMapping.weight ? row[columnMapping.weight] : '0') || 0;

        const newProduct: Product = {
          id: crypto.randomUUID(),
          name: name.trim(),
          sku: sku.trim().toUpperCase(),
          barcode: columnMapping.barcode ? row[columnMapping.barcode]?.trim() : undefined,
          category: columnMapping.category ? row[columnMapping.category]?.trim() || 'classic_line' : 'classic_line',
          cost: {
            rolling: costValue,
            fixed: costValue,
          },
          prices: {
            msrp: msrp,
            shopify: shopifyPrice,
            amazon: amazonPrice,
            wholesale: msrp * 0.6,
          },
          weight: {
            value: weightValue,
            unit: 'lbs',
          },
          dimensions: { length: 0, width: 0, height: 0 },
          reorderPoint: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
        existingSkus.add(sku.toLowerCase());
        imported++;
      }

      if (imported > 0) {
        success(`Successfully imported ${imported} products`);
      }
      if (skipped > 0) {
        warning(`Skipped ${skipped} rows (missing data or duplicate SKUs)`);
      }

      resetState();
      onClose();
    } catch (err) {
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
          <li><i className="fas fa-check text-emerald-400 mr-2"></i>Required columns: Name, SKU, Category, Cost, MSRP</li>
          <li><i className="fas fa-check text-emerald-400 mr-2"></i>Optional: Shopify Price, Amazon Price, Weight, Barcode</li>
        </ul>
      </div>
    </div>
  );

  const renderMappingStep = () => (
    <div className="space-y-4">
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <i className="fas fa-file-csv text-emerald-400"></i>
          <span className="text-white font-medium">{fileName}</span>
          <span className="text-slate-400 text-sm">({csvData.length} rows)</span>
        </div>
        <button
          onClick={resetState}
          className="text-sm text-slate-400 hover:text-white"
        >
          <i className="fas fa-times mr-1"></i>
          Choose different file
        </button>
      </div>

      <div>
        <h4 className="text-sm font-medium text-white mb-3">Map CSV Columns</h4>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(FIELD_LABELS).map(([field, label]) => (
            <div key={field}>
              <label className="block text-sm text-slate-400 mb-1.5">
                {label}
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
                } rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50`}
              >
                <option value="">-- Select column --</option>
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

        {/* Preview Table */}
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

        {/* Validation Issues */}
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
            <Button onClick={handleImport} disabled={isImporting}>
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
