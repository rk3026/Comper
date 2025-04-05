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

  const [criteria, setCriteria] = useState([
    { name: '', description: '', maxPoints: '' },
  ]);

  // Handle adding more tags
  const handleAddTag = () => {
    setTags([...tags, '']);
  };

  // Handle changing tag values
  const handleTagChange = (index, value) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  // Handle adding new criteria
  const handleAddCriteria = () => {
    setCriteria([...criteria, { name: '', description: '', maxPoints: '' }]);
  };

  // Handle changing criteria fields
  const handleCriteriaChange = (index, field, value) => {
    const newCriteria = [...criteria];
    newCriteria[index][field] = value;
    setCriteria(newCriteria);
  };

  // Handle removing a criteria row
  const handleRemoveCriteria = (index) => {
    const newCriteria = criteria.filter((_, i) => i !== index);
    setCriteria(newCriteria);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form...');

    const competitionData = {
      title: title,
      filetype: submissionFileType,
      description: `${description}\nTags: ${tags.filter(t => t.trim()).join(', ')}`,
      startDesc: '',
      startTime: new Date(startDate).toISOString(),
      deadline: new Date(endDate).toISOString(),
      voteEndTime: new Date(endDate).toISOString(),
      attachmentURL: attachment,
      criteria: criteria.filter(c => c.name.trim() || c.description.trim() || c.maxPoints.trim()) // optional cleanup
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

        <label>Topics</label>
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

        {/* Criteria Table */}
        <table className="criteria-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Max Points</th>
              <th>Action</th> {/* Column for remove button */}
            </tr>
          </thead>
          <tbody>
            {criteria.map((criterion, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={criterion.name}
                    onChange={(e) => handleCriteriaChange(index, 'name', e.target.value)}
                    placeholder="Criteria Name"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={criterion.description}
                    onChange={(e) => handleCriteriaChange(index, 'description', e.target.value)}
                    placeholder="Criteria Description"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={criterion.maxPoints}
                    onChange={(e) => handleCriteriaChange(index, 'maxPoints', e.target.value)}
                    placeholder="Max Points"
                  />
                </td>
                <td>
                  {/* Remove button */}
                  <button type="button" onClick={() => handleRemoveCriteria(index)} className="remove-criteria-button">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button type="button" className="add-criteria-button" onClick={handleAddCriteria}>
          + Add Criteria
        </button>

        <button type="submit" className="submit-button">Create Competition</button>

        {success && <p className="success-message">✅ Competition created!</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}
