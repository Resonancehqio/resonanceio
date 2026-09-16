// GET /api/referrals.csv?token=…[&via=kalel]   → CSV of every referral (optionally one referrer)
// GET /api/referrals.json?token=…[&via=kalel]  → same as JSON
// Token comes from the REFERRALS_EXPORT_TOKEN env var. No token set = endpoint disabled.

import { getStore } from "@netlify/blobs";

const COLS = ["submitted_at","status","source","referrer_slug","referrer_name","referrer_org","referrer_email",
  "first_name","last_name","email","organization","role","program","households","context",
  "utm_source","utm_medium","utm_campaign","page_url","id"];

const csvCell = (v) => { const s = String(v ?? ""); return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };

export default async (req) => {
  const url = new URL(req.url);
  const expected = (process.env.REFERRALS_EXPORT_TOKEN || "").trim();
  const given = url.searchParams.get("token") || (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!expected || given !== expected) return new Response("Unauthorized", { status: 401 });

  const via = (url.searchParams.get("via") || "").toLowerCase().replace(/[^a-z0-9-]/g, "");
  const store = getStore("referrals");
  const { blobs } = await store.list({ prefix: via ? `${via}/` : undefined });
  const records = (await Promise.all(blobs.map(b => store.get(b.key, { type: "json" }))))
    .filter(Boolean)
    .sort((a, b) => (b.submitted_at || "").localeCompare(a.submitted_at || ""));

  if (url.pathname.endsWith(".json")) {
    return new Response(JSON.stringify({ count: records.length, records }, null, 2),
      { headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
  }

  const lines = [COLS.join(","), ...records.map(r => COLS.map(c => csvCell(r[c])).join(","))];
  return new Response(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="referrals${via ? "-" + via : ""}.csv"`,
      "Cache-Control": "no-store",
    },
  });
};

export const config = { path: ["/api/referrals.csv", "/api/referrals.json"] };
