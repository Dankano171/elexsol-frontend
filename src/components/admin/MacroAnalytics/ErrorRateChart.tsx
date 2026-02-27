'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data - replace with real data
const data = [
  { time: '00:00', rate: 0.5, threshold: 1 },
  { time: '01:00', rate: 0.3, threshold: 1 },
  { time: '02:00', rate: 0.8, threshold: 1 },
  { time: '03:00', rate: 1.2, threshold: 1 },
  { time: '04:00', rate: 0.9, threshold: 1 },
  { time: '05:00', rate: 0.4, threshold: 1 },
  { time: '06:00', rate: 0.6, threshold: 1 },
  { time: '07:00', rate | 1.1, threshold: 1 },
  { time: '08:00', rate: 1.5, threshold: 1 },
  { time: '09:00', rate: 2.1, threshold: 1 },
  { time: '10:00', rate: 1.8, threshold: 1 },
  { time: '11:00', rate: 1.3, threshold: 1 },
];

export function ErrorRateChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Error Rate (24h)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} unit="%" />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 border rounded-lg shadow-lg">
                        <p className="text-sm font-medium">{label}</p>
                        <p className="text-sm text-error">
                          Error Rate: {payload[0].value}%
                        </p>
                        <p className="text-sm text-warning">
                          Threshold: {payload[1].value}%
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="rate"
                name="Error Rate"
                stroke="#dc3545"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="threshold"
                name="Alert Threshold"
                stroke="#ffc107"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
