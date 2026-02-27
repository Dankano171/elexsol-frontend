export interface SystemMetrics {
  timestamp: Date;
  businesses: {
    total: number;
    active: number;
    pending: number;
    suspended: number;
    growth: number;
  };
  users: {
    total: number;
    active: number;
    withMFA: number;
    admins: number;
  };
  financials: {
    totalRevenue: number;
    monthlyRevenue: number;
    averageTransaction: number;
    pendingPayouts: number;
  };
  invoices: {
    total: number;
    processed: number;
    failed: number;
    averageValue: number;
  };
  integrations: {
    total: number;
    active: number;
    failed: number;
    byProvider: Record<string, number>;
  };
  performance: {
    apiLatency: number;
    errorRate: number;
    queueSize: number;
    uptime: number;
  };
}

export interface SectorPerformance {
  sector: string;
  businessCount: number;
  totalRevenue: number;
  averageVelocity: number;
  complianceRate: number;
  growthRate: number;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'super_admin';
  lastLogin?: Date;
  mfaEnabled: boolean;
  permissions: string[];
  createdAt: Date;
}

export interface AuditLogEntry {
  id: string;
  timestamp: Date;
  adminId: string;
  adminEmail: string;
  action: string;
  entityType: string;
  entityId?: string;
  details: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

export interface ExportConfig {
  format: 'xlsx' | 'csv' | 'pdf';
  dateRange: {
    from: Date;
    to: Date;
  };
  sectors?: string[];
  metrics?: string[];
  anonymize: boolean;
}

export interface AnonymizedData {
  id: string;
  sector: string;
  revenue: number;
  velocity: number;
  complianceRate: number;
  size: 'micro' | 'small' | 'medium' | 'large';
  region: string;
}
