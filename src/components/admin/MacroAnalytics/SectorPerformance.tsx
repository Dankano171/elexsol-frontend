'use client';

import { SectorPerformance } from '@/types/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface SectorPerformanceProps {
  sectors: SectorPerformance[];
}

export function SectorPerformance({ sectors }: SectorPerformanceProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sector Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sectors.map((sector) => (
            <div key={sector.sector} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{sector.sector}</p>
                  <p className="text-xs text-gray-500">
                    {sector.businessCount} businesses · ₦{(sector.totalRevenue / 1000000).toFixed(1)}M
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {sector.growthRate > 0 ? (
                    <TrendingUp className="h-4 w-4 text-success" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-error" />
                  )}
                  <span className={cn(
                    'text-sm font-medium',
                    sector.growthRate > 0 ? 'text-success' : 'text-error'
                  )}>
                    {sector.growthRate > 0 ? '+' : ''}{sector.growthRate}%
                  </span>
                </div>
              </div>

              {/* Compliance Rate */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Compliance Rate</span>
                  <span className="font-medium">{sector.complianceRate}%</span>
                </div>
                <Progress value={sector.complianceRate} className="h-1" />
              </div>

              {/* Payment Velocity */}
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Payment Velocity</span>
                <span className="font-medium">{sector.averageVelocity} days</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
