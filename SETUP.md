# Setup Guide - Paskibra Scoring System

## ⚠️ PostgreSQL Required

Sistem ini memerlukan PostgreSQL untuk berjalan. Berikut cara setup:

### Option 1: Install PostgreSQL (Recommended)

#### Windows

1. Download PostgreSQL dari: https://www.postgresql.org/download/windows/
2. Install dengan default settings
3. Catat password yang Anda buat untuk user `postgres`
4. Setelah install, PostgreSQL akan berjalan sebagai service

#### Verify Installation

```bash
psql --version
```

### Option 2: Gunakan Docker (Alternative)

```bash
# Pull PostgreSQL image
docker pull postgres:14

# Run PostgreSQL container
docker run --name paskibra-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:14
```

---

## 🚀 Setup Steps

### 1. Configure Backend Environment

Edit file `backend/.env`:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=paskibra_scoring
DB_USER=postgres
DB_PASSWORD=postgres  # Ganti dengan password Anda

JWT_SECRET=paskibra_secret_key_2025
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### 2. Create Database

**Option A: Using psql command**

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE paskibra_scoring;

# Exit
\q
```

**Option B: Using pgAdmin**

1. Buka pgAdmin
2. Right-click pada Databases
3. Create → Database
4. Name: `paskibra_scoring`
5. Save

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Seed Database

```bash
# Run seeder to create tables and sample data
node src/utils/seed.js
```

This will create:

- Database tables (users, competitions, criteria, participants, scores)
- Admin account: `admin` / `admin123`
- Jury accounts: `juri1`, `juri2`, `juri3` / `jury123`
- 4 Competition categories
- 10 Sample participants (PSK001-PSK010)

### 5. Start Backend Server

```bash
npm run dev
```

Backend will run on: http://localhost:5000

### 6. Start Frontend (Already Running)

Frontend is already running on: http://localhost:5173

---

## 🧪 Testing the System

### 1. Open Browser

Navigate to: http://localhost:5173

### 2. Test Landing Page

- View competition categories
- Try searching for participant (PSK001)

### 3. Test Login

**As Admin:**

- Click "Login Juri"
- Username: `admin`
- Password: `admin123`
- You'll be redirected to Admin Dashboard

**As Jury:**

- Username: `juri1`
- Password: `jury123`
- You'll be redirected to Jury Dashboard

### 4. Test Jury Scoring

1. Login as `juri1`
2. Select competition (e.g., "Peraturan Baris Berbaris")
3. Select participant (e.g., "Tim 1 - PSK001")
4. Input scores for each criteria (0-100)
5. Submit

### 5. Test Real-time Results

1. Open another browser/tab
2. Go to landing page
3. Search for participant: PSK001
4. You should see the scores you just entered
5. Try submitting more scores from jury dashboard
6. Watch the result page update automatically!

---

## 🔧 Troubleshooting

### Backend won't start

- Check if PostgreSQL is running
- Verify database credentials in `.env`
- Make sure database `paskibra_scoring` exists

### Database connection error

```bash
# Check PostgreSQL service status (Windows)
# Open Services app and look for "postgresql-x64-14"

# Or restart PostgreSQL service
net stop postgresql-x64-14
net start postgresql-x64-14
```

### Port 5000 already in use

Edit `backend/.env`:

```env
PORT=5001  # Change to different port
```

Then update `frontend/.env`:

```env
VITE_API_URL=http://localhost:5001/api
VITE_SOCKET_URL=http://localhost:5001
```

---

## 📝 Quick Commands

```bash
# Backend
cd backend
npm run dev          # Start server
node src/utils/seed.js  # Seed database

# Frontend (already running)
cd frontend
npm run dev          # Start dev server
```

---

## 🎯 Next Steps

1. Install PostgreSQL
2. Create database
3. Update `.env` with your database credentials
4. Run seeder
5. Start backend server
6. Test the complete system!

---

**Need help? Check the main [README.md](../README.md) for more details.**
