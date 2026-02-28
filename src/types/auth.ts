export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  businessName: string;
  businessId: string;
  role: 'admin' | 'manager' | 'staff' | 'super_admin';
  mfaEnabled: boolean;
  mfaVerified?: boolean;
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
  businessName: string;
  tin: string;
  industry: string;
  state: string;
  phone: string;
}
