'use client';

import { ClearanceStatus } from '@/types/regulatory';
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClearanceTimelineProps {
  status?: ClearanceStatus;
}

const stages = [
  { id: 'validation', label: 'Validation', icon: Circle },
  { id: 'submission', label: 'FIRS Submission', icon: Circle },
  { id: 'buyer_review', label: 'Buyer Review', icon: Clock },
  { id: 'firs_approval', label: 'FIRS Approval', icon: Circle },
  { id: 'completed', label: 'Completed', icon: CheckCircle2 },
];

export function ClearanceTimeline({ status }: ClearanceTimelineProps) {
  const currentStageIndex = status ? stages.findIndex(s => s.id === status.stage) : 0;

  const getStageStatus = (stageId: string) => {
    if (!status) return 'pending';
    
    const stageIndex = stages.findIndex(s => s.id === stageId);
    if (stageIndex < currentStageIndex) return 'completed';
    if (stageIndex === currentStageIndex) return status.status;
    return 'pending';
  };

  const getStageColor = (stageStatus: string) => {
    switch (stageStatus) {
      case 'completed':
        return 'text-success border-success';
      case 'in_progress':
        return 'text-primary border-primary animate-pulse';
      case 'failed':
        return 'text-error border-error';
      default:
        return 'text-gray-300 border-gray-300';
    }
  };

  return (
    <div className="relative">
      {/* Progress Line */}
      <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200" />
      
      {/* Stages */}
      <div className="space-y-6 relative">
        {stages.map((stage, index) => {
          const stageStatus = getStageStatus(stage.id);
          const colorClass = getStageColor(stageStatus);
          const Icon = stage.icon;

          return (
            <div key={stage.id} className="flex items-start space-x-3">
              {/* Icon */}
              <div className={cn(
                'relative z-10 w-12 h-12 rounded-full border-2 bg-white flex items-center justify-center',
                colorClass
              )}>
                {stageStatus === 'completed' ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pt-2">
                <h4 className="font-medium">{stage.label}</h4>
                {stage.id === status?.stage && status.message && (
                  <p className="text-sm text-gray-600 mt-1">{status.message}</p>
                )}
                {stage.id === 'buyer_review' && status?.details?.buyerDeadline && (
                  <p className="text-xs text-gray-500 mt-1">
                    Deadline: {new Date(status.details.buyerDeadline).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
