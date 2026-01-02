'use client';

import { useState } from 'react';
import {
  ReportPageHeader,
  MetricCard,
  MetricCardGrid,
  DataTable,
  StatusBadge,
} from '@/components/reports';
import { getFrequencyColor, getFormatIcon } from '@/lib/formatters';
import { scheduledReports, recentDeliveries } from '@/data/reports';

type FilterStatus = 'all' | 'active' | 'paused';

export default function ScheduledReportsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  const filteredReports = scheduledReports.filter(report =>
    filterStatus === 'all' || report.status === filterStatus
  );

  const activeCount = scheduledReports.filter(r => r.status === 'active').length;
  const pausedCount = scheduledReports.filter(r => r.status === 'paused').length;

  return (
    <div className="space-y-6">
      <ReportPageHeader
        title="Scheduled Reports"
        description="Automate report generation and delivery"
        icon="fa-clock"
        iconColor="purple"
        breadcrumbs={[
          { label: 'Reports', href: '/reports' },
          { label: 'Scheduled Reports' },
        ]}
        actions={
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>
            New Schedule
          </button>
        }
      />

      <MetricCardGrid columns={4}>
        <MetricCard label="Total Schedules" value={scheduledReports.length} icon="fa-clock" />
        <MetricCard label="Active" value={activeCount} icon="fa-play" variant="success" />
        <MetricCard label="Paused" value={pausedCount} icon="fa-pause" variant="warning" />
        <MetricCard label="Delivered This Month" value={142} icon="fa-paper-plane" variant="info" />
      </MetricCardGrid>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {(['all', 'active', 'paused'] as const).map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filterStatus === status
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:text-white'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {status === 'all' && ` (${scheduledReports.length})`}
            {status === 'active' && ` (${activeCount})`}
            {status === 'paused' && ` (${pausedCount})`}
          </button>
        ))}
      </div>

      <DataTable
        columns={[
          {
            key: 'name',
            header: 'Report',
            render: (v, row) => (
              <div>
                <div className="text-white font-medium">{v as string}</div>
                <div className="text-xs text-slate-400">{(row as typeof scheduledReports[0]).reportType}</div>
              </div>
            )
          },
          {
            key: 'frequency',
            header: 'Frequency',
            render: (v) => (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFrequencyColor(v as string)}`}>
                {v as string}
              </span>
            )
          },
          { key: 'nextRun', header: 'Next Run', render: (v) => <span className="text-slate-300 text-sm">{v as string}</span> },
          { key: 'lastRun', header: 'Last Run', render: (v) => <span className="text-slate-400 text-sm">{v as string}</span> },
          {
            key: 'recipients',
            header: 'Recipients',
            render: (v) => (
              <div className="flex items-center gap-1">
                <i className="fas fa-users text-slate-500 text-xs"></i>
                <span className="text-slate-300 text-sm">{(v as string[]).length}</span>
              </div>
            )
          },
          {
            key: 'format',
            header: 'Format',
            render: (v) => <i className={`fas ${getFormatIcon(v as string)}`}></i>
          },
          {
            key: 'status',
            header: 'Status',
            render: (v) => (
              <StatusBadge
                status={v === 'active' ? 'Active' : 'Paused'}
                variant={v === 'active' ? 'success' : 'warning'}
                showDot
                pulse={v === 'active'}
              />
            )
          },
          {
            key: 'actions',
            header: 'Actions',
            align: 'right',
            render: (_, row) => (
              <div className="flex items-center justify-end gap-2">
                <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors" title="Run Now">
                  <i className="fas fa-play"></i>
                </button>
                <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors" title="Edit">
                  <i className="fas fa-edit"></i>
                </button>
                <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors" title="Pause/Resume">
                  <i className={`fas ${(row as typeof scheduledReports[0]).status === 'active' ? 'fa-pause' : 'fa-play'}`}></i>
                </button>
                <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-red-400 transition-colors" title="Delete">
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            )
          },
        ]}
        data={filteredReports}
        getRowKey={(row) => (row as typeof scheduledReports[0]).id}
      />

      {/* Recent Deliveries */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">Recent Deliveries</h2>
          <p className="text-sm text-slate-400">Last 7 days</p>
        </div>
        <div className="divide-y divide-slate-700/50">
          {recentDeliveries.map((delivery, i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-800/30">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  delivery.status === 'delivered' ? 'bg-emerald-500/20' : 'bg-red-500/20'
                }`}>
                  <i className={`fas ${delivery.status === 'delivered' ? 'fa-check text-emerald-400' : 'fa-times text-red-400'}`}></i>
                </div>
                <div>
                  <div className="text-white">{delivery.report}</div>
                  <div className="text-xs text-slate-400">{delivery.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-slate-400">
                  <i className="fas fa-envelope mr-1"></i>
                  {delivery.recipients} recipient{delivery.recipients > 1 ? 's' : ''}
                </div>
                <StatusBadge
                  status={delivery.status === 'delivered' ? 'Delivered' : 'Failed'}
                  variant={delivery.status === 'delivered' ? 'success' : 'error'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
        <div className="flex items-start gap-3">
          <i className="fas fa-lightbulb text-blue-400 mt-0.5"></i>
          <div>
            <div className="text-sm font-medium text-white">Scheduling Tips</div>
            <div className="text-xs text-slate-400 mt-1">
              Schedule reports during off-peak hours (early morning) for faster generation. Weekly reports are best scheduled for Monday mornings to capture the full week&apos;s data.
            </div>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Create Schedule</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Report Name</label>
                <input
                  type="text"
                  placeholder="e.g., Weekly Sales Report"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Report Type</label>
                <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500">
                  <option>Sales Report</option>
                  <option>Inventory Report</option>
                  <option>Shipping Report</option>
                  <option>Financial Report</option>
                  <option>Marketing Report</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Frequency</label>
                <div className="flex gap-2">
                  {['Daily', 'Weekly', 'Monthly'].map(freq => (
                    <button
                      key={freq}
                      className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors"
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Recipients</label>
                <input
                  type="text"
                  placeholder="email@company.com"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Export Format</label>
                <div className="flex gap-2">
                  {['PDF', 'XLSX', 'CSV'].map(format => (
                    <button
                      key={format}
                      className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors"
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm transition-colors">
                Create Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
