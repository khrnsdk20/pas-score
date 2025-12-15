# Paskibra Scoring System - Quick Start

## 🚀 Langkah Cepat

### 1. Install PostgreSQL

Download dan install dari: https://www.postgresql.org/download/windows/

**Atau gunakan Docker:**

```bash
docker run --name paskibra-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:14
```

### 2. Setup Database & Backend

**Otomatis (Recommended):**

```bash
# Double-click file ini:
setup.bat
```

**Manual:**

```bash
# Create database
psql -U postgres -c "CREATE DATABASE paskibra_scoring;"

# Install & seed
cd backend
npm install
node src/utils/seed.js
```

### 3. Start Servers

**Otomatis:**

```bash
# Double-click file ini:
start.bat
```

**Manual:**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 4. Buka Browser

```
http://localhost:5173
```

---

## 🔑 Default Login

**Admin:**

- Username: `admin`
- Password: `admin123`

**Juri:**

- Username: `juri1`, `juri2`, `juri3`
- Password: `jury123`

**Peserta Contoh:**

- PSK001 sampai PSK010

---

## 📚 Dokumentasi Lengkap

- [SETUP.md](SETUP.md) - Panduan setup detail
- [README.md](README.md) - Dokumentasi lengkap

---

## ⚡ Troubleshooting Cepat

**Backend error?**

- Pastikan PostgreSQL running
- Cek credentials di `backend/.env`
- Pastikan database `paskibra_scoring` sudah dibuat

**Port conflict?**

- Ubah PORT di `backend/.env`
- Update VITE_API_URL di `frontend/.env`

---

**Butuh bantuan? Baca [SETUP.md](SETUP.md)**
