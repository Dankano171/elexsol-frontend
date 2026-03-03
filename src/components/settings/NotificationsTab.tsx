import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

const NOTIFICATIONS = [
  { label: 'Compliance Alerts', desc: 'Get notified when invoices are flagged or require attention', defaultOn: true },
  { label: 'CSID Expiry Warnings', desc: 'Alert when clearance timer is below 12 hours', defaultOn: true },
  { label: 'Payment Received', desc: 'Notification for incoming payments', defaultOn: true },
  { label: 'Sync Failures', desc: 'Alert when integration sync encounters errors', defaultOn: true },
  { label: 'Weekly Digest', desc: 'Summary of key metrics every Monday', defaultOn: false },
  { label: 'Marketing Updates', desc: 'Product updates and new feature announcements', defaultOn: false },
];

export default function NotificationsTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="p-6 shadow-card border-none space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-1">Notification Preferences</h3>
          <p className="text-xs text-muted-foreground">Choose how you want to be notified</p>
        </div>
        <Separator />
        <div className="space-y-4">
          {NOTIFICATIONS.map(item => (
            <div key={item.label} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch defaultChecked={item.defaultOn} />
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
