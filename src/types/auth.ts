export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  businessId: string;
  role: 'admin' | 'manager' | 'staff' | 'super_admin';
  permissions: string[];
  mfaEnabled: boolean;
  mfaVerified?: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
  mfaCode?: string;
  rememberMe?: boolean;
}

export interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  businessName: string;
  businessTin: string;
  industry: string;
}

export interface AuthResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
  };
  requiresMFA: boolean;
}

export interface MFAConfig {
  secret: string;
  qrCode: string;
  backupCodes: string[];
}

export interface PasswordRequirements {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
}
