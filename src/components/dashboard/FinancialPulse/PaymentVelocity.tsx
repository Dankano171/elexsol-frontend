'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Gauge, TrendingUp, TrendingDown } from 'lucide-react';

interface PaymentVelocityProps {
  averageDays: number;
  medianDays: number;
  fastestDays: number;
  slowestDays: number;
  trend: 'improving' | 'worsening' | 'stable';
}

export function PaymentVelocity({
  averageDays,
  medianDays,
  fastestDays,
  slowestDays,
  trend,
}: PaymentVelocityProps) {
  // Industry benchmark (example)
  const industryAverage = 35;
  const targetDays = 30;

  const performanceVsTarget = ((targetDays - averageDays) / targetDays) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Payment Velocity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Gauge */}
        <div className="relative pt-4">
          <div className="flex justify-center mb-2">
            <Gauge className={cn(
              'h-16 w-16',
              averageDays <= targetDays ? 'text-success' : 'text-warning'
            )} />
          </div>
          <div className="text-center">
            <span className="text-3xl font-bold">{averageDays}</span>
            <span className="text-gray-500 ml-1">days</span>
          </div>
          <div className="flex justify-center mt-1 space-x-2">
            <span className="text-xs text-gray-500">Industry: {industryAverage}d</span>
            <span className="text-xs text-gray-500">Target: {targetDays}d</span>
          </div>
        </div>

        {/* Performance vs Target */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">vs Target</span>
            <span className={cn(
              'font-medium',
              performanceVsTarget >= 0 ? 'text-success' : 'text-error'
            )}>
              {performanceVsTarget >= 0 ? '+' : ''}{performanceVsTarget.toFixed(1)}%
            </span>
          </div>
          <Progress 
            value={Math.min(100, (targetDays / averageDays) * 100)} 
            className="h-2"
            indicatorClassName={averageDays <= targetDays ? 'bg-success' : 'bg-warning'}
          />
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div>
            <p className="text-xs text-gray-500">Fastest</p>
            <p className="text-sm font-medium">{fastestDays}d</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Median</p>
            <p className="text-sm font-medium">{medianDays}d</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Slowest</p>
            <p className="text-sm font-medium">{slowestDays}d</p>
          </div>
        </div>

        {/* Trend */}
        <div className={cn(
          'flex items-center justify-center p-2 rounded-lg',
          trend === 'improving' ? 'bg-success/10' : 
          trend === 'worsening' ? 'bg-error/10' : 'bg-gray-100'
        )}>
          {trend === 'improving' ? (
            <TrendingUp className="h-4 w-4 text-success mr-2" />
          ) : trend === 'worsening' ? (
            <TrendingDown className="h-4 w-4 text-error mr-2" />
          ) : null}
          <span className={cn(
            'text-sm font-medium',
            trend === 'improving' ? 'text-success' : 
            trend === 'worsening' ? 'text-error' : 'text-gray-600'
          )}>
            {trend === 'improving' ? 'Improving' : 
             trend === 'worsening' ? 'Worsening' : 'Stable'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
