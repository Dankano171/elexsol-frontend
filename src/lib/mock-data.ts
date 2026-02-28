import { DashboardMetrics, ActivityItem, ChartDataPoint } from '@/types/dashboard';
import { Integration } from '@/types/integrations';
import { ComplianceInvoice } from '@/types/compliance';

export const mockMetrics: DashboardMetrics = {
  revenue: { total: 84_500_000, monthly: 12_750_000, growth: 18.5, trend: 'up' },
  paymentVelocity: { averageDays: 14, medianDays: 11, trend: 'improving' },
  cashFlow: { current: 23_400_000, projected: 31_200_000, forecast30day: 28_900_000, confidence: 87 },
  outstanding: { total: 8_200_000, count: 23, overdue: 5 },
};

export const mockChartData: ChartDataPoint[] = [
  { name: 'Jul', revenue: 9_200_000, expenses: 6_100_000, profit: 3_100_000 },
  { name: 'Aug', revenue: 10_800_000, expenses: 6_500_000, profit: 4_300_000 },
  { name: 'Sep', revenue: 9_600_000, expenses: 7_200_000, profit: 2_400_000 },
  { name: 'Oct', revenue: 11_400_000, expenses: 6_800_000, profit: 4_600_000 },
  { name: 'Nov', revenue: 12_100_000, expenses: 7_100_000, profit: 5_000_000 },
  { name: 'Dec', revenue: 12_750_000, expenses: 7_400_000, profit: 5_350_000 },
];

export const mockActivities: ActivityItem[] = [
  { id: '1', type: 'payment', title: 'Payment received', description: '₦2,450,000 from Dangote Group', timestamp: new Date(Date.now() - 1800000), status: 'success' },
  { id: '2', type: 'compliance', title: 'Invoice flagged', description: 'INV-2024-0847 missing TIN', timestamp: new Date(Date.now() - 3600000), status: 'warning' },
  { id: '3', type: 'integration', title: 'Zoho sync complete', description: '142 invoices synchronized', timestamp: new Date(Date.now() - 7200000), status: 'info' },
  { id: '4', type: 'alert', title: 'CSID expiring soon', description: '12 hours remaining for clearance', timestamp: new Date(Date.now() - 10800000), status: 'error' },
  { id: '5', type: 'invoice', title: 'New invoice created', description: 'INV-2024-0892 for ₦1,200,000', timestamp: new Date(Date.now() - 14400000), status: 'info' },
];

export const mockIntegrations: Integration[] = [
  { id: '1', provider: 'zoho', name: 'Zoho Books', description: 'Accounting & invoicing platform', status: 'active', syncStatus: 'idle', lastSyncAt: new Date(Date.now() - 7200000).toISOString(), tokenExpiresAt: new Date(Date.now() + 86400000 * 25).toISOString(), invoiceCount: 1247, icon: 'BookOpen', accountEmail: 'finance@company.ng' },
  { id: '2', provider: 'whatsapp', name: 'WhatsApp Business', description: 'Customer communication & invoicing', status: 'active', syncStatus: 'idle', lastSyncAt: new Date(Date.now() - 3600000).toISOString(), invoiceCount: 342, icon: 'MessageCircle' },
  { id: '3', provider: 'quickbooks', name: 'QuickBooks', description: 'Financial management suite', status: 'disconnected', syncStatus: 'idle', invoiceCount: 0, icon: 'Calculator' },
];

export const mockComplianceInvoices: ComplianceInvoice[] = [
  { id: '1', invoiceNumber: 'INV-2024-0847', customerName: 'Dangote Industries', customerTin: '1234567890', issueDate: '2024-12-15', dueDate: '2025-01-15', totalAmount: 4_500_000, taxAmount: 337_500, status: 'flagged', source: 'zoho', validationErrors: [{ field: 'customerTin', message: 'TIN checksum validation failed', code: 'TIN_INVALID', severity: 'error' }] },
  { id: '2', invoiceNumber: 'INV-2024-0848', customerName: 'MTN Nigeria', customerTin: '9876543210', issueDate: '2024-12-16', dueDate: '2025-01-16', totalAmount: 2_800_000, taxAmount: 210_000, status: 'approved', source: 'zoho' },
  { id: '3', invoiceNumber: 'INV-2024-0849', customerName: 'Access Bank Plc', customerTin: '5678901234', issueDate: '2024-12-17', dueDate: '2025-01-17', totalAmount: 1_200_000, taxAmount: 90_000, status: 'submitted', source: 'whatsapp' },
  { id: '4', invoiceNumber: 'INV-2024-0850', customerName: 'Nestle Nigeria', customerTin: '', issueDate: '2024-12-18', dueDate: '2025-01-18', totalAmount: 3_100_000, taxAmount: 232_500, status: 'flagged', source: 'zoho', validationErrors: [{ field: 'customerTin', message: 'TIN is required', code: 'TIN_MISSING', severity: 'error' }, { field: 'dueDate', message: 'Due date exceeds 30-day limit', code: 'DUE_DATE_EXCEEDED', severity: 'warning' }] },
  { id: '5', invoiceNumber: 'INV-2024-0851', customerName: 'Flour Mills of Nigeria', customerTin: '3456789012', issueDate: '2024-12-19', dueDate: '2025-01-19', totalAmount: 5_600_000, taxAmount: 420_000, status: 'approved', source: 'quickbooks' },
  { id: '6', invoiceNumber: 'INV-2024-0852', customerName: 'Nigerian Breweries', customerTin: '6789012345', issueDate: '2024-12-20', dueDate: '2025-01-20', totalAmount: 890_000, taxAmount: 66_750, status: 'draft', source: 'zoho' },
];
