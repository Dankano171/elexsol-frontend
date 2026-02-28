import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockActivities } from '@/lib/mock-data';
import { timeAgo } from '@/lib/utils/format';
import { FileText, CreditCard, ShieldCheck, Link2, AlertTriangle } from 'lucide-react';

const typeIcons = {
  invoice: FileText,
  payment: CreditCard,
  compliance: ShieldCheck,
  integration: Link2,
  alert: AlertTriangle,
};

const statusVariants: Record<string, string> = {
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning-foreground border-warning/20',
  error: 'bg-destructive/10 text-destructive border-destructive/20',
  info: 'bg-info/10 text-info border-info/20',
};

export default function ActivityFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <Card className="p-5 shadow-card border-none h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
          <span className="text-xs text-primary font-medium cursor-pointer hover:underline">View all</span>
        </div>
        <div className="space-y-3">
          {mockActivities.map((item, i) => {
            const Icon = typeIcons[item.type];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="flex items-start gap-3 py-2"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  item.status ? statusVariants[item.status] : 'bg-muted'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{timeAgo(item.timestamp)}</span>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
