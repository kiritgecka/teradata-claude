import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import { TRANSFORMATION_ROWS } from "@/lib/constants";

const statusVariant = (status: string) => {
  if (status === "automated") return "green";
  if (status === "review") return "cyan";
  return "orange";
};

export default function TransformationsPanel() {
  const automated = TRANSFORMATION_ROWS.filter((r) => r.status === "automated").length;
  const review = TRANSFORMATION_ROWS.filter((r) => r.status === "review").length;
  const manual = TRANSFORMATION_ROWS.filter((r) => r.status === "manual").length;

  return (
    <div className="p-8 min-h-screen bg-brand-bg">
      <SectionHeader
        badge="Dialect Mapping"
        title="Key Transformations"
        subtitle="Automated SQL dialect conversions applied during migration"
      />

      {/* Summary badges */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-brand-green/30 bg-brand-green/10">
          <span className="w-2 h-2 rounded-full bg-brand-green" />
          <span className="text-xs font-mono text-brand-green">{automated} Automated</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-brand-cyan/30 bg-brand-cyan/10">
          <span className="w-2 h-2 rounded-full bg-brand-cyan" />
          <span className="text-xs font-mono text-brand-cyan">{review} Needs Review</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-brand-orange/30 bg-brand-orange/10">
          <span className="w-2 h-2 rounded-full bg-brand-orange" />
          <span className="text-xs font-mono text-brand-orange">{manual} Manual</span>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-brand-border overflow-hidden">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="bg-brand-elevated border-b border-brand-border">
              <th className="px-4 py-3 text-left text-brand-muted font-semibold uppercase tracking-wider">
                Teradata Syntax
              </th>
              <th className="px-4 py-3 text-left text-brand-muted font-semibold uppercase tracking-wider">
                Snowflake Equivalent
              </th>
              <th className="px-4 py-3 text-left text-brand-muted font-semibold uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {TRANSFORMATION_ROWS.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-brand-border/50 hover:bg-brand-elevated/50 transition-colors duration-100"
              >
                <td className="px-4 py-3 text-brand-cyan">{row.teradata}</td>
                <td className="px-4 py-3 text-brand-text">{row.snowflake}</td>
                <td className="px-4 py-3">
                  <Badge variant={statusVariant(row.status) as "green" | "cyan" | "orange"}>
                    {row.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
