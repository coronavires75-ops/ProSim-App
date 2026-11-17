window.EXTRA_LECTURE_PRESETS = {
  "01. التمثيل بترانزستورين (Two-Transistor Analogy)": {
    "tStop": 0.04,
    "components": [
      {
        "id": 1,
        "type": "V",
        "part": "AC-25V",
        "x": 70,
        "y": 170,
        "rot": 0,
        "dc": 0,
        "amp": 36,
        "freq": 50,
        "wave": "sine"
      },
      {
        "id": 2,
        "type": "TRIAC",
        "part": "SCR-2N",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "18",
        "load": 0.06
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
        "part": "Rg-470",
        "x": 130,
        "y": 225,
        "rot": 0,
        "val": "470"
      },
      {
        "id": 6,
        "type": "D",
        "part": "1N4007",
        "x": 190,
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
        "part": "SCR-BT151",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "25",
        "load": 0.06
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
        "part": "TRIG-45deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "dc": 0,
        "amp": 8,
        "freq": 50,
        "wave": "pulse",
        "alpha": 45
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
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
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
        "part": "SCR-BT151",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "20",
        "load": 0.06
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
        "part": "Rg-470",
        "x": 130,
        "y": 225,
        "rot": 0,
        "val": "470"
      },
      {
        "id": 6,
        "type": "D",
        "part": "1N4007",
        "x": 190,
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
        "part": "SCR-BT151",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "30",
        "load": 0.06
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
        "part": "Rg-470",
        "x": 130,
        "y": 225,
        "rot": 0,
        "val": "470"
      },
      {
        "id": 6,
        "type": "D",
        "part": "1N4007",
        "x": 190,
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
        "part": "SCR-BT151",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "50",
        "load": 0.06
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
        "part": "TRIG-60deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "dc": 0,
        "amp": 8,
        "freq": 50,
        "wave": "pulse",
        "alpha": 60
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
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
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
        "part": "SCR-BT151",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "50",
        "load": 0.06
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
        "part": "TRIG-90deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "dc": 0,
        "amp": 8,
        "freq": 50,
        "wave": "pulse",
        "alpha": 90
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
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
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
        "part": "SCR-BT151",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "40",
        "load": 0.06
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
        "part": "TRIG-45deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "dc": 0,
        "amp": 8,
        "freq": 50,
        "wave": "pulse",
        "alpha": 45
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
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
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
        "part": "SCR-BT151",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "35",
        "load": 0.06
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
        "part": "Rg-470",
        "x": 130,
        "y": 225,
        "rot": 0,
        "val": "470"
      },
      {
        "id": 6,
        "type": "D",
        "part": "1N4007",
        "x": 190,
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
        "part": "SCR-BT151",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "40",
        "load": 0.06
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
        "part": "TRIG-55deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "dc": 0,
        "amp": 8,
        "freq": 50,
        "wave": "pulse",
        "alpha": 55
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
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
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
        "part": "SCR-BT151",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "40",
        "load": 0.06
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
        "part": "Rg-470",
        "x": 130,
        "y": 225,
        "rot": 0,
        "val": "470"
      },
      {
        "id": 6,
        "type": "D",
        "part": "1N4007",
        "x": 190,
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
        "part": "SCR-BT151",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "45",
        "load": 0.06
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
        "part": "Rg-470",
        "x": 130,
        "y": 225,
        "rot": 0,
        "val": "470"
      },
      {
        "id": 6,
        "type": "D",
        "part": "1N4007",
        "x": 190,
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
        "part": "SCR-BT151",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "12",
        "load": 0.06
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
        "part": "TRIG-20deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "dc": 0,
        "amp": 8,
        "freq": 50,
        "wave": "pulse",
        "alpha": 20
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
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
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
        "part": "SCR-BT151",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "12",
        "load": 0.06
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
        "part": "TRIG-25deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "dc": 0,
        "amp": 8,
        "freq": 50,
        "wave": "pulse",
        "alpha": 25
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
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
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
        "part": "SCR-BT151",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "16",
        "load": 0.06
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
        "part": "TRIG-40deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "dc": 0,
        "amp": 8,
        "freq": 50,
        "wave": "pulse",
        "alpha": 40
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
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
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
        "part": "SCR-BT151",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "30",
        "load": 0.06
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
        "part": "TRIG-50deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "dc": 0,
        "amp": 8,
        "freq": 50,
        "wave": "pulse",
        "alpha": 50
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
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
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
        "part": "SCR-BT151",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "60",
        "load": 0.06
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
        "part": "TRIG-75deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "dc": 0,
        "amp": 8,
        "freq": 50,
        "wave": "pulse",
        "alpha": 75
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
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
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
        "part": "SCR-BT151",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "10",
        "load": 0.06
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
        "part": "Rg-470",
        "x": 130,
        "y": 225,
        "rot": 0,
        "val": "470"
      },
      {
        "id": 6,
        "type": "D",
        "part": "1N4007",
        "x": 190,
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
        "part": "SCR-BT151",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "12",
        "load": 0.06
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
        "part": "TRIG-55deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "dc": 0,
        "amp": 8,
        "freq": 50,
        "wave": "pulse",
        "alpha": 55
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
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
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
        "part": "SCR-BT151",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "10",
        "load": 0.06
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
        "part": "Rg-470",
        "x": 130,
        "y": 225,
        "rot": 0,
        "val": "470"
      },
      {
        "id": 6,
        "type": "D",
        "part": "1N4007",
        "x": 190,
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
        "part": "SCR-BT151",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "12",
        "load": 0.06
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
        "part": "TRIG-30deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "dc": 0,
        "amp": 8,
        "freq": 50,
        "wave": "pulse",
        "alpha": 30
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
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
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
        "part": "SCR-BT151",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "50",
        "load": 0.06
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
        "part": "TRIG-115deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "dc": 0,
        "amp": 8,
        "freq": 50,
        "wave": "pulse",
        "alpha": 115
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
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
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
        "part": "SCR-BT151",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
        "ih": 0.005,
        "alpha": 130
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": "50",
        "load": 0.06
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
        "part": "TRIG-130deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "dc": 0,
        "amp": 8,
        "freq": 50,
        "wave": "pulse",
        "alpha": 130
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
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
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
        "part": "SCR-BT151",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "20",
        "load": 0.06
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
        "part": "TRIG-65deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "dc": 0,
        "amp": 8,
        "freq": 50,
        "wave": "pulse",
        "alpha": 65
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
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
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
        "part": "SCR-BT151",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "40",
        "load": 0.06
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
        "part": "TRIG-70deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "dc": 0,
        "amp": 8,
        "freq": 50,
        "wave": "pulse",
        "alpha": 70
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
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
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
        "part": "SCR-BT151",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "12",
        "load": 0.06
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
        "part": "TRIG-25deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "dc": 0,
        "amp": 8,
        "freq": 50,
        "wave": "pulse",
        "alpha": 25
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
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
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
        "part": "TRIAC-2SCR",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "35",
        "load": 0.06
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
        "part": "TRIG-45deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "dc": 0,
        "amp": 8,
        "freq": 50,
        "wave": "pulse",
        "alpha": 45
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
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
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
        "part": "TRIAC-FULL",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "25",
        "load": 0.06
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
        "part": "TRIG-50deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "dc": 0,
        "amp": 8,
        "freq": 50,
        "wave": "pulse",
        "alpha": 50
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
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
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
        "part": "TRIAC-INV",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "40",
        "load": 0.06
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
        "part": "TRIG-60deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "dc": 0,
        "amp": 8,
        "freq": 50,
        "wave": "pulse",
        "alpha": 60
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
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
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
        "part": "TRIAC-BT136",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "40",
        "load": 0.06
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
        "part": "TRIG-60deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "dc": 0,
        "amp": 8,
        "freq": 50,
        "wave": "pulse",
        "alpha": 60
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
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
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
        "part": "TRIAC-BT136",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "50",
        "load": 0.06
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
        "part": "TRIG-80deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "dc": 0,
        "amp": 8,
        "freq": 50,
        "wave": "pulse",
        "alpha": 80
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
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
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
        "part": "TRIAC-BT136",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "45",
        "load": 0.06
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
        "part": "TRIG-70deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "dc": 0,
        "amp": 8,
        "freq": 50,
        "wave": "pulse",
        "alpha": 70
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
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
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
        "part": "TRIAC-OPTO",
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
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
        "val": "40",
        "load": 0.06
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
        "part": "TRIG-50deg",
        "x": 140,
        "y": 230,
        "rot": 0,
        "dc": 0,
        "amp": 8,
        "freq": 50,
        "wave": "pulse",
        "alpha": 50
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
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
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
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
        "ih": 0.01,
        "alpha": 20
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": "12"
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
        "part": "TRIG-Pulse",
        "x": 140,
        "y": 225,
        "rot": 0,
        "dc": 0,
        "amp": 8,
        "freq": 50,
        "wave": "pulse",
        "alpha": 20
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
        "t_off": 0.024
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
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        }
      }
    ],
    "probes": [
      {
        "id": 7,
        "compId": 5,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Gate)",
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
        "x": 200,
        "y": 120,
        "rot": 0,
        "vgt": 0.55,
        "ih": 0.01,
        "alpha": 20
      },
      {
        "id": 3,
        "type": "R",
        "part": "LOAD",
        "x": 310,
        "y": 170,
        "rot": 90,
        "val": "16"
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
        "part": "TRIG-Pulse",
        "x": 140,
        "y": 225,
        "rot": 0,
        "dc": 0,
        "amp": 8,
        "freq": 50,
        "wave": "pulse",
        "alpha": 20
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
        "t_off": 0.024
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
          "compId": 2,
          "pinIdx": 1,
          "pin": 1
        }
      }
    ],
    "probes": [
      {
        "id": 7,
        "compId": 5,
        "pinIdx": 0,
        "pin": 0,
        "label": "CH1 (Gate)",
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

  if (typeof components !== 'undefined' && Array.isArray(net.components)) net.components.forEach(c => components.push(c));
  if (typeof wires !== 'undefined' && Array.isArray(net.wires)) net.wires.forEach(w => wires.push(w));
  if (typeof probes !== 'undefined' && Array.isArray(net.probes)) net.probes.forEach(p => probes.push(p));
  if (typeof nextId !== 'undefined') nextId = 25;

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

function makeScopeFullScreenAndUnified() {
  const scopeCanvas = Array.from(document.querySelectorAll('canvas')).find(c =>
    c.id !== 'uniMotorMiniCanvas' && c.width >= 200 && c.parentElement &&
    c.parentElement.parentElement && c.parentElement.parentElement.textContent.includes('Proteus Virtual Oscilloscope')
  );
  if (!scopeCanvas) return;

  let modal = scopeCanvas.parentElement.parentElement;
  if (modal && modal.dataset.fullScreenApplied !== '1') {
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.maxWidth = '100vw';
    modal.style.maxHeight = '100vh';
    modal.style.margin = '0';
    modal.style.borderRadius = '0';
    modal.style.overflowY = 'auto';
    modal.style.zIndex = '9999';
    modal.dataset.fullScreenApplied = '1';
    scopeCanvas.style.width = '100%';
    scopeCanvas.style.height = '230px';
  }

  const alphaSlider = Array.from(modal.querySelectorAll('input[type="range"]')).find(inp => {
    const pText = inp.parentElement ? inp.parentElement.textContent : '';
    return pText.includes('Angle') || pText.includes('Live Source');
  });
  if (alphaSlider && alphaSlider.dataset.alphaBound34 !== '1') {
    alphaSlider.dataset.alphaBound34 = '1';
    alphaSlider.min = '5';
    alphaSlider.max = '175';
    alphaSlider.addEventListener('input', function() {
      const deg = Number(this.value);
      if (typeof components !== 'undefined') {
        components.forEach(c => {
          if (c.type === 'TRIAC' || c.type === 'SCR' || (c.type === 'V' && c.alpha !== undefined)) c.alpha = deg;
          if (c.type === 'POT') c.pct = Math.min(95, Math.max(5, Math.round((deg / 180) * 100)));
        });
      }
      if (typeof runSim === 'function') runSim();
    });
  }

  if (!document.getElementById('unifiedMotorPowerBar')) {
    const bar = document.createElement('div');
    bar.id = 'unifiedMotorPowerBar';
    bar.dir = 'rtl';
    bar.style.cssText = 'width:100%;box-sizing:border-box;margin-top:8px;padding:8px;background:#0f172a;border:1px solid #334155;border-radius:10px;color:#f8fafc;font-size:12px;display:block;';
    bar.innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;text-align:center;margin-bottom:6px;">
        <div style="background:#1e293b;padding:4px;border-radius:6px;"><div style="color:#94a3b8;font-size:10px;">القدرة الفعالة</div><div id="uniPowerVal" style="color:#4ade80;font-weight:bold;font-size:12px;">0.00 W</div></div>
        <div style="background:#1e293b;padding:4px;border-radius:6px;"><div style="color:#94a3b8;font-size:10px;">سرعة المحرك</div><div id="uniRpmVal" style="color:#38bdf8;font-weight:bold;font-size:12px;">0 RPM</div></div>
        <div style="background:#1e293b;padding:4px;border-radius:6px;"><div style="color:#94a3b8;font-size:10px;">العزم</div><div id="uniTorqueVal" style="color:#facc15;font-weight:bold;font-size:12px;">0.00 Nm</div></div>
        <div style="background:#1e293b;padding:4px;border-radius:6px;"><div style="color:#94a3b8;font-size:10px;">التيار</div><div id="uniCurrVal" style="color:#f472b6;font-weight:bold;font-size:12px;">0.00 A</div></div>
      </div>
      <canvas id="uniMotorMiniCanvas" width="320" height="55" style="width:100%;height:55px;background:#020617;border:1px solid #1e293b;border-radius:6px;display:block;"></canvas>
    `;
    modal.appendChild(bar);
  }
}

(function hookFetchTelemetry() {
  const origFetch = window.fetch;
  window.fetch = async function(...args) {
    const resp = await origFetch.apply(this, args);
    try {
      const url = typeof args[0] === 'string' ? args[0] : (args[0] && args[0].url) || '';
      if (url.includes('sim') || url.includes('run')) {
        const data = await resp.clone().json();
        setTimeout(() => {
          makeScopeFullScreenAndUnified();
          let totalW = 0;
          const pStats = data.power_stats || data.powers || {};
          Object.values(pStats).forEach(v => {
            if (typeof v === 'number') totalW += v;
            else if (v && typeof v === 'object') totalW += Number(v.watts || v.power || v.p || 0);
          });
          const pEl = document.getElementById('uniPowerVal');
          if (pEl) pEl.textContent = totalW.toFixed(2) + ' W';

          const mStats = data.motor_stats || data.motors || {};
          const mKeys = Object.keys(mStats);
          const miniCvs = document.getElementById('uniMotorMiniCanvas');
          if (mKeys.length > 0) {
            const m = mStats[mKeys[0]];
            if (document.getElementById('uniRpmVal')) document.getElementById('uniRpmVal').textContent = Math.round(m.rpm || 0) + ' RPM';
            if (document.getElementById('uniTorqueVal')) document.getElementById('uniTorqueVal').textContent = Number(m.torque || 0).toFixed(2) + ' Nm';
            if (document.getElementById('uniCurrVal')) document.getElementById('uniCurrVal').textContent = Number(m.current || 0).toFixed(2) + ' A';
            if (miniCvs && m.history && Array.isArray(m.history.rpm) && m.history.rpm.length > 1) {
              const ctx = miniCvs.getContext('2d');
              const W = miniCvs.width, H = miniCvs.height;
              ctx.clearRect(0, 0, W, H);
              const rpms = m.history.rpm;
              const maxRpm = Math.max(100, ...rpms);
              ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2; ctx.beginPath();
              rpms.forEach((val, i) => {
                const x = (i / (rpms.length - 1)) * W;
                const y = H - 6 - ((val / maxRpm) * (H - 16));
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
              });
              ctx.stroke();
              ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'right';
              ctx.fillText('منحنى تسارع المحرك (RPM)', W - 8, 12);
            }
          } else if (miniCvs) {
            const ctx = miniCvs.getContext('2d');
            ctx.clearRect(0, 0, miniCvs.width, miniCvs.height);
            ctx.fillStyle = '#94a3b8'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
            ctx.fillText('القدرة الفعالة محسوبة لحظياً • اختر 27 أو 31 لعرض منحنى RPM', miniCvs.width / 2, 32);
          }
        }, 80);
      }
    } catch (e) {}
    return resp;
  };
})();

window.addEventListener('DOMContentLoaded', attachLectureCircuitsToLoadDemo);
setInterval(attachLectureCircuitsToLoadDemo, 350);
setInterval(makeScopeFullScreenAndUnified, 350);
