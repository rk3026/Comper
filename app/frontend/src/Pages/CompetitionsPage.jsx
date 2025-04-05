import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css'; // Use the same styles as Homepage

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = useState([]);
  const [filteredCompetitions, setFilteredCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
<<<<<<< HEAD
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/competitions`)
=======
    fetch('http://localhost:5000/api/competitions') // Make sure this matches your backend
>>>>>>> 61d62b1 (Worked on All Competitions page)
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

  useEffect(() => {
    // Filter competitions based on the search query (title and description)
    if (searchQuery.trim() === '') {
      setFilteredCompetitions(competitions);
    } else {
      const filtered = competitions.filter(comp =>
        comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCompetitions(filtered);
    }
  }, [searchQuery, competitions]);

  if (loading) return <div>Loading competitions...</div>;

  return (
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

      <section className="search-section">
        <input
          type="text"
          placeholder="Search competitions..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </section>

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
      </div>
    </div>
  );
}
