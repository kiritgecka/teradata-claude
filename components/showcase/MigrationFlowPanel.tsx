import SectionHeader from "@/components/ui/SectionHeader";
import { MIGRATION_STEPS } from "@/lib/constants";

export default function MigrationFlowPanel() {
  return (
    <div className="p-8 min-h-screen bg-brand-bg">
      <SectionHeader
        badge="End-to-End"
        title="Autonomous Migration Flow"
        subtitle="Six-phase agentic pipeline from assessment to go-live, fully automated with gated checkpoints"
      />

      {/* Flow diagram */}
      <div className="mt-10 flex items-center justify-center gap-0 overflow-x-auto pb-4">
        {MIGRATION_STEPS.map((step, idx) => (
          <div key={step.label} className="flex items-center">
            {/* Node */}
            <div className="flex flex-col items-center w-36">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-3 border-2"
                style={{
                  borderColor: step.color,
                  backgroundColor: `${step.color}18`,
                  boxShadow: `0 0 16px ${step.color}30`,
                }}
              >
                {step.icon}
              </div>
              <p
                className="text-xs font-mono text-center whitespace-pre-line leading-tight"
                style={{ color: step.color }}
              >
                {step.label}
              </p>
              <div className="mt-2 text-[10px] text-brand-muted font-mono">
                Phase {idx + 1}
              </div>
            </div>

            {/* Connector arrow */}
            {idx < MIGRATION_STEPS.length - 1 && (
              <div className="flex items-center mx-1 mb-6">
                <div className="w-8 h-px bg-brand-cyan/40" />
                <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-brand-cyan/60" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detail cards below */}
      <div className="mt-12 grid grid-cols-3 gap-4">
        {[
          {
            title: "Assessment Engine",
            desc: "Automated discovery of all Teradata objects: tables, views, macros, stored procedures, and BTEQ scripts.",
            color: "#7C3AED",
            count: "100% object coverage",
          },
          {
            title: "Parallel Migration",
            desc: "Multi-agent architecture runs schema conversion, data transfer, and validation in parallel for maximum throughput.",
            color: "#00D4FF",
            count: "Up to 10x faster",
          },
          {
            title: "Gated Checkpoints",
            desc: "Human-in-the-loop gates before cutover. Every migration step is auditable and reversible.",
            color: "#00FF88",
            count: "Full audit trail",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-xl border border-brand-border bg-brand-surface p-5"
            style={{ borderTopColor: card.color, borderTopWidth: 2 }}
          >
            <div className="text-sm font-display font-semibold text-brand-text mb-2">
              {card.title}
            </div>
            <p className="text-xs text-brand-muted leading-relaxed mb-3">{card.desc}</p>
            <span className="text-[10px] font-mono" style={{ color: card.color }}>
              {card.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
