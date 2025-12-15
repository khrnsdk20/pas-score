import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CompetitionCard from '../components/CompetitionCard';
import ResultChecker from '../components/ResultChecker';
import Footer from '../components/Footer';
import api from '../utils/api';
import './Landing.css';

export default function Landing() {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    try {
      const response = await api.get('/competitions');
      setCompetitions(response.data.competitions || []);
    } catch (error) {
      console.error('Error fetching competitions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-page">
      <Navbar />
      <Hero />

      <section className="competitions-section">
        <div className="container">
          <h2 className="section-title text-center">Cabang Lomba</h2>
          <p className="section-description text-center">
            Kompetisi Paskibra terdiri dari berbagai kategori penilaian
          </p>

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Memuat data lomba...</p>
            </div>
          ) : competitions.length > 0 ? (
            <div className="grid grid-4">
              {competitions.map((competition, index) => (
                <CompetitionCard key={competition.id} competition={competition} index={index} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>Belum ada cabang lomba yang tersedia</p>
            </div>
          )}
        </div>
      </section>

      <ResultChecker />
      <Footer />
    </div>
  );
}
