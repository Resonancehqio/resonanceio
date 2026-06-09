# Resonance HTML Documents — Style Guide

These are standalone HTML files used as leave-behinds, pitch docs, and event pages. They share the Resonance design language but have their own token naming and two distinct modes: **Print/Document** and **Web/Dark**.

---

## Two Document Modes

| Mode | Files | Background | Intended output |
|---|---|---|---|
| **Print / Document** | `pricing-overview.html`, `hud-overview.html`, `platform-overview.html` | White / soft lavender | Print, PDF, screen share |
| **Web / Dark** | `nysafah.html`, `demo.html` | Dark `#09080F` | Browser only |

---

## Print / Document Mode

### Page sizing

```css
/* Portrait — letter */
@page { size: letter; margin: 0.55in 0.72in; }
body  { max-width: 816px; margin: 48px auto 80px; }

/* Landscape — presentation */
@page { size: 11in 8.5in landscape; margin: 0; }
body  { width: 1200px; }
```

Always include print color-preservation:
```css
* { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
```

Screen wrapper (the gray/purple surround visible in browser):
```css
html { background: #D6D1EC; } /* or #DDD8EE */
```

### Color tokens — print docs

```css
:root {
  --teal:          #0D9488
  --teal-light:    rgba(13,148,136,0.09)
  --teal-border:   rgba(13,148,136,0.25)

  --purple:        #7C3AED
  --purple-mid:    #9461FB
  --purple-light:  rgba(124,58,237,0.08)
  --purple-border: rgba(124,58,237,0.20)

  --ink:           #1A0F3A   /* darkest body text */
  --ink-2:         #3D2B6E   /* headings / strong */
  --ink-3:         #6B5A9A   /* secondary text */
  --ink-4:         #9B8DC0   /* muted / captions */

  --rule:          rgba(91,33,182,0.12)   /* dividers */

  --bg:            #FFFFFF
  --bg-soft:       #F7F4FF   /* section tints */
  --soft:          #EDE8FA   /* stronger tint */
}
```

> Note: print docs use `--ink` through `--ink-4` instead of `--text-1` through `--text-3`. Teal is slightly darker (`#0D9488` vs `#14B8A6`) for legibility on white.

### Font variable names — print docs

Print docs use shorthand variable names:

| Variable | Value |
|---|---|
| `--fd` | `'Fraunces', Georgia, serif` |
| `--fb` | `'Instrument Sans', -apple-system, sans-serif` |
| `--fm` | `'JetBrains Mono', 'SF Mono', monospace` |

### Typography scale — print

All sizes in `pt` for print fidelity:

| Element | Font | Size | Weight | Color |
|---|---|---|---|---|
| Document title | `--fd` | 20–24pt | 300 | `--ink` |
| Section heading | `--fd` | 13–16pt | 300–400 | `--ink` |
| Sub-heading | `--fb` | 9–10pt | 700 | `--ink-3` uppercase |
| Body copy | `--fb` | 8.5–9.5pt | 400 | `--ink-2` |
| Table data | `--fb` | 8–8.5pt | 400–600 | `--ink` / `--ink-3` |
| Mono labels | `--fm` | 7–8pt | 600–700 | `--teal` or `--ink-3` |
| Captions | `--fb` | 7–7.5pt | 400 | `--ink-4` |

Line-height: `1.45–1.6` for body; `1.1–1.2` for headings.

### Document header pattern

Every print doc opens with a consistent header:
```
[Logo mark + wordmark]       [Document title — mono label]
──────────────────────────────────────────────────────────
```
- Border-bottom: `1.5–2px solid var(--purple)` or `var(--teal)`
- Logo wordmark: `--fd`, 11pt, `--ink-3`
- Doc title: `--fm`, 7–8pt, uppercase, `--ink-3` or `--purple`

### Layout grids — print docs

**Two-column pricing split:**
```css
grid-template-columns: 1fr 24px 1fr;  /* content | divider | content */
```

**Phases / stages:**
```css
grid-template-columns: repeat(5, 1fr);  /* HUD overview — 5 program phases */
grid-template-columns: repeat(3, 1fr);  /* platform overview — 3 phases */
```

**Value props:**
```css
grid-template-columns: repeat(4, 1fr);
```

### Card / box pattern — print docs

```css
border-radius: 8–10px;
border: 0.5px solid var(--rule);
padding: 12–20px;
background: var(--bg-soft);  /* or var(--purple-light) / var(--teal-light) */
```

Teal accent box:
```css
background: var(--teal-light);
border: 1px solid var(--teal-border);
```

Purple accent box:
```css
background: var(--purple-light);
border: 1px solid var(--purple-border);
```

### Table pattern — print docs

```css
width: 100%; border-collapse: collapse; font-size: 8–8.5pt;
```

Header row:
```css
background: var(--purple-light);
color: var(--ink-2); font-weight: 700; text-transform: uppercase;
font-size: 7pt; letter-spacing: 0.06em;
padding: 7px 10px;
```

Data rows: alternating `var(--bg)` / `var(--bg-soft)`, `border-bottom: 0.5px solid var(--rule)`.

### Footer pattern — print docs

```
Page X of Y                              resonancehq.io · confidential
```
- `--fm`, 7–7.5pt, `--ink-4`
- `border-top: 0.5px solid var(--rule)`
- Flex space-between

---

## Web / Dark Mode

Dark-mode documents use the **same token system as the main website**. See `STYLEGUIDE.md` for the full color and typography reference.

### Key differences from main site

| Property | Main site | Dark documents |
|---|---|---|
| `--ff-mono` | JetBrains Mono | Nunito Sans |
| `--wrap` max-width | 1160px | 1100–1200px |
| Nav | Full dropdown | Simplified (logo + CTA only) |
| Background grid | Optional | Always present |

### Nav — dark documents

Fixed at top, `height: 64px`, `backdrop-filter: blur(12px)`.
```css
display: grid; grid-template-columns: auto 1fr auto;
background: rgba(9,8,15,0.85);
border-bottom: 0.5px solid var(--border);
```

### Background system — dark documents

Two layers:
1. **Grid** (`.bg-grid`) — fixed inset, subtle dot or line grid, `opacity: 0.04–0.06`
2. **Orbs** (`.bg-canvas`) — fixed inset, 2–3 blurred radial gradients using `--purple-glow` and `--teal-glow`, animated with `@keyframes drift`

```css
@keyframes drift { 0%{transform:translate(0,0)} 100%{transform:translate(40px,30px)} }
```

---

## Shared Rules (Both Modes)

### Fonts
Always load all three families. Use the preload pattern:
```html
<link rel="preload" as="style" crossorigin
  href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
  onload="this.onload=null;this.rel='stylesheet'">
```

### Brand colors (invariant)
These never change between modes:

| Color | Hex | Use |
|---|---|---|
| Purple core | `#7C3AED` | Primary accent, headers |
| Teal core | `#0D9488` (print) / `#14B8A6` (dark) | Secondary accent, highlights |
| Fraunces | — | All major headings |

### Logo
Always the 5-path SVG with gradients `paint0_32`–`paint4_32`. In documents, size is typically 22–28px. Never use a simplified version.

### Dividers / rules
```css
border: 0.5px solid var(--rule);   /* print */
border: 0.5px solid var(--border); /* dark web */
```

### Pill / label pattern
Mono, uppercase, 0.08–0.12em letter-spacing, `border-radius: 100px`.
- Print: `--fm`, 7pt, `--teal` or `--purple-mid`
- Dark: same as main site pill system

### Confidential footer (print docs)
Add to every client-facing print document:
```
Confidential · For [Client Name] only · resonancehq.io
```

---

## File Naming Convention

| Type | Pattern | Example |
|---|---|---|
| Print overview | `[topic]-overview.html` | `pricing-overview.html` |
| Event / conference | `[event-name].html` | `nysafah.html` |
| Interactive demo | `demo.html` | — |
| Proposal | `[client]-proposal.html` | — |

---

## Quick Reference — Which Token Set to Use

**New print/PDF document?** → Use `--ink`, `--ink-2`, `--ink-3`, `--ink-4`, `--fd`, `--fb`, `--fm`, pt units, `@page` sizing.

**New dark web page?** → Mirror `index.html` tokens exactly: `--text-1`, `--text-2`, `--text-3`, `--ff-display`, `--ff-body`, `--ff-mono`, px/rem units, fixed nav.
