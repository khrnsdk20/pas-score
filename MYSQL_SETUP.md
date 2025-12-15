# MySQL Setup Guide - Paskibra Scoring System

## 📋 Prerequisites

- MySQL Server (XAMPP, WAMP, atau MySQL standalone)
- Node.js installed

## 🚀 Quick Setup

### Step 1: Start MySQL Server

**Jika menggunakan XAMPP:**

1. Buka XAMPP Control Panel
2. Start Apache dan MySQL
3. MySQL akan berjalan di port 3306

**Jika menggunakan MySQL standalone:**

```bash
# Start MySQL service
net start MySQL80
```

### Step 2: Create Database

**Option A: Via phpMyAdmin (XAMPP)**

1. Buka http://localhost/phpmyadmin
2. Klik "New" di sidebar kiri
3. Database name: `pas_score`
4. Collation: `utf8mb4_general_ci`
5. Klik "Create"

**Option B: Via MySQL Command Line**

```bash
mysql -u root -p

# Di MySQL prompt:
CREATE DATABASE pas_score CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
exit;
```

### Step 3: Update .env (Sudah Dikonfigurasi)

File `backend/.env` sudah diupdate:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=pas_score
DB_USER=root
DB_PASSWORD=
```

**Catatan:** Jika MySQL Anda memiliki password, update `DB_PASSWORD`

### Step 4: Install Dependencies & Seed Database

```bash
cd backend

# Install dependencies (sudah termasuk mysql2)
npm install

# Seed database (create tables & sample data)
node src/utils/seed.js
```

### Step 5: Start Backend Server

```bash
npm run dev
```

Backend akan berjalan di: **http://localhost:5000**

### Step 6: Test Login

Buka browser: **http://localhost:5173/login**

**Login sebagai Admin:**

- Username: `admin`
- Password: `admin123`

**Login sebagai Juri:**

- Username: `juri1`, `juri2`, atau `juri3`
- Password: `jury123`

---

## ✅ Verification Checklist

- [ ] MySQL server running (XAMPP/standalone)
- [ ] Database `pas_score` created
- [ ] Backend dependencies installed
- [ ] Database seeded (tables + sample data)
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 5173
- [ ] Login berhasil

---

## 🐛 Troubleshooting

### "ER_BAD_DB_ERROR: Unknown database 'pas_score'"

```bash
# Create database manually
mysql -u root -p
CREATE DATABASE pas_score;
exit;
```

### "ER_ACCESS_DENIED_ERROR"

Update password di `backend/.env`:

```env
DB_PASSWORD=your_mysql_password
```

### "ECONNREFUSED"

- Pastikan MySQL server running
- Cek di XAMPP Control Panel atau Services

### Port 5000 sudah digunakan

Update `backend/.env`:

```env
PORT=5001
```

Dan update `frontend/.env`:

```env
VITE_API_URL=http://localhost:5001/api
VITE_SOCKET_URL=http://localhost:5001
```

---

## 📊 Database Tables

Setelah seeding, database akan memiliki:

1. **users** - 4 users (1 admin, 3 jury)
2. **competitions** - 4 competition categories
3. **criteria** - 20 criteria (5 per competition)
4. **participants** - 10 sample participants
5. **scores** - Empty (akan diisi saat jury input nilai)

---

## 🎯 Next Steps

1. ✅ MySQL running
2. ✅ Database `pas_score` created
3. ✅ Run `node src/utils/seed.js`
4. ✅ Run `npm run dev` di backend
5. ✅ Test login di http://localhost:5173

**Sistem siap digunakan!** 🎉
