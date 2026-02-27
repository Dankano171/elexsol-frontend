'use client';

import { ValidationError } from '@/types/compliance';
import { ErrorTooltip } from './ErrorTooltip';
import { ErrorSummary } from './ErrorSummary';
import { FieldHighlighter } from './FieldHighlighter';

interface ValidationErrorsProps {
  errors: ValidationError[];
  onFieldClick?: (field: string) => void;
}

export function ValidationErrors({ errors, onFieldClick }: ValidationErrorsProps) {
  const errorCount = errors.length;
  const hasErrors = errorCount > 0;

  if (!hasErrors) return null;

  return (
    <div className="space-y-4">
      <ErrorSummary errors={errors} />
      
      <div className="space-y-2">
        {errors.map((error, index) => (
          <ErrorTooltip
            key={index}
            error={error}
            onFieldClick={onFieldClick}
          />
        ))}
      </div>

      <FieldHighlighter errors={errors} />
    </div>
  );
}
