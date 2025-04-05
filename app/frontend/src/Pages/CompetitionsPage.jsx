import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CompetitionsPage.css';

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/competitions`)
      .then(res => res.json())
      .then(data => {
        setCompetitions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching competitions:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading competitions...</div>;

  return (
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
      </div>
    </div>
  );
}
