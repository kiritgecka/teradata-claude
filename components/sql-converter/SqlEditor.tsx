"use client";

import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface SqlEditorProps {
  value: string;
  onChange: (val: string) => void;
  label: string;
  dialect: string;
  readOnly?: boolean;
  placeholder?: string;
}

export default function SqlEditor({
  value,
  onChange,
  label,
  dialect,
  readOnly = false,
}: SqlEditorProps) {
  return (
    <div className="flex flex-col h-full border border-brand-border rounded-xl overflow-hidden bg-brand-surface">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-brand-border bg-brand-elevated shrink-0">
        <span className="text-xs font-display font-semibold text-brand-text">{label}</span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-brand-border text-brand-muted">
          {dialect}
        </span>
      </div>

      {/* Editor */}
      <div className="flex-1 min-h-0">
        <MonacoEditor
          height="100%"
          language="sql"
          theme="vs-dark"
          value={value}
          onChange={(v) => !readOnly && onChange(v ?? "")}
          options={{
            readOnly,
            fontSize: 13,
            fontFamily: "JetBrains Mono, monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers: "on",
            wordWrap: "on",
            padding: { top: 12, bottom: 12 },
            renderLineHighlight: "none",
            scrollbar: {
              vertical: "auto",
              horizontal: "auto",
            },
            overviewRulerBorder: false,
            hideCursorInOverviewRuler: true,
          }}
        />
      </div>
    </div>
  );
}
