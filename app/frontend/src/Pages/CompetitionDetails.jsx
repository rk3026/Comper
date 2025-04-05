import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//import './CompetitionDetails.css';

export default function CompetitionDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const competition = location.state?.competition;

  if (!competition) {
    return (
      <div className="details-container">
        <h2>No competition data found.</h2>
        <button onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="details-container">
      <h1>{competition.id}</h1>
      {/*
      <p><strong>Description:</strong> {competition.description}</p>
      <p><strong>Start:</strong> {competition.startTime}</p>
      <p><strong>End:</strong> {competition.endTime}</p>
*/}

      <button className="back-button" onClick={() => navigate('/')}>Return to Homepage</button>
    </div>
  );
}
