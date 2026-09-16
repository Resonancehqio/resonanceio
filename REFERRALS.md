# Referral program — setup & operations

`/refer` is a client-specific referral page. Each client gets a link, every submission is
stored in Netlify Blobs (system of record), mirrored to a Google Sheet, and emailed via Resend.
Clients can see the status of their own referrals on the same page with a private key.

## Files

| File | Purpose |
|---|---|
| `refer.html` | The page. Personalizes from `/refer/<slug>` or `?via=<slug>`. Shows the tracker when `?key=` is present. |
| `referrers.json` | Registry of known referrers: slug → display name / org. Unknown slugs still work (title-cased). |
| `netlify/functions/refer.mjs` | `POST /api/refer` — validate, honeypot, write blob, mirror to Sheet, send emails. |
| `netlify/functions/referrals-mine.mjs` | `GET /api/referrals/mine` (client or admin view), `POST /api/referrals/status` (admin). |
| `netlify/functions/referrals-export.mjs` | `GET /api/referrals.csv` / `.json` — full export, admin token. |
| `package.json` | Only dependency is `@netlify/blobs`. Netlify installs it on deploy. |

## Environment variables (Netlify → Site configuration → Environment variables)

| Variable | Required | Notes |
|---|---|---|
| `REFERRALS_EXPORT_TOKEN` | yes | Admin key. Long random string. Unlocks CSV export, the admin tracker, and status updates. |
| `REFERRER_TOKEN_KALEL` | per client | Private key for the `kalel` slug. Pattern is `REFERRER_TOKEN_<SLUG>` upper-cased, dashes → underscores. |
| `RESEND_API_KEY` | for email | From resend.com. Without it, emails are skipped and everything else still works. |
| `RESEND_FROM` | no | Default `Resonance <referrals@resonancehq.io>`. Domain must be verified in Resend. |
| `REFERRAL_NOTIFY_TO` | no | Who gets the internal alert. Default `ray@resonancehq.io`. Comma-separate for several. |
| `REFERRAL_REPLY_TO` | no | Reply-to on the referrer / contact emails. Default `sean@resonancehq.io`. |
| `SHEETS_WEBHOOK_URL` | for Sheet | Apps Script web app URL (below). Without it the mirror is skipped. |
| `SHEETS_WEBHOOK_SECRET` | with Sheet | Any string; must match the one in the Apps Script. |

Generate tokens with: `openssl rand -hex 24`

## Two kinds of link per client

| Link | Who fills it in | What it does |
|---|---|---|
| `https://resonancehq.io/refer/kalel` | **Kalel** | Kalel introduces someone: fills in their own name/email plus the contact's details. |
| `https://resonancehq.io/via/kalel` | **The prospect** | Kalel hands this to people. They fill in their own details; the submission is tagged to Kalel automatically and shows in Kalel's tracker with a "via link" badge. |

Both are the same page (`refer.html`) in two modes. The `/via/` path (or `?mode=self`) switches to prospect mode:
referrer fields hidden, copy rewritten ("Kalel thinks we should talk"), consent reworded, tracker never shown.

In prospect mode the referrer's thank-you email goes to the `email` in `referrers.json` for that slug. Leave it blank and
that email is simply skipped; you and the prospect still get theirs.

## Links to hand out

| Who | Link |
|---|---|
| Client referral page | `https://resonancehq.io/refer/kalel` |
| Same, with their private tracker | `https://resonancehq.io/refer/kalel?key=<REFERRER_TOKEN_KALEL>` |
| Share link for the client to give prospects | `https://resonancehq.io/via/kalel` |
| Your admin view (all referrers, editable status) | `https://resonancehq.io/refer?key=<REFERRALS_EXPORT_TOKEN>` |
| Admin view, one referrer | `https://resonancehq.io/refer/kalel?key=<REFERRALS_EXPORT_TOKEN>` |
| CSV download | `https://resonancehq.io/api/referrals.csv?token=<REFERRALS_EXPORT_TOKEN>` (add `&via=kalel` to filter) |

The client sees only: contact name, organization, role, program, date, status. Never emails or notes.

## Adding a new referrer

1. Add a line to `referrers.json`: `"acme": { "name": "Acme", "org": "Acme Housing Partners", "type": "Developer", "email": "contact@acme.com" }` (email optional; used for the thank-you when a prospect comes in via their share link)
2. Add `REFERRER_TOKEN_ACME` in Netlify (optional; only needed if they should see their tracker).
3. Send them `https://resonancehq.io/refer/acme?key=…` (their page + tracker) and `https://resonancehq.io/via/acme` (to pass on to prospects)

## Statuses

`new` → `contacted` → `demo scheduled` → `proposal` → `won` / `lost`

Change them from the admin tracker (dropdown per row), or with curl:

```bash
curl -X POST "https://resonancehq.io/api/referrals/status?key=$REFERRALS_EXPORT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"id":"kalel/2026-09-16T21-26-01-051Z-jane-doe","status":"contacted","note":"Left voicemail"}'
```

Status changes update the blob only. The Sheet is an intake mirror; treat the blob / admin view as truth.

## Google Sheet mirror (optional)

1. Create a Sheet with a tab named `Referrals`. Row 1 headers, in this order:
   `submitted_at, status, source, referrer_slug, referrer_name, referrer_org, referrer_email, first_name, last_name, email, organization, role, program, households, context, utm_source, utm_medium, utm_campaign, page_url, id`
2. Extensions → Apps Script. Replace the contents with:

```javascript
const SECRET = 'paste-the-same-value-as-SHEETS_WEBHOOK_SECRET';
const COLS = ['submitted_at','status','source','referrer_slug','referrer_name','referrer_org','referrer_email',
  'first_name','last_name','email','organization','role','program','households','context',
  'utm_source','utm_medium','utm_campaign','page_url','id'];

function doPost(e) {
  const body = JSON.parse(e.postData.contents || '{}');
  if (body.secret !== SECRET) return ContentService.createTextOutput('forbidden').setMimeType(ContentService.MimeType.TEXT);
  const r = body.record || {};
  SpreadsheetApp.getActive().getSheetByName('Referrals').appendRow(COLS.map(c => r[c] == null ? '' : String(r[c])));
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
```

3. Deploy → New deployment → Web app. Execute as **Me**, access **Anyone**. Copy the URL into `SHEETS_WEBHOOK_URL`.
4. Redeploy the web app (new version) whenever you edit the script.

## Resend setup

1. resend.com → Domains → add `resonancehq.io`, add the DNS records they give you, wait for verified.
2. API Keys → create one with sending access → `RESEND_API_KEY`.
3. Free tier is 3,000 emails/month. Each referral sends three (you, the referrer, the contact).

## Spam protection

Honeypot field (`website`), minimum 1.5s fill time, server-side validation, required consent checkbox.
No CAPTCHA. If spam appears, add Cloudflare Turnstile to `refer.html` and verify the token in `refer.mjs`.

## Local testing

```bash
REFERRALS_EXPORT_TOKEN=test-admin REFERRER_TOKEN_KALEL=test-kalel netlify dev --offline
# then open http://localhost:8888/refer/kalel?key=test-kalel  and  http://localhost:8888/refer?key=test-admin
```

Blobs work locally in a sandbox and do not touch production data. Known dev-only quirk: when a function
returns 403/404, the dev proxy retries the request as `<path>.html` and you may see a 405 instead. Production is unaffected.
