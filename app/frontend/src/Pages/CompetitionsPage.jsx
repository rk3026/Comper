import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css'; // Use the same styles as Homepage

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = useState([]); // All competitions
  const [filteredCompetitions, setFilteredCompetitions] = useState([]); // Filtered competitions based on search
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Fetch competitions on component mount
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/competitions`)
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
    <div className="competitions-page">
      <h1>All Competitions</h1>

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

      {/* List of Competitions */}
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
              <h2>{comp.title}</h2>
              <p>{comp.description}</p>
              <p><strong>Start:</strong> {new Date(comp.startTime).toLocaleString()}</p>
              <p><strong>Deadline:</strong> {new Date(comp.deadline).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
