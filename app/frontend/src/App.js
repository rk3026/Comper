/*
 * Main React component.
 *
 * Uses react-router-dom to specify which jsx files are used for each of the several webpages
 */

// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all your page components
import Homepage from './Pages/Homepage';
import CreateCompetition from './Pages/CreateCompetition';
import CreateSubmission from './Pages/CreateSubmission';
import SubmissionPage from './Pages/SubmissionPage';
import CompetitionDetails from './Pages/CompetitionDetails';
import ViewSubmissions from './Pages/ViewSubmissions';
import CompetitionsPage from './Pages/CompetitionsPage';
import SubmissionDetails from './Pages/SubmissionDetails';
import TopicsPage from './Pages/TopicsPage';
import TopicPage from './Pages/TopicPage';
import ThreadPage from './Pages/ThreadPage';
import VotingPage from './Pages/VotingPage';
import Topbar from './Pages/Topbar';

import './App.css';

function App() {
  return (
    <Router>
      <Topbar />
      <Routes>
        {/* Public/Home route */}
        <Route path="/" element={<Homepage />} />

        {/* Competitions */}
        <Route path="/competitions" element={<CompetitionsPage />} />
        <Route path="/competitions/details" element={<CompetitionDetails />} />
        <Route path="/create" element={<CreateCompetition />} />
	<Route path="/submissions/details" element={<SubmissionDetails />} /> // after clicking a specific submission under a competition

        {/* Submissions */}`
        <Route path="/submission" element={<SubmissionPage />} />
        <Route path="/createSubmission" element={<CreateSubmission />} />
        <Route path="/viewSubmissions" element={<ViewSubmissions />} />

        {/* Voting */}
        <Route path="/vote/:compId/:submissionId" element={<VotingPage />} />

        {/* Topics */}
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/topics/:name" element={<TopicPage />} />

        {/* Threads */}
        <Route path="/threads/:threadID" element={<ThreadPage />} />
        <Route path="/competitions/details" element={<CompetitionDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
