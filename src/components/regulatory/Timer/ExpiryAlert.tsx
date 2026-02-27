'use client';

import { TimerStatus } from '@/types/regulatory';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, AlertTriangle, Clock } from 'lucide-react';

interface ExpiryAlertProps {
  status: TimerStatus;
  onDismiss?: () => void;
  onRequestExtension?: () => void;
}

export function ExpiryAlert({ status, onDismiss, onRequestExtension }: ExpiryAlertProps) {
  if (!status.isExpired && status.warningLevel === 'low') return null;

  const getAlertVariant = () => {
    if (status.isExpired) return 'destructive';
    if (status.warningLevel === 'critical') return 'destructive';
    if (status.warningLevel === 'high') return 'warning';
    return 'default';
  };

  const getIcon = () => {
    if (status.isExpired) return <AlertCircle className="h-4 w-4" />;
    if (status.warningLevel === 'critical') return <AlertTriangle className="h-4 w-4" />;
    return <Clock className="h-4 w-4" />;
  };

  const getTitle = () => {
    if (status.isExpired) return 'Buyer Review Period Expired';
    if (status.warningLevel === 'critical') return 'Urgent: Timer Expiring Soon';
    if (status.warningLevel === 'high') return 'Timer Running Low';
    return 'Timer Alert';
  };

  const getDescription = () => {
    const hours = Math.floor(status.remainingSeconds / 3600);
    const minutes = Math.floor((status.remainingSeconds % 3600) / 60);

    if (status.isExpired) {
      return 'The 72-hour buyer review period has expired. Please contact support for assistance.';
    }
    if (status.warningLevel === 'critical') {
      return `Only ${hours}h ${minutes}m remaining! Immediate action required.`;
    }
    if (status.warningLevel === 'high') {
      return `Less than 12 hours remaining (${hours}h ${minutes}m). Please ensure timely review.`;
    }
    return `Timer alert: ${hours}h ${minutes}m remaining.`;
  };

  return (
    <Alert variant={getAlertVariant()}>
      <div className="flex items-start">
        {getIcon()}
        <div className="ml-2 flex-1">
          <AlertTitle>{getTitle()}</AlertTitle>
          <AlertDescription className="mt-1">
            {getDescription()}
          </AlertDescription>
          <div className="flex items-center space-x-2 mt-3">
            {!status.isExpired && onRequestExtension && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={onRequestExtension}
              >
                Request Extension
              </Button>
            )}
            {onDismiss && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onDismiss}
              >
                Dismiss
              </Button>
            )}
          </div>
        </div>
      </div>
    </Alert>
  );
}
