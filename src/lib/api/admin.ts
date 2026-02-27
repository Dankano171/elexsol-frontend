import apiClient from './client';
import { SystemMetrics, SectorPerformance, AdminUser, AuditLogEntry, ExportConfig, AnonymizedData } from '@/types/admin';

export const adminApi = {
  // Get system metrics
  getSystemMetrics: async (): Promise<SystemMetrics> => {
    return apiClient.get('/admin/metrics');
  },

  // Get sector performance
  getSectorPerformance: async (): Promise<SectorPerformance[]> => {
    return apiClient.get('/admin/sectors');
  },

  // Get admin users
  getAdminUsers: async (): Promise<AdminUser[]> => {
    return apiClient.get('/admin/users');
  },

  // Create admin user
  createAdminUser: async (data: { email: string; name: string; role: 'admin' | 'super_admin' }): Promise<AdminUser> => {
    return apiClient.post('/admin/users', data);
  },

  // Update admin user
  updateAdminUser: async (id: string, data: Partial<AdminUser>): Promise<AdminUser> => {
    return apiClient.put(`/admin/users/${id}`, data);
  },

  // Delete admin user
  deleteAdminUser: async (id: string): Promise<void> => {
    return apiClient.delete(`/admin/users/${id}`);
  },

  // Get audit logs
  getAuditLogs: async (params?: { from?: Date; to?: Date; adminId?: string }): Promise<AuditLogEntry[]> => {
    return apiClient.get('/admin/audit-logs', { params });
  },

  // Export anonymized data
  exportAnonymizedData: async (config: ExportConfig): Promise<Blob> => {
    return apiClient.post('/admin/export', config, {
      responseType: 'blob',
    });
  },

  // Get system health
  getSystemHealth: async (): Promise<any> => {
    return apiClient.get('/admin/health');
  },

  // Run diagnostic
  runDiagnostic: async (deep?: boolean): Promise<any> => {
    return apiClient.post('/admin/diagnostic', { deep });
  },

  // Get integration health
  getIntegrationHealth: async (): Promise<any> => {
    return apiClient.get('/admin/integrations/health');
  },
};
