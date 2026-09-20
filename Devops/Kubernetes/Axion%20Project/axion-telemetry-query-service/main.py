from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn
from database import (
    connect_db,
    disconnect_db,
    fetch_summary,
    fetch_devices,
    fetch_latest_telemetry,
    fetch_device_trends,
    fetch_throughput,
    fetch_top_anomalous_devices,
    fetch_regions_summary
)
from config import settings

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("Connecting to database...")
    await connect_db()
    yield
    # Shutdown
    print("Disconnecting from database...")
    await disconnect_db()

app = FastAPI(
    title="Axion Telemetry Query Service",
    description="API for the Axion condition monitoring dashboard",
    version="1.0.0",
    lifespan=lifespan
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For development, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/dashboard/summary")
async def get_summary():
    try:
        return await fetch_summary()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/devices")
async def get_devices():
    try:
        return await fetch_devices()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/devices/{device_id}/latest")
async def get_latest_device_data(device_id: str):
    try:
        data = await fetch_latest_telemetry(device_id)
        if not data:
            raise HTTPException(status_code=404, detail="No telemetry found")
        return data
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/devices/{device_id}/trends")
async def get_device_trends(device_id: str, hours: int = Query(1, description="Hours of history to fetch")):
    try:
        return await fetch_device_trends(device_id, hours)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/devices/top-anomalous")
async def get_top_anomalous():
    try:
        return await fetch_top_anomalous_devices()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/dashboard/throughput")
async def get_throughput():
    try:
        return await fetch_throughput()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/dashboard/regions")
async def get_regions():
    try:
        return await fetch_regions_summary()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=settings.PORT, reload=True)
