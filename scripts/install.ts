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

async function run(
  cmd: string[],
  cwd: string,
  extraEnv?: Record<string, string>,
): Promise<void> {
  const proc = Bun.spawn(cmd, {
    cwd,
    stdout: "inherit",
    stderr: "inherit",
    env: extraEnv ? { ...process.env, ...extraEnv } : process.env,
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
  // Use --ignore-scripts to skip Dexter's `playwright install chromium`
  // postinstall: alpha-probe's skill prefers `web_fetch` over `browser` for
  // static pages, and the playwright CDN is blocked in some sandboxed
  // environments. Users who need JS-rendered pages can install Chromium
  // manually after install via `cd dexter && bunx playwright install chromium`.
  log("running `bun install` inside ./dexter/ (Playwright Chromium skipped)");
  await run(["bun", "install", "--ignore-scripts"], DEXTER_DIR);

  const entry = resolve(DEXTER_DIR, "src/index.tsx");
  if (!existsSync(entry)) {
    fail(`Dexter entry point missing: ${entry}`);
  }

  log(`Dexter ready at ${DEXTER_DIR}${checkoutChanged ? " (updated)" : ""}`);

  // Harden .env permissions if present.
  const envPath = resolve(ROOT, ".env");
  if (existsSync(envPath)) {
    const { chmodSync, statSync } = await import("node:fs");
    const mode = statSync(envPath).mode & 0o777;
    if (mode !== 0o600) {
      log(`tightening .env permissions ${mode.toString(8)} -> 600`);
      chmodSync(envPath, 0o600);
    }
  }

  console.log("");
  console.log("Next steps:");
  console.log("  1. cp .env.example .env  (then chmod 600 .env)");
  console.log("  2. Fill required keys: FINANCIAL_DATASETS_API_KEY, ANTHROPIC_API_KEY, one search key");
  console.log("  3. (recommended) Leave OPENAI_API_KEY and GOOGLE_API_KEY EMPTY to keep");
  console.log("     embeddings out of those providers' logs. analyze warns if they are set.");
  console.log("  4. bun run verify   (confirm 9/9 PASS)");
  console.log("  5. bun run analyze  (or: bun run analyze:clean to wipe traces after)");
}

await main();
