# The stack, as a journey (storyboard)

27 Oct 2026. The "product philosophy" section of the corridor home page, rebuilt as a prologue, four explorable levels and an epilogue. One worked example runs through all of it: switchgear lineup SG-B02, +35 days, Project Heron Hall B, handover committed 14 May 2027 (fictional, `CONTENT.md`).

Sources for every figure: `mockups/CONTENT.md` (the world and the options table), `mockups/COPY-v4.md` (the founders' description of the four parts), `reports/copy/objections.md` (what each level has to answer), the founder call at 01:16:01 ($1.17 / ~$300, founder-reported, not yet confirmed by a cost log). Visual grammar: Palantir's Ontology docs for 02 (object types, properties, link types, action types), constraint-programming practice for 03 (enumerate, test, prune, explain the violated constraint, relax with a cost).

Rules carried: Ray's hero copy untouched elsewhere; fictional names only; the model never decides; no banned phrases; red thread; deep-blue sky; no sound, no blur, no heading stitch.

Each beat is one row: what you see (3D), what you read (copy), what you can do.

## Prologue · the question (the stack view)

| see | read | do |
|---|---|---|
| The whole stack: membrane, ontology board, solver plate, five modules. The Norvale email lands on the glass as a card; the question "Why is Hall B late?" prints on the glass; the four doors light in turn, top to bottom, then the record glows faintly above. | The AI is not the product. The decision system is. (Ray's copy.) Four doors: 01 Language model, 02 Ontology, 03 Solvers, 04 Data, each with one line. | Click a door. |

## 01 · The language model, as a transcript

Visual: a chat pane standing on the glass membrane, the real exchange, left for the person, right for the model. Camera at the glass, lower layers in silhouette. Level sentence: **It translates. It never decides.**

| beat | see | read | do |
|---|---|---|---|
| 1 What it does well: reads | The Norvale email (messy, four recipients) is dropped into the pane. The model's reply extracts the named things as chips: SG-B02 · delivery revision 03 · +35 d · ex-works 28 Mar · on site 4 Apr. | A language model reads your files and questions in plain English. That is what it is for. Give it the Norvale email and it finds the lineup, the revision and the new dates, in seconds, with no template. | Click the email to see the raw text it read. |
| 2 What it does well: writes | The pane shows the owner's summary being drafted: three sentences for the Procurement Director. | It writes plain English back: a summary the owner can forward, a question put into the words the system holds. "What can hold 14 May?" becomes: options for handover 14 May, gates, cost. | Pick a question; watch it become fields. |
| 3 What it does not do | The pane shows the hand-off line: "I can't check the design or compute options. Passing down." The pulse drops through the glass. Then the switch: the same question answered two ways, side by side. | It does not check a design, compute an option or choose. A chatbot alone gives a fluent paragraph with no float, no date and no record, and lists an option that cannot be built. The same question through the stack comes back with every figure carrying its source. | Flip Chatbot / Resonance. |
| 4 What it costs | The meter: a sliver for the model, the rest for the stack. | In one sample six-week recovery plan the language model cost $1.17; the ontology, solvers and evidence work cost about $300. The AI is the smallest part of the product. Founder-reported, sample plan, to confirm. | Next level. |

## 02 · The ontology, as an object explorer

Visual: Palantir grammar on purpose. Object types as cards with an icon, a count and properties; links as labelled verbs; one object opened with its properties and source IDs. The 3D lattice is the same objects in space. Level sentence: **Your operation, named once, so one change finds everything it touches.**

| beat | see | read | do |
|---|---|---|---|
| 1 Object types | Six cards land in grey: Package (212), Crew (14), Gate (18), Milestone (6), Supplier (9), Handover (3). Each with three properties. The lattice nodes land grey. | Datasets become object types. Rows become objects. Columns become properties. Joins become links. A data center project is packages, crews, gates, milestones, suppliers and handover dates. We start from that base, so no customer starts from zero. | Hover a card: its count and where the rows come from. |
| 2 Your rules on top | Properties and links turn to the accent colour where this customer's rules apply: float = 0 on the Hall B electrical path; SG-B02 is owner-furnished; gate 13 depends on the lineup. | Then your rules land on top: the zero-float path, which packages are owner-furnished, which gate waits on which lineup. The base is shared; the rules are yours. | Hover a rule to see the link it creates. |
| 3 Open an object | Click Package SG-B02: the explorer opens its panel (id, supplier Norvale, need-by 4 Apr 2027, float 0 d, owner-furnished: yes, links: blocks Handover 14 May, waits on Gate 13, supplied by Norvale), each property with its source ID. The camera flies to the node; its links light with verbs. | Every object carries its properties and its links, and every property carries the record it came from. SG-B02's need-by date is LOG-061. Its float is SCH-089. | Click any object in the lattice. |
| 4 One change, every linked date | The date slider: slide SG-B02's arrival from 28 Feb to 4 Apr and the linked values recount in the panel and on the lattice: float 0 d → −35 d, gate 13 waits, crew standby $18,400 a day, handover 14 May → 18 Jun. | Because the links are real, one change finds everything it touches, the moment it lands. Today that effect arrives weeks later in a meeting. | Slide the date. |

## 03 · The solvers, as a constraint search you can operate

Visual: a solver screen that shows the mechanism as a matrix: options down, constraints across, pass or prune filling in, the violated constraint named, survivors ranked. Beside it the 3D gates with the four tokens, in sync. Level sentence: **It tries every option against your real limits and only hands you the ones that can be built, with the reason for every refusal.**

| beat | see | read | do |
|---|---|---|---|
| 1 Enumerate | Four rows appear: hold the order, expedite with Norvale, reallocate from Wren phase 2, air-freight a substitute. Four tokens park at the left of the gates. Counter: 4 options. | A solver is deterministic math, not a guess. First it lists every option your rules allow. For SG-B02 there are four. | Hover an option for what it means. |
| 2 Test and prune | Columns fill one by one: fits the approved design, a slot exists, a crew is free, float on the path. Passes in green; the air-freight row is pruned at the first column and the violated constraint prints: not qualified against the Hall B protection design (ENG-117). Token D stops at gate one. Counter: 4 evaluated · 1 pruned · 3 ranked. | Then it tests each option against each constraint. An option that breaks a rule is ruled out, and the rule it broke is shown. The three that survive are ranked: hold (18 Jun, $0), expedite (4 Jun, $1,150,000), reallocate from Wren (14 May held, $410,000, recommended). Same inputs, same answer, every time. | Click a cell to see what was checked. |
| 3 The rule you can relax | The receiving-window slider. Closing it before 1 April prunes the Wren option at the slot column and the recommendation becomes expedite at $1,150,000; the search re-runs visibly. Opening it restores the cheaper option. The cost of each relaxation prints. | When a constraint blocks every good option, the solver does not break it quietly. It shows which rule to loosen, by how much, for how long, and what that costs. | Move the slider. |
| 4 Does the fix move the problem | A second, smaller matrix runs for Project Wren: phase 2 uncommitted, float after release 38 d, re-order lands inside the float. Pass. The Wren token glows green. | The donor check. Project Wren phase 2 has no customer commitment and keeps 38 days of float after the release. The fix holds Heron without hurting Wren. | Next level. |

## 04 · The data, as the export fan

Visual: five files fan in from their systems as sheets with names and timestamps; a mapping screen matches their columns to the ontology's properties with evals ticking; two conflicts in amber; clean records land with IDs. Level sentence: **Your systems stay yours; every figure has a home.**

| beat | see | read | do |
|---|---|---|---|
| 1 As they are | Five file sheets fan in: `SG-B02_delivery_rev03.xlsx` (SAP export, 9 Mar 08:00), `HallB_P6.xer`, `commitments.csv` (Oracle), `procore_rfis.csv`, `HallB_readiness_gates.xlsx`. They settle above their modules. | Data agents read what you already export from P6, SAP, Oracle, Procore and Excel, without reformatting. Nothing is migrated and nothing is replaced. | Hover a file for what it holds. |
| 2 Matched and checked | The mapping screen: file columns on the left, ontology properties on the right, lines between them; a tick on each check; two conflicts in amber: 1,180 ≠ 1,200 units; 12 Mar ≠ 14 Mar. Clean records drop with their IDs. | The agents match values across files, flag what disagrees instead of hiding it, and check every mapping before anything uses it. Only clean records enter the model, each with its source ID. | Hover a conflict for both values. |
| 3 Every figure has a home | The record's figures as chips; click one and a thread draws to the module and row it came from. $410,000 → COM-033 (Oracle). 38 d → REL-204 (Procore). 14 May → SCH-089 (P6). | Nothing in a decision record is unsourced. Click a figure and it shows you where it lives. | Click a figure. |
| 4 Exported back | The approved plan's records rise from the record and fly back into the modules they came from. | When the owner approves, the plan goes back into the systems and the workbook the team already uses. Founder to confirm the wording. | Next: the record. |

## Epilogue · the record

| see | read | do |
|---|---|---|
| DR-3105 assembles above the stack, line by line, each line lighting in the colour of the level that produced it: the parsed question (01), the linked objects (02), the ranked options and the refusal (03), the five record IDs (04). The owner's role signs. | One late package, worked through: reallocate the qualified lineup from Project Wren phase 2; handover 14 May held; $410,000; five records attached; approved by the Procurement Director. Held and rejected decisions stay in the history. | Approve, Hold or Reject. Back to the stack. |

## Timing (autopilot and level beats)

- Doors: camera glide 1.2 s; layers part 0.8 s; panel in 0.5 s.
- Beats: content swaps in 0.5 s; each beat's scene plays over 2–5 s then holds.
- Level to level: Next level → 1.2 s glide.

## Done means

- A cold reader's one sentence per level matches the level sentence in substance.
- Zero console errors at 1440, 1600 and 390 wide, every door and beat, with frames.
- Every printed figure traces to `CONTENT.md` or the transcript.
- Founder confirmations pending: solver technique and ranking (Sushanth); $1.17 / ~$300 (Sushanth); export-back wording (Sushanth); claims framing (Ray, Sean); Palantir-style framing on a public site (Ray); new fictional names (Ray).

## Cold read (27 Oct 2026, Sonnet subagent as an EPC delivery director, text only)

- 01: "a reader and translator that turns a messy owner email into structured facts and summaries, and hands the real thinking to something else." Unclear: what it passes down to (fixed: now names the ontology and the solvers); the $1.17 line reads as a brag.
- 02: "a single shared model of my project where every number traces to a source record, so when one date moves everything downstream recalculates without a meeting." Unclear: database jargon (fixed: beat 1 rewritten); how much of the rules setup is the customer's to do.
- 03: "deterministic logic generates the feasible options, kills the ones that break a rule, ranks what survives, and checks the fix doesn't hurt another project." Unclear: is the constraint set complete and current; the refusal depends on ENG-117 having been keyed in.
- 04: "sits on top of my existing exports, flags where they disagree, shows where each number came from, and writes the approved plan back." Unclear: exports versus live connections; how write-back avoids clobbering the schedule of record.
- Overall: the pitch lands; wants proof on messy real data.

All four match the level sentences. The open questions are founder questions (rules setup effort, constraint currency, export vs connection, write-back safety), logged for Sushanth.

## Status at close, 27 Oct 2026

Built and published (artifact Version 37). Ray's verdict: disappointing. He expected a complete overhaul of all the graphics and 3D objects to fit the journey, not new screens on the existing stack geometry. Next session starts from a full 3D redesign per level, direction shown to Ray before code. See memory `stack-overhaul-next`.
