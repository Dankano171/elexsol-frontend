import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle2, AlertTriangle, Download, Package } from 'lucide-react';
import { formatNaira } from '@/lib/utils/format';

interface B2CReceipt {
  id: string;
  date: string;
  amount: number;
  status: 'receipted' | 'batched' | 'anomaly';
  customerRef: string;
  timeRemaining?: number;
}

const MOCK_RECEIPTS: B2CReceipt[] = [
  { id: 'RCP-001', date: '2026-03-04', amount: 4500, status: 'batched', customerRef: 'Walk-in #1204', timeRemaining: 0 },
  { id: 'RCP-002', date: '2026-03-04', amount: 12800, status: 'batched', customerRef: 'POS Terminal A3', timeRemaining: 0 },
  { id: 'RCP-003', date: '2026-03-04', amount: 2300, status: 'receipted', customerRef: 'Walk-in #1198' },
  { id: 'RCP-004', date: '2026-03-04', amount: 67500, status: 'receipted', customerRef: 'Counter B #0042' },
  { id: 'RCP-005', date: '2026-03-04', amount: 8900, status: 'anomaly', customerRef: 'POS Terminal A1' },
  { id: 'RCP-006', date: '2026-03-03', amount: 3400, status: 'receipted', customerRef: 'Walk-in #1190' },
  { id: 'RCP-007', date: '2026-03-03', amount: 15600, status: 'batched', customerRef: 'POS Terminal B2', timeRemaining: 0 },
  { id: 'RCP-008', date: '2026-03-04', amount: 1250, status: 'anomaly', customerRef: 'Walk-in #1207' },
];

function MidnightCountdown() {
  const [remaining, setRemaining] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setRemaining(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="font-mono font-bold text-primary">{remaining}</span>;
}

const statusConfig = {
  batched: { label: 'Batched', color: 'bg-primary/10 text-primary border-primary/20', icon: Clock },
  receipted: { label: 'Receipted', color: 'bg-success/10 text-success border-success/20', icon: CheckCircle2 },
  anomaly: { label: 'Anomaly', color: 'bg-destructive/10 text-destructive border-destructive/20', icon: AlertTriangle },
};

export default function B2CComplianceTracker() {
  const todayReceipts = MOCK_RECEIPTS.filter((r) => r.date === '2026-03-04');
  const batchedToday = todayReceipts.filter((r) => r.status === 'batched').length;
  const receiptedToday = todayReceipts.filter((r) => r.status === 'receipted').length;
  const anomaliesToday = todayReceipts.filter((r) => r.status === 'anomaly').length;
  const totalToday = todayReceipts.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-4">
      {/* Header Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Batched Today', value: batchedToday, icon: Package, color: 'text-primary' },
          { label: 'Receipted', value: receiptedToday, icon: CheckCircle2, color: 'text-success' },
          { label: 'Anomalies', value: anomaliesToday, icon: AlertTriangle, color: 'text-destructive' },
          { label: 'Total Volume', value: formatNaira(totalToday), icon: Clock, color: 'text-muted-foreground' },
        ].map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="p-4 shadow-card border-none">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{item.value}</p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Batch countdown */}
      <Card className="p-4 shadow-card border-none flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Package className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-foreground">Next FIRS batch submission at midnight</span>
        </div>
        <MidnightCountdown />
      </Card>

      {/* Receipt list */}
      <div className="space-y-3">
        {MOCK_RECEIPTS.map((receipt, i) => {
          const cfg = statusConfig[receipt.status];
          return (
            <motion.div
              key={receipt.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
            >
              <Card className="p-4 shadow-card border-none">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <cfg.icon className={`w-4 h-4 ${
                        receipt.status === 'batched' ? 'text-primary' :
                        receipt.status === 'receipted' ? 'text-success' : 'text-destructive'
                      }`} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-foreground">{receipt.id}</span>
                        <Badge variant="outline" className={`text-xs ${cfg.color}`}>{cfg.label}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{receipt.customerRef} • {receipt.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-foreground">{formatNaira(receipt.amount)}</span>
                    {receipt.status === 'batched' && (
                      <span className="text-xs text-primary font-medium"><MidnightCountdown /></span>
                    )}
                    {receipt.status === 'receipted' && (
                      <Button variant="outline" size="sm" className="text-xs h-8">
                        <Download className="w-3.5 h-3.5 mr-1" /> QR Stamp
                      </Button>
                    )}
                    {receipt.status === 'anomaly' && (
                      <Button variant="ghost" size="sm" className="text-xs text-destructive h-8">
                        Review Error
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
