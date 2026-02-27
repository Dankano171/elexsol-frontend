'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { PDFPreview } from './PDFPreview';
import { DownloadStamp } from '../ClearanceDetails/DownloadStamp';
import { CheckCircle, QrCode } from 'lucide-react';
import QRCode from 'qrcode.react';

interface StampedInvoiceProps {
  invoice: any;
  stampedUrl: string;
  qrCode: string;
  onDownload?: (format: 'pdf' | 'png' | 'zip') => void;
}

export function StampedInvoice({ invoice, stampedUrl, qrCode, onDownload }: StampedInvoiceProps) {
  const [activeTab, setActiveTab] = useState('preview');

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Stamped Invoice</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="success" className="flex items-center">
              <CheckCircle className="h-3 w-3 mr-1" />
              FIRS Verified
            </Badge>
            <DownloadStamp invoiceId={invoice.id} onDownload={onDownload} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="qr">QR Code</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="mt-6">
            <PDFPreview url={stampedUrl} />
          </TabsContent>

          <TabsContent value="qr" className="mt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <QRCode value={qrCode} size={200} />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Scan this QR code to verify the invoice with FIRS
                </p>
                <code className="px-3 py-1 bg-gray-100 rounded text-xs">
                  {invoice.irn}
                </code>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
