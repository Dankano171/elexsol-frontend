'use client';

import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  Link2,
  Shield,
  MoreVertical,
  Eye,
  EyeOff,
  ExternalLink,
} from 'lucide-react';

interface ActivityItemProps {
  activity: {
    id: string;
    type: string;
    title: string;
    description: string;
    timestamp: Date;
    actionable: boolean;
    actionUrl?: string;
    metadata?: Record<string, any>;
  };
  onAcknowledge: () => void;
  onDismiss: () => void;
  isAcknowledged: boolean;
  isDismissed: boolean;
}

const activityIcons = {
  invoice_created: FileText,
  invoice_paid: CheckCircle,
  invoice_overdue: Clock,
  integration_synced: Link2,
  compliance_cleared: Shield,
  compliance_flagged: AlertCircle,
};

const activityColors = {
  invoice_created: 'text-blue-500 bg-blue-50',
  invoice_paid: 'text-success bg-success/10',
  invoice_overdue: 'text-warning bg-warning/10',
  integration_synced: 'text-purple-500 bg-purple-50',
  compliance_cleared: 'text-green-500 bg-green-50',
  compliance_flagged: 'text-error bg-error/10',
};

export function ActivityItem({
  activity,
  onAcknowledge,
  onDismiss,
  isAcknowledged,
  isDismissed,
}: ActivityItemProps) {
  const Icon = activityIcons[activity.type as keyof typeof activityIcons] || FileText;
  const colorClass = activityColors[activity.type as keyof typeof activityColors] || 'text-gray-500 bg-gray-50';

  if (isDismissed) return null;

  return (
    <div
      className={cn(
        'flex items-start space-x-3 p-3 rounded-lg transition-colors',
        !isAcknowledged && 'bg-blue-50/50',
        'hover:bg-gray-50'
      )}
    >
      {/* Icon */}
      <div className={cn('p-2 rounded-lg', colorClass)}>
        <Icon className="h-4 w-4" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className={cn(
            'text-sm font-medium',
            !isAcknowledged && 'text-blue-600'
          )}>
            {activity.title}
          </p>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-0.5">{activity.description}</p>
        
        {/* Metadata */}
        {activity.metadata && (
          <div className="flex items-center space-x-2 mt-2">
            {Object.entries(activity.metadata).map(([key, value]) => (
              <span
                key={key}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
              >
                {key}: {String(value)}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-1">
        {activity.actionable && activity.actionUrl && (
          <Button variant="ghost" size="icon" asChild>
            <a href={activity.actionUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {!isAcknowledged && (
              <DropdownMenuItem onClick={onAcknowledge}>
                <Eye className="mr-2 h-4 w-4" />
                Mark as read
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={onDismiss}>
              <EyeOff className="mr-2 h-4 w-4" />
              Dismiss
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
