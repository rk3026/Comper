// votingPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Replace with your actual API base URL if needed
const API_BASE_URL = `${process.env.REACT_APP_SERVER_ADDRESS}/api/criteria`;
// For demonstration, we use a simple fixed captcha value
const CAPTCHA_VALUE = '12345';

const VotingPage = () => {
  const { compId, submissionId } = useParams();
  const navigate = useNavigate();

  const [criteria, setCriteria] = useState([]);
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  
  // State for captcha modal
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');

  // Fetch criteria based on compId when the component mounts
  useEffect(() => {
    const fetchCriteria = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/${compId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch criteria.');
        }
        const data = await response.json();
        setCriteria(data);
        // Initialize scores object for each criteria
        const initialScores = {};
        data.forEach(c => {
          initialScores[c.id] = '';
        });
        setScores(initialScores);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCriteria();
  }, [compId]);

  // Handle input change for each criteria score
  const handleInputChange = (criteriaId, value) => {
    setScores(prevScores => ({
      ...prevScores,
      [criteriaId]: value
    }));
  };

  // Function to calculate total score and display the success message.
  const submitVote = () => {
    let totalScore = 0;
    for (const [id, value] of Object.entries(scores)) {
      const numericValue = parseFloat(value);
      if (isNaN(numericValue)) {
        setError('Please enter valid numbers for all criteria.');
        return;
      }
      totalScore += numericValue;
    }

    // Instead of an API call, we simply display the result
    setSuccess(`Vote Incremented! Total Score: ${totalScore}`);
    // Optionally, you could navigate to a confirmation page here.
    // For now, we display a "Go Back" button after the success message.
  };

  // Handle form submission by showing the captcha prompt
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError('');
    setShowCaptcha(true);
  };

  // Handle the captcha submission
  const handleCaptchaSubmit = (e) => {
    e.preventDefault();
    if (captchaInput !== CAPTCHA_VALUE) {
      setError('Captcha is incorrect. Please try again.');
      return;
    }
    // Captcha verified; proceed with vote submission
    submitVote();
    setShowCaptcha(false);
  };

  if (loading) return <p>Loading criteria...</p>;
  if (error && !showCaptcha) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h2>Voting Page</h2>
      <form onSubmit={handleFormSubmit}>
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Criteria</th>
              <th>Description</th>
              <th>Max Points</th>
              <th>Your Score</th>
            </tr>
          </thead>
          <tbody>
            {criteria.map(c => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.description}</td>
                <td>{c.maxPoints}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    max={c.maxPoints}
                    value={scores[c.id] || ''}
                    onChange={(e) => handleInputChange(c.id, e.target.value)}
                    required
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit" style={{ marginTop: '1rem' }}>Submit Vote</button>
      </form>
      
      {/* Captcha Prompt Modal */}
      {showCaptcha && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
          alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px' }}>
            <h3>Captcha Verification</h3>
            <p>Please enter the following code: <strong>{CAPTCHA_VALUE}</strong></p>
            <input 
              type="text" 
              value={captchaInput} 
              onChange={(e) => setCaptchaInput(e.target.value)}
              placeholder="Enter captcha" 
            />
            <div style={{ marginTop: '1rem' }}>
              <button onClick={handleCaptchaSubmit}>Verify & Submit Vote</button>
              <button onClick={() => setShowCaptcha(false)} style={{ marginLeft: '1rem' }}>Cancel</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </div>
      )}
      
      {success && (
        <div>
          <p style={{ color: 'green' }}>{success}</p>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
      )}
    </div>
  );
};

export default VotingPage;
