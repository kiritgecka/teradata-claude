"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { DASHBOARD_DATA, MONTHLY_PROGRESS } from "@/lib/constants";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const summaryMetrics = [
  { label: "Total Tables", value: "1,247", color: "#00FF88" },
  { label: "Migrated", value: "1,047", color: "#00D4FF" },
  { label: "In Progress", value: "156", color: "#7C3AED" },
  { label: "TB Transferred", value: "12.4", color: "#F97316" },
];

export default function DashboardPanel() {
  const total = DASHBOARD_DATA.reduce((s, d) => s + d.value, 0);

  return (
    <div className="p-8 min-h-screen bg-brand-bg">
      <SectionHeader
        badge="Migration Dashboard"
        title="Migration Progress"
        subtitle="Live status across all objects, phases, and data volumes"
      />

      {/* Metric cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {summaryMetrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-brand-border bg-brand-surface p-4 text-center">
            <div className="text-3xl font-display font-bold mb-1" style={{ color: m.color }}>
              {m.value}
            </div>
            <div className="text-xs text-brand-muted font-mono">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Bar chart */}
        <div className="col-span-2 rounded-xl border border-brand-border bg-brand-surface p-5">
          <h3 className="text-sm font-display font-semibold text-brand-text mb-4">
            Monthly Migration by Object Type
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={MONTHLY_PROGRESS} barGap={2} barSize={18}>
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
                cursor={{ fill: "#1A1D35" }}
              />
              <Bar dataKey="tables" name="Tables" fill="#00FF88" radius={[3, 3, 0, 0]} />
              <Bar dataKey="views" name="Views" fill="#00D4FF" radius={[3, 3, 0, 0]} />
              <Bar dataKey="procs" name="Procedures" fill="#7C3AED" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut chart */}
        <div className="rounded-xl border border-brand-border bg-brand-surface p-5 flex flex-col items-center justify-center">
          <h3 className="text-sm font-display font-semibold text-brand-text mb-4 self-start">
            Status Breakdown
          </h3>
          <PieChart width={180} height={180}>
            <Pie
              data={DASHBOARD_DATA}
              cx={90}
              cy={90}
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {DASHBOARD_DATA.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
          <div className="mt-4 flex flex-col gap-2 w-full">
            {DASHBOARD_DATA.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-brand-muted">{d.name}</span>
                </div>
                <span className="text-brand-text font-semibold">
                  {d.value} ({Math.round((d.value / total) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
