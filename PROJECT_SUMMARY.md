# 🌾 SugarCane Smart Farming Platform — Project Summary

## What It Does
A web platform that helps sugarcane farmers monitor crop health and predict harvest yields using satellite imagery and AI.

---

## Three Services

| Service | Folder | Port | Tech |
|---|---|---|---|
| Web App (Frontend) | `frontend/` | 5173 | React, Vite, Tailwind CSS, Leaflet |
| REST API (Backend) | `backend/` | 5000 | Node.js, Express, MongoDB |
| AI Microservice | `ai-service/` | 5001 | Python, Flask |

---

## Key Features
- 🗺️ Draw field boundaries on a live satellite map
- 📊 View NDVI, GNDVI, and EVI vegetation health scores
- 🤖 AI-powered crop yield predictions (tons/hectare)
- 🔒 User login, registration, and password reset via email
- 💬 Feedback submission system

---

## How to Run

```bash
# Install dependencies first (once only)
npm --prefix frontend install
npm --prefix backend install

# Start everything
npm run dev
```

That launches all 3 services at once.

---

## Folder Structure

```
├── frontend/        React web app
├── backend/         Node.js API + MongoDB
├── ai-service/      Python satellite & yield prediction
├── venv/            Python virtual environment
├── run-all.js       Launches all 3 services together
└── package.json     Root monorepo config
```

---

## Environment Files
Each service needs a `.env` file (not committed to Git):
- `backend/.env` — MongoDB URI, JWT secret, Flask URL
- `ai-service/.env` — Port (default: 5001)

Copy from the `.env.example` files in each folder.

---

## GitHub
🔗 [https://github.com/SohaliKahlid/Sugar-Cane-Satellite-Imagery](https://github.com/SohaliKahlid/Sugar-Cane-Satellite-Imagery)

