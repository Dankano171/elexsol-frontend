import apiClient from './client';
import { LoginCredentials, SignupData } from '@/types/auth';

export const authApi = {
  login: (credentials: LoginCredentials) =>
    apiClient.post('/auth/login', credentials),
  register: (data: SignupData) =>
    apiClient.post('/auth/register', data),
  logout: () =>
    apiClient.post('/auth/logout'),
  refreshToken: () =>
    apiClient.post('/auth/refresh'),
  setupMFA: () =>
    apiClient.post('/auth/mfa/setup'),
  verifyMFA: (code: string) =>
    apiClient.post('/auth/mfa/verify', { code }),
  disableMFA: (code: string) =>
    apiClient.post('/auth/mfa/disable', { code }),
  changePassword: (oldPassword: string, newPassword: string) =>
    apiClient.post('/auth/change-password', { oldPassword, newPassword }),
  forgotPassword: (email: string) =>
    apiClient.post('/auth/forgot-password', { email }),
  resetPassword: (token: string, newPassword: string) =>
    apiClient.post('/auth/reset-password', { token, newPassword }),
  getCurrentUser: () =>
    apiClient.get('/auth/me'),
};
