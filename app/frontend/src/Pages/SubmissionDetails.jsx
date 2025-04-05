import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SubmissionDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const submissionId = location.state?.submission.id;

  const [submission, setSubmission] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!submissionId) return;

    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/submissions/details`, {
      method: 'POST',
      headers: {
	'Content-Type': 'application/json'
      },
      body: JSON.stringify({
	id: submissionId
      })
    }).then(response => response.json())
    .then(data => {
      setSubmission(data);
      setLoading(false);
    })
    .catch(err => {
      console.error('Error fetching submission details: ', err);
      setLoading(false);
    });
  }, []);

  if (!submissionId) {
    return (
      <div className="no-data-found">
	<h2>no submission data found</h2>
	<button onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  if (loading) {
    return <div>Loading Submission...</div>;
  }

  return (
    <div className="details-submission">
      <h1>{submission.title}</h1>
      <p><strong>Description:</strong> {submission.description}</p>
      <img src={submission.attachmentURL} alt="Submission" className="submission-image" width="100" height="100" />
      <button className="vote-button" onClick={() => navigate(`/vote/${submission.compID}/${submissionId}`)}>VOTE</button>
    </div>
  );
}
