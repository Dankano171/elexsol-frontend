'use client';

import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ConnectionErrorProps {
  error: string;
  onRetry?: () => void;
  onReconnect?: () => void;
}

export function ConnectionError({ error, onRetry, onReconnect }: ConnectionErrorProps) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Connection Error</AlertTitle>
      <AlertDescription className="mt-2">
        <p className="text-sm mb-3">{error}</p>
        <div className="flex space-x-2">
          {onRetry && (
            <Button variant="outline" size="sm" onClick={onRetry}>
              <RefreshCw className="mr-2 h-3 w-3" />
              Retry
            </Button>
          )}
          {onReconnect && (
            <Button variant="outline" size="sm" onClick={onReconnect}>
              Reconnect
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
}
