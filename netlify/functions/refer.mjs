// POST /api/refer  —  referral intake
// 1. validate + honeypot   2. write to Netlify Blobs (system of record)
// 3. mirror row to Google Sheet webhook (optional)   4. email via Resend (optional)
// Steps 3 and 4 are skipped silently when their env vars are not set.

import { getStore } from "@netlify/blobs";
import referrers from "../../referrers.json" with { type: "json" };

const ENV = (k, d = "") => (process.env[k] || d).trim();
const NOTIFY_TO   = ENV("REFERRAL_NOTIFY_TO", "ray@resonancehq.io");
const FROM        = ENV("RESEND_FROM", "Resonance <referrals@resonancehq.io>");
const REPLY_TO    = ENV("REFERRAL_REPLY_TO", "sean@resonancehq.io");
const SITE        = "https://resonancehq.io";

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const slugify = (s = "") => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "unknown";
const isEmail = (s = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const clip = (s, n) => String(s ?? "").trim().slice(0, n);

export default async (req) => {
  if (req.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);

  let body;
  try { body = await req.json(); } catch { return json({ ok: false, error: "Invalid JSON" }, 400); }

  // Honeypot + minimum fill time: bots fill hidden fields and submit instantly
  if (body.website) return json({ ok: true, id: "ignored" });
  if (Number(body.elapsed_ms) >= 0 && Number(body.elapsed_ms) < 1500) return json({ ok: true, id: "ignored" });

  const slug = slugify(body.referrer_slug || body.referrer_name);
  const known = referrers[slug] || null;
  const selfMode = body.mode === "self";           // prospect filled in their own details via /via/<slug>
  const titleCase = (s) => s.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  const r = {
    referrer_slug:  slug,
    source:         selfMode ? "link" : "introduction",
    referrer_name:  clip(body.referrer_name || known?.name || (selfMode ? titleCase(slug) : ""), 120),
    referrer_org:   clip(body.referrer_org  || known?.org, 160),
    referrer_email: clip(selfMode ? (known?.email || body.referrer_email) : body.referrer_email, 160).toLowerCase(),
    first_name:     clip(body.first_name, 80),
    last_name:      clip(body.last_name, 80),
    email:          clip(body.email, 160).toLowerCase(),
    organization:   clip(body.organization, 160),
    role:           clip(body.role, 80),
    program:        clip(body.program, 80),
    households:     clip(body.households, 40),
    context:        clip(body.context, 2000),
    consent:        body.consent === true || body.consent === "yes",
    utm_source:     clip(body.utm_source, 80),
    utm_medium:     clip(body.utm_medium, 80),
    utm_campaign:   clip(body.utm_campaign, 80),
    page_url:       clip(body.page_url, 400),
    user_agent:     clip(req.headers.get("user-agent"), 300),
    status:         "new",
  };

  const errors = [];
  if (!r.referrer_name) errors.push("Referrer name is required.");
  if (selfMode ? (r.referrer_email && !isEmail(r.referrer_email)) : !isEmail(r.referrer_email)) errors.push("A valid referrer email is required.");
  if (!r.first_name) errors.push("Contact first name is required.");
  if (!isEmail(r.email)) errors.push("A valid contact email is required.");
  if (!r.organization) errors.push("Contact organization is required.");
  if (!r.consent) errors.push(selfMode ? "Please confirm you'd like us to reach out." : "Please confirm the contact is expecting to hear from us.");
  if (errors.length) return json({ ok: false, error: errors.join(" ") }, 422);

  const now = new Date();
  const stamp = now.toISOString().replace(/[:.]/g, "-");
  const id = `${slug}/${stamp}-${slugify(r.first_name + "-" + r.last_name)}`;
  const record = { id, submitted_at: now.toISOString(), ...r };

  // 1. System of record
  try {
    await getStore("referrals").setJSON(id, record);
  } catch (e) {
    console.error("[refer] blob write failed", e);
    return json({ ok: false, error: "Could not save referral. Please email " + REPLY_TO + "." }, 500);
  }

  // 2. Sheet mirror + 3. Emails run in parallel; failures are logged, not surfaced
  const results = await Promise.allSettled([mirrorToSheet(record), sendEmails(record)]);
  results.forEach((x, i) => { if (x.status === "rejected") console.error(["[refer] sheet", "[refer] email"][i], x.reason); });

  return json({ ok: true, id });
};

async function mirrorToSheet(rec) {
  const url = ENV("SHEETS_WEBHOOK_URL");
  if (!url) return "skipped";
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret: ENV("SHEETS_WEBHOOK_SECRET"), record: rec }),
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`Sheet webhook ${res.status}`);
  return "ok";
}

async function sendEmails(rec) {
  const key = ENV("RESEND_API_KEY");
  if (!key) return "skipped";
  const contact = `${rec.first_name} ${rec.last_name}`.trim();
  const row = (k, v) => v ? `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;vertical-align:top">${esc(k)}</td><td style="padding:6px 0;color:#111">${esc(v)}</td></tr>` : "";

  const viaLink = rec.source === "link";
  const internal = {
    from: FROM, to: NOTIFY_TO.split(",").map(s => s.trim()), reply_to: viaLink ? rec.email : (rec.referrer_email || REPLY_TO),
    subject: viaLink
      ? `Referral via link — ${rec.referrer_name} → ${contact} (${rec.organization})`
      : `Referral — ${rec.referrer_name} → ${contact} (${rec.organization})`,
    html: `<div style="font-family:-apple-system,Segoe UI,sans-serif;font-size:14px;line-height:1.5;color:#111;max-width:600px">
      <p style="margin:0 0 16px">${viaLink
        ? `<strong>${esc(contact)}</strong> came in through <strong>${esc(rec.referrer_name)}</strong>'s share link and asked to be contacted.`
        : `<strong>${esc(rec.referrer_name)}</strong>${rec.referrer_org ? " at " + esc(rec.referrer_org) : ""} referred a new contact.`}</p>
      <table style="border-collapse:collapse">
        ${row("Contact", contact)}${row("Email", rec.email)}${row("Organization", rec.organization)}
        ${row("Role", rec.role)}${row("Program", rec.program)}${row("Households", rec.households)}
        ${row("Context", rec.context)}
        ${row("Referrer", rec.referrer_name)}${row("Referrer email", rec.referrer_email)}
        ${row("Source", [rec.utm_source, rec.utm_medium, rec.utm_campaign].filter(Boolean).join(" / "))}
        ${row("Record ID", rec.id)}
      </table>
      <p style="margin:16px 0 0;color:#6b7280;font-size:12px">Reply to this email to reach the ${viaLink ? "contact" : "referrer"}. Export all referrals at ${SITE}/api/referrals.csv?token=…</p>
    </div>`,
  };

  const toReferrer = {
    from: FROM, to: [rec.referrer_email], reply_to: REPLY_TO,
    subject: viaLink ? `${contact} reached Resonance through your link` : `Thanks for referring ${contact} to Resonance`,
    html: `<div style="font-family:-apple-system,Segoe UI,sans-serif;font-size:15px;line-height:1.6;color:#111;max-width:560px">
      <p>Hi ${esc(rec.referrer_name.split(" ")[0])},</p>
      ${viaLink
        ? `<p><strong>${esc(contact)}</strong> at ${esc(rec.organization)} just reached out to Resonance through your referral link. We'll follow up within one business day and keep you posted.</p>`
        : `<p>Thank you for introducing us to <strong>${esc(contact)}</strong> at ${esc(rec.organization)}. We'll reach out within one business day and keep you posted on how it goes.</p>`}
      <p>Referrals from people who've run programs on Resonance are the best introductions we get. We appreciate it.</p>
      <p style="margin-top:24px">— The Resonance team<br><a href="${SITE}" style="color:#5B21B6">resonancehq.io</a></p>
    </div>`,
  };

  const toContact = {
    from: FROM, to: [rec.email], reply_to: REPLY_TO,
    subject: viaLink ? `Thanks for reaching out to Resonance` : `${rec.referrer_name} suggested we connect`,
    html: `<div style="font-family:-apple-system,Segoe UI,sans-serif;font-size:15px;line-height:1.6;color:#111;max-width:560px">
      <p>Hi ${esc(rec.first_name)},</p>
      ${viaLink
        ? `<p>Thanks for getting in touch through ${esc(rec.referrer_name)}'s link. We've got your details${rec.program ? " and a note that you're working on " + esc(rec.program) : ""}.</p>`
        : `<p><strong>${esc(rec.referrer_name)}</strong>${rec.referrer_org ? " from " + esc(rec.referrer_org) : ""} thought Resonance might be useful for your work${rec.program ? " on " + esc(rec.program) : ""}.</p>`}
      <p>Resonance is purpose-built software for affordable housing relocation and redevelopment programs: household tracking, URA compliance, unit matching, and phase sequencing in one place.</p>
      <p>Someone from our team will follow up shortly. If you'd rather pick a time now, reply to this email.</p>
      <p style="margin-top:24px">— The Resonance team<br><a href="${SITE}" style="color:#5B21B6">resonancehq.io</a></p>
    </div>`,
  };

  const send = (msg) => fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(msg),
  }).then(async res => { if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`); });

  const sends = [send(internal), send(toContact)];
  if (isEmail(rec.referrer_email)) sends.push(send(toReferrer));
  const out = await Promise.allSettled(sends);
  const failed = out.filter(x => x.status === "rejected");
  if (failed.length) throw new Error(failed.map(f => f.reason?.message).join("; "));
  return "ok";
}

export const config = { path: "/api/refer" };
