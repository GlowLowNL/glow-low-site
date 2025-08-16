"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface PriceHistoryChartProps {
  productId: string;
  currentPrice?: number;
}

export function PriceHistoryChart({ productId, currentPrice }: PriceHistoryChartProps) {
  // Generate mock price history data for demo purposes
  const generateMockData = (basePrice: number) => {
    const data = [];
    const now = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Generate some realistic price variation
      const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
      const price = Math.max(basePrice * (1 + variation), basePrice * 0.8);
      
      data.push({
        date: date.toLocaleDateString('nl-NL', { 
          month: 'short', 
          day: 'numeric' 
        }),
        price: Math.round(price * 100) / 100,
      });
    }
    
    return data;
  };

  const chartData = currentPrice ? generateMockData(currentPrice) : [];

  if (!currentPrice || chartData.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg bg-muted">
        <p className="text-muted-foreground">Prijsgeschiedenis niet beschikbaar.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-4">
      <h3 className="mb-4 text-lg font-semibold">Prijsgeschiedenis (30 dagen)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `€${value}`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
            formatter={(value) => [`€${value}`, 'Prijs']}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#ec4899" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#ec4899' }}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PriceHistoryChart;
