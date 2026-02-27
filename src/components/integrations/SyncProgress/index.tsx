'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { integrationsApi } from '@/lib/api/integrations';
import { Progress } from '@/components/ui/progress';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

interface SyncProgressProps {
  integrationId: string;
}

export function SyncProgress({ integrationId }: SyncProgressProps) {
  const [progress, setProgress] = useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ['integration', integrationId, 'sync', 'status'],
    queryFn: () => integrationsApi.getSyncStatus(integrationId),
    refetchInterval: 2000, // Poll every 2 seconds
  });

  useEffect(() => {
    if (data?.progress) {
      setProgress(data.progress);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center text-error text-sm">
        <XCircle className="h-4 w-4 mr-2" />
        Sync failed
      </div>
    );
  }

  if (data?.status === 'completed') {
    return (
      <div className="flex items-center text-success text-sm">
        <CheckCircle className="h-4 w-4 mr-2" />
        Sync completed
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs">
        <span className="text-gray-500">Syncing...</span>
        <span className="font-medium">{progress}%</span>
      </div>
      <Progress value={progress} className="h-1" />
    </div>
  );
}
