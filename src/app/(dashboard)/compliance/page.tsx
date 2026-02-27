'use client';

import { useCompliance } from '@/lib/hooks/useCompliance';
import { ComplianceGrid } from '@/components/compliance/ComplianceGrid';
import { BulkActions } from '@/components/compliance/Actions/BulkActions';
import { ExportButton } from '@/components/compliance/Actions/ExportButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default function CompliancePage() {
  const { flaggedInvoices, summary, isLoading, refresh } = useCompliance();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Compliance Center</h1>
        <p className="text-gray-600 mt-1">
          Ensure your invoices meet FIRS requirements
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Flagged</p>
                <p className="text-2xl font-bold text-error">
                  {summary?.flagged || 0}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-error" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Review</p>
                <p className="text-2xl font-bold text-warning">
                  {summary?.inReview || 0}
                </p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cleared</p>
                <p className="text-2xl font-bold text-success">
                  {summary?.cleared || 0}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approval Rate</p>
                <p className="text-2xl font-bold">
                  {summary?.approvalRate.toFixed(1)}%
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="flagged" className="space-y-6">
        <TabsList>
          <TabsTrigger value="flagged">Flagged</TabsTrigger>
          <TabsTrigger value="in-review">In Review</TabsTrigger>
          <TabsTrigger value="cleared">Cleared</TabsTrigger>
          <TabsTrigger value="all">All Invoices</TabsTrigger>
        </TabsList>

        <TabsContent value="flagged" className="space-y-4">
          <ComplianceGrid 
            data={flaggedInvoices?.filter(i => i.status === 'flagged') || []} 
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="in-review">
          <ComplianceGrid 
            data={flaggedInvoices?.filter(i => i.status === 'submitted') || []} 
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="cleared">
          <ComplianceGrid 
            data={flaggedInvoices?.filter(i => i.status === 'approved') || []} 
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="all">
          <ComplianceGrid 
            data={flaggedInvoices || []} 
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>

      {/* Floating Bulk Actions */}
      <BulkActions
        selectedCount={0} // This would come from table state
        onValidateAll={() => {}}
        onClearAll={() => {}}
        onExport={() => {}}
      />
    </div>
  );
}
