import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/lib/api/admin';
import { toast } from 'sonner';

export function useAdmin() {
  const queryClient = useQueryClient();

  const metricsQuery = useQuery({
    queryKey: ['admin', 'metrics'],
    queryFn: async () => { const res = await adminApi.getSystemMetrics(); return res as any; },
    retry: 1,
  });

  const sectorsQuery = useQuery({
    queryKey: ['admin', 'sectors'],
    queryFn: async () => { const res = await adminApi.getSectorPerformance(); return res as any; },
    retry: 1,
  });

  const usersQuery = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: async () => { const res = await adminApi.getAdminUsers(); return res as any; },
    retry: 1,
  });

  const auditLogsQuery = useQuery({
    queryKey: ['admin', 'audit-logs'],
    queryFn: async () => { const res = await adminApi.getAuditLogs(); return res as any; },
    retry: 1,
  });

  const createUserMutation = useMutation({
    mutationFn: adminApi.createAdminUser,
    onSuccess: () => {
      toast.success('Admin user created');
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const exportMutation = useMutation({
    mutationFn: (config: any) => adminApi.exportAnonymizedData(config),
    onSuccess: (data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'anonymized-export.xlsx';
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Export downloaded');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return {
    metrics: metricsQuery.data as any,
    metricsLoading: metricsQuery.isLoading,
    sectors: sectorsQuery.data as any,
    users: usersQuery.data as any,
    auditLogs: auditLogsQuery.data as any,
    createUser: createUserMutation.mutate,
    exportData: exportMutation.mutate,
  };
}
