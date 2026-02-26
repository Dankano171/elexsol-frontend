'use client';

import { useDashboard } from '@/lib/hooks/useDashboard';
import { KPICard } from './KPICard';
import { RevenueMetric } from './RevenueMetric';
import { PaymentVelocity } from './PaymentVelocity';
import { CashFlowForecast } from './CashFlowForecast';
import { Skeleton } from '@/components/ui/skeleton';

export function FinancialPulse() {
  const { metrics, metricsLoading } = useDashboard();

  if (metricsLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="text-center py-12 text-gray-500">
        No metrics available
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Revenue"
          value={metrics.revenue.total}
          previousValue={metrics.revenue.total * 0.85} // Example previous
          format="currency"
          trend={metrics.revenue.trend}
          icon="revenue"
        />
        <KPICard
          title="Payment Velocity"
          value={metrics.paymentVelocity.averageDays}
          unit="days"
          previousValue={metrics.paymentVelocity.averageDays * 1.1}
          trend={metrics.paymentVelocity.trend === 'improving' ? 'up' : 'down'}
          icon="velocity"
        />
        <KPICard
          title="30-Day Forecast"
          value={metrics.cashFlow.forecast30day}
          format="currency"
          tooltip={`${metrics.cashFlow.confidence}% confidence`}
          icon="forecast"
        />
        <KPICard
          title="Outstanding"
          value={metrics.invoices.totalValue - (metrics.invoices.totalValue * 0.6)} // Example paid
          format="currency"
          icon="outstanding"
          warning={metrics.invoices.overdue > 0}
        />
      </div>

      {/* Detailed Metrics */}
      <div className="grid gap-6 md:grid-cols-2">
        <RevenueMetric
          total={metrics.revenue.total}
          monthly={metrics.revenue.monthly}
          growth={metrics.revenue.growth}
          trend={metrics.revenue.trend}
        />
        <PaymentVelocity
          averageDays={metrics.paymentVelocity.averageDays}
          medianDays={metrics.paymentVelocity.medianDays}
          fastestDays={metrics.paymentVelocity.fastestDays}
          slowestDays={metrics.paymentVelocity.slowestDays}
          trend={metrics.paymentVelocity.trend}
        />
      </div>

      {/* Cash Flow Forecast */}
      <CashFlowForecast />
    </div>
  );
}
