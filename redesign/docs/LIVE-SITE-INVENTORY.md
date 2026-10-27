# Live site inventory — resonancehq.io (captured 27 Oct 2026)

Source: `~/Desktop/Resonance-site` at git `cc732de` ("Add favicon links to every deployed page"), the folder Netlify deploys from (GitHub `Resonancehqio/resonanceio`, publish dir = root, pure static HTML, Formspree + three Netlify functions).
`~/Desktop/Resonance-site copy` (13 Oct 2026) is an **abandoned "Tower Cab" rebuild** (DESIGN.md, assets/site.css, uncommitted edits to four pages). Not the live site. Ignore it unless Ray says otherwise.

The live pages are the HTML files in the repo root. The redesign lives in `redesign/corridor/`.

## What the live site is

A single-vertical marketing site: **affordable-housing relocation software** (RAD, PACT, Section 18, Choice Neighborhoods, URA, right-to-return, HUD audit trails). Audiences: housing authorities, developers, relocation service providers (RSPs). Primary CTA everywhere: "Schedule a demo" (Formspree form `xlgpwdbq`) and `mailto:sean@resonancehq.io`. App login: `https://resonancehq.app`.

Brand on the live site: Fraunces (display) + Instrument Sans (body) + JetBrains Mono (labels); purple `#5B21B6`/`#7C3AED`/`#A78BFA` + teal `#14B8A6`/`#5EEAD4` on near-black `#09080F`. Full tokens in `WEBSTYLEGUIDE.md`; print-doc system in `STYLEGUIDE-DOCUMENTS.md`.

## Pages, one line each, with a proposal (Ray decides)

| URL | File | What it says | Proposal for the redesign |
|---|---|---|---|
| `/` | index.html | Housing hero → problem → features carousel (household record, field workflows, notices, matching, scenario planning, HUD docs, unit inventory) → before/after → "most AI for housing is a chatbot" → managed services → audiences (PHA / developer / RSP) → pricing teaser ($3,000/mo + per unit) → FAQ → lead drawer → SEO footer blocks | **Replaced** by the platform-led corridor home. The housing content moves to a housing solutions page. The "not a chatbot" argument survives as the stack/philosophy section. |
| `/about` | about.html | "Real estate runs on people, decisions, and coordination." Team (names Raymon Geis, Sean Christensen **and Sushanth David**), Operational Real Estate framing, the spreadsheet problem, "execution layer", differentiators, mission | **Keep, rewrite** to the platform story. **Conflict:** the DC-site rule hides Sushanth; the live About page names him publicly. Ray must rule. |
| `/case-studies` | case-studies.html | Kalel (RSP, "5,000+ hours recovered") and Related Companies FEC / three NYCHA developments; HUD program types grid | **Keep** as housing proof. **Conflict:** these are real customer names already public; the DC rule is "no customer names". Decide whether the rule is DC-only. |
| `/calculators` | calculators.html | Four free tools: ROI, team capacity, construction-slip exposure, HUD audit risk | **Keep** under housing; the construction-slip calculator is a direct ancestor of the DC "delay response" story. |
| `/pricing` | pricing.html | $3,000/month platform + $7–$15 per active unit, ROI argument, comparison, FAQ | **Do not carry over.** Redesign rule: no published prices (two conflicting versions exist). Pricing already dropped from the v5 nav. Keep the URL redirecting somewhere sensible. |
| `/demo` | demo.html | YouTube embed + CTA | **Keep** mechanically; swap the video when the platform demo exists. |
| `/refer`, `/via/*` | refer.html + `netlify/functions/refer.mjs`, `referrals-mine.mjs`, `referrals-export.mjs`, `referrers.json` | Referral intake → Netlify Blobs, optional Google Sheet webhook + Resend email to ray@ and sean@ | **Keep intact.** Live plumbing with env vars on Netlify. Port the function folder and `referrers.json` unchanged. |
| `/nysafah` | nysafah.html | Event landing page, NYSAFAH 2026, Preservation Logistics partner | **Keep** (dated campaign page); not in sitemap. |
| `/privacy-policy` | privacy-policy.html | Full policy (GDPR, CCPA, COPPA, DMCA) | **Keep verbatim.** Footer must link it. |
| not routed | platform-overview.html, feature-overview.html, hud-overview.html, pricing-overview-print.html, styleguide*.html | Print/leave-behind documents built with the doc style guide | Not site pages. Keep as reference for the document system only. |

Not copied (not site content): Connex/ECM partner agreements, SaaS order forms, market-intelligence reports, RFP template, platform license, LinkedIn banners. They stay in `~/Desktop/Resonance-site`.

## Footer links that already 404 on the live site

`/support`, `/terms`, `https://www.resonancehq.io/support`, `https://www.resonancehq.io/terms`. The redesign should either build these or drop the links.

## Continuity checklist for the new site (so nothing breaks on launch)

- Keep every URL above alive or 301 it: `/about`, `/case-studies`, `/calculators` (+ `#roi #capacity #risk #compliance`), `/pricing`, `/demo`, `/refer`, `/via/*`, `/nysafah`, `/privacy-policy`. The sitemap lists the first four.
- Carry `netlify.toml` + `_redirects` logic (pretty URLs, favicon name mapping, headers, 404 fallback) and the `netlify/functions` folder with `@netlify/blobs` in `package.json`.
- Favicons, `site.webmanifest`, `ogimage.png` (needs a new OG image for the new story) — in the repo root.
- Lead capture: Formspree `xlgpwdbq` is wired to Sean's inbox; the new "Book a working session" form can reuse it or get its own ID.
- `mailto:sean@resonancehq.io` is the contact everywhere; confirm it stays.
- Schema.org / meta descriptions on every page are housing-specific and must be rewritten for the platform story.
- Logo: only `favicon.svg` exists as vector. No wordmark SVG in the repo; the nav wordmark is text.

## What carries into the redesign's language

- "The model never decides" ↔ live "Not a chatbot. A coordination engine." Same argument, keep the lineage.
- Operational Real Estate framing on About is the housing-era umbrella; the platform story (ontology, data agents, solvers, decision record) supersedes it. Decide whether "Operational Real Estate" stays as the housing vertical's name.
- Four housing audiences (PHA, developer, RSP, plus HUD leadership) map to the "Solutions by role" idea in `MOCKUP-PLAN-v2.md`.
