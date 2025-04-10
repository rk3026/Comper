/*
 * Handles html for the menu bar on the top of every webpage including a home button
 * and a logo
 */

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
        <Link to="/competitions">Competitions</Link>
      </nav>
    </div>
  );
}
