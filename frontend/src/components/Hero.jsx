import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Sistem Penilaian Lomba Paskibra
          </h1>
          <p className="hero-description">
            Platform digital untuk memudahkan penilaian lomba Pasukan Pengibar Bendera dengan sistem yang transparan, cepat, dan akurat. Hasil nilai real-time dapat diakses melalui QR Code.
          </p>
          <div className="hero-badges">
            <div className="hero-badge">
              <span className="badge-icon">🛡️</span>
              <span>Transparan</span>
            </div>
            <div className="hero-badge">
              <span className="badge-icon">📊</span>
              <span>Real-time</span>
            </div>
            <div className="hero-badge">
              <span className="badge-icon">👥</span>
              <span>Mudah Digunakan</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
