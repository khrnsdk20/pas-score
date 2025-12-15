import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <h3 className="footer-title">Diselenggarakan oleh</h3>
          <p className="footer-organizer">Panitia Lomba Paskibra Tingkat Nasional 2025</p>
          <p className="footer-copyright">© {currentYear} Sistem Penilaian Lomba Paskibra</p>
        </div>
      </div>
    </footer>
  );
}
