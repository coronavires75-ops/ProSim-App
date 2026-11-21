/* تحميل الدوائر الجاهزة (الأنظمة + دوائر المحاضرة): ترسم فور الضغط، تتوسّط الشاشة، وتُشغَّل تلقائياً */
(function () {
  function fitCircuit() {
    if (typeof components === 'undefined' || !components.length) return;
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    components.forEach(c => { x0 = Math.min(x0, c.x - 60); x1 = Math.max(x1, c.x + 60); y0 = Math.min(y0, c.y - 55); y1 = Math.max(y1, c.y + 55); });
    const w = canvas.width || 800, h = canvas.height || 500, bw = Math.max(1, x1 - x0), bh = Math.max(1, y1 - y0);
    const sc = Math.max(0.35, Math.min(1.5, Math.min(w / bw, h / bh) * 0.94));
    view = { scale: sc, x: (w - bw * sc) / 2 - x0 * sc, y: (h - bh * sc) / 2 - y0 * sc };
    draw();
  }
  window.fitCircuit = fitCircuit;

  window.launchExactDemoCircuit = function (key) {
    const src = window.EXTRA_LECTURE_PRESETS && window.EXTRA_LECTURE_PRESETS[key];
    if (!src) return;
    const net = JSON.parse(JSON.stringify(src));
    components = net.components || []; wires = net.wires || []; probes = net.probes || [];
    deselectAll(); simData = null; nodeVoltagesLast = {}; window.__dtHint = undefined;
    tStopVal = net.tStop || 0.04;
    nextId = components.reduce((m, c) => Math.max(m, c.id || 0), 0) + 1;
    fitCircuit();
    setStatus('تم تحميل: ' + key.slice(0, 48));
    runSim().then(() => { fitCircuit(); });
  };

  // الأنظمة الأساسية (loadDemo): نتوسّط الدائرة بعد التحميل
  const _ld = window.loadDemo;
  if (typeof _ld === 'function') window.loadDemo = function (name) { window.__dtHint = undefined; const r = _ld.apply(this, arguments); fitCircuit(); return r; };
})();
