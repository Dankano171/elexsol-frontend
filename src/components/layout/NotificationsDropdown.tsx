import { useState, useRef, useEffect } from 'react';
import { Bell, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { timeAgo } from '@/lib/utils/format';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: '1', type: 'success', title: 'Zoho sync completed', description: '142 invoices synchronized successfully', timestamp: new Date(Date.now() - 1200000), read: false },
  { id: '2', type: 'warning', title: 'CSID expiring soon', description: 'INV-2024-0845 clearance expires in 2 hours', timestamp: new Date(Date.now() - 3600000), read: false },
  { id: '3', type: 'error', title: 'Invoice flagged', description: 'INV-2024-0847 has a missing TIN field', timestamp: new Date(Date.now() - 7200000), read: false },
  { id: '4', type: 'info', title: 'New report available', description: 'FIRS Compliance Summary for Dec 2024 is ready', timestamp: new Date(Date.now() - 14400000), read: true },
  { id: '5', type: 'success', title: 'Payment received', description: '₦2,450,000 from Dangote Group', timestamp: new Date(Date.now() - 28800000), read: true },
];

const typeConfig = {
  success: { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10' },
  warning: { icon: AlertTriangle, color: 'text-warning-foreground', bg: 'bg-warning/10' },
  error: { icon: AlertTriangle, color: 'text-destructive', bg: 'bg-destructive/10' },
  info: { icon: Info, color: 'text-info', bg: 'bg-info/10' },
};

export default function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const dismiss = (id: string) => setNotifications(prev => prev.filter(n => n.id !== id));

  return (
    <div className="relative" ref={ref}>
      <Button variant="ghost" size="icon" className="relative" onClick={() => setOpen(!open)}>
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        )}
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-80 md:w-96 bg-card border border-border rounded-xl shadow-modal z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-xs text-primary font-medium hover:underline">
                  Mark all read
                </button>
              )}
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-sm text-muted-foreground">No notifications</div>
              ) : (
                notifications.map(n => {
                  const cfg = typeConfig[n.type];
                  const Icon = cfg.icon;
                  return (
                    <div key={n.id} className={`flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors ${!n.read ? 'bg-primary/3' : ''}`}>
                      <div className={`w-8 h-8 rounded-lg ${cfg.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Icon className={`w-4 h-4 ${cfg.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{n.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{n.description}</p>
                        <span className="text-[10px] text-muted-foreground">{timeAgo(n.timestamp)}</span>
                      </div>
                      <button onClick={() => dismiss(n.id)} className="text-muted-foreground hover:text-foreground mt-0.5">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
