import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//import './CompetitionDetails.css';

export default function CompetitionDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const competitionId = location.state?.competition.id;

  const [competition, setCompetition] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!competitionId) return;
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/competitions/details`, {
      method: 'POST',
      headers: {
	'Content-Type': 'application/json'
      },
      body: JSON.stringify({
	id: competitionId
      })
    }).then(response => response.json())
    .then(data => {
      console.log(data);
      setCompetition(data);
      setLoading(false);
    })
    .catch(err => {
      console.error('Error fetching competition details: ', err);
      setLoading(false);
    });
  }, [competitionId]); // <- effect waits till the competition id is received

  if (!competitionId) {
    return (
      <div className="details-container">
        <h2>No competition data found.</h2>
        <button onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  

  if (loading) {
    return <div>Loading Submissions...</div>;
  }

  return (
    <div className="details-container">
      <h1>{competition.details.title}</h1>
      {/*
      <p><strong>Description:</strong> {competition.description}</p>
      <p><strong>Start:</strong> {competition.startTime}</p>
      <p><strong>End:</strong> {competition.endTime}</p>
*/}

      <button className="back-button" onClick={() => navigate('/')}>Return to Homepage</button>
    </div>
  );
}
