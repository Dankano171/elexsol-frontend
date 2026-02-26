import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/store/authStore';
import { LoginCredentials, SignupData } from '@/types/auth';
import { toast } from 'sonner';

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, setUser, clearUser, isAuthenticated } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data) => {
      setUser(data.user);
      toast.success('Login successful');
      router.push('/dashboard');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Login failed');
    },
  });

  const signupMutation = useMutation({
    mutationFn: (data: SignupData) => authApi.signup(data),
    onSuccess: (data) => {
      setUser(data.user);
      toast.success('Account created successfully');
      router.push('/dashboard');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Signup failed');
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      clearUser();
      queryClient.clear();
      toast.success('Logged out successfully');
      router.push('/login');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Logout failed');
    },
  });

  const setupMFAMutation = useMutation({
    mutationFn: authApi.setupMFA,
    onSuccess: (data) => {
      toast.success('MFA setup initiated');
      return data;
    },
    onError: (error: Error) => {
      toast.error(error.message || 'MFA setup failed');
    },
  });

  const verifyMFAMutation = useMutation({
    mutationFn: (code: string) => authApi.verifyMFA(code),
    onSuccess: () => {
      toast.success('MFA verified successfully');
      router.push('/dashboard');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'MFA verification failed');
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: ({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }) =>
      authApi.changePassword(oldPassword, newPassword),
    onSuccess: () => {
      toast.success('Password changed successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Password change failed');
    },
  });

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutate,
    signup: signupMutation.mutate,
    logout: logoutMutation.mutate,
    setupMFA: setupMFAMutation.mutate,
    verifyMFA: verifyMFAMutation.mutate,
    changePassword: changePasswordMutation.mutate,
    isLoading: loginMutation.isPending || signupMutation.isPending,
  };
};
