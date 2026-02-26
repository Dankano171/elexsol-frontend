import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api/dashboard';
import { useDashboardStore } from '@/lib/store/dashboardStore';
import { subDays, subMonths, subQuarters, format } from 'date-fns';

export const useDashboardCharts = () => {
  const { chartPreferences } = useDashboardStore();

  const revenueChartQuery = useQuery({
    queryKey: ['dashboard', 'revenue-chart', chartPreferences.revenuePeriod],
    queryFn: () => dashboardApi.getRevenueChart(chartPreferences.revenuePeriod),
    staleTime: 5 * 60 * 1000,
  });

  const paymentVelocityQuery = useQuery({
    queryKey: ['dashboard', 'payment-velocity', chartPreferences.velocityPeriod],
    queryFn: () => dashboardApi.getPaymentVelocityChart(chartPreferences.velocityPeriod),
    staleTime: 5 * 60 * 1000,
  });

  const getDateRangeForPeriod = (period: 'week' | 'month' | 'quarter') => {
    const now = new Date();
    switch (period) {
      case 'week':
        return {
          start: subDays(now, 7),
          end: now,
          label: 'Last 7 days',
        };
      case 'month':
        return {
          start: subMonths(now, 1),
          end: now,
          label: 'Last 30 days',
        };
      case 'quarter':
        return {
          start: subQuarters(now, 1),
          end: now,
          label: 'Last 90 days',
        };
    }
  };

  const formatChartData = (data: any[], type: 'revenue' | 'velocity' | 'cashflow') => {
    if (!data) return [];

    switch (type) {
      case 'revenue':
        return data.map(item => ({
          ...item,
          formattedDate: format(new Date(item.date), 'MMM d'),
          formattedValue: new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
          }).format(item.value),
        }));

      case 'velocity':
        return data.map(item => ({
          ...item,
          formattedDate: format(new Date(item.date), 'MMM d'),
          formattedValue: `${item.value} days`,
        }));

      default:
        return data;
    }
  };

  const calculateChartMetrics = (data: any[]) => {
    if (!data || data.length === 0) return null;

    const values = data.map(d => d.value);
    const total = values.reduce((a, b) => a + b, 0);
    const average = total / values.length;
    const max = Math.max(...values);
    const min = Math.min(...values);
    const trend = values[values.length - 1] > values[0] ? 'up' : 'down';
    const growth = values[0] ? ((values[values.length - 1] - values[0]) / values[0]) * 100 : 0;

    return {
      total,
      average,
      max,
      min,
      trend,
      growth,
    };
  };

  return {
    revenueChart: {
      data: revenueChartQuery.data,
      formattedData: formatChartData(revenueChartQuery.data || [], 'revenue'),
      metrics: calculateChartMetrics(revenueChartQuery.data || []),
      loading: revenueChartQuery.isLoading,
      error: revenueChartQuery.error,
      dateRange: getDateRangeForPeriod(chartPreferences.revenuePeriod),
    },
    paymentVelocity: {
      data: paymentVelocityQuery.data,
      formattedData: formatChartData(paymentVelocityQuery.data || [], 'velocity'),
      metrics: calculateChartMetrics(paymentVelocityQuery.data || []),
      loading: paymentVelocityQuery.isLoading,
      error: paymentVelocityQuery.error,
      dateRange: getDateRangeForPeriod(chartPreferences.velocityPeriod),
    },
    refresh: () => {
      revenueChartQuery.refetch();
      paymentVelocityQuery.refetch();
    },
  };
};
