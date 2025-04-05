import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CompetitionDetails.css';

export default function CompetitionDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const competition = location.state?.competition;

  const [comments, setComments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);
  const [joining, setJoining] = useState(false);

  // Fetch comments when competition data is available
  useEffect(() => {
    if (competition) {
      fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/competitions/${competition.compID}/comments`)
        .then(res => res.json())
        .then(data => {
          setComments(data);
          setLoadingComments(false);
        })
        .catch(err => {
          console.error('Error fetching comments:', err);
          setLoadingComments(false);
        });

      // Fetch submissions when competition data is available
      fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/competitions/${competition.compID}/submissions`)
        .then(res => res.json())
        .then(data => {
          setSubmissions(data);
          setLoadingSubmissions(false);
        })
        .catch(err => {
          console.error('Error fetching submissions:', err);
          setLoadingSubmissions(false);
        });
    }
  }, [competition]);

  // Handle join competition logic
  const handleJoinCompetition = () => {
    setJoining(true);
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/competitions/${competition.compID}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userID: 'anonymous' }) // Replace with the actual user data
    })
      .then(res => res.json())
      .then(data => {
        setJoining(false);
        console.log('Successfully joined competition:', data);
      })
      .catch(err => {
        setJoining(false);
        console.error('Error joining competition:', err);
      });
  };

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
