import asyncpg
from config import settings
from datetime import datetime, timedelta

pool: asyncpg.Pool | None = None

async def connect_db():
    global pool
    pool = await asyncpg.create_pool(
        dsn=settings.DATABASE_URL,
        min_size=2,
        max_size=10,
    )

async def disconnect_db():
    global pool
    if pool:
        await pool.close()
        pool = None

def calculate_health(temperature: float, vibration: float):
    # CRITICAL: Temperature > 100°C OR Vibration > 10 mm/s
    # WARNING: Temperature > 85°C OR Vibration > 6 mm/s
    temp = temperature or 0
    vib = vibration or 0
    
    score = 100.0
    if temp > 85:
        score -= (temp - 85) * 1.0
    if vib > 6:
        score -= (vib - 6) * 3.0
        
    score = max(10, min(100, int(score)))
    
    if temp > 100 or vib > 10:
        return "critical", score
    elif temp > 85 or vib > 6:
        return "warning", score
    else:
        return "healthy", score

async def fetch_summary():
    query = """
        SELECT 
            COUNT(DISTINCT device_id) as online_assets,
            MAX(timestamp) as last_update
        FROM telemetry;
    """
    row = await pool.fetchrow(query)
    return {
        "onlineAssets": row["online_assets"] or 0,
        "lastUpdate": row["last_update"]
    }

async def fetch_regions_summary():
    # To get the count of online and alerts per region, we need the latest status of each device.
    # We can do this in a subquery.
    query = """
        WITH LatestDevices AS (
            SELECT DISTINCT ON (device_id)
                device_id,
                refinery_region,
                temperature,
                vibration,
                timestamp as last_seen
            FROM telemetry
            ORDER BY device_id, timestamp DESC
        )
        SELECT refinery_region, temperature, vibration, last_seen
        FROM LatestDevices;
    """
    rows = await pool.fetch(query)
    
    regions = {}
    for r in rows:
        region = r["refinery_region"]
        if region not in regions:
            regions[region] = {"total_devices": 0, "online_devices": 0, "alert_devices": 0}
            
        regions[region]["total_devices"] += 1
        status, _ = calculate_health(r["temperature"], r["vibration"])
        
        # Consider online if seen in last 2 minutes
        is_online = False
        if r["last_seen"]:
            time_diff = (datetime.utcnow() - r["last_seen"].replace(tzinfo=None)).total_seconds()
            if time_diff < 120:
                is_online = True
                
        if is_online:
            regions[region]["online_devices"] += 1
            
        if status in ["warning", "critical"]:
            regions[region]["alert_devices"] += 1
            
    return [{"region": k, "total_devices": v["total_devices"], "online_devices": v["online_devices"], "alert_devices": v["alert_devices"]} for k, v in regions.items()]

async def fetch_devices():
    query = """
        SELECT DISTINCT ON (device_id)
            device_id,
            device_type,
            refinery_region,
            timestamp as last_seen,
            temperature,
            vibration,
            current
        FROM telemetry
        ORDER BY device_id, timestamp DESC;
    """
    rows = await pool.fetch(query)
    
    devices = []
    for r in rows:
        d = dict(r)
        status, health_score = calculate_health(d.get("temperature"), d.get("vibration"))
        d["status"] = status
        d["health_score"] = health_score
        devices.append(d)
        
    return devices

async def fetch_top_anomalous_devices():
    # Anomalous based on simple scoring: 
    # High temp + High vibration means highly anomalous
    # We use a subquery for latest device state
    query = """
        WITH LatestDevices AS (
            SELECT DISTINCT ON (device_id)
                device_id,
                device_type,
                refinery_region,
                timestamp as last_seen,
                temperature,
                vibration,
                current
            FROM telemetry
            ORDER BY device_id, timestamp DESC
        )
        SELECT *
        FROM LatestDevices
        ORDER BY (temperature + (vibration * 10)) DESC;
    """
    rows = await pool.fetch(query)
    
    devices = []
    for r in rows:
        d = dict(r)
        status, health_score = calculate_health(d.get("temperature"), d.get("vibration"))
        if status in ["warning", "critical"]:
            d["status"] = status
            d["health_score"] = health_score
            devices.append(d)
            if len(devices) == 5:
                break
        
    return devices

async def fetch_latest_telemetry(device_id: str = None):
    if device_id:
        query = """
            SELECT * FROM telemetry
            WHERE device_id = $1
            ORDER BY timestamp DESC
            LIMIT 1;
        """
        row = await pool.fetchrow(query, device_id)
        if row:
            d = dict(row)
            status, health_score = calculate_health(d.get("temperature"), d.get("vibration"))
            d["status"] = status
            d["health_score"] = health_score
            
            # Fetch first_seen and total_records for metadata
            meta_query = "SELECT MIN(timestamp) as first_seen, COUNT(*) as total_records FROM telemetry WHERE device_id = $1"
            meta_row = await pool.fetchrow(meta_query, device_id)
            d["first_seen"] = meta_row["first_seen"]
            d["total_records"] = meta_row["total_records"]
            return d
        return None
    else:
        query = """
            SELECT * FROM telemetry
            ORDER BY timestamp DESC
            LIMIT 1;
        """
        row = await pool.fetchrow(query)
        if row:
            d = dict(row)
            status, health_score = calculate_health(d.get("temperature"), d.get("vibration"))
            d["status"] = status
            d["health_score"] = health_score
            return d
        return None

async def fetch_device_trends(device_id: str, hours: int = 1):
    query = """
        SELECT timestamp, temperature, vibration, current
        FROM telemetry
        WHERE device_id = $1
          AND timestamp >= NOW() - INTERVAL '1 hour' * $2
        ORDER BY timestamp ASC;
    """
    rows = await pool.fetch(query, device_id, hours)
    return [dict(r) for r in rows]

async def fetch_throughput():
    query = """
        SELECT
            date_trunc('minute', timestamp) as minute,
            count(*)
        FROM telemetry
        GROUP BY minute
        ORDER BY minute DESC
        LIMIT 60;
    """
    rows = await pool.fetch(query)
    
    data = [dict(r) for r in rows]
    data.reverse()
    
    formatted = []
    for r in data:
        formatted.append({
            "minute": r["minute"].strftime("%H:%M") if r["minute"] else "",
            "count": r["count"]
        })
    return formatted
