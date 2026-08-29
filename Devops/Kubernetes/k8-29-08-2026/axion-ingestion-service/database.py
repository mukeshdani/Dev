"""
Axion Ingestion Service - Database Layer
Manages the asyncpg connection pool and provides query helpers.
"""

import asyncpg
from config import settings

pool: asyncpg.Pool | None = None


async def connect_db():
    """Create the asyncpg connection pool."""
    global pool
    pool = await asyncpg.create_pool(
        dsn=settings.DATABASE_URL,
        min_size=2,
        max_size=10,
    )


async def disconnect_db():
    """Close the connection pool."""
    global pool
    if pool:
        await pool.close()
        pool = None


async def insert_telemetry(
    device_id: str,
    device_type: str,
    refinery_region: str,
    timestamp,
    temperature: float,
    vibration: float,
    current: float,
) -> str:
    """
    Insert a telemetry record and return the generated UUID.
    """
    import datetime
    if timestamp.tzinfo is not None:
        timestamp = timestamp.astimezone(datetime.timezone.utc).replace(tzinfo=None)
        
    query = """
        INSERT INTO telemetry (device_id, device_type, refinery_region, timestamp, temperature, vibration, current)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id;
    """
    row = await pool.fetchrow(
        query,
        device_id,
        device_type,
        refinery_region,
        timestamp,
        temperature,
        vibration,
        current,
    )
    return str(row["id"])


async def fetch_telemetry(
    device_id: str | None = None,
    limit: int = 100,
) -> list[dict]:
    """
    Fetch recent telemetry records, optionally filtered by device_id.
    Results are ordered by timestamp descending.
    """
    if device_id:
        query = """
            SELECT id, device_id, device_type, refinery_region,
                   timestamp, temperature, vibration, current, created_at
            FROM telemetry
            WHERE device_id = $1
            ORDER BY timestamp DESC
            LIMIT $2;
        """
        rows = await pool.fetch(query, device_id, limit)
    else:
        query = """
            SELECT id, device_id, device_type, refinery_region,
                   timestamp, temperature, vibration, current, created_at
            FROM telemetry
            ORDER BY timestamp DESC
            LIMIT $1;
        """
        rows = await pool.fetch(query, limit)

    return [dict(row) for row in rows]

