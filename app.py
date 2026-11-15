from flask import Flask, render_template, request, jsonify, send_from_directory
from solver import ProCircuitSolver
import numpy as np
import random
import re

app = Flask(__name__)

def parse_eng_val(raw, allow_zero=True):
    if isinstance(raw, (int, float)):
        return float(raw)
    s = str(raw).strip()
    if not s:
        if allow_zero:
            return 0.0
        raise ValueError("قيمة فارغة غير صالحة")
    multipliers = {
        'p': 1e-12, 'n': 1e-9, 'u': 1e-6, 'µ': 1e-6,
        'm': 1e-3, 'k': 1e3, 'K': 1e3, 'M': 1e6, 'G': 1e9
    }
    # Support European notation like 4k7 -> 4.7k, 2u2 -> 2.2u
    euro = re.match(r'^([+-]?\d+)([pnuµmkKMG])(\d+)$', s)
    if euro:
        num = float(f"{euro.group(1)}.{euro.group(3)}")
        return num * multipliers[euro.group(2)]

    m = re.match(r'^([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*([pnuµmkKMG]?)(?:[VvAaWwHhFfΩohmHz°%]*)$', s)
    if m and m.group(1) != '':
        return float(m.group(1)) * multipliers.get(m.group(2), 1.0)
    raise ValueError(f"قيمة هندسية غير مفهومة: '{raw}'")

PART_MODELS = {
    # Standard & Fast & Schottky Diodes (Is, n, Rs, BV)
    '1N4001': (7.02e-9, 1.77, 0.04, 50.0),
    '1N4004': (7.02e-9, 1.77, 0.04, 400.0),
    '1N4007': (7.02e-9, 1.77, 0.04, 1000.0),
    '1N5408': (1.41e-8, 1.80, 0.02, 1000.0),
    '1N4148': (2.52e-9, 1.75, 0.50, 100.0),
    '1N914':  (2.52e-9, 1.75, 0.50, 100.0),
    '1N5819': (3.15e-5, 1.05, 0.03, 40.0),
    '1N5822': (6.20e-5, 1.06, 0.02, 40.0),
    'SS14':   (3.15e-5, 1.05, 0.03, 40.0),
    'UF4007': (4.10e-9, 1.65, 0.05, 1000.0),
    'FR107':  (4.50e-9, 1.68, 0.05, 1000.0),
    'BY255':  (1.20e-8, 1.78, 0.02, 1300.0),
    # LEDs (Forward voltage Vf)
    'LED-RED': 1.85, 'LED': 1.85, 'LED-GREEN': 2.15, 'LED-YELLOW': 2.05,
    'LED-BLUE': 3.10, 'LED-WHITE': 3.20,
    # Zeners
    '1N4728A': 3.3, '1N4732A': 4.7, '1N4733A': 5.1, '1N4735A': 6.2,
    '1N4739A': 9.1, '1N4742A': 12.0, '1N4744A': 15.0, '1N4749A': 24.0,
    # Regulators
    # JFETs & IGBTs
    '2N5457': (-1.5, 0.003, 'N'), 'J201': (-0.8, 0.001, 'N'), 'BF245A': (-1.8, 0.005, 'N'),
    '2N5460': (-2.0, 0.002, 'P'), 'J175': (-3.5, 0.004, 'P'),
    'IRG4PC50U': (4.5, 15.0, 'N'), 'FGA25N120': (5.0, 20.0, 'N'), 'IKW40N120': (5.2, 25.0, 'N'),
    # More Zeners & Shunt References
    '1N4729A': 3.6, '1N4730A': 3.9, '1N4731A': 4.3, '1N4734A': 5.6,
    '1N4736A': 6.8, '1N4737A': 7.5, '1N4738A': 8.2, '1N4740A': 10.0,
    '1N4741A': 11.0, '1N4743A': 13.0, '1N4745A': 16.0, '1N4746A': 18.0,
    '1N4747A': 20.0, '1N4748A': 22.0, '1N4750A': 27.0, '1N4751A': 30.0, 'TL431': 2.5,
    # More Regulators
    '7806': 6.0, '7808': 8.0, '7818': 18.0, '7824': 24.0,
    '7905': -5.0, '7912': -12.0, '7915': -15.0, 'AMS1117-3.3': 3.3, 'AMS1117-5.0': 5.0,
    '7805': 5.0, '7809': 9.0, '7812': 12.0, '7815': 15.0, 'LM317': 3.3,
    # TRIACs & SCRs
    'BT134': (0.7, 0.004), 'BT136': (0.8, 0.005), 'BT137': (0.85, 0.006),
    'BT138': (0.9, 0.008), 'BT139': (1.0, 0.010), 'BTA16': (0.9, 0.008),
    'BTA24': (1.0, 0.012), 'BTA41': (1.1, 0.015), 'MAC97A6': (0.6, 0.002),
    'BT151': (0.7, 0.005), 'BT152': (0.8, 0.007), '2N5060': (0.6, 0.002),
    '2N5064': (0.6, 0.002), 'TYN612': (0.8, 0.008), 'MCR100-6': (0.6, 0.002),
    'C106D': (0.65, 0.003), '2N6509': (0.9, 0.010),
    # DIACs
    'DB3': 32.0, 'DB4': 40.0, 'DB6': 60.0, 'NTE6407': 32.0,
    # MOSFETs
    'IRFZ44N': (2.5, 2.0, 'N'), 'IRF540N': (3.0, 1.5, 'N'), 'IRF3205': (2.5, 3.0, 'N'),
    'IRF840': (3.0, 0.8, 'N'), '2N7000': (1.8, 0.2, 'N'), 'BS170': (1.8, 0.25, 'N'),
    'IRF9540N': (3.0, 1.2, 'P'), 'IRF4905': (2.8, 2.2, 'P'), 'BS250': (2.0, 0.2, 'P'),
    # BJTs
    '2N2222': (1.4e-14, 200.0, 'NPN'), 'BC547': (1.8e-14, 300.0, 'NPN'), 'BC337': (1.5e-14, 250.0, 'NPN'),
    '2N3904': (1.2e-14, 200.0, 'NPN'), 'BD139': (5.0e-14, 100.0, 'NPN'), 'TIP31C': (8.0e-14, 60.0, 'NPN'),
    'TIP120': (1.0e-13, 1000.0, 'NPN'), '2N3055': (2.0e-13, 50.0, 'NPN'), 'S8050': (1.5e-14, 220.0, 'NPN'),
    '2N2907': (1.4e-14, 200.0, 'PNP'), 'BC557': (1.8e-14, 300.0, 'PNP'), 'BC327': (1.5e-14, 250.0, 'PNP'),
    '2N3906': (1.2e-14, 200.0, 'PNP'), 'BD140': (5.0e-14, 100.0, 'PNP'), 'TIP32C': (8.0e-14, 60.0, 'PNP'),
    'TIP125': (1.0e-13, 1000.0, 'PNP'), 'S8550': (1.5e-14, 220.0, 'PNP')
}

def build_circuit(data, override_pid=None):
    num_nodes = int(data['num_nodes'])
    monte_carlo = bool(data.get('monte_carlo', False))
    ckt = ProCircuitSolver(num_nodes=num_nodes)

    for comp in data['components']:
        ctype = comp['type']
        pins = comp['pins']
        val = parse_eng_val(comp.get('val', 0))
        part = comp.get('part', 'CUSTOM')
        fault = comp.get('fault', 'NONE')

        if fault == 'OPEN':
            ckt.add_resistor(pins[0], pins[1], 1e9, id_tag=comp['id'], part=part)
            continue
        elif fault == 'SHORT':
            ckt.add_resistor(pins[0], pins[1], 1e-4, id_tag=comp['id'], part=part)
            continue

        tol = random.uniform(0.95, 1.05) if monte_carlo else 1.0

        if ctype in ['R', 'LDR', 'NTC']:
            if val < 0:
                raise ValueError(f"المقاومة #{comp['id']} لا يمكن أن تكون سالبة")
            ckt.add_resistor(pins[0], pins[1], max(val, 1e-4) * tol, id_tag=comp['id'], part=part)
        elif ctype == 'FUSE':
            ckt.add_resistor(pins[0], pins[1], max(val, 0.005), id_tag=comp['id'], part=part)
        elif ctype == 'I':
            # Current source modeled via Norton equivalent (100k parallel R)
            r_norton = 1e5
            ckt.add_vsource(pins[0], pins[1], dc=val * r_norton)
            ckt.add_resistor(pins[0], pins[1], r_norton)
        elif ctype == 'BRIDGE':
            ckt.add_bridge(pins[0], pins[1], pins[2], pins[3])
        elif ctype == 'RELAY_SPDT':
            ckt.add_spdt_relay(pins[0], pins[1], pins[2], pins[3], pins[4], v_coil=val if val > 0 else 5.0, id_tag=comp['id'])
        elif ctype in ['DFF', 'JKFF']:
            ckt.add_flipflop(ctype, pins[0], pins[1], pins[2], pins[3], pins[4])
        elif ctype == 'GATE_FIRING':
            ckt.add_gate_firing(pins[0], pins[1], alpha_deg=parse_eng_val(comp.get('alpha', 60)), freq=parse_eng_val(comp.get('freq', 50)))
        elif ctype == 'WATTMETER':
            ckt.add_wattmeter(pins[0], pins[1], pins[2], pins[3], id_tag=comp['id'])
        elif ctype == 'VCC':
            ckt.add_vsource(pins[0], 0, dc=val if val != 0 else 5.0)
        elif ctype == 'AMMETER':
            ckt.add_ammeter(pins[0], pins[1], id_tag=comp['id'])
        elif ctype == 'POT':
            pct = max(0.001, min(1.0, parse_eng_val(comp.get('pct', 50)) / 100.0))
            ckt.add_resistor(pins[0], pins[1], max(val, 1e-3) * pct * tol, id_tag=comp['id'], part=part)
        elif ctype == 'SW':
            ckt.add_resistor(pins[0], pins[1], 0.01 if comp.get('closed', True) else 1e9)
        elif ctype == 'LOGIC_TOGGLE':
            ckt.add_vsource(pins[0], 0, dc=5.0 if comp.get('closed', False) else 0.0)
        elif ctype == 'LM35':
            ckt.add_vsource(pins[0], 0, dc=parse_eng_val(comp.get('val', 25)) * 0.01)
        elif ctype == 'HCSR04':
            ckt.add_vsource(pins[0], 0, dc=min(5.0, (parse_eng_val(comp.get('val', 100)) / 400.0) * 5.0))
        elif ctype == 'PID':
            kp = override_pid[0] if override_pid else parse_eng_val(comp.get('kp', 2.0))
            ki = override_pid[1] if override_pid else parse_eng_val(comp.get('ki', 10.0))
            kd = override_pid[2] if override_pid else parse_eng_val(comp.get('kd', 0.05))
            ckt.add_pid(pins[0], pins[1], pins[2], kp=kp, ki=ki, kd=kd)
        elif ctype == 'LCD16':
            ckt.add_lcd(pins[0], id_tag=comp['id'])
        elif ctype in ['C', 'CELEC']:
            ckt.add_capacitor(pins[0], pins[1], max(val, 1e-15) * tol)
        elif ctype == 'L':
            ckt.add_inductor(pins[0], pins[1], max(val, 1e-9) * tol)
        elif ctype == 'TRF':
            ckt.add_transformer(pins[0], pins[1], pins[2], pins[3], ratio=val if val > 0 else 0.1)
        elif ctype == 'D':
            model = PART_MODELS.get(part, (parse_eng_val(comp.get('Is', 7.02e-9)), parse_eng_val(comp.get('n', 1.77)), 0.04, 1000.0))
            ckt.add_diode(pins[0], pins[1], Is=model[0], n=model[1], rs=model[2], bv=model[3], part=part)
        elif ctype == 'LED':
            vf = PART_MODELS.get(part, 1.85)
            ckt.add_led(pins[0], pins[1], comp['id'], vf=vf, part=part)
        elif ctype == 'Z':
            vz = PART_MODELS.get(part, val if val > 0 else 5.1)
            ckt.add_zener(pins[0], pins[1], vz=vz * tol, part=part)
        elif ctype == 'REG':
            vout = PART_MODELS.get(part, val if val > 0 else 5.0)
            ckt.add_regulator(pins[0], pins[1], pins[2], vout=vout, part=part)
        elif ctype == 'NE555':
            ckt.add_ne555(pins[0], pins[1], pins[2], pins[3], vcc=val if val > 0 else 5.0)
        elif ctype == 'OPTO':
            ckt.add_optocoupler(pins[0], pins[1], pins[2], pins[3], part=part)
        elif ctype == 'RELAY':
            ckt.add_relay(pins[0], pins[1], pins[2], pins[3], v_coil=val if val > 0 else 5.0, id_tag=comp['id'])
        elif ctype == 'MOTOR':
            p_up = part.upper()
            mtype = 'STEPPER' if 'STEPPER' in p_up else (
                    'BLDC' if 'BLDC' in p_up else (
                    'INDUCTION' if 'INDUCTION' in p_up else (
                    'UNIVERSAL' if 'UNIVERSAL' in p_up else (
                    'SERIES' if 'SERIES' in p_up else (
                    'SHUNT' if 'SHUNT' in p_up else (
                    'DC-775' if '775' in p_up else (
                    'N20' if 'N20' in p_up else 'DC')))))))
            load_t = parse_eng_val(comp.get('load', 0.0))
            ckt.add_motor(pins[0], pins[1], motor_type=mtype, load_torque=load_t, id_tag=comp['id'], part=part)
        elif ctype == 'BCD7':
            ckt.add_bcd_display(pins[0], pins[1], pins[2], pins[3], id_tag=comp['id'])
        elif ctype == 'V':
            ckt.add_vsource(
                pins[0], pins[1],
                dc=parse_eng_val(comp.get('dc', 0)), amp=parse_eng_val(comp.get('amp', 0)),
                freq=parse_eng_val(comp.get('freq', 0)), wave=comp.get('wave', 'sine'),
                phase_deg=parse_eng_val(comp.get('phase', 0))
            )
        elif ctype == 'OP':
            ckt.add_opamp(pins[0], pins[1], pins[2])
        elif ctype == 'M':
            vth, kp, pol = PART_MODELS.get(part, (val if val > 0 else 2.5, parse_eng_val(comp.get('kp', 2.0)), comp.get('pol', 'N')))
            ckt.add_mosfet(pins[0], pins[1], pins[2], vth=vth, kp=kp, pol=pol, part=part)
        elif ctype == 'Q':
            Is, bf, pol = PART_MODELS.get(part, (1.4e-14, val if val > 0 else 200.0, comp.get('pol', 'NPN')))
            ckt.add_bjt(pins[0], pins[1], pins[2], Is=Is, bf=bf, pol=pol, part=part)
        elif ctype == 'SCR':
            vgt, ih = PART_MODELS.get(part, (parse_eng_val(comp.get('vgt', 0.7)), parse_eng_val(comp.get('ih', 0.005))))
            ckt.add_scr(pins[0], pins[1], pins[2], vgt=vgt, ih=ih, part=part)
        elif ctype == 'TRIAC':
            vgt, ih = PART_MODELS.get(part, (parse_eng_val(comp.get('vgt', 0.8)), parse_eng_val(comp.get('ih', 0.005))))
            ckt.add_triac(pins[0], pins[1], pins[2], vgt=vgt, ih=ih, part=part)
        elif ctype == 'DIAC':
            vbo = PART_MODELS.get(part, val if val > 0 else 32.0)
            ckt.add_diac(pins[0], pins[1], vbo=vbo, part=part)
        elif ctype in ['AND', 'OR', 'NOT', 'NAND', 'XOR']:
            in2 = pins[1] if len(pins) > 2 else 0
            out = pins[2] if len(pins) > 2 else pins[1]
            ckt.add_logic_gate(ctype, pins[0], in2, out)
        elif ctype == 'MCU':
            ckt.add_mcu(pins[0], pins[1], code=comp.get('code', ''), pwm_freq=val if val > 0 else 250.0, threshold=parse_eng_val(comp.get('th', 2.5)))
    return ckt

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/manifest.webmanifest')
def manifest():
    return send_from_directory(app.root_path, 'manifest.webmanifest', mimetype='application/manifest+json')

@app.route('/service-worker.js')
def service_worker():
    response = send_from_directory(app.root_path, 'service-worker.js', mimetype='application/javascript')
    response.headers['Service-Worker-Allowed'] = '/'
    response.headers['Cache-Control'] = 'no-cache'
    return response

@app.route('/simulate', methods=['POST'])
def simulate():
    try:
        data = request.json
        mode = data.get('mode', 'transient')

        if mode == 'bode':
            ckt = build_circuit(data)
            freqs, mags, phases, poles = ckt.run_ac_bode_and_stability(f_start=10.0, f_stop=100000.0, points=120)
            return jsonify({'status': 'success', 'mode': 'bode', 'freqs': freqs, 'mags': mags, 'phases': phases, 'poles': poles})
        elif mode == 'autotune':
            # Real ITAE optimization on the user's actual circuit!
            pid_comp = next((c for c in data.get('components', []) if c['type'] == 'PID'), None)
            if not pid_comp:
                return jsonify({'status': 'error', 'message': 'لا يوجد بلوك PID في الدائرة لضبطه'}), 400
            set_node = pid_comp['pins'][0]
            fb_node = pid_comp['pins'][1]
            t_stop = max(parse_eng_val(data.get('t_stop', 0.1)), 1e-4)
            best_itae = float('inf')
            best_gains = (2.0, 10.0, 0.05)
            candidates = [
                (1.5, 8.0, 0.02), (2.5, 15.0, 0.05), (3.8, 22.0, 0.07),
                (5.0, 35.0, 0.10), (7.5, 50.0, 0.15), (1.0, 5.0, 0.01)
            ]
            for gains in candidates:
                ckt_test = build_circuit(data, override_pid=gains)
                times, volts, *_ = ckt_test.run_transient(t_stop=t_stop, dt_base=t_stop / 250.0)
                if len(times) > 5 and set_node > 0 and fb_node > 0:
                    t_arr = np.array(times)
                    err = np.abs(np.array(volts[set_node - 1]) - np.array(volts[fb_node - 1]))
                    itae = float(np.trapezoid(t_arr * err, t_arr))
                    if itae < best_itae:
                        best_itae = itae
                        best_gains = gains
            return jsonify({'status': 'success', 'mode': 'autotune', 'kp': best_gains[0], 'ki': best_gains[1], 'kd': best_gains[2], 'itae': round(best_itae, 6)})
        else:
            ckt = build_circuit(data)
            t_stop = max(parse_eng_val(data.get('t_stop', 0.04)), 1e-5)
            # Determine adaptive dt based on highest source frequency to prevent PWM/AC aliasing
            max_freq = max([parse_eng_val(c.get('freq', 0)) for c in data.get('components', []) if c['type'] == 'V'] + [0.0])
            min_steps = max(800, int(t_stop * max_freq * 40))
            min_steps = min(min_steps, 4000)
            dt = t_stop / min_steps

            (times, node_voltages, led_states, power_stats, ammeter_stats,
             motor_stats, bcd_stats, lcd_stats, mcu_logs, bus_frames,
             fft_freqs, fft_mags, explanations, converged) = ckt.run_transient(t_stop=t_stop, dt_base=dt)

            return jsonify({
                'status': 'success', 'mode': mode, 'converged': converged,
                'times': times, 'voltages': node_voltages,
                'leds': led_states, 'powers': power_stats, 'ammeters': ammeter_stats,
                'motors': motor_stats, 'bcds': bcd_stats, 'lcds': lcd_stats,
                'mcu_logs': mcu_logs, 'bus_frames': bus_frames,
                'fft_freqs': fft_freqs, 'fft_mags': fft_mags, 'explanations': explanations
            })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400

if __name__ == '__main__':
    print("\n🚀 ProSim Singularity v12.0 SPICE-Accurate Server is running on 127.0.0.1:5000!\n")
    app.run(host='127.0.0.1', port=5000, debug=False)
