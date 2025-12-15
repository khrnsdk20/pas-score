import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResultChecker.css';

export default function ResultChecker() {
  const [participantNumber, setParticipantNumber] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (participantNumber.trim()) {
      navigate(`/result/${participantNumber}`);
    }
  };

  return (
    <section className="result-checker">
      <div className="container">
        <div className="result-checker-content">
          <div className="search-icon">🔍</div>
          
          <h2 className="section-title">Cek Hasil Penilaian Anda</h2>
          <p className="section-description">
            Masukkan nomor peserta untuk melihat hasil nilai secara real-time
          </p>

          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              className="form-input search-input"
              placeholder="Contoh: 001"
              value={participantNumber}
              onChange={(e) => setParticipantNumber(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-search">
              🔍 Cari
            </button>
          </form>

          <div className="search-options">
            <div className="option-card qr-option">
              <div className="option-icon">📱</div>
              <div className="option-content">
                <h4>Via QR Code</h4>
                <p>Scan QR Code yang diberikan oleh panitia untuk akses langsung ke hasil nilai Anda</p>
              </div>
            </div>

            <div className="option-card search-option">
              <div className="option-icon">🔍</div>
              <div className="option-content">
                <h4>Via Pencarian</h4>
                <p>Masukkan nomor peserta Anda di form pencarian untuk melihat detail hasil penilaian</p>
              </div>
            </div>
          </div>

          <div className="demo-info">
            <strong>Demo:</strong> Coba nomor peserta: 001, 002, 004, atau 006
          </div>
        </div>
      </div>
    </section>
  );
}
