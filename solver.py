import numpy as np
import math


def _ex(a):
    """exp مع امتداد خطي بعد 40 لتفادي الـ overflow مع بقاء الاشتقاق متسقاً"""
    return math.exp(a) if a <= 40.0 else math.exp(40.0) * (1.0 + a - 40.0)

def _exd(a):
    return math.exp(a) if a <= 40.0 else math.exp(40.0)

def _diode_iv(V, Is, nVt, rs):
    """دايود SPICE مع مقاومة تسلسلية Rs: يحل Vd + Rs*Id(Vd) = V ويرجع (I, g) عند طرفي الدايود الخارجيين."""
    vd = min(V, 0.95)
    i = g = 0.0
    for _ in range(40):
        a = vd / nVt
        i = Is * (_ex(a) - 1.0)
        g = Is / nVt * _exd(a)
        f = vd + rs * i - V
        fp = 1.0 + rs * g
        dv = f / fp
        if dv > 0.3: dv = 0.3
        elif dv < -0.3: dv = -0.3
        vd -= dv
        if abs(dv) < 1e-13:
            break
    a = vd / nVt
    i = Is * (_ex(a) - 1.0)
    g = Is / nVt * _exd(a)
    return i, g / (1.0 + rs * g) + 1e-12

VT_THERMAL = 0.02585

def _pnjlim(vnew, vold, vt, vcrit):
    """تحديد قفزة جهد الوصلة بين تكرارات Newton (مثل SPICE) لضمان التقارب عند التشبّع والتحيز الأمامي القوي"""
    if vnew > vcrit and abs(vnew - vold) > 2.0 * vt:
        if vold > 0:
            arg = 1.0 + (vnew - vold) / vt
            vnew = vold + vt * math.log(arg) if arg > 0 else vcrit
        else:
            vnew = vt * math.log(max(vnew / vt, 1e-30))
    return vnew


def _led_params(el):
    if el.get('Is'):
        return float(el['Is']), float(el.get('n', 2.0)) * VT_THERMAL, float(el.get('rs', 3.0))
    vf = float(el.get('vf', 1.85) or 1.85)
    n = 2.0
    rs = 3.0
    nvt = n * VT_THERMAL
    Is = 0.02 / _ex(max(0.2, vf - 0.02 * rs) / nvt)
    return Is, nvt, rs


def _jcap_q_c(v, cjo=0.0, vj=0.75, m=0.333, tt=0.0, i_fwd=0.0, g_fwd=0.0):
    """نموذج شحنة الوصلة غير الخطية + سعة الانتشار (SPICE): يرجع (Q, C=dQ/dv)."""
    q = 0.0
    c = 0.0
    if cjo > 0.0:
        vj = max(0.1, float(vj or 0.75))
        m = max(0.05, min(0.9, float(m or 0.333)))
        fc = 0.5
        v_fc = fc * vj
        if v <= v_fc:
            arg = max(1e-6, 1.0 - v / vj)
            c_dep = cjo * (arg ** (-m))
            q_dep = (cjo * vj / (1.0 - m)) * (1.0 - arg ** (1.0 - m))
        else:
            f1 = (1.0 - fc) ** (-(1.0 + m))
            q_fc = (cjo * vj / (1.0 - m)) * (1.0 - (1.0 - fc) ** (1.0 - m))
            dv = v - v_fc
            c_fc = cjo * ((1.0 - fc) ** (-m))
            slope = cjo * m * f1 / vj
            c_dep = c_fc + slope * dv
            q_dep = q_fc + c_fc * dv + 0.5 * slope * dv * dv
        q += q_dep
        c += c_dep
    if tt > 0.0 and i_fwd > 0.0:
        q += tt * i_fwd
        c += tt * max(0.0, g_fwd)
    return q, min(c, 1e-3)

class ProSpiceBDF2Solver:
    PIN_COUNTS = {
        'GND': 1,
        'V': 2, 'VCC': 2, 'I': 2, 'R': 2, 'FUSE': 2, 'LDR': 2, 'NTC': 2,
        'C': 2, 'CELEC': 2, 'L': 2, 'D': 2, 'LED': 2, 'Z': 2, 'DIAC': 2,
        'SW': 2, 'PUSH_BTN': 2, 'MOTOR': 2, 'AMMETER': 2, 'WATTMETER': 2,
        'GATE_FIRING': 2, 'NE555': 2, 'LM35': 2, 'HCSR04': 2, 'LOGIC_TOGGLE': 2,
        'Q': 3, 'M': 3, 'SCR': 3, 'TRIAC': 3, 'UJT': 3, 'POT': 3,
        'OP': 3, 'PID': 3, 'REG': 3, 'SW_SPDT': 3, 'RELAY_SPDT': 3,
        'BRIDGE': 4, 'TRF': 4, 'RELAY': 4
    }

    def __init__(self, num_nodes=1):
        self.num_nodes = max(1, int(num_nodes) if isinstance(num_nodes, (int, float)) else 1)
        self.elements = []
        self.v_sources = []

    _ALIASES = {'Z': ('vz', 'val'), 'REG': ('vout', 'val'), 'RELAY': ('v_coil', 'val'), 'RELAY_SPDT': ('v_coil', 'val'), 'DIAC': ('vbo', 'val'),
                'GATE_FIRING': ('alpha_deg', 'alpha'), 'MOTOR': ('load_torque', 'load')}

    def add_element(self, el):
        _al = self._ALIASES.get(el.get('type'))
        if _al and _al[0] in el:
            el[_al[1]] = el[_al[0]]
        pins = [int(p) for p in el.get('pins', []) if isinstance(p, (int, np.integer))]
        el['pins'] = pins
        if pins:
            self.num_nodes = max(self.num_nodes, max(pins))
        self.elements.append(el)
        if el.get('type') in ('V', 'VCC', 'TRF', 'REG', 'OP', 'PID', 'MCU', 'GATE_FIRING', 'NE555', 'LM35', 'HCSR04', 'LOGIC_TOGGLE', 'AMMETER'):
            self.v_sources.append(el)

    def add_component(self, comp):
        self.add_element(comp)

    def add_vsource(self, n1, n2, dc=0.0, amp=0.0, freq=0.0, wave='sine', phase=0.0, id_tag=None, **kwargs):
        if 'ac' in kwargs and not amp:
            amp = kwargs.pop('ac')
        if 'va' in kwargs and not amp:
            amp = kwargs.pop('va')
        if 'f' in kwargs and not freq:
            freq = kwargs.pop('f')
        el = {
            'type': 'V', 'pins': [int(n1), int(n2)],
            'dc': float(dc or 0.0), 'amp': float(amp or 0.0),
            'freq': float(freq or 0.0), 'wave': str(wave or 'sine'),
            'phase': float(phase or 0.0)
        }
        if id_tag is not None:
            el['id'] = id_tag
        el.update(kwargs)
        self.add_element(el)

    def add_v(self, *args, **kwargs):
        if len(args) >= 2:
            n1, n2 = args[0], args[1]
            dc = args[2] if len(args) > 2 else kwargs.pop('dc', kwargs.pop('val', 0.0))
            amp = args[3] if len(args) > 3 else kwargs.pop('amp', kwargs.pop('ac', 0.0))
            freq = args[4] if len(args) > 4 else kwargs.pop('freq', kwargs.pop('f', 0.0))
            wave = args[5] if len(args) > 5 else kwargs.pop('wave', 'sine')
            phase = args[6] if len(args) > 6 else kwargs.pop('phase', 0.0)
            self.add_vsource(n1, n2, dc=dc, amp=amp, freq=freq, wave=wave, phase=phase, **kwargs)

    def add_isource(self, n1, n2, val=0.01, id_tag=None, **kwargs):
        el = {'type': 'I', 'pins': [int(n1), int(n2)], 'val': val}
        if id_tag is not None:
            el['id'] = id_tag
        el.update(kwargs)
        self.add_element(el)

    def add_resistor(self, n1, n2, val=1000.0, id_tag=None, **kwargs):
        el = {'type': 'R', 'pins': [int(n1), int(n2)], 'val': val}
        if id_tag is not None:
            el['id'] = id_tag
        el.update(kwargs)
        self.add_element(el)

    def add_r(self, n1, n2, val=1000.0, id_tag=None, **kwargs):
        self.add_resistor(n1, n2, val=val, id_tag=id_tag, **kwargs)

    def add_capacitor(self, n1, n2, val=1e-6, id_tag=None, **kwargs):
        el = {'type': 'C', 'pins': [int(n1), int(n2)], 'val': val}
        if id_tag is not None:
            el['id'] = id_tag
        el.update(kwargs)
        self.add_element(el)

    def add_c(self, n1, n2, val=1e-6, id_tag=None, **kwargs):
        self.add_capacitor(n1, n2, val=val, id_tag=id_tag, **kwargs)

    def add_inductor(self, n1, n2, val=1e-3, id_tag=None, **kwargs):
        el = {'type': 'L', 'pins': [int(n1), int(n2)], 'val': val}
        if id_tag is not None:
            el['id'] = id_tag
        el.update(kwargs)
        self.add_element(el)

    def add_l(self, n1, n2, val=1e-3, id_tag=None, **kwargs):
        self.add_inductor(n1, n2, val=val, id_tag=id_tag, **kwargs)

    def __getattr__(self, name):
        if name.startswith('add_'):
            raw_type = name[4:].upper()
            type_map = {
                'VSOURCE': 'V', 'V': 'V', 'AC': 'V', 'DC': 'VCC', 'VCC': 'VCC',
                'ISOURCE': 'I', 'I': 'I',
                'RESISTOR': 'R', 'R': 'R', 'LDR': 'LDR', 'NTC': 'NTC', 'FUSE': 'FUSE',
                'CAPACITOR': 'C', 'C': 'C', 'CELEC': 'CELEC',
                'INDUCTOR': 'L', 'L': 'L',
                'DIODE': 'D', 'D': 'D', 'ZENER': 'Z', 'Z': 'Z', 'LED': 'LED', 'DIAC': 'DIAC',
                'BJT': 'Q', 'Q': 'Q', 'TRANSISTOR': 'Q',
                'MOSFET': 'M', 'M': 'M', 'IGBT': 'M',
                'SCR': 'SCR', 'THYRISTOR': 'SCR', 'TRIAC': 'TRIAC', 'UJT': 'UJT',
                'NE555': 'NE555', 'TIMER555': 'NE555',
                'OPAMP': 'OP', 'OP': 'OP', 'REGULATOR': 'REG', 'REG': 'REG',
                'TRANSFORMER': 'TRF', 'TRF': 'TRF', 'BRIDGE': 'BRIDGE',
                'MOTOR': 'MOTOR', 'DC_MOTOR': 'MOTOR', 'PID': 'PID',
                'SWITCH': 'SW', 'SW': 'SW', 'PUSH_BTN': 'PUSH_BTN', 'SW_SPDT': 'SW_SPDT',
                'RELAY': 'RELAY', 'POT': 'POT', 'POTENTIOMETER': 'POT',
                'AMMETER': 'AMMETER', 'WATTMETER': 'WATTMETER',
                'GATE_FIRING': 'GATE_FIRING', 'MCU': 'MCU', 'LOGIC': 'LOGIC_TOGGLE'
            }
            mapped = type_map.get(raw_type, raw_type)
            p_count = self.PIN_COUNTS.get(mapped, 2)

            def _generic_adder(*args, **kwargs):
                if len(args) >= 1 and isinstance(args[0], (list, tuple)):
                    pins = [int(x) for x in args[0]]
                    rest = list(args[1:])
                else:
                    pins = [int(x) for x in args[:p_count] if isinstance(x, (int, float, np.integer))]
                    rest = list(args[p_count:])

                el = {'type': mapped, 'pins': pins}
                if mapped == 'V':
                    if len(rest) > 0: el['dc'] = float(rest[0])
                    if len(rest) > 1: el['amp'] = float(rest[1])
                    if len(rest) > 2: el['freq'] = float(rest[2])
                    if len(rest) > 3: el['wave'] = str(rest[3])
                elif mapped == 'POT':
                    if len(rest) > 0: el['val'] = rest[0]
                    if len(rest) > 1: el['pct'] = rest[1]
                elif mapped in ('Q', 'M'):
                    for item in rest:
                        if isinstance(item, str): el['pol'] = item
                        elif isinstance(item, (int, float)): el['val'] = item
                else:
                    if len(rest) > 0:
                        el['val'] = rest[0]

                if 'id_tag' in kwargs:
                    el['id'] = kwargs.pop('id_tag')
                el.update(kwargs)
                self.add_element(el)
            return _generic_adder
        raise AttributeError(f"'{type(self).__name__}' object has no attribute '{name}'")

    def _parse_val(self, val, default=1.0):
        if isinstance(val, (int, float)):
            return float(val)
        if not val:
            return default
        s = str(val).strip()
        if s.lower().endswith('meg'):
            try: return float(s[:-3]) * 1e6
            except ValueError: return default
        mults = {'p': 1e-12, 'n': 1e-9, 'u': 1e-6, 'µ': 1e-6, 'm': 1e-3, 'k': 1e3, 'K': 1e3, 'M': 1e6, 'G': 1e9}
        for k, m in mults.items():
            if s.endswith(k):
                try:
                    return float(s[:-1]) * m
                except ValueError:
                    return default
        try:
            return float(s)
        except ValueError:
            return default

    def _eval_source(self, el, t, sync_freq=50.0):
        if el['type'] == 'VCC':
            return self._parse_val(el.get('val', el.get('dc', 5.0)), 5.0)

        # إذا كان المصدر يمثل وحدة قدح متزامنة بزاوية إشعال alpha
        if 'alpha' in el and ('TRIG' in str(el.get('part', '')).upper() or 'SYNC' in str(el.get('part', '')).upper() or el.get('wave') == 'pulse'):
            alpha_deg = float(el.get('alpha', 60.0))
            f_ac = float(el.get('freq', sync_freq) or sync_freq)
            period = 1.0 / max(1.0, f_ac)
            half_p = period / 2.0
            t_mod = t % half_p
            delay = (alpha_deg / 180.0) * half_p
            amp_p = float(el.get('amp', 8.0) or 8.0)
            return amp_p if (t_mod >= delay and t_mod <= half_p * 0.95) else 0.0

        dc = float(el.get('dc', 0.0) or 0.0)
        amp = float(el.get('amp', 0.0) or 0.0)
        freq = float(el.get('freq', 0.0) or 0.0)
        wave = str(el.get('wave', 'sine')).lower()
        phase_deg = float(el.get('phase', 0.0) or 0.0)
        delay = float(el.get('delay', 0.0) or 0.0)
        duty = float(el.get('duty', 0.5) or 0.5)

        if delay > 0 and t < delay:
            return dc
        t_eff = t - delay
        if freq <= 0 or amp == 0:
            return dc if dc != 0 else self._parse_val(el.get('val', 0.0), 0.0)

        period = 1.0 / freq
        pos = ((t_eff + (phase_deg / 360.0) * period) % period) / period
        phase = 2.0 * math.pi * pos

        if wave == 'square':
            return dc + (amp if pos < duty else 0.0)
        elif wave == 'pulse':
            w_duty = float(el.get('duty', 0.25) or 0.25)
            return dc + (amp if pos < w_duty else 0.0)
        elif wave == 'triangle':
            tri = 4.0 * pos if pos < 0.25 else (2.0 - 4.0 * pos if pos < 0.75 else 4.0 * pos - 4.0)
            return dc + amp * tri
        return dc + amp * math.sin(phase)

    def _enrich_from_request(self):
        """يكمّل الحقول الناقصة فقط من الطلب الخام وبمطابقة id صريحة. لا يكتب فوق أي قيمة موجودة،
        ولا يطابق بترتيب النوع (كان يسبب خلط قيم المفاتيح/المقاومات)."""
        try:
            from flask import request, has_request_context
            if not has_request_context():
                return
            req_data = request.get_json(silent=True) or {}
            by_id = {c.get('id'): c for c in req_data.get('components', []) if c.get('id') is not None and c.get('type') != 'GND'}
            for el in self.elements:
                matched = by_id.get(el.get('id')) if el.get('id') is not None else None
                if matched:
                    for k, v in matched.items():
                        if k not in ('pins', 'type', 'val') and k not in el:
                            el[k] = v
        except Exception:
            pass

    def solve_transient(self, t_stop=0.04, num_steps=800, dt_base=None, **kwargs):
        self._enrich_from_request()
        if dt_base and dt_base > 0:
            num_steps = max(400, min(64000, int(round(float(t_stop) / float(dt_base)))))
        else:
            num_steps = 800
        n = max(1, self.num_nodes)
        dt = float(t_stop) / float(num_steps)
        times = np.linspace(0.0, float(t_stop), num_steps + 1)

        sync_freq = 50.0
        for el in self.elements:
            if el.get('type') == 'V' and float(el.get('freq', 0) or 0) > 0:
                sync_freq = float(el['freq'])
                break

        extra_vars = 0
        branch_idx = {}
        for idx, el in enumerate(self.elements):
            etype = el['type']
            if etype in ('V', 'VCC', 'AMMETER', 'REG', 'OP', 'PID', 'MCU', 'GATE_FIRING', 'NE555', 'LM35', 'HCSR04', 'LOGIC_TOGGLE'):
                branch_idx[idx] = n + extra_vars
                extra_vars += 1
            elif etype == 'TRF':
                branch_idx[idx] = n + extra_vars
                extra_vars += 2

        dim = n + extra_vars
        v_hist = np.zeros((num_steps + 1, dim))

        # دوائر خطية بالكامل => trapezoidal (بدون تخميد عددي، مثل SPICE)؛ وإلا BDF2 (أثبت مع الدايودات والسويتشات)
        _LINEAR = {'R', 'C', 'CELEC', 'L', 'V', 'VCC', 'I', 'POT', 'LDR', 'NTC', 'FUSE', 'AMMETER', 'WATTMETER', 'TRF', 'OP', 'GND', 'VMETER', 'OSC'}
        mode_tr = all(e.get('type') in _LINEAR for e in self.elements)
        for _a in [a for a in list(self.__dict__) if a.startswith('_ic_') or a.startswith('_vl_') or a.startswith('_q555_') or a.startswith('_dg_') or a.startswith('_pid_') or a.startswith('_bjt_prev')]:
            delattr(self, _a)
        cap_v_prev1, cap_v_prev2 = {}, {}
        ind_i_prev1, ind_i_prev2 = {}, {}
        motor_states = {}
        for idx, el in enumerate(self.elements):
            if el['type'] == 'MOTOR':
                motor_states[el.get('id', idx)] = {
                    'omega': 0.0, 'angle': 0.0, 'i_a': 0.0, 'i_r': 0.0,
                    'rpm': 0.0, 'torque': 0.0, 'current': 0.0,
                    'history': {'t': [], 'rpm': [], 'torque': [], 'current': []}
                }

        leds, ammeters, powers = {}, {}, {}

        jc_q1, jc_q2, jc_i = {}, {}, {}

        def stamp_qcap(G, I_vec, n1, n2, key, q_now, c_now, v_now, dt_c, m_tr, u_bdf2):
            q1 = jc_q1.get(key, 0.0)
            q2 = jc_q2.get(key, q1)
            if m_tr or not u_bdf2:
                g_eq = (2.0 / dt_c) * c_now
                i_c0 = (2.0 / dt_c) * (q_now - q1) - jc_i.get(key, 0.0)
            else:
                g_eq = (1.5 / dt_c) * c_now
                i_c0 = (1.5 * q_now - 2.0 * q1 + 0.5 * q2) / dt_c
            stamp_g(G, n1, n2, g_eq)
            stamp_i(I_vec, n1, n2, i_c0 - g_eq * v_now)

        def update_qcap(key, q_now, dt_c, m_tr, u_bdf2, is_dc_op, stp):
            if stp == 0 and is_dc_op:
                jc_q1[key] = jc_q2[key] = q_now
                jc_i[key] = 0.0
            else:
                q1 = jc_q1.get(key, 0.0)
                q2 = jc_q2.get(key, q1)
                if m_tr or not u_bdf2:
                    i_new = (2.0 / dt_c) * (q_now - q1) - jc_i.get(key, 0.0)
                else:
                    i_new = (1.5 * q_now - 2.0 * q1 + 0.5 * q2) / dt_c
                jc_q2[key] = q1
                jc_q1[key] = q_now
                jc_i[key] = i_new

        def stamp_g(G, n1, n2, g):
            if n1 > 0: G[n1 - 1, n1 - 1] += g
            if n2 > 0: G[n2 - 1, n2 - 1] += g
            if n1 > 0 and n2 > 0:
                G[n1 - 1, n2 - 1] -= g
                G[n2 - 1, n1 - 1] -= g

        def stamp_i(I_vec, n_from, n_to, val):
            if n_from > 0: I_vec[n_from - 1] -= val
            if n_to > 0: I_vec[n_to - 1] += val

        self._nonconv = []
        self._op_failed = False
        self._singular = []
        self._meters = {}
        bcds = {}
        for step, t in enumerate(times):
            x_guess = v_hist[step - 1].copy() if step > 0 else np.zeros(dim)
            use_bdf2 = (step >= 2)

            op_try = (step == 0 and getattr(self, 'use_op', True))   # نقطة التشغيل DC قبل التحليل الزمني (مثل SPICE/Proteus)
            t_step = t
            while True:
                is_op = op_try
                t = -1e-15 if is_op else t_step     # نقطة التشغيل تُحسب بقيمة المصادر قبل t=0 مباشرة (مثل PULSE في SPICE)
                for nr in range(250 if is_op else 60):
                    G = np.zeros((dim, dim))
                    I_vec = np.zeros(dim)

                    for k in range(n):
                        G[k, k] += 1e-12

                    def node_v(node):
                        return 0.0 if node <= 0 else x_guess[node - 1]

                    for idx, el in enumerate(self.elements):
                        etype = el['type']
                        pins = el.get('pins', [])
                        p0 = pins[0] if len(pins) > 0 else 0
                        p1 = pins[1] if len(pins) > 1 else 0

                        if etype == 'WATTMETER' and len(pins) >= 4:
                            stamp_g(G, pins[0], pins[1], 1e-7)       # ملف الجهد: 10 MΩ
                            stamp_g(G, pins[2], pins[3], 1000.0)     # ملف التيار: 1 mΩ على التوالي
                        elif etype in ('R', 'FUSE', 'LDR', 'NTC', 'WATTMETER'):
                            r = max(1e-3, self._parse_val(el.get('val', 100.0), 100.0))
                            if etype == 'WATTMETER': r = 1e6
                            stamp_g(G, p0, p1, 1.0 / r)

                        elif etype == 'POT':
                            rtot = max(1.0, self._parse_val(el.get('val', 10000.0), 10000.0))
                            pct = min(0.999, max(0.001, float(el.get('pct', 50.0)) / 100.0))
                            if len(pins) >= 3 and pins[2] != pins[1] and pins[2] > 0:
                                stamp_g(G, p0, pins[1], 1.0 / (rtot * pct))
                                stamp_g(G, pins[1], pins[2], 1.0 / (rtot * (1.0 - pct)))
                            else:
                                stamp_g(G, p0, p1, 1.0 / (rtot * pct))

                        elif etype in ('SW', 'PUSH_BTN'):
                            t_on = el.get('t_on', None)
                            t_off = el.get('t_off', None)
                            is_closed = el.get('closed', True)
                            if t_on is not None:
                                is_closed = (t >= float(t_on)) and (t_off is None or t <= float(t_off))
                            r_sw = 1e-3 if is_closed else 1e8
                            stamp_g(G, p0, p1, 1.0 / r_sw)

                        elif etype in ('SW_SPDT', 'RELAY_SPDT') and len(pins) >= 3:
                            active = el.get('closed', True)
                            stamp_g(G, p0, p1, 1e3 if active else 1e-8)
                            stamp_g(G, p0, pins[2], 1e-8 if active else 1e3)

                        elif etype == 'RELAY':
                            v_coil = abs(node_v(p0) - node_v(p1))
                            v_nom = float(el.get('val', 5.0))
                            stamp_g(G, p0, p1, 1.0 / 120.0)
                            if len(pins) >= 4:
                                closed = (v_coil >= 0.7 * v_nom)
                                stamp_g(G, pins[2], pins[3], 1e3 if closed else 1e-8)

                        elif etype == 'I':
                            ival = self._parse_val(el.get('val', 0.01), 0.01)
                            stamp_i(I_vec, p0, p1, ival)

                        elif etype in ('C', 'CELEC') and is_op:
                            stamp_g(G, p0, p1, 1e-12)              # DC: المكثف دائرة مفتوحة
                        elif etype == 'L' and is_op:
                            stamp_g(G, p0, p1, 1e5)                # DC: الملف قصر (10 µΩ)
                        elif etype in ('C', 'CELEC'):
                            c_val = max(1e-12, self._parse_val(el.get('val', 1e-6), 1e-6))
                            v1 = cap_v_prev1.get(idx, 0.0)
                            v2 = cap_v_prev2.get(idx, 0.0)
                            if mode_tr or not use_bdf2:
                                g_eq = (2.0 * c_val) / dt
                                i_prev = getattr(self, f'_ic_{idx}', 0.0)
                                i_eq = g_eq * v1 + i_prev
                            else:
                                g_eq = (1.5 * c_val) / dt
                                i_eq = (c_val / dt) * (2.0 * v1 - 0.5 * v2)
                            stamp_g(G, p0, p1, g_eq)
                            stamp_i(I_vec, p1, p0, i_eq)

                        elif etype == 'L':
                            l_val = max(1e-9, self._parse_val(el.get('val', 1e-3), 1e-3))
                            i1 = ind_i_prev1.get(idx, 0.0)
                            i2 = ind_i_prev2.get(idx, 0.0)
                            if mode_tr or not use_bdf2:
                                g_eq = dt / (2.0 * l_val + 1e-4 * dt)
                                v_prev = getattr(self, f'_vl_{idx}', 0.0)
                                i_eq = i1 + g_eq * v_prev
                            else:
                                g_eq = dt / (1.5 * l_val + 1e-4 * dt)
                                i_eq = (4.0 / 3.0) * i1 - (1.0 / 3.0) * i2
                            stamp_g(G, p0, p1, g_eq)
                            stamp_i(I_vec, p0, p1, i_eq)

                        elif etype in ('D', 'LED', 'Z'):
                            vd = node_v(p0) - node_v(p1)
                            if etype == 'LED':
                                is_sat, n_vt, rs_d = _led_params(el)
                            else:
                                is_sat = float(el.get('Is', 2.55e-9)); n_vt = float(el.get('n', 1.75)) * VT_THERMAL; rs_d = float(el.get('rs', 0.042))
                            i_d, g_d = _diode_iv(vd, is_sat, n_vt, rs_d)
                            if etype == 'Z':
                                vz = self._parse_val(el.get('val', 5.1), 5.1)
                                rz = max(0.1, float(el.get('rz', 7.0)))
                                vk = vz - 0.02 * rz                 # Vz معرّف عند Izt≈20mA
                                if -vd > vk:
                                    g_d += 1.0 / rz
                                    i_d -= (-vd - vk) / rz
                            elif etype == 'D':
                                bv = float(el.get('bv', 0) or 0)
                                if bv > 0 and -vd > bv:              # انهيار عكسي للدايود العادي
                                    g_d += 1.0
                                    i_d -= (-vd - bv)
                            i_eq = i_d - g_d * vd
                            stamp_g(G, p0, p1, g_d)
                            stamp_i(I_vec, p0, p1, i_eq)
                            if not is_op:
                                _cjo = float(el.get('cjo', 0.0) or 0.0)
                                _tt = float(el.get('tt', 0.0) or 0.0)
                                if _cjo > 0.0 or _tt > 0.0:
                                    _qd, _cd = _jcap_q_c(vd, _cjo, el.get('vj', 0.75), el.get('m', 0.333), _tt, max(0.0, i_d), max(0.0, g_d))
                                    stamp_qcap(G, I_vec, p0, p1, ('D', idx), _qd, _cd, vd, dt, mode_tr, use_bdf2)

                        elif etype == 'DIAC':
                            vd = node_v(p0) - node_v(p1)
                            vbo = self._parse_val(el.get('val', 32.0), 32.0)
                            diac_on = getattr(self, f'_diac_on_{idx}', False)
                            if abs(vd) >= vbo:
                                diac_on = True
                            elif abs(vd) < 5.0:
                                diac_on = False
                            setattr(self, f'_diac_on_{idx}', diac_on)
                            stamp_g(G, p0, p1, (1.0 / 5.0) if diac_on else 1e-8)

                        elif etype == 'COMPARATOR' and len(pins) >= 3:
                            # مقارن: Vout = Vcc·(0.5+0.5·tanh(A·Vd/Vcc)) ؛ خرج Norton مع جاكوبيان (بدون متغير فرع)
                            vcc_c = float(el.get('vcc', el.get('val', 5.0)) or 5.0); e0 = node_v(pins[0]) - node_v(pins[1]); A_c = 1e5
                            th = math.tanh(max(-30.0, min(30.0, A_c * e0 / vcc_c))); f_c = vcc_c * 0.5 * (1.0 + th); fp_c = 0.5 * A_c * (1.0 - th * th); g_o = 0.02
                            o = pins[2]
                            if o > 0:
                                G[o - 1, o - 1] += g_o
                                if pins[0] > 0: G[o - 1, pins[0] - 1] -= g_o * fp_c
                                if pins[1] > 0: G[o - 1, pins[1] - 1] += g_o * fp_c
                                I_vec[o - 1] += g_o * (f_c - fp_c * e0)

                        elif etype in ('SCHMITT', 'DFF', 'JKFF', 'COUNTER4'):
                            # منطق تتابعي: المخرجات تُقاد من حالة محفوظة (تتحدث مرة لكل خطوة مقبولة)
                            st = getattr(self, f'_dg_{idx}', None) or ({'q': 1} if etype == 'SCHMITT' else {'q': 0, 'clk': 0, 'n': 0})
                            vdd = float(el.get('vcc', 5.0) or 5.0)
                            def _drive(nd, lvl):
                                if nd > 0: stamp_g(G, nd, 0, 0.02); stamp_i(I_vec, 0, nd, (vdd if lvl else 0.0) * 0.02)
                            if etype == 'SCHMITT' and len(pins) >= 2:
                                _drive(pins[1], st['q']); stamp_g(G, pins[0], 0, 1e-12)
                            elif etype in ('DFF', 'JKFF') and len(pins) >= 5:
                                _drive(pins[3], st['q']); _drive(pins[4], 0 if st['q'] else 1)
                                for _pp in pins[:3]: stamp_g(G, _pp, 0, 1e-12)
                            elif etype == 'COUNTER4' and len(pins) >= 6:
                                for _b in range(4): _drive(pins[2 + _b], (st['n'] >> _b) & 1)
                                stamp_g(G, pins[0], 0, 1e-12); stamp_g(G, pins[1], 0, 1e-12)

                        elif etype == 'OPTO' and len(pins) >= 4:
                            # أوبتوكابلر: LED دخل + مخرج ترانزستور Ic = CTR·If·tanh(Vce/0.3)
                            a_, k_, c_, e_ = pins[:4]; ctr = float(el.get('ctr', 1.0) or 1.0)
                            vak = node_v(a_) - node_v(k_); i_l, g_l2 = _diode_iv(vak, 1e-18, 2.0 * VT_THERMAL, 5.0)
                            stamp_g(G, a_, k_, g_l2); stamp_i(I_vec, a_, k_, i_l - g_l2 * vak)
                            vce = node_v(c_) - node_v(e_); th = math.tanh(max(-30.0, min(30.0, vce / 0.3)))
                            Ic = ctr * i_l * th; J_ak = ctr * g_l2 * th; J_ce = ctr * i_l * (1.0 - th * th) / 0.3 + 1e-9
                            for nk, sg in ((c_, 1.0), (e_, -1.0)):
                                if nk <= 0: continue
                                if a_ > 0: G[nk - 1, a_ - 1] += sg * J_ak
                                if k_ > 0: G[nk - 1, k_ - 1] -= sg * J_ak
                                if c_ > 0: G[nk - 1, c_ - 1] += sg * J_ce
                                if e_ > 0: G[nk - 1, e_ - 1] -= sg * J_ce
                                I_vec[nk - 1] -= sg * (Ic - J_ak * vak - J_ce * vce)

                        elif etype == 'NE555_8' and len(pins) >= 8:
                            # 555 حقيقي: pins = [GND, TRIG, OUT, RESET, CTRL, THR, DIS, VCC]
                            gnd, trg, out, rst, ctl, thr, dis, vcc = pins[:8]
                            vg = node_v(gnd); vcc_v = max(0.0, node_v(vcc) - vg)
                            q555 = getattr(self, f'_q555_{idx}', 1)
                            stamp_g(G, ctl, gnd, 1.0 / 3333.0); stamp_i(I_vec, gnd, ctl, (2.0 / 3.0) * vcc_v / 3333.0)   # مقسّم داخلي 3×5k
                            drop = 0.0 if any(k in str(el.get('part', '')).upper() for k in ('TLC555', 'LMC555', '7555', 'CMOS')) else 1.3
                            vo = (max(0.0, vcc_v - drop) if q555 else 0.1)
                            stamp_g(G, out, gnd, 0.1); stamp_i(I_vec, gnd, out, vo * 0.1)                                # خرج Rout≈10Ω
                            stamp_g(G, dis, gnd, 0.1 if not q555 else 1e-9)                                              # ترانزستور التفريغ
                            stamp_g(G, rst, vcc, 1e-5)                                                                   # RESET سحب داخلي للأعلى
                            stamp_g(G, vcc, gnd, 1e-4)
                            for _pn in (trg, thr): stamp_g(G, _pn, gnd, 1e-12)

                        elif etype == 'BRIDGE' and len(pins) >= 4:
                            ac1, ac2, dcp, dcm = pins[0], pins[1], pins[2], pins[3]
                            for a_n, c_n in [(ac1, dcp), (ac2, dcp), (dcm, ac1), (dcm, ac2)]:
                                vd = node_v(a_n) - node_v(c_n)
                                id_curr, gd = _diode_iv(vd, float(el.get('Is', 2.55e-9)), float(el.get('n', 1.75)) * VT_THERMAL, float(el.get('rs', 0.05)))
                                stamp_g(G, a_n, c_n, gd)
                                stamp_i(I_vec, a_n, c_n, id_curr - gd * vd)

                        elif etype == 'Q' and len(pins) >= 3:
                            nb, nc, ne = pins[0], pins[1], pins[2]
                            pol = 1.0 if el.get('pol', 'NPN') == 'NPN' else -1.0
                            bf = max(1.0, float(el.get('bf', el.get('val', 180.0)) or 180.0)); br = float(el.get('br', 4.0)); Is_q = float(el.get('Is', 1.4e-14) or 1.4e-14); vaf = float(el.get('vaf', 100.0))
                            vb_, vc_, ve_ = node_v(nb), node_v(nc), node_v(ne)
                            vbe = pol * (vb_ - ve_); vbc = pol * (vb_ - vc_)
                            _vcrit = VT_THERMAL * math.log(VT_THERMAL / (1.4142 * Is_q))
                            _pv = self.__dict__.setdefault('_bjt_prev', {}).get(idx, (0.0, 0.0))
                            vbe = _pnjlim(vbe, _pv[0], VT_THERMAL, _vcrit); vbc = _pnjlim(vbc, _pv[1], VT_THERMAL, _vcrit)
                            self._bjt_prev[idx] = (vbe, vbc)
                            ve_ = ve_; vb_ = ve_ + pol * vbe; vc_ = vb_ - pol * vbc     # نقطة الخطّية المحدودة (متسقة مع Jacobian)
                            _vtf = VT_THERMAL * float(el.get('nf', 1.0) or 1.0)
                            aF, aR = vbe / _vtf, vbc / VT_THERMAL
                            eF, eR = _ex(aF), _ex(aR); gF, gR = Is_q / _vtf * _exd(aF), Is_q / VT_THERMAL * _exd(aR)
                            icc = Is_q * (eF - eR); qb = max(0.05, 1.0 + (vbe - vbc) / vaf)
                            Ic_e = icc * qb - (Is_q / br) * (eR - 1.0)
                            Ib_e = (Is_q / bf) * (eF - 1.0) + (Is_q / br) * (eR - 1.0)
                            dIc_be = gF * qb + icc / vaf; dIc_bc = -gR * qb - icc / vaf - gR / br
                            dIb_be = gF / bf;            dIb_bc = gR / br
                            # صفوف التيارات الداخلة للجهاز عند (b, c, e) مقابل جهود (vb, vc, ve)
                            Jb = (dIb_be + dIb_bc, -dIb_bc, -dIb_be); Jc = (dIc_be + dIc_bc, -dIc_bc, -dIc_be)
                            Je = tuple(-(x + y) for x, y in zip(Jb, Jc))
                            I0 = (pol * Ib_e, pol * Ic_e, -pol * (Ib_e + Ic_e)); vv = (vb_, vc_, ve_)
                            for (nk, Jr, i0) in ((nb, Jb, I0[0]), (nc, Jc, I0[1]), (ne, Je, I0[2])):
                                if nk <= 0: continue
                                for (nj, jv) in zip((nb, nc, ne), Jr):
                                    if nj > 0: G[nk - 1, nj - 1] += jv
                                I_vec[nk - 1] -= i0 - sum(j * x for j, x in zip(Jr, vv))
                            for (n1, n2) in ((nb, ne), (nb, nc), (nc, ne)):
                                stamp_g(G, n1, n2, 1e-12)
                            if not is_op:
                                _cje = float(el.get('cje', 0.0) or 0.0); _tf = float(el.get('tf', 0.0) or 0.0)
                                _cjc = float(el.get('cjc', 0.0) or 0.0); _tr = float(el.get('tr', 0.0) or 0.0)
                                if _cje > 0.0 or _tf > 0.0:
                                    _n1, _n2 = (nb, ne) if pol > 0 else (ne, nb)
                                    _qbe, _cbe = _jcap_q_c(vbe, _cje, el.get('vje', 0.75), el.get('mje', 0.333), _tf, max(0.0, Is_q * (eF - 1.0)), gF)
                                    stamp_qcap(G, I_vec, _n1, _n2, ('Qbe', idx), _qbe, _cbe, vbe, dt, mode_tr, use_bdf2)
                                if _cjc > 0.0 or _tr > 0.0:
                                    _n1, _n2 = (nb, nc) if pol > 0 else (nc, nb)
                                    _qbc, _cbc = _jcap_q_c(vbc, _cjc, el.get('vjc', 0.75), el.get('mjc', 0.333), _tr, max(0.0, Is_q * (eR - 1.0)), gR)
                                    stamp_qcap(G, I_vec, _n1, _n2, ('Qbc', idx), _qbc, _cbc, vbc, dt, mode_tr, use_bdf2)

                        elif etype == 'M' and len(pins) >= 3:
                            ng, nd, ns = pins[0], pins[1], pins[2]
                            pol = 1.0 if el.get('pol', 'N') == 'N' else -1.0
                            vth = abs(float(el.get('vth', el.get('val', 2.5))))
                            kp = float(el.get('kp', 2.0)); lam = float(el.get('lambda', 0.01))
                            if pol * (node_v(nd) - node_v(ns)) < 0:      # تبديل الـ D/S عند vds سالب (الجهاز متماثل)
                                nd, ns = ns, nd
                            vg_, vd_, vs_ = node_v(ng), node_v(nd), node_v(ns)
                            vgs = pol * (vg_ - vs_); vds = pol * (vd_ - vs_); vov = vgs - vth
                            gm = gds = ids = 0.0
                            if vov > 0:
                                if vds < vov:
                                    ids = kp * (vov * vds - 0.5 * vds * vds) * (1.0 + lam * vds)
                                    gm = kp * vds * (1.0 + lam * vds)
                                    gds = kp * (vov - vds) * (1.0 + lam * vds) + kp * (vov * vds - 0.5 * vds * vds) * lam
                                else:
                                    ids = 0.5 * kp * vov * vov * (1.0 + lam * vds)
                                    gm = kp * vov * (1.0 + lam * vds)
                                    gds = 0.5 * kp * vov * vov * lam
                            gds += 1e-9
                            # تيار الـ drain الداخل للجهاز = pol*ids ؛ المشتقات مستقلة عن القطبية
                            Jd = {ng: gm, nd: gds, ns: -(gm + gds)}
                            i0 = pol * ids; vmap = {ng: vg_, nd: vd_, ns: vs_}
                            for nk, sign in ((nd, 1.0), (ns, -1.0)):
                                if nk <= 0: continue
                                tot = 0.0
                                for nj, jv in Jd.items():
                                    if nj > 0:
                                        G[nk - 1, nj - 1] += sign * jv
                                        tot += sign * jv * vmap[nj]
                                I_vec[nk - 1] -= sign * i0 - tot
                            if not is_op:
                                _ng0, _nd0, _ns0 = pins[0], pins[1], pins[2]
                                _cgs = float(el.get('cgs', 0.0) or 0.0)
                                _cgd = float(el.get('cgd', 0.0) or 0.0)
                                _cds = float(el.get('cds', 0.0) or 0.0)
                                if _cgs > 0.0:
                                    _v = node_v(_ng0) - node_v(_ns0)
                                    stamp_qcap(G, I_vec, _ng0, _ns0, ('Mgs', idx), _cgs * _v, _cgs, _v, dt, mode_tr, use_bdf2)
                                if _cgd > 0.0:
                                    _v = node_v(_ng0) - node_v(_nd0)
                                    stamp_qcap(G, I_vec, _ng0, _nd0, ('Mgd', idx), _cgd * _v, _cgd, _v, dt, mode_tr, use_bdf2)
                                if _cds > 0.0:
                                    _v = node_v(_nd0) - node_v(_ns0)
                                    stamp_qcap(G, I_vec, _nd0, _ns0, ('Mds', idx), _cds * _v, _cds, _v, dt, mode_tr, use_bdf2)

                        elif etype in ('TRIAC', 'SCR') and len(pins) >= 3:
                            ng, nk, na = pins[0], pins[1], pins[2]
                            vgk = node_v(ng) - node_v(nk)
                            vak = node_v(na) - node_v(nk)
                            vgt = float(el.get('vgt', 0.60))
                            igt = float(el.get('igt', 0.0005))   # تيار الإشعال (افتراضي حساس 0.5mA للتوافق مع الدوائر الجاهزة)
                            ih = float(el.get('ih', 0.005))
                            vtm = float(el.get('vtm', 1.20))     # هبوط جهد التوصيل الحقيقي (1.2V) لنجاح الإطفاء القسري بالترانزستور
                            vbo = float(el.get('vbo', 600.0))    # جهد الانهيار الأمامي بدون بوابة
                            ron = max(0.05, float(el.get('ron', 0.15)))
                            is_scr = (etype == 'SCR') or ('SCR' in str(el.get('part', '')).upper())

                            # وصلة بوابة-كاثود حقيقية (دايود 0.6V للـ SCR، وثنائي الاتجاه للـ TRIAC)
                            if is_scr:
                                ig_now, gg_now = _diode_iv(vgk, 1e-12, 1.5 * VT_THERMAL, 15.0)
                                ig_trig = (ig_now >= igt) and (vgk >= vgt * 0.85)
                            else:
                                sgn_g = 1.0 if vgk >= 0 else -1.0
                                ig_mag, gg_now = _diode_iv(abs(vgk), 1e-12, 1.5 * VT_THERMAL, 15.0)
                                ig_now = sgn_g * ig_mag
                                ig_trig = (ig_mag >= igt) and (abs(vgk) >= vgt * 0.85)

                            latched = getattr(self, f'_latched_{idx}', False)
                            iak_est = (abs(vak) - vtm) / ron if abs(vak) > vtm else 0.0

                            # دعم القدح المباشر بزاوية الإشعال alpha أو بتيار/جهد البوابة أو بجهد الانهيار Vbo
                            alpha_deg = el.get('alpha', None)
                            alpha_trig = False
                            if alpha_deg is not None:
                                period = 1.0 / max(1.0, sync_freq)
                                half_p = period / 2.0
                                t_mod = t % half_p
                                if t_mod >= (float(alpha_deg) / 180.0) * half_p:
                                    alpha_trig = True

                            if is_scr:
                                if vak <= 0.35 or (latched and iak_est < ih and not ig_trig and not alpha_trig):
                                    latched = False
                                elif (vak > vtm and (ig_trig or alpha_trig or (latched and iak_est >= ih))) or (vak >= vbo):
                                    latched = True
                            else:
                                if abs(vak) <= 0.35 or (latched and iak_est < ih and not ig_trig and not alpha_trig):
                                    latched = False
                                elif (abs(vak) > vtm and (ig_trig or alpha_trig or (latched and iak_est >= ih))) or (abs(vak) >= vbo):
                                    latched = True

                            setattr(self, f'_latched_{idx}', latched)
                            if latched:
                                stamp_g(G, na, nk, 1.0 / ron)
                                stamp_i(I_vec, na, nk, -vtm / ron if vak >= 0 else vtm / ron)
                            else:
                                stamp_g(G, na, nk, 1e-8)
                            # ختم وصلة البوابة الحقيقية في مصفوفة MNA
                            stamp_g(G, ng, nk, gg_now + 1e-6)
                            stamp_i(I_vec, ng, nk, ig_now - gg_now * vgk)

                        elif etype == 'UJT' and len(pins) >= 3:
                            ne, nb1, nb2 = pins[0], pins[1], pins[2]
                            eta = float(el.get('eta', 0.65))
                            vbb = max(3.0, abs(node_v(nb2) - node_v(nb1)))
                            vp = eta * vbb + 0.6
                            ve = node_v(ne) - node_v(nb1)
                            ujt_on = getattr(self, f'_ujt_on_{idx}', False)
                            if ve >= vp:
                                ujt_on = True
                            elif ve < 1.5:
                                ujt_on = False
                            setattr(self, f'_ujt_on_{idx}', ujt_on)
                            stamp_g(G, nb2, nb1, 1.0 / 4700.0)
                            stamp_g(G, ne, nb1, (1.0 / 8.0) if ujt_on else 1e-8)

                        elif etype in ('AND', 'OR', 'NAND', 'NOR', 'XOR', 'XNOR', 'NOT', 'BUF'):
                            pn = el.get('pins', [])
                            if etype in ('NOT', 'BUF'):
                                if len(pn) < 2: continue
                                ia = node_v(pn[0]) > 2.5; gout = pn[1]
                                res = (not ia) if etype == 'NOT' else ia
                            else:
                                if len(pn) < 3: continue
                                ia = node_v(pn[0]) > 2.5; ib = node_v(pn[1]) > 2.5; gout = pn[2]
                                res = {'AND': ia and ib, 'NAND': not (ia and ib), 'OR': ia or ib, 'NOR': not (ia or ib),
                                       'XOR': ia != ib, 'XNOR': ia == ib}[etype]
                            if gout > 0:
                                stamp_g(G, gout, 0, 1.0 / 50.0)
                                stamp_i(I_vec, 0, gout, (5.0 if res else 0.0) / 50.0)

                        elif etype == 'MOTOR':
                            mid = el.get('id', idx)
                            st = motor_states[mid]
                            is_ind = 'INDUCTION' in str(el.get('part', '')).upper()
                            ra = 1.45 if not is_ind else 1.95
                            la = 0.012
                            ke = 0.052
                            eb = ke * st['omega'] if not is_ind else 0.0
                            r_eff = ra + (la / dt)
                            i_prev_m = st.get('i_a', 0.0)
                            stamp_g(G, p0, p1, 1.0 / r_eff)
                            stamp_i(I_vec, p1, p0, (eb - (la / dt) * i_prev_m) / r_eff)

                        elif etype in ('V', 'VCC', 'AMMETER', 'REG', 'OP', 'PID', 'GATE_FIRING', 'NE555', 'LM35', 'HCSR04', 'LOGIC_TOGGLE', 'MCU'):
                            b = branch_idx[idx]
                            if etype in ('V', 'VCC'):
                                v_val = self._eval_source(el, t, sync_freq=sync_freq)
                                if p0 > 0: G[p0 - 1, b] += 1.0; G[b, p0 - 1] += 1.0
                                if p1 > 0: G[p1 - 1, b] -= 1.0; G[b, p1 - 1] -= 1.0
                                G[b, b] -= 1e-4
                                I_vec[b] = v_val
                            elif etype == 'AMMETER':
                                if p0 > 0: G[p0 - 1, b] += 1.0; G[b, p0 - 1] += 1.0
                                if p1 > 0: G[p1 - 1, b] -= 1.0; G[b, p1 - 1] -= 1.0
                                G[b, b] -= 1e-5
                                I_vec[b] = 0.0
                            elif etype == 'REG' and len(pins) >= 3:
                                vin = node_v(pins[0]) - node_v(pins[1])
                                vtarget = float(el.get('val', 5.0))
                                if vtarget >= 0: vout = min(max(0.0, vin - 1.5), vtarget)      # منظم موجب (78xx / LM317)
                                else: vout = max(min(0.0, vin + 1.5), vtarget)                # منظم سالب (79xx / LM337)
                                # V(out)-V(ref)=vout وتيار الخرج يُسحب من طرف الدخل (كان يُسحب من GND/ADJ: المصدر لا يتحمّل،
                                # وLM317 يعطي 1.25V دائماً بدل 1.25·(1+R2/R1))
                                if pins[2] > 0: G[pins[2] - 1, b] += 1.0; G[b, pins[2] - 1] += 1.0
                                if pins[0] > 0: G[pins[0] - 1, b] -= 1.0
                                if pins[1] > 0: G[b, pins[1] - 1] -= 1.0
                                G[b, b] -= 1e-3
                                I_vec[b] = vout
                            elif etype == 'GATE_FIRING':
                                alpha_deg = float(el.get('alpha', 60.0))
                                f_ac = float(el.get('freq', sync_freq))
                                period = 1.0 / max(1.0, f_ac)
                                half_p = period / 2.0
                                t_mod = t % half_p
                                delay = (alpha_deg / 180.0) * half_p
                                v_pulse = 8.0 if (t_mod >= delay and t_mod <= half_p * 0.96) else 0.0
                                out_p = p1 if p1 > 0 else p0
                                ref_p = p0 if (p1 > 0 and p0 != p1) else 0
                                if out_p > 0: G[out_p - 1, b] += 1.0; G[b, out_p - 1] += 1.0
                                if ref_p > 0: G[ref_p - 1, b] -= 1.0; G[b, ref_p - 1] -= 1.0
                                G[b, b] -= 10.0
                                I_vec[b] = v_pulse
                            elif etype == 'NE555':
                                v_trig = node_v(p0)
                                v_out_pin = p1 if p1 > 0 else p0
                                vcc_555 = 5.0
                                state_555 = getattr(self, f'_555_q_{idx}', True)
                                if v_trig >= (2.0 / 3.0) * vcc_555:
                                    state_555 = False
                                elif v_trig <= (1.0 / 3.0) * vcc_555:
                                    state_555 = True
                                setattr(self, f'_555_q_{idx}', state_555)
                                vout = vcc_555 if state_555 else 0.0
                                if v_out_pin > 0:
                                    G[v_out_pin - 1, b] += 1.0
                                    G[b, v_out_pin - 1] += 1.0
                                G[b, b] -= 50.0
                                I_vec[b] = vout
                                if not state_555 and p0 > 0:
                                    stamp_g(G, p0, 0, 1.0 / 4700.0)
                            elif etype == 'OP' and len(pins) >= 3:
                                # VCVS مع تشبّع tanh وجاكوبيان صحيح (pins: +, −, out): Vout = Vsat·tanh(A·Vd/Vsat)
                                e0 = node_v(pins[0]) - node_v(pins[1])
                                A_ol = float(el.get('gain', 1e5) or 1e5); vsat = float(el.get('vsat', 13.5) or 13.5)
                                th = math.tanh(max(-30.0, min(30.0, A_ol * e0 / vsat)))
                                f_o = vsat * th; gp = A_ol * (1.0 - th * th) + 1e-9
                                if pins[2] > 0: G[pins[2] - 1, b] += 1.0; G[b, pins[2] - 1] += 1.0
                                if pins[0] > 0: G[b, pins[0] - 1] -= gp
                                if pins[1] > 0: G[b, pins[1] - 1] += gp
                                G[b, b] -= 1e-3
                                I_vec[b] = f_o - gp * e0
                            elif etype == 'PID' and len(pins) >= 3:
                                # u = kp·e + ki·∫e + kd·de/dt (مفلتر) ؛ خطي في e_n => VCVS مع جاكوبيان صحيح + تشبّع ±15V
                                e0 = node_v(pins[0]) - node_v(pins[1])
                                kp = float(el.get('kp', 2.0)); ki = float(el.get('ki', 10.0)); kd = float(el.get('kd', 0.05))
                                tf = max(kd / (max(kp, 1e-9) * 10.0), 1e-5)
                                a_d = tf / (tf + dt); b_d = kd / (tf + dt)
                                I_s = getattr(self, f'_pid_i_{idx}', 0.0); D_s = getattr(self, f'_pid_d_{idx}', 0.0); e_p = getattr(self, f'_pid_e_{idx}', 0.0)
                                K_eff = kp + ki * dt + b_d
                                off = I_s + a_d * D_s - b_d * e_p
                                u = K_eff * e0 + off
                                th = math.tanh(max(-30.0, min(30.0, u / 15.0))); f_u = 15.0 * th; gp = K_eff * (1.0 - th * th) + 1e-9
                                if pins[2] > 0: G[pins[2] - 1, b] += 1.0; G[b, pins[2] - 1] += 1.0
                                if pins[0] > 0: G[b, pins[0] - 1] -= gp
                                if pins[1] > 0: G[b, pins[1] - 1] += gp
                                G[b, b] -= 1e-3
                                I_vec[b] = f_u - gp * e0
                            elif etype in ('LM35', 'HCSR04', 'LOGIC_TOGGLE', 'MCU'):
                                out_pin = pins[-1] if pins else 0
                                vout = float(el.get('val', 35.0)) * 0.01 if etype == 'LM35' else (5.0 if el.get('closed', True) else 0.0)
                                if out_pin > 0: G[out_pin - 1, b] += 1.0; G[b, out_pin - 1] += 1.0
                                G[b, b] -= 1e-2
                                I_vec[b] = vout

                        elif etype == 'TRF' and len(pins) >= 4:
                            # محول مثالي: Vs = n·Vp  و  i1 = −n·i2  (i1,i2 داخلان للملفين) + مقاومة ملف ثانوي
                            b1 = branch_idx[idx]
                            b2 = b1 + 1
                            n_t = float(el.get('ratio', el.get('val', 0.055)) or 0.055)
                            r_w = float(el.get('rw', 0.2))
                            p_p, p_n, s_p, s_n = pins[0], pins[1], pins[2], pins[3]
                            if p_p > 0: G[p_p - 1, b1] += 1.0; G[b1, p_p - 1] -= n_t
                            if p_n > 0: G[p_n - 1, b1] -= 1.0; G[b1, p_n - 1] += n_t
                            if s_p > 0: G[s_p - 1, b2] += 1.0; G[b1, s_p - 1] += 1.0
                            if s_n > 0: G[s_n - 1, b2] -= 1.0; G[b1, s_n - 1] -= 1.0
                            G[b1, b2] -= r_w
                            G[b2, b1] += 1.0
                            G[b2, b2] += n_t
                            stamp_g(G, p_p, p_n, 1e-9)

                    try:
                        x_new = np.linalg.solve(G, I_vec)
                    except np.linalg.LinAlgError:
                        x_new = np.linalg.lstsq(G, I_vec, rcond=None)[0]
                        singular_flag = True
                    else:
                        singular_flag = False
                    # فحص البواقي: لو G·x ≠ I يبقى المعادلات متضاربة/مفردة (مثل مصدرين جهد متوازيين)
                    _res = float(np.max(np.abs(G @ x_new - I_vec)))
                    if singular_flag or _res > 1e-5 * (1.0 + float(np.max(np.abs(I_vec)))):
                        if not self._singular or self._singular[-1] != step:
                            self._singular.append(step)

                    _dv = np.abs(x_new - x_guess)
                    diff = float(np.max(_dv))
                    if bool(np.all(_dv <= 1e-5 * np.maximum(np.abs(x_new), np.abs(x_guess)) + 1e-6)):
                        x_guess = x_new
                        break
                    alpha_damp = 0.75 if diff > 1.0 else 0.9
                    x_guess = alpha_damp * x_new + (1.0 - alpha_damp) * x_guess

                else:
                    if is_op:
                        # لم تتقارب نقطة التشغيل: نبدأ من الصفر (UIC) بدل الفشل
                        op_try = False; x_guess = np.zeros(dim); self._op_failed = True
                        self._singular = [q for q in self._singular if q != 0]
                        continue
                    self._nonconv.append((step, float(diff)))
                break
            v_hist[step] = x_guess

            for _ip, _ep in enumerate(self.elements):
                if _ep.get('type') == 'PID' and len(_ep.get('pins', [])) >= 3:
                    _pp = _ep['pins']; _vn2 = lambda k: 0.0 if k <= 0 else float(x_guess[k - 1])
                    _e = _vn2(_pp[0]) - _vn2(_pp[1]); _kp = float(_ep.get('kp', 2.0)); _ki = float(_ep.get('ki', 10.0)); _kd = float(_ep.get('kd', 0.05))
                    _tf = max(_kd / (max(_kp, 1e-9) * 10.0), 1e-5); _a = _tf / (_tf + dt); _b = _kd / (_tf + dt)
                    _Ds = getattr(self, f'_pid_d_{_ip}', 0.0); _ep_ = getattr(self, f'_pid_e_{_ip}', 0.0); _Is = getattr(self, f'_pid_i_{_ip}', 0.0)
                    _D = _a * _Ds + _b * (_e - _ep_)
                    _u = _kp * _e + _Is + _ki * _e * dt + _D
                    if abs(_u) < 15.0 or (_u * _e) < 0:                       # anti-windup: لا تكامل أثناء التشبّع في نفس اتجاه الخطأ
                        _Is += _ki * _e * dt
                    setattr(self, f'_pid_i_{_ip}', _Is); setattr(self, f'_pid_d_{_ip}', _D); setattr(self, f'_pid_e_{_ip}', _e)

            for _id_, _ed in enumerate(self.elements):
                _td = _ed.get('type')
                if _td in ('SCHMITT', 'DFF', 'JKFF', 'COUNTER4'):
                    _pd = _ed.get('pins', []); _vnd = lambda k: 0.0 if k <= 0 else float(x_guess[k - 1])
                    _vdd = float(_ed.get('vcc', 5.0) or 5.0); _st = dict(getattr(self, f'_dg_{_id_}', None) or ({'q': 1} if _td == 'SCHMITT' else {'q': 0, 'clk': 0, 'n': 0}))
                    if _td == 'SCHMITT' and len(_pd) >= 2:
                        _vi = _vnd(_pd[0])
                        if _vi > 0.6 * _vdd: _st['q'] = 0
                        elif _vi < 0.4 * _vdd: _st['q'] = 1
                    elif _td in ('DFF', 'JKFF') and len(_pd) >= 5:
                        _clk = 1 if _vnd(_pd[1]) > 0.5 * _vdd else 0; _rise = _clk == 1 and _st.get('clk', 0) == 0
                        if _td == 'DFF':
                            if _vnd(_pd[2]) > 0.5 * _vdd: _st['q'] = 0
                            elif _rise: _st['q'] = 1 if _vnd(_pd[0]) > 0.5 * _vdd else 0
                        elif _rise:
                            _j = _vnd(_pd[0]) > 0.5 * _vdd; _k = _vnd(_pd[2]) > 0.5 * _vdd
                            _st['q'] = 1 if (_j and not _k) else (0 if (_k and not _j) else ((1 - _st['q']) if (_j and _k) else _st['q']))
                        _st['clk'] = _clk
                    elif _td == 'COUNTER4' and len(_pd) >= 6:
                        _clk = 1 if _vnd(_pd[0]) > 0.5 * _vdd else 0; _rise = _clk == 1 and _st.get('clk', 0) == 0
                        if _vnd(_pd[1]) > 0.5 * _vdd: _st['n'] = 0
                        elif _rise: _st['n'] = (_st['n'] + 1) & 15
                        _st['clk'] = _clk
                    setattr(self, f'_dg_{_id_}', _st)

            # حالة الـ 555 (latch) تتحدث مرة واحدة لكل خطوة مقبولة، خارج حلقة Newton
            for _i5, _e5 in enumerate(self.elements):
                if _e5.get('type') == 'NE555_8' and len(_e5.get('pins', [])) >= 8:
                    _p5 = _e5['pins']; _vn = lambda k: 0.0 if k <= 0 else float(x_guess[k - 1])
                    _vg = _vn(_p5[0]); _hi = _vn(_p5[4]) - _vg; _lo = _hi / 2.0
                    _q = getattr(self, f'_q555_{_i5}', 1)
                    if _vn(_p5[3]) - _vg < 0.7: _q = 0
                    elif _vn(_p5[1]) - _vg < _lo: _q = 1
                    elif _vn(_p5[5]) - _vg > _hi: _q = 0
                    setattr(self, f'_q555_{_i5}', _q)

            for idx, el in enumerate(self.elements):
                etype = el['type']
                pins = el.get('pins', [])
                p0 = pins[0] if len(pins) > 0 else 0
                p1 = pins[1] if len(pins) > 1 else 0
                v0 = 0.0 if p0 <= 0 else x_guess[p0 - 1]
                v1 = 0.0 if p1 <= 0 else x_guess[p1 - 1]
                v_diff = v0 - v1

                if etype in ('D', 'LED', 'Z'):
                    _cjo = float(el.get('cjo', 0.0) or 0.0); _tt = float(el.get('tt', 0.0) or 0.0)
                    if _cjo > 0.0 or _tt > 0.0:
                        if etype == 'LED': _is, _nvt, _rs = _led_params(el)
                        else: _is = float(el.get('Is', 2.55e-9)); _nvt = float(el.get('n', 1.75)) * VT_THERMAL; _rs = float(el.get('rs', 0.042))
                        _id_f, _gd_f = _diode_iv(v_diff, _is, _nvt, _rs)
                        _qd, _ = _jcap_q_c(v_diff, _cjo, el.get('vj', 0.75), el.get('m', 0.333), _tt, max(0.0, _id_f), max(0.0, _gd_f))
                        update_qcap(('D', idx), _qd, dt, mode_tr, use_bdf2, is_op, step)
                elif etype == 'Q' and len(pins) >= 3:
                    _cje = float(el.get('cje', 0.0) or 0.0); _tf = float(el.get('tf', 0.0) or 0.0)
                    _cjc = float(el.get('cjc', 0.0) or 0.0); _tr = float(el.get('tr', 0.0) or 0.0)
                    if _cje > 0.0 or _tf > 0.0 or _cjc > 0.0 or _tr > 0.0:
                        _nb, _nc, _ne = pins[0], pins[1], pins[2]
                        _pol = 1.0 if el.get('pol', 'NPN') == 'NPN' else -1.0
                        _vb = 0.0 if _nb <= 0 else x_guess[_nb - 1]
                        _vc = 0.0 if _nc <= 0 else x_guess[_nc - 1]
                        _ve = 0.0 if _ne <= 0 else x_guess[_ne - 1]
                        _vbe = _pol * (_vb - _ve); _vbc = _pol * (_vb - _vc)
                        _Isq = float(el.get('Is', 1.4e-14) or 1.4e-14)
                        _vtf = VT_THERMAL * float(el.get('nf', 1.0) or 1.0)
                        if _cje > 0.0 or _tf > 0.0:
                            _qbe, _ = _jcap_q_c(_vbe, _cje, el.get('vje', 0.75), el.get('mje', 0.333), _tf, max(0.0, _Isq * (_ex(_vbe / _vtf) - 1.0)), 0.0)
                            update_qcap(('Qbe', idx), _qbe, dt, mode_tr, use_bdf2, is_op, step)
                        if _cjc > 0.0 or _tr > 0.0:
                            _qbc, _ = _jcap_q_c(_vbc, _cjc, el.get('vjc', 0.75), el.get('mjc', 0.333), _tr, max(0.0, _Isq * (_ex(_vbc / VT_THERMAL) - 1.0)), 0.0)
                            update_qcap(('Qbc', idx), _qbc, dt, mode_tr, use_bdf2, is_op, step)
                elif etype == 'M' and len(pins) >= 3:
                    _cgs = float(el.get('cgs', 0.0) or 0.0); _cgd = float(el.get('cgd', 0.0) or 0.0); _cds = float(el.get('cds', 0.0) or 0.0)
                    if _cgs > 0.0 or _cgd > 0.0 or _cds > 0.0:
                        _vg = 0.0 if pins[0] <= 0 else x_guess[pins[0] - 1]
                        _vd = 0.0 if pins[1] <= 0 else x_guess[pins[1] - 1]
                        _vs = 0.0 if pins[2] <= 0 else x_guess[pins[2] - 1]
                        if _cgs > 0.0: update_qcap(('Mgs', idx), _cgs * (_vg - _vs), dt, mode_tr, use_bdf2, is_op, step)
                        if _cgd > 0.0: update_qcap(('Mgd', idx), _cgd * (_vg - _vd), dt, mode_tr, use_bdf2, is_op, step)
                        if _cds > 0.0: update_qcap(('Mds', idx), _cds * (_vd - _vs), dt, mode_tr, use_bdf2, is_op, step)
                if etype in ('C', 'CELEC') and step == 0 and is_op:
                    cap_v_prev1[idx] = cap_v_prev2[idx] = v_diff; setattr(self, f'_ic_{idx}', 0.0)
                elif etype == 'L' and step == 0 and is_op:
                    ind_i_prev1[idx] = ind_i_prev2[idx] = 1e5 * v_diff; setattr(self, f'_vl_{idx}', 0.0)
                elif etype in ('C', 'CELEC'):
                    c_val = max(1e-12, self._parse_val(el.get('val', 1e-6), 1e-6))
                    v_old = cap_v_prev1.get(idx, 0.0)
                    v_older = cap_v_prev2.get(idx, 0.0)
                    if mode_tr or not use_bdf2:
                        g_c = (2.0 * c_val) / dt
                        ic_new = g_c * (v_diff - v_old) - getattr(self, f'_ic_{idx}', 0.0)
                    else:
                        ic_new = (1.5 * c_val / dt) * v_diff - (c_val / dt) * (2.0 * v_old - 0.5 * v_older)
                    setattr(self, f'_ic_{idx}', ic_new)
                    cap_v_prev2[idx] = v_old
                    cap_v_prev1[idx] = v_diff

                elif etype == 'L':
                    l_val = max(1e-9, self._parse_val(el.get('val', 1e-3), 1e-3))
                    i_old = ind_i_prev1.get(idx, 0.0)
                    i_older = ind_i_prev2.get(idx, 0.0)
                    if mode_tr or not use_bdf2:
                        g_l = dt / (2.0 * l_val + 1e-4 * dt)
                        i_new = i_old + g_l * (getattr(self, f'_vl_{idx}', 0.0) + v_diff)
                    else:
                        g_l = dt / (1.5 * l_val + 1e-4 * dt)
                        i_new = (4.0 / 3.0) * i_old - (1.0 / 3.0) * i_older + g_l * v_diff
                    setattr(self, f'_vl_{idx}', v_diff)
                    ind_i_prev2[idx] = i_old
                    ind_i_prev1[idx] = i_new

                elif etype == 'MOTOR':
                    mid = el.get('id', idx)
                    st = motor_states[mid]
                    is_ind = 'INDUCTION' in str(el.get('part', '')).upper()
                    t_load = float(el.get('load', 0.05))
                    J = 0.0012
                    B = 0.0008
                    if is_ind:
                        w_sync = 2.0 * math.pi * 50.0
                        slip = max(0.005, (w_sync - st['omega']) / w_sync)
                        r2 = 1.65
                        x2 = 2.2
                        v_rms = max(abs(v_diff), 12.0) / math.sqrt(2.0)
                        t_e = (3.0 * (v_rms ** 2) * (r2 / slip)) / (w_sync * ((r2 / slip) ** 2 + x2 ** 2))
                        i_curr = v_rms / math.sqrt((r2 / slip) ** 2 + x2 ** 2)
                    else:
                        kt = 0.052
                        ke = 0.052
                        ra = 1.45
                        la = 0.012
                        i_prev_m = st.get('i_a', 0.0)
                        i_curr = (v_diff - ke * st['omega'] + (la / dt) * i_prev_m) / (ra + la / dt)
                        t_e = kt * abs(i_curr)

                    st['i_a'] = i_curr
                    dw = ((t_e - t_load - B * st['omega']) / J) * dt
                    st['omega'] = max(0.0, st['omega'] + dw)
                    st['angle'] = (st['angle'] + math.degrees(st['omega'] * dt)) % 360.0
                    st['rpm'] = (st['omega'] * 60.0) / (2.0 * math.pi)
                    st['torque'] = t_e
                    st['current'] = abs(i_curr)
                    st['history']['t'].append(float(t))
                    st['history']['rpm'].append(float(st['rpm']))
                    st['history']['torque'].append(float(st['torque']))
                    st['history']['current'].append(float(st['current']))

                elif etype == 'AMMETER':
                    b = branch_idx[idx]
                    ammeters[el.get('id', idx)] = float(abs(x_guess[b]))

                elif etype == 'LED':
                    _is, _nvt, _rs = _led_params(el)
                    leds[el.get('id', idx)] = max(0.0, _diode_iv(v_diff, _is, _nvt, _rs)[0])

        for idx, el in enumerate(self.elements):
            etype = el['type']
            pins = el.get('pins', [])
            p0 = pins[0] if len(pins) > 0 else 0
            p1 = pins[1] if len(pins) > 1 else 0
            v0_arr = v_hist[:, p0 - 1] if p0 > 0 else np.zeros(len(times))
            v1_arr = v_hist[:, p1 - 1] if p1 > 0 else np.zeros(len(times))
            vd_arr = v0_arr - v1_arr

            if etype == 'WATTMETER' and len(pins) >= 4:
                _a = lambda k: v_hist[:, k - 1] if k > 0 else np.zeros(len(times))
                _vc = _a(pins[0]) - _a(pins[1]); _ic = (_a(pins[2]) - _a(pins[3])) / 1e-3
                _P = float(np.mean(_vc * _ic)); _Vr = float(np.sqrt(np.mean(_vc ** 2))); _Ir = float(np.sqrt(np.mean(_ic ** 2))); _S = _Vr * _Ir
                _wid = el.get('id', idx); powers[_wid] = round(_P, 4)
                self._meters[_wid] = {'P': _P, 'Vrms': _Vr, 'Irms': _Ir, 'S': _S, 'PF': (_P / _S if _S > 1e-12 else 0.0)}
            elif etype == 'BCD7' and len(pins) >= 4:
                _bits = [1 if (p > 0 and float(v_hist[-1, p - 1]) > 2.5) else 0 for p in pins[:4]]
                bcds[el.get('id', idx)] = sum(b << i for i, b in enumerate(_bits))
            elif etype == 'R':
                r_val = max(1e-3, self._parse_val(el.get('val', 50.0), 50.0))
                p_avg = float(np.mean((vd_arr ** 2) / r_val))
                powers[el.get('id', idx)] = round(p_avg, 2)
            elif etype == 'MOTOR':
                mid = el.get('id', idx)
                st = motor_states.get(mid, {})
                i_hist = np.array(st.get('history', {}).get('current', [0.0]))
                p_avg = float(np.mean(np.abs(vd_arr[:len(i_hist)] * i_hist))) if len(i_hist) > 0 else 0.0
                powers[mid] = round(p_avg, 2)

        node_voltages = {0: [0.0] * len(times)}
        for k in range(n):
            node_voltages[k + 1] = v_hist[:, k].tolist()

        fft_freqs, fft_mags = [], []
        if n > 0 and len(times) > 4:
            freqs = np.fft.rfftfreq(len(times), d=dt)
            fft_freqs = freqs[:60].tolist()
            for k in range(n):
                sig = v_hist[:, k] - np.mean(v_hist[:, k])
                mag = (2.0 / len(times)) * np.abs(np.fft.rfft(sig))
                fft_mags.append(mag[:60].tolist())

        n_steps_total = len(times)
        finite = bool(np.all(np.isfinite(v_hist)))
        peak = float(np.max(np.abs(v_hist[:, :n]))) if finite and n > 0 else float('inf')
        bad = len(self._nonconv)
        sing = len(self._singular)
        peak_i = float(np.max(np.abs(v_hist[:, n:]))) if finite and dim > n else 0.0
        converged_ok = finite and bad == 0 and peak < 1e6 and sing == 0 and peak_i < 1e3
        self.diag = {'nonconv_steps': bad, 'steps': n_steps_total, 'worst_diff': max([d for _, d in self._nonconv], default=0.0),
                     'first_bad_step': self._nonconv[0][0] if self._nonconv else None, 'singular_steps': sing, 'peak_i': peak_i if finite else None, 'finite': finite, 'peak_v': peak if finite else None,
                     'integrator': 'trapezoidal' if mode_tr else 'BDF2', 'meters': self._meters,
                     'op': 'UIC' if not getattr(self, 'use_op', True) else ('failed->UIC' if self._op_failed else 'DC OP')}
        if converged_ok:
            explanations = ['✅ تم الحل: تقارب Newton في كل الخطوات (%s).' % self.diag['integrator']]
        elif peak_i >= 1e3:
            explanations = ['❌ تيارات غير واقعية (%.3g A) — غالباً قصر دائرة، أو مصدرا جهد متوازيان بقيمتين مختلفتين.' % peak_i]
        elif sing > 0:
            explanations = ['❌ معادلات الدائرة متضاربة أو مفردة (%d خطوة) — غالباً مصدرا جهد متوازيان بقيمتين مختلفتين، أو حلقة مصادر جهد/ملفات، أو توصيل خاطئ.' % sing]
        elif not finite:
            explanations = ['❌ الحل فيه قيم غير منتهية (NaN/Inf) — الدائرة غير قابلة للحل بهذه الإعدادات (فرع عائم أو حلقة غير مستقرة).']
        elif peak >= 1e6:
            explanations = ['❌ جهود غير واقعية (%.3g V) — الدائرة غير مستقرة أو متصلة بشكل خاطئ.' % peak]
        else:
            explanations = ['⚠️ Newton لم يتقارب في %d من %d خطوة (أول خطوة %s، أقصى فرق %.3g) — النتيجة قد تكون غير دقيقة.' % (bad, n_steps_total, self._nonconv[0][0], self.diag['worst_diff'])]
        return (
            times.tolist(),
            node_voltages,
            leds,
            powers,
            ammeters,
            motor_states,
            bcds,
            "",
            [],
            [],
            fft_freqs,
            fft_mags,
            explanations,
            converged_ok
        )

    def run_transient(self, t_stop=0.04, num_steps=800, dt_base=None, **kwargs):
        return self.solve_transient(t_stop=t_stop, num_steps=num_steps, dt_base=dt_base, **kwargs)

    def simulate(self, t_stop=0.04, num_steps=800, dt_base=None, **kwargs):
        return self.solve_transient(t_stop=t_stop, num_steps=num_steps, dt_base=dt_base, **kwargs)

    def solve_dc(self, **kwargs):
        return self.solve_transient(t_stop=1e-4, num_steps=5, **kwargs)

    def run_dc(self, **kwargs):
        return self.solve_dc(**kwargs)

    def solve_ac(self, f_start=10.0, f_stop=1e5, points=60, **kwargs):
        freqs = np.logspace(np.log10(max(1e-2, f_start)), np.log10(max(1.0, f_stop)), int(points))
        n = max(1, self.num_nodes)
        mags, phases = [], []
        for k in range(n):
            m_k, p_k = [], []
            for f in freqs:
                w = 2.0 * math.pi * f
                tau = 0.0
                for el in self.elements:
                    if el['type'] in ('C', 'CELEC'):
                        tau += self._parse_val(el.get('val', 1e-6), 1e-6) * 1000.0
                    elif el['type'] == 'L':
                        tau += self._parse_val(el.get('val', 1e-3), 1e-3) / 1000.0
                h = 1.0 / complex(1.0, w * max(1e-6, tau))
                m_k.append(float(20.0 * math.log10(max(1e-9, abs(h)))))
                p_k.append(float(math.degrees(math.atan2(h.imag, h.real))))
            mags.append(m_k)
            phases.append(p_k)
        return {'status': 'ok', 'freqs': freqs.tolist(), 'mags': mags, 'phases': phases}

    def run_ac_bode_and_stability(self, f_start=1.0, f_stop=1e6, points=160, **kwargs):
        """تحليل AC خطي حقيقي (MNA بأعداد مركبة): R, C, L, مصادر جهد، Op-Amp مثالي.
        المصدر المُحرِّك = أول مصدر AC (سعة 1V)، وبقية المصادر أرضي AC. العناصر غير الخطية تُعتبر مفتوحة (لا نموذج إشارة صغيرة لها)."""
        self._enrich_from_request()
        freqs = np.logspace(np.log10(max(1e-2, f_start)), np.log10(max(1.0, f_stop)), int(points))
        n = max(1, self.num_nodes)
        els = self.elements
        drv = next((i for i, e in enumerate(els) if e['type'] == 'V' and (float(e.get('freq', 0) or 0) > 0 or float(e.get('amp', 0) or 0) > 0)), None)
        if drv is None:
            drv = next((i for i, e in enumerate(els) if e['type'] == 'V'), None)
        vs = [i for i, e in enumerate(els) if e['type'] in ('V', 'VCC')]
        ops = [i for i, e in enumerate(els) if e['type'] == 'OP' and len(e.get('pins', [])) >= 3]
        dim = n + len(vs) + len(ops)
        mags = [[] for _ in range(n)]
        phases = [[] for _ in range(n)]
        for f in freqs:
            w = 2.0 * math.pi * float(f)
            A = np.zeros((dim, dim), dtype=complex)
            rhs = np.zeros(dim, dtype=complex)
            for k in range(n):
                A[k, k] += 1e-12

            def stamp(n1, n2, y):
                if n1 > 0: A[n1 - 1, n1 - 1] += y
                if n2 > 0: A[n2 - 1, n2 - 1] += y
                if n1 > 0 and n2 > 0:
                    A[n1 - 1, n2 - 1] -= y
                    A[n2 - 1, n1 - 1] -= y

            for idx, el in enumerate(els):
                t = el['type']
                pins = el.get('pins', [])
                p0 = pins[0] if len(pins) > 0 else 0
                p1 = pins[1] if len(pins) > 1 else 0
                if t in ('R', 'FUSE', 'LDR', 'NTC'):
                    stamp(p0, p1, 1.0 / max(1e-3, self._parse_val(el.get('val', 100.0), 100.0)))
                elif t == 'POT':
                    stamp(p0, p1, 1.0 / max(1e-3, self._parse_val(el.get('val', 1000.0), 1000.0)))
                elif t in ('C', 'CELEC'):
                    stamp(p0, p1, 1j * w * self._parse_val(el.get('val', 1e-6), 1e-6))
                elif t == 'L':
                    stamp(p0, p1, 1.0 / (1j * w * max(1e-12, self._parse_val(el.get('val', 1e-3), 1e-3))))
            for j, idx in enumerate(vs):
                el = els[idx]; pins = el.get('pins', []); p0 = pins[0] if len(pins) > 0 else 0; p1 = pins[1] if len(pins) > 1 else 0; b = n + j
                if p0 > 0: A[p0 - 1, b] += 1.0; A[b, p0 - 1] += 1.0
                if p1 > 0: A[p1 - 1, b] -= 1.0; A[b, p1 - 1] -= 1.0
                A[b, b] -= 1e-9
                rhs[b] = 1.0 if idx == drv else 0.0
            for j, idx in enumerate(ops):
                pins = els[idx]['pins']; b = n + len(vs) + j; pp, pm, po = pins[0], pins[1], pins[2]; gain = 1e5
                if po > 0: A[po - 1, b] += 1.0; A[b, po - 1] += 1.0
                if pp > 0: A[b, pp - 1] -= gain
                if pm > 0: A[b, pm - 1] += gain
            try:
                x = np.linalg.solve(A, rhs)
            except np.linalg.LinAlgError:
                x = np.linalg.lstsq(A, rhs, rcond=None)[0]
            for k in range(n):
                h = x[k]
                mags[k].append(float(max(-120.0, 20.0 * math.log10(max(1e-9, abs(h))))))
                phases[k].append(float(math.degrees(math.atan2(h.imag, h.real))))
        return freqs.tolist(), mags, phases, []

    def run_ac(self, f_start=10.0, f_stop=1e5, points=60, **kwargs):
        return self.solve_ac(f_start=f_start, f_stop=f_stop, points=points, **kwargs)

class ProCircuitSolver(ProSpiceBDF2Solver):
    pass
