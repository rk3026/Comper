import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch posts from the backend
    fetch('http://localhost:5000/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => setError('Failed to fetch posts: ' + error.message));

    // Fetch competitions from the backend
    fetch('http://localhost:5000/api/competitions')
      .then(response => response.json())
      .then(data => setCompetitions(data))
      .catch(error => setError('Failed to fetch competitions: ' + error.message));
  }, []); // Empty array ensures this runs once when the component mounts

  return (
    <div className="App">
      <header className="App-header">
        <h1>Posts</h1>
        {error ? (
          <p>{error}</p>
        ) : (
          <pre>{JSON.stringify(posts, null, 2)}</pre>
        )}

        <h1>Competitions</h1>
        {error ? (
          <p>{error}</p>
        ) : (
          <pre>{JSON.stringify(competitions, null, 2)}</pre>
        )}
      </header>
    </div>
  );
}

export default App;
