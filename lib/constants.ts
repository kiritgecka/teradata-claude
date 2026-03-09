import { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: "Overview", icon: "Layers", group: "showcase" },
  { id: "migration-flow", label: "Migration Flow", icon: "GitMerge", group: "showcase" },
  { id: "agent-flow", label: "Agent Flow", icon: "Network", group: "showcase" },
  { id: "transformations", label: "Transformations", icon: "Shuffle", group: "showcase" },
  { id: "documentation", label: "Documentation", icon: "FileText", group: "showcase" },
  { id: "optimization", label: "Optimization", icon: "Zap", group: "showcase" },
  { id: "analytics", label: "Analytics", icon: "BarChart2", group: "showcase" },
  { id: "dashboard", label: "Dashboard", icon: "PieChart", group: "showcase" },
  { id: "sql-converter", label: "SQL Converter", icon: "Code2", group: "tools", badge: "LIVE" },
];

export const TRANSFORMATION_ROWS = [
  { teradata: "REPLACE TABLE", snowflake: "CREATE OR REPLACE TABLE", status: "automated" },
  { teradata: "QUALIFY window_fn", snowflake: "Subquery with ROW_NUMBER()", status: "automated" },
  { teradata: "COMPRESS", snowflake: "Omit (auto micro-partition)", status: "automated" },
  { teradata: "FALLBACK", snowflake: "Omit (HA built-in)", status: "automated" },
  { teradata: "MULTISET", snowflake: "Omit keyword", status: "automated" },
  { teradata: "NOT CASESPECIFIC", snowflake: "Omit (case-insensitive default)", status: "automated" },
  { teradata: "TITLE 'label'", snowflake: "Omit (not supported)", status: "automated" },
  { teradata: "FORMAT 'YYYY-MM-DD'", snowflake: "TO_CHAR() / TO_DATE()", status: "automated" },
  { teradata: "DATE 'YYYY-MM-DD'", snowflake: "'YYYY-MM-DD'::DATE", status: "automated" },
  { teradata: "PRIMARY INDEX (col)", snowflake: "Omit (micro-partitions)", status: "automated" },
  { teradata: "PARTITION BY RANGE_N", snowflake: "Omit (automatic clustering)", status: "review" },
  { teradata: "LOCKING TABLE FOR ACCESS", snowflake: "Omit (not applicable)", status: "automated" },
  { teradata: "SAMPLE n", snowflake: "SAMPLE (n ROWS)", status: "automated" },
  { teradata: "WITH DATA", snowflake: "Omit (CTAS always includes data)", status: "automated" },
  { teradata: "BYTEINT / CLOB / BLOB", snowflake: "SMALLINT / TEXT / BINARY", status: "automated" },
  { teradata: "COLLECT STATISTICS", snowflake: "ANALYZE TABLE", status: "review" },
  { teradata: "BT / ET / COMMIT", snowflake: "Omit (auto-commit)", status: "automated" },
  { teradata: "PERIOD(DATE)", snowflake: "DATE (split to range cols)", status: "manual" },
];

export const AGENT_NODES = [
  { id: "orchestrator", label: "Orchestrator", color: "#7C3AED", x: 50, y: 45 },
  { id: "schema", label: "Schema Analyzer", color: "#00D4FF", x: 20, y: 20 },
  { id: "transformer", label: "SQL Transformer", color: "#00FF88", x: 80, y: 20 },
  { id: "validator", label: "Validator", color: "#F97316", x: 20, y: 70 },
  { id: "optimizer", label: "Query Optimizer", color: "#00FF88", x: 80, y: 70 },
  { id: "docs", label: "Doc Generator", color: "#00D4FF", x: 50, y: 90 },
];

export const MIGRATION_STEPS = [
  { label: "Source\nAssessment", icon: "🔍", color: "#7C3AED" },
  { label: "Schema\nMapping", icon: "🗺️", color: "#00D4FF" },
  { label: "SQL\nTransform", icon: "⚡", color: "#00FF88" },
  { label: "Data\nValidation", icon: "✅", color: "#F97316" },
  { label: "Performance\nTuning", icon: "📈", color: "#00D4FF" },
  { label: "Cutover &\nGo-Live", icon: "🚀", color: "#00FF88" },
];

export const OPTIMIZATION_DATA = [
  { query: "Analytics", before: 42, after: 8 },
  { query: "Reports", before: 35, after: 6 },
  { query: "ETL Jobs", before: 28, after: 5 },
  { query: "Ad-hoc", before: 15, after: 3 },
  { query: "Batch", before: 60, after: 12 },
  { query: "Streaming", before: 10, after: 2 },
];

export const ANALYTICS_DATA = [
  { month: "Jan", migrated: 12, validated: 11, errors: 1 },
  { month: "Feb", migrated: 28, validated: 27, errors: 1 },
  { month: "Mar", migrated: 45, validated: 44, errors: 1 },
  { month: "Apr", migrated: 58, validated: 56, errors: 2 },
  { month: "May", migrated: 72, validated: 71, errors: 1 },
  { month: "Jun", migrated: 89, validated: 88, errors: 1 },
  { month: "Jul", migrated: 104, validated: 103, errors: 1 },
  { month: "Aug", migrated: 118, validated: 117, errors: 1 },
];

export const DASHBOARD_DATA = [
  { name: "Completed", value: 1047, color: "#00FF88" },
  { name: "In Progress", value: 156, color: "#00D4FF" },
  { name: "Pending", value: 44, color: "#7C3AED" },
];

export const MONTHLY_PROGRESS = [
  { month: "Jan", tables: 45, views: 12, procs: 8 },
  { month: "Feb", tables: 78, views: 23, procs: 15 },
  { month: "Mar", tables: 95, views: 31, procs: 22 },
  { month: "Apr", tables: 112, views: 38, procs: 28 },
  { month: "May", tables: 134, views: 45, procs: 35 },
  { month: "Jun", tables: 156, views: 52, procs: 41 },
];

export const DOC_CARDS = [
  {
    title: "Schema Documentation",
    desc: "Auto-generated ERD diagrams and table relationship maps for all 1,247 migrated objects.",
    icon: "🗄️",
    count: "1,247 objects",
  },
  {
    title: "Transformation Log",
    desc: "Complete audit trail of every SQL dialect conversion with before/after comparisons.",
    icon: "📋",
    count: "18,432 changes",
  },
  {
    title: "Performance Report",
    desc: "Query execution benchmarks showing 84% average improvement post-migration.",
    icon: "📊",
    count: "84% faster",
  },
  {
    title: "Data Lineage",
    desc: "End-to-end data lineage tracking from Teradata source to Snowflake destination.",
    icon: "🔗",
    count: "Full lineage",
  },
  {
    title: "Validation Results",
    desc: "Row-count and checksum validation results confirming data integrity post-migration.",
    icon: "✅",
    count: "99.98% accuracy",
  },
  {
    title: "Runbook",
    desc: "Auto-generated operational runbook for day-2 operations in the Snowflake environment.",
    icon: "📖",
    count: "247 pages",
  },
];
