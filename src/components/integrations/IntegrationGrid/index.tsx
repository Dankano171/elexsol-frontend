'use client';

import { useIntegrations } from '@/lib/hooks/useIntegrations';
import { useIntegrationStore } from '@/lib/store/integrationStore';
import { IntegrationCard } from './IntegrationCard';
import { IntegrationFilters } from './IntegrationFilters';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export function IntegrationGrid() {
  const { integrations, isLoading, refresh } = useIntegrations();
  const { filterProvider, sortBy, sortOrder } = useIntegrationStore();

  const filteredAndSorted = integrations
    ?.filter((integration) => {
      if (filterProvider === 'all') return true;
      return integration.provider === filterProvider;
    })
    ?.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.provider.localeCompare(b.provider);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'lastSync':
          comparison = (a.lastSyncAt?.getTime() || 0) - (b.lastSyncAt?.getTime() || 0);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-48 bg-gray-100 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <IntegrationFilters />
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => refresh()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button asChild size="sm">
            <Link href="/integrations/connect">
              <Plus className="mr-2 h-4 w-4" />
              Add Integration
            </Link>
          </Button>
        </div>
      </div>

      {!filteredAndSorted || filteredAndSorted.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No integrations found</p>
          <Button asChild variant="link" className="mt-2">
            <Link href="/integrations/connect">Connect your first integration</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAndSorted.map((integration) => (
            <IntegrationCard key={integration.id} integration={integration} />
          ))}
        </div>
      )}
    </div>
  );
}
