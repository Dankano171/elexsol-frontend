'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Check, Download, QrCode } from 'lucide-react';
import { toast } from 'sonner';
import QRCode from 'qrcode.react';

interface IRNDisplayProps {
  irn: string;
  qrCode?: string;
  signature?: string;
  onDownload?: () => void;
}

export function IRNDisplay({ irn, qrCode, signature, onDownload }: IRNDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${label} copied to clipboard`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>FIRS Clearance</span>
          <Button variant="ghost" size="icon" onClick={() => setShowQR(!showQR)}>
            <QrCode className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* QR Code */}
        {showQR && qrCode && (
          <div className="flex justify-center p-4 bg-white rounded-lg">
            <QRCode value={qrCode} size={150} />
          </div>
        )}

        {/* IRN Field */}
        <div className="space-y-2">
          <Label htmlFor="irn">Invoice Reference Number (IRN)</Label>
          <div className="flex space-x-2">
            <Input
              id="irn"
              value={irn}
              readOnly
              className="font-mono text-sm"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => copyToClipboard(irn, 'IRN')}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Signature (if available) */}
        {signature && (
          <div className="space-y-2">
            <Label htmlFor="signature">Digital Signature</Label>
            <div className="flex space-x-2">
              <Input
                id="signature"
                value={signature.substring(0, 50) + '...'}
                readOnly
                className="font-mono text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(signature, 'Signature')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Download Button */}
        {onDownload && (
          <Button onClick={onDownload} className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Download Stamped Invoice
          </Button>
        )}

        {/* Verification Badge */}
        <div className="flex items-center justify-center p-2 bg-success/10 rounded">
          <Check className="h-4 w-4 text-success mr-2" />
          <span className="text-xs text-success">Verified by FIRS</span>
        </div>
      </CardContent>
    </Card>
  );
}
