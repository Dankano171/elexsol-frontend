'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useIntegrations } from '@/lib/hooks/useIntegrations';
import { OAuthPopup } from '@/components/integrations/OAuth/OAuthPopup';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const providers = [
  {
    id: 'zoho',
    name: 'Zoho Books',
    description: 'Sync invoices, contacts, and payments',
    icon: 'Z',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    description: 'Send invoices and payment reminders',
    icon: 'W',
    color: 'bg-green-100 text-green-600',
  },
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    description: 'Sync accounting and financial data',
    icon: 'Q',
    color: 'bg-red-100 text-red-600',
  },
];

export default function ConnectIntegrationPage() {
  const router = useRouter();
  const { getOAuthUrl, connect } = useIntegrations();
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [oauthUrl, setOauthUrl] = useState('');
  const [showOAuth, setShowOAuth] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const [formData, setFormData] = useState({
    accountEmail: '',
    accessToken: '',
    refreshToken: '',
  });

  const handleProviderSelect = async (providerId: string) => {
    setSelectedProvider(providerId);
    
    if (providerId !== 'whatsapp') { // WhatsApp doesn't use OAuth
      try {
        const { url } = await getOAuthUrl(providerId as any);
        setOauthUrl(url);
        setShowOAuth(true);
      } catch (error) {
        // Fallback to manual mode
        setManualMode(true);
      }
    } else {
      setManualMode(true);
    }
  };

  const handleOAuthSuccess = async (code: string, state?: string) => {
    if (selectedProvider) {
      // Handle OAuth callback
      // This would call a backend endpoint to exchange code for tokens
    }
  };

  const handleManualConnect = async () => {
    if (!selectedProvider) return;

    await connect({
      provider: selectedProvider as any,
      accountEmail: formData.accountEmail,
      accessToken: formData.accessToken,
      refreshToken: formData.refreshToken,
      scopes: [],
    });

    router.push('/integrations');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/integrations">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Connect Integration</h1>
          <p className="text-gray-600 mt-1">
            Choose a provider to connect
          </p>
        </div>
      </div>

      {!selectedProvider ? (
        // Provider Selection
        <div className="grid gap-6 md:grid-cols-3">
          {providers.map((provider) => (
            <Card
              key={provider.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleProviderSelect(provider.id)}
            >
              <CardHeader>
                <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center mb-4', provider.color)}>
                  <span className="text-xl font-bold">{provider.icon}</span>
                </div>
                <CardTitle>{provider.name}</CardTitle>
                <CardDescription>{provider.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        // Connection Form
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>
              Connect {providers.find(p => p.id === selectedProvider)?.name}
            </CardTitle>
            <CardDescription>
              {manualMode 
                ? 'Enter your API credentials manually'
                : 'Authorize access to your account'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {manualMode ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Account Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="account@example.com"
                    value={formData.accountEmail}
                    onChange={(e) => setFormData({ ...formData, accountEmail: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accessToken">Access Token</Label>
                  <Input
                    id="accessToken"
                    type="password"
                    value={formData.accessToken}
                    onChange={(e) => setFormData({ ...formData, accessToken: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="refreshToken">Refresh Token (Optional)</Label>
                  <Input
                    id="refreshToken"
                    type="password"
                    value={formData.refreshToken}
                    onChange={(e) => setFormData({ ...formData, refreshToken: e.target.value })}
                  />
                </div>
                <Button 
                  className="w-full mt-6" 
                  onClick={handleManualConnect}
                  disabled={!formData.accountEmail || !formData.accessToken}
                >
                  Connect
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Button onClick={() => setShowOAuth(true)}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Authorize in Popup
                </Button>
                <Button
                  variant="link"
                  className="mt-4"
                  onClick={() => setManualMode(true)}
                >
                  Or enter credentials manually
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* OAuth Popup */}
      {showOAuth && (
        <OAuthPopup
          url={oauthUrl}
          onSuccess={handleOAuthSuccess}
          onError={(error) => {
            console.error('OAuth error:', error);
            setManualMode(true);
          }}
          open={showOAuth}
          onOpenChange={setShowOAuth}
        />
      )}
    </div>
  );
}
