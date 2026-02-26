'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/dashboard/Charts/ChartContainer';
import { ChartFilters } from '@/components/dashboard/Charts/ChartFilters';
import { ChartExport } from '@/components/dashboard/Charts/ChartExport';
import { useDashboardCharts } from '@/lib/hooks/useDashboardCharts';
import { formatNigerianNumber } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function CashflowAnalytics() {
  const [period, setPeriod] = useState('month');
  const { revenueChart } = useDashboardCharts();

  // Mock cashflow data
  const cashflowData = {
    current: 1250000,
    projected: 1800000,
    inflow: 3200000,
    outflow: 1950000,
    runway: 145,
    burnRate: 250000,
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Current Balance</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {formatNigerianNumber(cashflowData.current)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>30-Day Forecast</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-success">
              {formatNigerianNumber(cashflowData.projected)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Monthly Burn</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-warning">
              {formatNigerianNumber(cashflowData.burnRate)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Runway</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{cashflowData.runway} days</p>
          </CardContent>
        </Card>
      </div>

      {/* Cash Flow Chart */}
      <ChartContainer
        title="Cash Flow Projection"
        description="30-day cash flow forecast"
        isLoading={revenueChart.loading}
        actions={
          <>
            <ChartFilters
              period={period}
              onPeriodChange={setPeriod}
            />
            <ChartExport
              chartRef={{ current: null }}
              data={[]}
              filename="cashflow-forecast"
            />
          </>
        }
      >
        <div className="h-full w-full flex items-center justify-center text-gray-500">
          Chart visualization will be rendered here with recharts
        </div>
      </ChartContainer>

      {/* Cash Flow Breakdown */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Inflow vs Outflow</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Total Inflow</span>
                  <span className="font-medium text-success">
                    {formatNigerianNumber(cashflowData.inflow)}
                  </span>
                </div>
                <Progress value={65} className="h-2" indicatorClassName="bg-success" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Total Outflow</span>
                  <span className="font-medium text-error">
                    {formatNigerianNumber(cashflowData.outflow)}
                  </span>
                </div>
                <Progress value={40} className="h-2" indicatorClassName="bg-error" />
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="font-medium">Net Position</span>
                  <span className="text-lg font-bold text-primary">
                    {formatNigerianNumber(cashflowData.inflow - cashflowData.outflow)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Payments</CardTitle>
            <CardDescription>Next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">Invoice #{2024000 + i}</p>
                    <p className="text-xs text-gray-500">Due in {i + 1} days</p>
                  </div>
                  <span className="font-medium">
                    {formatNigerianNumber(150000 + i * 50000)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Runway Alert */}
      {cashflowData.runway < 90 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Your cash runway is less than 90 days. Consider reviewing expenses or accelerating collections.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export default CashflowAnalytics;
