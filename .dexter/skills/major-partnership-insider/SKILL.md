---
name: major-partnership-insider
description: Investigate potential major partnership / anchor-customer / M&A announcements for a public company in the next 30-120 days by cross-validating user-provided options flow with institutional filings (13F/Form 4), SEC disclosures (10-K/10-Q/8-K), operational signals (capex, hiring, permits, construction), and catalyst timeline. Use ONLY public or user-provided data. Output probability range, expected event type, announcement window, scenarios, and invalidation risks. Triggered by: "is X about to announce", "partnership probability for X", "event-driven analysis for X", "Bobby framework on X", "unusual options at X means what", or any request for forward-looking catalyst probability assessment on a specific ticker. Never outputs 100%. Never gives buy/sell instructions.
---

# Major Partnership Insider

## Purpose

Analyze whether a target public company is approaching a major strategic announcement by building a public-data evidence chain across four layers:

1. Derivatives intent: options flow, open interest, implied volatility, roll patterns, gamma/delta structure.
2. Institutional microstructure: 13F/13G/13D, activist pressure, market-maker accumulation, strategic holders.
3. Operational front-running: capex, construction, hiring, procurement, permits, customer-readiness.
4. Timeline alignment: expirations, earnings, conferences, fiscal deadlines, regulatory windows.

Do not present certainty. Do not give buy/sell instructions. Treat the result as investigative research and include invalidation risks.

## Workflow Checklist

Copy and track progress:

```
Major Partnership Insider Progress:
- [ ] Step 1: Establish the base thesis
- [ ] Step 2: Derivatives forensics (user-paste protocol)
- [ ] Step 3: Gamma, delta, and pinning analysis
- [ ] Step 4: Institutional microstructure
- [ ] Step 5: Operational front-running
- [ ] Step 6: SEC and dilution check
- [ ] Step 7: Timeline alignment
- [ ] Step 8: Probability scoring and report
```

## Required Inputs

From the user, collect:

- Target ticker (required).
- Suspected event type (required): partnership, anchor customer, master lease, JV, M&A, restructuring, divestiture, financing, regulatory approval.
- Optional: counterparty hypothesis, options screenshots, prior research links.

Everything else (price, market cap, sector, filings, news, holdings, insider activity, capex/hiring evidence, calendar) is researched in-skill via the tools below.

## Step 1: Establish The Base Thesis

OBJECTIVE: Lock down a falsifiable thesis with named mechanism before touching evidence.

1. Call `get_market_data` with query `"[TICKER] price snapshot and market cap"` to anchor scale.
2. Call `get_financials` with query `"[TICKER] company facts including sector and industry"` to set sector context.
3. State the thesis in one sentence covering:
   - Event type (partnership, anchor customer, master lease, JV, M&A, restructuring, divestiture, financing, regulatory approval).
   - Likely counterparty category (hyperscaler, chip company, cloud provider, strategic buyer, activist-backed operator, government, supplier).
   - Materiality mechanism (revenue, valuation multiple, asset monetization, balance-sheet reset, business identity change).

Reject vague theses. If the user has not named a mechanism, ask once, then proceed with the most specific reading of their request. A useful thesis must name the business mechanism.

## Step 2: Derivatives Forensics

OBJECTIVE: Determine whether options activity looks like informed directional positioning or normal volatility trading. Dexter has NO options data API. This step runs in user-paste mode.

1. Call `read_file` on `.dexter/inputs/[TICKER]/options.md`.
2. If that file does not exist or is empty, STOP and ask the user inline:
   > "I have no options data for [TICKER]. Either (a) paste flow into `.dexter/inputs/[TICKER]/options.md` using the format in [options-input-template](options-input-template.md), or (b) say 'skip derivatives' to proceed with the derivatives layer marked NO DATA."
3. If the user says "skip derivatives", mark the Derivatives layer as `NO DATA` in the final report and **cap the final probability at 60%** per the band rubric (missing derivatives forces the 50-64% band).
4. Do NOT silently skip. Do NOT fabricate options numbers. Do NOT estimate IV, gamma, or OI without source data.
5. If data is present, evaluate against Bobby's checklist:

Strong bullish evidence:

- Large premium, single-name, single-direction call buying.
- OTM calls bought aggressively despite high IV.
- Volume far above OI and average volume.
- Expiration covers a specific catalyst window with little wasted time.
- Repeated buying across days rather than one isolated print.
- Roll-up: selling lower strike calls to buy higher strike calls, implying a raised target.
- Time compression: rolling from later expiry to nearer expiry, implying event timing moved closer.
- Concentrated OI at catalyst expiry, especially paired with rising spot accumulation.

Weak or ambiguous evidence:

- Small premium relative to market cap.
- Bid-side prints that may be call selling.
- Multi-leg spreads with capped upside.
- Dealer hedging, index/ETF hedges, or sector beta trades.
- Calls bought during broad sector momentum without company-specific evidence.

Bearish or hedging evidence:

- Protective puts after a missed catalyst.
- Heavy call selling near resistance.
- Gamma pinning around call wall.
- IV crush after expected event passes.

6. Record contract-level facts in a table. Distinguish observed data from inferred intent.
7. Score the layer 0-5 based on size, direction, persistence, OTM aggression, and roll behavior.

## Step 3: Gamma, Delta, And Pinning Analysis

OBJECTIVE: Map the options surface to locate squeeze, pin, and invalidation zones.

1. Only run this step if Step 2 returned real user data. If Step 2 is NO DATA, mark this layer NO DATA and continue.
2. Using the pasted snapshot, identify:
   - Call wall, put wall, max gamma strikes, high OI strikes, and nearby expirations.
   - Whether market makers may need to buy stock as price approaches short-call strikes.
   - Squeeze potential vs pinning risk (separate them).
   - Whether gamma concentration migrates upward over time.
   - Wall ratcheting: call wall moving from lower to higher strike as informed buyers roll up.
3. If price repeatedly stalls at a call wall, treat it as resistance unless spot breaks it with volume.
4. Output:
   - Squeeze trigger zone.
   - Pinning zone.
   - Invalidation zone.
   - Expiry most connected to the suspected catalyst.

## Step 4: Institutional Microstructure

OBJECTIVE: Classify recent holder behavior as activator (catalyst-forcing) or validator (confirming) signals.

1. Call `get_market_data` with query `"[TICKER] institutional holdings last 4 quarters"` to pull 13F data.
2. Call `get_market_data` with query `"[TICKER] insider trades last 6 months"` to pull Form 4 activity.
3. Call `read_filings` with query `"[TICKER] most recent 8-K filings for activist or ownership disclosures"` (max 3 filings — pick the most recent 8-Ks).
4. Call `web_search` with query `"[TICKER] 13D OR 13G activist stake filing 2025 2026"` to catch activist entries the API may have missed.

Activator signals:

- Activist investor enters or expands stake.
- 13D language pressures management on strategy, asset monetization, capital allocation, sale, spin-off, customer signing.
- Board engagement, public letters, settlement agreements, or proxy pressure.

Validator signals:

- Quant/market-maker ownership jumps unusually.
- Multiple unrelated institutions accumulate in the same quarter.
- Market makers' spot holdings rise alongside large call OI, consistent with delta hedging.
- Strategic or sector-specialist funds appear.

Caution:

- 13F data is delayed.
- Quant funds often hold many names.
- Do not assume coordination. Use "independent signal convergence," not collusion, unless there is direct evidence.

5. Score the layer 0-5 based on activist pressure, unusual accumulation, and independent holder convergence.

## Step 5: Operational Front-Running

OBJECTIVE: Find real-world preparation that would be irrational without a likely deal.

1. Call `read_file` on `[ai-infra-signals](ai-infra-signals.md)` to load the sector adaptor table before scoring (if the ticker is in AI/data-center infrastructure; otherwise reference for query pattern style).
2. Call `web_search` with these queries in order, harvesting concrete dated evidence:
   - `"[TICKER] capex announcement 2025 2026"`
   - `"[TICKER] construction OR groundbreaking OR datacenter OR facility 2025"`
   - `"[TICKER] permit OR interconnect OR substation OR transformer order"`
   - `"[TICKER] solutions engineer OR enterprise sales OR procurement OR security clearance hiring"`
   - `"[TICKER] pilot OR proof of concept OR design partner"`
3. Call `web_fetch` on the company's careers page and press-release page to pull current job listings and announcements as static markdown.
4. Use `browser` only if `web_fetch` returns blocked/JS-only content — prefer `web_fetch` first.
5. Call `x_search` with query `"$[TICKER] (hiring OR construction OR capex OR permit) has:links"` and `"$[TICKER] from:CEO_HANDLE OR from:IR_HANDLE"` (substitute real handles when known) to surface operational chatter.
6. Look for these strong signals:
   - Speculative build: major construction or capex before official customer announcement.
   - Core-and-shell or capacity buildout without named tenant.
   - Long-lead equipment procurement: transformers, GPUs, chillers, power gear, aircraft, vessels, fabs, industrial tooling.
   - Hiring for solutions engineering, technical pre-sales, enterprise sales, procurement, compliance, delivery, account management.
   - Basis of design, certification, permitting, interconnect approval, customer due diligence, or pilot deployment language.
   - Management repeatedly discusses a new customer class or business model before signing a named deal.
7. Apply sector adaptors:
   - Data centers: MW capacity, power interconnect, Tier standard, cooling, anchor tenant, lease term.
   - Biotech: trial enrollment, FDA meetings, CMC readiness, manufacturing slots.
   - Defense: hiring cleared staff, facility security, budget line items, OTA/prototype awards.
   - Energy: permits, grid queue, offtake, equipment deposits.
   - SaaS/AI: enterprise pre-sales, solution architects, procurement/security roles, usage spikes, partner certifications.
8. Score the layer 0-5 based on capex, hiring, procurement, permits, and delivery readiness.

## Step 6: SEC And Dilution Check

OBJECTIVE: Surface filings that could invalidate a high-probability read.

1. Call `read_filings` with query `"[TICKER] latest 8-K material agreements, latest 10-Q risk factors and liquidity, latest 10-K customer concentration and going concern"` — budget exactly 3 filings: the most recent 8-K, the latest 10-Q, and the latest 10-K. Do not exceed 3.
2. Call `get_market_data` with query `"[TICKER] insider trades last 90 days with transaction codes"` to confirm selling pattern from Step 4 and pick up code-S/code-P breakdowns.
3. Call `web_search` with query `"[TICKER] S-3 OR 424B OR ATM OR shelf offering OR convertible 2025 2026"` for dilution events.
4. Scan for these invalidation signals:
   - 8-K material agreements (already announced — re-read the thesis).
   - S-3, 424B, ATM programs, convertibles, shelf offerings.
   - Form 4 insider selling cluster.
   - Risk factors mentioning customer concentration, financing needs, project delays.
   - Debt covenants, going-concern language, liquidity constraints.
5. Treat fresh ATM/equity offerings as a major risk unless proceeds are clearly tied to the suspected deal.
6. Score contradictions 0-5 (higher score = more contradictions, which will subtract in Step 8).

## Step 7: Timeline Alignment

OBJECTIVE: Verify at least two independent signals converge on the same 2-6 week window.

1. Call `get_market_data` with query `"[TICKER] company news last 60 days including upcoming events"` for scheduled catalysts.
2. Call `web_search` with these queries:
   - `"[TICKER] investor day 2026"`
   - `"[TICKER] earnings date next quarter"`
   - `"[TICKER] sector industry conference calendar 2026"`
   - `"[TICKER] product launch OR roadmap announcement 2026"`
3. Build a date grid covering:
   - Options trade dates (from Step 2 paste, if present).
   - Expiration dates (from Step 3, if present).
   - Earnings date.
   - Investor conference dates.
   - Industry event dates.
   - Fiscal quarter/year-end.
   - Project milestones.
   - Regulatory/permit deadlines.
   - Peer announcement cadence.
4. A strong setup has at least two independent signals pointing to the same 2-6 week window. Score the layer 0-5 based on expiry/catalyst fit, announcement window, and industry calendar.

## Step 8: Probability Scoring

OBJECTIVE: Combine layer scores into a defensible probability with shown math.

Score each module from 0-5:

- Derivatives: size, direction, persistence, OTM aggression, roll behavior.
- Institutional: activist pressure, unusual accumulation, independent holder convergence.
- Operational: capex, hiring, procurement, permits, delivery readiness.
- Timeline: expiry/catalyst fit, announcement window, industry calendar.
- Contradictions: dilution, insider selling, missed catalysts, macro/sector stress, customer delay.

Suggested probability bands:

- 80-90%: confirmed operational setup plus extreme derivatives and precise timeline, but no public announcement yet.
- 65-79%: strong multi-source convergence; one key uncertainty remains.
- 50-64%: plausible but missing either operational proof or derivatives confirmation.
- 30-49%: speculative; signals are mixed or mostly sector-driven.
- Below 30%: weak evidence or strong contradictions.

Never output 100%.

Print your math explicitly in this exact form before stating the final probability:

`Derivatives X/5 + Institutional Y/5 + Operational Z/5 + Timeline W/5 - Contradictions V/5 -> band -> probability%`

If the Derivatives layer is NO DATA, replace `X/5` with `NO DATA` and cap the final probability at 60%. Justify the chosen point within the band in one sentence.

## Standard Report Format

### Executive Verdict

- Overall probability:
- Expected event type:
- Likely counterparty category:
- Expected announcement window:
- Confidence level:
- Most important evidence:
- Biggest invalidation risk:

### Evidence Matrix

| Layer | Signal | Evidence | Strength | Interpretation |
|---|---|---|---|---|
| Derivatives |  |  |  |  |
| Institutions |  |  |  |  |
| Operations |  |  |  |  |
| Timeline |  |  |  |  |
| Risks |  |  |  |  |

### Derivatives Read

Include key trades, roll patterns, IV, OI, Vol/OI, gamma walls, squeeze zones, and pin zones.

### Corporate And Operational Read

Summarize filings, capex, hiring, project readiness, peer comps, and business-model implications.

### Scenario Map

- Bull case:
- Base case:
- Bear case:
- Invalidation triggers:
- What to monitor next:

### Source Hygiene

Separate:

- Observed public facts.
- User-provided screenshots/data.
- Analyst inference.
- Speculation.

End with: "This is probabilistic research based on public/user-provided information and is not investment advice."
