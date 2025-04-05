import React, { useState } from 'react';
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

const closingSoonCompetitions = [
  {
    title: 'Competition Placeholder Closing Soon 1',
    description: 'This is a placeholder for a competition closing soon.',
    startTime: 'April 1, 2025 9:00 AM',
    endTime: 'April 4, 2025 11:00 AM'
  },
  {
    title: 'Competition Placeholder Closing Soon 2',
    description: 'This is a placeholder for a competition closing soon.',
    startTime: 'April 2, 2025 10:00 AM',
    endTime: 'April 4, 2025 1:00 PM'
  }
];

const aboutToStartCompetitions = [
  {
    title: 'Competition Placeholder About to Start 1',
    description: 'This is a placeholder for a competition about to start.',
    startTime: 'April 5, 2025 9:00 AM',
    endTime: 'April 6, 2025 5:00 PM'
  },
  {
    title: 'Competition Placeholder About to Start 2',
    description: 'This is a placeholder for a competition about to start.',
    startTime: 'April 6, 2025 10:00 AM',
    endTime: 'April 7, 2025 3:00 PM'
  }
];

export default function Homepage() {
  // State to store the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Handle the search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter competitions based on the search query
  const filterCompetitions = (competitions) => {
    return competitions.filter((comp) => 
      comp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      comp.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <div className="header-content">
          <img src="..\assets\wsu-logo.png" alt="Logo" className="logo" />
          <h1>Welcome to Compers</h1>
          <p>Your anonymous arena for competitive glory</p>
        </div>
      </header>

      <section className="search-section">
        <input
          type="text"
          placeholder="Search competitions or topics..."
          className="search-bar"
          value={searchQuery}  // Bind the input value to the state
          onChange={handleSearchChange}  // Update the state when the user types
        />
      </section>

      <div className="competition-sections">
        <section className="trending-section">
          <h2>Trending Competitions</h2>
          <div className="trending-row">
            {filterCompetitions(trendingCompetitions).map((comp, index) => (
              <div key={index} className="competition-card">
                <h3>{comp.title}</h3>
                <p>{comp.description}</p>
                <p><strong>Start:</strong> {comp.startTime}</p>
                <p><strong>End:</strong> {comp.endTime}</p>
                <button className="join-button">Join Anonymously</button>
              </div>
            ))}
          </div>
        </section>

        <section className="closing-soon-section">
          <h2>Closing Soon</h2>
          <div className="trending-row">
            {filterCompetitions(closingSoonCompetitions).map((comp, index) => (
              <div key={index} className="competition-card">
                <h3>{comp.title}</h3>
                <p>{comp.description}</p>
                <p><strong>Start:</strong> {comp.startTime}</p>
                <p><strong>End:</strong> {comp.endTime}</p>
                <button className="join-button">Join Anonymously</button>
              </div>
            ))}
          </div>
        </section>

        <section className="about-to-start-section">
          <h2>About to Start</h2>
          <div className="trending-row">
            {filterCompetitions(aboutToStartCompetitions).map((comp, index) => (
              <div key={index} className="competition-card">
                <h3>{comp.title}</h3>
                <p>{comp.description}</p>
                <p><strong>Start:</strong> {comp.startTime}</p>
                <p><strong>End:</strong> {comp.endTime}</p>
                <button className="join-button">Join Anonymously</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
