# 🏆 Sistem Penilaian Lomba Paskibra

Sistem penilaian digital real-time untuk kompetisi Paskibra dengan fitur transparan, mudah digunakan, dan terintegrasi dengan QR Code.

## 🎯 Fitur Utama

### Untuk Peserta

- ✅ Cek hasil penilaian dengan nomor peserta
- 📱 Scan QR Code untuk akses cepat
- 🔴 Update nilai real-time tanpa refresh
- 📊 Lihat detail nilai per kategori lomba

### Untuk Juri

- 🎯 Input nilai per kriteria penilaian
- ⚡ Sistem real-time dengan Socket.IO
- 📝 Interface yang mudah dan intuitif
- 🔐 Akses terproteksi dengan JWT

### Untuk Admin

- 👥 Kelola data peserta
- 🏆 Kelola kategori lomba dan kriteria
- ⚖️ Kelola akun juri
- ⚙️ Atur bobot nilai
- 📈 Monitor semua penilaian

## 🛠️ Tech Stack

### Backend

- **Node.js** + **Express.js** - REST API
- **PostgreSQL** - Database
- **Socket.IO** - Real-time updates
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **QRCode** - QR code generation

### Frontend

- **React.js** + **Vite** - UI Framework
- **React Router** - Routing
- **Axios** - HTTP client
- **Socket.IO Client** - Real-time connection
- **QRCode.react** - QR code display

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### 1. Clone Repository

```bash
cd d:\satu\pas-scor
```

### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit .env file with your database credentials
DB_HOST=localhost
DB_PORT=5432
DB_NAME=paskibra_scoring
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_secret_key
PORT=5000
```

### 3. Setup Database

```bash
# Create PostgreSQL database
createdb paskibra_scoring

# Or using psql
psql -U postgres
CREATE DATABASE paskibra_scoring;
\q
```

### 4. Seed Database

```bash
# Run seeder to create initial data
node src/utils/seed.js
```

This will create:

- **Admin account**: username: `admin`, password: `admin123`
- **Jury accounts**: username: `juri1`, `juri2`, `juri3`, password: `jury123`
- **4 Competition categories** with criteria
- **10 Sample participants** (PSK001 - PSK010)

### 5. Start Backend Server

```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### 6. Setup Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🚀 Usage

### 1. Access Landing Page

Open `http://localhost:5173` in your browser

### 2. Login as Admin

- Navigate to Login page
- Username: `admin`
- Password: `admin123`
- Access Admin Dashboard

### 3. Login as Jury

- Username: `juri1` (or juri2, juri3)
- Password: `jury123`
- Select competition category
- Select participant
- Input scores

### 4. Check Results

- Enter participant number (e.g., PSK001)
- Click "Cari" or scan QR code
- View real-time scores

## 📁 Project Structure

```
pas-scor/
├── backend/
│   ├── src/
│   │   ├── config/          # Database & Socket.IO config
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Auth & role check
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Helpers & seed script
│   │   └── server.js        # Main server file
│   ├── .env                 # Environment variables
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/      # Reusable components
    │   ├── pages/           # Page components
    │   ├── context/         # React Context (Auth)
    │   ├── utils/           # API & Socket utilities
    │   ├── App.jsx          # Main App component
    │   └── index.css        # Global styles
    ├── .env                 # Environment variables
    └── package.json
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/login` - Login
- `POST /api/auth/users` - Create user (admin only)
- `GET /api/auth/users` - Get all users (admin only)

### Participants

- `GET /api/participants` - Get all participants (admin)
- `POST /api/participants` - Create participant (admin)
- `PUT /api/participants/:id` - Update participant (admin)
- `DELETE /api/participants/:id` - Delete participant (admin)
- `GET /api/participants/number/:participantNumber` - Get by number (public)

### Competitions

- `GET /api/competitions` - Get all competitions (public)
- `POST /api/competitions` - Create competition (admin)
- `PUT /api/competitions/:id` - Update competition (admin)
- `DELETE /api/competitions/:id` - Delete competition (admin)
- `POST /api/competitions/:id/criteria` - Add criteria (admin)
- `PUT /api/competitions/criteria/:id` - Update criteria (admin)
- `DELETE /api/competitions/criteria/:id` - Delete criteria (admin)

### Scores

- `POST /api/scores` - Submit score (jury/admin)
- `GET /api/scores/competition/:id` - Get scores by competition
- `GET /api/scores/results/:participantNumber` - Get participant results (public)

## 🎨 Design System

### Color Palette

- **Primary Red**: `#DC143C`
- **Secondary Red**: `#FF1744`
- **White**: `#FFFFFF`
- **Off White**: `#F8F9FA`
- **Gray**: `#6C757D`

### Typography

- **Display Font**: Poppins
- **Body Font**: Inter

## 🔒 Security

- JWT token-based authentication
- Password hashing with bcrypt
- Role-based access control (Admin/Jury)
- Protected API endpoints
- CORS configuration

## 📱 Responsive Design

- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (375px - 768px)

## 🐛 Troubleshooting

### Database Connection Error

```bash
# Check PostgreSQL is running
sudo service postgresql status

# Check credentials in .env file
```

### Port Already in Use

```bash
# Change PORT in backend/.env
# Change port in frontend/.env (VITE_API_URL)
```

### Socket.IO Connection Failed

```bash
# Ensure backend is running
# Check VITE_SOCKET_URL in frontend/.env
```

## 📝 Default Credentials

**Admin:**

- Username: `admin`
- Password: `admin123`

**Jury:**

- Username: `juri1`, `juri2`, `juri3`
- Password: `jury123`

**⚠️ IMPORTANT:** Change these credentials in production!

## 🤝 Contributing

This is a custom project for Paskibra competition scoring. For modifications or improvements, please follow the existing code structure and design patterns.

## 📄 License

ISC

## 👨‍💻 Developer Notes

### Score Calculation Logic

- Scores are averaged from all jury members per criteria
- Each criteria has a weight percentage
- Final score = Σ(average_score × weight/100)

### Real-time Updates

- Socket.IO emits `score:updated` when jury submits scores
- Result page listens and auto-refreshes data
- No manual refresh needed

### QR Code

- Generated automatically for each participant
- Stored as base64 in database
- Can be scanned to view results

---

**Built with ❤️ for Paskibra Competition 2025**
