import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useDashboard } from '@/lib/hooks/useDashboard';
import { Skeleton } from '@/components/ui/skeleton';
import ApiErrorState from '@/components/shared/ApiErrorState';

export default function RevenueChart() {
  const { chartData, chartLoading, chartError, refetchChart } = useDashboard();

  if (chartLoading) return <Skeleton className="h-[360px] rounded-xl" />;
  if (chartError) return <ApiErrorState message={(chartError as Error).message} onRetry={refetchChart} />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Card className="p-5 shadow-card border-none">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Revenue Overview</h3>
            <p className="text-xs text-muted-foreground">Last 6 months performance</p>
          </div>
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              <span className="text-muted-foreground">Revenue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-success" />
              <span className="text-muted-foreground">Profit</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(210 100% 35%)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="hsl(210 100% 35%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(145 63% 42%)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="hsl(145 63% 42%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(214 20% 90%)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(215 16% 47%)' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(215 16% 47%)' }} tickFormatter={(v) => `₦${v / 1_000_000}M`} />
            <Tooltip
              contentStyle={{ background: 'hsl(0 0% 100%)', border: '1px solid hsl(214 20% 90%)', borderRadius: '8px', fontSize: '12px' }}
              formatter={(value: number) => [`₦${(value / 1_000_000).toFixed(1)}M`]}
            />
            <Area type="monotone" dataKey="revenue" stroke="hsl(210 100% 35%)" strokeWidth={2} fill="url(#colorRevenue)" />
            <Area type="monotone" dataKey="profit" stroke="hsl(145 63% 42%)" strokeWidth={2} fill="url(#colorProfit)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </motion.div>
  );
}
