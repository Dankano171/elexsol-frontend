'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

const sectors = [
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'construction', label: 'Construction' },
  { value: 'education', label: 'Education' },
  { value: 'financial', label: 'Financial Services' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'it', label: 'Information Technology' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'oil-gas', label: 'Oil & Gas' },
  { value: 'retail', label: 'Retail' },
  { value: 'telecom', label: 'Telecommunications' },
];

interface SectorFilterProps {
  value?: string[];
  onChange?: (value: string[]) => void;
}

export function SectorFilter({ value = [], onChange }: SectorFilterProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (sectorValue: string) => {
    const newValue = value.includes(sectorValue)
      ? value.filter((v) => v !== sectorValue)
      : [...value, sectorValue];
    onChange?.(newValue);
  };

  const handleRemove = (sectorValue: string) => {
    onChange?.(value.filter((v) => v !== sectorValue));
  };

  const handleClear = () => {
    onChange?.([]);
  };

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value.length > 0
              ? `${value.length} sector${value.length > 1 ? 's' : ''} selected`
              : 'Select sectors...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search sectors..." />
            <CommandEmpty>No sector found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {sectors.map((sector) => (
                <CommandItem
                  key={sector.value}
                  value={sector.value}
                  onSelect={() => handleSelect(sector.value)}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value.includes(sector.value) ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {sector.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {value.map((v) => {
            const sector = sectors.find((s) => s.value === v);
            return (
              <Badge key={v} variant="secondary" className="gap-1">
                {sector?.label}
                <button
                  className="ml-1 hover:text-destructive"
                  onClick={() => handleRemove(v)}
                >
                  ×
                </button>
              </Badge>
            );
          })}
          {value.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs"
              onClick={handleClear}
            >
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
