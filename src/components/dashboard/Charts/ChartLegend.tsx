'use client';

import { cn } from '@/lib/utils';

export interface LegendItem {
  id: string;
  label: string;
  color: string;
  value?: number;
  formattedValue?: string;
  active?: boolean;
}

interface ChartLegendProps {
  items: LegendItem[];
  onItemClick?: (id: string) => void;
  className?: string;
  layout?: 'horizontal' | 'vertical';
}

export function ChartLegend({
  items,
  onItemClick,
  className,
  layout = 'horizontal',
}: ChartLegendProps) {
  return (
    <div
      className={cn(
        'flex gap-4',
        layout === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
        className
      )}
    >
      {items.map((item) => (
        <button
          key={item.id}
          className={cn(
            'flex items-center space-x-2 text-sm transition-opacity',
            item.active === false && 'opacity-50',
            onItemClick && 'cursor-pointer hover:opacity-80'
          )}
          onClick={() => onItemClick?.(item.id)}
          disabled={!onItemClick}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-gray-600">{item.label}</span>
          {item.formattedValue && (
            <>
              <span className="text-gray-300 mx-1">•</span>
              <span className="font-medium">{item.formattedValue}</span>
            </>
          )}
        </button>
      ))}
    </div>
  );
}
