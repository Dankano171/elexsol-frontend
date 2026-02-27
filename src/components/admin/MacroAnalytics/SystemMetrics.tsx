'use client';

import { SystemMetrics } from '@/types/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Users, Building2, FileText, Link2, Gauge } from 'lucide-react';

interface SystemMetricsProps {
  metrics: SystemMetrics;
}

export function SystemMetrics({ metrics }: SystemMetricsProps) {
  const cards = [
    {
      title: 'Total Businesses',
      value: metrics.businesses.total,
      subValue: `+${metrics.businesses.growth}% this month`,
      icon: Building2,
      color: 'text-blue-500 bg-blue-50',
    },
    {
      title: 'Active Users',
      value: metrics.users.active,
      subValue: `${metrics.users.withMFA}% with MFA`,
      icon: Users,
      color: 'text-green-500 bg-green-50',
    },
    {
      title: 'Total Revenue',
      value: `₦${(metrics.financials.totalRevenue / 1000000).toFixed(1)}M`,
      subValue: `${metrics.financials.averageTransaction.toLocaleString()} avg`,
      icon: Activity,
      color: 'text-purple-500 bg-purple-50',
    },
    {
      title: 'Invoices',
      value: metrics.invoices.total,
      subValue: `${metrics.invoices.processed} processed`,
      icon: FileText,
      color: 'text-orange-500 bg-orange-50',
    },
    {
      title: 'Integrations',
      value: metrics.integrations.total,
      subValue: `${metrics.integrations.active} active`,
      icon: Link2,
      color: 'text-pink-500 bg-pink-50',
    },
    {
      title: 'System Health',
      value: `${metrics.performance.uptime}%`,
      subValue: `${metrics.performance.errorRate}% error rate`,
      icon: Gauge,
      color: 'text-indigo-500 bg-indigo-50',
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <p className="text-2xl font-bold">{card.value}</p>
                  <p className="text-xs text-gray-500">{card.subValue}</p>
                </div>
                <div className={cn('p-3 rounded-lg', card.color)}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
