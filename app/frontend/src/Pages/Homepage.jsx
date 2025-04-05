import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

export default function Homepage() {
  const navigate = useNavigate();
  const [competitions, setCompetitions] = useState([]);
  const [threads, setThreads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCompetitions, setFilteredCompetitions] = useState([]);
  const [filteredThreads, setFilteredThreads] = useState([]);  // Added filteredThreads state

  // Fetch competitions and initialize filteredCompetitions
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/competitions`)
      .then(response => response.json())
      .then(data => {
        setCompetitions(data);
        setFilteredCompetitions(data); // Initially show all competitions
      })
      .catch(err => console.error('Error fetching competitions:', err));
  }, []);

  // Fetch threads from the API
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/threads`)
      .then(response => response.json())
      .then(data => setThreads(data))
      .catch(err => console.error('Error fetching threads:', err));
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter competitions and threads based on the search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCompetitions(competitions);
      setFilteredThreads(threads);
    } else {
      const filteredCompetitions = competitions.filter(comp =>
        comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCompetitions(filteredCompetitions);

      const filteredThreads = threads.filter(thread =>
        thread.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        thread.description?.toLowerCase().includes(searchQuery.toLowerCase()) // assuming thread has description
      );
      setFilteredThreads(filteredThreads);
    }
  }, [searchQuery, competitions, threads]);

  // Navigation handlers
  const handleCompetitionClick = (competition) => {
    navigate('/competitions/details', { state: { competition } });
  };

  const handleThreadClick = (thread) => {
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
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </section>

      {/* Trending Section with Competitions and Threads */}
      <section className="trending-section">
        <h2>Trending</h2>
        <div className="trending-container">
          <div className="trending-competitions">
            <h3>Competitions</h3>
            <div className="trending-row">
              {filteredCompetitions.map((comp) => (
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

                </div>
              ))}
            </div>
          </div>

          <div className="trending-threads">
            <h3>Threads</h3>
            <div className="trending-row">
              {filteredThreads.map((thread) => (
                <div
                  key={thread.id}
                  className="thread-card"
                  onClick={() => handleThreadClick(thread)}
                >
                  <h2>{thread.name}</h2>
                  {thread.description && <p>{thread.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
