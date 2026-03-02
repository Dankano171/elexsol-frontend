import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api/dashboard';
import { useDashboardStore } from '@/lib/store/dashboardStore';
import { mockMetrics, mockChartData, mockActivities } from '@/lib/mock-data';
import { isDemoAccount } from '@/lib/utils/isDemoAccount';

export function useDashboard() {
  const { chartPeriod } = useDashboardStore();
  const demo = isDemoAccount();

  const metricsQuery = useQuery({
    queryKey: ['dashboard', 'metrics'],
    queryFn: () => dashboardApi.getMetrics() as Promise<any>,
    enabled: !demo,
    retry: 1,
  });

  const revenueChartQuery = useQuery({
    queryKey: ['dashboard', 'revenue-chart', chartPeriod],
    queryFn: () => dashboardApi.getRevenueChart(chartPeriod) as Promise<any>,
    enabled: !demo,
    retry: 1,
  });

  const activityQuery = useQuery({
    queryKey: ['dashboard', 'activity'],
    queryFn: () => dashboardApi.getActivityFeed(20) as Promise<any>,
    enabled: !demo,
    retry: 1,
  });

  if (demo) {
    return {
      metrics: mockMetrics,
      metricsLoading: false,
      metricsError: null,
      chartData: mockChartData,
      chartLoading: false,
      chartError: null,
      activities: mockActivities,
      activitiesLoading: false,
      activitiesError: null,
      refetchMetrics: () => {},
      refetchChart: () => {},
      refetchActivities: () => {},
    };
  }

  return {
    metrics: metricsQuery.data ?? mockMetrics,
    metricsLoading: metricsQuery.isLoading,
    metricsError: metricsQuery.error,
    chartData: revenueChartQuery.data ?? mockChartData,
    chartLoading: revenueChartQuery.isLoading,
    chartError: revenueChartQuery.error,
    activities: activityQuery.data ?? mockActivities,
    activitiesLoading: activityQuery.isLoading,
    activitiesError: activityQuery.error,
    refetchMetrics: metricsQuery.refetch,
    refetchChart: revenueChartQuery.refetch,
    refetchActivities: activityQuery.refetch,
  };
}
