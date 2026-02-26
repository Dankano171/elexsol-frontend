import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api/dashboard';
import { toast } from 'sonner';

export const useDashboard = () => {
  const queryClient = useQueryClient();

  const metricsQuery = useQuery({
    queryKey: ['dashboard', 'metrics'],
    queryFn: () => dashboardApi.getMetrics(),
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  const revenueChartQuery = useQuery({
    queryKey: ['dashboard', 'revenue-chart'],
    queryFn: () => dashboardApi.getRevenueChart(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const paymentVelocityQuery = useQuery({
    queryKey: ['dashboard', 'payment-velocity'],
    queryFn: () => dashboardApi.getPaymentVelocityChart(),
    staleTime: 10 * 60 * 1000,
  });

  const activityFeedQuery = useQuery({
    queryKey: ['dashboard', 'activity'],
    queryFn: () => dashboardApi.getActivityFeed(),
    refetchInterval: 60 * 1000, // Refetch every minute
  });

  const cashFlowForecastQuery = useQuery({
    queryKey: ['dashboard', 'cashflow-forecast'],
    queryFn: () => dashboardApi.getCashFlowForecast(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });

  const acknowledgeActivityMutation = useMutation({
    mutationFn: (activityId: string) => dashboardApi.acknowledgeActivity(activityId),
    onSuccess: (_, activityId) => {
      queryClient.setQueryData(['dashboard', 'activity'], (oldData: any) => {
        if (!oldData) return oldData;
        return oldData.map((item: any) =>
          item.id === activityId ? { ...item, acknowledged: true } : item
        );
      });
    },
  });

  const dismissActivityMutation = useMutation({
    mutationFn: (activityId: string) => dashboardApi.dismissActivity(activityId),
    onSuccess: (_, activityId) => {
      queryClient.setQueryData(['dashboard', 'activity'], (oldData: any) => {
        if (!oldData) return oldData;
        return oldData.filter((item: any) => item.id !== activityId);
      });
      toast.success('Activity dismissed');
    },
  });

  return {
    metrics: metricsQuery.data,
    metricsLoading: metricsQuery.isLoading,
    metricsError: metricsQuery.error,

    revenueChart: revenueChartQuery.data,
    revenueChartLoading: revenueChartQuery.isLoading,

    paymentVelocity: paymentVelocityQuery.data,
    paymentVelocityLoading: paymentVelocityQuery.isLoading,

    activities: activityFeedQuery.data,
    activitiesLoading: activityFeedQuery.isLoading,

    cashFlowForecast: cashFlowForecastQuery.data,
    cashFlowForecastLoading: cashFlowForecastQuery.isLoading,

    acknowledgeActivity: acknowledgeActivityMutation.mutate,
    dismissActivity: dismissActivityMutation.mutate,

    refresh: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  };
};
