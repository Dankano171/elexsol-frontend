'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download, FileText, FileImage, FileArchive } from 'lucide-react';

interface DownloadStampProps {
  invoiceId: string;
  onDownload?: (format: 'pdf' | 'png' | 'zip') => void;
}

export function DownloadStamp({ invoiceId, onDownload }: DownloadStampProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async (format: 'pdf' | 'png' | 'zip') => {
    setDownloading(true);
    try {
      if (onDownload) {
        await onDownload(format);
      }
    } finally {
      setDownloading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={downloading}>
          <Download className="mr-2 h-4 w-4" />
          {downloading ? 'Downloading...' : 'Download Stamped Invoice'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Download Format</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleDownload('pdf')}>
          <FileText className="mr-2 h-4 w-4" />
          PDF Document
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDownload('png')}>
          <FileImage className="mr-2 h-4 w-4" />
          PNG Image
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDownload('zip')}>
          <FileArchive className="mr-2 h-4 w-4" />
          ZIP Archive (All)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
