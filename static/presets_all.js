window.EXTRA_LECTURE_PRESETS = {
  "01. محول متغير (Variac Tap-Change Control)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 120,
      "y": 240,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "trf1",
      "type": "TRF",
      "part": "VARIAC-0-250V",
      "x": 280,
      "y": 240,
      "val": 0.45
    },
    {
      "id": "rload",
      "type": "R",
      "part": "LOAD-50R",
      "x": 450,
      "y": 240,
      "val": 50
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 280,
      "y": 380
    }
  ],
  "02. مقاومة متغيرة على التوالي (Series Rheostat Control)": [
    {
      "id": "v1",
      "type": "V",
      "part": "DC-24V",
      "x": 120,
      "y": 240,
      "dc": 24,
      "amp": 0,
      "freq": 0,
      "wave": "sine"
    },
    {
      "id": "rheo",
      "type": "POT",
      "part": "RHEOSTAT-100R",
      "x": 280,
      "y": 140,
      "val": "100",
      "pct": 50
    },
    {
      "id": "rload",
      "type": "R",
      "part": "LOAD-50R",
      "x": 450,
      "y": 240,
      "val": 50
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 280,
      "y": 380
    }
  ],
  "03. الدائرة الأساسية للـ SCR كمفتاح (Basic SCR Switch)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 120,
      "y": 240,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "trig",
      "type": "GATE_FIRING",
      "part": "GATE-PULSE-60deg",
      "x": 280,
      "y": 280,
      "alpha": 60,
      "freq": 50
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "BT151-500R",
      "x": 480,
      "y": 240,
      "vgt": 0.65
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-50R",
      "x": 280,
      "y": 120,
      "val": 50
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "04. مقارنة: مقوم دايود نصف موجة (Half-Wave Diode)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 120,
      "y": 240,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "d1",
      "type": "D",
      "part": "1N4007",
      "x": 280,
      "y": 160
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-50R",
      "x": 450,
      "y": 240,
      "val": 50
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 280,
      "y": 380
    }
  ],
  "05. تحكم SCR في نصف الموجة (Half-Wave Phase Control)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 120,
      "y": 240,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "trig",
      "type": "GATE_FIRING",
      "part": "ALPHA-70deg",
      "x": 280,
      "y": 280,
      "alpha": 70,
      "freq": 50
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "2N3669",
      "x": 480,
      "y": 240,
      "vgt": 0.65
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-50R",
      "x": 280,
      "y": 120,
      "val": 50
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "06. اختبار جهد قدح البوابة (2N3669: 3.6V, 150R)": [
    {
      "id": "vg",
      "type": "V",
      "part": "VG-3.6V",
      "x": 120,
      "y": 260,
      "dc": 3.6,
      "amp": 0,
      "freq": 0,
      "wave": "sine"
    },
    {
      "id": "rg",
      "type": "R",
      "part": "RG-150R",
      "x": 260,
      "y": 260,
      "val": 150
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-20R",
      "x": 280,
      "y": 120,
      "val": 20
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "2N3669",
      "x": 480,
      "y": 240,
      "vgt": 0.6
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "07. الدائرة المكافئة بترانزستورين (PNP + NPN Latch)": [
    {
      "id": "v1",
      "type": "V",
      "part": "DC-12V",
      "x": 120,
      "y": 240,
      "dc": 12,
      "amp": 0,
      "freq": 0,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-100R",
      "x": 280,
      "y": 120,
      "val": 100
    },
    {
      "id": "q_npn",
      "type": "Q",
      "part": "BC547-NPN",
      "x": 480,
      "y": 240,
      "pol": "NPN",
      "bf": 150
    },
    {
      "id": "rg",
      "type": "R",
      "part": "RG-1k",
      "x": 260,
      "y": 260,
      "val": 1000
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "08. قدح مقاومة بسيطة (Resistive Gate Control 0°-90°)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-115V-60Hz",
      "x": 120,
      "y": 240,
      "dc": 0,
      "amp": 162,
      "freq": 60,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-40R",
      "x": 280,
      "y": 120,
      "val": 40
    },
    {
      "id": "r1",
      "type": "R",
      "part": "R1-3k",
      "x": 250,
      "y": 240,
      "val": 3000
    },
    {
      "id": "r2",
      "type": "POT",
      "part": "POT-R2-10k",
      "x": 360,
      "y": 240,
      "val": "10k",
      "pct": 78
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "2N3669",
      "x": 490,
      "y": 240,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "09. قدح مقاومة مع دايود حماية البوابة (Gate + D1)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 120,
      "y": 240,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "LAMP-100W",
      "x": 280,
      "y": 120,
      "val": 484
    },
    {
      "id": "r1",
      "type": "R",
      "part": "R1-4.7k",
      "x": 230,
      "y": 240,
      "val": 4700
    },
    {
      "id": "r2",
      "type": "POT",
      "part": "POT-R2-22k",
      "x": 320,
      "y": 240,
      "val": "22k",
      "pct": 50
    },
    {
      "id": "d1",
      "type": "D",
      "part": "1N4007-PROT",
      "x": 400,
      "y": 240
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "BT151-500R",
      "x": 495,
      "y": 240,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "10. مسألة قدح عند 90° (115Vrms, R1=3k, R2=7.8k)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-115V-60Hz",
      "x": 120,
      "y": 240,
      "dc": 0,
      "amp": 162,
      "freq": 60,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-40R",
      "x": 280,
      "y": 120,
      "val": 40
    },
    {
      "id": "r1",
      "type": "R",
      "part": "R1-3k",
      "x": 250,
      "y": 240,
      "val": 3000
    },
    {
      "id": "r2",
      "type": "R",
      "part": "R2-7.8k",
      "x": 360,
      "y": 240,
      "val": 7800
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "2N3669",
      "x": 490,
      "y": 240,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "11. تشغيل SCR مع مصدر مستمر (DC Latching Circuit)": [
    {
      "id": "v1",
      "type": "V",
      "part": "DC-24V",
      "x": 120,
      "y": 240,
      "dc": 24,
      "amp": 0,
      "freq": 0,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-50R",
      "x": 280,
      "y": 120,
      "val": 50
    },
    {
      "id": "r1",
      "type": "R",
      "part": "R1-1k",
      "x": 250,
      "y": 240,
      "val": 1000
    },
    {
      "id": "sw1",
      "type": "PUSH_BTN",
      "part": "SW-FIRE",
      "x": 360,
      "y": 240,
      "closed": true
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "BT151-500R",
      "x": 490,
      "y": 240,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "12. دائرة إنذار السرقة والمصانع (Industrial Alarm SW1)": [
    {
      "id": "v1",
      "type": "V",
      "part": "DC-12V",
      "x": 120,
      "y": 240,
      "dc": 12,
      "amp": 0,
      "freq": 0,
      "wave": "sine"
    },
    {
      "id": "siren",
      "type": "R",
      "part": "SIREN-12V-ALARM",
      "x": 280,
      "y": 120,
      "val": 24
    },
    {
      "id": "sw_door",
      "type": "SW",
      "part": "LIMIT-SW1",
      "x": 250,
      "y": 240,
      "closed": true
    },
    {
      "id": "r1",
      "type": "R",
      "part": "R1-1k",
      "x": 360,
      "y": 240,
      "val": 1000
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "NTE5452",
      "x": 490,
      "y": 240,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "13. إنذار حريق متعدد الحساسات (Fire Alarm + START/STOP)": [
    {
      "id": "v1",
      "type": "V",
      "part": "DC-12V",
      "x": 120,
      "y": 240,
      "dc": 12,
      "amp": 0,
      "freq": 0,
      "wave": "sine"
    },
    {
      "id": "siren",
      "type": "R",
      "part": "SIREN-12V",
      "x": 280,
      "y": 120,
      "val": 24
    },
    {
      "id": "t1",
      "type": "SW",
      "part": "THERMOSTAT-T1",
      "x": 250,
      "y": 240,
      "closed": true
    },
    {
      "id": "r1",
      "type": "R",
      "part": "R1-1k",
      "x": 360,
      "y": 240,
      "val": 1000
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "NTE5452",
      "x": 490,
      "y": 240,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "14. تحكم حراري في سخان بـ NTC ودايود تمرير (Heater Control)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 120,
      "y": 240,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "heater",
      "type": "R",
      "part": "HEATER-220V-1kW",
      "x": 280,
      "y": 120,
      "val": 48.4
    },
    {
      "id": "r1",
      "type": "R",
      "part": "R1-10k",
      "x": 250,
      "y": 240,
      "val": 10000
    },
    {
      "id": "ntc",
      "type": "NTC",
      "part": "NTC-10K",
      "x": 360,
      "y": 310,
      "val": "10k"
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "BTA16-600B",
      "x": 490,
      "y": 240,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "15. تحكم حراري بقنطرة ومكثف 0.1uF (Full-Bridge Heater)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-120V-60Hz",
      "x": 120,
      "y": 240,
      "dc": 0,
      "amp": 170,
      "freq": 60,
      "wave": "sine"
    },
    {
      "id": "heater",
      "type": "R",
      "part": "HEATER-100W",
      "x": 280,
      "y": 120,
      "val": 144
    },
    {
      "id": "r1",
      "type": "R",
      "part": "R1-510k",
      "x": 250,
      "y": 240,
      "val": 510000
    },
    {
      "id": "c1",
      "type": "C",
      "part": "C1-0.1uF",
      "x": 360,
      "y": 310,
      "val": 1e-07
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "2N6509",
      "x": 490,
      "y": 240,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "16. شاحن بطاريات أوتوماتيكي (SCR + Zener Charger)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 120,
      "y": 240,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "BAT-LOAD-12V",
      "x": 280,
      "y": 120,
      "val": 15
    },
    {
      "id": "r1",
      "type": "R",
      "part": "R1-1k",
      "x": 250,
      "y": 240,
      "val": 1000
    },
    {
      "id": "z1",
      "type": "Z",
      "part": "1N4742A-12V",
      "x": 360,
      "y": 310,
      "val": 12.0
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "TYN612-CHG",
      "x": 490,
      "y": 240,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "17. إنذار المطر البسيط (Simple Rain Alarm Circuit)": [
    {
      "id": "v1",
      "type": "V",
      "part": "DC-9V",
      "x": 120,
      "y": 240,
      "dc": 9,
      "amp": 0,
      "freq": 0,
      "wave": "sine"
    },
    {
      "id": "buzz",
      "type": "R",
      "part": "BUZZER-9V",
      "x": 280,
      "y": 120,
      "val": 120
    },
    {
      "id": "rain_pad",
      "type": "R",
      "part": "RAIN-SENSOR-2k",
      "x": 250,
      "y": 240,
      "val": 2000
    },
    {
      "id": "rg",
      "type": "R",
      "part": "RG-1k",
      "x": 360,
      "y": 240,
      "val": 1000
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "2N5060",
      "x": 490,
      "y": 240,
      "vgt": 0.6
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "18. إنذار الإمالة والانقلاب (Tilt & Tip-Over Alarm)": [
    {
      "id": "v1",
      "type": "V",
      "part": "DC-12V",
      "x": 120,
      "y": 240,
      "dc": 12,
      "amp": 0,
      "freq": 0,
      "wave": "sine"
    },
    {
      "id": "siren",
      "type": "R",
      "part": "SIREN-12V",
      "x": 280,
      "y": 120,
      "val": 24
    },
    {
      "id": "r1",
      "type": "R",
      "part": "R1-4.7k",
      "x": 250,
      "y": 240,
      "val": 4700
    },
    {
      "id": "tilt",
      "type": "SW",
      "part": "TILT-SWITCH",
      "x": 360,
      "y": 240,
      "closed": true
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "NTE5452",
      "x": 490,
      "y": 240,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "19. إنذار قطع سلك الأرضي (Ground-Break Anti-Theft Alarm)": [
    {
      "id": "v1",
      "type": "V",
      "part": "DC-12V",
      "x": 120,
      "y": 240,
      "dc": 12,
      "amp": 0,
      "freq": 0,
      "wave": "sine"
    },
    {
      "id": "buzz",
      "type": "R",
      "part": "BUZZER-12V",
      "x": 280,
      "y": 120,
      "val": 120
    },
    {
      "id": "r1",
      "type": "R",
      "part": "R1-1k",
      "x": 250,
      "y": 240,
      "val": 1000
    },
    {
      "id": "q1",
      "type": "Q",
      "part": "BC547-NPN",
      "x": 490,
      "y": 240,
      "pol": "NPN",
      "bf": 200
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "20. إنذار الخزينة بالضوء (Light-Activated LDR Alarm)": [
    {
      "id": "v1",
      "type": "V",
      "part": "DC-12V",
      "x": 120,
      "y": 240,
      "dc": 12,
      "amp": 0,
      "freq": 0,
      "wave": "sine"
    },
    {
      "id": "buzz",
      "type": "R",
      "part": "BUZZER-12V",
      "x": 280,
      "y": 120,
      "val": 120
    },
    {
      "id": "ldr",
      "type": "LDR",
      "part": "LDR-LIGHT-1k",
      "x": 250,
      "y": 240,
      "val": "1k"
    },
    {
      "id": "r2",
      "type": "POT",
      "part": "POT-SENS-10k",
      "x": 360,
      "y": 310,
      "val": "10k",
      "pct": 50
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "NTE5452",
      "x": 490,
      "y": 240,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "21. قدح بمكثف لتخطي 90 درجة (RC Phase Delay > 90°)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 120,
      "y": 240,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "HEATER-100R",
      "x": 280,
      "y": 120,
      "val": 100
    },
    {
      "id": "r1",
      "type": "R",
      "part": "R1-2.2k",
      "x": 250,
      "y": 240,
      "val": 2200
    },
    {
      "id": "r2",
      "type": "POT",
      "part": "POT-R2-100k",
      "x": 360,
      "y": 240,
      "val": "100k",
      "pct": 65
    },
    {
      "id": "c1",
      "type": "C",
      "part": "C1-100nF",
      "x": 360,
      "y": 320,
      "val": 1e-07
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "TYN612",
      "x": 490,
      "y": 240,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "22. قدح بمكثف ومقاومة بوابة (Extended Capacitor Firing)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 120,
      "y": 240,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-60R",
      "x": 280,
      "y": 120,
      "val": 60
    },
    {
      "id": "r2",
      "type": "POT",
      "part": "POT-R2-100k",
      "x": 240,
      "y": 240,
      "val": "100k",
      "pct": 55
    },
    {
      "id": "c1",
      "type": "C",
      "part": "C1-100nF",
      "x": 320,
      "y": 320,
      "val": 1e-07
    },
    {
      "id": "rg",
      "type": "R",
      "part": "RG-10k",
      "x": 390,
      "y": 240,
      "val": 10000
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "TYN612",
      "x": 490,
      "y": 240,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "23. قدح بشبكة Double RC (C1=68nF, C2=33nF, R1=27k, R2=250k)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 120,
      "y": 240,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-50R",
      "x": 280,
      "y": 120,
      "val": 50
    },
    {
      "id": "r1",
      "type": "R",
      "part": "R1-27k",
      "x": 220,
      "y": 240,
      "val": 27000
    },
    {
      "id": "r2",
      "type": "POT",
      "part": "POT-R2-250k",
      "x": 300,
      "y": 240,
      "val": "250k",
      "pct": 40
    },
    {
      "id": "c1",
      "type": "C",
      "part": "C1-68nF",
      "x": 300,
      "y": 320,
      "val": 6.8e-08
    },
    {
      "id": "r3",
      "type": "R",
      "part": "R3-150k",
      "x": 380,
      "y": 240,
      "val": 150000
    },
    {
      "id": "c2",
      "type": "C",
      "part": "C2-33nF",
      "x": 380,
      "y": 320,
      "val": 3.3e-08
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "TYN612",
      "x": 490,
      "y": 240,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "24. قدح نبضي بترانزستور UJT (2N2646 Pulse Triggering)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 120,
      "y": 240,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-40R",
      "x": 280,
      "y": 120,
      "val": 40
    },
    {
      "id": "re",
      "type": "POT",
      "part": "POT-RE-22k",
      "x": 250,
      "y": 240,
      "val": "22k",
      "pct": 45
    },
    {
      "id": "ce",
      "type": "C",
      "part": "CE-100nF",
      "x": 350,
      "y": 320,
      "val": 1e-07
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "TYN612",
      "x": 490,
      "y": 240,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "25. قدح نبضي بمفتاح SBS (MBS4991 Temp-Independent)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 120,
      "y": 240,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-50R",
      "x": 280,
      "y": 120,
      "val": 50
    },
    {
      "id": "r1",
      "type": "POT",
      "part": "POT-47k",
      "x": 240,
      "y": 240,
      "val": "47k",
      "pct": 50
    },
    {
      "id": "c1",
      "type": "C",
      "part": "C1-100nF",
      "x": 310,
      "y": 320,
      "val": 1e-07
    },
    {
      "id": "sbs1",
      "type": "DIAC",
      "part": "MBS4991-SBS",
      "x": 390,
      "y": 240,
      "val": 8.0
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "TYN612",
      "x": 490,
      "y": 240,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "26. تحكم موجة كاملة أحادي الاتجاه + Trigger مشترك": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 120,
      "y": 240,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-25R",
      "x": 280,
      "y": 120,
      "val": 25
    },
    {
      "id": "trig",
      "type": "GATE_FIRING",
      "part": "COMMON-TRIGGER-45deg",
      "x": 320,
      "y": 240,
      "alpha": 45,
      "freq": 50
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "TYN612",
      "x": 490,
      "y": 240,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "27. تحكم سرعة محرك DC بموجة كاملة (DC Motor Speed Control)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 120,
      "y": 240,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "motor",
      "type": "MOTOR",
      "part": "MOTOR-DC-24V",
      "x": 280,
      "y": 120,
      "load": 0
    },
    {
      "id": "trig",
      "type": "GATE_FIRING",
      "part": "SPEED-TRIGGER-60deg",
      "x": 320,
      "y": 240,
      "alpha": 60,
      "freq": 50
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "TYN612",
      "x": 490,
      "y": 240,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "28. تحكم موجة كاملة ثنائي الاتجاه + Trigger (2 SCR Anti-Parallel)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 120,
      "y": 240,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "UNIVERSAL-MOTOR",
      "x": 280,
      "y": 120,
      "val": 35
    },
    {
      "id": "trig1",
      "type": "GATE_FIRING",
      "part": "DUAL-TRIGGER-120deg",
      "x": 320,
      "y": 240,
      "alpha": 120,
      "freq": 50
    },
    {
      "id": "scr1",
      "type": "TRIAC",
      "part": "DUAL-SCR-EQUIV",
      "x": 490,
      "y": 240,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "29. البديل بترياك واحد + Trigger (Single TRIAC Dimmer)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 120,
      "y": 240,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "UNIVERSAL-MOTOR",
      "x": 280,
      "y": 120,
      "val": 35
    },
    {
      "id": "r1",
      "type": "POT",
      "part": "POT-DIMMER-100k",
      "x": 240,
      "y": 240,
      "val": "100k",
      "pct": 50
    },
    {
      "id": "c1",
      "type": "C",
      "part": "C1-100nF",
      "x": 310,
      "y": 320,
      "val": 1e-07
    },
    {
      "id": "diac",
      "type": "DIAC",
      "part": "DB3-DIAC",
      "x": 390,
      "y": 240,
      "val": 32
    },
    {
      "id": "triac",
      "type": "TRIAC",
      "part": "BTA16-600B",
      "x": 490,
      "y": 240,
      "vgt": 0.8
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "30. قنطرة توحيد مع SCR واحد + Trigger (AC Load Control)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 120,
      "y": 240,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "AC-LOAD-50R",
      "x": 280,
      "y": 120,
      "val": 50
    },
    {
      "id": "rtrig",
      "type": "POT",
      "part": "POT-TRIGGER-47k",
      "x": 260,
      "y": 240,
      "val": "47k",
      "pct": 50
    },
    {
      "id": "ctrig",
      "type": "C",
      "part": "CTRIG-100nF",
      "x": 360,
      "y": 320,
      "val": 1e-07
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "TYN612",
      "x": 490,
      "y": 240,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "31. قنطرة توحيد مع SCR داخل مسار DC (Unidirectional Load)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 120,
      "y": 240,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "DC-LOAD-50R",
      "x": 280,
      "y": 120,
      "val": 50
    },
    {
      "id": "trig",
      "type": "GATE_FIRING",
      "part": "DC-SIDE-TRIGGER",
      "x": 320,
      "y": 240,
      "alpha": 60,
      "freq": 50
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "TYN612",
      "x": 490,
      "y": 240,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "32. إطفاء قسري DC بقصر الترانزستور (Transistor Shunt Turn-Off)": [
    {
      "id": "v1",
      "type": "V",
      "part": "DC-48V",
      "x": 120,
      "y": 240,
      "dc": 48,
      "amp": 0,
      "freq": 0,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-12R",
      "x": 280,
      "y": 120,
      "val": 12
    },
    {
      "id": "p_on",
      "type": "V",
      "part": "PULSE-ON-SCR",
      "x": 280,
      "y": 240,
      "dc": 0,
      "amp": 5,
      "freq": 125,
      "wave": "square"
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "2N6509",
      "x": 490,
      "y": 240,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "33. إطفاء قسري DC بالمكثف العكسي (Reverse-Bias Capacitor)": [
    {
      "id": "v1",
      "type": "V",
      "part": "DC-48V",
      "x": 120,
      "y": 240,
      "dc": 48,
      "amp": 0,
      "freq": 0,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-12R",
      "x": 280,
      "y": 120,
      "val": 12
    },
    {
      "id": "c_rev",
      "type": "C",
      "part": "C-COMM-22uF",
      "x": 320,
      "y": 320,
      "val": 2.2e-05
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "2N6509",
      "x": 490,
      "y": 240,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ],
  "34. قاطع تيار مستمر صناعي (DC Circuit Breaker SCR1 & SCR2)": [
    {
      "id": "v1",
      "type": "V",
      "part": "DC-48V",
      "x": 120,
      "y": 240,
      "dc": 48,
      "amp": 0,
      "freq": 0,
      "wave": "sine"
    },
    {
      "id": "motor",
      "type": "MOTOR",
      "part": "MOTOR-DC-48V",
      "x": 280,
      "y": 120,
      "load": 0
    },
    {
      "id": "c_comm",
      "type": "C",
      "part": "C-COMM-10uF",
      "x": 320,
      "y": 320,
      "val": 1e-05
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "SCR1-MAIN",
      "x": 490,
      "y": 240,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 400
    }
  ]
};
function launchExactDemoCircuit(key) {
  if (!window.EXTRA_LECTURE_PRESETS || !window.EXTRA_LECTURE_PRESETS[key]) return;
  const rawList = JSON.parse(JSON.stringify(window.EXTRA_LECTURE_PRESETS[key]));

  // تصفير اللوحة بنفس أسلوب loadDemo(name) الأصلي
  if (typeof components !== 'undefined') components.length = 0;
  if (typeof wires !== 'undefined') wires.length = 0;
  if (typeof probes !== 'undefined') probes.length = 0;
  if (typeof deselectAll === 'function') deselectAll();
  if (typeof tStopVal !== 'undefined') tStopVal = 0.04;

  const builtComps = [];
  const builtWires = [];
  const builtProbes = [];

  let gnd = rawList.find(c => c.type === 'GND') || { type: 'GND', part: 'GND' };
  const src = rawList.find(c => c.type === 'V' || c.type === 'VCC');
  const load = rawList.find(c => ['rload', 'heater', 'siren', 'buzz'].includes(c.id) || c.type === 'MOTOR');
  const mainSw = rawList.find(c => ['SCR', 'TRIAC', 'Q', 'M'].includes(c.type));
  const ctrlChain = rawList.filter(c => c !== gnd && c !== src && c !== load && c !== mainSw);

  let idCounter = 1;
  let srcId = null, loadId = null, swId = null, gndId = null;

  if (src) {
    srcId = idCounter++;
    builtComps.push({
      id: srcId, type: src.type, part: src.part || 'AC-220V',
      x: 70, y: 170, rot: 0,
      dc: src.dc || 0, amp: src.amp || 0, freq: src.freq || 0, wave: src.wave || 'sine'
    });
  }

  if (load) {
    loadId = idCounter++;
    builtComps.push({
      id: loadId, type: load.type, part: load.part || 'LOAD',
      x: 190, y: 100, rot: 0,
      val: load.val || 50, load: load.load || 0
    });
  }

  if (mainSw) {
    swId = idCounter++;
    const visualType = (mainSw.type === 'SCR') ? 'TRIAC' : mainSw.type;
    builtComps.push({
      id: swId, type: visualType, part: mainSw.part || 'BT151-500R',
      x: 310, y: 170, rot: 0,
      vgt: mainSw.vgt || 0.65, bf: mainSw.bf || 150, pol: mainSw.pol || 'NPN'
    });
  }

  const ctrlIds = [];
  ctrlChain.forEach((c, idx) => {
    const cid = idCounter++;
    const isShunt = ['C', 'CELEC', 'Z', 'NTC'].includes(c.type);
    const visualT = (c.type === 'UJT') ? 'Q' : c.type;
    builtComps.push({
      id: cid, type: visualT, part: c.part || c.type,
      x: 165 + (idx % 2) * 75,
      y: isShunt ? 245 : 170,
      rot: isShunt ? 90 : 0,
      val: c.val || 1000,
      pct: c.pct || 50,
      closed: c.closed !== undefined ? c.closed : true,
      alpha: c.alpha || 60,
      freq: c.freq || 50
    });
    ctrlIds.push({ id: cid, isShunt: isShunt });
  });

  gndId = idCounter++;
  builtComps.push({ id: gndId, type: 'GND', part: 'GND', x: 70, y: 290, rot: 0 });

  function addWire(c1, p1, c2, p2) {
    builtWires.push({ from: { compId: c1, pinIdx: p1 }, to: { compId: c2, pinIdx: p2 } });
  }

  // توصيل المسار الرئيسي بالصيغة الحرفية للمحاكي: { from: { compId, pinIdx }, to: { compId, pinIdx } }
  if (srcId && loadId) {
    addWire(srcId, 0, loadId, 0);
    addWire(srcId, 1, gndId, 0);
    if (swId) {
      addWire(loadId, 1, swId, 2);
      addWire(swId, 1, gndId, 0);
    } else {
      addWire(loadId, 1, gndId, 0);
    }
  } else if (srcId && swId) {
    addWire(srcId, 0, swId, 2);
    addWire(srcId, 1, gndId, 0);
    addWire(swId, 1, gndId, 0);
  }

  // توصيل دائرة القدح المتسلسلة والتوازي إلى البوابة (pinIdx: 0)
  let feedComp = loadId || srcId;
  let feedPin = loadId ? 1 : 0;
  ctrlIds.forEach(item => {
    if (item.isShunt) {
      if (feedComp) addWire(feedComp, feedPin, item.id, 0);
      addWire(item.id, 1, gndId, 0);
    } else {
      if (feedComp) addWire(feedComp, feedPin, item.id, 0);
      feedComp = item.id;
      feedPin = 1;
    }
  });
  if (feedComp && feedComp !== srcId && swId) {
    addWire(feedComp, feedPin, swId, 0);
  }

  // إضافة مجسات الأوسليسكوب CH1 و CH2 بالصيغة الحقيقية
  if (loadId) {
    builtProbes.push({ id: idCounter++, compId: loadId, pinIdx: 1, label: 'CH1 (Load)', color: '#38bdf8' });
  }
  if (swId) {
    builtProbes.push({ id: idCounter++, compId: swId, pinIdx: 0, label: 'CH2 (Gate)', color: '#facc15' });
  } else if (srcId) {
    builtProbes.push({ id: idCounter++, compId: srcId, pinIdx: 0, label: 'CH2 (Source)', color: '#facc15' });
  }

  if (typeof components !== 'undefined') builtComps.forEach(c => components.push(c));
  if (typeof wires !== 'undefined') builtWires.forEach(w => wires.push(w));
  if (typeof probes !== 'undefined') builtProbes.forEach(p => probes.push(p));
  if (typeof nextId !== 'undefined') nextId = idCounter + 1;

if (typeof resetView === 'function') resetView();
  if (typeof centerView === 'function') centerView();
  if (typeof panX !== 'undefined') panX = 0;
  if (typeof panY !== 'undefined') panY = 0;
  if (typeof zoom !== 'undefined') zoom = 1.0;
  if (typeof draw === 'function') draw();
  if (typeof render === 'function') render();
}

function attachLectureCircuitsToLoadDemo() {
  const sel = document.querySelector('select[onchange*="loadDemo"]');
  if (!sel || !window.EXTRA_LECTURE_PRESETS) return;
  if (sel.dataset.demo34Bound === '1') return;

  const existing = Array.from(sel.options).map(o => `<option value="${o.value}">${o.text}</option>`).join('');
  let extra = '<optgroup label="⚡ دوائر محاضرة SCR وإلكترونيات القوى (34 دائرة)">';
  for (const k of Object.keys(window.EXTRA_LECTURE_PRESETS)) {
    extra += `<option value="${k.replace(/"/g, '&quot;')}">${k}</option>`;
  }
  extra += '</optgroup>';
  sel.innerHTML = existing + extra;
  sel.dataset.demo34Bound = '1';

  // اعتراض حدث الاختيار لتشغيل الدائرة فوراً ورسمها على البوردة
  sel.addEventListener('change', function(e) {
    const val = this.value;
    if (window.EXTRA_LECTURE_PRESETS && window.EXTRA_LECTURE_PRESETS[val]) {
      e.stopImmediatePropagation();
      launchExactDemoCircuit(val);
    }
  }, true);
}

window.addEventListener('DOMContentLoaded', attachLectureCircuitsToLoadDemo);
setInterval(attachLectureCircuitsToLoadDemo, 300);
