import os
import time
import random
import requests
from datetime import datetime, timezone

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
# Point to the ingestion service
API_URL = os.getenv("API_URL", "http://axion-ingestion-service.default.svc.cluster.local:80/api/v1/telemetry/ingest")
INTERVAL_SECONDS = int(os.getenv("INTERVAL_SECONDS", "5"))

# ---------------------------------------------------------------------------
# Device Catalog
# ---------------------------------------------------------------------------
DEVICES = [
    # --- NORTH PLANT (5 devices) ---
    {"id": "AX-PMP-N01-A4F9", "type": "PUMP", "region": "NORTH_PLANT", "temp_base": 60, "vib_base": 2.5, "cur_base": 12.0},
    {"id": "AX-PMP-N02-B2D1", "type": "PUMP", "region": "NORTH_PLANT", "temp_base": 65, "vib_base": 3.0, "cur_base": 14.5},
    {"id": "AX-PMP-N03-C8E4", "type": "PUMP", "region": "NORTH_PLANT", "temp_base": 62, "vib_base": 2.8, "cur_base": 13.0},
    {"id": "AX-MTR-N01-F3A2", "type": "MOTOR", "region": "NORTH_PLANT", "temp_base": 75, "vib_base": 4.2, "cur_base": 30.0},
    {"id": "AX-CMP-N01-D9C1", "type": "COMPRESSOR", "region": "NORTH_PLANT", "temp_base": 80, "vib_base": 5.5, "cur_base": 40.0},
    
    # --- SOUTH PLANT (6 devices) ---
    {"id": "AX-PMP-S01-E8B5", "type": "PUMP", "region": "SOUTH_PLANT", "temp_base": 55, "vib_base": 2.0, "cur_base": 11.5},
    {"id": "AX-MTR-S01-A1F4", "type": "MOTOR", "region": "SOUTH_PLANT", "temp_base": 78, "vib_base": 4.5, "cur_base": 35.0},
    {"id": "AX-MTR-S02-B7C9", "type": "MOTOR", "region": "SOUTH_PLANT", "temp_base": 80, "vib_base": 4.8, "cur_base": 32.0},
    {"id": "AX-CMP-S01-F2D8", "type": "COMPRESSOR", "region": "SOUTH_PLANT", "temp_base": 82, "vib_base": 5.0, "cur_base": 42.0},
    {"id": "AX-PMP-S02-C3E7", "type": "PUMP", "region": "SOUTH_PLANT", "temp_base": 58, "vib_base": 2.2, "cur_base": 12.0},
    {"id": "AX-PMP-S03-D4F8", "type": "PUMP", "region": "SOUTH_PLANT", "temp_base": 56, "vib_base": 2.1, "cur_base": 11.8},
    
    # --- EAST REFINERY (5 devices) ---
    {"id": "AX-CMP-E01-C4A6", "type": "COMPRESSOR", "region": "EAST_REFINERY", "temp_base": 82, "vib_base": 5.5, "cur_base": 45.0},
    {"id": "AX-PMP-E01-D3B7", "type": "PUMP", "region": "EAST_REFINERY", "temp_base": 70, "vib_base": 3.5, "cur_base": 15.0},
    {"id": "AX-MTR-E01-E9F2", "type": "MOTOR", "region": "EAST_REFINERY", "temp_base": 76, "vib_base": 4.5, "cur_base": 31.0},
    {"id": "AX-PMP-E02-A1B2", "type": "PUMP", "region": "EAST_REFINERY", "temp_base": 68, "vib_base": 3.2, "cur_base": 14.5},
    {"id": "AX-PMP-E03-D7E8", "type": "PUMP", "region": "EAST_REFINERY", "temp_base": 71, "vib_base": 3.6, "cur_base": 15.5},

    # --- WEST REFINERY (5 devices) ---
    {"id": "AX-PMP-W01-B6C3", "type": "PUMP", "region": "WEST_REFINERY", "temp_base": 58, "vib_base": 2.2, "cur_base": 12.5},
    {"id": "AX-MTR-W01-A8D5", "type": "MOTOR", "region": "WEST_REFINERY", "temp_base": 74, "vib_base": 4.0, "cur_base": 29.0},
    {"id": "AX-CMP-W01-E9F0", "type": "COMPRESSOR", "region": "WEST_REFINERY", "temp_base": 80, "vib_base": 5.0, "cur_base": 40.0},
    {"id": "AX-PMP-W02-A1B2", "type": "PUMP", "region": "WEST_REFINERY", "temp_base": 59, "vib_base": 2.3, "cur_base": 12.8},
    {"id": "AX-MTR-W02-C3D4", "type": "MOTOR", "region": "WEST_REFINERY", "temp_base": 75, "vib_base": 4.2, "cur_base": 30.0},

    # --- CENTRAL REFINERY (6 devices) ---
    {"id": "AX-MTR-N02-E2B4", "type": "MOTOR", "region": "CENTRAL_REFINERY", "temp_base": 73, "vib_base": 4.0, "cur_base": 28.0},
    {"id": "AX-CMP-N02-F1A5", "type": "COMPRESSOR", "region": "CENTRAL_REFINERY", "temp_base": 79, "vib_base": 5.2, "cur_base": 38.0},
    {"id": "AX-CMP-S02-E5A9", "type": "COMPRESSOR", "region": "CENTRAL_REFINERY", "temp_base": 81, "vib_base": 4.9, "cur_base": 41.0},
    {"id": "AX-MTR-S03-F6B0", "type": "MOTOR", "region": "CENTRAL_REFINERY", "temp_base": 77, "vib_base": 4.4, "cur_base": 34.0},
    {"id": "AX-CMP-E02-B3C4", "type": "COMPRESSOR", "region": "CENTRAL_REFINERY", "temp_base": 78, "vib_base": 4.8, "cur_base": 41.0}, 
    {"id": "AX-MTR-E02-C5D6", "type": "MOTOR", "region": "CENTRAL_REFINERY", "temp_base": 75, "vib_base": 4.5, "cur_base": 33.0},
]

# Track current state for random walk
state = {}
for d in DEVICES:
    state[d["id"]] = {
        "temperature": d["temp_base"],
        "vibration": d["vib_base"],
        "current": d["cur_base"]
    }

# Anomaly managers
critical_anomaly = {"device_id": None, "ticks": 0}
warning_anomalies = [{"device_id": None, "ticks": 0}, {"device_id": None, "ticks": 0}]

def generate_payload(device):
    """Generate the next random-walk data point for a device."""
    did = device["id"]
    s = state[did]
    
    # Determine target values
    target_temp = device["temp_base"]
    target_vib = device["vib_base"]
    
    if did == critical_anomaly["device_id"]:
        target_temp = 105.0
        target_vib = 12.0
    else:
        for w in warning_anomalies:
            if did == w["device_id"]:
                target_temp = 90.0
                target_vib = 7.0
                break
    
    # Smooth, realistic drift towards target (approx 5% of distance per 5-second tick)
    s["temperature"] += (target_temp - s["temperature"]) * 0.05
    s["vibration"] += (target_vib - s["vibration"]) * 0.05
    s["current"] += (device["cur_base"] - s["current"]) * 0.05

    # Add realistic micro-noise (jitter)
    s["temperature"] += random.uniform(-0.5, 0.5)
    s["vibration"] += random.uniform(-0.1, 0.1)
    s["current"] += random.uniform(-0.5, 0.5)

    return {
        "deviceId": did,
        "deviceType": device["type"],
        "refineryRegion": device["region"],
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "metrics": {
            "temperature": round(s["temperature"], 2),
            "vibration": round(s["vibration"], 2),
            "current": round(s["current"], 2)
        }
    }

def main():
    print(f"Starting Data Simulator. Interval: {INTERVAL_SECONDS}s. API: {API_URL}")
    while True:
        # Manage anomalies
        if critical_anomaly["device_id"] is None:
            if random.random() < 0.05: # 5% chance to trigger critical
                critical_anomaly["device_id"] = random.choice(DEVICES)["id"]
                critical_anomaly["ticks"] = random.randint(20, 60) # Lasts 1-3 minutes
                print(f"CRITICAL ANOMALY STARTING: {critical_anomaly['device_id']}")
        else:
            critical_anomaly["ticks"] -= 1
            if critical_anomaly["ticks"] <= 0:
                print(f"CRITICAL ANOMALY RESOLVING: {critical_anomaly['device_id']}")
                critical_anomaly["device_id"] = None
                
        for w in warning_anomalies:
            if w["device_id"] is None:
                if random.random() < 0.05:
                    candidate = random.choice(DEVICES)["id"]
                    if candidate != critical_anomaly["device_id"]:
                        w["device_id"] = candidate
                        w["ticks"] = random.randint(30, 90)
            else:
                w["ticks"] -= 1
                if w["ticks"] <= 0:
                    w["device_id"] = None

        for device in DEVICES:
            payload = generate_payload(device)
            try:
                resp = requests.post(API_URL, json=payload, timeout=2)
                if resp.status_code != 201:
                    print(f"Sent {payload['deviceId']} -> FAILED ({resp.status_code}): {resp.text}")
            except Exception as e:
                pass
        
        time.sleep(INTERVAL_SECONDS)

if __name__ == "__main__":
    main()
