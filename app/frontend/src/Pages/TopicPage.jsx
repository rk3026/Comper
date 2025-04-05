/*
 * Webpage containing the list of available topics
 */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function TopicPage() {
  const { name } = useParams(); // e.g., "Games", "Privacy", etc.
  const [threads, setThreads] = useState([]);
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const threadRes = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/topics/${name}/threads`);
        const threadData = await threadRes.json();
        setThreads(threadData.threads || []);

        const compRes = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/topics/${name}/competitions`);
        const compData = await compRes.json();
        setCompetitions(compData.competitions || []);
      } catch (err) {
        console.error('Failed to fetch topic data:', err);
      }
    };

    fetchData();
  }, [name]);

  return (
    <div className="topic-page-container">
      <h1>{name}</h1>

      {threads.length > 0 && (
        <section>
          <h2>Threads</h2>
          {threads.map((t, i) => (
            <div key={i} className="post-card">
              <h4>{t.title}</h4>
              <p>{t.description || 'No description'}</p>
            </div>
          ))}
        </section>
      )}

      {competitions.length > 0 && (
        <section>
          <h2>Competitions</h2>
          {competitions.map((c, i) => (
            <div key={i} className="post-card">
              <h4>{c.title}</h4>
              <p>{c.description || 'No description'}</p>
            </div>
          ))}
        </section>
      )}

      {threads.length === 0 && competitions.length === 0 && (
        <p>No content found for this topic.</p>
      )}
    </div>
  );
}
