import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateCompetition.css';

export default function CreateCompetition() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState(['']);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [submissionFileType, setSubmissionFileType] = useState('.pdf');
  const [attachment, setAttachment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleAddTag = () => {
    setTags([...tags, '']);
  };

  const handleTagChange = (index, value) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form...');

    const competitionData = {
      title:title,
      filetype: submissionFileType,
      description: `${description}\nTags: ${tags.filter(t => t.trim()).join(', ')}`,
      startDesc: '', // Optional or static string if needed
      startTime: new Date(startDate).toISOString(),
      deadline: new Date(endDate).toISOString(),
      voteEndTime: new Date(endDate).toISOString(), // Or add another field
      attachmentURL: attachment
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/competitions/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(competitionData),
      });

      if (!response.ok) {
        throw new Error('Failed to create competition');
      }

      setSuccess(true);
      setTimeout(() => navigate('/'), 1500);

    } catch (err) {
      console.error(err);
      setError('Error creating competition. Please try again.');
    }
  };

  return (
    <div className="create-container">
      <h1>Create a New Competition</h1>
      <form onSubmit={handleSubmit} className="create-form">
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter competition title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Description</label>
        <textarea
          placeholder="Enter description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>Criteria Tags</label>
        {tags.map((tag, index) => (
          <input
            key={index}
            type="text"
            placeholder="e.g. Friendly, Non-competitive"
            value={tag}
            onChange={(e) => handleTagChange(index, e.target.value)}
            className="tag-input"
          />
        ))}
        <button type="button" className="add-tag-button" onClick={handleAddTag}>
          + Add Tag
        </button>

        <label>Start Date</label>
        <input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <label>End Date</label>
        <input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        <label>Submission File Type</label>
        <input
          type="text"
          value={submissionFileType}
          onChange={(e) => setSubmissionFileType(e.target.value)}
          placeholder=".pdf, .docx etc."
        />

        <label>Attachment (URL)</label>
        <input
          type="text"
          value={attachment}
          onChange={(e) => setAttachment(e.target.value)}
          placeholder="https://link-to-file"
        />

        <button type="submit" className="submit-button">Create Competition</button>

        {success && <p className="success-message">✅ Competition created!</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}
