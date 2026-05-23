#!/usr/bin/env bun
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dir, "..");
const INPUTS_README = resolve(ROOT, ".dexter/inputs/IREN/README.md");

const help = `
IREN backtest — major-partnership-insider validation case
==========================================================

Situation:
  IREN (Iris Energy) is a Bitcoin miner pivoting to AI/HPC compute.
  Backtest target: detect insider/institutional signals ahead of a
  hyperscaler GPU anchor-tenant deal or strategic chip-maker investment.

Before running:
  1. Confirm .dexter/inputs/IREN/options.md is populated with options flow.
     Dexter has no options API — this must be pasted manually.
     See: ${INPUTS_README}

  2. Confirm .env has FINANCIAL_DATASETS_API_KEY and at least one web-search key.

To run:
  $ bun run analyze

Then paste this seed prompt into the Dexter CLI session:

  -----------------------------------------------------------
  Run major-partnership-insider for IREN, as_of_date 2026-04-25.
  Suspected event: hyperscaler GPU anchor-tenant or strategic chip-maker investment.
  Options data is pre-loaded at .dexter/inputs/IREN/options.md.
  -----------------------------------------------------------
`;

console.log(help);
process.exit(0);
