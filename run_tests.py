import sys, os, json
sys.path.insert(0, os.path.expanduser("~/ProSim_ISIS"))
from app import app

with open(os.path.expanduser("~/ProSim_ISIS/static/presets_all.js"), "r", encoding="utf-8") as f:
    raw = f.read()

json_str = raw[raw.find("{"):raw.find(";\n\nfunction launchExactDemoCircuit")]
netlists = json.loads(json_str)

client = app.test_client()
passed = 0

print("="*78)
print(f"{'Circuit Name':<48} | {'V_RMS':>7} | {'Power':>8} | {'Status'}")
print("="*78)

for name, payload in netlists.items():
    resp = client.post("/simulate", json={
        "mode": "transient",
        "tStop": payload["tStop"],
        "components": payload["components"],
        "wires": payload["wires"],
        "probes": payload["probes"]
    })
    data = resp.get_json() or {}
    p_stats = data.get("power_stats") or data.get("powers") or {}
    
    watts = 0.0
    if isinstance(p_stats, dict):
        for v in p_stats.values():
            watts += float(v.get("watts", 0) if isinstance(v, dict) else v)
            
    v_rms = 0.0
    for v_container in data.get("node_voltages", {}).values():
        if isinstance(v_container, list) and len(v_container) > 5:
            rms_c = (sum(float(x)*float(x) for x in v_container) / len(v_container)) ** 0.5
            if rms_c > v_rms:
                v_rms = rms_c
                
    ok = (resp.status_code == 200 and (watts > 0.01 or v_rms > 0.5))
    if ok:
        passed += 1
        
    print(f"{name[:46]:<48} | {v_rms:6.1f}V | {watts:6.1f}W | {'✅ OK' if ok else '⚠️ CHECK'}")

print("="*78)
print(f"✅ Total Verified Circuits: {passed} / {len(netlists)} Passed!")
