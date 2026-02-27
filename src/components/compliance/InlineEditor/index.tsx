'use client';

import { useState } from 'react';
import { useCompliance } from '@/lib/hooks/useCompliance';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InlineEditorProps {
  invoiceId: string;
  field: string;
  currentValue: any;
  onSave?: () => void;
  onCancel?: () => void;
}

export function InlineEditor({ invoiceId, field, currentValue, onSave, onCancel }: InlineEditorProps) {
  const [value, setValue] = useState(currentValue);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    message?: string;
  } | null>(null);

  const { updateField } = useCompliance();

  const handleValidate = async () => {
    setIsValidating(true);
    // Simulate validation - in production, call API
    setTimeout(() => {
      const isValid = value && value.toString().length > 0;
      setValidationResult({
        valid: !!isValid,
        message: isValid ? 'Field is valid' : 'Field cannot be empty',
      });
      setIsValidating(false);
    }, 500);
  };

  const handleSave = async () => {
    await updateField({ invoiceId, field, value });
    onSave?.();
  };

  const handleCancel = () => {
    setValue(currentValue);
    setValidationResult(null);
    onCancel?.();
  };

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor={field} className="text-sm font-medium">
          {field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
        </Label>
        <div className="flex items-center space-x-2">
          <Input
            id={field}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setValidationResult(null);
            }}
            className={cn(
              validationResult && !validationResult.valid && 'border-error'
            )}
          />
          {validationResult?.valid && (
            <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
          )}
          {validationResult && !validationResult.valid && (
            <AlertCircle className="h-5 w-5 text-error flex-shrink-0" />
          )}
        </div>
        {validationResult?.message && (
          <p className={cn(
            'text-xs',
            validationResult.valid ? 'text-success' : 'text-error'
          )}>
            {validationResult.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCancel}
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleValidate}
          disabled={isValidating || value === currentValue}
        >
          {isValidating ? 'Validating...' : 'Validate'}
        </Button>
        <Button
          size="sm"
          onClick={handleSave}
          disabled={!validationResult?.valid}
        >
          Save & Re-validate
        </Button>
      </div>
    </div>
  );
}
