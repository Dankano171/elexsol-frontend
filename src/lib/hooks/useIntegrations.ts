import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { integrationsApi } from '@/lib/api/integrations';
import { IntegrationProvider, IntegrationSettings } from '@/types/integrations';
import { toast } from 'sonner';

export const useIntegrations = () => {
  const queryClient = useQueryClient();

  // Get all integrations
  const integrationsQuery = useQuery({
    queryKey: ['integrations'],
    queryFn: () => integrationsApi.getAll(),
    refetchInterval: 60000, // Refetch every minute
  });

  // Connect integration
  const connectMutation = useMutation({
    mutationFn: integrationsApi.connect,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['integrations'] });
      toast.success(`${data.provider} connected successfully`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to connect integration');
    },
  });

  // Disconnect integration
  const disconnectMutation = useMutation({
    mutationFn: integrationsApi.disconnect,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['integrations'] });
      toast.success('Integration disconnected');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to disconnect');
    },
  });

  // Sync integration
  const syncMutation = useMutation({
    mutationFn: integrationsApi.sync,
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: ['integrations'] });
      queryClient.invalidateQueries({ queryKey: ['integration', id] });
      toast.success(`Synced ${data.recordsSynced} records`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Sync failed');
    },
  });

  // Update settings
  const updateSettingsMutation = useMutation({
    mutationFn: ({ id, settings }: { id: string; settings: IntegrationSettings }) =>
      integrationsApi.updateSettings(id, settings),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['integrations'] });
      queryClient.invalidateQueries({ queryKey: ['integration', data.id] });
      toast.success('Settings updated');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update settings');
    },
  });

  // Get OAuth URL
  const getOAuthUrlMutation = useMutation({
    mutationFn: integrationsApi.getOAuthUrl,
  });

  // Test integration
  const testMutation = useMutation({
    mutationFn: integrationsApi.test,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Connection test successful');
      } else {
        toast.error(result.message);
      }
    },
  });

  return {
    integrations: integrationsQuery.data,
    isLoading: integrationsQuery.isLoading,
    error: integrationsQuery.error,

    connect: connectMutation.mutate,
    isConnecting: connectMutation.isPending,

    disconnect: disconnectMutation.mutate,
    isDisconnecting: disconnectMutation.isPending,

    sync: syncMutation.mutate,
    isSyncing: syncMutation.isPending,

    updateSettings: updateSettingsMutation.mutate,
    isUpdating: updateSettingsMutation.isPending,

    getOAuthUrl: getOAuthUrlMutation.mutateAsync,
    test: testMutation.mutate,

    refresh: () => {
      queryClient.invalidateQueries({ queryKey: ['integrations'] });
    },
  };
};

// Hook for single integration
export const useIntegration = (id: string) => {
  const queryClient = useQueryClient();

  const integrationQuery = useQuery({
    queryKey: ['integration', id],
    queryFn: () => integrationsApi.getById(id),
    enabled: !!id,
  });

  const syncMutation = useMutation({
    mutationFn: () => integrationsApi.sync(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['integration', id] });
      toast.success(`Synced ${data.recordsSynced} records`);
    },
  });

  return {
    integration: integrationQuery.data,
    isLoading: integrationQuery.isLoading,
    error: integrationQuery.error,
    sync: syncMutation.mutate,
    isSyncing: syncMutation.isPending,
  };
};
