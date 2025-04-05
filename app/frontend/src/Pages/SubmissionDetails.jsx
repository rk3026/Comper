/**
 * SubmissionDetails Component
 * 
 * This component displays the details of a specific submission, including its title, description, 
 * attachment (if available), and associated comments. Users can also leave comments and navigate 
 * to a voting page for the submission.
 * 
 * @component
 * 
 * @returns {JSX.Element} The rendered SubmissionDetails component.
 * 
 * @example
 * <SubmissionDetails />
 * 
 * @description
 * - Fetches submission details and comments from the server using the `submissionId` passed via 
 *   `location.state`.
 * - Allows users to post new comments, which are then re-fetched and displayed.
 * - Displays a "Vote for this Submission" button that navigates to the voting page for the submission.
 * - Shows vote count and a computed rating = (totalCriteriaPoints / voteCount).
 * - Handles loading and error states gracefully.
 * 
 * @dependencies
 * - React hooks: `useState`, `useEffect`
 * - React Router hooks: `useLocation`, `useNavigate`
 * - CSS file: `SubmissionDetails.css`
 * 
 * @state
 * - `submission` (object): Stores the details of the submission.
 * - `comments` (array): Stores the list of comments for the submission.
 * - `newComment` (string): Stores the content of the new comment being written by the user.
 * - `loading` (boolean): Indicates whether the data is still being fetched.
 * 
 * @functions
 * - `fetchData`: Fetches submission details and comments from the server.
 * - `handleCommentSubmit`: Handles the submission of a new comment and re-fetches the comments.
 * 
 * @hooks
 * - `useEffect`: Fetches data when the component mounts or when `submissionId` changes.
 * 
 * @errorHandling
 * - Logs errors to the console if fetching data or posting a comment fails.
 * 
 * @conditionalRendering
 * - Displays a loading message while data is being fetched.
 * - Displays a "No submission data found" message if `submissionId` is not available.
 * - Displays a "No comments available" message if there are no comments for the submission.
 */

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SubmissionDetails.css'; 

export default function SubmissionDetails() {
  const location = useLocation(); // Access the current location to retrieve state
  const navigate = useNavigate(); // Navigation hook for programmatic routing
  const submissionId = location.state?.submission.id; // Extract submission ID from location state

  // State variables
  const [submission, setSubmission] = useState({}); // Stores submission details
  const [comments, setComments] = useState([]); // Stores the list of comments
  const [newComment, setNewComment] = useState(''); // Stores the new comment being written
  const [loading, setLoading] = useState(true); // Indicates whether data is being fetched

  // Fetch submission details and comments when the component mounts or submissionId changes
  useEffect(() => {
    if (!submissionId) return;

    const fetchData = async () => {
      try {
        // Fetch submission details
        const submissionRes = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/submissions/details`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: submissionId }),
        });
        const submissionData = await submissionRes.json();
        setSubmission(submissionData);

        // Fetch comments for the submission
        const commentsRes = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/submissions/comments/${submissionId}`);
        const commentsData = await commentsRes.json();
        console.log('Fetched Comments:', commentsData);
        setComments(commentsData);
      } catch (err) {
        console.error('Error fetching data:', err); // Log errors to the console
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchData();
  }, [submissionId]);

  // Handle the submission of a new comment
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return; // Prevent empty comments

    try {
      // Post the new comment to the server
      await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/submissions/comments/${submissionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subID: submissionId, content: newComment })
      });

      setNewComment(''); // Reset the comment input field

      // Re-fetch comments after posting the new one
      const res = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/submissions/comments/${submissionId}`);
      const commentsData = await res.json();
      setComments(commentsData);
    } catch (err) {
      console.error('Failed to post comment:', err); // Log errors to the console
    }
  };

  // Render a message if no submission ID is found
  if (!submissionId) {
    return (
      <div className="no-data-found">
        <h2>No submission data found</h2>
        <button onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  // Render a loading spinner while data is being fetched
  if (loading) {
    return <div>Loading Submission...</div>;
  }

  // Compute rating as totalCriteriaPoints divided by voteCount, if available
  const rating = submission.voteCount > 0 
    ? (submission.totalCriteriaPoints / submission.voteCount).toFixed(2)
    : 'N/A';

  // Main component rendering
  return (
    <div className="details-submission">
      {/* Submission title and description */}
      <h1 className="submission-title">{submission.title}</h1>
      <p className="submission-description">
        <strong>Description:</strong> {submission.description}
      </p>

      {/* Display vote count and computed rating */}
      <div className="vote-rating">
        <p>
          <strong>Vote Count:</strong> {submission.voteCount || 0}
        </p>
        <p>
          <strong>Rating:</strong> {rating}
        </p>
      </div>

      {/* Display submission attachment if available */}
      {submission.attachmentURL && (
        <div className="submission-image-container">
          <img
            src={submission.attachmentURL}
            alt="Submission"
            className="submission-image"
          />
        </div>
      )}

      {/* Button to navigate to the voting page */}
      <button
        className="vote-button"
        onClick={() => navigate(`/vote/${submission.compID}/${submissionId}`)}
      >
        Vote for this Submission
      </button>

      <hr className="divider" />
      <h2 className="comments-header">Comments</h2>

      {/* Comment form for adding new comments */}
      <div className="comment-form">
        <textarea
          className="comment-input"
          placeholder="Leave a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
        />
        <button className="submit-comment-button" onClick={handleCommentSubmit}>
          Submit Comment
        </button>
      </div>

      {/* Display the list of comments */}
      <ul className="comment-list">
        {comments.length === 0 ? (
          <li className="no-comments">No comments available.</li>
        ) : (
          comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <p className="comment-content">{comment.content}</p>
              <div className="comment-timestamp-container">
                <small className="comment-timestamp">
                  {new Date(comment.creationTime).toLocaleString()}
                </small>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
