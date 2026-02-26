'use client';

import { cn } from '@/lib/utils';

export interface TooltipData {
  label: string;
  values: Array<{
    label: string;
    value: number;
    formattedValue: string;
    color: string;
  }>;
}

interface ChartTooltipProps {
  data: TooltipData | null;
  position?: { x: number; y: number };
  className?: string;
}

export function ChartTooltip({ data, position, className }: ChartTooltipProps) {
  if (!data) return null;

  return (
    <div
      className={cn(
        'absolute z-50 bg-white p-3 border rounded-lg shadow-lg pointer-events-none',
        className
      )}
      style={position ? { left: position.x, top: position.y } : undefined}
    >
      <p className="text-sm font-medium mb-2">{data.label}</p>
      <div className="space-y-1">
        {data.values.map((item, index) => (
          <div key={index} className="flex items-center justify-between space-x-4 text-sm">
            <div className="flex items-center">
              <div
                className="w-2 h-2 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              />
              <span>{item.label}:</span>
            </div>
            <span className="font-mono font-medium">{item.formattedValue}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
