'use client';

import { useState } from 'react';
import { useAdmin } from '@/lib/hooks/useAdmin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { CalendarIcon, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

const sectors = [
  'Agriculture',
  'Construction',
  'Education',
  'Financial Services',
  'Healthcare',
  'Information Technology',
  'Manufacturing',
  'Oil & Gas',
  'Retail',
  'Telecommunications',
];

const metrics = [
  { id: 'revenue', label: 'Revenue' },
  { id: 'velocity', label: 'Payment Velocity' },
  { id: 'compliance', label: 'Compliance Rate' },
  { id: 'growth', label: 'Growth Rate' },
  { id: 'volume', label: 'Transaction Volume' },
];

export function ExportIntelligence() {
  const { exportData, isExporting } = useAdmin();
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  });
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(metrics.map(m => m.id));
  const [format, setFormat] = useState<'xlsx' | 'csv' | 'pdf'>('xlsx');
  const [anonymize, setAnonymize] = useState(true);

  const handleExport = () => {
    exportData({
      format,
      dateRange,
      sectors: selectedSectors.length > 0 ? selectedSectors : undefined,
      metrics: selectedMetrics,
      anonymize,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Intelligence</CardTitle>
        <CardDescription>
          Export anonymized sector data for business intelligence
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Range */}
        <div className="space-y-2">
          <Label>Date Range</Label>
          <div className="grid grid-cols-2 gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'justify-start text-left font-normal',
                    !dateRange.from && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? format(dateRange.from, 'PPP') : <span>From</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateRange.from}
                  onSelect={(date) => setDateRange({ ...dateRange, from: date! })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'justify-start text-left font-normal',
                    !dateRange.to && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.to ? format(dateRange.to, 'PPP') : <span>To</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateRange.to}
                  onSelect={(date) => setDateRange({ ...dateRange, to: date! })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Sectors */}
        <div className="space-y-2">
          <Label>Sectors (leave empty for all)</Label>
          <div className="grid grid-cols-2 gap-2">
            {sectors.map((sector) => (
              <div key={sector} className="flex items-center space-x-2">
                <Checkbox
                  id={sector}
                  checked={selectedSectors.includes(sector)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedSectors([...selectedSectors, sector]);
                    } else {
                      setSelectedSectors(selectedSectors.filter(s => s !== sector));
                    }
                  }}
                />
                <Label htmlFor={sector} className="text-sm font-normal">
                  {sector}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-2">
          <Label>Metrics to Include</Label>
          <div className="grid grid-cols-2 gap-2">
            {metrics.map((metric) => (
              <div key={metric.id} className="flex items-center space-x-2">
                <Checkbox
                  id={metric.id}
                  checked={selectedMetrics.includes(metric.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedMetrics([...selectedMetrics, metric.id]);
                    } else {
                      setSelectedMetrics(selectedMetrics.filter(m => m !== metric.id));
                    }
                  }}
                />
                <Label htmlFor={metric.id} className="text-sm font-normal">
                  {metric.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Format & Options */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Export Format</Label>
            <Select value={format} onValueChange={(value: any) => setFormat(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Options</Label>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="anonymize"
                checked={anonymize}
                onCheckedChange={(checked) => setAnonymize(checked as boolean)}
              />
              <Label htmlFor="anonymize" className="text-sm font-normal">
                Anonymize data (remove PII)
              </Label>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <Button
          onClick={handleExport}
          disabled={isExporting}
          className="w-full"
        >
          <Download className="mr-2 h-4 w-4" />
          {isExporting ? 'Exporting...' : 'Export Intelligence'}
        </Button>
      </CardContent>
    </Card>
  );
}
