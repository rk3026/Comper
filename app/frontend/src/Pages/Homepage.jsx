import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

export default function Homepage() {
  const navigate = useNavigate();
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/competitions`)
      .then(response => response.json())
      .then(data => setCompetitions(data));
  }, []);

  const handleCompetitionClick = (competition) => {
    // Pass the entire competition object via navigate state
    navigate('/competitions/details', { state: { competition } });
  };

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <div className="header-content">
          <div>
            <h1>Welcome Compers</h1>
            <p>Your anonymous arena for competitive glory</p>
          </div>
        </div>
        <button className="add-competition-button" onClick={() => navigate('/create')}>
          + Add Competition
        </button>
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
          {competitions.map((comp) => (
            <div key={comp.id} className="competition-card" onClick={() => handleCompetitionClick(comp)}>
              <h3>{comp.title}</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{comp.description}</p>
              <p><strong>Start:</strong> {new Date(comp.startTime).toLocaleString()}</p>
              <p><strong>End:</strong> {new Date(comp.deadline).toLocaleString()}</p>
              <img src={comp.attachmentURL} width="200" height="200" alt={comp.title} />
              <button className="join-button">Join Anonymously</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
