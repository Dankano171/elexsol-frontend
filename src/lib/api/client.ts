import axios from 'axios';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.elexsol.com/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor - adds auth token
apiClient.interceptors.request.use((config) => {
  const authStorage = localStorage.getItem('auth-storage');
  if (authStorage) {
    try {
      const { state } = JSON.parse(authStorage);
      if (state?.token) {
        config.headers.Authorization = `Bearer ${state.token}`;
      }
    } catch {}
  }
  return config;
});

// Response interceptor - handles errors globally
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized - token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(`${API_BASE_URL}/auth/refresh`, {}, { withCredentials: true });
        if (res.data?.accessToken) {
          const authStorage = localStorage.getItem('auth-storage');
          if (authStorage) {
            const parsed = JSON.parse(authStorage);
            parsed.state.token = res.data.accessToken;
            localStorage.setItem('auth-storage', JSON.stringify(parsed));
          }
          originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
          return apiClient(originalRequest);
        }
      } catch {
        localStorage.removeItem('auth-storage');
        window.location.href = '/login';
        return Promise.reject(new Error('Session expired. Please sign in again.'));
      }
    }

    // Global error toast for 4xx / 5xx / timeout
    const status = error.response?.status;
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message;

    if (error.code === 'ECONNABORTED') {
      toast.error('Request timed out. Please check your connection and try again.');
    } else if (status && status >= 500) {
      toast.error('Server error. Our team has been notified. Please try again later.');
    } else if (status === 403) {
      toast.error('You do not have permission to perform this action.');
    } else if (status !== 401) {
      // Don't toast 401 — handled above via redirect
      toast.error(errorMessage || 'Something went wrong. Please try again.');
    }

    return Promise.reject(new Error(errorMessage));
  }
);

export default apiClient;
