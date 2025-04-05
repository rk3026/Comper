import React, { useState } from 'react';
import './ThreadPage.css';

export default function ThreadPage() {
  const [comments, setComments] = useState([
    { id: 1, content: 'This is the first comment in this thread.' },
    { id: 2, content: 'Anonymous thoughts go here.' },
  ]);
  const [newComment, setNewComment] = useState('');

  const handlePostComment = () => {
    if (newComment.trim() !== '') {
      const newEntry = {
        id: comments.length + 1,
        content: newComment.trim(),
      };
      setComments([...comments, newEntry]);
      setNewComment('');
    }
  };

  return (
    <div className="thread-container">
      <header className="thread-header">
        <h1>Discussion Thread</h1>
        <p>Topic: Anonymous Internet Culture</p>
      </header>

      <section className="thread-posts">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-card">
            <span className="comment-id">Anon #{comment.id}</span>
            <p className="comment-content">{comment.content}</p>
          </div>
        ))}
      </section>

      <section className="comment-form">
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
