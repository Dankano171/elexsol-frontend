'use client';

import { differenceInDays, formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, Clock } from 'lucide-react';

interface TokenExpiryWarningProps {
  expiresAt: Date;
  onRefresh?: () => void;
}

export function TokenExpiryWarning({ expiresAt, onRefresh }: TokenExpiryWarningProps) {
  const daysUntilExpiry = differenceInDays(expiresAt, new Date());

  const getVariant = () => {
    if (daysUntilExpiry < 0) return 'destructive';
    if (daysUntilExpiry < 3) return 'destructive';
    if (daysUntilExpiry < 7) return 'warning';
    return 'default';
  };

  const getMessage = () => {
    if (daysUntilExpiry < 0) {
      return 'Token expired';
    }
    if (daysUntilExpiry === 0) {
      return 'Expires today';
    }
    return `Expires ${formatDistanceToNow(expiresAt, { addSuffix: true })}`;
  };

  if (daysUntilExpiry > 7) return null;

  return (
    <div className="flex items-center justify-between p-2 bg-warning/10 rounded">
      <div className="flex items-center space-x-2">
        {daysUntilExpiry < 0 ? (
          <AlertCircle className="h-4 w-4 text-error" />
        ) : (
          <Clock className="h-4 w-4 text-warning" />
        )}
        <span className={cn(
          'text-xs',
          daysUntilExpiry < 0 ? 'text-error' : 'text-warning'
        )}>
          {getMessage()}
        </span>
      </div>
      {onRefresh && daysUntilExpiry < 0 && (
        <Button variant="ghost" size="sm" onClick={onRefresh} className="h-6 text-xs">
          Refresh
        </Button>
      )}
    </div>
  );
}
