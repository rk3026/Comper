import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CompetitionDetails.css';

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
      <div className="competition-info">
        {competition.attachmentURL && (
          <div>
            <img src={competition.attachmentURL} alt="Competition Attachment" className="competition-attachment" />
          </div>
        )}
        <p><strong>Description:</strong> {competition.description}</p>
        <p><strong>Start Time:</strong> {new Date(competition.startTime).toLocaleString()}</p>
        <p><strong>End Time:</strong> {new Date(competition.endTime).toLocaleString()}</p>
        <p><strong>Submission File Type:</strong> {competition.submissionFileType}</p>
        <p><strong>Status:</strong> {competition.status}</p>
      </div>

      <div className="comments-section">
        <h2>Comments</h2>
        {loadingComments ? (
          <p>Loading comments...</p>
        ) : (
          <div>
            {comments.length === 0 ? (
              <p>No comments yet. Be the first to comment!</p>
            ) : (
              comments.map((comment, index) => (
                <div key={index} className="comment">
                  <p><strong>{comment.username}</strong>: {comment.text}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="submissions-section">
        <h2>Submissions</h2>
        {loadingSubmissions ? (
          <p>Loading submissions...</p>
        ) : (
          <div className="submissions-grid">
            {submissions.length === 0 ? (
              <p>No submissions yet. Be the first to submit!</p>
            ) : (
              submissions.map((submission, index) => (
                <div key={index} className="submission-card" onClick={() => navigate(`/submissions/${submission.submissionID}`)}>
                  <img src={submission.imageURL} alt="Submission" className="submission-image" />
                  <h3>{submission.title}</h3>
                  <p>{submission.description}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="join-section">
        <button className="join-button" onClick={handleJoinCompetition} disabled={joining}>
          {joining ? 'Joining...' : 'Join Competition'}
        </button>
      </div>
      <button className="back-button" onClick={() => navigate('/')}>Return to Homepage</button>
    </div>
  );
}
