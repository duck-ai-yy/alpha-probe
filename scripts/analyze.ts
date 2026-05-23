#!/usr/bin/env bun
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dir, "..");
const DEXTER_ENTRY = resolve(ROOT, "dexter/src/index.tsx");
const ENV_FILE = resolve(ROOT, ".env");

if (!existsSync(DEXTER_ENTRY)) {
  console.error("Dexter is not installed. Run `bun run install:dexter` first.");
  process.exit(1);
}

if (!existsSync(ENV_FILE)) {
  console.error("No .env found. Copy `.env.example` to `.env` and fill required keys.");
  process.exit(1);
}

// Bun auto-loads .env from cwd; assert the critical key is present.
if (!process.env.FINANCIAL_DATASETS_API_KEY) {
  console.warn("");
  console.warn("WARNING: FINANCIAL_DATASETS_API_KEY is not set.");
  console.warn("Bobby Steps 1, 4, 6, 7 (institutional, insider, SEC, news) will fail.");
  console.warn("");
}

// CWD must remain alpha-probe root so Dexter's skill loader picks up ./.dexter/skills/.
const proc = Bun.spawn(["bun", "run", "dexter/src/index.tsx"], {
  cwd: ROOT,
  stdin: "inherit",
  stdout: "inherit",
  stderr: "inherit",
});

const code = await proc.exited;
process.exit(code);
