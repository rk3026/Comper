import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CompetitionDetails.css';

export default function CompetitionDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const competitionId = location.state?.competition.id;

  const [competition, setCompetition] = useState({});
  const [submissions, setSubmissions] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [replyTo, setReplyTo] = useState(null); // To store the comment ID being replied to

  // Reference for the comment form to scroll to it
  const commentFormRef = useRef(null);

  useEffect(() => {
    if (!competitionId) return;
  
    // Fetch competition details along with comments
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/competitions/details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: competitionId,  // Send the competitionId in the body to fetch details and comments
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.details) {
          setCompetition(data.details);  // Set competition details
          setSubmissions(data.submissions || []);  // Set submissions, default to empty array if not found
          setComments(data.comments || []);  // Set comments, default to empty array if not found
        } else {
          console.error('No competition details found.');
          setCompetition(null);  // Clear competition if no details are found
          setSubmissions([]);  // Clear submissions if no competition found
          setComments([]);  // Clear comments if no competition found
        }
        setLoading(false);  // Set loading to false after the data is fetched
      })
      .catch((err) => {
        console.error('Error fetching competition details: ', err);
        setLoading(false);  // Set loading to false in case of an error
      });
  }, [competitionId]);
  
  
  

  const handlePostComment = async () => {
    if (newComment.trim() !== '') {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/competitions/${competitionId}/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: newComment.trim(),
            replyTo: replyTo || null,  // Include the reply-to information
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
          setReplyTo(null);  // Reset replyTo after posting
        } else {
          console.error('Failed to post comment');
        }
      } catch (err) {
        console.error('Error posting comment:', err);
      }
    }
  };

  const handleReplyTo = (commentId) => {
    setReplyTo(commentId);
    setNewComment(`>>${commentId} `);

    if (commentFormRef.current) {
      commentFormRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  const scrollToComment = (commentId) => {
    const commentElement = document.getElementById(`comment-${commentId}`);
    if (commentElement) {
      commentElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  if (loading) return <div className="details-container">Loading competition details...</div>;

  return (
    <div className="details-container">
      <h1>{competition.title}</h1>
      <div className="competition-info">
        {competition.attachmentURL && (
          <div>
            <img
              src={competition.attachmentURL}
              alt="Competition Attachment"
              className="competition-attachment"
            />
          </div>
        )}
        <p><strong>Description:</strong> {competition.description}</p>
        <p><strong>Start Time:</strong> {new Date(competition.startTime).toLocaleString()}</p>
        <p><strong>End Time:</strong> {new Date(competition.endTime).toLocaleString()}</p>
        <p><strong>Submission File Type:</strong> {competition.submissionFileType}</p>
        <p><strong>Status:</strong> {competition.status}</p>
      </div>

      {/* Comments Section */}
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

      {/* Comment Form */}
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

      <div className="submissions-section">
        <h2>Submissions</h2>
        {submissions.length === 0 ? (
          <p>No submissions yet. Be the first to submit!</p>
        ) : (
          <div className="submissions-grid">
            {submissions.map((submission, index) => (
              <div
                key={index}
                className="submission-card"
                onClick={() =>
                  navigate(`/submissions/details`, { state: { submission: { id: submission.id } } })
                }
              >
                <img
                  src={submission.attachmentURL}
                  alt="Submission"
                  className="submission-image"
                  width="100"
                  height="100"
                />
                <h3>{submission.title}</h3>
                <p>{submission.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <button className="back-button" onClick={() => navigate('/')}>
        Return to Homepage
      </button>
    </div>
  );
}
