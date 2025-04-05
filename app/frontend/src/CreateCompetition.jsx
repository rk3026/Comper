import React, { useState } from 'react';
import './CreateCompetition.css';

export default function CreateCompetition() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState(['']);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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

    const competitionData = {
      title,
      description,
      tags: tags.filter(tag => tag.trim() !== ''),
      startDate,
      endDate,
    };

    console.log('Competition data:', competitionData);
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

        <button type="submit" className="submit-button">
          Create Competition
        </button>
      </form>
    </div>
  );
}
