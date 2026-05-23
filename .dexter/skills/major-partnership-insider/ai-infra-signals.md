# AI Infrastructure Operational Signals

## Purpose

This file enumerates the operational signals that indicate an AI-infrastructure company is preparing to announce a major partnership, anchor tenant, or GPU supply deal. The agent reads this file before scoring Step 5 (Operational Front-Running) of the major-partnership-insider workflow. Bobby's SKILL.md gives generic sector adaptors for data centers, biotech, defense, energy, and SaaS or AI; this file expands the AI-infra-specific ones with concrete, searchable, sector-current detail covering HPC GPU cloud operators, hyperscaler-adjacent data center REITs, power utilities, accelerator and networking OEMs, and crypto-to-AI converters. Use it as both a checklist when surveying public sources and a calibration anchor when assigning the 0-5 operational score. Read it once at the start of every run for a target in this sector and re-check it whenever a new piece of evidence appears.

## Sector Taxonomy

The AI-infra universe splits into five archetypes. Each has a typical counterparty class and a typical deal structure. Use this taxonomy to anticipate what a "major partnership" announcement would actually look like for the target, and to reject any Step 1 thesis that does not name both the archetype and the counterparty class.

| Archetype | Representative tickers | Typical counterparty | Typical deal structure |
|-----------|------------------------|----------------------|------------------------|
| HPC and GPU cloud operators | CRWV (CoreWeave), NBIS (Nebius), APLD (Applied Digital), IREN (Iris Energy) | Hyperscaler (Microsoft, Google, AWS, Oracle), NVIDIA, sovereign cloud, frontier AI lab | Multi-year compute offtake, anchor-tenant lease, equity investment paired with GPU supply, prepaid capacity |
| Hyperscaler-adjacent data center REITs and colos | EQIX, DLR, IRM, CONE-style private peers | Hyperscaler, large enterprise, federal customer, GPU cloud operator | Long-term master lease, build-to-suit, powered-shell delivery, campus JV |
| Power and utilities adjacent | CEG (Constellation), VST (Vistra), TLN (Talen), NEE (NextEra) | Hyperscaler direct, GPU cloud operator, behind-the-meter customer | Behind-the-meter PPA, long-dated nuclear or gas offtake, equity in dedicated generation asset, co-located JV |
| GPU, accelerator, networking, and thermal OEMs | SMCI (Supermicro), VRT (Vertiv), ETN (Eaton), HPE | Hyperscaler, GPU cloud operator, NVIDIA reference partner | Multi-year supply framework, qualified reference architecture, large purchase order disclosed in 8-K, JV |
| Crypto-to-AI converters | IREN, APLD, HUT (Hut 8), WULF (TeraWulf), CORZ (Core Scientific) | NVIDIA, hyperscaler, neocloud, frontier lab | Site conversion plus GPU supply and customer anchor, GPU lease, equity plus compute offtake, hosting agreement |

Notes for the agent:

- HPC and GPU cloud operators are the most common source of explosive announcements because a single anchor tenant can change revenue identity overnight.
- Power names typically announce more slowly because of PPA negotiation, FERC docketing, and PUC approval, but the absolute dollar amounts are larger.
- OEMs often surface first inside someone else's press release; their own 10-Q customer-concentration disclosures and book-to-bill commentary leak ahead.
- Crypto-to-AI converters carry the highest re-rating potential because the business identity itself changes when an anchor tenant signs.

A useful Step 1 thesis names both the archetype and the counterparty class. Example: "IREN (crypto-to-AI converter) is preparing to announce an anchor tenant or supply deal with NVIDIA or a hyperscaler, monetizing its Childress Texas site." Reject theses that do not name a counterparty category.

## Strong Operational Signals (AI-Infra Specific)

Bulleted below by category. Treat any one of these as a strong signal only if observable from a primary public source: SEC filings, signed agreement exhibits, utility interconnect queues, careers pages, dated press releases, named executive quotes, or verifiable LinkedIn profile changes. Multiple categories converging is the real test.

### Power

- Announced incremental MW capacity additions, especially when the increment is unusually large relative to the company's prior footprint or larger than guided capex would support without contracted revenue.
- Newly signed interconnect agreements with the host utility or regional transmission organization (ERCOT, MISO, PJM, SPP, WECC). The interconnect study and LGIA filing are public.
- Behind-the-meter or co-located PPA filings with named generators or utilities, especially with nuclear (Constellation, Talen, Vistra) or large hydro counterparties.
- Substation upgrades, transformer deposits, or long-lead HV switchgear orders.
- Movement up the grid interconnect queue, especially MW reservations that get reclassified from "study" to "facilities study" or "interconnection agreement".
- Letters of intent or memoranda of understanding filed with state public utility commissions referencing data-center load.
- Announcement of energization milestones (first power, commercial operations date) without a named tenant.

### Site and real estate

- New facility groundbreaking with no named tenant, especially core-and-shell deliveries.
- Core-and-shell announcements, powered-shell delivery milestones, or first-power commissioning dates that predate a tenant disclosure.
- Lease or purchase of brownfield data centers, mothballed industrial facilities, or former crypto-mining sites with retained grid capacity.
- Real estate filings (deed transfers, ground lease recordings, county records, building permits, environmental impact assessments) in jurisdictions known for hyperscaler campuses: Northern Virginia, Phoenix, Columbus, Atlanta, Reno, Quincy WA, Council Bluffs IA, Childress TX, Abilene TX, Mt. Pleasant WI.
- Tier-rating certification announcements (Uptime Institute Tier III or IV) for unannounced facilities.
- Property-tax-abatement applications or local economic-development press tied to the target.
- Local news coverage of construction crews, traffic studies, or community meetings tied to the site.

### Equipment procurement

- GB200, GB300, or Blackwell rack orders, especially NVL72 references appearing in press releases, job descriptions, or analyst notes.
- Liquid-cooling system orders sized for AI-rack density: Vertiv CoolPhase or Liebert, JetCool, CoolIT, Motivair.
- Tier-rating certifications for high-density (greater than 50 kW per rack) deployments.
- Disclosed deposits or progress payments to NVIDIA, Supermicro, Dell, or HPE visible in cash-flow statements or working-capital changes.
- Networking gear procurement consistent with hyperscaler fabrics: NVIDIA Quantum-2 InfiniBand, NVIDIA Spectrum-X, Arista 7800R, Cisco Silicon One.
- Long-lead power gear with deposits visible in working-capital changes.

### Hiring signals

- Solutions architects with hyperscaler experience, especially ex-AWS, ex-Azure, ex-GCP, or ex-Oracle OCI.
- Technical pre-sales for hyperscaler accounts or for frontier-model labs.
- Capacity planning and procurement leads with hyperscaler-grade reference-architecture experience or DOD background.
- Head of customer success or head of enterprise compute roles tied to "AI compute", "GPU-as-a-service", "training cluster delivery", or "strategic accounts".
- Cleared staff (TS or SCI) and facility-security officers when sovereign or defense customers are plausible.
- Compliance leads for SOC 2, ISO 27001, FedRAMP, or HITRUST when these certifications are not historically required by the business.
- Director or VP-level GTM hires from named hyperscalers, NVIDIA, or major chip vendors.
- Sudden burst of postings in a specific geography that maps to a known site or grid node.

### Customer-readiness language

Phrases that appear in earnings calls, investor-day decks, or press releases and that indicate active counterparty engagement:

- "In active discussions with hyperscaler customers."
- "Pipeline of multi-hundred-MW deals."
- "Evaluating long-term anchor tenant."
- "GPU customer commitments under negotiation."
- "Site is purpose-built for hyperscale workloads."
- "Customer due diligence underway."
- "LOI signed with a top-tier counterparty" without naming.
- "Visible path to fully contracted capacity."
- "Strategic review underway" when paired with operational buildout.

### Counterparty fingerprints

- Site visits from named hyperscaler executives, reported via local news, LinkedIn check-ins, or press photos.
- NVIDIA Inception, NVIDIA Cloud Partner (NCP), or DGX Cloud certification mentions, especially the NCP and DGX Cloud designations which require a commercial relationship.
- AWS Marketplace, Azure Marketplace, or GCP Marketplace listings going live without a prior press release.
- Oracle OCI partner status changes, especially OCI Supercluster references.
- Joint blog posts, conference panel co-appearances, or shared booth presence at GTC, Hot Chips, OCP Summit, or Supercomputing.
- Counterparty's own job postings referencing the target's facility or region.
- Mutual NDA references appearing for the first time in 8-K risk factors.

## Hyperscaler Partnership Announcement Patterns

Use these precedents as pattern-recognition anchors. The lead time from major capex commitment or interconnect filing to public deal announcement has historically been two to four months.

- CoreWeave / Microsoft (2023-2024, multi-billion compute commitment). Preceding signals: aggressive solutions-architect hiring, large capex disclosures, multiple new site leases.
- Nebius / NVIDIA (2024, equity investment paired with compute supply). Preceding signals: GPU procurement disclosures, MW expansion in Finland and Kansas City, executive hires from hyperscaler GTM.
- Iris Energy / NVIDIA (approximately 2.1 billion dollar arrangement announced 2026-05-08; this is the validation case for this skill). Preceding signals: Childress and Sweetwater MW expansion, liquid-cooling installs, hiring of solutions architects and pre-sales staff, customer-readiness language on earnings calls, conversion narrative from Bitcoin mining to AI compute.
- Applied Digital / CoreWeave (2024, GPU lease anchor agreement). Preceding signals: Ellendale ND construction milestones, HPC facility design certifications, executive hires from data-center industry.
- Constellation Energy / Microsoft (2024, Three Mile Island restart PPA). Preceding signals: NRC license-renewal activity, PJM interconnect filings, Pennsylvania regulatory engagement, public commentary on behind-the-meter nuclear supply.
- Talen Energy / AWS (2024, Cumulus campus PPA). Preceding signals: PJM interconnect filings, FERC docket activity, public commentary on data-center adjacency.
- Vistra / nuclear restart adjacencies (2024-2025, Comanche Peak). Preceding signals: ERCOT filings, public capacity commitments to data-center load.

Typical lead-time pattern:

- T minus 6 to 9 months: power and site signals (interconnect filings, real estate, groundbreaking).
- T minus 3 to 6 months: equipment procurement, hiring ramp.
- T minus 1 to 3 months: customer-readiness language, counterparty fingerprints, options activity.
- T minus 0: 8-K material agreement and joint press release.

Use this when assessing the timeline-alignment score in Step 7.

## What Does NOT Count As A Strong Signal

Calibration matters. These are common false positives. Penalize them in scoring; do not let them inflate the operational score.

- Generic "we see strong demand for AI compute" earnings-call language with no named counterparty or quantified pipeline.
- Press releases about cooperation MOUs with no commercial terms, no MW, no dollar value, no duration.
- Investor-day slides that recycle prior commentary about TAM, pipeline, or strategic priorities.
- Headcount increases concentrated in software, R&D, or non-customer-facing roles.
- Capex announcements that simply restate prior public guidance and add no incremental information.
- Generic GPU cloud listings on Marketplace without a named anchor tenant.
- NVIDIA Inception membership alone (Inception is a startup-affiliate program with thousands of members; NCP and DGX Cloud are the meaningful tiers).
- Sector-wide rallies pulling the stock without company-specific catalysts.
- Public statements about "interest from hyperscalers" without operational follow-through.
- Analyst notes citing "channel checks" without primary-source backup.
- Reddit, Discord, or anonymous-blog rumors with no document trail.

## Where To Look (Concrete Search Queries)

Run these via web_search, web_fetch, or x_search. Substitute the target ticker and company name. Run at least eight queries across categories before scoring.

- web_search: "{ticker} MW capacity expansion 2026"
- web_search: "{ticker} hyperscaler anchor tenant"
- web_search: "{ticker} interconnect agreement OR LGIA OR PPA"
- web_search: "{ticker} site:sec.gov 8-K material agreement"
- web_search: "{ticker} site:sec.gov 8-K 1.01" (Entry into a Material Definitive Agreement)
- web_search: "{ticker} NVIDIA partnership OR DGX OR HGX OR Blackwell OR NVL72"
- web_search: "{company_name} groundbreaking OR core and shell OR Tier III"
- web_fetch: company careers page (for example https://www.irisenergy.com/careers, https://careers.coreweave.com, https://nebius.com/careers) and filter for solutions architect, technical pre-sales, capacity planning, procurement, head of customer success
- web_fetch: company investor-relations page for the last two earnings call transcripts and the most recent investor-day deck
- x_search: "${ticker} OR ${company_name} hyperscaler" filter:has:links min_likes:10
- x_search: "${ticker} site visit OR groundbreaking OR MW"
- web_search: "{ticker} ERCOT OR MISO OR PJM queue"
- web_search: "{company_name} Vertiv OR Supermicro OR liquid cooling"
- web_search: "{ticker} Form 4 insider buying" (cross-check: insider buying alongside operational buildout is reinforcing; insider selling is contradicting)

For power-adjacent names (CEG, VST, TLN, NEE), add:

- web_search: "{ticker} behind the meter data center"
- web_search: "{ticker} FERC filing data center"
- web_search: "{ticker} nuclear restart OR small modular reactor"

For OEMs (SMCI, VRT, ETN, HPE), add:

- web_search: "{ticker} customer concentration 10-Q"
- web_search: "{ticker} backlog OR book-to-bill AI"

## Scoring Guidance For The Operational Layer (0-5)

Map verified signals to a score. "Strong signal" means one item from the Strong Operational Signals section above, confirmed by a primary source (SEC filing, signed agreement exhibit, named utility filing, dated press release, named executive quote, or verifiable LinkedIn profile change).

- 5/5: at least three strong signals across at least two independent categories (for example, power and hiring, or equipment and customer-readiness language, or site and counterparty fingerprint), each confirmed by primary sources. At least one signal must name or strongly imply a counterparty (NVIDIA, named hyperscaler).
- 4/5: two strong signals from independent categories, confirmed by primary sources. No named counterparty required, but the operational profile must be inconsistent with organic growth.
- 3/5: one strong signal plus multiple soft signals (analyst commentary, secondhand reports, vague language with supporting context). Primary-source confirmation required for the strong signal.
- 2/5: only soft signals, or only one category of strong signal without supporting evidence (for example, hiring inflection alone without procurement or capex).
- 1/5: vague language, no observable preparation, generic sector commentary only.
- 0/5: signals point away. Examples: recent layoffs, facility closures or impairments, capex cuts disclosed in 10-Q, increasing customer-concentration risk in risk factors, ATM offering with proceeds for general corporate purposes (not tied to a named project), going-concern language.

If the operational layer scores 4 or 5, the probability band ceiling can reach 65 to 79 percent per Bobby Step 8. If it scores 2 or below, cap the overall probability at 50 percent regardless of derivatives confirmation.

When in doubt, anchor the score to what an analyst could independently reproduce from public sources within thirty minutes. If you cannot point to a URL, filing, or named source, the signal does not count as strong.

## Cross-References

- Bobby SKILL.md Step 5 (Operational Front-Running) is the framework this file specializes.
- For derivatives input format see [options-input-template.md](options-input-template.md).
- For validation, see the IREN backtest in `.dexter/inputs/IREN/` (separate fixture).
