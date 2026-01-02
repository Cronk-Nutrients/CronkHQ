'use client';

import { useState } from 'react';
import Link from 'next/link';

type DataSource = 'orders' | 'products' | 'shipments' | 'inventory' | 'returns' | 'customers';

interface Column {
  id: string;
  name: string;
  type: 'string' | 'number' | 'date' | 'currency' | 'percent';
}

interface Filter {
  id: string;
  column: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'between' | 'in';
  value: string;
}

const dataSources: { id: DataSource; name: string; description: string; icon: string }[] = [
  { id: 'orders', name: 'Orders', description: 'Sales orders and transactions', icon: 'fa-shopping-cart' },
  { id: 'products', name: 'Products', description: 'Product catalog and details', icon: 'fa-box' },
  { id: 'shipments', name: 'Shipments', description: 'Shipping and delivery data', icon: 'fa-truck' },
  { id: 'inventory', name: 'Inventory', description: 'Stock levels and movements', icon: 'fa-warehouse' },
  { id: 'returns', name: 'Returns', description: 'Return requests and refunds', icon: 'fa-rotate-left' },
  { id: 'customers', name: 'Customers', description: 'Customer information', icon: 'fa-users' },
];

const columnsBySource: Record<DataSource, Column[]> = {
  orders: [
    { id: 'orderNumber', name: 'Order Number', type: 'string' },
    { id: 'customerName', name: 'Customer Name', type: 'string' },
    { id: 'channel', name: 'Sales Channel', type: 'string' },
    { id: 'status', name: 'Status', type: 'string' },
    { id: 'total', name: 'Order Total', type: 'currency' },
    { id: 'cogs', name: 'COGS', type: 'currency' },
    { id: 'profit', name: 'Profit', type: 'currency' },
    { id: 'margin', name: 'Margin', type: 'percent' },
    { id: 'shipping', name: 'Shipping Charged', type: 'currency' },
    { id: 'items', name: 'Item Count', type: 'number' },
    { id: 'createdAt', name: 'Order Date', type: 'date' },
  ],
  products: [
    { id: 'sku', name: 'SKU', type: 'string' },
    { id: 'name', name: 'Product Name', type: 'string' },
    { id: 'brand', name: 'Brand', type: 'string' },
    { id: 'category', name: 'Category', type: 'string' },
    { id: 'price', name: 'Price', type: 'currency' },
    { id: 'cost', name: 'Cost', type: 'currency' },
    { id: 'margin', name: 'Margin', type: 'percent' },
    { id: 'weight', name: 'Weight', type: 'number' },
    { id: 'status', name: 'Status', type: 'string' },
  ],
  shipments: [
    { id: 'trackingNumber', name: 'Tracking Number', type: 'string' },
    { id: 'carrier', name: 'Carrier', type: 'string' },
    { id: 'service', name: 'Service', type: 'string' },
    { id: 'status', name: 'Status', type: 'string' },
    { id: 'customerPaid', name: 'Customer Paid', type: 'currency' },
    { id: 'actualCost', name: 'Actual Cost', type: 'currency' },
    { id: 'profit', name: 'Shipping Profit', type: 'currency' },
    { id: 'weight', name: 'Weight', type: 'number' },
    { id: 'shippedAt', name: 'Ship Date', type: 'date' },
  ],
  inventory: [
    { id: 'sku', name: 'SKU', type: 'string' },
    { id: 'productName', name: 'Product Name', type: 'string' },
    { id: 'location', name: 'Location', type: 'string' },
    { id: 'quantity', name: 'Quantity', type: 'number' },
    { id: 'reserved', name: 'Reserved', type: 'number' },
    { id: 'available', name: 'Available', type: 'number' },
    { id: 'reorderPoint', name: 'Reorder Point', type: 'number' },
    { id: 'unitCost', name: 'Unit Cost', type: 'currency' },
    { id: 'totalValue', name: 'Total Value', type: 'currency' },
  ],
  returns: [
    { id: 'returnId', name: 'Return ID', type: 'string' },
    { id: 'orderNumber', name: 'Order Number', type: 'string' },
    { id: 'customerName', name: 'Customer Name', type: 'string' },
    { id: 'reason', name: 'Return Reason', type: 'string' },
    { id: 'status', name: 'Status', type: 'string' },
    { id: 'refundAmount', name: 'Refund Amount', type: 'currency' },
    { id: 'restockFee', name: 'Restock Fee', type: 'currency' },
    { id: 'createdAt', name: 'Return Date', type: 'date' },
  ],
  customers: [
    { id: 'name', name: 'Customer Name', type: 'string' },
    { id: 'email', name: 'Email', type: 'string' },
    { id: 'phone', name: 'Phone', type: 'string' },
    { id: 'totalOrders', name: 'Total Orders', type: 'number' },
    { id: 'totalSpent', name: 'Total Spent', type: 'currency' },
    { id: 'avgOrderValue', name: 'Avg Order Value', type: 'currency' },
    { id: 'firstOrderDate', name: 'First Order', type: 'date' },
    { id: 'lastOrderDate', name: 'Last Order', type: 'date' },
  ],
};

const groupByOptions: Record<DataSource, string[]> = {
  orders: ['channel', 'status', 'createdAt'],
  products: ['brand', 'category', 'status'],
  shipments: ['carrier', 'service', 'status'],
  inventory: ['location'],
  returns: ['reason', 'status'],
  customers: [],
};

export default function CustomReportBuilderPage() {
  const [reportName, setReportName] = useState('');
  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [groupBy, setGroupBy] = useState<string>('');
  const [dateRange, setDateRange] = useState('30d');
  const [exportFormat, setExportFormat] = useState<'csv' | 'xlsx' | 'pdf'>('csv');

  const availableColumns = selectedSource ? columnsBySource[selectedSource] : [];

  const toggleColumn = (columnId: string) => {
    setSelectedColumns(prev =>
      prev.includes(columnId)
        ? prev.filter(id => id !== columnId)
        : [...prev, columnId]
    );
  };

  const addFilter = () => {
    if (!selectedSource || availableColumns.length === 0) return;
    setFilters([...filters, {
      id: Date.now().toString(),
      column: availableColumns[0].id,
      operator: 'equals',
      value: ''
    }]);
  };

  const updateFilter = (id: string, field: keyof Filter, value: string) => {
    setFilters(filters.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const removeFilter = (id: string) => {
    setFilters(filters.filter(f => f.id !== id));
  };

  const handleGenerateReport = () => {
    // In a real app, this would call an API to generate the report
    alert(`Generating ${reportName || 'Custom Report'} with ${selectedColumns.length} columns from ${selectedSource}`);
  };

  const handleSaveTemplate = () => {
    alert('Report template saved!');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
          <Link href="/reports" className="hover:text-white">Reports</Link>
          <i className="fas fa-chevron-right text-xs"></i>
          <span className="text-white">Custom Report Builder</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Custom Report Builder</h1>
            <p className="text-slate-400">Build custom reports with your own columns, filters, and groupings</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveTemplate}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-sm transition-colors"
            >
              <i className="fas fa-save mr-2"></i>
              Save Template
            </button>
            <button
              onClick={handleGenerateReport}
              disabled={!selectedSource || selectedColumns.length === 0}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg text-sm transition-colors"
            >
              <i className="fas fa-play mr-2"></i>
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Report Name */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
        <label className="block text-sm text-slate-400 mb-2">Report Name</label>
        <input
          type="text"
          value={reportName}
          onChange={(e) => setReportName(e.target.value)}
          placeholder="Enter report name..."
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Data Source Selection */}
        <div className="col-span-1 space-y-4">
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-4">
              <i className="fas fa-database mr-2 text-emerald-400"></i>
              Data Source
            </h3>
            <div className="space-y-2">
              {dataSources.map(source => (
                <button
                  key={source.id}
                  onClick={() => {
                    setSelectedSource(source.id);
                    setSelectedColumns([]);
                    setFilters([]);
                    setGroupBy('');
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedSource === source.id
                      ? 'bg-emerald-500/20 border border-emerald-500/50'
                      : 'bg-slate-800/50 border border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      selectedSource === source.id ? 'bg-emerald-500/30 text-emerald-400' : 'bg-slate-700 text-slate-400'
                    }`}>
                      <i className={`fas ${source.icon}`}></i>
                    </div>
                    <div>
                      <div className={selectedSource === source.id ? 'text-emerald-400 font-medium' : 'text-white'}>
                        {source.name}
                      </div>
                      <div className="text-xs text-slate-400">{source.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-4">
              <i className="fas fa-calendar mr-2 text-blue-400"></i>
              Date Range
            </h3>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="today">Today</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="ytd">Year to Date</option>
              <option value="all">All Time</option>
            </select>
          </div>

          {/* Export Format */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-4">
              <i className="fas fa-download mr-2 text-purple-400"></i>
              Export Format
            </h3>
            <div className="flex gap-2">
              {(['csv', 'xlsx', 'pdf'] as const).map(format => (
                <button
                  key={format}
                  onClick={() => setExportFormat(format)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    exportFormat === format
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
                      : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
                  }`}
                >
                  {format.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Column Selection */}
        <div className="col-span-1">
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-4">
              <i className="fas fa-columns mr-2 text-amber-400"></i>
              Columns
              {selectedColumns.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded-full">
                  {selectedColumns.length} selected
                </span>
              )}
            </h3>
            {selectedSource ? (
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {availableColumns.map(column => (
                  <label
                    key={column.id}
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                      selectedColumns.includes(column.id)
                        ? 'bg-amber-500/10'
                        : 'hover:bg-slate-800'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedColumns.includes(column.id)}
                      onChange={() => toggleColumn(column.id)}
                      className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
                    />
                    <div className="flex-1">
                      <div className="text-white text-sm">{column.name}</div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      column.type === 'currency' ? 'bg-emerald-500/20 text-emerald-400' :
                      column.type === 'number' ? 'bg-blue-500/20 text-blue-400' :
                      column.type === 'date' ? 'bg-purple-500/20 text-purple-400' :
                      column.type === 'percent' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-slate-700 text-slate-400'
                    }`}>
                      {column.type}
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                <i className="fas fa-hand-pointer text-2xl mb-2"></i>
                <p className="text-sm">Select a data source first</p>
              </div>
            )}
          </div>
        </div>

        {/* Filters & Grouping */}
        <div className="col-span-1 space-y-4">
          {/* Filters */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">
                <i className="fas fa-filter mr-2 text-cyan-400"></i>
                Filters
              </h3>
              <button
                onClick={addFilter}
                disabled={!selectedSource}
                className="px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg text-sm disabled:opacity-50"
              >
                <i className="fas fa-plus mr-1"></i>
                Add
              </button>
            </div>
            {filters.length > 0 ? (
              <div className="space-y-3">
                {filters.map(filter => (
                  <div key={filter.id} className="bg-slate-800 rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <select
                        value={filter.column}
                        onChange={(e) => updateFilter(filter.id, 'column', e.target.value)}
                        className="flex-1 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white text-sm focus:outline-none"
                      >
                        {availableColumns.map(col => (
                          <option key={col.id} value={col.id}>{col.name}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => removeFilter(filter.id)}
                        className="p-1 text-slate-400 hover:text-red-400"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={filter.operator}
                        onChange={(e) => updateFilter(filter.id, 'operator', e.target.value)}
                        className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white text-sm focus:outline-none"
                      >
                        <option value="equals">equals</option>
                        <option value="contains">contains</option>
                        <option value="greater_than">greater than</option>
                        <option value="less_than">less than</option>
                      </select>
                      <input
                        type="text"
                        value={filter.value}
                        onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
                        placeholder="Value..."
                        className="flex-1 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white text-sm placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-slate-400 text-sm">
                No filters applied
              </div>
            )}
          </div>

          {/* Group By */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-4">
              <i className="fas fa-layer-group mr-2 text-pink-400"></i>
              Group By
            </h3>
            {selectedSource && groupByOptions[selectedSource].length > 0 ? (
              <select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="">No grouping</option>
                {groupByOptions[selectedSource].map(option => {
                  const column = availableColumns.find(c => c.id === option);
                  return (
                    <option key={option} value={option}>
                      {column?.name || option}
                    </option>
                  );
                })}
              </select>
            ) : (
              <div className="text-center py-4 text-slate-400 text-sm">
                {selectedSource ? 'No grouping options available' : 'Select a data source first'}
              </div>
            )}
          </div>

          {/* Aggregations */}
          {groupBy && (
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-4">
                <i className="fas fa-calculator mr-2 text-orange-400"></i>
                Aggregations
              </h3>
              <div className="space-y-2">
                {['Sum', 'Average', 'Count', 'Min', 'Max'].map(agg => (
                  <label key={agg} className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-emerald-500"
                    />
                    {agg}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview */}
      {selectedSource && selectedColumns.length > 0 && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700 flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold">Preview</h3>
              <p className="text-sm text-slate-400">Sample data based on your selections</p>
            </div>
            <span className="text-xs text-slate-500">Showing sample rows</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 text-left">
                  {selectedColumns.map(colId => {
                    const column = availableColumns.find(c => c.id === colId);
                    return (
                      <th key={colId} className="p-3 text-slate-400 font-medium text-sm">
                        {column?.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {[1, 2, 3].map(row => (
                  <tr key={row} className="hover:bg-slate-800/30">
                    {selectedColumns.map(colId => (
                      <td key={colId} className="p-3 text-slate-300 text-sm">
                        <div className="h-4 bg-slate-700/50 rounded w-20 animate-pulse"></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Saved Templates */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
        <h3 className="text-white font-semibold mb-4">
          <i className="fas fa-bookmark mr-2 text-emerald-400"></i>
          Saved Templates
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {[
            { name: 'Weekly Sales Summary', source: 'orders', columns: 5 },
            { name: 'Low Stock Alert', source: 'inventory', columns: 6 },
            { name: 'Shipping Cost Analysis', source: 'shipments', columns: 7 },
            { name: 'Customer Lifetime Value', source: 'customers', columns: 4 },
          ].map((template, i) => (
            <button
              key={i}
              className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-left transition-colors"
            >
              <div className="text-white text-sm font-medium mb-1">{template.name}</div>
              <div className="text-xs text-slate-400">
                {template.source} • {template.columns} columns
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
