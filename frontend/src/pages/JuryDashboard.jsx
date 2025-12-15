import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './JuryDashboard.css';

export default function JuryDashboard() {
  const { user, isJury } = useAuth();
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [criteria, setCriteria] = useState([]);
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCompetitions();
  }, []);

  useEffect(() => {
    if (selectedCompetition) {
      fetchParticipants();
    }
  }, [selectedCompetition]);

  const fetchCompetitions = async () => {
    try {
      const response = await api.get('/competitions');
      setCompetitions(response.data.competitions || []);
    } catch (error) {
      console.error('Error fetching competitions:', error);
    }
  };

  const fetchParticipants = async () => {
    try {
      const response = await api.get('/participants');
      setParticipants(response.data.participants || []);
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };

  const handleCompetitionSelect = (competition) => {
    setSelectedCompetition(competition);
    setSelectedParticipant(null);
    setCriteria(competition.criteria || []);
    setScores({});
  };

  const handleParticipantSelect = (participant) => {
    setSelectedParticipant(participant);
    setScores({});
  };

  const handleScoreChange = (criteriaId, value) => {
    setScores(prev => ({
      ...prev,
      [criteriaId]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Submit all scores
      for (const [criteriaId, score] of Object.entries(scores)) {
        await api.post('/scores', {
          participantId: selectedParticipant.id,
          competitionId: selectedCompetition.id,
          criteriaId: parseInt(criteriaId),
          score: parseFloat(score)
        });
      }

      setMessage('✅ Nilai berhasil disimpan!');
      setScores({});
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ Gagal menyimpan nilai: ' + (error.response?.data?.error || 'Error'));
    } finally {
      setLoading(false);
    }
  };

  if (!isJury) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="dashboard-page">
      <Navbar />
      
      <div className="dashboard-header">
        <div className="container">
          <h1>Dashboard Juri</h1>
          <p>Selamat datang, {user.fullName || user.username}</p>
        </div>
      </div>

      <div className="container">
        <div className="jury-content">
          {!selectedCompetition ? (
            <div className="selection-step">
              <h2 className="text-center">Pilih Kategori Lomba</h2>
              <div className="grid grid-2">
                {competitions.map((comp) => (
                  <div 
                    key={comp.id} 
                    className="selection-card card"
                    onClick={() => handleCompetitionSelect(comp)}
                  >
                    <h3>{comp.name}</h3>
                    <p>{comp.description}</p>
                    <p className="text-gray">
                      {comp.criteria?.length || 0} kriteria penilaian
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : !selectedParticipant ? (
            <div className="selection-step">
              <button 
                className="btn btn-secondary"
                onClick={() => setSelectedCompetition(null)}
              >
                ← Kembali
              </button>
              <h2 className="text-center">Pilih Peserta - {selectedCompetition.name}</h2>
              <div className="participants-list">
                {participants.map((participant) => (
                  <div 
                    key={participant.id}
                    className="participant-item card"
                    onClick={() => handleParticipantSelect(participant)}
                  >
                    <div>
                      <h4>{participant.team_name}</h4>
                      <p className="text-gray">{participant.participant_number}</p>
                      {participant.school_name && (
                        <p className="text-gray">{participant.school_name}</p>
                      )}
                    </div>
                    <span className="arrow">→</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="scoring-step">
              <button 
                className="btn btn-secondary"
                onClick={() => setSelectedParticipant(null)}
              >
                ← Kembali
              </button>
              
              <div className="scoring-header">
                <h2>Input Nilai</h2>
                <div className="scoring-info">
                  <p><strong>Lomba:</strong> {selectedCompetition.name}</p>
                  <p><strong>Peserta:</strong> {selectedParticipant.team_name} ({selectedParticipant.participant_number})</p>
                </div>
              </div>

              {message && (
                <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="scoring-form">
                {criteria.map((criterion) => (
                  <div key={criterion.id} className="score-input-group">
                    <label>
                      <span className="criterion-name">{criterion.name}</span>
                      <span className="criterion-weight">Bobot: {criterion.weight}%</span>
                      <span className="criterion-max">Max: {criterion.maxScore}</span>
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      min="0"
                      max={criterion.maxScore}
                      step="0.01"
                      value={scores[criterion.id] || ''}
                      onChange={(e) => handleScoreChange(criterion.id, e.target.value)}
                      required
                      placeholder={`0 - ${criterion.maxScore}`}
                    />
                  </div>
                ))}

                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg w-full"
                  disabled={loading}
                >
                  {loading ? 'Menyimpan...' : 'Simpan Nilai'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
