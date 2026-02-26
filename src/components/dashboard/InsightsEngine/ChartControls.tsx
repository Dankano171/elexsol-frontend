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
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Calendar, ChevronDown, Eye, EyeOff, Target } from 'lucide-react';

interface ChartControlsProps {
  period: 'week' | 'month' | 'quarter';
  onPeriodChange: (period: 'week' | 'month' | 'quarter') => void;
  showProjected: boolean;
  onShowProjectedChange: (show: boolean) => void;
  showBenchmark: boolean;
  onShowBenchmarkChange: (show: boolean) => void;
}

export function ChartControls({
  period,
  onPeriodChange,
  showProjected,
  onShowProjectedChange,
  showBenchmark,
  onShowBenchmarkChange,
}: ChartControlsProps) {
  return (
    <div className="flex items-center space-x-2">
      {/* Period Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            {period === 'week' ? 'Weekly' : period === 'month' ? 'Monthly' : 'Quarterly'}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Select Period</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onPeriodChange('week')}>
            Weekly
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onPeriodChange('month')}>
            Monthly
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onPeriodChange('quarter')}>
            Quarterly
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* View Options */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            View
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Chart Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="p-2">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="show-projected" className="text-sm">
                Show Projected
              </Label>
              <Switch
                id="show-projected"
                checked={showProjected}
                onCheckedChange={onShowProjectedChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-benchmark" className="text-sm">
                Show Benchmark
              </Label>
              <Switch
                id="show-benchmark"
                checked={showBenchmark}
                onCheckedChange={onShowBenchmarkChange}
              />
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Export Button */}
      <Button variant="outline" size="sm">
        <Target className="mr-2 h-4 w-4" />
        Export
      </Button>
    </div>
  );
}
