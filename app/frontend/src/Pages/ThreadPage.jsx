import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ThreadPage.css';

export default function ThreadPage() {
  const { threadID } = useParams();
  const [thread, setThread] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

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
          body: JSON.stringify({ content: newComment.trim() }),
        });

        if (res.ok) {
          const result = await res.json();
          const newEntry = {
            id: result.id,
            content: newComment.trim(),
            creationTime: result.creationTime,
          };
          setComments([...comments, newEntry]);
          setNewComment('');
        } else {
          console.error('Failed to post comment');
        }
      } catch (err) {
        console.error('Error posting comment:', err);
      }
    }
  };

  if (loading) return <div className="thread-container">Loading thread...</div>;

  return (
    <div className="thread-container">
      <header className="thread-header">
        <h1><strong>Thread Name:</strong> {thread?.name} </h1>
        <p><strong>Topics:</strong> {thread?.topics?.join(', ')}</p>
      </header>

      <section className="thread-posts">
        {comments.map((comment, index) => (
          <div key={comment.id} className="comment-card">
            <span className="comment-id">Anon #{index + 1}</span>
            <span className="comment-time">{new Date(comment.creationTime).toLocaleString()}</span>
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
