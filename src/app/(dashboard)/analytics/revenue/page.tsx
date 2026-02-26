'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer } from '@/components/dashboard/Charts/ChartContainer';
import { ChartFilters } from '@/components/dashboard/Charts/ChartFilters';
import { ChartExport } from '@/components/dashboard/Charts/ChartExport';
import { useDashboardCharts } from '@/lib/hooks/useDashboardCharts';
import { formatNigerianNumber } from '@/lib/utils';

export function RevenueAnalytics() {
  const [period, setPeriod] = useState('month');
  const { revenueChart } = useDashboardCharts();

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {formatNigerianNumber(revenueChart.metrics?.total || 0)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {revenueChart.dateRange?.label}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Daily</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {formatNigerianNumber(revenueChart.metrics?.average || 0)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Best Day</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {formatNigerianNumber(revenueChart.metrics?.max || 0)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Growth</CardDescription>
          </CardHeader>
          <CardContent>
            <p className={cn(
              'text-2xl font-bold',
              (revenueChart.metrics?.growth || 0) >= 0 ? 'text-success' : 'text-error'
            )}>
              {revenueChart.metrics?.growth.toFixed(1)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <ChartContainer
        title="Revenue Trend"
        description="Daily revenue over time"
        isLoading={revenueChart.loading}
        actions={
          <>
            <ChartFilters
              period={period}
              onPeriodChange={setPeriod}
              showComparison
              comparison="previous"
              onComparisonChange={() => {}}
            />
            <ChartExport
              chartRef={{ current: null }}
              data={revenueChart.formattedData || []}
              filename="revenue-trend"
            />
          </>
        }
      >
        <div className="h-full w-full flex items-center justify-center text-gray-500">
          Chart visualization will be rendered here with recharts
        </div>
      </ChartContainer>

      {/* Revenue by Source */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Customer</CardTitle>
            <CardDescription>Top 5 customers by revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm">Customer {i + 1}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium">
                      {formatNigerianNumber(1000000 - i * 150000)}
                    </span>
                    <span className="text-xs text-gray-500 w-12 text-right">
                      {20 - i * 3}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue by Product</CardTitle>
            <CardDescription>Top 5 products/services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm">Product {i + 1}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium">
                      {formatNigerianNumber(800000 - i * 120000)}
                    </span>
                    <span className="text-xs text-gray-500 w-12 text-right">
                      {15 - i * 2}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default RevenueAnalytics;
