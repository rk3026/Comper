import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TopicsPage.css';

const topics = [
  { name: 'Games', icon: '🕹️', description: 'Post threads about games or dev logs' },
  { name: 'Art', icon: '🎨', description: 'Share and discuss your creations' },
  { name: 'Privacy', icon: '🔒', description: 'Talk about privacy, tools, or news' },
  { name: 'Competitions', icon: '🏆', description: 'Host or discuss competitions' },
  { name: 'General', icon: '💬', description: 'Anything that doesn’t fit elsewhere' }
];

const dummyPosts = [
  { title: 'Cool Post 1' },
  { title: 'Awesome Project 2' },
  { title: 'My Progress Update' },
  { title: 'Devlog Week 1' }
];

export default function TopicsPage() {
  const navigate = useNavigate();

  const handleTopicClick = (topicName) => {
    navigate(`/topics/${topicName.toLowerCase()}`);
  };

  return (
    <div className="topics-container">
      <h1 className="topics-title">Explore Topics</h1>

      {topics.map((topic, index) => (
        <div key={index} className="topic-section">
          <div className="topic-header">
            <h2>{topic.icon} {topic.name}</h2>
            <p>{topic.description}</p>
            <button className="view-all-button" onClick={() => handleTopicClick(topic.name)}>
              View All →
            </button>
          </div>

          <div className="horizontal-scroll">
            {dummyPosts.map((post, i) => (
              <div key={i} className="post-card">
                <h4>{post.title}</h4>
                <p>Sample content preview...</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
