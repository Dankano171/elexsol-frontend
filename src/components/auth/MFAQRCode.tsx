'use client';

import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Download } from 'lucide-react';
import { toast } from 'sonner';

interface MFAQRCodeProps {
  secret: string;
  qrCode: string;
  backupCodes: string[];
}

export function MFAQRCode({ secret, qrCode, backupCodes }: MFAQRCodeProps) {
  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  const downloadBackupCodes = () => {
    const content = backupCodes.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'elexsol-backup-codes.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Scan QR Code</CardTitle>
          <CardDescription>
            Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="bg-white p-4 rounded-lg mb-4">
            <QRCodeSVG value={qrCode} size={200} />
          </div>
          <div className="flex items-center space-x-2">
            <code className="px-3 py-1 bg-gray-100 rounded text-sm">{secret}</code>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(secret, 'Secret copied to clipboard')}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Backup Codes</CardTitle>
          <CardDescription>
            Save these backup codes in a secure place. You can use each code once if you lose access to your authenticator app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {backupCodes.map((code, index) => (
              <div
                key={index}
                className="px-3 py-2 bg-gray-100 rounded font-mono text-sm text-center"
              >
                {code}
              </div>
            ))}
          </div>
          <Button onClick={downloadBackupCodes} className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Download Backup Codes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
