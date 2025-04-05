import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

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

export default function Homepage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [availableDate, setAvailableDate] = useState('');

  const formatDateOnly = date => date.toISOString().split('T')[0];

  const toDateOnlyString = date => new Date(date).toLocaleDateString('en-CA'); // "YYYY-MM-DD"

  const filteredCompetitions = trendingCompetitions.filter(comp => {
    const matchesText =
      comp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchTerm.toLowerCase());

    if (!availableDate) return matchesText;

    const selectedDateStr = availableDate; // already "YYYY-MM-DD"
    const startStr = toDateOnlyString(comp.startTime);
    const endStr = toDateOnlyString(comp.endTime);

    const isAvailableOnDate = selectedDateStr >= startStr && selectedDateStr <= endStr;

    return matchesText && isAvailableOnDate;
  });


  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <div className="header-content">
          <div>
            <h1>Welcome to Compers</h1>
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
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <div className="date-filters">
          <label htmlFor="available-date">Available on:</label>
          <input
            type="date"
            id="available-date"
            value={availableDate}
            onChange={e => setAvailableDate(e.target.value)}
            className="date-input"
          />
        </div>
      </section>



      <section className="trending-section">
        <h2>Trending Competitions</h2>
        <div className="trending-row">
          {filteredCompetitions.length > 0 ? (
            filteredCompetitions.map((comp, index) => (
              <div key={index} className="competition-card">
                <h3>{comp.title}</h3>
                <p>{comp.description}</p>
                <p><strong>Start:</strong> {comp.startTime}</p>
                <p><strong>End:</strong> {comp.endTime}</p>
                <button className="join-button">Join Anonymously</button>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No competitions are available on this date.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
