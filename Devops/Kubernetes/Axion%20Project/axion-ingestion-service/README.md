# 🚀 Axion Ingestion Service

A high-performance **FastAPI** microservice that ingests real-time telemetry data from industrial refinery devices and persists it to **PostgreSQL**. Part of the **Axion** platform for industrial IoT monitoring and analytics.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Setup](#local-setup)
  - [Docker](#docker)
- [API Reference](#api-reference)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [License](#license)

---

## Overview

The Axion Ingestion Service acts as the **entry point** for all telemetry data flowing from refinery devices (motors, pumps, etc.) into the Axion platform. It exposes REST endpoints to:

- **Ingest** telemetry readings (temperature, vibration, current) from devices.
- **Query** recent telemetry records with optional device-level filtering.
- **Health-check** for liveness/readiness probes in orchestrated environments.

---

## Architecture

```
┌────────────────┐        POST /api/v1/telemetry/ingest        ┌──────────────────────┐
│  Refinery       │ ──────────────────────────────────────────► │  Axion Ingestion     │
│  Devices        │                                             │  Service (FastAPI)   │
│  (IoT Sensors)  │ ◄────────────────────────────────────────── │                      │
└────────────────┘        { status: "accepted", id: "..." }     └──────────┬───────────┘
                                                                           │
                                                                           │ asyncpg
                                                                           ▼
                                                                ┌──────────────────────┐
                                                                │  PostgreSQL          │
                                                                │  (axiondb)           │
                                                                └──────────────────────┘
```

---

## Tech Stack

| Layer         | Technology                                      |
|---------------|--------------------------------------------------|
| **Framework** | [FastAPI](https://fastapi.tiangolo.com/) 0.115   |
| **Server**    | [Uvicorn](https://www.uvicorn.org/) 0.30         |
| **Database**  | PostgreSQL with [asyncpg](https://github.com/MagicStack/asyncpg) 0.30 (async connection pool) |
| **Validation**| [Pydantic v2](https://docs.pydantic.dev/) 2.9    |
| **Container** | Docker (Python 3.12-slim)                        |

---

## Getting Started

### Prerequisites

- **Python 3.12+**
- **PostgreSQL** instance with a `telemetry` table (see [axion-database-schema](https://github.com/devopsinsiders/axion-database-schema) for the schema)
- **Docker** (optional, for containerized deployment)

### Local Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/devopsinsiders/axion-ingestion-service.git
   cd axion-ingestion-service
   ```

2. **Create a virtual environment**

   ```bash
   python -m venv venv
   source venv/bin/activate    # Linux/macOS
   venv\Scripts\activate       # Windows
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment**

   ```bash
   cp .env.example .env
   # Edit .env and set your DATABASE_URL
   ```

5. **Run the service**

   ```bash
   uvicorn main:app --reload --port 8000
   ```

   The API will be available at `http://localhost:8000`.  
   Interactive docs at `http://localhost:8000/docs`.

### Docker

```bash
# Build the image
docker build -t axion-ingestion-service .

# Run the container
docker run -d \
  -p 8000:8000 \
  -e DATABASE_URL=postgresql://postgres:postgres@host.docker.internal:5432/axiondb \
  --name axion-ingestion \
  axion-ingestion-service
```

---

## API Reference

### Health Check

```
GET /health
```

**Response** `200 OK`

```json
{ "status": "UP" }
```

---

### Ingest Telemetry

```
POST /api/v1/telemetry/ingest
```

**Request Body**

```json
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
```

**Response** `201 Created`

```json
{
  "status": "accepted",
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "message": "Telemetry data ingested successfully"
}
```

---

### Get Telemetry

```
GET /api/v1/telemetry?deviceId=DEV_001&limit=50
```

| Parameter  | Type   | Required | Default | Description                     |
|------------|--------|----------|---------|---------------------------------|
| `deviceId` | string | No       | —       | Filter results by device ID     |
| `limit`    | int    | No       | 100     | Max records to return (1–1000)  |

**Response** `200 OK`

```json
[
  {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "deviceId": "DEV_001",
    "deviceType": "MOTOR",
    "refineryRegion": "NORTH_PLANT",
    "timestamp": "2026-06-10T10:15:30Z",
    "temperature": 87.5,
    "vibration": 6.2,
    "current": 12.8,
    "createdAt": "2026-06-10T10:15:31Z"
  }
]
```

---

## Configuration

Configuration is managed via environment variables. See [`.env.example`](.env.example) for reference.

| Variable       | Description                                  | Default                                            |
|----------------|----------------------------------------------|----------------------------------------------------|
| `DATABASE_URL` | PostgreSQL connection string                 | `postgresql://postgres:postgres@localhost:5432/axiondb` |

---

## Project Structure

```
axion-ingestion-service/
├── main.py              # FastAPI app, routes, and lifespan management
├── config.py            # Environment-based configuration (Settings dataclass)
├── database.py          # asyncpg connection pool and query helpers
├── models.py            # Pydantic request/response schemas
├── requirements.txt     # Python dependencies
├── Dockerfile           # Container image definition
├── .env.example         # Sample environment variables
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

---

## License

This project is part of the **Axion** platform by [DevOps Insiders](https://github.com/devopsinsiders).
