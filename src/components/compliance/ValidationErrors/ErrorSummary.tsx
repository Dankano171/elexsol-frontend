'use client';

import { ValidationError } from '@/types/compliance';
import { AlertCircle } from 'lucide-react';

interface ErrorSummaryProps {
  errors: ValidationError[];
}

export function ErrorSummary({ errors }: ErrorSummaryProps) {
  const errorCount = errors.length;
  const errorTypes = errors.reduce((acc, error) => {
    acc[error.severity] = (acc[error.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-error/5 border border-error/20 rounded-lg p-4">
      <div className="flex items-start space-x-3">
        <AlertCircle className="h-5 w-5 text-error flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-error">
            {errorCount} Validation Error{errorCount !== 1 ? 's' : ''}
          </h4>
          <p className="text-sm text-gray-600 mt-1">
            Please fix the following errors before submitting to FIRS
          </p>
          
          {errorTypes.error && (
            <p className="text-xs text-error mt-2">
              • {errorTypes.error} critical error{errorTypes.error !== 1 ? 's' : ''}
            </p>
          )}
          {errorTypes.warning && (
            <p className="text-xs text-warning mt-1">
              • {errorTypes.warning} warning{errorTypes.warning !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
