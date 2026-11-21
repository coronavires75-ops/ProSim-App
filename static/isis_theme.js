/* ثيم ISIS (Proteus): خلفية صفراء فاتحة، رموز بنية/حمراء داكنة، أسلاك خضراء. يطبَّق على لوحة الدائرة (#board) فقط. */
(function () {
  const MAP = {
    '#38bdf8': '#7f1d1d', '#facc15': '#c026d3', '#10b981': '#047857', '#f59e0b': '#c2410c', '#3b82f6': '#1d4ed8',
    '#0b1120': '#ffffd2', '#111827': '#ffffd2', '#0f172a': '#ffffd2', '#090d16': '#ffffd2', '#1e293b': '#d6d6a8',
    '#cbd5e1': '#1e3a8a', '#e2e8f0': '#1e3a8a', '#94a3b8': '#475569', '#f8fafc': '#1e3a8a', '#7c8ea8': '#475569',
    '#fff': '#1e3a8a', '#ffffff': '#1e3a8a', 'rgba(15,23,42,0.9)': 'rgba(255,255,214,0.92)'
  };
  window.ISIS_ON = localStorage.getItem('prosim_isis') !== '0';
  const proto = CanvasRenderingContext2D.prototype;
  ['fillStyle', 'strokeStyle'].forEach(prop => {
    const d = Object.getOwnPropertyDescriptor(proto, prop);
    Object.defineProperty(proto, prop, { configurable: true, enumerable: true, get: d.get,
      set(v) { if (window.ISIS_ON && this.canvas && this.canvas.id === 'board' && typeof v === 'string') { const m = MAP[v.toLowerCase().replace(/\s/g, '')]; if (m) v = m; } d.set.call(this, v); } });
  });
  function apply() { const c = document.getElementById('board'); if (!c) return; c.style.background = window.ISIS_ON && typeof viewMode !== 'undefined' && viewMode === 'schematic' ? '#ffffe8' : ''; const b = document.getElementById('isisBtn'); if (b) b.classList.toggle('active', window.ISIS_ON); if (typeof draw === 'function') draw(); }
  window.toggleISIS = function () { window.ISIS_ON = !window.ISIS_ON; localStorage.setItem('prosim_isis', window.ISIS_ON ? '1' : '0'); apply(); };
  window.addEventListener('load', () => setTimeout(apply, 50));
})();
