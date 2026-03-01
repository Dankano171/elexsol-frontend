import apiClient from './client';

export const dashboardApi = {
  getMetrics: () =>
    apiClient.get('/dashboard/metrics'),
  getRevenueChart: (period: 'week' | 'month' | 'quarter' | 'year' = 'month') =>
    apiClient.get('/dashboard/charts/revenue', { params: { period } }),
  getPaymentVelocity: (period: 'month' | 'quarter' = 'month') =>
    apiClient.get('/dashboard/charts/payment-velocity', { params: { period } }),
  getCashFlowForecast: (days: number = 30) =>
    apiClient.get('/dashboard/cashflow/forecast', { params: { days } }),
  getActivityFeed: (limit: number = 20) =>
    apiClient.get('/dashboard/activity', { params: { limit } }),
};
