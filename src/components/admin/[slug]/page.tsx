'use client';

import { useParams } from 'next/navigation';
import { useAdmin } from '@/lib/hooks/useAdmin';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SystemMetrics } from '@/components/admin/MacroAnalytics/SystemMetrics';
import { ErrorRateChart } from '@/components/admin/MacroAnalytics/ErrorRateChart';
import { SectorPerformance } from '@/components/admin/MacroAnalytics/SectorPerformance';
import { IntegrationHealth } from '@/components/admin/MacroAnalytics/IntegrationHealth';
import { AdminTable } from '@/components/admin/UserManagement/AdminTable';
import { InviteAdmin } from '@/components/admin/UserManagement/InviteAdmin';
import { AuditLog } from '@/components/admin/UserManagement/AuditLog';
import { ExportIntelligence } from '@/components/admin/Exports/ExportIntelligence';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

// This should match your hidden route pattern
const ADMIN_SLUG = process.env.NEXT_PUBLIC_ADMIN_SLUG || 'elex-control-99';

export default function AdminPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Simple security check - redirect if slug doesn't match
  if (slug !== ADMIN_SLUG) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center text-error">
              <AlertCircle className="h-5 w-5 mr-2" />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              You don't have permission to access this page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const {
    metrics,
    isLoadingMetrics,
    sectors,
    isLoadingSectors,
    users,
    isLoadingUsers,
    auditLogs,
    isLoadingAuditLogs,
    health,
    createUser,
    updateUser,
    deleteUser,
  } = useAdmin();

  // Mock integration health data
  const integrationHealth = [
    { provider: 'zoho', status: 'healthy', latency: 234, lastCheck: new Date(), errorCount: 0 },
    { provider: 'whatsapp', status: 'healthy', latency: 456, lastCheck: new Date(), errorCount: 0 },
    { provider: 'quickbooks', status: 'degraded', latency: 1234, lastCheck: new Date(), errorCount: 3 },
    { provider: 'firs', status: 'healthy', latency: 567, lastCheck: new Date(), errorCount: 1 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">
            System-wide analytics and management
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
            <TabsTrigger value="exports">Exports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* System Metrics */}
            {isLoadingMetrics ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-32" />
                ))}
              </div>
            ) : metrics && (
              <SystemMetrics metrics={metrics} />
            )}

            {/* Charts Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
              <ErrorRateChart />
              
              {isLoadingSectors ? (
                <Skeleton className="h-[400px]" />
              ) : sectors && (
                <SectorPerformance sectors={sectors} />
              )}
            </div>

            {/* Integration Health */}
            <IntegrationHealth health={integrationHealth} />
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            {/* User Management Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Administrators</h2>
              <InviteAdmin onInvite={createUser} />
            </div>

            {/* Admin Table */}
            {isLoadingUsers ? (
              <Skeleton className="h-64" />
            ) : users && (
              <AdminTable
                users={users}
                onEdit={updateUser}
                onDelete={deleteUser}
              />
            )}
          </TabsContent>

          <TabsContent value="audit">
            {isLoadingAuditLogs ? (
              <Skeleton className="h-96" />
            ) : auditLogs && (
              <AuditLog logs={auditLogs} />
            )}
          </TabsContent>

          <TabsContent value="exports">
            <ExportIntelligence />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
