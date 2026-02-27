'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function OAuthCallback() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (window.opener) {
      if (error) {
        window.opener.postMessage({
          type: 'oauth-error',
          error,
        }, window.location.origin);
      } else if (code) {
        window.opener.postMessage({
          type: 'oauth-success',
          code,
          state,
        }, window.location.origin);
      }
      window.close();
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Completing authorization...</h2>
        <p className="text-gray-500">You can close this window if nothing happens.</p>
      </div>
    </div>
  );
}
