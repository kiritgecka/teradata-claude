"use client";

import { useState, useRef } from "react";
import { clsx } from "clsx";
import {
  Copy, Check, AlertCircle, CheckCircle2,
  UploadCloud, FileCheck, X, ChevronDown,
} from "lucide-react";
import { ConversionStatus } from "@/types";
import { DEFAULT_TERADATA_SQL, SUPPORTED_SYSTEMS, STORAGE_TYPES } from "@/lib/sql-prompts";
import SqlEditor from "./SqlEditor";
import ConvertButton from "./ConvertButton";

interface UploadedFile {
  name: string;
  size: string;
}

function formatFileSize(bytes: number): string {
  if (bytes >= 1_048_576) return `${(bytes / 1_048_576).toFixed(1)} MB`;
  if (bytes >= 1_024) return `${(bytes / 1_024).toFixed(0)} KB`;
  return `${bytes} B`;
}

const ACCEPTED_EXTENSIONS = [".csv", ".json", ".parquet", ".xlsx"];

function getFileInfo(file: File): UploadedFile | null {
  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  if (!ACCEPTED_EXTENSIONS.includes(ext)) return null;
  return { name: file.name, size: formatFileSize(file.size) };
}

export default function SqlConverterPanel() {
  const [teradataSQL, setTeradataSQL] = useState(DEFAULT_TERADATA_SQL);
  const [snowflakeSQL, setSnowflakeSQL] = useState("");
  const [status, setStatus] = useState<ConversionStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const [sourceSystem, setSourceSystem] = useState("Teradata");
  const [targetSystem, setTargetSystem] = useState("Snowflake");
  const [storageType, setStorageType] = useState("Cloud Data Warehouse");
  const [targetStorageType, setTargetStorageType] = useState("Cloud Data Warehouse");

  const [rawFile, setRawFile] = useState<UploadedFile | null>(null);
  const [rawDragOver, setRawDragOver] = useState(false);
  const [validationFile, setValidationFile] = useState<UploadedFile | null>(null);
  const [validationDragOver, setValidationDragOver] = useState(false);

  const rawFileInputRef = useRef<HTMLInputElement>(null);
  const validationFileInputRef = useRef<HTMLInputElement>(null);

  function handleFileDrop(
    e: React.DragEvent,
    setter: (f: UploadedFile) => void,
    setDragOver: (v: boolean) => void
  ) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const info = getFileInfo(file);
    if (info) setter(info);
  }

  function handleFileInput(
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (f: UploadedFile) => void
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    const info = getFileInfo(file);
    if (info) setter(info);
  }

  async function handleConvert() {
    if (!teradataSQL.trim()) return;
    setStatus("loading");
    setSnowflakeSQL("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/convert-sql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teradata_sql: teradataSQL,
          source_system: sourceSystem,
          target_system: targetSystem,
        }),
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

  const sourceDialect = sourceSystem.split("/")[0].toUpperCase();
  const targetDialect = targetSystem.split("/")[0].toUpperCase();

  return (
    <div className="h-screen flex flex-col p-6 gap-4 bg-brand-bg">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-display font-semibold uppercase tracking-widest text-brand-green border border-brand-green/30 bg-brand-green/10 px-2 py-0.5 rounded">
              Live Feature
            </span>
          </div>
          <h1 className="text-3xl font-display font-bold text-brand-text tracking-tight">
            SQL Converter
          </h1>
          <p className="text-base text-brand-muted mt-0.5">
            {sourceSystem} → {targetSystem} · Edit the left panel and click Convert
          </p>
        </div>

        <div className="flex items-center gap-3">
          {status === "success" && (
            <div className="flex items-center gap-1.5 text-brand-green text-sm font-display font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Conversion complete
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-1.5 text-brand-orange text-sm font-display font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errorMsg}
            </div>
          )}
          {snowflakeSQL && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-green/40 text-sm font-display font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40"
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

      {/* Config Section */}
      <div className="shrink-0 flex items-stretch gap-3 rounded-xl border border-brand-border bg-brand-surface px-4 py-3 shadow-card">

        {/* Left: System dropdowns */}
        <div className="flex items-end gap-3 flex-1">
          {/* Source System */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-display font-semibold uppercase tracking-widest text-brand-muted">Current System</span>
            <div className="relative">
              <select
                value={sourceSystem}
                onChange={(e) => setSourceSystem(e.target.value)}
                className="appearance-none bg-brand-elevated border border-brand-border rounded-lg px-3 py-2 pr-8 text-sm font-display text-brand-text cursor-pointer hover:border-brand-cyan/50 focus:outline-none focus:ring-1 focus:ring-brand-cyan/40 focus:border-brand-cyan/50 active:scale-[0.98] transition-colors duration-150"
              >
                {SUPPORTED_SYSTEMS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-brand-muted" />
            </div>
          </div>

          {/* Arrow */}
          <div className="pb-2 text-brand-muted font-mono text-sm select-none">→</div>

          {/* Target System */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-display font-semibold uppercase tracking-widest text-brand-muted">Migrate To</span>
            <div className="relative">
              <select
                value={targetSystem}
                onChange={(e) => setTargetSystem(e.target.value)}
                className="appearance-none bg-brand-elevated border border-brand-border rounded-lg px-3 py-2 pr-8 text-sm font-display text-brand-text cursor-pointer hover:border-brand-purple/50 focus:outline-none focus:ring-1 focus:ring-brand-purple/40 focus:border-brand-purple/50 active:scale-[0.98] transition-colors duration-150"
              >
                {SUPPORTED_SYSTEMS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-brand-muted" />
            </div>
          </div>

          {/* Storage Type */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-display font-semibold uppercase tracking-widest text-brand-muted">Storage Type</span>
            <div className="relative">
              <select
                value={storageType}
                onChange={(e) => setStorageType(e.target.value)}
                className="appearance-none bg-brand-elevated border border-brand-border rounded-lg px-3 py-2 pr-8 text-sm font-display text-brand-text cursor-pointer hover:border-brand-border/80 focus:outline-none focus:ring-1 focus:ring-brand-border focus:border-brand-muted/50 active:scale-[0.98] transition-colors duration-150"
              >
                {STORAGE_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-brand-muted" />
            </div>
          </div>

          {/* Arrow */}
          <div className="pb-2 text-brand-muted font-mono text-sm select-none">→</div>

          {/* Target Storage Type */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-display font-semibold uppercase tracking-widest text-brand-muted">Target Storage</span>
            <div className="relative">
              <select
                value={targetStorageType}
                onChange={(e) => setTargetStorageType(e.target.value)}
                className="appearance-none bg-brand-elevated border border-brand-border rounded-lg px-3 py-2 pr-8 text-sm font-display text-brand-text cursor-pointer hover:border-brand-purple/50 focus:outline-none focus:ring-1 focus:ring-brand-purple/40 focus:border-brand-purple/50 active:scale-[0.98] transition-colors duration-150"
              >
                {STORAGE_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-brand-muted" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px self-stretch bg-brand-border mx-1" />

        {/* Right: File uploads */}
        <div className="flex items-end gap-3">
          {/* Raw Data File */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-display font-semibold uppercase tracking-widest text-brand-muted">Raw Data File</span>
            {rawFile ? (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-brand-green/30 bg-brand-green/5 min-w-[150px]">
                <FileCheck className="w-3.5 h-3.5 text-brand-green shrink-0" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs font-display font-medium text-brand-text truncate max-w-[110px]">{rawFile.name}</span>
                  <span className="text-xs font-display text-brand-muted">{rawFile.size}</span>
                </div>
                <button
                  onClick={() => {
                    if (rawFileInputRef.current) rawFileInputRef.current.value = "";
                    setRawFile(null);
                  }}
                  className="text-brand-muted hover:text-brand-text transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-border rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div
                role="button"
                tabIndex={0}
                onDragOver={(e) => { e.preventDefault(); setRawDragOver(true); }}
                onDragLeave={() => setRawDragOver(false)}
                onDrop={(e) => handleFileDrop(e, setRawFile, setRawDragOver)}
                onClick={() => rawFileInputRef.current?.click()}
                onKeyDown={(e) => e.key === "Enter" && rawFileInputRef.current?.click()}
                className={clsx(
                  "flex flex-col items-center justify-center gap-1 rounded-lg border border-dashed cursor-pointer min-w-[150px]",
                  "px-4 py-2.5 text-center transition-colors duration-150",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-green/40",
                  rawDragOver
                    ? "border-brand-green/60 bg-brand-green/5"
                    : "border-brand-border hover:border-brand-muted/50 hover:bg-brand-elevated/60"
                )}
              >
                <UploadCloud className="w-4 h-4 text-brand-muted" />
                <span className="text-xs font-display font-medium text-brand-muted">Drop or click</span>
                <span className="text-xs font-display text-brand-muted/80">CSV · JSON · Parquet · XLSX</span>
              </div>
            )}
            <input
              ref={rawFileInputRef}
              type="file"
              accept=".csv,.json,.parquet,.xlsx"
              className="hidden"
              onChange={(e) => handleFileInput(e, setRawFile)}
            />
          </div>

          {/* Validation File */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-display font-semibold uppercase tracking-widest text-brand-muted">Sample Data Storage</span>
            {validationFile ? (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-brand-cyan/30 bg-brand-cyan/5 min-w-[150px]">
                <FileCheck className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs font-display font-medium text-brand-text truncate max-w-[110px]">{validationFile.name}</span>
                  <span className="text-xs font-display text-brand-muted">{validationFile.size}</span>
                </div>
                <button
                  onClick={() => {
                    if (validationFileInputRef.current) validationFileInputRef.current.value = "";
                    setValidationFile(null);
                  }}
                  className="text-brand-muted hover:text-brand-text transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-border rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div
                role="button"
                tabIndex={0}
                onDragOver={(e) => { e.preventDefault(); setValidationDragOver(true); }}
                onDragLeave={() => setValidationDragOver(false)}
                onDrop={(e) => handleFileDrop(e, setValidationFile, setValidationDragOver)}
                onClick={() => validationFileInputRef.current?.click()}
                onKeyDown={(e) => e.key === "Enter" && validationFileInputRef.current?.click()}
                className={clsx(
                  "flex flex-col items-center justify-center gap-1 rounded-lg border border-dashed cursor-pointer min-w-[150px]",
                  "px-4 py-2.5 text-center transition-colors duration-150",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-cyan/40",
                  validationDragOver
                    ? "border-brand-cyan/60 bg-brand-cyan/5"
                    : "border-brand-border hover:border-brand-muted/50 hover:bg-brand-elevated/60"
                )}
              >
                <UploadCloud className="w-4 h-4 text-brand-muted" />
                <span className="text-xs font-display font-medium text-brand-muted">Drop or click</span>
                <span className="text-xs font-display text-brand-muted/80">CSV · JSON · Parquet · XLSX</span>
              </div>
            )}
            <input
              ref={validationFileInputRef}
              type="file"
              accept=".csv,.json,.parquet,.xlsx"
              className="hidden"
              onChange={(e) => handleFileInput(e, setValidationFile)}
            />
          </div>
        </div>
      </div>

      {/* Editors */}
      <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
        <SqlEditor
          label={`${sourceSystem} SQL`}
          dialect={sourceDialect}
          value={teradataSQL}
          onChange={setTeradataSQL}
        />
        <SqlEditor
          label={`${targetSystem} SQL`}
          dialect={targetDialect}
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
