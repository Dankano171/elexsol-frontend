'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface IntegrationHealthProps {
  health: {
    provider: string;
    status: 'healthy' | 'degraded' | 'down';
    latency: number;
    lastCheck: Date;
    errorCount: number;
  }[];
}

export function IntegrationHealth({ health }: IntegrationHealthProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'degraded':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'down':
        return <XCircle className="h-4 w-4 text-error" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge variant="success">Healthy</Badge>;
      case 'degraded':
        return <Badge variant="warning">Degraded</Badge>;
      case 'down':
        return <Badge variant="destructive">Down</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integration Health</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {health.map((integration) => (
            <div
              key={integration.provider}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center space-x-3">
                {getStatusIcon(integration.status)}
                <div>
                  <p className="font-medium capitalize">{integration.provider}</p>
                  <p className="text-xs text-gray-500">
                    Latency: {integration.latency}ms · Last check: {integration.lastCheck.toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {integration.errorCount > 0 && (
                  <span className="text-xs text-error">{integration.errorCount} errors</span>
                )}
                {getStatusBadge(integration.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
