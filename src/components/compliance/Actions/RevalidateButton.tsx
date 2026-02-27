'use client';

import { useState } from 'react';
import { useCompliance } from '@/lib/hooks/useCompliance';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';

interface RevalidateButtonProps {
  invoiceId: string;
  onComplete?: () => void;
}

export function RevalidateButton({ invoiceId, onComplete }: RevalidateButtonProps) {
  const [isRevalidating, setIsRevalidating] = useState(false);
  const { revalidate } = useCompliance();

  const handleRevalidate = async () => {
    setIsRevalidating(true);
    try {
      await revalidate({ invoiceId, corrections: {} });
      onComplete?.();
    } finally {
      setIsRevalidating(false);
    }
  };

  return (
    <Button
      variant="default"
      size="sm"
      onClick={handleRevalidate}
      disabled={isRevalidating}
    >
      {isRevalidating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Re-validating...
        </>
      ) : (
        <>
          <RefreshCw className="mr-2 h-4 w-4" />
          Re-Validate & Clear
        </>
      )}
    </Button>
  );
}
