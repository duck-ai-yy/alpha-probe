#!/usr/bin/env bun
import { chmodSync, existsSync, statSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dir, "..");
const DEXTER_ENTRY = resolve(ROOT, "dexter/src/index.tsx");
const ENV_FILE = resolve(ROOT, ".env");

const args = process.argv.slice(2);
const cleanBefore = args.includes("--clean");
const cleanAfter = args.includes("--clean") || args.includes("--clean-after");

if (!existsSync(DEXTER_ENTRY)) {
  console.error("Dexter is not installed. Run `bun run install:dexter` first.");
  process.exit(1);
}

if (!existsSync(ENV_FILE)) {
  console.error("No .env found. Copy `.env.example` to `.env` and fill required keys.");
  process.exit(1);
}

// Harden .env permissions to 600 (owner read/write only). Catches the common
// mistake of leaving it world-readable after a casual edit.
const envMode = statSync(ENV_FILE).mode & 0o777;
if (envMode !== 0o600) {
  console.warn(`[analyze] .env had mode ${envMode.toString(8)}; tightening to 600`);
  chmodSync(ENV_FILE, 0o600);
}

if (!process.env.FINANCIAL_DATASETS_API_KEY) {
  console.warn("");
  console.warn("WARNING: FINANCIAL_DATASETS_API_KEY is not set.");
  console.warn("Bobby Steps 1, 4, 6, 7 (institutional, insider, SEC, news) will fail.");
  console.warn("");
}

// Privacy preflight: any LLM provider beyond Anthropic widens the set of
// vendors that see your research. Dexter's memory subsystem prefers OpenAI
// then Google for embeddings — if those keys are set, embeddings of every
// turn ship there too. Warn loudly so the user opts in deliberately.
const extraLlmKeys = [
  "OPENAI_API_KEY",
  "GOOGLE_API_KEY",
  "XAI_API_KEY",
  "DEEPSEEK_API_KEY",
  "MOONSHOT_API_KEY",
  "OPENROUTER_API_KEY",
].filter((k) => process.env[k]);
if (extraLlmKeys.length > 0) {
  console.warn("");
  console.warn(`[privacy] Extra LLM keys set: ${extraLlmKeys.join(", ")}`);
  console.warn("[privacy] These providers will see your prompts / embeddings.");
  console.warn("[privacy] Unset them in .env if you want Anthropic-only.");
  console.warn("");
}

if (process.env.LANGSMITH_TRACING === "true") {
  console.warn("");
  console.warn("[privacy] LANGSMITH_TRACING=true — every LLM call ships to LangSmith.");
  console.warn("[privacy] Unset or set to false in .env to keep traces local.");
  console.warn("");
}

async function wipeTraces(label: string): Promise<void> {
  const cleanProc = Bun.spawn(["bun", "run", "scripts/clean-traces.ts"], {
    cwd: ROOT,
    stdout: "inherit",
    stderr: "inherit",
  });
  const ec = await cleanProc.exited;
  if (ec !== 0) {
    console.warn(`[analyze] ${label} clean exited with code ${ec}`);
  }
}

if (cleanBefore) {
  await wipeTraces("pre-run");
}

// CWD must remain alpha-probe root so Dexter's skill loader picks up ./.dexter/skills/.
const proc = Bun.spawn(["bun", "run", "dexter/src/index.tsx"], {
  cwd: ROOT,
  stdin: "inherit",
  stdout: "inherit",
  stderr: "inherit",
});

const code = await proc.exited;

if (cleanAfter) {
  await wipeTraces("post-run");
}

process.exit(code);
