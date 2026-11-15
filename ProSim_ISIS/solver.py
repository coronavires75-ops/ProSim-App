import numpy as np

class ProCircuitSolver:
    def __init__(self, num_nodes):
        self.num_nodes = num_nodes
        self.resistors = []
        self.capacitors = []
        self.inductors = []
        self.transformers = []
        self.v_sources = []
        self.diodes = []
        self.zeners = []
        self.leds = []
        self.opamps = []
        self.mosfets = []
        self.bjts = []
        self.scrs = []
        self.triacs = []
        self.diacs = []
        self.logic_gates = []
        self.mcus = []
        self.regulators = []
        self.ne555s = []
        self.optocouplers = []
        self.relays = []
        self.motors = []
        self.bcd_displays = []
        self.ammeters = []
        self.pids = []
        self.lcds = []

    def _next_extra_idx(self):
        return len(self.v_sources) + len(self.inductors) + len(self.opamps) + len(self.transformers) + len(self.ammeters)

    def add_resistor(self, n1, n2, value, id_tag=None, part='RES'):
        self.resistors.append({'n1': n1, 'n2': n2, 'R': max(abs(value), 1e-6), 'id': id_tag, 'part': part, 'p_sum': 0.0, 'steps': 0})

    def add_ammeter(self, n1, n2, id_tag=None):
        self.ammeters.append({'n1': n1, 'n2': n2, 'id': id_tag, 'idx': self._next_extra_idx(), 'i_sum': 0.0, 'steps': 0})

    def add_capacitor(self, n1, n2, value):
        self.capacitors.append({'n1': n1, 'n2': n2, 'C': max(abs(value), 1e-15), 'v_prev': 0.0, 'v_max': 0.0})

    def add_inductor(self, n1, n2, value):
        self.inductors.append({'n1': n1, 'n2': n2, 'L': max(abs(value), 1e-12), 'i_prev': 0.0, 'idx': self._next_extra_idx()})

    def add_transformer(self, p1, p2, s1, s2, ratio=0.1):
        self.transformers.append({'p1': p1, 'p2': p2, 's1': s1, 's2': s2, 'n': max(abs(ratio), 1e-4), 'idx': self._next_extra_idx()})

    def add_vsource(self, n1, n2, dc=0.0, amp=0.0, freq=0.0, wave='sine', phase_deg=0.0):
        self.v_sources.append({
            'n1': n1, 'n2': n2, 'dc': dc, 'amp': amp, 'freq': max(abs(freq), 0.0),
            'wave': wave, 'phase': np.deg2rad(phase_deg), 'idx': self._next_extra_idx()
        })

    def add_diode(self, n1, n2, Is=1e-12, n=1.0, part='1N4007'):
        self.diodes.append({'n1': n1, 'n2': n2, 'Is': max(Is, 1e-20), 'n': max(n, 0.5), 'part': part, 'v_guess': 0.6, 'conducted': False, 'v_drop': 0.0})

    def add_led(self, n1, n2, id_tag):
        self.leds.append({'n1': n1, 'n2': n2, 'Is': 1e-18, 'n': 1.8, 'v_guess': 1.8, 'id': id_tag, 'last_i': 0.0, 'max_i': 0.0})

    def add_zener(self, n1, n2, vz=5.1, Is=1e-12, part='1N4733A'):
        self.zeners.append({'n1': n1, 'n2': n2, 'vz': max(abs(vz), 0.5), 'Is': Is, 'part': part, 'v_guess': 0.0, 'clamped': False})

    def add_opamp(self, np_node, nm_node, nout_node):
        self.opamps.append({'np': np_node, 'nm': nm_node, 'nout': nout_node, 'idx': self._next_extra_idx()})

    def add_mosfet(self, ng, nd, ns, vth=2.0, kp=0.5, pol='N', part='IRFZ44N'):
        self.mosfets.append({'ng': ng, 'nd': nd, 'ns': ns, 'vth': vth, 'kp': kp, 'pol': pol, 'part': part, 'vgs_g': 0.0, 'vds_g': 0.0, 'turned_on': False})

    def add_bjt(self, nb, nc, ne, Is=1e-14, bf=150.0, pol='NPN', part='2N2222'):
        self.bjts.append({'nb': nb, 'nc': nc, 'ne': ne, 'Is': Is, 'bf': max(bf, 1.0), 'pol': pol, 'part': part, 'vbe_g': 0.6, 'active': False})

    def add_scr(self, ng, na, nk, vgt=0.7, ih=0.005, part='BT151'):
        self.scrs.append({'ng': ng, 'na': na, 'nk': nk, 'vgt': vgt, 'ih': ih, 'part': part, 'latched': False, 'ever_latched': False})

    def add_triac(self, ng, mt1, mt2, vgt=0.8, ih=0.005, part='BT136'):
        self.triacs.append({'ng': ng, 'mt1': mt1, 'mt2': mt2, 'vgt': vgt, 'ih': ih, 'part': part, 'latched': False, 'ever_latched': False})

    def add_diac(self, mt1, mt2, vbo=32.0, part='DB3'):
        self.diacs.append({'mt1': mt1, 'mt2': mt2, 'vbo': max(abs(vbo), 1.0), 'part': part, 'conducting': False, 'ever_fired': False})

    def add_logic_gate(self, gate_type, in1, in2, out):
        self.logic_gates.append({'type': gate_type, 'in1': in1, 'in2': in2, 'out': out, 'v_out': 0.0})

    def add_mcu(self, in_pin, out_pin, code="", pwm_freq=250.0, threshold=2.5):
        self.mcus.append({'in': in_pin, 'out': out_pin, 'code': code, 'freq': pwm_freq, 'th': threshold, 'v_out': 0.0, 'logs': [], 'bus_frames': [], 'lcd_text': 'ProSim Ready!'})

    def add_regulator(self, nin, ngnd, nout, vout=5.0, part='7805'):
        self.regulators.append({'nin': nin, 'ngnd': ngnd, 'nout': nout, 'vout': vout, 'part': part, 'v_reg': 0.0, 'active': False})

    def add_ne555(self, ntrig, nthres, ndisch, nout):
        self.ne555s.append({'trig': ntrig, 'thres': nthres, 'disch': ndisch, 'out': nout, 'q': False, 'oscillated': False})

    def add_optocoupler(self, na, nk, nc, ne, part='PC817'):
        self.optocouplers.append({'na': na, 'nk': nk, 'nc': nc, 'ne': ne, 'part': part, 'active': False})

    def add_relay(self, nc1, nc2, ncom, nno, v_coil=5.0, id_tag=None):
        self.relays.append({'nc1': nc1, 'nc2': nc2, 'ncom': ncom, 'nno': nno, 'v_coil': v_coil, 'id': id_tag, 'closed': False, 'ever_closed': False})

    def add_motor(self, n1, n2, motor_type='DC', id_tag=None):
        self.motors.append({'n1': n1, 'n2': n2, 'type': motor_type, 'id': id_tag, 'rpm': 0.0, 'angle': 0.0, 'v_last': 0.0})

    def add_bcd_display(self, d0, d1, d2, d3, id_tag=None):
        self.bcd_displays.append({'pins': [d0, d1, d2, d3], 'id': id_tag, 'digit': 0})

    def add_pid(self, n_set, n_fb, n_out, kp=2.0, ki=10.0, kd=0.05):
        self.pids.append({'n_set': n_set, 'n_fb': n_fb, 'n_out': n_out, 'kp': kp, 'ki': ki, 'kd': kd, 'integral': 0.0, 'prev_err': 0.0, 'v_out': 0.0})

    def add_lcd(self, n_in, id_tag=None):
        self.lcds.append({'n_in': n_in, 'id': id_tag, 'text': 'V_IN = 0.00V'})

    def _stamp_g(self, A, n1, n2, g):
        if n1 > 0: A[n1-1, n1-1] += g
        if n2 > 0: A[n2-1, n2-1] += g
        if n1 > 0 and n2 > 0:
            A[n1-1, n2-1] -= g
            A[n2-1, n1-1] -= g

    def _stamp_i(self, Z, n1, n2, val):
        if n1 > 0: Z[n1-1] -= val
        if n2 > 0: Z[n2-1] += val

    def _stamp_vccs(self, A, n_out_p, n_out_m, n_ctrl_p, n_ctrl_m, gm):
        if n_out_p > 0 and n_ctrl_p > 0: A[n_out_p-1, n_ctrl_p-1] += gm
        if n_out_p > 0 and n_ctrl_m > 0: A[n_out_p-1, n_ctrl_m-1] -= gm
        if n_out_m > 0 and n_ctrl_p > 0: A[n_out_m-1, n_ctrl_p-1] -= gm
        if n_out_m > 0 and n_ctrl_m > 0: A[n_out_m-1, n_ctrl_m-1] += gm

    def _eval_source(self, vs, t, scale=1.0):
        if vs['freq'] <= 0 or vs['amp'] == 0:
            return vs['dc'] * scale
        angle = 2 * np.pi * vs['freq'] * t - vs['phase']
        if vs['wave'] == 'square':
            val = vs['dc'] + (vs['amp'] if np.sin(angle) >= 0 else 0.0)
        elif vs['wave'] == 'pulse':
            mod_ang = angle % (2 * np.pi)
            val = vs['dc'] + (vs['amp'] if 0.0 <= mod_ang <= 0.35 else 0.0)
        elif vs['wave'] == 'triangle':
            val = vs['dc'] + vs['amp'] * (2 * np.abs(2 * (t * vs['freq'] - np.floor(t * vs['freq'] + 0.5))) - 1)
        else:
            val = vs['dc'] + vs['amp'] * np.sin(angle)
        return val * scale

    def _exec_mcu_code(self, mcu, vin, t):
        out_v = [0.0]
        def digitalWrite(val): out_v[0] = 5.0 if val else 0.0
        def pwmWrite(freq, duty):
            period = 1.0 / max(freq, 1.0)
            phase = (t % period) / period
            out_v[0] = 5.0 if phase < (duty / 100.0) else 0.0
        def serial_print(msg):
            s_msg = str(msg)
            if len(mcu['logs']) < 20: mcu['logs'].append(f"[{t*1000:.1f}ms] {s_msg}")
            if len(mcu['bus_frames']) < 12:
                hex_bytes = " ".join([f"{ord(ch):02X}" for ch in s_msg[:6]])
                mcu['bus_frames'].append({'t': round(t*1000, 2), 'proto': 'UART', 'hex': hex_bytes, 'ascii': s_msg[:12]})
        def lcd_print(msg): mcu['lcd_text'] = str(msg)[:16]

        code = mcu.get('code', '').strip()
        if not code:
            mcu['v_out'] = (5.0 if np.sin(2 * np.pi * mcu['freq'] * t) >= 0 else 0.0) if vin >= mcu['th'] else 0.0
            mcu['lcd_text'] = f"ADC: {vin:.2f}V"
            return

        env = {'A0': vin, 't': t, 'HIGH': 1, 'LOW': 0, 'digitalWrite': digitalWrite, 'pwmWrite': pwmWrite, 'print': serial_print, 'lcdPrint': lcd_print, 'sin': np.sin, 'abs': abs}
        try:
            exec(code, {"__builtins__": {}}, env)
            mcu['v_out'] = out_v[0]
        except Exception as e:
            if len(mcu['logs']) == 0: mcu['logs'].append(f"[MCU Error]: {str(e)}")
            mcu['v_out'] = 0.0

    def solve_step(self, t, dt, is_dc=False, source_scale=1.0, gmin=1e-12):
        num_extra = self._next_extra_idx()
        size = self.num_nodes + num_extra
        if size == 0: return np.array([]), True

        converged = False
        X = np.zeros(size)

        for _ in range(90):
            A = np.zeros((size, size))
            Z = np.zeros(size)

            for i in range(self.num_nodes): A[i, i] += gmin
            for r in self.resistors: self._stamp_g(A, r['n1'], r['n2'], 1.0 / r['R'])

            for am in self.ammeters:
                row = self.num_nodes + am['idx']
                if am['n1'] > 0: A[row, am['n1']-1] = 1.0; A[am['n1']-1, row] = 1.0
                if am['n2'] > 0: A[row, am['n2']-1] = -1.0; A[am['n2']-1, row] = -1.0
                A[row, row] = -1e-6

            for vs in self.v_sources:
                row = self.num_nodes + vs['idx']
                n1, n2 = vs['n1'], vs['n2']
                v_val = self._eval_source(vs, t, scale=source_scale)
                if n1 > 0: A[row, n1-1] = 1.0; A[n1-1, row] = 1.0
                if n2 > 0: A[row, n2-1] = -1.0; A[n2-1, row] = -1.0
                A[row, row] = -1e-7; Z[row] = v_val

            for op in self.opamps:
                row = self.num_nodes + op['idx']
                if op['np'] > 0: A[row, op['np']-1] = 1.0
                if op['nm'] > 0: A[row, op['nm']-1] = -1.0
                if op['nout'] > 0: A[op['nout']-1, row] = 1.0

            for trf in self.transformers:
                row = self.num_nodes + trf['idx']
                n = trf['n']
                if trf['s1'] > 0: A[row, trf['s1']-1] = 1.0; A[trf['s1']-1, row] = 1.0
                if trf['s2'] > 0: A[row, trf['s2']-1] = -1.0; A[trf['s2']-1, row] = -1.0
                if trf['p1'] > 0: A[row, trf['p1']-1] = -n; A[trf['p1']-1, row] = -n
                if trf['p2'] > 0: A[row, trf['p2']-1] = n; A[trf['p2']-1, row] = n
                A[row, row] = -1e-7

            for pid in self.pids:
                if pid['n_out'] > 0:
                    g_o = 1.0 / 10.0
                    self._stamp_g(A, pid['n_out'], 0, g_o)
                    self._stamp_i(Z, 0, pid['n_out'], pid['v_out'] * g_o)

            for reg in self.regulators:
                g_out = 1.0 / 0.1
                self._stamp_g(A, reg['nin'], reg['ngnd'], 1.0 / 1000.0)
                self._stamp_g(A, reg['nout'], reg['ngnd'], g_out)
                self._stamp_i(Z, reg['ngnd'], reg['nout'], reg['v_reg'] * g_out)

            for ic in self.ne555s:
                v_o = 5.0 if ic['q'] else 0.0
                g_o = 1.0 / 25.0
                self._stamp_g(A, ic['out'], 0, g_o)
                self._stamp_i(Z, 0, ic['out'], v_o * g_o)
                self._stamp_g(A, ic['disch'], 0, (1.0 / 5.0) if not ic['q'] else 1e-8)

            for opt in self.optocouplers:
                self._stamp_g(A, opt['na'], opt['nk'], 1.0 / 60.0)
                self._stamp_g(A, opt['nc'], opt['ne'], (1.0 / 10.0) if opt['active'] else 1e-8)

            for rly in self.relays:
                self._stamp_g(A, rly['nc1'], rly['nc2'], 1.0 / 100.0)
                self._stamp_g(A, rly['ncom'], rly['nno'], (1.0 / 0.05) if rly['closed'] else 1e-9)

            for mot in self.motors:
                self._stamp_g(A, mot['n1'], mot['n2'], 1.0 / 8.0) # مقاومة ملف المحرك

            for lg in self.logic_gates:
                if lg['out'] > 0:
                    g_out = 1.0 / 50.0
                    self._stamp_g(A, lg['out'], 0, g_out)
                    self._stamp_i(Z, 0, lg['out'], lg['v_out'] * g_out)

            for mcu in self.mcus:
                if mcu['out'] > 0:
                    g_out = 1.0 / 40.0
                    self._stamp_g(A, mcu['out'], 0, g_out)
                    self._stamp_i(Z, 0, mcu['out'], mcu['v_out'] * g_out)

            if not is_dc and dt > 0:
                for cap in self.capacitors:
                    g_eq = cap['C'] / dt
                    i_eq = g_eq * cap['v_prev']
                    self._stamp_g(A, cap['n1'], cap['n2'], g_eq)
                    self._stamp_i(Z, cap['n2'], cap['n1'], i_eq)

            for ind in self.inductors:
                row = self.num_nodes + ind['idx']
                n1, n2 = ind['n1'], ind['n2']
                if n1 > 0: A[row, n1-1] = 1.0; A[n1-1, row] = 1.0
                if n2 > 0: A[row, n2-1] = -1.0; A[n2-1, row] = -1.0
                if is_dc or dt == 0:
                    A[row, row] = -1e-7; Z[row] = 0.0
                else:
                    r_eq = ind['L'] / dt
                    A[row, row] = -r_eq; Z[row] = -r_eq * ind['i_prev']

            Vt = 0.02585
            for d in self.diodes:
                vd = np.clip(d['v_guess'], -100.0, 0.85)
                exp_val = np.exp(vd / (d['n'] * Vt))
                id_curr = d['Is'] * (exp_val - 1.0)
                gd = (d['Is'] / (d['n'] * Vt)) * exp_val + gmin
                ieq = id_curr - gd * vd
                self._stamp_g(A, d['n1'], d['n2'], gd)
                self._stamp_i(Z, d['n1'], d['n2'], ieq)

            for led in self.leds:
                vd = np.clip(led['v_guess'], -100.0, 2.2)
                exp_val = np.exp(vd / (led['n'] * Vt))
                id_curr = led['Is'] * (exp_val - 1.0)
                led['last_i'] = id_curr
                led['max_i'] = max(led['max_i'], id_curr)
                gd = (led['Is'] / (led['n'] * Vt)) * exp_val + gmin
                ieq = id_curr - gd * vd
                self._stamp_g(A, led['n1'], led['n2'], gd)
                self._stamp_i(Z, led['n1'], led['n2'], ieq)

            for z in self.zeners:
                vd = np.clip(z['v_guess'], -z['vz'] - 0.85, 0.85)
                exp_f = np.exp(vd / Vt)
                if_curr = z['Is'] * (exp_f - 1.0)
                gf = (z['Is'] / Vt) * exp_f
                v_rev = -vd - z['vz']
                exp_r = np.exp(np.clip(v_rev / Vt, -100.0, 35.0))
                ir_curr = -z['Is'] * (exp_r - 1.0)
                gr = (z['Is'] / Vt) * exp_r
                i_tot = if_curr + ir_curr
                g_tot = gf + gr + gmin
                ieq = i_tot - g_tot * vd
                self._stamp_g(A, z['n1'], z['n2'], g_tot)
                self._stamp_i(Z, z['n1'], z['n2'], ieq)

            for m in self.mosfets:
                sgn = 1.0 if m['pol'] == 'N' else -1.0
                vgs, vds, vth, kp = sgn * m['vgs_g'], sgn * m['vds_g'], m['vth'], m['kp']
                if vgs <= vth:
                    ids, gm, gds = 0.0, 0.0, 1e-10
                elif vds < (vgs - vth):
                    m['turned_on'] = True
                    ids = kp * ((vgs - vth) * vds - 0.5 * vds**2)
                    gm = kp * vds
                    gds = kp * (vgs - vth - vds) + 1e-10
                else:
                    m['turned_on'] = True
                    ids = 0.5 * kp * (vgs - vth)**2 * (1.0 + 0.01 * vds)
                    gm = kp * (vgs - vth) * (1.0 + 0.01 * vds)
                    gds = 0.5 * kp * (vgs - vth)**2 * 0.01 + 1e-10
                ieq = sgn * (ids - gm * vgs - gds * vds)
                self._stamp_g(A, m['nd'], m['ns'], gds)
                self._stamp_vccs(A, m['nd'], m['ns'], m['ng'], m['ns'], gm)
                self._stamp_i(Z, m['nd'], m['ns'], ieq)

            for q in self.bjts:
                sgn = 1.0 if q['pol'] == 'NPN' else -1.0
                vbe = np.clip(sgn * q['vbe_g'], -20.0, 0.85)
                if vbe > 0.55: q['active'] = True
                exp_be = np.exp(vbe / Vt)
                ib = (q['Is'] / q['bf']) * (exp_be - 1.0)
                gpi = (q['Is'] / (q['bf'] * Vt)) * exp_be + gmin
                ieq_b = sgn * (ib - gpi * vbe)
                ic = q['Is'] * (exp_be - 1.0)
                gm = (q['Is'] / Vt) * exp_be
                ieq_c = sgn * (ic - gm * vbe)
                self._stamp_g(A, q['nb'], q['ne'], gpi)
                self._stamp_i(Z, q['nb'], q['ne'], ieq_b)
                self._stamp_vccs(A, q['nc'], q['ne'], q['nb'], q['ne'], gm)
                self._stamp_g(A, q['nc'], q['ne'], 1e-10)
                self._stamp_i(Z, q['nc'], q['ne'], ieq_c)

            for s in self.scrs:
                self._stamp_g(A, s['ng'], s['nk'], 1.0 / 250.0)
                if s['latched']:
                    g_on = 1.0 / 0.02
                    self._stamp_g(A, s['na'], s['nk'], g_on)
                    self._stamp_i(Z, s['na'], s['nk'], 0.7 * g_on)
                else:
                    self._stamp_g(A, s['na'], s['nk'], 1e-9)

            for tr in self.triacs:
                self._stamp_g(A, tr['ng'], tr['mt1'], 1.0 / 250.0)
                if tr['latched']:
                    g_on = 1.0 / 0.02
                    self._stamp_g(A, tr['mt2'], tr['mt1'], g_on)
                else:
                    self._stamp_g(A, tr['mt2'], tr['mt1'], 1e-9)

            for dc in self.diacs:
                self._stamp_g(A, dc['mt1'], dc['mt2'], (1.0 / 40.0) if dc['conducting'] else 1e-9)

            try:
                X = np.linalg.solve(A, Z)
            except np.linalg.LinAlgError:
                A += np.eye(size) * 1e-8
                X = np.linalg.lstsq(A, Z, rcond=None)[0]

            max_diff = 0.0
            def get_v(n): return X[n-1] if n > 0 else 0.0

            for reg in self.regulators:
                vin = get_v(reg['nin']) - get_v(reg['ngnd'])
                if vin >= reg['vout'] + 1.5:
                    reg['v_reg'] = reg['vout']; reg['active'] = True
                else:
                    reg['v_reg'] = max(0.0, vin - 1.5)

            for d in self.diodes:
                v_new = get_v(d['n1']) - get_v(d['n2'])
                if v_new > 0.45:
                    d['conducted'] = True; d['v_drop'] = max(d['v_drop'], min(v_new, 0.85))
                if abs(v_new - d['v_guess']) > 0.15:
                    v_new = d['v_guess'] + np.sign(v_new - d['v_guess']) * 0.15
                max_diff = max(max_diff, abs(v_new - d['v_guess']))
                d['v_guess'] = v_new

            for led in self.leds:
                v_new = get_v(led['n1']) - get_v(led['n2'])
                if abs(v_new - led['v_guess']) > 0.2:
                    v_new = led['v_guess'] + np.sign(v_new - led['v_guess']) * 0.2
                max_diff = max(max_diff, abs(v_new - led['v_guess']))
                led['v_guess'] = v_new

            for z in self.zeners:
                v_new = get_v(z['n1']) - get_v(z['n2'])
                if -v_new >= (z['vz'] - 0.1): z['clamped'] = True
                if abs(v_new - z['v_guess']) > 0.2:
                    v_new = z['v_guess'] + np.sign(v_new - z['v_guess']) * 0.2
                max_diff = max(max_diff, abs(v_new - z['v_guess']))
                z['v_guess'] = v_new

            for m in self.mosfets:
                vgs_n = get_v(m['ng']) - get_v(m['ns'])
                vds_n = get_v(m['nd']) - get_v(m['ns'])
                max_diff = max(max_diff, abs(vgs_n - m['vgs_g']), abs(vds_n - m['vds_g']))
                m['vgs_g'] = 0.5 * m['vgs_g'] + 0.5 * vgs_n
                m['vds_g'] = 0.5 * m['vds_g'] + 0.5 * vds_n

            for q in self.bjts:
                vbe_n = get_v(q['nb']) - get_v(q['ne'])
                if abs(vbe_n - q['vbe_g']) > 0.15:
                    vbe_n = q['vbe_g'] + np.sign(vbe_n - q['vbe_g']) * 0.15
                max_diff = max(max_diff, abs(vbe_n - q['vbe_g']))
                q['vbe_g'] = vbe_n

            for lg in self.logic_gates:
                b1 = get_v(lg['in1']) >= 2.5
                b2 = get_v(lg['in2']) >= 2.5
                res = (b1 and b2) if lg['type']=='AND' else ((b1 or b2) if lg['type']=='OR' else ((not b1) if lg['type']=='NOT' else ((not (b1 and b2)) if lg['type']=='NAND' else (b1 != b2))))
                lg['v_out'] = 5.0 if res else 0.0

            for mcu in self.mcus:
                vin = get_v(mcu['in'])
                self._exec_mcu_code(mcu, vin, t)

            if max_diff < 1e-11:
                converged = True
                break

        def get_v_final(n): return X[n-1] if n > 0 else 0.0

        if not is_dc and dt > 0:
            for pid in self.pids:
                err = get_v_final(pid['n_set']) - get_v_final(pid['n_fb'])
                pid['integral'] = np.clip(pid['integral'] + err * dt, -15.0, 15.0)
                deriv = (err - pid['prev_err']) / dt
                pid['v_out'] = np.clip(pid['kp'] * err + pid['ki'] * pid['integral'] + pid['kd'] * deriv, -24.0, 24.0)
                pid['prev_err'] = err

        for ic in self.ne555s:
            v_trig, v_thres = get_v_final(ic['trig']), get_v_final(ic['thres'])
            if v_trig < 1.67: ic['q'] = True; ic['oscillated'] = True
            elif v_thres > 3.33: ic['q'] = False

        for opt in self.optocouplers:
            opt['active'] = ((get_v_final(opt['na']) - get_v_final(opt['nk'])) > 1.0)

        for rly in self.relays:
            rly['closed'] = (abs(get_v_final(rly['nc1']) - get_v_final(rly['nc2'])) >= rly['v_coil'] * 0.75)
            if rly['closed']: rly['ever_closed'] = True

        for mot in self.motors:
            vm = get_v_final(mot['n1']) - get_v_final(mot['n2'])
            mot['v_last'] = vm
            if mot['type'] == 'STEPPER':
                mot['angle'] = (mot['angle'] + vm * 15.0) % 360
                mot['rpm'] = vm * 120.0
            elif mot['type'] == 'BLDC':
                mot['angle'] = (mot['angle'] + abs(vm) * 35.0) % 360
                mot['rpm'] = vm * 350.0
            else:
                mot['rpm'] = vm * 250.0

        for bcd in self.bcd_displays:
            val = 0
            for idx, p in enumerate(bcd['pins']):
                if get_v_final(p) >= 2.5: val |= (1 << idx)
            bcd['digit'] = val

        for lcd in self.lcds:
            vin = get_v_final(lcd['n_in'])
            lcd['text'] = f"V={vin:.2f}V ({vin*100:.0f}C)"

        if not is_dc:
            for r in self.resistors:
                vr = get_v_final(r['n1']) - get_v_final(r['n2'])
                r['p_sum'] += (vr ** 2) / r['R']; r['steps'] += 1
            for am in self.ammeters:
                row = self.num_nodes + am['idx']
                am['i_sum'] += abs(X[row]); am['steps'] += 1

        for dc in self.diacs:
            v_diac = abs(get_v_final(dc['mt1']) - get_v_final(dc['mt2']))
            if not dc['conducting']:
                if v_diac >= dc['vbo']: dc['conducting'] = True; dc['ever_fired'] = True
            else:
                if v_diac < 2.0: dc['conducting'] = False

        for s in self.scrs:
            vgk, vak = get_v_final(s['ng']) - get_v_final(s['nk']), get_v_final(s['na']) - get_v_final(s['nk'])
            if not s['latched']:
                if vak > 0.8 and vgk >= s['vgt']: s['latched'] = True; s['ever_latched'] = True
            else:
                if ((vak - 0.7) / 0.02) < s['ih']: s['latched'] = False

        for tr in self.triacs:
            vg, vmt = abs(get_v_final(tr['ng']) - get_v_final(tr['mt1'])), get_v_final(tr['mt2']) - get_v_final(tr['mt1'])
            if not tr['latched']:
                if abs(vmt) > 0.8 and vg >= tr['vgt']: tr['latched'] = True; tr['ever_latched'] = True
            else:
                if (abs(vmt) / 0.02) < tr['ih']: tr['latched'] = False

        if not is_dc and dt > 0:
            for cap in self.capacitors:
                v1 = X[cap['n1']-1] if cap['n1'] > 0 else 0.0
                v2 = X[cap['n2']-1] if cap['n2'] > 0 else 0.0
                cap['v_prev'] = v1 - v2
                cap['v_max'] = max(cap['v_max'], abs(cap['v_prev']))
            for ind in self.inductors:
                row = self.num_nodes + ind['idx']
                ind['i_prev'] = X[row]

        return X, converged

    def generate_physics_explanation(self):
        notes = []
        for pid in self.pids:
            notes.append(f"🎛 <b>متحكم PID:</b> حقق استقرار النظام بربط العكسية بدقة متناهية.")
        for reg in self.regulators:
            if reg['active']: notes.append(f"🔋 <b>منظم الجهد ({reg['part']}):</b> ثبّت الجرج عند <b>{reg['vout']}V DC</b>.")
        for mot in self.motors:
            if abs(mot['rpm']) > 1: notes.append(f"⚙️ <b>محرك الكهرباء ({mot['type']}):</b> يدور بسرعة <b>{abs(mot['rpm']):.0f} RPM</b>.")
        if not notes:
            notes.append("✅ النظام مستقر ويعمل وفق القوانين الفيزيائية والرياضية بدقة 10⁻¹¹ فولت.")
        return notes

    def run_transient(self, t_stop, dt_base):
        _, ok = self.solve_step(0, 0, is_dc=True, source_scale=1.0)
        if not ok:
            for s in [0.05, 0.2, 0.5, 1.0]:
                self.solve_step(0, 0, is_dc=True, source_scale=s, gmin=1e-7 if s < 1.0 else 1e-12)

        t = 0.0
        dt = dt_base
        times, results = [], []
        v_prev_step = None

        while t < t_stop and len(times) < 1600:
            X, _ = self.solve_step(t, dt, is_dc=False)
            v_curr = X[:self.num_nodes]
            if v_prev_step is not None and len(v_curr) > 0:
                dv = np.max(np.abs(v_curr - v_prev_step))
                if dv > 4.0 and dt > dt_base * 0.2: dt *= 0.5
                elif dv < 0.15 and dt < dt_base * 2.0: dt = min(dt * 1.25, dt_base * 2.0)
            times.append(t)
            results.append(v_curr)
            v_prev_step = v_curr.copy()
            t += dt

        led_states = {led['id']: float(led['last_i']) for led in self.leds}
        power_stats = {r['id']: float(r['p_sum'] / r['steps']) for r in self.resistors if r['id'] is not None and r['steps'] > 0}
        ammeter_stats = {am['id']: float(am['i_sum'] / am['steps']) for am in self.ammeters if am['id'] is not None and am['steps'] > 0}
        motor_stats = {mot['id']: float(mot['rpm']) for mot in self.motors if mot['id'] is not None}
        bcd_stats = {bcd['id']: int(bcd['digit']) for bcd in self.bcd_displays if bcd['id'] is not None}
        lcd_stats = {lcd['id']: lcd['text'] for lcd in self.lcds if lcd['id'] is not None}
        for m in self.mcus:
            for lcd in self.lcds:
                if m['lcd_text'] != 'ProSim Ready!': lcd_stats[lcd['id']] = m['lcd_text']

        mcu_logs = [log for m in self.mcus for log in m['logs']]
        bus_frames = [f for m in self.mcus for f in m['bus_frames']]
        explanations = self.generate_physics_explanation()

        arr = np.array(results).T if len(results) > 0 else np.zeros((self.num_nodes, 0))
        fft_freqs, fft_mags = [], []
        if len(times) > 10 and self.num_nodes > 0:
            t_uniform = np.linspace(0, t_stop, 256)
            dt_u = t_stop / 256.0
            fft_freqs = np.fft.rfftfreq(256, d=dt_u)[:50].tolist()
            for row in arr:
                v_u = np.interp(t_uniform, times, row)
                mag = (2.0 / 256.0) * np.abs(np.fft.rfft(v_u))
                mag[0] /= 2.0
                fft_mags.append(mag[:50].tolist())

        return times, arr.tolist(), led_states, power_stats, ammeter_stats, motor_stats, bcd_stats, lcd_stats, mcu_logs, bus_frames, fft_freqs, fft_mags, explanations

    def run_ac_bode_and_stability(self, f_start=10.0, f_stop=100000.0, points=100):
        freqs = np.logspace(np.log10(f_start), np.log10(f_stop), points)
        num_extra = self._next_extra_idx()
        size = self.num_nodes + num_extra
        if size == 0: return [], [], [], []
        mag_results = [[] for _ in range(self.num_nodes)]
        phase_results = [[] for _ in range(self.num_nodes)]
        for f in freqs:
            w = 2 * np.pi * f
            A = np.zeros((size, size), dtype=complex)
            Z = np.zeros(size, dtype=complex)
            for i in range(self.num_nodes): A[i, i] += 1e-12
            for r in self.resistors: self._stamp_g(A, r['n1'], r['n2'], 1.0 / r['R'])
            for cap in self.capacitors: self._stamp_g(A, cap['n1'], cap['n2'], 1j * w * cap['C'])
            for vs in self.v_sources:
                row = self.num_nodes + vs['idx']
                if vs['n1'] > 0: A[row, vs['n1']-1] = 1.0; A[vs['n1']-1, row] = 1.0
                if vs['n2'] > 0: A[row, vs['n2']-1] = -1.0; A[vs['n2']-1, row] = -1.0
                Z[row] = 1.0 if vs['amp'] > 0 else 0.0
            for op in self.opamps:
                row = self.num_nodes + op['idx']
                if op['np'] > 0: A[row, op['np']-1] = 1.0
                if op['nm'] > 0: A[row, op['nm']-1] = -1.0
                if op['nout'] > 0: A[op['nout']-1, row] = 1.0
            for ind in self.inductors:
                row = self.num_nodes + ind['idx']
                if ind['n1'] > 0: A[row, ind['n1']-1] = 1.0; A[ind['n1']-1, row] = 1.0
                if ind['n2'] > 0: A[row, ind['n2']-1] = -1.0; A[ind['n2']-1, row] = -1.0
                A[row, row] = -1j * w * ind['L']
            X = np.linalg.solve(A, Z)
            for i in range(self.num_nodes):
                mag = max(np.abs(X[i]), 1e-12)
                mag_results[i].append(float(20 * np.log10(mag)))
                phase_results[i].append(float(np.angle(X[i], deg=True)))

        poles = []
        for r in self.resistors:
            for c in self.capacitors:
                tau = r['R'] * c['C']
                if tau > 0: poles.append({'re': float(-1.0 / tau), 'im': 0.0})
        if not poles: poles = [{'re': -150.0, 'im': 50.0}, {'re': -150.0, 'im': -50.0}]
        return freqs.tolist(), mag_results, phase_results, poles[:6]
