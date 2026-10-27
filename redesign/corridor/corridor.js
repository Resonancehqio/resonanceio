// Resonance corridor engine (26 Oct 2026). One scroll value in 0..1 drives a camera spline through "rooms" of 3D content
// and the DOM text layered over it. Exact in reverse. Hover (tap on phones) picks 3D objects and shows a tooltip.
// Pages declare rooms: { name, a, b, dom, cam: [[q, x,y,z, tx,ty,tz], ...], build(g, K), update(q, K) }.
window.Corridor = (() => {
'use strict';
const ss = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, t) => a + (b - a) * t;
const eo = x => 1 - Math.pow(1 - clamp(x), 3);
const snap = x => { x = clamp(x); return x < .7 ? eo(x / .7) * 1.03 : 1.03 - .03 * ss(.7, 1, x); };
const sub = (q, a, b) => clamp((q - a) / (b - a));
const vis = (q, i0 = .06, i1 = .2, o0 = .8, o1 = .94) => ss(i0, i1, q) * (1 - ss(o0, o1, q));
const Q = new URLSearchParams(location.search);
const PIN = Q.has('p') ? +Q.get('p') : null;
const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches && PIN === null;
const FINE = matchMedia('(pointer: fine)').matches;
const PH0 = innerWidth < 760, OX = PH0 ? 0 : 3.6, OY = PH0 ? 2.2 : 0;
// the text column: everything left of this (desktop) belongs to the copy; the 3D is shifted and scaled into what remains
const TEXT_RIGHT = PH0 ? 0 : Math.min(innerWidth * .55, Math.max(20, (innerWidth - 1180) / 2) + 20 + 560);
const FIT = PH0 ? .72 : clamp((innerWidth - TEXT_RIGHT) / 900, .6, 1);
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const R = (s => () => (s = (s * 16807) % 2147483647) / 2147483647)(7);
const fmt = n => Math.round(n).toLocaleString('en-US');

// monotone cubic through keys [[p, v], ...]: never overshoots, never stops dead between keys
function mono(keys) {
  const n = keys.length, x = keys.map(k => k[0]), y = keys.map(k => k[1]); if (n === 1) return () => y[0];
  const d = [], m = []; for (let i = 0; i < n - 1; i++) d[i] = (y[i + 1] - y[i]) / (x[i + 1] - x[i]);
  m[0] = d[0]; m[n - 1] = d[n - 2]; for (let i = 1; i < n - 1; i++) m[i] = d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2;
  for (let i = 0; i < n - 1; i++) { if (d[i] === 0) { m[i] = m[i + 1] = 0; continue; } const a = m[i] / d[i], b = m[i + 1] / d[i], s = a * a + b * b; if (s > 9) { const t = 3 / Math.sqrt(s); m[i] = t * a * d[i]; m[i + 1] = t * b * d[i]; } }
  return p => { if (p <= x[0]) return y[0]; if (p >= x[n - 1]) return y[n - 1]; let i = 0; while (x[i + 1] < p) i++; const h = x[i + 1] - x[i], t = (p - x[i]) / h, t2 = t * t, t3 = t2 * t; return (2 * t3 - 3 * t2 + 1) * y[i] + (t3 - 2 * t2 + t) * h * m[i] + (-2 * t3 + 3 * t2) * y[i + 1] + (t3 - t2) * h * m[i + 1]; };
}

// ---- DOM helpers (work with or without WebGL) ----------------------------------------------------------
const words = (el, text) => { el.innerHTML = ''; const ws = text.split(' '), mid = (ws.length - 1) / 2; ws.forEach((w, i) => { const s = document.createElement('span'); s.className = 'w'; s.textContent = w; s.style.setProperty('--d', Math.abs(i - mid).toFixed(1)); el.appendChild(s); el.appendChild(document.createTextNode(' ')); }); return [...el.querySelectorAll('.w')]; };
const scrollRange = () => document.documentElement.scrollHeight - innerHeight;
// sibling pages: resolve against the URL the stylesheet really loaded from (the artifact viewer serves files next to the page there)
function siteBase() { const l = document.querySelector('link[rel="stylesheet"][href$="corridor.css"]'); const u = l && l.href ? l.href : location.href; return u.replace(/corridor\.css(\?.*)?$/, '').replace(/[^/]*$/, ''); }
function abs(href) { return /^([a-z]+:|\/\/)/i.test(href) ? href : siteBase() + href; }
function veilTo(href) { const url = abs(href); const v = $('#veil'); if (!v) { location.href = url; return; } v.classList.add('on'); setTimeout(() => { location.href = url; }, 420); }
function absolutizeLinks() { $$('a[data-page]').forEach(a => { try { a.setAttribute('href', abs(a.getAttribute('href'))); } catch (e) {} }); }
function magnet() { if (!FINE) return; $$('.mag').forEach(b => { if (b._mag) return; b._mag = 1;
  b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2); b.style.transform = `translate(${dx * .18}px, ${dy * .22}px)`; b.style.setProperty('--gx', (e.clientX - r.left) + 'px'); b.style.setProperty('--gy', (e.clientY - r.top) + 'px'); });
  b.addEventListener('pointerleave', () => { b.style.transform = ''; }); }); }

// ---- materials and builders ---------------------------------------------------------------------------
const C = {};
const U = v => ({ value: v });
const cvs = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
const lineMat = (col, op = .5) => new THREE.LineBasicMaterial({ color: col || C.bone, transparent: true, opacity: op });
const fillMat = (col, op = .06) => new THREE.MeshBasicMaterial({ color: col || C.bone, transparent: true, opacity: op, side: THREE.DoubleSide, depthWrite: false });

// ---- screens: real-looking product surfaces drawn on canvas, redrawn live on hover -------------------------------
const PAL = { bg: '#0F141D', bg2: '#182030', hdr: '#1C2636', line: '#273246', text: '#E9E3D6', dim: '#8E96A6', mute: '#5E6778', blue: '#6FA8DC', teal: '#5BC0BE', sand: '#D9B98A', plum: '#B48EAD', green: '#7FB58A', ember: '#E2663A', gold: '#E8B86D' };
const KIND_ACCENT = { sheet: PAL.blue, mail: PAL.sand, dash: PAL.teal, approve: PAL.plum, decision: PAL.green, lines: PAL.blue, card: PAL.teal, schema: PAL.teal, portfolio: PAL.teal, hall: PAL.teal, alloc: PAL.green, view: PAL.blue, chat: '#B79CE8', explorer: PAL.gold, solver: PAL.green, mapping: PAL.teal, file: PAL.blue, record: PAL.green };
function rr(x, X, y, w, h, r) { x.beginPath(); x.moveTo(X + r, y); x.arcTo(X + w, y, X + w, y + h, r); x.arcTo(X + w, y + h, X, y + h, r); x.arcTo(X, y + h, X, y, r); x.arcTo(X, y, X + w, y, r); x.closePath(); }
function pill(x, X, y, text, col, fill) { x.font = '500 15px "JetBrains Mono", monospace'; const w = x.measureText(text).width + 20; rr(x, X, y, w, 26, 13); x.fillStyle = fill || col + '33'; x.fill(); x.strokeStyle = col; x.lineWidth = 1; x.stroke(); x.fillStyle = col; x.textBaseline = 'middle'; x.fillText(text, X + 10, y + 13); return w; }
const SHEET_ROWS = [['SG-B02', 'Switchgear lineup · Hall B', 'Norvale', '1', '4 Apr 2027', '+35 d', 'late'], ['SG-B01', 'Switchgear lineup · Hall A', 'Norvale', '1', '18 Feb 2027', '0 d', 'ok'], ['TX-204', 'Transformer · 2.5 MVA', 'Norvale', '4', '22 Mar 2027', '0 d', 'ok'], ['BB-117', 'Busbar · 4000 A', 'Norvale', '12', '2 Mar 2027', '+9 d', 'watch'], ['UPS-33', 'UPS module · 1.2 MW', 'Kessrow', '6', '15 Apr 2027', '0 d', 'ok'], ['GEN-08', 'Generator · 3 MW', 'Kessrow', '2', '28 Apr 2027', '0 d', 'ok'], ['CHL-12', 'Chiller · 1,200 t', 'Kessrow', '3', '6 May 2027', '0 d', 'ok']];
// ---- level artefacts: transcript, object explorer, solver matrix, mapping, file, record (step = flag*100 + beat*10 + seconds) ----
const MONO = (w, px) => `${w} ${px}px "JetBrains Mono", monospace`, SANS = (w, px) => `${w} ${px}px "Hanken Grotesk", sans-serif`;
const A01 = (p, t0, d = .35) => Math.min(1, Math.max(0, (p - t0) / d));
function wrapLines(x, text, maxW) { const out = []; text.split('\n').forEach(par => { let line = ''; par.split(' ').forEach(w => { const t = line ? line + ' ' + w : w; if (x.measureText(t).width > maxW && line) { out.push(line); line = w; } else line = t; }); out.push(line); }); return out; }
function stepOf(st) { const s = st.step || 0; const flag = Math.floor(s / 100), r = s - flag * 100, beat = Math.floor(r / 10); return { beat, p: r - beat * 10, flag }; }
function tick(x, X, y, ok, col) { x.strokeStyle = col; x.lineWidth = 2.2; x.beginPath(); if (ok) { x.moveTo(X - 6, y); x.lineTo(X - 1, y + 5); x.lineTo(X + 7, y - 6); } else { x.moveTo(X - 6, y - 6); x.lineTo(X + 6, y + 6); x.moveTo(X + 6, y - 6); x.lineTo(X - 6, y + 6); } x.stroke(); x.lineWidth = 1; }
function dateFrom(m, d0, n) { const dt = new Date(2027, m, d0 + n); return dt.getDate() + ' ' + ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'][dt.getMonth()]; }
const FIGRE = /(\+35 d|0 d float|14 May → 18 Jun|ENG-117|\$410,000|LOG-061|SCH-089|COM-033)/;
function chatKind(x, W, H, st) {
  const { beat, p, flag } = stepOf(st), chat = flag === 1, M = [];
  const L = (t, t0, o = {}) => M.push(Object.assign({ side: 'l', t, t0 }, o)), Rr = (t, t0, o = {}) => M.push(Object.assign({ side: 'r', t, t0 }, o));
  if (beat === 0) { L('From: Norvale Electric · to: 4 recipients\nSubject: SG-B02 delivery revision 03\n\n"Further to our call, lineup SG-B02 will now leave the works on 28 Mar and arrive on site 4 Apr (previously 28 Feb). Apologies for the short notice; the busbar sub-supplier missed its date."', .2); Rr('Found in the email:', 1.8, { chips: ['SG-B02', 'delivery revision 03', '+35 d', 'ex-works 28 Mar', 'on site 4 Apr'] }); }
  if (beat === 1) { L('Draft a summary for the Procurement Director.', .2); Rr('SG-B02 (Norvale) now lands 4 Apr, 35 days late. The Hall B electrical path has no float, so the handover moves from 14 May to 18 Jun unless we act. Options follow.', 1.0, { type: true }); L('What can hold 14 May?', 4.6); Rr('Put into the words the system holds:', 5.3, { chips: ['options', 'handover = 14 May 2027', 'gates', 'cost'] }); }
  if (beat === 2) { L('What can hold 14 May?', .2); if (chat) { Rr('It looks like a supplier delay has affected the switchgear delivery, which may push the schedule back by several weeks. You might consider expediting the order or air-freighting an alternative lineup from another supplier.', .9, { type: true, italic: true }); Rr('no float · no date · no record · one of those options cannot be built', 4.6, { warn: true }); } else { Rr('I can\'t check the design or compute options. Passing down ↓', .9, { warn: true }); Rr('The lineup SG-B02 slipped +35 d (LOG-061). The Hall B electrical path has 0 d float (SCH-089), so the handover moves 14 May → 18 Jun. Four options evaluated; one refused (ENG-117). Recommended: reallocate from Wren phase 2, $410,000 (COM-033).', 2.6, { type: true, figs: true }); } }
  if (beat === 3) { L('What did this cost?', .2); Rr('Language model: $1.17. Ontology, solvers and evidence: about $300.', 1.0, { meter: true }); }
  let y = 90; const maxW = 640;
  M.forEach(m => { const a = A01(p, m.t0); if (a <= 0) return; x.globalAlpha = a;
    x.font = m.italic ? 'italic 400 17px "Hanken Grotesk", sans-serif' : SANS(400, 17); let text = m.t; if (m.type) text = text.slice(0, Math.floor((p - m.t0) * 48));
    const lines = wrapLines(x, text, maxW - 36), lh = 24, bh = lines.length * lh + 26 + (m.chips ? 40 : 0) + (m.meter ? 46 : 0); const bw = Math.min(maxW, Math.max(...lines.map(l => x.measureText(l).width), m.chips ? 560 : 0, m.meter ? 560 : 0) + 36);
    const X = m.side === 'l' ? 26 : W - 26 - bw; rr(x, X, y, bw, bh, 14); x.fillStyle = m.side === 'l' ? PAL.bg2 : (m.warn ? 'rgba(226,102,58,.14)' : 'rgba(155,123,214,.14)'); x.fill(); x.strokeStyle = m.warn ? PAL.ember : (m.side === 'l' ? PAL.line : 'rgba(183,156,232,.45)'); x.stroke();
    x.fillStyle = m.warn ? PAL.ember : PAL.text; x.textBaseline = 'middle';
    lines.forEach((l, i) => { if (m.figs) { let cx = X + 18; l.split(FIGRE).forEach(seg => { if (!seg) return; x.fillStyle = FIGRE.test(seg) && seg.match(FIGRE)[0] === seg ? PAL.green : PAL.text; x.fillText(seg, cx, y + 20 + i * lh); cx += x.measureText(seg).width; }); } else x.fillText(l, X + 18, y + 20 + i * lh); });
    if (m.chips) { let cx = X + 18; m.chips.forEach((c, i) => { const ca = A01(p, m.t0 + .4 + i * .3, .3); if (ca <= 0) return; x.globalAlpha = a * ca; cx += pill(x, cx, y + lines.length * lh + 20, c, PAL.green) + 8; }); x.globalAlpha = a; }
    if (m.meter) { const my = y + lines.length * lh + 24; x.font = MONO(500, 12); x.fillStyle = PAL.mute; x.fillText('$1.17', X + 18, my + 8); rr(x, X + 70, my, 4, 16, 2); x.fillStyle = PAL.ember; x.fill(); rr(x, X + 80, my, bw - 170, 16, 4); x.fillStyle = PAL.text; x.fill(); x.fillStyle = PAL.mute; x.fillText('≈ $300', X + bw - 80, my + 8); }
    y += bh + 12; x.globalAlpha = 1; });
  x.font = MONO(500, 12); x.fillStyle = PAL.mute; x.fillText(chat ? 'CHATBOT ALONE' : 'THROUGH THE STACK · THE MODEL NEVER DECIDES', 26, H - 24);
}
function explorerKind(x, W, H, st) {
  const { beat, p, flag } = stepOf(st), s = flag / 9, G = PAL.gold;
  const TYPES = [['Package', 212, ['need_by', 'float_on_path', 'owner_furnished']], ['Crew', 14, ['trade', 'standby_rate', 'assigned_to']], ['Gate', 18, ['status', 'waits_on', 'readiness']], ['Milestone', 6, ['date', 'depends_on', 'owner']], ['Supplier', 9, ['lead_time', 'qualified_for', 'revision']], ['Handover', 3, ['committed', 'forecast', 'customer']]];
  const RULE = { float_on_path: '= 0 d · Hall B', owner_furnished: '= yes · SG-B02', waits_on: '= SG-B02' };
  const cw = 214, ch = 150, gx = 26, gy = 84;
  TYPES.forEach((t, i) => { const a = beat === 0 ? A01(p, .2 + i * .35, .4) : 1; if (a <= 0) return; const X = gx + (i % 3) * (cw + 12), Yy = gy + Math.floor(i / 3) * (ch + 12); x.globalAlpha = a; x.save(); x.translate(X + cw / 2, Yy + ch / 2); x.scale(.9 + .1 * a, .9 + .1 * a); x.translate(-(X + cw / 2), -(Yy + ch / 2));
    const open = beat >= 2 && i === 0; rr(x, X, Yy, cw, ch, 10); x.fillStyle = open ? 'rgba(232,184,109,.10)' : PAL.bg2; x.fill(); x.strokeStyle = open ? G : PAL.line; x.stroke();
    x.strokeStyle = beat === 0 ? PAL.dim : G; x.lineWidth = 1.6; const ix = X + 18, iy = Y0(Yy); x.strokeRect(ix, iy, 16, 16); if (i % 2) { x.beginPath(); x.moveTo(ix, iy + 8); x.lineTo(ix + 16, iy + 8); x.stroke(); } else { x.beginPath(); x.arc(ix + 8, iy + 8, 4, 0, 7); x.stroke(); } x.lineWidth = 1;
    x.font = SANS(600, 16); x.fillStyle = PAL.text; x.fillText(t[0], X + 44, iy + 8); x.font = MONO(500, 12); x.fillStyle = PAL.dim; const cnt = t[1] + ' objects'; x.fillText(cnt, X + cw - 14 - x.measureText(cnt).width, iy + 8);
    t[2].forEach((pr, j) => { const py = Yy + 58 + j * 26; const isRule = beat >= 1 && RULE[pr] && (i === 0 || i === 2); const ra = isRule ? (beat === 1 ? A01(p, .4 + j * .6, .4) : 1) : 0; x.font = MONO(400, 12.5); x.fillStyle = PAL.mute; x.fillText('·', X + 16, py); x.fillStyle = ra > 0 ? PAL.ember : PAL.dim; x.fillText(pr + (ra > 0 ? ' ' + RULE[pr] : ''), X + 28, py); });
    x.restore(); x.globalAlpha = 1; });
  function Y0(v) { return v + 18; }
  const PX = 720, PW = W - 26 - PX, PY = 84, PH = H - 84 - 26; rr(x, PX, PY, PW, PH, 10); x.fillStyle = PAL.bg2; x.fill(); x.strokeStyle = beat >= 2 ? G : PAL.line; x.stroke();
  const line = (y, k, v, col, a, src) => { if (a <= 0) return; x.globalAlpha = a; x.font = MONO(400, 12); x.fillStyle = PAL.mute; x.fillText(k, PX + 14, y); x.font = MONO(500, 13); x.fillStyle = col || PAL.text; x.fillText(v, PX + 14, y + 20); if (src) { x.font = MONO(400, 11); x.fillStyle = PAL.green; x.fillText(src, PX + PW - 14 - x.measureText(src).width, y + 20); } x.globalAlpha = 1; };
  x.font = MONO(500, 12); x.fillStyle = PAL.mute;
  if (beat === 0) { x.fillText('BASE VOCABULARY', PX + 14, PY + 22); x.font = SANS(400, 14); x.fillStyle = PAL.dim; wrapLines(x, 'Datasets become object types. Rows become objects. Columns become properties. Joins become links. Shared by every data center project.', PW - 28).forEach((l, i) => x.fillText(l, PX + 14, PY + 52 + i * 21)); }
  if (beat === 1) { x.fillText('YOUR RULES · ON TOP', PX + 14, PY + 22); [['Hall B electrical path', 'float = 0 d'], ['SG-B02', 'owner-furnished'], ['Gate 13', 'waits on SG-B02']].forEach((r, i) => line(PY + 52 + i * 54, r[0], r[1], PAL.ember, A01(p, .4 + i * .6, .4))); }
  if (beat >= 2) { x.fillText('PACKAGE · SG-B02', PX + 14, PY + 22); const t = beat === 2 ? p : 9, d = Math.round(35 * s), E = d ? PAL.ember : null;
    const rows = beat === 2 ? [['supplier', 'Norvale Electric', null, 'LOG-061'], ['need-by', '4 Apr 2027', null, 'LOG-061'], ['float on path', '0 d', null, 'SCH-089'], ['owner-furnished', 'yes', null, 'COM-033'], ['blocks →', 'Handover · 14 May 2027', G], ['waits on →', 'Gate 13', G], ['supplied by →', 'Norvale', G]]
      : [['arrival', dateFrom(1, 28, d), E, 'LOG-061'], ['float on path', (d ? '−' + d : '0') + ' d', E, 'SCH-089'], ['gate 13', d > 3 ? 'waits' : 'ready', d > 3 ? PAL.ember : null, 'REL-204'], ['crew', d > 3 ? 'standby · $18,400 / d' : 'on plan', d > 3 ? PAL.ember : null, 'COM-033'], ['handover', dateFrom(1, 28, d + 75), E, 'SCH-089']];
    rows.forEach((r, i) => line(PY + 52 + i * 48, r[0], r[1], r[2], A01(p === t ? t : 9, .3 + i * .35), r[3])); }
}
function solverKind(x, W, H, st) {
  const { beat, p, flag } = stepOf(st), rule = beat === 2 ? flag : 5, closed = rule < 4, wdate = dateFrom(2, 28, rule);
  const OPT = [['A', 'Hold the order', '18 Jun', '$0'], ['B', 'Expedite with Norvale', '4 Jun', '$1,150,000'], ['C', 'Reallocate from Wren phase 2', '14 May · held', '$410,000'], ['D', 'Air-freight a substitute lineup', '—', '—']], COLS = ['fits design', 'slot exists', 'crew free', 'float on path'];
  if (beat === 3) { x.font = MONO(500, 12); x.fillStyle = PAL.mute; x.fillText('DONOR CHECK · PROJECT WREN · PHASE 2', 26, 92);
    [['customer commitment on phase 2', 'none'], ['float after releasing the lineup', '38 d'], ['Norvale re-order lands inside the float', 'yes'], ['Wren handover', 'unchanged']].forEach((r, i) => { const a = A01(p, .3 + i * .7, .4); if (a <= 0) return; x.globalAlpha = a; const y = 140 + i * 64; rr(x, 26, y - 22, W - 52, 48, 8); x.fillStyle = PAL.bg2; x.fill(); x.font = SANS(400, 17); x.fillStyle = PAL.text; x.fillText(r[0], 46, y + 2); x.font = MONO(500, 15); x.fillStyle = PAL.green; x.fillText(r[1], W - 110 - x.measureText(r[1]).width, y + 2); tick(x, W - 66, y + 2, true, PAL.green); x.globalAlpha = 1; });
    const va = A01(p, 3.4, .5); if (va > 0) { x.globalAlpha = va; x.font = SANS(600, 20); x.fillStyle = PAL.green; x.fillText('Wren keeps 38 days of float. Heron holds 14 May.', 26, 440); x.font = MONO(400, 12.5); x.fillStyle = PAL.mute; x.fillText('the fix does not move the problem to another site · REL-204', 26, 470); x.globalAlpha = 1; } return; }
  x.font = MONO(500, 12); x.fillStyle = PAL.mute; const evalN = beat === 0 ? Math.max(0, Math.min(4, Math.floor((p - .2) / .4) + 1)) : 4, pruned = beat === 0 ? 0 : closed ? 2 : 1; x.fillText((beat === 0 ? `${evalN} options enumerated` : `4 evaluated · ${pruned} pruned · ${4 - pruned} ranked · same inputs, same answer`).toUpperCase(), 26, 92);
  const X0 = 26, OW = 330, CX = X0 + OW, CW = 92, RX = CX + CW * 4 + 10; x.font = MONO(500, 11.5); COLS.forEach((c, j) => { x.fillStyle = beat === 0 ? PAL.mute : PAL.dim; x.fillText(c.toUpperCase(), CX + j * CW + 8, 128); }); x.fillStyle = PAL.dim; x.fillText('HANDOVER', RX + 8, 128); x.fillText('COST', RX + 130, 128);
  const tt = beat === 1 ? p : 9;
  OPT.forEach((o, i) => { const a = beat === 0 ? A01(p, .2 + i * .4) : 1; if (a <= 0) return; x.globalAlpha = a; const y = 164 + i * 78;
    const prunedRow = beat >= 1 && (i === 3 || (i === 2 && closed)), rec = beat >= 1 && tt > 4.2 && !prunedRow && ((closed && i === 1) || (!closed && i === 2));
    rr(x, X0, y - 22, W - 52, 60, 8); x.fillStyle = rec ? 'rgba(127,181,138,.10)' : PAL.bg2; x.fill(); x.strokeStyle = rec ? PAL.green : prunedRow && tt > 1 ? 'rgba(226,102,58,.5)' : PAL.line; x.stroke();
    x.font = MONO(500, 13); x.fillStyle = PAL.ember; x.fillText(o[0], X0 + 14, y); x.font = SANS(500, 16.5); x.fillStyle = prunedRow && tt > 1.2 ? PAL.dim : PAL.text; x.fillText(o[1], X0 + 38, y);
    if (beat >= 1) { COLS.forEach((c, j) => { const ca = A01(tt, .3 + j * .9 + i * .15, .25); if (ca <= 0) return; const fail = (i === 3 && j === 0) || (i === 2 && closed && j === 1), dead = (i === 3 && j > 0) || (i === 2 && closed && j > 1); x.globalAlpha = a * ca; if (dead) { x.fillStyle = PAL.mute; x.font = MONO(400, 13); x.fillText('—', CX + j * CW + 40, y); } else tick(x, CX + j * CW + 44, y, !fail, fail ? PAL.ember : PAL.green); });
      const reason = i === 3 ? 'refused · not qualified against the Hall B protection design · ENG-117' : (i === 2 && closed) ? `refused · cannot land before the receiving window closes · ${wdate}` : null; const ra = reason ? A01(tt, i === 3 ? .9 : 1.6, .3) : 0; if (ra > 0) { x.globalAlpha = a * ra; x.font = MONO(400, 12); x.fillStyle = PAL.ember; x.fillText(reason, X0 + 38, y + 22); }
      const rk = A01(tt, 4.2, .4); if (rk > 0 && !prunedRow) { x.globalAlpha = a * rk; x.font = MONO(500, 14); x.fillStyle = rec ? PAL.green : PAL.text; x.fillText(o[2], RX + 8, y); x.fillText(o[3], RX + 130, y); if (rec) { x.font = MONO(500, 11); x.fillText('RECOMMENDED', RX + 8, y + 22); } } }
    x.globalAlpha = 1; });
  x.font = MONO(400, 12.5); if (beat === 2) { x.fillStyle = closed ? PAL.ember : PAL.green; x.fillText(closed ? `window closes ${wdate} · open it to 1 Apr or later and option C returns: $410,000 instead of $1,150,000` : `window closes ${wdate} · option C lands in time · $740,000 cheaper than expediting`, 26, H - 28); } else if (beat === 1 && p > 4.6) { x.fillStyle = PAL.mute; x.fillText('deterministic · the same inputs give the same ranking every run · nothing is sampled', 26, H - 28); }
}
function mappingKind(x, W, H, st) {
  const { beat, p, flag } = stepOf(st);
  const FILES = [['HallB_P6.xer', 'P6 · schedule', '9 Mar 08:00'], ['SG-B02_delivery_rev03.xlsx', 'SAP · export', '9 Mar 08:00'], ['commitments.csv', 'Oracle · export', '9 Mar'], ['procore_rfis.csv', 'Procore · export', '9 Mar'], ['HallB_readiness_gates.xlsx', 'Excel · workbook', 'read as-is']];
  x.font = MONO(500, 12); x.fillStyle = PAL.mute;
  if (beat === 0) { x.fillText('READ AS EXPORTED · NOTHING MIGRATED, NOTHING REPLACED', 26, 92); FILES.forEach((fl, i) => { const a = A01(p, .3 + i * .5, .4); if (a <= 0) return; x.globalAlpha = a; const y = 140 + i * 86; rr(x, 26, y - 24, W - 52, 66, 8); x.fillStyle = PAL.bg2; x.fill(); x.strokeStyle = PAL.line; x.stroke(); x.strokeStyle = PAL.blue; x.lineWidth = 1.5; x.strokeRect(44, y - 10, 18, 24); x.lineWidth = 1; x.font = MONO(500, 15); x.fillStyle = PAL.text; x.fillText(fl[0], 78, y - 2); x.font = MONO(400, 12.5); x.fillStyle = PAL.dim; x.fillText(fl[1] + ' · ' + fl[2], 78, y + 20); tick(x, W - 60, y + 4, true, PAL.green); x.globalAlpha = 1; }); return; }
  if (beat === 1) { const LEFT = [['SAP', 'need_by_date'], ['P6', 'total_float'], ['Oracle', 'commit_amount'], ['Procore', 'rfi_status'], ['Excel', 'units']], RIGHT = ['Package.need_by', 'Package.float_on_path', 'Commitment.amount', 'Gate.status', 'Package.units'];
    x.fillText('FILE COLUMN', 26, 92); x.fillText('ONTOLOGY PROPERTY', 560, 92); x.fillText('CHECK', 900, 92);
    LEFT.forEach((l, i) => { const a = A01(p, .2 + i * .55, .4); if (a <= 0) return; x.globalAlpha = a; const y = 136 + i * 62, conflict = i === 4; x.font = MONO(500, 14); x.fillStyle = PAL.text; x.fillText(l[0] + ' · ' + l[1], 26, y); x.strokeStyle = conflict ? PAL.ember : PAL.teal; x.beginPath(); x.moveTo(300, y); x.bezierCurveTo(430, y, 430, y, 548, y); x.stroke(); x.fillStyle = conflict ? PAL.ember : PAL.text; x.fillText(RIGHT[i], 560, y); const ca = A01(p, .6 + i * .55, .3); if (ca > 0) { x.globalAlpha = a * ca; if (conflict) { tick(x, 912, y, false, PAL.ember); x.font = MONO(400, 12); x.fillStyle = PAL.ember; x.fillText('1,180 (workbook) ≠ 1,200 (SAP) · flagged, not hidden', 560, y + 22); } else { tick(x, 912, y, true, PAL.green); x.font = MONO(400, 11.5); x.fillStyle = PAL.green; x.fillText(['LOG-061', 'SCH-089', 'COM-033', 'ENG-117'][i], 930, y); } } x.globalAlpha = 1; });
    const fa = A01(p, 3.6, .5); if (fa > 0) { x.globalAlpha = fa; x.font = SANS(500, 16); x.fillStyle = PAL.text; x.fillText('4 clean records entered the model with their source IDs. 1 conflict waits for a person.', 26, 470); x.font = MONO(400, 12.5); x.fillStyle = PAL.mute; x.fillText('every mapping is checked before anything uses it', 26, 500); x.globalAlpha = 1; } return; }
  if (beat === 2) { const FIG = [['$410,000', 'COM-033', 'Oracle · commitments.csv'], ['38 d', 'REL-204', 'Procore · Wren phase 2 release'], ['14 May', 'SCH-089', 'P6 · HallB_P6.xer · Hall B handover'], ['SG-B02', 'LOG-061', 'SAP · SG-B02_delivery_rev03.xlsx'], ['12 / 18', 'ENG-117', 'Excel · HallB_readiness_gates.xlsx']], sel = flag - 1;
    x.fillText('DECISION RECORD DR-3105 · EVERY FIGURE HAS A HOME', 26, 92); let cx = 26; FIG.forEach((fg, i) => { cx += pill(x, cx, 118, fg[0], sel === i ? PAL.green : PAL.dim, sel === i ? 'rgba(127,181,138,.25)' : undefined) + 10; });
    FIG.forEach((fg, i) => { const y = 200 + i * 62, on = sel === i; x.globalAlpha = on ? 1 : .5; rr(x, 26, y - 22, W - 52, 48, 8); x.fillStyle = on ? 'rgba(127,181,138,.10)' : PAL.bg2; x.fill(); x.strokeStyle = on ? PAL.green : PAL.line; x.stroke(); x.font = MONO(500, 15); x.fillStyle = PAL.text; x.fillText(fg[0], 44, y + 2); x.fillStyle = PAL.green; x.fillText(fg[1], 170, y + 2); x.font = MONO(400, 13); x.fillStyle = PAL.dim; x.fillText(fg[2], 290, y + 2); x.globalAlpha = 1; }); return; }
  if (beat === 3) { x.fillText('APPROVED PLAN · DR-3105 · EXPORTED BACK', 26, 92); [['P6 · HallB_P6.xer', 'Hall B handover 14 May · held'], ['SAP · purchase orders', 'SG-B02 sourced from Wren phase 2 · Norvale re-order for Wren'], ['HallB_readiness_gates.xlsx', 'gate 13 · waits → scheduled'], ['Oracle · commitments', '$410,000 · approved by the Procurement Director · COM-033']].forEach((r, i) => { const a = A01(p, .3 + i * .6, .4); if (a <= 0) return; x.globalAlpha = a; const y = 140 + i * 80; rr(x, 26, y - 24, W - 52, 62, 8); x.fillStyle = PAL.bg2; x.fill(); x.strokeStyle = PAL.line; x.stroke(); x.font = MONO(500, 14); x.fillStyle = PAL.text; x.fillText(r[0], 44, y - 4); x.font = MONO(400, 12.5); x.fillStyle = PAL.dim; x.fillText(r[1], 44, y + 18); tick(x, W - 60, y + 6, true, PAL.green); x.globalAlpha = 1; }); x.font = MONO(400, 12); x.fillStyle = PAL.mute; x.fillText('wording to confirm with the founders · the plan lives where the work happens', 26, H - 28); }
}
function fileKind(x, W, H, st, title, rows) { const r = rows || []; x.strokeStyle = PAL.blue; x.lineWidth = 3; x.strokeRect(40, 100, 90, 120); x.beginPath(); x.moveTo(100, 100); x.lineTo(130, 130); x.stroke(); x.lineWidth = 1; x.font = MONO(500, 32); x.fillStyle = PAL.text; x.fillText(r[0] || title, 160, 130); x.font = MONO(400, 24); x.fillStyle = PAL.dim; x.fillText(r[1] || '', 160, 180); (r[2] || []).forEach((c, i) => { x.font = MONO(400, 24); x.fillStyle = PAL.mute; x.fillText(c, 60, 290 + i * 46); }); x.font = MONO(500, 24); x.fillStyle = PAL.green; x.fillText('read as exported ✓', 60, H - 60); }
function recordKind(x, W, H, st) { const { p, flag } = stepOf(st), status = ['pending', 'approved', 'held', 'rejected'][flag] || 'pending', LC = ['#B79CE8', PAL.gold, PAL.green, PAL.teal];
  const LINES = [['01 · question', '"Why is Hall B late?" → package SG-B02 · Hall B electrical path · handover 14 May'], ['02 · objects', 'SG-B02 waits on Gate 13 · blocks Handover 14 May · float on path 0 d · crew standby $18,400 / d'], ['03 · options', '4 evaluated · 1 refused (ENG-117) · recommended C · reallocate from Wren phase 2 · $410,000 · 14 May held'], ['04 · evidence', 'ENG-117 · REL-204 · LOG-061 · SCH-089 · COM-033 · Wren keeps 38 d of float']];
  x.font = MONO(500, 12); x.fillStyle = PAL.mute; x.fillText('DECISION RECORD · DR-3105 · PROJECT HERON · HALL B', 26, 92);
  LINES.forEach((l, i) => { const a = A01(p, .3 + i * .8, .5); if (a <= 0) return; x.globalAlpha = a; const y = 140 + i * 86; rr(x, 26, y - 26, W - 52, 68, 8); x.fillStyle = PAL.bg2; x.fill(); x.strokeStyle = LC[i]; x.stroke(); x.fillStyle = LC[i]; x.fillRect(26, y - 26, 5, 68); x.font = MONO(500, 12); x.fillText(l[0].toUpperCase(), 48, y - 6); x.font = SANS(400, 15.5); x.fillStyle = PAL.text; x.fillText(l[1], 48, y + 18); x.globalAlpha = 1; });
  const sa = A01(p, 3.6, .5); if (sa > 0) { x.globalAlpha = sa; const y = 500, ok = status === 'approved', no = status === 'rejected'; rr(x, 26, y - 26, W - 52, 76, 8); x.fillStyle = ok ? 'rgba(127,181,138,.12)' : no ? 'rgba(226,102,58,.12)' : PAL.bg2; x.fill(); x.strokeStyle = ok ? PAL.green : no ? PAL.ember : PAL.line; x.stroke(); x.font = MONO(500, 12); x.fillStyle = PAL.mute; x.fillText('OWNER · PROCUREMENT DIRECTOR', 48, y - 4); x.font = SANS(600, 22); x.fillStyle = ok ? PAL.green : no ? PAL.ember : status === 'held' ? PAL.sand : PAL.text; x.fillText({ pending: 'Awaiting the owner\'s call', approved: 'Approved · reallocate from Wren phase 2', held: 'Held · waiting on the owner', rejected: 'Rejected · the options stay on record' }[status], 48, y + 26); x.globalAlpha = 1; } }

function drawScreen(x, W, H, kind, title, accent, rows, st) {
  const A = KIND_ACCENT[kind] || PAL.blue, hot = Math.max(st.hot || 0, st.flash || 0), T = st.T || 0, pre = st.slip !== undefined && st.slip < .5;
  x.clearRect(0, 0, W, H); rr(x, 0, 0, W, H, 18); x.fillStyle = '#0F141D'; x.fill();
  const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, 'rgba(255,255,255,.035)'); g.addColorStop(1, 'rgba(0,0,0,.18)'); x.fillStyle = g; x.fill();
  // header
  rr(x, 0, 0, W, 64, 18); x.save(); x.clip(); x.fillStyle = PAL.hdr; x.fillRect(0, 0, W, 64); x.restore(); x.fillStyle = accent ? PAL.ember : A; x.fillRect(0, 0, 6, 64);
  x.font = '600 22px "Hanken Grotesk", sans-serif'; x.fillStyle = PAL.text; x.textBaseline = 'middle'; x.fillText(title, 26, 32);
  const app = { sheet: 'SAP · export', mail: 'Mail', dash: 'P6 · schedule', approve: 'Procore · approvals', decision: 'Resonance · decision', lines: 'Resonance', card: 'Resonance · overview', schema: 'Resonance · model', portfolio: 'Resonance · portfolio', hall: 'Resonance · site', alloc: 'Resonance · allocation', view: 'Resonance · plan', chat: 'Resonance · transcript', explorer: 'Resonance · ontology', solver: 'Resonance · solver', mapping: 'Resonance · data agents', file: 'export', record: 'Resonance · decision' }[kind]; x.font = '500 14px "JetBrains Mono", monospace'; x.fillStyle = PAL.dim; x.fillText(app, W - 26 - x.measureText(app).width, 32);
  x.strokeStyle = PAL.line; x.lineWidth = 1; x.beginPath(); x.moveTo(0, 64.5); x.lineTo(W, 64.5); x.stroke();
  x.textBaseline = 'middle';
  if (kind === 'sheet') {
    const cols = [['ID', 26], ['Item', 120], ['Supplier', 440], ['Qty', 560], ['Need-by', 630], ['Δ', 790], ['Status', 870]]; x.font = '500 13px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; cols.forEach(c => x.fillText(c[0].toUpperCase(), c[1], 88));
    let R = SHEET_ROWS; if (rows && Array.isArray(rows[0])) R = rows;
    if (pre && R === SHEET_ROWS) R = [['SG-B02', 'Switchgear lineup · Hall B', 'Norvale', '1', '28 Feb 2027', '0 d', 'ok']].concat(SHEET_ROWS.slice(1)); else if (rows && typeof rows[0] === 'string') { R = []; for (let i = 0; i + 3 < rows.length; i += 4) R.push([rows[i], 'Order · ' + rows[i + 1], rows[i + 1], rows[i + 2], rows[i + 3], i === 0 ? '+2 d' : '0 d', i === 0 ? 'watch' : 'open']); while (R.length < 7) R.push(['OB-21' + (50 + R.length), 'Order · Hub', 'Hub', String(120 + R.length * 40), '16 Mar', '0 d', 'open']); } R.slice(0, 7).forEach((r, i) => { const y = 108 + i * 50; const hi = i === 0 ? hot : 0; if (i % 2) { x.fillStyle = 'rgba(255,255,255,.025)'; x.fillRect(12, y, W - 24, 50); } if (hi > 0) { x.fillStyle = `rgba(226,102,58,${.14 * hi})`; x.fillRect(12, y, W - 24, 50); } x.font = '400 16px "JetBrains Mono", monospace'; x.fillStyle = PAL.text; x.fillText(r[0], 26, y + 25); x.font = '400 17px "Hanken Grotesk", sans-serif'; x.fillStyle = i === 0 && accent ? PAL.text : PAL.dim; x.fillText(r[1], 120, y + 25); x.fillText(r[2], 440, y + 25); x.font = '400 16px "JetBrains Mono", monospace'; x.textAlign = 'right'; x.fillText(r[3], 600, y + 25); x.textAlign = 'left'; x.fillText(r[4], 630, y + 25); x.fillStyle = r[5].startsWith('+') ? PAL.ember : PAL.dim; x.fillText(r[5], 790, y + 25); const sc = r[6] === 'late' ? PAL.ember : r[6] === 'watch' ? PAL.gold : PAL.green; pill(x, 870, y + 12, r[6], sc); });
    x.strokeStyle = PAL.line; for (let i = 0; i <= 7; i++) { x.beginPath(); x.moveTo(12, 108 + i * 50); x.lineTo(W - 12, 108 + i * 50); x.stroke(); }
    x.font = '400 13px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; x.fillText('exported 9 Mar 2027 08:00 · 7 of 212 rows · read as-is', 26, H - 30);
  } else if (kind === 'mail') {
    const from = rows ? rows[0] : 'logistics@norvale-electric.example', to = rows ? rows[1] : 'heron-c2-procurement';
    x.font = '400 15px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; x.fillText('FROM', 26, 92); x.fillText('TO', 26, 122); x.fillText('SENT', 26, 152); x.fillStyle = PAL.text; x.font = '400 17px "Hanken Grotesk", sans-serif'; x.fillText(from, 100, 92); x.fillText(to, 100, 122); x.fillText('Mon 9 Mar 2027 · 07:42', 100, 152);
    x.strokeStyle = PAL.line; x.beginPath(); x.moveTo(26, 176); x.lineTo(W - 26, 176); x.stroke();
    const body = ['Please note delivery revision 03 for switchgear lineup SG-B02.', 'The busbar fabrication milestone was missed on 27 Feb; the revised', 'ex-works date is 28 Mar and arrival on site 4 Apr 2027 (+35 days).', '', 'We regret the inconvenience. Revised schedule attached.']; x.font = '400 18px "Hanken Grotesk", sans-serif'; body.forEach((l, i) => { x.fillStyle = i === 2 ? PAL.text : PAL.dim; if (i === 2 && hot > 0) { x.fillStyle = `rgba(226,102,58,${.18 * hot})`; x.fillRect(20, 196 + i * 30 - 14, W - 40, 28); x.fillStyle = PAL.text; } x.fillText(l, 26, 196 + i * 30); });
    pill(x, 26, H - 70, '⎘ SG-B02_delivery_rev03.pdf', A); pill(x, 330, H - 70, '⎘ revised_schedule.xlsx', A);
    x.font = '400 13px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; x.fillText('4 recipients · none owns the handover date', W - 26 - x.measureText('4 recipients · none owns the handover date').width, H - 30);
  } else if (kind === 'dash') {
    const kp = pre ? [['Handover', '14 May 2027', PAL.text], ['Float · electrical path', '12 d', PAL.green], ['Readiness gates', '12 / 18', PAL.text]] : st.slip !== undefined ? [['Handover', '18 Jun 2027', PAL.ember], ['Float · electrical path', '−35 d', PAL.ember], ['Readiness gates', '12 / 18', PAL.text]] : [['Handover', '14 May 2027', PAL.text], ['Float · electrical path', '0 d', PAL.ember], ['Readiness gates', '12 / 18', PAL.text]]; kp.forEach((k, i) => { const X = 26 + i * 320; rr(x, X, 84, 300, 86, 10); x.fillStyle = PAL.bg2; x.fill(); x.strokeStyle = PAL.line; x.stroke(); x.font = '500 12px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; x.fillText(k[0].toUpperCase(), X + 16, 106); x.font = '600 28px "Hanken Grotesk", sans-serif'; x.fillStyle = k[2]; x.fillText(k[1], X + 16, 144); });
    const bx = 60, by = H - 60, bw = W - 120, bh = 190; x.strokeStyle = PAL.line; for (let i = 0; i <= 4; i++) { const y = by - bh * i / 4; x.beginPath(); x.moveTo(bx, y); x.lineTo(bx + bw, y); x.stroke(); x.font = '400 12px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; x.textAlign = 'right'; x.fillText((i * 8) + ' MW', bx - 8, y); x.textAlign = 'left'; }
    const vals = [6, 9, 12, 14, 18, 22, 25, 28, 30, 32, 32, 32], labels = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']; vals.forEach((v, i) => { const w = bw / 12 - 14, X = bx + 7 + i * bw / 12, h = bh * v / 32 * (1 - (i >= 5 && accent ? .35 * (1 - hot) : 0)); x.fillStyle = i >= 5 && accent ? PAL.ember + 'B0' : A + 'B0'; rr(x, X, by - h, w, h, 4); x.fill(); x.fillStyle = PAL.mute; x.font = '400 12px "JetBrains Mono", monospace'; x.fillText(labels[i], X + 4, by + 16); });
    if (accent) { x.strokeStyle = PAL.ember; x.setLineDash([6, 6]); x.beginPath(); x.moveTo(bx + bw * 5.3 / 12, by - bh); x.lineTo(bx + bw * 5.3 / 12, by); x.stroke(); x.setLineDash([]); x.fillStyle = PAL.ember; x.font = '500 13px "JetBrains Mono", monospace'; x.fillText('14 May', bx + bw * 5.3 / 12 + 6, by - bh + 10); }
  } else if (kind === 'approve') {
    const R = rows && rows[0] && rows[0].length !== 1 ? rows : ['Reviewed by engineering', 'Commercial check', 'Donor release signed', 'Owner approval']; const who = ['AK', 'MR', 'JT', 'PD'], when = ['9 Mar 10:12', '9 Mar 11:40', 'pending', 'pending'];
    R.slice(0, 4).forEach((t, i) => { const y = 90 + i * 72; const done = i < 2; rr(x, 20, y, W - 40, 60, 10); x.fillStyle = PAL.bg2; x.fill(); x.strokeStyle = i === 2 && hot > 0 ? A : PAL.line; x.stroke(); x.beginPath(); x.arc(56, y + 30, 18, 0, 7); x.fillStyle = done ? A : PAL.line; x.fill(); x.font = '600 13px "JetBrains Mono", monospace'; x.fillStyle = done ? PAL.bg : PAL.dim; x.textAlign = 'center'; x.fillText(who[i], 56, y + 30); x.textAlign = 'left'; x.font = '500 18px "Hanken Grotesk", sans-serif'; x.fillStyle = PAL.text; x.fillText(t, 90, y + 30); x.font = '400 14px "JetBrains Mono", monospace'; x.fillStyle = done ? PAL.green : PAL.mute; const w = x.measureText(when[i]).width; x.fillText(when[i], W - 46 - w, y + 30); if (done) { x.strokeStyle = PAL.green; x.lineWidth = 2.5; x.beginPath(); x.moveTo(W - 70, y + 30); x.lineTo(W - 62, y + 38); x.lineTo(W - 50, y + 22); x.stroke(); x.lineWidth = 1; } });
    ['Approve', 'Hold', 'Reject'].forEach((b, i) => { const X = 20 + i * 150; rr(x, X, H - 76, 136, 44, 8); x.fillStyle = i === 0 ? PAL.text : 'transparent'; x.fill(); x.strokeStyle = i === 0 ? PAL.text : PAL.line; x.stroke(); x.font = '600 16px "Hanken Grotesk", sans-serif'; x.fillStyle = i === 0 ? PAL.bg : PAL.dim; x.textAlign = 'center'; x.fillText(b, X + 68, H - 54); x.textAlign = 'left'; });
    x.font = '400 13px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; x.fillText('2 of 4 · waiting 3 days', W - 26 - x.measureText('2 of 4 · waiting 3 days').width, H - 54);
  } else if (kind === 'decision') {
    pill(x, 26, 84, 'RECOMMENDED', PAL.green); pill(x, 190, 84, 'DR-3105', PAL.dim); x.font = '600 24px "Hanken Grotesk", sans-serif'; x.fillStyle = PAL.text; x.fillText('Reallocate the qualified lineup from Project Wren, phase 2', 26, 142);
    const cols = ['Option', 'Handover', 'Delay', 'Cost', 'Status'], cx = [26, 420, 580, 690, 850]; x.font = '500 12px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; cols.forEach((c, i) => x.fillText(c.toUpperCase(), cx[i], 180));
    const O = [['Hold the original order', '18 Jun 2027', '35 d', '$0', 'eligible', PAL.dim], ['Expedite with Norvale', '4 Jun 2027', '21 d', '$1,150,000', 'eligible', PAL.dim], ['Reallocate from Wren ph. 2', '14 May 2027', '0 d', '$410,000', 'recommended', PAL.green], ['Air-freight a substitute', '—', '—', '—', 'ineligible', PAL.ember]];
    O.forEach((o, i) => { const y = 200 + i * 56; if (i === 2) { x.fillStyle = `rgba(127,181,138,${.1 + .12 * hot})`; rr(x, 14, y, W - 28, 50, 8); x.fill(); } x.strokeStyle = PAL.line; x.beginPath(); x.moveTo(14, y + 50); x.lineTo(W - 14, y + 50); x.stroke(); x.font = '400 17px "Hanken Grotesk", sans-serif'; x.fillStyle = i === 3 ? PAL.mute : PAL.text; x.fillText(o[0], 26, y + 25); x.font = '400 15px "JetBrains Mono", monospace'; x.fillStyle = i === 3 ? PAL.mute : PAL.dim; x.fillText(o[1], 420, y + 25); x.fillText(o[2], 580, y + 25); x.fillStyle = i === 2 ? PAL.text : (i === 3 ? PAL.mute : PAL.dim); x.fillText(o[3], 690, y + 25); pill(x, 850, y + 12, o[4], o[5]); });
    ['ENG-117', 'REL-204', 'LOG-061', 'SCH-089', 'COM-033'].forEach((e, i) => pill(x, 26 + i * 112, H - 84, e, hot > 0 ? PAL.green : PAL.dim));
    x.font = '400 13px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; x.fillText('Owner · Procurement Director · the model never makes the call', 26, H - 30);
  } else if (kind === 'schema') {
    const ENT = [['Package', PAL.blue, 40, 92, ['id · SG-B02', 'supplier · Norvale', 'need-by · 4 Apr 2027', 'float · 0 d']], ['Crew', PAL.plum, 380, 92, ['crew · Hall B electrical', 'booked · 2 Apr 2027', 'standby · $18,400 / d']], ['Gate', PAL.teal, 720, 92, ['gate 13 · energisation', 'status · waits on package', 'ready · 12 of 18']], ['Milestone', PAL.gold, 210, 372, ['handover · 14 May 2027', 'commitment · customer', 'exposure · 1,120 MW IT-days']], ['Decision', PAL.green, 600, 372, ['record · DR-3105', 'owner · Procurement Director', 'records attached · 5']]];
    const box = ENT.map(en => { const w = 262, h = 36 + en[4].length * 26; return { x: en[2], y: en[3], w, h, cx: en[2] + w / 2, cy: en[3] + h / 2, name: en[0], col: en[1] }; });
    const CON = [[0, 1, 'waits on'], [0, 2, 'blocks'], [2, 3, 'gates'], [0, 3, 'moves'], [3, 4, 'records']];
    CON.forEach((cn, i) => { const a = box[cn[0]], b = box[cn[1]]; const ax = a.cx, ay = a.y + a.h, bx = b.cx, by = b.y; const sameRow = Math.abs(a.y - b.y) < 10; x.strokeStyle = hot > .02 ? A : PAL.line; x.lineWidth = hot > .02 ? 1.6 : 1.2; x.beginPath(); let mx, my; if (sameRow) { const yy = a.y + a.h + 18 + i * 6; x.moveTo(ax, a.y + a.h); x.lineTo(ax, yy); x.lineTo(bx, yy); x.lineTo(bx, b.y + b.h); mx = (ax + bx) / 2; my = yy; } else { const yy = (ay + by) / 2 + i * 4; x.moveTo(ax, ay); x.lineTo(ax, yy); x.lineTo(bx, yy); x.lineTo(bx, by); mx = (ax + bx) / 2; my = yy; } x.stroke(); x.fillStyle = hot > .02 ? A : PAL.mute; x.beginPath(); x.arc(bx, sameRow ? b.y + b.h : by, 3.5, 0, 7); x.fill(); pill(x, mx - 30, my - 13, cn[2], hot > .02 ? PAL.ember : PAL.dim, PAL.bg); });
    box.forEach((b, i) => { rr(x, b.x, b.y, b.w, b.h, 10); x.fillStyle = PAL.bg2; x.fill(); x.strokeStyle = b.col; x.lineWidth = 1; x.stroke(); x.fillStyle = b.col; x.fillRect(b.x, b.y, b.w, 3); x.font = '600 17px "Hanken Grotesk", sans-serif'; x.fillStyle = PAL.text; x.fillText(b.name, b.x + 14, b.y + 20); x.font = '400 13.5px "JetBrains Mono", monospace'; ENT[i][4].forEach((f, r) => { x.fillStyle = r === 0 ? PAL.text : PAL.dim; x.fillText(f, b.x + 14, b.y + 48 + r * 26); x.strokeStyle = PAL.line; x.beginPath(); x.moveTo(b.x + 12, b.y + 34 + r * 26); x.lineTo(b.x + b.w - 12, b.y + 34 + r * 26); x.stroke(); }); });
    x.font = '400 13px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; x.fillText('5 entities · 5 relationships · base vocabulary + 2 customer rules', 26, H - 30);
  } else if (kind === 'portfolio') {
    // the board above the time wall: five halls, one slip, the effect seen across all of them
    const ph = st.slip === undefined ? 1 : st.slip; const slipped = ph >= .5 && ph < 1.5, fixed = ph >= 1.5;
    const SITES = [['Heron', 'Hall B', '32 MW', '14 May', slipped ? '18 Jun' : '14 May', slipped ? '+35 d' : fixed ? 'held' : '0 d', slipped ? '12 / 18' : '12 / 18', slipped ? 'late' : fixed ? 'recovered' : 'ok'], ['Wren', 'Hall A', '20 MW', '30 Jul', '8 Aug', '+9 d', '9 / 18', fixed ? 'donor' : 'watch'], ['Ibis', 'dev gate', '—', 'gate', 'on target', '0 d', '—', 'ok'], ['Kestrel', 'Hall C', '24 MW', '22 Sep', '22 Sep', '0 d', '4 / 18', 'ok'], ['Plover', 'Hall A', '16 MW', '11 Nov', '11 Nov', '0 d', '1 / 18', 'ok']];
    const exp = slipped ? '1,120' : '0'; x.font = '500 12px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; x.fillText('PORTFOLIO EXPOSURE', 26, 86); x.font = '600 28px "Hanken Grotesk", sans-serif'; x.fillStyle = slipped ? PAL.ember : fixed ? PAL.green : PAL.text; x.fillText(exp + ' MW IT-days', 26, 118); x.font = '400 13px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; const note = slipped ? 'SG-B02 revision 03 · Heron Hall B · +35 d' : fixed ? 'reallocated from Wren phase 2 · 38 d float kept' : 'snapshot 9 Mar 2027 · 08:00'; x.fillText(note, W - 26 - x.measureText(note).width, 108);
    SITES.forEach((s, i) => { const X = 26 + i * 196, Y = 140, w = 184, h = 150; const late = s[7] === 'late', col = late ? PAL.ember : s[7] === 'recovered' || s[7] === 'donor' ? PAL.green : s[7] === 'watch' ? PAL.gold : PAL.line; rr(x, X, Y, w, h, 10); x.fillStyle = i === 0 && hot > .02 ? 'rgba(255,255,255,.05)' : PAL.bg2; x.fill(); x.strokeStyle = col; x.lineWidth = late || hot > .02 && i === 0 ? 1.5 : 1; x.stroke(); x.lineWidth = 1; x.font = '600 17px "Hanken Grotesk", sans-serif'; x.fillStyle = PAL.text; x.fillText(s[0], X + 14, Y + 22); x.font = '400 12px "JetBrains Mono", monospace'; x.fillStyle = PAL.dim; x.fillText(s[1] + ' · ' + s[2], X + 14, Y + 42); const rows = [['commit', s[3]], ['forecast', s[4]], ['variance', s[5]], ['gates', s[6]]]; rows.forEach((r, k) => { const y = Y + 66 + k * 20; x.fillStyle = PAL.mute; x.fillText(r[0], X + 14, y); x.fillStyle = (k === 1 || k === 2) && late ? PAL.ember : (k === 2 && s[7] === 'recovered') ? PAL.green : PAL.text; x.textAlign = 'right'; x.fillText(r[1], X + w - 14, y); x.textAlign = 'left'; }); pill(x, X + w - 14 - x.measureText(s[7]).width - 20, Y + 10, s[7], col === PAL.line ? PAL.green : col); });
    // the time wall
    const ty0 = 318, lx = 118, lw = W - 26 - lx; const t0 = new Date(2027, 2, 1), t1 = new Date(2027, 11, 1); const X = d => lx + lw * (d - t0) / (t1 - t0);
    x.font = '500 12px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; x.fillText('TIME WALL · 2027', 26, ty0 - 4);
    for (let mth = 2; mth < 12; mth++) { const xx = X(new Date(2027, mth, 1)); x.strokeStyle = PAL.line; x.beginPath(); x.moveTo(xx, ty0 + 6); x.lineTo(xx, H - 40); x.stroke(); x.fillStyle = PAL.mute; x.font = '400 11px "JetBrains Mono", monospace'; x.fillText(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][mth], xx + 4, H - 26); }
    const LANES = [['Heron', new Date(2027, 2, 1), new Date(2027, 4, 14), slipped ? new Date(2027, 5, 18) : null], ['Wren', new Date(2027, 2, 1), new Date(2027, 6, 30), new Date(2027, 7, 8)], ['Ibis', new Date(2027, 3, 1), new Date(2027, 5, 1), null], ['Kestrel', new Date(2027, 3, 15), new Date(2027, 8, 22), null], ['Plover', new Date(2027, 5, 1), new Date(2027, 10, 11), null]];
    LANES.forEach((l, i) => { const y = ty0 + 22 + i * 46; x.font = '500 13px "JetBrains Mono", monospace'; x.fillStyle = i === 0 && slipped ? PAL.ember : PAL.dim; x.fillText(l[0], 26, y + 10); rr(x, X(l[1]), y, X(l[2]) - X(l[1]), 20, 6); x.fillStyle = i === 0 ? (slipped ? PAL.ember + 'AA' : fixed ? PAL.green + 'AA' : PAL.blue + 'AA') : i === 1 ? PAL.gold + '88' : PAL.blue + '66'; x.fill(); if (l[3]) { x.fillStyle = i === 0 ? 'rgba(226,102,58,.35)' : 'rgba(232,184,109,.3)'; rr(x, X(l[2]), y, X(l[3]) - X(l[2]), 20, 6); x.fill(); x.strokeStyle = i === 0 ? PAL.ember : PAL.gold; x.setLineDash([4, 3]); x.strokeRect(X(l[2]), y, X(l[3]) - X(l[2]), 20); x.setLineDash([]); } x.strokeStyle = PAL.text; x.beginPath(); x.moveTo(X(l[2]), y - 4); x.lineTo(X(l[2]), y + 24); x.stroke(); });
    if (fixed) { const y0 = ty0 + 22 + 46 + 10, y1 = ty0 + 22 + 10, xx = X(new Date(2027, 3, 2)); x.strokeStyle = PAL.green; x.setLineDash([5, 4]); x.beginPath(); x.moveTo(xx, y0); x.lineTo(xx, y1); x.stroke(); x.setLineDash([]); x.fillStyle = PAL.green; x.font = '500 12px "JetBrains Mono", monospace'; x.fillText('lineup from Wren · arrives 2 Apr', xx + 8, y0 - 14); }
    const cx2 = X(new Date(2027, 4, 14)); x.strokeStyle = PAL.text; x.setLineDash([3, 4]); x.beginPath(); x.moveTo(cx2, ty0 + 8); x.lineTo(cx2, ty0 + 22 + 5 * 46); x.stroke(); x.setLineDash([]); x.fillStyle = PAL.dim; x.font = '500 11px "JetBrains Mono", monospace'; x.fillText('Heron commitment · 14 May', cx2 + 6, ty0 + 14);
  } else if (kind === 'hall') {
    // one hall of the portfolio: rows = [name, hall, MW, commit, forecastIfSlipped, gatesDone, role] · role: heron | wren | other
    const R = rows || ['Heron', 'Hall B', '32 MW', '14 May 2027', '18 Jun 2027', 12, 'heron']; const ph = st.slip === undefined ? 0 : st.slip; const slipped = ph >= .5 && ph < 1.5, fixed = ph >= 1.5; const role = R[6];
    const status = role === 'heron' ? (slipped ? 'late' : fixed ? 'recovered' : 'on track') : role === 'wren' ? (fixed ? 'donor' : slipped ? 'watch' : 'on track') : 'on track';
    const col = status === 'late' ? PAL.ember : status === 'recovered' || status === 'donor' ? PAL.green : status === 'watch' ? PAL.gold : PAL.green;
    x.font = '600 34px "Hanken Grotesk", sans-serif'; x.fillStyle = PAL.text; x.fillText(R[0], 26, 110); x.font = '400 16px "JetBrains Mono", monospace'; x.fillStyle = PAL.dim; x.fillText(R[1] + ' · ' + R[2], 26, 146); pill(x, W - 26 - x.measureText(status).width - 20, 92, status, col);
    const forecast = role === 'heron' ? (slipped ? R[4] : R[3]) : R[4]; const variance = role === 'heron' ? (slipped ? '+35 d' : fixed ? 'held' : '0 d') : role === 'wren' ? '+9 d' : '0 d';
    const rows2 = [['commitment', R[3], PAL.text], ['forecast', forecast, role === 'heron' && slipped ? PAL.ember : PAL.text], ['variance', variance, role === 'heron' && slipped ? PAL.ember : role === 'heron' && fixed ? PAL.green : PAL.dim], ['exposure', role === 'heron' && slipped ? '1,120 MW IT-days' : '—', role === 'heron' && slipped ? PAL.ember : PAL.dim]];
    rows2.forEach((r, k) => { const y = 200 + k * 50; x.strokeStyle = PAL.line; x.beginPath(); x.moveTo(26, y + 22); x.lineTo(W - 26, y + 22); x.stroke(); x.font = '500 13px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; x.fillText(r[0].toUpperCase(), 26, y); x.font = '500 22px "Hanken Grotesk", sans-serif'; x.fillStyle = r[2]; x.textAlign = 'right'; x.fillText(r[1], W - 26, y + 2); x.textAlign = 'left'; });
    // the eighteen readiness gates
    x.font = '500 13px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; x.fillText('READINESS GATES · ' + R[5] + ' / 18', 26, 428); for (let gIdx = 0; gIdx < 18; gIdx++) { const gx = 26 + gIdx * 53, gy = 446; const done = gIdx < R[5]; const blocked = role === 'heron' && slipped && gIdx === 12; rr(x, gx, gy, 44, 30, 5); x.fillStyle = done ? (role === 'heron' && fixed ? PAL.green + 'CC' : A + 'B0') : blocked ? PAL.ember + 'CC' : 'rgba(255,255,255,.06)'; x.fill(); if (blocked) { x.strokeStyle = PAL.ember; x.strokeRect(gx, gy, 44, 30); } }
    x.font = '400 13px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; x.fillText(role === 'heron' && slipped ? 'gate 13 waits on SG-B02 · revision 03' : role === 'wren' && fixed ? 'lineup released to Heron · 38 d float kept' : 'snapshot 9 Mar 2027 · 08:00', 26, H - 30);
    if (hot > .02) { x.fillStyle = `rgba(255,255,255,${.05 * hot})`; rr(x, 8, 70, W - 16, H - 80, 12); x.fill(); }
  } else if (kind === 'alloc') {
    // next week's allocation: depots down, store clusters across; one cell blocked by a service target; the solver rewrites
    const ph = st.slip === undefined ? 0 : st.slip; const blocked = ph >= .5 && ph < 1.5, solved = ph >= 1.5; const sweep = st.flash || 0;
    const DEP = ['Depot North', 'Depot South', 'Hub', 'Cross-dock'], CL = ['Cluster A', 'Cluster B', 'Cluster C', 'Cluster D', 'Cluster E'];
    const V = [[1200, 640, 380, 900, 410], [520, 1180, 760, 300, 640], [410, 380, 1020, 620, 280], [300, 260, 340, 880, 1120]];
    const gx = 190, gy = 110, cw = 158, ch = 64; x.font = '500 12px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; CL.forEach((c, j) => { x.fillText(c.toUpperCase(), gx + j * cw + 8, gy - 14); });
    DEP.forEach((dName, i) => { x.font = '500 14px "JetBrains Mono", monospace'; x.fillStyle = i === 0 && blocked ? PAL.ember : PAL.dim; x.fillText(dName, 26, gy + i * ch + 36); CL.forEach((c, j) => { const X = gx + j * cw, Yy = gy + i * ch; const isB = i === 0 && j === 0; let v = V[i][j]; let col = 'rgba(255,255,255,.04)', tc = PAL.text; if (isB && blocked) { col = 'rgba(226,102,58,.22)'; tc = PAL.ember; v = 980; } if (isB && solved) { col = 'rgba(127,181,138,.2)'; tc = PAL.green; v = 1200; } const adj = solved && ((i === 1 && j === 0) || (i === 0 && j === 3)); if (adj) { col = 'rgba(127,181,138,.1)'; v = i === 1 ? 560 : 860; tc = PAL.green; } const sw = solved ? ss((i * 5 + j) / 20 - .05, (i * 5 + j) / 20 + .1, sweep) * (1 - ss((i * 5 + j) / 20 + .15, (i * 5 + j) / 20 + .3, sweep)) : 0; rr(x, X, Yy, cw - 6, ch - 6, 6); x.fillStyle = col; x.fill(); if (sw > 0) { x.fillStyle = `rgba(255,255,255,${.12 * sw})`; x.fill(); } x.strokeStyle = isB && (blocked || solved) ? tc : PAL.line; x.stroke(); x.font = '500 18px "Hanken Grotesk", sans-serif'; x.fillStyle = tc; x.fillText(v.toLocaleString('en-US'), X + 12, Yy + 26); x.font = '400 11px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; x.fillText(isB && blocked ? 'short 220 · service 98%' : isB && solved ? 'service 96% · 2 days' : 'units', X + 12, Yy + 46); }); });
    const fy = gy + 4 * ch + 18; x.strokeStyle = PAL.line; x.beginPath(); x.moveTo(26, fy); x.lineTo(W - 26, fy); x.stroke();
    x.font = '500 12px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; x.fillText('PLAN STATUS', 26, fy + 24); x.font = '600 20px "Hanken Grotesk", sans-serif'; x.fillStyle = blocked ? PAL.ember : solved ? PAL.green : PAL.text; x.fillText(blocked ? 'Blocked · service target 98% at Depot North' : solved ? 'Executable · service target relaxed to 96% for 2 days · $6,400' : 'Draft · 20 allocations · week 11', 26, fy + 52);
    x.font = '400 13px "JetBrains Mono", monospace'; x.fillStyle = PAL.dim; x.fillText(solved ? 'alternatives: +1 truck $9,800 · +1 day window 14 orders late · min order cannot relax' : blocked ? 'the solver shows which rule to loosen, by how much, and what it costs' : 'read from the ERP export and the planner\'s workbook, as they are', 26, fy + 78);
  } else if (kind === 'view') {
    // the same plan, seen as a table, a calendar, or lanes; the order OB-2140 lights when hot
    const which = (rows && rows[0]) || 'table'; const lit = hot;
    if (which === 'table') { const cols = [['ORDER', 26], ['DEPOT', 170], ['UNITS', 420], ['DAY', 560], ['LANE', 700], ['STATUS', 860]]; x.font = '500 12px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; cols.forEach(c => x.fillText(c[0], c[1], 90)); const R = [['OB-2140', 'Depot North', '1,200', 'Tue', 'Lane 4', 'allocated'], ['OB-2141', 'Depot South', '640', 'Wed', 'Lane 2', 'allocated'], ['OB-2144', 'Hub', '380', 'Tue', 'Lane 1', 'allocated'], ['OB-2150', 'Depot North', '900', 'Fri', 'Lane 4', 'allocated'], ['OB-2152', 'Cross-dock', '1,120', 'Thu', 'Lane 3', 'allocated'], ['OB-2155', 'Hub', '280', 'Mon', 'Lane 1', 'allocated']]; R.forEach((r, i) => { const y = 112 + i * 54; if (i === 0 && lit > .02) { x.fillStyle = `rgba(127,181,138,${.18 * lit})`; x.fillRect(12, y, W - 24, 52); } else if (i % 2) { x.fillStyle = 'rgba(255,255,255,.025)'; x.fillRect(12, y, W - 24, 52); } x.font = '400 16px "JetBrains Mono", monospace'; x.fillStyle = PAL.text; x.fillText(r[0], 26, y + 28); x.font = '400 16px "Hanken Grotesk", sans-serif'; x.fillStyle = PAL.dim; x.fillText(r[1], 170, y + 28); x.font = '400 16px "JetBrains Mono", monospace'; x.textAlign = 'right'; x.fillText(r[2], 480, y + 28); x.textAlign = 'left'; x.fillText(r[3], 560, y + 28); x.fillText(r[4], 700, y + 28); pill(x, 860, y + 14, r[5], PAL.green); }); }
    else if (which === 'calendar') { const D = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']; const cw = (W - 52) / 5; D.forEach((d, i) => { const X = 26 + i * cw; x.font = '500 12px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; x.fillText(d.toUpperCase(), X + 8, 90); x.strokeStyle = PAL.line; x.strokeRect(X, 100, cw - 6, H - 150); }); const chips = [[1, 0, 'OB-2140 · 1,200', true], [2, 0, 'OB-2141 · 640', false], [1, 1, 'OB-2144 · 380', false], [4, 0, 'OB-2150 · 900', false], [3, 0, 'OB-2152 · 1,120', false], [0, 0, 'OB-2155 · 280', false]]; chips.forEach(c => { const X = 26 + c[0] * cw + 8, Yy = 112 + c[1] * 54; rr(x, X, Yy, cw - 22, 44, 6); x.fillStyle = c[3] && lit > .02 ? `rgba(127,181,138,${.25 + .4 * lit})` : 'rgba(111,168,220,.18)'; x.fill(); x.strokeStyle = c[3] ? PAL.green : PAL.blue; x.stroke(); x.font = '400 13px "JetBrains Mono", monospace'; x.fillStyle = PAL.text; x.fillText(c[2], X + 10, Yy + 26); }); }
    else { const L = [['Lane 1', [[0, .18, 'OB-2155'], [.3, .5, 'OB-2144']]], ['Lane 2', [[.42, .66, 'OB-2141']]], ['Lane 3', [[.6, .9, 'OB-2152']]], ['Lane 4', [[.2, .56, 'OB-2140', true], [.7, .96, 'OB-2150']]]]; const lx = 130, lw = W - 26 - lx; L.forEach((l, i) => { const y = 110 + i * 100; x.font = '500 14px "JetBrains Mono", monospace'; x.fillStyle = PAL.dim; x.fillText(l[0], 26, y + 30); x.strokeStyle = PAL.line; x.beginPath(); x.moveTo(lx, y + 48); x.lineTo(lx + lw, y + 48); x.stroke(); l[1].forEach(b => { rr(x, lx + lw * b[0], y + 8, lw * (b[1] - b[0]), 36, 8); x.fillStyle = b[3] && lit > .02 ? `rgba(127,181,138,${.3 + .5 * lit})` : 'rgba(111,168,220,.32)'; x.fill(); x.strokeStyle = b[3] ? PAL.green : PAL.blue; x.stroke(); x.font = '400 13px "JetBrains Mono", monospace'; x.fillStyle = PAL.text; x.fillText(b[2], lx + lw * b[0] + 10, y + 30); }); }); x.font = '400 12px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; x.fillText('capacity · 2 loads per lane per day', 26, H - 26); }
  } else if (kind === 'card') {
    const F = (rows || []).slice(0, 4); const num = f => { const m = f.match(/(\$?[\d][\d,\.]*\s?(?:MW IT-days|MW IT|MW|d|%|days|of \d+)?)/); return m ? m[1].trim() : null; };
    const tiles = F.map(f => [num(f), f]).filter(t => t[0]).slice(0, 3); tiles.forEach((t, i) => { const X = 26 + i * 320; rr(x, X, 84, 300, 96, 10); x.fillStyle = PAL.bg2; x.fill(); x.strokeStyle = PAL.line; x.stroke(); x.font = '600 30px "Hanken Grotesk", sans-serif'; x.fillStyle = i === 0 ? (A) : PAL.text; x.fillText(t[0], X + 16, 118); x.font = '400 13px "Hanken Grotesk", sans-serif'; x.fillStyle = PAL.dim; const rest = t[1].replace(t[0], '').replace(/^[\s:·,]+/, ''); x.fillText(rest.slice(0, 40), X + 16, 156); });
    const y0 = tiles.length ? 206 : 96; F.forEach((f, i) => { const y = y0 + i * 48; x.fillStyle = i % 2 ? 'rgba(255,255,255,.025)' : 'transparent'; x.fillRect(12, y - 20, W - 24, 44); x.beginPath(); x.arc(30, y + 2, 4, 0, 7); x.fillStyle = A; x.fill(); x.font = '400 17px "Hanken Grotesk", sans-serif'; x.fillStyle = PAL.text; x.fillText(f.slice(0, 92), 46, y + 2); });
    const sx = 26, sy = H - 44, sw = W - 52; x.strokeStyle = PAL.line; x.beginPath(); x.moveTo(sx, sy); x.lineTo(sx + sw, sy); x.stroke(); x.strokeStyle = A; x.lineWidth = 2; x.beginPath(); for (let i = 0; i <= 40; i++) { const px = sx + sw * i / 40, py = sy - 10 - Math.abs(Math.sin(i * .5 + T) * 22 + Math.sin(i * .17) * 14) * (.4 + .6 * Math.min(1, i / 40)); i ? x.lineTo(px, py) : x.moveTo(px, py); } x.stroke(); x.lineWidth = 1;
    x.font = '400 13px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; x.fillText('live · ' + new Date(2027, 2, 9, 8, 0).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + ' 08:00', 26, H - 22);
  } else if (kind === 'lines') {
    // a small dashboard read from its own rows: status, a date on the timeline against the 14 May commitment, cost against the dearest option, the rest as rows
    const R = (rows || []).map(r => String(r)); const clean = r => r.replace(/^[!+]/, ''); const tone = r => r[0] === '!' ? PAL.ember : r[0] === '+' ? PAL.green : null;
    const MON = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 }; const dateOf = r => { const m = r.match(/(\d{1,2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)( (\d{4}))?/); return m ? new Date(2027, MON[m[2]], +m[1]) : null; };
    const dRow = R.find(r => dateOf(r)), cRow = R.find(r => /\$[\d,]+/.test(r)), dayRow = R.find(r => /[+−-]?\d+ ?d\b/.test(r) && !/\d{4}/.test(r)), fracRow = R.find(r => /\d+ ?(of|\/) ?\d+/.test(r));
    const headline = R[0] || title; const hl = tone(headline);
    // status tile
    rr(x, 26, 84, 460, 96, 10); x.fillStyle = PAL.bg2; x.fill(); x.strokeStyle = hl || PAL.line; x.stroke(); x.font = '500 12px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; x.fillText('STATUS', 42, 106); x.font = '600 24px "Hanken Grotesk", sans-serif'; x.fillStyle = hl || PAL.text; x.fillText(clean(headline).slice(0, 34), 42, 146);
    // figure tile: cost, else days, else fraction
    const fig = cRow ? [cRow.match(/\$[\d,]+/)[0], 'incremental cost'] : dayRow ? [dayRow.match(/[+−-]?\d+ ?d\b/)[0], 'days'] : fracRow ? [fracRow.match(/\d+ ?(of|\/) ?\d+/)[0], 'complete'] : null;
    if (fig) { rr(x, 506, 84, 492, 96, 10); x.fillStyle = PAL.bg2; x.fill(); x.strokeStyle = PAL.line; x.stroke(); x.font = '500 12px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; x.fillText(fig[1].toUpperCase(), 522, 106); x.font = '600 30px "Hanken Grotesk", sans-serif'; x.fillStyle = tone(cRow || dayRow || fracRow || '') || PAL.text; x.fillText(fig[0], 522, 148); }
    // timeline: Mar to Jul 2027, the commitment at 14 May, this row's date marked
    const tx = 26, tw = W - 52, ty = 230; const t0 = new Date(2027, 2, 1), t1 = new Date(2027, 6, 1); const X = d => tx + tw * (d - t0) / (t1 - t0);
    x.font = '500 12px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; x.fillText('TIMELINE · 2027', tx, ty - 22);
    x.strokeStyle = PAL.line; x.beginPath(); x.moveTo(tx, ty); x.lineTo(tx + tw, ty); x.stroke(); ['Mar', 'Apr', 'May', 'Jun'].forEach((m, i) => { const xx = X(new Date(2027, 2 + i, 1)); x.beginPath(); x.moveTo(xx, ty - 6); x.lineTo(xx, ty + 6); x.stroke(); x.fillStyle = PAL.mute; x.font = '400 12px "JetBrains Mono", monospace'; x.fillText(m, xx + 6, ty + 22); });
    const commit = new Date(2027, 4, 14), cx2 = X(commit); const d = dRow ? dateOf(dRow) : null;
    if (d) { const dx = X(d); const late = d > commit; if (late) { x.fillStyle = 'rgba(226,102,58,.22)'; x.fillRect(cx2, ty - 14, dx - cx2, 28); } x.strokeStyle = late ? PAL.ember : PAL.green; x.lineWidth = 2; x.beginPath(); x.moveTo(dx, ty - 18); x.lineTo(dx, ty + 18); x.stroke(); x.lineWidth = 1; x.fillStyle = late ? PAL.ember : PAL.green; x.font = '500 13px "JetBrains Mono", monospace'; const lab = clean(dRow).slice(0, 36); x.fillText(lab, Math.min(dx + 8, W - 40 - x.measureText(lab).width), ty - 26); }
    x.strokeStyle = PAL.text; x.setLineDash([4, 4]); x.beginPath(); x.moveTo(cx2, ty - 24); x.lineTo(cx2, ty + 24); x.stroke(); x.setLineDash([]); x.fillStyle = PAL.dim; x.font = '500 12px "JetBrains Mono", monospace'; x.fillText('commitment · 14 May', cx2 + 8, ty + 42);
    // cost bar against the dearest option
    const by = 330; if (cRow) { const v = +cRow.match(/\$([\d,]+)/)[1].replace(/,/g, ''); const mx = 1150000, bw = (W - 52) * Math.min(1, v / mx); x.font = '500 12px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; x.fillText('COST AGAINST THE DEAREST OPTION ($1,150,000)', tx, by - 10); rr(x, tx, by, W - 52, 14, 7); x.fillStyle = 'rgba(255,255,255,.06)'; x.fill(); if (bw > 2) { rr(x, tx, by, bw, 14, 7); x.fillStyle = tone(cRow) || A; x.fill(); } x.font = '500 13px "JetBrains Mono", monospace'; const lbl = cRow.match(/\$[\d,]+/)[0]; const lw = x.measureText(lbl).width; if (bw > W - 52 - lw - 30) { x.fillStyle = PAL.bg; x.fillText(lbl, tx + bw - lw - 10, by + 7); } else { x.fillStyle = PAL.text; x.fillText(lbl, tx + Math.max(bw, 0) + 10, by + 7); } }
    else { const vals = [6, 8, 7, 11, 12, 14, 13, 17, 18, 21, 20, 24]; x.font = '500 12px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; x.fillText('ACTIVITY · LAST 12 WEEKS', tx, by - 10); vals.forEach((v, i) => { const bw2 = (W - 52) / 12 - 8, h = v * 1.6; x.fillStyle = i === 11 ? A : A + '66'; rr(x, tx + i * (W - 52) / 12, by + 40 - h, bw2, h, 3); x.fill(); }); }
    // option screens: how this option sits against the other three
    if (/^Option/.test(title)) { const OPTS = [['A · Hold the order', 35, PAL.dim], ['B · Expedite', 21, PAL.dim], ['C · Reallocate from Wren', 0, PAL.green], ['D · Air-freight', -1, PAL.ember]]; const me = title.match(/Option ([A-D])/); x.font = '500 12px "JetBrains Mono", monospace'; x.fillStyle = PAL.mute; x.fillText('DAYS LATE · ALL FOUR OPTIONS', tx, 410); OPTS.forEach((o, i) => { const y = 432 + i * 40; const mine = me && o[0].startsWith(me[1]); if (mine) { x.fillStyle = 'rgba(255,255,255,.06)'; rr(x, 12, y - 14, W - 24, 34, 6); x.fill(); } x.font = (mine ? '600 ' : '400 ') + '14px "JetBrains Mono", monospace'; x.fillStyle = mine ? PAL.text : PAL.dim; x.fillText(o[0], 26, y + 4); const bx0 = 330, bwMax = W - 52 - 330 - 90; if (o[1] >= 0) { rr(x, bx0, y - 5, Math.max(6, bwMax * o[1] / 35), 12, 6); x.fillStyle = o[1] === 0 ? PAL.green : (mine ? A : PAL.line); x.fill(); x.fillStyle = mine ? PAL.text : PAL.dim; x.fillText(o[1] + ' d', bx0 + Math.max(6, bwMax * o[1] / 35) + 10, y + 4); } else { x.fillStyle = PAL.ember; x.fillText('refused · not qualified', bx0, y + 4); } }); }
    const rest = R.filter(r => r !== headline && r !== dRow && r !== cRow).slice(0, 4); if (/^Option/.test(title)) rest.length = 0; rest.forEach((r, i) => { const y = 420 + i * 44; x.fillStyle = i % 2 ? 'rgba(255,255,255,.025)' : 'transparent'; x.fillRect(12, y - 18, W - 24, 40); x.beginPath(); x.arc(30, y + 2, 4, 0, 7); x.fillStyle = tone(r) || A; x.fill(); x.font = '400 16px "JetBrains Mono", monospace'; x.fillStyle = tone(r) || PAL.dim; x.fillText(clean(r).slice(0, 80), 46, y + 2); });
  } else if (kind === 'chat') chatKind(x, W, H, st); else if (kind === 'explorer') explorerKind(x, W, H, st); else if (kind === 'solver') solverKind(x, W, H, st); else if (kind === 'mapping') mappingKind(x, W, H, st); else if (kind === 'file') fileKind(x, W, H, st, title, rows); else if (kind === 'record') recordKind(x, W, H, st);
  if (st.alive && hot <= .02) { const u = (T * .11 + (title.length % 7) * .13) % 1, by = 64 + u * (H - 64); const bg2 = x.createLinearGradient(0, by - 50, 0, by + 50); bg2.addColorStop(0, 'rgba(255,255,255,0)'); bg2.addColorStop(.5, 'rgba(255,255,255,.035)'); bg2.addColorStop(1, 'rgba(255,255,255,0)'); rr(x, 0, 64, W, H - 64, 1); x.save(); x.clip(); x.fillStyle = bg2; x.fillRect(0, by - 50, W, 100); x.restore(); const blink = .5 + .5 * Math.sin(T * 2.2 + title.length); x.beginPath(); x.arc(W - 14, 14, 3.5, 0, 7); x.fillStyle = (st.slip !== undefined && st.slip > .5 ? PAL.ember : A) + Math.round(80 + 170 * blink).toString(16).padStart(2, '0'); x.fill(); const sv = (T * .07 + (title.length % 5) * .2) % 1; x.fillStyle = A + '66'; x.fillRect(0, 63, W * sv, 2); }
  // sheen sweep on hover
  if (hot > 0) { const sx = (T * .6 % 1.4 - .2) * W; const sg = x.createLinearGradient(sx - 160, 0, sx + 160, 0); sg.addColorStop(0, 'rgba(255,255,255,0)'); sg.addColorStop(.5, `rgba(255,255,255,${.05 * hot})`); sg.addColorStop(1, 'rgba(255,255,255,0)'); rr(x, 0, 0, W, H, 18); x.fillStyle = sg; x.fill(); }
  rr(x, .5, .5, W - 1, H - 1, 18); x.strokeStyle = hot > 0 ? A : PAL.line; x.lineWidth = 1 + hot; x.stroke(); x.lineWidth = 1;
}
let REDRAW_N = 0;
function cardTex(kind, title, accent, rows, res = 1) {
  const W = Math.round(1024 * res), H = Math.round(640 * res), c = cvs(W, H), x = c.getContext('2d'); x.scale(res, res);
  const st = { hot: 0, T: 0, last: -1 }; drawScreen(x, 1024, 640, kind, title, accent, rows, st);
  const t = new THREE.CanvasTexture(c); t.anisotropy = 8; t.minFilter = THREE.LinearMipmapLinearFilter;
  t.userData.redraw = (hot, T, slip, flash, step, alive) => { if (alive && hot <= .02 && REDRAW_N >= 3 && st.last !== -1) return; st.alive = alive; const key = Math.round(hot * 12) + (hot > .02 ? Math.floor(T * 8) * 100 : alive ? Math.floor(T * 2.5) * 100 : 0) + (slip === undefined ? 0 : (slip < .5 ? 5000 : slip < 1.5 ? 7000 : 9000)) + Math.round((flash || 0) * 10) * 20000 + Math.round((step || 0) * 30) * 1000000; if (key === st.last) return; st.last = key; st.hot = hot; st.T = T; st.slip = slip; st.flash = flash || 0; st.step = step || 0; REDRAW_N++; drawScreen(x, 1024, 640, kind, title, accent, rows, st); t.needsUpdate = true; };
  return t;
}
function labelTex(text, col = '#E9E3D6', px = 30, mono = true) {
  const x0 = cvs(8, 8).getContext('2d'); x0.font = `${mono ? 500 : 600} ${px}px ${mono ? '"JetBrains Mono", monospace' : '"Hanken Grotesk", sans-serif'}`;
  const w = Math.ceil(x0.measureText(text).width) + 24, h = px + 20, c = cvs(w, h), x = c.getContext('2d');
  x.font = x0.font; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(text, 12, h / 2);
  const t = new THREE.CanvasTexture(c); t.minFilter = THREE.LinearFilter; return [t, w / 120, h / 120];
}
function label(text, opts = {}) {
  const [t, w, h] = labelTex(text, opts.col, opts.px, opts.mono !== false);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w * (opts.s || 1), h * (opts.s || 1)), new THREE.MeshBasicMaterial({ map: t, transparent: true, opacity: opts.op ?? .9, depthWrite: false }));
  m.userData.w = w * (opts.s || 1); return m;
}
function card(kind, title, w = 2.4, accent = false, rows, res) {
  const g = new THREE.Group(), h = w * 640 / 1024;
  const tex = cardTex(kind, title, accent, rows, res ?? (w > 3 ? 1 : .6));
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: .97, depthWrite: false, side: THREE.DoubleSide }));
  const gl = glow(accent ? PAL.ember : (KIND_ACCENT[kind] || PAL.blue), w * 1.6, .12); gl.position.z = -.05; gl.userData.base = .12; g.add(gl); const cast = glow(accent ? PAL.ember : (KIND_ACCENT[kind] || PAL.blue), w * 4.2, .045); cast.position.set(0, -h * .4, -.4); cast.userData.base = .045; g.add(cast); g.userData.cast = cast; g.add(m);
  g.userData.w = w; g.userData.h = h; g.userData.face = m; g.userData.tex = tex; g.userData.glow = gl; g.userData.screen = 1; g.userData.kind = kind; g.userData.alive = !['chat', 'explorer', 'solver', 'mapping', 'file', 'record'].includes(kind); return g;
}
// per-frame: tilt toward the cursor, lift, brighten the glow, redraw the screen while hot
function live(c, hot, T, mouseX = 0, mouseY = 0) { c.userData.tex.userData.redraw(hot, T, c.userData.slip, c.userData.flash, c.userData.step, c.userData.alive); c.userData.glow.material.opacity = (c.userData.glow.userData.base + hot * .35) * (c.userData._f ?? 1); if (c.userData.cast) { c.userData.cast.material.opacity = (.045 + hot * .09) * (c.userData._f ?? 1); c.userData.cast.scale.setScalar(c.userData.w * (4.2 + hot * 1.2)); } c.userData.glow.scale.setScalar(c.userData.w * (1.6 + hot * .4)); if (c.userData.tiltBase === undefined) c.userData.tiltBase = [c.rotation.x, c.rotation.y]; c.rotation.x = c.userData.tiltBase[0] + mouseY * .18 * hot; c.rotation.y = c.userData.tiltBase[1] + mouseX * .22 * hot; }
let SURF = null;
function surfTex() { if (SURF) return SURF; const c = cvs(256, 256), x = c.getContext('2d'); const img = x.createImageData(256, 256); for (let i = 0; i < img.data.length; i += 4) { const v = 118 + Math.random() * 20; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255; } x.putImageData(img, 0, 0); SURF = new THREE.CanvasTexture(c); SURF.wrapS = SURF.wrapT = THREE.RepeatWrapping; SURF.repeat.set(3, 3); return SURF; }
const solidMat = (col, op = 1) => { const m = new THREE.MeshStandardMaterial({ color: col, roughness: .42, metalness: .28, envMapIntensity: 1.25, transparent: op < 1, opacity: op, depthWrite: op >= .5, roughnessMap: surfTex(), bumpMap: surfTex(), bumpScale: .006 }); m.emissive = new THREE.Color(col).multiplyScalar(.14); m.userData.emBase = m.emissive.clone(); return m; };
const glassMat = (col, op = .35) => new THREE.MeshPhysicalMaterial({ color: col, roughness: .12, metalness: 0, transparent: true, opacity: op, envMapIntensity: 1.6, clearcoat: 1, clearcoatRoughness: .1, depthWrite: false, side: THREE.DoubleSide });
function roundedBox(w, h, d, r = .06) { r = Math.min(r, w / 2 - 1e-3, h / 2 - 1e-3); const sh = new THREE.Shape(); sh.moveTo(-w / 2 + r, -h / 2); sh.lineTo(w / 2 - r, -h / 2); sh.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r); sh.lineTo(w / 2, h / 2 - r); sh.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2); sh.lineTo(-w / 2 + r, h / 2); sh.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r); sh.lineTo(-w / 2, -h / 2 + r); sh.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2); const bv = Math.min(.035, d / 4, r); const g = new THREE.ExtrudeGeometry(sh, { depth: Math.max(.001, d - bv * 2), bevelEnabled: true, bevelThickness: bv, bevelSize: bv, bevelSegments: 3, curveSegments: 6 }); g.translate(0, 0, -d / 2 + bv); g.computeVertexNormals(); return g; }
function slab(w, h, d, col, op = 1, edge = .5, r = .06) { const g = new THREE.Group(); g.add(new THREE.Mesh(roundedBox(w, h, d, r), solidMat(col, op))); if (edge) g.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d)), lineMat(C.bone, edge * .5))); g.userData.body = g.children[0]; return g; }
function tube(pts, r, col, op = .9) { const cv = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0); const m = new THREE.Mesh(new THREE.TubeGeometry(cv, Math.max(2, pts.length * 6), r, 6, false), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: op, depthWrite: false })); return m; }
function haze(col, size, op = .12) { const s = glow(col, size, op); s.userData.nofade = 1; return s; }
function wireBox(w, h, d, col, op = .45) { return new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d)), lineMat(col, op)); }
function wirePlane(w, h, col, op = .45) { return new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(w, h)), lineMat(col, op)); }
function ring(r, col, op = .5, w = .02) { return new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.RingGeometry(r, r + w, 64)), lineMat(col, op)); }
function glow(col = '#E9E3D6', size = 2, op = .7) {
  const c = cvs(128, 128), x = c.getContext('2d'), g = x.createRadialGradient(64, 64, 0, 64, 64, 64); g.addColorStop(0, col); g.addColorStop(.35, col + '66'); g.addColorStop(1, col + '00'); x.fillStyle = g; x.fillRect(0, 0, 128, 128);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), transparent: true, opacity: op, depthWrite: false, blending: THREE.AdditiveBlending })); s.scale.set(size, size, 1); return s;
}
function grid(w, d, nx, nz, col, op = .14) {
  const pts = []; for (let i = 0; i <= nx; i++) { const x = -w / 2 + w * i / nx; pts.push(x, 0, -d / 2, x, 0, d / 2); } for (let j = 0; j <= nz; j++) { const z = -d / 2 + d * j / nz; pts.push(-w / 2, 0, z, w / 2, 0, z); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3)); return new THREE.LineSegments(g, lineMat(col, op));
}
function line(pts, col, op = .6) { return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat(col, op)); }
function segs(flat, col, op = .4) { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(flat, 3)); return new THREE.LineSegments(g, lineMat(col, op)); }
function net(n, sx, sy, sz, k = 2, col, op = .3) {
  const P = []; for (let i = 0; i < n; i++) P.push(new THREE.Vector3((R() - .5) * sx, (R() - .5) * sy, (R() - .5) * sz));
  const seg = [], E = []; for (let i = 0; i < n; i++) { const d = P.map((q, j) => [P[i].distanceTo(q), j]).sort((a, b) => a[0] - b[0]); for (let m = 1; m <= k; m++) { const j = d[m][1]; if (j > i) { seg.push(P[i].x, P[i].y, P[i].z, P[j].x, P[j].y, P[j].z); E.push([i, j]); } } }
  const g = new THREE.Group(); g.add(segs(seg, col, op));
  const pg = new THREE.BufferGeometry(); pg.setFromPoints(P); g.add(new THREE.Points(pg, new THREE.PointsMaterial({ color: col || C.bone, size: .09, transparent: true, opacity: .9, sizeAttenuation: true })));
  g.userData.P = P; g.userData.E = E; return g;
}
const vec = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
const bez = (a, m, b, n = 40) => new THREE.QuadraticBezierCurve3(a, m, b).getPoints(n);


// ---- space: a nebula sky in a shader, far gas giants, nova shells and coloured dust ----------------------------------
const NOISE_GLSL = `
  float h21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
  float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f); float a = h21(i), b = h21(i + vec2(1, 0)), c = h21(i + vec2(0, 1)), d = h21(i + vec2(1, 1)); return mix(mix(a, b, f.x), mix(c, d, f.x), f.y); }
  float fbm(vec2 p){ float v = 0., a = .5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6); for (int i = 0; i < 5; i++) { v += a * vn(p); p = m * p; a *= .5; } return v; }`;
// per-room sky palettes [deep, mid, highlight]
const SKY = { hero: ['#141C3A', '#2A2250', '#5B86C8'], problem: ['#121A38', '#24204E', '#5B86C8'], product: ['#141C3A', '#2B2A5C', '#6A8FD0'], how: ['#10203C', '#1E3058', '#5B9CC8'], industries: ['#11203A', '#1C2E55', '#5B96C8'], about: ['#161A3C', '#2A2458', '#6F86CC'], demo: ['#121C36', '#1E2C52', '#6FA8DC'], book: ['#F2EEE6', '#F2EEE6', '#F2EEE6'], week: ['#121A38', '#24204E', '#5B86C8'], surgery: ['#10203C', '#1E3058', '#5B9CC8'], whose: ['#141C3A', '#2B2A5C', '#6A8FD0'], ripple: ['#121A38', '#24204E', '#5B86C8'], gates: ['#10203C', '#1E3058', '#5B9CC8'], donor: ['#141C3A', '#2B2A5C', '#6A8FD0'], agents: ['#10203C', '#1E3058', '#5B9CC8'], relax: ['#141C3A', '#2B2A5C', '#6A8FD0'], views: ['#11203A', '#1C2E55', '#5B96C8'] };
let SPACE = null;
function buildSpace(sections) {
  const sp = { clouds: [], novas: [] };
  // the nebula: a clip-space quad drawn first
  sp.neb = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({
    uniforms: { uT: U(0), uP: U(0), uStretch: U(0), uRes: U(new THREE.Vector2(1, 1)), uPar: U(new THREE.Vector2()), uA: U(new THREE.Color('#141C3A')), uB: U(new THREE.Color('#2A2250')), uC: U(new THREE.Color('#5B86C8')), uBg: U(C.bg), uAmt: U(1) },
    vertexShader: `void main(){ gl_Position = vec4(position.xy, .9999, 1.); }`,
    fragmentShader: `uniform float uT, uP, uAmt, uStretch; uniform vec2 uRes, uPar; uniform vec3 uA, uB, uC, uBg; ${NOISE_GLSL}
      void main(){ vec2 uv = (gl_FragCoord.xy / uRes - .5) * vec2(uRes.x / uRes.y, 1.); uv *= vec2(1., 1. / (1. + uStretch * 2.5)); uv += normalize(uv + 1e-4) * uStretch * .25 * length(uv);
        float t = uT * .012; vec2 q = uv * 1.35 + uPar * .06 + vec2(.3, uP * 2.6);
        float n1 = fbm(q + t), n2 = fbm(q * 2.3 - t * 1.4 + 7.1), n3 = fbm(q * .8 + vec2(n1, n2) * .9 - t * .6);
        float cloud = smoothstep(.3, .84, n3);
        vec3 col = mix(uBg, uA, cloud * 1.05);
        col = mix(col, uB, smoothstep(.45, .95, n2) * cloud * .85);
        float fil = pow(smoothstep(.58, .98, n1 * .6 + n3 * .5), 2.2);
        col += uC * fil * .7 * cloud;
        // a faint far star field with slow twinkle
        vec2 sc = uv * 220.; vec2 ci = floor(sc); float st = h21(ci); vec2 f = fract(sc) - .5;
        float star = step(.985, st) * smoothstep(.22, .0, length(f)) * (.5 + .5 * sin(uT * (1. + st * 3.) + st * 40.));
        col += vec3(.75, .8, .95) * star * .55;
        gl_FragColor = vec4(mix(uBg, col, uAmt), 1.); }`,
    depthTest: false, depthWrite: false }));
  sp.neb.frustumCulled = false; sp.neb.renderOrder = -1000; scene.add(sp.neb);
  const L = sections.length * ROOM;
  // nebulae: painted cloud sprites at many depths, so they drift past with parallax
  const nebTex = (ca, cb, seed) => { const N = 256, c = cvs(N, N), x = c.getContext('2d'), img = x.createImageData(N, N); const hs = n => { const v = Math.sin(n * 127.1 + seed * 311.7) * 43758.5453; return v - Math.floor(v); }; const vn = (px, py) => { const ix = Math.floor(px), iy = Math.floor(py), fx = px - ix, fy = py - iy, u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy); const h = (i, j) => hs(i * 57.3 + j * 131.7); return (h(ix, iy) * (1 - u) + h(ix + 1, iy) * u) * (1 - v) + (h(ix, iy + 1) * (1 - u) + h(ix + 1, iy + 1) * u) * v; }; const fbm = (px, py) => { let s2 = 0, am = .5; for (let o = 0; o < 5; o++) { s2 += am * vn(px, py); px = px * 1.9 + 3.1; py = py * 1.9 + 1.7; am *= .5; } return s2; };
    const A = new THREE.Color(ca), B = new THREE.Color(cb); for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) { const u = i / N - .5, v = j / N - .5; const r = Math.sqrt(u * u + v * v) * 2; const n1 = fbm(u * 5 + 10, v * 5 + 10), n2 = fbm(u * 9 + 40, v * 9 + 40), n3 = fbm(u * 3 + n1 * 2, v * 3 + n2 * 2); const fall = Math.max(0, 1 - r * r); let al = Math.max(0, (n3 - .42) * 2.4) * fall; al = Math.min(1, al); const wisp = Math.pow(Math.max(0, n2 - .55) * 2.2, 2) * fall; const t = Math.min(1, Math.max(0, (n1 - .35) * 2)); const k = (j * N + i) * 4; img.data[k] = (A.r * (1 - t) + B.r * t) * 255 + wisp * 90; img.data[k + 1] = (A.g * (1 - t) + B.g * t) * 255 + wisp * 90; img.data[k + 2] = (A.b * (1 - t) + B.b * t) * 255 + wisp * 110; img.data[k + 3] = Math.min(255, (al * .85 + wisp * .6) * 255); } x.putImageData(img, 0, 0); const t = new THREE.CanvasTexture(c); return t; };
  const NT = [nebTex('#1C2450', '#5B86C8', 1), nebTex('#242058', '#7A86D0', 2), nebTex('#152A4A', '#4F9AC8', 3), nebTex('#1A1E48', '#6F86CC', 4), nebTex('#122040', '#5B86C8', 5), nebTex('#2A2250', '#8C86D0', 6)];
  sp.clouds = []; for (let i = 0; i < 34; i++) { const t = NT[i % NT.length]; const m = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, opacity: .16 + R() * .14, depthWrite: false, rotation: R() * 6.28, blending: i % 4 === 0 ? THREE.AdditiveBlending : THREE.NormalBlending })); const sz = 26 + R() * 50; m.scale.set(sz * (1 + R() * .6), sz, 1); m.position.set((R() - .5) * 110, (R() - .5) * 50, -R() * L - 20); m.userData.rot = (R() - .5) * .012; m.userData.op = m.material.opacity; m.userData.nofade = 1; scene.add(m); sp.clouds.push(m); }
  // nova shells: additive sprites with a ragged ring
  const nova = (col, size, op) => { const c = cvs(256, 256), x = c.getContext('2d'); const g = x.createRadialGradient(128, 128, 0, 128, 128, 128); g.addColorStop(0, col + 'AA'); g.addColorStop(.25, col + '44'); g.addColorStop(.6, col + '12'); g.addColorStop(1, col + '00'); x.fillStyle = g; x.fillRect(0, 0, 256, 256); x.strokeStyle = col + '66'; for (let i = 0; i < 90; i++) { const a0 = i / 90 * 6.283, a1 = a0 + .07, r = 78 + Math.sin(i * 1.7) * 6 + Math.sin(i * .4) * 9; x.lineWidth = 1 + (i % 3); x.beginPath(); x.arc(128, 128, r, a0, a1); x.stroke(); } const sp2 = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), transparent: true, opacity: op, depthWrite: false, blending: THREE.AdditiveBlending })); sp2.scale.set(size, size, 1); sp2.userData.nofade = 1; return sp2; };
  [['#7A86D0', 54, .1, 30, -24, -.36], ['#6FA8DC', 70, .09, -50, 18, -.62], ['#5B9CC8', 40, .09, 48, 6, -.9]].forEach(d => { const n = nova(d[0], d[1], d[2]); n.position.set(d[3], d[4], d[5] * L); n.userData.s0 = d[1]; scene.add(n); sp.novas.push(n); });
  // coloured dust: soft, slow, a little tinted
  { const n = 900, a = new Float32Array(n * 3), col = new Float32Array(n * 3), tints = [[.55, .62, .85], [.6, .7, .95], [.5, .75, .9], [.62, .6, .88], [.75, .8, 1]]; for (let i = 0; i < n; i++) { a[i * 3] = (R() - .5) * 70; a[i * 3 + 1] = (R() - .5) * 40; a[i * 3 + 2] = -R() * L - 2; const t = tints[i % 5]; col[i * 3] = t[0]; col[i * 3 + 1] = t[1]; col[i * 3 + 2] = t[2]; } const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(a, 3)); g.setAttribute('color', new THREE.BufferAttribute(col, 3)); const c = cvs(64, 64), x = c.getContext('2d'); const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(.4, 'rgba(255,255,255,.35)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = gr; x.fillRect(0, 0, 64, 64); sp.dust = new THREE.Points(g, new THREE.PointsMaterial({ size: .55, map: new THREE.CanvasTexture(c), vertexColors: true, transparent: true, opacity: .32, depthWrite: false, sizeAttenuation: true, blending: THREE.AdditiveBlending })); scene.add(sp.dust); }
  sp.cur = [new THREE.Color(), new THREE.Color(), new THREE.Color()];
  return sp;
}
function updateSpace(sp, T, pd, q, fade, par) {
  // palette: blend the rooms' skies by their visibility
  const acc = [new THREE.Color(0, 0, 0), new THREE.Color(0, 0, 0), new THREE.Color(0, 0, 0)]; let wsum = 0;
  SEC.forEach((s, i) => { const k = SKY[s.name] || SKY.hero; const w = Math.max(.0001, 1 - Math.min(1, Math.abs(pd - (s.a + s.b) / 2) / ((s.b - s.a) * .85))); wsum += w; k.forEach((h, j) => acc[j].add(new THREE.Color(h).multiplyScalar(w))); });
  acc.forEach((c, j) => { c.multiplyScalar(1 / wsum); sp.cur[j].lerp(c, .06); });
  const u = sp.neb.material.uniforms; u.uT.value = T; u.uP.value = pd; u.uStretch.value = SPEED; u.uA.value.copy(sp.cur[0]); u.uB.value.copy(sp.cur[1]); u.uC.value.copy(sp.cur[2]); u.uPar.value.set(par.x, par.y); u.uAmt.value = 1 - fade; u.uRes.value.copy(post.uniforms.uRes.value);
  sp.clouds.forEach((c, i) => { c.material.rotation += c.userData.rot * .016; c.material.opacity = c.userData.op * (1 - fade) * (.85 + .15 * Math.sin(T * .2 + i)); c.position.y += Math.sin(T * .05 + i) * .002; });
  sp.novas.forEach((n, i) => { const s = n.userData.s0 * (1 + .04 * Math.sin(T * .3 + i)); n.scale.set(s, s, 1); n.material.rotation = T * .01 * (i % 2 ? -1 : 1); n.material.opacity = [.11, .09, .1][i] * (1 - fade); });
  sp.dust.rotation.z = Math.sin(T * .03) * .03; sp.dust.position.y = Math.sin(T * .13) * .5; sp.dust.material.opacity = .32 * (1 - fade);
}

// ---- the engine -----------------------------------------------------------------------------------------
let renderer, scene, cam, rt, post, FIELD, ROOM = 60, SEC = [], ROOMS = [], K = null, raycaster, HITMAT, RIP = [];
function rippleAt(obj, col) { const r = RIP.find(r => r.userData.t >= 1) || RIP[0]; obj.getWorldPosition(r.position); r.position.z += .15; r.quaternion.copy(cam.quaternion); r.material.color.set(col || C.bone); r.userData.t = 0; }
const FADERS = [], HOV = [];
const mouse = { x: 0, y: 0, tx: 0, ty: 0, nx: 0, ny: 0, moved: false, down: null };
function fader(g, z) { const mats = []; g.traverse(o => { if (o.material && !o.userData.nofade) { if (!o.material.transparent) { o.material.transparent = true; } mats.push({ m: o.material, base: o.material.opacity }); } }); FADERS.push({ g, mats, z }); g.userData._f = 1; return g; }
function place(g, obj, x, y, lz) { obj.position.set(x, y, lz); obj.scale.multiplyScalar(FIT); g.add(obj); fader(obj, g.position.z + lz); return obj; }
// hover: an invisible hit plane on an object; the engine eases obj.userData.hot 0..1 and shows the tip
const LINKS = {};
function linkDom() { $$('[data-link]').forEach(el => { if (el._lk) return; el._lk = 1; el.classList.add('lk'); const key = el.dataset.link; el.addEventListener('pointerenter', () => { (LINKS[key] || []).forEach(h => { h.userData.h.obj.userData.hotT = 1; }); $$(`[data-link="${key}"]`).forEach(e => e.classList.add('lit')); }); el.addEventListener('pointerleave', () => { (LINKS[key] || []).forEach(h => { if (hovered !== h) h.userData.h.obj.userData.hotT = 0; }); $$(`[data-link="${key}"]`).forEach(e => e.classList.remove('lit')); }); }); }
function sfx() {}
function sfxToggle() {}
function sfxDepth() {}
// ---- autopilot: fly the whole corridor on a clock (also what the reel is rendered from)
let AUTO = null;
function autoplay(dur) {
  // one continuous curve through the holds: slow through each room, a smooth surge between them, no steps in speed
  if (AUTO) return; const rng = scrollRange(); const keys = []; let t = 0;
  SEC.forEach((s, i) => { const span = s.b - s.a, last = i === SEC.length - 1; const hr = s.holdRange || [.2, .7]; const d0 = i === 0 ? 0 : s.a + span * hr[0], d1 = last ? 1 : s.a + span * hr[1]; const hold = s.dwell ?? (i === 0 ? 2400 : last ? 3500 : 4500); keys.push([t, d0]); t += hold; keys.push([t, d1]); if (!last) t += 950; });
  const total = t; const k = dur ? dur / total : 1; const curve = mono(keys.map(q => [q[0] * k, q[1]])); const t0 = performance.now();
  AUTO = { t0, total: total * k }; document.body.classList.add('auto');
  const step = now => { if (!AUTO) return; const tt = now - t0; const p = tt >= AUTO.total ? 1 : curve(tt); AUTO.p = p; scrollTo(0, p * rng); if (tt < AUTO.total) requestAnimationFrame(step); else stopAuto(); };
  requestAnimationFrame(step);
}
function stopAuto() { AUTO = null; document.body.classList.remove('auto'); }
function hover(obj, o = {}) {
  const hit = new THREE.Mesh(new THREE.PlaneGeometry(o.w || 2, o.h || 1.4), HITMAT); hit.position.copy(o.at || vec()); if (o.rot) hit.rotation.copy(o.rot); obj.add(hit);
  obj.userData.hot = 0; obj.userData.hotT = 0; hit.userData.h = { obj, tip: o.tip, on: o.on, off: o.off, click: o.click, root: null, dy: o.dy ?? 0, col: o.col, meta: o.meta }; if (o.meta && o.meta.kind) obj.userData.kind = o.meta.kind; if (o.link) (LINKS[o.link] = LINKS[o.link] || []).push(hit); if (o.meta && o.meta.id) hit.userData.id = o.meta.id; HOV.push(hit); return obj;
}

// ---- the modal: a screen seen large, its example data explained, and the way to the market page -------------------
const IND = { epc: ['EPC / Construction', 'epc.html', 'See the EPC journey'], dc: ['Data centers', 'data-centers.html', 'See the data center journey'], sc: ['Supply chain', 'supply-chain.html', 'See the supply chain journey'] };
const KIND_FACTS = { sheet: ['212 rows read exactly as exported; nothing cleaned by hand', 'SG-B02 flagged late: +35 calendar days on a zero-float path', 'Every row keeps its source ID, so every figure has a home'], mail: ['Delivery revision 03 landed Monday 9 Mar at 07:42', 'Four recipients, none of whom owns the handover date', 'Read as it lands and linked to every date it moves'], dash: ['Handover 14 May 2027 with zero float on the electrical path', 'Readiness 12 of 18 gates; gate 13 waits on the lineup', 'The forecast re-runs the moment the slip lands, not at month end'], approve: ['2 of 4 approvals, waiting three days', 'CO-221 is an expedite quote for a fix that does not fit the design', 'Options are checked against the design before anyone signs'], decision: ['Three eligible options; one refused, with its reason printed', '$410,000 to reallocate against $1,150,000 to expedite', 'Five records attached: ENG-117, REL-204, LOG-061, SCH-089, COM-033'], lines: [] };
let modalEl = null, HOVER_DEFAULT = {}, SPEED = 0;
const SEC_LABEL = { hero: 'Hero', problem: 'The problem', product: 'What it does', how: 'How it works', industries: 'Industries', about: 'Product philosophy', demo: 'Proof', week: 'The problem', surgery: 'How it works', whose: 'The record', ripple: 'The problem', gates: 'How it works', donor: 'The record', agents: 'How it works', relax: 'The decision', views: 'The plan' };
function roomOf(obj) { let o = obj; while (o && o.parent && o.parent !== scene) o = o.parent; const i = ROOMS.indexOf(o); return i >= 0 ? SEC[i] : null; }
function ensureModal() { if (modalEl) return modalEl; modalEl = document.createElement('div'); modalEl.id = 'modal'; modalEl.innerHTML = '<div class="mback"></div><div class="mglow"></div><button class="mclose" aria-label="Close"><svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M4 4 L16 16 M16 4 L4 16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" fill="none"/></svg></button><div class="mcard" role="dialog" aria-modal="true"><div class="mstage"><div class="mimg"><img alt=""><div class="mrefl"><img alt=""></div><div class="mlight"></div></div><svg class="mlead" aria-hidden="true"></svg></div><div class="mtext"><div class="mchips"></div><div class="mkey"><div class="mnum">0</div><div class="mlab"></div></div><h3></h3><p class="mbody"></p><div class="mk">On this screen</div><ul class="mfacts"></ul><div class="mctas"></div><span class="sample">Sample data · fictional company and project</span></div></div>'; document.body.appendChild(modalEl); const close = () => closeModal(); modalEl.querySelector('.mback').addEventListener('click', close); modalEl.querySelector('.mclose').addEventListener('click', close); addEventListener('keydown', e => { if (e.key === 'Escape') close(); }); return modalEl; }
const _c = new THREE.Vector3();
function screenRect(hit) { const g = hit.geometry.parameters, w = g.width || 1, hgt = g.height || 1; let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9; const P = [[-w / 2, -hgt / 2], [w / 2, -hgt / 2], [w / 2, hgt / 2], [-w / 2, hgt / 2]].map(c => { _c.set(c[0], c[1], 0); hit.localToWorld(_c); _c.project(cam); const sx = (_c.x * .5 + .5) * innerWidth, sy = (-_c.y * .5 + .5) * innerHeight; x0 = Math.min(x0, sx); x1 = Math.max(x1, sx); y0 = Math.min(y0, sy); y1 = Math.max(y1, sy); return [sx, sy]; });
  // the quad's skew tells us how the screen is turned: left edge vs right edge heights, top vs bottom widths
  const hl = Math.abs(P[3][1] - P[0][1]), hr = Math.abs(P[2][1] - P[1][1]), wt = Math.abs(P[2][0] - P[3][0]), wb = Math.abs(P[1][0] - P[0][0]);
  const ry = clamp((hl - hr) / Math.max(1, (hl + hr) / 2) * 60, -28, 28), rx = clamp((wb - wt) / Math.max(1, (wt + wb) / 2) * 60, -22, 22);
  return { x: x0, y: y0, w: Math.max(24, x1 - x0), h: Math.max(16, y1 - y0), ry, rx }; }
let modalFrom = null, ghost = null;
function flyGhost(src, from, to, done, back) { if (ghost) ghost.remove(); ghost = document.createElement('img'); ghost.className = 'mghost'; ghost.src = src; Object.assign(ghost.style, { left: to.x + 'px', top: to.y + 'px', width: to.w + 'px', height: to.h + 'px', transformOrigin: '0 0' }); document.body.appendChild(ghost);
  const sx = from.w / to.w, sy = from.h / to.h, dx = from.x - to.x, dy = from.y - to.y; const ry = from.ry || 0, rx = from.rx || 0;
  const start = `translate(${dx}px, ${dy}px) perspective(1400px) rotateY(${ry}deg) rotateX(${rx}deg) scale(${sx}, ${sy})`, mid = `translate(${dx * .35}px, ${dy * .35 - 26}px) perspective(1400px) rotateY(${ry * .25}deg) rotateX(${rx * .25}deg) scale(${lerp(sx, 1, .72)}, ${lerp(sy, 1, .72)})`, end = `translate(0, 0) perspective(1400px) rotateY(0deg) rotateX(0deg) scale(1, 1)`;
  const frames = back ? [{ transform: end, filter: 'brightness(1)', boxShadow: '0 40px 90px -30px rgba(0,0,0,.9)' }, { transform: mid, filter: 'brightness(1.25)', offset: .55 }, { transform: start, filter: 'brightness(1.1)', boxShadow: '0 0 0 0 rgba(0,0,0,0)' }] : [{ transform: start, filter: 'brightness(1.3) saturate(1.15)', boxShadow: '0 0 0 0 rgba(0,0,0,0)', opacity: .92 }, { transform: mid, filter: 'brightness(1.15)', opacity: 1, offset: .5 }, { transform: end, filter: 'brightness(1)', boxShadow: '0 40px 90px -30px rgba(0,0,0,.9)', opacity: 1 }];
  const an = ghost.animate(frames, { duration: back ? 560 : 800, easing: 'cubic-bezier(.3,.85,.25,1)', fill: 'forwards' }); an.onfinish = () => { if (ghost) { ghost.remove(); ghost = null; } done && done(); }; }
function closeModal() { if (!modalEl || !modalEl.classList.contains('on')) return; const m = modalEl; const img = m.querySelector('.mimg img'); const hasImg = !!img.src;
  if (modalFrom && hasImg) { const to = screenRect(modalFrom); const r = img.getBoundingClientRect(); const rr = r.height > 4 ? { x: r.left, y: r.top, w: r.width, h: r.height } : (() => { const bx = m.querySelector('.mimg').getBoundingClientRect(); const iw = bx.width, ih = iw * 640 / 1024; return { x: bx.left, y: bx.top, w: iw, h: ih }; })(); img.style.opacity = 0; flyGhost(img.src, to, rr, null, true); }
  if (modalFrom) { const o = modalFrom.userData.h.obj; o.userData.hotT = 0; } sfx('close'); m.classList.remove('on'); document.body.classList.remove('modal-open'); modalFrom = null; }
function openModal(h, hit) { const m = ensureModal(); modalFrom = hit || null; const obj = h.obj, meta = Object.assign({}, HOVER_DEFAULT, h.meta || {}), tip = h.tip ? h.tip() : { t: meta.title || '', b: meta.body || '' }; if (!meta.section) { const r = roomOf(obj); if (r) meta.section = SEC_LABEL[r.name] || r.name; }
  const img = m.querySelector('.mimg img'); const tex = obj.userData.tex; m.querySelector('.mimg').style.display = '';
  if (tex && tex.image && tex.image.toDataURL) { try { tex.userData.redraw(1, 0); img.src = tex.image.toDataURL('image/jpeg', .88); } catch (e) { img.removeAttribute('src'); } }
  else { try { const facts0 = meta.facts || (obj.userData.kind && KIND_FACTS[obj.userData.kind]) || [(tip.b || '').replace(/<[^>]+>/g, '')]; const t2 = cardTex('card', (tip.t || meta.title || '').replace(/<[^>]+>/g, ''), false, facts0, 1); t2.userData.redraw(1, Math.random() * 6); img.src = t2.image.toDataURL('image/jpeg', .88); } catch (e) { img.removeAttribute('src'); } }
  const ind = IND[meta.industry]; const acc = obj.userData.kind ? (KIND_ACCENT[obj.userData.kind] || PAL.teal) : PAL.teal; m.style.setProperty('--acc', acc);
  m.querySelector('.mchips').innerHTML = (meta.section ? `<span>${meta.section}</span>` : '') + (ind ? `<span class="ind">${ind[0]}</span>` : '<span class="ind">Resonance</span>');
  try { m.querySelector('.mrefl img').src = img.src; } catch (e) {}
  m.querySelector('h3').textContent = (tip.t || meta.title || '').replace(/<[^>]+>/g, ''); m.querySelector('.mbody').innerHTML = tip.b || meta.body || '';
  const facts = meta.facts || (obj.userData.kind && KIND_FACTS[obj.userData.kind]) || []; const ul = m.querySelector('.mfacts'); ul.innerHTML = facts.map((f, i) => `<li data-i="${i}"><i></i><span>${f}</span></li>`).join(''); m.querySelector('.mk').style.display = facts.length ? '' : 'none';
  // the key figure: the first number on the screen's facts (or the tip), shown large and counted up
  const KEYS = { sheet: ['+35 d', 'SG-B02 slips'], mail: ['+35 d', 'arrival on site, revised'], dash: ['0 d', 'float on the electrical path'], approve: ['2 / 4', 'approvals, waiting 3 days'], decision: ['$410,000', 'to hold 14 May'], card: null, lines: null };
  let key = meta.key || KEYS[obj.userData.kind] || null; if (!key) { const all = facts.concat([(tip.b || '').replace(/<[^>]+>/g, '')]); const PATS = [/(\$[\d][\d,]*)/, /([+−-]?\d+ ?d)\b(?! ?[A-Z])/, /(\d+ ?(?:of|\/) ?\d+)/, /(\d[\d,]* ?(?:MW IT-days|MW IT|MW|%))/]; outer: for (const pat of PATS) for (const f of all) { const mm = f.match(pat); if (mm) { key = [mm[1].trim(), f.replace(mm[1], '').replace(/^[\s:·,]+/, '').slice(0, 48)]; break outer; } } }
  const mkey = m.querySelector('.mkey'); if (key) { mkey.style.display = ''; m.querySelector('.mlab').textContent = key[1]; const numEl = m.querySelector('.mnum'); const target = key[0]; const digits = target.replace(/[^\d]/g, ''); const n = parseInt(digits || '0', 10); const t0 = performance.now(); numEl.textContent = target.replace(/\d[\d,]*/, '0'); const tick = now => { const t = clamp((now - t0 - 350) / 900); const ease = 1 - Math.pow(1 - t, 3); const v = Math.round(n * ease); const s = target.replace(/\d[\d,]*/, v.toLocaleString('en-US')); numEl.textContent = s; if (t < 1 && m.classList.contains('on') || t < .01) requestAnimationFrame(tick); }; requestAnimationFrame(tick); } else mkey.style.display = 'none';
  // leader lines: hovering a fact points at where it lives on the screen
  const ANCH = { sheet: [[.5, .3], [.78, .3], [.1, .3]], mail: [[.3, .2], [.35, .13], [.55, .58]], dash: [[.18, .2], [.82, .2], [.7, .75]], approve: [[.5, .3], [.5, .5], [.5, .9]], decision: [[.5, .72], [.7, .6], [.4, .88]], card: [[.18, .2], [.5, .2], [.82, .2]], lines: [[.3, .3], [.3, .45], [.3, .6]] }[obj.userData.kind || 'card'];
  const svg = m.querySelector('.mlead'); svg.innerHTML = ''; const lis = [...ul.querySelectorAll('li')];
  const drawLead = (i, ax, ay) => { const li = lis[i]; if (!li) return; const a = ANCH[i % ANCH.length]; const ir = img.getBoundingClientRect(), sr = svg.getBoundingClientRect(), lr = li.getBoundingClientRect(); const x1 = ir.left + ir.width * (ax ?? a[0]) - sr.left, y1 = ir.top + ir.height * (ay ?? a[1]) - sr.top, x2 = lr.left - sr.left + 2, y2 = lr.top + lr.height / 2 - sr.top; svg.innerHTML = `<path d="M ${x1} ${y1} C ${x1 + (x2 - x1) * .5} ${y1}, ${x1 + (x2 - x1) * .5} ${y2}, ${x2} ${y2}" pathLength="100"/><circle cx="${x1}" cy="${y1}" r="5"/>`; svg.classList.add('on'); lis.forEach((l, k) => l.classList.toggle('lit', k === i)); };
  const clearLead = () => { svg.classList.remove('on'); lis.forEach(l => l.classList.remove('lit')); };
  lis.forEach((li, i) => { li.addEventListener('pointerenter', () => drawLead(i)); li.addEventListener('pointerleave', clearLead); });
  // and from the screen side: moving over the screen draws the line from that spot to the fact it belongs to
  if (img._lead) { img.removeEventListener('pointermove', img._lead); img.removeEventListener('pointerleave', img._leadOut); }
  img._cur = -1; img._lead = ev => { const ir = img.getBoundingClientRect(); const u = (ev.clientX - ir.left) / ir.width, v = (ev.clientY - ir.top) / ir.height; let best = 1e9, bi = -1; lis.forEach((li, i) => { const a = ANCH[i % ANCH.length]; const d = Math.hypot((u - a[0]) * 1.6, v - a[1]); if (d < best) { best = d; bi = i; } }); const want = (bi >= 0 && best < .6) ? bi : -1; if (want === img._cur) return; img._cur = want; if (want >= 0) drawLead(want); else clearLead(); };
  img._leadOut = () => { img._cur = -1; clearLead(); }; img.addEventListener('pointermove', img._lead); img.addEventListener('pointerleave', img._leadOut);
  const ctas = m.querySelector('.mctas'); ctas.innerHTML = ''; if (ind && !location.pathname.endsWith('/' + ind[1])) { const a = document.createElement('a'); const dest = ind[1] + (meta.room ? '#' + meta.room + (meta.id ? ':' + meta.id : '') : ''); a.className = 'btn primary'; a.href = abs(dest); a.textContent = ind[2] + ' →'; a.addEventListener('click', e => { e.preventDefault(); veilTo(dest); }); ctas.appendChild(a); }
  if (meta.go !== undefined) { const b = document.createElement('a'); b.className = 'btn ' + (ind ? 'ghost' : 'primary'); b.href = '#'; b.textContent = meta.goLabel || 'Book a working session'; b.addEventListener('click', e => { e.preventDefault(); closeModal(); const sct = SEC[meta.go]; scrollTo({ top: (sct.a + (sct.b - sct.a) * (sct.enter ?? .22)) * scrollRange(), behavior: 'smooth' }); }); ctas.appendChild(b); }
  if (meta.actions) { const row = document.createElement('div'); row.className = 'macts'; meta.actions.forEach(ac => { const bb = document.createElement('button'); bb.className = 'btn ' + (ac.cls || 'ghost'); bb.textContent = ac.label; bb.addEventListener('click', () => { ac.onClick && ac.onClick(bb); if (meta.afterAction) meta.afterAction(m); }); row.appendChild(bb); }); ctas.appendChild(row); }
  const c = document.createElement('button'); c.className = 'btn ghost'; c.textContent = 'Back to the page'; c.addEventListener('click', closeModal); ctas.appendChild(c);
  // the screen tilts toward the pointer

  // grow out of the screen that was clicked: the dialog unfolds from its centre and a copy of the screen flies into the image slot
  const from = hit ? screenRect(hit) : { x: innerWidth / 2 - 60, y: innerHeight / 2 - 40, w: 120, h: 80 }; const card = m.querySelector('.mcard'); const cx = from.x + from.w / 2, cy = from.y + from.h / 2;
  m.classList.add('measure'); const cr = card.getBoundingClientRect(); const box = m.querySelector('.mimg').getBoundingClientRect(); m.classList.remove('measure');
  card.style.transformOrigin = `${((cx - cr.left) / cr.width * 100).toFixed(1)}% ${((cy - cr.top) / cr.height * 100).toFixed(1)}%`;
  card.style.transition = 'none'; card.getBoundingClientRect(); card.style.transition = ''; card.getBoundingClientRect();   // commit the small state before growing
  const hasImg = !!img.src; if (hasImg) { img.style.opacity = 0; const iw = box.width, ih = iw * 640 / 1024; flyGhost(img.src, from, { x: box.left, y: box.top, w: iw, h: ih }, () => { img.style.opacity = 1; }); }
  [...m.querySelectorAll('.mtext > *')].forEach((el, i) => el.style.setProperty('--i', i)); [...m.querySelectorAll('.mfacts li')].forEach((el, i) => el.style.setProperty('--i', i));
  m.classList.add('on'); document.body.classList.add('modal-open'); setHover(null); obj.userData.hotT = 1; sfx('open'); }

let hovered = null, tipEl, tipTitle, tipBody, tipLock = false;
function setHover(h) {
  if (hovered === h) return;
  if (hovered) { hovered.userData.h.obj.userData.hotT = 0; hovered.userData.h.off && hovered.userData.h.off(); const lk = Object.keys(LINKS).find(k => LINKS[k].includes(hovered)); if (lk) $$(`[data-link="${lk}"]`).forEach(e => e.classList.remove('lit')); }
  hovered = h;
  if (h) { h.userData.h.obj.userData.hotT = 1; h.userData.h.on && h.userData.h.on(); sfx('tick'); const lk = Object.keys(LINKS).find(k => LINKS[k].includes(h)); if (lk) $$(`[data-link="${lk}"]`).forEach(e => e.classList.add('lit')); const t = h.userData.h.tip ? h.userData.h.tip() : null; if (t) { tipTitle.textContent = t.t || ''; tipBody.innerHTML = t.b || ''; tipEl.classList.add('on'); } else tipEl.classList.remove('on'); }
  else tipEl.classList.remove('on');
  document.body.style.cursor = h ? 'pointer' : '';
}
const _v = new THREE.Vector3();
function tipFollow() { if (!hovered) return; const h = hovered.userData.h; hovered.getWorldPosition(_v); _v.y += h.dy; _v.project(cam); const x = (_v.x * .5 + .5) * innerWidth, y = (-_v.y * .5 + .5) * innerHeight; const r = tipEl.getBoundingClientRect(); tipEl.style.left = clamp(x - r.width / 2, 12, innerWidth - r.width - 12) + 'px'; tipEl.style.top = clamp(y - r.height - 18, 12, innerHeight - r.height - 12) + 'px'; }
function pick() {
  raycaster.setFromCamera({ x: mouse.nx, y: mouse.ny }, cam);
  const live = HOV.filter(h => { let o = h; while (o && o.userData._f === undefined) o = o.parent; return o && o.visible && o.userData._f > .25; });
  const hits = raycaster.intersectObjects(live, false);
  setHover(hits.length ? hits[0].object : null);
}

function start(cfg) {
  SEC = cfg.sections; ROOM = cfg.room || 60; HOVER_DEFAULT = cfg.hoverDefault || {};
  C.bg = new THREE.Color('#0B0D12'); C.bone = new THREE.Color('#E9E3D6'); C.ember = new THREE.Color('#E2663A'); C.ok = new THREE.Color('#7FB58A'); C.paper = new THREE.Color('#F2EEE6'); C.mute = new THREE.Color('#6C7280');
  tipEl = $('#tip'); tipTitle = tipEl.querySelector('.t'); tipBody = tipEl.querySelector('.b');
  const secEls = SEC.map(s => $(s.dom));
  // nav, links, veil
  $$('[data-go]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); const i = +a.dataset.go; if (document.body.classList.contains('static')) { secEls[i].scrollIntoView({ behavior: 'smooth' }); return; } const t = (SEC[i].a + (SEC[i].b - SEC[i].a) * (i === 0 ? 0 : (SEC[i].enter ?? .22))) * scrollRange(); scrollTo({ top: t, behavior: 'smooth' }); }));
  absolutizeLinks(); $$('a[data-page]').forEach(a => a.addEventListener('click', e => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return; e.preventDefault(); veilTo(a.getAttribute('href')); }));
  magnet();
  const veil = $('#veil'); if (veil) requestAnimationFrame(() => veil.classList.remove('on'));
  const canvas = $('#gl');
  if (!REDUCE) try { renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' }); if (!renderer.capabilities.isWebGL2) throw 0; } catch (e) { renderer = null; }
  if (!renderer) { document.body.classList.add('static'); cfg.onStatic && cfg.onStatic(); return; }
  THREE.ColorManagement.enabled = false; renderer.outputColorSpace = THREE.LinearSRGBColorSpace; renderer.autoClear = false;
  scene = new THREE.Scene(); scene.fog = new THREE.Fog(C.bg, 26, 95);
  cam = new THREE.PerspectiveCamera(42, 1, .1, 240);
  { const env = new THREE.Scene(); env.add(new THREE.Mesh(new THREE.BoxGeometry(40, 40, 40), new THREE.MeshBasicMaterial({ color: 0x141820, side: THREE.BackSide })));
    const panel = (w, h, x, y, z, ry, rx, col, i) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: col, side: THREE.DoubleSide })); m.position.set(x, y, z); m.rotation.set(rx, ry, 0); m.material.color.multiplyScalar(i); env.add(m); };
    panel(18, 8, 0, 18, 2, 0, Math.PI / 2, 0xFFF2DC, 3.2); panel(10, 14, -19, 4, 0, Math.PI / 2, 0, 0x6FA8DC, 1.6); panel(10, 14, 19, 2, -4, -Math.PI / 2, 0, 0xE9E3D6, 1.3); panel(14, 5, 0, -5, -19, 0, 0, 0xE2663A, .7); panel(30, 30, 0, -19, 0, 0, -Math.PI / 2, 0x0B0D12, 1);
    const pm = new THREE.PMREMGenerator(renderer); scene.environment = pm.fromScene(env, .04).texture; pm.dispose(); }
  scene.add(new THREE.HemisphereLight(0xE9E3D6, 0x1A1E2A, 1.2)); const sun = new THREE.DirectionalLight(0xFFF4E0, 1.8); sun.position.set(6, 10, 8); scene.add(sun); const fill = new THREE.DirectionalLight(0x6FA8DC, .5); fill.position.set(-8, -4, 6); scene.add(fill);
  // ripples: a pool of rings that expand and fade where a hover begins
  RIP = []; for (let i = 0; i < 6; i++) { const r = new THREE.Mesh(new THREE.RingGeometry(.9, 1, 48), new THREE.MeshBasicMaterial({ color: C.bone, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide })); r.userData.t = 2; scene.add(r); RIP.push(r); }
  raycaster = new THREE.Raycaster(); HITMAT = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, colorWrite: false });
  // ambient drift down the whole corridor
  { const n = 2600, a = new Float32Array(n * 3); for (let i = 0; i < n; i++) { a[i * 3] = (R() - .5) * 56; a[i * 3 + 1] = (R() - .5) * 30; a[i * 3 + 2] = -R() * ROOM * SEC.length - 2; } const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(a, 3)); FIELD = new THREE.Points(g, new THREE.PointsMaterial({ color: C.bone, size: .06, transparent: true, opacity: .55, sizeAttenuation: true })); scene.add(FIELD); }
  SPACE = buildSpace(SEC);
  // the rooms
  K = { ss, clamp, lerp, eo, snap, sub, vis, C, PAL, OX, OY, PH0, FINE, FIT, TEXT_RIGHT, R, sfx, mono, cam: null, card, live, label, glow, haze, grid, net, wireBox, wirePlane, slab, solidMat, glassMat, roundedBox, tube, ring, line, segs, bez, vec, lineMat, fillMat, place, hover, fader, fmt, words, scene, mouse, pd: 0, T: 0, q: [], fade: 0, light: null, els: secEls, dark: 0 };
  K.cam = cam; K.scene = scene;
  SEC.forEach((s, i) => { const g = new THREE.Group(); g.position.z = -i * ROOM; scene.add(g); ROOMS[i] = g; s.state = {}; s.build(g, K, s.state); });
  cfg.after && cfg.after(K);
  // camera keys: local per room -> one monotone spline per channel across the page
  const ch = [[], [], [], [], [], []]; let lastP = -1;
  SEC.forEach((s, i) => (s.cam || [[0, 0, 0, 0, 0, 0, -30], [1, 0, 0, -ROOM, 0, 0, -ROOM - 30]]).forEach(k => { const p = s.a + k[0] * (s.b - s.a); if (p - lastP < 1e-4) return; lastP = p; const z0 = -i * ROOM; [k[1], k[2], k[3] + z0, k[4], k[5], k[6] + z0].forEach((v, c) => ch[c].push([p, v])); }));
  const CAM = ch.map(mono);
  // post: grain, vignette, fade to paper
  rt = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 });
  post = new THREE.ShaderMaterial({ uniforms: { tCol: U(null), uRes: U(new THREE.Vector2()), uDpr: U(1), uFade: U(0), uDark: U(0), uDim: U(0), uSpeed: U(0), uT: U(0), uPaper: U(C.paper) },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }`,
    fragmentShader: `uniform sampler2D tCol; uniform vec2 uRes; uniform float uDpr, uFade, uDark, uDim, uSpeed, uT; uniform vec3 uPaper; varying vec2 vUv;
      float h21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
      void main(){ vec3 c = texture2D(tCol, vUv).rgb;
        if (uSpeed > .002) { vec2 d = (vUv - .5); float r = length(d); vec2 dir = d / max(r, 1e-4) * uSpeed * smoothstep(.05, .6, r) * .9; vec3 acc = c; for (int i = 1; i <= 7; i++) { acc += texture2D(tCol, vUv - dir * float(i) / 7.).rgb; } c = acc / 8.; } c = mix(c, vec3(dot(c, vec3(.3, .59, .11))), uDim * .55) * (1. - uDim * .5);
        float g = (h21(floor(vUv * uRes / uDpr) + floor(uT * 24.) * 7.) - .5) * .03; c += g * (1. - uFade * .7);
        // contrast and a little saturation, so the blacks stay black and the colour has body
        c = (c - .5) * 1.16 + .5; float lum = dot(c, vec3(.3, .59, .11)); c = mix(vec3(lum), c, 1.1); c = max(c, 0.);
        float v = smoothstep(1.45, .5, length((vUv - .5) * vec2(uRes.x / uRes.y, 1.) * .95)); c *= mix(.72, 1., v);
        c = mix(c, uPaper + g * .6, uFade); c *= 1. - uDark;
        gl_FragColor = vec4(c, 1.); }`, depthTest: false, depthWrite: false });
  const postScene = new THREE.Scene(); postScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), post)); const postCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  let W = 1, Hh = 1, PIX = 2.4e6, slow = 0, phone = false;
  function resize() { W = innerWidth; Hh = innerHeight; phone = W < 760; renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2, Math.sqrt(PIX / (W * Hh)))); const d = renderer.getPixelRatio(); renderer.setSize(W, Hh, false); rt.setSize(W * d, Hh * d); post.uniforms.uRes.value.set(W * d, Hh * d); post.uniforms.uDpr.value = d; cam.aspect = W / Hh; cam.fov = phone ? 60 : 42; cam.updateProjectionMatrix(); }
  addEventListener('resize', resize); resize();
  // pointer
  addEventListener('pointermove', e => { mouse.tx = (e.clientX / W - .5) * 2; mouse.ty = (e.clientY / Hh - .5) * 2; mouse.nx = mouse.tx; mouse.ny = -mouse.ty; mouse.moved = true; }, { passive: true });
  addEventListener('pointerdown', e => { if (document.body.classList.contains('modal-open') || e.target.closest('a, button, .dcard, .tip, #modal')) return; mouse.nx = (e.clientX / W - .5) * 2; mouse.ny = -(e.clientY / Hh - .5) * 2; mouse.down = e; }, { passive: true });
  // progress
  const progress = () => PIN !== null ? PIN : clamp(scrollY / Math.max(1, scrollRange()));
  let FOCUS = null; if (location.hash) { const [hn, hf] = location.hash.slice(1).split(':'); const i = SEC.findIndex(s => s.name === hn); if (i > 0) scrollTo(0, (SEC[i].a + (SEC[i].b - SEC[i].a) * (SEC[i].rest ?? .45)) * scrollRange()); if (hf) FOCUS = hf; }
  if (FOCUS) { const hit = HOV.find(h => h.userData.id === FOCUS); if (hit) { setTimeout(() => { hit.userData.h.obj.userData.hotT = 1; setTimeout(() => { if (hovered !== hit) hit.userData.h.obj.userData.hotT = 0; }, 3200); }, 900); } }
  linkDom();
  $$('.autobtn').forEach(b => b.addEventListener('click', e => { e.preventDefault(); if (AUTO) stopAuto(); else { scrollTo(0, 0); setTimeout(() => autoplay(), 200); } }));
  if (Q.has('auto') && PIN === null) setTimeout(() => autoplay(+Q.get('auto') || undefined), 800);
  addEventListener('wheel', () => stopAuto(), { passive: true }); addEventListener('touchstart', () => stopAuto(), { passive: true });
  let pd = progress(), last = performance.now(), t0 = last, pickN = 0;
  // light snapping: when scrolling stops near a room's rest point, ease the page to it (never while the hand is still moving)
  let snapT = null, snapAnim = null, lastScrollY = scrollY, lastScrollAt = performance.now(), userMoving = false;
  const restOf = s => s.a + (s.b - s.a) * (s.rest ?? .45);
  function trySnap() { return;   // section snapping was removed (Ray, 26 Oct): it did not feel right
    if (PIN !== null || document.body.classList.contains('static') || document.body.classList.contains('modal-open')) return; const p = progress(), rng = scrollRange(); let best = null; SEC.forEach((s, i) => { const r = i === 0 ? 0 : restOf(s); const span = (s.b - s.a); if (Math.abs(p - r) < span * .34 && (best === null || Math.abs(p - r) < Math.abs(p - best))) best = r; }); if (best === null || Math.abs(best - p) < .0015) return; const from = scrollY, to = best * rng, t0s = performance.now(), dur = 650; cancelAnimationFrame(snapAnim); const step = now => { if (userMoving) return; const t = clamp((now - t0s) / dur); const e = 1 - Math.pow(1 - t, 3); scrollTo(0, from + (to - from) * e); if (t < 1) snapAnim = requestAnimationFrame(step); }; snapAnim = requestAnimationFrame(step); }
  const armSnap = () => { clearTimeout(snapT); snapT = setTimeout(() => { userMoving = false; trySnap(); }, 260); };
  addEventListener('wheel', () => { userMoving = true; cancelAnimationFrame(snapAnim); armSnap(); }, { passive: true });
  addEventListener('touchstart', () => { userMoving = true; cancelAnimationFrame(snapAnim); }, { passive: true });
  addEventListener('touchend', () => { armSnap(); }, { passive: true });
  addEventListener('keydown', e => { if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' '].includes(e.key)) { userMoving = true; cancelAnimationFrame(snapAnim); armSnap(); } });
  const bar = $('#bar'), prog = $('#prog'), scrimL = $('#scrimL'), scrimC = $('#scrimC');
  if (scrimL) scrimL.style.width = Math.round(TEXT_RIGHT + Math.min(260, innerWidth * .18)) + 'px';
  let shiftNow = 0, dimNow = 0;
  const fwd = new THREE.Vector3(), rel = new THREE.Vector3(), _tmpA = new THREE.Vector3(), _tmpB = new THREE.Vector3();
  function frame(now) {
    const dt = Math.min(.05, (now - last) / 1000); last = now; const T = (now - t0) / 1000;
    const p = K.freeze ? pd : progress(); const pPrev = pd;
    pd = PIN !== null ? p : AUTO && AUTO.p !== undefined ? AUTO.p : pd + (p - pd) * (1 - Math.exp(-dt * (phone ? 5 : 7.5)));
    mouse.x += (mouse.tx - mouse.x) * (1 - Math.exp(-dt * 4)); mouse.y += (mouse.ty - mouse.y) * (1 - Math.exp(-dt * 4));
    const q = SEC.map(s => clamp((pd - s.a) / (s.b - s.a)));
    K.pd = pd; K.T = T; K.q = q; K.dt = dt; REDRAW_N = 0;
    // the camera: the spline, plus the mouse — or, inside a level, a locked target it glides to
    const px = FINE ? mouse.x * .6 : 0, py = FINE ? -mouse.y * .4 : 0;
    if (!K._camPos) { K._camPos = new THREE.Vector3(); K._camLook = new THREE.Vector3(); }
    const tp = K.camLock ? K.camLock.pos : _tmpA.set(CAM[0](pd), CAM[1](pd), CAM[2](pd)), tl = K.camLock ? K.camLock.look : _tmpB.set(CAM[3](pd), CAM[4](pd), CAM[5](pd));
    const kk = K.camLock || K._wasLock ? 1 - Math.exp(-dt * 3.2) : 1; K._camPos.lerp(tp, kk); K._camLook.lerp(tl, kk); if (!K.camLock && K._camPos.distanceTo(tp) < .02) K._wasLock = false;
    cam.position.set(K._camPos.x + px * (K.camLock ? .25 : 1), K._camPos.y + py * (K.camLock ? .2 : 1), K._camPos.z);
    cam.lookAt(K._camLook.x + px * .4, K._camLook.y + py * .4, K._camLook.z);
    cam.getWorldDirection(fwd);
    // everything fades as the camera reaches it
    for (const f of FADERS) { f.g.getWorldPosition(rel); rel.sub(cam.position); const d = rel.dot(fwd); const a = ss(.7, 3.2, d); f.g.userData._f = a; for (const m of f.mats) m.m.opacity = m.base * a; f.g.visible = a > .002 && d < 150; }
    updateSpace(SPACE, T, pd, q, K.fade, mouse);
    FIELD.material.opacity = .55 * (1 - K.fade); FIELD.rotation.z = Math.sin(T * .05) * .02; FIELD.position.y = Math.sin(T * .2) * .3;
    // hover
    if (document.body.classList.contains('modal-open')) { mouse.moved = false; mouse.down = null; } else if ((mouse.moved && FINE && (pickN++ % 2 === 0)) || mouse.down) { pick(); mouse.moved = false; if (mouse.down) { if (hovered) { const hh = hovered.userData.h; if (hh.click) hh.click(); else if (hh.meta || hh.obj.userData.screen || HOVER_DEFAULT.industry) openModal(hh, hovered); } mouse.down = null; } }
    K.hovered = hovered;
    for (const h of HOV) { const u = h.userData.h.obj.userData; u.hot += (u.hotT - u.hot) * (1 - Math.exp(-dt * 9)); if (u.screen) live(h.userData.h.obj, u.hot, T, mouse.x, mouse.y); }
    for (const r of RIP) { if (r.userData.t < 1) { r.userData.t += dt * 1.4; const t = r.userData.t; r.scale.setScalar(.3 + t * 1.6); r.material.opacity = (1 - t) * .7; } else r.material.opacity = 0; }
    tipFollow();
    // the rooms
    SEC.forEach((s, i) => { const el = secEls[i]; const f = s.fade || [.05, .18, .86, .98]; if (el && !s.selfDom) { const v = i === 0 ? 1 - ss(.3, .75, q[0]) : vis(q[i], ...f); el.style.opacity = v; el.style.transform = `translateY(${(1 - ss(f[0], f[1], q[i])) * 24 - ss(f[2], f[3], q[i]) * 24}px)`; } s.update && s.update(q[i], K, s.state, el); });
    secEls.forEach(el => { if (!el) return; const on = +el.style.opacity > .5; if (on && !el.classList.contains('on')) { el.classList.add('arrive'); clearTimeout(el._arr); el._arr = setTimeout(() => el.classList.remove('arrive'), 1800); } el.classList.toggle('on', on); });
    document.body.classList.toggle('light', K.fade > .5);
    if (bar) { bar.classList.toggle('show', pd > .07 && K.fade < .3); prog.style.transform = `scaleX(${pd})`; }
    // shift the picture into the free area beside the text (or above it on phones), and fade the scrims with the sections
    let want = 0, wantL = 0, wantC = 0; SEC.forEach((s, i) => { const v = i === 0 ? 1 - ss(.3, .75, q[i]) : vis(q[i], ...(s.fade || [.05, .18, .86, .98])); const sh = s.shift ?? 1; want = Math.max(want, v * sh); const sc = s.scrim ?? (sh ? 'left' : 'center'); if (sc === 'left') wantL = Math.max(wantL, v); if (sc === 'center') wantC = Math.max(wantC, v); });
    shiftNow += (want - shiftNow) * (1 - Math.exp(-dt * 6));
    if (PH0) cam.setViewOffset(W, Hh, 0, Math.round(Hh * .16 * shiftNow), W, Hh); else cam.setViewOffset(W, Hh, -Math.round(TEXT_RIGHT * .5 * shiftNow), 0, W, Hh);
    if (scrimL) scrimL.style.opacity = wantL * (1 - K.fade); if (scrimC) scrimC.style.opacity = wantC * (1 - K.fade);
    cfg.onFrame && cfg.onFrame(K); window.__cam = cam;
    // render
    dimNow += ((document.body.classList.contains('modal-open') ? 1 : 0) - dimNow) * (1 - Math.exp(-dt * 7)); post.uniforms.uDim.value = dimNow;
    SPEED = 0; post.uniforms.uSpeed.value = 0;   // the scroll-speed blur and nebula stretch were rejected (Ray, 26 Oct): movement stays clean
    post.uniforms.uT.value = T; post.uniforms.uFade.value = K.fade; post.uniforms.uDark.value = K.dark;
    renderer.setRenderTarget(rt); renderer.setClearColor(C.bg, 1); renderer.clear(); renderer.render(scene, cam);
    post.uniforms.tCol.value = rt.texture; renderer.setRenderTarget(null); renderer.clear(); renderer.render(postScene, postCam);
    const ft = performance.now() - now; if (ft > 26) { if (++slow > 40 && PIX > .9e6) { PIX *= .75; slow = 0; resize(); } } else slow = Math.max(0, slow - 1);
    requestAnimationFrame(frame);
  }
  document.fonts.ready.then(() => requestAnimationFrame(frame));
}
return { start, ss, clamp, lerp, eo, snap, sub, vis, words, magnet, veilTo, openModal, closeModal, sfx, sfxToggle, autoplay, stopAuto, mono, OX, OY, PH0, FINE, PIN, FIT, TEXT_RIGHT };
})();
