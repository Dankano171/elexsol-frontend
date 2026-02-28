export interface DashboardMetrics {
  revenue: {
    total: number;
    monthly: number;
    growth: number;
    trend: 'up' | 'down' | 'stable';
  };
  paymentVelocity: {
    averageDays: number;
    medianDays: number;
    trend: 'improving' | 'worsening' | 'stable';
  };
  cashFlow: {
    current: number;
    projected: number;
    forecast30day: number;
    confidence: number;
  };
  outstanding: {
    total: number;
    count: number;
    overdue: number;
  };
}

export interface ActivityItem {
  id: string;
  type: 'invoice' | 'payment' | 'compliance' | 'integration' | 'alert';
  title: string;
  description: string;
  timestamp: Date;
  status?: 'success' | 'warning' | 'error' | 'info';
}

export interface ChartDataPoint {
  name: string;
  revenue: number;
  expenses: number;
  profit: number;
}
