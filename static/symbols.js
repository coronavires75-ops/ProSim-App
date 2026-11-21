/* رموز الدوائر القياسية (IEEE/ANSI) بدل المربعات — تُرسم داخل drawComponent بعد translate/rotate، وأماكن الأطراف مطابقة لـ getPins */
function drawSymbolPro(c) {
  let t = c.type; if (t === 'TRIAC' && /SCR|BT15|TYN|2N506|C106|THYR/i.test(c.part || '')) t = 'SCR';   // قطع المحاضرة المسمّاة SCR تُرسم كثايرستور
  const L = (x1, y1, x2, y2) => { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); };
  const tri = (x1, y1, x2, y2, x3, y3) => { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineTo(x3, y3); ctx.closePath(); ctx.stroke(); };
  const txt = (s, x, y, col, sz) => { ctx.save(); ctx.fillStyle = col || '#94a3b8'; ctx.font = `bold ${sz || 9}px monospace`; ctx.textAlign = 'center'; ctx.fillText(s, x, y); ctx.restore(); };
  const dot = (x, y, r) => { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); };
  if (t === 'WATTMETER') {                 // V+ V− يسار (ملف الجهد) ، I+ I− يمين (ملف التيار)
    ctx.fillStyle = '#0b1120'; ctx.fillRect(-26, -26, 52, 52); ctx.strokeRect(-26, -26, 52, 52);
    [[-16, 'V+', -1], [16, 'V−', -1], [-16, 'I+', 1], [16, 'I−', 1]].forEach(([y, n, s]) => { L(s * 40, y, s * 26, y); txt(n, s * 15, y + 3, '#94a3b8', 8); }); txt('W', 0, 7, '#facc15', 20); return true;
  }
  if (t === 'NE555_8') {                   // GND,TRIG,OUT,RESET,CTRL,THR,DIS,VCC
    ctx.fillStyle = '#0b1120'; ctx.fillRect(-26, -36, 52, 72); ctx.strokeRect(-26, -36, 52, 72);
    const P = [[40, 30, 'GND', 1], [-40, -30, 'TRIG', -1], [40, 10, 'OUT', 1], [-40, 30, 'RST', -1], [-40, 10, 'CTRL', -1], [-40, -10, 'THR', -1], [40, -10, 'DIS', 1], [40, -30, 'VCC', 1]];
    P.forEach(([x, y, n, side]) => { L(x, y, side * 26, y); txt(n, side < 0 ? -15 : 15, y + 3, '#94a3b8', 7); }); txt('555', 0, 4, '#e2e8f0', 12); return true;
  }
  if (t === 'VMETER') {
    L(-40, 0, -18, 0); L(18, 0, 40, 0); ctx.beginPath(); ctx.arc(0, 0, 18, 0, Math.PI * 2); ctx.fillStyle = '#0b1120'; ctx.fill(); ctx.stroke();
    txt('V', 0, 5, '#e2e8f0', 15); txt('+', -12, -8, '#f87171', 9); return true;
  }
  if (t === 'OSC') {                       // A..D على اليسار
    ctx.fillStyle = '#0f291a'; ctx.fillRect(-26, -26, 58, 52); ctx.strokeRect(-26, -26, 58, 52); ctx.fillStyle = '#031208'; ctx.fillRect(-18, -20, 46, 34); ctx.strokeStyle = '#16a34a'; ctx.strokeRect(-18, -20, 46, 34);
    ctx.beginPath(); for (let i = 0; i <= 40; i++) { const x = -16 + i, y = -3 + Math.sin(i / 40 * Math.PI * 4) * 9; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.strokeStyle = '#facc15'; ctx.lineWidth = 1.4; ctx.stroke(); ctx.lineWidth = 2.2; ctx.strokeStyle = '#38bdf8';
    [[-18, 'A', '#facc15'], [-6, 'B', '#38bdf8'], [6, 'C', '#f87171'], [18, 'D', '#4ade80']].forEach(([y, n, col]) => { L(-40, y, -26, y); txt(n, -32, y - 2, col, 8); }); txt('OSC', 8, 23, '#94a3b8', 7); return true;
  }
  if (t === 'SCR') {                       // G(-40,0) A(20,-35) K(20,35)
    L(20, -35, 20, -13); tri(8, -13, 32, -13, 20, 11); L(8, 11, 32, 11); L(20, 11, 20, 35); L(-40, 0, -6, 0); L(-6, 0, 14, 11);
    txt('A', 32, -26); txt('K', 32, 30); txt('G', -30, -6); return true;
  }
  if (t === 'TRIAC') {                     // G(-40,0) MT1(20,-35) MT2(20,35) : ثايرستورين متعاكسين
    L(20, -35, 20, -18); tri(8, -18, 32, -18, 20, 0); L(8, 0, 32, 0); tri(8, 18, 32, 18, 20, 0); L(20, 18, 20, 35);
    L(-40, 0, -6, 0); L(-6, 0, 12, 0); txt('MT1', 38, -26, '#94a3b8', 8); txt('MT2', 38, 32, '#94a3b8', 8); txt('G', -30, -6); return true;
  }
  if (t === 'DIAC') {
    L(-40, 0, -14, 0); L(14, 0, 40, 0); tri(-14, -12, -14, 12, 0, 0); tri(14, -12, 14, 12, 0, 0); L(-14, -12, -14, 12); L(14, -12, 14, 12); return true;
  }
  if (t === 'Q') {                         // B(-40,0) C(20,-35) E(20,35)
    const pnp = (c.pol || 'NPN') === 'PNP';
    ctx.save(); ctx.globalAlpha = 0.35; ctx.beginPath(); ctx.arc(2, 0, 27, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    L(-40, 0, -10, 0); L(-10, -16, -10, 16); L(-10, -7, 20, -27); L(20, -27, 20, -35); L(-10, 7, 20, 27); L(20, 27, 20, 35);
    ctx.beginPath(); if (!pnp) { ctx.moveTo(20, 27); ctx.lineTo(12, 26); ctx.lineTo(17, 19); } else { ctx.moveTo(-10, 7); ctx.lineTo(-1, 9); ctx.lineTo(-4, 16); } ctx.closePath(); ctx.fill();
    txt('B', -30, -6); txt('C', 30, -30); txt('E', 30, 38); return true;
  }
  if (t === 'M') {                         // G(-40,0) D(20,-35) S(20,35)
    const p = (c.pol || 'N') === 'P';
    L(-40, 0, -14, 0); L(-14, -16, -14, 16); [[-16, -8], [-4, 4], [8, 16]].forEach(([a, b]) => L(-6, a, -6, b));
    L(-6, -12, 20, -12); L(20, -12, 20, -35); L(-6, 12, 20, 12); L(20, 12, 20, 35); L(-6, 0, 20, 0); L(20, 0, 20, 12);
    ctx.beginPath(); if (!p) { ctx.moveTo(-6, 0); ctx.lineTo(2, -4); ctx.lineTo(2, 4); } else { ctx.moveTo(8, 0); ctx.lineTo(0, -4); ctx.lineTo(0, 4); } ctx.closePath(); ctx.fill();
    txt('G', -30, -6); txt('D', 30, -28); txt('S', 30, 34); return true;
  }
  if (t === 'TRF') {                       // (-40,-16)(-40,16) | (40,-16)(40,16)
    L(-40, -16, -14, -16); L(-40, 16, -14, 16); L(40, -16, 14, -16); L(40, 16, 14, 16);
    for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(-14, -12 + k * 8, 4, -Math.PI / 2, Math.PI / 2); ctx.stroke(); ctx.beginPath(); ctx.arc(14, -12 + k * 8, 4, Math.PI / 2, -Math.PI / 2); ctx.stroke(); }
    L(-3, -18, -3, 18); L(3, -18, 3, 18); return true;
  }
  if (t === 'BRIDGE') {                    // AC (-40,±16) | DC+ (40,-16) DC- (40,16)
    ctx.beginPath(); ctx.moveTo(0, -26); ctx.lineTo(26, 0); ctx.lineTo(0, 26); ctx.lineTo(-26, 0); ctx.closePath(); ctx.stroke();
    L(-40, -16, -18, -16); L(-18, -16, -13, -13); L(-40, 16, -18, 16); L(-18, 16, -13, 13); L(40, -16, 18, -16); L(18, -16, 13, -13); L(40, 16, 18, 16); L(18, 16, 13, 13);
    tri(-3, -17, 3, -17, 0, -11); tri(-3, 17, 3, 17, 0, 11); txt('~', -20, 4, '#38bdf8', 12); txt('+', 20, -18, '#f87171', 11); txt('−', 20, 24, '#94a3b8', 11); return true;
  }
  if (t === 'OP' || t === 'COMPARATOR' || t === 'PID') {   // (-40,-12)(-40,12)(40,0)
    tri(-26, -26, -26, 26, 30, 0); L(-40, -12, -26, -12); L(-40, 12, -26, 12); L(30, 0, 40, 0);
    txt(t === 'PID' ? 'SP' : '+', -19, -9, '#f87171', 10); txt(t === 'PID' ? 'FB' : '−', -19, 17, '#94a3b8', 10); if (t !== 'OP') txt(t === 'PID' ? 'PID' : 'CMP', -2, 3, '#e2e8f0', 9); return true;
  }
  if (['AND', 'OR', 'NAND', 'NOR', 'XOR', 'XNOR'].includes(t)) {   // (-40,-12)(-40,12)(40,0)
    const inv = /^(NAND|NOR|XNOR)$/.test(t), orLike = /OR$/.test(t); const xr = t === 'XOR' || t === 'XNOR';
    ctx.beginPath();
    if (!orLike) { ctx.moveTo(-22, -17); ctx.lineTo(2, -17); ctx.arc(2, 0, 17, -Math.PI / 2, Math.PI / 2); ctx.lineTo(-22, 17); ctx.closePath(); }
    else { ctx.moveTo(-24, -17); ctx.quadraticCurveTo(8, -17, 24, 0); ctx.quadraticCurveTo(8, 17, -24, 17); ctx.quadraticCurveTo(-12, 0, -24, -17); }
    ctx.stroke(); if (xr) { ctx.beginPath(); ctx.moveTo(-29, -17); ctx.quadraticCurveTo(-17, 0, -29, 17); ctx.stroke(); }
    L(-40, -12, -22, -12); L(-40, 12, -22, 12);
    const xe = orLike ? 24 : 19; if (inv) { ctx.beginPath(); ctx.arc(xe + 3.5, 0, 3.5, 0, Math.PI * 2); ctx.stroke(); L(xe + 7, 0, 40, 0); } else L(xe, 0, 40, 0);
    return true;
  }
  if (t === 'NOT' || t === 'BUF') { tri(-16, -15, -16, 15, 14, 0); L(-40, 0, -16, 0); if (t === 'NOT') { ctx.beginPath(); ctx.arc(17.5, 0, 3.5, 0, Math.PI * 2); ctx.stroke(); L(21, 0, 40, 0); } else L(14, 0, 40, 0); return true; }
  if (t === 'SW' || t === 'PUSH_BTN') {
    const closed = t === 'SW' ? c.closed !== false : !!c.closed;
    L(-40, 0, -14, 0); L(14, 0, 40, 0); dot(-14, 0, 2.6); dot(14, 0, 2.6);
    if (closed) L(-14, 0, 14, 0); else L(-14, 0, 11, -15); if (t === 'PUSH_BTN') { L(-3, -22, -3, closed ? -4 : -14); L(-9, -22, 3, -22); } return true;
  }
  if (t === 'L') {
    L(-40, 0, -24, 0); L(24, 0, 40, 0); for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(-18 + k * 12, 0, 6, Math.PI, 0); ctx.stroke(); } return true;
  }
  if (t === 'REG') {                       // (-40,0)(0,30)(40,0)
    ctx.fillStyle = '#0f172a'; ctx.fillRect(-26, -18, 52, 36); ctx.strokeRect(-26, -18, 52, 36); L(-40, 0, -26, 0); L(26, 0, 40, 0); L(0, 18, 0, 30);
    txt(c.part.slice(0, 8), 0, 4, '#e2e8f0', 10); txt('IN', -19, -6, '#94a3b8', 7); txt('OUT', 17, -6, '#94a3b8', 7); txt(/317|337/.test(c.part) ? 'ADJ' : 'GND', 9, 28, '#94a3b8', 7); return true;
  }
  return false;
}
