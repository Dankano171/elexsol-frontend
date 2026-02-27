'use client';

import { useQuery } from '@tanstack/react-query';
import { integrationsApi } from '@/lib/api/integrations';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle, Loader2 } from 'lucide-react';

interface HealthStatusProps {
  integrationId: string;
}

export function HealthStatus({ integrationId }: HealthStatusProps) {
  const { data: status, isLoading } = useQuery({
    queryKey: ['integration', integrationId, 'health'],
    queryFn: () => integrationsApi.getStatus(integrationId),
    refetchInterval: 60000, // Refetch every minute
  });

  if (isLoading) {
    return (
      <div className="flex items-center text-gray-400">
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
        <span className="text-xs">Checking health...</span>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="flex items-center text-error">
        <XCircle className="h-4 w-4 mr-2" />
        <span className="text-xs">Health check failed</span>
      </div>
    );
  }

  const health = status.health;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center">
            {health.healthy ? (
              <CheckCircle className="h-4 w-4 text-success mr-2" />
            ) : health.issues.length > 0 ? (
              <AlertTriangle className="h-4 w-4 text-warning mr-2" />
            ) : (
              <XCircle className="h-4 w-4 text-error mr-2" />
            )}
            <span className="text-xs">
              {health.healthy ? 'Healthy' : `${health.issues.length} issue(s)`}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {health.issues.length > 0 ? (
            <ul className="list-disc list-inside text-xs">
              {health.issues.map((issue: string, index: number) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          ) : (
            <p className="text-xs">All systems operational</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Last checked: {new Date(health.lastCheck).toLocaleTimeString()}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
