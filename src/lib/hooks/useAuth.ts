import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/store/authStore';
import { LoginCredentials, SignupData } from '@/types/auth';
import { toast } from 'sonner';

export function useAuth() {
  const navigate = useNavigate();
  const { setAuth, clearAuth, user, isAuthenticated } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data: any) => {
      setAuth(data.user, data.accessToken);
      toast.success('Welcome back!');
      if (data.mfaRequired) {
        navigate('/mfa-verify');
      } else {
        navigate('/dashboard');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Login failed');
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: SignupData) => authApi.register(data),
    onSuccess: () => {
      toast.success('Account created! Please sign in.');
      navigate('/login');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Registration failed');
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      clearAuth();
      navigate('/login');
    },
    onError: () => {
      clearAuth();
      navigate('/login');
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: ({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }) =>
      authApi.changePassword(oldPassword, newPassword),
    onSuccess: () => toast.success('Password updated'),
    onError: (error: Error) => toast.error(error.message || 'Failed to update password'),
  });

  const setupMFAMutation = useMutation({
    mutationFn: () => authApi.setupMFA(),
    onError: (error: Error) => toast.error(error.message),
  });

  const verifyMFAMutation = useMutation({
    mutationFn: (code: string) => authApi.verifyMFA(code),
    onSuccess: () => {
      toast.success('MFA verified');
      navigate('/dashboard');
    },
    onError: (error: Error) => toast.error(error.message || 'Invalid MFA code'),
  });

  const currentUserQuery = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authApi.getCurrentUser(),
    enabled: isAuthenticated,
    retry: false,
  });

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutate,
    loginLoading: loginMutation.isPending,
    register: registerMutation.mutate,
    registerLoading: registerMutation.isPending,
    logout: logoutMutation.mutate,
    changePassword: changePasswordMutation.mutate,
    setupMFA: setupMFAMutation,
    verifyMFA: verifyMFAMutation.mutate,
    currentUser: currentUserQuery,
  };
}
