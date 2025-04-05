/*
 * Webpage for a single thread to a list of comments talking about a specific topic
 */

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './ThreadPage.css';

export default function ThreadPage() {
  const { threadID } = useParams();
  const [thread, setThread] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [replyTo, setReplyTo] = useState(null); // To store the comment ID being replied to
  const [selectedComment, setSelectedComment] = useState(null); // To track the selected comment for highlighting
  // Reference for the comment form to scroll to it
  const commentFormRef = useRef(null);

  useEffect(() => {
    async function fetchThreadData() {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/threads/${threadID}`);
        const data = await res.json();
        
        setThread({
          name: data.name,
          topics: data.topics || [],
        });
        
        setComments(data.comments || []);

        setLoading(false);

      } catch (err) {
        console.error('Error fetching thread:', err);
        setLoading(false);
      }
    }

    fetchThreadData();
  }, [threadID]);



  const handlePostComment = async () => {
    if (newComment.trim() !== '') {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/threads/${threadID}/comments`, {
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

          newEntry.id = comments.length+1; // Increment the comment count for the new entry
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
    setSelectedComment(Number(commentId));  // Convert commentId to a number for consistency
  };
  

  if (loading) return <div className="thread-container">Loading thread...</div>;

  return (
    <div className="thread-container">
      <header className="thread-header">
        <h1><strong>Thread Name:</strong> {thread?.name} </h1>
        <p><strong>Topics:</strong> {thread?.topics?.join(', ')}</p>
      </header>

      <section className="thread-posts">
        {comments.map((comment) => {
          const commentTime = new Date(comment.creationTime);
          const formattedTime = commentTime instanceof Date && !isNaN(commentTime) 
            ? commentTime.toLocaleString() 
            : 'Invalid date';

          const isSelected = comment.id === selectedComment; // Check if this comment is selected

          return (
            <div
              key={comment.id}
              id={`comment-${comment.id}`}
              className={`comment-card ${isSelected ? 'highlighted' : ''}`}  // Add the highlighted class if selected
            >
              {/* Use comment.id directly to display the comment number */}
              <span className="comment-id">#{comment.id}</span>
              <span className="comment-time">{formattedTime}</span>
              
              {/* Display the clickable reference link if comment is a reply */}
              {comment.replyTo && (
                <span
                  className="comment-reply-link"
                  onClick={() => scrollToComment(comment.replyTo)}
                  style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                >
                  Replying to #{comment.replyTo}
                </span>
              )}
              
              <p className="comment-content">
                {comment.content.split(' ').map((word, i) => {
                  // Check for references like >>[commentId] and turn them into clickable links
                  if (word.startsWith('>>')) {
                    const refId = word.slice(2); // Remove the ">>"
                    return (
                      <span
                        key={i}
                        className="comment-reference"
                        onClick={() => scrollToComment(refId)}
                        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                      >
                        {word}
                      </span>
                    );
                  }
                  return `${word} `;
                })}
              </p>
              <button onClick={() => handleReplyTo(comment.id)}>Reply</button>
            </div>
          );
        })}
      </section>

      <section className="comment-form" ref={commentFormRef}>
        <textarea
          className="comment-input"
          rows="3"
          placeholder="Write something anonymously..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button className="post-comment-button" onClick={handlePostComment}>
          Post Comment
        </button>
      </section>
    </div>
  );
}
