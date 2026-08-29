"""
Axion Ingestion Service - Pydantic Models
Defines request/response schemas for the telemetry ingestion endpoint.
"""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class TelemetryMetrics(BaseModel):
    """Sensor metrics from an industrial device."""
    temperature: float = Field(..., description="Temperature reading (°C)")
    vibration: float = Field(..., description="Vibration reading (mm/s)")
    current: float = Field(..., description="Current draw (A)")


class TelemetryPayload(BaseModel):
    """Incoming telemetry payload from a refinery device."""
    deviceId: str = Field(..., min_length=1, max_length=50, description="Unique device identifier")
    deviceType: str = Field(..., min_length=1, max_length=20, description="Type of device (e.g. MOTOR, PUMP)")
    refineryRegion: str = Field(..., min_length=1, max_length=50, description="Refinery region code")
    timestamp: datetime = Field(..., description="ISO-8601 timestamp of the reading")
    metrics: TelemetryMetrics

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "deviceId": "DEV_001",
                    "deviceType": "MOTOR",
                    "refineryRegion": "NORTH_PLANT",
                    "timestamp": "2026-06-10T10:15:30Z",
                    "metrics": {
                        "temperature": 87.5,
                        "vibration": 6.2,
                        "current": 12.8
                    }
                }
            ]
        }
    }


class TelemetryResponse(BaseModel):
    """Response returned after successful ingestion."""
    status: str = "accepted"
    id: str = Field(..., description="UUID of the inserted telemetry record")
    message: str = "Telemetry data ingested successfully"


class TelemetryRecord(BaseModel):
    """A single telemetry record returned from the database."""
    id: str
    deviceId: str = Field(..., alias="device_id")
    deviceType: str = Field(..., alias="device_type")
    refineryRegion: str = Field(..., alias="refinery_region")
    timestamp: datetime
    temperature: float
    vibration: float
    current: float
    createdAt: Optional[datetime] = Field(None, alias="created_at")

    model_config = {"populate_by_name": True}
