'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface ChartContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  actions?: React.ReactNode;
  className?: string;
}

export function ChartContainer({
  title,
  description,
  children,
  isLoading,
  actions,
  className,
}: ChartContainerProps) {
  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          {description && <Skeleton className="h-4 w-48 mt-2" />}
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {actions && <div className="flex items-center space-x-2">{actions}</div>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
