export type PanelId =
  | "hero"
  | "migration-flow"
  | "agent-flow"
  | "transformations"
  | "documentation"
  | "optimization"
  | "analytics"
  | "dashboard"
  | "sql-converter";

export interface NavItem {
  id: PanelId;
  label: string;
  icon: string;
  group: "showcase" | "tools";
  badge?: string;
}

export interface ConversionResult {
  snowflakeSQL: string;
  error?: string;
}

export type ConversionStatus = "idle" | "loading" | "success" | "error";
