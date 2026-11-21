"""سجل نماذج القطع: أولوية صريحة  (حقول المستخدم) > (.MODEL ملصوق) > (قاعدة القطع) > (النموذج العام).
يدعم قراءة سطور .MODEL من SPICE للدايود (D) والترانزستور ثنائي القطبية (NPN/PNP) والـ MOSFET (NMOS/PMOS, Level-1)."""
import math, re

VT = 0.02585
_SUFFIX = [('meg', 1e6), ('mil', 25.4e-6), ('t', 1e12), ('g', 1e9), ('k', 1e3), ('m', 1e-3), ('u', 1e-6), ('µ', 1e-6), ('n', 1e-9), ('p', 1e-12), ('f', 1e-15)]

def spice_num(tok):
    """يحوّل رقماً بصيغة SPICE (4.7k, 2.52n, 1meg, 1e-14) إلى float"""
    s = str(tok).strip().lower()
    m = re.match(r'^([+-]?\d*\.?\d+(?:e[+-]?\d+)?)([a-zµ]*)', s)
    if not m: raise ValueError(f"رقم غير مفهوم: '{tok}'")
    v = float(m.group(1)); suf = m.group(2)
    for k, mult in _SUFFIX:
        if suf.startswith(k): return v * mult
    return v

def parse_model_text(text):
    """يرجع (name, kind, params{lower:float}, extra{}) أو يرفع ValueError. kind ∈ D | NPN | PNP | NMOS | PMOS"""
    lines = []
    for ln in str(text).splitlines():
        ln = ln.split(';')[0].strip()
        if not ln or ln.startswith('*'): continue
        if ln.startswith('+') and lines: lines[-1] += ' ' + ln[1:]
        else: lines.append(ln)
    joined = ' '.join(lines)
    m = re.search(r'\.model\s+(\S+)\s+([A-Za-z]+)\s*\(?(.*?)\)?\s*$', joined, re.I | re.S)
    if not m: raise ValueError('لم أجد سطر .MODEL صالح (مثال: .MODEL D1N4148 D(IS=2.52n N=1.752 RS=0.568 BV=100))')
    name, kind, body = m.group(1), m.group(2).upper(), m.group(3)
    if kind not in ('D', 'NPN', 'PNP', 'NMOS', 'PMOS'):
        raise ValueError(f"نوع الموديل '{kind}' غير مدعوم (المدعوم: D, NPN, PNP, NMOS, PMOS). موديلات .SUBCKT غير مدعومة.")
    params = {}
    for k, v in re.findall(r'([A-Za-z_][A-Za-z0-9_]*)\s*=\s*([^\s,()]+)', body):
        try: params[k.lower()] = spice_num(v)
        except ValueError: pass
    return name, kind, params

# ---- ما يفهمه الـ solver من كل نوع، وما يُتجاهل (يُسجَّل كتحذير شفاف للمستخدم) ----
_USED = {'D': {'is', 'n', 'rs', 'bv'}, 'NPN': {'is', 'bf', 'br', 'vaf', 'va', 'nf'}, 'PNP': {'is', 'bf', 'br', 'vaf', 'va', 'nf'}, 'NMOS': {'vto', 'kp', 'lambda', 'w', 'l', 'level'}, 'PMOS': {'vto', 'kp', 'lambda', 'w', 'l', 'level'}}
_IGNORED_NOTE = {'cjo': 'سعة الوصلة', 'cje': 'سعة الوصلة', 'cjc': 'سعة الوصلة', 'tt': 'زمن العبور', 'tf': 'زمن العبور', 'tr': 'زمن العبور', 'rb': 'مقاومة طفيلية', 'rc': 'مقاومة طفيلية', 're': 'مقاومة طفيلية',
                 'ikf': 'تقليل β عند التيار العالي', 'ise': 'تسريب الوصلة', 'ne': 'تسريب الوصلة', 'vj': 'سعة', 'm': 'سعة', 'xti': 'حرارة', 'eg': 'حرارة', 'ibv': 'تيار الانهيار', 'cgso': 'سعات', 'cgdo': 'سعات', 'rd': 'مقاومة طفيلية', 'rs_mos': 'مقاومة طفيلية', 'gamma': 'تأثير الجسم', 'phi': 'تأثير الجسم'}

def from_model(kind, params):
    """يحوّل باراميترات SPICE إلى باراميترات الـ solver + قائمة المتجاهَل"""
    p, ignored = {}, []
    used = _USED[kind]
    for k in params:
        if k not in used and k not in ('level',):
            ignored.append(k.upper() + (f' ({_IGNORED_NOTE[k]})' if k in _IGNORED_NOTE else ''))
    if kind == 'D':
        if 'is' in params: p['Is'] = params['is']
        if 'n' in params: p['n'] = params['n']
        if 'rs' in params: p['rs'] = params['rs']
        if 'bv' in params: p['bv'] = params['bv']
    elif kind in ('NPN', 'PNP'):
        p['pol'] = kind
        if 'is' in params: p['Is'] = params['is']
        if 'bf' in params: p['bf'] = params['bf']
        if 'br' in params: p['br'] = params['br']
        if 'vaf' in params or 'va' in params: p['vaf'] = params.get('vaf', params.get('va'))
        if 'nf' in params: p['nf'] = params['nf']
    else:
        p['pol'] = 'N' if kind == 'NMOS' else 'P'
        if 'vto' in params: p['vth'] = abs(params['vto'])
        kp = params.get('kp', 2e-5 if 'kp' not in params else None)
        if 'w' in params and 'l' in params and params['l'] > 0: kp = kp * params['w'] / params['l']
        if kp is not None: p['kp'] = kp
        if 'lambda' in params: p['lambda'] = params['lambda']
        if params.get('level', 1) not in (1, 0): ignored.append(f"LEVEL={int(params['level'])} (يُحاكى كـ Level-1)")
    return p, ignored

# ---- قاعدة القطع: (kind, params) ؛ المصدر 'typical' = باراميترات SPICE شائعة، 'fit' = مضبوطة على Vf النموذجي من الـ datasheet ----
def _fit_diode(vf, i_f, n, rs):
    return {'Is': i_f / math.expm1(max(0.1, vf - i_f * rs) / (n * VT)), 'n': n, 'rs': rs}

LIB = {}
def _add(names, kind, params, src, **extra):
    for nm in names.split():
        LIB[nm.upper()] = {'kind': kind, 'p': dict(params, **extra), 'src': src}

for nm, bv in (('1N4001', 50), ('1N4002', 100), ('1N4003', 200), ('1N4004', 400), ('1N4005', 600), ('1N4006', 800), ('1N4007', 1000)):
    _add(nm, 'D', {'Is': 76.9e-12, 'n': 1.45, 'rs': 0.042}, 'typical', bv=bv)
_add('1N4148 1N914 1N4448 1N4150', 'D', {'Is': 2.52e-9, 'n': 1.752, 'rs': 0.568}, 'typical', bv=100)
for nm in '1N5400 1N5401 1N5402 1N5404 1N5406 1N5407 1N5408'.split(): _add(nm, 'D', _fit_diode(0.9, 3.0, 1.5, 0.01), 'fit', bv=1000)
_add('1N5817', 'D', _fit_diode(0.38, 1.0, 1.1, 0.04), 'fit', bv=20); _add('1N5818', 'D', _fit_diode(0.42, 1.0, 1.1, 0.04), 'fit', bv=30)
_add('1N5819 SS14 SS34 SB140', 'D', _fit_diode(0.45, 1.0, 1.1, 0.04), 'fit', bv=40); _add('1N5822 SB340 SS36', 'D', _fit_diode(0.45, 3.0, 1.1, 0.02), 'fit', bv=40)
_add('BAT54 BAT85 BAT46', 'D', _fit_diode(0.40, 0.01, 1.05, 3.0), 'fit', bv=30)
_add('UF4007 UF4004 UF4001', 'D', _fit_diode(1.3, 1.0, 1.8, 0.05), 'fit', bv=1000); _add('FR107 FR104 FR101', 'D', _fit_diode(1.1, 1.0, 1.6, 0.05), 'fit', bv=1000)
_add('BY255 BY399', 'D', _fit_diode(1.1, 3.0, 1.7, 0.02), 'fit', bv=1300)
# BJT (PSpice-style typical sets)
_add('2N2222 2N2222A PN2222 P2N2222A', 'NPN', {'Is': 14.34e-15, 'bf': 255.9, 'br': 6.092, 'vaf': 74.03}, 'typical')
_add('2N3904 MMBT3904', 'NPN', {'Is': 6.734e-15, 'bf': 416.4, 'br': 0.7371, 'vaf': 74.03}, 'typical')
_add('2N3906 MMBT3906', 'PNP', {'Is': 1.41e-15, 'bf': 180.7, 'br': 4.977, 'vaf': 18.7}, 'typical')
_add('BC547 BC547B BC548 BC549', 'NPN', {'Is': 7.0e-15, 'bf': 375.0, 'br': 4.0, 'vaf': 74.0}, 'typical')
_add('BC557 BC557B BC558 BC559', 'PNP', {'Is': 3.0e-14, 'bf': 300.0, 'br': 4.0, 'vaf': 52.0}, 'typical')
_add('2N2907 2N2907A', 'PNP', {'Is': 1.1e-14, 'bf': 200.0, 'br': 4.0, 'vaf': 50.0}, 'typical')

# زينر: Vz و rz
_RZ = [(3.3, 10), (3.6, 9), (3.9, 9), (4.3, 9), (4.7, 8), (5.1, 7), (5.6, 5), (6.2, 2), (6.8, 3.5), (7.5, 4), (8.2, 4.5), (9.1, 5), (10, 7), (11, 8), (12, 9), (13, 10), (15, 14), (16, 16), (18, 20), (20, 22), (22, 23), (24, 25), (27, 35), (30, 40)]
def zener_rz(vz):
    if vz <= _RZ[0][0]: return _RZ[0][1]
    for (v0, r0), (v1, r1) in zip(_RZ, _RZ[1:]):
        if v0 <= vz <= v1: return r0 + (r1 - r0) * (vz - v0) / (v1 - v0)
    return _RZ[-1][1] * vz / _RZ[-1][0]

# النماذج العامة عند غياب أي معلومة
GENERIC = {'D': {'Is': 2.55e-9, 'n': 1.75, 'rs': 0.05}, 'Q': {'Is': 1.4e-14, 'bf': 200.0, 'br': 4.0, 'vaf': 100.0}, 'M': {'vth': 2.5, 'kp': 2.0, 'lambda': 0.01}}

def _num(v):
    try:
        if v is None or v == '': return None
        return spice_num(v) if isinstance(v, str) else float(v)
    except Exception: return None

_EXPLICIT = {'D': ('Is', 'n', 'rs', 'bv'), 'Q': ('Is', 'bf', 'br', 'vaf', 'nf'), 'M': ('vth', 'kp', 'lambda'), 'LED': ('vf', 'Is', 'n', 'rs'), 'Z': ('rz',)}

def resolve(comp, ctype, part, legacy):
    """يرجع (params, note). legacy = قيمة PART_MODELS القديمة (أو None)"""
    key = str(part).upper(); pol_default = comp.get('pol')
    note = {'id': comp.get('id'), 'part': part, 'type': ctype, 'source': 'generic', 'ignored': [], 'warn': None}
    base = {}
    kind_map = {'D': ('D',), 'LED': ('D',), 'Z': ('D',), 'Q': ('NPN', 'PNP'), 'M': ('NMOS', 'PMOS')}
    txt = (comp.get('model') or '').strip()
    if txt:
        try:
            name, kind, params = parse_model_text(txt)
            if kind not in kind_map.get(ctype, ()):
                note['warn'] = f"نوع الموديل {kind} لا يناسب قطعة من نوع {ctype} — تم تجاهل الموديل"
            else:
                base, ign = from_model(kind, params); note.update(source='user-model', model_name=name, ignored=ign)
        except ValueError as e:
            note['warn'] = 'خطأ في .MODEL: ' + str(e)
    if not base and key in LIB and ctype in ('D', 'Q', 'M', 'Z') and LIB[key]['kind'] in kind_map.get(ctype, ()):
        base = dict(LIB[key]['p']); note['source'] = 'library-' + LIB[key]['src']
        if LIB[key]['kind'] in ('NPN', 'PNP'): base['pol'] = LIB[key]['kind']        # كان PNP المكتبة يُحاكى كـ NPN
        elif LIB[key]['kind'] in ('NMOS', 'PMOS'): base['pol'] = 'N' if LIB[key]['kind'] == 'NMOS' else 'P'
    if not base and legacy is not None:
        if ctype == 'D': base = {'Is': legacy[0], 'n': legacy[1], 'rs': legacy[2], 'bv': legacy[3]}
        elif ctype == 'Q': base = {'Is': legacy[0], 'bf': legacy[1], 'pol': legacy[2]}
        elif ctype == 'M': base = {'vth': legacy[0], 'kp': legacy[1], 'pol': legacy[2]}
        elif ctype == 'LED': base = {'vf': float(legacy)}
        elif ctype == 'Z': base = {'val': float(legacy)}
        note['source'] = 'library-legacy'
    g = GENERIC.get(ctype if ctype in GENERIC else ('D' if ctype in ('LED', 'Z') else ctype), {})
    out = dict(g) if ctype in GENERIC else {}
    out.update(base)
    for k in _EXPLICIT.get(ctype, ()):
        v = _num(comp.get(k))
        if v is not None: out[k] = v; note['source'] = 'explicit' if note['source'] == 'generic' else note['source']
    if ctype in ('Q', 'M'):
        out['pol'] = out.get('pol') or pol_default or ('NPN' if ctype == 'Q' else 'N')
    if comp.get('generic_part') and note['source'] in ('explicit', 'generic', 'library-legacy'):
        note['source'] = 'generic'          # قطعة من الكتالوج بلا نموذج حقيقي => لازم يظهر التحذير
    if note['source'] == 'generic': note['warn'] = note['warn'] or f"لا يوجد نموذج خاص لـ '{part}' — استُخدم نموذج عام ({ctype}). للدقة العالية الصق .MODEL الرسمي."
    return out, note
