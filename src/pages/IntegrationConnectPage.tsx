import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, MessageCircle, Calculator, CheckCircle2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

const integrationConfig: Record<string, { name: string; icon: any; description: string; fields: { id: string; label: string; placeholder: string; type: string }[]; docUrl: string }> = {
  zoho: {
    name: 'Zoho Books',
    icon: BookOpen,
    description: 'Connect your Zoho Books account to automatically sync invoices, expenses, and customer data.',
    fields: [
      { id: 'orgId', label: 'Organization ID', placeholder: 'e.g. 10234567890', type: 'text' },
      { id: 'clientId', label: 'Client ID', placeholder: 'OAuth Client ID', type: 'text' },
      { id: 'clientSecret', label: 'Client Secret', placeholder: 'OAuth Client Secret', type: 'password' },
    ],
    docUrl: 'https://www.zoho.com/books/api/',
  },
  whatsapp: {
    name: 'WhatsApp Business API',
    icon: MessageCircle,
    description: 'Connect WhatsApp Business to capture invoice data from customer conversations and receipts.',
    fields: [
      { id: 'phoneId', label: 'Phone Number ID', placeholder: 'From Meta Business Suite', type: 'text' },
      { id: 'accessToken', label: 'Permanent Access Token', placeholder: 'Bearer token', type: 'password' },
      { id: 'webhookSecret', label: 'Webhook Verify Token', placeholder: 'Custom verify token', type: 'text' },
    ],
    docUrl: 'https://developers.facebook.com/docs/whatsapp',
  },
  quickbooks: {
    name: 'QuickBooks',
    icon: Calculator,
    description: 'Sync your QuickBooks Online data including invoices, payments, and chart of accounts.',
    fields: [
      { id: 'companyId', label: 'Company ID', placeholder: 'e.g. 4620816365178044230', type: 'text' },
      { id: 'clientId', label: 'OAuth Client ID', placeholder: 'From Intuit Developer', type: 'text' },
      { id: 'clientSecret', label: 'OAuth Client Secret', placeholder: 'Client Secret', type: 'password' },
    ],
    docUrl: 'https://developer.intuit.com/',
  },
};

export default function IntegrationConnectPage() {
  const { provider } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const config = integrationConfig[provider || ''];

  if (!config) {
    return (
      <DashboardLayout title="Integration Not Found" subtitle="">
        <div className="text-center py-20">
          <p className="text-muted-foreground mb-4">Unknown integration provider.</p>
          <Button variant="outline" onClick={() => navigate('/integrations')}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const Icon = config.icon;

  const handleConnect = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`${config.name} connected successfully!`);
      navigate('/integrations');
    }, 1500);
  };

  return (
    <DashboardLayout title={`Connect ${config.name}`} subtitle="Configure your integration">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Button variant="ghost" size="sm" className="mb-4 text-muted-foreground" onClick={() => navigate('/integrations')}>
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Integrations
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="shadow-card border-none p-6 lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">{config.name}</h2>
                <p className="text-sm text-muted-foreground">{config.description}</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {config.fields.map(f => (
                <div key={f.id} className="space-y-2">
                  <Label htmlFor={f.id} className="text-sm font-medium">{f.label}</Label>
                  <Input id={f.id} type={f.type} placeholder={f.placeholder} className="h-11" />
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button onClick={handleConnect} disabled={loading} className="font-semibold">
                {loading ? 'Connecting...' : `Connect ${config.name}`}
              </Button>
              <Button variant="outline" asChild>
                <a href={config.docUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-1.5" /> API Docs
                </a>
              </Button>
            </div>
          </Card>

          <Card className="shadow-card border-none p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Setup Checklist</h3>
            <div className="space-y-3">
              {[
                'Create API credentials',
                'Enter credentials above',
                'Test connection',
                'Enable automatic sync',
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
