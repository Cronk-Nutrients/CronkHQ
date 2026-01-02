'use client';

import { useState } from 'react';
import {
  ReportPageHeader,
  DateRangePicker,
  SummaryCard,
} from '@/components/reports';
import {
  dataSources,
  columnsBySource,
  groupByOptions,
  savedTemplates,
} from '@/data/reports';
import type { DataSource, FilterConfig } from '@/types/reports';

export default function CustomReportBuilderPage() {
  const [reportName, setReportName] = useState('');
  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterConfig[]>([]);
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

  const updateFilter = (id: string, field: keyof FilterConfig, value: string) => {
    setFilters(filters.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const removeFilter = (id: string) => {
    setFilters(filters.filter(f => f.id !== id));
  };

  const handleGenerateReport = () => {
    alert(`Generating ${reportName || 'Custom Report'} with ${selectedColumns.length} columns from ${selectedSource}`);
  };

  const handleSaveTemplate = () => {
    alert('Report template saved!');
  };

  const getColumnTypeColor = (type: string) => {
    switch (type) {
      case 'currency': return 'bg-emerald-500/20 text-emerald-400';
      case 'number': return 'bg-blue-500/20 text-blue-400';
      case 'date': return 'bg-purple-500/20 text-purple-400';
      case 'percent': return 'bg-amber-500/20 text-amber-400';
      default: return 'bg-slate-700 text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      <ReportPageHeader
        title="Custom Report Builder"
        description="Build custom reports with your own columns, filters, and groupings"
        icon="fa-wand-magic-sparkles"
        iconColor="purple"
        breadcrumbs={[
          { label: 'Reports', href: '/reports' },
          { label: 'Custom Report Builder' },
        ]}
        actions={
          <>
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
          </>
        }
      />

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
          <SummaryCard title="">
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
          </SummaryCard>

          {/* Date Range */}
          <SummaryCard title="">
            <h3 className="text-white font-semibold mb-4">
              <i className="fas fa-calendar mr-2 text-blue-400"></i>
              Date Range
            </h3>
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
              options={[
                { value: 'today', label: 'Today' },
                { value: '7d', label: 'Last 7 Days' },
                { value: '30d', label: 'Last 30 Days' },
                { value: '90d', label: 'Last 90 Days' },
                { value: 'ytd', label: 'Year to Date' },
                { value: 'all', label: 'All Time' },
              ]}
              className="w-full"
            />
          </SummaryCard>

          {/* Export Format */}
          <SummaryCard title="">
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
          </SummaryCard>
        </div>

        {/* Column Selection */}
        <div className="col-span-1">
          <SummaryCard title="">
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
                      selectedColumns.includes(column.id) ? 'bg-amber-500/10' : 'hover:bg-slate-800'
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
                    <span className={`text-xs px-2 py-0.5 rounded ${getColumnTypeColor(column.type)}`}>
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
          </SummaryCard>
        </div>

        {/* Filters & Grouping */}
        <div className="col-span-1 space-y-4">
          {/* Filters */}
          <SummaryCard title="">
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
          </SummaryCard>

          {/* Group By */}
          <SummaryCard title="">
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
          </SummaryCard>

          {/* Aggregations */}
          {groupBy && (
            <SummaryCard title="">
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
            </SummaryCard>
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
      <SummaryCard title="">
        <h3 className="text-white font-semibold mb-4">
          <i className="fas fa-bookmark mr-2 text-emerald-400"></i>
          Saved Templates
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {savedTemplates.map((template, i) => (
            <button
              key={i}
              className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-left transition-colors"
            >
              <div className="text-white text-sm font-medium mb-1">{template.name}</div>
              <div className="text-xs text-slate-400">
                {template.source} &bull; {template.columns} columns
              </div>
            </button>
          ))}
        </div>
      </SummaryCard>
    </div>
  );
}
