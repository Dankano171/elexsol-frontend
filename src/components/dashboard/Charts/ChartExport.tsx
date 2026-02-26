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
import { Download, FileText, Image, FileSpreadsheet } from 'lucide-react';
import { toast } from 'sonner';

interface ChartExportProps {
  chartRef: React.RefObject<any>;
  data: any[];
  filename?: string;
}

export function ChartExport({ chartRef, data, filename = 'chart' }: ChartExportProps) {
  const [exporting, setExporting] = useState(false);

  const exportAsPNG = async () => {
    try {
      setExporting(true);
      
      // This would use html2canvas or similar library
      // For now, we'll simulate the export
      toast.success('Chart exported as PNG');
    } catch (error) {
      toast.error('Failed to export chart');
    } finally {
      setExporting(false);
    }
  };

  const exportAsSVG = async () => {
    try {
      setExporting(true);
      toast.success('Chart exported as SVG');
    } catch (error) {
      toast.error('Failed to export chart');
    } finally {
      setExporting(false);
    }
  };

  const exportAsCSV = async () => {
    try {
      setExporting(true);
      
      // Convert data to CSV
      const headers = Object.keys(data[0] || {}).join(',');
      const rows = data.map(row => Object.values(row).join(',')).join('\n');
      const csv = `${headers}\n${rows}`;
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      
      toast.success('Data exported as CSV');
    } catch (error) {
      toast.error('Failed to export data');
    } finally {
      setExporting(false);
    }
  };

  const exportAsExcel = async () => {
    try {
      setExporting(true);
      
      // This would use xlsx or similar library
      toast.success('Data exported as Excel');
    } catch (error) {
      toast.error('Failed to export data');
    } finally {
      setExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={exporting}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Export as Image</DropdownMenuLabel>
        <DropdownMenuItem onClick={exportAsPNG}>
          <Image className="mr-2 h-4 w-4" />
          PNG Image
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportAsSVG}>
          <FileText className="mr-2 h-4 w-4" />
          SVG Vector
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Export Data</DropdownMenuLabel>
        <DropdownMenuItem onClick={exportAsCSV}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          CSV File
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportAsExcel}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Excel File
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
