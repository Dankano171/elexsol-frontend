'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/dashboard/Charts/ChartContainer';
import { ChartFilters } from '@/components/dashboard/Charts/ChartFilters';
import { ChartExport } from '@/components/dashboard/Charts/ChartExport';
import { useDashboardCharts } from '@/lib/hooks/useDashboardCharts';
import { Progress } from '@/components/ui/progress';

export function VelocityAnalytics() {
  const [period, setPeriod] = useState('month');
  const { paymentVelocity } = useDashboardCharts();

  const velocityData = paymentVelocity.metrics?.average || 35;
  const industryAvg = 42;
  const target = 30;

  const performanceVsTarget = ((target - velocityData) / target) * 100;
  const performanceVsIndustry = ((industryAvg - velocityData) / industryAvg) * 100;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Payment Time</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{velocityData.toFixed(1)} days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>vs Target ({target} days)</CardDescription>
          </CardHeader>
          <CardContent>
            <p className={cn(
              'text-2xl font-bold',
              performanceVsTarget >= 0 ? 'text-success' : 'text-error'
            )}>
              {performanceVsTarget >= 0 ? '+' : ''}{performanceVsTarget.toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>vs Industry ({industryAvg} days)</CardDescription>
          </CardHeader>
          <CardContent>
            <p className={cn(
              'text-2xl font-bold',
              performanceVsIndustry >= 0 ? 'text-success' : 'text-error'
            )}>
              {performanceVsIndustry >= 0 ? '+' : ''}{performanceVsIndustry.toFixed(1)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Velocity Chart */}
      <ChartContainer
        title="Payment Velocity Trend"
        description="Average days to get paid over time"
        isLoading={paymentVelocity.loading}
        actions={
          <>
            <ChartFilters
              period={period}
              onPeriodChange={setPeriod}
            />
            <ChartExport
              chartRef={{ current: null }}
              data={paymentVelocity.formattedData || []}
              filename="payment-velocity"
            />
          </>
        }
      >
        <div className="h-full w-full flex items-center justify-center text-gray-500">
          Chart visualization will be rendered here with recharts
        </div>
      </ChartContainer>

      {/* Customer Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Payment Times</CardTitle>
          <CardDescription>Average payment days by customer</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[...Array(5)].map((_, i) => {
              const days = 20 + i * 8;
              const progress = (days / 60) * 100;
              return (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Customer {i + 1}</span>
                    <span className="font-medium">{days} days</span>
                  </div>
                  <Progress
                    value={progress}
                    className="h-2"
                    indicatorClassName={
                      days <= 30 ? 'bg-success' :
                      days <= 45 ? 'bg-warning' : 'bg-error'
                    }
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default VelocityAnalytics;
