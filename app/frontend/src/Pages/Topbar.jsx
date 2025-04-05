import React from 'react';
import { Link } from 'react-router-dom';
import './Topbar.css';

const TEST_COMP_ID = 6; // Replace with actual competition ID
const TEST_SUBMISSION_ID = 2; // Replace with actual submission ID

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbar-logo">
        <Link to="/">🏁 Comper</Link>
      </div>
      <nav className="topbar-nav">
        <Link to="/">Home</Link>
        <Link to="/topics">Topics</Link>
        <Link to="/create">+ Competition</Link>
        <Link to="/thread">Threads</Link>
        <Link to="/competitions">Competitions</Link>

        <Link to={`/vote/${TEST_COMP_ID}/${TEST_SUBMISSION_ID}`}>vote</Link>
      </nav>
    </div>
  );
}
