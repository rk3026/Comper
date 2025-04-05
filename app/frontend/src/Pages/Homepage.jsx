import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

export default function Homepage() {
  const navigate = useNavigate();
  const [competitions, setCompetitions] = useState([]);
  const [filteredCompetitions, setFilteredCompetitions] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Add state for search query

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/competitions`)
      .then(response => response.json())
<<<<<<< HEAD
      .then(data => {
        setCompetitions(data);
        setFilteredCompetitions(data); // Initially show all competitions
      });
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query
  };

  // Filter competitions based on the search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCompetitions(competitions); // If no search query, show all competitions
    } else {
      const filtered = competitions.filter(comp =>
        comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCompetitions(filtered); // Update the filtered competitions list
    }
  }, [searchQuery, competitions]); // Re-run whenever searchQuery or competitions change
=======
      .then(data => setCompetitions(data));
  }, []);

  const handleCompetitionClick = (competition) => {
    // Pass the entire competition object via navigate state
    navigate('/competitions/details', { state: { competition } });
  };
>>>>>>> origin/RossBranch

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

      {/* Search Bar Section */}
      <section className="search-section">
        <input
          type="text"
          placeholder="Search competitions or topics..."
          className="search-bar"
          value={searchQuery}  // Bind the input value to the state
          onChange={handleSearchChange}  // Update the state when the user types
        />
      </section>

      {/* Trending Section */}
      <section className="trending-section">
        <h2>Trending Competitions</h2>
        <div className="trending-row">
<<<<<<< HEAD
          {filteredCompetitions.map((comp, index) => (
            <div key={index} className="competition-card">
=======
          {competitions.map((comp) => (
            <div key={comp.id} className="competition-card" onClick={() => handleCompetitionClick(comp)}>
>>>>>>> origin/RossBranch
              <h3>{comp.title}</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{comp.description}</p>
              <p><strong>Start:</strong> {new Date(comp.startTime).toLocaleString()}</p>
              <p><strong>End:</strong> {new Date(comp.deadline).toLocaleString()}</p>
<<<<<<< HEAD
              <img src={comp.attachmentURL} width="200" height="200" alt="Competition" />
=======
              <img src={comp.attachmentURL} width="200" height="200" alt={comp.title} />
>>>>>>> origin/RossBranch
              <button className="join-button">Join Anonymously</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}