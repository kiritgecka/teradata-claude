import { clsx } from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: "green" | "purple" | "none";
}

export default function Card({ children, className, glow = "none" }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-xl border border-brand-border bg-brand-surface p-5",
        glow === "green" && "shadow-glow-green",
        glow === "purple" && "shadow-glow-purple",
        glow === "none" && "shadow-card",
        className
      )}
    >
      {children}
    </div>
  );
}
