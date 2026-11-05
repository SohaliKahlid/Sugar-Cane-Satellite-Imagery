# 🛰️ SugarCane Satellite Imagery & AI Yield Prediction Service

A Python Flask microservice providing satellite vegetation health indices (NDVI, GNDVI, EVI) and AI-driven harvest yield forecasting for sugarcane crop management.

This service integrates with the **SugarCane-Backend** and **SugarCane-Frontend** platform.

---

## 🚀 Features

- **Vegetation Health Indices**: Calculates NDVI, GNDVI, and EVI based on field coordinates and seasonal progression.
- **Sugarcane Yield Prediction**: Forecasts estimated sugarcane harvest tonnage (tons/hectare).
- **Time-Series Growth Analytics**: Generates 12-month projections for NDVI, precipitation (mm), and Growing Degree Days (GDD).
- **Automated Health Status & Agronomic Advice**: Evaluates canopy vigor and issues actionable farming recommendations.

---

## 🛠️ Setup & Installation

### 1. Create a Python Virtual Environment
```bash
python -m venv venv
```

Activate the environment:
- **Windows (Command Prompt / PowerShell)**:
  ```powershell
  .\venv\Scripts\activate
  ```
- **macOS / Linux**:
  ```bash
  source venv/bin/activate
  ```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 4. Run the Service
```bash
python app.py
```
*The service will start at `http://localhost:5001`.*

---

## 📡 API Endpoints

### 1. Health Check
- **URL**: `GET /health`
- **Response**:
  ```json
  {
    "status": "healthy",
    "service": "satellite-imagery-api"
  }
  ```

### 2. Field Prediction
- **URL**: `POST /predict`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "boundary": {
      "type": "Polygon",
      "coordinates": [
        [
          [73.123, 31.456],
          [73.128, 31.456],
          [73.128, 31.459],
          [73.123, 31.459],
          [73.123, 31.456]
        ]
      ]
    },
    "from": "2025-01-15"
  }
  ```
- **Response**:
  ```json
  {
    "ndvi": 0.724,
    "gndvi": 0.681,
    "evi": 0.637,
    "health_status": "Excellent",
    "predicted_yield": 91.2,
    "yield_unit": "tons/ha",
    "field_area_hectares": 2.85,
    "recommendation": "Canopy is vigorous with high chlorophyll density. Maintain current irrigation schedule.",
    "ndvi_series": [0.393, 0.465, 0.538, 0.631, 0.724, 0.807, 0.776, 0.714, 0.641, 0.559, 0.476, 0.414],
    "precipitation_series": [25.0, 42.0, 68.0, 115.0, 150.0, 172.0, 145.0, 110.0, 80.0, 48.0, 30.0, 18.0],
    "gdd_series": [180.0, 420.0, 780.0, 1250.0, 1850.0, 2360.0, 2820.0, 3210.0, 3550.0, 3860.0, 4120.0, 4350.0],
    "satellite_provider": "Sentinel-2 / MSI",
    "timestamp": "2026-10-28T12:00:00Z"
  }
  ```
