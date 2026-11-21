/* أجهزة قياس على اللوحة (فولتميتر، أوسيلوسكوب 4 قنوات) + تشغيل مستمر Play/Pause/Stop */
(function () {
  window.__meters = {};
  LIBRARY.push(
    { cat: '8. المحركات والحساسات والتحكم', name: 'NE555 (مؤقت حقيقي 8 أطراف)', type: 'NE555_8', part: 'NE555' },
    { cat: '8. المحركات والحساسات والتحكم', name: 'TLC555 (CMOS rail-to-rail)', type: 'NE555_8', part: 'TLC555' },
    { cat: '9. أجهزة القياس الافتراضية', name: 'VOLTMETER (فولتميتر DC/AC True-RMS)', type: 'VMETER', part: 'VOLTMETER' },
    { cat: '9. أجهزة القياس الافتراضية', name: 'OSCILLOSCOPE (أوسيلوسكوب 4 قنوات A-D)', type: 'OSC', part: 'OSCILLOSCOPE' });

  function computeMeters() {
    window.__meters = {}; if (typeof simData === 'undefined' || !simData || !simData.data || !simData.data.voltages) return;
    const V = simData.data.voltages, n = (simData.data.times || []).length, i0 = Math.floor(n * 0.4), net = simData.net;
    components.filter(c => c.type === 'VMETER').forEach(c => {
      const a = net.getNode(c.id, 0), b = net.getNode(c.id, 1), va = a > 0 ? V[a - 1] : null, vb = b > 0 ? V[b - 1] : null; if (!va && !vb) return;
      let s = 0, s2 = 0, k = 0, pk = 0; for (let i = i0; i < n; i++) { const v = (va ? va[i] : 0) - (vb ? vb[i] : 0); s += v; s2 += v * v; k++; if (Math.abs(v) > pk) pk = Math.abs(v); }
      window.__meters[c.id] = { dc: s / k, rms: Math.sqrt(s2 / k), pk };
    });
  }
  window.meterText = function (c) { const m = window.__meters[c.id]; if (!m) return '— V'; const ac = m.rms > Math.abs(m.dc) * 1.4 + 1e-6; const v = ac ? m.rms : m.dc; const a = Math.abs(v); return (ac ? '~' : '') + (a >= 100 ? v.toFixed(1) : a >= 1 ? v.toFixed(2) : (v * 1000).toFixed(1) + 'm') + (a >= 1 || a === 0 ? ' V' : 'V'); };

  /* ---- Play / Pause / Stop ---- */
  const PB = { on: false, t: 0, last: 0, raf: 0 };
  function recEnd() { const t = simData && simData.data && simData.data.times; return t && t.length ? t[t.length - 1] : 0; }
  function applyAt(t) {
    const d = simData.data, ts = d.times, n = ts.length; const idx = Math.max(0, Math.min(n - 1, Math.floor(t / (ts[n - 1] || 1) * (n - 1))));
    nodeVoltagesLast = { 0: 0 }; d.voltages.forEach((arr, i) => nodeVoltagesLast[i + 1] = arr[idx] || 0);
    window.__playT = t; draw(); if (window.ProScope) ProScope.draw();
  }
  function frame(now) {
    if (!PB.on) return; const L = recEnd(); if (!L) { PB.on = false; return; }
    const dt = Math.min(0.1, (now - PB.last) / 1000); PB.last = now; PB.t += dt * L / 5;   // السجل كله يُعرض خلال ~5 ثوانٍ
    if (PB.t > L) PB.t = 0; applyAt(PB.t); PB.raf = requestAnimationFrame(frame);
  }
  window.playSim = async function () {
    if (!simData || !simData.data || !simData.data.times) await runSim(true); if (!simData || !simData.data.times) return;
    if (PB.on) return; PB.on = true; PB.last = performance.now(); setStatus('▶ تشغيل مستمر'); PB.raf = requestAnimationFrame(frame); sync();
  };
  window.pauseSim = function () { PB.on = false; cancelAnimationFrame(PB.raf); setStatus('⏸ إيقاف مؤقت'); sync(); };
  window.stopSim = function () {
    PB.on = false; cancelAnimationFrame(PB.raf); PB.t = 0; window.__playT = undefined;
    if (simData && simData.data && simData.data.voltages) { nodeVoltagesLast = { 0: 0 }; simData.data.voltages.forEach((arr, i) => nodeVoltagesLast[i + 1] = arr[arr.length - 1] || 0); }
    setStatus('⏹ توقف'); draw(); if (window.ProScope) ProScope.draw(); sync();
  };
  function sync() { const b = document.getElementById('psPlay'); if (b) b.classList.toggle('active', PB.on); }

  /* خانة SPICE .MODEL في خصائص القطعة (دايود/LED/زينر/BJT/MOSFET) */
  const MODEL_TYPES = { D: 'D', LED: 'D', Z: 'D', Q: 'NPN أو PNP', M: 'NMOS أو PMOS' };
  window.modelBlock = function (c) {
    if (!MODEL_TYPES[c.type]) return '';
    const ex = { D: '.MODEL D1N4148 D(IS=2.52n N=1.752 RS=0.568 BV=100)', LED: '.MODEL LEDX D(IS=1e-18 N=2 RS=3)', Z: '.MODEL DZ D(IS=1n N=1.7 RS=5 BV=9.1)', Q: '.MODEL Q2N2222 NPN(IS=14.34f BF=255.9 BR=6.09 VAF=74)', M: '.MODEL MN NMOS(VTO=2.5 KP=2 LAMBDA=0.01)' }[c.type];
    const note = window.modelNoteText ? window.modelNoteText(c) : '';
    return `<div style="margin-top:8px;border-top:1px solid var(--border,#334155);padding-top:6px"><label style="font-weight:600">SPICE .MODEL (${MODEL_TYPES[c.type]}) — اختياري</label>
      <textarea id="mdlTxt" rows="3" style="width:100%;font:11px monospace;direction:ltr" placeholder="${ex}">${(c.model || '').replace(/</g, '&lt;')}</textarea>
      <div style="display:flex;gap:6px;margin-top:4px"><button class="btn" onclick="selected.model=document.getElementById('mdlTxt').value; runSim(true).then(()=>selectComponent(selected));">تطبيق</button>
      <button class="btn" onclick="selected.model=''; runSim(true).then(()=>selectComponent(selected));">مسح</button></div>
      <div id="mdlNote" style="font-size:.72rem;margin-top:4px;color:#94a3b8">${note}</div></div>`;
  };
  window.modelNoteText = function (c) {
    const a = simData && simData.data && simData.data.accuracy; const n = a && (a.model_notes || []).find(x => x.id === c.id); if (!n) return 'شغّل المحاكاة لعرض حالة النموذج.';
    const src = { 'user-model': '✓ موديل ملصوق: ' + (n.model_name || ''), 'explicit': '✓ قيم يدوية', 'library-typical': '✓ مكتبة (باراميترات SPICE شائعة)', 'library-fit': '✓ مكتبة (مضبوطة على Vf من الـ datasheet)', 'library-legacy': '≈ مكتبة قديمة', 'generic': '⚠ نموذج عام — للدقة الصق .MODEL الرسمي', 'unsupported': '✗ غير مدعوم' }[n.source] || n.source;
    return src + (n.ignored && n.ignored.length ? '<br>متجاهَل (لا تأثير له في النتيجة الحالية): ' + n.ignored.join(', ') : '') + (n.warn && n.source !== 'generic' ? '<br>⚠ ' + n.warn : '');
  };
  function updateBadge() {
    const a = simData && simData.data && simData.data.accuracy; let b = document.getElementById('accBadge'); if (!b) return;
    if (!a) { b.style.display = 'none'; return; }
    b.style.display = ''; b.dataset.tip = JSON.stringify(a);
    if (!a.converged || (a.warnings && a.warnings.length)) { b.textContent = '⚠ غير موثوق'; b.style.background = '#7f1d1d'; b.style.color = '#fecaca'; }
    else if (a.generic_models && a.generic_models.length) { b.textContent = '✓ موثّق • نموذج عام ×' + a.generic_models.length; b.style.background = '#78350f'; b.style.color = '#fde68a'; }
    else if (a.verified) { b.textContent = '✓ موثّق ' + a.step_error_pct + '%'; b.style.background = '#14532d'; b.style.color = '#bbf7d0'; }
    else { b.textContent = '✓ تقارب'; b.style.background = '#78350f'; b.style.color = '#fde68a'; }
  }
  window.showAccuracy = function () {
    const a = simData && simData.data && simData.data.accuracy; if (!a) return;
    alert('تقرير الدقة\n' + (a.converged ? '✓ Newton تقارب في كل الخطوات' : '✗ لم يتقارب') + '\nالمُكامِل: ' + a.integrator + '\n' +
      (a.verified ? 'التحقق الذاتي: فرق RMS بين خطوتين = ' + a.step_error_pct + '%' : 'لم يُجرَ تحقق الخطوة (الدائرة ثقيلة)') +
      (a.generic_models && a.generic_models.length ? '\n\nقطع بنموذج عام (للدقة الأعلى الصق .MODEL الرسمي من خصائص القطعة): ' + a.generic_models.join(', ') : '') +
      ((a.model_notes || []).filter(n => n.source === 'user-model').map(n => '\n✓ ' + n.part + ': موديل ' + n.model_name + (n.ignored && n.ignored.length ? ' — متجاهَل: ' + n.ignored.join(', ') : '')).join('')) +
      (a.warnings && a.warnings.length ? '\n\nتحذيرات:\n- ' + a.warnings.join('\n- ') : ''));
  };
  function addButtons() {
    const ref0 = document.getElementById('isisBtn'); if (ref0 && !document.getElementById('accBadge')) {
      const s = document.createElement('button'); s.id = 'accBadge'; s.className = 'btn'; s.style.display = 'none'; s.title = 'تقرير دقة المحاكاة (اضغط للتفاصيل)'; s.onclick = () => showAccuracy(); ref0.parentNode.insertBefore(s, ref0);
    }
    const ref = document.getElementById('isisBtn'); if (!ref || document.getElementById('psPlay')) return;
    const mk = (id, txt, fn, title) => { const b = document.createElement('button'); b.className = 'btn'; b.id = id; b.textContent = txt; b.title = title; b.onclick = fn; return b; };
    ref.parentNode.insertBefore(mk('psStop', 'Stop', () => stopSim(), 'Stop'), ref);
    ref.parentNode.insertBefore(mk('psPause', 'Pause', () => pauseSim(), 'Pause'), ref);
    ref.parentNode.insertBefore(mk('psPlay', 'Play', () => playSim(), 'تشغيل مستمر (يحرّك الجهود والأوسيلوسكوب لحظياً)'), ref);
  }

  /* بعد كل محاكاة: حدّث الفولتميتر؛ ولو التشغيل المستمر شغّال تابع من نفس النقطة */
  const _run = window.runSim;
  window.runSim = async function () { const r = await _run.apply(this, arguments); try { computeMeters(); updateBadge(); const _a = simData && simData.data && simData.data.accuracy; if (_a && _a.warnings && _a.warnings.length) setStatus('⚠ ' + _a.warnings[0], true); if (PB.on) PB.t = Math.min(PB.t, recEnd()); else { window.__playT = undefined; } draw(); } catch (e) { console.error(e); } return r; };

  /* نقر مزدوج على الأوسيلوسكوب يفتح نافذته */
  canvas.addEventListener('dblclick', e => {
    const r = canvas.getBoundingClientRect(), w = screenToWorld(e.clientX - r.left, e.clientY - r.top);
    const c = components.find(c => c.type === 'OSC' && Math.abs(w.x - c.x) < 36 && Math.abs(w.y - c.y) < 36); if (c) openScope();
  });
  window.addEventListener('load', () => setTimeout(addButtons, 80));
})();
