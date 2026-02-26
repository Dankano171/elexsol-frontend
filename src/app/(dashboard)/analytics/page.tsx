'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RevenueAnalytics } from './revenue/page';
import { VelocityAnalytics } from './velocity/page';
import { CashflowAnalytics } from './cashflow/page';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-gray-600 mt-1">
          Deep dive into your business performance metrics
        </p>
      </div>

      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="velocity">Payment Velocity</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue">
          <RevenueAnalytics />
        </TabsContent>

        <TabsContent value="velocity">
          <VelocityAnalytics />
        </TabsContent>

        <TabsContent value="cashflow">
          <CashflowAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}
