# CLAUDE.md — Resonance Website
> Drop this file in the root of the resonance-site/ folder.
> Claude Code reads it automatically at the start of every session.

---

## Project Overview

**Site:** resonancehq.io  
**What it is:** Marketing website for Resonance — purpose-built SaaS for affordable housing relocation and redevelopment programs.  
**Stack:** Pure static HTML/CSS/JS. No framework. No build system. No bundler.  
**Deployment:** Netlify. Auto-deploy from connected GitHub repo. Publish dir is root (`.`).  
**Pages:** 4 HTML files total.

---

## File Structure

```
resonance-site/
├── index.html          # Homepage (~4,944 lines) — primary file
├── about.html          # Company/team/mission page (~815 lines)
├── case-studies.html   # Client case studies — Kalel, FEC/NYCHA (~2,274 lines)
├── calculators.html    # Free tools: ROI, compliance risk, capacity, timeline (~1,177 lines)
├── netlify.toml        # Deployment config, redirects, cache headers
├── _redirects          # Netlify redirect rules (mirrors netlify.toml)
├── sitemap.xml         # SEO sitemap
├── robots.txt
├── site.webmanifest    # PWA manifest
├── ogimage.png         # Open Graph / social share image
├── favicon16x16.png
├── favicon32x32.png
├── appletouchicon.png
├── androidchrome192x192.png
└── androidchrome512x512.png
```

---

## Navigation Tips (Large Files)

The HTML files are large — use `grep -n` to locate sections fast before editing.

### index.html section map (line numbers)
| Section | Approx. Line |
|---|---|
| `<head>` / meta / schema | 1 |
| CSS variables / design tokens | 220–250 |
| Global styles | 250–440 |
| Nav (desktop) | 286 |
| Mobile nav drawer | 2281 |
| Secondary pill nav | 2396 |
| **Hero** | **2489** |
| The Problem | 2832 |
| Features / carousel | 3040 |
| Final CTA | 3712 |
| Inline lead capture form | 3726 |
| Security trust bar | 3789 |
| Lead drawer (slide-in) | 3827 |
| **Footer** | **3929** |
| JS — calc / form logic | 4075+ |

### about.html section map
| Section | Approx. Line |
|---|---|
| Hero | 558 |
| Leadership | 573 |
| Operational Real Estate | 612 |
| The Problem | 649 |
| What We're Building | 668 |
| Our Vision | 724 |
| Differentiators | 736 |
| Mission | 753 |
| CTA | 763 |

### case-studies.html section map
| Section | Approx. Line |
|---|---|
| Nav | 1041 |
| Page hero | 1070 |
| Card grid (Kalel, FEC) | 1077 |
| Stats bar | 1210 |
| Program Types grid | 1235 |
| Case study drawer overlay | 1548 |
| Kalel panel | 1570 |
| FEC panel | 1144 |

### calculators.html section map
| Section | Approx. Line |
|---|---|
| Nav | 567 |
| Hero | 584 |
| Calc grid | 591 |
| ROI calculator | 594 |
| Capacity calculator | 666 |
| Timeline risk calc | 733 |
| Compliance calculator | 814 |
| What we model | 910 |
| Closing / CTA | 922 |

---

## Design System

### Color Variables (defined in index.html ~line 222, replicated in each file)
```css
--teal:         #14B8A6;
--teal-bright:  #5EEAD4;
--teal-ghost:   rgba(20,184,166,0.1);
--teal-glow:    rgba(20,184,166,0.15);
--purple:       #5B21B6;
--purple-mid:   #7C3AED;
--purple-bright:#A78BFA;
--purple-ghost: rgba(91,33,182,0.12);
--purple-glow:  rgba(91,33,182,0.22);
--dark:         #09080F;   /* page background */
--dark-1:       #110E1E;
--dark-2:       #1A1630;
--dark-3:       #231E3E;
--dark-4:       #2D2754;
--border:       rgba(120,100,220,0.18);
--border-hi:    rgba(120,100,220,0.38);
--text-1:       #F1EEFF;   /* primary text */
--text-2:       #B8AAEE;   /* secondary text */
--text-3:       #7E72B8;   /* muted text */
```

### Typography
```css
--ff-display: 'Fraunces', Georgia, 'Times New Roman', serif;
--ff-body:    'Instrument Sans', -apple-system, sans-serif;
--ff-mono:    'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
```
Fonts loaded via Google Fonts (preloaded async in `<head>`).

### Design Patterns
- **Eyebrow labels:** `--ff-mono`, teal color, uppercase, letter-spacing 0.1em, preceded by a 5px teal dot
- **Section headers:** `--ff-display`, light weight (300), with italic teal em spans for accent words
- **Badges/pills:** `--ff-mono`, 10px, uppercase — teal variant: `rgba(20,184,166,0.1)` bg, teal border
- **Cards:** `--dark-2` or `--dark-3` bg, `0.5px solid var(--border)` border — no heavy shadows
- **Buttons:** Primary = purple gradient + glow; secondary = teal text + ghost; all use `--ff-body`
- **Screen mockups:** `--dark-2` bg, `--dark-1` titlebar, `--ff-mono` URL text

### CSS Architecture
- **All CSS is inline in each HTML file** — there is no external stylesheet
- Each page has its own full `<style>` block in `<head>`
- CSS variables are redefined in every file (copy-paste pattern, not shared)
- Changes to shared styles (nav, footer, etc.) must be replicated across all 4 files manually
- Page-specific CSS sits after shared base styles

---

## Deployment

### Netlify Config
- **Publish dir:** `.` (root — no build step)
- **Build command:** empty (none needed)
- **Pretty URLs:** `.html` stripped via `netlify.toml` redirects (e.g., `/about` → `/about.html` 200)
- **404 fallback:** `/*` → `/index.html` 404
- **Security headers:** X-Frame-Options, X-Content-Type-Options, CSP-adjacent — set in netlify.toml
- **Cache strategy:** HTML = `max-age=0, must-revalidate`; static assets = `max-age=31536000, immutable`

### To deploy changes
```bash
git add .
git commit -m "your message"
git push origin main
# Netlify auto-deploys on push
```

---

## Third-Party Integrations

| Service | Purpose | Details |
|---|---|---|
| **Formspree** | Demo request form submissions | ID: `xlgpwdbq` — endpoint: `https://formspree.io/f/xlgpwdbq` |
| **Formspree** | Lead drawer form | Same ID. Fallback: `mailto:liz@resonancehq.io` |
| **Calendly** | Demo booking | URL: `https://calendly.com/yourresonance/demo` ⚠️ Placeholder — confirm live URL |
| **Google Fonts** | Typography | Fraunces, Instrument Sans, JetBrains Mono |

> ⚠️ **Calendly URL may still be placeholder** — grep for `calendly.com/yourresonance` to find all instances before launch.

---

## Forms & Lead Capture

Two form surfaces on the homepage:

1. **Inline demo form** (Final CTA section, ~line 3726)
   - Fields: name, email, organization, role (select), program type (select)
   - Honeypot field: `#df-website` (hidden, catches bots)
   - Submits to Formspree `xlgpwdbq`, fallback mailto
   - Success state: `#demo-success` div revealed

2. **Lead drawer** (slide-in panel, ~line 3827)
   - Fields: name, email, org, role, households (conditional), message (conditional)
   - Honeypot: `#ld-website`
   - Submits to same Formspree endpoint
   - Fallback: `mailto:liz@resonancehq.io`
   - Triggered by nav "Request a demo" buttons

---

## Brand & Positioning

**Primary tagline:** "The execution layer for affordable housing."  
**Alternate:** "The execution layer for affordable housing redevelopment."  
**Category framing:** Not a PM tool, CRM, or compliance add-on — purpose-built operational infrastructure.

### Programs Served
RAD · PACT · Section 18 · Choice Neighborhoods · HOPE VI · LIHTC Preservation · HUD Disposition

### Target Customers
- Public Housing Authorities (PHAs)
- Affordable Housing Developers
- Relocation Service Providers (RSPs)
- Consultants / Advisors

### Active Clients (referenced in case studies)
- **Kalel** — developer client
- **FEC / NYCHA** — PACT program (NYC)
- **Houston Housing Authority** — pending engagement

### Core Platform Capabilities (per site copy)
- Household tracking & case management
- URA compliance documentation & audit trail
- Right-to-return eligibility tracking
- AI-assisted unit matching engine
- Scenario simulation & chain-move planning
- Phase sequencing across buildings
- Field workflow logs (notice delivery, incident reports, unit prep)
- Pre-construction compliance checklist cascade
- Multi-stakeholder dashboards & reporting

---

## SEO & Schema

### Pages and canonical URLs
| Page | URL |
|---|---|
| Homepage | `https://resonancehq.io/` |
| About | `https://resonancehq.io/about` |
| Case Studies | `https://resonancehq.io/case-studies` |
| Calculators | `https://resonancehq.io/calculators` |

### Schema types in use
- `SoftwareApplication` (index.html)
- `Organization` (index.html)
- `FAQPage` (index.html, case-studies.html, calculators.html)
- `BreadcrumbList` (case-studies.html, calculators.html)
- `WebSite` with `SearchAction`

### Meta / OG
- OG image: `ogimage.png` (root dir)
- Twitter card: `summary_large_image`
- Contact email: `liz@resonancehq.io`

---

## Known Issues / Active TODOs

- [ ] **Calendly URL** — `calendly.com/yourresonance/demo` appears to be a placeholder. Grep and replace with live booking link across all 4 files before next marketing push.
- [ ] **Shared nav/footer** — currently copy-pasted across all 4 files. Any nav or footer change must be made in all 4 files manually. Consider whether to extract to JS include or SSG if this becomes painful.
- [ ] **Formspree limit** — free tier is 50 submissions/month. Upgrade or swap if volume picks up.

---

## Working Notes for Claude Code

- **Never assume CSS changes in one file affect others** — all files are independent.
- **Use `grep -n "pattern" filename` before editing** — files are large; find the exact line first.
- **Merged / replicated blocks:** Nav HTML and footer HTML exist in all 4 files. If Ray asks to update nav or footer, ask which files or do all 4.
- **Test locally with a simple server:** `python3 -m http.server 8080` from project root — Netlify redirects won't work locally but page content will.
- **No JS frameworks** — all interactivity is vanilla JS inline at bottom of each file.
- **Scroll anchor offset:** `section[id] { scroll-margin-top: 39px; }` accounts for fixed nav height.
- **Font load wait:** If generating PDFs or screenshots, wait ~4 seconds for Google Fonts to load.
