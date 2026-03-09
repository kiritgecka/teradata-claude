"use client";

import { useState } from "react";
import { PanelId } from "@/types";
import Sidebar from "./Sidebar";
import HeroPanel from "@/components/showcase/HeroPanel";
import MigrationFlowPanel from "@/components/showcase/MigrationFlowPanel";
import AgentFlowPanel from "@/components/showcase/AgentFlowPanel";
import TransformationsPanel from "@/components/showcase/TransformationsPanel";
import DocumentationPanel from "@/components/showcase/DocumentationPanel";
import OptimizationPanel from "@/components/showcase/OptimizationPanel";
import AnalyticsPanel from "@/components/showcase/AnalyticsPanel";
import DashboardPanel from "@/components/showcase/DashboardPanel";
import SqlConverterPanel from "@/components/sql-converter/SqlConverterPanel";

const PANEL_MAP: Record<PanelId, React.ComponentType> = {
  hero: HeroPanel,
  "migration-flow": MigrationFlowPanel,
  "agent-flow": AgentFlowPanel,
  transformations: TransformationsPanel,
  documentation: DocumentationPanel,
  optimization: OptimizationPanel,
  analytics: AnalyticsPanel,
  dashboard: DashboardPanel,
  "sql-converter": SqlConverterPanel,
};

export default function Shell() {
  const [activePanel, setActivePanel] = useState<PanelId>("hero");
  const ActiveComponent = PANEL_MAP[activePanel];

  return (
    <div className="flex h-screen overflow-hidden bg-brand-bg">
      <Sidebar active={activePanel} onSelect={setActivePanel} />
      <main className="flex-1 overflow-y-auto">
        <ActiveComponent />
      </main>
    </div>
  );
}
