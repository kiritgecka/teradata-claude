import Badge from "@/components/ui/Badge";

const tags = [
  { label: "Agentic", variant: "purple" as const },
  { label: "Autonomous", variant: "cyan" as const },
  { label: "Auto", variant: "green" as const },
  { label: "~84% Faster", variant: "green" as const },
  { label: "Gated Safety", variant: "muted" as const },
];

const metrics = [
  { value: "1,247", label: "Tables Migrated" },
  { value: "84%", label: "Avg Speed Gain" },
  { value: "99.98%", label: "Data Accuracy" },
  { value: "~6 wks", label: "Time to Production" },
];

export default function HeroPanel() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-8 py-16 overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-purple/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-brand-green/8 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-cyan/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl text-center">
        {/* Eyebrow */}
        <p className="text-xs font-mono uppercase tracking-widest text-brand-muted mb-6">
          Enterprise AI Migration Platform
        </p>

        {/* Main heading */}
        <h1 className="text-6xl font-display font-bold leading-tight tracking-tight mb-6">
          <span className="text-brand-text">Teradata </span>
          <span className="text-brand-muted">→ </span>
          <span className="text-brand-green">Snowflake</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg text-brand-muted font-body leading-relaxed mb-10 max-w-xl mx-auto">
          The end-to-end agentic platform to migrate your entire Teradata estate to Snowflake —
          automatically, autonomously, and with gated human oversight.
        </p>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tags.map((tag) => (
            <Badge key={tag.label} variant={tag.variant}>
              {tag.label}
            </Badge>
          ))}
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-4 gap-4">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-brand-border bg-brand-surface/80 p-4 text-center"
            >
              <div className="text-2xl font-display font-bold text-brand-green mb-1">
                {m.value}
              </div>
              <div className="text-xs text-brand-muted font-mono">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
