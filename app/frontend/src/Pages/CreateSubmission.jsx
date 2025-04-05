import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
        // Add logic to handle form submission
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
	setTimeout(() => navigate(-1, 1500));
      } catch (err) {
	console.error(err);
      }
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
	    <input type="text"
	      id="title"
	      placeholder="Enter sumbission title"
	      value={title}
	      onChange={(e) => setTitle(e.target.value)}
	      required
	    />
	  </div>
	  <div>
	      <label htmlFor="description">Description:</label>
	    <textarea
	      placeholder="Enter description"
	      rows={4}
	      value={description}
	      onChange={(e) => setDescription(e.target.value)}
	      required
	    />
	  </div>
	  <div>
	    <label htmlFor="attachmentURL">attachmentURL:</label>
	    <input type="attachmentURL"
	      id="attachmentURL"
	      placeholder="Enter URL"
	      value={attachment}
	      onChange={(e) => setAttachment(e.target.value)}
	      required
	    />
	  </div>
	  <div>
	      <button type="submit">Submit</button>
	      <button type="button" onClick={handleCancel}>
		  Cancel
	      </button>
	  </div>

	  {success && <p className="success-message">✅ Submission created!</p>}
	</form>
      </div>
    );
};

export default CreateSubmission;
