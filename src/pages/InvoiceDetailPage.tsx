import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, RefreshCw, AlertTriangle, CheckCircle2, Clock, FileText, Edit } from 'lucide-react';
import { mockComplianceInvoices } from '@/lib/mock-data';
import { formatNaira, formatDate } from '@/lib/utils/format';
import { toast } from 'sonner';
import jsPDF from 'jspdf';

const statusConfig: Record<string, { label: string; className: string; icon: any }> = {
  approved: { label: 'Approved', className: 'bg-success/10 text-success border-success/20', icon: CheckCircle2 },
  flagged: { label: 'Flagged', className: 'bg-destructive/10 text-destructive border-destructive/20', icon: AlertTriangle },
  submitted: { label: 'Submitted', className: 'bg-info/10 text-info border-info/20', icon: Clock },
  draft: { label: 'Draft', className: 'bg-muted text-muted-foreground border-border', icon: FileText },
  rejected: { label: 'Rejected', className: 'bg-destructive/10 text-destructive border-destructive/20', icon: AlertTriangle },
};

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const invoice = mockComplianceInvoices.find(i => i.id === id);

  if (!invoice) {
    return (
      <DashboardLayout title="Invoice Not Found" subtitle="">
        <div className="text-center py-20">
          <p className="text-muted-foreground mb-4">This invoice could not be found.</p>
          <Button variant="outline" onClick={() => navigate('/compliance')}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Compliance
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const status = statusConfig[invoice.status] || statusConfig.draft;
  const StatusIcon = status.icon;

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Elexsol E-Invoice', 20, 30);
    doc.setFontSize(12);
    doc.text(`Invoice: ${invoice.invoiceNumber}`, 20, 50);
    doc.text(`Customer: ${invoice.customerName}`, 20, 60);
    doc.text(`TIN: ${invoice.customerTin || 'N/A'}`, 20, 70);
    doc.text(`Issue Date: ${formatDate(invoice.issueDate)}`, 20, 80);
    doc.text(`Due Date: ${formatDate(invoice.dueDate)}`, 20, 90);
    doc.text(`Total: ${formatNaira(invoice.totalAmount)}`, 20, 100);
    doc.text(`Tax: ${formatNaira(invoice.taxAmount)}`, 20, 110);
    doc.text(`Status: ${status.label}`, 20, 120);
    doc.text(`Source: ${invoice.source}`, 20, 130);
    doc.setFontSize(9);
    doc.text('This is a system-generated e-invoice from Elexsol Compliance Gateway.', 20, 150);
    doc.save(`${invoice.invoiceNumber}.pdf`);
    toast.success('E-Invoice PDF downloaded');
  };

  const handleRetryValidation = () => {
    toast.success('Re-validation submitted for ' + invoice.invoiceNumber);
  };

  const handleCheckStatus = () => {
    toast.info('Checking FIRS status for ' + invoice.invoiceNumber + '...');
  };

  return (
    <DashboardLayout title="Invoice Details" subtitle={invoice.invoiceNumber}>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Button variant="ghost" size="sm" className="mb-4 text-muted-foreground" onClick={() => navigate('/compliance')}>
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Compliance
        </Button>

        <Card className="shadow-card border-none p-6 mb-4">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">{invoice.invoiceNumber}</h2>
              <p className="text-sm text-muted-foreground mt-1">{invoice.customerName}</p>
            </div>
            <Badge variant="outline" className={`text-sm px-3 py-1.5 ${status.className}`}>
              <StatusIcon className="w-4 h-4 mr-1.5" />{status.label}
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            {[
              { label: 'Total Amount', value: formatNaira(invoice.totalAmount) },
              { label: 'Tax Amount', value: formatNaira(invoice.taxAmount) },
              { label: 'Issue Date', value: formatDate(invoice.issueDate) },
              { label: 'Due Date', value: formatDate(invoice.dueDate) },
              { label: 'Customer TIN', value: invoice.customerTin || 'Missing' },
              { label: 'Data Source', value: invoice.source.charAt(0).toUpperCase() + invoice.source.slice(1) },
            ].map(f => (
              <div key={f.label}>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{f.label}</p>
                <p className={`text-sm font-medium ${f.value === 'Missing' ? 'text-destructive' : 'text-foreground'}`}>{f.value}</p>
              </div>
            ))}
          </div>

          {invoice.validationErrors && invoice.validationErrors.length > 0 && (
            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-semibold text-destructive mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Validation Errors
              </h4>
              <ul className="space-y-1">
                {invoice.validationErrors.map((err, i) => (
                  <li key={i} className="text-xs text-destructive/80">
                    <span className="font-medium">{err.field}:</span> {err.message}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-3 flex-wrap pt-4 border-t border-border">
            {(invoice.status === 'flagged' || invoice.status === 'draft') && (
              <>
                <Button variant="outline" size="sm" onClick={() => toast.info('Opening field editor...')}>
                  <Edit className="w-4 h-4 mr-1.5" /> Add Missing Fields
                </Button>
                <Button size="sm" onClick={handleRetryValidation}>
                  <RefreshCw className="w-4 h-4 mr-1.5" /> Retry Validation
                </Button>
              </>
            )}
            {invoice.status === 'submitted' && (
              <Button size="sm" onClick={handleCheckStatus}>
                <Clock className="w-4 h-4 mr-1.5" /> Check FIRS Status
              </Button>
            )}
            {invoice.status === 'approved' && (
              <Button size="sm" onClick={handleDownloadPDF}>
                <Download className="w-4 h-4 mr-1.5" /> Download E-Invoice (PDF)
              </Button>
            )}
          </div>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
}
