import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, CreditCard, ShieldCheck, Link2, AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { timeAgo, formatNaira } from '@/lib/utils/format';

const typeIcons: Record<string, any> = {
  invoice: FileText,
  payment: CreditCard,
  compliance: ShieldCheck,
  integration: Link2,
  alert: AlertTriangle,
};

const typeActions: Record<string, { label: string; route: string }> = {
  invoice: { label: 'View Invoice', route: '/compliance' },
  payment: { label: 'View Payments', route: '/analytics' },
  compliance: { label: 'Fix Issue', route: '/compliance' },
  integration: { label: 'View Integrations', route: '/integrations' },
  alert: { label: 'View Regulatory', route: '/regulatory' },
};

const statusColors: Record<string, string> = {
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning-foreground border-warning/20',
  error: 'bg-destructive/10 text-destructive border-destructive/20',
  info: 'bg-info/10 text-info border-info/20',
};

interface Props {
  activity: any | null;
  onClose: () => void;
}

export default function ActivityDetailModal({ activity, onClose }: Props) {
  const navigate = useNavigate();
  if (!activity) return null;

  const Icon = typeIcons[activity.type] || FileText;
  const action = typeActions[activity.type] || typeActions.invoice;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          className="bg-card rounded-xl shadow-modal border border-border w-full max-w-md p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${statusColors[activity.status] || 'bg-muted'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">{activity.title}</h3>
                <span className="text-xs text-muted-foreground">{timeAgo(activity.timestamp)}</span>
              </div>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-foreground leading-relaxed">{activity.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Status:</span>
              <Badge variant="outline" className={`text-xs ${statusColors[activity.status] || ''}`}>
                {activity.status}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Type:</span>
              <Badge variant="outline" className="text-xs">{activity.type}</Badge>
            </div>

            <div className="pt-2 border-t border-border flex gap-2">
              <Button className="flex-1 text-sm" onClick={() => { onClose(); navigate(action.route); }}>
                {action.label} <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <Button variant="outline" className="text-sm" onClick={onClose}>Dismiss</Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
