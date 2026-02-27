'use client';

import { useRegulatory } from '@/lib/hooks/useRegulatory';
import { useCSID } from '@/lib/hooks/useCSID';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CSIDisplay } from '@/components/regulatory/ClearanceDetails/CSIDisplay';
import { CountdownBadge } from '@/components/regulatory/Timer/CountdownBadge';
import { formatNigerianNumber, formatDate } from '@/lib/utils';
import { Eye } from 'lucide-react';
import Link from 'next/link';

export default function RegulatoryPage() {
  const { invoices, isLoading } = useRegulatory();
  const { csid, isLoadingCSID } = useCSID();

  const inReview = invoices?.filter(i => i.status === 'buyer_review' || i.status === 'submitted') || [];
  const approved = invoices?.filter(i => i.status === 'approved') || [];
  const rejected = invoices?.filter(i => i.status === 'rejected') || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Regulatory Clearance</h1>
        <p className="text-gray-600 mt-1">
          Track FIRS clearance status and manage your CSID
        </p>
      </div>

      {/* CSID Status */}
      {!isLoadingCSID && csid && (
        <CSIDisplay csid={csid} />
      )}

      {/* Tabs */}
      <Tabs defaultValue="in-review" className="space-y-6">
        <TabsList>
          <TabsTrigger value="in-review" className="relative">
            In Review
            {inReview.length > 0 && (
              <Badge variant="warning" className="ml-2">
                {inReview.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved
            {approved.length > 0 && (
              <Badge variant="success" className="ml-2">
                {approved.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected
            {rejected.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {rejected.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="in-review">
          <Card>
            <CardHeader>
              <CardTitle>In Review</CardTitle>
              <CardDescription>
                Invoices currently in buyer review or awaiting FIRS approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              {inReview.length === 0 ? (
                <p className="text-center py-8 text-gray-500">
                  No invoices in review
                </p>
              ) : (
                <div className="space-y-4">
                  {inReview.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-sm">{invoice.invoiceNumber}</span>
                          <CountdownBadge 
                            status={invoice.timer!} 
                            size="sm"
                          />
                        </div>
                        <p className="text-sm text-gray-600">{invoice.customerName}</p>
                        <p className="text-xs text-gray-500">
                          Due: {formatDate(invoice.dueDate)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="font-medium">{formatNigerianNumber(invoice.totalAmount)}</p>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/regulatory/${invoice.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Approved</CardTitle>
              <CardDescription>
                Invoices successfully cleared by FIRS
              </CardDescription>
            </CardHeader>
            <CardContent>
              {approved.length === 0 ? (
                <p className="text-center py-8 text-gray-500">
                  No approved invoices
                </p>
              ) : (
                <div className="space-y-4">
                  {approved.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div>
                        <p className="font-mono text-sm">{invoice.invoiceNumber}</p>
                        <p className="text-sm text-gray-600">{invoice.customerName}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="font-medium">{formatNigerianNumber(invoice.totalAmount)}</p>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/regulatory/${invoice.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected">
          <Card>
            <CardHeader>
              <CardTitle>Rejected</CardTitle>
              <CardDescription>
                Invoices rejected by FIRS - require attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              {rejected.length === 0 ? (
                <p className="text-center py-8 text-gray-500">
                  No rejected invoices
                </p>
              ) : (
                <div className="space-y-4">
                  {rejected.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 border-error/20 bg-error/5"
                    >
                      <div>
                        <p className="font-mono text-sm">{invoice.invoiceNumber}</p>
                        <p className="text-sm text-gray-600">{invoice.customerName}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="font-medium">{formatNigerianNumber(invoice.totalAmount)}</p>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/regulatory/${invoice.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
