'use client';

import { Badge } from '@/components/ui/badge';
import { Database } from 'lucide-react';

interface RecordCounterProps {
  synced: number;
  total?: number;
  className?: string;
}

export function RecordCounter({ synced, total, className }: RecordCounterProps) {
  return (
    <Badge variant="outline" className={cn('font-normal', className)}>
      <Database className="h-3 w-3 mr-1" />
      {synced.toLocaleString()} {total && `/ ${total.toLocaleString()}`} records
    </Badge>
  );
}
