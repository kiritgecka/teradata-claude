import { clsx } from "clsx";
import { Zap, Loader2 } from "lucide-react";

interface ConvertButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
}

export default function ConvertButton({ onClick, loading, disabled }: ConvertButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        "flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-display font-semibold transition-all duration-150",
        "border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50",
        disabled || loading
          ? "bg-brand-surface border-brand-border text-brand-muted cursor-not-allowed"
          : "bg-brand-green text-brand-bg border-brand-green hover:bg-brand-green/90 active:scale-95 shadow-glow-green"
      )}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Zap className="w-4 h-4" />
      )}
      {loading ? "Converting..." : "Convert to Snowflake"}
    </button>
  );
}
