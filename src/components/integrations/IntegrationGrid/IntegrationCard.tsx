'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Integration } from '@/types/integrations';
import { useIntegrationStore } from '@/lib/store/integrationStore';
import { useIntegrations } from '@/lib/hooks/useIntegrations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { HealthStatus } from '../HealthStatus';
import { SyncProgress } from '../SyncProgress';
import {
  MoreVertical,
  RefreshCw,
  Settings,
  Trash2,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';

const providerIcons = {
  zoho: 'Z',
  whatsapp: 'W',
  quickbooks: 'Q',
};

const providerColors = {
  zoho: 'bg-blue-100 text-blue-600',
  whatsapp: 'bg-green-100 text-green-600',
  quickbooks: 'bg-red-100 text-red-600',
};

const statusConfig = {
  active: { icon: CheckCircle, color: 'text-success', label: 'Active' },
  expired: { icon: XCircle, color: 'text-error', label: 'Expired' },
  revoked: { icon: XCircle, color: 'text-error', label: 'Revoked' },
  pending: { icon: Clock, color: 'text-warning', label: 'Pending' },
};

interface IntegrationCardProps {
  integration: Integration;
}

export function IntegrationCard({ integration }: IntegrationCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const { sync, isSyncing } = useIntegrations();
  const { toggleExpanded, expandedCards } = useIntegrationStore();
  const isExpanded = expandedCards.includes(integration.id);

  const Icon = providerIcons[integration.provider];
  const colorClass = providerColors[integration.provider];
  const StatusIcon = statusConfig[integration.status].icon;
  const statusColor = statusConfig[integration.status].color;

  const handleSync = () => {
    sync(integration.id);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', colorClass)}>
              <span className="font-bold">{Icon}</span>
            </div>
            <div>
              <CardTitle className="capitalize">{integration.provider}</CardTitle>
              <CardDescription className="text-xs">
                {integration.accountEmail}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className={cn('border-0', statusColor)}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {statusConfig[integration.status].label}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={handleSync} disabled={isSyncing}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Sync Now
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowDetails(true)}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-error">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {/* Health Status */}
          <HealthStatus integrationId={integration.id} />

          {/* Sync Info */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Last sync</span>
            <span className="font-medium">
              {integration.lastSyncAt
                ? formatDistanceToNow(integration.lastSyncAt, { addSuffix: true })
                : 'Never'}
            </span>
          </div>

          {/* Sync Progress (shown when syncing) */}
          {isSyncing && <SyncProgress integrationId={integration.id} />}

          {/* Token Expiry Warning */}
          {integration.tokenExpiresAt && (
            <div className="text-xs text-warning bg-warning/10 p-2 rounded">
              Token expires{' '}
              {formatDistanceToNow(integration.tokenExpiresAt, { addSuffix: true })}
            </div>
          )}

          {/* Expand/Collapse Button */}
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-2"
            onClick={() => toggleExpanded(integration.id)}
          >
            {isExpanded ? 'Show less' : 'Show details'}
          </Button>

          {/* Expanded Details */}
          {isExpanded && (
            <div className="mt-4 space-y-2 text-sm border-t pt-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Account ID</span>
                <span className="font-mono">{integration.accountId || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Scopes</span>
                <span>{integration.scopes.length} permissions</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Auto-sync</span>
                <span>{integration.settings.autoSync ? 'Enabled' : 'Disabled'}</span>
              </div>
              {integration.settings.syncInterval && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Sync interval</span>
                  <span>{integration.settings.syncInterval} minutes</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Connected</span>
                <span>{formatDistanceToNow(integration.createdAt, { addSuffix: true })}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
