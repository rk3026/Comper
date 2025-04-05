import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

const trendingCompetitions = [
  {
    id: 1,
    title: 'Competition Placeholder 1',
    description: 'This is a placeholder for a trending competition.',
    startTime: 'April 10, 2025 10:00 AM',
    endTime: 'April 12, 2025 6:00 PM'
  },
  {
    id: 2,
    title: 'Competition Placeholder 2',
    description: 'This is a placeholder for a trending competition.',
    startTime: 'April 15, 2025 8:00 AM',
    endTime: 'April 16, 2025 4:00 PM'
  },
  {
    id: 3,
    title: 'Competition Placeholder 3',
    description: 'This is a placeholder for a trending competition.',
    startTime: 'April 20, 2025 12:00 PM',
    endTime: 'April 22, 2025 8:00 PM'
  }
];

export default function Homepage() {
  const navigate = useNavigate();

  const handleJoin = (competition) => {
    navigate(`/competition/${competition.id}`, { state: { competition } });
  };

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <div className="header-top">
          <div className="header-content">
            <h1>Welcome to Compers</h1>
            <p>Your anonymous arena for competitive glory</p>
          </div>
        </div>
        <div className="button-row">
          <button className="add-competition-button" onClick={() => navigate('/create')}>
            + Add Competition
          </button>
          <button className="go-to-thread-button" onClick={() => navigate('/thread')}>
            → Go to Thread Page
          </button>
          <button className="browse-topics-button" onClick={() => navigate('/topics')}>
            📂 Browse Topics
          </button>
        </div>
      </header>

      <section className="search-section">
        <input
          type="text"
          placeholder="Search competitions or topics..."
          className="search-bar"
        />
      </section>

      <section className="trending-section">
        <h2>Trending Competitions</h2>
        <div className="trending-row">
          {trendingCompetitions.map((comp) => (
            <div key={comp.id} className="competition-card">
              <h3>{comp.title}</h3>
              <p>{comp.description}</p>
              <p><strong>Start:</strong> {comp.startTime}</p>
              <p><strong>End:</strong> {comp.endTime}</p>
              <button
                className="join-button"
                onClick={() => handleJoin(comp)}
              >
                Join Anonymously
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}