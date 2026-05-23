# alpha-probe

Event-driven AI-infrastructure research practice built on Dexter + the Bobby 4-layer evidence chain.

## What this is

alpha-probe wraps [Dexter](https://github.com/virattt/dexter) — an autonomous financial research agent — with a focused skill for detecting major partnership / anchor-tenant events before they are announced. The Bobby framework provides a 4-layer evidence chain (derivatives intent, institutional microstructure, operational front-running, timeline alignment) that Dexter executes as a project skill.

Zero changes to Dexter itself. Everything alpha-probe adds lives under `.dexter/` and is consumed by Dexter's existing skill loader at runtime.

## Quickstart

```
git clone <repo>
cd alpha-probe
cp .env.example .env       # fill in keys
bun install
bun run install:dexter     # clones Dexter at the pinned SHA into ./dexter/
bun run verify             # confirms the skill is discoverable end-to-end
bun run analyze
```

`bun run verify` exercises Dexter's `discoverSkills()`, `buildSkillMetadataSection()`, and `skillTool.invoke()` against the local `.dexter/` directory. All 9 checks must pass before running `analyze`.

## Architecture

- alpha-probe vendors Dexter at a pinned SHA (see `.dexter-version`) into `./dexter/`. The `dexter/` directory is gitignored.
- `.dexter/skills/major-partnership-insider/` is the Bobby framework adapted as a Dexter project skill.
- `.dexter/RULES.md` is injected into Dexter's system prompt and carries sector knowledge plus epistemic discipline (no probability theater, no fabricated numbers, evidence chains over conclusions).
- `.dexter/inputs/{ticker}/` is where the user pastes options flow. Dexter has no options API at any tier, so derivative signals must come in by hand.

`bun run analyze` launches Dexter with `process.cwd()` set to the alpha-probe root, so Dexter's skill registry (`dexter/src/skills/registry.ts`) finds `./.dexter/skills/`.

## The Bobby framework, briefly

1. **Derivatives intent.** User-pasted options flow: unusual call/put skew, large block prints, OI builds at specific strikes/expiries.
2. **Institutional microstructure.** 13F position changes, Form 4 insider transactions, 13D/13G crossings — sourced from SEC filings via Dexter.
3. **Operational front-running.** Capex commentary, job postings, permit filings, equipment procurement, datacenter site disclosures — sourced via web search.
4. **Timeline alignment.** Catalyst calendar (earnings, conferences, expiry stacks) lined up against the convergence of the above three layers.

A signal that fires in only one layer is noise. A signal that converges across three is worth a thesis.

## IREN backtest

IREN (Iris Energy) is the validation case — Bitcoin miner pivoting to AI/HPC compute, repeatedly subject to rumored hyperscaler anchor-tenant deals.

```
bun run backtest:iren
```

That prints a runbook. The full backtest setup lives at `.dexter/inputs/IREN/README.md`.

## What this does NOT do

- No options / derivatives data ingestion. The user must paste flow manually.
- No trading. No order execution. No broker integration.
- No price targets. No "AAPL goes to $X" output.
- No claims of 100% probability. Outputs are evidence chains, not predictions.

## Updating Dexter version

Edit `.dexter-version` to the new commit SHA, then:

```
bun run install:dexter
```

The install script is idempotent: it fetches, checks out the pinned SHA into the vendored `./dexter/`, and runs `bun install` inside it.
