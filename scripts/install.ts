#!/usr/bin/env bun
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dir, "..");
const DEXTER_DIR = resolve(ROOT, "dexter");
const VERSION_FILE = resolve(ROOT, ".dexter-version");
const REPO_URL = "https://github.com/virattt/dexter.git";

function log(msg: string): void {
  console.log(`[install] ${msg}`);
}

function fail(msg: string): never {
  console.error(`[install] ERROR: ${msg}`);
  process.exit(1);
}

async function run(cmd: string[], cwd: string): Promise<void> {
  const proc = Bun.spawn(cmd, {
    cwd,
    stdout: "inherit",
    stderr: "inherit",
  });
  const code = await proc.exited;
  if (code !== 0) {
    fail(`command failed (${code}): ${cmd.join(" ")} (cwd=${cwd})`);
  }
}

async function capture(cmd: string[], cwd: string): Promise<string> {
  const proc = Bun.spawn(cmd, {
    cwd,
    stdout: "pipe",
    stderr: "pipe",
  });
  const out = await new Response(proc.stdout).text();
  const code = await proc.exited;
  if (code !== 0) {
    fail(`command failed (${code}): ${cmd.join(" ")} (cwd=${cwd})`);
  }
  return out.trim();
}

async function readPinnedSha(): Promise<string> {
  if (!existsSync(VERSION_FILE)) {
    fail(`.dexter-version not found at ${VERSION_FILE}`);
  }
  const raw = await readFile(VERSION_FILE, "utf8");
  const sha = raw.trim().split(/\s+/)[0];
  if (!sha || !/^[0-9a-f]{7,40}$/i.test(sha)) {
    fail(`.dexter-version does not contain a valid commit SHA: "${raw}"`);
  }
  return sha;
}

async function ensureCheckout(pinnedSha: string): Promise<boolean> {
  if (!existsSync(DEXTER_DIR)) {
    log(`cloning ${REPO_URL} into ./dexter/`);
    await run(["git", "clone", REPO_URL, "dexter"], ROOT);
    log(`checking out ${pinnedSha}`);
    await run(["git", "fetch", "origin"], DEXTER_DIR);
    await run(["git", "checkout", pinnedSha], DEXTER_DIR);
    return true;
  }

  const currentSha = await capture(["git", "rev-parse", "HEAD"], DEXTER_DIR);
  if (currentSha.startsWith(pinnedSha) || pinnedSha.startsWith(currentSha)) {
    log(`./dexter/ already at pinned SHA ${pinnedSha.slice(0, 12)}`);
    return false;
  }

  log(`./dexter/ at ${currentSha.slice(0, 12)}, repinning to ${pinnedSha.slice(0, 12)}`);
  await run(["git", "fetch", "origin"], DEXTER_DIR);
  await run(["git", "checkout", pinnedSha], DEXTER_DIR);
  return true;
}

async function main(): Promise<void> {
  const pinnedSha = await readPinnedSha();
  log(`pinned Dexter SHA: ${pinnedSha}`);

  const checkoutChanged = await ensureCheckout(pinnedSha);

  // Always run bun install — cheap if lockfile is unchanged.
  log("running `bun install` inside ./dexter/");
  await run(["bun", "install"], DEXTER_DIR);

  const entry = resolve(DEXTER_DIR, "src/index.tsx");
  if (!existsSync(entry)) {
    fail(`Dexter entry point missing: ${entry}`);
  }

  log(`Dexter ready at ${DEXTER_DIR}${checkoutChanged ? " (updated)" : ""}`);
  console.log("");
  console.log("Next steps:");
  console.log("  1. cp .env.example .env");
  console.log("  2. Fill in required keys (FINANCIAL_DATASETS_API_KEY + one LLM key + one web-search key)");
  console.log("  3. bun run analyze");
}

await main();
