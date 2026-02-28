import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, AlertTriangle, Copy, Download, FileCheck, Shield, Timer, ExternalLink } from 'lucide-react';
import { formatNaira } from '@/lib/utils/format';

interface ClearanceItem {
  id: string;
  invoiceNumber: string;
  customerName: string;
  amount: number;
  submittedAt: Date;
  expiresAt: Date;
  status: 'pending' | 'processing' | 'cleared' | 'expired';
  irn?: string;
  csid?: string;
  stage: number;
}

const mockClearances: ClearanceItem[] = [
  { id: '1', invoiceNumber: 'INV-2024-0848', customerName: 'MTN Nigeria', amount: 2_800_000, submittedAt: new Date(Date.now() - 3600000 * 12), expiresAt: new Date(Date.now() + 3600000 * 60), status: 'processing', irn: 'IRN-NG-2024-00384721', stage: 2 },
  { id: '2', invoiceNumber: 'INV-2024-0851', customerName: 'Flour Mills of Nigeria', amount: 5_600_000, submittedAt: new Date(Date.now() - 3600000 * 48), expiresAt: new Date(Date.now() + 3600000 * 24), status: 'processing', irn: 'IRN-NG-2024-00384698', stage: 3 },
  { id: '3', invoiceNumber: 'INV-2024-0845', customerName: 'Access Bank Plc', amount: 1_200_000, submittedAt: new Date(Date.now() - 3600000 * 70), expiresAt: new Date(Date.now() + 3600000 * 2), status: 'pending', irn: 'IRN-NG-2024-00384655', stage: 1 },
  { id: '4', invoiceNumber: 'INV-2024-0840', customerName: 'Dangote Industries', amount: 4_500_000, submittedAt: new Date(Date.now() - 3600000 * 80), expiresAt: new Date(Date.now() - 3600000 * 8), status: 'expired', irn: 'IRN-NG-2024-00384601', stage: 4 },
  { id: '5', invoiceNumber: 'INV-2024-0838', customerName: 'Nigerian Breweries', amount: 890_000, submittedAt: new Date(Date.now() - 3600000 * 96), expiresAt: new Date(Date.now() - 3600000 * 24), status: 'cleared', irn: 'IRN-NG-2024-00384590', csid: 'CSID-NG-2024-99281734', stage: 4 },
];

const stages = ['Submitted', 'Validating', 'FIRS Review', 'Cleared'];

function CountdownTimer({ expiresAt, status }: { expiresAt: Date; status: string }) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const update = () => {
      const diff = expiresAt.getTime() - Date.now();
      setRemaining(Math.max(0, diff));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  if (status === 'cleared') return <span className="text-sm font-semibold text-success">✓ Cleared</span>;
  if (status === 'expired' || remaining <= 0) return <span className="text-sm font-semibold text-destructive">Expired</span>;

  const hours = Math.floor(remaining / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  const totalHours = 72;
  const elapsedHours = totalHours - hours;
  const percentage = Math.min(100, (elapsedHours / totalHours) * 100);

  const warningLevel = hours < 6 ? 'text-destructive' : hours < 24 ? 'text-warning-foreground' : 'text-success';

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <Timer className={`w-4 h-4 ${warningLevel}`} />
        <span className={`text-sm font-mono font-bold ${warningLevel}`}>
          {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      </div>
      <Progress value={percentage} className="h-1.5" />
    </div>
  );
}

function TimelineStages({ currentStage, status }: { currentStage: number; status: string }) {
  return (
    <div className="flex items-center gap-1">
      {stages.map((stage, i) => {
        const stageNum = i + 1;
        const isComplete = status === 'cleared' || stageNum < currentStage;
        const isCurrent = stageNum === currentStage && status !== 'cleared' && status !== 'expired';
        const isExpired = status === 'expired';

        return (
          <div key={stage} className="flex items-center gap-1">
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${
              isComplete ? 'bg-success/10 text-success' :
              isCurrent ? 'bg-primary/10 text-primary' :
              isExpired ? 'bg-destructive/10 text-destructive' :
              'bg-muted text-muted-foreground'
            }`}>
              {isComplete ? <CheckCircle2 className="w-3 h-3" /> : isCurrent ? <Clock className="w-3 h-3 animate-pulse" /> : null}
              {stage}
            </div>
            {i < stages.length - 1 && <div className={`w-4 h-px ${isComplete ? 'bg-success' : 'bg-border'}`} />}
          </div>
        );
      })}
    </div>
  );
}

export default function RegulatoryPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const summary = {
    pending: mockClearances.filter(c => c.status === 'pending').length,
    processing: mockClearances.filter(c => c.status === 'processing').length,
    cleared: mockClearances.filter(c => c.status === 'cleared').length,
    expired: mockClearances.filter(c => c.status === 'expired').length,
  };

  return (
    <DashboardLayout title="Regulatory Clearance" subtitle="72-hour CSID clearance tracking">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Pending', value: summary.pending, icon: Clock, color: 'text-muted-foreground' },
          { label: 'Processing', value: summary.processing, icon: Shield, color: 'text-primary' },
          { label: 'Cleared', value: summary.cleared, icon: CheckCircle2, color: 'text-success' },
          { label: 'Expired', value: summary.expired, icon: AlertTriangle, color: 'text-destructive' },
        ].map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="p-4 shadow-card border-none">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{item.value}</p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Clearance Items */}
      <div className="space-y-4">
        {mockClearances.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }}>
            <Card className={`p-5 shadow-card border-none ${item.status === 'expired' ? 'opacity-70' : ''}`}>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-sm font-semibold text-foreground">{item.invoiceNumber}</h3>
                    <Badge variant="outline" className={
                      item.status === 'cleared' ? 'bg-success/10 text-success border-success/20' :
                      item.status === 'expired' ? 'bg-destructive/10 text-destructive border-destructive/20' :
                      item.status === 'processing' ? 'bg-primary/10 text-primary border-primary/20' :
                      'bg-muted text-muted-foreground'
                    }>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{item.customerName}</span>
                    <span className="text-sm font-medium text-foreground">{formatNaira(item.amount)}</span>
                  </div>

                  <TimelineStages currentStage={item.stage} status={item.status} />

                  {item.irn && (
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">IRN:</span>
                        <code className="text-xs font-mono bg-muted px-2 py-0.5 rounded">{item.irn}</code>
                        <button onClick={() => copyToClipboard(item.irn!, item.id + '-irn')} className="text-muted-foreground hover:text-foreground">
                          {copiedId === item.id + '-irn' ? <CheckCircle2 className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      {item.csid && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">CSID:</span>
                          <code className="text-xs font-mono bg-muted px-2 py-0.5 rounded">{item.csid}</code>
                          <button onClick={() => copyToClipboard(item.csid!, item.id + '-csid')} className="text-muted-foreground hover:text-foreground">
                            {copiedId === item.id + '-csid' ? <CheckCircle2 className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 lg:flex-col lg:items-end">
                  <CountdownTimer expiresAt={item.expiresAt} status={item.status} />
                  <div className="flex gap-2">
                    {item.status === 'cleared' && (
                      <Button variant="outline" size="sm" className="text-xs">
                        <Download className="w-3.5 h-3.5 mr-1" /> Stamp
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="text-xs">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
}
