import DashboardLayout from '@/components/layout/DashboardLayout';
import IntegrationCard from '@/components/integrations/IntegrationCard';
import { useIntegrations } from '@/lib/hooks/useIntegrations';
import { Skeleton } from '@/components/ui/skeleton';

export default function IntegrationsPage() {
  const { integrations, isLoading } = useIntegrations();

  return (
    <DashboardLayout title="Integrations" subtitle="Connect your data sources">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-48 rounded-xl" />)
          : integrations.map((integration: any, i: number) => (
              <IntegrationCard key={integration.id} integration={integration} delay={i * 0.1} />
            ))
        }
      </div>
    </DashboardLayout>
  );
}
