'use client';

import { formatDistanceToNow } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Clock } from 'lucide-react';

interface LastSyncTimeProps {
  timestamp?: Date;
  className?: string;
}

export function LastSyncTime({ timestamp, className }: LastSyncTimeProps) {
  if (!timestamp) {
    return (
      <div className={cn('flex items-center text-gray-400 text-sm', className)}>
        <Clock className="h-4 w-4 mr-1" />
        Never synced
      </div>
    );
  }

  const timeAgo = formatDistanceToNow(timestamp, { addSuffix: true });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn('flex items-center text-gray-500 text-sm', className)}>
            <Clock className="h-4 w-4 mr-1" />
            {timeAgo}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">
            Last sync: {timestamp.toLocaleString()}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
