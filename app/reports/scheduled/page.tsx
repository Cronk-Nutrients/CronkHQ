'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ScheduledReport {
  id: string;
  name: string;
  reportType: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  nextRun: string;
  lastRun: string;
  recipients: string[];
  format: 'csv' | 'xlsx' | 'pdf';
  status: 'active' | 'paused';
}

const scheduledReports: ScheduledReport[] = [
  {
    id: '1',
    name: 'Daily Sales Summary',
    reportType: 'Sales',
    frequency: 'daily',
    nextRun: '2024-12-29 06:00 AM',
    lastRun: '2024-12-28 06:00 AM',
    recipients: ['team@company.com', 'manager@company.com'],
    format: 'pdf',
    status: 'active',
  },
  {
    id: '2',
    name: 'Weekly Inventory Status',
    reportType: 'Inventory',
    frequency: 'weekly',
    nextRun: '2025-01-01 08:00 AM',
    lastRun: '2024-12-25 08:00 AM',
    recipients: ['warehouse@company.com'],
    format: 'xlsx',
    status: 'active',
  },
  {
    id: '3',
    name: 'Monthly P&L Statement',
    reportType: 'Financial',
    frequency: 'monthly',
    nextRun: '2025-01-01 09:00 AM',
    lastRun: '2024-12-01 09:00 AM',
    recipients: ['accounting@company.com', 'cfo@company.com'],
    format: 'pdf',
    status: 'active',
  },
  {
    id: '4',
    name: 'Weekly Shipping Analysis',
    reportType: 'Shipping',
    frequency: 'weekly',
    nextRun: '2025-01-01 07:00 AM',
    lastRun: '2024-12-25 07:00 AM',
    recipients: ['logistics@company.com'],
    format: 'csv',
    status: 'active',
  },
  {
    id: '5',
    name: 'Daily Low Stock Alert',
    reportType: 'Inventory',
    frequency: 'daily',
    nextRun: '2024-12-29 07:00 AM',
    lastRun: '2024-12-28 07:00 AM',
    recipients: ['purchasing@company.com'],
    format: 'xlsx',
    status: 'active',
  },
  {
    id: '6',
    name: 'Monthly Marketing Performance',
    reportType: 'Marketing',
    frequency: 'monthly',
    nextRun: '2025-01-01 10:00 AM',
    lastRun: '2024-12-01 10:00 AM',
    recipients: ['marketing@company.com'],
    format: 'pdf',
    status: 'paused',
  },
];

const recentDeliveries = [
  { report: 'Daily Sales Summary', date: '2024-12-28 06:00 AM', recipients: 2, status: 'delivered' },
  { report: 'Daily Low Stock Alert', date: '2024-12-28 07:00 AM', recipients: 1, status: 'delivered' },
  { report: 'Weekly Inventory Status', date: '2024-12-25 08:00 AM', recipients: 1, status: 'delivered' },
  { report: 'Weekly Shipping Analysis', date: '2024-12-25 07:00 AM', recipients: 1, status: 'failed' },
];

export default function ScheduledReportsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'paused'>('all');

  const filteredReports = scheduledReports.filter(report =>
    filterStatus === 'all' || report.status === filterStatus
  );

  const activeCount = scheduledReports.filter(r => r.status === 'active').length;
  const pausedCount = scheduledReports.filter(r => r.status === 'paused').length;

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'bg-emerald-500/20 text-emerald-400';
      case 'weekly': return 'bg-blue-500/20 text-blue-400';
      case 'monthly': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'pdf': return 'fa-file-pdf text-red-400';
      case 'xlsx': return 'fa-file-excel text-green-400';
      case 'csv': return 'fa-file-csv text-blue-400';
      default: return 'fa-file text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
          <Link href="/reports" className="hover:text-white">Reports</Link>
          <i className="fas fa-chevron-right text-xs"></i>
          <span className="text-white">Scheduled Reports</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Scheduled Reports</h1>
            <p className="text-slate-400">Automate report generation and delivery</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>
            New Schedule
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-clock text-purple-400"></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{scheduledReports.length}</div>
              <div className="text-xs text-slate-400">Total Schedules</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-play text-emerald-400"></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{activeCount}</div>
              <div className="text-xs text-slate-400">Active</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-pause text-amber-400"></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{pausedCount}</div>
              <div className="text-xs text-slate-400">Paused</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-paper-plane text-blue-400"></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">142</div>
              <div className="text-xs text-slate-400">Delivered This Month</div>
            </div>
          </div>
        </div>
      </div>

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

      {/* Scheduled Reports Table */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700 text-left">
              <th className="p-4 text-slate-400 font-medium">Report</th>
              <th className="p-4 text-slate-400 font-medium">Frequency</th>
              <th className="p-4 text-slate-400 font-medium">Next Run</th>
              <th className="p-4 text-slate-400 font-medium">Last Run</th>
              <th className="p-4 text-slate-400 font-medium">Recipients</th>
              <th className="p-4 text-slate-400 font-medium">Format</th>
              <th className="p-4 text-slate-400 font-medium">Status</th>
              <th className="p-4 text-slate-400 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {filteredReports.map(report => (
              <tr key={report.id} className="hover:bg-slate-800/30">
                <td className="p-4">
                  <div>
                    <div className="text-white font-medium">{report.name}</div>
                    <div className="text-xs text-slate-400">{report.reportType}</div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFrequencyColor(report.frequency)}`}>
                    {report.frequency}
                  </span>
                </td>
                <td className="p-4 text-slate-300 text-sm">{report.nextRun}</td>
                <td className="p-4 text-slate-400 text-sm">{report.lastRun}</td>
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <i className="fas fa-users text-slate-500 text-xs"></i>
                    <span className="text-slate-300 text-sm">{report.recipients.length}</span>
                  </div>
                </td>
                <td className="p-4">
                  <i className={`fas ${getFormatIcon(report.format)}`}></i>
                </td>
                <td className="p-4">
                  {report.status === 'active' ? (
                    <span className="flex items-center gap-1.5 text-emerald-400 text-sm">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-amber-400 text-sm">
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                      Paused
                    </span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors" title="Run Now">
                      <i className="fas fa-play"></i>
                    </button>
                    <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors" title="Edit">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors" title="Pause/Resume">
                      <i className={`fas ${report.status === 'active' ? 'fa-pause' : 'fa-play'}`}></i>
                    </button>
                    <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-red-400 transition-colors" title="Delete">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
                {delivery.status === 'delivered' ? (
                  <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded">Delivered</span>
                ) : (
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">Failed</span>
                )}
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
              Schedule reports during off-peak hours (early morning) for faster generation. Weekly reports are best scheduled for Monday mornings to capture the full week's data.
            </div>
          </div>
        </div>
      </div>

      {/* Create Modal Placeholder */}
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
