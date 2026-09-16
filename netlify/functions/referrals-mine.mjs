// GET  /api/referrals/mine?via=kalel&key=…   → that referrer's own referrals (client view)
//        key = REFERRER_TOKEN_<SLUG>  (e.g. REFERRER_TOKEN_KALEL)  → limited fields, one referrer
//        key = REFERRALS_EXPORT_TOKEN                              → full fields, all referrers (admin)
// POST /api/referrals/status  {id, status}  with admin key         → update a referral's status

import { getStore } from "@netlify/blobs";

export const STATUSES = ["new", "contacted", "demo scheduled", "proposal", "won", "lost"];
const CLIENT_FIELDS = ["id", "submitted_at", "status", "source", "first_name", "last_name", "organization", "program", "role"];

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
const clean = (s) => String(s ?? "").toLowerCase().replace(/[^a-z0-9-]/g, "");

function auth(req, url) {
  const key = url.searchParams.get("key") || (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const admin = (process.env.REFERRALS_EXPORT_TOKEN || "").trim();
  if (key && admin && key === admin) return { admin: true };
  const via = clean(url.searchParams.get("via"));
  const own = (process.env["REFERRER_TOKEN_" + via.toUpperCase().replace(/-/g, "_")] || "").trim();
  if (via && key && own && key === own) return { admin: false, via };
  return null;
}

export default async (req) => {
  const url = new URL(req.url);
  const who = auth(req, url);
  if (!who) return json({ ok: false, error: "Unauthorized" }, 401);
  const store = () => getStore({ name: "referrals", consistency: "strong" });

  if (url.pathname.endsWith("/status")) {
    if (req.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);
    if (!who.admin) return json({ ok: false, error: "Admin key required" }, 403);
    let body; try { body = await req.json(); } catch { return json({ ok: false, error: "Invalid JSON" }, 400); }
    const status = String(body.status || "").toLowerCase();
    if (!STATUSES.includes(status)) return json({ ok: false, error: "Status must be one of: " + STATUSES.join(", ") }, 422);
    const id = String(body.id || "").trim();
    if (!id) return json({ ok: false, error: "id is required" }, 422);
    const rec = await store().get(id, { type: "json" });
    if (!rec) return json({ ok: false, error: "Not found" }, 404);
    rec.status = status;
    rec.status_updated_at = new Date().toISOString();
    if (body.note !== undefined) rec.note = String(body.note).slice(0, 1000);
    await store().setJSON(rec.id, rec);
    return json({ ok: true, record: rec });
  }

  if (req.method !== "GET") return json({ ok: false, error: "Method not allowed" }, 405);
  const via = who.admin ? clean(url.searchParams.get("via")) : who.via;
  const s = store();
  const { blobs } = await s.list({ prefix: via ? `${via}/` : undefined });
  let records = (await Promise.all(blobs.map(b => s.get(b.key, { type: "json" })))).filter(Boolean)
    .sort((a, b) => (b.submitted_at || "").localeCompare(a.submitted_at || ""));
  if (!who.admin) records = records.map(r => Object.fromEntries(CLIENT_FIELDS.map(k => [k, r[k]])));
  return json({ ok: true, admin: who.admin, via: via || null, statuses: STATUSES, count: records.length, records });
};

export const config = { path: ["/api/referrals/mine", "/api/referrals/status"] };
