import SectionHeader from "@/components/ui/SectionHeader";
import { DOC_CARDS } from "@/lib/constants";

export default function DocumentationPanel() {
  return (
    <div className="p-8 min-h-screen bg-brand-bg">
      <SectionHeader
        badge="Auto-Generated"
        title="Documentation"
        subtitle="Comprehensive documentation auto-generated at every stage of the migration lifecycle"
      />

      <div className="grid grid-cols-3 gap-4 mt-6">
        {DOC_CARDS.map((card) => (
          <div
            key={card.title}
            className="group rounded-xl border border-brand-border bg-brand-surface p-5 hover:border-brand-green/30 hover:bg-brand-elevated transition-all duration-150 cursor-default"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-2xl">{card.icon}</div>
              <span className="text-[10px] font-mono text-brand-green border border-brand-green/30 bg-brand-green/10 px-2 py-0.5 rounded">
                {card.count}
              </span>
            </div>
            <h3 className="text-sm font-display font-semibold text-brand-text mb-2 group-hover:text-brand-green transition-colors duration-150">
              {card.title}
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Bottom CTA panel */}
      <div className="mt-6 rounded-xl border border-brand-purple/30 bg-brand-purple/10 p-6 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-display font-semibold text-brand-text mb-1">
            Documentation Generated Automatically
          </h3>
          <p className="text-xs text-brand-muted">
            Every migration produces a complete audit trail, runbook, and technical specification — no manual effort required.
          </p>
        </div>
        <div className="shrink-0 ml-6">
          <div className="text-3xl font-display font-bold text-brand-purple">100%</div>
          <div className="text-xs text-brand-muted font-mono text-right">automated</div>
        </div>
      </div>
    </div>
  );
}
