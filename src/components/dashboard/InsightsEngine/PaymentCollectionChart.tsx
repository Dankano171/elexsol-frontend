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
  Legend,
  Line,
  ComposedChart,
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { formatNigerianNumber } from '@/lib/utils';

interface PaymentCollectionChartProps {
  period: 'week' | 'month' | 'quarter';
  showProjected?: boolean;
  showBenchmark?: boolean;
}

// Mock data
const generateMockData = (period: string) => {
  const data = [];
  const points = period === 'week' ? 7 : period === 'month' ? 30 : 90;
  const today = new Date();

  for (let i = points - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      collected: Math.floor(Math.random() * 400000) + 100000,
      projected: Math.floor(Math.random() * 400000) + 100000,
      benchmark: Math.floor(Math.random() * 300000) + 200000,
      target: 350000,
    });
  }

  return data;
};

export function PaymentCollectionChart({
  period,
  showProjected,
  showBenchmark,
}: PaymentCollectionChartProps) {
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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="text-sm font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between space-x-4 text-sm">
              <span style={{ color: entry.color }}>{entry.name}:</span>
              <span className="font-mono font-medium">
                {formatNigerianNumber(entry.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
          <Legend />
          <Bar
            dataKey="collected"
            name="Collected"
            fill="#0056b3"
            radius={[4, 4, 0, 0]}
          />
          {showProjected && (
            <Bar
              dataKey="projected"
              name="Projected"
              fill="#28a745"
              radius={[4, 4, 0, 0]}
              opacity={0.6}
            />
          )}
          {showBenchmark && (
            <Line
              type="monotone"
              dataKey="benchmark"
              name="Industry Benchmark"
              stroke="#dc3545"
              strokeWidth={2}
              dot={false}
            />
          )}
          <Line
            type="monotone"
            dataKey="target"
            name="Target"
            stroke="#ffc107"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
