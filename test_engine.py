"""اختبارات مباشرة للـ solver بدون سيرفر: python3 test_engine.py"""
import math
import numpy as np
from solver import ProCircuitSolver


def final(ckt, node, t_stop=1e-3, dt=1e-6):
    r = ckt.run_transient(t_stop=t_stop, dt_base=dt)
    return r[1][node][-1], r


def run_tests():
    passed = total = 0

    def check(name, actual, expected, tol_pct):
        nonlocal passed, total
        total += 1
        err = abs(actual - expected) / max(abs(expected), 1e-6) * 100.0
        ok = err <= tol_pct
        passed += ok
        print(f"[{'PASS ✅' if ok else 'FAIL ❌'}] {name}: Measured={actual:.4f} | Expected={expected:.4f} | Error={err:.2f}%")

    print("=== ProSim solver verification ===")

    c = ProCircuitSolver(2)
    c.add_vsource(1, 0, dc=10.0); c.add_resistor(1, 2, 1000.0); c.add_resistor(2, 0, 1000.0)
    check("1. Voltage divider 10V 1k/1k", final(c, 2)[0], 5.0, 0.01)

    # دايود 1N4007 (Is=76.9p n=1.45 Rs=0.042): الحل الدقيق بالتنصيف
    Is, n, rs, Vt = 76.9e-12, 1.45, 0.042, 0.02585
    lo, hi = 0.0, 1.0
    for _ in range(200):
        vd = (lo + hi) / 2
        i = Is * (math.exp(vd / (n * Vt)) - 1)
        lo, hi = (vd, hi) if (5 - vd - i * rs) / 430.0 > i else (lo, vd)
    vexact = vd + Is * (math.exp(vd / (n * Vt)) - 1) * rs
    c = ProCircuitSolver(2)
    c.add_vsource(1, 0, dc=5.0); c.add_resistor(1, 2, 430.0); c.add_diode(2, 0, Is=Is, n=n, rs=rs, part='1N4007')
    check("2. Diode 1N4007 forward voltage", final(c, 2)[0], vexact, 0.05)

    c = ProCircuitSolver(2)
    c.add_vsource(1, 0, dc=12.0); c.add_resistor(1, 2, 1000.0); c.add_zener(0, 2, vz=5.1, rz=7.0, part='1N4733A')
    check("3. Zener 5.1V clamp", final(c, 2)[0], 5.1, 2.0)

    c = ProCircuitSolver(3)
    c.add_vsource(1, 0, dc=5.0); c.add_resistor(1, 2, 1000.0); c.add_resistor(1, 3, 220.0)
    c.add_bjt(2, 3, 0, Is=1.4e-14, bf=200.0, pol='NPN', part='2N2222')
    vce = final(c, 3)[0]
    total += 1; ok = 0.01 < vce < 0.30; passed += ok
    print(f"[{'PASS ✅' if ok else 'FAIL ❌'}] 4. BJT saturation Vce(sat)={vce:.4f}V (0.01..0.30)")

    # RC: بدء من الصفر (UIC) => v(tau) = 5(1-e^-1)
    c = ProCircuitSolver(2); c.use_op = False
    c.add_vsource(1, 0, dc=5.0); c.add_resistor(1, 2, 1000.0); c.add_capacitor(2, 0, 1e-6)
    check("5. RC charge at tau (UIC)", final(c, 2, t_stop=1e-3, dt=1e-6)[0], 5 * (1 - math.exp(-1)), 0.1)

    # نفس الدائرة مع نقطة تشغيل DC (السلوك الافتراضي مثل SPICE/Proteus) => المكثف مشحون من البداية
    c = ProCircuitSolver(2)
    c.add_vsource(1, 0, dc=5.0); c.add_resistor(1, 2, 1000.0); c.add_capacitor(2, 0, 1e-6)
    v, r = final(c, 2)
    check("6. RC with DC operating point (t=0)", r[1][2][0], 5.0, 0.01)

    # مصدر بإزاحة طور 90° => قيمته عند t=0 تساوي السعة
    c = ProCircuitSolver(1)
    c.add_vsource(1, 0, amp=10.0, freq=50.0, wave='sine', phase=90.0); c.add_resistor(1, 0, 1000.0)
    r = c.run_transient(t_stop=0.02, dt_base=1e-5)
    check("7. Source phase 90deg (v at t=0)", r[1][1][0], 10.0, 0.01)

    print(f"\nSummary: {passed}/{total} tests passed.")
    return passed == total


if __name__ == '__main__':
    raise SystemExit(0 if run_tests() else 1)
