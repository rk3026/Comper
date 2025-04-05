import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SubmissionPage.css';

const SubmissionPage = () => {
    const { subID } = useParams();
    const navigate = useNavigate();
    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubmission = async () => {
            try {
                const response = await axios.get(`/api/submissions/${subID}`);
                setSubmission(response.data);
            } catch (err) {
                setError('Failed to fetch submission details.');
            } finally {
                setLoading(false);
            }
        };

        fetchSubmission();
    }, [subID]);

    const handleVote = () => {
        navigate(`/vote/${subID}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="submission-container">
            <h1 className="submission-heading">Submission Details</h1>
            {submission ? (
                <div className="submission-card">
                    <h2 className="submission-title">{submission.title}</h2>
                    <p className="submission-description">{submission.description}</p>
                    <div className="submission-comments">
                        <h3 className="comments-heading">Comments</h3>
                        <p className="no-comments">No comments yet. Be the first to comment!</p>
                    </div>
                    <button className="vote-button" onClick={handleVote}>Vote</button>
                </div>
            ) : (
                <p className="not-found">Submission not found.</p>
            )}
        </div>
    );

};

export default SubmissionPage;