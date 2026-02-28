import DashboardLayout from '@/components/layout/DashboardLayout';
import IntegrationCard from '@/components/integrations/IntegrationCard';
import { mockIntegrations } from '@/lib/mock-data';

export default function IntegrationsPage() {
  return (
    <DashboardLayout title="Integrations" subtitle="Connect your data sources">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockIntegrations.map((integration, i) => (
          <IntegrationCard key={integration.id} integration={integration} delay={i * 0.1} />
        ))}
      </div>
    </DashboardLayout>
  );
}
