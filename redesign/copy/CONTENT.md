# Mockup content sheet (single source for all ten mockups)

Ray, 26 Oct 2026: **do not use Alder Creek data or the name. No real companies, no real locations.** Everything below is invented. Every product frame is labelled fictional. Do not add any name, number or place that isn't on this sheet.

## The fictional world

| Thing | Name | Notes |
|---|---|---|
| Owner / developer | **Kessrow Digital** | fictional; appears only in the owner's-seat framing |
| EPC contractor | **Tamberlane Constructors** | fictional; the builder's seat (concept 2) |
| Switchgear OEM | **Norvale Electric** | fictional supplier |
| Projects | **Project Heron**, **Project Wren**, **Project Ibis** | codenames, no locations, ever |
| The late hall | Project Heron · Campus 2 · Hall B · **32 MW IT** | |
| Snapshot | **9 Mar 2027 · 08:00** | "Verified means verified within this fictional snapshot" |

## The scenario: one late package

- **What changed:** Norvale Electric issued delivery revision 03. Switchgear lineup **SG-B02** (owner-furnished, contractor-installed: OFCI) moves **+35 calendar days** after a busbar fabrication milestone was missed.
- **What it threatens:** the Hall B electrical path has **zero float**. Customer handover moves **14 May 2027 → 18 Jun 2027**. Exposure **1,120 MW IT-days** (32 MW × 35 d).
- **Readiness:** 12 of 18 system-readiness gates complete.

### Options (computed; only executable ones are eligible)

| Option | Modeled handover | Delay | Capacity impact | Incremental cost | Status |
|---|---|---|---|---|---|
| Hold the original order | 18 Jun 2027 | 35 calendar days | 1,120 MW IT-days | $0 | Eligible |
| Expedite with Norvale | 4 Jun 2027 | 21 calendar days | 672 MW IT-days | $1,150,000 | Eligible |
| Reallocate qualified lineup from Project Wren, phase 2 (uncommitted) | 14 May 2027 | 0 calendar days | 0 MW IT-days | $410,000 | Eligible · recommended by rule ranking |
| Air-freight a substitute lineup from a second OEM | — | — | — | — | **Ineligible (illustrative):** not qualified against the Hall B protection design; receiving window closed |

**The donor question, answered on screen:** Project Wren phase 2 has no customer commitment; after release it keeps **38 calendar days of float**; the re-order from Norvale lands inside that float.

### Evidence records (each figure pins to one)

| ID | Record | Line |
|---|---|---|
| ENG-117 | Engineering compatibility | Ratings, protection, controls interfaces and physical fit checked against the approved Hall B design; the donor lineup is qualified. |
| REL-204 | Signed donor release | Released from Project Wren phase 2, uncommitted; donor keeps 38 days of float; no customer commitment affected. |
| LOG-061 | Transport and receiving | Dispatch window and receiving crew confirmed for arrival by 2 Apr. |
| SCH-089 | Reviewed dependency schedule | Arrival by 2 Apr supports 14 May handover with the full installation and commissioning sequence kept. |
| COM-033 | Reallocation cost breakdown | $410,000 incremental. Expediting is $1,150,000; the difference is $740,000. No revenue or delay-damage assumptions included. |

**Printed assumptions:** zero float on the affected electrical path; installation and commissioning durations held; costs exclude unmodeled financing, revenue, damages and tax.

### The decision

- **Decision record:** DR-3105
- **Accountable owner:** Procurement Director (a role, never a person's name)
- **Action:** Approve · Hold · Reject, with rationale. Held and rejected decisions stay in the history.
- **Example history line:** "10 Mar 2027 · Approved · Reallocate from Wren phase 2 · rationale recorded · 5 records attached"

### The builder's seat (concept 2 only, all fictional and illustrative)

- SG-B02 is **owner-furnished** (OFCI), so the slip is the owner's equipment, not Tamberlane's work.
- Delay notice **NTC-014** issued 9 Mar 2027, the same day the revision landed.
- Electrical crew standby: **$18,400 per day** (fictional rate).
- The record shows: what slipped, when Tamberlane knew, the notice, the options, who approved, on which evidence. Phrase it as "the record your claim needs", never as a legal guarantee. Mark "illustrative".

### Portfolio (concept 9)

| Project | Hall | MW IT | Commitment | Forecast | Variance | Exposure |
|---|---|---|---|---|---|---|
| Heron | Hall B | 32 | 14 May 2027 | 18 Jun 2027 | +35 d | 1,120 MW IT-days |
| Wren | Hall A | 20 | 30 Jul 2027 | 8 Aug 2027 | +9 d | 180 MW IT-days |
| Ibis | Development | — | Development gate | On target | 0 | — |

## The model-cost line (concepts 3 and 4; elsewhere only as reassurance)

- Founder-reported: for the team's sample six-week recovery plan, **the language model cost $1.17**; ontology, solvers and evidence work cost the rest (about $300). Label: "Founder-reported, sample plan." Status: CONFIRM before publishing.
- Copy pattern: "A language model helps read your files and answer questions in plain English. It never makes the call. A named person signs."

## Sourced statistics allowed (no locations in any of them)

1. "26% of 110 data center projects expected online in 2025 were delayed." Latitude Media, Feb 2026. https://www.latitudemedia.com/news/up-to-half-of-the-worlds-data-centers-may-be-delayed-this-year/
2. "Average lead time for a large power transformer reached 128 weeks in Q2 2025." Wood Mackenzie via POWER, Jan 2026. https://www.powermag.com/transformers-in-2026-shortage-scramble-or-self-inflicted-crisis
3. "Delay risk is the biggest commercial issue that's negotiated in data center development deals." Troutman Pepper Locke, Dec 2025. https://www.troutman.com/insights/how-energy-scarcity-is-changing-data-center-deals/
4. "About 5% of custom enterprise AI tools reach production." MIT NANDA via Virtualization Review, Aug 2025. https://virtualizationreview.com/articles/2025/08/19/mit-report-finds-most-ai-business-investments-fail-reveals-genai-divide.aspx
5. "For every 33 AI proofs of concept, about four reached production." IDC/Lenovo via CIO.com, Mar 2025. https://www.cio.com/article/3850763/88-of-ai-pilots-fail-to-reach-production-but-thats-not-all-on-it.html

No other statistics. Never "1,900 agents", never "$14.2M/month". No state, city, utility or real company names anywhere.

## Core copy (from MOCKUP-PLAN-v2.md; adapt per concept)

- **Problem beats:** The slip arrives as an email; its effect on the handover arrives weeks later. · Whose delay it is decides who pays, and the record is rebuilt after the fact. · The fix is chosen in a meeting, from a spreadsheet, with no record of what else it moved.
- **Solution steps:** It connects the slip to the handover date and the float on the path. · It computes only options that can execute: gear that fits, slots that exist, crews that are free. · It records who approved what, on which evidence, so the decision stands up later.
- **Reassurance:** Your systems stay yours (P6, SAP, Oracle, Procore, Excel). The model never makes the call. A named owner signs. Every figure carries a record ID. Benefits are never inferred.
- **Other industries row:** Supply chain & distribution · Infrastructure & public works · Housing & relocation. "The same engine runs decision apps in other industries."
- **CTA:** "Bring us one late package." Ninety minutes. Your data stays with you. You leave with a sample decision record. Form: work email, company, role, the late package.

## Banned

AI-powered insights · single source of truth · copilot · digital twin · intelligent automation · seamless · revolutionary · "the model decides" (or "AI decides") · any customer, pilot, prospect or team name · prices for Resonance · real places.
