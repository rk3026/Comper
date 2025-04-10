/*
 * CompetitionDetails handles the webpage for viewing a specific component
 * where its id is passed in by a state object
 */

// Import libs
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Import style
import './CompetitionDetails.css';

export default function CompetitionDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const competitionId = location.state?.competition.id;

  // Competition data states
  const [competition, setCompetition] = useState({});
  const [submissions, setSubmissions] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [replyTo, setReplyTo] = useState(null);

  // Criteria states
  const [criteria, setCriteria] = useState([]);
  const [criteriaError, setCriteriaError] = useState('');
  const [criteriaLoading, setCriteriaLoading] = useState(true);

  const commentFormRef = useRef(null);

  // Fetch competition details
  useEffect(() => {
    if (!competitionId) return;

    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/competitions/details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: competitionId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.details) {
          setCompetition(data.details);
          setSubmissions(data.submissions || []);
          setComments(data.comments || []);
        } else {
          console.error('No competition details found.');
          setCompetition(null);
          setSubmissions([]);
          setComments([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching competition details: ', err);
        setLoading(false);
      });
  }, [competitionId]);

  // Fetch criteria for the competition
  useEffect(() => {
    if (!competitionId) return;

    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/criteria/${competitionId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch criteria.');
        }
        return res.json();
      })
      .then((data) => {
        setCriteria(data);
        setCriteriaLoading(false);
      })
      .catch((err) => {
        setCriteriaError(err.message);
        setCriteriaLoading(false);
      });
  }, [competitionId]);

  // Handles when a user clicks the post comment button
  const handlePostComment = async () => {
    if (newComment.trim() !== '') {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/competitions/${competitionId}/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: newComment.trim(),
            replyTo: replyTo || null,
          }),
        });

        if (res.ok) {
          const result = await res.json();
          const newEntry = {
            id: result.id,
            content: newComment.trim(),
            creationTime: result.creationTime ? new Date(result.creationTime).toISOString() : new Date().toISOString(),
            replyTo: result.replyTo,
          };
          setComments([...comments, newEntry]);
          setNewComment('');
          setReplyTo(null);
        } else {
          console.error('Failed to post comment');
        }
      } catch (err) {
        console.error('Error posting comment:', err);
      }
    }
  };

  // Reply to button click event handler
  const handleReplyTo = (commentId) => {
    setReplyTo(commentId);
    setNewComment(`>>${commentId} `);
    commentFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Smoothly scrolls to a comment given its id
  const scrollToComment = (commentId) => {
    const commentElement = document.getElementById(`comment-${commentId}`);
    commentElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Wait to show everything till the details have been fetched from the server successfully
  if (loading) return <div className="details-container">Loading competition details...</div>;

  return (
    <div className="details-container">
      <h1>{competition.title}</h1>
      <div className="competition-info">
        {competition.attachmentURL && (
          <img
            src={competition.attachmentURL}
            alt="Competition Attachment"
            className="competition-attachment"
          />
        )}
        <p style={{ whiteSpace: 'pre-line' }}>
          <strong>Description:</strong>
          <br />
          {competition.description}
        </p>
        <p>
          <strong>Start Time:</strong> {new Date(competition.startTime).toLocaleString()}
        </p>
        <p>
          <strong>End Time:</strong> {new Date(competition.endTime).toLocaleString()}
        </p>
        <p>
          <strong>Submission File Type:</strong> {competition.submissionFileType}
        </p>
        <p>
          <strong>Status:</strong> {competition.status}
        </p>
      </div>

      {/* Criteria Table Section */}
      <div className="criteria-section">
        <h2>Criteria</h2>
        {criteriaLoading ? (
          <p>Loading criteria...</p>
        ) : criteriaError ? (
          <p style={{ color: 'red' }}>Error: {criteriaError}</p>
        ) : criteria.length === 0 ? (
          <p>No criteria available for this competition.</p>
        ) : (
          <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', marginTop: '1rem' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Max Points</th>
              </tr>
            </thead>
            <tbody>
              {criteria.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.description}</td>
                  <td>{c.maxPoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <button
        className="view-submissions-button"
        onClick={() =>
          navigate(`/viewSubmissions`, { state: { competition: { id: competitionId } } })
        }
      >
        View Submissions
      </button>

      <div className="comments-section">
        <h2>Comments</h2>
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          <div>
            {comments.map((comment) => {
              const commentTime = new Date(comment.creationTime);
              const formattedTime =
                commentTime instanceof Date && !isNaN(commentTime)
                  ? commentTime.toLocaleString()
                  : 'Invalid date';

              return (
                <div key={comment.id} id={`comment-${comment.id}`} className="comment-card">
                  <span className="comment-id">#{comment.id}</span>
                  <span className="comment-time">{formattedTime}</span>
                  {comment.replyTo && (
                    <span
                      className="comment-reply-link"
                      onClick={() => scrollToComment(comment.replyTo)}
                      style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                    >
                      Replying to #{comment.replyTo}
                    </span>
                  )}
                  <p className="comment-content">{comment.content}</p>
                  <button onClick={() => handleReplyTo(comment.id)}>Reply</button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <section className="comment-form" ref={commentFormRef}>
        <textarea
          className="comment-input"
          rows="3"
          placeholder="Write your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button className="post-comment-button" onClick={handlePostComment}>
          Post Comment
        </button>
      </section>

      <div className="submit-submission-section">
        <button
          className="submit-submission-button"
          onClick={() =>
            navigate(`/createSubmission`, { state: { competition: { id: competitionId } } })
          }
        >
          Submit your attempt!
        </button>
      </div>

      <div id="submissions-preview" className="submissions-preview">
        {submissions.length === 0 ? (
          <p>No submissions yet. Be the first to submit!</p>
        ) : (
          submissions.map((submission, index) => (
            <div
              key={index}
              className="submission-preview-card"
              onClick={() =>
                navigate(`/submissions/details`, { state: { submission: { id: submission.id } } })
              }
            >
              <img src={submission.attachmentURL} alt={submission.title} />
              <h4>{submission.title}</h4>
            </div>
          ))
        )}
      </div>

      <button className="back-button" onClick={() => navigate('/')}>
        Return to Homepage
      </button>
    </div>
  );
}
