# Options Input Template

## Purpose

Dexter has no options API. To run Bobby's Step 2 (Derivatives Forensics) for a target ticker, paste recent unusual options activity into `.dexter/inputs/{ticker}/options.md` using the format defined below. The agent reads both this template (for parsing rules and column semantics) and the user's pasted file (for the actual data) during Step 2. Without a populated options.md, Step 2 must mark NO DATA and the overall probability is capped at 60 percent regardless of how strong the other layers look.

## Where To Get The Data (Free Or Cheap)

In rough order of accuracy and trust:

- Broker option-chain export from TD, Schwab, IBKR, or Tastytrade. Most accurate, includes greeks if subscribed.
- Unusual Whales free tier. Limited daily quota but real exchange data.
- CBOE delayed quotes. Free, end-of-day, no greeks.
- Barchart unusual options activity. Delayed, accessible without a paid plan.
- X or StockTwits screenshots from accounts that publish flow. Secondhand, lower trust; record the source handle and date.
- WSJ or Bloomberg options-volume tables. Delayed, summary-only.

Always record the source string verbatim in the As-of header so the agent can weight trust appropriately.

## Required Format

Paste the following blocks into `.dexter/inputs/{ticker}/options.md`. Replace placeholder values. Keep the markdown table headers exactly as shown so the parser can locate the columns.

```markdown
## {TICKER} Options Activity

**As-of date:** YYYY-MM-DD
**Source:** [name source, e.g. "Schwab option chain export, EOD 2026-04-25"]
**Spot price at time of observation:** $X.XX

### Unusual trades

| Date | Time | C/P | Strike | Expiry | Side | Volume | OI | Premium ($) | IV | Spot | Notes |
|------|------|-----|--------|--------|------|--------|------|-------------|-----|------|-------|
| 2026-04-22 | 10:34 ET | C | 12 | 2026-07-17 | Buy | 5000 | 800 | 1.20 | 95% | 9.10 | Aggressive ask-side; 6.25x OI |
| 2026-04-22 | 13:02 ET | C | 14 | 2026-07-17 | Buy | 2200 | 150 | 0.55 | 102% | 9.18 | OTM, single sweep across 3 exchanges |
| 2026-04-23 | 09:48 ET | C | 12 | 2026-07-17 | Buy | 3800 | 5400 | 1.35 | 94% | 9.35 | Repeat day; building on prior OI |
| 2026-04-24 | 14:21 ET | C | 15 | 2026-08-21 | Buy | 1500 | 90 | 0.40 | 108% | 9.60 | Roll-up signal: higher strike, longer expiry |

### Open interest snapshot

**As-of:** YYYY-MM-DD

| Expiry | Strike | C/P | OI | Vol/OI | Notes |
|--------|--------|-----|-----|--------|-------|
| 2026-07-17 | 12 | C | 5800 | 0.86 | Largest call OI; potential wall |
| 2026-07-17 | 14 | C | 2400 | 0.92 | Secondary cluster |
| 2026-07-17 | 8  | P | 1100 | 0.20 | Modest put hedging |
| 2026-08-21 | 15 | C | 1600 | 0.94 | New cluster post-roll-up |

### Greeks / gamma surface (optional)

If broker provides: net gamma, max gamma strike, call wall, put wall.

- Net dealer gamma: short / long / approximately flat
- Max gamma strike: $X
- Call wall: $X
- Put wall: $X

### IV term structure (optional)

If front-month IV is meaningfully elevated versus back-month, note here. Include the spread in volatility points.

- Front-month ATM IV: XX%
- Back-month ATM IV: XX%
- Front-back spread: +X vol points (elevated front suggests near-term event pricing)
```

## What To Include

Bobby's Step 2 looks for specific patterns. Make sure the pasted data lets the agent see them.

- At least five to ten days of recent activity. Repeated buying across days is a stronger signal than a single isolated print.
- The largest single-day-volume call prints for each session.
- Any roll-up patterns: selling a lower-strike call and buying a higher-strike call on the same day or over consecutive days.
- Any roll-forward or time-compression patterns: closing later-dated calls in favor of nearer-dated calls.
- Open-interest clusters at upcoming expiries, especially those that bracket a known catalyst (earnings date, conference, fiscal year-end).
- Spot price reference at time of trade, so the agent can evaluate how far OTM the buyer was reaching.
- Premium paid in dollars, not just contract count or notional. Bobby scores by absolute premium size.
- Order type when known. Ask-side aggression (sweeps, lifting offers, multi-exchange routes) reads as informed; bid-side prints may be call selling and must not be miscounted as bullish.
- Source attribution per row when the source is mixed (for example, some rows from Schwab, some from Unusual Whales screenshots).

If a field is unknown, write `NA` rather than guessing. The agent will treat NA as missing rather than as zero.

## What The Agent Does With This Data

In Step 2 the agent calls `read_file` on this template (for the parsing schema and column semantics) and on `.dexter/inputs/{ticker}/options.md` (for the actual data). It then scores the derivatives layer against Bobby's strong, weak, and bearish evidence checklist:

- Counts persistent multi-day call buying, OTM aggression, and roll-up behavior as strong evidence.
- Treats small-premium, bid-side, or multi-leg-spread prints as weak or ambiguous evidence.
- Treats heavy put accumulation post-rally, IV crush, or call selling at resistance as bearish or hedging evidence.

In the final report's Source Hygiene section the agent must separate observed pasted data from inferred intent. Observed: contract-level facts copied verbatim from the input file. Inferred: directional interpretation, dealer-positioning guesses, and squeeze-zone calls derived from those facts.

## IREN Backtest Reference

See `.dexter/inputs/IREN/options.md` for the validation fixture covering the run-up to the 2026-05-08 Iris Energy / NVIDIA announcement. A separate agent populates that file; this template only references it by path so the schema and the fixture stay in sync.
