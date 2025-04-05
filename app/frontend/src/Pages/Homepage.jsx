import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

export default function Homepage() {
  const navigate = useNavigate();
  const [competitions, setCompetitions] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Add state for search query

<<<<<<< HEAD
  useEffect(() => {
    fetch('http://localhost:5000/api/competitions')
      .then((response) => response.json())
      .then((data) => setCompetitions(data));
  }, []);

  // Handle the search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter the competitions based on the search query
  const filteredCompetitions = competitions.filter((comp) => 
    comp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    comp.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
=======
    useEffect(() => {
      fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/competitions`)
.then(response => response.json())
.then(data => setCompetitions(data));
    }, []);
>>>>>>> origin/EvanBranch

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
          value={searchQuery}  // Bind the input value to the state
          onChange={handleSearchChange}  // Update the state when the user types
        />
      </section>

      <section className="trending-section">
        <h2>Trending Competitions</h2>
        <div className="trending-row">
<<<<<<< HEAD
          {filteredCompetitions.map((comp, index) => (
=======
    {competitions.map((comp, index) => (
	<div key={index} className="competition-card">
	    <h3>{comp.title}</h3>
	    <p style={{ whiteSpace: 'pre-line' }}>{comp.description}</p>
	    <p><strong>Start:</strong> {new Date(comp.startTime).toLocaleString()}</p>
            <p><strong>End:</strong> {new Date(comp.deadline).toLocaleString()}</p>
	    <img src={comp.attachmentURL} width="200" height="200"/>
	    <button className="join-button">Join Anonymously</button>
	</div>
    ))}

    
      {/*
          {trendingCompetitions.map((comp, index) => (
>>>>>>> origin/EvanBranch
            <div key={index} className="competition-card">
              <h3>{comp.title}</h3>
              <p>{comp.description}</p>
              <p><strong>Start:</strong> {comp.startTime}</p>
              <p><strong>End:</strong> {comp.deadline}</p>
              <img src={comp.attachmentURL} width="200" height="200" alt="Competition" />
              <button className="join-button">Join Anonymously</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
