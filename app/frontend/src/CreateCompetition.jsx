import React, { useState } from 'react';
import './CreateCompetition.css';

// This component allows users to create a new competition
export default function CreateCompetition() {
  // State to manage the list of tags
  const [tags, setTags] = useState(['']);

  // Function to add a new empty tag to the list
  const handleAddTag = () => {
    setTags([...tags, '']);
  };

  // Function to update the value of a specific tag
  const handleTagChange = (index, value) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for submitting form data
    console.log('Competition created');
  };

  return (
    <div className="create-container">
      {/* Page title */}
      <h1>Create a New Competition</h1>

      {/* Form for creating a competition */}
      <form onSubmit={handleSubmit} className="create-form">
        {/* Input for competition title */}
        <label>Title</label>
        <input type="text" placeholder="Enter competition title" required />

        {/* Input for competition description */}
        <label>Description</label>
        <textarea placeholder="Enter description" rows={4} required />

        {/* Section for adding criteria tags */}
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
        {/* Button to add a new tag */}
        <button type="button" className="add-tag-button" onClick={handleAddTag}>
          + Add Tag
        </button>

        {/* Input for start date */}
        <label>Start Date</label>
        <input type="datetime-local" required />

        {/* Input for end date */}
        <label>End Date</label>
        <input type="datetime-local" required />

        {/* Submit button */}
        <button type="submit" className="submit-button">
          Create Competition
        </button>
      </form>
    </div>
  );
}
