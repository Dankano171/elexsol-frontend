export type IntegrationProvider = 'zoho' | 'whatsapp' | 'quickbooks';

export interface Integration {
  id: string;
  provider: IntegrationProvider;
  accountEmail: string;
  accountId?: string;
  status: 'active' | 'expired' | 'revoked' | 'pending';
  syncStatus: 'idle' | 'syncing' | 'failed';
  lastSyncAt?: Date;
  tokenExpiresAt?: Date;
  scopes: string[];
  settings: IntegrationSettings;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface IntegrationSettings {
  syncContacts?: boolean;
  syncInvoices?: boolean;
  syncMessages?: boolean;
  autoSync?: boolean;
  syncInterval?: number; // minutes
  webhookEvents?: string[];
  [key: string]: any;
}

export interface IntegrationHealth {
  healthy: boolean;
  issues: string[];
  lastCheck: Date;
}

export interface SyncResult {
  success: boolean;
  recordsSynced: number;
  errors?: string[];
  warnings?: string[];
  completedAt: Date;
}

export interface OAuthConfig {
  authUrl: string;
  clientId: string;
  redirectUri: string;
  scope: string;
  state: string;
}

export interface WebhookEndpoint {
  id: string;
  url: string;
  events: string[];
  secret: string;
  createdAt: Date;
}
