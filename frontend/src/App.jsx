import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { initializeSocket } from './utils/socket';
import Landing from './pages/Landing';
import Login from './pages/Login';
import ResultPage from './pages/ResultPage';
import AdminDashboard from './pages/AdminDashboard';
import JuryDashboard from './pages/JuryDashboard';
import './index.css';

// Initialize Socket.IO connection
initializeSocket();

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/result/:participantNumber" element={<ResultPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/jury" element={<JuryDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
