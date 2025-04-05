import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateSubmission = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle form submission
        console.log('Form submitted');
    };

    const handleCancel = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div>
            <h1>Create Submission</h1>
            <form onSubmit={handleSubmit}>
                {/* Add your form fields here */}
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" required />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" required></textarea>
                </div>
                <div>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateSubmission;