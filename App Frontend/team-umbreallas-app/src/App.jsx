import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage';
import CreateCompetition from './components/CreateCompetition'; // you'll build this next

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreateCompetition />} />
      </Routes>
    </Router>
  );
}
export default App; // <-- This is required!