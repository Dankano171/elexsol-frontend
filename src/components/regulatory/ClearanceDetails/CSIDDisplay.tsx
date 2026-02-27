'use client';

import { CSIData } from '@/types/regulatory';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface CSIDisplayProps {
  csid: CSIData;
  onRenew?: () => void;
}

export function CSIDisplay({ csid, onRenew }: CSIDisplayProps) {
  const getStatusIcon = () => {
    switch (csid.status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'expiring':
        return <Clock className="h-5 w-5 text-warning" />;
      case 'expired':
        return <AlertCircle className="h-5 w-5 text-error" />;
    }
  };

  const getStatusText = () => {
    switch (csid.status) {
      case 'active':
        return 'Active';
      case 'expiring':
        return 'Expiring Soon';
      case 'expired':
        return 'Expired';
    }
  };

  const getStatusColor = () => {
    switch (csid.status) {
      case 'active':
        return 'text-success border-success';
      case 'expiring':
        return 'text-warning border-warning';
      case 'expired':
        return 'text-error border-error';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>CSID Status</span>
          <Badge variant="outline" className={getStatusColor()}>
            {getStatusIcon()}
            <span className="ml-1">{getStatusText()}</span>
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* CSID Value */}
        <div>
          <p className="text-xs text-gray-500 mb-1">Communication Session ID</p>
          <code className="px-2 py-1 bg-gray-100 rounded text-sm">
            {csid.csid}
          </code>
        </div>

        {/* Expiry Info */}
        {csid.expiresAt && (
          <div>
            <p className="text-xs text-gray-500 mb-1">Expires</p>
            <p className="text-sm font-medium">
              {formatDistanceToNow(csid.expiresAt, { addSuffix: true })}
            </p>
          </div>
        )}

        {/* Certificate Details */}
        {csid.certificateDetails && (
          <div className="mt-4 pt-4 border-t space-y-2">
            <p className="text-xs text-gray-500">Certificate Details</p>
            <div className="text-xs">
              <p><span className="text-gray-500">Issuer:</span> {csid.certificateDetails.issuer}</p>
              <p><span className="text-gray-500">Subject:</span> {csid.certificateDetails.subject}</p>
              <p><span className="text-gray-500">Valid From:</span> {new Date(csid.certificateDetails.validFrom).toLocaleDateString()}</p>
              <p><span className="text-gray-500">Valid To:</span> {new Date(csid.certificateDetails.validTo).toLocaleDateString()}</p>
            </div>
          </div>
        )}

        {/* Renew Button */}
        {csid.status !== 'active' && onRenew && (
          <Button onClick={onRenew} className="w-full">
            Renew CSID
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
