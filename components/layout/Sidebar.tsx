"use client";

import { NAV_ITEMS } from "@/lib/constants";
import { PanelId } from "@/types";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
  active: PanelId;
  onSelect: (id: PanelId) => void;
}

export default function Sidebar({ active, onSelect }: SidebarProps) {
  const showcaseItems = NAV_ITEMS.filter((i) => i.group === "showcase");
  const toolItems = NAV_ITEMS.filter((i) => i.group === "tools");

  return (
    <aside className="w-56 shrink-0 flex flex-col h-screen bg-brand-surface border-r border-brand-border overflow-y-auto">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-brand-border">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-brand-green/20 border border-brand-green/40 flex items-center justify-center">
            <span className="text-brand-green text-xs font-mono font-bold">TD</span>
          </div>
          <div>
            <p className="text-brand-text text-xs font-display font-semibold leading-tight">
              Teradata<span className="text-brand-muted mx-1">→</span>
              <span className="text-brand-green">Snowflake</span>
            </p>
            <p className="text-brand-muted text-[10px] font-mono">AI Migration Platform</p>
          </div>
        </div>
      </div>

      {/* Platform section */}
      <nav className="flex-1 px-2 py-4 flex flex-col gap-0.5">
        <p className="text-[10px] font-mono uppercase tracking-widest text-brand-muted px-3 mb-2">
          Platform
        </p>
        {showcaseItems.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            active={active === item.id}
            onClick={onSelect}
          />
        ))}

        {/* Divider */}
        <div className="my-3 border-t border-brand-border" />

        <p className="text-[10px] font-mono uppercase tracking-widest text-brand-muted px-3 mb-2">
          Tools
        </p>
        {toolItems.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            active={active === item.id}
            onClick={onSelect}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-brand-border">
        <p className="text-[10px] text-brand-muted font-mono">v1.0.0 · Powered by Claude</p>
      </div>
    </aside>
  );
}
