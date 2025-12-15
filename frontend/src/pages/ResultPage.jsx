import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import api from '../utils/api';
import { getSocket } from '../utils/socket';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ResultPage.css';

export default function ResultPage() {
  const { participantNumber } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResults();

    // Setup Socket.IO for real-time updates
    const socket = getSocket();
    socket.on('score:updated', handleScoreUpdate);

    return () => {
      socket.off('score:updated', handleScoreUpdate);
    };
  }, [participantNumber]);

  const fetchResults = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get(`/scores/results/${participantNumber}`);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Gagal memuat data peserta');
    } finally {
      setLoading(false);
    }
  };

  const handleScoreUpdate = (update) => {
    if (data && update.participantId === data.participant.id) {
      // Refresh data when score is updated
      fetchResults();
    }
  };

  if (loading) {
    return (
      <div className="result-page">
        <Navbar />
        <div className="container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Memuat hasil penilaian...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="result-page">
        <Navbar />
        <div className="container">
          <div className="error-container">
            <h2>❌ {error}</h2>
            <button onClick={() => navigate('/')} className="btn btn-primary">
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { participant, results, overallTotal } = data;

  return (
    <div className="result-page">
      <Navbar />

      <div className="result-header">
        <div className="container">
          <div className="result-header-content">
            <div className="participant-info">
              <h1 className="participant-name">{participant.team_name}</h1>
              <p className="participant-number">Nomor Peserta: {participant.participant_number}</p>
              {participant.school_name && (
                <p className="participant-school">{participant.school_name}</p>
              )}
            </div>
            <div className="qr-code-container">
              <QRCodeSVG value={participant.participant_number} size={120} />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="results-container">
          <div className="total-score-card">
            <h3>Total Nilai Keseluruhan</h3>
            <div className="total-score">{overallTotal.toFixed(2)}</div>
            <div className="live-badge animate-pulse">
              <span className="live-dot"></span>
              <span>Live Update</span>
            </div>
          </div>

          {results.length > 0 ? (
            <div className="competitions-results">
              {results.map((result) => (
                <div key={result.competition.id} className="competition-result card">
                  <div className="competition-result-header">
                    <h3>{result.competition.name}</h3>
                    <div className="competition-total">
                      {result.totalScore.toFixed(2)}
                    </div>
                  </div>

                  <div className="scores-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Kriteria</th>
                          <th>Bobot</th>
                          <th>Nilai</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.scores.map((score) => (
                          <tr key={score.id}>
                            <td>{score.criteria_name}</td>
                            <td>{score.weight}%</td>
                            <td className="score-value">{parseFloat(score.score).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>Belum ada nilai yang diinput untuk peserta ini</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
