import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Clock, Wallet, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatNaira } from '@/lib/utils/format';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const revenueData = [
  { month: 'Jul', revenue: 9_200_000, expenses: 6_100_000, profit: 3_100_000 },
  { month: 'Aug', revenue: 10_800_000, expenses: 6_500_000, profit: 4_300_000 },
  { month: 'Sep', revenue: 9_600_000, expenses: 7_200_000, profit: 2_400_000 },
  { month: 'Oct', revenue: 11_400_000, expenses: 6_800_000, profit: 4_600_000 },
  { month: 'Nov', revenue: 12_100_000, expenses: 7_100_000, profit: 5_000_000 },
  { month: 'Dec', revenue: 12_750_000, expenses: 7_400_000, profit: 5_350_000 },
];

const velocityData = [
  { month: 'Jul', avgDays: 18, medianDays: 15 },
  { month: 'Aug', avgDays: 16, medianDays: 13 },
  { month: 'Sep', avgDays: 19, medianDays: 16 },
  { month: 'Oct', avgDays: 15, medianDays: 12 },
  { month: 'Nov', avgDays: 14, medianDays: 11 },
  { month: 'Dec', avgDays: 14, medianDays: 11 },
];

const cashflowData = [
  { month: 'Jan', inflow: 13_500_000, outflow: 8_200_000 },
  { month: 'Feb', inflow: 14_200_000, outflow: 8_900_000 },
  { month: 'Mar', inflow: 15_100_000, outflow: 9_100_000 },
  { month: 'Apr (proj)', inflow: 15_800_000, outflow: 9_400_000 },
  { month: 'May (proj)', inflow: 16_500_000, outflow: 9_700_000 },
  { month: 'Jun (proj)', inflow: 17_200_000, outflow: 10_000_000 },
];

const sourceBreakdown = [
  { name: 'Zoho Books', value: 62, color: 'hsl(210, 100%, 35%)' },
  { name: 'WhatsApp', value: 24, color: 'hsl(145, 63%, 42%)' },
  { name: 'QuickBooks', value: 14, color: 'hsl(45, 100%, 51%)' },
];

const topClients = [
  { name: 'Dangote Industries', revenue: 18_500_000, invoices: 24, growth: 12.3 },
  { name: 'MTN Nigeria', revenue: 14_200_000, invoices: 18, growth: 8.7 },
  { name: 'Access Bank Plc', revenue: 11_800_000, invoices: 15, growth: -2.1 },
  { name: 'Flour Mills of Nigeria', revenue: 9_600_000, invoices: 12, growth: 15.4 },
  { name: 'Nigerian Breweries', revenue: 7_200_000, invoices: 9, growth: 5.2 },
];

const formatAxis = (value: number) => `₦${(value / 1_000_000).toFixed(0)}M`;

export default function AnalyticsPage() {
  return (
    <DashboardLayout title="Analytics" subtitle="Revenue & growth insights">
      {/* Top Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Revenue', value: formatNaira(84_500_000), change: '+18.5%', up: true, icon: DollarSign },
          { label: 'Net Profit', value: formatNaira(24_750_000), change: '+22.1%', up: true, icon: Wallet },
          { label: 'Avg. Payment Days', value: '14 days', change: '-2 days', up: true, icon: Clock },
          { label: 'Growth Rate', value: '18.5%', change: '+3.2%', up: true, icon: BarChart3 },
        ].map((metric, i) => (
          <motion.div key={metric.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="p-4 shadow-card border-none">
              <div className="flex items-start justify-between mb-2">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{metric.label}</p>
                <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center">
                  <metric.icon className="w-4 h-4 text-primary" />
                </div>
              </div>
              <p className="text-xl font-bold text-foreground mb-1">{metric.value}</p>
              <div className="flex items-center gap-1">
                {metric.up ? <ArrowUpRight className="w-3.5 h-3.5 text-success" /> : <ArrowDownRight className="w-3.5 h-3.5 text-destructive" />}
                <span className={`text-xs font-medium ${metric.up ? 'text-success' : 'text-destructive'}`}>{metric.change}</span>
                <span className="text-xs text-muted-foreground">vs last period</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="velocity">Payment Velocity</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="p-5 shadow-card border-none lg:col-span-2">
              <h3 className="text-sm font-semibold text-foreground mb-4">Revenue vs Expenses</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(210, 100%, 35%)" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="hsl(210, 100%, 35%)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="profGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(145, 63%, 42%)" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="hsl(145, 63%, 42%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                    <YAxis tickFormatter={formatAxis} tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                    <Tooltip formatter={(value: number) => formatNaira(value)} />
                    <Area type="monotone" dataKey="revenue" stroke="hsl(210, 100%, 35%)" fill="url(#revGrad)" strokeWidth={2} />
                    <Area type="monotone" dataKey="profit" stroke="hsl(145, 63%, 42%)" fill="url(#profGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-5 shadow-card border-none">
              <h3 className="text-sm font-semibold text-foreground mb-4">Revenue by Source</h3>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={sourceBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={4}>
                      {sourceBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Legend formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="velocity">
          <Card className="p-5 shadow-card border-none">
            <h3 className="text-sm font-semibold text-foreground mb-4">Payment Collection Speed (Days)</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={velocityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                  <Tooltip />
                  <Line type="monotone" dataKey="avgDays" stroke="hsl(210, 100%, 35%)" strokeWidth={2} name="Average" dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="medianDays" stroke="hsl(145, 63%, 42%)" strokeWidth={2} name="Median" dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="cashflow">
          <Card className="p-5 shadow-card border-none">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-sm font-semibold text-foreground">Cash Flow Forecast</h3>
              <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">87% confidence</Badge>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cashflowData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                  <YAxis tickFormatter={formatAxis} tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                  <Tooltip formatter={(value: number) => formatNaira(value)} />
                  <Bar dataKey="inflow" fill="hsl(210, 100%, 35%)" radius={[4, 4, 0, 0]} name="Inflow" />
                  <Bar dataKey="outflow" fill="hsl(354, 70%, 54%)" radius={[4, 4, 0, 0]} name="Outflow" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Top Clients */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-6">
        <Card className="p-5 shadow-card border-none">
          <h3 className="text-sm font-semibold text-foreground mb-4">Top Clients by Revenue</h3>
          <div className="space-y-3">
            {topClients.map((client, i) => (
              <div key={client.name} className="flex items-center justify-between py-2 border-b border-border last:border-none">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-muted-foreground w-5">{i + 1}</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{client.name}</p>
                    <p className="text-xs text-muted-foreground">{client.invoices} invoices</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{formatNaira(client.revenue)}</p>
                  <div className="flex items-center justify-end gap-1">
                    {client.growth > 0 ? <TrendingUp className="w-3 h-3 text-success" /> : <TrendingDown className="w-3 h-3 text-destructive" />}
                    <span className={`text-xs font-medium ${client.growth > 0 ? 'text-success' : 'text-destructive'}`}>
                      {client.growth > 0 ? '+' : ''}{client.growth}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
}
