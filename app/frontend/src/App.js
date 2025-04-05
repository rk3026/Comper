import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import CreateCompetition from './CreateCompetition';
import TopicsPage from './TopicsPage';
import ThreadPage from './ThreadPage';
import Topbar from './Topbar';
import './App.css';

function App() {
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreateCompetition />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/thread" element={<ThreadPage />} />
      </Routes>
    </Router>
  );
}

export default App;
