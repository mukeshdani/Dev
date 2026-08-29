# 📈 Axion Data Simulator

A lightweight background microservice designed to continuously generate realistic mock telemetry data and send it to the **Axion Ingestion Service**. 

This simulator mimics the behavior of physical industrial equipment (pumps, motors, compressors) across multiple refinery regions, making it the perfect tool for testing database loads, monitoring dashboards, and anomaly alerting systems.

---

## 🏗️ Architecture & Behavior

The simulator runs as a continuous loop in a lightweight Python Docker container. 

1. **Device Catalog**: It comes pre-configured with 8 distinct "devices" spread across 3 regions (North Plant, South Plant, East Refinery).
2. **Random Walk Algorithm**: Instead of generating completely random spikes, the metrics "drift" naturally from their base values using a random-walk algorithm, keeping them within realistic physical bounds.
3. **Network Simulation**: It sends standard `POST` HTTP requests directly to the ingestion API, perfectly simulating real device network traffic.
4. **Anomaly Generation**: To help test alerting systems, there is a **1% probability** every tick that a device will experience a severe "anomaly," causing an artificial spike in its temperature and vibration.

---

## 📊 Telemetry Metrics & Units

The simulator generates the following physical metrics for each device:

| Metric | Unit | Description | Expected Range (Base) |
| :--- | :--- | :--- | :--- |
| **Temperature** | **°C** *(Celsius)* | The internal operating temperature of the device. | 20°C - 150°C |
| **Vibration** | **mm/s** *(Millimeters per second)* | The mechanical vibration velocity, indicating wear or imbalance. | 0.0 - 15.0 mm/s |
| **Current** | **A** *(Amperes)* | The electrical current draw of the motor/pump. | 0.0 - 100.0 A |

---

## ⚙️ Configuration

The simulator is configured entirely via environment variables:

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `API_URL` | `http://axion-ingestion-service.default.svc.cluster.local:80/api/v1/telemetry/ingest` | The full endpoint URL of the Axion Ingestion Service. |
| `INTERVAL_SECONDS` | `5` | How often (in seconds) the simulator generates and sends a new batch of data. |

---

## 🚀 Getting Started

### Local Execution
To run the simulator locally on your machine:

```bash
# 1. Install requirements
pip install -r requirements.txt

# 2. Set environment variables (optional, defaults to Kubernetes internal URL)
export API_URL="http://localhost:8000/api/v1/telemetry/ingest"
export INTERVAL_SECONDS="2"

# 3. Run the script
python simulator.py
```

### Kubernetes Deployment
The service is designed to be deployed via ArgoCD using the manifests stored in the `axion-gitops` repository. It deploys as a standard `Deployment` with 1 replica and requires no incoming `Service` or `Ingress` since it acts purely as a client.

---

## 🐳 Docker
The image is automatically built and pushed to Docker Hub via GitHub Actions.
- **Image**: `devopsinsiders/axion-data-simulator:latest`
