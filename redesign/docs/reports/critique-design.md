# Homepage design critique and ten concepts

26 Oct 2026. Reference sites fetched today: Pallet, Alembic, causaLens, Linear, Ramp, Vertiv, Procore. Palantir's marketing pages render client-side and returned nothing, so no claims are made about their layout.

## 1. Critique

**The homepage is a feature tour.** This is the biggest problem, and it is what the founder flagged. Section 6 of the plan stacks twelve sections at equal weight: loop, argument strip, four doors, six disciplines, five modules, two walkthroughs, four pillars, industry pulse, pricing. An executive leaves with a feature list and no sign that we understand why their halls are late.

The fix is to the structure:

- **State the problem first, in the visitor's units.** Then show how the technology closes it. Then offer one way in.
- **Move the detail one click deeper.** The six disciplines and five modules go to /platform. The second walkthrough goes to /proof. Pricing goes to /pricing.
- **Keep at most one mechanism view** on the homepage: the loop.

The problem asset already exists. The research report's heading is "Delivery fails at the seams between power, equipment, permits and contracts." Each of those runs on its own clock with a different owner (utility, OEM, county, EPC, commissioning agent, tenant), and the report has sourced facts for each. No competitor fetched says this. Lead with it.

**The inputs disagree on scope, and the plan settles it silently.**

- PRODUCT.md principle 2: "One vertical, one buyer, one scenario on the homepage."
- The brief and plan: a platform homepage with four equal doors.
- The steer ("the visitor's vertical") leans toward PRODUCT.md.

Three of the four verticals have no screens: no supply-chain captures, no infrastructure example, no housing brief. Four equal doors over thin content is itself a slop tell. The concepts below test three positions: EPC-only, a cross-vertical problem with doors, and pick-your-industry first. Ray chooses after testing.

**"Pallet restraint" copies the wrong thing.** Pallet's sequence (product hero, logo marquee, four story cards, five tall module cards, four text pillars, four numbered features, three badges, CTA) is generic B2B grammar. causaLens, Procore and Ramp run nearly the same order. Two problems with copying it:

- **Pallet's proof is logos and named outcomes.** We have neither, so the copied layout leaves holes where the persuasion should be.
- **Pallet's hero is a chat thread with agents.** That is exactly what our reader thinks they already have.

Take Pallet's routing (industry and decision as separate menus) and its one-sentence-per-block discipline. Leave the section rhythm.

**Slop risks in the plan as written:** equal module cards twice (doors, modules), so identical card rhythms on one page; "model / engine / you" in three columns, which becomes three-icon cards unless drawn as one diagram; four "Why" pillars that repeat the hero; an empty badges row; a loop rebuilt as a fake dashboard; and purple, since the product UI is lavender and violet with a sparkle "Ask AI" button. Also police gradient-blob heroes, glass, emoji, gradient text, "trusted by", fragment taglines ("Reliably. Quickly. Scalably." on causaLens), server-aisle photography (Vertiv, Procore) and "single source of truth" (Procore). That is the category's wallpaper; leaving it out is how we stand out.

**Vertical sensitivity without a themed world.** The rejected mocks dressed the product as an object from the buyer's world. Sensitivity lives instead in units (MW IT-days, zero float, OFCI, readiness gates, EAC), in the documents the buyer trusts (title block, transmittal, footnote, record number), and in a register that survives a Project Controls Manager. Each vertical has its own document grammar: allocation tables for distribution, pay applications for public works, notices and unit schedules for housing. Borrow their structure, never their surface. No paper texture, no blueprint blue.

**Are the screenshots hero-grade? Not as files.** A video-player pill (pin, mute, more) is baked into portfolio, evidence and energy; options and evidence have black letterbox edges; all are soft video grabs that will look second-hand at DPR 2; "Ask AI" floats on every frame; density is low. Worse, every option in options-table reads "Eligible for review", so nothing on screen shows the solver refusing anything. The content, though, beats any logo bar: real units, record IDs (ENG-042, REL-018, LOG-027, SCH-013, COM-009), "Verified means verified within this synthetic snapshot", printed model assumptions, Approve / Hold / Reject.

Rebuild four frames as live HTML in site tokens at true type size (options table, evidence list, owner action panel, briefing header), using the JPGs as content reference only. Re-skin out of purple. Drop "Ask AI" or show it as a quiet "Ask the plan" field visibly on top of the record. Confirm any ineligible row with Sushanth, or label it "Illustrative".

**The plan's loop has no source material.** It is the supply-chain workbook flow, whose screens are still owed; loop the data-center decision chain instead (slices in §2) and move the workbook loop to the distribution page.

**$1.17.** The only denominator on record (about $300 for everything else) is founder-reported and in neither brief nor plan; confirm both figures belong to Alder Creek before any concept centers on them.

## 2. Design system brief (shared by all ten)

**Type.**

- **Primary:** GT America Standard and GT America Mono (Grilli Type, licensable). It is an American gothic, it reads as engineering, and it has true tabular figures.
- **Free fallback:** IBM Plex Sans and IBM Plex Mono.
- **Avoid Inter.** It is the product's current face and the category default.
- **Scale:** 13 / 15 / 17 / 20 / 28 / 40 / 56 / 80 px.
- **Headlines:** 56–80 px at weight 500, tracking −1%.
- **Body:** 17/26 at a 65–72ch measure.
- **Numbers:** `tabular-nums lining-nums` wherever numbers stack.

**Color.** One accent only, and status by form rather than hue.

| Token | Value | Use |
|---|---|---|
| `paper` | #F5F4F0 | ground |
| `sheet` | #FFFFFF | product frames, records |
| `ink` | #15171A | type, primary rules |
| `ink-2` | #50565D | secondary text, units |
| `ink-3` | #8A9097 | captions, sources |
| `rule` | #D8D6CF | hairlines |
| `redline` | #C8361E | the only accent |

- **Redline is the drafting color for a change.** It marks only what moved: the slipped date, the delta, and the site's primary CTA. Approve / Hold / Reject stay in ink.
- **Status markers:**
  - Late: filled marker.
  - On target: hollow marker.
  - Ineligible: hatching.
  - Refused: strikethrough.
- **A decorative use of the accent is a failure.**

**Grid and spacing.**

- **Grid:** 12 columns, 72 px margins at 1440, 24 px gutters, 1296 px max.
- **Spacing scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 144 px.
- **Sections:** 144 px apart on desktop, 64 px on mobile, divided by hairline rules (Linear's habit) rather than tinted card panels.
- **Cards:** only for things that really are cards, such as a record.

**Honesty labels as design elements.**

- **Title block.** Every product frame carries one in its lower-right corner, as on a drawing sheet: a 1 px ink box with 11 px mono caps reading `SAMPLE DATA · SYNTHETIC SNAPSHOT · 15 FEB 2027 · FICTIONAL`. It survives every crop and every mobile still.
- **Sources.** Numbered superscripts resolve in a notes rail at the section foot (publisher, date, link) in `ink-3`.
- **Statistics.** Only the [F] entries in `site/data/facts.ts`. The report's switchgear 40–80-week range is unsourced and stays out.

**Numbers and IDs.**

- **Values:** tabular, with units in `ink-2` at 0.8×: `42 calendar days`, `1,008 MW IT-days`, `$350,000`.
- **Deltas:** signed and in redline: `+42 d`.
- **Dates:** one format only, `30 Apr 2027`.
- **Record IDs:** mono with a dotted underline that opens the record (`ENG-042`, `RD-101-E3`). Every ID resolves; none is decorative.

**The loop, and the temple method.**

Keep the temple method's architecture: one progress value `p` from 0 to 1; each stage reads its slice through smoothstep, so the loop reverses exactly and retiming means editing slices; a same-frame swap to the static DOM table at identical position and size; stills for Reduce Motion and no-JS.

Drop WebGL and painted shaders for product UI. Text must stay crisp, selectable and accessible, and the project's own rejection of themed worlds overrides the global default. Build the loop in DOM and SVG.

Loop slices (about 18 s on time in the hero; on scroll for the walkthrough page):

| `p` slice | What happens |
|---|---|
| 0–.15 | Supplier revision 04 arrives; SWG-A01 moves +42 d |
| .15–.35 | Traced along the zero-float path to the Hall 1 handover (30 Apr → 11 Jun; 1,008 MW IT-days) |
| .35–.60 | Three options computed |
| .60–.80 | Five record IDs pin to the figures |
| .80–1 | Procurement Director: Approve / Hold / Reject |

WebGL is allowed in at most one concept (#2), for a physical object only, capped at 2.4 MP and judged at DPR 2.

**Mobile (390).** Nav: Solutions, Platform, Book. The loop becomes five swipeable stills with `p` snapped to stage ends, no autoplay. Tables become stacked records (label left, tabular value right). The title block wraps but never disappears.

## 3. Ten concepts

Shared default order, replacing plan §6: hero (problem, then mechanism) → loop → model / engine / you as one diagram → industries as rows → one proof link → "your systems stay yours" and the owner → "Bring us one late decision" → footer.

**1. The seams** (device: six-clock schedule drawing).
- **Hypothesis:** Executives buy from whoever names their failure precisely.
- **Hero:** "Data centers are late at the seams," over one program drawn on six parallel clocks (utility, OEM, county, EPC, commissioning, tenant). Each clock has a footnoted [F] fact, crossings are in redline, and one line says what Resonance does at a seam. At 390 the clocks stack.
- **Order:** the loop comes second, as "closing one seam".
- **Risk:** it reads as a consultancy report.

**2. Alder Creek as the page** (device: scroll-driven decision chain).
- **Hypothesis:** One decision in the buyer's units beats any platform claim.
- **Hero:** "SWG-A01 moved six weeks. Hall 1 has zero float." Scroll drives the whole decision. Optional WebGL: an ink-line switchgear lineup that swaps, in the same frame, for the options table. Stepped stills at 390.
- **Order:** platform and verticals appear only at the end.
- **Risk:** it looks single-purpose, and the WebGL object drifts toward a metaphor world.

**3. Cost share** (device: work-share bar).
- **Hypothesis:** Seeing the model's share of the work ends the chatbot objection fastest.
- **Hero:** A kicker ("A switchgear slip threatens a 30 Apr handover") over one bar of the plan's work. The model's sliver reads $1.17; the rest is mapping under evals, solver runs, evidence and owner review. At 390 the bar runs vertical.
- **Order:** the argument comes before the loop.
- **Risk:** the denominator is unconfirmed, and it can read as "cheap AI".

**4. Chatbot side-by-side** (device: split comparison).
- **Hypothesis:** Placing the executive's own alternative beside ours makes the difference visible.
- **Hero:** "Ask a chatbot what to do about a late transformer. Then ask who signs." On the left, a real chatbot answer: fluent, no IDs, no owner. On the right, three computed options with record IDs and an owner. The halves stack at 390.
- **Order:** a three-row comparison table is promoted from /platform.
- **Risk:** it reads as a strawman.

**5. Decision record** (device: transmittal-style record).
- **Hypothesis:** A signed, auditable record wins the CIO, who is the real gatekeeper.
- **Hero:** "Recovery decisions are made in inboxes and lost," then RD-101 typeset as a transmittal: change, response, owner, rationale, five evidence IDs, and a held decision in its history.
- **Order:** "Your systems stay yours" comes second.
- **Risk:** too dry for a COO.

**6. Industry chooser** (device: questions as navigation).
- **Hypothesis:** Visitors recognize their own problem faster than we can explain ours.
- **Hero:** Four full-width text rows, each a question in that vertical's units ("Which qualified package can we reallocate to hold a handover?" / "Where do the tires on the water go across 200 DCs?" / "Is this phase's evidence complete enough to release funds?" / "When construction shifts, who moves when?"), each expanding into problem and solution. An accordion at 390.
- **Order:** the vertical comes before the argument.
- **Risk:** three of the doors are thin.

**7. Systems underneath** (device: building-section drawing).
- **Hypothesis:** The unspoken objection is rip-and-replace.
- **Hero:** "Keep P6. Keep SAP." SAP, Oracle, P6, Procore and Excel form the bottom stratum, set in type. A thin Resonance layer reads them, and a decision and owner sit on top.
- **Order:** the loop shows what happens in that layer.
- **Risk:** it decays into a generic integration diagram.

**8. Refused option** (device: struck-through table row).
- **Hypothesis:** Engineers trust a tool that says no and gives the reason.
- **Hero:** "It won't recommend a plan that can't be built." The options table at real scale, with a fourth row hatched and struck: "Air-freight from second OEM: ineligible, receiving window closed (rule, illustrative)". The refused row sits last at 390.
- **Order:** "which rule to relax" is the only discipline kept on the homepage.
- **Risk:** the product doesn't show this yet. Sushanth must confirm.

**9. Portfolio** (device: commitment table).
- **Hypothesis:** CEOs think in commitments across a portfolio.
- **Hero:** "Which megawatts are late, and what it takes to hold them." One row per hall (MW IT, commitment, forecast, MW IT-days exposure), each opening its decision; rebuilt from portfolio.jpg without the bar charts.
- **Order:** the loop launches from a row.
- **Risk:** it is the closest of the ten to a fake dashboard.

**10. Working session** (device: bring / get-back exchange).
- **Hypothesis:** Buyers burned by pilots respond to a concrete unit of work.
- **Hero:** "Your team already knows which decision is late." On the left, what you bring: one export, one decision, one owner. On the right, what comes back: options, a signed record, new workbook tabs. The form is inline and comes first at 390.
- **Order:** the CTA leads, and the loop sits mid-page.
- **Risk:** it implies pilot terms that aren't fixed.

EPC-led: 1, 2, 3, 5, 8, 9. Cross-vertical: 4, 7, 10. Chooser-first: 6.

## 4. Scoring rubric

Score each criterion 1–5 at the weight shown. Gates are pass or fail.

| # | Criterion | Weight | What earns the score |
|---|---|---|---|
| 1 | Problem first | ×3 | After 30 seconds, the reader states the problem in their own vertical's terms before restating any technology. |
| 2 | Argument | ×3 | The reader can say in their own words why this is not a chatbot. |
| 3 | Vertical specificity | ×2 | Count the terms only that industry uses. Swap test: if the page still works under a competitor's logo, it scores 1. |
| 4 | Depth discipline | ×2 | One mechanism view at most. More than seven named features scores 1. |
| 5 | Slop | gate | Any one tell fails it (list below). |
| 6 | Product legibility | ×2 | Numbers readable at 1440 without zoom, and at 390 on a real phone. |
| 7 | Honesty | gate | Sample labels visible in every crop, every statistic footnoted to an [F] source, the model never decides, illustrative elements marked. |
| 8 | Mobile | ×1 | The argument survives at 390 with nothing hidden. |

Slop tells for criterion 5: gradient hero, icon-card triples, bento grid, a chart with no decision attached, "trusted by", purple, glass, emoji, any banned phrase, or the same card rhythm twice on one page.

**Running it with readers.**

- **Who:** six to eight readers outside the build: two from data center delivery (project controls; procurement or PM), one CIO type, one supply-chain planner, one public-works controls person if reachable, and two skeptical executives who use chatbots daily.
- **How:** each reader sees five concepts in rotated order (three or four readers per concept), each for 30 seconds as a 1440 static; half also see 390 on a phone. After each, they write answers to: "What problem does this company solve, and for whom?", "Why wouldn't you just use a chatbot?", "What would you do next?"
- **Scoring:** two judges who did not design the concepts score criteria 1–3 blind; the team scores 4–8. Keep the top three and merge devices only where they don't compete for the hero. A wrong term or implausible number flagged by a delivery reader disqualifies until fixed.
