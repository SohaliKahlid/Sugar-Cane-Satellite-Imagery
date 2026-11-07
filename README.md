# 🌾 SugarCane Smart Farming Platform

A smart web application designed to help sugarcane farmers monitor their crops, analyze field health, and predict harvest yields using satellite imagery and AI.

---

## 📖 What is this Project?

The **SugarCane Smart Farming Platform** brings modern technology to agriculture. Instead of guessing crop health, farmers can draw their field boundaries on a live satellite map, monitor vegetation health indices (NDVI, GNDVI, EVI), track growth cycles, and receive AI-powered yield predictions to make informed farming decisions.

---

## ✨ Key Features

- **🗺️ Interactive Field Mapping**  
  Easily locate and draw your farm plot boundaries directly on a satellite map.

- **📊 Smart Dashboard & Health Monitoring**  
  View real-time vegetation health metrics (NDVI, GNDVI, and EVI) and growth charts to spot dry or diseased areas early.

- **🤖 AI Yield Prediction**  
  Get automated harvest yield forecasts calculated from field boundaries and crop dates.

- **🌱 Crop & Field Management**  
  Save multiple field slots, track crop types, planting dates, and monitor past history in one place.

- **🔒 User Authentication & Profiles**  
  Secure registration and login, password reset via email, and personal profile management.

- **💬 Feedback System**  
  Send feedback and suggestions directly from the dashboard.

---

## 🏗️ Project Architecture (Monorepo)

```text
SugarCane-Platform/
├── frontend/                   # Frontend React + Vite application
│   ├── public/                 # Static assets, icons, and illustrations
│   ├── src/                    # UI Components, pages, auth context & services
│   ├── vite.config.js          # Vite build config
│   └── package.json            # Frontend dependencies
│
├── backend/                    # Backend Node.js / Express REST API
│   ├── config/                 # MongoDB Atlas connection
│   ├── controllers/            # Route controllers (Auth, Predictions, Slots, Feedback)
│   ├── models/                 # Mongoose schemas (User, Slot, Prediction, Feedback)
│   ├── routes/                 # API endpoint routers
│   ├── server.js               # Server entry point (Current: Port 5005 | Original: Port 5000)
│   └── package.json            # Backend dependencies
│
├── ai-service/                 # Python Flask Satellite & AI Microservice
│   ├── app.py                  # Flask service entry point (Port 5001)
│   ├── satellite_service.py    # Sentinel-2 vegetation index & yield computation
│   └── requirements.txt        # Python dependencies
│
├── run-all.js                  # Cross-platform runner to launch all 3 services together
├── package.json                # Root monorepo scripts
└── README.md
```

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Lucide Icons, Leaflet (interactive maps), Recharts.
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JSON Web Tokens (JWT), Nodemailer.
- **AI Service:** Python, Flask, Flask-CORS, NumPy (computes satellite indices and yield forecasts).

---

## 🚀 Quick Start Guide

### Prerequisites
Make sure you have installed on your computer:
- [Node.js](https://nodejs.org/) (version 18 or newer recommended)
- [Python](https://www.python.org/) (version 3.10 or newer)
- [MongoDB](https://www.mongodb.com/) (local database or free MongoDB Atlas cluster)

---

### ⚡ Method 1: Run All Services with One Command (Recommended)

1. Open a terminal in the project root:
   ```bash
   npm run dev
   ```
2. This automatically launches:
   - 🛰️ **AI Satellite Service** at `http://localhost:5001` (Original: `5001`)
   - ⚙️ **Backend API** at `http://localhost:5005` (Original: `5000`)
   - 🖥️ **Frontend Web App** at `http://localhost:5175` (Original: `5173`)

---

### 🛠️ Method 2: Run Services Individually

#### 1. AI Satellite Service (Current & Original Port: 5001)
```bash
cd ai-service
# Activate your python virtual environment
python app.py
```

#### 2. Backend API (Current Port: 5005 | Original Port: 5000)
```bash
cd backend
npm install
npm start
```
*(Make sure `backend/.env` has your `MONGO_URI` and `JWT_SECRET` configured from `backend/.env.example`)*

#### 3. Frontend Web App (Current Port: 5175 | Original Port: 5173)
```bash
cd frontend
npm install
npm run dev
```

---

## 📡 API Overview

| Route | Method | Description |
|---|---|---|
| `/api/auth/register` | `POST` | Create a new user account |
| `/api/auth/login` | `POST` | Log into an existing account |
| `/api/auth/forgot-password` | `POST` | Send password reset email |
| `/api/slots` | `GET`, `POST` | Get all field plots or add a new field slot |
| `/api/predictions/:slotId` | `POST` | Request AI prediction for a specific field slot |
| `/api/predictions` | `GET` | Get historical predictions for the user |
| `/api/feedback` | `POST` | Submit feedback |
| `http://localhost:5001/predict` | `POST` | AI vegetation & crop yield microservice |

---

## 🔮 Roadmap & Proposed Features

Looking for ideas on how to expand this project? Check out the [FEATURE_SUGGESTIONS.md](file:///c:/Users/Sohail%20Khalid/Downloads/SugarCane-Frontend/FEATURE_SUGGESTIONS.md) guide for high-impact add-ons like weather & smart irrigation, AI leaf disease detection, and WhatsApp alerts.
