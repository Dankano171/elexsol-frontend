import apiClient from './client';

export const integrationsApi = {
  getAll: () =>
    apiClient.get('/integrations'),
  getById: (id: string) =>
    apiClient.get(`/integrations/${id}`),
  connect: (data: { provider: string; accountEmail: string; accessToken: string; refreshToken?: string; expiresAt?: string; scopes: string[]; settings?: any }) =>
    apiClient.post('/integrations', data),
  disconnect: (id: string) =>
    apiClient.delete(`/integrations/${id}`),
  sync: (id: string) =>
    apiClient.post(`/integrations/${id}/sync`),
  getSyncStatus: (id: string) =>
    apiClient.get(`/integrations/${id}/sync/status`),
  updateSettings: (id: string, settings: any) =>
    apiClient.put(`/integrations/${id}/settings`, settings),
  getStatus: (id: string) =>
    apiClient.get(`/integrations/${id}/status`),
  getOAuthUrl: (provider: string) =>
    apiClient.get(`/integrations/oauth/${provider}`),
  handleOAuthCallback: (provider: string, code: string, state?: string) =>
    apiClient.post(`/integrations/oauth/${provider}/callback`, { code, state }),
};
