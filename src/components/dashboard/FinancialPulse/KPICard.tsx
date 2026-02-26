'use client';

import { cn, formatNigerianNumber } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  DollarSign, 
  Clock, 
  Calendar,
  AlertCircle 
} from 'lucide-react';

interface KPICardProps {
  title: string;
  value: number;
  previousValue?: number;
  unit?: string;
  format?: 'currency' | 'number' | 'percent';
  trend?: 'up' | 'down' | 'stable';
  icon?: 'revenue' | 'velocity' | 'forecast' | 'outstanding';
  tooltip?: string;
  warning?: boolean;
  className?: string;
}

const icons = {
  revenue: DollarSign,
  velocity: Clock,
  forecast: Calendar,
  outstanding: AlertCircle,
};

export function KPICard({
  title,
  value,
  previousValue,
  unit,
  format = 'number',
  trend,
  icon = 'revenue',
  tooltip,
  warning,
  className,
}: KPICardProps) {
  const Icon = icons[icon];

  const formattedValue = (() => {
    if (format === 'currency') return formatNigerianNumber(value);
    if (format === 'percent') return `${value}%`;
    if (unit) return `${value} ${unit}`;
    return value.toLocaleString();
  })();

  const changePercent = previousValue
    ? ((value - previousValue) / previousValue) * 100
    : 0;

  const getTrendColor = () => {
    if (!trend) return '';
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-gray-500';
  };

  const TrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4" />;
    return <Minus className="h-4 w-4" />;
  };

  const cardContent = (
    <Card className={cn('relative overflow-hidden', className)}>
      <CardContent className="p-6">
        {/* Icon */}
        <div className="absolute top-6 right-6">
          <div className={cn(
            'p-2 rounded-lg',
            warning ? 'bg-red-100' : 'bg-gray-100'
          )}>
            <Icon className={cn(
              'h-5 w-5',
              warning ? 'text-error' : 'text-gray-600'
            )} />
          </div>
        </div>

        {/* Title */}
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>

        {/* Value */}
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold">{formattedValue}</span>
          {unit === 'days' && (
            <span className="text-sm text-gray-500">avg</span>
          )}
        </div>

        {/* Trend */}
        {(previousValue || trend) && (
          <div className="flex items-center mt-2 space-x-2">
            {trend && (
              <div className={cn('flex items-center', getTrendColor())}>
                <TrendIcon />
                <span className="text-xs font-medium ml-1">
                  {Math.abs(changePercent).toFixed(1)}%
                </span>
              </div>
            )}
            {previousValue && (
              <span className="text-xs text-gray-500">
                vs previous period
              </span>
            )}
          </div>
        )}
      </CardContent>

      {/* Warning indicator */}
      {warning && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-error" />
      )}
    </Card>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{cardContent}</TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return cardContent;
}
