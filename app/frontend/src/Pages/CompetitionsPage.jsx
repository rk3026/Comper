import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CompetitionsPage.css'; // Use the existing styles

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = useState([]); // All competitions
  const [filteredCompetitions, setFilteredCompetitions] = useState([]); // Filtered competitions based on search
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Fetch competitions on component mount
  useEffect(() => {
<<<<<<< HEAD
<<<<<<< HEAD
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/competitions`)
=======
    fetch('http://localhost:5000/api/competitions') // Make sure this matches your backend
>>>>>>> 61d62b1 (Worked on All Competitions page)
=======
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/competitions`)
>>>>>>> f84a7f2 (Small fix)
      .then(res => res.json())
      .then(data => {
        setCompetitions(data);
        setFilteredCompetitions(data); // Initially show all competitions
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching competitions:', err);
        setLoading(false);
      });
  }, []);

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

  if (loading) return <div>Loading competitions...</div>;

  return (
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    <div className="competitions-page">
      <h1>All Competitions</h1>
      <div className="competitions-list">
        {competitions.map((comp) => (
          <div key={comp.id} className="competition-card" onClick={() => navigate(`/competitions/details`, { state: { competition: { id: comp.id }}})}>
            <h2>{comp.title}</h2>
            <p>{comp.description}</p>
            <p><strong>Start:</strong> {new Date(comp.startTime).toLocaleString()}</p>
            <p><strong>Deadline:</strong> {new Date(comp.deadline).toLocaleString()}</p>
          </div>
        ))}
=======
    <div className="homepage-container" style={{ backgroundColor: 'white' }}> {/* Default light gray background */}
=======
    <div className="homepage-container" style={{ backgroundColor: '#f3f4f6' }}> {/* Default light gray background */}
>>>>>>> 6a9900e (Added Search in All Competitions Page)
      <header className="homepage-header">
        <h1>All Competitions</h1>
        <p>View all current competitions</p>
        <button className="add-competition-button" onClick={() => navigate('/')}>
          ← Back to Homepage
        </button>
      </header>
=======
    <div className="competitions-page">
      <h1>All Competitions</h1>
>>>>>>> f84a7f2 (Small fix)

      {/* Search Bar Section */}
      <section className="search-section">
        <input
          type="text"
          placeholder="Search competitions..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update the search query as user types
        />
      </section>

<<<<<<< HEAD
<<<<<<< HEAD
      <div className="competition-sections">
        <div className="trending-row">
          {filteredCompetitions.length === 0 ? (
            <p>No competitions found.</p>
          ) : (
            filteredCompetitions.map((comp, index) => (
              <div key={index} className="competition-card" onClick={() => navigate(`/competitions/${comp.id}`)}>
                <h3>{comp.title}</h3>
                <p>{comp.description}</p>
                <p><strong>Start:</strong> {new Date(comp.startTime).toLocaleString()}</p>
                <p><strong>End:</strong> {new Date(comp.deadline).toLocaleString()}</p>
                {comp.attachmentURL && (
                  <img
                    src={comp.attachmentURL}
                    width="200"
                    height="200"
                    alt="Competition"
                  />
                )}
                <button className="join-button">Join Anonymously</button>
              </div>
            ))
          )}
        </div>
>>>>>>> 61d62b1 (Worked on All Competitions page)
=======
      {/* List of Competitions */}
=======
      {/* Competitions List Container */}
>>>>>>> dd863fd (Added pictures to Competitions Page)
      <div className="competitions-list">
        {filteredCompetitions.length === 0 ? (
          <p>No competitions found.</p>
        ) : (
          filteredCompetitions.map((comp) => (
            <div 
              key={comp.id} 
              className="competition-card" 
              onClick={() => navigate(`/competitions/details`, { state: { competition: comp }})} // Pass competition details
            >
              {/* Image at the top */}
              {comp.attachmentURL && (
                <div className="competition-image">
                  <img src={comp.attachmentURL} alt={comp.title} width="100%" height="200px" style={{ objectFit: 'cover' }} />
                </div>
              )}

              <h2>{comp.title}</h2>
              <p>{comp.description}</p>
              <p><strong>Start:</strong> {new Date(comp.startTime).toLocaleString()}</p>
              <p><strong>Deadline:</strong> {new Date(comp.deadline).toLocaleString()}</p>
            </div>
          ))
        )}
>>>>>>> f84a7f2 (Small fix)
      </div>
    </div>
  );
}
