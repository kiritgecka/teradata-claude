"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { ANALYTICS_DATA } from "@/lib/constants";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const progressStats = [
  { label: "Schema Migration", value: 98, color: "#00FF88" },
  { label: "Data Transfer", value: 84, color: "#00D4FF" },
  { label: "Validation", value: 91, color: "#7C3AED" },
  { label: "Documentation", value: 100, color: "#F97316" },
];

export default function AnalyticsPanel() {
  return (
    <div className="p-8 min-h-screen bg-brand-bg">
      <SectionHeader
        badge="Intelligence"
        title="Deep Analytics"
        subtitle="Real-time migration telemetry and quality metrics across all phases"
      />

      <div className="grid grid-cols-3 gap-6">
        {/* Area chart */}
        <div className="col-span-2 rounded-xl border border-brand-border bg-brand-surface p-5">
          <h3 className="text-sm font-display font-semibold text-brand-text mb-4">
            Monthly Migration Volume
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={ANALYTICS_DATA}>
              <defs>
                <linearGradient id="migrated" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00FF88" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#00FF88" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="validated" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A1D35" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: "#6B7280", fontSize: 11, fontFamily: "JetBrains Mono" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#6B7280", fontSize: 11, fontFamily: "JetBrains Mono" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0D0F1E",
                  border: "1px solid #1A1D35",
                  borderRadius: 8,
                  fontFamily: "JetBrains Mono",
                  fontSize: 11,
                }}
                labelStyle={{ color: "#E2E8F0" }}
                cursor={{ stroke: "#1A1D35" }}
              />
              <Area
                type="monotone"
                dataKey="migrated"
                stroke="#00FF88"
                strokeWidth={2}
                fill="url(#migrated)"
                name="Migrated"
              />
              <Area
                type="monotone"
                dataKey="validated"
                stroke="#00D4FF"
                strokeWidth={2}
                fill="url(#validated)"
                name="Validated"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Progress stats */}
        <div className="rounded-xl border border-brand-border bg-brand-surface p-5">
          <h3 className="text-sm font-display font-semibold text-brand-text mb-5">
            Phase Completion
          </h3>
          <div className="flex flex-col gap-5">
            {progressStats.map((stat) => (
              <div key={stat.label}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-xs font-mono text-brand-muted">{stat.label}</span>
                  <span className="text-xs font-mono font-bold" style={{ color: stat.color }}>
                    {stat.value}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-brand-elevated rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${stat.value}%`, backgroundColor: stat.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-6 pt-5 border-t border-brand-border">
            <div className="text-3xl font-display font-bold text-brand-green mb-1">99.98%</div>
            <div className="text-xs text-brand-muted font-mono">Overall data accuracy</div>
          </div>
        </div>
      </div>
    </div>
  );
}
