'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

interface SelectEditorProps {
  value: string;
  options: Array<{ value: string; label: string }>;
  onSave: (value: string) => void;
  onCancel: () => void;
}

export function SelectEditor({ value, options, onSave, onCancel }: SelectEditorProps) {
  const [currentValue, setCurrentValue] = useState(value);

  return (
    <div className="flex items-center space-x-2">
      <Select value={currentValue} onValueChange={setCurrentValue}>
        <SelectTrigger className="w-[200px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button variant="ghost" size="icon" onClick={() => onSave(currentValue)}>
        <Check className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={onCancel}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
