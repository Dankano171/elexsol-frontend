import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, Filter, FileSpreadsheet, FilePieChart, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

interface Report {
  id: string;
  name: string;
  description: string;
  type: 'compliance' | 'financial' | 'tax' | 'audit';
  format: 'PDF' | 'Excel' | 'CSV';
  generatedAt: Date;
  size: string;
  status: 'ready' | 'generating' | 'scheduled';
}

const reportTemplates = [
  { id: 't1', name: 'FIRS Compliance Summary', description: 'Monthly compliance status for all submitted invoices', icon: ShieldCheck, type: 'compliance' as const },
  { id: 't2', name: 'Revenue & Profit Report', description: 'Detailed revenue breakdown by source and client', icon: FilePieChart, type: 'financial' as const },
  { id: 't3', name: 'Tax Remittance Report', description: 'VAT and withholding tax summary for FIRS filing', icon: FileSpreadsheet, type: 'tax' as const },
  { id: 't4', name: 'Audit Trail Report', description: 'Complete activity log for compliance auditing', icon: FileText, type: 'audit' as const },
];

const recentReports: Report[] = [
  { id: '1', name: 'FIRS Compliance Summary - Dec 2024', type: 'compliance', format: 'PDF', generatedAt: new Date(Date.now() - 86400000), size: '2.4 MB', status: 'ready', description: '' },
  { id: '2', name: 'Revenue Report Q4 2024', type: 'financial', format: 'Excel', generatedAt: new Date(Date.now() - 86400000 * 3), size: '5.1 MB', status: 'ready', description: '' },
  { id: '3', name: 'Tax Remittance - Dec 2024', type: 'tax', format: 'PDF', generatedAt: new Date(Date.now() - 86400000 * 5), size: '1.8 MB', status: 'ready', description: '' },
  { id: '4', name: 'Monthly Audit Trail - Dec 2024', type: 'audit', format: 'CSV', generatedAt: new Date(Date.now() - 86400000 * 7), size: '3.2 MB', status: 'ready', description: '' },
  { id: '5', name: 'FIRS Compliance Summary - Jan 2025', type: 'compliance', format: 'PDF', generatedAt: new Date(), size: '—', status: 'generating', description: '' },
];

const typeColors: Record<string, string> = {
  compliance: 'bg-primary/10 text-primary border-primary/20',
  financial: 'bg-success/10 text-success border-success/20',
  tax: 'bg-warning/10 text-warning-foreground border-warning/20',
  audit: 'bg-info/10 text-info border-info/20',
};

export default function ReportsPage() {
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const filtered = typeFilter === 'all' ? recentReports : recentReports.filter(r => r.type === typeFilter);

  return (
    <DashboardLayout title="Reports" subtitle="Generate compliance & financial reports">
      {/* Report Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {reportTemplates.map((template, i) => (
          <motion.div key={template.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="p-5 shadow-card border-none hover:shadow-elevated transition-shadow cursor-pointer group">
              <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <template.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">{template.name}</h3>
              <p className="text-xs text-muted-foreground mb-3">{template.description}</p>
              <Button size="sm" className="w-full text-xs">Generate Report</Button>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Reports */}
      <Card className="p-5 shadow-card border-none">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h3 className="text-sm font-semibold text-foreground">Recent Reports</h3>
          <div className="flex items-center gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40 h-8 text-xs">
                <Filter className="w-3.5 h-3.5 mr-1.5" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="tax">Tax</SelectItem>
                <SelectItem value="audit">Audit</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          {filtered.map((report, i) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{report.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{report.format}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{report.size}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      {report.generatedAt.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={`text-xs ${typeColors[report.type]}`}>
                  {report.type}
                </Badge>
                {report.status === 'ready' ? (
                  <Button variant="outline" size="sm" className="text-xs">
                    <Download className="w-3.5 h-3.5 mr-1" /> Download
                  </Button>
                ) : report.status === 'generating' ? (
                  <Badge variant="outline" className="text-xs bg-muted animate-pulse">
                    <Clock className="w-3 h-3 mr-1" /> Generating...
                  </Badge>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}
