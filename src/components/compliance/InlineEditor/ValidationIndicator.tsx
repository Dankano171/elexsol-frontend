'use client';

import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ValidationIndicatorProps {
  status: 'idle' | 'validating' | 'valid' | 'invalid';
  message?: string;
  className?: string;
}

export function ValidationIndicator({ status, message, className }: ValidationIndicatorProps) {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      {status === 'validating' && (
        <>
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span className="text-sm text-gray-500">Validating...</span>
        </>
      )}
      
      {status === 'valid' && (
        <>
          <CheckCircle className="h-4 w-4 text-success" />
          <span className="text-sm text-success">{message || 'Valid'}</span>
        </>
      )}
      
      {status === 'invalid' && (
        <>
          <AlertCircle className="h-4 w-4 text-error" />
          <span className="text-sm text-error">{message || 'Invalid'}</span>
        </>
      )}
    </div>
  );
}
