'use client';

import { ValidationError } from '@/types/compliance';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { AlertCircle } from 'lucide-react';

interface ErrorTooltipProps {
  error: ValidationError;
  onFieldClick?: (field: string) => void;
}

export function ErrorTooltip({ error, onFieldClick }: ErrorTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => onFieldClick?.(error.field)}
            className="flex items-center space-x-2 w-full p-2 hover:bg-gray-50 rounded transition-colors"
          >
            <AlertCircle className="h-4 w-4 text-error flex-shrink-0" />
            <span className="text-sm font-medium flex-1 text-left">{error.field}</span>
            <Badge variant="outline" className="text-xs">
              {error.code}
            </Badge>
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className="max-w-xs">
          <p className="text-sm font-medium text-error mb-1">{error.field}</p>
          <p className="text-sm text-gray-600">{error.message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
