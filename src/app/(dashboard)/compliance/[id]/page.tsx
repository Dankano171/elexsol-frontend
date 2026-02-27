'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { complianceApi } from '@/lib/api/compliance';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';
import { ClearanceTimeline } from '@/components/regulatory/ClearanceTimeline';
import { SeventyTwoHourTimer } from '@/components/regulatory/Timer/SeventyTwoHourTimer';
import { IRNDisplay } from '@/components/regulatory/ClearanceDetails/IRNDisplay';
import { formatNigerianNumber, formatDate } from '@/lib/utils';

export default function InvoiceCompliancePage() {
  const params = useParams();
  const invoiceId = params.id as string;

  const { data: invoice, isLoading } = useQuery({
    queryKey: ['compliance', 'invoice', invoiceId],
    queryFn: () => complianceApi.getInvoice(invoiceId),
  });

  const { data: clearanceStatus } = useQuery({
    queryKey: ['compliance', 'clearance', invoiceId],
    queryFn: () => complianceApi.getClearanceStatus(invoiceId),
    refetchInterval: 10000,
  });

  const { data: timerStatus } = useQuery({
    queryKey: ['compliance', 'timer', invoiceId],
    queryFn: () => complianceApi.getTimerStatus(invoiceId),
    refetchInterval: 1000,
    enabled: clearanceStatus?.stage === 'buyer_review',
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/compliance">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Invoice #{invoice?.invoiceNumber}</h1>
          <p className="text-gray-600 mt-1">
            Compliance details and clearance status
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Invoice Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Clearance Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Clearance Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ClearanceTimeline status={clearanceStatus} />
            </CardContent>
          </Card>

          {/* Invoice Details */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm text-gray-500">Customer</dt>
                  <dd className="text-lg font-medium">{invoice?.customerName}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">TIN</dt>
                  <dd className="text-lg font-mono">{invoice?.customerTin}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Issue Date</dt>
                  <dd className="text-lg">{formatDate(invoice?.issueDate)}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Due Date</dt>
                  <dd className="text-lg">{formatDate(invoice?.dueDate)}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Amount</dt>
                  <dd className="text-lg font-bold">
                    {formatNigerianNumber(invoice?.totalAmount || 0)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">VAT</dt>
                  <dd className="text-lg">
                    {formatNigerianNumber(invoice?.vatAmount || 0)}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Clearance Info */}
        <div className="space-y-6">
          {/* 72-Hour Timer */}
          {clearanceStatus?.stage === 'buyer_review' && timerStatus && (
            <SeventyTwoHourTimer status={timerStatus} />
          )}

          {/* IRN Display */}
          {invoice?.irn && (
            <IRNDisplay irn={invoice.irn} qrCode={invoice.qrCode} />
          )}

          {/* Download Options */}
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Stamped Invoice (PDF)
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                FIRS Receipt (PDF)
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                QR Code (PNG)
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
