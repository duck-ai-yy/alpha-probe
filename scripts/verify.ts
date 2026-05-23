#!/usr/bin/env bun
/**
 * Verify that Dexter's skill loader discovers the major-partnership-insider
 * skill from this workspace's .dexter/skills/ directory.
 *
 * Runs `discoverSkills()` and `getSkill('major-partnership-insider')` against
 * the vendored Dexter at ./dexter, with CWD = alpha-probe root (matching how
 * `bun run analyze` launches it).
 *
 * Exits 0 on full pass, 1 on any failure.
 */

import { existsSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dir, "..");
const DEXTER_DIR = resolve(ROOT, "dexter");

function fail(msg: string): never {
  console.error(`[verify] FAIL: ${msg}`);
  process.exit(1);
}

function pass(msg: string): void {
  console.log(`[verify] PASS: ${msg}`);
}

if (!existsSync(DEXTER_DIR)) {
  fail("./dexter not installed. Run `bun run install:dexter` first.");
}

// Dynamic import so we resolve relative to dexter/, not alpha-probe/.
const registryPath = resolve(DEXTER_DIR, "src/skills/registry.ts");
if (!existsSync(registryPath)) {
  fail(`Dexter skill registry not found at ${registryPath}`);
}

// Confirm CWD is the alpha-probe root (Dexter scans process.cwd()/.dexter/skills/).
if (process.cwd() !== ROOT) {
  fail(`CWD must be alpha-probe root. Got ${process.cwd()}, expected ${ROOT}`);
}
pass(`CWD is alpha-probe root: ${ROOT}`);

const { discoverSkills, getSkill } = (await import(registryPath)) as {
  discoverSkills: () => Array<{
    name: string;
    description: string;
    source: string;
    path: string;
  }>;
  getSkill: (name: string) => {
    name: string;
    description: string;
    instructions: string;
    path: string;
    source: string;
  } | undefined;
};

const skills = discoverSkills();
pass(`discoverSkills() returned ${skills.length} skill(s)`);

for (const s of skills) {
  console.log(`        - ${s.name} (${s.source}) :: ${s.path}`);
}

const target = "major-partnership-insider";
const meta = skills.find((s) => s.name === target);
if (!meta) {
  fail(`Skill "${target}" was not discovered.`);
}
if (meta.source !== "project") {
  fail(`Skill "${target}" should be source=project, got source=${meta.source}`);
}
pass(`Skill "${target}" discovered as project skill`);

const skill = getSkill(target);
if (!skill) {
  fail(`getSkill("${target}") returned undefined`);
}

const required = [
  "## Purpose",
  "## Workflow Checklist",
  "## Step 1: Establish The Base Thesis",
  "## Step 2: Derivatives Forensics",
  "## Step 8: Probability Scoring",
  "## Standard Report Format",
  "Never output 100%",
  "not investment advice",
];
const missing = required.filter((s) => !skill.instructions.includes(s));
if (missing.length > 0) {
  fail(`SKILL.md missing required passages: ${missing.join(" | ")}`);
}
pass(`SKILL.md contains all required passages`);

// Helper files referenced by SKILL.md.
const skillDir = resolve(ROOT, ".dexter/skills/major-partnership-insider");
const helpers = ["ai-infra-signals.md", "options-input-template.md"];
for (const h of helpers) {
  if (!existsSync(resolve(skillDir, h))) {
    fail(`Helper file missing: ${h}`);
  }
}
pass(`Helper files present: ${helpers.join(", ")}`);

// RULES.md is also injected into the system prompt.
const rulesPath = resolve(ROOT, ".dexter/RULES.md");
if (!existsSync(rulesPath)) {
  fail(`.dexter/RULES.md missing`);
}
pass(`.dexter/RULES.md present`);

// IREN fixture spec.
const irenReadme = resolve(ROOT, ".dexter/inputs/IREN/README.md");
if (!existsSync(irenReadme)) {
  fail(`.dexter/inputs/IREN/README.md missing`);
}
pass(`.dexter/inputs/IREN/README.md present`);

// What the LLM will see in the system prompt.
const { buildSkillMetadataSection } = (await import(registryPath)) as {
  buildSkillMetadataSection: () => string;
};
const skillSection = buildSkillMetadataSection();
if (!skillSection.includes("major-partnership-insider")) {
  fail(`buildSkillMetadataSection() output does not list major-partnership-insider`);
}
pass(`System-prompt skill list includes major-partnership-insider`);

// What the agent receives when it calls the `skill` tool.
const skillToolPath = resolve(DEXTER_DIR, "src/tools/skill.ts");
const { skillTool } = (await import(skillToolPath)) as {
  skillTool: { invoke: (args: { skill: string; args?: string }) => Promise<string> };
};
const toolOutput = await skillTool.invoke({
  skill: "major-partnership-insider",
  args: "IREN",
});
if (typeof toolOutput !== "string" || !toolOutput.includes("Major Partnership Insider")) {
  fail(`skillTool.invoke() did not return expected instructions`);
}
if (!toolOutput.includes("**Arguments provided:** IREN")) {
  fail(`skillTool.invoke() did not echo args back`);
}
// Helper-link resolution: relative `[ai-infra-signals](ai-infra-signals.md)`
// should be rewritten to an absolute path so the agent's `read_file` can find it.
const absHelper = resolve(skillDir, "ai-infra-signals.md");
if (!toolOutput.includes(absHelper)) {
  fail(`skillTool.invoke() did not resolve ai-infra-signals.md to an absolute path`);
}
pass(`skillTool returns instructions with absolute helper paths`);

console.log("");
console.log("[verify] All checks passed. The integration is wired up correctly.");
console.log("[verify] To run the agent end-to-end:");
console.log("[verify]   1. cp .env.example .env  (then fill keys)");
console.log("[verify]   2. bun run analyze");
process.exit(0);
