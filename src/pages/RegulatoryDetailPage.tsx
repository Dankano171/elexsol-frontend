import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Download, RefreshCw, CheckCircle2, Clock, AlertTriangle, Shield } from 'lucide-react';
import { formatNaira, formatDate } from '@/lib/utils/format';
import { toast } from 'sonner';

// reuse mock clearance data
const mockClearances = [
  { id: '1', invoiceNumber: 'INV-2024-0848', customerName: 'MTN Nigeria', amount: 2_800_000, submittedAt: new Date(Date.now() - 3600000 * 12).toISOString(), expiresAt: new Date(Date.now() + 3600000 * 60).toISOString(), status: 'processing', irn: 'IRN-NG-2024-00384721', csid: null, stage: 2 },
  { id: '2', invoiceNumber: 'INV-2024-0851', customerName: 'Flour Mills of Nigeria', amount: 5_600_000, submittedAt: new Date(Date.now() - 3600000 * 48).toISOString(), expiresAt: new Date(Date.now() + 3600000 * 24).toISOString(), status: 'processing', irn: 'IRN-NG-2024-00384698', csid: null, stage: 3 },
  { id: '3', invoiceNumber: 'INV-2024-0845', customerName: 'Access Bank Plc', amount: 1_200_000, submittedAt: new Date(Date.now() - 3600000 * 70).toISOString(), expiresAt: new Date(Date.now() + 3600000 * 2).toISOString(), status: 'pending', irn: 'IRN-NG-2024-00384655', csid: null, stage: 1 },
  { id: '4', invoiceNumber: 'INV-2024-0840', customerName: 'Dangote Industries', amount: 4_500_000, submittedAt: new Date(Date.now() - 3600000 * 80).toISOString(), expiresAt: new Date(Date.now() - 3600000 * 8).toISOString(), status: 'expired', irn: 'IRN-NG-2024-00384601', csid: null, stage: 4 },
  { id: '5', invoiceNumber: 'INV-2024-0838', customerName: 'Nigerian Breweries', amount: 890_000, submittedAt: new Date(Date.now() - 3600000 * 96).toISOString(), expiresAt: new Date(Date.now() - 3600000 * 24).toISOString(), status: 'cleared', irn: 'IRN-NG-2024-00384590', csid: 'CSID-NG-2024-99281734', stage: 4 },
];

const actionLog = [
  { action: 'Invoice submitted to FIRS gateway', timestamp: new Date(Date.now() - 3600000 * 12), actor: 'System' },
  { action: 'IRN generated and assigned', timestamp: new Date(Date.now() - 3600000 * 11), actor: 'FIRS Gateway' },
  { action: 'Validation stage 1 passed', timestamp: new Date(Date.now() - 3600000 * 10), actor: 'FIRS Gateway' },
  { action: 'Awaiting clearance review', timestamp: new Date(Date.now() - 3600000 * 6), actor: 'FIRS Portal' },
];

export default function RegulatoryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = mockClearances.find(c => c.id === id);

  if (!item) {
    return (
      <DashboardLayout title="Not Found" subtitle="">
        <div className="text-center py-20">
          <p className="text-muted-foreground mb-4">Regulatory record not found.</p>
          <Button variant="outline" onClick={() => navigate('/regulatory')}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const statusColor = item.status === 'cleared' ? 'bg-success/10 text-success border-success/20' :
    item.status === 'expired' ? 'bg-destructive/10 text-destructive border-destructive/20' :
    item.status === 'processing' ? 'bg-primary/10 text-primary border-primary/20' :
    'bg-muted text-muted-foreground';

  return (
    <DashboardLayout title="Regulatory Details" subtitle={item.invoiceNumber}>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Button variant="ghost" size="sm" className="mb-4 text-muted-foreground" onClick={() => navigate('/regulatory')}>
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Regulatory
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="shadow-card border-none p-6 lg:col-span-2">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">{item.invoiceNumber}</h2>
                <p className="text-sm text-muted-foreground">{item.customerName}</p>
              </div>
              <Badge variant="outline" className={`text-sm px-3 py-1.5 ${statusColor}`}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Amount</p>
                <p className="text-sm font-medium text-foreground">{formatNaira(item.amount)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Submitted</p>
                <p className="text-sm font-medium text-foreground">{formatDate(item.submittedAt)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">IRN</p>
                <div className="flex items-center gap-2">
                  <code className="text-xs font-mono bg-muted px-2 py-0.5 rounded">{item.irn}</code>
                  <button onClick={() => { navigator.clipboard.writeText(item.irn); toast.success('Copied'); }} className="text-muted-foreground hover:text-foreground">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              {item.csid && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">CSID</p>
                  <code className="text-xs font-mono bg-muted px-2 py-0.5 rounded">{item.csid}</code>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              {item.status === 'expired' && (
                <Button size="sm" onClick={() => toast.success('Retry submitted')}>
                  <RefreshCw className="w-4 h-4 mr-1.5" /> Retry Submission
                </Button>
              )}
              {item.status === 'cleared' && (
                <Button size="sm" variant="outline" onClick={() => toast.success('Downloading stamped invoice...')}>
                  <Download className="w-4 h-4 mr-1.5" /> Download Stamp
                </Button>
              )}
            </div>
          </Card>

          <Card className="shadow-card border-none p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Action Log</h3>
            <div className="space-y-4">
              {actionLog.map((log, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                    {i < actionLog.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm text-foreground">{log.action}</p>
                    <p className="text-xs text-muted-foreground">{log.actor} • {formatDate(log.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
