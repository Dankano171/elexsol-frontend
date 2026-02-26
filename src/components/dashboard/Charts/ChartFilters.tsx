'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from 'lucide-react';

interface ChartFiltersProps {
  period: string;
  onPeriodChange: (period: string) => void;
  comparison?: string;
  onComparisonChange?: (comparison: string) => void;
  showComparison?: boolean;
  className?: string;
}

export function ChartFilters({
  period,
  onPeriodChange,
  comparison,
  onComparisonChange,
  showComparison = false,
  className,
}: ChartFiltersProps) {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Select value={period} onValueChange={onPeriodChange}>
        <SelectTrigger className="w-[140px]">
          <Calendar className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Select period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="week">Last 7 days</SelectItem>
          <SelectItem value="month">Last 30 days</SelectItem>
          <SelectItem value="quarter">Last 90 days</SelectItem>
          <SelectItem value="year">Last 12 months</SelectItem>
        </SelectContent>
      </Select>

      {showComparison && onComparisonChange && (
        <Select value={comparison} onValueChange={onComparisonChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Compare to" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No comparison</SelectItem>
            <SelectItem value="previous">Previous period</SelectItem>
            <SelectItem value="target">Target</SelectItem>
            <SelectItem value="benchmark">Industry benchmark</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
