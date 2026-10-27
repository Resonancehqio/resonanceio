# Resonance: Ten Divergent Brand Directions

Brief to the front-end builder. Written as a brand identity director would brief a design team. Every direction is buildable from Google Fonts, CSS and inline SVG. No direction uses IBM Plex, paper #F5F4F0 or redline #C8361E. No direction uses red as its signal color.

## 0. How this brief was made (the studio habits)

1. Strategy axes before aesthetics. Three axes (section 1) were chosen first, the ten directions were placed on a grid so each is at least 2.0 units from every other, and only then were type and color chosen.
2. Type as the brand's voice. Each direction has a different primary typeface and a stated reason: what the face says about who is talking (a drafter, an editor, a banker, a surveyor, a lab).
3. One ownable device per direction. A device is a repeatable shape or rule that works without the logo: a title block, a dateline, a paint line, a tie-hole grid. If you cover the wordmark and the page is still recognizable, the device works.
4. Real references outside software. Each direction cites studios, print publications, products or standards documents, so the builder can look at actual artifacts.
5. Test at two sizes before approval. Every direction has a thumbnail test (the card at 320 px wide in a grid of ten) and a phone test (390 px viewport) that the builder must pass.
6. Shared facts, divergent skin. All ten show the same product truth (a late-switchgear change, handover date and money effect, recovery options, sources, owner, record). Sample data follows the project's fictional world in mockups/CONTENT.md. Never use real place names or Alder Creek.
7. Hard rules for all ten: no gradient text, no neon, no cyber look, no themed-world pastiche (no station, control room or cockpit), no stock photos of servers, trucks or hard hats, no purple SaaS gradient. WCAG AA contrast (4.5:1 body text, 3:1 large text and UI) is required on every foreground/background pair listed.

Positioning line all ten must carry: Resonance shows what a project change does to handover date and money, computes the recovery options with real math, ties every number to a source, routes the decision to its owner, and keeps the record.

---

## 1. Strategy map

Three axes, each scored -2 to +2.

- T, Temperature: -2 cold (blue-grey, steel, lab) to +2 warm (clay, paper, brass, paint).
- V, Volume: -2 quiet (restraint, whitespace, low contrast of ornament) to +2 loud (saturated field, huge type, hard edges).
- E, Voice: -2 engineered (drawing, spec, instrument) to +2 editorial (publication, essay, narrative).

| # | Direction | T | V | E | Background family |
|---|-----------|---|---|---|-------------------|
| 1 | Title Block | 0 | -1 | -2 | Vellum grey-green, light |
| 2 | Broadsheet | 1 | 0 | 2 | Newsprint cream, light |
| 3 | Swiss Index | -1 | -1 | 0 | Pure white, light |
| 4 | Private Bank | 1 | -2 | 1 | Deep forest green, dark |
| 5 | Locate Paint | 2 | 2 | -2 | Survey yellow, saturated |
| 6 | Cyanotype | -2 | 0 | -2 | Prussian blue, saturated dark |
| 7 | Cast Concrete | -1 | 2 | -2 | Mid grey, mid-tone |
| 8 | Color Field | 0 | 2 | 1 | Deep teal, saturated |
| 9 | Rose Clay | 2 | -2 | -1 | Pale clay pink, light |
| 10 | Instrument Manual | -2 | -2 | -2 | Icy grey-blue, light |

Spread: 3 light-warm (2, 9 plus 1 neutral), 2 light-cold (3, 10), 1 mid-tone (7), 4 dark or saturated (4, 5, 6, 8). Quiet end holds 4, 9, 10, 1, 3. Loud end holds 5, 7, 8. Engineered end holds 1, 5, 6, 7, 10. Editorial end holds 2, 4, 8.

---

## 2. The ten directions

---

### 1. TITLE BLOCK

**One-line idea.** Resonance behaves like a controlled drawing sheet: every page has a border, a zone grid and a title block that states who issued it, what revision it is and what changed.

**Who it's for / why it could win.** COOs and project executives who live in drawing sets and RFIs. The sheet convention (revision, issued by, checked by, date) is the exact accountability language of the product, so the brand is evidence that Resonance understands construction records. Risk: could read as dry. It wins on trust.

**References.** ISO 7200 title block standard and any AIA/ISO drawing sheet; Edward Tufte's books (Graphics Press); NASA Graphics Standards Manual (Danne & Blackburn, 1975); Experimental Jetset's catalog covers; Letterform Archive's drafting-specimen sheets.

**Typefaces (Google Fonts).**
- Display and UI: Archivo, variable. Headlines weight 600 at width 125 (wdth axis) uppercase for labels, weight 500 width 100 for headings. Body weight 400 width 100.
- Data and labels: DM Mono, weights 400 and 500.
- Scale: 12, 14, 16, 20, 28, 44, 72 px. Headings sentence case, tracking -0.01em. Labels uppercase, 11 px, tracking 0.12em.

**Palette.**
- Vellum (page) #E8E4D4
- Sheet (panels, cards) #F6F4EA
- Ink (text, rules) #1B1D1A
- Graphite (secondary text) #4F5349
- Rule (hairlines) #B9B5A2
- Revision (the only accent: changed values, current revision) #98481A

**Wordmark.** "RESONANCE" in Archivo 600, wdth 125, uppercase, letter-spacing 0.14em, 20 px, color Ink. Placed inside a 1 px Ink rectangle with 10 px by 16 px padding. Above it, inside the same box, a 9 px DM Mono caption "ISSUED FOR DECISION" in Graphite, with a 1 px Ink rule separating the two lines (a miniature title block cell). Compact version: the box with wordmark only.

**Grid and layout.** 12 columns, 24 px gutters, max width 1200 px. The whole viewport carries a 1 px Ink sheet border inset 16 px. Along the top and left of the border run zone marks: letters A to F down the left, numbers 1 to 12 across the top, DM Mono 10 px, tick marks every column. Sections are separate "sheets" divided by a full-width double rule (1 px, 3 px gap, 1 px). Every section ends in a title-block strip: a row of cells (SECTION, REV, DATE, OWNER) with 1 px vertical dividers. Left-aligned, ragged-right text, measure 62 characters.

**Signature device.** The title block and revision table. Used as footer on every section, as the header of every product panel, and as the "record" in the product (REV 03, CHANGED, BY, SOURCE).

**Charts, product UI, data.** Schedules are Gantt-style bars drawn with 1 px Ink outlines and 45 degree hatch fill (SVG pattern, 4 px pitch, 1 px lines) for float, solid Ink for critical path. Changed values and the current revision use Revision #98481A with a revision triangle (8 px SVG triangle containing the revision number) beside the value. Tables are ruled with hairlines only, no zebra, no cell fills; numerals in DM Mono tabular. Source tags are leader-line callouts: a 1 px line from the number to a small circle containing a number, keyed to a source list in the title block. Charts have axis ticks and dimension-style labels, no gridlines other than the zone grid.

**Photography / illustration.** Only line drawings and scanned-paper details: crops of real drawing conventions redrawn in SVG (grid bubbles, section marks, north arrow). If photography appears, it is of paper documents, markup and plotter output, desaturated, with a 1 px Ink frame. Never site photography with people or equipment.

**Motion.** Mechanical and quick: a drawn line extends from left to right at 300 ms linear; revision triangles stamp in with a 120 ms scale from 0.9 to 1. No easing flourishes, no parallax. Reduced motion: final state, no draw.

**Never.** Blueprint blue (that belongs to direction 6); rounded cards; shadows; color fills on tables; decorative CAD clutter that has no meaning; more than one accent.

**Thumbnail test.** A framed sheet with a boxed wordmark top left and a title-block strip bottom right. **Phone test.** Zone letters drop; border inset shrinks to 8 px; title-block strip becomes a 2 by 2 cell grid.

---

### 2. BROADSHEET

**One-line idea.** Resonance reports on your project the way a financial newspaper reports on a company: a masthead, a lead story, numbers in columns, and corrections stated openly.

**Who it's for / why it could win.** CEOs and CFOs who read the FT, WSJ and The Economist daily and trust that tone. A change to a project is news with a consequence, so a newspaper format makes the product narrative natural: headline (what changed), standfirst (what it costs), body (options), correction (revised numbers). Skeptical buyers trust prose and named sources.

**References.** Financial Times, The Economist print edition layout, Wall Street Journal page one, Bloomberg Businessweek (reference for what to avoid in shock level), Monocle, The Pudding for data essays, Pentagram's Michael Bierut Harvard Business Review redesign work, Mark Porter's Guardian Berliner redesign (2005).

**Typefaces (Google Fonts).**
- Display and body: Source Serif 4, variable with opsz. Headlines weight 700, opsz 60, tracking -0.02em, line height 1.05. Body weight 400, opsz 16, 18 px, line height 1.55.
- Labels and UI: Public Sans, weights 500 and 600, uppercase 11 px labels with 0.08em tracking, and 400 at 14 px for captions.
- Numerals: Source Serif 4 tabular lining figures (font-variant-numeric: tabular-nums lining-nums).

**Palette.**
- Newsprint (page) #F2E8D5
- Page light (cards, inset) #FAF4E6
- Ink (text, rules) #1A1612
- Muted (captions, bylines) #6B5F4F
- Editor's blue (links, section labels) #1F3A5F
- Marker (highlight behind changed figures) #E9D18A

**Wordmark.** "Resonance" in Source Serif 4, weight 700, opsz 60, 48 px, tracking -0.02em, centered on the masthead. Above and below it, a rule pair: 3 px Ink over a 1 px Ink with 3 px gap. A dateline row beneath in Public Sans 11 px uppercase, tracking 0.1em: "PROJECT RECORD · EDITION OF [DATE] · DECISIONS OPEN: 3". On scroll, collapses to the 22 px wordmark left with the date on the right.

**Grid and layout.** 6-column newspaper grid, 20 px gutters with 1 px Ink vertical column rules between columns (hairline #1A1612 at 40 percent). Lead story spans 4 columns, sidebar 2. Text is justified only in columns narrower than 280 px with hyphenation on; otherwise left-aligned. Drop cap on the lead paragraph (Source Serif 4 weight 700, 3 lines tall). Sections separated by a 1 px Ink full-width rule and a Public Sans label.

**Signature device.** The "correction" convention and the standfirst. Old numbers appear struck through in Muted with the revised number beside them on a Marker highlight (the newspaper correction). Every story has a slug line (e.g. SWITCHGEAR · SCHEDULE) in Editor's blue above the headline.

**Charts, product UI, data.** Charts are Economist-style: horizontal hairline gridlines in Ink at 25 percent, a thick 2 px series line, direct labels instead of legends, a single Ink "red-tag" bar at the chart top is replaced by a 24 px by 4 px Editor's blue tab. Tables are ruled by top and bottom 1.5 px Ink and thin row rules, numerals right-aligned, headers in Public Sans caps. Changed cells get a Marker background. Sources appear as footnote numerals (superscript, Editor's blue) with a "Sources" list at the bottom of each panel in 12 px Public Sans.

**Photography / illustration.** Black and white halftone-style illustrations rendered from SVG (dot screen pattern at 3 px) for abstract subjects; photographs only of documents and drawings, in grayscale with a caption line under in Public Sans 12 px with credit. No lifestyle imagery. Pull quotes in Source Serif 4 italic 28 px between rules.

**Motion.** Almost none. Page-load: headline fades in 200 ms. Number corrections: the old number gets its strike drawn left to right in 250 ms, then the new number appears with the Marker bar wiping in 300 ms. No scroll triggers.

**Never.** Salmon-pink paper (that is the FT's property); serif display used at light weights; tabloid shouting; stock "business meeting" photos; sans-serif body.

**Thumbnail test.** Double-ruled masthead with a serif wordmark, columns of text below. **Phone test.** Single column; rule pair stays; dateline drops to two lines; column rules vanish.

---

### 3. SWISS INDEX

**One-line idea.** A rigorous International Typographic Style system: white page, one typeface, one green, big numerals, and strict flush-left alignment, as if designed in Zurich in 1962 and updated.

**Who it's for / why it could win.** Buyers who distrust decoration and prize clarity. Pure white and Helvetica-lineage type read as neutral, honest and adult, in the lineage of Swiss rail, banks and pharmaceuticals. It is the safest direction that still looks designed.

**References.** Josef Muller-Brockmann posters and Grid Systems in Graphic Design (1981); Armin Hofmann; Karl Gerstner's Programme; Experimental Jetset; Swiss Federal Railways wayfinding; Wim Crouwel's Stedelijk catalogs; Collins's identity work for restrained clients; Neue Haas Grotesk specimen books.

**Typefaces (Google Fonts).**
- Everything: Inter Tight, variable. Display weight 600, tracking -0.04em, line height 0.95. Headings weight 600, -0.02em. Body weight 400, 17 px, line height 1.5. Labels weight 500, 12 px, tracking 0.02em, never uppercase.
- Numerals: Inter Tight with font-feature-settings "tnum", "ss01" off; tabular always in data.
- Scale (modular 1.5): 12, 17, 26, 38, 57, 86, 128 px.

**Palette.**
- White (page) #FFFFFF
- Black (text) #0A0A0A
- Grey (secondary text) #6E6E6E
- Hairline #D9D9D9
- Signal green (the only color) #087A4F
- Tint (very light green for selected rows) #E6F2EC

**Wordmark.** "resonance." lowercase in Inter Tight 600, tracking -0.04em, 26 px, Black, with the full stop in Signal green (the period reads as "decision made"). On large heroes, 128 px with the period 1.15 times larger than the type's native size.

**Grid and layout.** 12 columns, 24 px gutters, 80 px outer margins, baseline grid 8 px. Everything flush-left, ragged-right; text never centered. Text lives in the left 5 columns; the right 7 hold data or whitespace. Giant section numerals (128 px, weight 600, Black) mark each section as "01", "02" and sit in column 1 with the title in columns 3 to 7. Large empty areas are intentional.

**Signature device.** The delta bar: a single horizontal Signal-green bar, 12 px tall, whose length is proportional to the effect (days or dollars). It appears in headlines (a bar under the key number), in tables (one bar per row) and as a divider. Alongside it, big numerals as the primary graphic.

**Charts, product UI, data.** Charts use only Black, Grey and Green: Black for plan, Grey for prior, Green for recovery. Bar charts with no axes lines, values printed at the end of each bar in Inter Tight 600. Tables have no vertical rules and no row fills, only Hairline row dividers; the selected row has Tint. Buttons are rectangles with 0 radius: primary is Green fill with White text (contrast 5.4:1), secondary is 1 px Black outline. Source references are plain superscript numerals in Black linked to an index in the right margin.

**Photography / illustration.** Mostly none. When used: large, high-contrast black and white photographs of concrete or steel construction details in the Swiss documentary tradition, full-bleed on 6 columns, no overlaid text. No icons beyond arrows and simple geometric marks.

**Motion.** Linear and exact. Numerals count by a stepped tick (no easing) over 400 ms; delta bars grow from left in 350 ms with cubic-bezier(0.2, 0, 0, 1). Nothing bounces.

**Never.** Centered text; drop shadows; rounded corners; a second accent color; icon sets; uppercase headlines.

**Thumbnail test.** Huge number, a short green bar, white. **Phone test.** Single column; numerals scale to 64 px; delta bars span full width.

---

### 4. PRIVATE BANK

**One-line idea.** Resonance as a trust institution: deep green, ivory, brass and a serif that has outlived several recessions. Quiet confidence and the feeling of a ledger.

**Who it's for / why it could win.** CFOs and owner-developers handling large sums who judge a vendor by whether it looks like it will exist in 20 years. Counters the "startup" flavor of AI tools. Its risk is stuffiness, handled by crisp data UI.

**References.** Hermes and Aesop restraint; private banks (Lombard Odier, Julius Baer print collateral); Brunello Cucinelli; The Financial Times How To Spend It; Pentagram's work for Rizzoli and Sotheby's; Hoefler and Co. specimen booklets; Berkeley Graphics editions; Mack Books bindings; ledger books and bank passbooks.

**Typefaces (Google Fonts).**
- Display and body: EB Garamond, weights 400 and 500, italic 400. Headlines 500, 56 px, line height 1.05, tracking -0.01em. Body 400, 19 px, line height 1.6.
- Labels and navigation: Jost, weight 400, uppercase, 11 px, tracking 0.2em.
- Data: Spline Sans Mono, weight 400, 14 px, tabular.

**Palette (dark).**
- Forest (page) #0E2A23
- Panel #143830
- Ivory (text) #EFE8D6
- Mist (secondary text) #A9B5AB
- Brass (accent, rules, links) #C2A15A
- Rule (hairlines on dark) #2D5247

Contrast: Ivory on Forest 12.6:1; Brass on Forest 6.3:1; Mist on Forest 6.1:1.

**Wordmark.** "RESONANCE" in EB Garamond 500, uppercase, tracking 0.28em, 20 px, Brass. Centered above a Brass 1 px rule 40 px wide, 8 px beneath the word. In the footer the wordmark is Ivory at 70 percent opacity. The rule echoes a gilt line on a ledger page.

**Grid and layout.** 12 columns but a centered single reading column of 640 px dominates; wide data panels extend to 960 px. Generous vertical rhythm, 128 px between sections. Sections open with a Brass double rule (1 px, 4 px gap, 1 px) 80 px wide. Headlines are sentence case, never all caps. Left margin carries numbered marginal notes (1, 2, 3 in brass) aligned to the paragraph that cites them.

**Signature device.** The marginal note and gilt rule. Every claim carries a brass numeral that opens a note in the margin giving the source (document, page, date). The idea of "every number tied to a source" becomes the visual rhythm of the page.

**Charts, product UI, data.** Panels are Panel #143830 with 1 px Rule borders and 2 px radius. Tables in Spline Sans Mono on Panel, header row in Jost caps, row rules in Rule. Changed values in Brass with a small brass tick mark beside them. Charts use thin 1.5 px lines in Ivory, Brass for the revised path, Mist for the prior; no fills. Buttons: Brass outline with Brass text, filling to Brass with Forest text on hover. Dates and money set in tabular figures with thin spaces for thousands.

**Photography / illustration.** Still-life photographs of paper and materials in warm side light (a ledger, stamped pages, a brass seal impression, cut stone), dark backgrounds, shallow depth. If none are available, use engraved-style line ornaments (guilloche rosette patterns in SVG at 6 percent opacity as page texture). Never a handshake, never a skyline.

**Motion.** Slow and deliberate: fades of 500 ms, vertical translate of 8 px. Brass rules draw from the center outward in 600 ms. Reduced motion removes translates.

**Never.** Bright whites; sans-serif headlines; gold gradients (brass is flat); crests, shields, coats of arms; "premium" skeuomorphism like faux leather.

**Thumbnail test.** Dark green field, tiny brass wordmark with rule, one serif line. **Phone test.** Margin notes collapse into inline superscript numerals with an expandable note under the paragraph; body 18 px.

---

### 5. LOCATE PAINT

**One-line idea.** The brand is the language of marks painted on the ground before work begins: survey yellow, dashed lines, flags and arrows that say "this is where, this is how far".

**Who it's for / why it could win.** Field-minded EPC CEOs who respect superintendents more than consultants. The visual comes from actual construction practice (utility locate marks, survey paint, layout lines), so it reads as built by people who know the work. It is the loudest direction and the clearest differentiator in a sea of grey software. It is a visual language, not a world: no staged site scenes.

**References.** APWA uniform color code for utility locates (the real standard: yellow gas, red electric, blue water, green sewer, pink survey); survey stake and lath marking conventions; Stripe Press for one-color discipline; Dutch road signage; Big Shoulders as a Chicago municipal typeface project.

**Typefaces (Google Fonts).**
- Display: Big Shoulders Display, weights 800 and 900, uppercase, tracking 0.01em, line height 0.9. Hero 120 px desktop, 64 px phone.
- Body and UI: Work Sans, weights 400, 500 and 600, 17 px, line height 1.5.
- Data: Work Sans with tabular-nums; labels in Big Shoulders Display 700 uppercase 14 px.

**Palette (saturated page).**
- Survey Yellow (page) #F2C230
- Ink (text, heavy rules) #111111
- Chalk (cards) #FFF4C2
- White #FFFFFF
- Mark Blue (secondary signal) #1E4FB5
- Mark Green (positive/recovery) #1A7A3A

Contrast: Ink on Yellow 12.8:1; Mark Blue on Chalk 7.1:1; Mark Green on Chalk 5.4:1; Mark Blue on White 8.4:1. Never set Blue or Green text on Yellow.

**Wordmark.** "RESONANCE" in Big Shoulders Display 900, uppercase, 36 px, tracking 0.02em, Ink. Beneath it, a 4 px Ink line with stroke-dasharray "14 8", stroke-linecap round, the same width as the word (an SVG line). The dash pattern is the logo's second half. On Ink backgrounds it inverts to Yellow type and Yellow dashes.

**Grid and layout.** 12 columns, 16 px gutters, 32 px margins. Heavy, poster-like blocks: sections alternate full-bleed Yellow and full-bleed Ink bands (Ink band with Yellow text). Hero headline spans the full width and may break across 3 lines. Content cards are Chalk with a 3 px Ink border and 0 radius. Section dividers are 6 px dashed Ink lines. Asymmetric: image or data block hangs off the right edge.

**Signature device.** The paint line: thick dashed Ink or colored lines (6 px, dasharray "18 10", round caps) used as dividers, underlines, connectors between a change and its effect, and borders. The flag: a small 14 px square on a 2 px stake, in Mark Blue or Mark Green, pinned to a data point to mark "recovery option" or "owner".

**Charts, product UI, data.** The schedule is drawn as a ground plan: thick horizontal paint lines on Chalk, each task a dashed segment; critical path in solid Ink; slip drawn as a dashed Mark Blue extension with an arrow end. Money as stacked heavy bars, 24 px tall, with 3 px Ink outlines and no gradients. Tables have 2 px Ink row rules, Big Shoulders caps headers, and big numerals (Big Shoulders 800, 40 px) for the key figure. Recovery options are numbered flags (1, 2, 3) with the best option's flag in Mark Green. Source tags: small Ink pill labels "SRC 14" with 2 px border.

**Photography / illustration.** Flat-colour spot illustration only, drawn in SVG: arrows, stakes, flags, dimension marks, pavement-marking patterns (crosswalk stripes at 45 degrees). Photography allowed only as high-contrast duotone (Ink and Yellow) crops of paint marks, tape, string lines and survey lath; no people, vehicles or hard hats.

**Motion.** Bold and fast, like paint being laid down: dashed lines animate stroke-dashoffset in 400 ms ease-out; headlines slide up 24 px in 250 ms. Flags drop in with a 150 ms translate. Reduced motion: static.

**Never.** Hazard-stripe borders everywhere (use once, if at all, for the primary alert); orange, red or black-and-yellow "warning" tape as decoration; gradients; thin weights; blue/green text on Yellow; hard-hat or equipment photos.

**Thumbnail test.** A yellow tile with Ink block caps and a dashed line. **Phone test.** Headline 64 px; paint lines remain 4 px; Ink and Yellow bands stack full width.

---

### 6. CYANOTYPE

**One-line idea.** White line on Prussian blue, the look of a diazo/cyanotype print of a drawing, set in a monospaced engineer's hand. The product is the print of record.

**Who it's for / why it could win.** Owners and EPC leaders with an engineering background who respect the plan room. It is cold, dense and technical without the glow of dark-mode SaaS: the blue is matte and the lines are paper-white, not neon. It speaks to "real math" and "source for every number".

**References.** Anna Atkins's Photographs of British Algae: Cyanotype Impressions (1843, first book illustrated with photographs); architectural diazo and blueline prints; Le Corbusier's Modulor drawings; Buckminster Fuller's Dymaxion drawings; Apollo-era flight-plan books; Pentagram's Michael Gericke work for technical clients; Dinamo's Typewriter specimens; Stripe Press's Elon Musk and Boom covers for the discipline of one-color print.

**Typefaces (Google Fonts).**
- Display and labels: Azeret Mono, weights 400 and 500, lowercase for headlines (60 px, tracking -0.03em, line height 1.05), uppercase for labels (11 px, tracking 0.1em).
- Body: Atkinson Hyperlegible, weights 400 and 700, 17 px, line height 1.55.
- Data: Azeret Mono 400, tabular by nature.

**Palette (saturated dark).**
- Prussian (page) #123A63
- Deep (panels, wells) #0C2A4A
- Print White (lines and text) #E8F1F8
- Blue Mid (secondary lines, grid) #8FB3D1
- Blue Muted (gridlines, disabled) #5F87AD
- Chalk Yellow (changed values, selection; an exposure-correction pencil mark) #F2E6A0

Contrast: Print White on Prussian 9.6:1; Blue Mid on Prussian 4.6:1; Chalk Yellow on Prussian 8.3:1. Blue Muted is only for decorative gridlines.

**Wordmark.** "resonance" lowercase in Azeret Mono 500, 22 px, tracking 0.02em, Print White. Surrounded by four SVG crop-mark corners (each an L shape, 8 px arms, 1.5 px stroke, Blue Mid, offset 6 px from the text box) like a registration frame. Compact version: just "r" with corner marks.

**Grid and layout.** The whole page background carries a faint drawing grid: 1 px lines in Blue Muted at 25 percent opacity every 24 px, with heavier lines every 120 px at 40 percent. Content snaps to the 24 px grid. 12 columns, 24 px gutters. Sections are separated by a thin Print White rule with dimension ticks at both ends and the section name in the rule's middle in Azeret Mono caps. Margins carry running sheet numbers ("SHT 04").

**Signature device.** The dimension chain: a thin line with arrowheads and ticks and a measurement in the middle (e.g. "+34 d"), drawn above or below bars and blocks. It carries every delta in the brand: days, dollars, floats. Leaders (a line with a circle) tie each figure to a source.

**Charts, product UI, data.** Everything is line art in Print White on Prussian: no filled bars (use hatch fills, 45 degree 1 px lines, 4 px pitch); axes are dimension lines; critical path is a double line; the changed element is outlined in Chalk Yellow with a revision cloud (scalloped SVG path). Tables are Deep panels with 1 px Blue Mid borders, Azeret Mono numerals right-aligned, header row in caps. Sources appear as numbered balloons (16 px circles, 1 px Print White) with leader lines. Buttons: 1 px Print White outline, sharp corners, fills Print White with Prussian text on hover.

**Photography / illustration.** Cyanotype treatment only: any image is converted to a two-tone (Prussian and Print White) photogram, from botanical specimens, drawings, paper fragments, tools laid flat. No full-color photographs. Use SVG line illustrations (isometric sketches of simple parts: valve, breaker, bolt) at 1.5 px stroke.

**Motion.** Plotter-like: lines draw at constant speed (stroke-dashoffset, 500 ms linear) and dimension ticks pop in after; sections fade in 200 ms. Reduced motion: no draw.

**Never.** Glow, bloom, scanlines, matrix rain, cyan on black; any neon blue (keep #123A63 matte); gradients; green terminal text; "hacker" mono headings in uppercase.

**Thumbnail test.** Blue field, crop-marked lowercase mono wordmark, a dimension line. **Phone test.** Grid pitch stays 24 px; dimension chains stack vertically; headline 36 px.

---

### 7. CAST CONCRETE

**One-line idea.** Heavy, monolithic, board-formed: mid-grey ground, massive stacked black type, and a field of formwork tie-holes. It feels poured, not designed.

**Who it's for / why it could win.** Construction CEOs who build with concrete and steel and distrust anything polished. Brutalist graphics read as honest and strong; the brand says "we hold weight". A distinct choice in a category that defaults to white and blue.

**References.** Brutalist architecture: Marcel Breuer's Whitney, Tadao Ando's tie-hole walls; Paul Rudolph's Yale Art and Architecture Building; Brutalist Websites collection (brutalistwebsites.com); Pentagram's Eddie Opara for bold type; Studio Dumbar; Zurich's Gta Verlag book covers; Wolfgang Weingart; MIT Press jackets by Muriel Cooper.

**Typefaces (Google Fonts).**
- Display: Schibsted Grotesk, weights 800 and 900, uppercase, tracking -0.03em, line height 0.85. Hero 96 to 200 px, clamp(64px, 14vw, 200px).
- Body: Schibsted Grotesk 400 and 500, 17 px, line height 1.5.
- Data: Martian Mono, weights 400 and 500, 13 px, tabular.

**Palette.**
- Concrete (page) #C7C5BE
- Slab (cards, blocks) #DAD8D1
- Black (type, hard rules) #111111
- Shadow (secondary text) #3F3E3A
- Cement Light (light slab for contrast) #F4F3EF
- Ultramarine (the single accent) #2A3BB8

Contrast: Black on Concrete 10.5:1; Shadow on Concrete 6.0:1; Ultramarine on Slab 6.3:1; Ultramarine on Concrete 5.0:1.

**Wordmark.** Two stacked lines, "RESO" over "NANCE", Schibsted Grotesk 900, uppercase, 44 px, tracking -0.03em, line height 0.85, left aligned, Black. Optional: a 6 px by 6 px Black dot (a tie-hole) after "NANCE". The horizontal nav version is a single line "RESONANCE" at 20 px.

**Grid and layout.** 8 columns, 0 gutters in blocks (blocks touch, separated by 3 px Black rules, like formwork seams), 24 px content padding. Hero headline is stacked, clipped at the page edge intentionally, with words broken across lines. Sections are slabs with hard rectangular edges and different heights. Whole-page background carries a tie-hole pattern: circles 8 px diameter in Black at 10 percent, on a 96 px square grid, offset by 48 px every other row. A very light horizontal board-mark texture (1 px lines at 3 percent every 24 px) is optional.

**Signature device.** The tie-hole grid and the slab. Tie-holes also mark data: one hole filled Ultramarine marks the focus point. Slabs have hard 3 px Black borders and 0 radius.

**Charts, product UI, data.** Blocky: bar charts are solid Black bars with 0 gap, labeled in Martian Mono; the revised bar is Ultramarine. Schedules are horizontal slabs stacked like formwork lifts; slip drawn as a hatched Ultramarine slab. Tables have 3 px Black top and bottom rules, 1 px Shadow row rules, no fills except selected rows in Cement Light. Key figures at 96 px Schibsted Grotesk 900. Buttons: Black fill, Cement Light text, 0 radius, 3 px offset hard shadow in Ultramarine on hover (flat, no blur). Sources: boxed labels "[14]" in Martian Mono.

**Photography / illustration.** Close, flat-lit, grayscale photographs of concrete surfaces: tie-holes, board marks, formwork seams, rebar cages cropped to texture. No people, equipment or sites. Illustration: none; use only geometric blocks.

**Motion.** Heavy and abrupt: blocks slide in from the edge in 300 ms with an ease-out cubic, headlines step in word by word at 80 ms intervals. No fades, no springs. Reduced motion: static.

**Never.** Soft shadows, blur, rounded corners, glassmorphism, color accents beyond Ultramarine, thin type, ornamental textures that look like fake concrete images (the pattern is a drawn grid, not a stock texture).

**Thumbnail test.** Grey field, stacked black wordmark, dot grid. **Phone test.** Headline 64 px; blocks stack full width with 3 px rules; tie-hole pitch 64 px.

---

### 8. COLOR FIELD

**One-line idea.** Big flat planes of color, overlapped like Albers and Matisse cut-outs: deep teal, chalk, ochre and clay, with a serious sans voice. Confident, warm, human, and unmistakably not software blue.

**Who it's for / why it could win.** Leaders who want to be seen as modern and decisive without cold tech language. The saturated teal field is memorable, distinctive and still calm; planes of color become the product's structure (change, effect, option, owner).

**References.** Josef Albers, Homage to the Square and Interaction of Color; Henri Matisse's gouache cut-outs; Ellsworth Kelly; Ladislav Sutnar's information design; Paul Rand's IBM and Westinghouse work; Pentagram's Paula Scher for Public Theater (type scale); Tom Eckersley posters; Kvadrat textile catalogs; the Olivetti Lettera 22 advertising by Giovanni Pintori.

**Typefaces (Google Fonts).**
- Display and headings: Epilogue, weights 700 and 800, sentence case, tracking -0.04em, line height 1.0. Hero 88 px.
- Body: Epilogue 400 and 500, 17 px, line height 1.55.
- Data: Epilogue with tabular-nums; labels in Epilogue 600, 12 px uppercase, tracking 0.08em.

**Palette (saturated page).**
- Teal (page) #0D6B66
- Deep Teal (panels, depth) #09504C
- Chalk (text, light planes) #F4EFE0
- Ochre (primary plane accent) #E3A83B
- Clay (second accent, sparingly) #D9774A
- Ink (type on light planes) #0B1B1A

Contrast: Chalk on Teal 5.9:1; Ink on Chalk 15.5:1; Ink on Ochre 9.0:1; Ink on Clay 6.1:1. Never place Chalk text on Ochre or Clay.

**Wordmark.** "Resonance" in Epilogue 800, 28 px, tracking -0.04em, Ink, set on a Chalk rectangle (padding 6 px 14 px, 0 radius), with an Ochre rectangle of equal size offset 6 px right and 6 px down behind it (two overlapping planes). On Chalk backgrounds the Chalk plane becomes Teal with Chalk text.

**Grid and layout.** 12 columns, 0 gutter at the plane level (planes abut or overlap by 24 px), 24 px interior padding. Sections are full-bleed rectangular planes in varied heights and widths; a plane may overlap the previous one by 40 px and carry a 4 px Ink offset edge. Text in planes is left-aligned with big numerals as plane anchors. Layouts are asymmetric: a tall Ochre plane at one side with one stat, a Chalk plane with copy.

**Signature device.** Plane stack: two or three overlapping flat rectangles representing the product's logic (CHANGE on Ochre, EFFECT on Chalk, OPTIONS on Clay). Used as hero artwork, as section dividers, and as the scaffold for every product screen.

**Charts, product UI, data.** Flat bars as planes: no outlines, 2 px gap, all labels inside the bars in Epilogue 700. Plan is Chalk, revised is Ochre, recovery is Clay, baseline is Deep Teal. Tables are Chalk planes with Ink text, header row in Deep Teal with Chalk text, row dividers in Ink at 15 percent. Key number in a plane at 72 px Epilogue 800. Buttons: Ochre fill with Ink text, 0 radius, 3 px Ink bottom border. Sources: small Deep Teal tags with Chalk text.

**Photography / illustration.** Illustration: geometric cut-out shapes (arcs, quarter circles, rectangles) in the palette, used as quiet decoration at the corners of planes. Photography: color-graded to the palette (duotone Teal and Chalk) detail shots of paper, hands marking up a drawing (hands only, no faces), tools on a desk. No full-color stock imagery.

**Motion.** Planes slide in from their anchored edge, 400 ms with cubic-bezier(0.2, 0.8, 0.2, 1), staggered by 80 ms. Numbers swap with a simple 150 ms crossfade. Reduced motion: static.

**Never.** Gradients between planes; shadows; rounded corners; bright orange that approaches red; more than three planes overlapping; neon teal; purple.

**Thumbnail test.** Teal field with Chalk plane and Ochre offset block. **Phone test.** Planes become full-width bands stacked, overlap reduced to 16 px; hero numeral 56 px.

---

### 9. ROSE CLAY

**One-line idea.** A warm, human desk: pale clay paper, dark brown ink, a highlighter and a hand stamp. The record looks marked up by a person who is accountable for it.

**Who it's for / why it could win.** Owner-developers and family-run EPC firms where relationships carry the business. It reads as careful and personal rather than technological, which disarms AI skepticism: a person owns each decision and the page shows it. Quiet, warm, adult.

**References.** Aesop store collateral; Kinfolk and Cereal magazines; Moleskine and Midori notebooks; Field Notes brand voice; Pentagram's Natasha Jen for Penguin; Hoefler and Co.'s Mercury newspaper specimens; the Whole Earth Catalog layout; Dutch design studio Spaans Babylon; vintage business ledger stamps and rubber stamps.

**Typefaces (Google Fonts).**
- Display: Young Serif, weight 400 only, 56 px, tracking -0.01em, line height 1.1, sentence case.
- Body and UI: Karla, weights 400, 500 and 700, 18 px, line height 1.6.
- Data: Karla with tabular-nums; stamps in Karla 700 uppercase 11 px, tracking 0.12em.

**Palette.**
- Clay Pink (page) #EBD5C7
- Paper (cards) #F6EAE0
- Brown Ink (text) #2B1E18
- Brown Mid (secondary text) #6F5547
- Moss (links, owner stamps, positive) #3F5A2D
- Butter (highlighter) #F0C96B

Contrast: Brown Ink on Clay 11.6:1; Brown Mid on Clay 4.9:1; Moss on Clay 5.5:1; Brown Ink on Butter 10.2:1.

**Wordmark.** "Resonance" in Young Serif, 30 px, tracking -0.01em, Brown Ink. Behind the lower 45 percent of the letters, a Butter highlighter bar (SVG rectangle, rotated -1.5 degrees, slightly irregular ends via a rough path), as though marked with a highlighter. On dark brown footer: Clay Pink text with the same Butter bar at 60 percent opacity.

**Grid and layout.** 12 columns, 28 px gutters, 960 px content width, relaxed vertical rhythm (96 px section spacing). Cards are Paper with 8 px radius, 1 px Brown Mid at 25 percent border, and no shadow; small 2 degree rotations are not used. Text is left-aligned with generous 1.6 line height. Section headings sit above a short Brown Ink 2 px rule, 48 px wide. Content tone is first-person plural ("we mark what changed").

**Signature device.** The highlighter and the owner stamp. Changed numbers carry a Butter highlighter bar (flat rectangle behind the figure). Decisions carry a circular Moss stamp (SVG circle, 2 px Moss stroke, 76 px, text "OWNER" on an arc and the person's name and role in the middle, slightly rotated -6 degrees, mix-blend-mode multiply) showing who owns it and when it was decided.

**Charts, product UI, data.** Soft but exact: charts use 2 px Brown Ink lines on Paper, bars in Brown Mid with the revised bar in Moss, annotations in Karla 14 px with a hairline leader. Tables have 1 px Brown Mid rules at 25 percent, Karla 500 headers, and highlighted rows in Butter at 40 percent. The recovery options are paper cards with a large circled number (36 px, 2 px stroke). Buttons: Brown Ink fill with Paper text, 6 px radius. Sources appear as tiny underlined citations "(see invoice 4471, 12 Mar)" in Moss, linking to a drawer.

**Photography / illustration.** Warm natural-light photographs of desks and documents: a marked-up drawing, a pencil, a coffee ring on a printout, hands (no faces) pointing at a line on a schedule. Matte, slightly warm, grain at 4 percent. Illustrations: simple line drawings with a thick marker line in Brown Ink and Butter fill. Never staged people smiling at laptops.

**Motion.** Gentle and brief: highlighter bars wipe left to right in 350 ms; stamps press in with a 150 ms scale from 1.15 to 1 and a multiply blend. Cards fade in 250 ms. Reduced motion: static.

**Never.** Pink as a feminine cue (the clay is brown-leaning and muted; keep chroma low); handwriting fonts; emoji; rounded bubbly illustration; cartoon icons; cute microcopy.

**Thumbnail test.** Pale clay field, serif wordmark with a yellow highlight bar, one moss stamp. **Phone test.** Single column; stamp 64 px; cards full width with 16 px padding.

---

### 10. INSTRUMENT MANUAL

**One-line idea.** A precision-instrument manual: cold pale grey-blue, a neutral grotesque, a spec-sheet table system and a single orange dot used exactly once per screen to mark the decision owner.

**Who it's for / why it could win.** Buyers who value engineering discipline and distrust marketing. The dot works like a status lamp on a well-made device; the manual format signals documentation, calibration and traceability. The most understated direction, and a natural fit with "ties every number to a source".

**References.** Dieter Rams and Braun product graphics (T3 radio, ET 66 calculator); Olivetti; Vignelli Associates; Teenage Engineering's manuals (for the format, not the playfulness); Leica and Zeiss manuals; Nature journal layout (Springer Nature); Massimo Vignelli's NYC Subway Graphics Standards Manual (1970); Braun product manuals.

**Typefaces (Google Fonts).**
- Display and body: Onest, weights 400, 500 and 600. Headlines 500, 48 px, tracking -0.02em, line height 1.1. Body 400, 16 px, line height 1.55. Labels 500, 11 px uppercase, tracking 0.1em.
- Data and part numbers: Fragment Mono, weight 400, 13 px, tabular.

**Palette.**
- Ice (page) #E6ECEF
- Panel #F7F9FA
- Ink (text) #1C2024
- Grey (secondary text) #5E676E
- Hairline #C5CED3
- Signal Orange (the dot and nothing else: never text) #E8590C

Contrast: Ink on Ice 14.2:1; Grey on Ice 5.0:1. Orange is used only as a filled mark with a text label beside it.

**Wordmark.** "Resonance" in Onest 500, 22 px, tracking -0.01em, Ink, preceded by a filled Signal Orange circle 10 px in diameter, vertically aligned to the x-height midpoint, 8 px gap. Below it, optional Fragment Mono 10 px caption in Grey: "DECISION RECORD MODEL R-01" (the manual's model line).

**Grid and layout.** 12 columns on an 8 px module, 1200 px max, 24 px gutters. Panels are Panel with a 1 px Hairline border and 2 px radius. Pages read as a spec sheet: left rail 3 columns with item labels and part-style numbers (e.g. "3.2 Recovery options", Fragment Mono), main area 9 columns. Content is organized by numbered sections (1.0, 1.1, 1.2). Strict alignment, no overlap, no bleeding elements.

**Signature device.** The single orange dot. It appears once per screen in the visible viewport: next to the person or role who owns the pending decision, and in the wordmark. Never decorative. It also appears in the hero as the pinned point on a diagram.

**Charts, product UI, data.** Instrument-like: charts have thin 1 px Hairline gridlines, 1.5 px Ink series lines, tick marks inside the axis like a dial scale, labels in Fragment Mono 11 px, and tabular numerals aligned on the decimal. Changed value rows are marked with a 2 px Ink left border and a small "REV" label rather than color. Spec tables use a two-column key/value layout with Hairline row rules. Buttons: Ink fill with Ice text, 2 px radius, 40 px height; secondary buttons 1 px Ink outline. Source references appear as part numbers in Fragment Mono "[DOC-0412 p.3]", linking to the document.

**Photography / illustration.** Studio product-style photographs of paper documents, calipers, rulers, label tape, on pale grey seamless backgrounds, soft top light, no shadows beyond a light contact shadow. Technical exploded-view line illustrations in 1 px Ink with leader numbers. No people.

**Motion.** Precise and small: a 150 ms fade; gauge needles and bars move with cubic-bezier(0.4, 0, 0.2, 1) over 300 ms; the orange dot pulses once (scale 1 to 1.4 to 1, 400 ms) when the owner is assigned. No looped animation.

**Never.** Using orange as text or in large fills; additional accent colors; skeuomorphic knobs and dials; neon; gradients; glass; faux metallic textures.

**Thumbnail test.** Ice field, an orange dot and an Onest wordmark; a thin-ruled panel. **Phone test.** Left rail becomes a top collapsible index; dot size 12 px; Fragment Mono at 12 px.

---

## 3. Divergence check

### 3a. Primary typeface and background are unique

| # | Direction | Primary typeface | Secondary | Background | Background hex |
|---|-----------|------------------|-----------|------------|----------------|
| 1 | Title Block | Archivo | DM Mono | Vellum grey-green, light | #E8E4D4 |
| 2 | Broadsheet | Source Serif 4 | Public Sans | Newsprint cream, light | #F2E8D5 |
| 3 | Swiss Index | Inter Tight | none | Pure white, light | #FFFFFF |
| 4 | Private Bank | EB Garamond | Jost, Spline Sans Mono | Forest green, dark | #0E2A23 |
| 5 | Locate Paint | Big Shoulders Display | Work Sans | Survey yellow, saturated | #F2C230 |
| 6 | Cyanotype | Azeret Mono | Atkinson Hyperlegible | Prussian blue, saturated dark | #123A63 |
| 7 | Cast Concrete | Schibsted Grotesk | Martian Mono | Mid grey, mid-tone | #C7C5BE |
| 8 | Color Field | Epilogue | none | Deep teal, saturated | #0D6B66 |
| 9 | Rose Clay | Young Serif | Karla | Clay pink, light | #EBD5C7 |
| 10 | Instrument Manual | Onest | Fragment Mono | Icy grey-blue, light | #E6ECEF |

Result: 10 distinct primary families, 10 distinct page hexes, no repeated secondary family. Three directions use serif primaries (2, 4, 9), one uses a monospaced primary (6), and the remaining are grotesques with different widths and characters (Archivo's width axis, Inter Tight, Big Shoulders' condensed, Schibsted, Epilogue, Onest). None uses IBM Plex, #F5F4F0 or #C8361E.

Light-versus-dark spread: light 1, 2, 3, 9, 10; dark or saturated 4, 5, 6, 8; mid-tone 7.

Accent colors, all distinct and none red: rust #98481A (1), editor's blue #1F3A5F (2), green #087A4F (3), brass #C2A15A (4), blue and green marks (5), chalk yellow #F2E6A0 (6), ultramarine #2A3BB8 (7), ochre and clay (8), moss and butter (9), orange dot (10).

### 3b. Rough visual distance

Euclidean distance on the T/V/E coordinates in section 1 (0 identical, 6.9 maximum for a 4 by 4 by 4 span; practical maximum 6.9). Nearest neighbor for each, then the feature that separates the pair.

| # | Direction | Nearest neighbor | Distance | What separates them |
|---|-----------|------------------|----------|---------------------|
| 1 | Title Block | 3 Swiss Index (also 6 and 10 at the same distance) | 2.2 | Border, zone marks and title block versus open white grid; mono labels versus one grotesque |
| 2 | Broadsheet | 4 Private Bank | 2.2 | Light newsprint, dense columns and rules versus dark green, single airy reading column |
| 3 | Swiss Index | 1 Title Block | 2.2 | Pure white and huge numerals versus enclosed sheet; green delta bar versus rust revision triangle |
| 4 | Private Bank | 2 Broadsheet (also 9) | 2.2 | Dark ground with brass versus light newsprint; Garamond caps and margin notes versus Source Serif headlines |
| 5 | Locate Paint | 7 Cast Concrete | 3.0 | Yellow dashed paint line versus grey tie-hole slabs; condensed display versus wide grotesque |
| 6 | Cyanotype | 10 Instrument Manual | 2.0 | Dark Prussian white-line drawing and mono versus pale grey-blue spec panels and a dot; outlines and hatching versus hairlines and fills |
| 7 | Cast Concrete | 6 Cyanotype | 2.2 | Heavy black type blocks and grey ground versus fine line drawing on blue |
| 8 | Color Field | 2 Broadsheet | 2.4 | Overlapping flat planes in teal and ochre versus ruled editorial columns |
| 9 | Rose Clay | 4 Private Bank (also 1 at 2.4) | 2.2 | Warm light clay with highlighter and stamps versus dark green with brass and gilt rules |
| 10 | Instrument Manual | 6 Cyanotype | 2.0 | As row 6 |

Minimum pairwise distance across all 45 pairs: 2.0 (6 to 10), which is the tightest pair and is separated by background (dark versus light), primary typeface (mono versus proportional grotesque) and device (dimension chain versus single dot). If the CEO finds any pair too close, drop 10 first and replace it with a pair-maximizing option at (T +2, V +1, E +2), a warm editorial loud direction.

### 3c. Squint test checklist for the builder

1. Convert each mockup to grayscale at 320 px wide. A reviewer should still say which direction it is within 2 seconds, using only: layout density, type color weight, presence of border or banding.
2. Place all ten in a 5 by 2 contact sheet. No two should share the same top-left composition (framed sheet, masthead, big numeral, centered rule, paint band, grid, slab, planes, card, panel).
3. At 390 px, each retains its device (title block cell, dateline, delta bar, margin note, paint line, dimension chain, tie-holes, plane stack, stamp, dot).
4. Shared content may be identical, but no section order may match between more than two directions.

---

## 4. Build notes common to all ten

- Load only the families listed for the chosen direction (font-display: swap; preconnect to fonts.googleapis.com). Subset weights to those listed.
- Define each direction as a CSS custom property set (--bg, --panel, --ink, --muted, --rule, --accent) so the 10 mockups differ only in tokens plus device components.
- Product visuals are HTML or inline SVG: schedule, delta table, options list, source tag, owner chip, record list. Build these once as semantic markup and restyle per direction; do not reuse the same layout across directions (see each direction's grid rules).
- Tabular figures everywhere in data. Money formatted $1.2M or $1,240,000 consistently within a direction. Dates in ISO or long form, one per direction.
- Respect prefers-reduced-motion in all ten: replace animations with the end state.
- Keep focus rings visible: 2 px outline in the direction's text color with 2 px offset (Locate Paint uses Ink, Cyanotype uses Chalk Yellow).

---

## 5. Fifteen-line summary

1. Title Block: drawing-sheet border, zone marks and revision title blocks on vellum; Archivo + DM Mono.
2. Broadsheet: financial-newspaper masthead, columns and struck-through corrections on newsprint; Source Serif 4.
3. Swiss Index: white page, huge numerals, one green delta bar, flush-left grid; Inter Tight.
4. Private Bank: dark forest green, ivory and brass with margin-note sources; EB Garamond.
5. Locate Paint: survey-yellow ground, dashed paint lines and flags; Big Shoulders Display.
6. Cyanotype: white line drawing on matte Prussian blue with dimension chains; Azeret Mono.
7. Cast Concrete: mid-grey slabs, stacked black type and a tie-hole grid; Schibsted Grotesk.
8. Color Field: overlapping flat planes in teal, chalk and ochre; Epilogue.
9. Rose Clay: warm clay paper with highlighter marks and owner stamps; Young Serif + Karla.
10. Instrument Manual: icy grey spec sheets with one orange dot marking the owner; Onest + Fragment Mono.
11. Spread: placed on three axes (warm-cold, quiet-loud, engineered-editorial), minimum pairwise distance 2.0.
12. Light backgrounds: 1, 2, 3, 9, 10; dark or saturated: 4, 5, 6, 8; mid-tone grey: 7.
13. Ten distinct primary typefaces and ten distinct page colors; none reuses IBM Plex, #F5F4F0 or #C8361E.
14. Tightest pair is 6 Cyanotype and 10 Instrument Manual; the plan is to drop 10 for a warm editorial loud option if the CEO wants more distance.
15. Every direction specifies wordmark, grid, device, chart and table style, photography rule, motion, and a never list; each must pass thumbnail and phone tests.
