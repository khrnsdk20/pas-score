import './CompetitionCard.css';

export default function CompetitionCard({ competition, index }) {
  const { name, description, participant_count } = competition;

  return (
    <div className="competition-card card">
      <div className="card-number">{index + 1}</div>
      <div className="card-content">
        <h3 className="card-title">{name}</h3>
        <p className="card-participants">{participant_count || 0} Tim Terdaftar</p>
      </div>
    </div>
  );
}
