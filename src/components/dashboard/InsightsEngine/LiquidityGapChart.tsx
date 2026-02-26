'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { formatNigerianNumber } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface LiquidityGapChartProps {
  period: 'week' | 'month' | 'quarter';
  showProjected?: boolean;
}

// Mock data
const generateMockData = (period: string) => {
  const data = [];
  const points = period === 'week' ? 7 : period === 'month' ? 30 : 90;
  const today = new Date();

  for (let i = points - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const gap = Math.floor(Math.random() * 200000) - 100000;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      gap: gap,
      volume: Math.floor(Math.random() * 500000) + 200000,
      collection: Math.floor(Math.random() * 400000) + 100000,
    });
  }

  return data;
};

export function LiquidityGapChart({ period, showProjected }: LiquidityGapChartProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(generateMockData(period));
      setLoading(false);
    }, 1000);
  }, [period]);

  if (loading) {
    return <Skeleton className="h-[300px] w-full" />;
  }

  const totalGap = data.reduce((sum, day) => sum + day.gap, 0);
  const positiveGapDays = data.filter(day => day.gap > 0).length;
  const negativeGapDays = data.filter(day => day.gap < 0).length;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const gapValue = payload[0].value;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="text-sm font-medium mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span>Volume:</span>
              <span className="font-mono font-medium ml-4">
                {formatNigerianNumber(payload[1]?.payload.volume)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Collection:</span>
              <span className="font-mono font-medium ml-4">
                {formatNigerianNumber(payload[1]?.payload.collection)}
              </span>
            </div>
            <div className="border-t my-1" />
            <div className="flex items-center justify-between text-sm">
              <span>Gap:</span>
              <span className={cn(
                'font-mono font-medium',
                gapValue >= 0 ? 'text-success' : 'text-error'
              )}>
                {gapValue >= 0 ? '+' : ''}{formatNigerianNumber(gapValue)}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 mb-1">Total Gap</p>
          <p className={cn(
            'text-lg font-bold',
            totalGap >= 0 ? 'text-success' : 'text-error'
          )}>
            {totalGap >= 0 ? '+' : ''}{formatNigerianNumber(totalGap)}
          </p>
        </div>
        <div className="p-3 bg-success/10 rounded-lg">
          <p className="text-xs text-success mb-1">Positive Days</p>
          <p className="text-lg font-bold text-success">{positiveGapDays}</p>
        </div>
        <div className="p-3 bg-error/10 rounded-lg">
          <p className="text-xs text-error mb-1">Negative Days</p>
          <p className="text-lg font-bold text-error">{negativeGapDays}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              interval={period === 'week' ? 0 : Math.floor(data.length / 7)}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => formatNigerianNumber(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={0} stroke="#000" strokeWidth={1} />
            <Bar dataKey="gap" name="Liquidity Gap">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.gap >= 0 ? '#28a745' : '#dc3545'}
                  opacity={0.8}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      {negativeGapDays > positiveGapDays && (
        <div className="flex items-center p-3 bg-warning/10 rounded-lg">
          <AlertCircle className="h-4 w-4 text-warning mr-2" />
          <p className="text-sm text-warning">
            More negative days than positive. Consider reviewing your payment terms and collection strategy.
          </p>
        </div>
      )}
    </div>
  );
}
