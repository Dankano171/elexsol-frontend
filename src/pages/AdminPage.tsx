import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAdmin } from '@/lib/hooks/useAdmin';
import { motion } from 'framer-motion';
import { Activity, Users, Shield, Download, Server, BarChart3 } from 'lucide-react';

export default function AdminPage() {
  const { metrics, metricsLoading, sectors, users, auditLogs, exportData } = useAdmin();

  return (
    <DashboardLayout title="Admin Hub" subtitle="System administration & analytics">
      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="metrics"><Activity className="w-4 h-4 mr-1.5" />System Metrics</TabsTrigger>
          <TabsTrigger value="sectors"><BarChart3 className="w-4 h-4 mr-1.5" />Sectors</TabsTrigger>
          <TabsTrigger value="users"><Users className="w-4 h-4 mr-1.5" />Users</TabsTrigger>
          <TabsTrigger value="audit"><Shield className="w-4 h-4 mr-1.5" />Audit Log</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {metricsLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Users', value: metrics?.totalUsers ?? '—', icon: Users },
                  { label: 'Active Sessions', value: metrics?.activeSessions ?? '—', icon: Activity },
                  { label: 'API Uptime', value: metrics?.uptime ?? '99.9%', icon: Server },
                  { label: 'Error Rate', value: metrics?.errorRate ?? '0.1%', icon: Shield },
                ].map((item, i) => (
                  <Card key={i} className="p-4 shadow-card border-none">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-foreground">{item.value}</p>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            <Card className="p-5 shadow-card border-none">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">Export Anonymized Data</h3>
                <Button size="sm" className="text-xs" onClick={() => exportData({ format: 'excel', anonymize: true })}>
                  <Download className="w-3.5 h-3.5 mr-1.5" /> Export Excel
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Download anonymized system data for analysis. PII is automatically masked.</p>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="sectors">
          <Card className="p-5 shadow-card border-none">
            <h3 className="text-sm font-semibold text-foreground mb-4">Sector Performance</h3>
            {sectors ? (
              <div className="space-y-3">
                {(sectors as any[]).map((sector: any, i: number) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-none">
                    <span className="text-sm text-foreground">{sector.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-foreground">{sector.invoiceCount} invoices</span>
                      <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">{sector.complianceRate}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Loading sector data...</p>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="p-5 shadow-card border-none">
            <h3 className="text-sm font-semibold text-foreground mb-4">Admin Users</h3>
            {users ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Name</TableHead>
                    <TableHead className="text-xs">Email</TableHead>
                    <TableHead className="text-xs">Role</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(users as any[]).map((u: any) => (
                    <TableRow key={u.id}>
                      <TableCell className="text-sm">{u.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{u.email}</TableCell>
                      <TableCell><Badge variant="outline" className="text-xs">{u.role}</Badge></TableCell>
                      <TableCell><Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">Active</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground">Loading users...</p>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <Card className="p-5 shadow-card border-none">
            <h3 className="text-sm font-semibold text-foreground mb-4">Audit Log</h3>
            {auditLogs ? (
              <div className="space-y-2">
                {(auditLogs as any[]).map((log: any, i: number) => (
                  <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/50">
                    <div>
                      <p className="text-sm text-foreground">{log.action}</p>
                      <p className="text-xs text-muted-foreground">{log.user} • {log.ip}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Loading audit logs...</p>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
