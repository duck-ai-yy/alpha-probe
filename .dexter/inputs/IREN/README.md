# IREN Backtest Fixture

## Background

On 2026-05-08, NVIDIA announced an approximately $2.1B investment in Iris Energy (IREN). Unusual call buying preceded the announcement starting in late April 2026. This directory holds inputs for replaying that analysis with an `as_of_date` of 2026-04-25, testing whether the `major-partnership-insider` skill would have surfaced the right signal cluster from publicly observable information available BEFORE the announcement.

The point of the backtest is not to reach 100% certainty (the rubric forbids that) but to confirm the skill, when run against pre-announcement public data plus a credible options-flow paste, produces a probability in the strong-convergence band (>=65%), correctly names the counterparty category (hyperscaler or chip vendor), and lands an announcement window covering the actual 2026-05-08 date.

## Files expected in this directory

- `options.md` - REQUIRED. User-pasted options activity per `.dexter/skills/major-partnership-insider/options-input-template.md`. This file is intentionally NOT committed by default. Populate it from your own data source (Schwab/IBKR export, Unusual Whales screenshot, CBOE delayed quotes). The skill will treat its contents as "user-provided" in the Source Hygiene section.
- `context.md` - OPTIONAL. Free-form notes the agent can `read_file`. Use for things like "skip earnings if before as_of_date" or "ignore the May 1 IR page since it postdates the cutoff."

Other files in this directory are ignored by the skill unless referenced explicitly in the prompt.

## Data source guidance

For each path, the practical way to obtain IREN's late-April 2026 options activity:

- Broker option-chain history export. If you have a Schwab, IBKR, or Tastytrade account with margin and option permissions, pull the historical chain for IREN with as-of dates 2026-04-22 through 2026-04-30. Schwab's thinkorswim historical thinkBack data goes back several years for most listed names. Export the chain or transcribe the unusual prints manually into the template.
- Unusual Whales. The paid tier has historical unusual flow with filterable dates and side/sweep classification. The free tier shows only current day. Cite the URL of the flow filter in the pasted file.
- CBOE LiveVol or DataShop. Paid; institutional-grade historical option data with full OPRA tick history. Appropriate if you have a research subscription.
- Polygon.io options endpoint. $79/mo unlocks historical OPRA data via REST. Suitable for scripted exports if you want to automate paste generation.
- Manual transcription from a screenshot. Acceptable for backtest fidelity. In the pasted file, set Source to `"secondhand screenshot, [link to original]"` so the skill labels it user-provided with a known provenance gap.

Whatever the source, the pasted file must contain at minimum: date/time, contract symbol, strike, expiry, call/put, side (buy/sell/sweep), size, premium, OI, IV, spot at trade, and source. Missing any of those fields downgrades the Derivatives layer score.

## How to run the backtest

```
# 1. Populate options data
$EDITOR .dexter/inputs/IREN/options.md

# 2. From alpha-probe directory, start Dexter
bun run analyze

# 3. Prompt:
"Run major-partnership-insider for IREN, as_of_date 2026-04-25.
 Suspected event: hyperscaler GPU anchor-tenant or strategic chip-maker investment.
 Pre-loaded options data at .dexter/inputs/IREN/options.md."
```

## Pass criteria

- [ ] Skill triggered (Dexter logs show the `skill` tool call with `skill: "major-partnership-insider"`).
- [ ] Each of the 8 workflow steps executed at least one tool call.
- [ ] Step 2 (Derivatives Forensics) used the pasted `options.md` contents, not generic statements about "unusual call buying."
- [ ] Final overall probability is at least 65% (Bobby's "strong multi-source convergence" band).
- [ ] Expected counterparty category names hyperscaler or chip company (NVIDIA, AMD, or a named hyperscaler is the correct answer; "hyperscaler / chip vendor" is acceptable).
- [ ] Expected announcement window covers 2026-05-08. A 2-6 week range that contains 2026-05-08 passes.
- [ ] Report includes all six Standard Report Format sections: Executive Verdict, Evidence Matrix, Derivatives Read, Corporate And Operational Read, Scenario Map, Source Hygiene.
- [ ] Report does NOT claim 100% probability anywhere.
- [ ] Source Hygiene section correctly labels the options data as "user-provided," not "observed."
- [ ] Final disclaimer is present verbatim: "This is probabilistic research based on public/user-provided information and is not investment advice."

A run that hits 65-79% with the correct counterparty category and announcement window is a clean pass. A run at 50-64% is a partial pass and suggests the operational or institutional layer was under-researched; review which tool calls returned thin output. A run above 80% should be inspected for fabricated specificity.

## Known signals from public info available pre-2026-05-08

For calibration only. The agent must find these itself during the run. Do NOT pre-load these into the prompt; that defeats the backtest.

- IREN's ongoing pivot from BTC mining to AI compute, observable from 10-Q language and IR commentary across late 2025 and Q1 2026.
- Capacity expansion announcements at the Childress, Texas site, public via prior earnings calls and press releases.
- NVIDIA and broader hyperscaler ecosystem language in IREN press releases through Q1 2026, including references to GPU cloud, AI compute customers, and reference architectures.
- Form 4 patterns from insiders in the weeks preceding the announcement.
- Hiring posts for solutions engineering, GPU operations, and enterprise sales roles on IREN's careers page.
- Power-interconnect and substation buildout disclosures consistent with anchor-tenant readiness.
- Specific filings worth pulling: most recent 8-K filings before 2026-04-25, the most recent 10-Q available before the cutoff, and the latest 10-K.
- Peer comps: CRWV anchor customer signings, CORZ hyperscaler leases, APLD HPC contract announcements - all observable from public press in late 2025 and early 2026.

If the agent finds materially more or fewer signals than this list suggests, that is itself informative. Over-finding may indicate hallucination; under-finding may indicate tool failure or insufficient persistence across the workflow's 8 steps.
