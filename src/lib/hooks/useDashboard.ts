import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api/dashboard';
import { useDashboardStore } from '@/lib/store/dashboardStore';
import { mockMetrics, mockChartData, mockActivities } from '@/lib/mock-data';

export function useDashboard() {
  const { chartPeriod } = useDashboardStore();

  const metricsQuery = useQuery({
    queryKey: ['dashboard', 'metrics'],
    queryFn: async () => {
      const res = await dashboardApi.getMetrics();
      return res as any;
    },
    retry: 1,
  });

  const revenueChartQuery = useQuery({
    queryKey: ['dashboard', 'revenue-chart', chartPeriod],
    queryFn: async () => {
      const res = await dashboardApi.getRevenueChart(chartPeriod);
      return res as any;
    },
    retry: 1,
  });

  const activityQuery = useQuery({
    queryKey: ['dashboard', 'activity'],
    queryFn: async () => {
      const res = await dashboardApi.getActivityFeed(20);
      return res as any;
    },
    retry: 1,
  });

  return {
    metrics: metricsQuery.data ?? mockMetrics,
    metricsLoading: metricsQuery.isLoading,
    chartData: revenueChartQuery.data ?? mockChartData,
    chartLoading: revenueChartQuery.isLoading,
    activities: activityQuery.data ?? mockActivities,
    activitiesLoading: activityQuery.isLoading,
  };
}
