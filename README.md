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

## 🏗️ Project Architecture

This project is divided into two main parts:

```text
SugarCane-Frontend/
├── public/                 # Static assets and icons
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components (Navbar, buttons, cards)
│   ├── context/            # Auth and application state
│   ├── pages/              # Pages (Dashboard, Map, Fields, Login, Profile)
│   └── services/           # Backend API connection
├── SugarCane-Backend/      # Backend Node.js / Express API
│   ├── config/             # Database connection (MongoDB)
│   ├── controllers/        # Route logic (Auth, Predictions, Slots, Feedback)
│   ├── models/             # Database schemas (User, Slot, Prediction, Feedback)
│   ├── routes/             # API routes
│   └── server.js           # Server entry point
└── package.json            # Frontend dependencies and scripts
```

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Lucide Icons, Leaflet (interactive maps), Recharts.
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JSON Web Tokens (JWT), Nodemailer.
- **AI Service:** Flask prediction microservice (computes satellite indices and yield forecasts).

---

## 🚀 Quick Start Guide

### Prerequisites
Make sure you have installed on your computer:
- [Node.js](https://nodejs.org/) (version 18 or newer recommended)
- [MongoDB](https://www.mongodb.com/) (local database or a free MongoDB Atlas connection string)

---

### Step 1: Start the Backend

1. Open your terminal and go to the backend folder:
   ```bash
   cd SugarCane-Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file inside `SugarCane-Backend/` with the following settings:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   FLASK_API_URL=http://localhost:5001/predict
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   ```

4. Run the backend server:
   ```bash
   npm run dev
   ```
   *The backend will start at `http://localhost:5000`.*

---

### Step 2: Start the Frontend

1. Open a new terminal in the root project folder (`SugarCane-Frontend`):
   ```bash
   cd SugarCane-Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. *(Optional)* If your backend runs on a different address, create a `.env` file in the root folder:
   ```env
   VITE_API_BASE=http://localhost:5000
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *Open your browser and navigate to the local link shown (typically `http://localhost:5173`).*

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

---

## 💡 Notes for Developers

- **AI Microservice:** For full yield calculations and satellite vegetation indices, run the accompanying Flask ML service on port `5001`.
- **Map Interaction:** Leaflet allows clicking and drawing polygon boundaries directly on the field mapping page.

---

## 🔮 Roadmap & Proposed Features

Looking for ideas on how to expand this project? Check out the [FEATURE_SUGGESTIONS.md](file:///c:/Users/Sohail%20Khalid/Downloads/SugarCane-Frontend/FEATURE_SUGGESTIONS.md) guide for high-impact add-ons like weather & smart irrigation, AI leaf disease detection, and WhatsApp alerts.

