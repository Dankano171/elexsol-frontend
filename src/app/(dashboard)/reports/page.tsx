'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';

const reports = [
  {
    id: 'financial-summary',
    name: 'Financial Summary',
    description: 'Revenue, expenses, and profit overview',
    icon: FileText,
  },
  {
    id: 'payment-velocity',
    name: 'Payment Velocity Report',
    description: 'Average days to get paid by customer',
    icon: FileText,
  },
  {
    id: 'compliance-report',
    name: 'FIRS Compliance Report',
    description: 'Detailed compliance status and history',
    icon: FileText,
  },
  {
    id: 'customer-analysis',
    name: 'Customer Analysis',
    description: 'Top customers and payment behavior',
    icon: FileText,
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-gray-600 mt-1">
          Generate and download business reports
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {reports.map((report) => (
          <Card key={report.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-start space-x-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <report.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>{report.name}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
