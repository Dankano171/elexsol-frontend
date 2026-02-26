'use client';

import { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { formatNigerianNumber } from '@/lib/utils';

interface InvoiceVolumeChartProps {
  period: 'week' | 'month' | 'quarter';
  showProjected?: boolean;
}

// Mock data - will be replaced with API data
const generateMockData = (period: string) => {
  const data = [];
  const points = period === 'week' ? 7 : period === 'month' ? 30 : 90;
  const today = new Date();

  for (let i = points - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      actual: Math.floor(Math.random() * 500000) + 200000,
      projected: Math.floor(Math.random() * 500000) + 200000,
      previous: Math.floor(Math.random() * 500000) + 150000,
    });
  }

  return data;
};

export function InvoiceVolumeChart({ period, showProjected }: InvoiceVolumeChartProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
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
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0056b3" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#0056b3" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#28a745" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#28a745" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6c757d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#6c757d" stopOpacity={0}/>
            </linearGradient>
          </defs>
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
          <Area
            type="monotone"
            dataKey="actual"
            name="Actual"
            stroke="#0056b3"
            fill="url(#colorActual)"
            strokeWidth={2}
          />
          {showProjected && (
            <Area
              type="monotone"
              dataKey="projected"
              name="Projected"
              stroke="#28a745"
              fill="url(#colorProjected)"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          )}
          <Area
            type="monotone"
            dataKey="previous"
            name="Previous Period"
            stroke="#6c757d"
            fill="url(#colorPrevious)"
            strokeWidth={1}
            opacity={0.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
