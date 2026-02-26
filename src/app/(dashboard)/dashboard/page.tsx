'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { FinancialPulse } from '@/components/dashboard/FinancialPulse';
import { InsightsEngine } from '@/components/dashboard/InsightsEngine';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { QuickActions } from '@/components/dashboard/QuickActions';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user?.firstName}!</h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your business today.
        </p>
      </div>

      {/* Financial Pulse */}
      <FinancialPulse />

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Insights Engine - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <InsightsEngine />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <QuickActions />
          <ActivityFeed />
        </div>
      </div>

      {/* Recent Invoices Preview */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* This will be implemented in Phase 3 */}
      </div>
    </div>
  );
}
