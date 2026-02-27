'use client';

import { useParams } from 'next/navigation';
import { useRegulatory } from '@/lib/hooks/useRegulatory';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ClearanceTimeline } from '@/components/regulatory/ClearanceTimeline';
import { SeventyTwoHourTimer } from '@/components/regulatory/Timer/SeventyTwoHourTimer';
import { IRNDisplay } from '@/components/regulatory/ClearanceDetails/IRNDisplay';
import { StampedInvoice } from '@/components/regulatory/InvoicePreview/StampedInvoice';
import { formatNigerianNumber, formatDate } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export default function RegulatoryInvoicePage() {
  const params = useParams();
  const invoiceId = params.id as string;
  
  const {
    invoice,
    isLoadingInvoice,
    clearanceStatus,
    timerStatus,
    irn,
    downloadStamped,
    requestExtension,
  } = useRegulatory(invoiceId);

  if (isLoadingInvoice) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-96" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-64" />
            <Skeleton className="h-48" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/regulatory">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Invoice #{invoice?.invoiceNumber}</h1>
          <p className="text-gray-600 mt-1">
            Track FIRS clearance status
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Timeline & Details */}
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

        {/* Right Column - Timer & IRN */}
        <div className="space-y-6">
          {/* 72-Hour Timer */}
          {clearanceStatus?.stage === 'buyer_review' && timerStatus && (
            <SeventyTwoHourTimer
              status={timerStatus}
              onRequestExtension={() => requestExtension({ id: invoiceId, reason: 'Need more time' })}
            />
          )}

          {/* IRN Display */}
          {invoice?.firsStatus?.irn && (
            <IRNDisplay
              irn={invoice.firsStatus.irn}
              qrCode={invoice.firsStatus.qrCode}
              signature={invoice.firsStatus.signature}
              onDownload={() => downloadStamped(invoiceId)}
            />
          )}
        </div>
      </div>

      {/* Stamped Invoice Preview */}
      {invoice?.firsStatus?.irn && (
        <StampedInvoice
          invoice={invoice}
          stampedUrl={`/api/invoices/${invoiceId}/stamped`}
          qrCode={invoice.firsStatus.qrCode || ''}
          onDownload={downloadStamped}
        />
      )}
    </div>
  );
}
