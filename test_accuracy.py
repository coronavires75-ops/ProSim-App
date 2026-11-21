"""اختبارات دقة وتغطية الـ solver. شغّل السيرفر (python3 app.py) ثم: python3 test_accuracy.py"""
import subprocess, sys
bad = 0
for f in ("bench_linear.py", "bench_devices.py", "coverage_analog.py", "coverage_digital.py"):
    print("=====", f); r = subprocess.run([sys.executable, f]); bad += r.returncode
print("\nانتهى. (راجع أي سطر FAIL أعلاه)")
