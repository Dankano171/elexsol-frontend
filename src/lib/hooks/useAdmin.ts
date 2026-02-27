import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/lib/api/admin';
import { ExportConfig } from '@/types/admin';
import { toast } from 'sonner';

export const useAdmin = () => {
  const queryClient = useQueryClient();

  // Get system metrics
  const metricsQuery = useQuery({
    queryKey: ['admin', 'metrics'],
    queryFn: () => adminApi.getSystemMetrics(),
    refetchInterval: 60000, // Update every minute
  });

  // Get sector performance
  const sectorsQuery = useQuery({
    queryKey: ['admin', 'sectors'],
    queryFn: () => adminApi.getSectorPerformance(),
    refetchInterval: 300000, // Update every 5 minutes
  });

  // Get admin users
  const usersQuery = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: () => adminApi.getAdminUsers(),
  });

  // Get audit logs
  const auditLogsQuery = useQuery({
    queryKey: ['admin', 'audit-logs'],
    queryFn: () => adminApi.getAuditLogs(),
  });

  // Get system health
  const healthQuery = useQuery({
    queryKey: ['admin', 'health'],
    queryFn: () => adminApi.getSystemHealth(),
    refetchInterval: 30000, // Update every 30 seconds
  });

  // Create admin user
  const createUserMutation = useMutation({
    mutationFn: adminApi.createAdminUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast.success('Admin user created');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create admin user');
    },
  });

  // Update admin user
  const updateUserMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      adminApi.updateAdminUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast.success('Admin user updated');
    },
  });

  // Delete admin user
  const deleteUserMutation = useMutation({
    mutationFn: adminApi.deleteAdminUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast.success('Admin user deleted');
    },
  });

  // Export data
  const exportMutation = useMutation({
    mutationFn: (config: ExportConfig) => adminApi.exportAnonymizedData(config),
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `export-${new Date().toISOString()}.${config.format}`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success('Export completed');
    },
    onError: (error: Error) => {
      toast.error('Export failed');
    },
  });

  // Run diagnostic
  const diagnosticMutation = useMutation({
    mutationFn: (deep?: boolean) => adminApi.runDiagnostic(deep),
    onSuccess: (data) => {
      toast.success('Diagnostic completed');
      return data;
    },
  });

  return {
    // Queries
    metrics: metricsQuery.data,
    isLoadingMetrics: metricsQuery.isLoading,
    sectors: sectorsQuery.data,
    isLoadingSectors: sectorsQuery.isLoading,
    users: usersQuery.data,
    isLoadingUsers: usersQuery.isLoading,
    auditLogs: auditLogsQuery.data,
    isLoadingAuditLogs: auditLogsQuery.isLoading,
    health: healthQuery.data,
    isLoadingHealth: healthQuery.isLoading,

    // Mutations
    createUser: createUserMutation.mutate,
    isCreatingUser: createUserMutation.isPending,
    updateUser: updateUserMutation.mutate,
    isUpdatingUser: updateUserMutation.isPending,
    deleteUser: deleteUserMutation.mutate,
    isDeletingUser: deleteUserMutation.isPending,
    exportData: exportMutation.mutate,
    isExporting: exportMutation.isPending,
    runDiagnostic: diagnosticMutation.mutateAsync,
    isRunningDiagnostic: diagnosticMutation.isPending,

    // Refresh
    refresh: () => {
      queryClient.invalidateQueries({ queryKey: ['admin'] });
    },
  };
};
