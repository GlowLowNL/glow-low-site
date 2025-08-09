"use client";

import { useQuery } from "@tanstack/react-query";
import { getPriceHistory } from "@/lib/mockApi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface PriceHistoryChartProps {
  productId: string;
}

export function PriceHistoryChart({ productId }: PriceHistoryChartProps) {
  const { data: priceHistory, isLoading, error } = useQuery({
    queryKey: ['price-history', productId],
    queryFn: () => getPriceHistory(productId, 30),
  });

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg bg-muted">
        <p className="text-muted-foreground">Prijsgeschiedenis laden...</p>
      </div>
    );
  }

  if (error || !priceHistory) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg bg-muted">
        <p className="text-muted-foreground">Kon prijsgeschiedenis niet laden.</p>
      </div>
    );
  }

  const chartData = priceHistory.history.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString('nl-NL', { 
      month: 'short', 
      day: 'numeric' 
    }),
    price: entry.price,
  }));

  return (
    <div className="rounded-lg border bg-card p-4">
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
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "hsl(var(--primary))" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PriceHistoryChart;
