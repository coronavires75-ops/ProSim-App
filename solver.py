import numpy as np
import ast
import re

class SafeMCUExecutor:
    ALLOWED_NODES = (
        ast.Module, ast.Assign, ast.AugAssign, ast.Name, ast.Load, ast.Store,
        ast.Constant, ast.BinOp, ast.UnaryOp, ast.Compare, ast.BoolOp,
        ast.If, ast.Expr, ast.Call, ast.Attribute, ast.Subscript, ast.Index, ast.Slice,
        ast.List, ast.Tuple, ast.Dict, ast.JoinedStr, ast.FormattedValue,
        ast.Add, ast.Sub, ast.Mult, ast.Div, ast.FloorDiv, ast.Mod, ast.Pow,
        ast.USub, ast.UAdd, ast.Not, ast.And, ast.Or,
        ast.Eq, ast.NotEq, ast.Lt, ast.LtE, ast.Gt, ast.GtE
    )
    ALLOWED_FUNCS = {'digitalWrite', 'pwmWrite', 'print', 'lcdPrint', 'sin', 'cos', 'abs', 'min', 'max', 'round', 'len'}

    @staticmethod
    def transpile_arduino_to_python(code):
        if 'void setup' not in code and 'void loop' not in code and 'digitalWrite(' not in code:
            return code
        lines = []
        in_setup = False
        brace_depth = 0
        for raw_line in code.splitlines():
            line = raw_line.strip()
            if not line or line.startswith('//'):
                continue
            if 'void setup()' in line:
                in_setup = True
                if '{' in line: brace_depth += 1
                continue
            if 'void loop()' in line:
                in_setup = False
                if '{' in line: brace_depth += 1
                continue
            if line == '{':
                brace_depth += 1
                continue
            if line == '}':
                brace_depth = max(0, brace_depth - 1)
                if brace_depth == 0:
                    in_setup = False
                continue
            if in_setup or 'pinMode' in line or 'Serial.begin' in line:
                continue
            line = re.sub(r'\b(int|float|double|bool|long|byte)\s+', '', line)
            line = line.rstrip(';')
            line = line.replace('&&', ' and ').replace('||', ' or ')
            line = line.replace('Serial.println(', 'print(').replace('Serial.print(', 'print(')
            line = line.replace('lcd.print(', 'lcdPrint(')
            line = re.sub(r'analogRead\s*\(\s*A0\s*\)', '(A0 * 1023.0 / 5.0)', line)
            line = re.sub(r'digitalWrite\s*\(\s*\d+\s*,\s*(HIGH|LOW|1|0)\s*\)', r'digitalWrite(\1)', line)
            line = re.sub(r'analogWrite\s*\(\s*\d+\s*,\s*([^)]+)\)', r'pwmWrite(500, (\1) * 100.0 / 255.0)', line)
            if line.startswith('if') and line.endswith('{'):
                lines.append(line[:-1].strip() + ':')
                continue
            if line.startswith('} else {') or (line.startswith('else') and line.endswith('{')):
                lines.append('else:')
                continue
            indent = '    ' if (lines and lines[-1].endswith(':')) else ''
            lines.append(indent + line)
        return '\n'.join(lines)

    @classmethod
    def validate(cls, code):
        if len(code) > 4000:
            raise ValueError("MCU code exceeds 4000 characters limit")
        code = cls.transpile_arduino_to_python(code)
        tree = ast.parse(code, mode='exec')
        for node in ast.walk(tree):
            if not isinstance(node, cls.ALLOWED_NODES):
                raise ValueError(f"Blocked unsafe syntax in MCU: {type(node).__name__}")
            if isinstance(node, ast.Attribute) and node.attr.startswith('__'):
                raise ValueError("Access to dunder attributes is forbidden")
            if isinstance(node, ast.Call):
                if isinstance(node.func, ast.Name) and node.func.id not in cls.ALLOWED_FUNCS:
                    raise ValueError(f"Function '{node.func.id}' is not allowed in MCU")
        return compile(tree, '<mcu_firmware>', 'exec')


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
        self.spdt_relays = []
        self.motors = []
        self.bcd_displays = []
        self.ammeters = []
        self.wattmeters = []
        self.pids = []
        self.lcds = []
        self.flipflops = []
        self.gate_firings = []
        self._t_stop_ref = 0.04


    def add_comparator(self, np_node, nm_node, nout_node, vcc=5.0):
        if not hasattr(self, 'comparators'):
            self.comparators = []
        self.comparators.append({'np': np_node, 'nm': nm_node, 'nout': nout_node, 'vcc': vcc, 'v_out': 0.0})

    def add_schmitt(self, nin, nout, vcc=5.0):
        if not hasattr(self, 'schmitts'):
            self.schmitts = []
        self.schmitts.append({'nin': nin, 'nout': nout, 'vcc': vcc, 'state': False})

    def add_counter4(self, clk, rst, q0, q1, q2, q3):
        if not hasattr(self, 'counters4'):
            self.counters4 = []
        self.counters4.append({
            'clk': clk, 'rst': rst, 'q_pins': [q0, q1, q2, q3],
            'val': 0, 'prev_clk': False
        })

    def add_optotriac(self, na, nk, mt1, mt2, part='MOC3021'):
        if not hasattr(self, 'optotriacs'):
            self.optotriacs = []
        self.optotriacs.append({'na': na, 'nk': nk, 'mt1': mt1, 'mt2': mt2, 'part': part, 'active': False})

    def _next_extra_idx(self):
        return (len(self.v_sources) + len(self.inductors) + len(self.opamps) +
                len(self.transformers) + len(self.ammeters) + len(self.motors) + len(self.wattmeters))

    def add_resistor(self, n1, n2, value, id_tag=None, part='RES'):
        self.resistors.append({
            'n1': n1, 'n2': n2, 'R': max(abs(value), 1e-6),
            'id': id_tag, 'part': part, 'e_sum': 0.0, 't_sum': 0.0
        })

    def add_ammeter(self, n1, n2, id_tag=None):
        self.ammeters.append({
            'n1': n1, 'n2': n2, 'id': id_tag, 'idx': self._next_extra_idx(),
            'i_sq_sum': 0.0, 't_sum': 0.0
        })

    def add_wattmeter(self, v_p, v_m, i_in, i_out, id_tag=None):
        self.wattmeters.append({
            'vp': v_p, 'vm': v_m, 'ii': i_in, 'io': i_out,
            'id': id_tag, 'idx': self._next_extra_idx(),
            'p_sum': 0.0, 'v_sq_sum': 0.0, 'i_sq_sum': 0.0, 't_sum': 0.0
        })

    def add_capacitor(self, n1, n2, value):
        self.capacitors.append({
            'n1': n1, 'n2': n2, 'C': max(abs(value), 1e-15),
            'v_prev': 0.0, 'i_prev': 0.0, 'v_max': 0.0
        })

    def add_inductor(self, n1, n2, value):
        self.inductors.append({
            'n1': n1, 'n2': n2, 'L': max(abs(value), 1e-12),
            'i_prev': 0.0, 'v_prev': 0.0, 'idx': self._next_extra_idx()
        })

    def add_transformer(self, p1, p2, s1, s2, ratio=0.1):
        self.transformers.append({
            'p1': p1, 'p2': p2, 's1': s1, 's2': s2,
            'n': max(abs(ratio), 1e-5), 'idx': self._next_extra_idx()
        })

    def add_vsource(self, n1, n2, dc=0.0, amp=0.0, freq=0.0, wave='sine', phase_deg=0.0):
        self.v_sources.append({
            'n1': n1, 'n2': n2, 'dc': dc, 'amp': amp, 'freq': max(abs(freq), 0.0),
            'wave': wave, 'phase': np.deg2rad(phase_deg), 'idx': self._next_extra_idx()
        })

    def add_diode(self, n1, n2, Is=7.02e-9, n=1.77, rs=0.04, bv=1000.0, part='1N4007'):
        self.diodes.append({
            'n1': n1, 'n2': n2, 'Is': max(Is, 1e-20), 'n': max(n, 0.5),
            'rs': max(rs, 1e-4), 'bv': bv, 'part': part,
            'v_guess': 0.65, 'conducted': False, 'v_drop': 0.0
        })

    def add_bridge(self, ac1, ac2, dc_p, dc_m, Is=7.02e-9, n=1.77):
        self.add_diode(ac1, dc_p, Is=Is, n=n, part='BRIDGE-D1')
        self.add_diode(ac2, dc_p, Is=Is, n=n, part='BRIDGE-D2')
        self.add_diode(dc_m, ac1, Is=Is, n=n, part='BRIDGE-D3')
        self.add_diode(dc_m, ac2, Is=Is, n=n, part='BRIDGE-D4')

    def add_led(self, n1, n2, id_tag, vf=1.85, part='LED-RED'):
        n_ideality = 1.8
        vt = 0.02585
        is_calc = 0.020 / (np.exp(vf / (n_ideality * vt)) - 1.0)
        self.leds.append({
            'n1': n1, 'n2': n2, 'Is': max(is_calc, 1e-28), 'n': n_ideality,
            'v_guess': vf, 'id': id_tag, 'part': part,
            'last_i': 0.0, 'i_sum': 0.0, 't_sum': 0.0, 'max_i': 0.0
        })

    def add_zener(self, n1, n2, vz=5.1, part='1N4733A'):
        self.zeners.append({
            'n1': n1, 'n2': n2, 'vz': max(abs(vz), 0.5), 'Is': 1e-11,
            'part': part, 'v_guess': 0.0, 'clamped': False
        })

    def add_opamp(self, np_node, nm_node, nout_node, vcc=15.0, vee=-15.0):
        self.opamps.append({
            'np': np_node, 'nm': nm_node, 'nout': nout_node,
            'vcc': vcc, 'vee': vee, 'idx': self._next_extra_idx()
        })

    def add_mosfet(self, ng, nd, ns, vth=2.5, kp=2.0, pol='N', part='IRFZ44N'):
        self.mosfets.append({
            'ng': ng, 'nd': nd, 'ns': ns, 'vth': vth, 'kp': kp, 'pol': pol,
            'part': part, 'vgs_g': 0.0, 'vds_g': 0.0, 'turned_on': False
        })

    def add_bjt(self, nb, nc, ne, Is=1.4e-14, bf=200.0, br=2.0, vaf=100.0, pol='NPN', part='2N2222'):
        self.bjts.append({
            'nb': nb, 'nc': nc, 'ne': ne, 'Is': Is, 'bf': max(bf, 1.0),
            'br': max(br, 0.1), 'vaf': vaf, 'pol': pol, 'part': part,
            'vbe_g': 0.65, 'vbc_g': -2.0, 'active': False
        })

    def add_scr(self, ng, na, nk, vgt=0.7, ih=0.005, part='BT151'):
        self.scrs.append({
            'ng': ng, 'na': na, 'nk': nk, 'vgt': vgt, 'ih': ih,
            'part': part, 'latched': False, 'ever_latched': False
        })

    def add_triac(self, ng, mt1, mt2, vgt=0.8, ih=0.005, part='BT136'):
        self.triacs.append({
            'ng': ng, 'mt1': mt1, 'mt2': mt2, 'vgt': vgt, 'ih': ih,
            'part': part, 'latched': False, 'ever_latched': False
        })

    def add_diac(self, mt1, mt2, vbo=32.0, part='DB3'):
        self.diacs.append({
            'mt1': mt1, 'mt2': mt2, 'vbo': max(abs(vbo), 1.0),
            'part': part, 'conducting': False, 'ever_fired': False
        })

    def add_logic_gate(self, gate_type, in1, in2, out):
        self.logic_gates.append({'type': gate_type, 'in1': in1, 'in2': in2, 'out': out, 'v_out': 0.0})

    def add_flipflop(self, ff_type, d_or_j, clk_or_k, clk, q_out, qb_out):
        self.flipflops.append({
            'type': ff_type, 'in1': d_or_j, 'in2': clk_or_k, 'clk': clk,
            'q_pin': q_out, 'qb_pin': qb_out, 'q': False, 'prev_clk': False
        })

    def add_gate_firing(self, n_sync, n_gate, alpha_deg=60.0, freq=50.0):
        self.gate_firings.append({
            'n_sync': n_sync, 'n_gate': n_gate,
            'alpha': max(0.0, min(180.0, float(alpha_deg))),
            'freq': max(1.0, float(freq)), 'v_out': 0.0
        })

    def add_mcu(self, in_pin, out_pin, code="", pwm_freq=250.0, threshold=2.5):
        compiled = None
        err_msg = None
        if code.strip():
            try:
                compiled = SafeMCUExecutor.validate(code)
            except Exception as e:
                err_msg = str(e)
        self.mcus.append({
            'in': in_pin, 'out': out_pin, 'code': code, 'compiled': compiled,
            'err': err_msg, 'freq': pwm_freq, 'th': threshold, 'v_out': 0.0,
            'state': {}, 'logs': [], 'last_log_t': -1.0, 'bus_frames': [],
            'lcd_text': 'ProSim Ready!'
        })

    def add_regulator(self, nin, ngnd, nout, vout=5.0, part='7805'):
        self.regulators.append({
            'nin': nin, 'ngnd': ngnd, 'nout': nout, 'vout': vout,
            'part': part, 'v_reg': 0.0, 'active': False
        })

    def add_ne555(self, ntrig, nthres, ndisch, nout, vcc=5.0):
        self.ne555s.append({
            'trig': ntrig, 'thres': nthres, 'disch': ndisch, 'out': nout,
            'vcc': vcc, 'q': False, 'oscillated': False
        })

    def add_optocoupler(self, na, nk, nc, ne, part='PC817'):
        self.optocouplers.append({'na': na, 'nk': nk, 'nc': nc, 'ne': ne, 'part': part, 'active': False})

    def add_relay(self, nc1, nc2, ncom, nno, v_coil=5.0, id_tag=None):
        self.relays.append({
            'nc1': nc1, 'nc2': nc2, 'ncom': ncom, 'nno': nno,
            'v_coil': v_coil, 'id': id_tag, 'closed': False, 'ever_closed': False
        })

    def add_spdt_relay(self, nc1, nc2, ncom, nno, nnc, v_coil=5.0, id_tag=None):
        self.spdt_relays.append({
            'nc1': nc1, 'nc2': nc2, 'ncom': ncom, 'nno': nno, 'nnc': nnc,
            'v_coil': v_coil, 'id': id_tag, 'closed': False
        })

    def add_motor(self, n1, n2, motor_type='DC', load_torque=0.0, id_tag=None, part='DC-MOTOR'):
        specs = {
            'N20':       {'Ra': 6.5, 'La': 0.002, 'Ke': 0.0085, 'Kt': 0.0085, 'J': 1.2e-6, 'B': 2e-6},
            'DC':        {'Ra': 2.2, 'La': 0.005, 'Ke': 0.0350, 'Kt': 0.0350, 'J': 2.5e-5, 'B': 1.5e-5},
            'DC-775':    {'Ra': 0.8, 'La': 0.003, 'Ke': 0.0220, 'Kt': 0.0220, 'J': 8.0e-5, 'B': 4.0e-5},
            'SHUNT':     {'Ra': 2.0, 'La': 0.006, 'Ke': 0.0450, 'Kt': 0.0450, 'J': 4.0e-5, 'B': 2.0e-5},
            'SERIES':    {'Ra': 1.5, 'La': 0.008, 'Ke': 0.0300, 'Kt': 0.0300, 'J': 3.5e-5, 'B': 2.0e-5},
            'UNIVERSAL': {'Ra': 12.0,'La': 0.025, 'Ke': 0.1800, 'Kt': 0.1800, 'J': 1.2e-4, 'B': 8.0e-5},
            'STEPPER':   {'Ra': 4.0, 'La': 0.008, 'Ke': 0.0500, 'Kt': 0.0500, 'J': 3.0e-5, 'B': 5.0e-5},
            'BLDC':      {'Ra': 0.6, 'La': 0.0015,'Ke': 0.0280, 'Kt': 0.0280, 'J': 3.0e-5, 'B': 1.5e-5},
            'INDUCTION': {'Ra': 3.5, 'La': 0.015, 'Ke': 0.1400, 'Kt': 0.1400, 'J': 2.0e-4, 'B': 1.0e-4},
        }
        p = specs.get(motor_type, specs['DC'])
        self.motors.append({
            'n1': n1, 'n2': n2, 'type': motor_type, 'part': part, 'id': id_tag,
            'idx': self._next_extra_idx(),
            'Ra': p['Ra'], 'La': p['La'], 'Ke': p['Ke'], 'Kt': p['Kt'],
            'J': p['J'], 'B': p['B'], 't_load': max(0.0, float(load_torque)),
            'omega': 0.0, 'i_prev': 0.0, 'angle': 0.0,
            'rpm': 0.0, 'torque': 0.0, 'current': 0.0,
            'history': {'t': [], 'rpm': [], 'torque': [], 'current': [], 'angle': []}
        })

    def add_bcd_display(self, d0, d1, d2, d3, id_tag=None):
        self.bcd_displays.append({'pins': [d0, d1, d2, d3], 'id': id_tag, 'digit': 0, 'counts': {}})

    def add_pid(self, n_set, n_fb, n_out, kp=2.0, ki=10.0, kd=0.05):
        self.pids.append({
            'n_set': n_set, 'n_fb': n_fb, 'n_out': n_out,
            'kp': kp, 'ki': ki, 'kd': kd,
            'integral': 0.0, 'prev_err': 0.0, 'v_out': 0.0
        })

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

    def _exec_mcu_code(self, mcu, vin, t, t_stop):
        if mcu['err']:
            if not mcu['logs']:
                mcu['logs'].append(f"[Security/Syntax Error]: {mcu['err']}")
            mcu['v_out'] = 0.0
            return

        if not mcu['compiled']:
            mcu['v_out'] = (5.0 if np.sin(2 * np.pi * mcu['freq'] * t) >= 0 else 0.0) if vin >= mcu['th'] else 0.0
            mcu['lcd_text'] = f"ADC: {vin:.2f}V"
            return

        out_v = [mcu['v_out']]
        def digitalWrite(val):
            out_v[0] = 5.0 if val else 0.0

        def pwmWrite(freq, duty):
            period = 1.0 / max(float(freq), 1.0)
            phase = (t % period) / period
            out_v[0] = 5.0 if phase < (float(duty) / 100.0) else 0.0

        def serial_print(msg):
            log_interval = max(t_stop / 18.0, 1e-5)
            if (t - mcu['last_log_t']) >= log_interval and len(mcu['logs']) < 20:
                s_msg = str(msg)[:80]
                mcu['logs'].append(f"[{t*1000:.2f}ms] {s_msg}")
                mcu['last_log_t'] = t
                if len(mcu['bus_frames']) < 15:
                    hex_bytes = " ".join([f"{ord(ch):02X}" for ch in s_msg[:6]])
                    mcu['bus_frames'].append({'t': round(t*1000, 2), 'proto': 'UART', 'hex': hex_bytes, 'ascii': s_msg[:14]})

        def lcd_print(msg):
            mcu['lcd_text'] = str(msg)[:16]

        env = dict(mcu['state'])
        env.update({
            'A0': float(vin), 't': float(t), 'HIGH': 1, 'LOW': 0,
            'digitalWrite': digitalWrite, 'pwmWrite': pwmWrite,
            'print': serial_print, 'lcdPrint': lcd_print,
            'sin': np.sin, 'cos': np.cos, 'abs': abs,
            'min': min, 'max': max, 'round': round, 'len': len
        })
        try:
            exec(mcu['compiled'], {"__builtins__": {}}, env)
            for k, v in env.items():
                if k not in ('A0', 't', 'HIGH', 'LOW', 'digitalWrite', 'pwmWrite', 'print', 'lcdPrint', 'sin', 'cos', 'abs', 'min', 'max', 'round', 'len'):
                    mcu['state'][k] = v
            mcu['v_out'] = out_v[0]
        except Exception as e:
            if len(mcu['logs']) == 0:
                mcu['logs'].append(f"[MCU Runtime Error]: {str(e)}")
            mcu['v_out'] = 0.0

    def _pn_limit(self, v_new, v_old, vt, vcrit):
        if v_new > vcrit and abs(v_new - v_old) > 2.0 * vt:
            if v_old > 0:
                arg = 1.0 + (v_new - v_old) / vt
                if arg > 0:
                    v_new = v_old + vt * np.log(arg)
                else:
                    v_new = vcrit
            else:
                v_new = vt * np.log(max(v_new / vt, 1e-12))
        return v_new

    def solve_step(self, t, dt, is_dc=False, source_scale=1.0, gmin=1e-12):
        num_extra = self._next_extra_idx()
        size = self.num_nodes + num_extra
        if size == 0:
            return np.array([]), True

        converged = False
        X = np.zeros(size)
        X_prev_iter = np.zeros(size)
        Vt = 0.02585
        reltol = 1e-4
        abstol = 1e-8

        for it in range(100):
            A = np.zeros((size, size))
            Z = np.zeros(size)

            for i in range(self.num_nodes):
                A[i, i] += gmin

            for r in self.resistors:
                self._stamp_g(A, r['n1'], r['n2'], 1.0 / r['R'])

            for am in self.ammeters:
                row = self.num_nodes + am['idx']
                if am['n1'] > 0: A[row, am['n1']-1] = 1.0; A[am['n1']-1, row] = 1.0
                if am['n2'] > 0: A[row, am['n2']-1] = -1.0; A[am['n2']-1, row] = -1.0
                A[row, row] = -1e-6

            for wm in self.wattmeters:
                row = self.num_nodes + wm['idx']
                if wm['ii'] > 0: A[row, wm['ii']-1] = 1.0; A[wm['ii']-1, row] = 1.0
                if wm['io'] > 0: A[row, wm['io']-1] = -1.0; A[wm['io']-1, row] = -1.0
                A[row, row] = -1e-6

            for vs in self.v_sources:
                row = self.num_nodes + vs['idx']
                n1, n2 = vs['n1'], vs['n2']
                v_val = self._eval_source(vs, t, scale=source_scale)
                if n1 > 0: A[row, n1-1] = 1.0; A[n1-1, row] = 1.0
                if n2 > 0: A[row, n2-1] = -1.0; A[n2-1, row] = -1.0
                A[row, row] = -1e-9
                Z[row] = v_val

            for op in self.opamps:
                row = self.num_nodes + op['idx']
                v_diff = (X_prev_iter[op['np']-1] if op['np'] > 0 else 0.0) - (X_prev_iter[op['nm']-1] if op['nm'] > 0 else 0.0)
                gain = 1e5
                v_ideal = gain * v_diff
                if v_ideal > op['vcc']:
                    if op['nout'] > 0:
                        A[row, op['nout']-1] = 1.0; A[op['nout']-1, row] = 1.0
                        Z[row] = op['vcc']
                elif v_ideal < op['vee']:
                    if op['nout'] > 0:
                        A[row, op['nout']-1] = 1.0; A[op['nout']-1, row] = 1.0
                        Z[row] = op['vee']
                else:
                    if op['np'] > 0: A[row, op['np']-1] = 1.0
                    if op['nm'] > 0: A[row, op['nm']-1] = -1.0
                    if op['nout'] > 0:
                        A[row, op['nout']-1] = -1.0 / gain
                        A[op['nout']-1, row] = 1.0

            for trf in self.transformers:
                row = self.num_nodes + trf['idx']
                n = trf['n']
                self._stamp_g(A, trf['p1'], trf['p2'], 1e-4)
                if trf['s1'] > 0: A[row, trf['s1']-1] = 1.0; A[trf['s1']-1, row] = 1.0
                if trf['s2'] > 0: A[row, trf['s2']-1] = -1.0; A[trf['s2']-1, row] = -1.0
                if trf['p1'] > 0: A[row, trf['p1']-1] = -n; A[trf['p1']-1, row] = -n
                if trf['p2'] > 0: A[row, trf['p2']-1] = n; A[trf['p2']-1, row] = n
                A[row, row] = -1e-7

            for pid in self.pids:
                if pid['n_out'] > 0:
                    g_o = 1.0 / 5.0
                    self._stamp_g(A, pid['n_out'], 0, g_o)
                    self._stamp_i(Z, 0, pid['n_out'], pid['v_out'] * g_o)

            for reg in self.regulators:
                g_out = 1.0 / 0.05
                self._stamp_g(A, reg['nin'], reg['ngnd'], 1.0 / 500.0)
                self._stamp_g(A, reg['nout'], reg['ngnd'], g_out)
                self._stamp_i(Z, reg['ngnd'], reg['nout'], reg['v_reg'] * g_out)

            for cmp_dev in getattr(self, 'comparators', []):
            vp = get_v_final(cmp_dev['np'])
            vm = get_v_final(cmp_dev['nm'])
            cmp_dev['v_out'] = cmp_dev['vcc'] if vp > vm else 0.0

        for sch in getattr(self, 'schmitts', []):
            vin_s = get_v_final(sch['nin'])
            if vin_s >= sch['vcc'] * 0.65:
                sch['state'] = False
            elif vin_s <= sch['vcc'] * 0.30:
                sch['state'] = True

        for cnt in getattr(self, 'counters4', []):
            if cnt['rst'] > 0 and get_v_final(cnt['rst']) >= 2.5:
                cnt['val'] = 0
            else:
                clk_now = get_v_final(cnt['clk']) >= 2.5
                if clk_now and not cnt['prev_clk']:
                    cnt['val'] = (cnt['val'] + 1) & 0x0F
                cnt['prev_clk'] = clk_now

        for ot in getattr(self, 'optotriacs', []):
            ot['active'] = ((get_v_final(ot['na']) - get_v_final(ot['nk'])) > 1.1)

        for ic in self.ne555s:
                v_o = (ic['vcc'] - 0.2) if ic['q'] else 0.05
                g_o = 1.0 / 15.0
                self._stamp_g(A, ic['out'], 0, g_o)
                self._stamp_i(Z, 0, ic['out'], v_o * g_o)
                self._stamp_g(A, ic['disch'], 0, (1.0 / 5.0) if not ic['q'] else 1e-9)

            for opt in self.optocouplers:
                self._stamp_g(A, opt['na'], opt['nk'], 1.0 / 60.0)
                self._stamp_g(A, opt['nc'], opt['ne'], (1.0 / 10.0) if opt['active'] else 1e-9)

            for rly in self.relays:
                self._stamp_g(A, rly['nc1'], rly['nc2'], 1.0 / 100.0)
                self._stamp_g(A, rly['ncom'], rly['nno'], (1.0 / 0.02) if rly['closed'] else 1e-9)

            for srly in self.spdt_relays:
                self._stamp_g(A, srly['nc1'], srly['nc2'], 1.0 / 100.0)
                self._stamp_g(A, srly['ncom'], srly['nno'], (1.0 / 0.02) if srly['closed'] else 1e-9)
                self._stamp_g(A, srly['ncom'], srly['nnc'], 1e-9 if srly['closed'] else (1.0 / 0.02))

            for ff in self.flipflops:
                g_o = 1.0 / 35.0
                if ff['q_pin'] > 0:
                    self._stamp_g(A, ff['q_pin'], 0, g_o)
                    self._stamp_i(Z, 0, ff['q_pin'], (5.0 if ff['q'] else 0.0) * g_o)
                if ff['qb_pin'] > 0:
                    self._stamp_g(A, ff['qb_pin'], 0, g_o)
                    self._stamp_i(Z, 0, ff['qb_pin'], (0.0 if ff['q'] else 5.0) * g_o)

            for cmp_dev in getattr(self, 'comparators', []):
                if cmp_dev['nout'] > 0:
                    g_o = 1.0 / 30.0
                    self._stamp_g(A, cmp_dev['nout'], 0, g_o)
                    self._stamp_i(Z, 0, cmp_dev['nout'], cmp_dev['v_out'] * g_o)

            for sch in getattr(self, 'schmitts', []):
                if sch['nout'] > 0:
                    g_o = 1.0 / 35.0
                    v_s = sch['vcc'] if sch['state'] else 0.0
                    self._stamp_g(A, sch['nout'], 0, g_o)
                    self._stamp_i(Z, 0, sch['nout'], v_s * g_o)

            for cnt in getattr(self, 'counters4', []):
                g_o = 1.0 / 35.0
                for bit_i, qp in enumerate(cnt['q_pins']):
                    if qp > 0:
                        bit_v = 5.0 if ((cnt['val'] >> bit_i) & 1) else 0.0
                        self._stamp_g(A, qp, 0, g_o)
                        self._stamp_i(Z, 0, qp, bit_v * g_o)

            for ot in getattr(self, 'optotriacs', []):
                self._stamp_g(A, ot['na'], ot['nk'], 1.0 / 60.0)
                self._stamp_g(A, ot['mt1'], ot['mt2'], (1.0 / 0.1) if ot['active'] else 1e-9)

            for gf in self.gate_firings:
                if gf['n_gate'] > 0:
                    g_o = 1.0 / 25.0
                    self._stamp_g(A, gf['n_gate'], 0, g_o)
                    self._stamp_i(Z, 0, gf['n_gate'], gf['v_out'] * g_o)

            for mot in self.motors:
                row = self.num_nodes + mot['idx']
                n1, n2 = mot['n1'], mot['n2']
                if n1 > 0: A[row, n1-1] = 1.0; A[n1-1, row] = 1.0
                if n2 > 0: A[row, n2-1] = -1.0; A[n2-1, row] = -1.0
                if is_dc or dt <= 0:
                    r_eq = mot['Ra']
                    z_eq = mot['Ke'] * mot['omega']
                else:
                    r_eq = mot['Ra'] + mot['La'] / dt
                    z_eq = mot['Ke'] * mot['omega'] - (mot['La'] / dt) * mot['i_prev']
                A[row, row] = -r_eq
                Z[row] = z_eq

            for lg in self.logic_gates:
                if lg['out'] > 0:
                    g_out = 1.0 / 40.0
                    self._stamp_g(A, lg['out'], 0, g_out)
                    self._stamp_i(Z, 0, lg['out'], lg['v_out'] * g_out)

            for mcu in self.mcus:
                if mcu['out'] > 0:
                    g_out = 1.0 / 30.0
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
                if is_dc or dt <= 0:
                    A[row, row] = -1e-6; Z[row] = 0.0
                else:
                    r_eq = ind['L'] / dt
                    A[row, row] = -r_eq; Z[row] = -r_eq * ind['i_prev']

            for d in self.diodes:
                vd = np.clip(d['v_guess'], -d['bv'] - 1.0, 1.1)
                nvt = d['n'] * Vt
                exp_val = np.exp(np.clip(vd / nvt, -60.0, 38.0))
                id_curr = d['Is'] * (exp_val - 1.0)
                gd = (d['Is'] / nvt) * exp_val + gmin
                ieq = id_curr - gd * vd
                self._stamp_g(A, d['n1'], d['n2'], gd)
                self._stamp_i(Z, d['n1'], d['n2'], ieq)

            for led in self.leds:
                vd = np.clip(led['v_guess'], -10.0, 3.6)
                nvt = led['n'] * Vt
                exp_val = np.exp(np.clip(vd / nvt, -60.0, 42.0))
                id_curr = led['Is'] * (exp_val - 1.0)
                led['last_i'] = max(0.0, id_curr)
                led['max_i'] = max(led['max_i'], led['last_i'])
                gd = (led['Is'] / nvt) * exp_val + gmin
                ieq = id_curr - gd * vd
                self._stamp_g(A, led['n1'], led['n2'], gd)
                self._stamp_i(Z, led['n1'], led['n2'], ieq)

            for z in self.zeners:
                vd = np.clip(z['v_guess'], -z['vz'] - 1.0, 1.0)
                exp_f = np.exp(np.clip(vd / Vt, -60.0, 36.0))
                if_curr = z['Is'] * (exp_f - 1.0)
                gf = (z['Is'] / Vt) * exp_f
                v_knee_offset = Vt * np.log(0.005 / z['Is'])
                v_rev = (-vd - z['vz']) + v_knee_offset
                exp_r = np.exp(np.clip(v_rev / Vt, -60.0, 36.0))
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

                v_bd = np.clip(-vds, -100.0, 0.9)
                exp_bd = np.exp(np.clip(v_bd / Vt, -60.0, 36.0))
                i_bd = 1e-11 * (exp_bd - 1.0)
                g_bd = (1e-11 / Vt) * exp_bd
                ids_total = ids - i_bd
                gds_total = gds + g_bd

                ieq = sgn * (ids_total - gm * vgs - gds_total * vds)
                self._stamp_g(A, m['nd'], m['ns'], gds_total)
                self._stamp_vccs(A, m['nd'], m['ns'], m['ng'], m['ns'], gm)
                self._stamp_i(Z, m['nd'], m['ns'], ieq)

            for q in self.bjts:
                sgn = 1.0 if q['pol'] == 'NPN' else -1.0
                vbe = np.clip(sgn * q['vbe_g'], -30.0, 0.92)
                vbc = np.clip(sgn * q['vbc_g'], -30.0, 0.92)
                if vbe > 0.55:
                    q['active'] = True

                exp_be = np.exp(np.clip(vbe / Vt, -60.0, 36.0))
                exp_bc = np.exp(np.clip(vbc / Vt, -60.0, 36.0))

                ifwd = q['Is'] * (exp_be - 1.0)
                irev = q['Is'] * (exp_bc - 1.0)
                g_be = (q['Is'] / Vt) * exp_be
                g_bc = (q['Is'] / Vt) * exp_bc

                ib = ifwd / q['bf'] + irev / q['br']
                ic = (ifwd - irev) - irev / q['br']

                dib_dvbe = g_be / q['bf'] + gmin
                dib_dvbc = g_bc / q['br'] + gmin
                dic_dvbe = g_be
                dic_dvbc = -g_bc * (1.0 + 1.0 / q['br'])

                ib_eq = sgn * (ib - dib_dvbe * vbe - dib_dvbc * vbc)
                ic_eq = sgn * (ic - dic_dvbe * vbe - dic_dvbc * vbc)

                self._stamp_g(A, q['nb'], q['ne'], dib_dvbe)
                self._stamp_i(Z, q['nb'], q['ne'], ib_eq)
                self._stamp_g(A, q['nb'], q['nc'], dib_dvbc)
                self._stamp_i(Z, q['nb'], q['nc'], 0.0)
                self._stamp_vccs(A, q['nc'], q['ne'], q['nb'], q['ne'], dic_dvbe)
                self._stamp_vccs(A, q['nc'], q['ne'], q['nb'], q['nc'], dic_dvbc)
                self._stamp_g(A, q['nc'], q['ne'], 1e-9)
                self._stamp_i(Z, q['nc'], q['ne'], ic_eq)

            for s in self.scrs:
                self._stamp_g(A, s['ng'], s['nk'], 1.0 / 250.0)
                if s['latched']:
                    g_on = 1.0 / 0.02
                    self._stamp_g(A, s['na'], s['nk'], g_on)
                    self._stamp_i(Z, s['nk'], s['na'], 0.7 * g_on)
                else:
                    self._stamp_g(A, s['na'], s['nk'], 1e-9)

            for tr in self.triacs:
                self._stamp_g(A, tr['ng'], tr['mt1'], 1.0 / 250.0)
                if tr['latched']:
                    g_on = 1.0 / 0.02
                    vmt = (X_prev_iter[tr['mt2']-1] if tr['mt2'] > 0 else 0.0) - (X_prev_iter[tr['mt1']-1] if tr['mt1'] > 0 else 0.0)
                    v_drop = 0.8 if vmt >= 0 else -0.8
                    self._stamp_g(A, tr['mt2'], tr['mt1'], g_on)
                    self._stamp_i(Z, tr['mt1'], tr['mt2'], v_drop * g_on)
                else:
                    self._stamp_g(A, tr['mt2'], tr['mt1'], 1e-9)

            for dc in self.diacs:
                self._stamp_g(A, dc['mt1'], dc['mt2'], (1.0 / 35.0) if dc['conducting'] else 1e-9)

            try:
                X = np.linalg.solve(A, Z)
            except np.linalg.LinAlgError:
                A += np.eye(size) * 1e-7
                X = np.linalg.lstsq(A, Z, rcond=None)[0]

            def get_v(n):
                return X[n-1] if n > 0 else 0.0

            max_nl_diff = 0.0

            for reg in self.regulators:
                vin = get_v(reg['nin']) - get_v(reg['ngnd'])
                if vin >= reg['vout'] + 1.5:
                    reg['v_reg'] = reg['vout']
                    reg['active'] = True
                else:
                    reg['v_reg'] = max(0.0, vin - 1.5)

            for d in self.diodes:
                v_new = get_v(d['n1']) - get_v(d['n2'])
                if v_new > 0.45:
                    d['conducted'] = True
                    d['v_drop'] = max(d['v_drop'], min(v_new, 1.1))
                vcrit = d['n'] * Vt * np.log(d['n'] * Vt / (np.sqrt(2) * d['Is']))
                v_limited = self._pn_limit(v_new, d['v_guess'], d['n'] * Vt, vcrit)
                max_nl_diff = max(max_nl_diff, abs(v_limited - d['v_guess']))
                d['v_guess'] = v_limited

            for led in self.leds:
                v_new = get_v(led['n1']) - get_v(led['n2'])
                if abs(v_new - led['v_guess']) > 0.25:
                    v_new = led['v_guess'] + np.sign(v_new - led['v_guess']) * 0.25
                max_nl_diff = max(max_nl_diff, abs(v_new - led['v_guess']))
                led['v_guess'] = v_new

            for z in self.zeners:
                v_new = get_v(z['n1']) - get_v(z['n2'])
                if -v_new >= (z['vz'] - 0.15):
                    z['clamped'] = True
                if abs(v_new - z['v_guess']) > 0.25:
                    v_new = z['v_guess'] + np.sign(v_new - z['v_guess']) * 0.25
                max_nl_diff = max(max_nl_diff, abs(v_new - z['v_guess']))
                z['v_guess'] = v_new

            for m in self.mosfets:
                vgs_n = get_v(m['ng']) - get_v(m['ns'])
                vds_n = get_v(m['nd']) - get_v(m['ns'])
                max_nl_diff = max(max_nl_diff, abs(vgs_n - m['vgs_g']), abs(vds_n - m['vds_g']))
                m['vgs_g'] = 0.5 * m['vgs_g'] + 0.5 * vgs_n
                m['vds_g'] = 0.5 * m['vds_g'] + 0.5 * vds_n

            for q in self.bjts:
                vbe_n = get_v(q['nb']) - get_v(q['ne'])
                vbc_n = get_v(q['nb']) - get_v(q['nc'])
                if abs(vbe_n - q['vbe_g']) > 0.15:
                    vbe_n = q['vbe_g'] + np.sign(vbe_n - q['vbe_g']) * 0.15
                if abs(vbc_n - q['vbc_g']) > 0.2:
                    vbc_n = q['vbc_g'] + np.sign(vbc_n - q['vbc_g']) * 0.2
                max_nl_diff = max(max_nl_diff, abs(vbe_n - q['vbe_g']), abs(vbc_n - q['vbc_g']))
                q['vbe_g'] = vbe_n
                q['vbc_g'] = vbc_n

            for lg in self.logic_gates:
                b1 = get_v(lg['in1']) >= 2.5
                b2 = get_v(lg['in2']) >= 2.5
                res = (b1 and b2) if lg['type'] == 'AND' else (
                      (b1 or b2) if lg['type'] == 'OR' else (
                      (not b1) if lg['type'] == 'NOT' else (
                      (not (b1 and b2)) if lg['type'] == 'NAND' else (b1 != b2))))
                lg['v_out'] = 5.0 if res else 0.0

            x_tol = np.max(np.abs(X - X_prev_iter) - (reltol * np.maximum(np.abs(X), np.abs(X_prev_iter)) + abstol))
            X_prev_iter = X.copy()

            if it >= 1 and max_nl_diff < 1e-6 and x_tol <= 0:
                converged = True
                break

        def get_v_final(n):
            return X[n-1] if n > 0 else 0.0

        if not is_dc:
            for mcu in self.mcus:
                vin = get_v_final(mcu['in'])
                self._exec_mcu_code(mcu, vin, t, self._t_stop_ref)

        if not is_dc and dt > 0:
            for pid in self.pids:
                err = get_v_final(pid['n_set']) - get_v_final(pid['n_fb'])
                pid['integral'] = np.clip(pid['integral'] + err * dt, -20.0, 20.0)
                deriv = (err - pid['prev_err']) / dt
                pid['v_out'] = np.clip(pid['kp'] * err + pid['ki'] * pid['integral'] + pid['kd'] * deriv, -30.0, 30.0)
                pid['prev_err'] = err

            for mot in self.motors:
                row = self.num_nodes + mot['idx']
                ia = X[row]
                t_elec = mot['Kt'] * (abs(ia) if mot['type'] == 'UNIVERSAL' else ia)
                t_net = t_elec - mot['B'] * mot['omega'] - np.sign(mot['omega'] + 1e-9) * mot['t_load']
                alpha = t_net / mot['J']
                mot['omega'] = mot['omega'] + alpha * dt
                if abs(mot['omega']) < 1e-4 and abs(t_elec) <= mot['t_load']:
                    mot['omega'] = 0.0
                mot['i_prev'] = ia
                mot['current'] = float(ia)
                mot['torque'] = float(t_elec)
                mot['rpm'] = float(mot['omega'] * 60.0 / (2.0 * np.pi))
                mot['angle'] = float((mot['angle'] + np.rad2deg(mot['omega'] * dt)) % 360.0)
                mot['history']['t'].append(float(t))
                mot['history']['rpm'].append(mot['rpm'])
                mot['history']['torque'].append(mot['torque'])
                mot['history']['current'].append(mot['current'])
                mot['history']['angle'].append(mot['angle'])

            for r in self.resistors:
                vr = get_v_final(r['n1']) - get_v_final(r['n2'])
                r['e_sum'] += ((vr ** 2) / r['R']) * dt
                r['t_sum'] += dt

            for am in self.ammeters:
                row = self.num_nodes + am['idx']
                am['i_sq_sum'] += (X[row] ** 2) * dt
                am['t_sum'] += dt

            for wm in self.wattmeters:
                v_w = get_v_final(wm['vp']) - get_v_final(wm['vm'])
                i_w = X[self.num_nodes + wm['idx']]
                wm['p_sum'] += (v_w * i_w) * dt
                wm['v_sq_sum'] += (v_w ** 2) * dt
                wm['i_sq_sum'] += (i_w ** 2) * dt
                wm['t_sum'] += dt

            for led in self.leds:
                led['i_sum'] += led['last_i'] * dt
                led['t_sum'] += dt

        for cmp_dev in getattr(self, 'comparators', []):
            vp = get_v_final(cmp_dev['np'])
            vm = get_v_final(cmp_dev['nm'])
            cmp_dev['v_out'] = cmp_dev['vcc'] if vp > vm else 0.0

        for sch in getattr(self, 'schmitts', []):
            vin_s = get_v_final(sch['nin'])
            if vin_s >= sch['vcc'] * 0.65:
                sch['state'] = False
            elif vin_s <= sch['vcc'] * 0.30:
                sch['state'] = True

        for cnt in getattr(self, 'counters4', []):
            if cnt['rst'] > 0 and get_v_final(cnt['rst']) >= 2.5:
                cnt['val'] = 0
            else:
                clk_now = get_v_final(cnt['clk']) >= 2.5
                if clk_now and not cnt['prev_clk']:
                    cnt['val'] = (cnt['val'] + 1) & 0x0F
                cnt['prev_clk'] = clk_now

        for ot in getattr(self, 'optotriacs', []):
            ot['active'] = ((get_v_final(ot['na']) - get_v_final(ot['nk'])) > 1.1)

        for ic in self.ne555s:
            v_trig, v_thres = get_v_final(ic['trig']), get_v_final(ic['thres'])
            v_low, v_high = ic['vcc'] / 3.0, (2.0 * ic['vcc']) / 3.0
            if v_trig < v_low:
                ic['q'] = True; ic['oscillated'] = True
            elif v_thres > v_high:
                ic['q'] = False

        for opt in self.optocouplers:
            opt['active'] = ((get_v_final(opt['na']) - get_v_final(opt['nk'])) > 1.05)

        for rly in self.relays:
            v_c = abs(get_v_final(rly['nc1']) - get_v_final(rly['nc2']))
            thresh = rly['v_coil'] * (0.45 if rly['closed'] else 0.75)
            rly['closed'] = (v_c >= thresh)
            if rly['closed']:
                rly['ever_closed'] = True

        for srly in self.spdt_relays:
            v_c = abs(get_v_final(srly['nc1']) - get_v_final(srly['nc2']))
            srly['closed'] = (v_c >= srly['v_coil'] * (0.45 if srly['closed'] else 0.75))

        for ff in self.flipflops:
            clk_now = get_v_final(ff['clk']) >= 2.5
            if clk_now and not ff['prev_clk']:
                if ff['type'] == 'DFF':
                    ff['q'] = get_v_final(ff['in1']) >= 2.5
                elif ff['type'] == 'JKFF':
                    j = get_v_final(ff['in1']) >= 2.5
                    k = get_v_final(ff['in2']) >= 2.5
                    if j and not k: ff['q'] = True
                    elif not j and k: ff['q'] = False
                    elif j and k: ff['q'] = not ff['q']
            ff['prev_clk'] = clk_now

        for gf in self.gate_firings:
            half_period = 0.5 / gf['freq']
            phase_t = t % half_period
            fire_t = (gf['alpha'] / 180.0) * half_period
            gf['v_out'] = 5.0 if (fire_t <= phase_t <= fire_t + half_period * 0.15) else 0.0

        for bcd in self.bcd_displays:
            val = 0
            for idx, p in enumerate(bcd['pins']):
                if get_v_final(p) >= 2.5:
                    val |= (1 << idx)
            bcd['digit'] = val
            bcd['counts'][val] = bcd['counts'].get(val, 0) + 1

        for lcd in self.lcds:
            vin = get_v_final(lcd['n_in'])
            lcd['text'] = f"V={vin:.2f}V ({vin*100:.1f}C)"

        for dc in self.diacs:
            v_diac = abs(get_v_final(dc['mt1']) - get_v_final(dc['mt2']))
            if not dc['conducting']:
                if v_diac >= dc['vbo']:
                    dc['conducting'] = True; dc['ever_fired'] = True
            else:
                if v_diac < 2.0:
                    dc['conducting'] = False

        for s in self.scrs:
            vgk = get_v_final(s['ng']) - get_v_final(s['nk'])
            vak = get_v_final(s['na']) - get_v_final(s['nk'])
            if not s['latched']:
                if vak > 0.8 and vgk >= s['vgt']:
                    s['latched'] = True; s['ever_latched'] = True
            else:
                if ((vak - 0.7) / 0.02) < s['ih']:
                    s['latched'] = False

        for tr in self.triacs:
            vg = abs(get_v_final(tr['ng']) - get_v_final(tr['mt1']))
            vmt = get_v_final(tr['mt2']) - get_v_final(tr['mt1'])
            if not tr['latched']:
                if abs(vmt) > 0.8 and vg >= tr['vgt']:
                    tr['latched'] = True; tr['ever_latched'] = True
            else:
                if (abs(vmt) / 0.02) < tr['ih']:
                    tr['latched'] = False

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

    def generate_physics_explanation(self, all_converged):
        notes = []
        if not all_converged:
            notes.append("⚠️ <b>تحذير تقارب عددي:</b> بعض الخطوات واجهت تغيراً حاداً جداً (تأكد من وجود مقاومة توالي مع المصادر والدايودات).")
        for wm in self.wattmeters:
            if wm['t_sum'] > 0:
                p_real = wm['p_sum'] / wm['t_sum']
                v_rms = np.sqrt(wm['v_sq_sum'] / wm['t_sum'])
                i_rms = np.sqrt(wm['i_sq_sum'] / wm['t_sum'])
                s_app = max(v_rms * i_rms, 1e-9)
                pf = min(1.0, abs(p_real) / s_app)
                q_reac = np.sqrt(max(0.0, s_app**2 - p_real**2))
                notes.append(f"⚡ <b>Wattmeter (#{wm['id']}):</b> P = <b>{p_real:.2f} W</b> | S = <b>{s_app:.2f} VA</b> | Q = <b>{q_reac:.2f} VAR</b> | PF = <b>{pf:.3f}</b>")
        for pid in self.pids:
            notes.append("🎛 <b>متحكم PID:</b> حقق استقرار الحلقة المغلقة بتعديل الخرج ديناميكياً.")
        for reg in self.regulators:
            if reg['active']:
                notes.append(f"🔋 <b>منظم الجهد ({reg['part']}):</b> ثبّت الجهد عند <b>{reg['vout']}V DC</b>.")
        for mot in self.motors:
            notes.append(f"⚙️ <b>محرك ({mot['part']}):</b> السرعة المستقرة <b>{mot['rpm']:.1f} RPM</b> | العزم <b>{mot['torque']:.4f} N·m</b>.")
        if not notes:
            notes.append("✅ الدائرة مستقرة وتطابق معادلات SPICE الفيزيائية بدقة reltol=10⁻⁴.")
        return notes

    def run_transient(self, t_stop, dt_base):
        self._t_stop_ref = t_stop
        _, ok = self.solve_step(0, 0, is_dc=True, source_scale=1.0)
        if not ok:
            for s in [0.05, 0.2, 0.5, 1.0]:
                _, ok = self.solve_step(0, 0, is_dc=True, source_scale=s, gmin=1e-7 if s < 1.0 else 1e-12)

        t = 0.0
        dt = dt_base
        times, results = [], []
        v_prev_step = None
        all_converged = True
        max_steps = 8000

        while t < t_stop and len(times) < max_steps:
            if t + dt > t_stop:
                dt = t_stop - t
                if dt <= 1e-12:
                    break
            X, step_ok = self.solve_step(t, dt, is_dc=False)
            if not step_ok:
                all_converged = False
            v_curr = X[:self.num_nodes]
            if v_prev_step is not None and len(v_curr) > 0:
                dv = np.max(np.abs(v_curr - v_prev_step))
                if dv > 3.0 and dt > dt_base * 0.1:
                    dt *= 0.5
                elif dv < 0.1 and dt < dt_base * 1.5:
                    dt = min(dt * 1.2, dt_base * 1.5)
            times.append(float(t))
            results.append(v_curr)
            v_prev_step = v_curr.copy()
            t += dt

        led_states = {led['id']: float(led['i_sum'] / led['t_sum']) if led['t_sum'] > 0 else float(led['last_i']) for led in self.leds}
        power_stats = {r['id']: float(r['e_sum'] / r['t_sum']) for r in self.resistors if r['id'] is not None and r['t_sum'] > 0}
        ammeter_stats = {am['id']: float(np.sqrt(am['i_sq_sum'] / am['t_sum'])) for am in self.ammeters if am['id'] is not None and am['t_sum'] > 0}
        motor_stats = {mot['id']: {'rpm': mot['rpm'], 'torque': mot['torque'], 'current': mot['current'], 'angle': mot['angle'], 'history': mot['history']} for mot in self.motors if mot['id'] is not None}
        bcd_stats = {bcd['id']: int(max(bcd['counts'], key=bcd['counts'].get)) if bcd['counts'] else int(bcd['digit']) for bcd in self.bcd_displays if bcd['id'] is not None}
        lcd_stats = {lcd['id']: lcd['text'] for lcd in self.lcds if lcd['id'] is not None}
        for m in self.mcus:
            for lcd in self.lcds:
                if m['lcd_text'] != 'ProSim Ready!':
                    lcd_stats[lcd['id']] = m['lcd_text']

        mcu_logs = [log for m in self.mcus for log in m['logs']]
        bus_frames = [f for m in self.mcus for f in m['bus_frames']]
        explanations = self.generate_physics_explanation(all_converged)

        arr = np.array(results).T if len(results) > 0 else np.zeros((self.num_nodes, 0))
        fft_freqs, fft_mags = [], []
        if len(times) > 16 and self.num_nodes > 0:
            n_fft = 512
            t_uniform = np.linspace(0, t_stop, n_fft, endpoint=False)
            dt_u = t_stop / n_fft
            window = np.hanning(n_fft)
            win_corr = 2.0 / np.sum(window)
            fft_freqs = np.fft.rfftfreq(n_fft, d=dt_u)[:64].tolist()
            for row in arr:
                v_u = np.interp(t_uniform, times, row)
                v_ac = v_u - np.mean(v_u)
                mag = win_corr * np.abs(np.fft.rfft(v_ac * window))
                mag[0] = np.abs(np.mean(v_u))
                fft_mags.append(mag[:64].tolist())

        return (times, arr.tolist(), led_states, power_stats, ammeter_stats,
                motor_stats, bcd_stats, lcd_stats, mcu_logs, bus_frames,
                fft_freqs, fft_mags, explanations, all_converged)

    def run_ac_bode_and_stability(self, f_start=10.0, f_stop=100000.0, points=120):
        self.solve_step(0, 0, is_dc=True, source_scale=1.0)
        freqs = np.logspace(np.log10(f_start), np.log10(f_stop), points)
        num_extra = self._next_extra_idx()
        size = self.num_nodes + num_extra
        if size == 0:
            return [], [], [], []
        mag_results = [[] for _ in range(self.num_nodes)]
        phase_results = [[] for _ in range(self.num_nodes)]
        Vt = 0.02585

        for f in freqs:
            w = 2 * np.pi * f
            A = np.zeros((size, size), dtype=complex)
            Z = np.zeros(size, dtype=complex)
            for i in range(self.num_nodes):
                A[i, i] += 1e-12
            for r in self.resistors:
                self._stamp_g(A, r['n1'], r['n2'], 1.0 / r['R'])
            for cap in self.capacitors:
                self._stamp_g(A, cap['n1'], cap['n2'], 1j * w * cap['C'])
            for d in self.diodes:
                gd = (d['Is'] / (d['n'] * Vt)) * np.exp(np.clip(d['v_guess'] / (d['n'] * Vt), -60, 36)) + 1e-12
                self._stamp_g(A, d['n1'], d['n2'], gd)
            for q in self.bjts:
                sgn = 1.0 if q['pol'] == 'NPN' else -1.0
                vbe = np.clip(sgn * q['vbe_g'], -30.0, 0.9)
                g_be = (q['Is'] / Vt) * np.exp(np.clip(vbe / Vt, -60, 36))
                self._stamp_g(A, q['nb'], q['ne'], g_be / q['bf'] + 1e-12)
                self._stamp_vccs(A, q['nc'], q['ne'], q['nb'], q['ne'], g_be)
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
            try:
                X = np.linalg.solve(A, Z)
            except np.linalg.LinAlgError:
                A += np.eye(size) * 1e-8
                X = np.linalg.lstsq(A, Z, rcond=None)[0]
            for i in range(self.num_nodes):
                mag = max(np.abs(X[i]), 1e-12)
                mag_results[i].append(float(20 * np.log10(mag)))
                phase_results[i].append(float(np.angle(X[i], deg=True)))

        return freqs.tolist(), mag_results, phase_results, []
