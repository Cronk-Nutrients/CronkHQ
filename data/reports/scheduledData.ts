// Scheduled reports mock data

import type { ScheduledReport, ReportDelivery } from '@/types/reports';

export const scheduledReports: ScheduledReport[] = [
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

export const recentDeliveries: ReportDelivery[] = [
  { report: 'Daily Sales Summary', date: '2024-12-28 06:00 AM', recipients: 2, status: 'delivered' },
  { report: 'Daily Low Stock Alert', date: '2024-12-28 07:00 AM', recipients: 1, status: 'delivered' },
  { report: 'Weekly Inventory Status', date: '2024-12-25 08:00 AM', recipients: 1, status: 'delivered' },
  { report: 'Weekly Shipping Analysis', date: '2024-12-25 07:00 AM', recipients: 1, status: 'failed' },
];
