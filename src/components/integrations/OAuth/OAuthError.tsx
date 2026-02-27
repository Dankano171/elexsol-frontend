'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface OAuthErrorProps {
  error: string;
  provider: string;
}

export function OAuthError({ error, provider }: OAuthErrorProps) {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="bg-error/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="h-8 w-8 text-error" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Connection Failed</h2>
        <p className="text-gray-600 mb-6">
          We couldn't connect to {provider}. {error}
        </p>
        <div className="flex justify-center space-x-4">
          <Button asChild variant="outline">
            <Link href="/integrations">Back to Integrations</Link>
          </Button>
          <Button asChild>
            <Link href={`/integrations/connect/${provider}`}>Try Again</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
