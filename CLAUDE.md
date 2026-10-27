# Resonance website — production site + redesign

Two things live in this repo.

## 1. Production (branch `main`, auto-deploys to resonancehq.io)
Static HTML in the repo root: `index.html`, `about.html`, `case-studies.html`, `calculators.html`, `pricing.html`, `demo.html`, `refer.html`, `nysafah.html`, `privacy-policy.html`. Netlify, publish dir root, functions in `netlify/functions/` (referral intake). Details, section maps and design tokens: `LIVE-SITE-CLAUDE.md`, `WEBSTYLEGUIDE.md`. The live site is the housing-relocation story.

**Never commit redesign work to `main`.** Redesign happens on the `redesign` branch; Netlify builds a deploy preview for it and publishes only `main`.

## 2. Redesign (branch `redesign`, folder `redesign/`)
Platform-led site: data agents, industry model/ontology, solvers, decision record; data centers and EPC as the lead industry, then supply chain, facilities and housing.

Read in order before doing anything:
1. `redesign/docs/BRAINSTORM-website-2026-10-26.md` — where the design search landed and why.
2. `redesign/corridor/STACK-STORYBOARD.md` — storyboard of the current build.
3. `redesign/docs/LIVE-SITE-INVENTORY.md` — what the live site has, what carries over, open conflicts for Ray.
4. `redesign/copy/COPY-v4.md` and `redesign/home-v5/` — Ray's own copy, verbatim; never rewrite unasked, flag conflicts instead.
5. `redesign/docs/MOCKUP-PLAN-v2.md` — site map and rules.

Folders:
- `redesign/corridor/` — the build: `corridor.js` engine, `index.html` home, `epc.html`, `data-centers.html`, `supply-chain.html`, `build_pages.py`, `shoot.py`/`sheet.py` (shots go to `shots/`, gitignored).
- `redesign/copy/` — COPY-v4 (current), COPY (v3, becomes the data center page), CONTENT.md (the fictional sample world), MOTION-IDEAS.md.
- `redesign/docs/` — plan, product brief, research reports, critiques, briefs.
- Serve locally with `python3 -m http.server 8765` from `redesign/corridor/`.

The earlier workshop folder `~/Desktop/Datacenter Decision OS` holds brand rounds, old mockups and 300 MB of shot sheets; it is archive only now.

## Hard rules (from Ray)
- Fictional sample data only (`redesign/copy/CONTENT.md` world); no real customers or places in product screens.
- No published prices. No unsourced stats. Hide Sushanth's identity (open conflict: live About page names him; see inventory).
- Copy in levels: one or two short sentences a beat.
- Temple method for animation (see `~/.claude/CLAUDE.md`): Three.js, one 0–1 progress value, smoothstep stages, exact reverse, seamless hand-off, DPR 2 judgement, Reduce Motion still.
- Rejected, never bring back: planets, hover ripple, scroll-speed blur, sound, node graph for "map", ask-the-stack console, orange/CG plastic, blocky 3D, section snapping, heading stitch line, travelling orb token.
- Show a visual direction per level (reference frames or render sheet) and get Ray's OK before coding it.
- Launch continuity: every live URL stays alive or 301s; keep `netlify.toml`, `_redirects`, `netlify/functions`, favicons, privacy policy.
