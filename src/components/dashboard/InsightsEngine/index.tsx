'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InvoiceVolumeChart } from './InvoiceVolumeChart';
import { PaymentCollectionChart } from './PaymentCollectionChart';
import { LiquidityGapChart } from './LiquidityGapChart';
import { ChartControls } from './ChartControls';

export function InsightsEngine() {
  const [period, setPeriod] = useState<'week' | 'month' | 'quarter'>('month');
  const [showProjected, setShowProjected] = useState(true);
  const [showBenchmark, setShowBenchmark] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Insights Engine</CardTitle>
            <CardDescription>
              Track invoice volume vs payment collections to identify liquidity gaps
            </CardDescription>
          </div>
          <ChartControls
            period={period}
            onPeriodChange={setPeriod}
            showProjected={showProjected}
            onShowProjectedChange={setShowProjected}
            showBenchmark={showBenchmark}
            onShowBenchmarkChange={setShowBenchmark}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="volume" className="space-y-4">
          <TabsList>
            <TabsTrigger value="volume">Invoice Volume</TabsTrigger>
            <TabsTrigger value="collection">Payment Collection</TabsTrigger>
            <TabsTrigger value="gap">Liquidity Gap</TabsTrigger>
          </TabsList>

          <TabsContent value="volume" className="pt-4">
            <InvoiceVolumeChart
              period={period}
              showProjected={showProjected}
            />
          </TabsContent>

          <TabsContent value="collection" className="pt-4">
            <PaymentCollectionChart
              period={period}
              showProjected={showProjected}
              showBenchmark={showBenchmark}
            />
          </TabsContent>

          <TabsContent value="gap" className="pt-4">
            <LiquidityGapChart
              period={period}
              showProjected={showProjected}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
