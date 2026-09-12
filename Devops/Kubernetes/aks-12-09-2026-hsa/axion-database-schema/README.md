# 🛢️ Axion Database Schema

PostgreSQL database schema for the **Axion** IoT telemetry and alerting platform. These migration scripts define the core data model used by the [Axion Ingestion Service](https://github.com/devopsinsiders/axion-ingestion-service) to store real-time sensor data from industrial refinery devices.

---

## 📁 Schema Files

The scripts are numbered and **must be executed in order**:

| # | File | Description |
|---|------|-------------|
| 1 | `01-extensions.sql` | Enables the `pgcrypto` extension for UUID generation |
| 2 | `02-telemetry.sql` | Creates the `telemetry` table and performance indexes |
| 3 | `03-alerts.sql` | Creates the `alerts` table and performance indexes |

---

## 📐 Entity-Relationship Diagram

```
┌──────────────────────────────────┐       ┌──────────────────────────────────┐
│           telemetry              │       │             alerts               │
├──────────────────────────────────┤       ├──────────────────────────────────┤
│ id          UUID (PK)            │       │ id           UUID (PK)           │
│ device_id   VARCHAR(50)          │       │ device_id    VARCHAR(50)         │
│ device_type VARCHAR(20)          │       │ severity     VARCHAR(20)         │
│ refinery_region VARCHAR(50)      │       │ message      TEXT                │
│ timestamp   TIMESTAMP            │       │ timestamp    TIMESTAMP           │
│ temperature DOUBLE PRECISION     │       │ acknowledged BOOLEAN             │
│ vibration   DOUBLE PRECISION     │       │ created_at   TIMESTAMP           │
│ current     DOUBLE PRECISION     │       └──────────────────────────────────┘
│ created_at  TIMESTAMP            │
└──────────────────────────────────┘
```

---

## 🔑 Table Details

### `telemetry`

Stores raw sensor readings from IoT devices deployed across refinery regions.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `UUID` | `PRIMARY KEY`, auto-generated | Unique record identifier |
| `device_id` | `VARCHAR(50)` | `NOT NULL` | ID of the reporting device |
| `device_type` | `VARCHAR(20)` | `NOT NULL` | Type of sensor (e.g., pump, compressor) |
| `refinery_region` | `VARCHAR(50)` | `NOT NULL` | Geographic region of the refinery |
| `timestamp` | `TIMESTAMP` | `NOT NULL` | Time of the sensor reading |
| `temperature` | `DOUBLE PRECISION` | `NOT NULL` | Temperature reading (°C) |
| `vibration` | `DOUBLE PRECISION` | `NOT NULL` | Vibration level (mm/s) |
| `current` | `DOUBLE PRECISION` | `NOT NULL` | Electrical current draw (A) |
| `created_at` | `TIMESTAMP` | Default: `CURRENT_TIMESTAMP` | Row insertion time |

**Indexes:**
- `idx_telemetry_device_id` — on `device_id` for device-specific queries
- `idx_telemetry_timestamp` — on `timestamp DESC` for time-range scans

---

### `alerts`

Stores anomaly alerts generated when sensor readings exceed thresholds.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `UUID` | `PRIMARY KEY`, auto-generated | Unique alert identifier |
| `device_id` | `VARCHAR(50)` | `NOT NULL` | ID of the device that triggered the alert |
| `severity` | `VARCHAR(20)` | `NOT NULL` | Alert severity (e.g., `warning`, `critical`) |
| `message` | `TEXT` | `NOT NULL` | Human-readable alert description |
| `timestamp` | `TIMESTAMP` | `NOT NULL` | Time when the anomaly was detected |
| `acknowledged` | `BOOLEAN` | Default: `FALSE` | Whether the alert has been reviewed |
| `created_at` | `TIMESTAMP` | Default: `CURRENT_TIMESTAMP` | Row insertion time |

**Indexes:**
- `idx_alerts_device_id` — on `device_id` for device-specific lookups
- `idx_alerts_acknowledged` — on `acknowledged` for filtering pending alerts
- `idx_alerts_timestamp` — on `timestamp DESC` for time-range scans

---

## 🚀 Quick Start

### Prerequisites

- **PostgreSQL 13+** with superuser access (required for `CREATE EXTENSION`)

### Apply the Schema

```bash
# Connect to your database and run scripts in order
psql -h localhost -U postgres -d axiondb -f 01-extensions.sql
psql -h localhost -U postgres -d axiondb -f 02-telemetry.sql
psql -h localhost -U postgres -d axiondb -f 03-alerts.sql
```

Or run all at once:

```bash
cat *.sql | psql -h localhost -U postgres -d axiondb
```

### Verify

```sql
-- Check that tables were created
\dt

-- Check indexes
\di
```

---

## 🏗️ Part of the Axion Platform

This schema is one component of the larger **Axion** platform:

| Service | Description |
|---------|-------------|
| **axion-database-schema** | 📍 *You are here* — PostgreSQL schema definitions |
| **axion-ingestion-service** | FastAPI service that ingests telemetry data and writes to this schema |
| **axion-landing-page** | Public-facing landing page for the Axion platform |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
