# 📋 Commands Reference

## First Time Setup

```bash
# 1. Install frontend dependencies
npm --prefix frontend install

# 2. Install backend dependencies
npm --prefix backend install

# 3. Create backend environment file
copy backend\.env.example backend\.env
# Then edit backend\.env and fill in your MONGO_URI, JWT_SECRET, etc.

# 4. Create AI service environment file
copy ai-service\.env.example ai-service\.env

# 5. Set up Python virtual environment (from project root)
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # Mac / Linux

# 6. Install Python dependencies
pip install -r ai-service\requirements.txt
```

---

## Run the Project

```bash
# Start ALL 3 services at once (recommended)
npm run dev
```

**Or run individually:**

```bash
# Frontend only (Port 5173)
npm run dev:frontend

# Backend only (Port 5000)
npm run dev:backend

# AI Service only (Port 5001)
npm run dev:ai
```

---

## Git Commands

```bash
# Check what has changed
git status

# Stage all changes
git add .

# Commit changes
git commit -m "your message here"

# Push to GitHub
git push origin main

# Pull latest from GitHub
git pull origin main
```

---

## Useful Checks

```bash
# Test AI service is running
curl http://localhost:5001/health

# Test backend is running
curl http://localhost:5000

# Check which ports are in use (Windows)
netstat -ano | findstr "5000 5001 5173"
```

---

## URLs When Running

| Service | URL |
|---|---|
| Frontend Web App | http://localhost:5173 |
| Backend API | http://localhost:5000 |
| AI Satellite Service | http://localhost:5001 |
| AI Health Check | http://localhost:5001/health |

