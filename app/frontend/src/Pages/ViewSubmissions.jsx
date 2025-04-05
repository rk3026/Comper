import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ViewSubmissions.css'; // Use the existing styles

export default function ViewSubmissions() {
    const navigate = useNavigate();
    const location = useLocation();
    const competitionId = location.state?.competition.id;

    const [submissions, setSubmissions] = useState([]); // All competitions
    const [filteredSubmissions, setFilteredSubmissions] = useState([]); // Filtered competitions based on search
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch competitions on component mount
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/submissions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({compID: competitionId})
        })
            .then(res => res.json())
            .then(data => {
                setSubmissions(data);
                setFilteredSubmissions(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching submissions:', err);
                setLoading(false);
            });
    }, []);

    // Filter competitions based on the search query
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredSubmissions(submissions); // If no search query, show all competitions
        } else {
            const filtered = submissions.filter(comp =>
                comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                comp.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredSubmissions(filtered); // Update the filtered competitions list
        }
    }, [searchQuery, submissions]); // Re-run whenever searchQuery or competitions change

    if (loading) return <div>Loading competitions...</div>;

    return (
        <div className="competitions-page">
            <h1>All Submissions</h1>

            {/* Search Bar Section */}
            <section className="search-section">
                <input
                    type="text"
                    placeholder="Search submissions..."
                    className="search-bar"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update the search query as user types
                />
            </section>

            {/* Competitions List Container */}
            <div className="competitions-list">
                {filteredSubmissions.length === 0 ? (
                    <p>No submissions found.</p>
                ) : (
                    filteredSubmissions.map((comp) => (
                        <div
                            key={comp.id}
                            className="competition-card"
                            onClick={() => navigate(`/submissions/details`, { state: { submission: { id: comp.id }} })} // Pass competition details
                        >
                            {/* Image at the top */}
                            {comp.attachmentURL && (
                                <div className="competition-image">
                                    <img src={comp.attachmentURL} alt={comp.title} width="100%" height="200px" style={{ objectFit: 'cover' }} />
                                </div>
                            )}

                            <h2>{comp.title}</h2>
                            <p>{comp.description}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
