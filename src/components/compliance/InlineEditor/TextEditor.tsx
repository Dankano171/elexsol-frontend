'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

interface TextEditorProps {
  value: string;
  onSave: (value: string) => void;
  onCancel: () => void;
  validate?: (value: string) => boolean;
}

export function TextEditor({ value, onSave, onCancel, validate }: TextEditorProps) {
  const [currentValue, setCurrentValue] = useState(value);
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    if (validate && !validate(currentValue)) {
      setError('Invalid value');
      return;
    }
    onSave(currentValue);
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        value={currentValue}
        onChange={(e) => {
          setCurrentValue(e.target.value);
          setError(null);
        }}
        className={error ? 'border-error' : ''}
        autoFocus
      />
      <Button variant="ghost" size="icon" onClick={handleSave}>
        <Check className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={onCancel}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
