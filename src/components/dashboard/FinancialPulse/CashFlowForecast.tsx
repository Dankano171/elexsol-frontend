'use client';

import { useDashboard } from '@/lib/hooks/useDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { formatNigerianNumber } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function CashFlowForecast() {
  const { cashFlowForecast, cashFlowForecastLoading } = useDashboard();

  if (cashFlowForecastLoading) {
    return <Skeleton className="h-[300px]" />;
  }

  if (!cashFlowForecast || cashFlowForecast.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No forecast data available
        </AlertDescription>
      </Alert>
    );
  }

  const totalInflow = cashFlowForecast.reduce((sum, day) => sum + (day.amount > 0 ? day.amount : 0), 0);
  const totalOutflow = cashFlowForecast.reduce((sum, day) => sum + (day.amount < 0 ? -day.amount : 0), 0);
  const netPosition = totalInflow - totalOutflow;

  const criticalDays = cashFlowForecast.filter(day => day.amount < 0).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">30-Day Cash Flow Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 bg-success/10 rounded-lg">
              <p className="text-xs text-success mb-1">Expected Inflow</p>
              <p className="text-lg font-bold text-success">{formatNigerianNumber(totalInflow)}</p>
            </div>
            <div className="p-3 bg-error/10 rounded-lg">
              <p className="text-xs text-error mb-1">Expected Outflow</p>
              <p className="text-lg font-bold text-error">{formatNigerianNumber(totalOutflow)}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-600 mb-1">Net Position</p>
              <p className="text-lg font-bold text-blue-600">{formatNigerianNumber(netPosition)}</p>
            </div>
          </div>

          {/* Alert for critical days */}
          {criticalDays > 0 && (
            <Alert variant="destructive" className="bg-error/10 border-error/20">
              <AlertCircle className="h-4 w-4 text-error" />
              <AlertDescription className="text-error">
                {criticalDays} days with negative cash flow projected. Consider reviewing your expenses.
              </AlertDescription>
            </Alert>
          )}

          {/* Mini chart preview (full chart in Phase 2.6) */}
          <div className="h-24 flex items-end space-x-1">
            {cashFlowForecast.slice(0, 30).map((day, index) => {
              const maxAmount = Math.max(...cashFlowForecast.map(d => Math.abs(d.amount)));
              const height = (Math.abs(day.amount) / maxAmount) * 100;
              
              return (
                <div
                  key={index}
                  className="flex-1 group relative"
                >
                  <div
                    className={cn(
                      'w-full rounded-t transition-all hover:opacity-80',
                      day.amount >= 0 ? 'bg-success' : 'bg-error'
                    )}
                    style={{ height: `${height}%` }}
                  />
                  <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 hidden group-hover:block z-10">
                    <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                      {formatNigerianNumber(day.amount)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end space-x-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-success rounded mr-1" />
              <span>Inflow</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-error rounded mr-1" />
              <span>Outflow</span>
            </div>
          </div>

          {/* Trend indicator */}
          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-sm text-gray-600">Projected trend</span>
            <div className="flex items-center">
              {netPosition > totalInflow * 0.5 ? (
                <>
                  <TrendingUp className="h-4 w-4 text-success mr-1" />
                  <span className="text-sm font-medium text-success">Strong growth</span>
                </>
              ) : netPosition < 0 ? (
                <>
                  <TrendingDown className="h-4 w-4 text-error mr-1" />
                  <span className="text-sm font-medium text-error">Declining</span>
                </>
              ) : (
                <span className="text-sm font-medium text-gray-500">Stable</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
