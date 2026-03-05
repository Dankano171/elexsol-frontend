import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import IntegrationCard from '@/components/integrations/IntegrationCard';
import ApiErrorState from '@/components/shared/ApiErrorState';
import EmptyState from '@/components/shared/EmptyState';
import { useIntegrations } from '@/lib/hooks/useIntegrations';
import { isDemoAccount } from '@/lib/utils/isDemoAccount';
import { Skeleton } from '@/components/ui/skeleton';
import { Link2 } from 'lucide-react';

export default function IntegrationsPage() {
  const navigate = useNavigate();
  const { integrations, isLoading, error, refetch } = useIntegrations();
  const demo = isDemoAccount();

  return (
    <DashboardLayout title="Integrations" subtitle="Connect your data sources">
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-48 rounded-xl" />)}
        </div>
      ) : error ? (
        <ApiErrorState message={(error as Error).message} onRetry={refetch} />
      ) : !demo && integrations.length === 0 ? (
        <EmptyState
          icon={Link2}
          title="Connect Your Financial Data"
          description="Integrate Zoho Books, WhatsApp Business API, or QuickBooks to automatically sync invoices and receipts for FIRS compliance processing."
          ctaLabel="Browse Integrations"
          onAction={() => navigate('/integrations/zoho')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((integration: any, i: number) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              delay={i * 0.1}
              onClick={() => navigate(`/integrations/${integration.provider}`)}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
