import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        <div>
            <h1>Submission Details</h1>
            {submission ? (
                <div>
                    <h2>{submission.title}</h2>
                    <p>{submission.description}</p>
                    <div>
                        <h3>Comments</h3>
                        {/* Placeholder for comments */}
                        <p>No comments yet. Be the first to comment!</p>
                    </div>
                    <button onClick={handleVote}>Vote</button>
                </div>
            ) : (
                <p>Submission not found.</p>
            )}
        </div>
    );
};

export default SubmissionPage;