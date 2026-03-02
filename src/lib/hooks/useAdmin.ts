import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/lib/api/admin';
import { isDemoAccount } from '@/lib/utils/isDemoAccount';
import { toast } from 'sonner';

const mockAdminMetrics = { totalUsers: 2_418, activeSessions: 342, uptime: '99.9%', errorRate: '0.1%' };
const mockSectors = [
  { name: 'Technology', invoiceCount: 342, complianceRate: 97.2 },
  { name: 'Financial Services', invoiceCount: 287, complianceRate: 99.1 },
  { name: 'Manufacturing', invoiceCount: 198, complianceRate: 94.8 },
  { name: 'Oil & Gas', invoiceCount: 156, complianceRate: 98.3 },
  { name: 'Agriculture', invoiceCount: 124, complianceRate: 92.1 },
];
const mockUsers = [
  { id: '1', name: 'System Admin', email: 'admin@elexsol.ng', role: 'super_admin' },
  { id: '2', name: 'Ops Manager', email: 'ops@elexsol.ng', role: 'admin' },
];
const mockAuditLogs = [
  { action: 'User login', user: 'admin@elexsol.ng', ip: '102.89.xx.xx', timestamp: new Date(Date.now() - 3600000).toISOString() },
  { action: 'Export generated', user: 'ops@elexsol.ng', ip: '41.58.xx.xx', timestamp: new Date(Date.now() - 7200000).toISOString() },
  { action: 'Integration synced', user: 'system', ip: '—', timestamp: new Date(Date.now() - 10800000).toISOString() },
];

export function useAdmin() {
  const queryClient = useQueryClient();
  const demo = isDemoAccount();

  const metricsQuery = useQuery({
    queryKey: ['admin', 'metrics'],
    queryFn: () => adminApi.getSystemMetrics() as Promise<any>,
    enabled: !demo,
    retry: 1,
  });

  const sectorsQuery = useQuery({
    queryKey: ['admin', 'sectors'],
    queryFn: () => adminApi.getSectorPerformance() as Promise<any>,
    enabled: !demo,
    retry: 1,
  });

  const usersQuery = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: () => adminApi.getAdminUsers() as Promise<any>,
    enabled: !demo,
    retry: 1,
  });

  const auditLogsQuery = useQuery({
    queryKey: ['admin', 'audit-logs'],
    queryFn: () => adminApi.getAuditLogs() as Promise<any>,
    enabled: !demo,
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

  if (demo) {
    return {
      metrics: mockAdminMetrics,
      metricsLoading: false,
      metricsError: null,
      sectors: mockSectors,
      sectorsError: null,
      users: mockUsers,
      usersError: null,
      auditLogs: mockAuditLogs,
      auditLogsError: null,
      refetchMetrics: () => {},
      createUser: createUserMutation.mutate,
      exportData: exportMutation.mutate,
    };
  }

  return {
    metrics: metricsQuery.data as any,
    metricsLoading: metricsQuery.isLoading,
    metricsError: metricsQuery.error,
    sectors: sectorsQuery.data as any,
    sectorsError: sectorsQuery.error,
    users: usersQuery.data as any,
    usersError: usersQuery.error,
    auditLogs: auditLogsQuery.data as any,
    auditLogsError: auditLogsQuery.error,
    refetchMetrics: metricsQuery.refetch,
    createUser: createUserMutation.mutate,
    exportData: exportMutation.mutate,
  };
}
