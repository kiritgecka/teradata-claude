"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { OPTIMIZATION_DATA } from "@/lib/constants";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const metrics = [
  { label: "Avg Query Speedup", value: "84%", color: "#00FF88" },
  { label: "Cost Reduction", value: "62%", color: "#00D4FF" },
  { label: "Concurrency Gain", value: "12×", color: "#7C3AED" },
  { label: "Storage Savings", value: "71%", color: "#F97316" },
];

export default function OptimizationPanel() {
  return (
    <div className="p-8 min-h-screen bg-brand-bg">
      <SectionHeader
        badge="Performance"
        title="Query & Job Optimization"
        subtitle="Before vs. after migration query execution times (seconds)"
      />

      {/* Metric cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-brand-border bg-brand-surface p-4 text-center">
            <div className="text-3xl font-display font-bold mb-1" style={{ color: m.color }}>
              {m.value}
            </div>
            <div className="text-xs text-brand-muted font-mono">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-brand-border bg-brand-surface p-6">
        <h3 className="text-sm font-display font-semibold text-brand-text mb-4">
          Query Execution Time: Teradata vs Snowflake (seconds)
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={OPTIMIZATION_DATA} barGap={4} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1A1D35" vertical={false} />
            <XAxis
              dataKey="query"
              tick={{ fill: "#6B7280", fontSize: 11, fontFamily: "JetBrains Mono" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#6B7280", fontSize: 11, fontFamily: "JetBrains Mono" }}
              axisLine={false}
              tickLine={false}
              unit="s"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0D0F1E",
                border: "1px solid #1A1D35",
                borderRadius: 8,
                fontFamily: "JetBrains Mono",
                fontSize: 12,
              }}
              labelStyle={{ color: "#E2E8F0" }}
              cursor={{ fill: "#1A1D35" }}
            />
            <Legend
              wrapperStyle={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "#6B7280" }}
            />
            <Bar dataKey="before" name="Teradata" fill="#7C3AED" radius={[4, 4, 0, 0]} />
            <Bar dataKey="after" name="Snowflake" fill="#00FF88" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
