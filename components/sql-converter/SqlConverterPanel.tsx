"use client";

import { useState } from "react";
import { Copy, Check, AlertCircle, CheckCircle2 } from "lucide-react";
import { ConversionStatus } from "@/types";
import { DEFAULT_TERADATA_SQL } from "@/lib/sql-prompts";
import SqlEditor from "./SqlEditor";
import ConvertButton from "./ConvertButton";

export default function SqlConverterPanel() {
  const [teradataSQL, setTeradataSQL] = useState(DEFAULT_TERADATA_SQL);
  const [snowflakeSQL, setSnowflakeSQL] = useState("");
  const [status, setStatus] = useState<ConversionStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleConvert() {
    if (!teradataSQL.trim()) return;
    setStatus("loading");
    setSnowflakeSQL("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/convert-sql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teradata_sql: teradataSQL }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Conversion failed");
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let output = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        output += decoder.decode(value, { stream: true });
        setSnowflakeSQL(output);
      }

      setStatus("success");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "An error occurred");
      setStatus("error");
    }
  }

  async function handleCopy() {
    if (!snowflakeSQL) return;
    await navigator.clipboard.writeText(snowflakeSQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="h-screen flex flex-col p-6 gap-4 bg-brand-bg">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-brand-green border border-brand-green/30 bg-brand-green/10 px-2 py-0.5 rounded">
              Live Feature
            </span>
          </div>
          <h1 className="text-2xl font-display font-bold text-brand-text tracking-tight">
            SQL Converter
          </h1>
          <p className="text-sm text-brand-muted mt-0.5">
            Teradata → Snowflake via Claude AI · Edit the left panel and click Convert
          </p>
        </div>

        <div className="flex items-center gap-3">
          {status === "success" && (
            <div className="flex items-center gap-1.5 text-brand-green text-xs font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Conversion complete
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-1.5 text-brand-orange text-xs font-mono">
              <AlertCircle className="w-3.5 h-3.5" />
              {errorMsg}
            </div>
          )}
          {snowflakeSQL && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-green/40 text-xs font-mono transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-brand-green" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy SQL"}
            </button>
          )}
          <ConvertButton
            onClick={handleConvert}
            loading={status === "loading"}
            disabled={!teradataSQL.trim()}
          />
        </div>
      </div>

      {/* Editors */}
      <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
        <SqlEditor
          label="Teradata SQL"
          dialect="TERADATA"
          value={teradataSQL}
          onChange={setTeradataSQL}
        />
        <SqlEditor
          label="Snowflake SQL"
          dialect="SNOWFLAKE"
          value={
            status === "loading" && !snowflakeSQL
              ? "-- Converting..."
              : snowflakeSQL || "-- Converted SQL will appear here"
          }
          onChange={() => {}}
          readOnly
        />
      </div>
    </div>
  );
}
