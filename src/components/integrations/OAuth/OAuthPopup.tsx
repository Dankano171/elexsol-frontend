'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface OAuthPopupProps {
  url: string;
  onSuccess: (code: string, state?: string) => void;
  onError: (error: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OAuthPopup({ url, onSuccess, onError, open, onOpenChange }: OAuthPopupProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open) return;

    const popup = window.open(url, 'oauth-popup', 'width=600,height=700,menubar=no,toolbar=no,location=no,status=no');

    const handleMessage = (event: MessageEvent) => {
      // Verify origin
      if (!event.origin.includes(window.location.origin)) return;

      if (event.data.type === 'oauth-success') {
        onSuccess(event.data.code, event.data.state);
        onOpenChange(false);
      } else if (event.data.type === 'oauth-error') {
        onError(event.data.error);
        onOpenChange(false);
      }
    };

    window.addEventListener('message', handleMessage);

    // Check if popup was closed
    const interval = setInterval(() => {
      if (popup?.closed) {
        setLoading(false);
        onError('Popup was closed');
        onOpenChange(false);
      }
    }, 500);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearInterval(interval);
      popup?.close();
    };
  }, [url, onSuccess, onError, open, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Integration</DialogTitle>
          <DialogDescription>
            Complete the authorization in the popup window.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-8">
          {loading ? (
            <>
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-sm text-gray-500">
                Waiting for authorization...
              </p>
            </>
          ) : (
            <>
              <p className="text-sm text-error mb-4">
                Authorization was cancelled or failed.
              </p>
              <Button onClick={() => window.open(url, 'oauth-popup')}>
                Try Again
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
