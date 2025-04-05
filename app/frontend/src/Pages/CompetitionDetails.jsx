import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//import './CompetitionDetails.css';

export default function CompetitionDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const competitionId = location.state?.competition.id;

  const [competition, setCompetition] = useState({});
  const [submissions, setSubmissions] = useState([]);
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
      setCompetition(data.details);
      setSubmissions(data.submissions);
      setLoading(false);
    })
    .catch(err => {
      console.error('Error fetching competition details: ', err);
      setLoading(false);
    });
  }, []);

  if (!competitionId) {
    return (
      <div className="no-data-found">
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
      <h1>{competition.title}</h1>
      <p><strong>Description:</strong> {competition.description}</p>
      <p><strong>Start:</strong> {new Date(competition.startTime).toLocaleString()}</p>
      <p><strong>End:</strong> {new Date(competition.endTime).toLocaleString()}</p>

      {submissions.map((submission) => (
	<div key={submission.id} className="submission-card" onClick={() => navigate('/submissions/details', { state: { submission: { id: submission.id }}})}>
	  <h2>{submission.title}</h2>
	  <p>{submission.description}</p>
	</div>
      ))}

      <button className="back-button" onClick={() => navigate('/')}>Return to Homepage</button>
    </div>
  );
}
