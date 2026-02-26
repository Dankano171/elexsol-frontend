'use client';

import { useDashboard } from '@/lib/hooks/useDashboard';
import { useDashboardStore } from '@/lib/store/dashboardStore';
import { ActivityItem } from './ActivityItem';
import { ActivityFilters } from './ActivityFilters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw, Bell } from 'lucide-react';
import { useState } from 'react';

export function ActivityFeed() {
  const [filter, setFilter] = useState<string>('all');
  const { activities, activitiesLoading, refresh, acknowledgeActivity, dismissActivity } = useDashboard();
  const { isActivityDismissed, isActivityAcknowledged } = useDashboardStore();

  const filteredActivities = activities?.filter(activity => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !isActivityAcknowledged(activity.id);
    if (filter === 'actionable') return activity.actionable;
    return activity.type.includes(filter);
  });

  const unreadCount = activities?.filter(a => !isActivityAcknowledged(a.id)).length || 0;

  if (activitiesLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Activity Feed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <CardTitle>Activity Feed</CardTitle>
          {unreadCount > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-primary rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <ActivityFilters filter={filter} onFilterChange={setFilter} />
          <Button variant="ghost" size="icon" onClick={() => refresh()}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {!filteredActivities || filteredActivities.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No activities to show</p>
          </div>
        ) : (
          <div className="space-y-1">
            {filteredActivities.map((activity) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                onAcknowledge={() => acknowledgeActivity(activity.id)}
                onDismiss={() => dismissActivity(activity.id)}
                isAcknowledged={isActivityAcknowledged(activity.id)}
                isDismissed={isActivityDismissed(activity.id)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
