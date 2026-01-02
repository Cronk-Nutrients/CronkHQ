// Shared types for Reports section

export type DateRangeType = 'today' | '7d' | '30d' | '90d' | 'ytd' | 'custom' | 'current';
export type ExportFormat = 'csv' | 'xlsx' | 'pdf' | 'json';

export interface TabConfig {
  id: string;
  label: string;
  icon: string;
}

export interface MetricConfig {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface TableColumn<T = unknown> {
  key: string;
  header: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: T) => React.ReactNode;
  className?: string;
}

export interface ReportPageHeaderProps {
  title: string;
  description: string;
  icon: string;
  iconColor?: string;
  breadcrumbs: BreadcrumbItem[];
  actions?: React.ReactNode;
}

// Data source types for Custom Report Builder
export type DataSource = 'orders' | 'products' | 'shipments' | 'inventory' | 'returns' | 'customers';

export interface ColumnConfig {
  id: string;
  name: string;
  type: 'string' | 'number' | 'date' | 'currency' | 'percent';
}

export interface FilterConfig {
  id: string;
  column: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'between' | 'in';
  value: string;
}

// Scheduled Reports types
export interface ScheduledReport {
  id: string;
  name: string;
  reportType: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  nextRun: string;
  lastRun: string;
  recipients: string[];
  format: ExportFormat;
  status: 'active' | 'paused';
}

export interface ReportDelivery {
  report: string;
  date: string;
  recipients: number;
  status: 'delivered' | 'failed' | 'pending';
}
