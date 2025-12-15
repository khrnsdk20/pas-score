import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="dashboard-page">
      <Navbar />
      
      <div className="dashboard-header">
        <div className="container">
          <h1>Dashboard Admin</h1>
          <p>Selamat datang, {user.fullName || user.username}</p>
        </div>
      </div>

      <div className="container">
        <div className="dashboard-content">
          <div className="grid grid-3">
            <div className="dashboard-card card">
              <div className="card-icon">👥</div>
              <h3>Kelola Peserta</h3>
              <p>Tambah, edit, dan hapus data peserta lomba</p>
              <button className="btn btn-primary">Kelola</button>
            </div>

            <div className="dashboard-card card">
              <div className="card-icon">🏆</div>
              <h3>Kelola Lomba</h3>
              <p>Atur kategori lomba dan kriteria penilaian</p>
              <button className="btn btn-primary">Kelola</button>
            </div>

            <div className="dashboard-card card">
              <div className="card-icon">⚖️</div>
              <h3>Kelola Juri</h3>
              <p>Tambah dan kelola akun juri</p>
              <button className="btn btn-primary">Kelola</button>
            </div>

            <div className="dashboard-card card">
              <div className="card-icon">📊</div>
              <h3>Lihat Nilai</h3>
              <p>Monitor dan lihat semua nilai peserta</p>
              <button className="btn btn-primary">Lihat</button>
            </div>

            <div className="dashboard-card card">
              <div className="card-icon">⚙️</div>
              <h3>Pengaturan Bobot</h3>
              <p>Atur bobot nilai setiap kriteria</p>
              <button className="btn btn-primary">Atur</button>
            </div>

            <div className="dashboard-card card">
              <div className="card-icon">📈</div>
              <h3>Laporan</h3>
              <p>Unduh laporan dan statistik lomba</p>
              <button className="btn btn-primary">Unduh</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
