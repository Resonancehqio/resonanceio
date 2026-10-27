# Resonance homepage plan, v2 (critiqued and rebuilt)

26 Oct 2026. Replaces the homepage parts of `MOCKUP-PLAN.md` (v1 kept for reference). Built from two independent critiques written today:
- `reports/critique-epc-ceo.md`: the plan read from the seat of a data-center EPC CEO, with 10-K and law-firm sources.
- `reports/critique-design.md`: a design director's critique, a shared design system, ten concepts and a scoring rubric.

Ray's steer, which governs everything below: **the site must not be in the weeds about functionality. It shows that we understand the visitor's problem, then how the technology solves it. Detail lives one click deeper.**

Everything marked **PROPOSAL** is a recommendation pending Ray's call. Everything marked **CONFIRM** needs a founder before it ships.


> **Update, 26 Oct 2026 (Ray):** do not use Alder Creek data or the name, and no real companies or locations anywhere. All mockups use the fictional world in `mockups/CONTENT.md`: Project Heron, Hall B, 32 MW IT, switchgear SG-B02, +35 days, options $0 / $1,150,000 / $410,000. Location-specific statistics are dropped. Read "Alder Creek" below as "the sample package".

---

## 1. What was wrong with v1

1. **It was a feature tour.** Eleven or twelve equal-weight sections (loop, argument strip, four doors, six disciplines, five modules, two walkthroughs, four pillars, pricing). An executive leaves with a feature list and no sign we understand why their halls are late.
2. **It led with an argument about AI that the buyer isn't having.** "The language model is the smallest contributor" answers the chatbot objection. That objection belongs to the CIO, the investor and the sceptical friend. No contractor 10-K read today lists software or language models as a worry. They list fixed-price overruns, schedule guarantees and LDs, failing to recover change orders and delay claims, labor, and backlog cancellation (Comfort Systems, Sterling, EMCOR FY2025 10-Ks; links in the CEO critique).
3. **Alder Creek is told from the owner's seat.** An EPC is usually on the other side of the OFCI line. Its first questions are: whose delay is it, what's my notice date, is it excusable or compensable, what standby and resequencing do I claim. The plan has no entitlement, notice or concurrent-delay idea at all.
4. **The best asset was pitched too small.** The evidence-linked decision record was pitched as "audit". To a contractor, a contemporaneous record of what slipped, what was decided, by whom, on which evidence, is **claim defence and change-order recovery**. That is where their margin is made or lost.
5. **The obvious question goes unanswered.** "Reallocate from a later phase, $350k, 0 days" makes any builder ask: does that just move the slip? A $350k fix that beats a $900k expedite looks too good unless the donor phase's new date, float and re-buy cost sit beside it.
6. **Four equal doors dilute, and three are hollow.** Only the data center app has screens. A data-center CEO who sees Housing at equal weight reads "horizontal tool still looking for a market". v1 also contradicted PRODUCT.md, which says "one vertical, one buyer, one scenario on the homepage".
7. **The loop had no source material.** v1's loop was the supply-chain workbook, whose screens don't exist yet. The data-center decision chain does exist.
8. **The screenshots aren't hero-grade as files.** They have a video-player bar baked in, letterbox edges and soft video-grab text. The UI is purple with a sparkle "Ask AI". Every option reads "Eligible for review", so nothing shows the solver refusing anything.
9. **"Pallet restraint" copies the wrong thing.** Pallet's persuasion is logos and named outcomes, which we can't use. Its hero is a chat thread, which is exactly what our sceptic thinks they already own. Keep Pallet's routing (by industry / by decision). Drop its section rhythm.
10. **The 18 roles are a user list, not a buying committee.** A CEO wants three answers: who signs, who uses it, who can say no.

## 2. The new argument

**Problem first, in the buyer's units.** Data center delivery fails at the seams between power, equipment, permits and contracts. Each runs on its own clock with a different owner: the utility, the OEM, the county, the EPC, the commissioning agent, the tenant. The slip arrives as an email. Its effect on the handover arrives weeks later. Whose delay it is decides who pays, and the record is rebuilt after the fact. (Sourced in `reports/Data center delivery decision problems.md`.)

**Solution second, in three plain steps.**
1. It connects the slip to the handover date and the float on the path.
2. It computes only options that can execute: gear that fits, slots that exist, crews that are free.
3. It records who approved what, on which evidence, so the decision stands up later.

**The chatbot answer becomes one line of reassurance, not the hero.** "A language model helps read your files and answer questions. It never makes the call. A named person signs." The full argument, with the $1.17, moves to /platform and the CIO's security page. **PROPOSAL.** One concept still tests the cost argument as the centrepiece, so Ray can see it win or lose.

**The money language each seat needs.**
| Seat | What they want to see |
|---|---|
| CEO | Margin protected; not holding someone else's delay |
| COO | Days, float, which crew goes where, and whether the fix moves the problem to another job |
| CFO | Exposure in dollars before the claim letter: LDs, standby, unapproved change orders, cash waiting on approval |
| CIO | Systems stay put, data boundary, the model never decides, an auditable record |

Vocabulary to add to v1's list: LDs and caps, notice and time extension, excusable vs compensable delay, concurrent delay, unapproved change orders, standby and demob cost, backcharge, retainage, billing milestones, GMP / lump sum / cost-plus, margin fade, crew-weeks by trade.

## 3. Homepage structure: seven sections, down from eleven

**PROPOSAL:** data-center-led home, platform kept in the nav and one quiet row. The ten mockups test this against a chooser-first and a cross-vertical version, so the call is made on evidence.

1. **Hero.** The problem in the buyer's units, one sub-line on what Resonance does, two buttons: *Bring us one late package* and *See one end to end*.
2. **The problem in three beats.** Email, then critical path. Whose delay is it. Fixed in a meeting with no record of what else moved. One sourced line (Troutman: delay risk is "the biggest commercial issue" in these deals).
3. **How it solves it.** The three steps above as one drawing, not three icon cards. The loop lives here: the data-center decision chain, about 18 seconds, labelled sample data.
4. **One late package, end to end.** Alder Creek: a 24 MW hall, a six-week switchgear slip, three ways out. It shows the donor phase's new date, float and re-buy cost beside the $350k. "Benefits are never inferred" is printed beside the number. Labelled "Sample data. Not a customer."
5. **What you're not asked to believe.** Your systems stay yours. The model never makes the call. A named owner signs. Every figure carries a record ID. One line: the same record supports notice and change-order recovery (**CONFIRM** the product supports that before using the phrase).
6. **Other industries.** One quiet row: distribution, public works, housing. One line each. "The same engine runs decision apps in other industries."
7. **Bring us one late package.** Ninety minutes, your data stays with you, and you leave with a sample decision record (**CONFIRM** turnaround and terms). Form: work email, company, role, the late package. Then the footer.

**Moved one click down:** six disciplines and five modules (/platform), the comparison table (/platform), the workbook loop (the distribution page), MIT NANDA and IDC (the CIO/security page), pricing structure (/pricing), the 18 roles (the vertical page, grouped as a buying committee plus users).

**Vertical page change (PROPOSAL):** "EPC & Data Centers" serves two buyers whose money differs. Give it a seat switch, *I build* / *I own*. The builder view speaks LDs, notice, crews and change orders. The owner view speaks MW IT-days, customer commitments and lease risk. Same walkthrough, two framings.

## 4. Design system (shared by all ten mockups)

From the design critique, adopted with two edits.

- **Type.** GT America Standard + GT America Mono (licensable; **Ray to approve the licence**). IBM Plex Sans + Plex Mono as the free fallback and the mockup default. No Inter. Scale 13/15/17/20/28/40/56/80. Tabular lining figures wherever numbers stack.
- **Colour.** Paper `#F5F4F0`, sheet `#FFFFFF`, ink `#15171A`, ink-2 `#50565D`, ink-3 `#8A9097`, rule `#D8D6CF`. One accent, **redline `#C8361E`**: what changed (the slipped date, the delta) and the primary button. Nothing decorative. Status by mark, not hue: filled = late, hollow = on target, hatched = ineligible, struck = refused.
- **Grid.** 12 columns, 72 px margins, 24 px gutters, 1296 max. Sections 144 px apart, divided by hairlines. Cards only for things that really are records.
- **Honesty as design.** Every product frame carries a drawing-sheet title block: `SAMPLE DATA · SYNTHETIC SNAPSHOT · 15 FEB 2027 · FICTIONAL`. Sources are numbered notes at the section foot. Only [F]-tagged facts from `site/data/facts.ts`.
- **Product imagery.** Rebuild four frames as live HTML at true size in these tokens: options table, evidence list, owner action panel, briefing header. The JPGs are content reference only. Out of purple. "Ask AI" becomes a quiet "Ask the plan" field sitting visibly on top of the record.
- **Vertical sensitivity.** Borrow the buyer's document grammar (title block, transmittal, revision note, record number) and units. Never the look of their objects. No blueprint blue, no paper texture, no themed world.
- **The loop and the temple method.** Keep its structure: one 0–1 progress value, smoothstep slices, plays exactly in reverse, same-frame swap to the static table, stills for Reduce Motion and mobile. Build it in DOM/SVG, not WebGL, so text stays crisp and selectable. This is a deliberate exception to the global default, for product UI. WebGL is allowed in one concept only, flagged.
- **Mobile (390).** Nav: Solutions · Platform · Book. The loop becomes five swipeable stills. Tables become stacked records. The title block wraps but never disappears.

## 5. The ten mockups

Each tests one hypothesis about what wins the first 30 seconds. All share the system above so they're comparable. Edits from the design critique are marked.

| # | Name | Hypothesis | Lead device |
|---|---|---|---|
| 1 | The seams | Executives buy from whoever names their failure precisely | One program drawn on six parallel clocks (utility, OEM, county, EPC, Cx, tenant), crossings in redline, each clock footnoted |
| 2 | Whose delay is it | **(Edited: builder's seat.)** An EPC buys the tool that protects its claim position | Alder Creek retold from the EPC side: OFCI gear late, notice date, standby cost, the record forming as it happens |
| 3 | Cost share | Showing the model's $1.17 share of the work ends the chatbot objection fastest | One work-share bar with the model as a sliver |
| 4 | Chatbot side by side | Putting the reader's own alternative beside ours makes the difference visible | A fluent chatbot answer with no IDs and no owner, beside three computed options with IDs and an owner |
| 5 | Decision record | A signed record wins the CIO, the real gatekeeper | RD-101 typeset as a transmittal, with a held decision in its history |
| 6 | Industry chooser | Visitors recognise their own problem faster than we explain ours | Four full-width questions, each in its vertical's units, expanding to problem and solution |
| 7 | Systems underneath | The unspoken objection is rip-and-replace | A section drawing: P6, SAP, Oracle, Procore, Excel as the base; a thin Resonance layer; a decision and owner on top |
| 8 | Refused option | Engineers trust a tool that says no and gives the reason | The options table with a fourth row hatched and struck, marked illustrative |
| 9 | Portfolio | CEOs think in commitments across a portfolio | One row per hall: MW IT, commitment, forecast, exposure, each opening its decision |
| 10 | One late package | Buyers burned by pilots respond to a concrete unit of work | What you bring / what comes back, with the form inline |

Coverage: EPC-led 1, 2, 3, 5, 8, 9 · cross-vertical 4, 7, 10 · chooser-first 6. Concept 2 replaces the design critique's "Alder Creek as the page" with the builder's-seat version, because the CEO critique showed the owner framing misses the EPC buyer. The owner framing survives inside concept 9.

**Build scope (PROPOSAL):** all ten as real HTML at 1440, full scroll. 390 versions for the top three after scoring. Copy run through `deslop` and a banned-phrase grep. Screenshots of every page into one contact sheet.

## 6. How we'll know which one is right

**Rubric** (design critique §4): problem-first ×3, why-not-a-chatbot ×3, vertical specificity ×2 with a swap test, depth discipline ×2 (more than seven named features scores 1), product legibility ×2, mobile ×1. Gates: any slop tell fails it; any unlabelled sample, unsourced stat or "model decides" fails it.

**Outside check, not us:** six to eight readers outside the build. At least two from data-center delivery (project controls; procurement or a PM), one CIO type, two sceptical executives who use chatbots daily. Each sees five concepts for 30 seconds, then writes: what problem does this solve and for whom, why wouldn't you just use a chatbot, what would you do next. Two people who didn't design them score the first three criteria blind. A wrong term or implausible number from a delivery reader disqualifies a concept until fixed.

## 7. Open inputs, with owners

| Input | Owner | Needed by |
|---|---|---|
| Can the product show a refused/ineligible option? (concept 8) | Sushanth | Wed 28 Oct |
| Does the record support notice and change-order recovery, or only audit? (concept 2, section 5) | Sushanth | Wed 28 Oct |
| Donor phase's new date, float and re-buy cost for the Alder Creek reallocation | Sushanth | Wed 28 Oct |
| The ~$300 "everything else" figure: what it covers, and whether to publish it beside $1.17 | Sushanth | Wed 28 Oct |
| Working-session terms: 90 minutes, turnaround, what's free vs the paid pilot | Ray + Sean | Wed 28 Oct |
| GT America licence, or ship on Plex | Ray | Thu 29 Oct |
| Six to eight outside readers, two from DC delivery | Ray | Thu 29 Oct |
| Homepage lead: DC-led (proposed), chooser-first, or platform-first | Ray, after reader scores | Fri 30 Oct |

**Fact checks on the critiques.** The $1.17 figure **is** in the founder transcript (Sushanth, 01:16:01: "the model cost me a dollar 17 cents", and "everything else cost me like 300 bucks", for the six-week-delay plan). The CEO critique said it couldn't find it; that was wrong. Several contractor earnings-call figures in the CEO critique come from secondary summaries and are marked there; none are proposed for site copy.

## 8. Kickoff prompt for the mockup build

> Build ten homepage mockups for Resonance as static HTML at 1440 px, following `MOCKUP-PLAN-v2.md` §§3–5 exactly: the seven-section structure, the shared design system, and the ten concepts in the table, one hypothesis each. Start from raw material, not summaries. Take product content from `site/public/product/*.jpg`, rebuilt as live HTML frames in the tokens, never pasted as images. Take facts only from the [F] entries in `site/data/facts.ts`, footnoted with links. Take vocabulary from the CEO critique. Problem first, solution second, detail one click deeper. No more than seven named features on any page. Every product frame carries the sample-data title block. The model never "decides". No customer, pilot or team names, no prices, no banned phrases (AI-powered insights, single source of truth, copilot, digital twin, intelligent automation, seamless). Mark anything the product can't do today as illustrative. Then run `deslop` on all copy, grep for the banned phrases, screenshot each page at 1440 and DPR 2 into one contact sheet, and score each against the §6 rubric with the gates applied. Done means all ten render, pass both gates, and come with a ranked shortlist of three ready for the outside readers. Build 390 versions of those three only.
