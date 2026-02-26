import apiClient from './client';
import { DashboardMetrics, RevenueChartData, PaymentVelocityData, ActivityItem } from '@/types/dashboard';

export const dashboardApi = {
  getMetrics: async (): Promise<DashboardMetrics> => {
    return apiClient.get('/dashboard/metrics');
  },

  getRevenueChart: async (period: 'week' | 'month' | 'quarter' | 'year' = 'month'): Promise<RevenueChartData> => {
    return apiClient.get('/dashboard/charts/revenue', { params: { period } });
  },

  getPaymentVelocityChart: async (period: 'month' | 'quarter' = 'month'): Promise<PaymentVelocityData> => {
    return apiClient.get('/dashboard/charts/payment-velocity', { params: { period } });
  },

  getActivityFeed: async (limit: number = 20): Promise<ActivityItem[]> => {
    return apiClient.get('/dashboard/activity', { params: { limit } });
  },

  getCashFlowForecast: async (days: number = 30): Promise<{ date: string; amount: number }[]> => {
    return apiClient.get('/dashboard/cashflow/forecast', { params: { days } });
  },

  acknowledgeActivity: async (activityId: string): Promise<void> => {
    return apiClient.post(`/dashboard/activity/${activityId}/acknowledge`);
  },

  dismissActivity: async (activityId: string): Promise<void> => {
    return apiClient.post(`/dashboard/activity/${activityId}/dismiss`);
  },
};
