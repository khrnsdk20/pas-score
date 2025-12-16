import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() { 
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <div className="logo">
              <div className="logo-icon">🏆</div>
              <div className="logo-text-container">
                <div className="logo-title">Lomba Paskibra 2025</div>
                <div className="logo-subtitle">Sistem Penilaian Digital</div>
              </div>
            </div>
          </Link>

          <div className="navbar-menu">
            {isAuthenticated ? (
              <>
                <Link 
                  to={user.role === 'admin' ? '/admin' : '/jury'} 
                  className="btn btn-primary"
                >
                  Dashboard {user.role === 'admin' ? 'Admin' : 'Juri'}
                </Link>
                <button onClick={logout} className="btn btn-outline-red">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-text">
                  Login Juri
                </Link>
                <Link to="/admin" className="btn btn-primary">
                  Login Admin
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
