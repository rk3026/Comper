/*
 * Handles fetch requests for /api/comments
 * and sends any SQL queries to Comment.js
 */

// controllers/CommentController.js
const { createComment, getCommentsBySubmission, updateComment, deleteComment } = require('../Models/Comment');
const { v4: uuidv4 } = require('uuid');

// Handles when the user creates a new comment
exports.createComment = async (req, res) => {
  try {
    const data = {
      ...req.body,
      commentID: uuidv4(),          // Generate a unique ID for the comment
      createdAt: new Date()         // Set the creation timestamp
    };
    await createComment(data);
    res.status(201).json({ message: 'Comment created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Handles when the user requests a list of all comments for a particular submission
exports.getCommentsBySubmission = async (req, res) => {
  try {
    const { subID } = req.params;
    const comments = await getCommentsBySubmission(subID);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Handles when the user updates a comment
exports.updateComment = async (req, res) => {
  try {
    const { commentID } = req.params;
    await updateComment(commentID, req.body);
    res.json({ message: 'Comment updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Handles when the user deletes a comment
exports.deleteComment = async (req, res) => {
  try {
    const { commentID } = req.params;
    await deleteComment(commentID);
    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
