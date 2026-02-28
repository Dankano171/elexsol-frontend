export type IntegrationProvider = 'zoho' | 'whatsapp' | 'quickbooks';

export interface Integration {
  id: string;
  provider: IntegrationProvider;
  name: string;
  description: string;
  accountEmail?: string;
  status: 'active' | 'expired' | 'revoked' | 'pending' | 'disconnected';
  syncStatus: 'idle' | 'syncing' | 'failed';
  lastSyncAt?: string;
  tokenExpiresAt?: string;
  invoiceCount?: number;
  icon: string;
}
