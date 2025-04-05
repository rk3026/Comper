import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CreateSubmission.css'; // Import your CSS file for styling

const CreateSubmission = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const competitionId = location.state?.competition.id;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');

    const submissionData = {
      compID: competitionId,
      title: title,
      description: description,
      attachmentURL: attachment
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/submissions/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });

      if (!response.ok) {
        throw new Error('Failed to create submission');
      }

      setSuccess(true);
      setTimeout(() => navigate(-1), 1500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="container">
      <h1>Create Submission</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <input
            type="text"
            id="title"
            placeholder=" "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label htmlFor="title">Title:</label>
        </div>
        <div className="form-field">
          <textarea
            placeholder=" "
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label htmlFor="description">Description:</label>
        </div>
        <div className="form-field">
          <input
            type="text"
            id="attachmentURL"
            placeholder=" "
            value={attachment}
            onChange={(e) => setAttachment(e.target.value)}
            required
          />
          <label htmlFor="attachmentURL">Attachment URL:</label>
        </div>
        <div className="button-container">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>

        {success && <p className="success-message">✅ Submission created!</p>}
        {/** Optionally, you can add error messages as well */}
      </form>
    </div>
  );
};

export default CreateSubmission;
