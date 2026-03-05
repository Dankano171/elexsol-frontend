import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Integration } from '@/types/integrations';
import { BookOpen, MessageCircle, Calculator, RefreshCw, ExternalLink } from 'lucide-react';
import { timeAgo } from '@/lib/utils/format';

const providerIcons: Record<string, any> = {
  zoho: BookOpen,
  whatsapp: MessageCircle,
  quickbooks: Calculator,
};

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: 'Connected', className: 'bg-success/10 text-success border-success/20' },
  expired: { label: 'Expired', className: 'bg-warning/10 text-warning-foreground border-warning/20' },
  disconnected: { label: 'Not Connected', className: 'bg-muted text-muted-foreground border-border' },
  pending: { label: 'Pending', className: 'bg-info/10 text-info border-info/20' },
  revoked: { label: 'Revoked', className: 'bg-destructive/10 text-destructive border-destructive/20' },
};

interface IntegrationCardProps {
  integration: Integration;
  delay?: number;
  onClick?: () => void;
}

export default function IntegrationCard({ integration, delay = 0, onClick }: IntegrationCardProps) {
  const Icon = providerIcons[integration.provider] || BookOpen;
  const status = statusConfig[integration.status] || statusConfig.disconnected;
  const isConnected = integration.status === 'active';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="p-5 shadow-card border-none hover:shadow-elevated transition-shadow cursor-pointer" onClick={onClick}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">{integration.name}</h3>
              <p className="text-xs text-muted-foreground">{integration.description}</p>
            </div>
          </div>
          <Badge variant="outline" className={status.className}>
            {isConnected && <span className="w-1.5 h-1.5 rounded-full bg-success mr-1.5 animate-pulse" />}
            {status.label}
          </Badge>
        </div>

        {isConnected && (
          <div className="grid grid-cols-2 gap-3 mb-4 bg-muted/50 rounded-lg p-3">
            <div>
              <p className="text-xs text-muted-foreground">Invoices synced</p>
              <p className="text-sm font-semibold text-foreground">{integration.invoiceCount?.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Last sync</p>
              <p className="text-sm font-semibold text-foreground">{integration.lastSyncAt ? timeAgo(integration.lastSyncAt) : '—'}</p>
            </div>
          </div>
        )}

        <div className="flex gap-2" onClick={e => e.stopPropagation()}>
          {isConnected ? (
            <>
              <Button variant="outline" size="sm" className="flex-1 text-xs">
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Sync Now
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </>
          ) : (
            <Button size="sm" className="flex-1 text-xs">
              Connect {integration.name}
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
