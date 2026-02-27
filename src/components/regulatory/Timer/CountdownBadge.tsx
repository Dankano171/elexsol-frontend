'use client';

import { TimerStatus } from '@/types/regulatory';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CountdownBadgeProps {
  status: TimerStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export function CountdownBadge({ status, size = 'md', showIcon = true }: CountdownBadgeProps) {
  const hours = Math.floor(status.remainingSeconds / 3600);
  const minutes = Math.floor((status.remainingSeconds % 3600) / 60);

  const getBadgeVariant = () => {
    if (status.isExpired) return 'destructive';
    switch (status.warningLevel) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
      case 'critical':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getDisplayText = () => {
    if (status.isExpired) return 'Expired';
    if (hours > 24) return `${Math.floor(hours / 24)}d remaining`;
    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    if (minutes > 0) return `${minutes}m remaining`;
    return '< 1m remaining';
  };

  return (
    <Badge 
      variant={getBadgeVariant()}
      className={cn(
        size === 'sm' && 'text-xs px-2 py-0.5',
        size === 'lg' && 'text-sm px-3 py-1'
      )}
    >
      {showIcon && <Clock className="mr-1 h-3 w-3" />}
      {getDisplayText()}
    </Badge>
  );
}
