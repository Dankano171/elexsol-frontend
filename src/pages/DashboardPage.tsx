import DashboardLayout from '@/components/layout/DashboardLayout';
import KPICard from '@/components/dashboard/KPICard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import ApiErrorState from '@/components/shared/ApiErrorState';
import EmptyState from '@/components/shared/EmptyState';
import { useDashboard } from '@/lib/hooks/useDashboard';
import { isDemoAccount } from '@/lib/utils/isDemoAccount';
import { useOnboardingStore } from '@/lib/store/onboardingStore';
import { formatCompactNaira, formatPercentage } from '@/lib/utils/format';
import { DollarSign, Gauge, TrendingUp, AlertCircle, LayoutDashboard } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { metrics: m, metricsLoading, metricsError, refetchMetrics } = useDashboard();
  const demo = isDemoAccount();
  const { isOnboardingComplete } = useOnboardingStore();
  const showPopulated = demo || isOnboardingComplete();

  return (
    <DashboardLayout title="Dashboard" subtitle="Financial overview for your business">
      {!showPopulated ? (
        <EmptyState
          icon={LayoutDashboard}
          title="Welcome to Elexsol"
          description="Your financial dashboard will come alive once you connect your accounting sources and configure FIRS credentials. Complete your setup to unlock real-time analytics and compliance tracking."
          ctaLabel="Complete Setup"
          ctaLink="/settings"
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {metricsLoading ? (
              Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)
            ) : metricsError ? (
              <div className="col-span-full">
                <ApiErrorState message={(metricsError as Error).message} onRetry={refetchMetrics} />
              </div>
            ) : (
              <>
                <KPICard
                  title="Total Revenue" value={formatCompactNaira(m.revenue.total)}
                  subtitle="vs last period" trendValue={formatPercentage(m.revenue.growth)}
                  icon={DollarSign} trend={m.revenue.trend} variant="primary" delay={0}
                />
                <KPICard
                  title="Monthly Revenue" value={formatCompactNaira(m.revenue.monthly)}
                  subtitle="this month" trendValue={formatPercentage(m.revenue.growth)}
                  icon={TrendingUp} trend="up" delay={0.08}
                />
                <KPICard
                  title="Payment Velocity" value={`${m.paymentVelocity.averageDays} days`}
                  subtitle="avg collection" trendValue="improving"
                  icon={Gauge} trend="up" variant="success" delay={0.16}
                />
                <KPICard
                  title="Outstanding" value={formatCompactNaira(m.outstanding.total)}
                  subtitle={`${m.outstanding.overdue} overdue`} trendValue={`${m.outstanding.count} invoices`}
                  icon={AlertCircle} trend="down" delay={0.24}
                />
              </>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3">
              <RevenueChart />
            </div>
            <div className="lg:col-span-2">
              <ActivityFeed />
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
