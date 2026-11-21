/* ProSim Virtual Oscilloscope — محاكاة جهاز حقيقي (4 قنوات، trigger، cursors، FFT، Bode، Phase) */
(function () {
'use strict';
const CH_NAME = ['A', 'B', 'C', 'D'], CH_COL = ['#facc15', '#38bdf8', '#f87171', '#4ade80'];
const mk = (lo, hi) => { const o = []; for (let e = lo; e <= hi; e++) [1, 2, 5].forEach(m => o.push(Number((m * Math.pow(10, e)).toPrecision(3)))); return o; };
const VLAD = mk(-3, 2).concat([1000]), TLAD = mk(-6, 0).concat([10]);
const S = { mode: 'time', running: true, single: false, frozen: null, tdiv: 5e-3, hshift: 0, tnth: 0, lastLeft: null, math: 'off', needBode: false, sig: '',
  ch: CH_NAME.map((n, i) => ({ src: 'none', vdiv: 5, pos: 0, coup: 'DC', inv: false })),
  trig: { src: 0, level: 0, edge: 'rise', mode: 'AUTO' }, cur: { on: false, x: [2, 6], y: [2, -2] }, live: null, tm: null, busy: false, again: false };
let el = {}, cv = null, cx = null, W = 600, H = 300, drag = null, liveItems = [];

function fmt(v, u) { if (!isFinite(v)) return '—'; if (v === 0) return '0 ' + u; const a = Math.abs(v);
  for (const [m, p] of [[1e9, 'G'], [1e6, 'M'], [1e3, 'k'], [1, ''], [1e-3, 'm'], [1e-6, 'µ'], [1e-9, 'n']]) if (a >= m * 0.9995) { let s = (v / m); s = Math.abs(s) >= 100 ? s.toFixed(0) : Math.abs(s) >= 10 ? s.toFixed(1) : s.toFixed(2); if (s.includes('.')) s = s.replace(/\.?0+$/, ''); return s + ' ' + p + u; }
  return v.toExponential(1) + ' ' + u; }
const step = (lad, v, dir) => { let i = lad.findIndex(x => x >= v * 0.999); if (i < 0) i = lad.length - 1; return lad[Math.max(0, Math.min(lad.length - 1, i + dir))]; };

/* ---------- بيانات المحاكاة ---------- */
const SD = () => S.frozen || (typeof simData !== 'undefined' ? simData : null);
const T = () => { const s = SD(); return s && s.data && s.data.times ? s.data.times : []; };
const recLen = () => { const t = T(); return t.length ? t[t.length - 1] : 0; };
const recDt = () => { const t = T(); return t.length > 1 ? (t[t.length - 1] - t[0]) / (t.length - 1) : 1; };
function sources() { const s = SD(); if (!s || !s.data || !s.data.voltages) return S.srcCache || [];
  const out = [{ k: 'none', l: '— none —' }]; (s.net.probeMap || []).forEach((p, i) => out.push({ k: 'p:' + i, l: '● ' + p.label })); s.data.voltages.forEach((_, i) => out.push({ k: 'n:' + (i + 1), l: 'Node ' + (i + 1) })); S.srcCache = out; return out; }
function series(src) { const s = SD(); if (!s || !s.data || !s.data.voltages || !src || src === 'none') return null; const d = s.data, n = T().length; const z = () => new Array(n).fill(0);
  if (src[0] === 'p') { const p = (s.net.probeMap || [])[+src.slice(2)]; if (!p) return null; return { y: p.node === 0 ? z() : (d.voltages[p.node - 1] || z()), label: p.label }; }
  if (src[0] === 'n') { const k = +src.slice(2); return { y: d.voltages[k - 1] || z(), label: 'Node ' + k }; } return null; }
const mean = a => { let s = 0; for (let i = 0; i < a.length; i++) s += a[i]; return a.length ? s / a.length : 0; };
function chData(i) { const c = S.ch[i], s = series(c.src); if (!s || c.coup === 'OFF') return null; let y = s.y;
  if (c.coup === 'GND') y = new Array(y.length).fill(0); else if (c.coup === 'AC') { const m = mean(y); y = y.map(v => v - m); }
  if (c.inv) y = y.map(v => -v); return { t: T(), y, label: s.label, c }; }

/* ---------- قياسات ---------- */
function crossings(t, y, lvl, rising) { const out = []; for (let i = 1; i < y.length; i++) { const a = y[i - 1] - lvl, b = y[i] - lvl; if (rising ? (a < 0 && b >= 0) : (a > 0 && b <= 0)) out.push(t[i - 1] + (t[i] - t[i - 1]) * (-a / ((b - a) || 1e-30))); } return out; }
function range(t, l, r) { const n = t.length; if (!n) return [0, 0]; const dt = (t[n - 1] - t[0]) / Math.max(1, n - 1) || 1; return [Math.max(0, Math.min(n - 1, Math.floor((l - t[0]) / dt))), Math.max(0, Math.min(n, Math.ceil((r - t[0]) / dt) + 1))]; }
function measure(d, l, r) { const [i0, i1] = range(d.t, l, r); const y = d.y.slice(i0, Math.max(i0 + 2, i1)), t = d.t.slice(i0, Math.max(i0 + 2, i1)); if (y.length < 2) return null;
  let mx = -Infinity, mn = Infinity, s = 0, s2 = 0; for (const v of y) { if (v > mx) mx = v; if (v < mn) mn = v; s += v; s2 += v * v; } const avg = s / y.length, rms = Math.sqrt(s2 / y.length), mid = (mx + mn) / 2;
  const cr = crossings(t, y, mid, true); let per = null; if (cr.length >= 2) per = (cr[cr.length - 1] - cr[0]) / (cr.length - 1);
  let duty = null; if (per) { let hi = 0; for (const v of y) if (v > mid) hi++; duty = hi / y.length * 100; }
  return { vmax: mx, vmin: mn, vpp: mx - mn, avg, rms, per, freq: per ? 1 / per : null, duty, cr, mid }; }
function dft(t, y, f, t0, nper) { let re = 0, im = 0, n = 0; const t1 = t0 + nper / f; for (let i = 0; i < t.length; i++) { if (t[i] < t0 || t[i] >= t1) continue; const a = 2 * Math.PI * f * t[i]; re += y[i] * Math.cos(a); im -= y[i] * Math.sin(a); n++; } if (!n) return null; return { amp: 2 * Math.hypot(re, im) / n, ph: Math.atan2(im, re) * 180 / Math.PI }; }

/* ---------- الواجهة ---------- */
function css() { if (document.getElementById('psStyle')) return; const st = document.createElement('style'); st.id = 'psStyle'; st.textContent = `
#proScope{position:fixed;z-index:9000;right:1vw;top:6vh;width:min(780px,60vw);height:min(88vh,860px);background:linear-gradient(#1b2433,#0e1420);border:2px solid #475569;border-radius:12px;display:none;flex-direction:column;box-shadow:0 24px 70px #000d;resize:both;overflow:hidden;min-width:340px;min-height:360px;direction:ltr;font-family:system-ui,sans-serif;color:#e2e8f0}
#proScope .ps-bar{display:flex;align-items:center;gap:6px;padding:5px 8px;background:#0a101c;cursor:move;user-select:none;flex-wrap:wrap;border-bottom:1px solid #334155}
#proScope .ps-bar b{color:#4ade80;font-size:13px;margin-right:auto}
#proScope button,#proScope select,#proScope input{font:inherit;font-size:11px}
#proScope .pb{background:#243049;color:#e2e8f0;border:1px solid #3b4a66;border-radius:5px;padding:3px 8px;cursor:pointer}#proScope .pb:hover{background:#2f3f5f}#proScope .pb.on{background:#0369a1;border-color:#38bdf8;color:#fff}#proScope .pb.red{background:#7f1d1d;border-color:#b91c1c}
#proScope .ps-body{flex:1;display:flex;flex-direction:column;min-height:0}
#proScope canvas#psCv{width:100%;flex:1 1 55%;min-height:170px;background:#000;touch-action:none;display:block;border-bottom:3px solid #0f172a}
#proScope .ps-foot{padding:3px 8px;font:11px ui-monospace,monospace;background:#05080f;color:#a7f3d0;white-space:pre-wrap;min-height:28px;max-height:54px;overflow:auto}
#proScope .ps-ctrl{flex:0 1 auto;max-height:46%;overflow:auto;padding:6px;display:grid;grid-template-columns:repeat(auto-fit,minmax(172px,1fr));gap:6px;background:#111a29}
#proScope .grp{border:1px solid #334155;border-radius:8px;padding:5px 6px;background:linear-gradient(#162033,#0f1726)}#proScope .grp h4{margin:0 0 4px;font-size:11px;display:flex;justify-content:space-between;align-items:center;letter-spacing:.5px}
#proScope .grp.wide{grid-column:span 2}#proScope .grp.full{grid-column:1/-1}
#proScope .row{display:flex;gap:5px;align-items:center;margin:3px 0;flex-wrap:wrap;justify-content:center}
#proScope select{background:#1e293b;color:#e2e8f0;border:1px solid #3b4a66;border-radius:4px;max-width:100%;width:100%}
#proScope .kn{display:flex;flex-direction:column;align-items:center;gap:2px;min-width:62px}
#proScope .knob{width:46px;height:46px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#64748b,#1e293b 62%,#0b1220);border:2px solid #0b1220;box-shadow:0 2px 6px #000a,inset 0 1px 2px #94a3b855;position:relative;cursor:ns-resize;touch-action:none}
#proScope .knob::after{content:"";position:absolute;left:50%;top:4px;width:3px;height:14px;margin-left:-1.5px;background:var(--kc,#facc15);border-radius:2px;transform-origin:50% 19px;transform:rotate(var(--a,0deg))}
#proScope .kl{font:10px ui-monospace,monospace;color:#cbd5e1;text-align:center;line-height:1.1}#proScope .kt{font-size:9px;color:#8696ad}
#proScope table{width:100%;border-collapse:collapse;font-size:10.5px;font-family:ui-monospace,monospace}#proScope td,#proScope th{border:1px solid #1e293b;padding:2px 5px;text-align:right}#proScope th{color:#94a3b8;font-weight:normal}
@media(max-width:700px){#proScope{left:0;top:0;right:0;width:100vw;height:100vh;border-radius:0}#proScope .grp.wide{grid-column:1/-1}}`; document.head.appendChild(st); }

const knobHTML = (id, cap, col) => `<div class="kn"><div class="knob" data-knob="${id}" style="--kc:${col || '#facc15'}"></div><div class="kl" id="kl_${id.replace(':', '_')}"></div><div class="kt">${cap}</div></div>`;

function build() {
  if (el.root) return; css(); const r = document.createElement('div'); r.id = 'proScope';
  const tabs = [['time', 'DSO'], ['xy', 'XY'], ['logic', 'Logic'], ['fft', 'FFT'], ['bode', 'Bode'], ['motor', 'Motor']].map(([k, n]) => `<button class="pb" data-mode="${k}">${n}</button>`).join('');
  const chBox = CH_NAME.map((n, i) => `<div class="grp" style="border-color:${CH_COL[i]}88"><h4 style="color:${CH_COL[i]}">CHANNEL ${n}<b id="vd${i}" style="font-weight:normal;color:#e2e8f0"></b></h4>
    <div class="row"><select data-src="${i}"></select></div>
    <div class="row">${knobHTML('vd:' + i, 'VOLTS/DIV', CH_COL[i])}${knobHTML('pos:' + i, 'POSITION', CH_COL[i])}</div>
    <div class="row"><button class="pb" data-coup="${i}:AC">AC</button><button class="pb" data-coup="${i}:DC">DC</button><button class="pb" data-coup="${i}:GND">GND</button><button class="pb" data-coup="${i}:OFF">OFF</button><button class="pb" data-inv="${i}">INV</button></div></div>`).join('');
  r.innerHTML = `<div class="ps-bar" id="psBar"><b>🖥 ProSim Virtual Oscilloscope</b>${tabs}<button class="pb" data-act="run" id="psRun">⏵ RUN</button><button class="pb" data-act="single">SINGLE</button><button class="pb" data-act="auto">AUTOSET</button><button class="pb red" data-act="close">✖</button></div>
  <div class="ps-body"><canvas id="psCv"></canvas><div class="ps-foot" id="psFoot"></div>
  <div class="ps-ctrl" id="psSide">
   ${chBox}
   <div class="grp"><h4>HORIZONTAL<b id="psTd" style="font-weight:normal"></b></h4>
    <div class="row">${knobHTML('td', 'TIME/DIV', '#4ade80')}${knobHTML('hp', 'H-POSITION', '#4ade80')}</div>
    <div class="row"><button class="pb" data-act="td-">▼</button><button class="pb" data-act="td+">▲</button><button class="pb" data-act="extend" title="يعيد المحاكاة لتغطية النافذة">↻ Re-sim</button></div></div>
   <div class="grp"><h4>TRIGGER<span id="psTrigSt" style="color:#22c55e"></span></h4>
    <div class="row">${knobHTML('tl', 'LEVEL', '#fb923c')}<div><div class="row" style="margin:0"><button class="pb" data-tsrc="0" style="color:${CH_COL[0]}">A</button><button class="pb" data-tsrc="1" style="color:${CH_COL[1]}">B</button><button class="pb" data-tsrc="2" style="color:${CH_COL[2]}">C</button><button class="pb" data-tsrc="3" style="color:${CH_COL[3]}">D</button></div>
     <div class="row" style="margin:2px 0"><button class="pb" data-edge="rise">↗</button><button class="pb" data-edge="fall">↘</button><button class="pb" data-act="nextTrig">⏭</button></div></div></div>
    <div class="row"><button class="pb" data-tm="AUTO">AUTO</button><button class="pb" data-tm="NORM">NORM</button><button class="pb" data-act="single">1-SHOT</button></div></div>
   <div class="grp"><h4>CURSORS & MATH</h4><div class="row"><button class="pb" id="psCur" data-act="cur">Cursors</button></div><div class="row"><select id="psMath"><option value="off">Math: off</option><option value="A+B">A + B</option><option value="A-B">A − B</option><option value="A*B">A × B (power)</option></select></div></div>
   <div class="grp"><h4>LIVE TUNE <span style="font-weight:normal;color:#94a3b8">يعيد المحاكاة</span></h4><div class="row"><select id="psLc"></select></div><div class="row"><input type="range" id="psLs" min="0" max="1000" step="any" style="width:100%"><b id="psLv" style="font-size:10px"></b></div></div>
   <div class="grp wide"><h4>MEASUREMENTS</h4><div id="psMeas"></div></div>
   <div class="grp wide"><h4>PHASE ANGLE (Δφ) & PHASORS</h4><div class="row" style="justify-content:flex-start;align-items:flex-start"><div id="psPh" style="flex:1;min-width:150px"></div><canvas id="psPhasor" width="240" height="150" style="width:160px;height:100px;flex:none;border-radius:6px;min-height:0;background:#030b06"></canvas></div></div>
  </div></div>`;
  document.body.appendChild(r); el.root = r; cv = r.querySelector('#psCv'); cx = cv.getContext('2d'); wire(); }

/* مقابض دوّارة: stepped (سلالم 1-2-5) أو continuous */
const KNOBS = {
  vd: i => ({ kind: 'step', lad: VLAD, get: () => S.ch[i].vdiv, set: v => { S.ch[i].vdiv = v; }, lab: () => fmt(S.ch[i].vdiv, 'V') + '/div' }),
  pos: i => ({ kind: 'cont', min: -5, max: 5, get: () => S.ch[i].pos, set: v => { S.ch[i].pos = Math.round(v * 20) / 20; }, lab: () => S.ch[i].pos.toFixed(2) + ' div', reset: 0 }),
  td: () => ({ kind: 'step', lad: TLAD, get: () => S.tdiv, set: v => { S.tdiv = v; needWindow(); }, lab: () => fmt(S.tdiv, 's') + '/div' }),
  hp: () => ({ kind: 'cont', min: 0, max: 1, get: () => { const L = recLen(); return L > 10 * S.tdiv ? S.hshift / (L - 10 * S.tdiv) : 0; }, set: v => { const L = recLen(); S.hshift = v * Math.max(0, L - 10 * S.tdiv); S.tnth = 0; }, lab: () => fmt(S.hshift, 's'), reset: 0 }),
  tl: () => ({ kind: 'cont', get min() { return -5 * S.ch[S.trig.src].vdiv; }, get max() { return 5 * S.ch[S.trig.src].vdiv; }, get: () => S.trig.level, set: v => { S.trig.level = v; }, lab: () => S.trig.level.toFixed(2) + ' V', reset: 0 })
};
function knobCfg(id) { const [k, i] = id.split(':'); return KNOBS[k](+i); }
function knobSync(r) { r.querySelectorAll('[data-knob]').forEach(k => { const c = knobCfg(k.dataset.knob); let t;
  if (c.kind === 'step') { const idx = Math.max(0, c.lad.findIndex(x => x >= c.get() * 0.999)); t = idx / (c.lad.length - 1); } else t = (c.get() - c.min) / (c.max - c.min);
  k.style.setProperty('--a', (-135 + 270 * Math.max(0, Math.min(1, t))) + 'deg'); const l = r.querySelector('#kl_' + k.dataset.knob.replace(':', '_')); if (l) l.textContent = c.lab(); }); }
function initKnobs(r) {
  r.querySelectorAll('[data-knob]').forEach(k => { const id = k.dataset.knob; let st = null;
    const apply = (dy) => { const c = knobCfg(id); if (c.kind === 'step') { const idx = Math.max(0, c.lad.findIndex(x => x >= st.v * 0.999)); const ni = Math.max(0, Math.min(c.lad.length - 1, idx + Math.round(dy / 18))); c.set(c.lad[ni]); } else c.set(Math.max(c.min, Math.min(c.max, st.v + dy / 140 * (c.max - c.min)))); knobSync(r); draw(); };
    k.addEventListener('pointerdown', e => { st = { y: e.clientY, v: knobCfg(id).get() }; k.setPointerCapture(e.pointerId); e.preventDefault(); });
    k.addEventListener('pointermove', e => { if (st) apply(st.y - e.clientY); }); k.addEventListener('pointerup', () => { st = null; });
    k.addEventListener('wheel', e => { e.preventDefault(); const c = knobCfg(id), dir = e.deltaY < 0 ? 1 : -1; if (c.kind === 'step') { const idx = Math.max(0, c.lad.findIndex(x => x >= c.get() * 0.999)); c.set(c.lad[Math.max(0, Math.min(c.lad.length - 1, idx + dir))]); } else c.set(Math.max(c.min, Math.min(c.max, c.get() + dir * (c.max - c.min) / 40))); knobSync(r); draw(); }, { passive: false });
    k.addEventListener('dblclick', () => { const c = knobCfg(id); if (c.reset !== undefined) { c.set(c.reset); knobSync(r); draw(); } }); }); }

function wire() {
  const r = el.root, bar = r.querySelector('#psBar');
  bar.addEventListener('pointerdown', e => { if (e.target.closest('button')) return; const rc = r.getBoundingClientRect(); r.style.right = 'auto'; r.style.left = rc.left + 'px'; drag = { dx: e.clientX - rc.left, dy: e.clientY - rc.top, w: 1 }; bar.setPointerCapture(e.pointerId); });
  bar.addEventListener('pointermove', e => { if (drag && drag.w) { r.style.left = Math.max(0, e.clientX - drag.dx) + 'px'; r.style.top = Math.max(0, e.clientY - drag.dy) + 'px'; } });
  bar.addEventListener('pointerup', () => { drag = null; });
  r.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const d = b.dataset;
    if (d.mode) { S.mode = d.mode; if (typeof scopeMode !== 'undefined') scopeMode = d.mode === 'bode' ? 'bode' : 'time'; S.frozen = null; if (d.mode === 'bode' || S.needBode) { S.needBode = d.mode === 'bode'; rerun(true); } }
    if (d.coup) { const [k, v] = d.coup.split(':'); S.ch[+k].coup = v; }
    if (d.inv !== undefined) S.ch[+d.inv].inv = !S.ch[+d.inv].inv;
    if (d.tsrc !== undefined) S.trig.src = +d.tsrc;
    if (d.edge) S.trig.edge = d.edge; if (d.tm) S.trig.mode = d.tm;
    const A = { 'td+': () => { S.tdiv = step(TLAD, S.tdiv, 1); needWindow(); }, 'td-': () => { S.tdiv = step(TLAD, S.tdiv, -1); needWindow(); },
      run: () => { S.running = !S.running; if (S.running) { S.frozen = null; rerun(true); } else S.frozen = typeof simData !== 'undefined' ? simData : null; },
      single: () => { S.single = true; S.running = true; S.frozen = null; rerun(true); },
      auto: autoset, close: () => { r.style.display = 'none'; }, cur: () => { S.cur.on = !S.cur.on; }, extend: () => needWindow(true), nextTrig: () => { S.tnth++; } };
    if (d.act && A[d.act]) A[d.act](); refreshUI(); draw(); });
  r.querySelectorAll('[data-src]').forEach(s => s.addEventListener('change', () => { S.ch[+s.dataset.src].src = s.value; if (s.value !== 'none' && S.ch[+s.dataset.src].coup === 'OFF') S.ch[+s.dataset.src].coup = 'DC'; refreshUI(); draw(); }));
  r.querySelector('#psMath').addEventListener('change', e => { S.math = e.target.value; draw(); });
  r.querySelector('#psLc').addEventListener('change', e => { setupLive(e.target.value); });
  r.querySelector('#psLs').addEventListener('input', e => liveSet(+e.target.value));
  initKnobs(r);
  cv.addEventListener('wheel', e => { e.preventDefault(); S.tdiv = step(TLAD, S.tdiv, e.deltaY < 0 ? -1 : 1); needWindow(); refreshUI(); draw(); }, { passive: false });
  const pos = e => { const rc = cv.getBoundingClientRect(); return { x: (e.clientX - rc.left) * W / rc.width, y: (e.clientY - rc.top) * H / rc.height }; };
  cv.addEventListener('pointerdown', e => { const p = pos(e), g = geom(); let best = null, bd = 12;
    if (S.cur.on) { S.cur.x.forEach((v, k) => { const dd = Math.abs(g.x0 + v * g.dx - p.x); if (dd < bd) { bd = dd; best = { t: 'x', k }; } }); S.cur.y.forEach((v, k) => { const dd = Math.abs(g.y0 + g.h / 2 - v * g.dy - p.y); if (dd < bd) { bd = dd; best = { t: 'y', k }; } }); }
    drag = best ? { cur: best } : { pan: p.x, h0: S.hshift }; cv.setPointerCapture(e.pointerId); });
  cv.addEventListener('pointermove', e => { if (!drag) return; const p = pos(e), g = geom();
    if (drag.cur) { if (drag.cur.t === 'x') S.cur.x[drag.cur.k] = Math.min(10, Math.max(0, (p.x - g.x0) / g.dx)); else S.cur.y[drag.cur.k] = (g.y0 + g.h / 2 - p.y) / g.dy; draw(); }
    else if (drag.pan !== undefined) { S.hshift = Math.max(0, Math.min(Math.max(0, recLen() - 10 * S.tdiv), drag.h0 - (p.x - drag.pan) / g.dx * S.tdiv)); knobSync(r); draw(); } });
  cv.addEventListener('pointerup', () => { drag = null; });
  new ResizeObserver(() => draw()).observe(r); }

/* ---------- الرسم ---------- */
function geom() { const m = 8; const w = W - 2 * m, h = H - 2 * m; return { x0: m, y0: m, w, h, dx: w / 10, dy: h / 8 }; }
function grid(g) { cx.fillStyle = '#030b06'; cx.fillRect(0, 0, W, H); cx.lineWidth = 1; cx.strokeStyle = '#12301f';
  for (let i = 0; i <= 10; i++) { cx.beginPath(); cx.moveTo(g.x0 + i * g.dx, g.y0); cx.lineTo(g.x0 + i * g.dx, g.y0 + g.h); cx.stroke(); }
  for (let j = 0; j <= 8; j++) { cx.beginPath(); cx.moveTo(g.x0, g.y0 + j * g.dy); cx.lineTo(g.x0 + g.w, g.y0 + j * g.dy); cx.stroke(); }
  cx.strokeStyle = '#2a6a45'; cx.lineWidth = 1.4; cx.beginPath(); cx.moveTo(g.x0, g.y0 + g.h / 2); cx.lineTo(g.x0 + g.w, g.y0 + g.h / 2); cx.moveTo(g.x0 + g.w / 2, g.y0); cx.lineTo(g.x0 + g.w / 2, g.y0 + g.h); cx.stroke();
  cx.strokeStyle = '#1d4a31'; cx.lineWidth = 1; cx.beginPath();
  for (let i = 0; i < 50; i++) { const x = g.x0 + i * g.dx / 5, y = g.y0 + g.h / 2; cx.moveTo(x, y - 3); cx.lineTo(x, y + 3); }
  for (let j = 0; j < 40; j++) { const y = g.y0 + j * g.dy / 5, x = g.x0 + g.w / 2; cx.moveTo(x - 3, y); cx.lineTo(x + 3, y); } cx.stroke();
  cx.strokeStyle = '#2a6a45'; cx.lineWidth = 1.5; cx.strokeRect(g.x0, g.y0, g.w, g.h); }

function plot(t, y, l, r, g, yf, col, width) { const n = t.length; if (n < 2) return; const dt = (t[n - 1] - t[0]) / (n - 1) || 1; const i0 = Math.max(0, Math.floor((l - t[0]) / dt) - 1); let i1 = Math.min(n - 1, Math.ceil((r - t[0]) / dt) + 1); if (window.__playT !== undefined) i1 = Math.min(i1, Math.floor((window.__playT - t[0]) / dt)); if (i1 <= i0) return;
  const xf = tt => g.x0 + (tt - l) / (r - l) * g.w; cx.save(); cx.beginPath(); cx.rect(g.x0, g.y0, g.w, g.h); cx.clip(); cx.strokeStyle = col; cx.lineWidth = width || 1.8; cx.lineJoin = 'round'; cx.shadowColor = col; cx.shadowBlur = 4; cx.beginPath();
  const per = g.w / (r - l) * dt; // px per sample
  if (per >= 0.7) { for (let i = i0; i <= i1; i++) { const x = xf(t[i]), yy = yf(y[i]); i === i0 ? cx.moveTo(x, yy) : cx.lineTo(x, yy); } }
  else { let col0 = null, lo = 0, hi = 0, first = true; for (let i = i0; i <= i1; i++) { const x = Math.round(xf(t[i])); if (col0 !== x) { if (col0 !== null) { if (first) { cx.moveTo(col0, yf(lo)); first = false; } cx.lineTo(col0, yf(lo)); cx.lineTo(col0, yf(hi)); } col0 = x; lo = hi = y[i]; } else { if (y[i] < lo) lo = y[i]; if (y[i] > hi) hi = y[i]; } } if (col0 !== null) { if (first) cx.moveTo(col0, yf(lo)); cx.lineTo(col0, yf(lo)); cx.lineTo(col0, yf(hi)); } }
  cx.stroke(); cx.restore(); }

function findTrig() { const d = chData(S.trig.src); if (!d) return null; const [i0] = range(d.t, S.hshift, S.hshift); const y = d.y.slice(i0), t = d.t.slice(i0); const cr = crossings(t, y, S.trig.level, S.trig.edge === 'rise'); if (!cr.length) return null; return cr[Math.min(S.tnth, cr.length - 1)]; }
function viewLeft() { const tt = findTrig(); S.trigged = tt != null; let left; if (tt != null) { left = Math.max(0, tt - 2 * S.tdiv); S.lastLeft = left; } else if (S.trig.mode === 'NORM' && S.lastLeft != null) left = S.lastLeft; else left = S.hshift; return left; }

function mathTrace() { if (S.math === 'off') return null; const a = chData(0), b = chData(1); if (!a || !b) return null; const n = Math.min(a.y.length, b.y.length); const y = new Array(n);
  for (let i = 0; i < n; i++) y[i] = S.math === 'A+B' ? a.y[i] + b.y[i] : S.math === 'A-B' ? a.y[i] - b.y[i] : a.y[i] * b.y[i];
  return { t: a.t, y, vdiv: S.math === 'A*B' ? S.ch[0].vdiv * S.ch[1].vdiv : S.ch[0].vdiv, pos: S.ch[0].pos, unit: S.math === 'A*B' ? 'W' : 'V' }; }

function drawDSO() { const g = geom(); grid(g); let l = viewLeft(), r = l + 10 * S.tdiv; if (window.__playT !== undefined && window.__playT > r) { r = window.__playT; l = r - 10 * S.tdiv; } S.l = l; S.r = r;
  const act = [];
  S.ch.forEach((c, i) => { const d = chData(i); if (!d) return; act.push(i); const yf = v => g.y0 + g.h / 2 - (v / c.vdiv + c.pos) * g.dy; plot(d.t, d.y, l, r, g, yf, CH_COL[i]);
    cx.fillStyle = CH_COL[i]; const py = g.y0 + g.h / 2 - c.pos * g.dy; cx.beginPath(); cx.moveTo(g.x0, py); cx.lineTo(g.x0 + 9, py - 5); cx.lineTo(g.x0 + 9, py + 5); cx.closePath(); cx.fill(); cx.font = 'bold 9px monospace'; cx.fillText(CH_NAME[i], g.x0 + 11, py + 3); });
  const m = mathTrace(); if (m) { const yf = v => g.y0 + g.h / 2 - (v / m.vdiv + m.pos) * g.dy; plot(m.t, m.y, l, r, g, yf, '#e2e8f0', 1.4); }
  // trigger marker
  const tc = S.ch[S.trig.src]; if (tc && chData(S.trig.src)) { const ty = g.y0 + g.h / 2 - (S.trig.level / tc.vdiv + tc.pos) * g.dy; cx.fillStyle = '#fb923c'; cx.beginPath(); cx.moveTo(g.x0 + g.w, ty); cx.lineTo(g.x0 + g.w - 9, ty - 5); cx.lineTo(g.x0 + g.w - 9, ty + 5); cx.closePath(); cx.fill(); }
  // labels
  cx.font = 'bold 10px monospace'; let lx = g.x0 + 6; act.forEach(i => { cx.fillStyle = CH_COL[i]; const s = `${CH_NAME[i]}:${fmt(S.ch[i].vdiv, 'V')}${S.ch[i].coup === 'AC' ? '~' : ''}${S.ch[i].inv ? '⟂' : ''}`; cx.fillText(s, lx, g.y0 + g.h - 6); lx += s.length * 6.4 + 8; });
  cx.fillStyle = '#4ade80'; cx.textAlign = 'right'; cx.fillText(fmt(S.tdiv, 's') + '/div', g.x0 + g.w - 6, g.y0 + g.h - 6); cx.textAlign = 'left';
  if (S.cur.on) cursors(g, l, r, act);
  return act; }

function cursors(g, l, r, act) { cx.save(); cx.setLineDash([5, 4]); cx.lineWidth = 1.2; cx.strokeStyle = '#f8fafc'; cx.fillStyle = '#f8fafc'; cx.font = '10px monospace';
  S.cur.x.forEach((v, k) => { const x = g.x0 + v * g.dx; cx.beginPath(); cx.moveTo(x, g.y0); cx.lineTo(x, g.y0 + g.h); cx.stroke(); cx.fillText('T' + (k + 1), x + 3, g.y0 + 11); });
  S.cur.y.forEach((v, k) => { const y = g.y0 + g.h / 2 - v * g.dy; cx.beginPath(); cx.moveTo(g.x0, y); cx.lineTo(g.x0 + g.w, y); cx.stroke(); cx.fillText('V' + (k + 1), g.x0 + g.w - 20, y - 3); });
  cx.restore();
  const dT = (S.cur.x[1] - S.cur.x[0]) * S.tdiv; const c0 = act.length ? act[0] : 0, vd = S.ch[c0].vdiv; const dV = (S.cur.y[0] - S.cur.y[1]) * vd;
  S.curTxt = `Cursors: ΔT=${fmt(Math.abs(dT), 's')}  1/ΔT=${dT ? fmt(1 / Math.abs(dT), 'Hz') : '—'}  ΔV(${CH_NAME[c0]})=${fmt(Math.abs(dV), 'V')}`; }

function drawXY() { const g = geom(); grid(g); const a = chData(0), b = chData(1); if (!a || !b) { msg('XY يحتاج قناتين A و B'); return []; }
  const n = Math.min(a.y.length, b.y.length); cx.save(); cx.beginPath(); cx.rect(g.x0, g.y0, g.w, g.h); cx.clip(); cx.strokeStyle = '#4ade80'; cx.shadowColor = '#4ade80'; cx.shadowBlur = 5; cx.lineWidth = 1.6; cx.beginPath();
  for (let i = 0; i < n; i++) { const x = g.x0 + g.w / 2 + (a.y[i] / S.ch[0].vdiv + S.ch[0].pos) * g.dx, y = g.y0 + g.h / 2 - (b.y[i] / S.ch[1].vdiv + S.ch[1].pos) * g.dy; i ? cx.lineTo(x, y) : cx.moveTo(x, y); } cx.stroke(); cx.restore();
  cx.fillStyle = '#4ade80'; cx.font = 'bold 10px monospace'; cx.fillText(`X=A ${fmt(S.ch[0].vdiv, 'V')}/div   Y=B ${fmt(S.ch[1].vdiv, 'V')}/div`, g.x0 + 6, g.y0 + g.h - 6); return [0, 1]; }

function msg(s) { cx.fillStyle = '#94a3b8'; cx.font = '13px system-ui'; cx.textAlign = 'center'; cx.fillText(s, W / 2, H / 2); cx.textAlign = 'left'; }

function drawLogic() { cx.fillStyle = '#030b06'; cx.fillRect(0, 0, W, H); const s = SD(); if (!s || !s.data.voltages) return []; const t = T(); const l = S.hshift, r = l + 10 * S.tdiv; const nodes = s.data.voltages; const list = [];
  S.ch.forEach((c, i) => { const d = series(c.src); if (d && c.coup !== 'OFF') list.push({ y: d.y, name: CH_NAME[i] + ': ' + d.label, col: CH_COL[i] }); });
  for (let k = 0; k < nodes.length && list.length < 8; k++) if (!list.some(q => q.y === nodes[k])) list.push({ y: nodes[k], name: 'Node ' + (k + 1), col: '#94a3b8' });
  const rows = Math.max(1, list.length), rh = (H - 22) / rows; const g = { x0: 70, y0: 4, w: W - 78, h: H - 22 };
  cx.strokeStyle = '#12301f'; cx.lineWidth = 1; for (let i = 0; i <= 10; i++) { const x = g.x0 + i * g.w / 10; cx.beginPath(); cx.moveTo(x, g.y0); cx.lineTo(x, g.y0 + g.h); cx.stroke(); }
  list.forEach((q, k) => { let mx = -Infinity, mn = Infinity; q.y.forEach(v => { if (v > mx) mx = v; if (v < mn) mn = v; }); const th = mx - mn > 0.5 ? (mx + mn) / 2 : 1.65; const yb = g.y0 + (k + 1) * rh - 6, yt = g.y0 + k * rh + 8;
    cx.fillStyle = q.col; cx.font = 'bold 9px monospace'; cx.fillText(q.name.slice(0, 11), 2, yb - (rh - 14) / 2 + 3);
    const [i0, i1] = range(t, l, r); cx.strokeStyle = q.col; cx.lineWidth = 1.8; cx.beginPath(); let first = true, prev = null;
    for (let i = i0; i < i1 && i < t.length; i++) { const x = g.x0 + (t[i] - l) / (r - l) * g.w, hi = q.y[i] > th, yy = hi ? yt : yb; if (first) { cx.moveTo(x, yy); first = false; } else { if (prev !== hi) cx.lineTo(x, prev ? yt : yb); cx.lineTo(x, yy); } prev = hi; } cx.stroke(); });
  cx.fillStyle = '#4ade80'; cx.font = 'bold 10px monospace'; cx.textAlign = 'right'; cx.fillText(fmt(S.tdiv, 's') + '/div', W - 6, H - 5); cx.textAlign = 'left'; return []; }

function fftOf(y, t) { let N = 1; while (N < y.length) N <<= 1; N = Math.min(N * 2, 16384); const re = new Float64Array(N), im = new Float64Array(N), n = Math.min(y.length, N); const m = mean(y);
  for (let i = 0; i < n; i++) re[i] = (y[i] - m) * (0.5 - 0.5 * Math.cos(2 * Math.PI * i / (n - 1)));
  for (let i = 1, j = 0; i < N; i++) { let b = N >> 1; for (; j & b; b >>= 1) j ^= b; j ^= b; if (i < j) { [re[i], re[j]] = [re[j], re[i]]; } }
  for (let len = 2; len <= N; len <<= 1) { const a = -2 * Math.PI / len; for (let i = 0; i < N; i += len) for (let k = 0; k < len / 2; k++) { const wr = Math.cos(a * k), wi = Math.sin(a * k), u = i + k, v = i + k + len / 2, xr = re[v] * wr - im[v] * wi, xi = re[v] * wi + im[v] * wr; re[v] = re[u] - xr; im[v] = im[u] - xi; re[u] += xr; im[u] += xi; } }
  const dt = (t[t.length - 1] - t[0]) / (t.length - 1), mags = []; for (let k = 0; k < N / 2; k++) mags.push(2 * Math.hypot(re[k], im[k]) / (n * 0.5)); return { mags, df: 1 / (N * dt), dc: m }; }
function drawFFT() { const g = geom(); cx.fillStyle = '#030b06'; cx.fillRect(0, 0, W, H); const i = [0, 1, 2, 3].find(k => chData(k)); if (i === undefined) { msg('اختر مصدراً لقناة'); return []; } const d = chData(i), f = fftOf(d.y, d.t); const m0 = measure(d, 0, recLen()); const f0 = m0 && m0.freq; const fmax = Math.min(f.mags.length * f.df, f0 ? f0 * 11 : f.mags.length * f.df / 6); const nb = Math.min(f.mags.length, Math.ceil(fmax / f.df)); let pk = 1e-9; for (let k = 1; k < nb; k++) if (f.mags[k] > pk) pk = f.mags[k];
  grid({ x0: g.x0, y0: g.y0, w: g.w, h: g.h, dx: g.dx, dy: g.dy }); cx.fillStyle = CH_COL[i]; cx.strokeStyle = CH_COL[i]; cx.lineWidth = 1.5; const peaks = [];
  for (let k = 1; k < nb; k++) { const x = g.x0 + k * f.df / fmax * g.w, h = f.mags[k] / pk * (g.h - 26); cx.beginPath(); cx.moveTo(x, g.y0 + g.h); cx.lineTo(x, g.y0 + g.h - h); cx.stroke(); if (k > 1 && f.mags[k] > f.mags[k - 1] && f.mags[k] >= f.mags[k + 1] && f.mags[k] > pk * 0.08) peaks.push(k); }
  cx.fillStyle = '#7c8ea8'; cx.font = '9px monospace'; for (let i = 0; i <= 10; i += 2) cx.fillText(fmt(fmax * i / 10, 'Hz'), g.x0 + i * g.dx + 2, g.y0 + g.h - 3);
  cx.fillStyle = '#e2e8f0'; cx.font = '10px monospace'; peaks.slice(0, 8).forEach(k => { const x = g.x0 + k * f.df / fmax * g.w; cx.fillText(fmt(k * f.df, 'Hz') + ' ' + fmt(f.mags[k], 'V'), Math.min(x - 14, g.x0 + g.w - 70), g.y0 + g.h - f.mags[k] / pk * (g.h - 26) - 4); });
  const thd = (() => { if (!peaks.length) return null; const p0 = peaks[0]; let s = 0; peaks.slice(1).forEach(k => { s += f.mags[k] * f.mags[k]; }); return Math.sqrt(s) / f.mags[p0] * 100; })();
  cx.fillStyle = '#4ade80'; cx.font = 'bold 10px monospace'; cx.fillText(`FFT قناة ${CH_NAME[i]} | 0 → ${fmt(fmax, 'Hz')} | DC=${fmt(f.dc, 'V')}${thd != null ? ' | THD≈' + thd.toFixed(1) + '%' : ''}`, g.x0 + 6, g.y0 + 12); return [i]; }

function drawBode() { const g = geom(); grid(g); const s = SD(); const d = s && s.data; if (!d || !d.freqs) { msg('جاري حساب Bode…'); return []; }
  const pn = (src) => { if (!src || src === 'none') return 0; if (src[0] === 'p') { const q = (s.net.probeMap || [])[+src.slice(2)]; return q ? q.node : 0; } return +src.slice(2) || 0; };
  const ci = [1, 0, 2, 3].find(k => S.ch[k].src !== 'none' && S.ch[k].coup !== 'OFF' && pn(S.ch[k].src) > 0); const node = ci === undefined ? 1 : pn(S.ch[ci].src);
  const nested = Array.isArray(d.mags[0]); const mags = nested ? (d.mags[node - 1] || d.mags[0]) : d.mags, ph = d.phases ? (nested ? (d.phases[node - 1] || d.phases[0]) : d.phases) : [], fr = d.freqs; S.bodeNote = `Bode @ Node ${node} (مصدر AC = 1V)`; const lf0 = Math.log10(fr[0]), lf1 = Math.log10(fr[fr.length - 1]);
  let mx = Math.max(...mags), mn = Math.min(...mags); mx = Math.ceil(mx / 10) * 10 + 10; mn = Math.floor(mn / 10) * 10 - 10; const yM = v => g.y0 + (mx - v) / (mx - mn) * g.h, xF = f => g.x0 + (Math.log10(f) - lf0) / (lf1 - lf0) * g.w;
  cx.font = '9px monospace'; cx.fillStyle = '#7c8ea8'; for (let e = Math.ceil(lf0); e <= lf1; e++) { const x = xF(Math.pow(10, e)); cx.strokeStyle = '#1d5a3a'; cx.beginPath(); cx.moveTo(x, g.y0); cx.lineTo(x, g.y0 + g.h); cx.stroke(); cx.fillText(fmt(Math.pow(10, e), 'Hz'), x + 2, g.y0 + g.h - 3); }
  for (let v = Math.ceil(mn / 10) * 10; v <= mx; v += 10) { cx.fillText(v + 'dB', g.x0 + 2, yM(v) - 2); }
  cx.save(); cx.beginPath(); cx.rect(g.x0, g.y0, g.w, g.h); cx.clip(); cx.strokeStyle = '#a855f7'; cx.lineWidth = 2.2; cx.beginPath(); mags.forEach((v, i) => { const x = xF(fr[i]), y = yM(v); i ? cx.lineTo(x, y) : cx.moveTo(x, y); }); cx.stroke();
  if (ph.length) { cx.strokeStyle = '#38bdf8'; cx.lineWidth = 1.6; cx.beginPath(); ph.forEach((v, i) => { const x = xF(fr[i]), y = g.y0 + (90 - v) / 270 * g.h; i ? cx.lineTo(x, y) : cx.moveTo(x, y); }); cx.stroke(); } cx.restore();
  cx.fillStyle = '#38bdf8'; cx.font = '9px monospace'; cx.textAlign = 'right'; [90, 0, -90, -180].forEach(a => cx.fillText(a + '°', g.x0 + g.w - 3, g.y0 + (90 - a) / 270 * g.h - 2)); cx.textAlign = 'left';
  cx.fillStyle = '#a855f7'; cx.font = 'bold 10px monospace'; cx.fillText('Magnitude (dB)', g.x0 + 6, g.y0 + 12); cx.fillStyle = '#38bdf8'; cx.fillText('Phase (°)', g.x0 + 110, g.y0 + 12); cx.fillStyle = '#94a3b8'; cx.fillText(S.bodeNote, g.x0 + 6, g.y0 + 26);
  const i3 = mags.findIndex(v => v <= mags[0] - 3); if (i3 > 0) { cx.fillStyle = '#facc15'; cx.fillText('f(-3dB)≈' + fmt(fr[i3], 'Hz'), g.x0 + 190, g.y0 + 12); } return []; }

function drawMotor() { const g = geom(); grid(g); const ms = typeof motorStats !== 'undefined' ? motorStats : {}; const k = Object.keys(ms)[0]; if (k === undefined) { msg('لا يوجد محرك في الدائرة'); return []; } const h = ms[k].history || {}; const series3 = [['rpm', '#4ade80', 'RPM'], ['torque', '#facc15', 'N·m'], ['current', '#f87171', 'A']];
  series3.forEach(([key, col, u], j) => { const a = h[key] || []; if (a.length < 2) return; const mx = Math.max(1e-9, ...a.map(Math.abs)); cx.strokeStyle = col; cx.lineWidth = 1.8; cx.beginPath(); a.forEach((v, i) => { const x = g.x0 + i / (a.length - 1) * g.w, y = g.y0 + g.h - 14 - Math.abs(v) / mx * (g.h - 40); i ? cx.lineTo(x, y) : cx.moveTo(x, y); }); cx.stroke(); cx.fillStyle = col; cx.font = 'bold 10px monospace'; cx.fillText(`${key}: max ${mx.toFixed(2)} ${u}`, g.x0 + 6 + j * 150, g.y0 + 12); }); return []; }

/* ---------- القياسات والطور ---------- */
function refreshMeas(act) { if (!el.root) return; const mt = el.root.querySelector('#psMeas'), ph = el.root.querySelector('#psPh'), pc = el.root.querySelector('#psPhasor');
  const useWin = S.mode === 'time' || S.mode === 'xy', L = recLen(); const cols = [0, 1, 2, 3].map(i => { const d = chData(i); if (!d) return null; const m = useWin && S.r ? measure(d, S.l, S.r) : measure(d, L * 0.4, L); return m ? Object.assign({ i, d }, m) : null; }).filter(Boolean);
  if (!cols.length) { mt.innerHTML = '<div style="color:#94a3b8;padding:4px">لا توجد قنوات فعّالة — شغّل المحاكاة واختر مصدراً</div>'; ph.innerHTML = ''; clearPhasor(pc); return; }
  const row = (n, f) => `<tr><th>${n}</th>${cols.map(c => `<td style="color:${CH_COL[c.i]}">${f(c)}</td>`).join('')}</tr>`;
  mt.innerHTML = `<table><tr><th></th>${cols.map(c => `<th style="color:${CH_COL[c.i]}">${CH_NAME[c.i]}</th>`).join('')}</tr>` +
    row('Vmax', c => fmt(c.vmax, 'V')) + row('Vmin', c => fmt(c.vmin, 'V')) + row('Vpp', c => fmt(c.vpp, 'V')) + row('Vavg', c => fmt(c.avg, 'V')) + row('Vrms', c => fmt(c.rms, 'V')) + row('Freq', c => c.freq ? fmt(c.freq, 'Hz') : '—') + row('Period', c => c.per ? fmt(c.per, 's') : '—') + row('Duty', c => c.duty != null ? c.duty.toFixed(1) + '%' : '—') + '</table>';
  // Phase: الأساس الأساسي (fundamental) بالـ DFT على دورات كاملة من آخر السجل
  const ref = cols[0], t = ref.d.t; const crs = crossings(t, ref.d.y, ref.mid, true); let html = '', arr = [];
  if (ref.freq && crs.length >= 2) { const f = ref.freq, nper = Math.min(5, crs.length - 1), t0 = crs[crs.length - 1 - nper]; const base = dft(t, ref.d.y, f, t0, nper);
    if (base) { arr.push({ i: ref.i, amp: base.amp, d: 0 }); cols.slice(1).forEach(c => { const q = dft(t, c.d.y, f, t0, nper); if (q) { let dp = q.ph - base.ph; while (dp > 180) dp -= 360; while (dp <= -180) dp += 360; arr.push({ i: c.i, amp: q.amp, d: dp, dt: dp / 360 / f }); } });
      html = `<table><tr><th>ch</th><th>V₁(pk)</th><th>Δφ vs ${CH_NAME[ref.i]}</th><th>Δt</th></tr>` + arr.map(a => `<tr><th style="color:${CH_COL[a.i]}">${CH_NAME[a.i]}</th><td>${fmt(a.amp, 'V')}</td><td>${a.i === ref.i ? 'ref' : a.d.toFixed(1) + '° ' + (a.d > 0 ? 'lead' : 'lag')}</td><td>${a.dt != null ? fmt(Math.abs(a.dt), 's') : '—'}</td></tr>`).join('') + '</table>'; } }
  ph.innerHTML = html || '<div style="color:#94a3b8;padding:4px">يلزم إشارة دورية (قناتين+) لحساب زاوية الطور</div>'; drawPhasor(pc, arr); }
function clearPhasor(pc) { const c = pc.getContext('2d'); c.clearRect(0, 0, pc.width, pc.height); }
function drawPhasor(pc, arr) { const c = pc.getContext('2d'), w = pc.width, h = pc.height; c.clearRect(0, 0, w, h); const cxp = w / 2, cyp = h / 2, R = Math.min(w, h) / 2 - 10; c.strokeStyle = '#1d5a3a'; c.lineWidth = 1; c.beginPath(); c.arc(cxp, cyp, R, 0, 7); c.moveTo(cxp - R, cyp); c.lineTo(cxp + R, cyp); c.moveTo(cxp, cyp - R); c.lineTo(cxp, cyp + R); c.stroke(); if (!arr.length) return; const mx = Math.max(...arr.map(a => a.amp), 1e-9);
  arr.forEach(a => { const len = Math.max(0.15, a.amp / mx) * R, ang = -a.d * Math.PI / 180, x = cxp + len * Math.cos(ang), y = cyp + len * Math.sin(ang); c.strokeStyle = c.fillStyle = CH_COL[a.i]; c.lineWidth = 2.2; c.beginPath(); c.moveTo(cxp, cyp); c.lineTo(x, y); c.stroke(); c.beginPath(); c.arc(x, y, 3.5, 0, 7); c.fill(); c.font = 'bold 12px monospace'; c.fillText(CH_NAME[a.i], x + 5, y - 4); }); }

/* ---------- الرسم الرئيسي ---------- */
function draw() { if (!el.root || el.root.style.display === 'none') return; const dpr = window.devicePixelRatio || 1, w = cv.clientWidth, h = cv.clientHeight; if (!w || !h) return;
  if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); } cx.setTransform(dpr, 0, 0, dpr, 0, 0); W = w; H = h; cx.textAlign = 'left'; S.curTxt = '';
  let act = []; const s = SD();
  if (!s || !s.data) { cx.fillStyle = '#030b06'; cx.fillRect(0, 0, W, H); msg('شغّل المحاكاة (▶ Run) أو اختر دائرة'); }
  else { const fn = { time: drawDSO, xy: drawXY, logic: drawLogic, fft: drawFFT, bode: drawBode, motor: drawMotor }[S.mode] || drawDSO; try { act = fn() || []; } catch (e) { console.error('scope draw', e); msg('خطأ رسم: ' + e.message); } }
  refreshMeas(act); const st = el.root.querySelector('#psTrigSt'); if (st) { st.textContent = S.trigged ? "TRIG'D" : (S.trig.mode === 'AUTO' ? 'AUTO' : 'WAIT'); st.style.color = S.trigged ? '#22c55e' : '#f59e0b'; }
  const L = recLen(), n = T().length; el.root.querySelector('#psFoot').textContent = s && s.data ? `${S.running ? 'RUN' : 'STOP'} | ${fmt(S.tdiv, 's')}/div | Trig ${CH_NAME[S.trig.src]} ${S.trig.edge === 'rise' ? '↗' : '↘'} ${S.trig.level.toFixed(2)}V | record ${fmt(L, 's')} · ${n} pts · dt=${fmt(recDt(), 's')}${(() => { const A = s.data.accuracy; return A ? (A.converged && !(A.warnings && A.warnings.length) ? ' | ✓ ' + (A.verified ? 'verified ' + A.step_error_pct + '%' : 'converged') : ' | ⚠ UNRELIABLE') : ''; })()}${S.curTxt ? '\n' + S.curTxt : ''}` : ''; }

/* ---------- المصادر والتحكم ---------- */
function refreshSources() { const s = SD(); if (!s || !s.data || !s.data.voltages) return; const probes = s.net.probeMap || []; const oscC = (typeof components !== 'undefined' ? components : []).find(c => c.type === 'OSC'); const sig = probes.map(p => p.label + p.node).join('|') + '#' + s.data.voltages.length + (oscC ? '|osc' + [0, 1, 2, 3].map(i => s.net.getNode(oscC.id, i)).join(',') : ''); if (sig === S.sig) return; S.sig = sig; S.lastNW = null; S.lastLeft = null; S.tnth = 0; window.__dtHint = undefined;
  let picks = probes.length ? probes.slice(0, 4).map((_, i) => 'p:' + i) : s.data.voltages.slice(0, 4).map((_, i) => 'n:' + (i + 1));
  const osc = (typeof components !== 'undefined' ? components : []).find(c => c.type === 'OSC');
  if (osc) { const wired = i => wires.some(w => (w.from.compId === osc.id && w.from.pinIdx === i) || (w.to.compId === osc.id && w.to.pinIdx === i)); const op = [0, 1, 2, 3].map(i => wired(i) ? 'n:' + s.net.getNode(osc.id, i) : 'none'); if (op.some(x => x !== 'none')) picks = op; }
  S.ch.forEach((c, i) => { const pk = picks[i] && picks[i] !== 'none' ? picks[i] : 'none'; c.src = pk; c.coup = pk !== 'none' ? 'DC' : 'OFF'; c.inv = false; }); S.hshift = 0; S.trig.src = 0; S.math = 'off'; S.live = null; autoset(true); }

function autoset(quiet) { const s = SD(); if (!s || !s.data || !s.data.voltages) return; const L = recLen(); const act = [0, 1, 2, 3].filter(i => S.ch[i].src !== 'none'); act.forEach(i => { if (S.ch[i].coup === 'OFF') S.ch[i].coup = 'DC'; });
  let ref = null; act.forEach(i => { const d = chData(i); if (!d) return; const m = measure(d, L * 0.4, L); if (!m) return; const need = m.vpp > 1e-6 ? m.vpp / 6.4 : Math.max(Math.abs(m.avg), 1e-3) / 3; const c = S.ch[i]; c.vdiv = VLAD.find(v => v >= need * 0.999) || 1000;
    c.pos = m.vmin >= -1e-9 && m.vpp > 1e-6 ? -3 - m.vmin / c.vdiv : -m.mid / c.vdiv; if (!ref) ref = { i, m }; });
  if (ref) { const per = ref.m.per; S.tdiv = per ? (TLAD.find(v => v >= per * 2 / 10 * 0.999) || 1) : (TLAD.find(v => v >= L / 10 * 0.999) || 1); S.trig.src = ref.i; S.trig.level = ref.m.mid * (S.ch[ref.i].coup === 'AC' ? 0 : 1) - (S.ch[ref.i].coup === 'AC' ? 0 : 0); if (S.ch[ref.i].coup === 'AC') S.trig.level = 0; S.trig.edge = 'rise'; S.trig.mode = 'AUTO'; }
  S.tnth = 0; S.hshift = Math.max(0, Math.min(L * 0.4, L - 14 * S.tdiv)); S.lastLeft = null; knobSync(el.root); needWindow(); if (!quiet) { refreshUI(); draw(); } }

function needWindow(force) { if (S.mode === 'bode') return; const L = recLen(), want = S.hshift + 14 * S.tdiv, dtNeed = 10 * S.tdiv / 700; const key = want.toPrecision(3) + '|' + dtNeed.toPrecision(3);
  const bad = force || want > L * 1.0001 || recDt() > dtNeed * 1.6; if (!bad) return; if (!force && S.lastNW === key) return; S.lastNW = key;
  tStopVal = Number(Math.max(want, 1e-5).toPrecision(3)); window.__dtHint = Math.max(dtNeed, tStopVal / 8000); const sl = document.querySelector('input[oninput*="tStopVal"]'); if (sl) { try { sl.value = tStopVal; } catch (e) {} } rerun(false); }

function rerun(now) { clearTimeout(S.tm); const go = async () => { if (S.busy) { S.again = true; return; } S.busy = true; try { await window.runSim(true); } catch (e) { console.error(e); } finally { S.busy = false; } if (S.again) { S.again = false; rerun(true); } }; if (now) go(); else S.tm = setTimeout(go, 180); }

/* LIVE TUNE */
function collectLive() { liveItems = []; const cs = typeof components !== 'undefined' ? components : [];
  cs.forEach(c => { if (['SCR', 'TRIAC', 'GATE_FIRING'].includes(c.type) && c.alpha !== undefined) liveItems.push({ k: 'a' + c.id, l: `α زاوية الإشعال — ${c.part}`, min: 5, max: 175, get: () => c.alpha, set: v => { c.alpha = Math.round(v); }, u: '°' });
    if (c.type === 'POT') liveItems.push({ k: 'p' + c.id, l: `POT ${c.part} %`, min: 0, max: 100, get: () => c.pct == null ? 50 : c.pct, set: v => { c.pct = Math.round(v); }, u: '%' });
    if (c.type === 'V') { if (c.freq > 0) { liveItems.push({ k: 'va' + c.id, l: `V${c.id} سعة (Vpk)`, min: 0, max: Math.max(20, 2 * c.amp), get: () => c.amp, set: v => { c.amp = Number(v.toFixed(2)); }, u: 'V' }); liveItems.push({ k: 'vf' + c.id, l: `V${c.id} تردد (Hz)`, min: 1, max: Math.max(500, 2 * c.freq), get: () => c.freq, set: v => { c.freq = Math.max(1, Math.round(v)); }, u: 'Hz' }); } else liveItems.push({ k: 'vd' + c.id, l: `V${c.id} جهد DC`, min: 0, max: Math.max(12, 2 * c.dc), get: () => c.dc, set: v => { c.dc = Number(v.toFixed(2)); }, u: 'V' }); } }); }
function setupLive(key) { liveItems.sort((a, b) => (a.k[0] === 'a' ? 0 : a.k[0] === 'p' ? 1 : 2) - (b.k[0] === 'a' ? 0 : b.k[0] === 'p' ? 1 : 2)); const it = liveItems.find(x => x.k === key) || liveItems[0]; const sl = el.root.querySelector('#psLs'), lv = el.root.querySelector('#psLv'); if (!it) { sl.disabled = true; lv.textContent = ''; S.live = null; return; } S.live = it.k; sl.disabled = false; sl.min = it.min; sl.max = it.max; sl.step = (it.max - it.min) > 50 ? 1 : 0.05; sl.value = it.get(); lv.textContent = Number(it.get()).toFixed(it.u === 'V' ? 1 : 0) + it.u; }
function liveSet(v) { const it = liveItems.find(x => x.k === S.live); if (!it) return; it.set(v); el.root.querySelector('#psLv').textContent = Number(it.get()).toFixed(it.u === 'V' ? 1 : 0) + it.u; S.frozen = null; S.running = true; rerun(false); }

function refreshUI() { if (!el.root) return; const r = el.root; r.querySelectorAll('[data-mode]').forEach(b => b.classList.toggle('on', b.dataset.mode === S.mode));
  r.querySelectorAll('[data-coup]').forEach(b => { const [k, v] = b.dataset.coup.split(':'); b.classList.toggle('on', S.ch[+k].coup === v); }); r.querySelectorAll('[data-inv]').forEach(b => b.classList.toggle('on', S.ch[+b.dataset.inv].inv));
  r.querySelectorAll('[data-tsrc]').forEach(b => b.classList.toggle('on', +b.dataset.tsrc === S.trig.src)); r.querySelectorAll('[data-edge]').forEach(b => b.classList.toggle('on', b.dataset.edge === S.trig.edge)); r.querySelectorAll('[data-tm]').forEach(b => b.classList.toggle('on', b.dataset.tm === S.trig.mode));
  r.querySelector('#psCur').classList.toggle('on', S.cur.on); r.querySelector('#psRun').textContent = S.running ? '⏵ RUN' : '⏸ STOP'; r.querySelector('#psRun').classList.toggle('on', S.running); r.querySelector('#psMath').value = S.math;
  const so = sources(); r.querySelectorAll('[data-src]').forEach(sel => { const cur = S.ch[+sel.dataset.src].src, html = so.map(o => `<option value="${o.k}">${o.l}</option>`).join(''); if (sel.dataset.h !== html) { sel.innerHTML = html; sel.dataset.h = html; } sel.value = cur; });
  collectLive(); liveItems.sort((a, b) => (a.k[0] === 'a' ? 0 : a.k[0] === 'p' ? 1 : 2) - (b.k[0] === 'a' ? 0 : b.k[0] === 'p' ? 1 : 2)); const lc = r.querySelector('#psLc'), lh = liveItems.map(i => `<option value="${i.k}">${i.l}</option>`).join('') || '<option>— لا عناصر قابلة للضبط —</option>'; if (lc.dataset.h !== lh) { lc.innerHTML = lh; lc.dataset.h = lh; if (!liveItems.some(i => i.k === S.live)) setupLive(null); } lc.value = S.live || (liveItems[0] && liveItems[0].k) || ''; if (S.live === null && liveItems.length) setupLive(liveItems[0].k);
  knobSync(r); }

function onNewData() { if (!el.root) return; if (S.single) { S.single = false; S.running = false; S.frozen = typeof simData !== 'undefined' ? simData : null; } else if (!S.running && !S.frozen) S.frozen = null; refreshSources(); refreshUI(); draw(); }

/* ---------- ربط بالتطبيق ---------- */
const _run = window.runSim; if (typeof _run === 'function') window.runSim = async function () { const r = await _run.apply(this, arguments); try { onNewData(); } catch (e) { console.error(e); } return r; };
window.openScope = function () { build(); el.root.style.display = 'flex'; S.frozen = null; S.running = true; if (typeof simData === 'undefined' || !simData) { window.runSim(true); } else { refreshSources(); refreshUI(); setTimeout(draw, 30); setTimeout(draw, 250); } };
window.drawScope = function () { if (el.root && el.root.style.display !== 'none') draw(); };
window.setScopeMode = function (m) { build(); S.mode = ({ time: 'time', logic: 'logic', fft: 'fft', bode: 'bode', motor: 'motor' })[m] || 'time'; refreshUI(); draw(); };
window.ProScope = { S, open: () => window.openScope(), draw, autoset, measure, chData };
})();
