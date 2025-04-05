import React from 'react';
import { Link } from 'react-router-dom';
import './Topbar.css';

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

        <Link to="/vote">vote</Link>
      </nav>
    </div>
  );
}
