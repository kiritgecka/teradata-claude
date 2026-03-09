import SectionHeader from "@/components/ui/SectionHeader";


export default function AgentFlowPanel() {
  return (
    <div className="p-8 min-h-screen bg-brand-bg">
      <SectionHeader
        badge="Multi-Agent"
        title="Agentic Data Flow"
        subtitle="Specialized AI agents work in concert, each owning a distinct phase of the migration pipeline"
      />

      {/* Agent grid */}
      <div className="mt-8 grid grid-cols-5 gap-4 relative">
        {/* Orchestrator — spans center top */}
        <div className="col-start-3 col-span-1">
          <div
            className="rounded-xl border-2 p-4 text-center"
            style={{
              borderColor: "#7C3AED",
              backgroundColor: "#7C3AED18",
              boxShadow: "0 0 24px #7C3AED30",
            }}
          >
            <div className="text-lg mb-1">🧠</div>
            <div className="text-xs font-display font-semibold text-brand-text">Orchestrator Agent</div>
            <div className="text-[10px] text-brand-muted mt-0.5 font-mono">Coordinates all sub-agents</div>
            <div className="mt-2 inline-block text-[9px] font-mono px-1.5 py-0.5 rounded bg-brand-purple/20 text-brand-purple border border-brand-purple/30">
              ACTIVE
            </div>
          </div>
        </div>

        {/* Row 2: sub-agents */}
        <div className="col-start-1 col-span-5 grid grid-cols-4 gap-4 mt-4">
          {[
            { label: "Schema Analyzer", role: "DDL parsing & mapping", color: "#00D4FF", icon: "🗺️", status: "RUNNING" },
            { label: "SQL Transformer", role: "Dialect conversion", color: "#00FF88", icon: "⚡", status: "RUNNING" },
            { label: "Data Validator", role: "Checksum & row counts", color: "#F97316", icon: "✅", status: "QUEUED" },
            { label: "Query Optimizer", role: "Performance tuning", color: "#00FF88", icon: "📈", status: "QUEUED" },
          ].map((agent) => (
            <div
              key={agent.label}
              className="rounded-xl border p-4"
              style={{
                borderColor: agent.color,
                backgroundColor: `${agent.color}10`,
              }}
            >
              <div className="text-lg mb-1">{agent.icon}</div>
              <div className="text-xs font-display font-semibold text-brand-text">{agent.label}</div>
              <div className="text-[10px] text-brand-muted mt-0.5 font-mono">{agent.role}</div>
              <div
                className="mt-2 inline-block text-[9px] font-mono px-1.5 py-0.5 rounded border"
                style={{
                  backgroundColor: `${agent.color}15`,
                  color: agent.color,
                  borderColor: `${agent.color}40`,
                }}
              >
                {agent.status}
              </div>
            </div>
          ))}
        </div>

        {/* Row 3: doc generator */}
        <div className="col-start-3 col-span-1 mt-4">
          <div
            className="rounded-xl border p-4 text-center"
            style={{ borderColor: "#00D4FF", backgroundColor: "#00D4FF10" }}
          >
            <div className="text-lg mb-1">📄</div>
            <div className="text-xs font-display font-semibold text-brand-text">Doc Generator</div>
            <div className="text-[10px] text-brand-muted mt-0.5 font-mono">Auto documentation</div>
            <div className="mt-2 inline-block text-[9px] font-mono px-1.5 py-0.5 rounded bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30">
              IDLE
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-10 grid grid-cols-4 gap-4">
        {[
          { label: "Active Agents", value: "6", color: "#00FF88" },
          { label: "Tasks Queued", value: "247", color: "#00D4FF" },
          { label: "Completed", value: "1,891", color: "#7C3AED" },
          { label: "Avg Latency", value: "1.2s", color: "#F97316" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-brand-border bg-brand-surface p-4 text-center">
            <div className="text-2xl font-display font-bold mb-1" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="text-xs text-brand-muted font-mono">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
