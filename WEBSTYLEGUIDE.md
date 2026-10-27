# Resonance Design System — Style Guide

## Fonts

Three typefaces loaded via Google Fonts (preloaded async):

| Role | Family | Weights | Variable |
|---|---|---|---|
| Display / headings | Fraunces | 300, 400, 600 (+ italic) | `--ff-display` |
| Body / UI | Instrument Sans | 400, 500, 600 | `--ff-body` |
| Mono / labels | JetBrains Mono | 400, 500, 700 | `--ff-mono` |

Fallbacks: `Georgia, 'Times New Roman', serif` / `-apple-system, sans-serif` / `'SF Mono', 'Fira Code', monospace`

---

## Color Tokens

### Dark mode (default)

```css
--purple:        #5B21B6
--purple-mid:    #7C3AED
--purple-bright: #A78BFA
--purple-ghost:  rgba(91,33,182,0.12)
--purple-glow:   rgba(91,33,182,0.22)

--teal:          #14B8A6
--teal-bright:   #5EEAD4
--teal-ghost:    rgba(20,184,166,0.10)
--teal-glow:     rgba(20,184,166,0.15)

--dark:          #09080F   /* page background */
--dark-1:        #110E1E
--dark-2:        #1A1630   /* card backgrounds */
--dark-3:        #231E3E
--dark-4:        #2D2754

--border:        rgba(120,100,220,0.18)
--border-hi:     rgba(120,100,220,0.38)

--text-1:        #F1EEFF   /* primary text */
--text-2:        #B8AAEE   /* secondary text */
--text-3:        #7E72B8   /* muted/label text */

--amber:         #F59E0B
--red:           #F87171
--green:         #34D399
```

### Light mode overrides (`html[data-theme="light"]`)

```css
--dark:          #F5F5F7   /* page background */
--dark-1:        #FFFFFF
--dark-2:        #FAFAFA   /* card backgrounds */
--dark-3:        #F0F0F2
--dark-4:        #E8E8EC

--border:        rgba(91,33,182,0.12)
--border-hi:     rgba(91,33,182,0.22)

--text-1:        #1A0F3A
--text-2:        #4A3580
--text-3:        #7B5EA7

--teal:          #0B7A6E
--teal-bright:   #0D9488
```

---

## Spacing & Shape

```css
--radius-sm:  8px    /* inputs, small elements */
--radius-md:  12px   /* buttons, tags */
--radius-lg:  18px   /* dropdowns, cards */
--radius-xl:  24px   /* large cards, modals */
```

**Layout containers:**

```css
.wrap       { max-width: 1160px; margin: 0 auto; padding: 0 32px; }
.wrap-tight { max-width: 860px;  margin: 0 auto; padding: 0 32px; }
```

---

## Typography Patterns

### Section eyebrow
Mono, teal, uppercase, 10px, 0.1em tracking. Always preceded by a 5px animated teal dot.

```css
font-family: var(--ff-mono);
font-size: 10px; font-weight: 700;
letter-spacing: 0.1em; text-transform: uppercase;
color: var(--teal);
```

### Section title (`h2.section-title`)
Fraunces light (300), fluid size, tight tracking. Italic `<em>` spans use `var(--teal-bright)`.

```css
font-family: var(--ff-display); font-weight: 300;
font-size: clamp(2rem, 4.5vw, 3.4rem);
line-height: 1.1; letter-spacing: -0.02em;
```

### Section subtitle (`.section-sub`)

```css
font-size: 1.05rem; font-weight: 400;
color: var(--text-2); line-height: 1.75; max-width: 560px;
```

### Body copy

```css
font-family: var(--ff-body);
font-size: 13–14px; line-height: 1.65–1.75;
color: var(--text-2);
```

### Mono labels / code

```css
font-family: var(--ff-mono);
font-size: 10–12px; font-weight: 600–700;
letter-spacing: 0.08–0.14em; text-transform: uppercase;
```

---

## Buttons

### Primary — purple gradient

```css
background: var(--purple);
color: white; font-weight: 600; font-size: 13px;
padding: 9px 20px; border-radius: var(--radius-md);
box-shadow: 0 0 0 1px rgba(124,58,237,0.4), 0 4px 16px rgba(91,33,182,0.35);
```

Hover: `background: var(--purple-mid)`, lifts 1px.

### Large primary (`.btn-lg.btn-primary-lg`)
Same but `padding: 13px 28px; font-size: 15px;`

### Ghost teal (Case Studies)

```css
color: var(--teal-bright); border: 0.5px solid rgba(20,184,166,0.35);
background: rgba(20,184,166,0.07); padding: 7px 16px; border-radius: var(--radius-md);
```

### Ghost purple (Calculators)

```css
color: var(--purple-bright); border: 0.5px solid rgba(167,139,250,0.35);
background: rgba(167,139,250,0.07); padding: 7px 16px; border-radius: var(--radius-md);
```

### Neutral text (Log in)

```css
color: var(--text-1); border: 0.5px solid rgba(255,255,255,0.15);
padding: 7px 16px; border-radius: var(--radius-md);
```

---

## Pills & Badges

### Pills — section labels / announcements

```css
font-family: var(--ff-mono); font-size: 10px;
letter-spacing: 0.1em; text-transform: uppercase;
padding: 5px 13px; border-radius: 100px;
```

| Variant | Color | Background | Border |
|---|---|---|---|
| `.pill-teal` | `--teal` | `rgba(20,184,166,0.10)` | `rgba(20,184,166,0.28)` |
| `.pill-purple` | `--purple-bright` | `rgba(91,33,182,0.15)` | `rgba(167,139,250,0.30)` |

`.pill-teal` includes a pulsing 5px dot via `::before`.

### Badges — status indicators

```css
font-size: 10.5px; font-weight: 600;
padding: 4px 10px; border-radius: 100px;
```

Includes a 5px dot via `::before`.

| Variant | Color | Background |
|---|---|---|
| `.badge-teal` | `--teal` | `rgba(20,184,166,0.12)` |
| `.badge-green` | `--green` | `rgba(52,211,153,0.12)` |
| `.badge-amber` | `--amber` | `rgba(245,158,11,0.12)` |
| `.badge-purple` | `--purple-bright` | `rgba(167,139,250,0.12)` |
| `.badge-red` | `--red` | `rgba(248,113,113,0.12)` |

---

## Cards

### Standard card

```css
background: var(--dark-2);
border: 0.5px solid var(--border);
border-radius: var(--radius-lg); /* or --radius-xl for large */
```

No heavy box-shadow — border does the work.

### Hover pattern (dark mode)

```css
background: rgba(20,184,166,0.08);
border-color: rgba(20,184,166,0.30);
transform: translateY(-3px);
box-shadow: 0 12px 40px rgba(20,184,166,0.08);
```

### Hover pattern (light mode)

```css
background: rgba(91,33,182,0.04);
border-color: rgba(91,33,182,0.18);
box-shadow: 0 8px 24px rgba(91,33,182,0.06);
```

Text stays `var(--text-1)` on hover — never `#fff` in light mode.

---

## Navigation

### Dropdown items (`.dd-item`)

```css
display: flex; gap: 11px; padding: 9px 11px;
border-radius: 10px; text-decoration: none;
```

### Dropdown icon tiles (`.dd-icon`)

30×30px, `border-radius: 8px`. Three color variants:

| Class | Background | Stroke color |
|---|---|---|
| `.v` (violet) | `rgba(91,33,182,0.25)` | `--purple-bright` |
| `.t` (teal) | `rgba(20,184,166,0.18)` | `--teal` |
| `.a` (amber) | `rgba(245,158,11,0.18)` | `rgba(251,191,36,1)` |

All icons are inline Lucide SVGs: `width="14" height="14"`, `stroke-width="2"`, `stroke="currentColor"`, `fill="none"`.

### Breakpoints

| Viewport | Behavior |
|---|---|
| `≤1200px` | Case Studies + Calculators buttons hidden |
| `≤768px` | Full hamburger — nav-center + nav-right hidden |
| `≤768px` | Pill nav shown (scroll-triggered) |

---

## Animations

```css
@keyframes drift     { 0%→100%: translate(0,0)→translate(40px,30px) }       /* bg orbs */
@keyframes fadeUp    { from: opacity:0, translateY(20px) → to: opacity:1 }
@keyframes pulse     { 0%,100%: scale(1) → 50%: scale(0.8), opacity:0.5 }   /* teal dot */
@keyframes blink     { 0%,100%: opacity:1 → 50%: opacity:0 }                /* cursor */
@keyframes fcatFadeIn { from: opacity:0, translateY(10px) → to: opacity:1 } /* feature tabs */
```

Standard transition on interactive elements: `0.15–0.25s ease` or `cubic-bezier(0.32,0.72,0,1)` for drawers/modals.

---

## Decorative Backgrounds

Dark mode uses floating radial orbs (`.bg-canvas` — `display:none` in light mode) and per-section gradients:

- Purple radial on AI/CTA sections: `rgba(91,33,182,0.09–0.22)`
- Teal radial on use-case sections: `rgba(20,184,166,0.10)`
- Linear gradient washes on proof/before-after strips

**Light mode rule:** all decorative glows use `opacity: 0.04–0.15` — barely visible.

---

## Icon System

All icons are **inline Lucide SVGs** — no icon font, no sprite sheet.

Standard attributes:

```html
width="16" height="16" viewBox="0 0 24 24"
fill="none" stroke="currentColor"
stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
```

Color comes from CSS `color` on the parent element — the SVG inherits via `currentColor`.

Nav dropdown icons use `width="14" height="14"`.
Content section icons use `width="16"–"26"` depending on context.

---

## Forms

Two capture surfaces — both submit to Formspree `xlgpwdbq`:

| Surface | Location | Fields |
|---|---|---|
| Inline form | Final CTA section | Name, email, org, role, program type |
| Lead drawer | Slide-in panel (nav CTA) | Same + households + message |

Both use a honeypot hidden field (`#df-website` / `#ld-website`) and a success state div revealed on submit. Fallback: `mailto:liz@resonancehq.io`.

---

## Pages & Files

| File | URL | Nav type |
|---|---|---|
| `index.html` | `/` | Full 4-dropdown nav |
| `about.html` | `/about` | Full 4-dropdown nav |
| `pricing.html` | `/pricing` | Full 4-dropdown nav |
| `case-studies.html` | `/case-studies` | Simple bar nav |
| `calculators.html` | `/calculators` | Simple bar nav |

**CSS architecture:** All CSS is inline per-file inside a `<style>` block in `<head>`. No external stylesheet. Changes to shared elements (nav, footer) must be replicated manually across all affected files.

---

## Logo

The Resonance nav logo is a **5-path SVG** with gradients `paint0_32` through `paint4_32`. Never use a shortened version — any version with fewer than 5 paths is incomplete.

```html
<div class="logo-mark" style="background:none;padding:0;width:32px;height:32px;display:flex;align-items:center;justify-content:center;">
  <svg width="32" height="32" viewBox="0 0 154 182" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- 5 paths required: paint0_32 through paint4_32 -->
  </svg>
</div>
<span class="logo-text">Resonance</span>
```

Logo text uses `--ff-display`, weight 400, `1.2rem`.

---

## Third-Party Integrations

| Service | Purpose | Key |
|---|---|---|
| Formspree | Form submissions | `xlgpwdbq` |
| Calendly | Demo booking | `calendly.com/yourresonance/demo` ⚠️ confirm live URL |
| Google Fonts | Typography | Fraunces, Instrument Sans, JetBrains Mono |
| Netlify | Hosting + CDN | Auto-deploy from `main` branch |
