window.EXTRA_LECTURE_PRESETS = {
  "01. التمثيل بترانزستورين (Two-Transistor Analogy)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-16V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 24,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 30
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 20,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "R",
        "part": "Rg-1000",
        "x": 125,
        "y": 225,
        "rot": 0,
        "val": 1000
      },
      {
        "id": 6,
        "type": "D",
        "part": "1N4007",
        "x": 185,
        "y": 225,
        "rot": 0
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 6,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 6,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 7,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 8,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "02. منحنى خواص الثايرستور (SCR V-I Characteristics)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-70V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 100,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 45
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 25,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "GATE_FIRING",
        "part": "SYNC-45deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "alpha": 45,
        "freq": 50
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 6,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 7,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "03. الدائرة الأساسية للـ SCR (Basic SCR Circuit)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-35V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 50,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 35
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 20,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "R",
        "part": "Rg-1000",
        "x": 125,
        "y": 225,
        "rot": 0,
        "val": 1000
      },
      {
        "id": 6,
        "type": "D",
        "part": "1N4007",
        "x": 185,
        "y": 225,
        "rot": 0
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 6,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 6,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 7,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 8,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "04. مفتاح قدرة بالثايرستور (SCR Power Switch)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-106V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 150,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 25
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 30,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "R",
        "part": "Rg-1000",
        "x": 125,
        "y": 225,
        "rot": 0,
        "val": 1000
      },
      {
        "id": 6,
        "type": "D",
        "part": "1N4007",
        "x": 185,
        "y": 225,
        "rot": 0
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 6,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 6,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 7,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 8,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "05. تحكم SCR في نصف الموجة (Half-Wave Phase Control)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-219V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 311,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 60
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 50,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "GATE_FIRING",
        "part": "SYNC-60deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "alpha": 60,
        "freq": 50
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 6,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 7,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "06. تأثير زاوية الإشعال (Effect of Firing Angle α)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-219V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 311,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 90
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 50,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "GATE_FIRING",
        "part": "SYNC-90deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "alpha": 90,
        "freq": 50
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 6,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 7,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "07. حساب قدرة الحمل المتردد (AC Load Power Calculation)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-219V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 311,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 45
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 40,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "GATE_FIRING",
        "part": "SYNC-45deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "alpha": 45,
        "freq": 50
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 6,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 7,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "08. قدح مقاومة بسيطة (Simple Resistive Gate Trigger)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-120V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 170,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 40
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 35,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "R",
        "part": "Rg-1000",
        "x": 125,
        "y": 225,
        "rot": 0,
        "val": 1000
      },
      {
        "id": 6,
        "type": "D",
        "part": "1N4007",
        "x": 185,
        "y": 225,
        "rot": 0
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 6,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 6,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 7,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 8,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "09. قدح بمقاومة متغيرة (Variable Resistor Trigger)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-155V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 220,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 55
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 40,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "POT",
        "part": "R-Phase",
        "x": 120,
        "y": 220,
        "rot": 0,
        "val": 1000,
        "pct": 30
      },
      {
        "id": 6,
        "type": "C",
        "part": "470nF",
        "x": 160,
        "y": 265,
        "rot": 90,
        "val": "470n"
      },
      {
        "id": 7,
        "type": "GATE_FIRING",
        "part": "DIAC-DB3",
        "x": 200,
        "y": 220,
        "rot": 0,
        "alpha": 55,
        "freq": 50
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 6,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 6,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 7,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 7,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 8,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 9,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "10. قدح مع دايود عزل البوابة (Diode Gate Isolation)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-155V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 220,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 50
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 40,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "R",
        "part": "Rg-1000",
        "x": 125,
        "y": 225,
        "rot": 0,
        "val": 1000
      },
      {
        "id": 6,
        "type": "D",
        "part": "1N4007",
        "x": 185,
        "y": 225,
        "rot": 0
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 6,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 6,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 7,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 8,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "11. حدود القدح المقاومي 90 درجة (90° Limit of R-Trigger)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-155V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 220,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 85
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 45,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "R",
        "part": "Rg-1000",
        "x": 125,
        "y": 225,
        "rot": 0,
        "val": 1000
      },
      {
        "id": 6,
        "type": "D",
        "part": "1N4007",
        "x": 185,
        "y": 225,
        "rot": 0
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 6,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 6,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 7,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 8,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "12. إنذار ضد السرقة بالثايرستور (SCR Latching Burglar Alarm)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-16V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 24,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 20
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 12,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "GATE_FIRING",
        "part": "SYNC-20deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "alpha": 20,
        "freq": 50
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 6,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 7,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "13. إنذار فتح الأبواب المستمر (DC Latching Door Alarm)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-16V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 24,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 25
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 12,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "GATE_FIRING",
        "part": "SYNC-25deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "alpha": 25,
        "freq": 50
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 6,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 7,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "14. حماية من زيادة الجهد (Zener Over-Voltage Crowbar)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-33V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 48,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 40
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 16,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "GATE_FIRING",
        "part": "SYNC-40deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "alpha": 40,
        "freq": 50
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 6,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 7,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "15. التحكم في سخان حراري (SCR Heater Controller)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-219V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 311,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 50
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 30,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "GATE_FIRING",
        "part": "SYNC-50deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "alpha": 50,
        "freq": 50
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 6,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 7,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "16. منظم إضاءة نصف موجة (Half-Wave Lamp Dimmer)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-219V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 311,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 75
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 60,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "POT",
        "part": "R-Phase",
        "x": 120,
        "y": 220,
        "rot": 0,
        "val": 1000,
        "pct": 41
      },
      {
        "id": 6,
        "type": "C",
        "part": "470nF",
        "x": 160,
        "y": 265,
        "rot": 90,
        "val": "470n"
      },
      {
        "id": 7,
        "type": "GATE_FIRING",
        "part": "DIAC-DB3",
        "x": 200,
        "y": 220,
        "rot": 0,
        "alpha": 75,
        "freq": 50
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 6,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 6,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 7,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 7,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 8,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 9,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "17. شاحن بطارية أوتوماتيكي (Automatic SCR Battery Charger)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-31V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 45,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 40
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 10,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "R",
        "part": "Rg-1000",
        "x": 125,
        "y": 225,
        "rot": 0,
        "val": 1000
      },
      {
        "id": 6,
        "type": "D",
        "part": "1N4007",
        "x": 185,
        "y": 225,
        "rot": 0
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 6,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 6,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 7,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 8,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "18. دائرة فصل الشحن بالزينر (Zener Charge Cutoff Circuit)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-31V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 45,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 55
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 12,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "GATE_FIRING",
        "part": "SYNC-55deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "alpha": 55,
        "freq": 50
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 6,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 7,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "19. مفتاح طوارئ للإضاءة (Emergency Backup Light Switch)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-16V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 24,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 20
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 10,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "R",
        "part": "Rg-1000",
        "x": 125,
        "y": 225,
        "rot": 0,
        "val": 1000
      },
      {
        "id": 6,
        "type": "D",
        "part": "1N4007",
        "x": 185,
        "y": 225,
        "rot": 0
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 6,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 6,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 7,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 8,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "20. إنذار الخزينة بالضوء (Light-Activated LDR Vault Alarm)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-16V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 24,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 30
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 12,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "GATE_FIRING",
        "part": "SYNC-30deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "alpha": 30,
        "freq": 50
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 6,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 7,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "21. قدح بمكثف لتخطي 90 درجة (RC Phase-Shift > 90°)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-219V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 311,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 115
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 50,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "POT",
        "part": "R-Phase",
        "x": 120,
        "y": 220,
        "rot": 0,
        "val": 1000,
        "pct": 63
      },
      {
        "id": 6,
        "type": "C",
        "part": "470nF",
        "x": 160,
        "y": 265,
        "rot": 90,
        "val": "470n"
      },
      {
        "id": 7,
        "type": "GATE_FIRING",
        "part": "DIAC-DB3",
        "x": 200,
        "y": 220,
        "rot": 0,
        "alpha": 115,
        "freq": 50
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 6,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 6,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 7,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 7,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 8,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 9,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "22. شبكة RC مزدوجة للقدح (Double RC Phase-Shift Network)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-219V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 311,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 135
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 50,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "POT",
        "part": "R-Phase",
        "x": 120,
        "y": 220,
        "rot": 0,
        "val": 1000,
        "pct": 75
      },
      {
        "id": 6,
        "type": "C",
        "part": "470nF",
        "x": 160,
        "y": 265,
        "rot": 90,
        "val": "470n"
      },
      {
        "id": 7,
        "type": "GATE_FIRING",
        "part": "DIAC-DB3",
        "x": 200,
        "y": 220,
        "rot": 0,
        "alpha": 135,
        "freq": 50
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 6,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 6,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 7,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 7,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 8,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 9,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "23. مذبذب التراخي UJT (UJT Relaxation Oscillator)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-33V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 48,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 65
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 20,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "POT",
        "part": "R-Phase",
        "x": 120,
        "y": 220,
        "rot": 0,
        "val": 1000,
        "pct": 36
      },
      {
        "id": 6,
        "type": "C",
        "part": "470nF",
        "x": 160,
        "y": 265,
        "rot": 90,
        "val": "470n"
      },
      {
        "id": 7,
        "type": "GATE_FIRING",
        "part": "DIAC-DB3",
        "x": 200,
        "y": 220,
        "rot": 0,
        "alpha": 65,
        "freq": 50
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 6,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 6,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 7,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 7,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 8,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 9,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "24. قدح الثايرستور بـ UJT (UJT Triggered SCR Control)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-155V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 220,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 70
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 40,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "POT",
        "part": "R-Phase",
        "x": 120,
        "y": 220,
        "rot": 0,
        "val": 1000,
        "pct": 38
      },
      {
        "id": 6,
        "type": "C",
        "part": "470nF",
        "x": 160,
        "y": 265,
        "rot": 90,
        "val": "470n"
      },
      {
        "id": 7,
        "type": "GATE_FIRING",
        "part": "DIAC-DB3",
        "x": 200,
        "y": 220,
        "rot": 0,
        "alpha": 70,
        "freq": 50
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 6,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 6,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 7,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 7,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 8,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 9,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "25. إنذار الحريق بالحرارة (NTC Over-Temperature Fire Alarm)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-16V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 24,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 25
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 12,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "GATE_FIRING",
        "part": "SYNC-25deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "alpha": 25,
        "freq": 50
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 6,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 7,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "26. توحيد موجة كاملة بـ 2 SCR (2-SCR Full-Wave Midpoint)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-155V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 220,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 45
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 35,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "GATE_FIRING",
        "part": "SYNC-45deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "alpha": 45,
        "freq": 50
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 6,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 7,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "27. تحكم سرعة محرك DC بموجة كاملة (Full-Wave DC Motor Drive)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-155V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 220,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 50
      },
      {
        "id": 3,
        "type": "MOTOR",
        "part": "DC-MOTOR",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 25,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "GATE_FIRING",
        "part": "SYNC-50deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "alpha": 50,
        "freq": 50
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 6,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 7,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "28. مفتاح متردد بثايرستورين متعاكسين (Inverse-Parallel SCRs)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-219V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 311,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 60
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 40,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "GATE_FIRING",
        "part": "SYNC-60deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "alpha": 60,
        "freq": 50
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 6,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 7,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "29. البديل بترياك واحد (Single TRIAC AC Switch)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-219V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 311,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 60
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 40,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "POT",
        "part": "R-Phase",
        "x": 120,
        "y": 220,
        "rot": 0,
        "val": 1000,
        "pct": 33
      },
      {
        "id": 6,
        "type": "C",
        "part": "470nF",
        "x": 160,
        "y": 265,
        "rot": 90,
        "val": "470n"
      },
      {
        "id": 7,
        "type": "GATE_FIRING",
        "part": "DIAC-DB3",
        "x": 200,
        "y": 220,
        "rot": 0,
        "alpha": 60,
        "freq": 50
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 6,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 6,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 7,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 7,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 8,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 9,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "30. ديمر إضاءة بالترياك والدياك (TRIAC-DIAC Light Dimmer)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-219V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 311,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 80
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 50,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "POT",
        "part": "R-Phase",
        "x": 120,
        "y": 220,
        "rot": 0,
        "val": 1000,
        "pct": 44
      },
      {
        "id": 6,
        "type": "C",
        "part": "470nF",
        "x": 160,
        "y": 265,
        "rot": 90,
        "val": "470n"
      },
      {
        "id": 7,
        "type": "GATE_FIRING",
        "part": "DIAC-DB3",
        "x": 200,
        "y": 220,
        "rot": 0,
        "alpha": 80,
        "freq": 50
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 6,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 6,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 7,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 7,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 8,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 9,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "31. التحكم في سرعة مروحة مترددة (AC Fan Speed Controller)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-219V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 311,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 70
      },
      {
        "id": 3,
        "type": "MOTOR",
        "part": "DC-MOTOR",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 45,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "GATE_FIRING",
        "part": "SYNC-70deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "alpha": 70,
        "freq": 50
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 6,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 7,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "32. قدح معزول ضوئياً (Opto-Isolated Gate Trigger)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-155V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 220,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "BT151-500R",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.005,
        "alpha": 50
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 40,
        "load": 0.08
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "GATE_FIRING",
        "part": "SYNC-50deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "alpha": 50,
        "freq": 50
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 6,
        "compId": 1,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Source)",
        "color": "#facc15"
      },
      {
        "id": 7,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Out)",
        "color": "#38bdf8"
      }
    ]
  },
  "33. إطفاء الثايرستور بترانزستور التوازي (Transistor Shunt Turn-Off)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "DC-24V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 24,
        "amp": 0,
        "freq": 0,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "SCR-Main",
        "x": 195,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.01
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 12
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "V",
        "part": "IG-Pulse",
        "x": 135,
        "y": 220,
        "rot": 0,
        "dc": 0,
        "amp": 6,
        "freq": 25,
        "wave": "pulse",
        "duty": 0.12
      },
      {
        "id": 6,
        "type": "SW",
        "part": "COMM-SW",
        "x": 135,
        "y": 120,
        "rot": 0,
        "closed": true,
        "t_on": 0.0,
        "t_off": 0.022
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 6,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 6,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 7,
        "compId": 5,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Gate Trigger)",
        "color": "#facc15"
      },
      {
        "id": 8,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Commutated)",
        "color": "#38bdf8"
      }
    ]
  },
  "34. قاطع تيار مستمر صناعي بمكثف الإطفاء (Forced C-Commutation Chopper)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "DC-48V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 48,
        "amp": 0,
        "freq": 0,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "SCR-Main",
        "x": 195,
        "y": 120,
        "rot": 0,
        "vgt": 0.6,
        "ih": 0.01
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": 16
      },
      {
        "id": 4,
        "type": "GND",
        "part": "GND",
        "x": 70,
        "y": 290,
        "rot": 0
      },
      {
        "id": 5,
        "type": "V",
        "part": "IG-Pulse",
        "x": 135,
        "y": 220,
        "rot": 0,
        "dc": 0,
        "amp": 6,
        "freq": 25,
        "wave": "pulse",
        "duty": 0.12
      },
      {
        "id": 6,
        "type": "SW",
        "part": "AUX-SCR-C",
        "x": 135,
        "y": 120,
        "rot": 0,
        "closed": true,
        "t_on": 0.0,
        "t_off": 0.022
      }
    ],
    "wires": [
      {
        "from": {
          "compId": 1,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 6,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 6,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 2,
          "pinIdx": 2,
          "pin": 2
        }
      },
      {
        "from": {
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 3,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 3,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 1,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 0,
          "pin": 0
        },
        "to": {
          "compId": 2,
          "pinIdx": 0,
          "pin": 0
        }
      },
      {
        "from": {
          "compId": 5,
          "pinIdx": 1,
          "pin": 1
        },
        "to": {
          "compId": 4,
          "pinIdx": 0,
          "pin": 0
        }
      }
    ],
    "probes": [
      {
        "id": 7,
        "compId": 5,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Gate Trigger)",
        "color": "#facc15"
      },
      {
        "id": 8,
        "compId": 3,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH2 (Load Commutated)",
        "color": "#38bdf8"
      }
    ]
  }
};

function launchExactDemoCircuit(key) {
  if (!window.EXTRA_LECTURE_PRESETS || !window.EXTRA_LECTURE_PRESETS[key]) return;
  const net = JSON.parse(JSON.stringify(window.EXTRA_LECTURE_PRESETS[key]));

  if (typeof components !== 'undefined') components.length = 0;
  if (typeof wires !== 'undefined') wires.length = 0;
  if (typeof probes !== 'undefined') probes.length = 0;
  if (typeof deselectAll === 'function') deselectAll();
  if (typeof tStopVal !== 'undefined') tStopVal = net.tStop || 0.04;

  if (typeof components !== 'undefined' && Array.isArray(net.components)) {
    net.components.forEach(c => components.push(c));
  }
  if (typeof wires !== 'undefined' && Array.isArray(net.wires)) {
    net.wires.forEach(w => wires.push(w));
  }
  if (typeof probes !== 'undefined' && Array.isArray(net.probes)) {
    net.probes.forEach(p => probes.push(p));
  }
  if (typeof nextId !== 'undefined') {
    nextId = 25;
  }

  // ضبط مقياس الأوسليسكوب تلقائياً ليتناسب مع جهد الدائرة
  const src = (net.components || []).find(c => c.type === 'V' || c.type === 'VCC');
  const vPeak = src ? Math.max(Math.abs(src.amp || 0), Math.abs(src.dc || 0), 10) : 50;
  const idealDiv = Math.max(5, Math.ceil(vPeak / 2.5));
  document.querySelectorAll('input[type="range"]').forEach(sl => {
    const h = ((sl.getAttribute('oninput') || '') + (sl.id || '')).toLowerCase();
    if (h.includes('ch1') || h.includes('ch2') || h.includes('scale')) {
      sl.max = Math.max(Number(sl.max || 100), idealDiv * 2);
      sl.value = idealDiv;
      sl.dispatchEvent(new Event('input'));
    }
  });

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

  sel.addEventListener('change', function(e) {
    const val = this.value;
    if (window.EXTRA_LECTURE_PRESETS && window.EXTRA_LECTURE_PRESETS[val]) {
      e.stopImmediatePropagation();
      launchExactDemoCircuit(val);
    }
  }, true);
}

window.addEventListener('DOMContentLoaded', attachLectureCircuitsToLoadDemo);
setInterval(attachLectureCircuitsToLoadDemo, 350);
