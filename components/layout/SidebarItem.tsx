"use client";

import {
  Layers, GitMerge, Network, Shuffle, FileText,
  Zap, BarChart2, PieChart, Code2
} from "lucide-react";
import { NavItem, PanelId } from "@/types";
import { clsx } from "clsx";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Layers, GitMerge, Network, Shuffle, FileText,
  Zap, BarChart2, PieChart, Code2,
};

interface SidebarItemProps {
  item: NavItem;
  active: boolean;
  onClick: (id: PanelId) => void;
}

export default function SidebarItem({ item, active, onClick }: SidebarItemProps) {
  const Icon = ICON_MAP[item.icon] ?? Layers;

  return (
    <button
      onClick={() => onClick(item.id)}
      className={clsx(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-r-md text-sm font-body transition-colors duration-150 group border-l-2",
        active
          ? "border-brand-green bg-brand-green/10 text-brand-green"
          : "border-transparent text-brand-muted hover:text-brand-text hover:bg-brand-elevated hover:border-brand-border"
      )}
    >
      <Icon
        className={clsx(
          "w-4 h-4 shrink-0 transition-colors duration-150",
          active ? "text-brand-green" : "text-brand-muted group-hover:text-brand-text"
        )}
      />
      <span className="flex-1 text-left leading-tight">{item.label}</span>
      {item.badge && (
        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-brand-green/20 text-brand-green border border-brand-green/30">
          {item.badge}
        </span>
      )}
    </button>
  );
}
