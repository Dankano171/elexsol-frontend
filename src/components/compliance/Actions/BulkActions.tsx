'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download, RefreshCw, CheckCircle, XCircle } from 'lucide-react';

interface BulkActionsProps {
  selectedCount: number;
  onValidateAll?: () => void;
  onClearAll?: () => void;
  onExport?: () => void;
}

export function BulkActions({ selectedCount, onValidateAll, onClearAll, onExport }: BulkActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-2 flex items-center justify-between">
      <span className="text-sm font-medium ml-2">
        {selectedCount} invoice{selectedCount !== 1 ? 's' : ''} selected
      </span>
      <div className="flex items-center space-x-2">
        {onValidateAll && (
          <Button variant="outline" size="sm" onClick={onValidateAll}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Validate All
          </Button>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Bulk Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {onClearAll && (
              <DropdownMenuItem onClick={onClearAll}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Re-validate All
              </DropdownMenuItem>
            )}
            {onExport && (
              <DropdownMenuItem onClick={onExport}>
                <Download className="mr-2 h-4 w-4" />
                Export Selected
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="text-error">
              <XCircle className="mr-2 h-4 w-4" />
              Dismiss Selected
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
