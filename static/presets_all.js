// Standalone ProSim Power Electronics & Proteus Presets Bundle
window.EXTRA_LECTURE_PRESETS = {
  "01. محول متغير (Variac Tap-Change Control)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 120,
      "y": 220,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "trf1",
      "type": "TRF",
      "part": "VARIAC-0-250V",
      "x": 260,
      "y": 220,
      "val": 0.45
    },
    {
      "id": "rload",
      "type": "R",
      "part": "LOAD-50R",
      "x": 420,
      "y": 220,
      "val": 50
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 260,
      "y": 350
    }
  ],
  "02. مقاومة متغيرة على التوالي (Series Rheostat Control)": [
    {
      "id": "v1",
      "type": "V",
      "part": "DC-24V",
      "x": 120,
      "y": 220,
      "dc": 24,
      "amp": 0,
      "freq": 0,
      "wave": "sine"
    },
    {
      "id": "rheo",
      "type": "POT",
      "part": "RHEOSTAT-100R",
      "x": 260,
      "y": 140,
      "val": "100",
      "pct": 50
    },
    {
      "id": "rload",
      "type": "R",
      "part": "LOAD-50R",
      "x": 420,
      "y": 220,
      "val": 50
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 260,
      "y": 350
    }
  ],
  "03. الدائرة الأساسية للـ SCR كمفتاح (Basic SCR Switch)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 120,
      "y": 220,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "trig",
      "type": "GATE_FIRING",
      "part": "GATE-PULSE-60deg",
      "x": 240,
      "y": 280,
      "alpha": 60,
      "freq": 50
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "BT151-500R",
      "x": 340,
      "y": 220,
      "vgt": 0.65
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-50R",
      "x": 460,
      "y": 220,
      "val": 50
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 360
    }
  ],
  "04. مقارنة: مقوم دايود نصف موجة (Half-Wave Diode)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 120,
      "y": 220,
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
      "y": 180
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-50R",
      "x": 440,
      "y": 220,
      "val": 50
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 280,
      "y": 350
    }
  ],
  "05. تحكم SCR في نصف الموجة (Half-Wave Phase Control)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 120,
      "y": 220,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "trig",
      "type": "GATE_FIRING",
      "part": "ALPHA-70deg",
      "x": 240,
      "y": 280,
      "alpha": 70,
      "freq": 50
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "2N3669",
      "x": 340,
      "y": 220,
      "vgt": 0.65
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-50R",
      "x": 460,
      "y": 220,
      "val": 50
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 360
    }
  ],
  "06. اختبار جهد قدح البوابة (2N3669: 3.6V, 150R)": [
    {
      "id": "vg",
      "type": "V",
      "part": "VG-3.6V",
      "x": 120,
      "y": 240,
      "dc": 3.6,
      "amp": 0,
      "freq": 0,
      "wave": "sine"
    },
    {
      "id": "rg",
      "type": "R",
      "part": "RG-150R",
      "x": 240,
      "y": 240,
      "val": 150
    },
    {
      "id": "va",
      "type": "V",
      "part": "VDC-48V",
      "x": 460,
      "y": 120,
      "dc": 48,
      "amp": 0,
      "freq": 0,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-20R",
      "x": 380,
      "y": 120,
      "val": 20
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "2N3669",
      "x": 380,
      "y": 240,
      "vgt": 0.6
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 350
    }
  ],
  "07. الدائرة المكافئة بترانزستورين (PNP + NPN Latch)": [
    {
      "id": "v1",
      "type": "V",
      "part": "DC-12V",
      "x": 110,
      "y": 220,
      "dc": 12,
      "amp": 0,
      "freq": 0,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-100R",
      "x": 220,
      "y": 110,
      "val": 100
    },
    {
      "id": "q_pnp",
      "type": "Q",
      "part": "BC557-PNP",
      "x": 330,
      "y": 160,
      "pol": "PNP",
      "bf": 150
    },
    {
      "id": "q_npn",
      "type": "Q",
      "part": "BC547-NPN",
      "x": 330,
      "y": 260,
      "pol": "NPN",
      "bf": 150
    },
    {
      "id": "sw_g",
      "type": "PUSH_BTN",
      "part": "GATE-PULSE-BTN",
      "x": 210,
      "y": 280,
      "closed": true
    },
    {
      "id": "rg",
      "type": "R",
      "part": "RG-1k",
      "x": 150,
      "y": 280,
      "val": 1000
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 260,
      "y": 360
    }
  ],
  "08. قدح مقاومة بسيطة (Resistive Gate Control 0°-90°)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-115V-60Hz",
      "x": 120,
      "y": 220,
      "dc": 0,
      "amp": 162,
      "freq": 60,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-40R",
      "x": 240,
      "y": 120,
      "val": 40
    },
    {
      "id": "r1",
      "type": "R",
      "part": "R1-3k",
      "x": 350,
      "y": 160,
      "val": 3000
    },
    {
      "id": "r2",
      "type": "POT",
      "part": "POT-R2-10k",
      "x": 350,
      "y": 230,
      "val": "10k",
      "pct": 78
    },
    {
      "id": "sw1",
      "type": "SW",
      "part": "SW-GATE",
      "x": 420,
      "y": 270,
      "closed": true
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "2N3669",
      "x": 490,
      "y": 220,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 360
    }
  ],
  "09. قدح مقاومة مع دايود حماية البوابة (Gate + D1)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 120,
      "y": 220,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "LAMP-100W",
      "x": 240,
      "y": 120,
      "val": 484
    },
    {
      "id": "r1",
      "type": "R",
      "part": "R1-4.7k",
      "x": 340,
      "y": 160,
      "val": 4700
    },
    {
      "id": "r2",
      "type": "POT",
      "part": "POT-R2-22k",
      "x": 340,
      "y": 230,
      "val": "22k",
      "pct": 50
    },
    {
      "id": "d1",
      "type": "D",
      "part": "1N4007-PROT",
      "x": 415,
      "y": 270
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "BT151-500R",
      "x": 495,
      "y": 220,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 360
    }
  ],
  "10. مسألة قدح عند 90° (115Vrms, R1=3k, R2=7.8k)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-115V-60Hz",
      "x": 120,
      "y": 220,
      "dc": 0,
      "amp": 162,
      "freq": 60,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-40R",
      "x": 240,
      "y": 120,
      "val": 40
    },
    {
      "id": "r1",
      "type": "R",
      "part": "R1-3k",
      "x": 350,
      "y": 160,
      "val": 3000
    },
    {
      "id": "r2",
      "type": "R",
      "part": "R2-7.8k",
      "x": 350,
      "y": 240,
      "val": 7800
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "2N3669",
      "x": 480,
      "y": 220,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 360
    }
  ],
  "11. تشغيل SCR مع مصدر مستمر (DC Latching Circuit)": [
    {
      "id": "v1",
      "type": "V",
      "part": "DC-24V",
      "x": 120,
      "y": 220,
      "dc": 24,
      "amp": 0,
      "freq": 0,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-50R",
      "x": 240,
      "y": 120,
      "val": 50
    },
    {
      "id": "r1",
      "type": "R",
      "part": "R1-1k",
      "x": 340,
      "y": 160,
      "val": 1000
    },
    {
      "id": "r2",
      "type": "POT",
      "part": "POT-R2-10k",
      "x": 340,
      "y": 230,
      "val": "10k",
      "pct": 30
    },
    {
      "id": "sw1",
      "type": "PUSH_BTN",
      "part": "SW-FIRE",
      "x": 410,
      "y": 270,
      "closed": true
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "BT151-500R",
      "x": 490,
      "y": 220,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 360
    }
  ],
  "12. دائرة إنذار السرقة والمصانع (Industrial Alarm SW1)": [
    {
      "id": "v1",
      "type": "V",
      "part": "DC-12V",
      "x": 120,
      "y": 220,
      "dc": 12,
      "amp": 0,
      "freq": 0,
      "wave": "sine"
    },
    {
      "id": "sw_door",
      "type": "SW",
      "part": "LIMIT-SW1",
      "x": 230,
      "y": 180,
      "closed": true
    },
    {
      "id": "r1",
      "type": "R",
      "part": "R1-1k",
      "x": 330,
      "y": 180,
      "val": 1000
    },
    {
      "id": "r2",
      "type": "R",
      "part": "R2-1k",
      "x": 330,
      "y": 280,
      "val": 1000
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "NTE5452",
      "x": 450,
      "y": 220,
      "vgt": 0.65
    },
    {
      "id": "siren",
      "type": "R",
      "part": "SIREN-12V-ALARM",
      "x": 450,
      "y": 120,
      "val": 24
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 360
    }
  ],
  "13. إنذار حريق متعدد الحساسات (Fire Alarm + START/STOP)": [
    {
      "id": "v1",
      "type": "V",
      "part": "DC-12V",
      "x": 110,
      "y": 220,
      "dc": 12,
      "amp": 0,
      "freq": 0,
      "wave": "sine"
    },
    {
      "id": "s2_nc",
      "type": "SW",
      "part": "S2-NC-STOP",
      "x": 200,
      "y": 120,
      "closed": true
    },
    {
      "id": "t1",
      "type": "SW",
      "part": "THERMOSTAT-T1",
      "x": 270,
      "y": 180,
      "closed": true
    },
    {
      "id": "r1",
      "type": "R",
      "part": "R1-1k",
      "x": 350,
      "y": 180,
      "val": 1000
    },
    {
      "id": "r2",
      "type": "R",
      "part": "R2-1k",
      "x": 350,
      "y": 280,
      "val": 1000
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "NTE5452",
      "x": 460,
      "y": 220,
      "vgt": 0.65
    },
    {
      "id": "siren",
      "type": "R",
      "part": "SIREN-12V",
      "x": 460,
      "y": 120,
      "val": 24
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 360
    }
  ],
  "14. تحكم حراري في سخان بـ NTC ودايود تمرير (Heater Control)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 110,
      "y": 220,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "heater",
      "type": "R",
      "part": "HEATER-220V-1kW",
      "x": 220,
      "y": 120,
      "val": 48.4
    },
    {
      "id": "d2",
      "type": "D",
      "part": "1N4007-FREEWHEEL",
      "x": 220,
      "y": 220
    },
    {
      "id": "d1",
      "type": "D",
      "part": "1N4007-RECT",
      "x": 310,
      "y": 160
    },
    {
      "id": "c1",
      "type": "C",
      "part": "C1-10uF",
      "x": 310,
      "y": 260,
      "val": 1e-05
    },
    {
      "id": "r1",
      "type": "R",
      "part": "R1-10k",
      "x": 390,
      "y": 160,
      "val": 10000
    },
    {
      "id": "ntc",
      "type": "NTC",
      "part": "NTC-10K",
      "x": 390,
      "y": 260,
      "val": "10k"
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "BTA16-600B",
      "x": 500,
      "y": 220,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 310,
      "y": 360
    }
  ],
  "15. تحكم حراري بقنطرة ومكثف 0.1uF (Full-Bridge Heater)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-120V-60Hz",
      "x": 110,
      "y": 220,
      "dc": 0,
      "amp": 170,
      "freq": 60,
      "wave": "sine"
    },
    {
      "id": "heater",
      "type": "R",
      "part": "HEATER-100W",
      "x": 210,
      "y": 120,
      "val": 144
    },
    {
      "id": "br1",
      "type": "BRIDGE",
      "part": "KBP206-BRIDGE",
      "x": 310,
      "y": 220
    },
    {
      "id": "r1",
      "type": "R",
      "part": "R1-510k",
      "x": 410,
      "y": 150,
      "val": 510000
    },
    {
      "id": "c1",
      "type": "C",
      "part": "C1-0.1uF",
      "x": 410,
      "y": 280,
      "val": 1e-07
    },
    {
      "id": "therm",
      "type": "SW",
      "part": "THERMOSTAT-NC",
      "x": 470,
      "y": 280,
      "closed": false
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "2N6509",
      "x": 540,
      "y": 220,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 310,
      "y": 370
    }
  ],
  "16. شاحن بطاريات أوتوماتيكي (SCR + Zener Charger)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 110,
      "y": 220,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "trf1",
      "type": "TRF",
      "part": "TRAN-220V-18V",
      "x": 200,
      "y": 220,
      "val": 0.082
    },
    {
      "id": "br1",
      "type": "BRIDGE",
      "part": "KBP206-BRIDGE",
      "x": 290,
      "y": 220
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "TYN612-CHG",
      "x": 390,
      "y": 150,
      "vgt": 0.65
    },
    {
      "id": "z1",
      "type": "Z",
      "part": "1N4742A-12V",
      "x": 450,
      "y": 240,
      "val": 12.0
    },
    {
      "id": "bat",
      "type": "V",
      "part": "BATTERY-12V",
      "x": 530,
      "y": 220,
      "dc": 11.5,
      "amp": 0,
      "freq": 0,
      "wave": "sine"
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 320,
      "y": 360
    }
  ],
  "17. إنذار المطر البسيط (Simple Rain Alarm Circuit)": [
    {
      "id": "v1",
      "type": "V",
      "part": "DC-9V",
      "x": 120,
      "y": 220,
      "dc": 9,
      "amp": 0,
      "freq": 0,
      "wave": "sine"
    },
    {
      "id": "rain_pad",
      "type": "R",
      "part": "RAIN-WATER-SENSOR",
      "x": 240,
      "y": 180,
      "val": 2000
    },
    {
      "id": "rg",
      "type": "R",
      "part": "RG-1k",
      "x": 340,
      "y": 220,
      "val": 1000
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "2N5060",
      "x": 450,
      "y": 220,
      "vgt": 0.6
    },
    {
      "id": "buzz",
      "type": "R",
      "part": "BUZZER-9V",
      "x": 450,
      "y": 120,
      "val": 120
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 350
    }
  ],
  "18. إنذار الإمالة والانقلاب (Tilt & Tip-Over Alarm)": [
    {
      "id": "v1",
      "type": "V",
      "part": "DC-12V",
      "x": 120,
      "y": 220,
      "dc": 12,
      "amp": 0,
      "freq": 0,
      "wave": "sine"
    },
    {
      "id": "r1",
      "type": "R",
      "part": "R1-4.7k",
      "x": 240,
      "y": 160,
      "val": 4700
    },
    {
      "id": "tilt",
      "type": "SW",
      "part": "TILT-SWITCH-OPEN",
      "x": 240,
      "y": 270,
      "closed": false
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "NTE5452",
      "x": 390,
      "y": 220,
      "vgt": 0.65
    },
    {
      "id": "siren",
      "type": "R",
      "part": "SIREN-12V",
      "x": 390,
      "y": 120,
      "val": 24
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 280,
      "y": 360
    }
  ],
  "19. إنذار قطع سلك الأرضي (Ground-Break Anti-Theft Alarm)": [
    {
      "id": "v1",
      "type": "V",
      "part": "DC-12V",
      "x": 120,
      "y": 220,
      "dc": 12,
      "amp": 0,
      "freq": 0,
      "wave": "sine"
    },
    {
      "id": "r1",
      "type": "R",
      "part": "R1-1k",
      "x": 240,
      "y": 160,
      "val": 1000
    },
    {
      "id": "wire_gnd",
      "type": "SW",
      "part": "ANTI-THEFT-WIRE",
      "x": 240,
      "y": 280,
      "closed": false
    },
    {
      "id": "q1",
      "type": "Q",
      "part": "BC547-NPN",
      "x": 360,
      "y": 220,
      "pol": "NPN",
      "bf": 200
    },
    {
      "id": "buzz",
      "type": "R",
      "part": "BUZZER-12V",
      "x": 360,
      "y": 120,
      "val": 120
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 280,
      "y": 360
    }
  ],
  "20. إنذار الخزينة بالضوء (Light-Activated LDR Alarm)": [
    {
      "id": "v1",
      "type": "V",
      "part": "DC-12V",
      "x": 120,
      "y": 220,
      "dc": 12,
      "amp": 0,
      "freq": 0,
      "wave": "sine"
    },
    {
      "id": "ldr",
      "type": "LDR",
      "part": "LDR-LIGHT-EXPOSED",
      "x": 240,
      "y": 160,
      "val": "1k"
    },
    {
      "id": "r2",
      "type": "POT",
      "part": "POT-SENS-10k",
      "x": 240,
      "y": 270,
      "val": "10k",
      "pct": 50
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "NTE5452",
      "x": 390,
      "y": 220,
      "vgt": 0.65
    },
    {
      "id": "buzz",
      "type": "R",
      "part": "BUZZER-12V",
      "x": 390,
      "y": 120,
      "val": 120
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 280,
      "y": 360
    }
  ],
  "21. قدح بمكثف لتخطي 90 درجة (RC Phase Delay > 90°)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 120,
      "y": 220,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "HEATER-100R",
      "x": 240,
      "y": 120,
      "val": 100
    },
    {
      "id": "r1",
      "type": "R",
      "part": "R1-2.2k",
      "x": 340,
      "y": 150,
      "val": 2200
    },
    {
      "id": "r2",
      "type": "POT",
      "part": "POT-R2-100k",
      "x": 340,
      "y": 220,
      "val": "100k",
      "pct": 65
    },
    {
      "id": "c1",
      "type": "C",
      "part": "C1-100nF",
      "x": 340,
      "y": 300,
      "val": 1e-07
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "TYN612",
      "x": 490,
      "y": 220,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 370
    }
  ],
  "22. قدح بمكثف ومقاومة بوابة (Extended Capacitor Firing)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 110,
      "y": 220,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-60R",
      "x": 220,
      "y": 120,
      "val": 60
    },
    {
      "id": "r1",
      "type": "R",
      "part": "R1-4.7k",
      "x": 320,
      "y": 150,
      "val": 4700
    },
    {
      "id": "r2",
      "type": "POT",
      "part": "POT-R2-100k",
      "x": 320,
      "y": 220,
      "val": "100k",
      "pct": 55
    },
    {
      "id": "c1",
      "type": "C",
      "part": "C1-100nF",
      "x": 320,
      "y": 300,
      "val": 1e-07
    },
    {
      "id": "rg",
      "type": "R",
      "part": "RG-10k",
      "x": 410,
      "y": 220,
      "val": 10000
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "TYN612",
      "x": 510,
      "y": 220,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 310,
      "y": 370
    }
  ],
  "23. قدح بشبكة Double RC (C1=68nF, C2=33nF, R1=27k, R2=250k)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 110,
      "y": 220,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-50R",
      "x": 220,
      "y": 110,
      "val": 50
    },
    {
      "id": "r1",
      "type": "R",
      "part": "R1-27k",
      "x": 310,
      "y": 150,
      "val": 27000
    },
    {
      "id": "r2",
      "type": "POT",
      "part": "POT-R2-250k",
      "x": 310,
      "y": 220,
      "val": "250k",
      "pct": 40
    },
    {
      "id": "c1",
      "type": "C",
      "part": "C1-68nF",
      "x": 310,
      "y": 300,
      "val": 6.8e-08
    },
    {
      "id": "r3",
      "type": "R",
      "part": "R3-150k",
      "x": 400,
      "y": 220,
      "val": 150000
    },
    {
      "id": "c2",
      "type": "C",
      "part": "C2-33nF",
      "x": 400,
      "y": 300,
      "val": 3.3e-08
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "TYN612",
      "x": 510,
      "y": 220,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 310,
      "y": 380
    }
  ],
  "24. قدح نبضي بترانزستور UJT (2N2646 Pulse Triggering)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 110,
      "y": 220,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "br1",
      "type": "BRIDGE",
      "part": "KBP206-BRIDGE",
      "x": 210,
      "y": 220
    },
    {
      "id": "z1",
      "type": "Z",
      "part": "1N4744A-15V",
      "x": 290,
      "y": 260,
      "val": 15.0
    },
    {
      "id": "re",
      "type": "POT",
      "part": "POT-RE-22k",
      "x": 360,
      "y": 170,
      "val": "22k",
      "pct": 45
    },
    {
      "id": "ce",
      "type": "C",
      "part": "CE-100nF",
      "x": 360,
      "y": 280,
      "val": 1e-07
    },
    {
      "id": "ujt1",
      "type": "UJT",
      "part": "2N2646-UJT",
      "x": 440,
      "y": 220,
      "eta": 0.65
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "TYN612",
      "x": 540,
      "y": 220,
      "vgt": 0.65
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-40R",
      "x": 540,
      "y": 120,
      "val": 40
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 320,
      "y": 370
    }
  ],
  "25. قدح نبضي بمفتاح SBS (MBS4991 Temp-Independent)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 110,
      "y": 220,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-50R",
      "x": 220,
      "y": 120,
      "val": 50
    },
    {
      "id": "r1",
      "type": "POT",
      "part": "POT-47k",
      "x": 320,
      "y": 170,
      "val": "47k",
      "pct": 50
    },
    {
      "id": "c1",
      "type": "C",
      "part": "C1-100nF",
      "x": 320,
      "y": 280,
      "val": 1e-07
    },
    {
      "id": "sbs1",
      "type": "DIAC",
      "part": "MBS4991-SBS",
      "x": 410,
      "y": 220,
      "val": 8.0
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "TYN612",
      "x": 510,
      "y": 220,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 310,
      "y": 370
    }
  ],
  "26. تحكم موجة كاملة أحادي الاتجاه + Trigger مشترك": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 100,
      "y": 220,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "trf1",
      "type": "TRF",
      "part": "TRAN-CENTER-TAP",
      "x": 200,
      "y": 220,
      "val": 0.15
    },
    {
      "id": "trig",
      "type": "GATE_FIRING",
      "part": "COMMON-TRIGGER-45deg",
      "x": 320,
      "y": 220,
      "alpha": 45,
      "freq": 50
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "TYN612-TOP",
      "x": 420,
      "y": 140,
      "vgt": 0.65
    },
    {
      "id": "scr2",
      "type": "SCR",
      "part": "TYN612-BOT",
      "x": 420,
      "y": 300,
      "vgt": 0.65
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-25R",
      "x": 540,
      "y": 220,
      "val": 25
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 320,
      "y": 380
    }
  ],
  "27. تحكم سرعة محرك DC بموجة كاملة (DC Motor Speed Control)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 100,
      "y": 220,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "trf1",
      "type": "TRF",
      "part": "TRAN-CENTER-TAP",
      "x": 200,
      "y": 220,
      "val": 0.15
    },
    {
      "id": "trig",
      "type": "GATE_FIRING",
      "part": "SPEED-TRIGGER-60deg",
      "x": 320,
      "y": 220,
      "alpha": 60,
      "freq": 50
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "TYN612-TOP",
      "x": 420,
      "y": 140,
      "vgt": 0.65
    },
    {
      "id": "scr2",
      "type": "SCR",
      "part": "TYN612-BOT",
      "x": 420,
      "y": 300,
      "vgt": 0.65
    },
    {
      "id": "motor",
      "type": "MOTOR",
      "part": "MOTOR-DC-24V",
      "x": 540,
      "y": 220,
      "load": 0
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 320,
      "y": 380
    }
  ],
  "28. تحكم موجة كاملة ثنائي الاتجاه + Trigger (2 SCR Anti-Parallel)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 110,
      "y": 220,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "trig1",
      "type": "GATE_FIRING",
      "part": "ISOLATED-DUAL-TRIGGER",
      "x": 250,
      "y": 130,
      "alpha": 120,
      "freq": 50
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "TYN612-POS",
      "x": 360,
      "y": 180,
      "vgt": 0.65
    },
    {
      "id": "scr2",
      "type": "SCR",
      "part": "TYN612-NEG",
      "x": 360,
      "y": 270,
      "vgt": 0.65
    },
    {
      "id": "rload",
      "type": "R",
      "part": "UNIVERSAL-MOTOR",
      "x": 500,
      "y": 220,
      "val": 35
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 360
    }
  ],
  "29. البديل بترياك واحد + Trigger (Single TRIAC Dimmer)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 110,
      "y": 220,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "r1",
      "type": "POT",
      "part": "POT-DIMMER-100k",
      "x": 240,
      "y": 150,
      "val": "100k",
      "pct": 50
    },
    {
      "id": "c1",
      "type": "C",
      "part": "C1-100nF",
      "x": 240,
      "y": 280,
      "val": 1e-07
    },
    {
      "id": "diac",
      "type": "DIAC",
      "part": "DB3-DIAC",
      "x": 330,
      "y": 220,
      "val": 32
    },
    {
      "id": "triac",
      "type": "TRIAC",
      "part": "BTA16-600B",
      "x": 430,
      "y": 220,
      "vgt": 0.8
    },
    {
      "id": "rload",
      "type": "R",
      "part": "UNIVERSAL-MOTOR",
      "x": 540,
      "y": 220,
      "val": 35
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 320,
      "y": 360
    }
  ],
  "30. قنطرة توحيد مع SCR واحد + Trigger (AC Load Control)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 110,
      "y": 220,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "AC-LOAD-50R",
      "x": 220,
      "y": 120,
      "val": 50
    },
    {
      "id": "br1",
      "type": "BRIDGE",
      "part": "KBP206-BRIDGE",
      "x": 330,
      "y": 220
    },
    {
      "id": "rtrig",
      "type": "POT",
      "part": "POT-TRIGGER-47k",
      "x": 440,
      "y": 150,
      "val": "47k",
      "pct": 50
    },
    {
      "id": "ctrig",
      "type": "C",
      "part": "CTRIG-100nF",
      "x": 440,
      "y": 290,
      "val": 1e-07
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "TYN612",
      "x": 540,
      "y": 220,
      "vgt": 0.65
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 330,
      "y": 370
    }
  ],
  "31. قنطرة توحيد مع SCR داخل مسار DC (Unidirectional Load)": [
    {
      "id": "v1",
      "type": "V",
      "part": "AC-220V-50Hz",
      "x": 110,
      "y": 220,
      "dc": 0,
      "amp": 311,
      "freq": 50,
      "wave": "sine"
    },
    {
      "id": "br1",
      "type": "BRIDGE",
      "part": "KBP206-BRIDGE",
      "x": 230,
      "y": 220
    },
    {
      "id": "trig",
      "type": "GATE_FIRING",
      "part": "DC-SIDE-TRIGGER",
      "x": 340,
      "y": 280,
      "alpha": 60,
      "freq": 50
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "TYN612",
      "x": 420,
      "y": 180,
      "vgt": 0.65
    },
    {
      "id": "rload",
      "type": "R",
      "part": "DC-LOAD-50R",
      "x": 530,
      "y": 220,
      "val": 50
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 320,
      "y": 370
    }
  ],
  "32. إطفاء قسري DC بقصر الترانزستور (Transistor Shunt Turn-Off)": [
    {
      "id": "v1",
      "type": "V",
      "part": "DC-48V",
      "x": 120,
      "y": 220,
      "dc": 48,
      "amp": 0,
      "freq": 0,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-12R",
      "x": 240,
      "y": 120,
      "val": 12
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "2N6509",
      "x": 360,
      "y": 220,
      "vgt": 0.65
    },
    {
      "id": "q_off",
      "type": "Q",
      "part": "2N3055-SHUNT",
      "x": 470,
      "y": 220,
      "pol": "NPN",
      "bf": 80
    },
    {
      "id": "p_on",
      "type": "V",
      "part": "PULSE-ON-SCR",
      "x": 280,
      "y": 280,
      "dc": 0,
      "amp": 5,
      "freq": 125,
      "wave": "square"
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 320,
      "y": 360
    }
  ],
  "33. إطفاء قسري DC بالمكثف العكسي (Reverse-Bias Capacitor)": [
    {
      "id": "v1",
      "type": "V",
      "part": "DC-48V",
      "x": 110,
      "y": 220,
      "dc": 48,
      "amp": 0,
      "freq": 0,
      "wave": "sine"
    },
    {
      "id": "rload",
      "type": "R",
      "part": "RLOAD-12R",
      "x": 220,
      "y": 120,
      "val": 12
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "2N6509",
      "x": 320,
      "y": 220,
      "vgt": 0.65
    },
    {
      "id": "c_rev",
      "type": "C",
      "part": "C-COMM-22uF",
      "x": 410,
      "y": 150,
      "val": 2.2e-05
    },
    {
      "id": "r_chg",
      "type": "R",
      "part": "R-CHG-100R",
      "x": 490,
      "y": 120,
      "val": 100
    },
    {
      "id": "q_off",
      "type": "Q",
      "part": "2N3055-COMM",
      "x": 490,
      "y": 240,
      "pol": "NPN",
      "bf": 80
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 320,
      "y": 360
    }
  ],
  "34. قاطع تيار مستمر صناعي (DC Circuit Breaker SCR1 & SCR2)": [
    {
      "id": "v1",
      "type": "V",
      "part": "DC-48V",
      "x": 110,
      "y": 220,
      "dc": 48,
      "amp": 0,
      "freq": 0,
      "wave": "sine"
    },
    {
      "id": "scr1",
      "type": "SCR",
      "part": "SCR1-MAIN",
      "x": 240,
      "y": 150,
      "vgt": 0.65
    },
    {
      "id": "c_comm",
      "type": "C",
      "part": "C-COMM-10uF",
      "x": 340,
      "y": 150,
      "val": 1e-05
    },
    {
      "id": "scr2",
      "type": "SCR",
      "part": "SCR2-OFF",
      "x": 440,
      "y": 220,
      "vgt": 0.65
    },
    {
      "id": "r1",
      "type": "R",
      "part": "R1-CHARGE-100R",
      "x": 440,
      "y": 120,
      "val": 100
    },
    {
      "id": "motor",
      "type": "MOTOR",
      "part": "MOTOR-DC-48V",
      "x": 240,
      "y": 280,
      "load": 0
    },
    {
      "id": "gnd",
      "type": "GND",
      "part": "GND",
      "x": 300,
      "y": 370
    }
  ]
};

function makeWireAllFormats(id1, pin1, id2, pin2, compsArr) {
  const idx1 = compsArr.findIndex(c => c.id === id1);
  const idx2 = compsArr.findIndex(c => c.id === id2);
  return {
    from: idx1 >= 0 ? idx1 : 0,
    to: idx2 >= 0 ? idx2 : 0,
    fromPin: pin1,
    toPin: pin2,
    c1: id1, p1: pin1,
    c2: id2, p2: pin2,
    a: { id: id1, pin: pin1 },
    b: { id: id2, pin: pin2 }
  };
}

function buildAutoWiredCircuit(compList) {
  const rawComps = JSON.parse(JSON.stringify(compList));
  const comps = [];
  const wires = [];
  const probes = [];

  let gnd = rawComps.find(c => c.type === 'GND') || { id: 'gnd_main', type: 'GND', part: 'GND' };
  const src = rawComps.find(c => c.type === 'V' || c.type === 'VCC');
  const load = rawComps.find(c => ['rload', 'heater', 'siren', 'buzz'].includes(c.id) || c.type === 'MOTOR');
  const mainSw = rawComps.find(c => ['SCR', 'TRIAC', 'Q', 'M'].includes(c.type));
  const ctrlChain = rawComps.filter(c => c !== gnd && c !== src && c !== load && c !== mainSw);

  if (src) { src.x = 120; src.y = 240; comps.push(src); }
  if (load) { load.x = 280; load.y = 120; comps.push(load); }
  if (mainSw) {
    mainSw.x = 480; mainSw.y = 240;
    if (mainSw.type === 'SCR') mainSw.type = 'TRIAC';
    comps.push(mainSw);
  }

  ctrlChain.forEach((c, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    c.x = 250 + col * 110;
    c.y = 220 + row * 85;
    if (c.type === 'UJT') c.type = 'Q';
    comps.push(c);
  });

  gnd.x = 300; gnd.y = 400;
  comps.push(gnd);

  if (src && load) {
    wires.push(makeWireAllFormats(src.id, 0, load.id, 0, comps));
    wires.push(makeWireAllFormats(src.id, 1, gnd.id, 0, comps));
    if (mainSw) {
      wires.push(makeWireAllFormats(load.id, 1, mainSw.id, 2, comps));
      wires.push(makeWireAllFormats(mainSw.id, 1, gnd.id, 0, comps));
    } else {
      wires.push(makeWireAllFormats(load.id, 1, gnd.id, 0, comps));
    }
  } else if (src && mainSw) {
    wires.push(makeWireAllFormats(src.id, 0, mainSw.id, 2, comps));
    wires.push(makeWireAllFormats(src.id, 1, gnd.id, 0, comps));
    wires.push(makeWireAllFormats(mainSw.id, 1, gnd.id, 0, comps));
  }

  let gateFeed = load ? { id: load.id, pin: 1 } : (src ? { id: src.id, pin: 0 } : null);
  ctrlChain.forEach(c => {
    if (['C', 'CELEC', 'Z', 'NTC'].includes(c.type)) {
      if (gateFeed) wires.push(makeWireAllFormats(gateFeed.id, gateFeed.pin, c.id, 0, comps));
      wires.push(makeWireAllFormats(c.id, 1, gnd.id, 0, comps));
    } else {
      if (gateFeed) wires.push(makeWireAllFormats(gateFeed.id, gateFeed.pin, c.id, 0, comps));
      gateFeed = { id: c.id, pin: 1 };
    }
  });

  if (gateFeed && mainSw) {
    wires.push(makeWireAllFormats(gateFeed.id, gateFeed.pin, mainSw.id, 0, comps));
  }

  if (load) probes.push({ id: 'p_ch1', compId: load.id, pin: 1, target: { id: load.id, pin: 1 }, label: 'CH1 (Load)', name: 'CH1 (Load)', color: '#38bdf8' });
  if (mainSw) probes.push({ id: 'p_ch2', compId: mainSw.id, pin: 0, target: { id: mainSw.id, pin: 0 }, label: 'CH2 (Gate)', name: 'CH2 (Gate)', color: '#facc15' });
  else if (src) probes.push({ id: 'p_ch2', compId: src.id, pin: 0, target: { id: src.id, pin: 0 }, label: 'CH2 (Source)', name: 'CH2 (Source)', color: '#facc15' });

  return { components: comps, wires: wires, probes: probes };
}

function syncAllPresetsIntoMenu() {
  const selects = document.querySelectorAll('select');
  selects.forEach(sel => {
    if (sel.innerHTML.includes('محول + قنطرة') || sel.id === 'presetSelect' || (sel.getAttribute('onchange') && sel.getAttribute('onchange').includes('loadPreset'))) {
      if (sel.dataset.synced47 === '1') return;
      const existingOpts = Array.from(sel.options).map(o => `<option value="${o.value}">${o.text}</option>`).join('');
      let extraOpts = '<optgroup label="⚡ دوائر محاضرة SCR وإلكترونيات القوى (34 دائرة)">';
      for (const k of Object.keys(window.EXTRA_LECTURE_PRESETS)) {
        extraOpts += `<option value="${k.replace(/"/g, '&quot;')}">${k}</option>`;
      }
      extraOpts += '</optgroup>';
      sel.innerHTML = existingOpts + extraOpts;
      sel.dataset.synced47 = '1';

      sel.addEventListener('change', function(e) {
        const key = this.value;
        if (window.EXTRA_LECTURE_PRESETS && window.EXTRA_LECTURE_PRESETS[key]) {
          e.stopImmediatePropagation();
          const circuit = buildAutoWiredCircuit(window.EXTRA_LECTURE_PRESETS[key]);
          if (typeof components !== 'undefined') {
            components.length = 0;
            circuit.components.forEach(c => components.push(c));
          }
          if (typeof wires !== 'undefined') {
            wires.length = 0;
            circuit.wires.forEach(w => wires.push(w));
          }
          if (typeof probes !== 'undefined') {
            probes.length = 0;
            circuit.probes.forEach(p => probes.push(p));
          }
          if (typeof draw === 'function') draw();
          if (typeof render === 'function') render();
          if (typeof updateStatus === 'function') updateStatus('✅ تم تحميل: ' + key);
        }
      }, true);
    }
  });
}

window.addEventListener('DOMContentLoaded', syncAllPresetsIntoMenu);
setInterval(syncAllPresetsIntoMenu, 500);
