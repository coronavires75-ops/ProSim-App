# ProSim Ultimate — تشغيل الكمبيوتر والموبايل

## ما الذي أُضيف؟
- تحسين تخطيط الواجهة للشاشات الصغيرة مع إبقاء تخطيط الكمبيوتر.
- استخدام Pointer Events بدل أحداث الفأرة فقط، لدعم اللمس والقلم.
- ملف PWA وService Worker لتخزين هيكل الواجهة بعد أول زيارة.
- متطلبات Python وملف تشغيل محلي.

## تشغيل محلي دون استضافة

### Windows / Linux / macOS
```bash
python -m venv .venv
# Windows: .venv\Scripts\activate
# Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
python run_local.py
```
افتح `http://127.0.0.1:5000` في المتصفح. يظل خادم Python مفتوحًا أثناء الاستخدام.

### Android عبر Termux
```bash
pkg update
pkg install python
cd ~/ProSim_ISIS
python -m pip install -r requirements.txt
python run_local.py
```
افتح `http://127.0.0.1:5000` في متصفح الهاتف. يمكن إضافة الصفحة للشاشة الرئيسية من قائمة المتصفح.

## إنشاء نسخة Windows
شغّل `build_windows.bat` على Windows بعد تثبيت Python. الناتج داخل `dist/ProSimUltimate/`.

## النشر أونلاين
ارفع مجلد المشروع إلى خدمة استضافة تدعم Python/Flask، واضبط أمر التشغيل على:
`gunicorn app:app`
ويجب أن تكون `requirements.txt` ضمن ملفات النشر. لا تستخدم خادم Flask التطويري للنشر العام.

## حدود النسخة الحالية
- وضع الأوفلاين المقصود هنا هو تشغيل خادم Python محليًا على الجهاز، وليس مجرد فتح صفحة مخزنة؛ فعملية المحاكاة تحتاج `solver.py` يعمل محليًا.
- الـService Worker يخزّن هيكل الواجهة فقط. مكتبة Chart.js ما زالت تُحمّل من CDN في النسخة الأصلية، لذلك يلزم توفير نسخة محلية منها لاستقلال الرسوم البيانية الكامل عن الإنترنت.
- لم تُبنَ APK أصلية بعد. تشغيل Android المحلي حاليًا عبر Termux والمتصفح. إنشاء APK مستقلة يحتاج مرحلة تغليف إضافية واختبار على جهاز Android.
- لم تتغير معادلات solver أو منطق بناء الدوائر عمدًا.
