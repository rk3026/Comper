import React, { useState } from 'react';
import './CreateCompetition.css';

export default function CreateCompetition() {
  const [tags, setTags] = useState(['']);

  const handleAddTag = () => {
    setTags([...tags, '']);
  };

  const handleTagChange = (index, value) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for submitting form data
    console.log('Competition created');
  };

  return (
    <div className="create-container">
      <h1>Create a New Competition</h1>
      <form onSubmit={handleSubmit} className="create-form">
        <label>Title</label>
        <input type="text" placeholder="Enter competition title" required />

        <label>Description</label>
        <textarea placeholder="Enter description" rows={4} required />

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
        <input type="datetime-local" required />

        <label>End Date</label>
        <input type="datetime-local" required />

        <button type="submit" className="submit-button">
          Create Competition
        </button>
      </form>
    </div>
  );
}
