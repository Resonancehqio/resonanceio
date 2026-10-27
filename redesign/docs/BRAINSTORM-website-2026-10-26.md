# Resonance website brainstorm, 26 Oct 2026

This is a record of one long working session. Ray was not wowed by any of the design directions. He will start a clean chat with a new design goal. Use this file as background, not as a brief to repeat.

## What held up

1. **Ray's own copy is the baseline.** It is the "Bold homepage draft" he generated with another AI, and it is built in `mockups/home-v5/index.html`. Claude made only these edits:
   - "one source of truth" became "align every team on the same facts", because the phrase is on the banned list;
   - "Pricing" was dropped from the nav, since the site shows no prices.
   
   Ray called the build "so much better". Claude's own copy attempts (v3 and v4 in `mockups/COPY*.md`) were rejected as "horrible". Do not rewrite Ray's copy unasked. Flag rule conflicts instead.
2. **Ray loves the motion ideas** and wants them used in the final site. The list is `mockups/MOTION-IDEAS.md`: 23 ideas, mapped to page sections. Working prototypes:
   - The motion lab: https://claude.ai/artifact/FvUe2saq1YjKNScgiGtjNo. It has the headline-to-data scene, the ripple, the gates, the Three.js layers and inbox-to-record.
   - The homepage with motion: https://claude.ai/artifact/3NCeDX5iwKde6ULo8mdho8. It has a hero loop, a Three.js platform stack, a pinned three-step "How it works", EPC, data center and supply chain scenes, and a cost bar.
3. **The founder-meeting summary is the product truth.** Resonance is a platform made of four parts:
   - data agents that read ERP and Excel exports as they are;
   - an industry ontology;
   - solvers;
   - decision apps.
   
   EPC and data centers lead, with supply chain and facilities alongside. The language model is a small part of the work: $1.17 against about $300 in one sample plan, and it needs Sushanth's OK before it is published.

## What did not land (do not repeat)

- **Round 1, ten layout mockups** (`mockups/01-10*.html`): one design system across all ten. The copy was too clever ("late at the seams").
- **Round 2, ten "themed" brands** (`mockups/brands/`): Title Block, Broadsheet, Swiss Index, Private Bank, Locate Paint, Cyanotype, Cast Concrete, Color Field, Rose Clay and Instrument Manual. They were distinct, but read as costume or editorial. Gallery: https://claude.ai/artifact/PGgTq6wAJiYKvawWReLtPx
- **Round 3, ten "classy, clean" re-skins of home-v5** (`mockups/brands-v2/`): Midnight, Porcelain, Graphite & Copper, Alpine, Cobalt, Sandstone & Teal, Aurora Soft, Monochrome, Bordeaux and Steel & Amber. Ray was not wowed. Likely reason: each one kept the same layout and the same product-UI stages and changed only the palette and font. That is a re-skin, not a brand idea. A new round needs a stronger design concept, not new colours. Local preview: `python3 -m http.server 8766 --directory mockups/brands-v2`.
- **The split-flap "Delivery Board"** and the other early themed mocks were rejected before this session.

## Rules that still apply

- No customer or prospect names on the site. The meeting names (CyrusOne, Related Digital, Hershey, Discount Tire and others) stay internal.
- No team bios, names or photos. One founder cannot be identified publicly yet.
- No prices.
- No statistic without a linked source. Don't use "<2% of AI in production at banks", BofA's "1,900 agents" or "$14.2M a month".
- All sample data is fictional and labelled. The world is in `mockups/CONTENT.md`:
  - companies: Kessrow Digital, Tamberlane Constructors, Norvale Electric;
  - projects: Heron, Wren, Ibis;
  - the slip: SG-B02 is 35 days late, Hall B handover moves from 14 May to 18 Jun 2027;
  - record DR-3105.
- No Alder Creek and no real places.
- Copy never says the model "decides".
- Avoid these phrases: AI-powered, insights, single source of truth, copilot, digital twin, intelligent automation, seamless.
- No dark-neon, no gradient text, no stock photos of servers or trucks.
- Animation should follow Ray's "temple method" (see the global CLAUDE.md): one 0 to 1 progress value, smoothstep stages, Three.js where depth helps, and stills for Reduce Motion.

## Research worth reusing (`reports/copy/`)

- `voice-of-customer.md`: 71 verbatim lines from contractor 10-Ks, earnings calls and law-firm articles on delay, LDs, claims and labour, plus a vendor-speak to buyer-speak table. The quotes were extracted by a summariser, so spot-check them before quoting live.
- `objections.md`: the top 8 buyer objections with short answers.
- `positioning.md`: 35 category lines and 24 headlines with a five-second test. The copy built from these was rejected, so use it as raw material only.
- `brand-directions.md`: the round 2 brand specs.
- `reports/critique-epc-ceo.md`: an EPC CEO's view, sourced from 10-Ks. Its main points: speak claims, notice and margin; a chatbot argument wins only the CIO; offer one working session.

## Open founder confirmations

- Publishing $1.17 and about $300 (Sushanth).
- Product claims: "recommends actions", "export outputs back into the tools teams already use", and a refused-option capability (Sushanth).
- A public link for the demo video (Sushanth).
- Naming. Options are in `mockups/COPY-v4.md`. The recommendation was Resonance plus apps named by their job; Decision OS was flagged as sounding like rip-and-replace (Ray).
- Pilot wording: paid pilot, one site, KPIs agreed up front (Ray, Sean, Sushanth).

## Suggested opening for the new chat

"Read BRAINSTORM-website-2026-10-26.md for background. Copy: Ray's Bold homepage draft (built in mockups/home-v5). Motion: keep the MOTION-IDEAS scenes. New design goal: [Ray's goal]. Not wanted: re-skins of one layout, themed costume, editorial, avant-garde."
