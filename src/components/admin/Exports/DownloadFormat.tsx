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
import { Download, FileText, FileSpreadsheet, File } from 'lucide-react';

interface DownloadFormatProps {
  onDownload: (format: 'xlsx' | 'csv' | 'pdf') => void;
  disabled?: boolean;
}

export function DownloadFormat({ onDownload, disabled }: DownloadFormatProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={disabled}>
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Select Format</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onDownload('xlsx')}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Excel (XLSX)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDownload('csv')}>
          <FileText className="mr-2 h-4 w-4" />
          CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDownload('pdf')}>
          <File className="mr-2 h-4 w-4" />
          PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
