# NYSAFAH 2026 — Conference Landing Page

**File:** `nysafah.html`
**Deploy to:** `https://resonancehq.io/nysafah`
**Status:** Ready for deployment

---

## Overview

A dedicated landing page for NYSAFAH 2026 conference attendees. Purpose-built for the affordable housing / PACT audience — not a generic homepage redirect. Includes built-in UTM click tracking, a demo request form, and a direct link to PresLog.

---

## Deployment

### 1. Add the file to the site repo

Place `nysafah.html` at the root of the site (same level as `index.html`, `about.html`, etc.).

It will be live at:
```
https://resonancehq.io/nysafah
```

### 2. Add a redirect rule (Netlify)

Add this line to `_redirects`:
```
/nysafah    /nysafah.html    200
```

Or add to `netlify.toml`:
```toml
[[redirects]]
  from = "/nysafah"
  to   = "/nysafah.html"
  status = 200
```

### 3. Update `sitemap.xml`

Do **not** add this page to the sitemap — it has `noindex, nofollow` meta tags and should not be crawled.

---

## QR Code & Tracking Links

### Primary QR Code URL

Point every QR code and printed material to:
```
https://resonancehq.io/nysafah?utm_source=nysafah&utm_medium=qr&utm_campaign=nysafah2026
```

### Other Distribution Channels

| Channel | URL |
|---|---|
| QR code (print / badge) | `?utm_source=nysafah&utm_medium=qr&utm_campaign=nysafah2026` |
| Email blast | `?utm_source=nysafah&utm_medium=email&utm_campaign=nysafah2026` |
| LinkedIn post | `?utm_source=linkedin&utm_medium=social&utm_campaign=nysafah2026` |
| Direct / word of mouth | `?utm_source=nysafah&utm_medium=direct&utm_campaign=nysafah2026` |

The page auto-reads all three UTM params from the URL. Defaults to `nysafah / qr / nysafah2026` if params are missing.

### Recommended QR Code Tool

- **[qr.io](https://qr.io)** or **[Bitly](https://bitly.com)** — create a short link wrapping the full UTM URL, then generate QR from the short link. This lets you change the destination later without reprinting.

---

## Analytics

### Google Analytics 4

Drop your GA4 snippet into `nysafah.html` before `</head>`. The page fires these events automatically:

| Event | Trigger |
|---|---|
| `page_view` | On load (standard GA4) |
| `outbound_click` | Clicks on Main Site, Explore Platform |
| `outbound_click` | Click on PresLog link |
| `demo_request` | Successful form submission |

All events include `utm_source` and `utm_campaign` properties.

### Form Submissions

The demo form currently logs to console and has a `// TODO` stub. Wire it to one of:

**Option A — Formspree (fastest)**
```html
<!-- Replace the submitDemo() fetch line with: -->
fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(payload)
});
```

**Option B — Zapier Webhook**
```
POST https://hooks.zapier.com/hooks/catch/YOUR_HOOK_ID/
```
Zapier can then route to Gmail, Slack, Airtable, or HubSpot.

**Option C — Internal API**
```
POST /api/demo-request
```
Body includes: `name`, `email`, `org`, `program`, `role`, `utm`, `source`, `ts`

---

## Page Sections

| Section | Description |
|---|---|
| Hero | NYSAFAH badge, tagline, headline, subtext, CTAs, 4-stat strip |
| What is Resonance | Blurb copy + capability card (5 core platform features) |
| Who We Serve | 6 audience cards (Housing Authorities, Developers, Coordinators, Leadership, Community Partners, Owners) |
| Programs Supported | 13 program pills — PACT, RAD, Section 18 highlighted |
| PresLog | Callout card linking to preslog.io |
| Demo Form | Name, email, org, program dropdown, role picker, success state |
| Footer | Logo, privacy policy link, resonancehq.io link |

---

## Form Fields

| Field | Type | Required |
|---|---|---|
| First Name | Text | Yes |
| Last Name | Text | No |
| Work Email | Email | Yes |
| Organization | Text | Yes |
| Primary Program | Dropdown | No |
| Role | Toggle button | No |

**Programs in dropdown:**
PACT / RAD Conversion · Section 18 Disposition · Choice Neighborhoods · LIHTC Preservation · HOPE VI · HUD Disposition · Multiple Programs · Other

**Role options:**
Housing Authority · Developer / Redeveloper · Relocation Coordinator · Program Leadership · Community Partner · Service Provider · Other

---

## Pending

- [ ] Wire form to submission endpoint (Formspree, Zapier, or internal API)
- [ ] Add GA4 snippet to `<head>`
- [ ] Generate and print QR codes
- [ ] Deploy file to Netlify
- [ ] Test QR → page → form flow end to end
- [ ] Confirm PresLog URL (`preslog.io`) is correct and live
