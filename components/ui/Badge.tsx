import { clsx } from "clsx";

type BadgeVariant = "green" | "purple" | "cyan" | "orange" | "muted";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  green: "bg-brand-green/15 text-brand-green border-brand-green/30",
  purple: "bg-brand-purple/15 text-brand-purple border-brand-purple/30",
  cyan: "bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30",
  orange: "bg-brand-orange/15 text-brand-orange border-brand-orange/30",
  muted: "bg-brand-elevated text-brand-muted border-brand-border",
};

export default function Badge({ children, variant = "muted", className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-medium border",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
