import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import CreateCompetition from './Pages/CreateCompetition';
import TopicsPage from './Pages/TopicsPage';
import ThreadPage from './Pages/ThreadPage';
import Topbar from './Pages/Topbar';
import CompetitionsPage from './Pages/CompetitionsPage';
import CompetitionDetails from './Pages/CompetitionDetails';
import './App.css';

function App() {
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreateCompetition />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/threads/:threadID" element={<ThreadPage />} />
        <Route path="/competitions" element={<CompetitionsPage />} />
        <Route path="/competitions/details" element={<CompetitionDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
