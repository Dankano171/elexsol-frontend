import apiClient from './client';

export const adminApi = {
  getSystemMetrics: () =>
    apiClient.get('/admin/metrics'),
  getSectorPerformance: () =>
    apiClient.get('/admin/sectors'),
  getAdminUsers: () =>
    apiClient.get('/admin/users'),
  createAdminUser: (data: { email: string; name: string; role: 'admin' | 'super_admin' }) =>
    apiClient.post('/admin/users', data),
  updateAdminUser: (id: string, data: any) =>
    apiClient.put(`/admin/users/${id}`, data),
  deleteAdminUser: (id: string) =>
    apiClient.delete(`/admin/users/${id}`),
  getAuditLogs: (params?: any) =>
    apiClient.get('/admin/audit-logs', { params }),
  exportAnonymizedData: (config: any) =>
    apiClient.post('/admin/export', config, { responseType: 'blob' } as any),
  getSystemHealth: () =>
    apiClient.get('/admin/health'),
};
