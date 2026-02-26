export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  
  // Protected routes
  DASHBOARD: '/dashboard',
  INTEGRATIONS: '/integrations',
  COMPLIANCE: '/compliance',
  INVOICES: '/invoices',
  REPORTS: '/reports',
  SETTINGS: '/settings',
  TEAM: '/team',
  
  // Admin routes
  ADMIN: '/admin',
};

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    MFA_SETUP: '/auth/mfa/setup',
    MFA_VERIFY: '/auth/mfa/verify',
    MFA_DISABLE: '/auth/mfa/disable',
    CHANGE_PASSWORD: '/auth/change-password',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    ME: '/auth/me',
  },
  
  DASHBOARD: {
    METRICS: '/dashboard/metrics',
    CHARTS: '/dashboard/charts',
  },
  
  INTEGRATIONS: {
    LIST: '/integrations',
    CONNECT: '/integrations/connect',
    SYNC: '/integrations/:id/sync',
    STATUS: '/integrations/:id/status',
  },
  
  COMPLIANCE: {
    FLAGGED: '/compliance/flagged',
    VALIDATE: '/compliance/validate',
    CLEAR: '/compliance/clear',
  },
  
  INVOICES: {
    LIST: '/invoices',
    CREATE: '/invoices',
    GET: '/invoices/:id',
    UPDATE: '/invoices/:id',
    DELETE: '/invoices/:id',
    SUBMIT_FIRS: '/invoices/:id/firs/submit',
    STATUS: '/invoices/:id/firs/status',
  },
};
