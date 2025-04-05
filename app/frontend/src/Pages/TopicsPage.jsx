/*
 * Contains example topics through which threads can be seen
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopicsPage.css';

const defaultMeta = {
  Games: { icon: '🕹️', description: 'Post threads about games or dev logs' },
  Art: { icon: '🎨', description: 'Share and discuss your creations' },
  Privacy: { icon: '🔒', description: 'Talk about privacy, tools, or news' },
  Competitions: { icon: '🏆', description: 'Host or discuss competitions' },
  General: { icon: '💬', description: 'Anything that doesn’t fit elsewhere' }
};

export default function TopicsPage() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/topics`);
        const data = await res.json();
        setTopics(data);
      } catch (err) {
        console.error('Failed to fetch topics:', err);
      }
    };

    fetchTopics();
  }, []);

  const handleTopicClick = (topicName) => {
    navigate(`/topics/${topicName.toLowerCase()}`);
  };

  return (
    <div className="topics-container">
      <h1 className="topics-title">Explore Topics</h1>

      {topics.map((topic, index) => {
        const { icon, description } = defaultMeta[topic.name] || {
          icon: '📌',
          description: 'No description available.'
        };

        return (
          <div key={index} className="topic-section">
            <div className="topic-header">
              <h2>{icon} {topic.name}</h2>
              <p>{description}</p>
              <button
                className="view-all-button"
                onClick={() => handleTopicClick(topic.name)}
              >
                View All →
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
