import apiClient from './client';
import { 
  Integration, 
  IntegrationProvider, 
  IntegrationSettings, 
  SyncResult,
  OAuthConfig,
  WebhookEndpoint 
} from '@/types/integrations';

export const integrationsApi = {
  // Get all integrations
  getAll: async (provider?: IntegrationProvider): Promise<Integration[]> => {
    return apiClient.get('/integrations', { params: { provider } });
  },

  // Get integration by ID
  getById: async (id: string): Promise<Integration> => {
    return apiClient.get(`/integrations/${id}`);
  },

  // Connect integration
  connect: async (data: {
    provider: IntegrationProvider;
    accountEmail: string;
    accessToken: string;
    refreshToken?: string;
    expiresAt?: Date;
    scopes: string[];
    settings?: IntegrationSettings;
  }): Promise<Integration> => {
    return apiClient.post('/integrations', data);
  },

  // Disconnect integration
  disconnect: async (id: string): Promise<void> => {
    return apiClient.delete(`/integrations/${id}`);
  },

  // Sync integration
  sync: async (id: string): Promise<SyncResult> => {
    return apiClient.post(`/integrations/${id}/sync`);
  },

  // Get sync status
  getSyncStatus: async (id: string): Promise<{ status: string; progress?: number }> => {
    return apiClient.get(`/integrations/${id}/sync/status`);
  },

  // Update settings
  updateSettings: async (id: string, settings: IntegrationSettings): Promise<Integration> => {
    return apiClient.put(`/integrations/${id}/settings`, settings);
  },

  // Get integration status
  getStatus: async (id: string): Promise<any> => {
    return apiClient.get(`/integrations/${id}/status`);
  },

  // Get OAuth URL
  getOAuthUrl: async (provider: IntegrationProvider): Promise<{ url: string }> => {
    return apiClient.get(`/integrations/oauth/${provider}`);
  },

  // Handle OAuth callback
  handleOAuthCallback: async (provider: IntegrationProvider, code: string, state?: string): Promise<Integration> => {
    return apiClient.post(`/integrations/oauth/${provider}/callback`, { code, state });
  },

  // Get webhook endpoints
  getWebhooks: async (): Promise<WebhookEndpoint[]> => {
    return apiClient.get('/integrations/webhooks');
  },

  // Test integration
  test: async (id: string): Promise<{ success: boolean; message: string }> => {
    return apiClient.post(`/integrations/${id}/test`);
  },

  // Get provider statistics
  getStats: async (): Promise<any[]> => {
    return apiClient.get('/integrations/stats');
  },
};
