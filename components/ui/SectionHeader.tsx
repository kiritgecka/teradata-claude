interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
}

export default function SectionHeader({ title, subtitle, badge }: SectionHeaderProps) {
  return (
    <div className="mb-6">
      {badge && (
        <span className="inline-block mb-2 text-[10px] font-mono uppercase tracking-widest text-brand-green border border-brand-green/30 bg-brand-green/10 px-2 py-0.5 rounded">
          {badge}
        </span>
      )}
      <h1 className="text-2xl font-display font-bold text-brand-text tracking-tight">{title}</h1>
      {subtitle && (
        <p className="mt-1 text-sm text-brand-muted font-body">{subtitle}</p>
      )}
    </div>
  );
}
