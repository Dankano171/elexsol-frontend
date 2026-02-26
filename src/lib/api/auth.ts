import apiClient from './client';
import { LoginCredentials, SignupData, MFAConfig, AuthResponse } from '@/types/auth';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return apiClient.post('/auth/login', credentials);
  },

  signup: async (data: SignupData): Promise<AuthResponse> => {
    return apiClient.post('/auth/register', data);
  },

  logout: async (): Promise<void> => {
    return apiClient.post('/auth/logout');
  },

  refreshToken: async (): Promise<{ accessToken: string }> => {
    return apiClient.post('/auth/refresh');
  },

  setupMFA: async (): Promise<MFAConfig> => {
    return apiClient.post('/auth/mfa/setup');
  },

  verifyMFA: async (code: string): Promise<{ success: boolean }> => {
    return apiClient.post('/auth/mfa/verify', { code });
  },

  disableMFA: async (code: string): Promise<{ success: boolean }> => {
    return apiClient.post('/auth/mfa/disable', { code });
  },

  changePassword: async (oldPassword: string, newPassword: string): Promise<void> => {
    return apiClient.post('/auth/change-password', { oldPassword, newPassword });
  },

  forgotPassword: async (email: string): Promise<void> => {
    return apiClient.post('/auth/forgot-password', { email });
  },

  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    return apiClient.post('/auth/reset-password', { token, newPassword });
  },

  getCurrentUser: async (): Promise<any> => {
    return apiClient.get('/auth/me');
  },
};
