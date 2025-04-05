import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

export default function Homepage() {
  const navigate = useNavigate();
  const [competitions, setCompetitions] = useState([]);
  const [threads, setThreads] = useState([]);

  // Fetch competitions from your API
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/competitions`)
      .then(response => response.json())
      .then(data => setCompetitions(data))
      .catch(err => console.error('Error fetching competitions:', err));
  }, []);

  // Fetch threads from your API
  const [filteredCompetitions, setFilteredCompetitions] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Add state for search query

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/competitions`)
      .then(response => response.json())
      .then(data => {
        setCompetitions(data);
        setFilteredCompetitions(data); // Initially show all competitions
      });
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/threads`)
      .then(response => response.json())
      .then(data => setThreads(data))
      .catch(err => console.error('Error fetching threads:', err));
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
  const handleCompetitionClick = (competition) => {
    // Pass the entire competition object via navigate state
    navigate('/competitions/details', { state: { competition } });
  };

  const handleThreadClick = (thread) => {
    // Navigate to a new page: /threads/:threadID
    navigate(`/threads/${thread.id}`);
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
        <button 
          className="add-competition-button" 
          onClick={() => navigate('/create')}
        >
          + Add Competition
        </button>
      </header>

      {/* Search Bar Section */}
      <section className="search-section">
        <input
          type="text"
          placeholder="Search competitions or topics..."
          className="search-bar"
        />
      </section>

      {/* Trending Section */}
      {/* Single Trending Section with two clearly separated parts */}
      <section className="trending-section">
        <h2>Trending Competitions</h2>
        <div className="trending-row">
          {filteredCompetitions.map((comp, index) => (
            <div key={index} className="competition-card">
              <h3>{comp.title}</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{comp.description}</p>
              <p><strong>Start:</strong> {new Date(comp.startTime).toLocaleString()}</p>
              <p><strong>End:</strong> {new Date(comp.deadline).toLocaleString()}</p>
              <img src={comp.attachmentURL} width="200" height="200" alt="Competition" />
              <button className="join-button">Join Anonymously</button>
        <h2>Trending</h2>
        <div className="trending-container">
          <div className="trending-competitions">
            <h3>Competitions</h3>
            <div className="trending-row">
              {competitions.map((comp) => (
                <div 
                  key={comp.id} 
                  className="competition-card" 
                  onClick={() => handleCompetitionClick(comp)}
                >
                  <h4>{comp.title}</h4>
                  <p style={{ whiteSpace: 'pre-line' }}>{comp.description}</p>
                  <p>
                    <strong>Start:</strong> {new Date(comp.startTime).toLocaleString()}
                  </p>
                  <p>
                    <strong>End:</strong> {new Date(comp.deadline).toLocaleString()}
                  </p>
                  {comp.attachmentURL && (
                    <img 
                      src={comp.attachmentURL} 
                      width="200" 
                      height="200" 
                      alt={comp.title} 
                    />
                  )}
                  <button className="join-button">Join Anonymously</button>
                </div>
              ))}
            </div>
          </div>

          <div className="trending-threads">
            <h3>Threads</h3>
            <div className="trending-row">
              {threads.map((thread) => (
                <div 
                  key={thread.id} 
                  className="thread-card" 
                  onClick={() => handleThreadClick(thread)}
                >
                  <h2>{thread.name}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}