'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface ChartSkeletonProps {
  hasHeader?: boolean;
  className?: string;
}

export function ChartSkeleton({ hasHeader = true, className }: ChartSkeletonProps) {
  return (
    <Card className={className}>
      {hasHeader && (
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48 mt-2" />
        </CardHeader>
      )}
      <CardContent>
        <div className="h-[300px] w-full animate-pulse">
          {/* Y-axis lines */}
          <div className="relative h-full">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full border-b border-gray-200"
                style={{ bottom: `${(i + 1) * 20}%` }}
              >
                <Skeleton className="absolute -left-8 h-4 w-12" />
              </div>
            ))}
            
            {/* Chart bars */}
            <div className="absolute inset-0 flex items-end justify-around px-8">
              {[...Array(12)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="w-8"
                  style={{
                    height: `${Math.random() * 60 + 20}%`,
                  }}
                />
              ))}
            </div>

            {/* X-axis labels */}
            <div className="absolute -bottom-8 left-0 right-0 flex justify-around px-8">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-12" />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
