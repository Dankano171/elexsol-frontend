'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatNigerianNumber } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface RevenueMetricProps {
  total: number;
  monthly: number;
  growth: number;
  trend: 'up' | 'down' | 'stable';
}

export function RevenueMetric({ total, monthly, growth, trend }: RevenueMetricProps) {
  const yearlyTarget = total * 1.2; // Example target: 20% growth
  const progressToTarget = (total / yearlyTarget) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* YTD Revenue */}
        <div>
          <p className="text-sm text-gray-600 mb-1">Year to Date</p>
          <p className="text-3xl font-bold">{formatNigerianNumber(total)}</p>
        </div>

        {/* Monthly Revenue */}
        <div className="flex justify-between items-end">
          <div>
            <p className="text-sm text-gray-600">This Month</p>
            <p className="text-xl font-semibold">{formatNigerianNumber(monthly)}</p>
          </div>
          <div className={cn(
            'flex items-center',
            trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-gray-500'
          )}>
            {trend === 'up' ? (
              <TrendingUp className="h-5 w-5 mr-1" />
            ) : trend === 'down' ? (
              <TrendingDown className="h-5 w-5 mr-1" />
            ) : null}
            <span className="font-medium">{growth > 0 ? '+' : ''}{growth.toFixed(1)}%</span>
          </div>
        </div>

        {/* Progress to Target */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress to Annual Target</span>
            <span className="font-medium">{progressToTarget.toFixed(1)}%</span>
          </div>
          <Progress value={progressToTarget} className="h-2" />
          <p className="text-xs text-gray-500">
            Target: {formatNigerianNumber(yearlyTarget)}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <p className="text-xs text-gray-500">Daily Average</p>
            <p className="text-sm font-medium">{formatNigerianNumber(monthly / 30)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Best Day</p>
            <p className="text-sm font-medium">{formatNigerianNumber(monthly / 20)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
