import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { integrationsApi } from '@/lib/api/integrations';
import { mockIntegrations } from '@/lib/mock-data';
import { isDemoAccount } from '@/lib/utils/isDemoAccount';
import { toast } from 'sonner';

export function useIntegrations() {
  const queryClient = useQueryClient();
  const demo = isDemoAccount();

  const listQuery = useQuery({
    queryKey: ['integrations'],
    queryFn: () => integrationsApi.getAll() as Promise<any>,
    enabled: !demo,
    retry: 1,
  });

  const syncMutation = useMutation({
    mutationFn: (id: string) => integrationsApi.sync(id),
    onSuccess: () => {
      toast.success('Sync started');
      queryClient.invalidateQueries({ queryKey: ['integrations'] });
    },
    onError: (error: Error) => toast.error(error.message || 'Sync failed'),
  });

  const disconnectMutation = useMutation({
    mutationFn: (id: string) => integrationsApi.disconnect(id),
    onSuccess: () => {
      toast.success('Integration disconnected');
      queryClient.invalidateQueries({ queryKey: ['integrations'] });
    },
    onError: (error: Error) => toast.error(error.message || 'Disconnect failed'),
  });

  const connectMutation = useMutation({
    mutationFn: (data: Parameters<typeof integrationsApi.connect>[0]) => integrationsApi.connect(data),
    onSuccess: () => {
      toast.success('Integration connected');
      queryClient.invalidateQueries({ queryKey: ['integrations'] });
    },
    onError: (error: Error) => toast.error(error.message || 'Connection failed'),
  });

  if (demo) {
    return {
      integrations: mockIntegrations,
      isLoading: false,
      error: null,
      refetch: () => {},
      sync: syncMutation.mutate,
      syncing: false,
      disconnect: disconnectMutation.mutate,
      connect: connectMutation.mutate,
    };
  }

  return {
    integrations: listQuery.data ?? [],
    isLoading: listQuery.isLoading,
    error: listQuery.error,
    refetch: listQuery.refetch,
    sync: syncMutation.mutate,
    syncing: syncMutation.isPending,
    disconnect: disconnectMutation.mutate,
    connect: connectMutation.mutate,
  };
}
