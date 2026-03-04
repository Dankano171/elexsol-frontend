import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ApiErrorState from '@/components/shared/ApiErrorState';
import B2CComplianceTracker from '@/components/regulatory/B2CComplianceTracker';
import { useRegulatory } from '@/lib/hooks/useRegulatory';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, AlertTriangle, Copy, Download, Shield, Timer, ExternalLink, FileText, Receipt } from 'lucide-react';
import { formatNaira } from '@/lib/utils/format';

const stages = ['Submitted', 'Validating', 'FIRS Review', 'Cleared'];

function CountdownTimer({ expiresAt, status }: { expiresAt: string; status: string }) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const update = () => {
      const diff = new Date(expiresAt).getTime() - Date.now();
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
  const percentage = Math.min(100, ((72 - hours) / 72) * 100);
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

function B2BInvoicesContent() {
  const { invoices, isLoading, error, refetch, downloadStamped } = useRegulatory();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (isLoading) {
    return (
      <>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}
        </div>
        <div className="space-y-4">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)}</div>
      </>
    );
  }

  if (error) {
    return <ApiErrorState message={(error as Error).message} onRetry={refetch} />;
  }

  const clearances = invoices as any[];
  const summary = {
    pending: clearances.filter((c: any) => c.status === 'pending').length,
    processing: clearances.filter((c: any) => c.status === 'processing').length,
    cleared: clearances.filter((c: any) => c.status === 'cleared').length,
    expired: clearances.filter((c: any) => c.status === 'expired').length,
  };

  return (
    <>
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

      <div className="space-y-4">
        {clearances.map((item: any, i: number) => (
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
                      <Button variant="outline" size="sm" className="text-xs" onClick={() => downloadStamped(item.id)}>
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
    </>
  );
}

export default function RegulatoryPage() {
  return (
    <DashboardLayout title="Regulatory Clearance" subtitle="72-hour CSID clearance tracking">
      <Tabs defaultValue="b2b" className="space-y-6">
        <TabsList>
          <TabsTrigger value="b2b" className="gap-1.5">
            <FileText className="w-4 h-4" /> B2B Invoices
          </TabsTrigger>
          <TabsTrigger value="b2c" className="gap-1.5">
            <Receipt className="w-4 h-4" /> B2C Receipts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="b2b">
          <B2BInvoicesContent />
        </TabsContent>

        <TabsContent value="b2c">
          <B2CComplianceTracker />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
