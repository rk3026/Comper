import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

// Just listing out all competitions for the trending section instead of figuring out which one is trending currently
/*
const trendingCompetitions = [
  {
    title: 'Competition Placeholder 1',
    description: 'This is a placeholder for a trending competition.',
    startTime: 'April 10, 2025 10:00 AM',
    endTime: 'April 12, 2025 6:00 PM'
  },
  {
    title: 'Competition Placeholder 2',
    description: 'This is a placeholder for a trending competition.',
    startTime: 'April 15, 2025 8:00 AM',
    endTime: 'April 16, 2025 4:00 PM'
  },
  {
    title: 'Competition Placeholder 3',
    description: 'This is a placeholder for a trending competition.',
    startTime: 'April 20, 2025 12:00 PM',
    endTime: 'April 22, 2025 8:00 PM'
  }
];
*/

export default function Homepage() {
  const navigate = useNavigate();
  const [competitions, setCompetitions] = useState([]);

  fetch('http://localhost:5000/api/competitions')
	.then(response => response.json())
	.then(data => setCompetitions(data));

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
        <h2>Trending Competitions!!!</h2>
        <div className="trending-row">
    {competitions.map((comp, index) => (
	<div key={index} className="competition-card">
	    <h3>{comp.name}</h3>
	    <p>{comp.description}</p>
	</div>
    ))}

    
      {/*
          {trendingCompetitions.map((comp, index) => (
            <div key={index} className="competition-card">
              <h3>{comp.title}</h3>
              <p>{comp.description}</p>
              <p><strong>Start:</strong> {comp.startTime}</p>
              <p><strong>End:</strong> {comp.endTime}</p>
              <button className="join-button">Join Anonymously</button>
            </div>
          ))}
    */}
        </div>
      </section>
    </div>
  );
}
