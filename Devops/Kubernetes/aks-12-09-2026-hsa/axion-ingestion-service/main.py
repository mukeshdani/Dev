"""
Axion Ingestion Service
=======================
FastAPI service that ingests telemetry data from refinery devices
and stores it in a PostgreSQL database.
"""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from database import connect_db, disconnect_db, insert_telemetry, fetch_telemetry
from models import TelemetryPayload, TelemetryRecord, TelemetryResponse

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-8s | %(message)s",
)
logger = logging.getLogger("axion-ingestion")

# ---------------------------------------------------------------------------
# Application lifespan  (startup / shutdown)
# ---------------------------------------------------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage DB pool lifecycle."""
    logger.info("Connecting to PostgreSQL @ %s", settings.DATABASE_URL)
    await connect_db()
    logger.info("Database connection pool established")
    yield
    logger.info("Shutting down — closing DB pool")
    await disconnect_db()


# ---------------------------------------------------------------------------
# FastAPI app
# ---------------------------------------------------------------------------

app = FastAPI(
    title="Axion Ingestion Service",
    description="Receives telemetry readings from refinery devices and persists them to PostgreSQL.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.get("/health", tags=["Health"])
async def health_check():
    """Liveness / readiness probe."""
    return {"status": "UP"}


@app.get(
    "/api/v1/telemetry",
    response_model=list[TelemetryRecord],
    tags=["Telemetry"],
    summary="Get recent telemetry records",
    description="Returns the latest telemetry records, optionally filtered by deviceId.",
)
async def get_telemetry(
    deviceId: str | None = Query(None, description="Filter by device ID"),
    limit: int = Query(100, ge=1, le=1000, description="Max records to return (default 100)"),
):
    """
    Fetch recent telemetry records ordered by timestamp descending.
    """
    try:
        rows = await fetch_telemetry(device_id=deviceId, limit=limit)
        return [
            TelemetryRecord(
                id=str(row["id"]),
                device_id=row["device_id"],
                device_type=row["device_type"],
                refinery_region=row["refinery_region"],
                timestamp=row["timestamp"],
                temperature=row["temperature"],
                vibration=row["vibration"],
                current=row["current"],
                created_at=row["created_at"],
            )
            for row in rows
        ]
    except Exception as exc:
        logger.error("Failed to fetch telemetry: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve telemetry data: {str(exc)}",
        )


@app.post(
    "/api/v1/telemetry/ingest",
    response_model=TelemetryResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Telemetry"],
    summary="Ingest telemetry data",
    description="Accepts a telemetry JSON payload from a device and stores it in the database.",
)
async def ingest_telemetry(payload: TelemetryPayload):
    """
    Receive a telemetry payload, validate it, and insert into PostgreSQL.
    """
    try:
        record_id = await insert_telemetry(
            device_id=payload.deviceId,
            device_type=payload.deviceType,
            refinery_region=payload.refineryRegion,
            timestamp=payload.timestamp,
            temperature=payload.metrics.temperature,
            vibration=payload.metrics.vibration,
            current=payload.metrics.current,
        )

        logger.info(
            "Ingested telemetry | id=%s device=%s type=%s region=%s",
            record_id,
            payload.deviceId,
            payload.deviceType,
            payload.refineryRegion,
        )

        return TelemetryResponse(
            status="accepted",
            id=record_id,
            message="Telemetry data ingested successfully",
        )

    except Exception as exc:
        logger.error("Failed to ingest telemetry: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to store telemetry data: {str(exc)}",
        )
