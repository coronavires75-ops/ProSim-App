"""مقارنة ProSim مع ngspice (محرك SPICE3 — نفس عائلة محرك بروتس) على نفس الدوائر ونفس باراميترات النماذج."""
import sys, json, subprocess, tempfile, os, math
import numpy as np, requests
ROOT = sys.argv[1] if len(sys.argv) > 1 else '.'; sys.path.insert(0, ROOT); import models
URL = 'http://127.0.0.1:5000/simulate'

def lib(part):
    e = models.LIB[part.upper()]; return e['kind'], e['p']

def spice_model(name, kind, p):
    if kind == 'D': return f".model {name} D(IS={p['Is']} N={p['n']} RS={p['rs']} BV={p.get('bv',1000)} IBV=1e-3)"
    if kind in ('NPN', 'PNP'): return f".model {name} {kind}(IS={p['Is']} BF={p['bf']} BR={p.get('br',4)} VAF={p.get('vaf',100)} NF={p.get('nf',1)})"
    if kind in ('NMOS', 'PMOS'): return f".model {name} {kind}(LEVEL=1 VTO={(1 if kind=='NMOS' else -1)*p['vth']} KP={p['kp']} LAMBDA={p.get('lambda',0)})"

def vsrc(spec):
    dc, amp, f = spec.get('dc', 0), spec.get('amp', 0), spec.get('freq', 0)
    if spec.get('wave') == 'square':
        T = 1 / f; return f"PULSE({dc} {dc+amp} 0 1n 1n {T*spec.get('duty',0.5)-2e-9} {T})"
    if amp and f: return f"SIN({dc} {amp} {f} 0 0 {spec.get('phase',0)})"
    return f"DC {dc}"

def run(name, n, comps, tstop, probe):
    # ProSim
    r = requests.post(URL, json=dict(num_nodes=n, t_stop=tstop, components=comps)).json()
    if r.get('status') != 'success': print('ERR', name, r.get('message')); return None
    t1 = np.array(r['times']); y1 = np.array(r['voltages'][probe - 1])
    # SPICE
    lines = [name]; models_ = {}
    for c in comps:
        t, p = c['type'], c['pins']; i = c['id']
        if t == 'V': lines.append(f"V{i} {p[0]} {p[1]} {vsrc(c)}")
        elif t == 'VCC': lines.append(f"V{i} {p[0]} 0 DC {c['val']}")
        elif t == 'R': lines.append(f"R{i} {p[0]} {p[1]} {c['val']}")
        elif t in ('C', 'CELEC'): lines.append(f"C{i} {p[0]} {p[1]} {c['val']}")
        elif t == 'L': lines.append(f"L{i} {p[0]} {p[1]} {c['val']}")
        elif t == 'D':
            k, mp = lib(c['part']); models_[c['part']] = spice_model('M' + c['part'], k, mp); lines.append(f"D{i} {p[0]} {p[1]} M{c['part']}")
        elif t == 'Q':
            k, mp = lib(c['part']); models_[c['part']] = spice_model('M' + c['part'], k, mp); lines.append(f"Q{i} {p[1]} {p[0]} {p[2]} M{c['part']}")
        elif t == 'M':
            mp = {'vth': c['vth'], 'kp': c['kp'], 'lambda': c.get('lambda', 0.01)}; k = 'NMOS' if c.get('pol', 'N') == 'N' else 'PMOS'
            models_['M' + str(i)] = spice_model(f'MM{i}', k, mp); lines.append(f"M{i} {p[1]} {p[0]} {p[2]} {p[2]} MM{i}")
        elif t == 'LED':
            import solver as _s
            Is, nvt, rs = _s._led_params(c); models_['LED'+str(i)] = f".model MLED{i} D(IS={Is} N={nvt/_s.VT_THERMAL} RS={rs})"; lines.append(f"D{i} {p[0]} {p[1]} MLED{i}")
        elif t == 'OP': lines.append(f"E{i} {p[2]} 0 {p[0]} {p[1]} 1e5")
    lines += list(models_.values())
    out = tempfile.mktemp(suffix='.txt')
    lines += ['.options reltol=1e-5 abstol=1e-12 vntol=1e-7 method=gear', f'.tran {tstop/20000} {tstop} 0 {tstop/20000}', '.control', 'run', f'wrdata {out} v({probe})', '.endc', '.end']
    f = tempfile.mktemp(suffix='.cir'); open(f, 'w').write('\n'.join(lines))
    subprocess.run(['ngspice', '-b', f], capture_output=True, timeout=120)
    d = np.loadtxt(out); t2, y2 = d[:, 0], d[:, 1]
    aborted = t2[-1] < 0.99 * tstop
    keep = t1 <= t2[-1]; t1, y1 = t1[keep], y1[keep]
    y2i = np.interp(t1, t2, y2)
    scale = max(1e-3, float(np.max(np.abs(y2))))
    # نستبعد عيّنات الحواف الحادة فقط (تبديل لحظي في ProSim مقابل 1ns في SPICE) — باقي الموجة يُقارن كاملاً
    jump = np.zeros(len(y1), bool); dj = np.abs(np.diff(y1)) > 0.2 * scale; jump[1:] |= dj; jump[:-1] |= dj
    m = ~jump if (~jump).sum() > 10 else np.ones(len(y1), bool)
    err = float(np.sqrt(np.mean((y1[m] - y2i[m]) ** 2))) / scale * 100
    pk = float(np.max(np.abs(y1[m] - y2i[m]))) / scale * 100
    status = 'PASS' if err < 0.5 else ('WARN' if err < 2 else 'FAIL')
    if aborted: status += f' (ngspice توقف عند {t2[-1]*1e3:.2f}ms — قورن حتى هناك)'
    print(f"{status} {name:42s} RMS err {err:7.3f}%  peak err {pk:7.3f}%  ProSim max {y1.max():8.4f}  SPICE max {y2.max():8.4f}  min {y1.min():8.4f}/{y2.min():8.4f}")
    if 'Full-wave' in name:
        i=int(np.argmax(np.abs(y1-y2i))); print('   worst at t=%.5f prosim %.4f spice %.4f'%(t1[i],y1[i],y2i[i]))
    return err

V = lambda i, p, **k: dict(id=i, type='V', part='AC', pins=p, **k)
R = lambda i, p, v: dict(id=i, type='R', part='R', pins=p, val=v)
C = lambda i, p, v: dict(id=i, type='C', part='C', pins=p, val=v)
L = lambda i, p, v: dict(id=i, type='L', part='L', pins=p, val=v)
D = lambda i, p, part: dict(id=i, type='D', part=part, pins=p)
Q = lambda i, p, part: dict(id=i, type='Q', part=part, pins=p)

tests = [
 ('RC low-pass 1kHz', 2, [V(1,[1,0],amp=5,freq=1000,wave='sine'), R(2,[1,2],'1000'), C(3,[2,0],'0.1u')], 0.005, 2),
 ('RLC series ring (square)', 3, [V(1,[1,0],amp=5,freq=200,wave='square'), R(2,[1,2],'10'), L(3,[2,3],'10m'), C(4,[3,0],'10u')], 0.01, 3),
 ('Phase-shifted source 90deg + RC', 2, [V(1,[1,0],amp=10,freq=50,wave='sine',phase=90), R(2,[1,2],'1k'), C(3,[2,0],'4.7u')], 0.04, 2),
 ('Half-wave 1N4007 + 100uF', 2, [V(1,[1,0],amp=17,freq=50,wave='sine'), D(2,[1,2],'1N4007'), C(3,[2,0],'100u'), R(4,[2,0],'1k')], 0.06, 2),
 ('Full-wave 4x1N4007 + 470uF', 4, [V(1,[1,2],amp=17,freq=50,wave='sine'), D(2,[1,3],'1N4007'), D(3,[2,3],'1N4007'), D(4,[0,1],'1N4007'), D(5,[0,2],'1N4007'), C(6,[3,0],'470u'), R(7,[3,0],'470')], 0.06, 3),
 ('1N4148 clipper 10V sine', 2, [V(1,[1,0],amp=10,freq=1000,wave='sine'), R(2,[1,2],'1k'), D(3,[2,0],'1N4148'), D(4,[0,2],'1N4148')], 0.003, 2),
 ('Schottky 1N5819 half-wave', 2, [V(1,[1,0],amp=5,freq=1000,wave='sine'), D(2,[1,2],'1N5819'), R(3,[2,0],'100')], 0.003, 2),
 ('Voltage doubler 1N4007', 3, [V(1,[1,0],amp=10,freq=50,wave='sine'), C(2,[1,2],'100u'), D(3,[0,2],'1N4007'), D(4,[2,3],'1N4007'), C(5,[3,0],'100u'), R(6,[3,0],'10k')], 0.1, 3),
 ('BJT 2N2222 CE amp (10mV 1kHz)', 5, [dict(id=1,type='VCC',part='V',pins=[1,0],val=12), V(2,[5,0],amp=0.01,freq=1000,wave='sine'), C(3,[5,2],'10u'), R(4,[1,2],'47k'), R(5,[2,0],'10k'), R(6,[1,3],'2.2k'), Q(7,[2,3,4],'2N2222'), R(8,[4,0],'470'), C(9,[4,0],'100u')], 0.01, 3),
 ('BJT BC547 switch (square base)', 4, [dict(id=1,type='VCC',part='V',pins=[1,0],val=9), V(2,[2,0],amp=5,freq=1000,wave='square'), R(3,[2,3],'4.7k'), R(4,[1,4],'1k'), Q(5,[3,4,0],'BC547')], 0.003, 4),
 ('PNP 2N3906 emitter follower', 3, [dict(id=1,type='VCC',part='V',pins=[1,0],val=12), V(2,[2,0],amp=2,freq=1000,dc=5,wave='sine'), Q(3,[2,0,3],'2N3906'), R(4,[3,1],'1k')], 0.003, 3),
 ('NMOS switch Level-1', 3, [dict(id=1,type='VCC',part='V',pins=[1,0],val=12), V(2,[2,0],amp=10,freq=1000,wave='square'), R(3,[1,3],'100'), dict(id=4,type='M',part='IRFZ44N',pins=[2,3,0],vth=2.5,kp=2.0,pol='N')], 0.003, 3),
 ('NMOS common-source amp', 3, [dict(id=1,type='VCC',part='V',pins=[1,0],val=12), V(2,[2,0],amp=0.1,dc=3.0,freq=1000,wave='sine'), R(3,[1,3],'1k'), dict(id=4,type='M',part='X',pins=[2,3,0],vth=2.0,kp=0.02,lambda_=0,pol='N')], 0.003, 3),
 ('Inverting op-amp x-10', 3, [V(1,[1,0],amp=0.5,freq=1000,wave='sine'), R(2,[1,2],'1k'), R(3,[2,3],'10k'), dict(id=4,type='OP',part='LM741',pins=[0,2,3])], 0.003, 3),
 ('Op-amp integrator (square)', 3, [V(1,[1,0],amp=1,dc=-0.5,freq=1000,wave='square'), R(2,[1,2],'10k'), C(3,[2,3],'100n'), R(5,[2,3],'0.1meg'), dict(id=4,type='OP',part='LM741',pins=[0,2,3])], 0.005, 3),
 ('Red LED 1.85V on 12V sine', 2, [V(1,[1,0],amp=12,freq=100,wave='sine'), R(2,[1,2],'470'), dict(id=3,type='LED',part='LED-RED',pins=[2,0],vf=1.85)], 0.02, 2),
 ('RL + flyback diode, NMOS chopper', 4, [dict(id=1,type='VCC',part='V',pins=[1,0],val=12), V(2,[2,0],amp=10,freq=2000,wave='square'), dict(id=3,type='L',part='L',pins=[1,4],val='10m'), R(4,[4,3],'10'), D(5,[3,1],'1N4148'), dict(id=6,type='M',part='X',pins=[2,3,0],vth=2.5,kp=2.0,pol='N')], 0.004, 3),
 ('Darlington-ish 2x2N3904 + RC', 4, [dict(id=1,type='VCC',part='V',pins=[1,0],val=10), V(2,[2,0],amp=1,dc=2.0,freq=500,wave='sine'), Q(3,[2,1,3],'2N3904'), Q(4,[3,1,4],'2N3904'), R(5,[4,0],'1k'), C(6,[4,0],'1u'), R(7,[3,0],'100k')], 0.006, 4),
]
for t in tests:
    if t[2] and any(c.get('lambda_') is not None for c in t[2]):
        for c in t[2]:
            if 'lambda_' in c: c['lambda'] = c.pop('lambda_')
    run(*t)
