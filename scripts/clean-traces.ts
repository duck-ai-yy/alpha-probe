#!/usr/bin/env bun
/**
 * Wipe local Dexter trace artifacts that accumulate research history.
 *
 * Removes:
 *   .dexter/memory/        ← SQLite + markdown of cross-session conversations
 *   .dexter/cache/         ← persisted large tool results
 *   .dexter/cron/          ← scheduled job definitions
 *   .dexter/HEARTBEAT.md   ← periodic checklist state
 *   .dexter/settings.json  ← model/provider preferences (incidental fingerprint)
 *
 * Does NOT touch:
 *   .dexter/RULES.md, .dexter/SOUL.md, .dexter/skills/      (config — alpha-probe owned)
 *   .dexter/inputs/                                          (user-pasted research inputs)
 *
 * Idempotent. Missing paths are a no-op.
 */
import { existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dir, "..");
const DEXTER_CONFIG = resolve(ROOT, ".dexter");

const targets = [
  "memory",
  "cache",
  "cron",
  "HEARTBEAT.md",
  "settings.json",
];

let wiped = 0;
for (const t of targets) {
  const p = resolve(DEXTER_CONFIG, t);
  if (existsSync(p)) {
    rmSync(p, { recursive: true, force: true });
    console.log(`[clean] removed ${p}`);
    wiped++;
  }
}

if (wiped === 0) {
  console.log("[clean] nothing to remove");
}
