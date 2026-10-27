# Motion ideas: 20 ways to show Resonance moving (26 Oct 2026)

The aim is Palantir's clarity about what things are and Pallet's calm, product-led motion, without copying either. Every animation uses the fictional Heron world (`CONTENT.md`) and the plain copy (`COPY.md`).

Rules for all twenty:
- One 0 to 1 scroll value drives every stage, using smoothstep slices, so each one plays backwards when you scroll back up (temple method).
- Three.js only where depth helps (ideas 9 and 15).
- Everything else is SVG or DOM.
- Each has a still frame for Reduce Motion.
- No split-flap, no metaphor worlds, no neon.

## A. What things are (the Palantir lesson: name the nouns, then show them connect)

1. **Anatomy of a package.** The switchgear lineup SG-B02 appears as one clean card. As you scroll, it unfolds into its properties (supplier, owner-furnished, need-by date, float). A hairline runs from each property to the document it came from.
2. **The link web.** SG-B02 draws its links one at a time to Hall B, the handover date, the crew and the customer date. Each link carries a verb label ("feeds", "blocks", "waits on"). By the end you understand the project as connected things.
3. **The ripple.** The delivery date slides 35 days. The change travels down the links, and each object it reaches recounts its new value in place: handover 18 Jun, standby $18,400 a day.
4. **The base and the exceptions.** A grey base of construction nouns everyone shares (package, crew, gate, milestone) draws in first. Then this customer's own rules land on top in the accent colour. It shows we don't start from zero for each customer.

## B. How it works (the mechanism, shown rather than told)

5. **Gates.** Four recovery options travel left to right through gates labelled "qualified for this design", "slot exists" and "crew free". The air-freight option stops at the first gate and its reason prints beside it. Only buildable options come out the other side.
6. **Schedule surgery.** A clean Gantt chart shows the slip shoving the handover bar right. Each option is tried in turn and the bars move. With the Wren option, the handover bar snaps back into place.
7. **The donor check.** After the Wren option is chosen, the camera pans to Project Wren to show that it keeps 38 days of float. This answers the CEO's first question: does the fix just move the problem?
8. **Days into dollars.** A calendar fills one day at a time while a counter runs 35 × $18,400. Pick an option, and the calendar empties and the counter runs back down.
9. **Layers on top (Three.js).** An exploded stack of thin slabs labelled P6, SAP, Oracle, Procore and Excel. A single Resonance layer settles on top, and fine threads read down into each slab. The stack closes flat and hands off to the DOM. Message: nothing is replaced.
10. **Solver beside chatbot.** Split screen with the same question on both sides. On the left, a fluent paragraph streams in. On the right, the calculation builds line by line with record IDs. Then "Source?" appears under each side: the left greys out and the right lights its IDs.

## C. The record (the part buyers keep)

11. **Inbox to record.** Six columns of emails, PDFs, schedule rows and spreadsheet cells. The relevant facts lift out and fly into one decision record, DR-3105, and everything else fades.
12. **The signature.** The owner's role inks onto the record and a timestamp prints. A thin "append only" rule locks under it. This is the one moment of weight on the page.
13. **Every number has a home.** Hover or scroll across the options table and each figure draws a line to its source ID (ENG-117, LOG-061 and so on), like footnotes that move.
14. **Whose day is it.** One timeline splits into two lanes, the owner's and the contractor's. Delay days drop into the right lane, each with its reason and notice NTC-014. (Needs a founder's yes on the claims framing.)

## D. Hero and page-level moments

15. **The hall in section (Three.js).** A clean line axonometric of a 32 MW hall. The switchgear room stays empty while the date counts past 14 May. When the lineup arrives, the rooms light up in sequence down to handover. Built from the product's own world, drawn as engineering line work rather than shiny CG.
16. **The headline turns into data.** The H1 resolves word by word into the product: "late delivery" becomes the tag SG-B02 +35 d, "costs you" becomes $18,400 a day, and "fixes you can build" becomes three option chips. The hero shows the product without a screenshot.
17. **Portfolio at altitude.** Three abstract project marks (Heron, Wren, Ibis), with no real map. Heron turns amber, a line arcs over from Wren carrying the lineup, and both settle back to on-target.
18. **Product reel, Pallet-style.** The real interface assembles itself, with no mouse cursor. Panels slide in and settle, and numbers resolve on the slip, the options, the approval and the record. It loops in about 12 seconds.
19. **The week, then and now.** Two calendar rows. The top row shows the slip email on Monday, a meeting on Thursday and a decision the next week. The bottom row shows the same slip handled the same day. (Speed claim needs a founder's yes.)
20. **Bring one package (the CTA).** A single package card drops into a frame, and a decision record slides out the other side. The form fades in under it.

## Recommended first five to prototype in a motion lab

1. **16, the headline turns into data.** This is the hero. It explains the product in three seconds with no screenshot.
2. **3, the ripple.** It is the core idea that one change touches everything linked to it.
3. **5, the gates.** It shows "fixes you can build" and quietly answers the chatbot question.
4. **9, layers on top.** It is the one place Three.js earns its cost, and it kills the rip-and-replace fear.
5. **11 into 12, inbox to the signed record.** It ends the story on something the buyer keeps.

For a 30-second film made from the same scenes for sales emails and LinkedIn, the `motion-reel` skill can render 16, 3, 5 and 12 as MP4s in wide, vertical and square.

## Added 26 Oct after the founder-meeting summary: platform scenes

21. **Agents read the export.** A messy SAP export and an Excel sheet scroll in as they are. Agents match the columns, flag two conflicts in amber, tick each check, and drop the clean records into the model. This explains data agents and evals without either word.
22. **One engine, different industry.** The same four parts (agents, model, solvers, app) stay fixed while the nouns change: packages and crews become orders and lanes, then work orders and sites. This explains the platform and the industry row together.
23. **The rule you can relax.** From the distribution app: a service target blocks a plan, and the solver shows which rule to loosen and what it costs. This is the solver's "why".

How the motion maps to the v4 page:
- **Hero:** 16, headline into data (data center version) or 21.
- **How it works:**
  - Data agents: 21.
  - Your industry's model: 2, the link web, then 4, base and exceptions.
  - Solvers: 5, the gates.
  - Decision apps: 11 into 12, inbox to signed record.
- **Worked example:** 3, the ripple.
- **Why not a chatbot:** 10, solver beside chatbot.
- **Your systems stay:** 9, layers on top.
- **Industries row:** 22.
