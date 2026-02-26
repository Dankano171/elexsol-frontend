export interface DashboardMetrics {
  revenue: {
    total: number;
    monthly: number;
    weekly: number;
    daily: number;
    growth: number;
    trend: 'up' | 'down' | 'stable';
  };
  paymentVelocity: {
    averageDays: number;
    medianDays: number;
    fastestDays: number;
    slowestDays: number;
    trend: 'improving' | 'worsening' | 'stable';
  };
  cashFlow: {
    current: number;
    projected: number;
    forecast30day: number;
    confidence: number;
  };
  invoices: {
    total: number;
    paid: number;
    overdue: number;
    draft: number;
    totalValue: number;
  };
}

export interface ChartDataPoint {
  date: string;
  value: number;
  target?: number;
  previous?: number;
}

export interface RevenueChartData {
  labels: string[];
  actual: number[];
  projected: number[];
  previous: number[];
}

export interface PaymentVelocityData {
  labels: string[];
  values: number[];
  benchmarks: {
    industry: number;
    topPerformer: number;
  };
}

export interface ActivityItem {
  id: string;
  type: 'invoice_created' | 'invoice_paid' | 'invoice_overdue' | 'integration_synced' | 'compliance_cleared' | 'compliance_flagged';
  title: string;
  description: string;
  timestamp: Date;
  metadata?: Record<string, any>;
  actionable: boolean;
  actionUrl?: string;
}

export interface KPIThreshold {
  warning: number;
  critical: number;
  success: number;
}
