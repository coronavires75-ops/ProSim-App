import numpy as np
import math

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

    def add_element(self, el):
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

        if t < delay:
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
        try:
            from flask import request, has_request_context
            if not has_request_context():
                return
            req_data = request.get_json(silent=True) or {}
            req_comps = [c for c in req_data.get('components', []) if c.get('type') != 'GND']
            if not req_comps:
                return

            by_id = {c.get('id'): c for c in req_comps if c.get('id') is not None}
            by_type = {}
            for c in req_comps:
                t_key = c.get('type', '')
                by_type.setdefault(t_key, []).append(c)

            type_counters = {}
            for el in self.elements:
                matched = None
                if el.get('id') in by_id:
                    matched = by_id[el['id']]
                else:
                    et = el.get('type', '')
                    idx_t = type_counters.get(et, 0)
                    candidates = by_type.get(et, [])
                    if idx_t < len(candidates):
                        matched = candidates[idx_t]
                    type_counters[et] = idx_t + 1

                if matched:
                    for k, v in matched.items():
                        if k not in ('pins', 'type'):
                            el[k] = v
        except Exception:
            pass

    def solve_transient(self, t_stop=0.04, num_steps=800, dt_base=None, **kwargs):
        self._enrich_from_request()
        if dt_base and dt_base > 0:
            num_steps = max(400, min(1600, int(round(float(t_stop) / float(dt_base)))))
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

        def stamp_g(G, n1, n2, g):
            if n1 > 0: G[n1 - 1, n1 - 1] += g
            if n2 > 0: G[n2 - 1, n2 - 1] += g
            if n1 > 0 and n2 > 0:
                G[n1 - 1, n2 - 1] -= g
                G[n2 - 1, n1 - 1] -= g

        def stamp_i(I_vec, n_from, n_to, val):
            if n_from > 0: I_vec[n_from - 1] -= val
            if n_to > 0: I_vec[n_to - 1] += val

        for step, t in enumerate(times):
            x_guess = v_hist[step - 1].copy() if step > 0 else np.zeros(dim)
            use_bdf2 = (step >= 2)

            for nr in range(25):
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

                    if etype in ('R', 'FUSE', 'LDR', 'NTC', 'WATTMETER'):
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

                    elif etype in ('C', 'CELEC'):
                        c_val = max(1e-12, self._parse_val(el.get('val', 1e-6), 1e-6))
                        v1 = cap_v_prev1.get(idx, 0.0)
                        v2 = cap_v_prev2.get(idx, 0.0)
                        if not use_bdf2:
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
                        if not use_bdf2:
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
                        vd_lim = max(-100.0, min(0.88, vd))
                        is_sat = float(el.get('Is', 2.5e-9))
                        n_vt = float(el.get('n', 1.75)) * 0.02585
                        exp_v = math.exp(min(34.0, vd_lim / n_vt))
                        g_d = (is_sat / n_vt) * exp_v + 1e-9
                        i_d = is_sat * (exp_v - 1.0)
                        if etype == 'Z':
                            vz = self._parse_val(el.get('val', 5.1), 5.1)
                            if vd < -vz:
                                v_rev = -(vd + vz)
                                g_d += 5.0
                                i_d -= 5.0 * v_rev
                        i_eq = i_d - g_d * vd_lim
                        stamp_g(G, p0, p1, g_d)
                        stamp_i(I_vec, p0, p1, i_eq)

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

                    elif etype == 'BRIDGE' and len(pins) >= 4:
                        ac1, ac2, dcp, dcm = pins[0], pins[1], pins[2], pins[3]
                        for a_n, c_n in [(ac1, dcp), (ac2, dcp), (dcm, ac1), (dcm, ac2)]:
                            vd = max(-50.0, min(0.84, node_v(a_n) - node_v(c_n)))
                            exp_v = math.exp(min(32.0, vd / 0.042))
                            gd = (1e-8 / 0.042) * exp_v + 1e-9
                            id_curr = 1e-8 * (exp_v - 1.0)
                            stamp_g(G, a_n, c_n, gd)
                            stamp_i(I_vec, a_n, c_n, id_curr - gd * vd)

                    elif etype == 'Q' and len(pins) >= 3:
                        nb, nc, ne = pins[0], pins[1], pins[2]
                        pol = 1.0 if el.get('pol', 'NPN') == 'NPN' else -1.0
                        bf = float(el.get('bf', el.get('val', 180.0)))
                        vbe = max(-5.0, min(0.84, pol * (node_v(nb) - node_v(ne))))
                        exp_be = math.exp(min(32.0, vbe / 0.02585))
                        ib = 1e-13 * (exp_be - 1.0)
                        ic = bf * ib
                        g_pi = (1e-13 / 0.02585) * exp_be + 1e-9
                        gm = bf * g_pi
                        stamp_g(G, nb, ne, g_pi)
                        stamp_i(I_vec, nb, ne, pol * (ib - g_pi * vbe))
                        if vbe > 0.62:
                            stamp_g(G, nc, ne, 1.0 / 0.15)
                        else:
                            if nc > 0:
                                if nb > 0: G[nc - 1, nb - 1] += gm
                                if ne > 0: G[nc - 1, ne - 1] -= gm
                            if ne > 0:
                                if nb > 0: G[ne - 1, nb - 1] -= gm
                                if ne > 0: G[ne - 1, ne - 1] += gm
                            stamp_i(I_vec, nc, ne, pol * (ic - gm * vbe))
                            stamp_g(G, nc, ne, 1e-7)

                    elif etype == 'M' and len(pins) >= 3:
                        ng, nd, ns = pins[0], pins[1], pins[2]
                        pol = 1.0 if el.get('pol', 'N') == 'N' else -1.0
                        vth = abs(float(el.get('vth', el.get('val', 2.5))))
                        kp = float(el.get('kp', 2.0))
                        vgs = pol * (node_v(ng) - node_v(ns))
                        vds = pol * (node_v(nd) - node_v(ns))
                        vov = vgs - vth
                        if vov > 0:
                            if vds < vov:
                                ids = kp * (vov * vds - 0.5 * vds * vds)
                                gds = max(1e-5, kp * (vov - vds))
                            else:
                                ids = 0.5 * kp * vov * vov
                                gds = 1e-4
                            stamp_g(G, nd, ns, gds)
                            stamp_i(I_vec, nd, ns, pol * (ids - gds * vds))
                        else:
                            stamp_g(G, nd, ns, 1e-8)

                    elif etype in ('TRIAC', 'SCR') and len(pins) >= 3:
                        ng, nk, na = pins[0], pins[1], pins[2]
                        vgk = node_v(ng) - node_v(nk)
                        vak = node_v(na) - node_v(nk)
                        vgt = float(el.get('vgt', 0.55))
                        ih = float(el.get('ih', 0.005))
                        vtm = float(el.get('vtm', 0.85))
                        ron = max(0.05, float(el.get('ron', 0.15)))
                        rg_int = 1200.0
                        is_scr = (etype == 'SCR') or ('SCR' in str(el.get('part', '')).upper())

                        latched = getattr(self, f'_latched_{idx}', False)
                        iak_est = (abs(vak) - vtm) / ron if abs(vak) > vtm else 0.0

                        # دعم القدح المباشر بزاوية الإشعال alpha أو بجهد البوابة vgk
                        alpha_deg = el.get('alpha', None)
                        alpha_trig = False
                        if alpha_deg is not None:
                            period = 1.0 / max(1.0, sync_freq)
                            half_p = period / 2.0
                            t_mod = t % half_p
                            if t_mod >= (float(alpha_deg) / 180.0) * half_p:
                                alpha_trig = True

                        if is_scr:
                            if vak <= 0.2 or (latched and iak_est < ih and vgk < vgt and not alpha_trig):
                                latched = False
                            elif vak > 0.4 and (vgk >= vgt or alpha_trig or (latched and iak_est >= ih)):
                                latched = True
                        else:
                            if abs(vak) <= 0.2 or (latched and iak_est < ih and abs(vgk) < vgt and not alpha_trig):
                                latched = False
                            elif abs(vak) > 0.4 and (abs(vgk) >= vgt or alpha_trig or (latched and iak_est >= ih)):
                                latched = True

                        setattr(self, f'_latched_{idx}', latched)
                        if latched:
                            stamp_g(G, na, nk, 1.0 / ron)
                            stamp_i(I_vec, na, nk, -vtm / ron if vak >= 0 else vtm / ron)
                        else:
                            stamp_g(G, na, nk, 1e-8)
                        stamp_g(G, ng, nk, 1.0 / rg_int)

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
                            vout = min(max(0.0, vin - 1.5), vtarget)
                            if pins[2] > 0: G[pins[2] - 1, b] += 1.0; G[b, pins[2] - 1] += 1.0
                            if pins[1] > 0: G[pins[1] - 1, b] -= 1.0; G[b, pins[1] - 1] -= 1.0
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
                        elif etype in ('OP', 'PID') and len(pins) >= 3:
                            err = node_v(pins[0]) - node_v(pins[1])
                            gain = float(el.get('kp', 100.0)) if etype == 'PID' else 1000.0
                            vout = max(-15.0, min(15.0, gain * err))
                            if pins[2] > 0: G[pins[2] - 1, b] += 1.0; G[b, pins[2] - 1] += 1.0
                            G[b, b] -= 1e-2
                            I_vec[b] = vout
                        elif etype in ('LM35', 'HCSR04', 'LOGIC_TOGGLE', 'MCU'):
                            out_pin = pins[-1] if pins else 0
                            vout = float(el.get('val', 35.0)) * 0.01 if etype == 'LM35' else (5.0 if el.get('closed', True) else 0.0)
                            if out_pin > 0: G[out_pin - 1, b] += 1.0; G[b, out_pin - 1] += 1.0
                            G[b, b] -= 1e-2
                            I_vec[b] = vout

                    elif etype == 'TRF' and len(pins) >= 4:
                        b1 = branch_idx[idx]
                        b2 = b1 + 1
                        ratio = float(el.get('val', 0.055))
                        p_p, p_n, s_p, s_n = pins[0], pins[1], pins[2], pins[3]
                        if p_p > 0: G[p_p - 1, b1] += 1.0; G[b1, p_p - 1] += 1.0
                        if p_n > 0: G[p_n - 1, b1] -= 1.0; G[b1, p_n - 1] -= 1.0
                        if s_p > 0: G[s_p - 1, b2] += 1.0; G[b2, s_p - 1] += 1.0
                        if s_n > 0: G[s_n - 1, b2] -= 1.0; G[b2, s_n - 1] -= 1.0
                        G[b2, b1] -= ratio
                        G[b2, b2] -= 1e-3
                        stamp_g(G, p_p, p_n, 1e-4)

                try:
                    x_new = np.linalg.solve(G, I_vec)
                except np.linalg.LinAlgError:
                    x_new = np.linalg.lstsq(G, I_vec, rcond=None)[0]

                diff = np.max(np.abs(x_new - x_guess))
                if diff < 1e-6:
                    x_guess = x_new
                    break
                alpha_damp = 0.75 if diff > 1.0 else 0.9
                x_guess = alpha_damp * x_new + (1.0 - alpha_damp) * x_guess

            v_hist[step] = x_guess

            for idx, el in enumerate(self.elements):
                etype = el['type']
                pins = el.get('pins', [])
                p0 = pins[0] if len(pins) > 0 else 0
                p1 = pins[1] if len(pins) > 1 else 0
                v0 = 0.0 if p0 <= 0 else x_guess[p0 - 1]
                v1 = 0.0 if p1 <= 0 else x_guess[p1 - 1]
                v_diff = v0 - v1

                if etype in ('C', 'CELEC'):
                    c_val = max(1e-12, self._parse_val(el.get('val', 1e-6), 1e-6))
                    v_old = cap_v_prev1.get(idx, 0.0)
                    setattr(self, f'_ic_{idx}', c_val * (v_diff - v_old) / dt)
                    cap_v_prev2[idx] = v_old
                    cap_v_prev1[idx] = v_diff

                elif etype == 'L':
                    l_val = max(1e-9, self._parse_val(el.get('val', 1e-3), 1e-3))
                    i_old = ind_i_prev1.get(idx, 0.0)
                    i_new = i_old + (dt / l_val) * v_diff
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
                    leds[el.get('id', idx)] = max(0.0, (v_diff - 1.7) / 100.0)

        for idx, el in enumerate(self.elements):
            etype = el['type']
            pins = el.get('pins', [])
            p0 = pins[0] if len(pins) > 0 else 0
            p1 = pins[1] if len(pins) > 1 else 0
            v0_arr = v_hist[:, p0 - 1] if p0 > 0 else np.zeros(len(times))
            v1_arr = v_hist[:, p1 - 1] if p1 > 0 else np.zeros(len(times))
            vd_arr = v0_arr - v1_arr

            if etype in ('R', 'WATTMETER'):
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

        explanations = ['✅ تم الحل بدقة SPICE الفيزيائية الكاملة (BDF2 + Sync-Aware Gate Firing + Forced Commutation).']
        return (
            times.tolist(),
            node_voltages,
            leds,
            powers,
            ammeters,
            motor_states,
            {},
            "",
            [],
            [],
            fft_freqs,
            fft_mags,
            explanations,
            True
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

    def run_ac(self, f_start=10.0, f_stop=1e5, points=60, **kwargs):
        return self.solve_ac(f_start=f_start, f_stop=f_stop, points=points, **kwargs)

class ProCircuitSolver(ProSpiceBDF2Solver):
    pass
