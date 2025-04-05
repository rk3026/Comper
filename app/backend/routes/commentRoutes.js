/*
 * Reroutes fetch requests for api/comments
 */

// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('../Controllers/CommentController');

// Create a new comment
router.post('/', commentController.createComment);

// Retrieve all comments for a specific submission (using subID as route parameter)
router.get('/:subID', commentController.getCommentsBySubmission);

// Update a comment by commentID
router.put('/:commentID', commentController.updateComment);

// Delete a comment by commentID
router.delete('/:commentID', commentController.deleteComment);

module.exports = router;
