import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SubmissionDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const submissionId = location.state?.submission.id;

  const [submission, setSubmission] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!submissionId) return;

    const fetchData = async () => {
      try {
        const submissionRes = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/submissions/details`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: submissionId }),
        });
        const submissionData = await submissionRes.json();
        setSubmission(submissionData);

        const commentsRes = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/submissions/comments/${submissionId}`);
        const commentsData = await commentsRes.json();
        console.log('Fetched Comments:', commentsData);
        setComments(commentsData);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [submissionId]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      // Post new comment
      await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/submissions/comments/${submissionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subID: submissionId, content: newComment })
      });

      setNewComment(''); // Reset comment input field

      // Re-fetch comments after posting new one
      const res = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/submissions/comments/${submissionId}`);
      const commentsData = await res.json();
      setComments(commentsData);
    } catch (err) {
      console.error('Failed to post comment:', err);
    }
  };

  if (!submissionId) {
    return (
      <div className="no-data-found">
        <h2>No submission data found</h2>
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

      <hr />
      <h2>Comments</h2>

      <div className="comment-form">
        <textarea
          placeholder="Leave a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
          cols={60}
        />
        <br />
        <button onClick={handleCommentSubmit}>Submit</button>
      </div>

      <ul className="comment-list">
        {comments.length === 0 ? (
          <li>No comments available.</li>
        ) : (
          comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.content}</p>
              <small>{new Date(comment.creationTime).toLocaleString()}</small>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
