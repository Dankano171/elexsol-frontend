import { motion } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockComplianceInvoices } from '@/lib/mock-data';
import { formatNaira, formatDate } from '@/lib/utils/format';
import { AlertTriangle, CheckCircle, Clock, FileText, Download, Filter } from 'lucide-react';

const statusConfig: Record<string, { label: string; className: string; icon: any }> = {
  approved: { label: 'Approved', className: 'bg-success/10 text-success border-success/20', icon: CheckCircle },
  flagged: { label: 'Flagged', className: 'bg-destructive/10 text-destructive border-destructive/20', icon: AlertTriangle },
  submitted: { label: 'Submitted', className: 'bg-info/10 text-info border-info/20', icon: Clock },
  draft: { label: 'Draft', className: 'bg-muted text-muted-foreground border-border', icon: FileText },
  rejected: { label: 'Rejected', className: 'bg-destructive/10 text-destructive border-destructive/20', icon: AlertTriangle },
};

export default function CompliancePage() {
  const flaggedCount = mockComplianceInvoices.filter(i => i.status === 'flagged').length;

  return (
    <DashboardLayout title="Compliance Center" subtitle="FIRS invoice validation & management">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Invoices', value: mockComplianceInvoices.length, color: 'text-foreground' },
          { label: 'Approved', value: mockComplianceInvoices.filter(i => i.status === 'approved').length, color: 'text-success' },
          { label: 'Flagged', value: flaggedCount, color: 'text-destructive' },
          { label: 'Pending', value: mockComplianceInvoices.filter(i => i.status === 'submitted' || i.status === 'draft').length, color: 'text-info' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="p-4 shadow-card border-none text-center">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs"><Filter className="w-3.5 h-3.5 mr-1.5" />Filter</Button>
          <Button variant="outline" size="sm" className="text-xs"><Download className="w-3.5 h-3.5 mr-1.5" />Export</Button>
        </div>
        {flaggedCount > 0 && (
          <Badge className="bg-destructive/10 text-destructive border-destructive/20">
            <AlertTriangle className="w-3 h-3 mr-1" /> {flaggedCount} flagged invoice{flaggedCount > 1 ? 's' : ''} require attention
          </Badge>
        )}
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <Card className="shadow-card border-none overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="text-xs font-semibold">Invoice #</TableHead>
                <TableHead className="text-xs font-semibold">Customer</TableHead>
                <TableHead className="text-xs font-semibold">TIN</TableHead>
                <TableHead className="text-xs font-semibold">Date</TableHead>
                <TableHead className="text-xs font-semibold text-right">Amount</TableHead>
                <TableHead className="text-xs font-semibold text-right">Tax</TableHead>
                <TableHead className="text-xs font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockComplianceInvoices.map((inv) => {
                const status = statusConfig[inv.status];
                const StatusIcon = status.icon;
                const isFlagged = inv.status === 'flagged';
                return (
                  <TableRow
                    key={inv.id}
                    className={`cursor-pointer hover:bg-muted/30 transition-colors ${isFlagged ? 'bg-destructive/3' : ''}`}
                  >
                    <TableCell className="text-sm font-medium">{inv.invoiceNumber}</TableCell>
                    <TableCell className="text-sm">{inv.customerName}</TableCell>
                    <TableCell className="text-sm font-mono text-xs">
                      {inv.customerTin || <span className="text-destructive italic">Missing</span>}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{formatDate(inv.issueDate)}</TableCell>
                    <TableCell className="text-sm text-right font-medium">{formatNaira(inv.totalAmount)}</TableCell>
                    <TableCell className="text-sm text-right text-muted-foreground">{formatNaira(inv.taxAmount)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs ${status.className}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {status.label}
                      </Badge>
                      {isFlagged && inv.validationErrors && (
                        <p className="text-[10px] text-destructive mt-1">
                          {inv.validationErrors.map(e => e.message).join(', ')}
                        </p>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
}
