# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (user's choice, 2026-10-26), so the site can later fold into the product's React codebase. Deploy target assumed Netlify (Ray's other sites deploy there; connector available) — confirm before launch.

## Users

**Buyers (the site's audience):**
- CEO / COO / Head of Delivery at data center owner-developers (type: Related Digital) and EPC/operators (type: CyrusOne). Situation: a portfolio of halls under construction with customer commitment dates, late long-lead equipment, forecasts above approved budget, and coordination done by humans across SAP, Oracle, Salesforce, P6 and Excel. Job: protect the promised megawatts and the handover date without overspending on recovery.
- CIO / Head of Digital at the same firms. Situation: has watched many AI prototypes and almost none reach production. Job: find something governable, auditable and owned that IT can stand behind.

**Users of the product (the 18 roles the site must speak to):** Procurement Director; Mechanical Supply Chain Manager; Construction Senior Project Manager; MEP Project Manager; Prefabrication & Constructability Manager; Construction Cost & Forecasting Manager; Development Team; Energy & Power Procurement Team; Project Controls Manager / Scheduler; Design / Engineering Manager; Commissioning Manager / Authority; White Space Fit-Out Manager; Entitlements & Permitting Lead; Customer Delivery / Commercial Lead; Quality Assurance / Quality Control; Site Superintendent / Logistics Lead; Critical Facilities / Operations Manager; Finance / Investment Team.

## Product Purpose

Resonance is a decision layer for long-duration, many-party delivery programs — first vertical: data center development and construction. It connects a change (a supplier slip, a utility date move, a controls revision mismatch) to the commitment it threatens, computes only executable recovery options, pins every figure to an evidence record, routes the decision to one accountable owner, and keeps the record. Success for a buyer: fewer days late against customer commitments, less recovery spend, decisions that are made on time and can be defended afterward.

The website's purpose: make the sales pitch to data center builders and owners, in their language, and answer the objection every buyer now has — "my people already get answers from a language model; why do I need you?"

## Positioning

The model drafts; a deterministic solver computes; a named human owner decides; the record stays. Specifically:
- Sits **on top of** existing systems of record (SAP, Oracle, Salesforce, Primavera P6, Procore, Excel) — customers keep them. Resonance is the intelligence/coordination layer humans used to be.
- An **EPC ontology** (engineering–procurement–construction) is the base reference; each customer's exceptions are layered on, not rebuilt.
- **Deterministic tools under the LLM** (constraint solver for compatibility, delivery windows, schedule dependencies). "Claude doesn't do 2+2; it builds a calculator."
- **Evidence-linked, governed, owned.** Every number carries a record ID; model assumptions are printed; financial benefits are never inferred; the accountable owner approves/holds/rejects with rationale; decision history is kept.
- The same engine runs an affordable-housing decision app (Sean) — this is a platform fact for `/platform` and investors, **not** homepage copy for data center buyers.

Placeholder product name in the demo: "Decision OS" (Sushanth: "don't get carried away with the name"). Working recommendation: lead with Resonance, use "Decision OS" as descriptor. Undecided.

## Operating Context

- The buyer's world: customer commitment dates in MW IT; exposure measured in MW IT-days; float on the electrical path; OFCI long-lead packages (switchgear, transformers, generators, chillers/CDUs); readiness gates and Level 1–5 commissioning; EAC and forecast vs approved budget; utility energization milestones; white-space zone release; turnover packages.
- Reference scenario (synthetic, labeled sample data, snapshot 15 Feb 2027): portfolio of Alder Creek (24 MW IT, Campus A / Hall 1), Birch Ridge (16 MW IT), Juniper Park (development). Alder Creek: Aster Power Systems moved switchgear SWG-A01 by six weeks after a busbar missed its milestone; zero float; handover moves 30 Apr → 11 Jun; options Keep ($0, 42 days, 1,008 MW IT-days), Expedite ($900k, 21 days), Reallocate qualified package from uncommitted later phase ($350k, 0 days); evidence ENG-042, REL-018, LOG-027, SCH-013, COM-009; constraint solver CA-ALDER-014; Procurement Director owns the decision. Secondary decisions: Construction crew resequence ($45k, 12 days), MEP pump controls revision B→C ($22k), Energy PWR-A02 31 days late with 32 MW utility available vs 48 requested, Juniper Park site diligence.
- Sales motion today: founder-led (Sushanth David, Sean Christensen, Ray Geis), warm introductions (Greg → Related Digital), pilots with a large US data center EPC/operator's CIO. The demo is a narrated video plus a clickable workspace with a persona switcher.

## Capabilities and Constraints

- Site content: homepage; full Alder Creek walkthrough page; one page per role (18); `/platform` for the horizontal ontology story; company page.
- Primary CTA: short form (name, company, role, one line about the late package) → email via Netlify Forms (user's choice). Secondary CTA: watch the walkthrough.
- Product screenshots exist and may be used as-is (light lavender UI). Narrated video exists with Sushanth; public link undecided.
- No customer logos, testimonials, pilot names or metrics may be used. "Nothing named yet" (user, 2026-10-26). Proof = specificity of the scenario, explicit sample-data labeling, founders.
- Proposed commercial model (Sushanth's slide, 2026-10-26): platform license $5,000/mo; decision apps sized S–XL with one-time build fees $0–$45,000 and licenses $1,000–$5,000+/mo; pilot $90,000 for 3 months covering 2–3 apps and all licenses. Proposed, not agreed; dollar figures are kept behind `publish: false` in `site/data/pricing.ts`. The 3-month / 2–3-app pilot structure is published. The demo workspace was built in four days (true per the founder call).
- No invented industry statistics; any market figure must come from the cited research report in `reports/`.

## Brand Commitments

- Company name: **Resonance** (Resonance Network Company; yourresonance.com).
- Honesty is part of the brand: sample data is labeled fictional; "Verified means verified within this snapshot"; assumptions printed; benefits not inferred. The site must keep this register.
- Ray's standing animation preference (global CLAUDE.md): the "temple method" — Three.js built in code, one 0–1 progress value driving smoothstep stages, texture laid over flat tones with a grain/vignette post pass, seamless hand-off to DOM, ~2.4 MP cap, DPR-2 judgment, Reduce-Motion and no-WebGL stills. Painted brushwork is not required for this audience; the texture should come from this product's world.
- Existing visual material, not yet binding: product UI (lavender, Inter-like, "Ask AI"); Related Digital deck (navy / green / off-white). Decision deferred to the design round.

## Evidence on Hand

- Founder meeting transcript, 2026-10-26: `~/Downloads/Founder Meeting.txt`
- 82 screenshots of the demo video and deck, 2026-10-26: `~/Desktop/Screenshot 2026-10-26 at 12.*.png` (downscaled copies in the session scratchpad)
- Research report (complete, 2026-10-26): `reports/Data center delivery decision problems.md` — six note files in `research_notes/`; every figure tagged [F] fetched or [S] snippet-only. Site facts live in `site/data/facts.ts` and must stay [F]-only.
- Commercial model slide (screenshot shared in session, 2026-10-26): structure in `site/data/pricing.ts`.
- Site build: `site/` (Next.js 16, app router). Surface brief + direction contract: `.impeccable/surfaces/site-app-page-tsx.md`. Review captures: `.impeccable/review/`.
- Absent: logos, testimonials, pilot results, pricing. Do not fabricate.

## Product Principles

1. Answer "why not just a language model" in the first screen, with the mechanism, not adjectives.
2. One vertical, one buyer, one scenario on the homepage; the horizontal platform story lives elsewhere.
3. Speak in the buyer's units: calendar days against commitment, MW IT-days, float, gates, EAC, record IDs.
4. Prove by showing the product deciding, not by claiming; label synthetic data as synthetic.
5. Every sentence should survive a Project Controls Manager reading it.
