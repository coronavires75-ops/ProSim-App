import numpy as np
from solver import ProCircuitSolver

def run_tests():
    passed = 0
    total = 0

    def check(name, actual, expected, tol_pct=3.0):
        nonlocal passed, total
        total += 1
        err = abs(actual - expected) / max(abs(expected), 1e-6) * 100.0
        ok = err <= tol_pct
        if ok:
            passed += 1
        status = "PASS ✅" if ok else "FAIL ❌"
        print(f"[{status}] {name}: Measured={actual:.4f} | Analytic={expected:.4f} | Error={err:.2f}%")

    print("=== ProSim Singularity v12.0 Mathematical Verification Suite ===")

    # 1. Voltage Divider & European Notation
    ckt1 = ProCircuitSolver(2)
    ckt1.add_vsource(1, 0, dc=10.0)
    ckt1.add_resistor(1, 2, 1000.0)
    ckt1.add_resistor(2, 0, 1000.0)
    X1, ok1 = ckt1.solve_step(0, 0, is_dc=True)
    check("1. Voltage Divider (10V, 1k/1k)", X1[1], 5.0, tol_pct=0.01)

    # 2. Silicon Diode Forward Drop (1N4007)
    ckt2 = ProCircuitSolver(2)
    ckt2.add_vsource(1, 0, dc=5.0)
    ckt2.add_resistor(1, 2, 430.0)
    ckt2.add_diode(2, 0, Is=7.02e-9, n=1.77, part='1N4007')
    X2, _ = ckt2.solve_step(0, 0, is_dc=True)
    check("2. 1N4007 Silicon Diode Vf (~0.68V)", X2[1], 0.68, tol_pct=5.0)

    # 3. Schottky Diode Forward Drop (1N5819)
    ckt3 = ProCircuitSolver(2)
    ckt3.add_vsource(1, 0, dc=5.0)
    ckt3.add_resistor(1, 2, 470.0)
    ckt3.add_diode(2, 0, Is=3.15e-5, n=1.05, part='1N5819')
    X3, _ = ckt3.solve_step(0, 0, is_dc=True)
    check("3. 1N5819 Schottky Diode Vf (~0.18V-0.25V)", X3[1], 0.18, tol_pct=15.0)

    # 4. Zener 5.1V Regulation (1N4733A)
    ckt4 = ProCircuitSolver(2)
    ckt4.add_vsource(1, 0, dc=12.0)
    ckt4.add_resistor(1, 2, 1000.0)
    ckt4.add_zener(0, 2, vz=5.1, part='1N4733A')
    X4, _ = ckt4.solve_step(0, 0, is_dc=True)
    check("4. 1N4733A Zener Clamping (5.10V)", X4[1], 5.10, tol_pct=1.5)

    # 5. BJT Saturation Switch (2N2222)
    ckt5 = ProCircuitSolver(3)
    ckt5.add_vsource(1, 0, dc=5.0)
    ckt5.add_resistor(1, 2, 1000.0)   # Base resistor (Ib ~ 4.3mA)
    ckt5.add_resistor(1, 3, 220.0)    # Collector load (Ic_sat ~ 22mA)
    ckt5.add_bjt(2, 3, 0, Is=1.4e-14, bf=200.0, pol='NPN', part='2N2222')
    X5, _ = ckt5.solve_step(0, 0, is_dc=True)
    total += 1
    if 0.01 < X5[2] < 0.30:
        passed += 1
        print(f"[PASS ✅] 5. BJT Saturation Vce(sat): Measured={X5[2]:.4f}V (Expected 0.05V - 0.25V)")
    else:
        print(f"[FAIL ❌] 5. BJT Saturation Vce(sat): Measured={X5[2]:.4f}V")

    # 6. DC Motor Steady-State Speed (12V, Ra=2.2, Ke=0.035, B=1.5e-5, T_load=0)
    ckt6 = ProCircuitSolver(1)
    ckt6.add_vsource(1, 0, dc=12.0)
    ckt6.add_motor(1, 0, motor_type='DC', load_torque=0.0, id_tag=1)
    ckt6.run_transient(t_stop=0.25, dt_base=0.0005)
    # Analytic steady-state omega = (V * Kt) / (Ra * B + Ke * Kt)
    w_analytic = (12.0 * 0.035) / (2.2 * 1.5e-5 + 0.035 * 0.035)
    rpm_analytic = w_analytic * 60.0 / (2.0 * np.pi)
    check("6. DC Motor Steady-State RPM (12V No-Load)", ckt6.motors[0]['rpm'], rpm_analytic, tol_pct=1.0)

    print(f"\nSummary: {passed}/{total} tests passed.")

if __name__ == '__main__':
    run_tests()
