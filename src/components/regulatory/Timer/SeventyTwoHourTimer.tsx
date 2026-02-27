'use client';

import { TimerStatus } from '@/types/regulatory';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SeventyTwoHourTimerProps {
  status: TimerStatus;
  onRequestExtension?: () => void;
}

export function SeventyTwoHourTimer({ status, onRequestExtension }: SeventyTwoHourTimerProps) {
  const hours = Math.floor(status.remainingSeconds / 3600);
  const minutes = Math.floor((status.remainingSeconds % 3600) / 60);
  const seconds = status.remainingSeconds % 60;

  const getTimerColor = () => {
    switch (status.warningLevel) {
      case 'low':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'high':
      case 'critical':
        return 'text-error';
      default:
        return 'text-gray-600';
    }
  };

  const getProgressColor = () => {
    switch (status.warningLevel) {
      case 'low':
        return 'bg-success';
      case 'medium':
        return 'bg-warning';
      case 'high':
      case 'critical':
        return 'bg-error';
      default:
        return 'bg-primary';
    }
  };

  const getMessage = () => {
    if (status.isExpired) {
      return "Buyer review period has expired. Please contact support.";
    }
    if (status.warningLevel === 'critical') {
      return "Urgent: Less than 6 hours remaining for buyer review!";
    }
    if (status.warningLevel === 'high') {
      return "Less than 12 hours remaining for buyer review.";
    }
    if (status.warningLevel === 'medium') {
      return "About 24 hours remaining for buyer review.";
    }
    return "Buyer review in progress. Please wait for confirmation.";
  };

  return (
    <Card className={cn(
      status.warningLevel === 'critical' && 'border-error',
      status.warningLevel === 'high' && 'border-warning'
    )}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span>72-Hour Timer</span>
          <Clock className={cn('h-5 w-5', getTimerColor())} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Timer Display */}
        <div className="text-center">
          <div className={cn('text-4xl font-bold font-mono', getTimerColor())}>
            {String(hours).padStart(2, '0')}:
            {String(minutes).padStart(2, '0')}:
            {String(seconds).padStart(2, '0')}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            of 72:00:00 remaining
          </p>
        </div>

        {/* Progress Bar */}
        <Progress 
          value={status.percentage} 
          className="h-2"
          indicatorClassName={getProgressColor()}
        />

        {/* Status Message */}
        <div className={cn(
          'p-3 rounded-lg flex items-start space-x-2',
          status.warningLevel === 'critical' ? 'bg-error/10' :
          status.warningLevel === 'high' ? 'bg-warning/10' : 'bg-blue-50'
        )}>
          <AlertCircle className={cn(
            'h-4 w-4 mt-0.5 flex-shrink-0',
            getTimerColor()
          )} />
          <p className={cn('text-sm', getTimerColor())}>
            {getMessage()}
          </p>
        </div>

        {/* Extension Button (if available) */}
        {!status.isExpired && status.warningLevel === 'high' && onRequestExtension && (
          <button
            onClick={onRequestExtension}
            className="text-sm text-primary hover:underline"
          >
            Request extension
          </button>
        )}
      </CardContent>
    </Card>
  );
}
